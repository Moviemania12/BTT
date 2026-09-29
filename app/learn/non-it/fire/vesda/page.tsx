import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "VESDA — Very Early Smoke Detection in Data Centers | Behind The Tech",
  description:
    "What is VESDA, how does it work, why is it essential in a Data Center — aspirating smoke detection, working principle, components, maintenance and troubleshooting. In simple English.",
  keywords: [
    "vesda data center",
    "very early smoke detection",
    "aspirating smoke detector",
    "vesda vs smoke detector",
    "fire detection data center",
  ],
  openGraph: {
    title: "VESDA — Very Early Smoke Detection in Data Centers",
    description:
      "The first step of Data Center fire protection — how VESDA works, why it is different from a normal smoke detector, and why it is life-saving.",
    url: "https://behindthetech.in/learn/non-it/fire/vesda",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "VESDA Explained — Behind The Tech",
    description:
      "Very Early Smoke Detection Apparatus — the most important sensor system of Data Center fire protection, in simple language.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/vesda",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/vesda",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/vesda",
      "x-default": "https://behindthetech.in/learn/non-it/fire/vesda",
    },
  },
};

// ─── TOC headings ─────────────────────────────────────────────────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-vesda",        text: "What Is VESDA?",                         level: 2 },
  { id: "why-needed",           text: "Why Is VESDA Needed?",                   level: 2 },
  { id: "problem-statement",    text: "The Problem With Normal Smoke Detectors", level: 2 },
  { id: "working-principle",    text: "Working Principle",                       level: 2 },
  { id: "main-components",      text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",   text: "How VESDA Works Inside a Data Center",   level: 2 },
  { id: "alarm-levels",         text: "Alarm Levels",                            level: 2 },
  { id: "types",                text: "Types of VESDA Systems",                  level: 2 },
  { id: "installation",         text: "Installation",                            level: 2 },
  { id: "monitoring",           text: "Monitoring",                              level: 2 },
  { id: "advantages",           text: "Advantages",                              level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "testing",              text: "Testing",                                 level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",      text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "VESDA vs Normal Smoke Detector",          level: 2 },
  { id: "best-practices",       text: "Best Practices",                          level: 2 },
  { id: "key-takeaways",        text: "Key Takeaways",                           level: 2 },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

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
      text: "VESDA is an aspirating smoke detection system that actively samples air through a pipe network and detects smoke long before a fire — even before the smoke of a single cigarette.",
    },
    {
      label: "Why it is different from a normal detector",
      text: "A normal smoke detector waits until the smoke reaches it. VESDA pulls in the air itself and tests it — wherever there is smoke, however small it may be.",
    },
    {
      label: "How it works",
      text: "There is a pipe network on the ceiling — with small holes. A vacuum pump pulls air samples through these holes. This air goes into a laser chamber where smoke particles are detected.",
    },
    {
      label: "Where in a Data Center",
      text: "In the server hall ceiling, under the raised floor, in the UPS room, near cable trays — every place where a fire can start.",
    },
    {
      label: "When the alarm sounds",
      text: "VESDA has 4 alarm levels — Alert, Action, Fire 1, Fire 2. A normal detector has only one alarm. This four-level system gives the operations team early warning.",
    },
    {
      label: "Connection with FM200",
      text: "VESDA detects, FM200 or Novec extinguishes. The two work together. Because of VESDA's early detection, the suppression system is able to activate properly.",
    },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#dc2626,#dc2626)" }} />
      <div style={{ background: "rgba(220,38,38,0.03)", border: "1px solid rgba(220,38,38,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>🔍 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(220,38,38,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          If you have understood this much, the VESDA concept is clear. The full article is ahead — from working principle to testing.
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
      <div style={{ height: 2, background: "#ffa500" }} /> <div style={{ background: "rgba(255,165,0,0.04)", border: "1px solid rgba(255,165,0,0.16)", borderTop: "none", padding: "16px 20px 18px" }}> <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer's Tip</span> <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── WarningCard ──────────────────────────────────────────────────────────────

function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#dc2626" }} />
      <div style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.18)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#dc2626", fontWeight: 600, marginBottom: 9 }}>⚠️ Warning</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── WhyThisMatters ───────────────────────────────────────────────────────────

function WhyThisMatters({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#2563EB" }} />
      <div style={{ background: "rgba(0,255,204,0.04)", border: "1px solid rgba(0,255,204,0.18)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#2563EB", fontWeight: 600, marginBottom: 9 }}>Why This Matters In A Data Center</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── DCMapNote ────────────────────────────────────────────────────────────────

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#1f2937", marginBottom: 8 }}>On The Data Center Map</span>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
        {components.map((c) => (
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.16)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// ─── KeyTakeawayCard ──────────────────────────────────────────────────────────

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(220,38,38,0.04),rgba(37,99,235,0.03))", border: "1px solid rgba(220,38,38,0.14)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#dc2626,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "#1f2937" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FlowDiagram ──────────────────────────────────────────────────────────────

function FlowDiagram({ caption, steps }: { caption: string; steps: { icon: string; label: string; sublabel?: string }[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div style={{ borderRadius: 10, background: "rgba(220,38,38,0.02)", border: "1px solid rgba(220,38,38,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#dc2626", margin: "0 4px", opacity: 0.7 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

// ─── AlarmLevelTable ──────────────────────────────────────────────────────────

function AlarmLevelTable() {
  const rows = [
    { level: "Alert",  threshold: "~0.005% obs/m",  meaning: "Just a beginning — something is there", action: "Investigate. No urgency yet.", color: "#f59e0b" },
    { level: "Action", threshold: "~0.02% obs/m",   meaning: "Smoke concentration is rising", action: "Shut down HVAC. Investigation urgent.", color: "#f97316" },
    { level: "Fire 1", threshold: "~0.05% obs/m",   meaning: "Fire is probable", action: "Call the fire brigade. Prepare evacuation.", color: "#dc2626" },
    { level: "Fire 2", threshold: "~0.2%+ obs/m",   meaning: "Fire confirmed", action: "Suppression activate. Full evacuation.", color: "#7f1d1d" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(220,38,38,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Alarm Level</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Threshold (approx)</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Meaning</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Action Required</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(220,38,38,0.02)" }}>
              <td style={{ padding: "9px 14px", border: "1px solid rgba(220,38,38,0.08)", fontWeight: 700, color: row.color }}>{row.level}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{row.threshold}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.meaning}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── ComparisonTable ──────────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    { feature: "Detection method",       vesda: "Air actively sampled via pipes",    normal: "Waits for smoke to reach sensor" },
    { feature: "Detection speed",        vesda: "Minutes to hours before visible fire", normal: "Only when smoke is dense" },
    { feature: "Sensitivity",            vesda: "0.005% obscuration/m",              normal: "2–4% obscuration/m" },
    { feature: "Alarm levels",           vesda: "4 levels (Alert → Fire 2)",         normal: "1 level (Fire)" },
    { feature: "Coverage area",          vesda: "Large area with pipe network",      normal: "Limited to sensor location" },
    { feature: "False alarms",           vesda: "Lower (intelligent filtering)",     normal: "Higher (dust, insects trigger)" },
    { feature: "Installation",           vesda: "Complex — pipe network needed",     normal: "Simple — point sensor" },
    { feature: "Cost",                   vesda: "High",                              normal: "Low" },
    { feature: "Maintenance",            vesda: "Regular pipe cleaning, filter change", normal: "Minimal" },
    { feature: "Used in Data Centers",   vesda: "Standard practice",                 normal: "Supplementary only" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(220,38,38,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#dc2626", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>VESDA</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Normal Smoke Detector</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(220,38,38,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.vesda}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.normal}</td>
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
    q: "What is the full form of VESDA?",
    a: "VESDA = Very Early Smoke Detection Apparatus. This name is a registered trademark of the Xtralis company, which was the pioneer of this technology. It is now also used as a generic term for aspirating smoke detection systems.",
  },
  {
    q: "What is the biggest difference between VESDA and a normal smoke detector?",
    a: "A normal detector is passive — the alarm sounds when smoke comes and reaches the detector. VESDA is active — it samples air itself through the pipe network and detects smoke even at a very small concentration. VESDA can give an alert much earlier — the actual lead time depends on the application, environment and fire type.",
  },
  {
    q: "In how many zones is VESDA installed in a Data Center?",
    a: "Typically in separate zones — server hall, UPS room, battery room, raised floor plenum, cable vault and MDB room. Each zone has its own detection coverage. If there is a problem in one zone, the other zones remain unaffected.",
  },
  {
    q: "How common are VESDA false alarms?",
    a: "Much less than normal detectors. VESDA uses intelligent filtering — it filters out dust, humidity changes and non-fire particles. But cracks in the pipe, contamination during maintenance, or smoke entry from an AC duct — these can cause false alarms.",
  },
  {
    q: "What is the right way to test VESDA?",
    a: "By injecting a certified aerosol spray (smoke equivalent) into the sample points of the pipe. Real smoke or cigarettes are not used — they can cause contamination and calibration issues. The test is done 6-monthly or annually — with a fire consultant.",
  },
  {
    q: "What should be done if VESDA fails?",
    a: "Immediately verify whether the backup smoke detectors are active. A VESDA fault alarm will come on the BMS — acknowledge it and call a technician. Extra vigilance while VESDA is offline — increase physical rounds. Check whether the suppression system is manually armed.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(220,38,38,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>{item.q}</p>
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

export default function VESDAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="vesda" headings={HEADINGS} readingTimeMinutes={20} lang="en" alternateHref="/hi/learn/non-it/fire/vesda">

        {/* ── Intro ── */}
        <p style={S.p}>It is 2 AM.</p>

        <p style={S.p}>There is nobody in the Data Center — only the servers are running.</p>

        <p style={S.p}>In one corner of the server room, a capacitor inside a UPS unit is slowly overheating.</p>

        <p style={S.p}>No smoke yet. No flame yet. Just a very faint smell — which a person cannot even sense.</p>

        <p style={S.p}><strong>But VESDA detected it.</strong></p>

        <p style={S.p}>Alert level 1 triggered. A notification came on the BMS. The on-call engineer's phone rang.</p>

        <p style={S.p}>The engineer was on site in 20 minutes. An overheating capacitor was found in the UPS room. The problem was fixed. No fire happened. No downtime.</p>

        <p style={S.p}><strong>This is VESDA's job.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/vesda/vesda-overview.png"
              alt="VESDA aspirating smoke detection system installed in a data center — pipe network visible on ceiling"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            VESDA system — a pipe network on the Data Center ceiling. Air is pulled in through small sampling holes and analyzed in the detector unit.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        {/* ── What Is VESDA ── */}
        <h2 id="what-is-vesda" style={S.h1}>What Is VESDA?</h2>

        <p style={S.p}><strong>VESDA = Very Early Smoke Detection Apparatus.</strong></p>

        <p style={S.p}>It is an aspirating smoke detection system.</p>

        <p style={S.p}>"Aspirating" means — actively pulling in (inhaling) air.</p>

        <p style={S.p}>A normal smoke detector just sits and waits for smoke to come and touch it on its own.</p>

        <p style={S.p}>VESDA goes itself — it samples air from the whole space through the pipe network and analyzes it in a lab.</p>

        <p style={S.p}>It is so sensitive that it can detect even a very low smoke concentration — one that a person cannot sense.</p>

        <p style={S.p}><strong>In Data Centers this is life-saving technology.</strong></p>

        <DCMapNote components={["VESDA", "Fire Alarm Panel", "Suppression System", "BMS", "FM200 / Novec"]} />

        <hr style={S.divider} />

        {/* ── Why Needed ── */}
        <h2 id="why-needed" style={S.h1}>Why Is VESDA Needed?</h2>

        <p style={S.p}>Fire is a very big problem in a Data Center — not only because of equipment loss.</p>

        <p style={S.p}>Let's think about what would happen if a fire started in a Tier III data center:</p>

        <ul style={S.ul}>
          <li style={S.li}>Thousands of servers down at once — a loss of lakhs or crores</li>
          <li style={S.li}>Client data inaccessible — SLA breach — legal consequences</li>
          <li style={S.li}>Recovery time — days to weeks</li>
          <li style={S.li}>Reputation damage — permanent</li>
        </ul>

        <p style={S.p}>That is why the Data Center's golden rule is:</p>

        <p style={S.p}><strong>Detect the fire before it even starts.</strong></p>

        <WhyThisMatters>
          Fire in a Data Center is also more dangerous because there is a lot of combustible material here — cables, PCBs, capacitors, plastic enclosures. These materials are slow-burning and generate chemical smoke well in advance. A normal detector does not alarm until the smoke is visible. VESDA detects it in this "pre-fire" stage itself.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Problem Statement ── */}
        <h2 id="problem-statement" style={S.h1}>The Problem With Normal Smoke Detectors</h2>

        <p style={S.p}>Why does a normal home smoke detector not work for a Data Center?</p>

        <p style={S.p}>Let me explain with a simple example:</p>

        <p style={S.p}>At home, if a roti burns, the detector sounds — only when there is a lot of smoke.</p>

        <p style={S.p}>In a Data Center we need to know much earlier than that.</p>

        <InsightCard>
          The sensitivity level of a normal point smoke detector is typically 2-4% obscuration per meter. That means — the smoke is so thick that 2-4% of the light passing through it is blocked. High-sensitivity VESDA units can detect at 0.005% obscuration per meter — much more sensitive than the typical thresholds of point detectors (which can be around 2-4%). The exact ratio depends on the model, settings and application. Key takeaway: VESDA can detect even a very small smoke concentration.
        </InsightCard>

        <p style={S.p}>Problems of a normal detector:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Passive detection:</strong> It waits — it does not probe</li>
          <li style={S.li}><strong>Low sensitivity:</strong> It detects when there is already a lot of smoke</li>
          <li style={S.li}><strong>Point detection:</strong> It detects from only one place — what about the rest?</li>
          <li style={S.li}><strong>Single alarm:</strong> Only one level — fire. No warning.</li>
          <li style={S.li}><strong>Air flow problem:</strong> In a Data Center the HVAC air circulation is so strong that smoke gets diluted before reaching the detector</li>
        </ul>

        <p style={S.p}><strong>The solution to all these problems = VESDA.</strong></p>

        <hr style={S.divider} />

        {/* ── Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Understanding how VESDA works is very easy.</p>

        <p style={S.p}>Think of it as a very sensitive nose — one that constantly keeps smelling the air of the whole building.</p>

        <FlowDiagram
          caption="VESDA aspirating cycle — from air sampling to alarm"
          steps={[
            { icon: "🌬️", label: "Air Sample", sublabel: "Through pipe holes" },
            { icon: "🔧", label: "Aspirator", sublabel: "Vacuum pump" },
            { icon: "🧹", label: "Filter", sublabel: "Dust hata do" },
            { icon: "🔴", label: "Laser Chamber", sublabel: "Smoke detect" },
            { icon: "🚨", label: "Alarm", sublabel: "4 levels" },
          ]}
        />

        <h3 style={S.h3}>Step 1 — Air Sampling</h3>
        <p style={S.p}>Plastic pipes are installed on the ceiling. Every pipe has small holes — sampling points.</p>

        <p style={S.p}>These holes are at carefully calculated places so that the air of the whole room is evenly sampled.</p>

        <h3 style={S.h3}>Step 2 — Vacuum Pump (Aspirator)</h3>
        <p style={S.p}>Inside the VESDA unit there is an aspirator (vacuum pump).</p>

        <p style={S.p}>This pump keeps pulling air continuously — a little air from every sampling hole.</p>

        <p style={S.p}>This air comes to the VESDA unit through the pipe network.</p>

        <h3 style={S.h3}>Step 3 — Filtration</h3>
        <p style={S.p}>The air first passes through a filter.</p>

        <p style={S.p}>Normal dust, insects or other particles are stopped here.</p>

        <p style={S.p}>Only pure air (with any smoke particles) goes ahead.</p>

        <h3 style={S.h3}>Step 4 — Laser Detection Chamber</h3>
        <p style={S.p}>This is where the actual magic happens.</p>

        <p style={S.p}>The air passes through a high-sensitivity laser chamber.</p>

        <p style={S.p}>The laser beam keeps firing continuously.</p>

        <p style={S.p}>If there is any smoke particle in the air — even a tiny one — the laser's scatter pattern changes.</p>

        <p style={S.p}>The detector catches this change and calculates the obscuration level.</p>

        <h3 style={S.h3}>Step 5 — Alarm Classification</h3>
        <p style={S.p}>The obscuration level is compared with pre-set thresholds.</p>

        <p style={S.p}>Depending on the level — an Alert, Action, Fire 1 or Fire 2 alarm is triggered.</p>

        <EngineerTip>
          Keeping the laser chamber clean is very important. If dust accumulates inside the chamber, false alarms can come or the system's sensitivity can drop. Quarterly or semi-annual laser chamber cleaning is a critical part of VESDA maintenance.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Main Components ── */}
        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Detector Unit (Main Unit)</h3>
        <p style={S.p}>The brain of VESDA. It contains the laser chamber, aspirator pump, filter and electronics.</p>

        <p style={S.p}>It is mounted on a wall or a rack — typically in a dedicated fire detection room or outside the server hall.</p>

        <h3 style={S.h3}>2. Sampling Pipe Network</h3>
        <p style={S.p}>Red colored plastic pipes — CPVC or ABS material.</p>

        <p style={S.p}>They are installed in a grid pattern on the ceiling or under the raised floor.</p>

        <p style={S.p}>Every pipe has sampling holes — typically 3mm diameter.</p>

        <h3 style={S.h3}>3. Sampling Points / Capillaries</h3>
        <p style={S.p}>The pipe's holes are the sampling points.</p>

        <p style={S.p}>Hole size and spacing are calculated according to the coverage area.</p>

        <p style={S.p}>Holes must not be blocked — by cobwebs, dust or paint.</p>

        <h3 style={S.h3}>4. Air Filter (Particulate Filter)</h3>
        <p style={S.p}>It is inside the main unit.</p>

        <p style={S.p}>It filters non-smoke particles — reduces false alarms.</p>

        <p style={S.p}>Regular replacement is essential — typically every 6-12 months.</p>

        <h3 style={S.h3}>5. Display Unit / Remote Display</h3>
        <p style={S.p}>It shows the VESDA system status — current alarm level, zone status, fault alerts.</p>

        <p style={S.p}>It is installed at the security desk or in the NOC (Network Operations Center).</p>

        <h3 style={S.h3}>6. Fire Alarm Panel Interface</h3>
        <p style={S.p}>VESDA connects directly to the fire alarm panel.</p>

        <p style={S.p}>On Fire 1 or Fire 2 — the automatic suppression system can be triggered.</p>

        <hr style={S.divider} />

        {/* ── How It Works in DC ── */}
        <h2 id="how-it-works-in-dc" style={S.h1}>How VESDA Works Inside a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/vesda/vesda-pipe-network-datacenter.png"
              alt="VESDA red pipe network installed on data center ceiling with sampling points visible between server racks"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            VESDA red pipe network — on the server hall ceiling. Pipes in a grid pattern, sampling holes at regular intervals on every pipe.
          </figcaption>
        </figure>

        <p style={S.p}>In a Data Center, VESDA is installed in multiple zones:</p>

        <h3 style={S.h3}>Zone 1 — Server Hall (Ceiling Level)</h3>
        <p style={S.p}>The pipe network covers the whole ceiling.</p>

        <p style={S.p}>There is typically one sampling point every 6-9 square meters.</p>

        <p style={S.p}>It is calculated considering the strong HVAC airflow.</p>

        <h3 style={S.h3}>Zone 2 — Raised Floor Plenum</h3>
        <p style={S.p}>There are pipes under the raised floor too.</p>

        <p style={S.p}>Cables, PDUs and floor-mounted equipment are here — a fire risk area.</p>

        <p style={S.p}>Detecting smoke down here is very important — a normal detector cannot reach here.</p>

        <h3 style={S.h3}>Zone 3 — UPS Room</h3>
        <p style={S.p}>UPS equipment has capacitors and batteries — a major fire risk.</p>

        <p style={S.p}>A separate VESDA zone — independent of the server hall.</p>

        <h3 style={S.h3}>Zone 4 — Battery Room</h3>
        <p style={S.p}>Lead-acid or VRLA batteries can release hydrogen gas — an explosive risk.</p>

        <p style={S.p}>VESDA gives dedicated coverage here too.</p>

        <InsightCard>
          HVAC airflow is both a challenge and an advantage for VESDA. Challenge: smoke gets diluted if the airflow is strong. Advantage: air circulation helps carry smoke particles to the sampling pipes. That is why the VESDA pipe network is designed according to the HVAC airflow pattern — the wind-tunnel effect is used.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Alarm Levels ── */}
        <h2 id="alarm-levels" style={S.h1}>Alarm Levels</h2>

        <p style={S.p}>The most important feature of VESDA is — <strong>the four-level alarm system.</strong></p>

        <p style={S.p}>Normal detector: One level — Fire. Meaning, by the time it detects, it is already very late.</p>

        <p style={S.p}>VESDA: Four levels — a gradual warning that gives response time.</p>

        <AlarmLevelTable />

        <EngineerTip>
          At the Alert and Action levels, VESDA typically does not trigger suppression — it gives the operations team time to investigate. At higher alarm levels, suppression release depends on the approved cause-and-effect logic, releasing panel design and detection arrangement. This is a site-specific design decision — always look at the as-built drawings and the cause-and-effect chart. At Alert: "investigate first, suppress only when confirmed."
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Types ── */}
        <h2 id="types" style={S.h1}>Types of VESDA Systems</h2>

        <h3 style={S.h3}>1. VESDA-E VEA (Economy Range)</h3>
        <p style={S.p}>Basic aspirating detection. For small facilities.</p>

        <p style={S.p}>One pipe and limited sampling points. Cost-effective.</p>

        <h3 style={S.h3}>2. VESDA LaserPLUS / VESDA-E VLP</h3>
        <p style={S.p}>Widely used model — high sensitivity, multiple pipe support, wide area coverage.</p>

        <p style={S.p}>Note: The product range under Honeywell keeps evolving — verify currently available models with a distributor.</p>

        <h3 style={S.h3}>3. VESDA LaserSCANNER / Ultra-High Sensitivity Models</h3>
        <p style={S.p}>For ultra-high sensitivity applications — clean rooms, museums, critical infrastructure.</p>

        <p style={S.p}>It is also used in high-criticality data center applications where maximum early warning is essential.</p>

        <h3 style={S.h3}>4. Other Brands (VESDA-equivalent)</h3>
        <p style={S.p}>VESDA was originally a Xtralis product and is now under Honeywell.</p>

        <p style={S.p}>Other brands: Siemens ASD, Fike FAAST, Kidde Argus, Hochiki ASD.</p>

        <p style={S.p}>Same principle — aspirating smoke detection. VESDA is just a brand name.</p>

        <hr style={S.divider} />

        {/* ── Installation ── */}
        <h2 id="installation" style={S.h1}>Installation</h2>

        <p style={S.p}>VESDA installation is a specialized job.</p>

        <p style={S.p}>Installing pipes at random places does not work — proper design is essential.</p>

        <h3 style={S.h3}>Design Considerations</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Room dimensions:</strong> Length, width, height — all matter for the pipe layout</li>
          <li style={S.li}><strong>HVAC airflow:</strong> Air supply and return points — where the smoke will drift</li>
          <li style={S.li}><strong>Hot/cold aisles:</strong> Smoke will be diluted in the cold aisle — adjust pipe placement</li>
          <li style={S.li}><strong>Obstruction:</strong> Cable trays, ducting — pipe routing is affected</li>
          <li style={S.li}><strong>Sampling transport time:</strong> The travel time of air from the sampling hole to the detector unit — a range of typically 60-120 seconds is targeted in design, but the actual limit depends on the applicable standard and manufacturer specification</li>
        </ul>

        <h3 style={S.h3}>Pipe Sizing Rules</h3>
        <p style={S.p}>Pipes are calculated with design software — ASPIRE or similar tools.</p>

        <p style={S.p}>The flow of every sampling hole must be balanced — otherwise some areas will become more sensitive and some less sensitive.</p>

        <p style={S.p}>An end cap must be installed on the pipe — to calculate transport time.</p>

        <WarningCard>
          Never drill VESDA pipes randomly in the field. Hole size, spacing and pipe length — all must be calculated with the manufacturer's software. In a wrong design, detection in some zones can fail — and you will not even know. A mandatory commissioning test is done after installation — only then is it confirmed that the system is working properly.
        </WarningCard>

        <hr style={S.divider} />

        {/* ── Monitoring ── */}
        <h2 id="monitoring" style={S.h1}>Monitoring</h2>

        <p style={S.p}>VESDA demands 24×7 monitoring — it is a critical life-safety system.</p>

        <h3 style={S.h3}>BMS Integration</h3>
        <p style={S.p}>The VESDA output connects directly to the BMS (Building Management System).</p>

        <p style={S.p}>Alarm levels are shown in real time on the BMS dashboard.</p>

        <p style={S.p}>An SMS or email alert goes to the on-call engineer.</p>

        <h3 style={S.h3}>Fire Alarm Control Panel (FACP)</h3>
        <p style={S.p}>Fire 1 and Fire 2 signals go to the FACP.</p>

        <p style={S.p}>The FACP can give the suppression release signal through approved cause-and-effect logic — the actual triggering arrangement depends on the system design and AHJ approval.</p>

        <p style={S.p}>The building evacuation alarm also sounds from the FACP.</p>

        <h3 style={S.h3}>24×7 NOC Monitoring</h3>
        <p style={S.p}>Serious data centers have a dedicated NOC.</p>

        <p style={S.p}>The VESDA status is always visible on the NOC screen.</p>

        <p style={S.p}>Even at the Alert level, the NOC operator investigates — they do not wait.</p>

        <hr style={S.divider} />

        {/* ── Advantages ── */}
        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Very early detection:</strong> Early warning is obtained — the actual lead time depends on the environment and application</li>
          <li style={S.li}><strong>High sensitivity:</strong> Significantly more sensitive than point detectors — the exact ratio depends on the model and settings</li>
          <li style={S.li}><strong>Four alarm levels:</strong> Gradual warning — avoids false suppression discharge</li>
          <li style={S.li}><strong>Large area coverage:</strong> One unit can cover a whole floor</li>
          <li style={S.li}><strong>Works in high airflow:</strong> Effective even in strong HVAC airflow</li>
          <li style={S.li}><strong>Raised floor coverage:</strong> VESDA covers even the areas a normal detector misses</li>
          <li style={S.li}><strong>Remote monitoring:</strong> BMS integration — real-time visibility</li>
          <li style={S.li}><strong>Less false alarms:</strong> Intelligent filtering from point detectors</li>
          <li style={S.li}><strong>Industry best practice:</strong> Widely used in Tier III and Tier IV level facilities — the specific requirement depends on the project, local code, AHJ and design</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Disadvantages ── */}
        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>High cost:</strong> Significantly more expensive than normal detectors — equipment + installation + commissioning</li>
          <li style={S.li}><strong>Complex installation:</strong> Proper design is essential — only a qualified installer should do it</li>
          <li style={S.li}><strong>Pipe maintenance:</strong> Pipes have to be kept clean — blockage or leakage makes detection fail</li>
          <li style={S.li}><strong>Filter replacement:</strong> Regular filter change — the maintenance cost is ongoing</li>
          <li style={S.li}><strong>Power dependent:</strong> VESDA needs continuous power — battery backup required</li>
          <li style={S.li}><strong>Transport time delay:</strong> Air takes time to come from remote sampling points — it is not instantaneous</li>
          <li style={S.li}><strong>Specialized technician:</strong> A trained specialist is needed for maintenance</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>VESDA is a fire safety system — its maintenance is life-critical.</p>

        <p style={S.p}><strong>Monthly checks:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Check the VESDA unit display — is there any fault indicator?</li>
          <li style={S.li}>Is the aspirator fan running — sound check</li>
          <li style={S.li}>Check the filter status indicator</li>
          <li style={S.li}>Are the VESDA points active on the BMS?</li>
          <li style={S.li}>Visually inspect the pipe sampling holes — are they blocked?</li>
        </ul>

        <p style={S.p}><strong>Quarterly checks:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Inspect the particulate filter — replace if needed</li>
          <li style={S.li}>Sampling pipes visual inspection — cracks, disconnections</li>
          <li style={S.li}>Verify all alarm levels — using test aerosol</li>
          <li style={S.li}>Test the BMS interface — was the alarm received properly?</li>
          <li style={S.li}>Test the suppression system interface (with suppression isolated)</li>
        </ul>

        <p style={S.p}><strong>Annual checks (by specialist):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Full system commissioning re-test</li>
          <li style={S.li}>Laser chamber cleaning and calibration check</li>
          <li style={S.li}>Check all pipe joints — air leakage test</li>
          <li style={S.li}>Transport time verification — of every pipe</li>
          <li style={S.li}>Battery backup test</li>
          <li style={S.li}>Documentation update — maintenance log, as-built drawings</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Testing ── */}
        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>Testing VESDA is mandatory — it is not a passive system, it is active, so prove that it works.</p>

        <h3 style={S.h3}>Functional Test — Aerosol Method</h3>
        <p style={S.p}>Spray certified smoke aerosol near the holes of the sampling pipe.</p>

        <p style={S.p}>Check that the VESDA unit triggers the proper alarm level.</p>

        <p style={S.p}>Verify whether the signal reached the BMS and FACP.</p>

        <h3 style={S.h3}>Transport Time Test</h3>
        <p style={S.p}>Spray aerosol at the farthest sampling point.</p>

        <p style={S.p}>Measure the time — how long it took for the alarm to trigger.</p>

        <p style={S.p}>The transport time must be within the limit of the applicable standard (e.g. AS 1851, BS EN 54-20) and manufacturer spec — typically the 60-120 seconds range. If it is higher, review the design.</p>

        <h3 style={S.h3}>End-to-End Test (with Suppression Isolated)</h3>
        <p style={S.p}>Do the full test with the suppression system kept isolated.</p>

        <p style={S.p}>VESDA → FACP → Suppression panel — verify the signal flow.</p>

        <p style={S.p}>This test should be annual — with a certified fire contractor.</p>

        <WarningCard>
          During a VESDA test, ISOLATE the FM200 or Novec suppression system — otherwise it will discharge accidentally. One FM200 cylinder discharge = a loss of lakhs + downtime. Inform the Operations team before the test. Make an entry in the test log. After the test, RE-ARM the suppression system and confirm it.
        </WarningCard>

        <hr style={S.divider} />

        {/* ── Standards ── */}
        <h2 id="standards" style={S.h1}>Standards</h2>

        <p style={S.p}>VESDA installation and maintenance follow globally accepted standards:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>BS EN 54-20:</strong> European standard for aspirating smoke detection systems</li>
          <li style={S.li}><strong>AS 1670.1:</strong> Australian standard — widely referenced in Asia-Pacific</li>
          <li style={S.li}><strong>NFPA 72:</strong> US standard — National Fire Alarm and Signaling Code</li>
          <li style={S.li}><strong>NBC (National Building Code) India:</strong> Fire protection requirements for commercial facilities</li>
          <li style={S.li}><strong>Uptime Institute Tier Standards:</strong> Fire alarm and early smoke detection are essential — the specific system type depends on project requirements and the AHJ</li>
          <li style={S.li}><strong>TIA-942:</strong> Data Center infrastructure standard — fire detection requirements</li>
        </ul>

        <InsightCard>
          In India, following the NBC and local fire NOC requirements is mandatory. In some states, aspirating smoke detection is explicitly required for data centers above a certain capacity. Always verify the guidelines with the local Fire Officer before design — requirements can vary from state to state.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Real Example ── */}
        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Facility:</strong> Tier III colocation data center, 5000 sqm, Mumbai.</p>

        <p style={S.p}><strong>VESDA design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall ceiling: 4 VESDA units, 8 pipes each — full coverage</li>
          <li style={S.li}>Raised floor plenum: 2 VESDA units — coverage underneath</li>
          <li style={S.li}>UPS room: 1 VESDA unit — dedicated</li>
          <li style={S.li}>Battery room: 1 VESDA unit — dedicated</li>
          <li style={S.li}>MDB room: 1 VESDA unit — high electrical fire risk</li>
        </ul>

        <p style={S.p}><strong>Integration:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Alert + Action — BMS notification + NOC alert</li>
          <li style={S.li}>Fire 1 — FACP trigger + building alarm + suppression system armed (as per approved C&E logic)</li>
          <li style={S.li}>Fire 2 — Suppression release signal + evacuation alarm (as per approved C&E logic)</li>
        </ul>

        <p style={S.p}><strong>Result:</strong> This facility had 4 early warnings in 3 years — not a single one became a fire. The engineers fixed the problem in advance.</p>

        <hr style={S.divider} />

        {/* ── Common Mistakes ── */}
        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Pipes Not Cleaned</h3>
        <p style={S.p}>Dirty pipes → reduced airflow → missed detection.</p>

        <p style={S.p}>Schedule regular pipe flushing — at least annually.</p>

        <h3 style={S.h3}>Mistake 2 — Filter Not Changed</h3>
        <p style={S.p}>Clogged filter → airflow drop → transport time increase → detection delay.</p>

        <p style={S.p}>Put the filter change schedule into the BMS maintenance calendar.</p>

        <h3 style={S.h3}>Mistake 3 — Sampling Holes Blocked</h3>
        <p style={S.p}>Paint, dust buildup or physical obstruction closes the holes.</p>

        <p style={S.p}>Visual inspection quarterly — are the sampling holes open?</p>

        <h3 style={S.h3}>Mistake 4 — Test Not Done After Changes</h3>
        <p style={S.p}>A new rack was added, a ceiling tile was changed, a cable tray was moved — the pipe can be disturbed.</p>

        <p style={S.p}>Make a VESDA test mandatory after every major change.</p>

        <h3 style={S.h3}>Mistake 5 — Alarm Levels Not Set Correctly</h3>
        <p style={S.p}>Default settings are not suitable for every facility.</p>

        <p style={S.p}>Verify site-specific threshold settings with the commissioning engineer.</p>

        <h3 style={S.h3}>Mistake 6 — Suppression Not Isolated During Test</h3>
        <p style={S.p}>Sabse costly mistake. Accidentally FM200 discharge → massive loss.</p>

        <p style={S.p}>Strictly follow the suppression isolation procedure before every test.</p>

        <hr style={S.divider} />

        {/* ── Interview Questions ── */}
        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the full form of VESDA and how does it work?</h3>
        <p style={S.p}><strong>Answer:</strong> VESDA = Very Early Smoke Detection Apparatus. It is an aspirating smoke detection system. It actively samples air through a pipe network, analyzes it in a laser chamber, and detects smoke much earlier than point detectors. It gives four alarm levels — Alert, Action, Fire 1, Fire 2.</p>

        <h3 style={S.h3}>Q2: What is the main difference between VESDA and a normal point smoke detector?</h3>
        <p style={S.p}><strong>Answer:</strong> A normal detector is passive — it waits for the smoke to come. VESDA is active — it samples the air itself. A normal detector covers only one point. VESDA covers the whole space through the pipe network. There is a significant difference in sensitivity — the exact ratio depends on the model and application. A normal one has one alarm level, VESDA has four levels.</p>

        <h3 style={S.h3}>Q3: At which places is VESDA installed in a Data Center?</h3>
        <p style={S.p}><strong>Answer:</strong> Server hall ceiling, raised floor plenum, UPS room, battery room, MDB room, cable vault — basically every place where there is fire risk and a normal detector will not be effective.</p>

        <h3 style={S.h3}>Q4: What action should be taken on a VESDA Alert alarm?</h3>
        <p style={S.p}><strong>Answer:</strong> Suppression is not activated at the Alert level. Investigate immediately — go to the affected zone and do a physical check. Shut down HVAC zone-wise. If nothing is found, keep monitoring. If the level rises to Action, alert the fire brigade.</p>

        <h3 style={S.h3}>Q5: How is VESDA tested?</h3>
        <p style={S.p}><strong>Answer:</strong> First isolate the FM200 / Novec suppression. Use certified smoke aerosol spray near the sampling holes. Verify that the alarm triggered properly — on the VESDA unit, BMS and FACP. Check the transport time. Re-arm the suppression system after the test. Document everything in the log.</p>

        <hr style={S.divider} />

        {/* ── Comparison ── */}
        <h2 id="comparison" style={S.h1}>VESDA vs Normal Smoke Detector</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        {/* ── Best Practices ── */}
        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Design zone-wise:</strong> Do not make one big zone — server hall, UPS and battery should be in separate zones</li>
          <li style={S.li}><strong>BMS integration mandatory:</strong> VESDA should not run only standalone — real-time visibility on the BMS is essential</li>
          <li style={S.li}><strong>Investigate at the Alert level:</strong> Do not ignore an Alert — it is the first signal of a fire</li>
          <li style={S.li}><strong>Maintain a maintenance log:</strong> Every test, filter change, cleaning — document everything</li>
          <li style={S.li}><strong>Do an annual commissioning test:</strong> With a certified contractor — this is mandatory</li>
          <li style={S.li}><strong>Pipe inspection quarterly:</strong> Detect blocked holes and leaky joints</li>
          <li style={S.li}><strong>Keep normal detectors too:</strong> Point detectors along with VESDA — backup protection</li>
          <li style={S.li}><strong>Set alarm thresholds site-specifically:</strong> Do not accept default settings — verify with the commissioning engineer</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "VESDA = Very Early Smoke Detection Apparatus — it samples air through a pipe network and analyzes it in a laser chamber.",
          "Significantly more sensitive than point detectors — it can detect a very small smoke concentration. Lead time depends on the application and environment.",
          "Four alarm levels: Alert → Action → Fire 1 → Fire 2. The gradual warning gives the operations team response time.",
          "Multiple zones in a Data Center: server hall ceiling, raised floor, UPS room, battery room — coverage everywhere.",
          "Maintenance is critical — pipes, filter and laser chamber must all stay clean, otherwise detection can fail.",
          "Isolate suppression before a test — never break this rule.",
          "VESDA detects, FM200 or Novec extinguishes — together they make a complete fire protection system.",
        ]} />

        <hr style={S.divider} />

        {/* ── FAQ ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        {/* ── Related Topics ── */}
        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>VESDA has detected the smoke. Now let's learn how the fire is extinguished:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — the suppression system triggered after VESDA. The most common clean agent in Data Centers.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — an environment-friendly alternative to FM200. Next-gen suppression.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — water-based fire suppression — how it is used in a Data Center with a special design.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — the building-level fire fighting system — for the external fire brigade.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
