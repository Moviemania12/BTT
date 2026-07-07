"use client";
export default function DcPowerFlowDiagram() {
  const steps = [
    { label: "GRID", sub: "11kV/33kV", x: 20, highlight: false },
    { label: "TRANSFORMER", sub: "11kV→415V", x: 165, highlight: false },
    { label: "UPS", sub: "Online\nDouble Conv.", x: 310, highlight: false },
    { label: "STS", sub: "A/B\nSwitching", x: 455, highlight: false },
    { label: "PDU", sub: "Distribution\n+ Metering", x: 600, highlight: true },
    { label: "RACK PDU", sub: "Outlet\nLevel", x: 745, highlight: true },
    { label: "SERVER", sub: "IT Load", x: 890, highlight: false },
  ];
  const W = 120; const H = 72; const Y = 60;
  return (
    <svg viewBox="0 0 1060 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pf-title">
      <title id="pf-title">Data Center Power Flow — Grid to Server via PDU</title>
      <rect width="1060" height="200" fill="#fff"/>
      <text x="530" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        COMPLETE DATA CENTER POWER FLOW
      </text>
      <defs>
        <marker id="arw" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6Z" fill="#94a3b8"/>
        </marker>
      </defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={Y} width={W} height={H} rx="6"
            fill={s.highlight ? "#eaf4ff" : "#f8fafc"}
            stroke={s.highlight ? "#0066CC" : "#94a3b8"}
            strokeWidth={s.highlight ? 2.5 : 1.5}/>
          {s.label.split("\n").map((ln, li) => (
            <text key={li} x={s.x+W/2} y={Y+22+li*16} fontFamily="Arial,sans-serif"
              fontSize="10" fontWeight="700" fill={s.highlight?"#0066CC":"#0f172a"} textAnchor="middle">{ln}</text>
          ))}
          {s.sub.split("\n").map((ln, li) => (
            <text key={li} x={s.x+W/2} y={Y+50+li*13} fontFamily="Arial,sans-serif"
              fontSize="9" fill="#64748b" textAnchor="middle">{ln}</text>
          ))}
          {i < steps.length-1 && (
            <line x1={s.x+W} y1={Y+H/2} x2={s.x+W+25} y2={Y+H/2}
              stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arw)"/>
          )}
        </g>
      ))}
      <rect x="595" y="148" width="280" height="18" rx="3" fill="#eaf4ff" stroke="#bfdbfe"/>
      <text x="735" y="161" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" textAnchor="middle">
        ← PDU + Rack PDU — THIS ARTICLE
      </text>
      <text x="530" y="192" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        PDU receives UPS/STS output and distributes to individual racks — Rack PDU feeds individual servers
      </text>
    </svg>
  );
}
