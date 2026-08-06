"use client";
export default function LlmTrainingPipeline() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ltp-title">
      <title id="ltp-title">LLM Training Pipeline: Data Collection to Pretraining to SFT to Alignment to Serving</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">LLM TRAINING PIPELINE</text>

      {[
        { step: "1", label: "Data Collection", sub: "Web crawl · Books · Code\nDedup · Quality filter\nPII scrub · Tokenize", color: "#475569", bg: "#f1f5f9" },
        { step: "2", label: "Pretraining", sub: "Next token prediction\n15T+ tokens · Weeks-months\nH100 cluster · NCCL all-reduce", color: "#2563eb", bg: "#dbeafe" },
        { step: "3", label: "SFT / Instruction", sub: "Instruction-response pairs\nFew thousand examples\nHours on GPU cluster", color: "#7c3aed", bg: "#ede9fe" },
        { step: "4", label: "Alignment\nRLHF / DPO", sub: "Human preferences\nPPO/DPO/ORPO/IPO\nHarmless, honest, helpful", color: "#dc2626", bg: "#fef2f2" },
        { step: "5", label: "Evaluation", sub: "MMLU · HumanEval\nHarm eval · Red-team\nInternal benchmarks", color: "#ca8a04", bg: "#fef9c3" },
        { step: "6", label: "Serving", sub: "Quantize · Deploy\nvLLM / TRT-LLM\nMonitor · Iterate", color: "#16a34a", bg: "#dcfce7" },
      ].map((s, i, arr) => (
        <g key={i}>
          <rect x={20 + i * 133} y="48" width="123" height="104" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1.5" />
          <circle cx={20 + i * 133 + 20} cy="66" r="13" fill={s.color} />
          <text x={20 + i * 133 + 20} y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="800" fill="#fff" textAnchor="middle">{s.step}</text>
          <text x={20 + i * 133 + 62} y="77" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label.split("\n")[0]}</text>
          {s.label.includes("\n") && <text x={20 + i * 133 + 62} y="90" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.color} textAnchor="middle">{s.label.split("\n")[1]}</text>}
          {s.sub.split("\n").map((line, li) => (
            <text key={li} x={20 + i * 133 + 62} y={104 + li * 13} fontFamily="Arial,sans-serif" fontSize="8" fill={s.color} textAnchor="middle">{line}</text>
          ))}
          {i < arr.length - 1 && (
            <line x1={145 + i * 133} y1="100" x2={148 + i * 133} y2="100" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ltp1)" />
          )}
        </g>
      ))}

      {/* Infrastructure strip */}
      <rect x="20" y="168" width="780" height="88" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="410" y="186" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">AI TRAINING INFRASTRUCTURE</text>
      {[
        { label: "Compute", sub: "16,000+ H100 GPUs\nFP8 / BF16 precision\nTensor Cores", x: 50 },
        { label: "Networking", sub: "InfiniBand NDR 400G\nNon-blocking fat-tree\nNCCL all-reduce", x: 215 },
        { label: "Storage", sub: "Parallel FS (Lustre/Weka)\n100+ GB/s throughput\nCheckpoint every 30 min", x: 390 },
        { label: "Training Framework", sub: "PyTorch FSDP\nDeepSpeed ZeRO\nMegatron-LM", x: 565 },
        { label: "Monitoring", sub: "DCGM · Loss curves\nGradient norms\n24/7 team on-call", x: 710 },
      ].map((t) => (
        <g key={t.label}>
          <text x={t.x + 50} y="204" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7dd3fc" textAnchor="middle">{t.label}</text>
          {t.sub.split("\n").map((line, li) => (
            <text key={li} x={t.x + 50} y={219 + li * 13} fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      <defs>
        <marker id="ltp1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
