import type { Metadata } from "next";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";
import RequestJourneyDiagram from "@/components/diagrams/RequestJourneyDiagram";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What is a Data Center? — Behind The Tech",
  description:
    "What is a Data Center? The digital powerhouse behind every click. Servers, power, cooling and networking — all explained in simple English.",
  keywords: [
    "what is a data center",
    "what is a data center",
    "data center guide",
    "data center explained",
    "data center basics",
    "server room",
    "internet infrastructure",
    "behind the tech",
  ],
  openGraph: {
    title: "What is a Data Center? The Digital Powerhouse Behind Every Click",
    description:
      "What is a Data Center? Servers, UPS, cooling and networking — all explained in simple English.",
    url: "https://behindthetech.in/learn/what-is-a-data-center",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-11-01",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Data Center? — Behind The Tech",
    description: "What is a Data Center? Explained in simple English.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/what-is-a-data-center",
    languages: {
      "hi": "https://behindthetech.in/hi/learn/what-is-a-data-center",
    },
  },
};

// ─── TOC headings ─────────────────────────────────────────────────────────────
// Manually derived from the article structure below.
// IDs must exactly match the id props on heading elements.

const HEADINGS: ArticleHeading[] = [
  { id: "quick-overview",        text: "Quick Overview",                    level: 2 },
  { id: "real-life-example",     text: "A Real-Life Example",              level: 2 },
  { id: "request-journey",       text: "Request Journey",                  level: 3 },
  { id: "response-journey",      text: "Response Journey",                 level: 3 },
  { id: "dc-kya-hota-hai",       text: "What is a Data Center?",           level: 2 },
  { id: "zarurat-kyu",           text: "Why Do We Need a Data Center?",    level: 2 },
  { id: "main-components",       text: "Main Components of a Data Center", level: 2 },
  { id: "it-infrastructure",     text: "IT Infrastructure",                level: 3 },
  { id: "non-it-infrastructure", text: "Non-IT Infrastructure",            level: 2 },
  { id: "power-chali-jaye",      text: "What Happens if Power Goes Out?",  level: 2 },
  { id: "cooling-important",     text: "Why is Cooling So Important?",     level: 2 },
  { id: "ai-zamane-mein",        text: "Data Centers in the Age of AI",    level: 2 },
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
        You use Data Centers every day. Yes, every single day.
      </IntroLead>

      <p style={S.p}>Jab aap:</p>

      <AppGrid
        items={[
          { icon: "📺", label: "Watch a video on YouTube" },
          { icon: "🔍", label: "Search something on Google" },
          { icon: "📷", label: "Scroll through Instagram" },
          { icon: "💬", label: "Send a WhatsApp message" },
          { icon: "💳", label: "Make a UPI payment" },
          { icon: "🤖", label: "Use ChatGPT" },
        ]}
      />

      <p style={S.p}>you are directly or indirectly connected to some Data Center.</p>
      <p style={S.p}>Simple words me:</p>

      <DefinitionCard>
        <strong>A Data Center is a specially designed facility where servers, storage, networking, power and cooling systems are installed to run digital services.</strong>
      </DefinitionCard>

      <p style={S.p}>Without Data Centers, the Internet as we know it today simply would not exist.</p>

      <hr style={S.divider} />

      {/* ── Real-Life Example ── */}
      <h2 id="real-life-example" style={S.h1}>A Real-Life Example</h2>

      <p style={S.p}>Imagine you open YouTube and search for "How Data Centers Work".</p>
      <p style={S.p}>It seems like the video just came from YouTube.</p>
      <p style={S.p}>But in reality, an entire digital journey happens in the background.</p>

      <h2 id="request-journey" style={S.h2}>Request Journey</h2>

      <RequestJourneyDiagram />

      <JourneyTimeline
        steps={[
          { emoji: "📱", text: "You Open YouTube" },
          { emoji: "📡", text: "Request Goes to Your ISP (Jio, Airtel, BSNL, etc.)" },
          { emoji: "🌐", text: "Travels Through the Internet" },
          { emoji: "🏢", text: "Reaches the YouTube Data Center" },
          { emoji: "🛡️", text: "Security Systems Verify the Request" },
          { emoji: "⚖️", text: "Load Balancer Selects the Best Available Server" },
          { emoji: "🖥️", text: "Server Processes the Request" },
          { emoji: "💾", text: "Storage System Locates the Video File" },
          { emoji: "📦", text: "Video Data is Prepared" },
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
          { emoji: "📱", text: "Your Mobile" },
          { emoji: "▶️", text: "Video Starts Playing" },
        ]}
      />

      <p style={S.p}>This entire process completes in milliseconds.</p>
      <p style={S.p}>By the time you blink, thousands of hardware components and software systems have already worked together.</p>

      <hr style={S.divider} />

      {/* ── Data Center Kya Hota Hai ── */}
      <h2 id="dc-kya-hota-hai" style={S.h1}>What is a Data Center?</h2>

      <p style={S.p}>The simplest way to understand a Data Center is:</p>
      <p style={S.p}>Think of it as a giant digital factory.</p>
      <p style={S.p}>Just like a manufacturing factory produces goods, a Data Center delivers digital services.</p>
      <p style={S.p}>Inside, thousands of devices are continuously running.</p>
      <p style={S.p}>Some are storing data.</p>
      <p style={S.p}>Some are processing requests.</p>
      <p style={S.p}>Some are handling network traffic.</p>
      <p style={S.p}>And some are making sure the system never goes down.</p>
      <p style={S.p}>That is why Data Centers are often called:</p>

      <InsightCard>
        <strong>"Backbone of the Internet"</strong>
      </InsightCard>

      <p style={S.p}></p>

      <hr style={S.divider} />

      {/* ── Zarurat ── */}
      <h2 id="zarurat-kyu" style={S.h1}>Why Do We Need a Data Center?</h2>

      <p style={S.p}>Let's ask a simple question.</p>
      <p style={S.p}>What if Google kept its servers in a regular office room?</p>
      <p style={S.p}>There would be a lot of problems:</p>

      <ul style={S.ul}>
        <li style={S.li}><span style={S.cross}>❌</span> Power Cut</li>
        <li style={S.li}><span style={S.cross}>❌</span> Overheating</li>
        <li style={S.li}><span style={S.cross}>❌</span> Security Issues</li>
        <li style={S.li}><span style={S.cross}>❌</span> Slow Network Connectivity</li>
        <li style={S.li}><span style={S.cross}>❌</span> Service Downtime</li>
      </ul>

      <p style={S.p}>That is why dedicated Data Centers are built.</p>
      <p style={S.p}>These facilities are specially designed so that services run 24×7.</p>

      <hr style={S.divider} />

      {/* ── Main Components ── */}
      <h2 id="main-components" style={S.h1}>Main Components of a Data Center</h2>

      <p style={S.p}>A modern Data Center has two major categories:</p>

      <h2 id="it-infrastructure" style={S.h2}>IT Infrastructure</h2>

      <p style={S.p}>These are the systems that actually process data.</p>

      <div style={S.featureGrid3} className="btt-feature-grid">
        <FeatureCard icon="🖥️" title="Servers" learnMoreSlug="server-basics" learnMoreLabel="Learn More: Server Basics">
          <p style={{ margin: 0, marginBottom: 8 }}>Servers are the brain of a Data Center.</p>
          <p style={{ margin: 0 }}>They run applications and process user requests.</p>
        </FeatureCard>

        <FeatureCard icon="💾" title="Storage Systems" learnMoreSlug="nas" learnMoreLabel="Learn More: Storage Systems">
          <p style={{ margin: 0, marginBottom: 8 }}>Storage systems save data.</p>
          <p style={{ margin: 0 }}>Videos, images, documents, databases — everything is stored here.</p>
        </FeatureCard>

        <FeatureCard icon="🌐" title="Networking Equipment" learnMoreSlug="switch" learnMoreLabel="Learn More: Networking Basics">
          <p style={{ margin: 0, marginBottom: 8 }}>Switches, Routers and Firewalls connect all devices together.</p>
          <p style={{ margin: 0 }}>They ensure that data reaches the right destination.</p>
        </FeatureCard>
      </div>

      <hr style={S.divider} />

      {/* ── Non-IT Infrastructure ── */}
      <h2 id="non-it-infrastructure" style={S.h1}>Non-IT Infrastructure</h2>

      <p style={S.p}>Beginners often think that a Data Center is just servers.</p>
      <p style={S.p}>In reality, there is an entire support ecosystem behind the servers.</p>

      <div style={S.featureGrid2} className="btt-feature-grid">
        <FeatureCard icon="⚡" title="UPS System" learnMoreSlug="ups" learnMoreLabel="Learn More: UPS Systems">
          <p style={{ margin: 0, marginBottom: 8 }}>If power goes out, the UPS instantly provides backup power.</p>
          <p style={{ margin: 0 }}>It prevents servers from shutting down.</p>
        </FeatureCard>

        <FeatureCard icon="🔋" title="Battery Bank" learnMoreSlug="battery-bank" learnMoreLabel="Learn More: Battery Bank">
          <p style={{ margin: 0, marginBottom: 8 }}>Batteries are used to support the UPS.</p>
          <p style={{ margin: 0 }}>They provide power until the generators start up.</p>
        </FeatureCard>

        <FeatureCard icon="⚡" title="Diesel Generator" learnMoreSlug="dg-set" learnMoreLabel="Learn More: Diesel Generator">
          <p style={{ margin: 0 }}>During long power outages, generators handle the full load.</p>
        </FeatureCard>

        <FeatureCard icon="❄️" title="PAC Unit" learnMoreSlug="pac" learnMoreLabel="Learn More: PAC Units">
          <p style={{ margin: 0, marginBottom: 8 }}>Servers generate a lot of heat.</p>
          <p style={{ margin: 0 }}>PAC (Precision Air Conditioning) units control the temperature.</p>
        </FeatureCard>

        <FeatureCard icon="🔥" title="Fire Protection System" learnMoreSlug="vesda" learnMoreLabel="Learn More: Fire Protection Systems">
          <p style={{ margin: 0 }}>Data Centers have advanced fire detection and suppression systems.</p>
        </FeatureCard>

        <FeatureCard icon="📊" title="BMS" learnMoreSlug="bms" learnMoreLabel="Learn More: BMS">
          <p style={{ margin: 0 }}>The Building Management System monitors all major systems in the facility.</p>
        </FeatureCard>

        <FeatureCard icon="📊" title="DCIM" learnMoreSlug="dcim" learnMoreLabel="Learn More: DCIM">
          <p style={{ margin: 0 }}>DCIM tools provide operational visibility across the entire Data Center.</p>
        </FeatureCard>
      </div>

      <hr style={S.divider} />

      {/* ── Power ── */}
      <h2 id="power-chali-jaye" style={S.h1}>What Happens if Power Goes Out?</h2>

      <p style={S.p}>Many people wonder:</p>

      <WarningCard>
        "If the city's electricity goes out, will Google go down too?"
      </WarningCard>

      <p style={S.p}>Answer:</p>
      <p style={{ ...S.p, color: "#1f2937", fontWeight: 600, fontSize: 16 }}>Nahi.</p>
      <p style={S.p}>Modern Data Centers use multiple backup layers.</p>

      <JourneyTimeline
        steps={[
          { emoji: "⚡", text: "Utility Power" },
          { emoji: "🔋", text: "UPS" },
          { emoji: "🔋", text: "Battery Bank" },
          { emoji: "⚙️", text: "Diesel Generator" },
          { emoji: "🖥️", text: "Servers Continue Running" },
        ]}
      />

      <p style={S.p}>Most users do not even notice a power outage.</p>
      <p style={S.p}><strong>This is what reliability means.</strong></p>

      <hr style={S.divider} />

      {/* ── Cooling ── */}
      <h2 id="cooling-important" style={S.h1}>Why is Cooling So Important?</h2>

      <p style={S.p}>Servers continuously generate heat.</p>
      <p style={S.p}>Without cooling:</p>

      <ul style={S.ul}>
        <li style={S.li}><span style={S.cross}>❌</span> Temperature will rise</li>
        <li style={S.li}><span style={S.cross}>❌</span> Performance will drop</li>
        <li style={S.li}><span style={S.cross}>❌</span> Hardware can fail</li>
        <li style={S.li}><span style={S.cross}>❌</span> Services can go down</li>
      </ul>

      <p style={S.p}><strong>That is why cooling systems are one of the most important systems in a Data Center.</strong></p>

      <hr style={S.divider} />

      {/* ── AI ── */}
      <h2 id="ai-zamane-mein" style={S.h1}>Data Centers in the Age of AI</h2>

      <p style={S.p}>Artificial Intelligence has completely transformed the Data Center industry.</p>
      <p style={S.p}>Today's AI workloads require:</p>

      <ul style={S.ul}>
        <li style={S.li}>High Performance GPUs</li>
        <li style={S.li}>Massive Storage</li>
        <li style={S.li}>High-Speed Networking</li>
        <li style={S.li}>Advanced Cooling</li>
        <li style={S.li}>Large Power Capacity</li>
      </ul>

      <p style={S.p}>That is why AI-focused Data Centers are being rapidly built around the world.</p>
      <div style={S.learnMore}>
        <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
      </div>

      <hr style={S.divider} />

      {/* ── Did You Know ── */}
      <h2 id="did-you-know" style={S.h1}>Did You Know?</h2>

      <InsightCard>
        <p style={{ margin: 0, marginBottom: 12 }}>
          When you ask ChatGPT a question, thousands of GPUs inside Data Centers may work together to generate your response.
        </p>
        <p style={{ margin: 0 }}>
          That is why the relationship between AI and Data Centers will only grow stronger in the future.
        </p>
      </InsightCard>

      <hr style={S.divider} />

      {/* ── Key Takeaways ── */}
      <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

      <KeyTakeawayCard
        items={[
          "Data Centers are the backbone of the digital world.",
          "Every website and app depends on some Data Center.",
          "A Data Center is not just a room full of servers.",
          "Power and Cooling are just as important as Servers.",
          "AI is driving the future growth of Data Centers.",
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
