"use client";
// D22 — TLS Visibility Without Decryption
export default function TlsVisibility() {
  const W = 480;
  const visible = [
    "Source IP address",
    "Destination IP address",
    "Source port, Destination port",
    "TLS handshake presence (identifies as TLS)",
    "Traffic volume and timing characteristics",
  ];
  const conditional = [
    { t:"SNI (Server Name Indication)", n:"Plaintext in ordinary TLS 1.3 ClientHello. ECH (RFC 9849): encrypts SNI when negotiated." },
    { t:"Certificate handshake contents", n:"TLS 1.3: server Certificate msg encrypted after handshake keys established — not generally visible to passive observer." },
  ];
  const invisible = [
    "Application payload content",
    "HTTP headers, URL path",
    "Transferred files / request body",
    "Request/response content",
  ];
  return (
    <svg viewBox={`0 0 ${W} 420`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TLS visibility without decryption"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="420" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">TLS Visibility — Without Decryption</text>
      {/* Visible */}
      <rect x="10" y="32" width="140" height={36+visible.length*16} rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="80" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">Always Visible</text>
      {visible.map((v,i) => <text key={i} x="16" y={60+i*16} fontSize="8" fill="#374151">✓ {v}</text>)}
      {/* Conditional */}
      <rect x="158" y="32" width="162" height={36+conditional.length*42} rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="239" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Conditionally Visible</text>
      {conditional.map((c,i) => (
        <g key={i}>
          <text x="164" y={60+i*42} fontSize="8" fontWeight="600" fill="#92400e">{c.t}</text>
          <text x="164" y={73+i*42} fontSize="7.5" fill="#374151" style={{whiteSpace:"pre-wrap"}}>{c.n.split(" ECH").join("\n ECH").split(" TLS 1.3").join("\nTLS 1.3")}</text>
        </g>
      ))}
      {/* Invisible */}
      <rect x="328" y="32" width="142" height={36+invisible.length*16} rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="399" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#991b1b">NOT Visible</text>
      {invisible.map((v,i) => <text key={i} x="334" y={60+i*16} fontSize="8" fill="#374151">✗ {v}</text>)}
      {/* ECH Note */}
      <rect x="10" y="190" width={W-20} height="52" rx="7" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x={W/2} y="206" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b5cf6">TLS 1.3 vs ECH — Critical Distinction</text>
      <text x="18" y="222" fontSize="8.5" fill="#374151">TLS 1.3: encrypts much of handshake after ServerHello. But ordinary TLS 1.3 ClientHello SNI field historically transmitted in plaintext.</text>
      <text x="18" y="236" fontSize="8.5" fill="#374151">ECH (RFC 9849): separate mechanism — encrypts real server name (SNI) and other ClientHello info when ECH successfully negotiated.</text>
      <text x={W/2} y="234" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#7c3aed"></text>
      {/* TLS decryption */}
      <rect x="10" y="252" width={W-20} height="58" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x={W/2} y="268" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">With Successful TLS Decryption</text>
      {["Successfully decrypted traffic can be made available to applicable inspection engines",
        "supported and enabled by the platform/policy (IPS, URL controls, file inspection, app-ID)",
        "Performance impact: significant. Requires: forward-proxy architecture + client CA trust.",
        "Privacy/compliance considerations apply. Deploy selective decryption policy."].map((l,i) => (
        <text key={i} x="18" y={282+i*14} fontSize="8" fill="#374151">• {l}</text>
      ))}
      <rect x="10" y="318" width={W-20} height="22" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x={W/2} y="332" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#991b1b">Do NOT design inspection policy on the assumption that SNI or certificate info is always available.</text>
    </svg>
  );
}
