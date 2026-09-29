"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// PUE Calculator — client component
//
// Formula (Uptime Institute standard):
//   PUE  = Total Facility Power (kW) / IT Equipment Power (kW)
//   DCiE = (1 / PUE) × 100%
// ═══════════════════════════════════════════════════════════════════════════

type PueResult = {
  pue: number;
  dcie: number;
  overheadKw: number;
  overheadPct: number;
  rating: { label: string; color: string; bg: string; border: string };
};

function ratingForPue(pue: number) {
  if (pue <= 1.2) {
    return { label: "Excellent (Hyperscale-tier)", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" };
  }
  if (pue <= 1.5) {
    return { label: "Good", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" };
  }
  if (pue <= 1.8) {
    return { label: "Average", color: "#92400E", bg: "#FFFBEB", border: "#FDE68A" };
  }
  return { label: "Needs Improvement", color: "#B91C1C", bg: "#FEF2F2", border: "#FECACA" };
}

/**
 * Pure PUE/DCiE calculation function.
 * Throws a descriptive error string for invalid inputs — caller renders it.
 */
function calculatePue(totalFacilityKw: number, itEquipmentKw: number): PueResult {
  if (!Number.isFinite(totalFacilityKw) || !Number.isFinite(itEquipmentKw)) {
    throw new Error("Please enter valid numbers for both fields.");
  }
  if (totalFacilityKw <= 0) {
    throw new Error("Total Facility Power must be a positive number.");
  }
  if (itEquipmentKw <= 0) {
    throw new Error("IT Equipment Power must be greater than 0 (PUE is undefined when IT power is 0).");
  }
  if (itEquipmentKw > totalFacilityKw) {
    throw new Error(
      "IT Equipment Power can't be greater than Total Facility Power — IT load is a subset of total facility power."
    );
  }

  const pue = totalFacilityKw / itEquipmentKw;
  const dcie = (1 / pue) * 100;
  const overheadKw = totalFacilityKw - itEquipmentKw;
  const overheadPct = (overheadKw / totalFacilityKw) * 100;

  return { pue, dcie, overheadKw, overheadPct, rating: ratingForPue(pue) };
}

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
  fontSize: "1rem",
  width: "100%",
  boxSizing: "border-box",
  color: "#111827",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "0.4rem",
};

export default function PueCalculatorClient() {
  const [totalFacility, setTotalFacility] = useState("1600");
  const [itEquipment, setItEquipment] = useState("1000");

  const { result, error } = useMemo(() => {
    const totalKw = parseFloat(totalFacility);
    const itKw = parseFloat(itEquipment);
    try {
      return { result: calculatePue(totalKw, itKw), error: null as string | null };
    } catch (e) {
      return { result: null as PueResult | null, error: (e as Error).message };
    }
  }, [totalFacility, itEquipment]);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        {/* Breadcrumb */}
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.75rem" }}>
          <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
            Tools
          </Link>{" "}
          / PUE Calculator
        </p>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
          PUE Calculator
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "680px" }}>
          Power Usage Effectiveness (PUE) shows how efficiently a data center uses power — how much
          of the total facility power actually reaches the IT equipment. Based on the Uptime
          Institute standard formula.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Inputs */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
              Inputs
            </h2>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle} htmlFor="totalFacility">
                Total Facility Power (kW)
              </label>
              <input
                id="totalFacility"
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={totalFacility}
                onChange={(e) => setTotalFacility(e.target.value)}
                min={0}
                step="any"
              />
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <label style={labelStyle} htmlFor="itEquipment">
                IT Equipment Power (kW)
              </label>
              <input
                id="itEquipment"
                type="number"
                inputMode="decimal"
                style={inputStyle}
                value={itEquipment}
                onChange={(e) => setItEquipment(e.target.value)}
                min={0}
                step="any"
              />
            </div>

            {error && (
              <div
                style={{
                  marginTop: "1rem",
                  color: "#B91C1C",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {error}
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
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.25rem" }}>PUE</p>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
                    {result.pue.toFixed(2)}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "0.5rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: result.rating.color,
                      background: result.rating.bg,
                      border: `1px solid ${result.rating.border}`,
                      borderRadius: "999px",
                      padding: "0.25rem 0.75rem",
                    }}
                  >
                    {result.rating.label}
                  </span>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.25rem" }}>
                    DCiE (Data Center Infrastructure Efficiency)
                  </p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563EB" }}>
                    {result.dcie.toFixed(1)}%
                  </p>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #E5E7EB",
                    paddingTop: "1rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.25rem" }}>
                      Overhead Power
                    </p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>
                      {result.overheadKw.toFixed(1)} kW
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.25rem" }}>
                      Overhead %
                    </p>
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>
                      {result.overheadPct.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", marginTop: "1.25rem", lineHeight: 1.5 }}>
                  Rating bands are a general industry guideline, not a universal standard — actual
                  targets depend on climate, tier level and design.
                </p>
              </>
            ) : (
              <p style={{ color: "#6B7280", fontSize: "0.95rem" }}>
                Enter valid values on the left to see results.
              </p>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
            Formula
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
            PUE = Total Facility Power ÷ IT Equipment Power (Uptime Institute standard). DCiE = (1 /
            PUE) × 100%.
          </p>
        </div>
      </div>
    </main>
  );
}
