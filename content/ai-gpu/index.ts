import type { ArticleContent } from "@/types/engineering/content";
import { aiGpuMetadata } from "./metadata";
import { aiGpuFaq } from "./faq";

export const aiGpuContent: ArticleContent = {
  metadata: aiGpuMetadata,
  faq: aiGpuFaq,
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
