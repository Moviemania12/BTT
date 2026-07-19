"use client";
export default function VmClusterHa() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VM cluster HA showing three hosts sharing storage with HA restarting VMs on surviving hosts when one host fails">
      <rect width="820" height="360" fill="#fff"/>
      <text x="410" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">VM Cluster — High Availability (HA) Failover</text>
      {/* Host 1 - failed */}
      <rect x="10" y="44" width="230" height="160" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5"/>
      <text x="125" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#dc2626">Host 1 ❌ FAILED</text>
      {["VM-A (was here)","VM-B (was here)","VM-C (was here)"].map((v,i)=>(
        <g key={i}>
          <rect x="22" y={80+i*40} width="206" height="32" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="1" strokeDasharray="4,2"/>
          <text x="125" y={100+i*40} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#991b1b">{v}</text>
        </g>
      ))}
      <text x="125" y="220" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#dc2626">Host unreachable — HA triggered</text>
      {/* HA arrow */}
      <text x="260" y="124" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#f97316">HA</text>
      <text x="260" y="138" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#f97316">restarts</text>
      <text x="260" y="152" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#f97316">VMs →</text>
      <line x1="240" y1="124" x2="300" y2="124" stroke="#f97316" strokeWidth="2" markerEnd="url(#haArr)"/>
      {/* Host 2 - running + received VMs */}
      <rect x="300" y="44" width="230" height="160" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="415" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534">Host 2 ✓ Running</text>
      {["VM-D (original)","VM-A (restarted ✓)","VM-B (restarted ✓)"].map((v,i)=>(
        <g key={i}>
          <rect x="312" y={80+i*40} width="206" height="32" rx="4" fill={i===0?"#bbf7d0":"#a7f3d0"} stroke="#16a34a" strokeWidth={i===0?1:1.5}/>
          <text x="415" y={100+i*40} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#166534">{v}</text>
        </g>
      ))}
      <text x="415" y="220" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#166534">Received failed host VMs</text>
      {/* Host 3 */}
      <rect x="580" y="44" width="230" height="160" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="695" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">Host 3 ✓ Running</text>
      {["VM-E (original)","VM-F (original)","VM-C (restarted ✓)"].map((v,i)=>(
        <g key={i}>
          <rect x="592" y={80+i*40} width="206" height="32" rx="4" fill={i<2?"#bfdbfe":"#93c5fd"} stroke="#2563eb" strokeWidth={i<2?1:1.5}/>
          <text x="695" y={100+i*40} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">{v}</text>
        </g>
      ))}
      <text x="695" y="220" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af">Received failed host VMs</text>
      {/* Shared storage */}
      <rect x="260" y="248" width="300" height="48" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="410" y="268" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">Shared Storage</text>
      <text x="410" y="286" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">SAN / NFS — VM vDisks accessible by all hosts</text>
      {/* Storage lines */}
      <line x1="125" y1="204" x2="310" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
      <line x1="415" y1="204" x2="410" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
      <line x1="695" y1="204" x2="510" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* HA requirements note */}
      <rect x="10" y="310" width="800" height="40" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="410" y="327" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#92400e">HA Requirements:</text>
      <text x="410" y="342" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Shared storage accessible to all hosts · Sufficient spare capacity on remaining hosts · HA enabled in cluster · Heartbeat network working · Recovery time = VM restart time (OS boot)</text>
      <defs><marker id="haArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="#f97316"/></marker></defs>
    </svg>
  );
}
