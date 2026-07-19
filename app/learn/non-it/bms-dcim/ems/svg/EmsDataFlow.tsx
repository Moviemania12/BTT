"use client";
export default function EmsDataFlow() {
  const steps = [
    {icon:"⚡",t:"Physical\nLoad",s:"IT / Cooling /\nLighting",c:"#fee2e2",bc:"#ef4444",tc:"#7f1d1d"},
    {icon:"🔌",t:"Energy\nMeter",s:"CT / VT /\nkWh pulse",c:"#fef3c7",bc:"#f59e0b",tc:"#78350f"},
    {icon:"📡",t:"Protocol\nInterface",s:"Modbus RTU/TCP\nPulse / BACnet",c:"#fff7ed",bc:"#f97316",tc:"#7c2d12"},
    {icon:"🔄",t:"Gateway\n(if needed)",s:"Protocol\nconversion",c:"#ede9fe",bc:"#7c3aed",tc:"#4c1d95"},
    {icon:"🖥️",t:"EMS\nServer",s:"Polling /\nreceiving data",c:"#e0f2fe",bc:"#0ea5e9",tc:"#0c4a6e"},
    {icon:"📐",t:"Scaling &\nNormalization",s:"Raw → kW/kWh\nDemand / PF",c:"#f0fdf4",bc:"#16a34a",tc:"#14532d"},
    {icon:"🗄️",t:"Historian",s:"Time-series\nstorage",c:"#faf5ff",bc:"#a855f7",tc:"#6b21a8"},
    {icon:"📊",t:"KPI &\nDashboard",s:"PUE / Cost /\nEfficiency",c:"#f0f9ff",bc:"#2563eb",tc:"#1e3a8a"},
    {icon:"📋",t:"Reports &\nAlarms",s:"ISO 50001\nAudit evidence",c:"#fef2f2",bc:"#dc2626",tc:"#991b1b"},
  ];
  return (
    <svg viewBox="0 0 920 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EMS data flow from physical load through meter, protocol, gateway, server, scaling, historian to KPI dashboard and reports">
      <rect width="920" height="280" fill="#fff"/>
      <text x="460" y="22" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">EMS Data Flow — Physical Load to Energy KPI</text>
      {steps.map((s,i)=>{const x=15+i*100;return(<g key={i}><rect x={x} y="38" width="90" height="120" rx="8" fill={s.c} stroke={s.bc} strokeWidth="1.5"/><text x={x+45} y="60" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="17">{s.icon}</text>{s.t.split("\n").map((t,j)=><text key={j} x={x+45} y={80+j*13} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill={s.tc}>{t}</text>)}{s.s.split("\n").map((t,j)=><text key={j} x={x+45} y={110+j*11} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{t}</text>)}{i<steps.length-1&&<line x1={x+90} y1="98" x2={x+98} y2="98" stroke="#64748b" strokeWidth="2" markerEnd="url(#eArr)"/>}</g>);})}
      <rect x="15" y="172" width="890" height="36" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="460" y="190" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#374151">Key EMS Parameters:</text>
      <text x="460" y="203" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">kW (instantaneous power) · kWh (energy consumed) · kVAR (reactive power) · kVA · Power Factor · Peak Demand · PUE (facility/IT) · Cost per kWh</text>
      <rect x="15" y="220" width="890" height="46" rx="6" fill="#f0f9ff" stroke="#bfdbfe"/>
      <text x="30" y="237" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af">EMS Data Validation:</text>
      <text x="30" y="250" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">• Zero/null values — meter offline or comm failure? · Frozen values — stale data? · Spike values — transient or scaling error? · Missing interval — historian gap?</text>
      <text x="30" y="262" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">• Accumulation mismatch — sub-meter sum ≠ main meter (losses, unmetered loads, meter error) · Negative values — CT polarity reversed?</text>
      <defs><marker id="eArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0,7 3.5,0 7" fill="#64748b"/></marker></defs>
    </svg>
  );
}
