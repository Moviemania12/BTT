import type { Metadata } from "next";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Data Center Types Explained: Enterprise, Cloud, Hyperscale & More — Behind The Tech",
  description:
    "Har Data Center ek jaisa nahi hota. Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed aur Hybrid Data Centers ka complete comparison — simple Hinglish mein.",
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
    title: "Data Center Types: Har Data Center Ek Jaisa Nahi Hota",
    description:
      "Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed aur Hybrid Data Centers — sab kuch simple Hinglish mein samjho.",
    url: "https://behindthetech.in/learn/data-center-types",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Center Types Explained — Behind The Tech",
    description: "Enterprise, Cloud, Hyperscale aur baaki Data Center types simple Hinglish mein.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/data-center-types",
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
            Kaun Use Karta Hai?
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {whoUses.map((w) => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12.5,
                  padding: "5px 11px",
                  borderRadius: 980,
                  background: "rgba(37,99,235,0.06)",
                  border: "1px solid rgba(37,99,235,0.16)",
                  color: "#1f2937",
                }}
              >
                {w}
              </span>
            ))}
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
    q: "Data Center types kitne hote hain?",
    a: "Generally seven major types maane jaate hain: Enterprise, Colocation, Cloud, Hyperscale, Edge, Managed aur Hybrid. Har type ka apna ownership model, cost structure aur use case hota hai.",
  },
  {
    q: "Sabse zyada use hone wala Data Center type kaunsa hai?",
    a: "Cloud Data Center aaj sabse zyada use hota hai, kyunki startups se lekar large enterprises tak sab ise apnate hain — fast deployment aur flexible cost ki wajah se.",
  },
  {
    q: "Hyperscale aur Enterprise Data Center me kya farak hai?",
    a: "Enterprise Data Center ek single organization ke control me hota hai, jabki Hyperscale Data Center lakhon servers ke saath millions ya billions users ko service deta hai — scale aur purpose dono alag hote hain.",
  },
  {
    q: "Edge Data Center ki zarurat kab hoti hai?",
    a: "Jab latency critical ho — jaise online gaming, live video streaming, ya IoT devices — tab Edge Data Center use hota hai, kyunki ye users ke geographically close deploy kiya jata hai.",
  },
  {
    q: "Kya ek company multiple Data Center types use kar sakti hai?",
    a: "Haan, isi approach ko Hybrid Data Center kaha jata hai. Most enterprises sensitive applications ke liye Enterprise, website hosting ke liye Cloud, aur backup ke liye Colocation jaise multiple models combine karti hain.",
  },
  {
    q: "Chhoti company ke liye kaunsa Data Center type best hai?",
    a: "Chhoti companies aur startups ke liye Cloud ya Managed Data Center best rehte hain, kyunki dono me large upfront investment ya dedicated IT team ki zarurat nahi padti.",
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
          Agar aapne hamara pichla article <strong>"What Is A Data Center?"</strong> padha hai, to ab aap jaante ho ki Data Center internet ki backbone hote hain.
        </p>
        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>
        <p style={S.p}>Jab aap:</p>
        <ul style={S.ul}>
          <li style={S.li}>YouTube par video dekhte ho</li>
          <li style={S.li}>Instagram scroll karte ho</li>
          <li style={S.li}>WhatsApp par message bhejte ho</li>
          <li style={S.li}>Google par search karte ho</li>
          <li style={S.li}>ChatGPT se sawaal poochte ho</li>
        </ul>
        <p style={S.p}>to aapki request kisi na kisi Data Center tak zaroor pahunchti hai.</p>
        <p style={S.p}>Lekin yahan ek interesting baat hai.</p>
        <p style={S.p}><strong>Har Data Center ek jaisa nahi hota.</strong></p>
        <p style={S.p}>Bilkul waise hi jaise har vehicle ka purpose alag hota hai.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, margin: "20px 0 24px" }}>
          {[
            { icon: "🏍️", label: "Bike — daily travel ke liye" },
            { icon: "🚚", label: "Truck — heavy goods transport ke liye" },
            { icon: "🚑", label: "Ambulance — emergency ke liye" },
            { icon: "✈️", label: "Aeroplane — long-distance travel ke liye" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: "rgba(37,99,235,0.035)", border: "1px solid rgba(37,99,235,0.12)" }}>
              <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "#1f2937", lineHeight: 1.4 }}>{item.label}</span>
            </div>
          ))}
        </div>

        <p style={S.p}>Sab vehicles hain, lekin kaam alag hai.</p>
        <p style={S.p}>Data Centers ke saath bhi exactly aisa hi hai.</p>
        <p style={S.p}>Kuch Data Centers companies khud banati hain. Kuch rent par use karti hain. Kuch completely cloud par chalti hain. Aur kuch duniya ke sabse bade internet platforms ko power karte hain.</p>
        <p style={S.p}>Isi wajah se Data Centers ko alag-alag categories me divide kiya jata hai. Aaiye samajhte hain ki kaun sa Data Center kis kaam aata hai.</p>

        <hr style={S.divider} />

        <h2 id="are-all-data-centers-same" style={S.h1}>Kya Sabhi Data Centers Same Hote Hain?</h2>

        <p style={S.p}>Short answer?</p>
        <p style={{ ...S.p, color: "#1f2937", fontWeight: 600, fontSize: 16 }}>Nahi.</p>
        <p style={S.p}>Bahar se dekhne par shayad sab Data Centers similar lagen.</p>
        <p style={S.p}>Ek building. Bahut saare servers. Cooling systems. Power backup. Security.</p>
        <p style={S.p}>Lekin andar ka business model, ownership aur purpose bahut alag ho sakta hai.</p>
        <p style={S.p}>Example ke liye: ek bank apna khud ka Data Center operate kar sakta hai. Ek startup cloud use kar sakta hai. Ek e-commerce company hybrid infrastructure use kar sakti hai. Aur YouTube jaise platforms hyperscale infrastructure par operate karte hain.</p>
        <p style={S.p}>Yahi difference Data Center Types ko define karta hai.</p>

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
          definition={<p style={{ margin: 0 }}>Enterprise Data Center wo Data Center hota hai jo kisi organization ke khud ke ownership aur control me hota hai. Infrastructure bhi company ka. Servers bhi company ke. Operations bhi company ke. Maintenance bhi company ki.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Sochiye aapne khud ka ghar banaya hai. Design aap decide karte ho. Security aap decide karte ho. Electricity backup aap decide karte ho. Lekin maintenance bhi aapko hi karni padti hai. Enterprise Data Center bhi kuch aisa hi hota hai.</p>}
          whoUses={["Banks", "Government Organizations", "Telecom Companies", "Large Enterprises", "Defense Organizations"]}
          advantages={["Complete control", "Better customization", "High security", "Regulatory compliance"]}
          disadvantages={["Bahut expensive", "Skilled manpower required", "Maintenance responsibility"]}
        />

        <p style={S.p}>Aaj bhi bahut si large organizations Enterprise Data Centers par depend karti hain.</p>
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
          definition={<p style={{ margin: 0 }}>Colocation ko simple language me samjhen to ye "Rent Par Data Center" model hai. Yahan building aur infrastructure kisi provider ka hota hai. Lekin servers aapke hote hain. Aap apne servers lekar provider ke Data Center me install kar dete ho. Provider deta hai: Power, Cooling, Security, Network Connectivity, aur Physical Space.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Jaise aap khud ka furniture lekar rented office me shift ho jao. Furniture aapka. Building kisi aur ki. Exactly waise hi Colocation Data Center ka model kaam karta hai.</p>}
          whoUses={["Mid-Size Companies", "E-commerce Businesses", "Growing Enterprises"]}
          advantages={["Data Center build karne ki zarurat nahi", "Reliable infrastructure", "Lower upfront investment", "Professional environment"]}
          disadvantages={["Monthly recurring cost", "Limited physical control"]}
        />

        <p style={S.p}>Aaj bahut si mid-size companies Colocation model use karti hain.</p>

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
          definition={<p style={{ margin: 0 }}>Aaj ke digital world me sabse popular model hai: Cloud Data Center. Yahan aapko physical servers kharidne ki zarurat nahi hoti. Aap infrastructure ko service ki tarah use karte ho. Jitna use karo utna pay karo.</p>}
          analogyTitle="Real-Life Example"
          analogy={
            <>
              <p style={{ margin: "0 0 8px" }}>Sochiye aapko daily travel karna hai. Aapke paas do options hain:</p>
              <p style={{ margin: "0 0 8px" }}>Option 1: Car kharido. Option 2: Cab book karo.</p>
              <p style={{ margin: 0 }}>Cloud Data Center cab booking jaisa hai. Infrastructure aapka nahi hota. Lekin service mil jati hai.</p>
            </>
          }
          whoUses={["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud"]}
          advantages={["Fast deployment", "Unlimited scalability", "Global availability", "Lower initial investment"]}
          disadvantages={["Long-term cost increase ho sakti hai", "Vendor dependency"]}
        />

        <p style={S.p}>Aaj startups se lekar large enterprises tak cloud use kar rahe hain.</p>

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
          definition={<p style={{ margin: 0 }}>Ab baat karte hain internet ke giants ki. Hyperscale Data Centers duniya ke sabse bade Data Centers hote hain. Ye lakhon servers host kar sakte hain. Aur millions ya billions users ko service provide karte hain.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Ek local grocery store aur ek giant national warehouse ke beech jo difference hota hai, wahi difference normal aur Hyperscale Data Center ke beech hota hai.</p>}
          whoUses={["Google", "Microsoft", "Meta", "Amazon"]}
          advantages={["Massive capacity", "High automation", "Advanced cooling", "AI-based monitoring", "Extreme redundancy"]}
          disadvantages={["Very high build cost", "Sirf large-scale players ke liye viable"]}
        />

        <p style={S.p}>Jab aap YouTube par video dekhte ho, Instagram use karte ho ya AI tools use karte ho, bahut high chance hai ki request kisi Hyperscale Data Center tak pahunch rahi ho.</p>
        <div style={S.learnMore}>
          <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="edge" style={S.h1}>Edge Data Center</h2>

        <p style={S.p}>Kabhi notice kiya hai ki online gaming me milliseconds bhi important hote hain? Ya live video streaming me delay annoying lagta hai?</p>
        <p style={S.p}>Yeh problem latency se related hoti hai. Isi issue ko solve karne ke liye Edge Data Centers use kiye jate hain.</p>

        <h3 style={S.h3}>Edge Data Center Kya Karta Hai?</h3>
        <p style={S.p}>Ye users ke close deploy kiya jata hai. Jitna Data Center user ke paas hoga, utni fast response milegi.</p>

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
          definition={<p style={{ margin: 0 }}>Edge Data Center wo facility hoti hai jo users ke geographically close deploy ki jaati hai, taaki data ko lambi distance travel na karni pade.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Socho aap ek item order karte ho. Agar shop aapke ghar ke bilkul next door hai, to delivery turant aa jayegi. Agar wahi shop city ke doosre kone me hai, to delivery me time lagega. Edge Data Center bhi exactly yahi farak banata hai — distance kam, response fast.</p>}
          whoUses={["Telecom Companies", "Gaming Platforms", "Streaming Services", "IoT Providers"]}
          advantages={["Bahut low latency", "Better real-time performance", "Local traffic load kam karta hai"]}
          disadvantages={["Limited capacity per location", "Multiple locations manage karna complex hai"]}
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

        <p style={S.p}>Har company ke paas large IT team nahi hoti. Har company infrastructure manage bhi nahi karna chahti. Isi liye Managed Data Center model exist karta hai.</p>
        <p style={S.p}>Yahan provider sirf infrastructure nahi deta. Wo uska operation bhi handle karta hai.</p>

        <TypeProfileCard
          tag="Type 06"
          definition={<p style={{ margin: 0 }}>Managed Data Center me provider Servers, Storage, Network, Monitoring, Security aur Maintenance — sab kuch manage karta hai.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Jaise aap apartment kiraye par lo aur building maintenance ka kaam society ki team karti hai — aapko khud kuch repair nahi karna padta. Managed Data Center bhi wahi role nibhata hai apne clients ke liye.</p>}
          whoUses={["Startups", "Small Businesses", "Growing Companies"]}
          advantages={["Skilled IT team ki zarurat nahi", "Operations expert provider sambhalta hai", "Business core kaam par focus kar sakta hai"]}
          disadvantages={["Operational control kam hota hai", "Provider ki reliability par dependency"]}
        />

        <p style={S.p}>Aap apne business par focus kar sakte ho. Infrastructure management provider sambhal leta hai.</p>
        <div style={S.learnMore}>
          <TopicLink slug="nas" label="Learn More: NAS" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="hybrid" style={S.h1}>Hybrid Data Center</h2>

        <p style={S.p}>Real world me bahut kam companies sirf ek model use karti hain. Most enterprises multiple models combine karti hain. Isi approach ko Hybrid Data Center strategy kaha jata hai.</p>

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

        <p style={S.p}>Sab systems milkar kaam karte hain.</p>

        <TypeProfileCard
          tag="Type 07"
          definition={<p style={{ margin: 0 }}>Hybrid Data Center ek strategy hai jisme company multiple Data Center models — Enterprise, Cloud, Colocation — ko apni zarurat ke hisaab se combine karti hai.</p>}
          analogyTitle="Real-Life Example"
          analogy={<p style={{ margin: 0 }}>Jaise koi business apna important stock khud ke warehouse me rakhe, fast-moving items ke liye rented space use kare, aur backup stock kisi third-party facility me store kare — sab ek saath chalte hain. Hybrid Data Center bhi exactly yahi karta hai.</p>}
          whoUses={["Large Enterprises", "Banks with Digital Services", "E-commerce Companies"]}
          advantages={["Flexibility", "Better cost optimization", "Better scalability", "Risk reduction"]}
          disadvantages={["Management complexity badh jaati hai", "Multiple providers coordinate karna padta hai"]}
        />

        <p style={S.p}>Aaj ki enterprise world me Hybrid approach bahut common ho chuki hai.</p>

        <hr style={S.divider} />

        <h2 id="comparison" style={S.h1}>Data Center Types Comparison</h2>

        <ComparisonTable />

        <hr style={S.divider} />

        <h2 id="which-is-best" style={S.h1}>Kaunsa Data Center Best Hai?</h2>

        <p style={S.p}>Ye sawaal bahut common hai. Lekin iska answer depend karta hai business requirement par.</p>
        <p style={S.p}>Agar:</p>
        <ul style={S.ul}>
          <li style={S.li}>Maximum control chahiye → Enterprise</li>
          <li style={S.li}>Infrastructure rent par chahiye → Colocation</li>
          <li style={S.li}>Fast deployment chahiye → Cloud</li>
          <li style={S.li}>Global-scale platform chalana hai → Hyperscale</li>
          <li style={S.li}>Low latency chahiye → Edge</li>
          <li style={S.li}>Operations outsource karni hain → Managed</li>
          <li style={S.li}>Multiple environments combine karne hain → Hybrid</li>
        </ul>

        <InsightCard>
          Koi bhi type universally best nahi hota. Best wahi hota hai jo business requirement ko match kare.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Har Data Center ek jaisa nahi hota.",
            "Different business requirements ke liye different Data Center models use hote hain.",
            "Enterprise Data Centers maximum control dete hain.",
            "Cloud Data Centers maximum flexibility dete hain.",
            "Hyperscale Data Centers internet giants ko power karte hain.",
            "Edge Data Centers latency reduce karte hain.",
            "Managed Data Centers operations simplify karte hain.",
            "Hybrid Data Centers modern enterprises ka preferred approach ban rahe hain.",
          ]}
        />

        <p style={S.p}>Ab jab bhi aap AWS, Azure, Google Cloud, YouTube, Netflix ya ChatGPT ka naam sunenge, aapko idea hoga ki unke piche kis type ka Data Center kaam kar raha ho sakta hai.</p>
        <p style={S.p}>Aur yahi understanding Data Center Infrastructure ki learning journey ka next important step hai.</p>

        <hr style={S.divider} />

        <h2 id="faq" style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticlePage>
    </>
  );
}
