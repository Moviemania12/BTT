"use client";
// Diagram 5 — Zoning vs LUN Masking: Two Access-Control Layers
// Future image: /public/images/articles/san/san-zoning-vs-lun-masking.png
export default function SanZoningVsMasking() {
  return (
    <svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Zoning vs LUN masking — two separate access control layers"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="320" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Zoning vs LUN Masking — Two Independent Access-Control Layers</text>

      {/* Layer 1 - Zoning */}
      <rect x="30" y="36" width="800" height="96" rx="8" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5"/>
      <text x="50" y="56" fontSize="11" fontWeight="700" fill="#92400e">Layer 1 — Zoning (SAN Switch / Fabric)</text>
      <text x="50" y="70" fontSize="8.5" fill="#374151">Controls: Which initiator WWPN can communicate with which target WWPN via the fabric</text>

      <rect x="50" y="78" width="180" height="28" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
      <text x="140" y="90" textAnchor="middle" fontSize="8.5" fill="#1e40af" fontWeight="600">Initiator WWPN</text>
      <text x="140" y="101" textAnchor="middle" fontSize="7.5" fill="#1d4ed8">Server HBA Port</text>

      <rect x="310" y="78" width="180" height="28" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="400" y="89" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="700">ZONE</text>
      <text x="400" y="100" textAnchor="middle" fontSize="7.5" fill="#6b7280">Configured on FC switch</text>

      <rect x="570" y="78" width="230" height="28" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="685" y="90" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Target WWPN(s)</text>
      <text x="685" y="101" textAnchor="middle" fontSize="7.5" fill="#15803d">Storage array front-end ports</text>

      <line x1="230" y1="92" x2="310" y2="92" stroke="#d97706" strokeWidth="1.5"/>
      <line x1="490" y1="92" x2="570" y2="92" stroke="#d97706" strokeWidth="1.5"/>
      <text x="430" y="122" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="600">Missing zone → no permitted discovery/communication → LUN invisible</text>

      {/* Arrow between layers */}
      <text x="430" y="146" textAnchor="middle" fontSize="12" fill="#6b7280">↓ I/O traffic passes through both layers</text>

      {/* Layer 2 - LUN Masking */}
      <rect x="30" y="156" width="800" height="106" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="50" y="176" fontSize="11" fontWeight="700" fill="#15803d">Layer 2 — LUN Masking / Host Mapping (Storage Array)</text>
      <text x="50" y="190" fontSize="8.5" fill="#374151">Controls: Which host object can access which LUN — configured on storage array</text>

      <rect x="50" y="198" width="200" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
      <text x="150" y="213" textAnchor="middle" fontSize="8.5" fill="#1e40af" fontWeight="600">Host Object: Server_01</text>
      <text x="150" y="226" textAnchor="middle" fontSize="7.5" fill="#1d4ed8">Registered WWPN: 10:00:...:11</text>
      <text x="150" y="237" textAnchor="middle" fontSize="7.5" fill="#6b7280">Correct host type set</text>

      <rect x="330" y="198" width="200" height="40" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="430" y="213" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="700">LUN MAP</text>
      <text x="430" y="226" textAnchor="middle" fontSize="7.5" fill="#6b7280">LUN 5 → Server_01 ✓</text>
      <text x="430" y="237" textAnchor="middle" fontSize="7.5" fill="#dc2626">LUN 6 → Server_01 ✗</text>

      <rect x="610" y="198" width="200" height="40" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="710" y="213" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">LUNs in Storage Pool</text>
      <text x="710" y="226" textAnchor="middle" fontSize="7.5" fill="#15803d">LUN 5 (2TB) — visible</text>
      <text x="710" y="237" textAnchor="middle" fontSize="7.5" fill="#9ca3af">LUN 6 (5TB) — masked</text>

      <line x1="250" y1="218" x2="330" y2="218" stroke="#ca8a04" strokeWidth="1.5"/>
      <line x1="530" y1="218" x2="610" y2="218" stroke="#ca8a04" strokeWidth="1.5"/>

      <text x="50" y="252" fontSize="8" fill="#dc2626" fontWeight="600">Note: Array default LUN visibility without explicit masking varies by vendor/platform — always configure explicit masking.</text>
      <text x="50" y="263" fontSize="8" fill="#dc2626" fontWeight="600">Both layers must be correctly configured. Zoning permits communication; masking controls what the host can actually see.</text>

      <text x="430" y="308" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-zoning-vs-lun-masking.png</text>
    </svg>
  );
}
