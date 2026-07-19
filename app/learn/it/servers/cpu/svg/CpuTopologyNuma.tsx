"use client";
export default function CpuTopologyNuma() {
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPU topology from socket to core to thread plus NUMA showing local and remote memory access">
      <rect width="860" height="420" fill="#fff"/>
      <text x="430" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">CPU Topology: Socket → Core → Thread + NUMA</text>
      {/* Socket 0 */}
      <rect x="10" y="38" width="400" height="240" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="210" y="60" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">CPU Socket 0 (Physical CPU)</text>
      {[0,1,2,3].map(i=>{
        const x=30+i*95; const y=74;
        return (<g key={i}>
          <rect x={x} y={y} width="84" height="92" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5"/>
          <text x={x+42} y={y+16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af">Core {i}</text>
          <rect x={x+6} y={y+22} width="33" height="22" rx="3" fill="#93c5fd" stroke="#2563eb"/>
          <text x={x+22} y={y+37} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af">Thread 0</text>
          <rect x={x+45} y={y+22} width="33" height="22" rx="3" fill="#bfdbfe" stroke="#2563eb"/>
          <text x={x+61} y={y+37} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af">Thread 1</text>
          <text x={x+42} y={y+56} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">L1 + L2 Cache</text>
          <text x={x+42} y={y+68} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#6b7280">(per core)</text>
          <rect x={x+6} y={y+74} width="72" height="12" rx="2" fill="#eff6ff" stroke="#3b82f6"/>
          <text x={x+42} y={y+84} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#374151">L1/L2 shown simplified</text>
        </g>);
      })}
      {/* L3 shared */}
      <rect x="22" y="178" width="376" height="28" rx="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="210" y="197" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e40af">L3 Cache (Shared across all cores in socket)</text>
      {/* Memory controller */}
      <rect x="22" y="215" width="376" height="22" rx="5" fill="#eff6ff" stroke="#2563eb"/>
      <text x="210" y="230" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">Memory Controller → NUMA Node 0 RAM</text>
      {/* Socket 1 */}
      <rect x="450" y="38" width="400" height="240" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="650" y="60" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534">CPU Socket 1 (Physical CPU)</text>
      {[0,1,2,3].map(i=>{
        const x=470+i*95; const y=74;
        return (<g key={i}>
          <rect x={x} y={y} width="84" height="92" rx="6" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5"/>
          <text x={x+42} y={y+16} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534">Core {i}</text>
          <rect x={x+6} y={y+22} width="33" height="22" rx="3" fill="#6ee7b7" stroke="#16a34a"/>
          <text x={x+22} y={y+37} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534">Thread 0</text>
          <rect x={x+45} y={y+22} width="33" height="22" rx="3" fill="#a7f3d0" stroke="#16a34a"/>
          <text x={x+61} y={y+37} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534">Thread 1</text>
          <text x={x+42} y={y+56} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">L1 + L2 Cache</text>
          <text x={x+42} y={y+68} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#6b7280">(per core)</text>
          <rect x={x+6} y={y+74} width="72" height="12" rx="2" fill="#f0fdf4" stroke="#16a34a"/>
          <text x={x+42} y={y+84} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fill="#374151">L1/L2 shown simplified</text>
        </g>);
      })}
      <rect x="462" y="178" width="376" height="28" rx="5" fill="#a7f3d0" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="650" y="197" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#166534">L3 Cache (Shared across all cores in socket)</text>
      <rect x="462" y="215" width="376" height="22" rx="5" fill="#f0fdf4" stroke="#16a34a"/>
      <text x="650" y="230" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#166534">Memory Controller → NUMA Node 1 RAM</text>
      {/* Interconnect */}
      <rect x="340" y="140" width="180" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="430" y="160" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#78350f">CPU-to-CPU Interconnect</text>
      <line x1="410" y1="190" x2="340" y2="155" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
      <line x1="450" y1="190" x2="520" y2="155" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* NUMA labels */}
      <rect x="10" y="290" width="400" height="64" rx="8" fill="#eff6ff" stroke="#2563eb"/>
      <text x="210" y="310" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">NUMA Node 0 RAM — Local to Socket 0</text>
      <text x="210" y="326" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">CPU 0 access = fast (local) ✓</text>
      <text x="210" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626">CPU 1 access = slower (remote — via interconnect) !</text>
      <rect x="450" y="290" width="400" height="64" rx="8" fill="#f0fdf4" stroke="#16a34a"/>
      <text x="650" y="310" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534">NUMA Node 1 RAM — Local to Socket 1</text>
      <text x="650" y="326" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">CPU 1 access = fast (local) ✓</text>
      <text x="650" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626">CPU 0 access = slower (remote — via interconnect) !</text>
      <text x="430" y="412" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Core/thread counts shown for illustration only. Actual counts depend on CPU model and generation.</text>
    </svg>
  );
}
