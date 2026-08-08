"use client";
export default function DgxH100Specs() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dgx-title">
      <title id="dgx-title">NVIDIA DGX H100 GPU Server specifications: 8 x NVIDIA H100 SXM GPUs each with 80 GB HBM3 (640 GB total), 4 NVSwitches with 4th generation NVLink providing 900 GB/s GPU-to-GPU bandwidth, 2 x Intel Xeon Platinum 8480C CPUs, 2 TB DDR5 system memory, 2 x 1.92 TB NVMe M.2 for OS plus 8 x 3.84 TB NVMe U.2 for data cache, 8 x ConnectX-7 single-port adapters providing up to 400 Gb/s each for cluster networking, maximum power 10.2 kW, 8U form factor.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NVIDIA DGX H100 — Reference Specifications</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Reference configuration. Always verify against current NVIDIA documentation for your deployment.</text>

      {/* Server outline */}
      <rect x="20" y="42" width="780" height="222" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Specs grid */}
      {[
        { label: "GPU", value: "8 × NVIDIA H100 SXM, 80 GB each", icon: "🔲" },
        { label: "Total GPU Memory", value: "640 GB HBM3", icon: "💾" },
        { label: "GPU Interconnect", value: "4 × NVSwitch · 4th-gen NVLink · 900 GB/s GPU-to-GPU", icon: "⚡" },
        { label: "CPU", value: "2 × Intel Xeon Platinum 8480C", icon: "🖥" },
        { label: "System Memory", value: "2 TB DDR5", icon: "🗄" },
        { label: "Storage (OS)", value: "2 × 1.92 TB NVMe M.2", icon: "💿" },
        { label: "Storage (Data/Cache)", value: "8 × 3.84 TB NVMe U.2", icon: "💿" },
        { label: "Cluster Network", value: "8 × ConnectX-7 single-port, up to 400 Gb/s each", icon: "🌐" },
        { label: "Max Power", value: "10.2 kW", icon: "⚡" },
        { label: "Form Factor", value: "8U", icon: "📦" },
      ].map((spec, i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = col === 0 ? 28 : 414, y = 50 + row * 42;
        return (
          <g key={spec.label}>
            <rect x={x} y={y} width={378} height={36} rx="5" fill={i % 2 === 0 ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.1)"} />
            <text x={x + 12} y={y + 14} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#94a3b8">{spec.label}</text>
            <text x={x + 12} y={y + 28} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff">{spec.value}</text>
          </g>
        );
      })}

      <rect x="28" y="252" width="764" height="8" rx="3" fill="rgba(124,58,237,0.3)" />
      <text x="410" y="259" fontFamily="Arial,sans-serif" fontSize="7" fill="#a78bfa" textAnchor="middle">Power distribution must follow manufacturer's approved electrical configuration and applicable codes</text>
    </svg>
  );
}
