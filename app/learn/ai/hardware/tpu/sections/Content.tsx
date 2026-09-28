"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { tpuContent } from "@/content/tpu";

import CpuGpuTpuDiagram from "../svg/CpuGpuTpuDiagram";
import TpuChipArchitecture from "../svg/TpuChipArchitecture";
import SystolicArrayDiagram from "../svg/SystolicArrayDiagram";
import MatrixMultiplyFlow from "../svg/MatrixMultiplyFlow";
import TpuPodArchitecture from "../svg/TpuPodArchitecture";
import TpuInterconnect from "../svg/TpuInterconnect";
import CloudTpuDeployment from "../svg/CloudTpuDeployment";
import TpuTrainingPipeline from "../svg/TpuTrainingPipeline";
import TpuInferencePipeline from "../svg/TpuInferencePipeline";
import GoogleAiInfraStack from "../svg/GoogleAiInfraStack";

void tpuContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          In 2016, Google built a chip that does exactly one job — matrix multiplication (multiplying two number grids in a specific way) — and it does that job so fast that the whole AI world paused for a moment to take notice. That chip was called: <strong>TPU — Tensor Processing Unit</strong> (a specialized AI calculator chip).
        </p>
        <p style={S.p}>
          The TPU seems hard to understand — "tensor", "systolic array", "MXU" — all these terms sound confusing. But once you understand what it actually does in simple language, everything falls into place.
        </p>
        <p style={S.p}>
          That's exactly what this article does. A clear explanation for beginners. Full technical depth for engineers. Both, in one article.
        </p>
        <Callout type="important" title="Ek Line Summary">
          A TPU is a specialist chip that does only AI math (matrix multiplication — multiplying number grids) — but at this one job it is far more efficient than a GPU or CPU for specific workloads. Google runs all its AI products — Search, Translate, Gemini — on this chip.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Students and Freshers:</strong> What AI hardware is, what a TPU is, how it differs from a GPU — you'll understand it completely from scratch.</li>
          <li><strong>AI/ML Engineers:</strong> When to use a TPU, when a GPU is better, how XLA (the code translator) works, how to use TPU with PyTorch.</li>
          <li><strong>Data Center Engineers:</strong> How a TPU is deployed in a data center, what the power and cooling requirements are, how Google's infrastructure works — especially from a DC perspective.</li>
          <li><strong>Cloud Engineers:</strong> Cloud TPU configurations, cost comparison, when to use on-demand vs reserved.</li>
          <li><strong>Technical Architects:</strong> Build vs buy decision — when a GPU cluster is better, when Cloud TPU is better, enterprise deployment roadmap.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>Why the TPU was built — what real problem it had to solve</li>
          <li>CPU vs GPU vs TPU — the exact difference between all three in simple language</li>
          <li>What is a Systolic Array (an assembly-line math machine) — explained through a factory analogy</li>
          <li>MXU, VPU, HBM — what every part inside a TPU does, in plain English</li>
          <li>The BFloat16 number format — why it's special for TPU, explained simply</li>
          <li>TPU Pod — how a single chip becomes a 4,096-chip supercomputer</li>
          <li>ICI Interconnect — how chips talk to each other directly</li>
          <li>The XLA compiler — how your Python code reaches the TPU</li>
          <li>Cloud TPU — the complete picture of Google's rental service with real costs</li>
          <li>TPU vs GPU — a practical guide to which one to choose and when</li>
          <li>Gemini training — real world example at maximum scale</li>
          <li>Data center infrastructure, power (kW), cooling, rack density</li>
          <li>Cost analysis and the future roadmap</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ─────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="ai-gpu" variant="inline" /> — GPU architecture, CUDA Cores, Tensor Cores, HBM, NVLink, DGX</li>
          <li><strong>Current:</strong> TPU — Google's custom AI chip, systolic array, TPU Pod, Cloud TPU</li>
          <li><strong>Next:</strong> <TopicLink slug="ai-accelerators" variant="inline" /> — other AI chips: AWS Trainium, Cerebras, Intel Gaudi</li>
          <li><strong>Related:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="deep-learning" variant="inline" />, <TopicLink slug="llm" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ──────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          In 2013, Google's engineers ran a scary calculation. If people started widely using Google's voice search — just one feature — how many computers would they need?
        </p>
        <p style={S.p}>
          The answer was: so many that all of Google's existing data centers put together still wouldn't be enough. Just for voice search. For one product.
        </p>
        <p style={S.p}>
          The problem was simple: traditional chips — CPUs (general-purpose computer brains) and GPUs (parallel math chips originally built for graphics) — weren't designed for AI. They could do AI work, but it took a lot of electricity and time even for a simple AI calculation.
        </p>
        <p style={S.p}>
          Google's engineers thought of a different approach: what if we built a chip that does only AI's core operation — <strong>matrix multiplication (multiplying two number grids)</strong> — but does that one job with extraordinary speed and efficiency? Drop everything else.
        </p>
        <p style={S.p}>
          Three years later, in 2016, the first TPU was deployed in Google's data centers. Since then, Google Search, Google Translate, Google Photos, Gmail Smart Reply, and today Gemini — all run on TPU.
        </p>
        <Callout type="best-practice" title="Why This Matters for You">
          If you're an AI engineer — TPU could be your next compute platform. If you're a DC engineer — designing TPU-grade infrastructure (high-density power, mandatory liquid cooling) will be your job in the future. If you're a student — this is a fundamental concept needed to understand AI hardware.
        </Callout>
      </section>

      {/* ─── WHY TPU EXISTS ────────────────────────────────────────────── */}
      <section id="why-tpu-exists">
        <h2 style={S.h2}>Why TPU Exists — The Problem It Solved</h2>
        <p style={S.p}>
          First let's understand what the problem was — through a simple example.
        </p>
        <p style={S.p}>
          Imagine a hospital. Doctors use surgical tools. Now imagine the hospital replaced its surgical tools with Swiss Army Knives — because a Swiss Army Knife can do a lot of things. Technically it would work. But the operation would be slow, the surgeon would tire out, and results wouldn't be as precise.
        </p>
        <p style={S.p}>
          That was the situation with GPUs and AI. A GPU is a powerful parallel processor but it was designed for graphics — 3D rendering, pixel shading, display output. Using it for AI training worked, but it wasn't efficient.
        </p>
        <p style={S.p}>
          <strong>The core insight:</strong> 90%+ of neural network training and inference work is one thing — <strong>matrix multiplication</strong> (multiplying two number grids). One neural network layer = input matrix × weight matrix. Generating one LLM response = millions of these multiplications.
        </p>
        <p style={S.p}>
          <strong>Google's solution:</strong> Build a chip where 90% of the die area (the chip's physical space) is specifically for matrix multiplication. Nothing for graphics. Minimum for general computing. Only AI math.
        </p>
        <p style={S.p}>
          <strong>The result:</strong> TPU v1 (2016) reduced Google's data center footprint by 7x for the same AI workload. The same work in 7x fewer servers. 7x less electricity. 7x less cooling cost.
        </p>
        <Callout type="important" title="The Economics — Why This Matters">
          Google processes billions of AI queries daily — Search, Translate, Photos, Maps. At this scale, a 7x efficiency improvement = billions of dollars saved annually. Just on the electricity bill. That was the driving force behind Google investing so much in TPU development.
        </Callout>
      </section>

      {/* ─── CPU GPU TPU ───────────────────────────────────────────────── */}
      <section id="cpu-gpu-tpu">
        <h2 style={S.h2}>CPU vs GPU vs TPU — The Big Picture</h2>
        <p style={S.p}>
          You have three tools available for AI. All three are quite different. Let's understand them simply:
        </p>
        <p style={S.p}>
          <strong>CPU (Central Processing Unit):</strong> A highly intelligent generalist. It can do any job — run an operating system, database queries, web server, complex logic. But it can only do a little in parallel at a time (typically 8 to 128 cores).
        </p>
        <p style={S.p}>
          <strong>GPU (Graphics Processing Unit):</strong> Thousands of simple workers all working together. Originally built for graphics — coloring millions of pixels simultaneously. Excellent for AI because it's the same parallel pattern — same math, lots of data, all at once.
        </p>
        <p style={S.p}>
          <strong>TPU (Tensor Processing Unit):</strong> An extreme specialist. Only matrix multiplication — and it does that one job even more efficiently than a GPU. It can't do anything else. Not a Swiss Army Knife — a surgical scalpel.
        </p>
        <Figure caption="CPU (few powerful cores for complex decisions) vs GPU (thousands of simple cores for parallel math) vs TPU (Systolic Array grid — purpose-built for matrix multiplication, the core of AI). Each tool has a completely different specialty.">
          <CpuGpuTpuDiagram />
        </Figure>
        <ComparisonTable
          title="CPU vs GPU vs TPU — Key Differences"
          headers={["Property", "CPU", "GPU (H100)", "TPU (v4)"]}
          rows={[
            ["Designed for", "General computing — any task", "Graphics + parallel compute", "AI matrix math only"],
            ["Core type", "Few complex cores (8–128)", "Thousands of CUDA Cores", "Systolic Array cells (65,536)"],
            ["AI performance", "~1 TFLOPS", "~275 TFLOPS (BF16)", "~275 TFLOPS (BF16) per chip"],
            ["Memory type", "DDR5 system RAM (~100 GB/s)", "HBM3 80GB (~3.35 TB/s)", "HBM2 32GB (~900 GB/s)"],
            ["Software", "Any language", "CUDA (NVIDIA only)", "TensorFlow, JAX, XLA"],
            ["Flexibility", "Maximum — any program", "High — any AI workload", "Low — specialist only"],
            ["Where available", "Everywhere", "Most cloud providers + on-prem", "Google Cloud only"],
            ["Buy on-premises?", "Yes", "Yes — DGX, HGX servers", "No — Google Cloud only"],
            ["Best AI use case", "Data preprocessing, small serving", "Any AI — research + production", "TF/JAX training at scale"],
          ]}
        />
      </section>

      {/* ─── TPU HISTORY ───────────────────────────────────────────────── */}
      <section id="tpu-history">
        <h2 style={S.h2}>History of TPU — v1 to v6</h2>
        <p style={S.p}>
          The TPU isn't a stand-still product — each generation gets dramatically better. Let's look at this evolution:
        </p>
        <ComparisonTable
          title="TPU Version History"
          headers={["Version", "Year", "Biggest New Thing", "Performance", "Memory"]}
          rows={[
            ["TPU v1", "2016", "First TPU — inference only, no training support", "92 TOPS (INT8)", "8GB DRAM"],
            ["TPU v2", "2017", "Training support added + BFloat16 + HBM (fast memory)", "45 TFLOPS BF16", "16GB HBM"],
            ["TPU v3", "2018", "8× more powerful than v2, better HBM, liquid cooling", "420 TFLOPS BF16", "32GB HBM2"],
            ["TPU v4", "2021", "Optical fiber ICI links, 4096-chip Pods possible", "275 TFLOPS BF16", "32GB HBM2"],
            ["TPU v5e", "2023", "Best cost-per-FLOP, most accessible, 256-chip Pods", "~197 TFLOPS BF16", "16GB HBM2e"],
            ["TPU v5p", "2023", "Maximum performance, 95GB memory, large frontier models", "~459 TFLOPS BF16", "95GB HBM3"],
            ["Trillium (v6e)", "2024", "~4.7× faster than v5e (Google announced)", "Higher than v5p", "Higher capacity"],
          ]}
        />
        <p style={S.p}>
          Notice: v1 could only do inference (using a model) — not training (building a model). Training support came with v2. BFloat16 format (AI's preferred number format) was introduced by v2. Optical interconnect arrived in v4 — that innovation made 4,096-chip Pods possible. This evolution shows how the TPU went from a narrow tool to a full AI training platform.
        </p>
      </section>

      {/* ─── MATRIX MULTIPLICATION ─────────────────────────────────────── */}
      <section id="matrix-multiplication">
        <h2 style={S.h2}>Matrix Multiplication — The TPU's Core Job</h2>
        <p style={S.p}>
          First, let's understand what <strong>matrix multiplication</strong> (multiplying two number grids) actually is — in very simple language. Then we'll understand why it's so important in AI.
        </p>
        <p style={S.p}>
          <strong>A simple analogy:</strong> Imagine 3 friends — Amit, Raj, and Priya. All three visit 2 shops. Each shop has different prices. You need to calculate the total spend. One table has how much each bought (rows = people, columns = items). The other table has prices (rows = items, columns = shops). Multiply them in a specific way — you get the total spend per person per shop. That is a matrix multiplication. Simple shopping math.
        </p>
        <p style={S.p}>
          <strong>Why it matters in AI:</strong> Every neural network layer is a matrix multiplication. Input data is a matrix (number grid). Model weights — the parameters learned during training — are a matrix. Multiply them — you get the output. An LLM (Large Language Model — like ChatGPT) has thousands of layers. Each layer = one or more matrix multiplications. Generating a single response = millions of matrix multiplications.
        </p>
        <Figure caption="Matrix A (Input Data — the words/tokens you sent) × Matrix B (Model Weights — what the AI learned during training) = Matrix C (Output — the AI's understanding). This exact operation repeats millions of times per AI response. TPU's Systolic Array is purpose-built to do exactly this.">
          <MatrixMultiplyFlow />
        </Figure>
        <Callout type="best-practice" title="The Scale That Justifies a Custom Chip">
          A GPT-3 (175 billion parameters) forward pass: roughly 350 billion multiply-add operations. At 70 milliseconds per response: ~5 trillion operations per second needed. TPU v4 Pod (4,096 chips): ~1 exaflop = 1 million TFLOPS = 1,000,000,000,000,000 operations per second. This scale shows why Google built a custom chip — standard chips weren't economically viable at this scale.
        </Callout>
      </section>

      {/* ─── SYSTOLIC ARRAY ────────────────────────────────────────────── */}
      <section id="systolic-array">
        <h2 style={S.h2}>Systolic Array — How TPU Does Math</h2>
        <p style={S.p}>
          <strong>Systolic Array</strong> — this is the technique that makes the TPU so fast at matrix multiplication. The name sounds scary but the concept is quite simple. Let's start with a real-world analogy.
        </p>
        <p style={S.p}>
          <strong>Car factory analogy:</strong> Imagine a car assembly line. Station 1 fits the engine. Station 2 fits the doors. Station 3 paints the car. Each station does its job and passes the car to the next station. And this assembly line works like a pipeline — car 10 at station 1, car 9 at station 2, car 8 at station 3 — all simultaneously. Not one car at a time — work is happening at a different stage for each one, all together.
        </p>
        <p style={S.p}>
          A Systolic Array works exactly like this. Numbers flow through a 2D grid — from the left and from the top. Each cell does its job (multiply two numbers, add to a running total), and passes the result to the next cell. All cells work simultaneously on different numbers — a massive parallel pipeline.
        </p>
        <Figure caption="Systolic Array: Numbers flow in from the left (Row values — think Matrix A) and from the top (Column values — think Matrix B). Each small cell multiplies two numbers and passes results to the next cell. All cells work at the same time — like 65,536 assembly line workers. Real TPU v4 has a 256×256 grid = 65,536 cells simultaneously working.">
          <SystolicArrayDiagram />
        </Figure>
        <p style={S.p}>
          <strong>Why this is fast — the key insight:</strong> In the traditional approach — do a multiplication, store the result in memory, load the next number from memory, then multiply. Lots of memory trips. Memory access is the slowest operation in computing. In a Systolic Array, numbers flow continuously cell-to-cell — they don't go back to memory. Memory trips are dramatically reduced. That's why the TPU does matrix math so fast.
        </p>
        <p style={S.p}>
          <strong>Real numbers — TPU v4:</strong> 256 × 256 = 65,536 multiply-accumulate cells. All working together. In a single clock cycle: 65,536 multiplications + 65,536 additions = 131,072 operations. At 1 GHz clock speed: 131 billion operations per second — from the systolic array alone.
        </p>
      </section>

      {/* ─── TPU CHIP ARCHITECTURE ─────────────────────────────────────── */}
      <section id="tpu-chip-architecture">
        <h2 style={S.h2}>TPU Chip Architecture — Inside the Silicon</h2>
        <p style={S.p}>
          A TPU chip isn't just a systolic array. It has several parts that all work together — like different departments in an office. Each department has its own job.
        </p>
        <Figure caption="Inside One TPU Chip: MXU (Matrix Math Engine — the main work happens here) at center, VPU (Other Math Helper) for activation functions, Fast On-Chip Memory (SRAM) that feeds the MXU, Control Unit to manage everything, Fast GPU-style Memory (HBM) on both sides storing the AI model, and Direct Links to Neighbour Chips (ICI) at the bottom.">
          <TpuChipArchitecture />
        </Figure>
        <p style={S.p}>
          Think of it like a school: <strong>MXU</strong> (Matrix Multiply Unit — matrix math engine) is the main classroom where most learning happens. <strong>VPU</strong> (Vector Processing Unit — other math helper) is a specialist lab for different types of math. <strong>SRAM</strong> (Fast On-Chip Memory) is the teacher&apos;s desk — immediate access, very fast. <strong>HBM</strong> (High Bandwidth Memory — Fast GPU-style Memory) is the school library — bigger but slightly further. <strong>ICI Links</strong> (Direct Links to Neighbour Chips) are doors connecting to other classrooms.
        </p>
      </section>

      {/* ─── MXU ───────────────────────────────────────────────────────── */}
      <section id="mxu">
        <h2 style={S.h2}>MXU — Matrix Multiply Unit</h2>
        <p style={S.p}>
          <strong>MXU (Matrix Multiply Unit)</strong> — this is the hardware block where the systolic array physically lives. The heart of the entire TPU chip. This is where all the matrix multiplication happens — AI's core operation.
        </p>
        <ul style={S.ul}>
          <li><strong>Size:</strong> TPU v4 has a 256×256 systolic array — meaning 65,536 individual multiply-accumulate cells, all working simultaneously.</li>
          <li><strong>Precision support:</strong> BFloat16 (primary for training — AI's preferred format), INT8 (8-bit integers for faster inference), INT32 (accumulation — storing running totals).</li>
          <li><strong>Data flow:</strong> Numbers flow in from HBM (fast memory) → through SRAM (on-chip fast cache) → into the systolic array → results accumulated → back to SRAM/HBM. This loop runs continuously.</li>
          <li><strong>Why so large:</strong> Die area (the chip's physical space) on a TPU is mostly reserved for the MXU — this design choice itself is what makes TPU a specialist. On a GPU, die area also goes to graphics, display controllers, rasterizers. On a TPU: only AI math.</li>
        </ul>
        <Callout type="important" title="MXU vs GPU Tensor Core — Key Difference">
          A GPU's Tensor Core also does matrix multiplication, but in smaller blocks. The TPU's MXU is a single large systolic array. The architectural approach is different: GPU = distributed many small matrix units (thousands of Tensor Cores); TPU = one large unified systolic array. Both are valid approaches — different tradeoffs.
        </Callout>
      </section>

      {/* ─── VPU ───────────────────────────────────────────────────────── */}
      <section id="vpu">
        <h2 style={S.h2}>VPU — Vector Processing Unit</h2>
        <p style={S.p}>
          <strong>VPU (Vector Processing Unit)</strong> — the TPU's secondary compute unit. It handles the math the MXU can't.
        </p>
        <p style={S.p}>
          After matrix multiplication, neural networks also do a few other operations — <strong>activation functions</strong> (like ReLU or GELU — these decide which neuron "fires"), <strong>softmax</strong> (to build a probability distribution), <strong>layer normalization</strong> (keeping training stable). These are per-element operations — processing each number individually.
        </p>
        <p style={S.p}>
          The VPU handles this work efficiently. The MXU and VPU can work in parallel — while the MXU is multiplying the matrix for layer N, the VPU is applying activation to layer N-1's output. This pipelining improves overall throughput.
        </p>
      </section>

      {/* ─── HBM IN TPU ────────────────────────────────────────────────── */}
      <section id="hbm-tpu">
        <h2 style={S.h2}>HBM Memory in TPU</h2>
        <p style={S.p}>
          <strong>HBM (High Bandwidth Memory)</strong> — this is "fast GPU-style memory" that is directly integrated with the TPU chip. We covered this in detail earlier in the <TopicLink slug="ai-gpu" variant="inline" /> article — the same technology is used in a TPU.
        </p>
        <p style={S.p}>
          <strong>Simple reminder — office analogy:</strong> Imagine you have two storage options. Option 1: a small tray on your desk — limited space but you can grab anything in a second. Option 2: a large storage room on another floor of the building — lots of space but you need to take the lift (slow). HBM is like the tray on your desk — right next to the chip, ultra-fast. Regular DRAM (on the motherboard) is like the other floor of the building — comparatively slow.
        </p>
        <ul style={S.ul}>
          <li><strong>Capacity:</strong> TPU v4: 32GB HBM2 per chip. TPU v5p: 95GB HBM3 per chip. Multiple chips = proportionally more total memory in a Pod.</li>
          <li><strong>Bandwidth:</strong> TPU v4 HBM: ~900 GB/s per chip — meaning 900 gigabytes of data can be transferred every second inside the chip.</li>
          <li><strong>What&apos;s stored in HBM:</strong> Model weights (the neural network's parameters — learned during training), activations (intermediate calculations during the forward pass), gradients (during training — backward pass numbers).</li>
          <li><strong>Memory constraint — a real problem:</strong> A 70B parameter model at BFloat16 = 140GB. A single TPU v4 chip only has 32GB of HBM. The model doesn't fit. Solution: model sharding — split the model across multiple chips. This is why a TPU Pod is needed for large models.</li>
        </ul>
      </section>

      {/* ─── BFLOAT16 ──────────────────────────────────────────────────── */}
      <section id="bfloat16">
        <h2 style={S.h2}>BFloat16 — TPU's Special Number Format</h2>
        <p style={S.p}>
          Numbers are stored in computers in binary (0s and 1s). More bits = more accurate number = more memory used = slower computation. An important discovery in AI training was: full accuracy (FP32 — 32 bits) isn't necessary. Approximate calculations also give the same quality results, and are much faster.
        </p>
        <p style={S.p}>
          <strong>A simple analogy:</strong> Imagine you put 2.71828 grams of salt in a recipe. Why? "Almost 3 grams" would give exactly the same result. This same approximation works in AI training — model quality barely changes but speed improves dramatically.
        </p>
        <ComparisonTable
          headers={["Format", "Total Bits", "Number Range", "Precision", "Best For"]}
          rows={[
            ["FP32 (Full Precision)", "32 bits", "Very large range (8 exponent bits)", "Very precise (23 mantissa bits)", "Scientific computing, highest accuracy"],
            ["FP16 (Half Precision)", "16 bits", "Limited range (5 exponent bits — overflow risk)", "Less precise (10 mantissa bits)", "Inference, some training"],
            ["BFloat16 (Brain Float 16)", "16 bits", "Same range as FP32 (8 exponent bits)", "Less precise (7 mantissa bits)", "AI training — Google's TPU choice"],
            ["INT8 (8-bit Integer)", "8 bits", "Small (integer only)", "Least precise", "Fast inference after quantization"],
          ]}
        />
        <p style={S.p}>
          <strong>Why BFloat16 is perfect for AI training:</strong> Number range matters in training — if the range is small, numbers can overflow (a number too big to represent = NaN error = training crash). A bit less precision typically has minimal impact on model quality. BFloat16 gives FP32-like range (8 exponent bits) but uses only 16 bits. Result: 2× less memory, 2× faster computation — minimal quality loss. Win-win.
        </p>
        <p style={S.p}>
          Google introduced BFloat16 with TPU v2 (2017). Today it has become the standard format for LLM training — NVIDIA's H100, AMD's MI300X — all support it natively. TPU started this trend and the rest of the industry followed.
        </p>
      </section>

      {/* ─── TPU INTERCONNECT ──────────────────────────────────────────── */}
      <section id="tpu-interconnect">
        <h2 style={S.h2}>TPU Interconnect — How Chips Talk to Each Other</h2>
        <p style={S.p}>
          A single chip is powerful but not enough. To scale — 4,096 chips together — chips need to talk to each other directly, fast and efficiently.
        </p>
        <Figure caption="ICI (Direct Chip-to-Chip Links): Each TPU chip has 6 high-speed direct connections to its neighbours in 3 directions (left-right, front-back, up-down) forming a 3D Donut Network (Torus). Any chip reaches any other chip in just a few hops. No external network switch needed — chips connect directly. TPU v4 uses light (optical fiber) instead of copper wire for these links.">
          <TpuInterconnect />
        </Figure>
        <p style={S.p}>
          <strong>ICI (Inter-Chip Interconnect)</strong> — this means "a direct connection between chips." It's a custom Google-designed system. In GPU clusters: when chips need to talk to each other, you have to buy external InfiniBand switches — expensive and complex. On a TPU: ICI connects chips directly — no external switch needed.
        </p>
        <ul style={S.ul}>
          <li><strong>6 links per chip:</strong> Every TPU chip has 6 direct connections — 2 links left-right (X-direction), 2 links front-back (Y-direction), 2 links up-down (Z-direction). Any chip can talk directly to its immediate neighbour.</li>
          <li><strong>3D Torus topology:</strong> "Torus" means donut shape. The last chip wraps around and connects to the first chip — in all three dimensions. This ensures any chip can communicate with any other chip in just a few hops. Imagine a globe where every city is directly connected to nearby cities and the edges wrap around — no dead ends.</li>
          <li><strong>Optical fiber (v4+):</strong> TPU v4 made a major innovation — using light (optical fiber) instead of copper wire for ICI links. Copper has limited bandwidth over distance. Optical fiber can communicate fast and with low latency even across a data center. This is why TPU v4's 4,096-chip Pods can span multiple racks across a data center.</li>
          <li><strong>Bandwidth:</strong> Hundreds of GB/s per direction per link — comparable to GPU's NVLink (900 GB/s total). But NVLink needs NVSwitch chips; ICI is direct.</li>
        </ul>
        <Callout type="important" title="ICI vs GPU InfiniBand — DC Engineer Perspective">
          GPU cluster: every server needs an InfiniBand NIC (network card), you have to buy external InfiniBand switches (worth lakhs), run cables, configure the switch fabric. TPU Pod: ICI is built into every chip, no external switches, Google-managed. For a DC engineer hosting GPU vs TPU infrastructure: GPU cluster = complex network cabinet design; TPU Pod = simpler internal connectivity, less external networking equipment needed within the Pod.
        </Callout>
      </section>

      {/* ─── TPU POD ───────────────────────────────────────────────────── */}
      <section id="tpu-pod">
        <h2 style={S.h2}>TPU Pod — Supercomputer from Individual Chips</h2>
        <p style={S.p}>
          A single TPU chip is powerful — but a 70B parameter model doesn't fit in one chip's 32GB of HBM, and training needs even more memory. That's why the <strong>TPU Pod</strong> concept was created — connect multiple chips together like a team.
        </p>
        <p style={S.p}>
          <strong>A simple analogy:</strong> There's a huge book — so big that one person can't hold it alone. Solution: 10 people each hold a different part of the book and read simultaneously — sharing the results. That's exactly what a TPU Pod does with model weights.
        </p>
        <Figure caption="TPU Pod scaling: 1 chip → Board (4 chips on one circuit board) → Server Rack (many boards) → Full Pod (up to 4,096 chips in TPU v4). All chips directly connected via ICI (Direct Chip-to-Chip Links) in a 3D Donut Network. TPU v4 Full Pod = ~1.1 EFLOPS total — this is where Google trains Gemini.">
          <TpuPodArchitecture />
        </Figure>
        <ComparisonTable
          title="TPU Pod Configurations"
          headers={["Pod Type", "Total Chips", "Peak Performance", "Used For"]}
          rows={[
            ["TPU v2 Pod", "512 chips", "~11.5 PFLOPS BF16", "Medium model training"],
            ["TPU v3 Pod", "1,024 chips", "~100 PFLOPS BF16", "Large model training"],
            ["TPU v4 Pod (full)", "4,096 chips", "~1.1 EFLOPS BF16", "Frontier models — Gemini scale"],
            ["TPU v5e slice (256)", "256 chips", "~50 PFLOPS BF16", "Cost-efficient medium training"],
            ["TPU v5p slice", "Configurable", "Higher per chip vs v5e", "High-performance large training"],
          ]}
        />
        <p style={S.p}>
          <strong>How a Pod works — practical example:</strong> Suppose you want to train a 70B parameter model. Model weights alone = 140GB at BFloat16. Plus gradients (another 140GB) + optimizer states (another 280GB) = 560GB minimum for training. Single TPU v4 chip has 32GB. Solution: split across 20+ chips — each chip holds a portion. ICI connects all chips so they can share intermediate results at high speed, every training step. The entire Pod behaves as one logical compute unit.
        </p>
      </section>

      {/* ─── TPU VERSIONS ──────────────────────────────────────────────── */}
      <section id="tpu-versions">
        <h2 style={S.h2}>TPU v1 to v5e — Version Comparison</h2>
        <p style={S.p}>
          Every version was a significant leap — not just an incremental improvement.
        </p>
        <ul style={S.ul}>
          <li><strong>TPU v1 (2016):</strong> The first TPU. Inference only (using an already-trained model) — couldn't do training. INT8 operations (8-bit integers). 8GB DRAM (not HBM — older, slower memory). Deployed for Google Search and Translate. Die area mostly went to the matrix multiply unit — the same philosophy that holds today. Once BFloat16 arrived, v1 quickly became outdated.</li>
          <li><strong>TPU v2 (2017):</strong> A game changer. Training support arrived — now models could be built. Introduced the BFloat16 format — an AI training standard that the GPU world eventually adopted too. HBM (High Bandwidth Memory — fast chip-adjacent memory) arrived — memory bandwidth dramatically improved. Liquid cooling became necessary — higher power meant more heat. 2 chips per board.</li>
          <li><strong>TPU v3 (2018):</strong> Roughly 8× more powerful than v2 per chip. Better HBM (HBM2). More advanced cooling systems. 4 chips per board. Early BERT and AlphaGo models were trained here.</li>
          <li><strong>TPU v4 (2021):</strong> A major architecture change. Optical fiber ICI — light instead of copper for chip-to-chip links — enabled 4,096-chip Pods across a full data center. Roughly 2× faster than v3 per chip, but Pod-scale = 10× more total compute available. PaLM (540B parameter model) and early Gemini versions were trained here.</li>
          <li><strong>TPU v5e (2023):</strong> "e" = efficiency. Best cost per FLOP — the most accessible pricing for developers. 256-chip Pods as standard configuration. Good for fine-tuning and medium-scale training. Most developers should pick this one for cost-performance.</li>
          <li><strong>TPU v5p (2023):</strong> "p" = performance. Higher compute, 95GB HBM3 per chip (vs 16GB in v5e). For large-scale frontier model training. Higher cost. For Gemini Ultra scale training.</li>
          <li><strong>Trillium / TPU v6e (2024):</strong> Announced at Google IO 2024. ~4.7× performance improvement over v5e claimed by Google. Details limited at time of writing — verify on Google Cloud documentation for current availability.</li>
        </ul>
      </section>

      {/* ─── SOFTWARE STACK ────────────────────────────────────────────── */}
      <section id="software-stack">
        <h2 style={S.h2}>Software Stack — TensorFlow, JAX, and XLA</h2>
        <p style={S.p}>
          Good hardware is nothing without software. How do you write code for a TPU — and which framework is best?
        </p>
        <ul style={S.ul}>
          <li><strong>TensorFlow (Google's original ML framework):</strong> Works natively with TPU. Use <code style={S.code}>tf.distribute.TPUStrategy</code> — the rest is handled automatically. Mature, stable, production-ready. A large chunk of Google's internal codebase is based on TF.</li>
          <li><strong>JAX (Google's newer research framework):</strong> NumPy-like syntax — if you know NumPy, you can learn JAX quickly. <code style={S.code}>jax.devices(&quot;tpu&quot;)</code> — the TPU is used automatically. Google internally now prefers JAX over TF for research. Gemini models were trained on JAX. If you want to use TPU, JAX is the best choice.</li>
          <li><strong>Keras (user-friendly wrapper):</strong> A high-level API that runs on top of TensorFlow. <code style={S.code}>model.compile(); model.fit()</code> — the simplest interface. A good starting point for beginners.</li>
          <li><strong>T5X / MaxText (Google&apos;s internal tools):</strong> Google's internal framework built specifically for training large transformer models. Used to train Gemini models. Available open-source on GitHub.</li>
          <li><strong>PyTorch (the community favorite):</strong> Doesn't run directly on TPU — it runs on CUDA (NVIDIA-specific). To run it on TPU you have to use torch_xla (a bridge library). More detail in the next section.</li>
        </ul>
      </section>

      {/* ─── XLA COMPILER ──────────────────────────────────────────────── */}
      <section id="xla-compiler">
        <h2 style={S.h2}>XLA Compiler — The Translator</h2>
        <p style={S.p}>
          You wrote code in Python. The TPU understands machine instructions — a very different language. Between the two sits the <strong>XLA (Accelerated Linear Algebra) compiler</strong> — a translator that converts your Python code into the TPU's language, and optimizes it along the way.
        </p>
        <p style={S.p}>
          <strong>Analogy — an experienced translator:</strong> You wrote a recipe in Hindi. The chef is Japanese. A basic translator would simply translate word-by-word. But an experienced translator (XLA) converts the recipe into Japanese and also merges inefficient steps — "chop the vegetable separately" + "add it to the pan a bit later" = "chop the vegetable straight into the pan." Better result, fewer steps.
        </p>
        <p style={S.p}>
          <strong>What XLA actually does:</strong>
        </p>
        <ul style={S.ul}>
          <li>Analyzes your Python code's <strong>computation graph</strong> (a map of all the operations)</li>
          <li><strong>Operation fusion:</strong> Merges multiple small operations into one bigger operation — reducing memory trips</li>
          <li><strong>Memory layout optimization:</strong> Arranges data in the optimal format for the TPU — so the systolic array can access it efficiently</li>
          <li><strong>Dead code elimination:</strong> Removes unnecessary operations — ones that don't affect the result</li>
          <li>Caches the resulting <strong>compiled artifact</strong> — so the same code compiles much faster next time</li>
        </ul>
        <Callout type="warning" title="XLA First Compile — It Takes Time!">
          The first time you run code on a TPU, XLA compiles it — this can be slow (even 1-5 minutes). That's expected and normal. Subsequent runs use the cache and are very fast. In production deployment: use pre-compiled artifacts. In research experiments: expect the first run to be slow — don't panic.
        </Callout>
        <p style={S.p}>
          <strong>Dynamic shapes — a common gotcha:</strong> XLA prefers static shapes — meaning tensor dimensions (array sizes) should be fixed at compile time. If your code uses different tensor sizes at every step, XLA recompiles on every shape change — very slow, defeating the purpose. Solution: use fixed shapes for every tensor, or standardize shapes with padding. Real-world impact: if you're processing variable-length sequences (like sentences of different lengths), pad them all to the same length.
        </p>
      </section>

      {/* ─── PYTORCH XLA ───────────────────────────────────────────────── */}
      <section id="pytorch-xla">
        <h2 style={S.h2}>PyTorch on TPU — torch_xla</h2>
        <p style={S.p}>
          PyTorch is AI research's most popular framework — most universities, most researchers, most open-source projects use PyTorch. Problem: PyTorch doesn't run directly on TPU — it runs on CUDA (NVIDIA's ecosystem). Google built a bridge: the <code style={S.code}>torch_xla</code> library.
        </p>
        <ComparisonTable
          title="GPU PyTorch vs TPU PyTorch (torch_xla) — Side by Side"
          headers={["Aspect", "GPU (Native PyTorch)", "TPU (torch_xla)"]}
          rows={[
            ["Setup", "pip install torch; model.cuda()", "pip install torch_xla; device = xm.xla_device()"],
            ["Execution mode", "Eager — every line runs immediately, see results", "Lazy — builds a graph, then runs (delayed)"],
            ["Print debugging", "Easy — print(tensor) shows value immediately", "Need xm.mark_step() to actually run + get values"],
            ["Dynamic shapes", "Works fine — any shape anytime", "Causes XLA recompilation — use fixed shapes"],
            ["Custom CUDA kernels", "Works natively — full CUDA access", "Will not work — rewrite in JAX/TF-compatible ops"],
            ["Community support", "Huge — most tutorials, courses assume GPU", "Smaller — fewer resources, Stack Overflow answers"],
            ["Performance", "GPU-native, well-optimized", "Comparable for standard standard ops, worse for custom"],
          ]}
        />
        <p style={S.p}>
          <strong>Honest recommendation:</strong> If you want to use TPU and the framework choice is yours — <strong>use JAX</strong>. The TPU experience with JAX is much better — native support, no weird lazy evaluation issues, better debugging. Use PyTorch + torch_xla only if your existing codebase is already in PyTorch and the migration cost is too high.
        </p>
      </section>

      {/* ─── TRAINING PIPELINE ─────────────────────────────────────────── */}
      <section id="training-pipeline">
        <h2 style={S.h2}>Training Pipeline on TPU</h2>
        <p style={S.p}>
          How does an AI model get trained on a TPU — step by step, in plain language.
        </p>
        <Figure caption="TPU Training Pipeline: Data Storage (GCS Bucket — Google's cloud file storage) → Data Feeder (tf.data — keeps chips fed with batches) → Code Translator (XLA Compile — converts Python to TPU code) → TPU Forward Pass (Systolic Array doing matrix math layer by layer) → Error Calculator (Loss — how wrong was the prediction?) → Error Backflow (Backpropagation — all chips share error info via ICI links) → Parameter Update (Optimizer — weights improved) → repeat until model is good.">
          <TpuTrainingPipeline />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Data Storage (GCS — Google Cloud Storage):</strong> Training data is stored in Google Cloud Storage — basically Google's cloud hard drive. There's Google's internal high-speed network between TPU and GCS — not the public internet. Data is prefetched in batches so TPU chips never sit idle waiting for data.</li>
          <li><strong>Data Pipeline (tf.data or grain):</strong> An automated feeding system. Think of it as a conveyor belt from storage to TPU chips — continuously delivering data. Chips never starve for data.</li>
          <li><strong>XLA Compilation:</strong> The first step — translate and optimize the Python code into the TPU's language. Only once (per unique shape) — then the cache is used.</li>
          <li><strong>Forward Pass (the MXU does the work):</strong> Training data passes through the MXU's systolic array. Layer by layer — each layer is a matrix multiplication. Activations are applied on the VPU. End result: the model's prediction for this batch.</li>
          <li><strong>Loss Calculation:</strong> Prediction vs actual answer — how wrong was it? A single number (loss value) is calculated. Lower = better.</li>
          <li><strong>Backpropagation (gradients shared via ICI):</strong> Calculate gradients (error signals) from the loss. All-reduce this across chips over ICI links — an operation where all chips share their gradients and receive the average. All chips end up with the same updated gradient information.</li>
          <li><strong>Weight Update (the optimizer does the work):</strong> The optimizer (AdamW, Adafactor) uses the gradients to update the model weights. Slightly better predictions for the next iteration. This cycle repeats thousands of times.</li>
        </ul>
      </section>

      {/* ─── INFERENCE PIPELINE ────────────────────────────────────────── */}
      <section id="inference-pipeline">
        <h2 style={S.h2}>Inference on TPU</h2>
        <p style={S.p}>
          <strong>Inference</strong> means using a trained model for real users — not training, just predictions. Google's production services — Search, Translate, Gemini — handle billions of daily queries through TPU inference.
        </p>
        <Figure caption="TPU Inference Pipeline: User sends request → Load Balancer routes to available TPU → Pre-compiled AI model (already in Fast Memory/HBM) processes the request using the Systolic Array → Response sent back to user. TPU handles many users at once (high batch throughput). For single-user fast response, GPU is often better.">
          <TpuInferencePipeline />
        </Figure>
        <p style={S.p}>
          <strong>Inference vs Training — what's different from a hardware perspective:</strong>
        </p>
        <ul style={S.ul}>
          <li>Training: gradients have to be stored (memory heavy — roughly 3× model size). Backpropagation happens. Multiple forward+backward passes per step.</li>
          <li>Inference: only a forward pass. No gradients stored. Smaller memory footprint. But latency is critical — the user is waiting for a response.</li>
          <li>TPU inference's strength: high batch throughput — efficiently process hundreds or thousands of user queries at once. Google Search handles 8.5 billion+ queries a day — TPU handles this batch efficiently.</li>
          <li>TPU inference limitation: for single-user latency, GPU is sometimes better — TPU prefers batching and pipelining, and is less optimized for a single isolated request.</li>
        </ul>
      </section>

      {/* ─── TRAINING VS INFERENCE ─────────────────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference — Key Differences</h2>
        <ComparisonTable
          headers={["Aspect", "Training (Building the Model)", "Inference (Using the Model)"]}
          rows={[
            ["Goal", "Create a good model from scratch or fine-tune", "Use the trained model to answer user queries"],
            ["Direction", "Forward pass + Backward pass (gradients)", "Forward pass only — no backward pass"],
            ["Memory needed", "Very heavy: Weights + Gradients + Optimizer states", "Lighter: Weights + Activations only"],
            ["Batch size", "Larger batches = better chip utilization", "Small batch for low latency; large for throughput"],
            ["Duration", "Days to months of continuous compute", "Milliseconds to seconds per user request"],
            ["Cost pattern", "High one-time cost, then model is ready", "Ongoing cost per query, scales with users"],
            ["Precision used", "BFloat16 (stable training)", "INT8 or FP16 (faster, smaller model size)"],
            ["TPU sweet spot?", "Yes — large-scale TF/JAX training", "Yes for high-throughput batch; less ideal single-request"],
            ["GPU sweet spot?", "Yes — flexible, PyTorch native", "Yes for low-latency real-time inference"],
          ]}
        />
      </section>

      {/* ─── CLOUD TPU ─────────────────────────────────────────────────── */}
      <section id="cloud-tpu">
        <h2 style={S.h2}>Cloud TPU — Google's AI Rental Service</h2>
        <p style={S.p}>
          <strong>Cloud TPU</strong> — remember: TPU hardware isn't available on-premises. TPU chips exist only in Google's data centers. There's only one way to access it — rent it on Google Cloud when you need it, stop paying when you're done.
        </p>
        <p style={S.p}>
          <strong>Practical flow — what you actually do:</strong> Write code in TensorFlow or JAX on your laptop → create a TPU VM on the Google Cloud Console → your code runs in the cloud → results are saved in Google Cloud Storage → you download the results. You don't need any GPU or TPU hardware physically.
        </p>
        <Figure caption="Cloud TPU Flow: You write code on your laptop → Upload to Google Cloud → XLA (Code Translator) converts your code for TPU → TPU Pod runs your training → Results saved to GCS (Google's Cloud Storage) → You download your trained model. No special hardware needed on your end.">
          <CloudTpuDeployment />
        </Figure>
        <ComparisonTable
          title="Cloud TPU Options (Approximate 2024 — verify current pricing on cloud.google.com)"
          headers={["Configuration", "How Many Chips", "Use Case", "Approx. Cost"]}
          rows={[
            ["v5e-1", "1 chip only", "Development, learning, small experiments", "~$1.2/hr"],
            ["v5e-8", "8 chips (1 board)", "Small model training, fine-tuning HF models", "~$9.6/hr"],
            ["v5e-256", "256 chips", "Medium LLM training (7B-13B)", "~$300/hr"],
            ["v4-8", "8 chips", "Research experiments, comparing to v5e", "~$12/hr"],
            ["v4-64", "64 chips", "Medium-large training jobs", "~$100/hr"],
            ["v4-512", "512 chips", "Large model training (70B+)", "~$800/hr"],
          ]}
        />
        <p style={S.p}>
          <strong>Pricing options — three types:</strong> On-demand (most expensive, start/stop anytime, no commitment), Spot/Preemptible (60-80% cheaper, Google can interrupt it — good for training with checkpointing enabled), Committed use (1-3 year commitment for a significant discount — good if you know you'll use TPUs long-term).
        </p>
        <Callout type="best-practice" title="Practical Cost Optimization for Cloud TPU">
          Use preemptible TPUs for training — 70%+ cost savings. But: checkpoint every 30 minutes (save to GCS) so if Google interrupts you, you don't lose much work. Create the GCS bucket in the same region as the TPU — data transfer across different regions is costly and slow. Schedule during off-peak hours if possible — better preemptible availability. Start with v5e — go to v4 only if v5e's performance is insufficient.
        </Callout>
      </section>

      {/* ─── TPU VS GPU ────────────────────────────────────────────────── */}
      <section id="tpu-vs-gpu">
        <h2 style={S.h2}>TPU vs GPU — Deep Comparison</h2>
        <p style={S.p}>
          Both are powerful. Both are used for AI. But they're practically very different. This table gives an honest comparison — not marketing.
        </p>
        <ComparisonTable
          title="TPU vs GPU — Complete Honest Comparison"
          headers={["Category", "TPU (v4/v5)", "GPU (H100/A100)"]}
          rows={[
            ["Core design", "Systolic Array — specialist for matrix multiply", "CUDA Cores + Tensor Cores — general parallel compute"],
            ["Software ecosystem", "TensorFlow, JAX — Google-centric stack", "CUDA — massive ecosystem, PyTorch native, most AI tools"],
            ["Framework support", "TF/JAX excellent; PyTorch via torch_xla (tricky)", "Any framework — PyTorch, TF, JAX all work natively"],
            ["Custom operations", "Limited — must be XLA-compilable", "CUDA kernels — write any custom op you need"],
            ["On-premises option", "Not available — Google Cloud only, period", "Yes — DGX, HGX, any server, any cloud"],
            ["Memory per unit", "32–95GB per chip depending on version", "80GB per H100 SXM5"],
            ["Chip-to-chip connection", "ICI — built-in, no external switch", "NVLink within server, InfiniBand between servers"],
            ["Connection cost", "Included in TPU price", "NVLink/InfiniBand = additional hardware purchase"],
            ["Training (TF/JAX)", "Excellent — native, well-optimized", "Good — works but GPU less optimized vs CUDA path"],
            ["Training (PyTorch)", "Complex — torch_xla bridge needed", "Excellent — first-class native support"],
            ["Inference latency", "Good for large batch, less ideal for single request", "Excellent for both large batch and single request"],
            ["Data privacy", "Data goes to Google Cloud — legal implications", "On-premises possible — full data control"],
            ["Pricing model", "Pay-per-hour rental only", "Buy outright ($25K-35K/H100) or cloud rental"],
            ["Vendor lock-in", "High — only on Google Cloud", "Low — multi-cloud + on-prem options"],
          ]}
        />
      </section>

      {/* ─── WHEN TO USE TPU ───────────────────────────────────────────── */}
      <section id="when-to-use-tpu">
        <h2 style={S.h2}>When to Use TPU vs GPU</h2>
        <p style={S.p}>
          Both are tools — neither is universally better. The right choice depends on the use case. Here's a decision guide:
        </p>
        <ComparisonTable
          title="Practical Decision Guide"
          headers={["Your Scenario", "Choose", "Why"]}
          rows={[
            ["Using TensorFlow, training large scale", "TPU ✓", "Native support, best performance, no code changes"],
            ["JAX research project from scratch", "TPU ✓", "JAX + TPU = natural fit, smoothest experience"],
            ["PyTorch with custom CUDA operations", "GPU ✓", "TPU can't run custom CUDA — full stop"],
            ["Fine-tuning a Hugging Face model", "GPU ✓", "HF Transformers primarily GPU-optimized"],
            ["Training standard BERT/T5/ViT from scratch", "TPU ✓", "Standard architectures, TF/JAX compatible"],
            ["Research with novel/experimental architecture", "GPU ✓", "Flexibility for anything new"],
            ["Need response in under 100ms per user", "GPU ✓", "Better single-request latency"],
            ["High-throughput batch inference (thousands/sec)", "TPU ✓", "Excellent batch processing efficiency"],
            ["Data must stay in your own building", "GPU on-premises ✓", "TPU = Google Cloud only — data leaves your DC"],
            ["Variable workload, tight budget", "Cloud TPU preemptible ✓", "70%+ cheaper than on-demand"],
            ["Already on Google Cloud ecosystem", "TPU ✓", "Integrated tooling, simpler billing, less setup"],
            ["Multi-cloud or hybrid strategy", "GPU ✓", "GPU available on AWS, Azure, GCP, on-prem"],
          ]}
        />
        <p style={S.p}>
          <strong>Quick decision rules:</strong> Production TF/JAX training at Google Cloud scale = TPU first. Research flexibility + PyTorch = GPU. Data sovereignty requirement = GPU on-premises. Starting fresh with budget optimization = try TPU v5e preemptible.
        </p>
      </section>

      {/* ─── GOOGLE AI STACK ───────────────────────────────────────────── */}
      <section id="google-ai-stack">
        <h2 style={S.h2}>Google AI Infrastructure Stack</h2>
        <p style={S.p}>
          A TPU isn't just a chip — it's the foundation of a complete infrastructure stack. When you use Google Search, when Google Photos detects a face, or when Google Translate translates a sentence — this entire stack is working silently underneath.
        </p>
        <Figure caption="Google AI Stack from bottom to top: Physical Data Center (liquid cooling pipes, high-density power, optical fiber cables) → TPU Chip Layer (MXU matrix engine + fast memory) → TPU Pod Clusters (thousands of chips as one) → Model Framework (JAX/TensorFlow/XLA code translator) → Foundation Models (Gemini, PaLM, Gemma) → Google AI Products you use daily (Search, Translate, Photos, Gemini App).">
          <GoogleAiInfraStack />
        </Figure>
        <p style={S.p}>
          Every time you use Google Search — a chain of events happens: your query goes in → the model framework (JAX) processes the query → XLA-compiled code runs on TPU chips → systolic arrays do the matrix multiplications → the result reaches you in milliseconds. All of it through this stack.
        </p>
      </section>

      {/* ─── GEMINI TRAINING ───────────────────────────────────────────── */}
      <section id="gemini-training">
        <h2 style={S.h2}>Gemini Training on TPU</h2>
        <p style={S.p}>
          <strong>Gemini</strong> — Google's latest frontier AI model (ChatGPT's competitor) — was trained on TPU. This is a real-world example of TPU at absolute maximum scale. The numbers are staggering.
        </p>
        <ul style={S.ul}>
          <li><strong>Multiple model sizes at once:</strong> From Gemini Nano (on-device, small phone-size model) to Gemini Ultra (largest, most capable) — Google maintains multiple sizes for different use cases. Each size has its own training runs.</li>
          <li><strong>Infrastructure scale:</strong> Multiple TPU v4 Pods across multiple Google data centers simultaneously. Gemini Ultra training reportedly involved 16,000+ TPU v4 chips. Pod-to-pod communication: optical fiber ICI across data centers — not just within one building.</li>
          <li><strong>Framework:</strong> JAX + T5X/MaxText — Google's internal frameworks. XLA compilation throughout the pipeline. Custom gradient checkpointing for memory efficiency at this scale.</li>
          <li><strong>Training data:</strong> Multimodal — text + images + video + audio simultaneously. Stored in Google Colossus (Google's internal distributed storage system — like a massive internal Google Drive at petabyte scale). Petabytes of training data.</li>
          <li><strong>Duration:</strong> Weeks to months of continuous training. 24/7 monitoring teams. Automatic job restart on any chip failure — checkpoints every 30 minutes, restart from there.</li>
          <li><strong>Parallelism:</strong> 3D parallelism simultaneously — data parallelism (same model, different data batches), model parallelism (model split across chips), pipeline parallelism (layers split in stages). All coordinated via ICI within Pods and fiber between Pods.</li>
        </ul>
        <Callout type="maintenance" title="Cost Reality Check">
          Frontier model training at Gemini Ultra scale: hundreds of millions of dollars in compute cost estimated. That's why only a handful of organizations globally can train frontier models — Google, OpenAI/Microsoft, Meta, Anthropic, xAI. For everyone else: fine-tuning an existing model (much cheaper) or using APIs is more practical.
        </Callout>
      </section>

      {/* ─── DATA CENTER INFRA ─────────────────────────────────────────── */}
      <section id="data-center-infra">
        <h2 style={S.h2}>Data Center Infrastructure for TPU</h2>
        <p style={S.p}>
          This section is especially important for DC engineers. TPU infrastructure is significantly different from standard data center design — different hardware, different power, different cooling, different networking.
        </p>
        <ul style={S.ul}>
          <li><strong>Physical form factor:</strong> TPU boards (4 chips per printed circuit board) sit in specially designed server enclosures — not standard 1U/2U rack servers. Google uses a custom rack design. Multiple boards are stacked vertically in a rack. Floor load requirements are high — these racks are heavy.</li>
          <li><strong>Storage infrastructure:</strong> Internally, Google Colossus (a distributed file system) is used. For public developers: Google Cloud Storage (GCS) — your data lives in GCS → TPU reads directly from GCS over Google's internal high-speed network (not the public internet). Latency: effectively milliseconds vs seconds if data were off-network.</li>
          <li><strong>Networking — two types:</strong> the ICI network (internal TPU Pod fabric — optical fiber, chip-to-chip) and the external network (standard Ethernet for management, data ingestion from GCS, external API calls). The DC engineer's job: plan specialized optical cabling for ICI; standard networking for external.</li>
          <li><strong>Monitoring systems:</strong> Google's internal tools monitor everything — power per chip, per board, per rack; temperature per board; chip performance health metrics; ICI link error rates. Automatic failure detection triggers replacement scheduling. The DC operations team is alerted before user impact.</li>
        </ul>
      </section>

      {/* ─── POWER AND COOLING ─────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling</h2>
        <p style={S.p}>
          This is the most important section for DC engineers. TPU infrastructure has completely different power and cooling demands from standard IT equipment.
        </p>
        <ComparisonTable
          title="TPU Power and Cooling — DC Planning Numbers"
          headers={["Level", "Power Draw", "Heat Output", "Cooling Required"]}
          rows={[
            ["Single TPU v4 chip", "~200W", "200W heat (same as power drawn)", "Liquid cooling — air insufficient"],
            ["One TPU board (4 chips)", "~800W", "~800W heat per board", "Liquid cooling — mandatory"],
            ["One server rack (multiple boards)", "40–100 kW per rack", "40–100 kW heat per rack", "Direct liquid cooling (cold plates)"],
            ["TPU v4 Pod (4,096 chips)", "~800 kW total", "~800 kW heat total", "Facility-level liquid cooling infrastructure"],
            ["Compare: GPU H100 server", "~10 kW per 8-GPU server", "~10 kW per server", "Liquid cooling recommended above 40kW/rack"],
          ]}
        />
        <p style={S.p}>
          <strong>Why liquid cooling is mandatory — a simple explanation:</strong> 200W from a single chip is like a heater. 4 chips per board = 800W = a small electric oven. A rack full of boards = 40-100 kW = an entire house's electrical load. Air cooling (fans) can't remove heat efficiently at this density. Liquid cooling (cold water pipes directly to the chip surface) becomes mandatory.
        </p>
        <p style={S.p}>
          <strong>Direct Liquid Cooling (DLC) — how it works:</strong> Cold water (typically 18-22°C) supply pipes come into the rack → cold plates touch the chip surface directly → heat transfers into the water → warm water (35-45°C) returns via pipes to the facility chiller → the chiller cools the water → the cycle repeats. In the facility: a chilled water plant, cooling towers, redundant pumps all need to be part of the plan from day 1.
        </p>
        <Callout type="important" title="For DC Engineers — Critical Planning Points">
          If you're designing a TPU-hosting DC or Google Cloud colocation facility: power density planning: 40-100 kW per rack (same order of magnitude as GPU). Liquid cooling: non-negotiable — design it in from day 1, not as an afterthought. Floor load: heavy custom racks — structural assessment mandatory. Optical cabling: specialized fiber infrastructure for ICI links. UPS sizing: 800 kW for a full v4 Pod means large UPS and generator capacity. PUE impact: liquid cooling is highly efficient — PUE 1.1-1.3 achievable vs air cooling PUE 1.5-2.0.
        </Callout>
        <p style={S.p}>
          <strong>Power efficiency — the upside:</strong> TPU power consumption per FLOP is competitive with or better than GPU for matrix workloads. This means: for the same training job, a TPU's total electricity bill can be comparable to or lower than a GPU cluster's — provided your workload fits TPU well. This is why Google itself developed the TPU — at billions-of-queries scale, even a 20% better efficiency means massive cost savings.
        </p>
      </section>

      {/* ─── COST ANALYSIS ─────────────────────────────────────────────── */}
      <section id="cost-analysis">
        <h2 style={S.h2}>Cost Analysis</h2>
        <p style={S.p}>
          Comparing GPU vs TPU cost is complicated — workload type, scale, framework, and utilization all matter. This is a rough framework for decision-making.
        </p>
        <ComparisonTable
          title="Cost Comparison Framework (Illustrative — Verify Current Pricing)"
          headers={["Scenario", "Cloud TPU", "Cloud GPU (H100)", "On-Premises GPU"]}
          rows={[
            ["Small experiment (8 units, 10 hours)", "~$96-120", "~$250-320", "Sunk cost if owned"],
            ["Medium training (256 units, 1 week)", "~$50,000", "~$80,000-100,000", "Lower if owned — just OpEx"],
            ["Large training (4096 chips, 1 month)", "~$2-3M", "~$4-6M rough estimate", "Requires massive CapEx upfront"],
            ["High-throughput inference (1000 req/sec)", "TPU v5e — efficient", "H100 — higher cost per query", "Possible with investment"],
            ["Fine-tuning (1-2 days)", "v5e-8: ~$200-400", "~$400-600", "Cheapest if hardware owned"],
          ]}
        />
        <Callout type="warning" title="Pricing Caveat — Important">
          Cloud pricing changes frequently — Google has revised TPU pricing multiple times (generally downward as scale increases). The numbers above are illustrative only — always verify on cloud.google.com/tpu/pricing before making decisions. The exact comparison heavily depends on: workload TPU-compatibility, batch size (TPU prefers large batches), and framework (JAX gives better TPU utilization than torch_xla).
        </Callout>
        <p style={S.p}>
          <strong>Hidden costs to consider before switching to TPU:</strong> Migration cost — porting PyTorch code to JAX/TF takes real engineer hours (weeks to months for large codebases). Debugging time — XLA issues less documented than CUDA issues on Stack Overflow. Library support — not every Python AI library works on TPU (check compatibility first). Vendor lock-in risk — if Google changes pricing or service, switching back takes time and cost.
        </p>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting TPU Issues</h2>
        <ComparisonTable
          headers={["Problem You See", "Likely Cause", "What To Do"]}
          rows={[
            ["First training run very slow", "XLA compiling your code for the first time", "Normal — wait for it. Second run will be much faster (cache used)."],
            ["OOM — Out of Memory error", "Model + batch size too large for HBM (chip memory)", "Reduce batch size first. Enable gradient checkpointing. Use more chips (model sharding)."],
            ["Slow after each shape change", "XLA recompiling because tensor shapes changed", "Pad all inputs to fixed shapes. Avoid dynamic shapes at all costs on TPU."],
            ["Custom op/kernel not working", "CUDA-specific code can't run on TPU", "Rewrite in JAX/TF native operations, or fall back to CPU for that op."],
            ["torch_xla very slow", "Missing xm.mark_step() or lazy eval confusion", "Add mark_step() after each training step. Profile with torch_xla.debug."],
            ["Data pipeline bottleneck", "GCS reads slower than TPU can consume data", "Use tf.data prefetch(AUTOTUNE). Ensure GCS in same region as TPU."],
            ["Training job crashed mid-run", "Chip failure or preemption (if spot instance)", "Automatic for regular TPUs. Resume from last checkpoint. Normal for preemptible."],
            ["Gradient NaN or Inf", "BFloat16 overflow or learning rate too high", "Reduce learning rate. Add gradient clipping. Check for bad data batches."],
            ["ICI error / chip communication failure", "Chip-to-chip link issue", "Google-side issue. Contact Cloud Support. Restart job. Google replaces hardware."],
          ]}
        />
      </section>

      {/* ─── FUTURE ROADMAP ────────────────────────────────────────────── */}
      <section id="future-roadmap">
        <h2 style={S.h2}>Future Roadmap — What's Coming</h2>
        <ul style={S.ul}>
          <li><strong>Trillium (TPU v6e, 2024):</strong> Announced at Google IO 2024. ~4.7× performance improvement over v5e claimed by Google. Better cost efficiency per FLOP. Expected to become the standard choice for most workloads when fully available. Verify current availability at cloud.google.com/tpu.</li>
          <li><strong>Multi-modal optimization:</strong> Future TPUs will be increasingly optimized for mixed modality workloads — text + image + video + audio simultaneously. Gemini-class models need this — current TPU already handles it, future versions will do it more efficiently.</li>
          <li><strong>Continued optical ICI evolution:</strong> ICI links will get faster and span longer distances — enabling even larger distributed TPU Pods across wider geographic areas within Google&apos;s network. More chips = more parallel compute = larger models trainable.</li>
          <li><strong>TPU on Google Distributed Cloud:</strong> Google exploring making Google-managed AI infrastructure available at customer sites (on-premises). If this happens, TPU might eventually be physically deployable at enterprises — not confirmed, watch for announcements.</li>
          <li><strong>Inference-specific TPU variants:</strong> As LLM serving at Google scale grows, specialized inference-optimized TPU variants may re-emerge (like v1 was inference-only). Different optimization targets for training vs serving.</li>
          <li><strong>Competition is heating up:</strong> AWS Trainium 2, Meta&apos;s MTIA, Microsoft&apos;s Maia, Graphcore, Cerebras — everyone building custom AI chips. Google must continue innovating to maintain TPU leadership. This competition is good — it drives better hardware and lower prices for everyone.</li>
          <li><strong>Open-source model ecosystem growing on TPU:</strong> As open-source models (Llama, Gemma, Mistral) increasingly support JAX backends, TPU becomes more viable even for teams not using Google&apos;s proprietary models. Watch JAX ecosystem growth as leading indicator.</li>
        </ul>
      </section>

      {/* ─── INTERVIEW QUESTIONS ───────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        {[
          {
            q: "Why was the TPU built — what problem does it solve?",
            a: "In 2013, Google calculated that if people widely used Google's voice search, existing CPU/GPU infrastructure wouldn't stay affordable — too expensive, too power-hungry at billions-of-queries scale. AI's core operation is matrix multiplication. CPUs and GPUs are general-purpose for this job, not efficient. Google designed a specialist chip that dedicates 90%+ of the die area (the chip's physical space) specifically to matrix multiplication — the TPU. Result: TPU v1 (2016) reduced Google's data center footprint by 7x for the same AI workload. At Google's scale, that saved billions of dollars annually on internal workloads. This economic driver is what justified TPU development.",
          },
          {
            q: "What is a Systolic Array — in simple language?",
            a: "The assembly-line factory analogy works best: a car factory has stations — station 1 fits the engine, station 2 fits the doors, station 3 paints it. Multiple cars are processed at different stations simultaneously — like a conveyor belt. A Systolic Array works exactly like this, but for numbers. Numbers flow through a 2D grid — from the left (Matrix A's rows) and from the top (Matrix B's columns). Each cell does one simple job: multiply two numbers, add to a running total, pass the result to the adjacent cell. All cells work simultaneously — a massive parallel pipeline. Memory trips are minimized because numbers keep flowing, never going back to memory. TPU v4: 256×256 = 65,536 cells simultaneously. This is optimal for matrix multiplication — and 90%+ of AI computation is matrix multiplication.",
          },
          {
            q: "What is BFloat16 and how does it differ from GPU FP16?",
            a: "BFloat16 (Brain Float 16) is a 16-bit number format that Google designed specifically for AI training. Comparison: FP32 = 32 bits (8 exponent + 23 mantissa). FP16 = 16 bits (5 exponent + 10 mantissa). BFloat16 = 16 bits (8 exponent + 7 mantissa). Key difference: BFloat16's exponent (number range) matches FP32's — a large range. FP16's exponent is smaller — limited range, overflow risk. In neural network training: range matters (overflow causes NaN errors = training crash), precision is less critical (approximate math works). BFloat16 gives FP32's range with FP16's speed and memory efficiency. Google introduced it with TPU v2; today H100 also supports BFloat16 natively — it's become an industry standard.",
          },
          {
            q: "What is a TPU Pod and how does ICI work?",
            a: "A TPU Pod connects multiple TPU chips through a high-speed interconnect to form a unified supercomputer. TPU v4 Pod: 4,096 chips = ~1.1 EFLOPS total — this is the scale at which Gemini was trained. ICI (Inter-Chip Interconnect) is Google's custom chip-to-chip direct connection system. Every chip has 6 ICI links — 2 each in 3 directions (X/Y/Z axes). This forms a 3D Torus topology — like a donut in 3 dimensions. Any chip reaches any other in a few hops. TPU v4 uses optical fiber (light) for ICI — faster than copper over longer distances within a data center. Compared to GPU clusters: GPUs need external InfiniBand switches (expensive equipment). A TPU Pod has ICI built in — no external switches within the Pod. Model, data, and pipeline parallelism all happen simultaneously within a Pod — 4,096 chips behave like one logical unit.",
          },
          {
            q: "What does the XLA compiler do and why is it important?",
            a: "XLA (Accelerated Linear Algebra) is a compiler — a code translator plus optimizer. Your Python/TF/JAX code doesn't run directly on a TPU. XLA: (1) analyzes your code's computation graph, (2) fuses operations (multiple small ops → one big op — reducing memory trips), (3) optimizes memory layout (arranging data in the best format for the TPU's systolic array), (4) generates TPU-specific machine code, (5) caches the compiled result for future use. Analogy: you wrote a recipe in Hindi, XLA is an experienced Japanese translator who translates it and also merges inefficient steps. Practical gotcha: the first compilation is slow (minutes). Dynamic tensor shapes trigger recompilation — always use fixed shapes on TPU. Custom CUDA kernels won't run — rewrite them in JAX/TF native ops.",
          },
          {
            q: "When should you use TPU and when is GPU the better choice?",
            a: "Choose TPU when: you're using TensorFlow or JAX (native support, smooth experience), training standard transformer architectures (BERT, T5, ViT, LLM), already on Google Cloud, need high-throughput batch inference (thousands of requests/second), want to optimize cost with variable workloads (preemptible TPUs give 70%+ savings). Choose GPU when: you're deep in the PyTorch ecosystem especially with custom CUDA operations (won't run on TPU), doing research with experimental architectures (flexibility required), need data sovereignty (on-premises required — TPU means Google Cloud only), need low-latency single-request inference (<100ms per user), have a multi-cloud strategy (GPU everywhere, TPU only on GCP), or want to use HuggingFace models directly. Quick rule: production TF/JAX training at scale = TPU. PyTorch + research flexibility = GPU. Data must stay in your building = GPU on-premises.",
          },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: "4px solid #7c3aed", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#4c1d95", marginBottom: "0.5rem" }}>Q: {item.q}</p>
            <p style={S.p}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Plain English Definition"]}
          rows={[
            ["BFloat16 (Brain Float 16)", "A 16-bit number format for AI training. Same number range as FP32 but uses less memory. Google invented it for TPU — now industry standard."],
            ["Cloud TPU", "Rent TPU chips from Google Cloud by the hour. You pay only when using. Physical hardware is in Google's data centers."],
            ["Exaflop (EFLOPS)", "1 million TFLOPS. 1 exaflop per second = 10¹⁸ operations/second. TPU v4 full Pod ≈ 1.1 EFLOPS."],
            ["HBM (High Bandwidth Memory)", "Fast memory stacked directly on the TPU chip. Very high bandwidth (~900 GB/s). Stores model weights and activations during compute."],
            ["ICI (Inter-Chip Interconnect)", "Google's custom direct chip-to-chip links inside TPU hardware. No external switch needed — chips connect directly to neighbours."],
            ["JAX", "Google's modern ML framework. NumPy-like syntax. Best choice for TPU development. XLA-native."],
            ["Matrix Multiplication", "Multiplying two number grids (matrices) together. The most common operation in every neural network layer."],
            ["MXU (Matrix Multiply Unit)", "TPU's main compute engine — where the Systolic Array physically lives. Does all matrix multiplication."],
            ["Optical Interconnect", "Using light pulses (in fiber optic cables) instead of electricity (in copper wires) for data transfer. Faster for longer distances. Used in TPU v4+ ICI."],
            ["PFLOPS (Peta-FLOPS)", "1,000 TFLOPS. TPU v3 Pod: ~100 PFLOPS. Unit of compute performance."],
            ["Systolic Array", "TPU's computing structure — a grid of cells where numbers flow like an assembly line. All cells work simultaneously. Makes matrix math very efficient."],
            ["TFLOPS (Tera-FLOPS)", "Trillion floating point operations per second. Standard measure of AI chip performance."],
            ["3D Torus Network", "The topology of how TPU chips connect via ICI — wrap-around connections in 3 dimensions, like a donut shape in 3D. Any chip reaches any other in few hops."],
            ["T5X / MaxText", "Google's internal training frameworks for large transformer models. Used to train Gemini. Open-source."],
            ["TensorFlow (TF)", "Google's original ML framework. Works natively on TPU. Mature, stable, large ecosystem within Google."],
            ["Edge TPU / TFLite", "Small, low-power TPU variants for mobile and embedded devices. Completely different product from Cloud TPU."],
            ["torch_xla", "A Python library that bridges PyTorch code to run on TPU via XLA. Works but less smooth than native JAX/TF."],
            ["TPU Pod", "Multiple TPU chips (up to 4,096 in v4) all connected via ICI — behaves as one massive compute unit."],
            ["VPU (Vector Processing Unit)", "TPU's secondary compute unit — handles activation functions, softmax, normalization. Works alongside MXU."],
            ["XLA (Accelerated Linear Algebra)", "The compiler that translates TF/JAX/PyTorch code into optimized TPU machine instructions. Also fuses and optimizes operations."],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>A TPU is a specialist chip — it does only matrix multiplication (multiplying two number grids). CPU = generalist (any program). GPU = parallel generalist (graphics + AI). TPU = extreme specialist (AI math only). Benefit of specialization: for the right workload, dramatically better performance per watt. Drawback: it can't do anything else. Not a Swiss Army Knife — a surgical scalpel.</li>
          <li>The Systolic Array is the TPU's core innovation. Like an assembly line — numbers flow through a 2D grid, each cell works simultaneously, results are passed forward, memory trips are dramatically reduced. 65,536 cells working together (256×256) in TPU v4. Reducing memory trips is the secret to the speed.</li>
          <li>BFloat16 is Google's biggest contribution to AI computing. FP32's range plus 16-bit speed and memory = stable AI training at 2× cost savings. The GPU world also adopted BFloat16 (from H100 onward). It's become the de-facto standard format for LLM training globally. TPU started this trend.</li>
          <li>The XLA compiler is a critical piece — invisible but essential. Your Python code doesn't run directly on a TPU. XLA translates and optimizes it. First compile is slow (expected), then cached (fast). Avoid dynamic shapes — every shape change means recompilation, which is slow. Use JAX with XLA — the best experience.</li>
          <li>TPU Pod scaling is remarkable. From a single chip to 4,096 chips — directly connected via ICI, no external switches, 3D Torus topology. TPU v4 Pod: ~1.1 exaflop. Optical fiber ICI made this Pod scale possible. Gemini was trained here. GPU clusters need expensive external InfiniBand switches — TPU Pods have ICI built in.</li>
          <li>Cloud TPU = no on-premises option — that's a fundamental constraint. TPU hardware exists only in Google's data centers, nowhere else. Organizations with data sovereignty concerns (banking, healthcare, government) are better off with GPU on-premises. Vendor lock-in is a significant consideration — plan accordingly.</li>
          <li>JAX + TPU = best combination available today. PyTorch + GPU = best combination for research flexibility. Switching frameworks has real cost — engineer time, code migration, testing. Choose framework based on your long-term strategy, not just today's task.</li>
          <li>Cost optimization: preemptible TPUs are 60-80% cheaper. Checkpoint every 30 minutes. Keep the GCS bucket in the same region. TPU v5e is the best cost-performance choice for most medium workloads. Committed use discounts for long-term usage. Check current pricing — it changes.</li>
          <li>Critical numbers for DC engineers: 40-100 kW per rack, mandatory liquid cooling (Direct Liquid Cooling with cold plates), heavy custom racks (floor load assessment), optical cabling for ICI, large UPS/generator sizing. Same density challenges as GPU data centers but entirely different hardware. Plan liquid cooling infrastructure from day 1 — retrofitting is expensive.</li>
          <li>Future is custom silicon — not just NVIDIA GPUs. Google (TPU), AWS (Trainium), Meta (MTIA), Microsoft (Maia), Cerebras, Graphcore — everyone building specialized AI chips. General-purpose GPUs will remain dominant for flexibility, but domain-specific chips increasingly competitive for high-volume production workloads. AI infrastructure professionals need to understand all these options — not just GPU.</li>
        </ul>
      </section>

    </article>
  );
}
