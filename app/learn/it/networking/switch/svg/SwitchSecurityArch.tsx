"use client";
// D43 — Enterprise Switch Security Architecture
export default function SwitchSecurityArch() {
  const layers = [
    {
      label:"Management Plane Security",  border:"#7c3aed", bg:"#ede9fe", tc:"#5b21b6",
      items:["SSH v2 only (no Telnet)","AAA — TACACS+/RADIUS centralized","SNMPv3 (no v1/v2c community strings)","VTY ACL — authorized IPs only","OOB management network","Login banner + session timeout"],
    },
    {
      label:"Control Plane Security",     border:"#2563eb", bg:"#dbeafe", tc:"#1e40af",
      items:["CoPP — CPU rate limiting","BPDU Guard — unauthorized switch blocks","Root Guard — root bridge protection","Loop Guard — unidirectional link","UDLD — physical link verification"],
    },
    {
      label:"Data Plane Security",        border:"#16a34a", bg:"#dcfce7", tc:"#15803d",
      items:["DHCP Snooping — rogue DHCP blocked","DAI — ARP spoofing prevention","IP Source Guard — IP spoofing blocked","Port Security — MAC address limiting","Storm Control — broadcast/multicast threshold","802.1X — port-based network access control","ACL — L2/L3/L4 traffic filtering"],
    },
  ];
  const HEAD=24; const ROW=16; const PAD=6; const GAP=8;
  const cardH = (n:number) => HEAD+n*ROW+PAD*2;
  const totalH = 44 + layers.reduce((s,l)=>s+cardH(l.items.length)+GAP,0) + 28;
  let y = 44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Enterprise switch security architecture — management, control, and data plane"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Enterprise Switch Security — Defense in Depth</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Management · Control · Data Plane — multiple independent security layers</text>
      {layers.map((l, li) => {
        const h = cardH(l.items.length); const gy=y;
        const el = (
          <g key={li}>
            <rect x="10" y={gy} width="460" height={h} rx="7" fill={l.bg} stroke={l.border} strokeWidth="2"/>
            <rect x="10" y={gy} width="460" height={HEAD} rx="7" fill={l.border}/>
            <rect x="10" y={gy+HEAD-5} width="460" height="5" fill={l.border}/>
            <text x="240" y={gy+HEAD-7} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{l.label}</text>
            {l.items.map((item, ii) => (
              <g key={ii}>
                <text x="22" y={gy+HEAD+PAD+ii*ROW+12} fontSize="9.5" fill={l.border}>▸</text>
                <text x="34" y={gy+HEAD+PAD+ii*ROW+12} fontSize="9.5" fill={l.tc}>{item}</text>
              </g>
            ))}
          </g>
        );
        y += h + GAP; return el;
      })}
      <rect x="10" y={y} width="460" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y+14} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">No single security feature is sufficient — all layers together = enterprise security posture</text>
    </svg>
  );
}
