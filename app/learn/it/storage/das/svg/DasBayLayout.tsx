"use client";

// ═══════════════════════════════════════════════════════════════════════════
// svg/DasBayLayout.tsx — Diagram 2: Internal Drive Bay Layout
//
// Future image: /public/images/articles/das/das-bay-layout.png
//
// Purpose:
//   Show a 2U server front-panel view with drive bay numbering, LED
//   indicators and carrier detail — so a field engineer knows exactly
//   where to look when iDRAC reports a fault on "Bay 3".
//
// What to show:
//   2U server front view: 24 drive bays in a 4-row × 6-column grid,
//     numbered left-to-right, top-to-bottom (Bay 0 = top-left).
//   Each bay: small Activity LED (blue dot) top-left, Fault LED (amber dot)
//     top-right.
//   One bay (e.g. Bay 7) highlighted in amber/red = "Failed — Fault LED On".
//   One bay (e.g. Bay 12) highlighted in green = "Hot-swap in progress — Rebuild".
//   Exploded inset bottom-right: drive carrier with labels —
//     "Drive screws (4×)", "Carrier handle / latch", "Backplane connector".
//   Label at bottom: "Backplane connects here — routes power + data to controller".
//
// Learning objective:
//   Engineer arriving on-site can immediately match iDRAC fault bay number
//   to the physical front-panel position and understand LED states.
// ═══════════════════════════════════════════════════════════════════════════

export default function DasBayLayout() {
  const cols = 6;
  const rows = 4;
  const bayW = 80;
  const bayH = 40;
  const gapX = 6;
  const gapY = 6;
  const startX = 40;
  const startY = 90;

  const faultBay = 7;
  const rebuildBay = 12;

  return (
    <svg
      viewBox="0 0 860 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Internal drive bay layout — 2U server front view showing bay numbering and LED indicators"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <rect width="860" height="380" fill="#f8fafc" rx="12" />

      {/* Title */}
      <text x="430" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">
        Internal Drive Bay Layout — 2U Server Front View
      </text>
      <text x="430" y="46" textAnchor="middle" fontSize="10" fill="#6b7280">
        24-bay example (4 rows × 6 columns). Bay 0 = top-left. Actual layout varies by server model.
      </text>

      {/* Server chassis outline */}
      <rect x="28" y="68" width={cols * (bayW + gapX) + gapX + 24} height={rows * (bayH + gapY) + gapY + 24} rx="8"
        fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="40" y="84" fontSize="8.5" fill="#64748b" fontFamily="monospace">2U RACK SERVER</text>

      {/* Drive bays */}
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = startX + col * (bayW + gapX);
        const y = startY + row * (bayH + gapY);
        const isFault = idx === faultBay;
        const isRebuild = idx === rebuildBay;
        const bg = isFault ? "#7f1d1d" : isRebuild ? "#14532d" : "#1e3a5f";
        const border = isFault ? "#ef4444" : isRebuild ? "#22c55e" : "#2563eb";

        return (
          <g key={idx}>
            <rect x={x} y={y} width={bayW} height={bayH} rx="3" fill={bg} stroke={border} strokeWidth={isFault || isRebuild ? 1.5 : 0.8} />
            {/* Bay number */}
            <text x={x + bayW / 2} y={y + 16} textAnchor="middle" fontSize="9" fill="#94a3b8">
              Bay {idx}
            </text>
            {/* Activity LED */}
            <circle cx={x + 6} cy={y + 6} r="3" fill={isRebuild ? "#22c55e" : "#1d4ed8"} />
            {/* Fault LED */}
            <circle cx={x + bayW - 6} cy={y + 6} r="3" fill={isFault ? "#ef4444" : "#334155"} />
            {/* Status text */}
            {isFault && <text x={x + bayW / 2} y={y + 32} textAnchor="middle" fontSize="7.5" fill="#f87171" fontWeight="700">FAILED</text>}
            {isRebuild && <text x={x + bayW / 2} y={y + 32} textAnchor="middle" fontSize="7.5" fill="#4ade80" fontWeight="700">REBUILD</text>}
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(560, 80)">
        <text fontSize="9" fontWeight="700" fill="#111827" y="0">LED Legend</text>
        <circle cx="8" cy="16" r="5" fill="#1d4ed8" />
        <text x="18" y="20" fontSize="8.5" fill="#374151">Activity (Blue — Normal)</text>
        <circle cx="8" cy="34" r="5" fill="#ef4444" />
        <text x="18" y="38" fontSize="8.5" fill="#374151">Fault (Amber/Red)</text>
        <circle cx="8" cy="52" r="5" fill="#22c55e" />
        <text x="18" y="56" fontSize="8.5" fill="#374151">Rebuild (Green blink)</text>

        {/* Carrier inset */}
        <rect x="0" y="74" width="270" height="100" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <text x="135" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Drive Carrier — Exploded View</text>
        <rect x="20" y="100" width="230" height="40" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
        <text x="135" y="118" textAnchor="middle" fontSize="8" fill="#1e40af">Physical Drive</text>
        <text x="20" y="152" fontSize="7.5" fill="#6b7280">Latch / Release Handle →</text>
        <text x="20" y="163" fontSize="7.5" fill="#6b7280">Screws (4×) secure drive →</text>
        <text x="20" y="174" fontSize="7.5" fill="#6b7280">Backplane connector (rear) →</text>
      </g>

      {/* Bottom label */}
      <text x="430" y="366" textAnchor="middle" fontSize="8.5" fill="#9ca3af">
        Future image: /public/images/articles/das/das-bay-layout.png
      </text>
    </svg>
  );
}
