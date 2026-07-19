"use client";
export default function EmsArchitecture() {
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EMS architecture showing metering layer connecting to data acquisition then EMS server database and presentation">
      <rect width="860" height="420" fill="#fff"/>
      <text x="430" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">Energy Management System — Architecture</text>
      {/* Layer 1: Metering */}
      <rect x="10" y="44" width="840" height="72" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="24" y="66" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">METERING LAYER</text>
      {[{x:60,l:"Utility\nIncomer",s:"Main meter"},{x:185,l:"Transformer\nOutput",s:"HT/LT meter"},{x:310,l:"UPS\nOutput",s:"IT load"},{x:435,l:"CRAC/\nCooling",s:"Cooling load"},{x:560,l:"PDU/\nBranch",s:"Sub-meter"},{x:685,l:"DG\nOutput",s:"Generator"},{x:775,l:"Misc\nCircuits",s:"Other loads"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="55" width="105" height="50" rx="5" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+52} y={71+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="600" fill="#78350f">{t}</text>)}<text x={b.x+52} y="100" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e">{b.s}</text></g>
      ))}
      {/* Layer 2: Data Acquisition */}
      <rect x="10" y="126" width="840" height="52" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="24" y="147" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e">DATA ACQUISITION</text>
      <text x="430" y="147" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">Modbus RTU / Modbus TCP / BACnet / Pulse Counter / Direct API</text>
      <text x="430" y="162" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1">Protocol gateway where required · Polling interval per project design · Data quality / timeout handling</text>
      {/* Layer 3: EMS Server */}
      <rect x="10" y="188" width="530" height="76" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="24" y="208" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d">EMS SERVER / APPLICATION</text>
      <text x="275" y="225" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#166534">Data normalization · KPI calculation (kW, kWh, demand, PF, PUE)</text>
      <text x="275" y="240" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#166534">Alarm engine · Scheduler · Report generator · Validation engine</text>
      <text x="275" y="254" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">ISO 50001 platforms · BMS-integrated modules · Standalone EMS · DCIM-embedded EMS</text>
      {/* Historian */}
      <rect x="560" y="188" width="290" height="76" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="705" y="208" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95">HISTORIAN / DATABASE</text>
      <text x="705" y="224" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Time-series energy data storage</text>
      <text x="705" y="238" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">15-min / hourly / daily aggregates</text>
      <text x="705" y="252" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6d28d9">Retention per project policy</text>
      {/* Layer 4: Presentation */}
      <rect x="10" y="278" width="840" height="60" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="24" y="298" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7f1d1d">PRESENTATION LAYER</text>
      {[{x:60,l:"Energy\nDashboard"},{x:200,l:"Real-time\nKPI View"},{x:340,l:"Alarm /\nEvent Log"},{x:480,l:"Trend &\nHistory"},{x:620,l:"Reports &\nExports"},{x:740,l:"API /\nIntegration"}].map((b,i)=>(
        <g key={i}><rect x={b.x} y="286" width="120" height="40" rx="5" fill="#fef2f2" stroke="#ef4444" strokeWidth="1"/>{b.l.split("\n").map((t,j)=><text key={j} x={b.x+60} y={299+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="600" fill="#7f1d1d">{t}</text>)}</g>
      ))}
      <text x="430" y="410" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Actual architecture, metering points and KPIs depend on project instrumentation and design</text>
    </svg>
  );
}
