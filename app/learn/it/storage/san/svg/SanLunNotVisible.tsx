"use client";
// Diagram 8 — LUN Not Visible: Systematic Troubleshooting Flowchart
// Future image: /public/images/articles/san/san-lun-not-visible-flowchart.png
export default function SanLunNotVisible() {
  return (
    <svg viewBox="0 0 860 490" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="LUN not visible — systematic troubleshooting flowchart"
      style={{ width:"100%", height:"auto", fontFamily:"Arial, sans-serif" }}>
      <rect width="860" height="490" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">LUN Not Visible — Systematic Troubleshooting Flow</text>
      <rect x="140" y="30" width="580" height="14" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
      <text x="430" y="41" textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="700">NEVER format a SAN LUN until correct LUN identity is verified with storage team</text>

      {/* Start */}
      <rect x="280" y="52" width="300" height="24" rx="12" fill="#1e293b"/>
      <text x="430" y="68" textAnchor="middle" fontSize="9.5" fill="#f8fafc" fontWeight="600">New LUN not visible on host (post-provisioning)</text>

      {[
        { y:90,  q:"1. HBA port online? (Device Manager / /sys/class/fc_host)", fix:"Check HBA driver, cable seating, power, link LEDs" },
        { y:128, q:"2. HBA WWPN logged into fabric? (nsshow / show flogi database)", fix:"Check cable, SFP, switch port state, FLOGI failure" },
        { y:166, q:"3. Zone correct? Initiator+Target WWPNs? BOTH fabrics?", fix:"Create/fix zone on Fabric A AND Fabric B; activate configuration" },
        { y:204, q:"4. Storage target front-end ports online on both fabrics?", fix:"Array port offline — check cable, SFP, controller state" },
        { y:242, q:"5. Host object correct? WWPN registered? Correct host type?", fix:"Register correct WWPN; set Windows/Linux/VMware host type" },
        { y:280, q:"6. LUN mapped to this host? LUN online in array?", fix:"Create/correct LUN mapping; bring LUN online" },
        { y:318, q:"7. Rescan host (Disk Mgmt / multipath -r / VMware rescan)", fix:"If still not visible — check logs, escalate" },
        { y:356, q:"8. Multipath shows expected paths? All paths Active?", fix:"Investigate missing paths per layer model" },
        { y:394, q:"9. OS shows correct device? Size matches expected LUN?", fix:"Wrong device/size — recheck mapping and WWPN" },
      ].map((s,i) => (
        <g key={i}>
          <line x1="430" y1={s.y-14} x2="430" y2={s.y} stroke="#6b7280" strokeWidth="1.2"/>
          <rect x="200" y={s.y} width="460" height="24" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1"/>
          <text x="430" y={s.y+15} textAnchor="middle" fontSize="8.5" fill="#1e40af" fontWeight="500">{s.q}</text>
          {/* No arrow */}
          <line x1="660" y1={s.y+12} x2="690" y2={s.y+12} stroke="#dc2626" strokeWidth="1"/>
          <text x="693" y={s.y+8} fontSize="7.5" fill="#dc2626">No →</text>
          <rect x="700" y={s.y+2} width="140" height="18" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
          <text x="770" y={s.y+14} textAnchor="middle" fontSize="7" fill="#991b1b">{s.fix}</text>
          {/* Yes indicator */}
          <text x="190" y={s.y+15} textAnchor="end" fontSize="7.5" fill="#16a34a">↓ Yes</text>
        </g>
      ))}

      <line x1="430" y1="418" x2="430" y2="432" stroke="#6b7280" strokeWidth="1.2"/>
      <rect x="300" y="432" width="260" height="24" rx="12" fill="#16a34a"/>
      <text x="430" y="448" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="600">LUN visible — verify size, apply filesystem</text>

      <text x="430" y="474" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: san-lun-not-visible-flowchart.png</text>
    </svg>
  );
}
