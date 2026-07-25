"use client";
// D3 — Session Table / 5-Tuple
export default function SessionTableFiveTuple() {
  const W = 480;
  const rows = [
    { key:"10.10.10.25:54321 → 1.2.3.4:443", proto:"TCP", state:"ESTABLISHED", nat:"src→198.51.100.50:10001", color:"#16a34a" },
    { key:"10.10.10.30:35000 → 8.8.8.8:53", proto:"UDP", state:"Flow state + idle timer", nat:"src→198.51.100.50:10002", color:"#0ea5e9" },
    { key:"10.10.10.10 → 8.8.8.8 (ICMP Type 8 ID 1234)", proto:"ICMP", state:"Short timeout", nat:"No NAT", color:"#8b5cf6" },
    { key:"10.10.10.40:52200 → 1.2.3.4:80", proto:"TCP", state:"SYN_SENT (half-open)", nat:"src→198.51.100.50:10003", color:"#f59e0b" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 370`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Session table five-tuple example"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="370" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Session/Flow Table — 5-Tuple and State</text>
      {/* 5-Tuple box */}
      <rect x="10" y="32" width={W-20} height="68" rx="7" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x={W/2} y="48" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0ea5e9">5-Tuple (TCP/UDP) — Flow Identifier</text>
      {[
        { label:"Source IP", ex:"10.10.10.25" },
        { label:"Source Port", ex:"54321" },
        { label:"Destination IP", ex:"1.2.3.4" },
        { label:"Destination Port", ex:"443" },
        { label:"Protocol", ex:"TCP (6)" },
      ].map((f, i) => (
        <g key={i}>
          <text x={20+i*94} y="66" fontSize="8.5" fontWeight="600" fill="#0c4a6e">{f.label}</text>
          <text x={20+i*94} y="79" fontSize="8.5" fill="#374151" fontFamily="monospace">{f.ex}</text>
        </g>
      ))}
      <text x={W/2} y="94" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">ICMP and other non-port protocols use protocol-specific flow keys — no transport ports</text>
      {/* Table header */}
      <rect x="10" y="108" width={W-20} height="18" rx="3" fill="#374151"/>
      {["Flow Key (5-tuple or protocol-specific)","Proto","State","NAT"].map((h,i) => (
        <text key={i} x={[18,262,310,390][i]} y="120" fontSize="8" fontWeight="700" fill="#fff">{h}</text>
      ))}
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="10" y={126+i*44} width={W-20} height="40" rx="3" fill={i%2===0?"#fff":"#f9fafb"} stroke={r.color} strokeWidth="0.5"/>
          <text x="18" y={126+i*44+14} fontSize="7.5" fontFamily="monospace" fill="#374151">{r.key}</text>
          <rect x="10" y={126+i*44} width="6" height="40" rx="3" fill={r.color}/>
          <text x="18" y={126+i*44+28} fontSize="7.5" fill="#6b7280">NAT: {r.nat}</text>
          <text x="262" y={126+i*44+18} fontSize="8" fontWeight="600" fill={r.color}>{r.proto}</text>
          <text x="310" y={126+i*44+18} fontSize="7.5" fill="#374151">{r.state}</text>
        </g>
      ))}
      <rect x="10" y="310" width={W-20} height="48" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="325" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Session table size = platform-rated limit. Exhaustion prevents new connections.</text>
      <text x={W/2} y="339" textAnchor="middle" fontSize="8" fill="#92400e">5-tuple applies to TCP/UDP. Some platforms include additional fields (VLAN, VRF, interface) — platform dependent.</text>
      <text x={W/2} y="352" textAnchor="middle" fontSize="8" fill="#92400e">Half-open TCP sessions may be tracked separately. Session capacity and half-open limits are platform-specific.</text>
    </svg>
  );
}
