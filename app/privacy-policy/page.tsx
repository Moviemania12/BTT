import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Behind The Tech",
  description:
    "Behind The Tech ki Privacy Policy — hum kya data collect karte hain, kaise use karte hain, aur aapke rights kya hain.",
  alternates: { canonical: "https://behindthetech.in/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy — Behind The Tech",
    url: "https://behindthetech.in/privacy-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — Behind The Tech",
    description: "What data we collect, how we use it, and your rights.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 2025"
    >
      <p>
        Behind The Tech (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a free educational
        platform focused on Data Center infrastructure education. This policy explains what information
        we collect when you visit <strong>behindthetech.in</strong>, how we use it, and your rights
        over that data.
      </p>
      <p>
        We built this platform to share engineering knowledge — not to sell your data. Read this policy
        to understand exactly what happens when you use the site.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information you give us directly</h3>
      <ul>
        <li>
          <strong>Contact form submissions</strong> — name, email address, and message content when you
          use the contact form on <em>/about/contact</em>. This goes directly to our email inbox and
          is not stored in a database.
        </li>
        <li>
          <strong>Newsletter sign-ups</strong> — email address only, if and when we add a newsletter
          subscription feature. We will update this policy before activating that feature.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage analytics</strong> — We use analytics tools (such as Google Analytics) to
          understand how pages are read: which articles are most useful, where readers drop off, and
          what devices they use. This data is aggregated and does not identify individual users.
        </li>
        <li>
          <strong>Log data</strong> — Like any web server, ours logs standard request information:
          IP address, browser type, referring page, and pages visited. Logs are retained for a limited
          period for security and debugging purposes.
        </li>
        <li>
          <strong>Cookies</strong> — See our{" "}
          <a href="/cookie-policy">Cookie Policy</a> for a full breakdown of the cookies this site
          sets and why.
        </li>
      </ul>

      <h2>How We Use This Information</h2>
      <ul>
        <li>To respond to contact form messages</li>
        <li>To improve article quality and site navigation based on usage patterns</li>
        <li>To detect and prevent abuse or security issues</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data. We do not share it with third parties
        for their marketing purposes.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        This site may use third-party services including Google Analytics, Google AdSense, and YouTube
        embeds. Each service operates under its own privacy policy:
      </p>
      <ul>
        <li>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
        </li>
      </ul>
      <p>
        Google AdSense may display personalised advertisements based on your browsing history using
        cookies. You can opt out via{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>
        .
      </p>

      <h2>Data Retention</h2>
      <p>
        Contact form emails are retained in our inbox for as long as they remain relevant to ongoing
        correspondence. Analytics data is retained per the default retention period of the analytics
        provider (typically 26 months for Google Analytics). Server logs are typically purged after
        90 days.
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict
        processing of your personal data. To exercise any of these rights, contact us at{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>. We will respond within
        30 days.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for engineering students, professionals, and technically curious adults.
        We do not knowingly collect personal data from children under 13. If you believe a child has
        submitted data through our contact form, contact us and we will delete it promptly.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We will update this page when our data practices change. The &ldquo;last updated&rdquo; date
        at the top reflects the most recent revision. Continued use of the site after a policy change
        constitutes acceptance of the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
