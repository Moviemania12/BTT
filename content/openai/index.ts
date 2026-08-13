import type { ArticleContent } from "@/types/engineering/content";
import { openaiMetadata } from "./metadata";
import { openaiFaq } from "./faq";

export const openaiContent: ArticleContent = {
  metadata: openaiMetadata,
  faq: openaiFaq,
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
