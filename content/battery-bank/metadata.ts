// ═══════════════════════════════════════════════════════════════════════════
// content/battery-bank/metadata.ts
//
// Battery Bank article metadata — single source of truth.
// page.tsx re-exports this for Next.js; AI registry reads it directly.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleMetadata } from "@/types/engineering/content";

export const batteryBankMetadata: ArticleMetadata = {
  slug: "battery-bank",
  title: "Battery Bank in Data Centers — Complete Guide from Beginner to Engineer",
  seoTitle: "Battery Bank Explained: VRLA vs LFP, Sizing, Room Design & Tier IV Guide",
  seoDescription:
    "Battery bank kya hota hai? VRLA vs Lithium-ion, battery sizing formula, string design, Tier III/IV architecture, room engineering calculations — complete Hinglish guide with 40 tables, 26 SVGs, 7 live calculators aur 50 interview questions.",
  canonicalUrl: "https://behindthetech.in/learn/non-it/electrical/battery-bank",
  keywords: [
    "battery bank kya hai",
    "VRLA battery Data Center",
    "lithium ion LFP battery",
    "battery sizing formula",
    "battery bank design",
    "Ah calculation",
    "battery string series parallel",
    "Tier III battery architecture",
    "Tier IV 2N battery bank",
    "battery room engineering",
    "hydrogen ventilation calculation",
    "battery monitoring system BMS",
    "IEEE 485 sizing",
    "IEEE 1188 VRLA maintenance",
    "battery capacity test",
    "battery impedance test",
    "VRLA vs LFP comparison",
    "battery bank commissioning",
  ],
  authorName: "Kumar Anil",
  datePublished: "2024-11-01",
  readingTimeMinutes: 120,
};
