"use client";
export default function AiAcceleratorDcPower() {
  const chips = [
    { name: "CPU (Xeon)", power: "300W", rack: "3 kW", cool: "Air", color: "#2563eb", barW: 30 },
    { name: "GPU H100 (8×)", power: "700W×8", rack: "~10 kW", cool: "Liquid rec.", color: "#16a34a", barW: 100 },
    { name: "GPU H100 (8×) HGX", power: "700W×8", rack: "~10 kW", cool: "Liquid DLC", color: "#15803d", barW: 100 },
    { name: "TPU v4 board (4×)", power: "~200W×4", rack: "~40–100 kW", cool: "Liquid DLC", color: "#7c3aed", barW: 200 },
    { name: "AWS Trainium Trn1", power: "~400W chip", rack: "~7 kW server", cool: "Air/Liq.", color: "#f97316", barW: 70 },
    { name: "Cerebras WSE-3", power: "~23 kW", rack: "Dedicated 23kW", cool: "Liquid req.", color: "#dc2626", barW: 230 },
    { name: "NPU (Apple M3)", power: "<5W", rack: "N/A (laptop)", cool: "Passive", color: "#94a3b8", barW: 5 },
  ];
  return (
    <svg viewBox="0 0 820 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dc-power-title">
      <title id="dc-power-title">AI Accelerator Power Consumption Comparison: NPU uses under 5W, CPU ~300W, GPU server ~10 kW per 8-GPU chassis, TPU Pod rack 40-100 kW, Cerebras WSE-3 23 kW single unit. Higher power = more cooling infrastructure needed. Liquid cooling becomes mandatory above 15-20 kW per rack.</title>
      <rect width="820" height="330" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI ACCELERATOR POWER CONSUMPTION — Data Center Planning Reality</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Liquid cooling becomes MANDATORY above ~15–20 kW per rack. Plan your DC infrastructure accordingly.</text>

      {/* Bar chart */}
      <text x="30" y="62" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Chip / System</text>
      <text x="280" y="62" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Power (approx)</text>
      <text x="390" y="62" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Rack Power</text>
      <text x="490" y="62" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Cooling Needed</text>
      <text x="610" y="62" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Bar (relative)</text>
      <line x1="20" y1="65" x2="800" y2="65" stroke="#e2e8f0" strokeWidth="1" />

      {chips.map((c, i) => (
        <g key={c.name}>
          <rect x="20" y={72 + i * 32} width="250" height="24" rx="4" fill="#f8fafc" />
          <text x="28" y={87 + i * 32} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={c.color}>{c.name}</text>
          <text x="280" y={87 + i * 32} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">{c.power}</text>
          <text x="390" y={87 + i * 32} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">{c.rack}</text>
          <text x="490" y={87 + i * 32} fontFamily="Arial,sans-serif" fontSize="7.5" fill={c.cool.includes("Liquid") ? "#dc2626" : "#16a34a"}>{c.cool}</text>
          <rect x="610" y={75 + i * 32} width={Math.min(c.barW, 180)} height="16" rx="3" fill={c.color} opacity="0.8" />
          <text x={614 + Math.min(c.barW, 180)} y={86 + i * 32} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569"> {c.rack}</text>
        </g>
      ))}

      {/* Liquid cooling threshold line */}
      <line x1="610" y1="180" x2="800" y2="180" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="610" y="176" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626">← Liquid cooling becomes mandatory above this line →</text>

      {/* DC planning box */}
      <rect x="20" y="300" width="780" height="24" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="315" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">DC Design rule: Plan for 2–3× growth. Design liquid cooling from day 1 if hosting GPU/TPU/WSE. Floor load, UPS capacity, and chiller plant all need to be sized upfront — retrofitting is 3× more expensive.</text>
    </svg>
  );
}
