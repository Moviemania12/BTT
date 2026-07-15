"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ALL_TOPICS, getTopicUrl, type Topic } from "@/lib/topics";
import {
  DC_CATEGORY_COLORS,
  DC_CATEGORY_LABELS,
  DC_COMPONENT_INDEX,
  DC_SYSTEM_LABELS,
  type DcComponentDef,
} from "./map-data";
import { DC_CONTENT } from "./map-content";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/InfoPanel.tsx
//
// The learning panel that opens when a component is selected — desktop:
// a slide-over on the right; mobile: a bottom sheet (both pure CSS, see
// dc-map.css). Sections follow the learning brief: Purpose → Working
// Principle → Why Required → Failure Impact, plus difficulty, category,
// related-component chips and a "Learn More" link that only renders
// when a verified topic exists in lib/topics.ts.
// ═══════════════════════════════════════════════════════════════════════════

const TOPIC_BY_SLUG: Record<string, Topic> = Object.fromEntries(
  ALL_TOPICS.map((t) => [t.slug, t])
);

interface InfoPanelProps {
  componentId: string | null;
  onClose: () => void;
  onSelectRelated: (id: string) => void;
}

function DifficultyMeter({ level }: { level: DcComponentDef["difficulty"] }) {
  const filled = level === "Beginner" ? 1 : level === "Intermediate" ? 2 : 3;
  return (
    <span className="dcm-difficulty" aria-label={`Learning difficulty: ${level}`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`dcm-difficulty-bar ${i <= filled ? "dcm-difficulty-bar--on" : ""}`} />
      ))}
      <span className="dcm-difficulty-text">{level}</span>
    </span>
  );
}

export default function InfoPanel({ componentId, onClose, onSelectRelated }: InfoPanelProps) {
  const component = componentId ? DC_COMPONENT_INDEX[componentId] : null;
  const content = componentId ? DC_CONTENT[componentId] : null;
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Move focus to the panel heading when a component opens — keyboard
  // users land straight on the content they asked for.
  useEffect(() => {
    if (component) headingRef.current?.focus();
  }, [component]);

  if (!component || !content) return null;

  const topic = component.topicSlug ? TOPIC_BY_SLUG[component.topicSlug] : null;
  const accent = DC_CATEGORY_COLORS[component.category];

  return (
    <aside
      className="dcm-panel"
      role="dialog"
      aria-modal="false"
      aria-label={`${component.name} details`}
    >
      {/* Drag handle — visible only on mobile bottom sheet */}
      <div className="dcm-panel-handle" aria-hidden="true" />
      <div className="dcm-panel-head">
        <span className="dcm-panel-kicker" style={{ color: accent }}>
          <span className="dcm-panel-kicker-dot" style={{ backgroundColor: accent }} aria-hidden="true" />
          {DC_CATEGORY_LABELS[component.category]}
          {component.systems.length > 0 && (
            <span className="dcm-panel-systems">
              {" · "}
              {component.systems.map((s) => DC_SYSTEM_LABELS[s]).join(" · ")}
            </span>
          )}
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="dcm-panel-title">
          {component.name}
        </h2>
        <DifficultyMeter level={component.difficulty} />
        <button type="button" className="dcm-panel-close" onClick={onClose} aria-label="Close details panel">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="dcm-panel-body">
        <section className="dcm-panel-section">
          <h3>Purpose</h3>
          <p>{content.purpose}</p>
        </section>

        <section className="dcm-panel-section">
          <h3>Working Principle</h3>
          <p>{content.working}</p>
        </section>

        <section className="dcm-panel-section">
          <h3>Why It Is Required</h3>
          <p>{content.whyRequired}</p>
        </section>

        <section className="dcm-panel-section dcm-panel-section--impact">
          <h3>Failure Impact</h3>
          <p>{content.failureImpact}</p>
        </section>

        {component.related.length > 0 && (
          <section className="dcm-panel-section dcm-panel-section--related">
            <h3>Related Components</h3>
            <div className="dcm-panel-chips">
              {component.related.map((rid) => {
                const rel = DC_COMPONENT_INDEX[rid];
                if (!rel) return null;
                return (
                  <button
                    key={rid}
                    type="button"
                    className="dcm-related-chip"
                    onClick={() => onSelectRelated(rid)}
                  >
                    {rel.label}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M5 3 L10 8 L5 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {topic && (
        <div className="dcm-panel-foot">
          <Link href={getTopicUrl(topic)} className="dcm-learn-more">
            Learn More
            {topic.status !== "published" ? (
              <span className="dcm-learn-soon">Article coming soon</span>
            ) : null}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10 H15 M11 5.5 L15.5 10 L11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      )}
    </aside>
  );
}
