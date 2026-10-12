"use client";
export default function DimmAnatomy() {
  const f = "Arial,sans-serif";
  const chips = (x: number, y: number, n: number, fill: string, stroke: string, k: string) =>
    Array.from({ length: n }).map((_, i) => <rect key={k + i} x={x + i * 40} y={y} width="34" height="40" rx="3" fill={fill} stroke={stroke} strokeWidth="1.5" />);
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Server RDIMM anatomy: DRAM chips for data and ECC, register clock driver, PMIC on DDR5, SPD chip, key notch and gold contacts, plus how to decode a DIMM label" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="440" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Server DIMM (RDIMM) — Anatomy and Label Decoding</text>
      <rect x="30" y="50" width="800" height="150" rx="8" fill="#ecfdf5" stroke="#166534" strokeWidth="2" />
      {chips(50, 70, 9, "#1f2937", "#111827", "ca")}
      <text x="230" y="124" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#fff"> </text>
      <rect x="410" y="70" width="52" height="40" rx="3" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" />
      <text x="436" y="94" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#fff">RCD</text>
      <rect x="478" y="70" width="34" height="40" rx="3" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
      <text x="495" y="94" textAnchor="middle" fontFamily={f} fontSize="8.5" fontWeight="700" fill="#fff">PMIC</text>
      {chips(530, 70, 8, "#1f2937", "#111827", "cb")}
      <text x="50" y="132" fontFamily={f} fontSize="10" fontWeight="700" fill="#166534">Front side: DRAM chips (data) · 1 extra chip per group = ECC</text>
      {chips(50, 142, 9, "#374151", "#111827", "cc")}
      <rect x="410" y="142" width="26" height="22" rx="3" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1.5" />
      <text x="423" y="157" textAnchor="middle" fontFamily={f} fontSize="8" fontWeight="700" fill="#fff">SPD</text>
      <rect x="30" y="196" width="800" height="14" fill="#d4a017" stroke="#92400e" />
      <polygon points="470,196 482,196 482,210 470,210" fill="#fff" stroke="#92400e" />
      <text x="476" y="226" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#92400e">Key notch</text>
      <text x="200" y="226" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Gold contacts (pins) — never touch</text>

      <text x="30" y="260" fontFamily={f} fontSize="12" fontWeight="700" fill="#111827">What each part does</text>
      {[
        ["DRAM chips", "Store the data. Server DIMMs have extra chips for ECC bits."],
        ["RCD (register / clock driver)", "Buffers command-address signals → more DIMMs per channel (RDIMM)."],
        ["PMIC (DDR5)", "Power management chip on the DIMM; DDR4 had this on the motherboard."],
        ["SPD chip", "Small EEPROM with DIMM size, speed, timings — read by BIOS at boot."],
        ["Key notch", "Position differs by DDR generation/type so wrong DIMM cannot be inserted."],
      ].map((r, i) => (
        <g key={i}>
          <text x="30" y={282 + i * 18} fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">{r[0]}:</text>
          <text x="240" y={282 + i * 18} fontFamily={f} fontSize="10" fill="#374151">{r[1]}</text>
        </g>
      ))}
      <rect x="30" y="384" width="800" height="44" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="430" y="402" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">Label example:  64GB  2Rx4  PC5-4800B-R   =   capacity · ranks×chip width · DDR5 speed grade · Registered</text>
      <text x="430" y="418" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">2R = dual rank · x4 = each chip gives 4 data bits · PC5 = DDR5 · 4800 = MT/s · R = RDIMM (PC4 = DDR4)</text>
    </svg>
  );
}
