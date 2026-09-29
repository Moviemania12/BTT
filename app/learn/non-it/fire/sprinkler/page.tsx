import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Sprinkler System in Data Centers — Pre-Action Design | Behind The Tech",
  description:
    "How does a sprinkler system work in a Data Center — pre-action, double interlock, dry pipe, deluge. Why wet pipe never in server halls. Maintenance and testing guide. In simple English.",
  keywords: ["sprinkler data center", "pre-action sprinkler", "double interlock sprinkler", "fire sprinkler data center", "dry pipe sprinkler"],
  openGraph: {
    title: "Sprinkler System in Data Centers — Pre-Action Design",
    description: "Never wet pipe sprinklers in a Data Center — why the pre-action system is essential and how it works.",
    url: "https://behindthetech.in/learn/non-it/fire/sprinkler",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinkler System Explained — Behind The Tech",
    description: "Pre-action sprinkler system — the water-based layer of Data Center fire protection, in simple language.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/sprinkler",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/sprinkler",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/sprinkler",
      "x-default": "https://behindthetech.in/learn/non-it/fire/sprinkler",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-sprinkler",    text: "What Is a Sprinkler System?",            level: 2 },
  { id: "why-needed",           text: "Why Is Sprinkler Needed in a DC?",       level: 2 },
  { id: "wet-pipe-never",       text: "Why Wet Pipe Never in Server Halls",     level: 2 },
  { id: "pre-action",           text: "Pre-Action System — The DC Standard",    level: 2 },
  { id: "double-interlock",     text: "Double Interlock Pre-Action",            level: 2 },
  { id: "working-principle",    text: "Working Principle",                       level: 2 },
  { id: "main-components",      text: "Main Components",                         level: 2 },
  { id: "how-it-works-in-dc",   text: "How Sprinkler Works in a Data Center",   level: 2 },
  { id: "types",                text: "Types of Sprinkler Systems",              level: 2 },
  { id: "sprinkler-heads",      text: "Sprinkler Heads",                        level: 2 },
  { id: "advantages",           text: "Advantages",                              level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "testing",              text: "Testing",                                 level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",      text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "Sprinkler Types Comparison",              level: 2 },
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
    { label: "In one line", text: "In a Data Center the sprinkler system is of the pre-action type — water is released only when smoke detection AND heat detection both trigger simultaneously. Water does not come on any single condition." },
    { label: "Why not wet pipe", text: "In a normal wet pipe sprinkler the pipes are always full of water. When one head fuses, water comes out immediately — catastrophic water damage in the server room. Wet pipe is absolutely not acceptable in a Data Center." },
    { label: "The logic of pre-action", text: "Pre-action = two conditions simultaneously. VESDA detects smoke AND the heat sensor triggers — only then does the pre-action valve open. No single condition on its own brings water. Double safety." },
    { label: "Double interlock", text: "Double interlock pre-action = most secure. The pipes stay dry. Water enters the pipes only on both conditions. Then it actually comes out when a sprinkler head fuses. Three stages of safety." },
    { label: "Last resort in DC", text: "The sprinkler system is the last resort after FM200. FM200 extinguishes the fire — the sprinkler should never have to work at all. If FM200 fails and the fire grows, the sprinkler is the backup." },
    { label: "Coordination", text: "Coordination between the FM200 discharge and the sprinkler system is essential. When FM200 is active the sprinkler must stay suppressed. If both discharge simultaneously, FM200 gets diluted — the concentration drops." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#0369a1,#0369a1)" }} />
      <div style={{ background: "rgba(3,105,161,0.03)", border: "1px solid rgba(3,105,161,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#0369a1", fontWeight: 600, marginBottom: 16 }}>💦 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#0369a1", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(3,105,161,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Pre-action = double safety. Water coming by mistake is almost impossible. In the full article ahead every system type will become clear.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(3,105,161,0.05)", border: "1px solid rgba(3,105,161,0.18)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(3,105,161,0.05),rgba(37,99,235,0.03))", border: "1px solid rgba(3,105,161,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#0369a1,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#0369a1", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(3,105,161,0.12)", border: "1px solid rgba(3,105,161,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(3,105,161,0.02)", border: "1px solid rgba(3,105,161,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(3,105,161,0.08)", border: "1px solid rgba(3,105,161,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#0369a1", margin: "0 4px", opacity: 0.7 }}>→</span>}
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
    { feature: "Pipes filled with",    wet: "Water (always)",       dry: "Air/Nitrogen",           preaction: "Air (until activated)",  deluge: "Empty (open heads)" },
    { feature: "Activation",           wet: "Head fuse only",       dry: "Head fuse + air release",preaction: "Detection + head fuse",   deluge: "Detection signal" },
    { feature: "Water release",        wet: "Immediate",            dry: "Delayed (30-60 sec)",    preaction: "Two-stage",              deluge: "All heads simultaneously" },
    { feature: "Accidental discharge", wet: "High risk",            dry: "Medium risk",            preaction: "Very low risk",          deluge: "Low (needs signal)" },
    { feature: "Used in DC server hall",wet:"NEVER",               dry: "Rarely",                 preaction: "YES — standard",         deluge: "Rarely" },
    { feature: "Water damage if fault",wet: "Certain",              dry: "Possible",               preaction: "Very unlikely",          deluge: "Possible" },
    { feature: "Cost",                 wet: "Lowest",               dry: "Medium",                 preaction: "High",                   deluge: "Medium" },
    { feature: "Complexity",           wet: "Simple",               dry: "Medium",                 preaction: "Complex",                deluge: "Medium" },
    { feature: "FM200 compatibility",  wet: "Conflicts",            dry: "Limited",                preaction: "Coordinated",            deluge: "Not typical" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "rgba(3,105,161,0.06)" }}>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Feature</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#dc2626", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Wet Pipe</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Dry Pipe</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#059669", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Pre-Action</th>
            <th style={{ padding: "9px 12px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(3,105,161,0.12)" }}>Deluge</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(3,105,161,0.02)" }}>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "8px 12px", color: "#dc2626", border: "1px solid rgba(3,105,161,0.08)", fontWeight: row.wet === "NEVER" ? 700 : 400 }}>{row.wet}</td>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)" }}>{row.dry}</td>
              <td style={{ padding: "8px 12px", color: "#059669", border: "1px solid rgba(3,105,161,0.08)", fontWeight: row.preaction === "YES — standard" ? 700 : 400 }}>{row.preaction}</td>
              <td style={{ padding: "8px 12px", color: "#1f2937", border: "1px solid rgba(3,105,161,0.08)" }}>{row.deluge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "Why is a wet pipe sprinkler not used in a Data Center?", a: "In a wet pipe the pipes are always full of water. If any sprinkler head fuses accidentally — mechanical damage, corrosion, someone knocking it — water will be released immediately. Water in the server room = servers destroyed = data loss. The accidental discharge risk is so high that wet pipe is unacceptable. Pre-action needs double confirmation — much safer." },
  { q: "What does 'double' mean in double interlock pre-action?", a: "Double interlock = two independent conditions are required simultaneously for the pre-action valve to open. Condition 1: the smoke/fire detection system triggers (VESDA or smoke detector). Condition 2: the heat fusible element of a sprinkler head fuses. Water does not come on only one condition. Both must happen simultaneously. This prevents both independent failures." },
  { q: "Can FM200 discharge and the sprinkler activate simultaneously?", a: "This is avoided in the design. When FM200 activates, the sprinkler system is kept suppressed — or there is a timing delay. Simultaneous activation is problematic: FM200 gas gets diluted by water, and the concentration is not achieved. Typically — FM200 activates first. Only if FM200 fails and the fire keeps growing does the sprinkler activate. This sequencing is carefully planned in the design phase." },
  { q: "At what temperature does a sprinkler head fuse?", a: "Different colored fusible elements operate at different temperatures. Orange: 57°C, Red: 68°C, Yellow: 79°C, Green: 93°C, Blue: 141°C. In a Data Center typically red (68°C) or orange (57°C) heads are used. The server room maintains the ASHRAE temperature of 18-27°C — accidental fusing is extremely unlikely. But a head can also fail from leakage or corrosion — that is why regular inspection is essential." },
  { q: "How is the sprinkler system tested annually?", a: "Full flow test: let water out from the inspector test valve, verify flow and pressure. Sprinkler head inspection: check for corrosion, paint coating (never paint sprinkler heads!), damage. Pre-action valve functional test: trigger the detection system, verify that the valve correctly opens/closes. Pressure gauge accuracy check. Operate all isolation valves. Generate a report and submit it for fire NOC renewal." },
  { q: "Is a sprinkler needed under the server room raised floor too?", a: "Yes — many design standards and fire consultants recommend sprinkler heads in the raised floor plenum as well. Under the floor, cables, PDUs and other equipment are fire risks. VESDA already does under-floor sampling. Under-floor sprinkler heads must also be temperature-rated specifically for under-floor use. This is an additional layer of protection — especially in Tier III and Tier IV designs." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(3,105,161,0.08)" }}>
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

export default function SprinklerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="sprinkler" headings={HEADINGS} readingTimeMinutes={19} lang="en" alternateHref="/hi/learn/non-it/fire/sprinkler">

        <p style={S.p}>In 1996 the sprinkler system saved the warehouse of Dhiraj Trading Company.</p>

        <p style={S.p}>One head fused, water came out, the fire came under control.</p>

        <p style={S.p}>But in 2019 the same system was devastating in the server room of a Mumbai bank.</p>

        <p style={S.p}>A maintenance engineer accidentally touched a sprinkler head with a tool.</p>

        <p style={S.p}>There was water in the pipe — a wet pipe system. Water immediately fell on 50 servers.</p>

        <p style={S.p}><strong>A loss of ₹8 crore. There was no fire.</strong></p>

        <p style={S.p}>This is the reason the sprinkler system is designed differently in a Data Center.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/sprinkler/sprinkler-preaction-system.png"
              alt="Pre-action sprinkler system control valve and detection panel in a data center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Pre-action sprinkler system — control valve assembly and detection panel. The pipes are dry — water comes only when both conditions trigger simultaneously.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-sprinkler" style={S.h1}>What Is a Sprinkler System?</h2>

        <p style={S.p}><strong>A sprinkler system is an automatic water-based fire suppression system.</strong></p>

        <p style={S.p}>Pipes are installed on the ceiling. The pipes have sprinkler heads.</p>

        <p style={S.p}>A sprinkler head has a fusible element — it melts at a specific temperature.</p>

        <p style={S.p}>When the head fuses — water is released from that same head.</p>

        <p style={S.p}><strong>Important: only the heads where there is fire activate — not all of them.</strong></p>

        <p style={S.p}>It is a common myth that all heads activate together. That does not happen.</p>

        <DCMapNote components={["Pre-Action Valve", "Dry Pipe Network", "Sprinkler Heads", "Detection System", "Air Compressor", "Control Panel"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Sprinkler Needed in a DC?</h2>

        <p style={S.p}>FM200 is excellent — but it works only in designated enclosed areas.</p>

        <p style={S.p}>What if FM200 fails or the fire spreads outside the protected zone?</p>

        <p style={S.p}>Building codes and fire standards mandate that there must be a backup water-based system.</p>

        <p style={S.p}><strong>Sprinkler = safety net. FM200 primary, sprinkler backup.</strong></p>

        <WhyThisMatters>
          NBC India and local fire authority requirements require a sprinkler system in applicable buildings. Having a clean agent system (FM200/Novec) does not automatically eliminate the sprinkler requirement — specific exemptions have to be confirmed project-by-project with the AHJ. Coordinate both systems properly — follow the applicable code and AHJ guidance.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="wet-pipe-never" style={S.h1}>Why Wet Pipe Never in Server Halls</h2>

        <p style={S.p}>Wet pipe system — the pipes are always full of water.</p>

        <p style={S.p}>When a single head fuses — immediate water release.</p>

        <p style={S.p}><strong>This is not acceptable in the server room because:</strong></p>

        <ul style={S.ul}>
          <li style={S.li}>A head can fuse accidentally from mechanical damage</li>
          <li style={S.li}>A head can fail prematurely from corrosion</li>
          <li style={S.li}>Someone adjusting equipment accidentally head touch kare</li>
          <li style={S.li}>False activation from a temperature sensor malfunction</li>
        </ul>

        <p style={S.p}>In any of these situations — water comes directly onto the servers.</p>

        <p style={S.p}><strong>Result: a loss of millions of rupees — even more than from a fire.</strong></p>

        <InsightCard>
          In a data center the worst case scenario is often not a fire — it is an accidental water release. A false FM200 discharge is costly (₹10-20 lakh refill). But an accidental wet pipe sprinkler discharge = servers + storage + network equipment destroyed — a loss of ₹crores. That is why the very first rule in sprinkler design is: "absolutely no wet pipe in the server hall."
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="pre-action" style={S.h1}>Pre-Action System — The DC Standard</h2>

        <p style={S.p}><strong>In a Data Center the pre-action system is the commonly used and widely recommended approach.</strong></p>

        <p style={S.p}>The concept of pre-action is simple:</p>

        <p style={S.p}>Before water is released — an extra "pre-action" condition must be confirmed.</p>

        <p style={S.p}>Water does not come just from a sprinkler head fusing.</p>

        <p style={S.p}><strong>The detection system must also trigger — simultaneously.</strong></p>

        <p style={S.p}>Because of this dual requirement, accidental water release becomes practically impossible.</p>

        <FlowDiagram
          caption="Pre-action system activation sequence"
          steps={[
            { icon: "🔍", label: "VESDA Alert", sublabel: "Smoke detected" },
            { icon: "🌡️", label: "Heat Sensor", sublabel: "High temp detected" },
            { icon: "🔓", label: "Pre-Action Valve", sublabel: "Opens (water enters)" },
            { icon: "💧", label: "Head Fuses", sublabel: "At fire location" },
            { icon: "🚿", label: "Water Discharges", sublabel: "Targeted release" },
          ]}
        />

        <hr style={S.divider} />

        <h2 id="double-interlock" style={S.h1}>Double Interlock Pre-Action</h2>

        <p style={S.p}>Single interlock: detection OR head fuse — the valve opens on either condition.</p>

        <p style={S.p}><strong>Double interlock: detection AND head fuse — both required simultaneously.</strong></p>

        <p style={S.p}>In Data Centers double interlock is preferred and often required.</p>

        <h3 style={S.h3}>How Double Interlock Works</h3>

        <p style={S.p}><strong>Normal condition:</strong> There is air pressure in the pipes — no water. Valve closed.</p>

        <p style={S.p}><strong>Step 1 — Detection triggers:</strong> VESDA or a smoke detector gives the fire signal.</p>

        <p style={S.p}>The pre-action panel goes into alert. The alarm sounds. But no water has come yet.</p>

        <p style={S.p}><strong>Step 2 — Head fuses:</strong> The heat of the fire melts the fusible element of the sprinkler head.</p>

        <p style={S.p}>The air pressure in the pipe is released through the head.</p>

        <p style={S.p}><strong>Step 3 — Both conditions met:</strong> The panel detects both detection AND the air pressure drop.</p>

        <p style={S.p}>The pre-action valve opens automatically — water enters the pipes.</p>

        <p style={S.p}><strong>Step 4 — Water discharges:</strong> Water comes out only from the fused head — targeted release.</p>

        <EngineerTip>
          In double interlock, maintaining the pipe air pressure is important. An air compressor builds pressure in the pipes. If air leaks, you will get a false signal that a head has fused — the system may partially activate. Check the air pressure monthly. Identify and fix leaks. Monitor the running status of the air compressor on the BMS.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>A sprinkler head has a glass bulb or a metal fusible link.</p>

        <p style={S.p}>Inside this bulb/link there is liquid — it expands and breaks at a specific temperature.</p>

        <p style={S.p}>When the temperature in the head area crosses the threshold — the bulb breaks.</p>

        <p style={S.p}>The deflector plate is exposed — it starts forming the water spray pattern.</p>

        <p style={S.p}><strong>The water spray pattern covers the whole fire area — targeted suppression.</strong></p>

        <WarningCard>
          Never paint a sprinkler head — this is a critical safety violation. The paint film coats the fusible element — the temperature response slows down or it stops working entirely. If painting work is going on at the site, cover the sprinkler heads and remove the covers after the painting is complete. A painted head — replace it immediately.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Pre-Action Valve (Deluge Valve)</h3>
        <p style={S.p}>The main control point of the system.</p>

        <p style={S.p}>Normally closed — it does not let water enter the pipe network.</p>

        <p style={S.p}>It opens by operating electrically on both — detection + air pressure drop.</p>

        <h3 style={S.h3}>2. Air Supply System</h3>
        <p style={S.p}>Compressed air or nitrogen — is maintained in the pipe network.</p>

        <p style={S.p}>Typically 10-20 PSI pressure — when a head fuses, the pressure drop is detected.</p>

        <p style={S.p}>The air compressor is dedicated — with automatic restart.</p>

        <h3 style={S.h3}>3. Detection System Interface</h3>
        <p style={S.p}>Receives the signal from VESDA or a smoke detector.</p>

        <p style={S.p}>It is integrated into the pre-action panel — dual-input logic.</p>

        <p style={S.p}>When both signals arrive simultaneously — valve release command.</p>

        <h3 style={S.h3}>4. Sprinkler Heads</h3>
        <p style={S.p}>Pendant type (downward facing) — most common in server halls.</p>

        <p style={S.p}>Upright type — for the raised floor or unusual orientations.</p>

        <p style={S.p}>Concealed type — for aesthetic ceilings — protected by a cover plate.</p>

        <h3 style={S.h3}>5. Pipe Network</h3>
        <p style={S.p}>Schedule 40 black steel pipes typically — galvanized also possible.</p>

        <p style={S.p}>Grid pattern on the ceiling — to ensure coverage.</p>

        <p style={S.p}>Drain points — for system reset and maintenance.</p>

        <h3 style={S.h3}>6. Control Panel</h3>
        <p style={S.p}>The brain of the pre-action system.</p>

        <p style={S.p}>Detection signals, air pressure, valve status — it monitors everything.</p>

        <p style={S.p}>It integrates with the BMS and FACP.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Sprinkler Works in a Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/sprinkler/sprinkler-head-closeup.png"
              alt="Close-up of a sprinkler head installed in a data center ceiling above server racks"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            A sprinkler head on a Data Center ceiling — the glass bulb is visible. In a pre-action system it is connected to a dry pipe — there is no water in the pipes right now.
          </figcaption>
        </figure>

        <p style={S.p}>In a Data Center sprinkler zones are carefully defined:</p>

        <h3 style={S.h3}>Server Hall</h3>
        <p style={S.p}>Double interlock pre-action — the stringent option. Selection depends on the applicable code (NFPA 13, NBC), AHJ requirements and the insurer/risk consultant.</p>

        <p style={S.p}>Typically coordinated with the early detection system — the exact integration depends on the project-specific design and cause-and-effect logic.</p>

        <p style={S.p}>On the ceiling and in the under-floor plenum — both areas covered.</p>

        <h3 style={S.h3}>UPS Room / Battery Room</h3>
        <p style={S.p}>Single interlock pre-action — or a dry pipe system.</p>

        <p style={S.p}>The role of clean agent and sprinkler depends on the project design and applicable code — typically the clean agent activates first.</p>

        <h3 style={S.h3}>Common Areas (Lobby, Corridors)</h3>
        <p style={S.p}>Wet pipe — acceptable here. There are no servers here.</p>

        <p style={S.p}>Standard commercial wet pipe system.</p>

        <h3 style={S.h3}>Generator Area</h3>
        <p style={S.p}>Deluge system sometimes — for diesel fire risk.</p>

        <InsightCard>
          Coordinating FM200 and the sprinkler is a design challenge. On FM200 discharge — HVAC shuts down, doors close. The sprinkler system must stay suppressed at this time. If the sprinkler also activates — the FM200 gas gets diluted, the concentration is not achieved. This "cross-system interlock" has to be carefully engineered. Typically — FM200 first. If FM200 fails and the temperature keeps rising — then the sprinkler activates.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Sprinkler Systems</h2>

        <h3 style={S.h3}>1. Wet Pipe</h3>
        <p style={S.p}>Pipes always filled with water. Immediate water on head fuse. Simplest and cheapest.</p>

        <p style={S.p}><strong>Wet pipe is strongly not recommended in data center IT spaces — the accidental discharge risk is unacceptable. Pre-action is preferred.</strong></p>

        <h3 style={S.h3}>2. Dry Pipe</h3>
        <p style={S.p}>Compressed air in the pipes — on head fuse the air is released, then water enters.</p>

        <p style={S.p}>30-60 second delay before water. Used in cold climates (freeze protection).</p>

        <p style={S.p}>Better than wet for the server hall — but not ideal.</p>

        <h3 style={S.h3}>3. Single Interlock Pre-Action</h3>
        <p style={S.p}>Trigger detection — water enters the pipes. Only then, on a head fuse, water releases.</p>

        <p style={S.p}>One condition: detection. Dry pipes normally.</p>

        <h3 style={S.h3}>4. Double Interlock Pre-Action</h3>
        <p style={S.p}>Detection AND head fuse — both simultaneously. Pipes normally dry.</p>

        <p style={S.p}><strong>Data center server hall standard: Double interlock pre-action.</strong></p>

        <h3 style={S.h3}>5. Deluge System</h3>
        <p style={S.p}>All heads open (no fusible element). On the detection signal they all discharge simultaneously.</p>

        <p style={S.p}>High-hazard areas like generator fuel storage, large transformer rooms.</p>

        <hr style={S.divider} />

        <h2 id="sprinkler-heads" style={S.h1}>Sprinkler Heads</h2>

        <h3 style={S.h3}>By Orientation</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Pendant (downward):</strong> Most common — deflector neeche, water cone pattern</li>
          <li style={S.li}><strong>Upright:</strong> Above the pipe — used in special orientations</li>
          <li style={S.li}><strong>Sidewall:</strong> Wall-mounted — for corridors</li>
          <li style={S.li}><strong>Concealed:</strong> Decorative cover plate — aesthetic in office areas</li>
        </ul>

        <h3 style={S.h3}>By Temperature Rating (Bulb Color)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Orange bulb — 57°C:</strong> Extra sensitive — normal temperature environments</li>
          <li style={S.li}><strong>Red bulb — 68°C:</strong> Standard — common in Data Center server halls</li>
          <li style={S.li}><strong>Yellow/Green — 79-93°C:</strong> Higher temperature environments</li>
          <li style={S.li}><strong>Blue — 141°C:</strong> Very high temperature areas</li>
        </ul>

        <p style={S.p}>Red (68°C) is common in the server hall — far enough from the ASHRAE max 27°C inlet.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Automatic backup:</strong> Automatic backup protection if FM200 fails</li>
          <li style={S.li}><strong>NBC compliance:</strong> Mandatory for the fire NOC — legal protection</li>
          <li style={S.li}><strong>Accidental discharge protection:</strong> Double interlock = very low false alarm risk</li>
          <li style={S.li}><strong>Large area coverage:</strong> Entire floor covered — more coverage area than FM200</li>
          <li style={S.li}><strong>Cost effective suppression:</strong> Water is cheap — repeat use without refill</li>
          <li style={S.li}><strong>Targeted:</strong> Only fused heads activate — not entire zone flooding</li>
          <li style={S.li}><strong>Proven technology:</strong> 150+ years old technology — very reliable</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Water damage:</strong> Equipment damage on discharge — unlike FM200</li>
          <li style={S.li}><strong>Complex design:</strong> The double interlock system is complex — maintenance intensive</li>
          <li style={S.li}><strong>FM200 conflict risk:</strong> If coordination is wrong, both discharge simultaneously</li>
          <li style={S.li}><strong>Air system maintenance:</strong> The compressed air system has to be maintained</li>
          <li style={S.li}><strong>Head inspection:</strong> Corrosion, paint, physical damage — regular checks needed</li>
          <li style={S.li}><strong>System reset:</strong> Once activated, draining and resetting is time-consuming</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Air pressure check — all zones</li>
          <li style={S.li}>Control panel status — no faults</li>
          <li style={S.li}>Detection system interface — working?</li>
          <li style={S.li}>Sprinkler heads visual inspect — sample basis</li>
          <li style={S.li}>Pre-action valve — no leaks around body</li>
        </ul>

        <p style={S.p}><strong>Annual (by certified fire contractor):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>All sprinkler heads inspect — corrosion, paint, damage</li>
          <li style={S.li}>Pre-action valve functional test — without actual water release</li>
          <li style={S.li}>Inspector test valve — flow test</li>
          <li style={S.li}>Air compressor performance verify</li>
          <li style={S.li}>Detection interface test — end-to-end</li>
          <li style={S.li}>Pipe corrosion inspection — internal or ultrasonic</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <h3 style={S.h3}>Inspector Test (Annual)</h3>
        <p style={S.p}>Inspector test valve — there is a small valve at the pipe end.</p>

        <p style={S.p}>Opening it simulates a pressure drop just like a head fusing.</p>

        <p style={S.p}>The pre-action panel detects it, the alarm sounds — without an actual discharge.</p>

        <h3 style={S.h3}>Full System Functional Test (with Water — Rare)</h3>
        <p style={S.p}>At new installation commissioning or after a major renovation.</p>

        <p style={S.p}>Trigger detection, verify that the valve opens and water enters the pipes.</p>

        <p style={S.p}><strong>In the server hall — remove or protect the equipment first.</strong></p>

        <p style={S.p}>Post-test — fully drain the system and recharge the air.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 13:</strong> Standard for Installation of Sprinkler Systems — primary global reference</li>
          <li style={S.li}><strong>NBC 2016 Part 4:</strong> Fire and Life Safety — India specific requirements</li>
          <li style={S.li}><strong>IS 15105:</strong> Design and installation of fixed automatic sprinkler systems</li>
          <li style={S.li}><strong>FM Global Property Loss Prevention:</strong> Data center sprinkler design standards</li>
          <li style={S.li}><strong>Uptime Institute Tier Standards:</strong> Pre-action sprinkler for Tier III/IV</li>
          <li style={S.li}><strong>TIA-942:</strong> Data center infrastructure — fire suppression requirements</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> This is an illustrative example scenario — it is not a reference to a documented real facility.</p>

        <p style={S.p}><strong>Scenario:</strong> Mid-size data center, server hall.</p>

        <p style={S.p}><strong>Sprinkler design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Server hall: Double interlock pre-action — 180 sprinkler heads, ceiling and under-floor</li>
          <li style={S.li}>UPS room: Single interlock pre-action — 24 heads</li>
          <li style={S.li}>Lobby + corridors: Wet pipe — 40 heads</li>
          <li style={S.li}>Generator yard: Deluge — 12 open heads</li>
        </ul>

        <p style={S.p}><strong>FM200-Sprinkler coordination:</strong> On FM200 discharge, a 5 minute suppression delay on the sprinkler — FM200 gets time to work. If the temperature is still rising after 5 minutes — the sprinkler activates.</p>

        <p style={S.p}><strong>Lesson:</strong> Proper system selection and coordination — pre-action with clean agent — protects IT spaces without unnecessary water damage risk.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Wet Pipe in Server Room</h3>
        <p style={S.p}>Still seen in older or budget-constrained data centers.</p>

        <p style={S.p}>Non-negotiable: upgrade to pre-action immediately. The risk is unacceptable.</p>

        <h3 style={S.h3}>Mistake 2 — Sprinkler Heads Painted</h3>
        <p style={S.p}>The painting crew painted them — "looks better".</p>

        <p style={S.p}>Painted heads can fail — replace all painted heads immediately.</p>

        <h3 style={S.h3}>Mistake 3 — FM200 and Sprinkler Not Coordinated</h3>
        <p style={S.p}>Both can discharge simultaneously if the interlock is wrong.</p>

        <p style={S.p}>Do a design review — ensure proper sequencing.</p>

        <h3 style={S.h3}>Mistake 4 — Air Pressure Not Monitored</h3>
        <p style={S.p}>Air leaks gradually drop the pressure — you get a false signal.</p>

        <p style={S.p}>Log the air pressure monthly — detect drift.</p>

        <h3 style={S.h3}>Mistake 5 — Annual Test Skipped</h3>
        <p style={S.p}>Annual testing is avoided because of cost and downtime risk.</p>

        <p style={S.p}>It is mandatory for NBC compliance and Fire NOC renewal. Do not skip it.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Why is a wet pipe sprinkler not used in a Data Center?</h3>
        <p style={S.p}><strong>Answer:</strong> In a wet pipe the pipes are always full of water — accidental fusing of a single head = immediate water on the servers. Accidental water release in the server room = millions in equipment loss. Pre-action double interlock is used — both detection AND head fuse simultaneously — accidental discharge is practically impossible.</p>

        <h3 style={S.h3}>Q2: What happens in a double interlock pre-action system?</h3>
        <p style={S.p}><strong>Answer:</strong> The pipes normally contain compressed air. Two conditions must be met simultaneously: 1) the smoke/fire detection system triggers, 2) the fusible element of a sprinkler head fuses. The valve does not open on only one condition. When both happen simultaneously the pre-action valve opens — water enters the pipes — then it is released from the fused head.</p>

        <h3 style={S.h3}>Q3: Can FM200 and the sprinkler both activate simultaneously?</h3>
        <p style={S.p}><strong>Answer:</strong> This is avoided in the design because FM200 gets diluted if there is water too. Typical design: FM200 activates first, the sprinkler stays suppressed. Only if FM200 fails and the temperature is rising does the sprinkler activate. This cross-system interlock is carefully engineered at the time of commissioning.</p>

        <h3 style={S.h3}>Q4: How is the sprinkler head temperature rating decided?</h3>
        <p style={S.p}><strong>Answer:</strong> Typically select a rating 30°C above the normal ambient temperature. In the server hall ambient is 18-27°C — a red bulb (68°C) is appropriate — enough buffer above ambient, responds correctly to fire temperature. In high temperature areas (near generators, boiler rooms) install higher rated heads.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Sprinkler Types Comparison</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Double interlock everywhere in server hall:</strong> No compromise on this — no single interlock</li>
          <li style={S.li}><strong>FM200-Sprinkler coordination:</strong> Define the sequencing clearly — in the design phase</li>
          <li style={S.li}><strong>Never paint sprinkler heads:</strong> Train people, put up signage, enforce site rules</li>
          <li style={S.li}><strong>Under-floor coverage:</strong> Install heads in the raised floor plenum too</li>
          <li style={S.li}><strong>Monthly air pressure log:</strong> Track the trend — detect slow leaks early</li>
          <li style={S.li}><strong>Annual full inspection:</strong> Physically inspect every head — or a quarterly sample</li>
          <li style={S.li}><strong>BMS integration:</strong> Valve status, air pressure, panel faults — centrally monitor</li>
          <li style={S.li}><strong>Post-incident reset protocol:</strong> Drain, inspect, air recharge, test — documented procedure</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Wet pipe strongly not recommended in Data Center IT spaces — accidental discharge = equipment damage. Pre-action preferred.",

          "Pre-action double interlock is the standard: Detection AND head fuse required simultaneously — only then water release.",
          "Pipes normally dry (compressed air) — water enters only when both conditions happen simultaneously.",
          "FM200 primary, sprinkler backup. Coordination design — one after the other, not simultaneously.",
          "Never paint sprinkler heads — performance degrades — replace painted heads immediately.",
          "Monthly air pressure check, annual full inspection — follow the maintenance schedule strictly.",
          "The sprinkler is mandatory for NBC compliance and the Fire NOC — it cannot be skipped in the design.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>The Fire Protection module is complete. Revisit the whole series:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — the first layer of fire detection — learn this first.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — primary suppression — works before the sprinkler comes in.</li>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — the modern alternative to FM200 — better environmental profile.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — External firefighting system — building-level protection.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
