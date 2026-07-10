import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Grid Supply: Data Center Tak Electricity Kaise Pahunchti Hai — Behind The Tech",
  description:
    "Power plant se server rack tak electricity ka safar — Grid Supply, HT vs LT, Dual Grid Feed aur Grid failure ke time kya hota hai. Simple Hinglish mein samjho.",
  keywords: [
    "grid supply data center",
    "data center electricity",
    "ht supply data center",
    "dual grid feed",
    "power infrastructure data center",
    "electrical grid data center",
    "grid supply hindi",
    "behind the tech",
  ],
  openGraph: {
    title: "Grid Supply: Data Center Tak Electricity Kaise Pahunchti Hai",
    description:
      "Power plant se server rack tak poori electrical journey — Grid Supply, HT connection, Dual Feed aur Grid failure backup simple Hinglish mein.",
    url: "https://behindthetech.in/learn/non-it/electrical/grid-supply",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2025-01-01",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grid Supply Explained — Behind The Tech",
    description: "Data Center tak electricity ka safar — Grid se server rack tak, simple Hinglish mein.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/grid-supply",
  },
};

// ─── TOC headings (FAQ excluded per gold-standard pattern) ───────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-grid-supply",              text: "What Is Grid Supply?",              level: 2 },
  { id: "where-does-power-come-from",       text: "Where Does Data Center Power Come From?", level: 2 },
  { id: "power-generation-to-data-center",  text: "Power Generation To Data Center",   level: 2 },
  { id: "ht-vs-lt-supply",                  text: "HT vs LT Supply",                   level: 2 },
  { id: "dual-grid-feed",                   text: "Dual Grid Feed",                    level: 2 },
  { id: "grid-failure-scenario",            text: "Grid Failure — Kya Hota Hai?",      level: 2 },
  { id: "common-challenges",                text: "Common Challenges",                 level: 2 },
  { id: "future-of-grid-supply",            text: "Future Of Grid Supply",             level: 2 },
  { id: "key-takeaways",                    text: "Key Takeaways",                     level: 2 },
];

// ─── Shared inline styles (identical tokens to flagship articles) ────────────

const S = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,

  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.2,
    marginTop: 56,
    marginBottom: 14,
  } as React.CSSProperties,

  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#111827",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
  } as React.CSSProperties,

  p: {
    marginBottom: 16,
    color: "#1f2937",
  } as React.CSSProperties,

  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,

  li: {
    color: "#1f2937",
    lineHeight: 1.65,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: "1px solid rgba(37,99,235,0.08)",
    margin: "12px 0",
  } as React.CSSProperties,

  learnMore: {
    margin: "10px 0 4px",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  cardWrap: {
    position: "relative" as const,
    borderRadius: 10,
    overflow: "hidden" as const,
    margin: "28px 0",
  } as React.CSSProperties,

  cardAccentBlue: {
    height: 2,
    background: "#2563EB",
  } as React.CSSProperties,

  cardBodyInsight: {
    background: "rgba(37,99,235,0.035)",
    border: "1px solid rgba(37,99,235,0.16)",
    borderTop: "none",
    padding: "18px 22px 20px",
  } as React.CSSProperties,

  cardLabel: {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.22em",
    fontWeight: 600,
    marginBottom: 10,
  } as React.CSSProperties,

  cardContent: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#1f2937",
  } as React.CSSProperties,

  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(37,99,235,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,

  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, #2563EB, #2563EB)",
  } as React.CSSProperties,

  takeawayBody: {
    padding: "22px 24px 24px",
  } as React.CSSProperties,

  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "#2563EB",
    fontWeight: 600,
    marginBottom: 16,
  } as React.CSSProperties,

  takeawayList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  } as React.CSSProperties,

  takeawayItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  } as React.CSSProperties,

  takeawayCheck: {
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 4,
    background: "rgba(0,255,204,0.12)",
    border: "1px solid rgba(0,255,204,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  } as React.CSSProperties,

  takeawayText: {
    fontFamily: "var(--font-body)",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "#1f2937",
  } as React.CSSProperties,

  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(37,99,235,0.12)",
  } as React.CSSProperties,

  imageFigure: {
    margin: "8px 0 24px",
  } as React.CSSProperties,

  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "#1f2937",
    textAlign: "center" as const,
    marginTop: 8,
  } as React.CSSProperties,
} as const;

// ─── InsightCard ──────────────────────────────────────────────────────────────

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

// ─── KeyTakeawayCard ──────────────────────────────────────────────────────────

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={S.takeawayCard}>
      <div style={S.takeawayAccent} />
      <div style={S.takeawayBody}>
        <span style={S.takeawayLabel}>KEY TAKEAWAYS</span>
        <ul style={S.takeawayList}>
          {items.map((item, i) => (
            <li key={i} style={S.takeawayItem}>
              <span style={S.takeawayCheck}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={S.takeawayText}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FlowDiagram — sequential step diagram (same RequestFlowDiagram pattern) ──

interface FlowStep {
  icon: string;
  label: string;
  sublabel?: string;
}

function FlowDiagram({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div
        style={{
          borderRadius: 10,
          background: "rgba(37,99,235,0.025)",
          border: "1px solid rgba(37,99,235,0.10)",
          padding: "22px 20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 86,
                  textAlign: "center",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(37,99,235,0.08)",
                    border: "1px solid rgba(37,99,235,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                  }}
                >
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>
                    {step.sublabel}
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "#2563EB",
                    margin: "0 4px",
                    opacity: 0.7,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
    </figure>
  );
}

// ─── ComparisonCard ───────────────────────────────────────────────────────────

function ComparisonCard({
  tag,
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: {
  tag: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        background: "rgba(37,99,235,0.03)",
        border: "1px solid rgba(37,99,235,0.12)",
        overflow: "hidden",
        margin: "20px 0 32px",
      }}
    >
      <div style={{ height: 2, background: "#2563EB", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#2563EB",
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          {tag}
        </span>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: 8,
              }}
            >
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#2563EB",
                marginBottom: 8,
              }}
            >
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Grid Supply kya hoti hai?",
    a: "Grid Supply woh electrical network hai jo power generation stations se electricity lekar consumers — homes, offices, hospitals aur Data Centers — tak pahunchata hai.",
  },
  {
    q: "Data Centers HT Supply kyu use karte hain?",
    a: "High-tension supply current demand ko kam karta hai, jisse transmission losses reduce hote hain, cable size chhhota hota hai aur overall efficiency improve hoti hai.",
  },
  {
    q: "Dual Grid Feed kya hota hai?",
    a: "Do independent electricity sources se Data Center ko feed karna — agar ek source fail ho jaye to doosra active rehta hai, is tarah reliability ensure ki jati hai.",
  },
  {
    q: "Grid failure ke time Data Center ka kya hota hai?",
    a: "UPS milliseconds me load pick kar leta hai, battery backup temporary energy provide karta hai aur DG Set automatically start hokar load sambhal leta hai — operations uninterrupted rehte hain.",
  },
  {
    q: "Harmonics kya hote hain aur ye kyu problem hote hain?",
    a: "Harmonics unwanted electrical frequencies hoti hain jo power waveform ko distort karti hain. Ye transformers, cables aur UPS performance ko negatively impact karte hain.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(37,99,235,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>
            {item.q}
          </p>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GridSupplyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticleLayout
        slug="grid-supply"
        headings={HEADINGS}
        readingTimeMinutes={10}
      >

        <p style={S.p}>Jab bhi hum Data Center ki baat karte hain, to aksar focus servers, storage, networking aur cloud infrastructure par chala jata hai.</p>
        <p style={S.p}>Lekin ek simple sa sawal hai:</p>
        <p style={S.p}><strong>Agar electricity hi na ho, to kya Data Center ka koi bhi equipment kaam kar payega?</strong></p>
        <p style={S.p}>Answer hai — nahi.</p>
        <p style={S.p}>Chahe duniya ka sabse powerful AI Data Center ho, hyperscale cloud facility ho ya ek chhota enterprise Data Center, sabki foundation electricity par tikki hoti hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/grid-supply-overview.png"
              alt="Grid Supply Overview — electricity journey from power plant to Data Center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Grid Supply — Data Center electrical chain ka starting point.
          </figcaption>
        </figure>

        <p style={S.p}>Lekin electricity directly power plant se server rack tak nahi pahunchti. Beech me ek poora electrical ecosystem kaam karta hai.</p>
        <p style={S.p}>Power generation station se nikalne wali electricity:</p>
        <ul style={S.ul}>
          <li style={S.li}>Transmission Network</li>
          <li style={S.li}>Grid Infrastructure</li>
          <li style={S.li}>Substations</li>
          <li style={S.li}>HT Distribution</li>
          <li style={S.li}>RMU</li>
          <li style={S.li}>Transformers</li>
          <li style={S.li}>LT Panels</li>
          <li style={S.li}>UPS Systems</li>
          <li style={S.li}>PDUs</li>
        </ul>
        <p style={S.p}>se hokar finally server rack tak pahunchti hai.</p>
        <p style={S.p}>Agar is chain ka koi bhi component fail ho jaye, to Data Center operations impact ho sakte hain. Isi wajah se Data Centers power reliability ko lekar normal commercial buildings se kaafi alag approach adopt karte hain.</p>

        <hr style={S.divider} />

        <h2 id="what-is-grid-supply" style={S.h1}>What Is Grid Supply?</h2>

        <p style={S.p}>Simple language me samjhen to Grid Supply woh electrical network hai jo power generation stations se electricity lekar consumers tak pahunchata hai.</p>
        <p style={S.p}>Ye consumers ho sakte hain:</p>
        <ul style={S.ul}>
          <li style={S.li}>Homes</li>
          <li style={S.li}>Offices</li>
          <li style={S.li}>Hospitals</li>
          <li style={S.li}>Airports</li>
          <li style={S.li}>Factories</li>
          <li style={S.li}>Data Centers</li>
        </ul>
        <p style={S.p}>Jab aap ghar me switch on karte ho aur light jalti hai, to uske peeche poora electrical grid kaam kar raha hota hai.</p>
        <p style={S.p}>India me electrical grid ek interconnected network hai. Is network me thermal power plants, hydro projects, solar farms aur wind energy stations sab milkar electricity generate karte hain. Ye electricity transmission network ke through poore desh me distribute ki jati hai.</p>
        <p style={S.p}>Data Center bhi isi grid se power receive karta hai — lekin Data Center ki requirement normal building se kaafi alag hoti hai.</p>

        <InsightCard>
          Ek office me 5 minute ka power cut sirf inconvenience create karta hai. Lekin Data Center me kuch seconds ka interruption bhi thousands ya millions of users ko affect kar sakta hai. Isi wajah se Grid Supply Data Center design ka starting point hoti hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="where-does-power-come-from" style={S.h1}>Where Does Data Center Power Come From?</h2>

        <p style={S.p}>Bahut log sochte hain ki Data Center ki electricity directly local electricity board se aati hai. Reality thodi zyada interesting hai.</p>
        <p style={S.p}>Electricity ko Data Center tak pahunchne ke liye ek lambi journey complete karni padti hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/power-generation-to-data-center.png"
              alt="Power Generation to Data Center — complete electricity journey"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Power Plant se Data Center tak — ek lambi journey.
          </figcaption>
        </figure>

        <FlowDiagram
          caption="Typical power flow — generation to Data Center entry"
          steps={[
            { icon: "🏭", label: "Power Plant" },
            { icon: "🔌", label: "Transmission Network", sublabel: "High Voltage" },
            { icon: "⚡", label: "Substation" },
            { icon: "🏗️", label: "Distribution Network" },
            { icon: "🏢", label: "Data Center" },
          ]}
        />

        <p style={S.p}>Sabse pehle electricity power plant me generate hoti hai. Uske baad high-voltage transmission lines ke through long distances tak transport ki jati hai. Transmission network se electricity substations tak pahunchti hai, jo voltage ko required level par convert karte hain aur distribution network ko feed karte hain.</p>
        <p style={S.p}>Phir distribution network Data Center ko supply provide karta hai — yahi point Data Center electrical journey ka actual starting point hota hai.</p>
        <p style={S.p}>Aage power <TopicLink slug="ht-yard" label="HT Yard" variant="inline" />, <TopicLink slug="rmu" label="RMU" variant="inline" /> aur <TopicLink slug="transformer" label="Transformer" variant="inline" /> jaise systems se hokar guzarti hai.</p>

        <hr style={S.divider} />

        <h2 id="power-generation-to-data-center" style={S.h1}>Power Generation Se Data Center Tak Ki Journey</h2>

        <p style={S.p}>Power flow ko step-by-step samajhte hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/transmission-network.png"
              alt="Transmission Network — high voltage lines carrying electricity across long distances"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Transmission Network — high voltage lines jo electricity ko long distances tak transport karti hain.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Step 1: Power Generation</h3>
        <p style={S.p}>Electricity generate hoti hai: Thermal Power Plants, Hydro Power Plants, Solar Farms, Wind Farms, Gas-Based Power Plants. Yahan electrical energy produce ki jati hai.</p>

        <h3 style={S.h3}>Step 2: Transmission Network</h3>
        <p style={S.p}>Electricity ko long distance transport karne ke liye voltage increase kiya jata hai. India me commonly 132 kV, 220 kV, 400 kV aur 765 kV transmission systems use hote hain. High voltage ka purpose transmission losses ko reduce karna hota hai.</p>

        <h3 style={S.h3}>Step 3: Grid Substation</h3>
        <p style={S.p}>Substation power system ka traffic controller hota hai. Yahan voltage transformation, switching aur protection activities perform ki jati hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/substation-power-flow.png"
              alt="Substation Power Flow — voltage transformation and switching operations"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Grid Substation — power system ka traffic controller.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Step 4: Distribution Network</h3>
        <p style={S.p}>Substation se electricity industrial consumers aur commercial facilities tak distribute ki jati hai.</p>

        <h3 style={S.h3}>Step 5: Data Center Entry Point</h3>
        <p style={S.p}>Yahan se power Data Center campus me enter karti hai. Ab incoming power ko safely handle karne ka kaam <TopicLink slug="ht-yard" label="HT Yard" variant="inline" /> aur <TopicLink slug="rmu" label="RMU" variant="inline" /> systems karte hain.</p>

        <hr style={S.divider} />

        <h2 id="ht-vs-lt-supply" style={S.h1}>HT vs LT Supply: Data Centers High Voltage Kyu Use Karte Hain?</h2>

        <p style={S.p}>Normal buildings generally LT Supply receive karti hain — Low Tension. Common examples hain 230V Single Phase aur 415V Three Phase.</p>
        <p style={S.p}>Lekin Data Centers ki power requirement bahut zyada hoti hai. Isi wajah se wo generally HT Supply prefer karte hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/ht-vs-lt-supply.png"
              alt="HT vs LT Supply — high tension versus low tension comparison for Data Centers"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            HT vs LT Supply — Data Centers kyun high voltage prefer karte hain.
          </figcaption>
        </figure>

        <ComparisonCard
          tag="Supply Comparison"
          leftTitle="LT Supply — Normal Buildings"
          leftItems={["230V Single Phase", "415V Three Phase", "Direct from local board", "Small scale usage"]}
          rightTitle="HT Supply — Data Centers"
          rightItems={["11 kV", "33 kV", "66 kV", "Direct HT connection"]}
        />

        <p style={S.p}>High voltage use karne ka sabse bada advantage hai lower current requirement. Current kam hone se losses kam hote hain, cable size reduce hota hai, efficiency improve hoti hai aur power transfer easier ho jati hai.</p>
        <p style={S.p}>Isi liye Data Centers direct HT connection lete hain aur phir <TopicLink slug="transformer" label="Transformer" variant="inline" /> ke through voltage ko required level par convert karte hain.</p>

        <hr style={S.divider} />

        <h2 id="dual-grid-feed" style={S.h1}>Why Data Centers Use Dual Grid Feeds</h2>

        <p style={S.p}>Mission-critical facilities single electrical source par depend nahi karti.</p>
        <p style={S.p}>Maan lo ek feeder fault ho jaye. Ya transmission line damage ho jaye. Ya substation me fault aa jaye. Agar sirf ek source available ho to poora Data Center impact ho sakta hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/dual-grid-feed.png"
              alt="Dual Grid Feed — two independent power sources feeding a Data Center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Dual Grid Feed — ek source fail ho to doosra active rehta hai.
          </figcaption>
        </figure>

        <p style={S.p}>Isi liye enterprise Data Centers generally Dual Grid Feed architecture use karte hain.</p>

        <FlowDiagram
          caption="Dual Grid Feed architecture — redundant power at the first layer"
          steps={[
            { icon: "⚡", label: "Source A", sublabel: "Primary Grid" },
            { icon: "🏢", label: "Data Center" },
            { icon: "⚡", label: "Source B", sublabel: "Secondary Grid" },
          ]}
        />

        <p style={S.p}>Agar ek source fail ho jaye to doosra source available rehta hai. Ye Data Center redundancy ki first layer hoti hai. Uske baad backup layers me <TopicLink slug="ups" label="UPS System" variant="inline" />, <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> aur <TopicLink slug="dg-set" label="DG Set" variant="inline" /> ka role aata hai.</p>

        <hr style={S.divider} />

        <h2 id="grid-failure-scenario" style={S.h1}>What Happens During Grid Failure?</h2>

        <p style={S.p}>Ab ek real-world Data Center scenario dekhte hain. Maan lo Grid Supply suddenly fail ho jati hai. Ab kya hoga?</p>
        <p style={S.p}>Agar backup infrastructure na ho to servers shutdown ho sakte hain, network services unavailable ho sakti hain, applications crash ho sakti hain.</p>
        <p style={S.p}>Lekin Data Centers isi situation ke liye design kiye jate hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/grid-failure-scenario.png"
              alt="Grid Failure Scenario — UPS, Battery Bank and DG Set backup sequence"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Grid failure ke baad backup sequence — milliseconds se seconds tak ka handover.
          </figcaption>
        </figure>

        <FlowDiagram
          caption="Grid failure response sequence"
          steps={[
            { icon: "❌", label: "Grid Fails" },
            { icon: "🔋", label: "UPS Takes Over", sublabel: "Milliseconds" },
            { icon: "⚡", label: "Battery Support" },
            { icon: "🔧", label: "DG Starts" },
            { icon: "✅", label: "Operations Continue" },
          ]}
        />

        <h3 style={S.h3}>Step 1: Grid Failure</h3>
        <p style={S.p}>Primary source unavailable ho jata hai.</p>

        <h3 style={S.h3}>Step 2: UPS Takes Over</h3>
        <p style={S.p}><TopicLink slug="ups" label="UPS System" variant="inline" /> milliseconds me load pick kar leta hai. IT equipment ko interruption feel nahi hoti.</p>

        <h3 style={S.h3}>Step 3: Battery Support</h3>
        <p style={S.p}><TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> UPS ko temporary energy provide karta hai.</p>

        <h3 style={S.h3}>Step 4: DG Start</h3>
        <p style={S.p}><TopicLink slug="dg-set" label="DG Set" variant="inline" /> automatically start hota hai.</p>

        <h3 style={S.h3}>Step 5: Normal Operations Continue</h3>
        <p style={S.p}>Load DG source par shift ho jata hai aur services running rehti hain. Kai baar users ko pata bhi nahi chalta ki Grid Supply fail hui thi.</p>

        <hr style={S.divider} />

        <h2 id="common-challenges" style={S.h1}>Common Challenges In Grid Supply</h2>

        <p style={S.p}>Grid Supply reliable hoti hai. Lekin perfect nahi hoti. Data Centers ko kai electrical challenges face karne padte hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/grid-supply/real-data-center-power-path.png"
              alt="Real Data Center Power Path — complete electrical chain from grid to rack"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Real Data Center Power Path — Grid se server rack tak poora electrical chain.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Voltage Fluctuation</h3>
        <p style={S.p}>Kabhi-kabhi incoming voltage expected range se bahar chali jati hai. Sensitive IT equipment ke liye ye risk create kar sakta hai.</p>

        <h3 style={S.h3}>Frequency Variation</h3>
        <p style={S.p}>Grid frequency stable rehna bahut important hai. Frequency disturbance power quality ko impact kar sakti hai.</p>

        <h3 style={S.h3}>Grid Outages</h3>
        <p style={S.p}>Storms, transmission faults aur maintenance activities outages create kar sakti hain.</p>

        <h3 style={S.h3}>Harmonics</h3>
        <p style={S.p}>Normal condition me electrical power ek smooth sine wave ke form me travel karti hai. Lekin modern electrical systems me UPS, VFDs, Servers aur SMPS based equipment waveform ko distort kar sakte hain. Isi distortion ko Harmonics kaha jata hai.</p>
        <p style={S.p}>Simple language me harmonics unwanted electrical frequencies hoti hain jo power quality ko affect karti hain.</p>
        <p style={S.p}>Excessive harmonics:</p>
        <ul style={S.ul}>
          <li style={S.li}>Transformers ko overheat kar sakte hain</li>
          <li style={S.li}>Cable losses increase kar sakte hain</li>
          <li style={S.li}>UPS performance affect kar sakte hain</li>
          <li style={S.li}>Equipment life reduce kar sakte hain</li>
        </ul>
        <p style={S.p}>Isi wajah se Data Centers me harmonic monitoring aur power quality analysis regularly kiya jata hai.</p>

        <hr style={S.divider} />

        <h2 id="future-of-grid-supply" style={S.h1}>Future Of Grid Supply In Data Centers</h2>

        <p style={S.p}>AI Infrastructure aur hyperscale facilities ki growth ke saath power demand continuously increase ho rahi hai. Aaj kai modern AI Data Centers hundreds of megawatts tak power consume kar sakte hain.</p>
        <p style={S.p}>Isi wajah se industry ka focus badh raha hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>Renewable Energy</li>
          <li style={S.li}>Solar Integration</li>
          <li style={S.li}>Smart Grids</li>
          <li style={S.li}>Battery Energy Storage Systems</li>
          <li style={S.li}>Green Energy Procurement</li>
        </ul>
        <p style={S.p}>Future me reliable Grid Supply Data Center industry ka aur bhi important component banne wali hai.</p>

        <InsightCard>
          Future AI Data Centers power infrastructure par heavily depend karenge. Grid Supply sirf starting point hai — aage ka poora electrical chain isi foundation par khada hota hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Grid Supply Data Center electrical chain ka starting point hai.",
            "Electricity power plant se directly server rack tak nahi pahunchti.",
            "HT Supply high-power facilities ke liye preferred hoti hai.",
            "Dual Grid Feed reliability improve karta hai.",
            "Grid failure ke time UPS aur DG Systems service continuity maintain karte hain.",
            "Harmonics aur power quality issues electrical systems ko impact kar sakte hain.",
            "Future AI Data Centers power infrastructure par heavily depend karenge.",
          ]}
        />

        <hr style={S.divider} />

        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT'S NEXT</span>
            <div style={S.cardContent}>
              Ab jab aap samajh gaye ho ki electricity Grid se Data Center tak kaise pahunchti hai, to agla logical topic hai HT Yard — kyunki incoming high-voltage power ko receive, isolate aur protect karne ka kaam sabse pehle HT Yard hi karta hai.
            </div>
            <div style={{ marginTop: 14 }}>
              <TopicLink slug="ht-yard" label="Next: HT Yard →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticleLayout>
    </>
  );
}
