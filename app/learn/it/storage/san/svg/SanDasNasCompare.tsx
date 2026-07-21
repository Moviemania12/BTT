"use client";
// Diagram 1 — DAS vs NAS vs SAN: Data Path Comparison
// Future image: /public/images/articles/san/san-vs-das-vs-nas-path.png
export default function SanDasNasCompare() {
  return (
    <svg viewBox="0 0 860 310" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="DAS vs NAS vs SAN data path comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="310" fill="#f8fafc" rx="12"/>
      <text x="430" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">DAS vs NAS vs SAN — Data Path Comparison</text>

      {/* DAS */}
      <rect x="20" y="38" width="258" height="238" rx="9" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
      <text x="149" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#c2410c">DAS</text>
      <text x="149" y="72" textAnchor="middle" fontSize="8.5" fill="#9a3412">Direct Attached Storage</text>
      <rect x="40" y="82" width="218" height="22" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="149" y="97" textAnchor="middle" fontSize="9.5" fill="#c2410c" fontWeight="600">Server / Host</text>
      <text x="149" y="116" textAnchor="middle" fontSize="9" fill="#9a3412">↓  SAS / NVMe / SATA cable</text>
      <rect x="40" y="124" width="218" height="22" rx="4" fill="#fdba74" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="149" y="139" textAnchor="middle" fontSize="9.5" fill="#c2410c" fontWeight="600">Storage Controller / HBA</text>
      <text x="149" y="158" textAnchor="middle" fontSize="9" fill="#9a3412">↓  No network</text>
      <rect x="40" y="166" width="218" height="22" rx="4" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      <text x="149" y="181" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="700">Physical Drives</text>
      <text x="149" y="210" textAnchor="middle" fontSize="8" fill="#c2410c">Host sees: Raw block device</text>
      <text x="149" y="224" textAnchor="middle" fontSize="8" fill="#9a3412">Typical: single host attached</text>
      <text x="149" y="238" textAnchor="middle" fontSize="7.5" fill="#9a3412">(shared-SAS clusters exist</text>
      <text x="149" y="250" textAnchor="middle" fontSize="7.5" fill="#9a3412">but not general NAS sharing)</text>
      <rect x="40" y="258" width="218" height="14" rx="3" fill="#fed7aa"/>
      <text x="149" y="269" textAnchor="middle" fontSize="7.5" fill="#c2410c" fontWeight="600">BLOCK-LEVEL ACCESS</text>

      {/* NAS */}
      <rect x="300" y="38" width="258" height="238" rx="9" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="429" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">NAS</text>
      <text x="429" y="72" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">Network Attached Storage</text>
      {["Server A","Server B","Linux Client"].map((c,i) => (
        <g key={i}>
          <rect x={310} y={82 + i*22} width={98} height={18} rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.6"/>
          <text x={359} y={95+i*22} textAnchor="middle" fontSize="8" fill="#1e40af">{c}</text>
        </g>
      ))}
      <text x="429" y="160" textAnchor="middle" fontSize="8.5" fill="#2563eb">↓ Ethernet  SMB / NFS</text>
      <rect x="330" y="168" width="198" height="18" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1"/>
      <text x="429" y="181" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Ethernet Switch</text>
      <text x="429" y="198" textAnchor="middle" fontSize="8.5" fill="#2563eb">↓ Ethernet Network</text>
      <rect x="330" y="206" width="198" height="22" rx="4" fill="#3b82f6" stroke="#2563eb" strokeWidth="1"/>
      <text x="429" y="221" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="700">NAS Appliance + Filesystem</text>
      <rect x="330" y="232" width="198" height="14" rx="3" fill="#1d4ed8"/>
      <text x="429" y="243" textAnchor="middle" fontSize="8" fill="#fff">Storage Pool / Drives</text>
      <rect x="330" y="252" width="198" height="14" rx="3" fill="#dbeafe"/>
      <text x="429" y="263" textAnchor="middle" fontSize="7.5" fill="#1e40af" fontWeight="600">FILE-LEVEL ACCESS (SMB/NFS)</text>
      <text x="429" y="274" textAnchor="middle" fontSize="7.5" fill="#6b7280">NAS manages filesystem</text>

      {/* SAN */}
      <rect x="580" y="38" width="258" height="238" rx="9" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="709" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">SAN</text>
      <text x="709" y="72" textAnchor="middle" fontSize="8.5" fill="#166534">Storage Area Network</text>
      <rect x="600" y="82" width="218" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="709" y="97" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">Server + HBA (FC/iSCSI)</text>
      <text x="709" y="116" textAnchor="middle" fontSize="9" fill="#15803d">↓  FC fabric or dedicated iSCSI</text>
      <rect x="600" y="124" width="218" height="22" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="709" y="139" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">SAN Switch / Storage Network</text>
      <text x="709" y="158" textAnchor="middle" fontSize="9" fill="#15803d">↓  Target port (WWPN / iSCSI)</text>
      <rect x="600" y="166" width="218" height="22" rx="4" fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
      <text x="709" y="181" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="700">Storage Array — LUN</text>
      <text x="709" y="200" textAnchor="middle" fontSize="8.5" fill="#166534">Storage Pool / RAID / Drives</text>
      <rect x="600" y="208" width="218" height="14" rx="3" fill="#dcfce7"/>
      <text x="709" y="219" textAnchor="middle" fontSize="7.5" fill="#15803d">Host sees: Raw LUN (block device)</text>
      <rect x="600" y="226" width="218" height="14" rx="3" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
      <text x="709" y="237" textAnchor="middle" fontSize="7" fill="#991b1b">Multi-host requires cluster-aware software</text>
      <rect x="600" y="250" width="218" height="14" rx="3" fill="#dcfce7"/>
      <text x="709" y="261" textAnchor="middle" fontSize="7.5" fill="#15803d" fontWeight="600">BLOCK-LEVEL ACCESS (FC/iSCSI)</text>
      <text x="709" y="274" textAnchor="middle" fontSize="7.5" fill="#6b7280">Host creates its own filesystem</text>

      <text x="430" y="296" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-vs-das-vs-nas-path.png</text>
    </svg>
  );
}
