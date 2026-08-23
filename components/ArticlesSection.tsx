"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag, TrendingUp } from "lucide-react";

// ─── Author constant — single source of truth ────────────────────────────────
const AUTHOR = {
  name: "Kumar Anil",
  title: "Project Manager – Data Center",
  publication: "Behind The Tech",
};

// ─── Article interface ────────────────────────────────────────────────────────
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  thumbnail: string;
  category: string;
  readTime: number;
  publishDate: string;
  featured?: boolean;
  trending?: boolean;
}

// ─── Articles — slugs match existing app/articles/[slug] routes ──────────────
const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "data-center-kya-hota-hai",
    title: "Data Center: Internet Ka Dil",
    excerpt:
      "Yeh wahi jagah hai jahan se Google, Facebook, aur Netflix ka sara data store hota hai. Hazaron servers, fiber cables aur backup power — sab ek hi chhat ke neeche.",
    image: "/images/articles/data-center-hero.jpg",
    thumbnail: "/images/articles/data-center-thumb.png",
    category: "Data Center",
    readTime: 12,
    publishDate: "2026-01-15",
    featured: true,
    trending: true,
  },
  {
    id: "2",
    slug: "cloud-computing-kya-hai",
    title: "Cloud Computing: Aasman Mein Computer",
    excerpt:
      "AWS, Azure, Google Cloud — inhi platforms par puri digital economy chalti hai. Samjhein yeh kya hai, kaise kaam karta hai, aur career mein kaise kaam aa sakta hai.",
    image: "/images/articles/cloud-computing-hero.png",
    thumbnail: "/images/articles/cloud-computing-thumb.png",
    category: "Cloud Computing",
    readTime: 10,
    publishDate: "2026-01-20",
    trending: true,
  },
  {
    id: "3",
    slug: "artificial-intelligence-kya-hai",
    title: "Artificial Intelligence: Machine Ko Dimaag Dena",
    excerpt:
      "Face unlock se lekar cancer detection tak — AI ab sirf labs mein nahi, aapki zindagi mein hai. Beginners ke liye puri kahani simple Hinglish mein.",
    image: "/images/articles/ai-hero.png",
    thumbnail: "/images/articles/ai-thumb.png",
    category: "Artificial Intelligence",
    readTime: 14,
    publishDate: "2026-01-25",
  },
];

// ─── Utility ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── CSS-only 3D tilt hook ────────────────────────────────────────────────────
function useTilt(ref: React.RefObject<HTMLDivElement | null>, intensity = 10) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * intensity;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * -intensity;
      el.style.transform = `perspective(900px) rotateX(${dy}deg) rotateY(${dx}deg) translateZ(6px)`;
    };
    const onLeave = () => {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, intensity]);
}

// ─── Intersection-reveal hook ─────────────────────────────────────────────────
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Author byline ────────────────────────────────────────────────────────────
function AuthorByline({ size = "sm" }: { size?: "sm" | "xs" }) {
  const xs = size === "xs";
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full flex items-center justify-center font-bold shrink-0"
        style={{
          width: xs ? 26 : 32,
          height: xs ? 26 : 32,
          fontSize: xs ? 9 : 11,
          background: "rgba(0,212,255,0.1)",
          border: "1px solid rgba(0,212,255,0.35)",
          color: "var(--color-neon-blue)",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.05em",
        }}
      >
        KA
      </div>
      <div>
        <div
          style={{
            fontSize: xs ? 10 : 12,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.2,
          }}
        >
          {AUTHOR.name}
        </div>
        <div
          style={{
            fontSize: xs ? 9 : 10,
            color: "var(--color-neon-blue)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
            lineHeight: 1.2,
          }}
        >
          {AUTHOR.title}
        </div>
      </div>
    </div>
  );
}

// ─── Featured hero ────────────────────────────────────────────────────────────
function FeaturedHero({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block group"
      aria-label={`Read: ${article.title}`}
    >
      <article
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        style={{
          border: "1px solid rgba(0,212,255,0.12)",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(0,212,255,0.35)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 80px rgba(0,212,255,0.07), 0 32px 80px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(0,212,255,0.12)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div className="relative h-[260px] sm:h-[360px] md:h-[460px] lg:h-[520px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-out"
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(3,5,7,1) 0%, rgba(3,5,7,0.82) 28%, rgba(3,5,7,0.3) 65%, rgba(3,5,7,0.04) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
            style={{ boxShadow: "inset 0 0 60px rgba(0,212,255,0.1)" }}
          />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-7 sm:px-10 sm:pb-9 lg:px-14 lg:pb-12">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold tracking-[0.25em]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(0,212,255,0.14)",
                border: "1px solid rgba(0,212,255,0.4)",
                color: "var(--color-neon-blue)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--color-neon-blue)" }}
              />
              FEATURED
            </span>
            {article.trending && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(255,34,68,0.12)",
                  border: "1px solid rgba(255,34,68,0.35)",
                  color: "var(--color-neon-red)",
                }}
              >
                <TrendingUp size={9} />
                TRENDING
              </span>
            )}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-semibold tracking-[0.18em]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(0,0,0,0.42)",
                border: "1px solid rgba(0,212,255,0.18)",
                color: "var(--color-text-secondary)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Tag size={9} style={{ color: "var(--color-neon-blue)" }} />
              {article.category}
            </span>
            <span
              className="hidden sm:flex items-center gap-2.5 text-[10px]"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="flex items-center gap-1">
                <Clock size={10} style={{ color: "var(--color-neon-blue)" }} />
                {article.readTime} min read
              </span>
              <span style={{ color: "var(--color-text-muted)" }}>·</span>
              <span className="flex items-center gap-1">
                <Calendar
                  size={10}
                  style={{ color: "var(--color-neon-blue)" }}
                />
                {formatDate(article.publishDate)}
              </span>
            </span>
          </div>

          {/* Title */}
          <h2
            className="mb-3 leading-none tracking-wide group-hover:text-[var(--color-neon-blue)] transition-colors duration-400"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.55rem, 5vw, 3.4rem)",
              color: "var(--color-text-primary)",
            }}
          >
            {article.title}
          </h2>

          {/* Excerpt */}
          <p
            className="mb-5 max-w-2xl line-clamp-2 hidden sm:block"
            style={{
              fontSize: "clamp(0.78rem, 1.3vw, 0.92rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
            }}
          >
            {article.excerpt}
          </p>

          {/* Author + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <AuthorByline size="sm" />
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs tracking-[0.18em] group-hover:gap-3 transition-all duration-300"
              style={{
                fontFamily: "var(--font-mono)",
                background:
                  "linear-gradient(135deg, var(--color-neon-blue), #0099cc)",
                color: "#000",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 28px rgba(0,212,255,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Explore Article
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Article card with 3D tilt ────────────────────────────────────────────────
function ArticleCard({
  article,
  delay = 0,
}: {
  article: Article;
  delay?: number;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef, 10);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block h-full"
      aria-label={`Read: ${article.title}`}
    >
      <div
        ref={tiltRef}
        className="group h-full flex flex-col cursor-pointer rounded-xl overflow-hidden"
        style={{
          background: "rgba(7,12,18,0.82)",
          border: "1px solid rgba(0,212,255,0.1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          transitionDelay: `${delay}ms`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(0,212,255,0.32)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 20px 60px rgba(0,0,0,0.55), 0 0 38px rgba(0,212,255,0.13), inset 0 0 22px rgba(0,212,255,0.04)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(0,212,255,0.1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-[var(--color-abyss)] shrink-0">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,12,18,0.9) 0%, rgba(7,12,18,0.1) 55%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: "inset 0 0 28px rgba(0,212,255,0.12)" }}
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(0,212,255,0.14)",
                border: "1px solid rgba(0,212,255,0.32)",
                color: "var(--color-neon-blue)",
                backdropFilter: "blur(6px)",
              }}
            >
              {article.category}
            </span>
          </div>

          {/* Trending badge */}
          {article.trending && (
            <div className="absolute top-3 right-3">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-[0.18em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(255,34,68,0.14)",
                  border: "1px solid rgba(255,34,68,0.32)",
                  color: "var(--color-neon-red)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full animate-pulse"
                  style={{ background: "var(--color-neon-red)" }}
                />
                HOT
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Meta */}
          <div
            className="flex items-center gap-3 mb-3 text-[10px]"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="flex items-center gap-1">
              <Clock size={10} style={{ color: "var(--color-neon-blue)" }} />
              {article.readTime} min
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar size={10} style={{ color: "var(--color-neon-blue)" }} />
              {formatDate(article.publishDate)}
            </span>
          </div>

          {/* Title */}
          <h3
            className="mb-3 leading-snug line-clamp-2 group-hover:text-[var(--color-neon-blue)] transition-colors duration-300"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.8vw, 1.18rem)",
              letterSpacing: "0.03em",
              color: "var(--color-text-primary)",
            }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p
            className="flex-1 line-clamp-3 mb-4 leading-relaxed"
            style={{
              fontSize: "0.77rem",
              color: "var(--color-text-secondary)",
            }}
          >
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="mb-4">
            <AuthorByline size="xs" />
          </div>

          {/* Divider */}
          <div
            className="mb-4 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,212,255,0.2), transparent)",
            }}
          />

          {/* CTA */}
          <div
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] group-hover:gap-2.5 transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-neon-blue)",
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.18)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(0,212,255,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(0,212,255,0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 18px rgba(0,212,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(0,212,255,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(0,212,255,0.18)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Explore Article
            <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Author spotlight strip ───────────────────────────────────────────────────
function AuthorSpotlight() {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 rounded-xl mb-10"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.1)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-full flex items-center justify-center font-bold shrink-0"
          style={{
            width: 42,
            height: 42,
            fontSize: 13,
            background: "rgba(0,212,255,0.1)",
            border: "1.5px solid rgba(0,212,255,0.4)",
            color: "var(--color-neon-blue)",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.05em",
          }}
        >
          KA
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-body)",
            }}
          >
            {AUTHOR.name}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "var(--color-neon-blue)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            {AUTHOR.title} · {AUTHOR.publication}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["Data Centers", "Critical Infrastructure", "Cloud & AI"].map((s) => (
          <span
            key={s}
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.18em",
              color: "var(--color-text-secondary)",
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.12)",
              borderRadius: 4,
              padding: "3px 8px",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-px w-10"
          style={{
            background:
              "linear-gradient(90deg, var(--color-neon-blue), transparent)",
          }}
        />
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.42em",
            color: "var(--color-neon-blue)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase" as const,
          }}
        >
          Knowledge Base
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "var(--color-text-primary)",
          }}
        >
          TECHNOLOGY{" "}
          <span
            className="glow-blue"
            style={{ color: "var(--color-neon-blue)" }}
          >
            INSIGHTS
          </span>
        </h2>
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--color-text-muted)",
            maxWidth: 340,
            lineHeight: 1.6,
          }}
        >
          In-depth articles by industry professionals —
          written in Hinglish for easy understanding.
        </p>
      </div>

      <div
        className="mt-5 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--color-neon-blue), rgba(0,212,255,0.15) 60%, transparent)",
        }}
      />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ArticlesSection() {
  const { ref: sectionRef, visible } = useReveal(0.07);

  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a.id !== featured.id);

  return (
    <section
      id="articles-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 px-5 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-void) 0%, var(--color-abyss) 45%, var(--color-void) 100%)",
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full opacity-[0.07]"
          style={{
            width: 600,
            height: 600,
            top: "5%",
            left: "20%",
            background:
              "radial-gradient(circle, var(--color-neon-blue), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: 500,
            height: 500,
            bottom: "10%",
            right: "15%",
            background:
              "radial-gradient(circle, var(--color-neon-cyan), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <SectionHeader />
        </div>

        {/* Featured hero */}
        <div
          className="mb-8 md:mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <FeaturedHero article={featured} />
        </div>

        {/* Author spotlight */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.18s, transform 0.6s ease 0.18s",
          }}
        >
          <AuthorSpotlight />
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
          }}
        >
          {rest.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
