"use client";
// D19 — Dual ISP Architecture with outbound/inbound path influence
export default function DualIspArchitecture() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Dual ISP architecture with BGP path control"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Dual ISP Architecture</text>
      {/* ISPs */}
      <rect x="20" y="36" width="140" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="90" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">ISP-A (AS 100)</text>
      <text x="90" y="64" textAnchor="middle" fontSize="8" fill="#374151">Primary uplink</text>
      <rect x="320" y="36" width="140" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="390" y="52" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">ISP-B (AS 200)</text>
      <text x="390" y="64" textAnchor="middle" fontSize="8" fill="#374151">Backup / secondary uplink</text>
      {/* Border Router */}
      <rect x="130" y="96" width="220" height="100" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x={W/2} y="112" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#16a34a">Enterprise Border Router (AS 65001)</text>
      <rect x="140" y="120" width="95" height="28" rx="4" fill="#16a34a" opacity="0.15" stroke="#16a34a" strokeWidth="1"/>
      <text x="187" y="134" textAnchor="middle" fontSize="8" fill="#15803d">eBGP → ISP-A</text>
      <text x="187" y="145" textAnchor="middle" fontSize="7.5" fill="#15803d">LOCAL_PREF 200 (primary)</text>
      <rect x="245" y="120" width="95" height="28" rx="4" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1"/>
      <text x="292" y="134" textAnchor="middle" fontSize="8" fill="#92400e">eBGP → ISP-B</text>
      <text x="292" y="145" textAnchor="middle" fontSize="7.5" fill="#92400e">LOCAL_PREF 100 (backup)</text>
      <text x={W/2} y="170" textAnchor="middle" fontSize="8" fill="#374151">Enterprise prefix: 203.0.113.0/24</text>
      <text x={W/2} y="183" textAnchor="middle" fontSize="7.5" fill="#6b7280">Advertised via both ISPs (ISP-B: AS_PATH prepended → longer → less preferred inbound)</text>
      {/* Lines */}
      <line x1="90" y1="72" x2="170" y2="96" stroke="#dc2626" strokeWidth="1.5"/>
      <line x1="390" y1="72" x2="310" y2="96" stroke="#f59e0b" strokeWidth="1.5"/>
      {/* Outbound / Inbound explanation */}
      <rect x="10" y="212" width={W-20} height="76" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="228" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Path Control</text>
      <text x="18" y="244" fontSize="8.5" fontWeight="700" fill="#16a34a">Outbound (Enterprise → Internet):</text>
      <text x="18" y="257" fontSize="8.5" fill="#374151">LOCAL_PREF controls exit — fully controllable within AS. ISP-A (200) &gt; ISP-B (100) → ISP-A preferred exit.</text>
      <text x="18" y="273" fontSize="8.5" fontWeight="700" fill="#f59e0b">Inbound (Internet → Enterprise):</text>
      <text x="18" y="286" fontSize="8.5" fill="#374151">AS_PATH prepending/MED/communities — influence only (probabilistic). Each AS makes independent routing decisions.</text>
      {/* Notes */}
      <rect x="10" y="298" width={W-20} height="50" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="312" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Max-prefix on both eBGP sessions — operational safety control</text>
      <text x={W/2} y="326" textAnchor="middle" fontSize="8" fill="#374151">Active/active requires careful NAT + stateful inspection design (asymmetric routing risk)</text>
      <text x={W/2} y="340" textAnchor="middle" fontSize="8" fill="#374151">Internet route scale decision: default-only vs partial vs full table — verify platform FIB capacity</text>
    </svg>
  );
}
