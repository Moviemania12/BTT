"use client";
// DR D7 — Ransomware / Cyber Recovery Architecture
export default function DrRansomwareRecovery() {
  const ITEM_H = 16;
  const HEAD_H = 38;
  const PAD_V  = 5;
  const ARR_H  = 18;
  const WARN_H = 18;

  const zones = [
    {
      label: "ZONE 1 — PRODUCTION (Compromised)",
      sub: "Ransomware entry point",
      items: [
        "Servers / VMs / Databases / File Servers — encrypted",
        "✗ Traditional DR replication → propagated encrypted blocks to DR",
      ],
      warn: "Traditional failover to DR = failing over to also-encrypted data",
      warnColor: "#991b1b", bg: "#fee2e2", border: "#dc2626", tc: "#991b1b", wBg: "#fecaca",
    },
    {
      label: "ZONE 2 — TRADITIONAL DR (Also at Risk)",
      sub: "Replication propagated ransomware here",
      items: [
        "DR site received encrypted data via replication",
        "✗ Failover to this = restoring encrypted/corrupt state",
        "Isolation/shutdown per IR team decision and org policy",
      ],
      warn: "Identify infection timeline — when did ransomware execute?",
      warnColor: "#92400e", bg: "#fff7ed", border: "#ea580c", tc: "#c2410c", wBg: "#fed7aa",
    },
    {
      label: "ZONE 3 — CYBER RECOVERY VAULT (Isolated)",
      sub: "No network connection to production or DR",
      items: [
        "🔒 Immutable copies — Object Lock compliance / WORM / offline tape",
        "🏗 Clean room: isolated network, no connection to production",
        "1. Restore from clean point BEFORE infection",
        "2. Forensic validation — confirm cleanliness",
        "3. Rebuild production (clean OS, patched, reconfigured)",
        "4. Migrate clean data to rebuilt environment",
        "5. Connect users ONLY after full validation",
      ],
      warn: "Immutable isolated copies must exist BEFORE incident",
      warnColor: "#15803d", bg: "#f0fdf4", border: "#16a34a", tc: "#15803d", wBg: "#bbf7d0",
    },
  ];

  const heights = zones.map(z => HEAD_H + z.items.length * ITEM_H + PAD_V * 2 + WARN_H + 6);
  const totalH  = 12 + heights.reduce((s, h, i) => s + h + (i < zones.length - 1 ? ARR_H : 0), 0) + 30;

  let y = 12;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Ransomware cyber recovery architecture zones"
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
            <text x="240" y={y + 17} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{zone.label}</text>
            <text x="240" y={y + 30} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.85)">{zone.sub}</text>
            {zone.items.map((item, ii) => (
              <text key={ii} x="18" y={y + HEAD_H + PAD_V + ii * ITEM_H + 12}
                fontSize="9.5" fill={zone.tc}>{item}</text>
            ))}
            <rect x="16" y={warnY} width="448" height={WARN_H} rx="4" fill={zone.wBg}/>
            <text x="240" y={warnY + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill={zone.warnColor}>{zone.warn}</text>
            {zi < zones.length - 1 && (
              <g>
                <line x1="240" y1={y+h} x2="240" y2={y+h+ARR_H-5} stroke={zone.border} strokeWidth="2.5"/>
                <polygon points={`235,${y+h+ARR_H-5} 245,${y+h+ARR_H-5} 240,${y+h+ARR_H}`} fill={zone.border}/>
              </g>
            )}
          </g>
        );
        y += h + (zi < zones.length - 1 ? ARR_H : 0);
        return el;
      })}

      <rect x="10" y={y + 6} width="460" height="20" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y + 19} textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">
        Traditional DR replication ≠ protection against ransomware
      </text>
    </svg>
  );
}
