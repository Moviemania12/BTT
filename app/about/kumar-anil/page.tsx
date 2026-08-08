import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about/kumar-anil`;

export const metadata: Metadata = {
  title: "Kumar Anil — Founder, Behind The Tech | Data Center Infrastructure Professional",
  description:
    "Kumar Anil is the founder of Behind The Tech. A data center infrastructure and operations professional with 10+ years of experience across critical power, cooling, BMS, DCIM, and facility operations.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kumar Anil — Founder, Behind The Tech",
    description:
      "Data center infrastructure and operations professional with 10+ years of field experience. Founder of Behind The Tech.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar Anil — Behind The Tech",
    description: "Data Center Infrastructure & Operations Professional. Founder of Behind The Tech.",
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kumar Anil",
  jobTitle: "Data Center Infrastructure & Operations Professional",
  description:
    "Founder of Behind The Tech. 10+ years of experience in data center infrastructure, operations, and maintenance — covering critical power, cooling systems, BMS, DCIM, and facility management.",
  url: PAGE_URL,
  sameAs: [
    "https://linkedin.com/in/kumaranil",
    "https://youtube.com/@behindthe_tech",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Behind The Tech",
    url: SITE_URL,
  },
};

const EXPERTISE = [
  {
    area: "Critical Power",
    detail: "HT systems, LT switchgear, transformers, UPS, DG sets, battery banks — the full power chain from the utility connection to the IT load.",
  },
  {
    area: "Electrical Infrastructure",
    detail: "Medium voltage switching, protection relays, earthing and bonding, cable management, panel commissioning.",
  },
  {
    area: "UPS Systems",
    detail: "Double-conversion UPS design, battery sizing, maintenance bypass, parallel redundancy, and runtime testing.",
  },
  {
    area: "Diesel Generators",
    detail: "DG set commissioning, load bank testing, ATS/AMF logic, fuel systems, and planned maintenance.",
  },
  {
    area: "HT Systems",
    detail: "11kV/33kV switchgear, RMU, protection coordination, HT metering, and utility interface requirements.",
  },
  {
    area: "Cooling Systems",
    detail: "Chilled water plants, CRAH/CRAC, cooling towers, pump systems, AHU, and airflow management.",
  },
  {
    area: "Fire Protection",
    detail: "VESDA aspirating detection, FM200/Novec clean agent suppression, fire alarm panels, and suppression system commissioning.",
  },
  {
    area: "BMS & DCIM",
    detail: "Building management systems, data center infrastructure management, sensor integration, and monitoring dashboards.",
  },
  {
    area: "Facility Operations",
    detail: "Standard operating procedures, change management, shift operations, incident response, and maintenance planning.",
  },
  {
    area: "Data Center Management",
    detail: "End-to-end project delivery from design review through construction, commissioning, and handover to operations.",
  },
];

const JOURNEY = [
  {
    year: "Early Career",
    title: "Starting in Data Centers",
    body: "The data center industry is enormous — and almost invisible to people outside it. When I entered the field, I quickly realised that structured, practical learning resources were hard to find, especially in the Indian context. Most knowledge transfer happened informally, between people on the same site.",
  },
  {
    year: "Field Experience",
    title: "Learning on Live Projects",
    body: "Years of working across project sites made one thing clear: engineering concepts only become real when you connect them to actual systems. A textbook can describe how a UPS transfer works; a site teaches you what it sounds like, what the meters do, and what can go wrong.",
  },
  {
    year: "The Gap",
    title: "Why a Platform Was Needed",
    body: "India has large numbers of engineers working in data centers, but the knowledge they carry is mostly undocumented. When senior engineers leave, it walks out the door with them. Junior engineers spend years learning the same things their predecessors had to figure out alone. That gap was the reason to build something.",
  },
  {
    year: "2024",
    title: "Launching Behind The Tech",
    body: "Behind The Tech launched with one goal: to write down everything I wished someone had explained to me at the start of a data center career. Practical, honest, and free — covering systems from the utility grid to the server rack.",
  },
];

export default function KumarAnilPage() {
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
                <li className="hp-text-muted" aria-current="page">Kumar Anil</li>
              </ol>
            </nav>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />

        {/* ── Profile Hero ── */}
        <section className="hp-section hp-section--hero">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "40px", alignItems: "center" }}>
              {/* Avatar */}
              <div
                aria-label="Kumar Anil — profile photo placeholder"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "var(--hp-accent-subtle)",
                  border: "3px solid var(--hp-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "var(--hp-accent)",
                  fontFamily: "var(--hp-font-heading)",
                  flexShrink: 0,
                }}
              >
                KA
              </div>
              {/* Info */}
              <div>
                <span className="hp-eyebrow">Founder — Behind The Tech</span>
                <h1 className="hp-h1" style={{ textAlign: "left", margin: "4px 0 6px" }}>Kumar Anil</h1>
                <p style={{ fontSize: "16px", color: "var(--hp-text-secondary)", margin: "0 0 4px" }}>
                  Data Center Infrastructure &amp; Operations Professional
                </p>
                <p style={{ fontSize: "14px", color: "var(--hp-text-muted)", margin: "0 0 16px" }}>
                  10+ Years of Experience · Critical Power · Cooling · BMS · DCIM · Facility Operations
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a
                    href="https://linkedin.com/in/kumaranil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hp-btn hp-btn--secondary hp-btn--small"
                    style={{ width: "auto" }}
                  >
                    LinkedIn →
                  </a>
                  <a
                    href="https://youtube.com/@behindthe_tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hp-btn hp-btn--secondary hp-btn--small"
                    style={{ width: "auto" }}
                  >
                    YouTube →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--medium">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "48px", alignItems: "start" }}>
              <div>
                <span className="hp-eyebrow">Background</span>
                <h2 className="hp-h2 hp-h2--spaced">About Kumar Anil</h2>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Kumar Anil is a data center infrastructure and operations professional with over
                  ten years of hands-on experience. His work spans the full project lifecycle —
                  from design reviews and construction oversight through commissioning, testing, and
                  ongoing operations and maintenance.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  He has worked across critical power infrastructure (HT systems, UPS, DG sets,
                  battery banks), mechanical cooling systems (chilled water plants, CRAH, cooling
                  towers), fire protection, BMS, and DCIM — the systems that keep a data center
                  running continuously.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
                  Behind The Tech grew out of a straightforward observation: the practical knowledge
                  that data center engineers accumulate on project sites rarely gets documented in a
                  form that others can learn from. This platform is an attempt to change that.
                </p>
              </div>
              <div>
                <div className="hp-card hp-card--padded" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                    Based in
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: "8px" }}>
                    Rajasthan, India 🇮🇳
                  </div>
                  <div style={{ height: "1px", background: "var(--hp-border)", margin: "16px 0" }} />
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                    Experience
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--hp-accent)", marginBottom: "4px" }}>10+ Years</div>
                  <div style={{ fontSize: "13px", color: "var(--hp-text-secondary)" }}>
                    Data Center Infrastructure,<br />Operations &amp; Maintenance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Expertise ── */}
        <section className="hp-section" aria-labelledby="expertise-heading">
          <div className="hp-container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Technical Expertise</span>
              <h2 id="expertise-heading" className="hp-h2">Areas of Expertise</h2>
            </div>
            <ul className="hp-grid hp-grid--wide" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {EXPERTISE.map(({ area, detail }) => (
                <li key={area} className="hp-card hp-card--padded">
                  <h3 className="hp-h3">{area}</h3>
                  <p className="hp-card-desc">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Credentials note ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--medium">
            <div className="hp-card hp-card--padded" style={{ padding: "28px 32px" }}>
              <span className="hp-eyebrow">Credentials</span>
              <h2 className="hp-h2" style={{ marginBottom: "12px" }}>Professional Credentials</h2>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                Certifications and formal credentials will be listed here once verified for public
                display. The data center industry recognises certifications such as CDCP, CDCS,
                and Uptime Institute accreditations — these are meaningful when combined with
                real project experience. Only verified credentials will appear on this page.
              </p>
            </div>
          </div>
        </section>

        {/* ── Journey ── */}
        <section className="hp-section" aria-labelledby="journey-heading">
          <div className="hp-container hp-container--medium">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Story</span>
              <h2 id="journey-heading" className="hp-h2">The Journey</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {JOURNEY.map((item, i) => (
                <div key={item.year} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "24px", paddingBottom: "32px", position: "relative" }}>
                  {i < JOURNEY.length - 1 && (
                    <div style={{ position: "absolute", left: "36px", top: "32px", bottom: 0, width: "2px", background: "var(--hp-border)" }} />
                  )}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--hp-accent-subtle)",
                        border: "2px solid var(--hp-accent)",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--hp-accent)" }} />
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--hp-text-muted)", marginTop: "6px", whiteSpace: "nowrap" }}>
                      {item.year}
                    </div>
                  </div>
                  <div className="hp-card hp-card--padded">
                    <h3 className="hp-h3">{item.title}</h3>
                    <p className="hp-card-desc" style={{ margin: 0 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Content</span>
            <h2 className="hp-h2 hp-h2--spaced">Articles &amp; Learning Content</h2>
            <p className="hp-body">
              All articles on Behind The Tech draw directly from field experience across data center
              projects. Over 84 published topics covering Non-IT, IT, and AI infrastructure.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/learn/non-it" className="hp-btn hp-btn--primary">Browse Articles</Link>
              <Link href="/data-center-map" className="hp-btn hp-btn--secondary">Interactive DC Map</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
