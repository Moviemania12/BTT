import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "PAC — Precision Air Conditioner in Data Centers | Behind The Tech",
  description:
    "What is a PAC, how does it work, why is it used in a Data Center — working principle, components, types, maintenance and troubleshooting. In simple English.",
  keywords: ["pac data center", "precision air conditioner", "data center cooling", "pac vs crac", "data center hvac"],
  openGraph: {
    title: "PAC — Precision Air Conditioner in Data Centers",
    description: "The first step of Data Center cooling — how a PAC works, where it is installed, and why it is different from a normal AC.",
    url: "https://behindthetech.in/learn/non-it/cooling/pac",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAC Explained — Behind The Tech",
    description: "Precision Air Conditioner — the basic unit of Data Center cooling, in simple language.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/pac",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/pac",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/pac",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/pac",
    },
  },
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
    { label: "In one line", text: "A PAC is a precision cooling unit installed near the server racks in a Data Center that keeps them cool 24×7." },
    { label: "Why it is different from a normal AC", text: "A home AC only controls temperature. A PAC controls both temperature and humidity, runs non-stop, and delivers safe cool air for servers." },
    { label: "What is inside", text: "Compressor, evaporator coil, condenser, expansion valve — together they run the refrigeration cycle. Warm air comes in, cool air goes out." },
    { label: "Where in a Data Center", text: "Inside the server room, beside the racks or at the end of a row. It is mounted directly on the floor or on a raised floor." },
    { label: "How important it is", text: "Without cooling, servers overheat in 10-15 minutes. The PAC prevents this failure — it is a critical infrastructure component." },
    { label: "Difference from CRAC", text: "A PAC is self-contained — it has its own compressor, condenser, everything. A CRAC has a chilled water system or an external condenser. Both do the same job — the approach is different." },
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
          If you have understood this much, the PAC concept is clear. The full article is ahead — from working principle to troubleshooting.
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
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer's Tip</span>
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
  { q: "What is the difference between a PAC and a normal AC?", a: "A normal AC only controls temperature and is designed for human comfort. A PAC controls both temperature and humidity, is built for 24×7 continuous operation, and delivers precise airflow for servers. A normal AC does not have this much precision." },
  { q: "What is the kW rating of a PAC?", a: "Typically from 5 kW to 60 kW. Small server rooms use 10-20 kW units. In large data centers, multiple units work in parallel." },
  { q: "How often should a PAC be serviced?", a: "Daily inspection, monthly filter cleaning, and quarterly full preventive maintenance. If the cooling load is high, more frequent servicing is necessary." },
  { q: "What happens if a PAC fails?", a: "The redundant PAC will automatically take the load (in an N+1 design). The IT equipment will trigger a temperature alarm. If cooling fails completely, servers will shut down. That is why redundancy is essential." },
  { q: "Which refrigerant is used in a PAC?", a: "Mostly R410A or R407C in modern units. Older units had R22, which is now being phased out. The refrigerant type is written on the unit's nameplate." },
  { q: "What is the SHR of a PAC?", a: "SHR = Sensible Heat Ratio. In a Data Center, servers generate only sensible heat (they raise temperature); latent heat (moisture) is low. The SHR of a PAC is 0.90-0.95 — a perfect match for the heat profile of servers." },
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
      <ArticleLayout slug="pac" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/cooling/pac">

        <p style={S.p}>Imagine a bank's server room. There are only 20 servers. The room is small — 10×10 feet.</p>
        <p style={S.p}>Those 20 servers work 24 hours. At night too. On weekends too. 365 days a year.</p>
        <p style={S.p}>These servers generate heat. If this heat stays in the room, the temperature will climb to 45°C, 50°C, 60°C.</p>
        <p style={S.p}><strong>If servers go above 35-40°C, they shut down.</strong></p>
        <p style={S.p}>The solution to exactly this problem is — <strong>the PAC (Precision Air Conditioner).</strong></p>

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
          <figcaption style={S.imageCaption}>PAC unit — installed in a Data Center server room. This white/grey cabinet sits near the servers.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-pac" style={S.h1}>What Is a PAC?</h2>

        <p style={S.p}><strong>PAC = Precision Air Conditioner.</strong></p>
        <p style={S.p}>It is a specialized cooling unit designed specifically for Data Centers and Server Rooms.</p>
        <p style={S.p}>Compare it with a home AC:</p>
        <ul style={S.ul}>
          <li style={S.li}>Home AC → to keep people comfortable. 22°C to 26°C. Switched off at night.</li>
          <li style={S.li}>PAC → to keep servers safe. 18°C to 24°C. Never switched off.</li>
        </ul>
        <p style={S.p}>A PAC does not only control temperature — <strong>it also controls humidity.</strong></p>
        <p style={S.p}>Low humidity → static electricity → components can get damaged.</p>
        <p style={S.p}>High humidity → moisture → corrosion, short circuit.</p>
        <p style={S.p}><strong>Ideal range: Temperature 18-27°C, Humidity 40-60% RH.</strong></p>

        <DCMapNote components={["PAC", "CRAC", "CRAH", "Server Racks", "Cold Aisle"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is PAC Needed?</h2>

        <p style={S.p}>Servers consume electricity. This electricity turns into heat.</p>
        <p style={S.p}>A typical 1U server generates 200-400W. One rack can have 20-40 servers.</p>
        <p style={S.p}>Heat of one rack: 20 servers × 300W = <strong>6000W = 6 kW.</strong></p>
        <p style={S.p}>Heat of 20 racks: 20 × 6 kW = <strong>120 kW.</strong></p>
        <p style={S.p}>Where will this heat go? It has to be removed. Otherwise the room will become an oven.</p>

        <WhyThisMatters>
          According to the standards of ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers), the server inlet temperature in a Data Center should be 18°C to 27°C. If this range is crossed, server performance degrades, component life span reduces, and a thermal shutdown can happen.
        </WhyThisMatters>

        <p style={S.p}>A normal building AC does not work because:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Continuous operation:</strong> A normal AC is designed for 8-12 hours. A PAC works 8760 hours/year (365 × 24).</li>
          <li style={S.li}><strong>High heat density:</strong> Servers generate a lot of heat in a small space. A normal AC does not have the capacity for this.</li>
          <li style={S.li}><strong>Humidity control:</strong> A normal AC only controls temperature. Not humidity.</li>
          <li style={S.li}><strong>Precision:</strong> A normal AC accepts ±3-5°C variation. A PAC maintains ±1°C.</li>
          <li style={S.li}><strong>Sensible heat ratio:</strong> Servers generate sensible heat (raises temperature, not moisture). A normal AC has a low SHR — it is built to cool humid air.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>A PAC works on a simple principle:</p>
        <p style={S.p}><strong>Warm air in → cool it → cool air out.</strong></p>
        <p style={S.p}>This cycle is achieved using a refrigerant (a special gas).</p>

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
          A PAC has a fan that pulls warm air from the server racks. This warm air passes through the evaporator coil, where the refrigerant is. The refrigerant absorbs this heat. Now cool air comes out through the fan and cools the servers. This cycle repeats continuously.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="refrigeration-cycle" style={S.h1}>Refrigeration Cycle Explained</h2>

        <p style={S.p}>Understanding the refrigeration cycle is essential. Don't worry — it is simple.</p>
        <p style={S.p}><strong>Refrigerant</strong> is a special fluid that can easily turn from liquid to gas and from gas to liquid.</p>
        <p style={S.p}>Cooling happens by using this property:</p>

        <FlowDiagram
          caption="Refrigeration cycle — the complete cycle in 4 steps"
          steps={[
            { icon: "❄️", label: "Evaporator", sublabel: "Liquid → Gas, Heat absorb" },
            { icon: "⚙️", label: "Compressor", sublabel: "Gas gets compressed" },
            { icon: "🌡️", label: "Condenser", sublabel: "Gas → Liquid, Heat release" },
            { icon: "🔧", label: "Expansion Valve", sublabel: "Pressure drops" },
          ]}
        />

        <h3 style={S.h3}>Step 1 — Evaporator (Cooling Happens Here)</h3>
        <p style={S.p}>The refrigerant comes into the evaporator coil in liquid form. Warm air passes over the coil. The refrigerant absorbs this heat and turns into gas. The air gets cooled.</p>
        <p style={S.p}><em>Analogy:</em> In a cooler, water evaporates and you feel cool — same concept.</p>

        <h3 style={S.h3}>Step 2 — Compressor (Pressure Increase)</h3>
        <p style={S.p}>The gas-form refrigerant goes into the compressor. The compressor compresses it to high pressure. Compression also raises its temperature — it is now a hot compressed gas.</p>

        <h3 style={S.h3}>Step 3 — Condenser (Heat Release)</h3>
        <p style={S.p}>The hot compressed gas goes into the condenser. Here it releases heat. The heat leaves through the condenser — outside the building or into a cooling tower. The gas turns into liquid.</p>

        <h3 style={S.h3}>Step 4 — Expansion Valve (Pressure Drop)</h3>
        <p style={S.p}>The liquid refrigerant passes through the expansion valve. The pressure drops. The refrigerant becomes cold. Now it goes back into the evaporator — cycle complete.</p>

        <EngineerTip>
          A shortcut to remember the refrigeration cycle: <strong>Evaporator = absorb, Compressor = compress, Condenser = reject, Expansion = expand.</strong> ECCE — never forget this sequence.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Compressor</h3>
        <p style={S.p}>The "heart" of the PAC. It compresses the refrigerant gas. It is the most power-consuming component. Modern units have a scroll type or reciprocating type.</p>

        <h3 style={S.h3}>2. Evaporator Coil (Indoor Coil)</h3>
        <p style={S.p}>This is where the actual cooling happens. The refrigerant passes through this coil and absorbs the heat of the warm air. It is an assembly of fins and tubes — more surface area = more heat transfer.</p>

        <h3 style={S.h3}>3. Condenser</h3>
        <p style={S.p}>It releases heat outside. It can be air-cooled (air via fan) or water-cooled (via chilled water). A self-contained PAC has an air-cooled condenser.</p>

        <h3 style={S.h3}>4. Expansion Valve (TEV / EEV)</h3>
        <p style={S.p}>It controls the flow and pressure of the refrigerant. TEV = Thermostatic Expansion Valve (mechanical). EEV = Electronic Expansion Valve (electronic control — more precise). Modern PACs use an EEV.</p>

        <h3 style={S.h3}>5. Fan / Blower</h3>
        <p style={S.p}>It pulls air from the server racks and returns cool air. Modern PACs have EC (Electronically Commutated) fans — their speed is variable and they are energy efficient.</p>

        <h3 style={S.h3}>6. Microprocessor Controller</h3>
        <p style={S.p}>The "brain" of the PAC. It takes readings from temperature and humidity sensors. It controls the compressor, fans and heater. It generates alarms. It communicates with the BMS (Building Management System).</p>

        <h3 style={S.h3}>7. Humidifier / Dehumidifier</h3>
        <p style={S.p}>For humidity control. If humidity is low, the humidifier adds steam or water mist. If humidity is high, moisture is removed through condensation in dehumidification mode.</p>

        <h3 style={S.h3}>8. Electric Heater (Optional)</h3>
        <p style={S.p}>In cold weather, when there is not enough heat from the servers, the PAC can also do heating. This ensures the temperature does not go below the minimum.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How PAC Works Inside a Data Center</h2>

        <p style={S.p}>Now look at it in a real Data Center scenario.</p>

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
          <figcaption style={S.imageCaption}>Cold Aisle / Hot Aisle arrangement — cool air from the PAC goes into the cold aisle, hot air collects in the hot aisle.</figcaption>
        </figure>

        <p style={S.p}>In a Data Center, server racks are installed in rows. Between the racks there are two kinds of aisles (corridors):</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Cold Aisle</strong> — where cold air comes from the PAC. The front side of the servers faces here.</li>
          <li style={S.li}><strong>Hot Aisle</strong> — where hot air comes out of the servers. The back side of the servers faces here.</li>
        </ul>
        <p style={S.p}>The PAC is installed in or near the cold aisle. Cool air goes into the cold aisle → passes through the servers → comes out into the hot aisle → the PAC pulls it back → cools it → then into the cold aisle again.</p>
        <p style={S.p}><strong>This is a closed loop.</strong></p>

        <InsightCard>
          One important point: cool air from a PAC can come from below or from above. In a raised floor system, the PAC sends cool air under the raised floor and it comes out through perforated tiles. This is what keeps the cold aisle cool. Without a raised floor, the PAC delivers cool air directly from floor level or from the ceiling.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of PAC</h2>

        <h3 style={S.h3}>1. Downflow PAC</h3>
        <p style={S.p}>Cool air comes out from below — into the raised floor. The most common type. Warm air is pulled from the racks from above.</p>

        <h3 style={S.h3}>2. Upflow PAC</h3>
        <p style={S.p}>Cool air comes out from above. When there is no raised floor. Air is distributed directly from ceiling level or through overhead ducts.</p>

        <h3 style={S.h3}>3. In-Row Cooling</h3>
        <p style={S.p}>The PAC unit is installed directly between rack rows. Cooling very close to the heat load. Best for high-density environments. Short air paths — efficient.</p>

        <h3 style={S.h3}>4. In-Rack Cooling</h3>
        <p style={S.p}>The cooling unit is installed directly inside the rack. For ultra-high density servers. Rare — mostly in specialized applications.</p>

        <h3 style={S.h3}>5. Air-Cooled PAC</h3>
        <p style={S.p}>The condenser releases heat to the outside air. The external condenser is installed outside the building on a wall or on the roof. Simpler installation.</p>

        <h3 style={S.h3}>6. Water-Cooled PAC</h3>
        <p style={S.p}>The condenser releases heat into a chilled water loop. It works with a chiller system. Better efficiency but requires water infrastructure.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Precision control:</strong> Maintains temperature ±1°C, humidity ±5% RH</li>
          <li style={S.li}><strong>24×7 operation:</strong> Continuous duty rated — never switched off</li>
          <li style={S.li}><strong>High SHR:</strong> A perfect match for the server heat profile</li>
          <li style={S.li}><strong>Self-contained:</strong> Compressor, condenser — all in one unit (in the air-cooled type)</li>
          <li style={S.li}><strong>Redundancy possible:</strong> N+1 design — if one fails, another is active</li>
          <li style={S.li}><strong>BMS integration:</strong> Remote monitoring and alarms</li>
          <li style={S.li}><strong>Scalable:</strong> Add new units as load increases</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Higher cost:</strong> 3-5x more expensive than a normal AC</li>
          <li style={S.li}><strong>Space requirement:</strong> Large units take up floor space</li>
          <li style={S.li}><strong>External condenser:</strong> The air-cooled type also needs an outdoor unit</li>
          <li style={S.li}><strong>Energy consumption:</strong> Runs 24×7 — higher electricity bill</li>
          <li style={S.li}><strong>Skilled maintenance:</strong> Needs an HVAC certified technician</li>
          <li style={S.li}><strong>Limited for high density:</strong> Very high density racks (20+ kW/rack) need supplementary cooling</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Scenario:</strong> A 200 sqm colocation data center, 50 racks, average 5 kW per rack.</p>
        <p style={S.p}><strong>Total heat load:</strong> 50 × 5 = 250 kW</p>
        <p style={S.p}><strong>PAC sizing:</strong> 10 PAC units of 30 kW cooling capacity (total 300 kW) — in N+1, 9 units are enough, 1 standby.</p>
        <p style={S.p}><strong>Arrangement:</strong> Downflow PAC, raised floor 500mm height. Cold aisle / hot aisle containment.</p>
        <p style={S.p}><strong>Redundancy:</strong> N+1 — if any one unit fails, the remaining 9 will handle the full load.</p>
        <p style={S.p}><strong>Monitoring:</strong> All PACs are connected to the BMS. Temperature, humidity, alarms — everything is monitored centrally.</p>

        <InsightCard>
          In real data centers, PAC units are checked 24×7. The BMS has a dedicated cooling overview screen showing each PAC's status, temperature readings and alarms. If any PAC gives a high temperature alarm, it is investigated immediately — nobody waits.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <h3 style={S.h3}>1. High Supply Air Temperature Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Dirty filters, low refrigerant, compressor issue, high room heat load.</p>
        <p style={S.p}><strong>Impact:</strong> Server inlet temperature rises. A high temperature alarm is triggered.</p>

        <h3 style={S.h3}>2. High/Low Humidity Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Humidifier failure, dehumidification circuit issue, water supply problem.</p>
        <p style={S.p}><strong>Impact:</strong> Static discharge risk (low humidity), condensation risk (high humidity).</p>

        <h3 style={S.h3}>3. High Head Pressure</h3>
        <p style={S.p}><strong>Cause:</strong> Dirty condenser coil, condenser fan failure, refrigerant overcharge, high outdoor temperature.</p>
        <p style={S.p}><strong>Impact:</strong> The compressor trips, cooling stops.</p>

        <h3 style={S.h3}>4. Low Suction Pressure (Low Refrigerant)</h3>
        <p style={S.p}><strong>Cause:</strong> Refrigerant leak, expansion valve issue.</p>
        <p style={S.p}><strong>Impact:</strong> Cooling capacity reduces, the evaporator can freeze.</p>

        <h3 style={S.h3}>5. Filter Clog Alarm</h3>
        <p style={S.p}><strong>Cause:</strong> Air filters have clogged — dust, particles.</p>
        <p style={S.p}><strong>Impact:</strong> Airflow reduces, cooling efficiency drops.</p>

        <h3 style={S.h3}>6. Water Leak / Condensate Drain Block</h3>
        <p style={S.p}><strong>Cause:</strong> Drain pan full, drain pipe blocked.</p>
        <p style={S.p}><strong>Impact:</strong> Water leak → equipment damage → serious hazard.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>

        <p style={S.p}><strong>Quarterly (3 months) maintenance:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Clean or replace the air filter</li>
          <li style={S.li}>Inspect the evaporator coil — clean the fins</li>
          <li style={S.li}>Clean the condenser coil</li>
          <li style={S.li}>Check refrigerant pressure (suction and discharge)</li>
          <li style={S.li}>Tighten electrical connections</li>
          <li style={S.li}>Check fan belts or bearings (older units)</li>
          <li style={S.li}>Clean the condensate drain</li>
          <li style={S.li}>Verify controller settings</li>
          <li style={S.li}>Check temperature calibration</li>
        </ul>

        <p style={S.p}><strong>Annual maintenance:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Full refrigerant system check — leak test</li>
          <li style={S.li}>Verify compressor current draw</li>
          <li style={S.li}>Recalibrate all sensors</li>
          <li style={S.li}>Replace the humidifier cylinder (if applicable)</li>
          <li style={S.li}>Electrical insulation test</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Inspection Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Note the supply air temperature reading (target 18-22°C)</li>
          <li style={S.li}>✓ Return air temperature reading (target 27-35°C)</li>
          <li style={S.li}>✓ Room humidity reading (target 40-60% RH)</li>
          <li style={S.li}>✓ PAC unit status — running / standby / fault</li>
          <li style={S.li}>✓ Check active alarms — on the BMS</li>
          <li style={S.li}>✓ Check for unusual noise or vibration</li>
          <li style={S.li}>✓ Check for water leaks — drain pan area</li>
          <li style={S.li}>✓ Filter differential pressure (if monitored)</li>
          <li style={S.li}>✓ Compressor running status</li>
          <li style={S.li}>✓ Fan status — speed and airflow</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>

        <ul style={S.ul}>
          <li style={S.li}>✓ Inspect the air filter — does it need cleaning or replacing?</li>
          <li style={S.li}>✓ Flush the condensate drain — check for blockage</li>
          <li style={S.li}>✓ Visually inspect the evaporator coil</li>
          <li style={S.li}>✓ Verify temperature/humidity sensor readings — are they calibrated?</li>
          <li style={S.li}>✓ Do a PAC switchover test — start the standby unit, stop the primary — does it transfer smoothly?</li>
          <li style={S.li}>✓ Review BMS alarm history — identify recurring issues</li>
          <li style={S.li}>✓ Electrical panel — check breakers and switches</li>
          <li style={S.li}>✓ Update the log book — readings, maintenance done</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Electrical isolation:</strong> Before maintenance, switch off the MCB/MCCB and apply LOTO (Lockout Tagout)</li>
          <li style={S.li}><strong>Refrigerant handling:</strong> Only a certified HVAC technician should handle refrigerant — direct skin contact or inhalation is dangerous</li>
          <li style={S.li}><strong>High pressure:</strong> The refrigerant system is under high pressure — unauthorized opening is dangerous</li>
          <li style={S.li}><strong>Water leak response:</strong> As soon as a leak is seen, clear it away from electrical equipment — it is also a slip hazard</li>
          <li style={S.li}><strong>PPE:</strong> Gloves and safety glasses are mandatory — during maintenance</li>
          <li style={S.li}><strong>Permit to Work:</strong> It is not hot work, but an entry permit and LOTO are mandatory — follow the data center policy</li>
          <li style={S.li}><strong>Ensure redundancy:</strong> Before maintenance, confirm that the standby unit is running</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the difference between a PAC and a normal AC?</h3>
        <p style={S.p}><strong>Answer:</strong> A PAC is for precision cooling — continuous duty, humidity control, high SHR. A normal AC is for human comfort — intermittent use, only temperature control, low SHR. A PAC maintains server inlet temperature within ±1°C.</p>

        <h3 style={S.h3}>Q2: What is SHR and why is it important in a Data Center?</h3>
        <p style={S.p}><strong>Answer:</strong> SHR = Sensible Heat Ratio = Sensible cooling / Total cooling. Servers generate only sensible heat (temperature), not latent heat (moisture). A PAC's SHR should be 0.90-0.95 — this matches the load profile of servers. A normal AC's SHR is 0.65-0.75 — it is designed for humid air.</p>

        <h3 style={S.h3}>Q3: What is N+1 redundancy in the context of a PAC?</h3>
        <p style={S.p}><strong>Answer:</strong> N = required units, +1 = one extra unit. If 9 units are enough to run the full load, install 10. If one fails, the remaining 9 handle the load. No downtime.</p>

        <h3 style={S.h3}>Q4: What does a high head pressure alarm in a PAC indicate?</h3>
        <p style={S.p}><strong>Answer:</strong> A problem on the condenser side — dirty condenser coil, condenser fan failure, high ambient temperature, or refrigerant overcharge. The compressor can trip — immediate investigation is necessary.</p>

        <h3 style={S.h3}>Q5: What is a cold aisle / hot aisle?</h3>
        <p style={S.p}><strong>Answer:</strong> Server racks are installed facing alternate directions. In the cold aisle, the fronts of the servers face — cool air from the PAC comes here. In the hot aisle, the backs of the servers — exhaust air comes out here. Mixing reduces and cooling efficiency improves.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting Guide</h2>

        <h3 style={S.h3}>Problem: Room temperature is rising</h3>
        <ul style={S.ul}>
          <li style={S.li}>Check: How many PAC units are actually running?</li>
          <li style={S.li}>Check the filter — is it clogged?</li>
          <li style={S.li}>Measure the supply air temperature — is cool air coming from the PAC?</li>
          <li style={S.li}>Check hot aisle / cold aisle separation — is mixing happening?</li>
          <li style={S.li}>Has the IT load suddenly increased — were new servers added?</li>
        </ul>

        <h3 style={S.h3}>Problem: Humidity out of range</h3>
        <ul style={S.ul}>
          <li style={S.li}>Check the humidity reading on the PAC controller</li>
          <li style={S.li}>Check humidifier status — is there a fault alarm?</li>
          <li style={S.li}>Check the water supply to the humidifier</li>
          <li style={S.li}>Compare readings of multiple PACs — single unit issue or systemic?</li>
        </ul>

        <h3 style={S.h3}>Problem: PAC has tripped / fault alarm</h3>
        <ul style={S.ul}>
          <li style={S.li}>Read the fault code on the controller display</li>
          <li style={S.li}>Immediately confirm the standby unit is running</li>
          <li style={S.li}>Check for an MCB/circuit breaker trip</li>
          <li style={S.li}>High head pressure → check the condenser</li>
          <li style={S.li}>Low suction pressure → suspect a refrigerant leak → call a qualified technician</li>
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
          <li style={S.li}><strong>Always N+1:</strong> Never keep a single point of failure. There should be at least one extra PAC.</li>
          <li style={S.li}><strong>Hot/Cold aisle containment:</strong> PAC efficiency improves by 30-40% with containment.</li>
          <li style={S.li}><strong>Blanking panels:</strong> Install blanking panels in empty rack spaces — it stops hot/cold air mixing.</li>
          <li style={S.li}><strong>Filter schedule:</strong> Regular filter maintenance = consistent airflow = consistent cooling.</li>
          <li style={S.li}><strong>Setpoint management:</strong> Keep the room temperature setpoint at 21-23°C — colder is a waste of energy.</li>
          <li style={S.li}><strong>BMS integration:</strong> Connect all PACs to the BMS — remote monitoring and automatic alarms.</li>
          <li style={S.li}><strong>Standby rotation:</strong> Rotate the primary and standby units — equal wear on both.</li>
          <li style={S.li}><strong>Load balancing:</strong> Distribute PAC units evenly in the room — avoid hot spots.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "A PAC is a Precision Air Conditioner — a cooling unit designed specifically for Data Centers.",
          "Different from a normal AC because: 24×7 continuous, temperature + humidity control, high SHR, precision ±1°C.",
          "Refrigeration cycle: Evaporator (heat absorb) → Compressor (compress) → Condenser (heat reject) → Expansion valve → repeat.",
          "Cool air is delivered into the cold aisle. Warm air collects in the hot aisle. The PAC maintains this cycle.",
          "N+1 redundancy is essential — if one fails, another takes the load. No downtime.",
          "Daily inspection, monthly maintenance, quarterly full PM — follow this routine. Do not neglect the PAC.",
          "Common faults: high supply temperature, humidity out of range, high head pressure, low refrigerant. Remember the causes and solutions of each.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Now the PAC is clear. Understand the cooling system further:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="crac" variant="inline" /> — the PAC's cousin. Different compressor approach, same goal.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — the centralized cooling system in large data centers.</li>
          <li style={S.li}><TopicLink slug="containment" variant="inline" /> — Hot aisle / cold aisle containment — improves PAC efficiency.</li>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — how cool air reaches the right place — complete guide.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — a metric to measure cooling effectiveness.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
