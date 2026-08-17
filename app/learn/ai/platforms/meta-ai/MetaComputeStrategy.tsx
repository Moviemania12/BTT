"use client";
export default function MetaComputeStrategy() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mcs-title">
      <title id="mcs-title">Meta Heterogeneous Compute Strategy (Illustrative — publicly documented workload examples; exact current workload-to-hardware assignments are not fully disclosed). Three accelerator types used simultaneously. NVIDIA GPUs: publicly documented for large-scale Llama training and other AI workloads; H100/H200 class publicly documented for 24K GPU clusters (RoCEv2 and InfiniBand variants both documented). AMD GPUs: training workloads, vendor diversification, workload fit; publicly documented in Meta clusters. MTIA (Meta Training and Inference Accelerator): Meta custom silicon; MTIA 100/200 production; MTIA 300 production for R&R training; MTIA 400 deployment underway with 72-accelerator scale-up and AALC support; MTIA 450: mass deployment targeted early 2027; MTIA 500: mass deployment targeted 2027. MTIA covers R&R inference/training and GenAI inference workloads. Hundreds of thousands deployed. All three feed into Meta AI workloads. Based on publicly available Meta Engineering information.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">META HETEROGENEOUS COMPUTE STRATEGY</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Three accelerator types simultaneously — illustrative workload examples; exact assignments not fully publicly disclosed</text>

      {/* Three compute boxes */}
      <rect x="14" y="48" width="240" height="120" rx="7" fill="#1a1a2e" stroke="#76b900" strokeWidth="2" />
      <text x="134" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#76b900" textAnchor="middle">NVIDIA GPUs</text>
      <text x="134" y="86" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">H100/H200 — publicly documented</text>
      <text x="134" y="100" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Large-scale Llama training</text>
      <text x="134" y="113" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• GenAI / LLM inference</text>
      <text x="134" y="126" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• TWO 24K clusters: RoCEv2 + IB</text>
      <text x="134" y="139" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• ~129K GPU scale in future plans</text>
      <text x="134" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Grand Teton / OpenRack</text>
      <text x="134" y="163" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• 900 GB/s NVLink per GPU (H100)</text>

      <rect x="290" y="48" width="240" height="120" rx="7" fill="#1a1a2e" stroke="#ed1c24" strokeWidth="2" />
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#ed1c24" textAnchor="middle">AMD GPUs</text>
      <text x="410" y="86" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Instinct MI series — publicly documented</text>
      <text x="410" y="100" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Training workloads</text>
      <text x="410" y="113" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Vendor diversification</text>
      <text x="410" y="126" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Workload fit</text>
      <text x="410" y="139" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• ROCm / PyTorch stack</text>
      <text x="410" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Reduced single-vendor dependence</text>
      <text x="410" y="163" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Heterogeneous fleet</text>

      <rect x="566" y="48" width="240" height="120" rx="7" fill="#1a1a2e" stroke="#0866ff" strokeWidth="2" />
      <text x="686" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0866ff" textAnchor="middle">MTIA (Custom Silicon)</text>
      <text x="686" y="86" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Meta Training &amp; Inference Accelerator</text>
      <text x="686" y="100" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• MTIA 100/200: Production</text>
      <text x="686" y="113" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• MTIA 300: Production (R&amp;R training)</text>
      <text x="686" y="126" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• MTIA 400: Deployment underway (AALC)</text>
      <text x="686" y="139" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• MTIA 450: early 2027 target; MTIA 500: 2027 target</text>
      <text x="686" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• R&amp;R inference/training + GenAI</text>
      <text x="686" y="163" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">• Hundreds of thousands deployed</text>

      {/* Arrows down */}
      {[134, 410, 686].map(x => (
        <line key={x} x1={x} y1={168} x2={x} y2={188} stroke="#475569" strokeWidth="1.5" markerEnd="url(#mcs-ar)" />
      ))}

      {/* Bottom workloads */}
      <rect x="14" y="188" width="792" height="55" rx="7" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <text x="410" y="207" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#e2e8f0" textAnchor="middle">Meta AI Workloads — Illustrative Examples</text>
      <text x="185" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Llama Training → publicly documented NVIDIA/AMD examples</text>
      <text x="410" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Meta AI (Muse Spark) → exact current hardware not publicly disclosed</text>
      <text x="640" y="222" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Rec/Ranking/Ads → publicly documented MTIA/CPU examples</text>
      <text x="410" y="233" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#475569" textAnchor="middle">Exact current workload-to-hardware assignments not fully publicly disclosed — verify at engineering.fb.com</text>

      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Illustrative educational diagram based on publicly available Meta Engineering information</text>

      <defs>
        <marker id="mcs-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#475569" /></marker>
      </defs>
    </svg>
  );
}
