"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { dlContent } from "@/content/deep-learning";

import ArtificialNeuralNetworkDiagram from "../svg/ArtificialNeuralNetworkDiagram";
import ForwardBackpropDiagram from "../svg/ForwardBackpropDiagram";
import CnnArchitectureDiagram from "../svg/CnnArchitectureDiagram";
import TransformerArchitectureDiagram from "../svg/TransformerArchitectureDiagram";
import InferencePipelineDiagram from "../svg/InferencePipelineDiagram";
import CudaSoftwareStackDiagram from "../svg/CudaSoftwareStackDiagram";
import GpuMemoryHierarchyDiagram from "../svg/GpuMemoryHierarchyDiagram";
import AiTrainingClusterDiagram from "../svg/AiTrainingClusterDiagram";
import MultiGpuTopologyDiagram from "../svg/MultiGpuTopologyDiagram";
import GpuTrainingPipelineDiagram from "../svg/GpuTrainingPipelineDiagram";
import EnterpriseDeepLearningStackDiagram from "../svg/EnterpriseDeepLearningStackDiagram";
import KubernetesAiPlatformDiagram from "../svg/KubernetesAiPlatformDiagram";
import EnterpriseMonitoringStackDiagram from "../svg/EnterpriseMonitoringStackDiagram";

void dlContent;

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Deep Learning Machine Learning ka ek subset hai jisme multi-layer artificial neural networks large amounts of data se complex patterns automatically seekhte hain. "Deep" ka matlab layers ki depth hai — ek single layer se nahi, balki dozens ya hundreds of stacked layers se jo progressively more abstract representations build karte hain.
        </p>
        <p style={S.p}>
          Pichle article mein Machine Learning cover kiya — traditional ML algorithms (XGBoost, Random Forest, SVM) jo structured data pe well kaam karte hain. Deep Learning tab aata hai jab data unstructured hai (images, text, audio, video), scale massive hai, aur patterns itne complex hain ki traditional algorithms genuinely fail karte hain.
        </p>
        <Callout type="important" title="Infrastructure Perspective">
          Traditional ML typically CPUs pe chalti hai, kilobytes to megabytes of model size, seconds mein train hoti hai. Deep Learning GPUs pe chalti hai, gigabytes to hundreds of gigabytes of model size, hours to weeks mein train hoti hai. Woh sari AI Infrastructure jo previous articles mein describe ki — GPU clusters, InfiniBand, liquid cooling, NVLink, HBM — primarily Deep Learning workloads ke liye exist karti hai.
        </Callout>
      </section>

      {/* ─── WHO SHOULD READ ───────────────────────────────────────────── */}
      <section id="who-should-read">
        <h2 style={S.h2}>Who Should Read This</h2>
        <ul style={S.ul}>
          <li><strong>Data Center Engineers:</strong> Deep Learning training jobs itni power aur cooling kyun consume karti hain iska physics samajhna — aur future capacity planning ke liye kya expect karna hai.</li>
          <li><strong>IT Infrastructure Engineers:</strong> GPU server management, CUDA ecosystem, distributed training setup jo sab Deep Learning ke liye specifically designed hai.</li>
          <li><strong>AI/MLOps Engineers:</strong> Production Deep Learning systems — training pipelines, inference serving, model monitoring — ka end-to-end understanding.</li>
          <li><strong>Cloud Engineers:</strong> Deep Learning workloads ke liye GPU instance selection, distributed training infrastructure, aur managed services.</li>
          <li><strong>Software Engineers transitioning to AI:</strong> Neural networks se lekar Transformers tak — jo aaj production AI ka backbone hai.</li>
          <li><strong>Technical Managers aur Architects:</strong> Deep Learning investments evaluate karna aur infrastructure roadmaps plan karna.</li>
        </ul>
      </section>

      {/* ─── WHAT YOU WILL LEARN ───────────────────────────────────────── */}
      <section id="what-you-will-learn">
        <h2 style={S.h2}>What You Will Learn</h2>
        <ul style={S.ul}>
          <li>Deep Learning fundamentally kaise kaam karta hai — neurons, weights, activation functions, backpropagation</li>
          <li>Why Deep Learning exists aur traditional ML se kahan aur kyun better hai</li>
          <li>CNN, RNN, LSTM, aur Transformer architectures — concepts aur infrastructure requirements</li>
          <li>Training process: forward propagation, loss, backpropagation, gradient descent, optimizers</li>
          <li>CUDA Software Stack aur GPU Memory Hierarchy</li>
          <li>Deep Learning frameworks: PyTorch, TensorFlow, JAX, Keras, ONNX, TensorRT, OpenVINO</li>
          <li>Deep Learning libraries: cuBLAS, cuDNN, NCCL, CUTLASS, TensorRT</li>
          <li>Distributed training strategies: data parallelism, model parallelism, tensor parallelism, FSDP, ZeRO</li>
          <li>Multi-GPU topology: PCIe, NVLink, NVSwitch, InfiniBand, Ethernet</li>
          <li>Memory optimization: mixed precision training, gradient checkpointing, Flash Attention</li>
          <li>AI Accelerator comparison: GPU vs TPU vs NPU vs DPU vs FPGA</li>
          <li>Enterprise deployment: Kubernetes, Kubeflow, KServe, Helm, ArgoCD, GPU Operator</li>
          <li>Monitoring: DCGM, Prometheus, Grafana, OpenTelemetry, ELK</li>
          <li>Training cost analysis: GPU, networking, storage, power, cloud TCO</li>
          <li>Industry-specific Deep Learning applications</li>
        </ul>
      </section>

      {/* ─── LEARNING PATH ─────────────────────────────────────────────── */}
      <section id="learning-path">
        <h2 style={S.h2}>Learning Path</h2>
        <ul style={S.ul}>
          <li><strong>Previous:</strong> <TopicLink slug="machine-learning" variant="inline" /> — supervised/unsupervised, ML workflow, MLOps, feature stores</li>
          <li><strong>Current:</strong> Deep Learning — neural networks, architectures, training, inference infrastructure</li>
          <li><strong>Next:</strong> <TopicLink slug="generative-ai" variant="inline" /> — foundation models, LLMs, diffusion models</li>
          <li><strong>Related:</strong> <TopicLink slug="what-is-ai-infrastructure" variant="inline" />, <TopicLink slug="ai-gpu" variant="inline" />, <TopicLink slug="gpu-cluster" variant="inline" /></li>
        </ul>
      </section>

      {/* ─── INTRODUCTION ──────────────────────────────────────────────── */}
      <section id="introduction">
        <h2 style={S.h2}>Introduction</h2>
        <p style={S.p}>
          2009 mein ek interesting experiment hua Stanford mein. Andrew Ng aur team ne Google ke saath collaborate kiya 1000 computers pe ek neural network train karne ke liye — 16,000 CPU cores. Objective: YouTube thumbnails mein cats identify karna. Network ne 74.8% accuracy achieve ki without anyone telling it what a cat looks like.
        </p>
        <p style={S.p}>
          Woh accuracy impressive nahi lagti aaj. Lekin context important hai: is network ne cat ka concept completely unsupervised discover kiya — sirf videos dekhke, bina kisi label ke.
        </p>
        <p style={S.p}>
          Ek saal baad, AlexNet ne ImageNet competition mein 26% se 15% error rate le aaya — sirf do NVIDIA GTX 580 GPUs pe. Yeh gap itna dramatic tha ki conference mein jo researchers wahan the, woh samajh gaye ki kuch permanently shift ho gaya tha.
        </p>
        <p style={S.p}>
          Woh shift kya tha? Yeh realization ki neural networks, given enough data aur compute, manually engineered features ki zaroorat nahi hai. Woh khud features discover karte hain — aur jo features woh discover karte hain woh often engineer-designed features se dramatically better hain.
        </p>
      </section>

      {/* ─── WHAT IS DL ────────────────────────────────────────────────── */}
      <section id="what-is-dl">
        <h2 style={S.h2}>What is Deep Learning?</h2>
        <p style={S.p}>
          Deep Learning ek Machine Learning approach hai jo artificial neural networks use karta hai jo brain ki neural structure se loosely inspired hain. "Deep" refer karta hai in networks mein layers ki number ko — shallow networks 1-2 hidden layers rakhte hain, deep networks dozens ya hundreds rakhte hain.
        </p>
        <p style={S.p}>
          Ek traditional ML approach mein engineer manually decide karta hai ki data ke kaunse aspects important hain — yeh called hai feature engineering. Deep Learning mein yeh step largely automated hai. Network raw data (pixels, text tokens, audio waveforms) input karta hai aur automatically learns ki kaunse internal representations useful hain prediction task ke liye.
        </p>
        <p style={S.p}>
          Image recognition example: CNN ke early layers edges detect karti hain. Middle layers curves aur shapes compose karti hain. Later layers complete objects recognize karti hain. Kisi ne in hierarchical features ko manually program nahi kiya — network ne data se learn kiya. Yeh automatic feature learning Deep Learning ka sabse powerful property hai.
        </p>
      </section>

      {/* ─── WHY DL EXISTS ─────────────────────────────────────────────── */}
      <section id="why-dl-exists">
        <h2 style={S.h2}>Why Deep Learning Exists</h2>
        <ul style={S.ul}>
          <li><strong>Unstructured data at scale:</strong> Image mein 224×224 pixels × 3 channels = 150,528 input features. Traditional ML algorithms yahan struggle karte hain. Deep Learning convolutional layers through spatial structure efficiently leverage karta hai. Text: sequential context dependencies — "bank" ka matlab river ya financial — Transformers yeh model karte hain.</li>
          <li><strong>Scale with data aur compute:</strong> Traditional ML algorithms ek certain data size ke baad saturate ho jaate hain. Deep Learning is limitation se free hai. Data aur compute badhaate raho — performance consistently improves. Yeh "scaling laws" hain jo foundation of modern AI hai.</li>
          <li><strong>End-to-end learning:</strong> Traditional pipeline: raw data → feature engineering → ML model → prediction. Deep Learning end-to-end train kar sakta hai: raw data → deep network → prediction. Network internally learn karta hai ki data ko kaise represent karna chahiye task ke liye optimal ho.</li>
        </ul>
      </section>

      {/* ─── HISTORY ───────────────────────────────────────────────────── */}
      <section id="history">
        <h2 style={S.h2}>History and Evolution</h2>
        <ComparisonTable
          title="Deep Learning — Key Milestones"
          headers={["Year", "Milestone", "Infrastructure Impact"]}
          rows={[
            ["1957", "Perceptron (Rosenblatt)", "Single CPU — minimal compute"],
            ["1986", "Backpropagation formalized", "CPUs, multi-layer networks theoretically possible"],
            ["1997", "LSTM introduced", "GPU not yet required — sequential CPU training"],
            ["2006", "Deep Belief Networks (Hinton)", "CPU clusters, layer-by-layer pre-training"],
            ["2006", "NVIDIA CUDA launched", "GPUs for general compute — game changer"],
            ["2012", "AlexNet — ImageNet breakthrough", "2× GTX 580 GPUs, deep learning era starts"],
            ["2014", "GANs introduced (Goodfellow)", "Multi-GPU training becoming standard"],
            ["2015", "ResNet — 152 layers + skip connections", "Dedicated GPU servers, vanishing gradient solved"],
            ["2017", "Transformer — Attention is All You Need", "GPU clusters, parallelizable training unlocked"],
            ["2018-20", "BERT, GPT-2, GPT-3 — LLMs arrive", "Thousands of GPUs, custom AI DC infrastructure"],
            ["2022", "ChatGPT, Stable Diffusion mainstream", "AI DC as separate building category"],
            ["2024-25", "Blackwell, NVL72, 100K-GPU clusters", "GW-scale power, purpose-built AI campuses"],
          ]}
        />
      </section>

      {/* ─── NEURAL NETWORKS ───────────────────────────────────────────── */}
      <section id="neural-networks">
        <h2 style={S.h2}>Artificial Neural Networks — Building Blocks</h2>
        <p style={S.p}>
          Deep Learning samajhna hai toh pehle individual building blocks samajhna padega.
        </p>

        <section id="neuron">
          <h3 style={S.h3}>Neuron, Weights, and Bias</h3>
          <p style={S.p}>
            Ek artificial neuron: multiple inputs receive karta hai (x₁, x₂, ...), har input ko ek weight se multiply karta hai (w₁, w₂, ...), all weighted inputs sum karta hai, ek bias term add karta hai, result ek activation function ke through pass karta hai, aur output produce karta hai.
          </p>
          <p style={S.p}>
            Mathematically: <code style={S.code}>output = activation(w₁x₁ + w₂x₂ + ... + b)</code>
          </p>
          <p style={S.p}>
            <strong>Weights</strong> woh parameters hain jo training ke dauran learn hote hain. GPT-3 mein 175 billion weights hain. Yeh weights model ki learned knowledge hain. Infrastructure perspective: ek 70B parameter model at FP16 precision = 140GB memory sirf weights ke liye. Training ke dauran gradients aur optimizer states additional 2-3x memory maangte hain.
          </p>
          <p style={S.p}>
            <strong>Bias</strong> ek additional learnable parameter hai jo neuron ke output ko shift karta hai regardless of input — network ko data fit karne mein help karta hai.
          </p>
          <Figure caption="Artificial Neural Network: Input layer, two hidden layers, and output layer — weights define connection strengths, activation function introduces nonlinearity">
            <ArtificialNeuralNetworkDiagram />
          </Figure>
        </section>

        <section id="activation-functions">
          <h3 style={S.h3}>Activation Functions</h3>
          <p style={S.p}>
            Bina activation functions ke, kitna bhi deep network essentially ek linear function hai — complex patterns learn nahi kar sakta. Activation functions nonlinearity introduce karti hain.
          </p>
          <ComparisonTable
            headers={["Function", "Formula", "Range", "Best For", "Problem"]}
            rows={[
              ["ReLU", "max(0, x)", "[0, ∞)", "CNNs, hidden layers — default choice", "Dead neurons (negative input = zero gradient)"],
              ["GELU", "x·Φ(x)", "(-0.17, ∞)", "Transformers, BERT, GPT — smooth nonlinearity", "Slightly more compute than ReLU"],
              ["Sigmoid", "1/(1+e⁻ˣ)", "(0, 1)", "Binary output layer", "Vanishing gradient in deep nets"],
              ["Tanh", "tanh(x)", "(-1, 1)", "Hidden layers (zero-centered)", "Vanishing gradient"],
              ["SoftMax", "eˣⁱ/Σeˣʲ", "(0,1), sum=1", "Multi-class output layer", "Not for hidden layers"],
              ["SiLU/Swish", "x·σ(x)", "unbounded", "LLaMA, PaLM — smooth gating", "More compute than ReLU"],
            ]}
          />
        </section>

        <section id="hidden-layers">
          <h3 style={S.h3}>Hidden Layers — The Depth</h3>
          <p style={S.p}>
            "Deep" in Deep Learning = multiple hidden layers. Ek shallow network = 1 hidden layer. Deep network = many hidden layers (sometimes hundreds). Each layer previous layer ke output pe build karta hai increasingly abstract representations banakar. Image network: Layer 1 edges, Layer 2 corners/textures, Layer 3 object parts, Layer 4+ complete objects. Yeh hierarchical representation learning Deep Learning ka power hai.
          </p>
        </section>
      </section>

      {/* ─── FORWARD PROPAGATION ───────────────────────────────────────── */}
      <section id="forward-propagation">
        <h2 style={S.h2}>Forward Propagation</h2>
        <p style={S.p}>
          Training ya inference ke dauran, data network ke through front to back flow karta hai — yahi hai forward propagation. Input data enter karta hai → first hidden layer: inputs × weights + bias → activation → second hidden layer ke inputs → layer by layer continue → output layer prediction produce karta hai.
        </p>
        <p style={S.p}>
          Mathematically: yeh ek series of matrix multiplications aur element-wise nonlinear operations hai. Exactly woh hai jo GPU efficiently compute karta hai. Forward propagation = inference (prediction). Training mein forward propagation ke baad backpropagation hoti hai.
        </p>
        <Callout type="maintenance" title="Infrastructure Note">
          Ek transformer model ka forward pass (single inference) = billions of floating point operations. H100 GPU ek trillion FP16 operations per second handle kar sakta hai. Isliye inference latency milliseconds mein hoti hai even for large models — agar efficient batching ho.
        </Callout>
      </section>

      {/* ─── LOSS FUNCTION ─────────────────────────────────────────────── */}
      <section id="loss-function">
        <h2 style={S.h2}>Loss Function — Measuring Error</h2>
        <p style={S.p}>
          Forward propagation ke baad network ek prediction produce karta hai. Loss function yeh measure karta hai ki prediction kitni wrong hai — training ka goal loss minimize karna hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Cross-Entropy Loss:</strong> Multi-class classification ke liye standard. Perfect prediction = zero loss. Wrong confident prediction = high loss.</li>
          <li><strong>Binary Cross-Entropy:</strong> Binary classification tasks ke liye (fraud/not fraud, spam/not spam).</li>
          <li><strong>Mean Squared Error (MSE):</strong> Regression tasks ke liye standard. Predicted aur actual ka squared difference.</li>
          <li><strong>Contrastive Loss / Triplet Loss:</strong> Embedding learning ke liye — similar examples paas, dissimilar examples door.</li>
        </ul>
      </section>

      {/* ─── BACKPROPAGATION ───────────────────────────────────────────── */}
      <section id="backpropagation">
        <h2 style={S.h2}>Backpropagation — The Learning Algorithm</h2>
        <p style={S.p}>
          Forward propagation prediction karta hai. Loss function error measure karta hai. Backpropagation error ke basis pe model ko update karta hai. Chain rule of calculus ka application hai yeh.
        </p>
        <p style={S.p}>
          Output se starting, loss ke gradient output layer weights ke respect mein calculate karo. Phir chain rule apply karo aur yeh gradient previous layer tak propagate karo. Layer by layer, output se input tak, har weight ka gradient calculate hota hai. Phir optimizer in gradients use karta hai weights update karne ke liye taaki loss reduce ho.
        </p>
        <Figure caption="Forward Propagation (data flow left→right) and Backpropagation (gradient flow right→left via chain rule) — optimizer updates weights after each backward pass">
          <ForwardBackpropDiagram />
        </Figure>
        <Callout type="important" title="Infrastructure Impact of Backprop">
          Backward pass ≈ 2-3x forward pass ka compute. Training mein activations store karne padte hain forward pass ki backward ke liye. Large models ke liye yeh significant memory consume karta hai. Gradient checkpointing technique: activations selectively discard karo, backward pass mein recompute karo — memory kam karta hai at 30-33% compute overhead.
        </Callout>
      </section>

      {/* ─── GRADIENT DESCENT ──────────────────────────────────────────── */}
      <section id="gradient-descent">
        <h2 style={S.h2}>Gradient Descent and Optimizers</h2>
        <p style={S.p}>
          Backpropagation gradients compute karta hai. Optimizer in gradients use karke weights update karta hai loss minimize karne ke liye. Weight update rule: <code style={S.code}>W_new = W_old - learning_rate × gradient</code>
        </p>
        <ComparisonTable
          title="Optimizers Comparison"
          headers={["Optimizer", "Key Feature", "Best For", "Memory Cost"]}
          rows={[
            ["SGD", "Simple gradient step, momentum optional", "CNNs, when carefully tuned", "Low"],
            ["Adam", "Adaptive per-parameter LR + momentum", "General purpose, fast convergence", "2× model (m, v states)"],
            ["AdamW", "Adam + weight decay regularization", "LLM training standard", "2× model"],
            ["Adafactor", "Memory-efficient approximation of Adam", "Very large models, memory constrained", "~0.1× model"],
            ["LION", "Sign-based update, lower memory than Adam", "Recent research, large models", "~1× model"],
          ]}
        />
        <p style={S.p}>
          <strong>Learning rate scheduling:</strong> Warmup (training ke shuru mein small LR se start, gradually increase), cosine annealing (sinusoidal schedule se reduce), step decay, one-cycle. BERT aur GPT linear warmup + linear decay use karte hain. Without proper scheduling, large model training diverge kar sakta hai.
        </p>
      </section>

      {/* ─── TRAINING PROCESS ──────────────────────────────────────────── */}
      <section id="training-process">
        <h2 style={S.h2}>Training Process — End to End</h2>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>Initialization:</strong> Weights randomly initialize karo — Xavier/He initialization. Bad initialization training fail kar sakti hai.</li>
          <li><strong>Mini-batch select karo:</strong> Training data se random subset.</li>
          <li><strong>Forward pass:</strong> Batch through network, predictions generate karo.</li>
          <li><strong>Loss compute karo:</strong> Predictions vs actual labels.</li>
          <li><strong>Backward pass:</strong> Gradients compute karo har parameter ke liye.</li>
          <li><strong>Optimizer step:</strong> Gradients use karke parameters update karo.</li>
          <li><strong>Repeat:</strong> Steps 2-6 repeat karo millions ya billions of times.</li>
          <li><strong>Validation:</strong> Periodically validation set pe evaluate karo.</li>
          <li><strong>Checkpoint:</strong> Model state periodically save karo — failure recovery ke liye.</li>
        </ol>
        <Callout type="warning" title="Training Stability Issues">
          Gradient explosion: gradients bahut large → training diverges. Fix: gradient clipping (max_grad_norm=1.0). Vanishing gradients: gradients near zero in deep networks → early layers barely learn. Fix: residual connections, batch normalization, GELU activations. NaN loss: learning rate too high ya numerical instability. Fix: reduce LR, check data for inf/nan values.
        </Callout>
      </section>

      {/* ─── ARCHITECTURES ─────────────────────────────────────────────── */}
      <section id="architectures">
        <h2 style={S.h2}>Deep Learning Architectures</h2>

        <section id="cnn">
          <h3 style={S.h3}>CNN — Convolutional Neural Networks</h3>
          <p style={S.p}>
            Images aur spatial data ke liye design ki gayi. Key insight: images mein local patterns (edges, textures) translational invariance rakhte hain — ek edge image ke center mein aur edge corner mein same detector se recognize honi chahiye.
          </p>
          <p style={S.p}>
            <strong>Convolutional layer:</strong> Small filter (3×3 ya 5×5) image pe slide karta hai aur local patterns detect karta hai. Same filter poori image pe apply hota hai — weight sharing. Dramatically fewer parameters than fully connected on images. <strong>Pooling layer:</strong> Spatial dimensions reduce karta hai — max pooling. Translation invariance help karta hai.
          </p>
          <Figure caption="CNN Architecture: Input image → Conv layers (edge/texture detection) → Pooling → Conv layers (object parts) → Global Average Pooling → FC → Classification">
            <CnnArchitectureDiagram />
          </Figure>
          <p style={S.p}>
            Architecture progression: AlexNet (2012, 5 layers, breakthrough) → VGGNet (2014, deep small filters) → ResNet (2015, skip connections, 152+ layers) → EfficientNet (2019, NAS optimal scaling) → ConvNeXt (2022, Transformer-inspired).
          </p>
        </section>

        <section id="rnn">
          <h3 style={S.h3}>RNN and LSTM</h3>
          <p style={S.p}>
            Sequential data ke liye — text, time series, audio. RNNs hidden state maintain karte hain jo past information represent karta hai. Problem: long-range dependencies mein vanishing gradient severe hai. Sequential nature GPU parallelization ko limit karta hai.
          </p>
          <p style={S.p}>
            <strong>LSTM (Long Short-Term Memory):</strong> 1997 mein propose kiya, 2013-2018 mein widespread use. Explicit memory cell aur three gates: forget gate (kya bhulna hai), input gate (kya store karna hai), output gate (kya output karna hai). Better long-range dependencies than vanilla RNN. Still used in: time series, embedded/edge systems (smaller size), legacy production systems.
          </p>
        </section>

        <section id="transformers">
          <h3 style={S.h3}>Transformers — The Modern Dominant Architecture</h3>
          <p style={S.p}>
            2017 mein Google Brain ka paper "Attention is All You Need" ne Transformer introduce kiya. Yeh architecture ne NLP mein revolution la di aur ab computer vision, audio, multimodal tasks mein bhi dominant hai.
          </p>
          <p style={S.p}>
            Core insight: <strong>Self-Attention</strong> mechanism allow karta hai model ko directly relate karne ke liye sequence ke kisi bhi two positions ko regardless of distance. "The cat sat on the mat because it was tired" — "it" refer karta hai "cat" ko. Attention directly yeh relationship model kar sakta hai. Fully parallelizable — unlike RNNs.
          </p>
          <Figure caption="Transformer Block: Multi-Head Self-Attention → Residual Add → Layer Norm → Feed-Forward Network → Residual Add — stacked N times">
            <TransformerArchitectureDiagram />
          </Figure>
          <p style={S.p}>
            Full Transformer block: Input → LayerNorm → Multi-Head Attention → Residual → LayerNorm → Feed-Forward (4× expansion) → Residual → Output. Stack N blocks. BERT: 12. GPT-3: 96. Large models: 128+.
          </p>
          <Callout type="important" title="Infrastructure Requirements for Transformers">
            Attention is O(n²) in sequence length — quadratic memory aur compute with context window. Flash Attention yeh dramatically improve karta hai. Transformer training inherently parallelizable — woh reason hai ki GPU clusters pe efficiently scale karte hain. Large context windows (128K tokens) Flash Attention ke bina practically infeasible hain.
          </Callout>
        </section>
      </section>

      {/* ─── ATTENTION MECHANISM ───────────────────────────────────────── */}
      <section id="attention">
        <h2 style={S.h2}>Attention Mechanism — Deep Dive</h2>
        <p style={S.p}>
          Attention mechanism Deep Learning mein arguably sabse important innovation hai last decade ki. Queries (Q), Keys (K), Values (V) matrices se:
        </p>
        <p style={S.p}>
          <code style={S.code}>Attention(Q,K,V) = softmax(QK^T / √d_k) × V</code>
        </p>
        <ul style={S.ul}>
          <li><strong>QK^T:</strong> Query-key similarity scores — how much each position should attend to each other.</li>
          <li><strong>√d_k scaling:</strong> Prevent dot products from becoming too large in high dimensions.</li>
          <li><strong>Softmax:</strong> Convert scores to probabilities summing to 1.</li>
          <li><strong>× V:</strong> Weighted combination of values based on attention.</li>
          <li><strong>Multi-Head:</strong> Multiple parallel attention operations capture different relationship types simultaneously.</li>
          <li><strong>Causal (Masked) Attention:</strong> GPT-style autoregressive — future tokens invisible. Upper triangular mask pe -infinity before softmax.</li>
        </ul>
        <p style={S.p}>
          <strong>KV Cache for inference:</strong> Autoregressive generation mein previously computed Key aur Value tensors cache karo. Per-request memory overhead. Large context windows (128K tokens) ke liye KV cache = significant GPU memory constraint.
        </p>
      </section>

      {/* ─── EMBEDDINGS ────────────────────────────────────────────────── */}
      <section id="embeddings">
        <h2 style={S.h2}>Embeddings — Representing the World Numerically</h2>
        <p style={S.p}>
          Neural networks numerical inputs process karte hain. Text, images, audio — sab kuch numerical vectors mein convert karna padta hai.
        </p>
        <ul style={S.ul}>
          <li><strong>Word2Vec (2013):</strong> Words ko dense continuous vectors mein map karo. Semantically similar words ke vectors close hote hain. "King - Man + Woman ≈ Queen" — mathematical analogy captures.</li>
          <li><strong>Contextual Embeddings (BERT):</strong> Same word, different context = different embedding. "Bank" financial aur river — different vectors based on surrounding words.</li>
          <li><strong>Token Embeddings (LLMs):</strong> Subword tokenization (BPE). GPT-3: 50K tokens × 12288 dimensions = 600M parameters sirf embedding table mein.</li>
          <li><strong>Positional Embeddings:</strong> Position information encode karna. RoPE (Rotary Positional Embeddings) modern LLMs ka standard — longer sequences pe well extrapolates.</li>
        </ul>
      </section>

      {/* ─── TRANSFER LEARNING ─────────────────────────────────────────── */}
      <section id="transfer-learning">
        <h2 style={S.h2}>Transfer Learning — Standing on Giants' Shoulders</h2>
        <p style={S.p}>
          Pre-train ek large model on massive data, phir specific tasks ke liye fine-tune karo. Early layers of any deep network learn general features — edges for images, syntax for text — useful across many tasks.
        </p>
        <ul style={S.ul}>
          <li><strong>Computer vision:</strong> ImageNet pre-trained model lao (ResNet, EfficientNet). Final layer replace karo. Fine-tune on your smaller dataset. Hundreds of images se surprisingly good performance.</li>
          <li><strong>NLP (BERT, 2018):</strong> Masked language modeling pe pre-train. Fine-tune on specific tasks (QA, classification, NER). BERT ne NLP benchmarks pe massive improvements diye.</li>
          <li><strong>Foundation Models:</strong> GPT-4, Claude, Gemini, LLaMA-3, Stable Diffusion. Large pre-trained models adaptable to many downstream tasks via prompting ya fine-tuning.</li>
        </ul>
        <Callout type="best-practice" title="Practical Guidance">
          Foundation model fine-tuning almost always beats training from scratch unless you have truly unique architecture needs or massive proprietary datasets. Training from scratch = GPT-3 scale cost ($4-12M). Fine-tuning = $1K-$100K depending on model size and data.
        </Callout>
      </section>

      {/* ─── FINE-TUNING ───────────────────────────────────────────────── */}
      <section id="fine-tuning">
        <h2 style={S.h2}>Fine-Tuning and Foundation Models</h2>
        <ComparisonTable
          title="Fine-Tuning Methods — Memory and Quality Comparison (70B Model)"
          headers={["Method", "Trainable Params", "GPU Memory", "Quality", "Cost"]}
          rows={[
            ["Full fine-tuning", "100% (~140GB)", "8+ H100s (80GB)", "Best", "Very high"],
            ["LoRA (r=16)", "~0.1% (~140MB)", "4 H100s minimum", "Near-full", "Medium"],
            ["QLoRA (4-bit + LoRA)", "~0.1%", "1× H100 (80GB)", "Good", "Low"],
            ["Prompt tuning", "<0.01%", "1× H100 sufficient", "Moderate", "Minimal"],
            ["Instruction fine-tuning (SFT)", "100% or LoRA", "Depends on method", "Task-specific", "Medium"],
          ]}
        />
        <p style={S.p}>
          <strong>RLHF (Reinforcement Learning from Human Feedback):</strong> Base LLM → SFT → Reward Model training → PPO optimization. ChatGPT, Claude, Gemini — sab yeh ya similar techniques use karte hain. Multiple models simultaneously training — significant GPU cluster required.
        </p>
      </section>

      {/* ─── INFERENCE PROCESS ─────────────────────────────────────────── */}
      <section id="inference-process">
        <h2 style={S.h2}>Inference Process</h2>
        <p style={S.p}>
          <strong>Autoregressive Generation (LLMs):</strong> Next token predict karo, append, repeat. 1000 tokens generate karna = 1000 forward passes. KV Cache: previously computed attention keys aur values cache karo — 10-50x faster generation without recomputation.
        </p>
        <Figure caption="LLM Inference: Autoregressive token generation with KV Cache — each step generates one token, cache avoids recomputing attention for previous tokens">
          <InferencePipelineDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>Continuous Batching:</strong> New requests join in-progress batch jab tokens complete hote hain. GPU utilization dramatically better. vLLM, TensorRT-LLM yeh implement karte hain.</li>
          <li><strong>Speculative Decoding:</strong> Small fast draft model parallel predictions generate karta hai, large model verify karta hai. 2-4x throughput improvement.</li>
          <li><strong>Beam Search:</strong> Top-k candidates maintain karo. Better quality for structured outputs at higher compute cost.</li>
        </ul>
      </section>

      {/* ─── DL FRAMEWORKS ─────────────────────────────────────────────── */}
      <section id="dl-frameworks">
        <h2 style={S.h2}>Deep Learning Frameworks</h2>
        <ComparisonTable
          headers={["Framework", "Key Strength", "Best For", "Maintained By"]}
          rows={[
            ["PyTorch", "Dynamic graphs, excellent debugging, research-to-production", "Research + production (dominant), LLM training", "Meta / PyTorch Foundation"],
            ["TensorFlow 2.x", "Mature serving ecosystem, mobile/edge via TFLite", "Production serving, legacy enterprise deployments", "Google"],
            ["JAX", "XLA JIT compilation, functional programming, TPU-native", "Research, Google TPU, Flax/Haiku models", "Google DeepMind"],
            ["Keras", "High-level API, rapid prototyping", "Beginners, quick experiments, TF/JAX backend", "Google (independent)"],
            ["ONNX", "Cross-framework model exchange format", "Model portability, deployment interop", "Linux Foundation AI"],
            ["TensorRT", "NVIDIA inference optimization engine", "Production GPU inference, maximum throughput", "NVIDIA"],
            ["OpenVINO", "Intel-optimized inference for CPU/GPU/VPU", "Intel hardware deployment, edge AI", "Intel"],
          ]}
        />
        <p style={S.p}>
          PyTorch industry mein dominant hai research aur increasingly production mein. TensorFlow abhi bhi significant enterprise footprint rakhta hai particularly legacy systems mein. JAX Google ke internal research mein preferred hai. ONNX export karo PyTorch/TF se, OpenVINO ya TensorRT mein optimize karo deployment ke liye.
        </p>
      </section>

      {/* ─── CUDA STACK ────────────────────────────────────────────────── */}
      <section id="cuda-stack">
        <h2 style={S.h2}>CUDA Software Stack</h2>
        <p style={S.p}>
          NVIDIA ka dominance sirf hardware nahi — software ecosystem hai. CUDA foundation hai jo sab Deep Learning frameworks ke niche kaam karta hai. Jab aap PyTorch code likhte hain, ultimately CUDA calls GPU pe jaati hain.
        </p>
        <Figure caption="CUDA Software Stack: Application code → PyTorch/TF → CUDA Runtime → cuDNN primitives → NCCL communications → CUDA Driver → GPU hardware">
          <CudaSoftwareStackDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>CUDA Runtime (libcudart):</strong> Memory management (cudaMalloc, cudaMemcpy), kernel launch, CUDA streams management, device synchronization.</li>
          <li><strong>CUDA Driver (libcuda):</strong> Kernel scheduling on SM cores, context management, module loading. Lower level than runtime.</li>
          <li><strong>CUDA Toolkit:</strong> Complete development environment — compiler (nvcc), profiler (nsight), debugger, math libraries. Version pinning critical in production.</li>
        </ul>
      </section>

      {/* ─── DL LIBRARIES ──────────────────────────────────────────────── */}
      <section id="dl-libraries">
        <h2 style={S.h2}>Deep Learning Libraries</h2>
        <ComparisonTable
          headers={["Library", "Purpose", "Key Operations", "Used By"]}
          rows={[
            ["cuBLAS", "GPU-accelerated BLAS — linear algebra", "GEMM (matrix multiply), TRSM, SYMM", "PyTorch, TF — every matrix op"],
            ["cuDNN", "Deep neural network primitives", "Convolution, attention, pooling, normalization, activation", "All DL frameworks — critical path"],
            ["NCCL", "Collective GPU communications", "All-reduce, broadcast, all-gather, reduce-scatter", "Distributed training — gradient sync"],
            ["CUTLASS", "CUDA templates for GEMM and convolution", "Highly optimized custom kernels, new hardware support", "TensorRT, research, custom ops"],
            ["TensorRT", "NVIDIA inference optimization", "Layer fusion, precision calibration, kernel auto-tuning", "Production inference, Triton backend"],
          ]}
        />
        <p style={S.p}>
          cuDNN version pinning production mein critical hai — version upgrade convolution algorithms change kar sakta hai, numeric results slightly different ho sakte hain. cuDNN 8.x to 9.x mein breaking changes documented hain. Infrastructure teams: CUDA + cuDNN + framework versions ek tested matrix ke against lock karo.
        </p>
      </section>

      {/* ─── GPU ACCELERATION ──────────────────────────────────────────── */}
      <section id="gpu-acceleration">
        <h2 style={S.h2}>GPU Acceleration in Deep Learning</h2>
        <p style={S.p}>
          Neural network training = matrix multiplication at scale. GPU architecture: thousands of smaller cores, SIMD parallel execution — perfect for matrix ops where same math applied to many elements simultaneously. H100 Tensor Cores: 4.5 PFLOPS BF16 performance.
        </p>

        <section id="gpu-memory-hierarchy">
          <h3 style={S.h3}>GPU Memory Hierarchy</h3>
          <Figure caption="GPU Memory Hierarchy: Registers (fastest, per-thread) → Shared Memory/L1 → L2 Cache → HBM3 → NVLink → CPU DRAM → NVMe (slowest, largest)">
            <GpuMemoryHierarchyDiagram />
          </Figure>
          <ul style={S.ul}>
            <li><strong>Registers:</strong> Per-thread, fastest access, very limited (~256KB per SM). Active computation variables.</li>
            <li><strong>Shared Memory / L1 Cache:</strong> Per-SM, user-configurable (48-228KB), ~5ns. Threads within same block share — critical for efficient tiling algorithms like Flash Attention.</li>
            <li><strong>L2 Cache:</strong> Per-GPU, 50MB (H100), ~50ns. Cross-SM data sharing.</li>
            <li><strong>HBM3 (Global Memory):</strong> 80GB (H100), 3.35 TB/s, ~200ns. Model weights, activations, gradients — main GPU memory.</li>
            <li><strong>NVLink / NVSwitch:</strong> GPU-to-GPU, 900 GB/s (H100), ~1µs. Peer GPU memory access.</li>
            <li><strong>CPU DRAM / PCIe:</strong> TB range, ~50 GB/s, ~5µs. Dataset caching, optimizer state offload.</li>
            <li><strong>NVMe SSD:</strong> TB range, 5-15 GB/s, ~100µs. ZeRO-Infinity offload, checkpoint storage.</li>
          </ul>
        </section>

        <section id="gpu-utilization">
          <h3 style={S.h3}>GPU Utilization and Occupancy</h3>
          <ul style={S.ul}>
            <li><strong>SM Utilization:</strong> Streaming Multiprocessor active percentage. Target: &gt;80% during training. Low SM utilization = underutilized GPUs (data loading bottleneck or small batch).</li>
            <li><strong>Occupancy:</strong> Active warps / maximum warps per SM. Higher occupancy helps hide memory latency through warp switching. Constrained by register usage, shared memory per block.</li>
            <li><strong>Warp Scheduling:</strong> Each SM executes 32-thread warps. When one warp stalls (memory access), SM switches to another warp. Sufficient warps in flight = memory latency hidden.</li>
            <li><strong>CUDA Streams:</strong> Allow concurrent execution of independent operations. Data transfer + computation overlap. Multiple model forward passes potentially concurrent.</li>
            <li><strong>Kernel Launch Efficiency:</strong> Small kernels = high launch overhead relative to computation. Kernel fusion (cuDNN, Flash Attention) reduces launch count — critical for performance.</li>
            <li><strong>MFU (Model FLOP Utilization):</strong> Achieved FLOPS / theoretical peak FLOPS. 40-60% = good. Below 30% = significant optimization opportunity. Primary training efficiency metric.</li>
          </ul>
        </section>
      </section>

      {/* ─── AI ACCELERATORS ───────────────────────────────────────────── */}
      <section id="ai-accelerators">
        <h2 style={S.h2}>AI Accelerator Comparison</h2>
        <ComparisonTable
          headers={["Accelerator", "Architecture", "Key Strength", "Best For", "Example"]}
          rows={[
            ["GPU", "Thousands of parallel SIMD cores + Tensor Cores", "General-purpose AI, mature software ecosystem", "Training + inference, all model types", "NVIDIA H100/B200, AMD MI300X"],
            ["TPU", "Custom matrix multiply ASICs, HBM, high-bandwidth interconnect", "TensorFlow/JAX-native, power efficiency", "Google's own training + inference", "Google TPU v4/v5"],
            ["NPU", "Neural Processing Unit, fixed-function ops", "Efficient inference, ultra-low power", "Mobile, edge, on-device AI", "Apple Neural Engine, Qualcomm AI"],
            ["DPU", "Programmable network processor", "Network/storage offload, free CPU for AI", "AI server infrastructure ops", "NVIDIA BlueField-3"],
            ["FPGA", "Programmable logic fabric, reconfigurable", "Custom latency-critical inference, low power", "Edge AI, specific fixed models", "Xilinx Alveo, Intel Agilex"],
          ]}
        />

        <section id="nvidia-ecosystem">
          <h3 style={S.h3}>NVIDIA AI Software Ecosystem</h3>
          <ul style={S.ul}>
            <li><strong>CUDA-X:</strong> Suite of GPU-accelerated libraries — cuDNN, cuBLAS, NCCL, RAPIDS, cuSPARSE, cuFFT. "CUDA-X" branding for this collection.</li>
            <li><strong>RAPIDS:</strong> GPU-accelerated data science — cuDF (pandas-like), cuML (scikit-learn-like), cuGraph. Training data preprocessing on GPU — avoids CPU bottleneck.</li>
            <li><strong>Triton Inference Server:</strong> Multi-framework serving (PyTorch, TF, ONNX, TensorRT). Dynamic batching, model ensembles, GPU sharing, concurrent model execution.</li>
            <li><strong>NeMo:</strong> Framework for training and fine-tuning large language models, speech, multimodal models. Pre-built model architectures, training recipes.</li>
            <li><strong>NIM (NVIDIA Inference Microservices):</strong> Containerized, optimized inference microservices. Pre-packaged models ready to deploy — dramatically reduces inference deployment complexity.</li>
          </ul>
        </section>

        <section id="amd-stack">
          <h3 style={S.h3}>AMD AI Stack</h3>
          <ul style={S.ul}>
            <li><strong>ROCm (Radeon Open Compute):</strong> AMD's open-source GPU compute platform — CUDA alternative. HIP (Heterogeneous-compute Interface for Portability) — CUDA-like programming model. PyTorch ROCm support available but ecosystem maturity still behind CUDA.</li>
            <li><strong>Instinct Series:</strong> MI300X (192GB HBM3 — memory capacity advantage over H100's 80GB), MI350X (upcoming). Competitive training performance for specific workloads.</li>
            <li><strong>Infinity Fabric:</strong> AMD's GPU-to-GPU interconnect technology (analogous to NVLink). MI300X: unified CPU+GPU package with shared memory pool.</li>
          </ul>
        </section>

        <section id="intel-stack">
          <h3 style={S.h3}>Intel AI Stack and TPU Architecture</h3>
          <ul style={S.ul}>
            <li><strong>Gaudi (Habana):</strong> Intel Gaudi 3 AI accelerator. Competitive inference performance. RoCE-based networking. Used in some cloud AI offerings.</li>
            <li><strong>oneAPI:</strong> Intel's unified programming model across CPUs, GPUs, FPGAs. oneDNN (Deep Neural Network library) — framework backend for Intel hardware.</li>
            <li><strong>OpenVINO:</strong> Inference optimization toolkit for Intel hardware. Model compression, quantization, hardware-specific optimizations. Strong for CPU inference and edge deployment.</li>
          </ul>
          <p style={S.p}>
            <strong>Google TPU Architecture:</strong> Custom ASICs specifically designed for matrix multiply-accumulate operations. Each TPU v4 chip: 2D systolic array for matrix ops, HBM for memory, high-bandwidth chip-to-chip interconnect. TPU Pods: hundreds to thousands of chips connected via custom ICI (Inter-Chip Interconnect) fabric. Available only through Google Cloud. TensorFlow aur JAX pe natively optimized — PyTorch support added later. Best for: Google's own foundation model training, highly parallel transformer workloads.
          </p>
        </section>
      </section>

      {/* ─── DISTRIBUTED TRAINING ──────────────────────────────────────── */}
      <section id="distributed-training">
        <h2 style={S.h2}>Distributed Training</h2>
        <ComparisonTable
          title="Distributed Training Strategies"
          headers={["Strategy", "What's Distributed", "When to Use", "Framework"]}
          rows={[
            ["DDP (Data Parallel)", "Data batches across GPUs", "Model fits in one GPU — simplest", "PyTorch DDP"],
            ["FSDP", "Params + grads + optimizer states sharded", "Memory constrained, large models", "PyTorch FSDP"],
            ["ZeRO Stage 1/2/3", "Optimizer / Grads / Params sharded", "Very large models, progressive", "DeepSpeed"],
            ["Tensor Parallelism", "Individual layer ops split", "Model too large for one node", "Megatron-LM"],
            ["Pipeline Parallelism", "Model layers vertically in stages", "Very deep models, latency trade-off", "Megatron-LM, PipeDream"],
            ["Horovod", "Gradients via ring all-reduce", "Multi-framework simplicity", "Horovod"],
            ["3D Parallelism", "Data + Tensor + Pipeline combined", "GPT-3 scale and beyond", "Megatron + DeepSpeed"],
          ]}
        />

        <section id="multi-gpu-topology">
          <h3 style={S.h3}>Multi-GPU Topology Comparison</h3>
          <Figure caption="Multi-GPU interconnect comparison: PCIe (host-GPU) vs NVLink (intra-node GPU-GPU) vs NVSwitch (all-to-all within server) vs InfiniBand (inter-node cluster) vs Ethernet (cost-effective alternative)">
            <MultiGpuTopologyDiagram />
          </Figure>
          <Callout type="best-practice" title="Distributed Training Best Practice">
            Always run NCCL bandwidth test (<code style={S.code}>nccl-tests all_reduce_perf</code>) before starting any large training run. Ek misconfigured fabric ya single slow link poora cluster slow kar sakta hai. Non-blocking InfiniBand fat-tree topology mandatory hai large-scale training ke liye. NVLink within node + InfiniBand between nodes = optimal topology.
          </Callout>
        </section>
      </section>

      {/* ─── MEMORY OPTIMIZATION ───────────────────────────────────────── */}
      <section id="memory-optimization">
        <h2 style={S.h2}>Memory Optimization Techniques</h2>
        <ul style={S.ul}>
          <li><strong>Mixed Precision (BF16):</strong> FP32 → BF16 training. Memory 2x reduce, Tensor Cores acceleration. BF16 preferred (no loss scaling needed). PyTorch: <code style={S.code}>torch.cuda.amp.autocast()</code> ya trainer flag. Same quality, 2x faster, 2x less memory.</li>
          <li><strong>Gradient Checkpointing:</strong> Activations backward pass ke liye recompute karo instead of storing. 30-33% compute overhead, significant memory reduction. <code style={S.code}>model.gradient_checkpointing_enable()</code> — Hugging Face.</li>
          <li><strong>Flash Attention:</strong> Attention O(n²) memory → O(n). HBM traffic minimize karo by tiling computation. 2-4x speed improvement. Flash Attention 2 aur 3: further improvements. Virtually all modern LLM training use karta hai.</li>
          <li><strong>CPU Offloading (ZeRO-Infinity):</strong> Optimizer states CPU DRAM pe move karo, parameters NVMe pe. Enables training models larger than GPU memory. PCIe bandwidth limited lekin feasible.</li>
          <li><strong>Activation Recomputation:</strong> Selective — sirf expensive-to-store activations recompute karo. Optimal balance between memory aur recompute overhead.</li>
        </ul>
      </section>

      {/* ─── TRAINING CLUSTER ──────────────────────────────────────────── */}
      <section id="training-cluster">
        <h2 style={S.h2}>AI Training Cluster Architecture</h2>
        <Figure caption="AI Training Cluster: Users → MLOps Platform → Kubernetes + Scheduler → DGX/HGX Nodes → InfiniBand Fabric → Parallel File System + Checkpoint Storage">
          <AiTrainingClusterDiagram />
        </Figure>
        <Figure caption="GPU Training Pipeline: One training step — data load → forward pass → loss → backward pass (2-3× fwd cost) → NCCL all-reduce (15% of step) → optimizer update → checkpoint">
          <GpuTrainingPipelineDiagram />
        </Figure>
      </section>

      {/* ─── DL INFRASTRUCTURE ─────────────────────────────────────────── */}
      <section id="dl-infrastructure">
        <h2 style={S.h2}>Deep Learning Infrastructure</h2>
        <Figure caption="Enterprise Deep Learning Stack: Physical infrastructure → Networking → Data/Storage → Compute (GPUs) → DL Frameworks + CUDA → MLOps → Model Serving → Business Applications">
          <EnterpriseDeepLearningStackDiagram />
        </Figure>

        <section id="ai-storage">
          <h3 style={S.h3}>AI Storage — IOPS, Throughput, Filesystems</h3>
          <ComparisonTable
            title="AI Storage Filesystem Comparison"
            headers={["Filesystem", "Type", "Max Throughput", "Best For", "Key Feature"]}
            rows={[
              ["Lustre", "Parallel distributed FS", "TB/s aggregate", "Large HPC/AI clusters", "POSIX compliant, widely used, DDN hardware"],
              ["GPFS / IBM Spectrum Scale", "Parallel FS", "TB/s aggregate", "Enterprise, banking AI", "Policy tiering, strong management"],
              ["Weka", "All-flash parallel FS", "Hundreds GB/s", "Modern AI, NVMe-native", "Multi-protocol (POSIX+S3+NFS), fast metadata"],
              ["BeeGFS", "Open-source parallel FS", "100s GB/s", "Cost-sensitive clusters", "Easy to deploy, good for medium scale"],
              ["VAST Data", "Disaggregated NVMe", "Hundreds GB/s", "High-density AI", "Single namespace, excellent metadata"],
              ["Local NVMe", "Direct-attached SSD", "10-20 GB/s per drive", "Burst buffer, hot cache", "Lowest latency, checkpoint temp"],
            ]}
          />
          <ul style={S.ul}>
            <li><strong>IOPS vs Throughput:</strong> AI training primarily sequential read (training data batches) — throughput-bound, not IOPS-bound. Random IOPS critical for metadata operations (file opens, stats). Metadata bottleneck often bigger issue than data throughput on large clusters.</li>
            <li><strong>Metadata bottlenecks:</strong> Millions of small files in training dataset → metadata server overload. Solution: archive small files into large containers (WebDataset format, LMDB), use object storage for large datasets.</li>
            <li><strong>Throughput calculation:</strong> 256 H100 cluster: minimum ~43 GB/s sustained read throughput. Target: 100-300+ GB/s for headroom.</li>
          </ul>
        </section>

        <section id="networking">
          <h3 style={S.h3}>Networking Requirements</h3>
          <p style={S.p}>
            Training cluster: InfiniBand NDR (400Gbps) for large-scale distributed training. Non-blocking fat-tree topology. Communication overhead 20-40% of training time — poor network = GPU idle, waiting for gradient sync. RDMA mandatory for low latency. Inference serving: Standard 25-100GbE typically sufficient — request-response pattern.
          </p>
        </section>

        <section id="power-cooling">
          <h3 style={S.h3}>Power and Cooling</h3>
          <p style={S.p}>
            NVIDIA H100 SXM5: 700W TDP. 8-GPU HGX server: ~10-11kW. 4 servers per rack: ~44kW. Traditional DC: 5-15kW/rack. AI racks need 3-7x more power. Direct Liquid Cooling mandatory above 40kW/rack. High-density PDUs (63A+), 3-phase distribution, MW-scale UPS.
          </p>
        </section>
      </section>

      {/* ─── BENCHMARKS ────────────────────────────────────────────────── */}
      <section id="dl-benchmarks">
        <h2 style={S.h2}>Deep Learning Benchmarks</h2>
        <ComparisonTable
          headers={["Benchmark", "What It Measures", "Key Models/Tasks", "Published By"]}
          rows={[
            ["MLPerf Training", "Time to train standard models to target accuracy", "ResNet-50, BERT, GPT-3, Stable Diffusion, DLRM", "MLCommons — public results at mlcommons.org"],
            ["MLPerf Inference", "Latency + throughput at different scenarios", "ResNet, BERT, GPT-J, Stable Diffusion (server/edge)", "MLCommons"],
            ["ImageNet (ILSVRC)", "Image classification accuracy, Top-1/Top-5", "1000 classes, 1.2M training images", "Stanford / ImageNet team"],
            ["GLUE / SuperGLUE", "NLP understanding tasks", "8-9 subtasks: QA, NLI, coreference", "NYU / DeepMind"],
            ["MMLU", "LLM knowledge across 57 subjects", "Multiple choice across STEM, humanities, law", "UC Berkeley research"],
            ["HumanEval", "Code generation accuracy", "Python function completion", "OpenAI"],
            ["HELM", "Holistic LLM evaluation", "42 scenarios, 7 metrics", "Stanford CRFM"],
          ]}
        />
        <p style={S.p}>
          MLPerf results use karo hardware procurement decisions mein. NVIDIA consistently top results training mein. AMD MI300X competitive hai memory-intensive workloads mein (192GB HBM3). Google TPU v5 excellent hai Google Cloud pe. Caveat: benchmark performance real workload se different ho sakti hai — specific model architectures aur batch sizes pe test karo.
        </p>
      </section>

      {/* ─── TRAINING COST ANALYSIS ────────────────────────────────────── */}
      <section id="training-cost">
        <h2 style={S.h2}>Training Cost Analysis</h2>
        <ComparisonTable
          title="256-GPU H100 Cluster — 70B Model Training Run Cost (Indicative)"
          headers={["Cost Component", "Details", "Estimated Cost (USD)", "Notes"]}
          rows={[
            ["GPU Compute (on-premises)", "32× HGX H100 servers amortized over 3yr", "~$1,500-2,500/day", "Based on $15-20M CAPEX"],
            ["GPU Compute (cloud — AWS P5)", "256× H100, on-demand", "~$4,800-6,000/hour", "P5.48xlarge ~$192/hr × 32"],
            ["GPU Compute (cloud — reserved)", "1-year reserved, 60% discount", "~$1,900-2,400/hour", "Significant savings vs on-demand"],
            ["InfiniBand Networking", "NDR fabric, amortized over 5yr", "~$100-200/day", "Based on $2-4M CAPEX"],
            ["Parallel Storage (on-prem)", "Weka/VAST, 4 nodes, amortized", "~$50-100/day", "Based on $1.5-3M CAPEX"],
            ["Power (on-premises)", "450kW × Rs 8/kWh × 24hrs", "~$1,500-2,000/day", "At PUE 1.3"],
            ["Cooling infrastructure", "Included in facility OpEx", "~$100-300/day", "DLC maintenance + power"],
            ["Training run duration (70B, 1T tokens)", "~19 days on 256× H100 at 50% MFU", "", ""],
            ["Total on-premises training run", "19 days × ~$3,300-5,100/day", "$63K-97K", "Total infrastructure run cost"],
            ["Total cloud training run (reserved)", "19 days × ~$45K-58K/day", "$855K-1.1M", "Cloud significantly more expensive at scale"],
          ]}
        />
        <Callout type="important" title="Cost Analysis Note">
          Yeh indicative numbers hain — actual costs GPU market pricing, your DC electricity tariff, aur team cost pe depend karte hain. Cloud costs highly variable — spot instances, committed use discounts dramatically change numbers. At sustained high utilization (70%+) for 12+ months, on-premises typically wins TCO. Break-even typically 18-30 months.
        </Callout>
      </section>

      {/* ─── ENTERPRISE DEPLOYMENT ─────────────────────────────────────── */}
      <section id="enterprise-deployment">
        <h2 style={S.h2}>Enterprise Deployment</h2>

        <section id="kubernetes-ai">
          <h3 style={S.h3}>Kubernetes, Kubeflow, and KServe</h3>
          <Figure caption="Kubernetes AI Platform: GPU Operator for hardware management, Kubeflow for training workflows, KServe for model serving, Helm + ArgoCD for GitOps deployment — with gang scheduling for distributed training">
            <KubernetesAiPlatformDiagram />
          </Figure>
          <ul style={S.ul}>
            <li><strong>NVIDIA GPU Operator:</strong> Automatically installs GPU drivers, CUDA toolkit, DCGM, MIG configuration on Kubernetes nodes. GPU resource advertisement to K8s scheduler. Essential for any K8s-based AI cluster.</li>
            <li><strong>Kubeflow:</strong> K8s-native ML platform. Training Operators (PyTorchJob, TFJob). Kubeflow Pipelines — DAG-based ML workflow. Notebooks — Jupyter on K8s. Katib — hyperparameter tuning.</li>
            <li><strong>KServe:</strong> Kubernetes-native model inference platform. Canary rollouts, shadow deployments, auto-scaling (scale to zero). Supports: Triton, TorchServe, MLflow, custom runtimes.</li>
            <li><strong>Helm:</strong> Kubernetes package manager. Chart-based deployment for complex ML infrastructure. Version control for K8s manifests.</li>
            <li><strong>ArgoCD:</strong> GitOps continuous delivery for Kubernetes. Declarative application definitions in Git. Automatic sync. ML infrastructure as code.</li>
            <li><strong>Gang Scheduling (Volcano / Run:AI):</strong> All GPUs for a distributed training job allocated atomically — prevents partial allocation deadlock. Queue management, priority scheduling, quota per team/project.</li>
          </ul>
        </section>
      </section>

      {/* ─── PRODUCTION PIPELINE ───────────────────────────────────────── */}
      <section id="production-pipeline">
        <h2 style={S.h2}>Production Pipeline</h2>

        <section id="inference-infra">
          <h3 style={S.h3}>Inference Infrastructure</h3>
          <ComparisonTable
            title="Inference Serving Options"
            headers={["Server", "Best For", "Key Features", "GPU Support"]}
            rows={[
              ["NVIDIA Triton", "Enterprise multi-framework serving", "Dynamic batching, model ensembles, concurrent models, gRPC/REST", "Excellent — all NVIDIA GPUs"],
              ["vLLM", "LLM serving — open source", "PagedAttention, continuous batching, OpenAI-compatible API", "NVIDIA + AMD ROCm"],
              ["TensorRT-LLM", "NVIDIA-optimized LLM inference", "FP8 support, custom attention, maximum throughput", "NVIDIA only"],
              ["TorchServe", "PyTorch-native serving", "Simple deployment, custom handlers, multi-model", "Good — PyTorch-based"],
              ["TF Serving", "TensorFlow production", "gRPC, batching, model versioning", "Good — TF-based"],
              ["Ollama", "Local development / edge", "Simple CLI, many model formats", "CPU + NVIDIA + AMD"],
            ]}
          />
        </section>
      </section>

      {/* ─── MONITORING ────────────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Monitoring — DCGM, Prometheus, Grafana</h2>
        <Figure caption="Enterprise AI Monitoring Stack: DCGM + training metrics → Prometheus (scraping + alerting) + OpenTelemetry → Grafana dashboards + ELK logs → PagerDuty/Slack alerts — with key GPU metrics table">
          <EnterpriseMonitoringStackDiagram />
        </Figure>
        <ul style={S.ul}>
          <li><strong>DCGM (Data Center GPU Manager):</strong> NVIDIA's GPU telemetry platform. Per-GPU metrics: utilization, memory, temperature, power, NVLink bandwidth, ECC errors, PCIe throughput. <code style={S.code}>dcgmi dmon -e 1001</code> — real-time stream. Prometheus DCGM Exporter — K8s integration.</li>
          <li><strong>Prometheus:</strong> Time-series metrics collection. PromQL for queries and alerting. AlertManager for notifications. Scrapes DCGM, NCCL stats, storage metrics, application metrics.</li>
          <li><strong>Grafana:</strong> Visualization and dashboards. GPU utilization heatmaps per training run, training loss curves, inference latency P50/P95/P99, cluster resource utilization.</li>
          <li><strong>OpenTelemetry:</strong> Vendor-neutral observability SDK. Traces (distributed request tracking), metrics, logs. Integrates with Prometheus, ELK, Jaeger, Datadog.</li>
          <li><strong>ELK Stack:</strong> Elasticsearch + Logstash + Kibana. Training job logs, NCCL debug output, CUDA error logs, application logs. Full-text search, anomaly detection on log patterns.</li>
        </ul>

        <section id="model-drift">
          <h3 style={S.h3}>Model Drift and Retraining</h3>
          <ul style={S.ul}>
            <li><strong>Data drift detection:</strong> KS test, PSI (Population Stability Index) on feature distributions. Alert when PSI &gt; 0.2 (significant drift).</li>
            <li><strong>Model performance monitoring:</strong> Accuracy/AUC on recent labeled samples. Alert on &gt;2% AUC drop.</li>
            <li><strong>Automated retraining:</strong> Airflow / Kubeflow Pipelines DAG — drift trigger → data prep → training → validation → shadow → canary → production. Human approval gate before production for high-stakes models.</li>
          </ul>
        </section>
      </section>

      {/* ─── SECURITY ──────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Security Considerations</h2>
        <ul style={S.ul}>
          <li><strong>Model theft:</strong> Repeated API queries se behavior reverse engineer karna. Mitigation: rate limiting, query monitoring, output watermarking.</li>
          <li><strong>Adversarial attacks:</strong> Crafted inputs fool model with high confidence. Stop sign sticker misleads autonomous vehicle. Mitigation: adversarial training, input preprocessing, ensemble models.</li>
          <li><strong>Training data poisoning:</strong> Malicious data manipulate model behavior. Backdoor attack: specific trigger → wrong output. Mitigation: data validation, anomaly detection in training data, differential privacy.</li>
          <li><strong>Privacy in training data:</strong> LLMs memorize training data. PII in training → model mein memorized. Mitigation: PII scrubbing before training, differential privacy, membership inference defense.</li>
          <li><strong>Infrastructure security:</strong> GPU cluster = valuable compute target (crypto mining). Model weights = valuable IP. BMC/IPMI isolated from training fabric. Encryption at rest for model weights, strict access controls.</li>
        </ul>
      </section>

      {/* ─── RESPONSIBLE AI ────────────────────────────────────────────── */}
      <section id="responsible-ai">
        <h2 style={S.h2}>Responsible AI and Explainability</h2>
        <ul style={S.ul}>
          <li><strong>Model Bias:</strong> Training data ki biases models inherit aur amplify karte hain. Face recognition: historically higher error on darker skin tones. Mitigation: diverse training data, bias auditing, fairness constraints. Tools: Fairlearn, IBM AI Fairness 360.</li>
          <li><strong>Explainability (XAI):</strong> SHAP values — feature attribution per prediction. LIME — local linear approximation. Attention visualization (Transformer). Required in regulated domains: finance, healthcare, lending.</li>
          <li><strong>EU AI Act (2024):</strong> High-risk AI (credit, healthcare, employment, law enforcement): conformity assessment, human oversight, audit trails, transparency. Deep Learning models in high-risk applications compliant hone chahiye.</li>
          <li><strong>Model Cards:</strong> Structured documentation — training data, intended use, evaluation results, known limitations, ethical considerations. Best practice becoming regulatory requirement.</li>
          <li><strong>India Context:</strong> DPDP Act (2023), RBI ML guidelines (explainability for credit decisions), CDSCO upcoming medical AI regulation.</li>
        </ul>
      </section>

      {/* ─── ADVANTAGES ────────────────────────────────────────────────── */}
      <section id="advantages">
        <h2 style={S.h2}>Advantages of Deep Learning</h2>
        <ul style={S.ul}>
          <li><strong>Automatic feature learning:</strong> Raw data se directly — engineer-defined features ki zaroorat nahi. Domain-agnostic architecture different data types pe adapt karo.</li>
          <li><strong>Scales with compute aur data:</strong> More data + more compute = better performance. Consistent scaling laws. Traditional ML plateau karta hai.</li>
          <li><strong>State-of-the-art across domains:</strong> Computer vision, NLP, speech, time series, drug discovery — Deep Learning approaches dominate benchmarks.</li>
          <li><strong>Transfer learning enables small-data applications:</strong> Foundation model → small dataset fine-tune → production-quality results.</li>
          <li><strong>End-to-end optimization:</strong> Raw input to final output, single differentiable system. No information loss at pipeline boundaries.</li>
          <li><strong>Multimodal data handling:</strong> Text + image + audio — single model. GPT-4V, Gemini, Claude 3 — multimodal foundation models.</li>
        </ul>
      </section>

      {/* ─── LIMITATIONS ───────────────────────────────────────────────── */}
      <section id="limitations">
        <h2 style={S.h2}>Limitations</h2>
        <ul style={S.ul}>
          <li><strong>Data hungry for training from scratch:</strong> Billions to trillions of examples for large models. Pre-training partially addresses but foundation models then required.</li>
          <li><strong>Compute intensive:</strong> GPU clusters, significant power, expensive hardware. Cost is a major barrier.</li>
          <li><strong>Interpretability gap:</strong> "Black box" nature. Explaining decisions in regulated industries difficult.</li>
          <li><strong>Adversarial vulnerability:</strong> Engineered inputs fool models with high confidence.</li>
          <li><strong>Hallucination (LLMs):</strong> Confident generation of factually incorrect information. Active research problem.</li>
          <li><strong>Training instability:</strong> Careful hyperparameter tuning required. Large models can diverge mid-training — expensive failures.</li>
          <li><strong>Environmental cost:</strong> GPT-3 training estimated ~1300 MWh energy. Carbon footprint growing concern.</li>
        </ul>
      </section>

      {/* ─── BEST PRACTICES ────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ul style={S.ul}>
          <li><strong>Start with pre-trained models:</strong> Foundation models fine-tune karna almost always beats training from scratch. Rarely necessary to train from scratch.</li>
          <li><strong>Reproducibility from day 1:</strong> Seed everything (random, numpy, torch seeds). Log hyperparameters, data versions, code versions via Weights &amp; Biases / MLflow.</li>
          <li><strong>Monitor training curves actively:</strong> Loss curves, validation metrics, gradient norms. Training divergence early catch karna expensive failed runs avoid karta hai.</li>
          <li><strong>Gradual scaling:</strong> Small experiments pehle karo — architecture validation, data quality check. Phir scale karo. Before week-long runs, small-scale proof.</li>
          <li><strong>Infrastructure testing before long runs:</strong> NCCL bandwidth test, storage throughput benchmark, single node stability check — mandatory before large training runs.</li>
          <li><strong>Always gradient clipping:</strong> <code style={S.code}>max_grad_norm=1.0</code> configure karo. Prevents gradient explosion → NaN loss → failed run.</li>
        </ul>
      </section>

      {/* ─── COMMON MISTAKES ───────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Mistakes</h2>
        <ul style={S.ul}>
          <li><strong>Training from scratch when fine-tuning works:</strong> Unnecessary cost. Foundation models almost always better starting point.</li>
          <li><strong>Ignoring learning rate:</strong> Most common cause of training failure. Too high: divergence. Without warmup for large models: instability.</li>
          <li><strong>No validation monitoring:</strong> Overfitting silently happens. Early stopping configure karo.</li>
          <li><strong>Batch size too small for distributed training:</strong> GPU utilization low. Gradient accumulation se effective batch size badhaao.</li>
          <li><strong>Skipping data preprocessing validation:</strong> Garbage data → silent bad model. Validate distribution, labels, preprocessing before launching.</li>
          <li><strong>Inference optimization ignored during model design:</strong> Production SLA &lt;100ms. Evaluate inference latency early — not after training is complete.</li>
        </ul>
      </section>

      {/* ─── INDUSTRY USE CASES ────────────────────────────────────────── */}
      <section id="industry-use-cases">
        <h2 style={S.h2}>Industry Use Cases</h2>
        <ComparisonTable
          headers={["Industry", "Deep Learning Application", "Architecture", "Infrastructure Scale"]}
          rows={[
            ["Banking / BFSI", "Fraud detection, credit scoring, AML, document OCR", "Transformer, GNN, CNN, LSTM", "Medium GPU, real-time inference <50ms"],
            ["Healthcare", "Radiology AI, drug discovery (AlphaFold), clinical NLP", "CNN for imaging, GNN for molecules", "Medium GPU, strict data compliance"],
            ["Manufacturing", "Visual quality control, predictive maintenance", "CNN (vision), LSTM/Transformer (time series)", "Edge AI GPU, production-line speed"],
            ["Retail / E-commerce", "Recommendations, visual search, demand forecasting", "Collaborative filtering DL, CNN, LSTM", "Large GPU cluster, real-time serving"],
            ["Telecom", "Network optimization, churn, multilingual ASR", "Time-series Transformer, CTC for speech", "Medium GPU, massive log data"],
            ["Government", "Document processing, satellite imagery, tax anomaly", "CNN, Transformer NLP, GNN", "On-prem (data sovereignty), GPU cluster"],
            ["Autonomous Vehicles", "Perception, sensor fusion, planning", "CNN + Transformer, GNN for agents", "Massive training cluster, edge inference <1ms"],
          ]}
        />
      </section>

      {/* ─── COMPARISON TABLES ─────────────────────────────────────────── */}
      <section id="comparison-tables">
        <h2 style={S.h2}>Comparison Tables</h2>
        <ComparisonTable
          title="ML vs Deep Learning vs Generative AI"
          headers={["Aspect", "Machine Learning", "Deep Learning", "Generative AI"]}
          rows={[
            ["Data requirement", "Hundreds to millions labeled", "Millions to billions", "Trillions of tokens/images"],
            ["Feature engineering", "Required (manual)", "Automatic (learned)", "Automatic"],
            ["Training compute", "CPU sufficient for many", "GPU required", "Massive GPU/TPU clusters"],
            ["Model size", "KB to low MB", "MB to GB", "GB to TB"],
            ["Structured data perf.", "Excellent (XGBoost top)", "Good but overkill", "Overkill"],
            ["Images / Text / Audio", "Limited", "Excellent", "Excellent + generative"],
            ["Interpretability", "Medium (trees interpretable)", "Low (NN opaque)", "Very low (large models)"],
            ["Infrastructure need", "Low to medium", "Medium to high", "Very high"],
          ]}
        />
        <ComparisonTable
          title="CNN vs RNN vs Transformer"
          headers={["Architecture", "Best For", "Key Innovation", "Infrastructure"]}
          rows={[
            ["CNN", "Images, spatial data", "Local filters, weight sharing, translation invariance", "Low-medium GPU"],
            ["RNN / LSTM", "Sequential, time series", "Hidden state, gated memory for long deps.", "Medium GPU"],
            ["Transformer", "Text, multimodal, large scale", "Self-attention, parallelizable, scales well", "Large GPU clusters"],
            ["Diffusion", "Image/video generation", "Iterative denoising process", "Large GPU clusters"],
            ["GNN", "Graph-structured data", "Message passing between nodes", "Medium GPU"],
            ["MoE (Mixture of Experts)", "Efficient large models", "Sparse activation of expert subnetworks", "Large GPU clusters"],
          ]}
        />
      </section>

      {/* ─── CASE STUDIES ──────────────────────────────────────────────── */}
      <section id="case-studies">
        <h2 style={S.h2}>Case Studies</h2>
        <ul style={S.ul}>
          <li><strong>DeepMind AlphaFold (2020-21):</strong> Protein structure prediction — 50-year unsolved biology problem. Graph Neural Network + attention-based architecture. 200 million protein structures predicted. TPU pod infrastructure. Biology research permanently transformed. Infrastructure lesson: solving hard scientific problems with DL requires Google-scale infrastructure investment.</li>
          <li><strong>Tesla Autopilot — Vision-Only:</strong> 2021 mein radar remove kiya. Pure camera-based CNN + Transformer perception. Fleet learning: millions of vehicles generate training data. Shadow mode: new model silently compares to human driver before deployment. Custom FSD chip for on-vehicle inference. Neural network training on internal GPU clusters.</li>
          <li><strong>Google Search + MUM:</strong> RankBrain (2015) → BERT (2019) → MUM (2021). 8.5 billion searches/day. MUM: 1000x more powerful than BERT, multilingual, multimodal. Inference infrastructure at that scale: massive global GPU deployment, &lt;200ms end-to-end latency requirement.</li>
          <li><strong>Google DeepMind DC Cooling:</strong> RL + Deep Learning for DC cooling optimization. 40% cooling energy reduction. Direct overlap with DC engineering domain — sensors → DL model → HVAC control. Now running autonomously in Google's own data centers.</li>
        </ul>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <ComparisonTable
          title="Production Deep Learning — Common Issues and Resolution"
          headers={["Problem", "Root Cause", "Diagnosis", "Resolution"]}
          rows={[
            ["Training loss NaN", "Gradient explosion / LR too high / bad data", "Check gradient norms, data for inf/nan", "Reduce LR, add gradient clipping, data validation"],
            ["GPU ECC uncorrectable error", "GPU memory hardware failure", "DCGM: nvidia-smi -q -d ECC", "P1: abort job, isolate GPU, OEM support"],
            ["NCCL timeout / training hang", "Network issue or GPU failure", "NCCL_DEBUG=INFO, ibping tests, check all nodes", "Check IB fabric, verify all GPUs healthy, firewall open"],
            ["CUDA Out of Memory", "Batch size too large / model too large for GPU", "torch.cuda.memory_summary()", "Reduce batch, gradient checkpointing, FSDP, BF16"],
            ["GPU utilization <50%", "Data loading bottleneck", "nvidia-smi dmon -s u, profile DataLoader", "More workers, NVMe cache, WebDataset format"],
            ["Gradient explosion", "LR too high / missing clipping / bad init", "Monitor gradient norms — if >10 consistently", "Gradient clip (max_norm=1.0), reduce LR, check init"],
            ["Dead GPU node mid-training", "GPU hardware failure", "nvidia-smi on each node, check BUS error", "Checkpoint restart from last save, replace GPU"],
            ["InfiniBand link error", "Cable, transceiver, or switch issue", "ibstat, show port errors, ibping", "Replace cable/transceiver, check switch port"],
            ["Production accuracy degraded", "Data drift or training-serving skew", "PSI on features, check preprocessing pipeline", "Retrain on recent data, verify feature store consistency"],
            ["Inference too slow", "Model size, no optimization, suboptimal batching", "Profile preprocessing vs model vs postprocessing", "Quantize, TensorRT, continuous batching, smaller model"],
          ]}
        />
      </section>

      {/* ─── INTERVIEW QUESTIONS ───────────────────────────────────────── */}
      <section id="interview-questions">
        <h2 style={S.h2}>Interview Questions</h2>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Backpropagation kaise kaam karta hai?</p>
          <p style={S.p}>Chain rule of calculus ka application. Output se starting, loss ke gradient output layer weights ke respect mein calculate karo. Phir chain rule se yeh gradient previous layer tak propagate karo — layer by layer, output se input tak. Each layer: gradient from next layer × current layer partial derivative = gradient for current layer weights. Optimizer in gradients use karke weights update karta hai loss reduce karne ke liye. Infrastructure: backward pass ≈ 2-3x forward pass compute. Activations store karne padte hain — gradient checkpointing se memory/compute trade-off.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: CNN aur Transformer mein fundamental architectural difference kya hai?</p>
          <p style={S.p}>CNN: local receptive fields, weight sharing across spatial positions, translation invariance. Inductive bias: locality aur translation invariance. Efficient for images, smaller datasets. Transformer: global self-attention — any position can attend to any other regardless of distance. No locality assumption. Parallelizable training (unlike RNNs). Scales dramatically better with large models aur large datasets. Modern trend: Vision Transformers (ViT) images ke liye bhi competitive, though CNNs still better for smaller datasets.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Vanishing gradient problem kya hai aur kaise solve karte hain?</p>
          <p style={S.p}>Very deep networks mein, backpropagation ke dauran gradients layer by layer multiply hote hain. Agar weights/activations small fractions multiply karte hain, gradients exponentially small ho jaate hain — early layers effectively zero gradient pate hain, nothing learn hota. Solutions: Residual connections (ResNets) — gradients directly flow through skip connections. Batch normalization — activations normalize karo. Careful initialization (Xavier, He init). GELU/ReLU activations (vs sigmoid which saturates). Layer normalization in Transformers.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: CUDA stack Deep Learning mein kaise kaam karta hai?</p>
          <p style={S.p}>Application code PyTorch operations call karta hai. PyTorch internally cuDNN call karta hai optimized primitives ke liye (convolution, attention, normalization). cuDNN CUDA Runtime use karta hai kernel launch aur memory management ke liye. CUDA Runtime CUDA Driver ke through kernels GPU pe schedule karta hai. GPU Tensor Cores actual matrix multiply-accumulate operations perform karte hain. NCCL distributed training mein all-reduce collective operations handle karta hai InfiniBand ke through. Sab layers tightly integrated hain — version mismatch = broken training.</p>
        </div>

        <div style={{ borderLeft: "4px solid #2563EB", paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
          <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem" }}>Q: Production mein Deep Learning model deploy karne se pehle kya verify karna chahiye?</p>
          <p style={S.p}>Latency profiling: inference time on target hardware within SLA? Memory footprint: model + KV cache + batch overhead GPU memory mein fit? Quantization impact: quality vs speed acceptable? Stress test: peak load pe stable? Training-serving consistency: same preprocessing? Monitoring configured: drift detection, performance metrics? Rollback plan: previous version deployable? Model card documented with known limitations. Load test: peak traffic pe model stable hai ya OOM hoti hai?</p>
        </div>
      </section>

      {/* ─── GLOSSARY ──────────────────────────────────────────────────── */}
      <section id="glossary">
        <h2 style={S.h2}>Glossary</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["Activation Function", "Nonlinear transformation applied to neuron output — ReLU, GELU, Sigmoid, Tanh."],
            ["Attention Mechanism", "Neural network component allowing direct relationships between any positions in a sequence."],
            ["Backpropagation", "Chain rule application computing gradients of loss with respect to all model parameters."],
            ["Batch Normalization", "Normalize activations within mini-batch — training stability and regularization."],
            ["BF16 (Brain Float 16)", "16-bit float with FP32's exponent range — preferred for modern LLM training."],
            ["Causal Attention", "Masked attention for autoregressive generation — future tokens invisible."],
            ["CNN", "Convolutional Neural Network — local filters, weight sharing, translation invariance. Best for images."],
            ["Cross-Entropy Loss", "Classification loss: negative log probability of correct class."],
            ["CUDA", "NVIDIA's parallel computing platform — enables GPU general compute for Deep Learning."],
            ["cuDNN", "NVIDIA CUDA Deep Neural Network library — optimized DL primitives (convolution, attention)."],
            ["DGX / HGX", "NVIDIA's purpose-built AI server — 8× H100 GPUs with NVSwitch."],
            ["Dropout", "Regularization: randomly zero neurons during training to prevent overfitting."],
            ["Embedding", "Dense vector representation of discrete tokens or categories."],
            ["Fine-tuning", "Continuing training of pre-trained model on task-specific data."],
            ["Flash Attention", "Memory-efficient attention — tiles computation, never materializes full O(n²) matrix."],
            ["FSDP", "Fully Sharded Data Parallel — shards params + grads + optimizer across GPUs."],
            ["GELU", "Gaussian Error Linear Unit — smooth activation, standard in Transformers."],
            ["Gradient Checkpointing", "Recompute activations during backward pass instead of storing — trades compute for memory."],
            ["HBM3", "High Bandwidth Memory 3 — GPU memory, 3.35 TB/s (H100). Main working memory for weights."],
            ["KV Cache", "Cached Key-Value attention tensors for LLM inference — avoids recomputation."],
            ["Layer Normalization", "Normalize activations per sample — preferred in Transformers (vs Batch Norm)."],
            ["LoRA", "Low-Rank Adaptation — parameter-efficient fine-tuning via small additional matrices."],
            ["LSTM", "Long Short-Term Memory — gated RNN handling long-range dependencies better than vanilla RNN."],
            ["MFU", "Model FLOP Utilization — achieved FLOPS / theoretical peak. 40-60% = good training efficiency."],
            ["Mixed Precision", "BF16/FP16 for compute, FP32 for optimizer — memory and speed efficient training."],
            ["Multi-Head Attention", "Multiple parallel attention operations capturing different relationship types."],
            ["NCCL", "NVIDIA Collective Communications Library — all-reduce, broadcast for distributed training."],
            ["NVLink", "NVIDIA GPU-to-GPU interconnect — 900 GB/s bidirectional (H100 generation)."],
            ["NVSwitch", "NVIDIA all-to-all GPU switching chip — connects all 8 GPUs in DGX/HGX at full NVLink speed."],
            ["Overfitting", "Model memorizes training data — poor generalization to unseen examples."],
            ["QLoRA", "Quantized LoRA — 4-bit base model + FP16 LoRA adapters. Memory-efficient fine-tuning."],
            ["Residual Connection", "Skip connection adding input directly to output — enables very deep networks."],
            ["ReLU", "Rectified Linear Unit — max(0, x). Simple, effective, default activation function."],
            ["Self-Attention", "Attention where queries, keys, and values all from the same sequence."],
            ["Tensor Cores", "NVIDIA dedicated hardware for matrix multiply-accumulate — key to AI training performance."],
            ["Tensor Parallelism", "Splitting individual layer operations across multiple GPUs."],
            ["TensorRT", "NVIDIA inference optimization engine — layer fusion, quantization, auto-tuning."],
            ["Transformer", "Architecture using self-attention — dominant for NLP, vision, and multimodal AI."],
            ["Transfer Learning", "Using pre-trained model weights as initialization for new downstream task."],
            ["Vanishing Gradient", "Gradients approach zero in deep networks — early layers fail to learn."],
            ["ZeRO", "Zero Redundancy Optimizer (DeepSpeed) — shards optimizer/gradient/params across GPUs."],
          ]}
        />
      </section>

      {/* ─── AI LEARNING PATH ──────────────────────────────────────────── */}
      <section id="ai-learning-path">
        <h2 style={S.h2}>BTT AI Learning Path</h2>
        <p style={S.p}>
          Behind The Tech AI Infrastructure track ka complete learning path — beginner se enterprise engineer tak:
        </p>
        <ComparisonTable
          title="BTT AI Infrastructure Learning Path"
          headers={["Step", "Article", "What You Learn"]}
          rows={[
            ["1", "What is AI Infrastructure", "GPU clusters, NVLink, InfiniBand, liquid cooling, AI DC architecture"],
            ["2", "Machine Learning", "ML concepts, supervised/unsupervised, MLOps, feature stores, ML lifecycle"],
            ["3 (Current)", "Deep Learning", "Neural networks, CNN/RNN/Transformer, CUDA stack, distributed training, enterprise deployment"],
            ["4 (Next)", "Generative AI", "Foundation models, LLMs, diffusion models, multimodal AI"],
            ["5", "Large Language Models", "LLM architecture, training, RLHF, inference optimization, production LLM ops"],
            ["6", "AI GPU", "GPU architecture deep dive, Tensor Cores, HBM, PCIe, NVLink, GPU selection guide"],
            ["7", "GPU Cluster", "Multi-GPU server design, DGX/HGX, rack architecture, NVSwitch topology"],
            ["8", "AI Networking", "InfiniBand deep dive, RoCE, RDMA, fat-tree topology, NCCL optimization"],
            ["9", "AI Storage", "Parallel filesystems, NVMe, checkpoint strategies, data pipeline optimization"],
            ["10", "AI Cooling", "DLC design, immersion cooling, CDU architecture, thermal management at AI density"],
            ["11", "AI Data Center", "AI DC design, power planning, facility infrastructure, operations"],
          ]}
        />
        <p style={S.p}>
          Har article previous pe build karta hai. Deep Learning article ke baad, Generative AI naturally aata hai — jo Deep Learning ka direct extension hai lekin dramatically different scale aur infrastructure implications ke saath.
        </p>
        <ul style={S.ul}>
          <li><strong>Infrastructure engineers:</strong> Articles 1, 6, 7, 8, 9, 10, 11 pe focus karo — direct DC engineering relevance.</li>
          <li><strong>ML/AI engineers:</strong> Articles 2, 3, 4, 5 pe focus karo — theory aur production pipeline.</li>
          <li><strong>Full-stack AI engineers:</strong> Sab articles read karo — yeh cross-domain understanding aaj ki sabse valuable engineering skill hai.</li>
        </ul>
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Deep Learning Machine Learning ka subset hai lekin fundamentally different infrastructure require karta hai — GPUs mandatory hain, model sizes GBs to TBs mein hain, training days to weeks leti hai. Woh sari AI Infrastructure — H100, NVLink, InfiniBand, liquid cooling — primarily Deep Learning workloads ke liye hai.</li>
          <li>Neural network ki core operation matrix multiplication hai — yahi woh reason hai ki GPUs essential hain. Tensor Cores dedicated hardware hain specifically matrix multiply-accumulate ke liye. GPU architecture parallel workloads ke liye designed hai, exactly jaise DL training.</li>
          <li>CUDA software stack Deep Learning ka invisible foundation hai. Application → PyTorch → CUDA Runtime → cuDNN → CUDA Driver → GPU — har layer matters. Version mismatch production mein silent failures create kar sakta hai.</li>
          <li>Transformer architecture ne Deep Learning revolutionize kar diya hai 2017 se. Self-attention: long-range dependencies efficiently model karta hai, training parallelizable hai, scaling laws work karte hain. NLP, vision, audio, multimodal — sab Transformer-based hain aaj.</li>
          <li>GPU Memory Hierarchy samajhna performance optimization ke liye critical hai. Flash Attention HBM traffic minimize karta hai. Gradient checkpointing compute/memory trade karta hai. Mixed precision (BF16) 2x faster training delivers. Yeh techniques ek ke baad ek layer optimizations hain.</li>
          <li>Distributed training engineering — NCCL, DDP, FSDP, ZeRO, Megatron-LM — complex hai lekin large models ke liye necessary hai. InfiniBand fabric bandwidth directly training throughput determine karta hai. Non-blocking fat-tree topology mandatory hai serious clusters ke liye.</li>
          <li>Kubernetes + GPU Operator + Kubeflow/KServe modern enterprise AI platform ka standard hai. Gang scheduling distributed training jobs ke liye critical hai. Helm + ArgoCD GitOps infrastructure as code enable karta hai.</li>
          <li>DCGM + Prometheus + Grafana production AI monitoring ka baseline hai. GPU utilization, ECC errors, NVLink bandwidth, temperature — sab monitor karo. Silent GPU degradation expensive training failures create karta hai.</li>
          <li>Training cost analysis: on-premises 256× H100 cluster pe 70B model training run ~$63K-97K infrastructure cost. Cloud pe equivalent: $855K-1.1M. At scale aur sustained utilization, on-premises TCO wins.</li>
          <li>DC engineers ke liye: Deep Learning workloads ka trajectory clear hai — power density badhti jaayegi, liquid cooling mandatory hoti jaayegi, networking speeds increase hoti jaayegi. Yeh understanding next years mein increasingly valuable hogi. AI Infrastructure engineer jo Deep Learning samajhta hai woh sab se zyada valuable asset hai aaj ki market mein.</li>
        </ul>
      </section>

    </article>
  );
}
