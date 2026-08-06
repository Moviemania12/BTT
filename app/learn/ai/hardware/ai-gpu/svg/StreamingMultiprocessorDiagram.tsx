"use client";
export default function StreamingMultiprocessorDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sm-title">
      <title id="sm-title">One Work Unit (SM): contains CUDA Cores for general math, Tensor Cores for AI matrix operations, Warp Schedulers that manage groups of 32 threads, Registers for fast temporary storage, and Shared Memory</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ONE WORK UNIT (SM — Streaming Multiprocessor)</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">H100: 132 of these units in one GPU chip</text>

      <rect x="20" y="48" width="780" height="278" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />

      {/* Work Manager (Warp Schedulers) */}
      <rect x="36" y="62" width="180" height="248" rx="8" fill="#1e40af" />
      <text x="126" y="82" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Work Manager</text>
      <text x="126" y="96" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">(Warp Scheduler)</text>
      <text x="126" y="112" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">Assigns groups of 32</text>
      <text x="126" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">threads (Warps) to cores</text>
      <text x="126" y="140" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">SIMT: all 32 threads in</text>
      <text x="126" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">a Warp run same</text>
      <text x="126" y="164" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">instruction together</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="48" y={182 + i*28} width="156" height="22" rx="4" fill="#2563eb" />
          <text x="126" y={196 + i*28} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Warp Scheduler {i+1}</text>
        </g>
      ))}

      {/* CUDA Cores */}
      <rect x="232" y="62" width="200" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="332" y="80" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">CUDA Cores (General Math)</text>
      <text x="332" y="93" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Lightweight arithmetic units — NOT like CPU cores</text>
      <text x="332" y="105" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">FP32, FP64, integer operations</text>
      {Array.from({length: 32}).map((_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return <rect key={i} x={240 + col*24} y={112 + row*14} width="20" height="11" rx="2" fill="#2563eb" />;
      })}
      <text x="332" y="174" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">128 CUDA Cores per SM (H100)</text>

      {/* Tensor Cores */}
      <rect x="448" y="62" width="200" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="548" y="80" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Tensor Cores (AI Matrix Math)</text>
      <text x="548" y="93" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Specialized matrix multiply hardware</text>
      <text x="548" y="105" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">FP8 · FP16 · BF16 · TF32 · INT8</text>
      {Array.from({length: 4}).map((_, i) => (
        <g key={i}>
          <rect x={456 + (i % 2)*90} y={112 + Math.floor(i/2)*34} width="80" height="28" rx="4" fill="#f59e0b" />
          <text x={496 + (i % 2)*90} y={129 + Math.floor(i/2)*34} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#451a03" textAnchor="middle">Tensor Core {i+1}</text>
        </g>
      ))}
      <text x="548" y="174" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">4 Tensor Core units per SM (H100)</text>

      {/* Registers + Shared Memory */}
      <rect x="664" y="62" width="128" height="120" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="728" y="80" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">Fast Storage</text>
      <rect x="672" y="88" width="112" height="28" rx="4" fill="#7c3aed" />
      <text x="728" y="100" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Register File</text>
      <text x="728" y="111" fontFamily="Arial,sans-serif" fontSize="7" fill="#ede9fe" textAnchor="middle">Per-thread temp storage</text>
      <rect x="672" y="122" width="112" height="28" rx="4" fill="#7c3aed" />
      <text x="728" y="134" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Shared Memory</text>
      <text x="728" y="145" fontFamily="Arial,sans-serif" fontSize="7" fill="#ede9fe" textAnchor="middle">Shared within one SM</text>
      <rect x="672" y="156" width="112" height="20" rx="4" fill="#5b21b6" />
      <text x="728" y="169" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#ede9fe" textAnchor="middle">L1 Cache</text>

      {/* Bottom row — L2 cache */}
      <rect x="232" y="196" width="560" height="116" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="512" y="214" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">Shared Across All SMs</text>
      <rect x="244" y="220" width="256" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
      <text x="372" y="240" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e293b" textAnchor="middle">L2 Cache (40MB on H100)</text>
      <text x="372" y="256" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Fast on-chip storage shared</text>
      <text x="372" y="269" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">across all Streaming Multiprocessors</text>
      <rect x="528" y="220" width="252" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
      <text x="654" y="240" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e293b" textAnchor="middle">GPU Memory (HBM3)</text>
      <text x="654" y="256" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Fast GPU Memory (80GB on H100)</text>
      <text x="654" y="269" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">3.35 TB/s bandwidth</text>
      <text x="654" y="282" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">All active weights stored here</text>

      {/* Arrows */}
      <line x1="216" y1="126" x2="230" y2="126" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sm1)" />
      <line x1="432" y1="126" x2="446" y2="126" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sm1)" />
      <line x1="648" y1="126" x2="662" y2="126" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#sm1)" />
      <defs>
        <marker id="sm1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
