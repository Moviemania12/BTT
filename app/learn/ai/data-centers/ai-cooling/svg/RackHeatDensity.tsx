"use client";
export default function RackHeatDensity() {
  const racks = [
    { label: "Traditional\nEnterprise", kw: 15, color: "#16a34a", desc: "Mix of 1U servers\n~10–20 kW typical" },
    { label: "High-Perf\nCompute", kw: 28, color: "#ca8a04", desc: "Dense CPU/storage\n~20–30 kW range" },
    { label: "AI GPU Rack\n(DGX H100 class)", kw: 55, color: "#dc2626", desc: "4× DGX H100 servers\n~40–60 kW range" },
    { label: "Latest Gen AI\n(GB200 NVL72)", kw: 120, color: "#7c3aed", desc: "Rack-scale NVLink\n100+ kW possible" },
  ];
  const maxKw = 130;
  const barMaxH = 160;
  const baseY = 220;
  const airLimit = 28;
  const airLimitY = baseY - (airLimit / maxKw) * barMaxH;

  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rhd-title">
      <title id="rhd-title">AI Rack Heat Density Comparison: Traditional enterprise approximately 10-20 kW. High-performance compute approximately 20-30 kW. AI GPU rack with DGX H100 class approximately 40-60 kW. Latest generation AI GPU rack (GB200 NVL72) 100+ kW possible. Air cooling becomes insufficient at higher densities — exact limit depends on facility design.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">RACK HEAT DENSITY — AI vs Traditional</text>
      <text x="410" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Higher density = more cooling required. Values are illustrative ranges — actual power depends on hardware, configuration and workload.</text>

      {racks.map((r, i) => {
        const barH = (r.kw / maxKw) * barMaxH;
        const x = 80 + i * 175;
        const barY = baseY - barH;
        return (
          <g key={r.label}>
            <rect x={x} y={barY} width={120} height={barH} rx="4" fill={r.color} opacity="0.9" />
            <text x={x + 60} y={barY - 8} fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={r.color} textAnchor="middle">~{r.kw} kW</text>
            {r.label.split("\n").map((line, li) => (
              <text key={li} x={x + 60} y={235 + li * 13} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#374151" textAnchor="middle">{line}</text>
            ))}
            {r.desc.split("\n").map((line, li) => (
              <text key={li} x={x + 60} y={263 + li * 11} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280" textAnchor="middle">{line}</text>
            ))}
          </g>
        );
      })}

      <line x1="60" y1={airLimitY} x2="760" y2={airLimitY} stroke="#0891b2" strokeWidth="1.5" strokeDasharray="6,3" />
      <text x="65" y={airLimitY - 4} fontFamily="Arial,sans-serif" fontSize="8" fill="#0891b2" fontWeight="700">Air cooling practical limit (facility-dependent — ~25–30 kW typical)</text>
      <line x1="60" y1={baseY} x2="760" y2={baseY} stroke="#e2e8f0" strokeWidth="1" />
    </svg>
  );
}
