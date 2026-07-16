import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const SITE_URL = "https://behindthetech.in";
const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About Behind The Tech — India's Data Center Knowledge Platform",
  description:
    "Behind The Tech ek engineering education platform hai jo Data Center infrastructure ko beginner se professional level tak explain karta hai. Utility grid se server rack tak — sab kuch ek jagah.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Behind The Tech",
    description:
      "India ka pehla dedicated Data Center Knowledge Platform — Non-IT, IT aur AI Infrastructure ko depth mein explain karta hai.",
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Behind The Tech",
    description: "India's Data Center Knowledge Platform — Zero se Engineer tak.",
  },
};

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Behind The Tech",
  description:
    "Behind The Tech is India's dedicated Data Center Knowledge Platform — explaining Non-IT, IT and AI Infrastructure from first principles.",
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
    desc: "Utility grid, transformers, UPS systems, gensets, batteries — complete power chain from the grid to the server.",
  },
  {
    icon: "❄️",
    title: "Cooling Systems",
    desc: "Chillers, CRAH, cooling towers, pump rooms, free cooling — every method that keeps servers at the right temperature.",
  },
  {
    icon: "🖥️",
    title: "IT Infrastructure",
    desc: "Servers, storage, networking, virtualization, hypervisors — the technology stack inside the data hall.",
  },
  {
    icon: "🤖",
    title: "AI Infrastructure",
    desc: "GPU clusters, high-density cooling, ML platforms, and the infrastructure powering modern AI workloads.",
  },
  {
    icon: "🔥",
    title: "Fire & Safety",
    desc: "VESDA, FM200, suppression systems, evacuation — life safety systems that protect people and equipment.",
  },
  {
    icon: "🛡️",
    title: "Security & Monitoring",
    desc: "Access control, CCTV, BMS, DCIM, NOC — the systems that keep a data center secure and visible.",
  },
];

const PHILOSOPHY = [
  {
    label: "Real Language",
    body: "Hinglish mein likhte hain — Hindi aur English ka mix — kyunki yahi woh language hai jisme Indian engineers actually sochte hain. Corporate textbook language nahi.",
  },
  {
    label: "Engineer-First Depth",
    body: "Har article sirf define nahi karta — woh explain karta hai kaise kaam karta hai, kahan fail hota hai, kaise commission hota hai, aur Tier III vs Tier IV mein difference kya hota hai.",
  },
  {
    label: "No Paywalls",
    body: "Sari knowledge free hai. Ek student jo apne shehre mein koi mentor nahi dhundh sakta, woh bhi wahi seekh sake jo ek metro mein baith kar koi senior engineer se seekhta hai.",
  },
  {
    label: "Interactive Learning",
    body: "Static articles kafi nahi hote. Calculators, diagrams, interactive maps, aur quizzes — ye sab milkar learning ko sticky banate hain.",
  },
];

export default function AboutPage() {
  return (
    <>
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
              India&rsquo;s Data Center<br />Knowledge Platform
            </h1>
            <p className="hp-body">
              Behind The Tech ek engineering education platform hai jo Data Center infrastructure ko
              zero se engineer level tak explain karta hai — Hinglish mein, practical depth ke saath,
              bilkul free.
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
                  Ek platform jahan Data Centers seriously padhaate hain
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Behind The Tech 2024 mein ek simple problem solve karne ke liye banaya gaya tha:
                  India mein lakhs of engineers data centers mein kaam karte hain, lekin unhe
                  practically train karne ke liye koi dedicated platform nahi tha.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "16px" }}>
                  Engineering colleges power systems padhate hain — lekin data center ke context mein
                  nahi. Companies on-the-job training deti hain — lekin structured nahi. YouTube pe
                  videos hain — lekin depth nahi.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)" }}>
                  Yahi gap fill karta hai Behind The Tech — ek jagah jahan ek fresher bhi aur ek
                  senior engineer bhi apni knowledge grow kar sake.
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
              <h2 id="learn-heading" className="hp-h2">Kya seekh sakte ho yahan</h2>
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
              Data Center Knowledge Platform Vision
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "20px" }}>
              India 2030 tak duniya ka ek bada data center hub banne ki taraf badh raha hai. Iske liye
              lakhs of trained professionals chahiye — engineers jo not just hardware handle kar sakein
              lekin systems ko deeply samjhein.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--hp-text-secondary)", marginBottom: "32px" }}>
              Behind The Tech ka vision hai ki koi bhi student ya engineer — chahe woh Jaipur mein
              ho, Jharkhand mein ya Jammu mein — world-class data center education access kar sake.
              Bina kisi fee ke, bina kisi campus ke.
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
              Choose your track and begin your Data Center learning journey today.
            </p>
            <Link href="/learn/non-it" className="hp-btn hp-btn--primary">
              Explore Learning Tracks →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
