"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// RCI Calculator — client component
//
// ASHRAE Rack Cooling Index (RCI):
//   RCI_HI = [1 − (Σ max(0, T_i − T_max-rec)) / ((T_max-allow − T_max-rec) × n)] × 100
//   RCI_LO = [1 − (Σ max(0, T_min-rec − T_i)) / ((T_min-rec − T_min-allow) × n)] × 100
// ═══════════════════════════════════════════════════════════════════════════

type RciResult = {
  rciHi: number;
  rciLo: number;
  readings: number[];
  n: number;
};

function ratingForRci(value: number) {
  if (value >= 100) return { label: "Ideal", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" };
  if (value >= 96) return { label: "Good", color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" };
  if (value >= 91) return { label: "Acceptable", color: "#92400E", bg: "#FFFBEB", border: "#FDE68A" };
  return { label: "Poor — hot/cold spots likely", color: "#B91C1C", bg: "#FEF2F2", border: "#FECACA" };
}

/** Parse a comma-separated temperature string into valid finite numbers. */
function parseReadings(raw: string): number[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => parseFloat(s))
    .filter((n) => Number.isFinite(n));
}

/**
 * Pure RCI_HI / RCI_LO calculation function per ASHRAE TC9.9.
 * Throws a descriptive error string for invalid inputs — caller renders it.
 */
function calculateRci(
  readings: number[],
  minRec: number,
  maxRec: number,
  minAllow: number,
  maxAllow: number
): RciResult {
  if (
    !Number.isFinite(minRec) ||
    !Number.isFinite(maxRec) ||
    !Number.isFinite(minAllow) ||
    !Number.isFinite(maxAllow)
  ) {
    throw new Error("Please enter valid numbers for all envelope bounds.");
  }
  if (readings.length === 0) {
    throw new Error("Enter at least one valid rack inlet temperature reading (comma-separated).");
  }
  if (maxAllow <= maxRec) {
    throw new Error("Max Allowable must be greater than Max Recommended.");
  }
  if (minRec <= minAllow) {
    throw new Error("Min Recommended must be greater than Min Allowable.");
  }

  const n = readings.length;

  const overSum = readings.reduce((sum, t) => sum + Math.max(0, t - maxRec), 0);
  const rciHi = (1 - overSum / ((maxAllow - maxRec) * n)) * 100;

  const underSum = readings.reduce((sum, t) => sum + Math.max(0, minRec - t), 0);
  const rciLo = (1 - underSum / ((minRec - minAllow) * n)) * 100;

  return { rciHi, rciLo, readings, n };
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

function RciBlock({ label, value }: { label: string; value: number }) {
  const rating = ratingForRci(value);
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.25rem" }}>{label}</p>
      <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
        {value.toFixed(1)}%
      </p>
      <span
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: rating.color,
          background: rating.bg,
          border: `1px solid ${rating.border}`,
          borderRadius: "999px",
          padding: "0.25rem 0.75rem",
        }}
      >
        {rating.label}
      </span>
    </div>
  );
}

export default function RciCalculatorClient() {
  const [tempsRaw, setTempsRaw] = useState("22, 23, 24, 21, 26, 25, 23, 22");
  const [minRec, setMinRec] = useState("18");
  const [maxRec, setMaxRec] = useState("27");
  const [minAllow, setMinAllow] = useState("15");
  const [maxAllow, setMaxAllow] = useState("32");

  const { result, error } = useMemo(() => {
    const readings = parseReadings(tempsRaw);
    const minRecN = parseFloat(minRec);
    const maxRecN = parseFloat(maxRec);
    const minAllowN = parseFloat(minAllow);
    const maxAllowN = parseFloat(maxAllow);
    try {
      return {
        result: calculateRci(readings, minRecN, maxRecN, minAllowN, maxAllowN),
        error: null as string | null,
      };
    } catch (e) {
      return { result: null as RciResult | null, error: (e as Error).message };
    }
  }, [tempsRaw, minRec, maxRec, minAllow, maxAllow]);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        {/* Breadcrumb */}
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.75rem" }}>
          <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
            Tools
          </Link>{" "}
          / RCI Calculator
        </p>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>
          RCI Calculator
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "680px" }}>
          Rack Cooling Index (RCI) is an ASHRAE-based metric that shows how well rack inlet
          temperatures stay within the recommended and allowable envelope — it tracks both hot
          spots and over-cooling.
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
              <label style={labelStyle} htmlFor="temps">
                Rack Inlet Temperatures (°C, comma-separated)
              </label>
              <textarea
                id="temps"
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
                value={tempsRaw}
                onChange={(e) => setTempsRaw(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="minRec">
                  Min Recommended (°C)
                </label>
                <input
                  id="minRec"
                  type="number"
                  inputMode="decimal"
                  style={inputStyle}
                  value={minRec}
                  onChange={(e) => setMinRec(e.target.value)}
                  step="any"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="maxRec">
                  Max Recommended (°C)
                </label>
                <input
                  id="maxRec"
                  type="number"
                  inputMode="decimal"
                  style={inputStyle}
                  value={maxRec}
                  onChange={(e) => setMaxRec(e.target.value)}
                  step="any"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="minAllow">
                  Min Allowable (°C)
                </label>
                <input
                  id="minAllow"
                  type="number"
                  inputMode="decimal"
                  style={inputStyle}
                  value={minAllow}
                  onChange={(e) => setMinAllow(e.target.value)}
                  step="any"
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="maxAllow">
                  Max Allowable (°C)
                </label>
                <input
                  id="maxAllow"
                  type="number"
                  inputMode="decimal"
                  style={inputStyle}
                  value={maxAllow}
                  onChange={(e) => setMaxAllow(e.target.value)}
                  step="any"
                />
              </div>
            </div>

            <p style={{ fontSize: "0.78rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
              Defaults shown are ASHRAE Class A1 recommended (18–27°C) and allowable (15–32°C)
              envelopes — editable for your class.
            </p>

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
                <RciBlock label="RCI_HI (over-temperature risk)" value={result.rciHi} />
                <RciBlock label="RCI_LO (under-temperature / over-cooling)" value={result.rciLo} />

                <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "1rem" }}>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.4rem" }}>
                    Readings used ({result.n}):
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.6, wordBreak: "break-word" }}>
                    {result.readings.map((t) => `${t}°C`).join(", ")}
                  </p>
                </div>
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
            Formula (ASHRAE)
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
            RCI_HI = [1 − (Σ max(0, T_i − T_max-rec)) / ((T_max-allow − T_max-rec) × n)] × 100.
            <br />
            RCI_LO = [1 − (Σ max(0, T_min-rec − T_i)) / ((T_min-rec − T_min-allow) × n)] × 100.
          </p>
        </div>
      </div>
    </main>
  );
}
