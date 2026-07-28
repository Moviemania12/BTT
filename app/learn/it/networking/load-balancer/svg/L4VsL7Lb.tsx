"use client";
// D4 — L4 vs L7 Load Balancing
export default function L4VsL7Lb() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 320`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L4 vs L7 load balancing comparison"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="320" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">L4 vs L7 Load Balancing</text>

      {/* L4 column */}
      <rect x="10" y="30" width="222" height="220" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
      <text x="121" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Layer 4 (Transport)</text>

      <text x="18" y="68" fontSize="9" fontWeight="700" fill="#374151">Decision basis:</text>
      {["Source / Destination IP", "Source / Destination Port", "Protocol (TCP, UDP)"].map((t,i) => (
        <text key={i} x="24" y={82+i*14} fontSize="8.5" fill="#374151">• {t}</text>
      ))}

      <text x="18" y="138" fontSize="9" fontWeight="700" fill="#374151">Does NOT see:</text>
      {["HTTP headers or URL", "Host header / path / cookies", "Application content"].map((t,i) => (
        <text key={i} x="24" y={152+i*14} fontSize="8.5" fill="#dc2626">✗ {t}</text>
      ))}

      <text x="18" y="206" fontSize="9" fontWeight="700" fill="#374151">Characteristics:</text>
      <text x="24" y="220" fontSize="8" fill="#374151">• Lower overhead</text>
      <text x="24" y="232" fontSize="8" fill="#374151">• No TLS termination required</text>
      <text x="24" y="244" fontSize="8" fontStyle="italic" fill="#6b7280">Note: L4 ≠ packet-forwarding</text>

      {/* L7 column */}
      <rect x="248" y="30" width="222" height="220" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="359" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Layer 7 (Application)</text>

      <text x="256" y="68" fontSize="9" fontWeight="700" fill="#374151">Decision basis:</text>
      {["HTTP Host header / :authority", "URI / URL path", "HTTP headers", "Cookies, query strings"].map((t,i) => (
        <text key={i} x="262" y={82+i*14} fontSize="8.5" fill="#374151">• {t}</text>
      ))}

      <text x="256" y="148" fontSize="9" fontWeight="700" fill="#374151">Routing examples:</text>
      <text x="262" y="162" fontSize="8" fontFamily="monospace" fill="#374151">/api/* → API pool</text>
      <text x="262" y="175" fontSize="8" fontFamily="monospace" fill="#374151">/static/* → CDN pool</text>
      <text x="262" y="188" fontSize="8" fontFamily="monospace" fill="#374151">Host: api.* → API pool</text>

      <text x="256" y="206" fontSize="9" fontWeight="700" fill="#374151">Requirement:</text>
      <text x="262" y="220" fontSize="8" fill="#374151">For HTTPS: must decrypt TLS</text>
      <text x="262" y="232" fontSize="8" fill="#374151">to see HTTP content</text>
      <text x="262" y="244" fontSize="8" fontStyle="italic" fill="#6b7280">TLS SNI ≠ HTTP Host</text>

      {/* SNI note */}
      <rect x="10" y="260" width="460" height="50" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="276" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">TLS SNI (Server Name Indication)</text>
      <text x={W/2} y="290" textAnchor="middle" fontSize="8" fill="#374151">SNI is TLS-layer metadata — visible without HTTP decryption. It is NOT HTTP application content.</text>
      <text x={W/2} y="303" textAnchor="middle" fontSize="8" fill="#374151">SNI-based routing and HTTP Host-based routing are distinct capabilities at different layers.</text>
    </svg>
  );
}
