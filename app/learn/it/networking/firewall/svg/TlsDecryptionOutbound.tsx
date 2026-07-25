"use client";
// D23 — Outbound TLS Decryption (Forward Proxy)
export default function TlsDecryptionOutbound() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outbound TLS decryption forward proxy architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Outbound TLS Decryption — Forward Proxy</text>
      {/* Client */}
      <rect x="10" y="36" width="100" height="60" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="60" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0c4a6e">Client</text>
      <text x="60" y="68" textAnchor="middle" fontSize="7.5" fill="#374151">Must trust</text>
      <text x="60" y="80" textAnchor="middle" fontSize="7.5" fill="#374151">Firewall CA</text>
      <text x="60" y="92" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">(via GPO/MDM)</text>
      {/* FW */}
      <rect x="160" y="36" width="160" height="60" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="240" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">Firewall</text>
      <text x="240" y="67" textAnchor="middle" fontSize="7.5" fill="#374151">INSPECTION ZONE</text>
      <text x="240" y="79" textAnchor="middle" fontSize="7.5" fill="#374151">App-ID, IPS, URL, File</text>
      <text x="240" y="89" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">(features enabled by policy)</text>
      {/* Server */}
      <rect x="370" y="36" width="100" height="60" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5"/>
      <text x="420" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Server</text>
      <text x="420" y="68" textAnchor="middle" fontSize="7.5" fill="#374151">Real certificate</text>
      <text x="420" y="80" textAnchor="middle" fontSize="7.5" fill="#374151">validated by FW</text>
      {/* TLS connection A */}
      <line x1="110" y1="66" x2="160" y2="66" stroke="#0ea5e9" strokeWidth="2"/>
      <text x="135" y="60" textAnchor="middle" fontSize="7.5" fill="#0ea5e9" fontWeight="700">TLS conn A</text>
      <text x="135" y="72" textAnchor="middle" fontSize="7" fill="#0ea5e9">FW cert for dst</text>
      {/* TLS connection B */}
      <line x1="320" y1="66" x2="370" y2="66" stroke="#ca8a04" strokeWidth="2"/>
      <text x="345" y="60" textAnchor="middle" fontSize="7.5" fill="#ca8a04" fontWeight="700">TLS conn B</text>
      <text x="345" y="72" textAnchor="middle" fontSize="7" fill="#ca8a04">FW validates real cert</text>
      {/* Steps */}
      <rect x="10" y="108" width={W-20} height="108" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">How It Works (Conceptual)</text>
      {["1. Client initiates TLS to destination server",
        "2. Firewall intercepts — presents its own certificate to client for that destination",
        "3. Client must trust the firewall's CA (enterprise cert management required)",
        "4. Firewall establishes separate TLS connection to actual server, validates server cert",
        "5. Traffic between client and FW: decrypted → inspected → re-encrypted toward server"].map((s,i) => (
        <text key={i} x="18" y={138+i*16} fontSize="8.5" fill="#374151">{s}</text>
      ))}
      {/* Limits */}
      <rect x="10" y="224" width={W-20} height="62" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="238" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Key Limitations</text>
      {["Certificate pinning: apps embedding specific cert will reject FW substitute → must be exempted",
        "Privacy/compliance: personal banking, healthcare — require selective decryption policy",
        "Performance: TLS decryption is computationally expensive — size for decryption overhead",
        "QUIC/HTTP3: UDP-based, different TLS integration — most FWs block QUIC and allow HTTP/2 fallback"].map((l,i) => (
        <text key={i} x="18" y={252+i*12} fontSize="7.5" fill="#92400e">• {l}</text>
      ))}
    </svg>
  );
}
