// ═══════════════════════════════════════════════════════════════════════════
// lib/engineering/registry/index.ts
//
// THE AI-FACING API SURFACE.
//
// An AI assistant (or search, or a future API route) imports ONLY from
// this file. It never parses JSX, never scrapes rendered pages, never
// reaches into a specific article's content folder directly — every
// piece of structured engineering knowledge on the platform is reachable
// from these functions.
//
//   import { getFormula, getCalculator, getFAQs, getGlossary,
//            getStandards, getFaultCodes, getMaintenanceChecklist,
//            getInterviewQuestions } from "@/lib/engineering/registry";
// ═══════════════════════════════════════════════════════════════════════════

import { FORMULA_REGISTRY, getFormulaById, getFormulasByTopic, getFormulasByDomain } from "./formulaRegistry";
import {
  CALCULATOR_REGISTRY,
  getCalculatorById,
  getCalculatorsByTopic,
  getCalculatorByRoute,
  getCalculatorUrl,
} from "./calculatorRegistry";
import { STANDARDS_REGISTRY, getStandardByCode, getStandardsByTopic, getStandardsByDomain } from "./standardsRegistry";
import { getContentRegistry } from "@/content/registry";
import type {
  FormulaRegistryEntry,
  CalculatorRegistryEntry,
  StandardRegistryEntry,
  GlossaryRegistryEntry,
  FaultCodeRegistryEntry,
  ChecklistRegistryEntry,
} from "@/types/engineering/registry";
import type { FaqItem } from "@/lib/schemas/faqSchema";
import type { InterviewQuestion } from "@/types/engineering/content";

// ─── Formulas ─────────────────────────────────────────────────────────────────

export function getFormula(id: string): FormulaRegistryEntry | undefined {
  return getFormulaById(id);
}

export function getFormulasForTopic(slug: string): FormulaRegistryEntry[] {
  return getFormulasByTopic(slug);
}

export function getAllFormulas(domain?: string): FormulaRegistryEntry[] {
  return domain ? getFormulasByDomain(domain) : FORMULA_REGISTRY;
}

// ─── Calculators ──────────────────────────────────────────────────────────────

export function getCalculator(id: string): CalculatorRegistryEntry | undefined {
  return getCalculatorById(id);
}

export function getCalculatorForRoute(route: string): CalculatorRegistryEntry | undefined {
  return getCalculatorByRoute(route);
}

export function getCalculatorLink(id: string): string | undefined {
  return getCalculatorUrl(id);
}

export function getCalculatorsForTopic(slug: string): CalculatorRegistryEntry[] {
  return getCalculatorsByTopic(slug);
}

export function getAllCalculators(): CalculatorRegistryEntry[] {
  return CALCULATOR_REGISTRY;
}

// ─── Standards ────────────────────────────────────────────────────────────────

export function getStandards(slugOrCode?: string): StandardRegistryEntry[] {
  if (!slugOrCode) return STANDARDS_REGISTRY;
  const byCode = getStandardByCode(slugOrCode);
  if (byCode) return [byCode];
  return getStandardsByTopic(slugOrCode);
}

export function getStandardsForDomain(domain: string): StandardRegistryEntry[] {
  return getStandardsByDomain(domain);
}

// ─── Article content (FAQ, glossary, fault codes, checklists, interview) ─────
// These delegate to content/registry.ts, which aggregates each article's
// content/<slug>/*.ts files. The registry function names below are the
// stable AI-facing contract — the underlying content files can be
// reorganized per-article without breaking this API.

export function getFAQs(slug: string): FaqItem[] {
  return getContentRegistry(slug)?.faq ?? [];
}

export function getGlossary(slug: string): GlossaryRegistryEntry[] {
  return getContentRegistry(slug)?.glossary ?? [];
}

export function getFaultCodes(slug: string): FaultCodeRegistryEntry[] {
  return getContentRegistry(slug)?.faults ?? [];
}

export function getMaintenanceChecklist(slug: string): ChecklistRegistryEntry[] {
  return getContentRegistry(slug)?.checklists ?? [];
}

export function getInterviewQuestions(slug: string): InterviewQuestion[] {
  return getContentRegistry(slug)?.interview ?? [];
}
