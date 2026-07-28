"use client";
// D18 — L7 Content Routing Decision
export default function L7ContentRouting() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 310`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L7 content routing decision showing host and path based routing to different pools"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a18" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="310" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">L7 Content Routing</text>
      <rect x="10" y="24" width="460" height="14" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">CONCEPTUAL — actual policy evaluation order is platform-specific. TLS must be terminated for HTTP content visibility.</text>

      {/* VIP */}
      <rect x="185" y="46" width="110" height="28" rx="6" fill="#374151"/>
      <text x={W/2} y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">VIP: 203.0.113.50:443</text>
      <text x={W/2} y="71" textAnchor="middle" fontSize="7.5" fill="#9ca3af">TLS terminated → HTTP visible</text>

      <line x1={W/2} y1="74" x2={W/2} y2="92" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a18)"/>

      {/* Policy box */}
      <rect x="110" y="92" width="260" height="52" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x={W/2} y="108" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1d4ed8">L7 Policy Evaluation</text>
      <text x="120" y="122" fontSize="8" fill="#374151">Host: api.example.com</text>
      <text x="120" y="134" fontSize="8" fill="#374151">Host: portal.example.com + Path: /static/*</text>
      <text x="120" y="141" fontSize="7.5" fontStyle="italic" fill="#6b7280">Host: portal.example.com (catch-all)</text>
      <text x="330" y="122" fontSize="8" fill="#374151">→ API pool</text>
      <text x="330" y="134" fontSize="8" fill="#374151">→ Static pool</text>
      <text x="330" y="141" fontSize="7.5" fontStyle="italic" fill="#6b7280">→ Portal pool</text>

      {/* Three arrows to pools */}
      <line x1="160" y1="144" x2="80" y2="184" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a18)"/>
      <line x1={W/2} y1="144" x2={W/2} y2="184" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a18)"/>
      <line x1="320" y1="144" x2="400" y2="184" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a18)"/>

      {/* Pool boxes */}
      {[
        { x: 20, w: 120, label: "API Pool", color: "#1d4ed8", fill: "#eff6ff", stroke: "#3b82f6" },
        { x: 185, w: 110, label: "Portal Pool", color: "#166534", fill: "#dcfce7", stroke: "#16a34a" },
        { x: 340, w: 130, label: "Static Pool", color: "#92400e", fill: "#fef3c7", stroke: "#d97706" },
      ].map((p) => (
        <g key={p.label}>
          <rect x={p.x} y="184" width={p.w} height="32" rx="6" fill={p.fill} stroke={p.stroke} strokeWidth="1.5"/>
          <text x={p.x+p.w/2} y="196" textAnchor="middle" fontSize="9" fontWeight="700" fill={p.color}>{p.label}</text>
          <text x={p.x+p.w/2} y="208" textAnchor="middle" fontSize="7.5" fill="#374151">Persistence/algo within pool</text>
        </g>
      ))}

      <rect x="10" y="226" width="460" height="74" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="242" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">L7 Routing Engineering Notes</text>
      <text x="18" y="256" fontSize="8" fill="#374151">• HTTP Host header and HTTP/2 :authority pseudo-header — related but distinct (H2 uses :authority primarily)</text>
      <text x="18" y="268" fontSize="8" fill="#374151">• Path matching order matters: broad rules before specific rules can shadow specific ones — verify per platform</text>
      <text x="18" y="280" fontSize="8" fill="#dc2626">• TLS SNI ≠ HTTP Host — SNI is TLS-layer, visible without decryption; Host is HTTP-layer, requires decryption</text>
      <text x="18" y="292" fontSize="8" fill="#374151">• Header-based routing: only use trusted/validated headers — arbitrary client headers are a security risk</text>
    </svg>
  );
}
