"use client";
export default function ScadaArchitecture() {
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SCADA architecture showing field devices connecting through RTU or PLC to communication network then SCADA server HMI and historian">
      <rect width="860" height="440" fill="#fff"/>
      <text x="430" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">SCADA Architecture — Five Layers</text>
      {/* Field layer */}
      <rect x="10" y="40" width="840" height="66" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="24" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">FIELD LAYER — Sensors, Actuators, Equipment</text>
      {[{x:30,l:"Sensors\nTransducers"},{x:160,l:"Valves\nActuators"},{x:290,l:"Motors\nPumps"},{x:420,l:"Protection\nRelays"},{x:550,l:"Circuit\nBreakers"},{x:680,l:"Energy\nMeters"},{x:780,l:"Misc\nEquipment"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="48" width="110" height="44" rx="5" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+55} y={63+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill="#78350f">{t}</text>)}</g>
      ))}
      {/* RTU/PLC layer */}
      <rect x="10" y="116" width="840" height="66" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="24" y="136" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95">CONTROLLER LAYER — RTU / PLC / Intelligent Electronic Device (IED)</text>
      {[{x:30,l:"RTU\n(Remote Site)"},{x:200,l:"PLC\n(Local Control)"},{x:370,l:"IED\n(Protection)"},{x:540,l:"Gateway\n(Protocol Conv.)"},{x:700,l:"DDC\n(Building)"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="126" width="150" height="44" rx="5" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+75} y={141+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill="#4c1d95">{t}</text>)}</g>
      ))}
      {/* Communication */}
      <rect x="10" y="192" width="840" height="46" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="430" y="212" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">COMMUNICATION LAYER — Modbus RTU/TCP · DNP3 · IEC 61850 · OPC UA · Profibus · Ethernet</text>
      <text x="430" y="228" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1">Serial / Ethernet / Fiber · Redundant paths for critical applications · Dedicated OT network</text>
      {/* SCADA Server */}
      <rect x="10" y="248" width="480" height="74" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="24" y="268" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">SCADA SERVER</text>
      <text x="250" y="285" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">Data acquisition · Tag database · Alarm engine</text>
      <text x="250" y="299" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">Trend logging · Script/sequence execution</text>
      <text x="250" y="313" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">Wonderware · Ignition · Citect · iFIX · RS View · custom</text>
      {/* Historian */}
      <rect x="510" y="248" width="340" height="74" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5"/>
      <text x="680" y="268" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8">HISTORIAN</text>
      <text x="680" y="285" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#6b21a8">Time-series process data</text>
      <text x="680" y="299" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#6b21a8">Long-term storage, query</text>
      <text x="680" y="313" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">OSIsoft PI · AVEVA · custom DB</text>
      {/* HMI / Operator */}
      <rect x="10" y="334" width="840" height="52" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="24" y="354" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7f1d1d">PRESENTATION — HMI · Operator Workstation · Alarm Console · Engineering Workstation · Remote Access</text>
      <text x="430" y="374" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Mimic diagrams · P&amp;ID views · Alarm summaries · Trend displays · Report generation</text>
      <text x="430" y="430" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">SCADA not required in typical data centers — used for industrial process, utility, high-voltage applications and custom hyperscale automation</text>
    </svg>
  );
}
