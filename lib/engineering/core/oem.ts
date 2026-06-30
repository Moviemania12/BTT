// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/core/oem.ts
//
// Domain-agnostic OEM/vendor comparison structure. Used by every domain's
// OEM comparison sections (UPS, Battery, DG Set, Chiller, Fire Suppression,
// Networking switches, etc.)
//
// Holds STRUCTURE only — no per-article vendor data lives here. Actual
// vendor positioning notes belong in each article's own content/<slug>/
// references.ts, since vendor strengths differ meaningfully by product
// category.
// ═══════════════════════════════════════════════════════════════════════════

export interface OemEntry {
  vendor: string;
  notes: Record<string, string>;
}

export interface OemComparisonData {
  columns: string[];
  vendors: OemEntry[];
}

export const OEM_DISCLAIMER =
  "Vendor positioning below is generic industry observation, not a product specification sheet. Always verify current specs, pricing, and India support directly with the OEM before finalizing a design.";

export function buildOemComparison(columns: string[], vendors: OemEntry[]): OemComparisonData {
  return { columns, vendors };
}
