"use client";

import type { ChangeEvent } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CalculatorField.tsx
//
// Premium redesign — larger touch target, uppercase micro-label (matching
// the homepage form pattern), stronger focus ring, more generous radius.
// Same props/onChange contract, zero logic changes.
// ═══════════════════════════════════════════════════════════════════════════

export interface CalculatorFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function CalculatorField({ label, value, onChange, min, max, step, unit }: CalculatorFieldProps) {
  const inputId = `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={inputId}
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "#6B7280",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "0.5rem",
        }}
      >
        {label}{unit ? ` (${unit})` : ""}
      </label>
      <input
        id={inputId}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value) || 0)}
        className="btt-calc-field-input"
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "12px",
          border: "1.5px solid #D1D5DB",
          background: "#ffffff",
          color: "#111827",
          fontSize: "1rem",
          fontWeight: 600,
          caretColor: "#2563EB",
          outline: "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
      />
      <style>{`
        .btt-calc-field-input::placeholder {
          color: #6B7280;
          opacity: 1;
        }
        .btt-calc-field-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.14);
        }
      `}</style>
    </div>
  );
}

export default CalculatorField;
