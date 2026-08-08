import type { ArticleContent } from "@/types/engineering/content";
import { gpuClusterMetadata } from "./metadata";
import { gpuClusterFaq } from "./faq";

export const gpuClusterContent: ArticleContent = {
  metadata: gpuClusterMetadata,
  faq: gpuClusterFaq,
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
