import type { Metadata } from "next";
import { amdAiMetadata } from "@/content/amd-ai-platforms/metadata";
import { amdAiContent } from "@/content/amd-ai-platforms";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(amdAiMetadata);

export const articleSchema = buildArticleSchema({
  headline: amdAiMetadata.title,
  description: amdAiMetadata.seoDescription,
  authorName: amdAiMetadata.authorName,
  canonicalUrl: amdAiMetadata.canonicalUrl,
  datePublished: amdAiMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "AMD AI Platforms",  url: amdAiMetadata.canonicalUrl },
]);

export const faqSchema =
  amdAiContent.faq.length > 0
    ? buildFaqSchema(amdAiContent.faq)
    : null;
