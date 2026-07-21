"use client";
// Diagram 2 — Enterprise Backup Architecture: Source to Repository to Offsite
export default function BackupEnterpriseArch() {
  return (
    <svg viewBox="0 0 860 390" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Enterprise backup architecture from production workloads to repository to offsite copies"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="390" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Enterprise Backup Architecture — Source to Repository to Isolated Copies</text>

      {/* Layer 1 — Production */}
      <rect x="20" y="34" width="820" height="44" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="430" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Production Workloads</text>
      {["Physical Servers","VMware VMs","Databases (SQL/Oracle)","NAS Shares","SAN Workloads"].map((s,i) => (
        <g key={i}>
          <rect x={28+i*162} y="60" width="150" height="12" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.5"/>
          <text x={103+i*162} y="69" textAnchor="middle" fontSize="7.5" fill="#1e40af">{s}</text>
        </g>
      ))}

      {/* Layer 2 — Agent/API */}
      <text x="430" y="92" textAnchor="middle" fontSize="9" fill="#6b7280">↓ Backup Agent / Hypervisor API (VADP) / Application Plugin (VSS / RMAN)</text>

      {/* Layer 3 — Backup Infra */}
      <rect x="20" y="100" width="820" height="50" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="430" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">Backup Infrastructure — Dedicated Backup Network (VLAN recommended)</text>
      <rect x="40" y="126" width="240" height="18" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="160" y="138" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Backup Server — management, catalog, scheduling</text>
      <rect x="330" y="126" width="480" height="18" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="570" y="138" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Backup Proxies / Media Servers — data movers (compress/dedupe)</text>

      {/* Layer 4 — Primary Repository */}
      <text x="430" y="164" textAnchor="middle" fontSize="9" fill="#6b7280">↓ Backup Network</text>
      <rect x="120" y="170" width="620" height="50" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="430" y="188" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Primary Backup Repository — Disk / Dedup Appliance / Object Storage</text>
      <rect x="140" y="196" width="240" height="18" rx="4" fill="#fde68a" stroke="#d97706" strokeWidth="0.8"/>
      <text x="260" y="208" textAnchor="middle" fontSize="8.5" fill="#92400e">Fast backup, fast local restore</text>
      <rect x="430" y="196" width="290" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
      <text x="575" y="208" textAnchor="middle" fontSize="8.5" fill="#92400e" fontWeight="600">Backup Catalog — MUST itself be backed up</text>

      {/* Layer 5 — Secondary copies */}
      <text x="430" y="234" textAnchor="middle" fontSize="9" fill="#6b7280">↓ Backup Copy Jobs (separate credentials required)</text>
      <rect x="20" y="240" width="820" height="100" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <text x="430" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">Secondary / Isolated Copies — Independent Failure Domains</text>

      <rect x="40" y="266" width="240" height="64" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2"/>
      <text x="160" y="282" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">Immutable Repository</text>
      <text x="160" y="296" textAnchor="middle" fontSize="8" fill="#374151">Object Lock / Hardened Linux / WORM</text>
      <text x="160" y="308" textAnchor="middle" fontSize="7.5" fill="#dc2626">Compliance mode: strongest protection</text>
      <text x="160" y="320" textAnchor="middle" fontSize="7.5" fill="#9ca3af">Governance mode: privileged override possible</text>

      <rect x="320" y="266" width="220" height="64" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2"/>
      <text x="430" y="282" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">Tape Offsite Vault</text>
      <text x="430" y="296" textAnchor="middle" fontSize="8" fill="#374151">Physical air gap when media offline</text>
      <text x="430" y="308" textAnchor="middle" fontSize="7.5" fill="#dc2626">True physical isolation when vaulted</text>
      <text x="430" y="320" textAnchor="middle" fontSize="7.5" fill="#374151">Long-term, cost-effective</text>

      <rect x="580" y="266" width="240" height="64" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2"/>
      <text x="700" y="282" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">Cloud / Object Storage</text>
      <text x="700" y="296" textAnchor="middle" fontSize="8" fill="#374151">Geographic diversity, scalable</text>
      <text x="700" y="308" textAnchor="middle" fontSize="7.5" fill="#dc2626">Object lock — verify provider behavior</text>
      <text x="700" y="320" textAnchor="middle" fontSize="7.5" fill="#374151">Separate cloud credentials required</text>

      <text x="430" y="354" textAnchor="middle" fontSize="7.5" fill="#991b1b" fontWeight="600">Separate administrative credentials from production — mandatory for ransomware resilience</text>
      <text x="430" y="368" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: backup-enterprise-architecture.png</text>
    </svg>
  );
}
