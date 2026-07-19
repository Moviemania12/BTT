"use client";
export default function DimmChannels() {
  return (
    <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Memory channels diagram showing CPU memory controller connecting to multiple DIMM channels with symmetric population">
      <rect width="800" height="340" fill="#fff"/>
      <text x="400" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Memory Channels — CPU to DIMM Relationship</text>
      {/* CPU */}
      <rect x="310" y="40" width="180" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="400" y="72" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af">CPU</text>
      <text x="400" y="90" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Memory Controller</text>
      <text x="400" y="106" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#6b7280">(built into modern CPUs)</text>
      {/* Channels */}
      {["Channel A","Channel B","Channel C","Channel D"].map((ch,i)=>{
        const x=40+i*190; const y=168;
        return (<g key={i}>
          <line x1="400" y1="120" x2={x+80} y2={y} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3"/>
          <rect x={x} y={y} width="160" height="30" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
          <text x={x+80} y={y+19} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">{ch}</text>
          {/* DIMMs on each channel */}
          {[0,1].map(j=>{
            const dy=y+42+j*52;
            return(<g key={j}>
              <rect x={x+20} y={dy} width="120" height="40" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
              <text x={x+80} y={dy+16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="600" fill="#166534">DIMM {j+1}</text>
              <text x={x+80} y={dy+30} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Slot {i*2+j+1}</text>
              {j===0&&<line x1={x+80} y1={dy+40} x2={x+80} y2={dy+52} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2"/>}
            </g>);
          })}
        </g>);
      })}
      {/* Key */}
      <rect x="10" y="295" width="780" height="36" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="400" y="309" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#92400e">⚠️ Population Rule:</text>
      <text x="400" y="323" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f">Populate all channels symmetrically for maximum bandwidth. Follow OEM platform manual — population rules are platform-specific.</text>
    </svg>
  );
}
