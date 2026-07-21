"use client";
// D2 — Enterprise Backup Architecture (mobile-first vertical flow)
export default function BackupEnterpriseArch() {
  const layers = [
    {
      label: "PRODUCTION WORKLOADS",
      bg: "#dbeafe", border: "#2563eb", textColor: "#1e40af",
      items: ["Physical Servers", "VMware VMs", "Databases (SQL/Oracle)", "NAS Shares", "SAN Workloads"],
    },
    {
      label: "AGENT / API / HYPERVISOR INTEGRATION",
      bg: "#ede9fe", border: "#7c3aed", textColor: "#5b21b6",
      items: ["Backup Agent (installed on source)", "Hypervisor API — VADP (VMware)", "Application Plugin — VSS / RMAN / DB plugin", "Application-consistent quiescing"],
    },
    {
      label: "BACKUP INFRASTRUCTURE",
      bg: "#dcfce7", border: "#16a34a", textColor: "#15803d",
      items: ["Backup Server — scheduling, catalog, management", "Backup Proxies / Media Servers — data movers", "Dedicated Backup Network / VLAN (recommended)", "Compression · Deduplication · Encryption"],
    },
    {
      label: "PRIMARY BACKUP REPOSITORY",
      bg: "#fef9c3", border: "#ca8a04", textColor: "#92400e",
      items: ["Disk / Dedup Appliance / Object Storage", "Fast backup · Fast local restore", "⚠ Backup Catalog — must itself be backed up", "Separate credentials from production"],
    },
    {
      label: "SECONDARY / ISOLATED COPIES",
      bg: "#fee2e2", border: "#dc2626", textColor: "#991b1b",
      items: [
        "🔒 Immutable Repository — Object Lock (Compliance mode strongest) / Hardened repo / WORM",
        "📼 Tape Offsite Vault — physical air gap when vaulted",
        "☁ Cloud / Object Storage — geographic diversity (verify object lock behavior)",
        "⚠ Separate admin credentials from production — mandatory",
      ],
    },
  ];

  const itemH = 22;
  const headerH = 38;
  const padV = 10;
  const arrowH = 28;
  let totalH = 16;
  const layerHeights = layers.map(l => headerH + l.items.length * itemH + padV * 2);
  layerHeights.forEach((h, i) => { totalH += h; if (i < layers.length - 1) totalH += arrowH; });
  totalH += 16;

  let y = 16;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Enterprise backup architecture flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>

      {layers.map((layer, li) => {
        const h = layerHeights[li];
        const el = (
          <g key={li}>
            <rect x="10" y={y} width="460" height={h} rx="8" fill={layer.bg} stroke={layer.border} strokeWidth="2"/>
            <rect x="10" y={y} width="460" height={headerH} rx="8" fill={layer.border}/>
            <rect x="10" y={y + headerH - 8} width="460" height="8" fill={layer.border}/>
            <text x="240" y={y + 24} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">{layer.label}</text>
            {layer.items.map((item, ii) => (
              <text key={ii} x="26" y={y + headerH + padV + ii * itemH + 14}
                fontSize="11.5" fill={layer.textColor} fontWeight="400">
                {item}
              </text>
            ))}
            {li < layers.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + arrowH - 6} stroke={layer.border} strokeWidth="2.5"/>
                <polygon points={`233,${y + h + arrowH - 6} 247,${y + h + arrowH - 6} 240,${y + h + arrowH}`} fill={layer.border}/>
              </g>
            )}
          </g>
        );
        y += h + (li < layers.length - 1 ? arrowH : 0);
        return el;
      })}
    </svg>
  );
}
