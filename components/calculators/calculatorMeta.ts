// ═══════════════════════════════════════════════════════════════════════════
// components/calculators/calculatorMeta.ts
//
// Display name + one-line description for every calculator page. Used by
// CalculatorGuide (WebApplication / BreadcrumbList JSON-LD) and by
// RelatedCalculators (links from articles to the calculators that belong
// to their topic). Text only — no calculator logic.
// ═══════════════════════════════════════════════════════════════════════════

export interface CalculatorMeta {
  title: string;
  description: string;
}

export const CALCULATOR_META: Record<string, CalculatorMeta> = {
  "battery-ah-calculator": {
    title: "Battery Ah Calculator",
    description: "Required UPS battery capacity (Ah) from load, runtime, DC bus voltage, depth of discharge and efficiency.",
  },
  "ups-runtime-calculator": {
    title: "UPS Runtime Calculator",
    description: "Battery backup time from battery capacity, DC bus voltage, depth of discharge and load.",
  },
  "battery-quantity-calculator": {
    title: "Battery Quantity Calculator",
    description: "Number of batteries needed to reach a target bank capacity, including multiple strings for redundancy.",
  },
  "battery-string-calculator": {
    title: "Battery String Calculator",
    description: "Number of batteries to connect in series to reach the DC bus voltage a UPS expects.",
  },
  "ups-load-calculator": {
    title: "UPS Load Calculator",
    description: "Recommended UPS rating (kVA) from connected load, simultaneity, power factor and growth margin.",
  },
  "ups-redundancy-calculator": {
    title: "UPS Redundancy Calculator",
    description: "UPS modules needed for N, N+1, N+2 and 2N redundancy, with spares and capacity utilisation.",
  },
  "data-center-ups-designer": {
    title: "Data Center UPS Designer",
    description: "Chained UPS sizing: kW to kVA, module count, battery string, battery Ah and UPS heat output.",
  },
  "cooling-calculator": {
    title: "Cooling Calculator",
    description: "IT heat load (kW) converted to tons of refrigeration, BTU/hr and required supply airflow (CFM).",
  },
  "rci-calculator": {
    title: "RCI Calculator",
    description: "Rack Cooling Index (RCI HI and LO) from rack inlet temperatures, to spot hot spots and over-cooling.",
  },
  "pue-calculator": {
    title: "PUE Calculator",
    description: "Power Usage Effectiveness and DCiE from total facility power and IT equipment power.",
  },
  "unit-converter": {
    title: "Unit Converter",
    description: "Power, temperature, length and pressure unit conversions used in data center work.",
  },
};
