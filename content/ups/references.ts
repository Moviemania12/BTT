// ═══════════════════════════════════════════════════════════════════════════
// content/ups/references.ts
//
// UPS OEM/vendor reference notes — generic positioning, never fabricated
// specs. Populated when the OEM Comparison section is written.
// ═══════════════════════════════════════════════════════════════════════════

export interface ReferenceEntry {
  vendor: string;
  notes: Record<string, string>;
}

export const upsReferences: ReferenceEntry[] = [];
