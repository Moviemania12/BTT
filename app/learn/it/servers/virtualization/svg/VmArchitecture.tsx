"use client";
export default function VmArchitecture() {
  const vms = [
    {name:"VM 1",os:"Linux",cpu:"4 vCPU",ram:"8GB vRAM",disk:"100GB vDisk",nic:"vNIC 1",ac:"#eff6ff",bc:"#2563eb",tc:"#1e40af"},
    {name:"VM 2",os:"Windows",cpu:"8 vCPU",ram:"32GB vRAM",disk:"500GB vDisk",nic:"vNIC 1+2",ac:"#f0fdf4",bc:"#16a34a",tc:"#166534"},
    {name:"VM 3",os:"Linux",cpu:"2 vCPU",ram:"4GB vRAM",disk:"50GB vDisk",nic:"vNIC 1",ac:"#faf5ff",bc:"#7c3aed",tc:"#6b21a8"},
  ];
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VM architecture showing physical host with hypervisor layer and three VMs each containing vCPU vRAM vDisk and vNIC">
      <rect width="820" height="360" fill="#fff"/>
      <text x="410" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">VM Architecture — Physical Host to Virtual Machines</text>
      {/* Physical hardware */}
      <rect x="10" y="290" width="800" height="56" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
      <text x="410" y="312" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#374151">Physical Hardware</text>
      {["Physical CPU(s)","Physical RAM","Physical Storage","Physical NICs","BMC"].map((c,i)=>(
        <g key={i}>
          <rect x={20+i*156} y="320" width="140" height="18" rx="3" fill="#e2e8f0"/>
          <text x={90+i*156} y="333" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{c}</text>
        </g>
      ))}
      {/* Hypervisor */}
      <rect x="10" y="258" width="800" height="24" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="410" y="274" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">Hypervisor (Type 1) — VMware ESXi / Hyper-V / KVM</text>
      {/* VMs */}
      {vms.map((vm,i)=>{
        const x=16+i*264;
        return(<g key={i}>
          <rect x={x} y="38" width="250" height="212" rx="8" fill={vm.ac} stroke={vm.bc} strokeWidth="2"/>
          <text x={x+125} y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill={vm.tc}>{vm.name}</text>
          <text x={x+125} y="78" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Guest OS: {vm.os}</text>
          {[
            {label:"vCPU",val:vm.cpu,c:"#dbeafe",bc:"#2563eb"},
            {label:"vRAM",val:vm.ram,c:"#d1fae5",bc:"#16a34a"},
            {label:"vDisk",val:vm.disk,c:"#fef3c7",bc:"#f59e0b"},
            {label:"vNIC",val:vm.nic,c:"#e9d5ff",bc:"#7c3aed"},
          ].map((r,j)=>(
            <g key={j}>
              <rect x={x+12} y={90+j*40} width="226" height="32" rx="4" fill={r.c} stroke={r.bc} strokeWidth="1"/>
              <text x={x+24} y={111+j*40} fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151">{r.label}:</text>
              <text x={x+70} y={111+j*40} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{r.val}</text>
            </g>
          ))}
          <text x={x+125} y="242" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">Virtual resources map to physical resources</text>
        </g>);
      })}
      <text x="410" y="352" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">vCPU/vRAM allocation and reservation behaviour depends on hypervisor and configuration. Numbers shown are illustrative examples.</text>
    </svg>
  );
}
