import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { batteryBankMetadata } from "@/content/battery-bank/metadata";
import Foundation from "./sections/Foundation";
import ElectricalFundamentals from "./sections/ElectricalFundamentals";

// ─── Re-export metadata so Next.js App Router picks it up automatically ───────
export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// BATTERY BANK ARTICLE PAGE — orchestrates all section components in TOC order
//
// Batch 1: Foundation + ElectricalFundamentals (Parts 1–4)
// Batch 2: DatasheetGuide + BatteryDesign (Parts 5–8)    [TODO]
// Batch 3: Calculations + BatteryRoom (Parts 9–12)       [TODO]
// Batch 4: Monitoring + Safety (Parts 13–22)             [TODO]
// Batch 5: Standards + Closing (Parts 23–25)             [TODO]
// ═══════════════════════════════════════════════════════════════════════════

export default function BatteryBankPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <ArticleLayout
        slug="battery-bank"
        headings={HEADINGS}
        readingTimeMinutes={batteryBankMetadata.readingTimeMinutes}
      >
        <Foundation />
        <ElectricalFundamentals />
      </ArticleLayout>
    </>
  );
}
