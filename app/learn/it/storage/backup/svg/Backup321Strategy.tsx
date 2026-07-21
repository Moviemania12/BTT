"use client";
// D4 — 3-2-1 / 3-2-1-1-0 Backup Strategy (mobile-first large number cards)
export default function Backup321Strategy() {
  const items = [
    {
      num: "3", numColor: "#1e40af", bg: "#dbeafe", border: "#2563eb",
      title: "COPIES OF DATA",
      desc: "Production + 2 backup copies",
      note: "Original data · Local backup · Offsite backup",
    },
    {
      num: "2", numColor: "#7c3aed", bg: "#ede9fe", border: "#7c3aed",
      title: "DIFFERENT MEDIA TYPES",
      desc: "e.g. Disk + Tape  or  Disk + Cloud",
      note: "Different failure modes — diversify storage type",
    },
    {
      num: "1", numColor: "#15803d", bg: "#dcfce7", border: "#16a34a",
      title: "OFFSITE COPY",
      desc: "At a different physical location",
      note: "Protects against site-level disaster",
    },
    {
      num: "+1", numColor: "#dc2626", bg: "#fee2e2", border: "#dc2626",
      title: "OFFLINE / IMMUTABLE / AIR-GAPPED",
      desc: "Tape vault · Object lock (compliance) · Air-gapped",
      note: "Ransomware cannot easily reach or delete this copy",
    },
    {
      num: "+0", numColor: "#15803d", bg: "#f0fdf4", border: "#16a34a",
      title: "ERRORS AFTER VERIFICATION",
      desc: "Zero errors confirmed by testing — NOT just job status",
      note: "Periodic restore test in isolated environment required",
    },
  ];

  const cardH = 96;
  const gap = 12;
  const totalH = 60 + items.length * (cardH + gap) + 56;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="3-2-1 and 3-2-1-1-0 backup strategy"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>
      <text x="240" y="24" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111827">3-2-1 → 3-2-1-1-0</text>
      <text x="240" y="42" textAnchor="middle" fontSize="11" fill="#6b7280">Backup strategy / guideline — not a formal ISO/NIST standard</text>

      {items.map((item, i) => {
        const y = 54 + i * (cardH + gap);
        const isExtension = item.num.startsWith("+");
        return (
          <g key={i}>
            {isExtension && i === 3 && (
              <rect x="10" y={y - 8} width="460" height="2" rx="1" fill="#ca8a04"/>
            )}
            {isExtension && i === 3 && (
              <text x="240" y={y + 4} textAnchor="middle" fontSize="10" fill="#ca8a04" fontWeight="700">3-2-1-1-0 Extension (Ransomware resilience)</text>
            )}
            <rect x="10" y={isExtension ? y + 10 : y} width="460" height={cardH} rx="8"
              fill={item.bg} stroke={item.border} strokeWidth="2"/>
            {/* Big number */}
            <rect x="10" y={isExtension ? y + 10 : y} width="72" height={cardH} rx="8" fill={item.border}/>
            <rect x="72" y={isExtension ? y + 10 : y} width="8" height={cardH} fill={item.border}/>
            <text x="46" y={(isExtension ? y + 10 : y) + cardH / 2 + 14}
              textAnchor="middle" fontSize={item.num.length > 1 ? "28" : "38"} fontWeight="900" fill="#fff">{item.num}</text>
            {/* Content */}
            <text x="92" y={(isExtension ? y + 10 : y) + 24}
              fontSize="13" fontWeight="700" fill={item.numColor}>{item.title}</text>
            <text x="92" y={(isExtension ? y + 10 : y) + 44}
              fontSize="12" fill="#374151">{item.desc}</text>
            <text x="92" y={(isExtension ? y + 10 : y) + 63}
              fontSize="11" fill="#6b7280">{item.note}</text>
          </g>
        );
      })}

      {/* Footer */}
      <rect x="10" y={totalH - 44} width="460" height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y={totalH - 27} textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">
        +0 means VERIFIED by restore test — not assumed from job status
      </text>
      <text x="240" y={totalH - 12} textAnchor="middle" fontSize="10" fill="#92400e">
        SUCCESS ≠ RECOVERABLE — test to confirm
      </text>
    </svg>
  );
}
