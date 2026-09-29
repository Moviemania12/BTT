import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Fire Hydrant System in Data Centers | Behind The Tech",
  description:
    "What is a fire hydrant system, how does it work in a Data Center — pump room, jockey pump, diesel pump, wet riser, dry riser, testing and maintenance. In simple English.",
  keywords: ["fire hydrant data center", "hydrant system", "jockey pump", "fire pump room", "wet riser dry riser"],
  openGraph: {
    title: "Fire Hydrant System in Data Centers",
    description: "The external firefighting backbone of the Data Center — how the hydrant system works, from the pump room to the hose cabinet.",
    url: "https://behindthetech.in/learn/non-it/fire/hydrant",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Hydrant System Explained — Behind The Tech",
    description: "Fire hydrant system — Data Center firefighting infrastructure, in simple language.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/fire/hydrant",
    languages: {
      en: "https://behindthetech.in/learn/non-it/fire/hydrant",
      hi: "https://behindthetech.in/hi/learn/non-it/fire/hydrant",
      "x-default": "https://behindthetech.in/learn/non-it/fire/hydrant",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-hydrant",      text: "What Is a Fire Hydrant System?",         level: 2 },
  { id: "why-needed",           text: "Why Is It Needed?",                       level: 2 },
  { id: "working-principle",    text: "Working Principle",                       level: 2 },
  { id: "main-components",      text: "Main Components",                         level: 2 },
  { id: "pump-room",            text: "Pump Room — Heart of the System",         level: 2 },
  { id: "how-it-works-in-dc",   text: "How Hydrant Works in a Data Center",      level: 2 },
  { id: "wet-vs-dry-riser",     text: "Wet Riser vs Dry Riser",                 level: 2 },
  { id: "types",                text: "Types of Hydrant Points",                 level: 2 },
  { id: "installation",         text: "Installation",                            level: 2 },
  { id: "advantages",           text: "Advantages",                              level: 2 },
  { id: "disadvantages",        text: "Disadvantages",                           level: 2 },
  { id: "maintenance",          text: "Maintenance",                             level: 2 },
  { id: "testing",              text: "Testing",                                 level: 2 },
  { id: "standards",            text: "Standards",                               level: 2 },
  { id: "real-example",         text: "Real Data Center Example",                level: 2 },
  { id: "common-mistakes",      text: "Common Mistakes",                         level: 2 },
  { id: "interview-questions",  text: "Interview Questions",                     level: 2 },
  { id: "comparison",           text: "Hydrant vs Sprinkler",                   level: 2 },
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
    { label: "In one line", text: "A fire hydrant system is a high-pressure water supply network used for firefighting inside and outside the data center — mainly for the fire brigade." },
    { label: "Why it differs from FM200", text: "FM200 and Novec extinguish the server room fire — automatically, without water. The hydrant system comes into play after that — when the fire becomes big or reaches the structure — that is when the fire brigade uses the hydrant." },
    { label: "Why 3 pumps", text: "Jockey pump: maintains pressure. Electric main pump: supplies the actual firefighting water. Diesel pump: backup for electric failure. Together the three ensure that water pressure is available under any condition." },
    { label: "Wet vs Dry Riser", text: "Wet riser: pipes are always filled with water. In high-rise buildings. Dry riser: pipes are empty — the fire brigade pumps its own water. In low-rise buildings. In data centers both are possible depending on building height." },
    { label: "Where it is installed", text: "Pump room underground or on the ground floor. Pipes networked through the building. Hydrant points on every floor or outside — typically at 45m distance. Hose cabinets in every corridor. Fire brigade connection — clearly marked outside the building." },
    { label: "Last line of defense", text: "The hydrant system is the last resort — FM200 → sprinkler → hydrant. It is a tool in the hands of the fire brigade. Its job is to protect the building structure and surroundings — by then the servers may already be damaged." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#1d4ed8,#1d4ed8)" }} />
      <div style={{ background: "rgba(29,78,216,0.03)", border: "1px solid rgba(29,78,216,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#1d4ed8", fontWeight: 600, marginBottom: 16 }}>🚒 QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#1d4ed8", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(29,78,216,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          Hydrant = the fire brigade's tool. FM200 saves the servers. The hydrant saves the building. Both are important.
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
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(29,78,216,0.05)", border: "1px solid rgba(29,78,216,0.18)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(29,78,216,0.05),rgba(37,99,235,0.03))", border: "1px solid rgba(29,78,216,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#1d4ed8,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#1d4ed8", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(29,78,216,0.12)", border: "1px solid rgba(29,78,216,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div style={{ borderRadius: 10, background: "rgba(29,78,216,0.02)", border: "1px solid rgba(29,78,216,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" as const }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#1d4ed8", margin: "0 4px", opacity: 0.7 }}>→</span>}
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
    { feature: "Purpose",           hydrant: "External firefighting + fire brigade",   sprinkler: "Automatic suppression inside building" },
    { feature: "Operated by",       hydrant: "Fire brigade / trained staff",            sprinkler: "Automatic — heat detection" },
    { feature: "Water volume",      hydrant: "Very high — unlimited supply",            sprinkler: "Moderate — per head flow" },
    { feature: "Activation",        hydrant: "Manual — open the valve",               sprinkler: "Automatic — heat fuses sprinkler head" },
    { feature: "Area coverage",     hydrant: "Targeted — direct the hose",            sprinkler: "Zone coverage — all heads in zone" },
    { feature: "Used in DC server hall", hydrant: "No — water damage risk",           sprinkler: "Pre-action only — special design" },
    { feature: "Pump required",     hydrant: "Yes — jockey + electric + diesel",       sprinkler: "Yes — same pump room" },
    { feature: "Mandatory",         hydrant: "Yes — NBC requirement",                  sprinkler: "Yes — NBC requirement" },
    { feature: "FM200 complement",  hydrant: "Last resort after FM200",                sprinkler: "Backup after FM200" },
    { feature: "Water source",      hydrant: "Underground tank + public supply",        sprinkler: "Same underground tank" },
  ];
  return (
    <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "rgba(29,78,216,0.06)" }}>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(29,78,216,0.12)" }}>Feature</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1d4ed8", fontWeight: 600, border: "1px solid rgba(29,78,216,0.12)" }}>Hydrant System</th>
            <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(29,78,216,0.12)" }}>Sprinkler System</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(29,78,216,0.02)" }}>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(29,78,216,0.08)", fontWeight: 500 }}>{row.feature}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(29,78,216,0.08)" }}>{row.hydrant}</td>
              <td style={{ padding: "9px 14px", color: "#1f2937", border: "1px solid rgba(29,78,216,0.08)" }}>{row.sprinkler}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FAQS = [
  { q: "Why is a jockey pump installed — what is it needed for?", a: "The hydrant pipe network always stays filled with water. This pressure has to be maintained. Any small leakage or valve movement causes a pressure drop. The jockey pump (small 2-5 kW pump) continuously monitors pressure and compensates for small drops. If the pressure drops a lot, the main electric pump starts automatically. The jockey pump is the main pump's battery saver." },
  { q: "Why is a diesel pump installed — isn't the electric pump enough?", a: "During a fire the power supply often fails — the fire itself damages electrical equipment, or power is switched off during firefighting. The electric pump depends on power. The diesel pump is completely independent — it has its own diesel tank. That is why the diesel pump is mandatory as backup in NBC and fire standards. The 'fail-safe' design principle." },
  { q: "What is the practical difference between a wet riser and a dry riser?", a: "Wet riser: pipes are always full of water — pressure is ready. The fire brigade just connects the hose and gets water. For multi-story buildings. Dry riser: pipes are empty — the fire brigade injects water with its pump truck. Pipes can freeze in cold climates if they are pre-filled — dry is safer. In India a wet riser is typically installed above 15m height." },
  { q: "How big should the underground water tank be?", a: "The calculation is done according to NBC and fire standards. Typically: building size × occupancy × fire flow requirement × minimum 2 hours duration. For a typical 5-storey data center — 200,000 to 500,000 liters. Get the tank size calculated by a certified fire consultant — inadequate tank = the fire brigade runs out of water mid-firefighting." },
  { q: "What happens if a hydrant valve is opened by mistake?", a: "If it is a wet riser — water will immediately come onto the floor. The jockey pump will detect the pressure drop and an alarm will trigger. If the main pump starts automatically — a lot of water will come out. That is why hydrant valve cabinets stay locked. Protect against unauthorized access. Do regular valve inspection — a partially open condition is dangerous." },
  { q: "The fire brigade says hydrant pressure is not enough — what should be done?", a: "First confirm the jockey pump and main pump are running. Check the pressure gauge — what is the design pressure (typically 3.5-7 bar). If pressure is low: start the main pump manually, start the diesel pump, tell the fire brigade the alternate supply point. Post-incident — test the pump output, identify the reason for the pressure loss — pipe leak or pump issue." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(29,78,216,0.08)" }}>
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

export default function HydrantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="hydrant" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/fire/hydrant">

        <p style={S.p}>At 3 AM the fire brigade is standing outside the data center.</p>

        <p style={S.p}>FM200 has already discharged — the server room fire is under control.</p>

        <p style={S.p}>But the fire is spreading in the adjacent electrical room — there was no FM200 there.</p>

        <p style={S.p}>The fire brigade hose connected to the outside hydrant point — water came.</p>

        <p style={S.p}><strong>This is the moment when the hydrant system does its job.</strong></p>

        <p style={S.p}>FM200 saves the server room. The hydrant saves the building.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/hydrant/hydrant-network-datacenter.png"
              alt="Fire hydrant network outside a data center with pump room visible and fire brigade connection points"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            The Data Center fire hydrant network — outside hydrant points, fire brigade connection and pump room visible. This is building-level fire protection infrastructure.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-hydrant" style={S.h1}>What Is a Fire Hydrant System?</h2>

        <p style={S.p}><strong>A fire hydrant system is a high-pressure water distribution network.</strong></p>

        <p style={S.p}>It supplies high-pressure water to fire points inside and outside the building.</p>

        <p style={S.p}>Both the fire brigade and trained on-site staff use it.</p>

        <p style={S.p}>It is not automatic — manual operation is required.</p>

        <p style={S.p}><strong>The fundamental difference from FM200: FM200 is automatic. The hydrant is manual.</strong></p>

        <p style={S.p}>The hydrant is "infrastructure" — it makes water available when and where you want it.</p>

        <DCMapNote components={["Pump Room", "Underground Tank", "Hydrant Points", "Hose Reels", "Fire Brigade Connection", "Wet/Dry Riser"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is It Needed?</h2>

        <p style={S.p}>FM200 is very effective — but only in designated protected zones.</p>

        <p style={S.p}>A data center also has areas like these:</p>
        <ul style={S.ul}>
          <li style={S.li}>Loading dock, parking, lobby — there is no FM200 here</li>
          <li style={S.li}>Diesel generator yard — outdoor area</li>
          <li style={S.li}>Chiller plant room — large open area</li>
          <li style={S.li}>Cable management areas — FM200 impractical</li>
          <li style={S.li}>Structural fires — FM200 cannot handle a fire in walls, ceiling, floor</li>
        </ul>

        <p style={S.p}><strong>The hydrant system is for all these areas.</strong></p>

        <WhyThisMatters>
          For a Data Center fire NOC (No Objection Certificate), NBC (National Building Code) compliance is mandatory. NBC explicitly requires a hydrant system in every commercial building above a certain height or area. Without a proper hydrant system the data center does not get its fire NOC — and operating without an NOC is illegal. This is a compliance issue, before it is a safety issue.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Simple concept — complex execution.</p>

        <p style={S.p}><strong>Water is stored in an underground tank.</strong></p>

        <p style={S.p}>The pump room lifts water from this tank and pushes it into the building-wide pipe network.</p>

        <p style={S.p}>At the ends of the network there are hydrant points — valves and hose connections.</p>

        <p style={S.p}>In a fire, open the valve — pressurized water comes out — target it with the hose.</p>

        <FlowDiagram
          caption="Hydrant system water flow path"
          steps={[
            { icon: "🏊", label: "Underground Tank", sublabel: "Water storage" },
            { icon: "⚙️", label: "Pump Room", sublabel: "3 pumps" },
            { icon: "🔧", label: "Riser Pipes", sublabel: "Vertical distribution" },
            { icon: "🚰", label: "Hydrant Points", sublabel: "Each floor" },
            { icon: "🚒", label: "Fire Fighting", sublabel: "Hose or FBV" },
          ]}
        />

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Underground Water Tank</h3>
        <p style={S.p}>An RCC tank constructed under or adjacent to the building.</p>

        <p style={S.p}>Exclusively for firefighting — separate from domestic water.</p>

        <p style={S.p}>Minimum storage as per the applicable code (NBC, local fire authority requirements) — the duration depends on occupancy type, risk category and the fire consultant's recommendations.</p>

        <p style={S.p}>Volume is determined by applicable code requirements and hydraulic calculations — it depends on facility size, fire risk category and local authority requirements.</p>

        <h3 style={S.h3}>2. Jockey Pump (Pressure Maintenance Pump)</h3>
        <p style={S.p}>Small pump — the size varies according to the project and design.</p>

        <p style={S.p}>Always maintains the network pressure — typically 6-7 bar.</p>

        <p style={S.p}>Compensates for small leaks and pressure drops.</p>

        <p style={S.p}>If the pressure drops a lot (fire or hose open), the main pump starts.</p>

        <h3 style={S.h3}>3. Electric Main Pump</h3>
        <p style={S.p}>Primary firefighting pump — capacity is determined by hydraulic calculations and applicable codes.</p>

        <p style={S.p}>It starts automatically when the jockey pump cannot maintain pressure.</p>

        <p style={S.p}>Delivers the required flow rate and pressure — actual values depend on hydraulic design, applicable standards (NBC, IS 3844, NFPA 14) and AHJ requirements.</p>

        <h3 style={S.h3}>4. Diesel Pump (Standby Emergency Pump)</h3>
        <p style={S.p}>Backup for the electric pump — completely independent.</p>

        <p style={S.p}>It has its own diesel tank — fuel capacity is specified per applicable standards and project requirements.</p>

        <p style={S.p}>It starts automatically on electric failure — actual start time per manufacturer specification and applicable standard (typically within a specified time, confirm in the project design).</p>

        <p style={S.p}>Same capacity as the electric pump — parallel or sequential operation possible.</p>

        <h3 style={S.h3}>5. Pipe Network (Riser System)</h3>
        <p style={S.p}>Galvanized iron (GI) or ductile iron pipes.</p>

        <p style={S.p}>Vertical pipes (risers) connected to horizontal branch pipes on every floor.</p>

        <p style={S.p}>Design: loop system preferred — if one side is blocked, water comes from the other side.</p>

        <h3 style={S.h3}>6. Hydrant Points / Landing Valves</h3>
        <p style={S.p}>On each floor — typically at staircase landings.</p>

        <p style={S.p}>Instantaneous coupling (Storz type) — the fire brigade connects the hose directly.</p>

        <p style={S.p}>Red colored valve + pressure gauge + blank cap (dust protection).</p>

        <h3 style={S.h3}>7. Hose Reel Cabinets</h3>
        <p style={S.p}>Cabinets installed in corridors — for trained staff.</p>

        <p style={S.p}>25mm hose reel — relatively low pressure — first-aid firefighting.</p>

        <p style={S.p}>Not for the fire brigade — this is the on-site staff's tool for early-stage fires.</p>

        <h3 style={S.h3}>8. Fire Brigade Inlet (Siamese Connection)</h3>
        <p style={S.p}>Clearly marked outside the building — "FIRE BRIGADE INLET".</p>

        <p style={S.p}>The fire brigade can inject water from its pump truck through this point.</p>

        <p style={S.p}>If the building's internal pumps fail — this is the backup inlet.</p>

        <hr style={S.divider} />

        <h2 id="pump-room" style={S.h1}>Pump Room — Heart of the System</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/hydrant/hydrant-pump-room.png"
              alt="Fire pump room in a data center showing jockey pump, electric main pump and diesel backup pump with control panel"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Fire pump room — left: jockey pump, center: electric main pump, right: diesel pump. Everything is monitored from the control panel.
          </figcaption>
        </figure>

        <p style={S.p}>The pump room is a dedicated room — on the ground floor or in the basement.</p>

        <p style={S.p}><strong>Requirements:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Direct access from outside — fire brigade directly ja sake</li>
          <li style={S.li}>Separate from other utilities — dedicated fire-rated room</li>
          <li style={S.li}>Adequate ventilation — especially for the diesel pump</li>
          <li style={S.li}>Floor drain — water comes out during testing</li>
          <li style={S.li}>Dedicated electrical supply — with manual override</li>
          <li style={S.li}>Clearly labeled — "FIRE PUMP ROOM" visible marking</li>
        </ul>

        <InsightCard>
          The sequence of the three pumps in the pump room is important. The jockey pump always runs first — pressure maintenance. If the pressure drops 0.5 bar, the electric pump auto-starts. If the electric pump does not start or the pressure still stays low, the diesel pump auto-starts within 10 seconds. This cascade sequence ensures the system continues on any single failure. Never disable the diesel pump's auto-start logic.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Hydrant Works in a Data Center</h2>

        <p style={S.p}>Typical hydrant layout of a data center:</p>

        <h3 style={S.h3}>External Hydrant Points</h3>
        <p style={S.p}>On the building periphery — spacing is determined by the applicable code (NBC, IS 3844) and hydraulic coverage.</p>

        <p style={S.p}>The fire brigade truck can come straight here and connect.</p>

        <p style={S.p}>Clearly accessible — there must be no parking or obstruction around the hydrant.</p>

        <h3 style={S.h3}>Internal Hydrant Points (Landing Valves)</h3>
        <p style={S.p}>At the staircase of every floor — typically 2 per floor for larger buildings.</p>

        <p style={S.p}>The fire brigade reaches there and connects the hose.</p>

        <p style={S.p}>30m hose — typically available at every landing.</p>

        <h3 style={S.h3}>Hose Reel Points</h3>
        <p style={S.p}>One hose reel cabinet every 30m — in the corridor.</p>

        <p style={S.p}>To be used by on-site trained staff — for early-stage fires.</p>

        <p style={S.p}>The fire brigade does not use hose reels — they prefer landing valves.</p>

        <EngineerTip>
          In a Data Center, do not place server racks near a hydrant point. If water comes from a hose reel or landing valve — the surrounding area gets wet. Keep a buffer zone. Similarly, do not let vehicles park around external hydrant points — fire brigade access gets blocked. This is common sense, but in the field it is often violated.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="wet-vs-dry-riser" style={S.h1}>Wet Riser vs Dry Riser</h2>

        <h3 style={S.h3}>Wet Riser</h3>
        <p style={S.p}>The pipe network always stays filled with water and pressurized.</p>

        <p style={S.p}>Water is available immediately in a fire — just open the valve.</p>

        <p style={S.p}>For multi-storey buildings (typically above 15m height).</p>

        <p style={S.p}>Most data centers in India have a wet riser system.</p>

        <h3 style={S.h3}>Dry Riser</h3>
        <p style={S.p}>The pipe network stays empty — there is normally no water.</p>

        <p style={S.p}>The fire brigade injects water with its pump truck from the outside inlet.</p>

        <p style={S.p}>Preferred in low-rise buildings or freezing climate areas.</p>

        <p style={S.p}>Less common for data centers in India — the wet riser is more prevalent.</p>

        <WarningCard>
          In a wet riser the pressure must always be maintained. If the jockey pump is starting frequently — there is a leak in the system. Do not ignore it. Identify the leak location and fix it. Constant jockey pump cycling = pump overheating = reduced pump life. And if the main pump auto-start fails, that is when you will find out about the leak — by then it will be far too late.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Hydrant Points</h2>

        <h3 style={S.h3}>1. External Yard Hydrant</h3>
        <p style={S.p}>Pillar type — on the ground outside the building.</p>

        <p style={S.p}>The fire brigade truck connects directly.</p>

        <p style={S.p}>Typically 63mm outlet — high flow rate.</p>

        <h3 style={S.h3}>2. Internal Landing Valve</h3>
        <p style={S.p}>Wall-mounted — at the staircase.</p>

        <p style={S.p}>The fire brigade connects the hose — floor-wise firefighting.</p>

        <p style={S.p}>63mm outlet, Instantaneous coupling.</p>

        <h3 style={S.h3}>3. Hose Reel</h3>
        <p style={S.p}>25mm hose — low flow rate.</p>

        <p style={S.p}>For trained staff — early-stage, small fires.</p>

        <p style={S.p}>Coiled in the cabinet — pull it out and use it.</p>

        <h3 style={S.h3}>4. Siamese (Fire Brigade Inlet) Connection</h3>
        <p style={S.p}>Strictly speaking this is not a hydrant — but it is part of the same network.</p>

        <p style={S.p}>Outside the building — the fire brigade injects its water through this.</p>

        <p style={S.p}>2 inlets, 1 outlet design — more flow possible with two hoses.</p>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation</h2>

        <h3 style={S.h3}>Tank Location</h3>
        <p style={S.p}>Underground preferred — gravity assist and thermal insulation.</p>

        <p style={S.p}>Accessible for maintenance — manhole covers.</p>

        <p style={S.p}>Auto-fill connection from the municipal water supply.</p>

        <h3 style={S.h3}>Pipe Network</h3>
        <p style={S.p}>GI (Galvanized Iron) pipes — internal. Ductile iron — external/underground.</p>

        <p style={S.p}>Ring main system (loop) generally preferred — a redundant path is available if one section is isolated. The actual design layout depends on hydraulic calculations and site conditions.</p>

        <p style={S.p}>Pipe sizing: from hydraulic calculation — the pressure loss must be within an acceptable range.</p>

        <h3 style={S.h3}>Fire NOC Requirements</h3>
        <p style={S.p}>In India, for the fire NOC — the hydrant system has to be demonstrated to the fire department.</p>

        <p style={S.p}>Pump running, pressure demonstration, flow test — everything is verified.</p>

        <p style={S.p}>There is re-inspection at the annual renewal too.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Unlimited water supply:</strong> The tank keeps getting refilled — prolonged firefighting possible</li>
          <li style={S.li}><strong>High flow rate:</strong> Adequate water for large fires — more volume possible than FM200</li>
          <li style={S.li}><strong>Fire brigade ready:</strong> Infrastructure designed for professional firefighters</li>
          <li style={S.li}><strong>Redundant pumps:</strong> Jockey + Electric + Diesel — triple redundancy</li>
          <li style={S.li}><strong>NBC compliant:</strong> Legal requirement — you get the fire NOC</li>
          <li style={S.li}><strong>Cost effective:</strong> Water is cheap — repeat use without refill cost</li>
          <li style={S.li}><strong>Structural protection:</strong> Cools the building structure — FM200 only protects equipment</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Water damage:</strong> Cannot be used in the server room — equipment gets destroyed</li>
          <li style={S.li}><strong>Manual operation:</strong> A trained person is needed — it is not automatic</li>
          <li style={S.li}><strong>High infrastructure cost:</strong> Pump room, large tank, pipe network — significant capex</li>
          <li style={S.li}><strong>Maintenance intensive:</strong> Pumps, pipes, valves, tank — everything has to be maintained</li>
          <li style={S.li}><strong>Space requirement:</strong> Underground tank + pump room — significant footprint</li>
          <li style={S.li}><strong>Tank maintenance:</strong> Sludge accumulation, biological growth — regular cleaning essential</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Weekly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Jockey pump running — pressure maintained</li>
          <li style={S.li}>Pump room visual inspection</li>
          <li style={S.li}>Log the pressure gauge reading</li>
          <li style={S.li}>Check the diesel level — fuel tank</li>
          <li style={S.li}>No unusual noise or vibration</li>
        </ul>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Test the jockey pump auto-start — simulate a pressure drop</li>
          <li style={S.li}>Main electric pump test run — 10 minutes minimum</li>
          <li style={S.li}>Diesel pump test run — load under</li>
          <li style={S.li}>All hydrant points visual inspect</li>
          <li style={S.li}>Hose reel cabinets — hose condition check</li>
          <li style={S.li}>Water tank level check</li>
        </ul>

        <p style={S.p}><strong>Annual (by certified fire contractor):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Full system flow test — actual flow rate verify</li>
          <li style={S.li}>Pump performance test — compare with design specs</li>
          <li style={S.li}>Operate all valves — NRV, gate valves</li>
          <li style={S.li}>Water tank cleaning — remove sludge</li>
          <li style={S.li}>Pipe pressure test — leak check</li>
          <li style={S.li}>Fire NOC renewal documentation</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <h3 style={S.h3}>Monthly Pump Test</h3>
        <p style={S.p}>Jockey pump: drop the pressure and verify auto-start.</p>

        <p style={S.p}>Electric pump: manual start, 10 min run, note the pressure.</p>

        <p style={S.p}>Diesel pump: manual start, check fuel consumption, verify auto-changeover.</p>

        <h3 style={S.h3}>Annual Flow Test</h3>
        <p style={S.p}>Deploy an actual hose — water is let out from the landing valve.</p>

        <p style={S.p}>Measure the flow rate — compare with the design value.</p>

        <p style={S.p}>If the flow is low — pump issue, pipe blockage, or tank level issue.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NBC 2016 Part 4:</strong> Fire and Life Safety — primary Indian reference</li>
          <li style={S.li}><strong>IS 3844:</strong> Code of practice for installation of internal fire hydrants</li>
          <li style={S.li}><strong>IS 908:</strong> Fire hydrant specifications</li>
          <li style={S.li}><strong>IS 884:</strong> First-aid hose reel for fire fighting</li>
          <li style={S.li}><strong>NFPA 14:</strong> Standard for installation of standpipe and hose systems</li>
          <li style={S.li}><strong>Local Fire Department NOC:</strong> There are state-specific requirements too</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> This is an illustrative example scenario — it is not a reference to any documented real facility.</p>

        <p style={S.p}><strong>Scenario:</strong> Multi-storey large data center facility.</p>

        <p style={S.p}><strong>Hydrant design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Underground tank: Code-calculated capacity — dedicated fire water</li>
          <li style={S.li}>Pump room: Basement level — jockey pump + electric main pump + diesel standby pump</li>
          <li style={S.li}>External hydrant points: As per code spacing requirements</li>
          <li style={S.li}>Internal landing valves: As per NBC and local fire authority requirements</li>
          <li style={S.li}>Hose reels: As per applicable code (coverage per reel per IS 884/NBC)</li>
          <li style={S.li}>Siamese connections: On the building periphery — FBV access all sides</li>
        </ul>

        <p style={S.p}><strong>Annual test result:</strong> Design flow and pressure achieved — Fire NOC renewed.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Jockey Pump Continuous Cycling Ignored</h3>
        <p style={S.p}>The jockey pump is starting again and again — people assume it "seems normal".</p>

        <p style={S.p}>This is a sign of a leak — investigate and fix it.</p>

        <h3 style={S.h3}>Mistake 2 — Diesel Fuel Not Maintained</h3>
        <p style={S.p}>The diesel tank is not checked — the pump does not start at the time of a fire.</p>

        <p style={S.p}>Check the diesel level weekly. Always maintain a minimum of 75%.</p>

        <h3 style={S.h3}>Mistake 3 — Hydrant Points Blocked</h3>
        <p style={S.p}>Material storage, parking, equipment — hydrant access gets blocked.</p>

        <p style={S.p}>Monthly visual inspection — is the access clear?</p>

        <h3 style={S.h3}>Mistake 4 — Hose Reel Hose Damaged</h3>
        <p style={S.p}>The hose reel hose cracks — old age, UV damage.</p>

        <p style={S.p}>Unroll and inspect it monthly — replace if damaged.</p>

        <h3 style={S.h3}>Mistake 5 — Annual Flow Test Skipped</h3>
        <p style={S.p}>The annual test feels costly — the operations team keeps postponing it.</p>

        <p style={S.p}>Fire NOC renewal is mandatory — the test is mandatory too. Do not skip it.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Why does a hydrant system have 3 pumps?</h3>
        <p style={S.p}><strong>Answer:</strong> Jockey pump: does pressure maintenance — compensates for small drops. Electric main pump: provides the actual firefighting flow — auto-starts when the pressure drops enough. Diesel pump: backup — auto-starts on electric failure or a power cut. Together the three create triple redundancy — the system continues on any single failure.</p>

        <h3 style={S.h3}>Q2: What is the difference between a wet riser and a dry riser?</h3>
        <p style={S.p}><strong>Answer:</strong> Wet riser: pipes always filled with water and pressurized — in a fire just open the valve. For multi-storey buildings. Dry riser: pipes empty — the fire brigade injects water at the outside inlet with its pump truck. In low-rise or cold climate areas. In India, data centers typically have a wet riser.</p>

        <h3 style={S.h3}>Q3: What is the role of the hydrant and FM200 in a Data Center?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 is automated — it detects and extinguishes an enclosed server hall fire immediately, without water, equipment safe. The hydrant is manual — for the fire brigade, for large fires, for structural fires, for external and non-FM200 areas. Both are complementary — FM200 saves the equipment, the hydrant saves the building.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Hydrant vs Sprinkler</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Triple pump configuration:</strong> Jockey + Electric + Diesel — never compromise on diesel backup</li>
          <li style={S.li}><strong>Tank sizing generously:</strong> Design 25% extra over the NBC minimum — future expansion buffer</li>
          <li style={S.li}><strong>Ring main design:</strong> Loop system — a single point failure will not affect the whole system</li>
          <li style={S.li}><strong>BMS integration:</strong> Pump status, pressure, alarms — monitor centrally</li>
          <li style={S.li}><strong>Staff training:</strong> The operations team must know how to use the hose reel</li>
          <li style={S.li}><strong>Fire brigade relationship:</strong> Invite the local fire brigade to the annual mock drill</li>
          <li style={S.li}><strong>Maintain hydrant access:</strong> External points always clear and accessible</li>
          <li style={S.li}><strong>Log monthly pump tests:</strong> Track the performance trend — catch deterioration early</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Hydrant system = high-pressure water distribution network for firefighting. Manual operation, the fire brigade's primary tool.",
          "3 pumps mandatory: Jockey (pressure maintenance) + Electric (primary) + Diesel (backup). Triple redundancy.",
          "Wet riser: pipes always pressurized. Dry riser: pipes empty, the fire brigade injects. Wet riser is common in India.",
          "FM200 saves the server room. The hydrant saves the building and surroundings. Both are complementary systems.",
          "NBC compliance is mandatory — without a proper hydrant system you do not get the fire NOC.",
          "Weekly diesel check, monthly pump tests, annual flow test — follow this maintenance schedule strictly.",
          "Frequent jockey pump cycling = a sign of a leak. Do not ignore it — investigate and fix.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>The hydrant system is complete. The last piece of fire protection:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — automatic water-based suppression — the automatic complement to the hydrant.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — early detection — the line before the hydrant is activated.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — clean agent suppression — works before the hydrant comes in.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
