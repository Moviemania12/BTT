import type { Metadata } from "next";
import { tpuMetadata } from "@/content/tpu/metadata";
import { tpuContent } from "@/content/tpu";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(tpuMetadata);

export const articleSchema = buildArticleSchema({
  headline: tpuMetadata.title,
  description: tpuMetadata.seoDescription,
  authorName: tpuMetadata.authorName,
  canonicalUrl: tpuMetadata.canonicalUrl,
  datePublished: tpuMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "TPU",               url: tpuMetadata.canonicalUrl },
]);

export const faqSchema =
  tpuContent.faq.length > 0 ? buildFaqSchema(tpuContent.faq) : null;
