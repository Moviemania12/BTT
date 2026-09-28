import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import DownloadCards from "@/components/btt-employee-manager/DownloadCards";
import ProductShowcase from "@/components/btt-employee-manager/ProductShowcase";
import ScreenshotGallery from "@/components/btt-employee-manager/ScreenshotGallery";
import {
  AttendanceScreen,
  RosterScreen,
  ShiftChangeScreen,
  TodayScreen,
} from "@/components/btt-employee-manager/PhoneScreens";
import { AUDIENCE, FAQ, FEATURES, PRODUCT, PROBLEMS, SCREENS, STEPS } from "@/lib/bttEmployeeManager";
import "@/components/btt-employee-manager/bem.css";

// ═══════════════════════════════════════════════════════════════════════════
// app/products/btt-employee-manager/page.tsx — flagship product page.
// All copy comes from lib/bttEmployeeManager.ts (features that exist only).
// ═══════════════════════════════════════════════════════════════════════════

const TITLE = "BTT Employee Manager — Roster, Attendance & Employee Management Software";
const DESCRIPTION =
  "Constraint-based roster generation, employee master, shift rotation, leave, daily deployment & coverage, attendance and shift-change requests — Windows software with an Android employee app. Try the 3-day demo with unlimited employees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PRODUCT.route },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PRODUCT.route,
    type: "website",
    images: [{ url: "/images/btt-employee-manager/monthly-roster.webp", width: 1480, height: 900, alt: "BTT Employee Manager — Monthly Roster screen" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const GROUP_LABEL = { plan: "Plan", run: "Run", control: "Control", mobile: "Mobile" } as const;

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT.name,
    description: DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, Android",
    url: `https://www.behindthetech.in${PRODUCT.route}`,
    screenshot: SCREENS.slice(0, 4).map((s) => `https://www.behindthetech.in${s.src}`),
    publisher: { "@type": "Organization", name: "Behind The Tech", url: "https://www.behindthetech.in" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "3-day demo with unlimited employees",
      url: `https://www.behindthetech.in${PRODUCT.demoRoute}`,
    },
  };
}

export default function BttEmployeeManagerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <main className="bem-root" data-homepage-theme="light" style={{ paddingTop: 64 }}>
        <ProductShowcase variant="page" />

        {/* ── Problem → Solution ── */}
        <section className="bem-section" aria-labelledby="bem-problem">
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">The problem</p>
              <h2 id="bem-problem" className="bem-h2">Still managing manpower through Excel and WhatsApp?</h2>
              <p className="bem-sub">
                Shift-based teams run 24×7. When the roster, leave and attendance live in different
                sheets and chats, coverage gaps show up only after they have happened.
              </p>
            </div>
            <div className="bem-ps">
              <div className="bem-ps-card bem-ps-card--bad">
                <h3>Today</h3>
                <ul className="bem-ps-list">
                  {PROBLEMS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bem-ps-card bem-ps-card--good">
                <h3>BTT Employee Manager solves this in one system.</h3>
                <ul className="bem-ps-list">
                  <li>Monthly roster generated from your contract&apos;s role-wise requirements and rules</li>
                  <li>Rotation sequence, weekly blocks and rest rules applied consistently</li>
                  <li>Leave recorded against the roster, with its coverage impact shown</li>
                  <li>Planned vs actual attendance in one daily register, with mobile attendance</li>
                  <li>Role-wise required vs assigned for every shift, shortages flagged</li>
                  <li>Each employee sees only their own roster in the app</li>
                  <li>Excel and PDF reports from the same data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bem-section bem-section--subtle" aria-labelledby="bem-features">
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">Key features</p>
              <h2 id="bem-features" className="bem-h2">Everything a shift-based team needs, in one place</h2>
              <p className="bem-sub">From planning the month to recording what actually happened each day.</p>
            </div>
            <ul className="bem-features">
              {FEATURES.map((f) => (
                <li key={f.title} className="bem-feature" data-group={f.group}>
                  <span className="bem-feature-tag">{GROUP_LABEL[f.group]}</span>
                  <span className="bem-feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bem-section" aria-labelledby="bem-how">
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">How it works</p>
              <h2 id="bem-how" className="bem-h2 bem-center--tight">Four steps from setup to reports</h2>
            </div>
            <ol className="bem-steps">
              {STEPS.map((s) => (
                <li key={s.n} className="bem-step">
                  <span className="bem-step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Gallery / product tour ── */}
        <section id="tour" className="bem-section bem-section--subtle" aria-labelledby="bem-gallery" style={{ scrollMarginTop: 72 }}>
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">Product tour</p>
              <h2 id="bem-gallery" className="bem-h2">See BTT Employee Manager in action</h2>
              <p className="bem-sub">
                Real screens from the Windows application, captured on a demo database (employee
                names anonymised). Click any screen for a larger view.
              </p>
            </div>
            <ScreenshotGallery screens={SCREENS} />
          </div>
        </section>

        {/* ── Mobile app ── */}
        <section className="bem-section" aria-labelledby="bem-mobile">
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">BTT Employee App · Android</p>
              <h2 id="bem-mobile" className="bem-h2">Every employee, their own roster — on their phone</h2>
              <p className="bem-sub">
                The official roster stays in the Windows application. The app shows each employee only
                their own shifts, lets them mark attendance with face verification and GPS at the
                authorised site, and send shift-change requests for the manager to approve.
              </p>
            </div>
            <ul className="bem-phones">
              <li>
                <figure>
                  <TodayScreen />
                  <figcaption>Today&apos;s Shift<span>Shift, timing, site, attendance status</span></figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <RosterScreen />
                  <figcaption>My Monthly Roster<span>Shifts, weekly offs and leave</span></figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <AttendanceScreen />
                  <figcaption>Mark Attendance<span>Blink check + GPS geofence</span></figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <ShiftChangeScreen />
                  <figcaption>Shift Change Request<span>Reason required · manager approves</span></figcaption>
                </figure>
              </li>
            </ul>
            <p className="bem-preview-note">Screen previews of the Android app layout with demo data.</p>
          </div>
        </section>

        {/* ── Who it is for ── */}
        <section className="bem-section bem-section--subtle" aria-labelledby="bem-who">
          <div className="bem-container bem-center">
            <p className="bem-eyebrow">Built for</p>
            <h2 id="bem-who" className="bem-h2">Teams that run on shifts</h2>
            <p className="bem-sub">Designed from real data-center O&amp;M manpower operations.</p>
            <ul className="bem-audience">
              {AUDIENCE.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Demo CTA ── */}
        <section className="bem-section" aria-labelledby="bem-try">
          <div className="bem-container">
            <div className="bem-demo">
              <div>
                <p className="bem-eyebrow" style={{ color: "#9ec0ff" }}>Free demo</p>
                <h2 id="bem-try">Try BTT Employee Manager</h2>
                <p>{PRODUCT.demo.line} No employee-count limit — load your real team and generate a real roster.</p>
                <div className="bem-cta-row" style={{ marginBottom: 0 }}>
                  <Link href={PRODUCT.demoRoute} className="bem-btn bem-btn--primary">
                    Start 3-Day Demo
                  </Link>
                  <a href="#tour" className="bem-btn bem-btn--ghost">
                    <span aria-hidden="true">▶</span> Watch Product Tour
                  </a>
                </div>
              </div>
              <div className="bem-demo-offer">
                <div>
                  <b>Unlimited</b>
                  <span>Employees</span>
                </div>
                <div>
                  <b>3 Days</b>
                  <span>Free</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Download ── */}
        <section id="download" className="bem-section" aria-labelledby="bem-download" style={{ scrollMarginTop: 72 }}>
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">Download</p>
              <h2 id="bem-download" className="bem-h2">Windows software and Android app</h2>
              <p className="bem-sub">Install the Windows software, activate it with your demo licence, then give the app to your employees.</p>
            </div>
            <DownloadCards />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bem-section bem-section--subtle" aria-labelledby="bem-faq">
          <div className="bem-container">
            <div className="bem-center">
              <p className="bem-eyebrow">FAQ</p>
              <h2 id="bem-faq" className="bem-h2 bem-center--tight">Questions</h2>
            </div>
            <div className="bem-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
