// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/cloud/standards.ts
//
// cloud-domain engineering standards registry. STUB — populate only with
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

export const CLOUD_STANDARDS: StandardEntry[] = [];
