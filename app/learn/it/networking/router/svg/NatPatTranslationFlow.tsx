"use client";
// D14 — NAT/PAT Translation Flow with translation table
export default function NatPatTranslationFlow() {
  const W = 480;
  const entries = [
    { inside:"192.168.1.5:4523",  proto:"TCP", outside:"203.0.113.1:1024", dst:"1.2.3.4:443" },
    { inside:"192.168.1.10:8091", proto:"TCP", outside:"203.0.113.1:1025", dst:"5.6.7.8:80"  },
    { inside:"192.168.1.20:6234", proto:"TCP", outside:"203.0.113.1:1026", dst:"1.2.3.4:443" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="NAT PAT translation table and packet flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">NAT / PAT — Translation Flow</text>
      {/* Hosts */}
      <rect x="10" y="34" width="130" height="76" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="75" y="50" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9">Internal Hosts</text>
      {["192.168.1.5","192.168.1.10","192.168.1.20"].map((h, i) => (
        <text key={i} x="75" y={63+i*14} textAnchor="middle" fontSize="8" fill="#374151">{h}</text>
      ))}
      {/* NAT Router */}
      <rect x="165" y="34" width="150" height="76" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="240" y="50" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#16a34a">NAT / PAT Router</text>
      <text x="240" y="64" textAnchor="middle" fontSize="7.5" fill="#374151">Inside: 192.168.1.0/24</text>
      <text x="240" y="77" textAnchor="middle" fontSize="7.5" fill="#374151">Outside: 203.0.113.1</text>
      <text x="240" y="90" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">NAT processing order:</text>
      <text x="240" y="102" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">platform dependent</text>
      {/* Internet */}
      <rect x="340" y="34" width="130" height="76" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="405" y="50" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Internet</text>
      <text x="405" y="64" textAnchor="middle" fontSize="8" fill="#374151">Servers see traffic</text>
      <text x="405" y="77" textAnchor="middle" fontSize="8" fill="#374151">from 203.0.113.1</text>
      <text x="405" y="90" textAnchor="middle" fontSize="7.5" fill="#374151">(different source ports)</text>
      {/* Arrows */}
      <line x1="140" y1="72" x2="165" y2="72" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="315" y1="72" x2="340" y2="72" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arr)"/>
      <line x1="340" y1="84" x2="315" y2="84" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr)"/>
      <text x="328" y="98" textAnchor="middle" fontSize="7.5" fill="#ca8a04">Return lookup</text>
      {/* Translation table */}
      <text x="14" y="130" fontSize="9.5" fontWeight="700" fill="#374151">PAT Translation Table:</text>
      <rect x="10" y="136" width={W-20} height="18" rx="3" fill="#374151"/>
      {["Inside IP:Port","Proto","Outside IP:Port","Destination"].map((h, i) => (
        <text key={i} x={18+i*115} y="148" fontSize="7.5" fontWeight="700" fill="#fff">{h}</text>
      ))}
      {entries.map((e, i) => (
        <g key={i}>
          <rect x="10" y={154+i*22} width={W-20} height="20" rx="2" fill={i%2===0?"#fff":"#f9fafb"}/>
          <text x="18" y={154+i*22+13} fontSize="8" fill="#374151" fontFamily="monospace">{e.inside}</text>
          <text x="133" y={154+i*22+13} fontSize="8" fill="#374151">{e.proto}</text>
          <text x="175" y={154+i*22+13} fontSize="8" fontWeight="700" fill="#16a34a" fontFamily="monospace">{e.outside}</text>
          <text x="310" y={154+i*22+13} fontSize="8" fill="#374151" fontFamily="monospace">{e.dst}</text>
        </g>
      ))}
      {/* Notes */}
      <rect x="10" y="224" width={W-20} height="100" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="240" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Engineering Notes</text>
      {[
        "Single public IP (203.0.113.1) — differentiated by source port numbers",
        "Return traffic: dst 203.0.113.1:1025 → NAT lookup → 192.168.1.10:8091",
        "Translation table entry must exist for return traffic to succeed",
        "Timeout: platform dependent — TCP established vs TCP half-open vs UDP differ",
        "PAT port exhaustion: add public IPs to pool or reduce timeouts",
        "Static NAT: persistent mapping — forwarding still requires routing + policy",
      ].map((n, i) => (
        <text key={i} x="18" y={254+i*14} fontSize="8" fill="#374151">• {n}</text>
      ))}
      <rect x="10" y="334" width={W-20} height="18" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="346" textAnchor="middle" fontSize="8" fill="#92400e">NAT is not a security mechanism — it is an address translation tool. ACL/firewall provides security.</text>
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#6b7280"/></marker></defs>
    </svg>
  );
}
