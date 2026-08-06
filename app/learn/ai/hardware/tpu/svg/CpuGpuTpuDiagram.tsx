"use client";
export default function CpuGpuTpuDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cgt-title">
      <title id="cgt-title">CPU has few powerful cores for complex decisions. GPU has thousands of simple cores for parallel math. TPU has a Systolic Array specifically built for matrix multiplication — the core of AI.</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CPU vs GPU vs TPU — Three Different Tools for Three Different Jobs</text>

      {/* CPU */}
      <rect x="10" y="36" width="260" height="290" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="140" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">CPU</text>
      <text x="140" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Central Processing Unit</text>
      <text x="140" y="84" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">"The Brain — Few Very Smart Workers"</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={22 + (i % 2) * 120} y={100 + Math.floor(i/2) * 80} width="108" height="68" rx="6" fill="#2563eb" />
          <text x={76 + (i%2)*120} y={128 + Math.floor(i/2)*80} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Core {i+1}</text>
          <text x={76 + (i%2)*120} y={142 + Math.floor(i/2)*80} fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Complex Logic</text>
          <text x={76 + (i%2)*120} y={155 + Math.floor(i/2)*80} fontFamily="Arial,sans-serif" fontSize="7" fill="#bfdbfe" textAnchor="middle">Big Cache</text>
          <text x={76 + (i%2)*120} y={162 + Math.floor(i/2)*80} fontFamily="Arial,sans-serif" fontSize="6" fill="#93c5fd" textAnchor="middle">Decisions</text>
        </g>
      ))}
      <text x="140" y="270" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">4–128 cores</text>
      <text x="140" y="284" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Best for: OS, databases</text>
      <text x="140" y="296" fontFamily="Arial,sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle">AI training: Too slow</text>
      <text x="140" y="318" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">Swiss Army Knife</text>

      {/* GPU */}
      <rect x="280" y="36" width="260" height="290" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">GPU</text>
      <text x="410" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Graphics Processing Unit</text>
      <text x="410" y="84" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">"Many Simple Workers — All Working Together"</text>
      {Array.from({length:48}).map((_,i) => (
        <rect key={i} x={290 + (i%8)*30} y={96 + Math.floor(i/8)*28}
          width="26" height="24" rx="2"
          fill={i%6===0 ? "#16a34a" : "#86efac"} />
      ))}
      <text x="410" y="244" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">Thousands of CUDA Cores</text>
      <text x="410" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Best for: AI + Graphics</text>
      <text x="410" y="270" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">16,896 cores (H100)</text>
      <text x="410" y="284" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">CUDA ecosystem, flexible</text>
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">Any neural network</text>
      <text x="410" y="318" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">Powerful General Tool</text>

      {/* TPU */}
      <rect x="550" y="36" width="260" height="290" rx="10" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="680" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4c1d95" textAnchor="middle">TPU</text>
      <text x="680" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Tensor Processing Unit</text>
      <text x="680" y="84" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">"Specialist — Only Does Matrix Math. Very Fast."</text>
      {/* Systolic array grid */}
      {Array.from({length:36}).map((_,i) => {
        const col = i % 6, row = Math.floor(i/6);
        return (
          <g key={i}>
            <rect x={564 + col*37} y={96 + row*26} width="33" height="22" rx="2" fill="#7c3aed" />
            <text x={580 + col*37} y={111 + row*26} fontFamily="Arial,sans-serif" fontSize="5" fill="#ede9fe" textAnchor="middle">×+</text>
          </g>
        );
      })}
      <text x="680" y="252" fontFamily="Arial,sans-serif" fontSize="7" fill="#4c1d95" textAnchor="middle">Systolic Array — 256×256 cells (v4)</text>
      <text x="680" y="265" fontFamily="Arial,sans-serif" fontSize="8" fill="#4c1d95" textAnchor="middle">Best for: Matrix Multiply = AI</text>
      <text x="680" y="278" fontFamily="Arial,sans-serif" fontSize="8" fill="#4c1d95" textAnchor="middle">TensorFlow / JAX optimized</text>
      <text x="680" y="291" fontFamily="Arial,sans-serif" fontSize="8" fill="#4c1d95" textAnchor="middle">Google Cloud only</text>
      <text x="680" y="304" fontFamily="Arial,sans-serif" fontSize="7" fill="#7c3aed" textAnchor="middle">No general purpose — specialist only</text>
      <text x="680" y="318" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">Specialist Scalpel</text>
    </svg>
  );
}
