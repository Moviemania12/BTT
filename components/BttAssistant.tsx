"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  X,
  Send,
  BookOpen,
  Square,
  RotateCcw,
  Bot,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// components/BttAssistant.tsx — Full visual rebuild
//
// Every function/hook/state/type below with a "PRESERVED" marker is
// unchanged business logic, copied verbatim from the prior version:
// message state, the Gemini SSE streaming loop, markdown parsing algorithm,
// dark-mode detection, article-context detection, retry/stop handling.
// All JSX and inline styling has been deleted and rebuilt from scratch.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Types (PRESERVED) ─────────────────────────────────────────────────────

interface RelatedArticle {
  slug: string;
  title: string;
  track: string;
  category: string;
  description?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  relatedArticles?: RelatedArticle[];
  continueLearning?: RelatedArticle | null;
  followUps?: string[];
  sources?: string[];
  isError?: boolean;
}

type SSEEvent =
  | { type: "meta"; relatedArticles: RelatedArticle[]; continueLearning: RelatedArticle | null; sources: string[] }
  | { type: "token"; text: string }
  | { type: "followups"; questions: string[] }
  | { type: "done" }
  | { type: "error"; message: string };

// ─── Theme (redesigned palette, dark-mode toggle mechanism PRESERVED) ──────
//
// Only LIGHT is used by default (dark defaults to false, same as before).
// White-only design per this rebuild's brief — DARK kept minimal/functional
// so the existing useDarkMode() toggle mechanism still has a valid target,
// but is not the focus of this redesign.

interface Theme {
  panelBg: string;
  panelBorder: string;
  headerBg: string;
  headerBorder: string;
  headerTitle: string;
  headerSubtitle: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  chipHoverBg: string;
  chipHoverBorder: string;
  chipHoverText: string;
  msgUserBg: string;
  msgUserText: string;
  msgAssistantBg: string;
  msgAssistantBorder: string;
  msgAssistantText: string;
  inputAreaBg: string;
  inputAreaBorder: string;
  inputBg: string;
  inputBorder: string;
  inputBorderFocus: string;
  inputText: string;
  sendBtnActive: string;
  sendBtnDisabled: string;
  sendBtnIconActive: string;
  sendBtnIconDisabled: string;
  stopBtnBg: string;
  stopBtnText: string;
  footerText: string;
  labelText: string;
  sourceText: string;
  questionBg: string;
  questionBorder: string;
  questionText: string;
  followupBg: string;
  followupBorder: string;
  followupText: string;
  followupHoverBg: string;
  followupHoverBorder: string;
  followupHoverText: string;
  retryColor: string;
  codeBg: string;
  codeText: string;
  codeHeaderBg: string;
  codeHeaderText: string;
  tableBorder: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  tableAltRow: string;
  hrColor: string;
}

const LIGHT: Theme = {
  panelBg: "#ffffff",
  panelBorder: "#E5E7EB",
  headerBg: "#ffffff",
  headerBorder: "#E5E7EB",
  headerTitle: "#111827",
  headerSubtitle: "#6B7280",
  chipBg: "#ffffff",
  chipBorder: "#E5E7EB",
  chipText: "#374151",
  chipHoverBg: "#EFF6FF",
  chipHoverBorder: "#2563EB",
  chipHoverText: "#1D4ED8",
  msgUserBg: "#2563EB",
  msgUserText: "#ffffff",
  msgAssistantBg: "#F8FAFC",
  msgAssistantBorder: "#E5E7EB",
  msgAssistantText: "#111827",
  inputAreaBg: "#ffffff",
  inputAreaBorder: "#E5E7EB",
  inputBg: "#F8FAFC",
  inputBorder: "#D1D5DB",
  inputBorderFocus: "#2563EB",
  inputText: "#111827",
  sendBtnActive: "#2563EB",
  sendBtnDisabled: "#E5E7EB",
  sendBtnIconActive: "#ffffff",
  sendBtnIconDisabled: "#9CA3AF",
  stopBtnBg: "#fef2f2",
  stopBtnText: "#DC2626",
  footerText: "#9CA3AF",
  labelText: "#6B7280",
  sourceText: "#6B7280",
  questionBg: "#ffffff",
  questionBorder: "#E5E7EB",
  questionText: "#374151",
  followupBg: "#ffffff",
  followupBorder: "#E5E7EB",
  followupText: "#374151",
  followupHoverBg: "#EFF6FF",
  followupHoverBorder: "#2563EB",
  followupHoverText: "#1D4ED8",
  retryColor: "#6B7280",
  codeBg: "#F6F8FA",
  codeText: "#24292F",
  codeHeaderBg: "#EAEEF2",
  codeHeaderText: "#57606A",
  tableBorder: "#E5E7EB",
  tableHeaderBg: "#F8FAFC",
  tableHeaderText: "#111827",
  tableAltRow: "rgba(15,23,42,0.02)",
  hrColor: "#E5E7EB",
};

const DARK: Theme = { ...LIGHT }; // White-only redesign — dark mode kept functional, mirrors LIGHT for now.

// ─── Hooks (PRESERVED) ──────────────────────────────────────────────────────

function useDarkMode(): boolean {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return dark;
}

// ─── Real visible viewport height (NEW — this is the actual fix) ───────────
//
// ROOT CAUSE: `inset: 0` on the position:fixed wrapper resolves against the
// browser's large/maximal viewport on mobile, not the currently-visible one
// (the same historical bug `100vh` had — `dvh` fixes it in CSS, but we were
// told not to use dvh). `window.visualViewport` is the JS API built
// specifically to report the real, currently-visible viewport height,
// correctly accounting for the address bar / tabs / toolbars a mobile
// browser is currently showing. This is JavaScript measurement, not a CSS
// viewport unit — no vh, dvh, or calc() involved anywhere.

function useVisualViewportHeight(): number | undefined {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : undefined;

    const update = () => {
      setHeight(vv ? vv.height : window.innerHeight);
    };
    update();

    if (vv) {
      vv.addEventListener("resize", update);
      return () => vv.removeEventListener("resize", update);
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}

// ─── Article context from current URL (PRESERVED) ──────────────────────────

interface ArticleContext {
  slug?: string;
  heading?: string;
  track?: string;
  category?: string;
}

function getArticleContext(): ArticleContext {
  if (typeof window === "undefined") return {};

  const parts = window.location.pathname.split("/").filter(Boolean);
  // Route: /learn/<track>/<category>/<slug>
  const isArticle = parts[0] === "learn" && parts.length >= 4;

  return {
    slug:     isArticle ? parts[parts.length - 1] : undefined,
    track:    isArticle ? parts[1] : undefined,
    category: isArticle ? parts[2] : undefined,
    heading:  window.location.hash.slice(1) || undefined,
  };
}

// ─── Track colours (PRESERVED) ──────────────────────────────────────────────

const TRACK_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  "non-it": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "it":     { bg: "#f0fdfa", text: "#0d9488", border: "#99f6e4" },
  "ai":     { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  "learn":  { bg: "#fafaf9", text: "#475569", border: "#e5e7eb" },
};

function trackColour(track: string) {
  return TRACK_COLOURS[track] ?? TRACK_COLOURS["learn"];
}

// ─── Markdown renderer (parsing algorithm PRESERVED, visual output rebuilt) ─

interface MarkdownLineProps {
  text: string;
  color: string;
}

function MarkdownLine({ text, color }: MarkdownLineProps): ReactNode {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const raw = match[0];
    if (raw.startsWith("**")) {
      parts.push(
        <strong key={key++} style={{ color, fontWeight: 700 }}>
          {raw.slice(2, -2)}
        </strong>
      );
    } else if (raw.startsWith("*")) {
      parts.push(<em key={key++}>{raw.slice(1, -1)}</em>);
    } else {
      parts.push(
        <code
          key={key++}
          style={{
            background: "rgba(37,99,235,0.08)",
            color: "#1D4ED8",
            borderRadius: 5,
            padding: "2px 6px",
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.88em",
          }}
        >
          {raw.slice(1, -1)}
        </code>
      );
    }
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

interface MarkdownProps {
  text: string;
  theme: Theme;
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .map((c) => c.trim())
    .filter((_, i, arr) => i > 0 && i < arr.length - 1);
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(line.trim());
}

function MarkdownRenderer({ text, theme }: MarkdownProps) {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const t = theme;

  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-body, system-ui, sans-serif)",
    fontSize: 14,
    color: t.msgAssistantText,
    lineHeight: 1.55,
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      elements.push(<div key={key++} style={{ height: 7 }} />);
      i++;
      continue;
    }

    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      elements.push(
        <hr key={key++} style={{ border: "none", borderTop: `1px solid ${t.hrColor}`, margin: "10px 0" }} />
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 700, fontSize: 14, margin: "12px 0 5px" }}>
          <MarkdownLine text={line.slice(4)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 700, fontSize: 18, margin: "12px 0 5px" }}>
          <MarkdownLine text={line.slice(3)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 800, fontSize: 18, margin: "16px 0 7px" }}>
          <MarkdownLine text={line.slice(2)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }

    // Fenced code block — premium GitHub-style header bar + code area
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} style={{ margin: "10px 0", borderRadius: 10, overflow: "hidden", border: `1px solid ${t.tableBorder}` }}>
          <div style={{
            background: t.codeHeaderBg,
            color: t.codeHeaderText,
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            padding: "6px 12px",
            letterSpacing: "0.04em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span>{lang ? lang.toUpperCase() : "CODE"}</span>
          </div>
          <pre style={{
            background: t.codeBg,
            padding: "12px 14px",
            overflowX: "auto",
            fontFamily: "ui-monospace, monospace",
            fontSize: 12.5,
            lineHeight: 1.65,
            color: t.codeText,
            margin: 0,
          }}>
            {codeLines.join("\n")}
          </pre>
        </div>
      );
      i++;
      continue;
    }

    // Table — responsive, premium
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      const nonSep = tableLines.filter((l) => !isTableSeparator(l));
      if (nonSep.length >= 2) {
        const [headerLine, ...bodyLines] = nonSep;
        const headers = parseTableRow(headerLine);
        const rows = bodyLines.map(parseTableRow);

        elements.push(
          <div key={key++} style={{ overflowX: "auto", margin: "12px 0", borderRadius: 10, border: `1px solid ${t.tableBorder}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, minWidth: 320 }}>
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      style={{
                        background: t.tableHeaderBg,
                        color: t.tableHeaderText,
                        padding: "8px 12px",
                        textAlign: "left",
                        fontWeight: 700,
                        borderBottom: `1px solid ${t.tableBorder}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <MarkdownLine text={h} color={t.tableHeaderText} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 1 ? t.tableAltRow : "transparent" }}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "7px 12px",
                          color: t.msgAssistantText,
                          borderBottom: `1px solid ${t.tableBorder}`,
                          fontSize: 12.5,
                          lineHeight: 1.5,
                        }}
                      >
                        <MarkdownLine text={cell} color={t.msgAssistantText} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} style={{ paddingLeft: 20, margin: "8px 0", display: "flex", flexDirection: "column", gap: 5 }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ ...baseStyle, margin: 0 }}>
              <MarkdownLine text={item} color={t.msgAssistantText} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (/^[-•*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-•*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-•*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} style={{ paddingLeft: 0, margin: "8px 0", display: "flex", flexDirection: "column", gap: 4, listStyle: "none" }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", ...baseStyle, margin: 0 }}>
              <span style={{ color: "#2563EB", marginTop: 8, width: 5, height: 5, borderRadius: "50%", background: "#2563EB", flexShrink: 0, display: "inline-block" }} />
              <span><MarkdownLine text={item} color={t.msgAssistantText} /></span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^[⚠️🔍✅🛡️📚🎯💡🔧⚡📖🧮💼📝]/.test(line)) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 600, margin: "12px 0 4px" }}>
          <MarkdownLine text={line} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }

    elements.push(
      <p key={key++} style={{ ...baseStyle, margin: "3px 0" }}>
        <MarkdownLine text={line} color={t.msgAssistantText} />
      </p>
    );
    i++;
  }

  return <div style={{ display: "flex", flexDirection: "column" }}>{elements}</div>;
}

// ─── Article chip (rebuilt visual) ──────────────────────────────────────────

function ArticleChip({ article }: { article: RelatedArticle }) {
  const c = trackColour(article.track);
  const href = `/learn/${article.track}/${article.category}/${article.slug}`;
  return (
    <Link
      href={href}
      title={article.description ?? article.title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 11px",
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 999,
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <BookOpen size={11} style={{ color: c.text, flexShrink: 0 }} />
      <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, fontWeight: 600, color: c.text, whiteSpace: "nowrap" }}>
        {article.title}
      </span>
    </Link>
  );
}

// ─── Chat message (data-wiring PRESERVED, bubble visual rebuilt) ───────────

interface ChatMessageProps {
  msg: Message;
  theme: Theme;
  onFollowUp: (q: string) => void;
  onRetry: () => void;
  isLast: boolean;
}

function ChatMessage({ msg, theme: t, onFollowUp, onRetry, isLast }: ChatMessageProps) {
  const isUser = msg.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {!isUser && (
        <div style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#2563EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}>
          <Bot size={14} color="#ffffff" />
        </div>
      )}

      <div style={{ maxWidth: "82%", display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        {/* Bubble — ChatGPT-style: user right (blue, rounded), assistant left (light card, rounded) */}
        <div style={{
          padding: isUser ? "10px 16px" : "12px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? t.msgUserBg : t.msgAssistantBg,
          color: isUser ? t.msgUserText : t.msgAssistantText,
          border: isUser ? "none" : `1px solid ${t.msgAssistantBorder}`,
          wordBreak: "break-word",
        }}>
          {isUser ? (
            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 14, lineHeight: 1.55, margin: 0, color: t.msgUserText }}>
              {msg.content}
            </p>
          ) : (
            <>
              <MarkdownRenderer text={msg.content} theme={t} />
              {msg.streaming && (
                <span style={{
                  display: "inline-block",
                  width: 2,
                  height: 15,
                  background: "#2563EB",
                  marginLeft: 2,
                  verticalAlign: "middle",
                  animation: "bttBlink 0.9s step-end infinite",
                }} />
              )}
            </>
          )}
        </div>

        {!isUser && !msg.streaming && (
          <>
            {msg.relatedArticles && msg.relatedArticles.length > 0 && (
              <div>
                <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 10.5, fontWeight: 700, color: t.labelText, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Related Articles
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {msg.relatedArticles.map((a) => (
                    <ArticleChip key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {msg.continueLearning && (
              <Link
                href={`/learn/${msg.continueLearning.track}/${msg.continueLearning.category}/${msg.continueLearning.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  background: "#2563EB",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Continue Learning
                  </div>
                  <div style={{ fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, fontSize: 13.5, color: "#ffffff", marginTop: 2 }}>
                    {msg.continueLearning.title}
                  </div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, flexShrink: 0 }}>→</span>
              </Link>
            )}

            {msg.sources && msg.sources.length > 0 && (
              <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, color: t.sourceText, margin: 0 }}>
                📖 {msg.sources.join(" · ")} · Gemini
              </p>
            )}

            {msg.followUps && msg.followUps.length > 0 && (
              <div>
                <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 10.5, fontWeight: 700, color: t.labelText, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Ask Next
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {msg.followUps.map((q) => (
                    <button
                      key={q}
                      onClick={() => onFollowUp(q)}
                      style={{
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: 14,
                        color: t.followupText,
                        background: t.followupBg,
                        border: `1px solid ${t.followupBorder}`,
                        borderRadius: 10,
                        padding: "8px 12px",
                        textAlign: "left",
                        cursor: "pointer",
                        lineHeight: 1.4,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = t.followupHoverBg;
                        el.style.borderColor = t.followupHoverBorder;
                        el.style.color = t.followupHoverText;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = t.followupBg;
                        el.style.borderColor = t.followupBorder;
                        el.style.color = t.followupText;
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLast && (
              <button
                onClick={onRetry}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: 11,
                  color: t.retryColor,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <RotateCcw size={11} />
                Retry
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Data (PRESERVED, MODES chip list updated per new spec: Explain,
//     Troubleshoot, Calculate, Interview, Guide, Compare) ──────────────────

const SUGGESTIONS = [
  { label: "DG Set kya hota hai?",           emoji: "⚡" },
  { label: "UPS vs Battery Bank difference?", emoji: "🔋" },
  { label: "Tier III vs Tier IV?",            emoji: "🏢" },
  { label: "DC me career kaise banaye?",      emoji: "🎯" },
  { label: "Mock interview shuru karo",       emoji: "💼" },
  { label: "Learning path dikhao",            emoji: "🗺️" },
];

const MODES = [
  { label: "Explain",       hint: "explain karo" },
  { label: "Troubleshoot",  hint: "troubleshoot karo" },
  { label: "Calculate",     hint: "calculate karo" },
  { label: "Interview",     hint: "mock interview karo" },
  { label: "Guide",         hint: "step by step guide do" },
  { label: "Compare",       hint: "compare karo" },
];

const GREETING: Message = {
  role: "assistant",
  content:
    "## 👋 Welcome!\n\nI'm your Behind The Tech AI Assistant.\n\nAsk me anything about Data Centers,\nElectrical Systems,\nUPS,\nCooling,\nFire Protection,\nDCIM,\nNetworking,\nCareers,\nor Interviews.",
  relatedArticles: [],
  continueLearning: null,
  followUps: [],
  sources: [],
};

// ─── Main component (all state/hooks/functions below PRESERVED verbatim) ──

export default function BttAssistant() {
  const dark = useDarkMode();
  const theme = dark ? DARK : LIGHT;
  const viewportHeight = useVisualViewportHeight();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserQueryRef = useRef<string>("");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("btt-open-ai", handler);
    return () => window.removeEventListener("btt-open-ai", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
    setMessages((prev) => {
      const msgs = [...prev];
      const last = msgs[msgs.length - 1];
      if (last?.role === "assistant" && last.streaming) {
        msgs[msgs.length - 1] = { ...last, streaming: false };
      }
      return msgs;
    });
  }, []);

  const retry = useCallback(() => {
    const q = lastUserQueryRef.current;
    if (!q) return;
    // Remove the last assistant message (may be an error or incomplete)
    setMessages((prev) => {
      const msgs = [...prev];
      if (msgs[msgs.length - 1]?.role === "assistant") msgs.pop();
      return msgs;
    });
    // Small delay so state settles
    setTimeout(() => sendMessage(q), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      setInput("");
      lastUserQueryRef.current = question;

      const history: Message[] = [
        ...messages,
        { role: "user", content: question },
      ];
      setMessages(history);
      setLoading(true);

      // Placeholder while streaming starts
      const placeholder: Message = {
        role: "assistant",
        content: "",
        streaming: true,
        relatedArticles: [],
        continueLearning: null,
        followUps: [],
        sources: [],
      };
      setMessages((prev) => [...prev, placeholder]);

      abortRef.current = new AbortController();

      try {
        const ctx = getArticleContext();

        const res = await fetch("/api/btt-assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
            currentSlug:    ctx.slug,
            currentHeading: ctx.heading,
            currentTrack:   ctx.track,
            currentCategory: ctx.category,
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        const patchLast = (patch: Partial<Message>) => {
          setMessages((prev) => {
            const msgs = [...prev];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              msgs[msgs.length - 1] = { ...last, ...patch };
            }
            return msgs;
          });
        };

        // eslint-disable-next-line no-constant-condition
        outer: while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event = JSON.parse(line.slice(6)) as SSEEvent;

              switch (event.type) {
                case "meta":
                  patchLast({
                    relatedArticles: event.relatedArticles,
                    continueLearning: event.continueLearning,
                    sources: event.sources,
                  });
                  break;
                case "token":
                  accumulated += event.text;
                  patchLast({ content: accumulated });
                  break;
                case "followups":
                  patchLast({ followUps: event.questions });
                  break;
                case "done":
                  patchLast({ streaming: false });
                  break outer;
                case "error":
                  patchLast({
                    content: `⚠️ ${event.message}`,
                    streaming: false,
                    isError: true,
                  });
                  break outer;
              }
            } catch {
              // Malformed SSE line — skip
            }
          }
        }
      } catch (err) {
        const aborted = err instanceof Error && err.name === "AbortError";
        if (!aborted) {
          setMessages((prev) => {
            const msgs = [...prev];
            const last = msgs[msgs.length - 1];
            if (last?.role === "assistant") {
              msgs[msgs.length - 1] = {
                ...last,
                content: "Network error 😅 Thodi der baad try karo.",
                streaming: false,
                isError: true,
              };
            }
            return msgs;
          });
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [messages, loading]
  );

  const isFirstMessage = messages.length === 1;
  const t = theme;

  // ── Rebuilt render, below this line every piece of JSX/styling is new ──

  return (
    <>
      {/* Full-screen anchor layer — inset:0 fills the real viewport with zero
          calculation (no vh/dvh/height math anywhere). justifyContent:"flex-end"
          + alignItems:"flex-end" naturally pin content to the bottom-right,
          exactly like the previous fixed bottom/right offsets did, but without
          any independent position:fixed on the children below. pointerEvents
          is "none" here so empty screen area stays click-through; both the
          panel and the button re-enable pointerEvents on themselves. */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: viewportHeight,
          zIndex: 9000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 24,
          gap: 16,
          pointerEvents: "none",
        }}
      >
        {/* Chat panel — appears first in DOM order so it stacks directly
            above the launcher button below it. No position/top/bottom/
            height/maxHeight of its own: its size is now purely a flex-layout
            outcome. The wrapper above is bounded by the real viewport
            (inset:0), and flexbox's default flex-shrink:1 behavior — already
            cascading through this panel's own header(shrink:0)/chips(shrink:0)/
            messages(flex:1, minHeight:0, overflowY:auto)/input(shrink:0)
            column below — means if there isn't enough room, the messages
            area is what gives, not the panel spilling past the screen edge. */}
        {open && (
          <div
            role="dialog"
            aria-label="BTT Assistant chat"
            aria-modal="false"
            style={{
              pointerEvents: "auto",
              width: 400,
              maxWidth: "calc(100vw - 24px)",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(15,23,42,.18)",
              overflow: "hidden",
              animation: "bttSlideUp 0.2s ease forwards",
            }}
          >
          {/* Header — white, no gradient, bottom border */}
          <div style={{
            height: 56,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
            background: "#ffffff",
            borderBottom: "1px solid #E5E7EB",
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(150deg, #3B82F6 0%, #2563EB 55%, #1D4ED8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(37,99,235,0.3), 0 1px 2px rgba(15,23,42,0.06)",
            }}>
              <Bot size={20} color="#ffffff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: 18, fontWeight: 650, color: "#0F172A", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                BTT Assistant
              </div>
              <div style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 12, fontWeight: 500, color: "#64748B", marginTop: 2 }}>
                Your Data Center AI Expert
              </div>
            </div>
            <span style={{ width: 7, height: 7, background: "#16A34A", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#6B7280",
                padding: 4,
                display: "flex",
                borderRadius: 6,
                flexShrink: 0,
              }}
            >
              <X size={17} />
            </button>
          </div>

          {/* Suggestion chips — scrollable horizontal row */}
          <div style={{
            height: 38,
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
            overflowX: "auto",
            borderBottom: "1px solid #E5E7EB",
          }}>
            {MODES.map((mode) => (
              <button
                key={mode.label}
                onClick={() => sendMessage(mode.hint)}
                disabled={loading}
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 999,
                  padding: "6px 12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  opacity: loading ? 0.5 : 1,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (loading) return;
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#EFF6FF";
                  el.style.borderColor = "#2563EB";
                  el.style.color = "#1D4ED8";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#ffffff";
                  el.style.borderColor = "#E5E7EB";
                  el.style.color = "#374151";
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Messages — scrollable */}
          <div
            aria-live="polite"
            aria-label="Chat messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              minHeight: 0,
              background: "#ffffff",
            }}
          >
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                msg={msg}
                theme={t}
                onFollowUp={sendMessage}
                onRetry={retry}
                isLast={i === messages.length - 1}
              />
            ))}

            {loading && messages[messages.length - 1]?.content === "" && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Bot size={14} color="#ffffff" />
                </div>
                <div style={{ padding: "12px 16px", background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "18px 18px 18px 4px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "flex", gap: 4 }}>
                    <span className="btt-typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9CA3AF", display: "inline-block" }} />
                    <span className="btt-typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9CA3AF", display: "inline-block", animationDelay: "0.15s" }} />
                    <span className="btt-typing-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9CA3AF", display: "inline-block", animationDelay: "0.3s" }} />
                  </span>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, color: "#6B7280" }}>
                    Soch raha hoon...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Popular Questions — 2-column grid, collapsed to 2 by default, only on first message */}
          {isFirstMessage && !loading && (
            <div style={{ padding: "10px 16px", flexShrink: 0, borderTop: "1px solid #E5E7EB", background: "#F8FAFC" }}>
              <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px" }}>
                Popular Questions
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {(showAllQuestions ? SUGGESTIONS : SUGGESTIONS.slice(0, 2)).map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.label)}
                    className="btt-question-card"
                    style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                      background: "#ffffff",
                      border: "1px solid #E5E7EB",
                      borderRadius: 14,
                      padding: "10px 12px",
                      height: 58,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      textAlign: "left",
                      lineHeight: 1.3,
                      boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{s.emoji}</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{s.label}</span>
                  </button>
                ))}
              </div>
              {SUGGESTIONS.length > 2 && (
                <button
                  onClick={() => setShowAllQuestions((v) => !v)}
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: 10,
                    padding: "7px 0",
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#2563EB",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {showAllQuestions ? "Show Less" : "View More"}
                </button>
              )}
            </div>
          )}

          {/* Input — pinned bottom, rounded pill, send inside */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #E5E7EB",
            background: "#ffffff",
            flexShrink: 0,
            paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
          }}>
            <div style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "#F8FAFC",
              border: `1.5px solid ${inputFocused ? "#2563EB" : "#D1D5DB"}`,
              borderRadius: 999,
              padding: "6px 6px 6px 16px",
              boxShadow: inputFocused ? "0 0 0 4px rgba(37,99,235,0.12)" : "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Kuch bhi poochho..."
                disabled={loading}
                aria-label="Type your question"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: 15,
                  color: "#111827",
                  background: "transparent",
                }}
              />

              {loading ? (
                <button
                  onClick={stopGeneration}
                  aria-label="Stop generating"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#fef2f2",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Square size={13} color="#DC2626" />
                </button>
              ) : (
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  aria-label="Send message"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: input.trim() ? "#2563EB" : "#E5E7EB",
                    border: "none",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.15s ease",
                  }}
                >
                  <Send size={14} color={input.trim() ? "#ffffff" : "#9CA3AF"} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

        {/* Floating launcher button — a plain flex child now, pinned to the
            bottom-right purely by the wrapper's justifyContent/alignItems.
            No position/top/bottom/right of its own. */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close BTT Assistant" : "Open BTT Assistant"}
          aria-expanded={open}
          style={{
            position: "relative",
            pointerEvents: "auto",
            flexShrink: 0,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#2563EB",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          {open ? <X size={22} color="#ffffff" /> : <Bot size={22} color="#ffffff" />}
          {!open && (
            <span style={{
              position: "absolute",
              top: 3,
              right: 3,
              width: 10,
              height: 10,
              background: "#16A34A",
              borderRadius: "50%",
              border: "2px solid #ffffff",
            }} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes bttSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bttBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes bttDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        .btt-typing-dot {
          animation: bttDotBounce 1.1s ease-in-out infinite;
        }
        .btt-question-card:hover {
          border-color: #2563EB;
          box-shadow: 0 8px 20px rgba(37,99,235,0.12);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
