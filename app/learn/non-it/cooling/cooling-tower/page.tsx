import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Cooling Tower in Data Centers — Complete Guide | Behind The Tech",
  description: "Cooling tower kya hai, kaise kaam karta hai, Data Center mein chiller ke saath kaise connect hota hai — evaporative cooling, types, maintenance aur safety guide.",
  keywords: ["cooling tower data center", "cooling tower chiller", "evaporative cooling data center", "cooling tower maintenance"],
  openGraph: { title: "Cooling Tower in Data Centers", description: "Cooling tower — chiller plant ka heat rejection component. Complete guide.", url: "https://behindthetech.in/learn/non-it/cooling/cooling-tower", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "Cooling Tower Explained — Behind The Tech", description: "Cooling tower — Data Center chiller ka heat rejection system. Complete guide." },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/cooling-tower" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-cooling-tower", text: "What Is a Cooling Tower?",            level: 2 },
  { id: "why-needed",           text: "Why Is Cooling Tower Needed?",        level: 2 },
  { id: "working-principle",    text: "Working Principle",                   level: 2 },
  { id: "main-components",      text: "Main Components",                     level: 2 },
  { id: "how-it-works-in-dc",   text: "How Cooling Tower Works in a Data Center", level: 2 },
  { id: "types",                text: "Types of Cooling Towers",             level: 2 },
  { id: "advantages",           text: "Advantages",                          level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                       level: 2 },
  { id: "real-example",         text: "Real Data Center Example",            level: 2 },
  { id: "common-faults",        text: "Common Faults",                       level: 2 },
  { id: "preventive-maintenance", text: "Preventive Maintenance",            level: 2 },
  { id: "daily-checklist",      text: "Daily Inspection Checklist",          level: 2 },
  { id: "monthly-checklist",    text: "Monthly Checklist",                   level: 2 },
  { id: "safety",               text: "Safety Precautions",                  level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                 level: 2 },
  { id: "troubleshooting",      text: "Troubleshooting Guide",               level: 2 },
  { id: "comparison",           text: "Cooling Tower vs Air-Cooled Chiller", level: 2 },
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
};

function QuickSummary() {
  const pts = [
    { label: "Ek line mein", text: "Cooling tower ek heat rejection device hai jo chiller ki condenser heat ko atmosphere mein nikalta hai — evaporative cooling use karke." },
    { label: "Kahan lagta hai", text: "Building ke roof par ya ground level pe (outside). Chiller ke condenser water loop se connected. Data center ke bahar hota hai." },
    { label: "Kaise kaam karta hai", text: "Hot condenser water (35-40°C) tower mein aata hai. Fill media se trickle karta hai. Fans air draw karte hain. Kuch paani evaporate hota hai — ye evaporation heat absorb karta hai. Thanda water (28-32°C) wapas chiller mein." },
    { label: "Chiller se connection", text: "Chiller → condenser se hot water → cooling tower (heat reject) → thanda water → chiller condenser. Ye condenser water loop hai. Chilled water loop alag hoti hai — mix nahi hoti." },
    { label: "Water ki zaroorat", text: "Evaporation se paani loss hota hai — makeup water chahiye. Typical data center cooling tower mein lakhs of litres per month water use hota hai. Water treatment zaroori hai." },
    { label: "Legionella risk", text: "Warm stagnant water mein Legionella bacteria grow kar sakta hai. Regular biocide treatment, temperature management, proper cleaning — zaroori hai. Ye health hazard hai — seriously lo." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>🏭 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#2563EB", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" as const, borderRadius: 10, overflow: "hidden" as const, margin: "28px 0" }}>
      <div style={{ height: 2, background: "#2563EB" }} />
      <div style={{ background: "rgba(37,99,235,0.035)", border: "1px solid rgba(37,99,235,0.16)", borderTop: "none", padding: "18px 22px 20px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", fontWeight: 600, marginBottom: 10, color: "#2563EB" }}>INSIGHT</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#1f2937" }}>{children}</div>
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

const FAQS = [
  { q: "Cooling tower sirf chiller ke saath hi use hota hai kya?", a: "Water-cooled chiller ke saath standard hai. Lekin cooling tower standalone bhi use ho sakta hai — direct heat rejection ke liye. Data centers mein typically chiller ke saath use hota hai. Condenser water loop — chiller condenser aur cooling tower ke beech." },
  { q: "Cooling tower mein kitna paani use hota hai?", a: "Evaporation (typically 1-2% of circulation rate), blowdown (2-3% — concentrated minerals remove karne ke liye), aur drift (< 0.001% modern towers mein). Large data center cooling tower: lakhs of litres per month water use hota hai. Water conservation important hai." },
  { q: "Approach temperature kya hota hai?", a: "Approach = Cooling tower outlet water temperature - Wet bulb temperature. Smaller approach = better cooling tower performance. Typical design: 3-5°C approach. Wet bulb temperature outdoor humidity se dependent hota hai." },
  { q: "Legionella kya hai aur cooling tower mein kyon problem hai?", a: "Legionella pneumophila ek bacteria hai jo Legionnaires' disease (serious pneumonia) cause karta hai. Cooling tower ka warm, humid environment perfect breeding ground hai. Prevention: regular biocide dosing, proper temperature management (60°C+ ya 20°C-), regular cleaning." },
  { q: "Cooling tower fan speed control kaise hota hai?", a: "VFD (Variable Frequency Drive) se fan speed vary kiya jaata hai — load aur ambient conditions ke hisaab se. Thanda weather = slower fans, kum load = slower fans. Energy saving 50%+ possible hai VFD se vs fixed speed." },
  { q: "Cooling tower capacity kaise size karte hain?", a: "Chiller condenser heat rejection (kW mein) based pe. Rule of thumb: Cooling tower capacity = 1.25 × chiller cooling capacity (approx). Proper sizing meteorological data pe based hoti hai — local wet bulb temperature, ambient conditions." },
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
  mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

export default function CoolingTowerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="cooling-tower" headings={HEADINGS} readingTimeMinutes={18}>

        <p style={S.p}>Chiller data center ki heat absorb karta hai. Lekin ye heat kahin jaani chahiye — permanently bahar.</p>
        <p style={S.p}>Chiller ye heat kaise remove karta hai? Cooling tower ke through.</p>
        <p style={S.p}><strong>Cooling tower = chiller ka heat dumping station.</strong></p>
        <p style={S.p}>Ye ek simple device hai — lekin iske bina water-cooled chiller plant nahi chal sakta.</p>
        <p style={S.p}>Aur cooling tower ke bina, large data center ki cooling fail ho jaayegi.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/cooling-tower/cooling-tower-data-center.png" alt="Cooling towers on roof of data center building" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Cooling towers — typically data center building ke roof pe ya ground pe outside. Ye towers atmosphere mein heat reject karte hain.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-cooling-tower" style={S.h1}>What Is a Cooling Tower?</h2>

        <p style={S.p}><strong>Cooling tower ek heat rejection device hai.</strong></p>
        <p style={S.p}>Ye hot water ko thanda karta hai — evaporative cooling process se — aur heat atmosphere mein release karta hai.</p>
        <p style={S.p}><em>Daily life analogy:</em> Garmi mein sweat aata hai. Sweat evaporate hota hai. Aap thanda feel karte ho. Same principle — cooling tower mein paani evaporate hota hai, heat bahar jaati hai.</p>
        <p style={S.p}>Data center mein cooling tower specifically <strong>chiller plant</strong> ke saath kaam karta hai.</p>
        <p style={S.p}>Chiller ka condenser side hot ho jaata hai — jab refrigerant heat reject karta hai. Ye heat kahin nikalni chahiye. Cooling tower ye kaam karta hai.</p>

        <DCMapNote components={["Cooling Tower", "Chiller", "Condenser Water Pumps", "Cooling Tower Basin", "Makeup Water"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Cooling Tower Needed?</h2>

        <p style={S.p}>Chiller refrigeration cycle mein heat do jagah transfer hoti hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Evaporator side:</strong> Chilled water se heat absorb hoti hai → data center thanda hota hai ✓</li>
          <li style={S.li}><strong>Condenser side:</strong> Ye heat kahin reject karni hai → COOLING TOWER ✓</li>
        </ul>
        <p style={S.p}>Agar condenser side heat reject nahi hogi, chiller overload ho jaayega. High pressure trip. Cooling stop.</p>
        <p style={S.p}><strong>Energy balance: Cooling tower ko jitni heat reject karni hai = Data center ki IT heat + Chiller's own power consumption.</strong></p>
        <p style={S.p}>Example: 1000 kW data center heat + 200 kW chiller power = 1200 kW cooling tower ko reject karna hai.</p>

        <WhyThisMatters>
          Water-cooled chiller + cooling tower combination data center cooling mein COP 4-7 achieve karta hai. Air-cooled chiller COP 2.5-4 hota hai. Iska matlab: cooling tower use karne se electricity 30-40% kam lagti hai same cooling ke liye. Large data center mein ye lakhs of rupees monthly savings ho sakti hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}><strong>Evaporative cooling</strong> — ye cooling tower ka core principle hai.</p>
        <p style={S.p}>Simple experiment: Kapde pe paani lagao. Paani evaporate hota hai. Kapda thanda ho jaata hai.</p>
        <p style={S.p}>Why? Evaporation ke liye energy chahiye — ye energy surrounding paani ki heat se aati hai. Result: paani thanda hota hai.</p>

        <FlowDiagram
          caption="Cooling tower evaporative cooling process"
          steps={[
            { icon: "🌡️", label: "Hot Water In", sublabel: "35-40°C from chiller" },
            { icon: "💧", label: "Fill Media", sublabel: "Water distributed" },
            { icon: "💨", label: "Airflow", sublabel: "Fan draws air up" },
            { icon: "🌫️", label: "Evaporation", sublabel: "Heat removed" },
            { icon: "❄️", label: "Cool Water Out", sublabel: "28-32°C to chiller" },
          ]}
        />

        <h3 style={S.h3}>Step by Step Process</h3>
        <p style={S.p}><strong>Step 1 — Hot water in:</strong> Chiller condenser se hot water (35-40°C) cooling tower mein enter karta hai. Distribution header is water ko evenly distribute karta hai.</p>
        <p style={S.p}><strong>Step 2 — Fill media:</strong> Hot water fill media (packing/fill — plastic ya wood ki structured sheets) ke upar se trickle karta hai. Fill surface area maximize karta hai — more surface = more evaporation.</p>
        <p style={S.p}><strong>Step 3 — Airflow:</strong> Cooling tower fan atmospheric air draw karta hai. Air fill media se guzarti hai — water ke contact mein aati hai.</p>
        <p style={S.p}><strong>Step 4 — Evaporation:</strong> Kuch paani (1-2%) evaporate ho jaata hai. Ye evaporation remaining water ki heat absorb karta hai. Result: remaining water thanda ho jaata hai.</p>
        <p style={S.p}><strong>Step 5 — Thanda water:</strong> Cool water (28-32°C) basin mein collect hota hai. Condenser water pumps ye thanda water chiller ke condenser tak pump karte hain. Cycle repeat.</p>

        <InsightCard>
          Important samjho: Chilled water loop (blue) aur condenser water loop (red/yellow) SEPARATE hote hain. Mixing kabhi nahi hoti. Chiller inke beech heat exchanger ka kaam karta hai. Chilled water sirf CRAH mein jaata hai. Condenser water sirf cooling tower aur chiller condenser mein circulate hota hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Fill Media (Packing)</h3>
        <p style={S.p}>Water distribute karne ke liye — surface area maximize karta hai. PVC plastic ya treated wood ki structured sheets. Counter-flow fill: water neeche, air upar. Cross-flow fill: water neeche, air horizontal.</p>

        <h3 style={S.h3}>2. Fan</h3>
        <p style={S.p}>Air draw karta hai tower mein. Axial (propeller type) ya centrifugal. VFD controlled — speed vary karo, energy save karo. Induced draft (fan top pe) ya forced draft (fan bottom pe).</p>

        <h3 style={S.h3}>3. Drift Eliminators</h3>
        <p style={S.p}>Water droplets ko air ke saath bahar jaane se rokta hai. Drift = treated water jo atmosphere mein jaata hai. Modern towers mein drift rate {'<'} 0.001% — Legionella risk reduce karta hai. Ye important health protection component hai.</p>

        <h3 style={S.h3}>4. Water Distribution System</h3>
        <p style={S.p}>Hot water inlet se header tak. Nozzles ya gravity distribution — fill media pe evenly pani distribute karta hai. Proper distribution = even cooling = efficient operation.</p>

        <h3 style={S.h3}>5. Basin</h3>
        <p style={S.p}>Tower ka bottom section. Cool water collect hota hai yahan. Float valve — water level control karta hai. Makeup water supply — evaporation se jo paani lose hota hai wo yahan supply hota hai. Blowdown outlet — concentrated minerals remove karne ke liye.</p>

        <h3 style={S.h3}>6. Makeup Water System</h3>
        <p style={S.p}>Evaporation se jo paani lose hota hai use compensate karta hai. Float valve based automatic control. Treated water — minerals control karna zaroori hai.</p>

        <h3 style={S.h3}>7. Chemical Dosing System</h3>
        <p style={S.p}>Scale inhibitor, corrosion inhibitor, biocide, pH control — regularly dose kiye jaate hain. Ye sabse important maintenance item hai — Legionella prevention ke liye bhi.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Cooling Tower Works in a Data Center</h2>

        <p style={S.p}>Full loop samjho:</p>

        <FlowDiagram
          caption="Complete data center cooling chain — servers to atmosphere"
          steps={[
            { icon: "🖥️", label: "Servers", sublabel: "Heat generate" },
            { icon: "🌬️", label: "CRAH", sublabel: "Air → water" },
            { icon: "🧊", label: "Chiller", sublabel: "Cool CHW" },
            { icon: "🏭", label: "Cooling Tower", sublabel: "Reject heat" },
            { icon: "🌍", label: "Atmosphere", sublabel: "Heat gone" },
          ]}
        />

        <p style={S.p}>Servers → warm air → CRAH → warm chilled water → chiller evaporator → chiller condenser → hot condenser water → <strong>cooling tower → heat rejected to atmosphere.</strong></p>
        <p style={S.p}>Cooling tower final heat rejection point hai. Bina cooling tower ke, heat kahan jaayegi? Nowhere — system fail ho jaayega.</p>

        <EngineerTip>
          Condenser water temperatures yaad karo: Supply to chiller (CDWS) = 28-32°C, Return from chiller (CDWR) = 35-40°C. Delta T = 5-8°C. Agar CDW temperature zyada ho to chiller efficiency drop hoti hai aur condenser pressure high ho jaata hai. Cooling tower properly kaam karna chahiye — chiller performance directly depend karta hai.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Cooling Towers</h2>

        <h3 style={S.h3}>By Airflow Direction</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Counter-Flow:</strong> Air upar flow karta hai, water neeche. Maximum contact — efficient. Compact design. Most common in data centers.</li>
          <li style={S.li}><strong>Cross-Flow:</strong> Air horizontal flow karta hai. Water neeche. Larger footprint. Easier maintenance — fill access better. Some large installations.</li>
        </ul>

        <h3 style={S.h3}>By Fan Type</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Induced Draft:</strong> Fan top pe — air pull karta hai upar. Most common. Better air distribution. Discharge air fan se guzarti hai — zyada splash back kam.</li>
          <li style={S.li}><strong>Forced Draft:</strong> Fan bottom pe ya side pe — air push karta hai. Icing risk cold climates mein. Less common.</li>
        </ul>

        <h3 style={S.h3}>By Construction</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Factory-Assembled (Package):</strong> Factory mein complete unit banati hai, site pe install karo. Small to medium — up to 1000 TR. Quick installation. Common for data centers.</li>
          <li style={S.li}><strong>Field-Erected:</strong> Large cooling towers — site pe banaye jaate hain. High capacity. Hyperscale facilities mein.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>High efficiency:</strong> Evaporative cooling — air-cooled se 30-40% more efficient</li>
          <li style={S.li}><strong>Lower condenser water temperature:</strong> 28-32°C vs air-cooled 35-45°C — chiller better COP</li>
          <li style={S.li}><strong>Scalable:</strong> Multiple cell towers — load ke hisaab se cells operate karo</li>
          <li style={S.li}><strong>VFD energy savings:</strong> Variable fan speed = significant energy reduction</li>
          <li style={S.li}><strong>Wet bulb dependent:</strong> India mein humidity consider karo — but still better than air-cooled</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Water consumption:</strong> Evaporation + blowdown = significant water use</li>
          <li style={S.li}><strong>Legionella risk:</strong> Warm water environment — regular treatment mandatory</li>
          <li style={S.li}><strong>Water treatment cost:</strong> Chemicals, testing, management — ongoing cost</li>
          <li style={S.li}><strong>Scaling aur fouling:</strong> Minerals concentrate — scale deposits on fill aur heat exchangers</li>
          <li style={S.li}><strong>Maintenance complexity:</strong> Regular cleaning, basin, fill, drift eliminators</li>
          <li style={S.li}><strong>Wet bulb dependency:</strong> High humidity pe effectiveness reduce hoti hai</li>
          <li style={S.li}><strong>Freeze risk:</strong> Cold climates mein — winter mein special precautions</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Facility:</strong> 10 MW data center, Mumbai.</p>
        <p style={S.p}><strong>Chiller plant:</strong> 4 × 2500 kW water-cooled centrifugal chillers.</p>
        <p style={S.p}><strong>Cooling tower design:</strong> 4 cooling towers (one per chiller) × 3000 kW rejection capacity each. N+1 cells within each tower — modular design.</p>
        <p style={S.p}><strong>Condenser water:</strong> Supply 28°C (to chiller), Return 35°C (from chiller).</p>
        <p style={S.p}><strong>Water treatment:</strong> Automatic chemical dosing system. Weekly water quality testing. Legionella monitoring — monthly testing.</p>
        <p style={S.p}><strong>VFD fans:</strong> All towers with VFD — fan speed adjusts with load and ambient temperature. Estimated 40% fan energy savings vs fixed speed.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>High Condenser Water Temperature (CDWS High)</h3>
        <p style={S.p}>Cause: Fan failure, dirty fill, high ambient wet bulb, low water flow. Impact: High chiller condenser pressure → efficiency drop → potential trip. Action: Fan status check, fill inspect, flow verify.</p>

        <h3 style={S.h3}>Fan Motor Failure</h3>
        <p style={S.p}>Cause: Motor burnout, bearing failure, overload. Impact: Reduced cooling capacity — adjacent cell load increase. Action: Spare motor replace karo, load redistribute.</p>

        <h3 style={S.h3}>Basin Low Water Level</h3>
        <p style={S.p}>Cause: Makeup water failure, float valve stuck, excess blowdown. Impact: Pump cavitation, reduced flow. Action: Makeup water supply check, float valve inspect.</p>

        <h3 style={S.h3}>Scale Deposits on Fill</h3>
        <p style={S.p}>Cause: Poor water treatment, high TDS, insufficient blowdown. Impact: Reduced airflow through fill, poor heat transfer. Action: Chemical cleaning, blowdown increase, water treatment review.</p>

        <h3 style={S.h3}>Drift Eliminator Damage</h3>
        <p style={S.p}>Cause: Physical damage, UV degradation, improper cleaning. Impact: Water drift — Legionella risk, neighbor complaints, water waste. Action: Inspect visually, replace damaged sections.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <h3 style={S.h3}>Weekly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Water quality test — pH, TDS, hardness, inhibitor levels</li>
          <li style={S.li}>Chemical dosing check — levels adequate</li>
          <li style={S.li}>Basin visual inspect — debris, algae</li>
          <li style={S.li}>Fan operation check</li>
        </ul>

        <h3 style={S.h3}>Monthly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Full water quality analysis</li>
          <li style={S.li}>Legionella monitoring (culture test)</li>
          <li style={S.li}>Fan vibration check</li>
          <li style={S.li}>Basin clean karo</li>
          <li style={S.li}>Distribution system inspect karo — nozzles clog check</li>
          <li style={S.li}>Drift eliminator condition check</li>
        </ul>

        <h3 style={S.h3}>Annual</h3>
        <ul style={S.ul}>
          <li style={S.li}>Full tower shutdown aur cleaning</li>
          <li style={S.li}>Fill inspection — replace if fouled</li>
          <li style={S.li}>Basin complete clean</li>
          <li style={S.li}>Fan blade inspection</li>
          <li style={S.li}>Motor insulation test</li>
          <li style={S.li}>Thermal performance test — actual vs design capacity</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Inspection Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Condenser water supply temperature (target 28-32°C)</li>
          <li style={S.li}>✓ Condenser water return temperature (target 35-40°C)</li>
          <li style={S.li}>✓ All fan status — running, speed</li>
          <li style={S.li}>✓ Basin water level — adequate</li>
          <li style={S.li}>✓ Makeup water supply — working</li>
          <li style={S.li}>✓ Unusual noise ya vibration</li>
          <li style={S.li}>✓ Chemical dosing system — operating</li>
          <li style={S.li}>✓ BMS alarms</li>
          <li style={S.li}>✓ Visual: debris, bird nests, visible damage</li>
          <li style={S.li}>✓ Log entry karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Water quality test — pH, TDS, Langelier Saturation Index</li>
          <li style={S.li}>✓ Legionella culture test — lab se</li>
          <li style={S.li}>✓ Chemical stock check — adequate supply</li>
          <li style={S.li}>✓ Basin clean karo — sediment, algae</li>
          <li style={S.li}>✓ Fan vibration measurement</li>
          <li style={S.li}>✓ Distribution nozzles — clog check</li>
          <li style={S.li}>✓ Drift eliminator visual check</li>
          <li style={S.li}>✓ Blowdown rate verify karo</li>
          <li style={S.li}>✓ Makeup water meter reading</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Legionella prevention:</strong> Most critical. Proper biocide treatment, temperature management, regular testing. Deaths ho sakte hain agar neglect karo.</li>
          <li style={S.li}><strong>Working at height:</strong> Roof pe towers — full fall protection, anchor points, training</li>
          <li style={S.li}><strong>Rotating equipment:</strong> Fan blades — LOTO before any access near fans</li>
          <li style={S.li}><strong>Water hazard:</strong> Wet surfaces — slip hazard. Non-slip footwear.</li>
          <li style={S.li}><strong>Chemical handling:</strong> Biocide, acid — PPE mandatory, COSHH assessment</li>
          <li style={S.li}><strong>Electrical:</strong> Motor maintenance — LOTO mandatory</li>
          <li style={S.li}><strong>Confined space:</strong> Tower basin access — confined space permit</li>
          <li style={S.li}><strong>Noise:</strong> Fan noise — hearing protection near operating towers</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Cooling tower ka principle kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Evaporative cooling. Hot water fill media se trickle karta hai. Fan atmospheric air draw karta hai. Kuch paani evaporate hota hai — ye evaporation remaining water ki heat absorb karta hai. Result: thanda water return hota hai. Heat atmosphere mein chali jaati hai.</p>

        <h3 style={S.h3}>Q2: Condenser water loop aur chilled water loop alag kyun hote hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Chilled water loop = clean, treated, closed loop — CRAH mein jaata hai. Condenser water loop = open loop, cooling tower mein expose hota hai, atmosphere se contamination possible. Mixing hone se chilled water contaminated ho jaayega — CRAH coils foul honge, water quality degrade. Chiller dono ke beech heat exchanger ka kaam karta hai — mixing nahi hoti.</p>

        <h3 style={S.h3}>Q3: Legionella kya hai aur cooling tower mein kyon concern hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Legionella pneumophila ek bacteria hai jo Legionnaires' disease cause karta hai — serious respiratory illness. Cooling tower ka warm (25-45°C) standing water perfect breeding environment hai. Drift se infected water droplets atmosphere mein ja sakte hain — inhaling se infection. Prevention: regular biocide treatment, proper temperature control, regular cleaning, monthly Legionella testing.</p>

        <h3 style={S.h3}>Q4: Approach temperature kya hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Approach = Cooling tower leaving water temperature - Wet bulb temperature of ambient air. Smaller approach = better tower performance. Typical: 3-5°C. Wet bulb temperature se pehle nahi ja sakta (thermodynamic limit). High humidity = high wet bulb = limited cooling possible — ye cooling tower ki fundamental limitation hai.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>High condenser water temperature</h3>
        <ul style={S.ul}>
          <li style={S.li}>All fans running? Speed check karo</li>
          <li style={S.li}>Ambient wet bulb temperature high? → Design limit pe approach ho</li>
          <li style={S.li}>Fill fouled? → Inspect aur clean</li>
          <li style={S.li}>Water distribution blocked? → Nozzle check karo</li>
          <li style={S.li}>Additional tower cells start karo agar available</li>
        </ul>

        <h3 style={S.h3}>Legionella detected in test</h3>
        <ul style={S.ul}>
          <li style={S.li}>Immediately qualified water treatment company call karo</li>
          <li style={S.li}>Shock dose biocide — per treatment plan</li>
          <li style={S.li}>Tower temporarily isolate karo agar possible — alternative cooling</li>
          <li style={S.li}>Root cause: water temperature, low biocide, stagnant areas</li>
          <li style={S.li}>Retest before returning to service</li>
          <li style={S.li}>Regulatory reporting may be required</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Cooling Tower vs Air-Cooled Chiller</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Cooling Tower + Water-Cooled Chiller</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Air-Cooled Chiller (no tower)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Efficiency (COP)", "4-7+", "2.5-4.5"],
                ["Condenser temp", "28-32°C (wet bulb dependent)", "35-45°C (dry bulb dependent)"],
                ["Water use", "Yes — significant", "No"],
                ["Legionella risk", "Yes — manage it", "No"],
                ["Maintenance", "Complex (CT + chiller)", "Simpler (chiller only)"],
                ["Capital cost", "Higher (CT + chiller)", "Lower"],
                ["Operating cost", "Lower electricity", "Higher electricity"],
                ["Best for", "Large data centers (500+ kW)", "Small to medium, or water-scarce"],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(37,99,235,0.08)", fontWeight: j === 0 ? 500 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Legionella management plan:</strong> Written plan, regular testing, documented treatment — legal requirement bhi hai many regions mein.</li>
          <li style={S.li}><strong>VFD on all fans:</strong> 40-50% fan energy savings. ROI typically 2-3 years.</li>
          <li style={S.li}><strong>Water treatment partner:</strong> Specialist water treatment company engage karo — in-house se better expertise.</li>
          <li style={S.li}><strong>N+1 tower cells:</strong> Redundancy ensure karo — single cell failure data center cool rakhna chahiye.</li>
          <li style={S.li}><strong>Cycles of concentration optimization:</strong> Higher cycles = less water waste. But monitor TDS carefully.</li>
          <li style={S.li}><strong>Drift eliminator maintenance:</strong> Regular inspect, replace before failure. Drift = water loss + Legionella risk.</li>
          <li style={S.li}><strong>Basin sweep aur clean:</strong> Sediment accumulates — breeding ground for bacteria. Regular cleaning essential.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Cooling tower chiller plant ka heat rejection component hai — evaporative cooling se heat atmosphere mein jaati hai.",
          "Evaporation principle: kuch paani evaporate hota hai → remaining water thanda hota hai → heat bahar.",
          "Condenser water loop aur chilled water loop SEPARATE hote hain — chiller dono ke beech heat exchanger hai.",
          "Cooling tower + water-cooled chiller = high efficiency (COP 4-7+). Air-cooled se 30-40% better.",
          "Legionella risk real hai — regular biocide treatment, testing, cleaning mandatory. Seriously lo.",
          "Key temperatures: CDW supply 28-32°C (to chiller), CDW return 35-40°C (from chiller).",
          "Daily: CDW temps, fan status, basin level. Weekly: water quality. Monthly: Legionella testing.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Cooling tower samajh aaya. Aage cooling chain complete karo:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — Cooling tower ka partner — chilled water generation.</li>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — Alternative to chiller system — smaller data centers.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Hot/cold aisle management — CRAH effectiveness improve.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — Cool air delivery strategies.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Cooling effectiveness measurement.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
