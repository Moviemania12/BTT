"use client";
// D6 — Spine-Leaf Architecture: Data Center Fabric
export default function SpineLeafArch() {
  return (
    <svg viewBox="0 0 480 380" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Spine-Leaf data center architecture — every leaf connects to every spine"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height="380" fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Spine-Leaf Architecture</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Every leaf → every spine · ECMP hashing · exactly 2 hops server-to-server</text>

      {/* Spine layer */}
      <text x="240" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">SPINE LAYER</text>
      {["Spine-1", "Spine-2", "Spine-3"].map((s, i) => (
        <g key={i}>
          <rect x={52 + i * 140} y="58" width="108" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x={106 + i * 140} y="77" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">{s}</text>
        </g>
      ))}

      {/* Connections — every leaf to every spine */}
      {[0, 1, 2, 3].map(li => (
        [0, 1, 2].map(si => (
          <line key={`${li}-${si}`}
            x1={82 + li * 90} y1="220"
            x2={106 + si * 140} y2="88"
            stroke={si === 0 ? "#dc2626" : si === 1 ? "#7c3aed" : "#2563eb"}
            strokeWidth="1.2" opacity="0.6"/>
        ))
      ))}

      {/* Leaf layer */}
      <text x="240" y="210" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">LEAF LAYER (ToR Switches)</text>
      {["Leaf-1", "Leaf-2", "Leaf-3", "Leaf-4"].map((l, i) => (
        <g key={i}>
          <rect x={32 + i * 106} y="218" width="90" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x={77 + i * 106} y="235" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e40af">{l}</text>
        </g>
      ))}

      {/* Server connections */}
      {[0, 1, 2, 3].map(li => (
        <g key={li}>
          <line x1={77 + li * 106} y1="246" x2={57 + li * 106} y2="275" stroke="#6b7280" strokeWidth="1"/>
          <line x1={77 + li * 106} y1="246" x2={97 + li * 106} y2="275" stroke="#6b7280" strokeWidth="1"/>
          <rect x={32 + li * 106} y="275" width="38" height="24" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="1"/>
          <text x={51 + li * 106} y="290" textAnchor="middle" fontSize="8.5" fill="#374151">Svr-A</text>
          <rect x={78 + li * 106} y="275" width="38" height="24" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="1"/>
          <text x={97 + li * 106} y="290" textAnchor="middle" fontSize="8.5" fill="#374151">Svr-B</text>
        </g>
      ))}

      {/* ECMP note */}
      <rect x="10" y="312" width="460" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="323" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">ECMP: Deterministic hashing — all spine paths simultaneously active</text>
      <text x="240" y="335" textAnchor="middle" fontSize="9" fill="#92400e">Within a given fabric · Very large environments may use multiple pods or fabrics</text>

      {/* 2-hop annotation */}
      <rect x="10" y="346" width="460" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="240" y="362" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#15803d">Svr-A → Leaf-1 → [Any Spine] → Leaf-4 → Svr-H = ALWAYS 2 hops · predictable latency</text>
    </svg>
  );
}
