import Image from "next/image";
import Link from "next/link";
import { PRODUCT } from "@/lib/bttEmployeeManager";
import { TodayScreen } from "./PhoneScreens";
import "./bem.css";
import "./featured.css";

// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/FeaturedProduct.tsx
//
// Homepage "Featured Product" section — BTT stays the main site; this is one
// light, BTT-styled introduction to BTT Employee Manager. Server Component.
//
// Laptop screen: real Windows-app screenshot (demo database, names
// anonymised) — the generated Monthly Roster. Phone: HTML preview of the Android app's Today screen (the
// app blocks screenshots). Floating chips only state things the product does;
// "40 Active Employees" is the active headcount of that demo database.
// ═══════════════════════════════════════════════════════════════════════════

const HIGHLIGHTS = [
  "Employee & Staff Management",
  "Roster & Shift Management",
  "Attendance & Leave",
  "Reports & Multi-Site Support",
];

export default function FeaturedProduct() {
  return (
    <section data-homepage-theme="light" aria-labelledby="fp-heading" className="hp-section fp-section">
      <span className="fp-ring fp-ring--a" aria-hidden="true" />
      <span className="fp-ring fp-ring--b" aria-hidden="true" />

      <div className="hp-container">
        <div className="fp-grid">
          {/* ── Left: product information ── */}
          <div>
            <p className="fp-eyebrow">Featured Product</p>
            <p className="fp-product">BTT EMPLOYEE MANAGER</p>
            <h2 id="fp-heading" className="fp-title">
              Employee, Roster &amp; Attendance Management — Simplified.
            </h2>
            <p className="fp-desc">
              Manage employees, plan rosters, track attendance, handle leave and shift changes, and
              monitor workforce operations from one platform.
            </p>
            <p className="fp-for">
              Built for teams managing shift-based employees, operations and workforce attendance.
            </p>

            <div className="fp-cta">
              <Link href={PRODUCT.route} className="hp-btn hp-btn--primary">
                Explore BTT Employee Manager
              </Link>
              <Link href={PRODUCT.demoRoute} className="hp-btn hp-btn--secondary">
                Start 3-Day Demo
              </Link>
            </div>

            <ul className="fp-list" aria-label="Key capabilities">
              {HIGHLIGHTS.map((h) => (
                <li key={h}>
                  <span className="fp-check" aria-hidden="true">
                    ✓
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: 3D product visual ── */}
          <div className="fp-stage">
            <div className="fp-laptop">
              <div className="fp-lid">
                <span className="fp-cam" aria-hidden="true" />
                <div className="fp-screen">
                  <Image
                    src="/images/btt-employee-manager/monthly-roster.webp"
                    alt="BTT Employee Manager Windows software — generated Monthly Roster with shifts, weekly offs and role-wise requirements"
                    width={1480}
                    height={900}
                    sizes="(max-width: 700px) 100vw, 620px"
                  />
                </div>
              </div>
              <div className="fp-base" aria-hidden="true" />
            </div>

            <div className="fp-phone">
              <TodayScreen />
            </div>

            <div className="fp-chip fp-chip--roster" aria-hidden="true">
              <span className="fp-chip-icon">▦</span>
              <span>
                Roster Generated
                <small>Monthly · rule-based</small>
              </span>
            </div>
            <div className="fp-chip fp-chip--emp" aria-hidden="true">
              <span className="fp-chip-icon">👥</span>
              <span>
                40 Active Employees
                <small>Demo data</small>
              </span>
            </div>
            <div className="fp-chip fp-chip--att" aria-hidden="true">
              <span className="fp-chip-icon fp-chip-icon--green">✓</span>
              <span>
                Attendance Verified
                <small>Face + GPS</small>
              </span>
            </div>
            <div className="fp-chip fp-chip--site" aria-hidden="true">
              <span className="fp-chip-icon">⌂</span>
              <span>Multi-Site</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
