"use client";
// D11 — 802.1Q Subinterface / Router-on-a-Stick flow
export default function SubinterfaceRouterOnAStick() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Router-on-a-Stick 802.1Q subinterface flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Router-on-a-Stick — 802.1Q Subinterface Flow</text>
      {/* Switch */}
      <rect x="10" y="38" width="160" height="120" rx="7" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="90" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0ea5e9">SWITCH</text>
      <rect x="20" y="60" width="130" height="16" rx="3" fill="#0ea5e9"/>
      <text x="85" y="71" textAnchor="middle" fontSize="7.5" fill="#fff">Gi0/1 → PC (VLAN 10) [Untagged]</text>
      <rect x="20" y="80" width="130" height="16" rx="3" fill="#8b5cf6"/>
      <text x="85" y="91" textAnchor="middle" fontSize="7.5" fill="#fff">Gi0/2 → Server (VLAN 20) [Untagged]</text>
      <rect x="20" y="100" width="130" height="16" rx="3" fill="#6b7280"/>
      <text x="85" y="111" textAnchor="middle" fontSize="7.5" fill="#fff">Gi0/24 → Router [Trunk: VLAN 10+20]</text>
      {/* Tagged frames on trunk */}
      <rect x="185" y="62" width="110" height="100" rx="6" fill="#fff" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="240" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ca8a04">TRUNK LINK</text>
      <rect x="193" y="84" width="93" height="14" rx="3" fill="#0ea5e9"/>
      <text x="240" y="94" textAnchor="middle" fontSize="7.5" fill="#fff">[VID=10][Payload VLAN10]</text>
      <rect x="193" y="102" width="93" height="14" rx="3" fill="#8b5cf6"/>
      <text x="240" y="112" textAnchor="middle" fontSize="7.5" fill="#fff">[VID=20][Payload VLAN20]</text>
      <text x="240" y="130" textAnchor="middle" fontSize="7.5" fill="#92400e">802.1Q tag: 4 bytes</text>
      <text x="240" y="143" textAnchor="middle" fontSize="7.5" fill="#92400e">Tagged frame max: 1522B</text>
      {/* Router */}
      <rect x="310" y="38" width="160" height="120" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="390" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#16a34a">ROUTER</text>
      <text x="390" y="68" textAnchor="middle" fontSize="8" fill="#374151">Physical: Gi0/0 (trunk-facing)</text>
      <rect x="320" y="74" width="140" height="18" rx="4" fill="#0ea5e9"/>
      <text x="390" y="86" textAnchor="middle" fontSize="8" fill="#fff">Gi0/0.10 — VLAN 10 — 192.168.10.1/24</text>
      <rect x="320" y="96" width="140" height="18" rx="4" fill="#8b5cf6"/>
      <text x="390" y="108" textAnchor="middle" fontSize="8" fill="#fff">Gi0/0.20 — VLAN 20 — 192.168.20.1/24</text>
      <text x="390" y="130" textAnchor="middle" fontSize="8" fill="#374151">Native VLAN behavior:</text>
      <text x="390" y="143" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">platform dependent</text>
      {/* Traffic flow */}
      <rect x="10" y="175" width={W-20} height="100" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="192" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">Traffic Flow: PC (VLAN 10) → Server (VLAN 20)</text>
      {[
        { t:"1.", txt:"PC → Switch (untagged) → Switch tags VLAN 10 → sends on trunk to Router Gi0/0.10" },
        { t:"2.", txt:"Router Gi0/0.10: strip tag, IP lookup → 192.168.20.0/24 via Gi0/0.20" },
        { t:"3.", txt:"Router Gi0/0.20: add VLAN 20 tag → send out same physical Gi0/0 (HAIRPIN!)" },
        { t:"4.", txt:"Switch receives VLAN 20 tagged → VLAN 20 access port → Server (untagged)" },
      ].map((s, i) => (
        <text key={i} x="18" y={204+i*16} fontSize="8.5" fill={i===2?"#dc2626":"#374151"}><tspan fontWeight="700">{s.t}</tspan> {s.txt}</text>
      ))}
      <rect x="10" y="286" width={W-20} height="22" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x={W/2} y="300" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#991b1b">⚠ HAIRPIN: All inter-VLAN traffic traverses same physical link TWICE — bandwidth bottleneck</text>
      <rect x="10" y="316" width={W-20} height="18" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="328" textAnchor="middle" fontSize="8" fill="#92400e">Not preferred for modern high-traffic environments — use L3 Switch SVIs for wire-speed inter-VLAN routing</text>
    </svg>
  );
}
