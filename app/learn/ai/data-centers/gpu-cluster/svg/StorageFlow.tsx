"use client";
export default function StorageFlow() {
  return (
    <svg viewBox="0 0 820 265" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sf-title">
      <title id="sf-title">Storage flow for GPU Cluster training: Dataset in Cold Storage pre-staged to Hot Parallel File System before training. GPU Compute Nodes read batches from hot storage continuously. Checkpoints written back periodically. Final model goes to Model Registry.</title>
      <rect width="820" height="265" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">STORAGE FLOW — From Dataset to Trained Model</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Storage throughput requirements depend on workload, cluster size, and data pipeline design. Benchmark before provisioning.</text>

      <rect x="14" y="50" width="130" height="90" rx="7" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="79" y="73" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Cold Storage</text>
      <text x="79" y="87" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">Object Storage</text>
      <text x="79" y="99" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">(S3, GCS, MinIO)</text>
      <text x="79" y="112" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Cheap, large capacity</text>
      <text x="79" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Raw datasets archived</text>
      <text x="79" y="136" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ca8a04" textAnchor="middle">Pre-stage before training!</text>

      <line x1="144" y1="95" x2="178" y2="95" stroke="#0891b2" strokeWidth="2" markerEnd="url(#sf-ar)" />
      <text x="161" y="88" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#0891b2" textAnchor="middle">pre-stage</text>

      <rect x="179" y="50" width="148" height="90" rx="7" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <text x="253" y="73" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0c4a6e" textAnchor="middle">Hot Storage</text>
      <text x="253" y="87" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0369a1" textAnchor="middle">Parallel File System</text>
      <text x="253" y="99" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">(Lustre, GPFS, WekaIO)</text>
      <text x="253" y="112" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">High bandwidth, fast access</text>
      <text x="253" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#0369a1" textAnchor="middle">Multiple storage nodes</text>
      <text x="253" y="136" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#0891b2" textAnchor="middle">Active training data lives here</text>

      <rect x="390" y="44" width="256" height="100" rx="7" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="518" y="66" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">GPU Compute Nodes</text>
      <text x="518" y="80" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c4b5fd" textAnchor="middle">(AI Training in progress)</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={398 + i * 82} y="88" width="72" height="48" rx="4" fill="#7c3aed" />
          <text x={434 + i * 82} y="108" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">Node {i + 1}</text>
          <text x={434 + i * 82} y="120" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#ddd6fe" textAnchor="middle">8 GPUs</text>
          <text x={434 + i * 82} y="131" fontFamily="Arial,sans-serif" fontSize="6" fill="#c4b5fd" textAnchor="middle">640 GB HBM</text>
        </g>
      ))}

      <line x1="327" y1="95" x2="388" y2="95" stroke="#0891b2" strokeWidth="2.5" markerEnd="url(#sf-ar2)" />
      <text x="358" y="86" fontFamily="Arial,sans-serif" fontSize="7" fill="#0891b2" textAnchor="middle">Training batches</text>
      <text x="358" y="106" fontFamily="Arial,sans-serif" fontSize="7" fill="#0891b2" textAnchor="middle">continuously read</text>

      <rect x="179" y="158" width="148" height="90" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="253" y="178" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Checkpoint Storage</text>
      <text x="253" y="192" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#92400e" textAnchor="middle">Fast NVMe-backed</text>
      <text x="253" y="204" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Recent checkpoints</text>
      <text x="253" y="216" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Every N steps/minutes</text>
      <text x="253" y="228" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Resume training if failure</text>
      <text x="253" y="241" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#ca8a04" textAnchor="middle">Critical for fault tolerance!</text>

      <line x1="518" y1="144" x2="518" y2="170" stroke="#ca8a04" strokeWidth="2" markerEnd="url(#sf-ar3)" />
      <line x1="518" y1="170" x2="327" y2="200" stroke="#ca8a04" strokeWidth="1.5" opacity="0.7" markerEnd="url(#sf-ar3)" />
      <text x="440" y="162" fontFamily="Arial,sans-serif" fontSize="7" fill="#ca8a04" textAnchor="middle">checkpoint writes</text>

      <rect x="670" y="50" width="136" height="100" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="738" y="73" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Model Registry</text>
      <text x="738" y="87" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">Final trained model</text>
      <text x="738" y="99" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Versioned, validated</text>
      <text x="738" y="111" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Ready for inference</text>
      <text x="738" y="123" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Object storage backend</text>
      <text x="738" y="141" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#16a34a" textAnchor="middle">End of training output</text>
      <line x1="646" y1="94" x2="668" y2="94" stroke="#16a34a" strokeWidth="2" markerEnd="url(#sf-ar4)" />
      <text x="657" y="86" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a" textAnchor="middle">final model</text>

      <rect x="14" y="158" width="130" height="90" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="79" y="178" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">GPUDirect</text>
      <text x="79" y="192" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#14532d" textAnchor="middle">Storage</text>
      <text x="79" y="207" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Direct GPU ↔ Storage</text>
      <text x="79" y="219" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">path (bypasses CPU)</text>
      <text x="79" y="231" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Requires supported</text>
      <text x="79" y="243" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">HW + drivers + FS</text>

      <defs>
        <marker id="sf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
        <marker id="sf-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
        <marker id="sf-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ca8a04" /></marker>
        <marker id="sf-ar4" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
      </defs>
    </svg>
  );
}
