import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "RCI — Rack Cooling Index in Data Centers | Behind The Tech",
  description:
    "RCI kya hai, kaise calculate karte hain, good RCI kya hota hai — Rack Cooling Index Data Center cooling effectiveness ka metric hai. Simple Hinglish mein complete guide.",
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
      "RCI aur RHI — Data Center cooling ka report card. Kaise calculate hota hai, kya achha score hai, aur kaise improve karo.",
    url: "https://behindthetech.in/learn/non-it/cooling/rci",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RCI Explained — Behind The Tech",
    description:
      "Rack Cooling Index — Data Center cooling effectiveness ka metric. Complete guide.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/rci" },
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
      label: "Ek line mein",
      text: "RCI ek number hai — 0% se 100% — jo batata hai ki Data Center mein servers ko kitna sahi temperature range mein cool air mil rahi hai.",
    },
    {
      label: "100% ka matlab",
      text: "Har server ka inlet temperature ASHRAE recommended range ke andar hai. Koi bhi rack overheating nahi hai. Perfect cooling delivery.",
    },
    {
      label: "0% ka matlab",
      text: "Sab servers recommended range se bahar hain — ya to bahut garam, ya to bahut thanda (over-cooling). Cooling system kaam nahi kar raha properly.",
    },
    {
      label: "Target kya hona chahiye",
      text: "RCI > 91% = Excellent. 81–90% = Good. 71–80% = Fair. < 70% = Poor — immediate action chahiye.",
    },
    {
      label: "Kaise use hota hai",
      text: "Temperature sensors se har rack ka inlet temperature measure karo. Formula se RCI calculate karo. Low RCI = cooling problem hai — dhundo aur fix karo.",
    },
    {
      label: "RHI kya hota hai",
      text: "RHI = Return Heat Index — measure karta hai ki PAC/CRAC ko kitna hot air wapas mil raha hai. High RHI = achha (sab heat captured). Low RHI = bypass air ho raha hai.",
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
          Bas itna samajh gaye to RCI ka concept clear hai. Aage poora article mein calculation, examples aur troubleshooting hai.
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
      <div style={{ height: 2, background: "#ffa500" }} />
      <div
        style={{
          background: "rgba(255,165,0,0.04)",
          border: "1px solid rgba(255,165,0,0.16)",
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
            color: "#ffa500",
            fontWeight: 600,
            marginBottom: 9,
          }}
        >
          Engineer Ki Tip
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>
          {children}
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
    q: "RCI aur PUE mein kya fark hai?",
    a: "PUE (Power Usage Effectiveness) measure karta hai ki Data Center total power mein se kitna IT equipment ko jaata hai — energy efficiency metric hai. RCI measure karta hai ki cooling delivery kitni effective hai — cooling quality metric hai. Ek data center ka PUE 1.3 ho sakta hai (good) lekin RCI 75% ho (poor) — energy efficient hai lekin cooling sahi nahi pahunch rahi. Dono metrics zaroori hain.",
  },
  {
    q: "ASHRAE recommended inlet temperature range kya hai?",
    a: "ASHRAE TC 9.9 ke thermal guidelines mein Classes hain. Class A1 (most servers): 15°C to 32°C inlet. Class A2: 10°C to 35°C. Recommended (ideal) range: 18°C to 27°C. RCI calculation mein typically recommended range use hoti hai. Allowable range se bahar jaana bhi equipment life ko affect karta hai.",
  },
  {
    q: "RCI manually calculate karein ya software se?",
    a: "Small data centers mein manual calculation possible hai — temperature measurements, spreadsheet, formula apply karo. Large data centers mein DCIM software automatically calculate karta hai — hundreds of sensors se real-time data. Industry mein EkkoSense, Nlyte, Sunbird jaise DCIM tools RCI automatically report karte hain. Manual baseline ke baad software pe shift karo.",
  },
  {
    q: "RCI 100% achieve karna kya realistic hai?",
    a: "Theoretically possible hai — agar sab servers recommended range mein hain. Practically, 95%+ excellent hai. 91-95% bhi very good hai. 100% pe rahna hard hai kyunki load constantly change hota hai, maintenance windows hoti hain, equipment changes hote hain. Target: consistently 91%+ maintain karo. Below 80% pe alert karo.",
  },
  {
    q: "RHI (Return Heat Index) ka target kya hona chahiye?",
    a: "RHI target: > 91% excellent. ASHRAE recommendation: RHI > 91% means ki PAC/CRAC ko proper hot return air mil raha hai — bypass air kam hai. Low RHI (< 80%) indicates ki zyada cool air bypass ho raha hai PAC ke paas wapas — cooling units short-cycling hote hain aur actually server cooling mein contribute nahi kar rahe.",
  },
  {
    q: "Kya RCI ek standard mandatory metric hai?",
    a: "RCI aur RHI ASHRAE TC 9.9 ne define kiye hain — industry standard hai. Mandatory nahi hai lekin best practice hai. Uptime Institute Tier certification mein cooling effectiveness important factor hai. Green Star certifications mein bhi cooling metrics consider hote hain. Serious data centers ye regularly track karte hain.",
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
      <ArticleLayout slug="rci" headings={HEADINGS} readingTimeMinutes={18}>

        {/* ── Intro ── */}
        <p style={S.p}>
          Socho ek Data Center hai jisme 200 racks hain. PAC units chal rahi hain. Cooling system running hai.
        </p>
        <p style={S.p}>
          Lekin kuch servers ka CPU temperature 75°C se upar ja raha hai — alarm aa raha hai. Kuch servers throttling kar rahe hain — performance drop ho raha hai.
        </p>
        <p style={S.p}>
          <strong>Problem kya hai? Cooling system chal to raha hai.</strong>
        </p>
        <p style={S.p}>
          Ye zaroori nahi ki cooling system chale — important ye hai ki <strong>cooling sahi jagah, sahi temperature pe deliver ho rahi hai ya nahi.</strong>
        </p>
        <p style={S.p}>
          Is sawaal ka jawab deta hai — <strong>RCI (Rack Cooling Index).</strong>
        </p>
        <p style={S.p}>
          RCI ek metric hai — ek number — jo batata hai ki cooling delivery kitni effective hai.
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
            RCI measurement — har rack ke inlet temperature sensor se data collect karo. Ye numbers RCI calculate karne ke liye use hote hain.
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
          Ye ek percentage metric hai — 0% se 100% — jo measure karta hai ki Data Center mein <strong>kitne servers ko recommended temperature range mein cool air mil rahi hai.</strong>
        </p>
        <p style={S.p}>
          ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) ne ye metric define kiya hai. ASHRAE TC 9.9 committee Data Center thermal management standards maintain karti hai.
        </p>
        <p style={S.p}><strong>RCI 100% = Perfect.</strong> Har server ka inlet temperature ASHRAE recommended range mein hai.</p>
        <p style={S.p}><strong>RCI 0% = Catastrophic.</strong> Koi bhi server recommended range mein nahi hai.</p>
        <p style={S.p}>
          Real data centers mein target hota hai <strong>RCI &gt; 91%.</strong>
        </p>

        <InsightCard>
          RCI sirf over-heating track nahi karta — over-cooling bhi detect karta hai. Agar servers bahut zyada thande hain (18°C se neeche), ye bhi energy waste hai — cooling kaam se zyada chal rahi hai. RCI dono extremes ko penalise karta hai — perfect range ke bahar jaana cost karta hai score mein.
        </InsightCard>

        <DCMapNote components={["Temperature Sensors", "DCIM Software", "Rack Inlets", "Cold Aisle", "PAC/CRAC Units"]} />

        <hr style={S.divider} />

        {/* ── Section 2 ── */}
        <h2 id="why-needed" style={S.h1}>Why Is RCI Needed?</h2>

        <p style={S.p}>
          Data Center mein PAC unit chal rahi hai — ye confirm karna kaafi nahi hai.
        </p>
        <p style={S.p}>
          Ye confirm karna zaroori hai ki:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Har rack ko adequate cool air mil rahi hai</li>
          <li style={S.li}>Koi bhi rack overheating zone mein nahi hai</li>
          <li style={S.li}>Cool air waste nahi ho rahi (over-cooling)</li>
          <li style={S.li}>Cooling improvement actions ka actual effect ho raha hai</li>
        </ul>

        <WhyThisMatters>
          Bina RCI ke, data center operators "feel" se cooling manage karte hain — jab server alarm aata hai tab pata chalta hai ki problem hai. RCI proactive hai — before servers alarm karo, pata chal jaata hai ki cooling deteriorate ho rahi hai. Ek RCI survey ke baad blanking panels, floor tiles, containment gaps — sab fix karo. Result: server reliability improve, energy cost reduce.
        </WhyThisMatters>

        <p style={S.p}>
          <strong>Practical example:</strong> Naya rack install kiya. Koi alarm nahi aaya. Lekin RCI 88% se 79% pe aa gaya. Kuch purane racks ab warm air le rahe hain. Ye RCI ke bina invisible tha.
        </p>

        <hr style={S.divider} />

        {/* ── Section 3 ── */}
        <h2 id="working-principle" style={S.h1}>How RCI Is Calculated</h2>

        <p style={S.p}>
          RCI calculate karne ke liye sirf ek cheez chahiye: <strong>har rack ka inlet temperature.</strong>
        </p>
        <p style={S.p}>
          Inlet temperature = server ke front face pe, rack ke bottom mein (ya multiple points pe) — yahan cool air enter karti hai.
        </p>
        <p style={S.p}>
          ASHRAE ne temperature ranges define ki hain:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Recommended range:</strong> 18°C – 27°C (most servers ke liye ideal)</li>
          <li style={S.li}><strong>Allowable range (upper):</strong> 27°C – 35°C (equipment specs ke hisaab se vary karta hai)</li>
          <li style={S.li}><strong>Below recommended:</strong> &lt; 18°C (over-cooling — energy waste)</li>
          <li style={S.li}><strong>Above allowable:</strong> &gt; 35°C (equipment damage zone)</li>
        </ul>
        <p style={S.p}>
          RCI formula in deviations ko measure karta hai aur ek single percentage mein express karta hai.
        </p>

        <FlowDiagram
          caption="RCI measurement aur calculation process"
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
          RCI do parts mein hota hai:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>RCI(HI)</strong> — High side: racks jo recommended se zyada garam hain</li>
          <li style={S.li}><strong>RCI(LO)</strong> — Low side: racks jo recommended se zyada thande hain</li>
        </ul>
        <p style={S.p}>
          Dono separately calculate hote hain, phir combined score milta hai.
        </p>

        <h3 style={S.h3}>RCI(HI) — Over-Temperature Penalty</h3>
        <p style={S.p}>
          Har rack ke liye check karo: kya inlet temperature 27°C se upar hai?
        </p>
        <p style={S.p}>
          Agar haan, <strong>deviation calculate karo:</strong>
        </p>
        <p style={S.p}>
          <strong>Deviation = Actual temperature − T_recommended_max (27°C)</strong>
        </p>
        <p style={S.p}>
          Ye deviation sum karo sab racks ke liye.
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
          Jab koi rack recommended range mein ho — uska deviation = 0 (no penalty).
        </p>
        <p style={S.p}>
          Jab sab racks recommended range mein hon — total deviation = 0, RCI(HI) = 100%.
        </p>

        <h3 style={S.h3}>RCI(LO) — Under-Temperature Penalty</h3>
        <p style={S.p}>
          Same concept — lekin neeche ki taraf. Kya inlet temperature 18°C se neeche hai?
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
          Field mein simplified approach common hai: measure all rack inlets, count karo kitne 18–27°C mein hain. Rough RCI ≈ (in-range racks / total racks) × 100. Ye exact ASHRAE formula nahi hai — lekin quick assessment ke liye useful hai. Proper RCI ke liye DCIM software ya detailed spreadsheet use karo.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Section 5 ── */}
        <h2 id="rhi" style={S.h1}>RHI — Return Heat Index</h2>

        <p style={S.p}>
          RCI ke saath usually <strong>RHI (Return Heat Index)</strong> bhi measure hota hai.
        </p>
        <p style={S.p}>
          RHI measure karta hai ki <strong>PAC/CRAC unit ko kitna hot return air wapas mil raha hai</strong> — relative to what it should be getting.
        </p>
        <p style={S.p}>
          Simple explanation:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>
            <strong>High RHI (&gt; 91%)</strong> = PAC ko actual hot air return ho raha hai — servers ki heat effectively capture ho rahi hai. Good.
          </li>
          <li style={S.li}>
            <strong>Low RHI (&lt; 80%)</strong> = Cool air bypass ho raha hai — servers tak pahunche bina wapas PAC mein ja rahi hai. Cooling wasted.
          </li>
        </ul>
        <p style={S.p}>
          RCI aur RHI dono milkar poori picture dete hain:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>RCI high + RHI high = Perfect cooling delivery</li>
          <li style={S.li}>RCI low + RHI high = Servers hot hain but heat captured — cooling insufficient</li>
          <li style={S.li}>RCI high + RHI low = Cool air wasted, bypass ho rahi hai</li>
          <li style={S.li}>RCI low + RHI low = Multiple problems — immediate action</li>
        </ul>

        <InsightCard>
          RHI ka practical use: Agar RHI 70% hai, matlab 30% cool air bypass ho rahi hai — servers tak pahunche bina PAC wapas aa rahi hai. Is 30% energy waste ki wajah: wrong floor tile placement, gaps under racks, PAC ke directly saamne perforated tiles. Fix karo ye — RHI improve hogi, energy save hogi, aur wo cool air actually servers tak pahunchegi.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Section 6 ── */}
        <h2 id="main-components" style={S.h1}>What You Need to Measure RCI</h2>

        <h3 style={S.h3}>1. Temperature Sensors</h3>
        <p style={S.p}>
          Har rack ke inlet pe temperature sensor lagao. Minimum: 1U height pe ek sensor (bottom of rack). Better: 3 points — bottom (1U), middle, top. Different heights pe temperature vary kar sakti hai.
        </p>
        <p style={S.p}>
          Sensor types: Wired thermocouple ya RTD sensors DCIM system se connected. Wireless sensors available hain — retrofit ke liye easier. Built-in sensors kuch intelligent PDUs mein bhi hote hain.
        </p>

        <h3 style={S.h3}>2. DCIM Software (Recommended)</h3>
        <p style={S.p}>
          Data Center Infrastructure Management software — automatically collect karta hai sensor data, RCI/RHI calculate karta hai, historical trending maintain karta hai, alerts generate karta hai.
        </p>
        <p style={S.p}>
          Popular DCIM tools: EkkoSense, Nlyte, Sunbird, Vertiv Avocent. Large data centers ke liye essential.
        </p>

        <h3 style={S.h3}>3. Spreadsheet (Manual Approach)</h3>
        <p style={S.p}>
          Chhote data centers mein: manually temperature measure karo har rack pe. Spreadsheet mein enter karo. Formula apply karo. Quarterly ya semi-annually useful hai baseline establish karne ke liye.
        </p>

        <h3 style={S.h3}>4. IR Thermometer / Thermal Camera</h3>
        <p style={S.p}>
          Quick spot checks ke liye. IR thermometer se rack inlet pe instantaneous reading. Thermal camera se entire aisle ka temperature map visually dekh sakte ho. Hot spots immediately visible hote hain.
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
            RCI heat map — DCIM software se generate hota hai. Blue = cold (over-cooling), green = ideal, yellow/red = hot spots.
          </figcaption>
        </figure>

        <p style={S.p}>
          Daily operations mein RCI kaise kaam karta hai:
        </p>
        <p style={S.p}>
          <strong>Step 1:</strong> DCIM software har sensor se har 5 minutes mein temperature collect karta hai.
        </p>
        <p style={S.p}>
          <strong>Step 2:</strong> Software automatically RCI aur RHI calculate karta hai — per row, per zone, aur overall facility level pe.
        </p>
        <p style={S.p}>
          <strong>Step 3:</strong> Dashboard pe color-coded heatmap dikhti hai — kaunse racks ideal range mein hain, kaunse borderline, kaunse problematic.
        </p>
        <p style={S.p}>
          <strong>Step 4:</strong> Agar koi zone 80% se neeche jaaye — automatic alert generate hota hai. Operations team investigate karta hai.
        </p>
        <p style={S.p}>
          <strong>Step 5:</strong> Fix implement karo (blanking panels, tile replacement, PAC adjustment). RCI trend improve hota hai — verify ho jaata hai ki fix kaam kiya.
        </p>

        <EngineerTip>
          Field tip: Jab bhi koi naya rack install karo, immediately uske aas-paas ka RCI check karo. Naya rack = new heat load = existing cooling distribution affect ho sakta hai. Before installation: RCI baseline note karo. After installation: dobara check karo. Agar dip aayi — address karo before it becomes a problem.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Section 8 ── */}
        <h2 id="types" style={S.h1}>RCI Score Ranges</h2>

        <p style={S.p}>
          ASHRAE TC 9.9 ne RCI ke liye ye rating tiers define kiye hain:
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
          Tier III aur Tier IV certified facilities mein 91%+ maintain karna expected hai.
        </p>

        <hr style={S.divider} />

        {/* ── Section 9 ── */}
        <h2 id="advantages" style={S.h1}>Why RCI Is Useful</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Objective measurement:</strong> "Cooling theek lag raha hai" se better — RCI = actual number</li>
          <li style={S.li}><strong>Proactive:</strong> Server alarm se pehle cooling problem detect karo</li>
          <li style={S.li}><strong>Baseline comparison:</strong> Before/after changes compare karo — improvement prove karo</li>
          <li style={S.li}><strong>Hotspot identification:</strong> Exactly kaunsa rack, kaunsa row — pinpoint karo</li>
          <li style={S.li}><strong>Over-cooling catch karo:</strong> Energy waste identify karo — PAC setpoints optimize karo</li>
          <li style={S.li}><strong>Capacity planning:</strong> Load badhaane se pehle — current RCI check karo. Buffer hai?</li>
          <li style={S.li}><strong>SLA compliance:</strong> Clients ko prove karo ki cooling adequate hai</li>
          <li style={S.li}><strong>Cooling investment justify karo:</strong> Low RCI → concrete reason for cooling upgrades</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 10 ── */}
        <h2 id="disadvantages" style={S.h1}>Limitations of RCI</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Sensors chahiye:</strong> Bina temperature sensors ke RCI calculate nahi ho sakta. Infrastructure invest karna padta hai.</li>
          <li style={S.li}><strong>Snapshot metric:</strong> RCI ek point-in-time measurement hai. Load constantly change hota hai — single measurement poori picture nahi deta.</li>
          <li style={S.li}><strong>Inlet only:</strong> RCI server inlet temperature measure karta hai — server andar ka temperature nahi. Airflow within server bhi important hai.</li>
          <li style={S.li}><strong>ASHRAE Class assumptions:</strong> Different equipment classes ke liye different acceptable ranges hain. Single RCI calculation sab equipment ke differences capture nahi karta always.</li>
          <li style={S.li}><strong>Not a standalone metric:</strong> RCI high ho sakta hai lekin PUE poor ho — dono milkar dekho.</li>
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
          Sabse common cause. Khali rack space se hot exhaust air wapas server intake mein jaati hai — recirculation. Specific rack ka RCI drop hota hai.
        </p>
        <p style={S.p}><strong>Fix:</strong> Walk every rack, install blanking panels in every empty 1U/2U space. Immediate improvement milegi.</p>

        <h3 style={S.h3}>Wrong Floor Tile Placement</h3>
        <p style={S.p}>
          Perforated tiles hot aisle mein ya PAC ke saamne lagaye hain — cool air bypass ho rahi hai. Cold aisle mein tiles nahi hain — cool air nahi pahunch rahi.
        </p>
        <p style={S.p}><strong>Fix:</strong> Floor tile audit. Perforated tiles sirf cold aisle mein, directly rack ke saamne.</p>

        <h3 style={S.h3}>No Containment or Containment Breach</h3>
        <p style={S.p}>
          Containment nahi hai ya damaged hai — hot/cold mixing. Entire zone ka RCI affected hota hai.
        </p>
        <p style={S.p}><strong>Fix:</strong> Containment implement karo ya repair karo. Even partial containment improvement significant hoti hai.</p>

        <h3 style={S.h3}>Insufficient Cooling Capacity</h3>
        <p style={S.p}>
          IT load badh gaya — cooling units kafi nahi hain. Entire data center ka RCI drop hota hai.
        </p>
        <p style={S.p}><strong>Fix:</strong> Capacity planning. Additional PAC/CRAC units ya chiller capacity.</p>

        <h3 style={S.h3}>PAC/CRAC Placement Issues</h3>
        <p style={S.p}>
          Cooling units duur hain un racks se jahan cooling needed hai. Cold air reach nahi kar rahi — far racks ka RCI low hota hai.
        </p>
        <p style={S.p}><strong>Fix:</strong> In-row cooling units add karo high-density areas mein. PAC placement optimize karo.</p>

        <h3 style={S.h3}>High Density Racks Without Supplementary Cooling</h3>
        <p style={S.p}>
          10+ kW racks ke liye standard PAC cooling insufficient ho sakti hai.
        </p>
        <p style={S.p}><strong>Fix:</strong> In-row cooling, rear-door heat exchangers ya targeted supplementary cooling.</p>

        <hr style={S.divider} />

        {/* ── Section 13 ── */}
        <h2 id="preventive-maintenance" style={S.h1}>How to Maintain Good RCI</h2>

        <p style={S.p}>RCI maintain karna ek ongoing discipline hai — one-time fix nahi.</p>

        <h3 style={S.h3}>Physical Actions</h3>
        <ul style={S.ul}>
          <li style={S.li}>Har rack installation ke baad blanking panels verify karo — always</li>
          <li style={S.li}>Floor tiles quarterly audit karo — correct placement confirm karo</li>
          <li style={S.li}>Containment integrity monthly check karo</li>
          <li style={S.li}>PAC/CRAC filter maintenance regular rakho — dirty filters = reduced airflow = RCI drop</li>
          <li style={S.li}>Cable management — airflow block karne wali cable bundles manage karo</li>
        </ul>

        <h3 style={S.h3}>Monitoring Actions</h3>
        <ul style={S.ul}>
          <li style={S.li}>DCIM alerts configure karo — RCI 85% se neeche jaaye to immediate alert</li>
          <li style={S.li}>Temperature trends track karo — gradual deterioration early catch ho</li>
          <li style={S.li}>Seasonal changes note karo — summer mein outdoor temperature badhti hai, chiller load badhta hai, RCI impact possible</li>
          <li style={S.li}>Quarterly full temperature mapping — all racks</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 14 ── */}
        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ DCIM dashboard check karo — current RCI score</li>
          <li style={S.li}>✓ Any RCI alert active hai? Investigate karo</li>
          <li style={S.li}>✓ Hot spot alarms — BMS ya DCIM mein</li>
          <li style={S.li}>✓ Cold aisle temperature — uniform hai?</li>
          <li style={S.li}>✓ PAC/CRAC units all running? Any fault?</li>
          <li style={S.li}>✓ New rack installed aaj? — Blanking panels aur tiles verify karo</li>
          <li style={S.li}>✓ RCI trend — improving, stable, ya deteriorating?</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 15 ── */}
        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Full temperature mapping — all rack inlets measure karo</li>
          <li style={S.li}>✓ RCI aur RHI calculate karo (ya DCIM report generate karo)</li>
          <li style={S.li}>✓ Previous month se comparison — trend identify karo</li>
          <li style={S.li}>✓ Blanking panels walk — every rack row</li>
          <li style={S.li}>✓ Floor tile placement audit</li>
          <li style={S.li}>✓ Containment integrity check</li>
          <li style={S.li}>✓ PAC/CRAC filter status — PM schedule current hai?</li>
          <li style={S.li}>✓ Hot spots resolved? — Previous actions ne RCI improve kiya?</li>
          <li style={S.li}>✓ Capacity vs IT load review — buffer adequate hai?</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 16 ── */}
        <h2 id="safety" style={S.h1}>Safety Notes</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Hot aisle temperature measurement:</strong> Hot aisle 35–45°C tak ho sakti hai. IR thermometer bahar se use karo — prolonged exposure avoid karo.</li>
          <li style={S.li}><strong>Raised floor access:</strong> Temperature sensors raised floor mein lagane ke liye floor tiles carefully handle karo. Heavy tiles — proper lifting technique.</li>
          <li style={S.li}><strong>Working near live racks:</strong> Temperature measurement ke time hands tools se rack equipment se clear rakho — accidental contact avoid karo.</li>
          <li style={S.li}><strong>Thermal camera:</strong> Eye safety — direct IR flash avoid karo. Camera mein generally no risk, lekin standard PPE follow karo.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Section 17 ── */}
        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: RCI kya hota hai aur iska target kya hona chahiye?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> RCI = Rack Cooling Index — percentage metric jo measure karta hai ki kitne server racks ko ASHRAE recommended temperature range (18–27°C) mein cool air mil rahi hai. Target: &gt; 91% = Excellent. 81–90% = Good. Below 70% = Immediate action needed. 100% = har rack in range = perfect cooling delivery.
        </p>

        <h3 style={S.h3}>Q2: RCI low hai — pehle kya check karoge?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> Step 1: Temperature heatmap dekho — which racks/zones affected. Step 2: Affected racks mein blanking panels check karo. Step 3: Cold aisle ke floor tiles verify karo — perforated hai? Step 4: Containment intact hai? Step 5: PAC/CRAC units all running, setpoints correct? Step 6: Recent changes — new racks added?
        </p>

        <h3 style={S.h3}>Q3: RHI kya hota hai aur low RHI ka kya matlab hai?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> RHI = Return Heat Index — measure karta hai PAC/CRAC ko actual hot return air kitna mil raha hai. Low RHI (&lt;80%) = bypass air problem — cool air servers ko avoid karke PAC mein return ho rahi hai. Causes: wrong floor tiles (PAC ke saamne perforated), gaps in raised floor, no containment. Fix: tile placement correct karo, gaps seal karo.
        </p>

        <h3 style={S.h3}>Q4: RCI aur PUE mein kya relationship hai?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> PUE = energy efficiency metric (total power / IT power). RCI = cooling quality metric (cooling delivery effectiveness). Ye dono different things measure karte hain — dono zaroori hain. Good PUE lekin poor RCI possible hai — energy efficient cooling hai lekin sahi jagah deliver nahi ho rahi. Target: PUE &lt;1.4 AND RCI &gt;91%.
        </p>

        <h3 style={S.h3}>Q5: Bina DCIM ke RCI kaise measure karein?</h3>
        <p style={S.p}>
          <strong>Answer:</strong> Manual approach: IR thermometer se har rack inlet pe temperature measure karo (1U height). Spreadsheet mein enter karo. ASHRAE range (18–27°C) se compare karo. Count karo kitne in range hain. Simplified RCI % = (in-range racks / total racks) × 100. Quarterly survey ke liye kaafi hai. Large facilities ke liye DCIM invest karo — manual infeasible hai hundreds of racks ke saath.
        </p>

        <hr style={S.divider} />

        {/* ── Section 18 ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Overall RCI suddenly drop gaya — 90% se 72% pe</h3>
        <ul style={S.ul}>
          <li style={S.li}>Heatmap dekho — specific zone affected hai ya full DC?</li>
          <li style={S.li}>Kuch naya hua? — New racks installed, PAC unit down, layout change?</li>
          <li style={S.li}>PAC/CRAC status check karo — koi unit fault mein?</li>
          <li style={S.li}>Outdoor temperature spike? — Seasonal load? Chiller capacity impacted?</li>
          <li style={S.li}>Blanking panels check karo — new installations ke saath panels miss hue?</li>
        </ul>

        <h3 style={S.h3}>Scenario: Specific row mein har baar low RCI</h3>
        <ul style={S.ul}>
          <li style={S.li}>Affected row ka cold aisle temperature measure karo — adequate cool air aa rahi hai?</li>
          <li style={S.li}>Floor tiles us row mein check karo</li>
          <li style={S.li}>Nearest PAC unit distance — too far? In-row cooling consider karo</li>
          <li style={S.li}>Row ke racks mein density high hai kya? — 8+ kW racks ko supplementary cooling chahiye</li>
          <li style={S.li}>Containment us row mein proper hai?</li>
        </ul>

        <h3 style={S.h3}>Scenario: RHI consistently low (bypass air problem)</h3>
        <ul style={S.ul}>
          <li style={S.li}>Floor tile placement audit — PAC ke directly saamne perforated tiles?</li>
          <li style={S.li}>Raised floor gaps — cable openings sealed?</li>
          <li style={S.li}>Under-rack gaps — sealing strips lagao</li>
          <li style={S.li}>Containment end doors closed hain?</li>
          <li style={S.li}>PAC supply setpoints — too low? Raise karo, bypass reduce hoga</li>
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
          <li style={S.li}><strong>Measure first:</strong> Bina measurement ke improvement prove nahi ho sakti. Baseline RCI establish karo before any changes.</li>
          <li style={S.li}><strong>Blanking panels 100% always:</strong> Ye RCI ka sabse direct lever hai. Every rack, every empty space. No exceptions.</li>
          <li style={S.li}><strong>Temperature sensors every rack:</strong> Bare minimum — bottom (1U) sensor. Better — 3-point measurement. Best — DCIM integration with real-time monitoring.</li>
          <li style={S.li}><strong>Alert thresholds set karo:</strong> DCIM mein 85% alert set karo — before things get critical. React before server alarms come.</li>
          <li style={S.li}><strong>Change management mein RCI include karo:</strong> New rack install hone ke baad RCI check mandatory. Document it.</li>
          <li style={S.li}><strong>Monthly trend karo:</strong> Single data point se zyada useful hai trend. Improving hai ya deteriorating — ye pata ho.</li>
          <li style={S.li}><strong>RCI + RHI together dekho:</strong> Dono milkar poori cooling health picture dete hain. Ek metric sirf half story hai.</li>
          <li style={S.li}><strong>Seasonal baseline maintain karo:</strong> Summer mein RCI naturally slightly low ho sakta hai — normal range kya hai ye samjho.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "RCI (Rack Cooling Index) ek percentage metric hai — kitne server racks ko ASHRAE recommended range (18–27°C) mein cool air mil rahi hai.",
            "Target: > 91% = Excellent. 81–90% = Good. Below 70% = Poor — immediate action chahiye.",
            "RHI (Return Heat Index) PAC/CRAC ko kitna hot return air mil raha hai measure karta hai. High RHI = less bypass air = good.",
            "RCI low hone ke common causes: missing blanking panels, wrong floor tiles, no containment, insufficient cooling capacity.",
            "Fix sequence: Blanking panels first → floor tile audit → containment check → capacity assessment.",
            "DCIM software real-time RCI track karta hai. Bina DCIM ke quarterly manual mapping karo.",
            "RCI aur PUE dono zaroori hain — cooling quality aur energy efficiency, dono monitor karo.",
          ]}
        />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>
          RCI samajh aaya — cooling module complete hua. Ye sab topics ne milkar poora cooling picture diya:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — RCI improve karne ka primary method — airflow optimize karo.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Hot/cold aisle containment — RCI ka sabse effective lever.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — PAC aur CRAC — jo cool air deliver karte hain jisko RCI measure karta hai.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — Large data center cooling system — CRAH ke through RCI measure hota hai.</li>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — Chiller cooling chain ka heat rejection component.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
