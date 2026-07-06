import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { stsMetadata } from "@/content/sts/metadata";
import Foundation from "./sections/Foundation";
import OperationsAndClosing from "./sections/OperationsAndClosing";

// ─── Re-export metadata so Next.js App Router picks it up automatically ───────
export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// STS ARTICLE PAGE — Static Transfer Switch
//
// 27 TOC headings across 2 section files:
//   Foundation          — headings 1–15  (what-is-sts → ab-power-distribution)
//   OperationsAndClosing — headings 16–27 (maintenance-bypass → key-takeaways)
// ═══════════════════════════════════════════════════════════════════════════

export default function StsArticlePage() {
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
        slug="sts"
        headings={HEADINGS}
        readingTimeMinutes={stsMetadata.readingTimeMinutes}
      >
        <Foundation />
        <OperationsAndClosing />
      </ArticleLayout>
    </>
  );
}
