"use client";
export default function DimmPopulation() {
  const f = "Arial,sans-serif";
  const panel = (x: number, title: string, sub: string, filled: boolean[], note: string, good: boolean, k: string) => (
    <g key={k}>
      <rect x={x} y="46" width="250" height="300" rx="8" fill="#f8fafc" stroke={good ? "#16a34a" : "#dc2626"} strokeWidth="2" />
      <text x={x + 125} y="68" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#111827">{title}</text>
      <text x={x + 125} y="84" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">{sub}</text>
      <rect x={x + 85} y="96" width="80" height="26" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x={x + 125} y="113" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">CPU</text>
      {filled.map((on, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const cx = x + 20 + col * 54, cy = 140 + row * 70;
        return (
          <g key={i}>
            <line x1={x + 125} y1="122" x2={cx + 22} y2={cy} stroke="#cbd5e1" strokeWidth="1" />
            <rect x={cx} y={cy} width="44" height="52" rx="4" fill={on ? "#bbf7d0" : "#fff"} stroke={on ? "#16a34a" : "#9ca3af"} strokeWidth="1.5" strokeDasharray={on ? undefined : "4 3"} />
            <text x={cx + 22} y={cy + 20} textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill={on ? "#166534" : "#9ca3af"}>{"ABCDEFGH"[i]}</text>
            <text x={cx + 22} y={cy + 36} textAnchor="middle" fontFamily={f} fontSize="8" fill={on ? "#166534" : "#9ca3af"}>{on ? "DIMM" : "empty"}</text>
          </g>
        );
      })}
      <text x={x + 125} y="302" textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill={good ? "#166534" : "#991b1b"}>{good ? "Balanced" : "Unbalanced"}</text>
      <text x={x + 125} y="320" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{note}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three DIMM population examples for an 8-channel CPU: all 8 channels with one DIMM each is balanced, 4 large DIMMs leave half the channels empty, and 6 DIMMs give uneven interleave" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">DIMM Population — One Socket, 8 Channels (A–H), 1 DIMM Per Channel Slot Shown</text>
      {panel(20, "Case 1: 8 × 64 GB = 512 GB", "All 8 channels used", [true, true, true, true, true, true, true, true], "Full bandwidth, even interleave", true, "p1")}
      {panel(305, "Case 2: 4 × 128 GB = 512 GB", "Same capacity, 4 channels used", [true, true, true, true, false, false, false, false], "Roughly half the bandwidth", false, "p2")}
      {panel(590, "Case 3: 6 × 64 GB = 384 GB", "6 of 8 channels used", [true, true, true, true, true, true, false, false], "Uneven interleave, lower BW", false, "p3")}
      <rect x="20" y="360" width="820" height="46" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="378" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Same 512 GB can give very different bandwidth. Capacity and channel count are separate decisions.</text>
      <text x="430" y="394" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Illustrative. Exact slot order, supported DIMM counts and speed per DIMM-per-channel come from the OEM population guide.</text>
    </svg>
  );
}
