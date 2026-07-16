import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement — Behind The Tech",
  description:
    "Behind The Tech targets WCAG 2.1 Level AA. This page covers current status, known limitations, and our improvement roadmap.",
  alternates: { canonical: "https://behindthetech.in/accessibility" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Accessibility Statement — Behind The Tech",
    url: "https://behindthetech.in/accessibility",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Accessibility Statement — Behind The Tech",
    description: "Our WCAG 2.1 AA commitment, current status, and improvement roadmap.",
  },
};

export default function AccessibilityPage() {
  return (
    <PolicyLayout
      eyebrow="Accessibility"
      title="Accessibility Statement"
      lastUpdated="July 2025"
    >
      <p>
        Behind The Tech is committed to making engineering education accessible to everyone —
        including users with disabilities. This statement describes our current accessibility
        status, what works well, what still needs improvement, and how to contact us if you
        encounter a barrier.
      </p>

      <h2>Our Target Standard</h2>
      <p>
        We aim to meet <strong>WCAG 2.1 Level AA</strong> — the internationally recognised
        standard for web accessibility. This covers four principles: perceivable, operable,
        understandable, and robust.
      </p>

      <h2>Current Status</h2>
      <h3>What we do well</h3>
      <ul>
        <li>All images include descriptive alt text</li>
        <li>The site uses semantic HTML5 elements (article, section, nav, main, header)</li>
        <li>Interactive controls have aria-labels and keyboard focus states</li>
        <li>Heading hierarchy is maintained throughout articles</li>
        <li>Text and background colours meet WCAG AA contrast ratios in both light and any future dark modes</li>
        <li>The site is navigable via keyboard alone</li>
        <li>
          The Interactive Data Center Map provides text descriptions of each component via the
          information panel, so the educational content is accessible without the visual map
        </li>
      </ul>

      <h3>Known limitations</h3>
      <ul>
        <li>
          <strong>Complex SVG diagrams</strong> — Technical engineering diagrams (power flow
          charts, wiring schematics) currently have basic alt text but not full text descriptions
          of all data they convey. We are adding extended descriptions progressively.
        </li>
        <li>
          <strong>Interactive tools</strong> — Some calculator tools are keyboard-accessible but
          have not been tested comprehensively with screen readers. Testing is in progress.
        </li>
        <li>
          <strong>PDF resources</strong> — If we link to PDF documents (datasheets, standards
          summaries), those PDFs are third-party documents and their accessibility varies.
        </li>
      </ul>

      <h2>Assistive Technology Testing</h2>
      <p>
        We have tested the site with keyboard-only navigation and VoiceOver (macOS). Comprehensive
        screen reader testing across NVDA, JAWS, and TalkBack is on our roadmap. We will update
        this statement as testing progresses.
      </p>

      <h2>Technical Approach</h2>
      <p>
        The site is built on Next.js with server-side rendering, which means core content is
        available in the initial HTML response — no JavaScript required to read articles. The
        interactive DC Map and calculators enhance the learning experience but are not required
        to access the textual content.
      </p>

      <h2>Feedback and Contact</h2>
      <p>
        If you encounter an accessibility barrier on this site, please tell us:
      </p>
      <ul>
        <li>Email: <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a></li>
        <li>Include the URL of the page, what you were trying to do, and what happened instead</li>
        <li>We aim to respond within 10 business days</li>
      </ul>
      <p>
        If you are not satisfied with our response, you may contact{" "}
        <a
          href="https://www.equalityhumanrights.com/en/advice-and-guidance/contact-helpline"
          target="_blank"
          rel="noopener noreferrer"
        >
          the relevant accessibility enforcement body
        </a>{" "}
        in your jurisdiction.
      </p>

      <h2>Improvements Roadmap</h2>
      <ul>
        <li>Extended text descriptions for all technical SVG diagrams — Q3 2025</li>
        <li>Screen reader testing with NVDA and JAWS — Q3 2025</li>
        <li>ARIA live regions for calculator results — Q4 2025</li>
        <li>Full WCAG 2.1 AA audit — Q1 2026</li>
      </ul>
    </PolicyLayout>
  );
}
