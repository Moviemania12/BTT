"use client";
export default function LinuxMemoryView() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linux memory breakdown bar: total RAM split into used by applications, buffers and page cache that can be reclaimed, and free, with available memory marked, and swap below" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="400" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Where Does the RAM Go? — Reading "free -h" Correctly</text>
      <text x="30" y="56" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">Total RAM (example: 256 GB)</text>
      <rect x="30" y="64" width="800" height="56" rx="6" fill="#f8fafc" stroke="#222" strokeWidth="2" />
      <rect x="30" y="64" width="360" height="56" rx="6" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
      <text x="210" y="90" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#991b1b">USED by applications</text>
      <text x="210" y="106" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#7f1d1d">~115 GB — cannot be taken back</text>
      <rect x="390" y="64" width="320" height="56" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="550" y="90" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#92400e">buff/cache</text>
      <text x="550" y="106" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#78350f">~100 GB — file cache, reclaimable</text>
      <rect x="710" y="64" width="120" height="56" rx="6" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
      <text x="770" y="90" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#166534">FREE</text>
      <text x="770" y="106" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#14532d">~41 GB</text>
      <path d="M390,134 L830,134" stroke="#16a34a" strokeWidth="3" />
      <line x1="390" y1="128" x2="390" y2="140" stroke="#16a34a" strokeWidth="3" /><line x1="830" y1="128" x2="830" y2="140" stroke="#16a34a" strokeWidth="3" />
      <text x="610" y="154" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#166534">AVAILABLE ≈ free + reclaimable cache ≈ 141 GB  ← the number that matters</text>

      <rect x="30" y="176" width="390" height="130" rx="8" fill="#eff6ff" stroke="#2563eb" />
      <text x="225" y="196" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">Healthy signs</text>
      <text x="44" y="218" fontFamily={f} fontSize="10" fill="#374151">• "free" is small but "available" is large → normal</text>
      <text x="44" y="236" fontFamily={f} fontSize="10" fill="#374151">• Linux uses spare RAM as file cache on purpose</text>
      <text x="44" y="254" fontFamily={f} fontSize="10" fill="#374151">• Swap usage is stable, si/so near 0 in vmstat</text>
      <text x="44" y="272" fontFamily={f} fontSize="10" fill="#374151">• No OOM-kill lines in kernel log</text>
      <rect x="440" y="176" width="390" height="130" rx="8" fill="#fef2f2" stroke="#dc2626" />
      <text x="635" y="196" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#991b1b">Danger signs</text>
      <text x="454" y="218" fontFamily={f} fontSize="10" fill="#374151">• "available" very low and falling</text>
      <text x="454" y="236" fontFamily={f} fontSize="10" fill="#374151">• Swap-in / swap-out (si/so) constantly non-zero</text>
      <text x="454" y="254" fontFamily={f} fontSize="10" fill="#374151">• High page-fault rate, load average rising</text>
      <text x="454" y="272" fontFamily={f} fontSize="10" fill="#374151">• "Out of memory: Killed process" in dmesg</text>

      <rect x="30" y="324" width="800" height="52" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="344" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">"My server uses 90% memory!" is usually mostly cache. Check AVAILABLE, swap activity and OOM logs instead.</text>
      <text x="430" y="362" textAnchor="middle" fontFamily={f} fontSize="9" fill="#92400e">Numbers are an example. Containers and cgroup limits can still cause OOM even when the host shows free memory.</text>
    </svg>
  );
}
