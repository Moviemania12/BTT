"use client";
// Diagram 1 — DAS vs NAS Side-by-Side Data Path
// Future image: /public/images/articles/nas/nas-vs-das-path.png
export default function NasDasComparison() {
  return (
    <svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="DAS vs NAS side-by-side data path comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="320" fill="#f8fafc" rx="12" />
      <text x="430" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">DAS vs NAS — Data Path Comparison</text>
      <text x="430" y="46" textAnchor="middle" fontSize="10" fill="#6b7280">DAS: directly attached to host. NAS: shared file access via Ethernet network.</text>

      {/* DAS panel */}
      <rect x="30" y="62" width="370" height="228" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5"/>
      <text x="215" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c2410c">DAS — Direct Attached Storage</text>
      <text x="215" y="100" textAnchor="middle" fontSize="9" fill="#9a3412">Typically attached to one host — no general-purpose network sharing</text>
      <rect x="70" y="112" width="290" height="28" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="215" y="130" textAnchor="middle" fontSize="10" fill="#c2410c" fontWeight="600">Server / Host</text>
      <text x="215" y="147" textAnchor="middle" fontSize="10" fill="#9a3412">↓  Direct physical cable (SAS / NVMe / SATA)</text>
      <rect x="70" y="158" width="290" height="28" rx="5" fill="#fdba74" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="215" y="176" textAnchor="middle" fontSize="10" fill="#c2410c" fontWeight="600">Storage Controller / HBA</text>
      <text x="215" y="194" textAnchor="middle" fontSize="10" fill="#9a3412">↓  No network</text>
      <rect x="70" y="204" width="290" height="28" rx="5" fill="#fb923c" stroke="#ea580c" strokeWidth="1"/>
      <text x="215" y="222" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">Physical Drives (HDD / SSD / NVMe)</text>
      <text x="215" y="252" textAnchor="middle" fontSize="8.5" fill="#c2410c">Specialized shared-SAS/cluster designs can exist</text>
      <text x="215" y="265" textAnchor="middle" fontSize="8.5" fill="#c2410c">but are not typical general-purpose NAS</text>
      <text x="215" y="280" textAnchor="middle" fontSize="8" fill="#9ca3af">Note: Block storage available via DAS or SAN topology</text>

      {/* NAS panel */}
      <rect x="460" y="62" width="370" height="228" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="645" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">NAS — Network Attached Storage</text>
      <text x="645" y="100" textAnchor="middle" fontSize="9" fill="#1d4ed8">Multiple clients simultaneously via Ethernet network</text>
      {[["Server A","Server B"],["Server C","Linux Client"]].map(([a,b], ri) => (
        <g key={ri}>
          <rect x="470" y={112 + ri * 30} width="100" height="22" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
          <text x="520" y={127 + ri * 30} textAnchor="middle" fontSize="9" fill="#1e40af">{a}</text>
          <rect x="590" y={112 + ri * 30} width="100" height="22" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
          <text x="640" y={127 + ri * 30} textAnchor="middle" fontSize="9" fill="#1e40af">{b}</text>
        </g>
      ))}
      <text x="645" y="182" textAnchor="middle" fontSize="9" fill="#2563eb">SMB (Port 445) / NFS (Port 2049)</text>
      <rect x="530" y="190" width="230" height="22" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1"/>
      <text x="645" y="205" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e40af">Ethernet Switch</text>
      <text x="645" y="221" textAnchor="middle" fontSize="9" fill="#2563eb">↓  Ethernet Network</text>
      <rect x="530" y="228" width="230" height="28" rx="5" fill="#3b82f6" stroke="#2563eb" strokeWidth="1"/>
      <text x="645" y="246" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">NAS Appliance</text>
      <text x="645" y="262" textAnchor="middle" fontSize="8.5" fill="#1d4ed8">File System → Storage Pool → Drives</text>
      <text x="645" y="278" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: nas-vs-das-path.png</text>
    </svg>
  );
}
