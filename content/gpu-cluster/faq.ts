import type { FaqItem } from "@/lib/schemas";

export const gpuClusterFaq: FaqItem[] = [
  {
    question: "What is the fundamental difference between a GPU cluster and simply 'many GPUs connected together'?",
    answer:
      "A GPU cluster is not just a hardware connection. A production GPU cluster has multiple layers: the compute layer (GPU servers), the high-speed networking layer (InfiniBand or RoCE for inter-node GPU communication), the storage layer (parallel file systems for training data and checkpoints), the management layer (a separate out-of-band network for BMC/IPMI access), the scheduling layer (Slurm or Kubernetes for resource management and fairness), the monitoring layer (DCGM, metrics, alerting), the power infrastructure (UPS, PDUs, generators), and the cooling infrastructure (air or liquid). Simply wiring servers together does not create a reliable, manageable, efficient GPU cluster — every layer needs proper design and integration.",
  },
  {
    question: "What exactly is the difference between NVLink, NVSwitch, InfiniBand, and RoCE?",
    answer:
      "These are frequently confused technologies, so to be clear: NVLink (NVIDIA-specific) — an intra-server GPU-to-GPU high-speed interconnect. A direct, very high bandwidth connection between GPUs inside the same server. Significantly faster than PCIe. NVSwitch (NVIDIA-specific) — a dedicated chip that switches NVLink connections, enabling any-to-any GPU communication at full bandwidth within a single server. InfiniBand — inter-server cluster networking. Purpose-built for HPC/AI, very low latency, native RDMA support. A multi-vendor standard. RoCE (RDMA over Converged Ethernet) — inter-server networking using standard Ethernet infrastructure with RDMA capabilities. Typically less expensive than InfiniBand. All of these can coexist simultaneously at different layers within a single GPU cluster.",
  },
  {
    question: "What is East-West traffic and what impact does it have on GPU cluster network design?",
    answer:
      "East-West traffic = servers communicating directly with each other (peer-to-peer), as opposed to client-server (North-South). During the AllReduce operation in GPU clusters, all GPU servers simultaneously send gradient data to each other — massive horizontal traffic between all nodes. Impact on network design: standard networks optimized for North-South traffic (high oversubscription at the spine) fail for GPU clusters. A fat-tree topology with full bisection bandwidth is required — any server to any other server at full speed with no internal bottleneck. An oversubscribed network leads to an AllReduce bottleneck, which dramatically reduces training throughput even though the GPUs appear active.",
  },
  {
    question: "When do you use data parallelism, tensor parallelism, and pipeline parallelism in distributed training?",
    answer:
      "Data Parallelism: use this when the model fits on a single GPU. The same model copy sits on every GPU, and training data is split across GPUs. Gradients are AllReduced after each step. The simplest approach. Tensor Parallelism: split individual weight matrices across multiple GPUs. Used when the model does not fit on a single GPU because the matrices are very large. Needs very high bandwidth intra-server communication — typically NVLink within the same server, or an equally fast fabric across servers. Pipeline Parallelism: split the model's layers into groups (stages) and run different GPU groups on each stage. Used for very large models. Micro-batching reduces the pipeline bubble. Production LLM training (100B+ parameters) often combines all three at once — called 3D Parallelism — complex, but it enables training the largest models.",
  },
  {
    question: "Why should the management network be kept separate from the compute network in a GPU cluster?",
    answer:
      "There are three key reasons. Security: training traffic (sensitive model weights, proprietary datasets) and management traffic (admin SSH, monitoring) should not be mixed. Reliability: if there is an issue on the compute network, access should still be available via the management network for troubleshooting — if both sit on the same network, a compute issue also takes down management, leaving you troubleshooting blind. Performance: allowing management traffic (monitoring, BMC console) on the compute network can congest the AllReduce network. Practical implementation: each GPU server has a dedicated management NIC (typically 1 GbE), separate switches, and a separate BMC port on the out-of-band management network.",
  },
  {
    question: "Should you target 100% GPU utilization?",
    answer:
      "No. 100% GPU utilization (as measured by nvidia-smi or rocm-smi) is not always achievable, or even optimal. A GPU can show 100% utilization while it is actually memory-bandwidth-bound (waiting for data from HBM), communication-bound (waiting for AllReduce), or data-loading-bound. Better metrics: MFU (Model FLOP Utilization) — actual useful compute as a fraction of theoretical peak FLOPS — for well-optimized large training jobs, 30-50% MFU is typically realistic. Training throughput (tokens/second, samples/second) is also an important metric. Monitor every layer: compute utilization, memory bandwidth utilization, AllReduce bandwidth, storage read throughput — that gives you the full picture.",
  },
  {
    question: "Should you choose Slurm or Kubernetes for a GPU cluster?",
    answer:
      "The two have different strengths. Slurm: HPC heritage, excellent gang scheduling (allocating all nodes of a multi-node job together), mature fair-share policies, simple for batch training workloads. Best for: large distributed training jobs, on-premises HPC-style GPU clusters, batch workloads. Kubernetes: cloud-native, container-first, excellent for autoscaling, microservices patterns, ML inference serving. Best for: inference serving clusters, containerized ML pipelines, cloud GPU deployments. Many production environments run both: Slurm for the training cluster, Kubernetes for inference serving. Hybrid approaches also exist (Kubernetes managing Slurm-like batch workloads via frameworks like Volcano, Kueue).",
  },
  {
    question: "Can you use NFS for storage in a GPU cluster?",
    answer:
      "For small clusters (a few GPU nodes) and for development/testing, NFS is acceptable. For production large-scale training: a single NFS server's bandwidth limit becomes a bottleneck as GPU count scales. Parallel file systems (Lustre, GPFS/IBM Spectrum Scale, WekaIO, VAST Data) are required — distributed across multiple storage servers, with aggregate bandwidth that scales with the GPU cluster. Design principle: benchmark your actual storage throughput requirements from your workload, then provision storage with headroom. Common pattern: production training clusters use Lustre or GPFS. Checkpoint storage: fast NVMe-backed shared storage. Long-term model storage: object storage (S3-compatible).",
  },
  {
    question: "What happens in the cluster when a GPU fails?",
    answer:
      "Health monitoring (DCGM or equivalent) detects the GPU failure or severe degradation. The scheduler automatically marks that node as 'down' or 'drained' — no new jobs are allocated to it. Active training jobs on that node typically fail or time out, and have to resume from a checkpoint on new resources. The on-call engineer is alerted. Investigation: run GPU diagnostic tools, check XID error codes, identify the root cause. Repair/replacement: if it is a GPU hardware fault, do a field replacement (you should maintain a hot spare inventory). Validation: run diagnostic tests before returning the node to service. In large clusters this is a routine event — the systems are designed to handle it automatically.",
  },
  {
    question: "Does a GPU cluster need liquid cooling?",
    answer:
      "It depends on the GPU platform's power density and the rack design. Very high-density configurations (latest-generation GPUs, high GPU count per rack) increasingly benefit from, or require, liquid cooling because air cooling cannot efficiently remove heat at those densities. Lower-density GPU configurations may work fine with well-optimized air cooling. Key principle: always verify GPU server power draw, the facility's cooling capacity for that rack power, and the GPU server manufacturer's cooling guidance. Cooling infrastructure planning must happen before GPU hardware procurement, not after. Retrofitting cooling for existing high-density GPU racks is significantly more expensive and disruptive than planning from the start.",
  },
  {
    question: "Both PCIe and NVLink exist in one server — when is each used?",
    answer:
      "PCIe and NVLink serve different purposes, they are not competitors. PCIe: CPU-to-GPU data transfer. Copying data from system RAM to GPU HBM (host-to-device). Sending results from GPU HBM back to the CPU (device-to-host). Storage controller to GPU (GPUDirect Storage). NIC to GPU (GPUDirect RDMA). PCIe bandwidth is lower (PCIe 5.0 x16 = ~128 GB/s bidirectional) than HBM bandwidth. NVLink (NVIDIA-specific, specific server platforms): direct GPU-to-GPU intra-server communication. Much higher bandwidth than PCIe. Used for inter-GPU AllReduce within the same server, or for large tensor transfers between GPUs within a server. NVLink is only available on specific NVIDIA platforms (DGX/HGX class) — not every GPU server has it.",
  },
  {
    question: "What is NCCL and why is it important in distributed training?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) — the backbone communication library for distributed training on NVIDIA GPUs. It automatically manages GPU communication inside AI frameworks (PyTorch, TensorFlow, JAX) — the developer doesn't have to write network programming directly. It implements AllReduce, AllGather, ReduceScatter, Broadcast, and Reduce operations. It is topology-aware: it automatically detects both NVLink (intra-server) and InfiniBand/RoCE (inter-server) and chooses the optimal algorithm. NCCL initializes when distributed training launches, and is called automatically during the training loop for gradient sync. RCCL is the equivalent for AMD GPU clusters. Without NCCL (or an equivalent), distributed training would be extremely complex to program.",
  },
];
