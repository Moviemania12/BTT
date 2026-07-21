"use client";
// Diagram 3 — Enterprise Dual-Fabric SAN Architecture (CORRECTED)
// Both controllers have front-end ports on BOTH fabrics.
// Future image: /public/images/articles/san/san-dual-fabric-architecture.png
export default function SanDualFabric() {
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Enterprise dual-fabric SAN architecture — both controllers on both fabrics"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="400" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Enterprise Dual-Fabric SAN Architecture — Generic Design</text>
      <rect x="80" y="30" width="700" height="16" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="430" y="42" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="600">Mission-critical FC SAN commonly uses two independent fabrics. Scale-out/distributed architectures differ — verify with vendor docs.</text>

      {/* Servers row */}
      {["Server 1\n(HBA×2)","Server 2\n(HBA×2)","ESXi Host\n(HBA×2)","DB Server\n(HBA×2)"].map((s,i) => (
        <g key={i}>
          <rect x={50+i*190} y="54" width="150" height="36" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
          <text x={125+i*190} y="69" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">{s.split("\n")[0]}</text>
          <text x={125+i*190} y="82" textAnchor="middle" fontSize="8" fill="#1d4ed8">{s.split("\n")[1]}</text>
        </g>
      ))}

      {/* HBA arrows to fabrics */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <line x1={100+i*190} y1="90" x2={120+i*50} y2="130" stroke="#2563eb" strokeWidth="1" opacity="0.6"/>
          <line x1={150+i*190} y1="90" x2={680-i*50} y2="130" stroke="#dc2626" strokeWidth="1" opacity="0.6"/>
        </g>
      ))}

      {/* Fabric A */}
      <rect x="30" y="130" width="300" height="50" rx="7" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="180" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Fabric A</text>
      <text x="180" y="168" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">SAN Switch A1 — SAN Switch A2 (ISL)</text>
      <text x="180" y="178" textAnchor="middle" fontSize="7.5" fill="#6b7280">Independent failure domain</text>

      {/* Fabric B */}
      <rect x="530" y="130" width="300" height="50" rx="7" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <text x="680" y="152" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">Fabric B</text>
      <text x="680" y="168" textAnchor="middle" fontSize="8.5" fill="#b91c1c">SAN Switch B1 — SAN Switch B2 (ISL)</text>
      <text x="680" y="178" textAnchor="middle" fontSize="7.5" fill="#6b7280">Independent failure domain</text>

      {/* Storage Array */}
      <rect x="120" y="222" width="620" height="128" rx="9" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="430" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">Storage Array</text>

      {/* Controller A */}
      <rect x="140" y="252" width="240" height="68" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2"/>
      <text x="260" y="270" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Controller A</text>
      <rect x="152" y="278" width="96" height="16" rx="3" fill="#4ade80" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="200" y="290" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="600">FA-Port-A1 → Fabric A</text>
      <rect x="272" y="278" width="96" height="16" rx="3" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="320" y="290" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="600">FA-Port-B1 → Fabric B</text>
      <text x="260" y="312" textAnchor="middle" fontSize="7.5" fill="#6b7280">Ports on BOTH fabrics</text>

      {/* Controller B */}
      <rect x="480" y="252" width="240" height="68" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2"/>
      <text x="600" y="270" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Controller B</text>
      <rect x="492" y="278" width="96" height="16" rx="3" fill="#4ade80" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="540" y="290" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="600">FB-Port-A1 → Fabric A</text>
      <rect x="612" y="278" width="96" height="16" rx="3" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="660" y="290" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="600">FB-Port-B1 → Fabric B</text>
      <text x="600" y="312" textAnchor="middle" fontSize="7.5" fill="#6b7280">Ports on BOTH fabrics</text>

      {/* Shared storage */}
      <rect x="140" y="328" width="580" height="16" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="430" y="340" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Shared Storage Pool / RAID / Drives (physical media)</text>

      {/* Cross-fabric connections */}
      <line x1="180" y1="180" x2="200" y2="252" stroke="#2563eb" strokeWidth="1.5" opacity="0.7"/>
      <line x1="180" y1="180" x2="540" y2="252" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,2" opacity="0.5"/>
      <line x1="680" y1="180" x2="600" y2="252" stroke="#dc2626" strokeWidth="1.5" opacity="0.7"/>
      <line x1="680" y1="180" x2="320" y2="252" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,2" opacity="0.5"/>

      {/* Annotations */}
      <text x="430" y="218" textAnchor="middle" fontSize="7.5" fill="#374151" fontWeight="600">From Fabric A → both Ctrl A and Ctrl B front-end ports reachable. Same for Fabric B.</text>
      <text x="430" y="388" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-dual-fabric-architecture.png</text>
    </svg>
  );
}
