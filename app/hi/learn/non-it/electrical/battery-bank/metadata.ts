// Hindi (/hi) route metadata. Reuses the shared content metadata and
// overrides only the language-specific fields (description, canonical,
// hreflang, FAQ source).

import type { Metadata } from "next";
import { batteryBankMetadata } from "@/content/battery-bank/metadata";
import { batteryBankFaqHi } from "@/content/battery-bank/faq.hi";
import {
  buildPageMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schemas";

const HI_URL = "https://behindthetech.in/hi/learn/non-it/electrical/battery-bank";
const EN_URL = "https://behindthetech.in/learn/non-it/electrical/battery-bank";

const metaHi = {
  ...batteryBankMetadata,
  seoDescription:
    "Battery bank kya hota hai? VRLA vs Lithium-ion, battery sizing formula, string design, Tier III/IV architecture, room engineering calculations — complete Hinglish guide with 40 tables, 26 SVGs, 7 live calculators aur 50 interview questions.",
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
  { name: "Battery Bank", url: HI_URL },
]);

export const faqSchema = batteryBankFaqHi.length > 0 ? buildFaqSchema(batteryBankFaqHi) : null;
