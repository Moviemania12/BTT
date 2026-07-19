"use client";
export default function ServerVsPc() {
  return (
    <svg viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Server vs PC comparison showing key hardware differences">
      <rect width="860" height="380" fill="#fff"/>
      <text x="430" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">Server vs Personal Computer — Key Differences</text>
      {/* Headers */}
      <rect x="10" y="36" width="415" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="217" y="59" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#1e40af">🖥️ SERVER</text>
      <rect x="435" y="36" width="415" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="642" y="59" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#374151">💻 PERSONAL COMPUTER</text>
      {[
        ["Memory","ECC RAM — detects/corrects bit errors","Standard RAM — no error correction"],
        ["Power","Redundant PSUs — one fails, server continues","Single PSU — fails = system off"],
        ["Storage","Hot-swap bays — replace drives without shutdown","Fixed drives — shutdown to replace"],
        ["Remote Mgmt","BMC/iDRAC/iLO — OS-independent access","None — requires physical access"],
        ["Cooling","High-RPM fans, front-to-back airflow, data center rated","Quiet fans, case-optimised cooling"],
        ["Form Factor","Rack-mount (1U/2U/4U) or blade for DC density","Tower, laptop — home/office placement"],
        ["CPU","Intel Xeon / AMD EPYC — multi-socket, more PCIe lanes","Consumer desktop/laptop CPUs"],
        ["Availability Goal","Designed for continuous operation with redundancy","Occasional downtime acceptable"],
      ].map(([aspect, sv, pc], i) => {
        const y = 82 + i * 36;
        const bg = i % 2 === 0 ? "#f8fafc" : "#ffffff";
        return (
          <g key={i}>
            <rect x="10" y={y} width="840" height="34" rx="4" fill={bg}/>
            <text x="16" y={y+20} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#6b7280" textLength="80">{aspect}</text>
            <text x="96" y={y+20} fontFamily="Arial,sans-serif" fontSize="10.5" fill="#1e40af" textLength="320" lengthAdjust="spacingAndGlyphs">{sv}</text>
            <line x1="425" y1={y} x2="425" y2={y+34} stroke="#e2e8f0"/>
            <text x="440" y={y+20} fontFamily="Arial,sans-serif" fontSize="10.5" fill="#374151" textLength="400" lengthAdjust="spacingAndGlyphs">{pc}</text>
          </g>
        );
      })}
      <text x="430" y="374" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Specific capabilities depend on server model, generation and configuration</text>
    </svg>
  );
}
