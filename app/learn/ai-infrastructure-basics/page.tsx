import type { Metadata } from "next";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Infrastructure Basics: ChatGPT Ke Peeche Kya Chalta Hai — Behind The Tech",
  description:
    "GPUs, AI Data Centers, storage, networking, power aur cooling — ChatGPT jaise AI models ko run karne ke peeche kaunsa infrastructure kaam karta hai, simple Hinglish mein.",
  keywords: [
    "ai infrastructure",
    "ai infrastructure basics",
    "gpu vs cpu",
    "ai data center",
    "chatgpt infrastructure",
    "gpu cluster",
    "ai cooling liquid cooling",
    "ai infrastructure in hindi",
    "behind the tech",
  ],
  openGraph: {
    title: "AI Infrastructure Basics: ChatGPT Aur Modern AI Ke Peeche Kya Infrastructure Kaam Karta Hai?",
    description:
      "AI sirf software nahi hai — GPUs, Data Centers, power aur cooling ka poora ecosystem. Simple Hinglish mein samjho.",
    url: "https://behindthetech.in/learn/ai-infrastructure-basics",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-12-01",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infrastructure Basics — Behind The Tech",
    description: "GPUs se lekar cooling tak — AI ke peeche ka poora infrastructure simple Hinglish mein.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/ai-infrastructure-basics",
  },
};

// ─── TOC headings (FAQ excluded per gold-standard pattern) ───────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-ai-infrastructure",  text: "What Is AI Infrastructure?",       level: 2 },
  { id: "why-ai-needs-special-infra", text: "Why AI Needs Special Infrastructure", level: 2 },
  { id: "cpus-vs-gpus",               text: "CPUs vs GPUs",                     level: 2 },
  { id: "ai-data-centers",            text: "AI Data Centers",                  level: 2 },
  { id: "storage",                    text: "Storage — AI Ka Fuel",             level: 2 },
  { id: "networking",                 text: "Networking",                       level: 2 },
  { id: "power",                      text: "Power",                            level: 2 },
  { id: "cooling",                    text: "Cooling",                          level: 2 },
  { id: "chatgpt-request-flow",       text: "ChatGPT Request Flow",             level: 2 },
  { id: "the-ai-infrastructure-race", text: "The AI Infrastructure Race",       level: 2 },
  { id: "key-takeaways",              text: "Key Takeaways",                    level: 2 },
];

// ─── Shared inline styles (identical tokens to cloud-vs-data-center) ────────

const S = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    letterSpacing: "0.04em",
    color: "var(--color-text-primary)",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,

  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "var(--color-text-primary)",
    lineHeight: 1.2,
    marginTop: 56,
    marginBottom: 14,
  } as React.CSSProperties,

  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
  } as React.CSSProperties,

  p: {
    marginBottom: 16,
    color: "var(--color-text-secondary)",
  } as React.CSSProperties,

  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,

  li: {
    color: "var(--color-text-secondary)",
    lineHeight: 1.65,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: "1px solid rgba(0,212,255,0.08)",
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
    background: "var(--color-neon-blue)",
    boxShadow: "0 0 8px rgba(0,212,255,0.5)",
  } as React.CSSProperties,

  cardBodyInsight: {
    background: "rgba(0,212,255,0.035)",
    border: "1px solid rgba(0,212,255,0.16)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,

  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(0,212,255,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,

  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))",
  } as React.CSSProperties,

  takeawayBody: {
    padding: "22px 24px 24px",
  } as React.CSSProperties,

  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "var(--color-neon-blue)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,

  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(0,212,255,0.12)",
  } as React.CSSProperties,

  imageFigure: {
    margin: "8px 0 24px",
  } as React.CSSProperties,

  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "var(--color-text-muted)",
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
        <span style={{ ...S.cardLabel, color: "var(--color-neon-blue)" }}>INSIGHT</span>
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
                  <path d="M4 13l5 5L20 6" stroke="var(--color-neon-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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

// ─── ComparisonCard — two-column comparison block (same pattern as cloud-vs-data-center) ──

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
        background: "rgba(0,212,255,0.03)",
        border: "1px solid rgba(0,212,255,0.12)",
        overflow: "hidden",
        margin: "20px 0 32px",
      }}
    >
      <div style={{ height: 2, background: "var(--color-neon-blue)", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-neon-blue)",
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
                color: "var(--color-neon-cyan)",
                marginBottom: 8,
              }}
            >
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
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
                color: "var(--color-neon-blue)",
                marginBottom: 8,
              }}
            >
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((item, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
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

// ─── RequestFlowDiagram — reusable card-style sequential step diagram ───────

interface FlowStep {
  icon: string;
  label: string;
  sublabel?: string;
}

function RequestFlowDiagram({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div
        style={{
          borderRadius: 10,
          background: "rgba(0,212,255,0.025)",
          border: "1px solid rgba(0,212,255,0.10)",
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
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                  }}
                >
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)" }}>
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
                    color: "var(--color-neon-blue)",
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "AI Infrastructure kya hota hai?",
    a: "AI models ko train aur run karne ke liye required hardware, networking, storage, power aur cooling ecosystem ko AI Infrastructure kaha jata hai.",
  },
  {
    q: "AI me GPU ka use kyun hota hai?",
    a: "GPUs thousands of calculations parallel perform kar sakte hain, jo AI workloads ke liye ideal hota hai — yahi parallel processing capability hi unhe CPUs se alag banati hai.",
  },
  {
    q: "Kya normal servers AI run kar sakte hain?",
    a: "Small AI workloads run ho sakte hain, lekin modern Large Language Models ke liye specialized GPU infrastructure ki zarurat hoti hai.",
  },
  {
    q: "AI Data Center aur Traditional Data Center me kya difference hai?",
    a: "AI Data Centers GPU-centric hote hain aur high-performance networking, storage, power aur cooling infrastructure use karte hain — jabki traditional Data Centers mostly virtual machines, storage aur enterprise workloads par focus karte hain.",
  },
  {
    q: "Future me AI Infrastructure ka importance badhega?",
    a: "Haan. AI adoption badhne ke saath Data Centers, GPUs, power systems aur cooling infrastructure ki demand rapidly increase hogi.",
  },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(0,212,255,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 8 }}>
            {item.q}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0 }}>{item.a}</p>
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

export default function AiInfrastructureBasicsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticlePage
        slug="ai-infrastructure-basics"
        prevSlug="cloud-vs-data-center"
        nextSlug={undefined}
        relatedSlugs={["what-is-a-data-center", "cloud-vs-data-center"]}
        headings={HEADINGS}
        readingTimeMinutes={11}
      >

        <p style={S.p}>Aaj AI har jagah dikh raha hai.</p>
        <p style={S.p}>ChatGPT se sawal pucho, Gemini se content likhwao, Claude se code generate karwao ya Copilot se programming karo — sab kuch kuch hi seconds me ho jata hai.</p>
        <p style={S.p}>Lekin ek interesting sawal hai:</p>
        <p style={S.p}><strong>Ye AI models actually chalte kaise hain?</strong></p>
        <p style={S.p}>Jab aap ChatGPT ko koi question bhejte ho, to kya kisi normal server par answer generate hota hai? Ya AI ke liye alag infrastructure ki zarurat padti hai?</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/ai-infrastructure-overview.png"
              alt="AI Infrastructure Overview — Data Centers, GPUs, networking, power and cooling working together"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            AI Infrastructure — a complete ecosystem, not just software.
          </figcaption>
        </figure>

        <p style={S.p}>Reality ye hai ki modern Artificial Intelligence ko run karne ke liye duniya ke sabse powerful Data Centers aur computing infrastructure ki zarurat hoti hai.</p>
        <p style={S.p}>AI sirf software nahi hai.</p>
        <p style={S.p}>AI ek complete ecosystem hai jisme:</p>
        <ul style={S.ul}>
          <li style={S.li}>Data Centers</li>
          <li style={S.li}>GPUs</li>
          <li style={S.li}>High-Speed Networks</li>
          <li style={S.li}>Storage Systems</li>
          <li style={S.li}>Power Infrastructure</li>
          <li style={S.li}>Cooling Systems</li>
        </ul>
        <p style={S.p}>sab milkar kaam karte hain.</p>
        <p style={S.p}>Isi ecosystem ko hum <strong>AI Infrastructure</strong> kehte hain.</p>

        <hr style={S.divider} />

        <h2 id="what-is-ai-infrastructure" style={S.h1}>AI Infrastructure Kya Hota Hai?</h2>

        <p style={S.p}>Simple language me: AI Infrastructure un saare hardware aur software resources ka collection hai jo Artificial Intelligence models ko train aur run karne ke liye use hote hain.</p>
        <p style={S.p}>Traditional applications aur AI applications ke infrastructure requirements me bahut bada difference hota hai.</p>
        <p style={S.p}>Ek normal website ko ho sakta hai kuch servers hi chahiye.</p>
        <p style={S.p}>Lekin ek Large Language Model (LLM) ko train karne ke liye:</p>
        <ul style={S.ul}>
          <li style={S.li}>Thousands of GPUs</li>
          <li style={S.li}>Massive Storage</li>
          <li style={S.li}>Ultra-Fast Networking</li>
          <li style={S.li}>Advanced Cooling Systems</li>
        </ul>
        <p style={S.p}>ki zarurat pad sakti hai.</p>
        <p style={S.p}>Isi wajah se AI Infrastructure ko modern Data Center evolution bhi kaha ja sakta hai.</p>

        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="why-ai-needs-special-infra" style={S.h1}>Why AI Needs Special Infrastructure</h2>

        <p style={S.p}>Maan lo aapko ek Excel file process karni hai. Ye kaam ek normal CPU-based server aasani se kar lega.</p>
        <p style={S.p}>Ab maan lo aapko billions of words padhkar ek AI model train karna hai jo human language samajh sake. Ab computation ka scale completely change ho jata hai.</p>
        <p style={S.p}>AI models ko:</p>
        <ul style={S.ul}>
          <li style={S.li}>Trillions of calculations</li>
          <li style={S.li}>Parallel processing</li>
          <li style={S.li}>Massive memory access</li>
        </ul>
        <p style={S.p}>ki zarurat hoti hai.</p>
        <p style={S.p}>Isi liye traditional servers AI workloads ke liye sufficient nahi hote.</p>
        <p style={S.p}>Yahan GPUs ka role shuru hota hai.</p>

        <hr style={S.divider} />

        <h2 id="cpus-vs-gpus" style={S.h1}>CPUs vs GPUs</h2>

        <p style={S.p}>AI Infrastructure samajhne ke liye CPU aur GPU ka difference samajhna zaruri hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/cpu-vs-gpu.png"
              alt="CPU vs GPU — sequential versus massively parallel processing"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            CPU — versatile and sequential. GPU — built for massive parallel calculations.
          </figcaption>
        </figure>

        <ComparisonCard
          tag="Processor Comparison"
          leftTitle="CPU"
          leftItems={["Highly versatile processor", "Operating Systems", "Databases", "Applications", "Websites"]}
          rightTitle="GPU"
          rightItems={["Originally built for graphics", "Simultaneously thousands of calculations", "Machine Learning", "Deep Learning", "Generative AI"]}
        />

        <p style={S.p}>GPU ko originally graphics processing ke liye design kiya gaya tha. Lekin AI researchers ne discover kiya ki GPUs simultaneously hazaron calculations kar sakte hain. Isi wajah se Machine Learning, Deep Learning aur Generative AI me GPUs dominate karte hain.</p>
        <p style={S.p}>Aaj ke AI Data Centers me GPU clusters sabse valuable asset hote hain.</p>

        <hr style={S.divider} />

        <h2 id="ai-data-centers" style={S.h1}>AI Data Centers</h2>

        <p style={S.p}>Traditional Data Center aur AI Data Center me kaafi differences hote hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/ai-data-center.png"
              alt="AI Data Center — GPU-centric facility built for AI training and inference"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            AI Data Centers — built around GPU clusters, not just virtual machines.
          </figcaption>
        </figure>

        <ComparisonCard
          tag="Data Center Comparison"
          leftTitle="Traditional Data Center"
          leftItems={["Virtual Machines", "Storage", "Applications", "Enterprise Workloads"]}
          rightTitle="AI Data Center"
          rightItems={["GPU Clusters", "AI Training", "AI Inference", "High-Speed Networking"]}
        />

        <p style={S.p}>AI Data Centers ko kai baar "GPU Factories" bhi kaha jata hai. Yahan thousands of GPUs ek saath connected hote hain aur ek hi AI model par kaam karte hain.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/gpu-cluster.png"
              alt="GPU Cluster — thousands of GPUs connected and working on a single AI model"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            GPU Cluster — thousands of GPUs working together on a single model.
          </figcaption>
        </figure>

        <div style={S.learnMore}>
          <TopicLink slug="data-center-types" label="Learn More: Data Center Types" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="storage" style={S.h1}>Storage: AI Ka Fuel</h2>

        <p style={S.p}>AI models ko train karne ke liye enormous amounts of data ki zarurat hoti hai.</p>
        <p style={S.p}>Examples:</p>
        <ul style={S.ul}>
          <li style={S.li}>Books</li>
          <li style={S.li}>Research Papers</li>
          <li style={S.li}>Websites</li>
          <li style={S.li}>Code Repositories</li>
          <li style={S.li}>Images</li>
          <li style={S.li}>Videos</li>
        </ul>
        <p style={S.p}>Ye sab data storage systems me store kiya jata hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/ai-storage-systems.png"
              alt="AI Storage Systems — NVMe and distributed storage feeding GPU clusters"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Storage — the fuel that keeps GPUs fed with data.
          </figcaption>
        </figure>

        <p style={S.p}>Agar storage fast nahi hoga to GPUs idle reh jayenge. Isi liye AI environments me NVMe Storage, Distributed Storage, aur High-Performance Storage Clusters ka use hota hai.</p>
        <p style={S.p}>Storage AI Infrastructure ka fuel hota hai.</p>

        <hr style={S.divider} />

        <h2 id="networking" style={S.h1}>Networking: Sab Kuch Connect Karne Wala Layer</h2>

        <p style={S.p}>Agar thousands of GPUs ek saath kaam kar rahe hain, to unhe continuously data exchange karna padta hai. Yahan networking critical ho jati hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/high-speed-networking.png"
              alt="High-Speed Networking — InfiniBand and low-latency fabrics connecting GPUs"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Networking — the layer that keeps thousands of GPUs in sync.
          </figcaption>
        </figure>

        <p style={S.p}>Traditional enterprise networks ke comparison me AI networks bahut faster hote hain. AI environments me commonly use hota hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>High-Speed Ethernet</li>
          <li style={S.li}>InfiniBand</li>
          <li style={S.li}>Low-Latency Fabrics</li>
        </ul>
        <p style={S.p}>Network slow hua to poori AI training process slow ho sakti hai.</p>

        <div style={S.learnMore}>
          <TopicLink slug="how-the-internet-works" label="Learn More: How The Internet Works" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="power" style={S.h1}>Power: AI Ka Sabse Bada Challenge</h2>

        <p style={S.p}>AI revolution ke saath ek naya challenge saamne aaya hai: Power Consumption.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/power-for-ai.png"
              alt="Power for AI — high-capacity UPS and redundant power systems for GPU clusters"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Power — often called the biggest bottleneck for future AI growth.
          </figcaption>
        </figure>

        <p style={S.p}>Ek modern AI GPU kai baar traditional servers se multiple times zyada power consume karta hai. Jab thousands of GPUs ek saath run karte hain, to power demand enormous ho jati hai.</p>
        <p style={S.p}>Isi wajah se AI Data Centers ko:</p>
        <ul style={S.ul}>
          <li style={S.li}>High-Capacity UPS</li>
          <li style={S.li}>Redundant Power Systems</li>
          <li style={S.li}>Large Transformers</li>
          <li style={S.li}>DG Backup Systems</li>
        </ul>
        <p style={S.p}>ki zarurat hoti hai.</p>

        <InsightCard>
          Future AI growth ka biggest bottleneck kai experts power availability ko maante hain — GPUs ban sakte hain, lekin unhe chalane ke liye enough electricity available hona ek alag challenge hai.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="cooling" style={S.h1}>Cooling: Heat Ko Kaise Handle Kiya Jata Hai?</h2>

        <p style={S.p}>Jitni zyada power consume hogi, utni zyada heat generate hogi. Traditional cooling methods har AI workload ke liye sufficient nahi hote.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/liquid-cooling-system.png"
              alt="Liquid Cooling System — direct-to-chip cooling for high-density GPU racks"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Liquid Cooling — keeping dense GPU racks stable under heavy load.
          </figcaption>
        </figure>

        <p style={S.p}>Isi liye AI Data Centers increasingly use kar rahe hain:</p>
        <ul style={S.ul}>
          <li style={S.li}>Liquid Cooling</li>
          <li style={S.li}>Direct-to-Chip Cooling</li>
          <li style={S.li}>Rear Door Heat Exchangers</li>
          <li style={S.li}>Advanced Containment Systems</li>
        </ul>
        <p style={S.p}>Cooling AI Infrastructure ka equally important component hai. GPU bina cooling ke stable perform nahi kar sakte.</p>

        <hr style={S.divider} />

        <h2 id="chatgpt-request-flow" style={S.h1}>ChatGPT Ka Request Infrastructure Ke Through Kaise Travel Karta Hai?</h2>

        <p style={S.p}>Maan lo aap ChatGPT ko puchte ho:</p>
        <p style={{ ...S.p, fontStyle: "italic", color: "var(--color-text-primary)" }}>"What is a Data Center?"</p>
        <p style={S.p}>Process kuch is tarah hoti hai:</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/chatgpt-request-flow.png"
              alt="ChatGPT Request Flow — from user prompt through GPU cluster to generated response"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            What happens between asking ChatGPT a question and getting an answer.
          </figcaption>
        </figure>

        <RequestFlowDiagram
          caption="ChatGPT Request Flow — prompt to response"
          steps={[
            { icon: "💭", label: "User Request" },
            { icon: "🌐", label: "AI Provider" },
            { icon: "⚖️", label: "Load Balancer" },
            { icon: "🖥️", label: "Inference Servers" },
            { icon: "🧠", label: "GPU Cluster" },
            { icon: "💬", label: "Response Generated" },
          ]}
        />

        <p style={S.p}>Ye poora process usually seconds ke andar complete ho jata hai. Lekin iske peeche thousands of servers aur GPUs ka infrastructure kaam kar raha hota hai.</p>

        <div style={S.learnMore}>
          <TopicLink slug="cloud-vs-data-center" label="Learn More: Cloud vs Data Center" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="the-ai-infrastructure-race" style={S.h1}>Why Companies Are Building AI Infrastructure So Fast</h2>

        <p style={S.p}>Aaj Microsoft, Google, OpenAI, Meta, aur Amazon — sab aggressively AI Infrastructure build kar rahe hain.</p>
        <p style={S.p}>Reason simple hai. AI demand unprecedented speed se grow kar rahi hai.</p>
        <p style={S.p}>Jitni zyada AI adoption hogi:</p>
        <ul style={S.ul}>
          <li style={S.li}>Utne zyada GPUs</li>
          <li style={S.li}>Utni zyada power</li>
          <li style={S.li}>Utne zyada Data Centers</li>
          <li style={S.li}>Utni zyada cooling capacity</li>
        </ul>
        <p style={S.p}>ki zarurat padegi.</p>
        <p style={S.p}>AI Infrastructure race aaj ki technology industry ka sabse important competition ban chuki hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/ai-infrastructure-basics/ai-ecosystem-map.png"
              alt="AI Ecosystem Map — Data Centers, GPUs, storage, networking, power and cooling working as one system"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            The full AI ecosystem — every layer working together, not in isolation.
          </figcaption>
        </figure>

        <hr style={S.divider} />

        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "AI sirf software nahi hai.",
            "AI Infrastructure hardware aur software ka combination hai.",
            "GPUs AI workloads ka core component hain.",
            "AI Data Centers traditional Data Centers se alag hote hain.",
            "Storage aur Networking AI performance ko directly impact karte hain.",
            "Power aur Cooling AI Infrastructure ke biggest challenges hain.",
            "ChatGPT jaise tools ke peeche massive GPU-based infrastructure kaam karta hai.",
            "Future technology growth AI Infrastructure par heavily depend karegi.",
          ]}
        />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticlePage>
    </>
  );
}
