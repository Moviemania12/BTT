"use client";
// D7 — Ransomware-Resilient Backup Architecture (mobile-first zones)
export default function BackupRansomwareResilient() {
  const zones = [
    {
      label: "ZONE 1 — PRODUCTION",
      sublabel: "Attack surface",
      items: ["Servers · VMs · Databases", "Production Active Directory", "File Servers · Applications"],
      warning: "Ransomware entry point — assume compromised in worst case",
      bg: "#fee2e2", border: "#dc2626", tc: "#991b1b", warnBg: "#fecaca",
    },
    {
      label: "ZONE 2 — BACKUP INFRASTRUCTURE",
      sublabel: "Protected but connected",
      items: [
        "🔐 MFA on backup console — mandatory",
        "🔑 Backup credentials ≠ production AD admin",
        "Backup Server (separate service account)",
        "Backup Proxies",
        "Primary Repository",
        "Firewall: production cannot initiate to backup",
      ],
      warning: "Least privilege · RBAC · Audit all access · Network segmentation",
      bg: "#fff7ed", border: "#ea580c", tc: "#c2410c", warnBg: "#fed7aa",
    },
    {
      label: "ZONE 3 — ISOLATED COPIES",
      sublabel: "Immutable / Air-gapped — strongest protection",
      items: [
        "🔒 Immutable Repo — Compliance mode: no one can delete",
        "    (Governance mode: privileged override possible)",
        "📼 Air-Gapped Tape — physically offline when vaulted",
        "☁  Cloud Immutable — separate cloud credentials",
        "    (Verify object lock behavior per provider)",
      ],
      warning: "Separate admin accounts from ALL production credentials",
      bg: "#f0fdf4", border: "#16a34a", tc: "#15803d", warnBg: "#bbf7d0",
    },
    {
      label: "RECOVERY PROCESS",
      sublabel: "After ransomware incident",
      items: [
        "1. Isolate infected systems from network",
        "   Shutdown vs keep-running: IR team decision per org policy",
        "   (Depends on forensics, IR capability, ransomware behavior)",
        "2. Identify last known clean restore point",
        "3. Use immutable / offline copy — verify predates infection",
        "4. Restore to ISOLATED environment first",
        "5. Verify cleanliness before connecting to production",
        "6. Engage IR team · Contact backup vendor support",
      ],
      warning: "Immutable copy configured BEFORE incident — not after",
      bg: "#eff6ff", border: "#2563eb", tc: "#1e40af", warnBg: "#bfdbfe",
    },
  ];

  const itemH = 20;
  const headerH = 50;
  const padV = 8;
  const arrowH = 24;
  let totalH = 12;
  const heights = zones.map(z => headerH + z.items.length * itemH + padV * 2 + 30);
  heights.forEach((h, i) => { totalH += h + (i < zones.length - 1 ? arrowH : 0); });
  totalH += 12;

  let y = 12;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Ransomware-resilient backup architecture"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>

      {zones.map((zone, zi) => {
        const h = heights[zi];
        const warnY = y + headerH + zone.items.length * itemH + padV * 2;
        const el = (
          <g key={zi}>
            <rect x="10" y={y} width="460" height={h} rx="8" fill={zone.bg} stroke={zone.border} strokeWidth="2"/>
            {/* Header */}
            <rect x="10" y={y} width="460" height={headerH} rx="8" fill={zone.border}/>
            <rect x="10" y={y + headerH - 6} width="460" height="6" fill={zone.border}/>
            <text x="240" y={y + 20} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">{zone.label}</text>
            <text x="240" y={y + 38} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.9)">{zone.sublabel}</text>
            {/* Items */}
            {zone.items.map((item, ii) => (
              <text key={ii} x="22" y={y + headerH + padV + ii * itemH + 13}
                fontSize="11" fill={zone.tc} fontWeight={item.startsWith("   ") ? "400" : "500"}>{item}</text>
            ))}
            {/* Warning bar */}
            <rect x="18" y={warnY} width="444" height="24" rx="5" fill={zone.warnBg}/>
            <text x="240" y={warnY + 16} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={zone.tc}>{zone.warning}</text>
            {zi < zones.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + arrowH - 6} stroke={zone.border} strokeWidth="2.5"/>
                <polygon points={`234,${y + h + arrowH - 6} 246,${y + h + arrowH - 6} 240,${y + h + arrowH}`} fill={zone.border}/>
              </g>
            )}
          </g>
        );
        y += h + (zi < zones.length - 1 ? arrowH : 0);
        return el;
      })}
    </svg>
  );
}
