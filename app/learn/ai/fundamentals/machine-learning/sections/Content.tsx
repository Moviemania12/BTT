"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { mlContent } from "@/content/machine-learning";

import MlLifecycleDiagram from "../svg/MlLifecycleDiagram";
import MlInfraArchDiagram from "../svg/MlInfraArchDiagram";
import DistributedTrainingDiagram from "../svg/DistributedTrainingDiagram";
import MlopsPipelineDiagram from "../svg/MlopsPipelineDiagram";
import FeatureStoreDiagram from "../svg/FeatureStoreDiagram";
import EnterpriseAiStackDiagram from "../svg/EnterpriseAiStackDiagram";

// suppress unused-import warning — mlContent used for FAQ count reference
void mlContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ──────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Machine Learning (ML) is an approach in which computers learn patterns from data instead of following explicitly programmed rules. In traditional programming, the engineer writes the rules — the computer applies those rules to data. In ML this is reversed: the engineer provides the data — the computer derives the rules itself.
        </p>
        <p style={S.p}>
          This distinction sounds simple, but its infrastructure implications are massive. Rules-based systems can run on a single laptop. Production ML systems — the ones real organizations run — require GPU clusters, petabyte-scale storage, high-throughput networking, and continuous deployment pipelines.
        </p>
        <Callout type="important" title="Continuity from the Previous Article">
          The previous article looked at the complete AI Infrastructure ecosystem — GPU clusters, NVLink, InfiniBand, liquid cooling. This article looks at the primary consumer of that infrastructure: the Machine Learning workloads that actually run on that hardware.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Understand why ML training jobs consume so much power and cooling, and what the specific infrastructure requirements are for inference serving.</li>
          <li><strong>IT Infrastructure Engineers:</strong> The storage, networking, and compute requirements of ML pipelines, which are fundamentally different from standard enterprise workloads.</li>
          <li><strong>Cloud Engineers:</strong> Designing ML training clusters, GPU instance selection, and the infrastructure behind managed ML services (SageMaker, Vertex AI, Azure ML).</li>
          <li><strong>AI/MLOps Engineers:</strong> A deeper infrastructure understanding of the end-to-end ML pipeline — from data ingestion to model serving.</li>
          <li><strong>System Administrators:</strong> GPU server management, the CUDA ecosystem, and ML job scheduling (Slurm, Kubernetes).</li>
          <li><strong>Technical Managers and CTOs:</strong> Justifying and evaluating ML infrastructure investments.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>How Machine Learning actually works — a clear engineering mental model, no math required</li>
          <li>Supervised, Unsupervised, Semi-supervised, and Reinforcement Learning — with real use cases</li>
          <li>Complete ML Lifecycle: Collect → Clean → Train → Validate → Deploy → Monitor → Retrain → Retire</li>
          <li>ML Infrastructure Architecture: Data Lake, Feature Store, Training Cluster, Model Registry, Serving, Monitoring</li>
          <li>Distributed Training engineering: NCCL, DDP, FSDP, ZeRO, Horovod, DeepSpeed, Megatron-LM</li>
          <li>MLOps: CI/CD, shadow deployment, canary deployment, rollback strategies</li>
          <li>Feature Store deep dive: online vs offline, freshness, versioning, training-serving consistency</li>
          <li>ML Infrastructure cost analysis: GPU, storage, networking, power, cloud TCO</li>
          <li>Model optimization: quantization, pruning, distillation, LoRA, QLoRA, fine-tuning</li>
          <li>AI Governance: Responsible AI, explainability, bias, EU AI Act, GDPR</li>
          <li>Industry-specific ML examples: banking, healthcare, manufacturing, retail, telecom, government</li>
          <li>AI/ML job roles and career paths</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ──────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" /> — GPU clusters, InfiniBand, liquid cooling</li>
          <li><strong>Current:</strong> Machine Learning — concepts, workflow, and infrastructure requirements</li>
          <li><strong>Next:</strong> <TopicLink slug="deep-learning" variant="inline" /> — neural networks, architectures, transformers</li>
          <li><strong>Related:</strong> <TopicLink slug="generative-ai" variant="inline" />, <TopicLink slug="llm" variant="inline" />, <TopicLink slug="ai-gpu" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ───────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          The previous article used a specific example: AlexNet. In 2012 it trained on two NVIDIA GTX 580 GPUs, with 3GB combined memory, and training took quite a while. Yet it won the ImageNet competition so decisively that it changed the direction of the entire research community.
        </p>
        <p style={S.p}>
          Before that moment, the dominant approach in computer vision was: engineers manually defined features — "here's an edge, there's a texture, this is what a shape looks like" — and a classifier then worked on those predefined features. AlexNet did something different. It learned classification directly from raw pixels. Nobody manually told it "this is a corner." The network looked at the data itself, identified patterns, and built representations useful for classification.
        </p>
        <p style={S.p}>
          This is the core idea of Machine Learning: learning automatically from data. But this idea creates a massive infrastructure dependency. You need data (a lot of it). You need compute (specialized, expensive). You need storage (high-throughput, parallel). And you need a deployment pipeline that takes the trained model into production and keeps it stable there.
        </p>
      </section>

      {/* ─── WHAT IS ML ─────────────────────────────────────────────────── */}
      <section id="what-is-ml">
        <h2 style={S.h2}>What is Machine Learning?</h2>
        <p style={S.p}>
          Formally: Machine Learning is a field of computer science in which algorithms are designed to automatically improve from experience (data) without being explicitly programmed.
        </p>
        <p style={S.p}>
          Let's understand this with a concrete example. An email spam filter:
        </p>
        <p style={S.p}>
          <strong>Traditional approach:</strong> The engineer manually writes rules — contains "Free money" → spam. Excessive capitals in the subject → spam. Problem: spammers quickly bypass these rules. The engineer keeps adding new rules, and the rule set becomes brittle.
        </p>
        <p style={S.p}>
          <strong>ML approach:</strong> Collect 100,000 labeled emails — tagged "spam" or "not spam." The ML algorithm automatically extracts patterns — word combinations, sender patterns, timing, link density — without the engineer explicitly defining them. The model applies the patterns it has learned to new examples.
        </p>
        <Callout type="important" title="Key Distinction">
          A traditional program is a fixed function: Input → [Fixed Rules] → Output. An ML program is a learnable function: Input + Data → [Learning Algorithm] → Learned Model → Output. That "learned model" is everything the training process generates.
        </Callout>
      </section>

      {/* ─── WHY ML EXISTS ──────────────────────────────────────────────── */}
      <section id="why-ml-exists">
        <h2 style={S.h2}>Why Machine Learning Exists</h2>
        <p style={S.p}>
          Traditional programming has worked for so many years — so why do we need ML? The answer lies in three problems that traditional programming can't solve:
        </p>
        <ul style={S.ul}>
          <li><strong>Complexity where rules can't be manually defined:</strong> Face recognition, natural language understanding, medical image diagnosis. No engineer can sufficiently define these rules. ML can learn automatically from millions of labeled examples.</li>
          <li><strong>Scale where maintaining manual rules is economically infeasible:</strong> Amazon processes crores of daily transactions. Fraudsters continuously develop new patterns. Manual rule updates are practically impossible. An ML system can continuously absorb new patterns.</li>
          <li><strong>Personalization where one rule doesn't fit everyone:</strong> Netflix has 260M+ subscribers. Every subscriber's preferences are different. ML learns individual behavior patterns to generate per-user recommendations — at scale.</li>
        </ul>
      </section>

      {/* ─── HISTORY ────────────────────────────────────────────────────── */}
      <section id="history">
        <h2 style={S.h2}>History and Evolution</h2>
        <p style={S.p}>
          The evolution of ML is directly linked to the evolution of AI Infrastructure. The two developed simultaneously — each made the other possible.
        </p>

        <section id="ai-evolution-timeline">
          <h3 style={S.h3}>AI Evolution Timeline</h3>
          <ComparisonTable
            title="AI and ML — Key Milestones"
            headers={["Era", "Year", "Milestone", "Infrastructure Impact"]}
            rows={[
              ["Foundations", "1950", "Turing Test proposed", "Theoretical — no practical infra needed"],
              ["Foundations", "1957", "Perceptron introduced", "Single CPU — minutes of compute"],
              ["Expert Systems", "1970s-80s", "Rule-based AI, MYCIN", "CPU-only, maintenance-heavy"],
              ["Statistical ML", "1986", "Backpropagation formalized", "CPUs, multi-layer networks possible"],
              ["Statistical ML", "1995", "SVMs introduced (Vapnik)", "CPU-efficient, small datasets"],
              ["Deep Learning Revival", "2006", "NVIDIA CUDA launched", "GPUs for general compute unlocked"],
              ["Deep Learning Revival", "2012", "AlexNet wins ImageNet", "2× GTX 580 GPUs — research clusters"],
              ["DL Dominance", "2014", "GANs introduced (Goodfellow)", "Multi-GPU training becoming standard"],
              ["DL Dominance", "2015", "ResNet — 152 layers", "Dedicated GPU servers, A100 precursor era"],
              ["Transformer Era", "2017", "Attention is All You Need", "GPU clusters, parallelizable training"],
              ["Foundation Models", "2020", "GPT-3 — 175B params", "Thousands of GPUs, custom DC infrastructure"],
              ["GenAI Era", "2022", "ChatGPT, Stable Diffusion", "AI DC as separate infrastructure category"],
              ["Hyperscale AI", "2024-25", "Blackwell, NVL72, 100K-GPU clusters", "GW-scale power, purpose-built AI campuses"],
            ]}
          />
        </section>
      </section>

      {/* ─── HOW ML WORKS ───────────────────────────────────────────────── */}
      <section id="how-ml-works">
        <h2 style={S.h2}>How Machine Learning Works</h2>
        <p style={S.p}>
          A simple mental model to understand everything: <strong>ML is a function approximation problem.</strong>
        </p>
        <p style={S.p}>
          Imagine there's a function f that maps inputs to outputs. Here f is the "true function" that makes this decision correctly — but we can't access it directly. What ML does: it learns an approximation f̂ from labeled examples that gets as close to f as possible.
        </p>
        <p style={S.p}>
          Here's how that happens, concretely: (1) Collect labeled data. (2) Choose a parameterized model — like a neural network. (3) Define a loss — the difference between the model's output and the actual output. (4) Use gradient descent to adjust parameters to minimize the loss. (5) Repeat this process millions or billions of times.
        </p>
        <Callout type="maintenance" title="Infrastructure Perspective">
          Step 4 — optimization — is the step that demands GPU compute. Gradient computation is mathematically matrix multiplication — a GPU's sweet spot. Step 1 — data collection — demands parallel file systems and high-throughput storage. Serving the trained model in production — inference — demands latency-optimized infrastructure.
        </Callout>
      </section>

      {/* ─── ML WORKFLOW ────────────────────────────────────────────────── */}
      <section id="ml-workflow">
        <h2 style={S.h2}>Machine Learning Workflow</h2>
        <p style={S.p}>
          Real ML projects are far more complex than a simple "data in, model out." The production ML workflow:
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Problem Definition:</strong> Be clear about what you want to predict. "Improve AI" is not a problem statement. Input defined, output defined, business value clear.</li>
          <li><strong>Data Collection and Ingestion:</strong> Where is the data? Databases, APIs, logs, sensors. Build pipelines. Infrastructure: Kafka for streaming, ETL for batch, S3/GCS for the raw data lake.</li>
          <li><strong>Data Preparation and Cleaning:</strong> Missing values, duplicates, inconsistent formats, outliers. Data scientists typically spend 60-80% of their time here.</li>
          <li><strong>Feature Engineering:</strong> Raw data → an ML-ready representation. Deriving "day of week," "is holiday" from a date column. Text into numerical vectors.</li>
          <li><strong>Model Selection and Training:</strong> Choose an algorithm, set up the GPU infrastructure, run training. For large models: distributed training across multiple GPUs.</li>
          <li><strong>Validation and Evaluation:</strong> Evaluate on the test set. Accuracy, precision, recall, F1, AUC-ROC. Correlate with business metrics.</li>
          <li><strong>Hyperparameter Tuning:</strong> Compare multiple runs. Grid search, random search, Bayesian optimization. Each trial = significant compute.</li>
          <li><strong>Model Deployment:</strong> REST API, batch prediction, or real-time streaming. Inference servers, model registries, A/B testing.</li>
          <li><strong>Monitoring and Maintenance:</strong> Track accuracy in production. Detect data drift. Trigger retraining.</li>
          <li><strong>Retraining:</strong> A continuous loop — not a single deployment event.</li>
        </ol>

        <section id="ml-lifecycle">
          <h3 style={S.h3}>Complete ML Lifecycle</h3>
          <Figure caption="ML Lifecycle: Collect → Clean → Train → Validate → Deploy → Monitor → Retrain → Retire — a continuous loop, not a one-time event">
            <MlLifecycleDiagram />
          </Figure>
          <p style={S.p}>
            The <strong>Retire</strong> step is often overlooked. Models don't run in production indefinitely. When a better model becomes available or the business use case sunsets, the model has to be retired gracefully — disable the endpoints, clean up storage, maintain an audit trail.
          </p>
        </section>
      </section>

      {/* ─── TYPES OF ML ────────────────────────────────────────────────── */}
      <section id="types-of-ml">
        <h2 style={S.h2}>Types of Machine Learning</h2>

        <section id="supervised">
          <h3 style={S.h3}>Supervised Learning</h3>
          <p style={S.p}>
            The most common type. Learning from <strong>labeled data</strong> — every training example has both an input and the correct output. It's like studying with a teacher who gives the correct solution for every answer.
          </p>
          <ul style={S.ul}>
            <li><strong>Image classification:</strong> Input = image, Output = "cat/dog/car"</li>
            <li><strong>Fraud detection:</strong> Input = transaction details, Output = "fraud/legitimate"</li>
            <li><strong>Medical diagnosis:</strong> Input = X-ray image, Output = "tumor present/absent"</li>
            <li><strong>Price prediction:</strong> Input = house features, Output = estimated price</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: labeled datasets are very expensive — human annotation costs money. Services like Scale AI and Toloka handle annotation. Large supervised datasets: ImageNet (14M images), Common Crawl (petabytes of text).
          </p>
        </section>

        <section id="unsupervised">
          <h3 style={S.h3}>Unsupervised Learning</h3>
          <p style={S.p}>
            Learning from <strong>unlabeled data</strong> — the algorithm discovers hidden structure in the data on its own. Finding patterns by itself, without a teacher.
          </p>
          <ul style={S.ul}>
            <li><strong>Customer segmentation:</strong> Grouping based on purchase behavior — without predefining groups</li>
            <li><strong>Anomaly detection:</strong> Unusual patterns in network traffic — without labeled anomalies</li>
            <li><strong>Topic modeling:</strong> Automatically identifying the main topics across thousands of documents</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: unlabeled data is much easier and cheaper to collect. Log data, sensor data, web click streams — all of these are naturally unlabeled and are excellent unsupervised learning candidates.
          </p>
        </section>

        <section id="semi-supervised">
          <h3 style={S.h3}>Semi-Supervised Learning</h3>
          <p style={S.p}>
            A combination of <strong>a little labeled data + a lot of unlabeled data</strong>. In the real world, labeled data is scarce. Medical images: there are plenty of radiology scans, but annotating each scan with a radiologist's time is time-consuming and expensive. Semi-supervised: train an effective model from 1,000 labeled scans + 1,000,000 unlabeled scans. Google Photos — improving person recognition from a few tagged photos plus a massive unlabeled corpus.
          </p>
        </section>

        <section id="reinforcement">
          <h3 style={S.h3}>Reinforcement Learning</h3>
          <p style={S.p}>
            A completely different paradigm from labeled data. In RL, an <strong>agent</strong> takes actions in an <strong>environment</strong> and receives <strong>rewards or penalties</strong>. Learning optimal behavior through trial and error.
          </p>
          <ul style={S.ul}>
            <li><strong>AlphaGo:</strong> Beat the world champion at Go. AlphaStar: grandmaster-level at StarCraft 2.</li>
            <li><strong>Data Center cooling:</strong> Google DeepMind used RL to optimize DC cooling — achieving a 40% reduction in energy.</li>
            <li><strong>Recommendation systems:</strong> YouTube, TikTok — recommending content that maximizes watch time.</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: RL training is particularly expensive — the agent needs millions of interactions with the environment. Simulation environments have to run at scale — thousands of parallel simulations.
          </p>
        </section>
      </section>

      {/* ─── ML VS DL VS GENAI ──────────────────────────────────────────── */}
      <section id="ml-vs-dl-vs-genai">
        <h2 style={S.h2}>ML vs Deep Learning vs Generative AI</h2>
        <p style={S.p}>
          These terms often get confusingly interchanged. Let's clarify:
        </p>
        <ComparisonTable
          headers={["Category", "What It Is", "Data Requirement", "Compute Need", "Examples"]}
          rows={[
            ["AI (broad)", "Any approach simulating intelligence", "Varies", "Varies", "Rule-based systems, planning, ML"],
            ["Machine Learning", "Learning patterns from data automatically", "Thousands to millions of examples", "CPU to small GPU", "XGBoost, SVM, Random Forest, simple NNs"],
            ["Deep Learning", "Multi-layer neural networks, scales with data+compute", "Millions to billions of examples", "GPU clusters required", "CNNs, RNNs, Transformers, BERT"],
            ["Generative AI", "DL models that create new content", "Trillions of tokens/images", "Massive GPU/TPU clusters", "GPT-4, Stable Diffusion, Gemini, Claude"],
          ]}
        />
        <p style={S.p}>
          These are nested circles — everything is ML, everything is AI, but not all AI is ML. Traditional ML (decision trees, SVM) works even on small datasets. Deep Learning typically requires large datasets and GPUs. GenAI needs massive compute and specialized infrastructure — the infrastructure described in the previous article is primarily for GenAI.
        </p>
      </section>

      {/* ─── ML MODELS ──────────────────────────────────────────────────── */}
      <section id="ml-models">
        <h2 style={S.h2}>ML Models — What Exactly Is a Model?</h2>
        <p style={S.p}>
          Technically: an ML model is a mathematical function with learned parameters. Concretely, for a neural network model: billions of floating point numbers (weights and biases) organized into layers. GPT-3: 175 billion parameters = roughly 350GB of memory at FP16 precision.
        </p>
        <ComparisonTable
          title="Model Size and Infrastructure Requirements"
          headers={["Model Size", "Memory (FP16)", "Training GPUs", "Inference GPUs"]}
          rows={[
            ["7B parameters", "~14 GB", "4-8× H100", "1× H100 or A10G"],
            ["13B parameters", "~26 GB", "8× H100", "1× H100"],
            ["70B parameters", "~140 GB", "32-64× H100", "2× H100 minimum"],
            ["175B (GPT-3)", "~350 GB", "200-400× H100 equiv.", "5+ H100 minimum"],
            ["1T (hypothetical)", "~2 TB", "2000+ H100 equiv.", "25+ H100 minimum"],
          ]}
        />
        <p style={S.p}>
          Modern models are typically saved as PyTorch <code style={S.code}>.pt</code> files, a TensorFlow SavedModel, ONNX (cross-framework), or the HuggingFace safetensors format.
        </p>
      </section>

      {/* ─── TRAINING VS INFERENCE ──────────────────────────────────────── */}
      <section id="training-vs-inference">
        <h2 style={S.h2}>Training vs Inference</h2>
        <ComparisonTable
          headers={["Factor", "Training", "Inference (Prediction)"]}
          rows={[
            ["When", "Once (or periodically)", "Continuously in production"],
            ["Duration", "Hours to weeks", "Milliseconds to seconds"],
            ["Batch size", "Large (512-4096)", "Small (1-32)"],
            ["Latency requirement", "None (batch job)", "Strict (<100ms interactive)"],
            ["GPU optimization", "Maximum throughput", "Latency + throughput/$"],
            ["Scaling model", "Fixed cluster", "Auto-scale with traffic"],
            ["Storage during", "Training data (TB/s read)", "Model weights only"],
            ["Power per GPU", "100% TDP", "40-70% TDP typical"],
            ["GPU preference", "H100 SXM (max throughput)", "A10G/L4 (cost-efficient)"],
          ]}
        />
      </section>

      {/* ─── FEATURES AND LABELS ────────────────────────────────────────── */}
      <section id="features-labels">
        <h2 style={S.h2}>Features and Labels</h2>
        <p style={S.p}>
          <strong>Labels:</strong> The correct answers in the training data. "Spam" or "not spam." Labels are what the model is trying to learn to predict. Label quality directly determines model quality — noisy labels can teach the model confusing patterns.
        </p>
        <p style={S.p}>
          <strong>Features:</strong> The input variables the model uses for prediction. For email spam: word count, sender domain, link count, subject length, time sent. For house price: square footage, location, age, bedrooms. Feature selection and engineering often affect model quality more than algorithm choice does.
        </p>
      </section>

      {/* ─── DATASET PREPARATION ────────────────────────────────────────── */}
      <section id="dataset-preparation">
        <h2 style={S.h2}>Dataset Preparation</h2>
        <p style={S.p}>
          "Garbage in, garbage out." Dataset quality directly determines model quality — more than the amount of compute does.
        </p>
        <p style={S.p}>
          <strong>Data splitting:</strong> Training set (70-80%): the model trains on these examples. Validation set (10-15%): for hyperparameter tuning and early stopping. Test set (10-15%): final evaluation — evaluated once, after training is complete.
        </p>
        <p style={S.p}>
          <strong>Class imbalance:</strong> Fraud detection: 99.9% of transactions are legitimate, 0.1% are fraud. If the model just predicts "legitimate" every time, that's 99.9% accuracy — but useless. Fix: oversampling the minority class, undersampling the majority, class weights in the loss function.
        </p>
        <Callout type="warning" title="Data Leakage — The Most Costly Mistake">
          Future information that won't be available at prediction time accidentally getting included in the features. Including a "chargeback received" feature in a credit card fraud model — the prediction has to happen before the fraud occurs, when the chargeback doesn't exist yet. This artificially creates high training accuracy that completely disappears in production.
        </Callout>
      </section>

      {/* ─── DATA QUALITY ───────────────────────────────────────────────── */}
      <section id="data-quality">
        <h2 style={S.h2}>Data Quality</h2>
        <ul style={S.ul}>
          <li><strong>Schema validation:</strong> Expected data types, ranges, allowed values. Automated checks jo new data batches validate karein before training.</li>
          <li><strong>Distribution monitoring:</strong> The real-world data distribution keeps shifting continuously — "data drift." Statistical tests (Kolmogorov-Smirnov, Population Stability Index) detect distribution shifts.</li>
          <li><strong>Label quality:</strong> Inter-annotator agreement metrics (Cohen's Kappa) measure label consistency.</li>
          <li><strong>Data freshness:</strong> Models trained on stale training data make stale predictions. 2019's credit data is probably outdated by 2024 — the pandemic permanently changed consumer behavior.</li>
        </ul>
      </section>

      {/* ─── FEATURE ENGINEERING ────────────────────────────────────────── */}
      <section id="feature-engineering">
        <h2 style={S.h2}>Feature Engineering</h2>
        <p style={S.p}>
          Transforming raw data into a representation useful for ML models. This is often the biggest driver of model quality.
        </p>
        <ul style={S.ul}>
          <li><strong>Temporal features:</strong> Extract from the timestamp — day of week, hour of day, time since last event, rolling averages.</li>
          <li><strong>Interaction features:</strong> "Amount / Account_Average_Amount" — a Rs. 100,000 transaction from an account that normally does Rs. 500 — much more suspicious.</li>
          <li><strong>Text features:</strong> Dense vector representations via TF-IDF or transformer embeddings (BERT, Sentence-BERT). Vectors for similar words end up automatically close together.</li>
          <li><strong>Embeddings:</strong> For high-cardinality categoricals — product IDs, user IDs, location names. Embeddings of similar entities automatically end up similar.</li>
        </ul>
      </section>

      {/* ─── FEATURE STORE ──────────────────────────────────────────────── */}
      <section id="feature-store">
        <h2 style={S.h2}>Feature Store Architecture</h2>
        <p style={S.p}>
          A Feature Store is a centralized repository for precomputed ML features. It solves two critical problems:
        </p>
        <ul style={S.ul}>
          <li><strong>Training-serving skew:</strong> Features are computed differently in training than in serving — the feature store ensures the same features are used in both places.</li>
          <li><strong>Feature reuse:</strong> Features computed by one team can be used by another team's models without recomputation.</li>
        </ul>
        <Figure caption="Feature Store Architecture: Online store for real-time inference, offline store for training — same transformation logic ensures consistency">
          <FeatureStoreDiagram />
        </Figure>

        <section id="feature-store-online">
          <h3 style={S.h3}>Online vs Offline Feature Store</h3>
          <ComparisonTable
            headers={["Aspect", "Online Feature Store", "Offline Feature Store"]}
            rows={[
              ["Technology", "Redis, DynamoDB, Cassandra", "BigQuery, Hive, S3 + Parquet"],
              ["Access pattern", "Point lookups, key-value", "Batch scans, historical range"],
              ["Latency", "<5ms (real-time inference)", "Minutes to hours (training export)"],
              ["Scale", "Hot features, limited size", "Full history, petabyte scale"],
              ["Use case", "Serving — real-time prediction", "Training — dataset generation"],
              ["Feature freshness", "Seconds to minutes", "Hours to days"],
              ["Cost", "Higher (memory-based)", "Lower (object storage)"],
              ["Tools", "Feast online, Tecton, Vertex", "Feast offline, Delta Lake, Iceberg"],
            ]}
          />
          <p style={S.p}>
            <strong>Feature Versioning:</strong> Features change — they need to be versioned. A model trained on the v2 feature definition, but serving is serving v1 features — silent accuracy loss. Feature store versioning ensures training and serving use the same feature definition.
          </p>
        </section>
      </section>

      {/* ─── MODEL TRAINING ─────────────────────────────────────────────── */}
      <section id="model-training">
        <h2 style={S.h2}>Model Training — Infrastructure Deep Dive</h2>
        <p style={S.p}>
          The training phase is where the infrastructure investment gets justified. A single training step:
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li>Load a batch of training examples into GPU memory (data loading)</li>
          <li>Forward pass: input → model → prediction</li>
          <li>Compute the loss: prediction vs actual label</li>
          <li>Backward pass (backpropagation): compute gradients from the loss</li>
          <li>Parameter update: adjust parameters using the gradients (optimizer step)</li>
          <li>Next batch, repeat — millions of times</li>
        </ol>
        <p style={S.p}>
          Steps 2-4 are matrix operations — the GPU's job. Step 1 is storage bandwidth-bound. In efficient training, data loading runs concurrently with GPU compute (prefetching).
        </p>

        <section id="distributed-training">
          <h3 style={S.h3}>Distributed Training Engineering</h3>
          <Figure caption="Distributed ML Training: Data Parallelism with NCCL All-Reduce across GPU nodes via InfiniBand">
            <DistributedTrainingDiagram />
          </Figure>
          <ComparisonTable
            title="Distributed Training Strategies"
            headers={["Strategy", "What's Distributed", "When to Use", "Key Library"]}
            rows={[
              ["DDP (DistributedDataParallel)", "Data batches across GPUs", "Model fits in one GPU", "PyTorch DDP"],
              ["FSDP (Fully Sharded)", "Params + grads + optimizer", "Memory constrained", "PyTorch FSDP"],
              ["ZeRO (Zero Redundancy)", "Params + grads + optimizer", "Very large models", "DeepSpeed ZeRO-1/2/3"],
              ["Tensor Parallelism", "Individual layer operations", "Model too large for one node", "Megatron-LM"],
              ["Pipeline Parallelism", "Model layers sequentially", "Very deep models", "Megatron-LM, PipeDream"],
              ["Horovod", "Gradients (ring all-reduce)", "Multi-framework simplicity", "Horovod"],
              ["3D Parallelism", "Data + Tensor + Pipeline combined", "GPT-3 scale models", "Megatron + DeepSpeed"],
            ]}
          />
          <p style={S.p}>
            <strong>NCCL (NVIDIA Collective Communications Library):</strong> A GPU-optimized communication library that handles all-reduce operations. Natively optimized for InfiniBand and NVLink. The backbone of distributed training. NCCL performance directly determines training throughput — poor NCCL bandwidth means GPUs sit idle waiting for gradient sync.
          </p>
          <Callout type="best-practice" title="Distributed Training Best Practice">
            Always run an NCCL bandwidth test (<code style={S.code}>nccl-tests all-reduce</code>) before starting any large training run. A misconfigured fabric or a single slow link can slow down the entire cluster. A non-blocking InfiniBand fat-tree topology is mandatory for large-scale training.
          </Callout>
        </section>
      </section>

      {/* ─── MODEL VALIDATION ───────────────────────────────────────────── */}
      <section id="model-validation">
        <h2 style={S.h2}>Model Validation</h2>
        <ComparisonTable
          title="ML Evaluation Metrics"
          headers={["Metric", "Formula", "When to Use", "Caution"]}
          rows={[
            ["Accuracy", "Correct / Total", "Balanced classes", "Misleading on imbalanced data"],
            ["Precision", "TP / (TP + FP)", "Cost of false positives high", "Ignores false negatives"],
            ["Recall", "TP / (TP + FN)", "Cost of false negatives high", "Ignores false positives"],
            ["F1 Score", "2 × P×R / (P+R)", "Balance precision and recall", "Assumes equal importance"],
            ["AUC-ROC", "Area under ROC curve", "Threshold-independent eval", "Not for severe class imbalance"],
            ["MAE", "Mean absolute error", "Regression problems", "Linear penalty"],
            ["RMSE", "Root mean square error", "Penalize large errors more", "Sensitive to outliers"],
          ]}
        />
        <p style={S.p}>
          <strong>Bias-Variance tradeoff:</strong> High bias (underfitting) = the model is too simple, performs poorly even on training data — fix: a more complex model, more features. High variance (overfitting) = great on training, poor on new data — fix: more data, regularization, a simpler model, dropout.
        </p>
      </section>

      {/* ─── HYPERPARAMETER TUNING ──────────────────────────────────────── */}
      <section id="hyperparameter-tuning">
        <h2 style={S.h2}>Hyperparameter Tuning</h2>
        <p style={S.p}>
          Model parameters are learned during training. Hyperparameters are set before training — learning rate, batch size, layer count, regularization strength.
        </p>
        <ul style={S.ul}>
          <li><strong>Grid search:</strong> Try every possible combination. Simple but exponentially expensive.</li>
          <li><strong>Random search:</strong> Randomly sample from hyperparameter space — often more efficient than grid search.</li>
          <li><strong>Bayesian optimization:</strong> Use the results of prior trials to intelligently choose the next trial. Most efficient. Tools: Optuna, Ray Tune, W&B Sweeps.</li>
        </ul>
        <p style={S.p}>
          Infrastructure: hyperparameter tuning means many parallel training runs. Ray Tune or similar frameworks parallelize efficiently across a GPU cluster.
        </p>
      </section>

      {/* ─── MODEL DEPLOYMENT ───────────────────────────────────────────── */}
      <section id="model-deployment">
        <h2 style={S.h2}>Model Deployment</h2>
        <ul style={S.ul}>
          <li><strong>Real-time inference:</strong> Single request → immediate prediction. REST API or gRPC endpoint. Latency SLA typically &lt;100ms. NVIDIA Triton, TorchServe, vLLM.</li>
          <li><strong>Batch prediction:</strong> Collect a large batch, process it all at once. Throughput over latency. Kubernetes Jobs, AWS Batch. Cost-effective — off-peak scheduling.</li>
          <li><strong>Edge deployment:</strong> The model runs directly on the device. No network required. Better privacy. Constraints: model size and compute are severely limited. Quantization, pruning, distillation required.</li>
        </ul>
        <ComparisonTable
          title="Model Serving Infrastructure"
          headers={["Component", "Purpose", "Tools"]}
          rows={[
            ["Model Registry", "Version control for trained models", "MLflow, SageMaker Registry, Vertex AI"],
            ["Serving Runtime", "Execute model inference", "NVIDIA Triton, TorchServe, TF Serving, vLLM"],
            ["Feature Store", "Consistent features at serving time", "Feast, Tecton, Vertex AI Feature Store"],
            ["API Gateway", "Route requests, auth, rate limit", "Kong, AWS API Gateway, NGINX"],
            ["Load Balancer", "Distribute inference requests", "K8s Ingress, AWS ALB, GCP LB"],
            ["A/B Testing", "Compare model versions in production", "Custom routing, Seldon, BentoML"],
          ]}
        />
      </section>

      {/* ─── MLOPS ──────────────────────────────────────────────────────── */}
      <section id="mlops">
        <h2 style={S.h2}>MLOps — Production ML Engineering</h2>
        <p style={S.p}>
          MLOps (Machine Learning Operations) is the engineering and automation of the ML model lifecycle — from data collection through model training, deployment, monitoring, and retraining. Without MLOps: models are deployed manually, reproducibility suffers, and it takes a long time to detect production failures.
        </p>
        <p style={S.p}>
          With MLOps: CI/CD pipelines automatically validate and deploy models, experiment tracking ensures reproducibility, and monitoring detects data drift and model degradation.
        </p>
        <Figure caption="MLOps CI/CD Pipeline: Code commit through shadow deployment, canary release, to full production — with automated rollback">
          <MlopsPipelineDiagram />
        </Figure>

        <section id="mlops-cicd">
          <h3 style={S.h3}>CI/CD, Shadow Deploy, Canary, Rollback</h3>
          <ul style={S.ul}>
            <li><strong>CI/CD for ML:</strong> Code change → automated unit tests → integration tests → model training → validation → staging → production. GitHub Actions, GitLab CI, Jenkins — same tools as software, ML-specific steps added.</li>
            <li><strong>Experiment Tracking:</strong> Weights &amp; Biases, MLflow — for every training run: hyperparameters, metrics, artifacts, code version. For reproducibility and comparison.</li>
            <li><strong>Shadow Deployment:</strong> The new model makes predictions on production traffic, but the results aren't shown to actual users. Compare predictions against real traffic silently. Zero user risk. Infrastructure: duplicate production requests to the shadow model too.</li>
            <li><strong>Canary Deployment:</strong> Route 5-10% of traffic to the new model. Monitor business metrics. If stable: gradually increase. If degraded: roll back immediately. Safer than a full cutover.</li>
            <li><strong>Rollback:</strong> If model performance degrades or drift is detected — revert to the previous version. Load the previous version from the model registry, route traffic back. The rollback procedure should be documented and tested ahead of time.</li>
            <li><strong>Model Versioning:</strong> Training code, dataset version, hyperparameters, environment — all versioned. It should be possible to exactly reproduce a specific model version six months later.</li>
          </ul>
        </section>
      </section>

      {/* ─── ML INFRA ARCHITECTURE ──────────────────────────────────────── */}
      <section id="ml-infra-architecture">
        <h2 style={S.h2}>ML Infrastructure Architecture</h2>
        <p style={S.p}>
          Now let's look at all the pieces as one complete picture:
        </p>
        <Figure caption="ML Infrastructure Architecture: Data Lake → Feature Store → Training Cluster → Model Registry → Serving → Monitoring → Automated Retraining Loop">
          <MlInfraArchDiagram />
        </Figure>

        <section id="enterprise-ai-stack">
          <h3 style={S.h3}>Enterprise AI Stack</h3>
          <Figure caption="Enterprise AI Stack: From physical infrastructure to business applications — every layer depends on all layers below">
            <EnterpriseAiStackDiagram />
          </Figure>
          <p style={S.p}>
            Physical infrastructure sits at the bottom — and is the most critical. An organization that can afford GPU clusters but can't upgrade cooling is wasting the potential of the upper layers. Every layer of the enterprise AI stack depends on the previous layer — there's no shortcut.
          </p>
        </section>
      </section>

      {/* ─── GPUS IN ML ─────────────────────────────────────────────────── */}
      <section id="gpus-in-ml">
        <h2 style={S.h2}>GPUs in Machine Learning</h2>
        <p style={S.p}>
          Neural network training = matrix multiplication at scale. A single transformer attention operation: multiple large matrix multiplications happening simultaneously. The GPU's thousands of CUDA cores do this massively in parallel. The same operation on a CPU is 60-100x slower than on a GPU.
        </p>
        <ComparisonTable
          title="GPU Selection for ML Workloads"
          headers={["Task", "Recommended GPU", "Reason"]}
          rows={[
            ["Small model training (<7B params)", "A100 40/80GB", "Good balance cost/performance"],
            ["Large model training (70B+)", "H100 SXM 80GB", "NVLink 4.0, maximum HBM bandwidth"],
            ["Real-time inference (small models)", "A10G, L4", "Cost-efficient, good latency"],
            ["High-throughput LLM inference", "H100, A100", "Maximum tokens/second"],
            ["LoRA/QLoRA fine-tuning", "A10G, L40S", "Sufficient memory, cost-effective"],
            ["Research/experimentation", "Any available GPU", "Flexibility over optimization"],
          ]}
        />
        <p style={S.p}>
          <strong>CUDA ecosystem dominance:</strong> NVIDIA's dominance isn't just hardware — it's the software ecosystem. The CUDA toolkit, cuDNN (deep learning primitives), cuBLAS (linear algebra), NCCL (collective communications) — all of these are used directly underneath PyTorch and TensorFlow. AMD's ROCm alternative exists but there's still an ecosystem maturity gap.
        </p>
      </section>

      {/* ─── STORAGE ────────────────────────────────────────────────────── */}
      <section id="storage-requirements">
        <h2 style={S.h2}>Storage Requirements</h2>
        <ComparisonTable
          title="ML Storage Hierarchy"
          headers={["Layer", "Technology", "Bandwidth", "Use Case"]}
          rows={[
            ["GPU HBM", "HBM3 (on-GPU)", "3.35 TB/s per H100", "Active model weights, activations"],
            ["CPU DRAM", "DDR5", "~500 GB/s aggregate", "Dataset caching, preprocessing"],
            ["Local NVMe", "U.2 / M.2 NVMe", "10-20 GB/s per drive", "Hot data cache, checkpoint temp"],
            ["Parallel FS", "Lustre/Weka/VAST", "100s GB/s to TB/s", "Training data lake, checkpoints"],
            ["Object Storage", "S3/GCS/Azure Blob", "Gigabytes/s", "Archive, model artifacts, cold data"],
          ]}
        />
        <p style={S.p}>
          Storage throughput requirements: a 256 H100 cluster needs a minimum of 43+ GB/s sustained read throughput. Most parallel FS deployments target 100-300+ GB/s for a 256-GPU cluster. Standard NAS (NFS server) at 5-10 GB/s — insufficient for large GPU clusters.
        </p>
        <p style={S.p}>
          <strong>Checkpoint strategy:</strong> A 70B model checkpoint = ~140GB at FP16. Async checkpointing: write to NVMe first, then background copy to the parallel FS — minimizing training pauses. Retain only the last N checkpoints — storing full history is impractical.
        </p>
      </section>

      {/* ─── NETWORKING ─────────────────────────────────────────────────── */}
      <section id="networking-requirements">
        <h2 style={S.h2}>Networking Requirements</h2>
        <p style={S.p}>
          Training cluster: InfiniBand NDR (400Gbps) for large-scale distributed training. Communication overhead 20-40% of training time. Poor network = GPU idle, waiting for gradient sync. RDMA mandatory for low latency.
        </p>
        <p style={S.p}>
          Inference serving: Standard 25-100GbE typically sufficient. Request-response pattern — not all-reduce. Exception: very large models requiring tensor parallelism — inter-GPU communication still required.
        </p>
      </section>

      {/* ─── ML IN DC OPERATIONS ────────────────────────────────────────── */}
      <section id="ml-in-dc-operations">
        <h2 style={S.h2}>Machine Learning in Data Center Operations</h2>
        <p style={S.p}>
          ML doesn't just run on the DC — ML also helps the DC operate better. This dual relationship matters:
        </p>
        <ComparisonTable
          title="ML Applications in DC Operations"
          headers={["DC Function", "ML Application", "Real Example"]}
          rows={[
            ["Cooling optimization", "RL-based control", "Google DeepMind: 40% cooling energy reduction"],
            ["Power prediction", "Time-series forecasting", "Predict next 30-min load — generator pre-start"],
            ["Hardware failure prediction", "Anomaly detection on sensor data", "Disk SMART data → failure 2 weeks ahead"],
            ["Capacity planning", "Demand forecasting", "Predict rack power growth — order ahead"],
            ["Network anomaly detection", "Unsupervised ML on traffic", "Detect DDoS before full impact"],
            ["PUE optimization", "Regression + RL", "Optimal CRAC setpoint given outdoor temp"],
            ["Workload scheduling", "ML-based job placement", "GPU affinity scheduling for NCCL efficiency"],
            ["Security threat detection", "Classification on log data", "Insider threat, credential abuse patterns"],
          ]}
        />
        <Callout type="best-practice" title="Practical ML for DC Engineers">
          ML integration into DCIM systems is increasingly common. Anomaly detection from sensor data, predictive maintenance, and capacity forecasting — all of these are being applied in production DC operations. A DC engineer who understands ML can deploy and tune these tools better.
        </Callout>
      </section>

      {/* ─── ENTERPRISE ML PIPELINE ─────────────────────────────────────── */}
      <section id="enterprise-ml-pipeline">
        <h2 style={S.h2}>Enterprise ML Pipeline</h2>
        <p style={S.p}>
          How ML actually runs end-to-end in a real enterprise:
        </p>

        <section id="enterprise-tools">
          <h3 style={S.h3}>Enterprise ML Tools</h3>
          <ComparisonTable
            title="Enterprise ML Tooling Landscape"
            headers={["Category", "Tool", "Purpose", "Best For"]}
            rows={[
              ["Framework", "PyTorch", "Primary training framework", "Research + production, dynamic graphs"],
              ["Framework", "TensorFlow", "Production ML ecosystem", "TF Serving, mobile/edge deployment"],
              ["Framework", "JAX", "Research, large-scale", "Google TPU, functional programming model"],
              ["Classical ML", "scikit-learn", "Traditional algorithms", "Tabular data, baseline models"],
              ["Boosting", "XGBoost/LightGBM", "Best tabular performance", "Structured data competitions + prod"],
              ["Experiment Tracking", "Weights & Biases", "Experiment logging", "Team collaboration, rich visualizations"],
              ["Experiment Tracking", "MLflow", "Open-source MLOps", "Self-hosted, model registry"],
              ["Orchestration", "Kubeflow", "ML on Kubernetes", "K8s-native ML pipelines"],
              ["Orchestration", "Apache Airflow", "Workflow automation", "Complex DAG pipelines, retraining"],
              ["Distributed Compute", "Ray", "Distributed Python", "Hyperparameter tuning, inference serving"],
              ["Data Processing", "Apache Spark", "Large-scale data", "Data prep, feature engineering at scale"],
              ["Inference Serving", "NVIDIA Triton", "Multi-framework serving", "Enterprise GPU inference"],
              ["LLM Inference", "vLLM", "LLM serving", "High-throughput open-source LLM serving"],
            ]}
          />
        </section>
      </section>

      {/* ─── PRODUCTION EXAMPLE ─────────────────────────────────────────── */}
      <section id="production-example">
        <h2 style={S.h2}>Real Production Example — Bank Fraud Detection</h2>
        <p style={S.p}>
          <strong>Organization:</strong> Large Indian private sector bank. Data: 5 million transactions/day. Fraud rate: 0.3%.
        </p>
        <ul style={S.ul}>
          <li><strong>Data ingestion:</strong> Core banking → Kafka real-time streaming → Feature Store (Redis online, BigQuery offline).</li>
          <li><strong>Feature engineering:</strong> Transaction velocity (last 24 hours), average transaction amount (last 30 days), device fingerprint history, time since last transaction.</li>
          <li><strong>Training:</strong> 18 months labeled data, class imbalance handled via weighted sampling, XGBoost baseline + deep neural network production, 4× V100 GPUs on-premises.</li>
          <li><strong>Validation:</strong> Test set = last 3 months. Primary metric: AUC-ROC. Secondary: precision at 90% recall (business requirement).</li>
          <li><strong>Deployment:</strong> Shadow deploy 2 weeks, then canary 10%, then full. Latency &lt;50ms (transaction approval pipeline). 2× A10G GPU, NVIDIA Triton, Kubernetes.</li>
          <li><strong>Monitoring:</strong> Daily: feature distribution vs training. Weekly: model AUC on recent transactions. Alert: AUC drops &gt;2% — retrain trigger.</li>
          <li><strong>Retraining:</strong> Automated monthly pipeline — last 18 months data, new fraud cases, manual approval before deploy.</li>
        </ul>
      </section>

      {/* ─── REAL EXAMPLES ──────────────────────────────────────────────── */}
      <section id="real-examples">
        <h2 style={S.h2}>Real Production Examples</h2>
        <ul style={S.ul}>
          <li><strong>Netflix — Recommendation:</strong> 260M+ subscribers. ML determines homepage layout — not just what to recommend but in which row, with what artwork. Inference: &lt;100ms for homepage load. ~80% viewing generated through recommendations.</li>
          <li><strong>Google Maps — ETA Prediction:</strong> Billions of GPS signals daily. Graph neural networks model road network. Inference at massive scale — billions of queries/day.</li>
          <li><strong>Uber — Surge Pricing:</strong> Supply-demand prediction for 100m × 100m geographic cells. Latency: &lt;50ms pricing decision. Features: current driver locations, active requests, historical patterns, events data.</li>
          <li><strong>AlphaFold — Protein Structure:</strong> 50-year unsolved biology problem. Given amino acid sequence, predict 3D structure. 200 million proteins predicted. Biology research permanently transformed. Required Google-scale TPU infrastructure.</li>
        </ul>
      </section>

      {/* ─── INDUSTRY EXAMPLES ──────────────────────────────────────────── */}
      <section id="industry-examples">
        <h2 style={S.h2}>Industry-Specific ML Examples</h2>
        <ComparisonTable
          headers={["Industry", "ML Use Case", "Algorithm Type", "Infrastructure Scale"]}
          rows={[
            ["Banking", "Fraud detection, credit scoring, AML", "Supervised, GNN for transaction graphs", "Low-medium GPU, high data volume"],
            ["Healthcare", "Radiology AI, drug discovery, clinical NLP", "CNN for imaging, GNN for molecules", "Medium GPU, strict data compliance"],
            ["Manufacturing", "Predictive maintenance, quality control vision", "Anomaly detection, CNN", "Edge AI, small GPU clusters"],
            ["Retail/E-commerce", "Recommendations, demand forecast, pricing", "Collaborative filtering, LSTM, RL", "Medium-large GPU, real-time serving"],
            ["Telecom", "Network optimization, churn prediction, fraud", "Time-series, classification", "Medium GPU, massive log data"],
            ["Government", "Document processing, citizen services, surveillance", "NLP, computer vision", "On-prem (data sovereignty), GPU clusters"],
            ["Autonomous Vehicles", "Perception, planning, control", "CNN, RL, sensor fusion", "Massive GPU training, edge inference"],
          ]}
        />
        <p style={S.p}>
          <strong>India-specific context:</strong> BFSI (Banking, Financial Services, Insurance) has the most mature ML adoption — RBI guidelines, SEBI compliance, and massive transaction volumes have driven ML adoption. In healthcare, institutions like AIIMS and Apollo are piloting computer vision for radiology. In manufacturing, Tata and Mahindra are investing in predictive maintenance.
        </p>
      </section>

      {/* ─── ALGORITHMS ─────────────────────────────────────────────────── */}
      <section id="algorithms">
        <h2 style={S.h2}>Common Algorithms</h2>
        <ComparisonTable
          headers={["Algorithm", "Best For", "GPU Required?", "Training Speed", "Interpretability"]}
          rows={[
            ["Logistic Regression", "Binary classification, tabular", "No", "Very fast", "High"],
            ["Decision Trees / Random Forest", "Tabular data, robust baseline", "Optional", "Fast", "Medium"],
            ["XGBoost / LightGBM", "Tabular, competition winner", "Optional (GPU mode)", "Fast", "Medium"],
            ["CNN", "Images, audio spectrograms", "Yes", "Medium", "Low"],
            ["RNN / LSTM", "Sequential, time series", "Yes", "Slow", "Low"],
            ["Transformer", "Text, multimodal, large scale", "Yes", "Slow–Very slow", "Very Low"],
            ["GNN", "Graph-structured data", "Yes", "Medium", "Low"],
            ["SVM", "Small datasets, high-dimensional", "No", "Slow at scale", "Medium"],
          ]}
        />
      </section>

      {/* ─── MODEL OPTIMIZATION ─────────────────────────────────────────── */}
      <section id="model-optimization">
        <h2 style={S.h2}>Model Optimization</h2>
        <p style={S.p}>
          Optimizing trained models for production — reducing memory, improving speed, lowering cost.
        </p>

        <section id="quantization">
          <h3 style={S.h3}>Quantization, Pruning, Knowledge Distillation</h3>
          <ComparisonTable
            headers={["Technique", "What It Does", "Memory Saving", "Quality Impact", "Tools"]}
            rows={[
              ["FP32 → FP16", "Half precision weights", "2x", "Negligible", "PyTorch autocast"],
              ["FP16 → INT8", "8-bit integer weights", "4x vs FP32", "Minor", "TensorRT, bitsandbytes"],
              ["INT8 → INT4", "4-bit integer weights", "8x vs FP32", "Some loss", "GPTQ, AWQ, bitsandbytes"],
              ["Pruning", "Remove low-importance weights", "Varies", "Depends on ratio", "torch.nn.utils.prune"],
              ["Distillation", "Small model learns from large", "Varies (new model)", "Depends on gap", "DistilBERT, TinyBERT"],
              ["ONNX Export", "Framework-agnostic format", "None", "None", "torch.onnx.export"],
              ["TensorRT", "NVIDIA inference optimization", "Varies", "Minimal", "TensorRT, Triton"],
            ]}
          />
        </section>

        <section id="lora-qlora">
          <h3 style={S.h3}>LoRA, QLoRA and Fine-tuning</h3>
          <p style={S.p}>
            <strong>Full Fine-tuning:</strong> Update all model parameters on new data. Most powerful but most expensive — same compute as training from scratch.
          </p>
          <p style={S.p}>
            <strong>LoRA (Low-Rank Adaptation):</strong> Freeze the original parameters, train only small low-rank matrices (0.1-1% of parameters). Memory and compute drop dramatically. Same quality for many adaptation tasks.
          </p>
          <p style={S.p}>
            <strong>QLoRA (Quantized LoRA):</strong> Quantize the base model to 4-bit + train LoRA adapters in FP16. Extremely memory-efficient. Fine-tuning a 70B model: typically needs 8+ H100s at full precision. With QLoRA: possible on a single H100. Production use: custom domain adaptation, instruction fine-tuning, task-specific specialization.
          </p>
          <ComparisonTable
            headers={["Fine-tuning Method", "Trainable Params", "Memory (70B model)", "Quality", "Cost"]}
            rows={[
              ["Full fine-tuning", "100% (140GB)", "8+ H100s", "Best", "Very high"],
              ["LoRA (r=16)", "~0.1%", "4+ H100s", "Near-full", "Medium"],
              ["QLoRA (4-bit + LoRA)", "~0.1%", "1× H100 (80GB)", "Good", "Low"],
              ["Prompt tuning", "<0.01%", "1× H100", "Moderate", "Minimal"],
            ]}
          />
        </section>
      </section>

      {/* ─── INFRA COST ─────────────────────────────────────────────────── */}
      <section id="infra-cost">
        <h2 style={S.h2}>ML Infrastructure Cost Analysis</h2>
        <ComparisonTable
          title="On-Premises 256-GPU H100 Cluster — Indicative Cost Breakdown"
          headers={["Component", "Specification", "Estimated Cost (USD)", "Lifecycle"]}
          rows={[
            ["GPU Compute", "32× HGX H100 servers (8× H100 each)", "$12-18M", "3-5 years"],
            ["InfiniBand Networking", "NDR 400G switches + cables", "$2-4M", "5-7 years"],
            ["Parallel Storage", "4× Weka nodes, 4.8PB, 300 GB/s", "$1.5-3M", "5 years"],
            ["Power Infrastructure", "UPS, PDU, transformers, wiring", "$500K-1M", "10+ years"],
            ["Cooling (DLC)", "CDUs, chilled water plant, manifolds", "$500K-1.5M", "10+ years"],
            ["DC Space", "Rack space + connectivity", "$200-500K/year", "Annual OpEx"],
            ["Power (OpEx)", "400-450kW IT × PUE 1.3 × Rs 8/kWh", "Rs 3-4 crore/year", "Annual OpEx"],
            ["Personnel", "2-3 ML infra engineers", "$200-400K/year", "Annual OpEx"],
            ["Total CAPEX (hardware)", "", "$17-28M", ""],
            ["Annual OpEx", "", "$600K-1.2M", ""],
          ]}
        />
        <p style={S.p}>
          <strong>Cloud TCO comparison:</strong> 256× H100 on AWS P5 (on-demand): ~$500-600 per hour = $4-5M/month. Reserved (1 year): ~$2.5-3M/month. At sustained utilization for 12+ months, on-premises TCO typically wins. Break-even: typically 18-30 months.
        </p>
        <Callout type="important" title="Cost Analysis Caveat">
          These are indicative numbers — actual costs depend on GPU market pricing (highly variable), your DC space cost, electricity tariff, and team cost. Always run the analysis with actual quotes. Include hidden costs: network connectivity, backup power, disaster recovery.
        </Callout>
      </section>

      {/* ─── CLOUD ML SERVICES ──────────────────────────────────────────── */}
      <section id="cloud-ml-services">
        <h2 style={S.h2}>AI Cloud Services Comparison</h2>
        <ComparisonTable
          headers={["Service", "Provider", "Key Strength", "GPU Options", "Best For"]}
          rows={[
            ["SageMaker", "AWS", "Mature, integrated ecosystem", "P5 (H100), P4d (A100), G5 (A10G)", "AWS-native orgs, managed pipelines"],
            ["Vertex AI", "Google Cloud", "TPU access, BigQuery integration", "A3 (H100), TPU v4/v5, L4", "GCP orgs, TPU workloads, BigQuery ML"],
            ["Azure ML", "Microsoft", "Azure OpenAI integration, enterprise AAD", "NDv5 (H100), NCasT4 (A100)", "Microsoft shops, OpenAI API users"],
            ["Databricks", "Databricks", "Unified data+ML, Delta Lake", "Multi-cloud GPU clusters", "Spark-heavy data teams, lakehouse"],
            ["Snowflake ML", "Snowflake", "In-warehouse ML, SQL interface", "Limited GPU, CPU-focused", "SQL teams, Snowpark for ML"],
            ["OpenShift AI", "Red Hat", "On-prem Kubernetes ML", "NVIDIA GPU Operator", "On-prem K8s, regulated industries"],
          ]}
        />
      </section>

      {/* ─── AI JOB ROLES ───────────────────────────────────────────────── */}
      <section id="ai-job-roles">
        <h2 style={S.h2}>AI/ML Job Roles</h2>
        <ComparisonTable
          headers={["Role", "Primary Focus", "Key Skills", "Typical Background"]}
          rows={[
            ["Data Scientist", "Model development, analysis", "Python, statistics, ML algorithms, visualization", "Statistics, CS, Mathematics"],
            ["ML Engineer", "Production ML systems", "Software engineering, MLOps, APIs, distributed systems", "Software Engineering + ML"],
            ["Data Engineer", "Data pipelines, warehouses", "Spark, Kafka, SQL, ETL, data modeling", "Software Engineering, databases"],
            ["MLOps Engineer", "ML CI/CD, automation", "Kubernetes, Docker, CI/CD, monitoring, model registry", "DevOps + ML"],
            ["AI Infrastructure / Platform Engineer", "GPU clusters, compute infra", "Linux, GPU drivers, networking, CUDA, Kubernetes", "System Admin / HPC + ML"],
            ["AI Researcher", "Novel algorithms, papers", "Deep math, latest literature, experimentation", "PhD in ML/CS typically"],
            ["AI Solutions Architect", "System design, client advisory", "Broad ML + cloud + business", "Senior engineering or consulting"],
          ]}
        />
        <p style={S.p}>
          <strong>Career transition for DC Engineers:</strong> the AI Infrastructure / Platform Engineer role is the fastest growing. A DC background — power, cooling, networking, storage — is directly applicable. Add: GPU cluster management, CUDA ecosystem basics, Kubernetes with GPU operators, distributed training concepts. Demand is very high, supply is very low.
        </p>
      </section>

      {/* ─── AI GOVERNANCE ──────────────────────────────────────────────── */}
      <section id="ai-governance">
        <h2 style={S.h2}>AI Governance and Responsible AI</h2>
        <p style={S.p}>
          AI systems are powerful — and powerful systems can cause harm if not governed properly. AI Governance is a framework that ensures AI systems are ethical, fair, transparent, and compliant.
        </p>
        <ul style={S.ul}>
          <li><strong>Model Bias and Fairness:</strong> ML models inherit the biases of their training data. A credit scoring model that discriminates against minority communities — legal liability and harm. Bias testing is mandatory: check model performance across demographic groups. Tools: Fairlearn (Microsoft), IBM AI Fairness 360, Google What-If Tool.</li>
          <li><strong>Explainability (XAI):</strong> "Why did the model make this prediction?" — in regulated domains (credit, insurance, healthcare), explaining this is legally required. SHAP values (SHapley Additive exPlanations), LIME, Integrated Gradients — methods that explain individual predictions.</li>
          <li><strong>EU AI Act (2024):</strong> World's first comprehensive AI regulation. Risk tiers: Unacceptable risk (ban) → High risk (conformity assessment required) → Limited risk (transparency obligations) → Minimal risk. High-risk AI: credit scoring, employment decisions, healthcare, law enforcement. Compliance: documentation, testing, human oversight, audit trails.</li>
          <li><strong>GDPR and ML:</strong> EU citizens' personal data in the training data → GDPR applies. Right to explanation (Article 22): explanation required for automated decisions. Right to be forgotten: deleting training data — "machine unlearning" is an active research area. Data minimization: collect only necessary data.</li>
          <li><strong>Model Cards:</strong> Introduced by Google — structured documentation for ML models. Training data description, evaluation results, intended use, known limitations, ethical considerations. Becoming best practice — often published publicly on GitHub.</li>
          <li><strong>Auditing:</strong> Regular model audits — checking for performance degradation, re-evaluating bias, verifying regulatory compliance. Audit trail: model decisions, training data lineage, evaluation results — reproducible and reviewable.</li>
        </ul>
        <Callout type="warning" title="Compliance is Not Optional">
          In India too, the DPDP Act (Digital Personal Data Protection) 2023 imposes restrictions on the use of personal data in ML. Banking sector: RBI guidelines set specific explainability requirements for ML models. Healthcare: CDSCO has upcoming medical AI regulations. Design compliance infrastructure from day 1 — retrofitting it later is very expensive.
        </Callout>
      </section>

      {/* ─── ADVANTAGES ─────────────────────────────────────────────────── */}
      <section id="advantages">
        <h2 style={S.h2}>Advantages of Machine Learning</h2>
        <ul style={S.ul}>
          <li><strong>Handles complexity rules can't:</strong> Face recognition, NLP, protein structure — problems too complex for manual rules. ML can solve these.</li>
          <li><strong>Scales automatically:</strong> Once trained, the same model can serve billions of users — one model, all users. Netflix's recommendation model works for all 260M subscribers.</li>
          <li><strong>Continuously improves:</strong> Retrain with new data — the model automatically reflects current patterns.</li>
          <li><strong>Finds patterns humans miss:</strong> Identifying patterns in high-dimensional data that no human analyst would notice.</li>
          <li><strong>Cost reduction at scale:</strong> Replacing manual expert review with automated ML predictions — significant cost reduction at scale.</li>
        </ul>
      </section>

      {/* ─── LIMITATIONS ────────────────────────────────────────────────── */}
      <section id="limitations">
        <h2 style={S.h2}>Limitations</h2>
        <ul style={S.ul}>
          <li><strong>Data hungry:</strong> Complex models need large amounts of labeled data. Labeling is expensive. Data collection and cleaning are often the most expensive part of an ML project.</li>
          <li><strong>Black box:</strong> Deep neural networks — interpretability limited. "Why did the model make this prediction?" — often hard to answer rigorously. Regulatory domains require explainability.</li>
          <li><strong>Distribution shift:</strong> The real world changes — new fraud patterns, pandemic behavior, market shifts — model accuracy degrades. Continuous monitoring and retraining required.</li>
          <li><strong>Adversarial vulnerabilities:</strong> Carefully crafted inputs fool ML models. Spam filters evaded, image classifiers misled. Real security concern.</li>
          <li><strong>Requires specialized expertise:</strong> Data engineering, ML, software engineering, MLOps, infrastructure — multiple specializations simultaneously required.</li>
          <li><strong>Compute cost:</strong> Training large models: expensive. Inference at scale: ongoing cost. Electricity, hardware, engineering time.</li>
        </ul>
      </section>

      {/* ─── BEST PRACTICES ─────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Start simple:</strong> Start with logistic regression or XGBoost. Often surprisingly competitive. Complex neural networks are only justified when simpler models are genuinely insufficient.</li>
          <li><strong>Data quality first:</strong> More important than model choice. 100K clean examples beat 10M noisy ones for most tasks.</li>
          <li><strong>Establish a baseline:</strong> Always compare against a naive baseline. If the ML model isn't significantly better, something is fundamentally wrong.</li>
          <li><strong>Version everything:</strong> Code, data, models, experiments — all versioned. Reproducibility is an engineering requirement.</li>
          <li><strong>Monitor production aggressively:</strong> Model accuracy degrades silently. Active monitoring: prediction distribution, data drift, business metrics.</li>
          <li><strong>Invest in feature engineering:</strong> Apply domain expertise. Talk to domain experts — fraud investigators, doctors, logistics managers.</li>
          <li><strong>Separate training and serving infrastructure:</strong> Different optimization targets, different cost profiles, different scaling patterns.</li>
        </ul>
      </section>

      {/* ─── COMMON MISTAKES ────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Including the test set in training data:</strong> Data leakage. Results become artificially optimistic. Maintain strict separation.</li>
          <li><strong>Blindly trusting offline metrics:</strong> AUC 0.98 in training, the model is useless in production. Always run online A/B tests with business metrics.</li>
          <li><strong>Not handling imbalanced datasets:</strong> 99% negative class → 99% accuracy for a naive model. Class weights, stratified sampling, appropriate metrics (F1, AUC-ROC).</li>
          <li><strong>An ML solution when a simpler solution exists:</strong> A rule-based system or lookup table is enough — ML is overkill.</li>
          <li><strong>Ignoring inference latency:</strong> The heavy model is fine during training but fails against the &lt;100ms requirement in production. Evaluate early.</li>
          <li><strong>No monitoring setup:</strong> Model degradation happens silently. Set up monitoring from day 1, not after problems appear.</li>
        </ul>
      </section>

      {/* ─── SECURITY ───────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Security Considerations</h2>
        <ul style={S.ul}>
          <li><strong>Model theft:</strong> An attacker can reproduce the model by querying the public API. Mitigation: API rate limiting, query monitoring.</li>
          <li><strong>Data poisoning:</strong> Training data deliberately corrupted to manipulate model behavior. Mitigation: robust training, data validation, anomaly detection in training data.</li>
          <li><strong>Adversarial attacks:</strong> Carefully crafted inputs that make the model confidently misclassify. Mitigation: adversarial training, input preprocessing, ensemble methods.</li>
          <li><strong>Model inversion:</strong> Reconstructing training data from model predictions — potential patient data leakage. Mitigation: differential privacy.</li>
          <li><strong>Infrastructure security:</strong> ML training clusters valuable compute — cryptocurrency mining target. Model weights intellectual property — protect access. BMC/IPMI isolation mandatory.</li>
        </ul>
      </section>

      {/* ─── PERFORMANCE OPTIMIZATION ───────────────────────────────────── */}
      <section id="performance-opt">
        <h2 style={S.h2}>Performance Optimization</h2>
        <ul style={S.ul}>
          <li><strong>MFU (Model FLOP Utilization):</strong> Actual FLOPS / theoretical peak FLOPS. 40-60% is good. Below 30% = significant optimization opportunity.</li>
          <li><strong>Mixed precision (BF16):</strong> Default for all training on modern GPUs. 2x faster computation vs FP32, same quality.</li>
          <li><strong>Flash Attention:</strong> Memory-efficient attention — avoids materializing full attention matrix in HBM. Always use for transformer models.</li>
          <li><strong>Gradient accumulation:</strong> Reduce all-reduce frequency. N mini-batches before optimizer step — useful when communication is bottleneck.</li>
          <li><strong>Data loading:</strong> Multiple DataLoader workers, pinned memory, local NVMe cache. Minimize GPU idle time during data loading.</li>
          <li><strong>Continuous batching (vLLM):</strong> New requests join ongoing inference batch — dramatically increases GPU utilization vs naive one-request-at-a-time.</li>
        </ul>
      </section>

      {/* ─── SCALABILITY ────────────────────────────────────────────────── */}
      <section id="scalability">
        <h2 style={S.h2}>Scalability</h2>
        <p style={S.p}>
          <strong>Training FLOPS rough calculation:</strong> Training FLOPS ≈ 6 × N_parameters × N_tokens. 70B model, 1T tokens: 4.2×10²³ FLOPS. H100 at 50% MFU: ~990 TFLOPS. On 256 H100s: ~19 days.
        </p>
        <p style={S.p}>
          <strong>Scaling laws (Kaplan et al. 2020):</strong> Model performance scales predictably with compute × data × parameters. More GPUs + more data + more parameters = reliably better models. Infrastructure scale directly translates to model capability — making AI infrastructure a strategic competitive advantage.
        </p>
        <p style={S.p}>
          <strong>Inference autoscaling:</strong> Kubernetes HPA based on GPU utilization or request queue depth. Scale down during low traffic — especially on cloud — to save cost.
        </p>
      </section>

      {/* ─── COMPARISON TABLES ──────────────────────────────────────────── */}
      <section id="comparison-tables">
        <h2 style={S.h2}>Comparison Tables</h2>
        <ComparisonTable
          title="ML Phase Infrastructure Requirements"
          headers={["ML Phase", "Compute", "Storage", "Networking"]}
          rows={[
            ["Data preparation", "CPU cluster (Spark)", "Object storage TB/s", "Standard 10GbE"],
            ["Training small model", "1-8 GPUs", "Parallel FS GB/s", "Standard 25GbE"],
            ["Training large model", "32-10,000+ GPUs", "Parallel FS TB/s", "InfiniBand 400G"],
            ["Hyperparameter tuning", "Many parallel GPUs", "Same as training", "Same as training"],
            ["Inference (real-time)", "1-N GPUs, CPU possible", "Model weights only", "Standard 25GbE"],
            ["Inference (batch)", "Flexible", "Batch input + output", "Standard"],
          ]}
        />
      </section>

      {/* ─── CASE STUDIES ───────────────────────────────────────────────── */}
      <section id="case-studies">
        <h2 style={S.h2}>Case Studies</h2>
        <ul style={S.ul}>
          <li><strong>AlphaFold (DeepMind):</strong> Protein structure prediction — 50-year unsolved problem. 200 million protein structures predicted. Biology research permanently transformed. Required Google-scale TPU infrastructure. Infrastructure lesson: ML can solve problems that no rules-based system could — but required Google-scale infrastructure.</li>
          <li><strong>Waymo — Autonomous Driving:</strong> Simulation at massive scale — millions of miles for training. Inference: dedicated on-vehicle compute, latency sub-millisecond for safety-critical decisions. Key challenge: geographic expansion = new data collection + new training.</li>
          <li><strong>Ola/Uber Surge Pricing (India):</strong> Real-time demand-supply modeling. Inference: &lt;50ms. 10x normal traffic during festival periods. Indian peculiarities — festivals, monsoon, cricket match schedules — all affect demand patterns differently than Western markets.</li>
          <li><strong>Google DC Cooling (DeepMind RL):</strong> Reinforcement learning for DC cooling optimization. Inputs: sensor readings (temperatures, power consumption, pump speeds). Output: HVAC control setpoints. Result: 40% cooling energy reduction. Deployed in Google's own data centers. Direct overlap with DC engineering domain.</li>
        </ul>
      </section>

      {/* ─── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is the fundamental difference between Machine Learning and traditional programming?</p> <p style={S.p}>Traditional programming: the engineer writes explicit rules → the computer applies the rules to data. ML: the engineer provides data → the algorithm derives the rules automatically. Traditional: appropriate when rules are clearly definable and stable. ML: appropriate when rules are too complex (face recognition), the environment keeps changing (fraud), or personalization is required (recommendations).</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is Overfitting and how do you detect and fix it?</p> <p style={S.p}>Overfitting: the model fits the training data too closely — including the noise. Result: training accuracy is high, validation accuracy is significantly lower. Detection: train/validation loss curves diverge. Fixes: more training data (most effective), regularization (L1, L2, dropout), a simpler model architecture, data augmentation, early stopping.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is a feature store and why is it important?</p> <p style={S.p}>A feature store is a centralized repository for precomputed ML features. It solves training-serving skew — the same features in both training and serving. Online feature store (Redis): low latency for real-time inference. Offline feature store (data warehouse): for training. Feature versioning ensures consistency across model versions.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What does NCCL do in distributed training?</p> <p style={S.p}>NCCL (NVIDIA Collective Communications Library) is a GPU-optimized communication library — it handles collective operations like all-reduce, broadcast, scatter, gather. In distributed training, each GPU computes gradients, and NCCL aggregates these gradients across all GPUs. Natively optimized for InfiniBand and NVLink. NCCL performance directly determines training throughput.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: What is the difference between shadow deployment and canary deployment?</p> <p style={S.p}>Shadow deployment: the new model makes predictions on production traffic but the results aren't shown to users — zero user risk, silent comparison on real traffic. Canary deployment: route 5-10% of actual traffic to the new model, results reach real users — risk is limited, real business metrics are tracked. Sequence: shadow → canary → full rollout.</p>
        </div>
      </section>

      {/* ─── TROUBLESHOOTING ────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          title="Common ML Issues and Resolution"
          headers={["Problem", "Likely Cause", "Diagnosis", "Resolution"]}
          rows={[
            ["Training accuracy high, validation poor", "Overfitting", "Train vs val loss curves diverging", "Regularization, more data, simpler model"],
            ["NaN loss during training", "Learning rate too high / numerical instability", "Check LR, data preprocessing", "Reduce LR, gradient clipping, check for Inf values in data"],
            ["GPU utilization low (<50%)", "Data loading bottleneck", "nvidia-smi dmon, profile DataLoader", "More workers, NVMe cache, efficient data format"],
            ["NCCL timeout / training hang", "Network issue or node failure", "NCCL_DEBUG=INFO, ibping tests", "Check IB fabric, verify all nodes healthy, firewall rules"],
            ["Production accuracy worse than validation", "Training-serving skew", "Compare features in training vs serving", "Feature store, same preprocessing pipeline"],
            ["Inference latency too high", "Model too large, no optimization", "Profile preprocessing vs model vs postprocessing", "Quantization, TensorRT, batching, smaller model"],
            ["Model predictions degraded over time", "Data drift", "KS test or PSI on feature distributions", "Retrain on recent data, check data pipeline"],
          ]}
        />
      </section>

      {/* ─── GLOSSARY ───────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["Accuracy", "Correct predictions / total predictions. Misleading on imbalanced datasets."],
            ["Backpropagation", "Training algorithm computing gradients through the model layer by layer."],
            ["Batch Size", "Examples processed in one training step."],
            ["Canary Deployment", "Route small % traffic to new model; expand if metrics stable."],
            ["Cross-Validation", "K-fold dataset splitting for reliable performance estimate."],
            ["Data Drift", "Real-world data distribution shifting from training distribution."],
            ["Data Leakage", "Future or test information accidentally included in training."],
            ["DeepSpeed", "Microsoft distributed training library — ZeRO optimizer."],
            ["DDP", "PyTorch DistributedDataParallel — data parallelism across GPUs."],
            ["Epoch", "One complete pass through training data."],
            ["Feature", "Input variable used by model for prediction."],
            ["Feature Store", "Centralized repository for precomputed ML features."],
            ["FSDP", "Fully Sharded Data Parallel — shards params/grads/optimizer across GPUs."],
            ["Gradient Descent", "Optimization algorithm minimizing loss by updating parameters."],
            ["Horovod", "Distributed training library using ring all-reduce."],
            ["Hyperparameter", "Configuration set before training: learning rate, batch size."],
            ["Label", "Correct output / ground truth in training data."],
            ["LoRA", "Low-Rank Adaptation — parameter-efficient fine-tuning technique."],
            ["Megatron-LM", "NVIDIA library for tensor + pipeline parallelism."],
            ["MLOps", "Engineering practices for ML model lifecycle automation."],
            ["NCCL", "NVIDIA Collective Communications Library for GPU distributed training."],
            ["Overfitting", "Model memorizes training data — poor generalization to new data."],
            ["QLoRA", "Quantized LoRA — 4-bit base model + LoRA adapters for memory-efficient fine-tuning."],
            ["Quantization", "Reducing model weight precision (FP16 → INT8 → INT4) for inference efficiency."],
            ["Shadow Deployment", "New model runs on production traffic without exposing results to users."],
            ["Training-Serving Skew", "Mismatch between features used in training vs production serving."],
            ["Transfer Learning", "Using pre-trained model weights as starting point for new task."],
            ["Underfitting", "Model too simple — poor performance even on training data."],
            ["Validation Set", "Held-out data for hyperparameter tuning during development."],
            ["ZeRO", "Zero Redundancy Optimizer (DeepSpeed) — shards optimizer/gradient/params across GPUs."],
          ]}
        />
      </section>

      {/* ─── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Machine Learning automatically learns patterns from data instead of explicitly programmed rules — this fundamental shift makes practical solutions possible for complex domains, high-scale applications, and personalization.</li>
          <li>The core training loop of ML is matrix multiplication operations — this is exactly why GPUs are essential. The same computation on CPU is 60-100x slower than on GPU.</li>
          <li>Data quality matters more than algorithm choice. 100K clean examples beat 10M noisy ones. Invest in the data pipeline.</li>
          <li>A Feature Store prevents training-serving skew — the most common failure mode in production ML systems. Implement it from day 1.</li>
          <li>Distributed training engineering — NCCL, DDP, FSDP, ZeRO, DeepSpeed — is complex but necessary for large models. The networking fabric (InfiniBand) directly determines training throughput.</li>
          <li>MLOps isn't an optional nicety — it's the foundation of production ML. CI/CD, experiment tracking, shadow deploy, canary, rollback — all of these are mandatory in production-grade ML.</li>
          <li>Production ML isn't a single deployment event — it's a continuous loop: data → training → validation → deployment → monitoring → retraining. If even one stage is weak, the whole system suffers.</li>
          <li>Model optimization — quantization, LoRA, QLoRA — has democratized large model deployment. A 70B model that once needed 8 H100s can now be fine-tuned on a single H100 with QLoRA.</li>
          <li>AI Governance is no longer a technical luxury — it's a regulatory requirement. EU AI Act, GDPR, India's DPDP Act — design for compliance from day 1.</li>
          <li>For DC engineers: ML infrastructure engineering is the fastest growing specialization in the AI field. A background in power, cooling, networking, and storage is directly applicable. Add GPU cluster management + the CUDA ecosystem + Kubernetes, and your career trajectory improves dramatically.</li>
        </ul>
      </section>

    </article>
  );
}
