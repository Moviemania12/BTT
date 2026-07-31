import type { ArticleContent } from "@/types/engineering/content";
import { gcpMetadata } from "./metadata";
import { gcpFaq } from "./faq";

export const gcpContent: ArticleContent = {
  metadata: gcpMetadata,
  faq: gcpFaq,
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
