"use client";
// D6 — Load Balancer HA Pair
export default function LbHaPair() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer HA pair active standby architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Load Balancer HA Pair</text>

      {/* Upstream */}
      <rect x="160" y="34" width="160" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Upstream Network / Firewall</text>

      <line x1="200" y1="58" x2="130" y2="86" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="280" y1="58" x2="350" y2="86" stroke="#9ca3af" strokeWidth="1.5"/>

      {/* LB-A Active */}
      <rect x="20" y="86" width="210" height="84" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="125" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">LB-A — ACTIVE</text>
      <text x="125" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">Handles all production traffic</text>
      <text x="125" y="132" textAnchor="middle" fontSize="8" fill="#374151">Service address on this node</text>
      <text x="125" y="146" textAnchor="middle" fontSize="8" fill="#374151">Config + selected state → synced to B</text>
      <text x="125" y="160" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Service takeover mechanism: platform/design dependent</text>

      {/* LB-B Standby */}
      <rect x="250" y="86" width="210" height="84" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="355" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">LB-B — STANDBY</text>
      <text x="355" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">Ready to assume service</text>
      <text x="355" y="132" textAnchor="middle" fontSize="8" fill="#374151">Config synchronized, health monitoring</text>
      <text x="355" y="146" textAnchor="middle" fontSize="8" fill="#374151">Session state: depends on platform/config</text>
      <text x="355" y="160" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Active/active where platform supports</text>

      {/* HA links */}
      <line x1="230" y1="128" x2="250" y2="128" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,2"/>
      <text x={W/2} y="120" textAnchor="middle" fontSize="7.5" fill="#8b5cf6" fontWeight="700">HA Links</text>
      <text x={W/2} y="130" textAnchor="middle" fontSize="7" fill="#8b5cf6">heartbeat + state sync</text>

      {/* Downstream */}
      <line x1="125" y1="170" x2="200" y2="198" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="355" y1="170" x2="280" y2="198" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="130" y="198" width="220" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="213" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Backend Pool</text>

      {/* Notes */}
      <rect x="10" y="230" width="460" height="60" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="246" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">HA Engineering Notes</text>
      <text x="18" y="260" fontSize="8" fill="#374151">• Config sync ≠ runtime session state sync — these are separate mechanisms</text>
      <text x="18" y="273" fontSize="8" fill="#374151">• Session continuity on failover depends on: sync completeness, session type, timing, platform support</text>
      <text x="18" y="281" fontSize="8" fontStyle="italic" fill="#dc2626">• Upstream/downstream switches, power, ISP — still potential SPOFs if not redundant</text>
    </svg>
  );
}
