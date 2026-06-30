// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/electrical/standards.ts
//
// Electrical-domain engineering standards. Only what each standard GOVERNS
// is stated — never specific numeric thresholds (those require the actual
// published document and are revised between editions).
// ═══════════════════════════════════════════════════════════════════════════

export interface StandardEntry {
  code: string;
  fullName: string;
  governs: string;
  relevantTo: string[];
}

export const ELECTRICAL_STANDARDS: StandardEntry[] = [
  {
    code: "IEC 62040",
    fullName: "Uninterruptible Power Systems (UPS)",
    governs: "UPS performance, safety, and EMC requirements; classification (VFD/VI/VFI)",
    relevantTo: ["ups"],
  },
  {
    code: "IEEE 1188",
    fullName: "Recommended Practice for Maintenance, Testing, and Replacement of VRLA Batteries",
    governs: "Maintenance, testing and replacement criteria for VRLA batteries",
    relevantTo: ["ups", "battery-bank"],
  },
  {
    code: "IEEE 450",
    fullName: "Recommended Practice for Maintenance, Testing, and Replacement of Vented Lead-Acid Batteries",
    governs: "Maintenance, testing of vented (flooded) lead-acid batteries",
    relevantTo: ["ups", "battery-bank"],
  },
  {
    code: "IEEE 485",
    fullName: "Recommended Practice for Sizing Lead-Acid Batteries for Stationary Applications",
    governs: "Sizing methodology for lead-acid battery banks",
    relevantTo: ["ups", "battery-bank"],
  },
  {
    code: "IEC 60364",
    fullName: "Low-voltage Electrical Installations",
    governs: "Electrical installations of buildings — earthing, cable sizing, protection coordination",
    relevantTo: ["ups", "transformer", "earthing", "cable-sizing", "ht-yard"],
  },
  {
    code: "TIA-942",
    fullName: "Telecommunications Infrastructure Standard for Data Centers",
    governs: "Data Center infrastructure standard — Tier ratings, redundancy classes",
    relevantTo: ["ups", "data-center-types", "what-is-a-data-center"],
  },
  {
    code: "Uptime Institute Tiers",
    fullName: "Uptime Institute Tier Classification System",
    governs: "Tier I-IV classification — redundancy and concurrent maintainability requirements",
    relevantTo: ["ups", "dg-set", "data-center-types"],
  },
  {
    code: "NFPA 70 (NEC)",
    fullName: "National Electrical Code",
    governs: "Wiring, grounding, and overcurrent protection rules (US)",
    relevantTo: ["ups", "earthing", "cable-sizing"],
  },
];

export function getElectricalStandardsForArticle(slug: string): StandardEntry[] {
  return ELECTRICAL_STANDARDS.filter((s) => s.relevantTo.includes(slug));
}

export const STANDARDS_DISCLAIMER =
  "Actual implementation depends on project requirements, utility requirements, OEM design and Data Center architecture — these standards are a baseline reference, not a substitute for project-specific compliance review.";
