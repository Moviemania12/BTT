// ═══════════════════════════════════════════════════════════════════════════
// content/ups/index.ts
//
// Assembles every content/ups/*.ts file into the single ArticleContent
// shape. This is what content/registry.ts reads, and transitively, what
// the AI-facing registry API (lib/engineering/registry) reads.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleContent } from "@/types/engineering/content";
import { upsMetadata } from "./metadata";
import { upsFaq } from "./faq";
import { upsGlossary } from "./glossary";
import { upsExamples } from "./examples";
import { upsFaults } from "./faults";
import { upsMaintenanceTasks } from "./maintenance";
import { upsChecklists } from "./checklists";
import { upsInterviewQuestions } from "./interview";
import { upsTables } from "./tables";
import { upsReferences } from "./references";

export const upsContent: ArticleContent = {
  metadata: upsMetadata,
  faq: upsFaq,
  glossary: upsGlossary,
  examples: upsExamples,
  // The 7 calculators relevant to UPS — these are standalone /tools/<slug>
  // pages (see app/tools/), referenced here by registry id only. The
  // article renders link cards to these via getCalculatorsForTopic("ups"),
  // never the calculator component itself.
  relatedCalculators: [
    "ups.load-calculator",
    "ups.battery-ah-calculator",
    "ups.runtime-calculator",
    "ups.battery-quantity-calculator",
    "ups.battery-string-calculator",
    "ups.redundancy-calculator",
    "ups.data-center-ups-designer",
  ],
  faults: upsFaults,
  maintenance: upsMaintenanceTasks,
  checklists: upsChecklists,
  interview: upsInterviewQuestions,
  tables: upsTables,
  references: upsReferences,
};
