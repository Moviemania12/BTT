"use client";
export default function CpuSelectionFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, t: string[], c: string, b: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={c} stroke={b} strokeWidth="2" />
      {t.map((l, i) => <text key={i} x={x + w / 2} y={y + h / 2 + (i - (t.length - 1) / 2) * 14 + 4} textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight={i === 0 ? 700 : 400} fill="#111827">{l}</text>)}
    </g>
  );
  const ar = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" markerEnd="url(#selA)" />;
  return (
    <svg viewBox="0 0 860 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision flow for choosing a server CPU based on workload bottleneck, licensing, memory and power" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="selA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="470" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">CPU Selection Flow — From Workload to SKU</text>
      {box(300, 44, 260, 46, ["1. What is the workload?", "Measure — do not guess"], "#eff6ff", "#2563eb", "a")}
      {ar(430, 90, 430, 112)}
      {box(300, 112, 260, 46, ["2. Where is the bottleneck?", "CPU / RAM-BW / I/O / GPU"], "#f0fdf4", "#16a34a", "b")}
      {ar(300, 135, 190, 188)}{ar(430, 158, 430, 188)}{ar(560, 135, 670, 188)}
      {box(60, 188, 260, 58, ["Needs per-core speed", "DB, ERP, low-latency", "→ high clock, fewer cores, big cache"], "#fef3c7", "#f59e0b", "c")}
      {box(330, 188, 200, 58, ["Throughput / density", "VMs, containers, web", "→ high core count"], "#eff6ff", "#2563eb", "d")}
      {box(540, 188, 260, 58, ["Memory BW / I/O heavy", "HPC, analytics, storage", "→ more channels + PCIe lanes"], "#f5f3ff", "#7c3aed", "e")}
      {ar(190, 246, 430, 280)}{ar(430, 246, 430, 280)}{ar(670, 246, 430, 280)}
      {box(260, 280, 340, 50, ["3. Check constraints", "Per-core licence? · RAM size? · NIC/GPU lanes?"], "#fff7ed", "#f97316", "f")}
      {ar(430, 330, 430, 354)}
      {box(260, 354, 340, 50, ["4. Power + cooling fit", "TDP × servers per rack ≤ rack kW & airflow"], "#fef2f2", "#dc2626", "g")}
      {ar(430, 404, 430, 424)}
      {box(300, 424, 260, 36, ["5. Pilot test → standardise SKU"], "#dcfce7", "#16a34a", "h")}
    </svg>
  );
}
