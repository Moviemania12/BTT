import type { Metadata } from "next";
import { aiAcceleratorsMetadata } from "@/content/ai-accelerators/metadata";
import { aiAcceleratorsContent } from "@/content/ai-accelerators";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiAcceleratorsMetadata);

export const articleSchema = buildArticleSchema({
  headline: aiAcceleratorsMetadata.title,
  description: aiAcceleratorsMetadata.seoDescription,
  authorName: aiAcceleratorsMetadata.authorName,
  canonicalUrl: aiAcceleratorsMetadata.canonicalUrl,
  datePublished: aiAcceleratorsMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "AI Accelerators",   url: aiAcceleratorsMetadata.canonicalUrl },
]);

export const faqSchema =
  aiAcceleratorsContent.faq.length > 0
    ? buildFaqSchema(aiAcceleratorsContent.faq)
    : null;
