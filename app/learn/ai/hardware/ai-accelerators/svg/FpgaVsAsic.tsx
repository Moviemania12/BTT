"use client";
export default function FpgaVsAsic() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fva-title">
      <title id="fva-title">FPGA (Reprogrammable Chip) vs ASIC (Permanent Custom Chip): FPGA is flexible like a whiteboard, ASIC is fixed like a printed book. FPGA has higher cost per unit but lower upfront cost. ASIC has high upfront cost but lower cost per unit at scale. FPGA takes weeks, ASIC takes 18-24 months to produce.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">FPGA vs ASIC — Two Ways to Build a Custom AI Chip</text>

      {/* FPGA */}
      <rect x="20" y="36" width="370" height="265" rx="10" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
      <text x="205" y="60" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#713f12" textAnchor="middle">FPGA</text>
      <text x="205" y="76" fontFamily="Arial,sans-serif" fontSize="9" fill="#92400e" textAnchor="middle">(Field Programmable Gate Array)</text>
      <text x="205" y="90" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">"Reprogrammable Chip — like a Whiteboard"</text>

      {/* FPGA visual — grid of LUTs */}
      {Array.from({ length: 16 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        return (
          <g key={i}>
            <rect x={40 + col * 68} y={100 + row * 34} width={60} height={26} rx="4" fill="#fde68a" stroke="#ca8a04" strokeWidth="1" />
            <text x={70 + col * 68} y={116 + row * 34} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#713f12" textAnchor="middle">LUT {i + 1}</text>
          </g>
        );
      })}
      <text x="205" y="248" fontFamily="Arial,sans-serif" fontSize="7" fill="#713f12" textAnchor="middle">LUT = Look-Up Table (reprogrammable logic block)</text>

      {[
        "✓ Reprogrammable — change logic via software",
        "✓ Ready in weeks (no chip fabrication needed)",
        "✓ Low upfront cost (buy existing chip)",
        "✓ Prototype and iterate fast",
        "✗ 5–10× higher cost per unit than ASIC",
        "✗ 3–5× more power per operation vs ASIC",
        "✗ Complex to program (HDL, VHDL, HLS)",
      ].map((t, i) => (
        <text key={i} x="34" y={263 + i * 0} fontFamily="Arial,sans-serif" fontSize="7.5" fill={t.startsWith("✓") ? "#166534" : "#7f1d1d"}>
          <tspan x="34" dy={i === 0 ? 0 : 14}>{t}</tspan>
        </text>
      ))}

      {/* ASIC */}
      <rect x="430" y="36" width="370" height="265" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="615" y="60" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">ASIC</text>
      <text x="615" y="76" fontFamily="Arial,sans-serif" fontSize="9" fill="#166534" textAnchor="middle">(Application Specific Integrated Circuit)</text>
      <text x="615" y="90" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">"Permanent Custom Chip — like a Printed Book"</text>

      {/* ASIC visual — fixed optimized blocks */}
      {[
        { label: "Matrix Multiply", sub: "hardwired logic" },
        { label: "Activation Fn", sub: "hardwired logic" },
        { label: "Memory Ctrl", sub: "hardwired logic" },
        { label: "Data Mover", sub: "hardwired logic" },
        { label: "I/O Interface", sub: "hardwired logic" },
        { label: "Power Mgmt", sub: "hardwired logic" },
      ].map((b, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        return (
          <g key={b.label}>
            <rect x={444 + col * 116} y={100 + row * 50} width={108} height={40} rx="5" fill="#22c55e" />
            <text x={498 + col * 116} y={118 + row * 50} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{b.label}</text>
            <text x={498 + col * 116} y={131 + row * 50} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#bbf7d0" textAnchor="middle">{b.sub}</text>
          </g>
        );
      })}
      <text x="615" y="218" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Every block optimized specifically for AI — nothing wasted</text>

      {[
        "✓ Maximum efficiency — optimized for one job",
        "✓ 3–5× lower power than FPGA",
        "✓ 5–10× lower cost per unit at scale",
        "✓ Best performance for the target workload",
        "✗ 18–24 months to design and fabricate",
        "✗ $10M–$100M+ upfront design cost",
        "✗ Can't change after fabrication — fixed forever",
      ].map((t, i) => (
        <text key={i} x="444" y={263} fontFamily="Arial,sans-serif" fontSize="7.5" fill={t.startsWith("✓") ? "#166534" : "#7f1d1d"}>
          <tspan x="444" dy={i === 0 ? 0 : 14}>{t}</tspan>
        </text>
      ))}
    </svg>
  );
}
