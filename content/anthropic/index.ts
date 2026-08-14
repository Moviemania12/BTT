import type { ArticleContent } from "@/types/engineering/content";
import { anthropicMetadata } from "./metadata";
import { anthropicFaq } from "./faq";

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
