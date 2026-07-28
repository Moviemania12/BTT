"use client";
// D21 — TLS Handling Modes at Load Balancer
export default function TlsHandlingModes() {
  const W = 480;
  const modes = [
    { label: "TLS Offload", sub: "Plaintext to backend", client: "TLS", lb: "Terminates TLS", backend: "HTTP (plaintext)", lbFill: "#d97706", note: "L7 visibility: ✓  Cert: LB holds  Trust: LB→backend path" },
    { label: "TLS Re-encrypt", sub: "New TLS to backend", client: "TLS-A", lb: "Terminate+Re-encrypt", backend: "TLS-B (new)", lbFill: "#2563eb", note: "L7 visibility: ✓  Cert: LB+backend  Compliance: E2E encryption" },
    { label: "TLS Passthrough", sub: "Backend handles TLS", client: "TLS", lb: "Forwards (no decrypt)", backend: "TLS (backend owns)", lbFill: "#6b7280", note: "L7 HTTP visibility: ✗  SNI routing possible  Cert: Backend holds" },
  ];
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TLS handling modes at load balancer showing offload re-encrypt and passthrough"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a21" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">TLS Handling Modes</text>

      {modes.map((m, i) => {
        const y = 30 + i * 82;
        return (
          <g key={i}>
            <rect x="10" y={y} width="460" height="74" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>
            <rect x="10" y={y} width="110" height="74" rx="7" fill={m.lbFill}/>
            <text x="65" y={y+24} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">{m.label}</text>
            <text x="65" y={y+38} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">{m.sub}</text>

            {/* Flow */}
            <rect x="125" y={y+14} width="50" height="18" rx="4" fill="#374151"/>
            <text x="150" y={y+26} textAnchor="middle" fontSize="7.5" fill="#fff">Client</text>
            <line x1="175" y1={y+23} x2="218" y2={y+23} stroke="#374151" strokeWidth="1.5" markerEnd="url(#a21)"/>
            <text x="196" y={y+18} textAnchor="middle" fontSize="7" fill="#374151">{m.client}</text>

            <rect x="218" y={y+14} width="74" height="18" rx="4" fill={m.lbFill}/>
            <text x="255" y={y+26} textAnchor="middle" fontSize="7.5" fill="#fff">{m.lb}</text>

            <line x1="292" y1={y+23} x2="336" y2={y+23} stroke="#374151" strokeWidth="1.5" markerEnd="url(#a21)"/>
            <rect x="336" y={y+14} width="80" height="18" rx="4" fill="#374151"/>
            <text x="376" y={y+26} textAnchor="middle" fontSize="7.5" fill="#fff">{m.backend}</text>

            <text x="125" y={y+52} fontSize="7.5" fill={i===2?"#dc2626":"#374151"}>{m.note}</text>
            {i < modes.length-1 && <text x="125" y={y+64} fontSize="7.5" fontStyle="italic" fill="#6b7280">{i===0?"TLS offload ≠ plaintext backend always — re-encryption is also common":""}</text>}
          </g>
        );
      })}

      <rect x="10" y="278" width="460" height="16" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="289" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="600">Certificate management at LB: expiry tracking, chain, key security — all LB operations responsibility when TLS terminates there</text>
    </svg>
  );
}
