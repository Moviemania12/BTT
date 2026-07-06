"use client";

export default function StsMaintenanceBypassDiagram() {
  return (
    <svg viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sts-bp-title">
      <title id="sts-bp-title">STS Maintenance Bypass — Normal vs Bypass Mode</title>
      <rect width="860" height="320" fill="#ffffff" />
      <text x="430" y="28" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#0f172a" textAnchor="middle">
        STS MAINTENANCE BYPASS — NORMAL vs BYPASS MODE
      </text>

      {/* ── LEFT SIDE: NORMAL MODE ── */}
      <text x="215" y="58" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">NORMAL MODE</text>
      <rect x="30" y="70" width="80" height="40" rx="5" fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.5" />
      <text x="70" y="86" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" textAnchor="middle">Source A</text>
      <text x="70" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">(Preferred)</text>

      <rect x="30" y="175" width="80" height="40" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="70" y="191" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c2410c" textAnchor="middle">Source B</text>
      <text x="70" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">(Alternate)</text>

      {/* STS normal */}
      <rect x="155" y="105" width="100" height="75" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="205" y="130" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#92400e" textAnchor="middle">STS</text>
      <text x="205" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">Active — SCR</text>
      <text x="205" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#78350f" textAnchor="middle">switching</text>
      <text x="205" y="171" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">✓ Operational</text>

      {/* Bypass switch normal (open) */}
      <line x1="110" y1="90" x2="148" y2="90" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="148" y1="90" x2="148" y2="143" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
      <circle cx="148" cy="90" r="5" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="118" y="82" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">Bypass SW</text>
      <text x="118" y="93" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8">(OPEN)</text>

      <rect x="290" y="120" width="90" height="45" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="335" y="140" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">LOAD</text>
      <text x="335" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">via STS</text>

      <line x1="110" y1="90" x2="155" y2="130" stroke="#0066CC" strokeWidth="2" />
      <line x1="110" y1="195" x2="155" y2="175" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="255" y1="142" x2="290" y2="142" stroke="#d97706" strokeWidth="2.5" />

      {/* Divider */}
      <line x1="430" y1="50" x2="430" y2="270" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,4" />

      {/* ── RIGHT SIDE: BYPASS MODE ── */}
      <text x="645" y="58" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MAINTENANCE BYPASS MODE</text>

      <rect x="460" y="70" width="80" height="40" rx="5" fill="#eaf4ff" stroke="#0066CC" strokeWidth="1.5" />
      <text x="500" y="86" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" textAnchor="middle">Source A</text>
      <text x="500" y="100" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">(Preferred)</text>

      <rect x="460" y="175" width="80" height="40" rx="5" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
      <text x="500" y="191" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#c2410c" textAnchor="middle">Source B</text>
      <text x="500" y="205" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">(Alternate)</text>

      {/* STS bypassed */}
      <rect x="575" y="105" width="100" height="75" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="625" y="130" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#94a3b8" textAnchor="middle">STS</text>
      <text x="625" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">ISOLATED</text>
      <text x="625" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">for service</text>
      <text x="625" y="171" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">⚠ Bypassed</text>

      {/* Bypass switch closed — direct path */}
      <line x1="540" y1="90" x2="720" y2="90" stroke="#0066CC" strokeWidth="2.5" />
      <rect x="610" y="78" width="60" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="640" y="87" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#166534" textAnchor="middle">Bypass SW</text>
      <text x="640" y="97" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">CLOSED ✓</text>
      <line x1="720" y1="90" x2="720" y2="143" stroke="#0066CC" strokeWidth="2.5" />

      <rect x="720" y="120" width="90" height="45" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="765" y="140" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#166534" textAnchor="middle">LOAD</text>
      <text x="765" y="155" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">direct bypass</text>

      {/* Note box */}
      <rect x="450" y="250" width="390" height="52" rx="5" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="645" y="268" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#991b1b" textAnchor="middle">⚠ In Bypass Mode:</text>
      <text x="645" y="282" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" textAnchor="middle">• No automatic transfer between sources</text>
      <text x="645" y="296" fontFamily="Arial,sans-serif" fontSize="9" fill="#dc2626" textAnchor="middle">• Source A failure = load power loss. Keep maintenance window short.</text>
    </svg>
  );
}
