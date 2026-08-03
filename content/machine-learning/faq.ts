import type { FaqItem } from "@/lib/schemas";

export const mlFaq: FaqItem[] = [
  {
    question: "Machine Learning kya hota hai aur traditional programming se kaise alag hai?",
    answer:
      "Traditional programming mein engineer explicit rules likhta hai aur computer un rules ko data pe apply karta hai. Machine Learning mein yeh process ulta hota hai — engineer labeled data provide karta hai aur algorithm automatically rules derive karta hai. ML tabhi use karo jab rules too complex hain to enumerate (face recognition), ya environment continuously change hota hai (fraud patterns), ya personalization required hai (recommendations). Traditional approach tab use karo jab rules clearly definable aur stable hain.",
  },
  {
    question: "Supervised aur Unsupervised Learning mein kya difference hai?",
    answer:
      "Supervised Learning mein labeled data hota hai — har training example mein input aur correct output dono. Algorithm input-output mapping sikhta hai. Examples: spam detection, fraud classification, image recognition. Unsupervised Learning mein labels nahi hote — algorithm apne aap data mein hidden patterns dhundta hai. Examples: customer segmentation, anomaly detection, topic modeling. Semi-supervised approach dono ko combine karta hai: thodi labeled data + bahut zyada unlabeled data.",
  },
  {
    question: "ML Infrastructure mein GPU kyun zaroori hai CPU ki bajay?",
    answer:
      "Neural network training ka core operation matrix multiplication hai — inherently parallel. GPU mein 10,000-16,000+ cores hain jo simultaneously yeh operations perform karte hain. CPU mein sirf 8-128 powerful general-purpose cores hain. Ek H100 GPU matrix multiplication mein top-end CPU se 60-80x faster hai. Large model training ke liye thousands of GPUs simultaneously kaam karte hain — yeh scale CPU architecture pe possible hi nahi hai.",
  },
  {
    question: "MLOps kya hota hai aur production ML mein kyun zaroori hai?",
    answer:
      "MLOps (Machine Learning Operations) ML model lifecycle ka engineering aur automation hai — data collection se lekar model training, deployment, monitoring aur retraining tak. Bina MLOps ke: models manually deploy hote hain, reproducibility nahi hoti, production failures detect karne mein waqt lagta hai. MLOps ke saath: CI/CD pipelines automatically models validate aur deploy karti hain, experiment tracking reproducibility ensure karta hai, monitoring data drift aur model degradation detect karta hai, automated retraining pipelines model freshness maintain karti hain.",
  },
  {
    question: "Feature Store kya hai aur kyun important hai?",
    answer:
      "Feature Store centralized repository hai precomputed ML features ke liye. Do critical problems solve karta hai: (1) Training-serving skew — training mein features alag compute hote hain serving se. Feature store ensure karta hai ki same features dono jagah use hote hain. (2) Feature reuse — ek team ki computed features doosri team ke models bhi use kar sakti hain without recomputation. Online feature store (Redis) real-time inference ke liye low-latency reads provide karta hai. Offline feature store (data warehouse) training ke liye large-scale feature computation karta hai.",
  },
  {
    question: "Distributed Training mein NCCL kya karta hai?",
    answer:
      "NCCL (NVIDIA Collective Communications Library) GPU-optimized communication library hai jo distributed training mein collective operations handle karta hai — all-reduce (gradients synchronize karna), broadcast, scatter, gather. Distributed training mein har GPU apne data batch pe gradients compute karta hai, phir NCCL in gradients ko all GPUs ke beech aggregate karta hai taaki sab GPUs consistent updated model weights rakhein. NCCL InfiniBand aur NVLink ke liye natively optimized hai — maximum bandwidth aur minimum latency ke liye.",
  },
  {
    question: "Data Drift kya hai aur production ML mein kyun problematic hai?",
    answer:
      "Data drift tab hota hai jab real-world data distribution shift hoti hai training distribution se. Covariate shift: input feature distribution changes (average transaction amount 2019 se 2024 dramatically badha). Concept drift: input-output relationship changes (fraud patterns naye techniques adopt karte hain). Label shift: output class distribution changes. Problem: model stale training data pe based predictions karta rehta hai. Solution: statistical monitoring (KS test, PSI), automated retraining triggers, business metric correlation. Silent failure hai — model errors return nahi karta, bas inaccurate predictions deta hai.",
  },
  {
    question: "Model Quantization kya hai aur inference mein kaise help karta hai?",
    answer:
      "Quantization model weights ko high-precision format (FP32/FP16) se lower precision (INT8, INT4) mein convert karta hai. Benefits: memory footprint reduce hota hai (INT4 = 4x reduction vs FP16), inference speed improve hoti hai (lower precision = faster compute), power consumption kam hoti hai. 70B parameter model at FP16: ~140GB GPU memory — multiple H100s required. Same model at INT4: ~35GB — ek H100 pe fit. Quality tradeoff: minimal for most practical applications. Tools: TensorRT, bitsandbytes, GPTQ, AWQ.",
  },
  {
    question: "ML Engineer aur Data Scientist mein kya difference hai?",
    answer:
      "Data Scientist primarily model development pe focus karta hai — data analysis, feature engineering, algorithm selection, experimentation. Production deployment secondary hoti hai. ML Engineer production ML systems build karta hai — training pipelines, serving infrastructure, monitoring, automation. Systems engineering background important hai. Data Engineer data infrastructure build karta hai — pipelines, warehouses, lake architectures. MLOps Engineer CI/CD for ML — automation, deployment, monitoring. Platform Engineer GPU clusters, Kubernetes, infrastructure maintain karta hai jo ML workloads run hote hain.",
  },
  {
    question: "AI Governance aur Responsible AI kya hai?",
    answer:
      "AI Governance framework hai jo ensure karta hai ki AI systems ethical, fair, transparent, aur compliant hain. Key dimensions: (1) Bias aur Fairness — models discriminate nahi karne chahiye protected characteristics pe. (2) Explainability — decisions explain honi chahiye, especially regulated domains mein. (3) Privacy — training data aur model outputs personal information expose nahi karne chahiye. (4) Regulatory compliance — EU AI Act (2024), GDPR ML systems pe specific requirements impose karta hai. (5) Auditing — model decisions traceable aur auditable hone chahiye. Organizations: model cards, datasheets for datasets, bias testing reports publish karte hain.",
  },
  {
    question: "Cloud ML (SageMaker/Vertex AI) vs On-Premises ML infrastructure — kya choose karein?",
    answer:
      "Cloud choose karo jab: experimentation phase mein ho, GPU expertise limited hai, workloads variable/unpredictable hain, quick start chahiye bina CAPEX ke. On-premises justify karo jab: GPU utilization consistently >70% for 12+ months, data sovereignty requirements hain (banking, healthcare), cloud spend Rs. 2-5 crore+ per year GPU pe, deep hardware customization needed. Hybrid common hai: training on-premises, inference on cloud with autoscaling. Managed cloud ML services (SageMaker, Vertex AI) infrastructure complexity abstract karte hain — ideal for teams jinka focus ML hai, not infrastructure.",
  },
  {
    question: "ML model ko production mein deploy karne se pehle kya verify karna chahiye?",
    answer:
      "Pre-deployment checklist: (1) Offline metrics sufficient hain — AUC, F1, precision/recall business requirements satisfy karte hain. (2) Latency SLA met hai — inference time production requirement ke andar hai. (3) A/B test plan ready hai — traffic split, metric tracking, statistical significance. (4) Monitoring configured hai — data drift detection, prediction distribution, business metrics. (5) Rollback plan documented hai — kab aur kaise rollback karein. (6) Feature store consistency verified hai — same features training aur serving mein. (7) Model card documented hai — training data, known limitations, intended use. (8) Load test complete hai — peak traffic pe model stable hai.",
  },
  {
    question: "Machine Learning mein Overfitting kaise detect aur fix karte hain?",
    answer:
      "Detection: training accuracy consistently validation accuracy se zyada high hai, gap training ke saath badhta jaata hai. Loss curves diverge hoti hain — training loss girta hai, validation loss plateau ya increase karta hai. Fixes: (1) More training data — most effective. (2) Regularization — L1 (sparse features), L2 (weight decay), Dropout (neural networks). (3) Simpler model architecture. (4) Data augmentation — training examples artificially diverse banao. (5) Early stopping — validation loss improve hona band ho toh training rok do. (6) Cross-validation — more reliable performance estimate.",
  },
  {
    question: "ML vs Deep Learning vs Generative AI mein kya relationship hai?",
    answer:
      "Yeh nested categories hain. AI sabse broad category hai — intelligence simulate karne wale any approach. Machine Learning AI ka subset hai — data se automatically learning. Deep Learning ML ka subset hai — multi-layer neural networks use karta hai, large datasets aur compute se scale karta hai. Generative AI Deep Learning models ka application hai — text, images, audio, code generate karna. Traditional ML (decision trees, SVM, regression) small datasets pe bhi kaam karta hai. Deep Learning typically large datasets aur GPUs required karta hai. GenAI massive compute aur specialized infrastructure chahti hai.",
  },
  {
    question: "LoRA aur QLoRA kya hain aur fine-tuning mein kaise use hote hain?",
    answer:
      "LoRA (Low-Rank Adaptation) pre-trained large model ko efficiently fine-tune karne ka technique hai. Full fine-tuning: sab parameters update karo — expensive, memory-intensive. LoRA: original model parameters freeze karo, sirf small low-rank matrices train karo (typically 0.1-1% of original parameters). Memory aur compute dramatically reduce hoti hai. QLoRA: LoRA + quantization (4-bit base model) — extremely memory-efficient fine-tuning. 70B model fine-tuning: typically 8+ H100s required at full precision. QLoRA se: single H100 pe possible. Production use: custom domain adaptation, instruction fine-tuning, task-specific specialization of large models.",
  },
];
