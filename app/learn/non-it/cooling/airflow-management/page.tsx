import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Airflow Management in Data Centers — Complete Guide | Behind The Tech",
  description: "Data Center mein airflow management kaise karte hain — hot/cold aisle, blanking panels, raised floor, perforated tiles, bypass air, recirculation — complete practical guide.",
  keywords: ["airflow management data center", "data center airflow", "cold aisle hot aisle", "bypass air data center", "perforated tiles raised floor"],
  openGraph: { title: "Airflow Management in Data Centers", description: "Cool air sahi jagah kaise pahunche — complete airflow management guide.", url: "https://behindthetech.in/learn/non-it/cooling/airflow-management", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "Airflow Management — Behind The Tech", description: "Data Center airflow management — practical guide." },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/cooling/airflow-management" },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-airflow-mgmt",  text: "What Is Airflow Management?",          level: 2 },
  { id: "why-needed",            text: "Why Is It Needed?",                    level: 2 },
  { id: "working-principle",     text: "Airflow Principles",                   level: 2 },
  { id: "main-components",       text: "Airflow Management Components",        level: 2 },
  { id: "how-it-works-in-dc",    text: "How It Works in a Data Center",        level: 2 },
  { id: "bypass-recirculation",  text: "Bypass Air & Recirculation",           level: 2 },
  { id: "types",                 text: "Airflow Management Strategies",        level: 2 },
  { id: "advantages",            text: "Benefits",                             level: 2 },
  { id: "disadvantages",         text: "Common Challenges",                    level: 2 },
  { id: "real-example",          text: "Real Data Center Example",             level: 2 },
  { id: "common-faults",         text: "Common Airflow Issues",                level: 2 },
  { id: "preventive-maintenance",text: "Preventive Maintenance",               level: 2 },
  { id: "daily-checklist",       text: "Daily Checklist",                      level: 2 },
  { id: "monthly-checklist",     text: "Monthly Checklist",                    level: 2 },
  { id: "safety",                text: "Safety Notes",                         level: 2 },
  { id: "interview-questions",   text: "Interview Questions",                  level: 2 },
  { id: "troubleshooting",       text: "Troubleshooting Guide",                level: 2 },
  { id: "comparison",            text: "With vs Without Airflow Management",   level: 2 },
  { id: "best-practices",        text: "Best Practices",                       level: 2 },
  { id: "key-takeaways",         text: "Key Takeaways",                        level: 2 },
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
    { label: "Ek line mein", text: "Airflow management ensure karta hai ki cool air efficiently servers tak pahunche aur hot air PAC/CRAC tak wapas aaye — bina mixing ke." },
    { label: "Three enemies", text: "Bypass air (cool air servers tak pahunche bina return), recirculation (hot air wapas server intake pe), aur hot spots (specific areas mein excessive heat) — ye teeno airflow problems hain." },
    { label: "Primary tools", text: "Blanking panels (rack gaps seal karo), perforated floor tiles (cool air delivery), solid floor tiles (hot areas block karo), containment (aisle separation), cable management (airflow mat rokne do)." },
    { label: "Pressure concept", text: "Raised floor plenum mein positive pressure hoti hai — cool air tiles se upar push hoti hai. Server ke andar front-to-back pressure differential hai — server fan ye create karta hai." },
    { label: "Hot spot kya hai", text: "Ek specific rack ya location jahan temperature recommended range se upar jaati hai. Cause: poor airflow, bypass air, recirculation, high density. Ye ek red flag hai." },
    { label: "Measurement", text: "Temperature mapping karo — cold aisle, hot aisle, per rack inlet temperatures measure karo. CFD (Computational Fluid Dynamics) modeling bhi use hota hai — airflow visualize karne ke liye." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>💨 QUICK SUMMARY — 2 MINUTE READ</span>
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
  { q: "Bypass air kya hai aur kaise rokein?", a: "Bypass air = cool air jo servers tak pahunche bina PAC/CRAC return mein chali jaati hai. Waste of cooling energy. Causes: excess floor tiles in wrong places, gaps under racks, cable openings unsealed. Fix: Proper tile placement, seal all gaps, blanking panels, raised floor grommets." },
  { q: "Recirculation kya hai aur kyo dangerous hai?", a: "Recirculation = hot exhaust air jo server intake pe wapas aata hai. Causes: missing blanking panels, wrong rack orientation, no containment. Impact: Server inlet temperature badhti hai — thermal throttling ya shutdown. Fix: Blanking panels, containment, correct rack orientation." },
  { q: "Hot spot kaise identify karte hain?", a: "Temperature mapping se — cold aisle front pe har rack ke inlet temperature measure karo. ASHRAE guidelines: 18-27°C range. Agar koi rack 28°C+ show kare, hot spot hai. Tools: DCIM temperature sensors, IR thermometer, CFD modeling. Regular thermal survey zaroori hai." },
  { q: "Perforated floor tile kahan lagaate hain?", a: "Sirf cold aisle mein — directly server rack ke saamne. Hot aisle mein solid tiles. PAC/CRAC ke saamne solid tiles (warna cool air bypass hoga return ke bina). Racks ke under — grommet seal karo. Openness factor: 25% ya 56% perforated tiles available — high density ke liye higher openness." },
  { q: "CFD modeling kya hoti hai?", a: "CFD = Computational Fluid Dynamics. Computer simulation jo data center mein airflow visualize karta hai. 3D model banao — racks, PAC units, floor tiles sab include karo. Software calculate karta hai air velocity, temperature, pressure everywhere. Hot spots predict karo before physical changes. Large data centers mein commonly used." },
  { q: "Cable management airflow ko kaise affect karta hai?", a: "Poor cable management rack ke andar airflow block karta hai. Cable bundles evaporator coil jaisi hoti hain — air ruk jaati hai. Horizontal cable management vertical se better hota hai airflow ke liye. Cable ties se cables organize karo, excessive slack eliminate karo. Airflow-optimized cable management available hai." },
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

export default function AirflowManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="airflow-management" headings={HEADINGS} readingTimeMinutes={17}>

        <p style={S.p}>PAC cool air deliver karta hai. Good.</p>
        <p style={S.p}>Lekin kya ye cool air actually servers tak pahunch rahi hai — sahi direction mein, sahi quantity mein?</p>
        <p style={S.p}>Ya kya ye cool air room mein hi chakkar laga rahi hai — servers ko bypass karke?</p>
        <p style={S.p}>Ya kya kuch servers hot air exhaust inhale kar rahe hain — recirculation ki wajah se?</p>
        <p style={S.p}><strong>Airflow management in sab problems solve karta hai — cool air ko sahi jagah, sahi waqt, sahi quantity mein deliver karta hai.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/airflow-management/data-center-airflow-diagram.png" alt="Data center airflow management diagram showing cold and hot air paths" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Proper airflow management — cool air (blue) servers ke through, hot air (red) clearly separated aur PAC return mein.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-airflow-mgmt" style={S.h1}>What Is Airflow Management?</h2>

        <p style={S.p}><strong>Airflow management = Data Center mein air ka controlled movement.</strong></p>
        <p style={S.p}>Goal: Cool air efficiently servers tak pahunche. Hot air PAC/CRAC tak efficiently return ho. Dono mix na hon.</p>
        <p style={S.p}>Ye sirf physical layout ka kaam nahi hai — ye engineering discipline hai.</p>
        <p style={S.p}>Airflow management mein aata hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>Rack placement aur orientation</li>
          <li style={S.li}>Hot aisle / cold aisle design</li>
          <li style={S.li}>Blanking panels</li>
          <li style={S.li}>Raised floor tile management</li>
          <li style={S.li}>Containment systems</li>
          <li style={S.li}>Cable management</li>
          <li style={S.li}>PAC/CRAC placement</li>
          <li style={S.li}>Temperature monitoring aur mapping</li>
        </ul>

        <DCMapNote components={["Blanking Panels", "Perforated Floor Tiles", "Cold Aisle", "Hot Aisle", "PAC/CRAC", "Cable Management"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is It Needed?</h2>

        <p style={S.p}>Bina airflow management ke kya hota hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>Cool air servers tak pahunche bina PAC return mein jaati hai (bypass) — wasted cooling</li>
          <li style={S.li}>Hot exhaust air server intake pe wapas aata hai (recirculation) — servers warm air breathe karte hain</li>
          <li style={S.li}>Hot spots develop hote hain — specific racks overheating</li>
          <li style={S.li}>PAC extra capacity pe run karta hai — energy waste</li>
          <li style={S.li}>Server thermal throttling — performance degrade</li>
          <li style={S.li}>Unexpected failures — equipment protect karne ke liye thermal shutdown</li>
        </ul>

        <WhyThisMatters>
          ASHRAE ke studies ke according, poor airflow management ke karan data centers apni 30-40% cooling capacity waste karte hain. Airflow management improvements implement karne se — bina new cooling units lagaye — effective cooling capacity 30-50% improve ho sakti hai. Ye essentially free improvement hai agar existing physical infrastructure use karo.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Airflow Principles</h2>

        <h3 style={S.h3}>Principle 1: Air Follows Path of Least Resistance</h3>
        <p style={S.p}>Air hamesha easiest path choose karti hai. Agar ek gap hai — kisi bhi gap mein — air wahan se jaayegi. Rack mein blanking panel nahi hai? Air wahan se shortcut le legi — server bypass ho jaayega.</p>
        <p style={S.p}><em>Analogy:</em> Paani bhi path of least resistance follow karta hai — ye physics ka basic rule hai.</p>

        <h3 style={S.h3}>Principle 2: Pressure Differential Drives Airflow</h3>
        <p style={S.p}>Server ke andar fan pressure differential create karta hai — front pe lower pressure, back pe higher pressure. Ye differential cool air front se kheechta hai aur hot air back se push karta hai.</p>
        <p style={S.p}>Raised floor mein: plenum positive pressure pe hota hai — cool air tiles se upar push hoti hai. Zyada perforated tiles = zyada air = zyada cooling capacity.</p>

        <h3 style={S.h3}>Principle 3: Hot Air Rises</h3>
        <p style={S.p}>Hot air natural convection se upar jaati hai. Data center ceiling pe hot air collect hoti hai. Ye reason hai ki PAC return typically rack top ya ceiling level pe hoti hai. Ye physics use karo — advantage mein.</p>

        <h3 style={S.h3}>Principle 4: Air Mixing Reduces Effectiveness</h3>
        <p style={S.p}>Jab cool aur hot air mix hoti hai, dono ki temperature change hoti hai. Server ko warm air milti hai. PAC ko warm return air milti hai — less effective cooling. Mixing = inefficiency. Separation = efficiency.</p>

        <InsightCard>
          Front-to-back airflow servers mein kyon hota hai? Ye standard industry practice hai. Servers ka front panel cool — intake side. Servers ka back — hot exhaust side. Iska matlab: racks jo same direction face kare — cold aisle pe front, hot aisle pe back — ye natural airflow se match karta hai. Opposite-facing racks would create hot spots.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Airflow Management Components</h2>

        <h3 style={S.h3}>1. Blanking Panels</h3>
        <p style={S.p}>Khali rack spaces (1U, 2U, 4U, etc.) mein lagaye jaane wale solid panels. Ye hot exhaust air ko front se rack mein wapas aane se rokta hai. <strong>Most important, cheapest, easiest improvement.</strong> Agar data center mein kuch bhi nahi hai — pehle blanking panels lagao.</p>

        <h3 style={S.h3}>2. Perforated Floor Tiles</h3>
        <p style={S.p}>Raised floor mein use hote hain. Different openness percentages available: 25%, 56%. More open = more airflow. Cold aisle mein use karo — directly racks ke saamne. High density racks ke saamne higher openness tiles use karo.</p>

        <h3 style={S.h3}>3. Solid Floor Tiles</h3>
        <p style={S.p}>Hot aisle mein aur unwanted areas mein cool air ko block karo. PAC/CRAC ke direct saamne solid tiles — cool air bypass prevent karo. Proper sealing ensure karo — gaps se air leakage.</p>

        <h3 style={S.h3}>4. Cable Grommets / Brush Strips</h3>
        <p style={S.p}>Raised floor ke openings mein — cables ke liye. Prevent air leakage from plenum. Without grommets, large openings se significant bypass air leakage hoti hai. Brush strips easy installation — flexible for different cable sizes.</p>

        <h3 style={S.h3}>5. Containment Systems</h3>
        <p style={S.p}>Aisle containment — hot/cold separation. PAC/CRAC se efficient heat management. (Covered in detail in <TopicLink slug="containment" variant="inline" /> article.)</p>

        <h3 style={S.h3}>6. In-Row Cooling Units</h3>
        <p style={S.p}>PAC/CRAC units racks ke beech mein. Very short air paths — minimal mixing. High density environments ke liye ideal.</p>

        <h3 style={S.h3}>7. Chimney Units</h3>
        <p style={S.p}>Per-rack ya per-row chimneys. Hot air directly ceiling plenum ya overhead return mein. Floor-level cool air se complete separation.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How It Works in a Data Center</h2>

        <FlowDiagram
          caption="Ideal airflow path — PAC to cold aisle to servers to hot aisle to PAC"
          steps={[
            { icon: "❄️", label: "PAC/CRAC", sublabel: "Cool air supply" },
            { icon: "⬇️", label: "Raised Floor Plenum", sublabel: "Pressurized" },
            { icon: "🔲", label: "Perforated Tiles", sublabel: "Cold aisle only" },
            { icon: "🖥️", label: "Servers", sublabel: "Front to back" },
            { icon: "♨️", label: "Hot Aisle", sublabel: "Hot exhaust" },
            { icon: "🔄", label: "PAC Return", sublabel: "Cycle repeat" },
          ]}
        />

        <p style={S.p}><strong>Ideal flow path:</strong></p>
        <p style={S.p}>PAC cool air supply → raised floor plenum (positive pressure) → perforated tiles in cold aisle → server front intake → through server (heat absorbed) → server back exhaust → hot aisle → PAC return (top or bottom) → PAC cools it → repeat.</p>
        <p style={S.p}><strong>Har step pe potential problem ho sakti hai:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Plenum mein gaps → air leakage → less pressure → less cooling delivery</li>
          <li style={S.li}>Wrong floor tiles → cool air wrong place pe</li>
          <li style={S.li}>Missing blanking panels → hot air shortcuts</li>
          <li style={S.li}>Cable bundles blocking → reduced airflow through server</li>
          <li style={S.li}>Containment breach → mixing begins</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="bypass-recirculation" style={S.h1}>Bypass Air & Recirculation</h2>

        <h3 style={S.h3}>Bypass Air</h3>
        <p style={S.p}><strong>Definition:</strong> Cool air jo servers ko cool kiye bina PAC/CRAC return mein ja raha hai.</p>
        <p style={S.p}><strong>Causes:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Perforated tiles hot aisle ya PAC ke saamne lagaye hain</li>
          <li style={S.li}>Raised floor ke gaps — unsealed cable openings</li>
          <li style={S.li}>Under-rack openings — rack ke neeche gaps</li>
          <li style={S.li}>Excess floor tiles — zyada supply air, servers absorb nahi kar sakte</li>
        </ul>
        <p style={S.p}><strong>Impact:</strong> Wasted cooling energy. Plenum pressure drop. Less effective cooling where needed.</p>
        <p style={S.p}><strong>Fix:</strong> Tile audit — sirf cold aisle mein perforated tiles. Cable openings seal karo. Proper raised floor sealing.</p>

        <h3 style={S.h3}>Recirculation</h3>
        <p style={S.p}><strong>Definition:</strong> Hot exhaust air jo server intake pe wapas aa raha hai.</p>
        <p style={S.p}><strong>Causes:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Missing blanking panels — hot air rack ke through shortcircuit karta hai</li>
          <li style={S.li}>No containment — hot air room mein free</li>
          <li style={S.li}>Racks facing wrong direction — exhaust cold aisle ki taraf</li>
          <li style={S.li}>PAC/CRAC unit poorly placed — short cycling</li>
        </ul>
        <p style={S.p}><strong>Impact:</strong> Server inlet temperature badh jaata hai. Thermal throttling. Hot spots.</p>

        <EngineerTip>
          Quick test for recirculation: Ek temperature sensor server intake pe lagao. Fir hot aisle mein ek similar height pe lagao. Agar server intake pe temperature hot aisle ke karib hai — recirculation ho raha hai. Cold aisle temperature (true supply) se server intake temperature mein gap — ye recirculation ya bypass indicate karta hai.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Airflow Management Strategies</h2>

        <h3 style={S.h3}>1. Hot Aisle / Cold Aisle (Basic)</h3>
        <p style={S.p}>Server racks alternate face kare — front-to-front (cold aisle), back-to-back (hot aisle). PAC cool air deliver kare cold aisle mein. Simple, effective, most common.</p>

        <h3 style={S.h3}>2. Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Cold aisle enclosed karo — mixing eliminate karo. 25-40% efficiency improvement. (See <TopicLink slug="containment" variant="inline" />)</p>

        <h3 style={S.h3}>3. Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Hot aisle enclosed karo — hot air directly captured. Room mein cool air everywhere. Better operational safety. (See <TopicLink slug="containment" variant="inline" />)</p>

        <h3 style={S.h3}>4. Raised Floor Optimization</h3>
        <p style={S.p}>Floor tile placement optimize karo. Tile openness percentage select karo per rack density. Seal all floor openings. Plenum pressure monitoring.</p>

        <h3 style={S.h3}>5. In-Row Cooling</h3>
        <p style={S.p}>PAC/CRAC units racks ke beech mein. Very short air paths. High density suitable. Minimal bypass aur recirculation.</p>

        <h3 style={S.h3}>6. Overhead Cooling</h3>
        <p style={S.p}>Cool air ceiling se deliver karo. Hot air floor se return karo. No raised floor needed. High rooms mein effective.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Benefits</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Better cooling effectiveness:</strong> Cool air where it's needed — less waste</li>
          <li style={S.li}><strong>Hot spots eliminated:</strong> Uniform cooling → uniform server temperatures</li>
          <li style={S.li}><strong>Energy savings:</strong> Less cooling work = less electricity</li>
          <li style={S.li}><strong>Higher rack density possible:</strong> Better cooling = more servers per rack</li>
          <li style={S.li}><strong>Improved RCI:</strong> Rack Cooling Index improves — measurable metric</li>
          <li style={S.li}><strong>Longer equipment life:</strong> Servers at correct temperature = longer life</li>
          <li style={S.li}><strong>Better PUE:</strong> Cooling efficiency directly impacts PUE</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Common Challenges</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Ongoing discipline required:</strong> New rack install karo, blanking panels check karo — hamesha</li>
          <li style={S.li}><strong>Cable management:</strong> Poor cable management airflow block karta hai — constant battle</li>
          <li style={S.li}><strong>Fire suppression:</strong> Containment + fire suppression integration complex ho sakti hai</li>
          <li style={S.li}><strong>Mixed equipment:</strong> Different vendors, different airflow requirements — uniform design challenging</li>
          <li style={S.li}><strong>Legacy layouts:</strong> Old data centers mein random rack placement — retrofit challenging</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Initial state:</strong> 80-rack data center, no containment, random tile placement, missing blanking panels in 60% of racks, cables obstructing airflow. Hot spots in 8 racks. 12 PAC units running (10 kW each).</p>
        <p style={S.p}><strong>Assessment:</strong> Thermal mapping reveal kiya — 15°C cold aisle temperature, server inlets 24-32°C. Significant bypass and recirculation.</p>
        <p style={S.p}><strong>Actions taken:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Step 1: 100% blanking panels in all racks (2 days)</li>
          <li style={S.li}>Step 2: Floor tile audit aur correction (1 day)</li>
          <li style={S.li}>Step 3: Cable openings mein grommets install karo</li>
          <li style={S.li}>Step 4: Cold aisle containment install karo</li>
          <li style={S.li}>Step 5: PAC setpoint 15°C se 21°C raise karo</li>
        </ul>
        <p style={S.p}><strong>Result:</strong> Server inlet 20-24°C — uniform. Hot spots zero. 3 PAC units standby. Estimated energy savings: 20%.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Airflow Issues</h2>

        <h3 style={S.h3}>Hot Spots</h3>
        <p style={S.p}>Specific racks ya locations high temperature. Cause: Recirculation, insufficient cooling delivery, high heat load. Action: Temperature mapping, identify source, fix (blanking panels, tile placement, add cooling).</p>

        <h3 style={S.h3}>Uneven Cold Aisle Temperature</h3>
        <p style={S.p}>Some racks pe 18°C, kuch pe 28°C. Cause: Uneven floor tile distribution, variable rack density, PAC placement. Action: Floor tile redistribution, balanced cooling delivery.</p>

        <h3 style={S.h3}>PAC Short Cycling</h3>
        <p style={S.p}>PAC units zyada frequently on/off ho rahe hain. Cause: Bypass air — return temperature cool hai (cool air bypass), unit thinks it's done, shuts off — cycle repeats. Action: Bypass eliminate karo, return air path fix karo.</p>

        <h3 style={S.h3}>Plenum Pressure Low</h3>
        <p style={S.p}>Cool air delivery insufficient. Cause: Too many perforated tiles, large gaps in raised floor, PAC supply duct leaks. Action: Tile audit, seal gaps, check PAC supply.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Monthly:</strong> Blanking panel audit — walk every rack row</li>
          <li style={S.li}><strong>Monthly:</strong> Floor tile placement check</li>
          <li style={S.li}><strong>Monthly:</strong> Spot temperature checks — cold aisle, hot aisle, rack inlets</li>
          <li style={S.li}><strong>Quarterly:</strong> Full temperature mapping — all racks</li>
          <li style={S.li}><strong>Quarterly:</strong> Cable management check — bundles blocking airflow?</li>
          <li style={S.li}><strong>Quarterly:</strong> Containment integrity — gaps, door seals</li>
          <li style={S.li}><strong>Semi-annual:</strong> Raised floor plenum inspection — debris, grommets</li>
          <li style={S.li}><strong>Annual:</strong> Full airflow audit — CFD model update agar changes hue</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ BMS mein hot spot alarms — any alerts?</li>
          <li style={S.li}>✓ Cold aisle temperature — within normal range?</li>
          <li style={S.li}>✓ Hot aisle temperature — normal?</li>
          <li style={S.li}>✓ New equipment installed? — Blanking panels check karo</li>
          <li style={S.li}>✓ Containment doors closed (except maintenance)?</li>
          <li style={S.li}>✓ Anything visually unusual — displaced tiles, open rack gaps?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Walk all rack rows — blanking panels complete?</li>
          <li style={S.li}>✓ Floor tiles — perforated sirf cold aisle mein?</li>
          <li style={S.li}>✓ Cable openings sealed?</li>
          <li style={S.li}>✓ Temperature spot check — at least 5 racks sampled</li>
          <li style={S.li}>✓ Any hot spots developing?</li>
          <li style={S.li}>✓ PAC/CRAC setpoints correct?</li>
          <li style={S.li}>✓ Changes this month? Layout changes → airflow impact assess karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Notes</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Raised floor work:</strong> Floor panels heavy — proper lifting. Two persons for large tiles. Footwear — raised floor edges sharp.</li>
          <li style={S.li}><strong>Hot aisle work:</strong> Temperature 35-45°C — limit time, water, buddy system</li>
          <li style={S.li}><strong>Containment work:</strong> Enclosed space — cool aisle cool hai, hot aisle hot</li>
          <li style={S.li}><strong>Working above racks:</strong> Ceiling-level work — ladder safety</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Bypass air aur recirculation mein kya difference hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Bypass air = cool air jo servers ko avoid karke PAC return mein directly jaati hai — wasted cooling. Recirculation = hot exhaust air jo server intake pe wapas aata hai — server ko warm air milti hai. Bypass = cooling waste. Recirculation = server heating. Dono problematic but different issues.</p>

        <h3 style={S.h3}>Q2: Blanking panels aur perforated floor tiles ka correct use kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Blanking panels: Rack ke khali spaces seal karo — recirculation rokta hai. Without blanking panels, hot air rack ke through front mein shortcircuit hoti hai. Perforated floor tiles: Sirf cold aisle mein — directly server rack ke saamne. Hot aisle aur non-rack areas mein solid tiles — warna cool air bypass hogi.</p>

        <h3 style={S.h3}>Q3: Hot spot kaise identify aur resolve karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Identify: Temperature mapping — har rack ke cold aisle inlet temperature measure karo. 28°C+ mein hot spot. DCIM temperature sensors real-time alerts dete hain. Resolve: 1) Blanking panels check karo, 2) Floor tile placement verify, 3) Containment gaps check, 4) Recirculation sources identify, 5) Cooling capacity add karo agar needed.</p>

        <h3 style={S.h3}>Q4: CFD modeling kya hai aur kab use karte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> CFD = Computational Fluid Dynamics simulation jo data center mein air flow visualize karta hai — bina physical changes kiye. Use karte hain: New data center design, major changes se pehle, hot spot diagnosis, cooling capacity planning. Software 3D model mein temperatures, airflow velocities, pressure distribution show karta hai. Hot spots physical testing se pehle predict karte hain.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Server high temperature alert</h3>
        <ul style={S.ul}>
          <li style={S.li}>Cold aisle temperature check — normal hai?</li>
          <li style={S.li}>Server ke rack mein blanking panels — complete?</li>
          <li style={S.li}>Adjacent racks — hot air exhaust direction check karo</li>
          <li style={S.li}>Floor tile — cold aisle mein perforated tile hai server ke saamne?</li>
          <li style={S.li}>PAC unit running? Setpoint correct?</li>
          <li style={S.li}>IT load increase hua? New servers added?</li>
        </ul>

        <h3 style={S.h3}>Scenario: Cold aisle temperature uneven — one end hot</h3>
        <ul style={S.ul}>
          <li style={S.li}>Floor tile distribution check karo — PAC ke paas zyada tiles?</li>
          <li style={S.li}>PAC placement — far end tak cooling reach karna</li>
          <li style={S.li}>Far end mein bypass path hai? — Hot air coming around?</li>
          <li style={S.li}>Additional perforated tiles on far end consider karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>With vs Without Airflow Management</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Metric</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>With Proper Airflow Mgmt</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Without / Poor Management</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Server inlet temp variation", "±2-3°C (uniform)", "±10-15°C (hot spots)"],
                ["Cooling efficiency", "High — air goes where needed", "Low — 30-40% wasted"],
                ["RCI", "95-100%", "70-85% or lower"],
                ["PAC setpoint", "21-24°C possible", "15-18°C needed"],
                ["Hot spots", "None / minimal", "Multiple locations"],
                ["Equipment failures", "Reduced", "Higher risk"],
                ["Energy consumption", "Lower", "Higher (over-cooling)"],
                ["Maintenance effort", "Proactive, planned", "Reactive, crisis-driven"],
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
          <li style={S.li}><strong>Blanking panels 100%:</strong> Ye non-negotiable. Every rack, every empty space. Always.</li>
          <li style={S.li}><strong>Floor tile discipline:</strong> Mark tiles clearly — perforated in cold aisle, solid elsewhere. Enforce policy.</li>
          <li style={S.li}><strong>No equipment changes without airflow review:</strong> New rack in, blanking panels installed, tile placement checked. Every time.</li>
          <li style={S.li}><strong>Temperature mapping quarterly:</strong> Trend karo — deteriorating areas early identify karo.</li>
          <li style={S.li}><strong>DCIM integration:</strong> Real-time temperature monitoring. Automatic alerts for deviations.</li>
          <li style={S.li}><strong>Cable management ko seriously lo:</strong> Cable bundles airflow ko sabotage karte hain. Proper trays, ties, routing.</li>
          <li style={S.li}><strong>Train operations team:</strong> Blanking panels kyon important hain — everyone should know. A missing panel discovered by a new person is a win.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Airflow management = cool air ko servers tak efficiently pahunchana, hot air ko wapas laana, mixing rokna.",
          "Three enemies: bypass air (cooling waste), recirculation (server heating), hot spots (local overheating).",
          "Blanking panels sabse important, sabse cheap, sabse easy fix. Pehle ye lagao — always 100%.",
          "Perforated floor tiles sirf cold aisle mein — hot aisle aur other areas solid tiles.",
          "Containment + blanking panels + proper tile placement = 30-50% cooling efficiency improvement.",
          "Hot spots = temperature mapping se identify karo, root cause fix karo — PAC add mat karo blindly.",
          "Monthly: blanking panels audit, tile check. Quarterly: full temperature mapping. Annual: airflow audit.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Airflow management complete hua. Aage measurement aur metrics samjho:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — Airflow management effectiveness measure karne ka metric.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Airflow management ka advanced step — physical air separation.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — PAC aur CRAC — jo air deliver karte hain.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — CRAH ke through airflow management in chiller-based systems.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
