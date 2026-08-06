"use client";
export default function TensorCoreDiagram() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tc-title">
      <title id="tc-title">Tensor Core vs CUDA Core: CUDA Core does one multiplication at a time, Tensor Core does an entire matrix multiply in one operation — much more efficient for AI</title>
      <rect width="820" height="290" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CUDA CORE vs TENSOR CORE — AI Math Speed</text>

      {/* CUDA Core side */}
      <rect x="20" y="36" width="370" height="240" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">CUDA Core — One at a Time</text>
      <text x="205" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Like multiplying numbers one by one</text>

      {/* Sequence of operations */}
      {[
        "Step 1: 2 × 3 = 6",
        "Step 2: 4 × 5 = 20",
        "Step 3: 1 × 7 = 7",
        "Step 4: 8 × 2 = 16",
        "... repeat thousands of times",
        "for each matrix operation",
      ].map((t, i) => (
        <g key={i}>
          <rect x="36" y={84 + i*28} width="298" height="22" rx="4" fill={i < 4 ? "#2563eb" : "#e2e8f0"} />
          <text x="185" y={99 + i*28} fontFamily="Arial,sans-serif" fontSize="8" fontWeight={i < 4 ? "700" : "400"} fill={i < 4 ? "#fff" : "#94a3b8"} textAnchor="middle">{t}</text>
        </g>
      ))}
      <text x="205" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Best for: activation functions, softmax, general compute</text>
      <text x="205" y="273" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#dc2626" textAnchor="middle">Not efficient for large matrix multiplications</text>

      {/* Arrow between */}
      <text x="410" y="162" fontFamily="Arial,sans-serif" fontSize="20" fill="#94a3b8" textAnchor="middle">vs</text>

      {/* Tensor Core side */}
      <rect x="430" y="36" width="370" height="240" rx="10" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="615" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">Tensor Core — Whole Matrix at Once</text>
      <text x="615" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Specialized matrix multiplication hardware</text>

      {/* Matrix visualization */}
      <text x="476" y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e">Matrix A</text>
      {Array.from({length:9}).map((_,i) => (
        <rect key={i} x={450 + (i%3)*30} y={96 + Math.floor(i/3)*28} width="26" height="24" rx="3" fill="#f59e0b" />
      ))}
      <text x="570" y="116" fontFamily="Arial,sans-serif" fontSize="14" fill="#92400e" textAnchor="middle">×</text>
      <text x="596" y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e">Matrix B</text>
      {Array.from({length:9}).map((_,i) => (
        <rect key={i} x={580 + (i%3)*30} y={96 + Math.floor(i/3)*28} width="26" height="24" rx="3" fill="#fbbf24" />
      ))}
      <text x="701" y="116" fontFamily="Arial,sans-serif" fontSize="14" fill="#92400e" textAnchor="middle">=</text>
      <text x="728" y="92" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#92400e">Result</text>
      {Array.from({length:9}).map((_,i) => (
        <rect key={i} x={712 + (i%3)*30} y={96 + Math.floor(i/3)*28} width="26" height="24" rx="3" fill="#16a34a" />
      ))}

      <rect x="444" y="188" width="352" height="28" rx="6" fill="#ca8a04" />
      <text x="620" y="206" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Entire matrix multiply = single hardware operation</text>

      <text x="615" y="230" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Actual speedup depends on: architecture, matrix size,</text>
      <text x="615" y="243" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">precision (FP8/FP16/BF16), and workload type</text>
      <text x="615" y="260" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">H100: ~3,958 TFLOPS FP8 (sparse) vs 67 TFLOPS FP32</text>
      <text x="615" y="273" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Best for: neural network layers, attention, linear transforms</text>
    </svg>
  );
}
