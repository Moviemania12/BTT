import type { FaqItem } from "@/lib/schemas";

export const mlFaq: FaqItem[] = [
  {
    question: "What is Machine Learning and how is it different from traditional programming?",
    answer:
      "In traditional programming, the engineer writes explicit rules and the computer applies those rules to data. In Machine Learning, this process is reversed — the engineer provides labeled data, and the algorithm automatically derives the rules. Use ML when rules are too complex to enumerate (face recognition), the environment keeps changing (fraud patterns), or personalization is required (recommendations). Use the traditional approach when rules are clearly definable and stable.",
  },
  {
    question: "What is the difference between Supervised and Unsupervised Learning?",
    answer:
      "Supervised Learning uses labeled data — every training example has both an input and the correct output. The algorithm learns the input-output mapping. Examples: spam detection, fraud classification, image recognition. Unsupervised Learning has no labels — the algorithm discovers hidden patterns in the data on its own. Examples: customer segmentation, anomaly detection, topic modeling. A semi-supervised approach combines both: a small amount of labeled data plus a much larger amount of unlabeled data.",
  },
  {
    question: "Why is GPU needed for ML Infrastructure instead of CPU?",
    answer:
      "The core operation of neural network training is matrix multiplication — inherently parallel. A GPU has 10,000-16,000+ cores that perform these operations simultaneously. A CPU has only 8-128 powerful general-purpose cores. A single H100 GPU is 60-80x faster than a top-end CPU at matrix multiplication. For large model training, thousands of GPUs work simultaneously — this scale simply isn't possible on CPU architecture.",
  },
  {
    question: "What is MLOps and why is it necessary in production ML?",
    answer:
      "MLOps (Machine Learning Operations) is the engineering and automation of the ML model lifecycle — from data collection through model training, deployment, monitoring, and retraining. Without MLOps: models are deployed manually, reproducibility suffers, and it takes a long time to detect production failures. With MLOps: CI/CD pipelines automatically validate and deploy models, experiment tracking ensures reproducibility, monitoring detects data drift and model degradation, and automated retraining pipelines maintain model freshness.",
  },
  {
    question: "What is a Feature Store and why is it important?",
    answer:
      "A Feature Store is a centralized repository for precomputed ML features. It solves two critical problems: (1) Training-serving skew — in training, features are computed differently than in serving. The feature store ensures the same features are used in both places. (2) Feature reuse — features computed by one team can be used by another team's models without recomputation. An online feature store (Redis) provides low-latency reads for real-time inference. An offline feature store (data warehouse) handles large-scale feature computation for training.",
  },
  {
    question: "What does NCCL do in Distributed Training?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) is a GPU-optimized communication library that handles collective operations in distributed training — all-reduce (synchronizing gradients), broadcast, scatter, gather. In distributed training, each GPU computes gradients on its own data batch, and NCCL then aggregates these gradients across all GPUs so every GPU keeps a consistent, updated set of model weights. NCCL is natively optimized for InfiniBand and NVLink — for maximum bandwidth and minimum latency.",
  },
  {
    question: "What is Data Drift and why is it problematic in production ML?",
    answer:
      "Data drift occurs when the real-world data distribution shifts away from the training distribution. Covariate shift: the input feature distribution changes (average transaction amount rose dramatically from 2019 to 2024). Concept drift: the input-output relationship changes (fraud patterns adopt new techniques). Label shift: the output class distribution changes. The problem: the model keeps making predictions based on stale training data. Solution: statistical monitoring (KS test, PSI), automated retraining triggers, correlation with business metrics. It's a silent failure — the model doesn't throw errors, it just gives inaccurate predictions.",
  },
  {
    question: "What is Model Quantization and how does it help with inference?",
    answer:
      "Quantization converts model weights from a high-precision format (FP32/FP16) to lower precision (INT8, INT4). Benefits: reduced memory footprint (INT4 = 4x reduction vs FP16), improved inference speed (lower precision = faster compute), and lower power consumption. A 70B parameter model at FP16: ~140GB of GPU memory — requires multiple H100s. The same model at INT4: ~35GB — fits on a single H100. Quality tradeoff: minimal for most practical applications. Tools: TensorRT, bitsandbytes, GPTQ, AWQ.",
  },
  {
    question: "What is the difference between an ML Engineer and a Data Scientist?",
    answer:
      "A Data Scientist focuses primarily on model development — data analysis, feature engineering, algorithm selection, experimentation. Production deployment is secondary. An ML Engineer builds production ML systems — training pipelines, serving infrastructure, monitoring, automation. A systems engineering background matters here. A Data Engineer builds data infrastructure — pipelines, warehouses, lake architectures. An MLOps Engineer handles CI/CD for ML — automation, deployment, monitoring. A Platform Engineer maintains GPU clusters, Kubernetes, and the infrastructure that ML workloads run on.",
  },
  {
    question: "What is AI Governance and Responsible AI?",
    answer:
      "AI Governance is a framework that ensures AI systems are ethical, fair, transparent, and compliant. Key dimensions: (1) Bias and Fairness — models shouldn't discriminate on protected characteristics. (2) Explainability — decisions should be explainable, especially in regulated domains. (3) Privacy — training data and model outputs shouldn't expose personal information. (4) Regulatory compliance — the EU AI Act (2024) and GDPR impose specific requirements on ML systems. (5) Auditing — model decisions should be traceable and auditable. Organizations publish model cards, datasheets for datasets, and bias testing reports.",
  },
  {
    question: "Cloud ML (SageMaker/Vertex AI) vs on-premises ML infrastructure — which should you choose?",
    answer:
      "Choose cloud when: you're in the experimentation phase, GPU expertise is limited, workloads are variable/unpredictable, or you need a quick start without CAPEX. Justify on-premises when: GPU utilization stays consistently above 70% for 12+ months, there are data sovereignty requirements (banking, healthcare), cloud GPU spend exceeds Rs. 2-5 crore+ per year, or deep hardware customization is needed. Hybrid is common: training on-premises, inference on cloud with autoscaling. Managed cloud ML services (SageMaker, Vertex AI) abstract away infrastructure complexity — ideal for teams whose focus is ML, not infrastructure.",
  },
  {
    question: "What should you verify before deploying an ML model to production?",
    answer:
      "Pre-deployment checklist: (1) Offline metrics are sufficient — AUC, F1, precision/recall meet business requirements. (2) Latency SLA is met — inference time is within the production requirement. (3) A/B test plan is ready — traffic split, metric tracking, statistical significance. (4) Monitoring is configured — data drift detection, prediction distribution, business metrics. (5) Rollback plan is documented — when and how to roll back. (6) Feature store consistency is verified — same features in training and serving. (7) Model card is documented — training data, known limitations, intended use. (8) Load testing is complete — the model is stable under peak traffic.",
  },
  {
    question: "How do you detect and fix Overfitting in Machine Learning?",
    answer:
      "Detection: training accuracy is consistently much higher than validation accuracy, and the gap grows as training progresses. Loss curves diverge — training loss keeps falling, validation loss plateaus or increases. Fixes: (1) More training data — the most effective. (2) Regularization — L1 (sparse features), L2 (weight decay), Dropout (neural networks). (3) A simpler model architecture. (4) Data augmentation — artificially diversify the training examples. (5) Early stopping — stop training once validation loss stops improving. (6) Cross-validation — a more reliable performance estimate.",
  },
  {
    question: "What is the relationship between ML, Deep Learning, and Generative AI?",
    answer:
      "These are nested categories. AI is the broadest category — any approach that simulates intelligence. Machine Learning is a subset of AI — learning automatically from data. Deep Learning is a subset of ML — it uses multi-layer neural networks and scales with large datasets and compute. Generative AI is an application of Deep Learning models — generating text, images, audio, code. Traditional ML (decision trees, SVM, regression) works even on small datasets. Deep Learning typically requires large datasets and GPUs. GenAI needs massive compute and specialized infrastructure.",
  },
  {
    question: "What are LoRA and QLoRA, and how are they used in fine-tuning?",
    answer:
      "LoRA (Low-Rank Adaptation) is a technique for efficiently fine-tuning a pre-trained large model. Full fine-tuning: update all the parameters — expensive, memory-intensive. LoRA: freeze the original model parameters, train only small low-rank matrices (typically 0.1-1% of the original parameters). Memory and compute drop dramatically. QLoRA: LoRA + quantization (4-bit base model) — extremely memory-efficient fine-tuning. Fine-tuning a 70B model: typically needs 8+ H100s at full precision. With QLoRA: possible on a single H100. Production uses: custom domain adaptation, instruction fine-tuning, task-specific specialization of large models.",
  },
];
