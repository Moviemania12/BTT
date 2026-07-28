"use client";
// D25 — Load Balancer Troubleshooting Framework
export default function TsFramework() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 300`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Load balancer troubleshooting framework three zone diagnostic approach"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="300" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">LB Troubleshooting Framework</text>
      <text x={W/2} y="30" textAnchor="middle" fontSize="8" fontStyle="italic" fill="#dc2626">DIAGNOSTIC FRAMEWORK — not internal processing order</text>

      {/* Zone 1 */}
      <rect x="10" y="38" width="460" height="70" rx="7" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="10" y="38" width="90" height="70" rx="7" fill="#3b82f6"/>
      <text x="55" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ZONE 1</text>
      <text x="55" y="84" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">Scope Problem</text>
      <text x="108" y="55" fontSize="8" fontWeight="700" fill="#1d4ed8">What kind of problem?</text>
      <text x="108" y="68" fontSize="8" fill="#374151">All traffic to VIP? → VIP-level issue</text>
      <text x="108" y="80" fontSize="8" fill="#374151">Specific backend? → Member-level issue</text>
      <text x="108" y="92" fontSize="8" fill="#374151">Specific clients? → Client/network-side</text>
      <text x="310" y="68" fontSize="8" fill="#374151">Specific request type? → L7/application</text>
      <text x="310" y="80" fontSize="8" fill="#374151">Intermittent under load? → Capacity/timing</text>

      {/* Zone 2 */}
      <rect x="10" y="116" width="460" height="62" rx="7" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <rect x="10" y="116" width="90" height="62" rx="7" fill="#16a34a"/>
      <text x="55" y="148" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ZONE 2</text>
      <text x="55" y="160" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">Confirm LB View</text>
      <text x="108" y="133" fontSize="8" fill="#374151">• Access logs: traffic arriving at VIP?</text>
      <text x="108" y="146" fontSize="8" fill="#374151">• Virtual service: active and listening?</text>
      <text x="108" y="159" fontSize="8" fill="#374151">• Pool members eligible? How many?</text>
      <text x="310" y="146" fontSize="8" fill="#374151">• Connection table: session created?</text>
      <text x="310" y="159" fontSize="8" fill="#374151">• Health state of selected backend?</text>

      {/* Zone 3 */}
      <rect x="10" y="186" width="460" height="68" rx="7" fill="#fff7ed" stroke="#f97316" strokeWidth="2"/>
      <rect x="10" y="186" width="90" height="68" rx="7" fill="#f97316"/>
      <text x="55" y="218" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">ZONE 3</text>
      <text x="55" y="230" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)">Locate Failure Layer</text>
      <text x="108" y="203" fontSize="8" fontWeight="700" fill="#374151">LB issue:</text>
      <text x="158" y="203" fontSize="8" fill="#374151">VIP not responding, no connection table entry, member not selected</text>
      <text x="108" y="218" fontSize="8" fontWeight="700" fill="#374151">App issue:</text>
      <text x="158" y="218" fontSize="8" fill="#374151">LB shows forward, backend returns error</text>
      <text x="108" y="233" fontSize="8" fontWeight="700" fill="#374151">Network:</text>
      <text x="158" y="233" fontSize="8" fill="#374151">Traffic leaves LB, never arrives / return path broken</text>
      <text x="108" y="246" fontSize="8" fontWeight="700" fill="#dc2626">Return bypass:</text>
      <text x="158" y="246" fontSize="8" fill="#dc2626">Backend responds to wrong destination — LB never sees return</text>

      <rect x="10" y="262" width="460" height="30" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="275" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="600">Reference: D13 (traffic verification) and D20 (selection diagnostic) for detailed segment-level tracing</text>
      <text x={W/2} y="286" textAnchor="middle" fontSize="7.5" fill="#92400e">Locate the break — do not randomly test components</text>
    </svg>
  );
}
