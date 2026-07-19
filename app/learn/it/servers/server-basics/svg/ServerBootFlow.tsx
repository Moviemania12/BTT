"use client";
export default function ServerBootFlow() {
  const steps = [
    {icon:"⚡",t:"Power Applied",s:"Standby power\nto BMC first",c:"#f0fdf4",bc:"#16a34a"},
    {icon:"🔧",t:"BMC Initialises",s:"Hardware health\ncheck begins",c:"#eff6ff",bc:"#2563eb"},
    {icon:"🖥️",t:"UEFI/BIOS",s:"POST — CPU, RAM,\ndevices checked",c:"#fef3c7",bc:"#f59e0b"},
    {icon:"💾",t:"Boot Device",s:"PXE, local disk,\nor SAN boot",c:"#f5f3ff",bc:"#7c3aed"},
    {icon:"📦",t:"Bootloader",s:"Loads OS kernel\nor hypervisor",c:"#fff7ed",bc:"#f97316"},
    {icon:"🚀",t:"OS / Hypervisor",s:"Services start,\nVMs come up",c:"#f0fdf4",bc:"#16a34a"},
  ];
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Server boot sequence from power applied through BMC UEFI POST bootloader to OS or hypervisor">
      <rect width="820" height="280" fill="#fff"/>
      <text x="410" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Server Boot Flow — Power to Operating System</text>
      {steps.map((s,i)=>{
        const x=30+i*130;
        return (<g key={i}>
          <rect x={x} y="44" width="110" height="110" rx="10" fill={s.c} stroke={s.bc} strokeWidth="2"/>
          <text x={x+55} y="72" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="22">{s.icon}</text>
          <text x={x+55} y="92" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10.5" fontWeight="700" fill="#111827">{s.t}</text>
          {s.s.split("\n").map((l,j)=><text key={j} x={x+55} y={108+j*14} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{l}</text>)}
          {i<steps.length-1&&<line x1={x+110} y1="99" x2={x+128} y2="99" stroke="#64748b" strokeWidth="2" markerEnd="url(#bArr)"/>}
          <text x={x+55} y="172" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill={s.bc}>Step {i+1}</text>
        </g>);
      })}
      {/* BMC side note */}
      <rect x="10" y="190" width="800" height="72" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="410" y="210" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">🔧 BMC — Out-of-Band Management (Runs independently of main system)</text>
      <text x="410" y="228" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">BMC requires standby power from the PSU to operate while server is off. With power connected and server powered down,</text>
      <text x="410" y="244" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">BMC stays accessible via its dedicated network port — remote power on/off, virtual console, hardware health monitoring.</text>
      <text x="410" y="258" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6b7280">Vendor names: Dell iDRAC · HPE iLO · Lenovo XCC · Supermicro IPMI · Standard: IPMI v2.0 / Redfish API</text>
      <defs><marker id="bArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0,7 3.5,0 7" fill="#64748b"/></marker></defs>
    </svg>
  );
}
