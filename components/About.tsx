"use client";
import { useEffect, useRef } from "react";
import { Database, Cpu, Zap, Bot, Building2, Wifi, Server, FlaskConical } from "lucide-react";

const topics = [
  { icon: Database, label: "Data Centers", desc: "Hyperscale facilities powering the cloud" },
  { icon: Cpu, label: "AI Infrastructure", desc: "The silicon backbone of machine intelligence" },
  { icon: Server, label: "Servers", desc: "Hardware engineering at extreme scale" },
  { icon: Zap, label: "Electrical Systems", desc: "Power delivery for the digital age" },
  { icon: Bot, label: "Automation", desc: "Robotic systems reshaping industries" },
  { icon: FlaskConical, label: "Future Technology", desc: "Quantum, photonics, and beyond" },
  { icon: Building2, label: "Smart Buildings", desc: "Intelligent infrastructure and BMS" },
  { icon: Wifi, label: "Networking", desc: "The arteries of global data flow" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,34,68,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: text */}
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="tech-line-red w-12" />
              <span className="text-xs tracking-[0.4em] text-[var(--color-neon-red)] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}>
                Our Mission
              </span>
            </div>

            <h2 className="reveal text-[clamp(2.5rem,6vw,5rem)] leading-tight tracking-wide mb-8"
              style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-[var(--color-text-primary)]">THE WORLD RUNS ON</span>
              <br />
              <span className="text-[var(--color-neon-blue)] glow-blue">INVISIBLE TECH</span>
            </h2>

            <p className="reveal text-[var(--color-text-secondary)] leading-relaxed text-lg mb-6">
              Behind The Tech is a documentary-grade knowledge platform that pulls back the curtain
              on the infrastructure holding civilization together. We go deep — inside data centers,
              through server farms, into the electrical grids and automation systems that make the
              modern world run.
            </p>

            <p className="reveal text-[var(--color-text-secondary)] leading-relaxed mb-10">
              No fluff. No surface-level explainers. Just the raw, cinematic truth about the
              technology most people never see — but everyone depends on, every second of every day.
            </p>

            <div className="reveal">
              <div className="glass-red p-4 rounded-none border-l-2 border-[var(--color-neon-red)]">
                <p className="text-sm text-[var(--color-text-secondary)] italic"
                  style={{ fontFamily: "var(--font-mono)" }}>
                  "Every click, every stream, every transaction — it all traces back to physical infrastructure.
                  We document the machines behind the magic."
                </p>
              </div>
            </div>
          </div>

          {/* Right: topic grid */}
          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.label}
                  className="reveal glass p-5 card-hover group cursor-default"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center border border-[rgba(0,212,255,0.2)] shrink-0 group-hover:border-[var(--color-neon-blue)] group-hover:bg-[rgba(0,212,255,0.08)] transition-all">
                      <Icon size={16} className="text-[var(--color-neon-blue)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--color-text-primary)] mb-1 tracking-wide">
                        {topic.label}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {topic.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
