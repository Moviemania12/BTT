import Link from "next/link";
import { getAllCalculators } from "@/lib/engineering/registry";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/EngineeringTools.tsx
//
// Server Component. Every card is generated from getAllCalculators() — no
// calculator is redefined here. Each card now has an explicit "Open tool"
// button (not just a text link), styled with the shared hp-btn classes.
// ═══════════════════════════════════════════════════════════════════════════

export default function EngineeringTools() {
  const calculators = getAllCalculators();

  if (calculators.length === 0) {
    return null;
  }

  return (
    <section data-homepage-theme="light" aria-labelledby="tools-heading" className="hp-section hp-section--subtle">
      <div className="hp-container">
        <div className="hp-section-header">
          <h2 id="tools-heading" className="hp-h2">
            Engineering tools
          </h2>
          <Link href="/tools" className="hp-link">
            View all →
          </Link>
        </div>

        <ul className="hp-grid hp-grid--tools">
          {calculators.map((calc) => (
            <li key={calc.id} className="hp-card">
              <h3 className="hp-h3">{calc.title}</h3>
              <p className="hp-card-desc hp-clamp-2">{calc.description}</p>
              <Link href={calc.route} className="hp-btn hp-btn--secondary hp-btn--small">
                Open tool →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
