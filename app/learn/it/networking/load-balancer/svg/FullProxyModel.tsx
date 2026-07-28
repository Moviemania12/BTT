"use client";
// D8 — Full Proxy Connection Model
export default function FullProxyModel() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 280`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Full proxy connection model showing independent client and server-side connections"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr8a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
        </marker>
        <marker id="arr8b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#16a34a"/>
        </marker>
      </defs>
      <rect width={W} height="280" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Full Proxy — Two Independent Connection Contexts</text>

      {/* Client */}
      <rect x="10" y="70" width="90" height="60" rx="7" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
      <text x="55" y="92" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1d4ed8">Client</text>
      <text x="55" y="106" textAnchor="middle" fontSize="8" fill="#374151">TCP/TLS</text>
      <text x="55" y="118" textAnchor="middle" fontSize="8" fill="#374151">connection</text>

      {/* Connection A */}
      <line x1="100" y1="100" x2="165" y2="100" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arr8a)"/>
      <line x1="165" y1="106" x2="100" y2="106" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr8a)"/>
      <text x="132" y="94" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1d4ed8">Connection A</text>
      <text x="132" y="118" textAnchor="middle" fontSize="7.5" fill="#1d4ed8">Client ↔ LB</text>

      {/* LB Box */}
      <rect x="165" y="56" width="150" height="100" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="240" y="76" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Load Balancer</text>
      <text x="240" y="92" textAnchor="middle" fontSize="8" fill="#374151">TLS terminate (if configured)</text>
      <text x="240" y="105" textAnchor="middle" fontSize="8" fill="#374151">HTTP inspect / modify</text>
      <text x="240" y="118" textAnchor="middle" fontSize="8" fill="#374151">Backend selection</text>
      <text x="240" y="131" textAnchor="middle" fontSize="8" fill="#374151">Connection reuse (if configured)</text>
      <text x="240" y="144" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">All capabilities: platform/config dependent</text>

      {/* Connection B */}
      <line x1="315" y1="100" x2="380" y2="100" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arr8b)"/>
      <line x1="380" y1="106" x2="315" y2="106" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr8b)"/>
      <text x="347" y="94" textAnchor="middle" fontSize="8" fontWeight="700" fill="#166534">Connection B</text>
      <text x="347" y="118" textAnchor="middle" fontSize="7.5" fill="#166534">LB ↔ Backend</text>

      {/* Backend */}
      <rect x="380" y="70" width="90" height="60" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="425" y="92" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#166534">Backend</text>
      <text x="425" y="106" textAnchor="middle" fontSize="8" fill="#374151">LB initiates</text>
      <text x="425" y="118" textAnchor="middle" fontSize="8" fill="#374151">connection</text>

      {/* Timing note */}
      <rect x="10" y="170" width="460" height="100" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="186" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Full Proxy — Key Points</text>
      <text x="18" y="202" fontSize="8" fill="#374151">• Two INDEPENDENT TCP connections — client does not connect directly to backend</text>
      <text x="18" y="215" fontSize="8" fill="#374151">• Connection timing: on-demand, preconnected, or pooled — platform dependent, NOT always serial</text>
      <text x="18" y="228" fontSize="8" fill="#374151">• TLS termination is a capability (requires cert/key) — not inherent to every full-proxy deployment</text>
      <text x="18" y="241" fontSize="8" fill="#374151">• Connection reuse (backend pool) possible — platform, protocol and config dependent</text>
      <text x="18" y="254" fontSize="8" fontStyle="italic" fill="#dc2626">• NOT all load balancers are full proxies — L4 forwarding architectures also exist</text>
    </svg>
  );
}
