import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn Data Center Infrastructure — Behind The Tech",
  description:
    "Behind The Tech pe seekho Data Center Infrastructure — Non-IT, IT, aur AI Infrastructure. Zero se Engineer tak ka complete learning path.",
};

const tracks = [
  {
    href: "/learn/ai",
    icon: "🤖",
    title: "AI Infrastructure",
    description: "GPU clusters, LLMs, TPUs, AI data centers aur AI hardware ka complete guide.",
  },
  {
    href: "/learn/non-it",
    icon: "⚡",
    title: "Non-IT Infrastructure",
    description: "Power, cooling, fire protection, security aur BMS/DCIM — data center ka physical backbone.",
  },
  {
    href: "/learn/it",
    icon: "🖥️",
    title: "IT Infrastructure",
    description: "Servers, networking, storage aur cloud — data center ka IT layer.",
  },
];

export default function LearnPage() {
  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.25rem" }}>
      <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
        Learn Data Center Infrastructure
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#374151", marginBottom: "2.5rem" }}>
        Zero se Engineer tak — Data Center ka har ek component samjho, Hinglish mein.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tracks.map(t => (
          <Link
            key={t.href}
            href={t.href}
            style={{
              display: "block",
              padding: "1.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              textDecoration: "none",
              background: "#fff",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{t.icon}</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>{t.title}</div>
            <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>{t.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
