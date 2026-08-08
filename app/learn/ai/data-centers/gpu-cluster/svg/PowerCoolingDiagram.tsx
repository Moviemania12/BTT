"use client";
export default function PowerCoolingDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pcd-title">
      <title id="pcd-title">GPU Cluster Power and Cooling infrastructure. Left side Power Chain: Utility Grid (high voltage) flows through Transformer (voltage step-down) to UPS (battery backup protecting from power interruptions) with Generator backup, then to PDU (Power Distribution Unit in each rack) and finally to GPU Servers. Right side Cooling: Cooling system with CDU (Cooling Distribution Unit) separating facility water from IT liquid loop, distributing to rack liquid manifolds with cold plates on GPU chips, warm coolant returned for cooling. Air cooling shown as alternative for lower density deployments.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU CLUSTER — POWER AND COOLING INFRASTRUCTURE</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Power distribution must follow manufacturer specifications and applicable codes. Cooling architecture depends on rack power density and facility design.</text>

      {/* Power chain — left */}
      <rect x="14" y="44" width="370" height="224" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="199" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#713f12" textAnchor="middle">POWER CHAIN</text>

      {[
        { label: "Utility Grid", sub: "High-voltage AC supply", color: "#0f172a" },
        { label: "Transformer", sub: "Steps down to distribution voltage", color: "#0284c7" },
        { label: "UPS — Battery Backup", sub: "Protects from power interruptions;\nprovides continuity during grid transitions", color: "#7c3aed" },
        { label: "PDU — Power Strip (per rack)", sub: "Distributes power to each GPU server;\nfollow manufacturer specs + local codes", color: "#dc2626" },
        { label: "GPU Servers", sub: "Receive clean, protected, distributed power", color: "#16a34a" },
      ].map((c, i) => (
        <g key={c.label}>
          <rect x="30" y={72 + i * 40} width="338" height="32" rx="5" fill={c.color} />
          <text x="199" y={86 + i * 40} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{c.label}</text>
          {c.sub.split("\n").map((line, li) => (
            <text key={li} x="199" y={97 + i * 40 + li * 10} fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.85)" textAnchor="middle">{line}</text>
          ))}
          {i < 4 && <line x1="199" y1={104 + i * 40} x2="199" y2={112 + i * 40} stroke="#ca8a04" strokeWidth="2" markerEnd="url(#pcd-ar)" />}
        </g>
      ))}

      <rect x="30" y="248" width="338" height="14" rx="3" fill="#fef08a" />
      <text x="199" y="259" fontFamily="Arial,sans-serif" fontSize="7" fill="#713f12" textAnchor="middle">Generator backup for extended outages (N+1 minimum)</text>

      {/* Cooling chain — right */}
      <rect x="436" y="44" width="370" height="224" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="621" y="64" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#0c4a6e" textAnchor="middle">COOLING CHAIN</text>

      {[
        { label: "Facility Cooling Plant", sub: "Chiller, cooling tower, pumps", color: "#0c4a6e" },
        { label: "CDU — Cooling Distribution Unit", sub: "Separates facility water from IT loop;\nsecondary loop protects IT equipment", color: "#0284c7" },
        { label: "Rack Liquid Manifold", sub: "Distributes coolant to each server\nin rack; leak detection at this level", color: "#0891b2" },
        { label: "Cold Plates on GPU Chips", sub: "Coolant directly absorbs GPU heat;\nmuch more efficient than air for high density", color: "#7c3aed" },
        { label: "Warm Coolant Return", sub: "Heat carried back to CDU for rejection", color: "#dc2626" },
      ].map((c, i) => (
        <g key={c.label}>
          <rect x="452" y={72 + i * 40} width="338" height="32" rx="5" fill={c.color} />
          <text x="621" y={86 + i * 40} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">{c.label}</text>
          {c.sub.split("\n").map((line, li) => (
            <text key={li} x="621" y={97 + i * 40 + li * 10} fontFamily="Arial,sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.85)" textAnchor="middle">{line}</text>
          ))}
          {i < 4 && <line x1="621" y1={104 + i * 40} x2="621" y2={112 + i * 40} stroke="#0891b2" strokeWidth="2" markerEnd="url(#pcd-ar2)" />}
        </g>
      ))}

      <rect x="452" y="248" width="338" height="14" rx="3" fill="#cffafe" />
      <text x="621" y="259" fontFamily="Arial,sans-serif" fontSize="7" fill="#0c4a6e" textAnchor="middle">Air cooling alternative for lower-density deployments — depends on rack power and facility design</text>

      <defs>
        <marker id="pcd-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ca8a04" /></marker>
        <marker id="pcd-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#0891b2" /></marker>
      </defs>
    </svg>
  );
}
