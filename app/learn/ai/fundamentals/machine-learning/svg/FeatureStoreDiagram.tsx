"use client";
export default function FeatureStoreDiagram() {
  return (
    <svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fs-title">
      <title id="fs-title">Feature Store Architecture: Online store for serving, offline store for training, feature consistency</title>
      <rect width="820" height="340" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">FEATURE STORE ARCHITECTURE</text>

      {/* Data Sources */}
      <rect x="20" y="40" width="130" height="240" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="85" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#334155" textAnchor="middle">DATA SOURCES</text>
      {["Transactions DB", "Event streams", "User profiles", "External APIs", "Log files", "Sensor data"].map((s, i) => (
        <g key={i}>
          <rect x="30" y={72 + i * 34} width="110" height="26" rx="4" fill="#e2e8f0" />
          <text x="85" y={88 + i * 34} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151" textAnchor="middle">{s}</text>
        </g>
      ))}

      {/* Feature Engineering */}
      <rect x="190" y="80" width="150" height="100" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="265" y="100" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">FEATURE</text>
      <text x="265" y="114" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#4c1d95" textAnchor="middle">ENGINEERING</text>
      <text x="265" y="132" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Spark / Flink / dbt</text>
      <text x="265" y="145" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Batch + streaming</text>
      <text x="265" y="158" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Transformation logic</text>
      <text x="265" y="171" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">Versioned features</text>

      {/* Online Feature Store */}
      <rect x="400" y="40" width="180" height="120" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="490" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#14532d" textAnchor="middle">ONLINE STORE</text>
      <text x="490" y="78" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Redis / DynamoDB</text>
      <text x="490" y="91" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Low latency: &lt;5ms reads</text>
      <text x="490" y="104" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Real-time inference</text>
      <text x="490" y="117" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Feature freshness: seconds</text>
      <text x="490" y="130" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Hot features only</text>
      <text x="490" y="148" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">↑ Inference Server reads here</text>

      {/* Offline Feature Store */}
      <rect x="400" y="190" width="180" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="490" y="212" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">OFFLINE STORE</text>
      <text x="490" y="228" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">BigQuery / Hive / S3</text>
      <text x="490" y="241" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">High throughput batch reads</text>
      <text x="490" y="254" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Training dataset export</text>
      <text x="490" y="267" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Historical backfill</text>
      <text x="490" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Petabyte scale</text>
      <text x="490" y="298" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">↑ Training cluster reads here</text>

      {/* Consumers */}
      <rect x="640" y="40" width="160" height="80" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="720" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#7c2d12" textAnchor="middle">INFERENCE SERVER</text>
      <text x="720" y="76" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Reads online features</text>
      <text x="720" y="89" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Real-time predictions</text>
      <text x="720" y="102" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Same transform logic ✓</text>

      <rect x="640" y="190" width="160" height="80" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
      <text x="720" y="210" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#831843" textAnchor="middle">TRAINING CLUSTER</text>
      <text x="720" y="226" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Reads offline features</text>
      <text x="720" y="239" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Batch export for training</text>
      <text x="720" y="252" fontFamily="Arial,sans-serif" fontSize="8" fill="#9d174d" textAnchor="middle">Same transform logic ✓</text>

      {/* Consistency arrow */}
      <rect x="640" y="285" width="160" height="40" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="720" y="301" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">CONSISTENCY</text>
      <text x="720" y="318" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">No training-serving skew</text>

      {/* Arrows */}
      <line x1="150" y1="160" x2="188" y2="140" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a4)" />
      <line x1="340" y1="100" x2="398" y2="80" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a4)" />
      <line x1="340" y1="140" x2="398" y2="240" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a4)" />
      <line x1="580" y1="80" x2="638" y2="80" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a4)" />
      <line x1="580" y1="240" x2="638" y2="230" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#a4)" />

      <defs>
        <marker id="a4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
