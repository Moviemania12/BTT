"use client";
export default function CpuTurboCurve() {
  const f = "Arial,sans-serif";
  const X0 = 90, X1 = 780, Y0 = 330, Y1 = 70;
  const pts = [[0, 0.95], [0.12, 0.93], [0.3, 0.74], [0.6, 0.55], [1, 0.42]];
  const px = (t: number) => X0 + t * (X1 - X0);
  const py = (t: number) => Y0 - t * (Y0 - Y1);
  const path = pts.map((p, i) => `${i ? "L" : "M"}${px(p[0])},${py(p[1])}`).join(" ");
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chart showing CPU frequency falling as more cores are active, with base, all-core turbo and max turbo levels" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Turbo Boost — Why Frequency Drops as More Cores Become Active</text>
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#374151" strokeWidth="2" />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1 - 10} stroke="#374151" strokeWidth="2" />
      <text x="435" y="372" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#374151">Active cores (number of busy cores) →</text>
      <text x="30" y="200" transform="rotate(-90 30 200)" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#374151">Frequency (GHz) →</text>
      <text x={X0} y={Y0 + 16} textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#6b7280">1 core</text>
      <text x={X1} y={Y0 + 16} textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#6b7280">All cores</text>
      <rect x={X0} y={py(0.97)} width={X1 - X0} height={py(0.42) - py(0.97)} fill="#eff6ff" opacity="0.6" />
      <line x1={X0} y1={py(0.42)} x2={X1} y2={py(0.42)} stroke="#16a34a" strokeWidth="2" strokeDasharray="6 4" />
      <text x={X1 - 4} y={py(0.42) + 14} textAnchor="end" fontFamily={f} fontSize="10" fontWeight="700" fill="#166534">Base frequency (guaranteed, at rated TDP)</text>
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="3.5" />
      {pts.map((p, i) => <circle key={i} cx={px(p[0])} cy={py(p[1])} r="5" fill="#2563eb" />)}
      <rect x={px(0) + 14} y={py(0.95) - 6} width="190" height="38" rx="5" fill="#fff" stroke="#2563eb" />
      <text x={px(0) + 20} y={py(0.95) + 8} fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">Max single-core turbo</text>
      <text x={px(0) + 20} y={py(0.95) + 22} fontFamily={f} fontSize="9" fill="#374151">Light load, lots of thermal headroom</text>
      <rect x={px(0.5)} y={py(0.55) - 54} width="200" height="38" rx="5" fill="#fff" stroke="#f59e0b" />
      <text x={px(0.5) + 6} y={py(0.55) - 38} fontFamily={f} fontSize="10" fontWeight="700" fill="#92400e">Medium load turbo</text>
      <text x={px(0.5) + 6} y={py(0.55) - 24} fontFamily={f} fontSize="9" fill="#374151">Power budget shared across more cores</text>
      <rect x={px(0.62)} y={py(0.42) - 72} width="196" height="38" rx="5" fill="#fff" stroke="#7c3aed" />
      <text x={px(0.62) + 6} y={py(0.42) - 56} fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">All-core turbo</text>
      <text x={px(0.62) + 6} y={py(0.42) - 42} fontFamily={f} fontSize="9" fill="#374151">The realistic number for sustained heavy load</text>
      <text x="430" y="396" textAnchor="middle" fontFamily={f} fontSize="9" fill="#94a3b8">Illustrative curve — exact frequencies, turbo bins and power limits depend on the SKU, BIOS profile and cooling.</text>
    </svg>
  );
}
