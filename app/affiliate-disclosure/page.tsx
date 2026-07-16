import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — Behind The Tech",
  description:
    "Behind The Tech affiliate relationships ke baare mein full transparency — kya hai, kya nahi, aur editorial independence.",
  alternates: { canonical: "https://behindthetech.in/affiliate-disclosure" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Affiliate Disclosure — Behind The Tech",
    url: "https://behindthetech.in/affiliate-disclosure",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Affiliate Disclosure — Behind The Tech",
    description: "Full transparency on commercial relationships — currently none.",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Affiliate Disclosure"
      lastUpdated="July 2025"
    >
      <p>
        Transparency about commercial relationships is important to us, and required by the FTC
        (US), ASA (UK), and equivalent bodies in India. This page explains our current affiliate
        position clearly.
      </p>

      <h2>Current Status</h2>
      <p>
        <strong>
          Behind The Tech does not currently participate in any affiliate marketing programmes.
        </strong>
      </p>
      <p>
        We do not earn commissions from product links, book recommendations, course referrals, or
        any other purchase-based affiliate arrangement. Every product or resource mentioned on this
        site — whether it is a Schneider UPS, a Vertiv CRAC unit, or a reference standard — is
        mentioned because it is educationally relevant, not because we earn money from it.
      </p>

      <h2>If This Changes</h2>
      <p>
        If we join an affiliate programme in the future — for example, linking to technical books
        on Amazon or to training courses — we will:
      </p>
      <ul>
        <li>Update this disclosure page immediately</li>
        <li>Add a clear disclosure notice to every page that contains an affiliate link</li>
        <li>
          Ensure that affiliate relationships do not influence our editorial assessments. We will
          only recommend something we would recommend regardless of whether we earn a commission.
        </li>
      </ul>

      <h2>Product Mentions</h2>
      <p>
        Articles on this site name specific products and manufacturers for educational illustration —
        to show what real equipment looks like and how it is specified. These mentions are not
        endorsements, not paid placements, and not affiliate links. See also our{" "}
        <a href="/advertising-disclosure">Advertising Disclosure</a>.
      </p>

      <h2>Questions</h2>
      <p>
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
