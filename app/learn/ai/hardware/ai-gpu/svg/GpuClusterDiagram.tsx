"use client";
export default function GpuClusterDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gc-title">
      <title id="gc-title">GPU Cluster: Multiple DGX servers each with 8 GPUs connected together via InfiniBand switches — Leaf Switches connect servers, Spine Switches connect Leaf Switches, Storage Servers hold training data</title>
      <rect width="820" height="320" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER — CONNECTING SERVERS TOGETHER</text>

      {/* Spine switches at top */}
      <rect x="220" y="36" width="380" height="36" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="410" y="52" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">InfiniBand Spine Switches (Top-Level)</text>
      <text x="410" y="65" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">NDR 400Gbps — Non-blocking — Any server to any server at full speed</text>

      {/* Leaf switches */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={20 + i*200} y="94" width="180" height="30" rx="6" fill="#334155" />
          <text x={110 + i*200} y="113" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7dd3fc" textAnchor="middle">InfiniBand Leaf Switch {i+1}</text>
          {/* Lines to spine */}
          <line x1={110+i*200} y1="94" x2={280+i*60} y2="72" stroke="#475569" strokeWidth="1" />
        </g>
      ))}

      {/* Server boxes */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const leafIdx = Math.floor(i / 2);
        const serverInLeaf = i % 2;
        const x = 20 + leafIdx * 200 + serverInLeaf * 96;
        return (
          <g key={i}>
            <rect x={x} y="142" width="88" height="70" rx="5" fill="#2563eb" />
            <text x={x+44} y="160" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">Server {i+1}</text>
            <text x={x+44} y="173" fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">8× H100</text>
            <text x={x+44} y="185" fontFamily="Arial,sans-serif" fontSize="6" fill="#bfdbfe" textAnchor="middle">NVSwitch</text>
            <text x={x+44} y="197" fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">640GB HBM</text>
            <text x={x+44} y="207" fontFamily="Arial,sans-serif" fontSize="6" fill="#7dd3fc" textAnchor="middle">10kW</text>
            {/* Line to leaf */}
            <line x1={x+44} y1="142" x2={110+leafIdx*200} y2="124" stroke="#3b82f6" strokeWidth="1" />
          </g>
        );
      })}

      {/* Storage row */}
      <rect x="20" y="232" width="580" height="50" rx="8" fill="#14532d" stroke="#16a34a" strokeWidth="1.5" />
      <text x="310" y="252" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#bbf7d0" textAnchor="middle">Storage Servers — Training Data + Checkpoints</text>
      <text x="310" y="267" fontFamily="Arial,sans-serif" fontSize="8" fill="#86efac" textAnchor="middle">Parallel file system (Lustre/Weka/GPFS) · Petabytes · 100+ GB/s to GPU servers</text>
      <text x="310" y="279" fontFamily="Arial,sans-serif" fontSize="7" fill="#4ade80" textAnchor="middle">Storage network: separate Ethernet fabric, not InfiniBand training fabric</text>

      {/* Management network */}
      <rect x="614" y="232" width="186" height="50" rx="8" fill="#334155" stroke="#475569" strokeWidth="1.5" />
      <text x="707" y="252" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#e2e8f0" textAnchor="middle">Management Network</text>
      <text x="707" y="267" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Server monitoring · Job scheduler</text>
      <text x="707" y="280" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Out-of-band · Separate from training</text>

      <text x="410" y="308" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Within server: NVLink (900 GB/s GPU-to-GPU) · Between servers: InfiniBand NDR 400Gbps per port · NCCL handles all communication automatically</text>
    </svg>
  );
}
