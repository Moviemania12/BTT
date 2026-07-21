"use client";
// DR D1 — Backup vs HA vs DR: Three Protection Mechanisms
export default function DrVsHaVsBackup() {
  const HEADER = 28;
  const ROW_H  = 20;
  const PAD    = 5;
  const GAP    = 8;

  const cards = [
    {
      title: "BACKUP", border: "#2563eb", bg: "#eff6ff", tc: "#1e40af",
      rows: [
        { label: "Protects",      val: "Data — files, databases, volumes" },
        { label: "Scope",         val: "File / database / volume level" },
        { label: "Trigger",       val: "Recovery operation (manual)" },
        { label: "Failure type",  val: "Data loss, corruption, deletion" },
        { label: "Key point",     val: "Historical recovery points" },
      ],
    },
    {
      title: "HIGH AVAILABILITY", border: "#16a34a", bg: "#f0fdf4", tc: "#15803d",
      rows: [
        { label: "Protects",      val: "Uptime against component failures" },
        { label: "Scope",         val: "Individual system / service" },
        { label: "Trigger",       val: "Automatic on component failure" },
        { label: "Failure type",  val: "Hardware failure, software crash" },
        { label: "Key point",     val: "Seconds–minutes, automatic" },
      ],
    },
    {
      title: "DISASTER RECOVERY", border: "#dc2626", bg: "#fff5f5", tc: "#991b1b",
      rows: [
        { label: "Protects",      val: "Service capability after major disruption" },
        { label: "Scope",         val: "Site / multiple systems / organization" },
        { label: "Trigger",       val: "Formal disaster declaration" },
        { label: "Failure type",  val: "Site failure, widespread event, ransomware" },
        { label: "Key point",     val: "Minutes–days, declared / orchestrated" },
      ],
    },
  ];

  const cardH = (rows: number) => HEADER + rows * ROW_H + PAD * 2;
  const totalH = 42 + cards.reduce((s, c) => s + cardH(c.rows.length) + GAP, 0) + 28;
  let y = 42;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup vs High Availability vs Disaster Recovery comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Backup vs HA vs Disaster Recovery</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Three different protection layers — each addresses a different threat</text>

      {cards.map((c, ci) => {
        const h = cardH(c.rows.length);
        const gy = y;
        const el = (
          <g key={ci}>
            <rect x="10" y={gy} width="460" height={h} rx="7" fill={c.bg} stroke={c.border} strokeWidth="2"/>
            <rect x="10" y={gy} width="460" height={HEADER} rx="7" fill={c.border}/>
            <rect x="10" y={gy + HEADER - 5} width="460" height="5" fill={c.border}/>
            <text x="240" y={gy + HEADER - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{c.title}</text>
            {c.rows.map((r, ri) => (
              <g key={ri}>
                <text x="20" y={gy + HEADER + PAD + ri * ROW_H + 14}
                  fontSize="9.5" fontWeight="600" fill={c.border}>{r.label}:</text>
                <text x="100" y={gy + HEADER + PAD + ri * ROW_H + 14}
                  fontSize="9.5" fill={c.tc}>{r.val}</text>
              </g>
            ))}
          </g>
        );
        y += h + GAP;
        return el;
      })}

      <rect x="10" y={y} width="460" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={y + 14} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">
        HA ≠ DR · Backup ≠ DR · All three layers recommended for critical workloads
      </text>
    </svg>
  );
}
