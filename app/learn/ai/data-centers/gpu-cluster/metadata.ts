import type { Metadata } from "next";
import { gpuClusterMetadata } from "@/content/gpu-cluster/metadata";
import { gpuClusterContent } from "@/content/gpu-cluster";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(gpuClusterMetadata);

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
