"use client";
export default function GpuDataFlow() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GPU data flow from storage through CPU RAM then PCIe transfer to GPU VRAM for compute then results back to CPU RAM">
      <rect width="820" height="300" fill="#fff"/>
      <text x="410" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">CPU ↔ GPU Data Flow and Bottleneck Points</text>
      {/* Storage */}
      <rect x="10" y="60" width="120" height="70" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
      <text x="70" y="88" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#374151">Storage</text>
      <text x="70" y="104" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">NVMe/SAS</text>
      <text x="70" y="118" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#64748b">Training data</text>
      {/* CPU RAM */}
      <rect x="180" y="60" width="140" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="250" y="88" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af">CPU + RAM</text>
      <text x="250" y="104" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Data preprocessing</text>
      <text x="250" y="118" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Batch preparation</text>
      {/* PCIe */}
      <rect x="370" y="76" width="100" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="420" y="96" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#78350f">PCIe Bus</text>
      <text x="420" y="109" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#78350f">⚠️ Bottleneck</text>
      {/* GPU VRAM */}
      <rect x="520" y="60" width="140" height="70" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2"/>
      <text x="590" y="88" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#6b21a8">GPU + VRAM</text>
      <text x="590" y="104" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Matrix compute</text>
      <text x="590" y="118" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Training / Inference</text>
      {/* Result */}
      <rect x="710" y="60" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
      <text x="760" y="88" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#166534">Result</text>
      <text x="760" y="104" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">Back to CPU</text>
      <text x="760" y="118" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">RAM/storage</text>
      {/* Arrows */}
      <line x1="130" y1="95" x2="178" y2="95" stroke="#2563eb" strokeWidth="2" markerEnd="url(#gArr)"/>
      <line x1="320" y1="95" x2="368" y2="95" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#gArrO)"/>
      <line x1="470" y1="95" x2="518" y2="95" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#gArrP)"/>
      <line x1="660" y1="95" x2="708" y2="95" stroke="#16a34a" strokeWidth="2" markerEnd="url(#gArrG)"/>
      {/* Bottleneck annotations */}
      <rect x="10" y="160" width="800" height="120" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="410" y="180" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e">⚠️ Common Bottleneck Points</text>
      {[
        ["Data Loading","CPU/Storage can't feed GPU fast enough → GPU idle waiting for data. Optimise: async data loading, faster storage, data in CPU RAM"],
        ["PCIe Transfer","CPU RAM → GPU VRAM transfer via PCIe. Generation and lane count affect bandwidth. NVLink (where available) provides GPU-to-GPU higher bandwidth"],
        ["VRAM Full","Model + activations + gradients exceed VRAM → OOM error. Fix: reduce batch size, gradient checkpointing, quantisation, model parallelism"],
        ["GPU Underutilised","Low GPU util ≠ efficient. Could mean data bottleneck, small batch, or synchronisation overhead. Profile with vendor tools to identify true cause"],
      ].map(([t,d],i)=>(
        <g key={i}>
          <text x="20" y={196+i*24} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#78350f">{t}:</text>
          <text x="140" y={196+i*24} fontFamily="Arial,sans-serif" fontSize="9" fill="#374151">{d}</text>
        </g>
      ))}
      <defs>
        <marker id="gArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="#2563eb"/></marker>
        <marker id="gArrO" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="#f59e0b"/></marker>
        <marker id="gArrP" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="#7c3aed"/></marker>
        <marker id="gArrG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0,6 3,0 6" fill="#16a34a"/></marker>
      </defs>
    </svg>
  );
}
