// ═══════════════════════════════════════════════════════════════════════════
// content/ups/glossary.ts
//
// UPS glossary — structured term definitions. This is what an AI assistant
// should query for "what is X" questions, NOT JSX prose parsing.
// ═══════════════════════════════════════════════════════════════════════════

export interface GlossaryTerm {
  term: string;
  definition: string;
  aliases: string[];
}

export const upsGlossary: GlossaryTerm[] = [
  {
    term: "UPS",
    definition:
      "Uninterruptible Power Supply — a device that provides continuous, regulated AC power to a load, switching to battery power instantly (or with zero gap, in online topology) when grid power fails.",
    aliases: ["Uninterruptible Power Supply"],
  },
  {
    term: "Rectifier",
    definition: "The UPS component that converts incoming AC power to DC, both charging the battery and feeding the DC bus.",
    aliases: ["AC-DC converter"],
  },
  {
    term: "Inverter",
    definition: "The UPS component that converts DC bus power back into clean, regulated AC power for the load.",
    aliases: ["DC-AC converter"],
  },
  {
    term: "Static Switch",
    definition:
      "A thyristor-based switch that transfers load between the inverter output and a bypass source in under 4 milliseconds, with no moving parts.",
    aliases: ["Static Transfer Switch", "STS"],
  },
  {
    term: "DC Bus",
    definition: "The internal electrical backbone connecting the rectifier output, battery bank, and inverter input inside a UPS.",
    aliases: [],
  },
  {
    term: "Depth of Discharge",
    definition:
      "The percentage of a battery's total capacity that is safely usable before recharging, without causing permanent capacity damage. Typically 80% for VRLA batteries.",
    aliases: ["DoD"],
  },
  {
    term: "N+1 Redundancy",
    definition: "A redundancy architecture with one extra module beyond the minimum required (N), allowing the system to survive a single module failure.",
    aliases: [],
  },
  {
    term: "2N Redundancy",
    definition: "A fully redundant architecture with two complete, independent power paths, allowing the system to survive the complete loss of one entire path.",
    aliases: [],
  },
  {
    term: "Online Double Conversion",
    definition:
      "A UPS topology where power is converted AC→DC→AC continuously; the load is always powered by the inverter, giving zero transfer time on grid failure.",
    aliases: ["Double Conversion UPS"],
  },
  {
    term: "VRLA",
    definition: "Valve Regulated Lead Acid — a sealed, maintenance-free battery type, the most common choice for commercial UPS installations.",
    aliases: ["Sealed Lead Acid"],
  },
];
