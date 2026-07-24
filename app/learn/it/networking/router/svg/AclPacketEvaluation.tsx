"use client";
// D13 — ACL Packet Evaluation Flow: first-match, implicit deny, inbound/outbound
export default function AclPacketEvaluation() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 390`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="ACL packet evaluation flow with first-match and implicit deny"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="390" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">ACL Packet Evaluation Flow</text>
      {/* Direction context */}
      <rect x="10" y="30" width={W-20} height="36" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1"/>
      <text x={W/2} y="44" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9">Inbound ACL: evaluated as packet arrives on interface (before routing on most platforms)</text>
      <text x={W/2} y="58" textAnchor="middle" fontSize="8.5" fill="#1e3a8a">Outbound ACL: evaluated as packet leaves on interface (after routing on most platforms) — pipeline order: platform dependent</text>
      {/* Flow */}
      <rect x="100" y="80" width="280" height="24" rx="5" fill="#374151"/>
      <text x={W/2} y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">Packet arrives at ACL evaluation point</text>
      {[
        { rule:"Rule 10: Match?", yes:"Action (Permit/Deny) → DONE", num:"10" },
        { rule:"Rule 20: Match?", yes:"Action (Permit/Deny) → DONE", num:"20" },
        { rule:"Rule 30: Match?", yes:"Action (Permit/Deny) → DONE", num:"30" },
      ].map((r, i) => (
        <g key={i}>
          <line x1={W/2} y1={104+i*56} x2={W/2} y2={112+i*56} stroke="#6b7280" strokeWidth="1.5"/>
          <rect x="150" y={112+i*56} width="180" height="22" rx="5" fill="#0ea5e9"/>
          <text x={W/2} y={112+i*56+14} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">{r.rule}</text>
          <line x1="330" y1={123+i*56} x2="380" y2={123+i*56} stroke="#16a34a" strokeWidth="1.5"/>
          <text x="386" y={123+i*56+4} fontSize="8" fill="#16a34a">YES → {r.yes}</text>
          <text x={W/2} y={134+i*56+3} textAnchor="middle" fontSize="8" fill="#6b7280">↓ NO</text>
        </g>
      ))}
      <line x1={W/2} y1="282" x2={W/2} y2="298" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="100" y="298" width="280" height="28" rx="5" fill="#dc2626"/>
      <text x={W/2} y="312" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">No rule matched → Implicit Default Action</text>
      <text x={W/2} y="323" textAnchor="middle" fontSize="8" fill="#fecaca">(commonly DENY ALL — platform dependent; some platforms: permit all)</text>
      {/* Notes */}
      <rect x="10" y="340" width={W-20} height="38" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="354" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Key Properties of Conventional Ordered ACL Processing</text>
      <text x={W/2} y="367" textAnchor="middle" fontSize="8" fill="#92400e">• First matching rule wins — subsequent rules not evaluated for that packet</text>
      <text x={W/2} y="377" textAnchor="middle" fontSize="8" fill="#92400e">• Stateless by default — each packet evaluated independently (no connection state awareness)</text>
    </svg>
  );
}
