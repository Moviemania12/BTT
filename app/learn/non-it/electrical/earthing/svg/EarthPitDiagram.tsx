"use client";
export default function EarthPitDiagram() {
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ep-title">
      <title id="ep-title">Maintenance Free Earthing (MFE) — Earth Pit Cross Section</title>
      <rect width="860" height="420" fill="#fff"/>
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        MAINTENANCE FREE EARTHING (MFE) — CROSS SECTION
      </text>
      {/* Ground surface */}
      <line x1="80" y1="80" x2="500" y2="80" stroke="#78716c" strokeWidth="3"/>
      <text x="290" y="72" fontFamily="Arial,sans-serif" fontSize="10" fill="#78716c" fontWeight="700" textAnchor="middle">GROUND LEVEL</text>
      {/* Hatch for soil */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={80+i*60} y1="80" x2={80+i*60-30} y2="380" stroke="#d4c5b0" strokeWidth="1"/>
      ))}
      {/* Inspection chamber */}
      <rect x="200" y="60" width="180" height="50" rx="4" fill="#e2e8f0" stroke="#475569" strokeWidth="2"/>
      <text x="290" y="82" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">Inspection Chamber</text>
      <text x="290" y="96" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#475569" textAnchor="middle">Cast iron / PVC — flush with ground</text>
      {/* Test link */}
      <rect x="250" y="108" width="80" height="22" rx="3" fill="#fef3c7" stroke="#d97706"/>
      <text x="290" y="122" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#92400e" textAnchor="middle">TEST LINK</text>
      {/* Earth strip from building */}
      <line x1="80" y1="130" x2="250" y2="130" stroke="#dc2626" strokeWidth="3"/>
      <text x="165" y="124" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626" fontWeight="700" textAnchor="middle">Copper Strip to MEB</text>
      {/* Pit walls */}
      <rect x="220" y="130" width="140" height="220" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2"/>
      <text x="290" y="155" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e" textAnchor="middle">Back-fill Compound</text>
      <text x="290" y="170" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">(Hygroscopic salts +</text>
      <text x="290" y="183" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">bentonite + carbon)</text>
      {/* Copper bonded rod */}
      <rect x="282" y="130" width="16" height="220" rx="2" fill="#b45309" stroke="#92400e" strokeWidth="1.5"/>
      <text x="370" y="240" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c3aed" textAnchor="start">Copper Bonded</text>
      <text x="370" y="253" fontFamily="Arial,sans-serif" fontSize="9" fill="#7c3aed" textAnchor="start">Steel Rod</text>
      <text x="370" y="266" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7c3aed" textAnchor="start">17.2mm dia, 2-3m length</text>
      <line x1="298" y1="240" x2="370" y2="240" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,2"/>
      {/* Depth */}
      <line x1="190" y1="130" x2="190" y2="350" stroke="#475569" strokeWidth="1.5" markerEnd="url(#ep-arr)"/>
      <defs><marker id="ep-arr" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto">
        <polygon points="0 0, 7 3.5, 0 7" fill="#475569"/>
      </marker></defs>
      <text x="150" y="250" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">2–3 m</text>
      <text x="150" y="262" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">depth</text>
      {/* Ground symbol */}
      <line x1="282" y1="350" x2="306" y2="350" stroke="#059669" strokeWidth="3"/>
      <line x1="285" y1="358" x2="303" y2="358" stroke="#059669" strokeWidth="2"/>
      <line x1="288" y1="366" x2="300" y2="366" stroke="#059669" strokeWidth="1.5"/>

      {/* Right side legend */}
      <rect x="570" y="80" width="250" height="280" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      <text x="695" y="103" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">KEY COMPONENTS</text>
      {[
        ["Inspection Chamber", "CI/PVC, flush to ground, protects test link"],
        ["Test Link", "For periodic resistance measurement — removable"],
        ["Copper Strip", "25mm×3mm copper from MEB to pit"],
        ["Back-fill Compound", "Hygroscopic — retains moisture year-round"],
        ["Copper Bonded Rod", "Steel core, copper coated — corrosion resistant"],
        ["Clamp Connection", "Exothermic (cadweld) preferred — no corrosion"],
      ].map(([label, desc], i) => (
        <g key={i}>
          <text x="585" y={128+i*40} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e293b">{label}</text>
          <text x="585" y={142+i*40} fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b">{desc}</text>
        </g>
      ))}

      <text x="430" y="408" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        MFE ka back-fill compound moisture retain karta hai — resistance seasonal variation minimize hoti hai
      </text>
    </svg>
  );
}
