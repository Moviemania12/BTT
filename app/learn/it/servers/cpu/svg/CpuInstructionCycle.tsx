"use client";
export default function CpuInstructionCycle() {
  const f = "Arial,sans-serif";
  const stages = [
    { n: "FETCH", d: "Read next instruction\nfrom cache/memory", c: "#eff6ff", b: "#2563eb" },
    { n: "DECODE", d: "Break instruction\ninto micro-ops", c: "#f0fdf4", b: "#16a34a" },
    { n: "EXECUTE", d: "ALU / FPU / vector\nunit does the work", c: "#fef3c7", b: "#f59e0b" },
    { n: "MEMORY", d: "Data load/store\n(cache → RAM)", c: "#fff7ed", b: "#f97316" },
    { n: "WRITE-BACK", d: "Save result to\nregister", c: "#f5f3ff", b: "#7c3aed" },
  ];
  const lanes = [
    { y: 238, label: "Instruction 1", off: 0 },
    { y: 270, label: "Instruction 2", off: 1 },
    { y: 302, label: "Instruction 3", off: 2 },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPU instruction cycle with five stages and a pipeline showing three instructions overlapping in time" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="cicA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Instruction Cycle and Pipeline — Journey of One Instruction</text>
      <text x="430" y="46" textAnchor="middle" fontFamily={f} fontSize="10" fill="#6b7280">Top: the 5 stages of one instruction · Bottom: a pipeline overlaps several instructions in different stages</text>
      {stages.map((s, i) => {
        const x = 30 + i * 164;
        const lines = s.d.split("\n");
        return (
          <g key={i}>
            <rect x={x} y="64" width="140" height="84" rx="8" fill={s.c} stroke={s.b} strokeWidth="2" />
            <text x={x + 70} y="90" textAnchor="middle" fontFamily={f} fontSize="12.5" fontWeight="700" fill="#111827">{i + 1}. {s.n}</text>
            {lines.map((l, j) => <text key={j} x={x + 70} y={110 + j * 15} textAnchor="middle" fontFamily={f} fontSize="10" fill="#374151">{l}</text>)}
            {i < 4 && <line x1={x + 142} y1="106" x2={x + 162} y2="106" stroke="#64748b" strokeWidth="2" markerEnd="url(#cicA)" />}
          </g>
        );
      })}
      <rect x="30" y="164" width="800" height="26" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="430" y="182" textAnchor="middle" fontFamily={f} fontSize="10.5" fill="#374151">Branch predictor guesses the path ahead · Out-of-order engine runs ready instructions first</text>

      <text x="30" y="216" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">Pipeline — time (clock cycles) →</text>
      {[0, 1, 2, 3, 4, 5, 6].map((c) => (
        <text key={c} x={140 + c * 100 + 45} y="230" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">cycle {c + 1}</text>
      ))}
      {lanes.map((l, li) => (
        <g key={li}>
          <text x="30" y={l.y + 17} fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{l.label}</text>
          {stages.map((s, si) => (
            <g key={si}>
              <rect x={140 + (si + l.off) * 100} y={l.y} width="90" height="24" rx="4" fill={s.c} stroke={s.b} strokeWidth="1.5" />
              <text x={140 + (si + l.off) * 100 + 45} y={l.y + 16} textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#111827">{["F", "D", "E", "M", "W"][si]}</text>
            </g>
          ))}
        </g>
      ))}
      <rect x="30" y="340" width="800" height="44" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="358" textAnchor="middle" fontFamily={f} fontSize="10.5" fill="#78350f">In cycle 3: Instr 1 EXECUTE, Instr 2 DECODE, Instr 3 FETCH — all at once. This raises throughput.</text>
      <text x="430" y="374" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Simplified view — real CPUs have 14–20+ stage pipelines, superscalar issue and micro-op caches. Stage count varies by architecture.</text>
    </svg>
  );
}
