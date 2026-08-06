import type { ArticleContent } from "@/types/engineering/content";
import { llmMetadata } from "./metadata";
import { llmFaq } from "./faq";

export const llmContent: ArticleContent = {
  metadata: llmMetadata,
  faq: llmFaq,
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
