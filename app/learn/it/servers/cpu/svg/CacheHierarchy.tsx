"use client";
export default function CacheHierarchy() {
  const levels = [
    {label:"L1 Cache",sub:"Per core · Fastest · Smallest capacity",c:"#eff6ff",bc:"#2563eb",tc:"#1e40af",w:220},
    {label:"L2 Cache",sub:"Per core · Larger than L1",c:"#f0fdf4",bc:"#16a34a",tc:"#166534",w:320},
    {label:"L3 Cache (LLC)",sub:"Shared across all cores in socket · Largest on-chip cache",c:"#fef3c7",bc:"#f59e0b",tc:"#78350f",w:460},
    {label:"System RAM",sub:"Off-chip · Large capacity · Higher latency than cache",c:"#fff7ed",bc:"#f97316",tc:"#c2410c",w:580},
    {label:"Storage (NVMe / SAS / SATA)",sub:"Non-volatile · Much larger · Much higher latency",c:"#fef2f2",bc:"#dc2626",tc:"#991b1b",w:680},
  ];
  return (
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Memory hierarchy pyramid from L1 cache fastest and smallest to storage slowest and largest">
      <rect width="720" height="360" fill="#fff"/>
      <text x="360" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Memory Hierarchy — Speed vs Capacity</text>
      {levels.map((l,i)=>{
        const y=44+i*58; const x=(720-l.w)/2;
        return(<g key={i}>
          <rect x={x} y={y} width={l.w} height="48" rx="6" fill={l.c} stroke={l.bc} strokeWidth="2"/>
          <text x={360} y={y+20} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={l.tc}>{l.label}</text>
          <text x={360} y={y+36} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">{l.sub}</text>
          {i<levels.length-1&&<line x1="360" y1={y+48} x2="360" y2={y+58} stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,2"/>}
        </g>);
      })}
      <text x="30" y="160" fontFamily="Arial,sans-serif" fontSize="9" fill="#2563eb" fontWeight="700">← FASTER</text>
      <text x="30" y="172" fontFamily="Arial,sans-serif" fontSize="9" fill="#2563eb">← SMALLER</text>
      <text x="30" y="244" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" fontWeight="700">← SLOWER</text>
      <text x="30" y="256" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626">← LARGER</text>
      <text x="360" y="350" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Actual latency and capacity values depend on CPU architecture, generation and implementation.</text>
    </svg>
  );
}
