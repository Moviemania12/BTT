"use client";
export default function SystolicArrayDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="sa-title">
      <title id="sa-title">Systolic Array works like an assembly line: numbers flow in from the top and left, each cell multiplies two numbers and passes results to the next cell — all cells work simultaneously like a pipeline factory</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">SYSTOLIC ARRAY — The Assembly Line That Does AI Math</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Numbers flow in from the left and top → Each cell multiplies them → Passes result to next cell → Like a factory assembly line</text>

      {/* Left: simple grid showing the systolic array */}
      <text x="20" y="66" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#475569">Numbers flowing in from LEFT (Row values of Matrix A):</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="20" y={82 + i*56} width="52" height="40" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="46" y={105 + i*56} fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">a{i+1}</text>
          <line x1="74" y1={102 + i*56} x2="94" y2={102 + i*56} stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#sa-ar)" />
        </g>
      ))}

      <text x="174" y="66" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#475569">Numbers flowing in from TOP (Column values of Matrix B):</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={194 + i*106} y="70" width="60" height="30" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x={224 + i*106} y="89" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">b{i+1}</text>
          <line x1={224 + i*106} y1="102" x2={224 + i*106} y2="110" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#sa-ar2)" />
        </g>
      ))}

      {/* 4x4 systolic array */}
      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => {
          const x = 194 + col*106, y = 112 + row*56;
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width="60" height="44" rx="6" fill="#7c3aed" stroke="#4c1d95" strokeWidth="1" />
              <text x={x+30} y={y+18} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">CELL {row*4+col+1}</text>
              <text x={x+30} y={y+30} fontFamily="Arial,sans-serif" fontSize="8" fill="#ddd6fe" textAnchor="middle">×  +</text>
              <text x={x+30} y={y+42} fontFamily="Arial,sans-serif" fontSize="6" fill="#c4b5fd" textAnchor="middle">multiply + add</text>
              {/* Arrow right */}
              {col < 3 && <line x1={x+62} y1={y+22} x2={x+104} y2={y+22} stroke="#a78bfa" strokeWidth="1.2" markerEnd="url(#sa-ar3)" />}
              {/* Arrow down */}
              {row < 3 && <line x1={x+30} y1={y+46} x2={x+30} y2={y+54} stroke="#a78bfa" strokeWidth="1.2" markerEnd="url(#sa-ar3)" />}
            </g>
          );
        })
      )}

      {/* Result box */}
      <rect x="640" y="110" width="160" height="200" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="720" y="132" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#00d4ff" textAnchor="middle">RESULTS FLOW OUT</text>
      <text x="720" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Each cell accumulates</text>
      <text x="720" y="162" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">multiply results</text>
      <text x="720" y="178" fontFamily="Arial,sans-serif" fontSize="7" fill="#94a3b8" textAnchor="middle">Pass to accumulator</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="652" y={195 + i*22} width="136" height="16" rx="3" fill="#7c3aed" opacity={0.7 + i*0.05} />
          <text x="720" y={206 + i*22} fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="#fff" textAnchor="middle">Result Row {i+1} accumulated ✓</text>
        </g>
      ))}

      {/* Bottom explanation */}
      <rect x="20" y="344" width="780" height="0" />
      <text x="410" y="342" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">All 16 cells work simultaneously — like 16 workers in a factory. Real TPU: 256×256 = 65,536 cells working at once.</text>

      <defs>
        <marker id="sa-ar" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#2563eb" /></marker>
        <marker id="sa-ar2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#16a34a" /></marker>
        <marker id="sa-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#a78bfa" /></marker>
      </defs>
    </svg>
  );
}
