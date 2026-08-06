import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";
import { getAllCalculators } from "@/lib/engineering/registry";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/StatsBar.tsx — Homepage V2 (new component)
//
// Dark closing stat bar, styled after the reference image. CRITICAL: every
// number here is computed from real registries at request time. The
// reference image's "10K+ Happy Learners" stat is NOT reproduced — no
// user/learner count exists anywhere in this project's data model, and
// fabricating one would violate the explicit "never fabricate statistics"
// rule. If a stat's real value is 0 or not derivable, it is omitted
// entirely rather than shown as a fake or rounded number.
// ═══════════════════════════════════════════════════════════════════════════

export default function StatsBar() {
  const totalTopics = ALL_TOPICS.length;
  const learningTracks = new Set(ALL_TOPICS.map((t) => t.track)).size;
  const tools = getAllCalculators().length;

  const stats = [
    { icon: "📚", value: `${totalTopics}`, label: "Learning Topics" },
    { icon: "🗂️", value: `${learningTracks}`, label: "Learning Tracks" },
    { icon: "🧮", value: `${tools}`, label: "Interactive Tools" },
  ].filter((s) => s.value !== "0");

  if (stats.length === 0) {
    return null;
  }

  return (
    <section data-homepage-theme="light" aria-labelledby="stats-heading" className="hp-section">
      <div className="hp-container">
        <h2 id="stats-heading" className="hp-sr-only">
          Platform statistics
        </h2>
        <div className="hp-stats-bar">
          <div className="hp-stats-row">
            {stats.map((s) => (
              <div key={s.label} className="hp-stat-item">
                <span aria-hidden="true" className="hp-stat-icon">
                  {s.icon}
                </span>
                <div>
                  <p className="hp-stat-value">{s.value}</p>
                  <p className="hp-stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hp-stats-cta">
            <div className="hp-stats-cta-text">
              <p>Start your journey today and</p>
              <p>become a data center expert.</p>
            </div>
            <Link href="/learn/non-it" className="hp-btn hp-btn--primary hp-btn--small hp-btn--inline">
              Start Learning →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
