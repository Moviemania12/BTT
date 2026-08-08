"use client";
export default function GpuJobScheduling() {
  return (
    <svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gjs-title">
      <title id="gjs-title">GPU Job Scheduling flow: Multiple users and teams submit AI jobs to the Job Queue. The Scheduler (Slurm or Kubernetes) checks available GPU resources, applies priority and fair-share rules, and assigns jobs to available GPU Compute Nodes. Jobs run on the cluster. When complete, resources are freed and returned to pool. Jobs that cannot run immediately wait in queue until resources become available.</title>
      <rect width="820" height="290" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">GPU JOB SCHEDULING — How Jobs Get Resources</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Jobs do not always start immediately. They wait in queue until resources become available. Scheduler ensures fair and efficient use of GPU resources.</text>

      {/* Users/Teams */}
      <rect x="14" y="50" width="136" height="210" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="82" y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#14532d" textAnchor="middle">Users / Teams</text>
      {[
        { name: "Research Team", job: "70B training" },
        { name: "Product Team", job: "Fine-tuning" },
        { name: "Dev Team", job: "Experiment" },
        { name: "Inference", job: "Serving job" },
      ].map((t, i) => (
        <g key={t.name}>
          <rect x="22" y={82 + i * 44} width="120" height="36" rx="5" fill="#16a34a" />
          <text x="82" y={97 + i * 44} fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#fff" textAnchor="middle">{t.name}</text>
          <text x="82" y={110 + i * 44} fontFamily="Arial,sans-serif" fontSize="7" fill="#bbf7d0" textAnchor="middle">{t.job}</text>
        </g>
      ))}

      <line x1="150" y1="155" x2="185" y2="155" stroke="#16a34a" strokeWidth="2" markerEnd="url(#gjs-ar)" />

      {/* Job Queue */}
      <rect x="186" y="50" width="144" height="210" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="258" y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#713f12" textAnchor="middle">Job Queue</text>
      <text x="258" y="82" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Waiting for resources</text>
      {["Job #47 — Priority HI", "Job #48 — Priority MED", "Job #49 — Priority MED", "Job #50 — Priority LO"].map((j, i) => (
        <g key={j}>
          <rect x="194" y={92 + i * 42} width="128" height="34" rx="4" fill={i === 0 ? "#ca8a04" : "#fef08a"} stroke="#ca8a04" strokeWidth="0.5" />
          <text x="258" y={107 + i * 42} fontFamily="Arial,sans-serif" fontSize="7" fontWeight={i === 0 ? "700" : "400"} fill={i === 0 ? "#fff" : "#713f12"} textAnchor="middle">{j}</text>
          <text x="258" y={120 + i * 42} fontFamily="Arial,sans-serif" fontSize="6.5" fill={i === 0 ? "#fef9c3" : "#92400e"} textAnchor="middle">{i === 0 ? "← Running NEXT" : "Waiting..."}</text>
        </g>
      ))}
      <text x="258" y="256" fontFamily="Arial,sans-serif" fontSize="7" fill="#92400e" textAnchor="middle">Jobs may wait minutes to hours</text>

      <line x1="330" y1="155" x2="365" y2="155" stroke="#ca8a04" strokeWidth="2" markerEnd="url(#gjs-ar2)" />

      {/* Scheduler */}
      <rect x="366" y="90" width="138" height="130" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="435" y="113" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#4c1d95" textAnchor="middle">Scheduler</text>
      <text x="435" y="128" fontFamily="Arial,sans-serif" fontSize="8" fill="#6d28d9" textAnchor="middle">(Slurm / Kubernetes)</text>
      <text x="435" y="148" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Checks available GPUs</text>
      <text x="435" y="161" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Applies priority rules</text>
      <text x="435" y="174" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Fair share enforcement</text>
      <text x="435" y="187" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Gang scheduling</text>
      <text x="435" y="200" fontFamily="Arial,sans-serif" fontSize="7" fill="#5b21b6" textAnchor="middle">Quota management</text>
      <text x="435" y="212" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="#7c3aed" textAnchor="middle">Assigns resources →</text>

      <line x1="504" y1="155" x2="539" y2="155" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#gjs-ar3)" />

      {/* GPU Cluster nodes */}
      <rect x="540" y="50" width="266" height="210" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <text x="673" y="70" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#94a3b8" textAnchor="middle">GPU Cluster — Available Nodes</text>
      {[
        { label: "Nodes 1–8", status: "Running Job #45", busy: true },
        { label: "Nodes 9–16", status: "Running Job #46", busy: true },
        { label: "Nodes 17–24", status: "FREE → next job!", busy: false },
        { label: "Nodes 25–32", status: "FREE → next job!", busy: false },
      ].map((n, i) => (
        <g key={n.label}>
          <rect x="550" y={82 + i * 46} width="246" height="38" rx="5" fill={n.busy ? "#7c3aed" : "#16a34a"} />
          <text x="673" y={99 + i * 46} fontFamily="Arial,sans-serif" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">{n.label} (8 GPUs each = 64 GPUs)</text>
          <text x="673" y={113 + i * 46} fontFamily="Arial,sans-serif" fontSize="7" fill={n.busy ? "#ddd6fe" : "#bbf7d0"} textAnchor="middle">{n.status}</text>
        </g>
      ))}
      <text x="673" y="272" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">Jobs complete → resources freed → returned to pool</text>

      <defs>
        <marker id="gjs-ar" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#16a34a" /></marker>
        <marker id="gjs-ar2" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#ca8a04" /></marker>
        <marker id="gjs-ar3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="#7c3aed" /></marker>
      </defs>
    </svg>
  );
}
