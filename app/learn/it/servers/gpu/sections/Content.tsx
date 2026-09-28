"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import CpuVsGpu from "../svg/CpuVsGpu";
import GpuDataFlow from "../svg/GpuDataFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      <div style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#6b21a8", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — GPU in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What a GPU is:</strong> Graphics Processing Unit — originally for graphics, now the backbone of AI/HPC. Thousands of simpler parallel cores vs the CPU's few powerful cores.</li> <li><strong>CPU vs GPU:</strong> CPU = complex sequential tasks. GPU = massive parallel throughput (matrix multiply — the core operation of AI).</li> <li><strong>VRAM:</strong> The GPU's dedicated memory. Model weights, gradients, activations — all live here. Hard capacity constraint for AI workloads.</li> <li><strong>PCIe / SXM:</strong> The GPU connects to the motherboard through a PCIe slot or the SXM form factor. PCIe determines CPU-GPU data transfer bandwidth.</li> <li><strong>Training vs Inference:</strong> Training = learning the weights (high compute, large VRAM). Inference = predictions (latency priority, different requirements).</li> <li><strong>Cooling:</strong> Datacenter GPUs typically use passive cooling — they depend on data center airflow. High-density GPU clusters require air or liquid cooling.</li> <li><strong>100% GPU util:</strong> A good signal, but not the complete efficiency picture — identify the actual bottleneck with profiling tools.</li> </ul>
      </div>

      <h2 id="what-is-gpu" style={S.h2}>What Is a GPU?</h2>
      <p style={S.p}>The GPU (Graphics Processing Unit) was originally designed for real-time computer graphics rendering — calculating pixels in games is an inherently parallel operation (each pixel independently). Researchers repurposed this massive parallelism for scientific and machine learning applications — the GPU became the backbone of general-purpose parallel computing (GPGPU — General Purpose GPU Computing).</p>
      <p style={S.p}>Today in the data center, the GPU is primarily used for AI training, AI inference, scientific simulation (HPC), and data analytics. Graphics is just one such application; general-purpose parallel compute is now the primary use case in enterprise data centers.</p>

      <h2 id="cpu-vs-gpu" style={S.h2}>CPU vs GPU — Design Philosophy</h2>
      <Figure caption="Fig 1 — CPU vs GPU architectural comparison: few powerful cores (CPU) vs thousands of simpler parallel cores (GPU). Core counts illustrative."><CpuVsGpu /></Figure>
      <p style={S.p}><strong>CPU design:</strong> Each core very powerful — complex branch prediction, out-of-order execution, large caches, speculative execution. Excellent for sequential, complex, branchy code. On a server CPU, the OS runs, applications are managed, and complex database queries are parsed.</p>
      <p style={S.p}><strong>GPU design:</strong> Thousands of simpler cores — less sophisticated individually, but massive aggregate parallelism. Execute the same instruction on thousands of data elements simultaneously (SIMT — Single Instruction, Multiple Threads). Matrix multiplication — the foundational operation of AI training — matches this pattern exactly.</p>
      <p style={S.p}><strong>Why GPU wins for AI:</strong> Neural network training involves billions of matrix multiplications. Each multiplication is independent — perfectly parallelizable. The GPU is dramatically faster at these parallel operations, even though each individual core is simpler than a CPU core.</p>

      <h2 id="gpu-architecture" style={S.h2}>GPU Architecture Basics</h2>
      <p style={S.p}><strong>Streaming Multiprocessors (SM) — NVIDIA / Compute Units (CU) — AMD:</strong> The GPU's basic compute block. Each SM contains multiple parallel execution units. A GPU has hundreds of SMs — total core count is SMs × per-SM units. Specific counts vary significantly by GPU model.</p>
      <p style={S.p}><strong>Tensor Cores (NVIDIA) / Matrix Cores (AMD):</strong> Specialized hardware units for matrix multiply-accumulate operations — they dramatically accelerate AI workloads. They support FP16, BF16, INT8, FP8 precision formats depending on generation. Lower precision = faster compute, less VRAM, some accuracy tradeoff (managed via training techniques).</p>
      <p style={S.p}><strong>SIMT execution:</strong> GPU threads execute in groups (warps in NVIDIA, wavefronts in AMD). All threads in a group execute the same instruction simultaneously on different data. Divergent branches (threads taking different paths) reduce efficiency — this is a key constraint of the GPU programming model.</p>

      <h2 id="vram" style={S.h2}>VRAM — GPU Memory</h2>
      <p style={S.p}>VRAM is the GPU's dedicated memory — physically separate from CPU system RAM. The GPU accesses VRAM directly without CPU involvement, which enables much higher memory bandwidth for GPU operations.</p>
      <p style={S.p}><strong>HBM (High Bandwidth Memory):</strong> Stacked memory directly on the GPU package — extremely high bandwidth, lower power than GDDR — in high-end datacenter GPUs. Very high bandwidth is critical to keep the GPU compute units fed.</p>
      <p style={S.p}><strong>GDDR6/GDDR6X:</strong> High-speed graphics memory — in some workstation and datacenter GPUs.</p>
      <p style={S.p}><strong>AI training VRAM requirements:</strong> Model weights + gradients (for the backward pass) + optimizer states (Adam: 2× parameter count additional) + activations = significant VRAM. Large language model training requires multiple GPUs across hundreds or thousands of nodes. A VRAM OOM (Out of Memory) error fails the training — a debugging and mitigation strategy is required.</p>

      <h2 id="pcie-interfaces" style={S.h2}>PCIe and Other Interfaces</h2>
      <p style={S.p}><strong>PCIe x16:</strong> Standard GPU interface — installed in a motherboard PCIe slot. CPU-GPU data transfer is limited by PCIe bandwidth. PCIe bandwidth depends on generation (PCIe 4.0, 5.0 have different per-lane speeds) — verify specific numbers from the generation documentation.</p>
      <p style={S.p}><strong>SXM Form Factor (NVIDIA):</strong> Direct board attachment — significantly higher power delivery and bandwidth than a PCIe slot. For high-end datacenter GPUs. The server must be specifically designed for SXM.</p>
      <p style={S.p}><strong>NVLink (NVIDIA):</strong> GPU-to-GPU direct interconnect — significantly higher bandwidth than PCIe for multi-GPU communication. Specific bandwidth configurations depend on model and generation — verify vendor documentation.</p>
      <p style={S.p}><strong>OAM (OCP Accelerator Module):</strong> Open standard form factor — used by hyperscale operators in purpose-built AI infrastructure.</p>
      <Figure caption="Fig 2 — CPU-GPU data flow: storage → CPU/RAM → PCIe transfer → GPU VRAM → compute → results back to CPU. Bottleneck points annotated."><GpuDataFlow /></Figure>

      <h2 id="training-inference" style={S.h2}>AI Training vs Inference</h2>
      <ComparisonTable
        title="Training vs Inference — GPU Requirements"
        headers={["Aspect","Training","Inference"]}
        rows={[
          ["Goal","Learn model weights from data","Generate predictions using trained model"],
          ["Compute","Very high sustained throughput","Varies — can be latency-sensitive"],
          ["VRAM","Large: weights + gradients + optimizer states + activations","Lower: primarily weights (+ activations for batch)"],
          ["Duration","Hours, days, weeks","Milliseconds to seconds per request"],
          ["Batch size","Large batches for GPU efficiency","Often small or single sample"],
          ["Precision","FP32, BF16, FP16 (mixed)","INT8, INT4 quantisation common"],
          ["Multi-GPU","Often required (model + data parallelism)","Single GPU often sufficient for inference"],
        ]}
        caption="Requirements vary by model size, architecture and deployment. Inference optimisation is a distinct engineering discipline from training."
      />
      <p style={S.p}><strong>Quantisation:</strong> Representing weights in lower precision (INT8, INT4, FP8) for inference — less VRAM, faster compute, minimal accuracy loss with careful implementation. Production inference commonly uses quantised models.</p>

      <h2 id="multi-gpu" style={S.h2}>Multi-GPU and Cluster Networking</h2>
      <p style={S.p}><strong>Data Parallelism:</strong> The same model on all GPUs — different data batches in parallel. Training throughput scales. Each GPU holds a full model copy — the model must fit in VRAM.</p>
      <p style={S.p}><strong>Model Parallelism (Tensor/Pipeline):</strong> The model is split across GPUs — for very large models (LLMs) that do not fit in a single GPU's VRAM. Complex implementation, significant communication overhead.</p>
      <p style={S.p}><strong>Cluster Networking:</strong> High-bandwidth, low-latency networking is critical for multi-node GPU training. InfiniBand (common in HPC/AI clusters) and RoCE (RDMA over Converged Ethernet) technologies are used. Regular Ethernet is typically insufficient for distributed training communication patterns at scale.</p>

      <h2 id="gpu-server-arch" style={S.h2}>GPU Server Architecture</h2>
      <p style={S.p}>A GPU server is specifically designed for AI/HPC compute. Typically: multiple high-end GPUs (2, 4, 8 GPUs per node are common — specific configurations depend on the model), a high-core-count CPU (data preprocessing, orchestration), very large RAM (to hold large datasets in CPU RAM), fast NVMe storage (to load training data fast), a high-bandwidth network (InfiniBand or high-speed Ethernet), high-capacity PSUs (GPU power requirements are significant).</p>
      <p style={S.p}><strong>GPU power:</strong> Data center GPUs consume significant power — the specific TDP depends on the current generation; check vendor specs. Dense GPU rack configurations require special power distribution (higher ampere circuits). Per-rack power density in GPU servers is significantly higher than in general-purpose compute racks.</p>

      <h2 id="cooling" style={S.h2}>Power and Cooling for GPU Infrastructure</h2>
      <p style={S.p}><strong>Air cooling:</strong> Traditional front-to-back airflow, CRAC/CRAH infrastructure. High-TDP GPU servers can be air cooled, but in dense configurations cooling capacity can become a challenge. Designing datacenter GPU cooling on standard server airflow has to be carefully engineered.</p>
      <Callout type="important" title="Not All Data Center GPUs Use Passive Cooling">
        The datacenter GPU cooling approach depends on model and deployment. Some datacenter GPUs use passive heatsinks (dependent on data center airflow). Some server integration configurations may also involve active cooling elements. "All datacenter GPUs are passive cooled" is not a correct generalization — verify OEM specifications.
      </Callout>
      <p style={S.p}><strong>Liquid cooling:</strong> Direct liquid cooling (DLC) is increasingly common in high-density GPU infrastructure. Cold plates mount directly on the GPU packages — liquid circulation removes the heat. It makes it possible to handle much higher heat density than air cooling. Rear-door heat exchangers and immersion cooling are emerging alternatives. Liquid cooling infrastructure requires significant upfront investment and operational expertise.</p>

      <h2 id="datacenter-gpus" style={S.h2}>Data Center GPU vs Consumer GPU</h2>
      <ComparisonTable
        title="Data Center GPU vs Consumer GPU"
        headers={["Aspect","Data Center GPU","Consumer GPU"]}
        rows={[
          ["Cooling","Passive heatsink (typically) — airflow dependent","Active fans — self-cooling"],
          ["ECC Memory","Typically yes — error correction","Often no"],
          ["VRAM","Higher capacity","Limited"],
          ["GPU Interconnect","NVLink/NVSwitch support (NVIDIA)","Not typically"],
          ["Form Factor","PCIe or SXM — server focused","PCIe — consumer card"],
          ["Support","Enterprise support lifecycle","Consumer warranty"],
          ["Use case","Production AI, HPC","Gaming, small-scale development"],
        ]}
        caption="Consumer GPUs can run AI workloads for development and experimentation. Production at scale requires datacenter-grade hardware."
      />

      <h2 id="monitoring" style={S.h2}>GPU Monitoring</h2>
      <p style={S.p}><strong>NVIDIA:</strong> `nvidia-smi` — GPU utilization %, VRAM usage, temperature, power draw, running processes. `nvidia-smi dmon` continuous monitoring. `nvidia-smi nvlink` NVLink bandwidth.</p>
      <p style={S.p}><strong>AMD:</strong> `rocm-smi` — similar GPU health metrics.</p>
      <p style={S.p}><strong>Key metrics:</strong> GPU compute utilization %, VRAM usage (approaching limit = OOM risk), temperature, power draw vs rated, NVLink utilization (multi-GPU).</p>
      <p style={S.p}><strong>Profiling:</strong> NVIDIA Nsight, PyTorch Profiler, TensorFlow Profiler — detailed execution analysis, kernel timing, memory bandwidth utilization.</p>

      <h2 id="troubleshooting" style={S.h2}>Troubleshooting GPU Issues</h2>
      <h3 style={S.h3}>CUDA Out of Memory (OOM)</h3>
      <p style={S.p}>The model + training state exceed VRAM capacity. Fixes: reduce batch size, enable gradient checkpointing (trading compute for memory), use mixed precision (FP16/BF16), consider model quantisation, model parallelism across multiple GPUs.</p>
      <h3 style={S.h3}>GPU Underutilisation</h3>
      <p style={S.p}>Low GPU utilization seen — but cause may be data pipeline (CPU/storage can't feed GPU fast enough), small batch size (GPU idle between batches), synchronisation overhead. Profile first — identify actual bottleneck — don't assume GPU hardware issue.</p>
      <h3 style={S.h3}>High Temperature</h3>
      <p style={S.p}>`nvidia-smi -q -d TEMPERATURE`. Is airflow adequate? (A passive-cooled datacenter GPU depends entirely on server/rack airflow). Is the heatsink properly mounted? Ambient rack temperature? The GPU thermally throttles at temperature limits.</p>
      <h3 style={S.h3}>Driver / CUDA Compatibility Issues</h3>
      <p style={S.p}>Verify the CUDA version, driver version and framework version compatibility matrix (NVIDIA publishes compatibility matrices). Use container images with pinned CUDA versions for reproducibility.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the architectural difference between a CPU and a GPU?</h3>
      <p style={S.p}><strong>Answer:</strong> A CPU is designed with a few powerful cores — complex branch prediction, out-of-order execution, large caches — excellent for general-purpose sequential tasks. A GPU is designed with thousands of simpler cores — for massive parallel throughput. The CPU is for complex application logic and OS management; the GPU is for massively parallel numeric computation (matrix multiply). AI training is efficient on GPUs because neural network operations are inherently parallel matrix operations.</p>
      <h3 style={S.h3}>Q2: What is VRAM and why is it critical in AI training?</h3>
      <p style={S.p}><strong>Answer:</strong> VRAM is the GPU's dedicated memory. In AI training, model weights + gradients (for backpropagation) + optimizer states + activations — all sit in VRAM simultaneously. VRAM capacity is a hard limit — exceed it and you get an Out of Memory error, and training fails. For large language models, VRAM is the primary constraint — that is why model parallelism (splitting the model across GPUs) and techniques like gradient checkpointing were developed.</p>
      <h3 style={S.h3}>Q3: Air cooling vs liquid cooling for GPU infrastructure?</h3>
      <p style={S.p}><strong>Answer:</strong> Air cooling is traditional infrastructure — CRAC/CRAH compatible. In dense high-TDP GPU clusters, air cooling capacity may be insufficient. Liquid cooling (direct liquid cooling, immersion) can handle much higher heat density. The choice depends on GPU TDP, rack density, existing data center cooling infrastructure and investment capacity.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>The GPU is designed with thousands of simpler parallel cores — the CPU with a few powerful cores. The GPU is dramatically better for parallel matrix operations.</li>
        <li>VRAM is the GPU's dedicated memory — a hard capacity constraint for AI training. Model + gradients + optimizer states + activations all sit in VRAM.</li>
        <li>Training (learning weights) vs inference (producing predictions) — different compute, VRAM and latency requirements.</li>
        <li>PCIe bandwidth can be a CPU-GPU data transfer bottleneck — optimise the pipeline to minimize GPU idle time.</li>
        <li>100% GPU utilization does not guarantee efficiency — identify the actual bottleneck with profiling tools.</li>
        <li>Datacenter GPUs typically use passive cooling (verify per model) — data center airflow design is critical.</li>
        <li>High-density GPU clusters require air or liquid cooling infrastructure investments based on heat density.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="cpu" variant="inline" /> — CPU architecture, CPU vs GPU interaction.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server context for GPU deployment.</li>
        <li><TopicLink slug="gpu-cluster" variant="inline" /> — Multi-node GPU cluster networking and infrastructure.</li>
      </ul>
    </>
  );
}
