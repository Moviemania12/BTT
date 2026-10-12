"use client";
export default function MemoryTroubleshootFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, t: string[], c: string, b: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={c} stroke={b} strokeWidth="2" />
      {t.map((l, i) => <text key={i} x={x + w / 2} y={y + h / 2 + (i - (t.length - 1) / 2) * 13 + 4} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight={i === 0 ? 700 : 400} fill="#111827">{l}</text>)}
    </g>
  );
  const ar = (x1: number, y1: number, x2: number, y2: number, k: string) => <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" markerEnd="url(#mtA)" />;
  return (
    <svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Memory troubleshooting flow: classify symptom as no POST, missing capacity, correctable errors, uncorrectable crash or slow performance, then check logs, reseat, isolate DIMM or slot, and verify" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="mtA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="480" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Memory Fault Isolation Flow</text>
      {box(300, 42, 260, 38, ["Memory-related alert / symptom"], "#fef2f2", "#dc2626", "a")}
      {ar(430, 80, 430, 98, "a0")}
      {box(260, 98, 340, 42, ["1. Read BMC SEL + POST code first", "Which slot? CE or UCE? Save logs before clearing"], "#eff6ff", "#2563eb", "b")}
      {ar(300, 140, 90, 176, "a1")}{ar(380, 140, 270, 176, "a2")}{ar(480, 140, 520, 176, "a3")}{ar(560, 140, 760, 176, "a4")}
      {box(10, 176, 160, 66, ["No POST / memory error", "Reseat → minimum config", "1 DIMM/channel, test one by one"], "#fef3c7", "#f59e0b", "c1")}
      {box(190, 176, 160, 66, ["Less RAM than installed", "Check slot population", "dmidecode vs BIOS map"], "#f0fdf4", "#16a34a", "c2")}
      {box(430, 176, 180, 66, ["Rising correctable errors", "Same DIMM? Trend it", "Plan replacement on policy"], "#f5f3ff", "#7c3aed", "c3")}
      {box(630, 176, 220, 66, ["UCE / crash / reboot", "Replace failing DIMM now", "Recurs? → slot or CPU channel"], "#fee2e2", "#dc2626", "c4")}
      {ar(90, 242, 380, 290, "d1")}{ar(270, 242, 400, 290, "d2")}{ar(520, 242, 440, 290, "d3")}{ar(740, 242, 480, 290, "d4")}
      {box(250, 290, 360, 50, ["2. Isolate: swap DIMM ↔ known-good slot", "Error follows the DIMM or stays with the slot?"], "#fff7ed", "#f97316", "e")}
      {ar(430, 340, 430, 360, "e0")}
      {box(250, 360, 360, 46, ["3. Follows DIMM → replace DIMM", "Stays with slot → inspect socket/CPU, escalate to OEM"], "#eff6ff", "#2563eb", "f")}
      {ar(430, 406, 430, 426, "f0")}
      {box(250, 426, 360, 44, ["4. Run memory test + monitor CE trend", "Record in ticket, update asset data"], "#dcfce7", "#16a34a", "g")}
    </svg>
  );
}
