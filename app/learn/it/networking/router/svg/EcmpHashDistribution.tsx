"use client";
// D9 — ECMP Hash Distribution: per-flow hashing, not round-robin
export default function EcmpHashDistribution() {
  const W = 480;
  const flows = [
    { id:"A", src:"192.168.1.10:45123", dst:"10.0.2.5:80", path:"Path 1", color:"#0ea5e9" },
    { id:"B", src:"192.168.1.11:52000", dst:"10.0.2.10:443", path:"Path 2", color:"#8b5cf6" },
    { id:"C", src:"192.168.1.12:33000", dst:"10.0.2.20:22", path:"Path 3", color:"#16a34a" },
    { id:"D", src:"192.168.1.10:51000", dst:"10.0.2.5:443", path:"Path 1", color:"#0ea5e9" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="ECMP hash-based per-flow load distribution"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">ECMP — Hash-Based Per-Flow Distribution</text>
      {/* FIB entry */}
      <rect x="10" y="34" width={W-20} height="56" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x={W/2} y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#16a34a">FIB: Destination 10.0.2.0/24 — ECMP</text>
      <text x={W/2} y="64" textAnchor="middle" fontSize="8.5" fill="#374151">Path 1: via 10.0.1.2, Gi0/1 (cost 10) | Path 2: via 10.0.3.2, Gi0/2 (cost 10) | Path 3: via 10.0.5.2, Gi0/3 (cost 10)</text>
      <text x={W/2} y="79" textAnchor="middle" fontSize="8" fill="#6b7280">Equal cost → all 3 paths installed | Max paths: platform/configuration dependent</text>
      <text x={W/2} y="83" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#9ca3af">Hash inputs (src IP, dst IP, ports, protocol) → per-flow assignment — platform dependent</text>
      {/* Flow table */}
      <text x="14" y="107" fontSize="9.5" fontWeight="700" fill="#374151">Per-Flow Hash Assignment:</text>
      <rect x="10" y="112" width={W-20} height="20" rx="3" fill="#e5e7eb"/>
      <text x="24" y="125" fontSize="8.5" fontWeight="700" fill="#374151">Flow</text>
      <text x="80" y="125" fontSize="8.5" fontWeight="700" fill="#374151">Source → Destination</text>
      <text x="340" y="125" fontSize="8.5" fontWeight="700" fill="#374151">Hash → Path</text>
      {flows.map((f, i) => (
        <g key={i}>
          <rect x="10" y={132+i*24} width={W-20} height="22" rx="3" fill={i%2===0?"#fff":"#f9fafb"}/>
          <rect x="10" y={132+i*24} width="50" height="22" rx="3" fill={f.color}/>
          <text x="35" y={132+i*24+14} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Flow {f.id}</text>
          <text x="80" y={132+i*24+14} fontSize="8" fill="#374151" fontFamily="monospace">{f.src} → {f.dst}</text>
          <text x="340" y={132+i*24+14} fontSize="8.5" fontWeight="700" fill={f.color}>{f.path}</text>
        </g>
      ))}
      {/* Key notes */}
      <rect x="10" y="238" width={W-20} height="90" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="254" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Engineering Notes</text>
      {[
        "ECMP distributes across multiple flows — NOT round-robin per packet",
        "Flow A and Flow D: same src IP → same path (hash collision possible)",
        "Single large TCP flow: uses ONE path — aggregate bandwidth NOT available to one flow",
        "Hash polarization across multiple ECMP tiers: platform-dependent mitigation",
        "BGP ECMP requires explicit configuration + platform support",
      ].map((n, i) => (
        <text key={i} x="18" y={266+i*16} fontSize="8.5" fill={i===0||i===2?"#dc2626":"#374151"}>• {n}</text>
      ))}
    </svg>
  );
}
