// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/bms-dcim/bms/shared.tsx
//
// Thin re-export layer — mirrors the UPS article pattern exactly.
// Section files import from "../shared" so the platform component
// location is abstracted and can change without touching every section.
// ═══════════════════════════════════════════════════════════════════════════

export { Callout, type CalloutProps } from "@/components/engineering/Callout";
export { EngineeringTable as ComparisonTable } from "@/components/engineering/EngineeringTable";
export { SvgFigure as Figure } from "@/components/engineering/SvgFigure";
export type { CalloutType } from "@/lib/engineering/core/colors";

// ─── Shared style tokens — matches UPS / Security article typography ──────────
export const S = {
  h2: { fontSize: "1.9rem", fontWeight: 800, color: "#111827", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginTop: "2rem", marginBottom: "0.75rem" } as const,
  p:  { fontSize: "1.05rem", lineHeight: 1.75, color: "#1f2937", marginBottom: "1rem" } as const,
  ul: { fontSize: "1.05rem", lineHeight: 1.8,  color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,
};
