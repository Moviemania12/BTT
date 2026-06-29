"use client";
import { useEffect, useRef, useState } from "react";
import { Server, Wifi, Brain, Zap } from "lucide-react";

const stats = [
  {
    icon: Server,
    value: 2400000,
    display: "2.4M+",
    label: "Servers Documented",
    suffix: "+",
    color: "blue",
    desc: "Physical servers across hyperscale facilities",
  },
  {
    icon: Wifi,
    value: 847,
    display: "847 PB",
    label: "Data Flow Analyzed",
    suffix: " PB",
    color: "red",
    desc: "Petabytes of network traffic studied",
  },
  {
    icon: Brain,
    value: 10000,
    display: "10K+",
    label: "AI Systems Profiled",
    suffix: "+",
    color: "cyan",
    desc: "Machine learning infrastructure units",
  },
  {
    icon: Zap,
    value: 12400,
    display: "12.4 GW",
    label: "Power Infrastructure",
    suffix: " GW",
    color: "blue",
    desc: "Gigawatts of data center power capacity",
  },
];

function Counter({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <>{count.toLocaleString()}</>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          entries[0].target.querySelectorAll(".reveal").forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 100);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="reveal flex items-center justify-center gap-3 mb-6">
            <div className="tech-line w-12" />
            <span className="text-xs tracking-[0.4em] text-[var(--color-neon-blue)] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}>By The Numbers</span>
            <div className="tech-line w-12" />
          </div>
          <h2 className="reveal text-[clamp(2.5rem,6vw,5rem)] tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[var(--color-text-primary)]">THE SCALE OF </span>
            <span className="text-[var(--color-neon-blue)] glow-blue">TECH</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colorMap = {
              blue: { border: "rgba(0,212,255,0.2)", text: "var(--color-neon-blue)", bg: "rgba(0,212,255,0.06)", glow: "rgba(0,212,255,0.15)" },
              red: { border: "rgba(255,34,68,0.2)", text: "var(--color-neon-red)", bg: "rgba(255,34,68,0.06)", glow: "rgba(255,34,68,0.15)" },
              cyan: { border: "rgba(0,255,204,0.2)", text: "var(--color-neon-cyan)", bg: "rgba(0,255,204,0.06)", glow: "rgba(0,255,204,0.15)" },
            };
            const c = colorMap[stat.color as keyof typeof colorMap];

            return (
              <div
                key={stat.label}
                className="reveal glass card-hover group relative overflow-hidden p-8 text-center"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  border: `1px solid ${c.border}`,
                }}
              >
                {/* Hover bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${c.glow} 0%, transparent 70%)` }} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center mx-auto mb-6 border group-hover:scale-110 transition-transform duration-300"
                    style={{ borderColor: c.border, background: c.bg }}>
                    <Icon size={24} style={{ color: c.text }} />
                  </div>

                  {/* Counter */}
                  <div className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight"
                    style={{ fontFamily: "var(--font-display)", color: c.text }}>
                    {stat.display.replace(/[\d.]+/, "")}
                    <Counter target={stat.value} isVisible={isVisible} />
                    {stat.suffix}
                  </div>

                  {/* Actually show the display stat for non-animatable ones */}
                  <div className="text-sm font-bold text-[var(--color-text-primary)] mb-2 tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {stat.desc}
                  </div>

                  {/* Bottom line */}
                  <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
