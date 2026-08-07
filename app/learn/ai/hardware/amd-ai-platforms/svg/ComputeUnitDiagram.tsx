"use client";
export default function ComputeUnitDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cu-title">
      <title id="cu-title">GPU Compute Unit (CU) internal architecture: 4 groups of 32 Parallel Math Units (SIMD32) handle regular calculations. AI Math Engine (Matrix Core hardware) handles dedicated matrix multiply. Fast Shared Memory (LDS 64KB) is the team whiteboard. Task Scheduler (Wavefront Scheduler) decides what runs next. Private Working Memory (Vector Registers 256KB) stores per-thread data. Cache (L1 16KB) is the automatic fast buffer.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU COMPUTE UNIT (CU) — AMD's Main Processing Block</text>
      <text x="410" y="34" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">MI300X has 304 of these Compute Units, all working at the same time. This is what's inside ONE of them.</text>

      {/* CU boundary */}
      <rect x="20" y="44" width="780" height="264" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />

      {/* Task Scheduler */}
      <rect x="32" y="54" width="756" height="38" rx="6" fill="#4c1d95" />
      <text x="410" y="70" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">Task Scheduler — Chooses What Runs Next</text>
      <text x="410" y="84" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#c4b5fd" textAnchor="middle">(Wavefront Scheduler) · Picks which 64-thread group executes next · Hides memory wait time by switching tasks · 4 schedulers per CU</text>

      {/* 4 SIMD32 units */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={32 + i * 192} y={100} width={184} height={72} rx="6" fill="#2563eb" />
          <text x={32 + i * 192 + 92} y={122} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">32 Parallel Math Units</text>
          <text x={32 + i * 192 + 92} y={136} fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">(SIMD32 Unit {i + 1})</text>
          <text x={32 + i * 192 + 92} y={150} fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">32 ops/cycle · FP32 math</text>
          <text x={32 + i * 192 + 92} y={163} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bfdbfe" textAnchor="middle">Activation functions, normalization</text>
        </g>
      ))}

      {/* AI Math Engine */}
      <rect x="32" y="182" width="370" height="70" rx="6" fill="#7c3aed" />
      <text x="217" y="203" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Math Engine</text>
      <text x="217" y="217" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">(Matrix Core — Dedicated Matrix Multiply Hardware)</text>
      <text x="217" y="231" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">D = A × B + C in one operation · FP8/BF16/FP16/INT8</text>
      <text x="217" y="244" fontFamily="Arial,sans-serif" fontSize="7" fill="#fbbf24" textAnchor="middle">This is what makes AMD GPUs fast at AI training</text>

      {/* Fast Shared Memory */}
      <rect x="414" y="182" width="374" height="70" rx="6" fill="#059669" />
      <text x="601" y="203" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#fff" textAnchor="middle">Fast Shared Memory — Team Whiteboard</text>
      <text x="601" y="217" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#a7f3d0" textAnchor="middle">(Local Data Share — LDS · 64 KB per CU)</text>
      <text x="601" y="231" fontFamily="Arial,sans-serif" fontSize="7" fill="#6ee7b7" textAnchor="middle">All threads in a block share this · ~1 cycle access</text>
      <text x="601" y="244" fontFamily="Arial,sans-serif" fontSize="7" fill="#a7f3d0" textAnchor="middle">Programmer controls it · Used for tiling optimization</text>

      {/* Private Working Memory */}
      <rect x="32" y="262" width="490" height="36" rx="5" fill="#ca8a04" />
      <text x="277" y="277" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Private Working Memory — Each Thread's Notepad</text>
      <text x="277" y="291" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">(Vector Registers · 256 KB per CU) · Zero latency · Thread-private · Spill to slow memory if overflow</text>

      {/* L1 Cache */}
      <rect x="534" y="262" width="254" height="36" rx="5" fill="#0891b2" />
      <text x="661" y="277" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">Automatic Fast Buffer</text>
      <text x="661" y="291" fontFamily="Arial,sans-serif" fontSize="7" fill="#cffafe" textAnchor="middle">(L1 Cache · 16 KB) · Hardware-managed · Stores frequent data</text>
    </svg>
  );
}
