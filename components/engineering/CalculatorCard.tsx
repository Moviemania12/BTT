"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CalculatorCard.tsx
//
// Shared visual shell for every calculator across the platform — the blue
// border, title row, and validation-error/result panel. Individual
// calculators (UpsLoadCalculator, BatteryAhCalculator, etc.) provide their
// own input fields as children and call useCalculator (hooks/useCalculator.ts)
// for state + validation logic; this component only renders the consistent
// chrome around them.
// ═══════════════════════════════════════════════════════════════════════════

import type { ReactNode } from "react";

export interface CalculatorCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  /** If provided and non-null, shows the error panel instead of children's result area */
  errorMessage?: string | null;
}

export function CalculatorCard({ title, icon = "🧮", children, errorMessage }: CalculatorCardProps) {
  return (
    <div
      role="group"
      aria-label={title}
      style={{
        border: "2px solid #0066CC",
        borderRadius: "12px",
        padding: "1.5rem",
        margin: "1.5rem 0",
        background: "#eaf4ff",
      }}
    >
      <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0066CC", marginBottom: "1rem" }}>
        <span aria-hidden="true">{icon}</span> Calculator — {title}
      </p>

      {children}

      {errorMessage && (
        <div
          role="alert"
          style={{
            marginTop: "1.2rem",
            padding: "1rem",
            background: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #fecaca",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#dc2626", fontWeight: 600 }}>
            ⚠️ {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculatorCard;
