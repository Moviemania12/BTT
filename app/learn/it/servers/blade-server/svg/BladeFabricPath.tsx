"use client";
export default function BladeFabricPath() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blade data path: blade mezzanine adapters, chassis midplane, redundant I/O modules in two bays, uplinks to two top-of-rack switches" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Blade Network Path — Blade → Midplane → I/O Module → ToR</text>
      <rect x="20" y="50" width="170" height="250" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="105" y="72" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">Blades</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="34" y={86 + i * 68} width="142" height="56" rx="5" fill="#dbeafe" stroke="#2563eb" />
          <text x="105" y={104 + i * 68} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">Blade {i + 1}</text>
          <rect x="44" y={112 + i * 68} width="58" height="20" rx="3" fill="#7c3aed" />
          <text x="73" y={126 + i * 68} textAnchor="middle" fontFamily={f} fontSize="8.5" fontWeight="700" fill="#fff">Port A</text>
          <rect x="108" y={112 + i * 68} width="58" height="20" rx="3" fill="#0891b2" />
          <text x="137" y={126 + i * 68} textAnchor="middle" fontFamily={f} fontSize="8.5" fontWeight="700" fill="#fff">Port B</text>
        </g>
      ))}
      <rect x="250" y="50" width="60" height="250" rx="6" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
      <text x="280" y="175" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#7f1d1d" transform="rotate(-90 280 175)">MIDPLANE / BACKPLANE</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="176" y1={122 + i * 68} x2="250" y2={122 + i * 68} stroke="#7c3aed" strokeWidth="2" />
          <line x1="176" y1={128 + i * 68} x2="250" y2={128 + i * 68} stroke="#0891b2" strokeWidth="2" />
        </g>
      ))}
      <rect x="370" y="60" width="140" height="100" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="440" y="84" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#5b21b6">I/O Module A</text>
      <text x="440" y="100" textAnchor="middle" fontFamily={f} fontSize="9" fill="#5b21b6">(Bay 1) internal switch</text>
      <text x="440" y="122" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">or pass-through</text>
      <text x="440" y="140" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">down-ports: to blades</text>
      <rect x="370" y="190" width="140" height="100" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <text x="440" y="214" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#155e75">I/O Module B</text>
      <text x="440" y="230" textAnchor="middle" fontFamily={f} fontSize="9" fill="#155e75">(Bay 2) internal switch</text>
      <text x="440" y="252" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">separate failure path</text>
      <text x="440" y="270" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">down-ports: to blades</text>
      <line x1="310" y1="120" x2="370" y2="110" stroke="#7c3aed" strokeWidth="2.5" />
      <line x1="310" y1="240" x2="370" y2="240" stroke="#0891b2" strokeWidth="2.5" />
      <rect x="640" y="60" width="150" height="100" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <text x="715" y="90" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">ToR Switch 1</text>
      <text x="715" y="110" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">network A</text>
      <rect x="640" y="190" width="150" height="100" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
      <text x="715" y="220" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">ToR Switch 2</text>
      <text x="715" y="240" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">network B</text>
      {[0, 1].map((u) => <line key={u} x1="510" y1={95 + u * 14} x2="640" y2={95 + u * 14} stroke="#7c3aed" strokeWidth="3" />)}
      {[0, 1].map((u) => <line key={u} x1="510" y1={225 + u * 14} x2="640" y2={225 + u * 14} stroke="#0891b2" strokeWidth="3" />)}
      <text x="575" y="82" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#5b21b6">2 uplinks</text>
      <text x="575" y="212" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#155e75">2 uplinks</text>
      <rect x="20" y="318" width="820" height="86" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="338" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Why two bays matter</text>
      <text x="430" y="356" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Each blade has two ports; Port A always goes to Bay 1 and Port B to Bay 2 — wiring is fixed inside the chassis. Lose one I/O module → half the paths go down, blades stay up.</text>
      <text x="430" y="374" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Bonding / teaming (active-active or active-standby) in the OS or hypervisor is what actually uses both paths.</text>
      <text x="430" y="392" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#6b7280">Bay mapping and port counts differ by OEM and chassis generation.</text>
    </svg>
  );
}
