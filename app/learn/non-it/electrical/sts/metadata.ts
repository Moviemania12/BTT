import type { Metadata } from "next";
import { stsMetadata } from "@/content/sts/metadata";
import { stsContent } from "@/content/sts";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(stsMetadata);

export const articleSchema = buildArticleSchema({
  headline: stsMetadata.title,
  description: stsMetadata.seoDescription,
  authorName: stsMetadata.authorName,
  canonicalUrl: stsMetadata.canonicalUrl,
  datePublished: stsMetadata.datePublished,
  dateModified: stsMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "STS", url: stsMetadata.canonicalUrl },
]);

export const faqSchema = stsContent.faq.length > 0 ? buildFaqSchema(stsContent.faq) : null;
