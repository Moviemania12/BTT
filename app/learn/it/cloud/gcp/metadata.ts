import type { Metadata } from "next";
import { gcpMetadata } from "@/content/gcp/metadata";
import { gcpContent } from "@/content/gcp";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(gcpMetadata);

export const articleSchema = buildArticleSchema({
  headline: gcpMetadata.title,
  description: gcpMetadata.seoDescription,
  authorName: gcpMetadata.authorName,
  canonicalUrl: gcpMetadata.canonicalUrl,
  datePublished: gcpMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "GCP", url: gcpMetadata.canonicalUrl },
]);

export const faqSchema =
  gcpContent.faq.length > 0 ? buildFaqSchema(gcpContent.faq) : null;
