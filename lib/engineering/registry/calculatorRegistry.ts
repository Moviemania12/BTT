// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/registry/calculatorRegistry.ts
//
// Machine-readable metadata for every calculator. Each calculator is a
// real standalone page under /tools/<slug> with its own SEO — NOT embedded
// inline inside an article. Articles reference these via relatedCalculators
// (see content/<slug>/index.ts) and render a link/card, never the
// calculator component itself.
//
// componentRef points at the reusable component in components/calculators/
// (shared, route-independent); usesFormulas points at the real formula
// implementations in lib/engineering/<domain>/formulas.ts — neither is
// reimplemented here.
// ═══════════════════════════════════════════════════════════════════════════

import type { CalculatorRegistryEntry } from "@/types/engineering/registry";

const SITE_URL = "https://behindthetech.in";

export const CALCULATOR_REGISTRY: CalculatorRegistryEntry[] = [
  {
    id: "ups.battery-ah-calculator",
    domain: "electrical",
    category: "calculator",
    title: "Battery Ah Calculator",
    description: "Calculates required battery bank capacity (Ah) for a given load, runtime, and DC bus parameters.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.BatteryAhCalculator",
    usesFormulas: ["electrical.battery-ah"],
    route: "/tools/battery-ah-calculator",
    seoTitle: "Battery Ah Calculator — UPS Battery Sizing Tool | Behind The Tech",
    seoDescription:
      "Calculate required battery capacity (Ah) for your UPS backup load, runtime, and DC bus voltage. Free engineering calculator with worked formula breakdown.",
    keywords: ["battery ah calculator", "ups battery sizing", "battery capacity calculator", "dc bus battery sizing"],
  },
  {
    id: "ups.runtime-calculator",
    domain: "electrical",
    category: "calculator",
    title: "UPS Runtime Calculator",
    description: "Calculates expected battery backup runtime given capacity, voltage, and load.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.RuntimeCalculator",
    usesFormulas: ["electrical.runtime-hours"],
    route: "/tools/ups-runtime-calculator",
    seoTitle: "UPS Runtime Calculator — Battery Backup Time Tool | Behind The Tech",
    seoDescription:
      "Calculate how long your UPS will run on battery given Ah capacity, DC bus voltage, depth of discharge, and load. Free engineering calculator.",
    keywords: ["ups runtime calculator", "battery backup time calculator", "ups battery life calculator"],
  },
  {
    id: "ups.load-calculator",
    domain: "electrical",
    category: "calculator",
    title: "UPS Load Calculator",
    description: "Aggregates rack/IT load components into a recommended UPS sizing in kVA.",
    relatedTopics: ["ups"],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.UpsLoadCalculator",
    usesFormulas: ["electrical.load-aggregation"],
    route: "/tools/ups-load-calculator",
    seoTitle: "UPS Load Calculator — Data Center UPS Sizing Tool | Behind The Tech",
    seoDescription:
      "Calculate the right UPS size for your Data Center load. Add servers, storage, network, and lighting load — get a final kVA recommendation with demand factor and growth headroom.",
    keywords: ["ups load calculator", "ups sizing calculator", "data center ups sizing", "ups kva calculator"],
  },
  {
    id: "ups.battery-quantity-calculator",
    domain: "electrical",
    category: "calculator",
    title: "Battery Quantity Calculator",
    description: "Calculates total battery count needed across parallel strings for a target capacity.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.BatteryQuantityCalculator",
    usesFormulas: ["electrical.parallel-strings"],
    route: "/tools/battery-quantity-calculator",
    seoTitle: "Battery Quantity Calculator — UPS Battery Count Tool | Behind The Tech",
    seoDescription:
      "Calculate how many batteries you need for your UPS battery bank, including parallel strings for redundancy. Free engineering calculator.",
    keywords: ["battery quantity calculator", "ups battery count calculator", "battery bank sizing"],
  },
  {
    id: "ups.battery-string-calculator",
    domain: "electrical",
    category: "calculator",
    title: "Battery String Calculator",
    description: "Calculates batteries needed in series to reach a target DC bus voltage.",
    relatedTopics: ["ups", "battery-bank"],
    relatedStandards: ["IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.BatteryStringCalculator",
    usesFormulas: ["electrical.batteries-per-string"],
    route: "/tools/battery-string-calculator",
    seoTitle: "Battery String Calculator — DC Bus Voltage Sizing Tool | Behind The Tech",
    seoDescription:
      "Calculate how many batteries you need per string to reach your UPS DC bus voltage. Supports 2V, 6V, and 12V battery types.",
    keywords: ["battery string calculator", "dc bus voltage calculator", "battery series calculator"],
  },
  {
    id: "ups.redundancy-calculator",
    domain: "electrical",
    category: "calculator",
    title: "UPS Redundancy Calculator",
    description: "Calculates required modules, spares, and capacity utilization for N/N+1/N+2/2N architectures.",
    relatedTopics: ["ups"],
    relatedStandards: ["Uptime Institute Tiers", "TIA-942"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.UpsRedundancyCalculator",
    usesFormulas: ["electrical.redundancy"],
    route: "/tools/ups-redundancy-calculator",
    seoTitle: "UPS Redundancy Calculator — N+1 vs 2N Sizing Tool | Behind The Tech",
    seoDescription:
      "Calculate UPS module count, spares, and capacity utilization for N, N+1, N+2, and 2N redundancy architectures. Free Data Center engineering calculator.",
    keywords: ["ups redundancy calculator", "n+1 calculator", "2n architecture calculator", "ups module sizing"],
  },
  {
    id: "ups.data-center-ups-designer",
    domain: "electrical",
    category: "calculator",
    title: "Data Center UPS Designer",
    description: "Comprehensive first-pass sizing tool spanning UPS, battery, generator, transformer, PDU, and cabling.",
    relatedTopics: ["ups"],
    relatedStandards: ["Uptime Institute Tiers", "TIA-942", "IEEE 485"],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "platform-derived",
    componentRef: "calculators.DataCenterUpsDesigner",
    usesFormulas: [
      "electrical.kw-to-kva",
      "electrical.redundancy",
      "electrical.batteries-per-string",
      "electrical.battery-ah",
      "electrical.heat-dissipation",
    ],
    route: "/tools/data-center-ups-designer",
    seoTitle: "Data Center UPS Designer — Complete Sizing Tool | Behind The Tech",
    seoDescription:
      "Full first-pass Data Center UPS design: enter rack count and Tier level, get UPS modules, battery count, generator size, transformer size, PDU quantity, and cable sizing.",
    keywords: ["data center ups designer", "data center sizing tool", "ups design calculator", "tier iii ups sizing"],
  },
];

export function getCalculatorsByTopic(slug: string): CalculatorRegistryEntry[] {
  return CALCULATOR_REGISTRY.filter((c) => c.relatedTopics.includes(slug));
}

export function getCalculatorById(id: string): CalculatorRegistryEntry | undefined {
  return CALCULATOR_REGISTRY.find((c) => c.id === id);
}

export function getCalculatorByRoute(route: string): CalculatorRegistryEntry | undefined {
  return CALCULATOR_REGISTRY.find((c) => c.route === route);
}

export function getCalculatorUrl(id: string): string | undefined {
  const entry = getCalculatorById(id);
  return entry ? `${SITE_URL}${entry.route}` : undefined;
}
