import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How The Internet Works: How the Internet Actually Works — Behind The Tech",
  description:
    "DNS, routers, submarine cables and Data Centers — what happens behind the scenes when you search on Google or watch YouTube. The complete journey in simple English.",
  keywords: [
    "how the internet works",
    "how the internet works",
    "what is dns",
    "what is isp",
    "submarine cables",
    "data packets",
    "internet backbone",
    "behind the tech",
  ],
  openGraph: {
    title: "How The Internet Works: How the Internet Actually Works",
    description:
      "DNS, routers, submarine cables and Data Centers — understand every request's journey, in simple English.",
    url: "https://behindthetech.in/learn/how-the-internet-works",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-11-12",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "How The Internet Works — Behind The Tech",
    description: "How the Internet completes a request — from DNS all the way to the Data Center.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/how-the-internet-works",
    languages: {
      "en": "https://behindthetech.in/learn/how-the-internet-works",
      "hi": "https://behindthetech.in/hi/learn/how-the-internet-works",
      "x-default": "https://behindthetech.in/learn/how-the-internet-works",
    },
  },
};

// ─── TOC headings (locked, FAQ excluded per gold-standard pattern) ───────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-happens-when-you-go-online", text: "What Happens When You Go Online", level: 2 },
  { id: "dns-the-internets-phonebook",      text: "DNS — The Internet's Phonebook", level: 2 },
  { id: "packets-and-routing",              text: "Packets and Routing",          level: 2 },
  { id: "the-physical-internet",            text: "The Physical Internet",        level: 2 },
  { id: "data-centers-the-destination",     text: "Data Centers — The Destination", level: 2 },
  { id: "real-world-journeys",              text: "Real-World Journeys",          level: 2 },
  { id: "cdns-getting-closer",               text: "CDNs — Getting Closer",        level: 2 },
  { id: "ai-and-the-modern-internet",        text: "AI and the Modern Internet",    level: 2 },
  { id: "key-takeaways",                    text: "Key Takeaways",                level: 2 },
];

// ─── Shared inline styles (identical tokens/pattern to data-center-types) ────

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

  continueLearningGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    margin: "20px 0 8px",
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

// ─── Continue Learning ────────────────────────────────────────────────────────

function ContinueLearning() {
  const items: { slug: string; label: string }[] = [
    { slug: "what-is-a-data-center", label: "What Is A Data Center?" },
    { slug: "data-center-types", label: "Data Center Types" },
    { slug: "server-basics", label: "Server Basics" },
    { slug: "ai-infrastructure-basics", label: "AI Infrastructure Basics" },
  ];

  return (
    <div style={S.continueLearningGrid}>
      {items.map((item) => (
        <TopicLink key={item.slug} slug={item.slug} variant="card" />
      ))}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Are the Internet and WiFi the same thing?",
    a: "No. WiFi is just one medium for accessing the Internet — a wireless connection that links your device to a router. The Internet itself is a separate, much larger global network.",
  },
  {
    q: "What does DNS stand for?",
    a: "Domain Name System. It converts a website's name (like behindthetech.in) into its machine-friendly IP Address.",
  },
  {
    q: "Does the Internet run on satellites?",
    a: "Partially. Satellites are used, but most of the world's Internet traffic travels through underwater submarine fiber cables.",
  },
  {
    q: "What's the difference between a server and a normal computer?",
    a: "A server is also a computer, but it's specially optimized for handling requests and running 24/7 — with more reliability, more uptime, and more processing capacity.",
  },
  {
    q: "Why is the Data Center important for the Internet?",
    a: "Because the actual servers for websites and applications are hosted inside Data Centers. Whenever you send a request, it eventually reaches some Data Center.",
  },
  {
    q: "Who owns the Internet?",
    a: "The Internet has no single owner. It's run collectively by thousands of ISPs, telecom companies, and organizations — which is exactly why it's called a 'network of networks'.",
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

export default function HowTheInternetWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ArticleStructuredData slug="how-the-internet-works" lang="en" />
      <ArticlePage
        slug="how-the-internet-works"
        prevSlug="data-center-types"
        nextSlug={undefined}
        relatedSlugs={["what-is-a-data-center", "data-center-types", "ai-infrastructure-basics"]}
        headings={HEADINGS}
        readingTimeMinutes={12}
      >

        {/* ── What Happens When You Go Online ── */}
        <h2 id="what-happens-when-you-go-online" style={S.h2}>What Happens When You Go Online</h2>

        <p style={S.p}>You wake up in the morning, unlock your phone, and check WhatsApp. As soon as you reach office, you open your mail. Several times a day, you search for something on Google. In the evening you watch YouTube, and at night you ask some AI tool a question.</p>
        <p style={S.p}>All of this feels so normal that we never stop to think about what's happening behind the scenes.</p>
        <p style={S.p}>Your phone might be in Jodhpur. The server the data is coming from might be in Mumbai, Singapore, London, or America. Yet the response reaches you within a few seconds.</p>
        <p style={S.p}><strong>How?</strong></p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/internet-overview.png"
              alt="Internet Overview — global network of connected systems"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Internet — physical infrastructure connecting the world, not invisible magic.
          </figcaption>
        </figure>

        <p style={S.p}>The Internet isn't some invisible magic. It's a physical infrastructure built from cables, routers, switches, servers, and Data Centers.</p>
        <p style={S.p}>The Internet is a global network of connected computer networks around the world. That's why it's often called a <strong>Network of Networks</strong>. Every home's WiFi network, every office's network, every ISP's backbone network, and every Data Center's network together make up the Internet.</p>

        <h3 style={S.h3}>Road Network Example</h3>
        <p style={S.p}>Think of India's road network. There are lanes. There are city roads. There are national highways. There are expressways. All these roads together connect the entire country.</p>
        <p style={S.p}>The Internet works much the same way. The only difference is that instead of vehicles, data travels here — and to reach its destination, it too has to follow a route.</p>

        <h3 style={S.h3}>The Internet And The Web Are Not The Same Thing</h3>
        <p style={S.p}>This is the most common confusion. Many people think the Internet and the Web are the same thing — in reality, the two are different.</p>
        <p style={S.p}>The <strong>Internet</strong> is infrastructure: fiber optic cables, routers, switches, ISP networks, servers, and Data Centers. The <strong>Web</strong> is a service that runs on top of the Internet — Google, YouTube, Facebook, Amazon, Behind The Tech, these are all examples.</p>
        <p style={S.p}>A simple analogy: Internet = Road Network, Websites = Vehicles. A vehicle can't run without a road, and a road has no practical use without a vehicle. When you open Google, you're using the Internet — but Google itself isn't the Internet, it's a service that runs on the Internet.</p>

        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── DNS — The Internet's Phonebook ── */}
        <h2 id="dns-the-internets-phonebook" style={S.h1}>What Is DNS?</h2>

        <p style={S.p}>DNS stands for <strong>Domain Name System</strong>. DNS is the Internet's phonebook.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/dns-lookup.png"
              alt="DNS Lookup — converting domain names to IP addresses"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            DNS — translating human-friendly names into machine-friendly addresses.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Real-Life Example</h3>
        <p style={S.p}>You know a friend's name. But to call them, you need a mobile number. You search their name in contacts and get the number. DNS does exactly the same thing.</p>

        <h3 style={S.h3}>Example</h3>
        <p style={S.p}>Human-Friendly Address: <strong>behindthetech.in</strong></p>
        <p style={S.p}>Machine-Friendly Address: <strong>104.xxx.xxx.xxx</strong></p>
        <p style={S.p}>A computer doesn't understand a website's name. A computer understands an IP Address. So the browser first asks DNS: <em>"What's the IP Address for behindthetech.in?"</em> DNS gives the answer, and only then can the browser send the request to the right destination.</p>

        <RequestFlowDiagram
          caption="DNS Resolution Flow — name becomes address"
          steps={[
            { icon: "🌐", label: "Type URL", sublabel: "behindthetech.in" },
            { icon: "❓", label: "Browser Asks DNS" },
            { icon: "📖", label: "DNS Looks Up" },
            { icon: "📍", label: "Returns IP", sublabel: "104.xxx.xxx.xxx" },
            { icon: "🔗", label: "Connects to Server" },
          ]}
        />

        <h3 style={S.h3}>An Interesting Fact</h3>
        <p style={S.p}>We humans look at names and keywords. But the Internet doesn't understand names — the Internet understands IP Addresses. When you search something on Google, first the IP Address of Google's server is looked up, and only then is the search request sent to Google's Data Center. In other words, for the Internet, the destination's address is what matters most.</p>

        <hr style={S.divider} />

        {/* ── Packets and Routing ── */}
        <h2 id="packets-and-routing" style={S.h1}>What Is A Data Packet?</h2>

        <p style={S.p}>If you send a friend a 1GB video, does the entire video travel across the Internet in one go? No.</p>
        <p style={S.p}>The Internet breaks data down into small pieces. These pieces are called <strong>Data Packets</strong>. Each packet carries some important information:</p>
        <ul style={S.ul}>
          <li style={S.li}>Source Address</li>
          <li style={S.li}>Destination Address</li>
          <li style={S.li}>Packet/Sequence Number</li>
          <li style={S.li}>Actual Data</li>
        </ul>
        <p style={S.p}>After reaching the destination, these packets are reassembled. Much like a courier company splits one large shipment into multiple boxes before sending it. If one packet is delayed, the rest keep traveling anyway — which is exactly why the Internet is scalable and reliable.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/router-packet-routing.png"
              alt="Router Packet Routing — directing data packets to their destination"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Routers — deciding the next stop for every packet, millions of times a second.
          </figcaption>
        </figure>

        <h3 style={S.h3}>What Does A Router Do?</h3>
        <p style={S.p}>A router is the Internet's traffic manager. Its job is to send data packets down the right route. Think of sending a courier — the courier company decides which city the parcel goes to from which city. A router does exactly the same thing. Every router looks at a packet and decides: <em>"Where's the next stop?"</em> This process is exactly what lets packets travel all around the world.</p>

        <h3 style={S.h3}>What Is An ISP?</h3>
        <p style={S.p}>ISP stands for <strong>Internet Service Provider</strong> — Jio, Airtel, BSNL are examples. An ISP gives you access to the Internet. If the Internet is a highway, the ISP is that highway's entry gate. All your traffic travels through your ISP — which is exactly why, if the ISP goes down, your Internet access goes down too.</p>

        <RequestFlowDiagram
          caption="Complete Internet Request Journey — device to destination and back"
          steps={[
            { icon: "📱", label: "User Device" },
            { icon: "📡", label: "Router / WiFi" },
            { icon: "🏢", label: "ISP" },
            { icon: "📖", label: "DNS" },
            { icon: "🌍", label: "Backbone" },
            { icon: "🏬", label: "Data Center" },
            { icon: "🖥️", label: "Server" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── The Physical Internet ── */}
        <h2 id="the-physical-internet" style={S.h1}>What Is The Internet Backbone?</h2>

        <p style={S.p}>The Internet Backbone is the Internet's main highways. These are high-capacity fiber networks that connect countries and continents. Your home isn't directly connected to a server in America — in between are telecom providers and backbone networks that provide global connectivity. This is the Internet's core infrastructure.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/internet-backbone.png"
              alt="Internet Backbone — high-capacity fiber networks connecting continents"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Internet Backbone — the main highways connecting countries and continents.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Does The Internet Run On Satellites?</h3>
        <p style={S.p}>Many people think the Internet runs on satellites. The reality is a bit different. Most of the world's Internet traffic travels through underwater fiber optic cables — these are called <strong>Submarine Cables</strong>. These cables connect Asia, Europe, America, Africa, and Australia. Satellites are used too, but most of the Internet's traffic goes through submarine cables.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/submarine-cables.png"
              alt="Submarine Cables — underwater fiber optic cables connecting continents"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Submarine Cables — most of the world's Internet traffic travels under the ocean.
          </figcaption>
        </figure>

        <hr style={S.divider} />

        {/* ── Data Centers — The Destination ── */}
        <h2 id="data-centers-the-destination" style={S.h1}>What Is The Role Of Data Centers?</h2>

        <p style={S.p}>Now the question comes up: where is a website's actual data stored? This is where the Data Center's role begins.</p>
        <p style={S.p}>A Data Center is a specialized facility where servers, storage systems, and network equipment are operated. When you open a website, the request eventually reaches some Data Center — and that's where the response is generated. That's exactly why Data Centers are called the backbone of the digital world.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/server-infrastructure.png"
              alt="Server Infrastructure — racks of servers processing requests inside a Data Center"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            Server Infrastructure — where requests are received and responses are prepared.
          </figcaption>
        </figure>

        <h3 style={S.h3}>What Does A Server Do?</h3>
        <p style={S.p}>A server is a powerful computer. Its job is to receive requests and send responses. You send a request: <em>"Show me the homepage."</em> The server sends a response: <em>"Here's the homepage."</em> This process happens millions of times every second. Behind every website, one or several servers are working.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/data-center-request-flow.png"
              alt="Data Center Request Flow — request arriving and response leaving the facility"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            A request arriving at a Data Center — and the response that travels back.
          </figcaption>
        </figure>

        <div style={S.learnMore}>
          <TopicLink slug="data-center-types" label="Learn More: Data Center Types" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── Real-World Journeys ── */}
        <h2 id="real-world-journeys" style={S.h1}>Real-World Journeys</h2>

        <p style={S.p}>Understanding the theory is one thing. But the real fun begins when you see how all of this actually works behind the apps you use every day.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/behind-the-tech-request.png"
              alt="Behind The Tech Request — a real request journey from device to server and back"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            What actually happens between typing a URL and seeing the page.
          </figcaption>
        </figure>

        <p style={S.p}>Say you type <strong>behindthetech.in</strong> in your browser and press Enter. It feels like the website opened right away — but behind the scenes, several systems are working together at once. The browser first asks DNS for the address, the request travels through the ISP and the backbone, reaches the Data Center, the server prepares the homepage's files, and the response arrives back at your device in the form of packets. This entire process usually completes in less than 1–2 seconds.</p>

        <h3 style={S.h3}>What Happens When You Play A YouTube Video?</h3>
        <p style={S.p}>When you play a video on YouTube — the app sends a request, DNS finds YouTube's server address, the request reaches the Data Center, the server locates the video, the video is split into packets, the packets travel across the Internet, and the device receives the packets and plays the video. All of this happens in milliseconds, which is why the video starts almost instantly.</p>

        <RequestFlowDiagram
          caption="YouTube Request Flow"
          steps={[
            { icon: "▶️", label: "App Requests" },
            { icon: "📖", label: "DNS Lookup" },
            { icon: "🏬", label: "Data Center" },
            { icon: "🎬", label: "Server Locates Video" },
            { icon: "📦", label: "Packets Sent" },
            { icon: "📱", label: "Video Plays" },
          ]}
        />

        <h3 style={S.h3}>What Happens When You Search On Google?</h3>
        <p style={S.p}>Say you search for <em>"Best Data Center in India"</em>. The browser connects to Google's server, the search query is sent to Google, Google's servers search their index, relevant results are identified, ranking algorithms are applied, and the search results are returned to you. All of this happens in under a second.</p>

        <RequestFlowDiagram
          caption="Google Search Flow"
          steps={[
            { icon: "🔍", label: "Search Query" },
            { icon: "🏬", label: "Google Server" },
            { icon: "📚", label: "Index Search" },
            { icon: "📊", label: "Ranking Applied" },
            { icon: "📄", label: "Results Returned" },
          ]}
        />

        <h3 style={S.h3}>What Happens When You Send A WhatsApp Message?</h3>
        <p style={S.p}>When you send a message on WhatsApp — the message is encrypted, sent to WhatsApp's server, the recipient is identified, the message is forwarded to the recipient's device, and the delivery status is updated. This process is so fast that it feels like the message reached instantly.</p>

        <RequestFlowDiagram
          caption="WhatsApp Message Flow"
          steps={[
            { icon: "💬", label: "Message Encrypted" },
            { icon: "🏬", label: "WhatsApp Server" },
            { icon: "🔎", label: "Recipient Found" },
            { icon: "📲", label: "Forwarded" },
            { icon: "✅", label: "Delivered" },
          ]}
        />

        <h3 style={S.h3}>How Does A ChatGPT Response Arrive?</h3>
        <p style={S.p}>ChatGPT's process is a bit different from a normal website. Here, it's not just data being retrieved — an AI model runs as well. Your prompt reaches the AI servers, the model processes it, and then the generated response comes back to you over the Internet. That's exactly why, for some complex prompts, generating a response can take a little extra time.</p>

        <RequestFlowDiagram
          caption="ChatGPT Response Flow"
          steps={[
            { icon: "💭", label: "User Prompt" },
            { icon: "🌐", label: "Internet" },
            { icon: "🏬", label: "Data Center" },
            { icon: "🧠", label: "AI Infrastructure" },
            { icon: "⚙️", label: "Model Processing" },
            { icon: "💬", label: "Response Generated" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── CDNs — Getting Closer ── */}
        <h2 id="cdns-getting-closer" style={S.h1}>Why Does The Internet Feel So Fast?</h2>

        <p style={S.p}>There are several reasons the Internet feels fast.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/cdn-edge-network.png"
              alt="CDN Edge Network — content stored closer to users for faster delivery"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            CDN Edge Network — bringing content closer to where users actually are.
          </figcaption>
        </figure>

        <h3 style={S.h3}>Caching</h3>
        <p style={S.p}>Frequently used content is stored nearby, so that it's available instantly the next time it's requested.</p>

        <h3 style={S.h3}>CDN</h3>
        <p style={S.p}>Content Delivery Networks keep data close to users — so a request doesn't need to travel across the entire world.</p>

        <h3 style={S.h3}>Edge Infrastructure</h3>
        <p style={S.p}>Processing happens close to the user's location, which further reduces response time.</p>

        <h3 style={S.h3}>High-Speed Fiber</h3>
        <p style={S.p}>Modern fiber optic networks provide enormous bandwidth. Thanks to all these technologies, websites and applications feel very fast.</p>

        <hr style={S.divider} />

        {/* ── AI and the Modern Internet ── */}
        <h2 id="ai-and-the-modern-internet" style={S.h1}>AI And The Modern Internet</h2>

        <p style={S.p}>AI tools like ChatGPT have added a new layer on top of the Internet. Earlier, the Internet only retrieved stored data — some webpage, some video, some message. Now, some requests are such that the response doesn't already exist — instead, it's generated in real time.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image
              src="/images/articles/how-the-internet-works/ai-infrastructure.png"
              alt="AI Infrastructure — specialized compute powering real-time AI responses"
              fill
              sizes="(max-width: 768px) 100vw, 740px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <figcaption style={S.imageCaption}>
            AI Infrastructure — GPUs and specialized compute generating responses in real time.
          </figcaption>
        </figure>

        <p style={S.p}>This means AI infrastructure needs even more compute power than a normal Data Center — GPUs, specialized cooling, and massive processing capacity. But the fundamentals stay the same: the request travels across the Internet, reaches some Data Center, and the response comes back over the Internet too.</p>

        <InsightCard>
          AI has added a new layer on top of the Internet, but the basic structure of the journey — from device to Data Center, and from Data Center back to the device — has remained the same for decades.
        </InsightCard>

        <div style={S.learnMore}>
          <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "The Internet is a network of networks around the world.",
            "It travels in the form of data packets.",
            "DNS converts website names into IP Addresses.",
            "ISPs provide Internet access and routers direct traffic.",
            "Submarine cables connect continents.",
            "Data Centers host websites and applications.",
            "Servers process requests.",
            "Google, YouTube, WhatsApp, and ChatGPT all depend on Internet infrastructure.",
          ]}
        />

        <p style={S.p}>The Internet feels simple to us because thousands of systems are working together behind the scenes. Next time you open a website, you'll know just how long a journey the data took to reach that page.</p>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <ContinueLearning />

        <hr style={S.divider} />

        {/* ── FAQ (body only, not in TOC) ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>

        <FAQSection />

      </ArticlePage>
    </>
  );
}
