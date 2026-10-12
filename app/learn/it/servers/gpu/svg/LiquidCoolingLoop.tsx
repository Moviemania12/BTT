"use client";
export default function LiquidCoolingLoop() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Direct liquid cooling loop: cold plates on GPUs, rack manifold, coolant distribution unit with heat exchanger, facility water to chiller or dry cooler" style={{ width: "100%", height: "auto" }}>
      <defs>
        <marker id="lcArrR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" /></marker>
        <marker id="lcArrB" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#2563eb" /></marker>
      </defs>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Direct Liquid Cooling Loop — Chip to Chiller</text>

      <rect x="20" y="50" width="230" height="250" rx="10" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="135" y="70" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">GPU Server (in rack)</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={40} y={86 + i * 62} width="80" height="48" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x={80} y={106 + i * 62} textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#7f1d1d">Cold plate</text>
          <text x={80} y={120 + i * 62} textAnchor="middle" fontFamily={f} fontSize="9" fill="#7f1d1d">on GPU {i}</text>
        </g>
      ))}
      <rect x="140" y="86" width="90" height="110" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="185" y="112" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#78350f">Other parts</text>
      <text x="185" y="127" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">RAM, NICs,</text>
      <text x="185" y="140" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">PSU, drives</text>
      <text x="185" y="160" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">still need AIR</text>
      <text x="185" y="173" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">(fans, ~10-30%)</text>
      <text x="135" y="260" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Quick-disconnect (dripless)</text>
      <text x="135" y="274" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">couplings at the server rear</text>

      <rect x="290" y="50" width="110" height="250" rx="10" fill="#f0f9ff" stroke="#0369a1" strokeWidth="2" />
      <text x="345" y="72" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#075985">Rack manifold</text>
      <text x="345" y="88" textAnchor="middle" fontFamily={f} fontSize="9" fill="#075985">supply + return</text>
      <text x="345" y="260" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Leak sensor +</text>
      <text x="345" y="274" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">flow / temp sensors</text>

      <rect x="450" y="50" width="170" height="250" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <text x="535" y="72" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#065f46">CDU</text>
      <text x="535" y="88" textAnchor="middle" fontFamily={f} fontSize="9" fill="#065f46">Coolant Distribution Unit</text>
      <rect x="475" y="105" width="120" height="50" rx="4" fill="#d1fae5" stroke="#059669" />
      <text x="535" y="126" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#065f46">Heat exchanger</text>
      <text x="535" y="141" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#065f46">two loops never mix</text>
      <rect x="475" y="168" width="55" height="38" rx="4" fill="#d1fae5" stroke="#059669" />
      <text x="502" y="191" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#065f46">Pumps</text>
      <rect x="540" y="168" width="55" height="38" rx="4" fill="#d1fae5" stroke="#059669" />
      <text x="567" y="187" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#065f46">Filter +</text>
      <text x="567" y="199" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#065f46">tank</text>
      <text x="535" y="232" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Controls pressure,</text>
      <text x="535" y="246" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">flow, supply temp,</text>
      <text x="535" y="260" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">dew-point safety</text>

      <rect x="670" y="50" width="170" height="250" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="755" y="72" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">Facility water</text>
      <text x="755" y="88" textAnchor="middle" fontFamily={f} fontSize="9" fill="#1e40af">to chiller / dry cooler</text>
      <rect x="695" y="110" width="120" height="44" rx="4" fill="#dbeafe" stroke="#2563eb" />
      <text x="755" y="130" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">Chiller or</text>
      <text x="755" y="144" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">dry cooler</text>
      <text x="755" y="190" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Warm-water designs can</text>
      <text x="755" y="204" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">use higher temps and</text>
      <text x="755" y="218" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">less chiller energy</text>

      <line x1="120" y1="110" x2="290" y2="110" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#lcArrB)" />
      <line x1="290" y1="150" x2="120" y2="150" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#lcArrR)" />
      <line x1="400" y1="110" x2="450" y2="110" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#lcArrR)" />
      <line x1="450" y1="150" x2="400" y2="150" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#lcArrB)" />
      <line x1="620" y1="120" x2="670" y2="120" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#lcArrR)" />
      <line x1="670" y1="145" x2="620" y2="145" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#lcArrB)" />

      <text x="205" y="104" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#1e40af">cool in</text>
      <text x="205" y="166" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#991b1b">warm out</text>

      <rect x="20" y="318" width="410" height="86" rx="6" fill="#f0f9ff" stroke="#0369a1" />
      <text x="225" y="336" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#075985">TCS — Technology Cooling System (secondary loop)</text>
      <text x="225" y="354" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Server ⇄ manifold ⇄ CDU. Treated coolant (often water-glycol).</text>
      <text x="225" y="369" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Clean, filtered, small volume. Touches the cold plates.</text>
      <text x="225" y="384" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Quality and flow here decide GPU health.</text>
      <rect x="450" y="318" width="390" height="86" rx="6" fill="#eff6ff" stroke="#2563eb" />
      <text x="645" y="336" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#1e40af">FWS — Facility Water System (primary loop)</text>
      <text x="645" y="354" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">CDU heat exchanger ⇄ chiller / dry cooler / cooling tower.</text>
      <text x="645" y="369" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Building-scale loop shared by many CDUs.</text>
      <text x="645" y="384" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Design depends on site and OEM spec.</text>
    </svg>
  );
}
