// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/electrical/formulas.ts
//
// Electrical engineering calculation functions. UPS, Battery Bank,
// Transformer, DG Set, PDU, STS, RMU, HT Yard import from here. A formula
// is written ONCE in this file for the entire electrical domain.
//
// RULES:
//   - Every function is pure (no side effects, deterministic output).
//   - Every function returns `null` on invalid input — never throws,
//     never divides by zero, never returns NaN/Infinity silently.
//   - No article-specific defaults live here — defaults belong in the
//     calling calculator.
//   - No fabricated standard values — only verifiable physical/
//     mathematical constants.
// ═══════════════════════════════════════════════════════════════════════════

import { CONDUCTOR_RESISTIVITY, WATTS_TO_BTU_PER_HOUR } from "./constants";

// ─── Power conversions ──────────────────────────────────────────────────────────

/** kVA = kW ÷ PF. Returns null if PF is not in (0, 1]. */
export function kwToKva(kw: number, powerFactor: number): number | null {
  if (!isFinite(kw) || !isFinite(powerFactor)) return null;
  if (powerFactor <= 0 || powerFactor > 1) return null;
  if (kw < 0) return null;
  return kw / powerFactor;
}

/** kW = kVA × PF */
export function kvaToKw(kva: number, powerFactor: number): number | null {
  if (!isFinite(kva) || !isFinite(powerFactor)) return null;
  if (powerFactor <= 0 || powerFactor > 1) return null;
  if (kva < 0) return null;
  return kva * powerFactor;
}

/** Power Factor = kW ÷ kVA. Returns null if kVA <= 0. */
export function calculatePowerFactor(kw: number, kva: number): number | null {
  if (!isFinite(kw) || !isFinite(kva)) return null;
  if (kva <= 0 || kw < 0) return null;
  const pf = kw / kva;
  return pf > 1 ? 1 : pf;
}

// ─── Battery sizing ───────────────────────────────────────────────────────────

export interface BatteryAhInputs {
  loadWatts: number;
  runtimeMinutes: number;
  busVoltage: number;
  depthOfDischarge: number;
  efficiency: number;
}

/** Ah = (Load_W × Runtime_hr) ÷ (V × DoD × η). Returns null on any invalid input. */
export function calculateBatteryAh(inputs: BatteryAhInputs): number | null {
  const { loadWatts, runtimeMinutes, busVoltage, depthOfDischarge, efficiency } = inputs;
  if (![loadWatts, runtimeMinutes, busVoltage, depthOfDischarge, efficiency].every(isFinite)) return null;
  if (loadWatts < 0 || runtimeMinutes <= 0) return null;
  if (busVoltage <= 0 || depthOfDischarge <= 0 || depthOfDischarge > 1) return null;
  if (efficiency <= 0 || efficiency > 1) return null;

  const runtimeHr = runtimeMinutes / 60;
  return (loadWatts * runtimeHr) / (busVoltage * depthOfDischarge * efficiency);
}

export interface RuntimeInputs {
  ampHours: number;
  busVoltage: number;
  depthOfDischarge: number;
  efficiency: number;
  loadWatts: number;
}

/** Runtime_hr = (Ah × V × DoD × η) ÷ Load_W. Returns null on any invalid input. */
export function calculateRuntimeHours(inputs: RuntimeInputs): number | null {
  const { ampHours, busVoltage, depthOfDischarge, efficiency, loadWatts } = inputs;
  if (![ampHours, busVoltage, depthOfDischarge, efficiency, loadWatts].every(isFinite)) return null;
  if (ampHours <= 0 || loadWatts <= 0) return null;
  if (busVoltage <= 0 || depthOfDischarge <= 0 || depthOfDischarge > 1) return null;
  if (efficiency <= 0 || efficiency > 1) return null;

  return (ampHours * busVoltage * depthOfDischarge * efficiency) / loadWatts;
}

/** Number of batteries in series needed to reach a target bus voltage. Rounds UP. */
export function calculateBatteriesPerString(busVoltage: number, unitVoltage: number): number | null {
  if (!isFinite(busVoltage) || !isFinite(unitVoltage)) return null;
  if (busVoltage <= 0 || unitVoltage <= 0) return null;
  return Math.ceil(busVoltage / unitVoltage);
}

/** Number of parallel strings needed to reach a target Ah capacity. Rounds UP, minimum 1. */
export function calculateParallelStrings(requiredAh: number, unitAh: number): number | null {
  if (!isFinite(requiredAh) || !isFinite(unitAh)) return null;
  if (requiredAh <= 0 || unitAh <= 0) return null;
  return Math.max(1, Math.ceil(requiredAh / unitAh));
}

// ─── Cable sizing & voltage drop ───────────────────────────────────────────────

export interface VoltageDropInputs {
  current: number;
  lengthMeters: number;
  cableSizeMm2: number;
  conductorMaterial: "copper" | "aluminium";
  /** true for 3-phase (√3 factor), false for single-phase (2× factor) */
  threePhase: boolean;
}

/** Voltage drop in Volts. Returns null on invalid input. */
export function calculateVoltageDrop(inputs: VoltageDropInputs): number | null {
  const { current, lengthMeters, cableSizeMm2, conductorMaterial, threePhase } = inputs;
  if (![current, lengthMeters, cableSizeMm2].every(isFinite)) return null;
  if (current <= 0 || lengthMeters <= 0 || cableSizeMm2 <= 0) return null;

  const resistivity = CONDUCTOR_RESISTIVITY[conductorMaterial];
  const factor = threePhase ? Math.sqrt(3) : 2;
  return (factor * resistivity * lengthMeters * current) / cableSizeMm2;
}

export interface VoltageDropPercentInputs extends VoltageDropInputs {
  systemVoltage: number;
}

/** Voltage drop as a percentage of system voltage. Returns null on invalid input. */
export function calculateVoltageDropPercent(inputs: VoltageDropPercentInputs): number | null {
  const drop = calculateVoltageDrop(inputs);
  if (drop === null) return null;
  if (!isFinite(inputs.systemVoltage) || inputs.systemVoltage <= 0) return null;
  return (drop / inputs.systemVoltage) * 100;
}

export interface CableSizeInputs {
  current: number;
  lengthMeters: number;
  systemVoltage: number;
  maxVoltageDropPercent: number;
  conductorMaterial: "copper" | "aluminium";
  threePhase: boolean;
}

/** Recommended cable size (mm²) for a target max voltage drop %. */
export function calculateRecommendedCableSize(inputs: CableSizeInputs): number | null {
  const { current, lengthMeters, systemVoltage, maxVoltageDropPercent, conductorMaterial, threePhase } = inputs;
  if (![current, lengthMeters, systemVoltage, maxVoltageDropPercent].every(isFinite)) return null;
  if (current <= 0 || lengthMeters <= 0 || systemVoltage <= 0 || maxVoltageDropPercent <= 0) return null;

  const resistivity = CONDUCTOR_RESISTIVITY[conductorMaterial];
  const factor = threePhase ? Math.sqrt(3) : 2;
  const allowedDropVolts = (maxVoltageDropPercent / 100) * systemVoltage;
  if (allowedDropVolts <= 0) return null;

  return (factor * resistivity * lengthMeters * current) / allowedDropVolts;
}

// ─── Heat dissipation ──────────────────────────────────────────────────────────

export interface HeatDissipationInputs {
  ratingKva: number;
  efficiencyPercent: number;
}

export interface HeatDissipationResult {
  lossesKw: number;
  btuPerHour: number;
}

/** Heat dissipated by an electrical device given its rating and efficiency. */
export function calculateHeatDissipation(inputs: HeatDissipationInputs): HeatDissipationResult | null {
  const { ratingKva, efficiencyPercent } = inputs;
  if (!isFinite(ratingKva) || !isFinite(efficiencyPercent)) return null;
  if (ratingKva <= 0 || efficiencyPercent <= 0 || efficiencyPercent > 100) return null;

  const lossesFraction = 1 - efficiencyPercent / 100;
  const lossesKw = ratingKva * lossesFraction;
  const btuPerHour = lossesKw * 1000 * WATTS_TO_BTU_PER_HOUR;

  return { lossesKw, btuPerHour };
}

// ─── Redundancy / module sizing ────────────────────────────────────────────────

export type RedundancyArchitectureKey = "N" | "N+1" | "N+2" | "2N";

export interface RedundancyResult {
  baseModules: number;
  spareModules: number;
  totalModules: number;
  totalCapacityKva: number;
  capacityUtilizationPercent: number;
}

/** Calculates module count and utilization for a given redundancy architecture. */
export function calculateRedundancy(
  itLoadKva: number,
  moduleSizeKva: number,
  architecture: RedundancyArchitectureKey
): RedundancyResult | null {
  if (!isFinite(itLoadKva) || !isFinite(moduleSizeKva)) return null;
  if (itLoadKva <= 0 || moduleSizeKva <= 0) return null;

  const baseModules = Math.ceil(itLoadKva / moduleSizeKva);
  let totalModules: number;
  let spareModules: number;

  switch (architecture) {
    case "N":
      spareModules = 0;
      totalModules = baseModules;
      break;
    case "N+1":
      spareModules = 1;
      totalModules = baseModules + 1;
      break;
    case "N+2":
      spareModules = 2;
      totalModules = baseModules + 2;
      break;
    case "2N":
      spareModules = baseModules;
      totalModules = baseModules * 2;
      break;
  }

  const totalCapacityKva = totalModules * moduleSizeKva;
  const capacityUtilizationPercent = totalCapacityKva > 0 ? (itLoadKva / totalCapacityKva) * 100 : 0;

  return { baseModules, spareModules, totalModules, totalCapacityKva, capacityUtilizationPercent };
}

// ─── Demand factor / load aggregation ──────────────────────────────────────────

export interface LoadAggregationInputs {
  totalConnectedKw: number;
  demandFactor: number;
  powerFactor: number;
  futureGrowthPercent: number;
}

export interface LoadAggregationResult {
  appliedKw: number;
  baseKva: number;
  finalKva: number;
}

/** Standard load sizing pipeline: Connected Load → Demand Factor → kVA → Future Growth. */
export function calculateLoadAggregation(inputs: LoadAggregationInputs): LoadAggregationResult | null {
  const { totalConnectedKw, demandFactor, powerFactor, futureGrowthPercent } = inputs;
  if (![totalConnectedKw, demandFactor, powerFactor, futureGrowthPercent].every(isFinite)) return null;
  if (totalConnectedKw < 0) return null;
  if (demandFactor <= 0 || demandFactor > 1) return null;
  if (powerFactor <= 0 || powerFactor > 1) return null;
  if (futureGrowthPercent < 0) return null;

  const appliedKw = totalConnectedKw * demandFactor;
  const baseKva = appliedKw / powerFactor;
  const finalKva = baseKva * (1 + futureGrowthPercent / 100);

  return { appliedKw, baseKva, finalKva };
}
