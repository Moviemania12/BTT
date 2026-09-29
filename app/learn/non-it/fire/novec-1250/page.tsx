import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Novec 1250 Fire Suppression in Data Centers | Behind The Tech",
  description:
    "What is Novec 1250, why is it better than FM200, how is it used in a Data Center — 3M FK-5-1-12, clean agent, environmental impact and a practical guide. In simple English.",
  keywords: ["novec 1250 data center", "3m novec 1250", "fk-5-1-12", "clean agent suppression", "novec vs fm200"],
  openGraph: {
    title: "Novec 1250 Fire Suppression in Data Centers",
    description: "The green alternative to FM200 — what Novec 1250 is and why it is used in Data Centers.",
    url: "https://behindthetech.in/learn/non-it/fire/novec-1250",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novec 1250 Explained — Behind The Tech",
    description: "Novec 1250 — the next-gen replacement for FM200, in simple language.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/novec-1250",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/novec-1250",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/novec-1250",
      "x-default": "https://behindthetech.in/learn/non-it/fire/novec-1250",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-novec1250",    text: "What Is Novec 1250?",                    level: 2 },
  { id: "why-needed",           text: "Why Is Novec 1250 Needed?",              level: 2 },
  { id: "working-principle",    text: "Working Principle",                       level: 2 },
  { id: "main-components",      text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",   text: "How Novec 1250 Works in a Data Center",  level: 2 },
  { id: "discharge-sequence",   text: "Discharge Sequence",                      level: 2 },
  { id: "environmental",        text: "Environmental Profile",                   level: 2 },
  { id: "installation",         text: "Installation Considerations",             level: 2 },
  { id: "advantages",           text: "Advantages",                              level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "testing",              text: "Testing",                                 level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",      text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "Novec 1250 vs FM200 vs Novec 1230",       level: 2 },
  { id: "best-practices",       text: "Best Practices",                          level: 2 },
  { id: "key-takeaways",        text: "Key Takeaways",                           level: 2 },
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
    { label: "In one line", text: "FK-5-1-12 is a next-generation clean agent — a better environmental profile than FM200, and its GWP is only 1 while the GWP of FM200 is 3,220." },
    { label: "Chemical name", text: "Chemical name FK-5-1-12 (Dodecafluoro-2-methylpentan-3-one). 3M used to market it under the name Novec 1230 Fire Protection Fluid. It is stored in liquid form — different from gaseous FM200." },
    { label: "How it extinguishes", text: "Heat absorption like FM200 — but more effective. While converting from liquid to gas it absorbs a very large amount of heat. The heat element of the fire triangle is removed." },
    { label: "Environmental edge", text: "Atmospheric lifetime only 5 days — FM200 31-39 days. GWP = 1 — practically zero climate impact. Ozone depletion potential = 0." },
    { label: "Where it differs from FM200", text: "Novec 1250 is stored in liquid form — more agent fits in a smaller cylinder. Design concentration 4.2-6% — less is needed than the 7-8% of FM200." },
    { label: "Where it is used", text: "It is preferred in new data center builds where GWP compliance or ESG goals are important. In Europe, F-Gas regulations are bringing restrictions on high-GWP agents — FK-5-1-12 is a compliant agent. In India the applicable regulations are still evolving — check the local AHJ and project requirements." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#059669,#059669)" }} />
      <div style={{ background: "rgba(5,150,105,0.03)", border: "1px solid rgba(5,150,105,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#059669", fontWeight: 600, marginBottom: 16 }}>🧪 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#059669", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(5,150,105,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          If you have understood this much, the concept of Novec 1250 is clear. If you have read FM200, this article will feel even easier.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(5,150,105,0.05)", border: "1px solid rgba(5,150,105,0.18)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(5,150,105,0.05),rgba(37,99,235,0.03))", border: "1px solid rgba(5,150,105,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#059669,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#059669", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(5,150,105,0.02)", border: "1px solid rgba(5,150,105,0.12)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#059669", margin: "0 4px", opacity: 0.7 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Chemical name",          n1250: "FK-5-1-12",                  fm200: "HFC-227ea",              n1230: "FK-5-1-12 (same agent)" },
    { feature: "Brand / Manufacturer",   n1250: "3M (Novec 1230 brand)",    fm200: "Various (Chemours etc)", n1230: "Various — Kidde, Fike, others" },
    { feature: "Physical state (stored)",n1250: "Liquid",                    fm200: "Gas / Liquid",           n1230: "Liquid" },
    { feature: "GWP",                    n1250: "1",                         fm200: "3,220",                  n1230: "1" },
    { feature: "Atmospheric lifetime",   n1250: "5 days",                    fm200: "31-39 days",             n1230: "5 days" },
    { feature: "ODP",                    n1250: "0",                         fm200: "0",                      n1230: "0" },
    { feature: "Design concentration",   n1250: "4.2% (Class A), 5.9% (B)", fm200: "7.0-8.0%",              n1230: "4.2-5.9%" },
    { feature: "Agent quantity needed",  n1250: "Less",                      fm200: "More",                   n1230: "Same as 1250" },
    { feature: "Cost (upfront)",         n1250: "Higher than FM200",         fm200: "Lower",                  n1230: "Similar to 1250" },
    { feature: "Future regulation risk", n1250: "Low — environmentally safe",fm200: "High — GWP concerns",    n1230: "Low" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(5,150,105,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(5,150,105,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#059669", fontWeight: 600, border: "1px solid rgba(5,150,105,0.12)" }}>Novec 1250</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(5,150,105,0.12)" }}>FM200</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(5,150,105,0.12)" }}>Novec 1230 (FK-5-1-12 — same agent, other brand names)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(5,150,105,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(5,150,105,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(5,150,105,0.08)" }}>{row.n1250}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(5,150,105,0.08)" }}>{row.fm200}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(5,150,105,0.08)" }}>{row.n1230}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "What is Novec 1230, and what is the name 'Novec 1250' in the industry?", a: "The registered 3M product name is 'Novec 1230 Fire Protection Fluid' — chemical name FK-5-1-12. 'Novec 1250' is not an officially registered 3M product name, but in the industry it is informally used for this same agent. Technically the same chemical compound. In a specification, always writing FK-5-1-12 or Novec 1230 is technically correct." },
  { q: "Why is Novec 1250 more expensive than FM200?", a: "The manufacturing process is more complex. Less agent is produced globally. 3M has IP protection. But in the long term Novec 1250 is better — no regulatory risk, similar discharge cost, and no environmental liability. Consider lifecycle cost more than upfront cost." },
  { q: "Can FM200 be retrofitted with Novec 1250?", a: "In some cases an existing FM200 cylinder bank can be replaced with Novec 1250 — if the pipe network and nozzles are compatible. But typically re-engineering is required because the design concentrations are different and the pipe hydraulics have to be recalculated. Get it assessed by a certified fire engineer." },
  { q: "Is Novec 1250 safe for humans?", a: "Yes — it is safe for humans at design concentration (4.2-5.9%). The NOAEL (No Observable Adverse Effect Level) is 10% — well above the design concentration. The oxygen level is not significantly affected. Like FM200 — after discharge ventilate the room and enter after the air quality is clear." },
  { q: "3M announced a PFAS phaseout — what will be the impact on FK-5-1-12 (Novec 1230)?", a: "3M announced a PFAS manufacturing phaseout in 2022. Novec 1230 is a PFAS-based fluid. Even after 3M stops manufacturing, the FK-5-1-12 chemical agent can be produced by other manufacturers. The industry is in transition — alternative suppliers and next-gen agents are available. If you are installing, discuss the long-term supply chain with the supplier. This is an evolving situation — verify the current status with a qualified fire suppression consultant." },
  { q: "Is Novec 1250 easily available in India?", a: "Availability is limited compared to FM200. There are certified suppliers in Tier I cities. In smaller cities the supply chain may be limited. Verify supplier availability both for installation time and refill time. FM200 is more readily available in India — this is a practical consideration." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(5,150,105,0.08)" }}>
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

export default function Novec1250Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="novec-1250" headings={HEADINGS} readingTimeMinutes={17} lang="en" alternateHref="/hi/learn/non-it/fire/novec-1250">

        <p style={S.p}>FM200 protected Data Centers for years.</p>

        <p style={S.p}>But there was one problem — the Global Warming Potential of FM200 is 3,220.</p>

        <p style={S.p}>This means: one FM200 discharge = the climate impact of releasing 3,220 times as much CO2.</p>

        <p style={S.p}>The world needed a better alternative.</p>

        <p style={S.p}><strong>3M created an alternative — Novec 1230 Fire Protection Fluid (FK-5-1-12).</strong></p>

        <p style={S.p}>In the industry this agent is often referred to by both names, "Novec 1250" or "Novec 1230".</p>

        <p style={S.p}>Same protection. Same speed. GWP = 1.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/novec-1250/novec1250-cylinder-installation.png"
              alt="Novec 1250 fire suppression cylinder bank installed in a modern data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Novec 1250 cylinder bank — red cylinders like FM200, but a more environment-friendly agent. It is stored in liquid form.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-novec1250" style={S.h1}>What Is Novec 1250?</h2>

        <p style={S.p}><strong>In this article we are talking about the FK-5-1-12 based clean agent.</strong></p>

        <p style={S.p}>Chemical naam: <strong>FK-5-1-12 (Dodecafluoro-2-methylpentan-3-one)</strong>.</p>

        <p style={S.p}>3M used to market this agent under the name <strong>Novec 1230 Fire Protection Fluid</strong>. "Novec 1250" is not an official 3M product name — but in the industry this term is used informally for FK-5-1-12. Correct technical name: Novec 1230 or FK-5-1-12.</p>

        <p style={S.p}>It is the next-generation alternative to FM200 — better environmental profile, same effectiveness.</p>

        <p style={S.p}>One important physical difference: FM200 is in gas form in the cylinders.</p>

        <p style={S.p}><strong>Novec 1250 is stored in liquid form</strong> — it vaporizes instantly on discharge.</p>

        <p style={S.p}>The benefit of liquid storage — more agent fits in the same cylinder size.</p>

        <DCMapNote components={["Novec 1250 Cylinders", "Solenoid Valve", "Discharge Nozzles", "VESDA", "Fire Alarm Panel", "Abort Switch"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Novec 1250 Needed?</h2>

        <p style={S.p}>FM200 works — but climate was a growing concern.</p>

        <p style={S.p}>Europe introduced F-Gas regulations — restrictions on high-GWP agents.</p>

        <p style={S.p}>The data center industry wants to become sustainable globally.</p>

        <p style={S.p}>Clients today also demand ESG (Environmental, Social, Governance) reports.</p>

        <p style={S.p}><strong>The GWP of 3,220 for FM200 was becoming a liability — the GWP of Novec 1250 is 1.</strong></p>

        <WhyThisMatters>
          Large cloud providers — Google, Microsoft, Amazon — make sustainability commitments for their data centers. The high GWP of FM200 contradicts these commitments. Novec 1250 gives them a way to maintain fire protection without an environmental penalty. That is why Novec 1250 or similar low-GWP agents are becoming standard in new builds.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Novec 1250 extinguishes fire through <strong>heat absorption</strong> — exactly like FM200.</p>

        <p style={S.p}>But Novec 1250 adds one more step — <strong>phase change cooling.</strong></p>

        <p style={S.p}>Liquid Novec 1250 converts into gas instantly on discharge.</p>

        <p style={S.p}>In this liquid-to-gas conversion <strong>a very large amount of heat is absorbed</strong> — the latent heat of vaporization.</p>

        <p style={S.p}>This gives more efficient heat absorption than FM200 — that is why it works at a lower concentration.</p>

        <FlowDiagram
          caption="Novec 1250 dual cooling mechanism"
          steps={[
            { icon: "🔥", label: "Fire Detected", sublabel: "VESDA alarm" },
            { icon: "💧", label: "Liquid Discharge", sublabel: "Novec 1250" },
            { icon: "💨", label: "Phase Change", sublabel: "Liquid → Gas" },
            { icon: "❄️", label: "Heat Absorbed", sublabel: "Double cooling" },
            { icon: "✅", label: "Fire Suppressed", sublabel: "~10 seconds" },
          ]}
        />

        <InsightCard>
          The design concentration of Novec 1250 is only 4.2% for Class A fires — almost half of the 7-8% of FM200. Less agent = smaller cylinders or more protection per cylinder. This is economically beneficial too. For a 100 sq meter room, Novec 1250 needs significantly less agent compared to FM200.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <p style={S.p}>The components are the same as an FM200 system — with a few key differences:</p>

        <h3 style={S.h3}>1. Novec 1250 Cylinders</h3>
        <p style={S.p}>The same red cylinders — but the pressure is different from FM200.</p>

        <p style={S.p}>Novec 1250 is stored as a liquid — the cylinder pressure is typically lower than FM200.</p>

        <p style={S.p}>Nitrogen superpressurization is done — the pressure depends on the manufacturer and system design. Verify actual values from the manufacturer specification.</p>

        <h3 style={S.h3}>2. Special Dip Tube</h3>
        <p style={S.p}>Because it is a liquid agent, the cylinder has a dip tube.</p>

        <p style={S.p}>It draws the liquid from the bottom — ensures proper discharge.</p>

        <p style={S.p}>FM200 cylinders do not have this — it is an important difference.</p>

        <h3 style={S.h3}>3. Nozzles (Modified Design)</h3>
        <p style={S.p}>Nozzles specially designed for Novec 1250.</p>

        <p style={S.p}>They convert the liquid into a fine mist or vapor in the room.</p>

        <p style={S.p}>FM200 nozzles are not interchangeable — different hydraulics.</p>

        <h3 style={S.h3}>4. Rest of System</h3>
        <p style={S.p}>Solenoid valve, FACP, abort switch, door holders — the same as FM200.</p>

        <p style={S.p}>The control panel is also the same type — the integration is the same.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Novec 1250 Works in a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/novec-1250/novec1250-discharge-datacenter.png"
              alt="Novec 1250 discharging from ceiling nozzles in a data center server room showing white vapor cloud"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Novec 1250 discharge — a white vapor cloud as the liquid converts into gas. The room fills in 10 seconds.
          </figcaption>
        </figure>

        <p style={S.p}>The operation is almost identical to FM200:</p>

        <ul style={S.ul}>
          <li style={S.li}>Zone-wise installation — server hall, UPS room, battery room separate zones</li>
          <li style={S.li}>VESDA detection → FACP → solenoid valve → discharge</li>
          <li style={S.li}>Pre-alarm → HVAC shutdown → door close → abort window → discharge</li>
          <li style={S.li}>10 second discharge → 10 minute hold → ventilation → entry</li>
        </ul>

        <p style={S.p}><strong>Main operational difference: visible vapor cloud.</strong></p>

        <p style={S.p}>Novec 1250 forms a visible white cloud as it turns from liquid into gas.</p>

        <p style={S.p}>This is normal — do not panic. The gas is harmless at design concentration.</p>

        <EngineerTip>
          Seeing a white cloud after a Novec 1250 discharge looks a bit alarming to new engineers. It is the visual effect of the liquid vaporizing — the gas itself is colorless; this white cloud forms from condensation and the temperature drop. In FM200 this visible effect is smaller. Train the operations team in advance that this is normal.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="discharge-sequence" style={S.h1}>Discharge Sequence</h2>

        <p style={S.p}>The same sequence as FM200 — from T=0 to T=discharge.</p>

        <p style={S.p}><strong>One key difference:</strong> A visible vapor cloud forms after a Novec 1250 discharge.</p>

        <p style={S.p}>This cloud typically dissipates in 2-3 minutes with ventilation.</p>

        <p style={S.p}>Activate proper HVAC ventilation to clear the room — fresh air in, vapors out.</p>

        <p style={S.p}>Hold time: minimum 10 minutes — maintain the concentration.</p>

        <hr style={S.divider} />

        <h2 id="environmental" style={S.h1}>Environmental Profile</h2>

        <p style={S.p}>This section is the main reason to choose Novec 1250:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>GWP = 1:</strong> CO2 equivalent. Practically nothing compared to the 3,220 GWP of FM200.</li>
          <li style={S.li}><strong>ODP = 0:</strong> Zero ozone layer damage. This was critical among halon replacement agents.</li>
          <li style={S.li}><strong>Atmospheric lifetime = 5 days:</strong> FM200 31-39 days. Novec 1250 breaks down within a week.</li>
          <li style={S.li}><strong>No bioaccumulation:</strong> It does not accumulate in the food chain.</li>
          <li style={S.li}><strong>NOAEL = 10%:</strong> Safe threshold higher than the NOAEL of FM200 — more safety margin.</li>
        </ul>

        <InsightCard>
          GWP 1 means — if one kg of Novec 1250 is released into the atmosphere, its climate impact equals only one kg of CO2. In the case of FM200, that same one kg = warming equivalent to 3,220 kg of CO2. A typical data center discharge (100-200 kg FM200) = 322,000 to 644,000 kg CO2 equivalent impact. With Novec 1250 the same discharge = 100-200 kg CO2 equivalent. This difference is enormous.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation Considerations</h2>

        <h3 style={S.h3}>Hydraulic Design Differences</h3>
        <p style={S.p}>Because Novec 1250 is a liquid, its hydraulic calculations are different from FM200.</p>

        <p style={S.p}>Specialized software required — use the manufacturer's tools.</p>

        <p style={S.p}>Pipe sizing, nozzle selection — will have to be recalculated from the FM200 design.</p>

        <h3 style={S.h3}>Room Integrity Same</h3>
        <p style={S.p}>Like FM200 — the room must be sealed.</p>

        <p style={S.p}>The door fan test is mandatory.</p>

        <p style={S.p}>Holding even a 4.2% concentration is challenging if the room is leaky.</p>

        <h3 style={S.h3}>HVAC Interlock</h3>
        <p style={S.p}>Same as FM200 — HVAC must shut down before discharge.</p>

        <p style={S.p}>Novec 1250 vapor is heavier than FM200 under some conditions — this is also a factor.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>GWP = 1:</strong> Near-zero environmental impact — safe from future regulations</li>
          <li style={S.li}><strong>Lower design concentration:</strong> 4.2% vs FM200 7% — less agent needed</li>
          <li style={S.li}><strong>Effective suppression:</strong> Same speed and effectiveness as FM200</li>
          <li style={S.li}><strong>Safe for humans:</strong> High NOAEL (10%) — extra safety margin</li>
          <li style={S.li}><strong>No residue:</strong> Clean agent — equipment undamaged</li>
          <li style={S.li}><strong>Regulatory future secure:</strong> Compliant with F-Gas regulations</li>
          <li style={S.li}><strong>ESG compliance:</strong> Better for sustainability reports</li>
          <li style={S.li}><strong>Liquid storage:</strong> More efficient cylinder utilization</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Higher upfront cost:</strong> Significantly more expensive than FM200 — agent and equipment</li>
          <li style={S.li}><strong>Limited supplier network:</strong> Especially in India — less availability than FM200</li>
          <li style={S.li}><strong>3M PFAS concerns:</strong> 3M ne PFAS manufacturing phaseout announce kiya — supply uncertainty</li>
          <li style={S.li}><strong>Visible cloud on discharge:</strong> The operations team has to be trained — to avoid panic</li>
          <li style={S.li}><strong>Different hydraulics:</strong> Retrofit from FM200 is complex — new calculations needed</li>
          <li style={S.li}><strong>Limited India experience:</strong> Less field experience in Indian conditions vs FM200</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>Just like FM200 — with a few additions:</p>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Visually inspect the cylinder — check the liquid level indicator (some models have one)</li>
          <li style={S.li}>Pressure gauge check — within range</li>
          <li style={S.li}>Control panel status — no faults</li>
          <li style={S.li}>All interlocks functional — HVAC, doors</li>
        </ul>

        <p style={S.p}><strong>Annual:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Cylinder weight check — more important than for FM200 because it is a liquid</li>
          <li style={S.li}>Dip tube check — follow the manufacturer recommendation</li>
          <li style={S.li}>Room integrity test</li>
          <li style={S.li}>Full functional test (with suppression isolated)</li>
          <li style={S.li}>Inspect nozzles — check for clogging or damage</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>Like FM200 — an actual discharge test is rarely done (very expensive).</p>

        <p style={S.p}><strong>Functional test (simulated):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Isolate the suppression</li>
          <li style={S.li}>Trigger VESDA or a smoke detector</li>
          <li style={S.li}>Verify: pre-alarm, HVAC shutdown, doors close, abort timer, FACP signal</li>
          <li style={S.li}>Re-arm the system after test</li>
        </ul>

        <p style={S.p}><strong>Full discharge test (commissioning):</strong></p>
        <p style={S.p}>It is mandatory for a new installation — verify with concentration meters that the design concentration was achieved.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 2001:</strong> FK-5-1-12 listed clean agent — Novec 1250 compliant</li>
          <li style={S.li}><strong>ISO 14520-1:</strong> International gaseous suppression standard</li>
          <li style={S.li}><strong>BS EN 15004-9:</strong> European standard specifically for FK-5-1-12</li>
          <li style={S.li}><strong>EU F-Gas Regulation (EU 517/2014 and the 2024 revision):</strong> Restrictions on the use of high-GWP F-Gas — FK-5-1-12 (GWP=1) is compliant. Specific regulations are evolving — verify the current applicable requirements with a legal/regulatory expert</li>
          <li style={S.li}><strong>UL 2166:</strong> Halon alternative clean agent systems</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> This is an illustrative example scenario — it is not a reference to a documented real facility.</p>

        <p style={S.p}><strong>Scenario:</strong> New hyperscale data center, targeting LEED Platinum certification.</p>

        <p style={S.p}><strong>Decision:</strong> FM200 vs Novec 1250 evaluation.</p>

        <ul style={S.ul}>
          <li style={S.li}>FM200 upfront cost: ₹X</li>
          <li style={S.li}>Novec 1250 upfront cost: ₹X + 35% premium</li>
          <li style={S.li}>LEED points: Novec 1250 gives additional sustainability points</li>
          <li style={S.li}>Client requirement: FM200 would be flagged as high GWP in the ESG report</li>
        </ul>

        <p style={S.p}><strong>Decision:</strong> FK-5-1-12 (Novec 1230) chosen — sustainability commitment + regulatory future security.</p>

        <p style={S.p}><strong>Lesson:</strong> Choosing a low-GWP agent helps with both LEED goals and ESG commitments.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Using FM200 Nozzles</h3>
        <p style={S.p}>FM200 nozzles do not fit properly for Novec 1250.</p>

        <p style={S.p}>The hydraulics are different — with the wrong nozzles the concentration will not be achieved.</p>

        <h3 style={S.h3}>Mistake 2 — Assuming the Same Design Concentration</h3>
        <p style={S.p}>7-8% for FM200 vs 4.2-5.9% for Novec 1250 — they are different.</p>

        <p style={S.p}>Do not design Novec 1250 from the FM200 calculation — recalculate.</p>

        <h3 style={S.h3}>Mistake 3 — Supplier Availability Not Checked</h3>
        <p style={S.p}>In a remote location, refilling Novec 1250 can be difficult.</p>

        <p style={S.p}>First verify that a qualified supplier is nearby — what the refill timeline will be after a discharge.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the biggest environmental difference between Novec 1250 and FM200?</h3>
        <p style={S.p}><strong>Answer:</strong> GWP — Global Warming Potential. The GWP of FM200 is 3,220. The GWP of Novec 1250 = 1. There is a difference in atmospheric lifetime too: FM200 31-39 days, Novec 1250 only 5 days. The environmental impact of one discharge is thousands of times greater with FM200.</p>

        <h3 style={S.h3}>Q2: Why is Novec 1250 stored as a liquid — what is the advantage over FM200?</h3>
        <p style={S.p}><strong>Answer:</strong> Liquid storage is more dense — more agent fits in the same cylinder. On discharge the liquid vaporizes instantly — the phase change gives additional heat absorption. The design concentration needed is also lower than FM200 (4.2% vs 7-8%) — these two factors together make Novec 1250 a more efficient agent.</p>

        <h3 style={S.h3}>Q3: Can an existing FM200 system be replaced with Novec 1250?</h3>
        <p style={S.p}><strong>Answer:</strong> It is technically possible in some cases, but typically full re-engineering is required. The pipe hydraulics are different, the nozzles are different, the design concentrations are different. A simple cylinder swap does not work. Get a proper assessment from a certified fire engineer — partial compatibility is possible in some systems.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Novec 1250 vs FM200 vs Novec 1230</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Prefer Novec 1250 in new builds:</strong> FM200 is being phased out — a future-proof choice</li>
          <li style={S.li}><strong>Verify the supplier first:</strong> Confirm local availability and the refill timeline</li>
          <li style={S.li}><strong>Design with a certified engineer:</strong> Do not directly copy the FM200 design</li>
          <li style={S.li}><strong>Staff training:</strong> The visible cloud is normal — the operations team must know this</li>
          <li style={S.li}><strong>Annual integrity test:</strong> Same as FM200 — door fan test mandatory</li>
          <li style={S.li}><strong>Log the weight:</strong> Because it is a liquid agent, the weight check is extra important</li>
          <li style={S.li}><strong>Monitor the 3M supply chain:</strong> Follow PFAS phaseout news — do alternative planning</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Novec 1250 = FK-5-1-12 — 3M's clean agent fire suppressant. The next-generation replacement for FM200.",
          "GWP = 1 vs 3,220 for FM200 — near-zero environmental impact. Compliant with future F-Gas regulations.",
          "Stored in liquid form — double heat absorption from the phase change — more efficient than FM200.",
          "Design concentration only 4.2% (Class A) — almost half of the 7-8% of FM200. Less agent = efficient.",
          "Discharge sequence like FM200 — the visible white cloud is normal, do not panic.",
          "Supplier availability is limited in India — verify first before specifying in the design.",
          "Watch the 3M PFAS concerns — there is supply chain uncertainty. Long-term planning is essential.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Novec 1250 is clear. Now complete fire protection:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — the standard before Novec 1250 — read it for comparison.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — the detection system that triggers Novec 1250.</li>
          <li style={S.li}><TopicLink slug="novec" variant="inline" /> — the broader Novec fluid family — both suppression and immersion cooling.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — water-based backup — works as a complement to clean agents.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
