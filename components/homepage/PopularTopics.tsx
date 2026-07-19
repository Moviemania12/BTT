import Link from "next/link";
import { ALL_TOPICS, getTopicUrl } from "@/lib/topics";
import type { Topic } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/PopularTopics.tsx
//
// "Explore by category" section on the homepage.
//
// Each category card shows up to 4 topic chips (from ALL_TOPICS, sorted
// by `order`). A chip is a clickable link when status === "published",
// or a disabled "Coming soon" chip otherwise. No route is ever invented.
//
// "View all" links to the track landing page + anchor for the category:
//   non-it categories → /learn/non-it#cat-<category>
//   it categories     → /learn/it#cat-<category>
//   ai categories     → /learn/ai#cat-<category>
// The anchor IDs are set on the CategoryCard divs in each landing page.
// ═══════════════════════════════════════════════════════════════════════════

interface CategoryDef {
  category: string;
  icon: string;
  title: string;
  description: string;
  /** Track landing page base path — determines the "View all" href. */
  trackBase: string;
}

const CATEGORIES: CategoryDef[] = [
  { category: "electrical", icon: "⚡",  title: "Electrical",      description: "Power delivery — from grid supply to server rack.",                               trackBase: "/learn/non-it" },
  { category: "cooling",    icon: "❄️",  title: "Cooling",         description: "Thermal management systems that keep hardware within spec.",                      trackBase: "/learn/non-it" },
  { category: "fire",       icon: "🔥",  title: "Fire Protection", description: "Detection and suppression systems for life-safety and asset protection.",          trackBase: "/learn/non-it" },
  { category: "security",   icon: "🔒",  title: "Security",        description: "Physical access control and surveillance systems.",                                 trackBase: "/learn/non-it" },
  { category: "bms-dcim",   icon: "📡",  title: "Monitoring",      description: "Building and infrastructure management platforms.",                                 trackBase: "/learn/non-it" },
  { category: "servers",    icon: "🖥️",  title: "Servers",         description: "Compute hardware — CPU, RAM, GPU, and server architecture.",                       trackBase: "/learn/it"     },
  { category: "storage",    icon: "💾",  title: "Storage",         description: "Data storage systems — from direct-attached to storage networks.",                  trackBase: "/learn/it"     },
  { category: "networking", icon: "🌐",  title: "Networking",      description: "Switching, routing, and network infrastructure.",                                   trackBase: "/learn/it"     },
];

const MAX_CHIPS = 4;

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

            // "View all" scrolls to the matching category card on the track landing page.
            const viewAllHref = `${cat.trackBase}#cat-${cat.category}`;

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
                  <Link href={viewAllHref} className="hp-link">
                    View all →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
