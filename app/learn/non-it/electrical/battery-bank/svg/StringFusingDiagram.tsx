"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/svg/StringFusingDiagram.tsx
//
// Blueprint SVG #11 — String Fusing Diagram
// Shows 3 battery strings, each with individual fuse before DC bus bar
// ═══════════════════════════════════════════════════════════════════════════

export default function StringFusingDiagram() {
  const strings = [
    { label: "String 1", y: 60 },
    { label: "String 2", y: 150 },
    { label: "String 3", y: 240 },
  ];

  return (
    <svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sf-title">
      <title id="sf-title">Battery String Fusing — Individual String Protection to DC Bus Bar</title>
      <rect width="860" height="320" fill="#ffffff" />

      <text x="430" y="26" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        STRING FUSING — WHY EVERY STRING NEEDS ITS OWN FUSE
      </text>

      {/* DC Bus bar (right side) */}
      <rect x="640" y="40" width="18" height="240" rx="3" fill="#16a34a" />
      <text x="668" y="120" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="start">DC Bus</text>
      <text x="668" y="134" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="start">+ve Rail</text>

      <rect x="640" y="295" width="160" height="14" rx="3" fill="#1e293b" />
      <text x="720" y="306" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" textAnchor="middle">DC BUS BAR — 192V</text>

      {strings.map((str, i) => {
        const cy = str.y + 20;
        return (
          <g key={i}>
            {/* Battery block */}
            <rect x="30" y={str.y} width="180" height="40" rx="6"
              fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.8" />
            <text x="120" y={str.y + 16} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700"
              fill="#0066CC" textAnchor="middle">{str.label}</text>
            <text x="120" y={str.y + 30} fontFamily="Arial,sans-serif" fontSize="8.5"
              fill="#475569" textAnchor="middle">16 × 12V cells = 192V</text>

            {/* Wire from battery to fuse */}
            <line x1="210" y1={cy} x2="310" y2={cy} stroke="#334155" strokeWidth="2" />

            {/* Fuse symbol */}
            <rect x="310" y={cy - 12} width="60" height="24" rx="4"
              fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <line x1="320" y1={cy} x2="360" y2={cy} stroke="#d97706" strokeWidth="1.5" />
            <line x1="325" y1={cy - 6} x2="355" y2={cy + 6} stroke="#d97706" strokeWidth="1.5" />
            <text x="340" y={str.y + 52} fontFamily="Arial,sans-serif" fontSize="9"
              fontWeight="700" fill="#92400e" textAnchor="middle">FUSE</text>
            <text x="340" y={str.y + 63} fontFamily="Arial,sans-serif" fontSize="8"
              fill="#78350f" textAnchor="middle">DC-rated</text>

            {/* Wire from fuse to bus */}
            <line x1="370" y1={cy} x2="640" y2={cy} stroke="#334155" strokeWidth="2" />

            {/* Connection dot on bus */}
            <circle cx="640" cy={cy} r="5" fill="#16a34a" />
          </g>
        );
      })}

      {/* UPS load on bus */}
      <rect x="660" y="40" width="150" height="55" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="735" y="61" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">UPS Inverter</text>
      <text x="735" y="75" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Load on DC Bus</text>
      <text x="735" y="88" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">500 kVA</text>
      <line x1="658" y1="68" x2="640" y2="68" stroke="#16a34a" strokeWidth="2" />

      {/* Fault annotation */}
      <rect x="30" y="285" width="580" height="28" rx="4" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="320" y="298" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">
        Without individual fuses: 1 string fault → all strings short circuit → catastrophic failure
      </text>
      <text x="320" y="310" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" textAnchor="middle">
        With individual fuses: faulty string isolated → other 2 strings continue → DC bus survives
      </text>
    </svg>
  );
}
