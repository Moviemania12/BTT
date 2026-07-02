"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/svg/SeriesParallelBankDiagram.tsx
//
// Blueprint SVG #6 — Series-Parallel Combined Full Battery Bank Topology
// Shows 3 strings × 4 cells per string = complete battery bank
// Series → voltage adds; Parallel → Ah adds
// ═══════════════════════════════════════════════════════════════════════════

export default function SeriesParallelBankDiagram() {
  const strings = 3;
  const cellsPerString = 4;
  const cellW = 90;
  const cellH = 44;
  const cellGapX = 16;
  const stringGapY = 28;
  const startX = 80;
  const startY = 70;

  return (
    <svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="spb-title">
      <title id="spb-title">Series-Parallel Battery Bank — Full Topology</title>
      <rect width="900" height="320" fill="#ffffff" />

      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#0f172a" textAnchor="middle">
        SERIES-PARALLEL BANK — 3 STRINGS × 4 CELLS = 12 BATTERIES TOTAL
      </text>

      {Array.from({ length: strings }).map((_, si) => {
        const sy = startY + si * (cellH + stringGapY);
        return (
          <g key={si}>
            {/* String label */}
            <text x="52" y={sy + cellH / 2 + 5} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700"
              fill="#0066CC" textAnchor="middle">
              S{si + 1}
            </text>

            {/* Fuse symbol */}
            <rect x="62" y={sy + cellH / 2 - 8} width="14" height="16" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="69" y={sy + cellH / 2 + 4} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">F</text>

            {/* Bus line before cells */}
            <line x1="76" y1={sy + cellH / 2} x2={startX} y2={sy + cellH / 2} stroke="#334155" strokeWidth="1.5" />

            {/* Cells in series */}
            {Array.from({ length: cellsPerString }).map((_, ci) => {
              const cx = startX + ci * (cellW + cellGapX);
              return (
                <g key={ci}>
                  <rect x={cx} y={sy} width={cellW} height={cellH} rx="5"
                    fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.8" />
                  <text x={cx + cellW / 2} y={sy + 16} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">
                    12V / 100Ah
                  </text>
                  <text x={cx + cellW / 2} y={sy + 30} fontFamily="Arial,sans-serif" fontSize="8.5" fill="#475569" textAnchor="middle">
                    Cell {si * cellsPerString + ci + 1}
                  </text>
                  {/* Connector between cells */}
                  {ci < cellsPerString - 1 && (
                    <line x1={cx + cellW} y1={sy + cellH / 2} x2={cx + cellW + cellGapX} y2={sy + cellH / 2}
                      stroke="#334155" strokeWidth="2" />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Vertical bus bars (left and right) */}
      <line x1="42" y1={startY + cellH / 2} x2="42" y2={startY + (strings - 1) * (cellH + stringGapY) + cellH / 2}
        stroke="#dc2626" strokeWidth="3" />
      {Array.from({ length: strings }).map((_, si) => (
        <line key={si} x1="42" y1={startY + si * (cellH + stringGapY) + cellH / 2}
          x2="62" y2={startY + si * (cellH + stringGapY) + cellH / 2}
          stroke="#dc2626" strokeWidth="2" />
      ))}

      {/* Right bus bar */}
      const rightX = startX + cellsPerString * (cellW + cellGapX) - cellGapX + 20;

      {/* DC Bus output */}
      <rect x="740" y="115" width="120" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
      <text x="800" y="143" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">DC BUS</text>
      <text x="800" y="158" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#16a34a" textAnchor="middle">48V / 300Ah</text>
      <text x="800" y="175" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">4×12V series, 3 strings ‖</text>

      {/* Annotation boxes */}
      <rect x="60" y="265" width="300" height="36" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="280" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">
        Series: 4 × 12V = 48V (voltage adds)
      </text>
      <text x="210" y="294" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f" textAnchor="middle">
        Each cell contributes voltage — capacity (Ah) stays at single-cell value
      </text>

      <rect x="390" y="265" width="300" height="36" rx="5" fill="#eaf4ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="540" y="280" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">
        Parallel: 3 × 100Ah = 300Ah (Ah adds)
      </text>
      <text x="540" y="294" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">
        Each string contributes Ah — voltage stays at single-string value
      </text>
    </svg>
  );
}
