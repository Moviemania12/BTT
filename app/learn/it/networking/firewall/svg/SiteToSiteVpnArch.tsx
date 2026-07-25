"use client";
export default function SiteToSiteVpnArch() {
  return (
    <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Site-to-site VPN architecture"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="280" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Site-to-Site VPN Architecture</text>
      <rect x="10" y="36" width="110" height="44" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="65" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0c4a6e">Branch LAN</text>
      <text x="65" y="68" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="monospace">10.10.10.0/24</text>
      <rect x="130" y="36" width="100" height="44" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="180" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">Branch FW</text>
      <text x="180" y="68" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="monospace">198.51.100.10</text>
      <rect x="175" y="96" width="130" height="26" rx="5" fill="#374151"/>
      <text x="240" y="112" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Internet — Untrusted</text>
      <text x="240" y="140" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#8b5cf6">Outer: 198.51.100.10 → 203.0.113.20</text>
      <text x="240" y="152" textAnchor="middle" fontSize="8" fill="#6b7280">Inner packet: encrypted/protected</text>
      <rect x="250" y="36" width="100" height="44" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="300" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">DC FW</text>
      <text x="300" y="68" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="monospace">203.0.113.20</text>
      <rect x="360" y="36" width="110" height="44" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="415" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0c4a6e">DC LAN</text>
      <text x="415" y="68" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="monospace">10.20.20.0/24</text>
      <line x1="120" y1="58" x2="130" y2="58" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="230" y1="58" x2="250" y2="58" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="350" y1="58" x2="360" y2="58" stroke="#9ca3af" strokeWidth="1.5"/>
      <line x1="180" y1="80" x2="180" y2="96" stroke="#9ca3af" strokeWidth="1"/>
      <line x1="300" y1="80" x2="300" y2="96" stroke="#9ca3af" strokeWidth="1"/>
      <rect x="10" y="170" width="460" height="60" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x="240" y="186" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Packet Transformation (Tunnel Mode — Conceptual)</text>
      <text x="18" y="202" fontSize="8" fill="#374151">Original: [IP: 10.10.10.25→10.20.20.50][TCP][Data] — visible to endpoints only</text>
      <text x="18" y="216" fontSize="8" fill="#8b5cf6">{"Protected: [IP: 198.51.100.10→203.0.113.20][ESP][{original packet protected}]"}</text>
      <text x="18" y="228" fontSize="8" fontStyle="italic" fill="#6b7280">Gateways handle encryption/decryption. Endpoints use internal addresses and are not VPN-aware.</text>
      <rect x="10" y="240" width="460" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="252" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">Conceptual site-to-site VPN flow — exact firewall processing order is platform-dependent.</text>
      <text x="240" y="263" textAnchor="middle" fontSize="8" fill="#92400e">Return path also requires routing and reverse VPN SA/state at both ends.</text>
    </svg>
  );
}
