"use client";
export default function MatrixMultiplyFlow() {
  const aColors = ["#dbeafe","#ede9fe","#dcfce7","#fef9c3"];
  const bColors = ["#dbeafe","#ede9fe","#dcfce7","#fef9c3"];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mmf-title">
      <title id="mmf-title">Matrix Multiplication: Matrix A rows × Matrix B columns = Result Matrix C. This is the most common operation in every neural network layer.</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">MATRIX MULTIPLICATION — Why AI Needs This So Much</text>
      <text x="410" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Every neural network layer is essentially: Input Data × Weight Matrix = Output. TPU does this faster than anything else.</text>

      {/* Matrix A */}
      <text x="112" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#2563eb" textAnchor="middle">Matrix A (Input Data)</text>
      <text x="112" y="75" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">e.g. batch of words in a sentence</text>
      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => (
          <rect key={`a${row}${col}`} x={30 + col*42} y={84 + row*42} width="38" height="38" rx="4" fill={aColors[row]} stroke="#2563eb" strokeWidth="1" />
        ))
      )}
      {[0,1,2,3].map(row => (
        <text key={row} x="14" y={108 + row*42} fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">row {row+1}</text>
      ))}

      {/* × sign */}
      <text x="212" y="180" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="700" fill="#475569" textAnchor="middle">×</text>

      {/* Matrix B */}
      <text x="332" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c3aed" textAnchor="middle">Matrix B (Model Weights)</text>
      <text x="332" y="75" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">learned parameters from training</text>
      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => (
          <rect key={`b${row}${col}`} x={250 + col*42} y={84 + row*42} width="38" height="38" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
        ))
      )}
      {[0,1,2,3].map(col => (
        <text key={col} x={269 + col*42} y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#4c1d95" textAnchor="middle">col{col+1}</text>
      ))}

      {/* = sign */}
      <text x="432" y="180" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="700" fill="#475569" textAnchor="middle">=</text>

      {/* Result Matrix C */}
      <text x="570" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#16a34a" textAnchor="middle">Matrix C (Output / Result)</text>
      <text x="570" y="75" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">new representation of the data</text>
      {[0,1,2,3].map(row =>
        [0,1,2,3].map(col => (
          <g key={`c${row}${col}`}>
            <rect x={490 + col*42} y={84 + row*42} width="38" height="38" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1} "/>
            <text x={509 + col*42} y={107 + row*42} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">∑</text>
          </g>
        ))
      )}

      {/* Bottom explanation */}
      <rect x="20" y="255" width="780" height="36" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="270" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#334155" textAnchor="middle">Why this matters for AI:</text>
      <text x="410" y="284" fontFamily="Arial,sans-serif" fontSize="8" fill="#475569" textAnchor="middle">Every attention layer in GPT/BERT/LLaMA = dozens of matrix multiplications. A 70B model = trillions of these operations per second needed. TPU's systolic array = purpose-built for exactly this.</text>
    </svg>
  );
}
