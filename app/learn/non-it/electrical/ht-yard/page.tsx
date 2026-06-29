import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── TODO: Future articles required to complete this learning path ────────────
//
// The following TopicLink slugs are used in this article (Continue Learning,
// inline links, and PrevNextNav). Each needs its own page.tsx before that
// link resolves to a real article rather than the generic stub fallback.
//
// TODO: app/learn/non-it/electrical/rmu/page.tsx
//       Ring Main Unit — incoming distribution switching, fusing, metering
//
// TODO: app/learn/non-it/electrical/dg-set/page.tsx
//       Diesel Generator Set — backup power, AMF panels, load transfer
//
// TODO: app/learn/non-it/electrical/ups/page.tsx
//       UPS System — online double-conversion, bypass, battery runtime
//
// TODO: app/learn/non-it/electrical/earthing/page.tsx
//       Earthing System — electrode types, resistance testing, DC/AC earthing
//
// TODO: app/learn/non-it/electrical/lightning-protection/page.tsx
//       Lightning Protection — LPS design, surge protection, bonding
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "HT Yard in Data Centers — Behind The Tech",
  description:
    "HT Yard ki complete engineer guide: CT, PT, VCB, protection relays, SCADA, Tier III/IV design aur safety — Data Center context mein.",
  keywords: [
    "ht yard",
    "high tension yard data center",
    "vcb vacuum circuit breaker",
    "protection relay ct pt",
    "ht yard tier 3 tier 4",
    "data center electrical protection",
    "ht switchgear oem",
    "ht yard hindi",
    "behind the tech",
  ],
  openGraph: {
    title: "HT Yard: Data Center Ka High Tension Switching & Protection Station",
    description:
      "CT, PT, VCB, protection relays, SCADA monitoring, Tier III/IV design aur safety — HT Yard ka complete engineer handbook simple Hinglish mein.",
    url: "https://behindthetech.in/learn/non-it/electrical/ht-yard",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2025-01-05",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HT Yard Explained — Behind The Tech",
    description: "Data Center ka high tension switching aur protection station — complete engineer guide.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/ht-yard",
  },
};

// ─── TOC headings (FAQ excluded per gold-standard pattern) ───────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-ht-yard",          text: "What Is HT Yard?",            level: 2 },
  { id: "why-required",             text: "Why Is It Required?",         level: 2 },
  { id: "where-located",            text: "Where Is It Located?",        level: 2 },
  { id: "key-components",           text: "Key Components",              level: 2 },
  { id: "working-principle",        text: "Working Principle",           level: 2 },
  { id: "protection-philosophy",    text: "Protection Philosophy",       level: 2 },
  { id: "power-quality",            text: "Power Quality",               level: 2 },
  { id: "installation",             text: "Installation Process",        level: 2 },
  { id: "testing-commissioning",    text: "Testing & Commissioning",     level: 2 },
  { id: "operation",                text: "Operation",                   level: 2 },
  { id: "scada-bms-monitoring",     text: "SCADA & BMS Monitoring",      level: 2 },
  { id: "maintenance",              text: "Maintenance",                 level: 2 },
  { id: "common-faults",            text: "Common Faults",               level: 2 },
  { id: "troubleshooting",          text: "Troubleshooting",             level: 2 },
  { id: "failure-scenario",         text: "Failure Scenario",            level: 2 },
  { id: "safety-practices",         text: "Safety Practices",            level: 2 },
  { id: "oems-vendors",             text: "OEMs & Vendors",              level: 2 },
  { id: "tier-3-design",            text: "Tier III Design",             level: 2 },
  { id: "tier-4-design",            text: "Tier IV Design",              level: 2 },
  { id: "future-trends",            text: "Future Trends",               level: 2 },
  { id: "key-takeaways",            text: "Key Takeaways",               level: 2 },
];

// ─── Shared inline styles (identical tokens to flagship articles) ────────────

const S = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    letterSpacing: "0.04em",
    color: "var(--color-text-primary)",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,

  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "var(--color-text-primary)",
    lineHeight: 1.2,
    marginTop: 56,
    marginBottom: 14,
  } as React.CSSProperties,

  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
  } as React.CSSProperties,

  p: {
    marginBottom: 16,
    color: "var(--color-text-secondary)",
  } as React.CSSProperties,

  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,

  li: {
    color: "var(--color-text-secondary)",
    lineHeight: 1.65,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: "1px solid rgba(0,212,255,0.08)",
    margin: "12px 0",
  } as React.CSSProperties,

  learnMore: {
    margin: "10px 0 4px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: 6,
  } as React.CSSProperties,

  cardWrap: {
    position: "relative" as const,
    borderRadius: 10,
    overflow: "hidden" as const,
    margin: "28px 0",
  } as React.CSSProperties,

  cardAccentBlue: {
    height: 2,
    background: "var(--color-neon-blue)",
    boxShadow: "0 0 8px rgba(0,212,255,0.5)",
  } as React.CSSProperties,

  cardBodyInsight: {
    background: "rgba(0,212,255,0.035)",
    border: "1px solid rgba(0,212,255,0.16)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,

  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(0,212,255,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,

  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))",
  } as React.CSSProperties,

  takeawayBody: {
    padding: "22px 24px 24px",
  } as React.CSSProperties,

  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "var(--color-neon-blue)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,

  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(0,212,255,0.12)",
  } as React.CSSProperties,

  imageFigure: {
    margin: "8px 0 24px",
  } as React.CSSProperties,

  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "var(--color-text-muted)",
    textAlign: "center" as const,
    marginTop: 8,
  } as React.CSSProperties,

  noteText: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontStyle: "italic" as const,
    color: "var(--color-text-muted)",
    marginBottom: 16,
    lineHeight: 1.6,
  } as React.CSSProperties,
} as const;

// ─── InsightCard ──────────────────────────────────────────────────────────────

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.cardWrap}>
      <div style={S.cardAccentBlue} />
      <div style={S.cardBodyInsight}>
        <span style={{ ...S.cardLabel, color: "var(--color-neon-blue)" }}>INSIGHT</span>
        <div style={S.cardContent}>{children}</div>
      </div>
    </div>
  );
}

// ─── WhyThisMatters — Data Center context callout ───────────────────────────

function WhyThisMatters({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        background: "rgba(0,255,204,0.04)",
        border: "1px solid rgba(0,255,204,0.18)",
        overflow: "hidden",
        margin: "20px 0 24px",
      }}
    >
      <div style={{ height: 2, background: "var(--color-neon-cyan)", boxShadow: "0 0 8px rgba(0,255,204,0.4)" }} />
      <div style={{ padding: "16px 20px 18px" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-neon-cyan)",
            fontWeight: 600,
            marginBottom: 9,
          }}
        >
          Why This Matters In A Data Center
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-primary)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── WhatYouAreLooking — beginner caption block under images/diagrams ────────

function WhatYouAreLooking({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 8,
        background: "rgba(0,212,255,0.025)",
        border: "1px dashed rgba(0,212,255,0.2)",
        padding: "12px 16px",
        margin: "0 0 24px",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: 8.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-neon-blue)",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        What You Are Looking At
      </span>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── DCMapNote — future Data Center Map component reference ──────────────────

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: 8.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          marginBottom: 8,
        }}
      >
        On The Data Center Map
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <span
            key={c}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 980,
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.16)",
              color: "var(--color-text-secondary)",
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ContinueLearning — TopicLink card grid ─────────────────────────────────

function ContinueLearning() {
  // Real articles exist for: transformer (app/learn/non-it/electrical/transformer/)
  // Stub fallback (generic template) until dedicated page.tsx is created for:
  //   rmu              → TODO: app/learn/non-it/electrical/rmu/page.tsx
  //   dg-set           → TODO: app/learn/non-it/electrical/dg-set/page.tsx
  //   ups              → TODO: app/learn/non-it/electrical/ups/page.tsx
  //   earthing         → TODO: app/learn/non-it/electrical/earthing/page.tsx
  //   lightning-protection → TODO: app/learn/non-it/electrical/lightning-protection/page.tsx
  const slugs = ["transformer", "rmu", "dg-set", "ups", "earthing", "lightning-protection"];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        margin: "20px 0 8px",
      }}
    >
      {slugs.map((slug) => (
        <TopicLink key={slug} slug={slug} variant="card" />
      ))}
    </div>
  );
}

// ─── PrevNextNav — learning path navigation ─────────────────────────────────
// Prev: grid-supply (order 1, real article exists)
// Curr: ht-yard     (order 2, this article)
// Next: rmu         (order 3, TODO: app/learn/non-it/electrical/rmu/page.tsx)

function PrevNextNav() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        margin: "24px 0 8px",
      }}
    >
      <div
        style={{
          borderRadius: 10,
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.12)",
          padding: "14px 16px",
        }}
      >
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
          ← Previous
        </span>
        <TopicLink slug="grid-supply" label="Grid Supply" variant="inline" />
      </div>
      <div
        style={{
          borderRadius: 10,
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.12)",
          padding: "14px 16px",
          textAlign: "right",
        }}
      >
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
          Next →
        </span>
        <TopicLink slug="rmu" label="RMU" variant="inline" />
      </div>
    </div>
  );
}

// ─── KeyTakeawayCard ──────────────────────────────────────────────────────────

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
                  <path d="M4 13l5 5L20 6" stroke="var(--color-neon-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── FlowDiagram — sequential step diagram ───────────────────────────────────

interface FlowStep {
  icon: string;
  label: string;
  sublabel?: string;
}

function FlowDiagram({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div
        style={{
          borderRadius: 10,
          background: "rgba(0,212,255,0.025)",
          border: "1px solid rgba(0,212,255,0.10)",
          padding: "22px 20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 86,
                  textAlign: "center",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                  }}
                >
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)" }}>
                    {step.sublabel}
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--color-neon-blue)",
                    margin: "0 4px",
                    opacity: 0.7,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

// ─── ComparisonCard ───────────────────────────────────────────────────────────

function ComparisonCard({
  tag,
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: {
  tag: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        background: "rgba(0,212,255,0.03)",
        border: "1px solid rgba(0,212,255,0.12)",
        overflow: "hidden",
        margin: "20px 0 32px",
      }}
    >
      <div style={{ height: 2, background: "var(--color-neon-blue)", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-neon-blue)",
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          {tag}
        </span>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-neon-cyan)",
                marginBottom: 8,
              }}
            >
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-neon-blue)",
                marginBottom: 8,
              }}
            >
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OEMTable ─────────────────────────────────────────────────────────────────

const OEM_ROWS = [
  { equipment: "Protection Relay",   oems: "Siemens SIPROTEC, Schneider SEPAM, ABB REF" },
  { equipment: "VCB",                oems: "ABB, Siemens, Schneider, Eaton" },
  { equipment: "GIS",                oems: "Siemens, Hitachi Energy, ABB" },
  { equipment: "CT / PT",            oems: "ABB, CG Power, Siemens" },
  { equipment: "Lightning Arrester", oems: "ABB, Siemens" },
  { equipment: "Metering",           oems: "Landis+Gyr, Secure Meters, ABB" },
];

function OEMTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(0,212,255,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(0,212,255,0.06)" }}>
              {["Equipment", "Common OEMs"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-neon-blue)",
                    borderBottom: "1px solid rgba(0,212,255,0.14)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OEM_ROWS.map((row, i) => (
              <tr key={row.equipment} style={{ background: i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--color-text-primary)", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.equipment}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.oems}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "HT Yard aur Substation me kya difference hai?",
    a: "Substation ek broader term hai jisme voltage transformation bhi shamil hoti hai. HT Yard typically incoming high-voltage supply ko receive, switch aur protect karne ka point hota hai — voltage transformation alag transformer unit me hoti hai.",
  },
  {
    q: "Protection relay trip karti hai ya breaker khud trip hota hai?",
    a: "Relay trip karne ka decision leti hai. CT/PT se inputs analyze karke relay trip signal generate karti hai. VCB us signal par execute karta hai — breaker khud kuch decide nahi karta.",
  },
  {
    q: "Kya Data Center direct LT par chal sakta hai?",
    a: "Bahut chhote setups ke liye theoretically possible hai, lekin practically nahi. Large Data Centers ki power requirement par LT supply current bahut zyada ho jata hai — cable size aur losses impractical ho jate hain.",
  },
  {
    q: "VCB aur ACB me kya difference hai?",
    a: "VCB (Vacuum Circuit Breaker) high-tension medium-voltage applications ke liye hota hai aur arc ko vacuum me quench karta hai. ACB (Air Circuit Breaker) low-tension applications ke liye hota hai aur air me arc quench karta hai. HT Yard me VCB use hota hai.",
  },
  {
    q: "Kya Tier IV ka matlab automatically dual utility connection hota hai?",
    a: "Nahi. Tier IV ka matlab fault tolerance aur concurrent maintainability hai — ye dual independent paths se achieve hoti hai. Dual utility helpful hai, lekin mandatory nahi. Single utility ke saath bhi UPS aur DG redundancy se fault tolerance design kiya ja sakta hai.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(0,212,255,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 8 }}>
            {item.q}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0 }}>{item.a}</p>
        </div>
      ))}
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HtYardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticleLayout slug="ht-yard" headings={HEADINGS} readingTimeMinutes={18}>

        <p style={S.p}>Jab Grid Supply Data Center campus me enter karti hai, to sabse pehla system jo usse receive karta hai woh hai — <strong>HT Yard</strong>.</p>
        <p style={S.p}>Ye sirf ek wire connection nahi hai. Ye ek complete switching, protection aur metering station hota hai.</p>
        <p style={S.p}>Bina HT Yard ke, incoming high-voltage electricity directly building ya transformer tak nahi ja sakti.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/ht-yard-overview.png"
              alt="HT Yard Overview — outdoor high tension switchyard with VCBs, CTs and lightning arresters"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            HT Yard — Data Center electrical chain ka pehla active protection aur switching layer.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek outdoor high-tension switchyard hai. Jo tall structures dikh rahe hain unpar circuit breakers, current transformers aur lightning arresters lage hote hain. Yahin se grid ki electricity Data Center me controlled tarike se enter karti hai.
        </WhatYouAreLooking>

        <p style={S.p}>Is article me hum HT Yard ko ek engineer handbook ki tarah samjhenge — components, working, installation, testing, protection, safety, Tier III/IV design aur real-world failure scenarios tak.</p>
        <p style={S.p}>Iska foundation samajhne ke liye pehle dekho electricity Data Center tak pahunchti kaise hai.</p>
        <div style={S.learnMore}>
          <TopicLink slug="grid-supply" label="Read: Grid Supply" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── What Is HT Yard ── */}
        <h2 id="what-is-ht-yard" style={S.h1}>What Is HT Yard?</h2>

        <p style={S.p}>HT Yard ka full form hai <strong>High Tension Yard</strong>. Ye woh facility hai jo utility grid se incoming high-voltage supply receive karti hai.</p>
        <p style={S.p}>Incoming voltage ho sakta hai 11 kV, 33 kV ya 66 kV — Data Center size aur utility availability ke hisaab se.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/ht-yard-layout-diagram.png"
              alt="HT Yard layout single line diagram — feeder, isolator, VCB, CT, PT, busbar"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            HT Yard single-line diagram — har component ka position aur connection.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek "single-line diagram" hai — engineers electrical system ko aise hi simplified lines me draw karte hain. Har symbol ek real component hai: incoming feeder, isolator, breaker, CT, PT aur busbar. Power upar se neeche flow karti hai.
        </WhatYouAreLooking>

        <p style={S.p}>HT Yard Grid Supply aur Data Center ke beech ka first interface hota hai. Yahan se incoming power ko receive, isolate, protect aur meter kiya jata hai.</p>

        <InsightCard>
          <strong>HT Yard is not a substation.</strong> Substation me voltage transformation bhi hoti hai. HT Yard ka primary kaam incoming HV supply ko receive, switch aur protect karna hai — actual voltage step-down transformer unit me hota hai, jo iske baad aata hai.
        </InsightCard>

        <WhyThisMatters>
          Data Center ki poori uptime promise yahin se shuru hoti hai. Agar HT Yard ka design weak ho, to ek utility-side disturbance bhi pure facility ko gira sakta hai. Isi liye Tier III aur Tier IV Data Centers HT Yard ko hi redundancy ki pehli layer maante hain.
        </WhyThisMatters>

        <DCMapNote components={["Incoming Utility", "HT Switchgear", "RMU"]} />

        <hr style={S.divider} />

        {/* ── Why Required ── */}
        <h2 id="why-required" style={S.h1}>Why Is HT Yard Required?</h2>

        <p style={S.p}>Direct high-voltage supply seedhe building ke andar nahi ja sakti. Beech me ek controlled, protected interface chahiye hota hai.</p>
        <p style={S.p}>HT Yard ye 4 critical functions provide karta hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Protection</strong> — fault ke time downstream equipment ko bachana</li>
          <li style={S.li}><strong>Switching</strong> — planned maintenance ya fault isolation ke liye</li>
          <li style={S.li}><strong>Metering</strong> — utility billing aur consumption tracking</li>
          <li style={S.li}><strong>Redundancy Management</strong> — Dual Grid Feed yahin manage hoti hai</li>
        </ul>
        <p style={S.p}>Agar HT Yard na ho, to ek choti si grid disturbance bhi poore Data Center ko damage kar sakti hai.</p>

        <WhyThisMatters>
          Ek office me protection fail ho to kuch ghante ka downtime hota hai. Ek Data Center me wahi fault thousands of users ki services, SLAs aur availability targets ko break kar deta hai. Protection isi liye reliability ka foundation hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Where Located ── */}
        <h2 id="where-located" style={S.h1}>Where Is HT Yard Located?</h2>

        <p style={S.p}>HT Yard generally Data Center campus ki boundary ke paas, utility entry point par hota hai.</p>
        <p style={S.p}>Ye ek dedicated, fenced compound hota hai jisme proper electrical safety clearances maintain ki jati hain.</p>
        <p style={S.p}>Aaj kal space-constrained sites par outdoor switchyard ki jagah <strong>GIS (Gas Insulated Switchgear)</strong> use hota hai — ye compact, indoor aur weather-independent hota hai.</p>
        <p style={S.noteText}>Actual location aur configuration project requirements, utility requirements, OEM design aur Data Center architecture par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── Key Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <p style={S.p}>HT Yard ke har component ka ek specific role hota hai. Koi bhi component sirf decorative nahi hota.</p>

        <h3 style={S.h3}>CT — Current Transformer</h3>
        <p style={S.p}>CT primary line current ko proportional secondary current me convert karta hai — jaise 200A ko 5A me.</p>
        <p style={S.p}>Protection relay aur metering panels CT se hi current information lete hain.</p>
        <p style={S.p}><strong>CT secondary kabhi bhi open circuit nahi hona chahiye</strong> — load ke time ye dangerous high voltage create kar sakta hai.</p>

        <h3 style={S.h3}>PT / VT — Potential Transformer</h3>
        <p style={S.p}>PT line voltage ko measurable level par convert karta hai — jaise 11000V ko 110V me.</p>
        <p style={S.p}>Protection relay aur meters PT se actual voltage information lete hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/ct-pt-installation.png"
              alt="CT and PT installation on high voltage feeder support structure"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            CT aur PT — protection relay aur metering ke liye current aur voltage sensing.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Protection Relay — The Brain</h3>
        <p style={S.p}>Protection relay HT Yard ka dimaag hota hai. Ye CT/PT inputs continuously analyze karta hai.</p>
        <p style={S.p}>Modern numerical relays — Siemens SIPROTEC, ABB REF, Schneider SEPAM — multiple protection functions ek hi device me handle karte hain.</p>

        <h3 style={S.h3}>VCB — Vacuum Circuit Breaker</h3>
        <p style={S.p}>VCB main switching device hota hai. Arc quenching vacuum medium me hoti hai.</p>
        <p style={S.p}>Trip coil relay ka signal receive karta hai aur breaker open ho jata hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/vacuum-circuit-breaker.png"
              alt="Vacuum Circuit Breaker panel in racked-out position showing vacuum interrupters"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Vacuum Circuit Breaker — relay command par execute karta hai, khud decide nahi karta.
          </figcaption>
        </figure>

        <h3 style={S.h3}>LA — Lightning Arrester</h3>
        <p style={S.p}>Lightning Arrester atmospheric overvoltage transients se protection deta hai. Surge energy ground me dissipate kar deta hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/lightning-arrester.png"
              alt="Lightning arresters mounted on high voltage structure in outdoor switchyard"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Lightning Arrester — surge transients ko ground me safely dissipate karta hai.
          </figcaption>
        </figure>

        <p style={S.p}>Iske alawa HT Yard me hote hain: <strong>Isolator</strong> (no-load isolation aur visible break), <strong>Busbar</strong> (multiple feeders ko connect karne wala conductor), <strong>Earth Switch</strong> (maintenance ke time equipment earthing), aur <strong>Metering Panel</strong> (billing aur SCADA integration).</p>
        <p style={S.p}>Surge protection aur earthing dono closely related hain — inhe deeper samajhne ke liye:</p>
        <div style={S.learnMore}>
          <TopicLink slug="lightning-protection" label="Learn More: Lightning Protection" variant="inline" />
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>HT Yard ka kaam ek continuous monitoring aur instant response system ki tarah chalta hai.</p>

        <FlowDiagram
          caption="HT Yard working principle — measure, analyze, execute"
          steps={[
            { icon: "⚡", label: "Grid Supply", sublabel: "11/33/66kV" },
            { icon: "📐", label: "CT / PT", sublabel: "Measure" },
            { icon: "🧠", label: "Relay", sublabel: "Analyze" },
            { icon: "⚙️", label: "VCB", sublabel: "Execute" },
            { icon: "🏢", label: "Transformer", sublabel: "Next Layer" },
          ]}
        />

        <p style={S.p}>Normal condition me breaker closed rehta hai aur power smoothly flow karti hai. CT aur PT continuously current aur voltage measure karte rehte hain.</p>
        <p style={S.p}>Fault condition me relay trip signal generate karta hai, VCB open hota hai, aur faulted section isolate ho jata hai.</p>

        <InsightCard>
          <strong>Relay decides. Breaker executes.</strong> Breaker khud trip nahi karta. Protection relay CT/PT inputs analyze karta hai. Jab configured limits cross hoti hain, relay breaker ko open karne ka command deta hai. Isi se faulted section isolate hokar downstream infrastructure protect ho jata hai.
        </InsightCard>

        <p style={S.p}>Aage power <TopicLink slug="rmu" label="RMU" variant="inline" /> aur <TopicLink slug="transformer" label="Transformer" variant="inline" /> ke through guzarti hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/protection-operation-flow.png"
              alt="Protection operation sequence — CT measures, relay analyzes, VCB trips, fault isolated"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Protection operation sequence — CT → Relay → Trip Signal → VCB Open → Fault Isolated.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye sequence batati hai ki fault ke time kya hota hai. CT current "feel" karta hai, relay decide karta hai ki ye fault hai, aur phir breaker ko khol kar faulted hissa baaki system se alag kar deta hai — sab kuch ek second ke chhote se hisse me.
        </WhatYouAreLooking>

        <DCMapNote components={["CT/PT", "Protection Relay", "HT Switchgear"]} />

        <hr style={S.divider} />

        {/* ── Protection Philosophy ── */}
        <h2 id="protection-philosophy" style={S.h1}>Protection Philosophy</h2>

        <p style={S.p}>Protection HT Yard ka sabse critical aspect hai. Har protection function ka apna specific purpose hota hai.</p>

        <h3 style={S.h3}>Over Current Protection</h3>
        <p style={S.p}>Jab current set limit se zyada flow karne lagti hai — jaise short circuit ya overload me — relay overcurrent detect karta hai.</p>
        <p style={S.p}>Set time delay ke baad relay VCB ko trip command deta hai, taaki cables aur equipment overheat na ho.</p>

        <h3 style={S.h3}>Earth Fault Protection</h3>
        <p style={S.p}>Jab koi live conductor accidentally earth ke contact me aata hai, to earth fault current flow karti hai.</p>
        <p style={S.p}>Relay ye unbalanced current detect karta hai aur quickly breaker ko trip karwa deta hai — ye sabse common HT fault hai.</p>

        <h3 style={S.h3}>Under Voltage Protection</h3>
        <p style={S.p}>Agar incoming voltage dangerously low ho jaye, to connected equipment damage ho sakta hai.</p>
        <p style={S.p}>Under voltage relay is condition ko detect karke load ko safely disconnect ya alarm raise karta hai.</p>

        <h3 style={S.h3}>Over Voltage Protection</h3>
        <p style={S.p}>Switching surges ya grid disturbances voltage ko dangerous level tak badha sakte hain.</p>
        <p style={S.p}>Over voltage relay sensitive equipment ko bachane ke liye protective action leta hai.</p>

        <h3 style={S.h3}>Differential Protection</h3>
        <p style={S.p}>Differential protection sabse precise hoti hai — ye protected zone ke "incoming" aur "outgoing" current ko compare karti hai.</p>
        <p style={S.p}>Agar dono me difference aata hai, matlab fault zone ke andar hai — relay instantly trip karwata hai. Busbar aur transformer protection me ye critical hoti hai.</p>

        <p style={S.noteText}>Actual protection settings coordination study se aati hain — arbitrary nahi hoti. Ye project requirements aur OEM relay design par depend karti hain.</p>

        <WhyThisMatters>
          Data Center me protection ka selective hona zaroori hai — sirf faulted feeder trip ho, poora yard nahi. Agar coordination galat ho to ek small fault pure facility ko gira sakta hai. Isi "selectivity" se availability aur redundancy maintain hoti hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Power Quality ── */}
        <h2 id="power-quality" style={S.h1}>Power Quality</h2>

        <p style={S.p}>Grid Supply reliable hoti hai, lekin perfect nahi. Sensitive IT load ke liye power quality monitor karna zaruri hai.</p>

        <h3 style={S.h3}>Harmonics</h3>
        <p style={S.p}>Normal power ek smooth sine wave hoti hai. Lekin UPS, VFDs aur SMPS based equipment is waveform ko distort kar dete hain — isi distortion ko harmonics kehte hain.</p>
        <p style={S.p}>Excessive harmonics transformers ko overheat aur equipment life reduce kar sakte hain.</p>

        <h3 style={S.h3}>Voltage Sag</h3>
        <p style={S.p}>Voltage sag ek short-duration voltage drop hota hai — aksar large load start hone par. IT equipment ke liye ye disruptive ho sakta hai.</p>

        <h3 style={S.h3}>Voltage Swell</h3>
        <p style={S.p}>Voltage swell sag ka opposite hai — short-duration voltage rise. Ye bhi sensitive equipment ko stress de sakta hai.</p>

        <h3 style={S.h3}>Power Quality Monitoring</h3>
        <p style={S.p}>Data Centers me dedicated power quality analyzers install kiye jate hain jo harmonics, sag, swell aur power factor continuously monitor karte hain.</p>
        <p style={S.p}>Ye data SCADA/BMS me feed hota hai taaki issues early detect ho sakein.</p>

        <hr style={S.divider} />

        {/* ── Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <p style={S.p}>HT Yard installation ek structured, safety-critical process hota hai.</p>
        <p style={S.p}>Sabse pehle <strong>civil work</strong> — foundation, cable trench aur earthing grid prepare ki jati hai.</p>
        <p style={S.p}>Phir <strong>equipment mounting</strong> — Lightning Arrester, Isolator, VCB, CT/PT aur Busbar sequence me install kiye jate hain.</p>
        <p style={S.p}>HV cable termination me <strong>stress cone</strong> aur heat-shrink/cold-shrink kits use hote hain — ye electrical stress ko safely manage karte hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/hv-cable-termination.png"
              alt="HV cable termination with stress cone and heat shrink kit at switchgear base"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            HV cable termination — stress cone electrical stress ko safely distribute karta hai.
          </figcaption>
        </figure>

        <p style={S.p}>Earthing me teen alag systems hote hain: equipment body earth, neutral earth, aur lightning protection earth. Inhe samajhne ke liye:</p>
        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>
        <p style={S.p}>Isolator aur breaker ke beech mechanical aur electrical interlocks lagae jate hain taaki unsafe switching na ho sake.</p>

        <hr style={S.divider} />

        {/* ── Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Energize karne se pehle har component thoroughly test hota hai.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Insulation Resistance (Megger) Test</strong> — cables aur equipment insulation check</li>
          <li style={S.li}><strong>CT Ratio & Polarity Test</strong> — correct ratio aur direction</li>
          <li style={S.li}><strong>PT Ratio & Burden Test</strong> — voltage accuracy</li>
          <li style={S.li}><strong>Relay Secondary Injection Test</strong> — relay settings verify</li>
          <li style={S.li}><strong>VCB Timing & Contact Resistance Test</strong> — breaker performance</li>
          <li style={S.li}><strong>Earthing Resistance Test</strong> — earth electrode quality</li>
        </ul>
        <p style={S.p}>Final functional test me ek fault simulate kiya jata hai — relay ko correctly trip karna chahiye. Ye test utility engineer aur client commissioning team ki presence me hota hai.</p>

        <hr style={S.divider} />

        {/* ── Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>HT Yard operation strict procedures ke under hoti hai — yahan koi shortcut nahi chalta.</p>
        <p style={S.p}>Har switching operation <strong>Standard Operating Procedures (SOPs)</strong> aur <strong>Permit to Work (PTW)</strong> system ke through hoti hai.</p>
        <p style={S.p}>Switching sequence strictly follow ki jati hai: closing me Isolator pehle, phir Breaker. Opening me reverse — Breaker pehle, phir Isolator.</p>
        <p style={S.p}>Operation remote (SCADA se) ya local (panel se) ho sakti hai, depending on facility design.</p>

        <hr style={S.divider} />

        {/* ── SCADA & BMS Monitoring ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <p style={S.p}>Modern Data Centers me HT Yard ko continuously SCADA aur BMS ke through monitor kiya jata hai.</p>

        <h3 style={S.h3}>Alarm Monitoring</h3>
        <p style={S.p}>Overcurrent, earth fault, PT fuse blown, breaker fail — ye sab alarms real-time control room me display hote hain.</p>

        <h3 style={S.h3}>Breaker Status</h3>
        <p style={S.p}>Har VCB ka open/closed status live monitor hota hai. Operators ko hamesha pata rehta hai ki kaunsa feeder energized hai.</p>

        <h3 style={S.h3}>Event Logs</h3>
        <p style={S.p}>Protection relays time-stamped event logs maintain karte hain. Fault ke baad ye logs root cause analysis ke liye critical hote hain.</p>

        <h3 style={S.h3}>Remote Operations</h3>
        <p style={S.p}>Authorized operators control room se hi breaker operations kar sakte hain — physical exposure kam hota hai.</p>

        <h3 style={S.h3}>Trend Analysis</h3>
        <p style={S.p}>Historical data — load profile, harmonics, power factor — trend analysis ke liye use hota hai, jisse predictive decisions liye ja sakein.</p>
        <p style={S.p}>Modern SCADA systems IEC 61850 protocol par communicate karte hain, jo digital substations ka standard hai.</p>

        <hr style={S.divider} />

        {/* ── Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>HT Yard ki reliability uski maintenance par depend karti hai. Common maintenance activities:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Thermographic (IR) Survey</strong> — loose connections aur hotspots detect karna (quarterly)</li>
          <li style={S.li}><strong>VCB Contact Resistance Test</strong> — breaker health (annually)</li>
          <li style={S.li}><strong>Relay Secondary Injection Test</strong> — protection accuracy (annually)</li>
          <li style={S.li}><strong>CT/PT Testing</strong> — measurement accuracy (biannually)</li>
          <li style={S.li}><strong>Earthing Resistance Test</strong> — earth integrity (biannually)</li>
          <li style={S.li}><strong>Insulator Cleaning</strong> — dust aur pollution removal (seasonal)</li>
        </ul>
        <p style={S.noteText}>Maintenance frequency project requirements, OEM recommendations aur site conditions par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <p style={S.p}>HT Yard me kuch faults baar-baar dekhe jate hain:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>CT Secondary Open Circuit</strong> — extremely dangerous, high voltage build-up</li>
          <li style={S.li}><strong>PT Fuse Blown</strong> — relay ko galat voltage milti hai, maloperation risk</li>
          <li style={S.li}><strong>Breaker Failure</strong> — backup protection operate hona chahiye</li>
          <li style={S.li}><strong>Earth Fault on Feeder</strong> — relay set time me clear karti hai</li>
          <li style={S.li}><strong>Busbar Fault</strong> — sabse severe, differential protection clear karti hai</li>
          <li style={S.li}><strong>Cable Termination Failure</strong> — partial discharge se eventual flashover</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Troubleshooting ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <p style={S.p}>Troubleshooting ka basic approach: <strong>Alarm receive karo → source identify karo → isolate karo → investigate karo → restore karo.</strong></p>
        <p style={S.p}>PT fuse blown alarm aaye to pehle fuse check karo — relay ko blame karne se pehle.</p>
        <p style={S.p}>Agar breaker trip nahi ho raha, to trip coil, DC control supply aur relay output contacts check karo.</p>
        <p style={S.p}>Genuine fault aur instrument failure me farak karna sabse important skill hai — har alarm real fault nahi hota.</p>

        <hr style={S.divider} />

        {/* ── Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>Ek real-world scenario samajhte hain — raat ke 3 baje incoming utility cable termination fail ho jaati hai.</p>

        <FlowDiagram
          caption="3 AM cable termination failure — automatic response sequence"
          steps={[
            { icon: "🌙", label: "Cable Fault", sublabel: "3 AM" },
            { icon: "🧠", label: "Relay Detects", sublabel: "~80ms" },
            { icon: "⚙️", label: "VCB Trips" },
            { icon: "🔋", label: "UPS Supports" },
            { icon: "🔧", label: "DG Starts" },
            { icon: "✅", label: "Service Continues" },
          ]}
        />

        <p style={S.p}>Termination par phase-to-earth fault hota hai. Protection relay isse ~80 milliseconds me detect karke VCB ko trip command deta hai.</p>
        <p style={S.p}>VCB open hote hi faulted section isolate ho jata hai. Isi instant <TopicLink slug="ups" label="UPS" variant="inline" /> load pick kar leta hai aur <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> temporary energy provide karta hai.</p>
        <p style={S.p}>Kuch hi seconds me <TopicLink slug="dg-set" label="DG Set" variant="inline" /> start hokar load sambhal leta hai. Agar Dual Grid Feed available hai, to secondary path bhi switch in ho jata hai.</p>
        <p style={S.p}>IT equipment ko total interruption: 500 milliseconds se bhi kam. Users ko pata bhi nahi chalta ki kuch hua tha.</p>

        <WhyThisMatters>
          Yahi woh moment hai jiske liye poora redundancy investment kiya jata hai. Tier III me ye recovery concurrent maintainability deti hai; Tier IV me fault tolerance — yaani ek fault ke baad bhi service bina interruption ke chalti rehti hai. 99.99%+ availability isi tarah achieve hoti hai.
        </WhyThisMatters>

        <InsightCard>
          <strong>Tier IV does not automatically mean dual utility.</strong> Tier IV ka asli matlab fault tolerance aur concurrent maintainability hai. Ye dual independent paths se achieve hoti hai — dual utility helpful hai lekin mandatory nahi. Single utility par bhi robust UPS aur DG redundancy se fault tolerance design ki ja sakti hai.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <p style={S.p}>HT Yard high-voltage environment hai — safety negotiable nahi hoti.</p>

        <h3 style={S.h3}>Arc Flash Hazard</h3>
        <p style={S.p}>Arc flash ek explosive electrical discharge hota hai jo extreme heat aur pressure release karta hai. Ye fatal ho sakta hai.</p>
        <p style={S.p}>Isi liye HT Yard me kaam karte waqt rated Arc Flash PPE (suit, face shield, insulated gloves) pehnna mandatory hai.</p>

        <h3 style={S.h3}>Arc Flash Boundary</h3>
        <p style={S.p}>Arc flash boundary woh distance hai jiske andar arc flash exposure dangerous ho sakta hai. Is boundary ke andar bina proper PPE ke koi nahi ja sakta.</p>

        <h3 style={S.h3}>PTW Workflow</h3>
        <p style={S.p}>Permit to Work system me kaam start karne se pehle formal authorization leni padti hai — kaun, kya, kab aur kaise, sab documented hota hai.</p>

        <h3 style={S.h3}>LOTO Workflow</h3>
        <p style={S.p}>Lockout/Tagout me equipment ko de-energize karke physically lock aur tag kiya jata hai, taaki koi accidentally energize na kar sake.</p>
        <p style={S.p}>Golden rule: <strong>Earth before touch</strong> — kaam se pehle hamesha earth switch apply karo.</p>

        <h3 style={S.h3}>Switching Safety</h3>
        <p style={S.p}>HV switching me two-person rule follow hota hai — ek operate karta hai, doosra verify karta hai. CT secondary kabhi load ke under open nahi ki jaati. Single line diagram hamesha available rehna chahiye.</p>

        <hr style={S.divider} />

        {/* ── OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>HT Yard equipment globally established OEMs se aata hai. Reliability aur after-sales support critical factors hote hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/ht-switchgear-oems.png"
              alt="Medium voltage metal enclosed switchgear panels from major OEMs"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            HT switchgear — major OEMs ka modular metal-enclosed panel design.
          </figcaption>
        </figure>

        <OEMTable />

        <p style={S.noteText}>OEM selection project requirements, utility approvals, budget aur regional availability par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <p style={S.p}>Tier III me focus concurrent maintainability par hota hai — koi bhi component maintain karte waqt IT load impact nahi hona chahiye.</p>
        <p style={S.p}>HT Yard level par ye achieve hoti hai dual incoming feeders aur independent busbar sections se.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/tier-3-ht-yard-design.png"
              alt="Tier III HT Yard design with dual feeders and independent busbar sections"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Tier III HT Yard — independent busbar sections for concurrent maintainability.
          </figcaption>
        </figure>

        <p style={S.p}>Automatic bus transfer (ATS ya motorized isolator) ke through ek section maintenance ke time doosra load sambhal leta hai. Har section independent <TopicLink slug="transformer" label="Transformer" variant="inline" /> banks ko feed karta hai.</p>

        <hr style={S.divider} />

        {/* ── Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}>Tier IV me fault tolerance add hoti hai — ek fault bhi service interrupt nahi karta.</p>
        <p style={S.p}>Yahan do completely independent electrical paths hote hain, grid entry se lekar server rack tak, bina kisi crossover ke.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ht-yard/tier-4-dual-path.png"
              alt="Tier IV fully independent dual electrical path from grid to server rack"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Tier IV — dual independent paths with zero single point of failure.
          </figcaption>
        </figure>

        <ComparisonCard
          tag="Tier III vs Tier IV"
          leftTitle="Tier III"
          leftItems={["Dual feeders", "Independent busbar sections", "Automatic bus transfer", "Concurrent maintainability"]}
          rightTitle="Tier IV"
          rightItems={["Fully independent paths", "Redundant protection systems", "Fault tolerance", "No single point of failure"]}
        />

        <p style={S.p}>Tier IV me protection systems khud bhi redundant hote hain — dual protection relays aur dual control power supplies (UPS-backed DC).</p>

        <hr style={S.divider} />

        {/* ── Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}>HT Yard technology rapidly evolve ho rahi hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>GIS Adoption</strong> — compact, weather-independent switchgear outdoor yards ko replace kar raha hai</li>
          <li style={S.li}><strong>IEC 61850 Digital Substations</strong> — hardwired control ki jagah digital communication</li>
          <li style={S.li}><strong>SF6-Free Switchgear</strong> — clean air aur CO2-based environmentally friendly alternatives</li>
          <li style={S.li}><strong>AI Predictive Maintenance</strong> — partial discharge monitoring aur failure prediction</li>
          <li style={S.li}><strong>BMS Integration</strong> — unified facility monitoring</li>
        </ul>
        <p style={S.p}>AI Data Centers ki power demand badhne ke saath HT Yard ka role aur bhi critical hota ja raha hai.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "HT Yard sirf connection point nahi — pehla protection aur switching layer hai.",
            "Protection philosophy: Relay decides, breaker executes.",
            "CT secondary kabhi bhi open circuit nahi karni chahiye — life-threatening risk.",
            "HT Yard ek substation nahi hai — yahan voltage transformation nahi hoti.",
            "Dual Grid Feed reliability HT Yard level se start hoti hai.",
            "Tier IV ka matlab fault tolerance hai, automatically dual utility nahi.",
            "Safety non-negotiable hai — PTW, LOTO aur Arc Flash PPE mandatory hain.",
            "Future AI Data Centers GIS aur digital protection par shift kar rahe hain.",
          ]}
        />

        <p style={S.p}>Ab jab aap HT Yard samajh gaye ho, to agla logical step hai dekhna ki incoming power ko aage kaise distribute aur step-down kiya jata hai.</p>

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "var(--color-neon-cyan)" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>
              HT Yard ke baad incoming power RMU aur Transformer se hokar guzarti hai — wahan voltage step-down aur distribution hoti hai.
            </div>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              <TopicLink slug="rmu" label="Next: RMU →" variant="inline" />
              <TopicLink slug="transformer" label="Then: Transformer →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>HT Yard ke aage ka electrical learning path — har topic Data Center power chain ka agla logical step hai.</p>
        <ContinueLearning />

        <hr style={S.divider} />

        {/* ── Prev / Next learning path nav ── */}
        <PrevNextNav />

        <hr style={S.divider} />

        {/* ── FAQ (body only, not in TOC) ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticleLayout>
    </>
  );
}
