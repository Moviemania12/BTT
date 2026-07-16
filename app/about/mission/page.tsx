import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about/mission`;

export const metadata: Metadata = {
  title: "Mission — Behind The Tech | Data Center Education for India",
  description:
    "Behind The Tech ka mission hai India mein Data Center professionals ki next generation tayar karna — free, practical, aur depth mein. Vision, roadmap aur knowledge philosophy.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Our Mission — Behind The Tech",
    description:
      "India ko data center professionals chahiye. Behind The Tech unhe engineer bana raha hai — bilkul free.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission — Behind The Tech",
    description: "Free, practical Data Center education for every Indian engineer.",
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
      "Data center field mein career kaise banayein",
      "Engineering concepts jo textbooks mein nahi hote",
      "Real industry terminology aur standards",
      "Portfolio projects aur learning paths",
    ],
  },
  {
    icon: "⚙️",
    title: "Engineers",
    items: [
      "Cross-domain knowledge — Power engineer cooling samjhe",
      "Tier II se Tier IV ka implementation difference",
      "OEM products aur vendor comparison",
      "Troubleshooting aur failure analysis",
    ],
  },
  {
    icon: "🏢",
    title: "Companies",
    items: [
      "New hires ko faster onboard karna",
      "Team training material jo internally share ho sake",
      "Common reference language for multi-discipline teams",
      "Free resource jo HR budget save kare",
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
    items: ["Power chain: Grid → UPS → PDU → Rack", "Cooling: Chiller → CRAH → Cold Aisle", "Fire & Safety systems", "Security & Access"],
  },
  {
    phase: "Phase 3",
    status: "Upcoming",
    statusColor: "var(--hp-text-muted)",
    title: "IT Infrastructure",
    items: ["Servers & Compute", "Storage architecture", "Data center networking", "Virtualization & hypervisors"],
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
    title: "Certification Prep & Assessments",
    items: ["CDCP preparation", "Uptime Institute concepts", "Practice quizzes", "Community learning"],
  },
];

export default function MissionPage() {
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
              Behind The Tech ek simple belief pe built hai: world-class engineering education
              kisi bhi Indian engineer ke liye accessible honi chahiye — chahe unka background,
              location ya financial status kuch bhi ho.
            </p>
          </div>
        </section>

        {/* ── Vision ── */}
        <section className="hp-section hp-section--subtle" aria-labelledby="vision-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
              <div className="hp-card hp-card--padded" style={{ borderLeft: "3px solid var(--hp-accent)", borderRadius: "var(--hp-radius-card)" }}>
                <span className="hp-eyebrow">Vision</span>
                <h2 id="vision-heading" className="hp-h2" style={{ marginBottom: "16px", marginTop: "4px" }}>
                  Ek aisa India jahan har data center engineer world-class ho
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                  India 2030 tak ek major data center hub ban raha hai. Humara vision hai ki is
                  growth ke saath ek trained, knowledgeable engineering workforce bhi ho — jo
                  globally competitive ho aur locally impactful.
                </p>
              </div>
              <div className="hp-card hp-card--padded" style={{ borderLeft: "3px solid #10b981", borderRadius: "var(--hp-radius-card)" }}>
                <span className="hp-eyebrow">Mission</span>
                <h2 className="hp-h2" style={{ marginBottom: "16px", marginTop: "4px" }}>
                  Data Center knowledge ko India mein democratize karna
                </h2>
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                  Practical, depth-first, free engineering education provide karna — Hinglish mein
                  — jo students, freshers aur working engineers sabko ek hi platform pe serve
                  kare. No paywalls. No gatekeeping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why India needs this ── */}
        <section className="hp-section" aria-labelledby="india-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">The Problem We're Solving</span>
              <h2 id="india-heading" className="hp-h2">Why India Needs Data Center Education</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                {
                  stat: "₹2.3 Lakh Cr+",
                  label: "India's data center investment pipeline by 2027",
                  context: "India ek massive data center boom se guzar raha hai lekin trained professionals ki critical shortage hai.",
                },
                {
                  stat: "1M+",
                  label: "New data center jobs projected in India by 2030",
                  context: "In jobs ke liye power, cooling, IT aur AI infrastructure — sab samajhne wale chahiye.",
                },
                {
                  stat: "0",
                  label: "Dedicated Indian Data Center education platforms",
                  context: "International platforms hain — lekin woh India-specific context, Hindi content ya local examples nahi dete.",
                },
                {
                  stat: "84+",
                  label: "Topics published on Behind The Tech — growing weekly",
                  context: "Har topic real engineering depth ke saath — sirf definitions nahi, complete implementation guide.",
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
            <h2 id="open-heading" className="hp-h2 hp-h2--spaced">Open Knowledge Philosophy</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
              Engineering knowledge kisi ke property nahi hoti. Jo kuch ek generation ne seekha,
              woh agli generation tak reach karna chahiye — bina kisi barrier ke.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
              Behind The Tech pe koi paywall nahi hoga. Koi subscription nahi. Koi premium content
              nahi. Sari articles, diagrams, calculators aur interactive tools — sabke liye, hamesha free.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
              Agar ek student Jodhpur ya Jalgaon mein baith kar wahi seekh sakta hai jo ek senior
              engineer Mumbai ke data center mein decades mein seekhta hai — tabhi yeh platform successful hai.
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
            <h2 className="hp-h2 hp-h2--spaced">Join the learning community</h2>
            <p className="hp-body">
              Is mission ka hissa bano. Padho, seekho, aur apne network mein share karo.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/learn/non-it" className="hp-btn hp-btn--primary">Start with Non-IT</Link>
              <Link href="/about/contact" className="hp-btn hp-btn--secondary">Get in Touch</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
