"use client";
export default function DgxH100Diagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dgx-title">
      <title id="dgx-title">DGX H100 Server: 8 H100 SXM5 GPUs each 80GB connected via 4 NVSwitch chips (all-to-all 7.2 TB/s NVLink fabric). 2 Intel Xeon Platinum CPUs connected to GPUs via PCIe 5.0. 8 InfiniBand 400Gb/s ports for inter-server network. 8 NVMe SSD for local storage. Power: approximately 10.2 kW. Form factor: typically 8U rack server.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">DGX H100 — NVIDIA&apos;s Complete AI Server (8× H100 + NVSwitch + Everything)</text>

      {/* Server chassis */}
      <rect x="14" y="28" width="792" height="260" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="410" y="46" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">DGX H100 SERVER CHASSIS (~10.2 kW, 8U rack form factor)</text>

      {/* 8 GPUs — 2 rows of 4 */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 22 + col * 152, y = 52 + row * 72;
        return (
          <g key={i}>
            <rect x={x} y={y} width={144} height={64} rx="5" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={x + 72} y={y + 20} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">H100 GPU {i}</text>
            <text x={x + 72} y={y + 34} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">SXM5 · 80 GB HBM3</text>
            <text x={x + 72} y={y + 48} fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">700W · 3.35 TB/s mem BW</text>
            <text x={x + 72} y={y + 59} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#a78bfa" textAnchor="middle">132 SMs · 528 Tensor Cores</text>
          </g>
        );
      })}

      {/* NVSwitches */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={22 + i * 188} y={198} width={150} height={30} rx="5" fill="#16a34a" />
          <text x={22 + i * 188 + 75} y={210} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">NVSwitch {i + 1}</text>
          <text x={22 + i * 188 + 75} y={223} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bbf7d0" textAnchor="middle">All-to-all · 900 GB/s per link</text>
        </g>
      ))}

      {/* CPUs */}
      <rect x="22" y="236" width="180" height="40" rx="5" fill="#0284c7" />
      <text x="112" y="252" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Intel Xeon Platinum CPU 0</text>
      <text x="112" y="265" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">PCIe 5.0 → GPUs 0-3</text>

      <rect x="210" y="236" width="180" height="40" rx="5" fill="#0284c7" />
      <text x="300" y="252" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Intel Xeon Platinum CPU 1</text>
      <text x="300" y="265" fontFamily="Arial,sans-serif" fontSize="7" fill="#bae6fd" textAnchor="middle">PCIe 5.0 → GPUs 4-7</text>

      {/* Network */}
      <rect x="400" y="236" width="200" height="40" rx="5" fill="#dc2626" />
      <text x="500" y="252" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Network: 8× IB 400 Gb/s</text>
      <text x="500" y="265" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">+ 8× 10 GbE management</text>

      {/* Storage */}
      <rect x="610" y="236" width="196" height="40" rx="5" fill="#ca8a04" />
      <text x="708" y="252" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">8× NVMe SSD (local)</text>
      <text x="708" y="265" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">Fast checkpoint + model cache</text>

      {/* Bandwidth callout */}
      <text x="410" y="285" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#00d4ff" textAnchor="middle">
        NVLink GPU-to-GPU: 7.2 TB/s aggregate  ·  PCIe CPU-GPU: 128 GB/s  ·  NVSwitch: 4 chips = full any-to-any
      </text>
    </svg>
  );
}
