"use client";
// D3 — Health Check Decision Flow
export default function HealthCheckFlow() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 370`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Health check decision flow showing three levels of health verification"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="370" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Health Check Decision Flow</text>
      <text x={W/2} y="34" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#6b7280">Probes run periodically — failure threshold required before member marked ineligible</text>

      {/* LB initiates */}
      <rect x="160" y="46" width="160" height="28" rx="6" fill="#d97706" />
      <text x={W/2} y="63" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">Load Balancer Probe</text>
      <line x1={W/2} y1="74" x2={W/2} y2="92" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)"/>

      {/* Level 1: TCP */}
      <rect x="30" y="92" width="420" height="52" rx="7" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="80" y="108" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">Level 1 — TCP</text>
      <text x="80" y="122" textAnchor="middle" fontSize="8" fill="#374151">TCP connect to port</text>
      <text x="80" y="133" textAnchor="middle" fontSize="7.5" fill="#6b7280">Proves: port listening</text>
      <line x1="160" y1="118" x2="200" y2="118" stroke="#d1d5db" strokeWidth="1"/>
      <text x="340" y="108" textAnchor="middle" fontSize="8" fill="#374151">FAIL → increment failure counter</text>
      <text x="340" y="122" textAnchor="middle" fontSize="8" fill="#374151">Fall threshold reached → INELIGIBLE</text>
      <text x="340" y="133" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">Does NOT prove application is healthy</text>

      <line x1={W/2} y1="144" x2={W/2} y2="162" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)"/>

      {/* Level 2: HTTP */}
      <rect x="30" y="162" width="420" height="56" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="80" y="178" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">Level 2 — HTTP/HTTPS</text>
      <text x="80" y="192" textAnchor="middle" fontSize="8" fill="#374151">GET /health → response check</text>
      <text x="80" y="203" textAnchor="middle" fontSize="8" fill="#374151">Status: configured code/range</text>
      <text x="80" y="213" textAnchor="middle" fontSize="7.5" fill="#6b7280">e.g. 200, 2xx — platform/config dependent</text>
      <line x1="160" y1="190" x2="200" y2="190" stroke="#d1d5db" strokeWidth="1"/>
      <text x="340" y="178" textAnchor="middle" fontSize="8" fill="#374151">FAIL → increment counter</text>
      <text x="340" y="192" textAnchor="middle" fontSize="8" fill="#374151">HTTPS: TLS cert validation behavior</text>
      <text x="340" y="206" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">platform/config dependent</text>
      <text x="340" y="213" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">HTTP 200 ≠ application healthy</text>

      <line x1={W/2} y1="218" x2={W/2} y2="236" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)"/>

      {/* Level 3: Application */}
      <rect x="30" y="236" width="420" height="56" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5"/>
      <text x="80" y="252" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Level 3 — Application-Aware</text>
      <text x="80" y="266" textAnchor="middle" fontSize="8" fill="#374151">Response body/content check</text>
      <text x="80" y="278" textAnchor="middle" fontSize="7.5" fill="#374151">e.g. {`{"status":"ok","db":"connected"}`}</text>
      <text x="80" y="287" textAnchor="middle" fontSize="7.5" fill="#6b7280">Platform support varies</text>
      <line x1="160" y1="265" x2="200" y2="265" stroke="#d1d5db" strokeWidth="1"/>
      <text x="340" y="252" textAnchor="middle" fontSize="8" fill="#374151">FAIL → increment counter</text>
      <text x="340" y="266" textAnchor="middle" fontSize="8" fill="#374151">Reliability depends on endpoint quality</text>
      <text x="340" y="278" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#dc2626">Endpoint is only as good as its implementation</text>

      {/* Outcomes */}
      <line x1={W/2} y1="292" x2={W/2} y2="310" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr3)"/>
      <rect x="80" y="310" width="140" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
      <text x="150" y="328" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534">✓ ELIGIBLE</text>

      <rect x="260" y="310" width="140" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="330" y="328" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">✗ INELIGIBLE</text>
      <text x="330" y="337" textAnchor="middle" fontSize="7.5" fill="#dc2626">After fall threshold met</text>

      <rect x="10" y="350" width="460" height="14" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1"/>
      <text x={W/2} y="361" textAnchor="middle" fontSize="7.5" fill="#0c4a6e" fontWeight="600">Rise threshold required to return to eligible — prevents premature re-admission of unstable backend</text>
    </svg>
  );
}
