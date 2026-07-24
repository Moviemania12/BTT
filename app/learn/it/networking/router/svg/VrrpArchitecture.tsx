"use client";
// D8 — VRRP Architecture: Master/Backup, virtual IP/MAC, failover, tracking
export default function VrrpArchitecture() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 420`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="VRRP Master Backup failover architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="420" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">VRRP Architecture — Master / Backup / Failover</text>
      {/* Normal operation */}
      <text x={W/2} y="40" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#16a34a">Normal Operation</text>
      <rect x="20" y="48" width="175" height="80" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="107" y="65" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#15803d">Router-A — MASTER</text>
      <text x="107" y="79" textAnchor="middle" fontSize="8" fill="#374151">Real IP: 10.0.1.2/24</text>
      <text x="107" y="92" textAnchor="middle" fontSize="8" fill="#374151">VRRP Priority: 150</text>
      <text x="107" y="105" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">Owns Virtual IP: 10.0.1.1</text>
      <text x="107" y="118" textAnchor="middle" fontSize="7.5" fill="#374151">vMAC IPv4: 00:00:5E:00:01:01</text>
      <rect x="285" y="48" width="175" height="80" rx="7" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="372" y="65" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#64748b">Router-B — BACKUP</text>
      <text x="372" y="79" textAnchor="middle" fontSize="8" fill="#374151">Real IP: 10.0.1.3/24</text>
      <text x="372" y="92" textAnchor="middle" fontSize="8" fill="#374151">VRRP Priority: 100</text>
      <text x="372" y="105" textAnchor="middle" fontSize="8" fill="#64748b">Monitoring Router-A</text>
      <text x="372" y="118" textAnchor="middle" fontSize="7.5" fill="#374151">vMAC IPv6: 00:00:5E:00:02:01</text>
      <line x1="195" y1="88" x2="285" y2="88" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x={W/2} y="86" textAnchor="middle" fontSize="8" fill="#6b7280">VRRP Advertisements</text>
      {/* Hosts */}
      <rect x="150" y="152" width="180" height="24" rx="5" fill="#1e40af"/>
      <text x={W/2} y="167" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Hosts → default gateway = 10.0.1.1 (Virtual IP)</text>
      <line x1={W/2} y1="128" x2={W/2} y2="152" stroke="#1e40af" strokeWidth="1.5"/>
      {/* Failover */}
      <text x={W/2} y="198" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#dc2626">Failover Sequence</text>
      {[
        "1. Router-A fails → Router-B stops receiving VRRP Advertisements",
        "2. Master Down Interval expires → Router-B transitions to MASTER",
        "3. Router-B now owns Virtual IP 10.0.1.1 + Virtual MAC",
        "4. Gratuitous ARP / unsolicited NA sent (implementation dependent)",
        "5. L2 switch FDB updated → traffic flows via Router-B",
        "6. Hosts continue using same Virtual IP — no config change needed",
      ].map((s, i) => (
        <text key={i} x="16" y={210+i*16} fontSize="8.5" fill={i<2?"#dc2626":i<4?"#f59e0b":"#16a34a"}>{s}</text>
      ))}
      {/* Tracking */}
      <rect x="10" y="312" width={W-20} height="60" rx="7" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x={W/2} y="328" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">VRRP Tracking (platform dependent)</text>
      <text x={W/2} y="342" textAnchor="middle" fontSize="8.5" fill="#92400e">Router-A uplink fails → priority decremented (e.g., 150 → 90)</text>
      <text x={W/2} y="356" textAnchor="middle" fontSize="8.5" fill="#92400e">Router-B (100) &gt; Router-A (90) → Router-B preempts → becomes MASTER</text>
      <text x={W/2} y="368" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#a16207">Tracking capability and granularity vary significantly by platform</text>
      {/* Standards note */}
      <rect x="10" y="382" width={W-20} height="28" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x={W/2} y="396" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">VRRP = IETF standard (RFC 3768 — VRRPv2 IPv4; RFC 5798 — VRRPv3 IPv4+IPv6)</text>
      <text x={W/2} y="408" textAnchor="middle" fontSize="8" fill="#15803d">HSRP = Cisco proprietary · GLBP = Cisco proprietary · Not all platforms support all FHRPs</text>
    </svg>
  );
}
