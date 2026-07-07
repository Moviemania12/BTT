"use client";
export default function PduInternalDiagram() {
  return (
    <svg viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pdu-int-title">
      <title id="pdu-int-title">PDU Internal Construction — Block Diagram</title>
      <rect width="860" height="360" fill="#fff"/>
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        PDU INTERNAL CONSTRUCTION
      </text>
      {/* Input section */}
      <rect x="30" y="50" width="140" height="260" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2"/>
      <text x="100" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0369a1" textAnchor="middle">INPUT</text>
      <rect x="45" y="85" width="110" height="36" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
      <text x="100" y="100" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0369a1" textAnchor="middle">IEC C20 / Hardwire</text>
      <text x="100" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">Input Connector</text>
      <rect x="45" y="135" width="110" height="36" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
      <text x="100" y="150" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0369a1" textAnchor="middle">Main Input Breaker</text>
      <text x="100" y="162" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">32A / 63A / 125A</text>
      <rect x="45" y="185" width="110" height="36" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
      <text x="100" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0369a1" textAnchor="middle">Input CT/PT Sensors</text>
      <text x="100" y="212" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">V, A, W, PF, kWh</text>
      <rect x="45" y="235" width="110" height="36" rx="4" fill="#e0f2fe" stroke="#7dd3fc"/>
      <text x="100" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0369a1" textAnchor="middle">Surge Protection</text>
      <text x="100" y="262" fontFamily="Arial,sans-serif" fontSize="8" fill="#0369a1" textAnchor="middle">MOV / SPD</text>
      {/* Arrow */}
      <line x1="170" y1="180" x2="220" y2="180" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arw2)"/>
      <defs>
        <marker id="arw2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6Z" fill="#94a3b8"/>
        </marker>
      </defs>
      {/* Bus bar section */}
      <rect x="220" y="50" width="180" height="260" rx="8" fill="#fdf4ff" stroke="#a855f7" strokeWidth="2"/>
      <text x="310" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#7e22ce" textAnchor="middle">BUS BAR</text>
      <rect x="235" y="85" width="150" height="36" rx="4" fill="#f3e8ff" stroke="#c084fc"/>
      <text x="310" y="100" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7e22ce" textAnchor="middle">Phase Distribution</text>
      <text x="310" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">L1 / L2 / L3 / N / PE</text>
      <rect x="235" y="135" width="150" height="36" rx="4" fill="#f3e8ff" stroke="#c084fc"/>
      <text x="310" y="150" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7e22ce" textAnchor="middle">Branch Circuit Breakers</text>
      <text x="310" y="162" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">10A / 16A per branch</text>
      <rect x="235" y="185" width="150" height="36" rx="4" fill="#f3e8ff" stroke="#c084fc"/>
      <text x="310" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7e22ce" textAnchor="middle">Per-Outlet CT Sensors</text>
      <text x="310" y="212" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Individual Amp monitoring</text>
      <rect x="235" y="235" width="150" height="36" rx="4" fill="#f3e8ff" stroke="#c084fc"/>
      <text x="310" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7e22ce" textAnchor="middle">Relay / Solid-State Switch</text>
      <text x="310" y="262" fontFamily="Arial,sans-serif" fontSize="8" fill="#7e22ce" textAnchor="middle">Switched PDU only</text>
      {/* Arrow */}
      <line x1="400" y1="180" x2="450" y2="180" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arw2)"/>
      {/* Controller */}
      <rect x="450" y="50" width="180" height="260" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="540" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534" textAnchor="middle">CONTROLLER</text>
      <rect x="465" y="85" width="150" height="36" rx="4" fill="#dcfce7" stroke="#86efac"/>
      <text x="540" y="100" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">Microcontroller / SoC</text>
      <text x="540" y="112" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Data aggregation + logic</text>
      <rect x="465" y="135" width="150" height="36" rx="4" fill="#dcfce7" stroke="#86efac"/>
      <text x="540" y="150" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">Network Interface</text>
      <text x="540" y="162" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">RJ45 / Dual NIC option</text>
      <rect x="465" y="185" width="150" height="36" rx="4" fill="#dcfce7" stroke="#86efac"/>
      <text x="540" y="200" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">Sensor Ports</text>
      <text x="540" y="212" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">T/H probe, dry contact</text>
      <rect x="465" y="235" width="150" height="36" rx="4" fill="#dcfce7" stroke="#86efac"/>
      <text x="540" y="250" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534" textAnchor="middle">Display (optional)</text>
      <text x="540" y="262" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">LCD / LED indicators</text>
      {/* Arrow */}
      <line x1="630" y1="180" x2="680" y2="180" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arw2)"/>
      {/* Outputs */}
      <rect x="680" y="50" width="150" height="260" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2"/>
      <text x="755" y="74" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c2410c" textAnchor="middle">OUTLETS</text>
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x="695" y={90+i*32} width="120" height="24" rx="3" fill="#ffedd5" stroke="#fed7aa"/>
          <text x="755" y={105+i*32} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#c2410c" textAnchor="middle">
            {i < 4 ? `C13 Outlet ${i+1}` : i===4 ? "C19 Outlet 1" : "C19 Outlet 2"}
          </text>
        </g>
      ))}
      <text x="430" y="340" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        iPDU mein Controller section fully featured hota hai — Basic PDU mein Controller absent ya minimal hota hai
      </text>
    </svg>
  );
}
