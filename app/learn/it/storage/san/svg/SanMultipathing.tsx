"use client";
// Diagram 6 — SAN Multipathing: Multiple Paths from Host to Storage (CORRECTED)
// Both controllers accessible from BOTH fabrics.
// ALUA states shown as EXAMPLE ONLY — actual states depend on array architecture.
// Future image: /public/images/articles/san/san-multipathing-paths.png
export default function SanMultipathing() {
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="SAN multipathing — corrected four-path dual-fabric topology with ALUA example"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="380" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">SAN Multipathing — Four Paths via Dual Fabric aur Dual Controllers</text>
      <rect x="130" y="30" width="600" height="14" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
      <text x="430" y="41" textAnchor="middle" fontSize="7.5" fill="#991b1b" fontWeight="700">Example ALUA state only — actual path states depend on storage-array architecture and LUN/volume access model</text>

      {/* Server */}
      <rect x="60" y="54" width="170" height="64" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="145" y="73" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Server</text>
      <rect x="72" y="80" width="70" height="18" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="107" y="93" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="600">HBA Port 1</text>
      <rect x="158" y="80" width="60" height="18" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="0.8"/>
      <text x="188" y="93" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">HBA Port 2</text>
      <text x="145" y="112" textAnchor="middle" fontSize="7.5" fill="#6b7280">Dual HBA ports</text>

      {/* Fabric A */}
      <rect x="280" y="54" width="130" height="38" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="345" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Fabric A</text>
      <text x="345" y="85" textAnchor="middle" fontSize="8" fill="#1d4ed8">Switch A</text>

      {/* Fabric B */}
      <rect x="440" y="54" width="130" height="38" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <text x="505" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">Fabric B</text>
      <text x="505" y="85" textAnchor="middle" fontSize="8" fill="#b91c1c">Switch B</text>

      {/* HBA→Fabric connections */}
      <line x1="107" y1="98" x2="280" y2="73" stroke="#2563eb" strokeWidth="1.5"/>
      <line x1="188" y1="98" x2="440" y2="73" stroke="#dc2626" strokeWidth="1.5"/>

      {/* Storage Array */}
      <rect x="600" y="44" width="230" height="170" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="715" y="64" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Storage Array</text>

      {/* Controller A */}
      <rect x="612" y="72" width="94" height="100" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="659" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">Ctrl A</text>
      <rect x="620" y="96" width="78" height="14" rx="3" fill="#4ade80"/>
      <text x="659" y="107" textAnchor="middle" fontSize="7" fill="#166534">Port A1 → Fabric A</text>
      <rect x="620" y="114" width="78" height="14" rx="3" fill="#86efac"/>
      <text x="659" y="125" textAnchor="middle" fontSize="7" fill="#166534">Port A2 → Fabric B</text>
      <text x="659" y="148" textAnchor="middle" fontSize="6.5" fill="#6b7280">Example: Active/</text>
      <text x="659" y="158" textAnchor="middle" fontSize="6.5" fill="#6b7280">Optimized TPG</text>
      <text x="659" y="165" textAnchor="middle" fontSize="5.5" fill="#9ca3af">(ALUA example only)</text>

      {/* Controller B */}
      <rect x="718" y="72" width="100" height="100" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="768" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">Ctrl B</text>
      <rect x="726" y="96" width="84" height="14" rx="3" fill="#4ade80"/>
      <text x="768" y="107" textAnchor="middle" fontSize="7" fill="#166534">Port B1 → Fabric A</text>
      <rect x="726" y="114" width="84" height="14" rx="3" fill="#86efac"/>
      <text x="768" y="125" textAnchor="middle" fontSize="7" fill="#166534">Port B2 → Fabric B</text>
      <text x="768" y="148" textAnchor="middle" fontSize="6.5" fill="#6b7280">Example: Active/</text>
      <text x="768" y="158" textAnchor="middle" fontSize="6.5" fill="#6b7280">Non-Opt TPG</text>
      <text x="768" y="165" textAnchor="middle" fontSize="5.5" fill="#9ca3af">(ALUA example only)</text>

      {/* Shared storage */}
      <rect x="612" y="180" width="206" height="20" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="715" y="194" textAnchor="middle" fontSize="8" fill="#166534" fontWeight="600">LUN 5 — Storage Pool</text>

      {/* Four path lines */}
      {/* Path 1: Fabric A → Ctrl A */}
      <line x1="345" y1="92" x2="612" y2="103" stroke="#2563eb" strokeWidth="2"/>
      <text x="480" y="96" textAnchor="middle" fontSize="7.5" fill="#2563eb" fontWeight="700">Path 1 (blue)</text>

      {/* Path 2: Fabric A → Ctrl B */}
      <line x1="345" y1="92" x2="718" y2="103" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="5,3"/>
      <text x="540" y="115" textAnchor="middle" fontSize="7.5" fill="#2563eb">Path 2 (blue)</text>

      {/* Path 3: Fabric B → Ctrl A */}
      <line x1="505" y1="92" x2="612" y2="121" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="5,3"/>
      <text x="540" y="145" textAnchor="middle" fontSize="7.5" fill="#dc2626">Path 3 (red)</text>

      {/* Path 4: Fabric B → Ctrl B */}
      <line x1="505" y1="92" x2="718" y2="121" stroke="#dc2626" strokeWidth="2"/>
      <text x="620" y="148" textAnchor="middle" fontSize="7.5" fill="#dc2626" fontWeight="700">Path 4 (red)</text>

      {/* OS view */}
      <rect x="60" y="170" width="170" height="50" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
      <text x="145" y="190" textAnchor="middle" fontSize="9" fill="#f8fafc" fontWeight="600">OS sees: ONE device</text>
      <text x="145" y="203" textAnchor="middle" fontSize="8" fill="#94a3b8">/dev/mapper/mpatha</text>
      <text x="145" y="215" textAnchor="middle" fontSize="8" fill="#94a3b8">or Disk 1 (Windows)</text>
      <line x1="145" y1="118" x2="145" y2="170" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="145" y="238" textAnchor="middle" fontSize="7.5" fill="#6b7280">Multipath software aggregates</text>
      <text x="145" y="250" textAnchor="middle" fontSize="7.5" fill="#6b7280">all paths into single device</text>

      {/* Path legend */}
      <rect x="60" y="268" width="750" height="84" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
      <text x="80" y="285" fontSize="9" fontWeight="700" fill="#374151">Path Legend (Example only — actual ALUA states are array architecture and configuration dependent):</text>
      <line x1="80" y1="300" x2="110" y2="300" stroke="#2563eb" strokeWidth="2"/>
      <text x="118" y="304" fontSize="8" fill="#374151">Path 1: HBA1 → Fabric A → Ctrl A — example Active/Optimized TPG (solid)</text>
      <line x1="80" y1="316" x2="110" y2="316" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="5,3"/>
      <text x="118" y="320" fontSize="8" fill="#374151">Path 2: HBA1 → Fabric A → Ctrl B — example Active/Non-Optimized TPG (dashed)</text>
      <line x1="440" y1="300" x2="470" y2="300" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="5,3"/>
      <text x="478" y="304" fontSize="8" fill="#374151">Path 3: HBA2 → Fabric B → Ctrl A — example Active/Non-Optimized (dashed)</text>
      <line x1="440" y1="316" x2="470" y2="316" stroke="#dc2626" strokeWidth="2"/>
      <text x="478" y="320" fontSize="8" fill="#374151">Path 4: HBA2 → Fabric B → Ctrl B — example Active/Optimized (solid)</text>
      <text x="80" y="344" fontSize="7.5" fill="#dc2626">Active/Active arrays may show ALL paths as Optimized. Behavior depends on vendor, protocol, model and software version.</text>

      <text x="430" y="370" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-multipathing-paths.png</text>
    </svg>
  );
}
