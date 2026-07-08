"use client";
export default function SpdInstallationDiagram() {
  const nodes = [
    { label: "GRID", sub: "Utility", x: 20 },
    { label: "TRANSFORMER", sub: "11kV→415V", x: 150 },
    { label: "RMU", sub: "Ring Main", x: 300 },
    { label: "UPS", sub: "Backup", x: 450 },
    { label: "PDU", sub: "Distribution", x: 600 },
    { label: "RACK", sub: "IT Load", x: 750 },
  ];
  const spds = [
    { label: "Type 1", x: 260, color: "#dc2626" },
    { label: "Type 2", x: 410, color: "#f97316" },
    { label: "Type 2", x: 560, color: "#f97316" },
    { label: "Type 3", x: 710, color: "#16a34a" },
  ];
  return (
    <svg viewBox="0 0 850 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="spd-title">
      <title id="spd-title">SPD Installation Locations — Type 1, 2, 3 in Data Center Power Chain</title>
      <rect width="850" height="240" fill="#fff"/>
      <text x="425" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        SPD INSTALLATION — TYPE 1 / 2 / 3 CASCADE
      </text>
      <defs>
        <marker id="spdarw" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6Z" fill="#94a3b8"/>
        </marker>
      </defs>
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y="60" width="90" height="55" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
          <text x={n.x+45} y="82" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0f172a" textAnchor="middle">{n.label}</text>
          <text x={n.x+45} y="97" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">{n.sub}</text>
          {i < nodes.length-1 && (
            <line x1={n.x+90} y1="87" x2={n.x+120} y2="87" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#spdarw)"/>
          )}
        </g>
      ))}
      {spds.map((s, i) => (
        <g key={i}>
          <line x1={s.x} y1="115" x2={s.x} y2="150" stroke={s.color} strokeWidth="2"/>
          <rect x={s.x-32} y="150" width="64" height="34" rx="4" fill="#fff" stroke={s.color} strokeWidth="2"/>
          <text x={s.x} y="167" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">SPD</text>
          <text x={s.x} y="179" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label}</text>
        </g>
      ))}
      <text x="260" y="210" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#991b1b" textAnchor="middle">High energy —</text>
      <text x="260" y="221" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#991b1b" textAnchor="middle">direct strike current</text>
      <text x="485" y="210" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Residual surge —</text>
      <text x="485" y="221" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">distribution level</text>
      <text x="710" y="210" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">Fine protection —</text>
      <text x="710" y="221" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">sensitive electronics</text>
    </svg>
  );
}
