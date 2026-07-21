"use client";
// D1 — Backup vs Snapshot vs Replication (mobile-first vertical layout)
export default function BackupVsSnapshotVsReplication() {
  const card = (
    title: string, titleColor: string, bg: string, border: string,
    rows: { icon: string; text: string; color: string }[],
    verdict: string, verdictBg: string, verdictColor: string
  ) => {
    const rowH = 36;
    const headerH = 54;
    const verdictH = 42;
    const totalH = headerH + rows.length * rowH + 12 + verdictH;
    return { title, titleColor, bg, border, rows, verdict, verdictBg, verdictColor, totalH };
  };

  const cards = [
    card(
      "SNAPSHOT", "#c2410c", "#fff7ed", "#ea580c",
      [
        { icon: "⚠", text: "Resides on same storage system", color: "#c2410c" },
        { icon: "⚠", text: "Source storage fails → snapshot gone", color: "#991b1b" },
        { icon: "⚠", text: "Immutability strength varies by mode", color: "#c2410c" },
        { icon: "✓", text: "Fast rollback — recent changes", color: "#15803d" },
        { icon: "✓", text: "Excellent for operational recovery", color: "#15803d" },
      ],
      "NOT a replacement for backup", "#fed7aa", "#9a3412"
    ),
    card(
      "BACKUP", "#15803d", "#f0fdf4", "#16a34a",
      [
        { icon: "✓", text: "Different failure domain from production", color: "#15803d" },
        { icon: "✓", text: "Separate access controls", color: "#15803d" },
        { icon: "✓", text: "Historical point-in-time restore", color: "#15803d" },
        { icon: "✓", text: "Survives source storage failure", color: "#15803d" },
        { icon: "✓", text: "Offsite / immutable copies possible", color: "#15803d" },
      ],
      "Independent recoverable copies", "#bbf7d0", "#15803d"
    ),
    card(
      "REPLICATION", "#1e40af", "#eff6ff", "#2563eb",
      [
        { icon: "⚠", text: "Corruption replicated to secondary", color: "#991b1b" },
        { icon: "⚠", text: "Accidental deletion replicated", color: "#991b1b" },
        { icon: "⚠", text: "Ransomware may replicate", color: "#991b1b" },
        { icon: "✓", text: "Fast failover — availability", color: "#15803d" },
        { icon: "✓", text: "Near-real-time or periodic sync", color: "#15803d" },
      ],
      "Availability — NOT historical recovery", "#bfdbfe", "#1e40af"
    ),
  ];

  const totalH = cards.reduce((s, c) => s + c.totalH + 20, 0) + 80;

  let y = 58;
  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup vs Snapshot vs Replication protection model"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>
      <text x="240" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Backup vs Snapshot vs Replication</text>
      <text x="240" y="42" textAnchor="middle" fontSize="11" fill="#6b7280">Three different protection models</text>

      {cards.map((c, ci) => {
        const cardY = y;
        const el = (
          <g key={ci}>
            {/* Card background */}
            <rect x="12" y={cardY} width="456" height={c.totalH} rx="10" fill={c.bg} stroke={c.border} strokeWidth="2"/>
            {/* Header */}
            <rect x="12" y={cardY} width="456" height="46" rx="10" fill={c.border}/>
            <rect x="12" y={cardY + 36} width="456" height="10" fill={c.border}/>
            <text x="240" y={cardY + 29} textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{c.title}</text>
            {/* Rows */}
            {c.rows.map((r, ri) => (
              <g key={ri}>
                <text x="32" y={cardY + 54 + ri * 36 + 16} fontSize="15" fill={r.color}>{r.icon}</text>
                <text x="52" y={cardY + 54 + ri * 36 + 16} fontSize="12" fill={r.color} fontWeight={r.color === "#991b1b" ? "700" : "500"}>{r.text}</text>
              </g>
            ))}
            {/* Verdict */}
            <rect x="24" y={cardY + 54 + c.rows.length * 36 + 6} width="432" height="30" rx="6" fill={c.verdictBg}/>
            <text x="240" y={cardY + 54 + c.rows.length * 36 + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill={c.verdictColor}>{c.verdict}</text>
          </g>
        );
        y += c.totalH + 20;
        return el;
      })}

      <rect x="12" y={y} width="456" height="28" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">Offsite ≠ Immutable ≠ Air-Gapped — three different properties</text>
    </svg>
  );
}
