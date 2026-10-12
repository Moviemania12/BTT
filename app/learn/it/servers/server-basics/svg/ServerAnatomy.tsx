"use client";
export default function ServerAnatomy() {
  const f = "Arial,sans-serif";
  const box = (x: number, y: number, w: number, h: number, fill: string, stroke: string, t: string, s?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <text x={x + w / 2} y={y + (s ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontFamily={f} fontSize="11" fontWeight="700" fill="#111827">{t}</text>
      {s && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontFamily={f} fontSize="9" fill="#374151">{s}</text>}
    </g>
  );
  return (
    <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Block diagram of a dual-socket server showing CPUs, memory channels, PCIe devices, storage, network, BMC and power supplies" style={{ width: "100%", height: "auto" }}>
      <rect width="860" height="420" fill="#fff" />
      <text x="430" y="26" textAnchor="middle" fontFamily={f} fontSize="14" fontWeight="700" fill="#111827">Inside a 2-Socket Server — Block Diagram</text>
      <text x="430" y="43" textAnchor="middle" fontFamily={f} fontSize="10" fill="#6b7280">Simplified view — exact topology differs by CPU generation and server model</text>

      {/* Memory */}
      {box(30, 70, 150, 54, "#f5f3ff", "#7c3aed", "DIMM Channels", "RDIMM / ECC — CPU 0")}
      {box(30, 250, 150, 54, "#f5f3ff", "#7c3aed", "DIMM Channels", "RDIMM / ECC — CPU 1")}
      {/* CPUs */}
      {box(250, 70, 150, 54, "#eff6ff", "#2563eb", "CPU 0 (Socket 0)", "Cores + cache + mem ctrl")}
      {box(250, 250, 150, 54, "#eff6ff", "#2563eb", "CPU 1 (Socket 1)", "Cores + cache + mem ctrl")}
      <line x1="180" y1="97" x2="250" y2="97" stroke="#7c3aed" strokeWidth="2" />
      <line x1="180" y1="277" x2="250" y2="277" stroke="#7c3aed" strokeWidth="2" />
      {/* Interconnect */}
      <line x1="325" y1="124" x2="325" y2="250" stroke="#dc2626" strokeWidth="3" strokeDasharray="6 3" />
      <text x="333" y="192" fontFamily={f} fontSize="9.5" fontWeight="700" fill="#dc2626">Socket link</text>
      <text x="333" y="205" fontFamily={f} fontSize="9" fill="#6b7280">(UPI / xGMI) — NUMA</text>

      {/* PCIe devices */}
      {box(480, 60, 150, 40, "#fff7ed", "#f97316", "NVMe / U.2 drives", "PCIe lanes")}
      {box(480, 110, 150, 40, "#fff7ed", "#f97316", "GPU / Accelerator", "PCIe x16")}
      {box(480, 240, 150, 40, "#fff7ed", "#f97316", "NIC 25/100GbE", "PCIe / OCP 3.0 card")}
      {box(480, 290, 150, 40, "#fff7ed", "#f97316", "RAID / HBA", "SAS/SATA drive bays")}
      <line x1="400" y1="90" x2="480" y2="80" stroke="#f97316" strokeWidth="2" />
      <line x1="400" y1="104" x2="480" y2="130" stroke="#f97316" strokeWidth="2" />
      <line x1="400" y1="270" x2="480" y2="260" stroke="#f97316" strokeWidth="2" />
      <line x1="400" y1="285" x2="480" y2="310" stroke="#f97316" strokeWidth="2" />

      {/* BMC + PCH */}
      {box(690, 70, 140, 54, "#eff6ff", "#2563eb", "BMC (iDRAC / iLO)", "Own CPU + NIC port")}
      {box(690, 160, 140, 54, "#f0fdf4", "#16a34a", "Chipset / PCH", "USB, boot M.2, TPM")}
      {box(690, 250, 140, 54, "#fef3c7", "#f59e0b", "UEFI Firmware", "POST + boot order")}
      <line x1="630" y1="187" x2="690" y2="187" stroke="#16a34a" strokeWidth="2" />
      <line x1="760" y1="124" x2="760" y2="160" stroke="#2563eb" strokeWidth="2" />
      <line x1="760" y1="214" x2="760" y2="250" stroke="#f59e0b" strokeWidth="2" />

      {/* Power + fans */}
      <rect x="30" y="340" width="800" height="62" rx="10" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="50" y="352" width="140" height="38" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.6" />
      <text x="120" y="375" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#166534">PSU 1 ← Feed A</text>
      <rect x="205" y="352" width="140" height="38" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.6" />
      <text x="275" y="375" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#166534">PSU 2 ← Feed B</text>
      <rect x="380" y="352" width="200" height="38" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.6" />
      <text x="480" y="375" textAnchor="middle" fontFamily={f} fontSize="10.5" fontWeight="700" fill="#1e40af">Hot-swap Fans (N+1 modules)</text>
      <text x="705" y="368" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">Front-to-back airflow:</text>
      <text x="705" y="383" textAnchor="middle" fontFamily={f} fontSize="9.5" fill="#374151">cold-aisle air in → hot-aisle out</text>
    </svg>
  );
}
