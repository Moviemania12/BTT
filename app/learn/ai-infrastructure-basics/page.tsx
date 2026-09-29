import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Infrastructure Basics: What\'s Actually Behind ChatGPT — Behind The Tech",
  description:
    "GPUs, AI Data Centers, storage, networking, power and cooling — what infrastructure actually powers AI models like ChatGPT, explained in simple English.",
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
    title: "AI Infrastructure Basics: What Infrastructure Powers ChatGPT And Modern AI?",
    description:
      "AI is not just software — it\'s a whole ecosystem of GPUs, Data Centers, power and cooling. Explained in simple English.",
    url: "https://behindthetech.in/learn/ai-infrastructure-basics",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-12-01",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Infrastructure Basics — Behind The Tech",
    description: "From GPUs to cooling — the entire infrastructure behind AI, explained in simple English.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/ai-infrastructure-basics",
    languages: {
      "en": "https://behindthetech.in/learn/ai-infrastructure-basics",
      "hi": "https://behindthetech.in/hi/learn/ai-infrastructure-basics",
      "x-default": "https://behindthetech.in/learn/ai-infrastructure-basics",
    },
  },
};

// ─── TOC headings (FAQ excluded per gold-standard pattern) ───────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-ai-infrastructure",  text: "What Is AI Infrastructure?",       level: 2 },
  { id: "why-ai-needs-special-infra", text: "Why AI Needs Special Infrastructure", level: 2 },
  { id: "cpus-vs-gpus",               text: "CPUs vs GPUs",                     level: 2 },
  { id: "ai-data-centers",            text: "AI Data Centers",                  level: 2 },
  { id: "storage",                    text: "Storage — The Fuel Of AI",             level: 2 },
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is AI Infrastructure?",
    a: "The hardware, networking, storage, power and cooling ecosystem required to train and run AI models is called AI Infrastructure.",
  },
  {
    q: "Why is GPU used in AI?",
    a: "GPUs can perform thousands of calculations in parallel, which makes them ideal for AI workloads — this parallel processing capability is exactly what sets them apart from CPUs.",
  },
  {
    q: "Can normal servers run AI?",
    a: "Small AI workloads can run on them, but modern Large Language Models need specialized GPU infrastructure.",
  },
  {
    q: "What is the difference between an AI Data Center and a Traditional Data Center?",
    a: "AI Data Centers are GPU-centric and use high-performance networking, storage, power and cooling infrastructure — whereas traditional Data Centers mostly focus on virtual machines, storage and enterprise workloads.",
  },
  {
    q: "Will the importance of AI Infrastructure grow in the future?",
    a: "Yes. As AI adoption increases, the demand for Data Centers, GPUs, power systems and cooling infrastructure will rise rapidly.",
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

export default function AiInfrastructureBasicsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticleStructuredData slug="ai-infrastructure-basics" lang="en" />
      <ArticlePage
        slug="ai-infrastructure-basics"
        prevSlug="cloud-vs-data-center"
        nextSlug={undefined}
        relatedSlugs={["what-is-a-data-center", "cloud-vs-data-center"]}
        headings={HEADINGS}
        readingTimeMinutes={11}
      >

        <p style={S.p}>AI is everywhere today.</p>
        <p style={S.p}>Ask ChatGPT a question, get Gemini to write content, have Claude generate code, or code with Copilot — it all happens in a matter of seconds.</p>
        <p style={S.p}>But here\'s an interesting question:</p>
        <p style={S.p}><strong>How do these AI models actually run?</strong></p>
        <p style={S.p}>When you send ChatGPT a question, is the answer generated on some normal server? Or does AI need a different kind of infrastructure altogether?</p>

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

        <p style={S.p}>The reality is that running modern Artificial Intelligence requires some of the most powerful Data Centers and computing infrastructure in the world.</p>
        <p style={S.p}>AI is not just software.</p>
        <p style={S.p}>AI is a complete ecosystem made up of:</p>
        <ul style={S.ul}>
          <li style={S.li}>Data Centers</li>
          <li style={S.li}>GPUs</li>
          <li style={S.li}>High-Speed Networks</li>
          <li style={S.li}>Storage Systems</li>
          <li style={S.li}>Power Infrastructure</li>
          <li style={S.li}>Cooling Systems</li>
        </ul>
        <p style={S.p}>all working together.</p>
        <p style={S.p}>We call this ecosystem <strong>AI Infrastructure</strong>.</p>

        <hr style={S.divider} />

        <h2 id="what-is-ai-infrastructure" style={S.h1}>What Is AI Infrastructure?</h2>

        <p style={S.p}>In simple terms: AI Infrastructure is the collection of hardware and software resources used to train and run Artificial Intelligence models.</p>
        <p style={S.p}>There is a huge difference between the infrastructure requirements of traditional applications and AI applications.</p>
        <p style={S.p}>A normal website might only need a few servers.</p>
        <p style={S.p}>But training a Large Language Model (LLM) might need:</p>
        <ul style={S.ul}>
          <li style={S.li}>Thousands of GPUs</li>
          <li style={S.li}>Massive Storage</li>
          <li style={S.li}>Ultra-Fast Networking</li>
          <li style={S.li}>Advanced Cooling Systems</li>
        </ul>
        <p style={S.p}>could be required.</p>
        <p style={S.p}>That\'s why AI Infrastructure is often called the next evolution of the modern Data Center.</p>

        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="why-ai-needs-special-infra" style={S.h1}>Why AI Needs Special Infrastructure</h2>

        <p style={S.p}>Suppose you need to process an Excel file. A normal CPU-based server can handle that easily.</p>
        <p style={S.p}>Now suppose you need to train an AI model to understand human language by reading billions of words. The scale of computation changes completely.</p>
        <p style={S.p}>AI models need:</p>
        <ul style={S.ul}>
          <li style={S.li}>Trillions of calculations</li>
          <li style={S.li}>Parallel processing</li>
          <li style={S.li}>Massive memory access</li>
        </ul>
        <p style={S.p}>is required.</p>
        <p style={S.p}>That\'s why traditional servers aren\'t sufficient for AI workloads.</p>
        <p style={S.p}>This is where GPUs come into the picture.</p>

        <hr style={S.divider} />

        <h2 id="cpus-vs-gpus" style={S.h1}>CPUs vs GPUs</h2>

        <p style={S.p}>To understand AI Infrastructure, it\'s important to understand the difference between a CPU and a GPU.</p>

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

        <p style={S.p}>GPUs were originally designed for graphics processing. But AI researchers discovered that GPUs can perform thousands of calculations simultaneously. That\'s why GPUs dominate Machine Learning, Deep Learning and Generative AI.</p>
        <p style={S.p}>In today\'s AI Data Centers, GPU clusters are the most valuable asset.</p>

        <hr style={S.divider} />

        <h2 id="ai-data-centers" style={S.h1}>AI Data Centers</h2>

        <p style={S.p}>There are significant differences between a Traditional Data Center and an AI Data Center.</p>

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

        <p style={S.p}>AI Data Centers are often called "GPU Factories." Here, thousands of GPUs are connected together and work on a single AI model.</p>

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

        <h2 id="storage" style={S.h1}>Storage: The Fuel Of AI</h2>

        <p style={S.p}>Training AI models requires enormous amounts of data.</p>
        <p style={S.p}>Examples:</p>
        <ul style={S.ul}>
          <li style={S.li}>Books</li>
          <li style={S.li}>Research Papers</li>
          <li style={S.li}>Websites</li>
          <li style={S.li}>Code Repositories</li>
          <li style={S.li}>Images</li>
          <li style={S.li}>Videos</li>
        </ul>
        <p style={S.p}>All of this data is stored in storage systems.</p>

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

        <p style={S.p}>If storage isn\'t fast enough, GPUs end up sitting idle. That\'s why AI environments rely on NVMe Storage, Distributed Storage, and High-Performance Storage Clusters.</p>
        <p style={S.p}>Storage is the fuel of AI Infrastructure.</p>

        <hr style={S.divider} />

        <h2 id="networking" style={S.h1}>Networking: The Layer That Connects Everything</h2>

        <p style={S.p}>When thousands of GPUs are working together, they need to continuously exchange data. This is where networking becomes critical.</p>

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

        <p style={S.p}>AI networks are much faster than traditional enterprise networks. AI environments commonly use:</p>
        <ul style={S.ul}>
          <li style={S.li}>High-Speed Ethernet</li>
          <li style={S.li}>InfiniBand</li>
          <li style={S.li}>Low-Latency Fabrics</li>
        </ul>
        <p style={S.p}>If the network slows down, the entire AI training process can slow down.</p>

        <div style={S.learnMore}>
          <TopicLink slug="how-the-internet-works" label="Learn More: How The Internet Works" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="power" style={S.h1}>Power: AI\'s Biggest Challenge</h2>

        <p style={S.p}>The AI revolution has brought a new challenge along with it: Power Consumption.</p>

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

        <p style={S.p}>A modern AI GPU often consumes many times more power than a traditional server. When thousands of GPUs run together, power demand becomes enormous.</p>
        <p style={S.p}>That\'s why AI Data Centers need:</p>
        <ul style={S.ul}>
          <li style={S.li}>High-Capacity UPS</li>
          <li style={S.li}>Redundant Power Systems</li>
          <li style={S.li}>Large Transformers</li>
          <li style={S.li}>DG Backup Systems</li>
        </ul>
        <p style={S.p}>is required.</p>

        <InsightCard>
          Many experts consider power availability the biggest bottleneck for future AI growth — GPUs can be manufactured, but making sure there\'s enough electricity to run them is a separate challenge altogether.
        </InsightCard>

        <hr style={S.divider} />

        <h2 id="cooling" style={S.h1}>Cooling: How Is All That Heat Handled?</h2>

        <p style={S.p}>The more power that\'s consumed, the more heat is generated. Traditional cooling methods aren\'t sufficient for every AI workload.</p>

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

        <p style={S.p}>That\'s why AI Data Centers are increasingly using:</p>
        <ul style={S.ul}>
          <li style={S.li}>Liquid Cooling</li>
          <li style={S.li}>Direct-to-Chip Cooling</li>
          <li style={S.li}>Rear Door Heat Exchangers</li>
          <li style={S.li}>Advanced Containment Systems</li>
        </ul>
        <p style={S.p}>Cooling is an equally important component of AI Infrastructure. GPUs can\'t perform reliably without proper cooling.</p>

        <hr style={S.divider} />

        <h2 id="chatgpt-request-flow" style={S.h1}>How Does A ChatGPT Request Travel Through The Infrastructure?</h2>

        <p style={S.p}>Suppose you ask ChatGPT:</p>
        <p style={{ ...S.p, fontStyle: "italic", color: "#1f2937" }}>"What is a Data Center?"</p>
        <p style={S.p}>Here\'s roughly how the process works:</p>

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

        <p style={S.p}>This entire process usually completes within seconds. But behind it, an infrastructure of thousands of servers and GPUs is doing the work.</p>

        <div style={S.learnMore}>
          <TopicLink slug="cloud-vs-data-center" label="Learn More: Cloud vs Data Center" variant="inline" />
        </div>

        <hr style={S.divider} />

        <h2 id="the-ai-infrastructure-race" style={S.h1}>Why Companies Are Building AI Infrastructure So Fast</h2>

        <p style={S.p}>Today, Microsoft, Google, OpenAI, Meta, and Amazon are all aggressively building AI Infrastructure.</p>
        <p style={S.p}>The reason is simple. AI demand is growing at an unprecedented pace.</p>
        <p style={S.p}>The more AI adoption grows:</p>
        <ul style={S.ul}>
          <li style={S.li}>the more GPUs</li>
          <li style={S.li}>the more power</li>
          <li style={S.li}>the more Data Centers</li>
          <li style={S.li}>the more cooling capacity</li>
        </ul>
        <p style={S.p}>will be needed.</p>
        <p style={S.p}>The AI Infrastructure race has become one of the most important competitions in today\'s technology industry.</p>

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
            "AI is not just software.",
            "AI Infrastructure is a combination of hardware and software.",
            "GPUs are the core component of AI workloads.",
            "AI Data Centers are different from traditional Data Centers.",
            "Storage and Networking directly impact AI performance.",
            "Power and Cooling are the biggest challenges in AI Infrastructure.",
            "Tools like ChatGPT run on massive GPU-based infrastructure behind the scenes.",
            "Future technology growth will depend heavily on AI Infrastructure.",
          ]}
        />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticlePage>
    </>
  );
}
