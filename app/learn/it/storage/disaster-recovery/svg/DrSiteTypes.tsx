"use client";
// DR D3 — Hot vs Warm vs Cold DR Site Comparison
export default function DrSiteTypes() {
  const HEADER = 30;
  const ROW_H  = 20;
  const PAD    = 5;
  const GAP    = 8;

  const cards = [
    {
      title: "🔴 HOT SITE", border: "#dc2626", bg: "#fff5f5", tc: "#991b1b",
      rows: [
        { label: "Infrastructure", val: "Fully provisioned, always-on" },
        { label: "Data sync",      val: "Continuous (sync/near-sync replication)" },
        { label: "Activation",     val: "Minutes — traffic switch only" },
        { label: "RPO",            val: "Near-zero to minutes" },
        { label: "RTO",            val: "Minutes" },
        { label: "Cost",           val: "Highest — full duplicate infrastructure" },
        { label: "Use case",       val: "Core banking, real-time trading" },
      ],
    },
    {
      title: "🟡 WARM SITE", border: "#ca8a04", bg: "#fffbeb", tc: "#92400e",
      rows: [
        { label: "Infrastructure", val: "Partial — servers present, standby" },
        { label: "Data sync",      val: "Periodic / asynchronous replication" },
        { label: "Activation",     val: "Hours — power on, sync, start apps" },
        { label: "RPO",            val: "Minutes to hours" },
        { label: "RTO",            val: "Hours" },
        { label: "Cost",           val: "Medium" },
        { label: "Use case",       val: "E-commerce, ERP, healthcare" },
      ],
    },
    {
      title: "🔵 COLD SITE", border: "#2563eb", bg: "#eff6ff", tc: "#1e40af",
      rows: [
        { label: "Infrastructure", val: "Minimal — space, power, network only" },
        { label: "Data sync",      val: "Backup restore — no live replication" },
        { label: "Activation",     val: "Days — procure, deploy, restore" },
        { label: "RPO",            val: "Hours to days (last backup)" },
        { label: "RTO",            val: "Days" },
        { label: "Cost",           val: "Lowest" },
        { label: "Use case",       val: "Dev/test, low-criticality, high MTD" },
      ],
    },
  ];

  const cardH = (rows: number) => HEADER + rows * ROW_H + PAD * 2;
  const totalH = 44 + cards.reduce((s, c) => s + cardH(c.rows.length) + GAP, 0) + 28;
  let y = 44;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Hot warm cold DR site comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Hot vs Warm vs Cold DR Site</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9.5" fill="#6b7280">Right-size tier per application criticality from BIA</text>

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
                <text x="112" y={gy + HEADER + PAD + ri * ROW_H + 14}
                  fontSize="9.5" fill={c.tc}>{r.val}</text>
              </g>
            ))}
          </g>
        );
        y += h + GAP;
        return el;
      })}

      <rect x="10" y={y} width="460" height="22" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="240" y={y + 14} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#15803d">
        No universal DR site distance requirement — determine from risk scenarios and regulatory requirements
      </text>
    </svg>
  );
}
