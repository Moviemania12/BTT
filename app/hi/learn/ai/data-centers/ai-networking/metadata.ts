import type { Metadata } from "next";
import { aiNetworkingMetadata } from "@/content/ai-networking/metadata.hi";
import { aiNetworkingContent } from "@/content/ai-networking/index.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const baseMetadata = buildPageMetadata(aiNetworkingMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "https://behindthetech.in/hi/learn/ai/data-centers/ai-networking",
    languages: {
      en: "https://behindthetech.in/learn/ai/data-centers/ai-networking",
      hi: "https://behindthetech.in/hi/learn/ai/data-centers/ai-networking",
      "x-default": "https://behindthetech.in/learn/ai/data-centers/ai-networking",
    },
  },
  openGraph: { ...baseMetadata.openGraph, url: "https://behindthetech.in/hi/learn/ai/data-centers/ai-networking", locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: aiNetworkingMetadata.title,
  description: aiNetworkingMetadata.seoDescription,
  authorName: aiNetworkingMetadata.authorName,
  canonicalUrl: aiNetworkingMetadata.canonicalUrl,
  datePublished: aiNetworkingMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "AI Data Centers",   url: "https://behindthetech.in/learn/ai/data-centers" },
  { name: "AI Networking",     url: aiNetworkingMetadata.canonicalUrl },
]);

export const faqSchema =
  aiNetworkingContent.faq.length > 0
    ? buildFaqSchema(aiNetworkingContent.faq)
    : null;
