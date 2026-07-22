"use client";
// D3 — MAC Learning & CAM Table: Frame Forwarding Flow
export default function MacLearningFlow() {
  const steps = [
    { n:"1", t:"Frame arrives on ingress port",         s:"Source MAC + port noted for CAM learning",                                  bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { n:"2", t:"Source MAC learning",                   s:"CAM table updated: MAC → Port + VLAN + Age timer",                         bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { n:"3", t:"Destination MAC lookup (CAM)",          s:"Parallel hardware search — nanoseconds",                                   bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
    { n:"4a", t:"KNOWN UNICAST — MAC found in CAM",     s:"Forward ONLY to destination port — selective, efficient",                  bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { n:"4b", t:"UNKNOWN UNICAST — MAC NOT in CAM",     s:"Flood all same-VLAN ports except ingress — temporary until MAC learned",  bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { n:"4c", t:"BROADCAST (FF:FF:FF:FF:FF:FF)",        s:"Always flood all same-VLAN ports — ARP, DHCP discover etc.",              bg:"#fee2e2", b:"#dc2626", tc:"#991b1b" },
    { n:"5", t:"CAM aging",                             s:"Entries expire after ~300 sec of inactivity — stale entries removed",      bg:"#f1f5f9", b:"#64748b", tc:"#374151" },
  ];
  const STEP_H = 46; const ARR_H = 10;
  const totalH = 44 + steps.length * (STEP_H + ARR_H) + 44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="MAC address learning and CAM table forwarding process"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">MAC Learning aur CAM Table — Frame Forwarding</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">ASIC hardware — nanosecond parallel lookup — wire-speed forwarding</text>
      {steps.map((step, i) => {
        const y = 40 + i * (STEP_H + ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill={step.bg} stroke={step.b} strokeWidth="1.5"/>
            <rect x="10" y={y} width="30" height={STEP_H} rx="6" fill={step.b}/>
            <rect x="30" y={y} width="4" height={STEP_H} fill={step.b}/>
            <text x="25" y={y + STEP_H / 2 + 5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#fff">{step.n}</text>
            <text x="44" y={y + 16} fontSize="10" fontWeight="600" fill={step.tc}>{step.t}</text>
            <text x="44" y={y + 32} fontSize="8.5" fill="#6b7280">{step.s}</text>
            {i < steps.length - 1 && (
              <g>
                <line x1="240" y1={y + STEP_H} x2="240" y2={y + STEP_H + ARR_H - 3} stroke={step.b} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-3} 245,${y+STEP_H+ARR_H-3} 240,${y+STEP_H+ARR_H}`} fill={step.b}/>
              </g>
            )}
          </g>
        );
      })}
      {(() => { const sy = 40 + steps.length * (STEP_H + ARR_H) + 4; return (
        <g>
          <rect x="10" y={sy} width="460" height="32" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
          <text x="240" y={sy + 12} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">Unknown Unicast ≠ Broadcast</text>
          <text x="240" y={sy + 26} textAnchor="middle" fontSize="8.5" fill="#92400e">Unknown unicast: specific MAC, CAM miss → temporary flood. Broadcast: FF:FF:FF:FF:FF:FF → always flood.</text>
        </g>
      ); })()}
    </svg>
  );
}
