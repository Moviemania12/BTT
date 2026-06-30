// ═══════════════════════════════════════════════════════════════════════════
// types/engineering/registry.ts
//
// The structured metadata contract for the Engineering Registry — the
// machine-readable knowledge layer that AI assistants, search, and future
// APIs consume DIRECTLY, instead of parsing JSX or scraping rendered pages.
//
// Every Formula, Standard, Calculator, OEM note, Glossary term, Fault Code,
// and Checklist gets one of these entries. The registry entry POINTS AT
// the real implementation (a function reference, a content file) — it
// never duplicates the logic itself.
// ═══════════════════════════════════════════════════════════════════════════

import type { ReviewStatus, SourceType } from "@/lib/engineering/core/units";

export type RegistryDomain =
  | "electrical" | "cooling" | "hvac" | "mechanical" | "fire" | "bms" | "dcim"
  | "networking" | "servers" | "cloud" | "ai" | "telecom";

export type RegistryCategory =
  | "formula" | "calculator" | "standard" | "oem" | "glossary" | "fault-code" | "checklist";

/**
 * Base fields shared by every registry entry, regardless of category.
 * This is the shape an AI assistant or search index reads first to decide
 * relevance before fetching category-specific detail.
 */
export interface RegistryEntryBase {
  id: string;
  domain: RegistryDomain;
  category: RegistryCategory;
  title: string;
  description: string;
  /** Which article slugs this entry is used by/relevant to */
  relatedTopics: string[];
  /** Which standards (by code, e.g. "IEC 62040") back this entry, if any */
  relatedStandards: string[];
  version: string;
  lastReviewed: string; // ISO date
  reviewStatus: ReviewStatus;
  sourceType: SourceType;
}

/** Registry entry for a formula — points to the real function, doesn't reimplement it. */
export interface FormulaRegistryEntry extends RegistryEntryBase {
  category: "formula";
  /** Dot-path to the real function, e.g. "electrical.calculateBatteryAh" — for documentation/AI context only, not used for dynamic invocation */
  functionRef: string;
  inputs: Array<{ name: string; unit: string; description: string }>;
  outputs: Array<{ name: string; unit: string; description: string }>;
  formulaText: string;
}

/** Registry entry for a calculator UI — points to the React component + the formula(s) it calls. */
export interface CalculatorRegistryEntry extends RegistryEntryBase {
  category: "calculator";
  /** Dot-path to the component, e.g. "ups.BatteryAhCalculator" — documentation only */
  componentRef: string;
  /** Formula registry ids this calculator depends on */
  usesFormulas: string[];
  /**
   * The calculator's own standalone route under /tools/<slug>. Every
   * calculator is a real, independently navigable, independently indexable
   * page — NOT embedded inline inside an article. Articles link OUT to
   * this route via TopicLink/CalculatorLink; they never render the
   * calculator component directly.
   */
  route: string;
  /** Calculator's own SEO title — independent of any article's SEO */
  seoTitle: string;
  /** Calculator's own SEO description — independent of any article's SEO */
  seoDescription: string;
  /** Calculator's own keyword targets — e.g. "ups battery sizing calculator" is its own search intent */
  keywords: string[];
}

/** Registry entry for an engineering standard. */
export interface StandardRegistryEntry extends RegistryEntryBase {
  category: "standard";
  code: string;
  fullName: string;
  governs: string;
}

/** Registry entry for OEM/vendor positioning. */
export interface OemRegistryEntry extends RegistryEntryBase {
  category: "oem";
  vendor: string;
  positioningNotes: Record<string, string>;
}

/** Registry entry for a glossary term. */
export interface GlossaryRegistryEntry extends RegistryEntryBase {
  category: "glossary";
  term: string;
  definition: string;
  aliases: string[];
}

/** Registry entry for a fault/alarm code. */
export interface FaultCodeRegistryEntry extends RegistryEntryBase {
  category: "fault-code";
  code: string;
  alarmName: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
}

/** Registry entry for a maintenance checklist. */
export interface ChecklistRegistryEntry extends RegistryEntryBase {
  category: "checklist";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
  itemCount: number;
}

export type RegistryEntry =
  | FormulaRegistryEntry
  | CalculatorRegistryEntry
  | StandardRegistryEntry
  | OemRegistryEntry
  | GlossaryRegistryEntry
  | FaultCodeRegistryEntry
  | ChecklistRegistryEntry;
