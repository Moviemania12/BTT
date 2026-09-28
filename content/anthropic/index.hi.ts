import type { ArticleContent } from "@/types/engineering/content";
import { anthropicMetadata } from "./metadata.hi";
import { anthropicFaq } from "./faq.hi";

export const anthropicContent: ArticleContent = {
  metadata: anthropicMetadata,
  faq: anthropicFaq,
  glossary: [],
  examples: [],
  relatedCalculators: [],
  faults: [],
  maintenance: [],
  checklists: [],
  interview: [],
  tables: [],
  references: [],
};
