import type { Metadata } from "next";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";
import RequestJourneyDiagram from "@/components/diagrams/RequestJourneyDiagram";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What is a Data Center? — Behind The Tech",
  description:
    "Data Center kya hota hai? Har click ke peeche chhupa digital powerhouse. Servers, power, cooling aur networking — sab kuch simple Hinglish mein samjho.",
  keywords: [
    "data center kya hota hai",
    "what is a data center",
    "data center in hindi",
    "data center explained",
    "data center basics",
    "server room",
    "internet infrastructure",
    "behind the tech",
  ],
  openGraph: {
    title: "What is a Data Center? Har Click Ke Peeche Chhupa Digital Powerhouse",
    description:
      "Data Center kya hota hai? Servers, UPS, cooling aur networking — sab kuch simple Hinglish mein samjho.",
    url: "https://behindthetech.in/learn/what-is-a-data-center",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-11-01",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Data Center? — Behind The Tech",
    description: "Data Center kya hota hai? Simple Hinglish mein samjho.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/what-is-a-data-center",
  },
};

// ─── TOC headings ─────────────────────────────────────────────────────────────
// Manually derived from the article structure below.
// IDs must exactly match the id props on heading elements.

const HEADINGS: ArticleHeading[] = [
  { id: "quick-overview",        text: "Quick Overview",                    level: 2 },
  { id: "real-life-example",     text: "Ek Real-Life Example",             level: 2 },
  { id: "request-journey",       text: "Request Journey",                  level: 3 },
  { id: "response-journey",      text: "Response Journey",                 level: 3 },
  { id: "dc-kya-hota-hai",       text: "Data Center Kya Hota Hai?",        level: 2 },
  { id: "zarurat-kyu",           text: "Data Center Ki Zarurat Kyu?",      level: 2 },
  { id: "main-components",       text: "Data Center Ke Main Components",   level: 2 },
  { id: "it-infrastructure",     text: "IT Infrastructure",                level: 3 },
  { id: "non-it-infrastructure", text: "Non-IT Infrastructure",            level: 2 },
  { id: "power-chali-jaye",      text: "Agar Power Chali Jaye To?",        level: 2 },
  { id: "cooling-important",     text: "Cooling Itni Important Kyu Hai?",  level: 2 },
  { id: "ai-zamane-mein",        text: "AI Ke Zamane Me Data Centers",     level: 2 },
  { id: "did-you-know",          text: "Did You Know?",                    level: 2 },
  { id: "key-takeaways",         text: "Key Takeaways",                    level: 2 },
];

// ─── Shared inline styles ─────────────────────────────────────────────────────

const S = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.15,
    marginTop: 44,
    marginBottom: 16,
  } as React.CSSProperties,

  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.2,
    marginTop: 36,
    marginBottom: 14,
  } as React.CSSProperties,

  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#111827",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 8,
  } as React.CSSProperties,

  p: {
    marginBottom: 16,
    color: "#1f2937",
  } as React.CSSProperties,

  blockquote: {
    margin: "24px 0",
    padding: "16px 20px",
    borderLeft: "3px solid #2563EB",
    background: "rgba(37,99,235,0.04)",
    borderRadius: "0 8px 8px 0",
    fontStyle: "italic",
    color: "#1f2937",
  } as React.CSSProperties,

  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,

  li: {
    color: "#1f2937",
    lineHeight: 1.65,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: "1px solid rgba(37,99,235,0.08)",
    margin: "32px 0",
  } as React.CSSProperties,

  check: {
    color: "#2563EB",
    marginRight: 6,
  } as React.CSSProperties,

  cross: {
    color: "#DC2626",
    marginRight: 6,
  } as React.CSSProperties,

  learnMore: {
    margin: "10px 0 4px",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  // ── Premium card system (inline, local to this file only) ──

  cardWrap: {
    position: "relative" as const,
    borderRadius: 10,
    overflow: "hidden" as const,
    margin: "28px 0",
  } as React.CSSProperties,

  cardAccentCyan: {
    height: 2,
    background: "#2563EB",
    boxShadow: "0 0 8px rgba(0,255,204,0.5)",
  } as React.CSSProperties,

  cardAccentBlue: {
    height: 2,
    background: "#2563EB",
  } as React.CSSProperties,

  cardAccentRed: {
    height: 2,
    background: "#DC2626",
    boxShadow: "0 0 8px rgba(255,34,68,0.5)",
  } as React.CSSProperties,

  cardBodyDefinition: {
    background: "rgba(0,255,204,0.035)",
    border: "1px solid rgba(0,255,204,0.16)",
    borderTop: "none",
    padding: "18px 22px 20px",
  } as React.CSSProperties,

  cardBodyInsight: {
    background: "rgba(37,99,235,0.035)",
    border: "1px solid rgba(37,99,235,0.16)",
    borderTop: "none",
    padding: "18px 22px 20px",
  } as React.CSSProperties,

  cardBodyWarning: {
    background: "rgba(255,34,68,0.035)",
    border: "1px solid rgba(255,34,68,0.16)",
    borderTop: "none",
    padding: "18px 22px 20px",
  } as React.CSSProperties,

  cardLabel: {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.22em",
    fontWeight: 600,
    marginBottom: 10,
  } as React.CSSProperties,

  cardContent: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#1f2937",
  } as React.CSSProperties,

  featureGrid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
    margin: "24px 0",
  } as React.CSSProperties,

  featureGrid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 14,
    margin: "24px 0",
  } as React.CSSProperties,

  featureCard: {
    position: "relative" as const,
    borderRadius: 10,
    background: "rgba(37,99,235,0.03)",
    border: "1px solid rgba(37,99,235,0.12)",
    overflow: "hidden" as const,
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,

  featureCardAccent: {
    height: 2,
    background: "#2563EB",
    opacity: 0.5,
  } as React.CSSProperties,

  featureCardBody: {
    padding: "20px 20px 18px",
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,

  featureCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  } as React.CSSProperties,

  featureCardIcon: {
    fontSize: 20,
    lineHeight: 1,
  } as React.CSSProperties,

  featureCardTitle: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    fontWeight: 600,
    color: "#1f2937",
    margin: 0,
  } as React.CSSProperties,

  featureCardText: {
    fontFamily: "var(--font-body)",
    fontSize: 13.5,
    lineHeight: 1.65,
    color: "#1f2937",
    flex: 1,
  } as React.CSSProperties,

  featureCardLearnMore: {
    marginTop: 14,
  } as React.CSSProperties,

  timelineWrap: {
    margin: "24px 0",
    borderRadius: 10,
    background: "rgba(37,99,235,0.025)",
    border: "1px solid rgba(37,99,235,0.10)",
    padding: "20px 22px",
  } as React.CSSProperties,

  timelineRow: {
    display: "flex",
    gap: 14,
    position: "relative" as const,
  } as React.CSSProperties,

  timelineIconCol: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    width: 32,
    flexShrink: 0,
  } as React.CSSProperties,

  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "rgba(37,99,235,0.08)",
    border: "1px solid rgba(37,99,235,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    flexShrink: 0,
  } as React.CSSProperties,

  timelineLine: {
    width: 1.5,
    flex: 1,
    minHeight: 22,
    background: "rgba(37,99,235,0.2)",
    marginTop: 2,
  } as React.CSSProperties,

  timelineText: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "#1f2937",
    lineHeight: 1.5,
  } as React.CSSProperties,

  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(37,99,235,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,

  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, #2563EB, #2563EB)",
  } as React.CSSProperties,

  takeawayBody: {
    padding: "22px 24px 24px",
  } as React.CSSProperties,

  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "#2563EB",
    fontWeight: 600,
    marginBottom: 16,
  } as React.CSSProperties,

  takeawayList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  } as React.CSSProperties,

  takeawayItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  } as React.CSSProperties,

  takeawayCheck: {
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 4,
    background: "rgba(0,255,204,0.12)",
    border: "1px solid rgba(0,255,204,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  } as React.CSSProperties,

  takeawayText: {
    fontFamily: "var(--font-body)",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "#1f2937",
  } as React.CSSProperties,
} as const;

// ─── Local helper components (inline, this file only — no new files, no new deps) ──

function DefinitionCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.cardWrap}>
      <div style={S.cardAccentCyan} />
      <div style={S.cardBodyDefinition}>
        <span style={{ ...S.cardLabel, color: "#2563EB" }}>DEFINITION</span>
        <div style={S.cardContent}>{children}</div>
      </div>
    </div>
  );
}

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.cardWrap}>
      <div style={S.cardAccentBlue} />
      <div style={S.cardBodyInsight}>
        <span style={{ ...S.cardLabel, color: "#2563EB" }}>INSIGHT</span>
        <div style={S.cardContent}>{children}</div>
      </div>
    </div>
  );
}

function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.cardWrap}>
      <div style={S.cardAccentRed} />
      <div style={S.cardBodyWarning}>
        <span style={{ ...S.cardLabel, color: "#DC2626" }}>NOTE</span>
        <div style={S.cardContent}>{children}</div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  learnMoreSlug,
  learnMoreLabel,
  children,
}: {
  icon: string;
  title: string;
  learnMoreSlug: string;
  learnMoreLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div style={S.featureCard}>
      <div style={S.featureCardAccent} />
      <div style={S.featureCardBody}>
        <div style={S.featureCardHeader}>
          <span style={S.featureCardIcon}>{icon}</span>
          <h3 style={S.featureCardTitle}>{title}</h3>
        </div>
        <div style={S.featureCardText}>{children}</div>
        <div style={S.featureCardLearnMore}>
          <TopicLink slug={learnMoreSlug} label={learnMoreLabel} variant="inline" />
        </div>
      </div>
    </div>
  );
}

function JourneyTimeline({ steps }: { steps: { emoji: string; text: string }[] }) {
  return (
    <div style={S.timelineWrap}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={i} style={S.timelineRow}>
              <div style={S.timelineIconCol}>
                <div style={S.timelineIcon}>{step.emoji}</div>
                {!isLast && <div style={S.timelineLine} />}
              </div>
              <div style={{ paddingTop: 6, paddingBottom: isLast ? 0 : 22 }}>
                <span style={S.timelineText}>{step.text}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={S.takeawayCard}>
      <div style={S.takeawayAccent} />
      <div style={S.takeawayBody}>
        <span style={S.takeawayLabel}>KEY TAKEAWAYS</span>
        <ul style={S.takeawayList}>
          {items.map((item, i) => (
            <li key={i} style={S.takeawayItem}>
              <span style={S.takeawayCheck}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={S.takeawayText}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IntroLead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        margin: "8px 0 28px",
        paddingLeft: 20,
        borderLeft: "2px solid #2563EB",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
          letterSpacing: "0.01em",
          lineHeight: 1.5,
          color: "#1f2937",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AppGrid({ items }: { items: { icon: string; label: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 10,
        margin: "20px 0 24px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            borderRadius: 8,
            background: "rgba(37,99,235,0.035)",
            border: "1px solid rgba(37,99,235,0.12)",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13.5,
              color: "#1f2937",
              lineHeight: 1.4,
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatIsADataCenterPage() {
  return (
    <ArticlePage
      slug="what-is-a-data-center"
      prevSlug={undefined}
      nextSlug="data-center-types"
      relatedSlugs={[
        "how-the-internet-works",
        "cloud-vs-data-center",
        "server-basics",
        "nas",
        "switch",
        "ups",
        "battery-bank",
        "dg-set",
        "pac",
        "bms",
        "dcim",
        "ai-infrastructure-basics",
      ]}
      headings={HEADINGS}
      readingTimeMinutes={7}
    >

      {/* ── Quick Overview ── */}
      <h2 id="quick-overview" style={S.h2}>Quick Overview</h2>

      <IntroLead>
        Aap roz Data Centers use karte ho. Haan, roz.
      </IntroLead>

      <p style={S.p}>Jab aap:</p>

      <AppGrid
        items={[
          { icon: "📺", label: "YouTube par video dekhte ho" },
          { icon: "🔍", label: "Google par search karte ho" },
          { icon: "📷", label: "Instagram scroll karte ho" },
          { icon: "💬", label: "WhatsApp par message bhejte ho" },
          { icon: "💳", label: "UPI payment karte ho" },
          { icon: "🤖", label: "ChatGPT use karte ho" },
        ]}
      />

      <p style={S.p}>tab aap directly ya indirectly kisi na kisi Data Center se connect hote ho.</p>
      <p style={S.p}>Simple words me:</p>

      <DefinitionCard>
        <strong>Data Center ek specially designed facility hoti hai jahan digital services ko run karne ke liye servers, storage, networking, power aur cooling systems install kiye jaate hain.</strong>
      </DefinitionCard>

      <p style={S.p}>Agar Data Centers na hote to Internet jaisa hum aaj use karte hain, waise exist hi nahi karta.</p>

      <hr style={S.divider} />

      {/* ── Real-Life Example ── */}
      <h2 id="real-life-example" style={S.h1}>Ek Real-Life Example</h2>

      <p style={S.p}>Maan lo aap YouTube open karke "How Data Centers Work" search karte ho.</p>
      <p style={S.p}>Aapko lagta hai ki video bas YouTube se aa gaya.</p>
      <p style={S.p}>Reality me background me poori digital journey chal rahi hoti hai.</p>

      <h2 id="request-journey" style={S.h2}>Request Journey</h2>

      <RequestJourneyDiagram />

      <JourneyTimeline
        steps={[
          { emoji: "📱", text: "You Open YouTube" },
          { emoji: "📡", text: "Request Aapke ISP Tak Jaati Hai (Jio, Airtel, BSNL, etc.)" },
          { emoji: "🌐", text: "Internet Ke Through Travel Karti Hai" },
          { emoji: "🏢", text: "YouTube Data Center Tak Pahunchti Hai" },
          { emoji: "🛡️", text: "Security Systems Request Verify Karte Hain" },
          { emoji: "⚖️", text: "Load Balancer Best Available Server Select Karta Hai" },
          { emoji: "🖥️", text: "Server Request Process Karta Hai" },
          { emoji: "💾", text: "Storage System Video File Locate Karta Hai" },
          { emoji: "📦", text: "Video Data Prepare Hota Hai" },
        ]}
      />

      <hr style={S.divider} />

      <h2 id="response-journey" style={S.h2}>Response Journey</h2>

      <JourneyTimeline
        steps={[
          { emoji: "📦", text: "Video Data" },
          { emoji: "🖥️", text: "Server" },
          { emoji: "⚖️", text: "Load Balancer" },
          { emoji: "🌐", text: "Internet" },
          { emoji: "📡", text: "ISP Network" },
          { emoji: "📱", text: "Aapka Mobile" },
          { emoji: "▶️", text: "Video Start Ho Jaati Hai" },
        ]}
      />

      <p style={S.p}>Ye poora process milliseconds me complete ho jata hai.</p>
      <p style={S.p}>Jab tak aap blink karte ho, tab tak hazaron hardware components aur software systems milkar kaam kar chuke hote hain.</p>

      <hr style={S.divider} />

      {/* ── Data Center Kya Hota Hai ── */}
      <h2 id="dc-kya-hota-hai" style={S.h1}>Data Center Kya Hota Hai?</h2>

      <p style={S.p}>Data Center ko samajhne ka sabse simple tareeka hai:</p>
      <p style={S.p}>Socho ek giant digital factory.</p>
      <p style={S.p}>Jaise manufacturing factory products banati hai, waise hi Data Center digital services deliver karta hai.</p>
      <p style={S.p}>Andar thousands of devices continuously kaam kar rahe hote hain.</p>
      <p style={S.p}>Kuch data store kar rahe hote hain.</p>
      <p style={S.p}>Kuch requests process kar rahe hote hain.</p>
      <p style={S.p}>Kuch network traffic handle kar rahe hote hain.</p>
      <p style={S.p}>Aur kuch ensure kar rahe hote hain ki system kabhi band na ho.</p>
      <p style={S.p}>Isi wajah se Data Centers ko aksar:</p>

      <InsightCard>
        <strong>"Backbone of the Internet"</strong>
      </InsightCard>

      <p style={S.p}>bhi kaha jata hai.</p>

      <hr style={S.divider} />

      {/* ── Zarurat ── */}
      <h2 id="zarurat-kyu" style={S.h1}>Data Center Ki Zarurat Kyu Padti Hai?</h2>

      <p style={S.p}>Chalo ek simple sawal puchte hain.</p>
      <p style={S.p}>Agar Google apne servers kisi normal office room me rakh de to kya hoga?</p>
      <p style={S.p}>Bahut problems aayengi:</p>

      <ul style={S.ul}>
        <li style={S.li}><span style={S.cross}>❌</span> Power Cut</li>
        <li style={S.li}><span style={S.cross}>❌</span> Overheating</li>
        <li style={S.li}><span style={S.cross}>❌</span> Security Issues</li>
        <li style={S.li}><span style={S.cross}>❌</span> Slow Network Connectivity</li>
        <li style={S.li}><span style={S.cross}>❌</span> Service Downtime</li>
      </ul>

      <p style={S.p}>Isi liye dedicated Data Centers banaye jaate hain.</p>
      <p style={S.p}>Ye facilities specially design ki jaati hain taaki services 24×7 chalti rahein.</p>

      <hr style={S.divider} />

      {/* ── Main Components ── */}
      <h2 id="main-components" style={S.h1}>Data Center Ke Main Components</h2>

      <p style={S.p}>Ek modern Data Center me do major categories hoti hain:</p>

      <h2 id="it-infrastructure" style={S.h2}>IT Infrastructure</h2>

      <p style={S.p}>Ye wo systems hain jo actual data ko process karte hain.</p>

      <div style={S.featureGrid3} className="btt-feature-grid">
        <FeatureCard icon="🖥️" title="Servers" learnMoreSlug="server-basics" learnMoreLabel="Learn More: Server Basics">
          <p style={{ margin: 0, marginBottom: 8 }}>Servers Data Center ka brain hote hain.</p>
          <p style={{ margin: 0 }}>Ye applications run karte hain aur user requests process karte hain.</p>
        </FeatureCard>

        <FeatureCard icon="💾" title="Storage Systems" learnMoreSlug="nas" learnMoreLabel="Learn More: Storage Systems">
          <p style={{ margin: 0, marginBottom: 8 }}>Storage systems data ko save karte hain.</p>
          <p style={{ margin: 0 }}>Videos, images, documents, databases sab yahan stored hote hain.</p>
        </FeatureCard>

        <FeatureCard icon="🌐" title="Networking Equipment" learnMoreSlug="switch" learnMoreLabel="Learn More: Networking Basics">
          <p style={{ margin: 0, marginBottom: 8 }}>Switches, Routers aur Firewalls devices ko connect karte hain.</p>
          <p style={{ margin: 0 }}>Ye ensure karte hain ki data sahi destination tak pahunch sake.</p>
        </FeatureCard>
      </div>

      <hr style={S.divider} />

      {/* ── Non-IT Infrastructure ── */}
      <h2 id="non-it-infrastructure" style={S.h1}>Non-IT Infrastructure</h2>

      <p style={S.p}>Aksar beginners sirf servers ko hi Data Center samajhte hain.</p>
      <p style={S.p}>Reality me servers ke peeche poora support ecosystem hota hai.</p>

      <div style={S.featureGrid2} className="btt-feature-grid">
        <FeatureCard icon="⚡" title="UPS System" learnMoreSlug="ups" learnMoreLabel="Learn More: UPS Systems">
          <p style={{ margin: 0, marginBottom: 8 }}>Agar power chali jaye to UPS instantly backup provide karta hai.</p>
          <p style={{ margin: 0 }}>Ye servers ko shutdown hone se bachata hai.</p>
        </FeatureCard>

        <FeatureCard icon="🔋" title="Battery Bank" learnMoreSlug="battery-bank" learnMoreLabel="Learn More: Battery Bank">
          <p style={{ margin: 0, marginBottom: 8 }}>UPS ko support karne ke liye batteries use hoti hain.</p>
          <p style={{ margin: 0 }}>Ye generators start hone tak power provide karti hain.</p>
        </FeatureCard>

        <FeatureCard icon="⚡" title="Diesel Generator" learnMoreSlug="dg-set" learnMoreLabel="Learn More: Diesel Generator">
          <p style={{ margin: 0 }}>Long-duration power outage me generators load handle karte hain.</p>
        </FeatureCard>

        <FeatureCard icon="❄️" title="PAC Unit" learnMoreSlug="pac" learnMoreLabel="Learn More: PAC Units">
          <p style={{ margin: 0, marginBottom: 8 }}>Servers heat generate karte hain.</p>
          <p style={{ margin: 0 }}>PAC (Precision Air Conditioning) units temperature control karti hain.</p>
        </FeatureCard>

        <FeatureCard icon="🔥" title="Fire Protection System" learnMoreSlug="vesda" learnMoreLabel="Learn More: Fire Protection Systems">
          <p style={{ margin: 0 }}>Data Centers me advanced fire detection aur suppression systems hote hain.</p>
        </FeatureCard>

        <FeatureCard icon="📊" title="BMS" learnMoreSlug="bms" learnMoreLabel="Learn More: BMS">
          <p style={{ margin: 0 }}>Building Management System facility ke major systems monitor karta hai.</p>
        </FeatureCard>

        <FeatureCard icon="📊" title="DCIM" learnMoreSlug="dcim" learnMoreLabel="Learn More: DCIM">
          <p style={{ margin: 0 }}>Data Center Infrastructure Management tools poore Data Center ka operational visibility provide karte hain.</p>
        </FeatureCard>
      </div>

      <hr style={S.divider} />

      {/* ── Power ── */}
      <h2 id="power-chali-jaye" style={S.h1}>Agar Power Chali Jaye To?</h2>

      <p style={S.p}>Bahut log sochte hain:</p>

      <WarningCard>
        "Agar city ki electricity chali gayi to Google bhi band ho jayega?"
      </WarningCard>

      <p style={S.p}>Answer:</p>
      <p style={{ ...S.p, color: "#1f2937", fontWeight: 600, fontSize: 16 }}>Nahi.</p>
      <p style={S.p}>Modern Data Centers multiple backup layers use karte hain.</p>

      <JourneyTimeline
        steps={[
          { emoji: "⚡", text: "Utility Power" },
          { emoji: "🔋", text: "UPS" },
          { emoji: "🔋", text: "Battery Bank" },
          { emoji: "⚙️", text: "Diesel Generator" },
          { emoji: "🖥️", text: "Servers Continue Running" },
        ]}
      />

      <p style={S.p}>Most users ko power outage ka pata bhi nahi chalta.</p>
      <p style={S.p}><strong>Isi ko reliability kehte hain.</strong></p>

      <hr style={S.divider} />

      {/* ── Cooling ── */}
      <h2 id="cooling-important" style={S.h1}>Cooling Itni Important Kyu Hai?</h2>

      <p style={S.p}>Servers continuously heat generate karte hain.</p>
      <p style={S.p}>Agar cooling na ho to:</p>

      <ul style={S.ul}>
        <li style={S.li}><span style={S.cross}>❌</span> Temperature increase hoga</li>
        <li style={S.li}><span style={S.cross}>❌</span> Performance reduce hogi</li>
        <li style={S.li}><span style={S.cross}>❌</span> Hardware fail ho sakta hai</li>
        <li style={S.li}><span style={S.cross}>❌</span> Services down ho sakti hain</li>
      </ul>

      <p style={S.p}><strong>Isi liye cooling systems Data Center ke sabse important systems me se ek hote hain.</strong></p>

      <hr style={S.divider} />

      {/* ── AI ── */}
      <h2 id="ai-zamane-mein" style={S.h1}>AI Ke Zamane Me Data Centers</h2>

      <p style={S.p}>Artificial Intelligence ne Data Center industry ko completely transform kar diya hai.</p>
      <p style={S.p}>Aaj ke AI workloads ko chahiye:</p>

      <ul style={S.ul}>
        <li style={S.li}>High Performance GPUs</li>
        <li style={S.li}>Massive Storage</li>
        <li style={S.li}>High-Speed Networking</li>
        <li style={S.li}>Advanced Cooling</li>
        <li style={S.li}>Large Power Capacity</li>
      </ul>

      <p style={S.p}>Isi wajah se AI-focused Data Centers duniya bhar me rapidly build ho rahe hain.</p>
      <div style={S.learnMore}>
        <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
      </div>

      <hr style={S.divider} />

      {/* ── Did You Know ── */}
      <h2 id="did-you-know" style={S.h1}>Did You Know?</h2>

      <InsightCard>
        <p style={{ margin: 0, marginBottom: 12 }}>
          Aap jab ChatGPT se ek question puchte ho, uska response generate karne ke liye Data Centers ke andar thousands of GPUs milkar kaam kar sakte hain.
        </p>
        <p style={{ margin: 0 }}>
          Isliye AI aur Data Centers ka relationship future me aur bhi strong hone wala hai.
        </p>
      </InsightCard>

      <hr style={S.divider} />

      {/* ── Key Takeaways ── */}
      <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

      <KeyTakeawayCard
        items={[
          "Data Center digital world ka backbone hai.",
          "Har website aur app kisi na kisi Data Center par depend karti hai.",
          "Data Center sirf servers ka room nahi hota.",
          "Power aur Cooling utne hi important hain jitne Servers.",
          "AI future Data Center growth ko drive kar raha hai.",
        ]}
      />

      <style>{`
        @media (max-width: 720px) {
          .btt-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </ArticlePage>
  );
}
