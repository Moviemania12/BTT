// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/core/formatting.ts
//
// Domain-agnostic display formatting helpers. No formulas, no domain logic
// — pure presentation utilities reused by every calculator's result display
// across every domain.
// ═══════════════════════════════════════════════════════════════════════════

/** Formats a number with thousands separators, e.g. 50000 -> "50,000" */
export function formatThousands(n: number): string {
  return n.toLocaleString("en-IN");
}

/** Formats a number to a fixed decimal count, returning "—" for non-finite input. */
export function formatFixed(n: number | null | undefined, decimals = 1): string {
  if (n === null || n === undefined || !isFinite(n)) return "—";
  return n.toFixed(decimals);
}

/** Formats a value with its unit, e.g. formatWithUnit(192, "V") -> "192 V" */
export function formatWithUnit(value: number, unit: string, decimals = 1): string {
  return `${formatFixed(value, decimals)} ${unit}`;
}

/** Formats a percentage value, e.g. formatPercent(96.4) -> "96.4%" */
export function formatPercent(n: number | null | undefined, decimals = 1): string {
  if (n === null || n === undefined || !isFinite(n)) return "—";
  return `${n.toFixed(decimals)}%`;
}
