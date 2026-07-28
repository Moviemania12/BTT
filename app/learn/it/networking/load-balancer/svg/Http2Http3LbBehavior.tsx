"use client";
// D22 — HTTP/2 and HTTP/3 LB Behavior
export default function Http2Http3LbBehavior() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HTTP 2 and HTTP 3 load balancing behavior comparison"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a22" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">HTTP/2 and HTTP/3 — LB Behavior</text>

      {/* HTTP/2 per-connection */}
      <rect x="10" y="28" width="220" height="110" rx="7" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5"/>
      <text x="120" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="#c2410c">HTTP/2: Per-Connection LB</text>
      <text x="120" y="57" textAnchor="middle" fontSize="7.5" fill="#374151">(per-connection selection — common)</text>
      <text x="18" y="72" fontSize="8" fill="#374151">Client → 1 TCP conn → LB → Backend A</text>
      <text x="18" y="85" fontSize="7.5" fill="#374151">Stream 1 → Backend A</text>
      <text x="18" y="97" fontSize="7.5" fill="#374151">Stream 2 → Backend A</text>
      <text x="18" y="109" fontSize="7.5" fill="#374151">Stream 3 → Backend A</text>
      <text x="120" y="127" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">All streams → same backend!</text>
      <text x="120" y="136" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">Note: some LBs use connection pooling — platform specific</text>

      {/* HTTP/2 per-stream */}
      <rect x="252" y="28" width="220" height="110" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="362" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">HTTP/2: Per-Stream LB</text>
      <text x="362" y="57" textAnchor="middle" fontSize="7.5" fill="#374151">(full H2 proxy — platform support req.)</text>
      <text x="260" y="72" fontSize="8" fill="#374151">Client → 1 TCP conn → [LB H2 proxy]</text>
      <text x="260" y="85" fontSize="7.5" fill="#374151">Stream 1 → Backend A</text>
      <text x="260" y="97" fontSize="7.5" fill="#374151">Stream 2 → Backend B</text>
      <text x="260" y="109" fontSize="7.5" fill="#374151">Stream 3 → Backend A</text>
      <text x="362" y="127" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#166534">Per-request distribution possible</text>
      <text x="362" y="136" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">Requires H2 framing awareness + often H2→H1.1</text>

      {/* HTTP/3 */}
      <rect x="10" y="148" width="460" height="90" rx="7" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x={W/2} y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">HTTP/3 — QUIC over UDP</text>
      <text x={W/2} y="179" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">NOT TCP — TCP connection terminology does not apply</text>
      <text x="18" y="193" fontSize="8" fill="#374151">• QUIC provides stream multiplexing over UDP with integrated TLS 1.3</text>
      <text x="18" y="206" fontSize="8" fill="#374151">• Connection migration: client can change IP/port without losing QUIC connection (uses connection IDs)</text>
      <text x="18" y="219" fontSize="8" fill="#374151">• 0-RTT enables faster reconnection — but introduces replay attack risk (security design decision)</text>
      <text x="18" y="232" fontSize="8" fill="#374151">• LB support for QUIC/HTTP3 varies — many LBs block QUIC (forces HTTP/2 fallback) or handle via Alt-Svc</text>

      <rect x="10" y="246" width="460" height="46" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="262" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Key Engineering Points</text>
      <text x="18" y="276" fontSize="8" fill="#374151">• HTTP/2: round-robin at client-connection level ≠ round-robin at request level — architecture determines behavior</text>
      <text x="18" y="287" fontSize="8" fill="#374151">• HPACK header compression: L7 proxies processing H2 must understand HPACK — passthrough cannot inspect</text>
    </svg>
  );
}
