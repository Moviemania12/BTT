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
    "RMU ki complete engineer guide: ring topology, components, fuse protection, SCADA monitoring, Tier III/IV design aur safety — Data Center context mein.",
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

// ─── QuickSummary ─────────────────────────────────────────────────────────────
// Not in TOC — sits between hero image and first section heading

function QuickSummary() {
  const points: { label: string; text: string }[] = [
    {
      label: "Kya hai ek line me",
      text: "RMU ek compact switchgear box hai jo HT Yard aur Transformer ke beech install hoti hai — electricity ko safely route, switch aur protect karti hai.",
    },
    {
      label: "Ring kyun kehte hain",
      text: "Bijli do sources se aa sakti hai — ek source fail ho to doosri side se supply automatically restore ho sakti hai. Ye loop/ring topology hai.",
    },
    {
      label: "Andar kya hota hai",
      text: "Teen main parts — do ring feeder switches (incoming/outgoing) aur ek transformer feeder unit (HV fuses ya circuit breaker). Modern units me solid insulation use hoti hai, SF6 nahi.",
    },
    {
      label: "Data Center me kyun zaroori hai",
      text: "Bina poore HT Yard ko shut kiye ek transformer isolate kar sakte ho. Tier III me do alag RMUs, Tier IV me completely duplicate paths — yehi redundancy ka backbone hai.",
    },
    {
      label: "Ek important baat",
      text: "RMU ke ring switches protection devices nahi hain — ye sirf switching ke liye hain. Protection upstream HT Yard VCB aur relay dete hain.",
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
          background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))",
        }}
      />
      <div
        style={{
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.14)",
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
            color: "var(--color-neon-blue)",
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
                  color: "var(--color-neon-cyan)",
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
                  color: "var(--color-text-secondary)",
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
            borderTop: "1px solid rgba(0,212,255,0.08)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-text-muted)",
          }}
        >
          Bas itna samajh gaye to RMU ka concept clear hai. Agar deeper jaana ho — neeche poora article hai.
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
        <span style={{ ...S.cardLabel, color: "var(--color-neon-blue)" }}>INSIGHT</span>
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
          background: "var(--color-neon-cyan)",
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
            color: "var(--color-neon-cyan)",
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
            color: "var(--color-text-primary)",
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
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
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
                    stroke="var(--color-neon-cyan)"
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
                    color: "var(--color-text-secondary)",
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
                color: "var(--color-neon-blue)",
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
                    color: "var(--color-text-secondary)",
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
        border: "1px solid rgba(0,212,255,0.12)",
        overflow: "hidden",
      }}
    >
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
              <tr
                key={row.equipment}
                style={{
                  background:
                    i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.015)",
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
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
                    color: "var(--color-text-secondary)",
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
          background: "rgba(0,212,255,0.025)",
          border: "1px solid rgba(0,212,255,0.10)",
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
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
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
                      color: "var(--color-text-muted)",
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
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.12)",
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
            color: "var(--color-text-muted)",
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
          background: "rgba(0,212,255,0.03)",
          border: "1px solid rgba(0,212,255,0.12)",
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
            color: "var(--color-text-muted)",
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
    q: "RMU aur simple fused switch me kya difference hai?",
    a: "Simple fused switch sirf local protection deta hai. RMU ring topology support karta hai — dual-feed capability, automatic back-feed, aur better isolation flexibility provide karta hai.",
  },
  {
    q: "RMU ke ring switches me protection relay kyun nahi hoti?",
    a: "Ring feeder switches load break devices hain — unka kaam switching hai, protection nahi. Protection upstream HT Yard VCB provide karta hai. Transformer feeder me HV fuses local transformer protection dete hain.",
  },
  {
    q: "SF6 aur Solid Insulated RMU me choose karna ho to?",
    a: "Naye projects ke liye solid insulated prefer karo — SF6 ka GWP 23,900 hai aur regulatory pressure badh rahi hai. Legacy SF6 units ongoing support ke liye maintain ho sakte hain.",
  },
  {
    q: "RMU ring restoration manually hoti hai ya automatically?",
    a: "Basic RMU me manually — operator NOP (Normally Open Point) close karta hai. Smart motorized RMUs me automatic ring restoration hoti hai via SCADA ya local automation.",
  },
  {
    q: "Data Center me kitne RMUs chahiye?",
    a: "Minimum Tier III ke liye: 2 RMUs — ek per busbar section. Tier IV ke liye: Complete path duplication — RMU-A on Path A, RMU-B on Path B, no crossover.",
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
                : "1px solid rgba(0,212,255,0.08)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--color-text-primary)",
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
              color: "var(--color-text-secondary)",
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

      <ArticleLayout slug="rmu" headings={HEADINGS} readingTimeMinutes={16}>

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
          Ye ek compact metal-enclosed switchgear unit hai. Iske andar ring feeder switches aur transformer feeder unit hoti hai. Bahar se ye ek simple box lagti hai — andar complete switching, isolation aur protection mechanism hota hai.
        </WhatYouAreLooking>

        {/* ── Quick Summary (NOT in TOC) ── */}
        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro body ── */}
        <p style={S.p}>
          HT Yard se electricity campus me enter karti hai. Lekin directly transformer tak nahi jaati. Beech me ek aur critical system hota hai — <strong>RMU (Ring Main Unit)</strong>.
        </p>
        <p style={S.p}>
          RMU ek compact, factory-assembled medium voltage switchgear unit hoti hai jo HT Yard aur Transformer ke beech ka intermediate switching, protection aur isolation point provide karti hai.
        </p>
        <p style={S.p}>
          Ye "Ring" topology ke liye design ki gayi hai — matlab agar ek source fail ho to doosri side se supply automatically restore ho sakti hai.
        </p>
        <div style={S.learnMore}>
          <TopicLink slug="ht-yard" label="Read First: HT Yard" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 1: What Is RMU ── */}
        <h2 id="what-is-rmu" style={S.h1}>What Is RMU?</h2>

        <p style={S.p}>RMU ka full form hai <strong>Ring Main Unit</strong>. Ye ek compact metal-enclosed switchgear unit hoti hai jo medium voltage (11 kV ya 33 kV) distribution networks me use hoti hai.</p>
        <p style={S.p}>Ek standard RMU me typically teen functional units hote hain:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>2 Ring Feeder Switches</strong> — incoming aur outgoing ring feeders ke liye</li>
          <li style={S.li}><strong>1 Transformer Feeder Unit</strong> — transformer ko supply dene ke liye (fuse-switch ya circuit breaker)</li>
        </ul>
        <p style={S.p}>RMU ki sabse badi characteristic hai uska <strong>sealed, compact design</strong> — modern units "sealed for life" hoti hain.</p>

        <WhyThisMatters>
          Data Centers me specifically — RMU allow karta hai transformer-level maintenance without shutting down the HT Yard. Ye concurrent maintainability ka ek critical piece hai jo Tier III aur Tier IV ratings ke liye zaroori hai.
        </WhyThisMatters>

        <DCMapNote components={["RMU", "HT Switchgear", "Transformer Feeder"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2: Why Required ── */}
        <h2 id="why-required" style={S.h1}>Why Is RMU Required?</h2>

        <p style={S.p}>Directly HT Yard se transformer ko connect karna possible hai, lekin practical nahi.</p>
        <p style={S.p}>RMU ye advantages provide karta hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Intermediate Isolation</strong> — ek transformer maintain karte waqt doosre transformers continue karte rehte hain</li>
          <li style={S.li}><strong>Ring Topology Support</strong> — agar ek feeder fail ho to ring ka doosra end power restore kar sakta hai</li>
          <li style={S.li}><strong>Additional Protection Layer</strong> — transformer feeder unit me HV fuses ya circuit breaker transformer ko internal faults se bachate hain</li>
          <li style={S.li}><strong>Compact Footprint</strong> — ek chhoti si unit me complete switching aur protection functionality</li>
        </ul>

        <WhyThisMatters>
          Ek office me agar ek feeder fail ho to kuch ghante ka downtime hota hai. Data Center me wahi fault SLAs breach kar sakta hai. RMU ki ring restoration capability isi impact ko seconds me resolve kar deti hai — yehi 99.99%+ uptime ka hissa hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 3: Where Located ── */}
        <h2 id="where-located" style={S.h1}>Where Is RMU Located?</h2>

        <p style={S.p}>RMU typically HT Yard ke baad, Transformer ke pehle install hoti hai.</p>
        <p style={S.p}>Location: Electrical room ya substation building ke andar, ya HT Yard ke paas dedicated enclosure me.</p>
        <p style={S.p}>Modern RMUs weatherproof hoti hain aur outdoor installation bhi possible hai, lekin Data Centers me generally indoor install ki jati hai.</p>

        <FlowDiagram
          caption="RMU ki position — HT Yard aur Transformer ke beech"
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
        <p style={S.p}>Andar SF6 gas sealed hoti hai. "Sealed for life" design — normal use me gas nahi nikalta.</p>
        <p style={S.p}>Examples: Schneider RM6, ABB SafePlus.</p>

        <h3 style={S.h3}>2. Solid Insulated RMU (Modern — Preferred)</h3>
        <p style={S.p}>SF6 ki jagah epoxy resin insulation use hoti hai. Environment-friendly — SF6 ka Global Warming Potential 23,900 hota hai, isliye industry shift ho rahi hai.</p>
        <p style={S.p}>Examples: Schneider SM6 AIS, ABB SafeLink, Siemens NXPLUS C (new generation).</p>

        <h3 style={S.h3}>3. Air Insulated RMU (Legacy)</h3>
        <p style={S.p}>Older technology, larger size. Aaj ke Data Centers me nahi use hoti.</p>

        <InsightCard>
          <strong>SF6 ek powerful greenhouse gas hai — GWP 23,900.</strong> Matlab ek kilogram SF6 ka climate impact 23,900 kilogram CO₂ ke barabar hai. Isi wajah se naye Data Center projects me solid insulated RMUs preferred choice ban rahi hain. European Union ne 2026 se new SF6 switchgear par restrictions shuru ki hain.
        </InsightCard>

        <p style={S.noteText}>Actual RMU selection project requirements, utility specifications, available space aur OEM design par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 5: Key Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <p style={S.p}>RMU ke har component ka ek specific role hota hai.</p>

        <h3 style={S.h3}>Ring Feeder Switch (×2)</h3>
        <p style={S.p}>Load break switch hota hai — load ke saath open/close kar sakta hai.</p>
        <p style={S.p}><strong>Important:</strong> Inme protection relay nahi hoti — ye sirf switching devices hain. Protection upstream VCB (HT Yard me) provide karta hai.</p>

        <h3 style={S.h3}>Transformer Feeder Unit</h3>
        <p style={S.p}>Ye unit transformer ko directly feed karti hai. Do variants hain:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fuse-Switch Combination</strong> — HV fuses transformer ko internal faults se bachate hain (most common)</li>
          <li style={S.li}><strong>Circuit Breaker with Relay</strong> — larger transformers ke liye, overcurrent + earth fault protection</li>
        </ul>

        <h3 style={S.h3}>Earthing Switch</h3>
        <p style={S.p}>Maintenance ke waqt cable ko earth karne ke liye. Mechanical interlock hota hai — live section par earth switch close nahi ho sakta.</p>

        <h3 style={S.h3}>Cable Connection Compartment</h3>
        <p style={S.p}>Bottom-entry cable boxes hote hain. HV XLPE cable yahan terminate hoti hai — stress cone aur termination kit use hoti hai.</p>

        <h3 style={S.h3}>SF6 Gas Compartment (SF6 type me)</h3>
        <p style={S.p}>Sealed pressure gauge se gas level monitor hota hai. Normal pressure approximately 1.3 bar hoti hai (OEM specs vary karte hain).</p>

        <DCMapNote components={["Ring Feeder Switch", "Transformer Feeder", "HV Fuse", "Earthing Switch"]} />

        <hr style={S.divider} />

        {/* ── SECTION 6: Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <h3 style={S.h3}>Normal Ring Operation</h3>
        <p style={S.p}>Power do directions se aa sakti hai — yahi "ring" ka matlab hai. Normally ek point ring me <strong>open</strong> rakha jata hai — ise Normally Open Point (NOP) kehte hain.</p>
        <p style={S.p}>Dono sources available hain, lekin current sirf ek direction se flow karta hai.</p>

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
        <p style={S.p}>Agar Source A side me fault aa jaye — Source A side ka Ring Switch 1 open ho jata hai. Normally Open Point (doosri RMU par) close ho jata hai. Supply Source B side se restore ho jati hai.</p>
        <p style={S.p}>Ye "back-feed" ya "ring restoration" kehlata hai — isi wajah se Ring Main Unit naam pada.</p>

        <h3 style={S.h3}>Transformer Feeder Operation</h3>
        <p style={S.p}>Agar transformer me internal fault aaye — HV fuses blow ho jate hain milliseconds me. Transformer isolate ho jata hai, ring unaffected rehti hai.</p>

        <InsightCard>
          <strong>Ring switches protection devices nahi hain — ye switching devices hain.</strong> RMU ke ring feeder switches ka kaam sirf route select karna hai. Protection ka kaam HT Yard ka VCB aur protection relay karte hain. Transformer feeder me HV fuses transformer ko local protection dete hain — lekin inka relay se koi lena-dena nahi. Ye distinction field me bahut important hai.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 7: RMU vs HT Yard VCB ── */}
        <h2 id="rmu-vs-ht-yard-vcb" style={S.h1}>RMU vs HT Yard VCB</h2>

        <p style={S.p}>Ye ek common confusion hai — clear karna zaruri hai.</p>

        <ComparisonCard
          tag="Key Differences"
          leftTitle="HT Yard VCB"
          leftItems={[
            "Incoming utility supply receive karta hai",
            "Full protection relay (CT + PT + numerical relay)",
            "High interrupting capacity",
            "Utility-grade protection settings",
            "Fault current interrupt karta hai",
          ]}
          rightTitle="RMU Ring Switch"
                    rightItems={[
            "Distribution switching ke liye",
            "Load break capability only",
            "Protection relay nahi hoti (generally)",
            "Sirf load switch on/off karta hai",
            "Fault current interrupt nahi kar sakta",
          ]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 8: Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <h3 style={S.h3}>Step 1: Civil Foundation</h3>
        <p style={S.p}>Concrete plinth with cable entry holes (bottom entry). Earthing provision in foundation. Adequate space for cable bending radius.</p>

        <h3 style={S.h3}>Step 2: RMU Positioning</h3>
        <p style={S.p}>Lifting point par handle karo — RMU heavy hoti hai (200–500 kg typically). Level mounting mandatory — tilt allowed nahi hota, especially SF6 units me.</p>

        <h3 style={S.h3}>Step 3: HV Cable Termination</h3>
        <p style={S.p}>HV XLPE cable termination — stress cone application zaruri hai. Heat-shrink ya cold-shrink kits use hote hain.</p>
        <p style={S.p}>Same process as HT Yard cable termination — koi shortcut nahi.</p>

        <h3 style={S.h3}>Step 4: Gas Pressure Check (SF6 type)</h3>
        <p style={S.p}>Factory fill hoti hai, site par verify karo. Pressure gauge green zone me honi chahiye before energizing.</p>

        <h3 style={S.h3}>Step 5: Earthing Connection</h3>
        <p style={S.p}>Body earth aur cable screen earth alag-alag points hote hain. Dono connections mandatory hain.</p>
        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 9: Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Pre-energization checks mandatory hain — bina complete testing ke RMU energize nahi hoti.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Insulation Resistance (Megger) Test</strong> — all cables, all phases</li>
          <li style={S.li}><strong>Switch Mechanical Operation Test</strong> — manual open/close verify</li>
          <li style={S.li}><strong>Earthing Switch Interlock Verification</strong> — live section par earth switch close nahi hona chahiye</li>
          <li style={S.li}><strong>Gas Pressure Verification</strong> — SF6 type ke liye</li>
          <li style={S.li}><strong>Earth Continuity Test</strong> — body earth resistance</li>
          <li style={S.li}><strong>Fuse Rating Verification</strong> — coordination study ke against check</li>
        </ul>
        <p style={S.p}>HV Withstand Test optional lekin recommended hai — 2 × rated voltage for 1 minute.</p>
        <p style={S.p}>Commissioning records me gas pressure, switch operations aur cable termination photos document hone chahiye.</p>

        <hr style={S.divider} />

        {/* ── SECTION 10: Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>RMU operation simple hoti hai lekin SOPs follow karna mandatory hai — yahan koi shortcut nahi chalta.</p>

        <h3 style={S.h3}>Normal Switching Sequence</h3>
        <p style={S.p}><strong>Opening:</strong> Transformer Feeder Switch → Ring Switch 2 → Ring Switch 1</p>
        <p style={S.p}><strong>Closing:</strong> Reverse order — Ring Switch 1 → Ring Switch 2 → Transformer Feeder Switch</p>

        <h3 style={S.h3}>Ring Restoration Procedure</h3>
        <p style={S.p}>Source A fault → Ring Switch 1 open confirm karo → Normally Open Point close karo → Supply restored from B.</p>

        <h3 style={S.h3}>Key Operational Rules</h3>
        <ul style={S.ul}>
          <li style={S.li}>Kabhi bhi energized cable ke saath earth switch close mat karo — mechanical interlock prevent karta hai, lekin procedure me bhi clearly mention hona chahiye</li>
          <li style={S.li}>Fuse replacement: Pehle transformer feeder switch open karo, phir earth karo, phir fuse change karo</li>
          <li style={S.li}>Ring switch operation load ke saath ho sakta hai (load break), lekin fault current ke saath nahi</li>
          <li style={S.li}>Har switching operation PTW (Permit to Work) ke under honi chahiye</li>
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
          <li style={S.li}>Trip indication (agar circuit breaker type hai)</li>
          <li style={S.li}>Load current monitoring (agar CT fitted hai)</li>
          <li style={S.li}>Remote operation capability (motorized switches wali units me)</li>
        </ul>

        <h3 style={S.h3}>Data Center Integration</h3>
        <p style={S.p}>Modbus RTU ya IEC 61850 interface se SCADA/BMS me integrate hoti hai.</p>
        <p style={S.p}>Alarms: Fuse blown, gas low, switch status change — sab real-time control room me visible hote hain.</p>

        <WhyThisMatters>
          Data Center operations team ko 24/7 pata hona chahiye ki kaunsi RMU switch open hai, kaunsi closed hai. Bina SCADA monitoring ke, field me jaake check karna padega — jisse response time badhta hai aur availability risk hota hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 12: Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>SF6 "Sealed for Life" RMU ka sabse bada advantage: <strong>Minimal maintenance required.</strong></p>

        <h3 style={S.h3}>Annual Checks</h3>
        <ul style={S.ul}>
          <li style={S.li}>Visual inspection — body, cable boxes, cable entries</li>
          <li style={S.li}>SF6 pressure gauge check (green zone me hona chahiye)</li>
          <li style={S.li}>Cable termination IR scan — thermography</li>
          <li style={S.li}>Switch position indicator check</li>
          <li style={S.li}>Mechanical operation test — manual</li>
        </ul>

        <h3 style={S.h3}>Every 5 Years (ya OEM Recommendation ke Anusar)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Contact resistance measurement</li>
          <li style={S.li}>Insulation resistance test</li>
          <li style={S.li}>Functional test of all switches aur interlocks</li>
          <li style={S.li}>Cable termination re-inspection</li>
        </ul>

        <h3 style={S.h3}>After Any Fault Event</h3>
        <p style={S.p}>Visual inspection for signs of arcing ya burning. Gas pressure re-check. Cable termination inspection before re-energizing.</p>

        <p style={S.noteText}>Maintenance frequency project requirements, OEM recommendations aur site conditions par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 13: Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>HV Fuse Operation (Most Common)</h3>
        <p style={S.p}>Transformer internal fault ya severe overload par fuse blow hota hai milliseconds me.</p>
        <p style={S.p}>Indication: Trip indicator on transformer feeder unit. Recovery: Transformer fault investigate karo, clear karo, fuse replace karo, HV test karo.</p>

        <h3 style={S.h3}>Cable Termination Failure</h3>
        <p style={S.p}>Partial discharge se eventually flashover develop hota hai. Common causes: Poor installation, moisture ingress, mechanical damage.</p>
        <p style={S.p}>Indication: Earth fault alarm upstream (HT Yard relay se).</p>

        <h3 style={S.h3}>SF6 Gas Leakage (SF6 type)</h3>
        <p style={S.p}>Older units me seals degrade ho sakti hain. Pressure gauge minimum se neeche drop karti hai.</p>
        <p style={S.p}>Action: Unit use band karo, OEM service call karo immediately.</p>

        <h3 style={S.h3}>Fuse Wrong Rating</h3>
        <p style={S.p}>Incorrect fuse selection ya coordination mismatch ke wajah se upstream VCB trip hone se pehle fuse blow ho jata hai.</p>
        <p style={S.p}>Prevention: Coordination study follow karna mandatory hai — arbitrary fuse ratings nahi.</p>

        <h3 style={S.h3}>Earthing Switch Malfunction</h3>
        <p style={S.p}>Interlock mechanism jam ho sakti hai — dangerous situation. Regular mechanical test important hai.</p>
        <p style={S.p}>Never force or bypass — OEM se service lao.</p>

        <hr style={S.divider} />

        {/* ── SECTION 14: Troubleshooting ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <p style={S.p}>Basic approach: <strong>Alarm receive karo → source identify karo → isolate karo → investigate karo → restore karo.</strong></p>

        <h3 style={S.h3}>Fuse Blown Alarm</h3>
        <ul style={S.ul}>
          <li style={S.li}>Transformer feeder switch open confirm karo</li>
          <li style={S.li}>Earth switch apply karo</li>
          <li style={S.li}>Visual inspection for damage</li>
          <li style={S.li}>Fuse replace karo — correct rating verify karo against coordination study</li>
          <li style={S.li}>Transformer HV test karo before re-energizing</li>
          <li style={S.li}>Agar fuse immediately dobara blow ho — transformer fault assumed, DO NOT re-energize</li>
        </ul>

        <h3 style={S.h3}>Gas Low Alarm (SF6 type)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Koi cover mat kholo</li>
          <li style={S.li}>External damage ya loose connections check karo</li>
          <li style={S.li}>OEM se gas refill / leak repair ke liye contact karo</li>
          <li style={S.li}>Gas critically low — treat as out of service, isolate karo</li>
        </ul>

        <h3 style={S.h3}>Loss of Supply on Transformer Feeder</h3>
        <ul style={S.ul}>
          <li style={S.li}>Upstream ring switches — dono closed hain?</li>
          <li style={S.li}>Fuse continuity check karo (non-contact voltage tester first)</li>
          <li style={S.li}>Transformer HV terminals par voltage check karo</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 15: Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>Raat ke 2 baje — Data Center transformer feeder RMU fuse blows.</p>

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

        <p style={S.p}>Transformer A me winding fault develop hota hai. Fault current HV fuse blow kar deta hai — approximately 50 milliseconds ke andar.</p>
        <p style={S.p}>Transformer A de-energized ho jata hai. HT Yard relay ko fault nahi dikhta — kyunki fuse already clear kar chuka hai.</p>
        <p style={S.p}><TopicLink slug="ups" label="UPS System" variant="inline" /> load pick kar leta hai. <TopicLink slug="dg-set" label="DG Set" variant="inline" /> automatically start hota hai.</p>
        <p style={S.p}>Engineers mobilize hote hain — RMU transformer feeder unit open confirm karte hain, earth switch apply karte hain, transformer inspect karte hain.</p>
        <p style={S.p}>Transformer B load le leta hai (N+1 design ki wajah se). Service continuity maintained throughout.</p>

        <WhyThisMatters>
          Yahi woh moment hai jiske liye poora N+1 transformer design investment kiya jata hai. Tier III me ye concurrently maintainable scenario hai — Tier IV me fault tolerance, yaani ek transformer fail ho to bhi poori service bina blink ke chalti rehti hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 16: Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <h3 style={S.h3}>SF6 Gas Handling</h3>
        <p style={S.p}>SF6 ek powerful greenhouse gas hai (GWP 23,900). Kabhi bhi deliberately atmosphere me release mat karo. Damaged unit se gas leak ho rahi ho to self-contained breathing apparatus use karo (enclosed spaces me).</p>

        <h3 style={S.h3}>Before Any Work on RMU</h3>
        <ul style={S.ul}>
          <li style={S.li}>PTW (Permit to Work) mandatory</li>
          <li style={S.li}>Dono ring sides pe voltage indicator se verify dead karo</li>
          <li style={S.li}>Earth switch apply karo</li>
          <li style={S.li}>Lockout/Tagout (LOTO) complete karo</li>
        </ul>

        <h3 style={S.h3}>HV Fuse Replacement</h3>
        <p style={S.p}>Full arc flash PPE mandatory: HRC suit, face shield, insulated gloves.</p>
        <p style={S.p}>Fuse rating coordination study se verify karo before installation — old fuse rating assume mat karo.</p>

        <h3 style={S.h3}>Cable Box Work</h3>
        <p style={S.p}>Isolation ke baad bhi cable capacitance par residual charge possible hai.</p>
        <p style={S.p}>Touch karne se pehle short circuit aur earth karo.</p>

        <h3 style={S.h3}>Mechanical Interlocks</h3>
        <p style={S.p}>Kabhi bhi interlocks force ya bypass mat karo — ye last line of defense hai. Jam ho jaye to OEM service lao, DIY repair mat karo.</p>
        <div style={S.learnMore}>
          <TopicLink slug="lightning-protection" label="Learn More: Lightning Protection" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 17: OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>RMU equipment globally established OEMs se aata hai. Reliability, spares availability aur local service support critical factors hote hain Data Center projects me.</p>

        <OEMTable />

        <p style={S.noteText}>OEM selection project requirements, utility approvals, budget aur regional availability par depend karti hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 18: Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <p style={S.p}>Tier III me concurrent maintainability chahiye — koi bhi component maintain karte waqt IT load impact nahi hona chahiye.</p>
        <p style={S.p}>RMU level par ye achieve hoti hai do independent units se:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>RMU-A</strong> feeds Transformer Bank A — connected to HT Busbar Section A</li>
          <li style={S.li}><strong>RMU-B</strong> feeds Transformer Bank B — connected to HT Busbar Section B</li>
        </ul>
        <p style={S.p}>Agar RMU-A under maintenance ho — RMU-B continues, Transformer Bank B carries load. Dono RMUs ka ek doosre se koi physical connection nahi hona chahiye.</p>
        <div style={S.learnMore}>
          <TopicLink slug="transformer" label="Learn More: Transformer" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 19: Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}>Tier IV me complete path independence — RMU bhi duplicate hoti hai.</p>

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
        <p style={S.p}>RMU-A ki failure Path B ko kisi bhi tarah affect nahi karti.</p>

        <InsightCard>
          <strong>Tier IV ka matlab automatically dual utility nahi hai.</strong> Tier IV fault tolerance aur concurrent maintainability hai — ye dual independent paths se achieve hoti hai. Single utility par bhi robust UPS, <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> aur <TopicLink slug="dg-set" label="DG Set" variant="inline" /> redundancy se Tier IV design ki ja sakti hai. RMU-level redundancy is architecture ka ek piece hai, sab kuch nahi.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 20: Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}>RMU technology rapidly evolve ho rahi hai — Data Center power demands ke saath:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>SF6 Phase-Out</strong> — Environmental regulations ki wajah se solid insulated RMUs mainstream ban rahi hain. EU 2026 se new SF6 equipment restrict kar raha hai.</li>
          <li style={S.li}><strong>Smart RMU / IoT Enabled</strong> — Remote monitoring, motorized switching, fault detection, automatic ring restoration without human intervention.</li>
          <li style={S.li}><strong>Self-Healing Grid Concepts</strong> — SCADA-controlled automatic reconfiguration of ring topology on fault detection.</li>
          <li style={S.li}><strong>Compact Indoor GIS-Based RMUs</strong> — Space-constrained urban Data Centers ke liye ultra-compact designs.</li>
          <li style={S.li}><strong>IEC 61850 Integration</strong> — Digital substation communication replacing hardwired controls.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "RMU HT Yard aur Transformer ke beech ka intermediate switching aur protection point hai.",
            "Ring topology fault se quick recovery allow karti hai — ek source fail ho to doosri side restore karti hai.",
            "Transformer feeder unit (fuses ya breaker) transformer ko protect karti hai — ring switches protection devices nahi hain.",
            "Modern SF6-free solid insulated RMUs preferred hain — environment aur regulatory compliance.",
            "Tier III me: Dual independent RMUs on separate HT Busbar sections.",
            "Tier IV me: Complete path duplication — RMU-A aur RMU-B fully independent.",
            "SF6 gas GWP 23,900 hai — proper handling aur disposal mandatory.",
            "Sealed for life design ne RMU maintenance requirements dramatically reduce kar di hain.",
          ]}
        />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div
            style={{
              height: 2,
              background:
                "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))",
            }}
          />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "var(--color-neon-cyan)" }}>
              WHAT&apos;S NEXT
            </span>
            <div style={S.cardContent}>
              RMU ke baad supply Transformer tak jaati hai — wahan 11 kV ya 33 kV voltage step-down hokar 433 V ban jata hai jo building ka LV distribution feed karta hai.
            </div>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              <TopicLink slug="transformer" label="Next: Transformer →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>RMU ke aage ka electrical learning path — har topic Data Center power chain ka agla logical step hai.</p>
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
