import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Grid Supply: How Electricity Reaches a Data Center — Behind The Tech",
  description:
    "The journey of electricity from power plant to server rack — Grid Supply, HT vs LT, Dual Grid Feed and what happens during a grid failure. Explained in simple English.",
  keywords: [
    "grid supply data center",
    "data center electricity",
    "ht supply data center",
    "dual grid feed",
    "power infrastructure data center",
    "electrical grid data center",
    "grid supply explained",
    "behind the tech",
  ],
  openGraph: {
    title: "Grid Supply: How Electricity Reaches a Data Center",
    description:
      "The complete electrical journey from power plant to server rack — Grid Supply, HT connection, Dual Feed and grid failure backup in simple English.",
    url: "https://behindthetech.in/learn/non-it/electrical/grid-supply",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2025-01-01",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grid Supply Explained — Behind The Tech",
    description: "The journey of electricity to a Data Center — from the grid to the server rack, in simple English.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/grid-supply",
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/grid-supply",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/grid-supply",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/grid-supply",
    },
  },
};

// ─── TOC headings (FAQ excluded per gold-standard pattern) ───────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-grid-supply",              text: "What Is Grid Supply?",              level: 2 },
  { id: "where-does-power-come-from",       text: "Where Does Data Center Power Come From?", level: 2 },
  { id: "power-generation-to-data-center",  text: "Power Generation To Data Center",   level: 2 },
  { id: "ht-vs-lt-supply",                  text: "HT vs LT Supply",                   level: 2 },
  { id: "dual-grid-feed",                   text: "Dual Grid Feed",                    level: 2 },
  { id: "grid-failure-scenario",            text: "Grid Failure — What Happens?",      level: 2 },
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
    q: "What is Grid Supply?",
    a: "Grid Supply is the electrical network that takes electricity from power generation stations and delivers it to consumers — homes, offices, hospitals and Data Centers.",
  },
  {
    q: "Why do Data Centers use HT Supply?",
    a: "High-tension supply reduces current demand, which reduces transmission losses, makes cable sizes smaller and improves overall efficiency.",
  },
  {
    q: "What is a Dual Grid Feed?",
    a: "Feeding a Data Center from two independent electricity sources — if one source fails, the other stays active, and this is how reliability is ensured.",
  },
  {
    q: "What happens to a Data Center during a grid failure?",
    a: "The UPS picks up the load within milliseconds, the battery backup provides temporary energy and the DG Set starts automatically and takes over the load — operations continue uninterrupted.",
  },
  {
    q: "What are harmonics and why are they a problem?",
    a: "Harmonics are unwanted electrical frequencies that distort the power waveform. They negatively impact transformers, cables and UPS performance.",
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
        lang="en"
        alternateHref="/hi/learn/non-it/electrical/grid-supply"
      >

        <p style={S.p}>Whenever we talk about Data Centers, the focus often goes to servers, storage, networking and cloud infrastructure.</p>
        <p style={S.p}>But here is a simple question:</p>
        <p style={S.p}><strong>If there is no electricity at all, will any equipment in the Data Center be able to work?</strong></p>
        <p style={S.p}>The answer is — no.</p>
        <p style={S.p}>Whether it is the world's most powerful AI Data Center, a hyperscale cloud facility or a small enterprise Data Center, the foundation of all of them rests on electricity.</p>

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
            Grid Supply — the starting point of the Data Center electrical chain.
          </figcaption>
        </figure>

        <p style={S.p}>But electricity doesn't reach the server rack directly from the power plant. A whole electrical ecosystem works in between.</p>
        <p style={S.p}>Electricity leaving the power generation station passes through:</p>
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
        <p style={S.p}>and finally reaches the server rack.</p>
        <p style={S.p}>If any component in this chain fails, Data Center operations can be impacted. That is why Data Centers adopt a very different approach to power reliability compared to normal commercial buildings.</p>

        <hr style={S.divider} />

        <h2 id="what-is-grid-supply" style={S.h1}>What Is Grid Supply?</h2>

        <p style={S.p}>In simple language, Grid Supply is the electrical network that takes electricity from power generation stations and delivers it to consumers.</p>
        <p style={S.p}>These consumers can be:</p>
        <ul style={S.ul}>
          <li style={S.li}>Homes</li>
          <li style={S.li}>Offices</li>
          <li style={S.li}>Hospitals</li>
          <li style={S.li}>Airports</li>
          <li style={S.li}>Factories</li>
          <li style={S.li}>Data Centers</li>
        </ul>
        <p style={S.p}>When you switch on at home and the light turns on, the entire electrical grid is working behind it.</p>
        <p style={S.p}>In India, the electrical grid is an interconnected network. In this network, thermal power plants, hydro projects, solar farms and wind energy stations all generate electricity together. This electricity is distributed across the whole country through the transmission network.</p>
        <p style={S.p}>A Data Center also receives power from this same grid — but a Data Center's requirements are very different from a normal building's.</p>

        <InsightCard>
          In an office, a 5-minute power cut only creates inconvenience. But in a Data Center, even an interruption of a few seconds can affect thousands or millions of users. That is why Grid Supply is the starting point of Data Center design.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="where-does-power-come-from" style={S.h1}>Where Does Data Center Power Come From?</h2>

        <p style={S.p}>Many people think a Data Center's electricity comes directly from the local electricity board. The reality is a bit more interesting.</p>
        <p style={S.p}>Electricity has to complete a long journey to reach the Data Center.</p>

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
            From Power Plant to Data Center — a long journey.
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

        <p style={S.p}>First, electricity is generated at the power plant. After that, it is transported over long distances through high-voltage transmission lines. From the transmission network, electricity reaches substations, which convert the voltage to the required level and feed the distribution network.</p>
        <p style={S.p}>Then the distribution network provides supply to the Data Center — this point is the actual starting point of the Data Center's electrical journey.</p>
        <p style={S.p}>Further on, the power passes through systems like <TopicLink slug="ht-yard" label="HT Yard" variant="inline" />, <TopicLink slug="rmu" label="RMU" variant="inline" /> and <TopicLink slug="transformer" label="Transformer" variant="inline" />.</p>

        <hr style={S.divider} />

        <h2 id="power-generation-to-data-center" style={S.h1}>The Journey From Power Generation To Data Center</h2>

        <p style={S.p}>Let's understand the power flow step by step.</p>

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
            Transmission Network — high voltage lines that transport electricity over long distances.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Step 1: Power Generation</h3>
        <p style={S.p}>Electricity is generated at: Thermal Power Plants, Hydro Power Plants, Solar Farms, Wind Farms, Gas-Based Power Plants. This is where electrical energy is produced.</p>

        <h3 style={S.h3}>Step 2: Transmission Network</h3>
        <p style={S.p}>To transport electricity over long distances, the voltage is increased. In India, 132 kV, 220 kV, 400 kV and 765 kV transmission systems are commonly used. The purpose of high voltage is to reduce transmission losses.</p>

        <h3 style={S.h3}>Step 3: Grid Substation</h3>
        <p style={S.p}>A substation is the traffic controller of the power system. Voltage transformation, switching and protection activities are performed here.</p>

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
            Grid Substation — the traffic controller of the power system.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Step 4: Distribution Network</h3>
        <p style={S.p}>From the substation, electricity is distributed to industrial consumers and commercial facilities.</p>

        <h3 style={S.h3}>Step 5: Data Center Entry Point</h3>
        <p style={S.p}>From here, power enters the Data Center campus. Now the job of safely handling the incoming power is done by <TopicLink slug="ht-yard" label="HT Yard" variant="inline" /> and <TopicLink slug="rmu" label="RMU" variant="inline" /> systems.</p>

        <hr style={S.divider} />

        <h2 id="ht-vs-lt-supply" style={S.h1}>HT vs LT Supply: Why Do Data Centers Use High Voltage?</h2>

        <p style={S.p}>Normal buildings generally receive LT Supply — Low Tension. Common examples are 230V Single Phase and 415V Three Phase.</p>
        <p style={S.p}>But Data Centers' power requirement is very high. That is why they generally prefer HT Supply.</p>

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
            HT vs LT Supply — why Data Centers prefer high voltage.
          </figcaption>
        </figure>

        <ComparisonCard
          tag="Supply Comparison"
          leftTitle="LT Supply — Normal Buildings"
          leftItems={["230V Single Phase", "415V Three Phase", "Direct from local board", "Small scale usage"]}
          rightTitle="HT Supply — Data Centers"
          rightItems={["11 kV", "33 kV", "66 kV", "Direct HT connection"]}
        />

        <p style={S.p}>The biggest advantage of using high voltage is a lower current requirement. Lower current means lower losses, reduced cable size, improved efficiency and easier power transfer.</p>
        <p style={S.p}>That is why Data Centers take a direct HT connection and then, through a <TopicLink slug="transformer" label="Transformer" variant="inline" />, convert the voltage to the required level.</p>

        <hr style={S.divider} />

        <h2 id="dual-grid-feed" style={S.h1}>Why Data Centers Use Dual Grid Feeds</h2>

        <p style={S.p}>Mission-critical facilities do not depend on a single electrical source.</p>
        <p style={S.p}>Suppose a feeder develops a fault. Or a transmission line gets damaged. Or a fault occurs in the substation. If only one source is available, the entire Data Center can be impacted.</p>

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
            Dual Grid Feed — if one source fails, the other stays active.
          </figcaption>
        </figure>

        <p style={S.p}>That is why enterprise Data Centers generally use a Dual Grid Feed architecture.</p>

        <FlowDiagram
          caption="Dual Grid Feed architecture — redundant power at the first layer"
          steps={[
            { icon: "⚡", label: "Source A", sublabel: "Primary Grid" },
            { icon: "🏢", label: "Data Center" },
            { icon: "⚡", label: "Source B", sublabel: "Secondary Grid" },
          ]}
        />

        <p style={S.p}>If one source fails, the other source remains available. This is the first layer of Data Center redundancy. After that, the backup layers include the <TopicLink slug="ups" label="UPS System" variant="inline" />, <TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> and <TopicLink slug="dg-set" label="DG Set" variant="inline" />.</p>

        <hr style={S.divider} />

        <h2 id="grid-failure-scenario" style={S.h1}>What Happens During Grid Failure?</h2>

        <p style={S.p}>Now let's look at a real-world Data Center scenario. Suppose the Grid Supply suddenly fails. What happens now?</p>
        <p style={S.p}>If there is no backup infrastructure, servers can shut down, network services can become unavailable and applications can crash.</p>
        <p style={S.p}>But Data Centers are designed precisely for this situation.</p>

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
            Backup sequence after grid failure — a handover from milliseconds to seconds.
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
        <p style={S.p}>The primary source becomes unavailable.</p>

        <h3 style={S.h3}>Step 2: UPS Takes Over</h3>
        <p style={S.p}><TopicLink slug="ups" label="UPS System" variant="inline" /> picks up the load within milliseconds. The IT equipment does not feel any interruption.</p>

        <h3 style={S.h3}>Step 3: Battery Support</h3>
        <p style={S.p}><TopicLink slug="battery-bank" label="Battery Bank" variant="inline" /> provides temporary energy to the UPS.</p>

        <h3 style={S.h3}>Step 4: DG Start</h3>
        <p style={S.p}><TopicLink slug="dg-set" label="DG Set" variant="inline" /> starts automatically.</p>

        <h3 style={S.h3}>Step 5: Normal Operations Continue</h3>
        <p style={S.p}>The load shifts to the DG source and services keep running. Often, users don't even realise that the Grid Supply had failed.</p>

        <hr style={S.divider} />

        <h2 id="common-challenges" style={S.h1}>Common Challenges In Grid Supply</h2>

        <p style={S.p}>Grid Supply is reliable. But it is not perfect. Data Centers have to face several electrical challenges.</p>

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
            Real Data Center Power Path — the complete electrical chain from the grid to the server rack.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Voltage Fluctuation</h3>
        <p style={S.p}>Sometimes the incoming voltage goes outside the expected range. This can create a risk for sensitive IT equipment.</p>

        <h3 style={S.h3}>Frequency Variation</h3>
        <p style={S.p}>It is very important for grid frequency to remain stable. A frequency disturbance can impact power quality.</p>

        <h3 style={S.h3}>Grid Outages</h3>
        <p style={S.p}>Storms, transmission faults and maintenance activities can create outages.</p>

        <h3 style={S.h3}>Harmonics</h3>
        <p style={S.p}>Under normal conditions, electrical power travels in the form of a smooth sine wave. But in modern electrical systems, UPS, VFDs, servers and SMPS-based equipment can distort the waveform. This distortion is called Harmonics.</p>
        <p style={S.p}>In simple language, harmonics are unwanted electrical frequencies that affect power quality.</p>
        <p style={S.p}>Excessive harmonics can:</p>
        <ul style={S.ul}>
          <li style={S.li}>Overheat transformers</li>
          <li style={S.li}>Increase cable losses</li>
          <li style={S.li}>Affect UPS performance</li>
          <li style={S.li}>Reduce equipment life</li>
        </ul>
        <p style={S.p}>That is why harmonic monitoring and power quality analysis are done regularly in Data Centers.</p>

        <hr style={S.divider} />

        <h2 id="future-of-grid-supply" style={S.h1}>Future Of Grid Supply In Data Centers</h2>

        <p style={S.p}>With the growth of AI Infrastructure and hyperscale facilities, power demand is continuously increasing. Today, many modern AI Data Centers can consume up to hundreds of megawatts of power.</p>
        <p style={S.p}>That is why the industry's focus is increasing on:</p>
        <ul style={S.ul}>
          <li style={S.li}>Renewable Energy</li>
          <li style={S.li}>Solar Integration</li>
          <li style={S.li}>Smart Grids</li>
          <li style={S.li}>Battery Energy Storage Systems</li>
          <li style={S.li}>Green Energy Procurement</li>
        </ul>
        <p style={S.p}>In the future, reliable Grid Supply is going to become an even more important component of the Data Center industry.</p>

        <InsightCard>
          Future AI Data Centers will depend heavily on power infrastructure. Grid Supply is only the starting point — the entire electrical chain ahead stands on this foundation.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Grid Supply is the starting point of the Data Center electrical chain.",
            "Electricity doesn't reach the server rack directly from the power plant.",
            "HT Supply is preferred for high-power facilities.",
            "Dual Grid Feed improves reliability.",
            "During a grid failure, UPS and DG Systems maintain service continuity.",
            "Harmonics and power quality issues can impact electrical systems.",
            "Future AI Data Centers will depend heavily on power infrastructure.",
          ]}
        />

        <hr style={S.divider} />

        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT'S NEXT</span>
            <div style={S.cardContent}>
              Now that you understand how electricity reaches the Data Center from the grid, the next logical topic is the HT Yard — because the HT Yard is the first to receive, isolate and protect the incoming high-voltage power.
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
