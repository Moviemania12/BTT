"use client";
export default function DualPsuPower() {
  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dual PSU server connected to redundant A and B rack PDUs showing independent power paths">
      <rect width="720" height="320" fill="#fff"/>
      <text x="360" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Redundant A/B Power Path — Dual-PSU Server</text>
      {/* A feed */}
      <rect x="20" y="50" width="140" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="90" y="76" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">Utility Feed A</text>
      <text x="90" y="92" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#3b82f6">(separate circuit)</text>
      {/* B feed */}
      <rect x="560" y="50" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="630" y="76" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534">Utility Feed B</text>
      <text x="630" y="92" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#16a34a">(separate circuit)</text>
      {/* PDU A */}
      <rect x="20" y="160" width="140" height="52" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="90" y="182" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">Rack PDU — A</text>
      <text x="90" y="200" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#3b82f6">Mounted rear-left</text>
      {/* PDU B */}
      <rect x="560" y="160" width="140" height="52" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="630" y="182" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534">Rack PDU — B</text>
      <text x="630" y="200" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#16a34a">Mounted rear-right</text>
      {/* Server */}
      <rect x="235" y="240" width="250" height="64" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="360" y="264" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#78350f">Server (2U)</text>
      <rect x="255" y="274" width="90" height="20" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="300" y="288" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#1e40af">PSU 1 (A-feed)</text>
      <rect x="375" y="274" width="90" height="20" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="420" y="288" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#166534">PSU 2 (B-feed)</text>
      {/* Lines */}
      <line x1="90" y1="110" x2="90" y2="160" stroke="#2563eb" strokeWidth="2"/>
      <line x1="630" y1="110" x2="630" y2="160" stroke="#16a34a" strokeWidth="2"/>
      <line x1="90" y1="212" x2="90" y2="240" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,3"/>
      <line x1="90" y1="240" x2="300" y2="274" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,3"/>
      <line x1="630" y1="212" x2="630" y2="240" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3"/>
      <line x1="630" y1="240" x2="420" y2="274" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3"/>
      {/* Callout */}
      <rect x="220" y="50" width="280" height="72" rx="6" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5"/>
      <text x="360" y="72" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e">⚠️ Redundancy Goal</text>
      <text x="360" y="88" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f">Feed A and Feed B must be on</text>
      <text x="360" y="102" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f">electrically separate circuits/paths.</text>
      <text x="360" y="114" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f">PSU config depends on server model.</text>
      <text x="360" y="312" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">PSU redundancy mode (active-active, active-standby, load-sharing) varies by server model and PSU configuration.</text>
    </svg>
  );
}
