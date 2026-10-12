import Link from "next/link";
import { getTopicsByCategory, getTopicUrl, type Track, type TopicCategory } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/HubGuide.tsx
//
// Server component used by the category hub pages (/learn/<track>/<category>).
// Renders a short original introduction for the section plus an ordered list of
// the published articles with their one-line descriptions, taken from
// lib/topics.ts. Gives each hub real, crawlable text and a clear reading path.
// ═══════════════════════════════════════════════════════════════════════════

export default function HubGuide({
  track,
  category,
  intro,
}: {
  track: Track;
  category: TopicCategory;
  intro: string;
}) {
  const topics = getTopicsByCategory(track, category)
    .filter((t) => t.status === "published")
    .sort((a, b) => a.order - b.order);

  return (
    <section className="hp-section">
      <div className="hp-container hp-container--medium">
        <p className="hp-body" style={{ marginBottom: 20 }}>
          {intro}
        </p>
        {topics.length > 0 && (
          <>
            <h2 className="hp-h3" style={{ marginBottom: 12 }}>
              Recommended reading order
            </h2>
            <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
              {topics.map((t) => (
                <li key={t.slug} className="hp-body" style={{ marginBottom: 10 }}>
                  <Link href={getTopicUrl(t)} style={{ color: "var(--hp-accent)", fontWeight: 600, textDecoration: "none" }}>
                    {t.title}
                  </Link>{" "}
                  — {t.description}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
