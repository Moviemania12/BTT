"use client";
export default function GpuClusterNetwork() {
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gcn-title">
      <title id="gcn-title">GPU Cluster dual-network architecture: High-Speed AI Compute Network (solid purple/blue) connects GPU servers through Leaf Switches and Spine Switches in a fat-tree topology for GPU-to-GPU gradient sync. Separate Management Network (dashed blue) connects to same servers via different NICs for admin access, monitoring, and BMC - always available even if compute network has issues. Users access via Head Node.</title>
      <rect width="820" height="310" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER NETWORK — Two Separate Networks</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Management Network and Compute Network must NEVER share the same physical infrastructure. One failing must not impact the other.</text>

      {/* Spine switches */}
      <rect x="280" y="44" width="110" height="32" rx="5" fill="#dc2626" />
      <text x="335" y="58" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Spine Switch A</text>
      <text x="335" y="70" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Main AI Network Backbone</text>

      <rect x="430" y="44" width="110" height="32" rx="5" fill="#dc2626" />
      <text x="485" y="58" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Spine Switch B</text>
      <text x="485" y="70" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Main AI Network Backbone</text>

      {/* Leaf switches */}
      {[150, 370, 590].map((x, i) => (
        <g key={i}>
          <rect x={x} y="106" width="100" height="28" rx="5" fill="#f97316" />
          <text x={x + 50} y="118" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Leaf Switch {i + 1}</text>
          <text x={x + 50} y="128" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fef3c7" textAnchor="middle">Top-of-Rack Hub</text>
          {/* Leaf to spine */}
          <line x1={x + 50} y1={106} x2="335" y2={76} stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
          <line x1={x + 50} y1={106} x2="485" y2={76} stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
        </g>
      ))}

      {/* GPU servers */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const leafIdx = Math.floor(i / 2);
        const leafX = [150, 370, 590][leafIdx];
        const offsetX = i % 2 === 0 ? 0 : 56;
        const x = leafX + offsetX - 20;
        return (
          <g key={i}>
            <rect x={x} y="160" width="86" height="52" rx="5" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={x + 43} y="176" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU Server</text>
            <text x={x + 43} y="188" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">{i + 1}</text>
            <text x={x + 43} y="200" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#c4b5fd" textAnchor="middle">8 GPUs · 2 NICs</text>
            <text x={x + 43} y="208" fontFamily="Arial,sans-serif" fontSize="6" fill="#a78bfa" textAnchor="middle">Mgmt + Compute</text>
            <line x1={x + 43} y1={160} x2={leafX + 50} y2={134} stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
          </g>
        );
      })}

      {/* Management network - separate box */}
      <rect x="660" y="106" width="148" height="106" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,3" />
      <text x="734" y="125" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Management</text>
      <text x="734" y="138" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">Network</text>
      <text x="734" y="154" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">Separate switches</text>
      <text x="734" y="166" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">1 GbE per server</text>
      <text x="734" y="178" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">BMC/IPMI access</text>
      <text x="734" y="190" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Always available!</text>
      <text x="734" y="203" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">Even if AI network</text>
      <text x="734" y="213" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#3b82f6" textAnchor="middle">has problems</text>

      {/* Head node */}
      <rect x="14" y="106" width="110" height="54" rx="6" fill="#16a34a" />
      <text x="69" y="126" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Head Node</text>
      <text x="69" y="140" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Job Scheduler</text>
      <text x="69" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">User Login (Slurm/K8s)</text>
      <line x1="124" y1="133" x2="148" y2="133" stroke="#16a34a" strokeWidth="2" />

      {/* User */}
      <rect x="14" y="180" width="110" height="32" rx="5" fill="#0f172a" />
      <text x="69" y="198" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">User / AI Team</text>
      <text x="69" y="208" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Submit jobs to scheduler</text>
      <line x1="69" y1="180" x2="69" y2="160" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gcn-ar)" />

      {/* Shared storage */}
      <rect x="290" y="232" width="240" height="36" rx="5" fill="#ca8a04" />
      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Shared Storage</text>
      <text x="410" y="261" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fef9c3" textAnchor="middle">(Parallel File System — training data, checkpoints, models)</text>
      {[0, 1, 2, 3, 4, 5].map(i => {
        const leafIdx = Math.floor(i / 2);
        const leafX = [150, 370, 590][leafIdx];
        const offsetX = i % 2 === 0 ? 0 : 56;
        const x = leafX + offsetX - 20;
        return <line key={i} x1={x + 43} y1={212} x2="410" y2={232} stroke="#ca8a04" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,2" />;
      })}

      {/* Legend */}
      <rect x="14" y="276" width="640" height="30" rx="5" fill="#f1f5f9" />
      <line x1="24" y1="292" x2="60" y2="292" stroke="#a78bfa" strokeWidth="2" />
      <text x="66" y="296" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">AI Compute Network — InfiniBand/RoCE 400 Gb/s (GPU-to-GPU gradient sync)</text>
      <line x1="350" y1="292" x2="386" y2="292" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="392" y="296" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155">Management Network — 1 GbE (always separate, always available)</text>

      <defs>
        <marker id="gcn-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
