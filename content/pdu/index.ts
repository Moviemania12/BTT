import type { ArticleContent } from "@/types/engineering/content";
import { pduMetadata } from "./metadata";
import { pduFaq } from "./faq";

export const pduContent: ArticleContent = {
  metadata: pduMetadata,
  faq: pduFaq,
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
