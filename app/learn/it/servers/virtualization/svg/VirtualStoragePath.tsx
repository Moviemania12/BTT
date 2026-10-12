"use client";
export default function VirtualStoragePath() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, c: string, bg: string, a: string, b?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={bg} stroke={c} strokeWidth="2" />
      <text x={x + w / 2} y={y + (b ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="10" fontWeight="700" fill="#111827">{a}</text>
      {b && <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontFamily={f} fontSize="8.5" fill="#374151">{b}</text>}
    </g>
  );
  const arr = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="2" markerEnd="url(#spArr)" />;
  return (
    <svg viewBox="0 0 860 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Virtual storage path from guest application through guest file system, virtual disk controller, hypervisor storage stack, host HBA or NIC, storage network, storage array and LUN or volume, with latency measured at each layer" style={{ width: "100%", height: "auto" }}>
      <defs><marker id="spArr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#475569" /></marker></defs>
      <rect width="860" height="430" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Virtual Disk I/O Path — From Application to Storage Array</text>
      {box(20, 50, 130, 60, "#2563eb", "#eff6ff", "Guest app / DB", "issues read/write")}
      {arr(150, 80, 175, 80)}
      {box(175, 50, 130, 60, "#2563eb", "#eff6ff", "Guest file system", "+ guest disk driver")}
      {arr(305, 80, 330, 80)}
      {box(330, 50, 140, 60, "#7c3aed", "#f5f3ff", "Virtual disk controller", "(PVSCSI / virtio-scsi / NVMe)")}
      {arr(470, 80, 495, 80)}
      {box(495, 50, 150, 60, "#d97706", "#fffbeb", "Hypervisor storage stack", "queues, multipath, VMDK/VHDX/QCOW2")}
      {arr(645, 80, 670, 80)}
      {box(670, 50, 170, 60, "#0891b2", "#ecfeff", "Host HBA / NIC", "FC, iSCSI, NFS, NVMe-oF")}
      <line x1="755" y1="110" x2="755" y2="150" stroke="#475569" strokeWidth="2" markerEnd="url(#spArr)" />
      {box(670, 150, 170, 60, "#334155", "#f1f5f9", "Storage network", "SAN fabric / Ethernet")}
      <line x1="755" y1="210" x2="755" y2="250" stroke="#475569" strokeWidth="2" markerEnd="url(#spArr)" />
      {box(670, 250, 170, 60, "#16a34a", "#f0fdf4", "Storage array", "controllers, cache, disks")}
      {box(430, 250, 190, 60, "#16a34a", "#dcfce7", "LUN / volume / share", "carved out for datastore")}
      {arr(670, 280, 620, 280)}
      {box(190, 250, 190, 60, "#d97706", "#fffbeb", "Datastore", "VMFS / NFS / vSAN / CSV")}
      {arr(430, 280, 380, 280)}
      <text x="285" y="330" textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">Many VM disks share one datastore</text>
      <rect x="20" y="150" width="620" height="76" rx="6" fill="#fef2f2" stroke="#dc2626" />
      <text x="330" y="170" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#991b1b">Where to measure latency</text>
      <text x="330" y="188" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Guest latency (what the app sees) = hypervisor kernel latency + device (array) latency.</text>
      <text x="330" y="204" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">If kernel latency is high → host queue / path problem. If device latency is high → array, fabric or noisy neighbours.</text>
      <text x="330" y="220" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Typical production target: low milliseconds or less — verify against your SLA.</text>
      <rect x="20" y="346" width="820" height="70" rx="6" fill="#fffbeb" stroke="#f59e0b" />
      <text x="430" y="366" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#78350f">Operational pointers</text>
      <text x="430" y="384" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Thin disks save space but can overfill a datastore; snapshots add delta disks; noisy-neighbour VMs steal IOPS — use storage QoS where available.</text>
      <text x="430" y="402" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Multipathing (two HBAs, two fabrics) is the storage equivalent of dual power feeds. See SAN and NAS articles for the storage side.</text>
    </svg>
  );
}
