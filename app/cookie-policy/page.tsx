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
    <PolicyLayout eyebrow="Legal" title="Cookie Policy" lastUpdated="July 2025">
      <p>
        This policy explains which cookies <strong>behindthetech.in</strong> sets, why, and how you
        can control them. A cookie is a small text file stored in your browser that helps a website
        remember information between visits.
      </p>

      <h2>Cookies We Use</h2>

      <h3>Strictly Necessary Cookies</h3>
      <p>
        These are required for basic site functionality. Without them, features like the interactive
        DC Map or tools pages may not work correctly. They do not track you across other sites and
        cannot be turned off while still using the site.
      </p>
      <ul>
        <li>Session management cookies set by Next.js</li>
        <li>Security tokens where applicable</li>
      </ul>

      <h3>Analytics Cookies</h3>
      <p>
        We use Google Analytics to understand how readers navigate the site — which topics are most
        read, what devices they use, and where they come from. This helps us prioritise what to write
        next.
      </p>
      <ul>
        <li>
          <strong>_ga</strong> — Google Analytics main cookie. Distinguishes unique users. Expires
          after 2 years.
        </li>
        <li>
          <strong>_ga_*</strong> — Used to maintain session state. Expires after 2 years.
        </li>
      </ul>
      <p>
        Google Analytics data is anonymised where possible. IP addresses are not stored in full.
        See{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&rsquo;s Privacy Policy
        </a>{" "}
        for details.
      </p>

      <h3>Advertising Cookies</h3>
      <p>
        This site may display advertisements through Google AdSense. Google uses cookies to serve
        ads relevant to your interests based on your browsing history across sites.
      </p>
      <ul>
        <li>
          <strong>IDE</strong> — Google DoubleClick. Used to record ad interactions. Expires after
          1 year.
        </li>
        <li>
          <strong>DSID, FLC, AID, TAID</strong> — Google advertising identifiers.
        </li>
      </ul>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>{" "}
        or{" "}
        <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">
          Your Online Choices
        </a>
        . Opting out means you may still see ads — just not personalised ones.
      </p>

      <h3>Preference Cookies</h3>
      <p>
        If we add features like dark mode or reading progress tracking in the future, we may use
        local storage or cookies to remember your preferences. These never contain personal data.
        We will update this policy before introducing them.
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
        Blocking all cookies may affect how the site functions. Strictly necessary cookies cannot be
        disabled without breaking core features.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies:{" "}
        <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
