import type { Metadata } from "next";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// app/not-found.tsx — custom 404 page
//
// Served (with a real 404 status) for any URL that has no page. Gives the
// visitor useful ways back into the site instead of a dead end. Uses the same
// hp-* tokens/classes as the rest of the site. The shared footer is added by
// app/layout.tsx (SiteFooterGate).
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Page not found — Behind The Tech",
  description: "This page could not be found. Browse the Behind The Tech learning tracks, tools and study resources.",
  robots: { index: false, follow: true },
};

const TRACKS = [
  {
    href: "/learn/non-it",
    label: "Non-IT Infrastructure",
    desc: "Power, cooling, fire protection, security and BMS/DCIM",
  },
  {
    href: "/learn/it",
    label: "IT Infrastructure",
    desc: "Servers, storage, networking and cloud",
  },
  {
    href: "/learn/ai",
    label: "AI Infrastructure",
    desc: "GPU clusters, AI hardware, platforms and AI data centers",
  },
];

const MORE = [
  { href: "/learn", label: "All learning paths" },
  { href: "/learn/roadmap", label: "Learning roadmap" },
  { href: "/tools", label: "Engineering calculators" },
  { href: "/study/interview", label: "Interview questions" },
  { href: "/study/troubleshooting", label: "Troubleshooting guides" },
  { href: "/reference/glossary", label: "Glossary" },
  { href: "/data-center-map", label: "Data Center map" },
];

export default function NotFound() {
  return (
    <div className="hp-page-root">
      <main data-homepage-theme="light">
        <section className="hp-section hp-section--hero">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <span className="hp-eyebrow">Error 404</span>
            <h1 className="hp-h1">Page not found</h1>
            <p className="hp-body">
              The page you were looking for does not exist, or it has moved. Pick a topic below to
              keep learning, or head back to the homepage.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 24,
              }}
            >
              <Link href="/" className="hp-btn hp-btn--primary">
                Go to homepage
              </Link>
              <Link href="/learn" className="hp-btn hp-btn--secondary">
                Browse all topics
              </Link>
            </div>
          </div>
        </section>

        <section className="hp-section hp-section--subtle" aria-labelledby="nf-tracks">
          <div className="hp-container hp-container--medium">
            <h2 id="nf-tracks" className="hp-h2" style={{ textAlign: "center", marginBottom: 24 }}>
              Start with a learning track
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {TRACKS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="hp-card hp-card--padded"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{ fontWeight: 700, color: "var(--hp-text-primary)", marginBottom: 6 }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--hp-text-secondary)" }}>{t.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-section" aria-labelledby="nf-more">
          <div className="hp-container hp-container--narrow" style={{ textAlign: "center" }}>
            <h2 id="nf-more" className="hp-h3" style={{ marginBottom: 16 }}>
              Popular sections
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 20px",
                justifyContent: "center",
              }}
            >
              {MORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hp-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="hp-body" style={{ marginTop: 24, fontSize: 14 }}>
              Followed a broken link from our site? Please{" "}
              <Link href="/about/contact" className="hp-link">
                tell us
              </Link>{" "}
              so we can fix it.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
