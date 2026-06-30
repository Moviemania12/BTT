// ═══════════════════════════════════════════════════════════════════════════
// content/ups/faults.ts
//
// UPS fault/alarm library. STRUCTURALLY ready — the 10 alarm entries
// (Battery Low, Battery Open, Rectifier Fail, etc.) specified in the
// article's Phase 4 plan get added here when that phase resumes. This
// file is the single source the "Common UPS Alarms" section AND the AI
// registry both read from.
// ═══════════════════════════════════════════════════════════════════════════

export interface FaultEntry {
  code: string;
  alarmName: string;
  meaning: string;
  possibleCauses: string[];
  troubleshootingSteps: string[];
  solution: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
}

export const upsFaults: FaultEntry[] = [
  // Populated in Phase 4: Battery Low, Battery Open, Rectifier Fail,
  // Inverter Fault, Bypass Active, Over Temperature, DC High, DC Low,
  // Output Short, Fan Fail.
];
