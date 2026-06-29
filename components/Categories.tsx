"use client";
import { useEffect, useRef } from "react";
import { Database, Cpu, Zap, Rocket, Building2, Server, ArrowRight } from "lucide-react";

const categories = [
  {
    icon: Database,
    title: "Data Center",
    subtitle: "Hyperscale Infrastructure",
    desc: "Explore the anatomy of billion-dollar facilities housing millions of servers that store the world's data.",
    count: "24 Episodes",
    color: "blue",
    gradient: "from-[rgba(0,212,255,0.15)] to-transparent",
    border: "border-[rgba(0,212,255,0.2)]",
    glowColor: "rgba(0,212,255,0.3)",
    tag: "MOST WATCHED",
  },
  {
    icon: Cpu,
    title: "AI Systems",
    subtitle: "Machine Intelligence",
    desc: "The GPU clusters, tensor processing units, and cooling systems powering the AI revolution.",
    count: "18 Episodes",
    color: "red",
    gradient: "from-[rgba(255,34,68,0.12)] to-transparent",
    border: "border-[rgba(255,34,68,0.2)]",
    glowColor: "rgba(255,34,68,0.3)",
    tag: "TRENDING",
  },
  {
    icon: Zap,
    title: "Electrical Engineering",
    subtitle: "Power Distribution",
    desc: "Substations, UPS systems, generators, and the electrical arteries that keep data centers alive.",
    count: "15 Episodes",
    color: "blue",
    gradient: "from-[rgba(0,212,255,0.10)] to-transparent",
    border: "border-[rgba(0,212,255,0.15)]",
    glowColor: "rgba(0,212,255,0.2)",
    tag: null,
  },
  {
    icon: Rocket,
    title: "Future Tech",
    subtitle: "Emerging Technologies",
    desc: "Quantum computing, photonic chips, neuromorphic processors — the next generation of compute.",
    count: "12 Episodes",
    color: "cyan",
    gradient: "from-[rgba(0,255,204,0.08)] to-transparent",
    border: "border-[rgba(0,255,204,0.15)]",
    glowColor: "rgba(0,255,204,0.2)",
    tag: "NEW",
  },
  {
    icon: Building2,
    title: "Smart Infrastructure",
    subtitle: "Intelligent Buildings",
    desc: "Building management systems, DCIM, environmental controls, and the brain behind smart campuses.",
    count: "10 Episodes",
    color: "blue",
    gradient: "from-[rgba(0,212,255,0.08)] to-transparent",
    border: "border-[rgba(0,212,255,0.12)]",
    glowColor: "rgba(0,212,255,0.15)",
    tag: null,
  },
  {
    icon: Server,
    title: "Server Technology",
    subtitle: "Bare Metal Hardware",
    desc: "Blade servers, rack density, cooling innovations, and the hardware engineering behind enterprise compute.",
    count: "20 Episodes",
    color: "red",
    gradient: "from-[rgba(255,34,68,0.08)] to-transparent",
    border: "border-[rgba(255,34,68,0.15)]",
    glowColor: "rgba(255,34,68,0.2)",
    tag: null,
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Top divider */}
      <div className="tech-line mb-0" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="reveal flex items-center justify-center gap-3 mb-6">
            <div className="tech-line w-12" />
            <span className="text-xs tracking-[0.4em] text-[var(--color-neon-blue)] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}>
              Knowledge Vault
            </span>
            <div className="tech-line w-12" />
          </div>
          <h2 className="reveal text-[clamp(2.5rem,6vw,5rem)] tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[var(--color-text-primary)]">FEATURED </span>
            <span className="text-[var(--color-neon-blue)] glow-blue">CATEGORIES</span>
          </h2>
          <p className="reveal text-[var(--color-text-muted)] mt-4 max-w-xl mx-auto">
            Deep-dive series organized by domain. Pick your specialty or explore everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`reveal glass card-hover group cursor-pointer relative overflow-hidden border ${cat.border}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  "--glow": cat.glowColor,
                } as React.CSSProperties}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Tag */}
                {cat.tag && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[9px] tracking-[0.3em] px-2 py-1 font-bold"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: cat.color === "red" ? "rgba(255,34,68,0.2)" : cat.color === "cyan" ? "rgba(0,255,204,0.2)" : "rgba(0,212,255,0.2)",
                        color: cat.color === "red" ? "var(--color-neon-red)" : cat.color === "cyan" ? "var(--color-neon-cyan)" : "var(--color-neon-blue)",
                        border: `1px solid ${cat.glowColor}`,
                      }}>
                      {cat.tag}
                    </span>
                  </div>
                )}

                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      borderColor: cat.glowColor,
                      background: `rgba(${cat.color === "red" ? "255,34,68" : cat.color === "cyan" ? "0,255,204" : "0,212,255"},0.08)`,
                    }}>
                    <Icon size={22}
                      style={{ color: cat.color === "red" ? "var(--color-neon-red)" : cat.color === "cyan" ? "var(--color-neon-cyan)" : "var(--color-neon-blue)" }}
                    />
                  </div>

                  <div className="text-xs tracking-widest text-[var(--color-text-muted)] mb-2 uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}>{cat.subtitle}</div>

                  <h3 className="text-2xl tracking-wider text-[var(--color-text-primary)] mb-3"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {cat.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                    {cat.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-widest text-[var(--color-text-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}>{cat.count}</span>
                    <div className="flex items-center gap-2 text-xs tracking-wider group-hover:gap-3 transition-all"
                      style={{
                        color: cat.color === "red" ? "var(--color-neon-red)" : cat.color === "cyan" ? "var(--color-neon-cyan)" : "var(--color-neon-blue)",
                        fontFamily: "var(--font-mono)",
                      }}>
                      EXPLORE <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
