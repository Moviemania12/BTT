"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Screen } from "@/lib/bttEmployeeManager";

// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/ScreenshotGallery.tsx
//
// Browse real screens, open a larger view (lightbox), or play the
// "Product Tour" — the same lightbox advancing through every screen with its
// module name and caption. Keyboard: ← → to move, Esc to close, Space to
// pause/resume the tour. No external dependency.
// ═══════════════════════════════════════════════════════════════════════════

const TOUR_MS = 4500;

export default function ScreenshotGallery({ screens }: { screens: Screen[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [touring, setTouring] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const current = screens[active];
  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + screens.length) % screens.length),
    [screens.length],
  );

  const openAt = (i: number, tour = false) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setActive(i);
    setTouring(tour);
    setOpen(true);
  };
  const close = useCallback(() => {
    setOpen(false);
    setTouring(false);
    if (window.location.hash === "#tour") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    openerRef.current?.focus();
  }, []);

  // Start the tour when the page is opened with #tour (homepage "Watch Product Tour").
  useEffect(() => {
    let t: number | undefined;
    const check = () => {
      if (window.location.hash === "#tour") {
        t = window.setTimeout(() => openAt(0, true), 400);
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => {
      window.removeEventListener("hashchange", check);
      if (t) window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " ") {
        e.preventDefault();
        setTouring((t) => !t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  useEffect(() => {
    if (!open || !touring) return;
    const t = window.setTimeout(() => go(1), TOUR_MS);
    return () => window.clearTimeout(t);
  }, [open, touring, active, go]);

  return (
    <div>
      <div className="bem-gallery">
        <div>
          <button
            type="button"
            className="bem-gallery-main"
            onClick={() => openAt(active)}
            aria-label={`Open larger view: ${current.title}`}
          >
            <Image
              src={current.src}
              alt={`${current.title} — ${current.caption}`}
              width={1480}
              height={900}
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <span className="bem-gallery-meta">
              <b>
                {current.title} <span style={{ fontWeight: 500 }}>· {current.module}</span>
              </b>
              <span>{current.caption}</span>
            </span>
          </button>
          <div className="bem-gallery-actions">
            <button type="button" className="bem-btn bem-btn--solid" onClick={() => openAt(0, true)}>
              <span aria-hidden="true">▶</span> Watch Product Tour
            </button>
            <button type="button" className="bem-btn bem-btn--outline" onClick={() => openAt(active)}>
              View larger
            </button>
          </div>
        </div>

        <ul className="bem-thumbs" aria-label="BTT Employee Manager screens">
          {screens.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="bem-thumb"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                onDoubleClick={() => openAt(i)}
              >
                <Image src={s.src} alt="" width={1480} height={900} sizes="200px" />
                <span>{s.title}</span>
                <small>{s.module}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div
          className="bem-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={touring ? "BTT Employee Manager product tour" : `Screenshot: ${current.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <figure className="bem-lightbox-figure">
            <Image
              key={current.id}
              src={current.src}
              alt={`${current.title} — ${current.caption}`}
              width={1480}
              height={900}
              sizes="100vw"
              style={{ animation: "bem-fade 220ms ease both" }}
            />
            <figcaption className="bem-lightbox-cap">
              <b>{current.title}</b> · {current.module} — {current.caption}
            </figcaption>
          </figure>
          {touring && (
            <div className="bem-tour-progress" aria-hidden="true">
              <i key={`${current.id}-p`} style={{ animationDuration: `${TOUR_MS}ms` }} />
            </div>
          )}
          <div className="bem-lightbox-bar">
            <button type="button" onClick={() => go(-1)} aria-label="Previous screen">
              ←
            </button>
            <span className="bem-lightbox-count" aria-live="polite">
              {active + 1} / {screens.length}
            </span>
            <button type="button" onClick={() => go(1)} aria-label="Next screen">
              →
            </button>
            <button type="button" onClick={() => setTouring((t) => !t)}>
              {touring ? "Pause tour" : "Play tour"}
            </button>
            <button type="button" ref={closeRef} onClick={close}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
