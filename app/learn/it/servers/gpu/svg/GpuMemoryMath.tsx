"use client";
export default function GpuMemoryMath() {
  const f = "Arial,sans-serif";
  const X0 = 150, SC = 3.6; // px per GB
  const seg = (x: number, w: number, y: number, c: string, b: string, t: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height="30" fill={c} stroke={b} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#111827">{t}</text>
    </g>
  );
  const parts = [
    ["Weights FP16", 14, "#dbeafe", "#2563eb"],
    ["Gradients", 14, "#dcfce7", "#16a34a"],
    ["Master wts FP32", 28, "#fef3c7", "#f59e0b"],
    ["Adam m", 28, "#fee2e2", "#dc2626"],
    ["Adam v", 28, "#ede9fe", "#7c3aed"],
  ] as const;
  let cx = X0;
  return (
    <svg viewBox="0 0 860 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GPU memory arithmetic: training a 7 billion parameter model with Adam in mixed precision needs about 112 GB before activations, while inference memory for a 70 billion parameter model is 140 GB in FP16, 70 GB in INT8 and 35 GB in INT4, compared with an 80 GB GPU" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="440" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Will It Fit? — GPU Memory Arithmetic (rule-of-thumb)</text>
      <text x="30" y="56" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">A) TRAINING a 7B-parameter model, mixed precision + Adam (~16 bytes per parameter)</text>
      {parts.map((p, i) => { const w = p[1] * SC; const el = seg(cx, w, 72, p[2], p[3], p[0], "t" + i); cx += w; return el; })}
      <text x={X0} y="124" fontFamily={f} fontSize="9.5" fill="#374151">0</text>
      <text x={X0 + 112 * SC} y="124" textAnchor="end" fontFamily={f} fontSize="10" fontWeight="700" fill="#991b1b">= 112 GB  (+ activations)</text>
      <line x1={X0 + 80 * SC} y1="62" x2={X0 + 80 * SC} y2="116" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
      <text x={X0 + 80 * SC + 4} y="136" fontFamily={f} fontSize="10" fontWeight="700" fill="#dc2626">80 GB GPU limit</text>
      <text x="30" y="160" fontFamily={f} fontSize="10" fill="#374151">Result: a 7B model does NOT fit on one 80 GB GPU for plain full training. Sharding (ZeRO/FSDP), tensor parallelism or offload is needed.</text>

      <text x="30" y="200" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">B) INFERENCE of a 70B-parameter model — weights only (KV-cache and activations are extra)</text>
      {[["FP16 (2 B/param)", 140, "#dbeafe", "#2563eb"], ["INT8 (1 B/param)", 70, "#dcfce7", "#16a34a"], ["INT4 (0.5 B/param)", 35, "#fef3c7", "#f59e0b"]].map((r, i) => (
        <g key={i}>
          <text x="30" y={246 + i * 44} fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{r[0] as string}</text>
          <rect x={X0} y={226 + i * 44} width={(r[1] as number) * 3.6 * 1} height="30" fill={r[2] as string} stroke={r[3] as string} strokeWidth="1.5" />
          <text x={X0 + (r[1] as number) * 3.6 + 8} y={246 + i * 44} fontFamily={f} fontSize="10.5" fontWeight="700" fill="#111827">{r[1] as number} GB</text>
        </g>
      ))}
      <line x1={X0 + 80 * SC} y1="216" x2={X0 + 80 * SC} y2="350" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
      <text x={X0 + 80 * SC + 4} y="212" fontFamily={f} fontSize="10" fontWeight="700" fill="#dc2626">80 GB GPU</text>
      <rect x="30" y="366" width="800" height="50" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="386" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Quick formula: weights (GB) ≈ parameters (billions) × bytes per parameter. Training needs roughly 8× more than FP16 weights alone.</text>
      <text x="430" y="404" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Rule-of-thumb figures; real usage depends on framework, optimizer, sequence length, batch size and sharding strategy.</text>
    </svg>
  );
}
