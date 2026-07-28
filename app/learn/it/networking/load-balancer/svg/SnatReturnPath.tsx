"use client";
// D10 — SNAT Return Path
export default function SnatReturnPath() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 290`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SNAT return path showing how SNAT solves return traffic routing"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a10g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
        <marker id="a10r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
        </marker>
      </defs>
      <rect width={W} height="290" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">SNAT — Return Path Design</text>

      {/* Without SNAT */}
      <rect x="10" y="30" width="220" height="124" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="120" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">Without SNAT — Problematic</text>

      <rect x="20" y="56" width="60" height="22" rx="4" fill="#374151"/>
      <text x="50" y="70" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="80" y1="67" x2="108" y2="67" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a10g)"/>
      <rect x="108" y="56" width="60" height="22" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="138" y="70" textAnchor="middle" fontSize="8.5" fill="#92400e">LB</text>
      <line x1="168" y1="67" x2="196" y2="67" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a10g)"/>
      <rect x="168" y="56" width="52" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="194" y="70" textAnchor="middle" fontSize="8.5" fill="#166534">Backend</text>

      <text x="120" y="94" textAnchor="middle" fontSize="8" fill="#374151">Backend routes reply directly:</text>
      {/* Bypass arrow */}
      <path d="M 194 78 C 194 105 50 105 50 78" stroke="#dc2626" strokeWidth="2" fill="none" strokeDasharray="4,2" markerEnd="url(#a10r)"/>
      <text x="120" y="115" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">Bypasses LB!</text>
      <text x="120" y="127" textAnchor="middle" fontSize="7.5" fill="#dc2626">LB state table has no return</text>
      <text x="120" y="139" textAnchor="middle" fontSize="7.5" fill="#dc2626">→ Connection fails</text>
      <text x="120" y="148" textAnchor="middle" fontSize="7.5" fill="#374151">Default gateway: core router</text>

      {/* With SNAT */}
      <rect x="250" y="30" width="220" height="124" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="360" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">With SNAT — Return Directed to LB</text>

      <rect x="258" y="56" width="60" height="22" rx="4" fill="#374151"/>
      <text x="288" y="70" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="318" y1="67" x2="346" y2="67" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a10g)"/>
      <rect x="346" y="56" width="60" height="22" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="376" y="67" textAnchor="middle" fontSize="8.5" fill="#92400e">LB+SNAT</text>
      <text x="376" y="76" textAnchor="middle" fontSize="7" fill="#92400e">src→LB_IP</text>
      <line x1="406" y1="67" x2="434" y2="67" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a10g)"/>
      <rect x="406" y="56" width="56" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="434" y="70" textAnchor="middle" fontSize="8.5" fill="#166534">Backend</text>

      <text x="360" y="94" textAnchor="middle" fontSize="8" fill="#374151">Backend sees src=LB_IP</text>
      <text x="360" y="106" textAnchor="middle" fontSize="8" fill="#374151">Reply → LB_IP → LB</text>
      <line x1="380" y1="78" x2="380" y2="100" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="380" y1="100" x2="350" y2="100" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="350" y1="100" x2="350" y2="78" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a10g)"/>
      <text x="360" y="120" textAnchor="middle" fontSize="7.5" fill="#16a34a" fontWeight="700">Return via LB ✓</text>
      <text x="360" y="133" textAnchor="middle" fontSize="7.5" fill="#374151">LB: reverse SNAT → Client</text>
      <text x="360" y="148" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">Tradeoff: client IP hidden at backend</text>

      <rect x="10" y="162" width="460" height="64" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="178" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Engineering Notes</text>
      <text x="18" y="193" fontSize="8" fill="#374151">• SNAT translates source to LB-controlled address — backend replies toward that address</text>
      <text x="18" y="206" fontSize="8" fill="#374151">• SNAT + correct routing together solve return path — SNAT alone cannot override wrong network routes</text>
      <text x="18" y="219" fontSize="8" fill="#374151">• Tradeoff: original client IP not visible at backend at network layer (use forwarded headers where needed)</text>

      <rect x="10" y="234" width="460" height="48" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="250" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Alternative: Routing Design (no SNAT)</text>
      <text x="18" y="264" fontSize="8" fill="#374151">Configure backend default gateway = LB, or static routes for client subnets via LB</text>
      <text x="18" y="276" fontSize="8" fill="#374151">→ Backend sees original client IP. Return routing enforced by network design. Validate with packet capture.</text>
    </svg>
  );
}
