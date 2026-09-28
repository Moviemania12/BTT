import type { Metadata } from "next";
import { llmMetadata } from "@/content/llms/metadata.hi";
import { llmContent } from "@/content/llms/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(llmMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/fundamentals/llm",
    languages: {
      en: "https://behindthetech.in/learn/ai/fundamentals/llm",
      hi: "https://behindthetech.in/hi/learn/ai/fundamentals/llm",
      "x-default": "https://behindthetech.in/learn/ai/fundamentals/llm",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/fundamentals/llm", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: llmMetadata.title,
  description: llmMetadata.seoDescription,
  authorName: llmMetadata.authorName,
  canonicalUrl: llmMetadata.canonicalUrl,
  datePublished: llmMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Fundamentals",      url: "https://behindthetech.in/learn/ai/fundamentals" },
  { name: "Large Language Models", url: llmMetadata.canonicalUrl },
]);

export const faqSchema =
  llmContent.faq.length > 0 ? buildFaqSchema(llmContent.faq) : null;
