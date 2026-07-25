"use client";
// D10 — DNAT Server Publishing Flow
export default function DnatServerPublish() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 320`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DNAT server publishing flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="320" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Destination NAT (DNAT) — Server Publishing</text>
      {/* Internet user */}
      <rect x="10" y="38" width="110" height="50" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="65" y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#991b1b">Internet User</text>
      <text x="65" y="70" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">1.2.3.4:55000</text>
      {/* Firewall */}
      <rect x="170" y="38" width="140" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="240" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#16a34a">Firewall</text>
      <text x="240" y="67" textAnchor="middle" fontSize="8" fill="#374151">DNAT: 198.51.100.10:443</text>
      <text x="240" y="79" textAnchor="middle" fontSize="8" fill="#374151">→ 10.10.1.50:443</text>
      {/* Server */}
      <rect x="360" y="38" width="110" height="50" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="415" y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0c4a6e">Internal Server</text>
      <text x="415" y="70" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">10.10.1.50:443</text>
      {/* Packet transformation */}
      <rect x="10" y="108" width={W-20} height="90" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Packet Header Transformation</text>
      {[
        { label:"Inbound", pkt:"SRC=1.2.3.4:55000  DST=198.51.100.10:443", color:"#dc2626" },
        { label:"Post-DNAT", pkt:"SRC=1.2.3.4:55000  DST=10.10.1.50:443   (forwarded internally)", color:"#16a34a" },
        { label:"Server reply", pkt:"SRC=10.10.1.50:443  DST=1.2.3.4:55000", color:"#0ea5e9" },
        { label:"Reverse DNAT", pkt:"SRC=198.51.100.10:443 DST=1.2.3.4:55000  (sent to internet)", color:"#8b5cf6" },
      ].map((r,i) => (
        <g key={i}>
          <text x="18" y={136+i*18} fontSize="8" fontWeight="700" fill={r.color}>{r.label}:</text>
          <text x="95" y={136+i*18} fontSize="8" fontFamily="monospace" fill="#374151">{r.pkt}</text>
        </g>
      ))}
      <rect x="10" y="208" width={W-20} height="50" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="224" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">DNAT does NOT by itself permit traffic — security policy required separately.</text>
      <text x={W/2} y="238" textAnchor="middle" fontSize="8" fill="#92400e">Whether policy matches pre-DNAT (public IP) or post-DNAT (private IP) address: platform-specific — verify documentation.</text>
      <text x={W/2} y="252" textAnchor="middle" fontSize="8" fill="#92400e">Return path: server reply must route back through firewall for reverse DNAT. Incorrect return routing breaks the session.</text>
    </svg>
  );
}
