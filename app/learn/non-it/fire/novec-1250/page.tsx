import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Novec 1250 Fire Suppression in Data Centers | Behind The Tech",
  description:
    "Novec 1250 kya hai, FM200 se kyun better hai, Data Center mein kaise use hota hai — 3M FK-5-1-12, clean agent, environmental impact aur practical guide. Simple Hinglish mein.",
  keywords: ["novec 1250 data center", "3m novec 1250", "fk-5-1-12", "clean agent suppression", "novec vs fm200"],
  openGraph: {
    title: "Novec 1250 Fire Suppression in Data Centers",
    description: "FM200 ka green alternative — Novec 1250 kya hai aur Data Center mein kyun use karte hain.",
    url: "https://behindthetech.in/learn/non-it/fire/novec-1250",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novec 1250 Explained — Behind The Tech",
    description: "Novec 1250 — FM200 ka next-gen replacement, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/novec-1250" },
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
    { label: "Ek line mein", text: "FK-5-1-12 ek next-generation clean agent hai — FM200 se better environmental profile, aur GWP sirf 1 hai jab FM200 ka GWP 3,220 hai." },
    { label: "Chemical naam", text: "Chemical naam FK-5-1-12 (Dodecafluoro-2-methylpentan-3-one). 3M ise Novec 1230 Fire Protection Fluid ke naam se market karta tha. Liquid form mein stored rehta hai — gaseous FM200 se alag." },
    { label: "Kaise bujhata hai", text: "FM200 ki tarah heat absorption — lekin zyada effective. Liquid se gas mein convert hote waqt bahut zyada heat absorb karta hai. Fire triangle ka heat element remove ho jaata hai." },
    { label: "Environmental edge", text: "Atmospheric lifetime sirf 5 days — FM200 31-39 days. GWP = 1 — practically zero climate impact. Ozone depletion potential = 0." },
    { label: "FM200 se alag kahan", text: "Novec 1250 liquid form mein store hota hai — zyada agent ek chhote cylinder mein samata hai. Design concentration 4.2-6% — FM200 ke 7-8% se kam chahiye." },
    { label: "Kahan use hota hai", text: "New data center builds mein prefer kiya jaata hai jahan GWP compliance ya ESG goals important hain. Europe mein F-Gas regulations high-GWP agents pe restrictions la rahi hain — FK-5-1-12 compliant agent hai. India mein abhi applicable regulations evolve ho rahi hain — local AHJ aur project requirements check karo." },
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
          Bas itna samajh gaye to Novec 1250 ka concept clear hai. FM200 padh liya ho to ye article aur zyada easy lagega.
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
  { q: "Novec 1230 aur industry mein 'Novec 1250' naam kya hai?", a: "3M ka registered product naam 'Novec 1230 Fire Protection Fluid' hai — chemical naam FK-5-1-12. 'Novec 1250' officially registered 3M product naam nahi hai, lekin industry mein informally isi agent ke liye use hota hai. Technically same chemical compound. Specification mein hamesha FK-5-1-12 ya Novec 1230 likhna technically correct hai." },
  { q: "Novec 1250 FM200 se mahanga kyun hai?", a: "Manufacturing process more complex hai. Less agents produced globally. 3M ke paas IP protection hai. Lekin long-term mein Novec 1250 better hai — regulatory risk nahi, discharge cost similar, aur environmental liability nahi. Lifecycle cost consider karo upfront cost se zyada." },
  { q: "Kya FM200 ko Novec 1250 se retrofit kar sakte hain?", a: "Kuch cases mein existing FM200 cylinder bank ko Novec 1250 se replace kiya ja sakta hai — agar pipe network aur nozzles compatible hon. Lekin typically re-engineering zaroori hoti hai kyunki design concentrations alag hain aur pipe hydraulics recalculate karni padti hain. Certified fire engineer se assess karwao." },
  { q: "Novec 1250 humans ke liye safe hai?", a: "Haan — design concentration (4.2-5.9%) pe humans ke liye safe hai. NOAEL (No Observable Adverse Effect Level) 10% hai — design concentration se kaafi upar. Oxygen level significantly affect nahi hota. FM200 ki tarah — discharge ke baad room ventilate karo aur air quality clear hone ke baad enter karo." },
  { q: "3M ne PFAS phaseout announce kiya — FK-5-1-12 (Novec 1230) pe kya impact hoga?", a: "3M ne 2022 mein PFAS manufacturing phaseout announce kiya. Novec 1230 PFAS-based fluid hai. 3M manufacturing band karne ke baad bhi, FK-5-1-12 chemical agent doosre manufacturers produce kar sakte hain. Industry transition ho rahi hai — alternative suppliers aur next-gen agents available hain. Agar install kar rahe ho to supplier se long-term supply chain discuss karo. Yeh evolving situation hai — current status ke liye qualified fire suppression consultant se verify karo." },
  { q: "India mein Novec 1250 easily available hai?", a: "Limited availability hai compared to FM200. Tier I cities mein certified suppliers hain. Smaller cities mein supply chain limited ho sakti hai. Installation ke time aur refill ke time dono ke liye supplier availability verify karo. FM200 India mein zyada readily available hai — ye practical consideration hai." },
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
      <ArticleLayout slug="novec-1250" headings={HEADINGS} readingTimeMinutes={17}>

        <p style={S.p}>FM200 ne saalon tak Data Centers ko protect kiya.</p>

        <p style={S.p}>Lekin ek problem thi — FM200 ka Global Warming Potential 3,220 hai.</p>

        <p style={S.p}>Iska matlab: ek FM200 discharge = 3,220 guna CO2 release ka climate impact.</p>

        <p style={S.p}>Duniya ko ek better alternative chahiye tha.</p>

        <p style={S.p}><strong>3M ne ek alternative banaya — Novec 1230 Fire Protection Fluid (FK-5-1-12).</strong></p>

        <p style={S.p}>Industry mein ye agent aksar "Novec 1250" ya "Novec 1230" dono naamon se refer kiya jaata hai.</p>

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
            Novec 1250 cylinder bank — FM200 ki tarah red cylinders, lekin zyada environment-friendly agent. Liquid form mein stored rehta hai.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-novec1250" style={S.h1}>What Is Novec 1250?</h2>

        <p style={S.p}><strong>Is article mein hum FK-5-1-12 based clean agent ke baare mein baat kar rahe hain.</strong></p>

        <p style={S.p}>Chemical naam: <strong>FK-5-1-12 (Dodecafluoro-2-methylpentan-3-one)</strong>.</p>

        <p style={S.p}>3M is agent ko <strong>Novec 1230 Fire Protection Fluid</strong> ke naam se market karta tha. "Novec 1250" koi official 3M product name nahi hai — lekin industry mein ye term FK-5-1-12 ke liye informally use hoti hai. Correct technical naam: Novec 1230 ya FK-5-1-12.</p>

        <p style={S.p}>Ye FM200 ka next-generation alternative hai — better environmental profile, same effectiveness.</p>

        <p style={S.p}>Ek important physical difference: FM200 gas form mein hoti hai cylinders mein.</p>

        <p style={S.p}><strong>Novec 1250 liquid form mein stored hoti hai</strong> — discharge hone par instantly vaporize ho jaati hai.</p>

        <p style={S.p}>Liquid storage ka faida — same cylinder size mein zyada agent fit ho jaata hai.</p>

        <DCMapNote components={["Novec 1250 Cylinders", "Solenoid Valve", "Discharge Nozzles", "VESDA", "Fire Alarm Panel", "Abort Switch"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Novec 1250 Needed?</h2>

        <p style={S.p}>FM200 kaam karta hai — lekin climate ek growing concern tha.</p>

        <p style={S.p}>Europe ne F-Gas regulations introduce ki — high GWP agents pe restrictions.</p>

        <p style={S.p}>Data center industry globally sustainable hona chahti hai.</p>

        <p style={S.p}>Clients bhi aaj ESG (Environmental, Social, Governance) reports demand karte hain.</p>

        <p style={S.p}><strong>FM200 ka GWP 3,220 ek liability ban raha tha — Novec 1250 ka GWP 1.</strong></p>

        <WhyThisMatters>
          Large cloud providers — Google, Microsoft, Amazon — apne data centers mein sustainability commitments dete hain. FM200 ke high GWP se ye commitments contradict hote hain. Novec 1250 unhe fire protection maintain karne ka tarika deta hai bina environmental penalty ke. Isliye new builds mein Novec 1250 ya similar low-GWP agents standard ban rahe hain.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Novec 1250 fire bujhata hai <strong>heat absorption</strong> se — bilkul FM200 ki tarah.</p>

        <p style={S.p}>Lekin Novec 1250 ek step aur add karta hai — <strong>phase change cooling.</strong></p>

        <p style={S.p}>Liquid Novec 1250 discharge hone par instantly gas mein convert hoti hai.</p>

        <p style={S.p}>Is liquid-to-gas conversion mein <strong>bahut zyada heat absorb hoti hai</strong> — latent heat of vaporization.</p>

        <p style={S.p}>Ye FM200 se zyada efficient heat absorption deta hai — isliye kam concentration pe kaam karta hai.</p>

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
          Novec 1250 ki design concentration sirf 4.2% hai Class A fires ke liye — FM200 ke 7-8% se almost aadhi. Kam agent = smaller cylinders ya more protection per cylinder. Ye ekonomically bhi faydamand hai. Ek 100 sq meter room ke liye Novec 1250 mein significantly less agent chahiye compared to FM200.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <p style={S.p}>FM200 system ki tarah hi components hain — kuch key differences ke saath:</p>

        <h3 style={S.h3}>1. Novec 1250 Cylinders</h3>
        <p style={S.p}>Same red cylinders — lekin pressure FM200 se different hai.</p>

        <p style={S.p}>Novec 1250 liquid mein stored hai — cylinder pressure FM200 se typically lower.</p>

        <p style={S.p}>Nitrogen superpressurization hoti hai — pressure manufacturer aur system design pe depend karta hai. Actual values manufacturer specification se verify karo.</p>

        <h3 style={S.h3}>2. Special Dip Tube</h3>
        <p style={S.p}>Liquid agent hone ki wajah se cylinder mein dip tube hota hai.</p>

        <p style={S.p}>Ye liquid ko bottom se kheenchta hai — proper discharge ensure karta hai.</p>

        <p style={S.p}>FM200 cylinders mein ye nahi hota — important difference hai.</p>

        <h3 style={S.h3}>3. Nozzles (Modified Design)</h3>
        <p style={S.p}>Novec 1250 ke liye specially designed nozzles.</p>

        <p style={S.p}>Liquid ko room mein fine mist ya vapor mein convert karte hain.</p>

        <p style={S.p}>FM200 nozzles interchangeable nahi hain — different hydraulics.</p>

        <h3 style={S.h3}>4. Rest of System</h3>
        <p style={S.p}>Solenoid valve, FACP, abort switch, door holders — FM200 ki tarah same hai.</p>

        <p style={S.p}>Control panel bhi same type — integration same hoti hai.</p>

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
            Novec 1250 discharge — white vapor cloud jab liquid gas mein convert hoti hai. 10 seconds mein room fill ho jaata hai.
          </figcaption>
        </figure>

        <p style={S.p}>Operation FM200 se almost identical hai:</p>

        <ul style={S.ul}>
          <li style={S.li}>Zone-wise installation — server hall, UPS room, battery room separate zones</li>
          <li style={S.li}>VESDA detection → FACP → solenoid valve → discharge</li>
          <li style={S.li}>Pre-alarm → HVAC shutdown → door close → abort window → discharge</li>
          <li style={S.li}>10 second discharge → 10 minute hold → ventilation → entry</li>
        </ul>

        <p style={S.p}><strong>Main operational difference: visible vapor cloud.</strong></p>

        <p style={S.p}>Novec 1250 liquid se gas bante waqt visible white cloud banata hai.</p>

        <p style={S.p}>Ye normal hai — panic nahi karna. Gas harmless hai at design concentration.</p>

        <EngineerTip>
          Novec 1250 discharge ke baad white cloud dikhna thoda alarming lagta hai naye engineers ko. Ye liquid ke vaporize hone ka visual effect hai — gas itself colorless hai, ye condensation aur temperature drop se white cloud banta hai. FM200 mein ye visible effect kam hota hai. Operations team ko pehle se training do ki ye normal hai.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="discharge-sequence" style={S.h1}>Discharge Sequence</h2>

        <p style={S.p}>FM200 ke same sequence — T=0 se T=discharge tak.</p>

        <p style={S.p}><strong>One key difference:</strong> Novec 1250 discharge ke baad visible vapor cloud banta hai.</p>

        <p style={S.p}>Ye cloud typically 2-3 minutes mein dissipate ho jaata hai ventilation se.</p>

        <p style={S.p}>Room clearing ke liye proper HVAC ventilation activate karo — fresh air in, vapors out.</p>

        <p style={S.p}>Hold time: minimum 10 minutes — concentration maintain karo.</p>

        <hr style={S.divider} />

        <h2 id="environmental" style={S.h1}>Environmental Profile</h2>

        <p style={S.p}>Ye section Novec 1250 choose karne ka main reason hai:</p>

        <ul style={S.ul}>
          <li style={S.li}><strong>GWP = 1:</strong> CO2 equivalent. FM200 ka 3,220 GWP se practically nothing.</li>
          <li style={S.li}><strong>ODP = 0:</strong> Ozone layer damage zero. Halon replacement agents mein ye critical tha.</li>
          <li style={S.li}><strong>Atmospheric lifetime = 5 days:</strong> FM200 31-39 days. Novec 1250 ek hafte mein break down ho jaata hai.</li>
          <li style={S.li}><strong>No bioaccumulation:</strong> Food chain mein accumulate nahi hota.</li>
          <li style={S.li}><strong>NOAEL = 10%:</strong> Safe threshold FM200 ke NOAEL se high — more safety margin.</li>
        </ul>

        <InsightCard>
          GWP 1 ka matlab hai — agar Novec 1250 ka ek kg atmosphere mein release ho, to uska climate impact sirf ek kg CO2 ke barabar hai. FM200 ke case mein wahi ek kg = 3,220 kg CO2 ke equivalent warming. Ek typical data center discharge (100-200 kg FM200) = 322,000 to 644,000 kg CO2 equivalent impact. Novec 1250 mein wahi discharge = 100-200 kg CO2 equivalent. Ye difference enormous hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation Considerations</h2>

        <h3 style={S.h3}>Hydraulic Design Differences</h3>
        <p style={S.p}>Novec 1250 liquid hone ki wajah se hydraulic calculations FM200 se different hain.</p>

        <p style={S.p}>Specialized software required — manufacturer ke tools use karo.</p>

        <p style={S.p}>Pipe sizing, nozzle selection — recalculate karna padega FM200 design se.</p>

        <h3 style={S.h3}>Room Integrity Same</h3>
        <p style={S.p}>FM200 ki tarah — room sealed hona chahiye.</p>

        <p style={S.p}>Door fan test mandatory hai.</p>

        <p style={S.p}>4.2% concentration hold karna bhi challenging hai agar room leaky ho.</p>

        <h3 style={S.h3}>HVAC Interlock</h3>
        <p style={S.p}>Same as FM200 — HVAC discharge se pehle band hona chahiye.</p>

        <p style={S.p}>Novec 1250 ka vapor heavier than FM200 at some conditions — ye bhi factor hai.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>GWP = 1:</strong> Near-zero environmental impact — future regulations se safe</li>
          <li style={S.li}><strong>Lower design concentration:</strong> 4.2% vs FM200 7% — less agent needed</li>
          <li style={S.li}><strong>Effective suppression:</strong> Same speed aur effectiveness as FM200</li>
          <li style={S.li}><strong>Safe for humans:</strong> High NOAEL (10%) — extra safety margin</li>
          <li style={S.li}><strong>No residue:</strong> Clean agent — equipment undamaged</li>
          <li style={S.li}><strong>Regulatory future secure:</strong> F-Gas regulations mein compliant</li>
          <li style={S.li}><strong>ESG compliance:</strong> Sustainability reports ke liye better</li>
          <li style={S.li}><strong>Liquid storage:</strong> Zyada efficient cylinder utilization</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Higher upfront cost:</strong> FM200 se significantly mehnga — agent aur equipment</li>
          <li style={S.li}><strong>Limited supplier network:</strong> Especially India mein — FM200 se less availability</li>
          <li style={S.li}><strong>3M PFAS concerns:</strong> 3M ne PFAS manufacturing phaseout announce kiya — supply uncertainty</li>
          <li style={S.li}><strong>Visible cloud on discharge:</strong> Operations team ko train karna padta hai — panic avoid karne ke liye</li>
          <li style={S.li}><strong>Different hydraulics:</strong> FM200 se retrofit complex hai — new calculations needed</li>
          <li style={S.li}><strong>Limited India experience:</strong> Less field experience in Indian conditions vs FM200</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}>FM200 ki tarah hi — kuch additions ke saath:</p>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Cylinder visual inspect — liquid level indicator check (some models mein hota hai)</li>
          <li style={S.li}>Pressure gauge check — within range</li>
          <li style={S.li}>Control panel status — no faults</li>
          <li style={S.li}>All interlocks functional — HVAC, doors</li>
        </ul>

        <p style={S.p}><strong>Annual:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Cylinder weight check — FM200 se zyada important hai kyunki liquid hai</li>
          <li style={S.li}>Dip tube check — manufacturer recommendation follow karo</li>
          <li style={S.li}>Room integrity test</li>
          <li style={S.li}>Full functional test (with suppression isolated)</li>
          <li style={S.li}>Nozzle inspect — clog ya damage check</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <p style={S.p}>FM200 ki tarah — actual discharge test rarely done (very expensive).</p>

        <p style={S.p}><strong>Functional test (simulated):</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Suppression isolate karo</li>
          <li style={S.li}>VESDA ya smoke detector trigger karo</li>
          <li style={S.li}>Verify: pre-alarm, HVAC shutdown, doors close, abort timer, FACP signal</li>
          <li style={S.li}>Re-arm the system after test</li>
        </ul>

        <p style={S.p}><strong>Full discharge test (commissioning):</strong></p>
        <p style={S.p}>New installation pe mandatory hota hai — concentration meters se verify karo ki design concentration achieve hua.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NFPA 2001:</strong> FK-5-1-12 listed clean agent — Novec 1250 compliant</li>
          <li style={S.li}><strong>ISO 14520-1:</strong> International gaseous suppression standard</li>
          <li style={S.li}><strong>BS EN 15004-9:</strong> European standard specifically for FK-5-1-12</li>
          <li style={S.li}><strong>EU F-Gas Regulation (EU 517/2014 aur 2024 revision):</strong> High-GWP F-Gas use pe restrictions — FK-5-1-12 (GWP=1) compliant hai. Specific regulations evolve ho rahe hain — current applicable requirements ke liye legal/regulatory expert se verify karo</li>
          <li style={S.li}><strong>UL 2166:</strong> Halon alternative clean agent systems</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> Ye ek illustrative example scenario hai — documented real facility ka reference nahi hai.</p>

        <p style={S.p}><strong>Scenario:</strong> New hyperscale data center, targeting LEED Platinum certification.</p>

        <p style={S.p}><strong>Decision:</strong> FM200 vs Novec 1250 evaluation.</p>

        <ul style={S.ul}>
          <li style={S.li}>FM200 upfront cost: ₹X</li>
          <li style={S.li}>Novec 1250 upfront cost: ₹X + 35% premium</li>
          <li style={S.li}>LEED points: Novec 1250 gives additional sustainability points</li>
          <li style={S.li}>Client requirement: ESG report mein FM200 high GWP flag hota</li>
        </ul>

        <p style={S.p}><strong>Decision:</strong> FK-5-1-12 (Novec 1230) chosen — sustainability commitment + regulatory future security.</p>

        <p style={S.p}><strong>Lesson:</strong> Low-GWP agent choose karna LEED goals aur ESG commitments dono mein help karta hai.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — FM200 Nozzles Use Karna</h3>
        <p style={S.p}>Novec 1250 ke liye FM200 nozzles fit nahi hote properly.</p>

        <p style={S.p}>Hydraulics alag hain — wrong nozzles se concentration achieve nahi hogi.</p>

        <h3 style={S.h3}>Mistake 2 — Same Design Concentration Assume Karna</h3>
        <p style={S.p}>FM200 ka 7-8% vs Novec 1250 ka 4.2-5.9% — different hai.</p>

        <p style={S.p}>FM200 calculation se Novec 1250 design mat karo — recalculate karo.</p>

        <h3 style={S.h3}>Mistake 3 — Supplier Availability Not Checked</h3>
        <p style={S.p}>Remote location mein Novec 1250 refill difficult ho sakta hai.</p>

        <p style={S.p}>Pehle verify karo ki qualified supplier nearby hai — discharge ke baad refill timeline kya hoga.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Novec 1250 aur FM200 mein sabse bada environmental difference kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> GWP — Global Warming Potential. FM200 ka GWP 3,220 hai. Novec 1250 ka GWP = 1. Atmospheric lifetime mein bhi fark: FM200 31-39 days, Novec 1250 sirf 5 days. Ek discharge ka environmental impact FM200 mein hazaron guna zyada hota hai.</p>

        <h3 style={S.h3}>Q2: Novec 1250 liquid mein kyun store hota hai — FM200 se kya advantage?</h3>
        <p style={S.p}><strong>Answer:</strong> Liquid storage more dense hai — same cylinder mein zyada agent fit hota hai. Discharge pe liquid instantly vaporize hoti hai — phase change se additional heat absorption hoti hai. Design concentration bhi FM200 se kam chahiye (4.2% vs 7-8%) — ye dono factors mila ke Novec 1250 more efficient agent banta hai.</p>

        <h3 style={S.h3}>Q3: FM200 existing system ko Novec 1250 se replace kar sakte hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Technically possible hai kuch cases mein, lekin typically full re-engineering zaroori hoti hai. Pipe hydraulics alag hain, nozzles alag hain, design concentrations alag hain. Simple cylinder swap se kaam nahi chalta. Certified fire engineer se proper assessment karwao — partial compatibility possible hai kuch systems mein.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Novec 1250 vs FM200 vs Novec 1230</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>New builds mein Novec 1250 prefer karo:</strong> FM200 phase-out ho raha hai — future-proof choice</li>
          <li style={S.li}><strong>Supplier verify karo pehle:</strong> Local availability aur refill timeline confirm karo</li>
          <li style={S.li}><strong>Certified engineer se design karo:</strong> FM200 design directly copy mat karo</li>
          <li style={S.li}><strong>Staff training:</strong> Visible cloud normal hai — operations team ko pata hona chahiye</li>
          <li style={S.li}><strong>Annual integrity test:</strong> Same as FM200 — door fan test mandatory</li>
          <li style={S.li}><strong>Weight log karo:</strong> Liquid agent hone se weight check extra important hai</li>
          <li style={S.li}><strong>3M supply chain monitor karo:</strong> PFAS phaseout news follow karo — alternative planning karo</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Novec 1250 = FK-5-1-12 — 3M ka clean agent fire suppressant. FM200 ka next-generation replacement.",
          "GWP = 1 vs FM200 ka 3,220 — near-zero environmental impact. Future F-Gas regulations se compliant.",
          "Liquid form mein stored — phase change se double heat absorption — FM200 se more efficient.",
          "Design concentration sirf 4.2% (Class A) — FM200 ke 7-8% se almost aadhi. Less agent = efficient.",
          "Discharge sequence FM200 ki tarah — visible white cloud normal hai, panic mat karo.",
          "Supplier availability India mein limited — pehle verify karo before specifying in design.",
          "3M PFAS concerns watch karo — supply chain uncertainty hai. Long-term planning zaroori hai.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Novec 1250 clear hua. Aage fire protection complete karo:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — Novec 1250 se pehle ka standard — comparison ke liye zaroori padho.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — Detection system jo Novec 1250 trigger karta hai.</li>
          <li style={S.li}><TopicLink slug="novec" variant="inline" /> — Novec fluid family broader — suppression aur immersion cooling dono.</li>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — Water-based backup — clean agents ke complement mein kaam karta hai.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
