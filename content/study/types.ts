// ─── Interview Types ──────────────────────────────────────────────────────────

export interface InterviewQuestion {
  /** Sequential number across all categories */
  n: number;
  /** The question text */
  q: string;
  /** Full expected answer (may include newlines for readability) */
  answer: string;
  /** Why the interviewer asked this — what they're really testing */
  why: string;
  /** What the interviewer is really evaluating — depth of expectation */
  expectation: string;
  /** The mistake most candidates make */
  mistake: string;
  /** Real field tip from production experience */
  tip: string;
}

export interface InterviewSection {
  /** Display label (Beginner, Intermediate, etc.) */
  label: string;
  /** Accent color for badges and borders */
  color: string;
  /** Background color for category pill */
  bg: string;
  /** Short description shown under section heading */
  desc: string;
  questions: InterviewQuestion[];
}

// ─── Troubleshooting Types ────────────────────────────────────────────────────

export interface TroubleshootingGuide {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  symptoms: string[];
  causes: string[];
  verify: string[];
  steps: string[];
  /** A→I→D→R→P→RCA workflow — optional on legacy guides */
  alarm?: string;
  isolation?: string;
  diagnosis?: string;
  resolution?: string;
  prevention: string[];
  rca?: string;
  /** Legacy fields kept for backward compat */
  rootCause: string;
  escalation: string;
  siteExample: string;
  mistakes: string[];
}

// ─── Checklist Types ──────────────────────────────────────────────────────────

export interface CheckItem {
  text: string;
  note?: string;
  critical?: boolean;
}

export interface ChecklistSection {
  heading: string;
  items: CheckItem[];
}

export interface Checklist {
  id: string;
  title: string;
  color: string;
  freq: string;
  duration: string;
  desc: string;
  sections: ChecklistSection[];
}

// ─── Glossary Types ───────────────────────────────────────────────────────────

export interface GlossaryTerm {
  term: string;
  full?: string;
  /** Alternate spellings / acronym expansions / synonyms searched by GlossaryClient */
  aliases?: string[];
  meaning: string;
  whyMatters: string;
  whereSeen: string;
  confusion?: string;
  example: string;
  related: string[];
  /**
   * Slugs validated against lib/topics.ts published routes.
   * URL is built per-slug using ARTICLE_ROUTE_MAP in GlossaryClient.
   * Never add a slug that is not in ARTICLE_ROUTE_MAP.
   */
  articles?: string[];
}

export interface GlossarySection {
  heading: string;
  color: string;
  terms: GlossaryTerm[];
}
