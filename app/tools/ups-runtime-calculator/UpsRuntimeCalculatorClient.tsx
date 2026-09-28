"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { calculateRuntimeHours } from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// app/tools/ups-runtime-calculator/UpsRuntimeCalculatorClient.tsx
//
// Client-side interactive calculator. Uses the real, validated
// calculateRuntimeHours() pure function from
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

export default function UpsRuntimeCalculatorClient() {
  const [ampHours, setAmpHours] = useState("100");
  const [busVoltage, setBusVoltage] = useState("192");
  const [depthOfDischargePercent, setDepthOfDischargePercent] = useState("80");
  const [efficiencyPercent, setEfficiencyPercent] = useState("92");
  const [loadWatts, setLoadWatts] = useState("5000");

  const { result, error } = useMemo(() => {
    const ampHoursNum = parseFloat(ampHours);
    const busVoltageNum = parseFloat(busVoltage);
    const depthOfDischarge = parseFloat(depthOfDischargePercent) / 100;
    const efficiency = parseFloat(efficiencyPercent) / 100;
    const loadWattsNum = parseFloat(loadWatts);

    if ([ampHoursNum, busVoltageNum, depthOfDischarge, efficiency, loadWattsNum].some((v) => !isFinite(v))) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    const hours = calculateRuntimeHours({
      ampHours: ampHoursNum,
      busVoltage: busVoltageNum,
      depthOfDischarge,
      efficiency,
      loadWatts: loadWattsNum,
    });

    if (hours === null) {
      if (depthOfDischarge <= 0 || depthOfDischarge > 1) {
        return { result: null, error: "Depth of Discharge must be between 0% and 100%." };
      }
      if (efficiency <= 0 || efficiency > 1) {
        return { result: null, error: "Efficiency must be between 0% and 100%." };
      }
      if (ampHoursNum <= 0) {
        return { result: null, error: "Battery Capacity (Ah) must be greater than 0." };
      }
      if (loadWattsNum <= 0) {
        return { result: null, error: "Load must be greater than 0." };
      }
      if (busVoltageNum <= 0) {
        return { result: null, error: "DC Bus Voltage must be greater than 0." };
      }
      return { result: null, error: "Please check your inputs — one or more values are invalid." };
    }

    return { result: hours, error: null };
  }, [ampHours, busVoltage, depthOfDischargePercent, efficiencyPercent, loadWatts]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Inputs</h2>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Battery Capacity (Ah)</label>
          <input type="number" style={inputStyle} value={ampHours} onChange={(e) => setAmpHours(e.target.value)} />
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>DC Bus Voltage (V)</label>
          <input type="number" style={inputStyle} value={busVoltage} onChange={(e) => setBusVoltage(e.target.value)} />
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>Depth of Discharge (%)</label>
          <input
            type="number"
            style={inputStyle}
            value={depthOfDischargePercent}
            onChange={(e) => setDepthOfDischargePercent(e.target.value)}
          />
          <p style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.3rem" }}>e.g. 80 = 0.8 = 80% discharge allowed</p>
        </div>

        <div style={{ marginBottom: "1.1rem" }}>
          <label style={labelStyle}>System Efficiency (%)</label>
          <input
            type="number"
            style={inputStyle}
            value={efficiencyPercent}
            onChange={(e) => setEfficiencyPercent(e.target.value)}
          />
          <p style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.3rem" }}>e.g. 92 = 0.92 = 92% round-trip efficiency</p>
        </div>

        <div>
          <label style={labelStyle}>Load (W)</label>
          <input type="number" style={inputStyle} value={loadWatts} onChange={(e) => setLoadWatts(e.target.value)} />
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
            <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "0.25rem" }}>Expected runtime</p>
            <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "#2563EB", lineHeight: 1.1, marginBottom: "0.4rem" }}>
              {result!.toFixed(2)} <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>hr</span>
            </p>
            <p style={{ fontSize: "0.95rem", color: "#374151", marginBottom: "1.1rem" }}>
              ≈ {(result! * 60).toFixed(0)} minutes of backup runtime
            </p>
            <div style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.9 }}>
              <div>Battery Capacity: {ampHours} Ah</div>
              <div>DC Bus Voltage: {busVoltage} V</div>
              <div>Depth of Discharge: {depthOfDischargePercent}%</div>
              <div>System Efficiency: {efficiencyPercent}%</div>
              <div>Load: {loadWatts} W</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
