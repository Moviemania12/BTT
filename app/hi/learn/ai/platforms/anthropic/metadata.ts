import type { Metadata } from "next";
import { anthropicMetadata } from "@/content/anthropic/metadata.hi";
import { anthropicContent } from "@/content/anthropic/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(anthropicMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/platforms/anthropic",
    languages: {
      en: "https://behindthetech.in/learn/ai/platforms/anthropic",
      hi: "https://behindthetech.in/hi/learn/ai/platforms/anthropic",
      "x-default": "https://behindthetech.in/learn/ai/platforms/anthropic",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/platforms/anthropic", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: anthropicMetadata.title,
  description: anthropicMetadata.seoDescription,
  authorName: anthropicMetadata.authorName,
  canonicalUrl: anthropicMetadata.canonicalUrl,
  datePublished: anthropicMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Platforms",      url: "https://behindthetech.in/learn/ai/platforms" },
  { name: "Anthropic",         url: anthropicMetadata.canonicalUrl },
]);

export const faqSchema =
  anthropicContent.faq.length > 0
    ? buildFaqSchema(anthropicContent.faq)
    : null;
