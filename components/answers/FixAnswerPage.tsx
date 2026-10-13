import Link from "next/link";
import type { FixAnswer } from "@/content/answers/types";
import { FIX_ANSWERS } from "@/content/answers/fix";
import { TOPICS } from "@/lib/topics";
import TopicLink from "@/components/TopicLink";
import RelatedCalculators from "@/components/calculators/RelatedCalculators";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema, buildArticleSchema } from "@/lib/schemas";

// ═══════════════════════════════════════════════════════════════════════════
// components/answers/FixAnswerPage.tsx
//
// Renders one /answers/fix/[slug] page from a FixAnswer entry
// (content/answers/fix.ts). Server component, plain inline styles matching
// the tone already used by CalculatorGuide.tsx / TroubleshootingClient.tsx
// — no new design system, no new UI library.
// ═══════════════════════════════════════════════════════════════════════════

const SITE_URL = "https://behindthetech.in";

const wrap: React.CSSProperties = { maxWidth: "760px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" };
const kicker: React.CSSProperties = { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", margin: "0 0 0.5rem" };
const h1: React.CSSProperties = { fontSize: "1.9rem", fontWeight: 800, color: "#111827", lineHeight: 1.25, margin: "0 0 1rem" };
const directAnswerBox: React.CSSProperties = { border: "1px solid #BFDBFE", background: "#EFF6FF", borderRadius: "10px", padding: "1.1rem 1.3rem", margin: "0 0 1.5rem" };
const directAnswerText: React.CSSProperties = { fontSize: "1.02rem", lineHeight: 1.7, color: "#1E3A8A", margin: 0, fontWeight: 600 };
const safetyBox: React.CSSProperties = { border: "1px solid #FECACA", background: "#FEF2F2", borderRadius: "10px", padding: "1.1rem 1.3rem", margin: "0 0 1.75rem" };
const safetyLabel: React.CSSProperties = { fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#991B1B", margin: "0 0 0.4rem" };
const safetyText: React.CSSProperties = { fontSize: "0.92rem", lineHeight: 1.65, color: "#7F1D1D", margin: 0 };
const h2: React.CSSProperties = { fontSize: "1.25rem", fontWeight: 800, color: "#111827", margin: "2rem 0 0.75rem" };
const p: React.CSSProperties = { fontSize: "0.95rem", lineHeight: 1.75, color: "#374151", margin: "0 0 0.75rem" };
const ul: React.CSSProperties = { margin: "0 0 0.75rem", paddingLeft: "1.25rem" };
const li: React.CSSProperties = { ...p, margin: "0 0 0.4rem" };
const ol: React.CSSProperties = { margin: "0 0 0.75rem", paddingLeft: "1.4rem" };
const stepLi: React.CSSProperties = { ...p, margin: "0 0 0.55rem" };
const reviewLine: React.CSSProperties = { fontSize: "0.78rem", color: "#6B7280", margin: "0.5rem 0 0" };
const faqQ: React.CSSProperties = { fontSize: "0.98rem", fontWeight: 700, color: "#111827", margin: "0 0 0.3rem" };
const faqA: React.CSSProperties = { ...p, margin: "0 0 1.1rem" };
const relatedBox: React.CSSProperties = { marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E7EB" };
const relatedLink: React.CSSProperties = { color: "#1D4ED8", fontWeight: 700, textDecoration: "none" };

export default function FixAnswerPage({ answer }: { answer: FixAnswer }) {
  const topic = TOPICS[answer.relatedTopicSlug];
  const canonicalUrl = `${SITE_URL}/answers/fix/${answer.slug}`;

  const articleSchema = buildArticleSchema({
    headline: answer.title,
    description: answer.directAnswer,
    authorName: "Kumar Anil",
    canonicalUrl,
    datePublished: answer.reviewedAt,
    dateModified: answer.reviewedAt,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Answers", url: `${SITE_URL}/answers` },
    { name: answer.title, url: canonicalUrl },
  ]);

  const faqSchema = answer.faqs.length > 0 ? buildFaqSchema(answer.faqs) : null;

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh" }}>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div style={wrap}>
        <p style={kicker}>{answer.category} · Fix</p>
        <h1 style={h1}>{answer.title}</h1>

        <div style={directAnswerBox}>
          <p style={directAnswerText}>{answer.directAnswer}</p>
        </div>

        {answer.hazardous && answer.safetyNote && (
          <div style={safetyBox}>
            <p style={safetyLabel}>Safety first</p>
            <p style={safetyText}>{answer.safetyNote}</p>
          </div>
        )}

        <h2 style={h2}>Symptoms</h2>
        <ul style={ul}>
          {answer.symptoms.map((s) => (
            <li key={s} style={li}>{s}</li>
          ))}
        </ul>

        <h2 style={h2}>Likely causes</h2>
        <ul style={ul}>
          {answer.causes.map((c) => (
            <li key={c} style={li}>{c}</li>
          ))}
        </ul>

        <h2 style={h2}>Verify before you touch anything</h2>
        <ul style={ul}>
          {answer.verify.map((v) => (
            <li key={v} style={li}>{v}</li>
          ))}
        </ul>

        <h2 style={h2}>Steps</h2>
        <ol style={ol}>
          {answer.steps.map((s) => (
            <li key={s} style={stepLi}>{s}</li>
          ))}
        </ol>

        <h2 style={h2}>Why this happens</h2>
        <p style={p}>{answer.whyThisHappens}</p>

        <h2 style={h2}>Most likely root cause</h2>
        <p style={p}>{answer.rootCause}</p>

        <h2 style={h2}>Resolution</h2>
        <p style={p}>{answer.resolution}</p>

        <h2 style={h2}>A real example</h2>
        <p style={p}>{answer.siteExample}</p>

        <h2 style={h2}>Common mistakes</h2>
        <ul style={ul}>
          {answer.mistakes.map((m) => (
            <li key={m} style={li}>{m}</li>
          ))}
        </ul>

        <h2 style={h2}>Preventing it next time</h2>
        <ul style={ul}>
          {answer.prevention.map((pr) => (
            <li key={pr} style={li}>{pr}</li>
          ))}
        </ul>

        <h2 style={h2}>When to escalate</h2>
        <p style={p}>{answer.escalation}</p>

        <h2 style={h2}>Assumptions and limits of this page</h2>
        <ul style={ul}>
          {answer.assumptions.map((a) => (
            <li key={a} style={li}>{a}</li>
          ))}
        </ul>

        {answer.faqs.length > 0 && (
          <>
            <h2 style={h2}>FAQ</h2>
            {answer.faqs.map((f) => (
              <div key={f.question}>
                <p style={faqQ}>{f.question}</p>
                <p style={faqA}>{f.answer}</p>
              </div>
            ))}
          </>
        )}

        {topic && (
          <p style={p}>
            Read the full article: <TopicLink slug={answer.relatedTopicSlug} variant="inline" />
          </p>
        )}

        {answer.relatedAnswerSlugs.length > 0 && (
          <div style={relatedBox}>
            <h2 style={{ ...h2, margin: "0 0 0.75rem" }}>Related problems</h2>
            <ul style={ul}>
              {answer.relatedAnswerSlugs.map((slug) => {
                const related = FIX_ANSWERS[slug];
                if (!related) return null;
                return (
                  <li key={slug} style={li}>
                    <Link href={`/answers/fix/${slug}`} style={relatedLink}>
                      {related.title} →
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <p style={reviewLine}>Reviewed {answer.reviewedAt}.</p>

        {topic && <RelatedCalculators slug={answer.relatedTopicSlug} lang="en" />}
      </div>
    </main>
  );
}
