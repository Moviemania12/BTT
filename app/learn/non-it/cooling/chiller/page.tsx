import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Chiller in Data Centers — Complete Guide | Behind The Tech",
  description: "What is a chiller, how does it work, why is it used in a Data Center — chilled water system, types, components, maintenance and troubleshooting complete guide.",
  keywords: ["chiller data center", "chilled water system", "data center cooling chiller", "screw chiller", "centrifugal chiller"],
  openGraph: { title: "Chiller in Data Centers — Complete Guide", description: "The heart of the chilled water system — how a chiller works and why it is essential in large data centers.", url: "https://behindthetech.in/learn/non-it/cooling/chiller", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Chiller Explained — Behind The Tech", description: "Chiller — the central system of large Data Center cooling. Complete guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/chiller",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/chiller",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/chiller",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/chiller",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-chiller",    text: "What Is a Chiller?",                  level: 2 },
  { id: "why-needed",         text: "Why Is Chiller Needed?",              level: 2 },
  { id: "working-principle",  text: "Working Principle",                   level: 2 },
  { id: "chilled-water-loop", text: "Chilled Water Loop Explained",        level: 2 },
  { id: "main-components",    text: "Main Components",                     level: 2 },
  { id: "how-it-works-in-dc", text: "How Chiller Works in a Data Center",  level: 2 },
  { id: "types",              text: "Types of Chillers",                   level: 2 },
  { id: "advantages",         text: "Advantages",                          level: 2 },
  { id: "disadvantages",      text: "Disadvantages",                       level: 2 },
  { id: "real-example",       text: "Real Data Center Example",            level: 2 },
  { id: "common-faults",      text: "Common Faults",                       level: 2 },
  { id: "preventive-maintenance", text: "Preventive Maintenance",          level: 2 },
  { id: "daily-checklist",    text: "Daily Inspection Checklist",          level: 2 },
  { id: "monthly-checklist",  text: "Monthly Checklist",                   level: 2 },
  { id: "safety",             text: "Safety Precautions",                  level: 2 },
  { id: "interview-questions",text: "Interview Questions",                 level: 2 },
  { id: "troubleshooting",    text: "Troubleshooting Guide",               level: 2 },
  { id: "comparison",         text: "Chiller vs DX Cooling",               level: 2 },
  { id: "best-practices",     text: "Best Practices",                      level: 2 },
  { id: "key-takeaways",      text: "Key Takeaways",                       level: 2 },
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
    { label: "In one line", text: "A chiller is a machine that cools water (chilled water). This cold water then goes to CRAH units, which cool the Data Center air." },
    { label: "Difference from DX", text: "CRAC/PAC cool air directly (DX). A chiller first cools water, then that water cools the air. Chiller = centralized, DX = distributed." },
    { label: "When it is used", text: "In large data centers — where 500 kW+ of cooling is needed. In small centers CRAC/PAC is fine. In large centers a chiller is more efficient and scalable." },
    { label: "Chilled water temp", text: "A chiller typically cools water to 6-7°C (chilled water supply). Return water comes back at 12-13°C. The 5-6°C temperature difference — this is what carries the heat." },
    { label: "Where the cooling tower comes in", text: "In a water-cooled chiller, a cooling tower is installed on the condenser side. The chiller's heat is rejected in the cooling tower. In an air-cooled chiller, heat is rejected into the outdoor air." },
    { label: "N+1 or 2N", text: "N+1 chiller redundancy in Tier III data centers. 2N in Tier IV — two completely independent chiller plants. If one fails, the other immediately takes the whole load." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>🧊 QUICK SUMMARY — 2 MINUTE READ</span>
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
  { q: "What is the basic difference between a Chiller and a CRAC?", a: "A CRAC cools air directly (DX). A chiller first cools water; that chilled water goes to CRAH units, which cool the air. Chiller = centralized water cooling. CRAC = decentralized air cooling. In large data centers a chiller is more efficient." },
  { q: "What are the chilled water supply and return temperatures?", a: "Typical values: CHW supply (CHWS) = 6-7°C (comes out of the chiller), CHW return (CHWR) = 12-13°C (comes back from the CRAH). 5-6°C temperature differential. Higher delta T = better chiller efficiency." },
  { q: "What is COP and what value should a chiller have?", a: "COP = Coefficient of Performance = cooling capacity / power input. Higher COP = more efficient. Typical: Air-cooled chiller COP 2.5-4.5, Water-cooled chiller COP 4.0-7.0+. Higher COP = less electricity, less cost." },
  { q: "How is redundancy designed in a chiller plant?", a: "Tier III: N+1 — one extra chiller. Tier IV: 2N — two completely separate chiller plants, independent piping, independent cooling towers. If one complete plant fails, the other instantly handles the whole load." },
  { q: "What is free cooling?", a: "When the outdoor temperature is lower than the chilled water temperature, cooling can be done directly from outdoor air by bypassing the chiller. Energy saving — the chiller compressor does not run. Possible in India in winters (December-February). Also called 'economizer mode'." },
  { q: "What is in a chiller room?", a: "Chillers (typically 2 or more), Chilled Water Pumps (primary + secondary loop), Condenser Water Pumps (for water-cooled), cooling headers, expansion tanks, chemical dosing units, flow meters, pressure gauges, BMS panels. A complete chiller plant." },
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

export default function ChillerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="chiller" headings={HEADINGS} readingTimeMinutes={20} lang="en" alternateHref="/hi/learn/non-it/cooling/chiller">

        <p style={S.p}>Imagine a 10 MW hyperscale data center — like Facebook, Google, Amazon.</p>
        <p style={S.p}>This data center has 50,000+ servers. Heat generation will be: <strong>10,000+ kW.</strong></p>
        <p style={S.p}>Will you install 500 CRAC units here? It is technically possible — practically it's a nightmare.</p>
        <p style={S.p}>Large data centers need a <strong>centralized cooling system</strong>.</p>
        <p style={S.p}>This centralized system is — <strong>the Chiller Plant.</strong></p>
        <p style={S.p}>The chiller's job is: <strong>Cool the water. Send this cold water to the data center. The data center will be cooled.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/chiller/chiller-plant-data-center.png" alt="Chiller plant with multiple chiller units in a large data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Chiller plant — multiple chiller units in parallel. This is the heart of large data center cooling.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-chiller" style={S.h1}>What Is a Chiller?</h2>

        <p style={S.p}><strong>A chiller is a refrigeration machine that cools water.</strong></p>
        <p style={S.p}>In simple language: a chiller is a very big air conditioner — but it does not cool a room, <strong>it cools water.</strong></p>
        <p style={S.p}>This cold water (Chilled Water — CHW) then goes through piping to CRAH (Computer Room Air Handler) units.</p>
        <p style={S.p}>In the CRAH, this cold water passes through coils. Warm air from the server racks goes over these coils. The air gets cooled. The warm water returns to the chiller.</p>
        <p style={S.p}><strong>Chiller → cool water → CRAH → cool air → servers.</strong></p>

        <InsightCard>
          Refrigerator analogy: a home refrigerator keeps the things inside cold and throws heat outside. A chiller does the same job — but "inside" = the chilled water loop, "outside" = the cooling tower or outdoor air. Think of it as 1000 times bigger than a refrigerator.
        </InsightCard>

        <DCMapNote components={["Chiller", "CRAH", "Cooling Tower", "Chilled Water Pumps", "Condenser Water Pumps", "Expansion Tank"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Chiller Needed?</h2>

        <p style={S.p}>For a small data center ({'<'} 200 kW), CRAC/PAC units work fine.</p>
        <p style={S.p}>But when the data center starts getting big:</p>
        <ul style={S.ul}>
          <li style={S.li}>500 kW cooling need → 20+ CRAC units</li>
          <li style={S.li}>1 MW cooling → 40+ CRAC units</li>
          <li style={S.li}>5 MW cooling → 200+ CRAC units</li>
        </ul>
        <p style={S.p}>200 CRAC units = 200 compressors, 200 outdoor condensers, 200 refrigerant systems = maintenance nightmare + high energy cost.</p>

        <WhyThisMatters>
          In a chiller plant, 5 MW of cooling can be achieved with 3-4 chillers. One centralized system = less maintenance, better efficiency, easier control. In data centers the goal is to improve PUE (Power Usage Effectiveness) — the chiller plant contributes significantly to this. Achieving a PUE of 1.2-1.4 in modern data centers becomes possible with efficient chiller plants.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>A chiller uses the same refrigeration cycle as a CRAC — but with one key difference: <strong>the refrigerant cools water, not air.</strong></p>
        <p style={S.p}><strong>Chiller = Refrigeration machine + Heat exchanger (refrigerant ↔ water)</strong></p>

        <FlowDiagram
          caption="Chiller refrigeration cycle — same 4 steps, but cooling water not air"
          steps={[
            { icon: "💧", label: "Evaporator", sublabel: "Water gets cooled" },
            { icon: "⚙️", label: "Compressor", sublabel: "Refrigerant compress" },
            { icon: "🌡️", label: "Condenser", sublabel: "Heat reject (tower/air)" },
            { icon: "🔧", label: "Expansion Valve", sublabel: "Pressure drop" },
          ]}
        />

        <h3 style={S.h3}>Evaporator (Inside the Chiller)</h3>
        <p style={S.p}>Low pressure refrigerant is in the evaporator. Chilled water return (12-13°C) passes through the evaporator. The refrigerant absorbs the water's heat and turns into gas. The water gets cooled — to 6-7°C. This cold water goes to the CRAH.</p>

        <h3 style={S.h3}>Condenser (Heat Rejection Side)</h3>
        <p style={S.p}>The hot high-pressure refrigerant gas goes into the condenser. In a water-cooled chiller: condenser water (from the cooling tower) absorbs the heat. In an air-cooled chiller: heat is rejected into the outdoor air. The refrigerant turns into liquid.</p>

        <hr style={S.divider} />

        <h2 id="chilled-water-loop" style={S.h1}>Chilled Water Loop Explained</h2>

        <p style={S.p}>The chiller is just one component. It is essential to understand the whole system — the Chilled Water System.</p>

        <FlowDiagram
          caption="Complete chilled water loop — from the chiller to the CRAH and back"
          steps={[
            { icon: "🧊", label: "Chiller", sublabel: "Cools water (6-7°C)" },
            { icon: "⚡", label: "CHW Pump", sublabel: "Pumps water" },
            { icon: "🌬️", label: "CRAH Unit", sublabel: "Cools air" },
            { icon: "🔄", label: "Return", sublabel: "12-13°C back to chiller" },
          ]}
        />

        <h3 style={S.h3}>Primary Loop</h3>
        <p style={S.p}>Chilled water goes directly from the chiller to the CRAH. Primary CHW pumps are closely coupled with the chiller. They maintain constant flow through the chiller.</p>

        <h3 style={S.h3}>Secondary Loop (Variable Flow)</h3>
        <p style={S.p}>Decoupled from the primary loop. Variable speed pumps — flow adjusts according to load. Energy efficient — full speed only at full load. The decoupling header separates the primary and secondary.</p>

        <EngineerTip>
          Understand delta T — it is the indicator of chiller efficiency. Delta T = return temperature - supply temperature. Target: 5-6°C. If delta T is 3°C, the pumps are circulating more water — energy waste. If delta T is 8°C, the CRAH coils are fouled or there is a flow problem. Monitor delta T, optimize it.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Chiller Unit</h3>
        <p style={S.p}>Compressor (screw, centrifugal, reciprocating), evaporator, condenser, expansion device, controls — all in one package. Typically 200 kW to 2000+ kW per unit.</p>

        <h3 style={S.h3}>2. Chilled Water Pumps (CHWP)</h3>
        <p style={S.p}>They pump chilled water from the chiller to the CRAH. Primary pumps: with the chiller, constant flow. Secondary pumps: distribution, variable flow (controlled by VFD).</p>

        <h3 style={S.h3}>3. Cooling Tower (In a Water-Cooled Chiller)</h3>
        <p style={S.p}>The chiller condenser rejects heat — into the cooling tower. The cooling tower sends heat into the atmosphere through evaporative cooling. Condenser water pumps circulate water from the cooling tower to the condenser.</p>

        <h3 style={S.h3}>4. Expansion Tank</h3>
        <p style={S.p}>When water temperature changes, its volume changes. The expansion tank absorbs this volume change. It keeps the pressure in the system stable.</p>

        <h3 style={S.h3}>5. Chemical Dosing System</h3>
        <p style={S.p}>It doses water treatment chemicals — stops scale, corrosion and biological growth. Less treatment is needed in the closed CHW loop. Regular treatment is essential in the open cooling tower loop.</p>

        <h3 style={S.h3}>6. BMS (Building Management System) Integration</h3>
        <p style={S.p}>The chiller plant is all connected to the BMS. Temperature, flow, pressure, alarms — centrally monitored. Automatic chiller sequencing — when load increases, the next chiller starts.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Chiller Works in a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/chiller/chiller-crah-data-center-layout.png" alt="Chiller plant connected to CRAH units in data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Chilled water flow from the chiller to the CRAH. The chiller plant is outside/in the basement. The CRAH is in the server hall.</figcaption>
        </figure>

        <p style={S.p}><strong>Step 1:</strong> Server racks generate heat. CRAH units pull in the warm return air.</p>
        <p style={S.p}><strong>Step 2:</strong> In the CRAH, warm air passes over the chilled water coil. The water absorbs the heat. The air gets cooled.</p>
        <p style={S.p}><strong>Step 3:</strong> Cool air is supplied to the server racks (into the cold aisle).</p>
        <p style={S.p}><strong>Step 4:</strong> Warm return water (12-13°C) comes back into the chiller's evaporator.</p>
        <p style={S.p}><strong>Step 5:</strong> The chiller cools this water (6-7°C). Cycle repeats.</p>
        <p style={S.p}><strong>Step 6:</strong> The chiller's condenser heat is rejected in the cooling tower → the cooling tower sends the heat into the atmosphere.</p>

        <InsightCard>
          The chiller plant is typically outside the data center building or in the basement. CRAH units are inside the server hall. Between the two is chilled water piping — insulated if outdoor. This separation exists so that the vibration and noise of heavy machinery (chiller, cooling tower) do not come into the server hall.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Chillers</h2>

        <h3 style={S.h3}>By Compressor Type</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Screw Chiller:</strong> Twin screw compressor. Most common in data centers 200-2000 kW range. Reliable, part-load efficient. Industry standard choice.</li>
          <li style={S.li}><strong>Centrifugal Chiller:</strong> Large capacity (1000-5000+ kW). Highest efficiency at full load. Common in hyperscale data centers. Magnetic bearing variants — oil-free, very low maintenance.</li>
          <li style={S.li}><strong>Reciprocating Chiller:</strong> Older technology, smaller capacities. Less common now — replaced by scroll or screw.</li>
          <li style={S.li}><strong>Absorption Chiller:</strong> Heat driven — no electric compressor. Uses steam/hot water. Rare in data centers — used in specific applications.</li>
        </ul>

        <h3 style={S.h3}>By Condenser Cooling</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Air-Cooled Chiller:</strong> Rejects heat into outdoor air. No cooling tower needed. Less efficient. Smaller installations.</li>
          <li style={S.li}><strong>Water-Cooled Chiller:</strong> Rejects heat through a cooling tower. More efficient (COP 4-7+). Requires a cooling tower + condenser water pump. Standard for large data centers.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Centralized cooling:</strong> One plant, full facility cool — easier to manage</li>
          <li style={S.li}><strong>High efficiency:</strong> Water-cooled chiller COP 4-7 — better than DX (COP 2.5-4)</li>
          <li style={S.li}><strong>Scalable:</strong> Add chillers as load increases</li>
          <li style={S.li}><strong>Free cooling potential:</strong> Economizer mode in cold weather — compressor bypass</li>
          <li style={S.li}><strong>Better humidity control:</strong> Centralized dehumidification possible</li>
          <li style={S.li}><strong>Lower PUE:</strong> Energy efficient → better Power Usage Effectiveness</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>High initial cost:</strong> Chiller plant infrastructure is expensive</li>
          <li style={S.li}><strong>Complex system:</strong> Chillers, pumps, cooling towers, piping — all have to be managed</li>
          <li style={S.li}><strong>Water requirements:</strong> Water evaporates in the cooling tower — makeup water is needed</li>
          <li style={S.li}><strong>Water treatment:</strong> Regular chemical treatment — also Legionella prevention</li>
          <li style={S.li}><strong>Piping failure risk:</strong> Leaks can cause serious water damage to IT equipment</li>
          <li style={S.li}><strong>Not suitable for small DC:</strong> Over-engineering for small sites</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Scenario:</strong> 5 MW data center, 1000 racks, average 5 kW/rack.</p>
        <p style={S.p}><strong>Cooling design:</strong> Water-cooled screw chillers, 1500 kW each. 4 chillers needed (4 × 1500 = 6000 kW capacity). N+1 → actually 4 chillers installed (one is spare/standby in rotation).</p>
        <p style={S.p}><strong>Cooling tower:</strong> 4 cooling towers — one per chiller. Redundant cells available.</p>
        <p style={S.p}><strong>CRAH units:</strong> 100 CRAH units (50 kW each) in server hall. Chilled water piping throughout raised floor and overhead.</p>
        <p style={S.p}><strong>Chilled water temps:</strong> Supply 7°C, Return 13°C, Delta T = 6°C.</p>
        <p style={S.p}><strong>Control:</strong> BMS chiller sequencing — automatic start/stop based on load. VFD pumps — variable flow based on demand.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>High Chilled Water Supply Temperature</h3>
        <p style={S.p}>Cause: Chiller fault, low refrigerant, high load, fouled evaporator. Impact: CRAH inlet temperature rises, server cooling is affected. Action: Check chiller status, check refrigerant, balance the load.</p>

        <h3 style={S.h3}>Chiller Trip / Fault</h3>
        <p style={S.p}>Cause: High condenser pressure, compressor fault, electrical trip, safety limit. Action: Confirm the standby chiller has started, read the fault code, call a qualified technician.</p>

        <h3 style={S.h3}>Low Chilled Water Flow</h3>
        <p style={S.p}>Cause: Pump failure, valve closed, filter clogged. Impact: Chiller capacity reduces, high CHWS temperature. Action: Pump status, valve positions, clean the strainer.</p>

        <h3 style={S.h3}>Cooling Tower Fault</h3>
        <p style={S.p}>Cause: Fan failure, low water level, drift eliminator block. Impact: Condenser water temperature rise → high condenser pressure → chiller trip possible. Action: Check the CT fan, water makeup, monitor condenser pressure.</p>

        <h3 style={S.h3}>High Delta T</h3>
        <p style={S.p}>Cause: CRAH coil fouled, flow imbalance, air side problem. Impact: Chiller working harder, higher energy. Action: Clean the CRAH coil, check the flow balancing valve.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <h3 style={S.h3}>Monthly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Log chiller operating parameters (temperatures, pressures, currents)</li>
          <li style={S.li}>Test chilled water quality — pH, TDS, inhibitor levels</li>
          <li style={S.li}>Cooling tower water quality — biocide treatment</li>
          <li style={S.li}>Check pump vibration and noise</li>
          <li style={S.li}>Clean the strainer baskets</li>
        </ul>

        <h3 style={S.h3}>Quarterly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Chiller tube inspection — evaporator and condenser</li>
          <li style={S.li}>Refrigerant leak test</li>
          <li style={S.li}>Tighten electrical connections</li>
          <li style={S.li}>Safety valve test</li>
          <li style={S.li}>Inspect the cooling tower fill</li>
          <li style={S.li}>Pump mechanical seal check</li>
        </ul>

        <h3 style={S.h3}>Annual</h3>
        <ul style={S.ul}>
          <li style={S.li}>Eddy current test — a comprehensive inspection of the chiller tubes</li>
          <li style={S.li}>Refrigerant analysis</li>
          <li style={S.li}>Oil analysis (screw chillers)</li>
          <li style={S.li}>Compressor vibration analysis</li>
          <li style={S.li}>Cooling tower full inspection — fill replacement if needed</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Inspection Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Chiller status — running / standby / fault (all units)</li>
          <li style={S.li}>✓ CHWS temperature (target: 6-7°C)</li>
          <li style={S.li}>✓ CHWR temperature (target: 12-13°C)</li>
          <li style={S.li}>✓ Delta T (target: 5-6°C)</li>
          <li style={S.li}>✓ Chilled water flow rate</li>
          <li style={S.li}>✓ Condenser pressure (water-cooled: condenser water temp)</li>
          <li style={S.li}>✓ Chiller amperage reading</li>
          <li style={S.li}>✓ Cooling tower status — fan running, water level</li>
          <li style={S.li}>✓ BMS alarms — any active?</li>
          <li style={S.li}>✓ Water leak visual inspection</li>
          <li style={S.li}>✓ Pump running status</li>
          <li style={S.li}>✓ Log book entry</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Water quality test — chilled water and condenser water</li>
          <li style={S.li}>✓ Chemical dosing check — inhibitor levels</li>
          <li style={S.li}>✓ Strainer baskets clean</li>
          <li style={S.li}>✓ Standby chiller run test — 30 minutes chalaao</li>
          <li style={S.li}>✓ Pump rotation check — standby pump run</li>
          <li style={S.li}>✓ BMS alarm history review</li>
          <li style={S.li}>✓ All valve positions verify</li>
          <li style={S.li}>✓ Legionella risk assessment (cooling tower)</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>LOTO mandatory:</strong> Full electrical isolation before chiller maintenance</li>
          <li style={S.li}><strong>Refrigerant safety:</strong> High pressure system — trained technician only, PPE mandatory</li>
          <li style={S.li}><strong>Water pressure:</strong> The chilled water system is under pressure — close the isolation valves first</li>
          <li style={S.li}><strong>Legionella risk:</strong> Cooling tower — Legionella bacteria growth possible. Regular treatment, trained personnel</li>
          <li style={S.li}><strong>Working at height:</strong> Cooling tower maintenance — fall protection is essential</li>
          <li style={S.li}><strong>Hot surfaces:</strong> The compressor housing is hot — burn hazard</li>
          <li style={S.li}><strong>Water leak response:</strong> Immediately notify, isolate, protect IT equipment</li>
          <li style={S.li}><strong>Standby confirm:</strong> Confirm the standby chiller is ready before any maintenance</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the fundamental difference between a Chiller and a CRAC?</h3>
        <p style={S.p}><strong>Answer:</strong> A CRAC is a DX system — the refrigerant cools the air directly. A chiller is an indirect system — the refrigerant first cools water, then that water cools the air through the CRAH. A chiller is centralized, for large scale. A CRAC is distributed, for smaller applications.</p>

        <h3 style={S.h3}>Q2: What is COP? What is a good COP?</h3>
        <p style={S.p}><strong>Answer:</strong> COP = Coefficient of Performance = Cooling output (kW) / Power input (kW). Higher = more efficient. Air-cooled chiller: COP 2.5-4. Water-cooled chiller: COP 4-7+. Target a high COP in the data center — electricity savings are direct cost savings.</p>

        <h3 style={S.h3}>Q3: What is chilled water delta T and why is it important?</h3>
        <p style={S.p}><strong>Answer:</strong> Delta T = CHWR temp - CHWS temp. Target: 5-7°C. High delta T = efficient heat transfer (less flow needed for the same cooling). Low delta T = inefficient — the pumps are using more energy. Optimizing delta T = energy savings.</p>

        <h3 style={S.h3}>Q4: What is free cooling (economizer mode)?</h3>
        <p style={S.p}><strong>Answer:</strong> When the outdoor temperature is cold enough, the chilled water is cooled directly by outdoor air by bypassing the chiller compressor. "Free" because the compressor does not run — only the pumps and cooling tower fans. Significant energy savings in winter — data center cooling cost can reduce by 30-50%.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: CHWS temperature is going above target</h3>
        <ul style={S.ul}>
          <li style={S.li}>Is the chiller running? Check the status</li>
          <li style={S.li}>Chiller capacity: load vs capacity match?</li>
          <li style={S.li}>Condenser pressure high? → Check the cooling tower</li>
          <li style={S.li}>Evaporator fouled? → Tube cleaning needed</li>
          <li style={S.li}>Start the standby chiller if available</li>
        </ul>

        <h3 style={S.h3}>Scenario: The chiller has tripped</h3>
        <ul style={S.ul}>
          <li style={S.li}>Immediately: start the standby chiller (auto or manual)</li>
          <li style={S.li}>Read the fault code on the BMS or chiller controller</li>
          <li style={S.li}>High condenser pressure? → Cooling tower check</li>
          <li style={S.li}>Electrical trip? → Check the MCC panel</li>
          <li style={S.li}>OEM technical support — do not attempt to restart without investigation</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Chiller vs DX Cooling</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Chiller System</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>DX (CRAC/PAC)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Scale", "500 kW to 50+ MW", "5 kW to 500 kW"],
                ["Cooling medium", "Chilled water", "Refrigerant (direct)"],
                ["Efficiency (COP)", "4-7+ (water-cooled)", "2.5-4.5"],
                ["Initial cost", "High", "Medium"],
                ["Complexity", "High (multiple systems)", "Low to Medium"],
                ["Scalability", "Excellent", "Good (add units)"],
                ["Free cooling", "Easy to integrate", "Limited"],
                ["Best for", "Large data centers", "Small to medium DC"],
                ["Water risk", "Yes (piping leaks)", "No (no water in DC)"],
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
          <li style={S.li}><strong>N+1 minimum:</strong> For Tier III. For Tier IV 2N — separate chiller plants.</li>
          <li style={S.li}><strong>Delta T optimization:</strong> 5-7°C target. Monitor regularly — it is an inefficiency indicator.</li>
          <li style={S.li}><strong>VFD pumps:</strong> Variable flow saves 30-40% pump energy vs constant flow.</li>
          <li style={S.li}><strong>Water treatment:</strong> Regular chemical treatment — prevent scale and corrosion.</li>
          <li style={S.li}><strong>Evaluate free cooling:</strong> In India, 2-3 months of economizer operation is possible in the winter months.</li>
          <li style={S.li}><strong>Chiller sequencing:</strong> Fewer chillers at part load — more efficient than all at low load.</li>
          <li style={S.li}><strong>Regular performance analysis:</strong> Trend the COP — detect degradation early.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "A chiller is a refrigeration machine that cools water (6-7°C). This cold water cools the air through CRAH units.",
          "The fundamental difference from DX (CRAC/PAC): a chiller cools water, DX cools air directly. Chiller = centralized, DX = distributed.",
          "Chilled water system: Chiller → CHW Pumps → CRAH → return water → Chiller. This closed loop runs continuously 24×7.",
          "The water-cooled chiller + cooling tower combination is the most efficient — COP 4-7+.",
          "Delta T (return - supply temperature) is the efficiency indicator. Target 5-7°C. Monitor it.",
          "For large data centers (500 kW+), a chiller plant is economically and operationally better than multiple CRAC units.",
          "Daily: CHWS/CHWR temp, delta T, chiller status, CT status. Monthly: water quality, standby test, strainers.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>The chiller system is complete. Next, understand the cooling plant:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — how the chiller's heat goes outside — complete cooling tower guide.</li>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — the chiller alternative in small data centers — DX cooling.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — Another DX cooling option — PAC detailed guide.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — delivering cool air from the CRAH efficiently — containment strategies.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — measuring cooling effectiveness.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
