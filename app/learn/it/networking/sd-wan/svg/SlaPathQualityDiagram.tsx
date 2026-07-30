"use client";
export default function SlaPathQualityDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="slq-title">
      <title id="slq-title">Healthy Link vs Application-Usable Path</title>
      <rect width="820" height="320" fill="#ffffff" />

      <text x="410" y="26" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        LINK UP ≠ APPLICATION-USABLE PATH
      </text>

      {/* Traditional view */}
      <rect x="30" y="45" width="360" height="250" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="68" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#475569" textAnchor="middle">TRADITIONAL ROUTING VIEW</text>

      <rect x="60" y="84" width="300" height="44" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="210" y="104" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Link A — UP ✓</text>
      <text x="210" y="120" fontFamily="Arial,sans-serif" fontSize="9" fill="#15803d" textAnchor="middle">Interface state: UP / Routing protocol: reachable</text>

      <rect x="60" y="142" width="300" height="44" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="210" y="162" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Link B — UP ✓</text>
      <text x="210" y="178" fontFamily="Arial,sans-serif" fontSize="9" fill="#15803d" textAnchor="middle">Interface state: UP / Routing protocol: reachable</text>

      <rect x="60" y="200" width="300" height="80" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="210" y="222" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">Traditional Decision:</text>
      <text x="210" y="238" fontFamily="Arial,sans-serif" fontSize="9" fill="#b91c1c" textAnchor="middle">Both links UP → best-path routing selects one</text>
      <text x="210" y="254" fontFamily="Arial,sans-serif" fontSize="9" fill="#b91c1c" textAnchor="middle">No visibility into latency, jitter, or loss</text>
      <text x="210" y="270" fontFamily="Arial,sans-serif" fontSize="8" fill="#991b1b" textAnchor="middle">Application may degrade without detection</text>

      {/* SD-WAN view */}
      <rect x="430" y="45" width="360" height="250" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="610" y="68" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e" textAnchor="middle">SD-WAN VIEW</text>

      {/* Link A - good */}
      <rect x="460" y="84" width="300" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="610" y="104" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">Link A — UP + Quality GOOD ✓</text>
      <text x="610" y="118" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Latency: 8ms | Jitter: 1ms | Loss: 0%</text>
      <rect x="490" y="128" width="240" height="18" rx="3" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="610" y="141" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">→ USABLE for Voice + ERP + Web</text>

      {/* Link B - degraded */}
      <rect x="460" y="166" width="300" height="76" rx="6" fill="#fef9e7" stroke="#d97706" strokeWidth="2" />
      <text x="610" y="186" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">Link B — UP but Quality POOR ⚠️</text>
      <text x="610" y="200" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f" textAnchor="middle">Latency: 85ms | Jitter: 42ms | Loss: 3.2%</text>
      <rect x="490" y="210" width="240" height="18" rx="3" fill="#fef3c7" stroke="#fde68a" strokeWidth="1" />
      <text x="610" y="223" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">→ NOT USABLE for Voice (SLA violated)</text>
      <text x="610" y="236" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">→ Usable only for low-priority web traffic</text>

      <rect x="460" y="255" width="300" height="28" rx="5" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="610" y="266" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">SD-WAN routes Voice to Link A</text>
      <text x="610" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Brownout on Link B detected before user impact</text>
    </svg>
  );
}
