import type { Metadata } from "next";
import { sdWanMetadata } from "@/content/sd-wan/metadata";
import { sdWanContent } from "@/content/sd-wan";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(sdWanMetadata);

export const articleSchema = buildArticleSchema({
  headline: sdWanMetadata.title,
  description: sdWanMetadata.seoDescription,
  authorName: sdWanMetadata.authorName,
  canonicalUrl: sdWanMetadata.canonicalUrl,
  datePublished: sdWanMetadata.datePublished,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "IT Infrastructure", url: "https://behindthetech.in/learn/it" },
  { name: "Networking", url: "https://behindthetech.in/learn/it/networking" },
  { name: "SD-WAN", url: sdWanMetadata.canonicalUrl },
]);

export const faqSchema =
  sdWanContent.faq.length > 0 ? buildFaqSchema(sdWanContent.faq) : null;
