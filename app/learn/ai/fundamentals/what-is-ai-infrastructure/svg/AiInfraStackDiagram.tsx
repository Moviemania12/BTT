"use client";
export default function AiInfraStackDiagram() {
  return (
    <svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ais-title">
      <title id="ais-title">AI Infrastructure — Complete Stack: Hardware, Networking, Storage, Software</title>
      <rect width="820" height="420" fill="#ffffff" />
      <text x="410" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">AI INFRASTRUCTURE — COMPLETE STACK</text>

      {/* Layer 1: Applications */}
      <rect x="30" y="44" width="760" height="46" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="62" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#92400e" textAnchor="middle">APPLICATION LAYER</text>
      <text x="410" y="79" fontFamily="Arial,sans-serif" fontSize="9" fill="#78350f" textAnchor="middle">ChatGPT · Copilot · Gemini · Claude · Stable Diffusion · Custom Enterprise AI</text>

      {/* Layer 2: MLOps */}
      <rect x="30" y="100" width="760" height="46" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="410" y="118" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#831843" textAnchor="middle">MLOps / SERVING LAYER</text>
      <text x="410" y="135" fontFamily="Arial,sans-serif" fontSize="9" fill="#9d174d" textAnchor="middle">Triton · vLLM · TorchServe · Weights&amp;Biases · MLflow · Kubeflow · Ray</text>

      {/* Layer 3: Orchestration */}
      <rect x="30" y="156" width="760" height="46" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="174" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">ORCHESTRATION LAYER</text>
      <text x="410" y="191" fontFamily="Arial,sans-serif" fontSize="9" fill="#5b21b6" textAnchor="middle">Kubernetes + GPU Operator · Slurm · PyTorch DDP · DeepSpeed · Megatron-LM · NCCL</text>

      {/* Layer 4: Compute */}
      <rect x="30" y="212" width="760" height="56" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="410" y="232" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e40af" textAnchor="middle">COMPUTE LAYER — GPU CLUSTERS</text>
      <text x="90" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">NVIDIA H100/B200</text>
      <text x="230" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">AMD MI300X</text>
      <text x="360" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">Google TPU v5</text>
      <text x="490" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">AWS Trainium</text>
      <text x="620" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">Intel Gaudi 3</text>
      <text x="730" y="252" fontFamily="Arial,sans-serif" fontSize="9" fill="#1d4ed8" textAnchor="middle">Custom ASICs</text>
      <text x="410" y="263" fontFamily="Arial,sans-serif" fontSize="9" fill="#3730a3" textAnchor="middle">NVLink / NVSwitch · PCIe 5.0 · CXL · HBM3e</text>

      {/* Layer 5: Networking */}
      <rect x="30" y="278" width="370" height="50" rx="8" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="215" y="297" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#064e3b" textAnchor="middle">NETWORKING FABRIC</text>
      <text x="215" y="314" fontFamily="Arial,sans-serif" fontSize="9" fill="#065f46" textAnchor="middle">InfiniBand NDR 400G · RoCE · RDMA</text>
      <text x="215" y="323" fontFamily="Arial,sans-serif" fontSize="9" fill="#065f46" textAnchor="middle">Non-blocking Fat-Tree · DPU / BlueField</text>

      {/* Layer 5: Storage */}
      <rect x="420" y="278" width="370" height="50" rx="8" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
      <text x="605" y="297" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#7c2d12" textAnchor="middle">PARALLEL STORAGE</text>
      <text x="605" y="314" fontFamily="Arial,sans-serif" fontSize="9" fill="#9a3412" textAnchor="middle">Lustre · Weka · VAST Data · GPFS · DDN</text>
      <text x="605" y="323" fontFamily="Arial,sans-serif" fontSize="9" fill="#9a3412" textAnchor="middle">NVMe SSD Burst Buffer · S3 Object Store</text>

      {/* Layer 6: Physical */}
      <rect x="30" y="338" width="760" height="66" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="410" y="358" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#1e293b" textAnchor="middle">PHYSICAL INFRASTRUCTURE</text>
      <text x="130" y="375" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">⚡ Power</text>
      <text x="130" y="388" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">40-100+ kW/rack</text>
      <text x="260" y="375" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">❄️ Liquid Cooling</text>
      <text x="260" y="388" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">DLC / Immersion</text>
      <text x="410" y="375" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">🏢 AI Data Center</text>
      <text x="410" y="388" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Purpose-built facility</text>
      <text x="560" y="375" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">🔥 Fire / BMS / DCIM</text>
      <text x="560" y="388" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Monitoring &amp; control</text>
      <text x="700" y="375" fontFamily="Arial,sans-serif" fontSize="9" fill="#334155" textAnchor="middle">🔒 Security</text>
      <text x="700" y="388" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Physical &amp; network</text>

      {/* Stack arrows */}
      <line x1="410" y1="90" x2="410" y2="100" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="410" y1="146" x2="410" y2="156" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="410" y1="202" x2="410" y2="212" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="410" y1="268" x2="410" y2="278" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />
      <line x1="410" y1="328" x2="410" y2="338" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow)" />

      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}
