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
          Machine Learning (ML) ek approach hai jisme computers explicitly programmed rules follow karne ki bajay data se patterns seekhte hain. Traditional programming mein engineer rules likhta hai — computer un rules ko data pe apply karta hai. ML mein yeh ulta hota hai: engineer data deta hai — computer khud rules derive karta hai.
        </p>
        <p style={S.p}>
          Yeh distinction simple lagti hai, lekin infrastructure implications massive hain. Rules-based systems ek laptop pe chal sakte hain. Production ML systems — jo real organizations run karte hain — GPU clusters, petabyte-scale storage, high-throughput networking, aur continuous deployment pipelines maangti hain.
        </p>
        <Callout type="important" title="Pichle Article se Continuity">
          Previous article mein AI Infrastructure ka complete ecosystem dekha — GPU clusters, NVLink, InfiniBand, liquid cooling. Is article mein us infrastructure ka primary consumer samjhenge: Machine Learning workloads jo us hardware pe actually chalte hain.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ────────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Samajhna ki ML training jobs itni power aur cooling kyun consume karti hain, aur inference serving ke specific infrastructure requirements kya hain.</li>
          <li><strong>IT Infrastructure Engineers:</strong> ML pipelines ke storage, networking, aur compute requirements jo standard enterprise workloads se fundamentally different hain.</li>
          <li><strong>Cloud Engineers:</strong> ML training clusters design karna, GPU instance selection, aur managed ML services (SageMaker, Vertex AI, Azure ML) ka infrastructure.</li>
          <li><strong>AI/MLOps Engineers:</strong> End-to-end ML pipeline ka deeper infrastructure understanding — data ingestion se model serving tak.</li>
          <li><strong>System Administrators:</strong> GPU server management, CUDA ecosystem, aur ML job scheduling (Slurm, Kubernetes).</li>
          <li><strong>Technical Managers aur CTOs:</strong> ML infrastructure investments ko justify karna aur evaluate karna.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ────────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>Machine Learning actually kaise kaam karta hai — mathematics ki zaroorat ke bina clear engineering mental model</li>
          <li>Supervised, Unsupervised, Semi-supervised, aur Reinforcement Learning — real use cases ke saath</li>
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
          <li><strong>Current:</strong> Machine Learning — concepts, workflow, aur infrastructure requirements</li>
          <li><strong>Next:</strong> <TopicLink slug="deep-learning" variant="inline" /> — neural networks, architectures, transformers</li>
          <li><strong>Related:</strong> <TopicLink slug="generative-ai" variant="inline" />, <TopicLink slug="llm" variant="inline" />, <TopicLink slug="ai-gpu" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ───────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          Pichle article mein ek specific example use kiya tha: AlexNet. 2012 mein do NVIDIA GTX 580 GPUs pe train hua, 3GB memory combined, aur training mein kaafi samay laga. Phir bhi usne ImageNet competition aise jeeta ki puri research community ka direction change ho gayi.
        </p>
        <p style={S.p}>
          Us moment se pehle, computer vision mein dominant approach thi: engineers manually features define karte the — "edge yahan hai, texture woh hai, shape aise dikhti hai" — aur phir classifier un predefined features pe kaam karta tha. AlexNet ne kuch alag kiya. Usne raw pixels se seedha classification sikhi. Kisi ne manually nahi bataya ki "yeh corner hai." Network ne khud data dekha, patterns identify kiye, aur representation banayi jo classification ke liye useful thi.
        </p>
        <p style={S.p}>
          Yahi Machine Learning ka core idea hai: data se automatically learn karna. Lekin yeh idea ek massive infrastructure dependency create karta hai. Data chahiye (bahut zyada). Compute chahiye (specialized, expensive). Storage chahiye (high-throughput, parallel). Aur ek deployment pipeline chahiye jo trained model ko production mein le jaaye aur wahan stable rakhe.
        </p>
      </section>

      {/* ─── WHAT IS ML ─────────────────────────────────────────────────── */}
      <section id="what-is-ml">
        <h2 style={S.h2}>What is Machine Learning?</h2>
        <p style={S.p}>
          Formally: Machine Learning ek field of computer science hai jisme algorithms aise design kiye jaate hain jo experience (data) se automatically improve karte hain without being explicitly programmed.
        </p>
        <p style={S.p}>
          Ek concrete example se samjhte hain. Email spam filter:
        </p>
        <p style={S.p}>
          <strong>Traditional approach:</strong> Engineer manually rules likhta — "Free money" contain karta hai → spam. Subject mein excessive capitals → spam. Problem: spammers in rules ko quickly bypass karte hain. Engineer baar baar naye rules add karta rehta hai, rule set brittle ho jaata hai.
        </p>
        <p style={S.p}>
          <strong>ML approach:</strong> 100,000 labeled emails collect karo — "spam" ya "not spam" tagged. ML algorithm patterns extract karta hai automatically — word combinations, sender patterns, timing, link density — without engineer explicitly defining them. Naye examples pe model apne seekhe hue patterns apply karta hai.
        </p>
        <Callout type="important" title="Key Distinction">
          Ek traditional program ek fixed function hai: Input → [Fixed Rules] → Output. Ek ML program ek learnable function hai: Input + Data → [Learning Algorithm] → Learned Model → Output. Woh "learned model" — woh sab kuch hai jo training process generate karta hai.
        </Callout>
      </section>

      {/* ─── WHY ML EXISTS ──────────────────────────────────────────────── */}
      <section id="why-ml-exists">
        <h2 style={S.h2}>Why Machine Learning Exists</h2>
        <p style={S.p}>
          Traditional programming itne saalon se kaam kar rahi thi — toh ML kyun chahiye? Answer teen problems mein hai jinhe traditional programming solve nahi kar sakti:
        </p>
        <ul style={S.ul}>
          <li><strong>Complexity jahan rules manually define karna impossible hai:</strong> Face recognition, natural language understanding, medical image diagnosis. Koi bhi engineer yeh rules sufficiently define nahi kar sakta. ML millions of labeled examples se automatically seekh sakta hai.</li>
          <li><strong>Scale jahan manual rules maintain karna economically infeasible hai:</strong> Amazon pe crores of daily transactions. Fraudsters continuously naye patterns develop karte hain. Manual rule updates practically impossible hain. ML system continuously new patterns absorb kar sakta hai.</li>
          <li><strong>Personalization jahan ek rule sab pe apply nahi hoti:</strong> Netflix ke paas 260M+ subscribers hain. Har subscriber ki preferences different hain. ML individual behavior patterns learn karke per-user recommendations generate karta hai — at scale.</li>
        </ul>
      </section>

      {/* ─── HISTORY ────────────────────────────────────────────────────── */}
      <section id="history">
        <h2 style={S.h2}>History and Evolution</h2>
        <p style={S.p}>
          ML ka evolution AI Infrastructure ke evolution se directly linked hai. Dono simultaneously develop hue — ek ne doosre ko possible banaya.
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
          Sab kuch samajhne ke liye ek simple mental model: <strong>ML ek function approximation problem hai.</strong>
        </p>
        <p style={S.p}>
          Imagine karo ek function f hai jo inputs se outputs map karta hai. Yahan f woh "true function" hai jo yeh decision correctly karta hai — lekin hum directly access nahi kar sakte. ML kya karta hai: labeled examples se ek approximation f̂ learn karta hai jo f ke jitna close possible ho.
        </p>
        <p style={S.p}>
          Yeh kaise hota hai concretely: (1) Labeled data collect karo. (2) Ek parameterized model choose karo — jaise neural network. (3) Loss define karo — model output aur actual output ka difference. (4) Gradient descent se parameters adjust karo taaki loss minimize ho. (5) Yeh process millions ya billions of times repeat karo.
        </p>
        <Callout type="maintenance" title="Infrastructure Perspective">
          Step 4 — optimization — woh step hai jo GPU compute maangta hai. Gradient computation mathematically matrix multiplication hai — GPU ki sweet spot. Step 1 — data collection — parallel file systems aur high-throughput storage maangta hai. Trained model production mein serve karna — inference — latency-optimized infrastructure maangta hai.
        </Callout>
      </section>

      {/* ─── ML WORKFLOW ────────────────────────────────────────────────── */}
      <section id="ml-workflow">
        <h2 style={S.h2}>Machine Learning Workflow</h2>
        <p style={S.p}>
          Real ML projects ek simple "data in, model out" se bahut zyada complex hote hain. Production ML workflow:
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Problem Definition:</strong> Clear karo ki kya predict karna chahte ho. "AI improve karo" ek problem statement nahi hai. Input defined, output defined, business value clear.</li>
          <li><strong>Data Collection aur Ingestion:</strong> Data kahan hai? Databases, APIs, logs, sensors. Pipelines build karo. Infrastructure: Kafka for streaming, ETL for batch, S3/GCS for raw data lake.</li>
          <li><strong>Data Preparation aur Cleaning:</strong> Missing values, duplicates, inconsistent formats, outliers. Data scientists typically 60-80% time yahan spend karte hain.</li>
          <li><strong>Feature Engineering:</strong> Raw data → ML-ready representation. Date column se "day of week," "is holiday" derive karna. Text se numerical vectors.</li>
          <li><strong>Model Selection aur Training:</strong> Algorithm choose karo, GPU infrastructure setup karo, training run karo. Large models: distributed training across multiple GPUs.</li>
          <li><strong>Validation aur Evaluation:</strong> Test set pe evaluate karo. Accuracy, precision, recall, F1, AUC-ROC. Business metrics se correlate karo.</li>
          <li><strong>Hyperparameter Tuning:</strong> Multiple runs compare karo. Grid search, random search, Bayesian optimization. Each trial = significant compute.</li>
          <li><strong>Model Deployment:</strong> REST API, batch prediction, ya real-time streaming. Inference servers, model registries, A/B testing.</li>
          <li><strong>Monitoring aur Maintenance:</strong> Production mein accuracy track karo. Data drift detect karo. Retrain trigger karo.</li>
          <li><strong>Retraining:</strong> Continuous loop — ek single deployment event nahi.</li>
        </ol>

        <section id="ml-lifecycle">
          <h3 style={S.h3}>Complete ML Lifecycle</h3>
          <Figure caption="ML Lifecycle: Collect → Clean → Train → Validate → Deploy → Monitor → Retrain → Retire — a continuous loop, not a one-time event">
            <MlLifecycleDiagram />
          </Figure>
          <p style={S.p}>
            <strong>Retire</strong> step often overlooked hota hai. Models indefinitely production mein nahi chalte. Jab better model available ho ya business use case sunset ho, model gracefully retire karna padta hai — endpoints disable karo, storage cleanup karo, audit trail maintain karo.
          </p>
        </section>
      </section>

      {/* ─── TYPES OF ML ────────────────────────────────────────────────── */}
      <section id="types-of-ml">
        <h2 style={S.h2}>Types of Machine Learning</h2>

        <section id="supervised">
          <h3 style={S.h3}>Supervised Learning</h3>
          <p style={S.p}>
            Sabse common type. <strong>Labeled data</strong> se seekhna — har training example mein input aur correct output dono. Teacher ke saath padhai karna jo har answer ke liye correct solution batata hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Image classification:</strong> Input = image, Output = "cat/dog/car"</li>
            <li><strong>Fraud detection:</strong> Input = transaction details, Output = "fraud/legitimate"</li>
            <li><strong>Medical diagnosis:</strong> Input = X-ray image, Output = "tumor present/absent"</li>
            <li><strong>Price prediction:</strong> Input = house features, Output = estimated price</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: Labeled datasets bahut expensive hain — human annotation cost karta hai. Scale AI, Toloka jaise services annotation ke liye. Large supervised datasets: ImageNet (14M images), Common Crawl (petabytes of text).
          </p>
        </section>

        <section id="unsupervised">
          <h3 style={S.h3}>Unsupervised Learning</h3>
          <p style={S.p}>
            <strong>Unlabeled data</strong> se seekhna — algorithm apne aap data mein hidden structure dhundta hai. Bina teacher ke apne aap patterns dhundna.
          </p>
          <ul style={S.ul}>
            <li><strong>Customer segmentation:</strong> Purchase behavior ke based pe groups — without pre-defining groups</li>
            <li><strong>Anomaly detection:</strong> Network traffic mein unusual patterns — without labeled anomalies</li>
            <li><strong>Topic modeling:</strong> Thousands of documents mein main topics identify karna automatically</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: Unlabeled data much easier aur cheaper to collect. Log data, sensor data, web click streams — yeh sab naturally unlabeled hote hain aur excellent unsupervised learning candidates hain.
          </p>
        </section>

        <section id="semi-supervised">
          <h3 style={S.h3}>Semi-Supervised Learning</h3>
          <p style={S.p}>
            <strong>Thodi labeled + bahut zyada unlabeled</strong> data ka combination. Real world mein labeled data scarce hoti hai. Medical images: radiology scans toh bahut hain, lekin har scan pe radiologist annotation time-consuming aur expensive hai. Semi-supervised: 1,000 labeled scans + 1,000,000 unlabeled scans se effective model train karo. Google Photos — kuch tagged photos + massive unlabeled corpus se person recognition improve karna.
          </p>
        </section>

        <section id="reinforcement">
          <h3 style={S.h3}>Reinforcement Learning</h3>
          <p style={S.p}>
            Labeled data se bilkul alag paradigm. RL mein ek <strong>agent</strong> ek <strong>environment</strong> mein actions leta hai aur <strong>rewards ya penalties</strong> receive karta hai. Trial and error se optimal behavior seekhna.
          </p>
          <ul style={S.ul}>
            <li><strong>AlphaGo:</strong> Go game mein world champion beat kiya. AlphaStar: StarCraft 2 grandmaster level.</li>
            <li><strong>Data Center cooling:</strong> Google DeepMind ne RL use kiya DC cooling optimize karne ke liye — 40% energy reduction achieved.</li>
            <li><strong>Recommendation systems:</strong> YouTube, TikTok — content recommend karna jo watch time maximize kare.</li>
          </ul>
          <p style={S.p}>
            Infrastructure requirement: RL training particularly expensive hai — agent ko environment ke saath millions of interactions chahiye. Simulation environments at scale run karna padta hai — thousands of parallel simulations.
          </p>
        </section>
      </section>

      {/* ─── ML VS DL VS GENAI ──────────────────────────────────────────── */}
      <section id="ml-vs-dl-vs-genai">
        <h2 style={S.h2}>ML vs Deep Learning vs Generative AI</h2>
        <p style={S.p}>
          Yeh terms often confusingly interchange hote hain. Clear karte hain:
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
          Yeh nested circles hain — sab ML hain, sab AI hain, lekin sab AI ML nahi hain. Traditional ML (decision trees, SVM) small datasets pe bhi kaam karta hai. Deep Learning typically large datasets aur GPUs required karta hai. GenAI massive compute aur specialized infrastructure chahti hai — previous article mein jo infrastructure describe hua, woh primarily GenAI ke liye hai.
        </p>
      </section>

      {/* ─── ML MODELS ──────────────────────────────────────────────────── */}
      <section id="ml-models">
        <h2 style={S.h2}>ML Models — Kya Hota Hai Ek Model?</h2>
        <p style={S.p}>
          Technically: ek ML model ek mathematical function hai with learned parameters. Neural network model concretely: billions of floating point numbers (weights aur biases) jo layers mein organized hain. GPT-3: 175 billion parameters = roughly 350GB memory at FP16 precision.
        </p>
        <ComparisonTable
          title="Model Size aur Infrastructure Requirements"
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
          Modern models typically saved hote hain PyTorch <code style={S.code}>.pt</code> files, TensorFlow SavedModel, ONNX (cross-framework), ya HuggingFace safetensors format mein.
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
          <strong>Labels:</strong> Training data mein correct answers. "Spam" ya "not spam." Labels woh hain jo model seekhna chahta hai predict karna. Label quality directly model quality determine karti hai — noisy labels model confusing patterns sikh sakta hai.
        </p>
        <p style={S.p}>
          <strong>Features:</strong> Input variables jo model prediction ke liye use karta hai. Email spam ke liye: word count, sender domain, link count, subject length, time sent. House price ke liye: square footage, location, age, bedrooms. Feature selection aur engineering often model quality ko algorithm choice se zyada affect karta hai.
        </p>
      </section>

      {/* ─── DATASET PREPARATION ────────────────────────────────────────── */}
      <section id="dataset-preparation">
        <h2 style={S.h2}>Dataset Preparation</h2>
        <p style={S.p}>
          "Garbage in, garbage out." Dataset quality directly model quality determine karti hai — compute amount se zyada.
        </p>
        <p style={S.p}>
          <strong>Data splitting:</strong> Training set (70-80%): model in examples pe train hota hai. Validation set (10-15%): hyperparameter tuning aur early stopping ke liye. Test set (10-15%): final evaluation — training complete hone ke baad ek baar evaluate karo.
        </p>
        <p style={S.p}>
          <strong>Class imbalance:</strong> Fraud detection: 99.9% transactions legitimate, 0.1% fraud. Agar model sirf "legitimate" predict kare toh 99.9% accuracy — lekin useless. Fix: oversampling minority class, undersampling majority, class weights in loss function.
        </p>
        <Callout type="warning" title="Data Leakage — Sabse Costly Mistake">
          Future information jo prediction time pe available nahi hogi accidentally features mein include ho jaana. Credit card fraud model mein "chargeback received" feature include karna — prediction fraud hone se pehle karna hai, jab chargeback exist nahi karta. Yeh artificially high training accuracy create karta hai jo production mein completely disappear ho jaati hai.
        </Callout>
      </section>

      {/* ─── DATA QUALITY ───────────────────────────────────────────────── */}
      <section id="data-quality">
        <h2 style={S.h2}>Data Quality</h2>
        <ul style={S.ul}>
          <li><strong>Schema validation:</strong> Expected data types, ranges, allowed values. Automated checks jo new data batches validate karein before training.</li>
          <li><strong>Distribution monitoring:</strong> Real-world data distribution continuously shift hoti hai — "data drift." Statistical tests (Kolmogorov-Smirnov, Population Stability Index) distribution shifts detect karte hain.</li>
          <li><strong>Label quality:</strong> Inter-annotator agreement metrics (Cohen's Kappa) label consistency measure karte hain.</li>
          <li><strong>Data freshness:</strong> Stale training data se trained models stale predictions karte hain. 2019 ka credit data 2024 mein probably outdated — pandemic se consumer behavior permanently changed.</li>
        </ul>
      </section>

      {/* ─── FEATURE ENGINEERING ────────────────────────────────────────── */}
      <section id="feature-engineering">
        <h2 style={S.h2}>Feature Engineering</h2>
        <p style={S.p}>
          Raw data ko ML models ke liye useful representation mein transform karna. Yeh often model quality ka biggest driver hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Temporal features:</strong> Timestamp se extract karo — day of week, hour of day, time since last event, rolling averages.</li>
          <li><strong>Interaction features:</strong> "Amount / Account_Average_Amount" — Rs. 100,000 transaction ek account se jo normally Rs. 500 karta hai — much more suspicious.</li>
          <li><strong>Text features:</strong> TF-IDF ya transformer embeddings (BERT, Sentence-BERT) se dense vector representations. Similar words ke vectors automatically close hote hain.</li>
          <li><strong>Embeddings:</strong> High-cardinality categoricals ke liye — product IDs, user IDs, location names. Similar entities ke embeddings automatically similar ho jaate hain.</li>
        </ul>
      </section>

      {/* ─── FEATURE STORE ──────────────────────────────────────────────── */}
      <section id="feature-store">
        <h2 style={S.h2}>Feature Store Architecture</h2>
        <p style={S.p}>
          Feature Store centralized repository hai precomputed ML features ke liye. Do critical problems solve karta hai:
        </p>
        <ul style={S.ul}>
          <li><strong>Training-serving skew:</strong> Training mein features alag compute hote hain serving se — Feature store ensure karta hai ki same features dono jagah use hote hain.</li>
          <li><strong>Feature reuse:</strong> Ek team ki computed features doosri team ke models bhi use kar sakti hain without recomputation.</li>
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
            <strong>Feature Versioning:</strong> Features change hote hain — yeh versioned hone chahiye. Ek model v2 feature definition pe trained tha, serving v1 feature serve kar rahi hai — silent accuracy loss. Feature store versioning ensures ki training aur serving same feature definition use karein.
          </p>
        </section>
      </section>

      {/* ─── MODEL TRAINING ─────────────────────────────────────────────── */}
      <section id="model-training">
        <h2 style={S.h2}>Model Training — Infrastructure Deep Dive</h2>
        <p style={S.p}>
          Training phase woh hai jahan infrastructure investment justify hoti hai. Ek single training step:
        </p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li>Batch of training examples load karo GPU memory mein (data loading)</li>
          <li>Forward pass: input → model → prediction</li>
          <li>Loss compute karo: prediction vs actual label</li>
          <li>Backward pass (backpropagation): loss se gradients compute karo</li>
          <li>Parameter update: gradients use karke parameters adjust karo (optimizer step)</li>
          <li>Next batch, repeat — millions of times</li>
        </ol>
        <p style={S.p}>
          Steps 2-4 matrix operations hain — GPU ka kaam. Step 1 storage bandwidth-bound hai. Efficient training mein data loading GPU compute ke concurrent chalti hai (prefetching).
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
            <strong>NCCL (NVIDIA Collective Communications Library):</strong> GPU-optimized communication library hai jo all-reduce operations handle karta hai. InfiniBand aur NVLink ke liye natively optimized. Distributed training ka backbone. NCCL performance directly training throughput determine karta hai — poor NCCL bandwidth = GPUs sit idle waiting for gradient sync.
          </p>
          <Callout type="best-practice" title="Distributed Training Best Practice">
            Always run NCCL bandwidth test (<code style={S.code}>nccl-tests all-reduce</code>) before starting any large training run. Ek misconfigured fabric ya single slow link poora cluster slow kar sakta hai. Non-blocking InfiniBand fat-tree topology mandatory hai large-scale training ke liye.
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
          <strong>Bias-Variance tradeoff:</strong> High bias (underfitting) = model too simple, training data pe bhi poorly performs — fix: more complex model, more features. High variance (overfitting) = training pe great, new data pe poor — fix: more data, regularization, simpler model, dropout.
        </p>
      </section>

      {/* ─── HYPERPARAMETER TUNING ──────────────────────────────────────── */}
      <section id="hyperparameter-tuning">
        <h2 style={S.h2}>Hyperparameter Tuning</h2>
        <p style={S.p}>
          Model parameters training ke dauran learned hote hain. Hyperparameters training ke pehle set kiye jaate hain — learning rate, batch size, layer count, regularization strength.
        </p>
        <ul style={S.ul}>
          <li><strong>Grid search:</strong> Sab possible combinations try karo. Simple lekin exponentially expensive.</li>
          <li><strong>Random search:</strong> Randomly sample from hyperparameter space — often more efficient than grid search.</li>
          <li><strong>Bayesian optimization:</strong> Prior trials ke results use karke next trial choose karo intelligently. Most efficient. Tools: Optuna, Ray Tune, W&B Sweeps.</li>
        </ul>
        <p style={S.p}>
          Infrastructure: hyperparameter tuning = many parallel training runs. Ray Tune ya similar frameworks efficiently parallelize across GPU cluster.
        </p>
      </section>

      {/* ─── MODEL DEPLOYMENT ───────────────────────────────────────────── */}
      <section id="model-deployment">
        <h2 style={S.h2}>Model Deployment</h2>
        <ul style={S.ul}>
          <li><strong>Real-time inference:</strong> Single request → immediate prediction. REST API ya gRPC endpoint. Latency SLA typically &lt;100ms. NVIDIA Triton, TorchServe, vLLM.</li>
          <li><strong>Batch prediction:</strong> Large batch collect karo, ek saath process karo. Throughput over latency. Kubernetes Jobs, AWS Batch. Cost-effective — off-peak scheduling.</li>
          <li><strong>Edge deployment:</strong> Model device pe hi run karta hai. Network not required. Privacy better. Constraints: model size aur compute severely limited. Quantization, pruning, distillation required.</li>
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
          MLOps (Machine Learning Operations) ML model lifecycle ka engineering aur automation hai — data collection se lekar model training, deployment, monitoring aur retraining tak. Bina MLOps ke: models manually deploy hote hain, reproducibility nahi hoti, production failures detect karne mein bahut samay lagta hai.
        </p>
        <p style={S.p}>
          MLOps ke saath: CI/CD pipelines automatically models validate aur deploy karti hain, experiment tracking reproducibility ensure karta hai, monitoring data drift aur model degradation detect karta hai.
        </p>
        <Figure caption="MLOps CI/CD Pipeline: Code commit through shadow deployment, canary release, to full production — with automated rollback">
          <MlopsPipelineDiagram />
        </Figure>

        <section id="mlops-cicd">
          <h3 style={S.h3}>CI/CD, Shadow Deploy, Canary, Rollback</h3>
          <ul style={S.ul}>
            <li><strong>CI/CD for ML:</strong> Code change → automated unit tests → integration tests → model training → validation → staging → production. GitHub Actions, GitLab CI, Jenkins — same tools as software, ML-specific steps added.</li>
            <li><strong>Experiment Tracking:</strong> Weights &amp; Biases, MLflow — har training run ka: hyperparameters, metrics, artifacts, code version. Reproducibility aur comparison ke liye.</li>
            <li><strong>Shadow Deployment:</strong> New model production traffic pe predictions karta hai, lekin results actual users ko nahi dikhate. Real traffic pe predictions compare karo silently. Zero user risk. Infrastructure: production request duplicate karo shadow model ko bhi.</li>
            <li><strong>Canary Deployment:</strong> 5-10% traffic naye model ko route karo. Business metrics monitor karo. Agar stable: gradually increase. Agar degraded: rollback immediately. Safer than full cutover.</li>
            <li><strong>Rollback:</strong> Model performance degrade ho ya drift detect ho — previous version pe revert karo. Model registry se previous version load karo, traffic route back karo. Rollback procedure documented aur tested hona chahiye pehle se.</li>
            <li><strong>Model Versioning:</strong> Training code, dataset version, hyperparameters, environment — sab versioned. Ek specific model version exactly reproduce karna possible hona chahiye 6 months later.</li>
          </ul>
        </section>
      </section>

      {/* ─── ML INFRA ARCHITECTURE ──────────────────────────────────────── */}
      <section id="ml-infra-architecture">
        <h2 style={S.h2}>ML Infrastructure Architecture</h2>
        <p style={S.p}>
          Ab sab pieces ko ek complete picture mein dekho:
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
            Physical infrastructure sabse neeche hai — aur sabse critical hai. Ek organization jo GPU clusters afford kar sakti hai lekin cooling upgrade nahi kar sakti, woh upper layers ke potential ko waste kar rahi hai. Enterprise AI stack ka har layer previous layer pe depend karta hai — koi shortcut nahi.
          </p>
        </section>
      </section>

      {/* ─── GPUS IN ML ─────────────────────────────────────────────────── */}
      <section id="gpus-in-ml">
        <h2 style={S.h2}>GPUs in Machine Learning</h2>
        <p style={S.p}>
          Neural network training = matrix multiplication at scale. Ek single transformer attention operation: multiple large matrix multiplications simultaneously. GPU ke thousands of CUDA cores yeh massively parallel karte hain. CPU pe same operation GPU se 60-100x slower hai.
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
          <strong>CUDA ecosystem dominance:</strong> NVIDIA ki dominance sirf hardware nahi — software ecosystem hai. CUDA toolkit, cuDNN (deep learning primitives), cuBLAS (linear algebra), NCCL (collective communications) — yeh sab PyTorch aur TensorFlow ke niche directly use hote hain. AMD ka ROCm alternative existing hai lekin ecosystem maturity abhi bhi gap hai.
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
          Storage throughput requirements: 256 H100 cluster ke liye minimum 43+ GB/s sustained read throughput required. Most parallel FS deployments target 100-300+ GB/s for a 256-GPU cluster. Standard NAS (NFS server) at 5-10 GB/s — insufficient for large GPU clusters.
        </p>
        <p style={S.p}>
          <strong>Checkpoint strategy:</strong> 70B model checkpoint = ~140GB at FP16. Async checkpointing: write to NVMe first, background copy to parallel FS — training pause minimize karo. Retain last N checkpoints only — full history storage impractical.
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
          ML sirf DC pe run nahi karta — ML DC ko better operate karne mein help karta hai. Yeh dual relationship important hai:
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
        <Callout type="best-practice" title="DC Engineer ke Liye Practical ML">
          DCIM systems mein ML integration increasingly common hai. Sensor data se anomaly detection, predictive maintenance, aur capacity forecasting — yeh sab production DC operations mein apply ho rahe hain. DC engineer jo ML samajhta hai woh in tools ko better deploy aur tune kar sakta hai.
        </Callout>
      </section>

      {/* ─── ENTERPRISE ML PIPELINE ─────────────────────────────────────── */}
      <section id="enterprise-ml-pipeline">
        <h2 style={S.h2}>Enterprise ML Pipeline</h2>
        <p style={S.p}>
          Ek real enterprise mein ML kaise end-to-end chalta hai:
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
          <strong>India-specific context:</strong> BFSI (Banking, Financial Services, Insurance) ML adoption sabse mature hai — RBI guidelines, SEBI compliance, aur massive transaction volumes ne ML adoption drive ki hai. Healthcare mein AIIMS aur Apollo jaise institutions computer vision for radiology piloting kar rahe hain. Manufacturing mein Tata, Mahindra — predictive maintenance pe invest kar rahe hain.
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
          Trained models ko production ke liye optimize karna — memory reduce karo, speed improve karo, cost kam karo.
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
            <strong>Full Fine-tuning:</strong> Sab model parameters update karo on new data. Most powerful lekin most expensive — same compute as training from scratch.
          </p>
          <p style={S.p}>
            <strong>LoRA (Low-Rank Adaptation):</strong> Original parameters freeze karo, sirf small low-rank matrices train karo (0.1-1% of parameters). Memory aur compute dramatically reduce. Same quality for many adaptation tasks.
          </p>
          <p style={S.p}>
            <strong>QLoRA (Quantized LoRA):</strong> Base model 4-bit quantize karo + LoRA adapters FP16 mein train karo. Extremely memory-efficient. 70B model fine-tuning: typically 8+ H100s required at full precision. QLoRA se: single H100 pe possible. Production use: custom domain adaptation, instruction fine-tuning, task-specific specialization.
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
          Yeh indicative numbers hain — actual costs GPU market pricing pe depend karte hain (highly variable), your DC space cost, electricity tariff, aur team cost pe. Analysis hamesha actual quotes ke saath karo. Include hidden costs: network connectivity, backup power, disaster recovery.
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
          <strong>DC Engineer ke liye career transition:</strong> AI Infrastructure / Platform Engineer role fastest growing hai. DC background — power, cooling, networking, storage — directly applicable hai. Add: GPU cluster management, CUDA ecosystem basics, Kubernetes with GPU operators, distributed training concepts. Demand bahut zyada hai, supply bahut kam.
        </p>
      </section>

      {/* ─── AI GOVERNANCE ──────────────────────────────────────────────── */}
      <section id="ai-governance">
        <h2 style={S.h2}>AI Governance and Responsible AI</h2>
        <p style={S.p}>
          AI systems powerful hain — aur powerful systems harm kar sakte hain agar governed properly nahi kiye jaayein. AI Governance framework hai jo ensure karta hai ki AI systems ethical, fair, transparent, aur compliant hain.
        </p>
        <ul style={S.ul}>
          <li><strong>Model Bias aur Fairness:</strong> ML models training data ki biases inherit karte hain. Credit scoring model jo minority communities ko discriminate kare — legal liability aur harm. Bias testing mandatory hai: model performance across demographic groups check karo. Tools: Fairlearn (Microsoft), IBM AI Fairness 360, Google What-If Tool.</li>
          <li><strong>Explainability (XAI):</strong> "Why did the model make this prediction?" — regulated domains mein (credit, insurance, healthcare) explain karna legally required hai. SHAP values (SHapley Additive exPlanations), LIME, Integrated Gradients — methods jo individual predictions explain karte hain.</li>
          <li><strong>EU AI Act (2024):</strong> World's first comprehensive AI regulation. Risk tiers: Unacceptable risk (ban) → High risk (conformity assessment required) → Limited risk (transparency obligations) → Minimal risk. High-risk AI: credit scoring, employment decisions, healthcare, law enforcement. Compliance: documentation, testing, human oversight, audit trails.</li>
          <li><strong>GDPR aur ML:</strong> Training data mein EU citizens' personal data → GDPR applies. Right to explanation (Article 22): automated decisions pe explanation required. Right to be forgotten: training data delete karna — "machine unlearning" ek active research area hai. Data minimization: sirf necessary data collect karo.</li>
          <li><strong>Model Cards:</strong> Google ne introduce kiya — structured documentation for ML models. Training data description, evaluation results, intended use, known limitations, ethical considerations. Best practice banata ja raha hai — GitHub pe publicly available hote hain.</li>
          <li><strong>Auditing:</strong> Regular model audits — performance degradation check, bias re-evaluation, regulatory compliance verification. Audit trail: model decisions, training data lineage, evaluation results — reproducible aur reviewable.</li>
        </ul>
        <Callout type="warning" title="Compliance is Not Optional">
          India mein bhi DPDP Act (Digital Personal Data Protection) 2023 personal data ke ML use pe restrictions impose karta hai. Banking sector: RBI guidelines ML models ke liye specific explainability requirements set karte hain. Healthcare: CDSCO upcoming medical AI regulations. Compliance infrastructure design karo from day 1 — retrofit karna bahut expensive hai.
        </Callout>
      </section>

      {/* ─── ADVANTAGES ─────────────────────────────────────────────────── */}
      <section id="advantages">
        <h2 style={S.h2}>Advantages of Machine Learning</h2>
        <ul style={S.ul}>
          <li><strong>Handles complexity rules can't:</strong> Face recognition, NLP, protein structure — problems too complex for manual rules. ML yeh solve kar sakta hai.</li>
          <li><strong>Scales automatically:</strong> Once trained, same model billions of users serve kar sakta hai — ek model, sab users. Netflix ka recommendation model sab 260M subscribers ke liye kaam karta hai.</li>
          <li><strong>Continuously improves:</strong> New data se retrain karo — model automatically current patterns reflect karta hai.</li>
          <li><strong>Finds patterns humans miss:</strong> High-dimensional data mein patterns identify karna jo no human analyst would notice.</li>
          <li><strong>Cost reduction at scale:</strong> Manual expert review replace karna with automated ML predictions — at scale, significant cost reduction.</li>
        </ul>
      </section>

      {/* ─── LIMITATIONS ────────────────────────────────────────────────── */}
      <section id="limitations">
        <h2 style={S.h2}>Limitations</h2>
        <ul style={S.ul}>
          <li><strong>Data hungry:</strong> Complex models large amounts of labeled data chahte hain. Labeling expensive. Data collection, cleaning — often most expensive part of ML project.</li>
          <li><strong>Black box:</strong> Deep neural networks — interpretability limited. "Why did the model make this prediction?" — often hard to answer rigorously. Regulatory domains require explainability.</li>
          <li><strong>Distribution shift:</strong> Real world changes — new fraud patterns, pandemic behavior, market shifts — model accuracy degrades. Continuous monitoring aur retraining required.</li>
          <li><strong>Adversarial vulnerabilities:</strong> Carefully crafted inputs fool ML models. Spam filters evaded, image classifiers misled. Real security concern.</li>
          <li><strong>Requires specialized expertise:</strong> Data engineering, ML, software engineering, MLOps, infrastructure — multiple specializations simultaneously required.</li>
          <li><strong>Compute cost:</strong> Training large models: expensive. Inference at scale: ongoing cost. Electricity, hardware, engineering time.</li>
        </ul>
      </section>

      {/* ─── BEST PRACTICES ─────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Start simple:</strong> Logistic regression ya XGBoost se shuru karo. Often surprisingly competitive. Complex neural networks tabhi justify hote hain jab simpler models genuinely insufficient hain.</li>
          <li><strong>Data quality first:</strong> Model choice se zyada important. 100K clean examples beat 10M noisy ones for most tasks.</li>
          <li><strong>Baseline establish karo:</strong> Always naive baseline se compare karo. Agar ML model significantly better nahi, something fundamentally wrong hai.</li>
          <li><strong>Version everything:</strong> Code, data, models, experiments — sab versioned. Reproducibility ek engineering requirement hai.</li>
          <li><strong>Monitor production aggressively:</strong> Model accuracy degrade hoti hai silently. Active monitoring: prediction distribution, data drift, business metrics.</li>
          <li><strong>Feature engineering mein invest karo:</strong> Domain expertise apply karo. Talk to domain experts — fraud investigators, doctors, logistics managers.</li>
          <li><strong>Separate training aur serving infrastructure:</strong> Different optimization targets, different cost profiles, different scaling patterns.</li>
        </ul>
      </section>

      {/* ─── COMMON MISTAKES ────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Training data pe test set include karna:</strong> Data leakage. Results artificially optimistic. Strict separation maintain karo.</li>
          <li><strong>Offline metrics blindly trust karna:</strong> AUC 0.98 training mein, production pe model useless. Always online A/B tests with business metrics karo.</li>
          <li><strong>Imbalanced datasets handle nahi karna:</strong> 99% negative class → 99% accuracy naive model. Class weights, stratified sampling, appropriate metrics (F1, AUC-ROC).</li>
          <li><strong>ML solution jab simpler solution exists:</strong> Rule-based system ya lookup table kaafi hai — ML overkill hai.</li>
          <li><strong>Inference latency ignore karna:</strong> Heavy model training pe fine hai lekin production pe &lt;100ms requirement ke against fail. Evaluate early.</li>
          <li><strong>No monitoring setup:</strong> Model degradation silently happens. Monitoring day 1 se setup karo, not after problems appear.</li>
        </ul>
      </section>

      {/* ─── SECURITY ───────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Security Considerations</h2>
        <ul style={S.ul}>
          <li><strong>Model theft:</strong> Attacker public API query karke model reproduce kar sakta hai. Mitigation: API rate limiting, query monitoring.</li>
          <li><strong>Data poisoning:</strong> Training data deliberately corrupted to manipulate model behavior. Mitigation: robust training, data validation, anomaly detection in training data.</li>
          <li><strong>Adversarial attacks:</strong> Carefully crafted inputs jo model confidently misclassify karta hai. Mitigation: adversarial training, input preprocessing, ensemble methods.</li>
          <li><strong>Model inversion:</strong> From model predictions, training data reconstruct karna — patient data leakage possible. Mitigation: differential privacy.</li>
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
          <li><strong>Data loading:</strong> Multiple DataLoader workers, pin memory, local NVMe cache. GPU idle time minimize karo during data loading.</li>
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
          <strong>Inference autoscaling:</strong> Kubernetes HPA based on GPU utilization ya request queue depth. Scale down during low traffic — especially on cloud — to save cost.
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
          <li><strong>Ola/Uber Surge Pricing (India):</strong> Real-time demand-supply modeling. Inference: &lt;50ms. Festival periods pe 10x normal traffic. Indian peculiarities — festivals, monsoon, cricket match schedule — all affect demand patterns differently than Western markets.</li>
          <li><strong>Google DC Cooling (DeepMind RL):</strong> Reinforcement learning for DC cooling optimization. Inputs: sensor readings (temperatures, power consumption, pump speeds). Output: HVAC control setpoints. Result: 40% cooling energy reduction. Deployed in Google's own data centers. Direct overlap with DC engineering domain.</li>
        </ul>
      </section>

      {/* ─── INTERVIEW QUESTIONS ────────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Machine Learning aur traditional programming mein fundamental difference kya hai?</p>
          <p style={S.p}>Traditional programming: engineer explicit rules likhta hai → computer rules apply karta hai data pe. ML: engineer data provide karta hai → algorithm rules derive karta hai automatically. Traditional: kab appropriate jab rules clearly definable aur stable hain. ML: kab appropriate jab rules too complex hain (face recognition), ya environment change hota rehta hai (fraud), ya personalization required hai (recommendations).</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Overfitting kya hai aur kaise detect aur fix karte hain?</p>
          <p style={S.p}>Overfitting: model training data pe bahut closely fit — including noise. Result: training accuracy high, validation accuracy significantly lower. Detection: train/validation loss curves diverge. Fixes: more training data (most effective), regularization (L1, L2, dropout), simpler model architecture, data augmentation, early stopping.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Feature store kya hai aur kyun important hai?</p>
          <p style={S.p}>Feature store centralized repository hai precomputed ML features ke liye. Training-serving skew solve karta hai — same features training aur serving mein. Online feature store (Redis): real-time inference ke liye low latency. Offline feature store (data warehouse): training ke liye. Feature versioning consistency ensure karta hai across model versions.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: NCCL distributed training mein kya karta hai?</p>
          <p style={S.p}>NCCL (NVIDIA Collective Communications Library) GPU-optimized communication library hai — all-reduce, broadcast, scatter, gather collective operations handle karta hai. Distributed training mein har GPU gradients compute karta hai, NCCL in gradients ko all GPUs ke beech aggregate karta hai. InfiniBand aur NVLink ke liye natively optimized. NCCL performance directly training throughput determine karta hai.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Shadow deployment aur canary deployment mein kya difference hai?</p>
          <p style={S.p}>Shadow deployment: new model production traffic pe predictions karta hai lekin results users ko nahi dikhate — zero user risk, real traffic pe silent comparison. Canary deployment: 5-10% actual traffic naye model ko route karo, results real users ko milte hain — risk limited, real business metrics track hote hain. Sequence: shadow → canary → full rollout.</p>
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
          <li>Machine Learning explicitly programmed rules ki bajay data se patterns automatically learn karta hai — yeh fundamental shift complex domains, high-scale applications, aur personalization ke liye practical solutions possible banata hai.</li>
          <li>ML ka core training loop matrix multiplication operations hai — yahi reason hai ki GPUs essential hain. CPU pe same computation 60-100x slower hota hai GPU se.</li>
          <li>Data quality algorithm choice se zyada important hai. 100K clean examples beat 10M noisy ones. Data pipeline mein invest karo.</li>
          <li>Feature Store training-serving skew prevent karta hai — production ML systems ki sabse common failure mode. Implement karo from day 1.</li>
          <li>Distributed training engineering — NCCL, DDP, FSDP, ZeRO, DeepSpeed — complex hai lekin necessary hai large models ke liye. Networking fabric (InfiniBand) directly training throughput determine karta hai.</li>
          <li>MLOps ek optional nicety nahi hai — yeh production ML ki foundation hai. CI/CD, experiment tracking, shadow deploy, canary, rollback — yeh sab production-grade ML mein mandatory hain.</li>
          <li>Production ML ek single deployment event nahi hai — yeh ek continuous loop hai: data → training → validation → deployment → monitoring → retraining. Ek stage bhi weak ho toh poora system suffer karta hai.</li>
          <li>Model optimization — quantization, LoRA, QLoRA — ne large model deployment democratize kar diya hai. 70B model jo 8 H100s maangta tha, QLoRA se ek H100 pe fine-tune ho sakta hai.</li>
          <li>AI Governance ab technical luxury nahi hai — regulatory requirement hai. EU AI Act, GDPR, India DPDP Act — compliance from day 1 design karo.</li>
          <li>DC engineers ke liye: ML infrastructure engineering fastest growing specialization hai AI field mein. Power, cooling, networking, storage background directly applicable hai. GPU cluster management + CUDA ecosystem + Kubernetes add karo — career trajectory dramatically improve ho jaata hai.</li>
        </ul>
      </section>

    </article>
  );
}
