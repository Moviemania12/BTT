// ═══════════════════════════════════════════════════════════════════════════
// content/answers/types.ts
//
// Data model for the "Answer Desk" (/answers/fix/[slug]). Every field here
// is sourced from content/study/troubleshooting.ts — this type exists to
// add page-level framing (slug, SEO, safety, FAQ, review date) around that
// already-reviewed field data, never to invent new engineering content.
// ═══════════════════════════════════════════════════════════════════════════

/** Short Q&A pulled from a Fix answer's own fields — never invented facts. */
export interface AnswerFaqItem {
  question: string;
  answer: string;
}

export interface FixAnswer {
  /** URL slug — /answers/fix/<slug> */
  slug: string;

  /** Matches the `id` of the source entry in content/study/troubleshooting.ts,
   *  so the two stay traceable to each other. */
  sourceId: string;

  category: string;
  categoryColor: string;

  /** The question as a person would type it into Google. */
  title: string;

  /** 2–3 line direct answer shown before anything else on the page. */
  directAnswer: string;

  /**
   * true when this problem can involve live electrical, fire-suppression,
   * fuel, or other hazardous systems. Pages with this true render a
   * safety box before any diagnostic steps and must not include any
   * go/no-go live-switching, fuel-handling, or suppression-discharge
   * instruction — only isolation + escalation guidance.
   */
  hazardous: boolean;
  safetyNote?: string;

  symptoms: string[];
  causes: string[];
  verify: string[];
  steps: string[];
  rootCause: string;
  resolution: string;
  prevention: string[];
  escalation: string;
  siteExample: string;
  mistakes: string[];

  /** A short "why this happens" explanation — mechanism, not just a definition. */
  whyThisHappens: string;

  /** Assumptions/limits this answer does not cover — stated plainly, never implied universal. */
  assumptions: string[];

  /** Slug in lib/topics.ts TOPICS registry — for the full-article link + RelatedCalculators. */
  relatedTopicSlug: string;

  /** Slugs of other FixAnswer entries this problem is commonly confused with or follows from. */
  relatedAnswerSlugs: string[];

  faqs: AnswerFaqItem[];

  seoTitle: string;
  seoDescription: string;

  /** ISO date — set only when a real editorial review of this page happened. */
  reviewedAt: string;
}
