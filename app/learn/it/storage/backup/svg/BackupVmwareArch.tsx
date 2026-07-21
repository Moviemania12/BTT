"use client";
// Diagram 6 — VMware Backup Architecture
export default function BackupVmwareArch() {
  return (
    <svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="VMware backup architecture: VADP, proxy, repository, offsite copy"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="340" fill="#f8fafc" rx="12"/>
      <text x="430" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">VMware Backup Architecture — VADP-Based</text>

      {/* ESXi Host */}
      <rect x="20" y="30" width="260" height="160" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="150" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">ESXi Host</text>
      {["VM: Oracle DB","VM: Web Server","VM: App Server"].map((v,i) => (
        <g key={i}>
          <rect x="40" y={58+i*36} width="220" height="28" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
          <text x="150" y="76" dy={i*36} textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">{v}</text>
          <text x="150" y="88" dy={i*36} textAnchor="middle" fontSize="7.5" fill="#6b7280">VMware Tools — quiesce if app-consistent</text>
        </g>
      ))}
      <rect x="40" y="168" width="220" height="14" rx="3" fill="#bfdbfe"/>
      <text x="150" y="178" textAnchor="middle" fontSize="7.5" fill="#1e40af">SAN / NAS Datastore (VM disks)</text>

      {/* vCenter */}
      <rect x="20" y="200" width="260" height="44" rx="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="150" y="218" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">vCenter Server</text>
      <text x="150" y="232" textAnchor="middle" fontSize="8" fill="#374151">VADP — vSphere API for Data Protection</text>
      <text x="150" y="242" textAnchor="middle" fontSize="7.5" fill="#6b7280">Job initiation, VM discovery, snapshot coord.</text>

      {/* Backup Server */}
      <rect x="320" y="30" width="200" height="80" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="420" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">Backup Server</text>
      <text x="420" y="64" textAnchor="middle" fontSize="8" fill="#374151">Scheduling, catalog, management</text>
      <text x="420" y="78" textAnchor="middle" fontSize="7.5" fill="#166534">→ Calls vCenter API</text>
      <text x="420" y="90" textAnchor="middle" fontSize="7.5" fill="#166534">→ Manages proxy selection</text>
      <text x="420" y="102" textAnchor="middle" fontSize="7.5" fill="#166534">→ Updates catalog after job</text>

      {/* Backup Proxy */}
      <rect x="320" y="130" width="200" height="80" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="420" y="150" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Backup Proxy</text>
      <text x="420" y="164" textAnchor="middle" fontSize="8" fill="#374151">Reads VM data from snapshot</text>
      <text x="420" y="178" textAnchor="middle" fontSize="7.5" fill="#92400e">CBT: only changed blocks (incremental)</text>
      <text x="420" y="190" textAnchor="middle" fontSize="7.5" fill="#6b7280">CBT = tracking mechanism, not backup itself</text>
      <text x="420" y="202" textAnchor="middle" fontSize="7.5" fill="#6b7280">Can be VM or physical server</text>

      {/* Primary Repo */}
      <rect x="570" y="30" width="260" height="80" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="700" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Primary Backup Repository</text>
      <text x="700" y="64" textAnchor="middle" fontSize="8" fill="#374151">Disk / Dedup Appliance / Object Storage</text>
      <text x="700" y="78" textAnchor="middle" fontSize="7.5" fill="#92400e">Fast backup, fast local restore</text>
      <text x="700" y="90" textAnchor="middle" fontSize="7.5" fill="#6b7280">Backup catalog stored here — must be protected</text>
      <text x="700" y="102" textAnchor="middle" fontSize="7.5" fill="#dc2626">Separate credentials from production AD/admin</text>

      {/* Secondary Repo */}
      <rect x="570" y="130" width="260" height="80" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="700" y="150" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">Secondary / Immutable Copy</text>
      <text x="700" y="164" textAnchor="middle" fontSize="8" fill="#374151">Object lock / hardened repo / tape vault</text>
      <text x="700" y="178" textAnchor="middle" fontSize="7.5" fill="#dc2626">Backup copy job — after primary complete</text>
      <text x="700" y="192" textAnchor="middle" fontSize="7.5" fill="#6b7280">Automated recovery verification (vendor feature)</text>
      <text x="700" y="204" textAnchor="middle" fontSize="7.5" fill="#6b7280">not universal — depends on platform/edition</text>

      {/* Arrows */}
      <line x1="280" y1="160" x2="320" y2="70" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="300" y="108" textAnchor="middle" fontSize="7" fill="#7c3aed">vCenter API</text>
      <line x1="520" y1="70" x2="570" y2="70" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="545" y="64" textAnchor="middle" fontSize="7" fill="#16a34a">data write</text>
      <line x1="420" y1="130" x2="420" y2="130" stroke="#ca8a04" strokeWidth="0"/>
      <line x1="520" y1="170" x2="570" y2="170" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="545" y="164" textAnchor="middle" fontSize="7" fill="#ca8a04">reads snapshot</text>
      <line x1="700" y1="110" x2="700" y2="130" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="720" y="122" fontSize="7" fill="#dc2626">copy job</text>

      {/* Important warnings */}
      <rect x="20" y="258" width="820" height="52" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="30" y="273" fontSize="8.5" fill="#dc2626" fontWeight="600">⚠ VMware snapshot during backup is TEMPORARY — must be consolidated after job. Long-running snapshots cause datastore space consumption and VM performance issues.</text>
      <text x="30" y="288" fontSize="8.5" fill="#dc2626" fontWeight="600">⚠ VMware VM snapshot ≠ independent backup. VMware snapshot resides on same datastore. Independent backup = separate storage via backup software.</text>
      <text x="30" y="302" fontSize="8" fill="#374151">Automated recovery verification (starting backup VM in isolated env to test): vendor-specific feature — not universal. Check your backup platform's capabilities.</text>
      <text x="430" y="322" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: backup-vmware-architecture.png</text>
    </svg>
  );
}
