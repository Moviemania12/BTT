"use client";
import { useState, useRef, useEffect } from "react";
import { Mail, MessageSquare, User, CheckCircle2, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll(".reveal").forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const inputClass =
    "w-full px-5 py-4 bg-[var(--color-panel)] border border-[rgba(0,212,255,0.15)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-neon-blue)] focus:bg-[rgba(0,212,255,0.04)] transition-all text-sm";

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 tech-line" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <div className="tech-line w-12" />
              <span className="text-xs tracking-[0.4em] text-[var(--color-neon-blue)] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}>Get In Touch</span>
            </div>
            <h2 className="reveal text-[clamp(2.5rem,5vw,4.5rem)] tracking-wide mb-8"
              style={{ fontFamily: "var(--font-display)" }}>
              <span className="text-[var(--color-text-primary)]">OPEN A </span>
              <span className="text-[var(--color-neon-blue)] glow-blue">CHANNEL</span>
            </h2>
            <p className="reveal text-[var(--color-text-secondary)] leading-relaxed mb-10">
              Partnerships, collaborations, media inquiries, or just want to talk tech?
              We&apos;re always looking to connect with engineers, data center operators, and
              technology enthusiasts.
            </p>

            <div className="reveal space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@behindthetech.in" },
                { icon: MessageSquare, label: "Business", value: "partnerships@behindthetech.in" },
                { icon: User, label: "Press", value: "media@behindthetech.in" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 glass p-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-[rgba(0,212,255,0.2)] group-hover:border-[var(--color-neon-blue)] transition-colors">
                      <Icon size={16} className="text-[var(--color-neon-blue)]" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-widest text-[var(--color-text-muted)] mb-0.5"
                        style={{ fontFamily: "var(--font-mono)" }}>{item.label}</div>
                      <div className="text-sm text-[var(--color-text-primary)]">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal glass p-8 border border-[rgba(0,212,255,0.1)]">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2 uppercase"
                      style={{ fontFamily: "var(--font-mono)" }}>Name</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required placeholder="Your name"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-mono)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2 uppercase"
                      style={{ fontFamily: "var(--font-mono)" }}>Email</label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required placeholder="your@email.com"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-mono)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2 uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}>Subject</label>
                  <select
                    name="subject" value={form.subject}
                    onChange={handleChange} required
                    className={`${inputClass} cursor-pointer`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <option value="" className="bg-[var(--color-panel)]">Select a topic...</option>
                    <option value="partnership" className="bg-[var(--color-panel)]">Partnership / Collaboration</option>
                    <option value="media" className="bg-[var(--color-panel)]">Media Inquiry</option>
                    <option value="sponsorship" className="bg-[var(--color-panel)]">Sponsorship</option>
                    <option value="access" className="bg-[var(--color-panel)]">Facility Access</option>
                    <option value="other" className="bg-[var(--color-panel)]">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2 uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}>Message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required placeholder="Tell us what's on your mind..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-3 rounded-none py-4 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                <CheckCircle2 size={56} className="text-[var(--color-neon-cyan)]" />
                <h3 className="text-3xl tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                  MESSAGE RECEIVED
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                  We&apos;ll get back to you within 24-48 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
