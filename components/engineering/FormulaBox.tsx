"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/FormulaBox.tsx
//
// Shared formula display box — used by every calculator section across the
// platform to show "formula → worked example" consistently.
// ═══════════════════════════════════════════════════════════════════════════

export interface FormulaBoxProps {
  formula: string;
  workedExample?: string;
  result?: string;
}

export function FormulaBox({ formula, workedExample, result }: FormulaBoxProps) {
  return (
    <div
      style={{
        background: "#f1f5f9",
        borderRadius: "8px",
        padding: "1rem 1.3rem",
        margin: "1rem 0",
        fontFamily: "monospace",
        fontSize: "0.95rem",
        lineHeight: 1.8,
      }}
    >
      <div>{formula}</div>
      {workedExample && <div style={{ marginTop: "0.4rem", color: "#475569" }}>{workedExample}</div>}
      {result && (
        <div style={{ marginTop: "0.4rem" }}>
          <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

export default FormulaBox;
