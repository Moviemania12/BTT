"use client";
export default function DcimArchitecture() {
  return (
    <svg viewBox="0 0 880 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DCIM architecture showing physical infrastructure layer connecting through data acquisition to DCIM server asset database and presentation dashboards">
      <rect width="880" height="480" fill="#fff"/>
      <text x="440" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">DCIM Architecture — Infrastructure to Intelligence</text>
      {/* Physical layer */}
      <rect x="10" y="42" width="860" height="72" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="24" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">PHYSICAL INFRASTRUCTURE LAYER</text>
      {[{x:30,l:"Servers &\nStorage",s:"Per rack"},{x:160,l:"Network\nEquipment",s:"Switches/routers"},{x:290,l:"Intelligent\nPDUs",s:"Branch metering"},{x:420,l:"UPS\nSystems",s:"SNMP/Modbus"},{x:550,l:"CRAC/CRAH\nUnits",s:"Temperature"},{x:680,l:"Env.\nSensors",s:"Temp/RH/leak"},{x:790,l:"Access\nControl",s:"Door status"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="52" width="108" height="50" rx="5" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+54} y={68+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill="#78350f">{t}</text>)}<text x={b.x+54} y="97" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e">{b.s}</text></g>
      ))}
      {/* Data acquisition */}
      <rect x="10" y="124" width="860" height="46" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="440" y="144" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">DATA ACQUISITION — SNMP · Modbus · BACnet · REST API · Agent · Manual Import</text>
      <text x="440" y="160" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1">Protocol drivers · Gateways where needed · Discovery · Polling · Change of State</text>
      {/* DCIM Core */}
      <rect x="10" y="180" width="560" height="80" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="24" y="200" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">DCIM CORE ENGINE</text>
      <text x="285" y="216" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">Asset database · Rack elevation engine · Power chain modeling</text>
      <text x="285" y="230" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">Capacity calculation · Alarm engine · Work order / MAC workflow</text>
      <text x="285" y="244" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">Report generator · Analytics engine · Integration bus</text>
      {/* Asset DB */}
      <rect x="590" y="180" width="280" height="80" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="730" y="200" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95">ASSET DATABASE + HISTORIAN</text>
      <text x="730" y="216" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Equipment records · Rack assignments</text>
      <text x="730" y="230" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Power/temp time series · Capacity history</text>
      <text x="730" y="244" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Audit trail · MAC history</text>
      {/* Presentation */}
      <rect x="10" y="274" width="860" height="66" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="24" y="293" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7f1d1d">PRESENTATION LAYER</text>
      {[{x:30,l:"Floor Plan\nView"},{x:175,l:"Rack\nElevation"},{x:320,l:"Power Chain\nView"},{x:465,l:"Capacity\nDashboard"},{x:610,l:"Reports &\nExports"},{x:740,l:"API /\nIntegration"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="282" width="120" height="44" rx="5" fill="#fef2f2" stroke="#ef4444" strokeWidth="1"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+60} y={296+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="600" fill="#7f1d1d">{t}</text>)}</g>
      ))}
      {/* Integration box */}
      <rect x="10" y="352" width="860" height="56" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      <text x="440" y="372" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#374151">NORTHBOUND / SOUTHBOUND INTEGRATIONS</text>
      <text x="440" y="388" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#64748b">BMS ↔ EMS ↔ NMS ↔ CMMS ↔ Ticketing ↔ ITSM ↔ Cloud/API</text>
      <text x="440" y="402" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Data normalization · Point mapping · Integration middleware</text>
      <text x="440" y="470" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Actual architecture and supported integrations depend on DCIM platform, version, edition and project design</text>
    </svg>
  );
}
