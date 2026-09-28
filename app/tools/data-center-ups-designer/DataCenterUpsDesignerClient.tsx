"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  kwToKva,
  calculateRedundancy,
  calculateBatteriesPerString,
  calculateBatteryAh,
  calculateHeatDissipation,
  type RedundancyArchitectureKey,
} from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// Data Center UPS Designer (client)
// First-pass combined sizing tool. Computation chain, each step feeding the
// next, all via real functions from lib/engineering/electrical/formulas.ts:
//   1. kwToKva               → IT load in kVA
//   2. calculateRedundancy   → UPS module count / capacity
//   3. calculateBatteriesPerString → batteries per string
//   4. calculateBatteryAh    → required Ah per string
//   5. calculateHeatDissipation → UPS heat load added to cooling
// No math is reimplemented here.
// ═══════════════════════════════════════════════════════════════════════════

const ARCHITECTURE_EXPLANATIONS: Record<RedundancyArchitectureKey, string> = {
  N: "Bare minimum modules to carry the load — no spare capacity.",
  "N+1": "One extra module beyond the minimum — can lose any single module with zero load impact.",
  "N+2": "Two extra modules beyond the minimum — can lose any two modules with zero load impact.",
  "2N": "A fully mirrored, independent second system — concurrently maintainable and fault tolerant on both paths.",
};

const cardStyle: CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(15,23,42,.06)",
  background: "#ffffff",
  padding: "1.5rem",
};

const inputStyle: CSSProperties = {
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  padding: "0.6rem 0.8rem",
  width: "100%",
  fontSize: "0.95rem",
  color: "#111827",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "0.35rem",
};

const helperStyle: CSSProperties = {
  fontSize: "0.78rem",
  color: "#6B7280",
  marginTop: "0.3rem",
  marginBottom: "1.1rem",
};

const fieldWrap: CSSProperties = { marginBottom: "0.25rem" };

const rowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "0.75rem 0",
  borderBottom: "1px solid #F3F4F6",
};

function round(n: number, decimals = 1): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

export default function DataCenterUpsDesignerClient() {
  const [itLoadKw, setItLoadKw] = useState("400");
  const [powerFactor, setPowerFactor] = useState("0.9");
  const [moduleSizeKva, setModuleSizeKva] = useState("250");
  const [architecture, setArchitecture] = useState<RedundancyArchitectureKey>("N+1");
  const [runtimeMinutes, setRuntimeMinutes] = useState("15");
  const [busVoltage, setBusVoltage] = useState("480");
  const [batteryVoltage, setBatteryVoltage] = useState("12");
  const [depthOfDischarge, setDepthOfDischarge] = useState("0.8");
  const [efficiency, setEfficiency] = useState("0.92");
  const [upsModuleEfficiency, setUpsModuleEfficiency] = useState("96");

  const { result, error } = useMemo(() => {
    const itLoadKwNum = parseFloat(itLoadKw);
    const powerFactorNum = parseFloat(powerFactor);
    const moduleSizeKvaNum = parseFloat(moduleSizeKva);
    const runtimeMinutesNum = parseFloat(runtimeMinutes);
    const busVoltageNum = parseFloat(busVoltage);
    const batteryVoltageNum = parseFloat(batteryVoltage);
    const depthOfDischargeNum = parseFloat(depthOfDischarge);
    const efficiencyNum = parseFloat(efficiency);
    const upsModuleEfficiencyNum = parseFloat(upsModuleEfficiency);

    if (
      [
        itLoadKwNum,
        powerFactorNum,
        moduleSizeKvaNum,
        runtimeMinutesNum,
        busVoltageNum,
        batteryVoltageNum,
        depthOfDischargeNum,
        efficiencyNum,
        upsModuleEfficiencyNum,
      ].some((v) => Number.isNaN(v))
    ) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    // Step (a): IT load kW → kVA
    const itLoadKva = kwToKva(itLoadKwNum, powerFactorNum);
    if (itLoadKva === null) {
      return {
        result: null,
        error: "IT Load / Power Factor invalid: IT Load must be 0 or more and Power Factor must be between 0 (exclusive) and 1.",
      };
    }

    // Step (b): redundancy / module sizing
    const redundancy = calculateRedundancy(itLoadKva, moduleSizeKvaNum, architecture);
    if (redundancy === null) {
      return {
        result: null,
        error: "UPS Module Size invalid: it must be greater than 0 (and IT Load kVA must be greater than 0).",
      };
    }

    // Step (c): batteries per string
    const batteriesPerString = calculateBatteriesPerString(busVoltageNum, batteryVoltageNum);
    if (batteriesPerString === null) {
      return {
        result: null,
        error: "DC Bus Voltage / Per-Battery Voltage invalid: both must be greater than 0.",
      };
    }

    // Step (d): required Ah per string
    const requiredAh = calculateBatteryAh({
      loadWatts: itLoadKwNum * 1000,
      runtimeMinutes: runtimeMinutesNum,
      busVoltage: busVoltageNum,
      depthOfDischarge: depthOfDischargeNum,
      efficiency: efficiencyNum,
    });
    if (requiredAh === null) {
      return {
        result: null,
        error:
          "Battery sizing invalid: Required Backup Runtime must be greater than 0, Depth of Discharge and Battery Efficiency must be between 0 (exclusive) and 1.",
      };
    }

    // Step (e): heat dissipation / added cooling load
    const heatDissipation = calculateHeatDissipation({
      ratingKva: redundancy.totalCapacityKva,
      efficiencyPercent: upsModuleEfficiencyNum,
    });
    if (heatDissipation === null) {
      return {
        result: null,
        error: "UPS Module Efficiency invalid: it must be greater than 0 and no more than 100.",
      };
    }

    return {
      result: { itLoadKva, redundancy, batteriesPerString, requiredAh, heatDissipation },
      error: null,
    };
  }, [
    itLoadKw,
    powerFactor,
    moduleSizeKva,
    architecture,
    runtimeMinutes,
    busVoltage,
    batteryVoltage,
    depthOfDischarge,
    efficiency,
    upsModuleEfficiency,
  ]);

  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.4rem" }}>
        <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
          Tools
        </Link>{" "}
        / Data Center UPS Designer
      </p>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "#111827",
          marginBottom: "0.6rem",
          letterSpacing: "-0.01em",
        }}
      >
        Data Center UPS Designer
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem", maxWidth: "700px" }}>
        First-pass combined UPS design: module sizing, redundancy, battery string sizing, and
        heat load added to cooling — chained from your IT load.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Inputs card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
            Design Inputs
          </h2>

          <div style={fieldWrap}>
            <label style={labelStyle}>IT Load (kW)</label>
            <input type="number" style={inputStyle} value={itLoadKw} onChange={(e) => setItLoadKw(e.target.value)} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Power Factor (0–1)</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>UPS Module Size (kVA)</label>
            <input
              type="number"
              style={inputStyle}
              value={moduleSizeKva}
              onChange={(e) => setModuleSizeKva(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Redundancy Architecture</label>
            <select
              style={inputStyle}
              value={architecture}
              onChange={(e) => setArchitecture(e.target.value as RedundancyArchitectureKey)}
            >
              <option value="N">N</option>
              <option value="N+1">N+1</option>
              <option value="N+2">N+2</option>
              <option value="2N">2N</option>
            </select>
            <p style={helperStyle}>{ARCHITECTURE_EXPLANATIONS[architecture]}</p>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Required Backup Runtime (minutes)</label>
            <input
              type="number"
              style={inputStyle}
              value={runtimeMinutes}
              onChange={(e) => setRuntimeMinutes(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>DC Bus Voltage (V)</label>
            <input
              type="number"
              style={inputStyle}
              value={busVoltage}
              onChange={(e) => setBusVoltage(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Per-Battery Voltage (V)</label>
            <input
              type="number"
              style={inputStyle}
              value={batteryVoltage}
              onChange={(e) => setBatteryVoltage(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Depth of Discharge (0–1)</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={depthOfDischarge}
              onChange={(e) => setDepthOfDischarge(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Battery / UPS Efficiency (0–1)</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>UPS Module Efficiency (%)</label>
            <input
              type="number"
              style={inputStyle}
              value={upsModuleEfficiency}
              onChange={(e) => setUpsModuleEfficiency(e.target.value)}
            />
          </div>
        </div>

        {/* Results card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
            Design Summary
          </h2>

          {error && (
            <div
              style={{
                color: "#B91C1C",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {result && (
            <>
              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>IT Load</span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {round(result.itLoadKva)} kVA
                </strong>
              </div>

              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>
                  UPS Modules Needed ({architecture})
                </span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {result.redundancy.totalModules}
                </strong>
              </div>

              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>Total UPS Capacity</span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {round(result.redundancy.totalCapacityKva)} kVA
                </strong>
              </div>

              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>Capacity Utilization</span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {round(result.redundancy.capacityUtilizationPercent)}%
                </strong>
              </div>

              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>Batteries per String</span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {result.batteriesPerString}
                </strong>
              </div>

              <div style={rowStyle}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>Required Ah per String</span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {round(result.requiredAh)} Ah
                </strong>
              </div>

              <div style={{ ...rowStyle, borderBottom: "none" }}>
                <span style={{ fontSize: "0.9rem", color: "#374151" }}>
                  UPS Heat Load Added to Cooling
                </span>
                <strong style={{ fontSize: "1.05rem", color: "#111827" }}>
                  {round(result.heatDissipation.lossesKw)} kW /{" "}
                  {round(result.heatDissipation.btuPerHour, 0)} BTU/hr
                </strong>
              </div>

              <p style={{ fontSize: "0.85rem", color: "#374151", marginTop: "1.25rem", lineHeight: 1.6 }}>
                <strong>{architecture}:</strong> {ARCHITECTURE_EXPLANATIONS[architecture]}
              </p>

              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#6B7280",
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                This is a first-pass sizing estimate only — final design must be verified by a
                licensed electrical engineer per project-specific requirements and applicable
                codes.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
