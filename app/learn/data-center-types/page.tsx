import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Data Center Types Explained: Enterprise, Cloud, Hyperscale & More — Behind The Tech",
  description:
    "Not every Data Center is the same. A complete comparison of Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed and Hybrid Data Centers — in simple English.",
  keywords: [
    "data center types",
    "data center types in hindi",
    "enterprise data center",
    "colocation data center",
    "cloud data center",
    "hyperscale data center",
    "edge data center",
    "managed data center",
    "hybrid data center",
    "behind the tech",
  ],
  openGraph: {
    title: "Data Center Types: Not Every Data Center Is the Same",
    description:
      "Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed and Hybrid Data Centers — all explained in simple English.",
    url: "https://behindthetech.in/learn/data-center-types",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Center Types Explained — Behind The Tech",
    description: "Enterprise, Cloud, Hyperscale and other Data Center types explained in simple English.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/data-center-types",
    languages: {
      "en": "https://behindthetech.in/learn/data-center-types",
      "hi": "https://behindthetech.in/hi/learn/data-center-types",
      "x-default": "https://behindthetech.in/learn/data-center-types",
    },
  },
};

// ─── TOC headings ─────────────────────────────────────────────────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "why-types-matter",          text: "Why Types Matter",              level: 2 },
  { id: "are-all-data-centers-same", text: "All Data Centers Same?",        level: 2 },
  { id: "enterprise",                text: "Enterprise Data Center",        level: 2 },
  { id: "colocation",                text: "Colocation Data Center",        level: 2 },
  { id: "cloud",                     text: "Cloud Data Center",             level: 2 },
  { id: "hyperscale",                text: "Hyperscale Data Center",       level: 2 },
  { id: "edge",                      text: "Edge Data Center",              level: 2 },
  { id: "managed",                   text: "Managed Data Center",           level: 2 },
  { id: "hybrid",                    text: "Hybrid Data Center",            level: 2 },
  { id: "comparison",                text: "Types Compared",                level: 2 },
  { id: "which-is-best",             text: "Which One Is Best?",            level: 2 },
  { id: "key-takeaways",             text: "Key Takeaways",                 level: 2 },
  { id: "faq",                       text: "FAQ",                           level: 2 },
];

// ─── Shared inline styles ─────────────────────────────────────────────────────

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

// ─── Local helper components ──────────────────────────────────────────────────

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

function TypeProfileCard({
  tag,
  definition,
  analogyTitle,
  analogy,
  whoUses,
  advantages,
  disadvantages,
  useCases,
}: {
  tag: string;
  definition: React.ReactNode;
  analogyTitle: string;
  analogy: React.ReactNode;
  whoUses: string[];
  advantages: string[];
  disadvantages: string[];
  useCases?: string[];
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

        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#1f2937", marginBottom: 18 }}>
          {definition}
        </div>

        <div style={{ marginBottom: 18 }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#1f2937",
              marginBottom: 8,
            }}
          >
            {analogyTitle}
          </span>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{analogy}</div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8, }} > Who Uses It? </span> <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}> {whoUses.map((w) => ( <span key={w} style={{ fontFamily: "var(--font-body)", fontSize: 12.5, padding: "5px 11px", borderRadius: 980, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.16)", color: "#1f2937", }} > {w} </span> ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: useCases ? 18 : 0 }}>
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
              Advantages
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {advantages.map((a, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
                  {a}
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
                color: "#DC2626",
                marginBottom: 8,
              }}
            >
              Disadvantages
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {disadvantages.map((d, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {useCases && (
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Use Cases
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {useCases.map((u) => (
                <span
                  key={u}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12.5,
                    padding: "5px 11px",
                    borderRadius: 980,
                    background: "rgba(0,255,204,0.05)",
                    border: "1px solid rgba(0,255,204,0.18)",
                    color: "#1f2937",
                  }}
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ComparisonTable ──────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  { type: "Enterprise", ownership: "Company",  control: "High",     cost: "High",      scalability: "Medium",    bestFor: "Banks, Government" },
  { type: "Colocation", ownership: "Shared",    control: "Medium",   cost: "Medium",    scalability: "Medium",    bestFor: "Growing Businesses" },
  { type: "Cloud",      ownership: "Provider",  control: "Low",      cost: "Flexible",  scalability: "High",      bestFor: "Startups, Apps" },
  { type: "Hyperscale", ownership: "Provider",  control: "High",     cost: "Very High", scalability: "Very High", bestFor: "Global Platforms" },
  { type: "Edge",       ownership: "Mixed",     control: "Medium",   cost: "Medium",    scalability: "High",      bestFor: "Low Latency Applications" },
  { type: "Managed",    ownership: "Provider",  control: "Low",      cost: "Medium",    scalability: "Medium",    bestFor: "Small Businesses" },
  { type: "Hybrid",     ownership: "Mixed",     control: "Flexible", cost: "Flexible",  scalability: "High",      bestFor: "Large Enterprises" },
];

function ComparisonTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Type", "Ownership", "Control", "Cost", "Scalability", "Best For"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#2563EB",
                    borderBottom: "1px solid rgba(37,99,235,0.14)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.type} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.type}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.ownership}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.control}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.cost}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.scalability}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "How many types of Data Centers are there?",
    a: "There are generally seven major types considered: Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed and Hybrid. Each type has its own ownership model, cost structure and use case.",
  },
  {
    q: "Which Data Center type is used the most?",
    a: "Cloud Data Centers are used the most today, because everyone from startups to large enterprises adopts them — thanks to fast deployment and flexible cost.",
  },
  {
    q: "What is the difference between Hyperscale and Enterprise Data Centers?",
    a: "An Enterprise Data Center is under the control of a single organization, whereas a Hyperscale Data Center serves millions or billions of users with lakhs of servers — both the scale and the purpose are different.",
  },
  {
    q: "When is an Edge Data Center needed?",
    a: "When latency is critical — such as in online gaming, live video streaming, or IoT devices — an Edge Data Center is used, because it is deployed geographically close to users.",
  },
  {
    q: "Can a company use multiple Data Center types?",
    a: "Yes, this approach itself is called a Hybrid Data Center. Most enterprises combine multiple models — Enterprise for sensitive applications, Cloud for website hosting, and Colocation for backup.",
  },
  {
    q: "Which Data Center type is best for a small company?",
    a: "Cloud or Managed Data Centers are best for small companies and startups, because neither requires a large upfront investment or a dedicated IT team.",
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

export default function DataCenterTypesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticleStructuredData slug="data-center-types" lang="en" />
      <ArticlePage
        slug="data-center-types"
        prevSlug="what-is-a-data-center"
        nextSlug={undefined}
        relatedSlugs={["server-basics", "nas", "ai-infrastructure-basics"]}
        headings={HEADINGS}
        readingTimeMinutes={10}
      >

        <h2 id="why-types-matter" style={S.h2}>Why Types Matter</h2>

        <p style={S.p}>
          <p style={S.p}>If you have read our previous article <strong>"What Is A Data Center?"</strong>, you already know that Data Centers are the backbone of the internet.</p>
        </p>
        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>
        <p style={S.p}>When you:</p>
        <ul style={S.ul}>
          <li style={S.li}>Watch a video on YouTube</li>
          <li style={S.li}>Scroll through Instagram</li>
          <li style={S.li}>Send a message on WhatsApp</li>
          <li style={S.li}>Search on Google</li>
          <li style={S.li}>Ask ChatGPT a question</li>
        </ul>
        <p style={S.p}>your request always reaches some Data Center or the other.</p>
        <p style={S.p}>But here is an interesting point.</p>
        <p style={S.p}><strong>Not every Data Center is the same.</strong></p>
        <p style={S.p}>Just like every vehicle has a different purpose.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, margin: "20px 0 24px" }}>
          {[
            { icon: "🏍️", label: "Bike — for daily travel" },
            { icon: "🚚", label: "Truck — for heavy goods transport" },
            { icon: "🚑", label: "Ambulance — for emergencies" },
            { icon: "✈️", label: "Aeroplane — for long-distance travel" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: "rgba(37,99,235,0.035)", border: "1px solid rgba(37,99,235,0.12)" }}>
              <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#1f2937", lineHeight: 1.4 }}>{item.label}</span>
            </div>
          ))}
        </div>

        <p style={S.p}>They are all vehicles, but their jobs are different.</p>
        <p style={S.p}>It is exactly the same with Data Centers.</p>
        <p style={S.p}>Some Data Centers are built by companies themselves. Some are rented and used. Some run entirely on the cloud. And some power the biggest internet platforms in the world.</p>
        <p style={S.p}>This is why Data Centers are divided into different categories. Let us understand which Data Center is used for what.</p>

        <hr style={S.divider} />

        <h2 id="are-all-data-centers-same" style={S.h1}>Are All Data Centers the Same?</h2>

        <p style={S.p}>Short answer?</p>
        <p style={{ ...S.p, color: "#1f2937", fontWeight: 600, fontSize: 16 }}>No.</p>
        <p style={S.p}>From the outside, all Data Centers might look similar.</p>
        <p style={S.p}>A building. A lot of servers. Cooling systems. Power backup. Security.</p>
        <p style={S.p}>But the business model, ownership and purpose inside can be very different.</p>
        <p style={S.p}>For example: a bank may operate its own Data Center. A startup may use the cloud. An e-commerce company may use hybrid infrastructure. And platforms like YouTube operate on hyperscale infrastructure.</p>
        <p style={S.p}>This is exactly the difference that defines Data Center Types.</p>

        <hr style={S.divider} />

        <h2 id="enterprise" style={S.h1}>Enterprise Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/enterprise-data-center.png"
              alt="Enterprise Data Center — Owned Infrastructure"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Enterprise Data Center — Privately owned infrastructure operated by a single organization.
          </figcaption>
        </figure>

        <TypeProfileCard
          tag="Type 01"
          definition={<p style={{ margin: 0 }}>An Enterprise Data Center is a Data Center that is under the ownership and control of a single organization. The infrastructure belongs to the company. The servers belong to the company. The operations belong to the company. The maintenance belongs to the company too.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Imagine you have built your own house. You decide the design. You decide the security. You decide the electricity backup. But you also have to do the maintenance yourself. An Enterprise Data Center works in much the same way.</p>}
          whoUses={["Banks", "Government Organizations", "Telecom Companies", "Large Enterprises", "Defense Organizations"]}
          advantages={["Complete control", "Better customization", "High security", "Regulatory compliance"]}
          disadvantages={["Very expensive", "Skilled manpower required", "Maintenance responsibility"]}
        />

        <p style={S.p}>Even today, many large organizations depend on Enterprise Data Centers.</p>
        <div style={S.learnMore}>
          <TopicLink slug="server-basics" label="Learn More: Server Basics" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="colocation" style={S.h1}>Colocation Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/colocation-data-center.png"
              alt="Colocation Data Center — Shared Facility"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Colocation Data Center — Shared facility where organizations rent space for their equipment.
          </figcaption>
        </figure>

        <TypeProfileCard
          tag="Type 02"
          definition={<p style={{ margin: 0 }}>In simple terms, Colocation is the "Rent a Data Center" model. Here the building and infrastructure belong to a provider. But the servers are yours. You bring your own servers and install them in the provider's Data Center. The provider gives you: Power, Cooling, Security, Network Connectivity, and Physical Space.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>It is like moving into a rented office with your own furniture. The furniture is yours. The building belongs to someone else. The Colocation Data Center model works in exactly the same way.</p>}
          whoUses={["Mid-Size Companies", "E-commerce Businesses", "Growing Enterprises"]}
          advantages={["No need to build your own Data Center", "Reliable infrastructure", "Lower upfront investment", "Professional environment"]}
          disadvantages={["Monthly recurring cost", "Limited physical control"]}
        />

        <p style={S.p}>Today, many mid-size companies use the Colocation model.</p>

        <hr style={S.divider} />

        <h2 id="cloud" style={S.h1}>Cloud Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/cloud-data-center.png"
              alt="Cloud Data Center — Infrastructure as a Service"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Cloud Data Center — Infrastructure delivered on demand as a service.
          </figcaption>
        </figure>

        <TypeProfileCard
          tag="Type 03"
          definition={<p style={{ margin: 0 }}>The most popular model in today's digital world is the Cloud Data Center. Here you don't need to buy physical servers. You use infrastructure as a service. You pay for as much as you use.</p>}
          analogyTitle="Real-Life Example"
          analogy={
            <>
              <p style={{ margin: "0 0 8px" }}>Imagine you need to travel daily. You have two options:</p>
              <p style={{ margin: "0 0 8px" }}>Option 1: Buy a car. Option 2: Book a cab.</p>
              <p style={{ margin: 0 }}>A Cloud Data Center is like booking a cab. The infrastructure isn't yours. But you still get the service.</p>
            </>
          }
          whoUses={["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud"]}
          advantages={["Fast deployment", "Unlimited scalability", "Global availability", "Lower initial investment"]}
          disadvantages={["Long-term cost can increase", "Vendor dependency"]}
        />

        <p style={S.p}>Today, everyone from startups to large enterprises is using the cloud.</p>

        <hr style={S.divider} />

        <h2 id="hyperscale" style={S.h1}>Hyperscale Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/hyperscale-data-center.png"
              alt="Hyperscale Data Center — Massive Scale"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Hyperscale Data Center — Massive-scale infrastructure built for global services.
          </figcaption>
        </figure>

        <TypeProfileCard
          tag="Type 04"
          definition={<p style={{ margin: 0 }}>Now let's talk about the giants of the internet. Hyperscale Data Centers are the largest Data Centers in the world. They can host lakhs of servers. And they provide service to millions or billions of users.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>The difference between a local grocery store and a giant national warehouse is the same difference that exists between a normal Data Center and a Hyperscale Data Center.</p>}
          whoUses={["Google", "Microsoft", "Meta", "Amazon"]}
          advantages={["Massive capacity", "High automation", "Advanced cooling", "AI-based monitoring", "Extreme redundancy"]}
          disadvantages={["Very high build cost", "Viable only for large-scale players"]}
        />

        <p style={S.p}>When you watch a video on YouTube, use Instagram or use AI tools, there is a very high chance that your request is reaching a Hyperscale Data Center.</p>
        <div style={S.learnMore}>
          <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="edge" style={S.h1}>Edge Data Center</h2>

        <p style={S.p}>Have you ever noticed that even milliseconds matter in online gaming? Or that delay feels annoying in live video streaming?</p>
        <p style={S.p}>This problem is related to latency. Edge Data Centers are used to solve exactly this issue.</p>

        <h3 style={S.h3}>What Does an Edge Data Center Do?</h3>
        <p style={S.p}>It is deployed close to users. The closer the Data Center is to the user, the faster the response.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/edge-data-center-diagram.png"
              alt="Edge Data Center Latency Diagram"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Edge Data Center — Localized infrastructure that reduces latency by moving compute closer to users.
          </figcaption>
        </figure>

        <TypeProfileCard
          tag="Type 05"
          definition={<p style={{ margin: 0 }}>An Edge Data Center is a facility that is deployed geographically close to users, so that data does not have to travel a long distance.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Think of ordering an item. If the shop is right next door to your house, the delivery arrives instantly. If the same shop is on the other side of the city, the delivery takes time. An Edge Data Center makes exactly this difference — less distance, faster response.</p>}
          whoUses={["Telecom Companies", "Gaming Platforms", "Streaming Services", "IoT Providers"]}
          advantages={["Very low latency", "Better real-time performance", "Reduces local traffic load"]}
          disadvantages={["Limited capacity per location", "Managing multiple locations is complex"]}
          useCases={["Video Streaming", "Online Gaming", "IoT Devices", "Smart Cities", "Autonomous Vehicles"]}
        />

        <hr style={S.divider} />

        <h2 id="managed" style={S.h1}>Managed Data Center</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/managed-data-center.png"
              alt="Managed Data Center — Operated by Provider"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Managed Data Center — Infrastructure operated and maintained by a specialized provider.
          </figcaption>
        </figure>

        <p style={S.p}>Not every company has a large IT team. Not every company wants to manage infrastructure either. This is exactly why the Managed Data Center model exists.</p>
        <p style={S.p}>Here the provider doesn't just give you the infrastructure. They also handle its operation.</p>

        <TypeProfileCard
          tag="Type 06"
          definition={<p style={{ margin: 0 }}>In a Managed Data Center, the provider manages everything — Servers, Storage, Network, Monitoring, Security and Maintenance.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>It's like renting an apartment where the society's team handles the building maintenance — you don't have to do any repairs yourself. A Managed Data Center plays exactly the same role for its clients.</p>}
          whoUses={["Startups", "Small Businesses", "Growing Companies"]}
          advantages={["No need for a skilled IT team", "An expert provider handles operations", "Business can focus on its core work"]}
          disadvantages={["Less operational control", "Dependency on provider reliability"]}
        />

        <p style={S.p}>You can focus on your business. The provider takes care of infrastructure management.</p>
        <div style={S.learnMore}>
          <TopicLink slug="nas" label="Learn More: NAS" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="hybrid" style={S.h1}>Hybrid Data Center</h2>

        <p style={S.p}>In the real world, very few companies use only one model. Most enterprises combine multiple models. This approach itself is called the Hybrid Data Center strategy.</p>

        <h3 style={S.h3}>Example</h3>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/data-center-types/hybrid-data-center-diagram.png"
              alt="Hybrid Data Center Architecture Diagram"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Hybrid Data Center — Combination of multiple deployment models working together.
          </figcaption>
        </figure>

        <p style={S.p}>All the systems work together.</p>

        <TypeProfileCard
          tag="Type 07"
          definition={<p style={{ margin: 0 }}>A Hybrid Data Center is a strategy in which a company combines multiple Data Center models — Enterprise, Cloud, Colocation — based on its needs.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>It's like a business keeping its important stock in its own warehouse, using rented space for fast-moving items, and storing backup stock at a third-party facility — everything running together. A Hybrid Data Center does exactly the same thing.</p>}
          whoUses={["Large Enterprises", "Banks with Digital Services", "E-commerce Companies"]}
          advantages={["Flexibility", "Better cost optimization", "Better scalability", "Risk reduction"]}
          disadvantages={["Management complexity increases", "Multiple providers need to be coordinated"]}
        />

        <p style={S.p}>The Hybrid approach has become very common in today's enterprise world.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Data Center Types Comparison</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="which-is-best" style={S.h1}>Which Data Center Is Best?</h2>

        <p style={S.p}>This is a very common question. But the answer depends on the business requirement.</p>
        <p style={S.p}>If:</p>
        <ul style={S.ul}>
          <li style={S.li}>You need maximum control → Enterprise</li>
          <li style={S.li}>You need rented infrastructure → Colocation</li>
          <li style={S.li}>You need fast deployment → Cloud</li>
          <li style={S.li}>You need to run a global-scale platform → Hyperscale</li>
          <li style={S.li}>You need low latency → Edge</li>
          <li style={S.li}>You need to outsource operations → Managed</li>
          <li style={S.li}>You need to combine multiple environments → Hybrid</li>
        </ul>

        <InsightCard>
          No single type is universally the best. The best one is whichever matches the business requirement.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Not every Data Center is the same.",
            "Different Data Center models are used for different business requirements.",
            "Enterprise Data Centers give maximum control.",
            "Cloud Data Centers give maximum flexibility.",
            "Hyperscale Data Centers power internet giants.",
            "Edge Data Centers reduce latency.",
            "Managed Data Centers simplify operations.",
            "Hybrid Data Centers are becoming the preferred approach for modern enterprises.",
          ]}
        />

        <p style={S.p}>Now, whenever you hear the names AWS, Azure, Google Cloud, YouTube, Netflix or ChatGPT, you will have an idea of what type of Data Center might be working behind them.</p>
        <p style={S.p}>And this understanding is the next important step in the learning journey of Data Center Infrastructure.</p>

        <hr style={S.divider} />

        <h2 id="faq" style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticlePage>
    </>
  );
}
