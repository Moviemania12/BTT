import type { Metadata } from "next";
import { azureMetadata } from "@/content/azure/metadata";
import { azureContent } from "@/content/azure";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(azureMetadata);

export const articleSchema = buildArticleSchema({
  headline: azureMetadata.title,
  description: azureMetadata.seoDescription,
  authorName: azureMetadata.authorName,
  canonicalUrl: azureMetadata.canonicalUrl,
  datePublished: azureMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "Azure", url: azureMetadata.canonicalUrl },
]);

export const faqSchema =
  azureContent.faq.length > 0 ? buildFaqSchema(azureContent.faq) : null;
