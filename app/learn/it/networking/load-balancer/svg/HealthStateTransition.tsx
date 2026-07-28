"use client";
// D15 — Backend Health State Transition
export default function HealthStateTransition() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 320`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Backend health state transition diagram"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a15" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="320" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Backend Health State Transitions</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">State names are platform-specific — this shows conceptual transitions</text>

      {/* Eligible */}
      <rect x="170" y="44" width="140" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
      <text x={W/2} y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534">ELIGIBLE</text>
      <text x={W/2} y="73" textAnchor="middle" fontSize="8" fill="#374151">Traffic flowing normally</text>

      {/* Probe fails */}
      <line x1={W/2} y1="80" x2={W/2} y2="100" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#a15)"/>
      <text x={W/2+4} y="94" fontSize="7.5" fill="#dc2626">probe fails → counter increments</text>

      {/* Suspected (optional) */}
      <rect x="150" y="100" width="180" height="36" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x={W/2} y="116" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">SUSPECTED / FAILING</text>
      <text x={W/2} y="129" textAnchor="middle" fontSize="7.5" fill="#374151">(optional state — platform dependent)</text>

      {/* Fall threshold */}
      <line x1={W/2} y1="136" x2={W/2} y2="158" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#a15)"/>
      <text x={W/2+4} y="150" fontSize="7.5" fill="#dc2626">fall threshold reached</text>

      {/* Ineligible */}
      <rect x="160" y="158" width="160" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.5"/>
      <text x={W/2} y="176" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">INELIGIBLE / DOWN</text>
      <text x={W/2} y="190" textAnchor="middle" fontSize="8" fill="#374151">No new traffic selection</text>
      <text x={W/2} y="200" textAnchor="middle" fontSize="7.5" fill="#374151">Recovery probes begin</text>

      {/* Recovering */}
      <line x1={W/2} y1="202" x2={W/2} y2="222" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a15)"/>
      <text x={W/2+4} y="215" fontSize="7.5" fill="#16a34a">probe successes accumulating</text>

      <rect x="150" y="222" width="180" height="36" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x={W/2} y="238" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">RECOVERING / RISING</text>
      <text x={W/2} y="250" textAnchor="middle" fontSize="7.5" fill="#374151">Some platforms may admit limited traffic</text>

      <line x1={W/2} y1="258" x2={W/2} y2="276" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a15)"/>
      <text x={W/2+4} y="270" fontSize="7.5" fill="#16a34a">rise threshold met</text>

      <line x1={W/2} y1="276" x2={W/2} y2="290" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a15)"/>
      <line x1={W/2} y1="290" x2="170" y2="290" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="170" y1="290" x2="170" y2="80" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a15)"/>

      {/* Admin state */}
      <rect x="20" y="158" width="130" height="44" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="85" y="176" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6b7280">DRAIN / ADMIN</text>
      <text x="85" y="190" textAnchor="middle" fontSize="7.5" fill="#6b7280">Operator-initiated</text>
      <text x="85" y="200" textAnchor="middle" fontSize="7.5" fill="#6b7280">No new traffic</text>
      <line x1="150" y1="180" x2="160" y2="180" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#a15)"/>

      <rect x="10" y="300" width="460" height="14" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
      <text x={W/2} y="311" textAnchor="middle" fontSize="7.5" fill="#0c4a6e" fontWeight="600">Thresholds prevent flapping — rise/fall counts require multiple consistent probes before state changes</text>
    </svg>
  );
}
