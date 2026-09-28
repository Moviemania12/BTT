// Hindi (/hi) route metadata. Reuses the shared content metadata and
// overrides only the language-specific fields (description, canonical,
// hreflang, FAQ source).

import type { Metadata } from "next";
import { earthingMetadata } from "@/content/earthing/metadata";
import { earthingFaqHi } from "@/content/earthing/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/earthing";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/earthing";

const metaHi = {
  ...earthingMetadata,
  seoDescription:
    "Data Center earthing kya hota hai? Earth pit se earth grid tak, IS 3043 standards, earth resistance testing (3-pole, clamp method), common faults aur complete O&M guide. Practical Hinglish guide for Data Center engineers.",
  canonicalUrl: HI_URL,
};

const baseMetadata = buildPageMetadata(metaHi);

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: HI_URL,
    languages: {
      en: EN_URL,
      hi: HI_URL,
      "x-default": EN_URL,
    },
  },
  openGraph: { ...baseMetadata.openGraph, locale: "hi_IN" },
};

export const articleSchema = buildArticleSchema({
  headline: metaHi.title,
  description: metaHi.seoDescription,
  authorName: metaHi.authorName,
  canonicalUrl: HI_URL,
  datePublished: metaHi.datePublished,
  dateModified: metaHi.dateModified,
});

export const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: "https://behindthetech.in" },
  { name: "Non-IT", url: "https://behindthetech.in/learn/non-it" },
  { name: "Electrical", url: "https://behindthetech.in/learn/non-it/electrical" },
  { name: "Earthing", url: HI_URL },
]);

export const faqSchema = earthingFaqHi.length > 0 ? buildFaqSchema(earthingFaqHi) : null;
