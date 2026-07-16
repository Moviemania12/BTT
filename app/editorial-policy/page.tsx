import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Editorial Policy — Behind The Tech",
  description:
    "Behind The Tech ki editorial standards — hum content kaise research, write, review aur update karte hain.",
  alternates: { canonical: "https://behindthetech.in/editorial-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Editorial Policy — Behind The Tech",
    url: "https://behindthetech.in/editorial-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Editorial Policy — Behind The Tech",
    description: "How we research, write, and review data center engineering content.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Editorial Standards"
      title="Editorial Policy"
      lastUpdated="July 2025"
    >
      <p>
        Behind The Tech is written by a practising data center infrastructure professional. The
        editorial standards below describe how we research, write, review, and maintain the content
        on this site. Transparency about our process is part of our commitment to trustworthy
        engineering education.
      </p>

      <h2>Who Writes the Content</h2>
      <p>
        Articles on Behind The Tech are written by <a href="/about/kumar-anil">Kumar Anil</a> — a
        data center project manager with hands-on experience across power infrastructure, cooling
        systems, IT deployment, and facility commissioning.
      </p>
      <p>
        We write from direct operational experience — not from secondary summaries of other blogs.
        When we explain how a Buchholz relay works, or how to size a UPS battery bank, it comes
        from time spent on actual data center projects and from reading the primary documentation:
        IEC standards, OEM manuals, and Uptime Institute guidelines.
      </p>

      <h2>Research Standards</h2>
      <ul>
        <li>
          <strong>Primary sources first.</strong> Technical claims are grounded in published
          standards (IEC 62485, IS 1554, ASHRAE TC 9.9, Uptime Institute Tier Standard),
          manufacturer datasheets, and direct operational knowledge — not rephrased from other
          websites.
        </li>
        <li>
          <strong>No fabricated specifications.</strong> If a precise figure (e.g., exact battery
          cycle life) is not something we can verify from a primary source, we do not state it as
          fact. We indicate uncertainty or provide a range.
        </li>
        <li>
          <strong>Context over simplification.</strong> We explain not just what something is but
          why it is designed that way, what happens when it fails, and how Tier III differs from
          Tier IV in that context. Oversimplification that could mislead an engineer is
          considered an error.
        </li>
      </ul>

      <h2>Review Process</h2>
      <p>
        Each article is written, self-reviewed, and edited before publication. We check:
      </p>
      <ul>
        <li>Technical accuracy against applicable standards and datasheets</li>
        <li>Internal consistency — does the article contradict itself or other articles on the site?</li>
        <li>Clarity — can a first-year engineering student follow the explanation?</li>
        <li>Practical relevance — does the article contain actionable knowledge or only definitions?</li>
      </ul>
      <p>
        As the platform grows, we aim to add peer review from other qualified professionals. Any
        external reviewer contribution will be credited where permitted.
      </p>

      <h2>Independence</h2>
      <p>
        Editorial content is independent of any advertising relationships. An advertiser purchasing
        display space on the site has no influence over which topics we cover, how we evaluate
        products, or how we describe technical systems.
      </p>
      <p>
        When we mention a product by name — Schneider Galaxy, Vertiv Liebert, Cummins C2000D — it is
        for educational illustration, not because of any commercial relationship. See our{" "}
        <a href="/advertising-disclosure">Advertising Disclosure</a> and{" "}
        <a href="/affiliate-disclosure">Affiliate Disclosure</a> for full details.
      </p>

      <h2>Updates and Corrections</h2>
      <p>
        Data center technology moves. When standards change, products are discontinued, or a reader
        identifies an error, we update the relevant article. See our{" "}
        <a href="/correction-policy">Correction Policy</a> for how updates are handled and flagged.
      </p>

      <h2>Language</h2>
      <p>
        We write in Hinglish — a natural mix of Hindi and English used daily by Indian engineering
        professionals. This is a deliberate editorial choice: the goal is to make complex concepts
        accessible without dumbing them down. Engineering terminology that has no good Hindi
        equivalent is used in English; context and explanation are in the language that Indian
        engineers actually think in.
      </p>

      <h2>Feedback</h2>
      <p>
        If you believe an article contains a technical inaccuracy, please reach out:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>. We take accuracy
        seriously and will investigate every report.
      </p>
    </PolicyLayout>
  );
}
