import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "CRAC — Computer Room Air Conditioner in Data Centers | Behind The Tech",
  description: "What is a CRAC, how is it different from a PAC, how does it work — refrigeration cycle, components, types, maintenance and troubleshooting. In simple language.",
  keywords: ["crac data center", "computer room air conditioner", "crac vs crah", "crac unit cooling", "data center cooling"],
  openGraph: {
    title: "CRAC — Computer Room Air Conditioner in Data Centers",
    description: "How a CRAC unit works and how it is different from a PAC — a complete guide to Data Center cooling.",
    url: "https://behindthetech.in/learn/non-it/cooling/crac",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: { card: "summary_large_image", title: "CRAC Explained — Behind The Tech", description: "Computer Room Air Conditioner — Data Center cooling unit, complete guide." },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/crac",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/crac",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/crac",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/crac",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-crac",       text: "What Is a CRAC?",                    level: 2 },
  { id: "why-needed",         text: "Why Is CRAC Needed?",                level: 2 },
  { id: "working-principle",  text: "Working Principle",                  level: 2 },
  { id: "main-components",    text: "Main Components",                    level: 2 },
  { id: "how-it-works-in-dc", text: "How CRAC Works Inside a Data Center",level: 2 },
  { id: "types",              text: "Types of CRAC",                      level: 2 },
  { id: "advantages",         text: "Advantages",                         level: 2 },
  { id: "disadvantages",      text: "Disadvantages",                      level: 2 },
  { id: "real-example",       text: "Real Data Center Example",           level: 2 },
  { id: "common-faults",      text: "Common Faults",                      level: 2 },
  { id: "preventive-maintenance", text: "Preventive Maintenance",         level: 2 },
  { id: "daily-checklist",    text: "Daily Inspection Checklist",         level: 2 },
  { id: "monthly-checklist",  text: "Monthly Checklist",                  level: 2 },
  { id: "safety",             text: "Safety Precautions",                 level: 2 },
  { id: "interview-questions",text: "Interview Questions",                level: 2 },
  { id: "troubleshooting",    text: "Troubleshooting Guide",              level: 2 },
  { id: "comparison",         text: "CRAC vs PAC vs CRAH",                level: 2 },
  { id: "best-practices",     text: "Best Practices",                     level: 2 },
  { id: "key-takeaways",      text: "Key Takeaways",                      level: 2 },
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
    { label: "In one line", text: "A CRAC is a self-contained cooling unit — it has its own compressor, pulls warm air in and pushes cool air out." },
    { label: "Difference from PAC", text: "CRAC and PAC are both self-contained units. Technical difference: a CRAC typically uses direct expansion (DX) cooling with an external condenser. Practically, the two terms are often used interchangeably in the industry." },
    { label: "Difference from CRAH", text: "CRAH = Computer Room Air Handler. A CRAH has no compressor — it uses chilled water. A CRAC has its own compressor. This is the basic difference." },
    { label: "Where it is used", text: "Small to medium data centers, server rooms, telecom rooms. Wherever there is no chiller plant and self-contained cooling is needed." },
    { label: "How it works", text: "DX (Direct Expansion) refrigeration cycle — the refrigerant expands directly in the evaporator and cools the air. Compressor, condenser (outside), evaporator — these are the three main components." },
    { label: "Where the condenser is", text: "In an air-cooled CRAC the condenser is outside the building — on a wall or on the roof. In a water-cooled one the condenser is connected to the chiller's chilled water loop." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>🌬️ QUICK SUMMARY — 2 MINUTE READ</span>
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
  { q: "What is the difference between CRAC and CRAH?", a: "CRAC = Computer Room Air Conditioner — has its own compressor, uses DX cooling. CRAH = Computer Room Air Handler — has no compressor, uses chilled water. A CRAC is self-contained. A CRAH needs chilled water from outside (from a chiller)." },
  { q: "What is the difference between CRAC and PAC?", a: "In the industry the two terms are often used interchangeably. Technical distinction: a PAC typically has more precise control with an integrated all-in-one design; a CRAC often has a separate outdoor condenser unit. Practically, the same function — Data Center cooling." },
  { q: "How is the cooling capacity of a CRAC unit measured?", a: "In kW or BTU/hr. 1 kW = 3412 BTU/hr. Typical CRAC units: 10 kW to 100+ kW. For proper sizing, calculate the IT load plus a 20% buffer." },
  { q: "Where is the outdoor condenser installed in an air-cooled CRAC?", a: "Outside the building — on a wall or on the roof. Condenser fans reject heat into the outdoor air. If the ambient temperature is high, efficiency drops (called 'derating')." },
  { q: "What does DX mean in a CRAC?", a: "DX = Direct Expansion. The refrigerant expands directly in the evaporator and cools the air. No intermediate water loop. Direct means direct heat transfer between the refrigerant and the air (through the coil)." },
  { q: "What is the life expectancy of a CRAC unit?", a: "15-20 years is typical — if there is proper maintenance. The compressor is usually the weakest component — 10-15 years. Regular PM extends the life." },
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

export default function CRACPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="crac" headings={HEADINGS} readingTimeMinutes={16} lang="en" alternateHref="/hi/learn/non-it/cooling/crac">

        <p style={S.p}>Imagine a 500 sqm server room. Thousands of servers. Round-the-clock operation.</p>
        <p style={S.p}>All the servers are generating heat. This heat has to go somewhere.</p>
        <p style={S.p}>We read about the <strong>PAC</strong>. A CRAC also solves the same problem — with a slightly different approach.</p>
        <p style={S.p}>CRAC = <strong>Computer Room Air Conditioner.</strong></p>
        <p style={S.p}>The name itself tells you everything — an air conditioner made specifically for computer rooms (data centers).</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/crac/crac-unit-server-room.png" alt="CRAC unit installed in a data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>CRAC unit — floor-mounted, typically 0.5m to 1m wide, 1.8m tall. It is installed inside the server room alongside the racks.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-crac" style={S.h1}>What Is a CRAC?</h2>

        <p style={S.p}><strong>CRAC = Computer Room Air Conditioner.</strong></p>
        <p style={S.p}>It is a specialized, self-contained cooling unit designed for Data Centers and Computer Rooms.</p>
        <p style={S.p}>"Self-contained" means — its refrigeration system is within itself. The compressor is inside it or in a directly connected external unit.</p>
        <p style={S.p}>The job of a CRAC is simple:</p>
        <ul style={S.ul}>
          <li style={S.li}>Pull warm air from the server racks</li>
          <li style={S.li}>Cool it with the refrigeration cycle</li>
          <li style={S.li}>Send the cool air back into the room</li>
          <li style={S.li}>Repeat — 24×7</li>
        </ul>

        <InsightCard>
          There is a lot of confusion in the industry about CRAC and PAC. Technically, both use DX (Direct Expansion) cooling. Practically, the external condenser of a CRAC is usually more visible — on a wall or on the roof. In a PAC an all-in-one or close-coupled design is more common. But both are basically the same technology — same goal, similar operation.
        </InsightCard>

        <DCMapNote components={["CRAC", "PAC", "CRAH", "Server Racks", "Condenser Unit (Outdoor)"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is CRAC Needed?</h2>

        <p style={S.p}>Servers do not waste electricity — they use electricity for computation.</p>
        <p style={S.p}>But every watt of electricity a server consumes is eventually converted into heat.</p>
        <p style={S.p}>This is a law of physics — there is no escape.</p>
        <p style={S.p}><strong>Example:</strong> A 1000W server = generates 1000W of heat.</p>
        <p style={S.p}>20 racks × 10 kW average = 200 kW of heat. That is enough heat to warm a small house.</p>

        <WhyThisMatters>
          According to ASHRAE thermal guidelines, server inlet temperature should be 18°C to 27°C (A1 class equipment). If this range is exceeded, servers throttle performance, generate errors, and a thermal shutdown can happen. The CRAC maintains this temperature range — no matter what the IT load is, no matter what the time of day.
        </WhyThisMatters>

        <p style={S.p}><strong>Why specifically a CRAC — why not a normal AC?</strong></p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Continuous operation:</strong> A CRAC is rated to run 24×7×365</li>
          <li style={S.li}><strong>High sensible heat ratio:</strong> Servers only raise temperature (not moisture) — a CRAC is optimized for this</li>
          <li style={S.li}><strong>Precise control:</strong> ±1°C temperature and ±5% humidity precision</li>
          <li style={S.li}><strong>High capacity per unit:</strong> 15-100+ kW per unit — a normal AC is 1-5 kW</li>
          <li style={S.li}><strong>BMS integration:</strong> Centralized monitoring and alarm management</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>A CRAC uses the <strong>DX (Direct Expansion) refrigeration cycle</strong>.</p>
        <p style={S.p}>"Direct Expansion" means the refrigerant expands directly in the evaporator coil.</p>
        <p style={S.p}>There is no intermediate water loop — the refrigerant transfers heat directly with the air.</p>

        <FlowDiagram
          caption="DX refrigeration cycle in CRAC unit"
          steps={[
            { icon: "❄️", label: "Evaporator", sublabel: "Indoor coil, air cool" },
            { icon: "⚙️", label: "Compressor", sublabel: "Gas compress" },
            { icon: "🌡️", label: "Condenser", sublabel: "Outdoor/external" },
            { icon: "🔧", label: "Expansion Valve", sublabel: "Pressure drop" },
            { icon: "🔄", label: "Cycle Repeats", sublabel: "Continuous" },
          ]}
        />

        <h3 style={S.h3}>DX Cycle Step by Step</h3>
        <p style={S.p}><strong>Step 1 — Evaporator (inside, in the room):</strong> Low pressure liquid refrigerant comes into the evaporator coil. Warm air from the servers passes over this coil. The refrigerant absorbs the heat and turns into gas. The air gets cooled.</p>
        <p style={S.p}><strong>Step 2 — Compressor:</strong> The low pressure refrigerant gas goes into the compressor. It is compressed to high pressure. Its temperature also rises.</p>
        <p style={S.p}><strong>Step 3 — Condenser (outside, outside the building):</strong> The hot high-pressure gas goes into the outdoor condenser unit. Outdoor fans reject the heat into the ambient air. The gas turns into liquid. This heat effectively goes outside.</p>
        <p style={S.p}><strong>Step 4 — Expansion Valve:</strong> The high pressure liquid passes through the expansion valve. The pressure drops suddenly. The refrigerant becomes cold. Then into the evaporator — cycle complete.</p>

        <EngineerTip>
          Understand this fundamental difference between a DX system and a chilled water system: in DX, the refrigerant cools the air directly. In a chilled water system, the refrigerant first cools water, then that cool water cools the air in the CRAH. DX is simpler but has limited capacity. A chilled water system is complex but better for centralized cooling — that is why large data centers use chillers.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>Indoor Unit</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Evaporator Coil:</strong> Air is cooled by the refrigerant here. Copper tubes + aluminum fins.</li>
          <li style={S.li}><strong>Blower / Fan:</strong> Pulls and circulates the air. EC motors in modern units.</li>
          <li style={S.li}><strong>Air Filter:</strong> Stops dust particles — protects the coil.</li>
          <li style={S.li}><strong>Humidifier:</strong> Steam or electrode type — adds humidity when required.</li>
          <li style={S.li}><strong>Electric Heater:</strong> Maintains temperature in cold weather.</li>
          <li style={S.li}><strong>Microprocessor Controller:</strong> Temperature, humidity, alarms — controls everything.</li>
          <li style={S.li}><strong>Condensate Pan + Drain:</strong> The water that comes out from dehumidification collects here.</li>
        </ul>

        <h3 style={S.h3}>Outdoor Unit (Condenser)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Compressor:</strong> The heart of the refrigeration cycle — scroll or reciprocating type.</li>
          <li style={S.li}><strong>Condenser Coil:</strong> Heat is rejected from the high pressure refrigerant gas.</li>
          <li style={S.li}><strong>Condenser Fans:</strong> Reject heat into the outdoor air. Speed-controlled in modern units.</li>
          <li style={S.li}><strong>Refrigerant Pipework:</strong> Connects the indoor and outdoor units — insulated copper pipes.</li>
          <li style={S.li}><strong>Sight Glass:</strong> Visual check of refrigerant level and quality.</li>
          <li style={S.li}><strong>Service Valves:</strong> Valves to isolate the refrigerant for maintenance.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How CRAC Works Inside a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/crac/crac-airflow-data-center.png" alt="CRAC unit airflow pattern in data center with hot and cold aisles" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>CRAC unit airflow — return air in from the top, supply air from the bottom (through the raised floor via perforated tiles) or directly from the front.</figcaption>
        </figure>

        <p style={S.p}>A CRAC unit is installed on the floor in the server room — typically at the end of the server racks or near a wall of the room.</p>

        <h3 style={S.h3}>Downflow CRAC (Most Common)</h3>
        <p style={S.p}>Warm return air comes in from the top of the unit. It is cooled by the evaporator coil. Cool supply air goes down — into the raised floor. It comes into the cold aisle through perforated floor tiles. Servers pull in the cool air. Warm exhaust air goes into the hot aisle — then returns to the CRAC. Cycle complete.</p>

        <h3 style={S.h3}>Upflow CRAC (No Raised Floor)</h3>
        <p style={S.p}>Warm return air enters from the bottom. Cool supply air comes out from the top. It is distributed at ceiling level or through overhead ducts. There is more mixing before it reaches the servers — slightly less efficient.</p>

        <InsightCard>
          CRAC unit placement is critical in a Data Center. Rule of thumb: one CRAC unit for every 5-7 racks. Distribute the units evenly in the room — do not put them in corners or on walls — cooling will stay uniform. Hot spots come only when cooling units are maldistributed.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of CRAC</h2>

        <h3 style={S.h3}>1. Air-Cooled CRAC</h3>
        <p style={S.p}>The condenser rejects heat into the outdoor air. The external condenser unit is installed outside the building. The most common type. Simpler installation — no water supply needed. Efficiency drops at high ambient temperature.</p>

        <h3 style={S.h3}>2. Water-Cooled CRAC</h3>
        <p style={S.p}>The condenser rejects heat into cooling water. Supply comes from a water chiller or cooling tower. Better efficiency than air-cooled — independent of ambient temperature. Water infrastructure is necessary.</p>

        <h3 style={S.h3}>3. Glycol-Cooled CRAC</h3>
        <p style={S.p}>A water-cooled variant — uses a glycol-water mixture. For freeze protection — in cold climates. A dry cooler (fluid cooler) is installed outside — no evaporation, no refrigerant in the outdoor unit.</p>

        <h3 style={S.h3}>4. Chilled Water CRAC (CRAH)</h3>
        <p style={S.p}>Technically this becomes a CRAH (Air Handler) when chilled water is used. No compressor inside the unit. Just fan + water coil. The chiller system provides the chilled water. Large data centers prefer this for scalability.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Self-contained DX system:</strong> No chiller plant needed — simpler infrastructure</li>
          <li style={S.li}><strong>Quick deployment:</strong> Install, charge refrigerant, commissioning — ready</li>
          <li style={S.li}><strong>Precision cooling:</strong> Precise control of temperature and humidity</li>
          <li style={S.li}><strong>Continuous duty rated:</strong> 24×7×365 operation</li>
          <li style={S.li}><strong>Modular:</strong> Add units as load increases</li>
          <li style={S.li}><strong>N+1 redundancy:</strong> Easy to achieve</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>External condenser:</strong> A unit is needed outside the building — site constraints</li>
          <li style={S.li}><strong>Ambient dependency:</strong> Cooling capacity reduces at high outdoor temperature</li>
          <li style={S.li}><strong>Limited scalability:</strong> For very large data centers a chiller plant is more efficient</li>
          <li style={S.li}><strong>Compressor maintenance:</strong> Moving parts — wear and tear, eventually replacement</li>
          <li style={S.li}><strong>Refrigerant leak risk:</strong> Leaks are possible at piping connections</li>
          <li style={S.li}><strong>Noise:</strong> The compressor and condenser fans generate noise</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Setup:</strong> A telecom company's 300 sqm server room. 30 racks, average 8 kW per rack = 240 kW total heat load.</p>
        <p style={S.p}><strong>Cooling design:</strong> Air-cooled CRAC, 30 kW capacity per unit. 9 units required (270 kW) + 1 standby = 10 units total (N+1).</p>
        <p style={S.p}><strong>Layout:</strong> 5 units each side of the room. Downflow units with raised floor 600mm height.</p>
        <p style={S.p}><strong>Outdoor:</strong> 10 condenser units on the roof — each paired with an indoor CRAC unit.</p>
        <p style={S.p}><strong>Control:</strong> All units connected to BMS. Master/slave configuration — automatic standby rotation every 30 days.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>High Supply Air Temperature</h3>
        <p style={S.p}>Possible causes: Dirty filter, low refrigerant, high ambient temperature, compressor issue. Action: Check the filter, check refrigerant pressure, clean the condenser.</p>

        <h3 style={S.h3}>Compressor Trip</h3>
        <p style={S.p}>Possible causes: High head pressure, low suction pressure, overload, internal fault. Action: Confirm the standby unit is running → read the fault code → call a qualified technician.</p>

        <h3 style={S.h3}>Condenser Fan Failure</h3>
        <p style={S.p}>Possible causes: Motor fault, belt break (older units), blade damage. Effect: High head pressure → compressor trip. Action: Replace the fan.</p>

        <h3 style={S.h3}>Refrigerant Leak</h3>
        <p style={S.p}>Possible causes: Pipe joint wear, valve leak, coil damage. Signs: Low suction pressure, poor cooling, ice on the evaporator coil. Action: Detect the leak → repair → recharge — licensed technician only.</p>

        <h3 style={S.h3}>Humidity Out of Range</h3>
        <p style={S.p}>Possible causes: Humidifier failure, dehumidification issue, water supply. Action: Verify the humidity sensor, check humidifier status.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <h3 style={S.h3}>Quarterly PM</h3>
        <ul style={S.ul}>
          <li style={S.li}>Air filter clean / replace</li>
          <li style={S.li}>Inspect and clean the evaporator coil</li>
          <li style={S.li}>Clear the condensate drain</li>
          <li style={S.li}>Refrigerant pressure check — suction and discharge</li>
          <li style={S.li}>Measure superheat and subcooling</li>
          <li style={S.li}>Tighten electrical connections</li>
          <li style={S.li}>Check compressor current draw</li>
          <li style={S.li}>Verify controller settings</li>
        </ul>

        <h3 style={S.h3}>Outdoor Condenser PM</h3>
        <ul style={S.ul}>
          <li style={S.li}>Clean the condenser coil — use a fin straightener</li>
          <li style={S.li}>Inspect the fan blades</li>
          <li style={S.li}>Fan motor current draw</li>
          <li style={S.li}>Check refrigerant pipe insulation</li>
          <li style={S.li}>Check weather proofing</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Inspection Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Supply air temperature (target: 18-22°C)</li>
          <li style={S.li}>✓ Return air temperature (target: 27-35°C)</li>
          <li style={S.li}>✓ Room humidity (target: 40-60% RH)</li>
          <li style={S.li}>✓ All units status — running / standby / fault</li>
          <li style={S.li}>✓ BMS alarms — any active alarms?</li>
          <li style={S.li}>✓ Outdoor condenser units — visually check (noise, vibration)</li>
          <li style={S.li}>✓ Water leak check — condensate drain area</li>
          <li style={S.li}>✓ Compressor running (sound check)</li>
          <li style={S.li}>✓ Log book update</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Inspect the filter — clean or replace</li>
          <li style={S.li}>✓ Condensate drain flush</li>
          <li style={S.li}>✓ Switchover test — primary to standby transfer</li>
          <li style={S.li}>✓ Temperature/humidity sensor calibration check</li>
          <li style={S.li}>✓ BMS alarm log review</li>
          <li style={S.li}>✓ Electrical panel check — breakers status</li>
          <li style={S.li}>✓ Outdoor unit visual check — debris, clearance</li>
          <li style={S.li}>✓ Record all readings in log</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>LOTO procedure:</strong> Electrical isolation is mandatory before maintenance</li>
          <li style={S.li}><strong>Refrigerant handling:</strong> Certified technician only — direct exposure harmful</li>
          <li style={S.li}><strong>High pressure hazard:</strong> Do not open the refrigerant system without authorization</li>
          <li style={S.li}><strong>Outdoor unit safety:</strong> Maintain clearance while the condenser fan is running</li>
          <li style={S.li}><strong>Working at height:</strong> Condenser maintenance on the roof — fall protection is essential</li>
          <li style={S.li}><strong>Standby confirm:</strong> Confirm the standby unit is running before maintenance</li>
          <li style={S.li}><strong>PPE:</strong> Gloves, safety glasses, proper footwear</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the difference between CRAC and CRAH?</h3>
        <p style={S.p}><strong>Answer:</strong> A CRAC has its own compressor and uses DX cooling — a self-contained unit. A CRAH has no compressor — it uses chilled water from outside (from the chiller plant). CRAC = complete unit. CRAH = just an air handler, the chiller is separate.</p>

        <h3 style={S.h3}>Q2: How is CRAC unit sizing done?</h3>
        <p style={S.p}><strong>Answer:</strong> Calculate the IT load (in kW). For N+1 redundancy: N units handle the full load, 1 extra standby. Example: 100 kW load, 20 kW per unit → 5 units needed + 1 standby = 6 total. Running each unit at 80% load is best practice.</p>

        <h3 style={S.h3}>Q3: What does a high head pressure alarm indicate?</h3>
        <p style={S.p}><strong>Answer:</strong> A condenser side problem. Possible causes: dirty condenser coil, condenser fan failure, high ambient temperature, refrigerant overcharge. The compressor can trip. Immediate action: check the condenser, verify fan status.</p>

        <h3 style={S.h3}>Q4: What is superheat in a CRAC and why is it measured?</h3>
        <p style={S.p}><strong>Answer:</strong> Superheat = refrigerant gas temperature at the evaporator outlet minus the saturation temperature. Target: 6-12°C superheat. Low superheat → liquid refrigerant can enter the compressor (liquid slugging — dangerous). High superheat → low refrigerant or an expansion valve problem. It is a method to verify the refrigerant charge.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Room temperature is going above 28°C</h3>
        <ul style={S.ul}>
          <li style={S.li}>How many CRAC units are actually running? → All should be active</li>
          <li style={S.li}>Filter clog? → Differential pressure check</li>
          <li style={S.li}>Measure the supply air temperature → is cold air coming from the PAC?</li>
          <li style={S.li}>Hot/cold aisle mixing? → Check the blanking panels</li>
          <li style={S.li}>Was new IT equipment added? → Recalculate the heat load</li>
          <li style={S.li}>Outdoor ambient temperature → High ambient → derating effect</li>
        </ul>

        <h3 style={S.h3}>Scenario: The compressor has tripped</h3>
        <ul style={S.ul}>
          <li style={S.li}>Immediately confirm the standby unit is running</li>
          <li style={S.li}>Read the controller fault code</li>
          <li style={S.li}>High head pressure alarm? → Check the condenser fan</li>
          <li style={S.li}>Low suction pressure? → Refrigerant leak suspect</li>
          <li style={S.li}>Overload trip? → Do an electrical check</li>
          <li style={S.li}>Call a qualified HVAC technician — do not DIY</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>CRAC vs PAC vs CRAH</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>CRAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>PAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>CRAH</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Has compressor?", "Yes (outdoor)", "Yes (usually integrated)", "No"],
                ["Cooling method", "DX refrigerant", "DX refrigerant", "Chilled water"],
                ["External unit needed", "Yes (condenser)", "Sometimes", "No (needs chiller)"],
                ["Scale", "Small to medium DC", "Small to medium DC", "Large DC"],
                ["Efficiency", "Good", "Good", "Better (with chiller)"],
                ["Installation complexity", "Medium", "Medium", "High (chiller plant)"],
                ["Common use", "Server rooms, small DC", "Server rooms, small DC", "Large data centers"],
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
          <li style={S.li}><strong>N+1 always:</strong> At least one standby unit — no downtime on failure</li>
          <li style={S.li}><strong>Standby rotation:</strong> Regularly switch the primary and standby — equal wear</li>
          <li style={S.li}><strong>Hot/cold aisle separation:</strong> CRAC cooling becomes 30-40% more efficient</li>
          <li style={S.li}><strong>Filter maintenance schedule:</strong> Mark it on the calendar — do not skip it</li>
          <li style={S.li}><strong>Setpoint consistency:</strong> Run all CRAC units at the same setpoint</li>
          <li style={S.li}><strong>Outdoor condenser clearance:</strong> Minimum 1m clearance on all sides — do not block the airflow</li>
          <li style={S.li}><strong>BMS integration:</strong> Monitor all units — manual rounds are not enough</li>
          <li style={S.li}><strong>Annual refrigerant audit:</strong> Have the system checked by a licensed technician</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "CRAC = Computer Room Air Conditioner — a self-contained unit designed specifically for Data Center cooling.",
          "It uses DX (Direct Expansion) cooling — the refrigerant cools the air directly. The compressor is in the outdoor condenser unit.",
          "PAC and CRAC are often used for the same thing in the industry — both are DX cooling, both are precision cooling units.",
          "The fundamental difference from a CRAH: a CRAH has no compressor — it uses chilled water. A CRAC is self-contained.",
          "N+1 redundancy is mandatory — the failure of any unit should not impact operations.",
          "Daily checks: supply air temp, return air temp, humidity, alarms. Monthly: filter, drain, switchover test.",
          "Common faults: high head pressure (condenser issue), compressor trip, low refrigerant, filter clog — remember the causes and actions for each.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>CRAC is clear. Take the cooling system further:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — the CRAC's close cousin — a precision cooling unit.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — the centralized chilled water system in large data centers.</li>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — works with the chiller — heat rejection to the atmosphere.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — aisle containment — improves CRAC/PAC efficiency.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — how to get cool air to the right place.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
