import type { Metadata } from "next";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "5G Networks aur Connectivity: Next-Gen Communication — Behind The Tech",
  description:
    "5G technology kya hai, yeh 4G se kaise alag hai, aur data centers aur enterprise connectivity pe iski kya impact hai — poori kahani Hinglish mein.",
  keywords: ["5g networks kya hai", "5g technology hindi", "5g connectivity data center", "5g vs 4g hindi"],
  authors: [{ name: "Kumar Anil" }],
  openGraph: {
    title: "5G Networks aur Connectivity — Behind The Tech",
    description: "5G technology, latency, bandwidth aur data center connectivity pe iski impact.",
    url: "https://behindthetech.in/articles/5g-networks-connectivity",
    siteName: "Behind The Tech",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "5G Networks aur Connectivity",
    description: "5G technology kya hai aur data centers pe iski kya impact hai.",
  },
};

export default function FiveGNetworksPage() {
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
          <span className="text-[var(--color-neon-blue)]">5G NETWORKS</span>
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
            Networking
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
          5G Networks aur Connectivity
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-10 text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
          <span>Kumar Anil</span>
          <span style={{ color: "rgba(0,212,255,0.3)" }}>|</span>
          <span className="flex items-center gap-1"><Clock size={12} /> 5 Min Read</span>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,212,255,0.12)", paddingTop: 40 }}>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: 24, color: "var(--color-text-secondary)" }}>
            5G (Fifth Generation) wireless network technology hai jo 4G/LTE ke baad aayi hai. Yeh sirf aapke phone ki speed badhane ke baare mein nahi hai — 5G infrastructure, latency, aur connectivity ke baare mein ek fundamental shift hai.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            5G Kya Hai?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            5G ek wireless communication standard hai jo 3GPP (3rd Generation Partnership Project) ne define kiya hai. Key characteristics: very high bandwidth (theoretically 20 Gbps peak), extremely low latency (1ms ke karib), aur massive device density support. Yeh sub-6 GHz aur mmWave (millimeter wave) frequency bands use karta hai — har ek alag trade-offs ke saath range aur speed mein.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            5G aur Data Centers ka Connection
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            5G ka data center industry pe direct impact hai. Mobile Edge Computing (MEC) — 5G architecture mein compute nodes users ke physically paas (edge) pe deploy hote hain, latency minimize karne ke liye. Yeh traditional centralized data centers se alag pattern hai. Network slicing — ek physical 5G network pe multiple virtual networks create karo, har ek different QoS (Quality of Service) ke saath.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.04em", marginBottom: 16, marginTop: 40, color: "var(--color-neon-blue)" }}>
            Enterprise Connectivity Perspective
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 20, color: "var(--color-text-secondary)" }}>
            Private 5G networks enterprises apne campus, factory, ya data center ke liye deploy kar sakte hain — dedicated spectrum aur infrastructure ke saath. Wi-Fi 6/6E ke comparison mein: 5G better mobility, wider coverage area, aur deterministic latency provide karta hai. Wi-Fi 6 typically indoor high-density environments ke liye better suited hai.
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
              Is article ka detailed version — 5G architecture deep-dive, RAN/Core network, OpenRAN, aur data center cooling/power implications — jald aayega.
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
