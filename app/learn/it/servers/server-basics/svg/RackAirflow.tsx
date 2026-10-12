"use client";
export default function RackAirflow() {
  const f = "Arial,sans-serif";
  const rows = [
    { y: 70, label: "1U Server", ok: true },
    { y: 112, label: "2U Server", ok: true, h: 56 },
    { y: 176, label: "1U Server", ok: true },
    { y: 218, label: "EMPTY U — no blanking panel", ok: false },
    { y: 260, label: "1U Server", ok: true },
    { y: 302, label: "Blanking panel", ok: "blank" },
  ];
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of a rack showing cold aisle intake, hot aisle exhaust and hot air recirculating through an empty rack unit without a blanking panel" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Rack Airflow — Front-to-Back and Why Blanking Panels Matter</text>

      <rect x="40" y="48" width="150" height="320" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="72" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#1e40af">COLD AISLE</text>
      <text x="115" y="88" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Supply air ~18–27 °C</text>

      <rect x="670" y="48" width="150" height="320" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="745" y="72" textAnchor="middle" fontFamily={f} fontSize="12" fontWeight="700" fill="#991b1b">HOT AISLE</text>
      <text x="745" y="88" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Exhaust returns to CRAH/CRAC</text>

      <rect x="250" y="56" width="360" height="304" rx="6" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <text x="430" y="50" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">42U RACK (side view)</text>

      {rows.map((r, i) => {
        const h = r.h ?? 38;
        const fill = r.ok === true ? "#dbeafe" : r.ok === "blank" ? "#e5e7eb" : "#fff7ed";
        const stroke = r.ok === true ? "#2563eb" : r.ok === "blank" ? "#6b7280" : "#f97316";
        return (
          <g key={i}>
            <rect x="270" y={r.y} width="320" height={h} rx="4" fill={fill} stroke={stroke} strokeWidth={r.ok === false ? 2 : 1.5} strokeDasharray={r.ok === false ? "5 3" : undefined} />
            <text x="430" y={r.y + h / 2 + 4} textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#111827">{r.label}</text>
            {r.ok === true && <>
              <line x1="190" y1={r.y + h / 2} x2="268" y2={r.y + h / 2} stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#aBlue)" />
              <line x1="592" y1={r.y + h / 2} x2="668" y2={r.y + h / 2} stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#aRed)" />
            </>}
          </g>
        );
      })}
      {/* Recirculation through the gap */}
      <path d="M 668 237 C 630 237, 630 237, 596 237" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#aRed)" />
      <path d="M 262 237 C 262 205, 262 205, 262 180" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#aRed)" />
      <text x="430" y="395" textAnchor="middle" fontFamily={f} fontSize="10" fill="#991b1b" fontWeight="700">Gap in the rack = hot exhaust air flows back to the front and raises server inlet temperature</text>

      <defs>
        <marker id="aBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0,8 4,0 8" fill="#2563eb" /></marker>
        <marker id="aRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><polygon points="0 0,8 4,0 8" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}
