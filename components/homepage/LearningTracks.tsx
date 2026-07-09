import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";
import NonItTrackIllustration from "./NonItTrackIllustration";
import ItTrackIllustration from "./ItTrackIllustration";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/LearningTracks.tsx — Homepage V2 (polish pass)
//
// Adds the icon-illustration cluster to each track card, matching the
// reference image (Non-IT: transformer/fan/extinguisher; IT: server
// rack/monitor). Everything else — data source, card structure, AI
// "Coming Soon" card — unchanged from the prior approved pass.
// ═══════════════════════════════════════════════════════════════════════════

const TRACKS = [
  {
    track: "non-it" as const,
    title: "Non-IT Infrastructure",
    description: "Power, Cooling, Fire Safety, Security and everything that keeps the data center running.",
    href: "/learn/non-it",
    comingSoon: false,
    cardClass: "hp-track-card--non-it",
    titleClass: "hp-track-title--blue",
    btnClass: "hp-btn--primary",
    Illustration: NonItTrackIllustration,
  },
  {
    track: "it" as const,
    title: "IT Infrastructure",
    description: "Servers, Storage, Networking, Virtualization and the technology inside the data center.",
    href: "/learn/it",
    comingSoon: false,
    cardClass: "hp-track-card--it",
    titleClass: "hp-track-title--green",
    btnClass: "hp-btn--green",
    Illustration: ItTrackIllustration,
  },
];

const AI_TRACK = {
  track: "ai" as const,
  title: "AI Infrastructure",
  description: "GPU clusters, ML platforms, and the infrastructure powering AI workloads.",
  cardClass: "hp-track-card--ai",
};

export default function LearningTracks() {
  const counts = ALL_TOPICS.reduce<Record<string, number>>((acc, t) => {
    acc[t.track] = (acc[t.track] ?? 0) + 1;
    return acc;
  }, {});

  const publishedCounts = ALL_TOPICS.filter((t) => t.status === "published").reduce<Record<string, number>>(
    (acc, t) => {
      acc[t.track] = (acc[t.track] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return (
    <section data-homepage-theme="light" aria-labelledby="tracks-heading" className="hp-section hp-section--subtle">
      <div className="hp-container">
        <h2 id="tracks-heading" className="hp-h2 hp-h2--spaced">
          Choose your learning track
        </h2>

        <div className="hp-grid hp-grid--wide">
          {TRACKS.map((t) => {
            const Illustration = t.Illustration;
            return (
              <Link key={t.track} href={t.href} className={`hp-track-card ${t.cardClass}`}>
                <h3 className={`hp-h3 ${t.titleClass}`}>{t.title}</h3>
                <div className="hp-track-body">
                  <div className="hp-track-copy">
                    <p className="hp-card-desc">{t.description}</p>
                    <span className={`hp-btn ${t.btnClass} hp-btn--small hp-btn--inline`}>
                      Explore track →
                    </span>
                  </div>
                  <div className="hp-track-icon-zone">
                    <Illustration />
                  </div>
                </div>
                <span className="hp-text-sm hp-text-muted">
                  {publishedCounts[t.track] ?? 0} of {counts[t.track] ?? 0} topics published
                </span>
              </Link>
            );
          })}

          <div className={`hp-track-card ${AI_TRACK.cardClass} hp-card--disabled`} aria-disabled="true">
            <div className="hp-card-header-row">
              <h3 className="hp-h3">{AI_TRACK.title}</h3>
              <span className="hp-badge hp-badge--coming-soon">Coming soon</span>
            </div>
            <p className="hp-card-desc">{AI_TRACK.description}</p>
            <span className="hp-text-sm hp-text-muted">{counts[AI_TRACK.track] ?? 0} topics planned</span>
          </div>
        </div>
      </div>
    </section>
  );
}
