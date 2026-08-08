"use client";
export default function AiStorageArchitecture() {
  return (
    <svg viewBox="0 0 820 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="asa-title">
      <title id="asa-title">Real-World AI Data Center Storage Architecture showing two main flows. Training flow: AI Users and Data Sources feed into Object Storage (cold/archive). Data Preparation pipeline reads from object storage, processes data, and writes to Parallel File System (hot tier). High-Speed Storage Network connects the parallel file system to GPU Compute Nodes. GPU nodes have Local NVMe Cache, and GPU HBM is the final destination. Checkpoints flow from GPU nodes back to Parallel File System and Object Storage. Model artifacts go to Model Registry. Inference flow: Model Registry feeds inference serving nodes.</title>
      <rect width="820" height="370" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">REAL-WORLD AI DATA CENTER STORAGE ARCHITECTURE</text>

      {/* Data Sources */}
      <rect x="14" y="35" width="140" height="45" rx="6" fill="#1e293b" />
      <text x="84" y="54" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">AI Users /</text>
      <text x="84" y="66" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">Data Sources</text>
      <text x="84" y="78" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Web, enterprise, sensors</text>

      <line x1="154" y1="57" x2="184" y2="57" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#asa-ar)" />

      {/* Object Storage */}
      <rect x="184" y="35" width="150" height="55" rx="6" fill="#64748b" />
      <text x="259" y="55" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Object Storage</text>
      <text x="259" y="67" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">(S3-compatible)</text>
      <text x="259" y="79" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Raw datasets, model artifacts</text>
      <text x="259" y="88" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">Cold archive, PB-scale</text>

      <line x1="334" y1="62" x2="364" y2="62" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#asa-ar)" />

      {/* Data Preparation */}
      <rect x="364" y="35" width="140" height="55" rx="6" fill="#0891b2" />
      <text x="434" y="55" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Data Preparation</text>
      <text x="434" y="67" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">ETL, cleaning, tokenize</text>
      <text x="434" y="79" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">dedup, quality filter</text>
      <text x="434" y="88" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">CPU compute cluster</text>

      <line x1="504" y1="62" x2="534" y2="62" stroke="#0891b2" strokeWidth="1.5" markerEnd="url(#asa-ar)" />

      {/* Parallel File System */}
      <rect x="534" y="35" width="272" height="55" rx="6" fill="#ca8a04" />
      <text x="670" y="55" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">Parallel File System (Hot Tier)</text>
      <text x="670" y="67" fontFamily="Arial,sans-serif" fontSize="7.5" fill="rgba(255,255,255,0.9)" textAnchor="middle">Lustre, GPFS/Spectrum Scale, WekaIO, VAST</text>
      <text x="670" y="79" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Active training data · Aggregate high throughput</text>
      <text x="670" y="88" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">Multiple storage nodes · POSIX interface</text>

      {/* Storage Network */}
      <rect x="184" y="130" width="622" height="28" rx="5" fill="#0f172a" />
      <text x="495" y="148" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">High-Speed Storage Network (100–400 GbE / InfiniBand / NVMe-oF fabric)</text>

      {/* Lines to storage network */}
      <line x1="670" y1="90" x2="670" y2="130" stroke="#ca8a04" strokeWidth="2" />
      <line x1="259" y1="90" x2="259" y2="130" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />

      {/* GPU Nodes */}
      <rect x="184" y="198" width="272" height="60" rx="6" fill="#7c3aed" />
      <text x="320" y="218" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU Compute Nodes</text>
      <text x="320" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">AI Training (AllReduce via GPU network)</text>
      <text x="320" y="242" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">Data Loaders → Local NVMe Cache → GPU HBM</text>
      <text x="320" y="253" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">High-speed GPU fabric (NVLink / InfiniBand separate)</text>
      <line x1="320" y1="158" x2="320" y2="198" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#asa-ar-p)" />

      {/* Local NVMe */}
      <rect x="534" y="198" width="130" height="60" rx="6" fill="#16a34a" />
      <text x="599" y="218" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Local NVMe</text>
      <text x="599" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bbf7d0" textAnchor="middle">Per-node cache</text>
      <text x="599" y="242" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Dataset prefetch</text>
      <text x="599" y="253" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Hot working set</text>
      <line x1="599" y1="158" x2="599" y2="198" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#asa-ar-g)" />
      <line x1="456" y1="228" x2="534" y2="228" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#asa-ar-g)" />

      {/* GPU HBM */}
      <rect x="684" y="198" width="122" height="60" rx="6" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="745" y="218" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">GPU HBM</text>
      <text x="745" y="230" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c4b5fd" textAnchor="middle">80–192 GB per GPU</text>
      <text x="745" y="242" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">Active model weights</text>
      <text x="745" y="253" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">Activations, gradients</text>
      <line x1="664" y1="228" x2="684" y2="228" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#asa-ar-p)" />

      {/* Checkpoints */}
      <rect x="184" y="295" width="170" height="50" rx="6" fill="#dc2626" />
      <text x="269" y="315" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Checkpoint Storage</text>
      <text x="269" y="327" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Periodic model state saves</text>
      <text x="269" y="338" fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)" textAnchor="middle">Fast NVMe-backed tier</text>
      <path d="M320 258 Q320 280 269 280 Q269 295" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#asa-ar-r)" />

      {/* Model Registry */}
      <rect x="534" y="295" width="272" height="50" rx="6" fill="#0f172a" />
      <text x="670" y="315" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Model Registry / Object Storage</text>
      <text x="670" y="327" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Final trained model artifacts</text>
      <text x="670" y="338" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Versioned, validated, ready for inference</text>
      <path d="M320 258 Q320 358 670 358 Q670 345" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#asa-ar-g)" />

      <text x="410" y="360" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">GPU compute network (NVLink/InfiniBand) is separate from storage network — two distinct fabrics for different traffic types</text>

      <defs>
        <marker id="asa-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#64748b" /></marker>
        <marker id="asa-ar-p" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
        <marker id="asa-ar-g" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
        <marker id="asa-ar-r" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}
