import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

export const metadata: Metadata = {
  title: "Containment — Hot Aisle & Cold Aisle Containment in Data Centers | Behind The Tech",
  description: "What is aisle containment, HAC vs CAC, how is it implemented, why is it essential — the most effective method to improve Data Center cooling efficiency.",
  keywords: ["aisle containment data center", "hot aisle containment", "cold aisle containment", "HAC CAC data center", "data center cooling efficiency"],
  openGraph: { title: "Containment — Aisle Containment in Data Centers", description: "Hot aisle and cold aisle containment — the most practical improvement in Data Center cooling efficiency.", url: "https://behindthetech.in/learn/non-it/cooling/containment", siteName: "Behind The Tech", type: "article", authors: ["Kumar Anil"], images: [SITE_OG_IMAGE], },
  twitter: { card: "summary_large_image", title: "Containment Explained — Behind The Tech", description: "Hot/Cold Aisle Containment — Data Center cooling improvement guide.", images: [SITE_OG_IMAGE.url], },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/cooling/containment",
    languages: {
      en: "https://behindthetech.in/learn/non-it/cooling/containment",
      hi: "https://behindthetech.in/hi/learn/non-it/cooling/containment",
      "x-default": "https://behindthetech.in/learn/non-it/cooling/containment",
    },
  },
};

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-containment",   text: "What Is Containment?",              level: 2 },
  { id: "why-needed",            text: "Why Is Containment Needed?",        level: 2 },
  { id: "working-principle",     text: "Working Principle",                 level: 2 },
  { id: "main-components",       text: "Main Components",                   level: 2 },
  { id: "how-it-works-in-dc",    text: "How Containment Works",             level: 2 },
  { id: "types",                 text: "Types of Containment",              level: 2 },
  { id: "advantages",            text: "Advantages",                        level: 2 },
  { id: "disadvantages",         text: "Disadvantages",                     level: 2 },
  { id: "real-example",          text: "Real Data Center Example",          level: 2 },
  { id: "common-faults",         text: "Common Issues",                     level: 2 },
  { id: "preventive-maintenance",text: "Preventive Maintenance",            level: 2 },
  { id: "daily-checklist",       text: "Daily Checklist",                   level: 2 },
  { id: "monthly-checklist",     text: "Monthly Checklist",                 level: 2 },
  { id: "safety",                text: "Safety Precautions",                level: 2 },
  { id: "interview-questions",   text: "Interview Questions",               level: 2 },
  { id: "troubleshooting",       text: "Troubleshooting",                   level: 2 },
  { id: "comparison",            text: "HAC vs CAC vs No Containment",      level: 2 },
  { id: "best-practices",        text: "Best Practices",                    level: 2 },
  { id: "key-takeaways",         text: "Key Takeaways",                     level: 2 },
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
    { label: "In one line", text: "Containment physically separates cool air and hot air — so that the two do not mix. This dramatically improves cooling efficiency." },
    { label: "The problem without containment", text: "The PAC/CRAC delivers cool air. Before the hot air comes back, it mixes with the cool air. The PAC has to work twice as hard — air that was already cooled got warm again." },
    { label: "Cold aisle containment (CAC)", text: "An enclosure is installed over the top and ends of the cold aisle. Cool air is captured there. Only the server intakes pull in the cool air. Hot air stays separate." },
    { label: "Hot aisle containment (HAC)", text: "An enclosure over the top and ends of the hot aisle. Hot air is captured. It returns directly to the PAC/CRAC or through a chimney. Cool air stays in the room." },
    { label: "How much improvement", text: "Containment can improve cooling efficiency by 30-50%. Fewer cooling units or higher setpoints for the same cooling load — significant energy savings." },
    { label: "Blanking panels", text: "Blanking panels are also essential with containment — block the empty rack spaces. So warm air does not come in from the front. Small thing, big impact." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>🚧 QUICK SUMMARY — 2 MINUTE READ</span>
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

const FAQS = [
  { q: "Which is better, CAC or HAC?", a: "Both are effective. HAC generally gives better cooling efficiency — hot air is directly captured and returned, and the room's cool air stays available for server intake. CAC is a little simpler to implement. Choose based on the existing layout, fire suppression requirements and cost. Many modern data centers prefer HAC." },
  { q: "Can the temperature setpoint be raised after containment?", a: "Yes — this is a major benefit. Without containment, the cold aisle needs 18-20°C because mixing happens. After containment, the cold aisle can be 24-26°C — server inlet still within spec. Higher setpoint = the PAC/CRAC works less = energy savings." },
  { q: "How does containment work with fire suppression?", a: "This is a real concern. In HAC the hot aisle is enclosed. The fire suppression agent must distribute properly in this enclosed space. FM200 or Novec — validate the design with an engineer. In some facilities the containment doors open automatically on a fire signal." },
  { q: "Why are blanking panels important with containment?", a: "Blanking panels seal the empty rack spaces. Without blanking panels, hot exhaust air can come back through the rack from the front — hot/cold mixing. Even with containment, blanking panels are essential — they ensure a perfect seal." },
  { q: "How is containment implemented on a raised floor?", a: "Downflow PAC/CRAC is used with a raised floor. The cold aisle has perforated tiles — cool air comes from here. In cold aisle containment: seal the top and ends of the cold aisle. Only the server intakes pull in the cool air — perfect separation." },
  { q: "Is it possible to retrofit containment in an existing data center?", a: "Yes — this is common practice. Retrofit containment systems are available — modular panels that fit on existing infrastructure. Planning is essential: power paths, cable management, fire suppression, emergency access. ROI is typically 1-3 years from energy savings." },
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

export default function ContainmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="containment" headings={HEADINGS} readingTimeMinutes={16} lang="en" alternateHref="/hi/learn/non-it/cooling/containment">

        <p style={S.p}>The PAC delivers cold air. The CRAC delivers cold air.</p>
        <p style={S.p}>But this cold air does not go straight into the server — it first goes into the room, mixes there with warm air, and then the mixed (warmer) air goes into the server.</p>
        <p style={S.p}>This means: the PAC delivered 18°C air. After mixing in the room, the server is getting 24°C air.</p>
        <p style={S.p}>The PAC is working extra hard — and the server is still getting warm air.</p>
        <p style={S.p}><strong>Solution: Containment — physically separate the cool air and the hot air.</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/containment/aisle-containment-data-center.png" alt="Cold aisle containment with clear panels above server racks" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Cold Aisle Containment — transparent panels are installed over the top and ends of the cold aisle. Cool air stays enclosed.</figcaption>
        </figure>

        <QuickSummary />

        <hr style={S.divider} />

        <h2 id="what-is-containment" style={S.h1}>What Is Containment?</h2>

        <p style={S.p}><strong>Containment = a physical barrier that keeps cool air and hot air separate.</strong></p>
        <p style={S.p}>In a data center, server racks are installed in rows. There are aisles between the racks.</p>
        <p style={S.p}><strong>Cold Aisle:</strong> Where the PAC/CRAC delivers cool air. The front of the servers faces here.</p>
        <p style={S.p}><strong>Hot Aisle:</strong> Where servers exhaust warm air. The back of the servers faces here.</p>
        <p style={S.p}>Without containment, the air of both aisles mixes freely — inefficiency.</p>
        <p style={S.p}>With containment: cool air and hot air stay in separate channels — efficiency improves dramatically.</p>

        <DCMapNote components={["Cold Aisle Containment", "Hot Aisle Containment", "Blanking Panels", "Cage Doors", "Chimney Containment"]} />

        <hr style={S.divider} />

        <h2 id="why-needed" style={S.h1}>Why Is Containment Needed?</h2>

        <p style={S.p}>Understand the mixing problem practically:</p>

        <InsightCard>
          What happens without containment: the PAC delivers 15°C air into the cold aisle. The server exhausts hot air (35°C) into the hot aisle. This hot air meets the cool air on the return path. The actual temperature at the server intake: 22-25°C. The PAC had to cool to 15°C because there was 7-10°C of mixing inefficiency. With containment, the PAC would cool to 22°C — the same server inlet temperature. Less cooling work = less energy.
        </InsightCard>

        <WhyThisMatters>
          According to Gartner research (referenced in ASHRAE guidelines), data centers globally waste 30-40% of their cooling capacity on air mixing. By implementing containment: cooling capacity effectively improves by 30-50% without installing new cooling units. Existing PAC/CRAC can handle more load. Temperature setpoints can be raised — further energy savings.
        </WhyThisMatters>

        <hr style={S.divider} />

        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>The principle of containment is simple: <strong>Keep cold air cold. Keep hot air hot. Never let them mix.</strong></p>
        <p style={S.p}>This is achieved with physical barriers:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Overhead panels:</strong> Above the aisles — seal up to the ceiling</li>
          <li style={S.li}><strong>End-of-row doors:</strong> Close off the ends of the aisle</li>
          <li style={S.li}><strong>Blanking panels:</strong> Seal the empty spaces in the rack</li>
          <li style={S.li}><strong>Raised floor sealing:</strong> Proper tile placement — cool air only in the cold aisle</li>
        </ul>
        <p style={S.p}>Result: cool air is kept in a closed system to reach the servers. Hot air is collected separately and returns through the PAC/CRAC or a chimney.</p>

        <hr style={S.divider} />

        <h2 id="main-components" style={S.h1}>Main Components</h2>

        <h3 style={S.h3}>1. Overhead Panels (Ceiling Panels)</h3>
        <p style={S.p}>Installed above the aisle — they seal the gap from the rack tops to the actual ceiling. Rigid polycarbonate or metal panels. Transparent in some designs — visual access is maintained. Consider fire suppression compatibility.</p>

        <h3 style={S.h3}>2. End-of-Row Doors</h3>
        <p style={S.p}>At both ends of the aisle. They have cutouts for cable management. Hinged or sliding — for access. They must comply with emergency exit requirements. Some designs are automatic — they open on a fire signal.</p>

        <h3 style={S.h3}>3. Blanking Panels</h3>
        <p style={S.p}>They fit in the empty 1U, 2U spaces of the rack. They stop hot air from coming through the rack from the front. Cheap but highly effective — this is essential. Different blanking panels are available for different rack sizes.</p>

        <h3 style={S.h3}>4. Raised Floor Tiles</h3>
        <p style={S.p}>Perforated tiles in the cold aisle — for cool air to come out. Solid tiles in the hot aisle — do not let cool air come out. Proper tile placement is part of containment.</p>

        <h3 style={S.h3}>5. Cable Management</h3>
        <p style={S.p}>Inside containment, cables should be properly managed. Proper brush strips or foam seals at cable cutouts — maintain an airtight seal.</p>

        <hr style={S.divider} />

        <h2 id="how-it-works-in-dc" style={S.h1}>How Containment Works</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/containment/hot-cold-aisle-airflow.png" alt="Hot aisle and cold aisle airflow with containment showing separation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Containment with clearly separated hot and cold air streams — zero mixing between aisles.</figcaption>
        </figure>

        <h3 style={S.h3}>Without Containment</h3>
        <p style={S.p}>Cool air → cold aisle → server intakes → some cool air bypasses → hot aisle → mixing in the room → PAC return → cool again. An inefficient loop.</p>

        <h3 style={S.h3}>With Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Cool air → enclosed cold aisle → only the server intakes can pull it (it cannot go to the side) → through the servers → hot aisle (open) → PAC/CRAC return. Zero mixing in the cold aisle.</p>

        <h3 style={S.h3}>With Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Room = cool air everywhere (open space). Servers pull cool air from the front. Warm exhaust → enclosed hot aisle → directly into the PAC/CRAC or an overhead chimney. Zero mixing in the hot aisle. There is only cool air in the room — even any server failure is covered.</p>

        <EngineerTip>
          HAC is preferred in large data centers because: there is cool air everywhere in the room. If a rack accidentally faces the wrong way, or a blanking panel is missing, that server still gets cool air (it is in the room). In CAC a missing blanking panel = hot air directly into the server intake — a worse failure mode. HAC is more forgiving operationally.
        </EngineerTip>

        <hr style={S.divider} />

        <h2 id="types" style={S.h1}>Types of Containment</h2>

        <h3 style={S.h3}>1. Cold Aisle Containment (CAC)</h3>
        <p style={S.p}>Enclose the cold aisle. Overhead panels + end doors. Cool air is trapped — only the server intakes can pull it. The hot aisle stays open — hot air freely mixes with the room and returns to the PAC. Simpler to implement. Common in smaller facilities.</p>

        <h3 style={S.h3}>2. Hot Aisle Containment (HAC)</h3>
        <p style={S.p}>Enclose the hot aisle. Overhead panels + end doors. Hot air is trapped — directly to the PAC/CRAC return or an overhead chimney. The room is completely in cool air. Preferred in large data centers. Better fire safety (sprinklers in the hot aisle enclosed space — get it right).</p>

        <h3 style={S.h3}>3. Chimney Containment</h3>
        <p style={S.p}>Per-rack chimneys. Hot air goes directly upward into the ceiling plenum or an overhead return duct. No overhead aisle enclosure — flexible. Works very well with in-row cooling. For high-density environments.</p>

        <h3 style={S.h3}>4. Full Room Isolation</h3>
        <p style={S.p}>The entire room is sealed. Separate supply (cold) plenum and return (hot) plenum. Usually with a raised floor + overhead return. Maximum efficiency — minimum mixing. In large hyperscale facilities.</p>

        <hr style={S.divider} />

        <h2 id="advantages" style={S.h1}>Advantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Cooling efficiency 30-50% improve:</strong> Same cooling units, more effective cooling</li>
          <li style={S.li}><strong>Higher temperature setpoints:</strong> Raise the PAC/CRAC setpoint — save energy</li>
          <li style={S.li}><strong>Reduced cooling capacity needed:</strong> Existing units can handle more load</li>
          <li style={S.li}><strong>Better RCI:</strong> The Rack Cooling Index improves — uniform cooling</li>
          <li style={S.li}><strong>Hot spots eliminated:</strong> Without mixing, specific hot spots are not created</li>
          <li style={S.li}><strong>PUE improvement:</strong> Cooling energy reduction = better Power Usage Effectiveness</li>
          <li style={S.li}><strong>Retrofit possible:</strong> Can be implemented in existing data centers</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="disadvantages" style={S.h1}>Disadvantages</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fire suppression complexity:</strong> Fire agent distribution in an enclosed aisle — engineering required</li>
          <li style={S.li}><strong>Cable management:</strong> Managing cables through containment panels can be tricky</li>
          <li style={S.li}><strong>Upfront cost:</strong> Panels, doors, installation — investment is needed</li>
          <li style={S.li}><strong>Reduced flexibility:</strong> Containment will have to be modified for layout changes</li>
          <li style={S.li}><strong>Cooling failure risk (CAC):</strong> If the PAC fails and the cold aisle is enclosed, the temperature will rise rapidly</li>
          <li style={S.li}><strong>Maintenance access:</strong> In some containment designs, work access is limited</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="real-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}><strong>Before containment:</strong> 100-rack data center, 10 PAC units (20 kW each = 200 kW total). Server inlet temperatures: 24-32°C — hot spots present. PAC supply temperature: 16°C.</p>
        <p style={S.p}><strong>Containment implemented:</strong> Hot aisle containment (HAC) with chimney. Blanking panels all empty rack spaces.</p>
        <p style={S.p}><strong>After containment:</strong> Same 10 PAC units. PAC supply temperature raised to 21°C. Server inlet temperatures: 22-26°C — uniform. Hot spots eliminated. 2 PAC units now standby — 8 handle same load. Estimated energy savings: 25% cooling energy.</p>

        <hr style={S.divider} />

        <h2 id="common-faults" style={S.h1}>Common Issues</h2>

        <h3 style={S.h3}>Bypass Air (Air Bypass)</h3>
        <p style={S.p}>Cool air is going into the room without reaching the racks. Cause: Missing blanking panels, gaps in containment, improper floor tiles. Action: Air leakage audit, install blanking panels, seal the gaps.</p>

        <h3 style={S.h3}>Recirculation</h3>
        <p style={S.p}>Hot exhaust air is going back into the server intake. Cause: Containment damage, end door open, missing panels. Action: Inspect containment integrity, do temperature mapping.</p>

        <h3 style={S.h3}>Containment Panel Damage</h3>
        <p style={S.p}>Cause: Physical damage during installation/maintenance, material degradation. Impact: Air mixing at damage points. Action: Visual inspection, replace damaged panels.</p>

        <h3 style={S.h3}>Fire Suppression Issue</h3>
        <p style={S.p}>Cause: FM200/Novec nozzles not covering enclosed aisle. Impact: Fire suppression ineffective if fire in contained aisle. Action: Fire engineer review — containment + suppression design together.</p>

        <hr style={S.divider} />

        <h2 id="preventive-maintenance" style={S.h1}>Preventive Maintenance</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Monthly:</strong> All blanking panels present — walk every row, visually check</li>
          <li style={S.li}><strong>Monthly:</strong> Containment panels — cracks, gaps, seal integrity</li>
          <li style={S.li}><strong>Monthly:</strong> End doors — closing properly, seals intact</li>
          <li style={S.li}><strong>Quarterly:</strong> Floor tiles — correct placement (perforated in cold aisle only)</li>
          <li style={S.li}><strong>Quarterly:</strong> Cable cutout seals — brush strips or foam intact</li>
          <li style={S.li}><strong>Semi-annual:</strong> Thermal survey — temperature mapping confirm containment working</li>
          <li style={S.li}><strong>Annual:</strong> Full containment audit — have any new racks created gaps?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="daily-checklist" style={S.h1}>Daily Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Cold aisle temperatures — uniformly cool (within 2-3°C variation)?</li>
          <li style={S.li}>✓ Hot aisle temperatures — hot but contained?</li>
          <li style={S.li}>✓ Any obvious containment damage visible?</li>
          <li style={S.li}>✓ End doors closed (except during maintenance)?</li>
          <li style={S.li}>✓ BMS hot spot alarms?</li>
          <li style={S.li}>✓ New equipment installed recently — blanking panels still in place?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="monthly-checklist" style={S.h1}>Monthly Checklist</h2>
        <ul style={S.ul}>
          <li style={S.li}>✓ Walk every row — count the blanking panels</li>
          <li style={S.li}>✓ Panel seal integrity — check for gaps</li>
          <li style={S.li}>✓ Verify floor tile placement</li>
          <li style={S.li}>✓ Cable cutout seals intact?</li>
          <li style={S.li}>✓ Temperature uniformity verify — spot check multiple racks</li>
          <li style={S.li}>✓ Any new racks added — does containment accommodate them?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="safety" style={S.h1}>Safety Precautions</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Fire suppression review:</strong> Check with a fire engineer before changing containment</li>
          <li style={S.li}><strong>Emergency egress:</strong> Clear emergency exit paths in contained aisles — doors with panic hardware</li>
          <li style={S.li}><strong>Working in contained space:</strong> Temperature is high in the hot aisle — short duration, keep water with you, buddy system</li>
          <li style={S.li}><strong>Cooling failure plan:</strong> If cooling fails and the aisle is enclosed — temperature rises rapidly. Consider automatic door open systems</li>
          <li style={S.li}><strong>Panel installation:</strong> Ladder and safety for above-rack work — handle heavy panels carefully</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="interview-questions" style={S.h1}>Interview Questions</h2>

        <h3 style={S.h3}>Q1: What is the difference between hot aisle containment and cold aisle containment?</h3>
        <p style={S.p}><strong>Answer:</strong> CAC (Cold Aisle Containment) encloses the cold aisle — cool air reaches the servers directly. The hot aisle stays open. HAC (Hot Aisle Containment) encloses the hot aisle — it captures hot air and sends it directly to the PAC return. There is cool air everywhere in the room. HAC is operationally safer — every rack has access to cool air.</p>

        <h3 style={S.h3}>Q2: How does containment improve RCI?</h3>
        <p style={S.p}><strong>Answer:</strong> RCI (Rack Cooling Index) measures whether servers are getting cool air within the recommended temperature range. Without containment, hot/cold mixing makes some servers pull in warm air — low RCI. Containment ensures every server pulls in only cool air. RCI gets close to 100% with containment.</p>

        <h3 style={S.h3}>Q3: Why are blanking panels important?</h3>
        <p style={S.p}><strong>Answer:</strong> Hot exhaust air can recirculate back to the front through the empty spaces of the rack — the server intake gets hot air. Blanking panels stop this short circuit. Simple, cheap, but critical. Installing blanking panels is best practice even without containment.</p>

        <h3 style={S.h3}>Q4: How is fire suppression designed with containment?</h3>
        <p style={S.p}><strong>Answer:</strong> This is a critical question. The fire suppression agent (FM200/Novec) must distribute properly in an enclosed aisle. Calculate the FM200 nozzles for the contained aisle volume. In some designs: on a fire signal, the containment doors open automatically and the agent is discharged into the whole room. Fire engineer involvement is mandatory — the containment and suppression design must be integrated.</p>

        <hr style={S.divider} />

        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <h3 style={S.h3}>Hot spots developing despite containment</h3>
        <ul style={S.ul}>
          <li style={S.li}>Walk for missing blanking panels — visually check every rack</li>
          <li style={S.li}>Floor tile placement — are perforated tiles in the hot aisle?</li>
          <li style={S.li}>Containment panel gaps — detect air leakage with a smoke test or hand test</li>
          <li style={S.li}>End doors — closed properly?</li>
          <li style={S.li}>New rack added recently — containment disturbed?</li>
        </ul>

        <h3 style={S.h3}>Cold aisle temperature suddenly increased</h3>
        <ul style={S.ul}>
          <li style={S.li}>PAC/CRAC status — all running?</li>
          <li style={S.li}>Check for containment breach</li>
          <li style={S.li}>IT load increased — more heat generation?</li>
          <li style={S.li}>Floor tile displaced — cold air not entering cold aisle?</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>HAC vs CAC vs No Containment</h2>

        <div style={{ overflowX: "auto" as const, margin: "20px 0 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "var(--font-body)", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "rgba(37,99,235,0.06)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>Feature</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>HAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#2563EB", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>CAC</th>
                <th style={{ padding: "10px 14px", textAlign: "left" as const, color: "#1f2937", fontWeight: 600, border: "1px solid rgba(37,99,235,0.12)" }}>No Containment</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Efficiency gain", "30-50%", "25-40%", "Baseline"],
                ["Air mixing", "Minimal", "Minimal", "High"],
                ["Room temperature", "Cool everywhere", "Hot/cool mix", "Mixed"],
                ["Operational safety", "High (cool room)", "Medium", "Lower"],
                ["Fire suppression", "Needs engineering", "Simpler", "Standard"],
                ["Implementation cost", "Medium", "Medium", "Zero"],
                ["Retrofit ease", "Medium", "Easier", "N/A"],
                ["Best for", "Large DC, new builds", "Small-medium, retrofit", "Legacy only"],
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
          <li style={S.li}><strong>100% blanking panels first:</strong> It is free and gives the biggest impact. Install blanking panels even before containment.</li>
          <li style={S.li}><strong>Floor tiles audit:</strong> Perforated tiles only in the cold aisle — solid tiles in the hot aisle and in front of the PAC.</li>
          <li style={S.li}><strong>Prefer HAC in new designs:</strong> Better operational safety, more uniform cooling.</li>
          <li style={S.li}><strong>Involve the fire engineer early:</strong> Containment + fire suppression design together — modifying later is expensive.</li>
          <li style={S.li}><strong>Raise the temperature setpoint after containment:</strong> This is what actually realizes the energy savings.</li>
          <li style={S.li}><strong>Do thermal mapping before and after:</strong> Measure and document the improvement.</li>
          <li style={S.li}><strong>Integrate cable management:</strong> Cable cutouts in containment panels should be properly sealed.</li>
        </ul>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "Containment physically separates cool air and hot air — mixing is eliminated.",
          "HAC = enclose the hot aisle. CAC = enclose the cold aisle. Both are effective — HAC is operationally safer.",
          "Benefit: 30-50% cooling efficiency improvement, higher temperature setpoints, better RCI.",
          "Blanking panels are essential — they are the foundation of containment. Install them first.",
          "Involve the fire suppression engineer in the design with containment — critical.",
          "Daily: temperature uniformity, door status. Monthly: blanking panels, panel integrity, tile placement.",
          "Retrofit is possible — it can be implemented in existing data centers. ROI is typically 1-3 years.",
        ]} />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

        <hr style={S.divider} />

        <h2 style={S.h2}>Related Learning Topics</h2>
        <p style={S.p}>Containment is clear. Complete airflow management and cooling metrics:</p>
        <ul style={S.ul}>
          <li style={S.li}><TopicLink slug="airflow-management" variant="inline" /> — the complete airflow strategy along with containment.</li>
          <li style={S.li}><TopicLink slug="rci" variant="inline" /> — measuring containment effectiveness — the RCI metric.</li>
          <li style={S.li}><TopicLink slug="pac" variant="inline" /> — how containment interacts with the PAC and CRAC.</li>
          <li style={S.li}><TopicLink slug="chiller" variant="inline" /> — the centralized cooling system that uses containment with the CRAH.</li>
        </ul>
      </ArticleLayout>
    </>
  );
}
