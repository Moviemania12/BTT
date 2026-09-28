import type { FaqItem } from "@/lib/schemas";

export const aiNetworkingFaq: FaqItem[] = [
  {
    question: "What is AI Networking and why is it different from normal enterprise networking?",
    answer:
      "AI Networking is the collection of network technologies, topologies and protocols that enable high-bandwidth, low-latency communication between GPU servers in AI data centers. Normal enterprise networking is mainly designed for North-South traffic (client to server) — email, file sharing, web browsing. In AI training clusters, the traffic pattern is fundamentally different: hundreds or thousands of GPU servers simultaneously exchange gradients with each other (East-West traffic). This communication happens at every training step, and if the network is slow or congested, GPUs wait on the network instead of computing — expensive hardware sits idle. That's why AI networking needs high aggregate bandwidth, low latency, and efficient congestion management that conventional enterprise switching typically doesn't provide.",
  },
  {
    question: "What is RDMA, and is RDMA a synonym for InfiniBand?",
    answer:
      "RDMA (Remote Direct Memory Access) is a communication technology/mechanism where one machine can directly read/write into another machine's memory without involving the other machine's CPU or operating system. This dramatically reduces CPU overhead and improves latency. RDMA is NOT a synonym for InfiniBand. RDMA is a concept/mechanism; InfiniBand is a specific networking fabric/technology that natively supports RDMA. RDMA can also be implemented over Ethernet — specifically through RoCE (RDMA over Converged Ethernet). To summarize: InfiniBand always uses RDMA, but RDMA isn't limited to InfiniBand alone.",
  },
  {
    question: "What is RoCE, and what's the difference between RoCEv1 and RoCEv2?",
    answer:
      "RoCE (RDMA over Converged Ethernet) is a technology that provides RDMA capabilities over standard Ethernet infrastructure. RoCEv1 operates at Layer 2 Ethernet — it is non-routable and can only communicate with devices in the same broadcast domain. RoCEv2 uses UDP/IP encapsulation and is Layer-3 routable — it can work across different subnets and larger, routed networks. RoCEv2 is more widely deployed in practice because it integrates better with modern leaf-spine data center topologies. For both, lossless networking is important — ECN (Explicit Congestion Notification) and PFC (Priority Flow Control) are commonly used for congestion control, but they need to be carefully designed.",
  },
  {
    question: "What is the fundamental difference between NVLink and InfiniBand?",
    answer:
      "NVLink and InfiniBand are completely different technologies with different purposes. NVLink is NVIDIA's proprietary GPU interconnect technology — it directly connects GPUs within a server (intra-node), at extremely high bandwidth. NVLink is not a data center network; it's only available on NVIDIA's supported GPU platforms. InfiniBand is a high-performance data center networking fabric — it connects separate servers (inter-node). A GPU server typically uses both: NVLink to connect its own GPUs internally, and InfiniBand (or RoCE Ethernet) to connect to other servers.",
  },
  {
    question: "What is PFC, and does it make the entire Ethernet network 'lossless'?",
    answer:
      "PFC (Priority Flow Control) is the IEEE 802.1Qbb standard, which provides a per-priority pause mechanism in Ethernet. When a switch port's buffer starts getting almost full, it sends a pause frame to the upstream sender so it temporarily stops sending that specific traffic priority — this avoids packet drops. BUT PFC does not make the entire Ethernet network universally 'lossless'. PFC only works between directly connected ports for one specific priority class. PFC carries serious risks: Head-of-Line Blocking (one stuck flow can pause other flows too), Congestion Propagation (the pause can cascade through the network), and PFC Storms (traffic can end up pausing indefinitely in loops). That's why PFC needs to be used with careful design, proper topology, and complementary ECN.",
  },
  {
    question: "What is ECN, and how is it different from PFC?",
    answer:
      "ECN (Explicit Congestion Notification) is an IP-level mechanism where, instead of dropping a packet, a congested switch sets a congestion marker in the packet header. The receiver sees this marker and sends a CNP (Congestion Notification Packet) to the sender, and the sender reduces its transmission rate. ECN and PFC are both different mechanisms: PFC physically pauses traffic (stop-and-go), while ECN triggers rate reduction (smoother). ECN itself doesn't guarantee against packet loss — it signals congestion so senders can adjust their rate. In an ideal RoCE deployment, both are used together: ECN for rate-based control and PFC as last-resort protection.",
  },
  {
    question: "What is NCCL, and is it a network?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) is a software library — it is NOT a physical network or fabric. NCCL implements GPU-to-GPU collective communication operations (AllReduce, AllGather, ReduceScatter, Broadcast, All-to-All) used in distributed AI training. Frameworks like PyTorch and TensorFlow use NCCL internally. NCCL is topology-aware — it automatically detects whether GPUs are on the same server (it will use NVLink) or on different servers (it will use the network fabric). If there's a network bottleneck, NCCL operations will be slow — so NCCL performance issues are actually often a symptom of network issues.",
  },
  {
    question: "Why do GPUs sit idle during AI training, and what does the network have to do with it?",
    answer:
      "In distributed AI training, after every training step, all GPUs need to sync their gradients — typically through an AllReduce operation. If network bandwidth is insufficient or there is congestion, fast GPUs finish their computation and then wait until the network sync operation completes. This GPU idle time is called 'communication overhead' or informally 'GPU starvation' (though it should be distinguished from storage starvation). Network latency matters too: if every sync operation is slow, this accumulated delay across thousands of training steps can dramatically reduce training throughput. Use GPU idle-time profiling (NVIDIA DCGM, Nsight tools) to identify whether the GPU is actually computing or waiting on the network.",
  },
  {
    question: "Is Ethernet suitable for AI clusters, or does only InfiniBand work?",
    answer:
      "Ethernet is absolutely suitable for AI clusters — it's a common misconception that only InfiniBand works for AI. Large-scale AI training is successfully run using a combination of modern high-speed Ethernet (100/200/400 GbE) and RoCEv2. Several hyperscalers (Meta, Google, Microsoft) primarily use Ethernet-based networking in their large AI clusters. Ethernet's advantages are: a broad ecosystem, lower cost per port, and flexible routing. The challenges are: RoCE configuration for RDMA, PFC/ECN tuning for lossless networking, and congestion management add extra complexity. InfiniBand is preferred for its native RDMA support and traditionally excellent latency, but it isn't mandatory. The choice depends on workload, scale, existing expertise, and budget.",
  },
  {
    question: "What is AllReduce, and why is it critical in AI training?",
    answer:
      "AllReduce is a collective communication operation where all participating nodes contribute their data, a mathematical reduction operation (typically sum or average) is applied, and all nodes receive the result. In AI training, this happens at every step: a model is being trained across N GPU nodes, each node computes gradients on its own data batch, then AllReduce averages the gradients across all GPUs and every node receives the same updated gradient. This ensures all GPU nodes stay synchronized and the model updates consistently. As GPU count increases, the data volume of AllReduce also increases — a 10-billion-parameter model's gradient update can transfer gigabytes of data per step. Network bandwidth and latency directly affect AllReduce efficiency and therefore determine AI training throughput.",
  },
  {
    question: "Why is Leaf-Spine topology preferred for AI clusters?",
    answer:
      "Leaf-Spine (or Clos) topology is preferred for AI clusters because it provides consistent, predictable East-West bandwidth. In this topology: Leaf switches connect directly to GPU servers, Spine switches interconnect the Leaf switches, and every Leaf switch is connected to every Spine switch (multiple paths). Benefits: ECMP (Equal-Cost Multi-Path) distributes traffic across multiple paths, there's no single bottleneck point, the fabric is easy to scale out (you can add both Leaf and Spine switches), and failure domains are well-defined. In traditional hierarchical (Core-Distribution-Access) networking, uplinks are often oversubscribed — which is problematic for AI AllReduce traffic. Leaf-Spine gives you much better control over the oversubscription ratio.",
  },
  {
    question: "Why do MTU and Jumbo Frames matter in AI networking?",
    answer:
      "MTU (Maximum Transmission Unit) defines the maximum packet/frame size. Standard Ethernet MTU is 1500 bytes. Jumbo Frames typically allow frames up to 9000 bytes (9K MTU). A larger MTU can be beneficial for AI/RDMA workloads because: large data transfers can happen in fewer, bigger packets, per-packet overhead (headers, processing) proportionally decreases, and throughput can improve for large sequential transfers. BUT Jumbo Frames are NOT universally mandatory. The critical requirement is that MTU must be consistent end-to-end — if one switch or server is configured at 1500 MTU and another at 9000 MTU, fragmentation or packet drops can occur. MTU mismatch is a common source of mysterious connectivity problems and performance issues in AI clusters.",
  },
];
