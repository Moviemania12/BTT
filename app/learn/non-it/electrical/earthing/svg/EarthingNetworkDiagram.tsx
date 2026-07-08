"use client";
export default function EarthingNetworkDiagram() {
  return (
    <svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="en-title">
      <title id="en-title">Complete Data Center Earthing Network</title>
      <rect width="900" height="500" fill="#fff"/>
      <text x="450" y="28" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        COMPLETE DATA CENTER EARTHING NETWORK
      </text>
      {/* Main Earth Bar */}
      <rect x="350" y="220" width="200" height="50" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="3"/>
      <text x="450" y="241" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#92400e" textAnchor="middle">MAIN EARTH BAR (MEB)</text>
      <text x="450" y="257" fontFamily="Arial,sans-serif" fontSize="9" fill="#92400e" textAnchor="middle">All earths terminate here</text>

      {/* Earth Pits */}
      <rect x="370" y="340" width="160" height="40" rx="5" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
      <text x="450" y="357" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#065f46" textAnchor="middle">EARTH ELECTRODE SYSTEM</text>
      <text x="450" y="370" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#065f46" textAnchor="middle">Pits / Grid / Chemical MFE</text>
      <line x1="450" y1="270" x2="450" y2="340" stroke="#059669" strokeWidth="3"/>
      {/* Earth symbol */}
      <line x1="440" y1="390" x2="460" y2="390" stroke="#059669" strokeWidth="2.5"/>
      <line x1="443" y1="396" x2="457" y2="396" stroke="#059669" strokeWidth="2"/>
      <line x1="446" y1="402" x2="454" y2="402" stroke="#059669" strokeWidth="1.5"/>

      {/* Equipment connecting to MEB */}
      {[
        { label: "Transformer\nEarth", x: 60, y: 60 },
        { label: "DG Set\nEarth", x: 220, y: 60 },
        { label: "UPS\nEarth", x: 380, y: 60 },
        { label: "Battery Bank\nEarth", x: 540, y: 60 },
        { label: "STS\nEarth", x: 700, y: 60 },
        { label: "Main Panel\nEarth", x: 60, y: 170 },
        { label: "PDU\nEarth", x: 220, y: 170 },
        { label: "Server Racks\nEarth", x: 700, y: 170 },
        { label: "HVAC / CRAC\nEarth", x: 700, y: 310 },
        { label: "Lightning\nProtection", x: 60, y: 310 },
      ].map((item, i) => {
        const lines = item.label.split("\n");
        return (
          <g key={i}>
            <rect x={item.x} y={item.y} width={120} height={42} rx="5"
              fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.5"/>
            {lines.map((ln, li) => (
              <text key={li} x={item.x+60} y={item.y+17+li*15}
                fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600"
                fill="#0369a1" textAnchor="middle">{ln}</text>
            ))}
            {/* Line to MEB */}
            <line
              x1={item.x+60} y1={item.y+42}
              x2={i < 5 ? (item.x < 350 ? 380 : item.x > 550 ? 550 : 450) : (item.x < 350 ? 380 : item.x > 550 ? 550 : 450)}
              y2={245}
              stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3"/>
          </g>
        );
      })}

      {/* Clean Earth notation */}
      <rect x="550" y="170" width="120" height="42" rx="5" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5"/>
      <text x="610" y="187" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#7e22ce" textAnchor="middle">Clean Earth</text>
      <text x="610" y="202" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#7e22ce" textAnchor="middle">IT Equipment</text>
      <line x1="610" y1="212" x2="550" y2="245" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5,3"/>

      <text x="450" y="475" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8" textAnchor="middle">
        All earth paths converge at Main Earth Bar → Earth Electrode System → Actual Earth (Soil)
      </text>
    </svg>
  );
}
