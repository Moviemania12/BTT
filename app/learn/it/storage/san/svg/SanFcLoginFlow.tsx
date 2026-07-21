"use client";
// Diagram 4 — Fibre Channel Login and Access Flow
// Future image: /public/images/articles/san/san-fc-login-flow.png
export default function SanFcLoginFlow() {
  return (
    <svg viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Fibre Channel login and access flow — FLOGI to LUN discovery"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="360" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Fibre Channel Login and Access Flow — Educational Sequence</text>
      <text x="430" y="37" textAnchor="middle" fontSize="8.5" fill="#6b7280">Conceptual sequence — fabric services, timing and implementation details are platform-specific</text>

      {/* Actors */}
      <rect x="30" y="50" width="140" height="28" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="100" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Server HBA</text>
      <rect x="350" y="50" width="160" height="28" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="430" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">FC Switch / Fabric</text>
      <rect x="690" y="50" width="140" height="28" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="760" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Storage Array</text>

      {/* Vertical lifelines */}
      <line x1="100" y1="78" x2="100" y2="340" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
      <line x1="430" y1="78" x2="430" y2="340" stroke="#ca8a04" strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
      <line x1="760" y1="78" x2="760" y2="340" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>

      {/* Steps */}
      {[
        { y:100, x1:100, x2:430, dir:1, label:"1. FLOGI — HBA registers WWPN into fabric", color:"#2563eb" },
        { y:125, x1:430, x2:100, dir:-1, label:"2. FCID assigned — HBA gets fabric address", color:"#ca8a04" },
        { y:150, x1:100, x2:430, dir:1, label:"3. Name Server registration — HBA visible in fabric directory", color:"#2563eb" },
      ].map((s,i) => (
        <g key={i}>
          <line x1={s.x1} y1={s.y} x2={s.x2} y2={s.y} stroke={s.color} strokeWidth="1.5" markerEnd={s.dir===1 ? "url(#arr)" : undefined} markerStart={s.dir===-1 ? "url(#arrL)" : undefined}/>
          <text x="265" y={s.y-5} textAnchor="middle" fontSize="8.5" fill={s.color}>{s.label}</text>
        </g>
      ))}

      {/* Zoning decision */}
      <rect x="310" y="168" width="240" height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="430" y="183" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="700">Zoning determines permitted discovery</text>
      <text x="430" y="194" textAnchor="middle" fontSize="7.5" fill="#6b7280">and communication (platform implementation specific)</text>

      {/* Allowed path */}
      <text x="265" y="218" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="600">Zone permits →</text>
      <line x1="100" y1="225" x2="760" y2="225" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="430" y="220" textAnchor="middle" fontSize="8" fill="#16a34a">4. PLOGI — HBA logs into storage target port</text>

      <line x1="100" y1="250" x2="760" y2="250" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="430" y="245" textAnchor="middle" fontSize="8" fill="#16a34a">5. PRLI — SCSI upper protocol layer established</text>

      <line x1="760" y1="275" x2="100" y2="275" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="430" y="270" textAnchor="middle" fontSize="8" fill="#16a34a">6. LUN Discovery — array reports mapped LUNs (LUN masking controls this)</text>

      <rect x="30" y="288" width="140" height="20" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="100" y="302" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">OS sees block device</text>

      {/* Blocked path */}
      <text x="595" y="218" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">← Zone blocks →</text>
      <line x1="430" y1="225" x2="760" y2="225" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x="595" y="237" textAnchor="middle" fontSize="7.5" fill="#dc2626">PLOGI refused — LUN never visible</text>

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/></marker>
        <marker id="arrL" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6 Z" fill="#ca8a04"/></marker>
      </defs>

      <text x="430" y="348" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-fc-login-flow.png</text>
    </svg>
  );
}
