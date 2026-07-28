"use client";
// D28 — Complete Data Center Load Balancer Integration
export default function DcIntegrationFull() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 380`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Complete data center load balancer integration showing full traffic path"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a28g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
        <marker id="a28b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
        </marker>
        <marker id="a28d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6"/>
        </marker>
      </defs>
      <rect width={W} height="380" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Complete Data Center LB Integration</text>
      <text x={W/2} y="30" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">One common pattern — not a universal mandatory design. Return path must be explicitly designed and validated.</text>

      {/* Internet */}
      <rect x="150" y="38" width="180" height="20" rx="4" fill="#374151"/>
      <text x={W/2} y="51" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Internet</text>
      <line x1={W/2} y1="58" x2={W/2} y2="72" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a28g)"/>
      <text x={W/2+4} y="68" fontSize="7" fill="#6b7280">① HTTPS:443 → VIP</text>

      {/* Perimeter FW */}
      <rect x="100" y="72" width="280" height="26" rx="6" fill="#dc2626"/>
      <text x={W/2} y="85" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Perimeter Firewall (HA pair)</text>
      <text x={W/2} y="93" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">Security enforcement — permits VIP traffic, probe traffic</text>
      <line x1={W/2} y1="98" x2={W/2} y2="112" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a28g)"/>
      <text x={W/2+4} y="108" fontSize="7" fill="#6b7280">② VLAN 100</text>

      {/* Load Balancer */}
      <rect x="80" y="112" width="320" height="38" rx="7" fill="#d97706"/>
      <text x={W/2} y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Load Balancer (HA pair)</text>
      <text x={W/2} y="141" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)">TLS handling per mode | L7 policy | Pool selection | Health monitoring</text>
      <line x1={W/2} y1="150" x2={W/2} y2="168" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a28g)"/>
      <text x={W/2+4} y="162" fontSize="7" fill="#6b7280">③ VLAN 200 (SNAT or routing — design dependent; return path: validate with capture)</text>

      {/* App Servers */}
      <rect x="80" y="168" width="320" height="40" rx="7" fill="#16a34a"/>
      <text x={W/2} y="183" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Application Servers</text>
      <text x="118" y="198" textAnchor="middle" fontSize="8.5" fill="#fff">APP01</text>
      <text x={W/2} y="198" textAnchor="middle" fontSize="8.5" fill="#fff">APP02</text>
      <text x="362" y="198" textAnchor="middle" fontSize="8.5" fill="#fff">APP03</text>

      {/* Health probes */}
      <rect x="370" y="142" width="100" height="30" rx="4" fill="#8b5cf6"/>
      <text x="420" y="155" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">Health Probes</text>
      <text x="420" y="166" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)">LB→APP01/02/03</text>
      <line x1="370" y1="157" x2="350" y2="185" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#a28d)"/>
      <text x="378" y="130" fontSize="7" fill="#8b5cf6">FW must permit</text>
      <text x="378" y="140" fontSize="7" fill="#8b5cf6">probe traffic</text>

      {/* Optional Internal FW */}
      <line x1={W/2} y1="208" x2={W/2} y2="222" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a28g)"/>
      <rect x="100" y="222" width="280" height="20" rx="5" fill="#4b5563" stroke="#374151" strokeWidth="1" strokeDasharray="4,2"/>
      <text x={W/2} y="234" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Internal Firewall (where used)</text>
      <line x1={W/2} y1="242" x2={W/2} y2="256" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a28g)"/>

      {/* Database */}
      <rect x="120" y="256" width="240" height="22" rx="5" fill="#1d4ed8"/>
      <text x={W/2} y="270" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Database / Storage Tier</text>

      {/* Return path */}
      <line x1="82" y1="185" x2="50" y2="145" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#a28b)"/>
      <line x1="50" y1="145" x2="50" y2="87" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#a28b)"/>
      <line x1="50" y1="87" x2="50" y2="51" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#a28b)"/>
      <text x="30" y="130" fontSize="7.5" fill="#3b82f6" fontWeight="700">Return</text>
      <text x="30" y="140" fontSize="7.5" fill="#3b82f6">path</text>
      <text x="30" y="150" fontSize="7.5" fill="#3b82f6">(via LB)</text>

      <rect x="10" y="288" width="460" height="82" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="304" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Traffic Flow Summary</text>
      <text x="18" y="318" fontSize="8" fill="#374151">① Client → DNS → VIP (203.0.113.50:443)</text>
      <text x="18" y="330" fontSize="8" fill="#374151">② TLS handling per configured mode (terminate/re-encrypt/passthrough) | L7 policy → pool | Algorithm → APP02</text>
      <text x="18" y="342" fontSize="8" fill="#374151">③ LB → APP02:8443 | Return path (SNAT or routing) must be designed and validated</text>
      <text x="18" y="354" fontSize="8" fill="#374151">④ Health probes: LB → APP01/02/03 via VLAN 200 | Firewall must permit probe traffic from LB probe source address</text>
      <text x="18" y="366" fontSize="8" fontStyle="italic" fill="#dc2626">⑤ Return path traversal must be explicitly validated via packet capture — not assumed from placement</text>
    </svg>
  );
}
