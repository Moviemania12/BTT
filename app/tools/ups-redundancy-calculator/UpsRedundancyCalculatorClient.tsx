"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  calculateRedundancy,
  type RedundancyArchitectureKey,
} from "@/lib/engineering/electrical/formulas";

// ═══════════════════════════════════════════════════════════════════════════
// UPS Redundancy Calculator (client)
// Uses calculateRedundancy() from lib/engineering/electrical/formulas.ts
// — no math is reimplemented here. ARCHITECTURE_EXPLANATIONS below is plain
// industry-standard definition text, not a formula.
// ═══════════════════════════════════════════════════════════════════════════

const ARCHITECTURE_EXPLANATIONS: Record<RedundancyArchitectureKey, string> = {
  N: "Bare minimum modules to carry the load — no spare capacity. Any single module failure or maintenance event causes a load impact.",
  "N+1": "One extra module beyond the minimum — the system can lose any single module with zero impact on the load.",
  "N+2": "Two extra modules beyond the minimum — the system can lose any two modules (e.g. one down for maintenance, one fails) with zero impact on the load.",
  "2N": "A fully mirrored, independent second system — every module is duplicated end-to-end, giving concurrent maintainability and fault tolerance on both paths.",
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

function round(n: number, decimals = 1): number {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

export default function UpsRedundancyCalculatorClient() {
  const [itLoadKva, setItLoadKva] = useState("500");
  const [moduleSizeKva, setModuleSizeKva] = useState("250");
  const [architecture, setArchitecture] = useState<RedundancyArchitectureKey>("N+1");

  const { result, error } = useMemo(() => {
    const itLoadKvaNum = parseFloat(itLoadKva);
    const moduleSizeKvaNum = parseFloat(moduleSizeKva);

    if ([itLoadKvaNum, moduleSizeKvaNum].some((v) => Number.isNaN(v))) {
      return { result: null, error: "Please fill in all fields with valid numbers." };
    }

    const r = calculateRedundancy(itLoadKvaNum, moduleSizeKvaNum, architecture);

    if (!r) {
      return {
        result: null,
        error: "Check your inputs: Critical IT Load and UPS Module Size must both be greater than 0.",
      };
    }

    return { result: r, error: null };
  }, [itLoadKva, moduleSizeKva, architecture]);

  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.4rem" }}>
        <Link href="/tools" style={{ color: "#2563EB", textDecoration: "none" }}>
          Tools
        </Link>{" "}
        / UPS Redundancy Calculator
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
        UPS Redundancy Calculator
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2.5rem", maxWidth: "640px" }}>
        Calculate required UPS modules, spares, and capacity utilization for N, N+1, N+2, and 2N
        redundancy architectures.
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
            System Inputs
          </h2>

          <div style={fieldWrap}>
            <label style={labelStyle}>Critical IT Load (kVA)</label>
            <input
              type="number"
              style={inputStyle}
              value={itLoadKva}
              onChange={(e) => setItLoadKva(e.target.value)}
            />
            <p style={helperStyle}>Total critical IT load the UPS system must support.</p>
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>UPS Module Size (kVA)</label>
            <input
              type="number"
              style={inputStyle}
              value={moduleSizeKva}
              onChange={(e) => setModuleSizeKva(e.target.value)}
            />
            <p style={helperStyle}>Rated capacity of a single UPS module.</p>
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
        </div>

        {/* Results card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>
            Module Requirement
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
                  Base Modules Required
                </p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {result.baseModules}
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>Spare Modules</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {result.spareModules}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid #E5E7EB",
                  paddingTop: "1.25rem",
                  marginTop: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>Total Modules</p>
                <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#2563EB", margin: 0 }}>
                  {result.totalModules}
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>
                  Total Installed Capacity
                </p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {round(result.totalCapacityKva)} kVA
                </p>
              </div>

              <div>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "0.2rem" }}>
                  Capacity Utilization
                </p>
                <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {round(result.capacityUtilizationPercent)}%
                </p>
              </div>

              <p style={{ fontSize: "0.85rem", color: "#374151", marginTop: "1.25rem", lineHeight: 1.6 }}>
                <strong>{architecture}:</strong> {ARCHITECTURE_EXPLANATIONS[architecture]}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
