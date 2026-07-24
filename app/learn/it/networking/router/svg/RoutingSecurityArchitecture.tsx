"use client";
// D18 — Routing Security Architecture: RPKI ROV, max-prefix, prefix filters, CoPP
export default function RoutingSecurityArchitecture() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 400`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Routing security architecture with RPKI, prefix filters, and CoPP"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="400" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Routing Security Architecture — Internet Edge</text>
      {/* Internet */}
      <rect x="160" y="30" width="160" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="44" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Internet / BGP Peers / ISPs</text>
      <line x1={W/2} y1="54" x2={W/2} y2="68" stroke="#6b7280" strokeWidth="1.5"/>
      {/* Inbound controls */}
      <rect x="10" y="68" width={W-20} height="100" rx="7" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x={W/2} y="83" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0ea5e9">Inbound BGP Controls</text>
      {[
        "RPKI ROV: Valid → accept per policy / Invalid → reject or de-prefer per policy / NotFound → accept per policy",
        "Max-prefix: Threshold violation → alert + configured protective action (platform/policy dependent)",
        "Prefix filters: Reject RFC1918, bogons, own prefixes returned, overly-specific prefixes",
        "BGP MD5 / TCP-AO: Authenticate BGP TCP session — prevent session hijacking",
      ].map((l, i) => (
        <text key={i} x="16" y={97+i*17} fontSize="8" fill="#374151">✓ {l}</text>
      ))}
      {/* Outbound controls */}
      <rect x="10" y="178" width={W-20} height="70" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x={W/2} y="193" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">Outbound BGP Controls</text>
      {[
        "Only advertise legitimately held, ROA-backed prefixes",
        "Never leak internal infrastructure, customer, or transit routes unintentionally",
        "AS_PATH prepending for inbound traffic influence (probabilistic — not deterministic)",
      ].map((l, i) => (
        <text key={i} x="16" y={207+i*16} fontSize="8" fill="#374151">✓ {l}</text>
      ))}
      {/* CoPP */}
      <rect x="10" y="258" width={W-20} height="80" rx="7" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x={W/2} y="273" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b5cf6">Control Plane Protection (CoPP / equivalent)</text>
      {[
        { cls:"BGP sessions + OSPF/IS-IS hellos", act:"Guaranteed rate — critical" },
        { cls:"SSH management + SNMP", act:"Guaranteed rate — up to configured limit" },
        { cls:"ICMP to router", act:"Rate limited — moderate" },
        { cls:"Unknown / unclassified", act:"Strict rate limit or drop" },
      ].map((r, i) => (
        <g key={i}>
          <text x="18" y={287+i*14} fontSize="8" fontWeight="600" fill="#8b5cf6">{r.cls}:</text>
          <text x="260" y={287+i*14} fontSize="8" fill="#374151">{r.act}</text>
        </g>
      ))}
      {/* RPKI detail */}
      <rect x="10" y="348" width={W-20} height="40" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="362" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">RPKI ROV = Origin AS validation only — NOT full AS_PATH validation</text>
      <text x={W/2} y="375" textAnchor="middle" fontSize="8" fill="#92400e">BGPsec (RFC 8205) required for full path validation — not widely deployed</text>
      <text x={W/2} y="386" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#a16207">ROV result (Valid/Invalid/NotFound) enables operator policy — not automatic RFC-mandated action</text>
    </svg>
  );
}
