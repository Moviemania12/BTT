"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CodeBlock.tsx
//
// Shared CLI / code block component for article sections that include
// terminal commands, configuration snippets or diagnostic output.
//
// Usage:
//   <CodeBlock lang="bash">{`smartctl -a /dev/sda`}</CodeBlock>
//   <CodeBlock label="Dell — perccli64">{`perccli64 /c0 /v0 show`}</CodeBlock>
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";

export interface CodeBlockProps {
  /** Optional language label shown top-right (e.g. "bash", "shell") */
  lang?: string;
  /** Optional context label shown top-left (e.g. "Dell — perccli64") */
  label?: string;
  children: ReactNode;
}

export function CodeBlock({ lang, label, children }: CodeBlockProps) {
  return (
    <div
      role="region"
      aria-label={label ?? lang ?? "Code block"}
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: "10px",
        margin: "1.2rem 0",
        overflow: "hidden",
      }}
    >
      {(label || lang) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.45rem 1rem",
            borderBottom: "1px solid #1e293b",
            background: "#0a111e",
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "#64748b",
                letterSpacing: "0.04em",
              }}
            >
              {label}
            </span>
          )}
          {lang && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "#3b82f6",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginLeft: "auto",
              }}
            >
              {lang}
            </span>
          )}
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: "1rem 1.1rem",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "0.88rem",
          lineHeight: 1.75,
          color: "#e2e8f0",
          whiteSpace: "pre",
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
