import type { Metadata } from "next";
import { aiInfraMetadata } from "@/content/what-is-ai-infrastructure/metadata.hi";
import { aiInfraContent } from "@/content/what-is-ai-infrastructure/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiInfraMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/fundamentals/what-is-ai-infrastructure",
    languages: {
      en: "https://behindthetech.in/learn/ai/fundamentals/what-is-ai-infrastructure",
      hi: "https://behindthetech.in/hi/learn/ai/fundamentals/what-is-ai-infrastructure",
      "x-default": "https://behindthetech.in/learn/ai/fundamentals/what-is-ai-infrastructure",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/fundamentals/what-is-ai-infrastructure", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: aiInfraMetadata.title,
  description: aiInfraMetadata.seoDescription,
  authorName: aiInfraMetadata.authorName,
  canonicalUrl: aiInfraMetadata.canonicalUrl,
  datePublished: aiInfraMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",               url: "https://behindthetech.in" },
  { name: "AI Infrastructure",  url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",       url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "What is AI Infrastructure", url: aiInfraMetadata.canonicalUrl },
]);

export const faqSchema =
  aiInfraContent.faq.length > 0 ? buildFaqSchema(aiInfraContent.faq) : null;
