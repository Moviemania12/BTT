import type { ArticleContent } from "@/types/engineering/content";
import { genAiMetadata } from "./metadata.hi";
import { genAiFaq } from "./faq.hi";

export const genAiContent: ArticleContent = {
  metadata: genAiMetadata,
  faq: genAiFaq,
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
