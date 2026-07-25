"use client";
// D5 — Security Zones Architecture
export default function SecurityZonesArch() {
  const W = 480;
  const zones = [
    { name:"UNTRUST / OUTSIDE", desc:"Internet, public-facing, untrusted external", color:"#dc2626", y:40, h:40 },
    { name:"DMZ", desc:"Public services: reverse proxy, web, mail, DNS", color:"#f59e0b", y:100, h:40 },
    { name:"USERS / CAMPUS", desc:"End-user devices, workstations, guest", color:"#0ea5e9", y:160, h:40 },
    { name:"SERVERS / APPLICATION", desc:"Internal application servers", color:"#8b5cf6", y:220, h:40 },
    { name:"DATABASE", desc:"Database tier — typically most restricted", color:"#16a34a", y:280, h:40 },
    { name:"MANAGEMENT", desc:"OOB, network device management, firewall admin", color:"#6b7280", y:340, h:40 },
  ];
  const permits = [
    { from:"Untrust → DMZ", svc:"HTTPS/443", color:"#16a34a" },
    { from:"Trust/Users → Untrust", svc:"HTTPS, DNS", color:"#16a34a" },
    { from:"DMZ → Servers", svc:"Specific app port only", color:"#16a34a" },
    { from:"Servers → Database", svc:"Specific DB port only", color:"#16a34a" },
    { from:"Untrust → Trust", svc:"(no permit rule → default deny)", color:"#dc2626" },
    { from:"DMZ → Trust/internal", svc:"(no direct permit — firewall enforces)", color:"#dc2626" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 520`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Security zone architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="520" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Security Zone Architecture</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="9" fill="#6b7280">Zone-based policy model — one architectural approach (not universal)</text>
      {zones.map((z) => (
        <g key={z.name}>
          <rect x="10" y={z.y} width="240" height={z.h} rx="6" fill="#fff" stroke={z.color} strokeWidth="2"/>
          <rect x="10" y={z.y} width="8" height={z.h} rx="6" fill={z.color}/>
          <text x="24" y={z.y+16} fontSize="9" fontWeight="700" fill={z.color}>{z.name}</text>
          <text x="24" y={z.y+30} fontSize="8" fill="#374151">{z.desc}</text>
        </g>
      ))}
      {/* FIREWALL label */}
      <rect x="254" y="180" width="64" height="140" rx="8" fill="#374151"/>
      <text x="286" y="255" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" transform="rotate(-90,286,255)">FIREWALL</text>
      <text x="286" y="300" textAnchor="middle" fontSize="7" fill="#9ca3af">Zone-pair</text>
      <text x="286" y="312" textAnchor="middle" fontSize="7" fill="#9ca3af">policy</text>
      {/* Policy pairs */}
      <rect x="322" y="40" width={W-330} height="340" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x="322+((W-330)/2)" y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Example Zone-Pair Policies</text>
      {permits.map((p, i) => (
        <g key={i}>
          <text x="330" y={72+i*46} fontSize="8" fontWeight="700" fill={p.color}>{p.from}</text>
          <text x="330" y={86+i*46} fontSize="8" fill="#374151">{p.svc}</text>
          {i < permits.length-1 && <line x1="330" y1={96+i*46} x2={W-12} y2={96+i*46} stroke="#e5e7eb" strokeWidth="0.5"/>}
        </g>
      ))}
      <rect x="10" y="394" width={W-20} height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="408" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Zone names are conceptual examples — not universal mandatory terminology.</text>
      <text x={W/2} y="422" textAnchor="middle" fontSize="8" fill="#92400e">Zone-based and interface-security-level models are both valid — zone-based is one architectural approach. Intra-zone behavior: platform and config dependent.</text>
      <rect x="10" y="436" width={W-20} height="24" rx="5" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1"/>
      <text x={W/2} y="451" textAnchor="middle" fontSize="8" fill="#0c4a6e">VLANs create network segments — they do not by themselves enforce inter-zone security policy. Both VLAN segmentation + firewall policy typically used together.</text>
    </svg>
  );
}
