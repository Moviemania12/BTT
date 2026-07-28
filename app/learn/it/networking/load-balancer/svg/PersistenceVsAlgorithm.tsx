"use client";
// D16 — Persistence vs Algorithm Decision
export default function PersistenceVsAlgorithm() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 340`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Persistence versus algorithm decision flow showing how they interact"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a16" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="340" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Persistence vs Algorithm — Conceptual Interaction</text>
      <rect x="10" y="24" width="460" height="14" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">CONCEPTUAL RELATIONSHIP — actual evaluation order and interaction is platform-specific</text>

      {/* Traffic arrives */}
      <rect x="180" y="46" width="120" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="62" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Traffic arrives at VIP</text>
      <line x1={W/2} y1="70" x2={W/2} y2="90" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a16)"/>

      {/* L7 pool selection */}
      <rect x="160" y="90" width="160" height="28" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x={W/2} y="105" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">L7 Policy (where applicable)</text>
      <text x={W/2} y="114" textAnchor="middle" fontSize="7.5" fill="#374151">Determines applicable pool</text>
      <line x1={W/2} y1="118" x2={W/2} y2="136" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a16)"/>

      {/* Persistence check */}
      <rect x="155" y="136" width="170" height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x={W/2} y="152" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#92400e">Persistence Check</text>
      <text x={W/2} y="165" textAnchor="middle" fontSize="8" fill="#374151">Affinity key match? (session/cookie/IP/etc.)</text>

      {/* YES branch */}
      <line x1="155" y1="154" x2="90" y2="180" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#a16)"/>
      <text x="110" y="173" fontSize="8" fontWeight="700" fill="#16a34a">YES</text>
      <rect x="10" y="180" width="130" height="40" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="75" y="197" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#166534">Preferred backend</text>
      <text x="75" y="210" textAnchor="middle" fontSize="7.5" fill="#374151">if eligible — route there</text>
      <text x="75" y="220" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">may influence/bypass algorithm</text>

      {/* NO branch */}
      <line x1="325" y1="154" x2="390" y2="180" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a16)"/>
      <text x="370" y="173" fontSize="8" fontWeight="700" fill="#374151">NO</text>
      <rect x="340" y="180" width="130" height="40" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="405" y="197" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1d4ed8">Algorithm selection</text>
      <text x="405" y="210" textAnchor="middle" fontSize="7.5" fill="#374151">Round Robin / Least Conn / Hash</text>
      <text x="405" y="220" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">among eligible members</text>

      {/* Both converge to eligibility */}
      <line x1="75" y1="220" x2="75" y2="244" stroke="#374151" strokeWidth="1.5"/>
      <line x1="75" y1="244" x2={W/2} y2="244" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a16)"/>
      <line x1="405" y1="220" x2="405" y2="244" stroke="#374151" strokeWidth="1.5"/>
      <line x1="405" y1="244" x2={W/2} y2="244" stroke="#374151" strokeWidth="1.5"/>

      <rect x="160" y="252" width="160" height="30" rx="6" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5"/>
      <text x={W/2} y="267" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Eligibility / Health Check</text>
      <text x={W/2} y="278" textAnchor="middle" fontSize="7.5" fill="#374151">Is selected backend eligible?</text>
      <line x1={W/2} y1="282" x2={W/2} y2="298" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a16)"/>

      <rect x="175" y="298" width="130" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x={W/2} y="313" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Route to backend</text>

      <rect x="10" y="328" width="460" height="6" rx="3" fill="#e0f2fe"/>
    </svg>
  );
}
