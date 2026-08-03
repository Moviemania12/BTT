import type { ArticleContent } from "@/types/engineering/content";
import { aiInfraMetadata } from "./metadata";
import { aiInfraFaq } from "./faq";

export const aiInfraContent: ArticleContent = {
  metadata: aiInfraMetadata,
  faq: aiInfraFaq,
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
