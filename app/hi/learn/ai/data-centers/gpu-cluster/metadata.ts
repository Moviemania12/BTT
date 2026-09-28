import type { Metadata } from "next";
import { gpuClusterMetadata } from "@/content/gpu-cluster/metadata.hi";
import { gpuClusterContent } from "@/content/gpu-cluster/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(gpuClusterMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/data-centers/gpu-cluster",
    languages: {
      en: "https://behindthetech.in/learn/ai/data-centers/gpu-cluster",
      hi: "https://behindthetech.in/hi/learn/ai/data-centers/gpu-cluster",
      "x-default": "https://behindthetech.in/learn/ai/data-centers/gpu-cluster",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/data-centers/gpu-cluster", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: gpuClusterMetadata.title,
  description: gpuClusterMetadata.seoDescription,
  authorName: gpuClusterMetadata.authorName,
  canonicalUrl: gpuClusterMetadata.canonicalUrl,
  datePublished: gpuClusterMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",                url: "https://behindthetech.in" },
  { name: "AI Infrastructure",   url: "https://behindthetech.in/learn/ai" },
  { name: "AI Data Centers",     url: "https://behindthetech.in/learn/ai/data-centers" },
  { name: "GPU Cluster",         url: gpuClusterMetadata.canonicalUrl },
]);

export const faqSchema =
  gpuClusterContent.faq.length > 0
    ? buildFaqSchema(gpuClusterContent.faq)
    : null;
