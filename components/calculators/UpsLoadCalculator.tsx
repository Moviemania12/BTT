"use client";

import { useState, useMemo } from "react";
import { calculateLoadAggregation } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";

interface LoadRow {
  label: string;
  watts: number;
}

const DEFAULT_ROWS: LoadRow[] = [
  { label: "Servers", watts: 0 },
  { label: "Storage", watts: 0 },
  { label: "Network", watts: 0 },
  { label: "Misc / Lighting", watts: 0 },
];

export default function UpsLoadCalculator() {
  const [rows, setRows] = useState<LoadRow[]>(DEFAULT_ROWS);
  const [pf, setPf] = useState<number>(0.9);
  const [demandFactor, setDemandFactor] = useState<number>(0.8);
  const [futureGrowth, setFutureGrowth] = useState<number>(20);

  const totalKw = useMemo(
    () => rows.reduce((sum, r) => sum + (Number.isFinite(r.watts) ? r.watts : 0), 0) / 1000,
    [rows]
  );

  const aggregation = useMemo(
    () =>
      calculateLoadAggregation({
        totalConnectedKw: totalKw,
        demandFactor,
        powerFactor: pf,
        futureGrowthPercent: futureGrowth,
      }),
    [totalKw, demandFactor, pf, futureGrowth]
  );

  function updateRow(index: number, watts: number) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, watts } : r)));
  }

  return (
    <CalculatorCard
      title="UPS Load Calculator"
      errorMessage={aggregation === null ? "Please check Power Factor and Demand Factor are between 0 and 1." : null}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        {rows.map((row, i) => (
          <CalculatorField
            key={row.label}
            label={row.label}
            unit="Watts"
            min={0}
            value={row.watts}
            onChange={(v) => updateRow(i, v)}
          />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        <CalculatorField label="Power Factor" step={0.01} min={0.1} max={1} value={pf} onChange={setPf} />
        <CalculatorField label="Demand Factor" step={0.05} min={0.1} max={1} value={demandFactor} onChange={setDemandFactor} />
        <CalculatorField label="Future Growth" unit="%" min={0} max={200} value={futureGrowth} onChange={setFutureGrowth} />
      </div>

      {aggregation && (
        <div style={{ marginTop: "1.2rem", padding: "1rem", background: "#ffffff", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
          <p style={{ fontSize: "0.9rem", color: "#374151", marginBottom: "0.3rem" }}>
            Total Connected Load: <strong>{totalKw.toFixed(2)} kW</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#374151", marginBottom: "0.3rem" }}>
            After Demand Factor: <strong>{aggregation.appliedKw.toFixed(2)} kW</strong>
          </p>
          <p style={{ fontSize: "1.1rem", color: "#2563EB", fontWeight: 800, marginTop: "0.5rem" }}>
            Recommended UPS Size: {aggregation.finalKva.toFixed(1)} kVA
          </p>
          <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "0.3rem" }}>
            (Includes {futureGrowth}% headroom for future expansion)
          </p>
        </div>
      )}
    </CalculatorCard>
  );
}
