"use client";
export default function FinalArchitectureDiagram() {
  return (
    <svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fa-title">
      <title id="fa-title">Complete SD-WAN Enterprise Architecture</title>
      <rect width="860" height="480" fill="#ffffff" />

      <text x="430" y="24" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        COMPLETE SD-WAN ENTERPRISE ARCHITECTURE
      </text>

      {/* Management Plane */}
      <rect x="250" y="36" width="360" height="30" rx="6" fill="#fdf4ff" stroke="#a21caf" strokeWidth="1.5" />
      <text x="430" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#701a75" textAnchor="middle">
        MANAGEMENT PLANE — Orchestrator / Analytics (Cloud or On-Premises)
      </text>

      {/* Branch boxes */}
      {[
        { x: 10, y: 90, label: "BRANCH A", mpls: true, inet: true, lte: false },
        { x: 10, y: 220, label: "BRANCH B", mpls: false, inet: true, lte: true },
        { x: 10, y: 340, label: "BRANCH C", mpls: true, inet: true, lte: true },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={130} height={100} rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="1.5" />
          <text x={b.x + 65} y={b.y + 18} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">{b.label}</text>
          <rect x={b.x + 8} y={b.y + 26} width={114} height={18} rx="3" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x={b.x + 65} y={b.y + 39} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">SD-WAN Edge</text>
          <rect x={b.x + 8} y={b.y + 50} width={114} height={14} rx="3" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
          <text x={b.x + 65} y={b.y + 61} fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Users / LAN</text>
          <text x={b.x + 8} y={b.y + 84} fontFamily="Arial,sans-serif" fontSize="7" fill="#6b7280">
            {[b.mpls && "MPLS", b.inet && "Internet", b.lte && "LTE"].filter(Boolean).join(" + ")}
          </text>
          <text x={b.x + 8} y={b.y + 96} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9ca3af">DIA for SaaS where configured</text>
        </g>
      ))}

      {/* MPLS cloud */}
      <ellipse cx="270" cy="140" rx="55" ry="28" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="270" y="136" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">MPLS</text>
      <text x="270" y="149" fontFamily="Arial,sans-serif" fontSize="7" fill="#78350f" textAnchor="middle">Provider</text>

      {/* Internet cloud */}
      <ellipse cx="270" cy="265" rx="55" ry="28" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="270" y="261" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Internet</text>
      <text x="270" y="274" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Public</text>

      {/* LTE cloud */}
      <ellipse cx="270" cy="390" rx="55" ry="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="270" y="386" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">LTE/5G</text>
      <text x="270" y="399" fontFamily="Arial,sans-serif" fontSize="7" fill="#15803d" textAnchor="middle">Wireless</text>

      {/* Branch A to transports */}
      <line x1="140" y1="130" x2="215" y2="140" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="140" y1="150" x2="215" y2="255" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* Branch B to transports */}
      <line x1="140" y1="260" x2="215" y2="260" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="140" y1="280" x2="215" y2="378" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* Branch C to transports */}
      <line x1="140" y1="368" x2="215" y2="155" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="140" y1="380" x2="215" y2="278" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="140" y1="400" x2="215" y2="403" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* SD-WAN Overlay box */}
      <rect x="350" y="200" width="130" height="100" rx="8" fill="#fef9e7" stroke="#d97706" strokeWidth="2" />
      <text x="415" y="222" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">SD-WAN</text>
      <text x="415" y="235" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">OVERLAY</text>
      <text x="415" y="252" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Policy-driven</text>
      <text x="415" y="264" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">path selection</text>
      <text x="415" y="278" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">Latency/jitter/loss</text>
      <text x="415" y="292" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#78350f" textAnchor="middle">continuously measured</text>

      {/* Transports to Overlay */}
      <line x1="325" y1="140" x2="355" y2="220" stroke="#d97706" strokeWidth="1.5" />
      <line x1="325" y1="265" x2="352" y2="248" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="325" y1="390" x2="355" y2="286" stroke="#16a34a" strokeWidth="1.5" />

      {/* DC block */}
      <rect x="520" y="110" width="320" height="300" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="680" y="132" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">DATA CENTER</text>

      {/* DC SD-WAN Edge HA */}
      <rect x="536" y="146" width="148" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="610" y="164" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">SD-WAN EDGE</text>
      <text x="610" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">HA Pair (Active/Standby)</text>
      <text x="610" y="190" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Tunnel termination</text>

      {/* Firewall */}
      <rect x="536" y="212" width="148" height="44" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="610" y="230" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">FIREWALL (NGFW)</text>
      <text x="610" y="245" fontFamily="Arial,sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle">Security policy / inspection</text>
      <text x="610" y="250" fontFamily="Arial,sans-serif" fontSize="7" fill="#991b1b" textAnchor="middle"> </text>

      {/* Load Balancer */}
      <rect x="536" y="270" width="148" height="40" rx="6" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="610" y="288" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">LOAD BALANCER</text>
      <text x="610" y="302" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Traffic distribution</text>

      {/* App Servers */}
      <rect x="536" y="324" width="148" height="72" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="610" y="342" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151" textAnchor="middle">APP SERVERS</text>
      <rect x="548" y="350" width="40" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      <text x="568" y="363" fontFamily="Arial,sans-serif" fontSize="7" fill="#374151" textAnchor="middle">App 1</text>
      <rect x="596" y="350" width="40" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      <text x="616" y="363" fontFamily="Arial,sans-serif" fontSize="7" fill="#374151" textAnchor="middle">App 2</text>
      <rect x="572" y="372" width="40" height="18" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
      <text x="592" y="385" fontFamily="Arial,sans-serif" fontSize="7" fill="#374151" textAnchor="middle">DB</text>

      {/* Cloud / SaaS */}
      <rect x="712" y="160" width="112" height="80" rx="8" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="768" y="178" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0c4a6e" textAnchor="middle">CLOUD / SaaS</text>
      <text x="768" y="194" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#075985" textAnchor="middle">AWS / Azure</text>
      <text x="768" y="208" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#075985" textAnchor="middle">Office 365</text>
      <text x="768" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#075985" textAnchor="middle">Salesforce</text>
      <text x="768" y="235" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">DIA from branch</text>

      {/* Overlay to DC arrow */}
      <line x1="480" y1="250" x2="520" y2="170" stroke="#d97706" strokeWidth="2" markerEnd="url(#fa-arr)" />

      {/* DC internal arrows */}
      <line x1="610" y1="196" x2="610" y2="212" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fa-arr)" />
      <line x1="610" y1="256" x2="610" y2="270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fa-arr)" />
      <line x1="610" y1="310" x2="610" y2="324" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#fa-arr)" />

      {/* Management plane connections */}
      <line x1="430" y1="66" x2="680" y2="110" stroke="#a21caf" strokeWidth="1" strokeDasharray="4,3" opacity="0.7" />
      <line x1="430" y1="66" x2="415" y2="200" stroke="#a21caf" strokeWidth="1" strokeDasharray="4,3" opacity="0.7" />

      {/* Legend */}
      <rect x="10" y="450" width="840" height="22" rx="4" fill="#f8fafc" />
      <text x="20" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#d97706">─── MPLS</text>
      <text x="80" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#3b82f6">─── Internet</text>
      <text x="150" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a">─── LTE/5G</text>
      <text x="220" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#d97706">─── SD-WAN Overlay</text>
      <text x="330" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#a21caf">- - - Management Plane</text>
      <text x="460" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b">─── DC Internal</text>
      <text x="540" y="465" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">Actual HA, controller architecture, and path count vary by platform and design</text>

      <defs>
        <marker id="fa-arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
