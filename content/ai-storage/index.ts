import type { ArticleContent } from "@/types/engineering/content";
import { aiStorageMetadata } from "./metadata";
import { aiStorageFaq } from "./faq";

export const aiStorageContent: ArticleContent = {
  metadata: aiStorageMetadata,
  faq: aiStorageFaq,
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
