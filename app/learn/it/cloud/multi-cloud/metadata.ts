import type { Metadata } from "next";
import { multiCloudMetadata } from "@/content/multi-cloud/metadata";
import { multiCloudContent } from "@/content/multi-cloud";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(multiCloudMetadata);

export const articleSchema = buildArticleSchema({
  headline: multiCloudMetadata.title,
  description: multiCloudMetadata.seoDescription,
  authorName: multiCloudMetadata.authorName,
  canonicalUrl: multiCloudMetadata.canonicalUrl,
  datePublished: multiCloudMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "Multi Cloud", url: multiCloudMetadata.canonicalUrl },
]);

export const faqSchema =
  multiCloudContent.faq.length > 0 ? buildFaqSchema(multiCloudContent.faq) : null;
