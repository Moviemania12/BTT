import type { ArticleContent } from "@/types/engineering/content";
import { googleGeminiMetadata } from "./metadata.hi";
import { googleGeminiFaq } from "./faq.hi";

export const googleGeminiContent: ArticleContent = {
  metadata: googleGeminiMetadata,
  faq: googleGeminiFaq,
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
