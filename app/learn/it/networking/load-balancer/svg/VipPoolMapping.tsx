"use client";
// D2 — VIP to Backend Pool Mapping
export default function VipPoolMapping() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 310`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VIP to backend pool mapping showing DNS, virtual service and pool members"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#374151"/>
        </marker>
      </defs>
      <rect width={W} height="310" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">VIP → Virtual Service → Backend Pool</text>

      {/* DNS */}
      <rect x="30" y="34" width="180" height="36" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="120" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">DNS Record</text>
      <text x="120" y="63" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">portal.example.com → 203.0.113.50</text>

      <text x="120" y="83" textAnchor="middle" fontSize="8" fill="#6b7280">Client resolves to VIP</text>
      <line x1="120" y1="86" x2="120" y2="106" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)"/>

      {/* VIP / Virtual Service */}
      <rect x="30" y="106" width="180" height="52" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
      <text x="120" y="122" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Virtual Service (VIP)</text>
      <text x="120" y="136" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">203.0.113.50 : 443</text>
      <text x="120" y="149" textAnchor="middle" fontSize="8" fill="#374151">Protocol: HTTPS</text>

      <line x1="210" y1="132" x2="250" y2="132" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arr2)"/>
      <text x="230" y="126" textAnchor="middle" fontSize="7.5" fill="#6b7280">maps to</text>

      {/* Pool */}
      <rect x="250" y="90" width="215" height="120" rx="8" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>
      <text x="357" y="108" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">portal-app-pool</text>

      {/* Member 1 */}
      <rect x="262" y="114" width="190" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="322" y="125" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">10.10.1.21:8443</text>
      <text x="420" y="125" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="700">Eligible</text>

      {/* Member 2 */}
      <rect x="262" y="141" width="190" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="322" y="152" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">10.10.1.22:8443</text>
      <text x="420" y="152" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="700">Eligible</text>

      {/* Member 3 - ineligible */}
      <rect x="262" y="168" width="190" height="24" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="322" y="179" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#374151">10.10.1.23:8443</text>
      <text x="420" y="179" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="700">Ineligible</text>

      {/* "Client never sees backend IPs" note */}
      <rect x="250" y="215" width="215" height="22" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="357" y="225" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="700">Backend IPs not exposed to clients</text>
      <text x="357" y="234" textAnchor="middle" fontSize="7.5" fill="#92400e">Client only knows the VIP</text>

      {/* Port note */}
      <rect x="30" y="172" width="180" height="40" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1"/>
      <text x="120" y="186" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#166534">Port mapping</text>
      <text x="120" y="199" textAnchor="middle" fontSize="8" fill="#374151">Client: VIP:443 → Backend:8443</text>
      <text x="120" y="208" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#6b7280">VIP port ≠ backend port</text>

      {/* Footer */}
      <rect x="10" y="244" width="460" height="54" rx="6" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="260" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Key Points</text>
      <text x="18" y="275" fontSize="8" fill="#374151">• Terminology varies by platform: virtual server, listener, virtual service, virtual host</text>
      <text x="18" y="288" fontSize="8" fill="#374151">• VIP implementation is platform/deployment dependent — interface, cloud frontend, anycast, or other</text>
      <text x="18" y="291" fontSize="7.5" fill="#374151"/>
    </svg>
  );
}
