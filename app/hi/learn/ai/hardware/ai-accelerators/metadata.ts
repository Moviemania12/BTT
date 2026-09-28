import type { Metadata } from "next";
import { aiAcceleratorsMetadata } from "@/content/ai-accelerators/metadata.hi";
import { aiAcceleratorsContent } from "@/content/ai-accelerators/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiAcceleratorsMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/hardware/ai-accelerators",
    languages: {
      en: "https://behindthetech.in/learn/ai/hardware/ai-accelerators",
      hi: "https://behindthetech.in/hi/learn/ai/hardware/ai-accelerators",
      "x-default": "https://behindthetech.in/learn/ai/hardware/ai-accelerators",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/hardware/ai-accelerators", locale: "hi_IN" },
};

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
