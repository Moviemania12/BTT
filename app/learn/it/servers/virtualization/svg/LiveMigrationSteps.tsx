"use client";
export default function LiveMigrationSteps() {
  const f = "Arial,sans-serif";
  const steps = [
    { x: 20, c: "#2563eb", t: "1. Check", s: ["Destination has CPU,", "RAM, network, storage", "access and compatible", "CPU features"] },
    { x: 190, c: "#16a34a", t: "2. Pre-copy", s: ["Copy memory pages while", "VM keeps running on", "the source host"] },
    { x: 360, c: "#d97706", t: "3. Iterate", s: ["Re-copy pages that", "changed (“dirty pages”).", "Repeat until the rest", "is small"] },
    { x: 530, c: "#dc2626", t: "4. Switch-over", s: ["Pause VM for a moment", "(ms to seconds). Send last", "pages + CPU state.", "Resume on destination"] },
    { x: 700, c: "#7c3aed", t: "5. Clean-up", s: ["Network announces new", "location (e.g. RARP/GARP).", "Source memory freed.", "VM keeps same IP / MAC"] },
  ];
  return (
    <svg viewBox="0 0 860 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Live migration in five steps: check, pre-copy memory, iterate dirty pages, short switch-over, clean-up" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="lmArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
      <rect width="860" height="410" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Live Migration — Moving a Running VM Between Hosts</text>
      {steps.map((k, i) => (
        <g key={i}>
          <rect x={k.x} y="46" width="150" height="128" rx="8" fill="#fff" stroke={k.c} strokeWidth="2.2" />
          <text x={k.x + 75} y="68" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill={k.c}>{k.t}</text>
          {k.s.map((l, j) => <text key={j} x={k.x + 75} y={90 + j * 16} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{l}</text>)}
          {i < 4 && <line x1={k.x + 150} y1="110" x2={k.x + 170} y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#lmArr)" />}
        </g>
      ))}
      <rect x="40" y="200" width="330" height="90" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="222" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#1e40af">Source host</text>
      <rect x="60" y="236" width="290" height="38" rx="4" fill="#dbeafe" stroke="#2563eb" />
      <text x="205" y="260" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#1e40af">VM running → memory pages copied out → VM stopped at switch-over</text>
      <rect x="490" y="200" width="330" height="90" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="655" y="222" textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#166534">Destination host</text>
      <rect x="510" y="236" width="290" height="38" rx="4" fill="#dcfce7" stroke="#16a34a" />
      <text x="655" y="260" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#166534">pages arrive → state restored → VM resumes</text>
      <line x1="370" y1="245" x2="490" y2="245" stroke="#475569" strokeWidth="3" markerEnd="url(#lmArr)" />
      <text x="430" y="237" textAnchor="middle" fontFamily={f} fontSize="9" fontWeight="700" fill="#374151">dedicated migration network</text>
      <rect x="20" y="308" width="820" height="88" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="328" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">When migration struggles</text>
      <text x="430" y="346" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">VMs that change memory faster than the network can copy never “converge” — use faster / dedicated links, compression or throttle the VM.</text>
      <text x="430" y="362" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Passthrough devices (GPU, some NICs) usually block live migration. CPU feature mismatch needs a compatibility mode (e.g. EVC).</text>
      <text x="430" y="380" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Cross-storage migration also copies the disks — much longer and heavier on the storage network.</text>
    </svg>
  );
}
