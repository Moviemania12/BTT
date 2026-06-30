"use client";

import { useCalculator } from "@/hooks/useCalculator";
import { calculateParallelStrings } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";
import { FormulaBox } from "@/components/engineering/FormulaBox";

interface Inputs {
  requiredAh: number;
  unitAh: number;
  stringCount: number;
}

const DEFAULTS: Inputs = { requiredAh: 100, unitAh: 100, stringCount: 1 };

export default function BatteryQuantityCalculator() {
  const { inputs, setInput, result, isValid } = useCalculator(DEFAULTS, (i) =>
    calculateParallelStrings(i.requiredAh, i.unitAh)
  );

  const totalBatteries = result !== null ? result * Math.max(1, inputs.stringCount) : 0;

  return (
    <CalculatorCard
      title="Battery Quantity Calculator"
      errorMessage={isValid ? null : "Please enter valid positive values for all fields."}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <CalculatorField label="Required Bank Capacity" unit="Ah" min={0} value={inputs.requiredAh} onChange={(v) => setInput("requiredAh", v)} />
        <CalculatorField label="Per-Battery Rating" unit="Ah" min={0} value={inputs.unitAh} onChange={(v) => setInput("unitAh", v)} />
        <CalculatorField label="Number of Strings (redundancy)" min={1} value={inputs.stringCount} onChange={(v) => setInput("stringCount", Math.max(1, v))} />
      </div>

      {isValid && result !== null && (
        <FormulaBox
          formula="Parallel batteries per string = Required Ah ÷ Per-Battery Ah"
          workedExample={`Parallel batteries needed (per string): ${result}`}
          result={`Total Batteries Required: ${totalBatteries} (${result} parallel × ${inputs.stringCount} string${inputs.stringCount > 1 ? "s" : ""})`}
        />
      )}
    </CalculatorCard>
  );
}
