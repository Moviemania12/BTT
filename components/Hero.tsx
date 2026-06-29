"use client";

import { useEffect, useRef } from "react";
import {
  ChevronDown,
  Play,
  ArrowRight,
  Server,
  Cloud,
  Cpu,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const AUTHOR = {
  initials: "KA",
  name: "Kumar Anil",
  title: "Project Manager – Data Center",
};

const TOPICS = [
  "Data Centers",
  "Cloud Computing",
  "Artificial Intelligence",
  "Cyber Security",
];

const PILLARS = [
  {
    Icon: Server,
    title: "Data Center",
    subtitle: "Critical Infrastructure",
    keywords: ["Servers", "UPS", "Cooling", "DCIM"],
    accentRgb: "0,212,255",
  },
  {
    Icon: Cloud,
    title: "Cloud Infrastructure",
    subtitle: "Distributed Computing",
    keywords: ["AWS", "Azure", "GCP", "DevOps"],
    accentRgb: "0,255,204",
  },
  {
    Icon: Cpu,
    title: "AI Systems",
    subtitle: "Machine Intelligence",
    keywords: ["GPUs", "LLMs", "MLOps", "Automation"],
    accentRgb: "160,100,255",
  },
];

// ─── Server Rack SVG ──────────────────────────────────────────────────────────

function ServerRackSVG() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="w-full h-full"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="10" y="10" width="180" height="380" rx="4"
        stroke="rgba(0,212,255,0.22)" strokeWidth="1"
        fill="rgba(0,212,255,0.012)"
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i}>
          <rect
            x="18" y={18 + i * 26} width="164" height="20" rx="2"
            fill={i % 3 === 0 ? "rgba(0,212,255,0.07)" : "rgba(0,212,255,0.03)"}
            stroke="rgba(0,212,255,0.1)" strokeWidth="0.5"
          />
          <circle
            cx="30" cy={28 + i * 26} r="2.5"
            fill={i % 4 === 0 ? "rgba(255,34,68,0.85)" : "rgba(0,212,255,0.85)"}
            style={{ filter: "blur(0.8px)" }}
          />
          <circle cx="38" cy={28 + i * 26} r="1.5" fill="rgba(0,255,100,0.6)" />
          {Array.from({ length: 5 }).map((_, j) => (
            <rect
              key={j}
              x={55 + j * 24} y={22 + i * 26} width="18" height="12" rx="1"
              fill="rgba(0,0,0,0.35)" stroke="rgba(0,212,255,0.07)" strokeWidth="0.5"
            />
          ))}
          <rect x="158" y={22 + i * 26} width="16" height="5" rx="1" fill="rgba(0,212,255,0.07)" />
          <rect x="158" y={30 + i * 26} width="16" height="5" rx="1" fill="rgba(0,212,255,0.07)" />
        </g>
      ))}
      <path d="M20 380 Q10 300 10 200 Q10 100 20 20" stroke="rgba(0,212,255,0.06)" strokeWidth="8" fill="none" />
      <path d="M180 380 Q190 300 190 200 Q190 100 180 20" stroke="rgba(0,212,255,0.06)" strokeWidth="8" fill="none" />
    </svg>
  );
}

// ─── Author Byline ────────────────────────────────────────────────────────────

function AuthorByline() {
  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "rgba(13,21,32,0.7)",
        border: "1px solid rgba(0,212,255,0.22)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Avatar */}
      <div
        className="flex items-center justify-center rounded-full shrink-0 font-bold"
        style={{
          width: 36,
          height: 36,
          fontSize: 12,
          letterSpacing: "0.04em",
          background: "rgba(0,212,255,0.1)",
          border: "1.5px solid rgba(0,212,255,0.4)",
          color: "var(--color-neon-blue)",
          fontFamily: "var(--font-display)",
        }}
      >
        {AUTHOR.initials}
      </div>

      {/* Vertical divider */}
      <div
        className="w-px self-stretch"
        style={{ background: "rgba(0,212,255,0.18)" }}
      />

      {/* Text block */}
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.3,
          }}
        >
          {AUTHOR.name}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "var(--color-neon-blue)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            lineHeight: 1.3,
          }}
        >
          {AUTHOR.title}
        </div>
      </div>
    </div>
  );
}

// ─── Pillar Card ──────────────────────────────────────────────────────────────

function PillarCard({
  Icon,
  title,
  subtitle,
  keywords,
  accentRgb,
  delay,
}: (typeof PILLARS)[number] & { delay: number }) {
  return (
    <div
      className="flex flex-col cursor-pointer rounded-xl p-5 group relative overflow-hidden"
      style={{
        background: "rgba(7,12,18,0.75)",
        border: `1px solid rgba(${accentRgb},0.18)`,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        transition:
          "border-color 0.32s ease, box-shadow 0.32s ease, transform 0.28s ease",
        animation: "heroFadeUp 0.65s ease forwards",
        animationDelay: `${delay}ms`,
        opacity: 0,
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `rgba(${accentRgb},0.45)`;
        el.style.boxShadow = `0 0 28px rgba(${accentRgb},0.14), 0 16px 40px rgba(0,0,0,0.4)`;
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `rgba(${accentRgb},0.18)`;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
      onClick={() =>
        document
          .querySelector("#articles-section")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ")
          document
            .querySelector("#articles-section")
            ?.scrollIntoView({ behavior: "smooth" });
      }}
      aria-label={`Explore ${title} articles`}
    >
      {/* Icon + heading */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{
            width: 38,
            height: 38,
            background: `rgba(${accentRgb},0.1)`,
            border: `1px solid rgba(${accentRgb},0.2)`,
          }}
        >
          <Icon
            size={18}
            style={{ color: `rgba(${accentRgb},1)` }}
            strokeWidth={1.6}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
            }}
          >
            {title.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.18em",
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            {subtitle.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-3 h-px"
        style={{
          background: `linear-gradient(90deg, rgba(${accentRgb},0.3), transparent)`,
        }}
      />

      {/* Keyword tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {keywords.map((kw) => (
          <span
            key={kw}
            style={{
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.14em",
              color: "var(--color-text-secondary)",
              background: `rgba(${accentRgb},0.06)`,
              border: `1px solid rgba(${accentRgb},0.14)`,
              borderRadius: 4,
              padding: "2px 7px",
            }}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Explore link */}
      <div className="flex items-center gap-1.5 mt-auto">
        <span
          style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.25em",
            color: `rgba(${accentRgb},1)`,
          }}
        >
          EXPLORE
        </span>
        <ArrowRight
          size={10}
          style={{ color: `rgba(${accentRgb},1)` }}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      </div>

      {/* Bottom accent line — visible on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.7), transparent)`,
        }}
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rackLeftRef  = useRef<HTMLDivElement>(null);
  const rackRightRef = useRef<HTMLDivElement>(null);

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    const isMobile = window.innerWidth < 768;
    const COUNT    = isMobile ? 40 : 70;
    const CONN     = isMobile ? 85 : 110;

    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
    }[] = [];

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.25,
        vy:      (Math.random() - 0.5) * 0.25,
        size:    Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.4 + 0.08,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
        ctx.fill();

        // Forward-pair only — O(n(n-1)/2) not O(n²)
        for (let j = i + 1; j < particles.length; j++) {
          const p2   = particles[j];
          const dx   = p.x - p2.x;
          const dy   = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - dist / CONN)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", setSize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  // Subtle parallax on server racks
  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY * 0.1;
      if (rackLeftRef.current)
        rackLeftRef.current.style.transform = `translateY(${offset}px)`;
      if (rackRightRef.current)
        rackRightRef.current.style.transform = `translateY(${offset}px) scaleX(-1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg scanline"
      aria-label="Hero — Technology Insights"
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(0,212,255,0.045) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 rounded-full"
          style={{
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle, rgba(255,34,68,0.028) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Server racks — desktop only, parallax */}
      <div
        ref={rackLeftRef}
        className="absolute left-[-1%] top-0 bottom-0 w-[15%] hidden lg:flex items-center"
        style={{ opacity: 0.28, willChange: "transform" }}
        aria-hidden="true"
      >
        <ServerRackSVG />
      </div>
      <div
        ref={rackRightRef}
        className="absolute right-[-1%] top-0 bottom-0 w-[15%] hidden lg:flex items-center"
        style={{
          opacity: 0.28,
          willChange: "transform",
          transform: "scaleX(-1)",
        }}
        aria-hidden="true"
      >
        <ServerRackSVG />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-12">

        {/* ── Eyebrow label ── */}
        <div
          className="flex items-center justify-center gap-3 mb-8"
          style={{
            animation: "heroFadeDown 0.55s ease forwards",
            animationDelay: "150ms",
            opacity: 0,
          }}
        >
          <div
            className="h-px flex-1 max-w-[60px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,255,0.5))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.36em",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
            }}
          >
            Technology Explained by Industry Experts
          </span>
          <div
            className="h-px flex-1 max-w-[60px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,212,255,0.5), transparent)",
            }}
          />
        </div>

        {/* ── Hero heading ── */}
        <div
          className="mb-6 text-center sm:text-left"
          style={{
            animation: "heroFadeUp 0.65s ease forwards",
            animationDelay: "250ms",
            opacity: 0,
          }}
        >
          <h1
            className="leading-none tracking-wide"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            }}
          >
            <span className="block" style={{ color: "var(--color-text-primary)" }}>
              TECHNOLOGY
            </span>
            <span className="block gradient-text">INSIGHTS</span>
          </h1>
        </div>

        {/* ── Topic pill row ── */}
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7 justify-center sm:justify-start"
          style={{
            animation: "heroFadeUp 0.6s ease forwards",
            animationDelay: "360ms",
            opacity: 0,
          }}
        >
          {TOPICS.map((topic, i) => (
            <span key={topic} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  className="hidden sm:inline"
                  style={{ color: "var(--color-text-muted)", fontSize: 11 }}
                >
                  ·
                </span>
              )}
              <span
                className="flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: "var(--color-text-secondary)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: "var(--color-neon-blue)",
                    boxShadow: "0 0 5px rgba(0,212,255,0.65)",
                  }}
                />
                {topic.toUpperCase()}
              </span>
            </span>
          ))}
        </div>

        {/* ── Accent divider ── */}
        <div
          className="mb-7 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,212,255,0.28), rgba(0,212,255,0.07) 55%, transparent)",
            animation: "heroFadeUp 0.5s ease forwards",
            animationDelay: "400ms",
            opacity: 0,
          }}
        />

        {/* ── Tagline + CTAs row ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8"
          style={{
            animation: "heroFadeUp 0.65s ease forwards",
            animationDelay: "470ms",
            opacity: 0,
          }}
        >
          {/* Editorial tagline */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--color-text-secondary)",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            Deep dives into the technology powering the modern world.
            <br className="hidden sm:block" />
            Written by industry professionals in simple Hinglish.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="btn-primary flex items-center gap-2.5 text-sm rounded-lg"
              style={{ padding: "13px 28px" }}
              onClick={() => scrollTo("#articles-section")}
            >
              <Play size={14} fill="currentColor" />
              Read Articles
            </button>
            <button
              className="btn-outline flex items-center gap-2 text-sm rounded-lg group"
              style={{ padding: "12px 22px" }}
              onClick={() => scrollTo("#about")}
            >
              Learn More
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>
        </div>

        {/* ── Author byline ── */}
        <div
          className="mb-20 flex justify-center sm:justify-start"
          style={{
            animation: "heroFadeUp 0.6s ease forwards",
            animationDelay: "540ms",
            opacity: 0,
          }}
        >
          <AuthorByline />
        </div>

        {/* ── Technology pillar cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            animation: "heroFadeUp 0.6s ease forwards",
            animationDelay: "610ms",
            opacity: 0,
            marginTop: "24px",
          }}
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.title}
              {...pillar}
              delay={680 + i * 80}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{
          animation: "heroFadeUp 0.5s ease forwards",
          animationDelay: "1050ms",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.38em",
            color: "var(--color-text-muted)",
          }}
        >
          SCROLL
        </span>
        <ChevronDown
          size={14}
          className="animate-bounce"
          style={{ color: "var(--color-neon-blue)" }}
        />
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(transparent, var(--color-void))" }}
        aria-hidden="true"
      />

      {/* ── Scoped keyframes — no globals.css change needed ── */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes heroFadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroFadeUp"],
          [style*="heroFadeDown"] {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
