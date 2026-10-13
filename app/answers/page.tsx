import type { Metadata } from "next";
import Link from "next/link";
import { buildSocialMeta } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schemas";
import { FIX_ANSWERS, FIX_ANSWER_SLUGS } from "@/content/answers/fix";

// ═══════════════════════════════════════════════════════════════════════════
// app/answers/page.tsx — /answers hub
//
// Lists the Fix answer pages, grouped by category. Plain server component,
// same inline-style convention as app/tools/page.tsx.
// ═══════════════════════════════════════════════════════════════════════════

const SITE_URL = "https://behindthetech.in";
const TITLE = "Answers — Fix a Data Center Problem Fast | Behind The Tech";
const DESCRIPTION =
  "Direct answers to real data center field problems: UPS bypass, DG fail-to-start, CRAC faults, VLAN issues, server POST failures and VESDA alarms — with causes, verified steps and when to escalate.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/answers` },
  ...buildSocialMeta({ title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/answers` }),
};

const wrap: React.CSSProperties = { maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" };
const h1: React.CSSProperties = { fontSize: "2rem", fontWeight: 800, color: "#111827", margin: "0 0 0.75rem" };
const intro: React.CSSProperties = { fontSize: "1rem", lineHeight: 1.7, color: "#374151", margin: "0 0 2rem", maxWidth: "640px" };
const card: React.CSSProperties = { display: "block", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "1.1rem 1.3rem", marginBottom: "0.9rem", textDecoration: "none" };
const cardKicker: React.CSSProperties = { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B7280", margin: "0 0 0.3rem" };
const cardTitle: React.CSSProperties = { fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: "0 0 0.3rem" };
const cardAnswer: React.CSSProperties = { fontSize: "0.9rem", lineHeight: 1.6, color: "#4B5563", margin: 0 };

export default function AnswersHubPage() {
  const answers = FIX_ANSWER_SLUGS.map((s) => FIX_ANSWERS[s]);

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh" }}>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Answers", url: `${SITE_URL}/answers` },
        ])}
      />
      <div style={wrap}>
        <h1 style={h1}>Fix a Data Center Problem</h1>
        <p style={intro}>
          Real field problems, answered directly: what it means, the likely causes, verified diagnostic
          steps, and exactly when to stop and escalate. Each page is built from Behind The Tech's own
          troubleshooting guides — read the full topic article for the complete picture, or use a Fix page
          when you need the answer right now.
        </p>

        {answers.map((a) => (
          <Link key={a.slug} href={`/answers/fix/${a.slug}`} style={card}>
            <p style={cardKicker}>{a.category}</p>
            <p style={cardTitle}>{a.title}</p>
            <p style={cardAnswer}>{a.directAnswer}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
