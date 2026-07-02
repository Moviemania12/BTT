"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/svg/PowerChainDiagram.tsx
//
// Blueprint SVG #1 — Power Chain Overview
// Grid → Transformer → UPS → Battery Bank (highlighted) → PDU → Rack
// ═══════════════════════════════════════════════════════════════════════════

export default function PowerChainDiagram() {
  const boxes = [
    { label: "GRID", sub: "11kV / 33kV", x: 30, highlight: false },
    { label: "TRANSFORMER", sub: "11kV → 415V", x: 175, highlight: false },
    { label: "UPS", sub: "Online Double\nConversion", x: 320, highlight: false },
    { label: "BATTERY\nBANK", sub: "Energy Storage", x: 465, highlight: true },
    { label: "PDU", sub: "Distribution", x: 610, highlight: false },
    { label: "RACK", sub: "IT Load", x: 755, highlight: false },
  ];

  return (
    <svg viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pc-title">
      <title id="pc-title">Data Center Power Chain — Battery Bank Position</title>
      <rect width="900" height="200" fill="#ffffff" />

      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#0f172a" textAnchor="middle">
        DATA CENTER POWER CHAIN — BATTERY BANK POSITION
      </text>

      {boxes.map((box, i) => {
        const bx = box.x;
        const by = 50;
        const bw = 120;
        const bh = 80;
        const lines = box.label.split("\n");
        const subLines = box.sub.split("\n");
        return (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh} rx="6"
              fill={box.highlight ? "#eaf4ff" : "#f8fafc"}
              stroke={box.highlight ? "#0066CC" : "#94a3b8"}
              strokeWidth={box.highlight ? 2.5 : 1.5}
            />
            {lines.map((line, li) => (
              <text key={li} x={bx + bw / 2} y={by + 30 + li * 18}
                fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700"
                fill={box.highlight ? "#0066CC" : "#0f172a"} textAnchor="middle">
                {line}
              </text>
            ))}
            {subLines.map((line, li) => (
              <text key={li} x={bx + bw / 2} y={by + 56 + li * 14}
                fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">
                {line}
              </text>
            ))}
            {i < boxes.length - 1 && (
              <line x1={bx + bw} y1={by + bh / 2} x2={bx + bw + 35} y2={by + bh / 2}
                stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr)" />
            )}
          </g>
        );
      })}

      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <rect x="465" y="148" width="120" height="20" rx="3" fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.5" />
      <text x="525" y="162" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">
        ← THIS ARTICLE
      </text>

      <text x="450" y="192" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8" textAnchor="middle">
        Battery Bank is connected to UPS DC Bus — provides backup energy when grid fails
      </text>
    </svg>
  );
}
