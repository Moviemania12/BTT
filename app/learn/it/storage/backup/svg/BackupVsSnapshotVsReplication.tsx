"use client";
// D1 — Backup vs Snapshot vs Replication (compact vertical layout)
export default function BackupVsSnapshotVsReplication() {
  const HEADER = 22;
  const ROW_H = 15;
  const PAD   = 3;
  const VERDICT_H = 17;
  const GAP   = 5;

  const cardHeight = (rows: number) => HEADER + rows * ROW_H + PAD * 2 + VERDICT_H;

  const cards = [
    {
      title: "SNAPSHOT", border: "#ea580c", bg: "#fff7ed", tc: "#c2410c",
      rows: [
        { icon: "⚠", text: "Same storage system — source fails → snapshot gone", w: true },
        { icon: "⚠", text: "Immutability strength varies by platform/mode", w: true },
        { icon: "✓", text: "Fast rollback for recent changes", w: false },
        { icon: "✓", text: "Excellent for operational recovery", w: false },
      ],
      verdict: "NOT a replacement for independent backup", vBg: "#fed7aa", vTc: "#9a3412",
    },
    {
      title: "BACKUP", border: "#16a34a", bg: "#f0fdf4", tc: "#15803d",
      rows: [
        { icon: "✓", text: "Different failure domain from production", w: false },
        { icon: "✓", text: "Separate access controls", w: false },
        { icon: "✓", text: "Historical point-in-time restore", w: false },
        { icon: "✓", text: "Offsite / immutable copies possible", w: false },
      ],
      verdict: "Independent recoverable copies", vBg: "#bbf7d0", vTc: "#15803d",
    },
    {
      title: "REPLICATION", border: "#2563eb", bg: "#eff6ff", tc: "#1e40af",
      rows: [
        { icon: "⚠", text: "Corruption replicated to secondary", w: true },
        { icon: "⚠", text: "Accidental deletion replicated", w: true },
        { icon: "⚠", text: "Ransomware may replicate", w: true },
        { icon: "✓", text: "Fast failover — availability", w: false },
      ],
      verdict: "Availability — NOT historical recovery", vBg: "#bfdbfe", vTc: "#1e40af",
    },
  ];

  const totalH = 48 + cards.reduce((s, c) => s + cardHeight(c.rows.length) + GAP, 0) + 24;
  let y = 30;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup vs Snapshot vs Replication protection model"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Backup vs Snapshot vs Replication</text>
      <text x="240" y="36" textAnchor="middle" fontSize="9.5" fill="#6b7280">Three different protection models — distinct roles</text>

      {cards.map((c, ci) => {
        const h = cardHeight(c.rows.length);
        const gy = y;
        const el = (
          <g key={ci}>
            <rect x="10" y={gy} width="460" height={h} rx="8" fill={c.bg} stroke={c.border} strokeWidth="2"/>
            {/* Header bar */}
            <rect x="10" y={gy} width="460" height={HEADER} rx="8" fill={c.border}/>
            <rect x="10" y={gy + HEADER - 6} width="460" height="6" fill={c.border}/>
            <text x="240" y={gy + HEADER - 9} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{c.title}</text>
            {/* Rows */}
            {c.rows.map((r, ri) => (
              <g key={ri}>
                <text x="22" y={gy + HEADER + PAD + ri * ROW_H + 15}
                  fontSize="10" fill={r.w ? "#dc2626" : c.tc}>{r.icon}</text>
                <text x="38" y={gy + HEADER + PAD + ri * ROW_H + 15}
                  fontSize="10" fill={r.w ? "#991b1b" : c.tc} fontWeight={r.w ? "600" : "400"}>{r.text}</text>
              </g>
            ))}
            {/* Verdict bar */}
            <rect x="18" y={gy + HEADER + PAD + c.rows.length * ROW_H + 4} width="444" height={VERDICT_H - 4} rx="5" fill={c.vBg}/>
            <text x="240" y={gy + HEADER + PAD + c.rows.length * ROW_H + 18}
              textAnchor="middle" fontSize="10" fontWeight="700" fill={c.vTc}>{c.verdict}</text>
          </g>
        );
        y += h + GAP;
        return el;
      })}

      <rect x="10" y={y} width="460" height="24" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="240" y={y + 16} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#991b1b">
        Offsite ≠ Immutable ≠ Air-Gapped — three different properties
      </text>
    </svg>
  );
}
