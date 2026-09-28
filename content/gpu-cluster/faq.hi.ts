import type { FaqItem } from "@/lib/schemas";

export const gpuClusterFaq: FaqItem[] = [
  {
    question: "GPU Cluster aur simple 'many GPUs connected together' mein kya fundamental difference hai?",
    answer:
      "GPU Cluster sirf hardware connection nahi hai. Ek production GPU cluster mein multiple layers hoti hain: Compute layer (GPU servers), high-speed networking layer (InfiniBand ya RoCE for inter-node GPU communication), storage layer (parallel file systems for training data and checkpoints), management layer (separate out-of-band network for BMC/IPMI access), scheduling layer (Slurm ya Kubernetes for resource management aur fairness), monitoring layer (DCGM, metrics, alerting), power infrastructure (UPS, PDUs, generators), aur cooling infrastructure (air ya liquid). Simply servers wire karne se reliable, manageable, efficient GPU cluster nahi banta — har layer ka proper design aur integration required hai.",
  },
  {
    question: "NVLink, NVSwitch, InfiniBand, aur RoCE mein exactly kya difference hai?",
    answer:
      "Yeh frequently confused technologies hain, clearly: NVLink (NVIDIA specific) — intra-server GPU-to-GPU high-speed interconnect. Same server ke andar GPUs ke beech direct, very high bandwidth connection. PCIe se significantly faster. NVSwitch (NVIDIA specific) — dedicated chip jo NVLink connections ko switch karta hai, ek hi server ke andar any-to-any GPU communication at full bandwidth enable karta hai. InfiniBand — inter-server cluster networking. Purpose-built for HPC/AI, very low latency, native RDMA support. Multi-vendor standard. RoCE (RDMA over Converged Ethernet) — inter-server networking using standard Ethernet infrastructure with RDMA capabilities. Less expensive than InfiniBand typically. Ek single GPU cluster mein sab simultaneously ho sakte hain different layers pe.",
  },
  {
    question: "East-West traffic kya hai aur GPU cluster network design pe kya impact hai?",
    answer:
      "East-West traffic = servers ka ek dusre se directly communicate karna (peer-to-peer), as opposed to client-server (North-South). GPU clusters mein AllReduce operation ke dauran sab GPU servers simultaneously gradient data ek dusre ko bhejte hain — massive horizontal traffic between all nodes. Network design impact: Standard networks jo North-South traffic ke liye optimize hoti hain (high oversubscription at spine) fail karte hain GPU clusters ke liye. Fat-tree topology with full bisection bandwidth required hai — any server to any other server at full speed without internal bottleneck. Oversubscribed network leads to AllReduce bottleneck which dramatically reduces training throughput despite GPUs being active.",
  },
  {
    question: "Distributed training mein data parallelism, tensor parallelism, aur pipeline parallelism kab use karte hain?",
    answer:
      "Data Parallelism: Model ek GPU pe fit ho jaaye toh use karo. Same model copy har GPU pe, training data different GPUs pe split. AllReduce gradients after each step. Simplest approach. Tensor Parallelism: Individual weight matrices across multiple GPUs split karo. Model ek GPU pe fit na ho kyunki matrices very large hain. Very high bandwidth intra-server communication needed — typically same server pe NVLink, ya inter-server with very fast fabric. Pipeline Parallelism: Model ke layers ko groups (stages) mein split karo, different GPU groups pe run karo. Very large models ke liye. Micro-batching se pipeline bubble reduce karo. Production LLM training (100B+ parameters) often combines all three simultaneously — called 3D Parallelism — complex but enables training largest models.",
  },
  {
    question: "GPU cluster mein management network alag kyun rakhni chahiye compute network se?",
    answer:
      "Teen key reasons hain. Security: Training traffic (sensitive model weights, proprietary datasets) aur management traffic (admin SSH, monitoring) mixed nahi hone chahiye. Reliability: Compute network pe issue ho toh management network se access available rehna chahiye troubleshooting ke liye — dono ek hi network pe hone se compute issue = management bhi down = blind troubleshooting. Performance: Management traffic (monitoring, BMC console) ko compute network pe allow karo to AllReduce network congested ho sakti hai. Practical implementation: Har GPU server mein dedicated management NIC (typically 1 GbE), separate switches, separate BMC port on out-of-band management network.",
  },
  {
    question: "GPU utilization 100% target karna chahiye kya?",
    answer:
      "No. 100% GPU utilization (nvidia-smi ya rocm-smi se measured) hamesha achievable ya even optimal nahi hoti. GPU 100% utilization show kar sakta hai jabki woh actually memory-bandwidth-bound (waiting for data from HBM), communication-bound (waiting for AllReduce), ya data-loading-bound ho. Better metrics: MFU (Model FLOP Utilization) — actual useful compute as fraction of theoretical peak FLOPS — well-optimized large training jobs mein typically 30-50% MFU realistic hai. Training throughput (tokens/second, samples/second) bhi important metric hai. Har layer monitor karo: compute utilization, memory bandwidth utilization, AllReduce bandwidth, storage read throughput — full picture milta hai.",
  },
  {
    question: "Slurm aur Kubernetes mein kaunsa choose karein GPU cluster ke liye?",
    answer:
      "Dono ke strengths alag hain. Slurm: HPC heritage, excellent gang scheduling (multi-node jobs ke sab nodes ek saath allocate karo), mature fair-share policies, simple for batch training workloads. Best for: Large distributed training jobs, on-premises HPC-style GPU clusters, batch workloads. Kubernetes: Cloud-native, container-first, excellent for autoscaling, microservices patterns, ML inference serving. Best for: Inference serving clusters, containerized ML pipelines, cloud GPU deployments. Many production environments run both: Slurm for training cluster, Kubernetes for inference serving. Hybrid approaches also exist (Kubernetes managing Slurm-like batch workloads via frameworks like Volcano, Kueue).",
  },
  {
    question: "GPU cluster mein storage ke liye NFS use kar sakte hain kya?",
    answer:
      "Small clusters (few GPU nodes) aur development/testing ke liye NFS acceptable hai. Production large-scale training ke liye: Single NFS server bandwidth limit = bottleneck as GPU count scales. Parallel file systems (Lustre, GPFS/IBM Spectrum Scale, WekaIO, VAST Data) required hote hain — multiple storage servers pe distributed, aggregate bandwidth scales with GPU cluster. Design principle: Benchmark actual storage throughput requirements from your workload, then provision storage with headroom. Common pattern: Production training clusters use Lustre ya GPFS. Checkpoint storage: Fast NVMe-backed shared storage. Long-term model storage: Object storage (S3-compatible).",
  },
  {
    question: "GPU failure hone pe cluster mein kya hota hai?",
    answer:
      "Health monitoring (DCGM ya equivalent) GPU failure ya severe degradation detect karta hai. Scheduler automatically us node ko 'down' ya 'drained' mark karta hai — no new jobs allocated to it. Us node pe active training jobs: typically fail ya timeout hoti hain, checkpoint se resume karna padta hai new resources pe. On-call engineer alert hota hai. Investigation: GPU diagnostic tools run karo, XID error codes check karo, root cause identify karo. Repair/replacement: Agar GPU hardware fault → field replacement (hot spare inventory maintain karna chahiye). Validation: Before returning node to service, diagnostic tests run karo. Large clusters mein yeh routine event hai — systems designed to handle it automatically.",
  },
  {
    question: "GPU cluster liquid cooling ki zaroorat hai kya?",
    answer:
      "Depends on GPU platform power density aur rack design. Very high-density configurations (latest generation GPUs, high GPU count per rack) increasingly benefit from ya require liquid cooling because air cooling cannot efficiently remove heat at those densities. Lower-density GPU configurations may work fine with well-optimized air cooling. Key principle: Always verify GPU server power draw, facility cooling capacity for that rack power, aur GPU server manufacturer's cooling guidance. Cooling infrastructure planning must happen before GPU hardware procurement, not after. Retrofitting cooling for existing high-density GPU racks is significantly more expensive and disruptive than planning from the start.",
  },
  {
    question: "PCIe aur NVLink dono ek server mein hote hain — kab kaunsa use hota hai?",
    answer:
      "PCIe aur NVLink alag purposes ke liye use hote hain, not competitors. PCIe: CPU-to-GPU data transfer. System RAM se GPU HBM mein data copy (host-to-device). GPU HBM se results wapas CPU (device-to-host). Storage controller to GPU (GPUDirect Storage). NIC to GPU (GPUDirect RDMA). PCIe bandwidth lower hai (PCIe 5.0 x16 = ~128 GB/s bidirectional) vs HBM bandwidth. NVLink (NVIDIA specific, specific server platforms): GPU-to-GPU direct intra-server communication. Much higher bandwidth than PCIe. Used for inter-GPU AllReduce within same server, or large tensor transfers between GPUs within server. NVLink sirf specific NVIDIA platforms (DGX/HGX class) mein available hai — all GPU servers mein nahi hota.",
  },
  {
    question: "NCCL kya hai aur distributed training mein kyun important hai?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) — NVIDIA GPU ke distributed training ka backbone communication library. AI frameworks (PyTorch, TensorFlow, JAX) ke andar automatically GPU communication manage karta hai — developer ko directly network programming nahi karni padti. AllReduce, AllGather, ReduceScatter, Broadcast, Reduce operations implement karta hai. Topology-aware hai: NVLink (intra-server) aur InfiniBand/RoCE (inter-server) dono ko automatically detect aur optimal algorithm choose karta hai. Distributed training launch karte time NCCL initialize hota hai, training loop mein gradient sync ke liye automatically called hota hai. RCCL AMD GPU clusters ke liye equivalent hai. Without NCCL (ya equivalent), distributed training extremely complex programming hogi.",
  },
];
