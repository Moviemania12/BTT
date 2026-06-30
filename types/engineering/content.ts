// ═══════════════════════════════════════════════════════════════════════════
// types/engineering/content.ts
//
// Shared types for the content/ data layer — every article's structured
// facts (FAQ, glossary, examples, faults, maintenance, checklists,
// interview questions, tables, references) conform to these shapes.
// React pages AND the AI registry both consume these same files.
// ═══════════════════════════════════════════════════════════════════════════

export interface ArticleMetadata {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  keywords: string[];
  authorName: string;
  datePublished: string;
  dateModified?: string;
  readingTimeMinutes: number;
}

export interface InterviewQuestion {
  question: string;
  difficulty: "beginner" | "advanced";
  modelAnswer: string;
}

export interface WorkedExampleRow {
  component: string;
  valueKw: number;
  notes?: string;
}

export interface WorkedExample {
  title: string;
  rows: WorkedExampleRow[];
  steps: string[];
  finalResult: string;
}

export interface MaintenanceTask {
  task: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "half-yearly" | "yearly";
}

export interface ReferenceEntry {
  vendor: string;
  notes: Record<string, string>;
}

/**
 * The full structured-content contract for one article. Every article's
 * content/<slug>/index.ts exports an object satisfying this shape — this
 * is what content/registry.ts aggregates and what the AI registry reads.
 */
export interface ArticleContent {
  metadata: ArticleMetadata;
  faq: Array<{ question: string; answer: string }>;
  glossary: Array<{ term: string; definition: string; aliases: string[] }>;
  examples: WorkedExample[];
  /**
   * Calculator registry ids relevant to this article (e.g.
   * "ups.battery-ah-calculator"). Articles use this to render link/card
   * references to standalone /tools/<slug> pages — they NEVER embed the
   * calculator component inline. The registry is the single source of
   * truth for the article<->calculator relationship in both directions:
   * CalculatorRegistryEntry.relatedTopics points calculator->article,
   * this field points article->calculator.
   */
  relatedCalculators: string[];
  faults: Array<{
    code: string;
    alarmName: string;
    meaning: string;
    possibleCauses: string[];
    troubleshootingSteps: string[];
    solution: string;
    severity: "critical" | "high" | "medium" | "low" | "info";
  }>;
  maintenance: MaintenanceTask[];
  checklists: Array<{ title: string; frequency: MaintenanceTask["frequency"]; items: string[] }>;
  interview: InterviewQuestion[];
  tables: Array<{ title?: string; headers: string[]; rows: string[][]; caption?: string }>;
  references: ReferenceEntry[];
}
