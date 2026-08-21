import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Roadmap — Behind The Tech",
  description:
    "Data Center Engineer banne ka complete learning roadmap — Non-IT, IT aur AI Infrastructure step by step.",
};

export default function RoadmapPage() {
  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.25rem" }}>
      <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>
        <Link href="/learn" style={{ color: "#2563eb" }}>Learn</Link>
        {" / Roadmap"}
      </p>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
        Learning Roadmap
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#374151", marginBottom: "2rem" }}>
        Data Center Engineer banne ka step-by-step path — beginner se professional tak.
        Har section pe click karo aur apna journey start karo.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[
          { href: "/learn/non-it", label: "Step 1: Non-IT Infrastructure", desc: "Power, cooling, fire, security — physical data center fundamentals", icon: "⚡" },
          { href: "/learn/it", label: "Step 2: IT Infrastructure", desc: "Servers, networking, storage, cloud", icon: "🖥️" },
          { href: "/learn/ai", label: "Step 3: AI Infrastructure", desc: "GPU clusters, LLMs, AI hardware, AI data centers", icon: "🤖" },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            display: "block", padding: "1.25rem",
            border: "1px solid #e5e7eb", borderRadius: "10px",
            textDecoration: "none", background: "#fff"
          }}>
            <span style={{ fontSize: "1.3rem" }}>{item.icon} </span>
            <span style={{ fontWeight: 700, color: "#111827" }}>{item.label}</span>
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.9rem", color: "#6b7280" }}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
