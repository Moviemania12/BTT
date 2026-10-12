"use client";
export default function VirtualisationStack() {
  const f = "Arial,sans-serif";
  return (
    <svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="How hardware-assisted virtualisation works: guest code runs directly on the CPU, privileged operations cause a VM exit to the hypervisor, memory is translated through nested page tables, and I/O goes through virtio or passthrough" style={{ width: "100%", height: "auto" }}>
      <defs>
        <marker id="vsArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker>
      </defs>
      <rect width="860" height="430" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Hardware-Assisted Virtualisation — CPU, Memory and I/O</text>
      <rect x="20" y="46" width="270" height="250" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="155" y="68" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#1e40af">① CPU — guest mode</text>
      <rect x="38" y="82" width="234" height="48" rx="5" fill="#dbeafe" stroke="#2563eb" />
      <text x="155" y="102" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#1e40af">Guest OS + apps run here</text>
      <text x="155" y="118" textAnchor="middle" fontFamily={f} fontSize="9" fill="#1e40af">normal instructions: native speed</text>
      <rect x="38" y="200" width="234" height="48" rx="5" fill="#fef3c7" stroke="#d97706" />
      <text x="155" y="220" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#78350f">Hypervisor (root mode)</text>
      <text x="155" y="236" textAnchor="middle" fontFamily={f} fontSize="9" fill="#78350f">handles the trapped operation</text>
      <line x1="120" y1="130" x2="120" y2="200" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#vsArr)" />
      <text x="112" y="168" textAnchor="end" fontFamily={f} fontSize="9" fontWeight="700" fill="#dc2626">VM exit</text>
      <line x1="190" y1="200" x2="190" y2="130" stroke="#16a34a" strokeWidth="2.2" markerEnd="url(#vsArr)" />
      <text x="198" y="168" fontFamily={f} fontSize="9" fontWeight="700" fill="#16a34a">VM entry</text>
      <text x="155" y="272" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Intel VT-x / AMD-V make this switch cheap</text>
      <text x="155" y="286" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Too many exits = slow VM</text>

      <rect x="305" y="46" width="270" height="250" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="440" y="68" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#166534">② Memory — two-level translation</text>
      <rect x="322" y="82" width="236" height="34" rx="5" fill="#dcfce7" stroke="#16a34a" />
      <text x="440" y="103" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#166534">Guest virtual address (app)</text>
      <line x1="440" y1="116" x2="440" y2="134" stroke="#475569" strokeWidth="2" markerEnd="url(#vsArr)" />
      <rect x="322" y="136" width="236" height="34" rx="5" fill="#dcfce7" stroke="#16a34a" />
      <text x="440" y="157" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#166534">Guest physical address (guest OS page table)</text>
      <line x1="440" y1="170" x2="440" y2="188" stroke="#475569" strokeWidth="2" markerEnd="url(#vsArr)" />
      <rect x="322" y="190" width="236" height="34" rx="5" fill="#fef3c7" stroke="#d97706" />
      <text x="440" y="211" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#78350f">Host physical address (EPT / NPT table)</text>
      <text x="440" y="246" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Hardware walks both tables itself</text>
      <text x="440" y="260" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">(Extended / Nested Page Tables) —</text>
      <text x="440" y="274" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">no slow software shadow tables.</text>
      <text x="440" y="288" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Large pages reduce translation cost.</text>

      <rect x="590" y="46" width="250" height="250" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <text x="715" y="68" textAnchor="middle" fontFamily={f} fontSize="11.5" fontWeight="700" fill="#5b21b6">③ I/O — three options</text>
      <rect x="606" y="82" width="218" height="52" rx="5" fill="#ede9fe" stroke="#7c3aed" />
      <text x="715" y="102" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Emulated device</text>
      <text x="715" y="118" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">compatible but slow (old NIC/disk model)</text>
      <rect x="606" y="142" width="218" height="52" rx="5" fill="#ede9fe" stroke="#7c3aed" />
      <text x="715" y="162" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Paravirtual (virtio / VMXNET / PV)</text>
      <text x="715" y="178" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">guest driver knows it is virtual — fast</text>
      <rect x="606" y="202" width="218" height="52" rx="5" fill="#ede9fe" stroke="#7c3aed" />
      <text x="715" y="222" textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#5b21b6">Passthrough / SR-IOV</text>
      <text x="715" y="238" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">VM talks to real device (IOMMU / VT-d)</text>
      <text x="715" y="276" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Speed ↑ but flexibility / live migration ↓</text>

      <rect x="20" y="318" width="820" height="98" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="338" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">What a data center engineer should remember</text>
      <text x="430" y="356" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">• VT-x/AMD-V, EPT/NPT and VT-d/IOMMU must be enabled in the BIOS; without them the hypervisor falls back to slow software tricks or refuses to start VMs.</text>
      <text x="430" y="372" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">• Install guest tools / paravirtual drivers (VMware Tools, virtio, Hyper-V Integration Services) — they are the difference between slow and fast I/O.</text>
      <text x="430" y="388" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">• Passthrough gives near-native speed (GPU, NIC) but ties the VM to one host — plan HA and migration accordingly.</text>
      <text x="430" y="406" textAnchor="middle" fontFamily={f} fontSize="9" fill="#6b7280">Terminology differs by vendor; the three-part model (CPU, memory, I/O) is universal.</text>
    </svg>
  );
}
