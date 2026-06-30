"use client";

import type { ChangeEvent } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/CalculatorField.tsx
//
// Shared numeric input field for calculators. Replaces the repeated
// inline <label>/<input> markup duplicated across every calculator
// (UpsLoadCalculator, BatteryAhCalculator, RuntimeCalculator, etc.)
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
      <label htmlFor={inputId} style={{ fontSize: "0.85rem", color: "#475569", display: "block", marginBottom: "0.3rem" }}>
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
        style={{ width: "100%", padding: "0.45rem 0.6rem", borderRadius: "6px", border: "1.5px solid #cbd5e1" }}
      />
    </div>
  );
}

export default CalculatorField;
