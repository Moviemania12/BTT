// ═══════════════════════════════════════════════════════════════════════════
// content/ups/metadata.ts
//
// UPS article metadata as structured data. page.tsx re-exports this for
// Next.js's metadata API; the AI registry reads it directly.
// ═══════════════════════════════════════════════════════════════════════════

import type { ArticleMetadata } from "@/types/engineering/content";

export const upsMetadata: ArticleMetadata = {
  slug: "ups",
  title: "UPS (Uninterruptible Power Supply) — Complete Guide from Beginner to Data Center Design",
  seoTitle: "UPS Explained: Working, Types, Sizing & Data Center Design Guide",
  seoDescription:
    "UPS kaise kaam karta hai? Online vs Offline vs Line Interactive, battery sizing, N+1 vs 2N redundancy, Tier III/IV design — complete Hinglish guide with 60+ diagrams, 18 calculators aur 100 FAQs.",
  canonicalUrl: "https://behindthetech.in/learn/non-it/electrical/ups",
  keywords: [
    "UPS kya hai",
    "uninterruptible power supply",
    "online UPS vs offline UPS",
    "UPS battery sizing",
    "UPS kVA calculation",
    "data center UPS",
    "N+1 redundancy",
    "2N architecture",
    "static bypass",
    "double conversion UPS",
    "UPS room design",
    "battery backup time calculation",
    "UPS vs generator",
    "Tier III UPS design",
    "static transfer switch",
    "dual bus architecture",
    "cable sizing calculator",
  ],
  authorName: "Kumar Anil",
  datePublished: "2024-10-25",
  readingTimeMinutes: 78,
};
