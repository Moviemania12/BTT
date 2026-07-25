"use client";
// D2 — Stateful Firewall Packet Journey (new flow vs existing session)
export default function StatefulPacketJourney() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 420`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stateful firewall packet processing journey"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="420" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Stateful Firewall Packet Processing</text>
      <text x={W/2} y="35" textAnchor="middle" fontSize="9" fill="#6b7280">New flow vs existing session — platform/config determines exact processing</text>
      <rect x="150" y="44" width="180" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="59" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Packet arrives on ingress interface</text>
      <line x1={W/2} y1="68" x2={W/2} y2="84" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="110" y="84" width="260" height="28" rx="6" fill="#0ea5e9"/>
      <text x={W/2} y="101" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Flow/Session State Lookup (5-tuple)</text>
      {/* Match path */}
      <line x1="110" y1="98" x2="50" y2="130" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="30" y="118" fontSize="8" fill="#16a34a" fontWeight="700">MATCH</text>
      <rect x="4" y="134" width="148" height="60" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="78" y="149" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803d">Existing Session Found</text>
      <text x="78" y="163" textAnchor="middle" fontSize="8" fill="#374151">Validate packet against state</text>
      <text x="78" y="176" textAnchor="middle" fontSize="8" fill="#374151">Process per platform logic</text>
      <text x="78" y="188" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">May include inspection if configured</text>
      {/* No match path */}
      <line x1="370" y1="98" x2="430" y2="130" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="395" y="118" fontSize="8" fill="#dc2626" fontWeight="700">NO MATCH</text>
      <rect x="330" y="134" width="146" height="30" rx="5" fill="#fff" stroke="#6b7280" strokeWidth="1"/>
      <text x="403" y="153" textAnchor="middle" fontSize="8.5" fill="#374151">New flow — full evaluation</text>
      <line x1="403" y1="164" x2="403" y2="180" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="330" y="180" width="146" height="28" rx="5" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1"/>
      <text x="403" y="197" textAnchor="middle" fontSize="8.5" fill="#0c4a6e">NAT evaluation (order: platform)</text>
      <line x1="403" y1="208" x2="403" y2="224" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="330" y="224" width="146" height="28" rx="5" fill="#8b5cf6" opacity="0.9"/>
      <text x="403" y="236" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">Security Policy Evaluation</text>
      <text x="403" y="248" textAnchor="middle" fontSize="8" fill="#e9d5ff">(zone-pair + rule matching)</text>
      <line x1="350" y1="238" x2="200" y2="270" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="255" y="262" fontSize="8" fill="#dc2626" fontWeight="700">DENY</text>
      <rect x="155" y="274" width="90" height="22" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="200" y="288" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#991b1b">Drop / Reject</text>
      <line x1="403" y1="252" x2="403" y2="270" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="415" y="265" fontSize="8" fill="#16a34a" fontWeight="700">PERMIT</text>
      <rect x="330" y="270" width="146" height="28" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x="403" y="282" textAnchor="middle" fontSize="8.5" fill="#15803d">New session state created</text>
      <text x="403" y="293" textAnchor="middle" fontSize="7.5" fill="#374151">(NAT translation state where applicable)</text>
      {/* converge */}
      <line x1="403" y1="298" x2="403" y2="320" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1="78" y1="194" x2="78" y2="320" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1="78" y1="320" x2="403" y2="320" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1={W/2} y1="320" x2={W/2} y2="338" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="110" y="338" width="260" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="353" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Forward on egress interface</text>
      <rect x="4" y="374" width={W-8} height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="388" textAnchor="middle" fontSize="8" fontWeight="700" fill="#92400e">NAT ordering and exact pipeline: platform-dependent. State match = associated with known flow.</text>
      <text x={W/2} y="402" textAnchor="middle" fontSize="8" fill="#92400e">Subsequent handling — what validation occurs, what inspection applies — is platform and configuration dependent.</text>
    </svg>
  );
}
