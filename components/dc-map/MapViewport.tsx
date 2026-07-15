"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/MapViewport.tsx
//
// Owns ALL zoom/pan state and gesture handling for the map — wheel zoom
// to cursor, drag pan, two-finger pinch, double-click focus, keyboard
// navigation, and an animated focusWorldPoint() used by search results,
// minimap clicks and info-panel chips.
//
// Renderer-agnostic on purpose: this component knows nothing about
// isometric math or what the scene contains. It tracks three numbers
// (scale, tx, ty), applies them imperatively to a single <g> transform
// inside requestAnimationFrame — so panning never re-renders the React
// scene tree and stays at 60fps — and lets outside observers (minimap)
// subscribe to view changes. When the SVG scene is one day replaced by
// a Three.js camera, only the transform application changes; the gesture
// model, handle API and subscribers stay identical.
// ═══════════════════════════════════════════════════════════════════════════

export interface WorldRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ViewTransform {
  scale: number;
  tx: number;
  ty: number;
  /** Container size in CSS pixels. */
  cw: number;
  ch: number;
}

export interface MapViewportHandle {
  /** Smoothly centre a world-space point, optionally at a target zoom. */
  focusWorldPoint: (wx: number, wy: number, targetScale?: number) => void;
  zoomBy: (factor: number) => void;
  reset: () => void;
  getView: () => ViewTransform;
  /** Subscribe to view changes (throttled to animation frames). */
  subscribe: (cb: (v: ViewTransform) => void) => () => void;
}

interface MapViewportProps {
  world: WorldRect;
  minZoomFactor?: number; // relative to the fitted scale
  maxZoomFactor?: number;
  /** Fired when the user clicks empty canvas (not a component, not a drag). */
  onBackgroundClick?: () => void;
  ariaLabel: string;
  children: ReactNode;
}

const FOCUS_MS = 380;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const MapViewport = forwardRef<MapViewportHandle, MapViewportProps>(
  function MapViewport(
    { world, minZoomFactor = 0.55, maxZoomFactor = 5, onBackgroundClick, ariaLabel, children },
    ref
  ) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<SVGGElement | null>(null);

    // View state lives in refs — gestures mutate these and schedule a
    // frame; React never re-renders during pan/zoom.
    const view = useRef({ scale: 1, tx: 0, ty: 0, cw: 0, ch: 0 });
    const fitted = useRef({ scale: 1, tx: 0, ty: 0 });
    const frame = useRef(0);
    const subscribers = useRef(new Set<(v: ViewTransform) => void>());

    const pointers = useRef(new Map<number, { x: number; y: number }>());
    const gesture = useRef({
      dragging: false,
      moved: false,
      lastX: 0,
      lastY: 0,
      pinchDist: 0,
      /** True when the initial pointerDown landed on a hotspot node. */
      onNode: false,
    });
    const anim = useRef<number>(0);

    const emit = useCallback(() => {
      const v = { ...view.current };
      subscribers.current.forEach((cb) => cb(v));
    }, []);

    const apply = useCallback(() => {
      frame.current = 0;
      const g = sceneRef.current;
      const { scale, tx, ty } = view.current;
      if (g) g.setAttribute("transform", `translate(${tx} ${ty}) scale(${scale})`);
      emit();
    }, [emit]);

    const schedule = useCallback(() => {
      if (!frame.current) frame.current = requestAnimationFrame(apply);
    }, [apply]);

    const clampScale = useCallback(
      (s: number) =>
        Math.min(
          fitted.current.scale * maxZoomFactor,
          Math.max(fitted.current.scale * minZoomFactor, s)
        ),
      [maxZoomFactor, minZoomFactor]
    );

    /** Zoom keeping a container-space anchor point stationary. */
    const zoomAt = useCallback(
      (cx: number, cy: number, factor: number) => {
        const v = view.current;
        const next = clampScale(v.scale * factor);
        if (next === v.scale) return;
        const wx = (cx - v.tx) / v.scale;
        const wy = (cy - v.ty) / v.scale;
        v.scale = next;
        v.tx = cx - wx * next;
        v.ty = cy - wy * next;
        schedule();
      },
      [clampScale, schedule]
    );

    const fitToContainer = useCallback(() => {
      const el = wrapRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (!cw || !ch) return;
      const pad = 28;
      const scale = Math.min((cw - pad * 2) / world.w, (ch - pad * 2) / world.h);
      const tx = (cw - world.w * scale) / 2 - world.x * scale;
      const ty = (ch - world.h * scale) / 2 - world.y * scale;
      fitted.current = { scale, tx, ty };
      view.current = { scale, tx, ty, cw, ch };
      schedule();
    }, [world, schedule]);

    // Initial fit + refit on resize (keeps the map responsive without
    // breaking interaction — zoom level resets only on size change).
    useEffect(() => {
      fitToContainer();
      const el = wrapRef.current;
      if (!el || typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(() => fitToContainer());
      ro.observe(el);
      return () => ro.disconnect();
    }, [fitToContainer]);

    useEffect(() => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      if (anim.current) cancelAnimationFrame(anim.current);
    }, []);

    // Wheel zoom — native listener so preventDefault works (React's
    // synthetic wheel is passive on some browsers).
    useEffect(() => {
      const el = wrapRef.current;
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const rect = el.getBoundingClientRect();
        // Normalize across trackpad (small deltaY) and mouse wheel (large deltaY)
        const raw = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 600 : 1);
        const factor = Math.exp(-raw * 0.0014);
        zoomAt(e.clientX - rect.left, e.clientY - rect.top, factor);
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [zoomAt]);

    const stopAnim = () => {
      if (anim.current) {
        cancelAnimationFrame(anim.current);
        anim.current = 0;
      }
    };

    const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
      stopAnim();
      const el = wrapRef.current;
      if (!el) return;
      el.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = gesture.current;
      if (pointers.current.size === 1) {
        // Record whether the tap started on a component hotspot so we can
        // skip the background-click callback on pointerUp.
        g.onNode = !!(e.target as Element).closest("[data-dcm-node]");
        g.dragging = true;
        g.moved = false;
        g.lastX = e.clientX;
        g.lastY = e.clientY;
      } else if (pointers.current.size === 2) {
        const [a, b] = Array.from(pointers.current.values());
        g.pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
        g.dragging = false;
      }
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = gesture.current;
      const el = wrapRef.current;
      if (!el) return;

      if (pointers.current.size === 2) {
        const [a, b] = Array.from(pointers.current.values());
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (g.pinchDist > 0) {
          const rect = el.getBoundingClientRect();
          const midX = (a.x + b.x) / 2 - rect.left;
          const midY = (a.y + b.y) / 2 - rect.top;
          zoomAt(midX, midY, dist / g.pinchDist);
        }
        g.pinchDist = dist;
        g.moved = true;
        return;
      }

      if (!g.dragging) return;
      const dx = e.clientX - g.lastX;
      const dy = e.clientY - g.lastY;
      if (Math.abs(dx) + Math.abs(dy) > 2) g.moved = true;
      g.lastX = e.clientX;
      g.lastY = e.clientY;
      view.current.tx += dx;
      view.current.ty += dy;
      schedule();
    };

    const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
      pointers.current.delete(e.pointerId);
      const g = gesture.current;
      if (pointers.current.size < 2) g.pinchDist = 0;
      if (pointers.current.size === 0) {
        const wasClick = !g.moved && g.dragging;
        const wasOnNode = g.onNode;
        g.dragging = false;
        g.onNode = false;
        // Only fire background click when the tap started AND ended on
        // empty canvas — not on a component hotspot.
        if (wasClick && !wasOnNode && onBackgroundClick) {
          onBackgroundClick();
        }
      }
    };

    const animateTo = useCallback(
      (scale: number, tx: number, ty: number) => {
        stopAnim();
        if (prefersReducedMotion()) {
          view.current.scale = scale;
          view.current.tx = tx;
          view.current.ty = ty;
          schedule();
          return;
        }
        const from = { ...view.current };
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / FOCUS_MS);
          // Quintic ease-out: snappy start, featherlight landing
          const ease = 1 - Math.pow(1 - t, 4);
          view.current.scale = from.scale + (scale - from.scale) * ease;
          view.current.tx = from.tx + (tx - from.tx) * ease;
          view.current.ty = from.ty + (ty - from.ty) * ease;
          schedule();
          if (t < 1) anim.current = requestAnimationFrame(step);
          else anim.current = 0;
        };
        anim.current = requestAnimationFrame(step);
      },
      [schedule]
    );

    useImperativeHandle(
      ref,
      (): MapViewportHandle => ({
        focusWorldPoint: (wx, wy, targetScale) => {
          const v = view.current;
          const s = clampScale(targetScale ?? Math.max(v.scale, fitted.current.scale * 1.7));
          animateTo(s, v.cw / 2 - wx * s, v.ch / 2 - wy * s);
        },
        zoomBy: (factor) => {
          const v = view.current;
          zoomAt(v.cw / 2, v.ch / 2, factor);
        },
        reset: () => {
          const f = fitted.current;
          animateTo(f.scale, f.tx, f.ty);
        },
        getView: () => ({ ...view.current }),
        subscribe: (cb) => {
          subscribers.current.add(cb);
          cb({ ...view.current });
          return () => subscribers.current.delete(cb);
        },
      }),
      [animateTo, clampScale, zoomAt]
    );

    const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
      const PAN = 48;
      const v = view.current;
      switch (e.key) {
        case "ArrowUp":
          v.ty += PAN;
          break;
        case "ArrowDown":
          v.ty -= PAN;
          break;
        case "ArrowLeft":
          v.tx += PAN;
          break;
        case "ArrowRight":
          v.tx -= PAN;
          break;
        case "+":
        case "=":
          zoomAt(v.cw / 2, v.ch / 2, 1.2);
          return;
        case "-":
        case "_":
          zoomAt(v.cw / 2, v.ch / 2, 1 / 1.2);
          return;
        case "0":
        case "Home": {
          const f = fitted.current;
          animateTo(f.scale, f.tx, f.ty);
          return;
        }
        default:
          return;
      }
      e.preventDefault();
      schedule();
    };

    return (
      <div
        ref={wrapRef}
        className="dcm-viewport"
        role="application"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <svg
          className="dcm-svg"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <g ref={sceneRef}>{children}</g>
        </svg>
      </div>
    );
  }
);

export default MapViewport;
