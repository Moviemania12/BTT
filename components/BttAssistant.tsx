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
  Loader2,
  ChevronDown,
  BookOpen,
  Square,
  RotateCcw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Theme ────────────────────────────────────────────────────────────────────

interface Theme {
  panelBg: string;
  panelBorder: string;
  panelShadow: string;
  headerGradient: string;
  modeBarBg: string;
  modeBarBorder: string;
  modeBtnBg: string;
  modeBtnBorder: string;
  modeBtnText: string;
  modeBtnHoverBg: string;
  modeBtnHoverBorder: string;
  modeBtnHoverText: string;
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
  inputPlaceholder: string;
  sendBtnActive: string;
  sendBtnDisabled: string;
  sendBtnIconActive: string;
  sendBtnIconDisabled: string;
  stopBtnBg: string;
  stopBtnText: string;
  footerText: string;
  labelText: string;
  sourceText: string;
  suggestionBg: string;
  suggestionBorder: string;
  suggestionText: string;
  suggestionHoverBg: string;
  suggestionHoverBorder: string;
  suggestionHoverText: string;
  followupBg: string;
  followupBorder: string;
  followupText: string;
  followupHoverBg: string;
  followupHoverBorder: string;
  followupHoverText: string;
  retryColor: string;
  codeBg: string;
  codeText: string;
  tableBorder: string;
  tableHeaderBg: string;
  tableHeaderText: string;
  tableAltRow: string;
  hrColor: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
}

const LIGHT: Theme = {
  panelBg: "#ffffff",
  panelBorder: "#e5e7eb",
  panelShadow: "0 24px 64px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)",
  headerGradient: "linear-gradient(135deg, #1e2d5a 0%, #1d4ed8 100%)",
  modeBarBg: "#f9fafb",
  modeBarBorder: "#f1f0f0",
  modeBtnBg: "#ffffff",
  modeBtnBorder: "#e5e7eb",
  modeBtnText: "#64748b",
  modeBtnHoverBg: "#eff6ff",
  modeBtnHoverBorder: "#1d4ed8",
  modeBtnHoverText: "#1d4ed8",
  msgUserBg: "linear-gradient(135deg, #1e2d5a 0%, #1d4ed8 100%)",
  msgUserText: "#ffffff",
  msgAssistantBg: "#f8f9fa",
  msgAssistantBorder: "#e5e7eb",
  msgAssistantText: "#1e293b",
  inputAreaBg: "#fafaf9",
  inputAreaBorder: "#f1f0f0",
  inputBg: "#ffffff",
  inputBorder: "#e5e7eb",
  inputBorderFocus: "#1d4ed8",
  inputText: "#1e293b",
  inputPlaceholder: "#9ca3af",
  sendBtnActive: "linear-gradient(135deg, #1e2d5a, #1d4ed8)",
  sendBtnDisabled: "#f1f5f9",
  sendBtnIconActive: "#ffffff",
  sendBtnIconDisabled: "#94a3b8",
  stopBtnBg: "#fef2f2",
  stopBtnText: "#dc2626",
  footerText: "#d1d5db",
  labelText: "#94a3b8",
  sourceText: "#cbd5e1",
  suggestionBg: "#f8f9fa",
  suggestionBorder: "#e5e7eb",
  suggestionText: "#475569",
  suggestionHoverBg: "#eff6ff",
  suggestionHoverBorder: "#bfdbfe",
  suggestionHoverText: "#1d4ed8",
  followupBg: "#ffffff",
  followupBorder: "#e5e7eb",
  followupText: "#475569",
  followupHoverBg: "#eff6ff",
  followupHoverBorder: "#1d4ed8",
  followupHoverText: "#1d4ed8",
  retryColor: "#94a3b8",
  codeBg: "#1e293b",
  codeText: "#e2e8f0",
  tableBorder: "#e5e7eb",
  tableHeaderBg: "#f1f5f9",
  tableHeaderText: "#374151",
  tableAltRow: "rgba(0,0,0,0.02)",
  hrColor: "#e5e7eb",
  scrollbarTrack: "transparent",
  scrollbarThumb: "#e5e7eb",
};

const DARK: Theme = {
  panelBg: "#1a1f2e",
  panelBorder: "#2d3748",
  panelShadow: "0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
  headerGradient: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
  modeBarBg: "#141924",
  modeBarBorder: "#1e2535",
  modeBtnBg: "#1e2535",
  modeBtnBorder: "#2d3748",
  modeBtnText: "#9ca3af",
  modeBtnHoverBg: "#1e3a8a22",
  modeBtnHoverBorder: "#3b82f6",
  modeBtnHoverText: "#93c5fd",
  msgUserBg: "linear-gradient(135deg, #1e2d5a 0%, #1d4ed8 100%)",
  msgUserText: "#ffffff",
  msgAssistantBg: "#1e2535",
  msgAssistantBorder: "#2d3748",
  msgAssistantText: "#e2e8f0",
  inputAreaBg: "#141924",
  inputAreaBorder: "#1e2535",
  inputBg: "#0f1520",
  inputBorder: "#2d3748",
  inputBorderFocus: "#3b82f6",
  inputText: "#e2e8f0",
  inputPlaceholder: "#4b5563",
  sendBtnActive: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  sendBtnDisabled: "#1e2535",
  sendBtnIconActive: "#ffffff",
  sendBtnIconDisabled: "#4b5563",
  stopBtnBg: "#2d1515",
  stopBtnText: "#f87171",
  footerText: "#374151",
  labelText: "#6b7280",
  sourceText: "#374151",
  suggestionBg: "#1e2535",
  suggestionBorder: "#2d3748",
  suggestionText: "#94a3b8",
  suggestionHoverBg: "#1e3a8a22",
  suggestionHoverBorder: "#3b82f6",
  suggestionHoverText: "#93c5fd",
  followupBg: "#1e2535",
  followupBorder: "#2d3748",
  followupText: "#94a3b8",
  followupHoverBg: "#1e3a8a22",
  followupHoverBorder: "#3b82f6",
  followupHoverText: "#93c5fd",
  retryColor: "#4b5563",
  codeBg: "#0d1117",
  codeText: "#e6edf3",
  tableBorder: "#2d3748",
  tableHeaderBg: "#1e2535",
  tableHeaderText: "#94a3b8",
  tableAltRow: "rgba(255,255,255,0.02)",
  hrColor: "#2d3748",
  scrollbarTrack: "transparent",
  scrollbarThumb: "#2d3748",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── Article context from current URL ─────────────────────────────────────────

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

// ─── Track colours ────────────────────────────────────────────────────────────

const TRACK_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  "non-it": { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  "it":     { bg: "#f0fdfa", text: "#0d9488", border: "#99f6e4" },
  "ai":     { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  "learn":  { bg: "#fafaf9", text: "#475569", border: "#e5e7eb" },
};

function trackColour(track: string) {
  return TRACK_COLOURS[track] ?? TRACK_COLOURS["learn"];
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

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
            background: "rgba(0,0,0,0.08)",
            borderRadius: 4,
            padding: "1px 5px",
            fontFamily: "monospace",
            fontSize: "0.87em",
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
    fontSize: 13.5,
    color: t.msgAssistantText,
    lineHeight: 1.65,
  };

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={key++} style={{ height: 6 }} />);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      elements.push(
        <hr key={key++} style={{ border: "none", borderTop: `1px solid ${t.hrColor}`, margin: "8px 0" }} />
      );
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 700, fontSize: 13.5, margin: "10px 0 4px" }}>
          <MarkdownLine text={line.slice(4)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 700, fontSize: 15, margin: "12px 0 5px" }}>
          <MarkdownLine text={line.slice(3)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 800, fontSize: 16, margin: "14px 0 6px" }}>
          <MarkdownLine text={line.slice(2)} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} style={{ margin: "8px 0" }}>
          {lang && (
            <div style={{
              background: "#374151",
              color: "#9ca3af",
              fontFamily: "monospace",
              fontSize: 10,
              padding: "3px 12px",
              borderRadius: "8px 8px 0 0",
              letterSpacing: "0.06em",
            }}>
              {lang.toUpperCase()}
            </div>
          )}
          <pre style={{
            background: t.codeBg,
            borderRadius: lang ? "0 0 8px 8px" : 8,
            padding: "10px 14px",
            overflowX: "auto",
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.6,
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

    // Table (starts with |)
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
          <div key={key++} style={{ overflowX: "auto", margin: "10px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr>
                  {headers.map((h, hi) => (
                    <th
                      key={hi}
                      style={{
                        background: t.tableHeaderBg,
                        color: t.tableHeaderText,
                        padding: "7px 12px",
                        textAlign: "left",
                        fontWeight: 600,
                        borderBottom: `2px solid ${t.tableBorder}`,
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
                          padding: "6px 12px",
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

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} style={{ paddingLeft: 18, margin: "6px 0", display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ ...baseStyle, margin: 0 }}>
              <MarkdownLine text={item} color={t.msgAssistantText} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bullet list
    if (/^[-•*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-•*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-•*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} style={{ paddingLeft: 0, margin: "6px 0", display: "flex", flexDirection: "column", gap: 3, listStyle: "none" }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", ...baseStyle, margin: 0 }}>
              <span style={{ color: "#1d4ed8", marginTop: 7, width: 5, height: 5, borderRadius: "50%", background: "#1d4ed8", flexShrink: 0, display: "inline-block" }} />
              <span><MarkdownLine text={item} color={t.msgAssistantText} /></span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Emoji-led lines (troubleshooting headers etc.)
    if (/^[⚠️🔍✅🛡️📚🎯💡🔧⚡📖🧮💼📝]/.test(line)) {
      elements.push(
        <p key={key++} style={{ ...baseStyle, fontWeight: 600, margin: "10px 0 3px" }}>
          <MarkdownLine text={line} color={t.msgAssistantText} />
        </p>
      );
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} style={{ ...baseStyle, margin: "3px 0" }}>
        <MarkdownLine text={line} color={t.msgAssistantText} />
      </p>
    );
    i++;
  }

  return <div style={{ display: "flex", flexDirection: "column" }}>{elements}</div>;
}

// ─── Article chip ─────────────────────────────────────────────────────────────

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
        padding: "4px 10px",
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        borderRadius: 980,
        textDecoration: "none",
        transition: "box-shadow 0.15s ease",
        flexShrink: 0,
      }}
    >
      <BookOpen size={10} style={{ color: c.text, flexShrink: 0 }} />
      <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 11.5, fontWeight: 600, color: c.text, whiteSpace: "nowrap" }}>
        {article.title}
      </span>
    </Link>
  );
}

// ─── Chat message ─────────────────────────────────────────────────────────────

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
        marginBottom: 14,
        gap: 8,
        alignItems: "flex-end",
      }}
    >
      {!isUser && (
        <div style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: t.headerGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 13,
        }}>
          🤖
        </div>
      )}

      <div style={{ maxWidth: "85%", display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        {/* Bubble */}
        <div style={{
          padding: "11px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser ? t.msgUserBg : t.msgAssistantBg,
          color: isUser ? t.msgUserText : t.msgAssistantText,
          border: isUser ? "none" : `1.5px solid ${t.msgAssistantBorder}`,
          wordBreak: "break-word",
        }}>
          {isUser ? (
            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13.5, lineHeight: 1.55, margin: 0, color: t.msgUserText }}>
              {msg.content}
            </p>
          ) : (
            <>
              <MarkdownRenderer text={msg.content} theme={t} />
              {/* Streaming cursor */}
              {msg.streaming && (
                <span style={{
                  display: "inline-block",
                  width: 2,
                  height: 14,
                  background: "#1d4ed8",
                  marginLeft: 2,
                  verticalAlign: "middle",
                  animation: "bttBlink 0.9s step-end infinite",
                }} />
              )}
            </>
          )}
        </div>

        {/* Post-stream content */}
        {!isUser && !msg.streaming && (
          <>
            {/* Related articles */}
            {msg.relatedArticles && msg.relatedArticles.length > 0 && (
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 8.5, color: t.labelText, letterSpacing: "0.12em", marginBottom: 5 }}>
                  RELATED ARTICLES
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {msg.relatedArticles.map((a) => (
                    <ArticleChip key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Continue learning */}
            {msg.continueLearning && (
              <Link
                href={`/learn/${msg.continueLearning.track}/${msg.continueLearning.category}/${msg.continueLearning.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  background: t.headerGradient,
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>
                  ▶️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em" }}>
                    CONTINUE LEARNING
                  </div>
                  <div style={{ fontFamily: "var(--font-body, sans-serif)", fontWeight: 700, fontSize: 13, color: "#ffffff", marginTop: 1 }}>
                    {msg.continueLearning.title}
                  </div>
                </div>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, flexShrink: 0 }}>→</span>
              </Link>
            )}

            {/* Source attribution */}
            {msg.sources && msg.sources.length > 0 && (
              <p style={{ fontFamily: "monospace", fontSize: 8.5, color: t.sourceText, letterSpacing: "0.06em", margin: 0 }}>
                📖 {msg.sources.join(" · ")} · Gemini
              </p>
            )}

            {/* Follow-up suggestions */}
            {msg.followUps && msg.followUps.length > 0 && (
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 8.5, color: t.labelText, letterSpacing: "0.12em", marginBottom: 5 }}>
                  ASK NEXT
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {msg.followUps.map((q) => (
                    <button
                      key={q}
                      onClick={() => onFollowUp(q)}
                      style={{
                        fontFamily: "var(--font-body, sans-serif)",
                        fontSize: 12,
                        color: t.followupText,
                        background: t.followupBg,
                        border: `1.5px solid ${t.followupBorder}`,
                        borderRadius: 8,
                        padding: "7px 12px",
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
                      ↳ {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Retry button (only on last message) */}
            {isLast && (
              <button
                onClick={onRetry}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: t.retryColor,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  padding: 0,
                  marginTop: 2,
                }}
              >
                <RotateCcw size={9} />
                RETRY
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Suggested questions ──────────────────────────────────────────────────────

const SUGGESTIONS = [
  { label: "DG Set kya hota hai?",           emoji: "⚡" },
  { label: "UPS vs Battery Bank difference?", emoji: "🔋" },
  { label: "Tier III vs Tier IV?",            emoji: "🏢" },
  { label: "DC me career kaise banaye?",      emoji: "🎯" },
  { label: "Mock interview shuru karo",       emoji: "💼" },
  { label: "Learning path dikhao",            emoji: "🗺️" },
];

const MODES = [
  { label: "💡 Explain",       hint: "explain karo" },
  { label: "🔧 Troubleshoot", hint: "troubleshoot karo" },
  { label: "🧮 Calculate",    hint: "calculate karo" },
  { label: "💼 Interview",    hint: "mock interview karo" },
  { label: "📝 Quiz",         hint: "quiz lo" },
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Namaste! Main BTT Assistant hoon 🤖\n\nData Centers, electrical engineering, IT infra, AI, career guidance — **kuch bhi poochho**.\n\nHinglish me poochho, Hinglish me jawab milega!",
  relatedArticles: [],
  continueLearning: null,
  followUps: [],
  sources: [],
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function BttAssistant() {
  const dark = useDarkMode();
  const theme = dark ? DARK : LIGHT;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserQueryRef = useRef<string>("");

  // Open via Hero banner
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("btt-open-ai", handler);
    return () => window.removeEventListener("btt-open-ai", handler);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 30);
    }
  }, [messages, open]);

  // Focus input on open
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

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close BTT Assistant" : "Open BTT Assistant"}
        aria-expanded={open}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9000,
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: open ? "#475569" : t.headerGradient,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? "0 4px 12px rgba(0,0,0,0.2)"
            : "0 6px 24px rgba(29,78,216,0.4)",
          transition: "all 0.25s ease",
          fontSize: 22,
        }}
        onMouseEnter={(e) => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {open ? <ChevronDown size={20} color="#ffffff" /> : "🤖"}
        {!open && (
          <span style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 11,
            height: 11,
            background: "#22c55e",
            borderRadius: "50%",
            border: "2px solid #ffffff",
          }} />
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="BTT Assistant chat"
          aria-modal="false"
          style={{
            position: "fixed",
            bottom: 94,
            right: 24,
            zIndex: 8999,
            width: 368,
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100dvh - 130px)",
            display: "flex",
            flexDirection: "column",
            background: t.panelBg,
            border: `1.5px solid ${t.panelBorder}`,
            borderRadius: 20,
            boxShadow: t.panelShadow,
            overflow: "hidden",
            animation: "bttSlideUp 0.22s ease forwards",
          }}
        >
          {/* Header */}
          <div style={{
            background: t.headerGradient,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>
              🤖
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: 15, color: "#ffffff", letterSpacing: "0.06em", lineHeight: 1.2 }}>
                BTT ASSISTANT
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 8.5, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", marginTop: 2 }}>
                ASK ANYTHING · LEARN EVERYTHING
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginRight: 4 }}>
              <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.6)" }}>
                {loading ? "Thinking..." : "Ready"}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.7)",
                padding: 4,
                display: "flex",
                borderRadius: 6,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Mode bar */}
          <div style={{
            background: t.modeBarBg,
            borderBottom: `1px solid ${t.modeBarBorder}`,
            padding: "6px 12px",
            display: "flex",
            gap: 5,
            flexShrink: 0,
            overflowX: "auto",
          }}>
            {MODES.map((mode) => (
              <button
                key={mode.label}
                onClick={() => sendMessage(mode.hint)}
                disabled={loading}
                style={{
                  fontFamily: "var(--font-body, sans-serif)",
                  fontSize: 11,
                  color: t.modeBtnText,
                  background: t.modeBtnBg,
                  border: `1.5px solid ${t.modeBtnBorder}`,
                  borderRadius: 980,
                  padding: "3px 10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.15s",
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (loading) return;
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = t.modeBtnHoverBg;
                  el.style.borderColor = t.modeBtnHoverBorder;
                  el.style.color = t.modeBtnHoverText;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = t.modeBtnBg;
                  el.style.borderColor = t.modeBtnBorder;
                  el.style.color = t.modeBtnText;
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            aria-live="polite"
            aria-label="Chat messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 4px",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
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

            {/* Initial loading (before first token) */}
            {loading && messages[messages.length - 1]?.content === "" && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.headerGradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>
                  🤖
                </div>
                <div style={{ padding: "11px 14px", background: t.msgAssistantBg, border: `1.5px solid ${t.msgAssistantBorder}`, borderRadius: "18px 18px 18px 4px", display: "flex", alignItems: "center", gap: 7 }}>
                  <Loader2 size={13} color="#1d4ed8" style={{ animation: "bttSpin 0.8s linear infinite" }} />
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: 13, color: t.labelText }}>
                    Soch raha hoon...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first message) */}
          {isFirstMessage && !loading && (
            <div style={{ padding: "4px 12px 8px", flexShrink: 0, borderTop: `1px solid ${t.modeBarBorder}` }}>
              <p style={{ fontFamily: "monospace", fontSize: 8.5, color: t.labelText, letterSpacing: "0.14em", margin: "6px 0" }}>
                POPULAR QUESTIONS
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.label)}
                    style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: 11.5,
                      color: t.suggestionText,
                      background: t.suggestionBg,
                      border: `1.5px solid ${t.suggestionBorder}`,
                      borderRadius: 980,
                      padding: "5px 11px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = t.suggestionHoverBg;
                      el.style.borderColor = t.suggestionHoverBorder;
                      el.style.color = t.suggestionHoverText;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = t.suggestionBg;
                      el.style.borderColor = t.suggestionBorder;
                      el.style.color = t.suggestionText;
                    }}
                  >
                    <span>{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div style={{
            padding: "10px 12px 14px",
            borderTop: `1px solid ${t.inputAreaBorder}`,
            background: t.inputAreaBg,
            flexShrink: 0,
            paddingBottom: "max(14px, env(safe-area-inset-bottom, 14px))",
          }}>
            <div style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: t.inputBg,
              border: `1.5px solid ${inputFocused ? t.inputBorderFocus : t.inputBorder}`,
              borderRadius: 14,
              padding: "9px 10px 9px 14px",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxShadow: inputFocused
                ? `0 0 0 3px ${dark ? "rgba(59,130,246,0.15)" : "rgba(29,78,216,0.08)"}`
                : "none",
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
                  fontSize: 13.5,
                  color: t.inputText,
                  background: "transparent",
                  lineHeight: 1.5,
                }}
              />

              {/* Stop button while streaming */}
              {loading ? (
                <button
                  onClick={stopGeneration}
                  aria-label="Stop generating"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: t.stopBtnBg,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "opacity 0.15s",
                  }}
                >
                  <Square size={13} color={t.stopBtnText} />
                </button>
              ) : (
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  aria-label="Send message"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: input.trim() ? t.sendBtnActive : t.sendBtnDisabled,
                    border: "none",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                >
                  <Send size={14} color={input.trim() ? t.sendBtnIconActive : t.sendBtnIconDisabled} />
                </button>
              )}
            </div>

            <p style={{ fontFamily: "monospace", fontSize: 8.5, color: t.footerText, textAlign: "center", marginTop: 7, letterSpacing: "0.08em" }}>
              Powered by Gemini · Behind The Tech
            </p>
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes bttSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bttSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bttBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  );
}
