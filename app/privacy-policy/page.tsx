import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Behind The Tech",
  description:
    "What data Behind The Tech collects, how it is used, and your rights over that data.",
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
      lastUpdated="29 September 2026"
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
          <strong>Contact form</strong> — name, email address, enquiry type and message when you use
          the form on <a href="/about/contact">/about/contact</a>. The message is sent by email to our
          inbox through our email provider, <strong>Resend</strong>. It is not saved in a database on
          this site.
        </li>
        <li>
          <strong>BTT Employee Manager demo requests</strong> — name, company, email address, mobile
          number and employee-count range when you request a demo on the product page. We generate a
          temporary demo login, show it to you on the page and email it to you through Gmail (Google), and the
          request details are emailed to our inbox through Gmail (Google). They are not saved in a database on
          this site.
        </li>
        <li>
          <strong>Newsletter sign-ups</strong> — this site does not currently collect newsletter
          sign-ups itself. We will update this policy before adding that feature.
        </li>
      </ul>

      <h3>BTT Assistant (AI chat)</h3>
      <p>
        The BTT Assistant answers questions about the site&rsquo;s topics. When you send a message, the
        text you type, the recent messages of that conversation, and the article and section you are
        currently reading are sent to <strong>Google&rsquo;s Gemini API</strong> to generate the reply.
        Our site does not store your conversations in a database, and it does not save the chat in
        cookies or local storage. Our server briefly keeps your IP address in memory to limit abuse
        (rate limiting). Please do not type personal, confidential or sensitive information into the
        chat. Google processes this data under its own terms; see the Google Privacy Policy linked
        below.
      </p>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Server and hosting logs</strong> — like any web server, our hosting provider
          (Vercel) processes standard request information such as IP address, browser type, requested
          page and referring page, for delivering the site, security and debugging. Retention is
          controlled by the hosting provider&rsquo;s settings.
        </li>
        <li>
          <strong>Analytics</strong> — we do not currently run a third-party analytics tool (such as
          Google Analytics) on this site. If we add one, we will update this policy first.
        </li>
        <li>
          <strong>Cookies and advertising identifiers</strong> — see the section on advertising below
          and our <a href="/cookie-policy">Cookie Policy</a>.
        </li>
      </ul>

      <h2>How We Use This Information</h2>
      <ul>
        <li>To reply to contact-form messages and to process demo requests</li>
        <li>To generate answers in the BTT Assistant</li>
        <li>To keep the site secure and to detect and prevent abuse</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data. We do not share it with third parties for
        their own marketing purposes. The service providers named on this page process data only to
        provide the service described.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        This site uses <strong>Google AdSense</strong> to show ads. Google and its advertising partners
        may use cookies and similar identifiers on your device to serve and measure ads, and, unless you
        opt out, to personalise ads based on your visits to this and other websites.
      </p>
      <ul>
        <li>
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites that use its services
          </a>
        </li>
        <li>
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ad Settings
          </a>{" "}
          — manage or turn off personalised ads
        </li>
        <li>
          <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>{" "}
          and{" "}
          <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">
            Your Online Choices
          </a>{" "}
          — opt out of interest-based advertising from participating companies
        </li>
      </ul>
      <p>
        <strong>Consent.</strong> Where the law requires consent for ads and cookies (for example in the
        European Economic Area, the United Kingdom and Switzerland), we rely on Google&rsquo;s own consent
        messaging for AdSense rather than a custom system. Where that message is shown, you can accept,
        decline or change your choice, and you can always clear cookies in your browser.
      </p>

      <h2>Other Third-Party Services</h2>
      <ul>
        <li><strong>Google (Gemini API)</strong> — generates BTT Assistant replies, as described above.</li>
        <li><strong>Resend</strong> — delivers the emails produced by the contact form.</li>
        <li><strong>Google (Gmail)</strong> — delivers the emails produced by the demo-request form.</li>
        <li><strong>Vercel</strong> — hosts the site.</li>
      </ul>
      <p>
        Each service operates under its own privacy policy, for example the{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google Privacy Policy
        </a>
        . Links from this site to YouTube, LinkedIn, Instagram and other websites lead to services we
        do not control; their policies apply once you leave our site.
      </p>

      <h2>Data Retention</h2>
      <p>
        Contact-form and demo-request emails stay in our inbox for as long as they remain relevant to
        ongoing correspondence. Our site does not keep BTT Assistant conversations. Hosting
        logs and Google&rsquo;s advertising data are retained by those providers under their own policies.
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
        submitted data through our contact form or demo form, contact us and we will delete it promptly.
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
