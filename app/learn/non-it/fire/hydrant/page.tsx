import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Fire Hydrant System in Data Centers | Behind The Tech",
  description:
    "Fire hydrant system kya hota hai, Data Center mein kaise kaam karta hai — pump room, jockey pump, diesel pump, wet riser, dry riser, testing aur maintenance. Simple Hinglish mein.",
  keywords: ["fire hydrant data center", "hydrant system", "jockey pump", "fire pump room", "wet riser dry riser"],
  openGraph: {
    title: "Fire Hydrant System in Data Centers",
    description: "Data Center ka external firefighting backbone — hydrant system kaise kaam karta hai, pump room se hose cabinet tak.",
    url: "https://behindthetech.in/learn/non-it/fire/hydrant",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Hydrant System Explained — Behind The Tech",
    description: "Fire hydrant system — Data Center firefighting infrastructure, simple language mein.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/non-it/fire/hydrant" },
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
    { label: "Ek line mein", text: "Fire hydrant system ek high-pressure water supply network hai jo data center ke andar aur bahar firefighting ke liye use hota hai — mainly fire brigade ke liye." },
    { label: "FM200 se kyun alag", text: "FM200 aur Novec server room ki fire bujhaate hain — automatically, bina paani ke. Hydrant system us ke baad kaam aata hai — jab fire badi ho jaaye ya structure mein lage — tab fire brigade hydrant use karta hai." },
    { label: "3 pumps kyon", text: "Jockey pump: pressure maintain karta hai. Electric main pump: actual firefighting water deta hai. Diesel pump: electric failure backup. Teeno milkar ensure karte hain ki kisi bhi condition mein water pressure milegi." },
    { label: "Wet vs Dry Riser", text: "Wet riser: pipes hamesha paani se filled. High-rise buildings mein. Dry riser: pipes khali — fire brigade apna paani pump karta hai. Low-rise buildings mein. Data centers mein dono possible hain building height ke hisaab se." },
    { label: "Kahan lagta hai", text: "Pump room underground ya ground floor. Pipes building mein network. Hydrant points har floor pe ya bahar — typically 45m distance pe. Hose cabinets har corridor mein. Fire brigade connection — building ke bahar clearly marked." },
    { label: "Last line of defense", text: "Hydrant system last resort hai — FM200 → sprinkler → hydrant. Ye fire brigade ke hath mein tool hai. Inka kaam building ke structure aur surroundings ko protect karna hai — servers tab tak already damaged ho sakte hain." },
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
          Hydrant = fire brigade ka tool. FM200 servers bachata hai. Hydrant building bachata hai. Dono important hain.
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
    { feature: "Activation",        hydrant: "Manual — valve open karo",               sprinkler: "Automatic — heat fuses sprinkler head" },
    { feature: "Area coverage",     hydrant: "Targeted — hose direct karo",            sprinkler: "Zone coverage — all heads in zone" },
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
  { q: "Jockey pump kyun lagta hai — uski kya zaroorat hai?", a: "Hydrant pipe network hamesha water se filled rehti hai. Ye pressure maintain karna padti hai. Koi bhi chhoti leakage ya valve movement se pressure drop hoti hai. Jockey pump (small 2-5 kW pump) continuously pressure monitor karta hai aur chhoti drops ko compensate karta hai. Agar pressure zyada drop ho to main electric pump automatically start ho jaata hai. Jockey pump main pump ki battery saver hai." },
  { q: "Diesel pump kyun lagta hai — electric pump kafi nahi hai kya?", a: "Fire ke time aksar power supply fail ho jaati hai — fire itself electrical equipment damage karta hai, ya firefighting ke time power off kiya jaata hai. Electric pump power pe dependent hai. Diesel pump completely independent hai — apna diesel tank hai. Isliye NBC aur fire standards mein diesel pump mandatory hai as backup. 'Fail-safe' design principle." },
  { q: "Wet riser aur dry riser mein practical difference kya hai?", a: "Wet riser: pipes hamesha paani se bhari hain — pressure ready hai. Fire brigade sirf hose connect karta hai aur paani milta hai. Multi-story buildings ke liye. Dry riser: pipes khali hain — fire brigade apni pump truck se paani inject karta hai. Pipes freeze ho sakte hain agar pre-filled hoon cold climates mein — dry safer hai. India mein typically 15m se zyada height pe wet riser lagta hai." },
  { q: "Underground water tank kiti badi honi chahiye?", a: "NBC aur fire standards ke according calculation hoti hai. Typically: building size × occupancy × fire flow requirement × minimum 2 hours duration. Ek typical 5-storey data center ke liye — 200,000 to 500,000 liters. Tank size kisi certified fire consultant se calculate karwao — inadequate tank = fire brigade ko paani khatam ho jaata hai mid-firefighting." },
  { q: "Hydrant valve galti se khul jaaye to kya hoga?", a: "Agar wet riser hai to — paani immediately floor pe aa jaayega. Jockey pump pressure drop detect karega aur alarm trigger hoga. Agar main pump automatically start ho to — kaafi zyada paani niklega. Isliye hydrant valve cabinets lock rehte hain. Unauthorized access se bachao. Regular valve inspection karo — partial open condition dangerous hai." },
  { q: "Fire brigade hydrant pressure enough nahi hai — kya karna chahiye?", a: "Pehle jockey pump aur main pump running confirm karo. Pressure gauge check karo — design pressure kya hai (typically 3.5-7 bar). Agar pressure low hai: main pump manual start karo, diesel pump start karo, fire brigade ko alternate supply point batao. Post-incident — pump output test karo, pressure loss ka reason identify karo — pipe leak ya pump issue." },
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
      <ArticleLayout slug="hydrant" headings={HEADINGS} readingTimeMinutes={18}>

        <p style={S.p}>Raat ke 3 baje fire brigade data center ke bahar khadi hai.</p>

        <p style={S.p}>FM200 discharge ho chuka hai — server room ki fire control mein hai.</p>

        <p style={S.p}>Lekin adjacent electrical room mein fire spread ho rahi hai — wahan FM200 nahi tha.</p>

        <p style={S.p}>Fire brigade ka hose bahar ke hydrant point se connect hua — paani aaya.</p>

        <p style={S.p}><strong>Yahi moment hai jab hydrant system apna kaam karta hai.</strong></p>

        <p style={S.p}>FM200 server room bachata hai. Hydrant building bachata hai.</p>

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
            Data Center ka fire hydrant network — bahar ke hydrant points, fire brigade connection, aur pump room visible. Ye building-level fire protection infrastructure hai.
          </figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-hydrant" style={S.h1}>What Is a Fire Hydrant System?</h2>

        <p style={S.p}><strong>Fire hydrant system ek high-pressure water distribution network hai.</strong></p>

        <p style={S.p}>Ye building ke andar aur bahar fire points pe high-pressure water supply deta hai.</p>

        <p style={S.p}>Fire brigade aur trained on-site staff dono use karte hain.</p>

        <p style={S.p}>Ye automatic nahi hai — manual operation required hai.</p>

        <p style={S.p}><strong>FM200 se fundamental difference: FM200 automatic hai. Hydrant manual hai.</strong></p>

        <p style={S.p}>Hydrant ek "infrastructure" hai — paani available karta hai jab aur jahan chaaho.</p>

        <DCMapNote components={["Pump Room", "Underground Tank", "Hydrant Points", "Hose Reels", "Fire Brigade Connection", "Wet/Dry Riser"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is It Needed?</h2>

        <p style={S.p}>FM200 bahut effective hai — lekin sirf designated protected zones mein.</p>

        <p style={S.p}>Data center mein aise areas bhi hote hain:</p>
        <ul style={S.ul}>
          <li style={S.li}>Loading dock, parking, lobby — FM200 nahi hai yahan</li>
          <li style={S.li}>Diesel generator yard — outdoor area</li>
          <li style={S.li}>Chiller plant room — large open area</li>
          <li style={S.li}>Cable management areas — FM200 impractical</li>
          <li style={S.li}>Structural fires — walls, ceiling, floor mein fire FM200 handle nahi kar sakta</li>
        </ul>

        <p style={S.p}><strong>Hydrant system in sab areas ke liye hai.</strong></p>

        <WhyThisMatters>
          Data Center ke fire NOC (No Objection Certificate) ke liye NBC (National Building Code) compliance mandatory hai. NBC mein hydrant system explicitly required hai every commercial building mein above certain height ya area. Bina proper hydrant system ke data center ka fire NOC nahi milta — aur bina NOC ke operations illegal hai. Ye compliance issue hai, safety issue se pehle.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Simple concept — complex execution.</p>

        <p style={S.p}><strong>Underground tank mein paani stored hai.</strong></p>

        <p style={S.p}>Pump room is tank ka paani utha ke building-wide pipe network mein push karta hai.</p>

        <p style={S.p}>Network ke ends pe hydrant points hain — valves aur hose connections.</p>

        <p style={S.p}>Fire pe valve kholo — pressurized water niklo — hose se target karo.</p>

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
        <p style={S.p}>Building ke neeche ya adjacent constructed RCC tank.</p>

        <p style={S.p}>Exclusively firefighting ke liye — domestic water se separate.</p>

        <p style={S.p}>Minimum storage applicable code (NBC, local fire authority requirements) ke hisaab se — duration occupancy type, risk category aur fire consultant ki recommendations pe depend karta hai.</p>

        <p style={S.p}>Volume applicable code requirements aur hydraulic calculations se determine hota hai — facility size, fire risk category aur local authority requirements pe depend karta hai.</p>

        <h3 style={S.h3}>2. Jockey Pump (Pressure Maintenance Pump)</h3>
        <p style={S.p}>Small pump — size project aur design ke hisaab se vary karta hai.</p>

        <p style={S.p}>Network ka pressure hamesha maintain karta hai — typically 6-7 bar.</p>

        <p style={S.p}>Chhoti leaks aur pressure drops compensate karta hai.</p>

        <p style={S.p}>Agar pressure jyada drop ho (fire ya hose open) to main pump start ho jaata hai.</p>

        <h3 style={S.h3}>3. Electric Main Pump</h3>
        <p style={S.p}>Primary firefighting pump — capacity hydraulic calculations aur applicable codes se determine hoti hai.</p>

        <p style={S.p}>Automatic start hota hai jab jockey pump pressure maintain nahi kar pata.</p>

        <p style={S.p}>Required flow rate aur pressure deta hai — actual values hydraulic design, applicable standards (NBC, IS 3844, NFPA 14) aur AHJ requirements pe depend karte hain.</p>

        <h3 style={S.h3}>4. Diesel Pump (Standby Emergency Pump)</h3>
        <p style={S.p}>Electric pump ka backup — completely independent.</p>

        <p style={S.p}>Apna diesel tank hai — fuel capacity per applicable standards aur project requirements specified hoti hai.</p>

        <p style={S.p}>Electric failure pe automatically start ho jaata hai — actual start time per manufacturer specification aur applicable standard (typically within a specified time, project design pe confirm karo).</p>

        <p style={S.p}>Same capacity as electric pump — parallel ya sequential operation possible.</p>

        <h3 style={S.h3}>5. Pipe Network (Riser System)</h3>
        <p style={S.p}>Galvanized iron (GI) ya ductile iron pipes.</p>

        <p style={S.p}>Vertical pipes (risers) har floor pe horizontal branch pipes se connected.</p>

        <p style={S.p}>Design: loop system preferred — agar ek side block ho to doosri side se paani aaye.</p>

        <h3 style={S.h3}>6. Hydrant Points / Landing Valves</h3>
        <p style={S.p}>Each floor pe — typically at staircase landings.</p>

        <p style={S.p}>Instantaneous coupling (Storz type) — fire brigade hose directly connect karta hai.</p>

        <p style={S.p}>Red colored valve + pressure gauge + blank cap (dust protection).</p>

        <h3 style={S.h3}>7. Hose Reel Cabinets</h3>
        <p style={S.p}>Corridors mein lage cabinets — trained staff ke liye.</p>

        <p style={S.p}>25mm hose reel — relatively low pressure — first-aid firefighting.</p>

        <p style={S.p}>Not for fire brigade — ye on-site staff ka tool hai early-stage fires ke liye.</p>

        <h3 style={S.h3}>8. Fire Brigade Inlet (Siamese Connection)</h3>
        <p style={S.p}>Building ke bahar clearly marked — "FIRE BRIGADE INLET".</p>

        <p style={S.p}>Fire brigade apni pump truck se paani is point se inject kar sakti hai.</p>

        <p style={S.p}>Agar building ke internal pumps fail ho jaayein — ye backup inlet hai.</p>

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
            Fire pump room — left: jockey pump, center: electric main pump, right: diesel pump. Control panel se sab monitor hota hai.
          </figcaption>
        </figure>

        <p style={S.p}>Pump room ek dedicated room hai — ground floor ya basement mein.</p>

        <p style={S.p}><strong>Requirements:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Direct access from outside — fire brigade directly ja sake</li>
          <li style={S.li}>Separate from other utilities — dedicated fire-rated room</li>
          <li style={S.li}>Adequate ventilation — diesel pump ke liye especially</li>
          <li style={S.li}>Floor drain — testing ke time paani nikalta hai</li>
          <li style={S.li}>Dedicated electrical supply — with manual override</li>
          <li style={S.li}>Clearly labeled — "FIRE PUMP ROOM" visible marking</li>
        </ul>

        <InsightCard>
          Pump room mein teen pumps ka sequence important hai. Jockey pump hamesha first chalta hai — pressure maintenance. Agar pressure 0.5 bar drop ho to electric pump auto-start. Agar electric pump start na ho ya pressure phir bhi low raha, 10 seconds mein diesel pump auto-start. Ye cascade sequence ensure karta hai ki kisi bhi single failure pe system continue kare. Diesel pump ke auto-start logic kabhi disable mat karo.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Hydrant Works in a Data Center</h2>

        <p style={S.p}>Data center ka typical hydrant layout:</p>

        <h3 style={S.h3}>External Hydrant Points</h3>
        <p style={S.p}>Building ke periphery pe — spacing applicable code (NBC, IS 3844) aur hydraulic coverage ke hisaab se determine hoti hai.</p>

        <p style={S.p}>Fire brigade truck seedha yahan aa ke connect kar sakti hai.</p>

        <p style={S.p}>Clearly accessible — parking ya obstruction nahi hona chahiye hydrant ke aas paas.</p>

        <h3 style={S.h3}>Internal Hydrant Points (Landing Valves)</h3>
        <p style={S.p}>Har floor ke staircase pe — typically 2 per floor for larger buildings.</p>

        <p style={S.p}>Fire brigade wahan tak pahunche aur hose connect kare.</p>

        <p style={S.p}>30m hose — typically har landing pe available.</p>

        <h3 style={S.h3}>Hose Reel Points</h3>
        <p style={S.p}>Har 30m pe ek hose reel cabinet — corridor mein.</p>

        <p style={S.p}>On-site trained staff use kare — early-stage fires ke liye.</p>

        <p style={S.p}>Fire brigade hose reels use nahi karte — wo landing valves prefer karte hain.</p>

        <EngineerTip>
          Data Center mein hydrant point ke paas server rack mat lagao. Agar hose reel ya landing valve se paani aata hai — surrounding area wet ho jaata hai. Buffer zone rakho. Similarly external hydrant points ke aas paas vehicles park mat karne do — fire brigade access block hoti hai. Ye common sense hai lekin field mein often violate hota hai.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="wet-vs-dry-riser" style={S.h1}>Wet Riser vs Dry Riser</h2>

        <h3 style={S.h3}>Wet Riser</h3>
        <p style={S.p}>Pipe network hamesha water se filled aur pressurized rehta hai.</p>

        <p style={S.p}>Fire pe immediately paani available — sirf valve open karo.</p>

        <p style={S.p}>Multi-storey buildings (typically 15m se zyada height) ke liye.</p>

        <p style={S.p}>India mein most data centers mein wet riser system hota hai.</p>

        <h3 style={S.h3}>Dry Riser</h3>
        <p style={S.p}>Pipe network khali rehti hai — paani nahi hota normally.</p>

        <p style={S.p}>Fire brigade apni pump truck se bahar ke inlet se paani inject karta hai.</p>

        <p style={S.p}>Low-rise buildings ya freezing climate areas mein preferred.</p>

        <p style={S.p}>India mein less common for data centers — wet riser zyada prevalent hai.</p>

        <WarningCard>
          Wet riser mein pressure hamesha maintain hona chahiye. Agar jockey pump frequently start ho raha hai — system mein leak hai. Ignore mat karo. Leak location identify karo aur fix karo. Constant jockey pump cycling = pump overheating = pump life reduction. Aur agar main pump auto-start fail ho jaye tab leak pe pata chalega — tab bahut der ho chuki hogi.
        </WarningCard>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Hydrant Points</h2>

        <h3 style={S.h3}>1. External Yard Hydrant</h3>
        <p style={S.p}>Pillar type — building ke bahar ground pe.</p>

        <p style={S.p}>Fire brigade truck directly connect karta hai.</p>

        <p style={S.p}>Typically 63mm outlet — high flow rate.</p>

        <h3 style={S.h3}>2. Internal Landing Valve</h3>
        <p style={S.p}>Wall-mounted — staircase pe.</p>

        <p style={S.p}>Fire brigade hose connect karta hai — floor-wise firefighting.</p>

        <p style={S.p}>63mm outlet, Instantaneous coupling.</p>

        <h3 style={S.h3}>3. Hose Reel</h3>
        <p style={S.p}>25mm hose — low flow rate.</p>

        <p style={S.p}>Trained staff ke liye — early-stage, small fires.</p>

        <p style={S.p}>Cabinet mein coiled — pull out aur use karo.</p>

        <h3 style={S.h3}>4. Siamese (Fire Brigade Inlet) Connection</h3>
        <p style={S.p}>Ye hydrant nahi hai strictly — lekin same network ka part.</p>

        <p style={S.p}>Building ke bahar — fire brigade apna paani inject karta hai is pe.</p>

        <p style={S.p}>2 inlets, 1 outlet design — two hoses se zyada flow possible.</p>

        <hr style={S.divider} />

        <h2 id="installation" style={S.h1}>Installation</h2>

        <h3 style={S.h3}>Tank Location</h3>
        <p style={S.p}>Underground preferred — gravity assist aur thermal insulation.</p>

        <p style={S.p}>Accessible for maintenance — manhole covers.</p>

        <p style={S.p}>Municipal water supply se auto-fill connection.</p>

        <h3 style={S.h3}>Pipe Network</h3>
        <p style={S.p}>GI (Galvanized Iron) pipes — internal. Ductile iron — external/underground.</p>

        <p style={S.p}>Ring main system (loop) generally preferred — redundant path available agar ek section isolated ho. Actual design layout hydraulic calculations aur site conditions pe depend karta hai.</p>

        <p style={S.p}>Pipe sizing: hydraulic calculation se — pressure loss acceptable range mein hona chahiye.</p>

        <h3 style={S.h3}>Fire NOC Requirements</h3>
        <p style={S.p}>India mein fire NOC ke liye — fire department ko hydrant system demo karna padta hai.</p>

        <p style={S.p}>Pump running, pressure demonstration, flow test — sab verify hota hai.</p>

        <p style={S.p}>Annual renewal mein bhi re-inspection hoti hai.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Unlimited water supply:</strong> Tank refill hoti rehti hai — prolonged firefighting possible</li>
          <li style={S.li}><strong>High flow rate:</strong> Large fires ke liye adequate water — FM200 se zyada volume possible</li>
          <li style={S.li}><strong>Fire brigade ready:</strong> Professional firefighters ke liye designed infrastructure</li>
          <li style={S.li}><strong>Redundant pumps:</strong> Jockey + Electric + Diesel — triple redundancy</li>
          <li style={S.li}><strong>NBC compliant:</strong> Legal requirement — fire NOC milti hai</li>
          <li style={S.li}><strong>Cost effective:</strong> Water cheap hai — repeat use without refill cost</li>
          <li style={S.li}><strong>Structural protection:</strong> Building structure ko cool karta hai — FM200 sirf equipment protect karta hai</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Water damage:</strong> Server room mein use nahi kar sakte — equipment destroy ho jaata hai</li>
          <li style={S.li}><strong>Manual operation:</strong> Trained person chahiye — automatic nahi hai</li>
          <li style={S.li}><strong>High infrastructure cost:</strong> Pump room, large tank, pipe network — significant capex</li>
          <li style={S.li}><strong>Maintenance intensive:</strong> Pumps, pipes, valves, tank — sab maintain karna padta hai</li>
          <li style={S.li}><strong>Space requirement:</strong> Underground tank + pump room — significant footprint</li>
          <li style={S.li}><strong>Tank maintenance:</strong> Sludge accumulation, biological growth — regular cleaning zaroori</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <p style={S.p}><strong>Weekly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Jockey pump running — pressure maintained</li>
          <li style={S.li}>Pump room visual inspection</li>
          <li style={S.li}>Pressure gauge reading log karo</li>
          <li style={S.li}>Diesel level check karo — fuel tank</li>
          <li style={S.li}>No unusual noise ya vibration</li>
        </ul>

        <p style={S.p}><strong>Monthly:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Jockey pump auto-start test karo — pressure drop simulate karo</li>
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
          <li style={S.li}>All valves operate karo — NRV, gate valves</li>
          <li style={S.li}>Water tank cleaning — sludge remove karo</li>
          <li style={S.li}>Pipe pressure test — leak check</li>
          <li style={S.li}>Fire NOC renewal documentation</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="testing" style={S.h1}>Testing</h2>

        <h3 style={S.h3}>Monthly Pump Test</h3>
        <p style={S.p}>Jockey pump: pressure drop karke auto-start verify karo.</p>

        <p style={S.p}>Electric pump: manual start, 10 min run, pressure note karo.</p>

        <p style={S.p}>Diesel pump: manual start, check fuel consumption, verify auto-changeover.</p>

        <h3 style={S.h3}>Annual Flow Test</h3>
        <p style={S.p}>Actual hose deployed karo — landing valve se paani nikalte hain.</p>

        <p style={S.p}>Flow rate measure karo — design value se compare karo.</p>

        <p style={S.p}>Agar flow low hai — pump issue, pipe blockage, ya tank level issue.</p>

        <hr style={S.divider} />

        <h2 id="standards" style={S.h1}>Standards</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>NBC 2016 Part 4:</strong> Fire and Life Safety — primary Indian reference</li>
          <li style={S.li}><strong>IS 3844:</strong> Code of practice for installation of internal fire hydrants</li>
          <li style={S.li}><strong>IS 908:</strong> Fire hydrant specifications</li>
          <li style={S.li}><strong>IS 884:</strong> First-aid hose reel for fire fighting</li>
          <li style={S.li}><strong>NFPA 14:</strong> Standard for installation of standpipe and hose systems</li>
          <li style={S.li}><strong>Local Fire Department NOC:</strong> State-specific requirements bhi hoti hain</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Example Scenario</h2>

        <p style={S.p}><strong>Note:</strong> Ye ek illustrative example scenario hai — kisi documented real facility ka reference nahi hai.</p>

        <p style={S.p}><strong>Scenario:</strong> Multi-storey large data center facility.</p>

        <p style={S.p}><strong>Hydrant design:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}>Underground tank: Code-calculated capacity — dedicated fire water</li>
          <li style={S.li}>Pump room: Basement level — jockey pump + electric main pump + diesel standby pump</li>
          <li style={S.li}>External hydrant points: As per code spacing requirements</li>
          <li style={S.li}>Internal landing valves: As per NBC aur local fire authority requirements</li>
          <li style={S.li}>Hose reels: As per applicable code (coverage per reel per IS 884/NBC)</li>
          <li style={S.li}>Siamese connections: Building periphery pe — FBV access all sides</li>
        </ul>

        <p style={S.p}><strong>Annual test result:</strong> Design flow aur pressure achieved — Fire NOC renewed.</p>

        <hr style={S.divider} />

        <h2 id="common-mistakes" style={S.h1}>Common Mistakes</h2>

        <h3 style={S.h3}>Mistake 1 — Jockey Pump Continuous Cycling Ignored</h3>
        <p style={S.p}>Jockey pump baar baar start ho raha hai — "normal lagta hai" maan lete hain.</p>

        <p style={S.p}>Ye leak ka sign hai — investigate karo aur fix karo.</p>

        <h3 style={S.h3}>Mistake 2 — Diesel Fuel Not Maintained</h3>
        <p style={S.p}>Diesel tank check nahi hota — fire ke time pump start nahi hota.</p>

        <p style={S.p}>Weekly diesel level check karo. Minimum 75% always maintain karo.</p>

        <h3 style={S.h3}>Mistake 3 — Hydrant Points Blocked</h3>
        <p style={S.p}>Material storage, parking, equipment — hydrant access block ho jaata hai.</p>

        <p style={S.p}>Monthly visual inspection — access clear hai kya.</p>

        <h3 style={S.h3}>Mistake 4 — Hose Reel Hose Damaged</h3>
        <p style={S.p}>Hose reel hose crack ho jaata hai — old age, UV damage.</p>

        <p style={S.p}>Monthly unroll karo aur inspect karo — replace if damaged.</p>

        <h3 style={S.h3}>Mistake 5 — Annual Flow Test Skipped</h3>
        <p style={S.p}>Annual test costly lagti hai — operations team postpone karte rehte hain.</p>

        <p style={S.p}>Fire NOC renewal mandatory hai — test bhi mandatory hai. Skip mat karo.</p>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: Hydrant system mein 3 pumps kyun hote hain?</h3>
        <p style={S.p}><strong>Answer:</strong> Jockey pump: pressure maintenance karta hai — chhoti drops compensate karta hai. Electric main pump: actual firefighting flow provide karta hai — auto-start jab pressure kaafi drop ho. Diesel pump: backup — electric failure ya power cut pe auto-start. Teeno milkar triple redundancy banate hain — kisi bhi single failure pe system continue karta hai.</p>

        <h3 style={S.h3}>Q2: Wet riser aur dry riser mein kya fark hai?</h3>
        <p style={S.p}><strong>Answer:</strong> Wet riser: pipes hamesha paani se filled aur pressurized — fire pe sirf valve open karo. Multi-storey buildings ke liye. Dry riser: pipes khali — fire brigade apni pump truck se bahar inlet pe paani inject karta hai. Low-rise ya cold climate areas mein. India mein data centers mein typically wet riser lagta hai.</p>

        <h3 style={S.h3}>Q3: Data Center mein hydrant aur FM200 ka role kya hai?</h3>
        <p style={S.p}><strong>Answer:</strong> FM200 automated hai — server hall ki enclosed fire ko detect aur bujhata hai immediately, bina paani ke, equipment safe. Hydrant manual hai — fire brigade ke liye, large fires ke liye, structural fires ke liye, external aur non-FM200 areas ke liye. Dono complementary hain — FM200 equipment bachata hai, hydrant building bachata hai.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Hydrant vs Sprinkler</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="best-practices" style={S.h1}>Best Practices</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>Triple pump configuration:</strong> Jockey + Electric + Diesel — never compromise on diesel backup</li>
          <li style={S.li}><strong>Tank sizing generously:</strong> NBC minimum se 25% extra design karo — future expansion buffer</li>
          <li style={S.li}><strong>Ring main design:</strong> Loop system — single point failure se pura system affected nahi hoga</li>
          <li style={S.li}><strong>BMS integration:</strong> Pump status, pressure, alarms — centrally monitor karo</li>
          <li style={S.li}><strong>Staff training:</strong> Operations team ko hose reel use karna pata hona chahiye</li>
          <li style={S.li}><strong>Fire brigade relationship:</strong> Annual mock drill mein local fire brigade ko invite karo</li>
          <li style={S.li}><strong>Hydrant access maintain karo:</strong> External points hamesha clear aur accessible</li>
          <li style={S.li}><strong>Monthly pump tests log karo:</strong> Performance trend track karo — deterioration early catch ho</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Hydrant system = high-pressure water distribution network for firefighting. Manual operation, fire brigade ka primary tool.",
          "3 pumps mandatory: Jockey (pressure maintenance) + Electric (primary) + Diesel (backup). Triple redundancy.",
          "Wet riser: pipes hamesha pressurized. Dry riser: pipes khali, fire brigade inject karta hai. India mein wet riser common.",
          "FM200 server room bachata hai. Hydrant building aur surroundings bachata hai. Dono complementary systems hain.",
          "NBC compliance mandatory hai — bina proper hydrant system ke fire NOC nahi milti.",
          "Weekly diesel check, monthly pump tests, annual flow test — ye maintenance schedule follow karo strictly.",
          "Jockey pump frequent cycling = leak ka sign. Ignore mat karo — investigate aur fix karo.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Hydrant system complete hua. Fire protection ka last piece:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="sprinkler" variant="inline" /> — Automatic water-based suppression — hydrant ka automatic complement.</li>
          <li style={S.li}><TopicLink slug="vesda" variant="inline" /> — Early detection — hydrant activate hone se pehle ki line.</li>
          <li style={S.li}><TopicLink slug="fm200" variant="inline" /> — Clean agent suppression — hydrant ke aane se pehle kaam karta hai.</li>
        </ul>

      </ArticleLayout>
    </>
  );
}
