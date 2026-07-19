"use client";
export default function HypervisorTypes() {
  const layers1 = [
    {l:"VM 1",s:"App + Guest OS",c:"#eff6ff",b:"#2563eb"},
    {l:"VM 2",s:"App + Guest OS",c:"#eff6ff",b:"#2563eb"},
    {l:"VM 3",s:"App + Guest OS",c:"#eff6ff",b:"#2563eb"},
  ];
  const layers2 = [
    {l:"VM 1",s:"App + Guest OS",c:"#faf5ff",b:"#7c3aed"},
    {l:"VM 2",s:"App + Guest OS",c:"#faf5ff",b:"#7c3aed"},
  ];
  return (
    <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Type 1 bare metal hypervisor stack versus Type 2 hosted hypervisor stack comparison">
      <rect width="800" height="380" fill="#fff"/>
      <text x="400" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Hypervisor Types — Type 1 (Bare Metal) vs Type 2 (Hosted)</text>

      {/* TYPE 1 */}
      <text x="195" y="52" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af">Type 1 — Bare Metal</text>
      {layers1.map((l,i)=>(
        <g key={i}>
          <rect x={20+i*120} y="62" width="110" height="50" rx="6" fill={l.c} stroke={l.b} strokeWidth="1.5"/>
          <text x={75+i*120} y="84" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af">{l.l}</text>
          <text x={75+i*120} y="100" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{l.s}</text>
        </g>
      ))}
      <rect x="20" y="122" width="370" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
      <text x="205" y="138" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">Type 1 Hypervisor</text>
      <text x="205" y="153" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">VMware ESXi · Hyper-V · KVM · Xen</text>
      <rect x="20" y="172" width="370" height="36" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
      <text x="205" y="190" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#374151">Physical Hardware</text>
      <text x="205" y="204" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#6b7280">CPU · RAM · Storage · NIC</text>

      {/* TYPE 2 */}
      <text x="605" y="52" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#6b21a8">Type 2 — Hosted</text>
      {layers2.map((l,i)=>(
        <g key={i}>
          <rect x={430+i*150} y="62" width="140" height="50" rx="6" fill={l.c} stroke={l.b} strokeWidth="1.5"/>
          <text x={500+i*150} y="84" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b21a8">{l.l}</text>
          <text x={500+i*150} y="100" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">{l.s}</text>
        </g>
      ))}
      <rect x="430" y="122" width="350" height="36" rx="6" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="2"/>
      <text x="605" y="138" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#6b21a8">Type 2 Hypervisor (process)</text>
      <text x="605" y="153" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">VirtualBox · VMware Workstation</text>
      <rect x="430" y="168" width="350" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="605" y="184" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">Host Operating System</text>
      <text x="605" y="199" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#92400e">Windows / Linux / macOS</text>
      <rect x="430" y="214" width="350" height="36" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
      <text x="605" y="230" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#374151">Physical Hardware</text>
      <text x="605" y="244" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#6b7280">CPU · RAM · Storage · NIC</text>

      {/* KVM note */}
      <rect x="20" y="230" width="370" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="205" y="250" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#166534">📌 KVM Note</text>
      <text x="205" y="266" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">KVM (Kernel-based Virtual Machine) is a Linux kernel module.</text>
      <text x="205" y="280" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Linux becomes the hypervisor — Type 1 semantics. Not Type 2.</text>

      {/* Comparison */}
      <rect x="20" y="306" width="760" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      <text x="400" y="324" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#374151">Key Difference</text>
      <text x="205" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">Type 1: Hypervisor runs directly on hardware.</text>
      <text x="205" y="356" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">Lower overhead. Data center standard.</text>
      <text x="605" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6b21a8">Type 2: Hypervisor runs as app on host OS.</text>
      <text x="605" y="356" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#6b21a8">Host OS crash = all VMs down. Dev/test only.</text>
    </svg>
  );
}
