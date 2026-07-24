"use client";
// D24 — Routing Loop via traceroute + Null route prevention
export default function RoutingLoopNullRoute() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Routing loop detection and null route prevention"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Routing Loop Detection + Null Route Prevention</text>
      {/* Loop panel */}
      <rect x="10" y="30" width="225" height="170" rx="7" fill="#fff5f5" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="122" y="46" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#dc2626">Without Null Route — LOOP</text>
      <text x="122" y="60" textAnchor="middle" fontSize="8" fill="#374151">Aggregate: 192.168.0.0/16 advertised</text>
      <text x="122" y="73" textAnchor="middle" fontSize="8" fill="#374151">No specific /24 route exists locally</text>
      <text x="18" y="92" fontSize="8.5" fontWeight="700" fill="#dc2626">Traffic to 192.168.5.0/24:</text>
      {["→ Router-A: matches /16 → fwd to Router-B","→ Router-B: matches /16 → fwd to Router-C","→ Router-C: no specific, uses default → fwd to Router-A","→ Router-A: loop!"].map((s, i) => (
        <text key={i} x="18" y={106+i*16} fontSize="8" fill={i===3?"#dc2626":"#374151"}>{s}</text>
      ))}
      <text x="122" y="178" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">Traceroute shows repeated hops → * * * (TTL expires)</text>
      {/* Prevention panel */}
      <rect x="245" y="30" width="225" height="170" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="357" y="46" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#16a34a">With Null Route — NO LOOP</text>
      <text x="357" y="60" textAnchor="middle" fontSize="8" fill="#374151">Aggregate: 192.168.0.0/16 advertised</text>
      <text x="357" y="73" textAnchor="middle" fontSize="8" fill="#374151">PLUS: discard route for 192.168.0.0/16</text>
      <text x="253" y="92" fontSize="8.5" fontWeight="700" fill="#16a34a">Traffic to 192.168.5.0/24:</text>
      {["→ Router-A: matches /16","→ No specific /24 → discard route is best match","→ Packet discarded locally","→ No forwarding loop"].map((s, i) => (
        <text key={i} x="253" y={106+i*16} fontSize="8" fill={i>=2?"#16a34a":"#374151"}>{s}</text>
      ))}
      <text x="357" y="165" textAnchor="middle" fontSize="8" fill="#374151">ICMP Unreachable: platform/config dependent</text>
      <text x="357" y="178" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">(not guaranteed on all platforms)</text>
      {/* LPM note */}
      <rect x="10" y="210" width={W-20} height="60" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="226" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Why Null Route Works — LPM</text>
      <text x={W/2} y="242" textAnchor="middle" fontSize="8.5" fill="#374151">Specific routes (/24) win over aggregate (/16) via LPM — discard route only used when no specific match exists</text>
      <text x={W/2} y="258" textAnchor="middle" fontSize="8.5" fill="#374151">This makes discard route "safe" — legitimate specific routes are always preferred by LPM</text>
      <text x={W/2} y="266" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">The locally installed discard route for the aggregate is the best available match when no more-specific route exists</text>
      {/* Summary */}
      <rect x="10" y="282" width={W-20} height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="297" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Best Practice: Always install discard/null route for any aggregate prefix you advertise</text>
      <text x={W/2} y="311" textAnchor="middle" fontSize="8" fill="#92400e">Prevents summary-induced loops. Standard operational practice across all routing platforms.</text>
    </svg>
  );
}
