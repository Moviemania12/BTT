"use client";
export default function HbmMemoryDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hbm-title">
      <title id="hbm-title">HBM Fast GPU Memory is stacked directly next to the GPU chip giving 3.35 TB/s bandwidth, compared to regular system RAM at 100 GB/s that sits far away on the motherboard</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU MEMORY — HBM vs Regular System RAM</text>

      {/* GPU Server setup without HBM (old way) */}
      <rect x="20" y="36" width="370" height="250" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="205" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Regular RAM (DDR) — Old Approach</text>
      <text x="205" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#7f1d1d" textAnchor="middle">Memory far away from the GPU chip</text>

      {/* Motherboard */}
      <rect x="36" y="82" width="338" height="80" rx="6" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
      <text x="205" y="100" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">Motherboard (PCB)</text>
      <rect x="44" y="106" width="70" height="48" rx="4" fill="#dc2626" />
      <text x="79" y="133" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">GPU Chip</text>
      {[1,2,3].map(i => (
        <g key={i}>
          <rect x={120 + i*68} y="106" width="56" height="48" rx="4" fill="#b91c1c" />
          <text x={148 + i*68} y="133" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">DDR{i}</text>
        </g>
      ))}

      {/* Long path line */}
      <line x1="118" y1="130" x2="122" y2="130" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
      <line x1="118" y1="130" x2="310" y2="130" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
      <text x="205" y="178" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Data travels long distance across PCB traces</text>

      <rect x="36" y="192" width="338" height="40" rx="6" fill="#dc2626" />
      <text x="205" y="208" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Bandwidth: ~100 GB/s</text>
      <text x="205" y="224" fontFamily="Arial,sans-serif" fontSize="8" fill="#fecaca" textAnchor="middle">Bottleneck for AI — GPU starves waiting for data</text>

      <text x="205" y="265" fontFamily="Arial,sans-serif" fontSize="8" fill="#7f1d1d" textAnchor="middle">Bus width: 32-bit per channel (narrow road)</text>
      <text x="205" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#7f1d1d" textAnchor="middle">Memory latency present but bandwidth is primary issue</text>

      {/* HBM side */}
      <rect x="430" y="36" width="370" height="250" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">HBM — Fast GPU Memory</text>
      <text x="615" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Stacked directly next to the GPU chip in same package</text>

      {/* HBM package */}
      <rect x="446" y="82" width="338" height="100" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="615" y="98" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">One Integrated Package (GPU + HBM together)</text>

      {/* GPU die */}
      <rect x="454" y="104" width="100" height="70" rx="6" fill="#16a34a" />
      <text x="504" y="134" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">GPU</text>
      <text x="504" y="147" fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">Chip</text>
      <text x="504" y="159" fontFamily="Arial,sans-serif" fontSize="6" fill="#bbf7d0" textAnchor="middle">(die)</text>

      {/* HBM stacks */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          {[0,1,2,3].map(j => (
            <rect key={j} x={568 + i*48} y={104 + j*16} width="40" height="13" rx="2" fill={j === 0 ? "#14532d" : "#22c55e"} />
          ))}
          <text x={588 + i*48} y={178} fontFamily="Arial,sans-serif" fontSize="6" fill="#14532d" textAnchor="middle">HBM {i+1}</text>
          <text x={588 + i*48} y={188} fontFamily="Arial,sans-serif" fontSize="6" fill="#166534" textAnchor="middle">Stack</text>
        </g>
      ))}

      {/* TSV connections */}
      <text x="615" y="202" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Connected via microscopic vertical wires (Through-Silicon Vias)</text>

      <rect x="446" y="214" width="338" height="40" rx="6" fill="#16a34a" />
      <text x="615" y="230" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Bandwidth: 3.35 TB/s (H100 HBM3)</text>
      <text x="615" y="246" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">Primary advantage: extremely high memory bandwidth</text>

      <text x="615" y="265" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Bus width: 1024-bit per HBM stack (ultra-wide road)</text>
      <text x="615" y="278" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">H100: 80GB capacity · B200: 192GB HBM3e</text>
    </svg>
  );
}
