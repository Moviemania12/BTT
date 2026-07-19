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
        <p style={{ fontWeight: 700, color: "#6b21a8", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — GPU in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>GPU kya hai:</strong> Graphics Processing Unit — originally graphics ke liye, ab AI/HPC ka backbone. Thousands of simpler parallel cores vs CPU's few powerful cores.</li>
          <li><strong>CPU vs GPU:</strong> CPU = complex sequential tasks. GPU = massive parallel throughput (matrix multiply — AI ka core operation).</li>
          <li><strong>VRAM:</strong> GPU ka dedicated memory. Model weights, gradients, activations — sab yahan. Hard capacity constraint for AI workloads.</li>
          <li><strong>PCIe / SXM:</strong> GPU motherboard se PCIe slot ke through ya SXM form factor se connect. PCIe CPU-GPU data transfer bandwidth determine karta hai.</li>
          <li><strong>Training vs Inference:</strong> Training = weights seekhna (high compute, large VRAM). Inference = predictions (latency priority, different requirements).</li>
          <li><strong>Cooling:</strong> Datacenter GPUs typically passive cooling use karte hain — data center airflow pe depend. High-density GPU clusters air ya liquid cooling require karte hain.</li>
          <li><strong>100% GPU util:</strong> Good signal hai lekin complete efficiency picture nahi — profiling tools se actual bottleneck identify karo.</li>
        </ul>
      </div>

      <h2 id="what-is-gpu" style={S.h2}>What Is a GPU?</h2>
      <p style={S.p}>GPU (Graphics Processing Unit) originally real-time computer graphics rendering ke liye design hua tha — games mein pixels calculate karna inherently parallel operation hai (each pixel independently). Is massive parallelism ko researchers ne scientific aur machine learning applications ke liye repurpose kiya — GPU general-purpose parallel computing ka backbone ban gaya (GPGPU — General Purpose GPU Computing).</p>
      <p style={S.p}>Aaj data center mein GPU primarily AI training, AI inference, scientific simulation (HPC), aur data analytics ke liye use hota hai. Graphics aisi ek application hai; general-purpose parallel compute ab primary use case hai enterprise data centers mein.</p>

      <h2 id="cpu-vs-gpu" style={S.h2}>CPU vs GPU — Design Philosophy</h2>
      <Figure caption="Fig 1 — CPU vs GPU architectural comparison: few powerful cores (CPU) vs thousands of simpler parallel cores (GPU). Core counts illustrative."><CpuVsGpu /></Figure>
      <p style={S.p}><strong>CPU design:</strong> Each core very powerful — complex branch prediction, out-of-order execution, large caches, speculative execution. Excellent for sequential, complex, branchy code. Server CPU pe OS run karta hai, applications manage hoti hain, complex database queries parse hote hain.</p>
      <p style={S.p}><strong>GPU design:</strong> Thousands of simpler cores — less sophisticated individually, but massive aggregate parallelism. Same instruction execute karo thousands of data elements pe simultaneously (SIMT — Single Instruction, Multiple Threads). Matrix multiplication — AI training ka foundational operation — is pattern exactly match karta hai.</p>
      <p style={S.p}><strong>Why GPU wins for AI:</strong> Neural network training mein billions of matrix multiplications hote hain. Each multiplication independent hai — perfectly parallelizable. GPU in parallel operations pe dramatically faster hai, even though each individual core CPU core se simpler hai.</p>

      <h2 id="gpu-architecture" style={S.h2}>GPU Architecture Basics</h2>
      <p style={S.p}><strong>Streaming Multiprocessors (SM) — NVIDIA / Compute Units (CU) — AMD:</strong> GPU ka basic compute block. Har SM multiple parallel execution units contain karta hai. GPU mein hundreds of SMs hote hain — total core count SMs × per-SM units. Specific counts GPU model pe significantly vary karte hain.</p>
      <p style={S.p}><strong>Tensor Cores (NVIDIA) / Matrix Cores (AMD):</strong> Specialized hardware units matrix multiply-accumulate operations ke liye — AI workloads dramatically accelerate karte hain. FP16, BF16, INT8, FP8 precision formats support karte hain depending on generation. Lower precision = faster compute, less VRAM, some accuracy tradeoff (managed via training techniques).</p>
      <p style={S.p}><strong>SIMT execution:</strong> GPU threads groups mein execute hote hain (warps in NVIDIA, wavefronts in AMD). Group ke sab threads same instruction execute karte hain simultaneously on different data. Divergent branches (threads alag paths lete hain) efficiency reduce karta hai — yeh GPU programming model ka key constraint hai.</p>

      <h2 id="vram" style={S.h2}>VRAM — GPU Memory</h2>
      <p style={S.p}>VRAM GPU ka dedicated memory hai — CPU system RAM se physically separate. GPU VRAM directly access karta hai without CPU involvement, which enables much higher memory bandwidth for GPU operations.</p>
      <p style={S.p}><strong>HBM (High Bandwidth Memory):</strong> Stacked memory directly on GPU package — extremely high bandwidth, lower power than GDDR — high-end datacenter GPUs mein. Very high bandwidth critical hai GPU compute units ko fed karne ke liye.</p>
      <p style={S.p}><strong>GDDR6/GDDR6X:</strong> High-speed graphics memory — some workstation aur datacenter GPUs mein.</p>
      <p style={S.p}><strong>AI training VRAM requirements:</strong> Model weights + gradients (backward pass ke liye) + optimizer states (Adam: 2× parameter count additional) + activations = significant VRAM. Large language model training multiple GPUs across hundreds ya thousands of nodes require karta hai. VRAM ka OOM (Out of Memory) error training fail karta hai — debugging aur mitigation strategy required.</p>

      <h2 id="pcie-interfaces" style={S.h2}>PCIe and Other Interfaces</h2>
      <p style={S.p}><strong>PCIe x16:</strong> Standard GPU interface — motherboard PCIe slot mein install. CPU-GPU data transfer PCIe bandwidth pe limited. PCIe bandwidth generation pe depend karta hai (PCIe 4.0, 5.0 different per-lane speeds) — specific numbers generation documentation se verify karo.</p>
      <p style={S.p}><strong>SXM Form Factor (NVIDIA):</strong> Direct board attachment — significantly higher power delivery aur bandwidth than PCIe slot. High-end datacenter GPUs ke liye. Server specifically SXM ke liye designed hona chahiye.</p>
      <p style={S.p}><strong>NVLink (NVIDIA):</strong> GPU-to-GPU direct interconnect — PCIe se significantly higher bandwidth multi-GPU communication ke liye. Specific bandwidth configurations model aur generation pe depend karte hain — vendor documentation verify karo.</p>
      <p style={S.p}><strong>OAM (OCP Accelerator Module):</strong> Open standard form factor — hyperscale operators purpose-built AI infrastructure mein use karte hain.</p>
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
      <p style={S.p}><strong>Quantisation:</strong> Inference ke liye weights ko lower precision (INT8, INT4, FP8) mein represent karna — less VRAM, faster compute, minimal accuracy loss with careful implementation. Production inference commonly quantised models use karta hai.</p>

      <h2 id="multi-gpu" style={S.h2}>Multi-GPU and Cluster Networking</h2>
      <p style={S.p}><strong>Data Parallelism:</strong> Same model sab GPUs pe — different data batches parallel mein. Training throughput scale hoti hai. Each GPU full model copy rakhta hai — model VRAM mein fit hona chahiye.</p>
      <p style={S.p}><strong>Model Parallelism (Tensor/Pipeline):</strong> Model GPUs ke beech split — very large models (LLMs) ke liye jo single GPU VRAM mein fit nahi hote. Complex implementation, communication overhead significant.</p>
      <p style={S.p}><strong>Cluster Networking:</strong> Multi-node GPU training ke liye high-bandwidth, low-latency networking critical hai. InfiniBand (common in HPC/AI clusters), RoCE (RDMA over Converged Ethernet) technologies use hoti hain. Regular Ethernet typically insufficient for distributed training communication patterns at scale.</p>

      <h2 id="gpu-server-arch" style={S.h2}>GPU Server Architecture</h2>
      <p style={S.p}>GPU server specifically AI/HPC compute ke liye designed hota hai. Typically: multiple high-end GPUs (2, 4, 8 GPUs per node common — specific configurations model pe depend karte hain), high-core-count CPU (data preprocessing, orchestration), very large RAM (large datasets CPU RAM mein hold karne ke liye), fast NVMe storage (training data fast load karne ke liye), high-bandwidth network (InfiniBand ya high-speed Ethernet), high-capacity PSUs (GPU power requirements significant hain).</p>
      <p style={S.p}><strong>GPU power:</strong> Data center GPUs significant power consume karte hain — specific TDP current generation pe depend karta hai, vendor specs check karo. Dense GPU rack configurations special power distribution (higher ampere circuits) require karte hain. Per-rack power density GPU servers mein general-purpose compute racks se significantly higher hoti hai.</p>

      <h2 id="cooling" style={S.h2}>Power and Cooling for GPU Infrastructure</h2>
      <p style={S.p}><strong>Air cooling:</strong> Traditional front-to-back airflow, CRAC/CRAH infrastructure. High-TDP GPU servers air cooled ho sakte hain lekin dense configurations mein cooling capacity challenge ban sakti hai. Standard server airflow pe datacenter GPU cooling design karna carefully engineer karna padta hai.</p>
      <Callout type="important" title="Not All Data Center GPUs Use Passive Cooling">
        Datacenter GPU cooling approach model aur deployment pe depend karta hai. Kuch datacenter GPUs passive heatsinks use karte hain (data center airflow dependent). Kuch server integration configurations ke liye active cooling elements bhi involve ho sakte hain. "All datacenter GPUs passive cooled" correct generalization nahi hai — OEM specifications verify karo.
      </Callout>
      <p style={S.p}><strong>Liquid cooling:</strong> High-density GPU infrastructure mein direct liquid cooling (DLC) increasingly common hai. Cold plates directly GPU packages pe mount hote hain — liquid circulation heat remove karti hai. Air cooling se much higher heat density handle karna possible hota hai. Rear-door heat exchangers, immersion cooling emerging alternatives hain. Liquid cooling infrastructure significant upfront investment aur operational expertise require karta hai.</p>

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
      <p style={S.p}>Model + training state VRAM capacity exceed karta hai. Fixes: batch size reduce karo, gradient checkpointing enable karo (trading compute for memory), mixed precision (FP16/BF16) use karo, model quantisation consider karo, model parallelism across multiple GPUs.</p>
      <h3 style={S.h3}>GPU Underutilisation</h3>
      <p style={S.p}>Low GPU utilization seen — but cause may be data pipeline (CPU/storage can't feed GPU fast enough), small batch size (GPU idle between batches), synchronisation overhead. Profile first — identify actual bottleneck — don't assume GPU hardware issue.</p>
      <h3 style={S.h3}>High Temperature</h3>
      <p style={S.p}>`nvidia-smi -q -d TEMPERATURE`. Airflow adequate? (Passive-cooled datacenter GPU depends entirely on server/rack airflow). Heatsink properly mounted? Ambient rack temperature? GPU thermal throttle karta hai temperature limits pe.</p>
      <h3 style={S.h3}>Driver / CUDA Compatibility Issues</h3>
      <p style={S.p}>CUDA version, driver version, framework version compatibility matrix verify karo (NVIDIA publishes compatibility matrices). Container images with pinned CUDA versions use karo for reproducibility.</p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: CPU aur GPU mein architectural difference kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> CPU few powerful cores design karta hai — complex branch prediction, out-of-order execution, large caches — general purpose sequential tasks ke liye excellent. GPU thousands of simpler cores design karta hai — massive parallel throughput ke liye. CPU complex application logic, OS management ke liye; GPU massively parallel numeric computation (matrix multiply) ke liye. AI training GPU pe efficient hai kyunki neural network operations inherently parallel matrix operations hain.</p>
      <h3 style={S.h3}>Q2: VRAM kya hai aur AI training mein kyun critical hai?</h3>
      <p style={S.p}><strong>Answer:</strong> VRAM GPU ka dedicated memory hai. AI training mein model weights + gradients (backpropagation ke liye) + optimizer states + activations — sab VRAM mein simultaneously hote hain. VRAM capacity hard limit hai — exceed karo toh Out of Memory error, training fail. Large language models ke liye VRAM primary constraint hai — isliye model parallelism (model GPUs mein split karna) aur techniques like gradient checkpointing develop hue.</p>
      <h3 style={S.h3}>Q3: Air cooling vs liquid cooling GPU infrastructure ke liye?</h3>
      <p style={S.p}><strong>Answer:</strong> Air cooling traditional infrastructure — CRAC/CRAH compatible. High-TDP GPU dense clusters mein air cooling capacity insufficient ho sakti hai. Liquid cooling (direct liquid cooling, immersion) much higher heat density handle kar sakta hai. Choice GPU TDP, rack density, existing data center cooling infrastructure aur investment capacity pe depend karta hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>GPU thousands of simpler parallel cores design karta hai — CPU few powerful cores. Parallel matrix operations ke liye GPU dramatically better hai.</li>
        <li>VRAM GPU ka dedicated memory — AI training ke liye hard capacity constraint. Model + gradients + optimizer states + activations sab VRAM mein hote hain.</li>
        <li>Training (weights learn karna) vs inference (predictions nikalna) — different compute, VRAM aur latency requirements.</li>
        <li>PCIe bandwidth CPU-GPU data transfer bottleneck ho sakta hai — pipeline optimise karo GPU idle time minimize karne ke liye.</li>
        <li>100% GPU utilization efficiency guarantee nahi karta — profiling tools se actual bottleneck identify karo.</li>
        <li>Datacenter GPUs typically passive cooling use karte hain (verify per model) — data center airflow design critical.</li>
        <li>High-density GPU clusters air ya liquid cooling infrastructure investments require karte hain based on heat density.</li>
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
        <li><TopicLink slug="gpu-cluster" variant="inline" /> — Multi-node GPU cluster networking aur infrastructure.</li>
      </ul>
    </>
  );
}
