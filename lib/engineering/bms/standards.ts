// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/bms/standards.ts
//
// bms-domain engineering standards registry. STUB — populate only with
// verified "what this standard governs" entries, following
// lib/engineering/electrical/standards.ts. Never state numeric thresholds
// without verifying against the current published edition.
// ═══════════════════════════════════════════════════════════════════════════

export interface StandardEntry {
  code: string;
  fullName: string;
  governs: string;
  relevantTo: string[];
}

export const BMS_STANDARDS: StandardEntry[] = [];
