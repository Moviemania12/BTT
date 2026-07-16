import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Content Policy — Behind The Tech",
  description:
    "What Behind The Tech publishes, the quality standards each article must meet, and what we do not cover.",
  alternates: { canonical: "https://behindthetech.in/content-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Content Policy — Behind The Tech",
    url: "https://behindthetech.in/content-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Content Policy — Behind The Tech",
    description: "What we publish, our quality standards, and what we don't cover.",
  },
};

export default function ContentPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Editorial Standards"
      title="Content Policy"
      lastUpdated="July 2025"
    >
      <p>
        This page defines what content Behind The Tech publishes, the standards it must meet, and
        what we deliberately do not publish. It applies to all articles, tools, diagrams, and
        interactive features on the site.
      </p>

      <h2>What We Publish</h2>
      <p>Behind The Tech covers four areas:</p>
      <ul>
        <li>
          <strong>Non-IT Infrastructure</strong> — Power systems (HT/LT, UPS, batteries, gensets,
          transformers), cooling (chillers, CRAH/CRAC, cooling towers, pump rooms), fire protection,
          physical security, and earthing/lightning protection.
        </li>
        <li>
          <strong>IT Infrastructure</strong> — Servers, storage architecture, data center
          networking, virtualization, and the physical deployment of IT equipment inside a hall.
        </li>
        <li>
          <strong>AI Infrastructure</strong> — GPU clusters, high-density cooling requirements,
          ML platform infrastructure, and the operational characteristics of AI workloads.
        </li>
        <li>
          <strong>Engineering Tools</strong> — Calculators and interactive features that help
          engineers apply the concepts covered in the articles.
        </li>
      </ul>

      <h2>Quality Standards for Published Content</h2>
      <ul>
        <li>
          Every article must explain <em>how</em> something works, not just <em>what</em> it is.
          Definitions without mechanism are not published.
        </li>
        <li>
          Content must be accurate with respect to current standards (IEC, IS, ASHRAE, Uptime
          Institute). Outdated or superseded information must be clearly flagged.
        </li>
        <li>
          Claims derived from primary sources (standards, datasheets) must be traceable to those
          sources. Unverifiable claims are not published.
        </li>
        <li>
          No content that is clearly AI-generated without human expert review and editing.
        </li>
        <li>
          No keyword-stuffed, thin, or filler content. Every paragraph must provide practical value.
        </li>
      </ul>

      <h2>What We Do Not Publish</h2>
      <ul>
        <li>Opinion pieces unrelated to engineering practice</li>
        <li>Product reviews written without direct experience with the product</li>
        <li>Paid editorial content presented as independent journalism (see{" "}
          <a href="/advertising-disclosure">Advertising Disclosure</a>)
        </li>
        <li>Speculation presented as fact</li>
        <li>Content that plagiarises other publications</li>
        <li>Content that misrepresents industry standards or OEM requirements</li>
      </ul>

      <h2>User-Generated Content</h2>
      <p>
        At this time, Behind The Tech does not publish user-generated content (comments, forum posts,
        submissions). If we add this in the future, it will come with its own moderation policy.
      </p>

      <h2>Sponsored Content</h2>
      <p>
        We may publish sponsored articles in the future. Any sponsored content will be clearly labelled
        as such at the top of the page. Sponsorship does not influence our technical assessment of
        products or systems. See our{" "}
        <a href="/advertising-disclosure">Advertising Disclosure</a>.
      </p>

      <h2>Reporting Violations</h2>
      <p>
        If you believe content on this site violates these standards — factual error, plagiarism,
        misleading claim — please report it:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>. We investigate every
        report and respond within 14 days.
      </p>
    </PolicyLayout>
  );
}
