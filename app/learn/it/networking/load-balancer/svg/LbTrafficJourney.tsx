"use client";
// D1 — Basic Load Balancer Traffic Journey
export default function LbTrafficJourney() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Basic load balancer traffic journey from client through VIP to backend"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Load Balancer Traffic Journey</text>

      {/* Step 1: Client */}
      <rect x="10" y="35" width="80" height="36" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="50" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">Client</text>
      <text x="50" y="63" textAnchor="middle" fontSize="8" fill="#374151">198.51.100.25</text>

      {/* Arrow 1: DNS */}
      <line x1="90" y1="53" x2="130" y2="53" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)"/>
      <text x="110" y="47" textAnchor="middle" fontSize="7.5" fill="#6b7280">① DNS</text>

      {/* DNS box */}
      <rect x="130" y="35" width="80" height="36" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="170" y="50" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">DNS</text>
      <text x="170" y="63" textAnchor="middle" fontSize="8" fill="#374151">app.example.com</text>

      {/* Arrow 2: returns VIP */}
      <line x1="130" y1="62" x2="90" y2="70" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr1)"/>
      <text x="108" y="80" textAnchor="middle" fontSize="7.5" fill="#16a34a">② VIP: 203.0.113.50</text>

      {/* Arrow 3: connects to VIP */}
      <line x1="50" y1="88" x2="50" y2="108" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)"/>
      <text x="62" y="102" fontSize="7.5" fill="#6b7280">③ TCP/TLS</text>
      <text x="62" y="112" fontSize="7.5" fill="#6b7280">to VIP</text>

      {/* LB box */}
      <rect x="10" y="118" width="460" height="70" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x={W/2} y="135" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Load Balancer</text>
      <text x={W/2} y="149" textAnchor="middle" fontSize="8.5" fill="#374151">VIP: 203.0.113.50:443   ④ Receives traffic on VIP</text>
      <text x={W/2} y="162" textAnchor="middle" fontSize="8" fill="#374151">⑤ Evaluates backend pool health   ⑥ Applies algorithm → Selects backend</text>
      <text x={W/2} y="175" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#92400e">Architecture determines exact mechanism (proxy, forward, translate)</text>

      {/* Arrow down to backends */}
      <line x1={W/2} y1="188" x2={W/2} y2="208" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr1)"/>
      <text x={W/2+5} y="202" fontSize="7.5" fill="#6b7280">⑦ Forward to selected backend</text>

      {/* Backend pool */}
      <rect x="10" y="208" width="460" height="80" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>
      <text x={W/2} y="224" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Backend Pool</text>

      {/* Server 1 - eligible */}
      <rect x="25" y="232" width="120" height="46" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="85" y="248" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">Server 1</text>
      <text x="85" y="261" textAnchor="middle" fontSize="8" fill="#374151">10.10.1.21:8443</text>
      <text x="85" y="273" textAnchor="middle" fontSize="7.5" fill="#16a34a">✓ Eligible</text>

      {/* Server 2 - eligible, selected */}
      <rect x="175" y="232" width="130" height="46" rx="6" fill="#dcfce7" stroke="#2563eb" strokeWidth="2.5"/>
      <text x="240" y="248" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">Server 2 ← Selected</text>
      <text x="240" y="261" textAnchor="middle" fontSize="8" fill="#374151">10.10.1.22:8443</text>
      <text x="240" y="273" textAnchor="middle" fontSize="7.5" fill="#16a34a">✓ Eligible</text>

      {/* Server 3 - ineligible */}
      <rect x="335" y="232" width="125" height="46" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="397" y="248" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">Server 3</text>
      <text x="397" y="261" textAnchor="middle" fontSize="8" fill="#374151">10.10.1.23:8443</text>
      <text x="397" y="273" textAnchor="middle" fontSize="7.5" fill="#dc2626">✗ Health check failing</text>

      {/* Return path note */}
      <rect x="10" y="296" width="460" height="40" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1"/>
      <text x={W/2} y="311" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#374151">⑧ Response Return Path</text>
      <text x={W/2} y="325" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#64748b">Return path: architecture dependent — may traverse LB or use DSR (direct to client)</text>

      {/* Notes */}
      <rect x="10" y="343" width="460" height="28" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="355" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">Server 3 excluded from selection — LB detects failure after configured fall threshold (not instantly)</text>
      <text x={W/2} y="366" textAnchor="middle" fontSize="8" fill="#92400e">VIP implementation is platform/deployment dependent — interface address, cloud frontend, anycast, or other</text>
    </svg>
  );
}
