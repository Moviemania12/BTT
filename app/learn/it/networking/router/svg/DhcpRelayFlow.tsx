"use client";
// D15 — DHCP Relay Flow with giaddr explanation
export default function DhcpRelayFlow() {
  const W = 480;
  const steps = [
    { n:"1", who:"Client (no IP)", msg:"DHCP Discover → Broadcast 255.255.255.255 (src: 0.0.0.0)", color:"#0ea5e9" },
    { n:"2", who:"Router (Relay)", msg:"Receives broadcast on 10.0.1.1 interface → sets giaddr=10.0.1.1 → unicast to DHCP server", color:"#8b5cf6" },
    { n:"3", who:"DHCP Server", msg:"Reads giaddr: 10.0.1.1 → selects 10.0.1.0/24 pool → sends DHCP Offer unicast to giaddr", color:"#16a34a" },
    { n:"4", who:"Router (Relay)", msg:"Receives Offer → forwards to client → Client gets IP 10.0.1.50/24, gateway 10.0.1.1", color:"#f59e0b" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 360`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="DHCP relay flow with giaddr"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="360" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">DHCP Relay / IP Helper Flow</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="8.5" fill="#6b7280">Broadcast does not cross router — relay agent bridges the gap via unicast</text>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x="10" y={46+i*66} width={W-20} height="58" rx="6" fill="#fff" stroke={s.color} strokeWidth="1.5"/>
          <rect x="10" y={46+i*66} width="34" height="58" rx="6" fill={s.color}/>
          <rect x="34" y={46+i*66} width="10" height="58" fill={s.color}/>
          <text x="27" y={46+i*66+32} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{s.n}</text>
          <text x="52" y={46+i*66+18} fontSize="9" fontWeight="700" fill={s.color}>{s.who}</text>
          <text x="52" y={46+i*66+33} fontSize="8.5" fill="#374151">{s.msg}</text>
          {i < steps.length-1 && <text x={W/2} y={46+i*66+64} textAnchor="middle" fontSize="12" fill="#9ca3af">↓</text>}
        </g>
      ))}
      <rect x="10" y="316" width={W-20} height="34" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x={W/2} y="330" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#16a34a">giaddr = relay agent interface IP on client subnet → identifies pool to DHCP server</text>
      <text x={W/2} y="343" textAnchor="middle" fontSize="7.5" fill="#374151">Option 82 = relay agent information (circuit-id, remote-id) — separate from giaddr, platform/config optional</text>
      <text x={W/2} y="353" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#9ca3af">ip helper-address = Cisco IOS command for relay agent — not the protocol name. DHCPv6 relay uses different mechanism (RFC 8415)</text>
    </svg>
  );
}
