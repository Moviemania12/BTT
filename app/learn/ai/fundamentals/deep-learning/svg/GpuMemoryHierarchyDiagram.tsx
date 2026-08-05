"use client";
export default function GpuMemoryHierarchyDiagram() {
  const levels = [
    { label: "Registers", sub: "Per-thread · ~256KB per SM · <1ns", size: "Fastest", color: "#dc2626", bg: "#fef2f2", w: 140 },
    { label: "Shared Memory / L1 Cache", sub: "Per-SM block · 48-228KB · ~5ns", size: "Very Fast", color: "#ea580c", bg: "#fff7ed", w: 260 },
    { label: "L2 Cache", sub: "Per-GPU · 50MB (H100) · ~50ns", size: "Fast", color: "#ca8a04", bg: "#fef9c3", w: 380 },
    { label: "HBM3 (GPU Global Memory)", sub: "80GB H100 · 3.35 TB/s · ~200ns", size: "High BW", color: "#16a34a", bg: "#dcfce7", w: 500 },
    { label: "NVLink / NVSwitch (Peer GPU)", sub: "900 GB/s H100 · ~1µs", size: "Fast Link", color: "#2563eb", bg: "#dbeafe", w: 620 },
    { label: "CPU DRAM / PCIe", sub: "TB range · ~50 GB/s · ~5µs", size: "Slower", color: "#7c3aed", bg: "#ede9fe", w: 700 },
    { label: "NVMe SSD (Offload)", sub: "TB range · 5-15 GB/s · ~100µs", size: "Slowest", color: "#475569", bg: "#f1f5f9", w: 780 },
  ];
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gmh-title">
      <title id="gmh-title">GPU Memory Hierarchy: Registers to NVMe — speed and capacity at each level</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU MEMORY HIERARCHY</text>
      <text x="410" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Speed decreases ↓ · Capacity increases ↓ · Access latency increases ↓</text>
      {levels.map((l, i) => {
        const xStart = (820 - l.w) / 2;
        return (
          <g key={i}>
            <rect x={xStart} y={46 + i * 40} width={l.w} height="32" rx="6" fill={l.bg} stroke={l.color} strokeWidth="1.5" />
            <text x="410" y={59 + i * 40} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={l.color} textAnchor="middle">{l.label}</text>
            <text x="410" y={71 + i * 40} fontFamily="Arial,sans-serif" fontSize="8" fill={l.color} textAnchor="middle">{l.sub}</text>
            <text x={xStart - 8} y={64 + i * 40} fontFamily="Arial,sans-serif" fontSize="7" fill={l.color} textAnchor="end">{l.size}</text>
          </g>
        );
      })}
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Training optimizations: keep hot data in L1/Shared · Flash Attention minimizes HBM traffic · ZeRO offloads optimizer states to CPU DRAM/NVMe</text>
    </svg>
  );
}
