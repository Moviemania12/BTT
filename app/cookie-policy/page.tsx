import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Cookie Policy — Behind The Tech",
  description:
    "Which cookies behindthetech.in sets, why each is used, and how to manage or disable them.",
  alternates: { canonical: "https://behindthetech.in/cookie-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cookie Policy — Behind The Tech",
    url: "https://behindthetech.in/cookie-policy",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy — Behind The Tech",
    description: "Which cookies behindthetech.in sets and how to control them.",
  },
};

export default function CookiePolicyPage() {
  return (
    <PolicyLayout eyebrow="Legal" title="Cookie Policy" lastUpdated="29 September 2026">
      <p>
        This policy explains which cookies <strong>behindthetech.in</strong> sets, why, and how you
        can control them. A cookie is a small text file stored in your browser that helps a website
        remember information between visits.
      </p>

      <h2>Cookies We Use</h2>

      <h3>Cookies set by this site</h3>
      <p>
        Behind The Tech does not require you to sign in to read articles or use the tools, and the
        site&rsquo;s own code does not currently set cookies or use browser local storage for
        analytics, tracking or preferences. The BTT Assistant does not save your chat in your browser.
      </p>

      <h3>Analytics</h3>
      <p>
        We do not currently run a third-party analytics tool (such as Google Analytics) on this site,
        so no analytics cookies are set. We will update this policy before adding one.
      </p>

      <h3>Advertising Cookies (Google AdSense)</h3>
      <p>
        This site uses Google AdSense to show ads. Google and its advertising partners may set cookies
        or use similar identifiers to serve ads, limit how often you see an ad, measure ad performance
        and, unless you opt out, personalise ads based on your browsing across sites. The exact cookies
        are set by Google and can change; commonly seen names include those used by Google DoubleClick
        (for example <strong>IDE</strong>). See{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          how Google uses information from sites that use its services
        </a>
        .
      </p>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>
        ,{" "}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>{" "}
        or{" "}
        <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">
          Your Online Choices
        </a>
        . Opting out means you may still see ads — just not personalised ones.
      </p>

      <h3>Consent</h3>
      <p>
        Where the law requires consent for advertising cookies (for example in the European Economic
        Area, the United Kingdom and Switzerland), we rely on Google&rsquo;s own consent messaging for
        AdSense rather than a custom system. Where that message is shown, you can accept, decline or
        change your choice at any time. If we introduce any first-party cookies or local storage in the
        future, we will update this policy first.
      </p>

      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings:</p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
      </ul>
      <p>
        Blocking all cookies does not stop you from reading the site. It may limit how ads are shown
        to you.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
