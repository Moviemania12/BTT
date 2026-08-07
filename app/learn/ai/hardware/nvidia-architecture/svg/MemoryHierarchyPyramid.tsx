"use client";
export default function MemoryHierarchyPyramid() {
  const layers = [
    { label: "Registers", detail: "Per-thread · 256 KB per SM · 65,536 regs/SM · ~0 ns latency", size: "Smallest, Fastest", color: "#7c3aed", w: 160, x: 330 },
    { label: "Shared Memory / L1 Cache", detail: "Per-block · 256 KB per SM (configurable) · ~1–5 cycle latency · Programmer-managed", size: "Fast team memory", color: "#2563eb", w: 280, x: 270 },
    { label: "L2 Cache", detail: "GPU-wide · 50 MB (H100) · Automatic · Shared by all SMs · ~100 cycle latency", size: "Chip-wide cache", color: "#0891b2", w: 420, x: 200 },
    { label: "HBM — High Bandwidth Memory", detail: "Main GPU memory · 80 GB HBM3 (H100) · 3.35 TB/s bandwidth · ~200+ cycle latency", size: "Main storage", color: "#16a34a", w: 580, x: 120 },
    { label: "System DRAM (CPU Memory via PCIe)", detail: "CPU RAM · Hundreds of GB · ~128 GB/s PCIe 5.0 bandwidth · ~2000+ cycle effective latency", size: "Biggest, Slowest", color: "#ca8a04", w: 780, x: 20 },
  ];
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mhp-title">
      <title id="mhp-title">GPU Memory Hierarchy Pyramid: Registers at top (fastest, per-thread, zero latency, 256KB per SM), Shared Memory/L1 Cache (fast, per-block, 256KB, 1-5 cycles), L2 Cache (GPU-wide, 50MB H100, 100 cycles), HBM main memory (80GB, 3.35 TB/s, 200 cycles), CPU DRAM via PCIe (slowest, 128 GB/s). Closer to top = faster, smaller, more expensive per bit.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU MEMORY HIERARCHY — Faster = Closer to Compute, Smaller, More Expensive</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">AI performance key: maximize data reuse in fast (top) memory, minimize slow HBM/PCIe access</text>

      {layers.map((l, i) => (
        <g key={l.label}>
          <rect x={l.x} y={44 + i * 50} width={l.w} height={44} rx="6" fill={l.color} opacity={0.85} />
          <text x="410" y={62 + i * 50} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">{l.label}</text>
          <text x="410" y={76 + i * 50} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">{l.detail}</text>
          <text x="410" y={83 + i * 50} fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">{l.size}</text>
          {/* Arrows connecting levels */}
          {i < layers.length - 1 && (
            <line x1="410" y1={88 + i * 50} x2="410" y2={92 + i * 50} stroke="#e2e8f0" strokeWidth="1.5" />
          )}
        </g>
      ))}

      {/* Left labels */}
      <text x="14" y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c3aed" transform="rotate(-90,14,150)">FASTEST / SMALLEST</text>
      <text x="800" y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#ca8a04" transform="rotate(90,800,150)">SLOWEST / LARGEST</text>

      <rect x="20" y="296" width="780" height="12" rx="4" fill="#f1f5f9" />
      <text x="410" y="306" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">
        Optimization rule: Load data from HBM once into Shared Memory → compute many times → write result back to HBM. This &quot;tiling&quot; = key to fast matrix multiply = why AI is fast on GPU.
      </text>
    </svg>
  );
}
