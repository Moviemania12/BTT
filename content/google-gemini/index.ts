import type { ArticleContent } from "@/types/engineering/content";
import { googleGeminiMetadata } from "./metadata";
import { googleGeminiFaq } from "./faq";

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
