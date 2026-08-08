"use client";
export default function GpuClusterHierarchy() {
  const levels = [
    { label: "GPU Chip", sub: "The AI Math Engine\n1 chip · 700W · 80 GB memory", color: "#7c3aed", w: 120, x: 350 },
    { label: "GPU Compute Node", sub: "One GPU Server\n8 GPUs · 640 GB · ~10 kW", color: "#2563eb", w: 240, x: 290 },
    { label: "GPU Rack", sub: "4–8 Servers Stacked\n32–64 GPUs · rack-level power", color: "#0891b2", w: 380, x: 220 },
    { label: "GPU Cluster", sub: "Many Racks + Network + Storage + Scheduler\n100s to 10,000s of GPUs working together", color: "#16a34a", w: 560, x: 130 },
    { label: "AI Data Center", sub: "The Physical Building housing one or more GPU Clusters\nPower · Cooling · Network · Operations", color: "#ca8a04", w: 780, x: 20 },
  ];
  return (
    <svg viewBox="0 0 820 295" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gch-title">
      <title id="gch-title">GPU Cluster hierarchy: GPU Chip → GPU Compute Node (GPU Server) → GPU Rack → GPU Cluster → AI Data Center. Each level contains and depends on the level below it.</title>
      <rect width="820" height="295" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER HIERARCHY — From One Chip to AI Data Center</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Each level contains and depends on everything below it. GPU Cluster = multiple racks working as one coordinated compute system.</text>

      {levels.map((l, i) => (
        <g key={l.label}>
          <rect x={l.x} y={44 + i * 48} width={l.w} height={42} rx="6" fill={l.color} opacity={0.15 + i * 0.1} stroke={l.color} strokeWidth="1.5" />
          <text x="410" y={60 + i * 48} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill={l.color} textAnchor="middle">{l.label}</text>
          {l.sub.split("\n").map((line, li) => (
            <text key={li} x="410" y={73 + i * 48 + li * 11} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      <text x="14" y="270" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b">Smallest</text>
      <text x="784" y="270" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="end">Largest</text>
      <line x1="14" y1="280" x2="806" y2="280" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points="800,277 806,280 800,283" fill="#ca8a04" />
    </svg>
  );
}
