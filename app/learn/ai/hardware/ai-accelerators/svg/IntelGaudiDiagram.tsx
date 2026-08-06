"use client";
export default function IntelGaudiDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ig-title">
      <title id="ig-title">Intel Gaudi 3 architecture: MME (Matrix Math Engine), TPC clusters (Tensor Processing Cores for custom ops), 96GB HBM2e memory, RoCE 2.0 network for multi-chip scale-out. Compared to NVIDIA H100: similar peak performance, open networking (no proprietary NVLink), lower ecosystem maturity.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">INTEL GAUDI 3 — H100 Alternative with Open Networking</text>

      {/* Chip left */}
      <rect x="20" y="36" width="460" height="228" rx="10" fill="#eff6ff" stroke="#0284c7" strokeWidth="2" />
      <text x="250" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e3a5f" textAnchor="middle">Gaudi 3 Chip Architecture</text>

      <rect x="34" y="64" width="200" height="80" rx="8" fill="#0284c7" />
      <text x="134" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">MME</text>
      <text x="134" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">Matrix Math Engine</text>
      <text x="134" y="116" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e0f2fe" textAnchor="middle">BF16/FP16/INT8 compute</text>
      <text x="134" y="129" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e0f2fe" textAnchor="middle">Equivalent to GPU Tensor Core</text>

      <rect x="244" y="64" width="222" height="80" rx="8" fill="#0369a1" />
      <text x="355" y="88" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">TPC Clusters</text>
      <text x="355" y="103" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">(Tensor Processing Cores)</text>
      <text x="355" y="116" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e0f2fe" textAnchor="middle">Programmable — custom AI ops</text>
      <text x="355" y="129" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e0f2fe" textAnchor="middle">Like CUDA cores but for Gaudi</text>

      <rect x="34" y="154" width="432" height="36" rx="6" fill="#1d4ed8" />
      <text x="250" y="170" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">HBM2e — 96 GB (vs H100 80 GB HBM3)</text>
      <text x="250" y="183" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">3.7 TB/s bandwidth · Model weights + activations storage</text>

      <rect x="34" y="200" width="432" height="30" rx="6" fill="#1e40af" />
      <text x="250" y="215" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">RoCE 2.0 Networking — 21 × 200 GbE per chip</text>
      <text x="250" y="228" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">Open standard networking (no proprietary NVLink) · Scale to hundreds of Gaudi chips</text>

      {/* Right: vs H100 */}
      <rect x="500" y="36" width="300" height="228" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="650" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e3a5f" textAnchor="middle">Gaudi 3 vs NVIDIA H100</text>
      {[
        ["Property", "Gaudi 3", "H100 SXM5"],
        ["Memory", "96 GB HBM2e", "80 GB HBM3"],
        ["BF16 TFLOPS", "~1,835", "~1,979"],
        ["Interconnect", "RoCE 2.0 (open)", "NVLink 4.0 (proprietary)"],
        ["Software", "SynapseAI SDK", "CUDA (huge ecosystem)"],
        ["On-premises", "Yes — Supermicro etc", "Yes — DGX, HGX"],
        ["Price (approx)", "Lower list price", "Higher list price"],
        ["Ecosystem", "Growing", "Dominant, mature"],
      ].map((r, i) => (
        <g key={i}>
          <rect x="510" y={65 + i * 25} width="280" height="21" rx="3" fill={i === 0 ? "#0284c7" : i % 2 === 0 ? "#f1f5f9" : "#fff"} />
          <text x="518" y={79 + i * 25} fontFamily="Arial,sans-serif" fontSize={i === 0 ? 7.5 : 7} fontWeight={i === 0 ? "700" : "400"} fill={i === 0 ? "#fff" : "#334155"}>{r[0]}</text>
          <text x="630" y={79 + i * 25} fontFamily="Arial,sans-serif" fontSize="7" fill={i === 0 ? "#fff" : "#0284c7"}>{r[1]}</text>
          <text x="755" y={79 + i * 25} fontFamily="Arial,sans-serif" fontSize="7" fill={i === 0 ? "#fff" : "#16a34a"} textAnchor="end">{r[2]}</text>
        </g>
      ))}
    </svg>
  );
}
