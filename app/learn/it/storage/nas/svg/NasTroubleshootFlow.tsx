"use client";
// Diagram 7 — NAS Inaccessible: Systematic Troubleshooting Flow
// Future image: /public/images/articles/nas/nas-troubleshooting-flow.png
export default function NasTroubleshootFlow() {
  return (
    <svg viewBox="0 0 860 480" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="NAS inaccessible — systematic troubleshooting flowchart"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="480" fill="#f8fafc" rx="12"/>
      <text x="430" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">NAS Inaccessible — Systematic Troubleshooting Flow</text>
      <text x="430" y="40" textAnchor="middle" fontSize="9.5" fill="#6b7280">Work through each layer before concluding hardware failure</text>

      {/* Start */}
      <rect x="300" y="52" width="260" height="26" rx="13" fill="#1e293b"/>
      <text x="430" y="69" textAnchor="middle" fontSize="10" fill="#f8fafc" fontWeight="600">NAS inaccessible complaint received</text>

      {/* Step 1 */}
      <line x1="430" y1="78" x2="430" y2="96" stroke="#6b7280" strokeWidth="1.5"/>
      <rect x="270" y="96" width="320" height="28" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2"/>
      <text x="430" y="114" textAnchor="middle" fontSize="9.5" fill="#92400e" fontWeight="600">Management GUI accessible and healthy?</text>

      {/* NO branch from step 1 */}
      <line x1="590" y1="110" x2="660" y2="110" stroke="#dc2626" strokeWidth="1.2"/>
      <text x="625" y="107" textAnchor="middle" fontSize="8" fill="#dc2626">No</text>
      <rect x="660" y="70" width="180" height="80" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="750" y="88" textAnchor="middle" fontSize="8.5" fill="#991b1b" fontWeight="600">Check systematically:</text>
      <text x="750" y="102" textAnchor="middle" fontSize="8" fill="#dc2626">• Mgmt VLAN/network</text>
      <text x="750" y="115" textAnchor="middle" fontSize="8" fill="#dc2626">• Routing / firewall</text>
      <text x="750" y="128" textAnchor="middle" fontSize="8" fill="#dc2626">• Mgmt service down</text>
      <text x="750" y="141" textAnchor="middle" fontSize="8" fill="#dc2626">• Controller / physical</text>

      {/* YES path */}
      <line x1="430" y1="124" x2="430" y2="142" stroke="#6b7280" strokeWidth="1.5"/>
      <text x="440" y="136" fontSize="8" fill="#16a34a">Yes</text>

      {/* Steps 2-7 */}
      {[
        { label: "DNS resolution working? (nslookup nas01)", no: "Fix DNS: NAS A record, client DNS server" },
        { label: "Network path — VLAN/routing correct? (ping/traceroute)", no: "VLAN mismatch, routing gap, check switch" },
        { label: "Protocol port open? (Port 445 SMB / Port 2049 NFS)", no: "SMB/NFS service down on NAS, or firewall block" },
        { label: "Share/export exists and path is correct?", no: "Create/fix share/export, verify exact path" },
        { label: "Authentication successful?", no: "AD connectivity, Kerberos time sync, credentials" },
        { label: "Permissions correct? (share + folder/NTFS)", no: "Fix share permissions, folder ACLs, AD groups" },
      ].map((step, i) => {
        const y = 142 + i * 46;
        return (
          <g key={i}>
            <rect x="240" y={y} width="380" height="28" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1"/>
            <text x="430" y={y + 17} textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="500">{step.label}</text>
            <line x1="430" y1={y + 28} x2="430" y2={y + 46} stroke="#6b7280" strokeWidth="1.5"/>
            <text x="440" y={y + 40} fontSize="8" fill="#16a34a">Yes</text>
            {/* No arrow */}
            <line x1="620" y1={y + 14} x2="660" y2={y + 14} stroke="#dc2626" strokeWidth="1"/>
            <text x="640" y={y + 11} textAnchor="middle" fontSize="7.5" fill="#dc2626">No</text>
            <rect x="660" y={y + 2} width="175" height="24" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="0.8"/>
            <text x="747" y={y + 18} textAnchor="middle" fontSize="7.5" fill="#991b1b">{step.no}</text>
          </g>
        );
      })}

      {/* Final */}
      <rect x="300" y="424" width="260" height="26" rx="13" fill="#16a34a"/>
      <text x="430" y="441" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Problem resolved — document</text>

      <text x="430" y="468" textAnchor="middle" fontSize="8.5" fill="#9ca3af">Future image: nas-troubleshooting-flow.png</text>
    </svg>
  );
}
