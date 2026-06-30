"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import { calculateLoadAggregation } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";

interface LoadRow {
  label: string;
  watts: number;
}

export default function UpsLoadCalculator() {
  const [rows, setRows] = useState<LoadRow[]>([
    { label: "Servers", watts: 0 },
    { label: "Storage", watts: 0 },
    { label: "Network", watts: 0 },
    { label: "Misc / Lighting", watts: 0 },
  ]);
  const [pf, setPf] = useState<number>(0.9);
  const [demandFactor, setDemandFactor] = useState<number>(0.8);
  const [futureGrowth, setFutureGrowth] = useState<number>(20);

  const totalKw = useMemo(() => rows.reduce((sum, r) => sum + (Number.isFinite(r.watts) ? r.watts : 0), 0) / 1000, [rows]);

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
      {rows.map((row, i) => (
        <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
          <label style={{ flex: 1, fontSize: "0.95rem", color: "#334155" }}>{row.label} (Watts)</label>
          <input
            type="number"
            min={0}
            value={row.watts}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateRow(i, Number(e.target.value) || 0)}
            style={{ width: "140px", padding: "0.45rem 0.6rem", borderRadius: "6px", border: "1.5px solid #cbd5e1", fontSize: "0.95rem" }}
          />
        </div>
      ))}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <CalculatorField label="Power Factor" step={0.01} min={0.1} max={1} value={pf} onChange={setPf} />
        <CalculatorField label="Demand Factor" step={0.05} min={0.1} max={1} value={demandFactor} onChange={setDemandFactor} />
        <CalculatorField label="Future Growth" unit="%" min={0} max={200} value={futureGrowth} onChange={setFutureGrowth} />
      </div>

      {aggregation && (
        <div style={{ marginTop: "1.2rem", padding: "1rem", background: "#ffffff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
          <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "0.3rem" }}>
            Total Connected Load: <strong>{totalKw.toFixed(2)} kW</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#475569", marginBottom: "0.3rem" }}>
            After Demand Factor: <strong>{aggregation.appliedKw.toFixed(2)} kW</strong>
          </p>
          <p style={{ fontSize: "1.1rem", color: "#0066CC", fontWeight: 800, marginTop: "0.5rem" }}>
            Recommended UPS Size: {aggregation.finalKva.toFixed(1)} kVA
          </p>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "0.3rem" }}>
            (Includes {futureGrowth}% headroom for future expansion)
          </p>
        </div>
      )}
    </CalculatorCard>
  );
}
