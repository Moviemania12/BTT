"use client";
// D2 — Packet Forwarding Journey through a Router (ingress to egress)
export default function PacketForwardingJourney() {
  const steps = [
    { n:"1", title:"Physical Reception", color:"#0ea5e9", detail:"Electrical/optical signal → PHY converts to bits → CRC/FCS validated" },
    { n:"2", title:"L2 Frame Processing", color:"#0ea5e9", detail:"Dst MAC = this router's interface MAC → L2 header stripped → IP payload extracted" },
    { n:"3", title:"Destination Check", color:"#8b5cf6", detail:"Dst IP = router's own IP? → Control plane (SSH, OSPF, BGP)\nDst IP = other host? → Data plane forwarding path" },
    { n:"4", title:"FIB Lookup — LPM", color:"#16a34a", detail:"Longest Prefix Match on FIB → most-specific matching prefix wins → next-hop + egress interface determined" },
    { n:"5", title:"TTL / Hop Limit Check", color:"#16a34a", detail:"IPv4: TTL decrement → recalculate header checksum\nIPv6: Hop Limit decrement → no header checksum\nTTL/Hop Limit = 0 → drop → ICMP Time Exceeded to source" },
    { n:"6", title:"Next-Hop L2 Resolution", color:"#f59e0b", detail:"IPv4: ARP cache lookup → next-hop MAC\nIPv6: Neighbor Cache → next-hop link-layer addr\nNot found → ARP/NS sent → packet queued" },
    { n:"7", title:"New L2 Header Written", color:"#f59e0b", detail:"Src MAC = this router's egress interface MAC\nDst MAC = next-hop MAC\nIP Src/Dst: UNCHANGED end-to-end" },
    { n:"8", title:"Outbound Policy", color:"#ef4444", detail:"ACL, QoS, NAT, MPLS label ops (if configured)\nExact pipeline order: platform dependent" },
    { n:"9", title:"Egress Transmission", color:"#ef4444", detail:"Frame queued per QoS policy → transmitted on egress interface" },
  ];
  const W = 480; const SH = 46; const PAD_Y = 50; const GAP = 6;
  const totalH = PAD_Y + steps.length * (SH + GAP) + 80;
  return (
    <svg viewBox={`0 0 ${W} ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Packet forwarding journey through a router"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height={totalH} fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Packet Forwarding Journey — Ingress to Egress</text>
      <text x={W/2} y="36" textAnchor="middle" fontSize="9.5" fill="#6b7280">Host-A → Router-R1 → Host-B</text>
      {steps.map((s, i) => {
        const y = PAD_Y + i * (SH + GAP);
        return (
          <g key={i}>
            <rect x="10" y={y} width={W-20} height={SH} rx="6" fill="#fff" stroke={s.color} strokeWidth="1.5"/>
            <rect x="10" y={y} width="30" height={SH} rx="6" fill={s.color}/>
            <rect x="30" y={y} width="10" height={SH} fill={s.color}/>
            <text x="25" y={y + SH/2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{s.n}</text>
            <text x="50" y={y + 14} fontSize="9.5" fontWeight="700" fill={s.color}>{s.title}</text>
            {s.detail.split("\n").map((line, li) => (
              <text key={li} x="50" y={y + 27 + li*12} fontSize="8.5" fill="#374151">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <text x={W/2} y={y + SH + GAP - 1} textAnchor="middle" fontSize="10" fill="#9ca3af">↓</text>
            )}
          </g>
        );
      })}
      <rect x="10" y={PAD_Y + steps.length*(SH+GAP) + 4} width={W-20} height="28" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x={W/2} y={PAD_Y + steps.length*(SH+GAP) + 15} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">IP Source/Destination: UNCHANGED end-to-end</text>
      <text x={W/2} y={PAD_Y + steps.length*(SH+GAP) + 27} textAnchor="middle" fontSize="8.5" fill="#15803d">L2 frame = NEW every hop (Src/Dst MAC rewritten at each router)</text>
    </svg>
  );
}
