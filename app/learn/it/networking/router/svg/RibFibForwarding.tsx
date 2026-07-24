"use client";
// D4 — RIB → FIB forwarding model (vendor-neutral, no CEF branding)
export default function RibFibForwarding() {
  const W = 480;
  const sources = [
    "Connected + Local routes (interface state)",
    "Static routes (admin-configured)",
    "OSPF — SPF output (best routes)",
    "BGP — Loc-RIB output (best paths)",
    "IS-IS — SPF output (best routes)",
    "Other routing protocol outputs...",
  ];
  return (
    <svg viewBox={`0 0 ${W} 430`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="RIB to FIB forwarding model"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="430" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">RIB → FIB: Routing Information to Forwarding</text>
      {/* Sources */}
      <text x={W/2} y="44" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6b7280">PROTOCOL-SPECIFIC STATE (own selection first)</text>
      {sources.map((s, i) => (
        <g key={i}>
          <rect x="10" y={52+i*22} width={W-20} height="18" rx="4" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1"/>
          <text x={W/2} y={52+i*22+12} textAnchor="middle" fontSize="8.5" fill="#0c4a6e">{s}</text>
        </g>
      ))}
      <text x={W/2} y="198" textAnchor="middle" fontSize="9" fill="#6b7280">⬇ Protocol-selected routes offered to system RIB</text>
      <text x={W/2} y="210" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#9ca3af">(BGP best-path, OSPF SPF occur within protocol — not every path reaches system RIB)</text>
      {/* RIB */}
      <rect x="10" y="218" width={W-20} height="72" rx="8" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="2"/>
      <text x={W/2} y="234" textAnchor="middle" fontSize="10" fontWeight="700" fill="#8b5cf6">SYSTEM / GLOBAL RIB — Control Plane Routing Table</text>
      <text x={W/2} y="248" textAnchor="middle" fontSize="8.5" fill="#4c1d95">AD / Route Preference applied when competing sources offer same prefix</text>
      <text x={W/2} y="262" textAnchor="middle" fontSize="8.5" fill="#4c1d95">Active routes selected → eligible for FIB programming</text>
      <text x={W/2} y="278" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#7c3aed">May contain ECMP next-hops per prefix — structure is platform dependent</text>
      <text x={W/2} y="302" textAnchor="middle" fontSize="9" fill="#6b7280">⬇ Selected forwarding information programmed into FIB</text>
      {/* FIB */}
      <rect x="10" y="310" width={W-20} height="62" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x={W/2} y="326" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">FIB — Forwarding Information Base (Data Plane)</text>
      <text x={W/2} y="341" textAnchor="middle" fontSize="8.5" fill="#14532d">Only active/selected routes — forwarding-optimized</text>
      <text x={W/2} y="355" textAnchor="middle" fontSize="8.5" fill="#14532d">Next-hop recursively resolved where needed</text>
      <text x={W/2} y="368" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#166534">Implementation: hardware TCAM, software table, or hybrid — platform dependent</text>
      <text x={W/2} y="386" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">Incoming Packet → Destination IP → LPM lookup → Forward</text>
      <rect x="10" y="394" width={W-20} height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="408" textAnchor="middle" fontSize="8" fill="#92400e">CEF (Cisco Express Forwarding) = one vendor-specific FIB implementation. Other platforms use different mechanisms.</text>
    </svg>
  );
}
