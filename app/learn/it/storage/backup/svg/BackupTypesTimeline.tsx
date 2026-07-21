"use client";
// Diagram 3 — Backup Types Timeline: Full / Incremental / Differential / Incremental Forever
export default function BackupTypesTimeline() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return (
    <svg viewBox="0 0 860 330" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Backup types timeline: full, incremental, differential, incremental forever"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="330" fill="#f8fafc" rx="12"/>
      <text x="430" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Backup Types — Weekly Timeline Comparison</text>

      {/* Day headers */}
      {days.map((d,i) => (
        <text key={i} x={130+i*98} y="38" textAnchor="middle" fontSize="9.5" fill="#374151" fontWeight="600">{d}</text>
      ))}

      {/* Row labels */}
      {["Full Only","Full + Incr","Full + Diff","Incr Forever*"].map((label,row) => (
        <text key={row} x="62" y={65+row*62} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="600">{label}</text>
      ))}

      {/* Row 1 — Full Only */}
      {days.map((_,i) => (
        <g key={i}>
          <rect x={82+i*98} y="46" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
          <text x={128+i*98} y="64" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL ({i===0?"100GB":"~100GB"})</text>
        </g>
      ))}
      <text x="804" y="62" fontSize="7.5" fill="#6b7280">Max storage</text>

      {/* Row 2 — Full + Incremental */}
      <rect x="82" y="108" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
      <text x="128" y="126" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL</text>
      {[1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x={82+i*98} y="108" width="92" height="28" rx="4" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"/>
          <text x={128+i*98} y="122" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">INCR</text>
          <text x={128+i*98} y="132" textAnchor="middle" fontSize="7.5" fill="#15803d">~{(i+1)*3}GB</text>
        </g>
      ))}
      <rect x="672" y="108" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
      <text x="718" y="126" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL (new)</text>
      <text x="430" y="148" textAnchor="middle" fontSize="7.5" fill="#dc2626">Thu restore = Mon Full + Tue INCR + Wed INCR + Thu INCR. Chain broken = restore fails.</text>

      {/* Row 3 — Full + Differential */}
      <rect x="82" y="170" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
      <text x="128" y="188" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL</text>
      {[1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x={82+i*98} y="170" width="92" height="28" rx="4" fill="#fdba74" stroke="#ea580c" strokeWidth="0.8"/>
          <text x={128+i*98} y="184" textAnchor="middle" fontSize="8" fill="#c2410c" fontWeight="600">DIFF</text>
          <text x={128+i*98} y="194" textAnchor="middle" fontSize="7.5" fill="#9a3412">~{(i+1)*4}GB</text>
        </g>
      ))}
      <rect x="672" y="170" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
      <text x="718" y="188" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL (new)</text>
      <text x="430" y="210" textAnchor="middle" fontSize="7.5" fill="#374151">Thu restore = Mon Full + Thu Diff (only 2 sets). Grows as week progresses.</text>

      {/* Row 4 — Incremental Forever */}
      <rect x="82" y="232" width="92" height="28" rx="4" fill="#1e40af" stroke="#1d4ed8" strokeWidth="0.8"/>
      <text x="128" y="246" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">FULL (once)</text>
      {[1,2,3,4,5,6].map(i => (
        <g key={i}>
          <rect x={82+i*98} y="232" width="92" height="28" rx="4" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="0.8"/>
          <text x={128+i*98} y="246" textAnchor="middle" fontSize="8" fill="#5b21b6" fontWeight="600">INCR</text>
          <text x={128+i*98} y="258" textAnchor="middle" fontSize="7.5" fill="#4c1d95">~{i*2+2}GB</text>
        </g>
      ))}
      <text x="430" y="278" textAnchor="middle" fontSize="7.5" fill="#7c3aed">* Restore: platform assembles chain or creates synthetic fulls — product-dependent. Chain depth limits vary by product.</text>

      {/* Legend */}
      <rect x="20" y="290" width="820" height="28" rx="5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8"/>
      <rect x="30" y="299" width="14" height="10" rx="2" fill="#1e40af"/>
      <text x="50" y="308" fontSize="7.5" fill="#374151">Full</text>
      <rect x="90" y="299" width="14" height="10" rx="2" fill="#86efac"/>
      <text x="110" y="308" fontSize="7.5" fill="#374151">Incremental (changes since last backup)</text>
      <rect x="310" y="299" width="14" height="10" rx="2" fill="#fdba74"/>
      <text x="330" y="308" fontSize="7.5" fill="#374151">Differential (changes since last full)</text>
      <rect x="530" y="299" width="14" height="10" rx="2" fill="#c4b5fd"/>
      <text x="550" y="308" fontSize="7.5" fill="#374151">Incr Forever</text>
      <text x="650" y="308" fontSize="7" fill="#9ca3af">Future image: backup-types-timeline.png</text>
    </svg>
  );
}
