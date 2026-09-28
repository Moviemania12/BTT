import type { FaqItem } from "@/lib/schemas";

export const tpuFaq: FaqItem[] = [
  {
    question: "TPU aur GPU mein sabse bada practical difference kya hai?",
    answer:
      "GPU ek general-purpose parallel processor hai — graphics banane se lekar AI tak sab kuch karta hai. TPU specifically matrix multiplication ke liye banaya gaya hai jo neural network ka sabse common operation hai. Analogy: GPU ek Swiss Army knife hai (bohot kuch kar sakta hai), TPU ek specialist surgeon ka scalpel hai (ek kaam bohot efficiently karta hai). Practical impact: TensorFlow aur JAX workloads pe TPU often 3-5x faster aur cost-efficient hota hai GPU vs. Lekin CUDA-dependent code ya custom operations ke liye GPU better choice hai. Framework support bhi matter karta hai — PyTorch users ko XLA compiler ke through kaam karna padta hai jo additional complexity add karta hai.",
  },
  {
    question: "Systolic Array kya hai — simple language mein samjhao?",
    answer:
      "Ek assembly line factory imagine karo. Car factory mein ek worker apna kaam karta hai (engine lagao), phir car agale worker ke paas jaati hai (doors lagao), phir agale ke paas (paint karo). Har worker apna specific kaam karta hai aur result agale worker ko paas karta hai. Systolic Array bilkul aise hi kaam karta hai. Numbers ek grid mein flow karte hain — har cell apna calculation karta hai (multiply karo), result agali cell ko paas karta hai. Sab cells simultaneously different numbers pe kaam karte hain — like a pipeline where multiple cars are being assembled at the same time at different stages. Yeh approach matrix multiplication ke liye extremely efficient hai kyunki matrix math mein exactly yahi pattern hota hai — numbers rows aur columns mein flow karke multiply aur add hote hain.",
  },
  {
    question: "TPU kab use karein aur kab GPU better hai?",
    answer:
      "TPU use karo when: TensorFlow ya JAX use kar rahe ho, large transformer/LLM training kar rahe ho, Google Cloud pe ho aur cost optimize karna hai, standard neural network architectures train kar rahe ho (BERT, T5, ViT, etc.), batch processing dominant hai. GPU use karo when: PyTorch heavy custom operations use karta hai, research mein novel architectures experiment kar rahe ho jo TPU pe compile nahi hoti, CUDA-specific libraries (cuDNN, cuBLAS) depend karte ho, low-latency single-request inference chahiye, non-Google cloud ya on-premises deployment ho. Rule of thumb: Production TF/JAX training at scale = TPU. Research flexibility + PyTorch = GPU. Inference latency-sensitive = GPU (typically).",
  },
  {
    question: "BFloat16 kya hai aur TPU ke liye kyun important hai?",
    answer:
      "BFloat16 (Brain Float 16) ek number format hai jo 16 bits use karta hai — regular Float16 se alag. Difference: BFloat16 ka number range FP32 ke barabar hai (same exponent bits = 8), lekin precision FP16 se kam hai (mantissa bits sirf 7 vs FP16 ke 10). Neural network training ke liye yeh ideal hai kyunki: range important hai (overflow/underflow avoid karna), precision itni zyada zaroorat nahi (approximate calculations fine hain). Google ne TPU v2 ke saath BFloat16 introduce kiya. GPU mein A100 se BFloat16 support aaya. Aaj LLM training ka standard format hai — Llama, Gemini, GPT sab BFloat16 mein train hote hain.",
  },
  {
    question: "TPU Pod kya hota hai aur kitne TPUs ek Pod mein hote hain?",
    answer:
      "TPU Pod multiple TPU chips ko ek unified supercomputer ki tarah connect karta hai — high-speed custom interconnect ke through. Different versions mein alag scale: TPU v2 Pod: 512 chips, ~11.5 PFLOPS. TPU v3 Pod: 1,024 chips, ~100 PFLOPS. TPU v4 Pod: 4,096 chips, ~1.1 EFLOPS (exaflop). TPU v5e Pod: alag configurations mein. TPU v4 Pod Google ka current largest publicly available configuration hai. Pod ke andar chips high-speed 3D torus interconnect se connected hain — koi bhi chip kisi bhi chip se directly communicate kar sakta hai high bandwidth pe. Google ne Gemini models train kiye hain multiple TPU v4 Pods pe simultaneously.",
  },
  {
    question: "Cloud TPU vs on-premises GPU — kab kya choose karein?",
    answer:
      "Cloud TPU choose karo when: TensorFlow/JAX use karo, variable workloads hain (pay-per-use better), Google Cloud ecosystem already use karo, large-scale training occasional basis pe ho, capital expenditure avoid karna hai. On-premises GPU choose karo when: data sovereignty/compliance issues hain (RBI, HIPAA), consistent high utilization ho (>70%), PyTorch ecosystem deeply invested ho, custom hardware control chahiye, long-term TCO calculation on-prem better show kare. Hybrid approach: Cloud TPU for training, on-premises GPU for inference serving. Important: TPU on-premises available nahi hai (Google-only hardware) — yeh fundamental constraint hai decision-making mein.",
  },
  {
    question: "XLA compiler kya hai aur TPU ke saath kyun zaroorat hai?",
    answer:
      "XLA (Accelerated Linear Algebra) ek compiler hai jo high-level code (TensorFlow, JAX, PyTorch) ko TPU ki specific machine language mein convert karta hai. Analogy: aapne Hindi mein instruction likhi, XLA ek translator hai jo woh instruction TPU ki native language mein convert karta hai. XLA kya karta hai: computation graph optimize karta hai (unnecessary steps remove karo), multiple operations fuse karta hai (memory trips reduce karo), TPU ke systolic array ke liye optimal code generate karta hai, memory layout restructure karta hai. PyTorch ke liye: torch_xla library use hoti hai jo PyTorch operations ko XLA ke through TPU pe run karti hai. Limitation: Custom ops jo XLA nahi samajhta woh TPU pe run nahi honge — yeh GPU vs TPU ka key practical difference hai.",
  },
  {
    question: "TPU v1 se v5e tak kya kya change hua — quick summary?",
    answer:
      "TPU v1 (2016): Sirf inference, 92 TOPS, 8-bit integer, edge deployment. TPU v2 (2017): Training support, HBM memory, BFloat16, 45 TFLOPS per chip, liquid cooling. TPU v3 (2018): 420 TFLOPS per chip, 32GB HBM2, advanced cooling. TPU v4 (2021): 275 TFLOPS BF16 per chip (lekin 2x sparse = ~550), optical interconnect, 4096-chip Pods, Gemini training. TPU v5e (2023): Efficiency-focused variant, best performance per dollar for medium workloads, edge ka nahi, zyada accessible pricing. TPU v5p (2023): Highest performance variant, large-scale training. Har generation mein: mehr compute, mehr memory, better interconnect, zyada energy efficiency.",
  },
  {
    question: "TPU kitni power consume karta hai aur data center mein kya special chahiye?",
    answer:
      "Individual TPU chip: TPU v4 ~200W. TPU board (4 chips): ~800W. Full TPU v4 Pod rack equivalent: tens of kilowatts. Data center requirements: Liquid cooling mandatory — TPU boards directly liquid-cooled hoti hain (air cooling insufficient at this density). Power density: GPU servers jaisi hi challenge — 40-100kW per rack range mein. Network: High-speed interconnect (ICI — Inter-Chip Interconnect) internally. Storage: Google Colossus distributed storage, fast object storage (GCS). GPU se comparison: Power consumption similar per FLOP, lekin TPU often more FLOPS per watt for matrix workloads. Google ke data centers: TPU-optimized cooling aur power distribution with specifically designed facilities.",
  },
  {
    question: "Gemini, PaLM aur Google ke AI models TPU pe kaise train hote hain?",
    answer:
      "Google ke large models multiple TPU v4 Pods across multiple data centers pe train hote hain. Process: Model sharding — model itna bada hai ki ek chip pe fit nahi hota, toh layers different chips pe split hote hain. Data parallelism — same model, alag data batches, thousands of chips pe simultaneously. Pipeline parallelism — model ka pehla hissa chip group 1 pe, doosra hissa chip group 2 pe. JAX/T5X framework use hota hai (TensorFlow se Google shift kar raha hai JAX ki taraf). Checkpointing: Frequent saves to Google Colossus (every few minutes). Scale: Gemini Ultra training ne reportedly 16,000+ TPU v4 chips use kiye. Communication: ICI interconnect chips ke beech, data center fibre across pods. Training cost: Hundreds of millions of dollars at this scale.",
  },
  {
    question: "TPU pe PyTorch use karna GPU se kitna different hai?",
    answer:
      "GPU pe PyTorch: import torch, model.cuda(), loss.backward() — seedha kaam karta hai. TPU pe PyTorch: torch_xla library import karo, xm.xla_device() use karo, special synchronization needed (xm.mark_step()), XLA trace warnings possible. Differences: Compilation step: pehli baar slow (XLA graph compile karta hai), subsequent runs fast. Dynamic shapes issue: XLA ko static shapes prefer hain — dynamic tensor shapes recompilation trigger karte hain. Custom CUDA kernels: Nahi chalenge. Debugging: Print statements se values nahi milti easily — lazy evaluation mode hai. Community: GPU PyTorch ecosystem bada hai — zyada tutorials, StackOverflow answers, library support. Recommendation: JAX use karo agar TPU choose karo — native experience much better.",
  },
  {
    question: "TPU ka future kya hai — Google aage kya plan kar raha hai?",
    answer:
      "Near-term (2024-25): TPU v5p aur v5e rollout — zyada accessible pricing, better efficiency. Trillium (TPU v6): Next generation, Google IO 2024 pe announced, claimed 4.7x performance improvement over v5e. Optical interconnects: v4 se shuru, future pods mein aur advanced. Multi-modal workloads: Text + image + video training ke liye optimization. Edge TPUs: Already exist (Coral Edge TPU) — future mein zyada powerful embedded versions. Competition response: As NVIDIA keeps improving (Blackwell, Rubin), Google ke TPU ko pace maintain karna hoga. Google strategy: TPU internally use karta hai (Gemini, Search AI) aur Cloud TPU through Google Cloud monetize karta hai. Open question: Kya Google TPU on-premises sell karega? Abhi tak nahi, lekin future mein possible.",
  },
];
