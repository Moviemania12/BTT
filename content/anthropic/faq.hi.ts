import type { FaqItem } from "@/lib/schemas";

export const anthropicFaq: FaqItem[] = [
  {
    question: "Anthropic kya hai aur yeh OpenAI se infrastructure perspective se kaise different hai?",
    answer:
      "Anthropic ek AI safety company aur research lab hai jo 2021 mein founded thi — Claude model family create karta hai. Infrastructure perspective se key differences: Anthropic ka primary cloud partner Amazon AWS hai (AWS Trainium, Inferentia use karta hai per public communications), lekin compute strategy multi-platform hai — Google Cloud TPU partnership bhi publicly documented hai. OpenAI primarily Microsoft Azure pe depend karta hai. Dono companies ke models multiple cloud platforms pe available hain — lekin cloud platform pe available hona ≠ us company ka apna physical infrastructure wahan. Safety-first approach infrastructure mein bhi reflect hota hai: Constitutional AI training methodology additional compute require karta hai. Model family structure alag hai — Anthropic tiered family (Haiku/Sonnet/Opus) use karta hai.",
  },
  {
    question: "Constitutional AI kya hai aur yeh training infrastructure pe kaise impact karta hai?",
    answer:
      "Constitutional AI (CAI) Anthropic ka proprietary training methodology hai jo Claude models ko helpful, harmless, aur honest banane ke liye use hota hai. Standard RLHF mein human raters manually evaluate karte hain. CAI mein: Pehle ek 'constitution' (principles set) define hoti hai. Phir model khud apne responses evaluate karta hai constitution ke against (SL-CAI phase). RLAIF mein AI model response pairs evaluate karta hai — bina human raters ke. Infrastructure impact: extra 'feedback model' inference steps training pipeline mein, overall more complex pipeline. Lekin human annotation cost significantly reduce hoti hai at scale. Details Anthropic ke public research paper mein: 'Constitutional AI: Harmlessness from AI Feedback' (2022).",
  },
  {
    question: "Claude API access karne ke kya options hain aur kaunsa kab use karna chahiye?",
    answer:
      "Claude multiple paths se access hota hai: (1) Direct Anthropic API (api.anthropic.com) — simplest, latest models first, developers/startups ke liye. (2) Amazon Bedrock — AWS-native enterprises ke liye; AWS compliance features (SOC2/HIPAA/FedRAMP eligibility, VPC PrivateLink, AWS IAM) applicable hain per current AWS documentation. (3) Google Cloud Vertex AI — GCP-native enterprises ke liye; GCP compliance features applicable hain per current Google Cloud documentation. (4) Microsoft Azure AI Foundry — Azure-native organizations ke liye; Azure compliance features applicable hain per current Microsoft documentation. (5) Claude.ai Enterprise — end-user product with enterprise controls. Important: kisi bhi cloud platform pe Claude ka available hona yeh confirm nahi karta ki Anthropic ka physical data center infrastructure wahan hai — cloud providers apne infrastructure pe model host karte hain. All platform-specific compliance features current provider documentation se verify karo.",
  },
  {
    question: "Claude models ke context window ka infrastructure pe kya impact hota hai?",
    answer:
      "Claude models large context windows support karte hain — current specifications official docs pe verify karo: docs.anthropic.com/en/docs/about-claude/models. Infrastructure implications: KV cache (key-value pairs) context length ke saath grow karta hai — large contexts significant GPU VRAM consume karte hain per active conversation. Attention computation O(n²) scale karta hai context length ke saath traditionally. Larger context = higher TTFT (Time to First Token). Higher per-request cost — more compute. Practical solution: Prompt caching. Large system prompts ya documents cache karo — subsequent requests pe cache hit se serve karo, latency aur cost dono reduce hoti hai. Sirf necessary context include karo — padding context performance aur cost dono hurt karta hai.",
  },
  {
    question: "Anthropic ka compute strategy kya hai — sirf AWS hai ya aur bhi?",
    answer:
      "Anthropic ka compute strategy multi-platform hai — sirf AWS nahi. Publicly documented facts: (1) Amazon AWS primary cloud partner hai — substantial investment, AWS Trainium (training) aur Inferentia (inference) use karta hai per public communications. (2) NVIDIA GPUs bhi use hote hain alongside custom silicon. (3) Google Cloud TPU partnership publicly announced hai — large-scale TPU access discussed hai. Important caveat: Announced/planned capacity ko confirmed installed production hardware se distinguish karo. Exact production accelerator mix, GPU/TPU counts, aur specific deployment state Anthropic publicly disclose nahi karta. Teen dimensions alag hain: training compute (jo models train karta hai), inference compute (jo user requests serve karta hai), aur API access (cloud platforms jahan Claude available hai).",
  },
  {
    question: "Claude vs other frontier models — infrastructure perspective se developer ke liye kya consider karna chahiye?",
    answer:
      "Infrastructure/integration perspective se concrete considerations: Context window: Claude large context windows support karta hai — verify current specs at official docs. Cloud integration: AWS prefer → Amazon Bedrock. GCP prefer → Vertex AI. Azure prefer → Azure AI Foundry. No preference → Direct API. Prompt caching: Claude prompt caching support karta hai — large repeated system prompts ya documents ke liye significant cost/latency savings. Pricing: Current pricing official documentation se compare karo — frequently changes. Rate limits: Different tier structures — high-volume ke liye evaluate karo. Safety behavior: Claude Constitutional AI se trained hai — kuch contexts mein different behavior ho sakta hai. Practical recommendation: Apne specific task aur prompts pe benchmark karo — generic comparisons specific use cases accurately predict nahi karte.",
  },
  {
    question: "Anthropic service reliability ke baare mein kya jaanna chahiye?",
    answer:
      "Public status page: status.claude.com — real-time API status aur incident history. Rate limits: Anthropic tier-based limits maintain karta hai — RPM, TPM dimensions mein. Current limits: docs.anthropic.com/en/api/rate-limits. Amazon Bedrock ke through Claude access karne pe AWS service SLAs applicable hoti hain — yeh AWS infrastructure SLA hai, Anthropic physical redundancy ka direct confirmation nahi. Direct API enterprise SLA terms enterprise agreements mein hote hain — verify with Anthropic. Application design ke liye: Retry logic with exponential backoff (5xx, 529 overloaded responses ke liye). Status page monitor karo. Graceful degradation design karo. Extended thinking aur large context requests ke liye appropriate timeouts set karo. Multi-path failover consider karo: direct API + Bedrock combination.",
  },
  {
    question: "Anthropic ki interpretability research ka practical AI deployment pe kya impact hai?",
    answer:
      "Anthropic mechanistic interpretability research mein significantly invest karta hai — understanding karne ki koshish ki neural networks internally kaise 'think' karte hain. Notable published work: 'Scaling Monosemanticity' (2024), 'Mapping the Mind of a Large Language Model' (2024) — publicly available at anthropic.com/research. Current state: Production models ke liye direct operational impact limited hai — yeh primarily research hai. Infrastructure ke liye yeh ek separate compute workload hai — experimental model analysis, feature extraction, activation storage. Long-term implications: Better model understanding → more targeted safety interventions → more reliable enterprise deployment. Practical takeaway: Interpretability research Anthropic ka long-term differentiation hai; directly production infrastructure mein nahi dikhta lekin company ke AI safety investment ko reflect karta hai.",
  },
  {
    question: "Claude API mein data privacy kaise kaam karti hai — product-wise?",
    answer:
      "Data handling product aur configuration se vary karta hai — generalizations avoid karo. Training aur retention policies product, plan, data-control configuration aur applicable terms ke basis pe vary karti hain. Specific service ke liye current official Anthropic policy verify karo: anthropic.com/privacy. Claude.ai consumer: current settings aur policy check karo — defaults change ho sakte hain. Claude API (direct): training aur retention policies current API terms se verify karo; Zero Data Retention options kuch configurations mein available ho sakte hain. Claude.ai Enterprise: enterprise agreement aur applicable terms ke anusaar. Amazon Bedrock: AWS/Bedrock terms aur model configuration ke anusaar — current Bedrock documentation verify karo. Google Cloud Vertex AI aur Azure AI Foundry: Respective platform data governance policies apply — current provider documentation verify karo. Kisi bhi regulated deployment ke liye specific applicable terms Anthropic se directly confirm karo.",
  },
  {
    question: "Haiku, Sonnet aur Opus mein kya difference hai aur infrastructure routing kaise design karo?",
    answer:
      "Anthropic ke Claude model tiers: Haiku (fastest, lowest cost — high-volume simple tasks ke liye: classification, summarization, quick Q&A, chatbots), Sonnet (balanced — production workhorse, most general tasks ke liye best price-performance), Opus (most capable — complex reasoning, difficult analysis; highest latency aur cost; use selectively). Infrastructure design principle: Single model blindly use karna suboptimal hai. Model routing layer design karo: task complexity pe based automatic tier selection → cost aur performance dono optimize hote hain. Example: Simple classification → Haiku. Main content generation → Sonnet. Complex multi-step reasoning where quality critical → Opus. Always benchmark apne specific task pe real prompts ke saath — generic benchmarks specific use cases accurately predict nahi karte. Current specs aur pricing: docs.anthropic.com/en/docs/about-claude/models",
  },
];
