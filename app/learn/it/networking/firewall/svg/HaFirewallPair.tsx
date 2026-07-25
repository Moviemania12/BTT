"use client";
// D7 — HA Firewall Pair Active/Passive
export default function HaFirewallPair() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 340`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HA firewall pair active passive architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="340" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">HA Firewall Pair — Active/Passive</text>
      {/* Upstream */}
      <rect x="160" y="34" width="160" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Internet / Upstream Network</text>
      {/* Connections to both */}
      <line x1="200" y1="58" x2="130" y2="86" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="280" y1="58" x2="350" y2="86" stroke="#9ca3af" strokeWidth="1.5"/>
      {/* FW-A */}
      <rect x="20" y="86" width="210" height="80" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="125" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Firewall A — ACTIVE</text>
      <text x="125" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">Handles all production traffic</text>
      <text x="125" y="132" textAnchor="middle" fontSize="8" fill="#374151">Session/NAT/VPN state → synced to B</text>
      <text x="125" y="146" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Selected runtime state replication</text>
      {/* FW-B */}
      <rect x="250" y="86" width="210" height="80" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="355" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">Firewall B — PASSIVE</text>
      <text x="355" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">Ready to assume active role</text>
      <text x="355" y="132" textAnchor="middle" fontSize="8" fill="#374151">Config synced, monitoring peer health</text>
      <text x="355" y="146" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">May handle management/HA traffic</text>
      {/* HA link */}
      <line x1="230" y1="126" x2="250" y2="126" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,2"/>
      <text x={W/2} y="120" textAnchor="middle" fontSize="7.5" fill="#8b5cf6" fontWeight="700">HA Links</text>
      <text x={W/2} y="130" textAnchor="middle" fontSize="7" fill="#8b5cf6">(heartbeat + state sync)</text>
      {/* Downstream */}
      <line x1="125" y1="166" x2="200" y2="194" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="355" y1="166" x2="280" y2="194" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="130" y="194" width="220" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="209" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Internal Network / Downstream</text>
      {/* Failover */}
      <rect x="10" y="228" width={W-20} height="72" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="244" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Failover Sequence (conceptual)</text>
      {["1. Failure condition detected by HA health mechanism",
        "2. Firewall B transitions to Active role",
        "3. Network presence updated (mechanism: platform/design dependent)",
        "4. Synchronized sessions: may continue with brief disruption",
        "5. Unsynchronized sessions: reset — application must reconnect"].map((s,i) => (
        <text key={i} x="18" y={256+i*14} fontSize="8" fill={i>=3?"#dc2626":"#374151"}>{s}</text>
      ))}
      <rect x="10" y="308" width={W-20} height="24" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="318" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">HA does not eliminate shared SPOFs: upstream switch, downstream switch, power feed, ISP.</text>
      <text x={W/2} y="329" textAnchor="middle" fontSize="8" fill="#92400e">Session survival depends on sync completeness, timing, session type, and platform support.</text>
    </svg>
  );
}
