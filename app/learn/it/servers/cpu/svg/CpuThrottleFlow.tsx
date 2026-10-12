"use client";
export default function CpuThrottleFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, t: string[], c: string, b: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={c} stroke={b} strokeWidth="2" />
      {t.map((l, i) => <text key={i} x={x + w / 2} y={y + h / 2 + (i - (t.length - 1) / 2) * 13 + 4} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight={i === 0 ? 700 : 400} fill="#111827">{l}</text>)}
    </g>
  );
  const ar = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" markerEnd="url(#thA)" />;
  return (
    <svg viewBox="0 0 860 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Troubleshooting flow for slow server or high CPU: check utilisation, frequency, temperature, hardware errors, BIOS profile and workload placement" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="thA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="470" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">"Server Is Slow" — CPU Troubleshooting Flow</text>
      {box(300, 42, 260, 40, ["Alert: slow app / high CPU"], "#fef2f2", "#dc2626", "a")}
      {ar(430, 82, 430, 102)}
      {box(270, 102, 320, 46, ["1. Check utilisation + run queue", "top / vmstat / %RDY — who is consuming?"], "#eff6ff", "#2563eb", "b")}
      {ar(300, 148, 150, 186)}{ar(430, 148, 430, 186)}{ar(560, 148, 710, 186)}
      {box(30, 186, 240, 62, ["One process at 100%", "Software / runaway job", "→ app team, profiling"], "#fef3c7", "#f59e0b", "c")}
      {box(310, 186, 240, 62, ["Util low but slow", "2. Check frequency + throttle", "turbostat / BMC thermal"], "#f5f3ff", "#7c3aed", "d")}
      {box(590, 186, 240, 62, ["Util high on all cores", "Capacity / VM overcommit", "→ rebalance, scale"], "#f0fdf4", "#16a34a", "e")}
      {ar(430, 248, 430, 276)}
      {box(270, 276, 320, 46, ["3. Low frequency? High temp?", "Fans, airflow, heatsink, paste, inlet temp"], "#fff7ed", "#f97316", "f")}
      {ar(430, 322, 430, 346)}
      {box(270, 346, 320, 46, ["4. BIOS profile / power cap / MCE log", "Power-saver profile? Corrected errors?"], "#fef2f2", "#dc2626", "g")}
      {ar(430, 392, 430, 414)}
      {box(270, 414, 320, 40, ["5. NUMA placement + fix + record"], "#dcfce7", "#16a34a", "h")}
    </svg>
  );
}
