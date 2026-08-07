"use client";
export default function ThreadBlockGridDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tbg-title">
      <title id="tbg-title">GPU Programming Hierarchy: 32 Threads form a Warp (hardware). Multiple Warps form a Block (programmer-defined, up to 1024 threads). Multiple Blocks form a Grid (entire problem). Hardware mapping: each Block runs on one SM, Grid distributed across all SMs automatically by CUDA runtime.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">THREAD → WARP → BLOCK → GRID — GPU Programming Hierarchy Mapped to Hardware</text>

      {/* Thread level */}
      <rect x="20" y="30" width="140" height="260" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">THREAD</text>
      <text x="90" y="64" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">Smallest unit</text>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={30 + (i % 4) * 30} y={72 + Math.floor(i / 4) * 26} width="24" height="20" rx="3" fill="#2563eb" />
      ))}
      <text x="90" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">Each thread:</text>
      <text x="90" y="164" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">• Own registers</text>
      <text x="90" y="176" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">• Own local memory</text>
      <text x="90" y="188" fontFamily="Arial,sans-serif" fontSize="7" fill="#1e40af" textAnchor="middle">• Unique thread_id</text>
      <text x="90" y="208" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#2563eb" textAnchor="middle">Hardware maps to:</text>
      <text x="90" y="222" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">1 CUDA Core op per cycle</text>
      <text x="90" y="234" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">or 1/4 Tensor Core</text>

      {/* Warp level */}
      <rect x="172" y="30" width="155" height="260" rx="8" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="249" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">WARP</text>
      <text x="249" y="64" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">32 threads — hardware unit</text>
      {Array.from({ length: 32 }).map((_, i) => (
        <rect key={i} x={180 + (i % 8) * 17} y={72 + Math.floor(i / 8) * 16} width="13" height="12" rx="2" fill="#7c3aed" />
      ))}
      <text x="249" y="154" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">All 32 execute same</text>
      <text x="249" y="166" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">instruction — lockstep</text>
      <text x="249" y="184" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">If/else divergence =</text>
      <text x="249" y="196" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle">serialized → 2× slower!</text>
      <text x="249" y="214" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#7c3aed" textAnchor="middle">Hardware concept:</text>
      <text x="249" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">Programmer doesn&apos;t</text>
      <text x="249" y="238" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">directly control warps</text>

      {/* Block level */}
      <rect x="340" y="30" width="200" height="260" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="440" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">BLOCK (Thread Block)</text>
      <text x="440" y="64" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">Multiple warps · 1–1024 threads · programmer sets</text>
      {Array.from({ length: 4 }).map((_, i) => (
        <g key={i}>
          <rect x={350} y={72 + i * 36} width={180} height={30} rx="4" fill={i % 2 === 0 ? "#16a34a" : "#4ade80"} />
          <text x={440} y={91 + i * 36} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700"
            fill={i % 2 === 0 ? "#fff" : "#14532d"} textAnchor="middle">Warp {i + 1} — 32 threads</text>
        </g>
      ))}
      <text x="440" y="226" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Threads in same block can:</text>
      <text x="440" y="238" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">• Share shared memory</text>
      <text x="440" y="250" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">• Synchronize via __syncthreads()</text>
      <text x="440" y="268" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#16a34a" textAnchor="middle">Maps to: 1 SM</text>

      {/* Grid level */}
      <rect x="555" y="30" width="245" height="260" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="677" y="50" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">GRID</text>
      <text x="677" y="64" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">All blocks for entire problem · programmer sets grid size</text>
      {Array.from({ length: 12 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        return (
          <g key={i}>
            <rect x={563 + col * 56} y={72 + row * 50} width={50} height={44} rx="4" fill="#f97316" opacity={0.7 + i * 0.02} />
            <text x={563 + col * 56 + 25} y={97 + row * 50} fontFamily="Arial,sans-serif" fontSize="7" fill="#fff" textAnchor="middle">Block {i + 1}</text>
          </g>
        );
      })}
      <text x="677" y="242" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c2d12" textAnchor="middle">Blocks distributed across SMs automatically</text>
      <text x="677" y="254" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c2d12" textAnchor="middle">by CUDA runtime. You don&apos;t manage this.</text>
      <text x="677" y="270" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#f97316" textAnchor="middle">Maps to: All SMs on GPU</text>
      <text x="677" y="283" fontFamily="Arial,sans-serif" fontSize="7" fill="#9a3412" textAnchor="middle">Scales automatically with GPU size</text>
    </svg>
  );
}
