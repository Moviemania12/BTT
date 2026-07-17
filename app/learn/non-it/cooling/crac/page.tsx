import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "CRAC — Computer Room Air Conditioner in Data Centers | Behind The Tech",
  description: "CRAC kya hota hai, PAC se kaise alag hai, kaise kaam karta hai — refrigeration cycle, components, types, maintenance aur troubleshooting. Simple language mein.",
  keywords: ["crac data center", "computer room air conditioner", "crac vs crah", "crac unit cooling", "data center cooling"],
  openGraph: {
    title: "CRAC — Computer Room Air Conditioner in Data Centers",
    description: "CRAC unit kaise kaam karta hai aur PAC se kaise alag hai — Data Center cooling ka complete guide.",
    url: "https://behindthetech.in/learn/non-it/cooling/crac",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: { card: "summary_large_image", title: "CRAC Explained — Behind The Tech", description: "Computer Room Air Conditioner — Data Center cooling unit, complete guide." },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/crac" },
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
    { label: "Ek line mein", text: "CRAC ek self-contained cooling unit hai — apna compressor rakhta hai, warm air andar kheenchta hai, cool air bahar nikalta hai." },
    { label: "PAC se kya fark", text: "CRAC aur PAC dono self-contained units hain. Technical difference: CRAC typically direct expansion (DX) cooling use karta hai external condenser ke saath. Practically, industry mein dono terms often interchangeably use hote hain." },
    { label: "CRAH se kya fark", text: "CRAH = Computer Room Air Handler. CRAH mein compressor nahi hota — wo chilled water use karta hai. CRAC apna compressor rakhta hai. Ye basic difference hai." },
    { label: "Kaha use hota hai", text: "Small to medium data centers, server rooms, telecom rooms. Jahan chiller plant nahi ho aur self-contained cooling chahiye." },
    { label: "Kaise kaam karta hai", text: "DX (Direct Expansion) refrigeration cycle — refrigerant directly evaporator mein expand hota hai aur air cool karta hai. Compressor, condenser (bahar), evaporator — ye teen main components hain." },
    { label: "Condenser kahan hota hai", text: "Air-cooled CRAC mein condenser building ke bahar hota hai — wall pe ya roof pe. Water-cooled mein condenser chiller ke chilled water loop se connected hota hai." },
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
  { q: "CRAC aur CRAH mein kya difference hai?", a: "CRAC = Computer Room Air Conditioner — apna compressor rakhta hai, DX cooling use karta hai. CRAH = Computer Room Air Handler — compressor nahi hota, chilled water use karta hai. CRAC self-contained hai. CRAH ko bahar se chilled water chahiye (chiller se)." },
  { q: "CRAC aur PAC mein kya difference hai?", a: "Industry mein dono terms often interchangeably use hote hain. Technical distinction: PAC typically more precise control with integrated all-in-one design, CRAC often has separate outdoor condenser unit. Practically, same function — Data Center cooling." },
  { q: "CRAC unit ki cooling capacity kaise measure hoti hai?", a: "kW ya BTU/hr mein. 1 kW = 3412 BTU/hr. Typical CRAC units: 10 kW se 100+ kW. Proper sizing ke liye IT load plus 20% buffer calculate karo." },
  { q: "Air-cooled CRAC mein outdoor condenser kahan lagta hai?", a: "Building ke bahar — wall pe ya roof pe. Condenser fans outdoor air se heat reject karte hain. Ambient temperature jyada ho to efficiency kam hoti hai (called 'derating')." },
  { q: "CRAC mein DX ka matlab kya hai?", a: "DX = Direct Expansion. Refrigerant directly evaporator mein expand hota hai aur air cool karta hai. No intermediate water loop. Direct means refrigerant aur air ke beech direct heat transfer (coil ke through)." },
  { q: "CRAC unit life expectancy kitni hoti hai?", a: "15-20 saal typical hai — agar proper maintenance ho. Compressor usually weakest component — 10-15 saal. Regular PM se life extend hoti hai." },
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
      <ArticleLayout slug="crac" headings={HEADINGS} readingTimeMinutes={16}>

        <p style={S.p}>Imagine karo ek 500 sqm server room. Hazaron servers. Round-the-clock operation.</p>
        <p style={S.p}>Sab servers heat generate kar rahe hain. Is heat ko kahin jaana hai.</p>
        <p style={S.p}><strong>PAC</strong> ke baare mein humne padha. CRAC bhi same problem solve karta hai — thoda alag approach se.</p>
        <p style={S.p}>CRAC = <strong>Computer Room Air Conditioner.</strong></p>
        <p style={S.p}>Ye naam hi sab kuch bata deta hai — specifically computer rooms (data centers) ke liye bana air conditioner.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/crac/crac-unit-server-room.png" alt="CRAC unit installed in a data center" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>CRAC unit — floor-mounted, typically 0.5m to 1m wide, 1.8m tall. Server room ke andar racks ke saath install hota hai.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-crac" style={S.h1}>What Is a CRAC?</h2>

        <p style={S.p}><strong>CRAC = Computer Room Air Conditioner.</strong></p>
        <p style={S.p}>Ye ek specialized, self-contained cooling unit hai jo Data Center aur Computer Rooms ke liye design kiya gaya hai.</p>
        <p style={S.p}>"Self-contained" ka matlab hai — iski refrigeration system apne andar hoti hai. Compressor iske andar ya directly connected external unit mein hota hai.</p>
        <p style={S.p}>CRAC ka kaam simple hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>Server racks se warm air kheencho</li>
          <li style={S.li}>Refrigeration cycle se cool karo</li>
          <li style={S.li}>Cool air wapas room mein bhejo</li>
          <li style={S.li}>Repeat — 24×7</li>
        </ul>

        <InsightCard>
          CRAC aur PAC mein industry mein bahut confusion hai. Technically, dono DX (Direct Expansion) cooling use karte hain. Practically, CRAC ka external condenser usually zyada visible hota hai — wall pe ya roof pe. PAC mein all-in-one ya close-coupled design zyada common hai. Lekin dono basically same technology hain — same goal, similar operation.
        </InsightCard>

        <DCMapNote components={["CRAC", "PAC", "CRAH", "Server Racks", "Condenser Unit (Outdoor)"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is CRAC Needed?</h2>

        <p style={S.p}>Servers electricity waste nahi karte — wo electricity ko computation mein use karte hain.</p>
        <p style={S.p}>Lekin har watt of electricity jo server consume karta hai, eventually heat mein convert hoti hai.</p>
        <p style={S.p}>Ye physics ka niyam hai — koi escape nahi.</p>
        <p style={S.p}><strong>Example:</strong> 1000W ka server = 1000W of heat generate karta hai.</p>
        <p style={S.p}>20 racks × 10 kW average = 200 kW of heat. Ye ek chhote ghar ko garam karne ke liye kaafi heat hai.</p>

        <WhyThisMatters>
          ASHRAE thermal guidelines ke according, server inlet temperature 18°C to 27°C honi chahiye (A1 class equipment). Agar ye range exceed ho to servers performance throttle karte hain, errors generate karte hain, aur thermal shutdown ho sakta hai. CRAC is temperature range ko maintain karta hai — no matter what the IT load is, no matter what the time of day.
        </WhyThisMatters>

        <p style={S.p}><strong>CRAC kyon specifically — normal AC kyon nahi?</strong></p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Continuous operation:</strong> CRAC 24×7×365 run karne ke liye rated hai</li>
          <li style={S.li}><strong>High sensible heat ratio:</strong> Servers sirf temperature badhate hain (moisture nahi) — CRAC is ke liye optimized hai</li>
          <li style={S.li}><strong>Precise control:</strong> ±1°C temperature aur ±5% humidity precision</li>
          <li style={S.li}><strong>High capacity per unit:</strong> 15-100+ kW per unit — normal AC 1-5 kW ka hota hai</li>
          <li style={S.li}><strong>BMS integration:</strong> Centralized monitoring aur alarm management</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>CRAC <strong>DX (Direct Expansion) refrigeration cycle</strong> use karta hai.</p>
        <p style={S.p}>"Direct Expansion" ka matlab hai ki refrigerant directly evaporator coil mein expand hota hai.</p>
        <p style={S.p}>Koi intermediate water loop nahi — refrigerant seedha air ke saath heat transfer karta hai.</p>

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
        <p style={S.p}><strong>Step 1 — Evaporator (andar, room mein):</strong> Low pressure liquid refrigerant evaporator coil mein aata hai. Server se warm air is coil ke upar se guzarti hai. Refrigerant heat absorb karke gas ban jaata hai. Air thandi ho jaati hai.</p>
        <p style={S.p}><strong>Step 2 — Compressor:</strong> Low pressure refrigerant gas compressor mein jaati hai. High pressure mein compress hoti hai. Temperature bhi badh jaata hai.</p>
        <p style={S.p}><strong>Step 3 — Condenser (bahar, building ke baahar):</strong> Hot high-pressure gas outdoor condenser unit mein jaati hai. Outdoor fans se ambient air se heat reject hoti hai. Gas liquid ban jaati hai. Ye heat effectively bahar chali jaati hai.</p>
        <p style={S.p}><strong>Step 4 — Expansion Valve:</strong> High pressure liquid expansion valve se guzarti hai. Pressure suddenly drop hoti hai. Refrigerant thanda ho jaata hai. Phir evaporator mein — cycle complete.</p>

        <EngineerTip>
          DX system aur chilled water system mein ye fundamental difference samjho: DX mein refrigerant directly air ko cool karta hai. Chilled water system mein refrigerant pehle water cool karta hai, phir wo cool water CRAH mein air cool karta hai. DX simpler hai but limited capacity. Chilled water system complex hai but centralized cooling ke liye better — isliye large data centers mein chillers use hote hain.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>Indoor Unit</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Evaporator Coil:</strong> Refrigerant se air cool hoti hai yahan. Copper tubes + aluminum fins.</li>
          <li style={S.li}><strong>Blower / Fan:</strong> Air ko kheenchta aur cirulate karta hai. EC motors modern units mein.</li>
          <li style={S.li}><strong>Air Filter:</strong> Dust particles rokta hai — coil ko protect karta hai.</li>
          <li style={S.li}><strong>Humidifier:</strong> Steam ya electrode type — humidity add karta hai jab required.</li>
          <li style={S.li}><strong>Electric Heater:</strong> Cold weather mein temperature maintain karta hai.</li>
          <li style={S.li}><strong>Microprocessor Controller:</strong> Temperature, humidity, alarms — sab control karta hai.</li>
          <li style={S.li}><strong>Condensate Pan + Drain:</strong> Dehumidification se jo paani nikalta hai, wo yahan collect hota hai.</li>
        </ul>

        <h3 style={S.h3}>Outdoor Unit (Condenser)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Compressor:</strong> Refrigeration cycle ka heart — scroll ya reciprocating type.</li>
          <li style={S.li}><strong>Condenser Coil:</strong> High pressure refrigerant gas se heat reject hoti hai.</li>
          <li style={S.li}><strong>Condenser Fans:</strong> Outdoor air se heat reject karte hain. Speed-controlled modern units mein.</li>
          <li style={S.li}><strong>Refrigerant Pipework:</strong> Indoor aur outdoor unit ko connect karta hai — insulated copper pipes.</li>
          <li style={S.li}><strong>Sight Glass:</strong> Refrigerant level aur quality visual check.</li>
          <li style={S.li}><strong>Service Valves:</strong> Maintenance ke liye refrigerant isolate karne ke valves.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How CRAC Works Inside a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/crac/crac-airflow-data-center.png" alt="CRAC unit airflow pattern in data center with hot and cold aisles" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>CRAC unit airflow — return air top se andar, supply air bottom se (raised floor through perforated tiles) ya direct front se.</figcaption>
        </figure>

        <p style={S.p}>CRAC unit server room mein floor pe lagta hai — typically server racks ke end mein ya room ki wall ke paas.</p>

        <h3 style={S.h3}>Downflow CRAC (Most Common)</h3>
        <p style={S.p}>Warm return air unit ke upar se andar aata hai. Evaporator coil se cool hota hai. Cool supply air neeche — raised floor mein — enter karta hai. Perforated floor tiles ke through cold aisle mein aata hai. Servers cool air kheenchte hain. Warm exhaust air hot aisle mein — phir CRAC mein return. Cycle complete.</p>

        <h3 style={S.h3}>Upflow CRAC (No Raised Floor)</h3>
        <p style={S.p}>Warm return air bottom se enter karta hai. Cool supply air top se nikalta hai. Ceiling level pe distribute hota hai ya overhead ducts se. Servers tak pahunchne mein mixing zyada hoti hai — thodi less efficient.</p>

        <InsightCard>
          Data Center mein CRAC unit placement critical hai. Rule of thumb: har 5-7 racks pe ek CRAC unit. Units room mein evenly distribute karo — corners ya walls pe mat lagao — cooling uniform rahegi. Hot spots tabhi aate hain jab cooling units maldistributed hon.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of CRAC</h2>

        <h3 style={S.h3}>1. Air-Cooled CRAC</h3>
        <p style={S.p}>Condenser heat ko outdoor air se reject karta hai. External condenser unit building ke bahar lagta hai. Most common type. Simpler installation — pani ki supply nahi chahiye. High ambient temperature pe efficiency kam hoti hai.</p>

        <h3 style={S.h3}>2. Water-Cooled CRAC</h3>
        <p style={S.p}>Condenser heat ko cooling water se reject karta hai. Water chiller ya cooling tower se supply hoti hai. Air-cooled se better efficiency — ambient temperature independent. Water infrastructure zaroori hai.</p>

        <h3 style={S.h3}>3. Glycol-Cooled CRAC</h3>
        <p style={S.p}>Water-cooled variant — glycol-water mixture use karta hai. Freeze protection ke liye — cold climates mein. Dry cooler (fluid cooler) bahar lagta hai — no evaporation, no refrigerant in outdoor unit.</p>

        <h3 style={S.h3}>4. Chilled Water CRAC (CRAH)</h3>
        <p style={S.p}>Technically ye CRAH (Air Handler) ban jaata hai jab chilled water use hoti hai. No compressor inside unit. Just fan + water coil. Chiller system provide karta hai chilled water. Large data centers prefer this for scalability.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Self-contained DX system:</strong> No chiller plant needed — simpler infrastructure</li>
          <li style={S.li}><strong>Quick deployment:</strong> Install karo, refrigerant charge karo, commissioning — ready</li>
          <li style={S.li}><strong>Precision cooling:</strong> Temperature aur humidity precise control</li>
          <li style={S.li}><strong>Continuous duty rated:</strong> 24×7×365 operation</li>
          <li style={S.li}><strong>Modular:</strong> Load badhne pe units add karo</li>
          <li style={S.li}><strong>N+1 redundancy:</strong> Easy to achieve</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>External condenser:</strong> Building ke bahar unit chahiye — site constraints</li>
          <li style={S.li}><strong>Ambient dependency:</strong> High outdoor temperature pe cooling capacity reduce hoti hai</li>
          <li style={S.li}><strong>Limited scalability:</strong> Very large data centers ke liye chiller plant more efficient hai</li>
          <li style={S.li}><strong>Compressor maintenance:</strong> Moving parts — wear and tear, eventually replacement</li>
          <li style={S.li}><strong>Refrigerant leak risk:</strong> Piping connections pe leak possible</li>
          <li style={S.li}><strong>Noise:</strong> Compressor aur condenser fans noise generate karte hain</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Setup:</strong> Telecom company ka 300 sqm server room. 30 racks, average 8 kW per rack = 240 kW total heat load.</p>
        <p style={S.p}><strong>Cooling design:</strong> Air-cooled CRAC, 30 kW capacity per unit. 9 units required (270 kW) + 1 standby = 10 units total (N+1).</p>
        <p style={S.p}><strong>Layout:</strong> 5 units each side of the room. Downflow units with raised floor 600mm height.</p>
        <p style={S.p}><strong>Outdoor:</strong> 10 condenser units roof pe — each paired with indoor CRAC unit.</p>
        <p style={S.p}><strong>Control:</strong> All units connected to BMS. Master/slave configuration — automatic standby rotation every 30 days.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>High Supply Air Temperature</h3>
        <p style={S.p}>Possible causes: Dirty filter, low refrigerant, high ambient temperature, compressor issue. Action: Filter check, refrigerant pressure check, condenser clean karo.</p>

        <h3 style={S.h3}>Compressor Trip</h3>
        <p style={S.p}>Possible causes: High head pressure, low suction pressure, overload, internal fault. Action: Standby unit confirm running → fault code read karo → qualified technician call karo.</p>

        <h3 style={S.h3}>Condenser Fan Failure</h3>
        <p style={S.p}>Possible causes: Motor fault, belt break (older units), blade damage. Effect: High head pressure → compressor trip. Action: Fan replace karo.</p>

        <h3 style={S.h3}>Refrigerant Leak</h3>
        <p style={S.p}>Possible causes: Pipe joint wear, valve leak, coil damage. Signs: Low suction pressure, poor cooling, ice on evaporator coil. Action: Leak detect karo → repair → recharge — licensed technician only.</p>

        <h3 style={S.h3}>Humidity Out of Range</h3>
        <p style={S.p}>Possible causes: Humidifier failure, dehumidification issue, water supply. Action: Humidity sensor verify karo, humidifier status check karo.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <h3 style={S.h3}>Quarterly PM</h3>
        <ul style={S.ul}>
          <li style={S.li}>Air filter clean / replace</li>
          <li style={S.li}>Evaporator coil inspect aur clean</li>
          <li style={S.li}>Condensate drain clear karo</li>
          <li style={S.li}>Refrigerant pressure check — suction aur discharge</li>
          <li style={S.li}>Superheat aur subcooling measure karo</li>
          <li style={S.li}>Electrical connections tighten karo</li>
          <li style={S.li}>Compressor current draw check karo</li>
          <li style={S.li}>Controller settings verify karo</li>
        </ul>

        <h3 style={S.h3}>Outdoor Condenser PM</h3>
        <ul style={S.ul}>
          <li style={S.li}>Condenser coil clean karo — fin straightener use karo</li>
          <li style={S.li}>Fan blades inspect karo</li>
          <li style={S.li}>Fan motor current draw</li>
          <li style={S.li}>Refrigerant pipe insulation check karo</li>
          <li style={S.li}>Weather proofing check karo</li>
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
          <li style={S.li}>✓ Filter inspect — clean ya replace</li>
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
          <li style={S.li}><strong>LOTO procedure:</strong> Maintenance se pehle electrical isolation mandatory</li>
          <li style={S.li}><strong>Refrigerant handling:</strong> Certified technician only — direct exposure harmful</li>
          <li style={S.li}><strong>High pressure hazard:</strong> Refrigerant system ko unauthorized mat kholo</li>
          <li style={S.li}><strong>Outdoor unit safety:</strong> Condenser fan running hote waqt clearance maintain karo</li>
          <li style={S.li}><strong>Working at height:</strong> Roof pe condenser maintenance — fall protection zaroori</li>
          <li style={S.li}><strong>Standby confirm:</strong> Maintenance se pehle standby unit running confirm karo</li>
          <li style={S.li}><strong>PPE:</strong> Gloves, safety glasses, proper footwear</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: CRAC aur CRAH mein kya difference hai?</h3>
        <p style={S.p}><strong>Answer:</strong> CRAC apna compressor rakhta hai aur DX cooling use karta hai — self-contained unit. CRAH mein compressor nahi hota — wo bahar se chilled water use karta hai (chiller plant se). CRAC = complete unit. CRAH = just air handler, chiller alag hota hai.</p>

        <h3 style={S.h3}>Q2: CRAC unit sizing kaise karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> IT load calculate karo (kW mein). N+1 redundancy ke liye: N units full load handle karein, 1 extra standby. Example: 100 kW load, 20 kW per unit → 5 units needed + 1 standby = 6 total. Har unit 80% load pe run karna best practice hai.</p>

        <h3 style={S.h3}>Q3: High head pressure alarm kya indicate karta hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Condenser side problem. Possible causes: dirty condenser coil, condenser fan failure, high ambient temperature, refrigerant overcharge. Compressor trip ho sakta hai. Immediate action: condenser check karo, fan status verify karo.</p>

        <h3 style={S.h3}>Q4: CRAC mein superheat kya hota hai aur kyun measure karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Superheat = evaporator outlet pe refrigerant gas temperature minus saturation temperature. Target: 6-12°C superheat. Kam superheat → liquid refrigerant compressor mein jaa sakta hai (liquid slugging — dangerous). Zyada superheat → low refrigerant ya expansion valve problem. Refrigerant charge verify karne ka method hai.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Room temperature 28°C se upar ja raha hai</h3>
        <ul style={S.ul}>
          <li style={S.li}>Kitne CRAC units actually running? → Sab active hone chahiye</li>
          <li style={S.li}>Filter clog? → Differential pressure check</li>
          <li style={S.li}>Supply air temperature measure karo → PAC se thandi aa rahi hai?</li>
          <li style={S.li}>Hot/cold aisle mixing? → Blanking panels check karo</li>
          <li style={S.li}>New IT equipment add hua? → Heat load recalculate karo</li>
          <li style={S.li}>Outdoor ambient temperature → High ambient → derating effect</li>
        </ul>

        <h3 style={S.h3}>Scenario: Compressor trip ho gaya</h3>
        <ul style={S.ul}>
          <li style={S.li}>Standby unit immediately running confirm karo</li>
          <li style={S.li}>Controller fault code read karo</li>
          <li style={S.li}>High head pressure alarm? → Condenser fan check karo</li>
          <li style={S.li}>Low suction pressure? → Refrigerant leak suspect</li>
          <li style={S.li}>Overload trip? → Electrical check karo</li>
          <li style={S.li}>Qualified HVAC technician call karo — DIY mat karo</li>
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
          <li style={S.li}><strong>N+1 always:</strong> Minimum ek standby unit — failure hone pe no downtime</li>
          <li style={S.li}><strong>Standby rotation:</strong> Primary aur standby regularly switch karo — equal wear</li>
          <li style={S.li}><strong>Hot/cold aisle separation:</strong> CRAC cooling 30-40% zyada efficient ho jaati hai</li>
          <li style={S.li}><strong>Filter maintenance schedule:</strong> Mark it on calendar — skip mat karo</li>
          <li style={S.li}><strong>Setpoint consistency:</strong> Sab CRAC units same setpoint pe chalaao</li>
          <li style={S.li}><strong>Outdoor condenser clearance:</strong> Minimum 1m clearance sab sides pe — airflow block mat karo</li>
          <li style={S.li}><strong>BMS integration:</strong> Sab units monitor karo — manual rounds kaafi nahi hote</li>
          <li style={S.li}><strong>Annual refrigerant audit:</strong> Licensed technician se system check karwao</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "CRAC = Computer Room Air Conditioner — Data Center cooling ke liye specifically design kiya gaya self-contained unit.",
          "DX (Direct Expansion) cooling use karta hai — refrigerant directly air cool karta hai. Compressor outdoor condenser unit mein hota hai.",
          "PAC aur CRAC industry mein often same thing ke liye use hote hain — dono DX cooling, dono precision cooling units hain.",
          "CRAH se fundamental difference: CRAH mein compressor nahi hota — chilled water use karta hai. CRAC self-contained hai.",
          "N+1 redundancy mandatory hai — koi bhi unit fail ho to operations impact nahi hone chahiye.",
          "Daily checks: supply air temp, return air temp, humidity, alarms. Monthly: filter, drain, switchover test.",
          "Common faults: high head pressure (condenser issue), compressor trip, low refrigerant, filter clog — sabke causes aur actions yaad rakho.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>CRAC clear ho gaya. Cooling system aage badhao:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — CRAC ka close cousin — precision cooling unit.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — Large data centers mein centralized chilled water system.</li>
          <li style={S.li}><TopicLink slug="cooling-tower" variant="inline" /> — Chiller ke saath kaam karta hai — heat rejection to atmosphere.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Aisle containment — CRAC/PAC efficiency improve karta hai.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — Cool air ko sahi jagah kaise pahunchao.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
