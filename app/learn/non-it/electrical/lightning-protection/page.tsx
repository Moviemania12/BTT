import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { lightningProtectionMetadata } from "@/content/lightning-protection/metadata";
import Fundamentals from "./sections/Fundamentals";
import OperationsAndClosing from "./sections/OperationsAndClosing";

export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// LIGHTNING PROTECTION ARTICLE PAGE
// 25 TOC headings across 2 section files:
//   Fundamentals          — headings 1–11 (what-is-lps → dc-lightning-path)
//   OperationsAndClosing  — headings 12–25 (external-lps → key-takeaways)
// ═══════════════════════════════════════════════════════════════════════════

export default function LightningProtectionArticlePage() {
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
        slug="lightning-protection"
        headings={HEADINGS}
        readingTimeMinutes={lightningProtectionMetadata.readingTimeMinutes}
      >
        <Fundamentals />
        <OperationsAndClosing />
      </ArticleLayout>
    </>
  );
}
