import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/non-it/electrical/earthing/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { earthingMetadata } from "@/content/earthing/metadata";
import Fundamentals from "./sections/Fundamentals";
import Testing from "./sections/Testing";
import OperationsAndClosing from "./sections/OperationsAndClosing";

export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// EARTHING ARTICLE PAGE
// 39 TOC headings across 3 section files:
//   Fundamentals         — headings 1–19 (what-is-earthing → earth-enhancement-compound)
//   Testing              — headings 20–30 (earth-resistance-testing → earthing-formulas)
//   OperationsAndClosing  — headings 31–39 (common-faults → key-takeaways)
// ═══════════════════════════════════════════════════════════════════════════

export default function EarthingArticlePageHi() {
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
        structuredData={false}
        slug="earthing"
        headings={HEADINGS}
        readingTimeMinutes={earthingMetadata.readingTimeMinutes} lang="hi" alternateHref="/learn/non-it/electrical/earthing">
        <Fundamentals />
        <Testing />
        <OperationsAndClosing />
      </ArticleLayout>
    </>
  );
}
