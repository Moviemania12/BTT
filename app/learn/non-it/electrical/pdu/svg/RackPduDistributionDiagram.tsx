"use client";
export default function RackPduDistributionDiagram() {
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rack-title">
      <title id="rack-title">Rack PDU Dual Distribution — A Path and B Path</title>
      <rect width="860" height="400" fill="#fff"/>
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        RACK PDU — DUAL PATH DISTRIBUTION (A & B)
      </text>
      {/* PDU A */}
      <rect x="60" y="50" width="140" height="300" rx="8" fill="#eaf4ff" stroke="#0066CC" strokeWidth="2.5"/>
      <text x="130" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0066CC" textAnchor="middle">PDU — A PATH</text>
      <text x="130" y="90" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#334155" textAnchor="middle">UPS-A → STS-A</text>
      {[0,1,2,3,4,5,6].map(i => (
        <g key={i}>
          <rect x="75" y={105+i*28} width="110" height="20" rx="3" fill="#bfdbfe" stroke="#93c5fd"/>
          <text x="130" y={118+i*28} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#1e40af" textAnchor="middle">
            Outlet {i+1} — C13
          </text>
        </g>
      ))}
      <rect x="75" y="305" width="110" height="20" rx="3" fill="#93c5fd" stroke="#60a5fa"/>
      <text x="130" y="318" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#1e40af" textAnchor="middle">Outlet 8 — C19</text>
      {/* Rack */}
      <rect x="280" y="50" width="300" height="300" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2"/>
      <text x="430" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0f172a" textAnchor="middle">RACK — R21</text>
      {["Server 1U — PSU-A ← PSU-B", "Server 1U — PSU-A ← PSU-B", "Storage 2U — PSU-A ← PSU-B",
        "Server 1U — PSU-A ← PSU-B", "Network SW — PSU-A ← PSU-B"].map((label, i) => (
        <g key={i}>
          <rect x="295" y={90+i*44} width="270" height={i===2?36:28} rx="4"
            fill={i===2?"#e2e8f0":"#f8fafc"} stroke="#cbd5e1"/>
          <text x="430" y={106+i*44+(i===2?4:0)} fontFamily="Arial,sans-serif" fontSize="8.5"
            fontWeight="600" fill="#334155" textAnchor="middle">{label}</text>
          {/* PSU-A dot */}
          <circle cx="305" cy={103+i*44+(i===2?4:0)} r="4" fill="#0066CC"/>
          {/* PSU-B dot */}
          <circle cx="555" cy={103+i*44+(i===2?4:0)} r="4" fill="#dc2626"/>
        </g>
      ))}
      <text x="310" y="318" fontFamily="Arial,sans-serif" fontSize="8" fill="#0066CC" fontWeight="700">● PSU-A → PDU-A</text>
      <text x="480" y="318" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" fontWeight="700">● PSU-B → PDU-B</text>
      {/* PDU B */}
      <rect x="660" y="50" width="140" height="300" rx="8" fill="#fff1f2" stroke="#dc2626" strokeWidth="2.5"/>
      <text x="730" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#dc2626" textAnchor="middle">PDU — B PATH</text>
      <text x="730" y="90" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#334155" textAnchor="middle">UPS-B → STS-B</text>
      {[0,1,2,3,4,5,6].map(i => (
        <g key={i}>
          <rect x="675" y={105+i*28} width="110" height="20" rx="3" fill="#fecaca" stroke="#fca5a5"/>
          <text x="730" y={118+i*28} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#991b1b" textAnchor="middle">
            Outlet {i+1} — C13
          </text>
        </g>
      ))}
      <rect x="675" y="305" width="110" height="20" rx="3" fill="#fca5a5" stroke="#f87171"/>
      <text x="730" y="318" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#991b1b" textAnchor="middle">Outlet 8 — C19</text>
      {/* Connection lines */}
      <line x1="200" y1="180" x2="280" y2="180" stroke="#0066CC" strokeWidth="1.5" strokeDasharray="5,3"/>
      <line x1="580" y1="180" x2="660" y2="180" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x="430" y="380" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">
        Dual-corded servers: PSU-A on PDU-A (separate UPS path), PSU-B on PDU-B — complete power path redundancy
      </text>
    </svg>
  );
}
