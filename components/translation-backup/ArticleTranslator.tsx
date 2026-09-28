"use client";

// ArticleTranslator — Read-only pre-generated translation fetch.
// NO Gemini, NO generation, NO polling, NO background logic.
//
// Translated HTML rendered inside <article class="btt-article-content">
// — identical container to original Hinglish article.
// This preserves all BTT CSS, typography, spacing and layout exactly.

import { useState, useCallback, useRef, useEffect } from "react";
import DOMPurify from "dompurify";
import LanguageSelector from "./LanguageSelector";
import type { Language } from "@/lib/languages";

interface Props {
  slug: string;
  children: React.ReactNode;
}

type TState =
  | { status: "original" }
  | { status: "loading"; lang: Language }
  | { status: "translated"; lang: Language; html: string }
  | { status: "missing"; lang: Language }
  | { status: "error"; lang: Language; message: string };

const FETCH_TIMEOUT_MS = 10_000;

const PURIFY_CFG: Parameters<typeof DOMPurify.sanitize>[1] = {
  ALLOWED_TAGS: [
    "h1","h2","h3","h4","h5","h6","p","br","hr","div","span","section",
    "article","header","footer","main","aside","ul","ol","li","dl","dt","dd",
    "table","thead","tbody","tfoot","tr","th","td","caption","colgroup","col",
    "a","strong","b","em","i","u","s","del","ins","mark","small","sub","sup","abbr",
    "blockquote","q","cite","pre","code","kbd","samp","var",
    "figure","figcaption","img","picture","source",
    "svg","path","circle","rect","line","polyline","polygon","text","g","defs",
    "marker","use","symbol","clipPath","mask","pattern","filter",
    "linearGradient","radialGradient","stop","textPath","tspan",
    "details","summary","time","address",
  ],
  ALLOWED_ATTR: [
    "id","class","style","href","src","alt","title","lang","dir","type","name",
    "width","height","viewBox","xmlns","fill","stroke","stroke-width","stroke-linecap",
    "stroke-linejoin","stroke-dasharray","opacity","d","cx","cy","r","rx","ry",
    "x","y","x1","y1","x2","y2","points","transform","text-anchor",
    "dominant-baseline","font-size","font-family","font-weight",
    "data-ph","data-homepage-theme","aria-label","aria-labelledby",
    "aria-hidden","aria-describedby","role","target","rel",
    "colspan","rowspan","scope","loading","decoding","srcset","sizes","tabindex",
  ],
  FORBID_TAGS: ["script","object","embed","form","input","button","iframe","frame","frameset","base"],
  FORBID_ATTR: [
    "onerror","onload","onclick","onmouseover","onmouseout","onfocus","onblur",
    "onchange","onsubmit","onkeyup","onkeydown","onkeypress",
  ],
};

function sanitize(html: string): string {
  if (typeof window === "undefined") return html;
  return String(DOMPurify.sanitize(html, PURIFY_CFG));
}

export default function ArticleTranslator({ slug, children }: Props) {
  const [state, setState] = useState<TState>({ status: "original" });
  const articleRef = useRef<HTMLDivElement>(null);
  const sourceHtmlRef = useRef<string>("");
  const inflightRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Capture article.btt-article-content innerHTML on mount.
  // MUST match /api/article-source/[slug] extraction exactly:
  // both use element.innerHTML.trim()
  useEffect(() => {
    if (articleRef.current && !sourceHtmlRef.current) {
      const articleEl = articleRef.current.querySelector("article.btt-article-content");
      sourceHtmlRef.current = articleEl
        ? articleEl.innerHTML.trim()
        : articleRef.current.innerHTML.trim();
    }
  }, []);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const handleSelect = useCallback(async (lang: Language) => {
    if (state.status === "translated" && state.lang.code === lang.code) return;
    if (inflightRef.current === lang.code) return;

    abortRef.current?.abort();
    abortRef.current = null;

    if (!sourceHtmlRef.current && articleRef.current) {
      const el = articleRef.current.querySelector("article.btt-article-content");
      sourceHtmlRef.current = el
        ? el.innerHTML.trim()
        : articleRef.current.innerHTML.trim();
    }
    if (!sourceHtmlRef.current) {
      setState({ status: "error", lang, message: "Article not ready. Please try again." });
      return;
    }

    inflightRef.current = lang.code;
    setState({ status: "loading", lang });

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          slug,
          sourceHtml: sourceHtmlRef.current,
          targetLang: lang.code,
          sourceLang: "hi-en",
        }),
      });

      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error((b as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as {
        status: "done" | "missing";
        translatedHtml?: string;
      };

      if (data.status === "done" && data.translatedHtml) {
        setState({ status: "translated", lang, html: sanitize(data.translatedHtml) });
      } else {
        setState({ status: "missing", lang });
      }
    } catch (err: unknown) {
      const isAbort = (err as { name?: string }).name === "AbortError";
      setState({
        status: "error",
        lang,
        message: isAbort
          ? "Request timed out. Please try again."
          : err instanceof Error ? err.message : "Failed to load translation.",
      });
    } finally {
      clearTimeout(timer);
      abortRef.current = null;
      inflightRef.current = null;
    }
  }, [slug, state]);

  const handleRetry = useCallback(() => {
    if (state.status === "error") {
      const { lang } = state;
      inflightRef.current = null;
      setTimeout(() => handleSelect(lang), 0);
    }
  }, [state, handleSelect]);

  const handleViewOriginal = useCallback(() => {
    abortRef.current?.abort();
    inflightRef.current = null;
    setState({ status: "original" });
  }, []);

  const currentLang =
    state.status === "translated" ? state.lang.code :
    state.status === "loading"    ? state.lang.code :
    state.status === "missing"    ? state.lang.code : "original";

  return (
    <div>
      {/* Language selector */}
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20, minHeight:34 }}>
        <LanguageSelector
          currentLang={currentLang}
          onSelect={handleSelect}
          loading={state.status === "loading"}
        />
      </div>

      {/* Missing — clean user message only, NO developer commands exposed */}
      {state.status === "missing" && (
        <div aria-live="polite" style={bannerStyle("#eff6ff","#bfdbfe","#1d4ed8")}>
          <span style={{ fontSize:16 }}>🌐</span>
          <span><strong>{state.lang.name}</strong> translation is not available yet.</span>
          <button onClick={handleViewOriginal} style={linkBtn}>View original</button>
        </div>
      )}

      {/* Error banner */}
      {state.status === "error" && (
        <div role="alert" style={bannerStyle("rgba(239,68,68,.08)","rgba(239,68,68,.3)","#dc2626")}>
          <span>&#9888; {state.message}</span>
          <button onClick={handleRetry} style={retryBtn}>Retry</button>
        </div>
      )}

      {/* Content area */}
      <div style={{ position:"relative" }}>
        {state.status === "loading" && (
          <div aria-live="polite" style={overlayStyle}>
            <div style={overlayCard}>Checking translation&#8230;</div>
          </div>
        )}

        {state.status === "translated" ? (
          /*
           * CRITICAL: translated HTML rendered inside <article class="btt-article-content">
           * — the SAME container the original article uses.
           * All BTT CSS rules, typography and layout apply identically.
           * RTL languages get dir="rtl" on the article element.
           */
          <article
            className="btt-article-content"
            dir={state.lang.rtl ? "rtl" : undefined}
            // isomorphic-dompurify ran server-side before Blob save;
            // DOMPurify ran again above in sanitize() — double-sanitized.
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
        ) : (
          <div ref={articleRef}>{children}</div>
        )}
      </div>

      {/* Attribution */}
      {state.status === "translated" && (
        <div style={attribution}>
          <span>AI-translated into {state.lang.name} &#xB7; Gemini &#xB7; from cache</span>
          <button onClick={handleViewOriginal} style={linkBtn}>
            View original (Hinglish)
          </button>
        </div>
      )}
    </div>
  );
}

const bannerStyle = (bg: string, border: string, color: string): React.CSSProperties => ({
  display:"flex", alignItems:"center", gap:10, padding:"10px 16px", marginBottom:16,
  borderRadius:6, fontSize:13, fontFamily:"var(--font-body,sans-serif)",
  background:bg, border:`1px solid ${border}`, color,
});
const retryBtn: React.CSSProperties = {
  marginLeft:"auto", padding:"3px 10px", fontSize:11, cursor:"pointer",
  fontFamily:"var(--font-mono,monospace)", letterSpacing:"0.1em", textTransform:"uppercase",
  background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.4)",
  color:"#dc2626", borderRadius:4,
};
const linkBtn: React.CSSProperties = {
  marginLeft:"auto", background:"none", border:"none", color:"#2563eb",
  fontSize:11, cursor:"pointer", fontFamily:"var(--font-mono,monospace)",
  letterSpacing:"0.08em", textDecoration:"underline", padding:0,
};
const overlayStyle: React.CSSProperties = {
  position:"absolute", inset:0, background:"rgba(255,255,255,.7)",
  backdropFilter:"blur(2px)", display:"flex", alignItems:"flex-start",
  justifyContent:"center", paddingTop:80, pointerEvents:"none", zIndex:5, borderRadius:4,
};
const overlayCard: React.CSSProperties = {
  padding:"14px 24px", background:"#fff", border:"1px solid #e5e7eb",
  borderRadius:8, boxShadow:"0 4px 16px rgba(0,0,0,.1)", fontSize:14,
  color:"#374151", fontFamily:"var(--font-body,sans-serif)",
};
const attribution: React.CSSProperties = {
  marginTop:32, padding:"8px 14px", borderRadius:4, fontSize:11,
  color:"#6b7280", fontFamily:"var(--font-mono,monospace)", letterSpacing:"0.08em",
  display:"flex", alignItems:"center", gap:8, flexWrap:"wrap",
  background:"#f9fafb", border:"1px solid #e5e7eb",
};