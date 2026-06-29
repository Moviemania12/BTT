"use client";
import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, Rss } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="newsletter" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(var(--color-void), var(--color-abyss) 50%, var(--color-void))" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,34,68,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="reveal w-16 h-16 flex items-center justify-center border border-[rgba(255,34,68,0.3)] mx-auto mb-8"
          style={{ background: "rgba(255,34,68,0.08)" }}>
          <Rss size={28} className="text-[var(--color-neon-red)]" />
        </div>

        <h2 className="reveal text-[clamp(2rem,5vw,4rem)] tracking-wide mb-6"
          style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[var(--color-text-primary)]">STAY IN THE </span>
          <span className="text-[var(--color-neon-red)] glow-red">LOOP</span>
        </h2>

        <p className="reveal text-[var(--color-text-secondary)] mb-10 leading-relaxed max-w-lg mx-auto">
          Get notified when new deep-dives drop. No spam — just the most interesting technology
          content on the internet, straight to your inbox.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="reveal flex flex-col sm:flex-row gap-0 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 bg-[var(--color-panel)] border border-[rgba(255,34,68,0.2)] border-r-0 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-neon-red)] transition-colors text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wider transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, var(--color-neon-red), var(--color-neon-red-dim))",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                minWidth: "160px",
              }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  SUBSCRIBE
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="reveal flex flex-col items-center gap-4 py-8">
            <CheckCircle2 size={48} className="text-[var(--color-neon-cyan)]" />
            <p className="text-xl tracking-wider text-[var(--color-text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}>
              YOU&apos;RE IN THE SYSTEM
            </p>
            <p className="text-sm text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
              First transmission incoming shortly.
            </p>
          </div>
        )}

        <p className="reveal text-xs text-[var(--color-text-muted)] mt-6"
          style={{ fontFamily: "var(--font-mono)" }}>
          No spam. Unsubscribe at any time. Your data stays secure.
        </p>
      </div>
    </section>
  );
}
