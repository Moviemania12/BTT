// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/LearningRoadmapSimple.tsx
//
// Visual-design revision: connected horizontal timeline (hp-timeline-*
// classes) instead of a flat inline step list. Same data, same real DC
// learning order — Beginner → Electrical → Cooling → Fire → Monitoring →
// Security → Networking → Servers → Cloud → AI Infrastructure. No progress
// data exists yet, so every step still renders as "upcoming" — no fake
// completion state.
// ═══════════════════════════════════════════════════════════════════════════

const ROADMAP_STEPS = [
  "Beginner",
  "Electrical",
  "Cooling",
  "Fire",
  "Monitoring",
  "Security",
  "Networking",
  "Servers",
  "Cloud",
  "AI Infrastructure",
];

export default function LearningRoadmapSimple() {
  return (
    <section data-homepage-theme="light" aria-labelledby="roadmap-heading" className="hp-section hp-section--subtle">
      <div className="hp-container">
        <h2 id="roadmap-heading" className="hp-h2 hp-h2--spaced hp-h2--center">
          Your learning roadmap
        </h2>

        <ol className="hp-timeline" aria-label="Data center learning roadmap, in order">
          {ROADMAP_STEPS.map((step, i) => (
            <li key={step} className="hp-timeline-step">
              <div className="hp-timeline-card">
                <span className="hp-timeline-dot" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="hp-timeline-label">{step}</span>
              </div>
              {i < ROADMAP_STEPS.length - 1 && <span className="hp-timeline-connector" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
