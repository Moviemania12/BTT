"use client";
// D7 — Data Center Load Balancer Placement
export default function DcLbPlacement() {
  const W = 480;
  const tiers = [
    { label: "Internet / WAN", sub: "", fill: "#374151", textFill: "#fff" },
    { label: "Edge Router(s)", sub: "BGP border", fill: "#4b5563", textFill: "#fff" },
    { label: "Firewall(s)", sub: "Security enforcement", fill: "#dc2626", textFill: "#fff" },
    { label: "Load Balancer(s)", sub: "Service distribution", fill: "#d97706", textFill: "#fff" },
    { label: "Web / Application Servers", sub: "Application tier", fill: "#16a34a", textFill: "#fff" },
    { label: "Database / Storage", sub: "Data tier", fill: "#1d4ed8", textFill: "#fff" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 330`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Data center load balancer placement showing tier architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr7" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="330" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Data Center Load Balancer Placement</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">Example architecture — not a universal mandatory design</text>

      {tiers.map((t, i) => (
        <g key={i}>
          <rect x="80" y={44+i*38} width="280" height="28" rx="6" fill={t.fill}/>
          <text x={W/2} y={60+i*38} textAnchor="middle" fontSize="10" fontWeight="700" fill={t.textFill}>{t.label}</text>
          {t.sub && <text x={W/2} y={69+i*38} textAnchor="middle" fontSize="8" fill={i===3?"#fef3c7":"rgba(255,255,255,0.8)"}>{t.sub}</text>}
          {i < tiers.length - 1 && (
            <line x1={W/2} y1={72+i*38} x2={W/2} y2={82+i*38} stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr7)"/>
          )}
        </g>
      ))}

      {/* Internal LB annotation */}
      <rect x="370" y="160" width="100" height="40" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="420" y="175" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">Internal LBs</text>
      <text x="420" y="187" textAnchor="middle" fontSize="7.5" fill="#374151">also between</text>
      <text x="420" y="197" textAnchor="middle" fontSize="7.5" fill="#374151">app ↔ database</text>
      <line x1="370" y1="180" x2="360" y2="200" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,2"/>

      <rect x="10" y="278" width="460" height="42" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="294" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Design Notes</text>
      <text x="18" y="308" fontSize="8" fill="#374151">• LB may be combined with Firewall on same platform in some designs</text>
      <text x="18" y="318" fontSize="8" fill="#374151">• Internal LBs used for microservices, internal APIs, app-to-database — same LB principles apply</text>
    </svg>
  );
}
