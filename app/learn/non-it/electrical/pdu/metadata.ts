import type { Metadata } from "next";
import { pduMetadata } from "@/content/pdu/metadata";
import { pduContent } from "@/content/pdu";
import { buildPageMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schemas";

const baseMetadata = buildPageMetadata(pduMetadata);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: pduMetadata.canonicalUrl,
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/pdu",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/pdu",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/pdu",
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "en_US" },
};

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
