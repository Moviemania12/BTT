"use client";

import { DC_SYSTEM_COLORS, DC_SYSTEM_LABELS, type DcSystem } from "./map-data";

// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/DcMapLegend.tsx
//
// Engineering legend for the six animated systems. Overlaid on the
// canvas (bottom-left on desktop, inline row on mobile). Purely
// presentational — colors and labels come from map-data.ts so the
// legend can never drift from the scene.
// ═══════════════════════════════════════════════════════════════════════════

const SYSTEMS = Object.keys(DC_SYSTEM_LABELS) as DcSystem[];

export default function DcMapLegend() {
  return (
    <div className="dcm-legend" aria-label="System legend">
      <span className="dcm-legend-title">Systems</span>
      <ul>
        {SYSTEMS.map((s) => (
          <li key={s}>
            <span className="dcm-legend-line" style={{ backgroundColor: DC_SYSTEM_COLORS[s] }} aria-hidden="true" />
            {DC_SYSTEM_LABELS[s]}
          </li>
        ))}
      </ul>
    </div>
  );
}
