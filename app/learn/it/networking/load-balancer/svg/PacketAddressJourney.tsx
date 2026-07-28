"use client";
// D9 — Packet Address Journey
export default function PacketAddressJourney() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 310`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Packet address journey showing how source and destination addresses change at each hop"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr9" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="310" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Packet Address Journey</text>

      {/* Headers */}
      {["Client → LB", "At LB (transition)", "LB → Backend"].map((h, i) => (
        <g key={i}>
          <rect x={10+i*158} y="34" width="148" height="22" rx="4" fill="#374151"/>
          <text x={10+i*158+74} y="48" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{h}</text>
        </g>
      ))}

      {/* Scenario A: Full proxy with SNAT */}
      <rect x="10" y="62" width="460" height="96" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="18" y="78" fontSize="9" fontWeight="700" fill="#1d4ed8">Scenario A — Full Proxy / SNAT applied</text>

      {[
        { label: "Src IP", col1: "CLIENT_IP", col2: "→ LB processes", col3: "LB_SNAT_IP", c3fill: "#dc2626" },
        { label: "Src Port", col1: "Client port", col2: "", col3: "LB-assigned", c3fill: "#dc2626" },
        { label: "Dst IP", col1: "VIP_IP", col2: "→ translated", col3: "BACKEND_IP", c3fill: "#dc2626" },
        { label: "Dst Port", col1: "443", col2: "", col3: "8443", c3fill: "#dc2626" },
      ].map((r, i) => (
        <g key={i}>
          <text x="18" y={92+i*15} fontSize="8" fontWeight="600" fill="#374151">{r.label}:</text>
          <text x="80" y={92+i*15} fontSize="8" fontFamily="monospace" fill="#374151">{r.col1}</text>
          <text x="196" y={92+i*15} fontSize="8" fill="#6b7280" fontStyle="italic">{r.col2}</text>
          <text x="340" y={92+i*15} fontSize="8" fontFamily="monospace" fill={r.c3fill} fontWeight="600">{r.col3}</text>
        </g>
      ))}
      <text x="18" y="155" fontSize="7.5" fill="#6b7280">→ Backend sees LB SNAT address — client IP hidden at network layer</text>

      {/* Scenario B: Forwarding no SNAT */}
      <rect x="10" y="164" width="460" height="96" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="18" y="180" fontSize="9" fontWeight="700" fill="#166534">Scenario B — Forwarding Architecture, No SNAT</text>
      <text x="18" y="192" fontSize="7.5" fontStyle="italic" fill="#dc2626">Note: client IP preservation in full-proxy requires transparent proxy mode — not default</text>

      {[
        { label: "Src IP", col1: "CLIENT_IP", col3: "CLIENT_IP", c3fill: "#16a34a" },
        { label: "Src Port", col1: "Client port", col3: "Client port", c3fill: "#16a34a" },
        { label: "Dst IP", col1: "VIP_IP", col3: "BACKEND_IP", c3fill: "#dc2626" },
        { label: "Dst Port", col1: "443", col3: "8443", c3fill: "#dc2626" },
      ].map((r, i) => (
        <g key={i}>
          <text x="18" y={204+i*15} fontSize="8" fontWeight="600" fill="#374151">{r.label}:</text>
          <text x="80" y={204+i*15} fontSize="8" fontFamily="monospace" fill="#374151">{r.col1}</text>
          <text x="340" y={204+i*15} fontSize="8" fontFamily="monospace" fill={r.c3fill} fontWeight="600">{r.col3}</text>
        </g>
      ))}
      <text x="18" y="265" fontSize="7.5" fill="#166534">→ Backend sees original client IP — return routing must be designed to go via LB</text>

      <rect x="10" y="268" width="460" height="34" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="282" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">Address transformation depends on deployment architecture. Verify — do not assume.</text>
      <text x={W/2} y="294" textAnchor="middle" fontSize="8" fill="#92400e">Port can differ (VIP port vs backend port) regardless of IP translation model.</text>
    </svg>
  );
}
