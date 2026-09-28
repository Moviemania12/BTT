import type { ArticleContent } from "@/types/engineering/content";
import { llmMetadata } from "./metadata.hi";
import { llmFaq } from "./faq.hi";

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
