"use client";
export default function CnnArchitectureDiagram() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cnn-title">
      <title id="cnn-title">CNN Architecture: Input image through convolutional layers, pooling, feature maps to classification</title>
      <rect width="820" height="280" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CNN ARCHITECTURE</text>

      {/* Input image */}
      <rect x="20" y="80" width="70" height="100" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="55" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#1e40af" textAnchor="middle">INPUT</text>
      <text x="55" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">224×224×3</text>

      {/* Conv 1 */}
      <rect x="118" y="65" width="60" height="130" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="148" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">CONV1</text>
      <text x="148" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">64 filters</text>
      <text x="148" y="151" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">3×3, ReLU</text>

      {/* Pool 1 */}
      <rect x="202" y="80" width="50" height="100" rx="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
      <text x="227" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#075985" textAnchor="middle">MAX</text>
      <text x="227" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">POOL</text>
      <text x="227" y="150" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">2×2</text>

      {/* Conv 2 */}
      <rect x="276" y="55" width="60" height="150" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="306" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">CONV2</text>
      <text x="306" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">128 filters</text>
      <text x="306" y="151" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">3×3, ReLU</text>

      {/* Pool 2 */}
      <rect x="360" y="70" width="50" height="120" rx="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
      <text x="385" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#075985" textAnchor="middle">MAX</text>
      <text x="385" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e" textAnchor="middle">POOL</text>

      {/* Conv 3 */}
      <rect x="434" y="45" width="60" height="170" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="464" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#4c1d95" textAnchor="middle">CONV3</text>
      <text x="464" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">256 filters</text>
      <text x="464" y="151" fontFamily="Arial,sans-serif" fontSize="8" fill="#5b21b6" textAnchor="middle">3×3, ReLU</text>

      {/* Global Avg Pool */}
      <rect x="518" y="90" width="60" height="80" rx="6" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />
      <text x="548" y="126" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#134e4a" textAnchor="middle">GAP</text>
      <text x="548" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#134e4a" textAnchor="middle">256×1</text>

      {/* FC Layers */}
      <rect x="602" y="96" width="60" height="68" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="632" y="124" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#14532d" textAnchor="middle">FC</text>
      <text x="632" y="138" fontFamily="Arial,sans-serif" fontSize="8" fill="#166534" textAnchor="middle">Dropout</text>
      <text x="632" y="151" fontFamily="Arial,sans-serif" fontSize="7" fill="#166534" textAnchor="middle">ReLU</text>

      {/* Output */}
      <rect x="686" y="106" width="60" height="48" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="716" y="126" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#713f12" textAnchor="middle">OUTPUT</text>
      <text x="716" y="140" fontFamily="Arial,sans-serif" fontSize="8" fill="#92400e" textAnchor="middle">Softmax</text>

      {/* Prediction */}
      <rect x="756" y="110" width="56" height="40" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
      <text x="784" y="128" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#7c2d12" textAnchor="middle">CLASS</text>
      <text x="784" y="142" fontFamily="Arial,sans-serif" fontSize="8" fill="#9a3412" textAnchor="middle">Prob.</text>

      {/* Arrows */}
      {[[90,130,118],[178,130,202],[252,130,276],[336,130,360],[410,130,434],[494,130,518],[578,130,602],[662,130,686],[746,130,756]].map(([x1,y1,x2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y1} stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ca)" />
      ))}

      {/* Feature map labels */}
      <text x="148" y="210" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Edges</text>
      <text x="306" y="215" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Textures</text>
      <text x="464" y="220" fontFamily="Arial,sans-serif" fontSize="8" fill="#7c3aed" textAnchor="middle">Object parts</text>
      <text x="410" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#475569" textAnchor="middle">Each conv layer learns increasingly abstract visual features — from edges to complete objects</text>

      <defs>
        <marker id="ca" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
