import Image from "next/image";
import Link from "next/link";
import { PRODUCT, SCREENS } from "@/lib/bttEmployeeManager";
import { TodayScreen } from "./PhoneScreens";
import "./bem.css";

// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/ProductShowcase.tsx
//
// Homepage flagship section for BTT Employee Manager. Server Component.
// Desktop window shows a real screen of the Windows app (demo data); the
// phone is an HTML preview of the Android app's Today screen.
// ═══════════════════════════════════════════════════════════════════════════

const HIGHLIGHTS = [
  { title: "Roster generation", text: "Role-wise requirements, eligibility, weekly offs and rest rules." },
  { title: "Coverage & shortage", text: "Required vs assigned for every role, shift and day." },
  { title: "Attendance & DHR", text: "Planned vs actual, verified and locked daily." },
  { title: "Employee app", text: "Own roster, face + GPS attendance, shift-change requests." },
];

export default function ProductShowcase({ variant = "home" }: { variant?: "home" | "page" }) {
  const Heading = variant === "page" ? "h1" : "h2";
  const hero = SCREENS.find((s) => s.id === "monthly-roster") ?? SCREENS[0];

  return (
    <section
      data-homepage-theme="light"
      aria-labelledby="bem-home-heading"
      className="bem-root bem-flagship"
    >
      <div className="bem-container">
        <div className="bem-hero-grid">
          <div>
            <span className="bem-badge">
              <span className="bem-badge-dot" aria-hidden="true" />
              BTT EMPLOYEE MANAGER
            </span>
            <p className="bem-kicker">{PRODUCT.tagline}</p>
            <Heading id="bem-home-heading" className="bem-h1">
              From Roster Planning to Attendance — <em>One Complete Employee Management System.</em>
            </Heading>
            <p className="bem-lead">{PRODUCT.summary}</p>

            <div className="bem-cta-row">
              <Link href={PRODUCT.demoRoute} className="bem-btn bem-btn--primary">
                Start 3-Day Demo
              </Link>
              <Link href={variant === "page" ? "#tour" : `${PRODUCT.route}#tour`} className="bem-btn bem-btn--ghost">
                <span aria-hidden="true">▶</span> Watch Product Tour
              </Link>
            </div>

            <ul className="bem-facts" aria-label="Product facts">
              <li>Windows desktop app</li>
              <li>Android employee app</li>
              <li>Multi-site</li>
              <li>3-day demo · unlimited employees</li>
            </ul>
          </div>

          <div className="bem-stage">
            <div className="bem-window">
              <div className="bem-window-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="bem-window-title">BTT Employee Manager — {hero.title}</span>
              </div>
              <Image
                src={hero.src}
                alt={`BTT Employee Manager ${hero.title} screen: ${hero.caption}`}
                width={1480}
                height={900}
                sizes="(max-width: 1024px) 100vw, 640px"
                priority={false}
              />
            </div>
            <div className="bem-stage-phone">
              <TodayScreen />
            </div>
            <div className="bem-stage-chip" aria-hidden="true">
              <span className="bem-ok">✓</span>
              <span>
                <b>Attendance verified</b>
                Face + GPS · inside site radius
              </span>
            </div>
          </div>
        </div>

        <ul className="bem-strip" aria-label="What it covers">
          {HIGHLIGHTS.map((h) => (
            <li key={h.title}>
              <b>{h.title}</b>
              {h.text}
            </li>
          ))}
        </ul>

        {variant === "home" && (
        <p style={{ marginTop: 22 }}>
          <Link href={PRODUCT.route} className="bem-btn bem-btn--ghost" style={{ padding: "10px 18px", fontSize: 14 }}>
            Explore BTT Employee Manager →
          </Link>
        </p>
        )}
      </div>
    </section>
  );
}
