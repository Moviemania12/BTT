"use client";
export default function SplitBrainCondition() {
  return (
    <svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Split-brain dual-active firewall condition"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif", display:"block" }}>
      <rect width="480" height="310" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#111827">Split-Brain / Dual-Active Condition</text>
      <rect x="10" y="34" width="210" height="66" rx="7" fill="#fff" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="115" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">NORMAL</text>
      <text x="115" y="68" textAnchor="middle" fontSize="8" fill="#374151">FW-A: ACTIVE ←─HA─→ FW-B: STANDBY</text>
      <text x="115" y="82" textAnchor="middle" fontSize="8" fill="#374151">Clear role coordination</text>
      <text x="115" y="94" textAnchor="middle" fontSize="7.5" fontStyle="italic" fill="#16a34a">Single forwarding authority</text>
      <rect x="260" y="34" width="210" height="66" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="365" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">SPLIT-BRAIN</text>
      <text x="365" y="68" textAnchor="middle" fontSize="8" fill="#374151">FW-A: ACTIVE? ✗ ─ ─ ─ ✗ FW-B: ACTIVE?</text>
      <text x="365" y="82" textAnchor="middle" fontSize="7.5" fill="#dc2626">HA coordination lost — platform arbitration</text>
      <text x="365" y="94" textAnchor="middle" fontSize="7.5" fill="#dc2626">could not determine authoritative ownership</text>
      <rect x="10" y="114" width="460" height="72" rx="7" fill="#fff5f5" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="240" y="130" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">Possible Consequences</text>
      {["Both peers may simultaneously assert virtual IP / route ownership",
        "Duplicate MAC/IP presence → switches see conflicting sources → traffic oscillates",
        "Session state diverges independently on each peer → inconsistent forwarding",
        "Routing instability — both may advertise same routes"].map((c,i) => (
        <text key={i} x="18" y={142+i*13} fontSize="8" fill="#374151">• {c}</text>
      ))}
      <rect x="10" y="196" width="460" height="52" rx="7" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x="240" y="212" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b5cf6">Prevention Mechanisms (Conceptual)</text>
      {["Redundant HA control links — peer not declared failed if any alternate path confirms it alive",
        "Multiple independent health signals — loss of one link ≠ automatic failure declaration",
        "Priority/election logic — well-defined rules for who should win; quorum/witness where platform supports",
        "HA control link loss alone ≠ automatic dual-active on all platforms — platform arbitration mechanisms vary"].map((p,i) => (
        <text key={i} x="18" y={224+i*12} fontSize="8" fill="#374151">• {p}</text>
      ))}
      <rect x="10" y="256" width="460" height="44" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
      <text x="240" y="270" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400e">Split-brain is often worse than a clean single-node failure — duplicate presence, inconsistent state, routing instability.</text>
      <text x="240" y="284" textAnchor="middle" fontSize="8" fill="#92400e">Not all platforms use quorum, witness, or fencing. Understand your platform's split-brain prevention design before relying on it.</text>
    </svg>
  );
}
