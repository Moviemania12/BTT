import type { FaqItem } from "@/lib/schemas";

export const googleGeminiFaq: FaqItem[] = [
  {
    question: "What is Google Gemini and how is it different from OpenAI/Anthropic from an infrastructure perspective?",
    answer:
      "Google Gemini is Google DeepMind's flagship AI model family — trained and served on Google's in-house TPU (Tensor Processing Unit) infrastructure. Key infrastructure difference: OpenAI primarily depends on Microsoft Azure, Anthropic primarily on AWS — but Google designs its own AI hardware (TPUs) and runs it on its own global data center infrastructure. This gives Google a fundamentally different position: hardware, software, training framework (JAX/XLA), and deployment infrastructure all in-house. Gemini models are deeply integrated into Google Search, Gmail, Docs, and other products — consumer-scale inference is not just for the API. From a data center perspective: Google's data centers are purpose-built for AI workloads, and TPU pods are specifically designed for large-scale distributed training.",
  },
  {
    question: "What is a Google TPU and how is it fundamentally different from an NVIDIA GPU?",
    answer:
      "A TPU (Tensor Processing Unit) is Google's purpose-built AI accelerator — not a general-purpose GPU. Key architectural differences: TPUs are primarily optimized for matrix multiplication (the core operation of neural networks) using a systolic array architecture — these operations execute highly efficiently at the hardware level. NVIDIA GPUs are general-purpose parallel compute that are also used for AI. TPUs are tightly integrated with Google's JAX/XLA compiler ecosystem. TPU generations (v1, v2, v3, v4, v5, v5p, v6 Trillium, etc.) are publicly documented — each generation brings improvements in compute density, interconnect bandwidth, and memory (HBM). Important caveat: exactly which Gemini model runs on which TPU generation is not fully disclosed publicly by Google. TPUs are primarily accessed through Google Cloud — the general public doesn't have TPU hardware ownership.",
  },
  {
    question: "What is the difference between the Gemini API and Google AI Studio?",
    answer:
      "Google AI Studio is a web-based IDE/playground — developers can experiment with Gemini models directly in the browser without writing code. It's ideal for prototyping, prompt engineering, and quick testing. The free tier is generous. The Gemini API is the programmatic interface that integrates into production applications — via REST API or Google Cloud client libraries. You can generate an API key directly from AI Studio and call the Gemini API. For production applications: use the Gemini API directly (Google AI Developer platform) or through Vertex AI. Vertex AI provides enterprise-grade deployment: Google Cloud compliance, VPC networking, IAM, and advanced MLOps capabilities. Small projects/prototyping → AI Studio. Production consumer apps → Gemini API direct. Regulated enterprise → Vertex AI. Current documentation: ai.google.dev (AI Studio + Gemini API) and cloud.google.com/vertex-ai (Vertex AI).",
  },
  {
    question: "What is HBM (High Bandwidth Memory) and why is it critical in AI accelerators?",
    answer:
      "HBM (High Bandwidth Memory) is a specialized DRAM technology used in AI accelerators (TPUs, GPUs). How it differs from standard DDR/LPDDR memory: physical stacking — multiple memory dies are stacked vertically, connected via a wide data bus. Result: dramatically higher memory bandwidth at lower power. Bandwidth is critical in AI training and inference: in transformer models, weights and activations are constantly fetched from memory during attention computation. If memory bandwidth is insufficient, accelerator compute units sit hungry waiting — expensive hardware goes underutilized. HBM generations (HBM2, HBM2e, HBM3, HBM3e) provide increasing bandwidth and capacity. Google TPUs use HBM — the specific HBM versions per TPU generation are documented in Google's public datasheets. Data center perspective: HBM creates high heat density on the accelerator — thermal management is critical.",
  },
  {
    question: "For enterprise use, what should you choose between Vertex AI and the direct Gemini API?",
    answer:
      "Direct Gemini API (ai.google.dev): simpler setup, latest models are typically available first, Google AI developer platform billing. There can be limitations for enterprise/regulated use in terms of compliance scope. Vertex AI (Google Cloud): enterprise-grade — Google Cloud compliance certifications apply as per current GCP documentation (verify scope at cloud.google.com). VPC Service Controls for network isolation, Cloud IAM for access control, audit logging, data residency options, managed endpoints with SLAs, model versioning, and a full MLOps pipeline. Compared to Claude/OpenAI: Vertex AI plays the same role that Azure OpenAI Service or Amazon Bedrock play — AI models with enterprise controls. Decision framework: startup/developer → direct Gemini API or AI Studio. Production app at scale → Gemini API. Regulated enterprise (healthcare, finance, government) → Vertex AI. Verify all compliance features from current GCP documentation — features change over time.",
  },
  {
    question: "How does Google's training infrastructure operate at such large scale?",
    answer:
      "Google's large-scale AI training infrastructure is publicly described in research papers and blog posts. Key elements: TPU Pods — hundreds or thousands of TPUs connected through a high-speed custom interconnect. Google ICI (Inter-Chip Interconnect) enables TPU-to-TPU communication within a pod — this is publicly documented. JAX/XLA framework — Google's primary ML framework, tightly integrated with TPUs. Distributed training strategies: data parallelism, model parallelism, pipeline parallelism — all of which need to be coordinated efficiently. Pathways system — Google has described the Pathways architecture, which can use multiple accelerator types across multiple datacenters for a single model training run. Checkpoint storage — regular checkpoints are essential in large model training — Google's Colossus distributed file system handles this per public documentation. Exact cluster sizes, specific Gemini training configurations, and precise hardware counts are not publicly disclosed.",
  },
  {
    question: "How is Gemini's inference infrastructure different from training?",
    answer:
      "Training: a one-time or periodic massive compute job — thousands of TPUs run synchronously for weeks to months. Optimize for throughput. On failure, restart from checkpoint. Inference: continuous serving — massive scale simultaneously across Google products (Search, Gmail, etc.) and API customers. Latency is critical. Model weights are preloaded in memory. Serving is geographically distributed — across Google's global data centers. Different hardware is possible — smaller/more efficient models for inference. Quantization is used — storing model weights at lower precision for faster inference and more models per TPU. Prefill vs decode: in LLM inference, input tokens are processed first (prefill — compute-intensive), then output tokens are generated one by one (decode — memory-bandwidth intensive). Different hardware configurations can optimize each phase. Given Google Search and product integration, this inference operation runs at massive scale globally — exact query volumes are not publicly disclosed.",
  },
  {
    question: "How are Google's data centers designed for AI workloads?",
    answer:
      "Google designs its data centers in-house — this is publicly documented. From an AI infrastructure perspective, key elements: power density — TPU pods create extremely high power density — specific figures per facility are not publicly disclosed, but high-density AI racks can achieve 40–100+ kW per rack. Cooling: Google's data centers extensively use evaporative cooling and chilled water. Google also researches and deploys liquid cooling for high-density workloads — specific configurations per facility are not publicly detailed. PUE: Google historically reports very good PUE (around 1.1) — thanks to efficient cooling design and hot aisle/cold aisle containment. Water usage: Google acknowledges significant water usage for cooling — it tracks and publicly reports the WUE metric. Renewable energy: Google has committed to matching its global energy use with 100% renewable energy — through Power Purchase Agreements (PPAs). The specific data center locations where Gemini runs are not publicly disclosed.",
  },
  {
    question: "What about data privacy and security for Gemini?",
    answer:
      "Data handling varies by the Gemini access path: Google AI Studio (free tier) — data may be used for Google's AI improvement — verify current privacy settings and policy at ai.google.dev/gemini-api/terms. Gemini API (paid) — verify training data policies from current API terms. Vertex AI — enterprise-grade data controls; data stays within the customer's GCP project and is not used to train Google's models per current Vertex AI terms (verify at cloud.google.com). Google Workspace Gemini — Workspace admin policies and enterprise terms apply. Important caveat: policies vary by product, plan, and configuration. Absolute claims — 'Google never trains on your data' — are context-specific. Always verify current official Google privacy documentation for the specific product. For regulated industries: deployment through Vertex AI is recommended — with Google Cloud compliance certifications and BAA eligibility (verify current scope).",
  },
  {
    question: "What is a TPU Pod and why is it important for AI training?",
    answer:
      "A TPU Pod connects multiple TPU chips through a high-speed interconnect network to form a single logical unit — effectively one massive distributed accelerator. Why pods matter for AI training: large frontier models don't fit on a single TPU chip — model weights run into billions of parameters. Within a pod, chips share distributed memory and perform synchronized computation. Google ICI (Inter-Chip Interconnect) connects chips within a pod — this is a purpose-built high-bandwidth interconnect, different from standard Ethernet/InfiniBand. Pod slices: within large pods, specific 'slices' can be allocated for different jobs — this concept is publicly documented for TPU v4 and newer pods on Google Cloud. Scale: TPU pods publicly scale to hundreds or thousands of chips — exact configurations are available in Google Cloud documentation. Data center implication: the power consumption and cooling requirement of a single TPU pod is enormous — dedicated infrastructure is required.",
  },
];
