"use client";
export default function MigDiagram() {
  const colors = ["#2563eb","#16a34a","#dc2626","#ca8a04","#7c3aed","#0f766e","#be123c"];
  const labels = ["Team A\n10GB", "Team B\n10GB", "Team C\n10GB", "Team D\n10GB", "Team E\n10GB", "Team F\n10GB", "Team G\n10GB"];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mig-title">
      <title id="mig-title">MIG: One H100 GPU split into up to seven isolated GPU instances, each with their own dedicated compute and GPU memory — hardware-level isolation</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MIG — ONE GPU, MULTIPLE ISOLATED INSTANCES</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Up to seven isolated GPU instances depending on the selected MIG profile (H100)</text>

      {/* Physical GPU */}
      <rect x="20" y="52" width="180" height="230" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="110" y="74" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">PHYSICAL H100 GPU</text>
      <text x="110" y="88" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">One physical chip</text>
      <text x="110" y="100" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">80GB HBM3</text>
      <text x="110" y="112" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">132 SMs total</text>
      <text x="110" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">MIG enabled</text>
      <rect x="36" y="136" width="148" height="130" rx="6" fill="#334155" />
      {Array.from({length:8}).map((_,i) => (
        <rect key={i} x={40+(i%4)*36} y={140+Math.floor(i/4)*60} width="30" height="50" rx="3" fill="#475569" />
      ))}
      <text x="110" y="270" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">SM blocks inside chip</text>

      {/* Arrow */}
      <line x1="202" y1="167" x2="222" y2="167" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#mig1)" />
      <text x="212" y="158" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">MIG</text>

      {/* Instances */}
      {labels.map((label, i) => (
        <g key={i}>
          <rect x="228" y={52 + i * 33} width="572" height="29" rx="6" fill={colors[i]} />
          <text x="244" y={70 + i * 33} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff">Instance {i+1}</text>
          <text x="360" y={70 + i * 33} fontFamily="Arial,sans-serif" fontSize="8" fill="rgba(255,255,255,0.85)">Dedicated SMs · Dedicated GPU Memory · Full Isolation</text>
          <text x="720" y={70 + i * 33} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff">{label.replace("\n"," / ")}</text>
        </g>
      ))}

      <rect x="228" y="287" width="572" height="10" rx="3" fill="#f1f5f9" />
      <text x="514" y="296" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Hardware-level isolation — one instance cannot access another's GPU memory. Safe for multi-tenant production.</text>

      <defs>
        <marker id="mig1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
