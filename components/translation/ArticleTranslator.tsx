"use client";

// ArticleTranslator
// ─────────────────
// Wraps article children, renders the language selector in normal document
// flow (not position:absolute), and manages translation state.
//
// WHY NOT position:absolute for the selector:
// The selector was previously placed as position:absolute,top:-48 inside
// the article wrapper. This caused it to either be clipped by ancestor
// overflow or rendered behind the sticky TOC (which creates a stacking
// context). Placing the selector in normal flow as a flex row above the
// article fixes both issues without any z-index hacks.

import { useState, useCallback, useRef, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import type { Language } from "@/lib/languages";

interface Props {
  slug: string;
  children: React.ReactNode;
}

type State =
  | { status: "original" }
  | { status: "loading"; lang: Language }
  | { status: "translated"; lang: Language; html: string; cached: boolean }
  | { status: "error"; lang: Language; message: string };

export default function ArticleTranslator({ slug, children }: Props) {
  const [state, setState] = useState<State>({ status: "original" });
  const articleRef = useRef<HTMLDivElement>(null);
  const sourceHtmlRef = useRef<string>("");
  // Track in-flight lang to prevent duplicate requests
  const inflightLangRef = useRef<string | null>(null);

  // Capture rendered DOM HTML once on mount (original English content)
  useEffect(() => {
    if (articleRef.current && !sourceHtmlRef.current) {
      sourceHtmlRef.current = articleRef.current.innerHTML;
    }
  }, []);

  const handleSelect = useCallback(
    async (lang: Language) => {
      // Revert to original
      if (lang.code === "en") {
        setState({ status: "original" });
        inflightLangRef.current = null;
        return;
      }

      // Already translated to this lang and not re-selecting — no-op
      setState(prev => {
        if (prev.status === "translated" && prev.lang.code === lang.code) return prev;
        return prev; // will be updated below
      });

      // Prevent duplicate in-flight requests for the same language
      if (inflightLangRef.current === lang.code) return;

      // Ensure DOM is captured
      if (!sourceHtmlRef.current && articleRef.current) {
        sourceHtmlRef.current = articleRef.current.innerHTML;
      }
      if (!sourceHtmlRef.current) {
        setState({
          status: "error",
          lang,
          message: "Article content not ready. Please try again.",
        });
        return;
      }

      inflightLangRef.current = lang.code;
      setState({ status: "loading", lang });

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // sourceHash NOT sent — server computes SHA-256 authoritatively.
          // This eliminates the FNV-1a (client) vs SHA-256 (server) mismatch.
          body: JSON.stringify({
            slug,
            sourceHtml: sourceHtmlRef.current,
            sourceLang: "hi-en",
            targetLang: lang.code,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const errBody = body as { error?: string };
          throw new Error(errBody.error ?? `Server error (HTTP ${res.status})`);
        }

        const data = (await res.json()) as {
          translatedHtml: string;
          cached: boolean;
          sourceHash: string;
        };

        setState({
          status: "translated",
          lang,
          html: data.translatedHtml,
          cached: data.cached ?? false,
        });
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Translation failed. Please try again.";
        setState({ status: "error", lang, message: msg });
      } finally {
        inflightLangRef.current = null;
      }
    },
    [slug]
  );

  const handleRetry = useCallback(() => {
    setState(prev => {
      if (prev.status === "error") {
        // Schedule outside setState to avoid calling async in setState
        setTimeout(() => handleSelect(prev.lang), 0);
      }
      return prev;
    });
  }, [handleSelect]);

  const currentLang =
    state.status === "translated"
      ? state.lang.code
      : state.status === "loading"
      ? state.lang.code
      : "en";

  return (
    <div>
      {/* ── Language selector row — inline flow, no absolute positioning ── */}
      {/* Rendered above article content so it's never clipped or z-index-buried */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 20,
          minHeight: 34,
        }}
      >
        <LanguageSelector
          currentLang={currentLang}
          onSelect={handleSelect}
          loading={state.status === "loading"}
        />
      </div>

      {/* ── Error banner ── */}
      {state.status === "error" && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 16px",
            marginBottom: 20,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 6,
            fontSize: 13,
            color: "#fca5a5",
            fontFamily: "var(--font-body, sans-serif)",
          }}
        >
          <span>⚠ {state.message}</span>
          <button
            onClick={handleRetry}
            style={{
              marginLeft: "auto",
              padding: "3px 10px",
              fontSize: 11,
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#fca5a5",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Loading state — article stays mounted, shimmer overlay shown ── */}
      <div style={{ position: "relative" }}>
        {state.status === "loading" && (
          <div
            aria-live="polite"
            aria-label={`Translating into ${state.lang.name}`}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.42)",
              backdropFilter: "blur(2px)",
              // No zIndex needed — sibling of article content, not inside sticky context
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 80,
              borderRadius: 4,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                padding: "14px 24px",
                background: "#0d1117",
                border: "1px solid rgba(0,212,255,0.25)",
                borderRadius: 6,
                fontSize: 13,
                color: "var(--color-neon-blue, #00d4ff)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.08em",
              }}
            >
              Translating into {state.lang.name}…
            </div>
          </div>
        )}

        {/* ── Article content ── */}
        {state.status === "translated" ? (
          // Translated HTML — dangerouslySetInnerHTML is safe:
          // source is server-rendered Next.js output, translated by Gemini
          // with strict instructions to preserve HTML and not add scripts.
          <div
            dir={state.lang.rtl ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{ __html: state.html }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.85,
              color: "#1f2937",
              textRendering: "optimizeLegibility",
            }}
          />
        ) : (
          // Original children — always rendered in original/loading/error states
          <div ref={articleRef}>{children}</div>
        )}
      </div>

      {/* ── Translation attribution badge ── */}
      {state.status === "translated" && (
        <div
          style={{
            marginTop: 32,
            padding: "8px 14px",
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.12)",
            borderRadius: 4,
            fontSize: 11,
            color: "rgba(0,0,0,0.45)",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span>
            AI-translated into {state.lang.name}
            {state.cached ? " · served from cache" : " · freshly generated"} · Gemini
          </span>
          <button
            onClick={() => setState({ status: "original" })}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "var(--hp-accent, #2563eb)",
              fontSize: 11,
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.08em",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            View original
          </button>
        </div>
      )}
    </div>
  );
}
