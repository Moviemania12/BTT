"use client";
export default function EccFlow() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, t: string[], c: string, b: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={c} stroke={b} strokeWidth="2" />
      {t.map((l, i) => <text key={i} x={x + w / 2} y={y + h / 2 + (i - (t.length - 1) / 2) * 14 + 4} textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight={i === 0 ? 700 : 400} fill="#111827">{l}</text>)}
    </g>
  );
  const ar = (x1: number, y1: number, x2: number, y2: number, k: string) => <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" markerEnd="url(#ecA)" />;
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ECC memory flow: on write the memory controller adds check bits; on read it recomputes and compares, then passes, corrects a single-bit error, or flags an uncorrectable error" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="ecA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748b" /></marker></defs>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">How ECC Protects Memory — Write Path and Read Path</text>
      <text x="30" y="52" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">WRITE</text>
      {box(30, 62, 150, 52, ["CPU data", "64 bits"], "#eff6ff", "#2563eb", "w1")}
      {ar(180, 88, 220, 88, "a1")}
      {box(220, 62, 200, 52, ["Memory controller", "computes 8 check bits"], "#f0fdf4", "#16a34a", "w2")}
      {ar(420, 88, 460, 88, "a2")}
      {box(460, 62, 370, 52, ["Stored on DIMM: 64 data + 8 check = 72 bits", "(ECC DIMM has extra chip(s) for the check bits)"], "#fef3c7", "#f59e0b", "w3")}
      <text x="30" y="150" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">READ</text>
      {box(30, 160, 200, 52, ["72 bits from DIMM", "a bit may have flipped"], "#fef3c7", "#f59e0b", "r1")}
      {ar(230, 186, 270, 186, "a3")}
      {box(270, 160, 220, 52, ["Controller recomputes", "check bits and compares"], "#f0fdf4", "#16a34a", "r2")}
      {ar(490, 186, 530, 186, "a4")}
      {box(530, 160, 300, 52, ["Syndrome (difference)", "tells WHICH bit(s) are wrong"], "#f5f3ff", "#7c3aed", "r3")}
      {ar(680, 212, 150, 270, "a5")}{ar(680, 212, 430, 270, "a6")}{ar(680, 212, 710, 270, "a7")}
      {box(30, 270, 240, 70, ["No error", "Data passed to CPU as is"], "#dcfce7", "#16a34a", "o1")}
      {box(310, 270, 240, 70, ["Single-bit error (CE)", "Corrected on the fly, logged"], "#fef3c7", "#f59e0b", "o2")}
      {box(590, 270, 240, 70, ["Multi-bit error (UCE)", "Detected, not fixable → MCE"], "#fee2e2", "#dc2626", "o3")}
      {ar(430, 340, 430, 358, "a8")}
      <rect x="130" y="358" width="600" height="38" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="374" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#78350f">Rising CE counts on one DIMM = early warning. Replace on policy before a UCE.</text>
      <text x="430" y="389" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Stronger schemes (SDDC / chipkill / on-die ECC) survive a whole-chip failure — capability is platform dependent.</text>
    </svg>
  );
}
