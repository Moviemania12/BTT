"use client";
// D9 — SNAT/PAT Translation Flow
export default function SnatPatFlow() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 360`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SNAT PAT translation flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="360" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">SNAT / PAT — Source Translation Flow</text>
      {/* Clients */}
      <rect x="10" y="38" width="120" height="80" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="70" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9">Internal Hosts</text>
      {["192.0.2.25:54321","192.0.2.26:49000","192.0.2.27:61000"].map((h,i) => (
        <text key={i} x="70" y={68+i*14} textAnchor="middle" fontSize="8" fill="#374151" fontFamily="monospace">{h}</text>
      ))}
      {/* Firewall/NAT */}
      <rect x="160" y="38" width="160" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="240" y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#16a34a">Firewall / SNAT-PAT</text>
      <text x="240" y="70" textAnchor="middle" fontSize="8" fill="#374151">Inside: 192.0.2.0/24</text>
      <text x="240" y="83" textAnchor="middle" fontSize="8" fill="#374151">Public: 198.51.100.50</text>
      <text x="240" y="96" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Port pool: platform/config dependent</text>
      {/* Internet */}
      <rect x="350" y="38" width="120" height="80" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="410" y="56" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Internet Servers</text>
      <text x="410" y="72" textAnchor="middle" fontSize="8" fill="#374151">See traffic from:</text>
      <text x="410" y="85" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">198.51.100.50:10001</text>
      <text x="410" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">198.51.100.50:10002</text>
      {/* Arrows */}
      <line x1="130" y1="78" x2="160" y2="78" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#ar)"/>
      <line x1="320" y1="78" x2="350" y2="78" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#ar)"/>
      <line x1="350" y1="90" x2="320" y2="90" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#ar)"/>
      <text x="340" y="105" fontSize="7" fill="#ca8a04">Return → lookup table</text>
      {/* Translation table */}
      <text x="14" y="136" fontSize="9.5" fontWeight="700" fill="#374151">PAT Translation Table:</text>
      <rect x="10" y="142" width={W-20} height="18" rx="3" fill="#374151"/>
      {["Original Src IP:Port","Protocol","Translated Src","Destination"].map((h,i) => (
        <text key={i} x={[18,180,228,330][i]} y="154" fontSize="8" fontWeight="700" fill="#fff">{h}</text>
      ))}
      {[
        ["192.0.2.25:54321","TCP","198.51.100.50:10001","8.8.8.8:53"],
        ["192.0.2.26:49000","TCP","198.51.100.50:10002","1.2.3.4:443"],
        ["192.0.2.27:61000","UDP","198.51.100.50:10003","8.8.8.8:53"],
      ].map((r,i) => (
        <g key={i}>
          <rect x="10" y={160+i*20} width={W-20} height="18" rx="2" fill={i%2===0?"#fff":"#f9fafb"}/>
          <text x="18" y={160+i*20+12} fontSize="8" fontFamily="monospace" fill="#374151">{r[0]}</text>
          <text x="180" y={160+i*20+12} fontSize="8" fill="#374151">{r[1]}</text>
          <text x="228" y={160+i*20+12} fontSize="8" fontWeight="600" fill="#16a34a" fontFamily="monospace">{r[2]}</text>
          <text x="330" y={160+i*20+12} fontSize="8" fontFamily="monospace" fill="#374151">{r[3]}</text>
        </g>
      ))}
      <rect x="10" y="222" width={W-20} height="60" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="238" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Engineering Notes</text>
      {["PAT is one form of SNAT — multiple hosts share one public IP via port differentiation",
        "Return traffic: Dst=198.51.100.50:10002 → lookup table → forward to 192.0.2.26:49000",
        "Translated port pool availability and allocation method: platform/config dependent",
        "NAT is not a security mechanism. Security policy is a separate, independent decision."].map((n,i) => (
        <text key={i} x="18" y={250+i*14} fontSize="8" fill={i===3?"#dc2626":"#374151"}>• {n}</text>
      ))}
      <rect x="10" y="290" width={W-20} height="18" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x={W/2} y="302" textAnchor="middle" fontSize="8" fontWeight="700" fill="#991b1b">NAT alone does not permit traffic — security policy permits/denies; NAT translates addresses. Both required.</text>
      <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#6b7280"/></marker></defs>
    </svg>
  );
}
