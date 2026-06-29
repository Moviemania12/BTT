import type { Metadata } from "next";
import { Clock, User, Calendar, ChevronRight, ArrowLeft, Database, Zap, Server, Cpu, BookOpen, Share2, Tag } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Center Kya Hota Hai? | Behind The Tech",
  description:
    "Data Center internet ka dil hai. Yahin se YouTube, WhatsApp aur Cloud services chalti hain. Janiye Data Center ke baare mein sab kuch — components, cooling, security aur India ka future.",
  keywords: ["data center kya hai", "data center in hindi", "server room", "cloud computing", "AI infrastructure India"],
  authors: [{ name: "Anil Kumar" }],
  openGraph: {
    title: "Data Center Kya Hota Hai? — Behind The Tech",
    description:
      "Har WhatsApp message, YouTube video aur online payment kisi na kisi Data Center se hokar guzarta hai. Jaaniye puri kahani.",
    url: "https://behindthetech.in/articles/data-center-kya-hota-hai",
    siteName: "Behind The Tech",
    type: "article",
    images: [
      {
        url: "/images/articles/data-center-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Data Center — Behind The Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Center Kya Hota Hai?",
    description: "Internet ka dil — Data Centers ke andar ki poori kahani.",
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-[11px] tracking-widest text-[var(--color-text-muted)] mb-10" style={{ fontFamily: "var(--font-mono)" }}>
      <Link href="/" className="hover:text-[var(--color-neon-blue)] transition-colors">HOME</Link>
      <ChevronRight size={10} />
      <Link href="/articles" className="hover:text-[var(--color-neon-blue)] transition-colors">ARTICLES</Link>
      <ChevronRight size={10} />
      <span className="text-[var(--color-neon-blue)]">DATA CENTER</span>
    </nav>
  );
}

function ArticleMeta() {
  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-y border-[rgba(0,212,255,0.12)]">
      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border border-[rgba(0,212,255,0.3)] text-[var(--color-neon-blue)]"
          style={{ background: "rgba(0,212,255,0.08)", fontFamily: "var(--font-display)" }}
        >
          AK
        </div>
        <div>
          <div className="text-[11px] tracking-widest text-[var(--color-text-muted)] uppercase" style={{ fontFamily: "var(--font-mono)" }}>Author</div>
          <div className="text-sm font-semibold text-[var(--color-text-primary)]">Anil Kumar</div>
        </div>
      </div>

      <div className="h-8 w-px bg-[rgba(0,212,255,0.15)] hidden sm:block" />

      {/* Date */}
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        <Calendar size={13} className="text-[var(--color-neon-blue)]" />
        <span className="text-sm" style={{ fontFamily: "var(--font-mono)" }}>June 2026</span>
      </div>

      <div className="h-8 w-px bg-[rgba(0,212,255,0.15)] hidden sm:block" />

      {/* Reading time */}
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        <Clock size={13} className="text-[var(--color-neon-blue)]" />
        <span className="text-sm" style={{ fontFamily: "var(--font-mono)" }}>8 Min Read</span>
      </div>

      <div className="h-8 w-px bg-[rgba(0,212,255,0.15)] hidden sm:block" />

      {/* Category */}
      <div className="flex items-center gap-2">
        <Tag size={13} className="text-[var(--color-neon-red)]" />
        <span
          className="text-[10px] tracking-[0.2em] px-3 py-1 font-bold uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(255,34,68,0.12)",
            color: "var(--color-neon-red)",
            border: "1px solid rgba(255,34,68,0.25)",
          }}
        >
          Data Center
        </span>
      </div>
    </div>
  );
}

function TableOfContents() {
  const items = [
    { id: "intro", label: "Data Center Kya Hai?" },
    { id: "example", label: "YouTube — Ek Example" },
    { id: "components", label: "Andar Kya Hota Hai?" },
    { id: "cooling", label: "Cooling System" },
    { id: "power", label: "Power Backup" },
    { id: "security", label: "Security" },
    { id: "types", label: "Types of Data Centers" },
    { id: "ai", label: "AI aur Data Centers" },
    { id: "india", label: "Bharat Ka Future" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <aside
      className="rounded-none border border-[rgba(0,212,255,0.15)] p-6 mb-10 sticky top-24"
      style={{ background: "rgba(13,21,32,0.7)", backdropFilter: "blur(16px)" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <BookOpen size={14} className="text-[var(--color-neon-blue)]" />
        <span className="text-[10px] tracking-[0.35em] text-[var(--color-neon-blue)] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          Contents
        </span>
      </div>
      <ol className="space-y-1">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-start gap-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-neon-blue)] transition-colors group"
            >
              <span
                className="text-[10px] mt-0.5 w-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-neon-blue)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function QuickFact({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-8 p-5 border-l-2 border-[var(--color-neon-cyan)]"
      style={{ background: "rgba(0,255,204,0.04)", borderRight: "1px solid rgba(0,255,204,0.1)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Zap size={13} className="text-[var(--color-neon-cyan)]" />
        <span className="text-[10px] tracking-[0.35em] text-[var(--color-neon-cyan)] uppercase font-bold" style={{ fontFamily: "var(--font-mono)" }}>
          Quick Fact
        </span>
      </div>
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{children}</p>
    </div>
  );
}

function InfoBox({ title, children, color = "blue" }: { title: string; children: React.ReactNode; color?: "blue" | "red" | "cyan" }) {
  const styles = {
    blue: { border: "rgba(0,212,255,0.2)", bg: "rgba(0,212,255,0.04)", text: "var(--color-neon-blue)", icon: null },
    red: { border: "rgba(255,34,68,0.2)", bg: "rgba(255,34,68,0.04)", text: "var(--color-neon-red)", icon: null },
    cyan: { border: "rgba(0,255,204,0.2)", bg: "rgba(0,255,204,0.04)", text: "var(--color-neon-cyan)", icon: null },
  };
  const s = styles[color];
  return (
    <div className="my-8 p-6 border" style={{ borderColor: s.border, background: s.bg }}>
      <div className="text-[10px] tracking-[0.35em] font-bold uppercase mb-4" style={{ color: s.text, fontFamily: "var(--font-mono)" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[clamp(1.6rem,4vw,2.5rem)] tracking-wide mt-16 mb-6 scroll-mt-28"
      style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-bold mt-10 mb-4 text-[var(--color-text-primary)] flex items-center gap-3">
      <span className="w-1 h-5 bg-[var(--color-neon-blue)] inline-block shrink-0" />
      {children}
    </h3>
  );
}

function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 px-8 py-6 border-l-2 border-[var(--color-neon-blue)] relative">
      <div
        className="absolute top-0 left-0 text-6xl leading-none text-[var(--color-neon-blue)] select-none"
        style={{ fontFamily: "Georgia, serif", opacity: 0.3, transform: "translate(-4px,-8px)" }}
        aria-hidden
      >
        "
      </div>
      <p className="text-xl leading-relaxed italic text-[var(--color-text-secondary)]">{children}</p>
    </blockquote>
  );
}

function ArticleImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-10">
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", display: "block", border: "1px solid rgba(0,212,255,0.15)" }}
      />
      <figcaption
        className="text-xs text-[var(--color-text-muted)] mt-2 text-center"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function RelatedArticles() {
  const related = [
    { href: "/articles/ups-kya-hota-hai", label: "UPS", title: "UPS Kya Hota Hai?", desc: "Uninterruptible Power Supply — Data Center ki lifeline ka poora breakdown.", icon: Zap, color: "red" as const },
    { href: "/articles/pac-unit-kya-hai", label: "Cooling", title: "PAC Unit Kya Hai?", desc: "Precision Air Conditioning — servers ko thanda rakhne ki technology.", icon: Server, color: "blue" as const },
    { href: "/articles/cloud-computing-kya-hai", label: "Cloud", title: "Cloud Computing Kya Hai?", desc: "Virtual servers, storage aur services — cloud ki poori kahani.", icon: Cpu, color: "cyan" as const },
  ];

  const colorMap = {
    blue: { text: "var(--color-neon-blue)", border: "rgba(0,212,255,0.2)", bg: "rgba(0,212,255,0.06)", hoverBorder: "rgba(0,212,255,0.5)" },
    red: { text: "var(--color-neon-red)", border: "rgba(255,34,68,0.2)", bg: "rgba(255,34,68,0.06)", hoverBorder: "rgba(255,34,68,0.5)" },
    cyan: { text: "var(--color-neon-cyan)", border: "rgba(0,255,204,0.2)", bg: "rgba(0,255,204,0.06)", hoverBorder: "rgba(0,255,204,0.5)" },
  };

  return (
    <section className="mt-20 pt-12 border-t border-[rgba(0,212,255,0.12)]">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-[var(--color-neon-blue)]" />
        <span className="text-[10px] tracking-[0.4em] text-[var(--color-neon-blue)] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
          Related Articles
        </span>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {related.map((r) => {
          const Icon = r.icon;
          const c = colorMap[r.color];
          return (
            <a
              key={r.href}
              href={r.href}
              className="group block p-5 border transition-all duration-300"
              style={{ borderColor: c.border, background: "rgba(13,21,32,0.5)" }}
            >
              <div className="w-8 h-8 flex items-center justify-center border mb-4 group-hover:scale-110 transition-transform" style={{ borderColor: c.border, background: c.bg }}>
                <Icon size={14} style={{ color: c.text }} />
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: c.text, fontFamily: "var(--font-mono)" }}>
                {r.label}
              </div>
              <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-neon-blue)] transition-colors">
                {r.title}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{r.desc}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Data Center aur Server Room me kya difference hai?",
      a: "Server Room ek chhoti facility hoti hai — aksar ek single company ke liye. Data Center ek large-scale, purpose-built facility hai jisme hazaron racks, redundant power, cooling, aur enterprise-grade security hoti hai.",
    },
    {
      q: "Data Center me temperature kitna rakha jata hai?",
      a: "Industry standard 20°C se 24°C ke beech hota hai. ASHRAE guidelines ke according, server inlets par 18–27°C maintain karna optimal hota hai.",
    },
    {
      q: "Kya Data Center me AC zaruri hota hai?",
      a: "Haan — servers itni heat generate karte hain ki bina cooling ke minutes me damage ho sakte hain. Large facilities MW-scale cooling infrastructure use karti hain.",
    },
    {
      q: "Kya AI Data Centers ke bina chal sakta hai?",
      a: "Nahi. GPT-scale models ko train karne aur serve karne ke liye thousands of GPUs, petabytes of storage aur high-speed networking chahiye — ye sab kuch sirf Data Centers me possible hai.",
    },
  ];

  return (
    <section id="faq" className="mt-20">
      <SectionHeading id="faq-heading">Frequently Asked Questions</SectionHeading>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border border-[rgba(0,212,255,0.12)] open:border-[rgba(0,212,255,0.3)] transition-all"
            style={{ background: "rgba(13,21,32,0.5)" }}
          >
            <summary className="flex items-start gap-4 px-6 py-4 cursor-pointer list-none text-[var(--color-text-primary)] font-semibold text-sm select-none hover:text-[var(--color-neon-blue)] transition-colors">
              <span className="text-[var(--color-neon-blue)] shrink-0 text-xs mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                Q{String(i + 1).padStart(2, "0")}
              </span>
              {item.q}
            </summary>
            <div className="px-6 pb-5 pt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[rgba(0,212,255,0.08)] ml-0">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DataCenterArticlePage() {
  return (
    <>
      {/* ── Structured Data (JSON-LD) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Data Center Kya Hota Hai? Ek Aisi Jagah Jahan Internet Kabhi Sota Nahi",
            description: "Data Center internet ka dil hai. Yahin se YouTube, WhatsApp aur Cloud services chalti hain.",
            author: { "@type": "Person", name: "Anil Kumar" },
            publisher: { "@type": "Organization", name: "Behind The Tech", url: "https://behindthetech.in" },
            datePublished: "2026-06-01",
            image: "https://behindthetech.in/images/articles/data-center-hero.jpg",
            url: "https://behindthetech.in/articles/data-center-kya-hota-hai",
          }),
        }}
      />

      <div
        className="min-h-screen"
        style={{ background: "var(--color-void)", color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}
      >
        {/* ── Hero ── */}
        <header className="relative overflow-hidden">
          {/* Hero image */}
          <div className="relative w-full h-[55vh] min-h-[380px] max-h-[620px]">
            {/* Try real image; graceful placeholder fallback via CSS */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: "url('/images/articles/data-center-hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#030e1a",
              }}
            >
              {/* SVG rack illustration — shows only if image fails to load */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
                {[0, 1, 2, 3, 4].map((col) =>
                  Array.from({ length: 10 }).map((_, row) => (
                    <rect
                      key={`${col}-${row}`}
                      x={80 + col * 220}
                      y={30 + row * 54}
                      width={190}
                      height={42}
                      rx={2}
                      fill="none"
                      stroke="rgba(0,212,255,0.4)"
                      strokeWidth={0.8}
                    />
                  ))
                )}
                {[0, 1, 2, 3, 4].map((col) =>
                  Array.from({ length: 10 }).map((_, row) => (
                    <circle
                      key={`led-${col}-${row}`}
                      cx={97 + col * 220}
                      cy={51 + row * 54}
                      r={3}
                      fill={row % 3 === 0 ? "rgba(255,34,68,0.9)" : "rgba(0,212,255,0.9)"}
                    />
                  ))
                )}
              </svg>
            </div>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(3,5,7,0.3) 0%, rgba(3,5,7,0.1) 40%, rgba(3,5,7,0.9) 85%, var(--color-void) 100%)",
              }}
            />

            {/* Category badge */}
            <div className="absolute top-6 left-6 z-10">
              <span
                className="text-[10px] tracking-[0.3em] px-3 py-1.5 font-bold uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,212,255,0.15)",
                  color: "var(--color-neon-blue)",
                  border: "1px solid rgba(0,212,255,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Data Center
              </span>
            </div>
          </div>

          {/* Hero text block — overlaps image bottom */}
          <div className="relative max-w-5xl mx-auto px-6 -mt-24 z-10">
            <h1
              className="text-[clamp(2rem,6vw,4rem)] leading-tight tracking-wide mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              <span style={{ color: "var(--color-text-primary)" }}>DATA CENTER KYA </span>
              <span style={{ color: "var(--color-neon-blue)", textShadow: "0 0 20px rgba(0,212,255,0.6)" }}>HOTA HAI?</span>
              <br />
              <span className="text-[0.6em] text-[var(--color-text-secondary)] tracking-widest block mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                Ek Aisi Jagah Jahan Internet Kabhi Sota Nahi
              </span>
            </h1>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <ArticleMeta />

          {/* Two-column layout on desktop */}
          <div className="mt-10 flex flex-col lg:flex-row gap-12 items-start">

            {/* TOC sidebar */}
            <div className="lg:w-64 shrink-0 w-full">
              <TableOfContents />

              {/* Share widget */}
              <div
                className="border border-[rgba(0,212,255,0.12)] p-5 mt-4"
                style={{ background: "rgba(13,21,32,0.7)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Share2 size={13} className="text-[var(--color-neon-blue)]" />
                  <span className="text-[10px] tracking-[0.35em] text-[var(--color-neon-blue)] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                    Share
                  </span>
                </div>
                <div className="space-y-2">
                  {["Twitter / X", "WhatsApp", "LinkedIn", "Copy Link"].map((platform) => (
                    <button
                      key={platform}
                      className="w-full text-left text-xs py-2 px-3 border border-[rgba(0,212,255,0.1)] text-[var(--color-text-muted)] hover:text-[var(--color-neon-blue)] hover:border-[rgba(0,212,255,0.3)] transition-all"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main article content */}
            <article className="flex-1 min-w-0 text-[var(--color-text-secondary)] leading-relaxed" style={{ fontSize: "1.05rem", lineHeight: "1.85" }}>

              {/* ── Intro ── */}
              <QuickFact>
                Har WhatsApp message, YouTube video aur online payment kisi na kisi Data Center se hokar guzarta hai.
              </QuickFact>

              <p id="intro" className="scroll-mt-28 text-lg leading-8 mb-6">
                Socho — raat ke 2 baje aap YouTube par video dekh rahe ho, kisi dost ko WhatsApp message bhej rahe ho ya Instagram scroll kar rahe ho.
              </p>
              <p className="mb-6">Kabhi socha hai ki ye sab data aakhir <em>aata kahan se hai?</em></p>
              <p className="mb-10">
                Iske peeche ek aisi duniya kaam karti hai jo aam log kabhi nahi dekh paate. Us duniya ka naam hai{" "}
                <strong className="text-[var(--color-text-primary)]">Data Center</strong>.
              </p>

              <Pullquote>
                Internet ki duniya me Data Center wahi role nibhata hai jo dil insaan ke sharir me nibhata hai.
              </Pullquote>

              <SectionHeading id="intro">Data Center Aakhir Hota Kya Hai?</SectionHeading>

              <p className="mb-6">
                Simple language me kahen to Data Center ek bahut bada aur highly secure building ya facility hoti hai jahan hazaron servers 24×7 chalte rehte hain.
              </p>
              <p className="mb-6">
                Ye servers internet par chalne wali websites, apps aur online services ka data store aur process karte hain.
              </p>
              <p className="mb-10">
                Jab aap Google par kuch search karte ho, YouTube par video play karte ho ya UPI payment karte ho — to aapka request kisi na kisi Data Center tak zaroor pahunchta hai. Agar Data Center band ho jaye, to internet ka bahut bada hissa ruk sakta hai.
              </p>

              <ArticleImage
                src="/images/articles/data-center-floor.png"
                alt="A hyperscale data center floor with thousands of server racks in rows"
                caption="Ek hyperscale Data Center ka floor — hazaron server racks kataaron mein"
              />

              {/* ── YouTube Example ── */}
              <SectionHeading id="example">Ek Chhoti Si Example — YouTube Video</SectionHeading>
              <p className="mb-6">Maan lo aap YouTube par ek video dekhna chahte ho. Process kuch aisi hoti hai:</p>

              <InfoBox title="Step-by-Step: Video Play kaise hota hai?" color="blue">
                <ol className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                  {[
                    "Aap Play button dabate ho",
                    "Request internet ke through travel karti hai",
                    "Request YouTube ke Data Center tak pahunchti hai",
                    "Server video ko process karta hai",
                    "Video aapke mobile par stream hone lagti hai",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 shrink-0 flex items-center justify-center text-[10px] font-bold border border-[rgba(0,212,255,0.3)] text-[var(--color-neon-blue)]"
                        style={{ fontFamily: "var(--font-mono)", background: "rgba(0,212,255,0.08)" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-[var(--color-text-muted)] mt-4" style={{ fontFamily: "var(--font-mono)" }}>
                  Ye sab kuch milliseconds me ho jata hai — isi liye internet itna fast lagta hai.
                </p>
              </InfoBox>

              {/* ── Components ── */}
              <SectionHeading id="components">Data Center Ke Andar Kya Hota Hai?</SectionHeading>
              <p className="mb-6">
                Agar aap kisi modern Data Center ke andar jaoge to sabse pehle aapko lambi-lambi server racks dikhenge — ek library ki shelves ki tarah, lekin books ki jagah powerful servers.
              </p>

              <InfoBox title="Main Components" color="blue">
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)]">
                  {[
                    { name: "Servers", desc: "Core compute — data process karte hain" },
                    { name: "Storage Systems", desc: "Photos, videos, databases store karte hain" },
                    { name: "Network Switches", desc: "Data traffic route karte hain" },
                    { name: "Fiber Optic Cables", desc: "Light ki speed par data carry karte hain" },
                    { name: "Power Infrastructure", desc: "UPS, generators, PDUs" },
                    { name: "Cooling Systems", desc: "Heat manage karte hain" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-3 p-3 border border-[rgba(0,212,255,0.08)]" style={{ background: "rgba(0,212,255,0.03)" }}>
                      <span className="text-[var(--color-neon-blue)] mt-0.5">▸</span>
                      <div>
                        <div className="font-semibold text-[var(--color-text-primary)]">{item.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <SubHeading>Servers</SubHeading>
              <p className="mb-4">Server ek special computer hota hai jo normal PC se kai guna powerful hota hai. Inka kaam hota hai: data store karna, applications chalana, aur user requests process karna.</p>

              <SubHeading>Network Switches</SubHeading>
              <p className="mb-4">Ye Data Center ke traffic police hote hain — decide karte hain ki data kis server tak jana chahiye. Top-of-rack switches 100 Gbps+ speeds handle kar sakte hain.</p>

              <SubHeading>Fiber Optic Cables</SubHeading>
              <p className="mb-10">Ye internet ki superfast highways hain. Data light ke pulses ki form me travel karta hai — nanoseconds me.</p>

              <ArticleImage
                src="/images/articles/server-racks.png"
                alt="Server racks with fiber optic cables and LED indicators"
                caption="Server racks — fiber optic cables aur LED indicators ke saath"
              />

              {/* ── Cooling ── */}
              <SectionHeading id="cooling">Data Center Itna Thanda Kyu Rakha Jata Hai?</SectionHeading>
              <p className="mb-6">Servers jab kaam karte hain to bahut heat generate karte hain. Agar temperature control na kiya jaye to equipment damage ho sakta hai — is liye cooling ek Data Center ka sabse critical system hota hai.</p>

              <InfoBox title="Common Cooling Technologies" color="cyan">
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {[
                    { name: "Precision Air Conditioning (PAC)", desc: "Direct server rows ko cool karta hai" },
                    { name: "Chillers", desc: "Large-scale water-based cooling" },
                    { name: "Cooling Towers", desc: "Heat atmosphere me reject karte hain" },
                    { name: "Liquid Cooling", desc: "Direct-to-chip cooling for AI servers" },
                    { name: "CRAC / CRAH Units", desc: "Room-level air circulation" },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-2">
                      <span className="text-[var(--color-neon-cyan)] mt-1 text-xs">◈</span>
                      <span><strong className="text-[var(--color-text-primary)]">{item.name}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <QuickFact>
                Kai Data Centers me temperature 20°C se 24°C ke beech maintain kiya jata hai (ASHRAE A1 class). AI training clusters ke liye direct liquid cooling 40°C tak coolant temperature use kar sakta hai.
              </QuickFact>

              <ArticleImage
                src="/images/articles/pac-unit.png"
                alt="Precision Air Conditioning unit inside a data center"
                caption="PAC Unit — Data Center ke andar precision cooling system"
              />

              {/* ── Power ── */}
              <SectionHeading id="power">Bijli Chali Jaye To?</SectionHeading>
              <p className="mb-6">Data Center kabhi band nahi ho sakta. Sirf kuch seconds ka power loss bhi crores ka nuksan kar sakta hai. Isi liye multiple redundant power layers hote hain:</p>

              <InfoBox title="Power Backup — 3 Layers" color="red">
                <div className="space-y-4">
                  {[
                    { layer: "Layer 1", name: "UPS System", desc: "Milliseconds me power provide karta hai. Bijli jaate hi instantly load sambhal leta hai — seamless transition.", time: "Instant" },
                    { layer: "Layer 2", name: "Battery Bank", desc: "Large battery rooms backup provide karte hain. UPS batteries 10–15 minutes ka runtime deti hain.", time: "10–15 min" },
                    { layer: "Layer 3", name: "Diesel Generator", desc: "Agar power outage lamba ho to DG Sets automatically start ho jate hain — full load par minutes me.", time: "Minutes" },
                  ].map((item) => (
                    <div key={item.layer} className="flex gap-4 p-3 border border-[rgba(255,34,68,0.1)]" style={{ background: "rgba(255,34,68,0.03)" }}>
                      <div className="shrink-0">
                        <div className="text-[9px] tracking-widest text-[var(--color-neon-red)]" style={{ fontFamily: "var(--font-mono)" }}>{item.layer}</div>
                        <div className="text-[10px] text-[var(--color-text-muted)] mt-1" style={{ fontFamily: "var(--font-mono)" }}>{item.time}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-text-primary)] text-sm">{item.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-1">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </InfoBox>

              <div className="grid sm:grid-cols-2 gap-6 my-10">
                <ArticleImage
                  src="/images/articles/ups-battery-room.png"
                  alt="UPS battery room inside a data center"
                  caption="UPS Battery Room — power backup ka dil"
                />
                <ArticleImage
                  src="/images/articles/diesel-generator.png"
                  alt="Diesel generator set for data center backup power"
                  caption="Diesel Generator — last line of defense"
                />
              </div>

              {/* ── Security ── */}
              <SectionHeading id="security">Security Itni High Kyu Hoti Hai?</SectionHeading>
              <p className="mb-6">Socho agar kisi ne Google ya Bank ke server room me ghuskar data chura liya to? Isi liye Data Center me military-level physical security hoti hai.</p>

              <InfoBox title="Physical Security Layers" color="blue">
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-[var(--color-text-secondary)]">
                  {["Biometric Access (Fingerprint + Iris)", "RFID Access Cards", "Man-trap Entry Vestibules", "24×7 CCTV Monitoring", "Armed Security Guards", "Vehicle Barriers", "Fire Suppression Systems", "Seismic Protection"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[var(--color-neon-blue)] text-xs">▸</span> {item}
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <p className="mb-10">Kai jagah ek room me enter karne ke liye 2 ya 3 level verification lagta hai — aur ek waqt me sirf ek hi insaan andar ja sakta hai (mantrap).</p>

              <ArticleImage
                src="/images/articles/data-center-security.png"
                alt="Data center security — biometric access and CCTV monitoring"
                caption="Data Center Security — biometric access aur 24×7 CCTV monitoring"
              />

              {/* ── Types ── */}
              <SectionHeading id="types">Data Center Ke Types</SectionHeading>

              {[
                { name: "Enterprise Data Center", desc: "Company ke khud ke hote hain — bank, telecom, badi organizations. Full control lekin huge capital cost." },
                { name: "Colocation (Colo) Data Center", desc: "Multiple companies ek hi facility me rack space rent par leti hain. Cost share hoti hai." },
                { name: "Cloud Data Center (Hyperscale)", desc: "AWS, Google, Microsoft jaise companies operate karte hain. Duniya ka sabse bada infrastructure — lakhs of servers ek hi campus par." },
                { name: "Edge Data Center", desc: "Users ke kareeb deploy hote hain — latency kam karne ke liye. 5G networks ke saath boom ho raha hai." },
              ].map((type) => (
                <div key={type.name} className="mb-6">
                  <SubHeading>{type.name}</SubHeading>
                  <p>{type.desc}</p>
                </div>
              ))}

              <ArticleImage
                src="/images/articles/cloud-data-center.png"
                alt="Cloud hyperscale data center — AWS, Google, Microsoft scale infrastructure"
                caption="Cloud / Hyperscale Data Center — duniya ka sabse bada compute infrastructure"
              />

              <Pullquote>
                Cloud Computing aur Artificial Intelligence ke peeche bhi massive Data Centers ka hi haath hota hai.
              </Pullquote>

              {/* ── AI ── */}
              <SectionHeading id="ai">Kya AI Bhi Data Centers Par Chalta Hai?</SectionHeading>
              <p className="mb-6">Bilkul. Aaj ke AI tools jaise ChatGPT, image generators aur recommendation engines massive Data Centers me run karte hain.</p>

              <InfoBox title="AI Training ke liye kya chahiye?" color="red">
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {[
                    { item: "Thousands of GPUs / TPUs", detail: "NVIDIA H100s, Google TPUs — billions of parameters simultaneously" },
                    { item: "Petabytes of Storage", detail: "Training data, model checkpoints, datasets" },
                    { item: "High-Speed Interconnects", detail: "InfiniBand, NVLink — 400 Gbps+ bandwidth" },
                    { item: "Massive Power", detail: "Single AI cluster — 10+ MW, data center campus — 100+ MW" },
                  ].map((r) => (
                    <li key={r.item} className="flex items-start gap-2">
                      <Cpu size={12} className="text-[var(--color-neon-red)] mt-1 shrink-0" />
                      <span><strong className="text-[var(--color-text-primary)]">{r.item}</strong> — {r.detail}</span>
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <QuickFact>
                GPT-4 jaise models ko train karne me ~25,000 NVIDIA A100 GPUs aur estimated $100M+ compute cost lagi. Ye sab sirf Data Centers me possible hai.
              </QuickFact>

              {/* ── India ── */}
              <SectionHeading id="india">Bharat Me Data Centers Ka Future</SectionHeading>
              <p className="mb-6">India me Data Center industry bahut tezi se grow kar rahi hai. Digital India, UPI boom, AI adoption, 5G expansion — sab kuch Data Center demand drive kar raha hai.</p>

              <InfoBox title="India's Data Center Hubs — 2026" color="cyan">
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)]">
                  {[
                    { city: "Mumbai", detail: "Largest hub — Tier 1 connectivity, submarine cable landing" },
                    { city: "Chennai", detail: "Southern hub — multiple cable stations" },
                    { city: "Hyderabad", detail: "IT corridor — hyperscaler expansion" },
                    { city: "Noida / Delhi NCR", detail: "North India hub — government projects" },
                    { city: "Pune", detail: "Emerging — lower land cost, power availability" },
                    { city: "Bengaluru", detail: "Tech capital — enterprise demand" },
                  ].map((loc) => (
                    <li key={loc.city} className="flex items-start gap-2">
                      <span className="text-[var(--color-neon-cyan)] mt-0.5">◈</span>
                      <div>
                        <span className="font-semibold text-[var(--color-text-primary)]">{loc.city}</span>
                        <span className="text-[var(--color-text-muted)]"> — {loc.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </InfoBox>

              <p className="mb-4">Aane wale saalon me hazaron nawi jobs create hongi — Data Center Technician se lekar Electrical Engineer, Network Specialist aur Cooling Engineer tak.</p>

              {/* ── Conclusion ── */}
              <SectionHeading id="conclusion">Conclusion</SectionHeading>
              <p className="mb-4">Har WhatsApp message, YouTube video, online payment aur AI response ke peeche ek Data Center kaam karta hai.</p>
              <p className="mb-4">Ye sirf servers ka room nahi hai — ye internet ka dil hai.</p>
              <p className="mb-10">
                Agli baar jab aap YouTube par video dekho ya online payment karo, ek baar zarur sochna ki aapke screen ke peeche hazaron servers aur engineers milkar is digital duniya ko chalaye rakhte hain — <strong className="text-[var(--color-text-primary)]">24 ghante, 7 din, 365 din.</strong>
              </p>

              {/* ── FAQ ── */}
              <FAQ />

              {/* ── Related ── */}
              <RelatedArticles />

              {/* ── Back link ── */}
              <div className="mt-16 pt-8 border-t border-[rgba(0,212,255,0.1)]">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-xs tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-neon-blue)] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <ArrowLeft size={12} />
                  BACK TO ALL ARTICLES
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
