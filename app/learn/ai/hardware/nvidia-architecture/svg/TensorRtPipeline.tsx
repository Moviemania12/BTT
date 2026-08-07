"use client";
export default function TensorRtPipeline() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="trt-title">
      <title id="trt-title">TensorRT Inference Optimization Pipeline: PyTorch Model (FP32, slow) → ONNX Export (framework-independent) → TensorRT Engine Build (graph optimization: fuse Conv+BN+ReLU, precision calibration to INT8/FP8, kernel auto-tuning for target GPU) → Optimized TensorRT Engine → Fast Production Inference. Typical speedup: 3-8x vs PyTorch eager. Memory also reduces proportionally.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">TENSORRT OPTIMIZATION PIPELINE — From Slow PyTorch to Fast Production Inference</text>

      {/* Stage 1: PyTorch */}
      <rect x="20" y="32" width="140" height="200" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="90" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">PyTorch Model</text>
      <text x="90" y="70" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">(Starting Point)</text>
      <rect x="30" y="78" width="120" height="100" rx="5" fill="#e2e8f0" />
      <text x="90" y="108" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">model.py</text>
      <text x="90" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">FP32 weights</text>
      <text x="90" y="136" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Unoptimized</text>
      <text x="90" y="150" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">graph ops</text>
      <text x="90" y="170" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">1× baseline</text>
      <text x="90" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">torch.save(model)</text>
      <line x1="162" y1="132" x2="182" y2="132" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#trt-ar)" />

      {/* Stage 2: ONNX */}
      <rect x="184" y="32" width="140" height="200" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="254" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">ONNX Export</text>
      <text x="254" y="70" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">(Neutral Format)</text>
      <rect x="194" y="78" width="120" height="100" rx="5" fill="#fed7aa" />
      <text x="254" y="108" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">model.onnx</text>
      <text x="254" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Framework-neutral</text>
      <text x="254" y="136" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Graph exported</text>
      <text x="254" y="150" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Ops as nodes</text>
      <text x="254" y="170" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">torch.onnx.export()</text>
      <line x1="326" y1="132" x2="346" y2="132" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#trt-ar2)" />

      {/* Stage 3: TRT Build — big */}
      <rect x="348" y="28" width="234" height="208" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="465" y="50" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">TensorRT Engine Build</text>
      <text x="465" y="64" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#818cf8" textAnchor="middle">(One-time, 10–30 min per model)</text>

      {[
        { label: "Graph Optimization", desc: "Remove dead ops, constant folding" },
        { label: "Layer Fusion", desc: "Conv+BN+ReLU → single kernel" },
        { label: "Precision Calibration", desc: "FP32 → INT8/FP8, calibration data" },
        { label: "Kernel Auto-Tuning", desc: "Benchmark best kernel per shape+GPU" },
        { label: "Memory Optimization", desc: "Tensor buffer reuse planning" },
      ].map((opt, i) => (
        <g key={opt.label}>
          <rect x="356" y={72 + i * 30} width="218" height="24" rx="4" fill="rgba(124,58,237,0.3)" />
          <text x="366" y={84 + i * 30} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#c4b5fd">{opt.label}</text>
          <text x="366" y={90 + i * 30} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#818cf8">{opt.desc}</text>
        </g>
      ))}
      <text x="465" y="220" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">Result: .engine file (GPU-specific)</text>
      <line x1="584" y1="132" x2="604" y2="132" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#trt-ar3)" />

      {/* Stage 4: Deployed engine */}
      <rect x="606" y="32" width="200" height="200" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="706" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">TensorRT Inference</text>
      <text x="706" y="70" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">(Production Deployment)</text>
      <rect x="616" y="78" width="180" height="100" rx="5" fill="#22c55e" />
      <text x="706" y="108" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Optimized Engine</text>
      <text x="706" y="122" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">GPU-specific binary</text>
      <text x="706" y="136" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">Best kernels selected</text>
      <text x="706" y="150" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">INT8 / FP8 precision</text>
      <text x="706" y="164" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="800" fill="#fbbf24" textAnchor="middle">3–8× FASTER!</text>
      <text x="706" y="194" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#16a34a" textAnchor="middle">Lower latency · Less memory</text>
      <text x="706" y="224" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">trt_runtime.run(batch)</text>

      {/* Bottom bar */}
      <rect x="20" y="240" width="786" height="32" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="252" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#334155" textAnchor="middle">Speedup by stage: PyTorch FP32 (1×) → PyTorch BF16 (1.5×) → TRT FP32 (2×) → TRT BF16 (3×) → TRT INT8 (5–6×) → TRT FP8 H100 (7–8×)</text>
      <text x="410" y="266" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Note: Build engine once per GPU model (H100 engine won&apos;t work on A100). Always test on TARGET GPU. Use Triton Inference Server for production multi-model serving.</text>

      <defs>
        <marker id="trt-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="trt-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#f97316" /></marker>
        <marker id="trt-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
