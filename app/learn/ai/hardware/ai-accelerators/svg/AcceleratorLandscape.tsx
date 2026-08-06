"use client";
export default function AcceleratorLandscape() {
  const chips = [
    { name: "CPU", sub: "General Brain", detail: "Any task, few cores", color: "#2563eb", bg: "#eff6ff", x: 30 },
    { name: "GPU", sub: "Parallel Powerhouse", detail: "Thousands of cores, AI + graphics", color: "#16a34a", bg: "#f0fdf4", x: 160 },
    { name: "TPU", sub: "Matrix Specialist", detail: "Google's AI-only chip", color: "#7c3aed", bg: "#fdf4ff", x: 290 },
    { name: "NPU", sub: "Mobile AI Engine", detail: "Low-power, on-device AI", color: "#dc2626", bg: "#fef2f2", x: 420 },
    { name: "DPU", sub: "Network Manager", detail: "Moves AI data efficiently", color: "#0891b2", bg: "#ecfeff", x: 550 },
    { name: "FPGA", sub: "Reprogrammable Chip", detail: "Flexible, field-changeable", color: "#ca8a04", bg: "#fefce8", x: 680 },
  ];
  const asics = [
    { name: "AWS Trainium", use: "Training", color: "#f97316" },
    { name: "AWS Inferentia", use: "Inference", color: "#f97316" },
    { name: "Intel Gaudi 3", use: "Training+Infer", color: "#0284c7" },
    { name: "Cerebras WSE-3", use: "Large Models", color: "#7c3aed" },
    { name: "Graphcore IPU", use: "Sparse AI", color: "#059669" },
    { name: "SambaNova", use: "Enterprise", color: "#dc2626" },
    { name: "Apple Neural Engine", use: "On-device", color: "#475569" },
    { name: "Qualcomm Hexagon NPU", use: "Mobile", color: "#7c3aed" },
  ];
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="al-title">
      <title id="al-title">AI Accelerator Landscape: CPU, GPU, TPU, NPU, DPU, FPGA are the main chip categories. Below them are custom ASICs: AWS Trainium, AWS Inferentia, Intel Gaudi, Cerebras, Graphcore, SambaNova, Apple Neural Engine, Qualcomm Hexagon.</title>
      <rect width="820" height="360" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">THE AI ACCELERATOR LANDSCAPE — Every Major Type at a Glance</text>

      {/* Top row: chip categories */}
      <text x="410" y="42" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">Main chip categories (from general-purpose to specialist):</text>
      {chips.map((c) => (
        <g key={c.name}>
          <rect x={c.x} y={52} width={118} height={80} rx="8" fill={c.bg} stroke={c.color} strokeWidth="1.5" />
          <text x={c.x + 59} y={75} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill={c.color} textAnchor="middle">{c.name}</text>
          <text x={c.x + 59} y={91} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={c.color} textAnchor="middle">{c.sub}</text>
          <text x={c.x + 59} y={108} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">{c.detail}</text>
          <text x={c.x + 59} y={122} fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">————</text>
        </g>
      ))}

      {/* ASIC bracket */}
      <text x="410" y="152" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e293b" textAnchor="middle">Custom ASICs — chips built for ONE specific job (examples below):</text>
      <line x1="20" y1="158" x2="800" y2="158" stroke="#e2e8f0" strokeWidth="1" />

      {/* ASIC cards 2 rows of 4 */}
      {asics.map((a, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 20 + col * 198, y = 164 + row * 60;
        return (
          <g key={a.name}>
            <rect x={x} y={y} width={188} height={50} rx="6" fill="#f8fafc" stroke={a.color} strokeWidth="1.5" />
            <text x={x + 94} y={y + 18} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={a.color} textAnchor="middle">{a.name}</text>
            <text x={x + 94} y={y + 32} fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Best for: {a.use}</text>
            <text x={x + 94} y={y + 44} fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Custom ASIC — dedicated silicon</text>
          </g>
        );
      })}

      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#475569" textAnchor="middle">General Rule: More specialized = more efficient for that task, less flexible for everything else</text>
      <rect x="20" y="304" width="780" height="50" rx="8" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="322" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">CPU: most flexible, least efficient for AI ←—————————————→ Custom ASIC: least flexible, most efficient for one AI task</text>
      <text x="410" y="338" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">GPU: sweet spot — good flexibility + good AI performance (reason NVIDIA dominates AI)</text>
      <text x="410" y="352" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Most teams: GPU. Hyperscalers at 1M+ queries/day: custom ASIC (e.g. Google TPU, AWS Inferentia).</text>
    </svg>
  );
}
