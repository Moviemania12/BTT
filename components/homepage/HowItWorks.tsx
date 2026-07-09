// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/HowItWorks.tsx — Homepage V2 (new component)
//
// New section, added alongside the existing LearningRoadmapSimple timeline
// per explicit instruction to keep both. Server Component, no data
// dependency — purely presentational process explainer, distinct from the
// subject-matter roadmap (this describes the interaction flow: choose,
// read, explore, use — not the DC-learning subject sequence).
// ═══════════════════════════════════════════════════════════════════════════

const STEPS = [
  { icon: "📖", iconClass: "hp-reason-icon--blue", title: "1. Choose Topic", description: "Select any topic you want to learn." },
  { icon: "📘", iconClass: "hp-reason-icon--green", title: "2. Read & Understand", description: "Learn with simple explanations and diagrams." },
  { icon: "📍", iconClass: "hp-reason-icon--orange", title: "3. Explore Topics", description: "See how components connect in a real data center." },
  { icon: "🧮", iconClass: "hp-reason-icon--purple", title: "4. Use Tools", description: "Try calculators and tools to apply your knowledge." },
];

export default function HowItWorks() {
  return (
    <section data-homepage-theme="light" aria-labelledby="how-it-works-heading" className="hp-section hp-section--subtle">
      <div className="hp-container">
        <h2 id="how-it-works-heading" className="hp-h2 hp-h2--spaced">
          How It Works
        </h2>

        <div className="hp-steps-row">
          {STEPS.map((step, i) => (
            <div key={step.title} className="hp-timeline-step">
              <div className="hp-step-card">
                <span aria-hidden="true" className={`hp-step-icon ${step.iconClass}`}>
                  {step.icon}
                </span>
                <div>
                  <h3 className="hp-step-title">{step.title}</h3>
                  <p className="hp-step-desc">{step.description}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hp-step-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
