import Link from "next/link";
import Footer from "@/components/Footer";

interface PolicyLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

/**
 * Shared layout for all legal and policy pages.
 * Uses hp-* design tokens. Zero inline styles.
 */
export default function PolicyLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="hp-page-root">
      <main data-homepage-theme="light">
        {/* Page header */}
        <div className="hp-page-hero">
          <div className="hp-container hp-container--narrow">
            <nav aria-label="Breadcrumb">
              <ol className="hp-breadcrumb">
                <li>
                  <Link href="/" className="hp-link">Home</Link>
                </li>
                <li aria-hidden="true" className="hp-text-muted">/</li>
                <li className="hp-text-muted" aria-current="page">{title}</li>
              </ol>
            </nav>
            <span className="hp-eyebrow">{eyebrow}</span>
            <h1 className="hp-page-h1">{title}</h1>
            <p className="hp-page-meta">Last updated: {lastUpdated}</p>
          </div>
        </div>

        {/* Policy body */}
        <section className="hp-section">
          <div className="hp-container hp-container--narrow">
            <article className="hp-prose">{children}</article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
