import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about/mission`;

export const metadata: Metadata = {
  title: "Mission — Behind The Tech | Data Center Education",
  description:
    "Behind The Tech's mission: make world-class data center infrastructure education accessible to every engineer in India — free, practical, and built from real field experience.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Our Mission — Behind The Tech",
    description:
      "Free, depth-first data center education for engineers across India. No paywalls, no campus required.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission — Behind The Tech",
    description: "Free, practical data center education for every engineer in India.",
  },
};

const MISSION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Mission — Behind The Tech",
  description:
    "Behind The Tech's mission: making world-class data center education accessible to every engineer in India, completely free.",
  url: PAGE_URL,
  publisher: {
    "@type": "Organization",
    name: "Behind The Tech",
    url: SITE_URL,
  },
};

const AUDIENCE = [
  {
    icon: "🎓",
    title: "Students",
    items: [
      "How to build a career in the data center field",
      "Engineering concepts that textbooks rarely cover in this context",
      "Real industry terminology, standards, and practices",
      "Structured learning paths from basics to advanced systems",
    ],
  },
  {
    icon: "⚙️",
    title: "Engineers",
    items: [
      "Cross-domain knowledge — a power engineer understanding cooling systems",
      "The practical difference between Tier II, III, and IV implementations",
      "OEM product comparison and vendor-neutral technical assessment",
      "Failure analysis, troubleshooting approaches, and incident response",
    ],
  },
  {
    icon: "🏢",
    title: "Companies",
    items: [
      "A shared reference for multi-discipline project teams",
      "Onboarding material that does not need to be built from scratch",
      "Foundation knowledge that reduces dependence on informal knowledge transfer",
      "A free resource that extends the reach of internal training",
    ],
  },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    status: "Complete",
    statusColor: "var(--hp-accent)",
    title: "Foundation Articles",
    items: ["What is a Data Center", "Data Center Types", "How the Internet Works", "Cloud vs Data Center"],
  },
  {
    phase: "Phase 2",
    status: "In Progress",
    statusColor: "#f59e0b",
    title: "Non-IT Infrastructure Deep Dives",
    items: ["Power chain: Grid → UPS → PDU → Rack", "Cooling: Chiller → CRAH → Cold Aisle", "Fire detection and suppression systems", "Physical security and access control"],
  },
  {
    phase: "Phase 3",
    status: "Upcoming",
    statusColor: "var(--hp-text-muted)",
    title: "IT Infrastructure",
    items: ["Servers and compute", "Storage architecture", "Data center networking", "Virtualization and hypervisors"],
  },
  {
    phase: "Phase 4",
    status: "Planned",
    statusColor: "var(--hp-text-muted)",
    title: "AI Infrastructure",
    items: ["GPU cluster design", "High-density cooling", "ML platform infrastructure", "AI workload characteristics"],
  },
  {
    phase: "Phase 5",
    status: "Vision",
    statusColor: "var(--hp-text-muted)",
    title: "Assessments and Community",
    items: ["Topic quizzes and knowledge checks", "Certification preparation guides", "Community Q&A", "Case study library"],
  },
];

export default function MissionPage() {
  return (
    <div className="hp-page-root">
      <main data-homepage-theme="light">

        <div className="hp-breadcrumb-bar">
          <div className="hp-container hp-container--medium">
            <nav aria-label="Breadcrumb">
              <ol className="hp-breadcrumb">
                <li><Link href="/" className="hp-link">Home</Link></li>
                <li aria-hidden="true" className="hp-text-muted">/</li>
                <li><Link href="/about" className="hp-link">About</Link></li>
                <li aria-hidden="true" className="hp-text-muted">/</li>
                <li className="hp-text-muted" aria-current="page">Mission</li>
              </ol>
            </nav>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(MISSION_SCHEMA) }}
        />

        {/* ── Hero ── */}
        <section className="hp-section hp-section--hero">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Why We Exist</span>
            <h1 className="hp-h1">Mission &amp; Vision</h1>
            <p className="hp-body">
              Behind The Tech exists on one simple premise: practical engineering knowledge about
              data center infrastructure should be freely accessible to anyone who works in or
              wants to work in this field.
            </p>
          </div>
        </section>

        {/* ── Vision + Mission ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="vision-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <div className="hp-card hp-card--padded" style={{ borderLeft: "3px solid var(--hp-accent)", borderRadius: "var(--hp-radius-card)" }}>
                <span className="hp-eyebrow">Vision</span>
                <h2 id="vision-heading" className="hp-h2" style={{ marginBottom: "16px", marginTop: "4px" }}>
                  Every data center engineer in India, properly trained
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                  India is expanding its data center capacity rapidly. That growth requires a
                  large base of engineers who understand these systems at an operational level —
                  not just on paper. The vision is a generation of professionals who know what
                  they are working with, because the knowledge was available to them.
                </p>
              </div>
              <div className="hp-card hp-card--padded" style={{ borderLeft: "3px solid #10b981", borderRadius: "var(--hp-radius-card)" }}>
                <span className="hp-eyebrow">Mission</span>
                <h2 className="hp-h2" style={{ marginBottom: "16px", marginTop: "4px" }}>
                  Make data center education accessible — no barriers
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                  Publish practical, depth-first technical content that engineers can actually
                  use — written from real field experience, kept free, and structured so that
                  someone starting from zero can build to a professional level without needing
                  an expensive course or a mentor on the same project site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why India needs this ── */}
        <section className="hp-section" aria-labelledby="india-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Context</span>
              <h2 id="india-heading" className="hp-h2">Why this matters in India</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                {
                  stat: "₹2.3L Cr+",
                  label: "Data center investment pipeline in India by 2027",
                  context: "Massive infrastructure build-out is underway, but the trained professional base to support it is still catching up.",
                },
                {
                  stat: "1M+",
                  label: "Data center jobs projected in India by 2030",
                  context: "These roles require engineers who understand power, cooling, IT systems, and facility operations — not just one discipline.",
                },
                {
                  stat: "0",
                  label: "Dedicated Indian data center education platforms before this one",
                  context: "International resources exist, but they rarely address the Indian regulatory context, OEM landscape, or practical field conditions.",
                },
                {
                  stat: "84+",
                  label: "Topics published on Behind The Tech — growing weekly",
                  context: "Each article goes beyond definitions — it covers working principles, failure modes, commissioning, and real-world application.",
                },
              ].map(({ stat, label, context }) => (
                <div key={stat} className="hp-card hp-card--padded">
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "var(--hp-accent)", fontFamily: "var(--hp-font-heading)", marginBottom: "4px" }}>{stat}</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--hp-text-primary)", marginBottom: "8px" }}>{label}</div>
                  <p className="hp-card-desc" style={{ margin: 0 }}>{context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who we serve ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="audience-heading">
          <div className="hp-container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Who We Serve</span>
              <h2 id="audience-heading" className="hp-h2">Helping Students, Engineers &amp; Companies</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {AUDIENCE.map(({ icon, title, items }) => (
                <div key={title} className="hp-card hp-card--padded">
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
                  <h3 className="hp-h3" style={{ marginBottom: "14px" }}>{title}</h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {items.map((item) => (
                      <li key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--hp-accent)", flexShrink: 0, marginTop: "1px" }}>✓</span>
                        <span style={{ fontSize: "13px", color: "var(--hp-text-secondary)", lineHeight: "1.5" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Knowledge ── */}
        <section className="hp-section" aria-labelledby="open-heading">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Our Commitment</span>
            <h2 id="open-heading" className="hp-h2 hp-h2--spaced">Open Knowledge</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
              Engineering knowledge does not belong to the people who already have it. It belongs
              to the people who need it. The job of a good educator is to transfer that knowledge
              as clearly and completely as possible.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
              There will be no paywalls on this platform. No premium tiers. No subscription to
              unlock the useful parts. Every article, calculator, diagram, and tool is free — and
              will remain free.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
              The measure of success is simple: can an engineer anywhere in India use this platform
              to genuinely understand how a data center works? If yes, the mission is being met.
            </p>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="roadmap-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Content Plan</span>
              <h2 id="roadmap-heading" className="hp-h2">Long-Term Roadmap</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {ROADMAP.map((phase) => (
                <div key={phase.phase} className="hp-card hp-card--padded" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "24px", alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{phase.phase}</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: phase.statusColor, border: `1px solid ${phase.statusColor}`, borderRadius: "99px", display: "inline-block", padding: "2px 10px" }}>{phase.status}</div>
                  </div>
                  <div>
                    <h3 className="hp-h3" style={{ marginBottom: "10px" }}>{phase.title}</h3>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {phase.items.map((item) => (
                        <li key={item} style={{ fontSize: "12px", padding: "3px 10px", background: "var(--hp-bg-subtle)", borderRadius: "99px", color: "var(--hp-text-secondary)", border: "1px solid var(--hp-border)" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hp-section">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <h2 className="hp-h2 hp-h2--spaced">Start learning</h2>
            <p className="hp-body">
              Work through the learning tracks at your own pace. Everything is free and always will be.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/learn/non-it" className="hp-btn hp-btn--primary">Start with Non-IT</Link>
              <Link href="/about/contact" className="hp-btn hp-btn--secondary">Get in Touch</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
