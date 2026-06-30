// ═══════════════════════════════════════════════════════════════════════════
// content/registry.ts
//
// Aggregates every article's content/<slug>/index.ts into one lookup, and
// ADAPTS the plain content shapes (used directly by React pages) into the
// enriched RegistryEntry shapes (used by the AI-facing registry API).
//
// This adapter boundary is intentional: a React page rendering a glossary
// term doesn't need `reviewStatus`/`domain`/`id` — but the AI registry
// does, to let an assistant reason about provenance and freshness. Content
// authors write the simple shape once; this file enriches it.
//
// To add a new article: write content/<new-slug>/index.ts satisfying
// ArticleContent, then register it in CONTENT_MAP below.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleContent } from "@/types/engineering/content";
import type {
  GlossaryRegistryEntry,
  FaultCodeRegistryEntry,
  ChecklistRegistryEntry,
} from "@/types/engineering/registry";
import { upsContent } from "./ups";

// ─── Plain content lookup (used by React pages) ───────────────────────────────

const CONTENT_MAP: Record<string, ArticleContent> = {
  ups: upsContent,
  // Future articles register here: "battery-bank": batteryBankContent, etc.
};

export function getArticleContent(slug: string): ArticleContent | undefined {
  return CONTENT_MAP[slug];
}

// ─── Registry-shaped lookup (used by the AI-facing API) ────────────────────────
// Domain is inferred from the article's own metadata where possible; for
// now every registered article is electrical (UPS) — this expands
// naturally as cooling/fire/etc. articles are added.

const ARTICLE_DOMAIN: Record<string, GlossaryRegistryEntry["domain"]> = {
  ups: "electrical",
};

function enrichGlossary(slug: string, content: ArticleContent): GlossaryRegistryEntry[] {
  const domain = ARTICLE_DOMAIN[slug] ?? "electrical";
  return content.glossary.map((g, i) => ({
    id: `glossary.${slug}.${i}`,
    domain,
    category: "glossary" as const,
    title: g.term,
    description: g.definition,
    relatedTopics: [slug],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: content.metadata.dateModified ?? content.metadata.datePublished,
    reviewStatus: "verified" as const,
    sourceType: "platform-derived" as const,
    term: g.term,
    definition: g.definition,
    aliases: g.aliases,
  }));
}

function enrichFaults(slug: string, content: ArticleContent): FaultCodeRegistryEntry[] {
  const domain = ARTICLE_DOMAIN[slug] ?? "electrical";
  return content.faults.map((f) => ({
    id: `fault.${slug}.${f.code}`,
    domain,
    category: "fault-code" as const,
    title: f.alarmName,
    description: f.meaning,
    relatedTopics: [slug],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: content.metadata.dateModified ?? content.metadata.datePublished,
    reviewStatus: "verified" as const,
    sourceType: "platform-derived" as const,
    code: f.code,
    alarmName: f.alarmName,
    severity: f.severity,
  }));
}

function enrichChecklists(slug: string, content: ArticleContent): ChecklistRegistryEntry[] {
  const domain = ARTICLE_DOMAIN[slug] ?? "electrical";
  return content.checklists.map((c, i) => ({
    id: `checklist.${slug}.${i}`,
    domain,
    category: "checklist" as const,
    title: c.title,
    description: `${c.frequency} maintenance checklist with ${c.items.length} items`,
    relatedTopics: [slug],
    relatedStandards: [],
    version: "1.0.0",
    lastReviewed: content.metadata.dateModified ?? content.metadata.datePublished,
    reviewStatus: "verified" as const,
    sourceType: "platform-derived" as const,
    frequency: c.frequency,
    itemCount: c.items.length,
  }));
}

export interface ContentRegistryView {
  faq: ArticleContent["faq"];
  glossary: GlossaryRegistryEntry[];
  faults: FaultCodeRegistryEntry[];
  checklists: ChecklistRegistryEntry[];
  interview: ArticleContent["interview"];
}

/** The single function the AI-facing registry (lib/engineering/registry) calls. */
export function getContentRegistry(slug: string): ContentRegistryView | undefined {
  const content = CONTENT_MAP[slug];
  if (!content) return undefined;

  return {
    faq: content.faq,
    glossary: enrichGlossary(slug, content),
    faults: enrichFaults(slug, content),
    checklists: enrichChecklists(slug, content),
    interview: content.interview,
  };
}
