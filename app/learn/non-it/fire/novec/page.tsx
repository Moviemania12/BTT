import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Novec Fluids in Data Centers — Fire Suppression & Cooling | Behind The Tech",
  description:
    "Novec fluid family kya hai, Data Center mein kaise use hota hai — Novec 1230, Novec 649, immersion cooling aur fire suppression. 3M PFAS phaseout ka impact. Simple Hinglish mein.",
  keywords: ["novec data center", "novec 1230", "novec 649", "3m novec fluids", "immersion cooling novec"],
  openGraph: {
    title: "Novec Fluids in Data Centers — Fire Suppression & Cooling",
    description: "3M Novec — fire suppression se immersion cooling tak, Data Center mein Novec fluids ka complete guide.",
    url: "https://behindthetech.in/learn/non-it/fire/novec",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novec Fluids Explained — Behind The Tech",
    description: "3M Novec fluid family — suppression aur cooling dono, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/novec" },
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
    { label: "Novec kya hai", text: "3M ki engineered fluids ki family hai. Data centers mein do kaam karte hain — fire suppression (Novec 1230) aur immersion cooling (Novec 649). Dono alag products hain, alag applications ke liye." },
    { label: "Novec 1230", text: "Fire suppression agent — Novec 1250 jaisa hi FK-5-1-12 chemical. GWP=1. Kidde aur Fike brand name se bhi jaana jaata hai. Novec 1250 aur Novec 1230 practically same chemical hain." },
    { label: "Novec 649", text: "Immersion cooling fluid. Servers ko directly is fluid mein duba dete hain. Server se heat directly fluid mein jaati hai — bahut zyada efficient cooling. Traditional air cooling se 1000x better heat transfer." },
    { label: "Environmental edge", text: "Dono Novec variants ka GWP bahut low hai — 1 se 9 tak. Atmospheric lifetime days mein. ODP zero. Halon aur FM200 ke compared to much better." },
    { label: "3M PFAS issue", text: "3M ne PFAS chemicals manufacturing phaseout announce kiya. Novec fluids PFAS family mein aate hain. Industry mein alternative agents develop ho rahe hain. Existing installations continue kar sakti hain." },
    { label: "Data center trend", text: "Immersion cooling mein Novec 649 type fluids ka use tezi se badh raha hai — hyperscale aur AI compute ke liye. High density racks (50+ kW) ke liye traditional cooling insufficient ho raha hai." },
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
          Novec 1230 aur Novec 649 — dono clear kar lo. Aage poora article hai.
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
    { feature: "PFAS concern",       n1230: "Yes — 3M se supply uncertain, alternative manufacturers available", n649: "Yes — 3M se supply uncertain", fm200: "No PFAS" },
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
  { q: "Novec 1230 aur Novec 1250 mein kya fark hai?", a: "Practically koi technical fark nahi hai. Dono FK-5-1-12 chemical hain. Novec 1250 aur Novec 1230 — ye 3M ke alag product names hain same base chemical ke liye. Kuch formulation aur purity differences ho sakte hain. Performance, GWP, atmospheric lifetime — sab same. Fire suppression industry mein dono interchangeable terms hain. Specification mein 'FK-5-1-12 per NFPA 2001' likhna best practice hai." },
  { q: "Novec 649 immersion cooling mein servers damage nahi hote kya?", a: "Nahi — Novec 649 electrically non-conductive hai. Servers aur unke components fluid mein submerge karne pe short circuit nahi hota. Fluid specifically this use ke liye engineered hai. Companies like Microsoft (Project Natick), Submer, LiquidStack is technology ka use karti hain. Servers ke liye special modifications hoti hain — fans nahi hote, certain components replace hote hain." },
  { q: "3M phaseout ke baad Novec alternatives kya hain?", a: "Industry actively alternatives develop kar rahi hai. Kuch options: Opteon (Chemours) series clean agents, Vertrel (Chemours) immersion cooling fluids, engineered water-based cooling solutions, CO2-based suppression systems. Existing Novec installations mein certified alternative agents kabhi kabhi backfill ho sakte hain — manufacturer se verify karo. Ye rapidly evolving space hai — 2024-2025 mein kaafi developments aaye hain." },
  { q: "Immersion cooling mein Novec 649 kitna mahanga hai?", a: "Bahut mahanga — typical air-cooled systems se 3-5x zyada upfront cost hoti hai. Fluid itself expensive hai. Special tanks/baths chahiye. Server modifications needed. Lekin TCO (Total Cost of Ownership) mein better — PUE 1.03-1.05 achieve hoti hai vs standard 1.4-1.6. Aur 50+ kW racks ko air se cool karna practically impossible hai — immersion ke liye cost justified ho jaata hai." },
  { q: "Kya Novec 1230 FM200 system mein direct refill kar sakte hain?", a: "Generally nahi — same chemical hai lekin system hydraulics alag hain, nozzles alag hain, design concentrations alag hain. Simple swap se kaam nahi chalta. Certified fire engineer se assessment karwao. Kuch manufacturers compatibility kits offer karte hain — lekin standard recommendation hai ki proper re-engineering karo." },
  { q: "India mein Novec 649 immersion cooling kab tak mainstream hoga?", a: "Abhi niche market hai — limited to hyperscale aur HPC installations. 2024-2025 mein AI infrastructure boom ke saath interest badha hai. Major Indian data center players — Adani, Hiranandani, Nxtra — explore kar rahe hain. 5-7 saal mein high-density deployments mein mainstream ho sakta hai. PFAS regulations clarity aane ke baad direction clearer hoga." },
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
      <ArticleLayout slug="novec" headings={HEADINGS} readingTimeMinutes={16}>

        <p style={S.p}>3M ne ek fluid family banai jo Data Centers ke liye do alag kaam karti hai.</p>

        <p style={S.p}>Pehla kaam — fire bujhaana.</p>

        <p style={S.p}>Doosra kaam — servers ko directly fluid mein duba ke thanda karna.</p>

        <p style={S.p}><strong>Yahi hai Novec family — ek naam, do applications.</strong></p>

        <p style={S.p}>FM200 already padh chuke ho. Novec 1250 bhi samajh aaya.</p>

        <p style={S.p}>Ab Novec ka poora ecosystem samjhte hain — aur industry mein kya change aa raha hai.</p>

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
            Novec fluid family — left: Novec 1230 fire suppression cylinders. Right: Novec 649 immersion cooling tank jisme servers submerged hain.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-novec" style={S.h1}>What Is the Novec Family?</h2>

        <p style={S.p}><strong>Novec = 3M ki engineered fluid family.</strong></p>

        <p style={S.p}>Ye halon replacement ke baad develop ki gayi — cleaner, safer alternatives.</p>

        <p style={S.p}>Data centers mein mainly do Novec products important hain:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>Novec 1230 / Novec 1250:</strong> Fire suppression agent — FK-5-1-12 chemical. Gas phase mein discharge hota hai.</li>
          <li style={S.li}><strong>Novec 649:</strong> Immersion cooling fluid — servers ko directly is fluid mein submerge karte hain.</li>
        </ul>

        <p style={S.p}>Dono alag products hain — alag applications ke liye.</p>

        <p style={S.p}>Common thread: 3M manufacturer, low GWP, excellent environmental profile.</p>

        <DCMapNote components={["Novec 1230 Cylinders", "Novec 649 Tanks", "Suppression System", "Immersion Cooling Baths", "VESDA", "FACP"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Novec Was Developed</h2>

        <p style={S.p}>1994 mein Montreal Protocol ne Halon ban kar diya.</p>

        <p style={S.p}>Halon excellent fire suppressant tha — lekin ozone layer destroy karta tha.</p>

        <p style={S.p}>Industry ko replacement chahiye tha — same effectiveness, zero ODP.</p>

        <p style={S.p}>FM200 (HFC-227ea) aaya — halon replacement. Lekin GWP 3,220 problem tha.</p>

        <p style={S.p}>3M ne Novec develop kiya — <strong>GWP = 1, ODP = 0, effective suppression.</strong></p>

        <WhyThisMatters>
          Data center industry globally ek major sustainability challenge face kar rahi hai. Cooling aur fire suppression dono energy aur chemicals use karti hain. Novec fluids dono problems address karte hain — low-GWP suppression aur ultra-efficient immersion cooling. Isliye Fortune 500 companies aur hyperscalers Novec ko prefer karte hain jab long-term ESG commitments deni hoti hain.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="novec-1230" style={S.h1}>Novec 1230 — Fire Suppression</h2>

        <p style={S.p}>Novec 1230 wahi hai jo humne Novec 1250 article mein padha — FK-5-1-12 chemical.</p>

        <p style={S.p}>Novec 1230 naam Kidde aur Fike ke products mein zyada use hota hai.</p>

        <p style={S.p}>Novec 1250 naam 3M ke direct products mein.</p>

        <p style={S.p}><strong>Technical perspective se — same chemical, same performance.</strong></p>

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
          Novec 1230 ka boiling point 49°C hona ek important property hai. Matlab — room temperature (25°C) pe ye liquid hai. Ye liquid storage allow karta hai — FM200 se zyada dense packing. Discharge hone pe immediately vaporize ho jaata hai — room mein concentrate hota hai aur fire bujhata hai. Boiling point FM200 ka -16°C hai — wo room temperature pe already gas hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="novec-649" style={S.h1}>Novec 649 — Immersion Cooling</h2>

        <p style={S.p}>Ye Novec ka doosra — aur bahut exciting — application hai.</p>

        <p style={S.p}><strong>Concept: Server ko directly fluid mein duba do.</strong></p>

        <p style={S.p}>Sounds crazy? Logic simple hai.</p>

        <p style={S.p}>Air ka heat transfer coefficient bahut low hota hai. Liquid ka bahut high.</p>

        <p style={S.p}>Liquid immersion cooling ki heat transfer capability air cooling se kaafi zyada hoti hai — exact ratio conditions aur system design pe depend karta hai. Ye fundamental advantage hai immersion cooling ka.</p>

        <p style={S.p}><strong>Ye immersion cooling ka basic physics hai.</strong></p>

        <h3 style={S.h3}>Properties of Novec 649</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Servers safely submerge ho sakte hain — short circuit nahi</li>
          <li style={S.li}><strong>Chemically inert:</strong> Metals, plastics, circuit boards ke saath react nahi karta</li>
          <li style={S.li}><strong>GWP = 9:</strong> FM200 se bahut better, Novec 1230 se thoda zyada</li>
          <li style={S.li}><strong>Boiling point = 49°C:</strong> Heat absorb karke boil hota hai — two-phase cooling possible</li>
          <li style={S.li}><strong>Transparent:</strong> Colorless liquid — server components visible rehte hain</li>
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
            Novec 649 immersion cooling — servers puri tarah fluid mein submerged hain. Blue/clear liquid visible hai tanks mein. Ye next-gen Data Center cooling hai.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Novec 1230 — Fire Suppression Application</h3>
        <p style={S.p}>FM200 aur Novec 1250 ki tarah bilkul same application.</p>

        <p style={S.p}>Server hall, UPS room, battery room — zone-wise installation.</p>

        <p style={S.p}>VESDA detect karta hai → FACP signal → solenoid valve → 10 second discharge.</p>

        <p style={S.p}>Novec 1230 FM200 systems ki jagah le raha hai — European facilities mein especially.</p>

        <h3 style={S.h3}>Novec 649 — Immersion Cooling Application</h3>
        <p style={S.p}>Servers special tanks (baths) mein rakhe jaate hain.</p>

        <p style={S.p}>Tanks Novec 649 se filled hote hain.</p>

        <p style={S.p}>Servers ON hote hain — puri tarah fluid mein submerged.</p>

        <p style={S.p}>Server ki heat directly fluid mein transfer hoti hai.</p>

        <p style={S.p}>Fluid heat absorb karke boil hoti hai (49°C pe) — vapor rise karta hai.</p>

        <p style={S.p}>Condenser coil pe vapor condensed hota hai — wapas liquid ban jaata hai.</p>

        <p style={S.p}><strong>Ye two-phase immersion cooling cycle hai.</strong></p>

        <EngineerTip>
          Immersion cooling mein Novec 649 use karte waqt servers ke fans remove kar diye jaate hain — fluid cooling itna efficient hai ki fans ki zaroorat hi nahi. Server ke fans fluid mein unnecessary turbulence create karte hain. Special fanless server configurations ya fan bypass kits use hoti hain. Yahi wajah hai ki immersion cooling systems bahut quiet hote hain — koi fan noise nahi.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="immersion-cooling" style={S.h1}>Immersion Cooling Deep Dive</h2>

        <h3 style={S.h3}>Single-Phase vs Two-Phase</h3>
        <p style={S.p}><strong>Single-phase:</strong> Fluid liquid hi rehti hai — heat absorb karke pump se circulate hoti hai. Simpler system.</p>

        <p style={S.p}><strong>Two-phase:</strong> Fluid liquid se gas mein boil hoti hai server heat se — vapor condenser pe liquid ban jaata hai. More efficient.</p>

        <p style={S.p}>Novec 649 two-phase immersion ke liye ideal hai — boiling point 49°C perfect temperature range mein hai.</p>

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

        <p style={S.p}>Air cooling itni heat handle nahi kar sakti — physically impossible.</p>

        <p style={S.p}><strong>Immersion cooling = only practical solution for 50+ kW racks.</strong></p>

        <InsightCard>
          Microsoft ne Project Natick mein underwater data center test kiya — seawater cooling use kiya. Google ke data centers mein liquid cooling GPU clusters mein standard hai. Meta, Amazon bhi immersion cooling pilot kar rahe hain. India mein Yotta, Adani Data Networks high-density deployments mein immersion cooling evaluate kar rahi hain. Ye trend accelerate ho raha hai — AI boom ke saath high-density rack count badh raha hai.
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

        <p style={S.p}><strong>2022 mein 3M ne announce kiya</strong> ki wo PFAS (per- and polyfluoroalkyl substances) manufacturing 2025 tak band karega.</p>

        <p style={S.p}>Novec fluids PFAS family mein aate hain.</p>

        <p style={S.p}>Iska matlab — 3M ke Novec products ki supply uncertain hai. FK-5-1-12 agent itself banned nahi hua — alternative manufacturers is agent ko produce kar sakte hain. Industry mein alternative fluids bhi develop ho rahe hain.</p>

        <p style={S.p}><strong>Current situation (2024-2025):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Existing stock aur installations continue kar sakti hain</li>
          <li style={S.li}>Alternative manufacturers (Chemours, Solvay) similar products develop kar rahe hain</li>
          <li style={S.li}>Industry standards bodies alternative agents certify kar rahe hain</li>
          <li style={S.li}>New Novec 1230/649 installations ke liye long-term supply uncertainty hai</li>
        </ul>

        <p style={S.p}><strong>Recommendation:</strong> Naya installation specify karte time long-term supply chain discuss karo supplier se.</p>

        <EngineerTip>
          PFAS phaseout se data center industry immediately panic mat karo. Existing Novec systems reliable rahenge — refill supply available hai. Naye builds ke liye alternatives evaluate karo. Inert gas systems (nitrogen, IG-541) fire suppression ke liye zero GWP aur zero PFAS hain — lekin zyada cylinders chahiye aur pressure higher hoti hai. Immersion cooling ke liye Chemours Vertrel XF aur Opteon SF-10 emerging alternatives hain.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages of Novec Fluids</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Ultra-low GWP:</strong> 1 (Novec 1230) to 9 (Novec 649) — minimal climate impact</li>
          <li style={S.li}><strong>Zero ODP:</strong> Ozone layer safe</li>
          <li style={S.li}><strong>Short atmospheric lifetime:</strong> Days, not years</li>
          <li style={S.li}><strong>Electrically non-conductive:</strong> Safe for direct equipment contact</li>
          <li style={S.li}><strong>Immersion cooling efficiency:</strong> Very low overhead losses possible — well-designed immersion systems excellent PUE achieve kar sakte hain, exact value design aur facility conditions pe depend karta hai</li>
          <li style={S.li}><strong>Equipment safe:</strong> No residue, no corrosion</li>
          <li style={S.li}><strong>ESG compliant:</strong> Future regulations se protected (except PFAS concern)</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>3M PFAS phaseout:</strong> Long-term supply uncertainty</li>
          <li style={S.li}><strong>High cost:</strong> Both products expensive vs alternatives</li>
          <li style={S.li}><strong>Limited India availability:</strong> Supply chain nahi hai hर jagah</li>
          <li style={S.li}><strong>Immersion infrastructure:</strong> Special tanks, modified servers — high upfront investment</li>
          <li style={S.li}><strong>PFAS environmental concern:</strong> Despite low GWP, PFAS compounds environmental accumulation concern hain</li>
          <li style={S.li}><strong>Limited field experience:</strong> Especially immersion cooling — fewer engineers trained</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <h3 style={S.h3}>Novec 1230 (Fire Suppression)</h3>
        <p style={S.p}>FM200 aur Novec 1250 ki tarah same maintenance — cylinder weight, room integrity, annual test.</p>

        <p style={S.p}>Quarterly functional tests, annual door fan test, monthly visual inspection.</p>

        <h3 style={S.h3}>Novec 649 (Immersion Cooling)</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fluid level monitoring:</strong> Evaporation hoti hai — top up karo schedule se</li>
          <li style={S.li}><strong>Fluid purity testing:</strong> Quarterly — contamination check karo</li>
          <li style={S.li}><strong>Tank seal inspection:</strong> Fluid leakage check — valuable fluid waste nahi ho</li>
          <li style={S.li}><strong>Condenser coil cleaning:</strong> Fouling reduce karo — heat exchange maintain karo</li>
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

        <p style={S.p}><strong>Example Scenario 1 — Fire Suppression:</strong> (Illustrative) European colocation — FM200 se FK-5-1-12 (Novec 1230) migration. Same pipe network, new cylinders, nozzle replacement, hydraulic recalculation. Full commissioning test. Result: regulatory compliant, same protection level.</p>

        <p style={S.p}><strong>Example Scenario 2 — Immersion Cooling:</strong> (Illustrative) High-density AI training cluster — high kW per rack at which air cooling is impractical. Fluoroketone-based two-phase immersion tanks installed. Result: very low overhead losses, high rack density, low noise.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Novec 1230 aur Novec 1250 mein kya fark hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Practically koi fark nahi — dono FK-5-1-12 chemical hain. Alag brand names hain — 3M ne Novec 1250, Kidde/Fike ne Novec 1230 naam diya. Performance, GWP (=1), atmospheric lifetime (5 days) — identical hain. Specification mein 'FK-5-1-12 per NFPA 2001' likhna best practice hai — specific brand se bind nahi hote.</p>

        <h3 style={S.h3}>Q2: Novec 649 immersion cooling kaise kaam karta hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Servers Novec 649 fluid se bhari tanks mein submerge kiye jaate hain. Server heat directly fluid mein transfer hoti hai. Fluid 49°C pe boil karta hai — vapor rise karta hai, condenser pe condensed hota hai, wapas liquid ban ke fall karta hai. Ye two-phase cooling cycle hai. Electrically non-conductive hai — short circuit nahi hota. Air cooling se 1000x better heat transfer.</p>

        <h3 style={S.h3}>Q3: 3M PFAS phaseout se existing Novec installations pe kya impact hoga?</h3>
        <p style={S.p}><strong>Answer:</strong> Existing installations continue kar sakti hain — refill supply available hai interim mein. Alternative manufacturers (Chemours, Solvay) similar products offer kar rahe hain. New installations ke liye long-term supply chain discuss karo supplier se. Inert gas systems (IG-541, nitrogen) PFAS-free fire suppression alternative hain. Immersion cooling ke liye Vertrel XF aur Opteon SF-10 alternatives hain.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Novec 1230 vs Novec 649 vs FM200</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Novec 1230 for suppression:</strong> New builds mein FM200 replace karo — better regulatory future</li>
          <li style={S.li}><strong>Supplier tie-up:</strong> PFAS phaseout ke baad alternative supplier pehle se identify karo</li>
          <li style={S.li}><strong>Immersion cooling feasibility:</strong> 20+ kW racks ke liye Novec 649 immersion evaluate karo</li>
          <li style={S.li}><strong>Fluid purity maintain karo:</strong> Immersion cooling mein contaminated fluid performance degrade karta hai</li>
          <li style={S.li}><strong>Staff training:</strong> Immersion cooling operations traditional air-cooled se very different hai</li>
          <li style={S.li}><strong>PFAS regulations monitor karo:</strong> India mein regulations aa sakti hain — prepare karo</li>
          <li style={S.li}><strong>OCP standards follow karo:</strong> Open Compute Project immersion cooling guidelines best practices hain</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Novec = 3M ki engineered fluid family. Data centers mein do roles — Novec 1230 (fire suppression) aur Novec 649 (immersion cooling).",
          "Novec 1230 = Novec 1250 = FK-5-1-12. Same chemical, different brand names. GWP=1, FM200 ka perfect replacement.",
          "Novec 649 = immersion cooling fluid. Servers directly submerge karo. Electrically non-conductive. Overhead losses bahut kam hoti hain — actual PUE design pe depend karta hai.",
          "Two-phase immersion cooling: liquid boils at 49°C, vapor condenses, cycle repeats. 1000x better heat transfer than air.",
          "3M PFAS phaseout concern hai — long-term Novec supply uncertain. Alternative agents evaluate karo new builds ke liye.",
          "AI aur HPC ke liye 50+ kW racks common ho rahe hain — immersion cooling single practical solution ban raha hai.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Novec family clear hua. Fire protection ka baaki hissa complete karo:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="novec-1250" variant="inline" /> — Novec 1250 specifically — detailed fire suppression guide.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — FM200 — Novec 1230 se compare karne ke liye zaroori hai.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — Detection system jo suppression ko trigger karta hai.</li>
          <li style={S.li}><TopicLink slug="hydrant" variant="inline" /> — External firefighting system — last line of defense.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
