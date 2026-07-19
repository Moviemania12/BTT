"use client";
export default function SensorSignalTypes() {
  const rows = [
    {sig:"Digital Input\n(Dry Contact)",ex:"Door open/close\nAlarm relay\nRun status",hw:"2-wire volt-free",bms:"Controller DI",note:"24V DC from controller\ndetects open/close",c:"#fef3c7",bc:"#f59e0b",tc:"#78350f"},
    {sig:"4–20 mA\nCurrent Loop",ex:"Temp / Humidity\nPressure / Level\nFlow",hw:"2-wire or 4-wire",bms:"Controller AI",note:"Live zero (4mA=0%)\nCable length tolerant",c:"#e0f2fe",bc:"#0ea5e9",tc:"#0c4a6e"},
    {sig:"0–10 V DC\nVoltage Signal",ex:"Fan speed\nValve position\nSome temp sensors",hw:"3-wire (V,S,GND)",bms:"Controller AI",note:"Short runs preferred\nVoltage drop issue on long cables",c:"#f0fdf4",bc:"#16a34a",tc:"#14532d"},
    {sig:"RTD / Thermistor\n(Resistance)",ex:"Precision temp\nWinding temp",hw:"2, 3 or 4-wire",bms:"Dedicated RTD input",note:"Pt100 / Pt1000 most common\n4-wire eliminates lead resistance",c:"#ede9fe",bc:"#7c3aed",tc:"#4c1d95"},
    {sig:"Pulse Output",ex:"Energy meter\nFlow meter",hw:"2-wire pulse",bms:"Controller pulse input",note:"1 pulse = N units (OEM spec)\nAccumulation in controller",c:"#fff7ed",bc:"#f97316",tc:"#7c2d12"},
    {sig:"Modbus RTU/TCP\nor BACnet",ex:"Network sensors\nSmart meters\nPAC/CRAC units",hw:"RS-485 or Ethernet",bms:"Protocol driver",note:"Multiple values per device\nAddressed communication",c:"#fef2f2",bc:"#ef4444",tc:"#7f1d1d"},
  ];
  return (
    <svg viewBox="0 0 880 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sensor signal types showing digital input, 4-20mA, 0-10V, RTD, pulse and Modbus signals connecting to BMS controller">
      <rect width="880" height="400" fill="#fff"/>
      <text x="440" y="22" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Sensor Signal Types — BMS Integration</text>
      {rows.map((r,i)=>{
        const col=i<3?0:1; const row=i%3; const x=col*440+10; const y=38+row*118;
        return(<g key={i}>
          <rect x={x} y={y} width="415" height="110" rx="8" fill={r.c} stroke={r.bc} strokeWidth="1.5"/>
          <rect x={x} y={y} width="130" height="110" rx="8" fill={r.bc}/>
          {r.sig.split("\n").map((t,j)=><text key={j} x={x+65} y={y+28+j*16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#fff">{t}</text>)}
          <text x={x+145} y={y+20} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill={r.tc}>Signal type</text>
          <text x={x+145} y={y+36} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Hardware: {r.hw}</text>
          <text x={x+145} y={y+50} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">BMS connection: {r.bms}</text>
          <text x={x+145} y={y+68} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill={r.tc}>Typical sensors:</text>
          {r.ex.split("\n").map((t,j)=><text key={j} x={x+145} y={y+82+j*13} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{t}</text>)}
          <text x={x+360} y={y+20} fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="end">Note:</text>
          {r.note.split("\n").map((t,j)=><text key={j} x={x+405} y={y+35+j*12} fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="end">{t}</text>)}
        </g>);
      })}
      <text x="440" y="392" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Signal type selection depends on sensor model, cable length, controller inputs and project design</text>
    </svg>
  );
}
