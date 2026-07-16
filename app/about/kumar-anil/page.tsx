import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about/kumar-anil`;

export const metadata: Metadata = {
  title: "Kumar Anil — Founder, Behind The Tech | Data Center Infrastructure Professional",
  description:
    "Kumar Anil ek Data Center Infrastructure professional hain aur Behind The Tech ke founder hain. Data Centers, Power Systems, Cooling, aur IT Infrastructure mein extensive experience.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kumar Anil — Founder, Behind The Tech",
    description:
      "Data Center Project Manager aur Behind The Tech ke creator. Infrastructure knowledge ko accessible banana unka mission hai.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar Anil — Behind The Tech",
    description: "Data Center Infrastructure Professional & Educator",
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kumar Anil",
  jobTitle: "Data Center Infrastructure Professional",
  description:
    "Founder of Behind The Tech — India's Data Center Knowledge Platform. Experienced in data center project management, power systems, cooling infrastructure, and IT deployment.",
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
  { area: "Data Center Design & Build", detail: "End-to-end project management from civil to commissioning" },
  { area: "Power Infrastructure", detail: "HT/LT systems, UPS, gensets, transformers, battery banks" },
  { area: "Cooling Systems", detail: "Chilled water plants, CRAH/CRAC, cooling towers, AHU" },
  { area: "IT Deployment", detail: "Server racks, cabling, network infrastructure, raised floors" },
  { area: "Building Management", detail: "BMS, DCIM, NOC operations, facility monitoring" },
  { area: "Fire & Safety", detail: "Suppression systems, VESDA, access control, CCTV" },
];

const JOURNEY = [
  {
    year: "Early Career",
    title: "Getting into Data Centers",
    body: "Data Centers ek aisi industry hai jo bahut badi hai lekin iske baare mein bahut kum logon ko pata hai. Jab main is field mein aaya, mujhe realize hua ki structured learning resources — especially India ke context mein — practically exist hi nahi karte.",
  },
  {
    year: "On-Site Experience",
    title: "Learning from the Ground Up",
    body: "Project sites pe kaam karte karte ek cheez clear ho gayi: engineering concepts tab tak clear nahi hote jab tak unhe real systems ke saath connect nahi karte. Textbooks theory dete hain — sites reality deti hain.",
  },
  {
    year: "The Gap",
    title: "Why a Platform was Needed",
    body: "India mein thousands of engineers data centers mein kaam karte hain, lekin unka training mostly on-the-job hota hai — structured, documented, accessible nahi. Jo seniors jante hain woh juniors tak nahi pahunchta. Yahi gap dekhke Behind The Tech banaya.",
  },
  {
    year: "2024",
    title: "Launching Behind The Tech",
    body: "Behind The Tech launch hua ek simple goal ke saath: har wo cheez likhna jo main chahta tha koi mujhe data center career ke shuru mein samjhata. Practical, honest, Hinglish mein.",
  },
];

export default function KumarAnilPage() {
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
                aria-label="Kumar Anil profile photo placeholder"
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
                <p style={{ fontSize: "16px", color: "var(--hp-text-secondary)", margin: "0 0 16px" }}>
                  Data Center Infrastructure Professional · Project Manager · Educator
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
                  Kumar Anil ek experienced Data Center Infrastructure professional hain jinhone
                  multiple data center projects pe kaam kiya hai — design se lekar build, testing,
                  commissioning aur operations tak.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Unka practical experience power systems (HT/LT), cooling infrastructure, IT
                  deployment, BMS/DCIM, aur project management — in sab areas mein spread hai.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
                  Behind The Tech unki usi frustration ki product hai jo unhone apne career mein
                  feel ki — ki India mein data center professionals ke liye koi quality learning
                  resource nahi tha jo real-world relevant ho.
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
                    Focus Areas
                  </div>
                  {["Data Center Infrastructure", "Project Management", "Engineering Education"].map((f) => (
                    <div key={f} style={{ fontSize: "13px", color: "var(--hp-text-secondary)", padding: "4px 0" }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Expertise ── */}
        <section className="hp-section" aria-labelledby="expertise-heading">
          <div className="hp-container">
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span className="hp-eyebrow">Domain Knowledge</span>
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

        {/* ── Certifications note ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--medium">
            <div className="hp-card hp-card--padded" style={{ padding: "28px 32px" }}>
              <span className="hp-eyebrow">Certifications</span>
              <h2 className="hp-h2" style={{ marginBottom: "12px" }}>Professional Credentials</h2>
              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--hp-text-secondary)", margin: 0 }}>
                Kumar Anil ke certifications aur formal credentials ki details is section mein add ki
                jayengi. Data center industry mein relevant certifications — Uptime Institute, CDCP,
                CDCS — practical experience ke saath hi meaningful hoti hain, aur yahan sirf verified
                credentials list kiye jayenge.
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
                  {/* Timeline line */}
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

        {/* ── Articles written ── */}
        <section className="hp-section hp-section--subtle">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Content</span>
            <h2 className="hp-h2 hp-h2--spaced">Articles &amp; Learning Content</h2>
            <p className="hp-body">
              Behind The Tech pe publish hone wale saare articles Kumar Anil ke practical experience
              se draw karte hain. 84+ published topics covering Non-IT, IT aur AI infrastructure.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/learn/non-it" className="hp-btn hp-btn--primary">Browse Articles</Link>
              <Link href="/data-center-map" className="hp-btn hp-btn--secondary">Interactive DC Map</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
