"use client";

export default function BmsTroubleshootingLayers() {
  const layers = [
    { n: "L10", label: "Alarm / Trend / Historian", fault: "Alarm not generated · trend missing · history gap", col: "#fef2f2", bc: "#dc2626", tc: "#7f1d1d" },
    { n: "L9",  label: "HMI and Graphics",          fault: "Graphic stale · binding wrong · display not updating",  col: "#fee2e2", bc: "#ef4444", tc: "#991b1b" },
    { n: "L8",  label: "Point Mapping / Binding",   fault: "Wrong register · incorrect scaling · wrong data type",  col: "#fff7ed", bc: "#f97316", tc: "#7c2d12" },
    { n: "L7",  label: "BMS Driver / Integration Server", fault: "Device offline in driver · timeout · license/point limit", col: "#fef3c7", bc: "#f59e0b", tc: "#78350f" },
    { n: "L6",  label: "Gateway",                   fault: "Gateway offline · wrong mapping · both sides not talking", col: "#ede9fe", bc: "#7c3aed", tc: "#4c1d95" },
    { n: "L5",  label: "Protocol",                  fault: "Wrong FC · byte order error · object instance wrong",    col: "#faf5ff", bc: "#a855f7", tc: "#6b21a8" },
    { n: "L4",  label: "Communication Configuration", fault: "Wrong baud/parity · slave ID conflict · wrong IP/port", col: "#e0f2fe", bc: "#0ea5e9", tc: "#0c4a6e" },
    { n: "L3",  label: "Physical Communication",    fault: "Cable break · A/B swapped · no termination · noise",    col: "#f0f9ff", bc: "#2563eb", tc: "#1e3a8a" },
    { n: "L2",  label: "Sensor / Equipment Controller", fault: "No local value · sensor failed · controller in fault", col: "#f0fdf4", bc: "#16a34a", tc: "#14532d" },
    { n: "L1",  label: "Field Equipment",           fault: "Equipment off · not running · local display wrong",      col: "#dcfce7", bc: "#22c55e", tc: "#166534" },
  ];

  return (
    <svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="10-layer BMS troubleshooting model from field equipment at bottom through communication layers to HMI and alarm at top, with common fault at each layer">
      <rect width="900" height="480" fill="#ffffff" />
      <text x="450" y="26" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="700" fill="#111827">BMS Troubleshooting — Layered Diagnostic Model</text>
      <text x="450" y="42" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#374151">Start at L1 (field) → work upward. Each layer must pass before the next can work.</text>

      {layers.map((l, i) => {
        const y = 54 + i * 41;
        return (
          <g key={i}>
            {/* Layer bar */}
            <rect x="20" y={y} width="860" height="35" rx="5" fill={l.col} stroke={l.bc} strokeWidth="1.5" />
            {/* Layer number */}
            <rect x="20" y={y} width="40" height="35" rx="5" fill={l.bc} />
            <text x="40" y={y + 22} textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#ffffff">{l.n}</text>
            {/* Layer name */}
            <text x="75" y={y + 14} fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill={l.tc}>{l.label}</text>
            {/* Common fault */}
            <text x="75" y={y + 28} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Common fault: {l.fault}</text>
            {/* Start here label for L1 */}
            {i === layers.length - 1 && (
              <text x="860" y={y + 22} textAnchor="end" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#166534">← START HERE</text>
            )}
          </g>
        );
      })}

      {/* Direction arrow */}
      <line x1="885" y1="450" x2="885" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#tsArr)" />
      <text x="870" y="260" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b" transform="rotate(-90 870 260)">Troubleshoot upward →</text>

      <text x="450" y="476" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Isolate at each layer before moving up — do not skip layers</text>

      <defs>
        <marker id="tsArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0 0,7 3.5,0 7" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
