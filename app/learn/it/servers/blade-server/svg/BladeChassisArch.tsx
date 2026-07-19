"use client";
export default function BladeChassisArch() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blade server chassis architecture showing compute blades, shared power supplies, fans, IO modules and management module">
      <rect width="820" height="420" fill="#fff"/>
      <text x="410" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Blade Chassis Architecture — Shared Infrastructure Model</text>
      {/* Chassis outline */}
      <rect x="10" y="34" width="800" height="370" rx="10" fill="#f8fafc" stroke="#374151" strokeWidth="2.5"/>
      <text x="410" y="56" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill="#6b7280">BLADE CHASSIS (Enclosure)</text>
      {/* Compute blades */}
      <text x="24" y="80" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#374151">COMPUTE BLADES</text>
      {Array.from({length:8},(_,i)=>{
        const x=22+i*92; const filled=i<6;
        return(<g key={i}>
          <rect x={x} y={88} width="84" height="150" rx="5" fill={filled?"#eff6ff":"#f1f5f9"} stroke={filled?"#2563eb":"#cbd5e1"} strokeWidth={filled?1.5:1} strokeDasharray={filled?"none":"4,3"}/>
          {filled?(<>
            <text x={x+42} y={108} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#1e40af">Blade {i+1}</text>
            <rect x={x+8} y={116} width="68" height="18" rx="3" fill="#dbeafe"/>
            <text x={x+42} y={129} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af">CPU + RAM</text>
            <rect x={x+8} y={140} width="68" height="16" rx="3" fill="#dbeafe"/>
            <text x={x+42} y={152} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af">Local Storage</text>
            <text x={x+42} y={170} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">No PSU</text>
            <text x={x+42} y={183} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">No network card</text>
            <text x={x+42} y={196} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#374151">backplane →</text>
          </>):(<>
            <text x={x+42} y={170} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Empty</text>
            <text x={x+42} y={184} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Slot</text>
          </>)}
        </g>);
      })}
      {/* Backplane */}
      <rect x="22" y="248" width="776" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="410" y="261" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#78350f">CHASSIS BACKPLANE — Power, Data, Management signals</text>
      {/* Shared components */}
      <text x="24" y="286" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#374151">SHARED CHASSIS RESOURCES</text>
      {/* PSUs */}
      <rect x="22" y="294" width="160" height="52" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="102" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534">PSU 1 + PSU 2</text>
      <text x="102" y="330" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Shared by ALL blades</text>
      <text x="102" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Hot-swap · Redundant</text>
      {/* Fans */}
      <rect x="200" y="294" width="140" height="52" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="270" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">Fan Modules</text>
      <text x="270" y="330" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Shared cooling</text>
      <text x="270" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">N+1 redundant</text>
      {/* IO modules */}
      <rect x="358" y="294" width="240" height="52" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="478" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8">I/O Modules (Rear)</text>
      <text x="478" y="330" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Ethernet switch / Pass-through / FC</text>
      <text x="478" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Uplinks to ToR switch</text>
      {/* Mgmt module */}
      <rect x="616" y="294" width="182" height="52" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
      <text x="707" y="314" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#c2410c">Management Module</text>
      <text x="707" y="330" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Centralised OOB mgmt</text>
      <text x="707" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">All blades from 1 interface</text>
      {/* Shared failure domain note */}
      <rect x="22" y="358" width="776" height="36" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="410" y="374" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#991b1b">⚠️ Shared Failure Domain:</text>
      <text x="410" y="388" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Chassis-level power, cooling, or management failure can affect all blades. Cross-chassis workload distribution required for mission-critical deployments.</text>
    </svg>
  );
}
