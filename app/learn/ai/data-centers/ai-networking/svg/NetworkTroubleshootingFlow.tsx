"use client";
export default function NetworkTroubleshootingFlow() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ntf-title">
      <title id="ntf-title">AI Network Troubleshooting Flow: Start with symptom GPU utilization low or training slow. Step 1: Check collective communication time via NCCL logs — is GPU waiting for network sync? Step 2: Check NIC utilization and RDMA counters. Step 3: Check PCIe bandwidth and NUMA affinity. Step 4: Check switch port utilization and packet drops. Step 5: Check PFC counters and ECN marking. Step 6: Check CRC/FCS errors and FEC errors. Step 7: Check optics — dirty fiber, bad transceiver, optical power. Step 8: Check MTU consistency end-to-end. Step 9: Check path imbalance and oversubscription. Identify the bottleneck layer and fix it.</title>
      <rect width="820" height="380" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI NETWORK TROUBLESHOOTING FLOW</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Systematic layer-by-layer diagnosis — fix only after identifying the actual bottleneck</text>

      {/* Start */}
      <rect x="270" y="44" width="280" height="28" rx="14" fill="#0f172a" />
      <text x="410" y="62" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU utilization LOW / training throughput SLOW</text>
      <line x1="410" y1="72" x2="410" y2="88" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ntf-ar)" />

      {/* Steps */}
      {[
        { label: "1. Collective Communication", sub: "NCCL logs — is GPU waiting for AllReduce? Profile with nsight/torch profiler", color: "#7c3aed" },
        { label: "2. NIC / RNIC", sub: "NIC utilization %, RDMA counters, retransmissions, queue depth", color: "#2563eb" },
        { label: "3. PCIe + NUMA", sub: "PCIe bandwidth, NUMA topology, CPU-GPU-NIC affinity mismatch?", color: "#0891b2" },
        { label: "4. Switch Port Utilization", sub: "Port counters, packet drops, buffer occupancy, queue drops", color: "#16a34a" },
        { label: "5. PFC / ECN", sub: "PFC pause frames, PFC storm?, ECN marking rate, CNP rate", color: "#ca8a04" },
        { label: "6. CRC / FCS / FEC", sub: "CRC errors, FEC corrected/uncorrected, interface error counters", color: "#dc2626" },
        { label: "7. Optics", sub: "Optical power (DOM), dirty fiber, bad transceiver, link flaps", color: "#7c3aed" },
        { label: "8. MTU + Path Imbalance", sub: "MTU consistent end-to-end?, ECMP hash imbalance, rail utilization", color: "#0f172a" },
      ].map((step, i) => (
        <g key={step.label}>
          <rect x="170" y={88 + i * 34} width="480" height="26" rx="5" fill={step.color} />
          <text x="410" y={101 + i * 34} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{step.label}</text>
          <text x="410" y={111 + i * 34} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.88)" textAnchor="middle">{step.sub}</text>
          {i < 7 && <line x1="410" y1={114 + i * 34} x2="410" y2={122 + i * 34} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ntf-ar)" />}
        </g>
      ))}

      {/* Fix box */}
      <rect x="220" y="366" width="380" height="8" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="410" y="374" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#14532d" textAnchor="middle">Identify bottleneck layer → fix that specific layer → re-measure → verify improvement</text>

      <defs>
        <marker id="ntf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
