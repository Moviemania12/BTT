"use client";
export default function MemoryComparisonDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mem-title">
      <title id="mem-title">Memory comparison: NVIDIA H100 has 80GB HBM3 at 3.35 TB/s — a 70B model at FP16 (140GB) does NOT fit. AMD MI300X has 192GB HBM3 at 5.3 TB/s — same 70B model fits with 52GB to spare. AMD has 2.4x more memory capacity and 1.6x more bandwidth. Note: peak AI throughput is measured differently by AMD and NVIDIA — memory capacity alone does not determine overall performance.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MEMORY CAPACITY COMPARISON — Why More Memory Matters for Large AI Models</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">More memory = fit larger AI models on fewer cards = simpler deployment, less data transfer between cards</text>

      {/* H100 card */}
      <rect x="60" y="46" width="280" height="200" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="200" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">NVIDIA H100</text>

      {/* H100 memory bar */}
      <rect x="80" y="80" width="240" height="80" rx="6" fill="#16a34a" />
      <text x="200" y="110" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="800" fill="#fff" textAnchor="middle">80 GB</text>
      <text x="200" y="127" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">Ultra-Fast Memory (HBM3)</text>
      <text x="200" y="141" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">3.35 TB/s speed</text>

      {/* H100 model fit */}
      <rect x="80" y="170" width="240" height="38" rx="5" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="187" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">70B Model at FP16 = 140 GB</text>
      <text x="200" y="201" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">DOES NOT FIT ❌ — Need 2 cards</text>

      {/* MI300X card */}
      <rect x="480" y="46" width="280" height="200" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="620" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">AMD MI300X</text>

      {/* MI300X memory bar — 2.4x taller */}
      <rect x="500" y="80" width="240" height="80" rx="6" fill="#7c3aed" />
      <text x="620" y="106" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="800" fill="#fff" textAnchor="middle">192 GB</text>
      <text x="620" y="123" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">Ultra-Fast Memory (HBM3)</text>
      <text x="620" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">5.3 TB/s speed · 2.4× more than H100</text>

      {/* MI300X model fit */}
      <rect x="500" y="170" width="240" height="38" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="620" y="187" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">70B Model at FP16 = 140 GB</text>
      <text x="620" y="201" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">FITS ✓ with 52 GB spare for KV cache</text>

      {/* Center comparison */}
      <text x="410" y="128" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#0f172a" textAnchor="middle">2.4×</text>
      <text x="410" y="143" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">more memory</text>

      {/* Important note */}
      <rect x="60" y="254" width="700" height="22" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
      <text x="410" y="269" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#7c2d12" textAnchor="middle">
        ⚠ Note: Peak AI throughput is measured differently by AMD and NVIDIA. Memory capacity alone should not be used for performance evaluation.
      </text>
    </svg>
  );
}
