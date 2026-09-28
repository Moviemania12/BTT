"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

// ─── Pure calculation functions ────────────────────────────────────────────
// Standard published conversion constants:
//   1 Ton of Refrigeration = 3.517 kW = 12,000 BTU/hr
//   kW -> BTU/hr multiplier: 3412.14
//   Sensible heat formula (imperial): CFM = BTUperHr / (1.08 x deltaT_F)

const KW_PER_TON = 3.517;
const BTU_PER_KW = 3412.14;

function kwToTons(kw: number): number {
  return kw / KW_PER_TON;
}

function kwToBtuPerHr(kw: number): number {
  return kw * BTU_PER_KW;
}

function requiredCfm(btuPerHr: number, deltaTCelsius: number): number {
  const deltaTFahrenheit = deltaTCelsius * 1.8;
  return btuPerHr / (1.08 * deltaTFahrenheit);
}

interface CoolingResult {
  tons: number;
  btuPerHr: number;
  cfm: number;
}

function calculateCooling(heatLoadKw: number, deltaTCelsius: number): CoolingResult {
  const btuPerHr = kwToBtuPerHr(heatLoadKw);
  return {
    tons: kwToTons(heatLoadKw),
    btuPerHr,
    cfm: requiredCfm(btuPerHr, deltaTCelsius),
  };
}

function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

// ─── Shared style tokens (design system) ───────────────────────────────────

const cardStyle: CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(15,23,42,.06)",
  background: "#ffffff",
  padding: "1.75rem",
};

const inputStyle: CSSProperties = {
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  padding: "0.6rem 0.8rem",
  fontSize: "1rem",
  width: "100%",
  color: "#111827",
  background: "#ffffff",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "0.4rem",
};

const helperTextStyle: CSSProperties = {
  fontSize: "0.8rem",
  color: "#6B7280",
  marginTop: "0.35rem",
};

export default function CoolingCalculatorClient() {
  const [heatLoadKwInput, setHeatLoadKwInput] = useState<string>("100");
  const [deltaTInput, setDeltaTInput] = useState<string>("10");

  const heatLoadKw = parseFloat(heatLoadKwInput);
  const deltaTCelsius = parseFloat(deltaTInput);

  const errors = useMemo(() => {
    const list: string[] = [];
    if (heatLoadKwInput.trim() === "" || Number.isNaN(heatLoadKw)) {
      list.push("Enter a valid IT/heat load in kW.");
    } else if (heatLoadKw <= 0) {
      list.push("IT/heat load must be greater than 0 kW.");
    }
    if (deltaTInput.trim() === "" || Number.isNaN(deltaTCelsius)) {
      list.push("Enter a valid return-to-supply temperature differential (ΔT).");
    } else if (deltaTCelsius <= 0) {
      list.push("ΔT must be greater than 0°C — the airflow formula divides by ΔT, so zero or a negative value is not valid.");
    }
    return list;
  }, [heatLoadKw, deltaTCelsius, heatLoadKwInput, deltaTInput]);

  const result: CoolingResult | null = useMemo(() => {
    if (errors.length > 0) return null;
    return calculateCooling(heatLoadKw, deltaTCelsius);
  }, [errors, heatLoadKw, deltaTCelsius]);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.5rem" }}>
          <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
            Tools
          </Link>{" "}
          / Cooling Calculator
        </p>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Cooling Calculator
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "680px" }}>
          Size your Data Center cooling requirement from an IT/heat load — get Tons of Refrigeration,
          BTU/hr, and the required supply airflow (CFM).
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {/* Inputs */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Inputs
            </h2>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle} htmlFor="heatLoad">
                IT / Heat Load (kW)
              </label>
              <input
                id="heatLoad"
                type="number"
                value={heatLoadKwInput}
                onChange={(e) => setHeatLoadKwInput(e.target.value)}
                style={inputStyle}
                min="0"
                step="any"
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="deltaT">
                Return-to-Supply Air Temperature Differential (°C)
              </label>
              <input
                id="deltaT"
                type="number"
                value={deltaTInput}
                onChange={(e) => setDeltaTInput(e.target.value)}
                style={inputStyle}
                min="0"
                step="any"
              />
              <p style={helperTextStyle}>Typical data center ΔT is 8–12°C.</p>
            </div>

            {errors.length > 0 && (
              <div
                role="alert"
                style={{
                  marginTop: "1.25rem",
                  color: "#B91C1C",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {errors.map((err) => (
                  <div key={err}>{err}</div>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Results
            </h2>

            {result ? (
              <>
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.25rem" }}>
                    Cooling Load
                  </div>
                  <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#2563EB", lineHeight: 1.1 }}>
                    {formatNumber(result.tons)}{" "}
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>Tons of Refrigeration</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>Heat Load</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>
                      {formatNumber(result.btuPerHr, 0)} BTU/hr
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#6B7280" }}>Required Airflow</div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827" }}>
                      {formatNumber(result.cfm, 0)} CFM
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6, marginTop: "1.25rem" }}>
                  This is sensible heat load only — for actual unit selection, also account for latent
                  load, altitude derating, and manufacturer-specific unit curves.
                </p>
              </>
            ) : (
              <p style={{ fontSize: "0.95rem", color: "#6B7280" }}>
                Fix the highlighted inputs to see your cooling load results.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
