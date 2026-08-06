"use client";
export default function CerebrasDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cb-title">
      <title id="cb-title">Cerebras WSE-3: Instead of cutting the semiconductor wafer into small chips, Cerebras uses the entire wafer as one giant chip. WSE-3 has 900,000 AI cores and 44 GB on-chip SRAM. No inter-chip communication needed — all cores on one die. Analogy: normal GPU is an apartment, WSE is an entire building.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CEREBRAS WSE — Using The Entire Wafer as One Giant Chip</text>

      {/* Normal wafer cut */}
      <rect x="20" y="36" width="360" height="250" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="200" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">Normal Chip Approach</text>
      <text x="200" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Wafer is cut into many small chips</text>
      <circle cx="200" cy="172" r="100" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {Array.from({ length: 49 }).map((_, i) => {
        const col = i % 7 - 3, row = Math.floor(i / 7) - 3;
        const x = 200 + col * 26, y = 172 + row * 26;
        const dist = Math.sqrt(col * col + row * row);
        if (dist > 3.2) return null;
        return (
          <g key={i}>
            <rect x={x - 11} y={y - 11} width="22" height="22" rx="2" fill="#94a3b8" stroke="#f8fafc" strokeWidth="1" />
            <text x={x} y={y + 4} fontFamily="Arial,sans-serif" fontSize="5" fill="#fff" textAnchor="middle">chip</text>
          </g>
        );
      })}
      <text x="200" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">Many small chips → chip-to-chip comm needed</text>

      {/* WSE */}
      <rect x="400" y="36" width="400" height="250" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="600" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">Cerebras WSE-3 Approach</text>
      <text x="600" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Entire wafer = one chip — no cuts</text>

      <circle cx="600" cy="165" r="110" fill="#7c3aed" stroke="#4c1d95" strokeWidth="2" />
      {Array.from({ length: 196 }).map((_, i) => {
        const col = i % 14 - 7, row = Math.floor(i / 14) - 7;
        const x = 600 + col * 14, y = 165 + row * 14;
        const dist = Math.sqrt((col * col + row * row));
        if (dist > 7.2) return null;
        return <rect key={i} x={x - 5} y={y - 5} width="10" height="10" rx="1" fill="#c4b5fd" opacity="0.8" />;
      })}
      <text x="600" y="163" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">900,000</text>
      <text x="600" y="177" fontFamily="Arial,sans-serif" fontSize="8" fill="#ede9fe" textAnchor="middle">AI Cores</text>
      <text x="600" y="191" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">44 GB SRAM on-chip</text>

      <text x="600" y="288" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#4c1d95" textAnchor="middle">One chip — no inter-chip comm bottleneck</text>

      {/* Stats box */}
      <rect x="410" y="42" width="124" height="60" rx="6" fill="#ede9fe" />
      <text x="472" y="60" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">WSE-3 Stats</text>
      {["900K AI cores", "44 GB SRAM", "125 PFLOPS BF16", "46,225 mm² die"].map((s, i) => (
        <text key={s} x="472" y={73 + i * 11} fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">{s}</text>
      ))}
    </svg>
  );
}
