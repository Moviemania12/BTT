import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildSocialMeta, buildCollectionPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import Link from "next/link";
import { getTopicsByCategory, getTopicUrl } from "@/lib/topics";

const TITLE = "Cooling Systems — Behind The Tech";
const DESCRIPTION =
  "PAC, CRAC, chillers, cooling towers, containment, airflow management and RCI — data center thermal management.";
const PAGE_URL = "https://behindthetech.in/learn/non-it/cooling";

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  title: TITLE,
  description: DESCRIPTION,
  ...buildSocialMeta({ title: TITLE, description: DESCRIPTION, url: PAGE_URL }),
};

export default function CategoryPage() {
  const topics = getTopicsByCategory("non-it", "cooling");
  const published = topics.filter((t) => t.status === "published");
  const coming    = topics.filter((t) => t.status !== "published");

  return (
    <div data-homepage-theme="light" className="hp-page-root">
      <JsonLd
        data={buildCollectionPageSchema({ name: "Cooling Systems", description: DESCRIPTION, url: PAGE_URL })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: "https://behindthetech.in" },
          { name: "Learn", url: "https://behindthetech.in/learn" },
          { name: "Non-IT Infrastructure", url: "https://behindthetech.in/learn/non-it" },
          { name: "Cooling Systems", url: PAGE_URL },
        ])}
      />
      <section className="hp-section hp-section--hero">
        <div className="hp-container hp-container--medium" style={{ textAlign: "center" }}>
          <p
            className="hp-text-sm hp-text-muted"
            style={{ marginBottom: 12, fontFamily: "var(--hp-font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11 }}
          >
            <Link href="/learn" style={{ color: "var(--hp-accent)", textDecoration: "none" }}>Learn</Link>
            {" / "}
            <Link href="/learn/non-it" style={{ color: "var(--hp-accent)", textDecoration: "none" }}>
              Non-IT Infrastructure
            </Link>
          </p>
          <h1
            className="hp-h2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: 16 }}
          >
            ❄️ Cooling Systems
          </h1>
          <p className="hp-body" style={{ margin: "0 auto 20px" }}>
            {DESCRIPTION}
          </p>
        </div>
      </section>

      {published.length > 0 && (
        <section className="hp-section hp-section--subtle">
          <div className="hp-container">
            <h2
              className="hp-h3"
              style={{ marginBottom: 16 }}
            >
              Available Now
            </h2>
            <ul className="hp-chip-row" style={{ marginBottom: 0 }}>
              {published.map((t) => (
                <li key={t.slug}>
                  <Link href={getTopicUrl(t)} className="hp-chip hp-chip--published">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {coming.length > 0 && (
        <section className="hp-section">
          <div className="hp-container">
            <h2
              className="hp-h3"
              style={{ marginBottom: 16 }}
            >
              Coming Soon
            </h2>
            <ul className="hp-chip-row">
              {coming.map((t) => (
                <li key={t.slug}>
                  <span className="hp-chip hp-chip--coming-soon">
                    {t.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="hp-section">
        <div className="hp-container">
          <h2 className="hp-h3" style={{ marginBottom: 16 }}>
            Related calculators
          </h2>
          <ul className="hp-chip-row">
              <li>
                <Link href="/tools/cooling-calculator" className="hp-chip hp-chip--published">
                  Cooling Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/rci-calculator" className="hp-chip hp-chip--published">
                  RCI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/pue-calculator" className="hp-chip hp-chip--published">
                  PUE Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/unit-converter" className="hp-chip hp-chip--published">
                  Unit Converter
                </Link>
              </li>
          </ul>
        </div>
      </section>

      <section className="hp-section">
        <div className="hp-container" style={{ textAlign: "center" }}>
          <Link
            href="/learn/non-it"
            style={{
              fontFamily: "var(--hp-font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--hp-accent)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            ← Back to Non-IT Infrastructure
          </Link>
        </div>
      </section>
    </div>
  );
}
