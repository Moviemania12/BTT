"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  calculateBatteriesPerString,
  calculateParallelStrings,
} from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/battery-quantity-calculator/BatteryQuantityCalculatorClient.tsx
//
// Client-side interactive calculator. Uses the real, validated
// calculateBatteriesPerString() and calculateParallelStrings() pure
// functions from lib/engineering/electrical/formulas.ts — no math is
// reimplemented here.
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

export default function BatteryQuantityCalculatorClient() {
  const [busVoltage, setBusVoltage] = useState("192");
  const [unitVoltage, setUnitVoltage] = useState("12");
  const [requiredAh, setRequiredAh] = useState("300");
  const [unitAh, setUnitAh] = useState("100");

  const { result, error } = useMemo(() => {
    const busVoltageNum = parseFloat(busVoltage);
    const unitVoltageNum = parseFloat(unitVoltage);
    const requiredAhNum = parseFloat(requiredAh);
    const unitAhNum = parseFloat(unitAh);

    if (![busVoltageNum, unitVoltageNum, requiredAhNum, unitAhNum].every(isFinite)) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    const seriesCount = calculateBatteriesPerString(busVoltageNum, unitVoltageNum);
    const parallelStrings = calculateParallelStrings(requiredAhNum, unitAhNum);

    if (seriesCount === null || parallelStrings === null) {
      if (busVoltageNum <= 0) {
        return { result: null, error: "Target DC Bus Voltage must be greater than 0." };
      }
      if (unitVoltageNum <= 0) {
        return { result: null, error: "Per-Battery Voltage must be greater than 0." };
      }
      if (requiredAhNum <= 0) {
        return { result: null, error: "Required Bank Capacity must be greater than 0." };
      }
      if (unitAhNum <= 0) {
        return { result: null, error: "Per-Battery Rated Capacity must be greater than 0." };
      }
      return { result: null, error: "Please check your inputs — one or more values are invalid." };
    }

    return {
      result: { seriesCount, parallelStrings, busVoltageNum, unitVoltageNum, requiredAhNum, unitAhNum },
      error: null,
    };
  }, [busVoltage, unitVoltage, requiredAh, unitAh]);

  const totalBatteries = result ? result.seriesCount * result.parallelStrings : 0;
  const actualVoltage = result ? result.seriesCount * result.unitVoltageNum : 0;
  const totalCapacity = result ? result.parallelStrings * result.unitAhNum : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Inputs</h2>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Target DC Bus Voltage (V)</label>
          <input type="number" style={inputStyle} value={busVoltage} onChange={(e) => setBusVoltage(e.target.value)} />
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Per-Battery Voltage (V)</label>
          <input type="number" style={inputStyle} value={unitVoltage} onChange={(e) => setUnitVoltage(e.target.value)} />
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Required Bank Capacity (Ah)</label>
          <input type="number" style={inputStyle} value={requiredAh} onChange={(e) => setRequiredAh(e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Per-Battery Rated Capacity (Ah)</label>
          <input type="number" style={inputStyle} value={unitAh} onChange={(e) => setUnitAh(e.target.value)} />
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
            <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "0.25rem" }}>Total batteries required</p>
            <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "#2563EB", lineHeight: 1.1, marginBottom: "1.1rem" }}>
              {totalBatteries} <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>batteries</span>
            </p>
            <div style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.9 }}>
              <div>Batteries per string (series): {result!.seriesCount}</div>
              <div>Parallel strings: {result!.parallelStrings}</div>
              <div>Actual string voltage: {actualVoltage} V</div>
              <div>Total bank capacity: {totalCapacity} Ah</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
