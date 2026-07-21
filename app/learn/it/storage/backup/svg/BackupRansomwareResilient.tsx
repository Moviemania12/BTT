"use client";
// D7 — Ransomware-Resilient Backup Architecture (compact vertical zones)
export default function BackupRansomwareResilient() {
  const ITEM_H  = 13;
  const HEAD_H  = 30;
  const PAD_V   = 3;
  const WARN_H  = 15;
  const ARROW_H = 10;

  const zones = [
    {
      label: "ZONE 1 — PRODUCTION",
      sub: "Attack surface",
      items: ["Servers · VMs · Databases · File Servers",
              "Production Active Directory"],
      warn: "Ransomware entry point — assume worst-case compromise",
      bg: "#fee2e2", border: "#dc2626", tc: "#991b1b", wBg: "#fecaca",
    },
    {
      label: "ZONE 2 — BACKUP INFRASTRUCTURE",
      sub: "Protected but connected",
      items: ["🔐 MFA on backup console — mandatory",
              "🔑 Backup credentials ≠ production AD admin",
              "Backup Server · Proxies · Primary Repository",
              "Firewall: production cannot initiate to backup"],
      warn: "Least privilege · RBAC · Network segmentation · Audit logs",
      bg: "#fff7ed", border: "#ea580c", tc: "#c2410c", wBg: "#fed7aa",
    },
    {
      label: "ZONE 3 — ISOLATED COPIES",
      sub: "Immutable / Air-gapped — strongest protection",
      items: ["🔒 Compliance mode: no one can delete before retention",
              "    (Governance mode: privileged override possible)",
              "📼 Air-Gapped Tape — offline when vaulted",
              "☁  Cloud Immutable — separate cloud credentials"],
      warn: "Separate admin accounts from ALL production credentials",
      bg: "#f0fdf4", border: "#16a34a", tc: "#15803d", wBg: "#bbf7d0",
    },
    {
      label: "RECOVERY PROCESS",
      sub: "After ransomware incident",
      items: ["1. Isolate infected systems from network",
              "   Shutdown/keep-running: IR team decision per org policy",
              "2. Identify last known clean restore point",
              "3. Use immutable/offline copy — verify predates infection",
              "4. Restore to ISOLATED environment first · Verify clean",
              "5. Engage IR team · Contact backup vendor support"],
      warn: "Immutable copy must be configured BEFORE incident",
      bg: "#eff6ff", border: "#2563eb", tc: "#1e40af", wBg: "#bfdbfe",
    },
  ];

  const heights = zones.map(z => HEAD_H + z.items.length * ITEM_H + PAD_V * 2 + WARN_H + 4);
  const totalH  = 12 + heights.reduce((s, h, i) => s + h + (i < zones.length - 1 ? ARROW_H : 0), 0) + 12;

  let y = 12;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Ransomware-resilient backup architecture zones"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      {zones.map((zone, zi) => {
        const h = heights[zi];
        const warnY = y + HEAD_H + PAD_V + zone.items.length * ITEM_H + 4;
        const el = (
          <g key={zi}>
            <rect x="10" y={y} width="460" height={h} rx="7" fill={zone.bg} stroke={zone.border} strokeWidth="2"/>
            <rect x="10" y={y} width="460" height={HEAD_H} rx="7" fill={zone.border}/>
            <rect x="10" y={y + HEAD_H - 5} width="460" height="5" fill={zone.border}/>
            <text x="240" y={y + 16} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#fff">{zone.label}</text>
            <text x="240" y={y + 26} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.88)">{zone.sub}</text>
            {zone.items.map((item, ii) => (
              <text key={ii} x="18" y={y + HEAD_H + PAD_V + ii * ITEM_H + 12}
                fontSize="9.5" fill={zone.tc} fontWeight={item.startsWith("  ") ? "400" : "500"}>{item}</text>
            ))}
            <rect x="16" y={warnY} width="448" height={WARN_H} rx="4" fill={zone.wBg}/>
            <text x="240" y={warnY + 15} textAnchor="middle" fontSize="9" fontWeight="600" fill={zone.tc}>{zone.warn}</text>
            {zi < zones.length - 1 && (
              <g>
                <line x1="240" y1={y + h} x2="240" y2={y + h + ARROW_H - 4} stroke={zone.border} strokeWidth="2.5"/>
                <polygon points={`234,${y+h+ARROW_H-4} 246,${y+h+ARROW_H-4} 240,${y+h+ARROW_H}`} fill={zone.border}/>
              </g>
            )}
          </g>
        );
        y += h + (zi < zones.length - 1 ? ARROW_H : 0);
        return el;
      })}
    </svg>
  );
}
