"use client";
// Diagram 4 — Generic Dual-Controller Scale-Up NAS Architecture
// Future image: /public/images/articles/nas/nas-ha-architecture.png
export default function NasHaArchitecture() {
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Generic dual-controller scale-up NAS HA architecture"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="380" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Generic Dual-Controller Scale-Up NAS Architecture</text>
      <rect x="100" y="30" width="660" height="20" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="430" y="44" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="600">
        Scale-out NAS platforms (e.g. Dell PowerScale) use distributed multi-node architecture — not this shared-shelf design
      </text>

      {/* Servers row */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={60 + i * 190} y="62" width="150" height="28" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
          <text x={135 + i * 190} y="80" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Server {i + 1}</text>
        </g>
      ))}
      <text x="430" y="105" textAnchor="middle" fontSize="9" fill="#6b7280">↓ SMB (445) / NFS (2049)</text>

      {/* Switches */}
      <rect x="120" y="114" width="240" height="32" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="240" y="134" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Switch A</text>
      <rect x="500" y="114" width="240" height="32" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="620" y="134" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Switch B</text>
      <line x1="360" y1="130" x2="500" y2="130" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="430" y="125" textAnchor="middle" fontSize="7.5" fill="#92400e">inter-switch</text>

      {/* Controllers */}
      <rect x="80" y="165" width="300" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="230" y="188" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Controller A</text>
      <text x="230" y="206" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">NIC A1→Switch A | NIC A2→Switch B</text>
      <text x="230" y="218" textAnchor="middle" fontSize="8" fill="#6b7280">Failover groups / bonding / SMB Multichannel</text>

      <rect x="480" y="165" width="300" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="630" y="188" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Controller B</text>
      <text x="630" y="206" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">NIC B1→Switch A | NIC B2→Switch B</text>
      <text x="630" y="218" textAnchor="middle" fontSize="8" fill="#6b7280">Active-Active or Active-Passive per vendor</text>

      {/* Cross connections switch→controller */}
      <line x1="240" y1="146" x2="200" y2="165" stroke="#2563eb" strokeWidth="1" opacity="0.6"/>
      <line x1="620" y1="146" x2="560" y2="165" stroke="#2563eb" strokeWidth="1" opacity="0.6"/>
      <line x1="360" y1="146" x2="660" y2="165" stroke="#f59e0b" strokeWidth="1" opacity="0.5" strokeDasharray="3,2"/>
      <line x1="500" y1="146" x2="200" y2="165" stroke="#f59e0b" strokeWidth="1" opacity="0.5" strokeDasharray="3,2"/>

      {/* Shared storage */}
      <rect x="200" y="248" width="460" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="430" y="269" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">Shared Storage Pool (scale-up design)</text>
      <line x1="230" y1="225" x2="300" y2="248" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="630" y1="225" x2="560" y2="248" stroke="#16a34a" strokeWidth="1.5"/>

      {/* Disk shelves */}
      <rect x="200" y="298" width="460" height="30" rx="5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1"/>
      <text x="430" y="317" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">Disk Shelf 1 | Disk Shelf 2 | Disk Shelf N</text>

      {/* HA annotations */}
      <text x="430" y="348" textAnchor="middle" fontSize="8.5" fill="#374151">If Switch A fails → all traffic via Switch B  |  If Controller A fails → Controller B serves all</text>
      <text x="430" y="368" textAnchor="middle" fontSize="8.5" fill="#9ca3af">Future image: nas-ha-architecture.png</text>
    </svg>
  );
}
