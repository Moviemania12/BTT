"use client";
export default function LpsArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lps-arch-title">
      <title id="lps-arch-title">Complete Lightning Protection System Architecture</title>
      <rect width="800" height="460" fill="#fff"/>
      <text x="400" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        COMPLETE LPS ARCHITECTURE
      </text>
      {/* Sky/lightning */}
      <path d="M420,45 L405,85 L425,85 L400,130 L440,90 L418,90 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
      <text x="470" y="90" fontFamily="Arial,sans-serif" fontSize="9" fill="#92400e">Lightning Strike</text>

      {/* Air termination - mesh on roof */}
      <rect x="200" y="130" width="400" height="16" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5"/>
      <text x="400" y="141" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#334155" textAnchor="middle">
        AIR TERMINATION — Mesh + Franklin Rods
      </text>
      {[240, 340, 460, 560].map((x, i) => (
        <line key={i} x1={x} y1="130" x2={x} y2="108" stroke="#475569" strokeWidth="2"/>
      ))}

      {/* Building */}
      <rect x="220" y="146" width="360" height="180" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2"/>
      <text x="400" y="175" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0f172a" textAnchor="middle">DATA CENTER BUILDING</text>

      {/* Down conductors */}
      <line x1="250" y1="146" x2="250" y2="326" stroke="#dc2626" strokeWidth="3"/>
      <line x1="550" y1="146" x2="550" y2="326" stroke="#dc2626" strokeWidth="3"/>
      <text x="215" y="240" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle" transform="rotate(-90 215 240)">DOWN CONDUCTOR</text>

      {/* Equipment inside building */}
      <rect x="290" y="200" width="100" height="60" rx="4" fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.5"/>
      <text x="340" y="225" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" textAnchor="middle">UPS</text>
      <text x="340" y="240" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0066CC" textAnchor="middle">+ SPD Type 2</text>

      <rect x="410" y="200" width="100" height="60" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="460" y="225" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">SERVER RACK</text>
      <text x="460" y="240" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">+ SPD Type 3</text>

      {/* Bonding line */}
      <line x1="390" y1="230" x2="410" y2="230" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="400" y="280" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7e22ce" textAnchor="middle">Equipotential Bonding</text>

      {/* Earth termination */}
      <rect x="180" y="326" width="440" height="20" fill="#78350f"/>
      <text x="400" y="340" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fef3c7" textAnchor="middle">SOIL / GROUND</text>

      <circle cx="250" cy="360" r="14" fill="#fef3c7" stroke="#92400e" strokeWidth="2"/>
      <circle cx="550" cy="360" r="14" fill="#fef3c7" stroke="#92400e" strokeWidth="2"/>
      <text x="250" y="390" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">Earth Pit</text>
      <text x="550" y="390" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">Earth Pit</text>

      <line x1="250" y1="346" x2="250" y2="346" stroke="#92400e"/>
      <line x1="250" y1="326" x2="250" y2="360" stroke="#92400e" strokeWidth="2"/>
      <line x1="550" y1="326" x2="550" y2="360" stroke="#92400e" strokeWidth="2"/>
      <line x1="250" y1="360" x2="550" y2="360" stroke="#92400e" strokeWidth="1.5" strokeDasharray="4,3"/>
      <text x="400" y="378" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">Earth Termination — Ring Bonded</text>

      <text x="400" y="420" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">
        Air Termination → Down Conductor → Earth Termination — sab bonded, equipment SPD se protected
      </text>
    </svg>
  );
}
