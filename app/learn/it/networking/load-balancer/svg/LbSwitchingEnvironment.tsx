"use client";
// D27 — LB Position in Switching Environment
export default function LbSwitchingEnvironment() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 280`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer position in switching environment showing STP and LAG considerations"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a27" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="280" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">LB in Switching Environment</text>

      {/* Upstream Firewall */}
      <rect x="140" y="30" width="200" height="22" rx="5" fill="#dc2626"/>
      <text x={W/2} y="44" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Upstream Firewall / Router</text>

      <line x1={W/2} y1="52" x2={W/2} y2="68" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>

      {/* DMZ Switch */}
      <rect x="100" y="68" width="280" height="28" rx="5" fill="#1d4ed8"/>
      <text x={W/2} y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">DMZ Switch</text>
      <text x={W/2} y="91" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)">PortFast/Edge Port on LB-facing ports — prevents STP delay</text>

      {/* Connections to LBs */}
      <line x1="200" y1="96" x2="155" y2="120" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>
      <line x1="280" y1="96" x2="325" y2="120" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>

      {/* LB-A */}
      <rect x="10" y="120" width="175" height="56" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="97" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">LB-A</text>
      <text x="97" y="152" textAnchor="middle" fontSize="8" fill="#374151">LAG/LACP (optional)</text>
      <text x="97" y="165" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Verify LB+switch LACP compat.</text>

      {/* LB-B */}
      <rect x="295" y="120" width="175" height="56" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="382" y="138" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">LB-B</text>
      <text x="382" y="152" textAnchor="middle" fontSize="8" fill="#374151">LAG/LACP (optional)</text>
      <text x="382" y="165" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Verify LB+switch LACP compat.</text>

      {/* Connections to App Switch */}
      <line x1="97" y1="176" x2="180" y2="200" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>
      <line x1="382" y1="176" x2="300" y2="200" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>

      {/* App Switch */}
      <rect x="100" y="200" width="280" height="22" rx="5" fill="#16a34a"/>
      <text x={W/2} y="214" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Application Switch</text>
      <line x1={W/2} y1="222" x2={W/2} y2="236" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a27)"/>
      <rect x="80" y="236" width="320" height="18" rx="4" fill="#374151"/>
      <text x={W/2} y="248" textAnchor="middle" fontSize="8.5" fill="#fff">APP01   APP02   APP03</text>

      {/* Warning boxes */}
      <rect x="10" y="260" width="460" height="14" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x={W/2} y="271" textAnchor="middle" fontSize="7.5" fill="#dc2626" fontWeight="600">HA failover: gARP (IPv4)/ND (IPv6) must update switch MAC tables — switch DAI/security features may interfere. Static ARP prevents update. Verify.</text>
    </svg>
  );
}
