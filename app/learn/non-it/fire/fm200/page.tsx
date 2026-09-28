import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "FM200 Fire Suppression in Data Centers | Behind The Tech",
  description:
    "What is FM200, how does it work, why is it used in a Data Center — clean agent suppression, HFC-227ea, cylinder sizing, discharge and maintenance. In simple English.",
  keywords: ["fm200 data center", "fm200 fire suppression", "hfc-227ea", "clean agent suppression", "fire suppression data center"],
  openGraph: {
    title: "FM200 Fire Suppression in Data Centers",
    description: "A fire broke out in the Data Center — what FM200 does, how it extinguishes it, and why the servers are not damaged.",
    url: "https://behindthetech.in/learn/non-it/fire/fm200",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FM200 Explained — Behind The Tech",
    description: "FM200 clean agent fire suppression — the guardian of the Data Center, in simple language.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/fm200",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/fm200",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/fm200",
      "x-default": "https://behindthetech.in/learn/non-it/fire/fm200",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-fm200",       text: "What Is FM200?",                         level: 2 },
  { id: "why-needed",          text: "Why Is FM200 Needed?",                   level: 2 },
  { id: "problem-statement",   text: "Why Not Water or CO2?",                  level: 2 },
  { id: "working-principle",   text: "Working Principle",                       level: 2 },
  { id: "main-components",     text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",  text: "How FM200 Works Inside a Data Center",   level: 2 },
  { id: "discharge-sequence",  text: "Discharge Sequence",                      level: 2 },
  { id: "types",               text: "Types of FM200 Systems",                  level: 2 },
  { id: "cylinder-sizing",     text: "Cylinder Sizing",                         level: 2 },
  { id: "installation",        text: "Installation",                            level: 2 },
  { id: "advantages",          text: "Advantages",                              level: 2 },
  { id: "disadvantages",       text: "Disadvantages",                           level: 2 },
  { id: "maintenance",         text: "Maintenance",                             level: 2 },
  { id: "testing",             text: "Testing",                                 level: 2 },
  { id: "standards",           text: "Standards",                               level: 2 },
  { id: "real-example",        text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",     text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions", text: "Interview Questions",                     level: 2 },
  { id: "comparison",          text: "FM200 vs CO2 vs Sprinkler",               level: 2 },
  { id: "best-practices",      text: "Best Practices",                          level: 2 },
  { id: "key-takeaways",       text: "Key Takeaways",                           level: 2 },
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
    { label: "In one line", text: "FM200 is a colorless gas that is discharged into a fire and, within 10 seconds, lowers the room temperature so much that the fire goes out — without water, without residue." },
    { label: "Chemical name", text: "The chemical name of FM200 is HFC-227ea (Heptafluoropropane). It is a halon replacement agent. It breaks down in the atmosphere within 31-39 days." },
    { label: "How it extinguishes", text: "FM200 extinguishes fire through heat absorption — not by removing oxygen. That is why people in the room stay safe. It is completely different from CO2 — CO2 removes oxygen, which is dangerous for humans." },
    { label: "Where in a Data Center", text: "Server hall, UPS room, battery room, network room — any enclosed space where there is equipment and water damage must be avoided." },
    { label: "Discharge time", text: "Full discharge is completed in 10 seconds. Design concentration is typically 7-8% — that is how much gas is needed to extinguish the fire." },
    { label: "Connection with VESDA", text: "VESDA detects → Fire Alarm Panel → FM200 solenoid valve opens → Discharge. This chain comes with a 30-60 second abort window — you can stop it on a false alarm." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#dc2626,#dc2626)" }} />
      <div style={{ background: "rgba(220,38,38,0.03)", border: "1px solid rgba(220,38,38,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>🧯 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(220,38,38,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          If you have understood this much, the core concept of FM200 is clear. The full article follows — from the working principle to cylinder sizing.
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

function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#dc2626" }} />
      <div style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.18)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#dc2626", fontWeight: 600, marginBottom: 9 }}>⚠️ Warning</span>
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.16)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(220,38,38,0.04),rgba(37,99,235,0.03))", border: "1px solid rgba(220,38,38,0.14)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#dc2626,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(220,38,38,0.02)", border: "1px solid rgba(220,38,38,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#dc2626", margin: "0 4px", opacity: 0.7 }}>→</span>}
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
    { feature: "Agent type",          fm200: "Clean gas (HFC-227ea)",       co2: "Gas (CO2)",              water: "Water mist / Sprinkler" },
    { feature: "How it works",        fm200: "Heat absorption",              co2: "Oxygen displacement",    water: "Cooling + smothering" },
    { feature: "Safe for humans",     fm200: "Yes (design conc.)",          co2: "No — deadly",            water: "Yes" },
    { feature: "Equipment damage",    fm200: "None — no residue",            co2: "None",                   water: "Significant water damage" },
    { feature: "Discharge time",      fm200: "~10 seconds",                  co2: "~10 seconds",            water: "Continuous until stopped" },
    { feature: "Re-entry after",      fm200: "Minutes (ventilate)",         co2: "Only with SCBA",         water: "After water removed" },
    { feature: "Cost per discharge",  fm200: "High (cylinder refill)",      co2: "Medium",                 water: "Low (water cheap)" },
    { feature: "Used in server halls",fm200: "Yes — standard",              co2: "No — not recommended",   water: "Pre-action only" },
    { feature: "Environmental impact",fm200: "GWP 3,220 — moderate",        co2: "GWP 1 — low",            water: "None" },
    { feature: "Alarm abort window",  fm200: "Yes — 30-60 seconds",         co2: "Yes — but dangerous",    water: "Yes" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(220,38,38,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#dc2626", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>FM200</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>CO2</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(220,38,38,0.12)" }}>Sprinkler / Water</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(220,38,38,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.fm200}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.co2}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(220,38,38,0.08)" }}>{row.water}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "How soon can you enter the room after an FM200 discharge?", a: "The room has to be ventilated first. FM200 itself is non-toxic at design concentration, but after discharge there can be combustion byproducts that are harmful. Only after the air quality test is clear and after adequate ventilation. The specific time depends on the ventilation system, room size and the post-discharge assessment — first entry with SCBA is recommended. Make the first entry with SCBA (breathing apparatus)." },
  { q: "Can the cylinder be reused after an FM200 discharge?", a: "No — the cylinder has to be refilled. After one full discharge the cylinder becomes empty or near-empty. Refilling is done by a certified FM200 supplier. It typically takes 2-4 weeks. That is why a spare cylinder or bank system is important." },
  { q: "What is the GWP of FM200 and why is it an issue?", a: "GWP = Global Warming Potential. The GWP of FM200 is 3,220 — 3,220 times more harmful for the climate than CO2. That is why European countries are phasing out FM200 and prefer Novec 1250 (GWP 1). In India FM200 is still allowed, but regulations may come in the future." },
  { q: "What should be done if FM200 is discharged accidentally?", a: "Evacuate the room immediately. Close all doors — keep the gas contained. Start the ventilation system — fresh air in. Inform the fire brigade or the gas supplier. Do not go into the room until it is ventilated. Investigate the root cause — a false discharge must not repeat." },
  { q: "How many years does an FM200 system work?", a: "The physical system (cylinders, pipes, nozzles, panel) — works for 20-25 years with proper maintenance. The FM200 agent stays stable in the cylinder — it does not degrade on its own. The annual inspection verifies that the cylinder has adequate gas (through a weight check)." },
  { q: "What should you choose between FM200 and Novec 1250?", a: "For a new installation prefer Novec 1250 — better environmental profile, lower GWP, similar performance. Refill FM200 in existing systems until the phase-out. Under a budget constraint FM200 is cheaper upfront. In the long term Novec 1250 is the better bet — its regulatory future is secure." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(220,38,38,0.08)" }}>
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

export default function FM200Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="fm200" headings={HEADINGS} readingTimeMinutes={19} lang="en" alternateHref="/hi/learn/non-it/fire/fm200">

        <p style={S.p}>VESDA detected smoke — the Fire 2 alarm came in.</p>

        <p style={S.p}>The Fire Alarm Panel sent a signal to the solenoid valve.</p>

        <p style={S.p}>A white gas cloud was released from the nozzles fitted in the ceiling.</p>

        <p style={S.p}>10 seconds. The room temperature dropped. The fire went out.</p>

        <p style={S.p}>No water. No residue. The servers are safe.</p>

        <p style={S.p}><strong>This is FM200 — the fire extinguisher of the Data Center.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/fm200/fm200-cylinder-bank.png"
              alt="FM200 fire suppression cylinder bank installed in a data center fire suppression room"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            FM200 cylinder bank — multiple cylinders manifolded together. The red cylinders store the pressurized HFC-227ea agent.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-fm200" style={S.h1}>What Is FM200?</h2>

        <p style={S.p}><strong>FM200 is a clean agent fire suppression gas.</strong></p>

        <p style={S.p}>Chemical naam: <strong>HFC-227ea (Heptafluoropropane)</strong>.</p>

        <p style={S.p}>"FM200" is actually a brand name of the Chemours company (earlier DuPont).</p>

        <p style={S.p}>But in the industry FM200 has become a generic term — like Xerox for a photocopier.</p>

        <p style={S.p}>"Clean agent" means — no residue is left after discharge.</p>

        <p style={S.p}>Water, dry powder or foam — all of these leave residue that damages electronics.</p>

        <p style={S.p}><strong>FM200 is a gas — it evaporates. The equipment stays safe.</strong></p>

        <DCMapNote components={["FM200 Cylinders", "Solenoid Valve", "Discharge Nozzles", "Fire Alarm Panel", "VESDA", "Abort Switch"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is FM200 Needed?</h2>

        <p style={S.p}>Imagine a fire breaks out in a Data Center — what will you do?</p>

        <p style={S.p}>Option 1: Grab a fire extinguisher and run. But the server room is big and the fire is spreading.</p>

        <p style={S.p}>Option 2: The sprinkler system activates. Water came — the servers got damaged too.</p>

        <p style={S.p}>Option 3: FM200 discharged automatically. The fire went out in 10 seconds. No equipment damage.</p>

        <WhyThisMatters>
          In a Data Center, fire carries a double risk. The first risk — the fire itself. The second risk — the method used to extinguish it. If you use water, the servers get destroyed — data loss guaranteed. If you use CO2, it is deadly for humans. FM200 is the solution to this dilemma — it extinguishes the fire without hurting equipment or humans.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="problem-statement" style={S.h1}>Why Not Water or CO2?</h2>

        <h3 style={S.h3}>Water — Why Not?</h3>
        <p style={S.p}>Water and electricity — should never meet.</p>

        <p style={S.p}>If water gets into the server room — short circuits, corrosion, data loss.</p>

        <p style={S.p}>You will put out the fire, but the data center will be destroyed.</p>

        <h3 style={S.h3}>CO2 — Why Not?</h3>
        <p style={S.p}>CO2 extinguishes fire by removing oxygen.</p>

        <p style={S.p}>But that same oxygen is also essential for humans.</p>

        <p style={S.p}>If anyone is left in the room when CO2 discharges — death by suffocation is possible.</p>

        <p style={S.p}><strong>FM200 extinguishes fire through heat absorption — the oxygen level is maintained.</strong></p>

        <InsightCard>
          At the FM200 design concentration (typically 7-8% by volume), the oxygen level is not significantly affected. Under NFPA 2001, occupant safety is maintained at the listed concentrations of HFC-227ea — confirm detailed limits through manufacturer data and the applicable listing. In CO2 systems there is oxygen displacement — if people stay in the room there is a serious risk. This is the fundamental difference between FM200 and CO2.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>How does FM200 extinguish a fire?</p>

        <p style={S.p}><strong>Heat absorption — thermal mechanism.</strong></p>

        <p style={S.p}>Fire is a chemical reaction — fuel + oxygen + heat = fire.</p>

        <p style={S.p}>This is the "fire triangle".</p>

        <p style={S.p}>FM200 removes <strong>heat</strong> from this triangle.</p>

        <p style={S.p}>When FM200 discharges, these gas molecules absorb the heat of the fire.</p>

        <p style={S.p}>So much heat is absorbed that the chemical reaction cannot sustain itself — the fire goes out.</p>

        <FlowDiagram
          caption="FM200 fire suppression mechanism"
          steps={[
            { icon: "🔥", label: "Fire Starts", sublabel: "Heat + Fuel + O2" },
            { icon: "🚨", label: "VESDA Detects", sublabel: "Alarm triggered" },
            { icon: "🔓", label: "Solenoid Opens", sublabel: "Cylinder valve" },
            { icon: "💨", label: "FM200 Discharges", sublabel: "10 seconds" },
            { icon: "❄️", label: "Heat Absorbed", sublabel: "Reaction stops" },
            { icon: "✅", label: "Fire Out", sublabel: "Equipment safe" },
          ]}
        />

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. FM200 Cylinders</h3>
        <p style={S.p}>Red colored steel cylinders — FM200 gas is stored in them in liquid form.</p>

        <p style={S.p}>Super-pressurized with nitrogen — typically 24.8 bar (360 psi) or 42 bar (600 psi) depending on system design. The actual pressure varies according to the manufacturer specification.</p>

        <p style={S.p}>Size varies — 20 kg to 200 kg per cylinder. Multiple cylinders are installed as a bank.</p>

        <h3 style={S.h3}>2. Solenoid Valve (Actuator)</h3>
        <p style={S.p}>An electric valve fitted on top of the cylinder.</p>

        <p style={S.p}>When the signal comes from the Fire Alarm Panel, electric current flows — the valve opens.</p>

        <p style={S.p}>There is also a manual actuator — in an emergency it can be opened by hand too.</p>

        <h3 style={S.h3}>3. Manifold</h3>
        <p style={S.p}>Connects multiple cylinders to a single pipe.</p>

        <p style={S.p}>All cylinders discharge simultaneously — or selectively by zone.</p>

        <h3 style={S.h3}>4. Discharge Nozzles</h3>
        <p style={S.p}>Specially designed nozzles fitted on the ceiling.</p>

        <p style={S.p}>They distribute the gas evenly in the room.</p>

        <p style={S.p}>Nozzle design and placement — are calculated according to the room geometry.</p>

        <h3 style={S.h3}>5. Fire Alarm Control Panel (FACP)</h3>
        <p style={S.p}>Receives the signal from VESDA or a smoke detector.</p>

        <p style={S.p}>Sounds the pre-discharge alarm — so people can evacuate.</p>

        <p style={S.p}>Counts down the abort timer — so the operator can abort if it is a false alarm.</p>

        <h3 style={S.h3}>6. Abort Switch</h3>
        <p style={S.p}>Installed outside the room — typically near the exit door.</p>

        <p style={S.p}>The operator can stop the discharge by pressing this switch — within a 30-60 second window.</p>

        <p style={S.p}><strong>Never permanently disable this switch.</strong></p>

        <h3 style={S.h3}>7. Discharge Pressure Switch</h3>
        <p style={S.p}>Confirms whether the discharge actually happened or not.</p>

        <p style={S.p}>The signal goes to the FACP — a log book entry is made.</p>

        <h3 style={S.h3}>8. Door Holders / Closers</h3>
        <p style={S.p}>At the time of FM200 discharge the room doors close automatically.</p>

        <p style={S.p}>Contains the gas in the room — the concentration is maintained.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How FM200 Works Inside a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/fm200/fm200-nozzle-server-room.png"
              alt="FM200 discharge nozzle on data center ceiling with server racks visible below"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            FM200 discharge nozzle — on the server hall ceiling. This nozzle distributes the gas evenly in the room.
          </figcaption>
        </figure>

        <p style={S.p}>In a Data Center, FM200 is typically installed zone-wise:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Server hall</strong> — one or multiple zones depending on size</li>
          <li style={S.li}><strong>UPS room</strong> — separate zone, dedicated cylinders</li>
          <li style={S.li}><strong>Battery room</strong> — separate zone</li>
          <li style={S.li}><strong>Network room / MDB</strong> — separate zones</li>
        </ul>

        <p style={S.p}>Each zone has its own cylinder bank, nozzles and control circuit.</p>

        <p style={S.p}>A discharge in one zone does not affect another zone.</p>

        <hr style={S.divider} />

        <h2 id="discharge-sequence" style={S.h1}>Discharge Sequence</h2>

        <p style={S.p}>Understanding this sequence is very important — exactly what happens during a fire:</p>

        <h3 style={S.h3}>T=0: Fire Detected</h3>
        <p style={S.p}>VESDA or a smoke detector triggers the Fire 1 level.</p>

        <p style={S.p}>The FACP receives the signal.</p>

        <h3 style={S.h3}>T=+3 seconds: Pre-Alarm</h3>
        <p style={S.p}>A loud pre-discharge alarm sounds — "FIRE FIRE, EVACUATE IMMEDIATELY".</p>

        <p style={S.p}>Strobe lights start flashing.</p>

        <p style={S.p}>HVAC (air conditioning) shuts down automatically — this keeps FM200 from being diluted.</p>

        <p style={S.p}>Room doors close automatically.</p>

        <h3 style={S.h3}>T=+30 to 60 seconds: Abort Window</h3>
        <p style={S.p}>The operator can press the abort switch if this is a false alarm.</p>

        <p style={S.p}>This window is configured on site — the duration varies according to AHJ requirements, the approved design and operational needs. 30-60 seconds is a common range, but it is project-specific.</p>

        <h3 style={S.h3}>T=+60 seconds (approx): Discharge</h3>
        <p style={S.p}>The FACP sends a signal to the solenoid valve.</p>

        <p style={S.p}>The cylinder valve opens — FM200 rushes into the pipe system.</p>

        <p style={S.p}>Full discharge in 10 seconds — the room fills with FM200 gas.</p>

        <h3 style={S.h3}>After Discharge</h3>
        <p style={S.p}>The fire goes out.</p>

        <p style={S.p}>The room stays sealed — minimum hold time as per the applicable standard (NFPA 2001 / ISO 14520), typically 10 minutes. The actual requirement is verified through hydraulic calculations and the door fan test.</p>

        <p style={S.p}>Then start the ventilation system — fresh air in, FM200 out.</p>

        <p style={S.p}>After the air quality is clear, the team should enter with SCBA — damage assessment.</p>

        <EngineerTip>
          Why HVAC shutdown before discharge? HVAC airflow can dilute the FM200 concentration and carry the agent out of the protected area. FM200 (HFC-227ea) is actually heavier than air — it concentrates in low-lying areas. Shutting down HVAC is essential to maintain the concentration. This must be an automatic interlock — verify it at the time of commissioning.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of FM200 Systems</h2>

        <h3 style={S.h3}>1. Total Flooding System</h3>
        <p style={S.p}>The most common — the entire enclosed room is filled with FM200.</p>

        <p style={S.p}>The room must be sealed — doors, dampers all closed.</p>

        <p style={S.p}>The design concentration must be achieved — 7-8% by volume.</p>

        <h3 style={S.h3}>2. Local Application</h3>
        <p style={S.p}>Direct discharge onto specific equipment or a cabinet.</p>

        <p style={S.p}>Rare in data centers — enclosed rooms are usually preferred.</p>

        <h3 style={S.h3}>3. Modular System</h3>
        <p style={S.p}>Small self-contained units — each protects a specific cabinet or small room.</p>

        <p style={S.p}>Easy to install, relocate. Suitable for small server rooms.</p>

        <hr style={S.divider} />

        <h2 id="cylinder-sizing" style={S.h1}>Cylinder Sizing</h2>

        <p style={S.p}>Calculating the FM200 quantity is an engineering exercise.</p>

        <p style={S.p}><strong>Basic formula:</strong></p>

        <p style={S.p}>Agent required = Room volume × Design concentration factor × Safety factor</p>

        <p style={S.p}>The design concentration for Class A fires is typically <strong>7.0% to 8.0%</strong> (NFPA 2001 listed value). The actual agent quantity is determined by a certified engineer according to hydraulic calculations, room volume, temperature and the applicable standard.</p>

        <p style={S.p}><strong>Example calculation:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Room: 10m × 8m × 3m = 240 cubic meters</li>
          <li style={S.li}>Temperature: 20°C</li>
          <li style={S.li}>Design concentration: 7%</li>
          <li style={S.li}>FM200 required: approximately 240 × 0.52 kg/m³ = ~125 kg</li>
          <li style={S.li}>Safety factor additional agent (per design calculation) = ~150 kg total (indicative only)</li>
        </ul>

        <p style={S.p}>The actual calculation is done with software — FIKE, Kidde or similar tools.</p>

        <p style={S.p}>Only a certified fire suppression engineer should do this design.</p>

        <WarningCard>
          The gas stored in an FM200 cylinder is at very high pressure — 360 psi. Never modify the cylinder, never weld it, and never use a damaged cylinder. Do an annual weight check — if the cylinder weight has dropped by more than 5%, refill it. Replace a damaged valve or cylinder immediately — this is life-safety equipment.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation</h2>

        <h3 style={S.h3}>Room Integrity Test (Door Fan Test)</h3>
        <p style={S.p}>FM200 works only when the room is properly sealed.</p>

        <p style={S.p}>The door fan test verifies that the room has an adequate enclosure.</p>

        <p style={S.p}>In the test a fan is fitted to create a pressure differential — leakage is measured.</p>

        <p style={S.p}>Result: Room should hold FM200 concentration for minimum 10 minutes.</p>

        <h3 style={S.h3}>Nozzle Placement</h3>
        <p style={S.p}>Nozzle locations are calculated — room geometry, obstacles, cylinder pressure.</p>

        <p style={S.p}>Typically on the ceiling, equally spaced.</p>

        <p style={S.p}>There can be nozzles in the raised floor too — for under-floor protection.</p>

        <h3 style={S.h3}>Pipe Sizing</h3>
        <p style={S.p}>Pipe diameter and length are calculated — to ensure equal flow to every nozzle.</p>

        <p style={S.p}>The design is done with hydraulic calculation software.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>No equipment damage:</strong> No water, no residue — electronics safe</li>
          <li style={S.li}><strong>Fast discharge:</strong> 10 seconds — fire quickly controlled</li>
          <li style={S.li}><strong>Safe for humans:</strong> At design concentration — oxygen level maintained</li>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Can be safely discharged on live equipment</li>
          <li style={S.li}><strong>Reliable automation:</strong> Triggered by VESDA — no need for manual intervention</li>
          <li style={S.li}><strong>Abort window:</strong> Discharge can be stopped on a false alarm</li>
          <li style={S.li}><strong>Proven technology:</strong> In use in data centers for 30+ years</li>
          <li style={S.li}><strong>Low maintenance:</strong> Cylinders stay stable for years</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>High GWP:</strong> 3,220 — significant climate impact per discharge</li>
          <li style={S.li}><strong>Expensive refill:</strong> Refilling the cylinder after one discharge is costly</li>
          <li style={S.li}><strong>Room integrity required:</strong> In a leaky room the FM200 concentration is not maintained</li>
          <li style={S.li}><strong>HVAC must shut down:</strong> Coordination required — and HVAC down means cooling is off too</li>
          <li style={S.li}><strong>Decomposition products:</strong> In very high temperature fires HF (hydrogen fluoride) can form — corrosive</li>
          <li style={S.li}><strong>Phase-out risk:</strong> European regulations are restricting FM200 — the future is uncertain</li>
          <li style={S.li}><strong>Not for deep-seated fires:</strong> Not fully effective for Class A fires (wood, paper burning deeply)</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Control panel status check — no fault indicators</li>
          <li style={S.li}>Cylinder visual inspect — no damage, no corrosion</li>
          <li style={S.li}>Pressure gauge check — within specified range</li>
          <li style={S.li}>Abort switch test — is it functional?</li>
          <li style={S.li}>Manual pull station test (with system isolated)</li>
        </ul>

        <p style={S.p}><strong>Annual (by certified engineer):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Cylinder weight check — compare with full weight tag</li>
          <li style={S.li}>Room integrity test — door fan test</li>
          <li style={S.li}>Inspect all wiring</li>
          <li style={S.li}>Inspect nozzles — are they blocked?</li>
          <li style={S.li}>FACP functional test — with suppression isolated</li>
          <li style={S.li}>Complete system end-to-end test</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>An actual discharge test of the FM200 system is not done — too expensive and disruptive.</p>

        <p style={S.p}>Instead — <strong>simulated tests</strong> are done:</p>

        <h3 style={S.h3}>Functional Test (Without Discharge)</h3>
        <p style={S.p}>Isolate the suppression system — remove the fuse/link of the solenoid valve.</p>

        <p style={S.p}>Trigger the alarm with a smoke detector or test aerosol.</p>

        <p style={S.p}>Verify: the pre-alarm sounded, doors closed, HVAC shut down, abort timer counted, FACP signal went through.</p>

        <p style={S.p}>Verify everything — just not the actual discharge.</p>

        <h3 style={S.h3}>Discharge Test (Full — Rare)</h3>
        <p style={S.p}>Only when: new installation commissioning, a major change, or the authority requires it.</p>

        <p style={S.p}>Empty the room. Remove or protect the equipment.</p>

        <p style={S.p}>Discharge — verify with concentration meters that the design concentration was achieved.</p>

        <p style={S.p}>Costly: gas refill + downtime. That is why it is rarely done.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 2001:</strong> Standard on Clean Agent Fire Extinguishing Systems — primary reference</li>
          <li style={S.li}><strong>ISO 14520:</strong> Gaseous fire-extinguishing systems — international standard</li>
          <li style={S.li}><strong>BS EN 15004:</strong> European standard for fixed firefighting systems</li>
          <li style={S.li}><strong>NBC India Part 4:</strong> Fire and Life Safety — applicable requirements</li>
          <li style={S.li}><strong>Uptime Institute:</strong> Clean agent suppression for Tier III/IV data centers</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> This is an illustrative example scenario — it is not documentation of any specific real facility.</p>

        <p style={S.p}><strong>Scenario:</strong> 3 MW data center, 4 zones — server hall (2 zones), UPS room, battery room.</p>

        <p style={S.p}><strong>FM200 design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall Zone 1: 600 sqm, 4.5m ceiling — 8 cylinders × 80 kg each</li>
          <li style={S.li}>Server hall Zone 2: 400 sqm — 6 cylinders × 80 kg each</li>
          <li style={S.li}>UPS room: 2 cylinders × 100 kg</li>
          <li style={S.li}>Battery room: 2 cylinders × 80 kg</li>
        </ul>

        <p style={S.p}><strong>Incident (real scenario type):</strong> Capacitor overheating in the UPS room — VESDA Alert level triggered. The NOC operator investigated. A UPS fault was found — it was reset. FM200 did not discharge. Crisis averted.</p>

        <p style={S.p}><strong>Lesson:</strong> Investigate the Alert level — this is exactly the design intent of VESDA + FM200.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Abort Switch Disabled</h3>
        <p style={S.p}>Some engineers, annoyed by false alarms, keep the abort switch on permanent hold.</p>

        <p style={S.p}>If a real fire comes, there will be no discharge. Never do this.</p>

        <h3 style={S.h3}>Mistake 2 — HVAC Not Interlocked</h3>
        <p style={S.p}>FM200 will discharge, but if the HVAC keeps running the gas will get diluted.</p>

        <p style={S.p}>The HVAC interlock must be automatic — do not depend on manual action.</p>

        <h3 style={S.h3}>Mistake 3 — Room Integrity Not Maintained</h3>
        <p style={S.p}>New cable entries, gaps in walls — all of these leak FM200.</p>

        <p style={S.p}>Do an annual door fan test — verify the leakage.</p>

        <h3 style={S.h3}>Mistake 4 — Cylinder Weight Not Checked</h3>
        <p style={S.p}>Cylinders leak slowly — the pressure gauge is sometimes not accurate.</p>

        <p style={S.p}>Verify by weight — every year. Typically refill at 5% or the manufacturer-specified weight loss — follow the system specification and applicable standard for the exact threshold.</p>

        <h3 style={S.h3}>Mistake 5 — Post-Discharge No Investigation</h3>
        <p style={S.p}>FM200 discharged, the fire went out, "everything is fine" — do not think like this.</p>

        <p style={S.p}>What was the root cause? That issue is still there. Fix it — otherwise it will happen again.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: How does FM200 extinguish a fire?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 works through a heat absorption mechanism. It absorbs the heat element of the fire triangle. The chemical reaction cannot sustain itself — the fire goes out. The oxygen level is maintained, which is why it is safe for humans at design concentration.</p>

        <h3 style={S.h3}>Q2: What is the FM200 discharge sequence?</h3>
        <p style={S.p}><strong>Answer:</strong> Fire detected → Pre-alarm sounds → HVAC shuts down → Doors close → Abort window (30-60 sec) → Solenoid valve opens → Discharge in 10 seconds → 10 min hold time → Ventilation → Entry with SCBA.</p>

        <h3 style={S.h3}>Q3: Why is room integrity important for FM200?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 is a gas — in a leaky room the concentration will not be maintained. To achieve the 7-8% design concentration the room must be sealed. The annual door fan test verifies that the room provides an adequate hold time.</p>

        <h3 style={S.h3}>Q4: What is the main difference between FM200 and CO2?</h3>
        <p style={S.p}><strong>Answer:</strong> CO2 extinguishes fire through oxygen displacement — if anyone is left in the room there is a suffocation risk. FM200 extinguishes through heat absorption — the oxygen level stays safe. That is why FM200 is preferred in data centers. CO2 is used in engine rooms or unoccupied spaces.</p>

        <h3 style={S.h3}>Q5: What should be done on an accidental FM200 discharge?</h3>
        <p style={S.p}><strong>Answer:</strong> Evacuate immediately. Close the doors — contain the gas. Start ventilation. Do not let anyone into the room until it is ventilated. Investigate the root cause — was it a fire or a false alarm? Reset the system through a certified engineer. Report the incident.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>FM200 vs CO2 vs Sprinkler</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Integrate with VESDA:</strong> FM200 alone is not useful — early detection is essential</li>
          <li style={S.li}><strong>Design zone-wise:</strong> Server hall, UPS, battery — separate zones, separate cylinders</li>
          <li style={S.li}><strong>Configure the abort window:</strong> 30-60 seconds — according to the response capability of the operations team</li>
          <li style={S.li}><strong>Annual door fan test:</strong> Verify room integrity — mandatory</li>
          <li style={S.li}><strong>Log the cylinder weight:</strong> Every inspection. 5% drop = refill time</li>
          <li style={S.li}><strong>Post-discharge protocol:</strong> Root cause, fix, re-arm — all three are essential</li>
          <li style={S.li}><strong>Keep a spare cylinder ready:</strong> A refill after discharge takes 2-4 weeks — what is the interim protection?</li>
          <li style={S.li}><strong>Training:</strong> The operations team must know the discharge sequence — a wrong action in panic is dangerous</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "FM200 = HFC-227ea — a clean agent gas that extinguishes fire through heat absorption. No water, no residue, equipment safe.",
          "Safe for humans at design concentration (7-8%) — the oxygen level is maintained. Completely different from CO2.",
          "10 second discharge — fast and effective. VESDA detects, FM200 extinguishes.",
          "Discharge sequence: detect → pre-alarm → HVAC off → doors close → abort window → discharge → hold → ventilate.",
          "Room integrity is critical — FM200 does not work in a leaky room. Annual door fan test is mandatory.",
          "Check the cylinder weight annually — slow leaks do not show on the pressure gauge.",
          "The GWP of FM200 is 3,220 — an environmental concern. Consider Novec 1250 for a new installation.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>FM200 is complete. Understand the next part of the fire protection chain:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — the detection system that triggers FM200 — read this first.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — the modern replacement for FM200 — better environmental profile.</li>
          <li style={S.li}><TopicLink slug="novec" variant="inline" /> — the Novec fluid family — suppression and cooling applications.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — the water-based backup system that complements FM200.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
