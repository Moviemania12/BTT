import type { Metadata } from "next";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quantum Computing: Next Frontier of Computation — Behind The Tech",
  description:
    "Quantum computing kya hai, qubits kaise kaam karte hain, aur yeh classical computing aur data centers ke liye kya implications rakhta hai — complete overview Hinglish mein.",
  keywords: ["quantum computing kya hai", "quantum computing hindi", "qubits explained hindi", "quantum vs classical computing"],
  authors: [{ name: "Kumar Anil" }],
  openGraph: {
    title: "Quantum Computing: Next Frontier of Computation — Behind The Tech",
    description: "Quantum computing fundamentals, qubits, superposition aur data center implications.",
    url: "https://behindthetech.in/articles/quantum-computing-frontier",
    siteName: "Behind The Tech",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Computing: Next Frontier",
    description: "Quantum computing kya hai aur yeh future computing ko kaise change karega.",
  },
};

export default function QuantumComputingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-void)",
        paddingTop: 96,
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[11px] tracking-widest text-[var(--color-text-muted)] mb-10"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="/" className="hover:text-[var(--color-neon-blue)] transition-colors">HOME</Link>
          <ChevronRight size={10} />
          <Link href="/articles" className="hover:text-[var(--color-neon-blue)] transition-colors">ARTICLES</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--color-neon-blue)]">QUANTUM COMPUTING</span>
        </nav>

        {/* Tag */}
        <div className="mb-5">
          <span
            className="text-[10px] tracking-[0.2em] px-3 py-1 font-bold uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "var(--color-neon-blue)",
            }}
          >
            Emerging Technology
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            color: "var(--color-text-primary)",
            marginBottom: 24,
          }}
        >
          Quantum Computing: Next Frontier of Computation
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
          <span>Kumar Anil</span>
          <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,212,255,0.12)", paddingTop: 40 }}>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 24, color: "var(--color-text-secondary)" }}>
            Quantum computing classical computing ke fundamentally alag principles pe kaam karta hai. Jahan classical computers bits (0 ya 1) use karte hain, quantum computers qubits use karte hain jo superposition mein 0 aur 1 simultaneously ho sakte hain. Yeh specific problem types ke liye exponential speedup enable karta hai.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Quantum ke Core Concepts
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Superposition: ek qubit simultaneously 0 aur 1 dono states mein ho sakta hai measurement se pehle. Entanglement: do qubits ek dusre se correlated ho jaate hain — ek ko measure karo toh dusre ki state immediately pata chalti hai, distance se independent. Interference: quantum algorithms constructive aur destructive interference use karte hain correct answers ko amplify karne ke liye aur wrong ones ko cancel karne ke liye.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Quantum Hardware — Data Center Implications
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Current quantum computers extraordinary cooling require karte hain — superconducting qubits (IBM, Google approach) near absolute zero (~15 millikelvin) pe operate karte hain. Yeh specialized dilution refrigerators use karte hain jo conventional data center cooling se completely alag hain. Trapped ion approaches (IonQ) room temperature pe operate kar sakte hain lekin different scalability challenges hain. Quantum computers classical HPC ke saath side-by-side run honge — hybrid classical-quantum architectures future data centers mein hongi.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Current State aur Timeline
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Quantum computing abhi "NISQ era" (Noisy Intermediate-Scale Quantum) mein hai — limited qubits, high error rates. Fault-tolerant quantum computing — jo real-world problems solve kar sake — abhi years away hai. Cloud access: IBM Quantum, Google Quantum AI, AWS Braket, Azure Quantum — cloud ke through quantum hardware access available hai. Practical quantum advantage abhi limited specific domains mein hai — optimization, simulation, cryptography.
          </p>

          {/* Coming Soon */}
          <div
            style={{
              marginTop: 48,
              padding: "24px 28px",
              border: "1px solid rgba(0,212,255,0.2)",
              background: "rgba(0,212,255,0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-neon-blue)",
                marginBottom: 8,
              }}
            >
              Coming Soon
            </p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", margin: 0 }}>
              Is article ka detailed version — quantum algorithms, post-quantum cryptography, aur data center infrastructure implications — jald aayega.
            </p>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 48 }}>
            <Link
              href="/articles"
              className="flex items-center gap-2 hover:text-[var(--color-neon-blue)] transition-colors"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", textDecoration: "none" }}
            >
              <ArrowLeft size={13} /> Back to Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
