"use client";
export default function GpuSoftwareStack() {
  const f = "Arial,sans-serif";
  const layers = [
    { y: 50, c: "#7c3aed", bg: "#f5f3ff", t: "Scheduler / Orchestration", s: "Kubernetes (device plugin) · Slurm · Run:ai" },
    { y: 104, c: "#2563eb", bg: "#eff6ff", t: "Frameworks", s: "PyTorch · TensorFlow · JAX · vLLM · TensorRT" },
    { y: 158, c: "#0891b2", bg: "#ecfeff", t: "Libraries + Container Runtime", s: "CUDA · cuDNN · NCCL · container toolkit (GPU inside Docker)" },
    { y: 212, c: "#059669", bg: "#ecfdf5", t: "Driver + Fabric Manager", s: "Kernel driver (nvidia.ko) · fabric manager for NVSwitch · MIG config" },
    { y: 266, c: "#d97706", bg: "#fffbeb", t: "Firmware + BIOS", s: "GPU VBIOS · BMC / Redfish · BIOS: Above 4G, ReBAR, IOMMU, PCIe gen" },
    { y: 320, c: "#dc2626", bg: "#fef2f2", t: "Hardware", s: "GPUs · NVLink/NVSwitch · NICs · PCIe · power + cooling" },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GPU software stack from hardware and firmware up through driver, libraries, frameworks and scheduler, with DCGM monitoring alongside" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">GPU Software Stack — Bottom to Top</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x="30" y={l.y} width="600" height="46" rx="6" fill={l.bg} stroke={l.c} strokeWidth="2" />
          <text x="46" y={l.y + 20} fontFamily={f} fontSize="11.5" fontWeight="700" fill={l.c}>{l.t}</text>
          <text x="46" y={l.y + 36} fontFamily={f} fontSize="9.5" fill="#374151">{l.s}</text>
        </g>
      ))}
      <rect x="660" y="50" width="170" height="316" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="745" y="74" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">Monitoring</text>
      <text x="745" y="92" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">DCGM agent</text>
      <text x="745" y="106" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">dcgm-exporter</text>
      <text x="745" y="120" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Prometheus / Grafana</text>
      <text x="745" y="150" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#111827">Watches every layer:</text>
      <text x="745" y="168" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">temp, power, clocks</text>
      <text x="745" y="182" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">ECC / XID errors</text>
      <text x="745" y="196" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">NVLink counters</text>
      <text x="745" y="210" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">utilisation, memory</text>
      <text x="745" y="240" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#111827">Health checks:</text>
      <text x="745" y="258" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">dcgmi diag (levels 1-4)</text>
      <text x="745" y="272" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">nvidia-smi, nccl-tests</text>
      <text x="745" y="302" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Version match matters:</text>
      <text x="745" y="316" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">driver ⇄ CUDA ⇄ framework</text>
      <text x="745" y="330" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">⇄ fabric manager</text>
      <path d="M 640 370 L 640 76" stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <text x="430" y="386" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#6b7280">A fault at a lower layer shows up as a strange error at the top — always debug bottom-up.</text>
    </svg>
  );
}
