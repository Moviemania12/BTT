"use client";
export default function AwsChipsDiagram() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aws-title">
      <title id="aws-title">AWS AI Chips: Trainium (Trn1) is for training AI models — high memory, NeuronLink connects multiple chips. Inferentia (Inf2) is for serving models to users — low latency, INT8 support for cheaper faster inference. Both use the Neuron SDK to compile PyTorch and TensorFlow code.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AWS TRAINIUM + INFERENTIA — Amazon's Custom AI Chips</text>

      {/* Trainium */}
      <rect x="20" y="36" width="370" height="248" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="205" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#7c2d12" textAnchor="middle">AWS Trainium (Trn1)</text>
      <text x="205" y="73" fontFamily="Arial,sans-serif" fontSize="9" fill="#9a3412" textAnchor="middle">"The Model Builder" — Training chip</text>

      <rect x="34" y="84" width="342" height="90" rx="8" fill="#f97316" />
      <text x="205" y="108" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Trainium NeuronCore v2</text>
      <text x="205" y="123" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">Tensor Engine (matrix math) + Vector Engine + GPSIMD</text>
      <text x="205" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#fed7aa" textAnchor="middle">32 GB HBM2e per chip · BFloat16 + FP32 + FP16 + INT8</text>
      <text x="205" y="151" fontFamily="Arial,sans-serif" fontSize="8" fill="#fef3c7" textAnchor="middle">NeuronLink: chip-to-chip interconnect (like ICI for TPU)</text>
      <text x="205" y="165" fontFamily="Arial,sans-serif" fontSize="8" fill="#fef3c7" textAnchor="middle">Trn1.32xl: 16 chips → 512 GB total HBM</text>

      {[
        { label: "Neuron SDK", desc: "Compile PyTorch/TF code for Trainium" },
        { label: "NeuronLink", desc: "High-speed chip-to-chip (like NVLink)" },
        { label: "EC2 Trn1", desc: "AWS instance type — rent by the hour" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="34" y={182 + i * 30} width="342" height="24" rx="5" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
          <text x="42" y={197 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#9a3412">{item.label}:</text>
          <text x="130" y={197 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fill="#7c2d12">{item.desc}</text>
        </g>
      ))}
      <text x="205" y="278" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#f97316" textAnchor="middle">Best for: Large model training at AWS scale</text>

      {/* Inferentia */}
      <rect x="430" y="36" width="370" height="248" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <text x="615" y="58" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e" textAnchor="middle">AWS Inferentia (Inf2)</text>
      <text x="615" y="73" fontFamily="Arial,sans-serif" fontSize="9" fill="#0369a1" textAnchor="middle">"The Model Server" — Inference chip</text>

      <rect x="444" y="84" width="342" height="90" rx="8" fill="#0284c7" />
      <text x="615" y="108" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">Inferentia NeuronCore v2</text>
      <text x="615" y="123" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">Optimized for LOW LATENCY + HIGH THROUGHPUT</text>
      <text x="615" y="137" fontFamily="Arial,sans-serif" fontSize="8" fill="#bae6fd" textAnchor="middle">32 GB HBM2e per chip · INT8 + BF16 + FP16 support</text>
      <text x="615" y="151" fontFamily="Arial,sans-serif" fontSize="8" fill="#e0f2fe" textAnchor="middle">NeuronLink between chips for model sharding</text>
      <text x="615" y="165" fontFamily="Arial,sans-serif" fontSize="8" fill="#e0f2fe" textAnchor="middle">Inf2.48xl: 12 chips → 384 GB for large model serving</text>

      {[
        { label: "Neuron SDK", desc: "Same SDK as Trainium — same code" },
        { label: "INT8 support", desc: "Quantized models = 2× faster, cheaper" },
        { label: "EC2 Inf2", desc: "40–60% cheaper than GPU inference at AWS" },
      ].map((item, i) => (
        <g key={item.label}>
          <rect x="444" y={182 + i * 30} width="342" height="24" rx="5" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
          <text x="452" y={197 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0369a1">{item.label}:</text>
          <text x="540" y={197 + i * 30} fontFamily="Arial,sans-serif" fontSize="8" fill="#0c4a6e">{item.desc}</text>
        </g>
      ))}
      <text x="615" y="278" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#0284c7" textAnchor="middle">Best for: Production inference — lower cost than GPU at scale</text>
    </svg>
  );
}
