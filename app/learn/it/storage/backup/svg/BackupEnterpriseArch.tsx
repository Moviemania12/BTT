"use client";
// D2 — Enterprise Backup Architecture (compact vertical flow)
export default function BackupEnterpriseArch() {
  const ITEM_H  = 13;
  const HEAD_H  = 22;
  const PAD_V   = 3;
  const ARROW_H = 12;

  const layers = [
    {
      label: "PRODUCTION WORKLOADS",
      border: "#2563eb", bg: "#dbeafe", tc: "#1e40af",
      items: ["Physical Servers · VMware VMs · Databases (SQL/Oracle)",
              "NAS Shares · SAN Workloads"],
    },
    {
      label: "AGENT / API / HYPERVISOR INTEGRATION",
      border: "#7c3aed", bg: "#ede9fe", tc: "#5b21b6",
      items: ["Backup Agent (installed) / Hypervisor API — VADP",
              "Application Plugin — VSS / RMAN",
              "Application-consistent quiescing"],
    },
    {
      label: "BACKUP INFRASTRUCTURE",
      border: "#16a34a", bg: "#dcfce7", tc: "#15803d",
      items: ["Backup Server — scheduling, catalog, management",
              "Backup Proxies / Media Servers — data movers",
              "Dedicated Backup Network / VLAN (recommended)"],
    },
    {
      label: "PRIMARY BACKUP REPOSITORY",
      border: "#ca8a04", bg: "#fef9c3", tc: "#92400e",
      items: ["Disk / Dedup Appliance / Object Storage — fast backup & restore",
              "⚠ Backup Catalog — must itself be backed up",
              "Separate credentials from production"],
    },
    {
      label: "SECONDARY / ISOLATED COPIES",
      border: "#dc2626", bg: "#fee2e2", tc: "#991b1b",
      items: ["🔒 Immutable Repo — Object Lock Compliance / Hardened / WORM",
              "📼 Tape Offsite Vault — physical air gap when vaulted",
              "☁  Cloud / Object Storage — separate admin credentials required"],
    },
  ];

  const heights = layers.map(l => HEAD_H + l.items.length * ITEM_H + PAD_V * 2);
  const totalH  = 12 + heights.reduce((s, h, i) => s + h + (i < layers.length - 1 ? ARROW_H : 0), 0) + 12;

  let y = 12;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Enterprise backup architecture flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      {layers.map((layer, li) => {
        const h = heights[li];
        const el = (
          <g key={li}>
            <rect x="10" y={y} width="460" height={h} rx="7" fill={layer.bg} stroke={layer.border} strokeWidth="2"/>
            <rect x="10" y={y} width="460" height={HEAD_H} rx="7" fill={layer.border}/>
            <rect x="10" y={y + HEAD_H - 5} width="460" height="5" fill={layer.border}/>
            <text x="240" y={y + HEAD_H - 9} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{layer.label}</text>
            {layer.items.map((item, ii) => (
              <text key={ii} x="20" y={y + HEAD_H + PAD_V + ii * ITEM_H + 13}
                fontSize="10" fill={layer.tc}>{item}</text>
            ))}
            {li < layers.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + ARROW_H - 5} stroke={layer.border} strokeWidth="2.5"/>
                <polygon points={`234,${y + h + ARROW_H - 5} 246,${y + h + ARROW_H - 5} 240,${y + h + ARROW_H}`} fill={layer.border}/>
              </g>
            )}
          </g>
        );
        y += h + (li < layers.length - 1 ? ARROW_H : 0);
        return el;
      })}
    </svg>
  );
}
