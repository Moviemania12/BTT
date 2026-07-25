"use client";
export default function FourPointPacketMethod() {
  return (
    <svg viewBox="0 0 480 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four-point packet troubleshooting method"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="340" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">The Four-Point Packet Method</text>
      <text x="240" y="34" textAnchor="middle" fontSize="9" fill="#6b7280">Conceptual troubleshooting model — not a requirement for four physical interfaces</text>
      <rect x="10" y="44" width="60" height="28" rx="5" fill="#374151"/>
      <text x="40" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">CLIENT</text>
      <circle cx="110" cy="58" r="14" fill="#0ea5e9"/>
      <text x="110" y="54" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">P1</text>
      <text x="110" y="64" textAnchor="middle" fontSize="7" fill="#fff">Ingress</text>
      <rect x="165" y="44" width="150" height="28" rx="5" fill="#374151"/>
      <text x="240" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">FIREWALL</text>
      <circle cx="370" cy="58" r="14" fill="#0ea5e9"/>
      <text x="370" y="54" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">P2</text>
      <text x="370" y="64" textAnchor="middle" fontSize="7" fill="#fff">Egress</text>
      <rect x="410" y="44" width="60" height="28" rx="5" fill="#374151"/>
      <text x="440" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">SERVER</text>
      <line x1="70" y1="58" x2="96" y2="58" stroke="#0ea5e9" strokeWidth="1.5"/>
      <line x1="124" y1="58" x2="165" y2="58" stroke="#0ea5e9" strokeWidth="1.5"/>
      <line x1="315" y1="58" x2="356" y2="58" stroke="#0ea5e9" strokeWidth="1.5"/>
      <line x1="384" y1="58" x2="410" y2="58" stroke="#0ea5e9" strokeWidth="1.5"/>
      <line x1="440" y1="100" x2="440" y2="116" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="410" y="116" width="60" height="28" rx="5" fill="#374151"/>
      <text x="440" y="134" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">SERVER</text>
      <circle cx="370" cy="130" r="14" fill="#16a34a"/>
      <text x="370" y="126" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">P3</text>
      <text x="370" y="136" textAnchor="middle" fontSize="7" fill="#fff">Ret-In</text>
      <rect x="165" y="116" width="150" height="28" rx="5" fill="#374151"/>
      <text x="240" y="134" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">FIREWALL</text>
      <circle cx="110" cy="130" r="14" fill="#16a34a"/>
      <text x="110" y="126" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">P4</text>
      <text x="110" y="136" textAnchor="middle" fontSize="7" fill="#fff">Ret-Out</text>
      <rect x="10" y="116" width="60" height="28" rx="5" fill="#374151"/>
      <text x="40" y="134" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">CLIENT</text>
      <line x1="410" y1="130" x2="384" y2="130" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="356" y1="130" x2="315" y2="130" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="165" y1="130" x2="124" y2="130" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="96" y1="130" x2="70" y2="130" stroke="#16a34a" strokeWidth="1.5"/>
      <rect x="10" y="162" width="460" height="90" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x="240" y="178" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Interpretation</text>
      {[
        { cond:"P1 not observed", interp:"Problem before firewall — client, upstream network, routing", color:"#dc2626" },
        { cond:"P1 ✓  P2 not observed", interp:"Investigate FW outbound processing — policy, routing, NAT, inspection. Verify capture semantics.", color:"#f59e0b" },
        { cond:"If P2 = confirmed egress, P3 missing", interp:"Investigation moves beyond FW — downstream network, server, return path", color:"#f59e0b" },
        { cond:"P3 ✓  P4 not observed", interp:"Firewall return-flow processing — stateful mismatch, return policy, asymmetric routing", color:"#f59e0b" },
        { cond:"All four observed", interp:"FW path forwarding both directions. Investigate endpoints/application or beyond capture boundaries", color:"#16a34a" },
      ].map((r,i) => (
        <g key={i}>
          <text x="18" y={190+i*12} fontSize="8" fontWeight="600" fill={r.color}>{r.cond}:</text>
          <text x="175" y={190+i*12} fontSize="7.5" fill="#374151">{r.interp}</text>
        </g>
      ))}
      <rect x="10" y="260" width="460" height="30" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="272" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">P2 absence ≠ proven internal drop. Verify capture-point semantics and filters.</text>
      <text x="240" y="284" textAnchor="middle" fontSize="8" fill="#92400e">Missing P3 does not prove server is at fault — it narrows the investigation domain beyond FW egress. Root cause requires further investigation.</text>
    </svg>
  );
}
