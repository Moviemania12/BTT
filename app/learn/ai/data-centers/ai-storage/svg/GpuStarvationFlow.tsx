"use client";
export default function GpuStarvationFlow() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gsf-title">
      <title id="gsf-title">GPU Starvation and Storage Bottleneck Troubleshooting Flow: When GPU utilization is low during a training job, check if GPU is waiting for data. If yes, profile data loader — check data loader worker count, local NVMe cache hit ratio, storage network bandwidth utilization, parallel file system throughput, and metadata server performance. Each layer can be the bottleneck. Fix the identified bottleneck layer.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU STARVATION — STORAGE BOTTLENECK TROUBLESHOOTING</text>

      {/* Start */}
      <rect x="310" y="30" width="200" height="32" rx="16" fill="#0f172a" />
      <text x="410" y="51" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">GPU utilization LOW during training job</text>
      <line x1="410" y1="62" x2="410" y2="80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#gsf-ar)" />

      {/* Is GPU waiting for data? */}
      <rect x="280" y="80" width="260" height="30" rx="5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="410" y="99" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#713f12" textAnchor="middle">Is GPU idle/waiting between batches? (profile)</text>

      {/* No branch */}
      <line x1="280" y1="95" x2="80" y2="95" stroke="#16a34a" strokeWidth="1.5" />
      <text x="185" y="89" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#16a34a" textAnchor="middle">NO</text>
      <rect x="20" y="80" width="60" height="30" rx="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="50" y="95" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#14532d" textAnchor="middle">Compute</text>
      <text x="50" y="105" fontFamily="Arial,sans-serif" fontSize="7" fill="#14532d" textAnchor="middle">bottleneck</text>

      {/* Yes branch - check data loader */}
      <line x1="410" y1="110" x2="410" y2="128" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#gsf-ar-r)" />
      <text x="422" y="122" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#dc2626">YES</text>

      <rect x="260" y="128" width="300" height="30" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="147" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Check: Data Loader Workers / CPU preprocessing</text>
      <line x1="410" y1="158" x2="410" y2="175" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#gsf-ar)" />

      <rect x="260" y="175" width="300" height="30" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="194" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Check: Local NVMe cache (hit ratio, saturation)</text>
      <line x1="410" y1="205" x2="410" y2="222" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#gsf-ar)" />

      <rect x="260" y="222" width="300" height="30" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="241" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#1e40af" textAnchor="middle">Check: Storage network bandwidth (saturation?)</text>

      {/* Right side checks */}
      <line x1="560" y1="143" x2="640" y2="143" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="640" y="128" width="160" height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="720" y="142" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">↑ worker count</text>
      <text x="720" y="153" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">prefetch dataset locally</text>

      <line x1="560" y1="190" x2="640" y2="190" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="640" y="175" width="160" height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="720" y="189" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">warm cache, increase</text>
      <text x="720" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">NVMe capacity/speed</text>

      <line x1="560" y1="237" x2="640" y2="237" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="640" y="222" width="160" height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="720" y="236" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">upgrade network or</text>
      <text x="720" y="247" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">add storage nodes</text>

      <text x="410" y="268" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#64748b" textAnchor="middle">Fix the first bottleneck layer found — profiling tools: PyTorch Profiler, DCGM, storage system I/O metrics</text>

      <defs>
        <marker id="gsf-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" /></marker>
        <marker id="gsf-ar-r" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#dc2626" /></marker>
      </defs>
    </svg>
  );
}
