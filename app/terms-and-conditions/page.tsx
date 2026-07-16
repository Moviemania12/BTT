import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions — Behind The Tech",
  description:
    "Terms governing use of behindthetech.in — permitted uses, content ownership, accuracy limits, and applicable law.",
  alternates: { canonical: "https://behindthetech.in/terms-and-conditions" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms and Conditions — Behind The Tech",
    url: "https://behindthetech.in/terms-and-conditions",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions — Behind The Tech",
    description: "Rules for using behindthetech.in and its educational content.",
  },
};

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Terms and Conditions"
      lastUpdated="July 2025"
    >
      <p>
        These Terms and Conditions govern your use of <strong>behindthetech.in</strong>. By accessing
        the site you agree to be bound by them. If you disagree with any part, do not use the site.
      </p>

      <h2>Use of This Site</h2>
      <p>
        Behind The Tech is a free educational resource. You may read, reference, and share the content
        for personal learning, classroom instruction, or internal professional development — provided
        you attribute the source.
      </p>
      <p>You may <strong>not</strong>:</p>
      <ul>
        <li>Reproduce full articles on another website without written permission</li>
        <li>Use the content to train AI models or build commercial competing products without permission</li>
        <li>Misrepresent our content as your own</li>
        <li>Attempt to access, scrape, or overload the site in ways that degrade service for others</li>
      </ul>

      <h2>Educational Content Disclaimer</h2>
      <p>
        All articles, calculators, diagrams, and interactive tools on this site are provided for
        educational purposes only. They explain engineering concepts as they are commonly understood
        and applied — but <strong>no content here should replace professional engineering judgment,
        site-specific design calculations, or vendor/OEM documentation</strong>.
      </p>
      <p>
        Data center design involves site-specific variables: utility tariffs, local codes, climate,
        load profiles, and client requirements that no general article can account for. Always verify
        calculations against applicable standards (IEC, IS, ASHRAE, Uptime Institute, etc.) and
        consult qualified engineers for actual projects.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All original text, diagrams, illustrations, and code on this site are the property of Behind
        The Tech unless otherwise stated. Product names, brand names, and trademarks mentioned in
        articles belong to their respective owners — references are for educational identification
        only and do not imply endorsement.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        We make reasonable efforts to keep technical content accurate and up to date. However, data
        center standards, product specifications, and best practices evolve. Content may not reflect
        the most recent revisions to standards. See our{" "}
        <a href="/correction-policy">Correction Policy</a> for how we handle errors.
      </p>

      <h2>External Links</h2>
      <p>
        This site links to external resources — manufacturer datasheets, standards bodies, and
        reference materials. We do not control those sites and are not responsible for their content
        or availability.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Behind The Tech accepts no liability for
        any loss or damage arising from reliance on content published here. This includes but is not
        limited to: engineering decisions made based on our articles, calculator results used in
        actual designs, or any interruption in site availability.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the site evolves. The date at the top of this page shows the
        most recent revision. Continued use of the site constitutes acceptance of the current terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes arising from use of this site
        shall be subject to the jurisdiction of courts in India.
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
