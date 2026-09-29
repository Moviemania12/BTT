import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildSocialMeta, buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import { TOPICS, getTopicUrl } from "@/lib/topics";

const TITLE = "Learn Data Center Infrastructure — Behind The Tech";
const DESCRIPTION =
  "Learn data center infrastructure step by step — Non-IT (power, cooling, fire, security), IT (servers, storage, networking, cloud) and AI infrastructure, from beginner to engineer level.";
const PAGE_URL = "https://behindthetech.in/learn";

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  title: TITLE,
  description: DESCRIPTION,
  ...buildSocialMeta({ title: TITLE, description: DESCRIPTION, url: PAGE_URL }),
};

const tracks = [
  {
    href: "/learn/non-it",
    icon: "⚡",
    title: "Non-IT Infrastructure",
    description: "Power, cooling, fire protection, security and BMS/DCIM — the physical backbone of a data center.",
  },
  {
    href: "/learn/it",
    icon: "🖥️",
    title: "IT Infrastructure",
    description: "Servers, storage, networking and cloud — the IT layer inside the data center.",
  },
  {
    href: "/learn/ai",
    icon: "🤖",
    title: "AI Infrastructure",
    description: "GPU clusters, LLMs, TPUs, AI data centers and AI hardware.",
  },
];

// Foundation articles — titles, descriptions and URLs come from lib/topics.ts.
const START_HERE = [
  "what-is-a-data-center",
  "data-center-types",
  "how-the-internet-works",
  "cloud-vs-data-center",
  "ai-infrastructure-basics",
];

const PRACTICE = [
  { href: "/learn/roadmap", title: "Learning Roadmap", description: "The step-by-step path from beginner to data center professional." },
  { href: "/tools", title: "Engineering Calculators", description: "UPS, battery, cooling, PUE, RCI and unit-conversion calculators." },
  { href: "/study/interview", title: "Interview Questions", description: "Data center interview questions with answers." },
  { href: "/study/troubleshooting", title: "Troubleshooting Guides", description: "Step-by-step guides for common data center faults." },
  { href: "/study/checklists", title: "Operations Checklists", description: "Daily, weekly and monthly data center operations checklists." },
  { href: "/study/case-studies", title: "Incident Case Studies", description: "Data center incident case studies with timelines and lessons learned." },
  { href: "/reference/glossary", title: "Glossary", description: "Data center terms explained with practical meaning." },
  { href: "/reference/standards", title: "Standards Reference", description: "What the major data center standards require and how they are applied." },
  { href: "/reference/downloads", title: "Templates and Downloads", description: "Engineering templates and forms for data center operations." },
];

const cardStyle = {
  display: "block",
  padding: "1.25rem 1.5rem",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  textDecoration: "none",
  background: "#fff",
} as const;

const h2Style = { fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: "2.5rem 0 1rem" } as const;

export default function LearnPage() {
  const startHere = START_HERE.map((slug) => TOPICS[slug]).filter((t) => t && t.status === "published");

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.25rem" }}>
      <JsonLd data={buildCollectionPageSchema({ name: "Learn Data Center Infrastructure", description: DESCRIPTION, url: PAGE_URL })} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "https://behindthetech.in" },
          { name: "Learn", url: PAGE_URL },
        ])}
      />
      <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#111827", marginBottom: "0.75rem" }}>
        Learn Data Center Infrastructure
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#374151", marginBottom: "2.5rem" }}>
        From zero to engineer — understand every part of a data center, one topic at a time. Pick a
        track below, or begin with the foundation articles.
      </p>

      <h2 style={{ ...h2Style, marginTop: 0 }}>Choose a track</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tracks.map((t) => (
          <Link key={t.href} href={t.href} style={{ ...cardStyle, padding: "1.5rem" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{t.icon}</div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827", marginBottom: "0.3rem" }}>{t.title}</div>
            <div style={{ fontSize: "0.95rem", color: "#6b7280" }}>{t.description}</div>
          </Link>
        ))}
      </div>

      <h2 style={h2Style}>Start here</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {startHere.map((t) => (
          <Link key={t.slug} href={getTopicUrl(t)} style={cardStyle}>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>{t.title}</div>
            <div style={{ fontSize: "0.92rem", color: "#6b7280" }}>{t.description}</div>
          </Link>
        ))}
      </div>

      <h2 style={h2Style}>Practice and reference</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
        {PRACTICE.map((p) => (
          <Link key={p.href} href={p.href} style={cardStyle}>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>{p.title}</div>
            <div style={{ fontSize: "0.88rem", color: "#6b7280" }}>{p.description}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
