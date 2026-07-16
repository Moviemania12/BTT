import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about/contact`;

export const metadata: Metadata = {
  title: "Contact — Behind The Tech",
  description:
    "Behind The Tech se contact karein — collaboration, topic suggestions, issue reporting, ya business enquiries ke liye. Hum har message padhte hain.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact — Behind The Tech",
    description: "Reach out for collaborations, topic suggestions, or business enquiries.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact — Behind The Tech",
    description: "Reach out for collaborations, topic suggestions, or business enquiries.",
  },
};

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — Behind The Tech",
  url: PAGE_URL,
  publisher: {
    "@type": "Organization",
    name: "Behind The Tech",
    url: SITE_URL,
    email: "hello@behindthetech.in",
  },
};

const CHANNELS = [
  {
    icon: "✉️",
    label: "Email",
    value: "hello@behindthetech.in",
    href: "mailto:hello@behindthetech.in",
    desc: "Direct email for all enquiries",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/company/behindthetech",
    href: "https://linkedin.com/company/behindthetech",
    desc: "Professional network & updates",
  },
  {
    icon: "▶️",
    label: "YouTube",
    value: "@behindthe_tech",
    href: "https://youtube.com/@behindthe_tech",
    desc: "Video content & explanations",
  },
];

export default function ContactPage() {
  return (
    <>
      <main data-homepage-theme="light">

        <div className="hp-breadcrumb-bar">
          <div className="hp-container hp-container--medium">
            <nav aria-label="Breadcrumb">
              <ol className="hp-breadcrumb">
          <li><Link href="/" className="hp-link">Home</Link></li>
          <li aria-hidden="true" className="hp-text-muted">/</li>
          <li><Link href="/about" className="hp-link">About</Link></li>
          <li aria-hidden="true" className="hp-text-muted">/</li>
          <li className="hp-text-muted" aria-current="page">Contact</li>
              </ol>
            </nav>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }}
        />

        {/* ── Hero ── */}
        <section className="hp-section hp-section--hero">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Get In Touch</span>
            <h1 className="hp-h1">Contact Us</h1>
            <p className="hp-body">
              Collaboration, feedback, topic suggestions, ya koi bhi sawaal — hum har message
              padhte hain aur reply karte hain.
            </p>
          </div>
        </section>

        {/* ── Contact Channels + Form ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", alignItems: "start" }}>

              {/* Left: channels & enquiry types */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <span className="hp-eyebrow">Direct Channels</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                    {CHANNELS.map(({ icon, label, value, href, desc }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hp-card hp-card--padded"
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{ fontSize: "18px" }}>{icon}</span>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--hp-text-primary)" }}>{label}</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--hp-accent)", fontWeight: 600, marginBottom: "2px" }}>{value}</div>
                        <div style={{ fontSize: "12px", color: "var(--hp-text-muted)" }}>{desc}</div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="hp-eyebrow">Enquiry Types</span>
                  <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { icon: "🤝", label: "Business & Collaboration", desc: "Partnerships, sponsorships, co-creation" },
                      { icon: "💡", label: "Suggest a Topic", desc: "Koi topic chahiye jo nahi hai?" },
                      { icon: "🐛", label: "Report an Issue", desc: "Broken page, wrong info, typo" },
                      { icon: "📰", label: "Newsletter", desc: "New content alerts subscribe karna" },
                    ].map(({ icon, label, desc }) => (
                      <div key={label} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid var(--hp-border)" }}>
                        <span style={{ fontSize: "16px", flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-primary)" }}>{label}</div>
                          <div style={{ fontSize: "12px", color: "var(--hp-text-muted)" }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ── Newsletter signup ── */}
        <section className="hp-section" aria-labelledby="newsletter-heading">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Stay Updated</span>
            <h2 id="newsletter-heading" className="hp-h2 hp-h2--spaced">Newsletter</h2>
            <p className="hp-body">
              Naye articles, tools aur updates ke liye subscribe karein. Spam nahi — sirf genuine
              engineering content.
            </p>
            <p style={{ fontSize: "14px", color: "var(--hp-text-muted)", marginTop: "-16px", marginBottom: "24px" }}>
              Newsletter signup coming soon — LinkedIn follow karein updates ke liye abhi.
            </p>
            <a
              href="https://linkedin.com/company/behindthetech"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn hp-btn--primary"
            >
              Follow on LinkedIn
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
