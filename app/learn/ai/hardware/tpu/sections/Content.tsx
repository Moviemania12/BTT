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
          Google ne 2016 mein ek chip banaya jo sirf ek kaam karta hai — matrix multiplication (do number grids ko ek specific tarike se multiply karna) — aur woh kaam itna fast karta hai ki poori AI world thodi der ke liye ruk ke dekh gayi. Uss chip ka naam tha: <strong>TPU — Tensor Processing Unit</strong> (ek specialized AI calculator chip).
        </p>
        <p style={S.p}>
          TPU ko samajhna mushkil lagta hai — "tensor", "systolic array", "MXU" — yeh sab terms confusing lagte hain. Lekin ek baar agar aap samajh lo ki yeh actually kya karta hai simple language mein, toh sab kuch fit ho jaata hai.
        </p>
        <p style={S.p}>
          Yeh article wahi karta hai. Beginner ke liye ek clear explanation. Engineer ke liye poori technical depth. Dono ke liye — ek article.
        </p>
        <Callout type="important" title="Ek Line Summary">
          TPU ek specialist chip hai jo sirf AI math (matrix multiplication — number grids multiply karna) karta hai — lekin is ek kaam mein woh GPU aur CPU se kaafi zyada efficient hai for specific workloads. Google apne sab AI products — Search, Translate, Gemini — is chip pe run karta hai.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Students aur Freshers:</strong> AI hardware kya hota hai, TPU kya hai, GPU se kaise alag hai — bilkul zero se samajhoge.</li>
          <li><strong>AI/ML Engineers:</strong> Kab TPU use karein, kab GPU better hai, XLA (code translator) kaise kaam karta hai, PyTorch pe TPU kaise use karein.</li>
          <li><strong>Data Center Engineers:</strong> TPU data center mein kaise deploy hota hai, power aur cooling requirements kya hain, Google ka infrastructure kaise kaam karta hai — especially DC perspective.</li>
          <li><strong>Cloud Engineers:</strong> Cloud TPU configurations, cost comparison, kab on-demand vs reserved use karein.</li>
          <li><strong>Technical Architects:</strong> Build vs buy decision — kab GPU cluster better hai, kab Cloud TPU better hai, enterprise deployment roadmap.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>TPU kyun banaya gaya — kaunsi real problem solve karni thi</li>
          <li>CPU vs GPU vs TPU — teeno mein exact difference simple language mein</li>
          <li>Systolic Array (assembly line math machine) kya hai — factory analogy se samjhenge</li>
          <li>MXU, VPU, HBM — TPU ke andar sab parts ka kaam plain English mein</li>
          <li>BFloat16 number format — kyun TPU ke liye special hai, simple se explain</li>
          <li>TPU Pod — ek chip se 4,096 chips ka supercomputer kaise banta hai</li>
          <li>ICI Interconnect — chips ek dusre se kaise directly baat karte hain</li>
          <li>XLA compiler — aapka Python code TPU tak kaise pahonchta hai</li>
          <li>Cloud TPU — Google ke rental service ka complete picture with real costs</li>
          <li>TPU vs GPU — kab kaunsa choose karein, practical guide</li>
          <li>Gemini training — real world example at maximum scale</li>
          <li>Data center infrastructure, power (kW), cooling, rack density</li>
          <li>Cost analysis aur future roadmap</li>
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
          2013 mein Google ke engineers ne ek scary calculation ki. Agar log Google&apos;s voice search widely use karne lage — sirf ek feature — toh unhe kitne computers chahiye honge?
        </p>
        <p style={S.p}>
          Answer tha: itne zyada ki Google ke sab existing data centers mili ke bhi kaafi nahi honge. Sirf voice search ke liye. Ek product ke liye.
        </p>
        <p style={S.p}>
          Problem simple thi: traditional chips — CPUs (general-purpose computer brains) aur GPUs (parallel math chips originally for graphics) — AI ke liye design nahi kiye gaye the. Woh AI kaam kar sakte the, lekin bahut zyada electricity aur time lagta tha ek simple AI calculation ke liye bhi.
        </p>
        <p style={S.p}>
          Google ke engineers ne ek alag approach sochi: kya hoga agar hum ek chip banayein jo sirf AI ka core operation kare — <strong>matrix multiplication (do number grids ko multiply karna)</strong> — lekin woh ek kaam extraordinary speed aur efficiency se kare? Baaki sab chhod do.
        </p>
        <p style={S.p}>
          Teen saal baad, 2016 mein, pehla TPU Google ke data centers mein deploy hua. Tab se Google Search, Google Translate, Google Photos, Gmail Smart Reply, aur aaj Gemini — sab TPU pe run karte hain.
        </p>
        <Callout type="best-practice" title="Why This Matters for You">
          Agar aap AI engineer ho — TPU aapka next compute platform ho sakta hai. Agar aap DC engineer ho — TPU-grade infrastructure (high density power, mandatory liquid cooling) design karna future mein aapka kaam hoga. Agar aap student ho — yeh fundamental concept hai jo AI hardware samajhne ke liye zaroori hai.
        </Callout>
      </section>

      {/* ─── WHY TPU EXISTS ────────────────────────────────────────────── */}
      <section id="why-tpu-exists">
        <h2 style={S.h2}>Why TPU Exists — The Problem It Solved</h2>
        <p style={S.p}>
          Pehle samajhte hain ki problem kya thi — ek simple example se.
        </p>
        <p style={S.p}>
          Socho ek hospital hai. Doctors surgical tools use karte hain. Ab socho hospital ne surgical tools ki jagah Swiss Army Knives purchase kiye — kyunki Swiss Army Knife bohot sari cheezein kar sakti hai. Technically kaam chalega. Lekin operation slow hoga, surgeon thak jaayega, aur results utne precise nahi honge.
        </p>
        <p style={S.p}>
          Yahi GPU ka situation tha AI ke saath. GPU ek powerful parallel processor hai lekin it was designed for graphics — 3D rendering, pixel shading, display output. AI training ke liye use karna kaam karta tha, lekin efficient nahi tha.
        </p>
        <p style={S.p}>
          <strong>The core insight:</strong> Neural network training aur inference ka 90%+ kaam ek hi cheez hai — <strong>matrix multiplication</strong> (do number grids ko multiply karna). Ek neural network layer = input matrix × weight matrix. Ek LLM ka ek response generate karna = millions of these multiplications.
        </p>
        <p style={S.p}>
          <strong>Google ka solution:</strong> Ek chip banao jahan 90% die area (chip ka physical space) specifically matrix multiplication ke liye ho. Graphics ke liye kuch nahi. General computing ke liye minimum. Sirf AI math.
        </p>
        <p style={S.p}>
          <strong>The result:</strong> TPU v1 (2016) ne Google ke data center footprint ko 7x reduce kar diya for the same AI workload. Wahi kaam 7x kam servers mein. 7x kam electricity. 7x kam cooling cost.
        </p>
        <Callout type="important" title="The Economics — Why This Matters">
          Google billions of AI queries daily process karta hai — Search, Translate, Photos, Maps. At iss scale pe, 7x efficiency improvement = billions of dollars saved annually. Sirf electricity bill mein. Yeh woh driving force tha jo Google ne TPU development mein itna invest kiya.
        </Callout>
      </section>

      {/* ─── CPU GPU TPU ───────────────────────────────────────────────── */}
      <section id="cpu-gpu-tpu">
        <h2 style={S.h2}>CPU vs GPU vs TPU — The Big Picture</h2>
        <p style={S.p}>
          Teen tools hain aapke paas AI ke liye. Teeno bilkul alag hain. Simple se samajhte hain:
        </p>
        <p style={S.p}>
          <strong>CPU (Central Processing Unit):</strong> Ek highly intelligent generalist. Har kaam kar sakta hai — operating system chalana, database queries, web server, complex logic. Lekin ek time pe thoda hi parallel kaam kar sakta hai (8 to 128 cores typically).
        </p>
        <p style={S.p}>
          <strong>GPU (Graphics Processing Unit):</strong> Thousands of simple workers jo sab ek saath kaam karte hain. Originally graphics ke liye banaya — millions of pixels simultaneously color karo. AI ke liye excellent kyunki same parallel pattern — same math, lots of data, sab ek saath.
        </p>
        <p style={S.p}>
          <strong>TPU (Tensor Processing Unit):</strong> Ek extreme specialist. Sirf matrix multiplication — aur woh ek kaam GPU se bhi zyada efficiently. Kuch aur nahi kar sakta. Swiss Army Knife nahi — surgical scalpel.
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
          TPU ek standing-still product nahi hai — har generation dramatically better hoti hai. Yeh evolution dekhte hain:
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
          Notice karo: v1 sirf inference (model use karna) kar sakta tha — training (model banana) nahi. Training support v2 se aaya. BFloat16 format (AI ka preferred number format) v2 ne introduce kiya. Optical interconnect v4 mein aaya — yeh woh innovation tha jo 4,096-chip Pods possible banaya. Yeh evolution dikhata hai ki TPU kaise ek narrow tool se full AI training platform bana.
        </p>
      </section>

      {/* ─── MATRIX MULTIPLICATION ─────────────────────────────────────── */}
      <section id="matrix-multiplication">
        <h2 style={S.h2}>Matrix Multiplication — TPU Ka Core Job</h2>
        <p style={S.p}>
          Pehle samajhte hain ki <strong>matrix multiplication</strong> (do number grids ko multiply karna) kya hoti hai — bilkul simple language mein. Phir samjhenge ki AI mein yeh kyun itni important hai.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Socho 3 dost hain — Amit, Raj, aur Priya. Teeno 2 shops mein jaate hain. Har shop mein alag-alag prices hain. Total kharcha calculate karna hai. Ek table mein kitna kharida (rows = log, columns = items). Doosri table mein prices (rows = items, columns = shops). Inhe ek specific tarike se multiply karo — result milta hai total kharcha per person per shop. Yeh ek matrix multiplication hai. Simple shopping math.
        </p>
        <p style={S.p}>
          <strong>AI mein kyun important hai:</strong> Har neural network layer ek matrix multiplication hai. Input data ek matrix (number grid) hai. Model weights — jo training mein seekhe gaye parameters hain — ek matrix hai. Inhe multiply karo — output milti hai. Ek LLM (Large Language Model — jaise ChatGPT) mein thousands of layers hote hain. Har layer = ek ya zyada matrix multiplications. Ek single response generate karna = millions of matrix multiplications.
        </p>
        <Figure caption="Matrix A (Input Data — the words/tokens you sent) × Matrix B (Model Weights — what the AI learned during training) = Matrix C (Output — the AI's understanding). This exact operation repeats millions of times per AI response. TPU's Systolic Array is purpose-built to do exactly this.">
          <MatrixMultiplyFlow />
        </Figure>
        <Callout type="best-practice" title="The Scale That Justifies a Custom Chip">
          GPT-3 (175 billion parameters) ka ek forward pass: roughly 350 billion multiply-add operations. At 70 milliseconds per response: ~5 trillion operations per second needed. TPU v4 Pod (4,096 chips): ~1 exaflop = 1 million TFLOPS = 1,000,000,000,000,000 operations per second. Yeh scale batata hai kyun Google ne custom chip banaya — standard chips itne scale ke liye economically viable nahi the.
        </Callout>
      </section>

      {/* ─── SYSTOLIC ARRAY ────────────────────────────────────────────── */}
      <section id="systolic-array">
        <h2 style={S.h2}>Systolic Array — How TPU Does Math</h2>
        <p style={S.p}>
          <strong>Systolic Array</strong> — yeh woh technique hai jo TPU ko itna fast banati hai matrix multiplication ke liye. Naam scary lagta hai lekin concept bilkul simple hai. Ek real-world analogy se shuru karte hain.
        </p>
        <p style={S.p}>
          <strong>Car factory analogy:</strong> Ek car assembly line imagine karo. Station 1 pe engine lagta hai. Station 2 pe doors lagti hain. Station 3 pe paint hoti hai. Har station apna kaam karta hai aur car agale station ko pass karta hai. Aur yeh assembly line pipeline ki tarah kaam karta hai — car 10 station 1 pe, car 9 station 2 pe, car 8 station 3 pe — sab simultaneously. Ek time pe ek hi car nahi — sabke saath alag-alag stage pe kaam chal raha hai.
        </p>
        <p style={S.p}>
          Systolic Array bilkul aise hi kaam karta hai. Numbers ek 2D grid mein flow karte hain — left se aur top se. Har cell apna kaam karta hai (do numbers multiply karo, running total mein add karo), aur result agale cell ko pass karta hai. Sab cells simultaneously different numbers pe kaam karte hain — ek massive parallel pipeline.
        </p>
        <Figure caption="Systolic Array: Numbers flow in from the left (Row values — think Matrix A) and from the top (Column values — think Matrix B). Each small cell multiplies two numbers and passes results to the next cell. All cells work at the same time — like 65,536 assembly line workers. Real TPU v4 has a 256×256 grid = 65,536 cells simultaneously working.">
          <SystolicArrayDiagram />
        </Figure>
        <p style={S.p}>
          <strong>Kyun yeh fast hai — the key insight:</strong> Traditional approach mein — ek multiplication karo, result memory mein store karo, agla number memory se load karo, phir multiply karo. Bohut saari memory trips. Memory access hi slowest operation hoti hai in computing. Systolic Array mein numbers continuously flow karte hain cell-to-cell — wapas memory mein nahi jaate. Memory trips dramatically reduce ho jaate hain. Isi liye TPU itni fast matrix math karta hai.
        </p>
        <p style={S.p}>
          <strong>Real numbers — TPU v4:</strong> 256 × 256 = 65,536 multiply-accumulate cells. Sab ek saath kaam karte hain. Ek single clock cycle mein: 65,536 multiplications + 65,536 additions = 131,072 operations. At 1 GHz clock speed: 131 billion operations per second — sirf systolic array se alone.
        </p>
      </section>

      {/* ─── TPU CHIP ARCHITECTURE ─────────────────────────────────────── */}
      <section id="tpu-chip-architecture">
        <h2 style={S.h2}>TPU Chip Architecture — Inside the Silicon</h2>
        <p style={S.p}>
          Ek TPU chip sirf systolic array nahi hai. Kai parts hote hain jo sab milke kaam karte hain — jaise ek office mein alag-alag departments. Har department ka apna kaam hai.
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
          <strong>MXU (Matrix Multiply Unit)</strong> — yeh woh hardware block hai jahan systolic array physically hota hai. Puri TPU chip ka dil. Yahan sab matrix multiplication hoti hai — AI ka core operation.
        </p>
        <ul style={S.ul}>
          <li><strong>Size:</strong> TPU v4 mein 256×256 systolic array — matlab 65,536 individual multiply-accumulate cells, sab simultaneously kaam karte hain.</li>
          <li><strong>Precision support:</strong> BFloat16 (primary for training — AI ka preferred format), INT8 (8-bit integers for faster inference), INT32 (accumulation — running totals store karna).</li>
          <li><strong>Data flow:</strong> Numbers flow in from HBM (Fast Memory) → through SRAM (on-chip fast cache) → into systolic array → results accumulated → back to SRAM/HBM. Yeh loop continuously chalta hai.</li>
          <li><strong>Why so large:</strong> Die area (chip ka physical space) TPU mein mostly MXU ke liye reserved hai — yeh design choice hi TPU ko specialist banata hai. GPU mein die area bhi graphics, display controllers, rasterizers ke liye. TPU mein: sirf AI math.</li>
        </ul>
        <Callout type="important" title="MXU vs GPU Tensor Core — Key Difference">
          GPU ka Tensor Core bhi matrix multiplication karta hai, lekin smaller blocks mein. TPU ka MXU ek single large systolic array hai. Architectural approach alag hai: GPU = distributed many small matrix units (thousands of Tensor Cores); TPU = one large unified systolic array. Dono valid approaches hain — different tradeoffs.
        </Callout>
      </section>

      {/* ─── VPU ───────────────────────────────────────────────────────── */}
      <section id="vpu">
        <h2 style={S.h2}>VPU — Vector Processing Unit</h2>
        <p style={S.p}>
          <strong>VPU (Vector Processing Unit)</strong> — TPU ka secondary compute unit. Yeh woh math handle karta hai jo MXU nahi kar sakta.
        </p>
        <p style={S.p}>
          Matrix multiplication ke baad, neural networks kuch aur operations bhi karte hain — <strong>activation functions</strong> (jaise ReLU ya GELU — yeh decide karte hain kaunsa neuron "fire" kare), <strong>softmax</strong> (probability distribution banane ke liye), <strong>layer normalization</strong> (training stable rakhna). Yeh per-element operations hain — har number ko individually process karo.
        </p>
        <p style={S.p}>
          VPU yeh kaam efficiently handle karta hai. MXU aur VPU parallel mein kaam kar sakte hain — jab MXU layer N ki matrix multiply kar raha hota hai, VPU layer N-1 ke output pe activation apply kar raha hota hai. Yeh pipelining overall throughput improve karta hai.
        </p>
      </section>

      {/* ─── HBM IN TPU ────────────────────────────────────────────────── */}
      <section id="hbm-tpu">
        <h2 style={S.h2}>HBM Memory in TPU</h2>
        <p style={S.p}>
          <strong>HBM (High Bandwidth Memory)</strong> — yeh "Fast GPU-style Memory" hai jo TPU chip ke saath directly integrated hoti hai. Pehle <TopicLink slug="ai-gpu" variant="inline" /> article mein detail mein cover kiya tha — TPU mein same technology use hoti hai.
        </p>
        <p style={S.p}>
          <strong>Simple reminder — office analogy:</strong> Socho aapke paas do storage options hain. Option 1: Aapki desk pe ek small tray — limited space lekin aap second mein kuch bhi utha sakte ho. Option 2: Building ki doosri floor pe ek bada storage room — bahut space lekin lift leni padti hai (slow). HBM aapki desk ki tray ki tarah hai — chip ke bilkul paas, ultra-fast. Regular DRAM (motherboard pe) building ki doosri floor hai — slow comparatively.
        </p>
        <ul style={S.ul}>
          <li><strong>Capacity:</strong> TPU v4: 32GB HBM2 per chip. TPU v5p: 95GB HBM3 per chip. Multiple chips = proportionally more total memory in a Pod.</li>
          <li><strong>Bandwidth:</strong> TPU v4 HBM: ~900 GB/s per chip — matlab har second 900 gigabytes data transfer ho sakta hai chip ke andar se.</li>
          <li><strong>What&apos;s stored in HBM:</strong> Model weights (neural network ke parameters — jo training mein seekhe hain), activations (intermediate calculations during forward pass), gradients (during training — backward pass ke numbers).</li>
          <li><strong>Memory constraint — real problem:</strong> Ek 70B parameter model at BFloat16 = 140GB. Ek single TPU v4 chip ke paas sirf 32GB HBM hai. Model fit nahi hota. Solution: model sharding — model ko multiple chips mein split karo. Yahi wajah hai ki TPU Pod zaroorat padti hai for large models.</li>
        </ul>
      </section>

      {/* ─── BFLOAT16 ──────────────────────────────────────────────────── */}
      <section id="bfloat16">
        <h2 style={S.h2}>BFloat16 — TPU's Special Number Format</h2>
        <p style={S.p}>
          Numbers computers mein binary (0s aur 1s) mein store hote hain. Zyada bits = zyada accurate number = zyada memory use = slower computation. AI training mein ek important discovery hui: full accuracy (FP32 — 32 bits) zaroori nahi hai. Approximate calculations bhi same quality results dete hain, aur much faster hote hain.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Socho aap ek recipe mein 2.71828 grams salt dalte ho. Kyun? "Almost 3 grams" bilkul wahi result dega. Yeh approximation AI training mein bhi kaam karti hai — model quality barely changes lekin speed dramatically improve hoti hai.
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
          <strong>Kyun BFloat16 AI training ke liye perfect hai:</strong> Training mein number range important hai — agar range chhota ho toh numbers overflow ho sakte hain (number too big to represent = NaN error = training crash). Precision thodi kam ho toh typically model quality pe minimal impact padta hai. BFloat16 FP32 jaisi range deta hai (8 exponent bits) lekin sirf 16 bits use karta hai. Result: 2× less memory, 2× faster computation — minimal quality loss. Win-win.
        </p>
        <p style={S.p}>
          Google ne BFloat16 TPU v2 ke saath introduce kiya (2017). Aaj yeh LLM training ka standard format ban chuka hai — NVIDIA ke H100, AMD MI300X — sab natively support karte hain. TPU ne yeh trend start kiya aur baaki industry ne follow kiya.
        </p>
      </section>

      {/* ─── TPU INTERCONNECT ──────────────────────────────────────────── */}
      <section id="tpu-interconnect">
        <h2 style={S.h2}>TPU Interconnect — How Chips Talk to Each Other</h2>
        <p style={S.p}>
          Ek chip powerful hai lekin kaafi nahi. Scale karne ke liye — 4,096 chips ek saath — chips ko ek dusre se directly baat karni padti hai, fast aur efficiently.
        </p>
        <Figure caption="ICI (Direct Chip-to-Chip Links): Each TPU chip has 6 high-speed direct connections to its neighbours in 3 directions (left-right, front-back, up-down) forming a 3D Donut Network (Torus). Any chip reaches any other chip in just a few hops. No external network switch needed — chips connect directly. TPU v4 uses light (optical fiber) instead of copper wire for these links.">
          <TpuInterconnect />
        </Figure>
        <p style={S.p}>
          <strong>ICI (Inter-Chip Interconnect)</strong> — iska matlab hai "chips ke beech direct connection." Google ka custom-designed system hai. GPU clusters mein: chips ko ek dusre se baat karni ho toh external InfiniBand switches khareedne padte hain — expensive aur complex. TPU mein: ICI chips ko directly connect karta hai — koi baahri switch nahi chahiye.
        </p>
        <ul style={S.ul}>
          <li><strong>6 links per chip:</strong> Har TPU chip ke paas 6 direct connections hain — 2 links left-right (X-direction), 2 links front-back (Y-direction), 2 links up-down (Z-direction). Koi bhi chip apne immediate neighbour se seedha baat kar sakta hai.</li>
          <li><strong>3D Torus topology:</strong> "Torus" matlab donut shape. Last chip first chip se wrap-around connect hoti hai — teeno dimensions mein. Yeh ensure karta hai ki koi bhi chip kisi bhi chip se sirf kuch hops mein communicate kar sake. Imagine karo ek globe jahan har city directly connected hai nearby cities se aur edges wrap around — koi dead ends nahi.</li>
          <li><strong>Optical fiber (v4+):</strong> TPU v4 ne ek major innovation kiya — copper wire ki jagah light (optical fiber) use karna for ICI links. Copper ki limited bandwidth hoti hai distance ke saath. Optical fiber data center ke across bhi fast aur low-latency communicate kar sakta hai. Yeh woh reason hai ki TPU v4 ke 4,096-chip Pods multiple racks across a data center span kar sakte hain.</li>
          <li><strong>Bandwidth:</strong> Hundreds of GB/s per direction per link — GPU ke NVLink (900 GB/s total) ke comparable. Lekin NVLink ke liye NVSwitch chips chahiye hoti hain; ICI direct hai.</li>
        </ul>
        <Callout type="important" title="ICI vs GPU InfiniBand — DC Engineer Perspective">
          GPU cluster: har server se InfiniBand NIC (network card) lagti hai, external InfiniBand switches (lakhs mein) khareedne padte hain, cables run karne padte hain, switch fabric configure karna padta hai. TPU Pod: ICI built into every chip, no external switches, Google-managed. For a DC engineer hosting GPU vs TPU infrastructure: GPU cluster = complex network cabinet design; TPU Pod = simpler internal connectivity, less external networking equipment needed within the Pod.
        </Callout>
      </section>

      {/* ─── TPU POD ───────────────────────────────────────────────────── */}
      <section id="tpu-pod">
        <h2 style={S.h2}>TPU Pod — Supercomputer from Individual Chips</h2>
        <p style={S.p}>
          Ek TPU chip powerful hai — lekin ek 70B parameter model ek chip ke 32GB HBM mein fit nahi hota, aur training ke liye aur bhi zyada memory chahiye. Isliye <strong>TPU Pod</strong> ka concept aaya — multiple chips ko ek team ki tarah connect karo.
        </p>
        <p style={S.p}>
          <strong>Simple analogy:</strong> Ek badi book hai — itni badi ki ek aadmi ek baar mein utha nahi sakta. Solution: 10 log book ke alag-alag hisse uthao aur simultaneously padhate hain — results share karte hain. Yahi TPU Pod karta hai with model weights.
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
          Har version ek significant leap tha — sirf incremental improvement nahi.
        </p>
        <ul style={S.ul}>
          <li><strong>TPU v1 (2016):</strong> Pehla TPU. Sirf inference (existing trained model use karna) — training nahi kar sakta tha. INT8 operations (8-bit integers). 8GB DRAM (HBM nahi — older slower memory). Google Search aur Translate ke liye deploy kiya. Die area mostly matrix multiply unit — hi yahi philosophy jo aaj bhi hai. Ek baar BFloat16 aaya, v1 quickly outdated ho gaya.</li>
          <li><strong>TPU v2 (2017):</strong> Game changer. Training support aaya — ab models banana possible. BFloat16 format introduce kiya — AI training standard jo eventually GPU world ne bhi adopt kiya. HBM (High Bandwidth Memory — fast chip-adjacent memory) aaya — memory bandwidth dramatically better. Liquid cooling zaroori hua — higher power = more heat. 2 chips per board.</li>
          <li><strong>TPU v3 (2018):</strong> Roughly 8× more powerful than v2 per chip. Better HBM (HBM2). More advanced cooling systems. 4 chips per board. Early BERT aur AlphaGo models train hue yahan.</li>
          <li><strong>TPU v4 (2021):</strong> Major architecture change. Optical fiber ICI — light instead of copper for chip-to-chip links — enabled 4,096-chip Pods across full data center. Roughly 2× faster than v3 per chip, but Pod-scale = 10× more total compute available. PaLM (540B parameter model) aur early Gemini versions yahan train hue.</li>
          <li><strong>TPU v5e (2023):</strong> "e" = efficiency. Best cost per FLOP — most accessible pricing for developers. 256-chip Pods standard configuration. Good for fine-tuning aur medium-scale training. Most developers ko yahi choose karna chahiye cost-performance ke liye.</li>
          <li><strong>TPU v5p (2023):</strong> "p" = performance. Higher compute, 95GB HBM3 per chip (vs 16GB in v5e). Large-scale frontier model training ke liye. Higher cost. Gemini Ultra scale training ke liye.</li>
          <li><strong>Trillium / TPU v6e (2024):</strong> Google IO 2024 pe announced. ~4.7× performance improvement over v5e claimed by Google. Details limited at time of writing — verify on Google Cloud documentation for current availability.</li>
        </ul>
      </section>

      {/* ─── SOFTWARE STACK ────────────────────────────────────────────── */}
      <section id="software-stack">
        <h2 style={S.h2}>Software Stack — TensorFlow, JAX, aur XLA</h2>
        <p style={S.p}>
          Hardware acha hai lekin software ke bina kuch nahi. TPU pe code kaise likhte hain — aur kaunsa framework best hai?
        </p>
        <ul style={S.ul}>
          <li><strong>TensorFlow (Google ka original ML framework):</strong> TPU ke saath natively kaam karta hai. <code style={S.code}>tf.distribute.TPUStrategy</code> use karo — baaki automatically handle hota hai. Mature, stable, production-ready. Large Google internal codebase TF pe based hai.</li>
          <li><strong>JAX (Google ka newer research framework):</strong> NumPy-like syntax — agar NumPy jaante ho, JAX quickly seekh sakte ho. <code style={S.code}>jax.devices(&quot;tpu&quot;)</code> — TPU automatically use hoti hai. Google internally ab JAX prefer karta hai TF ke upar for research. Gemini models JAX pe train hue. TPU use karna hai toh JAX best choice hai.</li>
          <li><strong>Keras (user-friendly wrapper):</strong> High-level API jo TensorFlow ke upar kaam karta hai. <code style={S.code}>model.compile(); model.fit()</code> — simplest interface. Beginners ke liye good starting point.</li>
          <li><strong>T5X / MaxText (Google&apos;s internal tools):</strong> Google ka internal framework specifically large transformer model training ke liye. Gemini models train karne ke liye use hota hai. Open-source GitHub pe available hai.</li>
          <li><strong>PyTorch (community favorite):</strong> Directly TPU pe nahi chalta — CUDA (NVIDIA-specific) pe chalti hai. TPU pe chalani ho toh torch_xla (a bridge library) use karna padta hai. Next section mein detail.</li>
        </ul>
      </section>

      {/* ─── XLA COMPILER ──────────────────────────────────────────────── */}
      <section id="xla-compiler">
        <h2 style={S.h2}>XLA Compiler — The Translator</h2>
        <p style={S.p}>
          Aapne Python mein code likha. TPU machine instructions samajhta hai — very different language. In dono ke beech <strong>XLA (Accelerated Linear Algebra) compiler</strong> hai — yeh ek translator hai jo aapka Python code TPU ki language mein convert karta hai, aur translate karte waqt optimize bhi karta hai.
        </p>
        <p style={S.p}>
          <strong>Analogy — Experienced Translator:</strong> Aapne Hindi mein ek recipe likhi hai. Chef Japanese hai. Ek basic translator simply word-by-word translate karta. Lekin ek experienced translator (XLA) recipe ko Japanese mein convert karta hai aur saath mein inefficient steps merge karta hai — "sabzi alag kaato" + "thodi der baad pan mein daalo" = "sabzi seedha pan mein kaato." Better result, fewer steps.
        </p>
        <p style={S.p}>
          <strong>What XLA actually does:</strong>
        </p>
        <ul style={S.ul}>
          <li>Aapke Python code ka <strong>computation graph</strong> (saare operations ka map) analyze karta hai</li>
          <li><strong>Operation fusion:</strong> Multiple chhote operations ko ek bada operation mein merge karta hai — memory trips reduce hoti hain</li>
          <li><strong>Memory layout optimization:</strong> Data arrange karta hai TPU ke liye optimal format mein — systolic array efficient access kar sake</li>
          <li><strong>Dead code elimination:</strong> Unnecessary operations remove karta hai — jo result affect nahi karte</li>
          <li>Resulting <strong>compiled artifact</strong> cache karta hai — agali baar same code much faster compile hoti hai</li>
        </ul>
        <Callout type="warning" title="XLA First Compile — Time Lagta Hai!">
          Pehli baar jab aap TPU pe code run karte ho, XLA compile karta hai — yeh slow ho sakta hai (1-5 minutes even). Yeh expected hai aur normal hai. Subsequent runs cache use karte hain aur very fast hote hain. Production deployment mein: pre-compiled artifacts use karo. Research experiments mein: pehla run slow expect karo — panic mat karo.
        </Callout>
        <p style={S.p}>
          <strong>Dynamic shapes — ek common gotcha:</strong> XLA ko static shapes prefer hain — matlab tensor dimensions (array ka size) compile time pe fixed hone chahiye. Agar aapka code har step pe alag-alag tensor sizes use karta hai, toh har shape change pe XLA recompile karta hai — very slow, defeating the purpose. Solution: fixed shapes use karo har tensor ke liye, ya padding se shapes standardize karo. Real-world impact: agar aap variable-length sequences process kar rahe ho (jaise sentences of different lengths), sab ko same length pe pad karo.
        </p>
      </section>

      {/* ─── PYTORCH XLA ───────────────────────────────────────────────── */}
      <section id="pytorch-xla">
        <h2 style={S.h2}>PyTorch on TPU — torch_xla</h2>
        <p style={S.p}>
          PyTorch AI research ka most popular framework hai — most universities, most researchers, most open-source projects PyTorch use karte hain. Problem: PyTorch directly TPU pe nahi chalta — yeh CUDA (NVIDIA ka ecosystem) pe chalti hai. Google ne ek bridge banaya: <code style={S.code}>torch_xla</code> library.
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
          <strong>Honest recommendation:</strong> Agar aap TPU use karna chahte ho aur framework choice aapki hai — <strong>JAX use karo</strong>. TPU ke saath JAX ka experience much better hai — native support, no weird lazy evaluation issues, better debugging. PyTorch + torch_xla use karo sirf agar aapka existing codebase already PyTorch mein hai aur migration cost too high hai.
        </p>
      </section>

      {/* ─── TRAINING PIPELINE ─────────────────────────────────────────── */}
      <section id="training-pipeline">
        <h2 style={S.h2}>Training Pipeline on TPU</h2>
        <p style={S.p}>
          Ek AI model TPU pe kaise train hota hai — step by step, plain language mein.
        </p>
        <Figure caption="TPU Training Pipeline: Data Storage (GCS Bucket — Google's cloud file storage) → Data Feeder (tf.data — keeps chips fed with batches) → Code Translator (XLA Compile — converts Python to TPU code) → TPU Forward Pass (Systolic Array doing matrix math layer by layer) → Error Calculator (Loss — how wrong was the prediction?) → Error Backflow (Backpropagation — all chips share error info via ICI links) → Parameter Update (Optimizer — weights improved) → repeat until model is good.">
          <TpuTrainingPipeline />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Data Storage (GCS — Google Cloud Storage):</strong> Training data Google Cloud Storage mein stored hoti hai — basically Google ka cloud hard drive. TPU aur GCS ke beech Google ka internal high-speed network hai — not the public internet. Data batches mein prefetch hoti hai taaki TPU chips kabhi idle nahi rehte data ka wait karke.</li>
          <li><strong>Data Pipeline (tf.data ya grain):</strong> Automated feeding system. Think of it as a conveyor belt from storage to TPU chips — continuously data deliver karta rehta hai. Chips never starve for data.</li>
          <li><strong>XLA Compilation:</strong> Pehla step — Python code ko TPU language mein translate aur optimize karo. Sirf ek baar (per unique shape) — phir cache use hota hai.</li>
          <li><strong>Forward Pass (MXU kaam karta hai):</strong> Training data MXU ke systolic array ke through jaata hai. Layer by layer — har layer ek matrix multiplication hai. Activations VPU pe apply hoti hain. End result: model ka prediction for this batch.</li>
          <li><strong>Loss Calculation:</strong> Prediction vs actual answer — kitna wrong tha? Ek single number (loss value) calculate hota hai. Lower = better.</li>
          <li><strong>Backpropagation (gradients share hote hain via ICI):</strong> Loss se gradients (error signals) calculate karo. Yeh sab chips ke beech ICI links se all-reduce karo — ek operation jahan sab chips apne gradients share karte hain aur average receive karte hain. Sab chips ek hi updated gradient information lete hain.</li>
          <li><strong>Weight Update (optimizer kaam karta hai):</strong> Optimizer (AdamW, Adafactor) gradients use karke model weights update karta hai. Next iteration ke liye slightly better predictions. Yeh cycle repeat hoti hai thousands of times.</li>
        </ul>
      </section>

      {/* ─── INFERENCE PIPELINE ────────────────────────────────────────── */}
      <section id="inference-pipeline">
        <h2 style={S.h2}>Inference on TPU</h2>
        <p style={S.p}>
          <strong>Inference</strong> matlab trained model use karna real users ke liye — training nahi, sirf predictions. Google ke production services — Search, Translate, Gemini — billions of daily queries TPU inference se handle karte hain.
        </p>
        <Figure caption="TPU Inference Pipeline: User sends request → Load Balancer routes to available TPU → Pre-compiled AI model (already in Fast Memory/HBM) processes the request using the Systolic Array → Response sent back to user. TPU handles many users at once (high batch throughput). For single-user fast response, GPU is often better.">
          <TpuInferencePipeline />
        </Figure>
        <p style={S.p}>
          <strong>Inference vs Training — hardware ke perspective se kya fark hai:</strong>
        </p>
        <ul style={S.ul}>
          <li>Training: Gradients store karne padte hain (memory heavy — 3× model size roughly). Backpropagation hota hai. Multiple forward+backward passes per step.</li>
          <li>Inference: Sirf forward pass. No gradients stored. Smaller memory footprint. But latency critical — user wait kar raha hai response ke liye.</li>
          <li>TPU inference ka strength: High batch throughput — ek saath hundreds ya thousands of user queries efficiently process karo. Google Search per day 8.5 billion+ queries — TPU yeh batch efficiently handle karta hai.</li>
          <li>TPU inference limitation: Single user latency mein GPU sometimes better hota hai — TPU batching aur pipelining prefer karta hai, single isolated request ke liye less optimized.</li>
        </ul>
      </section>

      {/* ─── TRAINING VS INFERENCE ─────────────────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference — Key Differences</h2>
        <ComparisonTable
          headers={["Aspect", "Training (Model Banana)", "Inference (Model Use Karna)"]}
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
          <strong>Cloud TPU</strong> — yaad rakhna: TPU hardware on-premises nahi milta. TPU chips sirf Google ke data centers mein hain. Access karne ka ek hi tarika hai — Google Cloud pe rent karo jab zaroorat ho, return karo (stop paying) jab kaam khatam.
        </p>
        <p style={S.p}>
          <strong>Practical flow — aap kya karte ho:</strong> Apne laptop pe TensorFlow ya JAX mein code likho → Google Cloud Console pe TPU VM create karo → aapka code cloud pe run hota hai → results Google Cloud Storage mein save hote hain → aap result download karo. Aapke paas koi GPU ya TPU hardware nahi chahiye physically.
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
          <strong>Pricing options — teen types:</strong> On-demand (most expensive, start/stop anytime, no commitment), Spot/Preemptible (60-80% cheaper, Google can interrupt it — good for training with checkpointing enabled), Committed use (1-3 year commitment for significant discount — good if you know you&apos;ll use TPUs long-term).
        </p>
        <Callout type="best-practice" title="Practical Cost Optimization for Cloud TPU">
          Preemptible TPUs use karo training ke liye — 70%+ cost savings. Lekin: checkpoint karo every 30 minutes (GCS mein save karo) taaki agar Google interrupt kare toh kaam zyada lost na ho. GCS bucket TPU ke same region mein create karo — different regions mein data transfer costly aur slow hota hai. Off-peak hours pe schedule karo agar possible — better preemptible availability. v5e start karo — v4 sirf tab agar v5e pe performance insufficient ho.
        </Callout>
      </section>

      {/* ─── TPU VS GPU ────────────────────────────────────────────────── */}
      <section id="tpu-vs-gpu">
        <h2 style={S.h2}>TPU vs GPU — Deep Comparison</h2>
        <p style={S.p}>
          Dono powerful hain. Dono AI ke liye use hote hain. Lekin practically very different hain. Yeh table honest comparison deta hai — marketing nahi.
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
          Dono tools hain — neither is universally better. Sahi choice use case pe depend karta hai. Yeh decision guide hai:
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
          TPU sirf ek chip nahi hai — yeh ek complete infrastructure stack ka foundation hai. Jab aap Google Search use karte ho, Google Photos mein face detect hoti hai, ya Google Translate sentence translate karta hai — neeche yeh poora stack kaam karta hai silently.
        </p>
        <Figure caption="Google AI Stack from bottom to top: Physical Data Center (liquid cooling pipes, high-density power, optical fiber cables) → TPU Chip Layer (MXU matrix engine + fast memory) → TPU Pod Clusters (thousands of chips as one) → Model Framework (JAX/TensorFlow/XLA code translator) → Foundation Models (Gemini, PaLM, Gemma) → Google AI Products you use daily (Search, Translate, Photos, Gemini App).">
          <GoogleAiInfraStack />
        </Figure>
        <p style={S.p}>
          Every time aap Google Search use karte ho — ek chain of events hoti hai: aapki query input hoti hai → Model framework (JAX) processed query → XLA-compiled code TPU chips pe runs → Systolic arrays matrix multiplications karte hain → Result aapko milliseconds mein milta hai. Sab kuch is stack ke through.
        </p>
      </section>

      {/* ─── GEMINI TRAINING ───────────────────────────────────────────── */}
      <section id="gemini-training">
        <h2 style={S.h2}>Gemini Training on TPU</h2>
        <p style={S.p}>
          <strong>Gemini</strong> — Google ka latest frontier AI model (ChatGPT ka competitor) — TPU pe train hua. Yeh real-world example hai TPU ka at absolute maximum scale. Numbers staggering hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Multiple model sizes ek saath:</strong> Gemini Nano (on-device, small phone-size model) se Gemini Ultra (largest, most capable) — Google multiple sizes maintain karta hai alag-alag use cases ke liye. Har size ke liye alag training runs.</li>
          <li><strong>Infrastructure scale:</strong> Multiple TPU v4 Pods across multiple Google data centers simultaneously. Gemini Ultra training mein reportedly 16,000+ TPU v4 chips involved. Pod-to-Pod communication: optical fiber ICI across data centers — not just within one building.</li>
          <li><strong>Framework:</strong> JAX + T5X/MaxText — Google ke internal frameworks. XLA compilation throughout the pipeline. Custom gradient checkpointing for memory efficiency at this scale.</li>
          <li><strong>Training data:</strong> Multimodal — text + images + video + audio simultaneously. Stored in Google Colossus (Google ka internal distributed storage system — like a massive internal Google Drive at petabyte scale). Petabytes of training data.</li>
          <li><strong>Duration:</strong> Weeks to months of continuous training. 24/7 monitoring teams. Automatic job restart on any chip failure — checkpoints every 30 minutes, restart from there.</li>
          <li><strong>Parallelism:</strong> 3D parallelism simultaneously — data parallelism (same model, different data batches), model parallelism (model split across chips), pipeline parallelism (layers split in stages). All coordinated via ICI within Pods and fiber between Pods.</li>
        </ul>
        <Callout type="maintenance" title="Cost Reality Check">
          Frontier model training at Gemini Ultra scale: Hundreds of millions of dollars in compute cost estimated. Yeh woh reason hai ki only a handful of organizations globally can train frontier models — Google, OpenAI/Microsoft, Meta, Anthropic, xAI. For everyone else: fine-tuning an existing model (much cheaper) ya using APIs hai more practical.
        </Callout>
      </section>

      {/* ─── DATA CENTER INFRA ─────────────────────────────────────────── */}
      <section id="data-center-infra">
        <h2 style={S.h2}>Data Center Infrastructure for TPU</h2>
        <p style={S.p}>
          DC engineers ke liye yeh section specially important hai. TPU infrastructure standard data center design se significantly different hai — different hardware, different power, different cooling, different networking.
        </p>
        <ul style={S.ul}>
          <li><strong>Physical form factor:</strong> TPU boards (4 chips per printed circuit board) specially designed server enclosures mein hote hain — standard 1U/2U rack servers nahi hain. Google custom rack design use karta hai. Multiple boards ek rack mein vertically stacked. Floor load requirements high hain — these racks are heavy.</li>
          <li><strong>Storage infrastructure:</strong> Internally Google Colossus (distributed file system) use hota hai. Public developers ke liye: Google Cloud Storage (GCS) — aapka data GCS mein hota hai → TPU directly GCS se read karta hai Google ke internal high-speed network pe (not public internet). Latency: effectively milliseconds vs seconds if data were off-network.</li>
          <li><strong>Networking — two types:</strong> ICI network (internal TPU Pod fabric — optical fiber, chip-to-chip) aur external network (standard Ethernet for management, data ingestion from GCS, external API calls). DC engineer ka kaam: ICI ke liye specialized optical cabling plan karna; external ke liye standard networking.</li>
          <li><strong>Monitoring systems:</strong> Google internal tools monitor everything — power per chip, per board, per rack; temperature per board; chip performance health metrics; ICI link error rates. Automatic failure detection triggers replacement scheduling. DC operations team alert hota hai before user impact.</li>
        </ul>
      </section>

      {/* ─── POWER AND COOLING ─────────────────────────────────────────── */}
      <section id="power-cooling">
        <h2 style={S.h2}>Power and Cooling</h2>
        <p style={S.p}>
          DC engineers ke liye yeh sabse important section hai. TPU infrastructure standard IT equipment se completely different power aur cooling demands rakhta hai.
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
          <strong>Kyun liquid cooling mandatory hai — simple explanation:</strong> 200W ek single chip se = ek haater ki tarah. 4 chips per board = 800W = ek small electric oven. Ek rack full of boards = 40-100 kW = ek ghar ka poora electrical load. Air cooling (fans) itni heat efficiently remove nahi kar sakta at this density. Liquid cooling (cold water pipes directly to chip surface) mandatory ban jaata hai.
        </p>
        <p style={S.p}>
          <strong>Direct Liquid Cooling (DLC) — kaise kaam karta hai:</strong> Cold water (18-22°C typical) supply pipes rack mein aate hain → cold plates directly chip surface pe touch karti hain → heat water mein transfer hoti hai → warm water (35-45°C) return pipes se facility chiller pe jaata hai → chiller water cool karta hai → cycle repeat. Facility mein: chilled water plant, cooling towers, redundant pumps sab planning mein aane chahiye day 1 se.
        </p>
        <Callout type="important" title="DC Engineers ke Liye — Critical Planning Points">
          Agar aap TPU-hosting DC ya Google Cloud colocation facility design kar rahe ho: Power density planning: 40-100 kW per rack (GPU ke saath same order of magnitude). Liquid cooling: non-negotiable — design it in from day 1, not as an afterthought. Floor load: heavy custom racks — structural assessment mandatory. Optical cabling: ICI links ke liye specialized fiber infrastructure. UPS sizing: 800 kW for a full v4 Pod means large UPS aur generator capacity. PUE impact: liquid cooling highly efficient — PUE 1.1-1.3 achievable vs air cooling PUE 1.5-2.0.
        </Callout>
        <p style={S.p}>
          <strong>Power efficiency — the upside:</strong> TPU per FLOP power consumption GPU se competitive ya better hai for matrix workloads. Iska matlab: same training job ke liye, TPU ka total electricity bill GPU cluster se comparable ya lower ho sakta hai — provided your workload fits TPU well. Yeh woh reason hai ki Google khud TPU develop kiya — at billions-of-queries scale, even 20% better efficiency = massive cost savings.
        </p>
      </section>

      {/* ─── COST ANALYSIS ─────────────────────────────────────────────── */}
      <section id="cost-analysis">
        <h2 style={S.h2}>Cost Analysis</h2>
        <p style={S.p}>
          Cost comparison GPU vs TPU complicated hai — workload type, scale, framework, aur utilization sab matter karte hain. Yeh ek rough framework hai decision-making ke liye.
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
          Cloud pricing changes frequently — Google ne multiple times TPU pricing revise kiya hai (generally downward as scale increases). Numbers upar illustrative hain sirf — always verify on cloud.google.com/tpu/pricing before making decisions. Exact comparison heavily depends on: workload TPU-compatibility, batch size (TPU prefers large batches), and framework (JAX gives better TPU utilization than torch_xla).
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
          <li><strong>Trillium (TPU v6e, 2024):</strong> Google IO 2024 pe announced. ~4.7× performance improvement over v5e claimed by Google. Better cost efficiency per FLOP. Expected to become the standard choice for most workloads when fully available. Verify current availability at cloud.google.com/tpu.</li>
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
            q: "TPU kyun banaya gaya — kaunsi problem solve karta hai?",
            a: "2013 mein Google ne calculate kiya ki agar log Google's voice search widely use karein, toh existing CPU/GPU infrastructure affordable nahi rahegi — too expensive, too power-hungry at billions-of-queries scale. AI ka core operation matrix multiplication hai. CPU aur GPU is kaam ke liye general-purpose hain, efficient nahi. Google ne ek specialist chip design kiya jo 90%+ die area (chip ka physical space) specifically matrix multiplication ke liye dedicate karta hai — TPU. Result: TPU v1 (2016) ne same AI workload ke liye Google ke data center footprint ko 7x reduce kar diya. Economics of scale pe yeh billions of dollars saved annually for Google's internal workloads. Yeh economic driver hi TPU development justify karta hai.",
          },
          {
            q: "Systolic Array kya hai — simple language mein?",
            a: "Assembly line factory analogy best hai: Car factory mein stations hote hain — station 1 engine lagata hai, station 2 doors lagata hai, station 3 paint karta hai. Simultaneously multiple cars alag stations pe process hoti hain — conveyor belt ki tarah. Systolic Array exactly aise kaam karta hai but for numbers. Numbers ek 2D grid mein flow karte hain — left se (Matrix A ke rows) aur top se (Matrix B ke columns). Har cell ek simple kaam karta hai: do numbers multiply karo, running total mein add karo, result adjacent cell ko pass karo. Sab cells simultaneously kaam karte hain — massive parallel pipeline. Memory trips minimize hote hain kyunki numbers flow karte rehte hain, wapas memory mein nahi jaate. TPU v4: 256×256 = 65,536 cells simultaneously. Yeh matrix multiplication ke liye optimal hai — aur AI ka 90%+ computation matrix multiply hai.",
          },
          {
            q: "BFloat16 kya hai aur GPU FP16 se kaise alag hai?",
            a: "BFloat16 (Brain Float 16) ek 16-bit number format hai jo Google ne AI training ke liye specifically design kiya. Comparison: FP32 = 32 bits (8 exponent + 23 mantissa). FP16 = 16 bits (5 exponent + 10 mantissa). BFloat16 = 16 bits (8 exponent + 7 mantissa). Key difference: BFloat16 ka exponent (number range) FP32 jaisa hai — large range. FP16 ka exponent chhota hai — limited range, overflow risk. Neural network training mein: range important hai (overflow se NaN errors = training crash), precision less critical (approximate math works). BFloat16 FP32 ki range deta hai lekin FP16 ki speed aur memory efficiency. Google ne TPU v2 ke saath introduce kiya, aaj H100 bhi BFloat16 natively support karta hai — industry standard ban gaya.",
          },
          {
            q: "TPU Pod kya hai aur ICI kaise kaam karta hai?",
            a: "TPU Pod multiple TPU chips ko high-speed interconnect se connect karke ek unified supercomputer banata hai. TPU v4 Pod: 4,096 chips = ~1.1 EFLOPS total — yeh woh scale hai jahan Gemini train hua. ICI (Inter-Chip Interconnect) Google ka custom chip-to-chip direct connection system hai. Har chip ke paas 6 ICI links hote hain — 2 each in 3 directions (X/Y/Z axes). Yeh 3D Torus topology banata hai — like a donut in 3 dimensions. Any chip reaches any other in few hops. TPU v4 mein optical fiber (light) use hoti hai ICI ke liye — copper se faster at longer distances within a data center. GPU clusters ke comparison mein: GPU ko external InfiniBand switches chahiye (expensive equipment). TPU Pod mein ICI built-in — no external switches within the Pod. Pod mein model, data, aur pipeline parallelism simultaneously hoti hai — 4,096 chips ek logical unit ki tarah behave karte hain.",
          },
          {
            q: "XLA compiler kya karta hai aur kyun important hai?",
            a: "XLA (Accelerated Linear Algebra) ek compiler hai — code translator + optimizer. Aapka Python/TF/JAX code directly TPU pe nahi chalta. XLA: (1) Aapke code ka computation graph analyze karta hai, (2) operations fuse karta hai (multiple chhote ops → ek big op — memory trips reduce), (3) memory layout optimize karta hai (data TPU ke systolic array ke liye best arrangement mein), (4) TPU-specific machine code generate karta hai, (5) compiled result cache karta hai for future use. Analogy: aapne Hindi mein recipe likhi, XLA experienced Japanese translator hai jo translate karta hai aur inefficient steps bhi merge karta hai. Practical gotcha: First compilation slow (minutes). Dynamic tensor shapes recompilation trigger karte hain — always use fixed shapes on TPU. Custom CUDA kernels nahi chalenge — rewrite in JAX/TF native ops.",
          },
          {
            q: "Kab TPU use karein aur kab GPU better choice hai?",
            a: "TPU choose karo when: TensorFlow ya JAX use kar rahe ho (native support, smooth experience), standard transformer architectures train kar rahe ho (BERT, T5, ViT, LLM), Google Cloud pe already ho, high-throughput batch inference chahiye (thousands of requests/second), cost optimize karna hai aur variable workloads hain (preemptible TPUs 70%+ savings). GPU choose karo when: PyTorch ecosystem mein deep ho especially with custom CUDA operations (TPU mein nahi chalenge), research mein experimental architectures hai (flexibility required), data sovereignty needed (on-premises required — TPU = Google Cloud only), low-latency single-request inference (<100ms per user), multi-cloud strategy (GPU everywhere, TPU only GCP), HuggingFace models directly use karne hain. Quick rule: Production TF/JAX training at scale = TPU. PyTorch + research flexibility = GPU. Data must stay in your building = GPU on-premises.",
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
          <li>TPU ek specialist chip hai — sirf matrix multiplication (do number grids multiply karna) karta hai. CPU = generalist (any program). GPU = parallel generalist (graphics + AI). TPU = extreme specialist (AI math only). Specialization ka benefit: for the right workload, dramatically better performance per watt. Drawback: kuch aur nahi kar sakta. Swiss Army Knife nahi — surgical scalpel.</li>
          <li>Systolic Array TPU ka core innovation hai. Assembly line ki tarah — numbers flow karte hain ek 2D grid mein, har cell simultaneously kaam karta hai, results pass forward karte hain, memory trips dramatically reduce hoti hain. 65,536 cells ek saath (256×256) in TPU v4. Memory trips reduce karna hi speed ka secret hai.</li>
          <li>BFloat16 Google ka biggest contribution to AI computing hai. FP32 range + 16-bit speed aur memory = stable AI training at 2× cost savings. GPU world ne bhi BFloat16 adopt kiya (H100 onwards). LLM training ka de-facto standard format ban gaya hai globally. TPU ne yeh trend start kiya.</li>
          <li>XLA compiler critical piece hai — invisible lekin essential. Aapka Python code directly TPU pe nahi chalta. XLA translate aur optimize karta hai. First compile slow (expected), then cached (fast). Dynamic shapes avoid karo — har shape change pe recompilation = slow. JAX use karo XLA ke saath — best experience.</li>
          <li>TPU Pod scaling remarkable hai. Single chip se 4,096 chips — ICI se directly connected, no external switches, 3D Torus topology. TPU v4 Pod: ~1.1 exaflop. Optical fiber ICI ne yeh Pod scale possible banaya. Gemini yahan train hua. GPU clusters ko expensive external InfiniBand switches chahiye — TPU Pods mein ICI built-in.</li>
          <li>Cloud TPU = no on-premises option — yeh fundamental constraint hai. TPU hardware Google ke data centers mein hai, anywhere else nahi milta. Data sovereignty concerns wale organizations (banking, healthcare, government) ke liye GPU on-premises better hai. Vendor lock-in significant consideration hai — plan accordingly.</li>
          <li>JAX + TPU = best combination available today. PyTorch + GPU = best combination for research flexibility. Switching frameworks has real cost — engineer time, code migration, testing. Choose framework based on your long-term strategy, not just today's task.</li>
          <li>Cost optimization: Preemptible TPUs 60-80% cheaper. Checkpoint every 30 minutes. GCS bucket same region mein rakho. TPU v5e best cost-performance for most medium workloads. Committed use discounts for long-term usage. Check current pricing — it changes.</li>
          <li>DC Engineers ke liye critical numbers: 40-100 kW per rack, mandatory liquid cooling (Direct Liquid Cooling with cold plates), heavy custom racks (floor load assessment), optical cabling for ICI, large UPS/generator sizing. Same density challenges as GPU data centers but different hardware entirely. Plan liquid cooling infrastructure day 1 — retrofitting is expensive.</li>
          <li>Future is custom silicon — not just NVIDIA GPUs. Google (TPU), AWS (Trainium), Meta (MTIA), Microsoft (Maia), Cerebras, Graphcore — everyone building specialized AI chips. General-purpose GPUs will remain dominant for flexibility, but domain-specific chips increasingly competitive for high-volume production workloads. AI infrastructure professionals need to understand all these options — not just GPU.</li>
        </ul>
      </section>

    </article>
  );
}
