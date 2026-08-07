"use client";
export default function SmInternalDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sm-title">
      <title id="sm-title">SM (Streaming Multiprocessor) internal architecture: 4 Warp Schedulers select warps each cycle. 128 CUDA Cores do general floating point math. 4 Tensor Cores do matrix multiply (AI math). 1 RT Core does ray tracing. 32 Special Function Units for sin/cos/sqrt. Shared Memory is fast team memory. Register File is private per-thread storage. Load/Store Units handle memory operations.</title>
      <rect width="820" height="340" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">SM (Streaming Multiprocessor) — Where Your Code Actually Runs</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">H100 has 132 SMs. Each SM runs many threads simultaneously. This is one SM internals.</text>

      {/* SM boundary */}
      <rect x="20" y="40" width="780" height="288" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />

      {/* Warp Schedulers - top */}
      <rect x="30" y="50" width="760" height="44" rx="6" fill="#4c1d95" />
      <text x="410" y="67" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">4 WARP SCHEDULERS — Pick which 32-thread group runs each clock cycle</text>
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c4b5fd" textAnchor="middle">Each scheduler independently selects a ready warp · Can hide memory latency by switching to another warp · H100: 4 schedulers = 4 warps dispatched per cycle</text>

      {/* CUDA Cores block */}
      <rect x="30" y="102" width="370" height="100" rx="6" fill="#2563eb" />
      <text x="215" y="120" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">CUDA Cores (128 per SM)</text>
      <text x="215" y="134" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">FP32 ALU — 1 operation per core per cycle</text>
      <text x="215" y="147" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">Handles: activation functions (ReLU, GELU)</text>
      <text x="215" y="160" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">normalization, element-wise ops, INT32</text>
      <text x="215" y="175" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">Think: general calculator, one op at a time</text>
      <text x="215" y="192" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24" textAnchor="middle">128 cores × 1 op/cycle = 128 ops/cycle</text>

      {/* Tensor Cores block */}
      <rect x="412" y="102" width="186" height="100" rx="6" fill="#7c3aed" />
      <text x="505" y="120" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Tensor Cores (4)</text>
      <text x="505" y="134" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">D = A×B + C matrix op</text>
      <text x="505" y="148" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">4×4 matrix per clock</text>
      <text x="505" y="162" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">FP8/BF16/FP16/TF32</text>
      <text x="505" y="176" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">THE AI engine</text>
      <text x="505" y="193" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24" textAnchor="middle">128 ops/cycle each!</text>

      {/* RT Core + SFU */}
      <rect x="608" y="102" width="182" height="100" rx="6" fill="#0891b2" />
      <text x="699" y="120" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">RT Core (1)</text>
      <text x="699" y="134" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">Ray-triangle intersection</text>
      <text x="699" y="147" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">BVH traversal (graphics)</text>
      <text x="699" y="162" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">SFU (32 units)</text>
      <text x="699" y="176" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">sin, cos, sqrt, rcp</text>
      <text x="699" y="192" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">Special math functions</text>

      {/* Shared memory */}
      <rect x="30" y="212" width="460" height="50" rx="6" fill="#16a34a" />
      <text x="260" y="232" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Shared Memory / L1 Cache — 256 KB (configurable split)</text>
      <text x="260" y="247" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bbf7d0" textAnchor="middle">All threads in a block share this · ~1 cycle latency · programmer-managed (shared mem) or auto (L1) · Fast team whiteboard</text>
      <text x="260" y="258" fontFamily="Arial,sans-serif" fontSize="7" fill="#86efac" textAnchor="middle">Tiling technique: load data once here, reuse many times — eliminates slow HBM trips</text>

      {/* Register file */}
      <rect x="502" y="212" width="308" height="50" rx="6" fill="#ca8a04" />
      <text x="656" y="232" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Register File — 256 KB (per SM)</text>
      <text x="656" y="247" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fef9c3" textAnchor="middle">65,536 registers per SM · Private to each thread · Zero latency · Like desk notepad</text>
      <text x="656" y="258" fontFamily="Arial,sans-serif" fontSize="7" fill="#fde68a" textAnchor="middle">Register spill → local memory (slow!) → minimize variables per thread</text>

      {/* Load/Store Units */}
      <rect x="30" y="272" width="760" height="46" rx="6" fill="#1e293b" />
      <text x="410" y="290" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">Load/Store Units (LSU) — Handle all memory operations</text>
      <text x="410" y="306" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#94a3b8" textAnchor="middle">Requests from threads → routed to: Shared Memory (fast) or L2 Cache (medium) or HBM (slow, ~200 cycles) · Coalesced access pattern = fastest</text>
      <text x="410" y="317" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Coalescing: 32 threads accessing 32 consecutive addresses = 1 memory transaction (fast). Random addresses = 32 separate transactions (slow).</text>
    </svg>
  );
}
