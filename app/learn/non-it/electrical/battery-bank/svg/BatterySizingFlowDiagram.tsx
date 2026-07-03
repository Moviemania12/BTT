"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/svg/BatterySizingFlowDiagram.tsx
//
// Blueprint SVG — Battery Sizing Methodology Flow
// 13-step sizing pipeline from load to final bank design
// ═══════════════════════════════════════════════════════════════════════════

export default function BatterySizingFlowDiagram() {
  const steps = [
    { n: "1", label: "Determine Load (kW)", sub: "Server + Network + Lighting" },
    { n: "2", label: "Choose Runtime", sub: "10 min / 15 min / 30 min" },
    { n: "3", label: "Choose Bus Voltage", sub: "48V / 96V / 192V / 384V" },
    { n: "4", label: "Choose DoD", sub: "VRLA: 80% | LFP: 90%" },
    { n: "5", label: "Apply Efficiency η", sub: "Typically 0.92–0.96" },
    { n: "6", label: "Apply Temp Factor", sub: "India: 0.75–0.85 typical" },
    { n: "7", label: "Apply Age Factor", sub: "÷ 0.80 for EOL safety" },
    { n: "8", label: "Calculate Ah", sub: "Core sizing formula" },
    { n: "9", label: "Choose Cell Spec", sub: "V per cell, Ah per cell" },
    { n: "10", label: "Cells per String", sub: "Bus V ÷ Cell V" },
    { n: "11", label: "Parallel Strings", sub: "Req. Ah ÷ Cell Ah" },
    { n: "12", label: "Apply Redundancy", sub: "N+1 or 2N" },
    { n: "13", label: "Final Bank Design", sub: "Strings × Cells × Ah" },
  ];

  const cols = 4;
  const boxW = 180;
  const boxH = 52;
  const gapX = 28;
  const gapY = 22;
  const startX = 30;
  const startY = 48;

  return (
    <svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="bsf-title">
      <title id="bsf-title">Battery Sizing Methodology — 13-Step Flow</title>
      <rect width="860" height="340" fill="#ffffff" />
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        BATTERY SIZING METHODOLOGY — 13-STEP FLOW
      </text>

      {steps.map((step, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (boxW + gapX);
        const y = startY + row * (boxH + gapY);
        const isLast = i === steps.length - 1;

        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx="7"
              fill={isLast ? "#f0fdf4" : "#eaf4ff"}
              stroke={isLast ? "#16a34a" : "#0066CC"}
              strokeWidth={isLast ? 2.5 : 1.8} />
            <text x={x + 14} y={y + 18} fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800"
              fill={isLast ? "#16a34a" : "#0066CC"}>{step.n}</text>
            <text x={x + 32} y={y + 19} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700"
              fill="#0f172a">{step.label}</text>
            <text x={x + 32} y={y + 35} fontFamily="Arial,sans-serif" fontSize="8.5"
              fill="#64748b">{step.sub}</text>

            {/* Arrow to next — horizontal within row */}
            {col < cols - 1 && i < steps.length - 1 && (
              <line x1={x + boxW} y1={y + boxH / 2} x2={x + boxW + gapX} y2={y + boxH / 2}
                stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr2)" />
            )}
            {/* Arrow down at end of row */}
            {col === cols - 1 && i < steps.length - 1 && (
              <>
                <line x1={x + boxW / 2} y1={y + boxH} x2={x + boxW / 2} y2={y + boxH + gapY}
                  stroke="#94a3b8" strokeWidth="1.5" />
                <line x1={x + boxW / 2} y1={y + boxH + gapY}
                  x2={startX + boxW / 2} y2={y + boxH + gapY}
                  stroke="#94a3b8" strokeWidth="1.5" />
                <line x1={startX + boxW / 2} y1={y + boxH + gapY}
                  x2={startX + boxW / 2} y2={y + boxH + gapY + 2}
                  stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr2)" />
              </>
            )}
          </g>
        );
      })}

      <defs>
        <marker id="arr2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Key formula box */}
      <rect x="30" y="290" width="800" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="307" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">
        Core Formula (Step 8):
      </text>
      <text x="430" y="322" fontFamily="Arial,sans-serif" fontSize="10" fill="#78350f" textAnchor="middle">
        Ah = (Load_W × Runtime_hr) ÷ (V_bus × DoD × η × Temp_factor × Age_factor)
      </text>
    </svg>
  );
}
