import type { Metadata } from "next";
import { aiDcMetadata } from "@/content/ai-data-center-basics/metadata";
import { aiDcContent } from "@/content/ai-data-center-basics";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiDcMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/learn/ai/data-centers/ai-data-center-basics",
    languages: {
      en: "https://behindthetech.in/learn/ai/data-centers/ai-data-center-basics",
      hi: "https://behindthetech.in/hi/learn/ai/data-centers/ai-data-center-basics",
      "x-default": "https://behindthetech.in/learn/ai/data-centers/ai-data-center-basics",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/learn/ai/data-centers/ai-data-center-basics", locale: "en_US" },
};

export const articleSchema = buildArticleSchema({
  headline: aiDcMetadata.title,
  description: aiDcMetadata.seoDescription,
  authorName: aiDcMetadata.authorName,
  canonicalUrl: aiDcMetadata.canonicalUrl,
  datePublished: aiDcMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",               url: "https://behindthetech.in" },
  { name: "AI Infrastructure",  url: "https://behindthetech.in/learn/ai" },
  { name: "AI Data Centers",    url: "https://behindthetech.in/learn/ai/data-centers" },
  { name: "AI Data Center Basics", url: aiDcMetadata.canonicalUrl },
]);

export const faqSchema =
  aiDcContent.faq.length > 0
    ? buildFaqSchema(aiDcContent.faq)
    : null;
