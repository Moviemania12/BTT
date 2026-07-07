import type { Metadata } from "next";
import { pduMetadata } from "@/content/pdu/metadata";
import { pduContent } from "@/content/pdu";
import { buildPageMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schemas";

export const metadata: Metadata = buildPageMetadata(pduMetadata);

export const articleSchema = buildArticleSchema({
  headline: pduMetadata.title,
  description: pduMetadata.seoDescription,
  authorName: pduMetadata.authorName,
  canonicalUrl: pduMetadata.canonicalUrl,
  datePublished: pduMetadata.datePublished,
  dateModified: pduMetadata.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",      url: "https://behindthetech.in" },
  { name: "Non-IT",    url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical",url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "PDU",       url: pduMetadata.canonicalUrl },
]);

export const faqSchema = pduContent.faq.length > 0 ? buildFaqSchema(pduContent.faq) : null;
