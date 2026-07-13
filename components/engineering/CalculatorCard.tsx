"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CalculatorCard.tsx
//
// Premium redesign pass — visually distinct from the prior color-only fix:
// larger radius, always-on elevated shadow, icon badge, bigger type scale,
// generous padding. Structure/props/logic unchanged — CalculatorCard still
// only renders chrome around whatever CalculatorField/FormulaBox children
// each calculator provides.
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";

export interface CalculatorCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  errorMessage?: string | null;
}

export function CalculatorCard({ title, icon = "🧮", children, errorMessage }: CalculatorCardProps) {
  return (
    <div
      role="group"
      aria-label={title}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "20px",
        padding: "2rem",
        margin: "2rem 0",
        background: "#ffffff",
        boxShadow: "0 12px 40px rgba(15,23,42,.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.5rem" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, marginBottom: "0.15rem" }}>
            Calculator
          </p>
          <p style={{ fontWeight: 800, fontSize: "1.25rem", color: "#111827", margin: 0, lineHeight: 1.25 }}>
            {title}
          </p>
        </div>
      </div>

      {children}

      {errorMessage && (
        <div
          role="alert"
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            background: "#fef2f2",
            borderRadius: "14px",
            border: "1px solid #fecaca",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.6rem",
          }}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }} aria-hidden="true">⚠️</span>
          <p style={{ fontSize: "0.95rem", color: "#DC2626", fontWeight: 600, margin: 0 }}>
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculatorCard;
