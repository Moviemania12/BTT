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
  textPrimary: "#0f172a",
  textSecondary: "#334155",
  textMuted: "#64748b",
  textFaint: "#94a3b8",

  blue: "#0066CC",
  blueLight: "#eaf4ff",
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

export const CALLOUT_COLORS = {
  danger: { bg: ENGINEERING_COLORS.redLight, border: ENGINEERING_COLORS.red, icon: "🔴", titleColor: ENGINEERING_COLORS.redDark },
  important: { bg: "#fffbeb", border: "#f59e0b", icon: "🟡", titleColor: "#92400e" },
  "best-practice": { bg: ENGINEERING_COLORS.greenLight, border: ENGINEERING_COLORS.green, icon: "🟢", titleColor: ENGINEERING_COLORS.greenDark },
  maintenance: { bg: ENGINEERING_COLORS.blueLight, border: "#3b82f6", icon: "🔧", titleColor: "#1e40af" },
  interview: { bg: ENGINEERING_COLORS.purpleLight, border: ENGINEERING_COLORS.purple, icon: "💼", titleColor: ENGINEERING_COLORS.purpleDark },
  warning: { bg: ENGINEERING_COLORS.orangeLight, border: "#ea580c", icon: "⚠️", titleColor: "#9a3412" },
  "common-mistake": { bg: ENGINEERING_COLORS.redLight, border: "#f87171", icon: "❌", titleColor: ENGINEERING_COLORS.redDark },
} as const;

export type CalloutType = keyof typeof CALLOUT_COLORS;

/** Power-flow convention used consistently across every diagram in every domain. */
export const FLOW_COLORS = {
  normal: ENGINEERING_COLORS.green,
  backup: ENGINEERING_COLORS.orange,
  fault: ENGINEERING_COLORS.red,
} as const;
