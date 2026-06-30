// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/registry/standardsRegistry.ts
//
// Aggregates standards across all domains into the registry shape.
// Currently only electrical has verified standards; other domains will
// add theirs as those articles are built — this file just aggregates
// whatever each domain's standards.ts exports, never duplicates them.
// ═══════════════════════════════════════════════════════════════════════════

import type { StandardRegistryEntry } from "@/types/engineering/registry";
import { ELECTRICAL_STANDARDS } from "@/lib/engineering/electrical/standards";

function toRegistryEntry(
  domain: StandardRegistryEntry["domain"],
  s: { code: string; fullName: string; governs: string; relevantTo: string[] }
): StandardRegistryEntry {
  return {
    id: `standard.${s.code.toLowerCase().replace(/\s+/g, "-")}`,
    domain,
    category: "standard",
    title: s.code,
    description: s.governs,
    relatedTopics: s.relevantTo,
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: "2025-01-01",
    reviewStatus: "verified",
    sourceType: "standard",
    code: s.code,
    fullName: s.fullName,
    governs: s.governs,
  };
}

export const STANDARDS_REGISTRY: StandardRegistryEntry[] = [
  ...ELECTRICAL_STANDARDS.map((s) => toRegistryEntry("electrical", s)),
  // Other domains' standards will be appended here as those domains are built.
];

export function getStandardsByDomain(domain: string): StandardRegistryEntry[] {
  return STANDARDS_REGISTRY.filter((s) => s.domain === domain);
}

export function getStandardsByTopic(slug: string): StandardRegistryEntry[] {
  return STANDARDS_REGISTRY.filter((s) => s.relatedTopics.includes(slug));
}

export function getStandardByCode(code: string): StandardRegistryEntry | undefined {
  return STANDARDS_REGISTRY.find((s) => s.code === code);
}
