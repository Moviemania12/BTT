"use client";

// ═══════════════════════════════════════════════════════════════════════════
// components/engineering/SvgFigure.tsx
//
// Shared figure wrapper for every inline SVG diagram across the platform.
// Works unchanged for all articles: AWS, Azure, GCP, Hybrid Cloud, UPS,
// SAN, NAS, STS, PDU, networking, storage, servers, cooling — every article
// that re-exports this as `Figure`.
//
// Improvements added (no article content or markup changed):
//   • Mobile: horizontal scroll container with touch-scroll + scroll hint
//   • All breakpoints: tap / click opens fullscreen modal viewer
//   • Modal: pinch-zoom, mouse-wheel zoom, drag-to-pan, double-tap reset,
//     reset button, close button, ESC key, outside-click close
//   • Performance: modal rendered lazily after first open
//   • Accessibility: focus trap, ARIA labels, keyboard navigation
// ═══════════════════════════════════════════════════════════════════════════

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────

export interface SvgFigureProps {
  caption: string;
  source?: string;
  description?: string;
  engineeringNote?: string;
  id?: string;
  children: ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────

const MIN_SCALE = 0.5;
const MAX_SCALE = 8;
const ZOOM_STEP = 0.25;
const MOBILE_MIN_WIDTH = 560; // px — SVG never shrinks below this on mobile

// ─── Utility ──────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ─── Fullscreen modal ─────────────────────────────────────────────────────

interface ModalProps {
  caption: string;
  children: ReactNode;
  onClose: () => void;
}

function DiagramModal({ caption, children, onClose }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // zoom / pan state
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  // gesture refs — stored in refs so event handlers don't re-bind on state change
  const isDragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, ox: 0, oy: 0 });
  const lastTap = useRef(0);
  const lastDist = useRef<number | null>(null);
  const scaleRef = useRef(scale);
  const originRef = useRef(origin);
  scaleRef.current = scale;
  originRef.current = origin;

  // Focus close button on mount
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") trapFocus(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Focus trap
  function trapFocus(e: KeyboardEvent) {
    const modal = backdropRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  }

  // Outside click
  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  }, [onClose]);

  // ── Zoom helpers ──────────────────────────────────────────────────────

  const applyZoom = useCallback((
    delta: number,
    pivotX: number,   // pointer x relative to content div
    pivotY: number,
  ) => {
    const s = scaleRef.current;
    const o = originRef.current;
    const nextScale = clamp(s + delta, MIN_SCALE, MAX_SCALE);
    if (nextScale === s) return;
    // adjust origin so zoom pivots around pointer position
    const factor = nextScale / s;
    setOrigin({
      x: pivotX - factor * (pivotX - o.x),
      y: pivotY - factor * (pivotY - o.y),
    });
    setScale(nextScale);
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setOrigin({ x: 0, y: 0 });
  }, []);

  // ── Mouse wheel zoom ──────────────────────────────────────────────────

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = contentRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    applyZoom(delta, px, py);
  }, [applyZoom]);

  // ── Mouse drag ────────────────────────────────────────────────────────

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      ox: originRef.current.x,
      oy: originRef.current.y,
    };
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    setOrigin({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  // ── Double click zoom ─────────────────────────────────────────────────

  const onDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = contentRef.current!.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (scaleRef.current > 1.1) {
      resetZoom();
    } else {
      applyZoom(2 - scaleRef.current, px, py); // zoom to 2×
    }
  }, [applyZoom, resetZoom]);

  // ── Touch gestures (pinch + pan + double-tap) ─────────────────────────

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDist.current = Math.hypot(dx, dy);
    } else if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = {
        mx: e.touches[0].clientX,
        my: e.touches[0].clientY,
        ox: originRef.current.x,
        oy: originRef.current.y,
      };
      // double-tap detection
      const now = Date.now();
      if (now - lastTap.current < 300) {
        const rect = contentRef.current!.getBoundingClientRect();
        const px = e.touches[0].clientX - rect.left;
        const py = e.touches[0].clientY - rect.top;
        if (scaleRef.current > 1.1) { resetZoom(); } else { applyZoom(2 - scaleRef.current, px, py); }
      }
      lastTap.current = now;
    }
  }, [applyZoom, resetZoom]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = (dist - lastDist.current) * 0.01;
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = contentRef.current!.getBoundingClientRect();
      applyZoom(delta, cx - rect.left, cy - rect.top);
      lastDist.current = dist;
    } else if (e.touches.length === 1 && isDragging.current) {
      const dx = e.touches[0].clientX - dragStart.current.mx;
      const dy = e.touches[0].clientY - dragStart.current.my;
      setOrigin({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
    }
  }, [applyZoom]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) lastDist.current = null;
    if (e.touches.length === 0) isDragging.current = false;
  }, []);

  const transform = `translate(${origin.x}px, ${origin.y}px) scale(${scale})`;
  const isZoomed = scale > 1.05;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Diagram: ${caption}`}
      onClick={onBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* ── Header bar ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 8,
        }}
      >
        <p style={{
          color: "#e2e8f0",
          fontSize: "0.85rem",
          fontFamily: "var(--font-body, sans-serif)",
          margin: 0,
          flexShrink: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {caption}
        </p>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {/* Reset button — only visible when zoomed */}
          {isZoomed && (
            <button
              onClick={resetZoom}
              aria-label="Reset zoom"
              style={btnStyle}
            >
              Reset
            </button>
          )}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close diagram viewer"
            style={btnStyle}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* ── Diagram canvas ── */}
      <div
        ref={contentRef}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          width: "100%",
          maxWidth: 1200,
          flex: 1,
          overflow: "hidden",
          borderRadius: 12,
          background: "#ffffff",
          cursor: isDragging.current ? "grabbing" : isZoomed ? "grab" : "default",
          touchAction: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform,
            transformOrigin: "0 0",
            width: "100%",
            transition: isDragging.current ? "none" : "transform 0.05s ease-out",
          }}
        >
          {children}
        </div>
      </div>

      {/* ── Hint bar ── */}
      <p style={{
        color: "#94a3b8",
        fontSize: "0.75rem",
        fontFamily: "var(--font-body, sans-serif)",
        marginTop: 10,
        textAlign: "center",
      }}>
        Scroll to zoom · Drag to pan · Double-click to zoom in/out · ESC to close
      </p>
    </div>
  );
}

// Shared button style for modal controls
const btnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 6,
  color: "#e2e8f0",
  fontSize: "0.8rem",
  fontFamily: "var(--font-body, sans-serif)",
  cursor: "pointer",
  padding: "4px 12px",
  lineHeight: 1.5,
  whiteSpace: "nowrap",
};

// ─── Main SvgFigure component ─────────────────────────────────────────────

export function SvgFigure({
  caption,
  source,
  description,
  engineeringNote,
  id,
  children,
}: SvgFigureProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMounted, setModalMounted] = useState(false); // lazy mount

  const openModal = useCallback(() => {
    setModalMounted(true);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <figure id={id} style={{ margin: "2rem 0" }}>
        {/* ── Wrapper: scroll on mobile, click-to-expand on all ── */}
        <div style={{ position: "relative" }}>

          {/* Expand hint chip — top-right corner */}
          <button
            onClick={openModal}
            aria-label={`View diagram fullscreen: ${caption}`}
            title="Open fullscreen viewer"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: "3px 9px",
              fontSize: "0.72rem",
              fontFamily: "var(--font-body, sans-serif)",
              color: "#475569",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              lineHeight: 1.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1h5M1 1v5M15 1h-5M15 1v5M1 15h5M1 15v-5M15 15h-5M15 15v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Expand
          </button>

          {/* Scroll container — horizontal scroll on mobile */}
          <div
            onClick={openModal}
            role="button"
            tabIndex={0}
            aria-label={`View diagram: ${caption}. Press Enter to open fullscreen viewer.`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } }}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "auto",
              background: "#ffffff",
              cursor: "pointer",
              WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
              scrollbarWidth: "thin",
            }}
          >
            {/* Inner wrapper enforces minimum width on mobile */}
            <div style={{ minWidth: MOBILE_MIN_WIDTH }}>
              {children}
            </div>
          </div>

          {/* Mobile swipe hint — only on small screens via CSS class */}
          <div className="btt-diagram-scroll-hint" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 12H15M15 12L12 9M15 12L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Swipe to scroll · Tap to expand
          </div>
        </div>

        <figcaption
          style={{
            fontSize: "0.85rem",
            color: "#4b5563",
            marginTop: "0.6rem",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>

        {(source || description || engineeringNote) && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.78rem", color: "#4b5563", lineHeight: 1.6 }}>
            {description && <p style={{ margin: "2px 0" }}>{description}</p>}
            {source && <p style={{ margin: "2px 0" }}><strong>Source:</strong> {source}</p>}
            {engineeringNote && (
              <p style={{ margin: "2px 0" }}><strong>Engineering note:</strong> {engineeringNote}</p>
            )}
          </div>
        )}
      </figure>

      {/* ── Lazy-mounted fullscreen modal ── */}
      {modalMounted && modalOpen && (
        <DiagramModal caption={caption} onClose={closeModal}>
          {children}
        </DiagramModal>
      )}

      {/* ── Scoped CSS for scroll hint visibility ── */}
      <style>{`
        .btt-diagram-scroll-hint {
          display: none;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          padding: 3px 8px;
          font-size: 0.73rem;
          color: #94a3b8;
          font-family: var(--font-body, sans-serif);
        }
        @media (max-width: 640px) {
          .btt-diagram-scroll-hint {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default SvgFigure;
