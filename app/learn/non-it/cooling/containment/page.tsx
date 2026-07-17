import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Containment — Hot Aisle & Cold Aisle Containment in Data Centers | Behind The Tech",
  description: "Aisle containment kya hai, HAC vs CAC, kaise implement hota hai, kyun zaroori hai — Data Center cooling efficiency improve karne ka sabse effective method.",
  keywords: ["aisle containment data center", "hot aisle containment", "cold aisle containment", "HAC CAC data center", "data center cooling efficiency"],
  openGraph: { title: "Containment — Aisle Containment in Data Centers", description: "Hot aisle aur cold aisle containment — Data Center cooling efficiency ka sabse practical improvement.", url: "https://behindthetech.in/learn/non-it/cooling/containment", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "Containment Explained — Behind The Tech", description: "Hot/Cold Aisle Containment — Data Center cooling improvement guide." },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/containment" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-containment",   text: "What Is Containment?",              level: 2 },
  { id: "why-needed",            text: "Why Is Containment Needed?",        level: 2 },
  { id: "working-principle",     text: "Working Principle",                 level: 2 },
  { id: "main-components",       text: "Main Components",                   level: 2 },
  { id: "how-it-works-in-dc",    text: "How Containment Works",             level: 2 },
  { id: "types",                 text: "Types of Containment",              level: 2 },
  { id: "advantages",            text: "Advantages",                        level: 2 },
  { id: "disadvantages",         text: "Disadvantages",                     level: 2 },
  { id: "real-example",          text: "Real Data Center Example",          level: 2 },
  { id: "common-faults",         text: "Common Issues",                     level: 2 },
  { id: "preventive-maintenance",text: "Preventive Maintenance",            level: 2 },
  { id: "daily-checklist",       text: "Daily Checklist",                   level: 2 },
  { id: "monthly-checklist",     text: "Monthly Checklist",                 level: 2 },
  { id: "safety",                text: "Safety Precautions",                level: 2 },
  { id: "interview-questions",   text: "Interview Questions",               level: 2 },
  { id: "troubleshooting",       text: "Troubleshooting",                   level: 2 },
  { id: "comparison",            text: "HAC vs CAC vs No Containment",      level: 2 },
  { id: "best-practices",        text: "Best Practices",                    level: 2 },
  { id: "key-takeaways",         text: "Key Takeaways",                     level: 2 },
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
    { label: "Ek line mein", text: "Containment cool air aur hot air ko physically separate karta hai — taaki dono mix na hon. Isse cooling efficiency dramatically improve hoti hai." },
    { label: "Problem kya hai bina containment", text: "PAC/CRAC cool air deliver karta hai. Hot air wapas aane se pehle cool air se mix ho jaati hai. PAC ko double mehnat karni padti hai — pehle se thanda kiya hua air phir se warm ho gaya." },
    { label: "Cold aisle containment (CAC)", text: "Cold aisle ke upar aur ends pe enclosure lagaate hain. Cool air wahan capture hoti hai. Sirf server intake cool air kheenchte hain. Hot air alag rehti hai." },
    { label: "Hot aisle containment (HAC)", text: "Hot aisle ke upar aur ends pe enclosure. Hot air capture hoti hai. Directly PAC/CRAC ya chimney ke through return. Cool air room mein rehti hai." },
    { label: "Improvement kitni", text: "Containment se cooling efficiency 30-50% improve ho sakti hai. Same cooling load pe kam cooling units ya higher setpoints — energy savings significant." },
    { label: "Blanking panels", text: "Containment ke saath blanking panels bhi zaroori hain — khali rack spaces block karo. Warm air front se andar na aaye. Small thing, big impact." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>🚧 QUICK SUMMARY — 2 MINUTE READ</span>
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

const FAQS = [
  { q: "CAC aur HAC mein kaun better hai?", a: "Dono effective hain. HAC generally better cooling efficiency deta hai — hot air directly captured aur returned, room ka cool air server intake ke liye available rehta hai. CAC implement karna thoda simpler hai. Choose based on existing layout, fire suppression requirements, aur cost. Many modern data centers HAC prefer karte hain." },
  { q: "Containment ke baad temperature setpoint badha sakte hain?", a: "Haan — ye ek major benefit hai. Bina containment ke, cold aisle 18-20°C chahiye kyunki mixing hoti hai. Containment ke baad, cold aisle 24-26°C ho sakti hai — server inlet still within spec. Higher setpoint = PAC/CRAC less kaam karta hai = energy savings." },
  { q: "Fire suppression ke saath containment kaise kaam karta hai?", a: "Ye ek real concern hai. HAC mein hot aisle enclosed hai. Fire suppression agent is enclosed space mein sahi tarah distribute hona chahiye. FM200 ya Novec — engineer se design validate karo. Some facilities mein containment doors automatic open ho jaate hain fire signal pe." },
  { q: "Blanking panels kyon important hain containment ke saath?", a: "Blanking panels khali rack spaces seal karte hain. Bina blanking panels ke, hot exhaust air front se rack ke through wapas aa sakti hai — hot/cold mixing. Containment ke saath bhi, blanking panels zaroori hain — perfect seal ensure karte hain." },
  { q: "Raised floor pe containment implement kaise hota hai?", a: "Raised floor ke saath downflow PAC/CRAC use hoti hai. Cold aisle mein perforated tiles hoti hain — cool air yahan se aata hai. Cold aisle containment mein: cold aisle ka top aur ends seal karo. Cool air sirf server intake kheechte hain — perfect separation." },
  { q: "Existing data center mein containment retrofit karna possible hai?", a: "Haan — ye common practice hai. Retrofit containment systems available hain — modular panels jo existing infrastructure pe fit hote hain. Planning zaroori hai: power paths, cable management, fire suppression, emergency access. ROI typically 1-3 years energy savings se." },
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

export default function ContainmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="containment" headings={HEADINGS} readingTimeMinutes={16}>

        <p style={S.p}>PAC thanda air deliver karta hai. CRAC thanda air deliver karta hai.</p>
        <p style={S.p}>Lekin ye thanda air seedha server mein nahi jaata — pehle room mein jaata hai, wahan warm air se mix hota hai, aur phir mixed (warmer) air server mein jaata hai.</p>
        <p style={S.p}>Iska matlab: PAC ne 18°C air deliver ki. Room mein mixing ke baad, server ko 24°C air mil rahi hai.</p>
        <p style={S.p}>PAC extra mehnat kar raha hai — aur phir bhi server ko warm air mil rahi hai.</p>
        <p style={S.p}><strong>Solution: Containment — cool air aur hot air ko physically separate karo.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/containment/aisle-containment-data-center.png" alt="Cold aisle containment with clear panels above server racks" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Cold Aisle Containment — transparent panels cold aisle ke upar aur ends pe lagate hain. Cool air enclosed rehti hai.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-containment" style={S.h1}>What Is Containment?</h2>

        <p style={S.p}><strong>Containment = Physical barrier jo cool air aur hot air ko alag rakhti hai.</strong></p>
        <p style={S.p}>Data center mein server racks rows mein lagaye jaate hain. Racks ke beech aisles hoti hain.</p>
        <p style={S.p}><strong>Cold Aisle:</strong> Jahan PAC/CRAC cool air deliver karta hai. Servers ka front face karta hai yahan.</p>
        <p style={S.p}><strong>Hot Aisle:</strong> Jahan servers warm air exhaust karte hain. Servers ka back face karta hai yahan.</p>
        <p style={S.p}>Bina containment ke, dono aisles ki air freely mix ho jaati hai — inefficiency.</p>
        <p style={S.p}>Containment se: cool air aur hot air alag channels mein rehti hain — efficiency dramatically improve hoti hai.</p>

        <DCMapNote components={["Cold Aisle Containment", "Hot Aisle Containment", "Blanking Panels", "Cage Doors", "Chimney Containment"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Containment Needed?</h2>

        <p style={S.p}>Mixing problem ko practically samjho:</p>

        <InsightCard>
          Bina containment ke kya hota hai: PAC 15°C air deliver karta hai cold aisle mein. Server hot air (35°C) hot aisle mein exhaust karta hai. Ye hot air return path pe cool air se milti hai. Server intake pe actual temperature: 22-25°C. PAC ko 15°C tak cool karna pada kyunki 7-10°C mixing ki inefficiency thi. Agar containment hota to PAC 22°C pe cool karta — same server inlet temperature. Less cooling work = less energy.
        </InsightCard>

        <WhyThisMatters>
          Gartner research (referenced in ASHRAE guidelines) ke according, data centers globally apni cooling capacity ka 30-40% air mixing pe waste karte hain. Containment implement karne se: cooling capacity effectively 30-50% improve hoti hai bina new cooling units lagaye. Existing PAC/CRAC zyada load handle kar sakte hain. Temperature setpoints raise ho sakte hain — further energy savings.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Containment ka principle simple hai: <strong>Keep cold air cold. Keep hot air hot. Never let them mix.</strong></p>
        <p style={S.p}>Ye achieve karte hain physical barriers se:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Overhead panels:</strong> Aisles ke upar — ceiling tak seal karte hain</li>
          <li style={S.li}><strong>End-of-row doors:</strong> Aisle ke ends band karte hain</li>
          <li style={S.li}><strong>Blanking panels:</strong> Rack ke khali spaces seal karte hain</li>
          <li style={S.li}><strong>Raised floor sealing:</strong> Proper tiles placement — cool air sirf cold aisle mein</li>
        </ul>
        <p style={S.p}>Result: Cool air ek closed system mein rakhti hai servers tak pahunchne ke liye. Hot air separately collected aur PAC/CRAC ya chimney ke through return hoti hai.</p>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Overhead Panels (Ceiling Panels)</h3>
        <p style={S.p}>Aisle ke upar lagaye jaate hain — rack tops se actual ceiling tak gap seal karte hain. Rigid polycarbonate ya metal panels. Some designs mein transparent — visual access maintain hota hai. Fire suppression compatibility consider karo.</p>

        <h3 style={S.h3}>2. End-of-Row Doors</h3>
        <p style={S.p}>Aisle ke dono ends pe. Cable management ke liye cutouts hote hain. Hinged ya sliding — access ke liye. Emergency exit requirements comply karna chahiye. Some designs automatic — fire signal pe khulte hain.</p>

        <h3 style={S.h3}>3. Blanking Panels</h3>
        <p style={S.p}>Rack ke khali 1U, 2U spaces mein fit hote hain. Hot air ko front se rack ke through aane se rokta hai. Cheap but highly effective — ye zaroori hai. Different rack sizes ke liye different blanking panels available.</p>

        <h3 style={S.h3}>4. Raised Floor Tiles</h3>
        <p style={S.p}>Cold aisle mein perforated tiles — cool air nikalne ke liye. Hot aisle mein solid tiles — cool air mat nikalne do. Proper tile placement containment ka part hai.</p>

        <h3 style={S.h3}>5. Cable Management</h3>
        <p style={S.p}>Containment ke andar cables properly managed honni chahiye. Cable cutouts pe proper brush strips ya foam seals — airtight seal maintain karo.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Containment Works</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/containment/hot-cold-aisle-airflow.png" alt="Hot aisle and cold aisle airflow with containment showing separation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Containment with clearly separated hot and cold air streams — zero mixing between aisles.</figcaption>
        </figure>

        <h3 style={S.h3}>Without Containment</h3>
        <p style={S.p}>Cool air → cold aisle → server intakes → some cool air bypass ho jaata hai → hot aisle → room mein mixing → PAC return → again cool karo. Inefficient loop.</p>

        <h3 style={S.h3}>With Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Cool air → enclosed cold aisle → only server intakes kheench sakte hain (side pe ja nahi sakti) → servers ke through → hot aisle (open) → PAC/CRAC return. Zero mixing cold aisle mein.</p>

        <h3 style={S.h3}>With Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Room = cool air everywhere (open space). Servers cool air front se kheechte hain. Warm exhaust → enclosed hot aisle → directly PAC/CRAC ya overhead chimney mein. Zero mixing in hot aisle. Room mein sirf cool air hai — any server failure bhi covered hai.</p>

        <EngineerTip>
          HAC preferred hai large data centers mein kyunki: Room mein cool air everywhere rehti hai. If a rack accidentally faces wrong way, ya a blanking panel missing hai, wo server still cool air milti hai (room mein hai). CAC mein missing blanking panel = hot air directly server intake mein — worse failure mode. HAC more forgiving hai operationally.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Containment</h2>

        <h3 style={S.h3}>1. Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Cold aisle enclosed karo. Overhead panels + end doors. Cool air trapped — only server intakes kheench sakte hain. Hot aisle open rehta hai — hot air freely mixes with room and returns to PAC. Simpler to implement. Common in smaller facilities.</p>

        <h3 style={S.h3}>2. Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Hot aisle enclosed karo. Overhead panels + end doors. Hot air trapped — directly to PAC/CRAC return or overhead chimney. Room completely cool air mein. Preferred in large data centers. Better fire safety (sprinklers in hot aisle enclosed space — get it right).</p>

        <h3 style={S.h3}>3. Chimney Containment</h3>
        <p style={S.p}>Per-rack chimneys. Hot air directly upar se ceiling plenum ya overhead return duct mein jaata hai. No overhead aisle enclosure — flexible. Works with in-row cooling very well. High-density environments ke liye.</p>

        <h3 style={S.h3}>4. Full Room Isolation</h3>
        <p style={S.p}>Entire room sealed. Separate supply (cold) plenum aur return (hot) plenum. Usually with raised floor + overhead return. Maximum efficiency — minimum mixing. Large hyperscale facilities mein.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Cooling efficiency 30-50% improve:</strong> Same cooling units, more effective cooling</li>
          <li style={S.li}><strong>Higher temperature setpoints:</strong> PAC/CRAC setpoint raise karo — energy save karo</li>
          <li style={S.li}><strong>Reduced cooling capacity needed:</strong> Existing units se zyada load handle ho sakta hai</li>
          <li style={S.li}><strong>Better RCI:</strong> Rack Cooling Index improve hota hai — uniform cooling</li>
          <li style={S.li}><strong>Hot spots eliminate:</strong> Mixing na hone se specific hot spots create nahi hote</li>
          <li style={S.li}><strong>PUE improvement:</strong> Cooling energy reduction = better Power Usage Effectiveness</li>
          <li style={S.li}><strong>Retrofit possible:</strong> Existing data centers mein implement ho sakta hai</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fire suppression complexity:</strong> Enclosed aisle mein fire agent distribution — engineering required</li>
          <li style={S.li}><strong>Cable management:</strong> Containment panels ke through cables manage karna tricky ho sakta hai</li>
          <li style={S.li}><strong>Upfront cost:</strong> Panels, doors, installation — investment chahiye</li>
          <li style={S.li}><strong>Flexibility reduce:</strong> Layout changes ke liye containment modify karna padega</li>
          <li style={S.li}><strong>Cooling failure risk (CAC):</strong> Agar PAC fails aur cold aisle enclosed hai, temperature rapidly rise hogi</li>
          <li style={S.li}><strong>Maintenance access:</strong> Some containment designs mein work access limited hoti hai</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Before containment:</strong> 100-rack data center, 10 PAC units (20 kW each = 200 kW total). Server inlet temperatures: 24-32°C — hot spots present. PAC supply temperature: 16°C.</p>
        <p style={S.p}><strong>Containment implemented:</strong> Hot aisle containment (HAC) with chimney. Blanking panels all empty rack spaces.</p>
        <p style={S.p}><strong>After containment:</strong> Same 10 PAC units. PAC supply temperature raised to 21°C. Server inlet temperatures: 22-26°C — uniform. Hot spots eliminated. 2 PAC units now standby — 8 handle same load. Estimated energy savings: 25% cooling energy.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Issues</h2>

        <h3 style={S.h3}>Bypass Air (Air Bypass)</h3>
        <p style={S.p}>Cool air racks tak pahunche bina room mein ja rahi hai. Cause: Missing blanking panels, gaps in containment, improper floor tiles. Action: Air leakage audit, blanking panels install, gaps seal karo.</p>

        <h3 style={S.h3}>Recirculation</h3>
        <p style={S.p}>Hot exhaust air wapas server intake mein ja rahi hai. Cause: Containment damage, end door open, missing panels. Action: Inspect containment integrity, temperature mapping karo.</p>

        <h3 style={S.h3}>Containment Panel Damage</h3>
        <p style={S.p}>Cause: Physical damage during installation/maintenance, material degradation. Impact: Air mixing at damage points. Action: Visual inspection, replace damaged panels.</p>

        <h3 style={S.h3}>Fire Suppression Issue</h3>
        <p style={S.p}>Cause: FM200/Novec nozzles not covering enclosed aisle. Impact: Fire suppression ineffective if fire in contained aisle. Action: Fire engineer review — containment + suppression design together.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Monthly:</strong> All blanking panels present — walk every row, visually check</li>
          <li style={S.li}><strong>Monthly:</strong> Containment panels — cracks, gaps, seal integrity</li>
          <li style={S.li}><strong>Monthly:</strong> End doors — closing properly, seals intact</li>
          <li style={S.li}><strong>Quarterly:</strong> Floor tiles — correct placement (perforated in cold aisle only)</li>
          <li style={S.li}><strong>Quarterly:</strong> Cable cutout seals — brush strips ya foam intact</li>
          <li style={S.li}><strong>Semi-annual:</strong> Thermal survey — temperature mapping confirm containment working</li>
          <li style={S.li}><strong>Annual:</strong> Full containment audit — any new racks se gaps created?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Cold aisle temperatures — uniformly cool (within 2-3°C variation)?</li>
          <li style={S.li}>✓ Hot aisle temperatures — hot but contained?</li>
          <li style={S.li}>✓ Any obvious containment damage visible?</li>
          <li style={S.li}>✓ End doors closed (except during maintenance)?</li>
          <li style={S.li}>✓ BMS hot spot alarms?</li>
          <li style={S.li}>✓ New equipment installed recently — blanking panels still in place?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Walk every row — blanking panels count karo</li>
          <li style={S.li}>✓ Panel seal integrity — gaps check karo</li>
          <li style={S.li}>✓ Floor tiles placement verify karo</li>
          <li style={S.li}>✓ Cable cutout seals intact?</li>
          <li style={S.li}>✓ Temperature uniformity verify — spot check multiple racks</li>
          <li style={S.li}>✓ Any new racks added — containment accommodate karta hai?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fire suppression review:</strong> Containment change karne se pehle fire engineer se check karo</li>
          <li style={S.li}><strong>Emergency egress:</strong> Contained aisles mein clear emergency exit paths — doors panic hardware ke saath</li>
          <li style={S.li}><strong>Working in contained space:</strong> Hot aisle mein temperature high hoti hai — short duration, water sath rakho, buddy system</li>
          <li style={S.li}><strong>Cooling failure plan:</strong> Agar cooling fail ho aur aisle enclosed hai — temperature rapidly rise karta hai. Automatic door open systems consider karo</li>
          <li style={S.li}><strong>Panel installation:</strong> Above-rack work ke liye ladder, safety — heavy panels carefully handle karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Hot aisle containment aur cold aisle containment mein kya difference hai?</h3>
        <p style={S.p}><strong>Answer:</strong> CAC (Cold Aisle Containment) cold aisle ko enclose karta hai — cool air servers tak seedhi pahunche. Hot aisle open rehta hai. HAC (Hot Aisle Containment) hot aisle enclose karta hai — hot air capture karke directly PAC return mein. Room mein cool air everywhere. HAC operationally safer hai — any rack mein cool air access hoti hai.</p>

        <h3 style={S.h3}>Q2: Containment se RCI kaise improve hota hai?</h3>
        <p style={S.p}><strong>Answer:</strong> RCI (Rack Cooling Index) measure karta hai ki servers ko recommended temperature range mein cool air mil rahi hai. Bina containment ke, hot/cold mixing se kuch servers warm air kheenchte hain — low RCI. Containment ensure karta hai ki har server cool air hi kheenche. RCI 100% ke karib hoti hai containment ke saath.</p>

        <h3 style={S.h3}>Q3: Blanking panels kyon important hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Rack ke khali spaces se hot exhaust air wapas front mein recirculate ho sakti hai — server intake par hot air milti hai. Blanking panels ye shortcircuit rokta hai. Simple, cheap, lekin critical. Containment ke bina bhi blanking panels lagana best practice hai.</p>

        <h3 style={S.h3}>Q4: Containment ke saath fire suppression design kaise karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Ye critical question hai. Enclosed aisle mein fire suppression agent (FM200/Novec) properly distribute hona chahiye. FM200 nozzles contained aisle volume ke liye calculate karo. Some designs mein: fire signal pe containment doors automatically open ho jaate hain aur agent poore room mein discharge hota hai. Fire engineer involvement mandatory hai — containment aur suppression design integrated hona chahiye.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <h3 style={S.h3}>Hot spots developing despite containment</h3>
        <ul style={S.ul}>
          <li style={S.li}>Missing blanking panels walk karo — visually check every rack</li>
          <li style={S.li}>Floor tile placement — perforated tiles hot aisle mein hai to nahi?</li>
          <li style={S.li}>Containment panel gaps — smoke test ya hand test se air leakage detect karo</li>
          <li style={S.li}>End doors — closed properly?</li>
          <li style={S.li}>New rack added recently — containment disturbed?</li>
        </ul>

        <h3 style={S.h3}>Cold aisle temperature suddenly increased</h3>
        <ul style={S.ul}>
          <li style={S.li}>PAC/CRAC status — all running?</li>
          <li style={S.li}>Containment breach check karo</li>
          <li style={S.li}>IT load increased — more heat generation?</li>
          <li style={S.li}>Floor tile displaced — cold air not entering cold aisle?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>HAC vs CAC vs No Containment</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>HAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>CAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>No Containment</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Efficiency gain", "30-50%", "25-40%", "Baseline"],
                ["Air mixing", "Minimal", "Minimal", "High"],
                ["Room temperature", "Cool everywhere", "Hot/cool mix", "Mixed"],
                ["Operational safety", "High (cool room)", "Medium", "Lower"],
                ["Fire suppression", "Needs engineering", "Simpler", "Standard"],
                ["Implementation cost", "Medium", "Medium", "Zero"],
                ["Retrofit ease", "Medium", "Easier", "N/A"],
                ["Best for", "Large DC, new builds", "Small-medium, retrofit", "Legacy only"],
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
          <li style={S.li}><strong>100% blanking panels first:</strong> Ye free hai aur biggest impact deta hai. Containment se pehle bhi, blanking panels lagao.</li>
          <li style={S.li}><strong>Floor tiles audit:</strong> Perforated tiles sirf cold aisle mein — hot aisle aur PAC ke saamne solid tiles.</li>
          <li style={S.li}><strong>HAC prefer karo naye designs mein:</strong> Better operational safety, more uniform cooling.</li>
          <li style={S.li}><strong>Fire engineer involve karo early:</strong> Containment + fire suppression design saath mein — baad mein modify karna expensive hai.</li>
          <li style={S.li}><strong>Temperature setpoint raise karo after containment:</strong> Ye energy savings ka actual realization karta hai.</li>
          <li style={S.li}><strong>Thermal mapping karo before aur after:</strong> Improvement measure karo, document karo.</li>
          <li style={S.li}><strong>Cable management integrate karo:</strong> Containment panels mein cable cutouts properly sealed hone chahiye.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Containment cool air aur hot air ko physically separate karta hai — mixing eliminate hoti hai.",
          "HAC = hot aisle enclose karo. CAC = cold aisle enclose karo. Dono effective — HAC operationally safer.",
          "Benefit: 30-50% cooling efficiency improvement, higher temperature setpoints, better RCI.",
          "Blanking panels essential hain — ye containment ka foundation hai. Pehle ye lagao.",
          "Fire suppression engineer ko containment ke saath design mein involve karo — critical.",
          "Daily: temperature uniformity, door status. Monthly: blanking panels, panel integrity, tile placement.",
          "Retrofit possible hai — existing data centers mein implement ho sakta hai. ROI 1-3 years typically.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Containment clear hua. Airflow management aur cooling metrics complete karo:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — Containment ke saath complete airflow strategy.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Containment effectiveness measure karna — RCI metric.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — PAC aur CRAC ke saath containment kaise interact karta hai.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — Centralized cooling system jo CRAH ke saath containment use karta hai.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
