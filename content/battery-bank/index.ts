// ═══════════════════════════════════════════════════════════════════════════
// content/battery-bank/index.ts
//
// Assembles every content/battery-bank/*.ts file into the ArticleContent
// contract. Batch 1 populates metadata and FAQ; remaining fields (glossary,
// examples, faults, maintenance, checklists, interview, tables, references)
// will be populated in Batches 4-5 following the same pattern as content/ups.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleContent } from "@/types/engineering/content";
import { batteryBankMetadata } from "./metadata";
import { batteryBankFaq } from "./faq";

export const batteryBankContent: ArticleContent = {
  metadata: batteryBankMetadata,
  faq: batteryBankFaq,
  glossary: [],
  examples: [],
  relatedCalculators: [
    "ups.battery-ah-calculator",
    "ups.battery-quantity-calculator",
    "ups.battery-string-calculator",
    "ups.runtime-calculator",
    "ups.load-calculator",
    "ups.redundancy-calculator",
    "ups.data-center-ups-designer",
  ],
  faults: [],
  maintenance: [],
  checklists: [],
  interview: [],
  tables: [],
  references: [],
};
