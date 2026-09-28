import type { Metadata } from "next";
import { openaiMetadata } from "@/content/openai/metadata.hi";
import { openaiContent } from "@/content/openai/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(openaiMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/platforms/openai",
    languages: {
      en: "https://behindthetech.in/learn/ai/platforms/openai",
      hi: "https://behindthetech.in/hi/learn/ai/platforms/openai",
      "x-default": "https://behindthetech.in/learn/ai/platforms/openai",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/platforms/openai", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: openaiMetadata.title,
  description: openaiMetadata.seoDescription,
  authorName: openaiMetadata.authorName,
  canonicalUrl: openaiMetadata.canonicalUrl,
  datePublished: openaiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "OpenAI",            url: openaiMetadata.canonicalUrl },
]);

export const faqSchema =
  openaiContent.faq.length > 0
    ? buildFaqSchema(openaiContent.faq)
    : null;
