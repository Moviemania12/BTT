"use client";
export default function BladeAnatomy() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Anatomy of one half-height blade server: CPUs, DIMMs, local drives, mezzanine cards, BMC and the midplane connector at the rear" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Inside One Blade — Top View (half-height example)</text>
      <rect x="30" y="50" width="640" height="250" rx="8" fill="#f8fafc" stroke="#222" strokeWidth="2.5" />
      <text x="40" y="68" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#6b7280">FRONT (faces the aisle)</text>
      <text x="660" y="68" textAnchor="end" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#6b7280">REAR (plugs into midplane)</text>
      <rect x="44" y="82" width="90" height="100" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
      <text x="89" y="108" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#78350f">Local drives</text>
      <text x="89" y="124" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">2 × SSD / NVMe</text>
      <text x="89" y="138" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">(boot / scratch)</text>
      <text x="89" y="158" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#92400e">Hot-swap, front</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={160 + i * 200} y="90" width="70" height="64" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x={195 + i * 200} y="118" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">CPU {i}</text>
          <text x={195 + i * 200} y="134" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#1e40af">+ heatsink</text>
          {[0, 1, 2, 3].map((d) => <rect key={d} x={240 + i * 200 + d * 11} y="90" width="8" height="64" rx="1.5" fill="#bbf7d0" stroke="#16a34a" />)}
          <text x={262 + i * 200} y="168" textAnchor="middle" fontFamily={f} fontSize="8.5" fontWeight="700" fill="#166534">DIMMs (RAM)</text>
        </g>
      ))}
      <line x1="230" y1="122" x2="360" y2="122" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />
      <text x="295" y="115" textAnchor="middle" fontFamily={f} fontSize="8" fill="#64748b">CPU link</text>
      <rect x="160" y="196" width="240" height="40" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
      <text x="280" y="214" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Mezzanine slots (PCIe)</text>
      <text x="280" y="228" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#5b21b6">LOM / NIC · FC HBA · converged adapter</text>
      <rect x="420" y="196" width="130" height="40" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
      <text x="485" y="214" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#7f1d1d">BMC</text>
      <text x="485" y="228" textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#7f1d1d">remote console, sensors</text>
      <rect x="160" y="250" width="390" height="34" rx="5" fill="#f1f5f9" stroke="#94a3b8" />
      <text x="355" y="271" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Blade has NO PSU, NO fans, NO external ports (only small local-console port)</text>
      <rect x="610" y="80" width="46" height="204" rx="4" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
      <text x="633" y="180" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#7f1d1d" transform="rotate(-90 633 180)">MIDPLANE CONNECTOR</text>
      <line x1="550" y1="215" x2="610" y2="215" stroke="#7c3aed" strokeWidth="2" />
      <line x1="550" y1="226" x2="610" y2="226" stroke="#dc2626" strokeWidth="2" />
      <line x1="400" y1="140" x2="610" y2="140" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
      <rect x="690" y="50" width="150" height="250" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
      <text x="765" y="72" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#166534">What crosses the connector</text>
      <text x="765" y="98" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">① Power (12 V bus)</text>
      <text x="765" y="118" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">② Data lanes to I/O</text>
      <text x="765" y="136" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">modules (Ethernet / FC)</text>
      <text x="765" y="158" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">③ Management signals</text>
      <text x="765" y="176" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">(BMC to chassis CMC)</text>
      <text x="765" y="198" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">④ Cooling is by chassis</text>
      <text x="765" y="214" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">fans pulling air through</text>
      <text x="765" y="238" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Pins are delicate —</text>
      <text x="765" y="252" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">seat blade straight,</text>
      <text x="765" y="266" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">never force it.</text>
      <rect x="30" y="318" width="810" height="66" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="435" y="338" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Half-height vs full-height</text>
      <text x="435" y="356" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Half-height blades: more blades per chassis. Full-height / double-wide blades: more CPUs, RAM slots, mezzanine slots or GPUs, fewer per chassis.</text>
      <text x="435" y="372" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Exact slot counts and sizes differ by OEM and model — verify the vendor spec sheet.</text>
    </svg>
  );
}
