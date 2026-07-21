"use client";
// D4 — 3-2-1 / 3-2-1-1-0 Strategy (compact number cards)
export default function Backup321Strategy() {
  const CARD_H = 50;
  const GAP    = 5;

  const items = [
    {
      num: "3", numColor: "#1e40af", bg: "#dbeafe", border: "#2563eb",
      title: "COPIES OF DATA",
      desc: "Production + 2 backup copies",
      note: "Original · Local backup · Offsite backup",
    },
    {
      num: "2", numColor: "#7c3aed", bg: "#ede9fe", border: "#7c3aed",
      title: "DIFFERENT MEDIA TYPES",
      desc: "e.g. Disk + Tape  or  Disk + Cloud",
      note: "Different failure modes — diversify",
    },
    {
      num: "1", numColor: "#15803d", bg: "#dcfce7", border: "#16a34a",
      title: "OFFSITE COPY",
      desc: "Different physical location",
      note: "Protects against site-level disaster",
    },
    {
      num: "+1", numColor: "#dc2626", bg: "#fee2e2", border: "#dc2626",
      title: "OFFLINE / IMMUTABLE / AIR-GAPPED",
      desc: "Tape vault · Object lock compliance · Air-gapped",
      note: "Ransomware cannot easily reach or delete",
      ext: true,
    },
    {
      num: "+0", numColor: "#15803d", bg: "#f0fdf4", border: "#16a34a",
      title: "ERRORS AFTER VERIFICATION",
      desc: "Verified by restore testing — NOT just job status",
      note: "SUCCESS ≠ RECOVERABLE — test to confirm",
      ext: true,
    },
  ];

  const totalH = 50 + items.length * (CARD_H + GAP) + 32 + 14;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="3-2-1 and 3-2-1-1-0 backup strategy"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="19" textAnchor="middle" fontSize="12" fontWeight="800" fill="#111827">3-2-1 → 3-2-1-1-0 Backup Strategy</text>
      <text x="240" y="33" textAnchor="middle" fontSize="9" fill="#6b7280">Strategy / guideline — not a formal ISO/NIST standard</text>

      {items.map((item, i) => {
        const y = 42 + i * (CARD_H + GAP) + (item.ext && i === 3 ? 14 : 0);
        const isFirst3Extension = item.ext && i === 3;
        return (
          <g key={i}>
            {isFirst3Extension && (
              <g>
                <line x1="10" y1={y - 10} x2="470" y2={y - 10} stroke="#ca8a04" strokeWidth="1.5"/>
                <text x="240" y={y - 1} textAnchor="middle" fontSize="8.5" fill="#ca8a04" fontWeight="700">3-2-1-1-0 Extension — Ransomware Resilience</text>
              </g>
            )}
            <rect x="10" y={y} width="460" height={CARD_H} rx="7" fill={item.bg} stroke={item.border} strokeWidth="2"/>
            {/* Number column */}
            <rect x="10" y={y} width="60" height={CARD_H} rx="7" fill={item.border}/>
            <rect x="60" y={y} width="6" height={CARD_H} fill={item.border}/>
            <text x="40" y={y + CARD_H / 2 + 11}
              textAnchor="middle" fontSize={item.num.length > 1 ? "18" : "24"} fontWeight="900" fill="#fff">{item.num}</text>
            {/* Content */}
            <text x="78" y={y + 14} fontSize="10" fontWeight="700" fill={item.numColor}>{item.title}</text>
            <text x="78" y={y + 26} fontSize="9.5" fill="#374151">{item.desc}</text>
            <text x="78" y={y + 40} fontSize="9" fill="#6b7280">{item.note}</text>
          </g>
        );
      })}

      <rect x="10" y={totalH - 28} width="460" height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={totalH - 13} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400e">
        +0 = verified by restore test in isolated environment — not assumed from job status
      </text>
    </svg>
  );
}
