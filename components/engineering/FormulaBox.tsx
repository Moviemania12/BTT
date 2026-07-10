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
        background: "#F8FAFC",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "1rem 1.3rem",
        margin: "1rem 0",
        fontFamily: "monospace",
        fontSize: "0.95rem",
        lineHeight: 1.8,
      }}
    >
      <div style={{ color: "#374151" }}>{formula}</div>
      {workedExample && <div style={{ marginTop: "0.4rem", color: "#6B7280" }}>{workedExample}</div>}
      {result && (
        <div style={{ marginTop: "0.4rem", color: "#111827" }}>
          <strong>{result}</strong>
        </div>
      )}
    </div>
  );
}

export default FormulaBox;
