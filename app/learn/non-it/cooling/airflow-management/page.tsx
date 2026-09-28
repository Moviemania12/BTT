import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Airflow Management in Data Centers — Complete Guide | Behind The Tech",
  description: "How airflow management is done in a Data Center — hot/cold aisle, blanking panels, raised floor, perforated tiles, bypass air, recirculation — complete practical guide.",
  keywords: ["airflow management data center", "data center airflow", "cold aisle hot aisle", "bypass air data center", "perforated tiles raised floor"],
  openGraph: { title: "Airflow Management in Data Centers", description: "How cool air reaches the right place — complete airflow management guide.", url: "https://behindthetech.in/learn/non-it/cooling/airflow-management", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"] },
  twitter: { card: "summary_large_image", title: "Airflow Management — Behind The Tech", description: "Data Center airflow management — practical guide." },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/airflow-management",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/airflow-management",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/airflow-management",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/airflow-management",
    },
  },
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
    { label: "In one line", text: "Airflow management ensures that cool air reaches the servers efficiently and hot air comes back to the PAC/CRAC — without mixing." },
    { label: "Three enemies", text: "Bypass air (cool air returns without reaching the servers), recirculation (hot air comes back to the server intake), and hot spots (excessive heat in specific areas) — these three are airflow problems." },
    { label: "Primary tools", text: "Blanking panels (seal rack gaps), perforated floor tiles (cool air delivery), solid floor tiles (block hot areas), containment (aisle separation), cable management (do not let it block airflow)." },
    { label: "Pressure concept", text: "There is positive pressure in the raised floor plenum — cool air is pushed up through the tiles. Inside the server there is a front-to-back pressure differential — the server fan creates it." },
    { label: "What a hot spot is", text: "A specific rack or location where the temperature goes above the recommended range. Cause: poor airflow, bypass air, recirculation, high density. It is a red flag." },
    { label: "Measurement", text: "Do temperature mapping — measure cold aisle, hot aisle and per rack inlet temperatures. CFD (Computational Fluid Dynamics) modeling is also used — to visualize airflow." },
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
  { q: "What is bypass air and how can it be stopped?", a: "Bypass air = cool air that goes into the PAC/CRAC return without reaching the servers. A waste of cooling energy. Causes: excess floor tiles in wrong places, gaps under racks, cable openings unsealed. Fix: Proper tile placement, seal all gaps, blanking panels, raised floor grommets." },
  { q: "What is recirculation and why is it dangerous?", a: "Recirculation = hot exhaust air that comes back to the server intake. Causes: missing blanking panels, wrong rack orientation, no containment. Impact: Server inlet temperature rises — thermal throttling or shutdown. Fix: Blanking panels, containment, correct rack orientation." },
  { q: "How is a hot spot identified?", a: "Through temperature mapping — measure the inlet temperature of every rack at the cold aisle front. ASHRAE guidelines: 18-27°C range. If any rack shows 28°C+, it is a hot spot. Tools: DCIM temperature sensors, IR thermometer, CFD modeling. A regular thermal survey is essential." },
  { q: "Where are perforated floor tiles installed?", a: "Only in the cold aisle — directly in front of the server rack. Solid tiles in the hot aisle. Solid tiles in front of the PAC/CRAC (otherwise cool air will bypass back to the return). Under racks — seal with grommets. Openness factor: 25% or 56% perforated tiles are available — higher openness for high density." },
  { q: "What is CFD modeling?", a: "CFD = Computational Fluid Dynamics. A computer simulation that visualizes airflow in the data center. Build a 3D model — include racks, PAC units, floor tiles, everything. The software calculates air velocity, temperature and pressure everywhere. Predict hot spots before physical changes. Commonly used in large data centers." },
  { q: "How does cable management affect airflow?", a: "Poor cable management blocks airflow inside the rack. Cable bundles act like an evaporator coil — the air gets stopped. Horizontal cable management is better than vertical for airflow. Organize cables with cable ties, eliminate excessive slack. Airflow-optimized cable management is available." },
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
      <ArticleLayout slug="airflow-management" headings={HEADINGS} readingTimeMinutes={17} lang="en" alternateHref="/hi/learn/non-it/cooling/airflow-management">

        <p style={S.p}>The PAC delivers cool air. Good.</p>
        <p style={S.p}>But is this cool air actually reaching the servers — in the right direction, in the right quantity?</p>
        <p style={S.p}>Or is this cool air just circling around the room — bypassing the servers?</p>
        <p style={S.p}>Or are some servers inhaling hot exhaust air — because of recirculation?</p>
        <p style={S.p}><strong>Airflow management solves all these problems — it delivers cool air to the right place, at the right time, in the right quantity.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/airflow-management/data-center-airflow-diagram.png" alt="Data center airflow management diagram showing cold and hot air paths" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Proper airflow management — cool air (blue) through the servers, hot air (red) clearly separated and into the PAC return.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-airflow-mgmt" style={S.h1}>What Is Airflow Management?</h2>

        <p style={S.p}><strong>Airflow management = the controlled movement of air in a Data Center.</strong></p>
        <p style={S.p}>Goal: Cool air reaches the servers efficiently. Hot air returns to the PAC/CRAC efficiently. The two do not mix.</p>
        <p style={S.p}>It is not just a physical layout job — it is an engineering discipline.</p>
        <p style={S.p}>Airflow management includes:</p>
        <ul style={S.ul}>
          <li style={S.li}>Rack placement and orientation</li>
          <li style={S.li}>Hot aisle / cold aisle design</li>
          <li style={S.li}>Blanking panels</li>
          <li style={S.li}>Raised floor tile management</li>
          <li style={S.li}>Containment systems</li>
          <li style={S.li}>Cable management</li>
          <li style={S.li}>PAC/CRAC placement</li>
          <li style={S.li}>Temperature monitoring and mapping</li>
        </ul>

        <DCMapNote components={["Blanking Panels", "Perforated Floor Tiles", "Cold Aisle", "Hot Aisle", "PAC/CRAC", "Cable Management"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is It Needed?</h2>

        <p style={S.p}>What happens without airflow management:</p>
        <ul style={S.ul}>
          <li style={S.li}>Cool air goes into the PAC return without reaching the servers (bypass) — wasted cooling</li>
          <li style={S.li}>Hot exhaust air comes back to the server intake (recirculation) — servers breathe warm air</li>
          <li style={S.li}>Hot spots develop — specific racks overheating</li>
          <li style={S.li}>The PAC runs at extra capacity — energy waste</li>
          <li style={S.li}>Server thermal throttling — performance degrade</li>
          <li style={S.li}>Unexpected failures — thermal shutdown to protect equipment</li>
        </ul>

        <WhyThisMatters>
          According to ASHRAE studies, data centers waste 30-40% of their cooling capacity because of poor airflow management. By implementing airflow management improvements — without installing new cooling units — effective cooling capacity can improve by 30-50%. It is essentially a free improvement if you use the existing physical infrastructure.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Airflow Principles</h2>

        <h3 style={S.h3}>Principle 1: Air Follows Path of Least Resistance</h3>
        <p style={S.p}>Air always chooses the easiest path. If there is a gap — any gap — the air will go through it. No blanking panel in the rack? The air will take a shortcut there — the server will be bypassed.</p>
        <p style={S.p}><em>Analogy:</em> Water also follows the path of least resistance — this is a basic rule of physics.</p>

        <h3 style={S.h3}>Principle 2: Pressure Differential Drives Airflow</h3>
        <p style={S.p}>The fan inside the server creates a pressure differential — lower pressure at the front, higher pressure at the back. This differential pulls cool air in from the front and pushes hot air out the back.</p>
        <p style={S.p}>In a raised floor: the plenum is at positive pressure — cool air is pushed up through the tiles. More perforated tiles = more air = more cooling capacity.</p>

        <h3 style={S.h3}>Principle 3: Hot Air Rises</h3>
        <p style={S.p}>Hot air rises through natural convection. Hot air collects at the data center ceiling. This is the reason the PAC return is typically at rack top or ceiling level. Use this physics — to your advantage.</p>

        <h3 style={S.h3}>Principle 4: Air Mixing Reduces Effectiveness</h3>
        <p style={S.p}>When cool and hot air mix, the temperature of both changes. The server gets warm air. The PAC gets warm return air — less effective cooling. Mixing = inefficiency. Separation = efficiency.</p>

        <InsightCard>
          Why is there front-to-back airflow in servers? It is standard industry practice. The server's front panel is cool — the intake side. The server's back — the hot exhaust side. This means: racks that face the same direction — front at the cold aisle, back at the hot aisle — match this natural airflow. Opposite-facing racks would create hot spots.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Airflow Management Components</h2>

        <h3 style={S.h3}>1. Blanking Panels</h3>
        <p style={S.p}>Solid panels installed in empty rack spaces (1U, 2U, 4U, etc.). They stop hot exhaust air from coming back into the rack from the front. <strong>Most important, cheapest, easiest improvement.</strong> If the data center has nothing else — install blanking panels first.</p>

        <h3 style={S.h3}>2. Perforated Floor Tiles</h3>
        <p style={S.p}>Used in a raised floor. Different openness percentages are available: 25%, 56%. More open = more airflow. Use them in the cold aisle — directly in front of the racks. Use higher openness tiles in front of high density racks.</p>

        <h3 style={S.h3}>3. Solid Floor Tiles</h3>
        <p style={S.p}>Block cool air in the hot aisle and in unwanted areas. Solid tiles directly in front of the PAC/CRAC — prevent cool air bypass. Ensure proper sealing — air leakage through gaps.</p>

        <h3 style={S.h3}>4. Cable Grommets / Brush Strips</h3>
        <p style={S.p}>In the raised floor openings — for cables. Prevent air leakage from the plenum. Without grommets, significant bypass air leaks through large openings. Brush strips are easy to install — flexible for different cable sizes.</p>

        <h3 style={S.h3}>5. Containment Systems</h3>
        <p style={S.p}>Aisle containment — hot/cold separation. Efficient heat management with the PAC/CRAC. (Covered in detail in the <TopicLink slug="containment" variant="inline" /> article.)</p>

        <h3 style={S.h3}>6. In-Row Cooling Units</h3>
        <p style={S.p}>PAC/CRAC units between the racks. Very short air paths — minimal mixing. Ideal for high density environments.</p>

        <h3 style={S.h3}>7. Chimney Units</h3>
        <p style={S.p}>Per-rack or per-row chimneys. Hot air directly into the ceiling plenum or overhead return. Complete separation from floor-level cool air.</p>

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
        <p style={S.p}><strong>There can be a potential problem at every step:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Gaps in the plenum → air leakage → less pressure → less cooling delivery</li>
          <li style={S.li}>Wrong floor tiles → cool air in the wrong place</li>
          <li style={S.li}>Missing blanking panels → hot air shortcuts</li>
          <li style={S.li}>Cable bundles blocking → reduced airflow through server</li>
          <li style={S.li}>Containment breach → mixing begins</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="bypass-recirculation" style={S.h1}>Bypass Air & Recirculation</h2>

        <h3 style={S.h3}>Bypass Air</h3>
        <p style={S.p}><strong>Definition:</strong> Cool air that goes into the PAC/CRAC return without cooling the servers.</p>
        <p style={S.p}><strong>Causes:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Perforated tiles installed in the hot aisle or in front of the PAC</li>
          <li style={S.li}>Raised floor gaps — unsealed cable openings</li>
          <li style={S.li}>Under-rack openings — gaps under the rack</li>
          <li style={S.li}>Excess floor tiles — too much supply air that the servers cannot absorb</li>
        </ul>
        <p style={S.p}><strong>Impact:</strong> Wasted cooling energy. Plenum pressure drop. Less effective cooling where needed.</p>
        <p style={S.p}><strong>Fix:</strong> Tile audit — perforated tiles only in the cold aisle. Seal cable openings. Proper raised floor sealing.</p>

        <h3 style={S.h3}>Recirculation</h3>
        <p style={S.p}><strong>Definition:</strong> Hot exhaust air that is coming back to the server intake.</p>
        <p style={S.p}><strong>Causes:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Missing blanking panels — hot air short-circuits through the rack</li>
          <li style={S.li}>No containment — hot air is free in the room</li>
          <li style={S.li}>Racks facing the wrong direction — exhaust towards the cold aisle</li>
          <li style={S.li}>PAC/CRAC unit poorly placed — short cycling</li>
        </ul>
        <p style={S.p}><strong>Impact:</strong> Server inlet temperature rises. Thermal throttling. Hot spots.</p>

        <EngineerTip>
          Quick test for recirculation: Put a temperature sensor at the server intake. Then put one at a similar height in the hot aisle. If the temperature at the server intake is close to the hot aisle — recirculation is happening. A gap between the cold aisle temperature (true supply) and the server intake temperature indicates recirculation or bypass.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Airflow Management Strategies</h2>

        <h3 style={S.h3}>1. Hot Aisle / Cold Aisle (Basic)</h3>
        <p style={S.p}>Server racks face alternately — front-to-front (cold aisle), back-to-back (hot aisle). The PAC delivers cool air into the cold aisle. Simple, effective, most common.</p>

        <h3 style={S.h3}>2. Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Enclose the cold aisle — eliminate mixing. 25-40% efficiency improvement. (See <TopicLink slug="containment" variant="inline" />)</p>

        <h3 style={S.h3}>3. Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Enclose the hot aisle — hot air directly captured. Cool air everywhere in the room. Better operational safety. (See <TopicLink slug="containment" variant="inline" />)</p>

        <h3 style={S.h3}>4. Raised Floor Optimization</h3>
        <p style={S.p}>Optimize floor tile placement. Select tile openness percentage per rack density. Seal all floor openings. Plenum pressure monitoring.</p>

        <h3 style={S.h3}>5. In-Row Cooling</h3>
        <p style={S.p}>PAC/CRAC units between the racks. Very short air paths. Suitable for high density. Minimal bypass and recirculation.</p>

        <h3 style={S.h3}>6. Overhead Cooling</h3>
        <p style={S.p}>Deliver cool air from the ceiling. Return hot air from the floor. No raised floor needed. Effective in high rooms.</p>

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
          <li style={S.li}><strong>Ongoing discipline required:</strong> Install a new rack, check the blanking panels — always</li>
          <li style={S.li}><strong>Cable management:</strong> Poor cable management blocks airflow — a constant battle</li>
          <li style={S.li}><strong>Fire suppression:</strong> Containment + fire suppression integration can be complex</li>
          <li style={S.li}><strong>Mixed equipment:</strong> Different vendors, different airflow requirements — uniform design challenging</li>
          <li style={S.li}><strong>Legacy layouts:</strong> Random rack placement in old data centers — retrofit is challenging</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Initial state:</strong> 80-rack data center, no containment, random tile placement, missing blanking panels in 60% of racks, cables obstructing airflow. Hot spots in 8 racks. 12 PAC units running (10 kW each).</p>
        <p style={S.p}><strong>Assessment:</strong> Thermal mapping reveal kiya — 15°C cold aisle temperature, server inlets 24-32°C. Significant bypass and recirculation.</p>
        <p style={S.p}><strong>Actions taken:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Step 1: 100% blanking panels in all racks (2 days)</li>
          <li style={S.li}>Step 2: Floor tile audit and correction (1 day)</li>
          <li style={S.li}>Step 3: Install grommets in the cable openings</li>
          <li style={S.li}>Step 4: Install cold aisle containment</li>
          <li style={S.li}>Step 5: Raise the PAC setpoint from 15°C to 21°C</li>
        </ul>
        <p style={S.p}><strong>Result:</strong> Server inlet 20-24°C — uniform. Hot spots zero. 3 PAC units standby. Estimated energy savings: 20%.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Airflow Issues</h2>

        <h3 style={S.h3}>Hot Spots</h3>
        <p style={S.p}>High temperature at specific racks or locations. Cause: Recirculation, insufficient cooling delivery, high heat load. Action: Temperature mapping, identify the source, fix (blanking panels, tile placement, add cooling).</p>

        <h3 style={S.h3}>Uneven Cold Aisle Temperature</h3>
        <p style={S.p}>18°C on some racks, 28°C on others. Cause: Uneven floor tile distribution, variable rack density, PAC placement. Action: Floor tile redistribution, balanced cooling delivery.</p>

        <h3 style={S.h3}>PAC Short Cycling</h3>
        <p style={S.p}>PAC units are switching on/off too frequently. Cause: Bypass air — the return temperature is cool (cool air bypass), the unit thinks it's done, shuts off — the cycle repeats. Action: Eliminate bypass, fix the return air path.</p>

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
          <li style={S.li}><strong>Annual:</strong> Full airflow audit — update the CFD model if there were changes</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Hot spot alarms in the BMS — any alerts?</li>
          <li style={S.li}>✓ Cold aisle temperature — within normal range?</li>
          <li style={S.li}>✓ Hot aisle temperature — normal?</li>
          <li style={S.li}>✓ New equipment installed? — Check the blanking panels</li>
          <li style={S.li}>✓ Containment doors closed (except maintenance)?</li>
          <li style={S.li}>✓ Anything visually unusual — displaced tiles, open rack gaps?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Walk all rack rows — blanking panels complete?</li>
          <li style={S.li}>✓ Floor tiles — perforated only in the cold aisle?</li>
          <li style={S.li}>✓ Cable openings sealed?</li>
          <li style={S.li}>✓ Temperature spot check — at least 5 racks sampled</li>
          <li style={S.li}>✓ Any hot spots developing?</li>
          <li style={S.li}>✓ PAC/CRAC setpoints correct?</li>
          <li style={S.li}>✓ Changes this month? Layout changes → assess the airflow impact</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Notes</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Raised floor work:</strong> Floor panels heavy — proper lifting. Two persons for large tiles. Footwear — raised floor edges sharp.</li>
          <li style={S.li}><strong>Hot aisle work:</strong> Temperature 35-45°C — limit time, water, buddy system</li>
          <li style={S.li}><strong>Containment work:</strong> Enclosed space — the cool aisle is cool, the hot aisle is hot</li>
          <li style={S.li}><strong>Working above racks:</strong> Ceiling-level work — ladder safety</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the difference between bypass air and recirculation?</h3>
        <p style={S.p}><strong>Answer:</strong> Bypass air = cool air that avoids the servers and goes directly into the PAC return — wasted cooling. Recirculation = hot exhaust air that comes back to the server intake — the server gets warm air. Bypass = cooling waste. Recirculation = server heating. Both are problematic but different issues.</p>

        <h3 style={S.h3}>Q2: What is the correct use of blanking panels and perforated floor tiles?</h3>
        <p style={S.p}><strong>Answer:</strong> Blanking panels: seal the empty spaces of the rack — they stop recirculation. Without blanking panels, hot air short-circuits through the rack to the front. Perforated floor tiles: only in the cold aisle — directly in front of the server rack. Solid tiles in the hot aisle and non-rack areas — otherwise cool air will bypass.</p>

        <h3 style={S.h3}>Q3: How is a hot spot identified and resolved?</h3>
        <p style={S.p}><strong>Answer:</strong> Identify: Temperature mapping — measure the cold aisle inlet temperature of every rack. 28°C+ is a hot spot. DCIM temperature sensors give real-time alerts. Resolve: 1) Check the blanking panels, 2) Verify floor tile placement, 3) Check for containment gaps, 4) Identify recirculation sources, 5) Add cooling capacity if needed.</p>

        <h3 style={S.h3}>Q4: What is CFD modeling and when is it used?</h3>
        <p style={S.p}><strong>Answer:</strong> CFD = a Computational Fluid Dynamics simulation that visualizes air flow in the data center — without making physical changes. It is used for: new data center design, before major changes, hot spot diagnosis, cooling capacity planning. The software shows temperatures, airflow velocities and pressure distribution in a 3D model. It predicts hot spots before physical testing.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Scenario: Server high temperature alert</h3>
        <ul style={S.ul}>
          <li style={S.li}>Cold aisle temperature check — is it normal?</li>
          <li style={S.li}>Blanking panels in the server's rack — complete?</li>
          <li style={S.li}>Adjacent racks — check the hot air exhaust direction</li>
          <li style={S.li}>Floor tile — is there a perforated tile in the cold aisle in front of the server?</li>
          <li style={S.li}>PAC unit running? Setpoint correct?</li>
          <li style={S.li}>Has the IT load increased? New servers added?</li>
        </ul>

        <h3 style={S.h3}>Scenario: Cold aisle temperature uneven — one end hot</h3>
        <ul style={S.ul}>
          <li style={S.li}>Check floor tile distribution — too many tiles near the PAC?</li>
          <li style={S.li}>PAC placement — cooling reaching the far end</li>
          <li style={S.li}>Is there a bypass path at the far end? — Hot air coming around?</li>
          <li style={S.li}>Consider additional perforated tiles at the far end</li>
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
          <li style={S.li}><strong>Blanking panels 100%:</strong> This is non-negotiable. Every rack, every empty space. Always.</li>
          <li style={S.li}><strong>Floor tile discipline:</strong> Mark tiles clearly — perforated in cold aisle, solid elsewhere. Enforce policy.</li>
          <li style={S.li}><strong>No equipment changes without airflow review:</strong> New rack in, blanking panels installed, tile placement checked. Every time.</li>
          <li style={S.li}><strong>Temperature mapping quarterly:</strong> Trend it — identify deteriorating areas early.</li>
          <li style={S.li}><strong>DCIM integration:</strong> Real-time temperature monitoring. Automatic alerts for deviations.</li>
          <li style={S.li}><strong>Take cable management seriously:</strong> Cable bundles sabotage airflow. Proper trays, ties, routing.</li>
          <li style={S.li}><strong>Train the operations team:</strong> Why blanking panels are important — everyone should know. A missing panel discovered by a new person is a win.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Airflow management = getting cool air to the servers efficiently, bringing hot air back, stopping mixing.",
          "Three enemies: bypass air (cooling waste), recirculation (server heating), hot spots (local overheating).",
          "Blanking panels are the most important, cheapest, easiest fix. Install them first — always 100%.",
          "Perforated floor tiles only in the cold aisle — solid tiles in the hot aisle and other areas.",
          "Containment + blanking panels + proper tile placement = 30-50% cooling efficiency improvement.",
          "Hot spots = identify them with temperature mapping, fix the root cause — do not add a PAC blindly.",
          "Monthly: blanking panels audit, tile check. Quarterly: full temperature mapping. Annual: airflow audit.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Airflow management is complete. Next, understand measurement and metrics:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — the metric to measure airflow management effectiveness.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — the advanced step of airflow management — physical air separation.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — PAC and CRAC — the ones that deliver the air.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — airflow management through the CRAH in chiller-based systems.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
