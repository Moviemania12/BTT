import type { FaqItem } from "@/lib/schemas";

export const anthropicFaq: FaqItem[] = [
  {
    question: "What is Anthropic and how is it different from OpenAI from an infrastructure perspective?",
    answer:
      "Anthropic is an AI safety company and research lab founded in 2021 — it creates the Claude model family. Key differences from an infrastructure perspective: Anthropic's primary cloud partner is Amazon AWS (it uses AWS Trainium and Inferentia per public communications), but its compute strategy is multi-platform — a Google Cloud TPU partnership is also publicly documented. OpenAI primarily depends on Microsoft Azure. Both companies' models are available on multiple cloud platforms — but being available on a cloud platform ≠ that company's own physical infrastructure being there. The safety-first approach is also reflected in infrastructure: the Constitutional AI training methodology requires additional compute. The model family structure is different — Anthropic uses a tiered family (Haiku/Sonnet/Opus).",
  },
  {
    question: "What is Constitutional AI and how does it impact training infrastructure?",
    answer:
      "Constitutional AI (CAI) is Anthropic's proprietary training methodology used to make Claude models helpful, harmless, and honest. In standard RLHF, human raters evaluate manually. In CAI: first, a 'constitution' (a set of principles) is defined. Then the model evaluates its own responses against the constitution (the SL-CAI phase). In RLAIF, an AI model evaluates response pairs — without human raters. Infrastructure impact: extra 'feedback model' inference steps in the training pipeline, an overall more complex pipeline. But human annotation cost is significantly reduced at scale. Details are in Anthropic's public research paper: 'Constitutional AI: Harmlessness from AI Feedback' (2022).",
  },
  {
    question: "What options are there for accessing the Claude API, and when should you use which?",
    answer:
      "Claude can be accessed through multiple paths: (1) Direct Anthropic API (api.anthropic.com) — simplest, latest models first, for developers/startups. (2) Amazon Bedrock — for AWS-native enterprises; AWS compliance features (SOC2/HIPAA/FedRAMP eligibility, VPC PrivateLink, AWS IAM) apply per current AWS documentation. (3) Google Cloud Vertex AI — for GCP-native enterprises; GCP compliance features apply per current Google Cloud documentation. (4) Microsoft Azure AI Foundry — for Azure-native organizations; Azure compliance features apply per current Microsoft documentation. (5) Claude.ai Enterprise — an end-user product with enterprise controls. Important: Claude being available on any cloud platform doesn't confirm that Anthropic's physical data center infrastructure is there — cloud providers host the model on their own infrastructure. Verify all platform-specific compliance features from current provider documentation.",
  },
  {
    question: "What impact does the context window of Claude models have on infrastructure?",
    answer:
      "Claude models support large context windows — verify current specifications on the official docs: docs.anthropic.com/en/docs/about-claude/models. Infrastructure implications: the KV cache (key-value pairs) grows with context length — large contexts consume significant GPU VRAM per active conversation. Attention computation traditionally scales O(n²) with context length. A larger context means higher TTFT (Time to First Token). Higher per-request cost — more compute. Practical solution: prompt caching. Cache large system prompts or documents — serve subsequent requests from a cache hit, reducing both latency and cost. Include only the necessary context — padding the context hurts both performance and cost.",
  },
  {
    question: "What is Anthropic's compute strategy — is it just AWS or more?",
    answer:
      "Anthropic's compute strategy is multi-platform — not just AWS. Publicly documented facts: (1) Amazon AWS is the primary cloud partner — substantial investment, uses AWS Trainium (training) and Inferentia (inference) per public communications. (2) NVIDIA GPUs are also used alongside custom silicon. (3) A Google Cloud TPU partnership is publicly announced — large-scale TPU access has been discussed. Important caveat: distinguish announced/planned capacity from confirmed installed production hardware. Anthropic doesn't publicly disclose the exact production accelerator mix, GPU/TPU counts, or specific deployment state. Three dimensions are different: training compute (which trains the models), inference compute (which serves user requests), and API access (the cloud platforms where Claude is available).",
  },
  {
    question: "Claude vs other frontier models — what should a developer consider from an infrastructure perspective?",
    answer:
      "Concrete considerations from an infrastructure/integration perspective: Context window: Claude supports large context windows — verify current specs at official docs. Cloud integration: prefer AWS → Amazon Bedrock. Prefer GCP → Vertex AI. Prefer Azure → Azure AI Foundry. No preference → Direct API. Prompt caching: Claude supports prompt caching — significant cost/latency savings for large repeated system prompts or documents. Pricing: compare current pricing from official documentation — it changes frequently. Rate limits: different tier structures — evaluate for high-volume use. Safety behavior: Claude is trained with Constitutional AI — behavior may differ in some contexts. Practical recommendation: benchmark on your specific task and prompts — generic comparisons don't accurately predict specific use cases.",
  },
  {
    question: "What should you know about Anthropic service reliability?",
    answer:
      "Public status page: status.claude.com — real-time API status and incident history. Rate limits: Anthropic maintains tier-based limits — across RPM, TPM dimensions. Current limits: docs.anthropic.com/en/api/rate-limits. When accessing Claude through Amazon Bedrock, AWS service SLAs apply — that's an AWS infrastructure SLA, not a direct confirmation of Anthropic's physical redundancy. Direct API enterprise SLA terms are in enterprise agreements — verify with Anthropic. For application design: retry logic with exponential backoff (for 5xx, 529 overloaded responses). Monitor the status page. Design for graceful degradation. Set appropriate timeouts for extended thinking and large context requests. Consider multi-path failover: a direct API + Bedrock combination.",
  },
  {
    question: "What practical impact does Anthropic's interpretability research have on AI deployment?",
    answer:
      "Anthropic invests significantly in mechanistic interpretability research — trying to understand how neural networks 'think' internally. Notable published work: 'Scaling Monosemanticity' (2024), 'Mapping the Mind of a Large Language Model' (2024) — publicly available at anthropic.com/research. Current state: direct operational impact on production models is limited — this is primarily research. For infrastructure, this is a separate compute workload — experimental model analysis, feature extraction, activation storage. Long-term implications: better model understanding → more targeted safety interventions → more reliable enterprise deployment. Practical takeaway: interpretability research is Anthropic's long-term differentiation; it doesn't show up directly in production infrastructure but reflects the company's AI safety investment.",
  },
  {
    question: "How does data privacy work in the Claude API — on a product-by-product basis?",
    answer:
      "Data handling varies by product and configuration — avoid generalizations. Training and retention policies vary based on the product, plan, data-control configuration, and applicable terms. Verify the current official Anthropic policy for the specific service: anthropic.com/privacy. Claude.ai consumer: check current settings and policy — defaults can change. Claude API (direct): verify training and retention policies from current API terms; Zero Data Retention options may be available in some configurations. Claude.ai Enterprise: per the enterprise agreement and applicable terms. Amazon Bedrock: per AWS/Bedrock terms and model configuration — verify current Bedrock documentation. Google Cloud Vertex AI and Azure AI Foundry: respective platform data governance policies apply — verify current provider documentation. Confirm the specific applicable terms directly with Anthropic for any regulated deployment.",
  },
  {
    question: "What's the difference between Haiku, Sonnet, and Opus, and how should you design infrastructure routing?",
    answer:
      "Anthropic's Claude model tiers: Haiku (fastest, lowest cost — for high-volume simple tasks: classification, summarization, quick Q&A, chatbots), Sonnet (balanced — the production workhorse, best price-performance for most general tasks), Opus (most capable — complex reasoning, difficult analysis; highest latency and cost; use selectively). Infrastructure design principle: blindly using a single model is suboptimal. Design a model routing layer: automatic tier selection based on task complexity → optimizes both cost and performance. Example: simple classification → Haiku. Main content generation → Sonnet. Complex multi-step reasoning where quality is critical → Opus. Always benchmark on your specific task with real prompts — generic benchmarks don't accurately predict specific use cases. Current specs and pricing: docs.anthropic.com/en/docs/about-claude/models",
  },
];
