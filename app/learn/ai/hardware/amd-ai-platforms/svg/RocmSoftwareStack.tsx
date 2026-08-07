"use client";
export default function RocmSoftwareStack() {
  const layers = [
    { label: "Your AI Model / Application", sub: "Training or inference code you write", fill: "#22c55e", text: "#fff", note: "" },
    { label: "AI Application Libraries", sub: "vLLM (LLM serving) · DeepSpeed · Hugging Face Transformers", fill: "#16a34a", text: "#fff", note: "" },
    { label: "Framework Layer (PyTorch / TensorFlow / JAX)", sub: "PyTorch uses torch.cuda API for compatibility while ROCm provides the backend implementation", fill: "#0284c7", text: "#fff", note: "" },
    { label: "Core AI Libraries", sub: "hipBLAS (Matrix Math) · MIOpen (AI Operations) · RCCL (Multi-GPU) · hipFFT (Signal)", fill: "#2563eb", text: "#fff", note: "" },
    { label: "ROCm Driver + Runtime — Hardware Communication Layer", sub: "Translates software commands into GPU instructions · Like an operating system for the GPU", fill: "#4c1d95", text: "#fff", note: "" },
    { label: "AMD GPU Hardware (MI300X Instinct Accelerator)", sub: "The physical chip — 304 Compute Units, 192 GB Ultra-Fast Memory", fill: "#1e293b", text: "#94a3b8", note: "" },
  ];
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rocm-title">
      <title id="rocm-title">ROCm Software Stack from bottom to top: AMD GPU Hardware, ROCm Driver and Runtime, Core AI Libraries (hipBLAS, MIOpen, RCCL), Framework Layer (PyTorch uses torch.cuda API while ROCm provides backend), AI Application Libraries (vLLM, DeepSpeed, Hugging Face), Your Application. Same concept as NVIDIA CUDA stack but open-source.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">ROCm SOFTWARE STACK — AMD's Open-Source Alternative to NVIDIA CUDA</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Data flows bottom to top. Each layer builds on the one below. ROCm is fully open-source — anyone can inspect, modify, or contribute.</text>

      {layers.map((l, i) => (
        <g key={i}>
          <rect x="20" y={44 + (5 - i) * 41} width="780" height="38" rx="6" fill={l.fill} />
          <text x="410" y={59 + (5 - i) * 41} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill={l.text} textAnchor="middle">{l.label}</text>
          <text x="410" y={74 + (5 - i) * 41} fontFamily="Arial,sans-serif" fontSize="7.5" fill={i === 0 ? "#94a3b8" : "rgba(255,255,255,0.8)"} textAnchor="middle">{l.sub}</text>
        </g>
      ))}

      {/* Side comparison */}
      <text x="14" y="82" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#64748b" textAnchor="middle" transform="rotate(-90,14,160)">BOTTOM = HARDWARE · TOP = YOUR APP</text>
    </svg>
  );
}
