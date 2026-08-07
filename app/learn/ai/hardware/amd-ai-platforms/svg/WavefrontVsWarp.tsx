"use client";
export default function WavefrontVsWarp() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="wvw-title">
      <title id="wvw-title">Wavefront vs Warp comparison: NVIDIA Warp has 32 threads executing same instruction at once (lockstep). AMD Wavefront has 64 work items executing same instruction at once — twice as wide. Both concepts are identical (lockstep parallel execution) but AMD's wavefront is wider. Key programmer note: never hardcode warpSize equals 32 — use the warpSize variable which returns 64 on AMD.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD WAVEFRONT vs NVIDIA WARP — Same Concept, Different Width</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Both execute the same instruction across all threads at once (lockstep). Key difference: AMD is twice as wide.</text>

      {/* NVIDIA side */}
      <rect x="20" y="46" width="370" height="210" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="205" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">NVIDIA — Warp</text>
      <text x="205" y="82" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">32 threads execute same instruction together</text>
      {Array.from({ length: 32 }).map((_, i) => {
        const col = i % 8, row = Math.floor(i / 8);
        return <rect key={i} x={38 + col * 40} y={90 + row * 30} width="34" height="24" rx="4" fill="#16a34a" />;
      })}
      <text x="205" y="224" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Width = 32 threads</text>
      <text x="205" y="238" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">Branch divergence: 2 branches = 2× slower</text>
      <text x="205" y="251" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#166534" textAnchor="middle">warpSize = 32 (hardcoded for NVIDIA)</text>

      {/* AMD side */}
      <rect x="430" y="46" width="370" height="210" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="615" y="68" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">AMD — Wavefront</text>
      <text x="615" y="82" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">64 work items execute same instruction together</text>
      {Array.from({ length: 64 }).map((_, i) => {
        const col = i % 8, row = Math.floor(i / 8);
        return <rect key={i} x={438 + col * 40} y={90 + row * 15} width="34" height="12" rx="3" fill="#7c3aed" opacity="0.85" />;
      })}
      <text x="615" y="224" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">Width = 64 work items (2× wider)</text>
      <text x="615" y="238" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#5b21b6" textAnchor="middle">Branch divergence: same concept, same impact</text>
      <text x="615" y="251" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626" textAnchor="middle">⚠ Never hardcode 32 — use warpSize variable!</text>

      {/* Bottom warning */}
      <rect x="20" y="260" width="780" height="18" rx="4" fill="#fff7ed" />
      <text x="410" y="273" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c2d12" textAnchor="middle">
        Critical for code migration: Code that assumes warpSize = 32 will break on AMD. Always use the warpSize variable — it returns 32 on NVIDIA and 64 on AMD.
      </text>
    </svg>
  );
}
