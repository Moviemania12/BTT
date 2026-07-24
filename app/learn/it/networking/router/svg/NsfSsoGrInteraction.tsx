"use client";
// D23 — NSF/SSO/GR Interaction during supervisor failover
export default function NsfSsoGrInteraction() {
  const W = 480;
  const events = [
    { t:"T=0", label:"Active supervisor fails", color:"#dc2626" },
    { t:"T+Xms", label:"SSO: Standby takes over with synchronized state | Data plane: FIB unchanged, forwarding continues", color:"#f59e0b" },
    { t:"T+0 to T+Ys", label:"Control plane restarts on new Active supervisor\nOSPF: Grace-LSA originated (planned: before restart / unplanned: after recovery per RFC 3623)\nBGP: GR capability in OPEN; End-of-RIB markers used in recovery (RFC 4724)\nNeighbors: GR helpers hold routes during grace period (topology changes can terminate GR)", color:"#8b5cf6" },
    { t:"T+Ys", label:"Routing protocols reconverge | OSPF adjacencies re-established | BGP sessions re-established", color:"#0ea5e9" },
    { t:"T+Zs", label:"Full convergence — routing state refreshed, forwarding continues", color:"#16a34a" },
  ];
  const totalH = 52 + events.length * 76 + 80;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="NSF SSO Graceful Restart interaction timeline"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">NSF / SSO / Graceful Restart — Interaction</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#6b7280">Supervisor failover on dual-supervisor platform (timeline conceptual — times are platform/config dependent)</text>
      {events.map((e, i) => (
        <g key={i}>
          <rect x="10" y={48+i*76} width={W-20} height="68" rx="6" fill="#fff" stroke={e.color} strokeWidth="1.5"/>
          <rect x="10" y={48+i*76} width="56" height="68" rx="6" fill={e.color}/>
          <rect x="54" y={48+i*76} width="12" height="68" fill={e.color}/>
          <text x="33" y={48+i*76+38} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{e.t}</text>
          {e.label.split("\n").map((line, li) => (
            <text key={li} x="74" y={48+i*76+18+li*14} fontSize="8" fill="#374151">{line}</text>
          ))}
        </g>
      ))}
      <rect x="10" y={48+events.length*76+4} width={W-20} height="60" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x={W/2} y={48+events.length*76+18} textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Critical Qualifications</text>
      <text x={W/2} y={48+events.length*76+32} textAnchor="middle" fontSize="8" fill="#374151">NSF = local data-plane continuity | Protocol GR = neighbor cooperation required (separate mechanisms)</text>
      <text x={W/2} y={48+events.length*76+46} textAnchor="middle" fontSize="8" fill="#374151">X, Y, Z times are NOT universal — platform/NOS/protocol/config dependent</text>
      <text x={W/2} y={48+events.length*76+58} textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#a16207">Aggressive BFD may defeat GR if BFD session fails during restart — verify platform architecture</text>
    </svg>
  );
}
