"use client";
export default function CoolingTechComparison() {
  const techs = [
    {
      name: "Air Cooling\n(CRAC/CRAH)",
      density: "Low–Medium\n(facility dependent)",
      cost: "Lowest upfront",
      complexity: "Low",
      water: "Varies",
      ai: "Limited for\nhigh-density AI",
      color: "#16a34a",
    },
    {
      name: "Rear-Door\nHeat Exchanger",
      density: "Medium\n(augments air)",
      cost: "Medium",
      complexity: "Medium",
      water: "Yes (closed loop)",
      ai: "Good supplement\nfor moderate density",
      color: "#0891b2",
    },
    {
      name: "Direct Liquid\nCooling (DLC)",
      density: "High\n(40–100+ kW/rack)",
      cost: "Medium–High",
      complexity: "Medium–High",
      water: "Yes (closed loop)",
      ai: "Primary choice\nfor modern AI racks",
      color: "#7c3aed",
    },
    {
      name: "Single-Phase\nImmersion",
      density: "Very High",
      cost: "High",
      complexity: "High",
      water: "Dielectric fluid",
      ai: "High-density\nspecialty use",
      color: "#ca8a04",
    },
    {
      name: "Two-Phase\nImmersion",
      density: "Highest",
      cost: "Highest",
      complexity: "Highest",
      water: "Specialty fluid",
      ai: "Experimental /\nhigh-density niche",
      color: "#dc2626",
    },
  ];

  const headers = ["Density", "Cost", "Complexity", "Water/Fluid", "AI Suitability"];

  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ctc-title">
      <title id="ctc-title">Cooling Technologies Comparison table: Air Cooling low-medium density, lowest cost, low complexity, varies water, limited for high-density AI. Rear-Door Heat Exchanger medium density, medium cost, medium complexity, yes water, good supplement for moderate density. Direct Liquid Cooling high density 40-100+ kW per rack, medium-high cost, medium-high complexity, yes water, primary choice for modern AI racks. Single-Phase Immersion very high density, high cost, high complexity, dielectric fluid, high-density specialty use. Two-Phase Immersion highest density, highest cost, highest complexity, specialty fluid, experimental high-density niche.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">COOLING TECHNOLOGIES — COMPARISON</text>
      <text x="410" y="34" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Choice depends on rack density, facility design, budget, and operational expertise. Actual density limits vary by equipment and facility.</text>

      {/* Header row */}
      <rect x="14" y="44" width="148" height="28" rx="3" fill="#f1f5f9" />
      <text x="88" y="62" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#374151" textAnchor="middle">Technology</text>
      {headers.map((h, i) => (
        <g key={h}>
          <rect x={162 + i * 130} y="44" width="128" height="28" rx="3" fill="#f1f5f9" />
          <text x={226 + i * 130} y="62" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#374151" textAnchor="middle">{h}</text>
        </g>
      ))}

      {/* Data rows */}
      {techs.map((t, i) => {
        const y = 72 + i * 46;
        const vals = [t.density, t.cost, t.complexity, t.water, t.ai];
        return (
          <g key={t.name}>
            <rect x="14" y={y} width="148" height="44" rx="3" fill={t.color} />
            {t.name.split("\n").map((line, li) => (
              <text key={li} x={88} y={y + 18 + li * 13} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{line}</text>
            ))}
            {vals.map((v, vi) => (
              <g key={vi}>
                <rect x={162 + vi * 130} y={y} width="128" height="44" rx="3" fill={i % 2 === 0 ? "#f8fafc" : "#fff"} stroke="#e2e8f0" strokeWidth="0.5" />
                {v.split("\n").map((line, li) => (
                  <text key={li} x={226 + vi * 130} y={y + 18 + li * 13} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151" textAnchor="middle">{line}</text>
                ))}
              </g>
            ))}
          </g>
        );
      })}

      <text x="410" y="302" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Many deployments use hybrid approach — DLC for GPU servers + air cooling for lower-density compute and networking equipment</text>
    </svg>
  );
}
