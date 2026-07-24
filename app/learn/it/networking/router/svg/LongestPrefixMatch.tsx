"use client";
// D5 — Longest Prefix Match: FIB lookup with overlapping prefixes
export default function LongestPrefixMatch() {
  const W = 480;
  const entries = [
    { prefix:"0.0.0.0/0",      len:"/0",  action:"ISP via Gi0/2",  color:"#6b7280" },
    { prefix:"10.0.0.0/8",     len:"/8",  action:"Gi0/3",          color:"#0ea5e9" },
    { prefix:"10.10.0.0/16",   len:"/16", action:"Gi0/0",          color:"#8b5cf6" },
    { prefix:"10.10.20.0/24",  len:"/24", action:"Gi0/1",          color:"#f59e0b" },
    { prefix:"10.10.20.5/32",  len:"/32", action:"Gi0/4 (host)",   color:"#16a34a" },
  ];
  const packets = [
    { dst:"10.10.20.5",  winner:"/32", result:"→ Gi0/4", note:"All 5 entries match — /32 most specific wins" },
    { dst:"10.10.20.100",winner:"/24", result:"→ Gi0/1", note:"/32 does NOT match .100 — /24 is longest match" },
    { dst:"172.16.0.1",  winner:"/0",  result:"→ ISP",   note:"Only default route matches — last resort" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 440`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Longest Prefix Match forwarding lookup example"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="440" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Longest Prefix Match (LPM) — FIB Lookup</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="9" fill="#6b7280">Most-specific matching prefix wins — forwarding-time FIB lookup, separate from RIB route selection</text>
      {/* FIB table */}
      <text x="14" y="52" fontSize="9.5" fontWeight="700" fill="#374151">FIB Entries:</text>
      <rect x="10" y="56" width={W-20} height="20" rx="3" fill="#e5e7eb"/>
      <text x="20" y="69" fontSize="8.5" fontWeight="700" fill="#374151">Prefix</text>
      <text x="170" y="69" fontSize="8.5" fontWeight="700" fill="#374151">Length</text>
      <text x="230" y="69" fontSize="8.5" fontWeight="700" fill="#374151">Action</text>
      {entries.map((e, i) => (
        <g key={i}>
          <rect x="10" y={76+i*20} width={W-20} height="20" rx="2" fill={i%2===0?"#fff":"#f9fafb"} stroke={e.color} strokeWidth="0.5"/>
          <text x="20" y={76+i*20+13} fontSize="8.5" fill="#111827" fontFamily="monospace">{e.prefix}</text>
          <text x="170" y={76+i*20+13} fontSize="9" fontWeight="700" fill={e.color}>{e.len}</text>
          <text x="230" y={76+i*20+13} fontSize="8.5" fill="#374151">{e.action}</text>
        </g>
      ))}
      {/* Packet examples */}
      <text x="14" y="192" fontSize="9.5" fontWeight="700" fill="#374151">Three Example Packets:</text>
      {packets.map((p, i) => (
        <g key={i}>
          <rect x="10" y={200+i*72} width={W-20} height="64" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
          <rect x="10" y={200+i*72} width={W-20} height="18" rx="6" fill="#1e40af"/>
          <rect x="10" y={200+i*72+10} width={W-20} height="8" fill="#1e40af"/>
          <text x="18" y={200+i*72+13} fontSize="9" fontWeight="700" fill="#fff">Packet {i+1}: dst = {p.dst}</text>
          <text x="18" y={200+i*72+32} fontSize="8.5" fill="#374151">Winner: <tspan fontWeight="700" fill="#16a34a">{p.winner}</tspan> {p.result}</text>
          <text x="18" y={200+i*72+46} fontSize="8" fill="#6b7280" fontStyle="italic">{p.note}</text>
          <text x="18" y={200+i*72+58} fontSize="7.5" fill="#9ca3af">→ No match + no default = drop → ICMP Destination Unreachable to source</text>
        </g>
      ))}
    </svg>
  );
}
