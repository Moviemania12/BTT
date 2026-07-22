"use client";
// D13 — Packet Journey Through a Switch: Ingress to Egress
export default function PacketJourneySwitch() {
  const stages = [
    { n:"1", t:"Ingress Buffer + FCS Check",       s:"PHY converts signals→bits · FCS verified · Corrupt? → DROP · CRC error counter++",         bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { n:"2", t:"Parser → Metadata Creation",       s:"ASIC extracts headers: src/dst MAC, VLAN, EtherType, IP, ports → internal metadata",       bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { n:"3", t:"Source MAC Learning",              s:"CAM table updated: src MAC → ingress port + VLAN + age timer (300s default)",               bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
    { n:"4", t:"Destination MAC Lookup (CAM)",     s:"Parallel ASIC lookup · Known → port selected · Unknown → flood same-VLAN ports",            bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
    { n:"5", t:"VLAN Check",                       s:"Access port → internal tag add · Trunk → verify VLAN in allowed list · Mismatch → DROP",   bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { n:"6", t:"STP State Check",                  s:"Egress port Forwarding? → proceed · Blocking/Discarding → DROP (loop prevention)",         bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { n:"7", t:"ACL Check (TCAM)",                 s:"Ingress ACL first · Permit → proceed · Deny → DROP (optionally logged) · TCAM parallel",   bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { n:"8", t:"QoS Processing",                   s:"Classification (CoS/DSCP/port) · Marking · Queue assignment · Policing/Shaping",           bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { n:"9", t:"Output Queue + Scheduler",         s:"Priority/WFQ/LLQ · HOL blocking prevention · Congestion → tail drop / WRED",              bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
    { n:"10", t:"Egress + Frame Transmit",         s:"802.1Q tag strip (access) or tag forward (trunk) · FCS recalc · PHY → signals → cable",   bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
  ];
  const STEP_H = 44; const ARR_H = 10;
  const totalH = 48 + stages.length * (STEP_H + ARR_H) + 44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Packet journey through enterprise switch from ingress port to egress"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Packet Journey Through a Switch — Ingress to Egress</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">ASIC Fast Path — nanoseconds · CPU Slow Path for control/exception traffic</text>
      {stages.map((s, i) => {
        const y = 42 + i * (STEP_H + ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill={s.bg} stroke={s.b} strokeWidth="1.5"/>
            <rect x="10" y={y} width="34" height={STEP_H} rx="6" fill={s.b}/>
            <rect x="34" y={y} width="4" height={STEP_H} fill={s.b}/>
            <text x="27" y={y + STEP_H / 2 + 5} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">{s.n}</text>
            <text x="48" y={y + 15} fontSize="9.5" fontWeight="700" fill={s.tc}>{s.t}</text>
            <text x="48" y={y + 30} fontSize="8" fill="#6b7280">{s.s}</text>
            {i < stages.length - 1 && (
              <g>
                <line x1="240" y1={y + STEP_H} x2="240" y2={y + STEP_H + ARR_H - 3} stroke={s.b} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-3} 245,${y+STEP_H+ARR_H-3} 240,${y+STEP_H+ARR_H}`} fill={s.b}/>
              </g>
            )}
          </g>
        );
      })}
      {(() => { const sy = 42 + stages.length * (STEP_H + ARR_H) + 4; return (
        <g>
          <rect x="10" y={sy} width="225" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
          <text x="122" y={sy + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e40af">ASIC Fast Path</text>
          <text x="122" y={sy + 24} textAnchor="middle" fontSize="8" fill="#1e40af">Known unicast · VLAN · ACL · QoS</text>
          <rect x="245" y={sy} width="225" height="30" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1"/>
          <text x="357" y={sy + 11} textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">CPU Slow Path</text>
          <text x="357" y={sy + 24} textAnchor="middle" fontSize="8" fill="#991b1b">STP BPDUs · routing hellos · ICMP to switch</text>
        </g>
      ); })()}
    </svg>
  );
}
