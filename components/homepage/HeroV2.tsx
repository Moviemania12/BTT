import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";
import HeroIllustration from "./HeroIllustration";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/HeroV2.tsx — Homepage V2
//
// Visual proportions match the approved reference (large 3-line headline,
// two-column grid, illustration right). No fabricated numbers anywhere —
// the "learners" line from the reference is omitted entirely since no
// real user/learner count exists in this project. Only the real published
// topic count remains, as it did in V1.
// ═══════════════════════════════════════════════════════════════════════════

export default function HeroV2() {
  const publishedTopicCount = ALL_TOPICS.filter((t) => t.status === "published").length;

  return (
    <section data-homepage-theme="light" aria-labelledby="hero-heading" className="hp-section hp-section--hero-compact">
      <div className="hp-container">
        <div className="hp-hero-grid hp-hero-grid--v2">
          <div>
            <h1 id="hero-heading" className="hp-h1 hp-h1--left hp-h1--xl">
              Understand every system.
              <br />
              Master every layer.
            </h1>

            <p className="hp-body hp-body--left">
              Practical, engineer-authored guides to data center infrastructure —
              from grid power to server rack, explained the way it actually works.
            </p>

            <nav aria-label="Primary actions" className="hp-cta-row hp-cta-row--left">
              <Link href="/learn" className="hp-btn hp-btn--primary hp-btn--icon">
                <span aria-hidden="true">🎓</span> Start learning
              </Link>
              <Link href="/learn" className="hp-btn hp-btn--secondary hp-btn--icon">
                <span aria-hidden="true">📖</span> Explore Topics
              </Link>
            </nav>

            {publishedTopicCount > 0 && (
              <p className="hp-meta hp-meta--left">
                {publishedTopicCount} published topics and growing
              </p>
            )}
          </div>

          <div className="hp-hero-illustration-col">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
