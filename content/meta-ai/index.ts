import type { ArticleContent } from "@/types/engineering/content";
import { metaAiMetadata } from "./metadata";
import { metaAiFaq } from "./faq";

export const metaAiContent: ArticleContent = {
  metadata: metaAiMetadata,
  faq: metaAiFaq,
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
