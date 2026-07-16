import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Fact-Checking Policy — Behind The Tech",
  description:
    "How Behind The Tech verifies technical claims — primary sources used, what we avoid, and how we handle uncertainty.",
  alternates: { canonical: "https://behindthetech.in/fact-checking-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fact-Checking Policy — Behind The Tech",
    url: "https://behindthetech.in/fact-checking-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fact-Checking Policy — Behind The Tech",
    description: "How we verify technical claims — sources, standards, and process.",
  },
};

export default function FactCheckingPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Editorial Standards"
      title="Fact-Checking Policy"
      lastUpdated="July 2025"
    >
      <p>
        Engineering content carries a higher accuracy obligation than general publishing. If we
        incorrectly describe how a transformer protection relay works, an engineer who reads that
        article might carry that wrong model into real work. This policy describes how we verify
        technical claims before they go live.
      </p>

      <h2>Primary Sources We Rely On</h2>
      <ul>
        <li>
          <strong>Published standards</strong> — IEC 62040 (UPS), IEC 60076 (transformers),
          IEC 60364 (electrical installations), IS series (Indian Standards), ASHRAE TC 9.9
          (data center thermal guidelines), EN 50600 series (data center facilities standards),
          Uptime Institute Tier Standard.
        </li>
        <li>
          <strong>OEM technical documentation</strong> — product manuals, datasheets, application
          notes, and commissioning guides from manufacturers.
        </li>
        <li>
          <strong>Direct operational experience</strong> — the author&rsquo;s first-hand knowledge
          from data center project sites. Where a claim draws on experience rather than a published
          source, we describe it as such.
        </li>
        <li>
          <strong>Industry bodies</strong> — Uptime Institute publications, TIA-942, BICSI
          guidelines, NFPA 75/76 where relevant to the subject matter.
        </li>
      </ul>

      <h2>What We Do Not Use as Sources</h2>
      <ul>
        <li>
          Wikipedia as a primary technical reference (we may use it for general context but not for
          engineering specifications)
        </li>
        <li>Undated or unattributed web content</li>
        <li>Blog posts or articles that do not cite their own primary sources</li>
        <li>Social media claims, even from recognised professionals</li>
        <li>AI-generated content used without verification against primary sources</li>
      </ul>

      <h2>Verification Process</h2>
      <p>For each article, technical claims go through the following checks:</p>
      <ol>
        <li>
          <strong>Cross-reference with standards.</strong> Is the claim consistent with the
          applicable standard? For example, a statement about battery room ventilation requirements
          is checked against IEC 62485-3.
        </li>
        <li>
          <strong>Cross-reference with OEM documentation.</strong> Product-specific claims are
          checked against the manufacturer&rsquo;s technical materials.
        </li>
        <li>
          <strong>Sanity check from field experience.</strong> Does the claim match what we have
          seen in actual data center projects? Discrepancies between published standards and field
          practice are noted explicitly.
        </li>
        <li>
          <strong>Internal consistency.</strong> Does this article contradict other articles on
          the site? If so, which is correct?
        </li>
      </ol>

      <h2>Handling Uncertainty</h2>
      <p>
        Where we are uncertain about a specific value or claim, we say so. We use language like
        &ldquo;typically&rdquo;, &ldquo;generally&rdquo;, or &ldquo;project-specific&rdquo; to
        flag that a statement describes common practice rather than a universal rule. We do not
        present estimates as precise figures.
      </p>
      <p>
        If a topic is outside the author&rsquo;s direct experience, we describe the available
        published guidance and note where the limits of our knowledge are.
      </p>

      <h2>Dispute Resolution</h2>
      <p>
        If a reader believes a technical claim is wrong, we treat that as a correction request.
        See our <a href="/correction-policy">Correction Policy</a> for the process.
      </p>
      <p>
        Contact:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
