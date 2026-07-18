"use client";

export default function BmsDcArchitecture() {
  return (
    <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five-layer BMS architecture: Field, Controller, Network, Server, and Presentation layers">
      <rect width="900" height="520" fill="#ffffff" />
      <text x="450" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700" fill="#111827">BMS Architecture — Five Layers</text>

      {/* Layer backgrounds */}
      <rect x="20" y="50" width="860" height="76" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="20" y="136" width="860" height="76" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <rect x="20" y="222" width="860" height="56" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <rect x="20" y="288" width="860" height="76" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <rect x="20" y="374" width="860" height="76" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />

      {/* Layer labels */}
      <text x="38" y="78" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e">LAYER 5</text>
      <text x="38" y="90" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">PRESENTATION</text>

      <text x="38" y="164" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#5b21b6">LAYER 4</text>
      <text x="38" y="176" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4c1d95">SERVER</text>

      <text x="38" y="248" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0369a1">LAYER 3</text>
      <text x="38" y="260" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">NETWORK</text>

      <text x="38" y="316" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534">LAYER 2</text>
      <text x="38" y="328" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d">CONTROLLER</text>

      <text x="38" y="402" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#991b1b">LAYER 1</text>
      <text x="38" y="414" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#7f1d1d">FIELD</text>

      {/* Presentation layer boxes */}
      {[
        { x: 160, label: "Operator\nWorkstation", sub: "HMI Graphics" },
        { x: 320, label: "Alarm\nMonitor", sub: "Priority / Ack" },
        { x: 480, label: "Trend\nDashboard", sub: "Historical" },
        { x: 640, label: "Reports", sub: "Scheduled / On-demand" },
        { x: 780, label: "Mobile /\nRemote", sub: "Secured Access" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="58" width="120" height="56" rx="6" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1.5" />
          {b.label.split("\n").map((t, j) => (
            <text key={j} x={b.x + 60} y={78 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill="#78350f">{t}</text>
          ))}
          <text x={b.x + 60} y="107" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#92400e">{b.sub}</text>
        </g>
      ))}

      {/* Server layer */}
      <rect x="160" y="144" width="260" height="56" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="290" y="165" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#4c1d95">BMS Server / Application</text>
      <text x="290" y="181" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Alarm engine · Scheduler · API · User management</text>
      <text x="290" y="193" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">EcoStruxure · Desigo CC · Metasys · Honeywell</text>

      <rect x="440" y="144" width="240" height="56" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="165" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#4c1d95">Database / Historian</text>
      <text x="560" y="181" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Point values · Alarm history · Trend data</text>
      <text x="560" y="193" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Data retention per project policy</text>

      {/* Network layer */}
      <rect x="160" y="230" width="660" height="40" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="490" y="248" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">BMS Network — Ethernet / BACnet/IP / Modbus TCP / Dedicated VLAN</text>
      <text x="490" y="262" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1">Segmented from IT network · Redundancy where required</text>

      {/* Controller layer */}
      {[
        { x: 160, label: "DDC\nController", sub: "BACnet MS/TP · Modbus RTU" },
        { x: 300, label: "DDC\nController", sub: "HVAC / AHU" },
        { x: 440, label: "Integration\nModule", sub: "Protocol Gateway" },
        { x: 580, label: "DDC\nController", sub: "Electrical panels" },
        { x: 720, label: "PLC / RTU", sub: "DG / ATS control" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="296" width="130" height="56" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          {b.label.split("\n").map((t, j) => (
            <text key={j} x={b.x + 65} y={314 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill="#14532d">{t}</text>
          ))}
          <text x={b.x + 65} y="347" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#166534">{b.sub}</text>
        </g>
      ))}

      {/* Field layer */}
      {[
        { x: 90, label: "Temp/RH\nSensors", col: "#fee2e2" },
        { x: 210, label: "UPS / PDU\nModbus", col: "#fee2e2" },
        { x: 330, label: "PAC/CRAC\nBACnet", col: "#fee2e2" },
        { x: 450, label: "Energy\nMeters", col: "#fee2e2" },
        { x: 570, label: "DG / ATS\nDry Contact", col: "#fee2e2" },
        { x: 690, label: "Fire Alarm\nStatus only", col: "#fee2e2" },
        { x: 790, label: "Water Leak\nSensors", col: "#fee2e2" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="382" width="100" height="56" rx="6" fill={b.col} stroke="#ef4444" strokeWidth="1.5" />
          {b.label.split("\n").map((t, j) => (
            <text key={j} x={b.x + 50} y={400 + j * 14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill="#7f1d1d">{t}</text>
          ))}
        </g>
      ))}

      {/* Vertical data flow arrows */}
      {[225, 385, 505, 645].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="352" x2={x} y2="374" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bmsArr)" />
          <line x1={x} y1="278" x2={x} y2="288" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bmsArr)" />
        </g>
      ))}
      <line x1="450" y1="200" x2="450" y2="222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bmsArr)" />

      <defs>
        <marker id="bmsArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0,7 3.5,0 7" fill="#64748b" />
        </marker>
      </defs>

      <text x="450" y="510" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Actual architecture varies by project, OEM platform, controller types and integration design</text>
    </svg>
  );
}
