import Link from "next/link";
import { ALL_TOPICS, getTopicUrl } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/ContinueLearning.tsx
//
// Server Component. This section ALWAYS renders — it never disappears.
// Phase 1 has no real reading-progress backend yet, so rather than hide
// the section entirely OR fake a progress percentage, it shows an honest
// empty/invitational state pointing to a real first published topic.
//
// Once real per-user progress data exists (a future phase), replace the
// `hasRealProgressData` check below with an actual data fetch — the
// section's always-visible contract stays the same either way.
// ═══════════════════════════════════════════════════════════════════════════

export default function ContinueLearning() {
  const hasRealProgressData = false; // Phase 1: no backend yet

  if (hasRealProgressData) {
    // Future phase: render the real "Continue Reading — 45%" card here
    // using actual per-user scroll-depth data.
    return null;
  }

  const firstTopic = ALL_TOPICS.filter((t) => t.status === "published").sort(
    (a, b) => a.order - b.order
  )[0];

  return (
    <section data-homepage-theme="light" aria-labelledby="continue-heading" className="hp-section">
      <div className="hp-container hp-container--medium">
        <h2 id="continue-heading" className="hp-h2 hp-h2--spaced">
          Continue learning
        </h2>

        <div className="hp-empty-state">
          <span aria-hidden="true" className="hp-empty-state-icon">
            📘
          </span>
          <div>
            <p className="hp-h3 hp-mb-xs">You haven&apos;t started a topic yet</p>
            <p className="hp-card-desc hp-mb-sm">
              Pick a topic to begin — your progress will show up here once you do.
            </p>
            {firstTopic && (
              <Link href={getTopicUrl(firstTopic)} className="hp-btn hp-btn--primary hp-btn--small">
                Start with {firstTopic.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
