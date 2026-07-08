"use client";
export default function FallOfPotentialDiagram() {
  return (
    <svg viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fop-title">
      <title id="fop-title">Fall of Potential — 3 Pole Earth Resistance Test Method</title>
      <rect width="900" height="380" fill="#fff"/>
      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        FALL OF POTENTIAL — 3 POLE TEST METHOD
      </text>
      {/* Ground surface */}
      <line x1="50" y1="160" x2="850" y2="160" stroke="#78716c" strokeWidth="2"/>
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i} x1={50+i*100} y1="160" x2={50+i*100-20} y2="220" stroke="#d4c5b0" strokeWidth="1"/>
      ))}
      <text x="450" y="155" fontFamily="Arial,sans-serif" fontSize="9" fill="#78716c" textAnchor="middle">SOIL SURFACE</text>

      {/* Earth Under Test (E) */}
      <rect x="60" y="100" width="80" height="60" rx="5" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2.5"/>
      <text x="100" y="124" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0066CC" textAnchor="middle">E</text>
      <text x="100" y="140" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#0066CC" textAnchor="middle">Earth Under</text>
      <text x="100" y="152" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#0066CC" textAnchor="middle">Test</text>
      <line x1="100" y1="160" x2="100" y2="220" stroke="#0066CC" strokeWidth="2"/>
      {/* E ground symbol */}
      <line x1="90" y1="220" x2="110" y2="220" stroke="#0066CC" strokeWidth="2"/>
      <line x1="93" y1="228" x2="107" y2="228" stroke="#0066CC" strokeWidth="1.5"/>
      <line x1="96" y1="236" x2="104" y2="236" stroke="#0066CC" strokeWidth="1"/>

      {/* Potential Probe (P) */}
      <rect x="390" y="100" width="80" height="60" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="430" y="124" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#16a34a" textAnchor="middle">P</text>
      <text x="430" y="140" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#16a34a" textAnchor="middle">Potential</text>
      <text x="430" y="152" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#16a34a" textAnchor="middle">Probe</text>
      <line x1="430" y1="160" x2="430" y2="220" stroke="#16a34a" strokeWidth="2"/>
      <line x1="420" y1="220" x2="440" y2="220" stroke="#16a34a" strokeWidth="2"/>
      <line x1="423" y1="228" x2="437" y2="228" stroke="#16a34a" strokeWidth="1.5"/>
      <line x1="426" y1="236" x2="434" y2="236" stroke="#16a34a" strokeWidth="1"/>

      {/* Current Probe (C) */}
      <rect x="730" y="100" width="80" height="60" rx="5" fill="#fff1f2" stroke="#dc2626" strokeWidth="2"/>
      <text x="770" y="124" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#dc2626" textAnchor="middle">C</text>
      <text x="770" y="140" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626" textAnchor="middle">Current</text>
      <text x="770" y="152" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626" textAnchor="middle">Probe</text>
      <line x1="770" y1="160" x2="770" y2="220" stroke="#dc2626" strokeWidth="2"/>
      <line x1="760" y1="220" x2="780" y2="220" stroke="#dc2626" strokeWidth="2"/>
      <line x1="763" y1="228" x2="777" y2="228" stroke="#dc2626" strokeWidth="1.5"/>
      <line x1="766" y1="236" x2="774" y2="236" stroke="#dc2626" strokeWidth="1"/>

      {/* Earth Tester instrument */}
      <rect x="330" y="30" width="180" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
      <text x="420" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#e2e8f0" textAnchor="middle">EARTH TESTER</text>
      <text x="420" y="68" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8" textAnchor="middle">Kyoritsu 4105A / Fluke 1625</text>

      {/* Connections from tester to probes */}
      <line x1="340" y1="57" x2="140" y2="57" stroke="#0066CC" strokeWidth="2"/>
      <line x1="140" y1="57" x2="140" y2="130" stroke="#0066CC" strokeWidth="2"/>
      <line x1="140" y1="130" x2="140" y2="130" stroke="#0066CC" strokeWidth="2"/>
      <path d="M140,130 L100,130" fill="none" stroke="#0066CC" strokeWidth="2"/>

      <line x1="420" y1="85" x2="420" y2="100" stroke="#16a34a" strokeWidth="2"/>

      <line x1="500" y1="57" x2="770" y2="57" stroke="#dc2626" strokeWidth="2"/>
      <line x1="770" y1="57" x2="770" y2="100" stroke="#dc2626" strokeWidth="2"/>

      {/* Distance labels */}
      <line x1="100" y1="270" x2="430" y2="270" stroke="#475569" strokeWidth="1.5"/>
      <line x1="100" y1="260" x2="100" y2="280" stroke="#475569" strokeWidth="1.5"/>
      <line x1="430" y1="260" x2="430" y2="280" stroke="#475569" strokeWidth="1.5"/>
      <text x="265" y="288" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#475569" textAnchor="middle">d(E→P) = 62% of D</text>

      <line x1="100" y1="310" x2="770" y2="310" stroke="#475569" strokeWidth="1.5"/>
      <line x1="100" y1="300" x2="100" y2="320" stroke="#475569" strokeWidth="1.5"/>
      <line x1="770" y1="300" x2="770" y2="320" stroke="#475569" strokeWidth="1.5"/>
      <text x="435" y="328" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#475569" textAnchor="middle">D(E→C) = recommended ≥30m</text>

      {/* Formula */}
      <rect x="550" y="250" width="300" height="55" rx="5" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="700" y="272" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">FORMULA</text>
      <text x="700" y="290" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0066CC" textAnchor="middle">R = V / I</text>
      <text x="700" y="304" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Tester applies known current, measures voltage</text>

      <text x="450" y="365" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        P probe ko E aur C ke beech 62% distance pe rakhna — measurement most accurate hoti hai is position pe
      </text>
    </svg>
  );
}
