// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/shared.tsx
//
// Thin re-export layer — identical pattern to ups/shared.tsx.
// Section files (sections/*.tsx) import from "../shared".
// All real implementations live in components/engineering/*.
// ═══════════════════════════════════════════════════════════════════════════

export { Callout, type CalloutProps } from "@/components/engineering/Callout";
export { EngineeringTable as ComparisonTable } from "@/components/engineering/EngineeringTable";
export { SvgFigure as Figure } from "@/components/engineering/SvgFigure";
export { CalculatorLink, CalculatorLinkList } from "@/components/engineering/CalculatorLink";
export type { CalloutType } from "@/lib/engineering/core/colors";

// ─── Shared style tokens — dark-theme compatible (same as UPS article) ────────

export const S = {
  h2: { fontSize: "1.9rem", fontWeight: 800, color: "#111827", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginTop: "2rem", marginBottom: "0.75rem" } as const,
  p: { fontSize: "1.05rem", lineHeight: 1.75, color: "#1f2937", marginBottom: "1rem" } as const,
  ul: { fontSize: "1.05rem", lineHeight: 1.8, color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,
  ol: { fontSize: "1.05rem", lineHeight: 1.8, color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,

  // ─── Section format standard: Quick Answer / Engineer Tip / Key Takeaway ──
  // Every major section (Part-level) starts with these three blocks per
  // Blueprint v3.0 "Section Format Standard" requirement.
  quickAnswer: {
    background: "rgba(37,99,235,0.05)",
    border: "1px solid rgba(37,99,235,0.15)",
    borderLeft: "3px solid #2563EB",
    borderRadius: "6px",
    padding: "1rem 1.25rem",
    marginBottom: "1.25rem",
  } as const,
  engineerTip: {
    background: "rgba(22,163,74,0.06)",
    border: "1px solid rgba(22,163,74,0.2)",
    borderLeft: "3px solid #16a34a",
    borderRadius: "6px",
    padding: "1rem 1.25rem",
    marginBottom: "1.25rem",
  } as const,
  keyTakeaway: {
    background: "rgba(168,85,247,0.06)",
    border: "1px solid rgba(168,85,247,0.2)",
    borderLeft: "3px solid #a855f7",
    borderRadius: "6px",
    padding: "0.85rem 1.25rem",
    marginBottom: "1.5rem",
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#1f2937",
  } as const,
};

// ─── SectionIntro — renders Quick Answer / Engineer Tip / Key Takeaway ────────
// Reusable across every section to enforce the Blueprint format standard.

interface SectionIntroProps {
  quickAnswer: string;
  engineerTip: string;
  keyTakeaway: string;
}

export function SectionIntro({ quickAnswer, engineerTip, keyTakeaway }: SectionIntroProps) {
  return (
    <>
      <div style={S.quickAnswer}>
        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: "#2563EB", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          Quick Answer
        </p>
        <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.7, color: "#1f2937" }}>
          {quickAnswer}
        </p>
      </div>
      <div style={S.engineerTip}>
        <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700, color: "#16a34a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          🔧 Engineer Tip
        </p>
        <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.7, color: "#1f2937" }}>
          {engineerTip}
        </p>
      </div>
      <div style={S.keyTakeaway}>
        ⚡ {keyTakeaway}
      </div>
    </>
  );
}
