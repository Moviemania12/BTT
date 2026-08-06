"use client";
export default function CustomSiliconStrategy() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="css-title">
      <title id="css-title">Custom Silicon Decision Framework: Decision tree from query volume and algorithm stability to the right chip choice. Low volume or changing algorithm: GPU. High volume and stable algorithm: consider FPGA first, then ASIC at very high scale. Hyperscalers like Google and AWS justify custom chips at billions of queries per day.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CUSTOM SILICON STRATEGY — When to Build vs When to Buy NVIDIA</text>

      {/* Start */}
      <rect x="320" y="36" width="180" height="40" rx="20" fill="#1e293b" />
      <text x="410" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Your AI Workload</text>
      <line x1="410" y1="76" x2="410" y2="96" stroke="#475569" strokeWidth="1.5" markerEnd="url(#csa)" />

      {/* Q1 */}
      <rect x="255" y="96" width="310" height="36" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="117" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">How many queries per day?</text>

      {/* Low branch */}
      <line x1="255" y1="114" x2="120" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="178" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626">Under 10M/day</text>

      {/* High branch */}
      <line x1="565" y1="114" x2="700" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="640" y="135" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a">Over 100M/day</text>

      {/* Mid */}
      <line x1="410" y1="132" x2="410" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="440" y="145" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ca8a04">10M–100M</text>

      {/* GPU box */}
      <rect x="30" y="150" width="180" height="50" rx="8" fill="#16a34a" />
      <text x="120" y="172" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Use GPU</text>
      <text x="120" y="186" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bbf7d0" textAnchor="middle">NVIDIA H100, A10G, L4</text>
      <text x="120" y="198" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">Best ecosystem, fast start</text>

      {/* Mid Q */}
      <rect x="280" y="150" width="260" height="36" rx="8" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="171" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#713f12" textAnchor="middle">Is your algorithm stable?</text>

      {/* Mid no */}
      <line x1="280" y1="168" x2="200" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="225" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626">No — still changing</text>

      {/* Mid yes → FPGA */}
      <line x1="410" y1="186" x2="410" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="432" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a">Yes, stable</text>

      {/* GPU (mid-no) */}
      <rect x="100" y="220" width="180" height="50" rx="8" fill="#16a34a" />
      <text x="190" y="242" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU + FPGA</text>
      <text x="190" y="256" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bbf7d0" textAnchor="middle">GPU for research flexibility</text>
      <text x="190" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#dcfce7" textAnchor="middle">FPGA for prototype</text>

      {/* FPGA mid-yes */}
      <rect x="310" y="220" width="200" height="50" rx="8" fill="#ca8a04" />
      <text x="410" y="242" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Consider FPGA First</text>
      <text x="410" y="256" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fef9c3" textAnchor="middle">Flexible, faster to market</text>
      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#fef3c7" textAnchor="middle">Validate before ASIC</text>

      {/* High branch Q */}
      <rect x="600" y="150" width="200" height="36" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="700" y="171" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7f1d1d" textAnchor="middle">Budget for $10M+ chip design?</text>

      {/* High no */}
      <line x1="600" y1="168" x2="550" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="555" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#dc2626">No budget</text>

      {/* High yes */}
      <line x1="700" y1="186" x2="700" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#csa)" />
      <text x="720" y="210" fontFamily="Arial,sans-serif" fontSize="7" fill="#16a34a">Yes!</text>

      {/* Cloud TPU/GPU */}
      <rect x="450" y="220" width="180" height="50" rx="8" fill="#0284c7" />
      <text x="540" y="242" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Cloud GPU + TPU</text>
      <text x="540" y="256" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bae6fd" textAnchor="middle">AWS/GCP/Azure</text>
      <text x="540" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#e0f2fe" textAnchor="middle">Scale via cloud</text>

      {/* ASIC */}
      <rect x="630" y="220" width="175" height="50" rx="8" fill="#7c3aed" />
      <text x="718" y="242" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Custom ASIC</text>
      <text x="718" y="256" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#ddd6fe" textAnchor="middle">Google TPU, AWS Trainium</text>
      <text x="718" y="268" fontFamily="Arial,sans-serif" fontSize="7" fill="#ede9fe" textAnchor="middle">Hyperscaler only territory</text>

      <defs>
        <marker id="csa" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  );
}
