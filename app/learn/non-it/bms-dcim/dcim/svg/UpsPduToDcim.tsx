"use client";
export default function UpsPduToDcim() {
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="How UPS and PDU data reaches DCIM through SNMP Modbus or direct API with discovery device configuration point mapping and power chain visualization">
      <rect width="860" height="400" fill="#fff"/>
      <text x="430" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">How UPS / PDU Data Reaches DCIM — Workflow</text>
      {/* UPS column */}
      <rect x="10" y="42" width="160" height="260" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="90" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">UPS / PDU</text>
      {[{y:74,t:"1. Identify interface",s:"SNMP card? Modbus port?\nManufacturer protocol?"},{y:120,t:"2. Get OEM docs",s:"MIB file (SNMP)\nRegister map (Modbus)\nAPI spec (REST)"},{y:174,t:"3. Configure comm",s:"IP/community/v3 creds\n(SNMP) or IP:502 (Modbus)\nOr API endpoint+key"},{y:228,t:"4. Verify locally",s:"Walk SNMP from CLI\nor Modbus tool"}].map((b,i)=>(
        <g key={i}><rect x="18" y={b.y} width="144" height={b.y===228?62:46} rx="5" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1"/><text x="90" y={b.y+14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#78350f">{b.t}</text>{b.s.split("\n").map((t,j)=><text key={j} x="90" y={b.y+27+j*12} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{t}</text>)}</g>
      ))}
      {/* Arrow */}
      <line x1="170" y1="172" x2="240" y2="172" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dcArr)" strokeDasharray="6,3"/>
      <text x="205" y="166" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b">comm</text>
      {/* DCIM column */}
      <rect x="242" y="42" width="610" height="260" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="547" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d">DCIM SIDE</text>
      {[
        {x:252,y:74,t:"5. Add device in DCIM",s:"Select vendor/model\nEnter IP or comm params\nProtocol: SNMP/Modbus/API"},
        {x:420,y:74,t:"6. Discovery / Point import",s:"SNMP: walk OIDs\nModbus: manual point list\nMatch OEM doc"},
        {x:588,y:74,t:"7. Map to asset",s:"Link device to rack asset\nUPS serves which racks\nPDU branch → circuit"},
        {x:252,y:182,t:"8. Configure polling",s:"Interval per point type\nTimeout / retry\nDriver health check"},
        {x:420,y:182,t:"9. Verify data quality",s:"Live values vs UPS display\nScaling correct?\nBattery%, load% match"},
        {x:588,y:182,t:"10. Power chain view",s:"Utility → UPS → PDU\n→ Rack → Asset\nCapacity overlays"},
      ].map((b,i)=>(
        <g key={i}><rect x={b.x} y={b.y} width="158" height="90" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/><text x={b.x+79} y={b.y+16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d">{b.t}</text>{b.s.split("\n").map((t,j)=><text key={j} x={b.x+79} y={b.y+30+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{t}</text>)}</g>
      ))}
      {/* Alarms/reports row */}
      <rect x="252" y="314" width="594" height="46" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="549" y="334" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e">11. Alarms · Trends · Reports · Capacity Forecasting</text>
      <text x="549" y="350" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">UPS load %, battery alarm, bypass → DCIM alarms · Trend kW/day · Capacity report: rack power used vs available</text>
      <text x="430" y="390" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Steps and protocols depend on UPS/PDU model, communication option and DCIM platform. Verify with OEM documentation.</text>
      <defs><marker id="dcArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0,7 3.5,0 7" fill="#64748b"/></marker></defs>
    </svg>
  );
}
