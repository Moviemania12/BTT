"use client";
export default function ThermalThrottlingFlow() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ttf-title">
      <title id="ttf-title">GPU Thermal Throttling Flow: When GPU temperature approaches manufacturer thermal limits, GPU firmware automatically reduces clock speed (thermal throttling). This causes reduced compute performance — lower tokens per second, samples per second in AI training. The throttling is silent — GPU appears to be running but delivers less throughput. This directly impacts AI training ROI. Proper cooling prevents throttling. Monitoring both GPU temperature and clock speed simultaneously is essential to detect throttling.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU THERMAL THROTTLING — HOW IT AFFECTS AI TRAINING</text>
      <text x="410" y="34" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Throttling is silent — GPU appears "running" but actual throughput drops. Monitor both temperature AND clock speed.</text>

      {/* Left: Normal Operation */}
      <rect x="14" y="50" width="240" height="200" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="134" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">NORMAL OPERATION</text>
      <text x="134" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Cooling adequate</text>

      {[
        { label: "GPU Temperature", val: "Within safe range", color: "#16a34a" },
        { label: "Clock Speed", val: "At boost/base clock", color: "#16a34a" },
        { label: "Compute", val: "Full throughput", color: "#16a34a" },
        { label: "Training Speed", val: "Expected tokens/sec", color: "#16a34a" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="28" y={98 + i * 36} width="212" height="28" rx="4" fill="#16a34a" />
          <text x="134" y={110 + i * 36} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">{item.label}</text>
          <text x="134" y={122 + i * 36} fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">{item.val}</text>
        </g>
      ))}

      {/* Arrow */}
      <line x1="254" y1="150" x2="290" y2="150" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ttf-ar)" />
      <text x="272" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626" fontWeight="700" textAnchor="middle">Cooling</text>
      <text x="272" y="152" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626" fontWeight="700" textAnchor="middle">inadequate</text>

      {/* Middle: Throttling */}
      <rect x="290" y="50" width="240" height="200" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">THERMAL THROTTLING</text>
      <text x="410" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">GPU firmware auto-response</text>

      {[
        { label: "GPU Temperature", val: "Approaching limit", color: "#f97316" },
        { label: "Clock Speed", val: "Automatically reduced", color: "#dc2626" },
        { label: "Compute", val: "Reduced throughput", color: "#dc2626" },
        { label: "Training Speed", val: "Lower tokens/sec", color: "#dc2626" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="304" y={98 + i * 36} width="212" height="28" rx="4" fill={item.color} />
          <text x="410" y={110 + i * 36} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">{item.label}</text>
          <text x="410" y={122 + i * 36} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.9)" textAnchor="middle">{item.val}</text>
        </g>
      ))}

      {/* Arrow 2 */}
      <line x1="530" y1="150" x2="566" y2="150" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ttf-ar)" />
      <text x="548" y="140" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#0f172a" fontWeight="700" textAnchor="middle">Result</text>

      {/* Right: Business Impact */}
      <rect x="566" y="50" width="240" height="200" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="686" y="72" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7f1d1d" textAnchor="middle">BUSINESS IMPACT</text>
      <text x="686" y="86" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">Expensive compute underperforms</text>

      {[
        { label: "Training Time", val: "Increases (same model)", color: "#dc2626" },
        { label: "GPU ROI", val: "Reduced — paying for\nunderperforming hardware", color: "#7c3aed" },
        { label: "Visibility", val: "Throttling is SILENT\nnot always obvious", color: "#ca8a04" },
        { label: "Fix", val: "Improve cooling →\nthrottling stops", color: "#0891b2" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="580" y={98 + i * 36} width="212" height="28" rx="4" fill={item.color} />
          <text x="686" y={110 + i * 36} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">{item.label}</text>
          {item.val.split("\n").map((line, li) => (
            <text key={li} x="686" y={li === 0 ? (item.val.includes("\n") ? 118 + i * 36 : 122 + i * 36) : 128 + i * 36} fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.9)" textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}

      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0f172a" textAnchor="middle">Monitor: nvidia-smi --query-gpu=temperature.gpu,clocks.current.graphics --format=csv — watch for clock drops below expected</text>

      <defs>
        <marker id="ttf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
