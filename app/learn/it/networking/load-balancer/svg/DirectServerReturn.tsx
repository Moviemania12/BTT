"use client";
// D11 — Direct Server Return (DSR)
export default function DirectServerReturn() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 290`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Direct server return architecture showing inbound via LB and return direct to client"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a11g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
        <marker id="a11b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#1d4ed8"/>
        </marker>
      </defs>
      <rect width={W} height="290" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Direct Server Return (DSR)</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">Intentionally asymmetric — inbound via LB, return direct to client</text>

      {/* Client */}
      <rect x="195" y="46" width="90" height="28" rx="6" fill="#374151"/>
      <text x="240" y="63" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Client</text>

      {/* Request path: client → LB */}
      <line x1="200" y1="74" x2="140" y2="104" stroke="#374151" strokeWidth="2" markerEnd="url(#a11g)"/>
      <text x="155" y="94" fontSize="7.5" fill="#374151" fontWeight="600">① Request</text>

      {/* LB */}
      <rect x="30" y="104" width="120" height="44" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="90" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Load Balancer</text>
      <text x="90" y="136" textAnchor="middle" fontSize="8" fill="#374151">VIP: 203.0.113.50</text>
      <text x="90" y="146" textAnchor="middle" fontSize="7.5" fill="#374151">Selects backend, forwards inbound</text>

      {/* LB → Backend */}
      <line x1="150" y1="126" x2="310" y2="126" stroke="#374151" strokeWidth="2" markerEnd="url(#a11g)"/>
      <text x="230" y="120" textAnchor="middle" fontSize="7.5" fill="#374151" fontWeight="600">② Forward inbound to backend</text>
      <text x="230" y="132" textAnchor="middle" fontSize="7.5" fill="#374151">(dest modification method varies)</text>

      {/* Backend */}
      <rect x="310" y="104" width="155" height="60" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="387" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Backend Server</text>
      <text x="387" y="136" textAnchor="middle" fontSize="8" fill="#374151">VIP also configured</text>
      <text x="387" y="148" textAnchor="middle" fontSize="7.5" fill="#374151">on loopback (classic method)</text>
      <text x="387" y="159" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">ARP/ND suppressed for VIP</text>

      {/* Return path: backend → client directly */}
      <line x1="387" y1="104" x2="280" y2="74" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="5,3" markerEnd="url(#a11b)"/>
      <text x="345" y="82" fontSize="7.5" fill="#1d4ed8" fontWeight="700">③ Response: DIRECT to client</text>
      <text x="345" y="93" fontSize="7.5" fill="#1d4ed8">(bypasses LB)</text>
      <text x="345" y="103" fontSize="7.5" fill="#1d4ed8">src = VIP address</text>

      {/* Benefits & Limitations */}
      <rect x="10" y="172" width="220" height="106" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x="120" y="188" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">DSR Benefits</text>
      <text x="18" y="202" fontSize="8" fill="#374151">• LB doesn't process return bandwidth</text>
      <text x="18" y="215" fontSize="8" fill="#374151">• Potential throughput improvement</text>
      <text x="18" y="228" fontSize="8" fill="#374151">{"• Useful: response >> request volume"}</text>

      <rect x="250" y="172" width="220" height="106" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="360" y="188" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">DSR Limitations</text>
      <text x="258" y="202" fontSize="8" fill="#374151">• VIP on backend: method varies by OS</text>
      <text x="258" y="215" fontSize="8" fill="#374151">• ARP (IPv4) / ND (IPv6) suppression req.</text>
      <text x="258" y="228" fontSize="8" fill="#374151">• L7 return-path inspection not possible</text>
      <text x="258" y="241" fontSize="8" fill="#374151">• TLS: backend handles (owns VIP)</text>
      <text x="258" y="254" fontSize="8" fill="#374151">• Troubleshooting: capture at backend</text>
      <text x="258" y="267" fontSize="7.5" fontStyle="italic" fill="#6b7280">LB can still maintain persistence state (inbound)</text>
    </svg>
  );
}
