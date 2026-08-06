"use client";
export default function NvlinkDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nvl-title">
      <title id="nvl-title">Without NVLink, GPUs must talk through the CPU (slow, 64 GB/s each direction). With NVLink, GPUs talk directly to each other (fast, 900 GB/s total bidirectional).</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NVLink — DIRECT GPU-TO-GPU CONNECTION</text>

      {/* Without NVLink */}
      <rect x="20" y="36" width="370" height="230" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="205" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Without NVLink (PCIe only)</text>
      <text x="205" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#7f1d1d" textAnchor="middle">GPUs must talk through the CPU — slow roundabout route</text>

      {/* GPU 1 */}
      <rect x="36" y="84" width="110" height="50" rx="6" fill="#dc2626" />
      <text x="91" y="113" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU 1</text>

      {/* CPU */}
      <rect x="150" y="84" width="110" height="50" rx="6" fill="#7f1d1d" />
      <text x="205" y="113" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">CPU</text>
      <text x="205" y="126" fontFamily="Arial,sans-serif" fontSize="7" fill="#fca5a5" textAnchor="middle">(middleman)</text>

      {/* GPU 2 */}
      <rect x="264" y="84" width="110" height="50" rx="6" fill="#dc2626" />
      <text x="319" y="113" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU 2</text>

      {/* Arrows */}
      <line x1="148" y1="109" x2="152" y2="109" stroke="#fca5a5" strokeWidth="2" markerEnd="url(#nvl1)" />
      <line x1="262" y1="109" x2="258" y2="109" stroke="#fca5a5" strokeWidth="2" markerEnd="url(#nvl2)" />

      {/* Bandwidth label */}
      <rect x="36" y="148" width="338" height="56" rx="6" fill="#fecaca" />
      <text x="205" y="166" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">PCIe Gen5 x16 bandwidth:</text>
      <text x="205" y="180" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">64 GB/s each direction</text>
      <text x="205" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">128 GB/s bidirectional total</text>

      <text x="205" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Route: GPU1 → CPU → GPU2 (two hops)</text>
      <text x="205" y="234" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">Gradient sync for 70B model: very slow</text>
      <text x="205" y="257" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Suitable for inference, not large model training</text>

      {/* With NVLink */}
      <rect x="430" y="36" width="370" height="230" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">With NVLink (DGX/HGX servers)</text>
      <text x="615" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">GPUs talk directly to each other — no CPU needed</text>

      {/* GPU 1 */}
      <rect x="446" y="84" width="110" height="50" rx="6" fill="#16a34a" />
      <text x="501" y="113" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU 1</text>

      {/* NVSwitch in middle */}
      <rect x="570" y="84" width="88" height="50" rx="6" fill="#14532d" />
      <text x="614" y="107" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">NVSwitch</text>
      <text x="614" y="120" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">(GPU switch)</text>

      {/* GPU 2 */}
      <rect x="672" y="84" width="110" height="50" rx="6" fill="#16a34a" />
      <text x="727" y="113" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU 2</text>

      {/* NVLink connections */}
      <line x1="558" y1="109" x2="572" y2="109" stroke="#22c55e" strokeWidth="3" markerEnd="url(#nvl3)" />
      <line x1="670" y1="109" x2="658" y2="109" stroke="#22c55e" strokeWidth="3" markerEnd="url(#nvl4)" />

      {/* Bandwidth label */}
      <rect x="446" y="148" width="338" height="56" rx="6" fill="#dcfce7" />
      <text x="615" y="166" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">NVLink 4.0 bandwidth (H100):</text>
      <text x="615" y="180" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">900 GB/s bidirectional total per GPU</text>
      <text x="615" y="194" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Direct GPU-to-GPU (no CPU middleman)</text>

      <text x="615" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Gradient sync for 70B model: fast enough for training</text>
      <text x="615" y="234" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Tensor parallelism enabled — split layers across GPUs</text>
      <text x="615" y="257" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">NVLink 5.0 (B200): 1.8 TB/s bidirectional total per GPU</text>

      <defs>
        <marker id="nvl1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#fca5a5" /></marker>
        <marker id="nvl2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="180"><path d="M0,0 L5,2.5 L0,5 z" fill="#fca5a5" /></marker>
        <marker id="nvl3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#22c55e" /></marker>
        <marker id="nvl4" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#22c55e" /></marker>
      </defs>
    </svg>
  );
}
