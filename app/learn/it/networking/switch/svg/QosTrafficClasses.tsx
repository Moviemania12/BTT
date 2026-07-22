"use client";
// D42 — QoS Processing Pipeline and Traffic Classes
export default function QosTrafficClasses() {
  const pipeline = [
    { step:"Classification",  desc:"Identify traffic: CoS (PCP 3-bit L2) / DSCP (6-bit IP) / port-based / ACL",  bg:"#dbeafe", b:"#2563eb", tc:"#1e40af" },
    { step:"Trust Boundary",  desc:"Trusted device (phone/server)? Accept marking. Untrusted (user PC)? Remark to BE.", bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
    { step:"Marking",         desc:"CoS 0-7 (L2 802.1p) · DSCP: EF=46 voice · AF41=video · CS0=best-effort",       bg:"#ede9fe", b:"#7c3aed", tc:"#5b21b6" },
    { step:"Queuing",         desc:"LLQ: strict priority for voice + CBWFQ for rest · WRED for congestion avoidance", bg:"#dcfce7", b:"#16a34a", tc:"#15803d" },
    { step:"Policing/Shaping",desc:"Policing: excess traffic dropped/remarked · Shaping: excess buffered, smoothed",   bg:"#fff7ed", b:"#ea580c", tc:"#c2410c" },
    { step:"Scheduling",      desc:"WFQ/CBWFQ/LLQ scheduler · ASIC/platform-dependent implementation",               bg:"#fef9c3", b:"#ca8a04", tc:"#92400e" },
  ];
  const STEP_H=42; const ARR_H=10;
  const classes = [
    { name:"Voice", dscp:"EF (46)", cos:"5", color:"#dc2626", bg:"#fee2e2" },
    { name:"Video", dscp:"AF41 (34)", cos:"4", color:"#7c3aed", bg:"#ede9fe" },
    { name:"Business App", dscp:"AF31 (26)", cos:"3", color:"#2563eb", bg:"#dbeafe" },
    { name:"Best Effort", dscp:"CS0 (0)", cos:"0", color:"#64748b", bg:"#f1f5f9" },
  ];
  const totalH = 48 + pipeline.length*(STEP_H+ARR_H) + 16 + 28 + classes.length*26 + 44;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="QoS Quality of Service processing pipeline and traffic classes"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Quality of Service — QoS Processing Pipeline</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Platform and ASIC dependent — concepts universal, implementation varies by vendor/hardware</text>
      {pipeline.map((s, i) => {
        const y = 42 + i*(STEP_H+ARR_H);
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height={STEP_H} rx="6" fill={s.bg} stroke={s.b} strokeWidth="1.5"/>
            <text x="95" y={y+15} textAnchor="middle" fontSize="10" fontWeight="700" fill={s.tc}>{s.step}</text>
            <line x1="165" y1={y+5} x2="165" y2={y+37} stroke={s.b} strokeWidth="1" opacity="0.4"/>
            <text x="318" y={y+16} textAnchor="middle" fontSize="8.5" fill={s.tc}>{s.desc}</text>
            {i < pipeline.length-1 && (
              <g>
                <line x1="240" y1={y+STEP_H} x2="240" y2={y+STEP_H+ARR_H-3} stroke={s.b} strokeWidth="2"/>
                <polygon points={`235,${y+STEP_H+ARR_H-3} 245,${y+STEP_H+ARR_H-3} 240,${y+STEP_H+ARR_H}`} fill={s.b}/>
              </g>
            )}
          </g>
        );
      })}
      {(() => {
        const ty = 42 + pipeline.length*(STEP_H+ARR_H) + 14;
        return (
          <g>
            <text x="240" y={ty+12} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#111827">Common Traffic Classes</text>
            <rect x="10" y={ty+18} width="115" height="20" rx="3" fill="#1e293b"/>
            <text x="62" y={ty+31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Traffic</text>
            <rect x="127" y={ty+18} width="115" height="20" rx="3" fill="#1e293b"/>
            <text x="184" y={ty+31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">DSCP</text>
            <rect x="244" y={ty+18} width="80" height="20" rx="3" fill="#1e293b"/>
            <text x="284" y={ty+31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">CoS</text>
            <rect x="326" y={ty+18} width="144" height="20" rx="3" fill="#1e293b"/>
            <text x="398" y={ty+31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Priority</text>
            {classes.map((c, i) => {
              const ry = ty+40+i*24;
              return (
                <g key={i}>
                  <rect x="10" y={ry} width="460" height="20" rx="3" fill={c.bg} stroke={c.color} strokeWidth="1"/>
                  <text x="62" y={ry+13} textAnchor="middle" fontSize="9" fontWeight="600" fill={c.color}>{c.name}</text>
                  <text x="184" y={ry+13} textAnchor="middle" fontSize="9" fill={c.color}>{c.dscp}</text>
                  <text x="284" y={ry+13} textAnchor="middle" fontSize="9" fill={c.color}>{c.cos}</text>
                  <text x="398" y={ry+13} textAnchor="middle" fontSize="9" fill={c.color}>{"★".repeat(4-i)}{"☆".repeat(i)}</text>
                </g>
              );
            })}
            {(() => { const ny = ty+40+classes.length*24+6; return (
              <g>
                <rect x="10" y={ny} width="460" height="30" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
                <text x="240" y={ny+12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Policing vs Shaping: Policing = drop excess · Shaping = buffer + delay excess</text>
                <text x="240" y={ny+24} textAnchor="middle" fontSize="8.5" fill="#92400e">PFC (802.1Qbb) for lossless per-priority — appropriate for specifically engineered designs only</text>
              </g>
            ); })()}
          </g>
        );
      })()}
    </svg>
  );
}
