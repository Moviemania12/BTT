"use client";
export default function Mi300xChipletDiagram() {
  return (
    <svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="chiplet-title">
      <title id="chiplet-title">MI300X Chiplet Architecture: Bottom layer is the Silicon Interposer (the connection platform). On top sits the AID (Base Controller Chip) handling memory controllers, PCIe, and inter-die switching. On top of the AID are 8 GPU Compute Modules (XCDs), each with 38 Compute Units. On the sides are 4 stacks of Ultra-Fast Memory (HBM3), totaling 192GB at 5.3 TB/s.</title>
      <rect width="820" height="320" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MI300X CHIPLET ARCHITECTURE — Many Small Chips Working Together</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Instead of one giant chip, AMD uses 9 smaller specialized chips + 4 memory stacks. Better manufacturing yield and more memory capacity.</text>

      {/* Silicon Interposer — bottom layer */}
      <rect x="14" y="275" width="792" height="32" rx="6" fill="#334155" />
      <text x="410" y="289" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">Silicon Interposer — The Connection Platform (passive base that wires everything together)</text>
      <text x="410" y="302" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">High-density wiring carries data between all chiplets at ultra-high bandwidth · Like a printed circuit board but much denser</text>

      {/* AID — base controller */}
      <rect x="14" y="220" width="792" height="48" rx="6" fill="#16a34a" />
      <text x="410" y="240" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">AID — Base Controller Chip (Active Interposer Die)</text>
      <text x="410" y="254" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">Ultra-Fast Memory controllers · PCIe 5.0 connection to server · Routes data between compute modules · 6 memory channels</text>
      <text x="410" y="267" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#86efac" textAnchor="middle">Like a traffic controller: decides which GPU compute module gets which memory data</text>

      {/* 8 XCD compute dies */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = 108 + col * 154, y = 86 + row * 66;
        return (
          <g key={i}>
            <rect x={x} y={y} width={146} height={58} rx="6" fill="#7c3aed" stroke="#a78bfa" strokeWidth="1" />
            <text x={x + 73} y={y + 18} fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU Compute Module {i + 1}</text>
            <text x={x + 73} y={y + 31} fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">(XCD — Accelerator Complex Die)</text>
            <text x={x + 73} y={y + 43} fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">38 Compute Units · 2,432 Stream Processors</text>
            <text x={x + 73} y={y + 55} fontFamily="Arial,sans-serif" fontSize="6.5" fill="#a78bfa" textAnchor="middle">AI Math Engines included</text>
          </g>
        );
      })}

      {/* HBM stacks left */}
      <rect x="14" y="86" width="86" height="128" rx="6" fill="#dc2626" />
      <text x="57" y="116" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Ultra-Fast</text>
      <text x="57" y="128" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Memory</text>
      <text x="57" y="142" fontFamily="Arial,sans-serif" fontSize="7" fill="#fca5a5" textAnchor="middle">(HBM3)</text>
      <text x="57" y="158" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">48 GB each</text>
      <text x="57" y="171" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fecaca" textAnchor="middle">Stack 1 + 2</text>

      {/* HBM stacks right */}
      <rect x="720" y="86" width="86" height="128" rx="6" fill="#dc2626" />
      <text x="763" y="116" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Ultra-Fast</text>
      <text x="763" y="128" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Memory</text>
      <text x="763" y="142" fontFamily="Arial,sans-serif" fontSize="7" fill="#fca5a5" textAnchor="middle">(HBM3)</text>
      <text x="763" y="158" fontFamily="Arial,sans-serif" fontSize="7" fill="#fecaca" textAnchor="middle">48 GB each</text>
      <text x="763" y="171" fontFamily="Arial,sans-serif" fontSize="6.5" fill="#fecaca" textAnchor="middle">Stack 3 + 4</text>

      {/* Total stats */}
      <rect x="14" y="54" width="792" height="26" rx="5" fill="#1e1b4b" />
      <text x="410" y="71" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">
        Total: 304 Compute Units · 19,456 Stream Processors · 192 GB Ultra-Fast Memory (HBM3) · 5.3 TB/s Memory Speed · 750W
      </text>
    </svg>
  );
}
