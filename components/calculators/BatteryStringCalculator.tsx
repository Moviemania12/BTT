"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import { calculateBatteriesPerString } from "@/lib/engineering/electrical";
import { CalculatorCard } from "@/components/engineering/CalculatorCard";
import { CalculatorField } from "@/components/engineering/CalculatorField";
import { FormulaBox } from "@/components/engineering/FormulaBox";

export default function BatteryStringCalculator() {
  const [busVoltage, setBusVoltage] = useState<number>(192);
  const [unitVoltage, setUnitVoltage] = useState<number>(12);

  const result = useMemo(() => calculateBatteriesPerString(busVoltage, unitVoltage), [busVoltage, unitVoltage]);
  const isValid = result !== null;
  const exactDivision = unitVoltage > 0 ? busVoltage / unitVoltage : 0;
  const isWholeNumber = Number.isInteger(exactDivision);
  const actualStringVoltage = result !== null ? result * unitVoltage : 0;

  return (
    <CalculatorCard
      title="Battery String Calculator"
      errorMessage={isValid ? null : "Please enter a valid positive bus voltage."}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
        <CalculatorField
          label="Required DC Bus Voltage"
          unit="V"
          min={0}
          value={busVoltage}
          onChange={setBusVoltage}
        />
        <div>
          <label style={{ fontSize: "0.85rem", color: "#374151", display: "block", marginBottom: "0.3rem" }}>
            Per-Battery Voltage (V)
          </label>
          <select
            value={unitVoltage}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setUnitVoltage(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "0.45rem 0.6rem",
              borderRadius: "6px",
              border: "1.5px solid #D1D5DB",
              background: "#ffffff",
              color: "#111827",
            }}
          >
            <option value={2}>2V (Flooded cell)</option>
            <option value={6}>6V</option>
            <option value={12}>12V (VRLA — most common)</option>
          </select>
        </div>
      </div>

      {isValid && result !== null && (
        <FormulaBox
          formula="Batteries per string = Bus Voltage ÷ Per-Battery Voltage"
          result={`Batteries Per String: ${result}`}
          workedExample={
            !isWholeNumber
              ? `⚠️ Exact division gives ${exactDivision.toFixed(2)} — rounded up to ${result}. Actual string voltage will be ${actualStringVoltage}V, slightly higher than required. Verify against UPS OEM's exact DC bus specification before finalizing.`
              : undefined
          }
        />
      )}
    </CalculatorCard>
  );
}
