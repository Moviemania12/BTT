"use client";

import { useCalculator } from "@/hooks/useCalculator";
import { calculateRuntimeHours, hoursToMinutes } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";
import { FormulaBox } from "@/components/engineering/FormulaBox";

interface Inputs {
  ah: number;
  voltage: number;
  dod: number;
  efficiency: number;
  loadW: number;
}

const DEFAULTS: Inputs = { ah: 100, voltage: 192, dod: 0.8, efficiency: 0.9, loadW: 50000 };

export default function RuntimeCalculator() {
  const { inputs, setInput, result, isValid } = useCalculator(DEFAULTS, (i) =>
    calculateRuntimeHours({
      ampHours: i.ah,
      busVoltage: i.voltage,
      depthOfDischarge: i.dod,
      efficiency: i.efficiency,
      loadWatts: i.loadW,
    })
  );

  const runtimeMin = result !== null ? hoursToMinutes(result) : 0;

  return (
    <CalculatorCard
      title="Runtime Calculator"
      errorMessage={
        isValid ? null : "Please check inputs — Load > 0, Voltage > 0, DoD between 0-1, Efficiency between 0-1."
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <CalculatorField label="Battery Capacity" unit="Ah" min={1} value={inputs.ah} onChange={(v) => setInput("ah", v)} />
        <CalculatorField label="DC Bus Voltage" unit="V" min={12} value={inputs.voltage} onChange={(v) => setInput("voltage", v)} />
        <CalculatorField label="Depth of Discharge" step={0.05} min={0.1} max={1} value={inputs.dod} onChange={(v) => setInput("dod", v)} />
        <CalculatorField label="System Efficiency" step={0.01} min={0.5} max={1} value={inputs.efficiency} onChange={(v) => setInput("efficiency", v)} />
        <CalculatorField label="Load" unit="Watts" min={1} value={inputs.loadW} onChange={(v) => setInput("loadW", v)} />
      </div>

      {isValid && result !== null && (
        <FormulaBox
          formula="Runtime = (Ah × V × DoD × η) ÷ Load_W × 60"
          workedExample={`Worked example: (${inputs.ah} Ah × ${inputs.voltage}V × ${inputs.dod} × ${inputs.efficiency}) ÷ ${inputs.loadW.toLocaleString()} W = ${result.toFixed(2)} hr`}
          result={`Estimated Runtime: ${runtimeMin.toFixed(1)} minutes (${result.toFixed(2)} hours)`}
        />
      )}
    </CalculatorCard>
  );
}
