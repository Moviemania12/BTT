"use client";
// D17 — MPLS Forwarding Architecture: label stack, LER/LSR, PHP
export default function MplsForwardingArchitecture() {
  const W = 480;
  const hops = [
    { role:"CE Router", action:"IP packet", label:"No MPLS label", color:"#6b7280", x:10, w:80 },
    { role:"LER-A (Ingress)", action:"PUSH labels", label:"[VPN][Transport]\n[IP Pkt]", color:"#0ea5e9", x:100, w:90 },
    { role:"LSR-1 (Transit)", action:"SWAP transport", label:"[VPN][New-Lbl]\n[IP Pkt]", color:"#8b5cf6", x:200, w:90 },
    { role:"LSR-2 (PHP)", action:"POP transport\n(Penultimate Hop)", label:"[VPN][IP Pkt]", color:"#f59e0b", x:300, w:90 },
    { role:"LER-B (Egress)", action:"POP VPN label\nIP lookup → CE", label:"[IP Pkt]", color:"#16a34a", x:400, w:80 },
  ];
  return (
    <svg viewBox={`0 0 ${W} 360`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="MPLS forwarding architecture with label operations"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="360" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">MPLS Forwarding Architecture</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#6b7280">Label-based forwarding — supports L2 and L3 services. LDP is one signaling option (Segment Routing is an alternative).</text>
      {/* Label stack entry */}
      <rect x="10" y="44" width={W-20} height="28" rx="5" fill="#374151"/>
      <text x={W/2} y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">32-bit MPLS Label Stack Entry:</text>
      <text x={W/2} y="67" textAnchor="middle" fontSize="8" fill="#d1fae5">[20-bit Label][3-bit TC][1-bit S (bottom-of-stack)][8-bit TTL] — Multiple labels can be stacked</text>
      {/* Hop-by-hop */}
      {hops.map((h, i) => (
        <g key={i}>
          <rect x={h.x} y="82" width={h.w} height="56" rx="5" fill={h.color} opacity="0.15" stroke={h.color} strokeWidth="1.5"/>
          <text x={h.x+h.w/2} y="96" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={h.color}>{h.role}</text>
          <text x={h.x+h.w/2} y="109" textAnchor="middle" fontSize="7" fill={h.color}>{h.action.split("\n").join(" ")}</text>
          <text x={h.x+h.w/2} y="122" textAnchor="middle" fontSize="7" fill="#374151">{h.label.split("\n")[0]}</text>
          {h.label.includes("\n") && <text x={h.x+h.w/2} y="132" textAnchor="middle" fontSize="7" fill="#374151">{h.label.split("\n")[1]}</text>}
          {i < hops.length-1 && <text x={h.x+h.w+5} y="115" fontSize="12" fill="#9ca3af">→</text>}
        </g>
      ))}
      {/* L3VPN explanation */}
      <rect x="10" y="152" width={W-20} height="90" rx="7" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x={W/2} y="168" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0ea5e9">MPLS L3VPN — Enterprise Relevance</text>
      {[
        "CE (Customer Edge): Peers BGP/OSPF/static with PE — no MPLS awareness needed",
        "PE (Provider Edge): Maintains per-customer VRF — exchanges routes via MP-BGP (VPNv4/VPNv6)",
        "P (Provider): Label switch only — no customer routes",
        "RD (Route Distinguisher): Makes VPN routes globally unique in MP-BGP",
        "RT (Route Target): Controls which VRFs import/export which routes (policy mechanism)",
      ].map((l, i) => (
        <text key={i} x="18" y={182+i*14} fontSize="8.5" fill="#374151">• {l}</text>
      ))}
      <rect x="10" y="254" width={W-20} height="34" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x={W/2} y="268" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">MPLS L3VPN ≠ Encryption</text>
      <text x={W/2} y="281" textAnchor="middle" fontSize="8.5" fill="#374151">Traffic separation via VRF — not encrypted. Add IPsec for confidentiality if required.</text>
      <rect x="10" y="298" width={W-20} height="28" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="311" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">PHP (Penultimate Hop Popping) = common optimization — not universally mandated</text>
      <text x={W/2} y="323" textAnchor="middle" fontSize="8" fill="#92400e">Explicit Null label may be used instead (preserves outer label to egress for QoS/TTL)</text>
    </svg>
  );
}
