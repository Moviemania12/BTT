"use client";
// Diagram 4 — 3-2-1 and 3-2-1-1-0 Backup Strategy
export default function Backup321Strategy() {
  return (
    <svg viewBox="0 0 860 310" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="3-2-1 and 3-2-1-1-0 backup strategy diagram"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="310" fill="#f8fafc" rx="12"/>
      <text x="430" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">3-2-1 aur 3-2-1-1-0 Backup Strategy</text>
      <rect x="60" y="28" width="740" height="12" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.8"/>
      <text x="430" y="38" textAnchor="middle" fontSize="7.5" fill="#92400e" fontWeight="600">Strategies / guidelines — not formally codified universal standards. Core principle: multiple independent copies, media diversity, offsite/isolated copy.</text>

      {/* 3-2-1 */}
      <text x="200" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Classic 3-2-1</text>
      {[
        { label:"3 COPIES", desc:"Production + 2 backup copies", sub:"Original data + Copy 1 + Copy 2", bg:"#dbeafe", border:"#2563eb", n:"3" },
        { label:"2 MEDIA TYPES", desc:"Disk + Tape, or Disk + Cloud", sub:"Different failure modes — diversification", bg:"#ede9fe", border:"#7c3aed", n:"2" },
        { label:"1 OFFSITE", desc:"Different physical location", sub:"Protects against site-level failure", bg:"#dcfce7", border:"#16a34a", n:"1" },
      ].map((item,i) => (
        <g key={i}>
          <rect x={30+i*120} y="64" width="110" height="62" rx="6" fill={item.bg} stroke={item.border} strokeWidth="1.5"/>
          <text x={85+i*120} y="82" textAnchor="middle" fontSize="22" fontWeight="800" fill={item.border}>{item.n}</text>
          <text x={85+i*120} y="96" textAnchor="middle" fontSize="8.5" fill="#111827" fontWeight="600">{item.label}</text>
          <text x={85+i*120} y="108" textAnchor="middle" fontSize="7.5" fill="#374151">{item.desc}</text>
          <text x={85+i*120} y="120" textAnchor="middle" fontSize="7" fill="#6b7280">{item.sub}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="390" y1="54" x2="390" y2="296" stroke="#e5e7eb" strokeWidth="1.5"/>

      {/* 3-2-1-1-0 */}
      <text x="625" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">Modern 3-2-1-1-0</text>
      {[
        { label:"3 COPIES",       desc:"Same as 3-2-1", bg:"#dbeafe", border:"#2563eb", n:"3" },
        { label:"2 MEDIA TYPES",  desc:"Same as 3-2-1", bg:"#ede9fe", border:"#7c3aed", n:"2" },
        { label:"1 OFFSITE",      desc:"Same as 3-2-1", bg:"#dcfce7", border:"#16a34a", n:"1" },
      ].map((item,i) => (
        <g key={i}>
          <rect x={400+i*78} y="64" width="70" height="54" rx="5" fill={item.bg} stroke={item.border} strokeWidth="1"/>
          <text x={435+i*78} y="80" textAnchor="middle" fontSize="16" fontWeight="800" fill={item.border}>{item.n}</text>
          <text x={435+i*78} y="92" textAnchor="middle" fontSize="7" fill="#111827" fontWeight="600">{item.label}</text>
          <text x={435+i*78} y="104" textAnchor="middle" fontSize="6.5" fill="#6b7280">{item.desc}</text>
        </g>
      ))}

      {/* +1 immutable */}
      <rect x="640" y="64" width="200" height="54" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="740" y="82" textAnchor="middle" fontSize="20" fontWeight="800" fill="#dc2626">+1</text>
      <text x="740" y="96" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="700">OFFLINE / IMMUTABLE / AIR-GAPPED</text>
      <text x="740" y="108" textAnchor="middle" fontSize="7.5" fill="#374151">Tape vault / immutable object lock / isolated</text>
      <text x="740" y="118" textAnchor="middle" fontSize="7.5" fill="#6b7280">Ransomware cannot easily reach/delete</text>

      {/* +0 verified */}
      <rect x="400" y="128" width="440" height="44" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="620" y="147" textAnchor="middle" fontSize="20" fontWeight="800" fill="#16a34a">+0</text>
      <text x="660" y="140" fontSize="9" fill="#15803d" fontWeight="700">ZERO ERRORS after verification / testing</text>
      <text x="660" y="154" fontSize="8" fill="#374151">"Success" ≠ recoverable — verify via restore test</text>
      <text x="660" y="166" fontSize="7.5" fill="#6b7280">Automated integrity check or periodic manual restore test</text>

      {/* Summary comparison */}
      <rect x="20" y="145" width="360" height="100" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="200" y="162" textAnchor="middle" fontSize="9" fontWeight="700" fill="#374151">3-2-1 Summary</text>
      <text x="30" y="180" fontSize="8.5" fill="#374151">Copy 1: Production data (local disk)</text>
      <text x="30" y="194" fontSize="8.5" fill="#374151">Copy 2: Local backup repository</text>
      <text x="30" y="208" fontSize="8.5" fill="#374151">Copy 3: Offsite (tape vault / cloud / second site)</text>
      <text x="30" y="222" fontSize="8" fill="#6b7280">Media A: Disk/Dedup Appliance</text>
      <text x="30" y="234" fontSize="8" fill="#6b7280">Media B: Tape or Cloud Storage</text>

      <rect x="400" y="184" width="440" height="56" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1"/>
      <text x="620" y="200" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">3-2-1-1-0 adds Ransomware Resilience</text>
      <text x="410" y="216" fontSize="8" fill="#374151">The "+1" copy: physically offline or immutably locked</text>
      <text x="410" y="230" fontSize="8" fill="#374151">so that even compromised admin accounts</text>
      <text x="410" y="244" fontSize="8" fill="#374151">cannot easily delete or encrypt all backup copies</text>

      <text x="430" y="258" textAnchor="middle" fontSize="7.5" fill="#9ca3af">Future image: backup-3-2-1-strategy.png</text>
    </svg>
  );
}
