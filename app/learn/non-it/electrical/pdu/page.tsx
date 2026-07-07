import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { pduMetadata } from "@/content/pdu/metadata";
import Foundation from "./sections/Foundation";
import OperationsAndClosing from "./sections/OperationsAndClosing";

export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// PDU + iPDU ARTICLE PAGE
// 30 TOC headings across 2 section files:
//   Foundation          — headings 1–15  (what-is-pdu → environmental-monitoring)
//   OperationsAndClosing — headings 16–30 (remote-monitoring → key-takeaways)
// ═══════════════════════════════════════════════════════════════════════════

export default function PduArticlePage() {
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
        slug="pdu"
        headings={HEADINGS}
        readingTimeMinutes={pduMetadata.readingTimeMinutes}
      >
        <Foundation />
        <OperationsAndClosing />
      </ArticleLayout>
    </>
  );
}
