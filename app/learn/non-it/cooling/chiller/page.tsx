import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Chiller in Data Centers — Complete Guide | Behind The Tech",
  description: "Chiller kya hai, kaise kaam karta hai, Data Center mein kyun use hota hai — chilled water system, types, components, maintenance aur troubleshooting complete guide.",
  keywords: ["chiller data center", "chilled water system", "data center cooling chiller", "screw chiller", "centrifugal chiller"],
  openGraph: { title: "Chiller in Data Centers — Complete Guide", description: "Chilled water system ka heart — chiller kaise kaam karta hai aur large data centers mein kyun zaroori hai.", url: "https://behindthetech.in/learn/non-it/cooling/chiller", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "Chiller Explained — Behind The Tech", description: "Chiller — large Data Center cooling ka central system. Complete guide." },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/chiller" },
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
    { label: "Ek line mein", text: "Chiller ek machine hai jo paani ko thanda karta hai (chilled water). Ye thanda paani phir CRAH units mein jaata hai jo Data Center air cool karte hain." },
    { label: "DX se kya fark", text: "CRAC/PAC directly air cool karte hain (DX). Chiller pehle water cool karta hai, phir wo water air cool karta hai. Chiller = centralized, DX = distributed." },
    { label: "Kab use hota hai", text: "Large data centers mein — jahan 500 kW+ cooling chahiye. Chhote centers mein CRAC/PAC theek hai. Large centers mein chiller zyada efficient aur scalable hai." },
    { label: "Chilled water temp", text: "Chiller pani ko typically 6-7°C tak thanda karta hai (chilled water supply). Return water 12-13°C pe wapas aata hai. 5-6°C ka temperature difference — yahi heat carry karta hai." },
    { label: "Cooling tower kahan aata hai", text: "Water-cooled chiller mein condenser side pe cooling tower lagta hai. Chiller ki heat cooling tower mein reject hoti hai. Air-cooled chiller mein outdoor air se heat reject hoti hai." },
    { label: "N+1 ya 2N", text: "Tier III data centers mein N+1 chiller redundancy. Tier IV mein 2N — two completely independent chiller plants. Ek fail ho to doosra immediately poora load le." },
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
  { q: "Chiller aur CRAC mein kya basic difference hai?", a: "CRAC directly air cool karta hai (DX). Chiller pehle water cool karta hai, wo chilled water CRAH units mein jaata hai jo air cool karte hain. Chiller = centralized water cooling. CRAC = decentralized air cooling. Large data centers mein chiller zyada efficient hai." },
  { q: "Chilled water supply aur return temperature kya hoti hai?", a: "Typical values: CHW supply (CHWS) = 6-7°C (chiller se nikalta hai), CHW return (CHWR) = 12-13°C (CRAH se wapas aata hai). 5-6°C temperature differential. Higher delta T = better chiller efficiency." },
  { q: "COP kya hota hai aur chiller ke liye kya value honi chahiye?", a: "COP = Coefficient of Performance = cooling capacity / power input. Higher COP = more efficient. Typical: Air-cooled chiller COP 2.5-4.5, Water-cooled chiller COP 4.0-7.0+. Higher COP = kam electricity, kam cost." },
  { q: "Chiller plant mein redundancy kaise design hoti hai?", a: "Tier III: N+1 — ek extra chiller. Tier IV: 2N — two completely separate chiller plants, independent piping, independent cooling towers. Ek complete plant fail ho to doosra instantly pora load handle kare." },
  { q: "Free cooling kya hota hai?", a: "Jab outdoor temperature chilled water temperature se kam ho, chiller bypass karke outdoor air se directly cooling ho sakti hai. Energy saving — chiller compressor run nahi hota. India mein winters mein possible (December-February). 'Economizer mode' bhi kehte hain." },
  { q: "Chiller room mein kya kya hota hai?", a: "Chillers (typically 2 ya zyada), Chilled Water Pumps (primary + secondary loop), Condenser Water Pumps (water-cooled ke liye), cooling headers, expansion tanks, chemical dosing units, flow meters, pressure gauges, BMS panels. Ek complete chiller plant." },
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
      <ArticleLayout slug="chiller" headings={HEADINGS} readingTimeMinutes={20}>

        <p style={S.p}>Imagine karo ek 10 MW hyperscale data center — Facebook, Google, Amazon jaise.</p>
        <p style={S.p}>Is data center mein 50,000+ servers hain. Heat generation hogi: <strong>10,000+ kW.</strong></p>
        <p style={S.p}>Kya tum yahan 500 CRAC units lagaaoge? Technically possible hai — practically it's a nightmare.</p>
        <p style={S.p}>Large data centers ke liye ek <strong>centralized cooling system</strong> chahiye hota hai.</p>
        <p style={S.p}>Ye centralized system hai — <strong>Chiller Plant.</strong></p>
        <p style={S.p}>Chiller ka kaam hai: <strong>Paani thanda karo. Ye thanda paani data center tak bhejo. Data center thanda ho jaayega.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/chiller/chiller-plant-data-center.png" alt="Chiller plant with multiple chiller units in a large data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Chiller plant — multiple chiller units parallel mein. Ye large data center cooling ka heart hai.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-chiller" style={S.h1}>What Is a Chiller?</h2>

        <p style={S.p}><strong>Chiller ek refrigeration machine hai jo water ko thanda karta hai.</strong></p>
        <p style={S.p}>Simple language mein: Chiller ek bahut bada air conditioner hai — lekin ye room cool nahi karta, <strong>paani cool karta hai.</strong></p>
        <p style={S.p}>Ye thanda paani (Chilled Water — CHW) phir CRAH (Computer Room Air Handler) units mein piping ke through jaata hai.</p>
        <p style={S.p}>CRAH mein ye thanda paani coils mein se guzarta hai. Server racks se warm air in coils ke upar se jaati hai. Air thandi ho jaati hai. Warm water wapas chiller mein return hota hai.</p>
        <p style={S.p}><strong>Chiller → cool water → CRAH → cool air → servers.</strong></p>

        <InsightCard>
          Refrigerator analogya: Ghar ka refrigerator andar ki cheezein thandi rakhta hai, bahar heat nikalta hai. Chiller bhi same kaam karta hai — lekin "andar" = chilled water loop, "bahar" = cooling tower ya outdoor air. Refrigerator se 1000 guna bada samjho.
        </InsightCard>

        <DCMapNote components={["Chiller", "CRAH", "Cooling Tower", "Chilled Water Pumps", "Condenser Water Pumps", "Expansion Tank"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Chiller Needed?</h2>

        <p style={S.p}>Chhote data center ({'<'} 200 kW) ke liye CRAC/PAC units theek kaam karte hain.</p>
        <p style={S.p}>Lekin jab data center bada hone lagta hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>500 kW cooling need → 20+ CRAC units</li>
          <li style={S.li}>1 MW cooling → 40+ CRAC units</li>
          <li style={S.li}>5 MW cooling → 200+ CRAC units</li>
        </ul>
        <p style={S.p}>200 CRAC units = 200 compressors, 200 outdoor condensers, 200 refrigerant systems = maintenance nightmare + high energy cost.</p>

        <WhyThisMatters>
          Chiller plant mein 3-4 chillers se 5 MW cooling achieve ho sakti hai. Ek centralized system = less maintenance, better efficiency, easier control. Data centers mein PUE (Power Usage Effectiveness) improve karna goal hota hai — chiller plant isme significantly contribute karta hai. Modern data centers ka PUE 1.2-1.4 achieve karna possible ho jaata hai efficient chiller plants se.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Chiller same refrigeration cycle use karta hai jo CRAC mein hoti hai — but with one key difference: <strong>refrigerant water cool karta hai, air nahi.</strong></p>
        <p style={S.p}><strong>Chiller = Refrigeration machine + Heat exchanger (refrigerant ↔ water)</strong></p>

        <FlowDiagram
          caption="Chiller refrigeration cycle — same 4 steps, but cooling water not air"
          steps={[
            { icon: "💧", label: "Evaporator", sublabel: "Water cool hota hai" },
            { icon: "⚙️", label: "Compressor", sublabel: "Refrigerant compress" },
            { icon: "🌡️", label: "Condenser", sublabel: "Heat reject (tower/air)" },
            { icon: "🔧", label: "Expansion Valve", sublabel: "Pressure drop" },
          ]}
        />

        <h3 style={S.h3}>Evaporator (Chiller Ke Andar)</h3>
        <p style={S.p}>Low pressure refrigerant evaporator mein hai. Chilled water return (12-13°C) evaporator se guzarta hai. Refrigerant water ki heat absorb karke gas ban jaata hai. Water thanda ho jaata hai — 6-7°C. Ye thanda water CRAH ke paas jaata hai.</p>

        <h3 style={S.h3}>Condenser (Heat Rejection Side)</h3>
        <p style={S.p}>Hot high-pressure refrigerant gas condenser mein jaata hai. Water-cooled chiller mein: condenser water (cooling tower se) heat absorb karta hai. Air-cooled chiller mein: outdoor air se heat reject hoti hai. Refrigerant liquid ban jaata hai.</p>

        <hr style={S.divider} />

        <h2 id="chilled-water-loop" style={S.h1}>Chilled Water Loop Explained</h2>

        <p style={S.p}>Chiller sirf ek component hai. Poora system — Chilled Water System — samajhna zaroori hai.</p>

        <FlowDiagram
          caption="Complete chilled water loop — chiller se CRAH tak aur wapas"
          steps={[
            { icon: "🧊", label: "Chiller", sublabel: "Water cool karta hai (6-7°C)" },
            { icon: "⚡", label: "CHW Pump", sublabel: "Water pump karta hai" },
            { icon: "🌬️", label: "CRAH Unit", sublabel: "Air cool karta hai" },
            { icon: "🔄", label: "Return", sublabel: "12-13°C wapas chiller" },
          ]}
        />

        <h3 style={S.h3}>Primary Loop</h3>
        <p style={S.p}>Chiller se directly CRAH tak chilled water jaata hai. Primary CHW pumps chiller ke saath closely coupled hote hain. Constant flow maintain karta hai chiller ke through.</p>

        <h3 style={S.h3}>Secondary Loop (Variable Flow)</h3>
        <p style={S.p}>Primary loop se decoupled. Variable speed pumps — load ke hisaab se flow adjust hota hai. Energy efficient — full speed sirf full load pe. Decoupling header primary aur secondary ko separate karta hai.</p>

        <EngineerTip>
          Delta T samjho — yahi chiller efficiency ka indicator hai. Delta T = return temperature - supply temperature. Target: 5-6°C. Agar delta T 3°C hai to pumps zyada water circulate kar rahe hain — energy waste. Agar delta T 8°C hai to CRAH coils fouled hain ya flow problem hai. Delta T monitor karo, optimize karo.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Chiller Unit</h3>
        <p style={S.p}>Compressor (screw, centrifugal, reciprocating), evaporator, condenser, expansion device, controls — sab ek package mein. Typically 200 kW to 2000+ kW per unit.</p>

        <h3 style={S.h3}>2. Chilled Water Pumps (CHWP)</h3>
        <p style={S.p}>Chilled water ko chiller se CRAH tak pump karte hain. Primary pumps: chiller ke saath, constant flow. Secondary pumps: distribution, variable flow (VFD se controlled).</p>

        <h3 style={S.h3}>3. Cooling Tower (Water-Cooled Chiller Mein)</h3>
        <p style={S.p}>Chiller condenser heat ko reject karta hai — cooling tower mein. Cooling tower evaporative cooling se heat atmosphere mein bhejta hai. Condenser water pumps cooling tower se condenser tak water circulate karte hain.</p>

        <h3 style={S.h3}>4. Expansion Tank</h3>
        <p style={S.p}>Water temperature change hone se volume change hota hai. Expansion tank ye volume change absorb karta hai. Pressure stable rakhta hai system mein.</p>

        <h3 style={S.h3}>5. Chemical Dosing System</h3>
        <p style={S.p}>Water treatment chemicals dose karta hai — scale, corrosion, biological growth rokta hai. Closed CHW loop mein less treatment needed. Open cooling tower loop mein regular treatment zaroori.</p>

        <h3 style={S.h3}>6. BMS (Building Management System) Integration</h3>
        <p style={S.p}>Chiller plant sab BMS se connected. Temperature, flow, pressure, alarms — centrally monitored. Automatic chiller sequencing — load badhne pe next chiller start.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Chiller Works in a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/chiller/chiller-crah-data-center-layout.png" alt="Chiller plant connected to CRAH units in data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Chiller se CRAH tak chilled water flow. Chiller plant bahar/basement mein hota hai. CRAH server hall mein.</figcaption>
        </figure>

        <p style={S.p}><strong>Step 1:</strong> Server racks heat generate karte hain. CRAH units warm return air kheechte hain.</p>
        <p style={S.p}><strong>Step 2:</strong> CRAH mein chilled water coil se warm air guzarti hai. Water heat absorb karta hai. Air thandi ho jaati hai.</p>
        <p style={S.p}><strong>Step 3:</strong> Cool air server racks ko supply hoti hai (cold aisle mein).</p>
        <p style={S.p}><strong>Step 4:</strong> Warm return water (12-13°C) chiller ke evaporator mein wapas aata hai.</p>
        <p style={S.p}><strong>Step 5:</strong> Chiller ye water thanda karta hai (6-7°C). Cycle repeat.</p>
        <p style={S.p}><strong>Step 6:</strong> Chiller ki condenser heat cooling tower mein reject hoti hai → cooling tower atmosphere mein heat bhejta hai.</p>

        <InsightCard>
          Chiller plant typically data center building ke bahar ya basement mein hota hai. CRAH units server hall ke andar hote hain. Dono ke beech chilled water piping — insulated agar outdoor ho. Ye separation isliye hai ki heavy machinery (chiller, cooling tower) ka vibration aur noise server hall mein na aaye.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Chillers</h2>

        <h3 style={S.h3}>By Compressor Type</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Screw Chiller:</strong> Twin screw compressor. Most common in data centers 200-2000 kW range. Reliable, part-load efficient. Industry standard choice.</li>
          <li style={S.li}><strong>Centrifugal Chiller:</strong> Large capacity (1000-5000+ kW). Highest efficiency at full load. Common in hyperscale data centers. Magnetic bearing variants — oil-free, very low maintenance.</li>
          <li style={S.li}><strong>Reciprocating Chiller:</strong> Older technology, smaller capacities. Less common now — scroll ya screw ne replace kiya.</li>
          <li style={S.li}><strong>Absorption Chiller:</strong> Heat driven — no electric compressor. Uses steam/hot water. Rare in data centers — specific applications mein.</li>
        </ul>

        <h3 style={S.h3}>By Condenser Cooling</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Air-Cooled Chiller:</strong> Outdoor air se heat reject. No cooling tower needed. Less efficient. Smaller installations.</li>
          <li style={S.li}><strong>Water-Cooled Chiller:</strong> Cooling tower se heat reject. More efficient (COP 4-7+). Requires cooling tower + condenser water pump. Standard for large data centers.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Centralized cooling:</strong> One plant, full facility cool — easier to manage</li>
          <li style={S.li}><strong>High efficiency:</strong> Water-cooled chiller COP 4-7 — better than DX (COP 2.5-4)</li>
          <li style={S.li}><strong>Scalable:</strong> Load badhne pe chiller add karo</li>
          <li style={S.li}><strong>Free cooling potential:</strong> Cold weather mein economizer mode — compressor bypass</li>
          <li style={S.li}><strong>Better humidity control:</strong> Centralized dehumidification possible</li>
          <li style={S.li}><strong>Lower PUE:</strong> Energy efficient → better Power Usage Effectiveness</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>High initial cost:</strong> Chiller plant infrastructure expensive hai</li>
          <li style={S.li}><strong>Complex system:</strong> Chillers, pumps, cooling towers, piping — sab manage karo</li>
          <li style={S.li}><strong>Water requirements:</strong> Cooling tower mein water evaporation — makeup water chahiye</li>
          <li style={S.li}><strong>Water treatment:</strong> Regular chemical treatment — Legionella prevention bhi</li>
          <li style={S.li}><strong>Piping failure risk:</strong> Leaks can cause serious water damage to IT equipment</li>
          <li style={S.li}><strong>Not suitable for small DC:</strong> Over-engineering small sites ke liye</li>
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
        <p style={S.p}>Cause: Chiller fault, low refrigerant, high load, fouled evaporator. Impact: CRAH inlet temperature badhta hai, server cooling affected. Action: Chiller status check, refrigerant check, load balance karo.</p>

        <h3 style={S.h3}>Chiller Trip / Fault</h3>
        <p style={S.p}>Cause: High condenser pressure, compressor fault, electrical trip, safety limit. Action: Standby chiller start confirm karo, fault code read karo, qualified technician call karo.</p>

        <h3 style={S.h3}>Low Chilled Water Flow</h3>
        <p style={S.p}>Cause: Pump failure, valve closed, filter clogged. Impact: Chiller capacity reduce, high CHWS temperature. Action: Pump status, valve positions, strainer clean karo.</p>

        <h3 style={S.h3}>Cooling Tower Fault</h3>
        <p style={S.p}>Cause: Fan failure, low water level, drift eliminator block. Impact: Condenser water temperature rise → high condenser pressure → chiller trip possible. Action: CT fan check, water makeup, condenser pressure monitor karo.</p>

        <h3 style={S.h3}>High Delta T</h3>
        <p style={S.p}>Cause: CRAH coil fouled, flow imbalance, air side problem. Impact: Chiller working harder, higher energy. Action: CRAH coil clean karo, flow balancing valve check karo.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <h3 style={S.h3}>Monthly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Chiller operating parameters log karo (temperatures, pressures, currents)</li>
          <li style={S.li}>Chilled water quality test karo — pH, TDS, inhibitor levels</li>
          <li style={S.li}>Cooling tower water quality — biocide treatment</li>
          <li style={S.li}>Pump vibration aur noise check karo</li>
          <li style={S.li}>Strainer baskets clean karo</li>
        </ul>

        <h3 style={S.h3}>Quarterly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Chiller tube inspection — evaporator aur condenser</li>
          <li style={S.li}>Refrigerant leak test</li>
          <li style={S.li}>Electrical connections tighten karo</li>
          <li style={S.li}>Safety valve test</li>
          <li style={S.li}>Cooling tower fill inspect karo</li>
          <li style={S.li}>Pump mechanical seal check</li>
        </ul>

        <h3 style={S.h3}>Annual</h3>
        <ul style={S.ul}>
          <li style={S.li}>Eddy current test — chiller tubes ka comprehensive inspection</li>
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
          <li style={S.li}>✓ Water quality test — chilled water aur condenser water</li>
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
          <li style={S.li}><strong>LOTO mandatory:</strong> Chiller maintenance se pehle full electrical isolation</li>
          <li style={S.li}><strong>Refrigerant safety:</strong> High pressure system — trained technician only, PPE mandatory</li>
          <li style={S.li}><strong>Water pressure:</strong> Chilled water system pressure hoti hai — isolation valves close karo pehle</li>
          <li style={S.li}><strong>Legionella risk:</strong> Cooling tower — Legionella bacteria growth possible. Regular treatment, trained personnel</li>
          <li style={S.li}><strong>Working at height:</strong> Cooling tower maintenance — fall protection zaroori</li>
          <li style={S.li}><strong>Hot surfaces:</strong> Compressor housing hot hota hai — burn hazard</li>
          <li style={S.li}><strong>Water leak response:</strong> Immediately notify, isolate, IT equipment protect karo</li>
          <li style={S.li}><strong>Standby confirm:</strong> Koi bhi maintenance se pehle standby chiller ready confirm karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Chiller aur CRAC mein fundamental difference kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> CRAC DX system hai — refrigerant directly air cool karta hai. Chiller indirect system hai — refrigerant pehle water cool karta hai, phir wo water CRAH ke through air cool karta hai. Chiller centralized hai, large scale ke liye. CRAC distributed hai, smaller applications ke liye.</p>

        <h3 style={S.h3}>Q2: COP kya hota hai? Good COP kya hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> COP = Coefficient of Performance = Cooling output (kW) / Power input (kW). Higher = more efficient. Air-cooled chiller: COP 2.5-4. Water-cooled chiller: COP 4-7+. Data center mein high COP target karo — electricity savings direct cost savings hain.</p>

        <h3 style={S.h3}>Q3: Chilled water delta T kya hota hai aur kyun important hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Delta T = CHWR temp - CHWS temp. Target: 5-7°C. High delta T = efficient heat transfer (less flow needed for same cooling). Low delta T = inefficient — pumps zyada energy use kar rahe hain. Delta T optimize karna = energy savings.</p>

        <h3 style={S.h3}>Q4: Free cooling (economizer mode) kya hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Jab outdoor temperature kaafi thandi ho, chiller compressor bypass karke outdoor air se directly chilled water cool hoti hai. "Free" because compressor nahi chalta — sirf pumps aur cooling tower fans. Winter mein significant energy savings — data center cooling cost 30-50% reduce ho sakti hai.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: CHWS temperature target se upar ja rahi hai</h3>
        <ul style={S.ul}>
          <li style={S.li}>Chiller running? Status check karo</li>
          <li style={S.li}>Chiller capacity: load vs capacity match?</li>
          <li style={S.li}>Condenser pressure high? → Cooling tower check karo</li>
          <li style={S.li}>Evaporator fouled? → Tube cleaning needed</li>
          <li style={S.li}>Standby chiller start karo yadi available</li>
        </ul>

        <h3 style={S.h3}>Scenario: Chiller trip ho gaya</h3>
        <ul style={S.ul}>
          <li style={S.li}>Immediately: Standby chiller start (auto ya manual)</li>
          <li style={S.li}>BMS ya chiller controller fault code read karo</li>
          <li style={S.li}>High condenser pressure? → Cooling tower check</li>
          <li style={S.li}>Electrical trip? → MCC panel check karo</li>
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
          <li style={S.li}><strong>N+1 minimum:</strong> Tier III ke liye. Tier IV ke liye 2N — separate chiller plants.</li>
          <li style={S.li}><strong>Delta T optimization:</strong> 5-7°C target. Regularly monitor — inefficiency indicator hai.</li>
          <li style={S.li}><strong>VFD pumps:</strong> Variable flow saves 30-40% pump energy vs constant flow.</li>
          <li style={S.li}><strong>Water treatment:</strong> Regular chemical treatment — scale aur corrosion prevent karo.</li>
          <li style={S.li}><strong>Free cooling evaluate karo:</strong> India mein winter months mein 2-3 months economizer possible.</li>
          <li style={S.li}><strong>Chiller sequencing:</strong> Part load pe fewer chillers — more efficient than all at low load.</li>
          <li style={S.li}><strong>Regular performance analysis:</strong> COP trend karo — degradation early detect karo.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Chiller ek refrigeration machine hai jo water thanda karta hai (6-7°C). Ye thanda water CRAH units se air cool karta hai.",
          "DX (CRAC/PAC) se fundamental difference: Chiller water cool karta hai, DX directly air. Chiller = centralized, DX = distributed.",
          "Chilled water system: Chiller → CHW Pumps → CRAH → return water → Chiller. Ye closed loop 24×7 continuous hai.",
          "Water-cooled chiller + cooling tower combination most efficient hai — COP 4-7+.",
          "Delta T (return - supply temperature) efficiency indicator hai. Target 5-7°C. Monitor karo.",
          "Large data centers (500 kW+) ke liye chiller plant economically aur operationally better than multiple CRAC units.",
          "Daily: CHWS/CHWR temp, delta T, chiller status, CT status. Monthly: water quality, standby test, strainers.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Chiller system complete hua. Aage cooling plant samjho:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — Chiller ki heat bahar kaise jaati hai — cooling tower complete guide.</li>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — Chhote data centers mein chiller alternative — DX cooling.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — Another DX cooling option — PAC detailed guide.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — CRAH se cool air efficiently deliver karna — containment strategies.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Cooling effectiveness measure karna.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
