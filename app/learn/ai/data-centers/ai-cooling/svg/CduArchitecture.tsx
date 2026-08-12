"use client";
export default function CduArchitecture() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cdu-title">
      <title id="cdu-title">CDU Liquid Cooling Architecture: Facility chiller provides cold water to CDU (Cooling Distribution Unit). CDU acts as heat exchanger separating facility water loop from IT equipment secondary loop. Secondary loop carries cooled fluid to rack manifold, which distributes to GPU server cold plates. Cold plates sit directly on GPU chips, absorbing heat. Warm fluid returns from cold plates back through manifold to CDU, where heat transfers to facility water. Warm facility water returns to chiller. The two loops never mix — CDU is the thermal barrier protecting IT equipment from facility water chemistry.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">CDU LIQUID COOLING ARCHITECTURE</text>
      <text x="410" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Two separate loops — CDU is the thermal barrier. Facility water and IT equipment fluid NEVER mix.</text>

      {/* Chiller */}
      <rect x="14" y="60" width="130" height="60" rx="6" fill="#0f172a" />
      <text x="79" y="84" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Facility Chiller</text>
      <text x="79" y="98" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">+ Cooling Tower</text>
      <text x="79" y="110" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Facility infrastructure</text>

      {/* Facility water flow arrows */}
      <line x1="144" y1="80" x2="200" y2="80" stroke="#0891b2" strokeWidth="2.5" markerEnd="url(#cdu-ar-b)" />
      <text x="172" y="74" fontFamily="Arial,sans-serif" fontSize="7" fill="#0891b2" textAnchor="middle" fontWeight="700">Cold water</text>
      <line x1="200" y1="100" x2="144" y2="100" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#cdu-ar-r)" />
      <text x="172" y="114" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle" fontWeight="700">Warm return</text>

      {/* CDU */}
      <rect x="200" y="44" width="160" height="110" rx="8" fill="#1e293b" stroke="#0891b2" strokeWidth="2" />
      <text x="280" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">CDU</text>
      <text x="280" y="82" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Cooling Distribution Unit</text>
      <rect x="215" y="90" width="130" height="28" rx="4" fill="#0f172a" />
      <text x="280" y="103" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0891b2" textAnchor="middle">Heat Exchanger</text>
      <text x="280" y="114" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Two loops never mix</text>
      <text x="280" y="136" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Pump · Sensors · Controls</text>
      <text x="280" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Leak detection</text>

      {/* Secondary loop arrows CDU to Rack */}
      <line x1="360" y1="80" x2="450" y2="80" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#cdu-ar-g)" />
      <text x="405" y="72" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle" fontWeight="700">Cooled fluid (secondary)</text>
      <line x1="450" y1="100" x2="360" y2="100" stroke="#f97316" strokeWidth="2.5" markerEnd="url(#cdu-ar-o)" />
      <text x="405" y="118" fontFamily="Arial,sans-serif" fontSize="7" fill="#f97316" textAnchor="middle" fontWeight="700">Warm return (secondary)</text>

      {/* Rack Manifold */}
      <rect x="450" y="60" width="100" height="60" rx="6" fill="#1e3a5f" stroke="#0891b2" strokeWidth="1" />
      <text x="500" y="82" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7dd3fc" textAnchor="middle">Rack</text>
      <text x="500" y="95" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7dd3fc" textAnchor="middle">Manifold</text>
      <text x="500" y="110" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Distribution</text>

      {/* Manifold to Cold Plates */}
      <line x1="550" y1="90" x2="610" y2="90" stroke="#16a34a" strokeWidth="2" markerEnd="url(#cdu-ar-g)" />

      {/* GPU Servers with Cold Plates */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="610" y={50 + i * 50} width="190" height="40" rx="5" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1" />
          <text x="640" y={68 + i * 50} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#c4b5fd">GPU Server {i+1}</text>
          <rect x="700" y={58 + i * 50} width="90" height="24" rx="3" fill="#7c3aed" />
          <text x="745" y={70 + i * 50} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Cold Plates</text>
          <text x="745" y={80 + i * 50} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#ddd6fe" textAnchor="middle">on GPU chips</text>
        </g>
      ))}

      {/* Return line */}
      <line x1="610" y1="130" x2="550" y2="130" stroke="#f97316" strokeWidth="2" markerEnd="url(#cdu-ar-o)" />

      {/* Labels */}
      <rect x="14" y="180" width="200" height="40" rx="5" fill="#eff6ff" stroke="#0891b2" strokeWidth="1" />
      <text x="114" y="196" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">FACILITY LOOP</text>
      <text x="114" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#3b82f6" textAnchor="middle">Chiller water · Chemical treatment</text>

      <rect x="230" y="180" width="200" height="40" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="330" y="196" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">SECONDARY (IT) LOOP</text>
      <text x="330" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle">Clean fluid · IT-safe chemistry</text>

      <rect x="446" y="180" width="360" height="40" rx="5" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1" />
      <text x="626" y="196" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#c4b5fd" textAnchor="middle">GPU SERVERS</text>
      <text x="626" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">Cold plates on chips · GPU HBM + compute units cooled</text>

      <text x="410" y="240" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">CRITICAL: Leak detection at CDU, manifold connections, and rack level is mandatory</text>
      <text x="410" y="255" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Actual CDU design, fluid type, and temperature setpoints depend on server manufacturer specifications and facility requirements</text>

      <defs>
        <marker id="cdu-ar-b" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
        <marker id="cdu-ar-r" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
        <marker id="cdu-ar-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
        <marker id="cdu-ar-o" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#f97316" /></marker>
      </defs>
    </svg>
  );
}
