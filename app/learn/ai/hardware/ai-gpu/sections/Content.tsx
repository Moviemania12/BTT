"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { aiGpuContent } from "@/content/ai-gpu";

import CpuVsGpuDiagram from "../svg/CpuVsGpuDiagram";
import GpuArchitectureDiagram from "../svg/GpuArchitectureDiagram";
import StreamingMultiprocessorDiagram from "../svg/StreamingMultiprocessorDiagram";
import TensorCoreDiagram from "../svg/TensorCoreDiagram";
import HbmMemoryDiagram from "../svg/HbmMemoryDiagram";
import NvlinkDiagram from "../svg/NvlinkDiagram";
import MigDiagram from "../svg/MigDiagram";
import DgxServerDiagram from "../svg/DgxServerDiagram";
import GpuClusterDiagram from "../svg/GpuClusterDiagram";
import AiFactoryDiagram from "../svg/AiFactoryDiagram";

void aiGpuContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Jab koi AI model run hota hai — chahe woh ChatGPT ho, image generation ho, ya aapke company ka customer service bot — uske peeche ek GPU kaam kar raha hota hai. GPU (Graphics Processing Unit) originally video games ke liye banaya gaya tha. Lekin ek discovery ne sab kuch badal diya: GPU jo kaam graphics ke liye karta tha — thousands of small calculations simultaneously — wahi kaam AI ke liye bhi perfect tha.
        </p>
        <p style={S.p}>
          Aaj ke AI GPUs — NVIDIA H100, B200, AMD MI300X — inhe specifically design kiya gaya hai taaki massive neural networks train ho sakein, billions of parameters memory mein fit ho sakein, aur millions of users simultaneously serve ho sakein. Yeh "just a chip" nahi hai — yeh AI infrastructure ka heart hai.
        </p>
        <Callout type="important" title="Is Article Ka Goal">
          Is article ke baad aapko pata hoga: GPU andar se kaise kaam karta hai, kyun AI ke liye CPU se better hai, aur ek production AI factory kaise banti hai — GPU chip se lekar multi-megawatt data center tak.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>DC Engineers aur Facility Engineers:</strong> Janiye kyon GPU servers itni power consume karte hain, liquid cooling kyun mandatory hai, aur ek GPU rack ka weight, heat, aur power draw kya hota hai.</li>
          <li><strong>IT Infrastructure Engineers:</strong> GPU cluster planning, server selection (DGX vs HGX), networking requirements, aur storage design.</li>
          <li><strong>AI/MLOps Engineers:</strong> GPU internals samajhna — Tensor Cores, HBM, NVLink, CUDA — taaki training aur inference optimize ho sake.</li>
          <li><strong>Students aur Freshers:</strong> CPU aur GPU ka difference, GPU computing ka history, aur AI mein GPUs ka role — bilkul beginner-friendly explanation.</li>
          <li><strong>Project Managers aur Architects:</strong> GPU procurement planning, cost modeling, aur enterprise deployment decisions ke liye foundation.</li>
          <li><strong>Cloud Engineers:</strong> GPU instance types samajhna — A100, H100, L4, T4 — aur kab kaunsa use karna chahiye.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>CPU aur GPU mein fundamental difference — aur kyun GPU ne AI ko possible banaya</li>
          <li>GPU ka internal architecture — CUDA Cores, Tensor Cores, Streaming Multiprocessors, Warps</li>
          <li>HBM kya hai aur yeh regular RAM se itna alag kyun hai</li>
          <li>NVLink, NVSwitch, PCIe — GPU communication ka complete picture</li>
          <li>DGX aur HGX servers — enterprise AI compute ke building blocks</li>
          <li>MIG (Multi-Instance GPU) — ek GPU ko multiple isolated instances mein split karna</li>
          <li>GPU clusters aur AI factories — largest AI infrastructure</li>
          <li>Cooling, power, monitoring, aur failure handling</li>
          <li>AMD GPUs aur ROCm — NVIDIA alternative ka practical assessment</li>
          <li>Cost planning aur future GPU roadmap</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ─────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="llm" variant="inline" /> — LLM training aur inference workloads jo GPUs pe run karte hain</li>
          <li><strong>Current:</strong> AI GPU — the hardware that runs every AI workload</li>
          <li><strong>Next:</strong> <TopicLink slug="gpu-cluster" variant="inline" /> — how multiple GPUs connect into training clusters</li>
          <li><strong>Related:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="ai-cooling" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ──────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          Sochiye ek highway hai.
        </p>
        <p style={S.p}>
          Ek CPU ek luxury highway hai — 8 ya 16 lanes, har lane mein ek highly skilled driver hai jo complicated decisions le sakta hai. Yeh driver traffic lights samajhta hai, routes plan karta hai, emergency mein U-turn le sakta hai. Bohot capable hai. Lekin sirf 8-16 cars ek time pe ja sakti hain.
        </p>
        <p style={S.p}>
          GPU ek completely alag cheez hai — imagine karo ek 10,000-lane road jahan har driver sirf ek simple task karta hai: seedha jaao, speed maintain karo. Har ek driver complicated nahi hai. Lekin 10,000 log simultaneously moving hain.
        </p>
        <p style={S.p}>
          AI ka kaam mostly simple hai lekin massive scale pe hota hai — multiply this number, add that number, activate this neuron, pass this value forward. Yeh kaam ek genius CPU driver nahi chahiye — yeh kaam 10,000 simple workers chahiye jo sab simultaneously kaam karein. Yeh GPU hai.
        </p>
        <p style={S.p}>
          2012 mein, Alex Krizhevsky ne ImageNet competition mein ek deep neural network train kiya — do NVIDIA GTX 580 GPUs pe. Result ne sab ko shock diya: previous best methods se 10% better accuracy. Yeh "AlexNet moment" tha — jo proof kiya ki GPU + deep learning = AI revolution possible hai. Uss din se aaj tak, GPU hi AI infrastructure ka foundation hai.
        </p>
      </section>

      {/* ─── HISTORY ───────────────────────────────────────────────────── */}
      <section id="history">
        <h2 style={S.h2}>History of GPU Computing</h2>
        <ul style={S.ul}>
          <li><strong>1990s — Gaming Era:</strong> GPUs originally 3D games ke liye banaye gaye. Silicon Graphics, 3dfx, phir NVIDIA aur AMD ne specialized chips banaye jo millions of pixels quickly color kar sakein — parallel computation naturally.</li>
          <li><strong>1999 — NVIDIA GeForce 256:</strong> NVIDIA ne pehli baar "GPU" term use kiya. Pehla chip jo geometry calculations on-chip kar sakta tha.</li>
          <li><strong>2006 — CUDA Launch:</strong> Game changer. Pehli baar, developers GPU pe general-purpose programs likh sakte the. Scientists, researchers ne GPU ko supercomputer ki tarah use karna shuru kiya.</li>
          <li><strong>2012 — AlexNet:</strong> Do GPUs. Ek result jo world ne change kar diya. Deep learning + GPU = AI revolution confirmed.</li>
          <li><strong>2016 — NVIDIA Pascal (P100):</strong> Pehla GPU specifically AI ke liye designed. FP16 support — neural networks ke liye 2× faster vs FP32.</li>
          <li><strong>2017 — Volta (V100) aur Tensor Cores:</strong> Specialized hardware for matrix multiplication — AI ka most common operation. AI performance dramatically improved.</li>
          <li><strong>2020 — Ampere (A100):</strong> 80GB HBM2e, third-gen Tensor Cores, MIG support. Modern enterprise AI GPU benchmark bana.</li>
          <li><strong>2022 — Hopper (H100):</strong> Current production standard. FP8 via Transformer Engine, 80GB HBM3, NVLink 4.0. LLM training ke liye designed.</li>
          <li><strong>2024-25 — Blackwell (B100/B200/GB200):</strong> Next generation. Higher compute, 192GB HBM3e, NVLink 5.0, GB200 NVL72 rack-scale solution.</li>
        </ul>
      </section>

      {/* ─── CPU VS GPU ────────────────────────────────────────────────── */}
      <section id="cpu-vs-gpu">
        <h2 style={S.h2}>CPU vs GPU — The Fundamental Difference</h2>
        <p style={S.p}>
          Socho ek math exam hai. 1000 addition problems solve karne hain.
        </p>
        <p style={S.p}>
          <strong>CPU approach:</strong> Ek bohot intelligent student hai. Woh ek problem solve karta hai — carefully check karta hai — phir agla problem. Agar problem complex hai, yeh student samjhega. Lekin ek waqt mein ek hi kaam.
        </p>
        <p style={S.p}>
          <strong>GPU approach:</strong> 1000 average students hain. Har student exactly ek problem leta hai. Sab simultaneously kaam karte hain. Complex problems unke liye nahi — lekin simple problems — unbeatable.
        </p>
        <Figure caption="CPU has 8–16 powerful cores for complex sequential tasks. GPU has thousands of simple cores for parallel AI math. Same operation on millions of numbers — GPU wins every time.">
          <CpuVsGpuDiagram />
        </Figure>
        <ComparisonTable
          title="CPU vs GPU — Key Differences"
          headers={["Property", "Intel Xeon (CPU)", "NVIDIA H100 (GPU)"]}
          rows={[
            ["Core Count", "60 (high-end server)", "16,896 CUDA Cores"],
            ["Core Design", "Complex, out-of-order, branch prediction", "Simple, lightweight arithmetic units"],
            ["Memory Bandwidth", "~300 GB/s (DDR5)", "3.35 TB/s (HBM3)"],
            ["AI Performance (FP16 Tensor)", "~6 TFLOPS", "~2,000 TFLOPS (dense)"],
            ["AI Performance (FP8 Tensor)", "Not applicable", "~3,958 TFLOPS (sparse)"],
            ["Power (TDP)", "350W", "700W"],
            ["Memory Capacity", "Up to 4TB (system RAM)", "80GB (HBM3)"],
            ["Best For", "OS, databases, complex logic, web servers", "Matrix math, neural networks, parallel compute"],
          ]}
        />
        <Callout type="important" title="Why Memory Bandwidth Matters So Much">
          LLM inference ka primary bottleneck memory bandwidth hai, compute nahi. Token generate karna matlab hai: model weights (140GB for 70B model) ko GPU memory se har step pe read karna. H100 ka 3.35 TB/s bandwidth = CPU ke 100 GB/s se ~33× faster data delivery to the cores. Isi liye GPUs AI ke liye essential hain.
        </Callout>
      </section>

      {/* ─── GPU ARCHITECTURE ──────────────────────────────────────────── */}
      <section id="gpu-architecture">
        <h2 style={S.h2}>GPU Architecture — Inside the Chip</h2>
        <p style={S.p}>
          Ab hum GPU ke andar jaate hain. Simple analogy se shuru karte hain: ek badi factory.
        </p>
        <p style={S.p}>
          <strong>Factory (GPU chip)</strong> → <strong>Departments (GPC — GPU Division)</strong> → <strong>Teams (SM — Work Unit)</strong> → <strong>Workers (CUDA Cores, Tensor Cores)</strong>
        </p>
        <Figure caption="GPU Architecture: The chip is divided into GPU Divisions (GPC), each containing multiple Work Units (SM). Each SM has CUDA Cores for general math, Tensor Cores for AI matrix operations, and fast local storage.">
          <GpuArchitectureDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>GPC (GPU Division / Graphics Processing Cluster):</strong> GPU ka highest-level organizational unit. H100 mein 8 GPCs hain. Har GPC mein multiple SMs hain.</li>
          <li><strong>SM (Work Unit / Streaming Multiprocessor):</strong> GPU ka most important unit. Har kaam yahan hota hai. H100 mein 132 SMs hain. Har SM ek self-contained mini-processor hai apne cores, schedulers, aur fast memory ke saath.</li>
          <li><strong>L2 Cache:</strong> Sab SMs ke beech shared on-chip storage. H100: 40MB. GPU HBM se much faster access.</li>
        </ul>

        <h3 style={S.h3}>SM — Work Unit (Streaming Multiprocessor)</h3>
        <Figure caption="One Work Unit (SM): Work Manager (Warp Scheduler) assigns groups of 32 threads (Warps) to CUDA Cores and Tensor Cores. Registers and Shared Memory provide ultra-fast per-SM storage. All 132 SMs work simultaneously.">
          <StreamingMultiprocessorDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>CUDA Cores:</strong> General-purpose arithmetic units — FP32, FP64, integer operations. 128 per SM in H100. Total: 132 × 128 = 16,896 CUDA Cores.</li>
          <li><strong>Tensor Core units:</strong> Specialized matrix multiplication hardware for AI. 4 units per SM in H100. Dramatically more efficient than CUDA Cores for neural network math.</li>
          <li><strong>Register File:</strong> Ultra-fast per-thread temporary storage. Fastest memory in the GPU — faster than even shared memory.</li>
          <li><strong>Shared Memory / L1 Cache:</strong> Shared within one SM. Programmers explicitly manage this. Key for optimization.</li>
          <li><strong>Warp Scheduler (Work Manager):</strong> Assigns work to cores. Manages multiple warps simultaneously — when one warp waits for memory, another executes. This "latency hiding" is why GPU is not slowed by memory latency as much as CPU.</li>
        </ul>

        <h3 style={S.h3}>Warp — GPU Ka Group of 32</h3>
        <p style={S.p}>
          Ek Warp = 32 threads jo simultaneously same instruction execute karte hain. Yeh GPU ka SIMT model hai — Single Instruction, Multiple Threads. Iska matlab: ek instruction issue hoti hai, aur 32 threads sab usi instruction ko alag-alag data pe simultaneously execute karte hain.
        </p>
        <p style={S.p}>
          Jaise ek army mein soldiers squads mein move karte hain — individually nahi, saath mein — GPU mein threads "warps" mein execute hote hain. Ek SM multiple warps ko simultaneously manage kar sakta hai — jab ek warp memory wait kar raha hota hai, doosra warp execute hota hai. Isko "latency hiding" kehte hain.
        </p>
        <Callout type="warning" title="Warp Divergence — Code Likhte Waqt Dhyan Rakho">
          Agar ek warp ke 32 threads alag-alag branches (if/else) lete hain, toh GPU ko dono branches serialize karne padte hain — performance drops. AI code mein uniform operations use karo — batch size align karo warp size ke multiples mein for best efficiency.
        </Callout>
      </section>

      {/* ─── CUDA CORES ────────────────────────────────────────────────── */}
      <section id="cuda-cores">
        <h2 style={S.h2}>CUDA Cores — The General Workers</h2>
        <p style={S.p}>
          CUDA Core GPU ka basic arithmetic unit hai. Samajhna zaroori hai: CUDA Core ek lightweight arithmetic execution unit hai — yeh CPU core nahi hai. CPU core se direct comparison karna misleading hoga. CPU core complex logic, branch prediction, large cache management karta hai. CUDA Core simply: do math, fast, simple.
        </p>
        <p style={S.p}>
          Ek CUDA Core ek floating-point operation per clock cycle kar sakta hai — addition ya multiplication (ya dono ek saath — Fused Multiply-Add, FMA). H100 mein 16,896 CUDA Cores hain. At 1.98 GHz, theoretical FP32 peak: 16,896 × 2 (FMA) × 1.98 GHz ≈ 67 TFLOPS.
        </p>
        <ul style={S.ul}>
          <li><strong>What CUDA Cores do:</strong> General FP32/FP64 math, integer operations, activation functions (ReLU, GELU), softmax, layer normalization — anything that is not a matrix multiply.</li>
          <li><strong>What CUDA Cores don&apos;t do efficiently:</strong> Large matrix multiplications — that is Tensor Core territory.</li>
          <li><strong>In production:</strong> Both CUDA Cores and Tensor Cores run simultaneously. Tensor Cores do the heavy matrix math, CUDA Cores handle everything else.</li>
        </ul>
      </section>

      {/* ─── TENSOR CORES ──────────────────────────────────────────────── */}
      <section id="tensor-cores">
        <h2 style={S.h2}>Tensor Cores — The AI Accelerators</h2>
        <p style={S.p}>
          Tensor Cores ne AI GPU ko ordinary GPU se alag bana diya. NVIDIA ka sabse important innovation hai AI compute ke liye.
        </p>
        <p style={S.p}>
          <strong>Simple explanation:</strong> CUDA Core ek brick uthata hai, scale karta hai, rakhta hai — ek baar mein ek brick. Tensor Core ek poori building ka blueprint leta hai aur ek hi operation mein process karta hai — specialized matrix multiplication hardware.
        </p>
        <p style={S.p}>
          Neural network layers essentially matrix multiplications hain. Tensor Cores specifically is operation ke liye designed hain. Actual speedup depends on architecture, workload, matrix size, and precision (FP16/BF16/FP8) — in factors ke combination se improvement several times se tens of times faster ho sakti hai vs CUDA Cores alone.
        </p>
        <Figure caption="CUDA Core does one number at a time. Tensor Core processes an entire matrix in one specialized hardware operation — much more efficient for neural network layers. Actual performance gain depends on architecture, workload, and precision used.">
          <TensorCoreDiagram />
        </Figure>

        <h3 style={S.h3}>Precision Formats Explained</h3>
        <p style={S.p}>
          AI sirf FP32 mein kaam nahi karta. Precision format choose karna performance aur quality ka balance hai:
        </p>
        <ComparisonTable
          title="Precision Formats — Performance vs Quality"
          headers={["Format", "Bits", "Use Case", "H100 Peak (Tensor Core)"]}
          rows={[
            ["FP32", "32-bit", "Scientific compute, high precision", "~67 TFLOPS (CUDA Cores, no Tensor)"],
            ["TF32", "19-bit effective", "Drop-in FP32 replacement on A100+", "~989 TFLOPS dense (H100)"],
            ["BF16", "16-bit", "LLM training (stable range)", "~1,979 TFLOPS dense (H100)"],
            ["FP16", "16-bit", "LLM inference, training", "~1,979 TFLOPS dense (H100)"],
            ["FP8 (via Transformer Engine)", "8-bit", "H100+ training, inference", "~3,958 TFLOPS sparse (H100)"],
            ["INT8", "8-bit", "Quantized inference (post-training)", "~3,958 TOPS sparse (H100)"],
            ["INT4", "4-bit", "Aggressive quantization", "~7,916 TOPS sparse (H100)"],
            ["FP4/FP6", "4-6 bit", "Blackwell only — emerging", "B200 higher than H100"],
          ]}
        />
        <Callout type="best-practice" title="FP8 Mixed Precision Training">
          H100 pe FP8 Mixed Precision Training NVIDIA Transformer Engine ke through use karo. Transformer Engine automatically FP8 vs BF16 decide karta hai per layer per step — scaling factors manage karta hai automatically. Quality BF16 training ke comparable, throughput significantly better. Production LLM training ka emerging standard.
        </Callout>

        <h3 style={S.h3}>Tensor Core Generations</h3>
        <ComparisonTable
          headers={["Generation", "GPU", "New Precision Support", "Notable Change"]}
          rows={[
            ["1st Gen", "V100 (Volta, 2017)", "FP16", "First Tensor Cores — AI performance breakthrough"],
            ["2nd Gen", "A100 (Ampere, 2020)", "FP16, BF16, TF32, INT8, INT4", "Sparsity support — 2× effective performance"],
            ["3rd Gen", "A100 80GB (Ampere)", "Same", "Incremental improvements"],
            ["4th Gen", "H100 (Hopper, 2022)", "FP8 via Transformer Engine", "FP8 training — ~2× vs BF16 for LLMs"],
            ["5th Gen", "B200 (Blackwell, 2024)", "FP4, FP6, FP8, FP16, BF16", "Higher throughput vs H100 across precisions"],
          ]}
        />
      </section>

      {/* ─── RT CORES ──────────────────────────────────────────────────── */}
      <section id="rt-cores">
        <h2 style={S.h2}>RT Cores — The Other Specialist</h2>
        <p style={S.p}>
          RT Cores (Ray Tracing Cores) real-time ray tracing ke liye hain — mostly gaming aur visualization. AI training mein direct use nahi hota.
        </p>
        <p style={S.p}>
          Mention worth hai kyunki: NVIDIA consumer GeForce GPUs mein RT Cores hote hain. Data center AI GPUs (A100, H100) mein RT Cores nahi hote — unnecessary for AI, aur die area AI-useful components ke liye optimized hai. Agar koi aapko RT Cores ki wajah se data center GPU purchase recommend kare, yeh wrong criteria hai.
        </p>
      </section>

      {/* ─── HBM MEMORY ────────────────────────────────────────────────── */}
      <section id="hbm-memory">
        <h2 style={S.h2}>HBM — The Memory That Makes AI Possible</h2>
        <p style={S.p}>
          Memory GPU performance ka sabse critical factor hai. HBM (High Bandwidth Memory) woh technology hai jo modern AI feasible banati hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> GPU ek chef hai aur memory ek ingredient shelf hai. Normal RAM: ingredients doosre room mein hain. Chef repeatedly doosre room mein jaana padta hai. HBM: ingredients directly chef ke kitchen counter pe hain — no travel time.
        </p>
        <p style={S.p}>
          HBM literally GPU chip ke saath ek package mein hota hai using Through-Silicon Vias (TSVs) — microscopic vertical connections through silicon layers. Primary advantage: extremely high memory bandwidth. Latency improvement bhi exist karta hai, lekin bandwidth hi major benefit hai.
        </p>
        <Figure caption="HBM Fast GPU Memory is stacked directly next to the GPU chip in the same package — ultra-wide 1024-bit bus gives 3.35 TB/s bandwidth. Regular DDR RAM sits far away on the motherboard with a narrow 32-bit bus — only ~100 GB/s.">
          <HbmMemoryDiagram />
        </Figure>
        <ComparisonTable
          title="HBM Generations — Memory Evolution"
          headers={["Memory Type", "GPU", "Capacity", "Bandwidth", "Key Advantage"]}
          rows={[
            ["GDDR6X", "Consumer GPUs (RTX 4090)", "24GB", "~1 TB/s", "Cost-effective, good for smaller models"],
            ["HBM2e", "A100 (Ampere)", "80GB", "2 TB/s", "First widely deployed HBM in AI servers"],
            ["HBM3", "H100 (Hopper)", "80GB", "3.35 TB/s", "~1.7× bandwidth vs HBM2e"],
            ["HBM3e", "B200 (Blackwell), MI300X", "192GB", "~8 TB/s (B200)", "2× capacity, major LLM serving upgrade"],
          ]}
        />
        <Callout type="important" title="HBM Capacity aur LLM Planning">
          70B model at FP16 = 140GB. H100 (80GB HBM3) mein fit nahi hota alone — 2 H100s minimum. AMD MI300X (192GB HBM3e) mein easily fit hota hai — memory capacity advantage real hai for large model inference. GPU selection mein HBM capacity pehle check karo.
        </Callout>
      </section>

      {/* ─── PCIE ──────────────────────────────────────────────────────── */}
      <section id="pcie">
        <h2 style={S.h2}>PCIe — Connection to the Outside World</h2>
        <p style={S.p}>
          PCIe (Peripheral Component Interconnect Express) woh interface hai jo GPU ko CPU aur system se connect karta hai. Highway hai GPU aur CPU ke beech — data in aur out jaata hai is highway se.
        </p>
        <ComparisonTable
          headers={["PCIe Generation", "Bandwidth (each direction)", "Bidirectional Total", "GPU Example"]}
          rows={[
            ["PCIe 3.0 x16", "8 GB/s", "16 GB/s total", "Older GPUs"],
            ["PCIe 4.0 x16", "16 GB/s", "32 GB/s total", "A100 PCIe variant"],
            ["PCIe 5.0 x16", "64 GB/s", "128 GB/s total", "H100, B200 (current standard)"],
          ]}
        />
        <p style={S.p}>
          <strong>H100:</strong> PCIe Gen 5 × 16 = 64 GB/s each direction, 128 GB/s bidirectional aggregate.
        </p>
        <Callout type="warning" title="PCIe Bottleneck for Multi-GPU">
          GPU-to-GPU communication PCIe se karna slow hai: GPU1 → CPU → GPU2. PCIe Gen5 ki 128 GB/s bidirectional bandwidth NVLink ke 900 GB/s se 7× slower hai. Large model training ke liye PCIe-only systems avoid karo — NVLink-enabled DGX/HGX servers use karo.
        </Callout>
      </section>

      {/* ─── NVLINK ────────────────────────────────────────────────────── */}
      <section id="nvlink">
        <h2 style={S.h2}>NVLink — Direct GPU-to-GPU Communication</h2>
        <p style={S.p}>
          Bina NVLink ke, do GPUs ek dusre se baat karne ke liye CPU ke through jaana padta hai — jaise do logon ko baat karne ke liye ek interpreter chahiye. NVLink se, do GPUs directly ek dusre se baat karte hain — jaise do log directly baat kar rahe hain.
        </p>
        <Figure caption="Without NVLink: GPU 1 must send data through the CPU to reach GPU 2 — slow 128 GB/s bottleneck. With NVLink: GPU 1 and GPU 2 communicate directly via NVSwitch — 900 GB/s bidirectional total. Tensor parallelism enabled.">
          <NvlinkDiagram />
        </Figure>
        <ComparisonTable
          headers={["NVLink Version", "GPU", "Bidirectional Bandwidth (per GPU)", "Notes"]}
          rows={[
            ["NVLink 3.0", "A100", "600 GB/s total", "6× pairs, 12 links"],
            ["NVLink 4.0", "H100", "900 GB/s total", "9× pairs, 18 links — production standard"],
            ["NVLink 5.0", "B200 (Blackwell)", "1.8 TB/s total", "2× H100 bandwidth — GB200 NVL72"],
          ]}
        />
        <p style={S.p}>
          <strong>Why NVLink matters for AI training:</strong> Distributed training mein, every step ke baad GPUs apne gradients share karte hain (All-Reduce operation). 70B model gradients: ~140GB. NVLink (900 GB/s) pe yeh fraction of a second mein hota hai. PCIe pe (128 GB/s): multiple seconds per step — days of training time wasted in communication.
        </p>
      </section>

      {/* ─── NVSWITCH ──────────────────────────────────────────────────── */}
      <section id="nvswitch">
        <h2 style={S.h2}>NVSwitch — The GPU Interconnect Switch</h2>
        <p style={S.p}>
          NVSwitch ek dedicated GPU interconnect switch hai jo GPU servers ke andar hota hai — yeh Ethernet switch nahi hai. NVSwitch NVLink connections ko route karta hai sab GPUs ke beech same server mein. Ethernet switches external network requests handle karte hain — yeh alag cheez hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Agar NVLink ek road hai GPU ke beech, toh NVSwitch ek roundabout (traffic circle) hai — har road yahan aati hai, aur koi bhi road pe ja sakta hai. DGX H100 mein 3 NVSwitch chips hain. Sab 8 GPUs connect hain — koi bhi GPU kisi bhi doosre GPU se full 900 GB/s NVLink bandwidth pe baat kar sakta hai simultaneously. Koi sharing nahi, koi bottleneck nahi.
        </p>
        <p style={S.p}>
          Yeh tensor parallelism ke liye critical hai — jab single neural network layer multiple GPUs pe split hoti hai. Har step pe GPUs partial results share karte hain. NVSwitch yeh near-instantly possible banata hai.
        </p>
      </section>

      {/* ─── CUDA SOFTWARE ─────────────────────────────────────────────── */}
      <section id="cuda-software">
        <h2 style={S.h2}>CUDA — The Software Layer</h2>
        <p style={S.p}>
          Hardware excellent hai, lekin software ke bina kuch nahi. CUDA woh software framework hai jo developers ko GPU pe programs likhne deta hai.
        </p>
        <ul style={S.ul}>
          <li><strong>CUDA C/C++:</strong> Extended C++ language GPU programs likhne ke liye. "Kernels" — GPU functions — define karo.</li>
          <li><strong>cuBLAS:</strong> Optimized matrix math library. Neural network layers internally cuBLAS use karte hain.</li>
          <li><strong>cuDNN:</strong> Deep learning primitives — convolutions, activations, pooling, attention. PyTorch aur TensorFlow internally call karte hain.</li>
          <li><strong>NCCL:</strong> Multi-GPU communication — All-Reduce, Broadcast, Scatter. Distributed training ka backbone.</li>
          <li><strong>Thrust:</strong> STL-like parallel algorithms library.</li>
          <li><strong>NVML:</strong> NVIDIA Management Library — programmatic GPU monitoring, health checks, configuration.</li>
        </ul>
        <p style={S.p}>
          Jab aap PyTorch mein <code style={S.code}>model.cuda()</code> likhte ho, model GPU HBM mein move hota hai. Jab <code style={S.code}>loss.backward()</code> call karte ho, CUDA kernels automatically execute hote hain. Developer ko low-level manage nahi karna padta — CUDA yeh handle karta hai.
        </p>
        <Callout type="important" title="CUDA Ecosystem Lock-In">
          CUDA sirf NVIDIA GPUs pe run karta hai. Yeh ek important business reality hai — hardware excellent hai, lekin CUDA libraries, tooling, aur developer expertise ka ecosystem equally important competitive advantage create karta hai. AMD ROCm alternative hai, lekin CUDA maturity se gap remain karta hai. Yeh woh reason hai ki most AI workloads NVIDIA GPUs pe run karte hain aaj bhi.
        </Callout>
      </section>

      {/* ─── ROCM ──────────────────────────────────────────────────────── */}
      <section id="rocm">
        <h2 style={S.h2}>ROCm — AMD&apos;s Answer to CUDA</h2>
        <p style={S.p}>
          AMD ka GPU portfolio AI infrastructure mein growing presence rakha hai. ROCm (Radeon Open Compute) AMD ka open-source alternative hai CUDA ecosystem ke liye.
        </p>
        <ul style={S.ul}>
          <li><strong>HIP (Heterogeneous-compute Interface for Portability):</strong> CUDA-like programming model. CUDA code ROCm pe port karna relatively easy — many CUDA APIs directly map to HIP.</li>
          <li><strong>rocBLAS, MIOpen:</strong> Equivalent libraries to cuBLAS, cuDNN.</li>
          <li><strong>RCCL:</strong> Equivalent to NCCL for multi-GPU communication.</li>
          <li><strong>PyTorch ROCm support:</strong> Official ROCm backend available aur improving.</li>
        </ul>
        <p style={S.p}>
          <strong>AMD Instinct MI300X:</strong> 192GB HBM3 — memory capacity advantage over H100&apos;s 80GB. 5.3 TB/s memory bandwidth. Strong FP16/BF16 performance. Competitive with H100 for memory-intensive LLM inference. Pricing often lower than equivalent NVIDIA.
        </p>
        <Callout type="best-practice" title="ROCm 2024-25 Status">
          ROCm ecosystem has improved significantly since 2024 — PyTorch support better, Flash Attention available, key libraries ported. Although CUDA still has broader ecosystem maturity, AMD is closing the gap faster than in previous years. 70B+ model inference jahan HBM capacity matters: MI300X seriously evaluate karo.
        </Callout>
      </section>

      {/* ─── MIG ───────────────────────────────────────────────────────── */}
      <section id="mig">
        <h2 style={S.h2}>MIG — One GPU, Multiple Isolated Instances</h2>
        <p style={S.p}>
          Ek GPU bohot powerful hai. Lekin kya zaroori hai ki ek user ko poora GPU mile? Kuch workloads chhote hote hain — testing, small models, development. Poora H100 ek developer ke development work ke liye waste hai.
        </p>
        <p style={S.p}>
          MIG (Multi-Instance GPU) se: ek physical H100 ko up to seven isolated GPU instances mein split kar sakte ho depending on the selected MIG profile. Har instance ka apna dedicated SM portion, HBM memory slice, compute engines — complete hardware-level isolation.
        </p>
        <Figure caption="MIG splits one H100 into up to seven isolated instances (profile-dependent). Each instance has its own dedicated GPU compute and GPU memory — hardware isolation means one team cannot access another's data. Safe for production multi-tenant use.">
          <MigDiagram />
        </Figure>
        <ComparisonTable
          title="MIG Instance Profiles (H100 Examples)"
          headers={["Profile", "SMs", "GPU Memory", "Use Case"]}
          rows={[
            ["1g.10gb", "16 SMs", "10 GB HBM", "Development, testing, small models"],
            ["2g.20gb", "32 SMs", "20 GB HBM", "Medium development workloads"],
            ["3g.40gb", "48 SMs", "40 GB HBM", "Production small/medium model serving"],
            ["4g.40gb", "64 SMs", "40 GB HBM", "Larger production workloads"],
            ["7g.80gb", "All 132 SMs", "80 GB HBM", "Full GPU — same as no MIG"],
          ]}
        />
        <Callout type="best-practice" title="MIG vs Time-Sharing">
          Traditional GPU sharing (without MIG): no memory isolation — ek process doosre ki memory access kar sakta hai. Security risk, unpredictable performance. MIG: hardware-level isolation, memory protected, performance guaranteed. Production multi-tenant deployments: MIG use karo, not bare time-sharing.
        </Callout>
      </section>

      {/* ─── GPU VIRTUALIZATION ────────────────────────────────────────── */}
      <section id="gpu-virtualization">
        <h2 style={S.h2}>GPU Virtualization</h2>
        <ul style={S.ul}>
          <li><strong>NVIDIA vGPU:</strong> Enterprise virtualization solution (requires license). GPU ko virtual machines mein share karo — VM ke andar GPU physical GPU ki tarah lagti hai. Use case: GPU-accelerated virtual desktops (VDI). Less relevant for large AI training.</li>
          <li><strong>GPU Passthrough:</strong> Physical GPU directly ek VM ko assign karo (1:1). Best performance — near-native. No sharing. Common in cloud GPU instances (AWS, GCP, Azure).</li>
          <li><strong>Time-Slicing:</strong> Multiple processes ek GPU time-share karte hain. No memory isolation. Suitable for dev/test. Not production-grade for sensitive workloads.</li>
        </ul>
        <p style={S.p}>
          <strong>Recommendation for AI production:</strong> Training workloads — physical GPUs preferred. Inference development/testing — MIG where possible. Multi-tenant production inference — MIG ya dedicated physical GPUs per tenant.
        </p>
      </section>

      {/* ─── MULTI-GPU ─────────────────────────────────────────────────── */}
      <section id="multi-gpu">
        <h2 style={S.h2}>Multi-GPU Systems</h2>
        <p style={S.p}>
          Single GPU ke baad, scale kaise karte hain? Multi-GPU systems three approaches use karte hain:
        </p>
        <ul style={S.ul}>
          <li><strong>Data Parallelism:</strong> Same model, alag data batches, alag GPUs pe. Gradients sync karo at end of each step. Simplest approach. Works when model ek GPU mein fit ho. Sab GPUs apna result share karte hain — is operation ko All-Reduce kehte hain.</li>
          <li><strong>Tensor Parallelism:</strong> Ek neural network layer ko multiple GPUs pe split karo — GPU 1 left half of weight matrix, GPU 2 right half. Results combine karo. NVLink bandwidth critical — frequent inter-GPU communication hoti hai. Use when model single GPU mein fit nahi hota.</li>
          <li><strong>Pipeline Parallelism:</strong> Model layers ko GPU groups mein vertically split karo. GPU 1: layers 1-20. GPU 2: layers 21-40. Data pipeline style se flow karta hai.</li>
        </ul>
        <Callout type="maintenance" title="Full Detail — Next Article">
          Distributed training ka complete picture <TopicLink slug="gpu-cluster" variant="inline" /> mein cover hoga — parallelism strategies, NCCL, InfiniBand fabric, aur production cluster operations.
        </Callout>
      </section>

      {/* ─── DGX ───────────────────────────────────────────────────────── */}
      <section id="dgx">
        <h2 style={S.h2}>DGX — NVIDIA&apos;s Complete AI Server</h2>
        <p style={S.p}>
          DGX NVIDIA ka purpose-built, fully integrated AI server hai. Ek complete turnkey solution — GPUs, networking, storage, cooling, software — sab ek system mein pre-configured. Jaise ek complete kitchen kit hai professional chef ke liye — sab kuch included, sab kuch optimized, day one se kaam shuru ho sakta hai.
        </p>
        <Figure caption="DGX H100 Server: 8 H100 GPUs connected via NVSwitch (GPU interconnect — not Ethernet) for fast internal communication. Plus 2 Intel CPUs, 2TB System RAM, 4 NVMe SSDs for storage, and 8 InfiniBand network cards to connect to other servers. Specifications vary by DGX generation.">
          <DgxServerDiagram />
        </Figure>
        <ComparisonTable
          title="DGX H100 — Key Specifications"
          headers={["Component", "Detail", "Purpose"]}
          rows={[
            ["GPUs", "8× H100 SXM5 80GB", "AI training and inference compute"],
            ["GPU Interconnect", "NVSwitch × 3 chips — 900 GB/s any-to-any", "Fast GPU-to-GPU — NOT Ethernet switch"],
            ["CPU", "2× Intel Xeon Platinum", "Server OS, data loading, non-GPU tasks"],
            ["System RAM", "2TB DDR5", "CPU working memory"],
            ["Local Storage", "4× NVMe SSDs (~30TB)", "Checkpoints, model artifacts"],
            ["Network Cards", "8× ConnectX-7 (1 per GPU)", "400 Gbps InfiniBand each — 3.2 Tbps aggregate"],
            ["Total GPU Memory", "640GB HBM3", "Holds models up to ~640GB at FP16"],
            ["Power Draw", "~10.2 kW", "High-density — liquid cooling recommended"],
            ["Form Factor", "10U rack server", "DC planning: floor load ~130 kg"],
          ]}
        />
        <Callout type="warning" title="Specifications Vary">
          Specifications depend on DGX generation and configuration. DGX A100, DGX H100, DGX B200 — each has different specs. Always verify current NVIDIA documentation for exact numbers before procurement.
        </Callout>
        <ComparisonTable
          title="DGX vs Custom HGX-Based Server"
          headers={["Aspect", "DGX", "Custom HGX-Based (Dell/Supermicro/HPE)"]}
          rows={[
            ["Time to deploy", "Days", "Weeks to months"],
            ["Software stack", "Pre-configured NVIDIA stack", "Manual configuration"],
            ["Support", "Full NVIDIA enterprise support", "OEM support (multiple vendors)"],
            ["Cost", "Premium", "Often lower"],
            ["Flexibility", "Limited to NVIDIA config", "High — custom CPU, storage, networking"],
            ["Best for", "Fast deployment, standard configs", "Large scale, custom requirements"],
          ]}
        />
      </section>

      {/* ─── HGX ───────────────────────────────────────────────────────── */}
      <section id="hgx">
        <h2 style={S.h2}>HGX — The GPU Baseboard for OEM Servers</h2>
        <p style={S.p}>
          HGX (NVIDIA HGX) woh GPU board hai jo OEM manufacturers (Dell, HPE, Supermicro, Lenovo) use karte hain apne AI servers banane ke liye. Think of HGX as: ek complete GPU subsystem. 8 H100s pre-mounted, NVSwitch connected, ready to drop into a server chassis.
        </p>
        <ul style={S.ul}>
          <li><strong>HGX H100 board:</strong> 8× H100 SXM5 GPUs, 3× NVSwitch chips, pre-tested and validated by NVIDIA.</li>
          <li><strong>OEM phir:</strong> Apna CPU, DRAM, NVMe, cooling, chassis design karta hai aur HGX board install karta hai.</li>
          <li><strong>Who uses HGX:</strong> Dell PowerEdge XE9680, Supermicro SYS-421GE-TNRT, HPE ProLiant DL380 Gen11, Lenovo ThinkSystem SR670 V3.</li>
          <li><strong>Same GPU performance:</strong> Same H100 chips — DGX vs HGX-based OEM: identical GPU compute. Different packaging, support model, customizability.</li>
        </ul>
      </section>

      {/* ─── GB200 NVL72 ───────────────────────────────────────────────── */}
      <section id="gb200-nvl72">
        <h2 style={S.h2}>GB200 NVL72 — AI Supercomputer in a Rack</h2>
        <p style={S.p}>
          GB200 NVL72 NVIDIA ka newest aur most powerful configuration hai. Ek complete rack (ya multi-rack) solution — 36 Grace CPU modules aur 72 Blackwell B200 GPU modules, sab NVLink 5.0 switch fabric se connected.
        </p>
        <ul style={S.ul}>
          <li><strong>72 GPUs as one logical unit:</strong> Koi bhi GPU kisi bhi doosre GPU se direct NVLink 5.0 communication. Koi InfiniBand needed nahi within the rack for GPU-to-GPU.</li>
          <li><strong>13.5 TB total HBM3e:</strong> 72 × 192GB. Frontier models (405B+) ek single NVL72 rack pe comfortably serve ho sakte hain.</li>
          <li><strong>Infrastructure implications:</strong> Very high power density — hundreds of kW per rack. Liquid cooling mandatory. Specialized facility requirements.</li>
          <li><strong>Advantage over H100:</strong> Previously 8+ H100 nodes with InfiniBand required for 70B; now single NVL72 rack sufficient with NVLink connectivity — simpler topology, lower latency.</li>
        </ul>
      </section>

      {/* ─── AI FACTORY ────────────────────────────────────────────────── */}
      <section id="ai-factory">
        <h2 style={S.h2}>AI Factory — What It Actually Is</h2>
        <p style={S.p}>
          "AI Factory" ek term hai jo NVIDIA ke CEO Jensen Huang ne popularize kiya. Traditional factory: raw materials andar, finished products bahar. AI factory: raw data andar → GPU Cluster → trained AI models ya AI responses bahar. 24/7 continuous operation.
        </p>
        <Figure caption="AI Factory: Training Data comes in on the left, GPU Cluster (thousands of GPUs) processes it in the center, Trained Models and AI Responses come out on the right — powered by MW-scale electricity and mandatory Direct Liquid Cooling.">
          <AiFactoryDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Compute layer:</strong> GPU servers (DGX/HGX-based), hundreds to thousands of H100/B200 GPUs, InfiniBand networking fabric connecting all servers. Scale: 1,000 to 100,000+ GPUs.</li>
          <li><strong>Storage layer:</strong> Parallel file systems (Lustre, GPFS, Weka, VAST Data), high-throughput object storage, NVMe-based fast storage for checkpoints. Petabytes of total capacity.</li>
          <li><strong>Power infrastructure:</strong> Tens of megawatts. Redundant utility feeds. UPS systems. Backup generators.</li>
          <li><strong>Cooling infrastructure:</strong> Direct Liquid Cooling (primarily Cold Plate Cooling) mandatory at AI density. Rear-door heat exchangers for lower density. Chilled water plant, cooling towers.</li>
          <li><strong>Management:</strong> Job scheduler (Slurm, Kubernetes), monitoring (DCGM, Prometheus, Grafana), model registry, experiment tracking.</li>
        </ul>
        <p style={S.p}>
          <strong>Examples:</strong> xAI Memphis facility "Colossus": 100,000 H100 GPUs. Meta AI: tens of thousands of GPUs across facilities. Microsoft Azure AI: massive GPU clusters globally. India: Reliance Jio, Tata Group, Yotta Data Services — AI factory investments growing.
        </p>
      </section>

      {/* ─── GPU CLUSTER ───────────────────────────────────────────────── */}
      <section id="gpu-cluster">
        <h2 style={S.h2}>GPU Cluster — Connecting Servers Together</h2>
        <p style={S.p}>
          Ek server mein 8 GPUs hain. Frontier model training ke liye kaafi nahi. Isliye GPU clusters hain — hundreds ya thousands of servers together.
        </p>
        <Figure caption="GPU Cluster: Multiple servers each with 8 GPUs → connected to InfiniBand Leaf Switches → connected to InfiniBand Spine Switches. Any server can send data to any other server at full speed (non-blocking). Storage servers connect separately.">
          <GpuClusterDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Within server:</strong> NVLink handles GPU-to-GPU (900 GB/s bidirectional total per GPU).</li>
          <li><strong>Between servers:</strong> InfiniBand NDR 400Gbps per port handles server-to-server.</li>
          <li><strong>Fat-tree topology:</strong> Non-blocking — any server to any other server at full bandwidth. Critical for All-Reduce operations where all GPUs communicate simultaneously.</li>
          <li><strong>NCCL:</strong> Software library that handles All-Reduce, Broadcast, All-Gather automatically. PyTorch DDP, FSDP internally use NCCL. Developer ko manually communication manage nahi karna padta.</li>
        </ul>
      </section>

      {/* ─── AI DATA CENTERS ───────────────────────────────────────────── */}
      <section id="ai-data-centers">
        <h2 style={S.h2}>AI Data Centers — Infrastructure at Scale</h2>
        <p style={S.p}>
          AI data centers traditional data centers se fundamentally alag hote hain. Yeh differences DC engineers ke liye most important hai.
        </p>
        <ComparisonTable
          title="Power Density Comparison"
          headers={["Data Center Type", "Power Density per Rack", "Cooling Method"]}
          rows={[
            ["Traditional IT", "2–5 kW", "Air cooling"],
            ["High-density compute", "10–20 kW", "Air + some liquid"],
            ["AI/GPU servers (air-cooled)", "20–40 kW", "Air cooling — at upper limit"],
            ["AI/GPU servers (liquid-cooled)", "40–100+ kW", "Direct Liquid Cooling mandatory"],
            ["NVL72 AI factory racks", "120–200+ kW", "Advanced liquid cooling required"],
          ]}
        />
        <ul style={S.ul}>
          <li><strong>Floor load:</strong> DGX H100: ~130 kg. Rack of 8 servers: ~1,040+ kg. Traditional DC floor load often insufficient — civil/structural assessment first, before procurement.</li>
          <li><strong>Power infrastructure:</strong> Three-phase power at high amperage. Rack of 8 DGX H100s: ~80kW. 100 racks: ~8MW compute power + 30-40% cooling overhead. Total: ~10-11 MW facility power.</li>
          <li><strong>Cooling — Direct Liquid Cooling (Cold Plate Cooling):</strong> Cold plates directly on GPU die. Cold water (18-22°C) enters, warm water (35-45°C) exits. Much more efficient than air. Requires facility chilled water infrastructure, leak detection, quick-connect plumbing per rack.</li>
        </ul>
      </section>

      {/* ─── GPU POWER ─────────────────────────────────────────────────── */}
      <section id="gpu-power">
        <h2 style={S.h2}>GPU Power — Deep Dive</h2>
        <p style={S.p}>
          Power consumption GPU infrastructure ka most critical planning factor hai.
        </p>
        <ul style={S.ul}>
          <li><strong>TDP (Thermal Design Power):</strong> Maximum sustained power under full load. H100 SXM5: 700W. Idle power: 50-100W typical.</li>
          <li><strong>Power capping:</strong> <code style={S.code}>nvidia-smi -pl 400</code> GPU ka power limit 400W set karta hai. At 400W, H100 still delivers 80-85% of peak performance — diminishing returns near TDP. More GPUs same power envelope mein fit. Production clusters often run at 80% TDP cap.</li>
          <li><strong>Real-time monitoring:</strong> <code style={S.code}>nvidia-smi --query-gpu=power.draw --format=csv</code></li>
        </ul>
        <ComparisonTable
          title="Power Budget — DGX H100 Server"
          headers={["Component", "Power Draw", "Notes"]}
          rows={[
            ["8× H100 GPUs", "8 × 700W = 5,600W", "At full TDP"],
            ["2× Intel Xeon CPU", "2 × 350W = 700W", "High-end server CPUs"],
            ["DRAM, Storage, Fans, NICs", "~1,500W", "Estimate — varies"],
            ["Total Server", "~10.2 kW", "Per DGX H100 server"],
            ["Rack of 8 servers", "~80 kW", "Plus cooling overhead"],
            ["100 servers (800 GPUs)", "~1 MW compute", "~1.3-1.4 MW total facility"],
          ]}
        />
      </section>

      {/* ─── GPU COOLING ───────────────────────────────────────────────── */}
      <section id="gpu-cooling">
        <h2 style={S.h2}>GPU Cooling — Engineering Deep Dive</h2>
        <p style={S.p}>
          GPU cooling data center design ka most challenging aspect hai kyunki GPU heat density unprecedented hai.
        </p>
        <ul style={S.ul}>
          <li><strong>H100 thermal profile:</strong> Junction temperature (Tj) max: 83°C. Optimal operating: 60-75°C. Thermal throttle starts near 83°C. Each watt of heat = same watt of cooling capacity needed.</li>
          <li><strong>Air cooling for GPU servers:</strong> Works at lower densities — high-speed fans (7,000-15,000 RPM), cold/hot aisle containment. At 40kW+ per rack: air cooling struggles. Noise level: 85-90 dB at high fan speed — significant for DC staff working nearby.</li>
          <li><strong>Direct Liquid Cooling (DLC) — Cold Plate Cooling:</strong> DLC primarily cold plate cooling use karta hai. Cold plates directly on GPU die aur CPU. Cold water (18-22°C) enters server via quick-disconnect couplings. Water absorbs GPU heat → warm water (35-45°C) exits. Facility chiller cools water, returns cold supply. 40-80% cooling energy reduction vs air. GPU runs cooler = no thermal throttling = better sustained performance.</li>
          <li><strong>Immersion cooling (emerging):</strong> Servers submerged in dielectric fluid. Extreme density, silent operation. Not mainstream for GPU servers in 2024-25 — complex maintenance, limited vendor support for GPU servers.</li>
        </ul>
        <ComparisonTable
          headers={["Cooling Method", "Max Density", "Energy Efficiency", "Complexity", "GPU Support"]}
          rows={[
            ["Air cooling", "Up to ~40kW/rack", "Lowest (PUE 1.5-2.0)", "Simple", "Universal"],
            ["Rear-door heat exchanger", "Up to ~60kW/rack", "Medium", "Moderate retrofit", "Universal"],
            ["Direct Liquid Cooling (Cold Plate)", "40-120kW/rack", "High (PUE 1.1-1.3)", "Requires plumbing", "H100, B200, A100 supported"],
            ["Immersion cooling", "120kW+/rack", "Highest", "Complex, specialized", "Limited GPU server support"],
          ]}
        />
      </section>

      {/* ─── GPU MONITORING ────────────────────────────────────────────── */}
      <section id="gpu-monitoring">
        <h2 style={S.h2}>GPU Monitoring — Production Operations</h2>
        <p style={S.p}>
          Production mein GPUs monitor karna mandatory hai. Issues early detect karo, failures predict karo, performance optimize karo.
        </p>
        <p style={S.p}>
          <strong>DCGM (Data Center GPU Manager)</strong> enterprise GPU monitoring ka standard tool hai. DCGM → Prometheus → Grafana stack production standard hai.
        </p>
        <ComparisonTable
          title="Key GPU Metrics and Thresholds"
          headers={["Metric", "Normal Range", "Warning", "Action Required"]}
          rows={[
            ["GPU Utilization (training)", "85–95%", "60–80%", "Below 50%: job config issue — investigate"],
            ["GPU Utilization (inference)", "20–70% (intentional)", "—", "Inference often lower by design — latency priority"],
            ["GPU Temperature", "Below 75°C", "78–82°C", "Above 83°C: throttling — check cooling"],
            ["HBM Memory Utilization", "70–90%", "90–95%", "Above 95%: OOM risk — reduce batch size"],
            ["Power Draw", "Below TDP", "Above 95% TDP", "At TDP: check power cap settings"],
            ["ECC Correctable (SBE)", "0–few per day", "Increasing trend", "Above 100/day: flag for replacement"],
            ["ECC Uncorrectable (DBE)", "0", "Any occurrence", "Immediate investigation — do not ignore"],
            ["NVLink Bandwidth", "Expected utilization", "20% unexpected drop", "Large drop: network or software issue"],
            ["SM Clock Speed", "At rated speed", "Drops unexpectedly", "Clock drop = throttling from thermal/power"],
          ]}
        />
        <Callout type="important" title="Inference Utilization — Don&apos;t Panic">
          Inference workloads mein GPU utilization often intentionally low rehti hai kyunki latency throughput se zyada important hai. Training mein: GPU 95% busy = good. Inference mein: GPU 30-40% per request = acceptable if latency target met. Agar GPU 95% pe push karo inference mein, queue build up hoti hai → latency badh jaati hai → users unhappy. DCGM mein low utilization dekh ke panic mat karo agar inference workload chal raha ho.
        </Callout>
      </section>

      {/* ─── GPU FAILURES ──────────────────────────────────────────────── */}
      <section id="gpu-failures">
        <h2 style={S.h2}>GPU Failures — What Goes Wrong</h2>
        <ComparisonTable
          title="Common GPU Failure Types"
          headers={["Failure Type", "Symptoms", "Detection", "Action"]}
          rows={[
            ["ECC Uncorrectable Error (DBE)", "Job crash, GPU error messages", "DCGM real-time alert, nvidia-smi", "Immediate investigation, likely replacement"],
            ["GPU Hang / Soft Hang", "Job stuck, no progress", "DCGM process hang detection", "GPU process reset or reboot, resume from checkpoint"],
            ["Thermal Throttling", "Training 10-30% slower", "SM clock drop in DCGM", "Check cooling: fan health, DLC flow rate, ambient temp"],
            ["NVLink Failure", "Training crash on tensor parallel jobs", "DCGM NVLink error counters", "Check NVLink error count, GPU replacement or reboot"],
            ["GPU Not Detected", "nvidia-smi shows error", "lspci, dmesg | grep nvidia", "Reseat GPU, check PCIe slot, reinstall drivers"],
            ["Permanent Failure", "GPU completely non-functional", "nvidia-smi empty or corrupt output", "Hardware replacement mandatory"],
          ]}
        />
        <Callout type="best-practice" title="Failure Rate at Scale — Plan For It">
          At 10,000 GPU scale: expect few GPU failures per week — normal hardware failure rates. Production design principle: assume failures happen. Frequent checkpointing (every 30 min minimum), automatic job restart from checkpoint, spare capacity (hot spares or N+1), monitoring + automated alerting. Job scheduler should handle node failures gracefully — PyTorch Elastic (torchrun) supports dynamic node membership.
        </Callout>
      </section>

      {/* ─── GPU SECURITY ──────────────────────────────────────────────── */}
      <section id="gpu-security">
        <h2 style={S.h2}>GPU Security</h2>
        <ul style={S.ul}>
          <li><strong>Physical security:</strong> GPU servers physically secured — locked racks, access logs, video surveillance in GPU areas, no unauthorized hardware removal possible.</li>
          <li><strong>Firmware security:</strong> GPU firmware (VBIOS) verify karo before deployment. NVIDIA PSID firmware authenticity verify karta hai. Official NVIDIA channels ya authorized distributors se hardware purchase — supply chain integrity critical.</li>
          <li><strong>Software security:</strong> DCGM aur nvidia-smi access restrict karo (root/privileged only). MIG isolation: hardware-level — cross-instance memory access impossible. Container isolation: NVIDIA Container Runtime provides GPU isolation in containers.</li>
          <li><strong>Network security:</strong> GPU management plane (BMC/IPMI, DCGM) completely separate network pe. InfiniBand network: isolated from public internet. Training traffic: never traverses public internet. RDMA networks: careful access control required.</li>
          <li><strong>Multi-tenant considerations:</strong> Dedicated physical GPUs preferred for sensitive workloads. MIG acceptable for most — hardware isolation sufficient. Highest sensitivity use cases (financial, healthcare PII): dedicated hardware, no sharing.</li>
        </ul>
      </section>

      {/* ─── ENTERPRISE DEPLOYMENT ─────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise GPU Deployment — Step by Step</h2>
        <h3 style={S.h3}>Phase 1: Assessment</h3>
        <ul style={S.ul}>
          <li>Workload analysis: Training vs inference? Model sizes? Expected concurrency? Required throughput?</li>
          <li>Scale planning: Start small (4-8 GPUs), validate, then scale. Never buy 1000 GPUs as first purchase.</li>
          <li>Build vs Buy vs Cloud: Cloud for fast start aur variable workloads. On-premises at scale for cost optimization aur data sovereignty.</li>
          <li>Facility assessment first: Existing DC mein power capacity? Cooling capacity? Floor load ratings?</li>
        </ul>
        <h3 style={S.h3}>Phase 2: Procurement</h3>
        <ul style={S.ul}>
          <li>GPU server selection: DGX (turnkey) vs OEM HGX-based (cost-flexible). Both same GPU performance.</li>
          <li>Procurement lead time: 3-6 months for large orders — GPU supply chain planning zaroori hai.</li>
          <li>InfiniBand switches: Mellanox QM9700/QM9790 (HDR/NDR). Fat-tree topology design.</li>
        </ul>
        <h3 style={S.h3}>Phase 3: Deployment</h3>
        <ul style={S.ul}>
          <li>Facility preparation first: Power infrastructure (PDUs, UPS), cooling (DLC plumbing if applicable), network cabling, rack installation.</li>
          <li>Software setup: Ubuntu 22.04 LTS (standard), NVIDIA Driver, CUDA toolkit, Docker + NVIDIA Container Runtime, DCGM monitoring.</li>
          <li>Validation: <code style={S.code}>nvidia-smi</code> — all GPUs visible? <code style={S.code}>dcgmi diag -r 3</code> — full GPU diagnostic. InfiniBand test: <code style={S.code}>ibping</code>. NCCL all-reduce bandwidth test.</li>
        </ul>
        <h3 style={S.h3}>Phase 4: Operations</h3>
        <ul style={S.ul}>
          <li>Monitoring: DCGM → Prometheus → Grafana → Alertmanager → PagerDuty/Slack</li>
          <li>Job scheduler: Slurm ya Kubernetes + GPU Operator</li>
          <li>Backup power test: quarterly. Cooling system inspection: monthly. Driver/firmware updates: planned maintenance windows.</li>
          <li>Target utilization: 80%+ GPU utilization average for well-run cluster (training). Inference: optimize for latency, not utilization.</li>
        </ul>
      </section>

      {/* ─── COST ANALYSIS ─────────────────────────────────────────────── */}
      <section id="cost-analysis">
        <h2 style={S.h2}>Cost Analysis — GPU Infrastructure Economics</h2>
        <Callout type="warning" title="Pricing Changes Rapidly">
          GPU pricing changes rapidly depending on supply, demand, and generation. Numbers neeche indicative hain 2024-25 ke liye — always verify current market pricing aur vendor quotes before procurement decisions.
        </Callout>
        <ComparisonTable
          title="Hardware Costs (Approximate, 2024-25 — Verify Before Purchasing)"
          headers={["Hardware", "Approx. Cost (USD)", "Notes"]}
          rows={[
            ["NVIDIA H100 SXM5 80GB (single)", "$25,000–35,000", "Price varies — supply-demand sensitive"],
            ["DGX H100 (8× H100, complete server)", "$300,000–400,000", "Premium for turnkey solution"],
            ["OEM HGX H100 server", "$250,000–320,000", "Dell/Supermicro/HPE — verify per vendor"],
            ["AMD Instinct MI300X 192GB", "$15,000–20,000", "Lower per unit vs H100"],
            ["Mellanox QM9790 NDR IB Switch", "$50,000–100,000", "Per switch — varies by port count"],
          ]}
        />
        <ComparisonTable
          title="Operating Costs — 100 DGX H100 Servers (India Estimates)"
          headers={["Cost Item", "Annual Estimate", "Notes"]}
          rows={[
            ["Electricity (power)", "~Rs. 70 crore", "At Rs. 8/kWh industrial rate, ~10kW × 100 servers"],
            ["Cooling overhead (PUE 1.3)", "+30% power cost", "~Rs. 21 crore additional"],
            ["AI infrastructure engineer", "Rs. 30–80 lakh/year", "Per experienced engineer — team of 5-10 needed"],
            ["Maintenance contracts", "3-5% of hardware/year", "Varies by vendor and SLA"],
          ]}
        />
        <p style={S.p}>
          <strong>GPU utilization aur ROI:</strong> Idle GPUs = wasted money. Target: 80%+ average utilization through Slurm/Kubernetes scheduling, mixed workloads (training + inference on same cluster at different priorities), MIG for smaller workloads. Chargeback: track per-team GPU usage, create internal accountability.
        </p>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting — Common Problems</h2>
        <ComparisonTable
          headers={["Problem", "Root Cause", "Diagnosis Command", "Resolution"]}
          rows={[
            ["GPU Not Detected", "Driver not installed, PCIe slot issue, power not connected", "lspci | grep -i nvidia\ndmesg | grep -i nvidia", "Reinstall drivers, reseat GPU, check 8-pin PCIe power connectors"],
            ["Temperature Too High / Throttling", "Fan failure, DLC flow rate low, airflow blocked", "nvidia-smi -q -d TEMPERATURE\nnvidia-smi dmon -s pc", "Check fan health, DLC water flow, clean filters, check ambient temp"],
            ["CUDA Out of Memory (OOM)", "Model + batch + sequence too large for HBM", "Check model size × precision × batch size", "Reduce batch, enable gradient checkpointing, use FP16/BF16, quantize"],
            ["Low GPU Utilization (training)", "Data loading bottleneck, small batch, comm overhead", "nvidia-smi dmon, PyTorch Profiler", "Increase DataLoader workers, prefetch data, increase batch size"],
            ["Training Job Hangs", "NCCL initialization failure — network issue", "NCCL_DEBUG=INFO, check ibstat, ping between nodes", "Check IB link status, firewall rules, MASTER_ADDR/PORT env vars"],
            ["NVLink / NCCL Error", "NVLink hardware error, IB cable issue", "nvidia-smi nvlink --errorcounters\nibstat, ibping", "Check NVLink error counters, IB link status, firewall rules"],
            ["Memory Leak (memory grows)", "Hanging requests, KV cache not freed (inference)", "Monitor memory over time, check active processes", "Request timeout enforcement, restart serving instance"],
          ]}
        />
      </section>

      {/* ─── FUTURE GPUS ───────────────────────────────────────────────── */}
      <section id="future-gpus">
        <h2 style={S.h2}>Future GPUs — What&apos;s Coming</h2>
        <ul style={S.ul}>
          <li><strong>B200 (Blackwell) — Current/Near-term:</strong> 192GB HBM3e per GPU, NVLink 5.0 (1.8 TB/s bidirectional total per GPU), higher compute vs H100 across all precisions, FP4 support. GB200 NVL72: rack-scale unified computing.</li>
          <li><strong>Rubin (2025-26):</strong> Next architecture after Blackwell. NVIDIA annual cadence. Expected: higher HBM capacity, further AI precision optimizations.</li>
          <li><strong>AMD MI350 / MI400:</strong> Next AMD generations. Continued ROCm improvement. Genuine competition growing for memory-heavy workloads.</li>
          <li><strong>Intel Gaudi 3:</strong> Competitive for specific LLM training. Lower cost than H100 for some workloads. Intel ka pricing advantage + ecosystem improvement strategy.</li>
          <li><strong>Trend — Compute Density Increasing:</strong> H100 era: ~10kW per 8-GPU server. B200 NVL72: hundreds of kW per rack. Future: higher still. DC infrastructure must plan for this trajectory. If designing facility today: plan for 2-3× higher density than current needs.</li>
          <li><strong>Trend — Memory Growing:</strong> H100: 80GB HBM3 → B200: 192GB → future higher. LLM sizes growing → more HBM needed per GPU. 405B model at FP16 = 810GB. Today: needs 11 H100s. Future: potentially fits in 4-5 B200s.</li>
          <li><strong>Trend — GPU-CPU Integration:</strong> GB200 NVL72: Grace CPU + Blackwell GPU in same package with NVLink — reduces PCIe bottleneck. Tighter integration is the future — CPU aur GPU increasingly one accelerated computing platform.</li>
        </ul>
      </section>

      {/* ─── INTERVIEW QUESTIONS ───────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        {[
          {
            q: "CPU aur GPU mein fundamental difference kya hai aur AI ke liye GPU kyun better hai?",
            a: "CPU few powerful cores ke saath complex, varied workloads handle karta hai — low latency per task, complex branching, decision making. GPU thousands of lightweight arithmetic execution units ke saath same operation at massive parallelism pe karta hai. AI neural networks ka core operation matrix multiplication hai — same operation applied to millions of numbers simultaneously. Yeh GPU ke SIMT architecture ke liye tailor-made hai. CPU pe 70B model forward pass: impractically slow. GPU pe: seconds. Hardware architecture perfectly matches workload requirements. HBM memory (3.35 TB/s bandwidth) ensure karta hai ki data GPU cores tak fast pohonche — memory bandwidth often the actual bottleneck, not compute.",
          },
          {
            q: "Tensor Core kya hai aur regular CUDA Core se kaise alag hai?",
            a: "CUDA Core ek lightweight arithmetic execution unit hai — general FP32/FP64 ya integer math karta hai. Yeh CPU core nahi hai — CPU core se direct comparison nahi karna chahiye. Tensor Core specialized matrix multiplication hardware hai jo NVIDIA GPUs mein specifically neural network acceleration ke liye designed hai. Neural network layers essentially matrix multiplications hain. Tensor Cores ne GPU AI performance significantly accelerate kiya vs CUDA Cores alone — actual improvement depends on architecture, workload, matrix size, aur precision (FP16/BF16/FP8). H100 pe: ~67 TFLOPS FP32 (CUDA Cores) vs ~3,958 TFLOPS FP8 Tensor Core sparse. Both types run simultaneously — Tensor Cores handle heavy matrix math, CUDA Cores handle everything else.",
          },
          {
            q: "HBM kya hai aur GPU ke liye kyun critical hai?",
            a: "HBM (High Bandwidth Memory) ek 3D-stacked memory technology hai jo GPU chip ke saath same package mein integrated hoti hai using Through-Silicon Vias. Primary advantage: extremely high memory bandwidth. HBM3 (H100): 3.35 TB/s bandwidth. Traditional DDR memory: ~100 GB/s. Latency improvement bhi exist karta hai lekin bandwidth hi major benefit hai. LLM inference bandwidth-bound hoti hai — model weights har step pe memory se read karne padte hain. Higher bandwidth = more tokens per second = lower cost per inference. HBM capacity (80GB H100, 192GB B200/MI300X) determines which models fit without tensor parallelism.",
          },
          {
            q: "NVLink aur PCIe mein kya difference hai?",
            a: "PCIe standard interface hai GPU ka CPU aur system se connection ke liye — H100 pe PCIe Gen5 x16: 64 GB/s each direction, 128 GB/s bidirectional total. GPU-to-GPU communication PCIe se: GPU1 → CPU → GPU2 — two hops, slow. NVLink direct GPU-to-GPU interconnect hai — H100 NVLink 4.0: 900 GB/s bidirectional total per GPU. NVSwitch GPU interconnect switch hai jo sab GPUs ko ek server mein connect karta hai — yeh Ethernet switch nahi hai. NVLink tensor parallelism enable karta hai — single neural network layer multiple GPUs pe split ho sakti hai efficiently. Server-to-server communication InfiniBand use karta hai.",
          },
          {
            q: "MIG kya hai aur kab use karna chahiye?",
            a: "MIG (Multi-Instance GPU) H100 pe available feature hai jo ek physical GPU ko up to seven isolated GPU instances mein partition karta hai depending on selected profile — hardware-level isolation. Har instance ka dedicated SM portion, HBM memory slice, compute engines. MIG use karo when: development aur testing workflows, multiple teams resources share kar rahe hain, multi-tenant inference serving with isolation. MIG use mat karo when: large model training (full GPU ya multi-GPU needs), maximum single-workload throughput. Traditional GPU sharing without MIG: no memory isolation — security risk, unpredictable performance. MIG: hardware-level isolation, safe for production multi-tenant use.",
          },
          {
            q: "Production GPU cluster mein kaunse metrics sabse important hain?",
            a: "Top metrics: (1) GPU Utilization — training target 80-95%, inference intentionally lower for latency — low inference utilization mat ghata to panic. (2) GPU Temperature — throttling at 83°C causes performance drops — cooling issues early detect karo. (3) ECC Uncorrectable Errors (DBE) — any DBE = immediate investigation — hardware degradation. (4) HBM Memory Utilization — above 95% = OOM risk. (5) NVLink Bandwidth drops — communication issues. (6) Power Draw — near TDP consistently. (7) SM Clock Speed drops — indicates thermal or power throttling. DCGM → Prometheus → Grafana standard monitoring stack.",
          },
          {
            q: "DGX aur HGX mein kya difference hai?",
            a: "DGX NVIDIA ka complete integrated AI server hai — GPUs, CPU, DRAM, NVMe, networking, software — sab configured aur tested. HGX woh GPU baseboard hai jo OEM manufacturers apne servers mein use karte hain. Same GPU performance (same H100 chips). Specifications vary depending on DGX generation and configuration — always verify NVIDIA docs. DGX: turnkey, premium, faster deployment, full NVIDIA support. HGX-based OEM servers: more customizable, often lower cost, vendor support, better for large scale with custom requirements. Both valid — choice depends on team capability, scale, aur deployment timeline.",
          },
          {
            q: "GPU OOM error aane pe kya karte hain?",
            a: "Diagnosis pehle: model size × precision × batch size × sequence length = total HBM requirement calculate karo. Then systematically: (1) Reduce batch size — simplest. (2) Enable gradient checkpointing — recompute activations vs store, trades compute for memory. (3) Switch to FP16/BF16 from FP32 — 2× memory reduction. (4) Quantization for inference — INT8 ya INT4. (5) Model parallelism — tensor parallel ya pipeline parallel. (6) CPU offloading — DeepSpeed ZeRO-Infinity. (7) Reduce sequence length. Profile first with PyTorch memory profiler — understand exactly what is consuming memory before optimizing blindly.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Simple Definition"]}
          rows={[
            ["CUDA", "NVIDIA ka software framework jo developers ko GPU pe programs likhne deta hai. Sirf NVIDIA GPUs pe run hota hai."],
            ["CUDA Core", "GPU ka lightweight arithmetic execution unit — simple floating-point ya integer math. CPU core nahi hai — direct comparison misleading hoga."],
            ["DGX", "NVIDIA ka complete, integrated AI server system — GPUs, CPU, networking, storage, software sab included. Specifications vary by generation."],
            ["DLC (Direct Liquid Cooling)", "Cooling method jahan cold plate directly GPU die pe hoti hai — primarily cold plate cooling. 40kW+ racks ke liye mandatory."],
            ["ECC (Error Correcting Code)", "Memory error detection. SBE (single-bit): auto-corrected. DBE (double-bit): hardware error — immediate action needed."],
            ["FLOPS / TFLOPS", "Floating Point Operations Per Second. AI GPU performance measure. Trillion FLOPS = 1 TFLOPS. Note: always check precision (FP16, FP8, etc.) when comparing."],
            ["GPC (GPU Division)", "Graphics Processing Cluster — GPU chip ka highest-level organizational unit. Contains multiple SMs. H100: 8 GPCs."],
            ["HBM (Fast GPU Memory)", "High Bandwidth Memory — 3D-stacked memory directly next to GPU chip. Primary advantage: extremely high bandwidth (3.35 TB/s on H100)."],
            ["HGX", "NVIDIA GPU baseboard — OEM manufacturers isse apne AI servers mein install karte hain. Same GPU chips as DGX, different server packaging."],
            ["InfiniBand", "High-speed network technology GPU clusters mein use hota hai server-to-server communication ke liye. NDR: 400 Gbps per port."],
            ["MIG (Multi-Instance GPU)", "H100 feature — physical GPU ko up to seven isolated instances mein partition karo depending on selected profile. Hardware-level isolation."],
            ["NCCL", "NVIDIA Collective Communications Library — multi-GPU communication operations (All-Reduce, Broadcast) handle karta hai automatically."],
            ["NVLink", "NVIDIA GPU-to-GPU direct interconnect — H100: 900 GB/s bidirectional total. Much faster than PCIe for GPU-to-GPU."],
            ["NVSwitch", "Dedicated GPU interconnect switch inside GPU servers — NOT Ethernet switch. Routes NVLink connections between all GPUs in same server."],
            ["PCIe (PCI Express)", "Standard interface GPU ka CPU se connection — H100: Gen5 x16 = 64 GB/s each direction, 128 GB/s bidirectional total."],
            ["ROCm", "AMD ka open-source GPU computing platform — alternative to CUDA for AMD GPUs. Improving significantly since 2024."],
            ["SM (Work Unit / Streaming Multiprocessor)", "GPU ka fundamental compute unit — contains CUDA Cores, Tensor Cores, register file, shared memory, warp schedulers. H100: 132 SMs."],
            ["SIMT (Single Instruction, Multiple Threads)", "GPU ka execution model — ek instruction issue hoti hai aur 32 threads (ek Warp) simultaneously usi instruction ko alag-alag data pe execute karte hain."],
            ["TDP (Thermal Design Power)", "Maximum sustained power consumption. H100 SXM5: 700W. Plan cooling aur power infrastructure accordingly."],
            ["Tensor Core", "Specialized matrix multiplication hardware in NVIDIA GPUs. Key AI accelerator. Actual performance improvement depends on architecture, workload, matrix size, and precision."],
            ["Warp", "Group of 32 GPU threads jo same instruction simultaneously execute karte hain — SIMT model. Scheduling ka basic unit."],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>GPU ne AI ko possible banaya — parallel architecture (thousands of lightweight arithmetic units) exactly matches neural network computation ka pattern. Yeh accident nahi tha, lekin originally planned bhi nahi tha. AlexNet 2012 ne yeh connection clearly demonstrate kiya.</li>
          <li>CUDA Core ek lightweight arithmetic execution unit hai — CPU core se direct comparison nahi karna chahiye. Tensor Core specialized matrix multiplication hardware hai jo actual AI performance deliver karta hai — improvement several to tens of times faster possible hai depending on architecture, workload, matrix size, aur precision used.</li>
          <li>HBM ki primary advantage extremely high memory bandwidth hai — 3.35 TB/s vs ~100 GB/s regular DDR. LLM inference bandwidth-bound hoti hai. Higher HBM bandwidth directly = more tokens per second = lower cost per inference. HBM capacity (80GB H100 vs 192GB B200/MI300X) determines which models fit without multi-GPU tensor parallelism.</li>
          <li>NVLink (900 GB/s bidirectional total per GPU) aur NVSwitch (GPU interconnect switch — NOT Ethernet) ne multi-GPU training feasible banaya. PCIe Gen5 (128 GB/s bidirectional total) GPU-to-GPU ke liye sufficient nahi hai large model training mein. NVLink-enabled DGX/HGX servers use karo training ke liye.</li>
          <li>MIG hardware-level isolation provide karta hai — up to seven isolated GPU instances depending on selected profile (H100). Production multi-tenant inference: MIG safe hai. Training: dedicated physical GPUs preferred.</li>
          <li>DGX complete server hai (turnkey), HGX GPU baseboard hai (OEM uses karte hain). Same GPU performance — different packaging, support, flexibility, cost. Specifications vary by generation — always verify NVIDIA documentation. NVSwitch GPU interconnect switch hai, Ethernet switch nahi.</li>
          <li>Inference workloads mein GPU utilization intentionally low hoti hai — latency throughput se zyada important hai. Low utilization dekh ke panic mat karo inference serving mein. Training mein: 80-95% utilization target karo.</li>
          <li>Direct Liquid Cooling (primarily Cold Plate Cooling) 40kW+ rack density pe mandatory hai. H100 server: ~10kW. Ek rack: ~80kW. 100 racks: ~8MW compute power. Facility assessment — power, cooling, floor load — before GPU procurement, not after.</li>
          <li>GPU pricing changes rapidly depending on supply, demand, and generation. Always verify current market pricing before procurement. ROCm improving significantly since 2024 — AMD MI300X seriously evaluate karo for memory-heavy LLM inference where 192GB HBM is advantageous.</li>
          <li>DC engineers ke liye: GPU servers 40-100kW+ per rack demand karte hain — unprecedented density. DLC mandatory. Floor load assessment zaroori hai. InfiniBand fabric planning upfront karo. AI factory design trajectory: compute density per rack increasing every generation — plan for 2-3× higher density than current needs today.</li>
        </ul>
      </section>

    </article>
  );
}
