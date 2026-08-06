import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";
import type { Track } from "@/lib/topics";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/TrackExplorer.tsx
//
// Server Component. Compact "Continue Exploring" section for track index
// pages. Shows the other two tracks as small cards — same colors, same
// typography, same button styles as the homepage, but reduced padding and
// no hero-sized illustration zone. Responsive two-column grid.
//
// Usage:
//   <TrackExplorer currentTrack="non-it" />
// ═══════════════════════════════════════════════════════════════════════════

const TRACK_CONFIG = [
  {
    track: "non-it" as const,
    title: "Non-IT Infrastructure",
    description: "Power, Cooling, Fire Safety, Security and everything that keeps the data center running.",
    href: "/learn/non-it",
    cardClass: "hp-track-card--non-it",
    titleClass: "hp-track-title--blue",
    btnClass: "hp-btn--primary",
    icon: "⚡",
  },
  {
    track: "it" as const,
    title: "IT Infrastructure",
    description: "Servers, Storage, Networking, Virtualization and the technology inside the data center.",
    href: "/learn/it",
    cardClass: "hp-track-card--it",
    titleClass: "hp-track-title--green",
    btnClass: "hp-btn--green",
    icon: "🖥️",
  },
  {
    track: "ai" as const,
    title: "AI Infrastructure",
    description: "GPU clusters, LLMs, Tensor Cores, HBM, NVLink and the hardware powering the AI revolution.",
    href: "/learn/ai",
    cardClass: "hp-track-card--ai",
    titleClass: "hp-track-title--purple",
    btnClass: "hp-btn--purple",
    icon: "🤖",
  },
];

interface TrackExplorerProps {
  /** The track the user is currently on — excluded from the list */
  currentTrack: Track;
}

export default function TrackExplorer({ currentTrack }: TrackExplorerProps) {
  const counts = ALL_TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t.track] = (acc[t.track] ?? 0) + 1;
    return acc;
  }, {});

  const publishedCounts = ALL_TOPICS
    .filter((t) => t.status === "published")
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.track] = (acc[t.track] ?? 0) + 1;
      return acc;
    }, {});

  const otherTracks = TRACK_CONFIG.filter((t) => t.track !== currentTrack);

  return (
    <section className="hp-section hp-section--subtle" aria-labelledby="explore-heading">
      <div className="hp-container">
        <h2 id="explore-heading" className="hp-h2 hp-h2--spaced">
          Continue Exploring
        </h2>

        {/* Compact two-column grid — narrower minmax than the homepage hero grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {otherTracks.map((t) => (
            <Link
              key={t.track}
              href={t.href}
              className={`hp-track-card ${t.cardClass}`}
              style={{ padding: 18, gap: 10 }}
            >
              {/* Title row */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span aria-hidden="true" style={{ fontSize: 18 }}>{t.icon}</span>
                <span className={`hp-h3 ${t.titleClass}`} style={{ fontSize: 15, margin: 0 }}>
                  {t.title}
                </span>
              </div>

              {/* Description */}
              <p className="hp-card-desc" style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>
                {t.description}
              </p>

              {/* Footer: counts + button */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span className="hp-text-sm hp-text-muted" style={{ fontSize: 11 }}>
                  {publishedCounts[t.track] ?? 0} / {counts[t.track] ?? 0} published
                </span>
                <span className={`hp-btn ${t.btnClass} hp-btn--small hp-btn--inline`} style={{ fontSize: 11, padding: "5px 12px" }}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
