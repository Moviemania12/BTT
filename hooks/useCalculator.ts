"use client";

// ═══════════════════════════════════════════════════════════════════════════
// hooks/useCalculator.ts
//
// Generic calculator state hook. Every calculator across the platform
// (UPS, Battery Bank, Transformer, DG Set, etc.) uses this instead of
// repeating its own useState + validation wiring.
//
// Usage:
//   const calc = useCalculator(
//     { loadW: 50000, runtimeMin: 15, voltage: 192, dod: 0.8, efficiency: 0.9 },
//     (inputs) => calculateBatteryAh({ ...inputs }) // returns number | null
//   );
//   calc.inputs.loadW, calc.setInput("loadW", 60000), calc.result, calc.isValid
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useMemo, useCallback } from "react";

export interface UseCalculatorResult<TInputs, TResult> {
  inputs: TInputs;
  setInput: (key: keyof TInputs, value: number) => void;
  setInputs: (inputs: Partial<TInputs>) => void;
  result: TResult | null;
  isValid: boolean;
}

/**
 * Generic calculator hook — holds numeric inputs and derives a memoized
 * result via the provided pure compute function. The compute function
 * should return `null` for invalid input (matching the convention used by
 * every function in lib/engineering/<domain>/formulas.ts).
 *
 * MIGRATION NOTE (Phase 1 fix): the original constraint was
 * `TInputs extends Record<string, number>`, which under `strict` mode
 * rejects plain interfaces (e.g. `interface Inputs { loadW: number }`)
 * because they lack an explicit index signature — even though every field
 * is a number. Relaxed to `{ [K in keyof TInputs]: number }`, which
 * structurally requires "all fields are numbers" without demanding a
 * literal index signature. This was a genuine bug, found by real `tsc`
 * validation against the 7 UPS calculators that all hit it identically.
 */
export function useCalculator<TInputs extends { [K in keyof TInputs]: number }, TResult>(
  defaultInputs: TInputs,
  compute: (inputs: TInputs) => TResult | null
): UseCalculatorResult<TInputs, TResult> {
  const [inputs, setInputsState] = useState<TInputs>(defaultInputs);

  const setInput = useCallback((key: keyof TInputs, value: number) => {
    setInputsState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setInputs = useCallback((partial: Partial<TInputs>) => {
    setInputsState((prev) => ({ ...prev, ...partial }));
  }, []);

  const result = useMemo(() => compute(inputs), [inputs, compute]);

  return {
    inputs,
    setInput,
    setInputs,
    result,
    isValid: result !== null,
  };
}
