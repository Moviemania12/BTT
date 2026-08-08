"use client";
export default function AiPodFactory() {
  return (
    <svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="apf-title">
      <title id="apf-title">AI scale hierarchy from smallest to largest: GPU (single chip, the AI math engine), AI Compute Node (1 server with 8 GPUs), Rack (4-8 servers per rack), AI Pod (multiple racks with networking and storage as one validated unit, examples: NVIDIA DGX SuperPOD, Dell AI Factory Pod, HPE AI Pod), AI Cluster (multiple pods connected), AI Data Center (physical building), AI Factory (complete AI production environment with data center plus software pipelines plus operations). Raw data goes in, AI models come out.</title>
      <rect width="820" height="300" fill="#fff" />
      <text x="410" y="18" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">SCALE HIERARCHY — From One GPU to AI Factory</text>
      <text x="410" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">AI Factory is not just a data center — it is the complete AI production environment including software, pipelines, and operations.</text>

      {/* Nested boxes — smallest to largest */}
      {/* GPU chip */}
      <rect x="360" y="44" width="100" height="46" rx="5" fill="#7c3aed" />
      <text x="410" y="65" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">GPU Chip</text>
      <text x="410" y="79" fontFamily="Arial,sans-serif" fontSize="7" fill="#ddd6fe" textAnchor="middle">The AI Math Engine</text>

      {/* AI Compute Node */}
      <rect x="310" y="98" width="200" height="46" rx="5" fill="#4c1d95" />
      <text x="410" y="119" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#00d4ff" textAnchor="middle">AI Compute Node (GPU Server)</text>
      <text x="410" y="133" fontFamily="Arial,sans-serif" fontSize="7" fill="#c4b5fd" textAnchor="middle">8 GPUs · 640 GB memory · ~$300K</text>

      {/* Rack */}
      <rect x="240" y="152" width="340" height="44" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      <text x="410" y="172" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#94a3b8" textAnchor="middle">Rack — 4–8 Servers</text>
      <text x="410" y="186" fontFamily="Arial,sans-serif" fontSize="7" fill="#64748b" textAnchor="middle">~40 kW power · Liquid cooling · InfiniBand uplinks</text>

      {/* AI Pod */}
      <rect x="140" y="200" width="540" height="42" rx="5" fill="#0f766e" />
      <text x="410" y="218" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Pod — Multiple Racks + Networking + Storage</text>
      <text x="410" y="230" fontFamily="Arial,sans-serif" fontSize="7" fill="#99f6e4" textAnchor="middle">NVIDIA DGX SuperPOD · Dell AI Factory Pod · HPE AI Pod · Supermicro AI Pod (industry-wide concept)</text>

      {/* AI Data Center */}
      <rect x="40" y="248" width="740" height="28" rx="5" fill="#0284c7" />
      <text x="410" y="266" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">AI Data Center — The Physical Building (multiple AI Pods + power + cooling + network)</text>

      {/* AI Factory (outermost) */}
      <rect x="14" y="280" width="792" height="18" rx="4" fill="#dc2626" />
      <text x="410" y="294" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff" textAnchor="middle">AI Factory = AI Data Center(s) + Data Pipelines + AI Frameworks + Model Training + Model Deployment + Operations</text>

      {/* Labels on right */}
      <text x="474" y="70" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569">700W · AI math chip</text>
      <text x="524" y="124" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569">1 high-density server</text>
      <text x="594" y="178" fontFamily="Arial,sans-serif" fontSize="7" fill="#475569">4–8 servers stacked</text>
    </svg>
  );
}
