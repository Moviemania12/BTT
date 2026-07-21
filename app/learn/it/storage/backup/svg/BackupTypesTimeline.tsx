"use client";
// D3 — Backup Types Timeline (compact vertical rows)
export default function BackupTypesTimeline() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const HEAD_H = 24;
  const BLOCK_H = 18;
  const NOTE_H  = 12;
  const ROW_H   = HEAD_H + BLOCK_H + NOTE_H + 16; // label + day-labels + blocks + note + padding

  const rows = [
    {
      label: "FULL ONLY", lc: "#1e40af",
      sub: "Max storage · Fastest restore · No chain risk",
      blocks: days.map(() => ({ t: "FULL", bg: "#1e40af", fg: "#fff" })),
      note: "",
    },
    {
      label: "FULL + INCREMENTAL", lc: "#15803d",
      sub: "Min storage · Restore requires full chain",
      blocks: [
        { t:"FULL", bg:"#1e40af", fg:"#fff" },
        { t:"INCR", bg:"#4ade80", fg:"#166534" },
        { t:"INCR", bg:"#4ade80", fg:"#166534" },
        { t:"INCR", bg:"#4ade80", fg:"#166534" },
        { t:"INCR", bg:"#4ade80", fg:"#166534" },
        { t:"INCR", bg:"#4ade80", fg:"#166534" },
        { t:"FULL", bg:"#1e40af", fg:"#fff" },
      ],
      note: "⚠ Chain broken → subsequent restores FAIL",
    },
    {
      label: "FULL + DIFFERENTIAL", lc: "#c2410c",
      sub: "Grows daily · Restore = Full + latest Diff (2 sets)",
      blocks: [
        { t:"FULL", bg:"#1e40af", fg:"#fff" },
        { t:"DIFF", bg:"#f97316", fg:"#fff" },
        { t:"DIFF▲", bg:"#ea580c", fg:"#fff" },
        { t:"DIFF▲", bg:"#dc2626", fg:"#fff" },
        { t:"DIFF▲", bg:"#b91c1c", fg:"#fff" },
        { t:"DIFF▲", bg:"#991b1b", fg:"#fff" },
        { t:"FULL", bg:"#1e40af", fg:"#fff" },
      ],
      note: "Only Full + latest Diff needed for restore",
    },
    {
      label: "INCREMENTAL FOREVER *", lc: "#7c3aed",
      sub: "One-time full · Synthetic fulls created by platform *",
      blocks: [
        { t:"FULL", bg:"#1e40af", fg:"#fff" },
        { t:"INCR", bg:"#a78bfa", fg:"#4c1d95" },
        { t:"INCR", bg:"#a78bfa", fg:"#4c1d95" },
        { t:"SYNTH", bg:"#7c3aed", fg:"#fff" },
        { t:"INCR", bg:"#a78bfa", fg:"#4c1d95" },
        { t:"INCR", bg:"#a78bfa", fg:"#4c1d95" },
        { t:"INCR", bg:"#a78bfa", fg:"#4c1d95" },
      ],
      note: "* Product-dependent — chain depth limits vary",
    },
  ];

  const totalH = 42 + rows.length * (ROW_H + 4) + 36;
  const BW = Math.floor(436 / 7); // block width per day

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup types weekly timeline comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>
      <text x="240" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Backup Types — Weekly Timeline</text>
      <text x="240" y="32" textAnchor="middle" fontSize="9" fill="#6b7280">Mon–Sun schedule comparison</text>

      {rows.map((row, ri) => {
        const ry = 40 + ri * (ROW_H + 4);
        return (
          <g key={ri}>
            <rect x="10" y={ry} width="460" height={ROW_H} rx="6"
              fill={ri % 2 === 0 ? "#fff" : "#f1f5f9"} stroke="#e2e8f0" strokeWidth="1"/>
            {/* Label + sub */}
            <text x="18" y={ry + 13} fontSize="10" fontWeight="700" fill={row.lc}>{row.label}</text>
            <text x="18" y={ry + 25} fontSize="8.5" fill="#6b7280">{row.sub}</text>
            {/* Day headers */}
            {days.map((d, di) => (
              <text key={di} x={22 + di * BW + BW / 2} y={ry + 37}
                textAnchor="middle" fontSize="8" fill="#374151" fontWeight="600">{d}</text>
            ))}
            {/* Blocks */}
            {row.blocks.map((b, bi) => (
              <g key={bi}>
                <rect x={22 + bi * BW} y={ry + 40} width={BW - 3} height={BLOCK_H} rx="3" fill={b.bg}/>
                <text x={22 + bi * BW + (BW - 3) / 2} y={ry + 40 + BLOCK_H / 2 + 4}
                  textAnchor="middle" fontSize="7.5" fontWeight="700" fill={b.fg}>{b.t}</text>
              </g>
            ))}
            {/* Note */}
            {row.note && (
              <text x="240" y={ry + 40 + BLOCK_H + 14} textAnchor="middle"
                fontSize="8.5" fill={ri === 1 ? "#dc2626" : "#7c3aed"} fontWeight="600">{row.note}</text>
            )}
          </g>
        );
      })}

      <rect x="10" y={totalH - 32} width="460" height="26" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y={totalH - 16} textAnchor="middle" fontSize="9" fontWeight="600" fill="#5b21b6">
        Incremental Forever &amp; Synthetic Full behavior is product-dependent
      </text>
    </svg>
  );
}
