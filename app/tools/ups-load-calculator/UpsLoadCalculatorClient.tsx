"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { calculateLoadAggregation } from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// UPS Load Calculator (client)
// Uses calculateLoadAggregation() from lib/engineering/electrical/formulas.ts
// — no math is reimplemented here.
// ═══════════════════════════════════════════════════════════════════════════

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

function round(n: number, decimals = 1): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

export default function UpsLoadCalculatorClient() {
  const [totalConnectedKw, setTotalConnectedKw] = useState("100");
  const [demandFactor, setDemandFactor] = useState("0.7");
  const [powerFactor, setPowerFactor] = useState("0.9");
  const [futureGrowthPercent, setFutureGrowthPercent] = useState("20");

  const { result, error } = useMemo(() => {
    const totalConnectedKwNum = parseFloat(totalConnectedKw);
    const demandFactorNum = parseFloat(demandFactor);
    const powerFactorNum = parseFloat(powerFactor);
    const futureGrowthPercentNum = parseFloat(futureGrowthPercent);

    if (
      [totalConnectedKwNum, demandFactorNum, powerFactorNum, futureGrowthPercentNum].some(
        (v) => Number.isNaN(v)
      )
    ) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    const r = calculateLoadAggregation({
      totalConnectedKw: totalConnectedKwNum,
      demandFactor: demandFactorNum,
      powerFactor: powerFactorNum,
      futureGrowthPercent: futureGrowthPercentNum,
    });

    if (!r) {
      return {
        result: null,
        error:
          "Check your inputs: Total Connected Load must be 0 or more, Demand Factor and Power Factor must be between 0 (exclusive) and 1, and Future Growth cannot be negative.",
      };
    }

    return { result: r, error: null };
  }, [totalConnectedKw, demandFactor, powerFactor, futureGrowthPercent]);

  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.4rem" }}>
        <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
          Tools
        </Link>{" "}
        / UPS Load Calculator
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
        UPS Load Calculator
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem", maxWidth: "640px" }}>
        Aggregate your Data Center's connected load into a recommended UPS sizing in kVA — demand
        factor, power factor, aur future growth headroom ke saath.
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
            Load Inputs
          </h2>

          <div style={fieldWrap}>
            <label style={labelStyle}>Total Connected Load (kW)</label>
            <input
              type="number"
              style={inputStyle}
              value={totalConnectedKw}
              onChange={(e) => setTotalConnectedKw(e.target.value)}
            />
            <p style={helperStyle}>Sum of nameplate loads across servers, storage, network, and lighting.</p>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Demand Factor (0–1)</label>
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={demandFactor}
              onChange={(e) => setDemandFactor(e.target.value)}
            />
            <p style={helperStyle}>Expected simultaneous usage — typically 0.6–0.8 for IT load.</p>
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
            <p style={helperStyle}>Typically 0.9 for modern IT load equipment.</p>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Future Growth Headroom (%)</label>
            <input
              type="number"
              style={inputStyle}
              value={futureGrowthPercent}
              onChange={(e) => setFutureGrowthPercent(e.target.value)}
            />
            <p style={helperStyle}>Spare capacity for future racks/expansion.</p>
          </div>
        </div>

        {/* Results card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
            Recommended UPS Sizing
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
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>
                  Applied Load (after demand factor)
                </p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {round(result.appliedKw)} kW
                </p>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>Base kVA</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {round(result.baseKva)} kVA
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid #E5E7EB",
                  paddingTop: "1.25rem",
                  marginTop: "1.25rem",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>
                  Recommended UPS Size (with growth headroom)
                </p>
                <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#2563EB", margin: 0 }}>
                  {round(result.finalKva)} kVA
                </p>
              </div>

              <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "1.25rem" }}>
                Round up to the nearest standard UPS module size available from your vendor.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
