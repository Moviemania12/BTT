// ─── TODO: Future articles required to complete this learning path ────────────
//
// The following TopicLink slugs are used in this article (Continue Learning,
// inline links, PrevNextNav). Each needs its own page.tsx before that link
// resolves to a real article rather than the generic stub fallback.
//
// TODO: app/learn/non-it/electrical/transformer/page.tsx
//       Transformer — voltage step-down, tap changer, cooling, Tier III/IV
//
// TODO: app/learn/non-it/electrical/dg-set/page.tsx
//       Diesel Generator Set — AMF panel, load transfer, fuel management
//
// TODO: app/learn/non-it/electrical/ups/page.tsx
//       UPS System — online double-conversion, battery runtime, bypass
//
// TODO: app/learn/non-it/electrical/earthing/page.tsx
//       Earthing System — electrode types, resistance testing, Data Center
//
// TODO: app/learn/non-it/electrical/lightning-protection/page.tsx
//       Lightning Protection — LPS design, surge protection, bonding
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "RMU (Ring Main Unit) in Data Centers — Behind The Tech",
  description:
    "A complete engineer guide to the RMU: ring topology, components, fuse protection, SCADA monitoring, Tier III/IV design and safety — in a Data Center context.",
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/rmu",
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/rmu",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/rmu",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/rmu",
    },
  },
};

// ─── TOC headings (QuickSummary + FAQ excluded per gold-standard pattern) ─────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-rmu",              text: "What Is RMU?",                   level: 2 },
  { id: "why-required",             text: "Why Is RMU Required?",           level: 2 },
  { id: "where-located",            text: "Where Is RMU Located?",          level: 2 },
  { id: "types-of-rmu",             text: "Types of RMU",                   level: 2 },
  { id: "key-components",           text: "Key Components",                 level: 2 },
  { id: "working-principle",        text: "Working Principle",              level: 2 },
  { id: "rmu-vs-ht-yard-vcb",       text: "RMU vs HT Yard VCB",            level: 2 },
  { id: "installation",             text: "Installation Process",           level: 2 },
  { id: "testing-commissioning",    text: "Testing & Commissioning",        level: 2 },
  { id: "operation",                text: "Operation",                      level: 2 },
  { id: "scada-bms-monitoring",     text: "SCADA & BMS Monitoring",         level: 2 },
  { id: "maintenance",              text: "Maintenance",                    level: 2 },
  { id: "common-faults",            text: "Common Faults",                  level: 2 },
  { id: "troubleshooting",          text: "Troubleshooting",                level: 2 },
  { id: "failure-scenario",         text: "Failure Scenario",               level: 2 },
  { id: "safety-practices",         text: "Safety Practices",               level: 2 },
  { id: "oems-vendors",             text: "OEMs & Vendors",                 level: 2 },
  { id: "tier-3-design",            text: "Tier III Design",                level: 2 },
  { id: "tier-4-design",            text: "Tier IV Design",                 level: 2 },
  { id: "future-trends",            text: "Future Trends",                  level: 2 },
  { id: "key-takeaways",            text: "Key Takeaways",                  level: 2 },
];

// ─── Shared inline styles ─────────────────────────────────────────────────────

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

// ─── QuickSummary ─────────────────────────────────────────────────────────────
// Not in TOC — sits between hero image and first section heading

function QuickSummary() {
  const points: { label: string; text: string }[] = [
    {
      label: "What it is, in one line",
      text: "An RMU is a compact switchgear box installed between the HT Yard and the Transformer — it safely routes, switches and protects electricity.",
    },
    {
      label: "Why it is called a Ring",
      text: "Power can come from two sources — if one source fails, supply can be automatically restored from the other side. This is a loop/ring topology.",
    },
    {
      label: "What is inside",
      text: "Three main parts — two ring feeder switches (incoming/outgoing) and one transformer feeder unit (HV fuses or circuit breaker). Modern units use solid insulation, not SF6.",
    },
    {
      label: "Why it is essential in a Data Center",
      text: "You can isolate one transformer without shutting down the entire HT Yard. Two separate RMUs in Tier III, completely duplicate paths in Tier IV — this is the backbone of redundancy.",
    },
    {
      label: "One important point",
      text: "The RMU's ring switches are not protection devices — they are only for switching. Protection is provided by the upstream HT Yard VCB and relay.",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        margin: "8px 0 32px",
      }}
    >
      <div
        style={{
          height: 2,
          background: "linear-gradient(90deg, #2563EB, #2563EB)",
        }}
      />
      <div
        style={{
          background: "rgba(37,99,235,0.03)",
          border: "1px solid rgba(37,99,235,0.14)",
          borderTop: "none",
          padding: "20px 22px 22px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.26em",
            color: "#2563EB",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          ⚡ QUICK SUMMARY — 2 MINUTE READ
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {points.map((pt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#2563EB",
                  paddingTop: 3,
                  minWidth: 130,
                }}
              >
                {pt.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "#1f2937",
                }}
              >
                {pt.text}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: "1px solid rgba(37,99,235,0.08)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#1f2937",
          }}
        >
          If you have understood this much, the RMU concept is clear. If you want to go deeper — the full article is below.
        </div>
      </div>
    </div>
  );
}

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

// ─── WhyThisMatters ───────────────────────────────────────────────────────────

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
      <div
        style={{
          height: 2,
          background: "#2563EB",
          boxShadow: "0 0 8px rgba(0,255,204,0.4)",
        }}
      />
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
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.65,
            color: "#1f2937",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── WhatYouAreLooking ────────────────────────────────────────────────────────

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
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "#1f2937",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── DCMapNote ────────────────────────────────────────────────────────────────

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
                  <path
                    d="M4 13l5 5L20 6"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {leftItems.map((a, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#1f2937",
                  }}
                >
                  {a}
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
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {rightItems.map((d, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "#1f2937",
                  }}
                >
                  {d}
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
  { equipment: "SF6 RMU",                oems: "Schneider RM6, ABB SafePlus" },
  { equipment: "Solid Insulated RMU",    oems: "Schneider SM6 AIS, ABB SafeLink, Siemens NXPLUS C" },
  { equipment: "HV Fuses",               oems: "ABB, Siemens, Eaton" },
  { equipment: "Lucy Electric",          oems: "RMU specialist — common in South Asia" },
  { equipment: "Indian Market",          oems: "L&T (licensed), Havells (smaller ratings)" },
];

function OEMTable() {
  return (
    <div
      style={{
        margin: "20px 0 28px",
        borderRadius: 10,
        border: "1px solid rgba(37,99,235,0.12)",
        overflow: "hidden",
      }}
    >
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
              <tr
                key={row.equipment}
                style={{
                  background:
                    i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)",
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#1f2937",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.equipment}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "#1f2937",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
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

// ─── FlowDiagram ──────────────────────────────────────────────────────────────

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 4,
            justifyContent: "center",
          }}
        >
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
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#1f2937",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </span>
                {step.sublabel && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "#1f2937",
                    }}
                  >
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

// ─── ContinueLearning ─────────────────────────────────────────────────────────

function ContinueLearning() {
  // transformer → has a real article (app/learn/non-it/electrical/transformer/)
  // Others currently render stub fallback until dedicated page.tsx is created
  const slugs = [
    "ht-yard",
    "transformer",
    "dg-set",
    "ups",
    "earthing",
    "lightning-protection",
  ];
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

// ─── PrevNextNav ──────────────────────────────────────────────────────────────
// Prev: ht-yard (order 2) | Curr: rmu (order 3) | Next: transformer (order 4)

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
          ← Previous
        </span>
        <TopicLink slug="ht-yard" label="HT Yard" variant="inline" />
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
          Next →
        </span>
        <TopicLink slug="transformer" label="Transformer" variant="inline" />
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the difference between an RMU and a simple fused switch?",
    a: "A simple fused switch only provides local protection. An RMU supports ring topology — it provides dual-feed capability, automatic back-feed, and better isolation flexibility.",
  },
  {
    q: "Why is there no protection relay in the RMU's ring switches?",
    a: "Ring feeder switches are load break devices — their job is switching, not protection. Protection is provided by the upstream HT Yard VCB. In the transformer feeder, HV fuses provide local transformer protection.",
  },
  {
    q: "What if I have to choose between an SF6 and a Solid Insulated RMU?",
    a: "For new projects, prefer solid insulated — the GWP of SF6 is 23,900 and regulatory pressure is increasing. Legacy SF6 units can be maintained for ongoing support.",
  },
  {
    q: "Is RMU ring restoration manual or automatic?",
    a: "In a basic RMU it is manual — the operator closes the NOP (Normally Open Point). Smart motorized RMUs have automatic ring restoration via SCADA or local automation.",
  },
  {
    q: "How many RMUs does a Data Center need?",
    a: "Minimum for Tier III: 2 RMUs — one per busbar section. For Tier IV: Complete path duplication — RMU-A on Path A, RMU-B on Path B, no crossover.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "18px 0",
            borderBottom:
              i === FAQS.length - 1
                ? "none"
                : "1px solid rgba(37,99,235,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              color: "#1f2937",
              marginBottom: 8,
            }}
          >
            {item.q}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.65,
              color: "#1f2937",
              margin: 0,
            }}
          >
            {item.a}
          </p>
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

export default function RmuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ArticleLayout slug="rmu" headings={HEADINGS} readingTimeMinutes={16} lang="en" alternateHref="/hi/learn/non-it/electrical/rmu">

        {/* ── Hero Image ── */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/rmu/rmu-overview.png"
              alt="RMU Ring Main Unit — compact switchgear installed between HT infrastructure and transformers"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            RMU (Ring Main Unit) — the switching and isolation layer between HT infrastructure and transformers in a Data Center.
          </figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a compact metal-enclosed switchgear unit. Inside it are the ring feeder switches and the transformer feeder unit. From outside it looks like a simple box — inside there is a complete switching, isolation and protection mechanism.
        </WhatYouAreLooking>

        {/* ── Quick Summary (NOT in TOC) ── */}
        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro body ── */}
        <p style={S.p}>
          Electricity enters the campus from the HT Yard. But it does not go directly to the transformer. There is one more critical system in between — <strong>the RMU (Ring Main Unit)</strong>.
        </p>
        <p style={S.p}>
          An RMU is a compact, factory-assembled medium voltage switchgear unit that provides the intermediate switching, protection and isolation point between the HT Yard and the Transformer.
        </p>
        <p style={S.p}>
          It is designed for a "Ring" topology — meaning that if one source fails, supply can be automatically restored from the other side.
        </p>
        <div style={S.learnMore}>
          <TopicLink slug="ht-yard" label="Read First: HT Yard" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 1: What Is RMU ── */}
        <h2 id="what-is-rmu" style={S.h1}>What Is RMU?</h2>

        <p style={S.p}>The full form of RMU is <strong>Ring Main Unit</strong>. It is a compact metal-enclosed switchgear unit used in medium voltage (11 kV or 33 kV) distribution networks.</p>
        <p style={S.p}>A standard RMU typically has three functional units:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>2 Ring Feeder Switches</strong> — for the incoming and outgoing ring feeders</li>
          <li style={S.li}><strong>1 Transformer Feeder Unit</strong> — to supply the transformer (fuse-switch or circuit breaker)</li>
        </ul>
        <p style={S.p}>The biggest characteristic of an RMU is its <strong>sealed, compact design</strong> — modern units are "sealed for life".</p>

        <WhyThisMatters>
          Specifically in Data Centers — the RMU allows transformer-level maintenance without shutting down the HT Yard. It is a critical piece of concurrent maintainability, which is essential for Tier III and Tier IV ratings.
        </WhyThisMatters>

        <DCMapNote components={["RMU", "HT Switchgear", "Transformer Feeder"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2: Why Required ── */}
        <h2 id="why-required" style={S.h1}>Why Is RMU Required?</h2>

        <p style={S.p}>Connecting the transformer directly from the HT Yard is possible, but not practical.</p>
        <p style={S.p}>The RMU provides these advantages:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Intermediate Isolation</strong> — while one transformer is being maintained, the other transformers keep running</li>
          <li style={S.li}><strong>Ring Topology Support</strong> — if one feeder fails, the other end of the ring can restore power</li>
          <li style={S.li}><strong>Additional Protection Layer</strong> — HV fuses or a circuit breaker in the transformer feeder unit protect the transformer from internal faults</li>
          <li style={S.li}><strong>Compact Footprint</strong> — complete switching and protection functionality in one small unit</li>
        </ul>

        <WhyThisMatters>
          If a feeder fails in an office, it causes a few hours of downtime. In a Data Center, the same fault can breach SLAs. The RMU's ring restoration capability resolves this impact in seconds — this is part of 99.99%+ uptime.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 3: Where Located ── */}
        <h2 id="where-located" style={S.h1}>Where Is RMU Located?</h2>

        <p style={S.p}>An RMU is typically installed after the HT Yard and before the Transformer.</p>
        <p style={S.p}>Location: Inside the electrical room or substation building, or in a dedicated enclosure near the HT Yard.</p>
        <p style={S.p}>Modern RMUs are weatherproof and outdoor installation is also possible, but in Data Centers they are generally installed indoors.</p>

        <FlowDiagram
          caption="Position of the RMU — between the HT Yard and the Transformer"
          steps={[
            { icon: "⚡", label: "Grid Supply" },
            { icon: "🔐", label: "HT Yard", sublabel: "VCB + Relay" },
            { icon: "🔁", label: "RMU", sublabel: "Ring Switches" },
            { icon: "🔄", label: "Transformer", sublabel: "11kV → 433V" },
            { icon: "🏢", label: "LV Panel" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 4: Types ── */}
        <h2 id="types-of-rmu" style={S.h1}>Types of RMU</h2>

        <h3 style={S.h3}>1. SF6 Gas Insulated RMU (Traditional)</h3>
        <p style={S.p}>SF6 gas is sealed inside. "Sealed for life" design — the gas does not escape in normal use.</p>
        <p style={S.p}>Examples: Schneider RM6, ABB SafePlus.</p>

        <h3 style={S.h3}>2. Solid Insulated RMU (Modern — Preferred)</h3>
        <p style={S.p}>Epoxy resin insulation is used instead of SF6. Environment-friendly — the Global Warming Potential of SF6 is 23,900, which is why the industry is shifting.</p>
        <p style={S.p}>Examples: Schneider SM6 AIS, ABB SafeLink, Siemens NXPLUS C (new generation).</p>

        <h3 style={S.h3}>3. Air Insulated RMU (Legacy)</h3>
        <p style={S.p}>Older technology, larger size. Not used in today's Data Centers.</p>

        <InsightCard>
          <strong>SF6 is a powerful greenhouse gas — GWP 23,900.</strong> This means the climate impact of one kilogram of SF6 equals 23,900 kilograms of CO₂. That is why solid insulated RMUs are becoming the preferred choice in new Data Center projects. The European Union has started restrictions on new SF6 switchgear from 2026.
        </InsightCard>

        <p style={S.noteText}>Actual RMU selection depends on project requirements, utility specifications, available space and OEM design.</p>

        <hr style={S.divider} />

        {/* ── SECTION 5: Key Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <p style={S.p}>Every component of the RMU has a specific role.</p>

        <h3 style={S.h3}>Ring Feeder Switch (×2)</h3>
        <p style={S.p}>It is a load break switch — it can open/close with load.</p>
        <p style={S.p}><strong>Important:</strong> These have no protection relay — they are only switching devices. Protection is provided by the upstream VCB (in the HT Yard).</p>

        <h3 style={S.h3}>Transformer Feeder Unit</h3>
        <p style={S.p}>This unit feeds the transformer directly. There are two variants:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fuse-Switch Combination</strong> — HV fuses protect the transformer from internal faults (most common)</li>
          <li style={S.li}><strong>Circuit Breaker with Relay</strong> — for larger transformers, overcurrent + earth fault protection</li>
        </ul>

        <h3 style={S.h3}>Earthing Switch</h3>
        <p style={S.p}>For earthing the cable during maintenance. There is a mechanical interlock — the earth switch cannot close on a live section.</p>

        <h3 style={S.h3}>Cable Connection Compartment</h3>
        <p style={S.p}>These are bottom-entry cable boxes. The HV XLPE cable terminates here — a stress cone and termination kit are used.</p>

        <h3 style={S.h3}>SF6 Gas Compartment (in the SF6 type)</h3>
        <p style={S.p}>The gas level is monitored with a sealed pressure gauge. Normal pressure is approximately 1.3 bar (OEM specs vary).</p>

        <DCMapNote components={["Ring Feeder Switch", "Transformer Feeder", "HV Fuse", "Earthing Switch"]} />

        <hr style={S.divider} />

        {/* ── SECTION 6: Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <h3 style={S.h3}>Normal Ring Operation</h3>
        <p style={S.p}>Power can come from two directions — that is what "ring" means. Normally one point in the ring is kept <strong>open</strong> — this is called the Normally Open Point (NOP).</p>
        <p style={S.p}>Both sources are available, but current flows from only one direction.</p>

        <FlowDiagram
          caption="Ring topology — dual source, one normally open point"
          steps={[
            { icon: "⚡", label: "Source A", sublabel: "HT Yard A" },
            { icon: "🔁", label: "Ring Switch 1", sublabel: "CLOSED" },
            { icon: "🏭", label: "Transformer", sublabel: "Load" },
            { icon: "🔁", label: "Ring Switch 2", sublabel: "NOP — OPEN" },
            { icon: "⚡", label: "Source B", sublabel: "HT Yard B" },
          ]}
        />

        <h3 style={S.h3}>Fault on One Ring Section</h3>
        <p style={S.p}>If a fault occurs on the Source A side — Ring Switch 1 on the Source A side opens. The Normally Open Point (on the other RMU) closes. Supply is restored from the Source B side.</p>
        <p style={S.p}>This is called "back-feed" or "ring restoration" — this is why it got the name Ring Main Unit.</p>

        <h3 style={S.h3}>Transformer Feeder Operation</h3>
        <p style={S.p}>If an internal fault occurs in the transformer — the HV fuses blow within milliseconds. The transformer gets isolated, and the ring remains unaffected.</p>

        <InsightCard>
          <strong>Ring switches are not protection devices — they are switching devices.</strong> The job of the RMU's ring feeder switches is only to select the route. Protection is done by the HT Yard's VCB and protection relay. In the transformer feeder, HV fuses give local protection to the transformer — but they have nothing to do with the relay. This distinction is very important in the field.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 7: RMU vs HT Yard VCB ── */}
        <h2 id="rmu-vs-ht-yard-vcb" style={S.h1}>RMU vs HT Yard VCB</h2>

        <p style={S.p}>This is a common confusion — it is essential to clear it up.</p>

        <ComparisonCard
          tag="Key Differences"
          leftTitle="HT Yard VCB"
          leftItems={[
            "Receives the incoming utility supply",
            "Full protection relay (CT + PT + numerical relay)",
            "High interrupting capacity",
            "Utility-grade protection settings",
            "Interrupts fault current",
          ]}
          rightTitle="RMU Ring Switch"
                    rightItems={[
            "For distribution switching",
            "Load break capability only",
            "No protection relay (generally)",
            "Only switches the load on/off",
            "Cannot interrupt fault current",
          ]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 8: Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <h3 style={S.h3}>Step 1: Civil Foundation</h3>
        <p style={S.p}>Concrete plinth with cable entry holes (bottom entry). Earthing provision in foundation. Adequate space for cable bending radius.</p>

        <h3 style={S.h3}>Step 2: RMU Positioning</h3>
        <p style={S.p}>Handle it at the lifting points — an RMU is heavy (200–500 kg typically). Level mounting is mandatory — tilt is not allowed, especially in SF6 units.</p>

        <h3 style={S.h3}>Step 3: HV Cable Termination</h3>
        <p style={S.p}>HV XLPE cable termination — applying a stress cone is essential. Heat-shrink or cold-shrink kits are used.</p>
        <p style={S.p}>Same process as HT Yard cable termination — no shortcuts.</p>

        <h3 style={S.h3}>Step 4: Gas Pressure Check (SF6 type)</h3>
        <p style={S.p}>It is factory filled; verify it on site. The pressure gauge must be in the green zone before energizing.</p>

        <h3 style={S.h3}>Step 5: Earthing Connection</h3>
        <p style={S.p}>Body earth and cable screen earth are separate points. Both connections are mandatory.</p>
        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 9: Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Pre-energization checks are mandatory — an RMU is not energized without complete testing.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Insulation Resistance (Megger) Test</strong> — all cables, all phases</li>
          <li style={S.li}><strong>Switch Mechanical Operation Test</strong> — manual open/close verify</li>
          <li style={S.li}><strong>Earthing Switch Interlock Verification</strong> — the earth switch must not close on a live section</li>
          <li style={S.li}><strong>Gas Pressure Verification</strong> — for the SF6 type</li>
          <li style={S.li}><strong>Earth Continuity Test</strong> — body earth resistance</li>
          <li style={S.li}><strong>Fuse Rating Verification</strong> — check against the coordination study</li>
        </ul>
        <p style={S.p}>The HV Withstand Test is optional but recommended — 2 × rated voltage for 1 minute.</p>
        <p style={S.p}>Gas pressure, switch operations and cable termination photos should be documented in the commissioning records.</p>

        <hr style={S.divider} />

        {/* ── SECTION 10: Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>RMU operation is simple, but following SOPs is mandatory — no shortcuts work here.</p>

        <h3 style={S.h3}>Normal Switching Sequence</h3>
        <p style={S.p}><strong>Opening:</strong> Transformer Feeder Switch → Ring Switch 2 → Ring Switch 1</p>
        <p style={S.p}><strong>Closing:</strong> Reverse order — Ring Switch 1 → Ring Switch 2 → Transformer Feeder Switch</p>

        <h3 style={S.h3}>Ring Restoration Procedure</h3>
        <p style={S.p}>Source A fault → confirm Ring Switch 1 is open → close the Normally Open Point → Supply restored from B.</p>

        <h3 style={S.h3}>Key Operational Rules</h3>
        <ul style={S.ul}>
          <li style={S.li}>Never close the earth switch with an energized cable — the mechanical interlock prevents it, but it should also be clearly mentioned in the procedure</li>
          <li style={S.li}>Fuse replacement: First open the transformer feeder switch, then earth it, then change the fuse</li>
          <li style={S.li}>Ring switch operation can be done with load (load break), but not with fault current</li>
          <li style={S.li}>Every switching operation must be done under a PTW (Permit to Work)</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 11: SCADA ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <h3 style={S.h3}>Basic Monitoring (Standard RMU)</h3>
        <p style={S.p}>Visual indication: Switch position indicators (open/closed) on fascia. Gas pressure gauge (SF6 type) — visual check.</p>

        <h3 style={S.h3}>Advanced Monitoring (Modern RMU with SCADA)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Remote switch position status (open/closed)</li>
          <li style={S.li}>Gas pressure alarm — low SF6 pressure alert</li>
          <li style={S.li}>Trip indication (if it is a circuit breaker type)</li>
          <li style={S.li}>Load current monitoring (if a CT is fitted)</li>
          <li style={S.li}>Remote operation capability (in units with motorized switches)</li>
        </ul>

        <h3 style={S.h3}>Data Center Integration</h3>
        <p style={S.p}>It is integrated into SCADA/BMS through a Modbus RTU or IEC 61850 interface.</p>
        <p style={S.p}>Alarms: Fuse blown, gas low, switch status change — all are visible in real time in the control room.</p>

        <WhyThisMatters>
          The Data Center operations team must know 24/7 which RMU switch is open and which is closed. Without SCADA monitoring, someone has to go to the field to check — which increases response time and creates availability risk.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 12: Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>The biggest advantage of an SF6 "Sealed for Life" RMU: <strong>Minimal maintenance required.</strong></p>

        <h3 style={S.h3}>Annual Checks</h3>
        <ul style={S.ul}>
          <li style={S.li}>Visual inspection — body, cable boxes, cable entries</li>
          <li style={S.li}>SF6 pressure gauge check (should be in the green zone)</li>
          <li style={S.li}>Cable termination IR scan — thermography</li>
          <li style={S.li}>Switch position indicator check</li>
          <li style={S.li}>Mechanical operation test — manual</li>
        </ul>

        <h3 style={S.h3}>Every 5 Years (or as per OEM Recommendation)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Contact resistance measurement</li>
          <li style={S.li}>Insulation resistance test</li>
          <li style={S.li}>Functional test of all switches and interlocks</li>
          <li style={S.li}>Cable termination re-inspection</li>
        </ul>

        <h3 style={S.h3}>After Any Fault Event</h3>
        <p style={S.p}>Visual inspection for signs of arcing or burning. Gas pressure re-check. Cable termination inspection before re-energizing.</p>

        <p style={S.noteText}>Maintenance frequency depends on project requirements, OEM recommendations and site conditions.</p>

        <hr style={S.divider} />

        {/* ── SECTION 13: Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>HV Fuse Operation (Most Common)</h3>
        <p style={S.p}>The fuse blows within milliseconds on a transformer internal fault or severe overload.</p>
        <p style={S.p}>Indication: Trip indicator on the transformer feeder unit. Recovery: Investigate the transformer fault, clear it, replace the fuse, do an HV test.</p>

        <h3 style={S.h3}>Cable Termination Failure</h3>
        <p style={S.p}>Partial discharge eventually develops into a flashover. Common causes: Poor installation, moisture ingress, mechanical damage.</p>
        <p style={S.p}>Indication: Earth fault alarm upstream (from the HT Yard relay).</p>

        <h3 style={S.h3}>SF6 Gas Leakage (SF6 type)</h3>
        <p style={S.p}>In older units, seals can degrade. The pressure gauge drops below minimum.</p>
        <p style={S.p}>Action: Stop using the unit, call OEM service immediately.</p>

        <h3 style={S.h3}>Fuse Wrong Rating</h3>
        <p style={S.p}>Due to incorrect fuse selection or a coordination mismatch, the fuse blows before the upstream VCB trips.</p>
        <p style={S.p}>Prevention: Following the coordination study is mandatory — no arbitrary fuse ratings.</p>

        <h3 style={S.h3}>Earthing Switch Malfunction</h3>
        <p style={S.p}>The interlock mechanism can jam — a dangerous situation. Regular mechanical testing is important.</p>
        <p style={S.p}>Never force or bypass — get service from the OEM.</p>

        <hr style={S.divider} />

        {/* ── SECTION 14: Troubleshooting ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <p style={S.p}>Basic approach: <strong>Receive the alarm → identify the source → isolate → investigate → restore.</strong></p>

        <h3 style={S.h3}>Fuse Blown Alarm</h3>
        <ul style={S.ul}>
          <li style={S.li}>Confirm the transformer feeder switch is open</li>
          <li style={S.li}>Apply the earth switch</li>
          <li style={S.li}>Visual inspection for damage</li>
          <li style={S.li}>Replace the fuse — verify the correct rating against the coordination study</li>
          <li style={S.li}>Do a transformer HV test before re-energizing</li>
          <li style={S.li}>If the fuse blows again immediately — transformer fault assumed, DO NOT re-energize</li>
        </ul>

        <h3 style={S.h3}>Gas Low Alarm (SF6 type)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Do not open any cover</li>
          <li style={S.li}>Check for external damage or loose connections</li>
          <li style={S.li}>Contact the OEM for gas refill / leak repair</li>
          <li style={S.li}>Gas critically low — treat as out of service, isolate it</li>
        </ul>

        <h3 style={S.h3}>Loss of Supply on Transformer Feeder</h3>
        <ul style={S.ul}>
          <li style={S.li}>Upstream ring switches — are both closed?</li>
          <li style={S.li}>Check fuse continuity (non-contact voltage tester first)</li>
          <li style={S.li}>Check voltage at the transformer HV terminals</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 15: Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>2 AM — a Data Center transformer feeder RMU fuse blows.</p>

        <FlowDiagram
          caption="2 AM transformer fault — automatic isolation sequence"
          steps={[
            { icon: "🌙", label: "Transformer Fault", sublabel: "2 AM" },
            { icon: "💥", label: "HV Fuse Blows", sublabel: "~50ms" },
            { icon: "🔌", label: "Transformer Isolated" },
            { icon: "🔋", label: "UPS Supports Load" },
            { icon: "🔧", label: "DG Starts" },
            { icon: "✅", label: "IT Load Unaffected" },
          ]}
        />

        <p style={S.p}>A winding fault develops in Transformer A. The fault current blows the HV fuse — within approximately 50 milliseconds.</p>
        <p style={S.p}>Transformer A gets de-energized. The HT Yard relay does not see the fault — because the fuse has already cleared it.</p>
        <p style={S.p}>The <TopicLink slug="ups" label="UPS System" variant="inline" /> picks up the load. The <TopicLink slug="dg-set" label="DG Set" variant="inline" /> starts automatically.</p>
        <p style={S.p}>Engineers mobilize — they confirm the RMU transformer feeder unit is open, apply the earth switch and inspect the transformer.</p>
        <p style={S.p}>Transformer B takes the load (because of the N+1 design). Service continuity is maintained throughout.</p>

        <WhyThisMatters>
          This is the very moment for which the entire N+1 transformer design investment is made. In Tier III this is a concurrently maintainable scenario — in Tier IV it is fault tolerance, meaning that even if a transformer fails, the entire service keeps running without a blink.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 16: Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <h3 style={S.h3}>SF6 Gas Handling</h3>
        <p style={S.p}>SF6 is a powerful greenhouse gas (GWP 23,900). Never release it into the atmosphere deliberately. If gas is leaking from a damaged unit, use a self-contained breathing apparatus (in enclosed spaces).</p>

        <h3 style={S.h3}>Before Any Work on RMU</h3>
        <ul style={S.ul}>
          <li style={S.li}>PTW (Permit to Work) mandatory</li>
          <li style={S.li}>Verify dead on both ring sides with a voltage indicator</li>
          <li style={S.li}>Apply the earth switch</li>
          <li style={S.li}>Complete Lockout/Tagout (LOTO)</li>
        </ul>

        <h3 style={S.h3}>HV Fuse Replacement</h3>
        <p style={S.p}>Full arc flash PPE mandatory: HRC suit, face shield, insulated gloves.</p>
        <p style={S.p}>Verify the fuse rating from the coordination study before installation — do not assume the old fuse rating.</p>

        <h3 style={S.h3}>Cable Box Work</h3>
        <p style={S.p}>Even after isolation, residual charge is possible due to cable capacitance.</p>
        <p style={S.p}>Short circuit and earth it before touching.</p>

        <h3 style={S.h3}>Mechanical Interlocks</h3>
        <p style={S.p}>Never force or bypass interlocks — they are the last line of defense. If one jams, get OEM service; do not attempt a DIY repair.</p>
        <div style={S.learnMore}>
          <TopicLink slug="lightning-protection" label="Learn More: Lightning Protection" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 17: OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>RMU equipment comes from globally established OEMs. Reliability, spares availability and local service support are critical factors in Data Center projects.</p>

        <OEMTable />

        <p style={S.noteText}>OEM selection depends on project requirements, utility approvals, budget and regional availability.</p>

        <hr style={S.divider} />

        {/* ── SECTION 18: Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <p style={S.p}>Tier III requires concurrent maintainability — maintaining any component should not impact the IT load.</p>
        <p style={S.p}>At the RMU level, this is achieved through two independent units:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>RMU-A</strong> feeds Transformer Bank A — connected to HT Busbar Section A</li>
          <li style={S.li}><strong>RMU-B</strong> feeds Transformer Bank B — connected to HT Busbar Section B</li>
        </ul>
        <p style={S.p}>If RMU-A is under maintenance — RMU-B continues, and Transformer Bank B carries the load. The two RMUs should have no physical connection with each other.</p>
        <div style={S.learnMore}>
          <TopicLink slug="transformer" label="Learn More: Transformer" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 19: Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}>Tier IV has complete path independence — the RMU is also duplicated.</p>

        <ComparisonCard
          tag="Tier III vs Tier IV — RMU Level"
          leftTitle="Tier III"
          leftItems={[
            "Dual RMUs on separate busbar sections",
            "Concurrent maintainability",
            "One path at a time",
            "N+1 transformer design",
          ]}
          rightTitle="Tier IV"
          rightItems={[
            "Fully independent RMU-A and RMU-B",
            "Fault tolerance + concurrent maintainability",
            "Both paths simultaneously active",
            "2N transformer design",
          ]}
        />

        <p style={S.p}>Path A: HT Yard A → RMU-A → Transformer A → LV Panel A → <TopicLink slug="ups" label="UPS A" variant="inline" /> → Server</p>
        <p style={S.p}>Path B: HT Yard B → RMU-B → Transformer B → LV Panel B → UPS B → Server</p>
        <p style={S.p}>A failure of RMU-A does not affect Path B in any way.</p>

        <InsightCard>
          <strong>Tier IV does not automatically mean dual utility.</strong> Tier IV is fault tolerance and concurrent maintainability — this is achieved through dual independent paths. Even on a single utility, Tier IV can be designed through robust UPS, <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> and <TopicLink slug="dg-set" label="DG Set" variant="inline" /> redundancy. RMU-level redundancy is one piece of this architecture, not everything.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 20: Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}>RMU technology is evolving rapidly — along with Data Center power demands:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>SF6 Phase-Out</strong> — Because of environmental regulations, solid insulated RMUs are becoming mainstream. The EU is restricting new SF6 equipment from 2026.</li>
          <li style={S.li}><strong>Smart RMU / IoT Enabled</strong> — Remote monitoring, motorized switching, fault detection, automatic ring restoration without human intervention.</li>
          <li style={S.li}><strong>Self-Healing Grid Concepts</strong> — SCADA-controlled automatic reconfiguration of ring topology on fault detection.</li>
          <li style={S.li}><strong>Compact Indoor GIS-Based RMUs</strong> — Ultra-compact designs for space-constrained urban Data Centers.</li>
          <li style={S.li}><strong>IEC 61850 Integration</strong> — Digital substation communication replacing hardwired controls.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "The RMU is the intermediate switching and protection point between the HT Yard and the Transformer.",
            "Ring topology allows quick recovery from a fault — if one source fails, the other side restores supply.",
            "The transformer feeder unit (fuses or breaker) protects the transformer — ring switches are not protection devices.",
            "Modern SF6-free solid insulated RMUs are preferred — for the environment and regulatory compliance.",
            "In Tier III: Dual independent RMUs on separate HT Busbar sections.",
            "In Tier IV: Complete path duplication — RMU-A and RMU-B fully independent.",
            "SF6 gas has a GWP of 23,900 — proper handling and disposal are mandatory.",
            "The sealed for life design has dramatically reduced RMU maintenance requirements.",
          ]}
        />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div
            style={{
              height: 2,
              background:
                "linear-gradient(90deg, #2563EB, #2563EB)",
            }}
          />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>
              WHAT&apos;S NEXT
            </span>
            <div style={S.cardContent}>
              After the RMU, the supply goes to the Transformer — there, the 11 kV or 33 kV voltage is stepped down to 433 V, which feeds the building's LV distribution.
            </div>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              <TopicLink slug="transformer" label="Next: Transformer →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>The electrical learning path beyond the RMU — every topic is the next logical step in the Data Center power chain.</p>
        <ContinueLearning />

        <hr style={S.divider} />

        {/* ── Prev / Next nav ── */}
        <PrevNextNav />

        <hr style={S.divider} />

        {/* ── FAQ (body only, not in TOC) ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

      </ArticleLayout>
    </>
  );
}
