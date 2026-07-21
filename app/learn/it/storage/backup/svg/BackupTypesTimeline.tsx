"use client";
// D3 — Backup Types Timeline (mobile-first vertical rows)
export default function BackupTypesTimeline() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const rowTypes = [
    {
      label: "FULL ONLY",
      sublabel: "Max storage · Fastest restore · No chain risk",
      labelColor: "#1e40af",
      blocks: days.map(() => ({ text: "FULL", bg: "#1e40af", fg: "#fff" })),
    },
    {
      label: "FULL + INCREMENTAL",
      sublabel: "Min storage · Slowest restore · Chain break = restore fails",
      labelColor: "#15803d",
      blocks: [
        { text: "FULL", bg: "#1e40af", fg: "#fff" },
        { text: "INCR", bg: "#4ade80", fg: "#166534" },
        { text: "INCR", bg: "#4ade80", fg: "#166534" },
        { text: "INCR", bg: "#4ade80", fg: "#166534" },
        { text: "INCR", bg: "#4ade80", fg: "#166534" },
        { text: "INCR", bg: "#4ade80", fg: "#166534" },
        { text: "FULL", bg: "#1e40af", fg: "#fff" },
      ],
    },
    {
      label: "FULL + DIFFERENTIAL",
      sublabel: "Medium storage · 2-set restore (Full + latest Diff)",
      labelColor: "#c2410c",
      blocks: [
        { text: "FULL", bg: "#1e40af", fg: "#fff" },
        { text: "DIFF", bg: "#f97316", fg: "#fff" },
        { text: "DIFF▲", bg: "#ea580c", fg: "#fff" },
        { text: "DIFF▲", bg: "#dc2626", fg: "#fff" },
        { text: "DIFF▲", bg: "#b91c1c", fg: "#fff" },
        { text: "DIFF▲", bg: "#991b1b", fg: "#fff" },
        { text: "FULL", bg: "#1e40af", fg: "#fff" },
      ],
    },
    {
      label: "INCREMENTAL FOREVER *",
      sublabel: "One-time full · All subsequent incrementals",
      labelColor: "#7c3aed",
      blocks: [
        { text: "FULL", bg: "#1e40af", fg: "#fff" },
        { text: "INCR", bg: "#a78bfa", fg: "#4c1d95" },
        { text: "INCR", bg: "#a78bfa", fg: "#4c1d95" },
        { text: "INCR", bg: "#a78bfa", fg: "#4c1d95" },
        { text: "SYNTH*", bg: "#7c3aed", fg: "#fff" },
        { text: "INCR", bg: "#a78bfa", fg: "#4c1d95" },
        { text: "INCR", bg: "#a78bfa", fg: "#4c1d95" },
      ],
    },
  ];

  const rowH = 130;
  const headerH = 44;
  const totalH = headerH + rowTypes.length * rowH + 60;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Backup types timeline comparison"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="12"/>
      <text x="240" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="#111827">Backup Types — Weekly Timeline</text>
      <text x="240" y="38" textAnchor="middle" fontSize="10" fill="#6b7280">Mon–Sun backup schedule comparison</text>

      {rowTypes.map((row, ri) => {
        const ry = headerH + ri * rowH;
        const blockW = Math.floor(440 / 7);
        const blockH = 32;
        return (
          <g key={ri}>
            {/* Row bg */}
            <rect x="10" y={ry + 4} width="460" height={rowH - 8} rx="8"
              fill={ri % 2 === 0 ? "#fff" : "#f1f5f9"} stroke="#e2e8f0" strokeWidth="1"/>
            {/* Row label */}
            <text x="20" y={ry + 22} fontSize="12" fontWeight="700" fill={row.labelColor}>{row.label}</text>
            <text x="20" y={ry + 36} fontSize="10" fill="#6b7280">{row.sublabel}</text>
            {/* Day labels */}
            {days.map((d, di) => (
              <text key={di} x={20 + di * blockW + blockW / 2} y={ry + 52}
                textAnchor="middle" fontSize="9.5" fill="#374151" fontWeight="600">{d}</text>
            ))}
            {/* Blocks */}
            {row.blocks.map((b, bi) => (
              <g key={bi}>
                <rect x={20 + bi * blockW} y={ry + 56} width={blockW - 4} height={blockH}
                  rx="4" fill={b.bg}/>
                <text x={20 + bi * blockW + (blockW - 4) / 2} y={ry + 56 + blockH / 2 + 5}
                  textAnchor="middle" fontSize="10" fontWeight="700" fill={b.fg}>{b.text}</text>
              </g>
            ))}
            {/* Chain warning for incremental */}
            {ri === 1 && (
              <text x="240" y={ry + 103} textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">
                ⚠ Chain broken? → All subsequent restores FAIL
              </text>
            )}
            {ri === 3 && (
              <text x="240" y={ry + 103} textAnchor="middle" fontSize="9.5" fill="#7c3aed">
                * SYNTH = Synthetic Full — product-dependent implementation
              </text>
            )}
          </g>
        );
      })}

      {/* Disclaimer */}
      <rect x="10" y={headerH + rowTypes.length * rowH + 2} width="460" height="46" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1"/>
      <text x="240" y={headerH + rowTypes.length * rowH + 18} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#5b21b6">
        Incremental Forever &amp; Synthetic Full: behavior is product-dependent.
      </text>
      <text x="240" y={headerH + rowTypes.length * rowH + 34} textAnchor="middle" fontSize="10" fill="#5b21b6">
        Chain depth limits and restore time vary by backup platform.
      </text>
    </svg>
  );
}
