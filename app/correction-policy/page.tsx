import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Correction Policy — Behind The Tech",
  description:
    "Behind The Tech errors kaise handle karta hai — reporting process, correction timeline, aur transparency.",
  alternates: { canonical: "https://behindthetech.in/correction-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Correction Policy — Behind The Tech",
    url: "https://behindthetech.in/correction-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Correction Policy — Behind The Tech",
    description: "How we handle errors — reporting, review, and transparent updates.",
  },
};

export default function CorrectionPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Editorial Standards"
      title="Correction Policy"
      lastUpdated="July 2025"
    >
      <p>
        Engineering content must be accurate. Mistakes in a data center article are not just
        embarrassing — they could mislead an engineer who is relying on that explanation to make
        real decisions. This policy explains how we handle errors when they occur.
      </p>

      <h2>Types of Errors We Correct</h2>
      <ul>
        <li>
          <strong>Factual errors</strong> — incorrect specifications, wrong standard references,
          misidentified products, incorrect formulae in calculators.
        </li>
        <li>
          <strong>Misleading simplifications</strong> — technically true statements that create
          false impressions in context.
        </li>
        <li>
          <strong>Outdated information</strong> — content that was accurate when written but is
          no longer correct due to standard revisions or product changes.
        </li>
        <li>
          <strong>Typographical errors that change meaning</strong> — e.g., wrong units,
          transposed digits in formulae.
        </li>
      </ul>

      <h2>How to Report an Error</h2>
      <p>
        Email <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a> with:
      </p>
      <ul>
        <li>The URL of the article containing the error</li>
        <li>A description of the error and where it appears</li>
        <li>The correct information and, where possible, a source (standard, datasheet, or equivalent)</li>
      </ul>
      <p>
        You do not need to provide a source if the error is obvious, but it helps us verify quickly.
      </p>

      <h2>Our Process</h2>
      <ol>
        <li>We acknowledge every report within 5 business days.</li>
        <li>
          We investigate the claim against primary sources. If confirmed, we correct the article
          within 14 days of confirmation.
        </li>
        <li>
          For significant factual corrections, we add a note at the bottom of the article indicating
          what was corrected and when.
        </li>
        <li>
          For minor corrections (typos, unit labels), we update silently and update the
          &ldquo;last reviewed&rdquo; date.
        </li>
        <li>We credit the person who reported the error if they wish to be credited.</li>
      </ol>

      <h2>What We Do Not Consider Errors</h2>
      <ul>
        <li>
          Simplifications that are deliberate for a general audience — explained in context as
          simplified models.
        </li>
        <li>
          Regional variations in practice that differ from what we describe — data center standards
          and implementations vary by country, utility, and project type. We acknowledge this where
          relevant.
        </li>
        <li>
          Opinions or editorial judgements — e.g., our assessment that a particular practice is
          good or poor engineering.
        </li>
      </ul>

      <h2>Transparency</h2>
      <p>
        We believe corrections should be visible, not hidden. Significant corrections will be noted
        at the bottom of the affected article with the date. We do not delete or silently rewrite
        articles to remove errors without noting that a change was made.
      </p>
    </PolicyLayout>
  );
}
