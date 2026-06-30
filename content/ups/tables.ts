// ═══════════════════════════════════════════════════════════════════════════
// content/ups/tables.ts
//
// UPS comparison tables as structured data. A subset is populated here
// from already-written Phase 2-3 content to prove the pattern; sections
// currently render their own inline <ComparisonTable> calls (Phase 2-3
// behavior, preserved unchanged) — migrating every inline table call to
// read from here is incremental follow-up work, not required for this
// architecture phase to be considered complete. New tables going forward
// should be added here first.
// ═══════════════════════════════════════════════════════════════════════════

export interface TableData {
  title?: string;
  headers: string[];
  rows: string[][];
  caption?: string;
}

export const upsTables: TableData[] = [
  {
    title: "UPS Types Overview",
    headers: ["Type", "Transfer Time", "Output Quality", "Efficiency", "Typical Use"],
    rows: [
      ["Offline (Standby)", "2–10 ms", "Raw mains (with surge protection)", "~98%", "Home PC, small office"],
      ["Line Interactive", "2–4 ms", "Stabilized via AVR", "~97%", "Small server room, branch office"],
      ["Online Double Conversion", "0 ms (continuous)", "Always clean, regulated", "94–96% (99% Eco mode)", "Data Center, hospital, critical infra"],
      ["Delta Conversion", "0 ms (continuous)", "Always clean, regulated", "Up to 97%", "Large Data Center, high-power installs"],
      ["Modular UPS", "0 ms (continuous)", "Always clean, regulated", "94–97%", "Scalable Data Center, N+1 built-in"],
    ],
  },
  {
    title: "VRLA vs Lithium-ion",
    headers: ["Parameter", "VRLA", "Lithium-ion (LFP)"],
    rows: [
      ["Weight (per kWh)", "Heavy — ~30-40 kg/kWh", "Light — ~8-12 kg/kWh"],
      ["Cycle life", "300-500 cycles", "3000-5000 cycles"],
      ["Upfront cost", "Lower", "2-3× higher"],
      ["Total cost of ownership (10yr)", "Higher (multiple replacements)", "Often lower despite higher upfront"],
    ],
  },
];
