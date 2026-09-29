import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Cooling Tower in Data Centers — Complete Guide | Behind The Tech",
  description: "What is a cooling tower, how does it work, how is it connected to the chiller in a Data Center — evaporative cooling, types, maintenance and safety guide.",
  keywords: ["cooling tower data center", "cooling tower chiller", "evaporative cooling data center", "cooling tower maintenance"],
  openGraph: { title: "Cooling Tower in Data Centers", description: "Cooling tower — the heat rejection component of the chiller plant. Complete guide.", url: "https://behindthetech.in/learn/non-it/cooling/cooling-tower", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Cooling Tower Explained — Behind The Tech", description: "Cooling tower — the heat rejection system of the Data Center chiller. Complete guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/cooling-tower",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/cooling-tower",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/cooling-tower",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/cooling-tower",
    },
  },
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
    { label: "In one line", text: "A cooling tower is a heat rejection device that releases the chiller's condenser heat into the atmosphere — using evaporative cooling." },
    { label: "Where it is installed", text: "On the building roof or at ground level (outside). Connected to the chiller's condenser water loop. It is outside the data center." },
    { label: "How it works", text: "Hot condenser water (35-40°C) comes into the tower. It trickles through the fill media. Fans draw air. Some water evaporates — this evaporation absorbs heat. Cold water (28-32°C) goes back to the chiller." },
    { label: "Connection to the chiller", text: "Chiller → hot water from the condenser → cooling tower (heat reject) → cold water → chiller condenser. This is the condenser water loop. The chilled water loop is separate — they do not mix." },
    { label: "Water requirement", text: "Evaporation causes water loss — makeup water is needed. A typical data center cooling tower uses lakhs of litres of water per month. Water treatment is essential." },
    { label: "Legionella risk", text: "Legionella bacteria can grow in warm stagnant water. Regular biocide treatment, temperature management and proper cleaning are essential. This is a health hazard — take it seriously." },
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
      <div style={{ height: 2, background: "#ffa500" }} /> <div style={{ background: "rgba(255,165,0,0.04)", border: "1px solid rgba(255,165,0,0.16)", borderTop: "none", padding: "16px 20px 18px" }}> <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer's Tip</span> <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
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
  { q: "Is a cooling tower used only with a chiller?", a: "It is standard with a water-cooled chiller. But a cooling tower can also be used standalone — for direct heat rejection. In data centers it is typically used with a chiller. Condenser water loop — between the chiller condenser and the cooling tower." },
  { q: "How much water does a cooling tower use?", a: "Evaporation (typically 1-2% of circulation rate), blowdown (2-3% — to remove concentrated minerals), and drift (< 0.001% in modern towers). A large data center cooling tower uses lakhs of litres of water per month. Water conservation is important." },
  { q: "What is approach temperature?", a: "Approach = Cooling tower outlet water temperature - Wet bulb temperature. Smaller approach = better cooling tower performance. Typical design: 3-5°C approach. Wet bulb temperature depends on outdoor humidity." },
  { q: "What is Legionella and why is it a problem in a cooling tower?", a: "Legionella pneumophila is a bacteria that causes Legionnaires' disease (serious pneumonia). The warm, humid environment of a cooling tower is a perfect breeding ground. Prevention: regular biocide dosing, proper temperature management (60°C+ or 20°C-), regular cleaning." },
  { q: "How is cooling tower fan speed controlled?", a: "Fan speed is varied with a VFD (Variable Frequency Drive) — according to load and ambient conditions. Cold weather = slower fans, low load = slower fans. 50%+ energy saving is possible with a VFD vs fixed speed." },
  { q: "How is cooling tower capacity sized?", a: "Based on the chiller condenser heat rejection (in kW). Rule of thumb: Cooling tower capacity = 1.25 × chiller cooling capacity (approx). Proper sizing is based on meteorological data — local wet bulb temperature, ambient conditions." },
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
      <ArticleLayout slug="cooling-tower" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/cooling/cooling-tower">

        <p style={S.p}>The chiller absorbs the data center's heat. But this heat has to go somewhere — permanently outside.</p>
        <p style={S.p}>How does the chiller remove this heat? Through the cooling tower.</p>
        <p style={S.p}><strong>Cooling tower = the chiller's heat dumping station.</strong></p>
        <p style={S.p}>It is a simple device — but without it a water-cooled chiller plant cannot run.</p>
        <p style={S.p}>And without a cooling tower, a large data center's cooling will fail.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/cooling-tower/cooling-tower-data-center.png" alt="Cooling towers on roof of data center building" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Cooling towers — typically on the data center building's roof or on the ground outside. These towers reject heat into the atmosphere.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-cooling-tower" style={S.h1}>What Is a Cooling Tower?</h2>

        <p style={S.p}><strong>A cooling tower is a heat rejection device.</strong></p>
        <p style={S.p}>It cools hot water — through the evaporative cooling process — and releases the heat into the atmosphere.</p>
        <p style={S.p}><em>Daily life analogy:</em> In summer you sweat. The sweat evaporates. You feel cool. Same principle — in a cooling tower water evaporates and heat goes out.</p>
        <p style={S.p}>In a data center the cooling tower works specifically with the <strong>chiller plant</strong>.</p>
        <p style={S.p}>The chiller's condenser side gets hot — when the refrigerant rejects heat. This heat has to be removed somewhere. The cooling tower does this job.</p>

        <DCMapNote components={["Cooling Tower", "Chiller", "Condenser Water Pumps", "Cooling Tower Basin", "Makeup Water"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Cooling Tower Needed?</h2>

        <p style={S.p}>In the chiller refrigeration cycle, heat is transferred at two places:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Evaporator side:</strong> Heat is absorbed from the chilled water → the data center gets cooled ✓</li>
          <li style={S.li}><strong>Condenser side:</strong> This heat has to be rejected somewhere → COOLING TOWER ✓</li>
        </ul>
        <p style={S.p}>If the condenser side heat is not rejected, the chiller will be overloaded. High pressure trip. Cooling stops.</p>
        <p style={S.p}><strong>Energy balance: The heat the cooling tower has to reject = the data center's IT heat + the chiller's own power consumption.</strong></p>
        <p style={S.p}>Example: 1000 kW data center heat + 200 kW chiller power = 1200 kW the cooling tower has to reject.</p>

        <WhyThisMatters>
          The water-cooled chiller + cooling tower combination achieves a COP of 4-7 in data center cooling. An air-cooled chiller's COP is 2.5-4. This means: using a cooling tower takes 30-40% less electricity for the same cooling. In a large data center this can be monthly savings of lakhs of rupees.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}><strong>Evaporative cooling</strong> — this is the core principle of the cooling tower.</p>
        <p style={S.p}>Simple experiment: Put water on a cloth. The water evaporates. The cloth becomes cool.</p>
        <p style={S.p}>Why? Evaporation needs energy — this energy comes from the heat of the surrounding water. Result: the water becomes cool.</p>

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
        <p style={S.p}><strong>Step 1 — Hot water in:</strong> Hot water (35-40°C) from the chiller condenser enters the cooling tower. The distribution header distributes this water evenly.</p>
        <p style={S.p}><strong>Step 2 — Fill media:</strong> The hot water trickles over the fill media (packing/fill — structured sheets of plastic or wood). The fill maximizes surface area — more surface = more evaporation.</p>
        <p style={S.p}><strong>Step 3 — Airflow:</strong> The cooling tower fan draws atmospheric air. The air passes through the fill media — it comes into contact with the water.</p>
        <p style={S.p}><strong>Step 4 — Evaporation:</strong> Some water (1-2%) evaporates. This evaporation absorbs the heat of the remaining water. Result: the remaining water becomes cool.</p>
        <p style={S.p}><strong>Step 5 — Cold water:</strong> Cool water (28-32°C) collects in the basin. Condenser water pumps pump this cold water to the chiller's condenser. Cycle repeats.</p>

        <InsightCard>
          Understand this important point: the chilled water loop (blue) and the condenser water loop (red/yellow) are SEPARATE. They never mix. The chiller works as a heat exchanger between them. Chilled water goes only to the CRAH. Condenser water circulates only in the cooling tower and the chiller condenser.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Fill Media (Packing)</h3>
        <p style={S.p}>For distributing water — it maximizes surface area. Structured sheets of PVC plastic or treated wood. Counter-flow fill: water down, air up. Cross-flow fill: water down, air horizontal.</p>

        <h3 style={S.h3}>2. Fan</h3>
        <p style={S.p}>It draws air into the tower. Axial (propeller type) or centrifugal. VFD controlled — vary the speed, save energy. Induced draft (fan on top) or forced draft (fan at the bottom).</p>

        <h3 style={S.h3}>3. Drift Eliminators</h3>
        <p style={S.p}>It stops water droplets from going out with the air. Drift = treated water that goes into the atmosphere. In modern towers the drift rate is {'<'} 0.001% — it reduces Legionella risk. This is an important health protection component.</p>

        <h3 style={S.h3}>4. Water Distribution System</h3>
        <p style={S.p}>From the hot water inlet to the header. Nozzles or gravity distribution — distributes water evenly over the fill media. Proper distribution = even cooling = efficient operation.</p>

        <h3 style={S.h3}>5. Basin</h3>
        <p style={S.p}>The bottom section of the tower. Cool water collects here. Float valve — controls the water level. Makeup water supply — the water lost to evaporation is supplied here. Blowdown outlet — to remove concentrated minerals.</p>

        <h3 style={S.h3}>6. Makeup Water System</h3>
        <p style={S.p}>It compensates for the water lost to evaporation. Float valve based automatic control. Treated water — controlling minerals is essential.</p>

        <h3 style={S.h3}>7. Chemical Dosing System</h3>
        <p style={S.p}>Scale inhibitor, corrosion inhibitor, biocide, pH control — dosed regularly. This is the most important maintenance item — also for Legionella prevention.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Cooling Tower Works in a Data Center</h2>

        <p style={S.p}>Understand the full loop:</p>

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
        <p style={S.p}>The cooling tower is the final heat rejection point. Without a cooling tower, where will the heat go? Nowhere — the system will fail.</p>

        <EngineerTip>
          Remember the condenser water temperatures: Supply to chiller (CDWS) = 28-32°C, Return from chiller (CDWR) = 35-40°C. Delta T = 5-8°C. If the CDW temperature is higher, chiller efficiency drops and condenser pressure goes high. The cooling tower must work properly — chiller performance depends on it directly.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Cooling Towers</h2>

        <h3 style={S.h3}>By Airflow Direction</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Counter-Flow:</strong> Air flows up, water down. Maximum contact — efficient. Compact design. Most common in data centers.</li>
          <li style={S.li}><strong>Cross-Flow:</strong> Air flows horizontally. Water down. Larger footprint. Easier maintenance — better fill access. Some large installations.</li>
        </ul>

        <h3 style={S.h3}>By Fan Type</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Induced Draft:</strong> Fan on top — pulls air upward. Most common. Better air distribution. Discharge air passes through the fan — less splash back.</li>
          <li style={S.li}><strong>Forced Draft:</strong> Fan at the bottom or side — pushes air. Icing risk in cold climates. Less common.</li>
        </ul>

        <h3 style={S.h3}>By Construction</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Factory-Assembled (Package):</strong> The complete unit is built in the factory; install it on site. Small to medium — up to 1000 TR. Quick installation. Common for data centers.</li>
          <li style={S.li}><strong>Field-Erected:</strong> Large cooling towers — built on site. High capacity. In hyperscale facilities.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>High efficiency:</strong> Evaporative cooling — 30-40% more efficient than air-cooled</li>
          <li style={S.li}><strong>Lower condenser water temperature:</strong> 28-32°C vs air-cooled 35-45°C — chiller better COP</li>
          <li style={S.li}><strong>Scalable:</strong> Multiple cell towers — operate cells according to load</li>
          <li style={S.li}><strong>VFD energy savings:</strong> Variable fan speed = significant energy reduction</li>
          <li style={S.li}><strong>Wet bulb dependent:</strong> Consider humidity in India — but still better than air-cooled</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Water consumption:</strong> Evaporation + blowdown = significant water use</li>
          <li style={S.li}><strong>Legionella risk:</strong> Warm water environment — regular treatment mandatory</li>
          <li style={S.li}><strong>Water treatment cost:</strong> Chemicals, testing, management — ongoing cost</li>
          <li style={S.li}><strong>Scaling and fouling:</strong> Minerals concentrate — scale deposits on the fill and heat exchangers</li>
          <li style={S.li}><strong>Maintenance complexity:</strong> Regular cleaning, basin, fill, drift eliminators</li>
          <li style={S.li}><strong>Wet bulb dependency:</strong> Effectiveness reduces at high humidity</li>
          <li style={S.li}><strong>Freeze risk:</strong> In cold climates — special precautions in winter</li>
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
        <p style={S.p}>Cause: Motor burnout, bearing failure, overload. Impact: Reduced cooling capacity — adjacent cell load increases. Action: Replace with a spare motor, redistribute the load.</p>

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
          <li style={S.li}>Clean the basin</li>
          <li style={S.li}>Inspect the distribution system — check for clogged nozzles</li>
          <li style={S.li}>Drift eliminator condition check</li>
        </ul>

        <h3 style={S.h3}>Annual</h3>
        <ul style={S.ul}>
          <li style={S.li}>Full tower shutdown and cleaning</li>
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
          <li style={S.li}>✓ Unusual noise or vibration</li>
          <li style={S.li}>✓ Chemical dosing system — operating</li>
          <li style={S.li}>✓ BMS alarms</li>
          <li style={S.li}>✓ Visual: debris, bird nests, visible damage</li>
          <li style={S.li}>✓ Make a log entry</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Water quality test — pH, TDS, Langelier Saturation Index</li>
          <li style={S.li}>✓ Legionella culture test — from a lab</li>
          <li style={S.li}>✓ Chemical stock check — adequate supply</li>
          <li style={S.li}>✓ Clean the basin — sediment, algae</li>
          <li style={S.li}>✓ Fan vibration measurement</li>
          <li style={S.li}>✓ Distribution nozzles — clog check</li>
          <li style={S.li}>✓ Drift eliminator visual check</li>
          <li style={S.li}>✓ Verify the blowdown rate</li>
          <li style={S.li}>✓ Makeup water meter reading</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Legionella prevention:</strong> Most critical. Proper biocide treatment, temperature management, regular testing. Deaths can happen if it is neglected.</li>
          <li style={S.li}><strong>Working at height:</strong> Towers on the roof — full fall protection, anchor points, training</li>
          <li style={S.li}><strong>Rotating equipment:</strong> Fan blades — LOTO before any access near fans</li>
          <li style={S.li}><strong>Water hazard:</strong> Wet surfaces — slip hazard. Non-slip footwear.</li>
          <li style={S.li}><strong>Chemical handling:</strong> Biocide, acid — PPE mandatory, COSHH assessment</li>
          <li style={S.li}><strong>Electrical:</strong> Motor maintenance — LOTO mandatory</li>
          <li style={S.li}><strong>Confined space:</strong> Tower basin access — confined space permit</li>
          <li style={S.li}><strong>Noise:</strong> Fan noise — hearing protection near operating towers</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the principle of a cooling tower?</h3>
        <p style={S.p}><strong>Answer:</strong> Evaporative cooling. Hot water trickles through the fill media. The fan draws atmospheric air. Some water evaporates — this evaporation absorbs the heat of the remaining water. Result: cold water returns. The heat goes into the atmosphere.</p>

        <h3 style={S.h3}>Q2: Why are the condenser water loop and the chilled water loop separate?</h3>
        <p style={S.p}><strong>Answer:</strong> Chilled water loop = clean, treated, closed loop — it goes to the CRAH. Condenser water loop = open loop, exposed in the cooling tower, contamination from the atmosphere is possible. If they mix, the chilled water will be contaminated — CRAH coils will foul and water quality will degrade. The chiller works as a heat exchanger between the two — there is no mixing.</p>

        <h3 style={S.h3}>Q3: What is Legionella and why is it a concern in a cooling tower?</h3>
        <p style={S.p}><strong>Answer:</strong> Legionella pneumophila is a bacteria that causes Legionnaires' disease — a serious respiratory illness. The warm (25-45°C) standing water of a cooling tower is a perfect breeding environment. Infected water droplets can go into the atmosphere through drift — inhaling them causes infection. Prevention: regular biocide treatment, proper temperature control, regular cleaning, monthly Legionella testing.</p>

        <h3 style={S.h3}>Q4: What is approach temperature?</h3>
        <p style={S.p}><strong>Answer:</strong> Approach = Cooling tower leaving water temperature - Wet bulb temperature of ambient air. Smaller approach = better tower performance. Typical: 3-5°C. It cannot go below the wet bulb temperature (thermodynamic limit). High humidity = high wet bulb = limited cooling possible — this is the fundamental limitation of a cooling tower.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>High condenser water temperature</h3>
        <ul style={S.ul}>
          <li style={S.li}>All fans running? Check the speed</li>
          <li style={S.li}>Ambient wet bulb temperature high? → The approach may be at the design limit</li>
          <li style={S.li}>Fill fouled? → Inspect and clean</li>
          <li style={S.li}>Water distribution blocked? → Check the nozzles</li>
          <li style={S.li}>Start additional tower cells if available</li>
        </ul>

        <h3 style={S.h3}>Legionella detected in test</h3>
        <ul style={S.ul}>
          <li style={S.li}>Immediately call a qualified water treatment company</li>
          <li style={S.li}>Shock dose biocide — per treatment plan</li>
          <li style={S.li}>Temporarily isolate the tower if possible — alternative cooling</li>
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
          <li style={S.li}><strong>Legionella management plan:</strong> Written plan, regular testing, documented treatment — it is also a legal requirement in many regions.</li>
          <li style={S.li}><strong>VFD on all fans:</strong> 40-50% fan energy savings. ROI typically 2-3 years.</li>
          <li style={S.li}><strong>Water treatment partner:</strong> Engage a specialist water treatment company — better expertise than in-house.</li>
          <li style={S.li}><strong>N+1 tower cells:</strong> Ensure redundancy — a single cell failure should still keep the data center cool.</li>
          <li style={S.li}><strong>Cycles of concentration optimization:</strong> Higher cycles = less water waste. But monitor TDS carefully.</li>
          <li style={S.li}><strong>Drift eliminator maintenance:</strong> Regular inspect, replace before failure. Drift = water loss + Legionella risk.</li>
          <li style={S.li}><strong>Basin sweep and clean:</strong> Sediment accumulates — a breeding ground for bacteria. Regular cleaning is essential.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "The cooling tower is the heat rejection component of the chiller plant — heat goes into the atmosphere through evaporative cooling.",
          "Evaporation principle: some water evaporates → the remaining water becomes cool → heat goes out.",
          "The condenser water loop and the chilled water loop are SEPARATE — the chiller is the heat exchanger between them.",
          "Cooling tower + water-cooled chiller = high efficiency (COP 4-7+). 30-40% better than air-cooled.",
          "Legionella risk is real — regular biocide treatment, testing and cleaning are mandatory. Take it seriously.",
          "Key temperatures: CDW supply 28-32°C (to chiller), CDW return 35-40°C (from chiller).",
          "Daily: CDW temps, fan status, basin level. Weekly: water quality. Monthly: Legionella testing.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>You understand the cooling tower. Next, complete the cooling chain:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — the cooling tower's partner — chilled water generation.</li>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — Alternative to chiller system — smaller data centers.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Hot/cold aisle management — CRAH effectiveness improve.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — Cool air delivery strategies.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Cooling effectiveness measurement.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
