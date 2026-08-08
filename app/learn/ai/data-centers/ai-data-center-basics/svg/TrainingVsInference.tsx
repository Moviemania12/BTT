"use client";
export default function TrainingVsInference() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tvi-title">
      <title id="tvi-title">AI Training vs AI Inference infrastructure comparison. Training: Large GPU clusters, days to weeks operation, maximum compute throughput, creates the AI model, large memory per GPU needed, high GPU-to-GPU bandwidth required. Inference: Millisecond response time, lower latency priority, uses the trained model, serves millions of user requests, autoscales with traffic, cost efficiency priority. Same AI technology — completely different infrastructure design.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">AI TRAINING vs AI INFERENCE — Same Technology, Different Infrastructure</text>

      {/* Training panel */}
      <rect x="14" y="30" width="384" height="236" rx="10" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2" />
      <text x="206" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#00d4ff" textAnchor="middle">AI Training — Building the AI Model</text>
      {[
        ["Compute", "Large GPU clusters (10,000+ GPUs possible)"],
        ["Duration", "Days to weeks of continuous operation"],
        ["Speed Priority", "Maximum compute throughput"],
        ["Purpose", "Creates the AI model from training data"],
        ["Memory Need", "Very large — model + gradients + optimizer"],
        ["GPU-to-GPU Comm", "Critical — constant gradient sync"],
        ["Storage", "Massive bandwidth for training data feed"],
        ["Scaling", "Fixed cluster size for training run"],
        ["Fault Tolerance", "Checkpointing — resume from last save"],
        ["Output", "Trained AI model weights (saved to storage)"],
      ].map(([k, v], i) => (
        <g key={k}>
          <rect x="22" y={60 + i * 19} width="368" height="17" rx="3" fill={i % 2 === 0 ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.12)"} />
          <text x="32" y={72 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#c4b5fd">{k}:</text>
          <text x="115" y={72 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e2e8f0">{v}</text>
        </g>
      ))}
      <text x="206" y="256" fontFamily="Arial,sans-serif" fontSize="8" fill="#818cf8" textAnchor="middle">One training run → One model created</text>

      {/* Inference panel */}
      <rect x="422" y="30" width="384" height="236" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="614" y="52" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">AI Inference — Using the AI Model</text>
      {[
        ["Compute", "Cost-efficient GPUs (L4, A10G, Inferentia)"],
        ["Duration", "Continuous 24/7 — users always requesting"],
        ["Speed Priority", "Low latency — user response in milliseconds"],
        ["Purpose", "Serves users with trained model"],
        ["Memory Need", "Moderate — only model weights needed"],
        ["GPU-to-GPU Comm", "Less critical — stateless per request"],
        ["Storage", "Model weights only (loaded at startup)"],
        ["Scaling", "Autoscales up/down with user traffic"],
        ["Fault Tolerance", "Load balancer + auto-restart"],
        ["Output", "Responses to millions of user requests"],
      ].map(([k, v], i) => (
        <g key={k}>
          <rect x="430" y={60 + i * 19} width="368" height="17" rx="3" fill={i % 2 === 0 ? "rgba(22,163,74,0.15)" : "rgba(22,163,74,0.05)"} />
          <text x="440" y={72 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#166534">{k}:</text>
          <text x="523" y={72 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1f2937">{v}</text>
        </g>
      ))}
      <text x="614" y="256" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">Continuous requests → Millions of responses daily</text>
    </svg>
  );
}
