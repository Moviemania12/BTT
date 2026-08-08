"use client";
export default function AiPowerChain() {
  const chain = [
    { label: "Electricity Grid", sub: "Power Company supply\n(11,000V – 33,000V)", color: "#475569", bg: "#f1f5f9" },
    { label: "Transformer", sub: "Voltage Reducer\n(steps down to safe levels)", color: "#0284c7", bg: "#eff6ff" },
    { label: "UPS — Battery Backup", sub: "Uninterruptible Power Supply\n(rides through 5–15 min grid blip)", color: "#7c3aed", bg: "#ede9fe" },
    { label: "Diesel Generators", sub: "Auto-start in 10–15 sec\n(if grid fails longer)", color: "#dc2626", bg: "#fef2f2" },
    { label: "PDU — Power Strip", sub: "Power Distribution Unit\n(distributes to each server)", color: "#ca8a04", bg: "#fefce8" },
    { label: "AI GPU Server", sub: "Receives clean, protected power\n(~10 kW per server)", color: "#16a34a", bg: "#f0fdf4" },
  ];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="apc-title">
      <title id="apc-title">AI Data Center Power Chain from top to bottom: Electricity Grid (high voltage), Transformer (voltage reducer), UPS Battery Backup (keeps power flowing during grid blips), Diesel Generators (auto-start for longer outages), PDU Power Distribution Unit (distributes to each rack), AI GPU Server (receives clean protected power). Heat generated flows to cooling system. System must be 100% redundant — any interruption loses expensive AI training work.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI DATA CENTER POWER CHAIN — Electricity Grid to GPU Server</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Every step in this chain must be redundant — any power interruption crashes running training jobs.</text>

      {chain.map((c, i) => {
        const x = 90 + i * 108;
        return (
          <g key={c.label}>
            <rect x={x} y="44" width="100" height="200" rx="8" fill={c.bg} stroke={c.color} strokeWidth="1.5" />
            <circle cx={x + 50} cy={72} r="18" fill={c.color} />
            <text x={x + 50} y={77} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#fff" textAnchor="middle">{i + 1}</text>
            {c.label.split(" — ").map((line, li) => (
              <text key={li} x={x + 50} y={104 + li * 12} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill={c.color} textAnchor="middle">{line}</text>
            ))}
            {c.sub.split("\n").map((line, li) => (
              <text key={li} x={x + 50} y={136 + li * 12} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">{line}</text>
            ))}
            {i < chain.length - 1 && (
              <line x1={x + 102} y1={144} x2={x + 108} y2={144} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#apc-ar)" />
            )}
          </g>
        );
      })}

      {/* Heat branch */}
      <text x="740" y="144" fontFamily="Arial,sans-serif" fontSize="8" fill="#f97316" textAnchor="start">→ Heat</text>
      <text x="740" y="157" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="start">to Cooling</text>

      <rect x="90" y="252" width="640" height="42" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#7c2d12" textAnchor="middle">Power chain must be 100% redundant (N+1 or 2N at every level)</text>
      <text x="410" y="284" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">One power interruption = training job crashes = hours/days of lost work. Zero tolerance for downtime.</text>

      <defs>
        <marker id="apc-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
