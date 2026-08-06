"use client";
export default function TpuChipArchitecture() {
  return (
    <svg viewBox="0 0 820 370" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tca-title">
      <title id="tca-title">Inside one TPU chip: The Matrix Math Engine (MXU) at center does all matrix multiplication using the Systolic Array. The Other Math Helper (VPU) handles activation functions. Fast On-Chip Memory (SRAM) feeds the engines. Fast GPU-style Memory (HBM) on both sides stores the AI model. Direct Links to Neighbour Chips (ICI) at bottom connects to other TPUs in the Pod.</title>
      <rect width="820" height="370" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">INSIDE ONE TPU CHIP — All The Parts and What They Do</text>

      {/* Chip boundary */}
      <rect x="160" y="36" width="500" height="304" rx="12" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">ONE TPU CHIP (everything inside this box is on one piece of silicon)</text>

      {/* MXU — center */}
      <rect x="220" y="66" width="380" height="140" rx="8" fill="#7c3aed" />
      <text x="410" y="91" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">MXU — Matrix Math Engine</text>
      <text x="410" y="107" fontFamily="Arial,sans-serif" fontSize="8" fill="#ede9fe" textAnchor="middle">(Matrix Multiply Unit — the main engine where all AI math happens)</text>
      <text x="410" y="123" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">Contains the Systolic Array: 256 × 256 grid of multiply-add cells</text>
      <text x="410" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">Each cell: multiplies 2 numbers → adds to running total → passes to next</text>
      <text x="410" y="153" fontFamily="Arial,sans-serif" fontSize="8" fill="#c4b5fd" textAnchor="middle">65,536 cells all working at the same time = very fast matrix math</text>
      <text x="410" y="168" fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">Supports BFloat16 (AI training format) + INT8 (fast inference)</text>
      <text x="410" y="185" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fbbf24" textAnchor="middle">Why TPU is fast at AI: neural networks = matrix math = MXU does it best</text>

      {/* VPU */}
      <rect x="172" y="222" width="155" height="64" rx="6" fill="#2563eb" />
      <text x="250" y="241" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Other Math Helper</text>
      <text x="250" y="255" fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">(VPU — Vector Processing Unit)</text>
      <text x="250" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">Activation functions (ReLU, GELU)</text>
      <text x="250" y="280" fontFamily="Arial,sans-serif" fontSize="7" fill="#93c5fd" textAnchor="middle">Softmax, layer norm, element ops</text>

      {/* On-chip SRAM */}
      <rect x="338" y="222" width="144" height="64" rx="6" fill="#0f766e" />
      <text x="410" y="241" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Fast On-Chip Memory</text>
      <text x="410" y="255" fontFamily="Arial,sans-serif" fontSize="7" fill="#99f6e4" textAnchor="middle">(SRAM — Static RAM)</text>
      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#99f6e4" textAnchor="middle">Ultra-fast — directly feeds MXU</text>
      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="7" fill="#99f6e4" textAnchor="middle">Small but very fast (like desk tray)</text>

      {/* Scalar / Control Unit */}
      <rect x="493" y="222" width="155" height="64" rx="6" fill="#ca8a04" />
      <text x="570" y="241" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Control Unit</text>
      <text x="570" y="255" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef9c3" textAnchor="middle">(Scalar Unit)</text>
      <text x="570" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">Traffic manager for the chip</text>
      <text x="570" y="280" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">Schedules all work, manages flow</text>

      {/* ICI links */}
      <rect x="172" y="300" width="476" height="34" rx="6" fill="#1e293b" />
      <text x="410" y="317" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">Direct Links to Neighbour Chips (ICI — Inter-Chip Interconnect)</text>
      <text x="410" y="330" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">6 high-speed optical connections (left, right, front, back, up, down) to adjacent TPU chips in the Pod</text>

      {/* HBM left */}
      <rect x="18" y="100" width="132" height="168" rx="8" fill="#dc2626" />
      <text x="84" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Fast GPU-style</text>
      <text x="84" y="137" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Memory</text>
      <text x="84" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(HBM — High</text>
      <text x="84" y="164" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Bandwidth Memory)</text>
      <text x="84" y="182" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">32GB — stores the</text>
      <text x="84" y="194" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">AI model weights</text>
      <text x="84" y="212" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">~900 GB/s speed</text>
      <text x="84" y="225" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(like library next door)</text>
      <line x1="152" y1="184" x2="160" y2="184" stroke="#dc2626" strokeWidth="2" />

      {/* HBM right */}
      <rect x="670" y="100" width="132" height="168" rx="8" fill="#dc2626" />
      <text x="736" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Fast GPU-style</text>
      <text x="736" y="137" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Memory</text>
      <text x="736" y="152" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">(HBM — 2nd stack)</text>
      <text x="736" y="168" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">Both HBM stacks</text>
      <text x="736" y="181" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">feed the MXU</text>
      <text x="736" y="194" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">simultaneously</text>
      <text x="736" y="212" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">for max bandwidth</text>
      <line x1="660" y1="184" x2="670" y2="184" stroke="#dc2626" strokeWidth="2" />

      {/* Labels */}
      <text x="410" y="362" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Data flow: HBM (big model storage) → SRAM (fast cache) → MXU (matrix math) → VPU (activation) → result back to HBM</text>
    </svg>
  );
}
