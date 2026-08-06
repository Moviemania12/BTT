import Link from "next/link";
import { ALL_TOPICS } from "@/lib/topics";
import NonItTrackIllustration from "./NonItTrackIllustration";
import ItTrackIllustration from "./ItTrackIllustration";
import AiTrackIllustration from "./AiTrackIllustration";

// ═══════════════════════════════════════════════════════════════════════════
// components/homepage/LearningTracks.tsx
//
// Three active learning tracks — Non-IT, IT, AI Infrastructure.
// Published topic counts are derived dynamically from lib/topics.ts.
// ═══════════════════════════════════════════════════════════════════════════

const TRACKS = [
  {
    track: "non-it" as const,
    title: "Non-IT Infrastructure",
    description: "Power, Cooling, Fire Safety, Security and everything that keeps the data center running.",
    href: "/learn/non-it",
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
    cardClass: "hp-track-card--it",
    titleClass: "hp-track-title--green",
    btnClass: "hp-btn--green",
    Illustration: ItTrackIllustration,
  },
  {
    track: "ai" as const,
    title: "AI Infrastructure",
    description: "GPU clusters, LLMs, Tensor Cores, HBM, NVLink and the hardware powering the AI revolution.",
    href: "/learn/ai",
    cardClass: "hp-track-card--ai",
    titleClass: "hp-track-title--purple",
    btnClass: "hp-btn--purple",
    Illustration: AiTrackIllustration,
  },
];

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
        </div>
      </div>
    </section>
  );
}
