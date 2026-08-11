import type { Metadata } from "next";
import { aiNetworkingMetadata } from "@/content/ai-networking/metadata";
import { aiNetworkingContent } from "@/content/ai-networking";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(aiNetworkingMetadata);

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
