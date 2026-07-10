// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/shared.tsx
//
// Thin re-export layer pointing at the shared platform framework
// (components/engineering/*, lib/engineering/core/*). Section files
// (sections/Basics.tsx etc.) import from "../shared" unchanged.
//
// MIGRATION NOTE (Phase 1 fix): import path updated from the old flat
// "@/lib/engineering/colors" to the new domain-split
// "@/lib/engineering/core/colors" — this was the one genuine stale import
// found during foundation validation.
// ═══════════════════════════════════════════════════════════════════════════

export { Callout, type CalloutProps } from "@/components/engineering/Callout";
export { EngineeringTable as ComparisonTable } from "@/components/engineering/EngineeringTable";
export { SvgFigure as Figure } from "@/components/engineering/SvgFigure";
export type { CalloutType } from "@/lib/engineering/core/colors";

// ─── Shared style tokens (article-body typography — stays local, not interactive) ──
//
// FIX: these were originally authored against a light/white background
// (color: #0f172a, #1e293b, #334155 — dark navy/slate text). The platform's
// actual article theme is dark (--color-void: #030507), so those values
// produced near-invisible, low-contrast headings. Switched to the same
// CSS custom properties the rest of the dark theme uses, so UPS headings
// match every other article and stay correct if the theme palette changes.

export const S = {
  h2: { fontSize: "1.9rem", fontWeight: 800, color: "#111827", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginTop: "2rem", marginBottom: "0.75rem" } as const,
  p: { fontSize: "1.05rem", lineHeight: 1.75, color: "#1f2937", marginBottom: "1rem" } as const,
  ul: { fontSize: "1.05rem", lineHeight: 1.8, color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,
};
