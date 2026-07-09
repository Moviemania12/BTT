import Link from "next/link";
import { ALL_TOPICS, getTopicUrl } from "@/lib/topics";
import type { Topic } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/PopularTopics.tsx
//
// Evolved into a stable, category-based roadmap view (previously a flat
// grid of published articles, which would have grown unbounded past 200+
// articles). Component file name and homepage slot are unchanged, per
// "evolve, do not duplicate" — this is still the same component the rest
// of the codebase imports as PopularTopics.
//
// Each category shows up to 4 real topic chips (ALL_TOPICS only, sorted
// by `order`). A chip is a clickable link if status === "published", or
// a disabled "Coming soon" chip otherwise. No route or content is ever
// invented.
//
// "View All" is intentionally NOT rendered as a link. A bare category-index
// route (e.g. /learn/non-it/electrical with no topic slug) was checked
// against the real routing and does not exist — only the dynamic
// [category]/[topic] route does, which requires a topic slug. Rendering
// a link to a route that 404s would violate the "no broken links" rule,
// so View All renders as a disabled label until that route is built.
// ═══════════════════════════════════════════════════════════════════════════

interface CategoryDef {
  category: string;
  icon: string;
  title: string;
  description: string;
}

const CATEGORIES: CategoryDef[] = [
  { category: "electrical", icon: "⚡", title: "Electrical", description: "Power delivery — from grid supply to server rack." },
  { category: "cooling", icon: "❄️", title: "Cooling", description: "Thermal management systems that keep hardware within spec." },
  { category: "fire", icon: "🔥", title: "Fire Protection", description: "Detection and suppression systems for life-safety and asset protection." },
  { category: "security", icon: "🔒", title: "Security", description: "Physical access control and surveillance systems." },
  { category: "bms-dcim", icon: "📡", title: "Monitoring", description: "Building and infrastructure management platforms." },
  { category: "servers", icon: "🖥️", title: "Servers", description: "Compute hardware — CPU, RAM, GPU, and server architecture." },
  { category: "storage", icon: "💾", title: "Storage", description: "Data storage systems — from direct-attached to storage networks." },
  { category: "networking", icon: "🌐", title: "Networking", description: "Switching, routing, and network infrastructure." },
];

const MAX_CHIPS = 4;

// Set to true only once a real /learn/non-it/[category] index page exists.
// Checked against the current routing (only [category]/[topic] exists,
// which requires a topic slug) — false today, so View All stays disabled
// rather than link to a route that would 404.
const CATEGORY_INDEX_ROUTE_EXISTS = false;

export default function PopularTopics() {
  return (
    <section data-homepage-theme="light" aria-labelledby="category-roadmap-heading" className="hp-section">
      <div className="hp-container">
        <h2 id="category-roadmap-heading" className="hp-h2 hp-h2--spaced">
          Explore by category
        </h2>

        <div className="hp-grid hp-grid--wide">
          {CATEGORIES.map((cat) => {
            const topics: Topic[] = ALL_TOPICS.filter((t) => t.category === cat.category)
              .sort((a, b) => a.order - b.order)
              .slice(0, MAX_CHIPS);

            if (topics.length === 0) {
              return null;
            }

            return (
              <div key={cat.category} className="hp-category-card hp-category-card--v2">
                <div className="hp-category-header">
                  <span aria-hidden="true" className="hp-category-icon">
                    {cat.icon}
                  </span>
                  <h3 className="hp-category-title">{cat.title}</h3>
                </div>
                <p className="hp-category-desc">{cat.description}</p>

                <ul className="hp-chip-row" aria-label={`${cat.title} topics`}>
                  {topics.map((topic) =>
                    topic.status === "published" ? (
                      <li key={topic.slug}>
                        <Link href={getTopicUrl(topic)} className="hp-chip hp-chip--published">
                          {topic.title}
                        </Link>
                      </li>
                    ) : (
                      <li key={topic.slug}>
                        <span className="hp-chip hp-chip--coming-soon" aria-label={`${topic.title} — coming soon`}>
                          {topic.title}
                        </span>
                      </li>
                    )
                  )}
                </ul>

                <div className="hp-category-footer">
                  {CATEGORY_INDEX_ROUTE_EXISTS ? (
                    <Link href={`/learn/non-it/${cat.category}`} className="hp-link">
                      View all →
                    </Link>
                  ) : (
                    <span className="hp-link hp-link--disabled" aria-disabled="true">
                      View all (coming soon)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
