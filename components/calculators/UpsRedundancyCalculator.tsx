"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import { calculateRedundancy, type RedundancyArchitectureKey } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";

const ARCH_LABELS: Record<RedundancyArchitectureKey, { label: string; faultTolerance: string }> = {
  N: { label: "N (No redundancy)", faultTolerance: "None — any module failure causes outage" },
  "N+1": { label: "N+1 (Single redundancy)", faultTolerance: "Survives 1 module failure" },
  "N+2": { label: "N+2 (Double redundancy)", faultTolerance: "Survives 2 simultaneous module failures" },
  "2N": { label: "2N (Fully redundant, dual path)", faultTolerance: "Survives complete loss of one entire path" },
};

export default function UpsRedundancyCalculator() {
  const [itLoadKva, setItLoadKva] = useState<number>(400);
  const [moduleSizeKva, setModuleSizeKva] = useState<number>(100);
  const [architecture, setArchitecture] = useState<RedundancyArchitectureKey>("N+1");

  const result = useMemo(
    () => calculateRedundancy(itLoadKva, moduleSizeKva, architecture),
    [itLoadKva, moduleSizeKva, architecture]
  );

  const archInfo = ARCH_LABELS[architecture];

  return (
    <CalculatorCard
      title="UPS Redundancy Calculator"
      errorMessage={result === null ? "Please enter valid positive values for IT Load and Module Size." : null}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <CalculatorField label="IT Load" unit="kVA" min={0} value={itLoadKva} onChange={setItLoadKva} />
        <CalculatorField label="UPS Module Size" unit="kVA" min={1} value={moduleSizeKva} onChange={setModuleSizeKva} />
        <div>
          <label style={{ fontSize: "0.85rem", color: "#475569", display: "block", marginBottom: "0.3rem" }}>
            Architecture
          </label>
          <select
            value={architecture}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setArchitecture(e.target.value as RedundancyArchitectureKey)}
            style={{ width: "100%", padding: "0.45rem 0.6rem", borderRadius: "6px", border: "1.5px solid #cbd5e1" }}
          >
            <option value="N">N</option>
            <option value="N+1">N+1</option>
            <option value="N+2">N+2</option>
            <option value="2N">2N</option>
          </select>
        </div>
      </div>

      {result && (
        <div style={{ marginTop: "1.2rem", padding: "1rem", background: "#ffffff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.6rem" }}>{archInfo.label}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.6rem" }}>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Required Modules</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0066CC" }}>{result.baseModules}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Spare Modules</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0066CC" }}>{result.spareModules}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Total Modules</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0066CC" }}>{result.totalModules}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#64748b" }}>Capacity Utilization</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: result.capacityUtilizationPercent > 80 ? "#dc2626" : "#16a34a" }}>
                {result.capacityUtilizationPercent.toFixed(1)}%
              </p>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#475569", marginTop: "0.7rem" }}>
            <strong>Fault Tolerance:</strong> {archInfo.faultTolerance}
          </p>
        </div>
      )}
    </CalculatorCard>
  );
}
