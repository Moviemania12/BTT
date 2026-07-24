"use client";
// D20 — DC Border Architecture: North-South vs East-West traffic paths
export default function DcBorderArchitecture() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 420`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Data center border architecture with North-South and East-West traffic"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="420" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">DC Border Architecture</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#6b7280">North-South (Internet/WAN) vs East-West (within DC fabric)</text>
      {/* Internet/WAN */}
      <rect x="140" y="44" width="200" height="26" rx="6" fill="#374151"/>
      <text x={W/2} y="59" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Internet / WAN / MPLS</text>
      <line x1={W/2} y1="70" x2={W/2} y2="84" stroke="#dc2626" strokeWidth="2"/>
      <text x="260" y="80" fontSize="8" fill="#dc2626">N↓S</text>
      {/* Border Router */}
      <rect x="80" y="84" width="320" height="50" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x={W/2} y="101" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#dc2626">DC Border Router(s)</text>
      <text x={W/2} y="116" textAnchor="middle" fontSize="8" fill="#374151">eBGP peers with ISPs | Route policy | NAT (if private addresses) | ACL/prefix filtering | QoS marking</text>
      <line x1={W/2} y1="134" x2={W/2} y2="148" stroke="#dc2626" strokeWidth="2"/>
      {/* Spine */}
      <rect x="20" y="148" width={W-40} height="44" rx="7" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="2"/>
      <text x={W/2} y="165" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0ea5e9">Spine Layer — ECMP Fabric</text>
      <text x={W/2} y="180" textAnchor="middle" fontSize="8" fill="#374151">Spine-1 · Spine-2 · Spine-3 · Spine-4 — all paths active for East-West ECMP</text>
      <line x1={W/2} y1="192" x2={W/2} y2="208" stroke="#dc2626" strokeWidth="2"/>
      {/* Leaf */}
      <rect x="20" y="208" width={W-40} height="36" rx="7" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x={W/2} y="224" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#8b5cf6">Leaf Layer (ToR Switches)</text>
      <text x={W/2} y="237" textAnchor="middle" fontSize="8" fill="#374151">Leaf-1 · Leaf-2 · Leaf-3 · ... · Leaf-N — server access</text>
      <line x1={W/2} y1="244" x2={W/2} y2="258" stroke="#8b5cf6" strokeWidth="1.5"/>
      {/* Servers */}
      <rect x="80" y="258" width={W-160} height="26" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x={W/2} y="274" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">Server Racks</text>
      {/* Traffic paths */}
      <rect x="10" y="296" width={W-20} height="80" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="312" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Traffic Paths</text>
      <text x="18" y="328" fontSize="8.5" fontWeight="700" fill="#dc2626">North-South ↕:</text>
      <text x="130" y="328" fontSize="8.5" fill="#374151">Internet → Border Router → Spine → Leaf → Server (and reverse)</text>
      <text x="18" y="344" fontSize="8.5" fontWeight="700" fill="#0ea5e9">East-West ↔:</text>
      <text x="130" y="344" fontSize="8.5" fill="#374151">Server-A → Leaf-1 → Spine → Leaf-2 → Server-B (does NOT traverse border router)</text>
      <text x="18" y="362" fontSize="8" fontStyle="italic" fill="#6b7280">BGP between Border and Spine, or Border and Leaf: depends on design. Default route vs full table: depends on scale.</text>
    </svg>
  );
}
