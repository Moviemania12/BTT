import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Sprinkler System in Data Centers — Pre-Action Design | Behind The Tech",
  description:
    "Data Center mein sprinkler system kaise kaam karta hai — pre-action, double interlock, dry pipe, deluge. Why wet pipe never in server halls. Maintenance aur testing guide. Simple Hinglish mein.",
  keywords: ["sprinkler data center", "pre-action sprinkler", "double interlock sprinkler", "fire sprinkler data center", "dry pipe sprinkler"],
  openGraph: {
    title: "Sprinkler System in Data Centers — Pre-Action Design",
    description: "Data Center mein wet pipe sprinkler kabhi nahi — pre-action system kyun zaroori hai aur kaise kaam karta hai.",
    url: "https://behindthetech.in/learn/non-it/fire/sprinkler",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinkler System Explained — Behind The Tech",
    description: "Pre-action sprinkler system — Data Center fire protection ka water-based layer, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/sprinkler" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-sprinkler",    text: "What Is a Sprinkler System?",            level: 2 },
  { id: "why-needed",           text: "Why Is Sprinkler Needed in a DC?",       level: 2 },
  { id: "wet-pipe-never",       text: "Why Wet Pipe Never in Server Halls",     level: 2 },
  { id: "pre-action",           text: "Pre-Action System — The DC Standard",    level: 2 },
  { id: "double-interlock",     text: "Double Interlock Pre-Action",            level: 2 },
  { id: "working-principle",    text: "Working Principle",                       level: 2 },
  { id: "main-components",      text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",   text: "How Sprinkler Works in a Data Center",   level: 2 },
  { id: "types",                text: "Types of Sprinkler Systems",              level: 2 },
  { id: "sprinkler-heads",      text: "Sprinkler Heads",                        level: 2 },
  { id: "advantages",           text: "Advantages",                              level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "testing",              text: "Testing",                                 level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",      text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "Sprinkler Types Comparison",              level: 2 },
  { id: "best-practices",       text: "Best Practices",                          level: 2 },
  { id: "key-takeaways",        text: "Key Takeaways",                           level: 2 },
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

function QuickSummary() {
  const pts = [
    { label: "Ek line mein", text: "Data Center mein sprinkler system pre-action type ka hota hai — paani tabhi release hota hai jab smoke detection AND heat detection dono simultaneously trigger hon. Ek bhi condition se paani nahi aata." },
    { label: "Wet pipe kyun nahi", text: "Normal wet pipe sprinkler mein pipes hamesha paani se bhari hoti hain. Ek head fuse hone pe immediately paani nikalta hai — server room mein catastrophic water damage. Data Center mein wet pipe absolutely not acceptable hai." },
    { label: "Pre-action ka logic", text: "Pre-action = do conditions simultaneously. VESDA smoke detect kare AND heat sensor trigger ho — tabhi pre-action valve khulta hai. Ek bhi condition akele se paani nahi aata. Double safety." },
    { label: "Double interlock", text: "Double interlock pre-action = most secure. Pipes dry rehti hain. Sirf dono conditions pe paani pipes mein aata hai. Phir sprinkler head fuse hone pe actually nikalta hai. Teen stages ki safety." },
    { label: "Last resort in DC", text: "Sprinkler system FM200 ke baad last resort hai. FM200 fire bujhata hai — sprinkler ko kaam hi nahi karna chahiye. Agar FM200 fail hua aur fire badhi to sprinkler backup hai." },
    { label: "Coordination", text: "FM200 discharge aur sprinkler system ka coordination zaroori hai. FM200 active ho to sprinkler suppress rehna chahiye. Dono simultaneously discharge hua to FM200 dilute ho jaata hai — concentration low ho jaati hai." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#0369a1,#0369a1)" }} />
      <div style={{ background: "rgba(3,105,161,0.03)", border: "1px solid rgba(3,105,161,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#0369a1", fontWeight: 600, marginBottom: 16 }}>💦 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#0369a1", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(3,105,161,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Pre-action = double safety. Galti se paani aana almost impossible hai. Aage poora article mein har system type clear ho jaayega.
        </div>
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

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#1f2937", marginBottom: 8 }}>On The Data Center Map</span>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
        {components.map((c) => (
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(3,105,161,0.05)", border: "1px solid rgba(3,105,161,0.18)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(3,105,161,0.05),rgba(37,99,235,0.03))", border: "1px solid rgba(3,105,161,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#0369a1,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#0369a1", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(3,105,161,0.12)", border: "1px solid rgba(3,105,161,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "#1f2937" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FlowDiagram({ caption, steps }: { caption: string; steps: { icon: string; label: string; sublabel?: string }[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div style={{ borderRadius: 10, background: "rgba(3,105,161,0.02)", border: "1px solid rgba(3,105,161,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(3,105,161,0.08)", border: "1px solid rgba(3,105,161,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#0369a1", margin: "0 4px", opacity: 0.7 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Pipes filled with",    wet: "Water (always)",       dry: "Air/Nitrogen",           preaction: "Air (until activated)",  deluge: "Empty (open heads)" },
    { feature: "Activation",           wet: "Head fuse only",       dry: "Head fuse + air release",preaction: "Detection + head fuse",   deluge: "Detection signal" },
    { feature: "Water release",        wet: "Immediate",            dry: "Delayed (30-60 sec)",    preaction: "Two-stage",              deluge: "All heads simultaneously" },
    { feature: "Accidental discharge", wet: "High risk",            dry: "Medium risk",            preaction: "Very low risk",          deluge: "Low (needs signal)" },
    { feature: "Used in DC server hall",wet:"NEVER",               dry: "Rarely",                 preaction: "YES — standard",         deluge: "Rarely" },
    { feature: "Water damage if fault",wet: "Certain",              dry: "Possible",               preaction: "Very unlikely",          deluge: "Possible" },
    { feature: "Cost",                 wet: "Lowest",               dry: "Medium",                 preaction: "High",                   deluge: "Medium" },
    { feature: "Complexity",           wet: "Simple",               dry: "Medium",                 preaction: "Complex",                deluge: "Medium" },
    { feature: "FM200 compatibility",  wet: "Conflicts",            dry: "Limited",                preaction: "Coordinated",            deluge: "Not typical" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "rgba(3,105,161,0.06)" }}>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Feature</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#dc2626", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Wet Pipe</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Dry Pipe</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#059669", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Pre-Action</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Deluge</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(3,105,161,0.02)" }}>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "8px 12px", color: "#dc2626", border: "1px solid rgba(3,105,161,0.08)", fontWeight: row.wet === "NEVER" ? 700 : 400 }}>{row.wet}</td>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)" }}>{row.dry}</td>
              <td style={{ padding: "8px 12px", color: "#059669", border: "1px solid rgba(3,105,161,0.08)", fontWeight: row.preaction === "YES — standard" ? 700 : 400 }}>{row.preaction}</td>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)" }}>{row.deluge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "Data Center mein wet pipe sprinkler kyun nahi use karte?", a: "Wet pipe mein pipes hamesha paani se bhari hoti hain. Agar koi bhi sprinkler head accidentally fuse ho jaye — mechanical damage, corrosion, someone knocking it — immediately paani release hoga. Server room mein paani aana = servers destroy = data loss. Accidental discharge risk itna high hai ki wet pipe unacceptable hai. Pre-action mein double confirmation chahiye — bahut safer hai." },
  { q: "Double interlock pre-action mein 'double' ka matlab kya hai?", a: "Double interlock = do independent conditions simultaneously zaroori hain pre-action valve khulne ke liye. Condition 1: smoke/fire detection system trigger ho (VESDA ya smoke detector). Condition 2: sprinkler head ka heat fusible element fuse ho. Sirf ek condition se paani nahi aata. Dono simultaneously hone chahiye. Ye dono independent failures ko prevent karta hai." },
  { q: "Kya FM200 discharge aur sprinkler simultaneously activate ho sakte hain?", a: "Design mein ye avoid kiya jaata hai. FM200 activate hone pe sprinkler system suppress rakha jaata hai — ya timing delay hota hai. Simultaneous activation problematic hai: FM200 gas dilute ho jaata hai paani se, aur concentration achieve nahi hoti. Typically — FM200 pehle activate hota hai. Agar FM200 fail hua aur fire badhti rahi, tabhi sprinkler activate hota hai. Ye sequencing design phase mein carefully plan kiya jaata hai." },
  { q: "Sprinkler head kaunse temperature pe fuse hota hai?", a: "Different colored fusible elements different temperatures pe operate karte hain. Orange: 57°C, Red: 68°C, Yellow: 79°C, Green: 93°C, Blue: 141°C. Data Center mein typically red (68°C) ya orange (57°C) heads use hote hain. Server room ASHRAE temperature 18-27°C maintain karta hai — accidental fusing extremely unlikely hai. Par leakage ya corrosion se bhi head fail ho sakta hai — isliye regular inspection zaroori hai." },
  { q: "Sprinkler system ko annually test kaise karte hain?", a: "Full flow test: inspector test valve se paani nikalo, flow aur pressure verify karo. Sprinkler head inspection: corrosion, paint coating (never paint sprinkler heads!), damage check. Pre-action valve functional test: detection system trigger karo, verify karo ki valve correctly opens/closes. Pressure gauge accuracy check. All isolation valves operate karo. Report generate karo aur fire NOC renewal ke liye submit karo." },
  { q: "Server room ke raised floor ke neeche bhi sprinkler chahiye kya?", a: "Haan — many design standards aur fire consultants raised floor plenum mein bhi sprinkler heads recommend karte hain. Under-floor mein cables, PDUs, aur other equipment fire risk hain. VESDA already under-floor sampling karta hai. Sprinkler heads under-floor bhi under-floor specific temperature-rated hone chahiye. Ye additional layer of protection hai — especially Tier III aur Tier IV designs mein." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(3,105,161,0.08)" }}>
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

export default function SprinklerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="sprinkler" headings={HEADINGS} readingTimeMinutes={19}>

        <p style={S.p}>1996 mein Dhiraj Trading Company ka warehouse sprinkler system ne bachaya.</p>

        <p style={S.p}>Ek head fuse hua, paani nikla, fire control mein aayi.</p>

        <p style={S.p}>Lekin 2019 mein ek Mumbai bank ke server room mein wahi system devastating tha.</p>

        <p style={S.p}>Maintenance engineer ne accidentally sprinkler head se tool touch kiya.</p>

        <p style={S.p}>Pipe mein paani tha — wet pipe system. Immediately 50 servers pe paani gira.</p>

        <p style={S.p}><strong>₹8 crore ka nuksaan. Koi fire nahi thi.</strong></p>

        <p style={S.p}>Yahi reason hai ki Data Center mein sprinkler system differently design kiya jaata hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/sprinkler/sprinkler-preaction-system.png"
              alt="Pre-action sprinkler system control valve and detection panel in a data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Pre-action sprinkler system — control valve assembly aur detection panel. Dry pipes hain — paani tabhi aata hai jab dono conditions simultaneously trigger hon.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-sprinkler" style={S.h1}>What Is a Sprinkler System?</h2>

        <p style={S.p}><strong>Sprinkler system ek automatic water-based fire suppression system hai.</strong></p>

        <p style={S.p}>Ceiling pe pipes lagti hain. Pipes mein sprinkler heads hote hain.</p>

        <p style={S.p}>Sprinkler head mein ek fusible element hota hai — ek specific temperature pe melt ho jaata hai.</p>

        <p style={S.p}>Jab head fuse hota hai — water releases ho jaati hai usi head se.</p>

        <p style={S.p}><strong>Important: sirf wahi heads activate hote hain jahan fire hai — sab nahi.</strong></p>

        <p style={S.p}>Ye ek common myth hai ki sab heads ek saath activate hote hain. Nahi hota.</p>

        <DCMapNote components={["Pre-Action Valve", "Dry Pipe Network", "Sprinkler Heads", "Detection System", "Air Compressor", "Control Panel"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Sprinkler Needed in a DC?</h2>

        <p style={S.p}>FM200 excellent hai — lekin sirf designated enclosed areas mein kaam karta hai.</p>

        <p style={S.p}>Agar FM200 fail ho jaaye ya fire protected zone se bahar spread ho?</p>

        <p style={S.p}>Building codes aur fire standards mandate karte hain ki backup water-based system hona chahiye.</p>

        <p style={S.p}><strong>Sprinkler = safety net. FM200 primary, sprinkler backup.</strong></p>

        <WhyThisMatters>
          NBC India aur local fire authority requirements applicable buildings mein sprinkler system require karte hain. Clean agent system (FM200/Novec) hona does not automatically eliminate sprinkler requirement — specific exemptions project-by-project AHJ se confirm karni padti hain. Dono systems properly coordinate karo — applicable code aur AHJ guidance follow karo.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="wet-pipe-never" style={S.h1}>Why Wet Pipe Never in Server Halls</h2>

        <p style={S.p}>Wet pipe system — pipes hamesha paani se bhari hain.</p>

        <p style={S.p}>Single head fuse hone pe — immediate water release.</p>

        <p style={S.p}><strong>Server room mein ye acceptable nahi hai kyunki:</strong></p>

        <ul style={S.ul}>
          <li style={S.li}>Mechanical damage se head accidentally fuse ho sakta hai</li>
          <li style={S.li}>Corrosion se head prematurely fail ho sakta hai</li>
          <li style={S.li}>Someone adjusting equipment accidentally head touch kare</li>
          <li style={S.li}>Temperature sensor malfunction se false activation</li>
        </ul>

        <p style={S.p}>In mein se koi bhi situation — paani directly servers pe aata hai.</p>

        <p style={S.p}><strong>Result: millions of rupees ka nuksaan — fire se bhi zyada.</strong></p>

        <InsightCard>
          Data center mein worst case scenario often fire nahi hoti — accidental water release hoti hai. FM200 false discharge costly hai (₹10-20 lakh refill). Lekin wet pipe sprinkler accidental discharge = servers + storage + network equipment destroy — ₹crores ka loss. Isliye sprinkler design mein sabse pehla rule hai: "server hall mein wet pipe absolutely not."
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="pre-action" style={S.h1}>Pre-Action System — The DC Standard</h2>

        <p style={S.p}><strong>Data Center mein pre-action system commonly used aur widely recommended approach hai.</strong></p>

        <p style={S.p}>Pre-action ka concept simple hai:</p>

        <p style={S.p}>Paani release hone se pehle — ek extra "pre-action" condition confirm honi chahiye.</p>

        <p style={S.p}>Sirf sprinkler head fuse hone se paani nahi aata.</p>

        <p style={S.p}><strong>Detection system bhi trigger hona chahiye — simultaneously.</strong></p>

        <p style={S.p}>Is dual-requirement ki wajah se accidental water release practically impossible ho jaata hai.</p>

        <FlowDiagram
          caption="Pre-action system activation sequence"
          steps={[
            { icon: "🔍", label: "VESDA Alert", sublabel: "Smoke detected" },
            { icon: "🌡️", label: "Heat Sensor", sublabel: "High temp detected" },
            { icon: "🔓", label: "Pre-Action Valve", sublabel: "Opens (water enters)" },
            { icon: "💧", label: "Head Fuses", sublabel: "At fire location" },
            { icon: "🚿", label: "Water Discharges", sublabel: "Targeted release" },
          ]}
        />

        <hr style={S.divider} />

        <h2 id="double-interlock" style={S.h1}>Double Interlock Pre-Action</h2>

        <p style={S.p}>Single interlock: detection OR head fuse — ek bhi condition pe valve open.</p>

        <p style={S.p}><strong>Double interlock: detection AND head fuse — dono simultaneously zaroori.</strong></p>

        <p style={S.p}>Data Centers mein double interlock preferred aur often required hota hai.</p>

        <h3 style={S.h3}>How Double Interlock Works</h3>

        <p style={S.p}><strong>Normal condition:</strong> Pipes mein air pressure hoti hai — paani nahi. Valve closed.</p>

        <p style={S.p}><strong>Step 1 — Detection triggers:</strong> VESDA ya smoke detector fire signal deta hai.</p>

        <p style={S.p}>Pre-action panel alert hota hai. Alarm bajta hai. Lekin abhi paani nahi aaya.</p>

        <p style={S.p}><strong>Step 2 — Head fuses:</strong> Fire ki heat se sprinkler head ka fusible element melt hota hai.</p>

        <p style={S.p}>Pipe mein air pressure release hoti hai head se.</p>

        <p style={S.p}><strong>Step 3 — Both conditions met:</strong> Panel detection AND air pressure drop dono detect karta hai.</p>

        <p style={S.p}>Pre-action valve automatically opens — paani pipes mein enter karta hai.</p>

        <p style={S.p}><strong>Step 4 — Water discharges:</strong> Paani sirf fused head se nikalta hai — targeted release.</p>

        <EngineerTip>
          Double interlock mein pipe air pressure maintain karna important hai. Air compressor lagata hai pipes mein pressure. Agar air leak hogi to false signal milega ki head fuse hua hai — system partially activate ho sakta hai. Monthly air pressure check karo. Leaks identify karo aur fix karo. Air compressor ka running status BMS pe monitor karo.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Sprinkler head mein ek glass bulb ya metal fusible link hoti hai.</p>

        <p style={S.p}>Is bulb/link ke andar liquid hoti hai — specific temperature pe expand aur break hoti hai.</p>

        <p style={S.p}>Jab head area mein temperature threshold cross hoti hai — bulb breaks.</p>

        <p style={S.p}>Deflector plate expose hoti hai — water spray pattern banana shuru karta hai.</p>

        <p style={S.p}><strong>Water ka spray pattern puri fire area ko cover karta hai — targeted suppression.</strong></p>

        <WarningCard>
          Sprinkler head ko kabhi bhi paint mat karo — ye ek critical safety violation hai. Paint film fusible element ko coat kar deta hai — temperature response slow ho jaati hai ya kaam hi band ho jaata hai. Site pe painting ka kaam ho raha ho to sprinkler heads ko cover karo aur painting complete hone ke baad cover remove karo. Paint kiya hua head — immediately replace karo.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Pre-Action Valve (Deluge Valve)</h3>
        <p style={S.p}>System ka main control point.</p>

        <p style={S.p}>Normally closed — paani ko pipe network mein enter nahi karne deta.</p>

        <p style={S.p}>Detection + air pressure drop — dono pe electrically operate karke opens.</p>

        <h3 style={S.h3}>2. Air Supply System</h3>
        <p style={S.p}>Compressed air ya nitrogen — pipe network mein maintained rehti hai.</p>

        <p style={S.p}>Typically 10-20 PSI pressure — head fuse hone pe pressure drop detect hoti hai.</p>

        <p style={S.p}>Air compressor dedicated hota hai — with automatic restart.</p>

        <h3 style={S.h3}>3. Detection System Interface</h3>
        <p style={S.p}>VESDA ya smoke detector se signal receive karta hai.</p>

        <p style={S.p}>Pre-action panel mein integrate hota hai — dual-input logic.</p>

        <p style={S.p}>Both signals simultaneously arrive karne pe — valve release command.</p>

        <h3 style={S.h3}>4. Sprinkler Heads</h3>
        <p style={S.p}>Pendant type (downward facing) — most common in server halls.</p>

        <p style={S.p}>Upright type — raised floor pe ya unusual orientations ke liye.</p>

        <p style={S.p}>Concealed type — aesthetic ceiling ke liye — cover plate se protected.</p>

        <h3 style={S.h3}>5. Pipe Network</h3>
        <p style={S.p}>Schedule 40 black steel pipes typically — galvanized bhi possible.</p>

        <p style={S.p}>Ceiling pe grid pattern — coverage ensure karne ke liye.</p>

        <p style={S.p}>Drain points — system reset aur maintenance ke liye.</p>

        <h3 style={S.h3}>6. Control Panel</h3>
        <p style={S.p}>Pre-action system ka brain.</p>

        <p style={S.p}>Detection signals, air pressure, valve status — sab monitor karta hai.</p>

        <p style={S.p}>BMS aur FACP se integrate hota hai.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Sprinkler Works in a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/sprinkler/sprinkler-head-closeup.png"
              alt="Close-up of a sprinkler head installed in a data center ceiling above server racks"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Data Center ceiling pe sprinkler head — glass bulb visible hai. Pre-action system mein ye dry pipe se connected hai — pipes mein abhi paani nahi hai.
          </figcaption>
        </figure>

        <p style={S.p}>Data Center mein sprinkler zones carefully defined hote hain:</p>

        <h3 style={S.h3}>Server Hall</h3>
        <p style={S.p}>Double interlock pre-action — stringent option. Selection depends on applicable code (NFPA 13, NBC), AHJ requirements aur insurer/risk consultant.</p>

        <p style={S.p}>Typically early detection system ke saath coordinated — exact integration project-specific design aur cause-and-effect logic pe depend karta hai.</p>

        <p style={S.p}>Ceiling pe aur under-floor plenum mein — dono areas covered.</p>

        <h3 style={S.h3}>UPS Room / Battery Room</h3>
        <p style={S.p}>Single interlock pre-action — ya dry pipe system.</p>

        <p style={S.p}>Clean agent aur sprinkler ka role project design aur applicable code pe depend karta hai — typically clean agent pehle activate hota hai.</p>

        <h3 style={S.h3}>Common Areas (Lobby, Corridors)</h3>
        <p style={S.p}>Wet pipe — acceptable here. Servers nahi hain yahan.</p>

        <p style={S.p}>Standard commercial wet pipe system.</p>

        <h3 style={S.h3}>Generator Area</h3>
        <p style={S.p}>Deluge system sometimes — diesel fire risk ke liye.</p>

        <InsightCard>
          FM200 aur sprinkler ka coordination ek design challenge hai. FM200 discharge pe — HVAC band hota hai, doors close hote hain. Sprinkler system suppressed rehna chahiye is time. Agar sprinkler bhi activate ho to — FM200 gas dilute ho jaati hai, concentration achieve nahi hoti. Ye "cross-system interlock" carefully engineer karna padta hai. Typically — FM200 pehle. Agar FM200 fail aur temperature badhta rahe — phir sprinkler activate hota hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Sprinkler Systems</h2>

        <h3 style={S.h3}>1. Wet Pipe</h3>
        <p style={S.p}>Pipes hamesha water se filled. Head fuse pe immediate water. Simplest aur cheapest.</p>

        <p style={S.p}><strong>Data center IT spaces mein wet pipe strongly not recommended hai — accidental discharge risk unacceptable hota hai. Pre-action preferred hai.</strong></p>

        <h3 style={S.h3}>2. Dry Pipe</h3>
        <p style={S.p}>Pipes mein compressed air — head fuse hone pe air release, phir paani enter karta hai.</p>

        <p style={S.p}>30-60 second delay before water. Cold climate mein used (freeze protection).</p>

        <p style={S.p}>Server hall ke liye better than wet — but not ideal.</p>

        <h3 style={S.h3}>3. Single Interlock Pre-Action</h3>
        <p style={S.p}>Detection trigger karo — paani pipes mein enter karta hai. Tabhi head fuse hone pe water releases.</p>

        <p style={S.p}>One condition: detection. Dry pipes normally.</p>

        <h3 style={S.h3}>4. Double Interlock Pre-Action</h3>
        <p style={S.p}>Detection AND head fuse — dono simultaneously. Pipes dry normally.</p>

        <p style={S.p}><strong>Data center server hall standard: Double interlock pre-action.</strong></p>

        <h3 style={S.h3}>5. Deluge System</h3>
        <p style={S.p}>All heads open (no fusible element). Detection signal pe sab simultaneously discharge karte hain.</p>

        <p style={S.p}>High-hazard areas jaise generator fuel storage, large transformer rooms.</p>

        <hr style={S.divider} />

        <h2 id="sprinkler-heads" style={S.h1}>Sprinkler Heads</h2>

        <h3 style={S.h3}>By Orientation</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Pendant (downward):</strong> Most common — deflector neeche, water cone pattern</li>
          <li style={S.li}><strong>Upright:</strong> Pipe se upar — used in special orientations</li>
          <li style={S.li}><strong>Sidewall:</strong> Wall-mounted — corridors ke liye</li>
          <li style={S.li}><strong>Concealed:</strong> Decorative cover plate — office areas mein aesthetic</li>
        </ul>

        <h3 style={S.h3}>By Temperature Rating (Bulb Color)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Orange bulb — 57°C:</strong> Extra sensitive — normal temperature environments</li>
          <li style={S.li}><strong>Red bulb — 68°C:</strong> Standard — Data Center server halls mein common</li>
          <li style={S.li}><strong>Yellow/Green — 79-93°C:</strong> Higher temperature environments</li>
          <li style={S.li}><strong>Blue — 141°C:</strong> Very high temperature areas</li>
        </ul>

        <p style={S.p}>Server hall mein red (68°C) common hai — ASHRAE max 27°C inlet se far enough.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Automatic backup:</strong> FM200 fail hone pe automatic backup protection</li>
          <li style={S.li}><strong>NBC compliance:</strong> Fire NOC ke liye mandatory — legal protection</li>
          <li style={S.li}><strong>Accidental discharge protection:</strong> Double interlock = very low false alarm risk</li>
          <li style={S.li}><strong>Large area coverage:</strong> Entire floor covered — FM200 se zyada coverage area</li>
          <li style={S.li}><strong>Cost effective suppression:</strong> Water cheap hai — repeat use bina refill ke</li>
          <li style={S.li}><strong>Targeted:</strong> Sirf fused heads activate hote hain — not entire zone flooding</li>
          <li style={S.li}><strong>Proven technology:</strong> 150+ years old technology — very reliable</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Water damage:</strong> Discharge hone pe equipment damage — FM200 se unlike</li>
          <li style={S.li}><strong>Complex design:</strong> Double interlock system complex hai — maintenance intensive</li>
          <li style={S.li}><strong>FM200 conflict risk:</strong> Agar coordination galat ho to dono simultaneously discharge</li>
          <li style={S.li}><strong>Air system maintenance:</strong> Compressed air system maintain karna padta hai</li>
          <li style={S.li}><strong>Head inspection:</strong> Corrosion, paint, physical damage — regular checks needed</li>
          <li style={S.li}><strong>System reset:</strong> Once activated, draining aur resetting time-consuming hai</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Air pressure check — all zones</li>
          <li style={S.li}>Control panel status — no faults</li>
          <li style={S.li}>Detection system interface — working?</li>
          <li style={S.li}>Sprinkler heads visual inspect — sample basis</li>
          <li style={S.li}>Pre-action valve — no leaks around body</li>
        </ul>

        <p style={S.p}><strong>Annual (by certified fire contractor):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>All sprinkler heads inspect — corrosion, paint, damage</li>
          <li style={S.li}>Pre-action valve functional test — without actual water release</li>
          <li style={S.li}>Inspector test valve — flow test</li>
          <li style={S.li}>Air compressor performance verify</li>
          <li style={S.li}>Detection interface test — end-to-end</li>
          <li style={S.li}>Pipe corrosion inspection — internal ya ultrasonic</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <h3 style={S.h3}>Inspector Test (Annual)</h3>
        <p style={S.p}>Inspector test valve — pipe end pe ek small valve hoti hai.</p>

        <p style={S.p}>Ye open karne pe — ek head fuse hone jaisa pressure drop simulate hota hai.</p>

        <p style={S.p}>Pre-action panel detect karta hai, alarm bajta hai — without actual discharge.</p>

        <h3 style={S.h3}>Full System Functional Test (with Water — Rare)</h3>
        <p style={S.p}>New installation commissioning pe ya major renovation ke baad.</p>

        <p style={S.p}>Detection trigger karo, verify karo ki valve opens, water enters pipes.</p>

        <p style={S.p}><strong>Server hall mein — equipment remove ya protect karo pehle.</strong></p>

        <p style={S.p}>Post-test — system fully drain karo aur air recharge karo.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 13:</strong> Standard for Installation of Sprinkler Systems — primary global reference</li>
          <li style={S.li}><strong>NBC 2016 Part 4:</strong> Fire and Life Safety — India specific requirements</li>
          <li style={S.li}><strong>IS 15105:</strong> Design and installation of fixed automatic sprinkler systems</li>
          <li style={S.li}><strong>FM Global Property Loss Prevention:</strong> Data center sprinkler design standards</li>
          <li style={S.li}><strong>Uptime Institute Tier Standards:</strong> Pre-action sprinkler for Tier III/IV</li>
          <li style={S.li}><strong>TIA-942:</strong> Data center infrastructure — fire suppression requirements</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> Ye ek illustrative example scenario hai — documented real facility ka reference nahi hai.</p>

        <p style={S.p}><strong>Scenario:</strong> Mid-size data center, server hall.</p>

        <p style={S.p}><strong>Sprinkler design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall: Double interlock pre-action — 180 sprinkler heads, ceiling aur under-floor</li>
          <li style={S.li}>UPS room: Single interlock pre-action — 24 heads</li>
          <li style={S.li}>Lobby + corridors: Wet pipe — 40 heads</li>
          <li style={S.li}>Generator yard: Deluge — 12 open heads</li>
        </ul>

        <p style={S.p}><strong>FM200-Sprinkler coordination:</strong> FM200 discharge pe 5 minute suppression delay on sprinkler — FM200 ko kaam karne ka time milta hai. Agar 5 minutes ke baad temperature still rising — sprinkler activate hoti hai.</p>

        <p style={S.p}><strong>Lesson:</strong> Proper system selection aur coordination — clean agent ke saath pre-action — IT spaces ko protect karta hai bina unnecessary water damage risk ke.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Wet Pipe in Server Room</h3>
        <p style={S.p}>Still seen in older or budget-constrained data centers.</p>

        <p style={S.p}>Non-negotiable: upgrade to pre-action immediately. Risk unacceptable hai.</p>

        <h3 style={S.h3}>Mistake 2 — Sprinkler Heads Painted</h3>
        <p style={S.p}>Painting crew ne paint kar diya — "looks better".</p>

        <p style={S.p}>Painted heads fail ho sakte hain — replace all painted heads immediately.</p>

        <h3 style={S.h3}>Mistake 3 — FM200 and Sprinkler Not Coordinated</h3>
        <p style={S.p}>Dono simultaneously discharge ho sakte hain agar interlock galat ho.</p>

        <p style={S.p}>Design review karo — proper sequencing ensure karo.</p>

        <h3 style={S.h3}>Mistake 4 — Air Pressure Not Monitored</h3>
        <p style={S.p}>Air leaks gradually pressure drop karti hain — false signal milta hai.</p>

        <p style={S.p}>Monthly air pressure log karo — drift detect karo.</p>

        <h3 style={S.h3}>Mistake 5 — Annual Test Skipped</h3>
        <p style={S.p}>Cost aur downtime risk se annually test avoid karte hain.</p>

        <p style={S.p}>NBC compliance aur Fire NOC renewal ke liye mandatory hai. Skip mat karo.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Data Center mein wet pipe sprinkler kyun nahi use karte?</h3>
        <p style={S.p}><strong>Answer:</strong> Wet pipe mein pipes hamesha paani se bhari hain — single head ka accidental fuse = immediate water on servers. Server room mein accidental water release = millions ka equipment loss. Pre-action double interlock use karte hain — dono detection AND head fuse simultaneously — accidental discharge practically impossible hai.</p>

        <h3 style={S.h3}>Q2: Double interlock pre-action system mein kya hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Pipes mein normally compressed air hoti hai. Two conditions simultaneously meet honi chahiye: 1) Smoke/fire detection system trigger ho, 2) Sprinkler head ka fusible element fuse ho. Sirf ek condition se valve nahi khulti. Dono simultaneously hone pe pre-action valve opens — paani pipes mein enter karta hai — phir fused head se release hota hai.</p>

        <h3 style={S.h3}>Q3: FM200 aur sprinkler dono simultaneously activate ho sakti hain kya?</h3>
        <p style={S.p}><strong>Answer:</strong> Design mein ye avoid kiya jaata hai kyunki FM200 dilute ho jaata hai agar paani bhi ho. Typical design: FM200 pehle activate hota hai, sprinkler suppressed rehti hai. Agar FM200 fail ho aur temperature badh rahi ho — tabhi sprinkler activate hoti hai. Ye cross-system interlock carefully engineered kiya jaata hai commissioning ke time.</p>

        <h3 style={S.h3}>Q4: Sprinkler head temperature rating kaise decide karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Normal ambient temperature se 30°C upar rating select karo typically. Server hall mein ambient 18-27°C — red bulb (68°C) appropriate hai — enough buffer above ambient, responds correctly to fire temperature. High temperature areas (near generators, boiler rooms) mein higher rated heads lagao.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Sprinkler Types Comparison</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Double interlock everywhere in server hall:</strong> No compromise on this — single interlock nahi</li>
          <li style={S.li}><strong>FM200-Sprinkler coordination:</strong> Sequencing clearly define karo — design phase mein</li>
          <li style={S.li}><strong>Never paint sprinkler heads:</strong> Training karo, signage lagao, site rules enforce karo</li>
          <li style={S.li}><strong>Under-floor coverage:</strong> Raised floor plenum mein bhi heads lagao</li>
          <li style={S.li}><strong>Monthly air pressure log:</strong> Trend track karo — slow leaks early detect ho</li>
          <li style={S.li}><strong>Annual full inspection:</strong> Every head physically inspect karo — ya quarterly sample</li>
          <li style={S.li}><strong>BMS integration:</strong> Valve status, air pressure, panel faults — centrally monitor</li>
          <li style={S.li}><strong>Post-incident reset protocol:</strong> Drain, inspect, air recharge, test — documented procedure</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Data Center IT spaces mein wet pipe strongly not recommended — accidental discharge = equipment damage. Pre-action preferred.",

          "Pre-action double interlock standard hai: Detection AND head fuse simultaneously required — tabhi water release.",
          "Pipes normally dry (compressed air) — paani sirf dono conditions simultaneously pe enter karta hai.",
          "FM200 primary, sprinkler backup. Coordination design — ek ke baad doosra, simultaneously nahi.",
          "Sprinkler heads kabhi paint mat karo — performance degrade hoti hai — replace painted heads immediately.",
          "Monthly air pressure check, annual full inspection — maintenance schedule strictly follow karo.",
          "NBC compliance aur Fire NOC ke liye sprinkler mandatory hai — design mein skip nahi kar sakte.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Fire Protection module complete hua. Poori series revisit karo:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — Fire detection ka pehla layer — sabse pehle ye jaano.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — Primary suppression — sprinkler ke aane se pehle kaam karta hai.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — FM200 ka modern alternative — better environmental profile.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — External firefighting system — building-level protection.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
