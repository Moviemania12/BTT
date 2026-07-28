"use client";
// D20 — Backend Selection Troubleshooting Tree
export default function SelectionTsTree() {
  const W = 480;
  const questions = [
    { q: "Q1: Health monitor passing?", no: "Fix health issue / investigate application" },
    { q: "Q2: Member state: eligible?", no: "DRAIN/DISABLED/AT-LIMIT → admin action or capacity" },
    { q: "Q3: Persistence directing elsewhere?", no: "Existing affinity maps to different backend" },
    { q: "Q4: L7 policy routing to different pool?", no: "APP02 not in matched pool for this Host/Path" },
    { q: "Q5: Algorithm/weight skipping member?", no: "Weight=0, or high conn count (Least Conn)" },
    { q: "Q6: Priority/fallback pool logic?", no: "Primary pool has eligible members" },
    { q: "Q7: Traffic arriving but downstream wrong?", no: "Trace: connection table / logs / packet capture" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 350`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Backend selection troubleshooting tree"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a20" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
        <marker id="a20r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
        </marker>
      </defs>
      <rect width={W} height="350" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Why Is APP02 Not Receiving Traffic?</text>
      <rect x="10" y="24" width="460" height="14" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">DIAGNOSTIC INVESTIGATION SEQUENCE — does not represent internal processing order</text>

      {questions.map((q, i) => (
        <g key={i}>
          {/* Question box */}
          <rect x="10" y={44+i*42} width="248" height="28" rx="5" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="134" y={56+i*42} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1d4ed8">{q.q}</text>
          <text x="134" y={66+i*42} textAnchor="middle" fontSize="7.5" fill="#374151">YES → continue ↓</text>

          {/* NO answer */}
          <line x1="258" y1={58+i*42} x2="275" y2={58+i*42} stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#a20r)"/>
          <text x="278" y="54" fontSize="0"/>
          <rect x="275" y={44+i*42} width="195" height="28" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
          <text x="372" y={55+i*42} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#dc2626">NO →</text>
          <text x="372" y={65+i*42} textAnchor="middle" fontSize="7" fill="#374151">{q.no}</text>

          {/* Down arrow */}
          {i < questions.length - 1 && (
            <line x1="134" y1={72+i*42} x2="134" y2={82+i*42} stroke="#374151" strokeWidth="1.5" markerEnd="url(#a20)"/>
          )}
        </g>
      ))}

      <rect x="10" y="342" width="460" height="4" rx="2" fill="#d1fae5"/>
    </svg>
  );
}
