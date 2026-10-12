"use client";
export default function DramCellArray() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DRAM cell with one transistor and one capacitor, arranged in a grid of rows and columns with row buffer and sense amplifiers, and the access steps activate, read or write, precharge" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="drA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">DRAM Inside — Cell, Row/Column Array and Access Steps</text>

      <rect x="30" y="46" width="230" height="200" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="1.5" />
      <text x="145" y="66" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">One DRAM cell (1 bit)</text>
      <line x1="60" y1="110" x2="130" y2="110" stroke="#2563eb" strokeWidth="2.5" />
      <text x="48" y="104" fontFamily={f} fontSize="9" fill="#1e40af">Bit line</text>
      <rect x="110" y="110" width="40" height="24" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="130" y="126" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#1e40af">Transistor</text>
      <line x1="130" y1="134" x2="130" y2="160" stroke="#222" strokeWidth="2" />
      <line x1="108" y1="160" x2="152" y2="160" stroke="#f97316" strokeWidth="3.5" />
      <line x1="108" y1="170" x2="152" y2="170" stroke="#f97316" strokeWidth="3.5" />
      <text x="170" y="170" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#c2410c">Capacitor</text>
      <line x1="130" y1="170" x2="130" y2="190" stroke="#222" strokeWidth="2" />
      <text x="130" y="204" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">charged = 1, empty = 0</text>
      <line x1="150" y1="122" x2="230" y2="122" stroke="#16a34a" strokeWidth="2.5" />
      <text x="235" y="114" fontFamily={f} fontSize="9" fill="#166534">Word</text>
      <text x="235" y="126" fontFamily={f} fontSize="9" fill="#166534">line</text>
      <text x="145" y="232" textAnchor="middle" fontFamily={f} fontSize="9" fill="#dc2626" fontWeight="700">Charge leaks → refresh needed</text>

      <rect x="290" y="46" width="270" height="200" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="1.5" />
      <text x="425" y="66" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">Bank = grid of cells</text>
      {[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (
        <rect key={r + "-" + c} x={316 + c * 36} y={78 + r * 22} width="30" height="17" rx="2" fill={r === 2 ? "#fef3c7" : "#dbeafe"} stroke={r === 2 ? "#f59e0b" : "#2563eb"} />
      )))}
      <text x="300" y="136" fontFamily={f} fontSize="8" fill="#92400e">Row</text>
      <rect x="316" y="198" width="210" height="18" rx="3" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="421" y="211" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#c2410c">Row buffer (sense amplifiers)</text>
      <text x="425" y="236" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">Whole row is read here first, then column picked</text>

      <rect x="590" y="46" width="240" height="200" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="1.5" />
      <text x="710" y="66" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">Hierarchy on a DIMM</text>
      <text x="710" y="94" textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">DIMM → Rank(s)</text>
      <text x="710" y="114" textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">Rank → many DRAM chips</text>
      <text x="710" y="134" textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">Chip → bank groups → banks</text>
      <text x="710" y="154" textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">Bank → rows × columns</text>
      <text x="710" y="174" textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">Row/column → cells</text>
      <text x="710" y="206" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Different banks work in parallel</text>
      <text x="710" y="222" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">— hides some latency</text>

      <text x="30" y="276" fontFamily={f} fontSize="12" fontWeight="700" fill="#111827">Access steps (this is what timing numbers measure)</text>
      {[
        ["1. ACTIVATE", "Open one row → copy it to row buffer", "tRCD", "#eff6ff", "#2563eb"],
        ["2. READ / WRITE", "Pick column from row buffer, move data", "CL", "#f0fdf4", "#16a34a"],
        ["3. PRECHARGE", "Write row back, close it, ready for next row", "tRP", "#fff7ed", "#f97316"],
      ].map((s, i) => (
        <g key={i}>
          <rect x={30 + i * 270} y="290" width="250" height="64" rx="8" fill={s[3]} stroke={s[4]} strokeWidth="2" />
          <text x={155 + i * 270} y="312" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">{s[0]}</text>
          <text x={155 + i * 270} y="330" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">{s[1]}</text>
          <text x={155 + i * 270} y="346" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill={s[4]}>Delay: {s[2]}</text>
          {i < 2 && <line x1={282 + i * 270} y1="322" x2={298 + i * 270} y2="322" stroke="#64748b" strokeWidth="2" markerEnd="url(#drA)" />}
        </g>
      ))}
      <text x="430" y="382" textAnchor="middle" fontFamily={f} fontSize="9" fill="#94a3b8">Simplified. Real DRAM has bank groups, refresh commands and many more timing parameters.</text>
    </svg>
  );
}
