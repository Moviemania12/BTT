"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/calculators/BatteryAhCalculator.tsx
//
// REFACTORED onto the shared platform framework. Visual output and
// behavior are 100% identical to the original Phase 2/3 version — only
// the implementation now calls the shared formula instead of inlining it,
// and uses CalculatorCard/CalculatorField/FormulaBox instead of repeating
// the same JSX shell.
// ═══════════════════════════════════════════════════════════════════════════

import { useCalculator } from "@/hooks/useCalculator";
import { calculateBatteryAh } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";
import { FormulaBox } from "@/components/engineering/FormulaBox";

interface Inputs {
  loadW: number;
  runtimeMin: number;
  voltage: number;
  dod: number;
  efficiency: number;
}

const DEFAULTS: Inputs = {
  loadW: 50000,
  runtimeMin: 15,
  voltage: 192,
  dod: 0.8,
  efficiency: 0.9,
};

export default function BatteryAhCalculator() {
  const { inputs, setInput, result, isValid } = useCalculator(DEFAULTS, (i) =>
    calculateBatteryAh({
      loadWatts: i.loadW,
      runtimeMinutes: i.runtimeMin,
      busVoltage: i.voltage,
      depthOfDischarge: i.dod,
      efficiency: i.efficiency,
    })
  );

  const runtimeHr = inputs.runtimeMin / 60;

  return (
    <CalculatorCard
      title="Battery Ah Calculator"
      errorMessage={
        isValid ? null : "Please check inputs — Voltage > 0, DoD between 0-1, Efficiency between 0-1."
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <CalculatorField label="Load" unit="Watts" min={0} value={inputs.loadW} onChange={(v) => setInput("loadW", v)} />
        <CalculatorField label="Runtime" unit="minutes" min={1} value={inputs.runtimeMin} onChange={(v) => setInput("runtimeMin", v)} />
        <CalculatorField label="DC Bus Voltage" unit="V" min={12} value={inputs.voltage} onChange={(v) => setInput("voltage", v)} />
        <CalculatorField label="Depth of Discharge" step={0.05} min={0.1} max={1} value={inputs.dod} onChange={(v) => setInput("dod", v)} />
        <CalculatorField label="System Efficiency" step={0.01} min={0.5} max={1} value={inputs.efficiency} onChange={(v) => setInput("efficiency", v)} />
      </div>

      {isValid && result !== null && (
        <FormulaBox
          formula="Ah = (Load × Runtime_hr) ÷ (V × DoD × η)"
          workedExample={`Worked example: (${inputs.loadW.toLocaleString()} W × ${runtimeHr.toFixed(2)} hr) ÷ (${inputs.voltage}V × ${inputs.dod} × ${inputs.efficiency}) = ${result.toFixed(1)} Ah`}
          result={`Required Capacity: ${result.toFixed(1)} Ah`}
        />
      )}
    </CalculatorCard>
  );
}
