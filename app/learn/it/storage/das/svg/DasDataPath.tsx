"use client";

// ═══════════════════════════════════════════════════════════════════════════
// svg/DasDataPath.tsx — Diagram 1: DAS Data Path Overview
//
// Future image: /public/images/articles/das/das-data-path.png
//
// Purpose:
//   Visualise the complete data path from server CPU to physical drives
//   for both Internal DAS and External JBOD — making it immediately clear
//   that no network exists anywhere in the path.
//
// What to show:
//   Left panel (Internal DAS): Server box with layers labeled top-to-bottom —
//     "Application / Database / VM" → "OS + File System" →
//     "Storage Driver" → "Storage Controller / HBA" →
//     "Backplane" → "Drive Bay 0–3 (HDD / SSD / NVMe)"
//   Right panel (External JBOD): Same server → SAS cable (labeled
//     "Direct SAS Cable — No Network") → External JBOD Enclosure →
//     Drive Bays; cable clearly shows direct physical connection.
//   Both panels share the same server block.
//   A red "✕ Network Switch" element is shown crossed out between the two
//     panels to emphasise the absence of a network.
//   Bay 0 carries a small "Activity LED (Blue)" and "Fault LED (Amber)" label.
//
// Learning objective:
//   Reader immediately grasps that DAS = direct cable, no network, and sees
//   the physical difference between internal and external DAS variants.
// ═══════════════════════════════════════════════════════════════════════════

export default function DasDataPath() {
  return (
    <svg
      viewBox="0 0 860 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DAS Data Path Overview — Internal vs External DAS, showing direct connection with no network"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}
    >
      {/* Background */}
      <rect width="860" height="360" fill="#f8fafc" rx="12" />

      {/* Title */}
      <text x="430" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">
        DAS Data Path Overview — Internal vs External
      </text>
      <text x="430" y="48" textAnchor="middle" fontSize="10" fill="#6b7280">
        No network in either path — direct physical connection only
      </text>

      {/* ── LEFT: Internal DAS ── */}
      <rect x="30" y="68" width="360" height="262" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">Internal DAS</text>

      {/* Server box layers */}
      {[
        ["Application / Database / VM", "#dbeafe", "#1e40af"],
        ["OS + File System",            "#bfdbfe", "#1d4ed8"],
        ["Storage Driver",              "#93c5fd", "#1d4ed8"],
        ["Storage Controller / HBA",   "#3b82f6", "#ffffff"],
        ["Backplane",                   "#2563eb", "#ffffff"],
        ["Drive Bays 0–3 (HDD/SSD/NVMe)", "#1d4ed8", "#ffffff"],
      ].map(([label, bg, fg], i) => (
        <g key={i}>
          <rect x="50" y={100 + i * 36} width="320" height="32" rx="5" fill={bg} />
          <text x="210" y={100 + i * 36 + 20} textAnchor="middle" fontSize="10" fill={fg} fontWeight={i >= 3 ? "700" : "400"}>
            {label}
          </text>
          {i < 5 && (
            <text x="210" y={100 + i * 36 + 38} textAnchor="middle" fontSize="10" fill="#3b82f6">↓</text>
          )}
        </g>
      ))}

      {/* LED labels on last row */}
      <text x="50" y="322" fontSize="8" fill="#059669">● Activity (Blue)</text>
      <text x="150" y="322" fontSize="8" fill="#dc2626">● Fault (Amber)</text>

      {/* ── RIGHT: External JBOD ── */}
      <rect x="470" y="68" width="360" height="262" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">External DAS — JBOD</text>

      {/* Server mini block */}
      <rect x="490" y="100" width="140" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="560" y="124" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">Server</text>
      <text x="560" y="140" textAnchor="middle" fontSize="8" fill="#166534">Storage Controller</text>
      <text x="560" y="153" textAnchor="middle" fontSize="8" fill="#166534">/ HBA Port</text>

      {/* SAS cable label */}
      <line x1="630" y1="130" x2="700" y2="130" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="5,3" />
      <text x="665" y="120" textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="700">SAS Cable</text>
      <text x="665" y="148" textAnchor="middle" fontSize="7.5" fill="#6b7280">Direct — No Network</text>
      <text x="665" y="158" textAnchor="middle" fontSize="7.5" fill="#6b7280">Max ~10 m</text>

      {/* JBOD enclosure */}
      <rect x="700" y="100" width="110" height="160" rx="6" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <text x="755" y="120" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d">JBOD Enclosure</text>
      <text x="755" y="133" textAnchor="middle" fontSize="7.5" fill="#166534">SAS IN / OUT</text>
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x="715" y={140 + i * 18} width="80" height="14" rx="3"
          fill={i % 2 === 0 ? "#4ade80" : "#86efac"} stroke="#16a34a" strokeWidth="0.5" />
      ))}
      <text x="755" y="257" textAnchor="middle" fontSize="7" fill="#166534">Drives 0–N</text>

      {/* No-network cross-out */}
      <rect x="490" y="200" width="90" height="30" rx="5" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="535" y="210" textAnchor="middle" fontSize="7.5" fill="#dc2626" fontWeight="700">✕ Network Switch</text>
      <text x="535" y="224" textAnchor="middle" fontSize="7" fill="#dc2626">Not Present in DAS</text>

      {/* Footnote */}
      <text x="430" y="350" textAnchor="middle" fontSize="8.5" fill="#9ca3af">
        Future image: /public/images/articles/das/das-data-path.png
      </text>
    </svg>
  );
}
