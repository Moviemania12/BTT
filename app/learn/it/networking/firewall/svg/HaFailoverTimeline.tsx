"use client";
export default function HaFailoverTimeline() {
  const steps = [
    { label:"Failure occurs", color:"#dc2626" },
    { label:"HA failure condition detected", color:"#f59e0b" },
    { label:"HA decision / role transition", color:"#f59e0b" },
    { label:"Interface / address ownership update", color:"#0ea5e9" },
    { label:"Neighbor/L2 convergence (ARP/ND, MAC relearning)", color:"#8b5cf6", parallel: true },
    { label:"Routing convergence (dynamic routing, where applicable)", color:"#8b5cf6", parallel: true },
    { label:"Traffic recovery", color:"#16a34a" },
  ];
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HA failover timeline conceptual"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="360" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">HA Failover Timeline — Conceptual</text>
      <text x="240" y="34" textAnchor="middle" fontSize="9" fill="#6b7280">Timing and exact order are platform-dependent — some stages may overlap</text>
      {steps.filter(s => !s.parallel).map((s, i) => {
        const actualI = steps.slice(0, steps.indexOf(s)).filter(x=>!x.parallel).length;
        return (
          <g key={i}>
            <rect x="80" y={46+actualI*38} width="320" height="28" rx="6" fill="#fff" stroke={s.color} strokeWidth="1.5"/>
            <rect x="80" y={46+actualI*38} width="6" height="28" rx="6" fill={s.color}/>
            <text x="96" y={46+actualI*38+17} fontSize="9" fill="#374151" fontWeight="600">{s.label}</text>
            {actualI < steps.filter(x=>!x.parallel).length-1 && !steps[steps.indexOf(s)+1]?.parallel &&
              <line x1="240" y1={46+actualI*38+28} x2="240" y2={46+actualI*38+38} stroke="#9ca3af" strokeWidth="1.5"/>}
          </g>
        );
      })}
      {/* Parallel box */}
      <rect x="60" y="198" width="360" height="64" rx="7" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x="240" y="212" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#8b5cf6">These may occur in parallel (order/overlap: platform-dependent)</text>
      <rect x="70" y="218" width="155" height="36" rx="5" fill="#fff" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="147" y="234" textAnchor="middle" fontSize="8" fill="#374151">Neighbor/L2 convergence</text>
      <text x="147" y="246" textAnchor="middle" fontSize="7.5" fill="#6b7280">(ARP/ND updates, MAC relearn)</text>
      <rect x="255" y="218" width="155" height="36" rx="5" fill="#fff" stroke="#8b5cf6" strokeWidth="1"/>
      <text x="332" y="234" textAnchor="middle" fontSize="8" fill="#374151">Routing convergence</text>
      <text x="332" y="246" textAnchor="middle" fontSize="7.5" fill="#6b7280">(dynamic routing, where applicable)</text>
      <line x1="240" y1="262" x2="240" y2="276" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="80" y="276" width="320" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <rect x="80" y="276" width="6" height="28" rx="6" fill="#16a34a"/>
      <text x="96" y="293" fontSize="9" fill="#374151" fontWeight="600">Traffic recovery</text>
      <rect x="10" y="316" width="460" height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="330" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Client-visible recovery time = critical path across all these stages.</text>
      <text x="240" y="344" textAnchor="middle" fontSize="8" fill="#92400e">Detection timer, role transition, L2 convergence, routing convergence all contribute. HA does not mean instant recovery.</text>
    </svg>
  );
}
