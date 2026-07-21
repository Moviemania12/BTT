// ═══════════════════════════════════════════════════════════════════════════
// app/learn/it/storage/san/shared.tsx
//
// Re-export layer — follows NAS article pattern exactly.
//
// TYPOGRAPHY: SAN uses slightly reduced font weights for cleaner appearance:
//   h1 (article title via ArticlePage): handled by ArticlePage — no change needed
//   h2: fontWeight 650 (lighter than NAS 700, cleaner for long technical article)
//   h3: fontWeight 580 (lighter than NAS 600)
// Same sizes, same colours, no layout changes.
// ═══════════════════════════════════════════════════════════════════════════

export { Callout, type CalloutProps } from "@/components/engineering/Callout";
export { EngineeringTable as ComparisonTable } from "@/components/engineering/EngineeringTable";
export { SvgFigure as Figure } from "@/components/engineering/SvgFigure";
export { CodeBlock } from "@/components/engineering/CodeBlock";
export type { CalloutType } from "@/lib/engineering/core/colors";

// ─── Style tokens ─────────────────────────────────────────────────────────────
// h2: fontWeight 650 — slightly less heavy than NAS (700), cleaner for SAN
// h3: fontWeight 580 — proportionally lighter than h2
export const S = {
  h2: { fontSize: "1.9rem", fontWeight: 650, color: "#111827", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.35rem", fontWeight: 580, color: "#111827", marginTop: "2rem", marginBottom: "0.75rem" } as const,
  p:  { fontSize: "1.05rem", lineHeight: 1.75, color: "#1f2937", marginBottom: "1rem" } as const,
  ul: { fontSize: "1.05rem", lineHeight: 1.8,  color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,
};
