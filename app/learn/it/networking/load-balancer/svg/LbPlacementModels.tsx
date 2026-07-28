"use client";
// D5 — Common Load Balancer Placement Models
export default function LbPlacementModels() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One-arm and two-arm load balancer placement models"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr5a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
        <marker id="arr5b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
        </marker>
      </defs>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Load Balancer Placement Models</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">Terminology varies by vendor — "one-arm", "inline", "sandwich" etc. are not universal</text>

      {/* Two-arm left panel */}
      <rect x="10" y="44" width="218" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="119" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Two-Arm / Inline</text>

      <rect x="80" y="68" width="80" height="24" rx="5" fill="#374151"/>
      <text x="120" y="83" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="120" y1="92" x2="120" y2="106" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr5a)"/>

      <rect x="60" y="106" width="120" height="28" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="120" y="123" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Load Balancer</text>

      <line x1="120" y1="134" x2="120" y2="148" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr5a)"/>
      {/* Return */}
      <line x1="108" y1="148" x2="108" y2="134" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr5a)"/>

      <rect x="60" y="148" width="120" height="24" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="120" y="163" textAnchor="middle" fontSize="8.5" fill="#166534">Backend</text>

      <text x="119" y="186" textAnchor="middle" fontSize="8" fontWeight="700" fill="#166534">Both directions through LB</text>
      <text x="119" y="198" textAnchor="middle" fontSize="7.5" fill="#374151">Return path: routing must enforce</text>
      <text x="119" y="208" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">Placement alone does NOT guarantee this</text>

      {/* One-arm right panel */}
      <rect x="252" y="44" width="218" height="160" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="361" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">One-Arm / Single-Segment</text>

      <rect x="320" y="68" width="80" height="24" rx="5" fill="#374151"/>
      <text x="360" y="83" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="360" y1="92" x2="310" y2="106" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr5a)"/>

      <rect x="242" y="106" width="120" height="28" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="302" y="123" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Load Balancer</text>

      <line x1="302" y1="134" x2="340" y2="148" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr5a)"/>

      <rect x="300" y="148" width="120" height="24" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="360" y="163" textAnchor="middle" fontSize="8.5" fill="#166534">Backend</text>

      {/* Return path - dashed / uncertain */}
      <line x1="360" y1="148" x2="360" y2="96" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arr5b)"/>
      <text x="415" y="128" fontSize="7.5" fill="#dc2626">Return path:</text>
      <text x="415" y="140" fontSize="7.5" fill="#dc2626">design-dependent</text>

      <text x="361" y="186" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1d4ed8">Inbound via LB</text>
      <text x="361" y="198" textAnchor="middle" fontSize="7.5" fill="#374151">Return: SNAT or routing design</text>
      <text x="361" y="208" textAnchor="middle" fontSize="7.5" fill="#374151">required for stateful architectures</text>

      {/* Footer */}
      <rect x="10" y="212" width="460" height="76" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="228" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Return Path Engineering</text>
      <text x="18" y="243" fontSize="8" fill="#374151">• Two-arm: LB as backend default gateway, or routing through LB, or SNAT</text>
      <text x="18" y="256" fontSize="8" fill="#374151">• One-arm: SNAT (backend replies to LB address) OR routing design (static routes/gateway)</text>
      <text x="18" y="269" fontSize="8" fill="#374151">• DSR (Direct Server Return): inbound via LB, return direct to client — intentionally asymmetric</text>
      <text x="18" y="282" fontSize="8" fontStyle="italic" fill="#dc2626">Return path must be explicitly designed and validated — it is NOT automatic from placement</text>
    </svg>
  );
}
