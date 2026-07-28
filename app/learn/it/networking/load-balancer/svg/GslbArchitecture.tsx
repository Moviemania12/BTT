"use client";
// D23 — GSLB Architecture Overview
export default function GslbArchitecture() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GSLB global server load balancing architecture overview"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a23" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">GSLB — Global Server Load Balancing</text>

      {/* Client */}
      <rect x="190" y="34" width="100" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Client</text>
      <line x1={W/2} y1="58" x2={W/2} y2="76" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a23)"/>
      <text x={W/2+4} y="70" fontSize="7.5" fill="#6b7280">DNS query: app.example.com</text>

      {/* GSLB DNS */}
      <rect x="120" y="76" width="240" height="36" rx="6" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x={W/2} y="91" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">GSLB-Aware Authoritative DNS</text>
      <text x={W/2} y="105" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)">Health-integrated | Geographic | Low TTL | EDNS-CS for accuracy</text>

      {/* Decision arrows */}
      <line x1="200" y1="112" x2="140" y2="138" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a23)"/>
      <text x="155" y="130" fontSize="7.5" fill="#16a34a" fontWeight="700">DC-A healthy</text>
      <line x1="280" y1="112" x2="340" y2="138" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a23)"/>
      <text x="295" y="130" fontSize="7.5" fill="#dc2626">DC-A down</text>

      {/* DC-A */}
      <rect x="10" y="138" width="200" height="80" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="110" y="155" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#166534">Datacenter A</text>
      <text x="110" y="168" textAnchor="middle" fontSize="8" fill="#374151">Local LB → Backend pool</text>
      <text x="110" y="180" textAnchor="middle" fontSize="7.5" fill="#374151">APP01 APP02 APP03</text>
      <text x="110" y="195" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">GSLB monitors: site/VIP level</text>
      <text x="110" y="207" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Local LB: per-backend member</text>

      {/* DC-B */}
      <rect x="268" y="138" width="202" height="80" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x="369" y="155" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#dc2626">Datacenter B (Failover)</text>
      <text x="369" y="168" textAnchor="middle" fontSize="8" fill="#374151">Local LB → Backend pool</text>
      <text x="369" y="180" textAnchor="middle" fontSize="7.5" fill="#374151">DR01 DR02</text>
      <text x="369" y="195" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Receives traffic if DC-A fails</text>

      <rect x="10" y="228" width="460" height="62" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="244" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">GSLB Engineering Notes</text>
      <text x="18" y="258" fontSize="8" fill="#374151">• GSLB ≠ local LB — GSLB routes to datacenter; local LB distributes within datacenter. Both are complementary.</text>
      <text x="18" y="271" fontSize="8" fill="#374151">• DNS-based failover is NOT instant: TTL, resolver caching, client caching, connection reuse all add delay</text>
      <text x="18" y="284" fontSize="8" fill="#374151">• EDNS Client Subnet (ECS) improves geographic accuracy; resolver IP alone often imprecise. Accuracy varies.</text>
    </svg>
  );
}
