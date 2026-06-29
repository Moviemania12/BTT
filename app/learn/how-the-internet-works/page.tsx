import type { Metadata } from "next";
import Image from "next/image";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How The Internet Works: Internet Kaise Kaam Karta Hai — Behind The Tech",
  description:
    "DNS, routers, submarine cables aur Data Centers — jab aap Google search karte ho ya YouTube dekhte ho, background me kya hota hai. Complete journey simple Hinglish mein.",
  keywords: [
    "how the internet works",
    "internet kaise kaam karta hai",
    "dns kya hai",
    "isp kya hai",
    "submarine cables",
    "data packets",
    "internet backbone",
    "behind the tech",
  ],
  openGraph: {
    title: "How The Internet Works: Internet Kaise Kaam Karta Hai",
    description:
      "DNS, routers, submarine cables aur Data Centers — har request ka safar samjho, simple Hinglish mein.",
    url: "https://behindthetech.in/learn/how-the-internet-works",
    siteName: "Behind The Tech",
    type: "article",
    publishedTime: "2024-11-12",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How The Internet Works — Behind The Tech",
    description: "Internet ek request kaise complete karta hai — DNS se lekar Data Center tak.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/how-the-internet-works",
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
    q: "Kya Internet aur WiFi same hote hain?",
    a: "Nahi. WiFi sirf Internet access karne ka ek medium hai — wireless connection jo aapke device ko router se jodta hai. Internet khud ek alag, bahut bada global network hai.",
  },
  {
    q: "DNS ka full form kya hai?",
    a: "Domain Name System. Yeh website ke naam (jaise behindthetech.in) ko uske machine-friendly IP Address me convert karta hai.",
  },
  {
    q: "Kya Internet satellites se chalta hai?",
    a: "Partially. Satellites ka use hota hai, lekin duniya ka major Internet traffic underwater submarine fiber cables ke through travel karta hai.",
  },
  {
    q: "Server aur normal computer me kya difference hai?",
    a: "Server bhi ek computer hota hai, lekin requests handle karne aur 24/7 chalne ke liye specially optimized hota hai — zyada reliability, zyada uptime, aur zyada processing capacity ke saath.",
  },
  {
    q: "Data Center Internet ke liye kyun important hai?",
    a: "Kyunki websites aur applications ke actual servers Data Centers ke andar host hote hain. Jab aap koi request bhejte ho, wo eventually kisi Data Center tak hi pahunchti hai.",
  },
  {
    q: "Internet ka malik kaun hai?",
    a: "Internet ka koi single owner nahi hai. Yeh hazaron ISPs, telecom companies, aur organizations milkar chalate hain — isi wajah se ise 'network of networks' kaha jata hai.",
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

export default function HowTheInternetWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

        <p style={S.p}>Aap subah uthte ho, phone unlock karte ho aur WhatsApp check karte ho. Office pahunchte hi mail kholte ho. Din me kai baar Google par kuch search karte ho. Sham ko YouTube dekhte ho aur raat ko kisi AI tool se sawal puchte ho.</p>
        <p style={S.p}>Ye sab itna normal lagta hai ki hum kabhi ruk kar nahi sochte ki background me kya ho raha hai.</p>
        <p style={S.p}>Aapka phone Jodhpur me ho sakta hai. Jis server se data aa raha hai wo Mumbai, Singapore, London ya America me ho sakta hai. Phir bhi response kuch hi seconds me aap tak pahunch jata hai.</p>
        <p style={S.p}><strong>Kaise?</strong></p>

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

        <p style={S.p}>Internet koi invisible magic nahi hai. Ye ek physical infrastructure hai jo cables, routers, switches, servers aur Data Centers se milkar bana hai.</p>
        <p style={S.p}>Internet duniya bhar ke connected computer networks ka ek global network hai. Isi liye ise aksar <strong>Network of Networks</strong> kaha jata hai. Har ghar ka WiFi network, har office ka network, har ISP ka backbone network aur har Data Center ka network milkar Internet banate hain.</p>

        <h3 style={S.h3}>Road Network Example</h3>
        <p style={S.p}>Sochiye India ka road network. Galiyan hain. City roads hain. National highways hain. Expressways hain. Ye sab roads milkar poore desh ko connect karti hain.</p>
        <p style={S.p}>Internet bhi kuch aisa hi hai. Farq sirf itna hai ki yahan gaadiyon ki jagah data travel karta hai — aur destination tak pahunchne ke liye usse bhi ek route follow karna padta hai.</p>

        <h3 style={S.h3}>Internet Aur Web Same Nahi Hain</h3>
        <p style={S.p}>Ye sabse common confusion hai. Bahut log Internet aur Web ko ek hi cheez samajhte hain — reality me dono alag hain.</p>
        <p style={S.p}><strong>Internet</strong> infrastructure hai: fiber optic cables, routers, switches, ISP networks, servers, aur Data Centers. <strong>Web</strong> ek service hai jo Internet ke upar chalti hai — Google, YouTube, Facebook, Amazon, Behind The Tech, ye sab examples hain.</p>
        <p style={S.p}>Simple analogy: Internet = Road Network, Websites = Vehicles. Road ke bina vehicle nahi chal sakta, aur vehicle ke bina road ka koi practical use nahi. Jab aap Google open karte ho, to aap Internet use kar rahe hote ho — lekin Google khud Internet nahi hai, ye Internet par chalne wali ek service hai.</p>

        <div style={S.learnMore}>
          <TopicLink slug="what-is-a-data-center" label="Read: What Is A Data Center?" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── DNS — The Internet's Phonebook ── */}
        <h2 id="dns-the-internets-phonebook" style={S.h1}>DNS Kya Hota Hai?</h2>

        <p style={S.p}>DNS ka full form hai <strong>Domain Name System</strong>. DNS Internet ki phonebook hai.</p>

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
        <p style={S.p}>Aapko kisi dost ka naam pata hai. Lekin call karne ke liye mobile number chahiye. Aap contacts me naam search karte ho aur number mil jata hai. DNS bhi exactly yehi kaam karta hai.</p>

        <h3 style={S.h3}>Example</h3>
        <p style={S.p}>Human-Friendly Address: <strong>behindthetech.in</strong></p>
        <p style={S.p}>Machine-Friendly Address: <strong>104.xxx.xxx.xxx</strong></p>
        <p style={S.p}>Computer website ka naam nahi samajhta. Computer IP Address samajhta hai. Isliye browser pehle DNS se poochta hai: <em>"behindthetech.in ka IP Address kya hai?"</em> DNS jawab deta hai, aur uske baad browser request ko sahi destination tak bhej pata hai.</p>

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

        <h3 style={S.h3}>Ek Interesting Fact</h3>
        <p style={S.p}>Hum humans naam aur keywords dekhte hain. Lekin Internet naam nahi samajhta — Internet ko IP Address samajh aata hai. Jab aap Google par kuch search karte ho, to pehle Google server ka IP Address dhunda jata hai, uske baad search request Google ke Data Center tak bheji jati hai. Yaani Internet ke liye destination ka address sabse important hota hai.</p>

        <hr style={S.divider} />

        {/* ── Packets and Routing ── */}
        <h2 id="packets-and-routing" style={S.h1}>Data Packet Kya Hota Hai?</h2>

        <p style={S.p}>Agar aap kisi dost ko 1GB ki video bhejte ho, to kya wo poori video ek hi baar me Internet par travel karti hai? Nahi.</p>
        <p style={S.p}>Internet data ko chhote-chhote tukdon me divide kar deta hai. In tukdon ko <strong>Data Packets</strong> kaha jata hai. Har packet ke paas kuch important information hoti hai:</p>
        <ul style={S.ul}>
          <li style={S.li}>Source Address</li>
          <li style={S.li}>Destination Address</li>
          <li style={S.li}>Packet/Sequence Number</li>
          <li style={S.li}>Actual Data</li>
        </ul>
        <p style={S.p}>Destination par pahunchne ke baad ye packets dobara jod diye jate hain. Bilkul waise hi jaise ek courier company ek bade shipment ko multiple boxes me divide karke bhejti hai. Agar ek packet delay ho jaye to baaki packets phir bhi travel karte rehte hain — isi wajah se Internet scalable aur reliable banta hai.</p>

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

        <h3 style={S.h3}>Router Kya Karta Hai?</h3>
        <p style={S.p}>Router Internet ka traffic manager hota hai. Iska kaam data packets ko sahi route par bhejna hota hai. Sochiye aap ek courier bhejte ho — courier company decide karti hai parcel kis city se kis city jayega. Router bhi exactly yehi karta hai. Har router packet ko dekhta hai aur decide karta hai: <em>"Agla stop kahan hoga?"</em> Isi process ki wajah se packets duniya bhar me travel kar pate hain.</p>

        <h3 style={S.h3}>ISP Kya Hota Hai?</h3>
        <p style={S.p}>ISP ka full form hai <strong>Internet Service Provider</strong> — Jio, Airtel, BSNL jaise examples. ISP aapko Internet access provide karta hai. Agar Internet ek highway hai to ISP us highway ka entry gate hai. Aapka sara traffic ISP ke through hi travel karta hai — isi liye agar ISP down ho jaye to Internet access bhi band ho jata hai.</p>

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
        <h2 id="the-physical-internet" style={S.h1}>Internet Backbone Kya Hota Hai?</h2>

        <p style={S.p}>Internet Backbone Internet ki main highways hoti hain. Ye high-capacity fiber networks hote hain jo countries aur continents ko connect karte hain. Aapka ghar directly America ke server se connected nahi hota — beech me telecom providers aur backbone networks hote hain jo global connectivity provide karte hain. Ye hi Internet ka core infrastructure hai.</p>

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

        <h3 style={S.h3}>Kya Internet Satellites Se Chalta Hai?</h3>
        <p style={S.p}>Bahut log sochte hain ki Internet satellites se chalta hai. Reality kuch aur hai. Duniya ka zyada Internet traffic underwater fiber optic cables se travel karta hai — inhe <strong>Submarine Cables</strong> kaha jata hai. Ye cables Asia, Europe, America, Africa, aur Australia ko connect karti hain. Satellites ka use bhi hota hai, lekin Internet ka major traffic submarine cables ke through hi jata hai.</p>

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
        <h2 id="data-centers-the-destination" style={S.h1}>Data Centers Ka Role Kya Hai?</h2>

        <p style={S.p}>Ab sawal aata hai: website ka actual data rakha kahan hota hai? Yahan Data Center ka role shuru hota hai.</p>
        <p style={S.p}>Data Center ek specialized facility hoti hai jahan servers, storage systems, aur network equipment operate kiye jate hain. Jab aap website open karte ho to request eventually kisi Data Center tak pahunchti hai — wahin se response generate hota hai. Isi liye Data Centers digital duniya ka backbone kehlate hain.</p>

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

        <h3 style={S.h3}>Server Kya Karta Hai?</h3>
        <p style={S.p}>Server ek powerful computer hota hai. Iska kaam requests receive karna aur responses bhejna hota hai. Aap request bhejte ho: <em>"Mujhe homepage dikhaiye."</em> Server response bhejta hai: <em>"Ye raha homepage."</em> Ye process har second lakhon baar hoti hai. Har website ke peeche ek ya kai servers kaam kar rahe hote hain.</p>

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

        <p style={S.p}>Theory samajhna ek baat hai. Lekin asli maza tab aata hai jab aap dekhte ho ki rozana use hone wale apps ke peeche ye sab kaise kaam karta hai.</p>

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

        <p style={S.p}>Maan lijiye aap browser me type karte ho <strong>behindthetech.in</strong> aur Enter press kar dete ho. Aapko lagta hai website seedhi open ho gayi — lekin background me kai systems ek saath kaam kar rahe hote hain. Browser pehle DNS se address poochta hai, request ISP aur backbone ke through travel karti hai, Data Center tak pahunchti hai, server homepage ke files prepare karta hai, aur response packets ke form me wapas aapke device tak aata hai. Ye poora process aam taur par 1–2 seconds se bhi kam samay me complete ho jata hai.</p>

        <h3 style={S.h3}>YouTube Video Play Karne Par Kya Hota Hai?</h3>
        <p style={S.p}>Jab aap YouTube par video play karte ho — app request bhejta hai, DNS YouTube server ka address find karta hai, request Data Center tak pahunchti hai, server video locate karta hai, video packets me divide hoti hai, packets Internet ke through travel karte hain, aur device packets ko receive karke video play karta hai. Ye sab milliseconds me hota hai, isi liye video almost instantly start ho jati hai.</p>

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

        <h3 style={S.h3}>Google Search Karne Par Kya Hota Hai?</h3>
        <p style={S.p}>Maan lijiye aap search karte ho <em>"Best Data Center in India"</em>. Browser Google server se connect karta hai, search query Google ko bheji jati hai, Google ke servers apne index me search karte hain, relevant results identify kiye jate hain, ranking algorithms apply hote hain, aur search results aapko return kiye jate hain. Ye sab ek second se bhi kam samay me ho jata hai.</p>

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

        <h3 style={S.h3}>WhatsApp Message Send Karne Par Kya Hota Hai?</h3>
        <p style={S.p}>Jab aap WhatsApp par message bhejte ho — message encrypt hota hai, WhatsApp server tak bheja jata hai, recipient identify kiya jata hai, message recipient device tak forward kiya jata hai, aur delivery status update hoti hai. Ye process itni fast hoti hai ki hume lagta hai message instantly pahunch gaya.</p>

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

        <h3 style={S.h3}>ChatGPT Response Kaise Aata Hai?</h3>
        <p style={S.p}>ChatGPT ka process normal website se thoda alag hai. Yahan sirf data retrieve nahi hota — AI model bhi run hota hai. Aapka prompt AI servers tak pahunchta hai, model usse process karta hai, phir generated response Internet ke through wapas aap tak aata hai. Isi liye kuch complex prompts me response generate hone me thoda extra time lag sakta hai.</p>

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
        <h2 id="cdns-getting-closer" style={S.h1}>Internet Itna Fast Kaise Lagta Hai?</h2>

        <p style={S.p}>Internet fast lagne ke peeche kai reasons hain.</p>

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
        <p style={S.p}>Frequently used content nearby store kiya jata hai, taaki dobara request karne par wo turant mil jaye.</p>

        <h3 style={S.h3}>CDN</h3>
        <p style={S.p}>Content Delivery Networks data ko users ke kareeb rakhte hain — taaki request ko poori duniya travel na karni pade.</p>

        <h3 style={S.h3}>Edge Infrastructure</h3>
        <p style={S.p}>Processing user ke paas ki location par ki jati hai, jisse response time aur kam ho jata hai.</p>

        <h3 style={S.h3}>High-Speed Fiber</h3>
        <p style={S.p}>Modern fiber optic networks enormous bandwidth provide karte hain. In sab technologies ki wajah se websites aur applications bahut fast feel hoti hain.</p>

        <hr style={S.divider} />

        {/* ── AI and the Modern Internet ── */}
        <h2 id="ai-and-the-modern-internet" style={S.h1}>AI Aur Modern Internet</h2>

        <p style={S.p}>ChatGPT jaise AI tools ne ek naya layer add kiya hai Internet ke upar. Pehle Internet sirf stored data retrieve karta tha — koi webpage, koi video, koi message. Ab kuch requests aise hote hain jinme response pehle se exist hi nahi karta, balki real-time generate hota hai.</p>

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

        <p style={S.p}>Iska matlab hai ki AI infrastructure ko normal Data Center se bhi zyada compute power chahiye hoti hai — GPUs, specialized cooling, aur massive processing capacity. Lekin fundamentals same rehte hain: request Internet ke through travel karti hai, kisi Data Center tak pahunchti hai, aur response wapas Internet ke through hi aata hai.</p>

        <InsightCard>
          AI ne Internet ke upar ek naya layer add kiya hai, lekin journey ka basic structure — device se Data Center, aur Data Center se wapas device tak — wahi raha hai jo decades se hai.
        </InsightCard>

        <div style={S.learnMore}>
          <TopicLink slug="ai-infrastructure-basics" label="Learn More: AI Infrastructure Basics" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Internet duniya bhar ke networks ka network hai.",
            "Data packets ke form me travel karta hai.",
            "DNS website names ko IP Address me convert karta hai.",
            "ISP Internet access provide karta hai aur routers traffic ko direction dete hain.",
            "Submarine cables continents ko connect karti hain.",
            "Data Centers websites aur applications ko host karte hain.",
            "Servers requests ko process karte hain.",
            "Google, YouTube, WhatsApp aur ChatGPT sab Internet infrastructure par depend karte hain.",
          ]}
        />

        <p style={S.p}>Internet hume simple lagta hai kyunki background me hazaron systems milkar kaam kar rahe hote hain. Agli baar jab aap koi website open karoge, to aap jaante honge ki us page tak pahunchne ke liye data ne kitna lamba safar tay kiya hai.</p>

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
