"use client";
// D21 — Router Commissioning Flow: 6 phases
export default function RouterCommissioningFlow() {
  const W = 480;
  const phases = [
    { n:"1", title:"Physical Verification", color:"#6b7280", items:["Hardware mounted, airflow correct","PSU-1→PDU-A, PSU-2→PDU-B (separate circuits)","Grounding verified","Console connected — production cables NOT connected yet"] },
    { n:"2", title:"Initial Boot", color:"#0ea5e9", items:["POST completes — no hardware errors","NOS version verified (matches planned)","Factory/clean state confirmed"] },
    { n:"3", title:"Base Configuration", color:"#8b5cf6", items:["Hostname, SSH v2, AAA, VTY ACL","Management IP + OOB default route","NTP synchronized, Syslog, SNMPv3","Service hardening, login banner"] },
    { n:"4", title:"Interface & Routing", color:"#f59e0b", items:["Loopback0 + explicit Router ID","Interfaces: IP, description, MTU","Routing protocols up — neighbors Full/Established","Routing table matches expected state"] },
    { n:"5", title:"Connectivity Verification", color:"#16a34a", items:["Ping all next-hops, traceroute path correct","BGP/OSPF state verified","ACL tested, SNMP reachable, Syslog flowing"] },
    { n:"6", title:"Documentation & Handover", color:"#dc2626", items:["Config saved to startup + external backup","Version-controlled in Git","Network diagram + IPAM updated","Handover communication sent"] },
  ];
  const totalH = 44 + phases.length * 88 + 28;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Router commissioning flow 6 phases"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Router Commissioning Flow</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#dc2626">⚠ Connect production cables ONLY after base configuration applied (SSH/AAA/ACL)</text>
      {phases.map((ph, i) => (
        <g key={i}>
          <rect x="10" y={44+i*88} width={W-20} height="80" rx="6" fill="#fff" stroke={ph.color} strokeWidth="1.5"/>
          <rect x="10" y={44+i*88} width="40" height="80" rx="6" fill={ph.color}/>
          <rect x="38" y={44+i*88} width="12" height="80" fill={ph.color}/>
          <text x="30" y={44+i*88+44} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{ph.n}</text>
          <text x="58" y={44+i*88+16} fontSize="9.5" fontWeight="700" fill={ph.color}>Phase {ph.n}: {ph.title}</text>
          {ph.items.map((item, ii) => (
            <text key={ii} x="58" y={44+i*88+30+ii*14} fontSize="8.5" fill="#374151">✓ {item}</text>
          ))}
          {i < phases.length-1 && <text x={W/2} y={44+i*88+86} textAnchor="middle" fontSize="10" fill="#9ca3af">↓</text>}
        </g>
      ))}
    </svg>
  );
}
