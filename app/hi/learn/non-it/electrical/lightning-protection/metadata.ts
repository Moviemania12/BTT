// Hindi (/hi) route metadata. Reuses the shared content metadata and
// overrides only the language-specific fields (description, canonical,
// hreflang, FAQ source).

import type { Metadata } from "next";
import { lightningProtectionMetadata } from "@/content/lightning-protection/metadata";
import { lightningProtectionFaqHi } from "@/content/lightning-protection/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/lightning-protection";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/lightning-protection";

const metaHi = {
  ...lightningProtectionMetadata,
  seoDescription:
    "Lightning Protection System kya hota hai Data Center mein? Air termination, down conductors, SPD Type 1/2/3, IEC 62305 protection levels, aur real strike example — practical Hinglish guide for Data Center engineers.",
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
  { name: "Lightning Protection", url: HI_URL },
]);

export const faqSchema = lightningProtectionFaqHi.length > 0 ? buildFaqSchema(lightningProtectionFaqHi) : null;
