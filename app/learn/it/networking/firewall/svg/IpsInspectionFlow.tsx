"use client";
// D19 — IPS Inspection Flow
export default function IpsInspectionFlow() {
  const W = 480;
  const steps = [
    { label:"Session eligible for IPS inspection under policy", note:"Conceptual flow — exact processing order is platform-dependent", color:"#374151" },
    { label:"Protocol decoder", note:"Parse traffic structure — validate protocol compliance", color:"#0ea5e9" },
    { label:"Signature / rule evaluation", note:"Match against threat signature database", color:"#8b5cf6" },
    { label:"Anomaly / behavioral check", note:"Platform-dependent capability — may not be present on all platforms", color:"#f59e0b" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IPS inspection flow"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">IPS Inspection Flow — Conceptual</text>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x="80" y={36+i*58} width="320" height="44" rx="6" fill="#fff" stroke={s.color} strokeWidth="1.5"/>
          <rect x="80" y={36+i*58} width="6" height="44" rx="6" fill={s.color}/>
          <text x="96" y={36+i*58+16} fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
          <text x="96" y={36+i*58+30} fontSize="8" fill="#374151">{s.note}</text>
          {i < steps.length-1 && <text x={W/2} y={36+i*58+52} textAnchor="middle" fontSize="12" fill="#9ca3af">↓</text>}
        </g>
      ))}
      {/* Verdict fork */}
      <line x1={W/2} y1="268" x2={W/2} y2="284" stroke="#9ca3af" strokeWidth="1.5"/>
      <rect x="40" y="284" width="170" height="44" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="125" y="302" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">Match Found</text>
      <text x="125" y="316" textAnchor="middle" fontSize="8" fill="#374151">Action: alert / drop / reset / other</text>
      <text x="125" y="328" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">(platform/signature/config dependent)</text>
      <rect x="270" y="284" width="170" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="355" y="302" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">No Match</text>
      <text x="355" y="316" textAnchor="middle" fontSize="8" fill="#374151">Allow and continue</text>
      <text x="355" y="328" textAnchor="middle" fontSize="7.5" fill="#374151">Next inspection/forwarding step</text>
      <rect x="10" y="338" width={W-20} height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="352" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Signature matching is not the only detection technique. Protocol anomaly, behavioral, heuristic methods also used.</text>
      <text x={W/2} y="366" textAnchor="middle" fontSize="8" fill="#92400e">False positives and false negatives both exist. Current signatures ≠ complete protection. IPS is one layer in defense-in-depth.</text>
    </svg>
  );
}
