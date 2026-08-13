"use client";
export default function TrainingVsInference() {
  return (
    <svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="tvi-title">
      <title id="tvi-title">Training vs Inference Infrastructure Comparison. Training (left): Massive scale GPU clusters, high-speed InfiniBand interconnect for gradient sync, large checkpoint storage petabytes, weeks to months duration, one-time or periodic workload, optimize for throughput. Inference (right): Globally distributed smaller clusters, high concurrency many simultaneous users, low latency priority, model weights preloaded in VRAM, autoscaling with demand, continuous workload, optimize for latency and cost per token.</title>
      <rect width="820" height="280" fill="#fff" />
      <text x="410" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">TRAINING vs INFERENCE INFRASTRUCTURE</text>
      <text x="410" y="34" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Same models — completely different infrastructure requirements and optimization goals</text>

      {/* Training */}
      <rect x="14" y="44" width="380" height="220" rx="8" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="204" y="66" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#c4b5fd" textAnchor="middle">TRAINING</text>
      <text x="204" y="80" fontFamily="Arial,sans-serif" fontSize="8" fill="#a78bfa" textAnchor="middle">One-time or periodic large compute job</text>

      {[
        { label: "Scale", val: "Massive GPU clusters — tens of thousands of GPUs for frontier models" },
        { label: "Interconnect", val: "High-speed fabric (InfiniBand/RoCE) — gradient sync requires every GPU to communicate every step" },
        { label: "Storage", val: "Petabytes — training data + periodic checkpoints (100s of GB per checkpoint)" },
        { label: "Duration", val: "Weeks to months — long-running single job" },
        { label: "Workload type", val: "Periodic (train once, deploy) — not continuous" },
        { label: "Optimize for", val: "Throughput (samples/second) — maximize compute utilization" },
        { label: "Failure tolerance", val: "Checkpoint-based recovery — restart from last checkpoint" },
        { label: "Cost model", val: "Large upfront compute cost — amortized over model lifetime" },
      ].map((item, i) => (
        <g key={item.label}>
          <text x="28" y={105 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#c4b5fd">{item.label}:</text>
          <text x="115" y={105 + i * 19} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)">{item.val}</text>
        </g>
      ))}

      {/* Inference */}
      <rect x="426" y="44" width="380" height="220" rx="8" fill="#0c1a2e" stroke="#0284c7" strokeWidth="1.5" />
      <text x="616" y="66" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#7dd3fc" textAnchor="middle">INFERENCE</text>
      <text x="616" y="80" fontFamily="Arial,sans-serif" fontSize="8" fill="#38bdf8" textAnchor="middle">Continuous serving to millions of users</text>

      {[
        { label: "Scale", val: "Many smaller clusters globally distributed — near users" },
        { label: "Interconnect", val: "Lower bandwidth per node vs training — model parallelism across fewer GPUs" },
        { label: "Storage", val: "Model weights in VRAM (fast) + cold model storage — minimal active dataset" },
        { label: "Duration", val: "Continuous 24/7 — always-on serving" },
        { label: "Workload type", val: "Continuous high-concurrency — millions of simultaneous requests" },
        { label: "Optimize for", val: "Latency (time to first token, tokens/sec) + cost per token" },
        { label: "Failure tolerance", val: "Load balancing — failed server = route to another; no job loss" },
        { label: "Cost model", val: "Continuous OpEx — per-token revenue must cover per-token compute cost" },
      ].map((item, i) => (
        <g key={item.label}>
          <text x="440" y={105 + i * 19} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#7dd3fc">{item.label}:</text>
          <text x="530" y={105 + i * 19} fontFamily="Arial,sans-serif" fontSize="7" fill="rgba(255,255,255,0.85)">{item.val}</text>
        </g>
      ))}
    </svg>
  );
}
