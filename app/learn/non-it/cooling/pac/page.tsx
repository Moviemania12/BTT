import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "PAC — Precision Air Conditioner in Data Centers | Behind The Tech",
  description:
    "PAC kya hota hai, kaise kaam karta hai, Data Center mein kyun use hota hai — working principle, components, types, maintenance aur troubleshooting. Simple Hinglish mein.",
  keywords: ["pac data center", "precision air conditioner", "data center cooling", "pac vs crac", "data center hvac"],
  openGraph: {
    title: "PAC — Precision Air Conditioner in Data Centers",
    description: "Data Center cooling ka pehla step — PAC kaise kaam karta hai, kahan lagta hai, aur kyun normal AC se alag hota hai.",
    url: "https://behindthetech.in/learn/non-it/cooling/pac",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAC Explained — Behind The Tech",
    description: "Precision Air Conditioner — Data Center cooling ka basic unit, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/pac" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-pac",         text: "What Is a PAC?",                    level: 2 },
  { id: "why-needed",          text: "Why Is PAC Needed?",                level: 2 },
  { id: "working-principle",   text: "Working Principle",                 level: 2 },
  { id: "refrigeration-cycle", text: "Refrigeration Cycle Explained",     level: 2 },
  { id: "main-components",     text: "Main Components",                   level: 2 },
  { id: "how-it-works-in-dc",  text: "How PAC Works Inside a Data Center",level: 2 },
  { id: "types",               text: "Types of PAC",                      level: 2 },
  { id: "advantages",          text: "Advantages",                        level: 2 },
  { id: "disadvantages",       text: "Disadvantages",                     level: 2 },
  { id: "real-example",        text: "Real Data Center Example",          level: 2 },
  { id: "common-faults",       text: "Common Faults",                     level: 2 },
  { id: "preventive-maintenance", text: "Preventive Maintenance",         level: 2 },
  { id: "daily-checklist",     text: "Daily Inspection Checklist",        level: 2 },
  { id: "monthly-checklist",   text: "Monthly Checklist",                 level: 2 },
  { id: "safety",              text: "Safety Precautions",                level: 2 },
  { id: "interview-questions", text: "Interview Questions",               level: 2 },
  { id: "troubleshooting",     text: "Troubleshooting Guide",             level: 2 },
  { id: "comparison",          text: "PAC vs Normal AC",                  level: 2 },
  { id: "best-practices",      text: "Best Practices",                    level: 2 },
  { id: "key-takeaways",       text: "Key Takeaways",                     level: 2 },
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
    { label: "Ek line mein", text: "PAC ek precision cooling unit hai jo Data Center mein server racks ke paas laga hota hai aur unhe 24×7 thanda rakhta hai." },
    { label: "Normal AC se alag kyun", text: "Ghar ka AC sirf temperature control karta hai. PAC temperature aur humidity dono control karta hai, non-stop chalta hai, aur servers ke liye safe cool air deliver karta hai." },
    { label: "Andar kya hota hai", text: "Compressor, evaporator coil, condenser, expansion valve — ye sab milkar refrigeration cycle chalate hain. Warm air andar aati hai, cool air bahar jaati hai." },
    { label: "Data Center mein kahan", text: "Server room ke andar, racks ke side mein ya row ke end mein. Directly floor pe ya raised floor pe mounted hota hai." },
    { label: "Kitna important hai", text: "Bina cooling ke servers 10-15 minutes mein overheat ho jaate hain. PAC is failure ko rokta hai — ye ek critical infrastructure component hai." },
    { label: "CRAC se kya fark", text: "PAC self-contained hota hai — apna compressor, condenser sab hota hai. CRAC mein chilled water system ya external condenser hota hai. Dono ka kaam same — approach alag." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>❄️ QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#2563EB", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(37,99,235,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Bas itna samajh gaye to PAC ka concept clear hai. Aage poora article hai — working principle se troubleshooting tak.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.16)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(0,255,204,0.03))", border: "1px solid rgba(37,99,235,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(0,255,204,0.12)", border: "1px solid rgba(0,255,204,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.025)", border: "1px solid rgba(37,99,235,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#2563EB", margin: "0 4px", opacity: 0.7 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

function ComparisonTable({ rows }: { rows: { feature: string; pac: string; normalAc: string }[] }) {
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(37,99,235,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>PAC</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Normal AC</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)" }}>{row.pac}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)" }}>{row.normalAc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "PAC aur normal AC mein kya fark hai?", a: "Normal AC sirf temperature control karta hai aur human comfort ke liye design hota hai. PAC temperature aur humidity dono control karta hai, 24×7 continuous operation ke liye banaya gaya hai, aur servers ke liye precise airflow deliver karta hai. Normal AC mein itni precision nahi hoti." },
  { q: "PAC kitne kW ka hota hai?", a: "Typically 5 kW se 60 kW tak. Chhote server rooms mein 10-20 kW ke units use hote hain. Bade data centers mein multiple units parallel mein kaam karte hain." },
  { q: "PAC ko kitni baar service karni chahiye?", a: "Daily inspection, monthly filter cleaning, aur quarterly full preventive maintenance. Agar cooling load zyada hai to more frequent servicing zaroori hai." },
  { q: "PAC fail ho jaye to kya hoga?", a: "Redundant PAC automatically load le lega (N+1 design mein). IT equipment temperature alarm trigger karega. Agar cooling puri tarah fail ho to server shutdown hoga. Isliye redundancy zaroori hai." },
  { q: "PAC mein refrigerant kaunsa use hota hai?", a: "Mostly R410A ya R407C modern units mein. Purane units mein R22 tha jo ab phase out ho raha hai. Refrigerant type unit ke nameplate par likha hota hai." },
  { q: "PAC ka SHR kya hota hai?", a: "SHR = Sensible Heat Ratio. Data Center mein servers sirf sensible heat (temperature badhaate hain) generate karte hain, latent heat (moisture) kam hoti hai. PAC ka SHR 0.90-0.95 hota hai — ye servers ke heat profile ke liye perfect match hai." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(37,99,235,0.08)" }}>
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

export default function PACPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="pac" headings={HEADINGS} readingTimeMinutes={18}>

        <p style={S.p}>Socho ek bank ka server room hai. Sirf 20 servers hain. Room chhota hai — 10×10 feet.</p>
        <p style={S.p}>Woh 20 servers 24 ghante kaam karte hain. Raat ko bhi. Weekend ko bhi. Saal ke 365 din.</p>
        <p style={S.p}>Ye servers heat generate karte hain. Agar ye heat room mein hi rahi, to temperature 45°C, 50°C, 60°C tak chadh jaayega.</p>
        <p style={S.p}><strong>Servers 35-40°C se upar jaayen to shutdown ho jaate hain.</strong></p>
        <p style={S.p}>Isi problem ka solution hai — <strong>PAC (Precision Air Conditioner).</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/pac/pac-unit-data-center.png"
              alt="PAC unit installed in a data center server room"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>PAC unit — Data Center server room mein installed. Ye white/grey cabinet servers ke paas hoti hai.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-pac" style={S.h1}>What Is a PAC?</h2>

        <p style={S.p}><strong>PAC = Precision Air Conditioner.</strong></p>
        <p style={S.p}>Ye ek specialized cooling unit hai jo specifically Data Centers aur Server Rooms ke liye design ki gayi hai.</p>
        <p style={S.p}>Ghar ke AC se compare karo:</p>
        <ul style={S.ul}>
          <li style={S.li}>Ghar ka AC → insaan ko comfortable rakhne ke liye. 22°C se 26°C. Raat ko band hota hai.</li>
          <li style={S.li}>PAC → servers ko safe rakhne ke liye. 18°C se 24°C. Kabhi band nahi hota.</li>
        </ul>
        <p style={S.p}>PAC sirf temperature nahi control karta — <strong>humidity bhi control karta hai.</strong></p>
        <p style={S.p}>Low humidity → static electricity → components damage ho sakte hain.</p>
        <p style={S.p}>High humidity → moisture → corrosion, short circuit.</p>
        <p style={S.p}><strong>Ideal range: Temperature 18-27°C, Humidity 40-60% RH.</strong></p>

        <DCMapNote components={["PAC", "CRAC", "CRAH", "Server Racks", "Cold Aisle"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is PAC Needed?</h2>

        <p style={S.p}>Servers electricity consume karte hain. Ye electricity heat mein convert hoti hai.</p>
        <p style={S.p}>Ek typical 1U server 200-400W generate karta hai. Ek rack mein 20-40 servers ho sakte hain.</p>
        <p style={S.p}>Ek rack ki heat: 20 servers × 300W = <strong>6000W = 6 kW.</strong></p>
        <p style={S.p}>20 racks ki heat: 20 × 6 kW = <strong>120 kW.</strong></p>
        <p style={S.p}>Ye heat kahaan jaayegi? Bahar nikalni padegi. Warna room oven ban jaayega.</p>

        <WhyThisMatters>
          ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers) ke standards ke according, Data Center mein server inlet temperature 18°C to 27°C honi chahiye. Agar ye range cross ho to server performance degrade hoti hai, components ka life span kam hota hai, aur thermal shutdown ho sakta hai.
        </WhyThisMatters>

        <p style={S.p}>Normal building AC kaam nahi karta kyunki:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Continuous operation:</strong> Normal AC 8-12 hours ke liye design hota hai. PAC 8760 hours/year (365 × 24) kaam karta hai.</li>
          <li style={S.li}><strong>High heat density:</strong> Servers ek chhoti jagah mein bahut zyada heat generate karte hain. Normal AC iski capacity nahi rakhta.</li>
          <li style={S.li}><strong>Humidity control:</strong> Normal AC sirf temperature control karta hai. Humidity control nahi.</li>
          <li style={S.li}><strong>Precision:</strong> Normal AC ±3-5°C variation accept karta hai. PAC ±1°C maintain karta hai.</li>
          <li style={S.li}><strong>Sensible heat ratio:</strong> Servers sensible heat generate karte hain (temperature badhata hai, moisture nahi). Normal AC mein SHR low hota hai — ye humid air cool karne ke liye bana hai.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>PAC ka kaam simple principle pe chalta hai:</p>
        <p style={S.p}><strong>Warm air andar → cool karo → cool air bahar.</strong></p>
        <p style={S.p}>Ye cycle refrigerant (ek special gas) use karke achieve hoti hai.</p>

        <FlowDiagram
          caption="PAC airflow cycle — warm air in, cool air out"
          steps={[
            { icon: "🌡️", label: "Warm Air", sublabel: "From Server Racks" },
            { icon: "❄️", label: "Evaporator Coil", sublabel: "Cools Air" },
            { icon: "💨", label: "Fan/Blower", sublabel: "Circulates Air" },
            { icon: "🖥️", label: "Cool Air Out", sublabel: "To Cold Aisle" },
            { icon: "🔄", label: "Repeat", sublabel: "24×7" },
          ]}
        />

        <InsightCard>
          PAC mein ek fan hota hai jo server rack se warm air kheenchta hai. Ye warm air evaporator coil se guzarti hai jahan refrigerant hota hai. Refrigerant is heat ko absorb kar leta hai. Ab cool air fan ke through bahar aati hai aur servers ko thanda karti hai. Ye cycle continuously repeat hoti hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="refrigeration-cycle" style={S.h1}>Refrigeration Cycle Explained</h2>

        <p style={S.p}>Refrigeration cycle samajhna zaroori hai. Ghabrao mat — simple hai.</p>
        <p style={S.p}><strong>Refrigerant</strong> ek special fluid hai jo easily liquid se gas aur gas se liquid ban sakta hai.</p>
        <p style={S.p}>Is property ka use karke cooling hoti hai:</p>

        <FlowDiagram
          caption="Refrigeration cycle — 4 steps mein complete cycle"
          steps={[
            { icon: "❄️", label: "Evaporator", sublabel: "Liquid → Gas, Heat absorb" },
            { icon: "⚙️", label: "Compressor", sublabel: "Gas compress hota hai" },
            { icon: "🌡️", label: "Condenser", sublabel: "Gas → Liquid, Heat release" },
            { icon: "🔧", label: "Expansion Valve", sublabel: "Pressure kam hota hai" },
          ]}
        />

        <h3 style={S.h3}>Step 1 — Evaporator (Cooling Happens Here)</h3>
        <p style={S.p}>Refrigerant liquid form mein evaporator coil mein aata hai. Coil ke upar se warm air guzarti hai. Refrigerant is heat ko absorb karke gas ban jaata hai. Air cool ho jaati hai.</p>
        <p style={S.p}><em>Analogy:</em> Cooler mein paani evaporate hota hai aur thanda feel hota hai — same concept.</p>

        <h3 style={S.h3}>Step 2 — Compressor (Pressure Increase)</h3>
        <p style={S.p}>Gas form refrigerant compressor mein jaata hai. Compressor isko high pressure pe compress karta hai. Compression se temperature bhi badh jaata hai — ye hot compressed gas hai ab.</p>

        <h3 style={S.h3}>Step 3 — Condenser (Heat Release)</h3>
        <p style={S.p}>Hot compressed gas condenser mein jaati hai. Yahan ye heat release karti hai. Heat kondenser se bahar jati hai — building ke bahar ya cooling tower mein. Gas liquid ban jaati hai.</p>

        <h3 style={S.h3}>Step 4 — Expansion Valve (Pressure Drop)</h3>
        <p style={S.p}>Liquid refrigerant expansion valve se guzarta hai. Pressure drop hoti hai. Refrigerant thanda ho jaata hai. Ab ye phir evaporator mein jaata hai — cycle complete.</p>

        <EngineerTip>
          Refrigeration cycle yaad rakhne ka shortcut: <strong>Evaporator = absorb, Compressor = compress, Condenser = reject, Expansion = expand.</strong> ECCE — ye sequence kabhi nahi bhoolna.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Compressor</h3>
        <p style={S.p}>PAC ka "heart". Refrigerant gas ko compress karta hai. Ye most power-consuming component hai. Scroll type ya reciprocating type hota hai modern units mein.</p>

        <h3 style={S.h3}>2. Evaporator Coil (Indoor Coil)</h3>
        <p style={S.p}>Yahan actual cooling hoti hai. Refrigerant is coil se guzarta hai aur warm air ki heat absorb karta hai. Fins aur tubes ka assembly hota hai — zyada surface area = zyada heat transfer.</p>

        <h3 style={S.h3}>3. Condenser</h3>
        <p style={S.p}>Heat ko bahar release karta hai. Air-cooled (fan se air) ya water-cooled (chilled water se) ho sakta hai. Self-contained PAC mein air-cooled condenser hota hai.</p>

        <h3 style={S.h3}>4. Expansion Valve (TEV / EEV)</h3>
        <p style={S.p}>Refrigerant ka flow aur pressure control karta hai. TEV = Thermostatic Expansion Valve (mechanical). EEV = Electronic Expansion Valve (electronic control — zyada precise). Modern PAC mein EEV use hota hai.</p>

        <h3 style={S.h3}>5. Fan / Blower</h3>
        <p style={S.p}>Air ko server racks se kheenchta hai aur cool air return karta hai. EC (Electronically Commutated) fans modern PAC mein hote hain — inki speed variable hoti hai aur energy efficient hain.</p>

        <h3 style={S.h3}>6. Microprocessor Controller</h3>
        <p style={S.p}>PAC ka "brain". Temperature aur humidity sensors se readings leta hai. Compressor, fans, aur heater ko control karta hai. Alarms generate karta hai. BMS (Building Management System) se communicate karta hai.</p>

        <h3 style={S.h3}>7. Humidifier / Dehumidifier</h3>
        <p style={S.p}>Humidity control ke liye. Agar humidity kam ho to humidifier steam ya water mist add karta hai. Agar humidity zyada ho to dehumidification mode mein condensation se moisture remove hoti hai.</p>

        <h3 style={S.h3}>8. Electric Heater (Optional)</h3>
        <p style={S.p}>Cold weather mein jab servers se heat kafi na ho, PAC heating bhi kar sakta hai. Ye ensure karta hai ki temperature minimum se neeche na jaaye.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How PAC Works Inside a Data Center</h2>

        <p style={S.p}>Ab real Data Center scenario mein dekho.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/pac/pac-cold-hot-aisle.png"
              alt="PAC unit with cold aisle and hot aisle arrangement in data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>Cold Aisle / Hot Aisle arrangement — PAC se cool air cold aisle mein jata hai, hot air hot aisle mein collect hota hai.</figcaption>
        </figure>

        <p style={S.p}>Data Center mein server racks rows mein lagaye jaate hain. Racks ke beech do prakar ke aisles (galiyan) hoti hain:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Cold Aisle</strong> — jahan PAC se thandi air aati hai. Servers ka front side yahan face karta hai.</li>
          <li style={S.li}><strong>Hot Aisle</strong> — jahan servers se garam air nikalti hai. Servers ka back side yahan face karta hai.</li>
        </ul>
        <p style={S.p}>PAC cold aisle mein ya uske paas lagta hai. Cool air cold aisle mein jata hai → servers ke andar se guzarta hai → hot aisle mein nikalta hai → PAC wapas kheenchta hai → cool karta hai → phir cold aisle mein.</p>
        <p style={S.p}><strong>Ye ek closed loop hai.</strong></p>

        <InsightCard>
          Ek important baat: PAC mein se cool air neeche se ya upar se aa sakti hai. Raised floor system mein, PAC cool air raised floor ke neeche bhejta hai aur wo perforated tiles se nikalta hai. Yahi cold aisle ko thanda rakhta hai. Without raised floor, PAC directly floor level se ya ceiling se cool air deliver karta hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of PAC</h2>

        <h3 style={S.h3}>1. Downflow PAC</h3>
        <p style={S.p}>Cool air neeche se nikalta hai — raised floor mein. Most common type. Racks se warm air upar se kheenchi jaati hai.</p>

        <h3 style={S.h3}>2. Upflow PAC</h3>
        <p style={S.p}>Cool air upar se nikalta hai. Jab raised floor nahi ho. Air directly ceiling level se distribute hoti hai ya overhead ducts se.</p>

        <h3 style={S.h3}>3. In-Row Cooling</h3>
        <p style={S.p}>PAC unit directly rack rows ke beech lagti hai. Heat load ke bahut paas cooling. High-density environments ke liye best. Short air paths — efficient.</p>

        <h3 style={S.h3}>4. In-Rack Cooling</h3>
        <p style={S.p}>Cooling unit directly rack ke andar lagti hai. Ultra-high density servers ke liye. Rare — mostly specialized applications mein.</p>

        <h3 style={S.h3}>5. Air-Cooled PAC</h3>
        <p style={S.p}>Condenser heat ko bahar air se release karta hai. External condenser building ke bahar wall par ya roof par lagta hai. Simpler installation.</p>

        <h3 style={S.h3}>6. Water-Cooled PAC</h3>
        <p style={S.p}>Condenser heat ko chilled water loop se release karta hai. Chiller system ke saath kaam karta hai. Better efficiency but requires water infrastructure.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Precision control:</strong> Temperature ±1°C, humidity ±5% RH maintain karta hai</li>
          <li style={S.li}><strong>24×7 operation:</strong> Continuous duty rated — koi band nahi hota</li>
          <li style={S.li}><strong>High SHR:</strong> Server heat profile ke liye perfect match</li>
          <li style={S.li}><strong>Self-contained:</strong> Compressor, condenser — sab ek unit mein (air-cooled type mein)</li>
          <li style={S.li}><strong>Redundancy possible:</strong> N+1 design — ek fail ho to doosra active</li>
          <li style={S.li}><strong>BMS integration:</strong> Remote monitoring aur alarms</li>
          <li style={S.li}><strong>Scalable:</strong> Load badhne pe nayi units add karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Higher cost:</strong> Normal AC se 3-5x mahanga</li>
          <li style={S.li}><strong>Space requirement:</strong> Large units floor space lete hain</li>
          <li style={S.li}><strong>External condenser:</strong> Air-cooled type mein outdoor unit bhi lagani padti hai</li>
          <li style={S.li}><strong>Energy consumption:</strong> 24×7 chalta hai — electricity bill zyada</li>
          <li style={S.li}><strong>Skilled maintenance:</strong> HVAC certified technician chahiye</li>
          <li style={S.li}><strong>Limited for high density:</strong> Very high density racks (20+ kW/rack) ke liye supplementary cooling chahiye</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Scenario:</strong> Ek 200 sqm ka colocation data center, 50 racks, average 5 kW per rack.</p>
        <p style={S.p}><strong>Total heat load:</strong> 50 × 5 = 250 kW</p>
        <p style={S.p}><strong>PAC sizing:</strong> 30 kW cooling capacity ke 10 PAC units (total 300 kW) — N+1 mein 9 units kafi hain, 1 standby.</p>
        <p style={S.p}><strong>Arrangement:</strong> Downflow PAC, raised floor 500mm height. Cold aisle / hot aisle containment.</p>
        <p style={S.p}><strong>Redundancy:</strong> N+1 — koi bhi ek unit fail ho to baaki 9 poora load sambhal lenge.</p>
        <p style={S.p}><strong>Monitoring:</strong> Sab PAC BMS se connected. Temperature, humidity, alarms — sab centrally monitor hote hain.</p>

        <InsightCard>
          Real data centers mein PAC units 24×7 chechk kiye jaate hain. BMS par ek dedicated cooling overview screen hoti hai jisme har PAC ka status, temperature readings, aur alarms dikhte hain. Agar koi PAC high temperature alarm de, to immediately investigation hoti hai — wait nahi karte.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>1. High Supply Air Temperature Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Dirty filters, low refrigerant, compressor issue, high room heat load.</p>
        <p style={S.p}><strong>Impact:</strong> Server inlet temperature badh jaata hai. High temperature alarm trigger hota hai.</p>

        <h3 style={S.h3}>2. High/Low Humidity Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Humidifier failure, dehumidification circuit issue, water supply problem.</p>
        <p style={S.p}><strong>Impact:</strong> Static discharge risk (low humidity), condensation risk (high humidity).</p>

        <h3 style={S.h3}>3. High Head Pressure</h3>
        <p style={S.p}><strong>Cause:</strong> Dirty condenser coil, condenser fan failure, refrigerant overcharge, high outdoor temperature.</p>
        <p style={S.p}><strong>Impact:</strong> Compressor trip karta hai, cooling stop ho jaati hai.</p>

        <h3 style={S.h3}>4. Low Suction Pressure (Low Refrigerant)</h3>
        <p style={S.p}><strong>Cause:</strong> Refrigerant leak, expansion valve issue.</p>
        <p style={S.p}><strong>Impact:</strong> Cooling capacity reduce hoti hai, evaporator freeze ho sakta hai.</p>

        <h3 style={S.h3}>5. Filter Clog Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Air filters clog ho gaye — dust, particles.</p>
        <p style={S.p}><strong>Impact:</strong> Airflow reduce hota hai, cooling efficiency drop hoti hai.</p>

        <h3 style={S.h3}>6. Water Leak / Condensate Drain Block</h3>
        <p style={S.p}><strong>Cause:</strong> Drain pan full, drain pipe blocked.</p>
        <p style={S.p}><strong>Impact:</strong> Water leak → equipment damage → serious hazard.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <p style={S.p}><strong>Quarterly (3 months) maintenance:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Air filter clean ya replace karo</li>
          <li style={S.li}>Evaporator coil inspect karo — fins clean karo</li>
          <li style={S.li}>Condenser coil clean karo</li>
          <li style={S.li}>Refrigerant pressure check karo (suction aur discharge)</li>
          <li style={S.li}>Electrical connections tighten karo</li>
          <li style={S.li}>Fan belts ya bearings check karo (older units)</li>
          <li style={S.li}>Condensate drain clean karo</li>
          <li style={S.li}>Controller settings verify karo</li>
          <li style={S.li}>Temperature calibration check karo</li>
        </ul>

        <p style={S.p}><strong>Annual maintenance:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Full refrigerant system check — leak test</li>
          <li style={S.li}>Compressor current draw verify karo</li>
          <li style={S.li}>All sensors recalibrate karo</li>
          <li style={S.li}>Humidifier cylinder replace karo (if applicable)</li>
          <li style={S.li}>Electrical insulation test</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Inspection Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Supply air temperature reading note karo (target 18-22°C)</li>
          <li style={S.li}>✓ Return air temperature reading (target 27-35°C)</li>
          <li style={S.li}>✓ Room humidity reading (target 40-60% RH)</li>
          <li style={S.li}>✓ PAC unit status — running / standby / fault</li>
          <li style={S.li}>✓ Active alarms check karo — BMS par</li>
          <li style={S.li}>✓ Unusual noise ya vibration check karo</li>
          <li style={S.li}>✓ Water leak check karo — drain pan area</li>
          <li style={S.li}>✓ Filter differential pressure (if monitored)</li>
          <li style={S.li}>✓ Compressor running status</li>
          <li style={S.li}>✓ Fan status — speed aur airflow</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Air filter inspect karo — clean ya replace karni hai kya?</li>
          <li style={S.li}>✓ Condensate drain flush karo — blockage check</li>
          <li style={S.li}>✓ Evaporator coil visual inspect karo</li>
          <li style={S.li}>✓ Temperature/humidity sensor readings verify karo — calibrated hain?</li>
          <li style={S.li}>✓ PAC switchover test karo — standby unit chalu karo, primary band karo, smoothly transfer hota hai?</li>
          <li style={S.li}>✓ BMS alarms history review karo — recurring issues identify karo</li>
          <li style={S.li}>✓ Electrical panel — breakers, switches check karo</li>
          <li style={S.li}>✓ Log book update karo — readings, maintenance done</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Electrical isolation:</strong> Maintenance se pehle MCB/MCCB off karo aur LOTO (Lockout Tagout) lagao</li>
          <li style={S.li}><strong>Refrigerant handling:</strong> Certified HVAC technician hi refrigerant handle kare — direct skin contact ya inhalation dangerous</li>
          <li style={S.li}><strong>High pressure:</strong> Refrigerant system high pressure par hota hai — unauthorized opening dangerous</li>
          <li style={S.li}><strong>Water leak response:</strong> Leak dikhte hi electrical equipment se clear karo — slip hazard bhi hai</li>
          <li style={S.li}><strong>PPE:</strong> Gloves, safety glasses mandatory — maintenance ke time</li>
          <li style={S.li}><strong>Permit to Work:</strong> Hot work nahi hai, lekin entry permit aur LOTO mandatory — data center policy follow karo</li>
          <li style={S.li}><strong>Redundancy ensure karo:</strong> Maintenance se pehle standby unit running hai — confirm karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: PAC aur normal AC mein kya difference hai?</h3>
        <p style={S.p}><strong>Answer:</strong> PAC precision cooling ke liye hai — continuous duty, humidity control, high SHR. Normal AC human comfort ke liye — intermittent use, sirf temperature control, low SHR. PAC server inlet temperature ±1°C maintain karta hai.</p>

        <h3 style={S.h3}>Q2: SHR kya hota hai aur Data Center mein kyun important hai?</h3>
        <p style={S.p}><strong>Answer:</strong> SHR = Sensible Heat Ratio = Sensible cooling / Total cooling. Servers sirf sensible heat (temperature) generate karte hain, latent heat (moisture) nahi. PAC ka SHR 0.90-0.95 hona chahiye — ye servers ke load profile se match karta hai. Normal AC ka SHR 0.65-0.75 hota hai — ye humid air ke liye design hai.</p>

        <h3 style={S.h3}>Q3: N+1 redundancy kya hota hai PAC ke context mein?</h3>
        <p style={S.p}><strong>Answer:</strong> N = required units, +1 = ek extra unit. Agar 9 units full load chalane ke liye kafi hain, to 10 install karo. Ek fail ho to baaki 9 load sambhal lein. Koi downtime nahi.</p>

        <h3 style={S.h3}>Q4: PAC mein high head pressure alarm kya indicate karta hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Condenser side mein problem — dirty condenser coil, condenser fan failure, high ambient temperature, ya refrigerant overcharge. Compressor trip kar sakta hai — immediate investigation zaroori hai.</p>

        <h3 style={S.h3}>Q5: Cold aisle / hot aisle kya hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Server racks alternate direction mein lagaye jaate hain. Cold aisle mein servers ka front face karta hai — yahan PAC se cool air aati hai. Hot aisle mein servers ka back — yahan exhaust air nikalti hai. Mixing reduce hoti hai, cooling efficiency improve hoti hai.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Problem: Room temperature badhh raha hai</h3>
        <ul style={S.ul}>
          <li style={S.li}>Check karo: Kitne PAC units actually running hain?</li>
          <li style={S.li}>Filter check karo — clog hua?</li>
          <li style={S.li}>Supply air temperature measure karo — PAC se cool air aa rahi hai?</li>
          <li style={S.li}>Hot aisle / cold aisle separation check karo — mixing ho rahi hai?</li>
          <li style={S.li}>IT load suddenly badha to nahi — new servers add hue?</li>
        </ul>

        <h3 style={S.h3}>Problem: Humidity out of range</h3>
        <ul style={S.ul}>
          <li style={S.li}>PAC controller par humidity reading check karo</li>
          <li style={S.li}>Humidifier status check karo — fault alarm hai?</li>
          <li style={S.li}>Water supply to humidifier check karo</li>
          <li style={S.li}>Multiple PAC readings compare karo — single unit issue ya systemic?</li>
        </ul>

        <h3 style={S.h3}>Problem: PAC trip ho gaya / fault alarm</h3>
        <ul style={S.ul}>
          <li style={S.li}>Controller display par fault code read karo</li>
          <li style={S.li}>Immediately standby unit running confirm karo</li>
          <li style={S.li}>MCB/circuit breaker trip check karo</li>
          <li style={S.li}>High head pressure → condenser check karo</li>
          <li style={S.li}>Low suction pressure → refrigerant leak suspect karo → qualified technician call karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>PAC vs Normal AC</h2>

        <ComparisonTable rows={[
          { feature: "Purpose", pac: "Data Center / Server Room", normalAc: "Human comfort" },
          { feature: "Operation", pac: "24×7 continuous", normalAc: "Intermittent (8-12 hours)" },
          { feature: "Temperature precision", pac: "±1°C", normalAc: "±3-5°C" },
          { feature: "Humidity control", pac: "Yes — 40-60% RH", normalAc: "No / limited" },
          { feature: "SHR", pac: "0.90-0.95 (high)", normalAc: "0.65-0.75 (low)" },
          { feature: "Capacity", pac: "5 kW to 60+ kW per unit", normalAc: "1-15 kW typically" },
          { feature: "Cost", pac: "3-5x higher", normalAc: "Standard" },
          { feature: "Redundancy", pac: "N+1 design", normalAc: "Not typical" },
          { feature: "BMS integration", pac: "Standard", normalAc: "Rare" },
          { feature: "Maintenance", pac: "Specialized HVAC", normalAc: "General HVAC" },
        ]} />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Always N+1:</strong> Kabhi single point of failure mat rakho. Minimum ek extra PAC hona chahiye.</li>
          <li style={S.li}><strong>Hot/Cold aisle containment:</strong> PAC ki efficiency 30-40% improve hoti hai containment se.</li>
          <li style={S.li}><strong>Blanking panels:</strong> Khali rack spaces mein blanking panels lagao — hot/cold air mixing rokta hai.</li>
          <li style={S.li}><strong>Filter schedule:</strong> Regular filter maintenance = consistent airflow = consistent cooling.</li>
          <li style={S.li}><strong>Setpoint management:</strong> Room temperature setpoint 21-23°C rakho — zyada thanda waste of energy.</li>
          <li style={S.li}><strong>BMS integration:</strong> Sab PAC BMS se connect karo — remote monitoring aur automatic alarms.</li>
          <li style={S.li}><strong>Standby rotation:</strong> Primary aur standby units rotate karo — dono equal wear.</li>
          <li style={S.li}><strong>Load balancing:</strong> PAC units evenly distribute karo room mein — hot spots avoid karo.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "PAC ek Precision Air Conditioner hai — Data Center ke liye specifically design kiya gaya cooling unit.",
          "Normal AC se alag kyunki: 24×7 continuous, temperature + humidity control, high SHR, precision ±1°C.",
          "Refrigeration cycle: Evaporator (heat absorb) → Compressor (compress) → Condenser (heat reject) → Expansion valve → repeat.",
          "Cold aisle mein cool air deliver hoti hai. Hot aisle mein warm air collect hoti hai. PAC is cycle ko maintain karta hai.",
          "N+1 redundancy zaroori hai — ek fail ho to doosra load le le. Downtime nahi.",
          "Daily inspection, monthly maintenance, quarterly full PM — ye routine follow karo. PAC neglect mat karo.",
          "Common faults: high supply temperature, humidity out of range, high head pressure, low refrigerant. Har ek ke causes aur solutions yaad rakho.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Ab PAC clear ho gaya. Aage cooling system ko aur samjho:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — PAC ka cousin. Different compressor approach, same goal.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — Large data centers mein centralized cooling system.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Hot aisle / cold aisle containment — PAC efficiency improve karta hai.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — Cool air sahi jagah kaise pahunche — complete guide.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Cooling effectiveness measure karne ka metric.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
