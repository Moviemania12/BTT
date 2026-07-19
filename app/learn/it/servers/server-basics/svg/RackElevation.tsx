"use client";
export default function RackElevation() {
  // 12U visible rack showing mixed equipment
  const items = [
    { u: 1, h: 1, label: "Rack PDU (A-feed)", color: "#f1f5f9", border: "#94a3b8", tc: "#374151" },
    { u: 2, h: 1, label: "Patch Panel — 24-port", color: "#fef3c7", border: "#f59e0b", tc: "#78350f" },
    { u: 3, h: 1, label: "ToR Network Switch", color: "#fef3c7", border: "#f59e0b", tc: "#78350f" },
    { u: 4, h: 1, label: "1U Server (Web / API)", color: "#eff6ff", border: "#2563eb", tc: "#1e40af" },
    { u: 5, h: 1, label: "1U Server (Web / API)", color: "#eff6ff", border: "#2563eb", tc: "#1e40af" },
    { u: 6, h: 2, label: "2U Server (Database / Storage)", color: "#f0fdf4", border: "#16a34a", tc: "#166534" },
    { u: 8, h: 1, label: "Blanking Panel (empty U)", color: "#f9fafb", border: "#d1d5db", tc: "#9ca3af" },
    { u: 9, h: 2, label: "2U Server (Virtualisation Host)", color: "#f0fdf4", border: "#16a34a", tc: "#166534" },
    { u: 11, h: 1, label: "Patch Panel — Fibre", color: "#fef3c7", border: "#f59e0b", tc: "#78350f" },
    { u: 12, h: 1, label: "Rack PDU (B-feed)", color: "#f1f5f9", border: "#94a3b8", tc: "#374151" },
  ];
  const RACK_TOP = 50; const UH = 26; const LEFT = 80; const W = 560;
  return (
    <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rack elevation showing 12U with 1U servers, 2U server, switches, patch panels, blanking panel and PDUs">
      <rect width="800" height="420" fill="#fff"/>
      <text x="400" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Rack Elevation — Illustrative 12U Example</text>
      {/* Rack outline */}
      <rect x={LEFT-14} y={RACK_TOP-4} width={W+28} height={12*UH+8} rx="4" fill="#f8fafc" stroke="#374151" strokeWidth="2"/>
      {/* U ruler */}
      {Array.from({length:12},(_,i)=>{
        const u=i+1; const y=RACK_TOP+i*UH;
        return <g key={u}>
          <text x={LEFT-18} y={y+17} textAnchor="end" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">{u}U</text>
          <line x1={LEFT} y1={y} x2={LEFT+W} y2={y} stroke="#e5e7eb" strokeWidth="0.5"/>
        </g>;
      })}
      {/* Equipment */}
      {items.map((it,i)=>{
        const y=RACK_TOP+(it.u-1)*UH; const h=it.h*UH-2;
        return <g key={i}>
          <rect x={LEFT} y={y+1} width={W} height={h} rx="3" fill={it.color} stroke={it.border} strokeWidth="1.5"/>
          <text x={LEFT+10} y={y+h/2+4} fontFamily="Arial,sans-serif" fontSize="10.5" fontWeight="600" fill={it.tc}>{it.label}</text>
          <text x={LEFT+W-6} y={y+h/2+4} textAnchor="end" fontFamily="Arial,sans-serif" fontSize="9" fill={it.border}>{it.h}U</text>
        </g>;
      })}
      {/* Legend */}
      {[
        {c:"#eff6ff",b:"#2563eb",l:"1U Server"},
        {c:"#f0fdf4",b:"#16a34a",l:"2U Server"},
        {c:"#fef3c7",b:"#f59e0b",l:"Network / Patch"},
        {c:"#f1f5f9",b:"#94a3b8",l:"PDU"},
        {c:"#f9fafb",b:"#d1d5db",l:"Blanking Panel"},
      ].map((l,i)=>(
        <g key={i}>
          <rect x={660} y={60+i*28} width={16} height={16} rx="3" fill={l.c} stroke={l.b} strokeWidth="1.5"/>
          <text x={682} y={72+i*28} fontFamily="Arial,sans-serif" fontSize="10" fill="#374151">{l.l}</text>
        </g>
      ))}
      <text x="400" y="410" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">1U = 1.75 in / 44.45 mm. Actual deployable server count is limited by power, cooling, weight and connectivity—not U slots alone.</text>
    </svg>
  );
}
