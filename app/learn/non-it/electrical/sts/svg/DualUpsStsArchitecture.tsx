"use client";

export default function DualUpsStsArchitecture() {
  return (
    <svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dual-ups-title">
      <title id="dual-ups-title">Dual UPS Architecture with STS for Single-Corded Loads</title>
      <rect width="900" height="480" fill="#ffffff" />
      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        DUAL UPS + STS ARCHITECTURE — DATA CENTER
      </text>

      {/* Grid A */}
      <rect x="30" y="55" width="100" height="44" rx="5" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="80" y="73" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC" textAnchor="middle">GRID A</text>
      <text x="80" y="87" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Utility Feed A</text>

      {/* Grid B */}
      <rect x="30" y="380" width="100" height="44" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="80" y="398" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#c2410c" textAnchor="middle">GRID B</text>
      <text x="80" y="412" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Utility Feed B</text>

      {/* UPS A */}
      <rect x="175" y="45" width="110" height="64" rx="6" fill="#dbeafe" stroke="#0066CC" strokeWidth="2" />
      <text x="230" y="68" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1d4ed8" textAnchor="middle">UPS A</text>
      <text x="230" y="83" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Online Double</text>
      <text x="230" y="95" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Conversion</text>

      {/* UPS B */}
      <rect x="175" y="370" width="110" height="64" rx="6" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
      <text x="230" y="393" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">UPS B</text>
      <text x="230" y="408" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Online Double</text>
      <text x="230" y="420" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Conversion</text>

      {/* PDU A */}
      <rect x="345" y="45" width="100" height="64" rx="6" fill="#dbeafe" stroke="#0066CC" strokeWidth="1.5" />
      <text x="395" y="68" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1d4ed8" textAnchor="middle">PDU A</text>
      <text x="395" y="83" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Power Dist</text>
      <text x="395" y="95" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Unit — Path A</text>

      {/* PDU B */}
      <rect x="345" y="370" width="100" height="64" rx="6" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" />
      <text x="395" y="393" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">PDU B</text>
      <text x="395" y="408" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Power Dist</text>
      <text x="395" y="420" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Unit — Path B</text>

      {/* STS */}
      <rect x="500" y="195" width="120" height="90" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
      <text x="560" y="225" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#92400e" textAnchor="middle">STS</text>
      <text x="560" y="242" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f" textAnchor="middle">Static Transfer</text>
      <text x="560" y="255" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f" textAnchor="middle">Switch</text>
      <text x="560" y="270" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">2–4 ms transfer</text>

      {/* Dual-corded server */}
      <rect x="680" y="100" width="180" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="770" y="125" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">DUAL-CORDED</text>
      <text x="770" y="139" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">SERVER</text>
      <text x="770" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PSU1 ← PDU-A</text>
      <text x="770" y="167" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PSU2 ← PDU-B</text>

      {/* Single-corded device */}
      <rect x="680" y="220" width="180" height="80" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="770" y="245" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">SINGLE-CORDED</text>
      <text x="770" y="259" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">DEVICE</text>
      <text x="770" y="275" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PSU ← STS output</text>
      <text x="770" y="287" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Protected by STS</text>

      {/* Dual-corded other */}
      <rect x="680" y="335" width="180" height="80" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="770" y="360" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">DUAL-CORDED</text>
      <text x="770" y="374" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">NETWORK SW</text>
      <text x="770" y="390" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PSU1 ← PDU-A</text>
      <text x="770" y="403" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">PSU2 ← PDU-B</text>

      {/* Connecting lines */}
      <line x1="130" y1="77" x2="175" y2="77" stroke="#0066CC" strokeWidth="2" />
      <line x1="130" y1="402" x2="175" y2="402" stroke="#f97316" strokeWidth="2" />
      <line x1="285" y1="77" x2="345" y2="77" stroke="#0066CC" strokeWidth="2" />
      <line x1="285" y1="402" x2="345" y2="402" stroke="#f97316" strokeWidth="2" />
      {/* PDU A to dual-corded server */}
      <line x1="445" y1="77" x2="680" y2="140" stroke="#0066CC" strokeWidth="1.5" />
      {/* PDU B to dual-corded server */}
      <line x1="445" y1="402" x2="680" y2="160" stroke="#f97316" strokeWidth="1.5" />
      {/* PDU A and B to STS */}
      <line x1="445" y1="77" x2="500" y2="225" stroke="#0066CC" strokeWidth="2" strokeDasharray="6,3" />
      <line x1="445" y1="402" x2="500" y2="255" stroke="#f97316" strokeWidth="2" strokeDasharray="6,3" />
      {/* STS to single-corded */}
      <line x1="620" y1="240" x2="680" y2="258" stroke="#d97706" strokeWidth="2.5" />
      {/* PDU A to dual-corded network sw */}
      <line x1="445" y1="77" x2="680" y2="360" stroke="#0066CC" strokeWidth="1.5" />
      {/* PDU B to dual-corded network sw */}
      <line x1="445" y1="402" x2="680" y2="395" stroke="#f97316" strokeWidth="1.5" />

      {/* Labels on dashed lines */}
      <text x="466" y="148" fontFamily="Arial,sans-serif" fontSize="8" fill="#d97706" transform="rotate(-55,466,148)">Source A → STS</text>
      <text x="466" y="330" fontFamily="Arial,sans-serif" fontSize="8" fill="#d97706" transform="rotate(55,466,330)">Source B → STS</text>

      {/* Legend box */}
      <rect x="30" y="445" width="840" height="26" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="50" y1="458" x2="80" y2="458" stroke="#0066CC" strokeWidth="2" />
      <text x="85" y="462" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155">Path A (UPS-A)</text>
      <line x1="185" y1="458" x2="215" y2="458" stroke="#f97316" strokeWidth="2" />
      <text x="220" y="462" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155">Path B (UPS-B)</text>
      <line x1="320" y1="458" x2="350" y2="458" stroke="#d97706" strokeWidth="2.5" />
      <text x="355" y="462" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155">STS protected path</text>
      <line x1="475" y1="455" x2="505" y2="461" stroke="#0066CC" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="510" y="462" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155">STS source inputs (from PDU-A/B)</text>
    </svg>
  );
}
