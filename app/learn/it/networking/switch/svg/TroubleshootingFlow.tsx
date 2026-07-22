"use client";
// D46 — Layer-by-Layer Switch Troubleshooting Flow
export default function TroubleshootingFlow() {
  const layers = [
    { n:"L1", t:"Physical Layer",        checks:"Cable plugged? LED link? DOM/DDM optical power? SFP compatible? Fiber cleaned?",         bg:"#fee2e2", b:"#dc2626", tc:"#991b1b" },
    { n:"L2", t:"Data Link",             checks:"Interface up/up? Correct VLAN? Trunk allowed? STP Forwarding? EtherChannel summary?",    bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { n:"L2+", t:"Layer 2 Advanced",     checks:"MAC in CAM table? MAC flapping? Err-disabled cause? Port security violation?",           bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
    { n:"L3", t:"Network Layer",         checks:"SVI up/up? Route in table? ARP resolved? Correct gateway? FHRP active?",                 bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { n:"L4+", t:"Transport/Application",checks:"ACL blocking? QoS dropping? MTU mismatch (large ping test)? Application config?",       bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { n:"⊕", t:"Confirm Resolution",     checks:"Test end-to-end. Document root cause. Update runbook/change record.",                   bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
  ];
  const STEP_H=46; const ARR_H=10;
  const totalH = 56 + layers.length*(STEP_H+ARR_H) + 36;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Layer-by-layer switch troubleshooting systematic flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Switch Troubleshooting — Layer by Layer</text>
      <rect x="10" y="26" width="460" height="22" rx="5" fill="#1e293b"/>
      <text x="240" y="40" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f8fafc">Problem identified → Start at Layer 1 → work UP · Confirm each layer before moving on</text>
      {layers.map((l, i) => {
        const y = 54 + i*(STEP_H+ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill={l.bg} stroke={l.b} strokeWidth="1.5"/>
            <rect x="10" y={y} width="38" height={STEP_H} rx="6" fill={l.b}/>
            <rect x="38" y={y} width="4" height={STEP_H} fill={l.b}/>
            <text x="29" y={y+STEP_H/2+5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fff">{l.n}</text>
            <text x="52" y={y+15} fontSize="10" fontWeight="700" fill={l.tc}>{l.t}</text>
            <text x="52" y={y+30} fontSize="8.5" fill="#374151">{l.checks}</text>
            {i < layers.length-1 && (
              <g>
                <line x1="240" y1={y+STEP_H} x2="240" y2={y+STEP_H+ARR_H-3} stroke={l.b} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-3} 245,${y+STEP_H+ARR_H-3} 240,${y+STEP_H+ARR_H}`} fill={l.b}/>
              </g>
            )}
          </g>
        );
      })}
      {(() => { const ny = 54+layers.length*(STEP_H+ARR_H)+4; return (
        <g>
          <rect x="10" y={ny} width="460" height="26" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
          <text x="240" y={ny+11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Command syntax varies: Cisco IOS-XE · NX-OS · Arista EOS · Junos · AOS-CX · OS10 · SONiC</text>
          <text x="240" y={ny+23} textAnchor="middle" fontSize="8.5" fill="#92400e">show interfaces · show interfaces switchport · show spanning-tree · show mac address-table · show ip arp</text>
        </g>
      ); })()}
    </svg>
  );
}
