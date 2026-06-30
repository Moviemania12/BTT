import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { upsMetadata } from "@/content/ups/metadata";
import Basics from "./sections/Basics";
import Components from "./sections/Components";
import SizingAndLoad from "./sections/SizingAndLoad";
import Battery from "./sections/Battery";
import DcBusAndDesigner from "./sections/DcBusAndDesigner";
import Operations from "./sections/Operations";
import DataCenterAndClosing from "./sections/DataCenterAndClosing";

// ─── Re-export metadata so Next.js App Router picks it up automatically ──────
// (Next.js only auto-detects `export const metadata` living directly in
// page.tsx — see the comment in ./metadata.ts for details.)
export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT — orchestrates all section components in TOC order
//
// MIGRATION NOTE (Phase 2): readingTimeMinutes now sourced from
// content/ups/metadata.ts (single source of truth) instead of a hardcoded
// literal. FAQ JSON-LD renders conditionally — content/ups/faq.ts is the
// only place FAQ text exists; this script tag is pure SEO plumbing, not a
// UI/layout change, so it does not violate the "no UI changes" constraint.
// No visible FAQ section is added here since Phase 4-7 prose content for
// that section has not been written yet — only the schema (which is
// invisible markup, not rendered UI) reads from the now-real content file.
// ═══════════════════════════════════════════════════════════════════════════

export default function UPSArticlePage() {
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

      <ArticleLayout slug="ups" headings={HEADINGS} readingTimeMinutes={upsMetadata.readingTimeMinutes}>
        <Basics />
        <Components />
        <SizingAndLoad />
        <Battery />
        <DcBusAndDesigner />
        <Operations />
        <DataCenterAndClosing />
      </ArticleLayout>
    </>
  );
}
