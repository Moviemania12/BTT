import type { ArticleContent } from "@/types/engineering/content";
import { aiDcMetadata } from "./metadata";
import { aiDcFaq } from "./faq";

export const aiDcContent: ArticleContent = {
  metadata: aiDcMetadata,
  faq: aiDcFaq,
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
