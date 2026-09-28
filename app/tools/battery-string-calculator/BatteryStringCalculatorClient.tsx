"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { calculateBatteriesPerString } from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/battery-string-calculator/BatteryStringCalculatorClient.tsx
//
// Client-side interactive calculator. Uses the real, validated
// calculateBatteriesPerString() pure function from
// lib/engineering/electrical/formulas.ts — no math is reimplemented here.
// ═══════════════════════════════════════════════════════════════════════════

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  padding: "0.6rem 0.8rem",
  fontSize: "1rem",
  color: "#111827",
  background: "#ffffff",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "0.35rem",
};

const cardStyle: CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(15,23,42,.06)",
  padding: "1.75rem",
  background: "#ffffff",
};

const UNIT_VOLTAGE_OPTIONS = [2, 6, 12];

export default function BatteryStringCalculatorClient() {
  const [busVoltage, setBusVoltage] = useState("192");
  const [unitVoltage, setUnitVoltage] = useState("12");

  const { result, error } = useMemo(() => {
    const busVoltageNum = parseFloat(busVoltage);
    const unitVoltageNum = parseFloat(unitVoltage);

    if (![busVoltageNum, unitVoltageNum].every(isFinite)) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    const count = calculateBatteriesPerString(busVoltageNum, unitVoltageNum);

    if (count === null) {
      if (busVoltageNum <= 0) {
        return { result: null, error: "Target DC Bus Voltage must be greater than 0." };
      }
      if (unitVoltageNum <= 0) {
        return { result: null, error: "Per-Battery Voltage must be greater than 0." };
      }
      return { result: null, error: "Please check your inputs — one or more values are invalid." };
    }

    return { result: { count, busVoltageNum, unitVoltageNum }, error: null };
  }, [busVoltage, unitVoltage]);

  const actualVoltage = result ? result.count * result.unitVoltageNum : 0;
  const isExact = result ? actualVoltage === result.busVoltageNum : false;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Inputs</h2>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Target DC Bus Voltage (V)</label>
          <input type="number" style={inputStyle} value={busVoltage} onChange={(e) => setBusVoltage(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Per-Battery Voltage (V)</label>
          <select style={inputStyle} value={unitVoltage} onChange={(e) => setUnitVoltage(e.target.value)}>
            {UNIT_VOLTAGE_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}V
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Result</h2>

        {error ? (
          <div
            style={{
              color: "#B91C1C",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              padding: "0.9rem 1rem",
              fontSize: "0.92rem",
            }}
          >
            {error}
          </div>
        ) : (
          <>
            <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "0.25rem" }}>Batteries per string</p>
            <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "#2563EB", lineHeight: 1.1, marginBottom: "0.4rem" }}>
              {result!.count} <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>batteries</span>
            </p>
            <p style={{ fontSize: "0.95rem", color: "#374151", marginBottom: "1.1rem" }}>
              {result!.count} × {result!.unitVoltageNum}V = {actualVoltage}V actual string voltage
            </p>
            {!isExact && (
              <div
                style={{
                  color: "#92400E",
                  background: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  borderRadius: "8px",
                  padding: "0.7rem 0.9rem",
                  fontSize: "0.85rem",
                  marginBottom: "1.1rem",
                }}
              >
                {result!.busVoltageNum}V ÷ {result!.unitVoltageNum}V doesn&apos;t divide evenly, so the count is rounded up.
                Actual string voltage ({actualVoltage}V) is slightly higher than your target ({result!.busVoltageNum}V).
              </div>
            )}
            <div style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.9 }}>
              <div>Target DC Bus Voltage: {result!.busVoltageNum} V</div>
              <div>Per-Battery Voltage: {result!.unitVoltageNum} V</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
