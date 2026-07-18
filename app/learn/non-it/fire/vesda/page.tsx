import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "VESDA — Very Early Smoke Detection in Data Centers | Behind The Tech",
  description:
    "VESDA kya hota hai, kaise kaam karta hai, Data Center mein kyun zaroori hai — aspirating smoke detection, working principle, components, maintenance aur troubleshooting. Simple Hinglish mein.",
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
      "Data Center fire protection ka pehla step — VESDA kaise kaam karta hai, normal smoke detector se kyun alag hai, aur ye kyun life-saving hai.",
    url: "https://behindthetech.in/learn/non-it/fire/vesda",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VESDA Explained — Behind The Tech",
    description:
      "Very Early Smoke Detection Apparatus — Data Center fire protection ka sabse important sensor system, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/vesda" },
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
      label: "Ek line mein",
      text: "VESDA ek aspirating smoke detection system hai jo pipe network ke through air actively sample karta hai aur fire se bahut pehle — mere ek cigarette ke dhuen se bhi pehle — smoke detect kar leta hai.",
    },
    {
      label: "Normal detector se alag kyun",
      text: "Normal smoke detector wait karta hai jab tak smoke uske paas tak nahi pahunch jaata. VESDA khud air kheenchta hai aur test karta hai — kahin bhi smoke ho, chahiye wo kaafi chhota kyun na ho.",
    },
    {
      label: "Kaise kaam karta hai",
      text: "Ceiling pe pipe network hota hai — chhote holes ke saath. Vacuum pump in holes se air sample kheenchta hai. Ye air laser chamber mein jaati hai jahan smoke particles detect hote hain.",
    },
    {
      label: "Data Center mein kahan",
      text: "Server hall ki ceiling mein, raised floor ke neeche, UPS room mein, cable trays ke paas — har woh jagah jahan fire shuru ho sakti hai.",
    },
    {
      label: "Alarm kab bajta hai",
      text: "VESDA ke 4 alarm levels hain — Alert, Action, Fire 1, Fire 2. Normal detector pe sirf ek alarm hota hai. Ye four-level system operations team ko early warning deta hai.",
    },
    {
      label: "FM200 se connection",
      text: "VESDA detect karta hai, FM200 ya Novec bujhaata hai. Dono milkar kaam karte hain. VESDA ki early detection se suppression system properly activate ho pata hai.",
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
          Bas itna samajh gaye to VESDA ka concept clear hai. Aage poora article hai — working principle se testing tak.
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
      <div style={{ background: "rgba(255,165,0,0.04)", border: "1px solid rgba(255,165,0,0.16)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer Ki Tip</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
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
    { level: "Alert",  threshold: "~0.005% obs/m",  meaning: "Mere shuruat — kuch toh hai", action: "Investigation karo. Koi urgency nahi abhi.", color: "#f59e0b" },
    { level: "Action", threshold: "~0.02% obs/m",   meaning: "Smoke concentration badh rahi hai", action: "HVAC band karo. Investigation urgent.", color: "#f97316" },
    { level: "Fire 1", threshold: "~0.05% obs/m",   meaning: "Fire probable hai", action: "Fire brigade call karo. Evacuation prepare.", color: "#dc2626" },
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
    q: "VESDA ka full form kya hai?",
    a: "VESDA = Very Early Smoke Detection Apparatus. Ye naam Xtralis company ka registered trademark hai jo is technology ki pioneer thi. Ab isko generic term ke roop mein bhi use karte hain aspirating smoke detection systems ke liye.",
  },
  {
    q: "VESDA aur normal smoke detector mein sabse bada fark kya hai?",
    a: "Normal detector passive hai — smoke aakar detector tak pahunche tab alarm bajta hai. VESDA active hai — pipe network ke zariye khud air sample karta hai aur bahut chhoti concentration mein bhi smoke detect karta hai. VESDA bahut pehle alert de sakta hai — actual lead time application, environment, aur fire type pe depend karta hai.",
  },
  {
    q: "Data Center mein VESDA kitne zones mein lagaya jaata hai?",
    a: "Typically alag zones mein — server hall, UPS room, battery room, raised floor plenum, cable vault, aur MDB room. Har zone ka apna detection coverage hota hai. Ek zone mein problem ho to doosre zones unaffected rehte hain.",
  },
  {
    q: "VESDA false alarm kitna common hai?",
    a: "Normal detectors se kaafi kam. VESDA intelligent filtering use karta hai — dust, humidity changes aur non-fire particles ko filter karta hai. Lekin pipe mein cracks, maintenance ke time contamination, ya AC duct se smoke entry — ye false alarm cause kar sakte hain.",
  },
  {
    q: "VESDA ko test karne ka sahi tarika kya hai?",
    a: "Certified aerosol spray (smoke equivalent) pipe ke sample points mein inject karke. Real smoke ya cigarette use nahi karte — contamination aur calibration issues ho sakte hain. Test 6 monthly ya annually hota hai — fire consultant ke saath.",
  },
  {
    q: "Agar VESDA fail ho jaye to kya karna chahiye?",
    a: "Immediately backup smoke detectors active hain ya nahi verify karo. VESDA fault alarm BMS pe aayega — acknowledge karo aur technician call karo. VESDA offline rehne tak extra vigilance — physical rounds increase karo. Suppression system manually armed hai ya nahi check karo.",
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
      <ArticleLayout slug="vesda" headings={HEADINGS} readingTimeMinutes={20}>

        {/* ── Intro ── */}
        <p style={S.p}>Raat ke 2 baj rahe hain.</p>

        <p style={S.p}>Data Center mein koi nahi hai — sirf servers chal rahe hain.</p>

        <p style={S.p}>Server room ke ek corner mein ek UPS unit ke andar ek capacitor slowly overheating ho raha hai.</p>

        <p style={S.p}>Abhi tak koi smoke nahi. Abhi tak koi flame nahi. Sirf ek bahut halki si smell — jo insaan feel bhi nahi kar sakta.</p>

        <p style={S.p}><strong>Lekin VESDA ne detect kar liya.</strong></p>

        <p style={S.p}>Alert level 1 trigger hua. BMS pe notification aaya. On-call engineer ka phone baja.</p>

        <p style={S.p}>Engineer 20 minute mein site par tha. UPS room mein overheating capacitor mili. Problem fix ho gayi. Koi fire nahi huyi. Koi downtime nahi.</p>

        <p style={S.p}><strong>Yahi hai VESDA ka kaam.</strong></p>

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
            VESDA system — Data Center ceiling pe pipe network. Chhote sampling holes se air kheenchi jaati hai aur detector unit mein analyze hoti hai.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        {/* ── What Is VESDA ── */}
        <h2 id="what-is-vesda" style={S.h1}>What Is VESDA?</h2>

        <p style={S.p}><strong>VESDA = Very Early Smoke Detection Apparatus.</strong></p>

        <p style={S.p}>Ye ek aspirating smoke detection system hai.</p>

        <p style={S.p}>"Aspirating" ka matlab hai — air ko actively kheenchna (inhale karna).</p>

        <p style={S.p}>Normal smoke detector baitta rehta hai aur wait karta hai ki smoke khud aakar usse touch kare.</p>

        <p style={S.p}>VESDA khud jaata hai — pipe network ke through puri jagah se air sample karta hai aur lab mein analyze karta hai.</p>

        <p style={S.p}>Itna sensitive hai ki bahut low smoke concentration pe bhi — jo insaan feel nahi kar sakta — detect ho sakta hai.</p>

        <p style={S.p}><strong>Data Centers mein ye life-saving technology hai.</strong></p>

        <DCMapNote components={["VESDA", "Fire Alarm Panel", "Suppression System", "BMS", "FM200 / Novec"]} />

        <hr style={S.divider} />

        {/* ── Why Needed ── */}
        <h2 id="why-needed" style={S.h1}>Why Is VESDA Needed?</h2>

        <p style={S.p}>Data Center mein fire bahut badi problem hai — sirf equipment loss ki wajah se nahi.</p>

        <p style={S.p}>Sochte hain kya hoga agar ek Tier III data center mein fire lag jaaye:</p>

        <ul style={S.ul}>
          <li style={S.li}>Hazaron servers ek saath down — lakhs ya crores ka nuksaan</li>
          <li style={S.li}>Client data inaccessible — SLA breach — legal consequences</li>
          <li style={S.li}>Recovery time — days to weeks</li>
          <li style={S.li}>Reputation damage — permanent</li>
        </ul>

        <p style={S.p}>Isliye Data Center ka golden rule hai:</p>

        <p style={S.p}><strong>Fire ko start hone se pehle hi detect karo.</strong></p>

        <WhyThisMatters>
          Data Center mein fire zyada dangerous isliye bhi hoti hai kyunki yahan kaafi combustible material hota hai — cables, PCBs, capacitors, plastic enclosures. Ye materials slow-burning hote hain aur bahut pehle se chemical smoke generate karte hain. Normal detector tab tak alarm nahi deta jab tak smoke visible na ho. VESDA is "pre-fire" stage mein hi detect kar leta hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── Problem Statement ── */}
        <h2 id="problem-statement" style={S.h1}>The Problem With Normal Smoke Detectors</h2>

        <p style={S.p}>Ghar mein normal smoke detector kyun kaam nahi karta Data Center ke liye?</p>

        <p style={S.p}>Samjhao ek simple example se:</p>

        <p style={S.p}>Ghar mein roti jal jaaye to detector bajta hai — tabhi jab kaafi zyada smoke ho jaata hai.</p>

        <p style={S.p}>Data Center mein humein isse kaafi pehle pata chahiye.</p>

        <InsightCard>
          Normal point smoke detector ka sensitivity level typically 2-4% obscuration per meter hota hai. Matlab — smoke itna thick ho ki us se guzarne wali light ka 2-4% block ho jaye. High-sensitivity VESDA units 0.005% obscuration per meter pe detect kar sakte hain — point detectors ke typical thresholds (jo 2-4% ke aas paas ho sakte hain) se kaafi zyada sensitive. Exact ratio model, settings aur application pe depend karta hai. Key takeaway: VESDA bahut chhoti smoke concentration pe bhi detect kar sakta hai.
        </InsightCard>

        <p style={S.p}>Normal detector ke problems:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Passive detection:</strong> Wait karta hai — probe nahi karta</li>
          <li style={S.li}><strong>Low sensitivity:</strong> Tab detect karta hai jab smoke already kaafi zyada ho</li>
          <li style={S.li}><strong>Point detection:</strong> Sirf ek jagah se detect karta hai — baaki jagah ka kya?</li>
          <li style={S.li}><strong>Single alarm:</strong> Sirf ek level — fire. Koi warning nahi.</li>
          <li style={S.li}><strong>Air flow problem:</strong> Data Center mein HVAC air circulation itna strong hota hai ki smoke detector tak pahunchne se pehle diluted ho jaata hai</li>
        </ul>

        <p style={S.p}><strong>In sab problems ka solution = VESDA.</strong></p>

        <hr style={S.divider} />

        {/* ── Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>VESDA ka kaam samajhna bahut aasaan hai.</p>

        <p style={S.p}>Think of it as a very sensitive nose — jo puri building ki air constantly sungti rehti hai.</p>

        <FlowDiagram
          caption="VESDA aspirating cycle — air sampling se alarm tak"
          steps={[
            { icon: "🌬️", label: "Air Sample", sublabel: "Pipe holes se" },
            { icon: "🔧", label: "Aspirator", sublabel: "Vacuum pump" },
            { icon: "🧹", label: "Filter", sublabel: "Dust hata do" },
            { icon: "🔴", label: "Laser Chamber", sublabel: "Smoke detect" },
            { icon: "🚨", label: "Alarm", sublabel: "4 levels" },
          ]}
        />

        <h3 style={S.h3}>Step 1 — Air Sampling</h3>
        <p style={S.p}>Ceiling pe plastic pipes lagayi hoti hain. Har pipe mein chhote-chhote holes hote hain — sampling points.</p>

        <p style={S.p}>Ye holes carefully calculate ki gayi jagahon pe hote hain taaki poore room ki air evenly sampled ho.</p>

        <h3 style={S.h3}>Step 2 — Vacuum Pump (Aspirator)</h3>
        <p style={S.p}>VESDA unit ke andar ek aspirator (vacuum pump) hota hai.</p>

        <p style={S.p}>Ye pump continuously air kheenchta rehta hai — har sampling hole se thodi-thodi air.</p>

        <p style={S.p}>Ye air pipe network ke through VESDA unit tak aati hai.</p>

        <h3 style={S.h3}>Step 3 — Filtration</h3>
        <p style={S.p}>Air pehle filter se guzarti hai.</p>

        <p style={S.p}>Normal dust, insects, ya other particles yahan rok liye jaate hain.</p>

        <p style={S.p}>Sirf pure air (with any smoke particles) aage jaati hai.</p>

        <h3 style={S.h3}>Step 4 — Laser Detection Chamber</h3>
        <p style={S.p}>Yahan actual magic hoti hai.</p>

        <p style={S.p}>Air ek high-sensitivity laser chamber mein se guzarti hai.</p>

        <p style={S.p}>Laser beam continuously fire hoti rehti hai.</p>

        <p style={S.p}>Agar air mein koi smoke particle hai — even ek chhota sa — to laser ka scatter pattern change ho jaata hai.</p>

        <p style={S.p}>Detector ye change pakad leta hai aur calculate karta hai obscuration level.</p>

        <h3 style={S.h3}>Step 5 — Alarm Classification</h3>
        <p style={S.p}>Obscuration level pre-set thresholds se compare hota hai.</p>

        <p style={S.p}>Depending on level — Alert, Action, Fire 1, ya Fire 2 alarm trigger hota hai.</p>

        <EngineerTip>
          Laser chamber ko clean rakhna bahut important hai. Agar chamber ke andar dust accumulate ho jaye, to false alarms aa sakte hain ya system ki sensitivity drop ho sakti hai. Quarterly ya semi-annually laser chamber cleaning VESDA maintenance ka critical part hai.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Main Components ── */}
        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Detector Unit (Main Unit)</h3>
        <p style={S.p}>VESDA ka brain. Isme laser chamber, aspirator pump, filter, aur electronics sab hote hain.</p>

        <p style={S.p}>Wall pe ya rack pe mount hoti hai — typically dedicated fire detection room mein ya server hall ke bahar.</p>

        <h3 style={S.h3}>2. Sampling Pipe Network</h3>
        <p style={S.p}>Red colored plastic pipes — CPVC ya ABS material.</p>

        <p style={S.p}>Ceiling pe ya raised floor ke neeche grid pattern mein lagayi jaati hain.</p>

        <p style={S.p}>Har pipe mein sampling holes hote hain — typically 3mm diameter.</p>

        <h3 style={S.h3}>3. Sampling Points / Capillaries</h3>
        <p style={S.p}>Pipe ke holes hi sampling points hain.</p>

        <p style={S.p}>Coverage area ke hisaab se hole size aur spacing calculate ki jaati hai.</p>

        <p style={S.p}>Holes blocked nahi hone chahiye — cobwebs, dust, ya paint se.</p>

        <h3 style={S.h3}>4. Air Filter (Particulate Filter)</h3>
        <p style={S.p}>Main unit ke andar hota hai.</p>

        <p style={S.p}>Non-smoke particles filter karta hai — false alarms reduce karta hai.</p>

        <p style={S.p}>Regular replacement zaroori hai — typically 6-12 months pe.</p>

        <h3 style={S.h3}>5. Display Unit / Remote Display</h3>
        <p style={S.p}>VESDA system ka status show karta hai — current alarm level, zone status, fault alerts.</p>

        <p style={S.p}>Security desk pe ya NOC (Network Operations Center) mein lagta hai.</p>

        <h3 style={S.h3}>6. Fire Alarm Panel Interface</h3>
        <p style={S.p}>VESDA directly fire alarm panel se connect hota hai.</p>

        <p style={S.p}>Fire 1 ya Fire 2 pe — automatic suppression system trigger ho sakta hai.</p>

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
            VESDA red pipe network — server hall ki ceiling pe. Grid pattern mein pipes, har pipe pe regular intervals pe sampling holes.
          </figcaption>
        </figure>

        <p style={S.p}>Data Center mein VESDA multiple zones mein lagaya jaata hai:</p>

        <h3 style={S.h3}>Zone 1 — Server Hall (Ceiling Level)</h3>
        <p style={S.p}>Pipe network puri ceiling cover karta hai.</p>

        <p style={S.p}>Sampling points typically har 6-9 square meters pe ek hota hai.</p>

        <p style={S.p}>Strong HVAC airflow consider karke calculate kiya jaata hai.</p>

        <h3 style={S.h3}>Zone 2 — Raised Floor Plenum</h3>
        <p style={S.p}>Raised floor ke neeche bhi pipes hoti hain.</p>

        <p style={S.p}>Cables, PDUs, aur floor-mounted equipment yahan hoti hai — fire risk area.</p>

        <p style={S.p}>Neeche smoke detect karna bahut important hai — normal detector yahan nahi pahunch sakta.</p>

        <h3 style={S.h3}>Zone 3 — UPS Room</h3>
        <p style={S.p}>UPS equipment mein capacitors aur batteries hote hain — major fire risk.</p>

        <p style={S.p}>Separate VESDA zone — server hall se independent.</p>

        <h3 style={S.h3}>Zone 4 — Battery Room</h3>
        <p style={S.p}>Lead-acid ya VRLA batteries hydrogen gas release kar sakti hain — explosive risk.</p>

        <p style={S.p}>VESDA yahan bhi dedicated coverage deta hai.</p>

        <InsightCard>
          HVAC ka airflow VESDA ke liye ek challenge bhi hai aur advantage bhi. Challenge: smoke dilute ho jaata hai agar airflow strong ho. Advantage: air circulation help karta hai smoke particles ko sampling pipes tak pahunchane mein. Isliye VESDA pipe network HVAC airflow pattern ke hisaab se design kiya jaata hai — wind-tunnel effect ka use karte hain.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Alarm Levels ── */}
        <h2 id="alarm-levels" style={S.h1}>Alarm Levels</h2>

        <p style={S.p}>VESDA ki sabse important feature hai — <strong>four-level alarm system.</strong></p>

        <p style={S.p}>Normal detector: Ek level — Fire. Matlab jab detect hua tab tak bahut late ho chuka.</p>

        <p style={S.p}>VESDA: Chaar levels — gradual warning jis se response time milta hai.</p>

        <AlarmLevelTable />

        <EngineerTip>
          Alert aur Action levels pe typically VESDA suppression trigger nahi karta — ye operations team ko investigate karne ka time deta hai. Higher alarm levels pe suppression release depend karta hai approved cause-and-effect logic, releasing panel design, aur detection arrangement pe. Ye site-specific design decision hai — always as-built drawings aur cause-and-effect chart dekho. Alert pe: "investigate first, suppress only when confirmed."
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── Types ── */}
        <h2 id="types" style={S.h1}>Types of VESDA Systems</h2>

        <h3 style={S.h3}>1. VESDA-E VEA (Economy Range)</h3>
        <p style={S.p}>Basic aspirating detection. Small facilities ke liye.</p>

        <p style={S.p}>Ek pipe aur limited sampling points. Cost-effective.</p>

        <h3 style={S.h3}>2. VESDA LaserPLUS / VESDA-E VLP</h3>
        <p style={S.p}>Widely used model — high sensitivity, multiple pipe support, wide area coverage.</p>

        <p style={S.p}>Note: Honeywell ke under product range evolve hoti rehti hai — current available models ke liye distributor se verify karo.</p>

        <h3 style={S.h3}>3. VESDA LaserSCANNER / Ultra-High Sensitivity Models</h3>
        <p style={S.p}>Ultra-high sensitivity applications ke liye — clean rooms, museums, critical infrastructure.</p>

        <p style={S.p}>High-criticality data center applications mein bhi use hota hai jahan maximum early warning zaroori ho.</p>

        <h3 style={S.h3}>4. Other Brands (VESDA-equivalent)</h3>
        <p style={S.p}>VESDA originally Xtralis ka product hai ab Honeywell ke under hai.</p>

        <p style={S.p}>Other brands: Siemens ASD, Fike FAAST, Kidde Argus, Hochiki ASD.</p>

        <p style={S.p}>Same principle — aspirating smoke detection. VESDA sirf brand name hai.</p>

        <hr style={S.divider} />

        {/* ── Installation ── */}
        <h2 id="installation" style={S.h1}>Installation</h2>

        <p style={S.p}>VESDA installation ek specialized job hai.</p>

        <p style={S.p}>Random jagah pipes lagaane se kaam nahi chalta — proper design zaroori hai.</p>

        <h3 style={S.h3}>Design Considerations</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Room dimensions:</strong> Length, width, height — sab matter karta hai pipe layout ke liye</li>
          <li style={S.li}><strong>HVAC airflow:</strong> Air supply aur return points — smoke kahan drift karega</li>
          <li style={S.li}><strong>Hot/cold aisles:</strong> Cold aisle mein smoke dilute hoga — pipe placement adjust karo</li>
          <li style={S.li}><strong>Obstruction:</strong> Cable trays, ducting — pipe routing affect hoti hai</li>
          <li style={S.li}><strong>Sampling transport time:</strong> Sampling hole se detector unit tak air ka travel time — typically 60-120 seconds range design mein target kiya jaata hai, but actual limit applicable standard aur manufacturer specification pe depend karta hai</li>
        </ul>

        <h3 style={S.h3}>Pipe Sizing Rules</h3>
        <p style={S.p}>Pipes design software se calculate hoti hain — ASPIRE ya similar tools.</p>

        <p style={S.p}>Har sampling hole ka flow balanced hona chahiye — warna kuch areas zyada sensitive aur kuch less sensitive ho jaayenge.</p>

        <p style={S.p}>Pipe mein end cap lagani zaroori hai — transport time calculate karne ke liye.</p>

        <WarningCard>
          VESDA pipes kabhi bhi field mein randomly drill mat karo. Hole size, spacing aur pipe length — sab manufacturer ke software se calculate hone chahiye. Galat design mein kuch zones ka detection fail ho sakta hai — aur aapko pata bhi nahi chalega. Installation ke baad mandatory commissioning test hota hai — tabhi ye confirm hota hai ki system properly kaam kar raha hai.
        </WarningCard>

        <hr style={S.divider} />

        {/* ── Monitoring ── */}
        <h2 id="monitoring" style={S.h1}>Monitoring</h2>

        <p style={S.p}>VESDA 24×7 monitoring demand karta hai — ye critical life-safety system hai.</p>

        <h3 style={S.h3}>BMS Integration</h3>
        <p style={S.p}>VESDA output directly BMS (Building Management System) se connect hota hai.</p>

        <p style={S.p}>Alarm levels real-time mein BMS dashboard pe show hote hain.</p>

        <p style={S.p}>On-call engineer ko SMS ya email alert jaata hai.</p>

        <h3 style={S.h3}>Fire Alarm Control Panel (FACP)</h3>
        <p style={S.p}>Fire 1 aur Fire 2 signals FACP tak jaate hain.</p>

        <p style={S.p}>FACP approved cause-and-effect logic ke through suppression release signal de sakta hai — actual triggering arrangement system design aur AHJ approval pe depend karta hai.</p>

        <p style={S.p}>FACP se building evacuation alarm bhi bajta hai.</p>

        <h3 style={S.h3}>24×7 NOC Monitoring</h3>
        <p style={S.p}>Serious data centers mein dedicated NOC hota hai.</p>

        <p style={S.p}>NOC screen pe VESDA status hamesha visible rehta hai.</p>

        <p style={S.p}>Koi bhi Alert level pe bhi NOC operator investigate karta hai — wait nahi karta.</p>

        <hr style={S.divider} />

        {/* ── Advantages ── */}
        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Very early detection:</strong> Early warning milti hai — actual lead time environment aur application pe depend karta hai</li>
          <li style={S.li}><strong>High sensitivity:</strong> Point detectors se significantly zyada sensitive — exact ratio model aur settings pe depend karta hai</li>
          <li style={S.li}><strong>Four alarm levels:</strong> Gradual warning — false suppression discharge se bachao</li>
          <li style={S.li}><strong>Large area coverage:</strong> Ek unit se pura floor cover ho sakta hai</li>
          <li style={S.li}><strong>Works in high airflow:</strong> HVAC ke strong airflow mein bhi effective</li>
          <li style={S.li}><strong>Raised floor coverage:</strong> Normal detector jo area miss karta hai, VESDA wahan bhi deta hai</li>
          <li style={S.li}><strong>Remote monitoring:</strong> BMS integration — real-time visibility</li>
          <li style={S.li}><strong>Less false alarms:</strong> Intelligent filtering from point detectors</li>
          <li style={S.li}><strong>Industry best practice:</strong> Tier III aur Tier IV level facilities mein widely used — specific requirement project, local code, AHJ aur design pe depend karta hai</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Disadvantages ── */}
        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>High cost:</strong> Normal detectors se significantly mahanga — equipment + installation + commissioning</li>
          <li style={S.li}><strong>Complex installation:</strong> Proper design zaroori — qualified installer hi kare</li>
          <li style={S.li}><strong>Pipe maintenance:</strong> Pipes clean rakhni padti hain — blockage ya leakage detection fail karta hai</li>
          <li style={S.li}><strong>Filter replacement:</strong> Regular filter change — maintenance cost ongoing hai</li>
          <li style={S.li}><strong>Power dependent:</strong> VESDA ko continuous power chahiye — battery backup required</li>
          <li style={S.li}><strong>Transport time delay:</strong> Remote sampling points se air aaने mein time lagta hai — instantaneous nahi hai</li>
          <li style={S.li}><strong>Specialized technician:</strong> Maintenance ke liye trained specialist chahiye</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>VESDA ek fire safety system hai — iska maintenance life-critical hai.</p>

        <p style={S.p}><strong>Monthly checks:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>VESDA unit ka display check karo — koi fault indicator hai?</li>
          <li style={S.li}>Aspirator fan running hai ya nahi — sound check</li>
          <li style={S.li}>Filter status indicator check karo</li>
          <li style={S.li}>BMS pe VESDA points active hain?</li>
          <li style={S.li}>Pipe sampling holes visually inspect karo — blocked toh nahi</li>
        </ul>

        <p style={S.p}><strong>Quarterly checks:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Particulate filter inspect karo — replace if needed</li>
          <li style={S.li}>Sampling pipes visual inspection — cracks, disconnections</li>
          <li style={S.li}>All alarm levels verify karo — test aerosol use karke</li>
          <li style={S.li}>BMS interface test karo — alarm received properly?</li>
          <li style={S.li}>Suppression system interface test karo (with suppression isolated)</li>
        </ul>

        <p style={S.p}><strong>Annual checks (by specialist):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Full system commissioning re-test</li>
          <li style={S.li}>Laser chamber cleaning aur calibration check</li>
          <li style={S.li}>All pipe joints check karo — air leakage test</li>
          <li style={S.li}>Transport time verification — har pipe ka</li>
          <li style={S.li}>Battery backup test</li>
          <li style={S.li}>Documentation update — maintenance log, as-built drawings</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Testing ── */}
        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>VESDA ka test karna mandatory hai — passive system nahi, active hai, toh prove karo ki kaam karta hai.</p>

        <h3 style={S.h3}>Functional Test — Aerosol Method</h3>
        <p style={S.p}>Certified smoke aerosol spray sampling pipe ke holes ke paas spray karo.</p>

        <p style={S.p}>Check karo ki VESDA unit proper alarm level trigger karta hai.</p>

        <p style={S.p}>BMS aur FACP tak signal pahuncha ya nahi — verify karo.</p>

        <h3 style={S.h3}>Transport Time Test</h3>
        <p style={S.p}>Farthest sampling point pe aerosol spray karo.</p>

        <p style={S.p}>Time measure karo — alarm trigger hone mein kitna waqt laga.</p>

        <p style={S.p}>Transport time applicable standard (e.g. AS 1851, BS EN 54-20) aur manufacturer spec ke according limit mein honi chahiye — typically 60-120 seconds range. Zyada ho to design review karo.</p>

        <h3 style={S.h3}>End-to-End Test (with Suppression Isolated)</h3>
        <p style={S.p}>Suppression system ko isolated rakh ke full test karo.</p>

        <p style={S.p}>VESDA → FACP → Suppression panel — signal flow verify karo.</p>

        <p style={S.p}>Ye test annual hona chahiye — certified fire contractor ke saath.</p>

        <WarningCard>
          VESDA test ke time FM200 ya Novec suppression system ko ISOLATE karo — ya accidentally discharge ho jaayega. Ek FM200 cylinder discharge = lakhs ka loss + downtime. Test se pehle Operations team ko inform karo. Test log mein entry karo. Test ke baad suppression system RE-ARM karo aur confirm karo.
        </WarningCard>

        <hr style={S.divider} />

        {/* ── Standards ── */}
        <h2 id="standards" style={S.h1}>Standards</h2>

        <p style={S.p}>VESDA installation aur maintenance globally accepted standards follow karta hai:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>BS EN 54-20:</strong> European standard for aspirating smoke detection systems</li>
          <li style={S.li}><strong>AS 1670.1:</strong> Australian standard — widely referenced in Asia-Pacific</li>
          <li style={S.li}><strong>NFPA 72:</strong> US standard — National Fire Alarm and Signaling Code</li>
          <li style={S.li}><strong>NBC (National Building Code) India:</strong> Fire protection requirements for commercial facilities</li>
          <li style={S.li}><strong>Uptime Institute Tier Standards:</strong> Fire alarm aur early smoke detection zaroori — specific system type project requirements aur AHJ pe depend karta hai</li>
          <li style={S.li}><strong>TIA-942:</strong> Data Center infrastructure standard — fire detection requirements</li>
        </ul>

        <InsightCard>
          India mein NBC aur local fire NOC requirements follow karna mandatory hai. Kuch states mein aspirating smoke detection explicitly required hai for data centers above a certain capacity. Always local Fire Officer se guidelines verify karo before design — requirements state-to-state vary kar sakti hain.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── Real Example ── */}
        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Facility:</strong> Tier III colocation data center, 5000 sqm, Mumbai.</p>

        <p style={S.p}><strong>VESDA design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall ceiling: 4 VESDA units, 8 pipes each — full coverage</li>
          <li style={S.li}>Raised floor plenum: 2 VESDA units — neeche ki coverage</li>
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

        <p style={S.p}><strong>Result:</strong> Is facility mein 3 saalon mein 4 early warnings aaye — teeno mein se ek bhi fire nahi bani. Engineers ne pehle hi problem fix kar li.</p>

        <hr style={S.divider} />

        {/* ── Common Mistakes ── */}
        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Pipes Not Cleaned</h3>
        <p style={S.p}>Dirty pipes → reduced airflow → missed detection.</p>

        <p style={S.p}>Schedule regular pipe flushing — at least annually.</p>

        <h3 style={S.h3}>Mistake 2 — Filter Not Changed</h3>
        <p style={S.p}>Clogged filter → airflow drop → transport time increase → detection delay.</p>

        <p style={S.p}>Filter change schedule BMS maintenance calendar mein daal do.</p>

        <h3 style={S.h3}>Mistake 3 — Sampling Holes Blocked</h3>
        <p style={S.p}>Paint, dust buildup, or physical obstruction holes band kar deta hai.</p>

        <p style={S.p}>Visual inspection quarterly — sampling holes open hain ya nahi.</p>

        <h3 style={S.h3}>Mistake 4 — Test Not Done After Changes</h3>
        <p style={S.p}>New rack add kiya, ceiling tile badla, cable tray moved — pipe disturb ho sakti hai.</p>

        <p style={S.p}>Har major change ke baad VESDA test mandatory karo.</p>

        <h3 style={S.h3}>Mistake 5 — Alarm Levels Not Set Correctly</h3>
        <p style={S.p}>Default settings har facility ke liye suitable nahi hote.</p>

        <p style={S.p}>Commissioning engineer se site-specific threshold settings verify karo.</p>

        <h3 style={S.h3}>Mistake 6 — Suppression Not Isolated During Test</h3>
        <p style={S.p}>Sabse costly mistake. Accidentally FM200 discharge → massive loss.</p>

        <p style={S.p}>Har test se pehle suppression isolation procedure strictly follow karo.</p>

        <hr style={S.divider} />

        {/* ── Interview Questions ── */}
        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: VESDA ka full form kya hai aur ye kaise kaam karta hai?</h3>
        <p style={S.p}><strong>Answer:</strong> VESDA = Very Early Smoke Detection Apparatus. Ye aspirating smoke detection system hai. Pipe network ke through air actively sample karta hai, laser chamber mein analyze karta hai, aur point detectors se kaafi pehle smoke detect karta hai. Four alarm levels deta hai — Alert, Action, Fire 1, Fire 2.</p>

        <h3 style={S.h3}>Q2: VESDA aur normal point smoke detector mein main difference kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Normal detector passive hai — wait karta hai smoke ke aane ka. VESDA active hai — khud air sample karta hai. Normal detector sirf ek point cover karta hai. VESDA pipe network se puri space cover karta hai. Sensitivity mein significant fark hota hai — exact ratio model aur application pe depend karta hai. Normal mein ek alarm level, VESDA mein four levels.</p>

        <h3 style={S.h3}>Q3: Data Center mein VESDA kaun kaun si jagah lagaya jaata hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Server hall ceiling, raised floor plenum, UPS room, battery room, MDB room, cable vault — basically har jagah jahan fire risk hai aur normal detector effective nahi hoga.</p>

        <h3 style={S.h3}>Q4: VESDA Alert alarm pe kya action lena chahiye?</h3>
        <p style={S.p}><strong>Answer:</strong> Alert level pe suppression activate nahi karte. Immediately investigate karo — affected zone mein jaake physical check karo. HVAC band karo zone-wise. If nothing found, monitor karte raho. Agar level badh ke Action tak jaaye to fire brigade alert karo.</p>

        <h3 style={S.h3}>Q5: VESDA test kaise karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Pehle FM200 / Novec suppression isolate karo. Certified smoke aerosol spray use karo sampling holes ke paas. Verify karo ki alarm properly trigger hua — VESDA unit, BMS, aur FACP pe. Transport time check karo. Test ke baad suppression system re-arm karo. Sab kuch log mein document karo.</p>

        <hr style={S.divider} />

        {/* ── Comparison ── */}
        <h2 id="comparison" style={S.h1}>VESDA vs Normal Smoke Detector</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        {/* ── Best Practices ── */}
        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Zone-wise design karo:</strong> Ek bada zone mat banao — server hall, UPS, battery alag-alag zones mein hone chahiye</li>
          <li style={S.li}><strong>BMS integration mandatory:</strong> VESDA sirf standalone nahi chalana chahiye — BMS pe real-time visibility zaroori hai</li>
          <li style={S.li}><strong>Alert level pe investigate karo:</strong> Alert ko ignore mat karo — ye fire ka pehla signal hai</li>
          <li style={S.li}><strong>Maintenance log maintain karo:</strong> Har test, filter change, cleaning — sab document karo</li>
          <li style={S.li}><strong>Annual commissioning test karo:</strong> Certified contractor se — ye mandatory hai</li>
          <li style={S.li}><strong>Pipe inspection quarterly:</strong> Blocked holes aur leaky joints detect karo</li>
          <li style={S.li}><strong>Normal detectors bhi rakho:</strong> VESDA ke saath point detectors bhi — backup protection</li>
          <li style={S.li}><strong>Alarm thresholds site-specific set karo:</strong> Default settings accept mat karo — commissioning engineer se verify karo</li>
        </ul>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "VESDA = Very Early Smoke Detection Apparatus — pipe network se air sample karke laser chamber mein analyze karta hai.",
          "Point detectors se significantly zyada sensitive — bahut chhoti smoke concentration pe detect kar sakta hai. Lead time application aur environment pe depend karta hai.",
          "Chaar alarm levels: Alert → Action → Fire 1 → Fire 2. Gradual warning operations team ko response time deti hai.",
          "Data Center mein multiple zones: server hall ceiling, raised floor, UPS room, battery room — har jagah coverage.",
          "Maintenance critical hai — pipes, filter, laser chamber sab clean rehne chahiye warna detection fail ho sakti hai.",
          "Test se pehle suppression isolate karo — ye rule kabhi break mat karo.",
          "VESDA detect karta hai, FM200 ya Novec bujhaata hai — dono milkar complete fire protection system banate hain.",
        ]} />

        <hr style={S.divider} />

        {/* ── FAQ ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        {/* ── Related Topics ── */}
        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>VESDA ne smoke detect kar liya. Ab aage jaante hain kaise fire bujhaaya jaata hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — VESDA ke baad trigger hone wala suppression system. Data Centers mein sabse common clean agent.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — FM200 ka environmental-friendly alternative. Next-gen suppression.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — Water-based fire suppression — Data Center mein kaise use hota hai special design se.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — Building-level fire fighting system — external fire brigade ke liye.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
