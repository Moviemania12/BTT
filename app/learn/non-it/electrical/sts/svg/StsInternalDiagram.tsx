"use client";

export default function StsInternalDiagram() {
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sts-int-title">
      <title id="sts-int-title">STS Internal Block Diagram — SCR Switching Architecture</title>
      <rect width="860" height="380" fill="#ffffff" />
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        STS INTERNAL BLOCK DIAGRAM
      </text>

      {/* Source A input */}
      <rect x="20" y="70" width="110" height="48" rx="6" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2" />
      <text x="75" y="91" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0066CC" textAnchor="middle">SOURCE A</text>
      <text x="75" y="107" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">UPS-A Output</text>

      {/* Source B input */}
      <rect x="20" y="260" width="110" height="48" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="75" y="281" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">SOURCE B</text>
      <text x="75" y="297" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">UPS-B Output</text>

      {/* Voltage/Freq sensors */}
      <rect x="165" y="60" width="90" height="68" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="210" y="84" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">V / F</text>
      <text x="210" y="97" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">SENSOR A</text>
      <text x="210" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Phase / Freq</text>
      <text x="210" y="122" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Monitor</text>

      <rect x="165" y="250" width="90" height="68" rx="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="210" y="274" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">V / F</text>
      <text x="210" y="287" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">SENSOR B</text>
      <text x="210" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Phase / Freq</text>
      <text x="210" y="312" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Monitor</text>

      {/* Control Logic */}
      <rect x="290" y="145" width="130" height="88" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="355" y="168" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">CONTROL</text>
      <text x="355" y="182" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">LOGIC</text>
      <text x="355" y="200" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">• Source monitoring</text>
      <text x="355" y="213" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">• Sync detection</text>
      <text x="355" y="225" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">• Gate firing signals</text>

      {/* SCR Set A */}
      <rect x="460" y="60" width="100" height="68" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="510" y="84" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">SCR SET A</text>
      <text x="510" y="98" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Anti-parallel</text>
      <text x="510" y="110" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Thyristors</text>
      <text x="510" y="122" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">(3 pairs for 3φ)</text>

      {/* SCR Set B */}
      <rect x="460" y="250" width="100" height="68" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="510" y="274" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">SCR SET B</text>
      <text x="510" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Anti-parallel</text>
      <text x="510" y="300" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Thyristors</text>
      <text x="510" y="312" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">(3 pairs for 3φ)</text>

      {/* Output bus */}
      <rect x="600" y="155" width="20" height="68" rx="3" fill="#1e293b" />
      <text x="650" y="172" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0f172a">Output</text>
      <text x="650" y="185" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569">Bus Bar</text>

      {/* Load */}
      <rect x="710" y="155" width="120" height="68" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="770" y="182" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">LOAD</text>
      <text x="770" y="198" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Single-corded</text>
      <text x="770" y="212" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">equipment</text>

      {/* Connecting lines */}
      <line x1="130" y1="94" x2="165" y2="94" stroke="#0066CC" strokeWidth="2" />
      <line x1="130" y1="284" x2="165" y2="284" stroke="#f97316" strokeWidth="2" />
      <line x1="255" y1="94" x2="290" y2="175" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="255" y1="284" x2="290" y2="205" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="255" y1="94" x2="460" y2="94" stroke="#0066CC" strokeWidth="2" />
      <line x1="255" y1="284" x2="460" y2="284" stroke="#f97316" strokeWidth="2" />
      <line x1="420" y1="175" x2="460" y2="94" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="420" y1="203" x2="460" y2="284" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="560" y1="94" x2="600" y2="175" stroke="#334155" strokeWidth="2.5" />
      <line x1="560" y1="284" x2="600" y2="207" stroke="#334155" strokeWidth="2.5" />
      <line x1="620" y1="189" x2="710" y2="189" stroke="#16a34a" strokeWidth="2.5" />

      {/* Gate firing label */}
      <text x="430" y="142" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Gate firing</text>

      {/* Legend */}
      <rect x="20" y="340" width="820" height="32" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="430" y="355" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">
        Active SCR Set conducts load current. Control Logic determines which set receives gate firing signal.
      </text>
      <text x="430" y="367" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" textAnchor="middle">
        Transfer: Control removes gate signal from active set → gives gate signal to alternate set (2–4 ms total)
      </text>
    </svg>
  );
}
