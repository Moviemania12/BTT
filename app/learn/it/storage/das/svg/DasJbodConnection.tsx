"use client";

// ═══════════════════════════════════════════════════════════════════════════
// svg/DasJbodConnection.tsx — Diagram 3: External JBOD Connection
//
// Future image: /public/images/articles/das/das-jbod-connection.png
//
// Purpose:
//   Show the physical difference between External DAS (direct SAS cable)
//   and a SAN (network-based). Emphasise that no network switch is present
//   in DAS and that the cable is the entire "network" between the two devices.
//
// What to show:
//   Left: Server block with "HBA Port" labeled.
//   Center: SAS cable (thick solid line) with labels:
//     - "SFF-8644 (Mini-SAS HD) connector"
//     - "Direct SAS Cable — No Network"
//     - "Max reliable length: ~10 m (active cable: ~20 m)"
//   Right: JBOD Enclosure with:
//     - "SAS IN" port, "SAS OUT" port (for daisy chain)
//     - Drive bay count label (e.g. "12 × LFF")
//     - PSU indicator
//   Below center: Red crossed-out box "✕ Network Switch — NOT in DAS"
//   Optional: A second dashed JBOD below the first, connected via SAS OUT,
//     labeled "Optional daisy-chain — second JBOD".
//
// Learning objective:
//   Engineer clearly understands external DAS = direct cable, not SAN.
//   Knows which connector to look for and approximate cable length limits.
// ═══════════════════════════════════════════════════════════════════════════

export default function DasJbodConnection() {
  return (
    <svg
      viewBox="0 0 860 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="External JBOD Connection — Direct SAS cable from server HBA to JBOD enclosure, no network"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <rect width="860" height="320" fill="#f8fafc" rx="12" />

      {/* Title */}
      <text x="430" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">
        External JBOD Connection — Direct SAS Attachment
      </text>
      <text x="430" y="46" textAnchor="middle" fontSize="10" fill="#6b7280">
        No network switch between server and JBOD — direct SAS cable only
      </text>

      {/* ── Server ── */}
      <rect x="40" y="80" width="180" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="130" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Server</text>
      <rect x="60" y="118" width="140" height="36" rx="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="130" y="132" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e40af">HBA / RAID Controller</text>
      <text x="130" y="146" textAnchor="middle" fontSize="8" fill="#1d4ed8">SAS Host Port</text>
      <text x="130" y="175" textAnchor="middle" fontSize="8.5" fill="#374151">OS + Applications</text>
      <text x="130" y="190" textAnchor="middle" fontSize="8.5" fill="#374151">Internal drives (if any)</text>

      {/* ── SAS Cable ── */}
      <line x1="220" y1="136" x2="440" y2="136" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      {/* Connector dots */}
      <circle cx="220" cy="136" r="6" fill="#1d4ed8" />
      <circle cx="440" cy="136" r="6" fill="#16a34a" />
      {/* Cable labels */}
      <text x="330" y="122" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2563eb">Direct SAS Cable</text>
      <text x="330" y="134" textAnchor="middle" fontSize="8" fill="#6b7280">SFF-8644 (Mini-SAS HD)</text>
      <text x="330" y="155" textAnchor="middle" fontSize="8" fill="#6b7280">No Network — No Switch</text>
      <text x="330" y="167" textAnchor="middle" fontSize="8" fill="#6b7280">Max ~10 m (passive) / ~20 m (active)</text>

      {/* No Network crossed box */}
      <rect x="260" y="186" width="140" height="28" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="330" y="198" textAnchor="middle" fontSize="8.5" fill="#dc2626" fontWeight="700">✕ Network Switch</text>
      <text x="330" y="210" textAnchor="middle" fontSize="8" fill="#dc2626">NOT present in DAS</text>

      {/* ── JBOD Enclosure 1 ── */}
      <rect x="440" y="70" width="180" height="160" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="530" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">JBOD Enclosure</text>
      {/* SAS IN */}
      <rect x="454" y="100" width="70" height="20" rx="3" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1" />
      <text x="489" y="114" textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="700">SAS IN ◄</text>
      {/* SAS OUT */}
      <rect x="536" y="100" width="70" height="20" rx="3" fill="#d1fae5" stroke="#16a34a" strokeWidth="1" />
      <text x="571" y="114" textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="700">► SAS OUT</text>
      {/* Drive bays */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={454 + (i % 3) * 50} y={130 + Math.floor(i / 3) * 22} width="44" height="18"
          rx="3" fill={i % 2 === 0 ? "#4ade80" : "#86efac"} stroke="#16a34a" strokeWidth="0.5" />
      ))}
      <text x="530" y="185" textAnchor="middle" fontSize="8" fill="#374151">12 × LFF drive bays</text>
      {/* PSU */}
      <rect x="454" y="196" width="152" height="18" rx="3" fill="#a7f3d0" stroke="#16a34a" strokeWidth="0.8" />
      <text x="530" y="209" textAnchor="middle" fontSize="8" fill="#15803d">PSU (redundant optional)</text>

      {/* ── Optional 2nd JBOD daisy chain ── */}
      <line x1="620" y1="136" x2="680" y2="136" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,3" />
      <circle cx="680" cy="136" r="5" fill="#16a34a" opacity="0.5" />
      <rect x="680" y="105" width="150" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,2" />
      <text x="755" y="128" textAnchor="middle" fontSize="9" fill="#6b7280" fontStyle="italic">Optional: 2nd JBOD</text>
      <text x="755" y="142" textAnchor="middle" fontSize="8" fill="#9ca3af">Daisy chain via SAS OUT</text>
      <text x="755" y="156" textAnchor="middle" fontSize="8" fill="#9ca3af">Same single-server access</text>

      {/* Footnote */}
      <text x="430" y="308" textAnchor="middle" fontSize="8.5" fill="#9ca3af">
        Future image: /public/images/articles/das/das-jbod-connection.png
      </text>
    </svg>
  );
}
