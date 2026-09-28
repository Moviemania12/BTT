import type { ArticleContent } from "@/types/engineering/content";
import { gpuClusterMetadata } from "./metadata.hi";
import { gpuClusterFaq } from "./faq.hi";

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
