import type { FaqItem } from "@/lib/schemas";

export const amdAiFaq: FaqItem[] = [
  {
    question: "AMD GPU pe PyTorch code chalana kitna easy hai — kya sab kuch simply kaam karta hai?",
    answer:
      "Standard PyTorch operations (linear layers, attention, convolutions, normalization) — mostly yes, sab kaam karta hai. PyTorch torch.cuda API use karta hai compatibility ke liye jabki ROCm backend implementation provide karta hai. model.cuda() works — ROCm handle karta hai. torch.cuda.is_available() True return karta hai AMD pe. Challenging areas: Custom CUDA extensions (.cu files in a package) — ye nahi chalenge, HIP conversion needed. Some PyTorch operations jo CUDA-specific intrinsics use karte hain internally — rare but possible issues. Very new optimizations (FlashAttention latest version) — lag possible on AMD. Practical recommendation: Standard Hugging Face model fine-tune karna — ROCm pe straight-forward. Novel architecture research code with custom kernels — test carefully first.",
  },
  {
    question: "MI300X ki 192 GB memory industry mein sabse zyada hai kya — koi competitor hai?",
    answer:
      "As of 2024: MI300X was the highest single-accelerator HBM capacity widely available. NVIDIA H200 (141 GB HBM3e) close tha lekin still less. Cerebras WSE-3 mein 44 GB on-chip SRAM hai (different memory type, different use case). Future chips from NVIDIA (B200: 192 GB) aur AMD (MI350 — verify at amd.com/instinct for current specifications before procurement) will change this picture. Memory capacity race is ongoing.",
  },
  {
    question: "ROCm open-source hai toh kya enterprise koi charge nahi ata?",
    answer:
      "ROCm itself open-source — no license fee. Hardware (MI300X accelerator) khareedna padta hai. AMD server partner se ya cloud pe. Support contract: AMD enterprise support available for purchase. Driver/software free, hardware + optional support = cost. Compare to NVIDIA: CUDA free, hardware expensive, some enterprise software (AI Enterprise) subscription-based.",
  },
  {
    question: "AMD ke paas NVSwitch jaisi technology kyun nahi hai?",
    answer:
      "NVSwitch ek dedicated switch chip hai jo multiple NVIDIA GPUs ko all-to-any full NVLink bandwidth pe connect karta hai. AMD ke paas abhi comparable technology nahi hai. Infinity Fabric AMD ka internal chip interconnect hai. xGMI (external Global Memory Interface) GPU-to-GPU link provide karta hai lekin NVSwitch jaisi any-to-any switching fabric nahi banata. AMD clusters rely karte hain InfiniBand ya RoCE Ethernet for inter-GPU communication. This is AMD's current gap for large-scale distributed training. AMD roadmap mein this may be addressed but not available currently.",
  },
  {
    question: "CDNA aur RDNA mein kya difference hai — kab kaunsa use karein?",
    answer:
      "CDNA (Compute DNA): Data center AI/HPC accelerators. MI100, MI200, MI300 series. No display output, no gaming features, no ray tracing. Maximum compute density, FP64 performance, HBM memory. For: AI training, inference, scientific computing. RDNA (Radeon DNA): Consumer aur professional graphics. RX 7000 series (gaming), Radeon Pro (professional visualization). Display output, real-time rendering, DirectX/Vulkan optimized. Infinity Cache (large on-chip cache for gaming bandwidth). For: Gaming, creative workloads, rendering, visualization. Never use RDNA in data center AI — wrong architecture, no HBM, not optimized for AI math, no ECC.",
  },
  {
    question: "Frontier supercomputer mein AMD kyun choose kiya gaya NVIDIA ke upar?",
    answer:
      "Frontier (Oak Ridge National Laboratory, 2022 — world's first exascale system) mein AMD MI250X choose kiya because: FP64 performance: Scientific simulations require double-precision (FP64) math. MI250X: 47.9 TFLOPS FP64 with dedicated FP64 Matrix Cores. AMD's offering at that procurement time was competitive. EPYC CPU integration: AMD EPYC CPU + MI250X accelerator same vendor, tight integration, optimized communication. Open-source software: US DOE preference for open software — ROCm open-source vs CUDA proprietary. Procurement timeline: Frontier ke liye procurement 2019-2021 period mein tha. Price negotiation: AMD competitive pricing for national lab scale. Note: This does not mean AMD better than NVIDIA for AI in general — FP64 HPC is a specific use case.",
  },
  {
    question: "ROCm install karte waqt sabse common problem kya hai?",
    answer:
      "Kernel version mismatch: Most common. ROCm specific Linux kernel versions support karta hai. Agar aapka kernel version mismatch hai — amdgpu driver load nahi hoga. Solution: ROCm documentation mein supported OS aur kernel versions check karo, correct kernel install karo. User group permissions: AMD GPU access require karta hai render aur video groups. usermod -a -G render,video $USER + logout/login. Common miss. Package conflicts: Multiple ROCm installations ya conflicting AMD packages. Clean install: purge existing ROCm packages, fresh install from AMD's AMDGPU installer script. Missing firmware: Some systems AMD GPU firmware files chahiye. amdgpu-firmware package install karo.",
  },
  {
    question: "MI300X ke 192 GB memory advantage ka actual LLM serving pe kya impact hai?",
    answer:
      "When it matters significantly: Model size 80-192 GB (FP16): Models in this range — 70B LLaMA at FP16 = 140 GB. Fits MI300X single card, needs 2x H100. Single-card inference: lower latency (no inter-card communication), simpler serving infrastructure. Long context inference: KV cache grows with sequence length. 128K context 70B model: KV cache alone can be tens of GB. More base memory = more room for KV cache = longer contexts possible. Batch size: More memory available = larger batch sizes = better GPU utilization = higher throughput. When it doesn't matter: Models under 80 GB (FP16): Fit on both H100 and MI300X. Quantized models: INT4 quantized 70B = ~35 GB. Fits on both easily. Training large clusters: Memory advantage per card less important when you have 100s or 1000s of cards. Practical recommendation: MI300X memory advantage most valuable for inference of unquantized 70B class models, or very long context serving.",
  },
  {
    question: "Chiplet architecture AMD ke AI chips mein kyun hai?",
    answer:
      "Chiplet ek chhota specialized chip hai jo ek specific function karta hai. MI300X mein: 8 XCD (compute) chiplets + 1 AID (controller) die + 4 HBM3 stacks ek package mein. Advantages: Yield improvement — small dies pe defect density kam; ek defective XCD hatao, baaki chalte rahein. Heterogeneous integration — compute dies aggressive node pe, IO die cheaper node pe, HBM 3D stacked. Scalability — want more compute: more XCD chiplets add karo. Memory capacity breakthrough — 192 GB HBM3 monolithic approach se mushkil tha. Challenges: NUMA-like effects — die boundary crossing latency. Programming complexity — careful workload placement needed. Industry trend: NVIDIA bhi Blackwell mein dual-die gaya. AMD ka earlier bet is architecture mein advantage deta hai.",
  },
  {
    question: "CUDA code ROCm pe migrate karne ka step-by-step process kya hai?",
    answer:
      "Step 1: Codebase audit. Find all .cu files, CUDA_VISIBLE_DEVICES, cudaMalloc/cudaMemcpy/cudaStream, library imports, compiler directives. Step 2: Automated hipify. hipify-perl --inplace source_file.cu — converts most standard CUDA syntax. Review diff carefully. Step 3: Fix remaining issues. warpSize hardcodes (AMD wavefront = 64, not 32). __syncwarp() equivalents in HIP. Custom PTX — no equivalent in HIP, must rewrite in HIP C++. Step 4: Compile and test. hipcc --offload-arch=gfx90a (MI300X) source.cpp. Fix compilation errors. Run correctness tests. Step 5: Performance validation. Profile with rocProfiler. Identify slow kernels. When migration NOT worth it: Heavy PTX/SASS usage. CUDA-specific hardware features. Critical path on niche cuDNN functions. Timeline pressure. Team expertise gap.",
  },
  {
    question: "AMD ROCm pe CUDA code migrate karne mein sabse bada technical challenge kya hai?",
    answer:
      "Sabse bada challenge hai custom CUDA kernels aur CUDA-specific optimizations. Standard PyTorch operations ROCm pe mostly kaam karti hain kyunki PyTorch torch.cuda API use karta hai compatibility ke liye jabki ROCm backend implementation provide karta hai. Lekin: Custom .cu files jo CUDA-specific intrinsics use karte hain — hipify karna padega. Warp-level primitives (__shfl_sync, __ballot_sync) — AMD equivalents exist but wavefront width = 64 vs NVIDIA warp = 32, behavior different. FlashAttention aur cutting-edge kernels — AMD port available but typically weeks behind CUDA releases. TensorRT equivalent — AMD ke paas comparable production inference optimizer nahi hai yet. Library depth gap — cuDNN decades of hand-tuned kernels vs MIOpen automated tuning.",
  },
  {
    question: "AMD Instinct servers kis cloud provider pe available hain?",
    answer:
      "Microsoft Azure: ND MI300X v5 instances — 8x MI300X per node, InfiniBand networking. Currently best AMD AI cloud option for enterprise. Oracle OCI: BM.GPU.MI300X.8 — 8 MI300X per bare metal node. Other providers: Growing availability. On-premises: HPE (Cray EX234a), Dell, Supermicro — various OEMs support AMD Instinct OAM format servers. Direct purchase: Available through AMD partner network for large enterprise. Unlike NVIDIA (widespread availability), AMD cloud instances available on select providers — check current availability before planning.",
  },
];
