import type { Metadata } from "next";
import { aiGpuMetadata } from "@/content/ai-gpu/metadata";
import { aiGpuContent } from "@/content/ai-gpu";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiGpuMetadata);

export const articleSchema = buildArticleSchema({
  headline: aiGpuMetadata.title,
  description: aiGpuMetadata.seoDescription,
  authorName: aiGpuMetadata.authorName,
  canonicalUrl: aiGpuMetadata.canonicalUrl,
  datePublished: aiGpuMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "AI GPU",            url: aiGpuMetadata.canonicalUrl },
]);

export const faqSchema =
  aiGpuContent.faq.length > 0 ? buildFaqSchema(aiGpuContent.faq) : null;
