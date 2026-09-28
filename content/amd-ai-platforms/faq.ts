import type { FaqItem } from "@/lib/schemas";

export const amdAiFaq: FaqItem[] = [
  {
    question: "How easy is it to run PyTorch code on an AMD GPU — does everything just work?",
    answer:
      "Standard PyTorch operations (linear layers, attention, convolutions, normalization) — mostly yes, everything works. PyTorch uses the torch.cuda API for compatibility while ROCm provides the backend implementation. model.cuda() works — ROCm handles it. torch.cuda.is_available() returns True on AMD. Challenging areas: custom CUDA extensions (.cu files in a package) — these won't run, HIP conversion is needed. Some PyTorch operations that internally use CUDA-specific intrinsics — rare but possible issues. Very new optimizations (the latest FlashAttention version) — lag is possible on AMD. Practical recommendation: fine-tuning a standard Hugging Face model — straightforward on ROCm. Novel architecture research code with custom kernels — test carefully first.",
  },
  {
    question: "Does MI300X's 192 GB memory make it the highest in the industry — is there any competitor?",
    answer:
      "As of 2024: MI300X was the highest single-accelerator HBM capacity widely available. NVIDIA's H200 (141 GB HBM3e) came close but was still less. Cerebras' WSE-3 has 44 GB of on-chip SRAM (a different memory type, a different use case). Future chips from NVIDIA (B200: 192 GB) and AMD (MI350 — verify at amd.com/instinct for current specifications before procurement) will change this picture. The memory capacity race is ongoing.",
  },
  {
    question: "ROCm is open-source, so does that mean there's no cost for enterprises?",
    answer:
      "ROCm itself is open-source — no license fee. You still need to buy the hardware (the MI300X accelerator), through an AMD server partner or in the cloud. Support contract: AMD enterprise support is available for purchase. Driver/software is free; hardware plus optional support is the cost. Compare to NVIDIA: CUDA is free, hardware is expensive, and some enterprise software (AI Enterprise) is subscription-based.",
  },
  {
    question: "Why doesn't AMD have something like NVSwitch?",
    answer:
      "NVSwitch is a dedicated switch chip that connects multiple NVIDIA GPUs at full, any-to-any NVLink bandwidth. AMD doesn't currently have comparable technology. Infinity Fabric is AMD's internal chip interconnect. xGMI (external Global Memory Interface) provides a GPU-to-GPU link but doesn't create an NVSwitch-like any-to-any switching fabric. AMD clusters rely on InfiniBand or RoCE Ethernet for inter-GPU communication. This is AMD's current gap for large-scale distributed training. AMD's roadmap may address this, but it isn't available currently.",
  },
  {
    question: "What's the difference between CDNA and RDNA — when should you use which?",
    answer:
      "CDNA (Compute DNA): data center AI/HPC accelerators. MI100, MI200, MI300 series. No display output, no gaming features, no ray tracing. Maximum compute density, FP64 performance, HBM memory. For: AI training, inference, scientific computing. RDNA (Radeon DNA): consumer and professional graphics. RX 7000 series (gaming), Radeon Pro (professional visualization). Display output, real-time rendering, optimized for DirectX/Vulkan. Infinity Cache (large on-chip cache for gaming bandwidth). For: gaming, creative workloads, rendering, visualization. Never use RDNA in a data center for AI — wrong architecture, no HBM, not optimized for AI math, no ECC.",
  },
  {
    question: "Why was AMD chosen over NVIDIA for the Frontier supercomputer?",
    answer:
      "For Frontier (Oak Ridge National Laboratory, 2022 — the world's first exascale system), MI250X was chosen because: FP64 performance: scientific simulations require double-precision (FP64) math. MI250X: 47.9 TFLOPS FP64 with dedicated FP64 Matrix Cores. AMD's offering at that procurement time was competitive. EPYC CPU integration: AMD EPYC CPU + MI250X accelerator, same vendor, tight integration, optimized communication. Open-source software: the US DOE's preference for open software — ROCm open-source vs CUDA proprietary. Procurement timeline: procurement for Frontier was in the 2019–2021 period. Price negotiation: AMD's competitive pricing at national-lab scale. Note: this doesn't mean AMD is better than NVIDIA for AI in general — FP64 HPC is a specific use case.",
  },
  {
    question: "What's the most common problem when installing ROCm?",
    answer:
      "Kernel version mismatch: the most common issue. ROCm supports specific Linux kernel versions. If your kernel version doesn't match — the amdgpu driver won't load. Solution: check the supported OS and kernel versions in ROCm documentation, install the correct kernel. User group permissions: AMD GPU access requires the render and video groups. usermod -a -G render,video $USER + logout/login. A common miss. Package conflicts: multiple ROCm installations or conflicting AMD packages. Clean install: purge existing ROCm packages, fresh install from AMD's AMDGPU installer script. Missing firmware: some systems need AMD GPU firmware files. Install the amdgpu-firmware package.",
  },
  {
    question: "What's the actual impact of MI300X's 192 GB memory advantage on real LLM serving?",
    answer:
      "When it matters significantly: Model size 80-192 GB (FP16): Models in this range — 70B LLaMA at FP16 = 140 GB. Fits MI300X single card, needs 2x H100. Single-card inference: lower latency (no inter-card communication), simpler serving infrastructure. Long context inference: KV cache grows with sequence length. 128K context 70B model: KV cache alone can be tens of GB. More base memory = more room for KV cache = longer contexts possible. Batch size: More memory available = larger batch sizes = better GPU utilization = higher throughput. When it doesn't matter: Models under 80 GB (FP16): Fit on both H100 and MI300X. Quantized models: INT4 quantized 70B = ~35 GB. Fits on both easily. Training large clusters: Memory advantage per card less important when you have 100s or 1000s of cards. Practical recommendation: MI300X memory advantage most valuable for inference of unquantized 70B class models, or very long context serving.",
  },
  {
    question: "Why does AMD use chiplet architecture in its AI chips?",
    answer:
      "A chiplet is a small specialized chip that performs one specific function. In MI300X: 8 XCD (compute) chiplets + 1 AID (controller) die + 4 HBM3 stacks in one package. Advantages: yield improvement — defect density is lower on small dies; discard a defective XCD, the rest keep working. Heterogeneous integration — compute dies on an aggressive node, the IO die on a cheaper node, HBM 3D stacked. Scalability — want more compute: add more XCD chiplets. Memory capacity breakthrough — 192 GB HBM3 was hard to achieve with a monolithic approach. Challenges: NUMA-like effects — die-boundary-crossing latency. Programming complexity — careful workload placement needed. Industry trend: NVIDIA also went dual-die with Blackwell. AMD's earlier bet on this architecture gives it an advantage.",
  },
  {
    question: "What's the step-by-step process for migrating CUDA code to ROCm?",
    answer:
      "Step 1: Codebase audit. Find all .cu files, CUDA_VISIBLE_DEVICES, cudaMalloc/cudaMemcpy/cudaStream, library imports, compiler directives. Step 2: Automated hipify. hipify-perl --inplace source_file.cu — converts most standard CUDA syntax. Review diff carefully. Step 3: Fix remaining issues. warpSize hardcodes (AMD wavefront = 64, not 32). __syncwarp() equivalents in HIP. Custom PTX — no equivalent in HIP, must rewrite in HIP C++. Step 4: Compile and test. hipcc --offload-arch=gfx90a (MI300X) source.cpp. Fix compilation errors. Run correctness tests. Step 5: Performance validation. Profile with rocProfiler. Identify slow kernels. When migration NOT worth it: Heavy PTX/SASS usage. CUDA-specific hardware features. Critical path on niche cuDNN functions. Timeline pressure. Team expertise gap.",
  },
  {
    question: "What's the biggest technical challenge in migrating CUDA code to AMD ROCm?",
    answer:
      "The biggest challenge is custom CUDA kernels and CUDA-specific optimizations. Standard PyTorch operations mostly work on ROCm because PyTorch uses the torch.cuda API for compatibility while ROCm provides the backend implementation. But: custom .cu files that use CUDA-specific intrinsics — need to be hipified. Warp-level primitives (__shfl_sync, __ballot_sync) — AMD equivalents exist but wavefront width = 64 vs NVIDIA warp = 32, so behavior differs. FlashAttention and cutting-edge kernels — an AMD port is available but is typically weeks behind CUDA releases. TensorRT equivalent — AMD doesn't yet have a comparable production inference optimizer. Library-depth gap — cuDNN's decades of hand-tuned kernels vs MIOpen's automated tuning.",
  },
  {
    question: "Which cloud providers offer AMD Instinct servers?",
    answer:
      "Microsoft Azure: ND MI300X v5 instances — 8x MI300X per node, InfiniBand networking. Currently best AMD AI cloud option for enterprise. Oracle OCI: BM.GPU.MI300X.8 — 8 MI300X per bare metal node. Other providers: Growing availability. On-premises: HPE (Cray EX234a), Dell, Supermicro — various OEMs support AMD Instinct OAM format servers. Direct purchase: Available through AMD partner network for large enterprise. Unlike NVIDIA (widespread availability), AMD cloud instances available on select providers — check current availability before planning.",
  },
];
