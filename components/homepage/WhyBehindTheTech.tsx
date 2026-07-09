// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/WhyBehindTheTech.tsx — Homepage V2
//
// Visual style upgraded to colored rounded-square icon backgrounds
// matching the reference. Content unchanged from the prior approved pass.
// ═══════════════════════════════════════════════════════════════════════════

const REASONS = [
  {
    icon: "💬",
    iconClass: "hp-reason-icon--blue",
    title: "Simple Language",
    description: "Complex topics explained in the easiest way.",
  },
  {
    icon: "🛠️",
    iconClass: "hp-reason-icon--green",
    title: "Practical Approach",
    description: "Real-world examples, diagrams and best practices.",
  },
  {
    icon: "⚙️",
    iconClass: "hp-reason-icon--orange",
    title: "Interactive Learning",
    description: "Calculators, diagrams and tools for better understanding.",
  },
  {
    icon: "🔄",
    iconClass: "hp-reason-icon--purple",
    title: "Always Updated",
    description: "Regularly updated content with the latest industry knowledge.",
  },
];

export default function WhyBehindTheTech() {
  return (
    <section data-homepage-theme="light" aria-labelledby="why-heading" className="hp-section">
      <div className="hp-container">
        <h2 id="why-heading" className="hp-h2 hp-h2--spaced">
          Why Behind The Tech?
        </h2>

        <ul className="hp-grid hp-grid--wide">
          {REASONS.map((r) => (
            <li key={r.title} className="hp-card">
              <span aria-hidden="true" className={`hp-reason-icon ${r.iconClass}`}>
                {r.icon}
              </span>
              <h3 className="hp-h3">{r.title}</h3>
              <p className="hp-card-desc">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
