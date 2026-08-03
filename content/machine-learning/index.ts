import type { ArticleContent } from "@/types/engineering/content";
import { mlMetadata } from "./metadata";
import { mlFaq } from "./faq";

export const mlContent: ArticleContent = {
  metadata: mlMetadata,
  faq: mlFaq,
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
