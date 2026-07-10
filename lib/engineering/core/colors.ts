// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/core/colors.ts
//
// The Behind The Tech engineering diagram palette — white background,
// Schneider/ABB/Vertiv textbook style. Domain-agnostic: used by every
// SVG across every domain (electrical, cooling, mechanical, fire, BMS,
// networking, etc.)
//
// Dark mode is intentionally NOT implemented per current spec. If added
// later, this is the single file that changes.
// ═══════════════════════════════════════════════════════════════════════════

export const ENGINEERING_COLORS = {
  background: "#ffffff",
  outline: "#222222",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  textFaint: "#94a3b8",

  blue: "#2563EB",
  blueLight: "#eff6ff",
  blueBorder: "#bfdbfe",

  green: "#16a34a",
  greenLight: "#f0fdf4",
  greenDark: "#166534",
  greenBorder: "#bbf7d0",

  orange: "#f97316",
  orangeLight: "#fff7ed",
  orangeDark: "#c2410c",
  orangeBorder: "#fed7aa",

  red: "#dc2626",
  redLight: "#fef2f2",
  redDark: "#991b1b",
  redBorder: "#fecaca",

  purple: "#a855f7",
  purpleLight: "#faf5ff",
  purpleDark: "#6b21a8",

  grayLight: "#f1f5f9",
  grayBorder: "#e2e8f0",
  grayMid: "#cbd5e1",
} as const;

export type EngineeringColorKey = keyof typeof ENGINEERING_COLORS;

// ─── Callout identity mapping (Phase B final polish) ──────────────────────────
// The requested 6 named types (Summary/Insight/Engineer Tip/Warning/Danger/
// Definition) do not literally match this file's existing 7 keys — those keys
// are used as literal `type="..."` props across dozens of call-sites in
// already-shipped article content, so renaming them would be a content change
// (out of scope). Instead, each existing key is mapped to the closest new
// named identity by semantic role:
//   maintenance     -> Summary        (soft blue)   — general informational note
//   important       -> Insight        (soft indigo) — a highlighted key fact
//   best-practice   -> Engineer Tip   (soft green)  — practical field advice
//   warning         -> Warning        (soft amber)
//   danger          -> Danger         (soft red)
//   common-mistake  -> Danger variant (soft red)     — same family as danger
//   interview       -> Definition     (light gray)   — neutral reference note
export const CALLOUT_COLORS = {
  danger: { bg: "#fef2f2", border: "#DC2626", icon: "🔴", titleColor: "#991b1b" },
  important: { bg: "#eef2ff", border: "#4F46E5", icon: "🟣", titleColor: "#3730a3" },
  "best-practice": { bg: "#f0fdf4", border: "#16A34A", icon: "🟢", titleColor: "#166534" },
  maintenance: { bg: "#eff6ff", border: "#2563EB", icon: "🔧", titleColor: "#1e40af" },
  interview: { bg: "#f8fafc", border: "#94a3b8", icon: "💼", titleColor: "#374151" },
  warning: { bg: "#fffbeb", border: "#D97706", icon: "⚠️", titleColor: "#92400e" },
  "common-mistake": { bg: "#fef2f2", border: "#DC2626", icon: "❌", titleColor: "#991b1b" },
} as const;

export type CalloutType = keyof typeof CALLOUT_COLORS;

/** Power-flow convention used consistently across every diagram in every domain. */
export const FLOW_COLORS = {
  normal: ENGINEERING_COLORS.green,
  backup: ENGINEERING_COLORS.orange,
  fault: ENGINEERING_COLORS.red,
} as const;
