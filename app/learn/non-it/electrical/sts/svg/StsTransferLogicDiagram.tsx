"use client";

export default function StsTransferLogicDiagram() {
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sts-logic-title">
      <title id="sts-logic-title">STS Transfer Logic Flowchart</title>
      <rect width="860" height="440" fill="#ffffff" />
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        STS TRANSFER LOGIC — DECISION FLOW
      </text>

      {/* Monitor box */}
      <rect x="320" y="50" width="220" height="50" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="430" y="72" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">CONTINUOUS MONITORING</text>
      <text x="430" y="88" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Both sources: Voltage, Frequency, Phase</text>

      {/* Arrow down */}
      <line x1="430" y1="100" x2="430" y2="130" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arr)" />

      {/* Decision 1 */}
      <polygon points="430,130 530,165 430,200 330,165" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="430" y="160" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">Preferred Source</text>
      <text x="430" y="175" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">OK?</text>

      {/* YES → stay */}
      <line x1="530" y1="165" x2="640" y2="165" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="575" y="158" fontFamily="Arial,sans-serif" fontSize="9" fill="#16a34a" fontWeight="700">YES</text>
      <rect x="640" y="140" width="140" height="50" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="710" y="162" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">No Action</text>
      <text x="710" y="178" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Stay on preferred</text>

      {/* NO → arrow down */}
      <line x1="430" y1="200" x2="430" y2="230" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="412" y="220" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" fontWeight="700">NO</text>

      {/* Decision 2 — sync check */}
      <polygon points="430,230 550,268 430,306 310,268" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="430" y="260" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">Alternate Source</text>
      <text x="430" y="275" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">Synchronized?</text>

      {/* YES → seamless */}
      <line x1="550" y1="268" x2="640" y2="268" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="583" y="260" fontFamily="Arial,sans-serif" fontSize="9" fill="#16a34a" fontWeight="700">YES</text>
      <rect x="640" y="243" width="180" height="50" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="730" y="263" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">Make-Before-Break</text>
      <text x="730" y="278" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Zero interruption transfer</text>
      <text x="730" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">≤ 4 ms total</text>

      {/* NO → brief break */}
      <line x1="310" y1="268" x2="180" y2="268" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr)" />
      <text x="238" y="260" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" fontWeight="700">NO</text>
      <rect x="30" y="243" width="150" height="50" rx="5" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="105" y="262" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Break-Before</text>
      <text x="105" y="276" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b" textAnchor="middle">Make Transfer</text>
      <text x="105" y="290" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">Brief interruption possible</text>

      {/* Both arrows to output */}
      <line x1="730" y1="293" x2="730" y2="350" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="105" y1="293" x2="105" y2="350" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="105" y1="350" x2="730" y2="350" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="430" y1="350" x2="430" y2="375" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr)" />

      {/* Final state */}
      <rect x="310" y="375" width="240" height="48" rx="6" fill="#dbeafe" stroke="#0066CC" strokeWidth="2" />
      <text x="430" y="397" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1d4ed8" textAnchor="middle">Load on Alternate Source</text>
      <text x="430" y="413" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Monitor for preferred source restoration</text>

      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
