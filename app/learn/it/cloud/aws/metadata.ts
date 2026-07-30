import type { Metadata } from "next";
import { awsMetadata } from "@/content/aws/metadata";
import { awsContent } from "@/content/aws";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(awsMetadata);

export const articleSchema = buildArticleSchema({
  headline: awsMetadata.title,
  description: awsMetadata.seoDescription,
  authorName: awsMetadata.authorName,
  canonicalUrl: awsMetadata.canonicalUrl,
  datePublished: awsMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Cloud", url: "https://behindthetech.in/learn/it/cloud" },
  { name: "AWS", url: awsMetadata.canonicalUrl },
]);

export const faqSchema =
  awsContent.faq.length > 0 ? buildFaqSchema(awsContent.faq) : null;
