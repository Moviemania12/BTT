import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Advertising Disclosure — Behind The Tech",
  description:
    "Behind The Tech par advertising kaise kaam karta hai — Google AdSense, editorial independence, aur sponsored content policy.",
  alternates: { canonical: "https://behindthetech.in/advertising-disclosure" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Advertising Disclosure — Behind The Tech",
    url: "https://behindthetech.in/advertising-disclosure",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Advertising Disclosure — Behind The Tech",
    description: "How Google AdSense works here and our editorial independence.",
  },
};

export default function AdvertisingDisclosurePage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Advertising Disclosure"
      lastUpdated="July 2025"
    >
      <p>
        Behind The Tech is a free platform. To cover hosting and content development costs, we
        display advertisements. This page explains exactly how advertising works on the site and
        how it is — and is not — connected to our editorial content.
      </p>

      <h2>Display Advertising</h2>
      <p>
        This site uses <strong>Google AdSense</strong> to serve display advertisements. Google
        automatically selects and displays ads based on the page content and, where permitted by
        your privacy settings, your browsing history.
      </p>
      <p>
        We do not manually choose which ads appear. We have no prior knowledge of which specific
        advertisers will appear alongside a given article. If you see an ad that seems inappropriate
        or misleading, you can report it to Google directly via the AdChoices icon on the ad itself.
      </p>

      <h2>What Advertising Does NOT Affect</h2>
      <ul>
        <li>
          <strong>Which topics we cover.</strong> We write about data center infrastructure because
          that is our area of expertise. A company advertising on the site does not get editorial
          coverage in return.
        </li>
        <li>
          <strong>How we describe products and systems.</strong> If we explain that a particular
          UPS topology has a drawback, that assessment stands regardless of who is advertising.
        </li>
        <li>
          <strong>Our technical accuracy standards.</strong> The editorial and fact-checking process
          is completely independent of the advertising layer.
        </li>
      </ul>

      <h2>Sponsored Content</h2>
      <p>
        We do not currently publish sponsored content — articles written or influenced by a paying
        partner. If we do in the future, every piece of sponsored content will be:
      </p>
      <ul>
        <li>Clearly labelled &ldquo;Sponsored&rdquo; or &ldquo;Paid Partnership&rdquo; at the top</li>
        <li>Fact-checked to our standard editorial standards before publication</li>
        <li>Distinguishable from our independent editorial content</li>
      </ul>

      <h2>Google AdSense Programme Policies</h2>
      <p>
        As a Google AdSense publisher, we comply with{" "}
        <a
          href="https://support.google.com/adsense/answer/48182"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&rsquo;s Publisher Policies
        </a>
        , which prohibit placing ads on content that is harmful, deceptive, or that violates
        copyright.
      </p>

      <h2>Ad Personalisation</h2>
      <p>
        Google AdSense may display personalised ads based on your browsing history using cookies.
        See our <a href="/cookie-policy">Cookie Policy</a> and{" "}
        <a href="/privacy-policy">Privacy Policy</a> for details on how to opt out.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about advertising:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
