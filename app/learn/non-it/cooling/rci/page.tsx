import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "RCI — Rack Cooling Index in Data Centers | Behind The Tech",
  description:
    "What is RCI, how is it calculated, what is a good RCI — the Rack Cooling Index is the metric of Data Center cooling effectiveness. A complete guide in simple English.",
  keywords: [
    "rci rack cooling index",
    "rack cooling index data center",
    "rci calculation",
    "data center cooling metric",
    "rci rhi data center",
  ],
  openGraph: {
    title: "RCI — Rack Cooling Index in Data Centers",
    description:
      "RCI and RHI — the report card of Data Center cooling. How it is calculated, what a good score is, and how to improve it.",
    url: "https://behindthetech.in/learn/non-it/cooling/rci",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCI Explained — Behind The Tech",
    description:
      "Rack Cooling Index — the metric of Data Center cooling effectiveness. Complete guide.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/rci",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/rci",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/rci",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/rci",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-rci",          text: "What Is RCI?",                        level: 2 },
  { id: "why-needed",           text: "Why Is RCI Needed?",                  level: 2 },
  { id: "working-principle",    text: "How RCI Is Calculated",               level: 2 },
  { id: "rci-formula",          text: "RCI Formula Step by Step",            level: 2 },
  { id: "rhi",                  text: "RHI — Return Heat Index",             level: 2 },
  { id: "main-components",      text: "What You Need to Measure RCI",        level: 2 },
  { id: "how-it-works-in-dc",   text: "RCI in a Real Data Center",           level: 2 },
  { id: "types",                text: "RCI Score Ranges",                    level: 2 },
  { id: "advantages",           text: "Why RCI Is Useful",                   level: 2 },
  { id: "disadvantages",        text: "Limitations of RCI",                  level: 2 },
  { id: "real-example",         text: "Real Calculation Example",            level: 2 },
  { id: "common-faults",        text: "Common Causes of Poor RCI",           level: 2 },
  { id: "preventive-maintenance", text: "How to Maintain Good RCI",          level: 2 },
  { id: "daily-checklist",      text: "Daily Checklist",                     level: 2 },
  { id: "monthly-checklist",    text: "Monthly Checklist",                   level: 2 },
  { id: "safety",               text: "Safety Notes",                        level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                 level: 2 },
  { id: "troubleshooting",      text: "Troubleshooting Guide",               level: 2 },
  { id: "comparison",           text: "RCI vs PUE vs RHI",                   level: 2 },
  { id: "best-practices",       text: "Best Practices",                      level: 2 },
  { id: "key-takeaways",        text: "Key Takeaways",                       level: 2 },
];

const S = {
  h1: { fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,2.5vw,1.9rem)", letterSpacing: "0.04em", color: "#111827", lineHeight: 1.15, marginTop: 64, marginBottom: 16 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.5rem)", letterSpacing: "0.04em", color: "#111827", lineHeight: 1.2, marginTop: 56, marginBottom: 14 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#111827", lineHeight: 1.3, marginTop: 28, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 16, color: "#1f2937" } as React.CSSProperties,
  ul: { paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column" as const, gap: 6 } as React.CSSProperties,
  li: { color: "#1f2937", lineHeight: 1.65 } as React.CSSProperties,
  divider: { border: "none", borderTop: "1px solid rgba(37,99,235,0.08)", margin: "12px 0" } as React.CSSProperties,
  articleImage: { position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", margin: 0, border: "1px solid rgba(37,99,235,0.12)" } as React.CSSProperties,
  imageFigure: { margin: "8px 0 24px" } as React.CSSProperties,
  imageCaption: { fontFamily: "var(--font-body)", fontSize: 12.5, color: "#1f2937", textAlign: "center" as const, marginTop: 8 } as React.CSSProperties,
  cardWrap: { position: "relative" as const, borderRadius: 10, overflow: "hidden" as const, margin: "28px 0" } as React.CSSProperties,
  cardAccentBlue: { height: 2, background: "#2563EB" } as React.CSSProperties,
  cardBodyInsight: { background: "rgba(37,99,235,0.035)", border: "1px solid rgba(37,99,235,0.16)", borderTop: "none", padding: "18px 22px 20px" } as React.CSSProperties,
  cardLabel: { display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", fontWeight: 600, marginBottom: 10 } as React.CSSProperties,
  cardContent: { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#1f2937" } as React.CSSProperties,
};

// ─── QuickSummary ─────────────────────────────────────────────────────────────

function QuickSummary() {
  const pts = [
    {
      label: "In one line",
      text: "RCI is a number — from 0% to 100% — that tells how much of the cool air servers in a Data Center are getting is within the right temperature range.",
    },
    {
      label: "What 100% means",
      text: "Every server's inlet temperature is within the ASHRAE recommended range. No rack is overheating. Perfect cooling delivery.",
    },
    {
      label: "What 0% means",
      text: "All servers are outside the recommended range — either too hot or too cold (over-cooling). The cooling system is not working properly.",
    },
    {
      label: "What the target should be",
      text: "RCI > 91% = Excellent. 81–90% = Good. 71–80% = Fair. < 70% = Poor — immediate action needed.",
    },
    {
      label: "How it is used",
      text: "Measure every rack's inlet temperature with temperature sensors. Calculate RCI with the formula. Low RCI = there is a cooling problem — find it and fix it.",
    },
    {
      label: "What RHI is",
      text: "RHI = Return Heat Index — measures how much hot air the PAC/CRAC is getting back. High RHI = good (all heat captured). Low RHI = bypass air is happening.",
    },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
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
          📊 QUICK SUMMARY — 2 MINUTE READ
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#2563EB",
                  paddingTop: 3,
                  minWidth: 130,
                }}
              >
                {pt.label}
              </span>
              <span
                style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}
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
          If you have understood this much, the RCI concept is clear. The full article ahead has the calculation, examples and troubleshooting.
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

// ─── EngineerTip ──────────────────────────────────────────────────────────────

function EngineerTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#ffa500" }} /> <div style={{ background: "rgba(255,165,0,0.04)", border: "1px solid rgba(255,165,0,0.16)", borderTop: "none", padding: "16px 20px 18px", }} > <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#ffa500", fontWeight: 600, marginBottom: 9, }} > Engineer's Tip </span> <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}> {children}
        </div>
      </div>
    </div>
  );
}

// ─── WhyThisMatters ───────────────────────────────────────────────────────────

function WhyThisMatters({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#2563EB" }} />
      <div
        style={{
          background: "rgba(0,255,204,0.04)",
          border: "1px solid rgba(0,255,204,0.18)",
          borderTop: "none",
          padding: "16px 20px 18px",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
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
          textTransform: "uppercase" as const,
          color: "#1f2937",
          marginBottom: 8,
        }}
      >
        On The Data Center Map
      </span>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
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
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        background: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(0,255,204,0.03))",
        border: "1px solid rgba(37,99,235,0.16)",
        overflow: "hidden",
        margin: "32px 0",
      }}
    >
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.26em",
            color: "#2563EB",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          KEY TAKEAWAYS
        </span>
        <ul
          style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span
                style={{
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
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "#1f2937" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FlowDiagram ──────────────────────────────────────────────────────────────

function FlowDiagram({
  caption,
  steps,
}: {
  caption: string;
  steps: { icon: string; label: string; sublabel?: string }[];
}) {
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
            flexWrap: "wrap" as const,
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
                  flexDirection: "column" as const,
                  alignItems: "center",
                  gap: 6,
                  minWidth: 86,
                  textAlign: "center" as const,
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

// ─── ScoreCard ────────────────────────────────────────────────────────────────

function ScoreCard({
  rows,
}: {
  rows: { range: string; label: string; action: string; color: string }[];
}) {
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "rgba(37,99,235,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>RCI Score</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Rating</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>What It Means</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
              <td style={{ padding: "9px 14px", border: "1px solid rgba(37,99,235,0.08)", fontWeight: 700, color: row.color }}>{row.range}</td>
              <td style={{ padding: "9px 14px", border: "1px solid rgba(37,99,235,0.08)", fontWeight: 600, color: row.color }}>{row.label}</td>
              <td style={{ padding: "9px 14px", border: "1px solid rgba(37,99,235,0.08)", color: "#1f2937" }}>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── ComparisonTable ──────────────────────────────────────────────────────────

function ComparisonTable({ rows }: { rows: { feature: string; rci: string; other: string; otherLabel?: string }[] }) {
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "rgba(37,99,235,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>RCI</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>RHI</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>PUE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)" }}>{row.rci}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)" }}>{row.other}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)" }}>{row.otherLabel ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the difference between RCI and PUE?",
    a: "PUE (Power Usage Effectiveness) measures how much of the Data Center's total power goes to IT equipment — it is an energy efficiency metric. RCI measures how effective the cooling delivery is — it is a cooling quality metric. A data center can have a PUE of 1.3 (good) but an RCI of 75% (poor) — it is energy efficient but the cooling is not reaching the right places. Both metrics are essential.",
  },
  {
    q: "What is the ASHRAE recommended inlet temperature range?",
    a: "ASHRAE TC 9.9 thermal guidelines have Classes. Class A1 (most servers): 15°C to 32°C inlet. Class A2: 10°C to 35°C. Recommended (ideal) range: 18°C to 27°C. RCI calculation typically uses the recommended range. Going outside the allowable range also affects equipment life.",
  },
  {
    q: "Should RCI be calculated manually or with software?",
    a: "In small data centers manual calculation is possible — temperature measurements, a spreadsheet, apply the formula. In large data centers DCIM software calculates it automatically — real-time data from hundreds of sensors. In the industry, DCIM tools like EkkoSense, Nlyte and Sunbird report RCI automatically. Shift to software after a manual baseline.",
  },
  {
    q: "Is achieving 100% RCI realistic?",
    a: "It is theoretically possible — if all servers are in the recommended range. Practically, 95%+ is excellent. 91-95% is also very good. Staying at 100% is hard because load constantly changes, there are maintenance windows, and equipment changes happen. Target: consistently maintain 91%+. Alert below 80%.",
  },
  {
    q: "What should the RHI (Return Heat Index) target be?",
    a: "RHI target: > 91% excellent. ASHRAE recommendation: RHI > 91% means the PAC/CRAC is getting proper hot return air — bypass air is low. Low RHI (< 80%) indicates that a lot of cool air is bypassing back to the PAC — cooling units are short-cycling and are not actually contributing to server cooling.",
  },
  {
    q: "Is RCI a standard mandatory metric?",
    a: "RCI and RHI have been defined by ASHRAE TC 9.9 — it is an industry standard. It is not mandatory but it is best practice. In Uptime Institute Tier certification, cooling effectiveness is an important factor. Cooling metrics are also considered in Green Star certifications. Serious data centers track these regularly.",
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
            borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(37,99,235,0.08)",
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
            style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937", margin: 0 }}
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

export default function RCIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout slug="rci" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/cooling/rci">

        {/* ── Intro ── */}
        <p style={S.p}>
          Imagine a Data Center with 200 racks. The PAC units are running. The cooling system is running.
        </p>
        <p style={S.p}>
          But the CPU temperature of some servers is going above 75°C — alarms are coming. Some servers are throttling — performance is dropping.
        </p>
        <p style={S.p}>
          <strong>What is the problem? The cooling system is running.</strong>
        </p>
        <p style={S.p}>
          It does not matter just that the cooling system runs — what matters is <strong>whether the cooling is being delivered to the right place, at the right temperature.</strong>
        </p>
        <p style={S.p}>
          The answer to this question comes from — <strong>RCI (Rack Cooling Index).</strong>
        </p>
        <p style={S.p}>
          RCI is a metric — a number — that tells how effective the cooling delivery is.
        </p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/rci/rci-temperature-measurement-racks.png"
              alt="Temperature sensors measuring rack inlet temperatures for RCI calculation in a data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            RCI measurement — collect data from every rack's inlet temperature sensor. These numbers are used to calculate RCI.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Section 1 ── */}
        <h2 id="what-is-rci" style={S.h1}>What Is RCI?</h2>

        <p style={S.p}>
          <strong>RCI = Rack Cooling Index.</strong>
        </p>
        <p style={S.p}>
          It is a percentage metric — from 0% to 100% — that measures <strong>how many servers in the Data Center are getting cool air within the recommended temperature range.</strong>
        </p>
        <p style={S.p}>
          ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) defined this metric. The ASHRAE TC 9.9 committee maintains the Data Center thermal management standards.
        </p>
        <p style={S.p}><strong>RCI 100% = Perfect.</strong> Every server's inlet temperature is within the ASHRAE recommended range.</p>
        <p style={S.p}><strong>RCI 0% = Catastrophic.</strong> No server is within the recommended range.</p>
        <p style={S.p}>
          In real data centers the target is <strong>RCI &gt; 91%.</strong>
        </p>

        <InsightCard>
          RCI does not only track over-heating — it also detects over-cooling. If servers are much too cold (below 18°C), that is also energy waste — the cooling is running more than needed. RCI penalises both extremes — going outside the perfect range costs points in the score.
        </InsightCard>

        <DCMapNote components={["Temperature Sensors", "DCIM Software", "Rack Inlets", "Cold Aisle", "PAC/CRAC Units"]} />

        <hr style={S.divider} />

        {/* ── Section 2 ── */}
        <h2 id="why-needed" style={S.h1}>Why Is RCI Needed?</h2>

        <p style={S.p}>
          Confirming that a PAC unit is running in the Data Center is not enough.
        </p>
        <p style={S.p}>
          It is essential to confirm that:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Every rack is getting adequate cool air</li>
          <li style={S.li}>No rack is in an overheating zone</li>
          <li style={S.li}>Cool air is not being wasted (over-cooling)</li>
          <li style={S.li}>Cooling improvement actions are having an actual effect</li>
        </ul>

        <WhyThisMatters>
          Without RCI, data center operators manage cooling by "feel" — they find out there is a problem when a server alarm comes. RCI is proactive — you find out that cooling is deteriorating before servers alarm. After an RCI survey, fix the blanking panels, floor tiles, containment gaps — everything. Result: server reliability improves, energy cost reduces.
        </WhyThisMatters>

        <p style={S.p}>
          <strong>Practical example:</strong> A new rack was installed. No alarm came. But RCI dropped from 88% to 79%. Some older racks are now taking in warm air. Without RCI this was invisible.
        </p>

        <hr style={S.divider} />

        {/* ── Section 3 ── */}
        <h2 id="working-principle" style={S.h1}>How RCI Is Calculated</h2>

        <p style={S.p}>
          To calculate RCI you need just one thing: <strong>the inlet temperature of every rack.</strong>
        </p>
        <p style={S.p}>
          Inlet temperature = at the front face of the server, at the bottom of the rack (or at multiple points) — this is where cool air enters.
        </p>
        <p style={S.p}>
          ASHRAE has defined temperature ranges:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Recommended range:</strong> 18°C – 27°C (ideal for most servers)</li>
          <li style={S.li}><strong>Allowable range (upper):</strong> 27°C – 35°C (varies according to equipment specs)</li>
          <li style={S.li}><strong>Below recommended:</strong> &lt; 18°C (over-cooling — energy waste)</li>
          <li style={S.li}><strong>Above allowable:</strong> &gt; 35°C (equipment damage zone)</li>
        </ul>
        <p style={S.p}>
          The RCI formula measures these deviations and expresses them as a single percentage.
        </p>

        <FlowDiagram
          caption="RCI measurement and calculation process"
          steps={[
            { icon: "🌡️", label: "Measure", sublabel: "Rack inlet temps" },
            { icon: "📋", label: "Compare", sublabel: "vs ASHRAE range" },
            { icon: "➕", label: "Calculate", sublabel: "Total deviation" },
            { icon: "📊", label: "RCI %", sublabel: "Score output" },
            { icon: "🔧", label: "Act", sublabel: "Fix low scores" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── Section 4 ── */}
        <h2 id="rci-formula" style={S.h1}>RCI Formula Step by Step</h2>

        <p style={S.p}>
          RCI has two parts:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>RCI(HI)</strong> — High side: racks that are hotter than recommended</li>
          <li style={S.li}><strong>RCI(LO)</strong> — Low side: racks that are colder than recommended</li>
        </ul>
        <p style={S.p}>
          Both are calculated separately, then a combined score is obtained.
        </p>

        <h3 style={S.h3}>RCI(HI) — Over-Temperature Penalty</h3>
        <p style={S.p}>
          For every rack, check: is the inlet temperature above 27°C?
        </p>
        <p style={S.p}>
          If yes, <strong>calculate the deviation:</strong>
        </p>
        <p style={S.p}>
          <strong>Deviation = Actual temperature − T_recommended_max (27°C)</strong>
        </p>
        <p style={S.p}>
          Sum this deviation for all racks.
        </p>
        <p style={S.p}>
          <strong>Formula:</strong>
        </p>
        <div
          style={{
            background: "rgba(37,99,235,0.04)",
            border: "1px solid rgba(37,99,235,0.15)",
            borderRadius: 8,
            padding: "14px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "#1f2937",
            margin: "12px 0 20px",
            lineHeight: 1.8,
          }}
        >
          RCI(HI) = 1 − [Σ(T_measured − T_rec_max) / Σ(T_allowable_max − T_rec_max)] × 100%
        </div>
        <p style={S.p}>
          When a rack is within the recommended range — its deviation = 0 (no penalty).
        </p>
        <p style={S.p}>
          When all racks are within the recommended range — total deviation = 0, RCI(HI) = 100%.
        </p>

        <h3 style={S.h3}>RCI(LO) — Under-Temperature Penalty</h3>
        <p style={S.p}>
          Same concept — but on the lower side. Is the inlet temperature below 18°C?
        </p>
        <p style={S.p}>
          <strong>Deviation = T_recommended_min (18°C) − Actual temperature</strong>
        </p>
        <p style={S.p}>
          <strong>Formula:</strong>
        </p>
        <div
          style={{
            background: "rgba(37,99,235,0.04)",
            border: "1px solid rgba(37,99,235,0.15)",
            borderRadius: 8,
            padding: "14px 18px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "#1f2937",
            margin: "12px 0 20px",
            lineHeight: 1.8,
          }}
        >
          RCI(LO) = 1 − [Σ(T_rec_min − T_measured) / Σ(T_rec_min − T_allowable_min)] × 100%
        </div>

        <EngineerTip>
          In the field a simplified approach is common: measure all rack inlets, count how many are within 18–27°C. Rough RCI ≈ (in-range racks / total racks) × 100. This is not the exact ASHRAE formula — but it is useful for a quick assessment. For a proper RCI, use DCIM software or a detailed spreadsheet.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Section 5 ── */}
        <h2 id="rhi" style={S.h1}>RHI — Return Heat Index</h2>

        <p style={S.p}>
          Along with RCI, <strong>RHI (Return Heat Index)</strong> is usually also measured.
        </p>
        <p style={S.p}>
          RHI measures <strong>how much hot return air the PAC/CRAC unit is getting back</strong> — relative to what it should be getting.
        </p>
        <p style={S.p}>
          Simple explanation:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>
            <strong>High RHI (&gt; 91%)</strong> = actual hot air is returning to the PAC — the servers' heat is being captured effectively. Good.
          </li>
          <li style={S.li}>
            <strong>Low RHI (&lt; 80%)</strong> = cool air is bypassing — it is going back into the PAC without reaching the servers. Cooling wasted.
          </li>
        </ul>
        <p style={S.p}>
          RCI and RHI together give the full picture:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>RCI high + RHI high = Perfect cooling delivery</li>
          <li style={S.li}>RCI low + RHI high = Servers are hot but heat is captured — cooling is insufficient</li>
          <li style={S.li}>RCI high + RHI low = Cool air is wasted, it is bypassing</li>
          <li style={S.li}>RCI low + RHI low = Multiple problems — immediate action</li>
        </ul>

        <InsightCard>
          Practical use of RHI: if RHI is 70%, it means 30% of the cool air is bypassing — it is coming back to the PAC without reaching the servers. The reasons for this 30% energy waste: wrong floor tile placement, gaps under racks, perforated tiles directly in front of the PAC. Fix these — RHI will improve, energy will be saved, and that cool air will actually reach the servers.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Section 6 ── */}
        <h2 id="main-components" style={S.h1}>What You Need to Measure RCI</h2>

        <h3 style={S.h3}>1. Temperature Sensors</h3>
        <p style={S.p}>
          Install a temperature sensor at every rack's inlet. Minimum: one sensor at 1U height (bottom of the rack). Better: 3 points — bottom (1U), middle, top. Temperature can vary at different heights.
        </p>
        <p style={S.p}>
          Sensor types: wired thermocouple or RTD sensors connected to the DCIM system. Wireless sensors are available — easier for retrofit. Some intelligent PDUs also have built-in sensors.
        </p>

        <h3 style={S.h3}>2. DCIM Software (Recommended)</h3>
        <p style={S.p}>
          Data Center Infrastructure Management software — automatically collects sensor data, calculates RCI/RHI, maintains historical trending and generates alerts.
        </p>
        <p style={S.p}>
          Popular DCIM tools: EkkoSense, Nlyte, Sunbird, Vertiv Avocent. Essential for large data centers.
        </p>

        <h3 style={S.h3}>3. Spreadsheet (Manual Approach)</h3>
        <p style={S.p}>
          In small data centers: measure the temperature manually at every rack. Enter it in a spreadsheet. Apply the formula. Quarterly or semi-annually is useful for establishing a baseline.
        </p>

        <h3 style={S.h3}>4. IR Thermometer / Thermal Camera</h3>
        <p style={S.p}>
          For quick spot checks. An instantaneous reading at the rack inlet with an IR thermometer. With a thermal camera you can visually see a temperature map of the entire aisle. Hot spots are immediately visible.
        </p>

        <hr style={S.divider} />

        {/* ── Section 7 ── */}
        <h2 id="how-it-works-in-dc" style={S.h1}>RCI in a Real Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/rci/rci-heatmap-data-center.png"
              alt="RCI heat map showing temperature distribution across server racks in a data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            RCI heat map — generated by DCIM software. Blue = cold (over-cooling), green = ideal, yellow/red = hot spots.
          </figcaption>
        </figure>

        <p style={S.p}>
          How RCI works in daily operations:
        </p>
        <p style={S.p}>
          <strong>Step 1:</strong> DCIM software collects the temperature from every sensor every 5 minutes.
        </p>
        <p style={S.p}>
          <strong>Step 2:</strong> The software automatically calculates RCI and RHI — per row, per zone and at the overall facility level.
        </p>
        <p style={S.p}>
          <strong>Step 3:</strong> The dashboard shows a color-coded heatmap — which racks are in the ideal range, which are borderline, which are problematic.
        </p>
        <p style={S.p}>
          <strong>Step 4:</strong> If any zone goes below 80% — an automatic alert is generated. The operations team investigates.
        </p>
        <p style={S.p}>
          <strong>Step 5:</strong> Implement the fix (blanking panels, tile replacement, PAC adjustment). The RCI trend improves — it is verified that the fix worked.
        </p>

        <EngineerTip>
          Field tip: Whenever you install a new rack, immediately check the RCI around it. New rack = new heat load = existing cooling distribution can be affected. Before installation: note the RCI baseline. After installation: check again. If there is a dip — address it before it becomes a problem.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Section 8 ── */}
        <h2 id="types" style={S.h1}>RCI Score Ranges</h2>

        <p style={S.p}>
          ASHRAE TC 9.9 has defined these rating tiers for RCI:
        </p>

        <ScoreCard
          rows={[
            { range: "> 91%",  label: "Excellent",    color: "#059669", action: "All servers getting cool air within recommended range. Best practice achieved." },
            { range: "81–90%", label: "Good",         color: "#2563EB", action: "Minor deviations. Some racks slightly outside range. Monitor and improve." },
            { range: "71–80%", label: "Fair",         color: "#d97706", action: "Noticeable cooling issues. Servers at risk. Investigate and fix proactively." },
            { range: "61–70%", label: "Poor",         color: "#dc2626", action: "Significant cooling problems. Immediate action required. Hot spots likely present." },
            { range: "< 60%",  label: "Critical",     color: "#7f1d1d", action: "Major cooling failure. Equipment at risk of thermal shutdown. Emergency response needed." },
          ]}
        />

        <p style={S.p}>
          <strong>Industry target: RCI consistently &gt; 91%.</strong>
        </p>
        <p style={S.p}>
          Maintaining 91%+ is expected in Tier III and Tier IV certified facilities.
        </p>

        <hr style={S.divider} />

        {/* ── Section 9 ── */}
        <h2 id="advantages" style={S.h1}>Why RCI Is Useful</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Objective measurement:</strong> Better than "cooling seems fine" — RCI = an actual number</li>
          <li style={S.li}><strong>Proactive:</strong> Detect a cooling problem before a server alarm</li>
          <li style={S.li}><strong>Baseline comparison:</strong> Compare before/after changes — prove the improvement</li>
          <li style={S.li}><strong>Hotspot identification:</strong> Exactly which rack, which row — pinpoint it</li>
          <li style={S.li}><strong>Catch over-cooling:</strong> Identify energy waste — optimize PAC setpoints</li>
          <li style={S.li}><strong>Capacity planning:</strong> Before increasing load — check the current RCI. Is there a buffer?</li>
          <li style={S.li}><strong>SLA compliance:</strong> Prove to clients that cooling is adequate</li>
          <li style={S.li}><strong>Justify cooling investment:</strong> Low RCI → a concrete reason for cooling upgrades</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 10 ── */}
        <h2 id="disadvantages" style={S.h1}>Limitations of RCI</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Sensors needed:</strong> RCI cannot be calculated without temperature sensors. You have to invest in infrastructure.</li>
          <li style={S.li}><strong>Snapshot metric:</strong> RCI is a point-in-time measurement. Load constantly changes — a single measurement does not give the full picture.</li>
          <li style={S.li}><strong>Inlet only:</strong> RCI measures server inlet temperature — not the temperature inside the server. Airflow within the server is also important.</li>
          <li style={S.li}><strong>ASHRAE Class assumptions:</strong> There are different acceptable ranges for different equipment classes. A single RCI calculation does not always capture the differences of all equipment.</li>
          <li style={S.li}><strong>Not a standalone metric:</strong> RCI can be high while PUE is poor — look at both together.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 11 ── */}
        <h2 id="real-example" style={S.h1}>Real Calculation Example</h2>

        <p style={S.p}>
          <strong>Setup:</strong> 10 racks, temperature measured at each rack inlet. ASHRAE recommended range: 18°C – 27°C.
        </p>

        <div style={{ overflowX: "auto" as const, margin: "16px 0 24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "9px 12px", textAlign: "left" as const, border: "1px solid rgba(37,99,235,0.12)", fontWeight: 600, color: "#1f2937" }}>Rack</th>
                <th style={{ padding: "9px 12px", textAlign: "left" as const, border: "1px solid rgba(37,99,235,0.12)", fontWeight: 600, color: "#1f2937" }}>Inlet Temp (°C)</th>
                <th style={{ padding: "9px 12px", textAlign: "left" as const, border: "1px solid rgba(37,99,235,0.12)", fontWeight: 600, color: "#1f2937" }}>Status</th>
                <th style={{ padding: "9px 12px", textAlign: "left" as const, border: "1px solid rgba(37,99,235,0.12)", fontWeight: 600, color: "#1f2937" }}>Deviation from Range</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["R-01", "21°C", "✅ In range",      "0°C"],
                ["R-02", "23°C", "✅ In range",      "0°C"],
                ["R-03", "20°C", "✅ In range",      "0°C"],
                ["R-04", "29°C", "⚠️ Over (HI)",     "+2°C above 27°C"],
                ["R-05", "22°C", "✅ In range",      "0°C"],
                ["R-06", "31°C", "❌ Over (HI)",     "+4°C above 27°C"],
                ["R-07", "19°C", "✅ In range",      "0°C"],
                ["R-08", "24°C", "✅ In range",      "0°C"],
                ["R-09", "15°C", "🔵 Under (LO)",   "−3°C below 18°C"],
                ["R-10", "25°C", "✅ In range",      "0°C"],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "8px 12px", border: "1px solid rgba(37,99,235,0.08)", color: "#1f2937", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={S.p}><strong>Analysis:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>7 racks in recommended range (21, 23, 20, 22, 19, 24, 25°C)</li>
          <li style={S.li}>2 racks over-temperature (29°C → +2°C, 31°C → +4°C) — total HI deviation = 6°C</li>
          <li style={S.li}>1 rack under-temperature (15°C → −3°C) — LO deviation = 3°C</li>
        </ul>
        <p style={S.p}>
          <strong>Simplified RCI estimate:</strong> 7 of 10 racks in range = 70% — Fair category.
        </p>
        <p style={S.p}>
          <strong>Actions:</strong> R-06 (31°C) = highest priority. Check blanking panels in that rack. Check floor tile coverage. R-09 (15°C) = over-cooling, floor tile adjustment needed. R-04 (29°C) = monitor, check blanking panels.
        </p>

        <hr style={S.divider} />

        {/* ── Section 12 ── */}
        <h2 id="common-faults" style={S.h1}>Common Causes of Poor RCI</h2>

        <h3 style={S.h3}>Missing Blanking Panels</h3>
        <p style={S.p}>
          The most common cause. Hot exhaust air goes back into the server intake through an empty rack space — recirculation. The specific rack's RCI drops.
        </p>
        <p style={S.p}><strong>Fix:</strong> Walk every rack, install blanking panels in every empty 1U/2U space. Immediate improvement milegi.</p>

        <h3 style={S.h3}>Wrong Floor Tile Placement</h3>
        <p style={S.p}>
          Perforated tiles are installed in the hot aisle or in front of the PAC — cool air is bypassing. There are no tiles in the cold aisle — cool air is not reaching.
        </p>
        <p style={S.p}><strong>Fix:</strong> Floor tile audit. Perforated tiles only in the cold aisle, directly in front of the rack.</p>

        <h3 style={S.h3}>No Containment or Containment Breach</h3>
        <p style={S.p}>
          Containment is missing or damaged — hot/cold mixing. The RCI of the entire zone is affected.
        </p>
        <p style={S.p}><strong>Fix:</strong> Implement or repair containment. Even a partial containment improvement is significant.</p>

        <h3 style={S.h3}>Insufficient Cooling Capacity</h3>
        <p style={S.p}>
          The IT load has increased — the cooling units are not enough. The RCI of the entire data center drops.
        </p>
        <p style={S.p}><strong>Fix:</strong> Capacity planning. Additional PAC/CRAC units or chiller capacity.</p>

        <h3 style={S.h3}>PAC/CRAC Placement Issues</h3>
        <p style={S.p}>
          The cooling units are far from the racks where cooling is needed. Cold air is not reaching — the far racks' RCI is low.
        </p>
        <p style={S.p}><strong>Fix:</strong> Add in-row cooling units in high-density areas. Optimize PAC placement.</p>

        <h3 style={S.h3}>High Density Racks Without Supplementary Cooling</h3>
        <p style={S.p}>
          For 10+ kW racks, standard PAC cooling can be insufficient.
        </p>
        <p style={S.p}><strong>Fix:</strong> In-row cooling, rear-door heat exchangers or targeted supplementary cooling.</p>

        <hr style={S.divider} />

        {/* ── Section 13 ── */}
        <h2 id="preventive-maintenance" style={S.h1}>How to Maintain Good RCI</h2>

        <p style={S.p}>Maintaining RCI is an ongoing discipline — not a one-time fix.</p>

        <h3 style={S.h3}>Physical Actions</h3>
        <ul style={S.ul}>
          <li style={S.li}>Verify blanking panels after every rack installation — always</li>
          <li style={S.li}>Audit floor tiles quarterly — confirm correct placement</li>
          <li style={S.li}>Check containment integrity monthly</li>
          <li style={S.li}>Keep PAC/CRAC filter maintenance regular — dirty filters = reduced airflow = RCI drop</li>
          <li style={S.li}>Cable management — manage cable bundles that block airflow</li>
        </ul>

        <h3 style={S.h3}>Monitoring Actions</h3>
        <ul style={S.ul}>
          <li style={S.li}>Configure DCIM alerts — immediate alert if RCI goes below 85%</li>
          <li style={S.li}>Track temperature trends — so gradual deterioration is caught early</li>
          <li style={S.li}>Note seasonal changes — in summer outdoor temperature rises, chiller load rises, RCI impact is possible</li>
          <li style={S.li}>Quarterly full temperature mapping — all racks</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 14 ── */}
        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Check the DCIM dashboard — current RCI score</li>
          <li style={S.li}>✓ Is any RCI alert active? Investigate it</li>
          <li style={S.li}>✓ Hot spot alarms — in the BMS or DCIM</li>
          <li style={S.li}>✓ Cold aisle temperature — is it uniform?</li>
          <li style={S.li}>✓ PAC/CRAC units all running? Any fault?</li>
          <li style={S.li}>✓ New rack installed today? — Verify blanking panels and tiles</li>
          <li style={S.li}>✓ RCI trend — improving, stable or deteriorating?</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 15 ── */}
        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Full temperature mapping — measure all rack inlets</li>
          <li style={S.li}>✓ Calculate RCI and RHI (or generate the DCIM report)</li>
          <li style={S.li}>✓ Comparison with the previous month — identify the trend</li>
          <li style={S.li}>✓ Blanking panels walk — every rack row</li>
          <li style={S.li}>✓ Floor tile placement audit</li>
          <li style={S.li}>✓ Containment integrity check</li>
          <li style={S.li}>✓ PAC/CRAC filter status — is the PM schedule current?</li>
          <li style={S.li}>✓ Hot spots resolved? — Previous actions ne RCI improve kiya?</li>
          <li style={S.li}>✓ Capacity vs IT load review — is the buffer adequate?</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 16 ── */}
        <h2 id="safety" style={S.h1}>Safety Notes</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Hot aisle temperature measurement:</strong> The hot aisle can reach 35–45°C. Use an IR thermometer from outside — avoid prolonged exposure.</li>
          <li style={S.li}><strong>Raised floor access:</strong> Handle floor tiles carefully when installing temperature sensors in the raised floor. Heavy tiles — proper lifting technique.</li>
          <li style={S.li}><strong>Working near live racks:</strong> During temperature measurement, keep hands and tools clear of rack equipment — avoid accidental contact.</li>
          <li style={S.li}><strong>Thermal camera:</strong> Eye safety — avoid a direct IR flash. There is generally no risk with the camera, but follow standard PPE.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 17 ── */}
        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is RCI and what should its target be?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> RCI = Rack Cooling Index — a percentage metric that measures how many server racks are getting cool air within the ASHRAE recommended temperature range (18–27°C). Target: &gt; 91% = Excellent. 81–90% = Good. Below 70% = Immediate action needed. 100% = every rack in range = perfect cooling delivery.
        </p>

        <h3 style={S.h3}>Q2: RCI is low — what will you check first?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> Step 1: Look at the temperature heatmap — which racks/zones are affected. Step 2: Check blanking panels in the affected racks. Step 3: Verify the cold aisle floor tiles — are they perforated? Step 4: Is containment intact? Step 5: Are all PAC/CRAC units running, setpoints correct? Step 6: Recent changes — were new racks added?
        </p>

        <h3 style={S.h3}>Q3: What is RHI and what does a low RHI mean?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> RHI = Return Heat Index — measures how much actual hot return air the PAC/CRAC is getting. Low RHI (&lt;80%) = a bypass air problem — cool air is avoiding the servers and returning to the PAC. Causes: wrong floor tiles (perforated in front of the PAC), gaps in the raised floor, no containment. Fix: correct the tile placement, seal the gaps.
        </p>

        <h3 style={S.h3}>Q4: What is the relationship between RCI and PUE?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> PUE = energy efficiency metric (total power / IT power). RCI = cooling quality metric (cooling delivery effectiveness). These two measure different things — both are essential. A good PUE with a poor RCI is possible — the cooling is energy efficient but is not being delivered to the right place. Target: PUE &lt;1.4 AND RCI &gt;91%.
        </p>

        <h3 style={S.h3}>Q5: How can RCI be measured without DCIM?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> Manual approach: measure the temperature at every rack inlet with an IR thermometer (1U height). Enter it in a spreadsheet. Compare with the ASHRAE range (18–27°C). Count how many are in range. Simplified RCI % = (in-range racks / total racks) × 100. It is enough for a quarterly survey. Invest in DCIM for large facilities — manual is infeasible with hundreds of racks.
        </p>

        <hr style={S.divider} />

        {/* ── Section 18 ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Overall RCI suddenly dropped — from 90% to 72%</h3>
        <ul style={S.ul}>
          <li style={S.li}>Look at the heatmap — is a specific zone affected or the full DC?</li>
          <li style={S.li}>Did something new happen? — New racks installed, a PAC unit down, a layout change?</li>
          <li style={S.li}>Check PAC/CRAC status — is any unit in fault?</li>
          <li style={S.li}>Outdoor temperature spike? — Seasonal load? Chiller capacity impacted?</li>
          <li style={S.li}>Check the blanking panels — were panels missed with new installations?</li>
        </ul>

        <h3 style={S.h3}>Scenario: A specific row has low RCI every time</h3>
        <ul style={S.ul}>
          <li style={S.li}>Measure the cold aisle temperature of the affected row — is adequate cool air coming?</li>
          <li style={S.li}>Check the floor tiles in that row</li>
          <li style={S.li}>Distance to the nearest PAC unit — too far? Consider in-row cooling</li>
          <li style={S.li}>Is the rack density high in the row? — 8+ kW racks need supplementary cooling</li>
          <li style={S.li}>Is containment proper in that row?</li>
        </ul>

        <h3 style={S.h3}>Scenario: RHI consistently low (bypass air problem)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Floor tile placement audit — perforated tiles directly in front of the PAC?</li>
          <li style={S.li}>Raised floor gaps — cable openings sealed?</li>
          <li style={S.li}>Under-rack gaps — install sealing strips</li>
          <li style={S.li}>Are the containment end doors closed?</li>
          <li style={S.li}>PAC supply setpoints — too low? Raise them, bypass will reduce</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 19 ── */}
        <h2 id="comparison" style={S.h1}>RCI vs PUE vs RHI</h2>

        <ComparisonTable
          rows={[
            { feature: "Full name",         rci: "Rack Cooling Index",       other: "Return Heat Index",         otherLabel: "Power Usage Effectiveness" },
            { feature: "What it measures",  rci: "Cooling delivery quality", other: "Bypass air / hot return",   otherLabel: "Energy efficiency" },
            { feature: "Range",             rci: "0% – 100%",               other: "0% – 100%+",                otherLabel: "1.0 – 3.0+ (lower better)" },
            { feature: "Target",            rci: "> 91% (Excellent)",        other: "> 91% (High is good)",      otherLabel: "< 1.4 (best practice)" },
            { feature: "Measures",          rci: "Server inlet temp range",  other: "PAC return air quality",    otherLabel: "Total power vs IT power" },
            { feature: "Defined by",        rci: "ASHRAE TC 9.9",           other: "ASHRAE TC 9.9",             otherLabel: "The Green Grid" },
            { feature: "Primary use",       rci: "Cooling quality audit",    other: "Bypass air detection",      otherLabel: "Facility efficiency audit" },
            { feature: "Improves with",     rci: "Blanking panels, containment, airflow mgmt", other: "Seal gaps, fix tile placement", otherLabel: "Better cooling technology, free cooling" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── Section 20 ── */}
        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Measure first:</strong> An improvement cannot be proven without measurement. Establish a baseline RCI before any changes.</li>
          <li style={S.li}><strong>Blanking panels 100% always:</strong> This is the most direct lever for RCI. Every rack, every empty space. No exceptions.</li>
          <li style={S.li}><strong>Temperature sensors every rack:</strong> Bare minimum — bottom (1U) sensor. Better — 3-point measurement. Best — DCIM integration with real-time monitoring.</li>
          <li style={S.li}><strong>Set alert thresholds:</strong> Set an 85% alert in DCIM — before things get critical. React before server alarms come.</li>
          <li style={S.li}><strong>Include RCI in change management:</strong> An RCI check is mandatory after a new rack is installed. Document it.</li>
          <li style={S.li}><strong>Trend monthly:</strong> A trend is more useful than a single data point. Know whether it is improving or deteriorating.</li>
          <li style={S.li}><strong>Look at RCI + RHI together:</strong> Together they give the full cooling health picture. One metric is only half the story.</li>
          <li style={S.li}><strong>Maintain a seasonal baseline:</strong> In summer RCI can naturally be slightly lower — understand what the normal range is.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "RCI (Rack Cooling Index) is a percentage metric — how many server racks are getting cool air within the ASHRAE recommended range (18–27°C).",
            "Target: > 91% = Excellent. 81–90% = Good. Below 70% = Poor — immediate action needed.",
            "RHI (Return Heat Index) measures how much hot return air the PAC/CRAC is getting. High RHI = less bypass air = good.",
            "Common causes of low RCI: missing blanking panels, wrong floor tiles, no containment, insufficient cooling capacity.",
            "Fix sequence: Blanking panels first → floor tile audit → containment check → capacity assessment.",
            "DCIM software tracks RCI in real time. Without DCIM, do quarterly manual mapping.",
            "RCI and PUE are both essential — monitor both cooling quality and energy efficiency.",
          ]}
        />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>
          You understand RCI — the cooling module is complete. All these topics together have given the full cooling picture:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — the primary method to improve RCI — optimize airflow.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — hot/cold aisle containment — the most effective lever for RCI.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — PAC and CRAC — which deliver the cool air that RCI measures.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — the large data center cooling system — RCI is measured through the CRAH.</li>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — the heat rejection component of the chiller cooling chain.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
