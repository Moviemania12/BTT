"use client";
export default function OversubscriptionMath() {
  const f = "Arial,sans-serif";
  const cases = [
    { n: "Light mixed VMs", up: 40, c: "#16a34a", t: "2:1" },
    { n: "Typical enterprise", up: 20, c: "#d97706", t: "4:1" },
    { n: "Storage / backup heavy", up: 10, c: "#dc2626", t: "8:1" },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Oversubscription example: 8 blades with 10 Gbps each give 80 Gbps internal, compared with uplink capacity of 40, 20 and 10 Gbps giving ratios 2:1, 4:1 and 8:1" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Oversubscription — Blade Bandwidth vs Uplink Bandwidth</text>
      <rect x="30" y="50" width="800" height="52" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="430" y="72" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">Inside the chassis: 8 blades × 10 Gbps = 80 Gbps (maximum possible demand)</text>
      <text x="430" y="90" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Ratio = internal bandwidth ÷ uplink bandwidth</text>
      {cases.map((k, i) => {
        const y = 130 + i * 70;
        const w = (k.up / 80) * 520;
        return (
          <g key={i}>
            <text x="30" y={y + 22} fontFamily={f} fontSize="10.5" fontWeight="700" fill="#111827">{k.n}</text>
            <rect x="200" y={y} width="520" height="22" rx="4" fill="#e5e7eb" />
            <rect x="200" y={y} width={w} height="22" rx="4" fill={k.c} />
            <text x={200 + w + 8} y={y + 16} fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{k.up} Gbps uplink</text>
            <text x="200" y={y + 40} fontFamily={f} fontSize="9" fill="#6b7280">grey bar = 80 Gbps demand</text>
            <rect x="740" y={y - 4} width="90" height="34" rx="6" fill="#fff" stroke={k.c} strokeWidth="2.5" />
            <text x="785" y={y + 19} textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill={k.c}>{k.t}</text>
          </g>
        );
      })}
      <rect x="30" y="345" width="800" height="44" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="364" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Peak demand rarely hits 100% on all blades at once — but live migration, backups and storage traffic can. Size uplinks for the busiest realistic window.</text>
      <text x="430" y="380" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Illustrative numbers. Real chassis support 25/50/100G+ links and different port counts.</text>
    </svg>
  );
}
