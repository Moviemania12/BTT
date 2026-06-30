// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/registry/formulaRegistry.ts
//
// Machine-readable metadata for every engineering formula on the platform.
// This is what an AI assistant queries — NOT the JSX components, NOT the
// rendered page. Each entry POINTS AT the real function in
// lib/engineering/<domain>/formulas.ts; it never reimplements the formula.
//
// To add a new formula's metadata: write the real function first (in its
// domain's formulas.ts), then register it here.
// ═══════════════════════════════════════════════════════════════════════════

import type { FormulaRegistryEntry } from "@/types/engineering/registry";

export const FORMULA_REGISTRY: FormulaRegistryEntry[] = [
  {
    id: "electrical.kw-to-kva",
    domain: "electrical",
    category: "formula",
    title: "kW to kVA Conversion",
    description: "Converts real power (kW) to apparent power (kVA) given a power factor.",
    relatedTopics: ["ups", "transformer", "dg-set"],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.kwToKva",
    inputs: [
      { name: "kw", unit: "kW", description: "Real power" },
      { name: "powerFactor", unit: "ratio (0-1]", description: "Power factor" },
    ],
    outputs: [{ name: "kva", unit: "kVA", description: "Apparent power" }],
    formulaText: "kVA = kW ÷ PF",
  },
  {
    id: "electrical.battery-ah",
    domain: "electrical",
    category: "formula",
    title: "Battery Ah Sizing",
    description: "Calculates required battery capacity in Ah for a given load, runtime, and system parameters.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "standard",
    functionRef: "electrical.calculateBatteryAh",
    inputs: [
      { name: "loadWatts", unit: "W", description: "Load power" },
      { name: "runtimeMinutes", unit: "min", description: "Required backup runtime" },
      { name: "busVoltage", unit: "V", description: "DC bus voltage" },
      { name: "depthOfDischarge", unit: "ratio (0-1]", description: "Allowable depth of discharge" },
      { name: "efficiency", unit: "ratio (0-1]", description: "System round-trip efficiency" },
    ],
    outputs: [{ name: "ampHours", unit: "Ah", description: "Required battery capacity" }],
    formulaText: "Ah = (Load_W × Runtime_hr) ÷ (V × DoD × η)",
  },
  {
    id: "electrical.runtime-hours",
    domain: "electrical",
    category: "formula",
    title: "Battery Runtime Calculation",
    description: "Calculates expected backup runtime given battery capacity, system voltage, and load.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "standard",
    functionRef: "electrical.calculateRuntimeHours",
    inputs: [
      { name: "ampHours", unit: "Ah", description: "Battery capacity" },
      { name: "busVoltage", unit: "V", description: "DC bus voltage" },
      { name: "depthOfDischarge", unit: "ratio (0-1]", description: "Allowable depth of discharge" },
      { name: "efficiency", unit: "ratio (0-1]", description: "System round-trip efficiency" },
      { name: "loadWatts", unit: "W", description: "Load power" },
    ],
    outputs: [{ name: "runtimeHours", unit: "hr", description: "Expected backup runtime" }],
    formulaText: "Runtime_hr = (Ah × V × DoD × η) ÷ Load_W",
  },
  {
    id: "electrical.batteries-per-string",
    domain: "electrical",
    category: "formula",
    title: "Batteries Per String",
    description: "Calculates the number of batteries needed in series to reach a target DC bus voltage.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.calculateBatteriesPerString",
    inputs: [
      { name: "busVoltage", unit: "V", description: "Target DC bus voltage" },
      { name: "unitVoltage", unit: "V", description: "Per-battery voltage" },
    ],
    outputs: [{ name: "batteriesPerString", unit: "count", description: "Number of batteries in series" }],
    formulaText: "Batteries per string = ⌈Bus Voltage ÷ Per-Battery Voltage⌉",
  },
  {
    id: "electrical.parallel-strings",
    domain: "electrical",
    category: "formula",
    title: "Parallel Strings Required",
    description: "Calculates the number of parallel battery strings needed to reach a target Ah capacity.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.calculateParallelStrings",
    inputs: [
      { name: "requiredAh", unit: "Ah", description: "Target bank capacity" },
      { name: "unitAh", unit: "Ah", description: "Per-battery rated capacity" },
    ],
    outputs: [{ name: "parallelStrings", unit: "count", description: "Number of parallel strings" }],
    formulaText: "Parallel strings = max(1, ⌈Required Ah ÷ Unit Ah⌉)",
  },
  {
    id: "electrical.voltage-drop",
    domain: "electrical",
    category: "formula",
    title: "Voltage Drop Calculation",
    description: "Calculates voltage drop across a cable run given current, length, cross-section, and conductor material.",
    relatedTopics: ["ups", "cable-sizing", "earthing"],
    relatedStandards: ["IEC 60364"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.calculateVoltageDrop",
    inputs: [
      { name: "current", unit: "A", description: "Load current" },
      { name: "lengthMeters", unit: "m", description: "One-way cable length" },
      { name: "cableSizeMm2", unit: "mm²", description: "Cable cross-section area" },
      { name: "conductorMaterial", unit: "copper|aluminium", description: "Conductor material" },
      { name: "threePhase", unit: "boolean", description: "3-phase (√3 factor) vs single-phase (2× factor)" },
    ],
    outputs: [{ name: "voltageDropVolts", unit: "V", description: "Voltage drop" }],
    formulaText: "Vdrop = factor × ρ × L × I ÷ A  (factor = √3 for 3-phase, 2 for 1-phase)",
  },
  {
    id: "electrical.recommended-cable-size",
    domain: "electrical",
    category: "formula",
    title: "Recommended Cable Size",
    description: "Solves the voltage-drop formula for cross-section area, given a maximum allowable voltage drop %.",
    relatedTopics: ["ups", "cable-sizing"],
    relatedStandards: ["IEC 60364"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.calculateRecommendedCableSize",
    inputs: [
      { name: "current", unit: "A", description: "Load current" },
      { name: "lengthMeters", unit: "m", description: "One-way cable length" },
      { name: "systemVoltage", unit: "V", description: "System voltage" },
      { name: "maxVoltageDropPercent", unit: "%", description: "Maximum allowable voltage drop" },
      { name: "conductorMaterial", unit: "copper|aluminium", description: "Conductor material" },
      { name: "threePhase", unit: "boolean", description: "3-phase vs single-phase" },
    ],
    outputs: [{ name: "cableSizeMm2", unit: "mm²", description: "Recommended cable cross-section" }],
    formulaText: "A = factor × ρ × L × I ÷ (maxDrop% × V)",
  },
  {
    id: "electrical.heat-dissipation",
    domain: "electrical",
    category: "formula",
    title: "Heat Dissipation",
    description: "Calculates heat generated by an electrical device's losses, in kW and BTU/hr.",
    relatedTopics: ["ups", "transformer"],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "physical-constant",
    functionRef: "electrical.calculateHeatDissipation",
    inputs: [
      { name: "ratingKva", unit: "kVA", description: "Device rating" },
      { name: "efficiencyPercent", unit: "%", description: "Device efficiency" },
    ],
    outputs: [
      { name: "lossesKw", unit: "kW", description: "Power lost as heat" },
      { name: "btuPerHour", unit: "BTU/hr", description: "Heat output for cooling load sizing" },
    ],
    formulaText: "Losses_kW = Rating_kVA × (1 − η); BTU/hr = Losses_kW × 1000 × 3.412142",
  },
  {
    id: "electrical.redundancy",
    domain: "electrical",
    category: "formula",
    title: "Redundancy Module Sizing",
    description: "Calculates required module count, spares, and capacity utilization for N/N+1/N+2/2N redundancy architectures.",
    relatedTopics: ["ups"],
    relatedStandards: ["Uptime Institute Tiers", "TIA-942"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "industry-rule-of-thumb",
    functionRef: "electrical.calculateRedundancy",
    inputs: [
      { name: "itLoadKva", unit: "kVA", description: "Critical IT load" },
      { name: "moduleSizeKva", unit: "kVA", description: "Size of one UPS module" },
      { name: "architecture", unit: "N|N+1|N+2|2N", description: "Redundancy architecture" },
    ],
    outputs: [
      { name: "totalModules", unit: "count", description: "Total modules required" },
      { name: "capacityUtilizationPercent", unit: "%", description: "Utilization at full load" },
    ],
    formulaText: "baseModules = ⌈Load ÷ ModuleSize⌉; totalModules per architecture rule",
  },
  {
    id: "electrical.load-aggregation",
    domain: "electrical",
    category: "formula",
    title: "Load Aggregation & Sizing Pipeline",
    description: "Standard load sizing pipeline: connected load → demand factor → kVA conversion → future growth headroom.",
    relatedTopics: ["ups", "transformer", "dg-set"],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "industry-rule-of-thumb",
    functionRef: "electrical.calculateLoadAggregation",
    inputs: [
      { name: "totalConnectedKw", unit: "kW", description: "Sum of nameplate loads" },
      { name: "demandFactor", unit: "ratio (0-1]", description: "Expected simultaneous usage factor" },
      { name: "powerFactor", unit: "ratio (0-1]", description: "Power factor" },
      { name: "futureGrowthPercent", unit: "%", description: "Headroom for future expansion" },
    ],
    outputs: [{ name: "finalKva", unit: "kVA", description: "Final sizing recommendation" }],
    formulaText: "appliedKw = connectedKw × demandFactor; finalKva = (appliedKw ÷ PF) × (1 + growth%)",
  },
];

/** Returns all formula registry entries for a given domain. */
export function getFormulasByDomain(domain: string): FormulaRegistryEntry[] {
  return FORMULA_REGISTRY.filter((f) => f.domain === domain);
}

/** Returns all formula registry entries relevant to a given article slug. */
export function getFormulasByTopic(slug: string): FormulaRegistryEntry[] {
  return FORMULA_REGISTRY.filter((f) => f.relatedTopics.includes(slug));
}

/** Returns a single formula registry entry by id, or undefined. */
export function getFormulaById(id: string): FormulaRegistryEntry | undefined {
  return FORMULA_REGISTRY.find((f) => f.id === id);
}
