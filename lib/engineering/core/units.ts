// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/core/units.ts
//
// Domain-agnostic unit primitives. Used by EVERY domain (electrical,
// cooling, mechanical, fire, BMS, networking, etc.) — contains NO formulas,
// NO domain-specific logic. If a unit only makes sense in one domain
// (e.g. "CFM" belongs to cooling/hvac), it is declared in that domain's
// own types file, not here.
// ═══════════════════════════════════════════════════════════════════════════

/** Generic engineering value with explicit unit — prevents unit-confusion bugs */
export interface EngineeringValue<U extends string> {
  value: number;
  unit: U;
}

/** Generic severity classification — used by fault libraries across all domains */
export type Severity = "critical" | "high" | "medium" | "low" | "info";

/** Generic review status for registry entries — domain-agnostic */
export type ReviewStatus = "verified" | "generic-guidance" | "needs-review" | "deprecated";

/** Generic source type for registry entries — distinguishes provenance */
export type SourceType = "standard" | "physical-constant" | "industry-rule-of-thumb" | "oem-general" | "platform-derived";

/** Uptime Institute / TIA-942 Tier classification — cross-domain (electrical, cooling, networking all reference Tiers) */
export type DataCenterTier = "I" | "II" | "III" | "IV";

/** Redundancy architecture classification — used by electrical, cooling, networking */
export type RedundancyArchitecture = "N" | "N+1" | "N+2" | "2N" | "2(N+1)" | "distributed";
