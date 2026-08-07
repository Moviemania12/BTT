"use client";
export default function MiSeriesTimeline() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mst-title">
      <title id="mst-title">AMD Instinct MI Series product family: MI100 (2020, CDNA 1, 32GB HBM2, first compute-only). MI200 family (2021, CDNA 2): MI210 64GB, MI250 128GB, MI250X 128GB used in Frontier supercomputer. MI300 family (2023, CDNA 3): MI300A (CPU+GPU+128GB unified for HPC), MI300X (pure GPU 192GB for AI inference and training, current flagship). MI350 (2025, CDNA 4, verify specs at amd.com).</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AMD INSTINCT MI SERIES — Complete Product Family (Data Center AI Only)</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">"Instinct" = AMD's brand for data center AI accelerators. Separate from consumer Radeon graphics cards.</text>

      {/* Timeline line */}
      <line x1="30" y1="68" x2="790" y2="68" stroke="#e2e8f0" strokeWidth="2" />

      {/* 2020 MI100 */}
      <circle cx="90" cy="68" r="8" fill="#3b82f6" />
      <line x1="90" y1="76" x2="90" y2="100" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="20" y="100" width="140" height="80" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="90" y="118" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">MI100</text>
      <text x="90" y="131" fontFamily="Arial,sans-serif" fontSize="7" fill="#2563eb" textAnchor="middle">CDNA 1 · 2020</text>
      <text x="90" y="144" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">32 GB Ultra-Fast Mem</text>
      <text x="90" y="157" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">300W · PCIe 4.0</text>
      <text x="90" y="172" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#3b82f6" textAnchor="middle">1st compute-only AMD</text>

      {/* 2021 MI200 family */}
      <circle cx="290" cy="68" r="8" fill="#6366f1" />
      <line x1="290" y1="76" x2="290" y2="100" stroke="#6366f1" strokeWidth="1.5" />
      <rect x="170" y="100" width="240" height="110" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="290" y="118" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#3730a3" textAnchor="middle">MI200 Series — CDNA 2 · 2021</text>
      <text x="290" y="133" fontFamily="Arial,sans-serif" fontSize="7" fill="#6366f1" textAnchor="middle">MI210: 64 GB · 1 die</text>
      <text x="290" y="146" fontFamily="Arial,sans-serif" fontSize="7" fill="#6366f1" textAnchor="middle">MI250: 128 GB · 2 dies</text>
      <text x="290" y="159" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#3730a3" textAnchor="middle">MI250X: 128 GB · 500W (Flagship)</text>
      <text x="290" y="172" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">FP64 Matrix Cores introduced</text>
      <text x="290" y="185" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#dc2626" textAnchor="middle">★ Used in Frontier Supercomputer</text>
      <text x="290" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">World's first exascale system (2022)</text>

      {/* 2023 MI300 family */}
      <circle cx="550" cy="68" r="8" fill="#ef4444" />
      <line x1="550" y1="76" x2="550" y2="100" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="430" y="100" width="245" height="130" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="553" y="118" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7f1d1d" textAnchor="middle">MI300 Series — CDNA 3 · 2023</text>
      {/* MI300A */}
      <rect x="440" y="126" width="106" height="80" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
      <text x="493" y="143" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">MI300A (APU)</text>
      <text x="493" y="156" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9a3412" textAnchor="middle">CPU+GPU together</text>
      <text x="493" y="168" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9a3412" textAnchor="middle">128 GB shared mem</text>
      <text x="493" y="181" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#9a3412" textAnchor="middle">HPC / Scientific</text>
      <text x="493" y="196" fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="700" fill="#f97316" textAnchor="middle">Unified memory</text>
      {/* MI300X */}
      <rect x="556" y="126" width="110" height="80" rx="4" fill="#fff" stroke="#ef4444" strokeWidth="1.5" />
      <text x="611" y="143" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">MI300X ★</text>
      <text x="611" y="156" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#991b1b" textAnchor="middle">GPU only (no CPU)</text>
      <text x="611" y="168" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#dc2626" textAnchor="middle">192 GB HBM3</text>
      <text x="611" y="181" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#991b1b" textAnchor="middle">5.3 TB/s · 750W</text>
      <text x="611" y="195" fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="700" fill="#ef4444" textAnchor="middle">Current Flagship</text>

      {/* 2025 MI350 */}
      <circle cx="745" cy="68" r="8" fill="#f59e0b" />
      <line x1="745" y1="76" x2="745" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="680" y="100" width="130" height="90" rx="6" fill="#fefce8" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="745" y="118" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">MI350</text>
      <text x="745" y="131" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">CDNA 4 · 2025</text>
      <text x="745" y="146" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">FP8 improved</text>
      <text x="745" y="159" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569" textAnchor="middle">Better inference</text>
      <text x="745" y="174" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#f59e0b" textAnchor="middle">⚠ Verify specs</text>
      <text x="745" y="185" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#92400e" textAnchor="middle">at amd.com/instinct</text>

      <text x="410" y="252" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#475569" textAnchor="middle">All Instinct products use HBM memory, ECC error correction, and are designed for 24/7 data center operation — very different from consumer gaming GPUs.</text>
    </svg>
  );
}
