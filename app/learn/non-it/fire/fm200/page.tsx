import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "FM200 Fire Suppression in Data Centers | Behind The Tech",
  description:
    "FM200 kya hai, kaise kaam karta hai, Data Center mein kyun use hota hai — clean agent suppression, HFC-227ea, cylinder sizing, discharge aur maintenance. Simple Hinglish mein.",
  keywords: ["fm200 data center", "fm200 fire suppression", "hfc-227ea", "clean agent suppression", "fire suppression data center"],
  openGraph: {
    title: "FM200 Fire Suppression in Data Centers",
    description: "Data Center mein fire lagi — FM200 kya karta hai, kaise bujhaata hai, aur servers ko damage kyun nahi hota.",
    url: "https://behindthetech.in/learn/non-it/fire/fm200",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FM200 Explained — Behind The Tech",
    description: "FM200 clean agent fire suppression — Data Center ka guardian, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/fm200" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-fm200",       text: "What Is FM200?",                         level: 2 },
  { id: "why-needed",          text: "Why Is FM200 Needed?",                   level: 2 },
  { id: "problem-statement",   text: "Why Not Water or CO2?",                  level: 2 },
  { id: "working-principle",   text: "Working Principle",                       level: 2 },
  { id: "main-components",     text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",  text: "How FM200 Works Inside a Data Center",   level: 2 },
  { id: "discharge-sequence",  text: "Discharge Sequence",                      level: 2 },
  { id: "types",               text: "Types of FM200 Systems",                  level: 2 },
  { id: "cylinder-sizing",     text: "Cylinder Sizing",                         level: 2 },
  { id: "installation",        text: "Installation",                            level: 2 },
  { id: "advantages",          text: "Advantages",                              level: 2 },
  { id: "disadvantages",       text: "Disadvantages",                           level: 2 },
  { id: "maintenance",         text: "Maintenance",                             level: 2 },
  { id: "testing",             text: "Testing",                                 level: 2 },
  { id: "standards",           text: "Standards",                               level: 2 },
  { id: "real-example",        text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",     text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions", text: "Interview Questions",                     level: 2 },
  { id: "comparison",          text: "FM200 vs CO2 vs Sprinkler",               level: 2 },
  { id: "best-practices",      text: "Best Practices",                          level: 2 },
  { id: "key-takeaways",       text: "Key Takeaways",                           level: 2 },
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
    { label: "Ek line mein", text: "FM200 ek colorless gas hai jo fire mein discharge hoti hai aur 10 seconds ke andar room ka temperature itna kam kar deti hai ki fire bujh jaati hai — bina paani, bina residue." },
    { label: "Chemical naam", text: "FM200 ka chemical naam HFC-227ea (Heptafluoropropane) hai. Ye ek halon replacement agent hai. Atmosphere mein 31-39 days ke andar break ho jaati hai." },
    { label: "Kaise bujhati hai", text: "FM200 heat absorption se fire bujhati hai — oxygen hatane se nahi. Isliye room mein log safe rehte hain. CO2 se bilkul alag hai — CO2 oxygen hatata hai jo humans ke liye dangerous hai." },
    { label: "Data Center mein kahan", text: "Server hall, UPS room, battery room, network room — koi bhi enclosed space jahan equipment ho aur water damage nahi karna ho." },
    { label: "Discharge time", text: "Full discharge 10 seconds mein complete ho jaati hai. Design concentration typically 7-8% — itni hi gas chahiye fire bujhane ke liye." },
    { label: "VESDA se connection", text: "VESDA detect karta hai → Fire Alarm Panel → FM200 solenoid valve open → Discharge. Ye chain 30-60 second abort window ke saath come hai — false alarm pe rok sakte ho." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#dc2626,#dc2626)" }} />
      <div style={{ background: "rgba(220,38,38,0.03)", border: "1px solid rgba(220,38,38,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>🧯 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(220,38,38,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Bas itna samajh gaye to FM200 ka core concept clear hai. Aage poora article hai — working principle se cylinder sizing tak.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.16)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

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

function ComparisonTable() {
  const rows = [
    { feature: "Agent type",          fm200: "Clean gas (HFC-227ea)",       co2: "Gas (CO2)",              water: "Water mist / Sprinkler" },
    { feature: "How it works",        fm200: "Heat absorption",              co2: "Oxygen displacement",    water: "Cooling + smothering" },
    { feature: "Safe for humans",     fm200: "Yes (design conc.)",          co2: "No — deadly",            water: "Yes" },
    { feature: "Equipment damage",    fm200: "None — no residue",            co2: "None",                   water: "Significant water damage" },
    { feature: "Discharge time",      fm200: "~10 seconds",                  co2: "~10 seconds",            water: "Continuous until stopped" },
    { feature: "Re-entry after",      fm200: "Minutes (ventilate)",         co2: "Only with SCBA",         water: "After water removed" },
    { feature: "Cost per discharge",  fm200: "High (cylinder refill)",      co2: "Medium",                 water: "Low (water cheap)" },
    { feature: "Used in server halls",fm200: "Yes — standard",              co2: "No — not recommended",   water: "Pre-action only" },
    { feature: "Environmental impact",fm200: "GWP 3,220 — moderate",        co2: "GWP 1 — low",            water: "None" },
    { feature: "Alarm abort window",  fm200: "Yes — 30-60 seconds",         co2: "Yes — but dangerous",    water: "Yes" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(220,38,38,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#dc2626", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>FM200</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>CO2</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Sprinkler / Water</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(220,38,38,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.fm200}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.co2}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.water}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "FM200 discharge hone ke baad room mein kab ja sakte hain?", a: "Room ko ventilate karna padta hai pehle. FM200 itself non-toxic hai design concentration pe, lekin discharge ke baad combustion byproducts ho sakte hain jo harmful hain. Air quality test clear hone ke baad aur adequate ventilation ke baad. Specific time ventilation system, room size, aur post-discharge assessment pe depend karta hai — SCBA ke saath pehle entry recommended hai. SCBA (breathing apparatus) ke saath pehle entry karo." },
  { q: "FM200 discharge hone ke baad cylinder dobara use ho sakta hai?", a: "Nahi — cylinder refill karna padta hai. Ek full discharge ke baad cylinder khali ya near-empty ho jaata hai. Refilling certified FM200 supplier se hoti hai. Typically 2-4 weeks ka time lagta hai. Isliye spare cylinder ya bank system important hai." },
  { q: "FM200 ka GWP kya hota hai aur kyun issue hai?", a: "GWP = Global Warming Potential. FM200 ka GWP 3,220 hai — CO2 se 3,220 guna zyada harmful for climate. Isliye European countries FM200 phase-out kar rahe hain aur Novec 1250 (GWP 1) prefer karte hain. India mein abhi FM200 allowed hai lekin future mein regulations aa sakti hain." },
  { q: "FM200 agar accidental discharge ho jaye to kya karna chahiye?", a: "Room immediately evacuate karo. All doors close karo — gas ko contain rakho. Ventilation system start karo — fresh air in. Fire brigade ya gas supplier ko inform karo. Room mein tab tak mat jaao jab tak ventilated na ho. Root cause investigate karo — false discharge repeat hona nahi chahiye." },
  { q: "FM200 system kitne saal tak kaam karta hai?", a: "Physical system (cylinders, pipes, nozzles, panel) — 20-25 saal tak kaam karta hai agar proper maintenance ho. FM200 agent cylinder mein stable rehta hai — khud se degrade nahi hota. Annual inspection se verify hota hai ki cylinder mein adequate gas hai (weight check se)." },
  { q: "FM200 aur Novec 1250 mein kya choose karein?", a: "Naya installation mein Novec 1250 prefer karo — better environmental profile, lower GWP, similar performance. FM200 existing systems mein refill karo jab tak phase-out na ho. Budget constraint mein FM200 cheaper hai upfront. Long-term mein Novec 1250 better bet hai — regulatory future secure hai." },
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

export default function FM200Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="fm200" headings={HEADINGS} readingTimeMinutes={19}>

        <p style={S.p}>VESDA ne smoke detect kar liya — Fire 2 alarm aa gaya.</p>

        <p style={S.p}>Fire Alarm Panel ne solenoid valve ko signal diya.</p>

        <p style={S.p}>Ceiling mein lage nozzles se ek white gas cloud release hua.</p>

        <p style={S.p}>10 seconds. Room ka temperature drop hua. Fire bujh gayi.</p>

        <p style={S.p}>Koi paani nahi. Koi residue nahi. Servers safe hain.</p>

        <p style={S.p}><strong>Yahi hai FM200 — Data Center ka fire extinguisher.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/fm200/fm200-cylinder-bank.png"
              alt="FM200 fire suppression cylinder bank installed in a data center fire suppression room"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            FM200 cylinder bank — multiple cylinders manifolded together. Red cylinders mein pressurized HFC-227ea agent stored rehta hai.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-fm200" style={S.h1}>What Is FM200?</h2>

        <p style={S.p}><strong>FM200 ek clean agent fire suppression gas hai.</strong></p>

        <p style={S.p}>Chemical naam: <strong>HFC-227ea (Heptafluoropropane)</strong>.</p>

        <p style={S.p}>"FM200" actually Chemours company (pehle DuPont) ka brand name hai.</p>

        <p style={S.p}>Lekin industry mein FM200 ek generic term ban gaya hai — jaise Xerox photocopier ke liye.</p>

        <p style={S.p}>Clean agent" ka matlab hai — discharge ke baad koi residue nahi bchta.</p>

        <p style={S.p}>Paani, dry powder, ya foam — ye sab residue chodh jaate hain jo electronics damage karte hain.</p>

        <p style={S.p}><strong>FM200 gas hai — evaporate ho jaati hai. Equipment safe rehta hai.</strong></p>

        <DCMapNote components={["FM200 Cylinders", "Solenoid Valve", "Discharge Nozzles", "Fire Alarm Panel", "VESDA", "Abort Switch"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is FM200 Needed?</h2>

        <p style={S.p}>Socho Data Center mein fire lag gayi — kya karoge?</p>

        <p style={S.p}>Option 1: Fire extinguisher leke daudo. Lekin server room bada hai aur fire spread ho rahi hai.</p>

        <p style={S.p}>Option 2: Sprinkler system activate ho. Paani aaya — servers bhi damaage ho gaye.</p>

        <p style={S.p}>Option 3: FM200 automatically discharge hua. 10 seconds mein fire bujh gayi. Koi equipment damage nahi.</p>

        <WhyThisMatters>
          Data Center mein fire ka double risk hota hai. Pehla risk — fire itself. Doosra risk — fire bujhane ka method. Agar paani use karo to servers destroy ho jaate hain — data loss guaranteed. CO2 use karo to humans ke liye deadly hai. FM200 is dilema ka solution hai — fire bujhaata hai without hurting equipment ya humans.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="problem-statement" style={S.h1}>Why Not Water or CO2?</h2>

        <h3 style={S.h3}>Water — Kyun Nahi?</h3>
        <p style={S.p}>Paani aur electricity — kabhi nahi milne chahiye.</p>

        <p style={S.p}>Server room mein paani aayi to — short circuits, corrosion, data loss.</p>

        <p style={S.p}>Fire bujhaooge lekin data center destroy ho jaayega.</p>

        <h3 style={S.h3}>CO2 — Kyun Nahi?</h3>
        <p style={S.p}>CO2 oxygen hatake fire bujhata hai.</p>

        <p style={S.p}>Lekin wahi oxygen humans ke liye bhi zaroori hai.</p>

        <p style={S.p}>CO2 discharge hone pe room mein koi agar reh gaya to — suffocation se death possible.</p>

        <p style={S.p}><strong>FM200 heat absorption se fire bujhata hai — oxygen level maintain rehta hai.</strong></p>

        <InsightCard>
          FM200 ke design concentration pe (typically 7-8% by volume), oxygen level significantly affected nahi hota. NFPA 2001 ke under HFC-227ea ke listed concentrations pe occupant safety maintained hai — detailed limits manufacturer data aur applicable listing ke through confirm karo. CO2 systems mein oxygen displacement hota hai — room mein log rahe to serious risk hota hai. FM200 aur CO2 ka ye fundamental difference hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>FM200 fire ko kaise bujhata hai?</p>

        <p style={S.p}><strong>Heat absorption — thermal mechanism.</strong></p>

        <p style={S.p}>Fire ek chemical reaction hai — fuel + oxygen + heat = fire.</p>

        <p style={S.p}>Ye "fire triangle" hai.</p>

        <p style={S.p}>FM200 is triangle mein se <strong>heat</strong> hatata hai.</p>

        <p style={S.p}>Jab FM200 discharge hoti hai, ye gas molecules fire ki heat absorb karti hain.</p>

        <p style={S.p}>Itni heat absorb hoti hai ki chemical reaction sustain nahi ho pati — fire bujh jaati hai.</p>

        <FlowDiagram
          caption="FM200 fire suppression mechanism"
          steps={[
            { icon: "🔥", label: "Fire Starts", sublabel: "Heat + Fuel + O2" },
            { icon: "🚨", label: "VESDA Detects", sublabel: "Alarm triggered" },
            { icon: "🔓", label: "Solenoid Opens", sublabel: "Cylinder valve" },
            { icon: "💨", label: "FM200 Discharges", sublabel: "10 seconds" },
            { icon: "❄️", label: "Heat Absorbed", sublabel: "Reaction stops" },
            { icon: "✅", label: "Fire Out", sublabel: "Equipment safe" },
          ]}
        />

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. FM200 Cylinders</h3>
        <p style={S.p}>Red colored steel cylinders — isme FM200 gas liquid form mein stored rehti hai.</p>

        <p style={S.p}>Nitrogen se super-pressurized — typically 24.8 bar (360 psi) ya 42 bar (600 psi) depending on system design. Actual pressure manufacturer specification ke hisaab se vary karta hai.</p>

        <p style={S.p}>Size varies — 20 kg se 200 kg per cylinder. Multiple cylinders bank karke lagaye jaate hain.</p>

        <h3 style={S.h3}>2. Solenoid Valve (Actuator)</h3>
        <p style={S.p}>Cylinder ke upar laga electric valve.</p>

        <p style={S.p}>Fire Alarm Panel se signal aane par electric current flow karta hai — valve open ho jaata hai.</p>

        <p style={S.p}>Manual actuator bhi hota hai — emergency mein hath se bhi open kar sakte hain.</p>

        <h3 style={S.h3}>3. Manifold</h3>
        <p style={S.p}>Multiple cylinders ko ek single pipe se connect karta hai.</p>

        <p style={S.p}>Sab cylinders simultaneously discharge hote hain — ya zones ke hisaab se selective.</p>

        <h3 style={S.h3}>4. Discharge Nozzles</h3>
        <p style={S.p}>Ceiling pe lage specially designed nozzles.</p>

        <p style={S.p}>Gas ko evenly room mein distribute karte hain.</p>

        <p style={S.p}>Nozzle design aur placement — room geometry ke hisaab se calculate kiya jaata hai.</p>

        <h3 style={S.h3}>5. Fire Alarm Control Panel (FACP)</h3>
        <p style={S.p}>VESDA ya smoke detector se signal receive karta hai.</p>

        <p style={S.p}>Pre-discharge alarm bajata hai — log evacuate kar sakein.</p>

        <p style={S.p}>Abort timer count karta hai — agar false alarm ho to operator abort kar sake.</p>

        <h3 style={S.h3}>6. Abort Switch</h3>
        <p style={S.p}>Room ke bahar laga — typically exit door ke paas.</p>

        <p style={S.p}>Operator is switch ko press karke discharge rok sakta hai — 30-60 second window mein.</p>

        <p style={S.p}><strong>Ye switch kabhi permanently disable mat karo.</strong></p>

        <h3 style={S.h3}>7. Discharge Pressure Switch</h3>
        <p style={S.p}>Confirm karta hai ki discharge actually hua ya nahi.</p>

        <p style={S.p}>Signal FACP ko jaata hai — log book entry hoti hai.</p>

        <h3 style={S.h3}>8. Door Holders / Closers</h3>
        <p style={S.p}>FM200 discharge ke time room ke doors automatically band ho jaate hain.</p>

        <p style={S.p}>Gas ko room mein contain karta hai — concentration maintain hoti hai.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How FM200 Works Inside a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/fm200/fm200-nozzle-server-room.png"
              alt="FM200 discharge nozzle on data center ceiling with server racks visible below"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            FM200 discharge nozzle — server hall ki ceiling pe. Ye nozzle gas ko room mein evenly distribute karta hai.
          </figcaption>
        </figure>

        <p style={S.p}>Data Center mein FM200 typically zone-wise installed hota hai:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Server hall</strong> — ek ya multiple zones depending on size</li>
          <li style={S.li}><strong>UPS room</strong> — separate zone, dedicated cylinders</li>
          <li style={S.li}><strong>Battery room</strong> — separate zone</li>
          <li style={S.li}><strong>Network room / MDB</strong> — separate zones</li>
        </ul>

        <p style={S.p}>Har zone ka apna cylinder bank, nozzles, aur control circuit hota hai.</p>

        <p style={S.p}>Ek zone mein discharge dusre zone ko affect nahi karta.</p>

        <hr style={S.divider} />

        <h2 id="discharge-sequence" style={S.h1}>Discharge Sequence</h2>

        <p style={S.p}>Ye sequence samajhna bahut important hai — exactly kya hota hai fire pe:</p>

        <h3 style={S.h3}>T=0: Fire Detected</h3>
        <p style={S.p}>VESDA ya smoke detector Fire 1 level trigger karta hai.</p>

        <p style={S.p}>FACP signal receive karta hai.</p>

        <h3 style={S.h3}>T=+3 seconds: Pre-Alarm</h3>
        <p style={S.p}>Loud pre-discharge alarm bajta hai — "FIRE FIRE, EVACUATE IMMEDIATELY".</p>

        <p style={S.p}>Strobe lights flash karne lagte hain.</p>

        <p style={S.p}>HVAC (air conditioning) automatically shut down hoti hai — FM200 ko dilute hone se bachata hai.</p>

        <p style={S.p}>Room doors automatically close ho jaate hain.</p>

        <h3 style={S.h3}>T=+30 to 60 seconds: Abort Window</h3>
        <p style={S.p}>Operator abort switch press kar sakta hai agar ye false alarm hai.</p>

        <p style={S.p}>Ye window site pe configure hoti hai — duration AHJ requirements, approved design, aur operational needs ke hisaab se vary karta hai. 30-60 seconds common range hai lekin project-specific hai.</p>

        <h3 style={S.h3}>T=+60 seconds (approx): Discharge</h3>
        <p style={S.p}>FACP solenoid valve ko signal deta hai.</p>

        <p style={S.p}>Cylinder valve open hota hai — FM200 pipe system mein rush karta hai.</p>

        <p style={S.p}>10 seconds mein full discharge — room FM200 gas se fill ho jaata hai.</p>

        <h3 style={S.h3}>After Discharge</h3>
        <p style={S.p}>Fire bujh jaati hai.</p>

        <p style={S.p}>Room sealed rehta hai — minimum hold time applicable standard (NFPA 2001 / ISO 14520) ke hisaab se, typically 10 minutes. Actual requirement hydraulic calculations aur door fan test se verify hoti hai.</p>

        <p style={S.p}>Phir ventilation system start karo — fresh air andar, FM200 bahar.</p>

        <p style={S.p}>Air quality clear hone ke baad SCBA ke saath team enter kare — damage assessment.</p>

        <EngineerTip>
          HVAC shutdown discharge se pehle kyun? HVAC airflow FM200 concentration ko dilute kar sakta hai aur protected area se agent ko bahar le ja sakta hai. FM200 (HFC-227ea) actually heavier than air hai — low-lying areas mein concentrate hoti hai. HVAC band hona concentration maintain karne ke liye zaroori hai. Ye automatic interlock hona chahiye — commissioning ke time verify karo.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of FM200 Systems</h2>

        <h3 style={S.h3}>1. Total Flooding System</h3>
        <p style={S.p}>Sabse common — poora enclosed room FM200 se fill ho jaata hai.</p>

        <p style={S.p}>Room sealed hona chahiye — doors, dampers sab closed.</p>

        <p style={S.p}>Design concentration achieve honi chahiye — 7-8% by volume.</p>

        <h3 style={S.h3}>2. Local Application</h3>
        <p style={S.p}>Specific equipment ya cabinet pe direct discharge.</p>

        <p style={S.p}>Rare in data centers — usually enclosed rooms prefer karte hain.</p>

        <h3 style={S.h3}>3. Modular System</h3>
        <p style={S.p}>Small self-contained units — each protects a specific cabinet ya small room.</p>

        <p style={S.p}>Easy to install, relocate. Chhote server rooms ke liye suitable.</p>

        <hr style={S.divider} />

        <h2 id="cylinder-sizing" style={S.h1}>Cylinder Sizing</h2>

        <p style={S.p}>FM200 quantity calculate karna ek engineering exercise hai.</p>

        <p style={S.p}><strong>Basic formula:</strong></p>

        <p style={S.p}>Agent required = Room volume × Design concentration factor × Safety factor</p>

        <p style={S.p}>Design concentration Class A fires ke liye typically <strong>7.0% to 8.0%</strong> hoti hai (NFPA 2001 listed value). Actual agent quantity hydraulic calculations, room volume, temperature, aur applicable standard ke hisaab se certified engineer determine karta hai.</p>

        <p style={S.p}><strong>Example calculation:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Room: 10m × 8m × 3m = 240 cubic meters</li>
          <li style={S.li}>Temperature: 20°C</li>
          <li style={S.li}>Design concentration: 7%</li>
          <li style={S.li}>FM200 required: approximately 240 × 0.52 kg/m³ = ~125 kg</li>
          <li style={S.li}>Safety factor additional agent (per design calculation) = ~150 kg total (indicative only)</li>
        </ul>

        <p style={S.p}>Actual calculation software se hoti hai — FIKE, Kidde ya similar tools.</p>

        <p style={S.p}>Ek certified fire suppression engineer hi ye design kare.</p>

        <WarningCard>
          FM200 cylinder mein jo gas stored hai wo bahut high pressure pe hai — 360 psi. Cylinder kabhi bhi modify mat karo, weld mat karo, ya damaged cylinder use mat karo. Annual weight check karo — agar cylinder ka weight 5% se zyada kam hua hai to refill karo. Damaged valve ya cylinder ko immediately replace karo — ye life-safety equipment hai.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation</h2>

        <h3 style={S.h3}>Room Integrity Test (Door Fan Test)</h3>
        <p style={S.p}>FM200 tabhi kaam karta hai jab room properly sealed ho.</p>

        <p style={S.p}>Door fan test se verify karte hain ki room mein adequate enclosure hai.</p>

        <p style={S.p}>Test mein fan laga ke pressure differential create karte hain — leakage measure hota hai.</p>

        <p style={S.p}>Result: Room should hold FM200 concentration for minimum 10 minutes.</p>

        <h3 style={S.h3}>Nozzle Placement</h3>
        <p style={S.p}>Nozzle locations calculate kiye jaate hain — room geometry, obstacles, cylinder pressure.</p>

        <p style={S.p}>Typically ceiling pe, equally spaced.</p>

        <p style={S.p}>Raised floor pe bhi nozzles ho sakte hain — under-floor protection ke liye.</p>

        <h3 style={S.h3}>Pipe Sizing</h3>
        <p style={S.p}>Pipe diameter aur length calculate kiye jaate hain — har nozzle tak equal flow ensure karne ke liye.</p>

        <p style={S.p}>Hydraulic calculation software se design hota hai.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>No equipment damage:</strong> No water, no residue — electronics safe</li>
          <li style={S.li}><strong>Fast discharge:</strong> 10 seconds — fire quickly controlled</li>
          <li style={S.li}><strong>Safe for humans:</strong> At design concentration — oxygen level maintained</li>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Live equipment pe safely discharge ho sakti hai</li>
          <li style={S.li}><strong>Reliable automation:</strong> VESDA se trigger — manual intervention ki zaroorat nahi</li>
          <li style={S.li}><strong>Abort window:</strong> False alarm pe discharge rok sakte hain</li>
          <li style={S.li}><strong>Proven technology:</strong> 30+ years se data centers mein use ho rahi hai</li>
          <li style={S.li}><strong>Low maintenance:</strong> Cylinders years tak stable rehte hain</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>High GWP:</strong> 3,220 — significant climate impact per discharge</li>
          <li style={S.li}><strong>Expensive refill:</strong> Ek discharge ke baad cylinder refill costly hai</li>
          <li style={S.li}><strong>Room integrity required:</strong> Leaky room mein FM200 concentration maintain nahi hoti</li>
          <li style={S.li}><strong>HVAC must shut down:</strong> Coordination required — aur HVAC down means cooling bhi band</li>
          <li style={S.li}><strong>Decomposition products:</strong> Very high temperature fires mein HF (hydrogen fluoride) form ho sakta hai — corrosive</li>
          <li style={S.li}><strong>Phase-out risk:</strong> European regulations FM200 restrict kar rahi hain — future uncertain</li>
          <li style={S.li}><strong>Not for deep-seated fires:</strong> Class A fires (wood, paper deeply burning) ke liye not fully effective</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Control panel status check — no fault indicators</li>
          <li style={S.li}>Cylinder visual inspect — no damage, no corrosion</li>
          <li style={S.li}>Pressure gauge check — within specified range</li>
          <li style={S.li}>Abort switch test — functional hai?</li>
          <li style={S.li}>Manual pull station test (with system isolated)</li>
        </ul>

        <p style={S.p}><strong>Annual (by certified engineer):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Cylinder weight check — compare with full weight tag</li>
          <li style={S.li}>Room integrity test — door fan test</li>
          <li style={S.li}>All wiring inspect karo</li>
          <li style={S.li}>Nozzle inspect — blocked nahi hain?</li>
          <li style={S.li}>FACP functional test — with suppression isolated</li>
          <li style={S.li}>Complete system end-to-end test</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>FM200 system ka actual discharge test nahi hota — too expensive aur disruptive.</p>

        <p style={S.p}>Instead — <strong>simulated tests</strong> hote hain:</p>

        <h3 style={S.h3}>Functional Test (Without Discharge)</h3>
        <p style={S.p}>Suppression system isolate karo — solenoid valve ka fuse/link remove karo.</p>

        <p style={S.p}>Smoke detector ya test aerosol se alarm trigger karo.</p>

        <p style={S.p}>Verify karo: pre-alarm bajा, doors close hue, HVAC band hua, abort timer counted, FACP signal gaya.</p>

        <p style={S.p}>Sab kuch verify — bas actual discharge nahi.</p>

        <h3 style={S.h3}>Discharge Test (Full — Rare)</h3>
        <p style={S.p}>Only when: new installation commissioning, major change, ya authority requires.</p>

        <p style={S.p}>Room khali karo. Equipment remove ya protect karo.</p>

        <p style={S.p}>Discharge karo — concentration meters se verify karo ki design concentration achieve hui.</p>

        <p style={S.p}>Costly: gas refill + downtime. Isliye rarely done.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 2001:</strong> Standard on Clean Agent Fire Extinguishing Systems — primary reference</li>
          <li style={S.li}><strong>ISO 14520:</strong> Gaseous fire-extinguishing systems — international standard</li>
          <li style={S.li}><strong>BS EN 15004:</strong> European standard for fixed firefighting systems</li>
          <li style={S.li}><strong>NBC India Part 4:</strong> Fire and Life Safety — applicable requirements</li>
          <li style={S.li}><strong>Uptime Institute:</strong> Clean agent suppression for Tier III/IV data centers</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> Ye ek illustrative example scenario hai — kisi specific real facility ka documentation nahi hai.</p>

        <p style={S.p}><strong>Scenario:</strong> 3 MW data center, 4 zones — server hall (2 zones), UPS room, battery room.</p>

        <p style={S.p}><strong>FM200 design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall Zone 1: 600 sqm, 4.5m ceiling — 8 cylinders × 80 kg each</li>
          <li style={S.li}>Server hall Zone 2: 400 sqm — 6 cylinders × 80 kg each</li>
          <li style={S.li}>UPS room: 2 cylinders × 100 kg</li>
          <li style={S.li}>Battery room: 2 cylinders × 80 kg</li>
        </ul>

        <p style={S.p}><strong>Incident (real scenario type):</strong> UPS room mein capacitor overheating — VESDA Alert level trigger. NOC operator investigate kiya. UPS fault found — reset kiya. FM200 discharge nahi hua. Crisis averted.</p>

        <p style={S.p}><strong>Lesson:</strong> Alert level investigate karo — ye exactly VESDA + FM200 ka design intent hai.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Abort Switch Disabled</h3>
        <p style={S.p}>Kuch engineers false alarms se pareshan ho ke abort switch permanent hold mein rakhte hain.</p>

        <p style={S.p}>Agar real fire aaye to discharge nahi hoga. Never do this.</p>

        <h3 style={S.h3}>Mistake 2 — HVAC Not Interlocked</h3>
        <p style={S.p}>FM200 discharge hogi lekin HVAC chalu rahega to gas dilute ho jaayegi.</p>

        <p style={S.p}>HVAC interlock automatic hona chahiye — manual pe depend mat karo.</p>

        <h3 style={S.h3}>Mistake 3 — Room Integrity Not Maintained</h3>
        <p style={S.p}>New cable entries, gaps in walls — ye sab FM200 leak karte hain.</p>

        <p style={S.p}>Annual door fan test karo — leakage verify karo.</p>

        <h3 style={S.h3}>Mistake 4 — Cylinder Weight Not Checked</h3>
        <p style={S.p}>Cylinder se slow leak hoti hai — pressure gauge sometimes accurate nahi hota.</p>

        <p style={S.p}>Weight se verify karo — every year. Typically 5% ya manufacturer-specified weight loss mein refill karo — exact threshold system specification aur applicable standard follow karo.</p>

        <h3 style={S.h3}>Mistake 5 — Post-Discharge No Investigation</h3>
        <p style={S.p}>FM200 discharged, fire bujhi, "sab theek hai" — aise mat sochna.</p>

        <p style={S.p}>Root cause kya tha? Woh issue still hai. Fix karo — warna dobara hoga.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: FM200 fire kaise bujhata hai?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 heat absorption mechanism se kaam karta hai. Fire triangle mein se heat element ko absorb karta hai. Chemical reaction sustain nahi ho pati — fire bujh jaati hai. Oxygen level maintain rehta hai, isliye humans ke liye safe hai design concentration pe.</p>

        <h3 style={S.h3}>Q2: FM200 discharge sequence kya hoti hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Fire detect → Pre-alarm bajta hai → HVAC band hota hai → Doors close hote hain → Abort window (30-60 sec) → Solenoid valve open → Discharge in 10 seconds → 10 min hold time → Ventilation → Entry with SCBA.</p>

        <h3 style={S.h3}>Q3: FM200 ke liye room integrity kyun important hai?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 gas hai — leaky room mein concentration maintain nahi hogi. Design concentration 7-8% achieve hone ke liye room sealed hona chahiye. Annual door fan test se verify karte hain ki room adequate hold time provide karta hai.</p>

        <h3 style={S.h3}>Q4: FM200 aur CO2 mein main difference kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> CO2 oxygen displacement se fire bujhata hai — room mein koi rah gaya to suffocation risk. FM200 heat absorption se bujhata hai — oxygen level safe rehta hai. Data centers mein isliye FM200 prefer hoti hai. CO2 engine rooms ya unoccupied spaces mein use hoti hai.</p>

        <h3 style={S.h3}>Q5: Accidental FM200 discharge hone pe kya karna chahiye?</h3>
        <p style={S.p}><strong>Answer:</strong> Immediately evacuate karo. Doors close karo — gas contain karo. Ventilation start karo. Kisi ko room mein mat jaane do jab tak ventilated na ho. Root cause investigate karo — fire tha ya false alarm? System reset karo certified engineer se. Incident report karo.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>FM200 vs CO2 vs Sprinkler</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>VESDA ke saath integrate karo:</strong> FM200 alone useful nahi — early detection zaroori hai</li>
          <li style={S.li}><strong>Zone-wise design karo:</strong> Server hall, UPS, battery — alag zones, alag cylinders</li>
          <li style={S.li}><strong>Abort window configure karo:</strong> 30-60 seconds — operations team ke response capability ke hisaab se</li>
          <li style={S.li}><strong>Annual door fan test:</strong> Room integrity verify karo — mandatory</li>
          <li style={S.li}><strong>Cylinder weight log karo:</strong> Every inspection. 5% drop = refill time</li>
          <li style={S.li}><strong>Post-discharge protocol:</strong> Root cause, fix, re-arm — teeno zarouri hain</li>
          <li style={S.li}><strong>Spare cylinder ready rakho:</strong> Discharge ke baad refill 2-4 weeks lagti hai — interim protection kya hai?</li>
          <li style={S.li}><strong>Training:</strong> Operations team ko discharge sequence pata honi chahiye — panic mein galat action dangerous hai</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "FM200 = HFC-227ea — clean agent gas jo heat absorption se fire bujhaati hai. No water, no residue, equipment safe.",
          "Safe for humans at design concentration (7-8%) — oxygen level maintain rehta hai. CO2 se completely different.",
          "10 second discharge — fast aur effective. VESDA detect karta hai, FM200 bujhata hai.",
          "Discharge sequence: detect → pre-alarm → HVAC off → doors close → abort window → discharge → hold → ventilate.",
          "Room integrity critical hai — leaky room mein FM200 kaam nahi karta. Annual door fan test mandatory.",
          "Cylinder weight check karo annually — slow leaks pressure gauge se nahi dikhti.",
          "FM200 ka GWP 3,220 hai — environmental concern. Naya installation ke liye Novec 1250 consider karo.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>FM200 complete hua. Fire protection chain aage samjho:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — FM200 trigger karne wala detection system — pehle ye padho.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — FM200 ka modern replacement — better environmental profile.</li>
          <li style={S.li}><TopicLink slug="novec" variant="inline" /> — Novec fluid family — suppression aur cooling applications.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — Water-based backup system jo FM200 ke saath complement karta hai.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
