"use client";
export default function LlmClusterNetworking() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lcn-title">
      <title id="lcn-title">LLM Cluster Networking: InfiniBand training fabric and Ethernet serving fabric with NVLink intra-node</title>
      <rect width="820" height="300" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">LLM CLUSTER NETWORKING</text>

      {/* Left: Training fabric */}
      <rect x="20" y="38" width="380" height="230" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="210" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">TRAINING FABRIC</text>
      <text x="210" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">InfiniBand NDR 400Gbps — Non-blocking Fat-Tree</text>

      {/* Spine switches */}
      <rect x="130" y="86" width="160" height="26" rx="5" fill="#1e40af" />
      <text x="210" y="103" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Spine IB Switches (L3)</text>

      {/* Leaf switches */}
      {[0, 1].map(i => (
        <g key={i}>
          <rect x={50 + i * 170} y="132" width="140" height="22" rx="4" fill="#2563eb" />
          <text x={120 + i * 170} y="147" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">Leaf IB Switch {i + 1}</text>
        </g>
      ))}
      <line x1="210" y1="112" x2="120" y2="132" stroke="#2563eb" strokeWidth="1" />
      <line x1="210" y1="112" x2="290" y2="132" stroke="#2563eb" strokeWidth="1" />

      {/* DGX nodes */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={35 + i * 95} y="172" width="82" height="54" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          <text x={76 + i * 95} y="192" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">DGX H100</text>
          <text x={76 + i * 95} y="205" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">8× H100</text>
          <text x={76 + i * 95} y="218" fontFamily="Arial,sans-serif" fontSize="7" fill="#1d4ed8" textAnchor="middle">NVSwitch</text>
        </g>
      ))}
      {[0, 1].map(i => <line key={i} x1={120} y1={154} x2={76 + i * 95} y2={172} stroke="#93c5fd" strokeWidth="1" />)}
      {[2, 3].map(i => <line key={i} x1={290} y1={154} x2={76 + i * 95} y2={172} stroke="#93c5fd" strokeWidth="1" />)}

      <text x="210" y="244" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">NVLink 4.0 (900 GB/s) within node</text>
      <text x="210" y="258" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">ConnectX-7 (400Gbps IB) between nodes</text>

      {/* Right: Serving fabric */}
      <rect x="420" y="38" width="380" height="230" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="610" y="58" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">SERVING FABRIC</text>
      <text x="610" y="72" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">100GbE / 400GbE — Standard Ethernet</text>

      <rect x="490" y="86" width="240" height="26" rx="5" fill="#14532d" />
      <text x="610" y="103" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Top-of-Rack Ethernet Switches</text>

      {/* Inference pods */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <rect x={435 + i * 95} y="132" width="82" height="80" rx="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
          <text x={476 + i * 95} y="152" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">vLLM Pod</text>
          <text x={476 + i * 95} y="165" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">2× H100</text>
          <text x={476 + i * 95} y="178" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">NVLink</text>
          <text x={476 + i * 95} y="191" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">PagedAttn</text>
          <text x={476 + i * 95} y="204" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">INT4 / FP8</text>
        </g>
      ))}
      {[0, 1, 2, 3].map(i => <line key={i} x1={610} y1={112} x2={476 + i * 95} y2={132} stroke="#86efac" strokeWidth="1" />)}

      <text x="610" y="232" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">NVLink between tensor-parallel GPUs</text>
      <text x="610" y="246" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Ethernet for request routing only</text>
      <text x="610" y="260" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">SSE streaming — long-lived connections</text>

      <text x="410" y="288" fontFamily="Arial,sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Training needs InfiniBand for gradient sync (latency + bandwidth critical) · Serving needs Ethernet for request routing only</text>
    </svg>
  );
}
