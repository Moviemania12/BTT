"use client";
// D13 — NAT + Security Policy Interaction (platform-dependent)
export default function NatPolicyInteraction() {
  const W = 480;
  return (
    <svg viewBox={`0 0 ${W} 340`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NAT and security policy interaction"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width={W} height="340" fill="#f8fafc" rx="10"/>
      <text x={W/2} y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">NAT + Security Policy Interaction</text>
      {/* Three must succeed */}
      <rect x="10" y="32" width={W-20} height="56" rx="7" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x={W/2} y="48" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0ea5e9">Three Things Must ALL Be True for a Flow to Succeed</text>
      {["1. Matching NAT rule exists (if translation required)","2. Security policy rule PERMITS the flow","3. Valid route exists for translated/forwarded packet"].map((s,i) => (
        <text key={i} x="20" y={60+i*16} fontSize="8.5" fill="#374151">• {s}</text>
      ))}
      {/* Processing order */}
      <rect x="10" y="98" width={W-20} height="130" rx="7" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
      <text x={W/2} y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">Processing Order Is Platform-Specific</text>
      <rect x="18" y="120" width={W-36} height="18" rx="3" fill="#374151"/>
      {["Scenario","Platform behavior (varies)"].map((h,i) => (
        <text key={i} x={[26,210][i]} y="132" fontSize="8" fontWeight="700" fill="#fff">{h}</text>
      ))}
      {[
        ["Policy sees pre-NAT src, pre-NAT dst","Write policy against original addresses"],
        ["Policy sees pre-NAT src, post-NAT dst","Typical for DNAT on some platforms"],
        ["NAT applied first, then policy","Write policy against translated addresses"],
        ["Zone via post-NAT route, addr pre-NAT","Zone determination may differ from address match"],
      ].map((r,i) => (
        <g key={i}>
          <rect x="18" y={138+i*22} width={W-36} height="20" rx="2" fill={i%2===0?"#f9fafb":"#fff"}/>
          <text x="26" y={138+i*22+13} fontSize="7.5" fill="#374151">{r[0]}</text>
          <text x="210" y={138+i*22+13} fontSize="7.5" fill="#374151">{r[1]}</text>
        </g>
      ))}
      {/* Warning */}
      <rect x="10" y="238" width={W-20} height="48" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x={W/2} y="254" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">⚠ Most Common Misconfiguration Source</text>
      <text x="18" y="270" fontSize="8.5" fill="#374151">DNAT rule configured → engineer writes policy for private IP → platform evaluates on public IP → policy never matches → traffic dropped.</text>
      <text x="18" y="284" fontSize="8.5" fill="#374151">Symptom: NAT counter increments, policy log shows no hit. Fix: verify which address representation your platform uses — then write policy accordingly.</text>
      <rect x="10" y="294" width={W-20} height="22" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x={W/2} y="308" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">There is no universal NAT-before-policy or policy-before-NAT rule. Verify per platform documentation. Test explicitly after NAT changes.</text>
    </svg>
  );
}
