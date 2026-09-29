import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
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
    "A complete engineer guide to the HT Yard: CT, PT, VCB, protection relays, SCADA, Tier III/IV design and safety — in a Data Center context.",
  keywords: [
    "ht yard",
    "high tension yard data center",
    "vcb vacuum circuit breaker",
    "protection relay ct pt",
    "ht yard tier 3 tier 4",
    "data center electrical protection",
    "ht switchgear oem",
    "ht yard explained",
    "behind the tech",
  ],
  openGraph: {
    title: "HT Yard: The Data Center's High Tension Switching & Protection Station",
    description:
      "CT, PT, VCB, protection relays, SCADA monitoring, Tier III/IV design and safety — the complete HT Yard engineer handbook in simple English.",
    url: "https://behindthetech.in/learn/non-it/electrical/ht-yard",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2025-01-05",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "HT Yard Explained — Behind The Tech",
    description: "The Data Center's high tension switching and protection station — complete engineer guide.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/ht-yard",
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/ht-yard",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/ht-yard",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/ht-yard",
    },
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
    color: "#111827",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,

  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.2,
    marginTop: 56,
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
  } as React.CSSProperties,

  p: {
    marginBottom: 16,
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
    background: "#2563EB",
  } as React.CSSProperties,

  cardBodyInsight: {
    background: "rgba(37,99,235,0.035)",
    border: "1px solid rgba(37,99,235,0.16)",
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

  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(37,99,235,0.12)",
  } as React.CSSProperties,

  imageFigure: {
    margin: "8px 0 24px",
  } as React.CSSProperties,

  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "#1f2937",
    textAlign: "center" as const,
    marginTop: 8,
  } as React.CSSProperties,

  noteText: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontStyle: "italic" as const,
    color: "#1f2937",
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
        <span style={{ ...S.cardLabel, color: "#2563EB" }}>INSIGHT</span>
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
      <div style={{ height: 2, background: "#2563EB", boxShadow: "0 0 8px rgba(0,255,204,0.4)" }} />
      <div style={{ padding: "16px 20px 18px" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2563EB",
            fontWeight: 600,
            marginBottom: 9,
          }}
        >
          Why This Matters In A Data Center
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>
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
        background: "rgba(37,99,235,0.025)",
        border: "1px dashed rgba(37,99,235,0.2)",
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
          color: "#2563EB",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        What You Are Looking At
      </span>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "#1f2937" }}>
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
          color: "#1f2937",
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
              background: "rgba(37,99,235,0.05)",
              border: "1px solid rgba(37,99,235,0.16)",
              color: "#1f2937",
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
          background: "rgba(37,99,235,0.03)",
          border: "1px solid rgba(37,99,235,0.12)",
          padding: "14px 16px",
        }}
      >
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>
          ← Previous
        </span>
        <TopicLink slug="grid-supply" label="Grid Supply" variant="inline" />
      </div>
      <div
        style={{
          borderRadius: 10,
          background: "rgba(37,99,235,0.03)",
          border: "1px solid rgba(37,99,235,0.12)",
          padding: "14px 16px",
          textAlign: "right",
        }}
      >
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>
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
          background: "rgba(37,99,235,0.025)",
          border: "1px solid rgba(37,99,235,0.10)",
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
                    background: "rgba(37,99,235,0.08)",
                    border: "1px solid rgba(37,99,235,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                  }}
                >
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>
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
                    color: "#2563EB",
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
        background: "rgba(37,99,235,0.03)",
        border: "1px solid rgba(37,99,235,0.12)",
        overflow: "hidden",
        margin: "20px 0 32px",
      }}
    >
      <div style={{ height: 2, background: "#2563EB", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2563EB",
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
                color: "#2563EB",
                marginBottom: 8,
              }}
            >
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
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
                color: "#2563EB",
                marginBottom: 8,
              }}
            >
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
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
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
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
                    color: "#2563EB",
                    borderBottom: "1px solid rgba(37,99,235,0.14)",
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
              <tr key={row.equipment} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.equipment}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
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
    q: "What is the difference between an HT Yard and a Substation?",
    a: "Substation is a broader term that also includes voltage transformation. An HT Yard is typically the point where the incoming high-voltage supply is received, switched and protected — voltage transformation happens in a separate transformer unit.",
  },
  {
    q: "Does the protection relay trip, or does the breaker trip by itself?",
    a: "The relay takes the decision to trip. By analyzing inputs from the CT/PT, the relay generates the trip signal. The VCB executes on that signal — the breaker does not decide anything by itself.",
  },
  {
    q: "Can a Data Center run directly on LT?",
    a: "For very small setups it is theoretically possible, but not practically. At the power requirement of large Data Centers, the LT supply current becomes very high — cable size and losses become impractical.",
  },
  {
    q: "What is the difference between a VCB and an ACB?",
    a: "A VCB (Vacuum Circuit Breaker) is used for high-tension medium-voltage applications and quenches the arc in a vacuum. An ACB (Air Circuit Breaker) is used for low-tension applications and quenches the arc in air. The HT Yard uses a VCB.",
  },
  {
    q: "Does Tier IV automatically mean a dual utility connection?",
    a: "No. Tier IV means fault tolerance and concurrent maintainability — this is achieved through dual independent paths. Dual utility is helpful, but not mandatory. Even with a single utility, fault tolerance can be designed through UPS and DG redundancy.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(37,99,235,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>
            {item.q}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937", margin: 0 }}>{item.a}</p>
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

      <ArticleLayout slug="ht-yard" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/electrical/ht-yard">

        <p style={S.p}>When Grid Supply enters the Data Center campus, the very first system that receives it is — <strong>the HT Yard</strong>.</p>
        <p style={S.p}>It is not just a wire connection. It is a complete switching, protection and metering station.</p>
        <p style={S.p}>Without an HT Yard, incoming high-voltage electricity cannot go directly to the building or the transformer.</p>

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
            HT Yard — the first active protection and switching layer of the Data Center electrical chain.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          This is an outdoor high-tension switchyard. The tall structures you see carry circuit breakers, current transformers and lightning arresters. This is where electricity from the grid enters the Data Center in a controlled way.
        </WhatYouAreLooking>

        <p style={S.p}>In this article, we will understand the HT Yard like an engineer handbook — from components, working, installation, testing, protection and safety to Tier III/IV design and real-world failure scenarios.</p>
        <p style={S.p}>To understand its foundation, first see how electricity reaches the Data Center.</p>
        <div style={S.learnMore}>
          <TopicLink slug="grid-supply" label="Read: Grid Supply" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── What Is HT Yard ── */}
        <h2 id="what-is-ht-yard" style={S.h1}>What Is HT Yard?</h2>

        <p style={S.p}>The full form of HT Yard is <strong>High Tension Yard</strong>. It is the facility that receives the incoming high-voltage supply from the utility grid.</p>
        <p style={S.p}>The incoming voltage can be 11 kV, 33 kV or 66 kV — depending on the Data Center size and utility availability.</p>

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
            HT Yard single-line diagram — the position and connection of every component.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a "single-line diagram" — engineers draw electrical systems in simplified lines like this. Every symbol is a real component: incoming feeder, isolator, breaker, CT, PT and busbar. Power flows from top to bottom.
        </WhatYouAreLooking>

        <p style={S.p}>The HT Yard is the first interface between Grid Supply and the Data Center. This is where incoming power is received, isolated, protected and metered.</p>

        <InsightCard>
          <strong>HT Yard is not a substation.</strong> A substation also performs voltage transformation. The primary job of the HT Yard is to receive, switch and protect the incoming HV supply — the actual voltage step-down happens in the transformer unit, which comes after it.
        </InsightCard>

        <WhyThisMatters>
          The entire uptime promise of a Data Center starts right here. If the HT Yard design is weak, even a single utility-side disturbance can bring down the whole facility. That is why Tier III and Tier IV Data Centers treat the HT Yard as the first layer of redundancy.
        </WhyThisMatters>

        <DCMapNote components={["Incoming Utility", "HT Switchgear", "RMU"]} />

        <hr style={S.divider} />

        {/* ── Why Required ── */}
        <h2 id="why-required" style={S.h1}>Why Is HT Yard Required?</h2>

        <p style={S.p}>A direct high-voltage supply cannot go straight into the building. A controlled, protected interface is needed in between.</p>
        <p style={S.p}>The HT Yard provides these 4 critical functions:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Protection</strong> — protecting downstream equipment during a fault</li>
          <li style={S.li}><strong>Switching</strong> — for planned maintenance or fault isolation</li>
          <li style={S.li}><strong>Metering</strong> — utility billing and consumption tracking</li>
          <li style={S.li}><strong>Redundancy Management</strong> — Dual Grid Feed is managed right here</li>
        </ul>
        <p style={S.p}>Without an HT Yard, even a small grid disturbance could damage the entire Data Center.</p>

        <WhyThisMatters>
          If protection fails in an office, it causes a few hours of downtime. In a Data Center, the same fault breaks the services, SLAs and availability targets of thousands of users. That is why protection is the foundation of reliability.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Where Located ── */}
        <h2 id="where-located" style={S.h1}>Where Is HT Yard Located?</h2>

        <p style={S.p}>The HT Yard is generally located near the boundary of the Data Center campus, at the utility entry point.</p>
        <p style={S.p}>It is a dedicated, fenced compound in which proper electrical safety clearances are maintained.</p>
        <p style={S.p}>Nowadays, on space-constrained sites, <strong>GIS (Gas Insulated Switchgear)</strong> is used instead of an outdoor switchyard — it is compact, indoor and weather-independent.</p>
        <p style={S.noteText}>The actual location and configuration depend on project requirements, utility requirements, OEM design and Data Center architecture.</p>

        <hr style={S.divider} />

        {/* ── Key Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <p style={S.p}>Every component of the HT Yard has a specific role. No component is merely decorative.</p>

        <h3 style={S.h3}>CT — Current Transformer</h3>
        <p style={S.p}>A CT converts the primary line current into a proportional secondary current — for example, 200A into 5A.</p>
        <p style={S.p}>Protection relays and metering panels take their current information from the CT.</p>
        <p style={S.p}><strong>A CT secondary must never be open-circuited</strong> — under load it can create a dangerous high voltage.</p>

        <h3 style={S.h3}>PT / VT — Potential Transformer</h3>
        <p style={S.p}>A PT converts the line voltage to a measurable level — for example, 11000V into 110V.</p>
        <p style={S.p}>Protection relays and meters take the actual voltage information from the PT.</p>

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
            CT and PT — current and voltage sensing for protection relays and metering.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Protection Relay — The Brain</h3>
        <p style={S.p}>The protection relay is the brain of the HT Yard. It continuously analyzes CT/PT inputs.</p>
        <p style={S.p}>Modern numerical relays — Siemens SIPROTEC, ABB REF, Schneider SEPAM — handle multiple protection functions in a single device.</p>

        <h3 style={S.h3}>VCB — Vacuum Circuit Breaker</h3>
        <p style={S.p}>The VCB is the main switching device. Arc quenching happens in a vacuum medium.</p>
        <p style={S.p}>The trip coil receives the relay's signal and the breaker opens.</p>

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
            Vacuum Circuit Breaker — executes on the relay's command; it does not decide by itself.
          </figcaption>
        </figure>

        <h3 style={S.h3}>LA — Lightning Arrester</h3>
        <p style={S.p}>The Lightning Arrester provides protection against atmospheric overvoltage transients. It dissipates surge energy into the ground.</p>

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
            Lightning Arrester — safely dissipates surge transients into the ground.
          </figcaption>
        </figure>

        <p style={S.p}>Apart from these, the HT Yard also has: <strong>Isolator</strong> (no-load isolation and a visible break), <strong>Busbar</strong> (the conductor that connects multiple feeders), <strong>Earth Switch</strong> (equipment earthing during maintenance), and <strong>Metering Panel</strong> (billing and SCADA integration).</p>
        <p style={S.p}>Surge protection and earthing are closely related — to understand them more deeply:</p>
        <div style={S.learnMore}>
          <TopicLink slug="lightning-protection" label="Learn More: Lightning Protection" variant="inline" />
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>The HT Yard works like a continuous monitoring and instant response system.</p>

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

        <p style={S.p}>Under normal conditions, the breaker stays closed and power flows smoothly. The CT and PT keep continuously measuring current and voltage.</p>
        <p style={S.p}>Under a fault condition, the relay generates a trip signal, the VCB opens, and the faulted section gets isolated.</p>

        <InsightCard>
          <strong>Relay decides. Breaker executes.</strong> The breaker does not trip by itself. The protection relay analyzes CT/PT inputs. When configured limits are crossed, the relay commands the breaker to open. This isolates the faulted section and protects the downstream infrastructure.
        </InsightCard>

        <p style={S.p}>Further on, power passes through the <TopicLink slug="rmu" label="RMU" variant="inline" /> and the <TopicLink slug="transformer" label="Transformer" variant="inline" />.</p>

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
          This sequence shows what happens during a fault. The CT "feels" the current, the relay decides that it is a fault, and then it opens the breaker to separate the faulted part from the rest of the system — all within a small fraction of a second.
        </WhatYouAreLooking>

        <DCMapNote components={["CT/PT", "Protection Relay", "HT Switchgear"]} />

        <hr style={S.divider} />

        {/* ── Protection Philosophy ── */}
        <h2 id="protection-philosophy" style={S.h1}>Protection Philosophy</h2>

        <p style={S.p}>Protection is the most critical aspect of the HT Yard. Every protection function has its own specific purpose.</p>

        <h3 style={S.h3}>Over Current Protection</h3>
        <p style={S.p}>When current starts flowing above the set limit — such as in a short circuit or overload — the relay detects the overcurrent.</p>
        <p style={S.p}>After a set time delay, the relay gives a trip command to the VCB, so that cables and equipment do not overheat.</p>

        <h3 style={S.h3}>Earth Fault Protection</h3>
        <p style={S.p}>When a live conductor accidentally comes into contact with earth, earth fault current flows.</p>
        <p style={S.p}>The relay detects this unbalanced current and quickly trips the breaker — this is the most common HT fault.</p>

        <h3 style={S.h3}>Under Voltage Protection</h3>
        <p style={S.p}>If the incoming voltage becomes dangerously low, connected equipment can get damaged.</p>
        <p style={S.p}>The under voltage relay detects this condition and safely disconnects the load or raises an alarm.</p>

        <h3 style={S.h3}>Over Voltage Protection</h3>
        <p style={S.p}>Switching surges or grid disturbances can raise the voltage to a dangerous level.</p>
        <p style={S.p}>The over voltage relay takes protective action to protect sensitive equipment.</p>

        <h3 style={S.h3}>Differential Protection</h3>
        <p style={S.p}>Differential protection is the most precise — it compares the "incoming" and "outgoing" current of the protected zone.</p>
        <p style={S.p}>If there is a difference between the two, it means the fault is inside the zone — the relay trips instantly. It is critical in busbar and transformer protection.</p>

        <p style={S.noteText}>Actual protection settings come from a coordination study — they are not arbitrary. They depend on project requirements and OEM relay design.</p>

        <WhyThisMatters>
          In a Data Center, protection must be selective — only the faulted feeder should trip, not the whole yard. If coordination is wrong, a small fault can bring down the whole facility. This "selectivity" is how availability and redundancy are maintained.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Power Quality ── */}
        <h2 id="power-quality" style={S.h1}>Power Quality</h2>

        <p style={S.p}>Grid Supply is reliable, but not perfect. Monitoring power quality is essential for sensitive IT load.</p>

        <h3 style={S.h3}>Harmonics</h3>
        <p style={S.p}>Normal power is a smooth sine wave. But UPS, VFDs and SMPS-based equipment distort this waveform — this distortion is called harmonics.</p>
        <p style={S.p}>Excessive harmonics can overheat transformers and reduce equipment life.</p>

        <h3 style={S.h3}>Voltage Sag</h3>
        <p style={S.p}>A voltage sag is a short-duration voltage drop — often when a large load starts. It can be disruptive for IT equipment.</p>

        <h3 style={S.h3}>Voltage Swell</h3>
        <p style={S.p}>A voltage swell is the opposite of a sag — a short-duration voltage rise. It can also stress sensitive equipment.</p>

        <h3 style={S.h3}>Power Quality Monitoring</h3>
        <p style={S.p}>In Data Centers, dedicated power quality analyzers are installed that continuously monitor harmonics, sag, swell and power factor.</p>
        <p style={S.p}>This data is fed into SCADA/BMS so that issues can be detected early.</p>

        <hr style={S.divider} />

        {/* ── Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <p style={S.p}>HT Yard installation is a structured, safety-critical process.</p>
        <p style={S.p}>First comes the <strong>civil work</strong> — the foundation, cable trench and earthing grid are prepared.</p>
        <p style={S.p}>Then <strong>equipment mounting</strong> — the Lightning Arrester, Isolator, VCB, CT/PT and Busbar are installed in sequence.</p>
        <p style={S.p}>HV cable termination uses a <strong>stress cone</strong> and heat-shrink/cold-shrink kits — these manage electrical stress safely.</p>

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
            HV cable termination — the stress cone distributes electrical stress safely.
          </figcaption>
        </figure>

        <p style={S.p}>Earthing has three separate systems: equipment body earth, neutral earth, and lightning protection earth. To understand them:</p>
        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>
        <p style={S.p}>Mechanical and electrical interlocks are fitted between the isolator and the breaker so that unsafe switching cannot happen.</p>

        <hr style={S.divider} />

        {/* ── Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Before energizing, every component is tested thoroughly.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Insulation Resistance (Megger) Test</strong> — checks cable and equipment insulation</li>
          <li style={S.li}><strong>CT Ratio & Polarity Test</strong> — correct ratio and direction</li>
          <li style={S.li}><strong>PT Ratio & Burden Test</strong> — voltage accuracy</li>
          <li style={S.li}><strong>Relay Secondary Injection Test</strong> — relay settings verify</li>
          <li style={S.li}><strong>VCB Timing & Contact Resistance Test</strong> — breaker performance</li>
          <li style={S.li}><strong>Earthing Resistance Test</strong> — earth electrode quality</li>
        </ul>
        <p style={S.p}>In the final functional test, a fault is simulated — the relay must trip correctly. This test is done in the presence of the utility engineer and the client commissioning team.</p>

        <hr style={S.divider} />

        {/* ── Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>HT Yard operation is carried out under strict procedures — no shortcuts work here.</p>
        <p style={S.p}>Every switching operation is done through <strong>Standard Operating Procedures (SOPs)</strong> and the <strong>Permit to Work (PTW)</strong> system.</p>
        <p style={S.p}>The switching sequence is strictly followed: when closing, the Isolator first, then the Breaker. When opening, the reverse — the Breaker first, then the Isolator.</p>
        <p style={S.p}>Operation can be remote (from SCADA) or local (from the panel), depending on the facility design.</p>

        <hr style={S.divider} />

        {/* ── SCADA & BMS Monitoring ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <p style={S.p}>In modern Data Centers, the HT Yard is continuously monitored through SCADA and BMS.</p>

        <h3 style={S.h3}>Alarm Monitoring</h3>
        <p style={S.p}>Overcurrent, earth fault, PT fuse blown, breaker fail — all these alarms are displayed in real time in the control room.</p>

        <h3 style={S.h3}>Breaker Status</h3>
        <p style={S.p}>The open/closed status of every VCB is monitored live. Operators always know which feeder is energized.</p>

        <h3 style={S.h3}>Event Logs</h3>
        <p style={S.p}>Protection relays maintain time-stamped event logs. After a fault, these logs are critical for root cause analysis.</p>

        <h3 style={S.h3}>Remote Operations</h3>
        <p style={S.p}>Authorized operators can perform breaker operations from the control room itself — physical exposure is reduced.</p>

        <h3 style={S.h3}>Trend Analysis</h3>
        <p style={S.p}>Historical data — load profile, harmonics, power factor — is used for trend analysis, so that predictive decisions can be taken.</p>
        <p style={S.p}>Modern SCADA systems communicate on the IEC 61850 protocol, which is the standard for digital substations.</p>

        <hr style={S.divider} />

        {/* ── Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>The reliability of the HT Yard depends on its maintenance. Common maintenance activities:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Thermographic (IR) Survey</strong> — detecting loose connections and hotspots (quarterly)</li>
          <li style={S.li}><strong>VCB Contact Resistance Test</strong> — breaker health (annually)</li>
          <li style={S.li}><strong>Relay Secondary Injection Test</strong> — protection accuracy (annually)</li>
          <li style={S.li}><strong>CT/PT Testing</strong> — measurement accuracy (biannually)</li>
          <li style={S.li}><strong>Earthing Resistance Test</strong> — earth integrity (biannually)</li>
          <li style={S.li}><strong>Insulator Cleaning</strong> — dust and pollution removal (seasonal)</li>
        </ul>
        <p style={S.noteText}>Maintenance frequency depends on project requirements, OEM recommendations and site conditions.</p>

        <hr style={S.divider} />

        {/* ── Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <p style={S.p}>Some faults are seen again and again in the HT Yard:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>CT Secondary Open Circuit</strong> — extremely dangerous, high voltage build-up</li>
          <li style={S.li}><strong>PT Fuse Blown</strong> — the relay gets the wrong voltage, risk of maloperation</li>
          <li style={S.li}><strong>Breaker Failure</strong> — backup protection should operate</li>
          <li style={S.li}><strong>Earth Fault on Feeder</strong> — the relay clears it within the set time</li>
          <li style={S.li}><strong>Busbar Fault</strong> — the most severe, cleared by differential protection</li>
          <li style={S.li}><strong>Cable Termination Failure</strong> — partial discharge leading to eventual flashover</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Troubleshooting ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <p style={S.p}>The basic approach to troubleshooting: <strong>Receive the alarm → identify the source → isolate → investigate → restore.</strong></p>
        <p style={S.p}>If a PT fuse blown alarm comes, check the fuse first — before blaming the relay.</p>
        <p style={S.p}>If the breaker is not tripping, check the trip coil, the DC control supply and the relay output contacts.</p>
        <p style={S.p}>Telling the difference between a genuine fault and an instrument failure is the most important skill — not every alarm is a real fault.</p>

        <hr style={S.divider} />

        {/* ── Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>Let's understand a real-world scenario — at 3 AM, the incoming utility cable termination fails.</p>

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

        <p style={S.p}>A phase-to-earth fault occurs at the termination. The protection relay detects it in ~80 milliseconds and gives a trip command to the VCB.</p>
        <p style={S.p}>As soon as the VCB opens, the faulted section gets isolated. At that same instant, the <TopicLink slug="ups" label="UPS" variant="inline" /> picks up the load and the <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> provides temporary energy.</p>
        <p style={S.p}>Within a few seconds, the <TopicLink slug="dg-set" label="DG Set" variant="inline" /> starts and takes over the load. If a Dual Grid Feed is available, the secondary path also switches in.</p>
        <p style={S.p}>Total interruption to IT equipment: less than 500 milliseconds. Users don't even realise that anything happened.</p>

        <WhyThisMatters>
          This is the very moment for which the entire redundancy investment is made. In Tier III, this recovery is provided by concurrent maintainability; in Tier IV, by fault tolerance — meaning the service keeps running without interruption even after a fault. This is how 99.99%+ availability is achieved.
        </WhyThisMatters>

        <InsightCard>
          <strong>Tier IV does not automatically mean dual utility.</strong> The real meaning of Tier IV is fault tolerance and concurrent maintainability. This is achieved through dual independent paths — dual utility is helpful but not mandatory. Even on a single utility, fault tolerance can be designed through robust UPS and DG redundancy.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <p style={S.p}>The HT Yard is a high-voltage environment — safety is not negotiable.</p>

        <h3 style={S.h3}>Arc Flash Hazard</h3>
        <p style={S.p}>An arc flash is an explosive electrical discharge that releases extreme heat and pressure. It can be fatal.</p>
        <p style={S.p}>That is why wearing rated Arc Flash PPE (suit, face shield, insulated gloves) is mandatory while working in the HT Yard.</p>

        <h3 style={S.h3}>Arc Flash Boundary</h3>
        <p style={S.p}>The arc flash boundary is the distance within which arc flash exposure can be dangerous. No one can go inside this boundary without proper PPE.</p>

        <h3 style={S.h3}>PTW Workflow</h3>
        <p style={S.p}>In the Permit to Work system, formal authorization must be taken before starting work — who, what, when and how, everything is documented.</p>

        <h3 style={S.h3}>LOTO Workflow</h3>
        <p style={S.p}>In Lockout/Tagout, the equipment is de-energized and physically locked and tagged, so that no one can accidentally energize it.</p>
        <p style={S.p}>Golden rule: <strong>Earth before touch</strong> — always apply the earth switch before work.</p>

        <h3 style={S.h3}>Switching Safety</h3>
        <p style={S.p}>HV switching follows the two-person rule — one person operates, the other verifies. A CT secondary is never opened under load. The single line diagram must always be available.</p>

        <hr style={S.divider} />

        {/* ── OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>HT Yard equipment comes from globally established OEMs. Reliability and after-sales support are critical factors.</p>

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
            HT switchgear — the modular metal-enclosed panel design of major OEMs.
          </figcaption>
        </figure>

        <OEMTable />

        <p style={S.noteText}>OEM selection depends on project requirements, utility approvals, budget and regional availability.</p>

        <hr style={S.divider} />

        {/* ── Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <p style={S.p}>In Tier III, the focus is on concurrent maintainability — maintaining any component should not impact the IT load.</p>
        <p style={S.p}>At the HT Yard level, this is achieved through dual incoming feeders and independent busbar sections.</p>

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

        <p style={S.p}>Through automatic bus transfer (ATS or motorized isolator), while one section is under maintenance, the other takes over the load. Each section feeds independent <TopicLink slug="transformer" label="Transformer" variant="inline" /> banks.</p>

        <hr style={S.divider} />

        {/* ── Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}>Tier IV adds fault tolerance — even a single fault does not interrupt service.</p>
        <p style={S.p}>Here there are two completely independent electrical paths, from grid entry all the way to the server rack, without any crossover.</p>

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

        <p style={S.p}>In Tier IV, the protection systems themselves are also redundant — dual protection relays and dual control power supplies (UPS-backed DC).</p>

        <hr style={S.divider} />

        {/* ── Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}>HT Yard technology is evolving rapidly:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>GIS Adoption</strong> — compact, weather-independent switchgear is replacing outdoor yards</li>
          <li style={S.li}><strong>IEC 61850 Digital Substations</strong> — digital communication in place of hardwired control</li>
          <li style={S.li}><strong>SF6-Free Switchgear</strong> — clean air and CO2-based environmentally friendly alternatives</li>
          <li style={S.li}><strong>AI Predictive Maintenance</strong> — partial discharge monitoring and failure prediction</li>
          <li style={S.li}><strong>BMS Integration</strong> — unified facility monitoring</li>
        </ul>
        <p style={S.p}>As the power demand of AI Data Centers grows, the role of the HT Yard is becoming even more critical.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "The HT Yard is not just a connection point — it is the first protection and switching layer.",
            "Protection philosophy: Relay decides, breaker executes.",
            "A CT secondary must never be open-circuited — life-threatening risk.",
            "The HT Yard is not a substation — no voltage transformation happens here.",
            "Dual Grid Feed reliability starts at the HT Yard level.",
            "Tier IV means fault tolerance, not automatically dual utility.",
            "Safety is non-negotiable — PTW, LOTO and Arc Flash PPE are mandatory.",
            "Future AI Data Centers are shifting to GIS and digital protection.",
          ]}
        />

        <p style={S.p}>Now that you understand the HT Yard, the next logical step is to see how the incoming power is distributed and stepped down further.</p>

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>
              After the HT Yard, the incoming power passes through the RMU and the Transformer — that is where voltage step-down and distribution happen.
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
        <p style={S.p}>The electrical learning path beyond the HT Yard — every topic is the next logical step in the Data Center power chain.</p>
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
