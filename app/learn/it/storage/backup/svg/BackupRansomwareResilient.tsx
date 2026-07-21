"use client";
// Diagram 7 — Ransomware-Resilient Backup Architecture
export default function BackupRansomwareResilient() {
  return (
    <svg viewBox="0 0 860 350" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Ransomware-resilient backup architecture with zone separation and immutable copies"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="350" fill="#f8fafc" rx="12"/>
      <text x="430" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Ransomware-Resilient Backup Architecture</text>

      {/* Zone 1 — Production */}
      <rect x="20" y="30" width="260" height="150" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="150" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">Zone 1 — Production</text>
      <text x="150" y="63" textAnchor="middle" fontSize="8" fill="#9ca3af">(Attack surface)</text>
      {["Servers / VMs","Databases","File Servers","Production Active Directory"].map((s,i) => (
        <g key={i}>
          <rect x="40" y={72+i*26} width="200" height="20" rx="3" fill="#fecaca" stroke="#dc2626" strokeWidth="0.6"/>
          <text x="140" y="85" dy={i*26} textAnchor="middle" fontSize="8.5" fill="#991b1b">{s}</text>
        </g>
      ))}
      <text x="150" y="180" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">Ransomware entry point</text>

      {/* Zone 2 — Backup Infra */}
      <rect x="300" y="30" width="260" height="150" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2"/>
      <text x="430" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#c2410c">Zone 2 — Backup Infrastructure</text>
      <text x="430" y="63" textAnchor="middle" fontSize="8" fill="#9ca3af">(Protected but connected)</text>
      <rect x="320" y="70" width="220" height="18" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="430" y="82" textAnchor="middle" fontSize="8.5" fill="#c2410c" fontWeight="600">Backup Server (separate svc account)</text>
      <rect x="320" y="94" width="220" height="18" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="430" y="106" textAnchor="middle" fontSize="8.5" fill="#c2410c">Backup Proxies</text>
      <rect x="320" y="118" width="220" height="18" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8"/>
      <text x="430" y="130" textAnchor="middle" fontSize="8.5" fill="#c2410c">Primary Repository</text>
      <text x="430" y="148" textAnchor="middle" fontSize="7.5" fill="#c2410c" fontWeight="600">🔐 MFA on backup console</text>
      <text x="430" y="162" textAnchor="middle" fontSize="7.5" fill="#c2410c" fontWeight="600">🔑 Credentials ≠ production AD</text>
      <text x="430" y="176" textAnchor="middle" fontSize="7.5" fill="#9ca3af">Firewall: production cannot initiate to backup</text>

      {/* Zone 3 — Isolated */}
      <rect x="580" y="30" width="260" height="150" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="710" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">Zone 3 — Isolated Copies</text>
      <text x="710" y="63" textAnchor="middle" fontSize="8" fill="#9ca3af">(Immutable / Air-gapped)</text>
      <rect x="596" y="70" width="228" height="32" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="710" y="84" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Immutable Repository</text>
      <text x="710" y="95" textAnchor="middle" fontSize="7.5" fill="#374151">Compliance mode: cannot delete — strongest</text>
      <text x="710" y="105" textAnchor="middle" fontSize="7" fill="#6b7280">Governance mode: privileged override possible</text>
      <rect x="596" y="108" width="228" height="26" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="710" y="122" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Air-Gapped Tape (offline vault)</text>
      <text x="710" y="134" textAnchor="middle" fontSize="7.5" fill="#374151">Physical air gap when media offline</text>
      <rect x="596" y="140" width="228" height="26" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
      <text x="710" y="154" textAnchor="middle" fontSize="8.5" fill="#166534" fontWeight="600">Cloud Immutable</text>
      <text x="710" y="166" textAnchor="middle" fontSize="7.5" fill="#374151">Separate cloud credentials, object lock</text>

      {/* Attack path */}
      <line x1="280" y1="110" x2="300" y2="110" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3"/>
      <text x="290" y="104" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="700">✗ Blocked</text>
      <line x1="560" y1="110" x2="580" y2="110" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x="570" y="104" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="700">Immutable</text>

      {/* Recovery path */}
      <rect x="20" y="196" width="820" height="100" rx="8" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="430" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">Recovery Path — Ransomware Scenario</text>
      <text x="40" y="232" fontSize="8.5" fill="#374151">1. Isolate infected systems. Shutdown vs keep-running: <text fontWeight="700" fill="#dc2626">consult IR plan and security team</text> — decision depends on IR capabilities,</text>
      <text x="56" y="246" fontSize="8.5" fill="#374151">forensic requirements, ransomware behavior, and organizational policy. Do not make unilaterally.</text>
      <text x="40" y="262" fontSize="8.5" fill="#374151">2. Identify last clean restore point (before infection). Use immutable/offline copy — verify it predates infection.</text>
      <text x="40" y="278" fontSize="8.5" fill="#374151">3. Restore to <text fontWeight="700" fill="#16a34a">isolated environment first</text> — verify cleanliness before connecting to production.</text>
      <text x="40" y="294" fontSize="8.5" fill="#374151">4. Engage incident response team. Contact backup vendor support.</text>

      <text x="430" y="316" textAnchor="middle" fontSize="8" fill="#9ca3af">Future image: backup-ransomware-resilient.png</text>
    </svg>
  );
}
