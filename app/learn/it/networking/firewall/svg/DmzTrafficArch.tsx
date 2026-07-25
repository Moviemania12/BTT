"use client";
export default function DmzTrafficArch() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DMZ traffic architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="360" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">DMZ Traffic Architecture</text>
      {[
        { label:"Internet (Untrusted)", color:"#dc2626", y:36, w:200 },
        { label:"Firewall", color:"#374151", y:86, w:140 },
        { label:"DMZ — Reverse Proxy / Web Frontend", color:"#f59e0b", y:136, w:280 },
        { label:"Firewall Policy (specific port only)", color:"#374151", y:186, w:200 },
        { label:"Internal Application Tier", color:"#8b5cf6", y:236, w:240 },
        { label:"Firewall Policy (DB port only)", color:"#374151", y:286, w:180 },
      ].map((l,i) => (
        <g key={i}>
          <rect x={(480-l.w)/2} y={l.y} width={l.w} height="30" rx="6" fill={l.color} opacity="0.9"/>
          <text x="240" y={l.y+18} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">{l.label}</text>
          {i < 5 && <line x1="240" y1={l.y+30} x2="240" y2={l.y+50} stroke="#9ca3af" strokeWidth="1.5"/>}
        </g>
      ))}
      <line x1="80" y1="51" x2="160" y2="136" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="85" y="108" fontSize="8" fill="#dc2626" fontWeight="700">X BLOCKED</text>
      <text x="20" y="120" fontSize="7.5" fill="#dc2626">Internet</text>
      <text x="20" y="132" fontSize="7.5" fill="#dc2626">→ App direct</text>
      <line x1="80" y1="51" x2="130" y2="236" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="25" y="180" fontSize="7.5" fill="#dc2626">Internet</text>
      <text x="25" y="192" fontSize="7.5" fill="#dc2626">→ DB direct</text>
      <text x="25" y="204" fontSize="7" fill="#dc2626">X BLOCKED</text>
      <rect x="10" y="324" width="460" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="338" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">DMZ is NOT inherently secure — security depends on what traffic is permitted across each boundary.</text>
      <text x="240" y="350" textAnchor="middle" fontSize="8" fill="#92400e">DMZ → entire internal network MUST NOT be permitted. Each tier boundary requires explicit restrictive policy.</text>
    </svg>
  );
}
