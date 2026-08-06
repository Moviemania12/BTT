"use client";
export default function TpuInterconnect() {
  return (
    <svg viewBox="0 0 820 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ti-title">
      <title id="ti-title">ICI Direct Chip-to-Chip Links: Each TPU chip has 6 direct connections to its neighbours in 3 directions (left-right, front-back, up-down) forming a 3D Donut Network (Torus). Any chip reaches any other in a few hops. No external network switch needed — chips talk directly. TPU v4 uses light (optical fiber) not copper wire for these links.</title>
      <rect width="820" height="310" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ICI — Direct Chip-to-Chip Links — How TPU Chips Talk Without a Switch</text>

      {/* Left: 4×4 grid */}
      <rect x="20" y="36" width="380" height="260" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="210" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">Top View — 4×4 Grid of TPU Chips (simplified)</text>
      <text x="210" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">(A real Pod is much larger — this shows the connection pattern)</text>

      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => {
          const cx = 76 + col*74, cy = 108 + row*46;
          return (
            <g key={`${row}-${col}`}>
              {col < 3 && <line x1={cx+22} y1={cy} x2={cx+52} y2={cy} stroke="#7c3aed" strokeWidth="2" />}
              {col === 3 && <line x1={cx+22} y1={cy} x2={cx+36} y2={cy} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />}
              {row < 3 && <line x1={cx} y1={cy+14} x2={cx} y2={cy+34} stroke="#16a34a" strokeWidth="2" />}
              {row === 3 && <line x1={cx} y1={cy+14} x2={cx} y2={cy+28} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />}
              <rect x={cx-20} y={cy-13} width="40" height="26" rx="5" fill="#7c3aed" />
              <text x={cx} y={cy+3} fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="700" fill="#fff" textAnchor="middle">Chip {row*4+col+1}</text>
            </g>
          );
        })
      )}

      <text x="80" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">— Purple: Left-Right links</text>
      <text x="240" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">— Green: Front-Back links</text>
      <text x="180" y="294" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Dashed = wrap-around (last chip connects back to first — "torus")</text>

      {/* Right: ICI facts */}
      <rect x="420" y="36" width="380" height="260" rx="10" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="610" y="60" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">ICI — 6 KEY FACTS</text>

      {[
        {
          label: "6 direct links per chip",
          desc: "Each chip has 6 cables going out: left, right, front, back, up, down. Each link = direct connection to the neighbouring chip.",
          color: "#818cf8",
        },
        {
          label: "3D Donut Network (3D Torus)",
          desc: "The chips form a donut shape in 3 dimensions. Last chip wraps around to connect to first. Any chip reaches any other in few hops.",
          color: "#a78bfa",
        },
        {
          label: "Very high speed — hundreds of GB/s",
          desc: "Each link carries hundreds of gigabytes per second. Comparable to NVLink (GPU equivalent) but built directly into chip.",
          color: "#c4b5fd",
        },
        {
          label: "Uses light not copper (v4+)",
          desc: "TPU v4 uses optical fiber (light pulses) instead of copper wire. Faster at longer distances — lets Pods span across a full data center.",
          color: "#ddd6fe",
        },
        {
          label: "No external switch needed",
          desc: "GPU clusters need expensive InfiniBand switches. TPU Pod: chips talk directly — no external switch equipment needed inside the Pod.",
          color: "#e0e7ff",
        },
        {
          label: "Enables 4,096-chip Pods",
          desc: "ICI + optical fiber together make it possible to connect 4,096 chips across racks as one compute unit. This is how Gemini was trained.",
          color: "#f0f9ff",
        },
      ].map((item, i) => (
        <g key={i}>
          <rect x="432" y={76 + i*32} width="356" height="26" rx="5" fill="rgba(124,58,237,0.15)" />
          <text x="444" y={87 + i*32} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill={item.color}>{item.label}:</text>
          <text x="444" y={87 + i*32} fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8">
            <tspan dx="4" dy="10">{item.desc.length > 72 ? item.desc.slice(0, 72) + "…" : item.desc}</tspan>
          </text>
        </g>
      ))}

      <rect x="432" y="276" width="356" height="14" rx="3" fill="#7c3aed" opacity="0.3" />
      <text x="610" y="287" fontFamily="Arial,sans-serif" fontSize="8" fill="#818cf8" textAnchor="middle">Result: 4,096 chips behave as one giant compute unit — that is a TPU Pod</text>
    </svg>
  );
}
