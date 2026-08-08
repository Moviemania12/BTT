import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About Behind The Tech — Data Center Knowledge Platform",
  description:
    "Behind The Tech is a free engineering education platform covering data center infrastructure — power, cooling, IT, and AI systems — built by a practising data center professional.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Behind The Tech",
    description:
      "Free, depth-first data center education covering Non-IT, IT, and AI Infrastructure — built for engineers, by an engineer.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Behind The Tech",
    description: "Free, depth-first data center education — built for engineers, by an engineer.",
  },
};

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Behind The Tech",
  description:
    "Behind The Tech is a free data center knowledge platform covering Non-IT, IT, and AI Infrastructure — written from hands-on field experience.",
  url: PAGE_URL,
  publisher: {
    "@type": "Organization",
    name: "Behind The Tech",
    url: SITE_URL,
    founder: { "@type": "Person", name: "Kumar Anil" },
  },
};

const PILLARS = [
  {
    icon: "⚡",
    title: "Power Infrastructure",
    desc: "Utility grid, transformers, UPS systems, gensets, battery banks — the complete power chain from the grid to the server rack.",
  },
  {
    icon: "❄️",
    title: "Cooling Systems",
    desc: "Chillers, CRAH, CRAC, cooling towers, pump rooms, free cooling — every method used to keep IT equipment within operating temperature.",
  },
  {
    icon: "🖥️",
    title: "IT Infrastructure",
    desc: "Servers, storage, networking, virtualization, and hypervisors — the technology stack that runs inside the data hall.",
  },
  {
    icon: "🤖",
    title: "AI Infrastructure",
    desc: "GPU clusters, high-density cooling, ML platform infrastructure, and the operational characteristics of AI workloads.",
  },
  {
    icon: "🔥",
    title: "Fire & Safety",
    desc: "VESDA, FM200, clean agent suppression, emergency procedures — the life safety systems that protect both people and equipment.",
  },
  {
    icon: "🛡️",
    title: "Security & Monitoring",
    desc: "Access control, CCTV, BMS, DCIM, NOC operations — the systems that keep a facility secure and operationally visible.",
  },
];

const PHILOSOPHY = [
  {
    label: "Plain English First",
    body: "Technical topics are explained in clear, direct language. No jargon without explanation, no padding, no generic marketing copy. Educational articles are written in Hinglish — the natural language Indian engineers think in — while all site pages use plain English.",
  },
  {
    label: "Mechanism Over Definition",
    body: "Every article explains how something works, not just what it is. That includes failure modes, commissioning steps, and the difference between how a system behaves in a Tier III versus a Tier IV design.",
  },
  {
    label: "No Paywalls",
    body: "Everything on this platform is free. A junior engineer in a tier-2 city should have access to the same quality of technical explanation as someone mentored by a senior in a metropolitan data center.",
  },
  {
    label: "Interactive Learning",
    body: "Static text only goes so far. Calculators, diagrams, the interactive DC Map, and hands-on tools make concepts easier to retain and apply.",
  },
];

export default function AboutPage() {
  return (
    <div className="hp-page-root">
      <main data-homepage-theme="light">

        <div className="hp-breadcrumb-bar">
          <div className="hp-container hp-container--medium">
            <nav aria-label="Breadcrumb">
              <ol className="hp-breadcrumb">
                <li><Link href="/" className="hp-link">Home</Link></li>
                <li aria-hidden="true" className="hp-text-muted">/</li>
                <li className="hp-text-muted" aria-current="page">About</li>
              </ol>
            </nav>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
        />

        {/* ── Hero ── */}
        <section className="hp-section hp-section--hero">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">About the Platform</span>
            <h1 className="hp-h1">
              Data Center Knowledge,<br />Taught Properly
            </h1>
            <p className="hp-body">
              Behind The Tech is a free engineering education platform covering data center
              infrastructure from first principles — power, cooling, IT, and AI systems, explained
              with the depth that working engineers actually need.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/learn/non-it" className="hp-btn hp-btn--primary">
                Start Learning
              </Link>
              <Link href="/data-center-map" className="hp-btn hp-btn--secondary">
                Explore the Map
              </Link>
            </div>
          </div>
        </section>

        {/* ── What is BTT ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="what-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
              <div>
                <span className="hp-eyebrow">What is Behind The Tech</span>
                <h2 id="what-heading" className="hp-h2 hp-h2--spaced">
                  A platform that takes data centers seriously
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Behind The Tech was built to solve a specific problem: India has tens of thousands
                  of engineers working in data centers, but almost no structured, accessible resource
                  to help them understand what they are actually working with.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Engineering colleges teach power systems — but not in a data center context.
                  Companies provide on-the-job training — but it is rarely documented or transferable.
                  YouTube has overviews — but not the operational depth a working engineer needs.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
                  This platform fills that gap: one place where a fresher and a senior engineer can
                  both find something genuinely useful.
                </p>
              </div>
              <div>
                <ul className="hp-grid" style={{ gridTemplateColumns: "1fr" }}>
                  {[
                    { n: "84+", l: "Published Topics" },
                    { n: "4", l: "Learning Tracks" },
                    { n: "46", l: "Interactive Map Components" },
                    { n: "0", l: "Paywalls — Everything Free" },
                  ].map(({ n, l }) => (
                    <li key={l} className="hp-card hp-card--padded" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--hp-accent)", fontFamily: "var(--hp-font-heading)", minWidth: "56px" }}>{n}</span>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--hp-text-primary)" }}>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── What you can learn ── */}
        <section className="hp-section" aria-labelledby="learn-heading">
          <div className="hp-container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Curriculum</span>
              <h2 id="learn-heading" className="hp-h2">What you can learn here</h2>
            </div>
            <ul className="hp-grid hp-grid--wide" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {PILLARS.map((p) => (
                <li key={p.title} className="hp-card hp-card--padded">
                  <div className="hp-card-icon" style={{ fontSize: "24px", marginBottom: "12px" }}>{p.icon}</div>
                  <h3 className="hp-h3">{p.title}</h3>
                  <p className="hp-card-desc">{p.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Learning Philosophy ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="philosophy-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">How We Teach</span>
              <h2 id="philosophy-heading" className="hp-h2">Learning Philosophy</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {PHILOSOPHY.map((item) => (
                <div key={item.label} className="hp-card hp-card--padded">
                  <h3 className="hp-h3" style={{ marginBottom: "8px" }}>{item.label}</h3>
                  <p className="hp-card-desc" style={{ margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision ── */}
        <section className="hp-section" aria-labelledby="vision-heading">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">The Bigger Picture</span>
            <h2 id="vision-heading" className="hp-h2 hp-h2--spaced">
              Why this platform exists
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "20px" }}>
              India is building out data center capacity at a rate that outpaces the supply of
              well-trained infrastructure professionals. The gap is not technical talent — it is
              access to structured, practical knowledge.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "32px" }}>
              An engineer in Jaipur, Jharkhand, or Jammu should have the same access to data center
              education as someone being mentored on a project site in Mumbai or Bangalore. That is
              what this platform is for — no fees, no campus required.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/about/mission" className="hp-btn hp-btn--primary">
                Read Our Mission
              </Link>
              <Link href="/about/kumar-anil" className="hp-btn hp-btn--secondary">
                Meet the Founder
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hp-section hp-section--subtle" aria-label="Start Learning">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <h2 className="hp-h2 hp-h2--spaced">Ready to start?</h2>
            <p className="hp-body">
              Pick a learning track and work through it at your own pace. Everything is free.
            </p>
            <Link href="/learn/non-it" className="hp-btn hp-btn--primary">
              Explore Learning Tracks →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
