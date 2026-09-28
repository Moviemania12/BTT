import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Novec Fluids in Data Centers — Fire Suppression & Cooling | Behind The Tech",
  description:
    "What is the Novec fluid family, how is it used in a Data Center — Novec 1230, Novec 649, immersion cooling and fire suppression. The impact of the 3M PFAS phaseout. In simple English.",
  keywords: ["novec data center", "novec 1230", "novec 649", "3m novec fluids", "immersion cooling novec"],
  openGraph: {
    title: "Novec Fluids in Data Centers — Fire Suppression & Cooling",
    description: "3M Novec — from fire suppression to immersion cooling, a complete guide to Novec fluids in the Data Center.",
    url: "https://behindthetech.in/learn/non-it/fire/novec",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novec Fluids Explained — Behind The Tech",
    description: "The 3M Novec fluid family — both suppression and cooling, in simple language.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/novec",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/novec",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/novec",
      "x-default": "https://behindthetech.in/learn/non-it/fire/novec",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-novec",        text: "What Is the Novec Family?",              level: 2 },
  { id: "why-needed",           text: "Why Novec Was Developed",                level: 2 },
  { id: "novec-1230",           text: "Novec 1230 — Fire Suppression",          level: 2 },
  { id: "novec-649",            text: "Novec 649 — Immersion Cooling",          level: 2 },
  { id: "how-it-works-in-dc",   text: "How Novec Is Used in Data Centers",      level: 2 },
  { id: "immersion-cooling",    text: "Immersion Cooling Deep Dive",            level: 2 },
  { id: "novec-vs-alternatives",text: "Novec vs Alternative Agents",            level: 2 },
  { id: "pfas-phaseout",        text: "3M PFAS Phaseout — Industry Impact",     level: 2 },
  { id: "advantages",           text: "Advantages of Novec Fluids",             level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "Novec 1230 vs Novec 649 vs FM200",        level: 2 },
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
    { label: "What is Novec", text: "It is a family of engineered fluids from 3M. In data centers they do two jobs — fire suppression (Novec 1230) and immersion cooling (Novec 649). Both are separate products, for separate applications." },
    { label: "Novec 1230", text: "Fire suppression agent — the same FK-5-1-12 chemical as Novec 1250. GWP=1. It is also known by the Kidde and Fike brand names. Novec 1250 and Novec 1230 are practically the same chemical." },
    { label: "Novec 649", text: "Immersion cooling fluid. Servers are directly submerged in this fluid. Heat from the server goes directly into the fluid — very efficient cooling. 1000x better heat transfer than traditional air cooling." },
    { label: "Environmental edge", text: "The GWP of both Novec variants is very low — from 1 to 9. Atmospheric lifetime in days. ODP zero. Much better compared to Halon and FM200." },
    { label: "3M PFAS issue", text: "3M announced a phaseout of PFAS chemicals manufacturing. Novec fluids come under the PFAS family. Alternative agents are being developed in the industry. Existing installations can continue." },
    { label: "Data center trend", text: "The use of Novec 649 type fluids in immersion cooling is growing fast — for hyperscale and AI compute. For high density racks (50+ kW) traditional cooling is becoming insufficient." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#7c3aed,#2563EB)" }} />
      <div style={{ background: "rgba(124,58,237,0.03)", border: "1px solid rgba(124,58,237,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#7c3aed", fontWeight: 600, marginBottom: 16 }}>💧 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#7c3aed", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(124,58,237,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Get both Novec 1230 and Novec 649 clear. The full article follows.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.18)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(124,58,237,0.05),rgba(37,99,235,0.03))", border: "1px solid rgba(124,58,237,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#7c3aed,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#7c3aed", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(124,58,237,0.02)", border: "1px solid rgba(124,58,237,0.12)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#7c3aed", margin: "0 4px", opacity: 0.7 }}>→</span>}
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
    { feature: "Application",        n1230: "Fire suppression",           n649: "Immersion cooling",       fm200: "Fire suppression" },
    { feature: "Chemical",           n1230: "FK-5-1-12",                  n649: "C6F-ketone derivative",   fm200: "HFC-227ea" },
    { feature: "GWP",                n1230: "1",                          n649: "Low (verify with manufacturer — depends on fluid variant)", fm200: "3,220" },
    { feature: "Boiling point",      n1230: "49°C",                       n649: "49°C",                    fm200: "-16.4°C" },
    { feature: "Used for",           n1230: "Server hall, UPS room",      n649: "Submerging servers",      fm200: "Server hall, UPS room" },
    { feature: "Replaces",           n1230: "FM200, Halon",               n649: "Air cooling for HPC",     fm200: "Halon" },
    { feature: "Equipment contact",  n1230: "No (gas phase)",             n649: "Yes (direct immersion)",  fm200: "No (gas phase)" },
    { feature: "Cost",               n1230: "High",                       n649: "Very high",               fm200: "Medium" },
    { feature: "Availability India", n1230: "Limited",                    n649: "Very limited",            fm200: "Good" },
    { feature: "PFAS concern",       n1230: "Yes — supply from 3M uncertain, alternative manufacturers available", n649: "Yes — supply from 3M uncertain", fm200: "No PFAS" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(124,58,237,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(124,58,237,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#7c3aed", fontWeight: 600, border: "1px solid rgba(124,58,237,0.12)" }}>Novec 1230</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#7c3aed", fontWeight: 600, border: "1px solid rgba(124,58,237,0.12)" }}>Novec 649</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(124,58,237,0.12)" }}>FM200</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(124,58,237,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(124,58,237,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(124,58,237,0.08)" }}>{row.n1230}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(124,58,237,0.08)" }}>{row.n649}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(124,58,237,0.08)" }}>{row.fm200}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "What is the difference between Novec 1230 and Novec 1250?", a: "Practically there is no technical difference. Both are the FK-5-1-12 chemical. Novec 1250 and Novec 1230 — these are different 3M product names for the same base chemical. There can be some formulation and purity differences. Performance, GWP, atmospheric lifetime — all the same. In the fire suppression industry both are interchangeable terms. Writing 'FK-5-1-12 per NFPA 2001' in the specification is best practice." },
  { q: "Don't servers get damaged in Novec 649 immersion cooling?", a: "No — Novec 649 is electrically non-conductive. There is no short circuit when servers and their components are submerged in the fluid. The fluid is specifically engineered for this use. Companies like Microsoft (Project Natick), Submer, LiquidStack use this technology. Servers get special modifications — there are no fans, certain components are replaced." },
  { q: "What are the Novec alternatives after the 3M phaseout?", a: "The industry is actively developing alternatives. Some options: Opteon (Chemours) series clean agents, Vertrel (Chemours) immersion cooling fluids, engineered water-based cooling solutions, CO2-based suppression systems. In existing Novec installations certified alternative agents can sometimes be backfilled — verify with the manufacturer. This is a rapidly evolving space — there have been many developments in 2024-2025." },
  { q: "How expensive is Novec 649 in immersion cooling?", a: "Very expensive — the upfront cost is 3-5x higher than typical air-cooled systems. The fluid itself is expensive. Special tanks/baths are needed. Server modifications needed. But better in TCO (Total Cost of Ownership) — PUE 1.03-1.05 is achieved vs the standard 1.4-1.6. And cooling 50+ kW racks with air is practically impossible — for immersion the cost gets justified." },
  { q: "Can Novec 1230 be refilled directly into an FM200 system?", a: "Generally no — the chemical is the same but the system hydraulics are different, the nozzles are different, the design concentrations are different. A simple swap does not work. Get an assessment from a certified fire engineer. Some manufacturers offer compatibility kits — but the standard recommendation is to do proper re-engineering." },
  { q: "When will Novec 649 immersion cooling become mainstream in India?", a: "Right now it is a niche market — limited to hyperscale and HPC installations. With the AI infrastructure boom in 2024-2025, interest has grown. Major Indian data center players — Adani, Hiranandani, Nxtra — are exploring it. In 5-7 years it may become mainstream in high-density deployments. The direction will become clearer once there is clarity on PFAS regulations." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(124,58,237,0.08)" }}>
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

export default function NovecPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="novec" headings={HEADINGS} readingTimeMinutes={16} lang="en" alternateHref="/hi/learn/non-it/fire/novec">

        <p style={S.p}>3M created a fluid family that does two different jobs for Data Centers.</p>

        <p style={S.p}>Pehla kaam — fire bujhaana.</p>

        <p style={S.p}>The second job — cooling servers by directly submerging them in fluid.</p>

        <p style={S.p}><strong>This is the Novec family — one name, two applications.</strong></p>

        <p style={S.p}>You have already read FM200. You have understood Novec 1250 too.</p>

        <p style={S.p}>Now let us understand the full Novec ecosystem — and what change is coming in the industry.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/novec/novec-family-overview.png"
              alt="Novec fluid products including Novec 1230 fire suppression cylinders and Novec 649 immersion cooling tanks in a data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Novec fluid family — left: Novec 1230 fire suppression cylinders. Right: Novec 649 immersion cooling tank in which servers are submerged.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-novec" style={S.h1}>What Is the Novec Family?</h2>

        <p style={S.p}><strong>Novec = 3M's engineered fluid family.</strong></p>

        <p style={S.p}>It was developed after halon replacement — cleaner, safer alternatives.</p>

        <p style={S.p}>In data centers mainly two Novec products are important:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Novec 1230 / Novec 1250:</strong> Fire suppression agent — FK-5-1-12 chemical. It discharges in the gas phase.</li>
          <li style={S.li}><strong>Novec 649:</strong> Immersion cooling fluid — servers are directly submerged in this fluid.</li>
        </ul>

        <p style={S.p}>Both are separate products — for separate applications.</p>

        <p style={S.p}>Common thread: 3M manufacturer, low GWP, excellent environmental profile.</p>

        <DCMapNote components={["Novec 1230 Cylinders", "Novec 649 Tanks", "Suppression System", "Immersion Cooling Baths", "VESDA", "FACP"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Novec Was Developed</h2>

        <p style={S.p}>In 1994 the Montreal Protocol banned Halon.</p>

        <p style={S.p}>Halon was an excellent fire suppressant — but it destroyed the ozone layer.</p>

        <p style={S.p}>The industry needed a replacement — same effectiveness, zero ODP.</p>

        <p style={S.p}>FM200 (HFC-227ea) came — the halon replacement. But GWP 3,220 was a problem.</p>

        <p style={S.p}>3M ne Novec develop kiya — <strong>GWP = 1, ODP = 0, effective suppression.</strong></p>

        <WhyThisMatters>
          The data center industry is facing a major sustainability challenge globally. Both cooling and fire suppression use energy and chemicals. Novec fluids address both problems — low-GWP suppression and ultra-efficient immersion cooling. That is why Fortune 500 companies and hyperscalers prefer Novec when they have to make long-term ESG commitments.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="novec-1230" style={S.h1}>Novec 1230 — Fire Suppression</h2>

        <p style={S.p}>Novec 1230 is the same thing we read about in the Novec 1250 article — the FK-5-1-12 chemical.</p>

        <p style={S.p}>The name Novec 1230 is used more in Kidde and Fike products.</p>

        <p style={S.p}>The name Novec 1250 in 3M's direct products.</p>

        <p style={S.p}><strong>From a technical perspective — same chemical, same performance.</strong></p>

        <h3 style={S.h3}>Key Properties</h3>
        <ul style={S.ul}>
          <li style={S.li}>GWP = 1 — practically zero climate impact</li>
          <li style={S.li}>Atmospheric lifetime = 5 days</li>
          <li style={S.li}>ODP = 0</li>
          <li style={S.li}>Design concentration = 4.2% (Class A), 5.9% (Class B)</li>
          <li style={S.li}>Discharge time = 10 seconds</li>
          <li style={S.li}>Safe for humans at design concentration</li>
          <li style={S.li}>Boiling point = 49°C — liquid at room temperature</li>
        </ul>

        <InsightCard>
          The 49°C boiling point of Novec 1230 is an important property. Meaning — at room temperature (25°C) it is a liquid. This allows liquid storage — denser packing than FM200. On discharge it vaporizes immediately — concentrates in the room and extinguishes the fire. The boiling point of FM200 is -16°C — it is already a gas at room temperature.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="novec-649" style={S.h1}>Novec 649 — Immersion Cooling</h2>

        <p style={S.p}>This is Novec's second — and very exciting — application.</p>

        <p style={S.p}><strong>Concept: Submerge the server directly in fluid.</strong></p>

        <p style={S.p}>Sounds crazy? The logic is simple.</p>

        <p style={S.p}>The heat transfer coefficient of air is very low. That of liquid is very high.</p>

        <p style={S.p}>The heat transfer capability of liquid immersion cooling is much higher than air cooling — the exact ratio depends on conditions and system design. This is the fundamental advantage of immersion cooling.</p>

        <p style={S.p}><strong>This is the basic physics of immersion cooling.</strong></p>

        <h3 style={S.h3}>Properties of Novec 649</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Servers can be safely submerged — no short circuit</li>
          <li style={S.li}><strong>Chemically inert:</strong> Does not react with metals, plastics, circuit boards</li>
          <li style={S.li}><strong>GWP = 9:</strong> Much better than FM200, slightly higher than Novec 1230</li>
          <li style={S.li}><strong>Boiling point = 49°C:</strong> Boils by absorbing heat — two-phase cooling possible</li>
          <li style={S.li}><strong>Transparent:</strong> Colorless liquid — server components stay visible</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Novec Is Used in Data Centers</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/novec/novec649-immersion-cooling.png"
              alt="Servers submerged in Novec 649 immersion cooling tanks in a hyperscale data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Novec 649 immersion cooling — servers are fully submerged in the fluid. Blue/clear liquid is visible in the tanks. This is next-gen Data Center cooling.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Novec 1230 — Fire Suppression Application</h3>
        <p style={S.p}>Exactly the same application as FM200 and Novec 1250.</p>

        <p style={S.p}>Server hall, UPS room, battery room — zone-wise installation.</p>

        <p style={S.p}>VESDA detects → FACP signal → solenoid valve → 10 second discharge.</p>

        <p style={S.p}>Novec 1230 is taking the place of FM200 systems — especially in European facilities.</p>

        <h3 style={S.h3}>Novec 649 — Immersion Cooling Application</h3>
        <p style={S.p}>Servers are placed in special tanks (baths).</p>

        <p style={S.p}>The tanks are filled with Novec 649.</p>

        <p style={S.p}>The servers are ON — fully submerged in the fluid.</p>

        <p style={S.p}>The server's heat transfers directly into the fluid.</p>

        <p style={S.p}>The fluid absorbs heat and boils (at 49°C) — the vapor rises.</p>

        <p style={S.p}>The vapor condenses on the condenser coil — it turns back into liquid.</p>

        <p style={S.p}><strong>This is the two-phase immersion cooling cycle.</strong></p>

        <EngineerTip>
          When using Novec 649 in immersion cooling, the server fans are removed — fluid cooling is so efficient that fans are not needed at all. Server fans create unnecessary turbulence in the fluid. Special fanless server configurations or fan bypass kits are used. This is why immersion cooling systems are very quiet — no fan noise.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="immersion-cooling" style={S.h1}>Immersion Cooling Deep Dive</h2>

        <h3 style={S.h3}>Single-Phase vs Two-Phase</h3>
        <p style={S.p}><strong>Single-phase:</strong> The fluid stays liquid — it absorbs heat and is circulated by a pump. Simpler system.</p>

        <p style={S.p}><strong>Two-phase:</strong> The fluid boils from liquid into gas with the server heat — the vapor becomes liquid on the condenser. More efficient.</p>

        <p style={S.p}>Novec 649 is ideal for two-phase immersion — the 49°C boiling point is in the perfect temperature range.</p>

        <FlowDiagram
          caption="Novec 649 two-phase immersion cooling cycle"
          steps={[
            { icon: "🖥️", label: "Server Heat", sublabel: "CPU/GPU generate" },
            { icon: "💧", label: "Liquid Absorbs", sublabel: "Novec 649" },
            { icon: "💨", label: "Fluid Boils", sublabel: "Vapor rises" },
            { icon: "❄️", label: "Condenser", sublabel: "Vapor cools" },
            { icon: "🔄", label: "Liquid Returns", sublabel: "Cycle repeats" },
          ]}
        />

        <h3 style={S.h3}>Why Immersion for AI / HPC?</h3>
        <p style={S.p}>Traditional servers — 1-5 kW per rack.</p>

        <p style={S.p}>Modern AI servers (GPU clusters) — 20-100 kW per rack.</p>

        <p style={S.p}>Air cooling cannot handle this much heat — physically impossible.</p>

        <p style={S.p}><strong>Immersion cooling = only practical solution for 50+ kW racks.</strong></p>

        <InsightCard>
          Microsoft tested an underwater data center in Project Natick — it used seawater cooling. In Google data centers liquid cooling is standard in GPU clusters. Meta and Amazon are also piloting immersion cooling. In India, Yotta and Adani Data Networks are evaluating immersion cooling in high-density deployments. This trend is accelerating — with the AI boom the high-density rack count is growing.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="novec-vs-alternatives" style={S.h1}>Novec vs Alternative Agents</h2>

        <h3 style={S.h3}>Fire Suppression Alternatives to Novec 1230</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>FM200 (HFC-227ea):</strong> Proven, available, cheaper — but GWP 3,220</li>
          <li style={S.li}><strong>Opteon 1234 (HFO-1234ze):</strong> Chemours product, very low GWP — emerging alternative</li>
          <li style={S.li}><strong>CO2 Total Flooding:</strong> Natural agent, low cost — but deadly for humans</li>
          <li style={S.li}><strong>Inert gas systems (IG-541, IG-55):</strong> Nitrogen/argon mixes — zero GWP, but high pressure cylinders needed</li>
        </ul>

        <h3 style={S.h3}>Immersion Cooling Alternatives to Novec 649</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Mineral oil:</strong> Cheap, single-phase only — messy, harder to clean</li>
          <li style={S.li}><strong>Engineered fluids (Vertrel, Opteon):</strong> Chemours alternatives — similar properties</li>
          <li style={S.li}><strong>Deionized water (direct liquid cooling):</strong> Not full immersion — cold plates on chips</li>
          <li style={S.li}><strong>Synthetic esters:</strong> Biodegradable options — emerging market</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="pfas-phaseout" style={S.h1}>3M PFAS Phaseout — Industry Impact</h2>

        <p style={S.p}><strong>In 2022 3M announced</strong> that it will stop PFAS (per- and polyfluoroalkyl substances) manufacturing by 2025.</p>

        <p style={S.p}>Novec fluids come under the PFAS family.</p>

        <p style={S.p}>This means — the supply of 3M's Novec products is uncertain. The FK-5-1-12 agent itself has not been banned — alternative manufacturers can produce this agent. Alternative fluids are also being developed in the industry.</p>

        <p style={S.p}><strong>Current situation (2024-2025):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Existing stock and installations can continue</li>
          <li style={S.li}>Alternative manufacturers (Chemours, Solvay) are developing similar products</li>
          <li style={S.li}>Industry standards bodies are certifying alternative agents</li>
          <li style={S.li}>There is long-term supply uncertainty for new Novec 1230/649 installations</li>
        </ul>

        <p style={S.p}><strong>Recommendation:</strong> When specifying a new installation, discuss the long-term supply chain with the supplier.</p>

        <EngineerTip>
          The data center industry should not panic immediately over the PFAS phaseout. Existing Novec systems will remain reliable — refill supply is available. Evaluate alternatives for new builds. Inert gas systems (nitrogen, IG-541) are zero GWP and zero PFAS for fire suppression — but more cylinders are needed and the pressure is higher. For immersion cooling, Chemours Vertrel XF and Opteon SF-10 are emerging alternatives.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages of Novec Fluids</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Ultra-low GWP:</strong> 1 (Novec 1230) to 9 (Novec 649) — minimal climate impact</li>
          <li style={S.li}><strong>Zero ODP:</strong> Ozone layer safe</li>
          <li style={S.li}><strong>Short atmospheric lifetime:</strong> Days, not years</li>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Safe for direct equipment contact</li>
          <li style={S.li}><strong>Immersion cooling efficiency:</strong> Very low overhead losses possible — well-designed immersion systems can achieve excellent PUE, the exact value depends on design and facility conditions</li>
          <li style={S.li}><strong>Equipment safe:</strong> No residue, no corrosion</li>
          <li style={S.li}><strong>ESG compliant:</strong> Protected from future regulations (except PFAS concern)</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>3M PFAS phaseout:</strong> Long-term supply uncertainty</li>
          <li style={S.li}><strong>High cost:</strong> Both products expensive vs alternatives</li>
          <li style={S.li}><strong>Limited India availability:</strong> The supply chain is not everywhere</li>
          <li style={S.li}><strong>Immersion infrastructure:</strong> Special tanks, modified servers — high upfront investment</li>
          <li style={S.li}><strong>PFAS environmental concern:</strong> Despite low GWP, PFAS compounds are an environmental accumulation concern</li>
          <li style={S.li}><strong>Limited field experience:</strong> Especially immersion cooling — fewer engineers trained</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <h3 style={S.h3}>Novec 1230 (Fire Suppression)</h3>
        <p style={S.p}>The same maintenance as FM200 and Novec 1250 — cylinder weight, room integrity, annual test.</p>

        <p style={S.p}>Quarterly functional tests, annual door fan test, monthly visual inspection.</p>

        <h3 style={S.h3}>Novec 649 (Immersion Cooling)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fluid level monitoring:</strong> Evaporation happens — top up on schedule</li>
          <li style={S.li}><strong>Fluid purity testing:</strong> Quarterly — check for contamination</li>
          <li style={S.li}><strong>Tank seal inspection:</strong> Check for fluid leakage — valuable fluid should not be wasted</li>
          <li style={S.li}><strong>Condenser coil cleaning:</strong> Reduce fouling — maintain heat exchange</li>
          <li style={S.li}><strong>Server removal/reinstallation:</strong> Fluid drip-off time de — 10-15 min before handling</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 2001:</strong> Novec 1230 (FK-5-1-12) listed agent</li>
          <li style={S.li}><strong>ISO 14520:</strong> International clean agent standard</li>
          <li style={S.li}><strong>ASHRAE TC 9.9:</strong> Immersion cooling guidelines emerging</li>
          <li style={S.li}><strong>IEC 62368-1:</strong> Audio/video IT equipment immersed in dielectric fluid</li>
          <li style={S.li}><strong>OCP (Open Compute Project):</strong> Immersion cooling standards development</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Example Scenario 1 — Fire Suppression:</strong> (Illustrative) European colocation — migration from FM200 to FK-5-1-12 (Novec 1230). Same pipe network, new cylinders, nozzle replacement, hydraulic recalculation. Full commissioning test. Result: regulatory compliant, same protection level.</p>

        <p style={S.p}><strong>Example Scenario 2 — Immersion Cooling:</strong> (Illustrative) High-density AI training cluster — high kW per rack at which air cooling is impractical. Fluoroketone-based two-phase immersion tanks installed. Result: very low overhead losses, high rack density, low noise.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the difference between Novec 1230 and Novec 1250?</h3>
        <p style={S.p}><strong>Answer:</strong> Practically no difference — both are the FK-5-1-12 chemical. They are different brand names — 3M named it Novec 1250, Kidde/Fike named it Novec 1230. Performance, GWP (=1), atmospheric lifetime (5 days) — identical. Writing 'FK-5-1-12 per NFPA 2001' in the specification is best practice — you are not bound to a specific brand.</p>

        <h3 style={S.h3}>Q2: How does Novec 649 immersion cooling work?</h3>
        <p style={S.p}><strong>Answer:</strong> Servers are submerged in tanks filled with Novec 649 fluid. Server heat transfers directly into the fluid. The fluid boils at 49°C — the vapor rises, condenses on the condenser, turns back into liquid and falls. This is the two-phase cooling cycle. It is electrically non-conductive — no short circuit happens. 1000x better heat transfer than air cooling.</p>

        <h3 style={S.h3}>Q3: What will be the impact of the 3M PFAS phaseout on existing Novec installations?</h3>
        <p style={S.p}><strong>Answer:</strong> Existing installations can continue — refill supply is available in the interim. Alternative manufacturers (Chemours, Solvay) are offering similar products. For new installations, discuss the long-term supply chain with the supplier. Inert gas systems (IG-541, nitrogen) are a PFAS-free fire suppression alternative. For immersion cooling, Vertrel XF and Opteon SF-10 are alternatives.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Novec 1230 vs Novec 649 vs FM200</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Novec 1230 for suppression:</strong> Replace FM200 in new builds — better regulatory future</li>
          <li style={S.li}><strong>Supplier tie-up:</strong> Identify an alternative supplier in advance for after the PFAS phaseout</li>
          <li style={S.li}><strong>Immersion cooling feasibility:</strong> Evaluate Novec 649 immersion for 20+ kW racks</li>
          <li style={S.li}><strong>Maintain fluid purity:</strong> In immersion cooling, contaminated fluid degrades performance</li>
          <li style={S.li}><strong>Staff training:</strong> Immersion cooling operations are very different from traditional air-cooled</li>
          <li style={S.li}><strong>Monitor PFAS regulations:</strong> Regulations may come in India — be prepared</li>
          <li style={S.li}><strong>Follow OCP standards:</strong> Open Compute Project immersion cooling guidelines are best practices</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Novec = 3M's engineered fluid family. Two roles in data centers — Novec 1230 (fire suppression) and Novec 649 (immersion cooling).",
          "Novec 1230 = Novec 1250 = FK-5-1-12. Same chemical, different brand names. GWP=1, the perfect replacement for FM200.",
          "Novec 649 = immersion cooling fluid. Submerge servers directly. Electrically non-conductive. Overhead losses are very low — the actual PUE depends on the design.",
          "Two-phase immersion cooling: liquid boils at 49°C, vapor condenses, cycle repeats. 1000x better heat transfer than air.",
          "The 3M PFAS phaseout is a concern — long-term Novec supply is uncertain. Evaluate alternative agents for new builds.",
          "For AI and HPC, 50+ kW racks are becoming common — immersion cooling is becoming the single practical solution.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>The Novec family is clear. Complete the rest of fire protection:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — Novec 1250 specifically — detailed fire suppression guide.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — FM200 — essential for comparing with Novec 1230.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — the detection system that triggers suppression.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — External firefighting system — last line of defense.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
