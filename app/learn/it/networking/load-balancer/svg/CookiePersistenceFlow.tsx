"use client";
// D17 — Cookie Persistence Flow (LB-generated cookie model)
export default function CookiePersistenceFlow() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 290`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cookie persistence flow showing first request and subsequent request with affinity"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="a17" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="290" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">Cookie Persistence Flow</text>
      <text x={W/2} y="30" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#6b7280">LB-generated cookie model — application-based persistence differs. Cookie timing/mechanism varies by platform.</text>

      {/* Request 1 */}
      <rect x="10" y="38" width="460" height="100" rx="7" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="20" y="53" fontSize="9" fontWeight="700" fill="#1d4ed8">Request 1 — No persistence cookie</text>

      <rect x="20" y="60" width="60" height="22" rx="4" fill="#374151"/>
      <text x="50" y="74" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="80" y1="71" x2="120" y2="71" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a17)"/>
      <text x="100" y="65" textAnchor="middle" fontSize="7.5" fill="#374151">no cookie</text>

      <rect x="120" y="60" width="80" height="22" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="160" y="74" textAnchor="middle" fontSize="8.5" fill="#92400e">LB</text>
      <text x="160" y="85" textAnchor="middle" fontSize="7.5" fill="#374151">no match → algorithm</text>
      <line x1="200" y1="71" x2="260" y2="71" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a17)"/>
      <text x="230" y="65" textAnchor="middle" fontSize="7.5" fill="#16a34a">selects APP02</text>

      <rect x="260" y="60" width="80" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="300" y="74" textAnchor="middle" fontSize="8.5" fill="#166534">APP02</text>

      {/* Response with cookie */}
      <line x1="260" y1="82" x2="200" y2="108" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#a17)"/>
      <line x1="120" y1="108" x2="80" y2="108" stroke="#374151" strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#a17)"/>
      <text x="200" y="100" textAnchor="middle" fontSize="7.5" fill="#374151">Response + </text>
      <text x="200" y="112" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#8b5cf6">Set-Cookie: [lb-affinity]=⟨APP02-mapping⟩</text>
      <text x="200" y="124" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">Cookie value: opaque/non-enumerable form</text>
      <text x="200" y="134" textAnchor="middle" fontSize="7" fontStyle="italic" fill="#6b7280">Configure: Secure, HttpOnly, SameSite as appropriate</text>

      {/* Request 2 */}
      <rect x="10" y="144" width="460" height="96" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="20" y="159" fontSize="9" fontWeight="700" fill="#166534">Request 2 — Cookie present (affinity established)</text>

      <rect x="20" y="166" width="60" height="22" rx="4" fill="#374151"/>
      <text x="50" y="180" textAnchor="middle" fontSize="8.5" fill="#fff">Client</text>
      <line x1="80" y1="177" x2="120" y2="177" stroke="#374151" strokeWidth="1.5" markerEnd="url(#a17)"/>
      <text x="100" y="171" textAnchor="middle" fontSize="7.5" fill="#8b5cf6">with cookie</text>

      <rect x="120" y="166" width="80" height="22" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="160" y="180" textAnchor="middle" fontSize="8.5" fill="#92400e">LB</text>
      <text x="160" y="191" textAnchor="middle" fontSize="7.5" fill="#374151">cookie match → APP02</text>
      <text x="160" y="201" textAnchor="middle" fontSize="7.5" fill="#374151">eligibility check ✓</text>

      <line x1="200" y1="177" x2="260" y2="177" stroke="#16a34a" strokeWidth="2" markerEnd="url(#a17)"/>
      <text x="230" y="171" textAnchor="middle" fontSize="7.5" fill="#166534" fontWeight="700">→ APP02</text>

      <rect x="260" y="166" width="80" height="22" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="300" y="180" textAnchor="middle" fontSize="8.5" fill="#166534">APP02 ✓</text>

      <text x={W/2} y="220" textAnchor="middle" fontSize="8" fill="#374151">Session continuity maintained — same backend serves subsequent requests</text>
      <text x={W/2} y="232" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">If APP02 fails: eligibility check fails → fallback behavior (platform/config dependent)</text>

      <rect x="10" y="246" width="460" height="34" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="262" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#374151">Persistence timeout: entry expires if no activity within configured window</text>
      <text x={W/2} y="275" textAnchor="middle" fontSize="8" fill="#374151">Too short: affinity lost mid-session. Too long: distribution imbalance / stale mappings accumulate (server-side table implementations)</text>
    </svg>
  );
}
