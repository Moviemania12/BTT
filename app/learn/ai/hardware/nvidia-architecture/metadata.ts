import type { Metadata } from "next";
import { nvidiaArchMetadata } from "@/content/nvidia-architecture/metadata";
import { nvidiaArchContent } from "@/content/nvidia-architecture";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(nvidiaArchMetadata);

export const articleSchema = buildArticleSchema({
  headline: nvidiaArchMetadata.title,
  description: nvidiaArchMetadata.seoDescription,
  authorName: nvidiaArchMetadata.authorName,
  canonicalUrl: nvidiaArchMetadata.canonicalUrl,
  datePublished: nvidiaArchMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",              url: "https://behindthetech.in" },
  { name: "AI Infrastructure", url: "https://behindthetech.in/learn/ai" },
  { name: "Hardware",          url: "https://behindthetech.in/learn/ai/hardware" },
  { name: "NVIDIA Architecture", url: nvidiaArchMetadata.canonicalUrl },
]);

export const faqSchema =
  nvidiaArchContent.faq.length > 0
    ? buildFaqSchema(nvidiaArchContent.faq)
    : null;
