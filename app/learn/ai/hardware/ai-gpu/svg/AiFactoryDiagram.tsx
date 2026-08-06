"use client";
export default function AiFactoryDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aif-title">
      <title id="aif-title">AI Factory: Training Data comes in, goes through GPU Clusters, produces Trained AI Models or AI Responses out — powered by MW-scale electricity and cooled by liquid cooling systems</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI FACTORY — RAW DATA IN, AI MODELS OUT</text>

      {/* Input */}
      <rect x="20" y="46" width="140" height="200" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="68" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af" textAnchor="middle">INPUT</text>
      {["Training Data", "User Queries", "Text", "Images", "Code"].map((t,i) => (
        <g key={i}>
          <rect x="30" y={78+i*30} width="120" height="24" rx="4" fill="#2563eb" />
          <text x="90" y={93+i*30} fontFamily="Arial,sans-serif" fontSize="8" fill="#fff" textAnchor="middle">{t}</text>
        </g>
      ))}
      <line x1="162" y1="146" x2="182" y2="146" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#af1)" />

      {/* GPU Compute */}
      <rect x="184" y="36" width="452" height="220" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="410" y="56" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#00d4ff" textAnchor="middle">GPU COMPUTE CLUSTER</text>
      <text x="410" y="70" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Thousands of H100/B200 GPUs · 24/7 operation</text>

      {/* Rack rows */}
      {[0,1,2].map(row => (
        <g key={row}>
          {[0,1,2,3,4].map(col => (
            <g key={col}>
              <rect x={196+col*84} y={84+row*48} width="76" height="40" rx="4" fill="#2563eb" stroke="#3b82f6" strokeWidth="0.5" />
              <text x={234+col*84} y={100+row*48} fontFamily="Arial,sans-serif" fontSize="6" fontWeight="700" fill="#fff" textAnchor="middle">8× H100</text>
              <text x={234+col*84} y={113+row*48} fontFamily="Arial,sans-serif" fontSize="5.5" fill="#bfdbfe" textAnchor="middle">NVSwitch · IB NIC</text>
            </g>
          ))}
        </g>
      ))}

      {/* Infrastructure strip */}
      <rect x="196" y="232" width="432" height="16" rx="4" fill="#334155" />
      <text x="412" y="243" fontFamily="Arial,sans-serif" fontSize="7" fill="#7dd3fc" textAnchor="middle">InfiniBand Network Fabric · Parallel Storage · Direct Liquid Cooling · MW-scale Power</text>

      <line x1="638" y1="146" x2="658" y2="146" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#af1)" />

      {/* Output */}
      <rect x="660" y="46" width="140" height="200" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="730" y="68" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">OUTPUT</text>
      {["Trained Models", "AI Responses", "Embeddings", "Generated Text", "Code Output"].map((t,i) => (
        <g key={i}>
          <rect x="670" y={78+i*30} width="120" height="24" rx="4" fill="#16a34a" />
          <text x="730" y={93+i*30} fontFamily="Arial,sans-serif" fontSize="8" fill="#fff" textAnchor="middle">{t}</text>
        </g>
      ))}

      {/* Power and Cooling labels below */}
      <rect x="20" y="264" width="780" height="28" rx="6" fill="#f1f5f9" />
      <text x="164" y="281" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">⚡ Power: Tens of MW</text>
      <text x="410" y="281" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">❄️ Cooling: Direct Liquid Cooling (Cold Plate) mandatory</text>
      <text x="656" y="281" fontFamily="Arial,sans-serif" fontSize="8" fill="#334155" textAnchor="middle">🌐 Network: InfiniBand NDR</text>

      <defs>
        <marker id="af1" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
      </defs>
    </svg>
  );
}
