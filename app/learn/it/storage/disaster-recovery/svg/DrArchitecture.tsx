"use client";
// DR D5 — End-to-End Primary → DR Site Architecture
export default function DrArchitecture() {
  const ITEM_H  = 16;
  const HEAD_H  = 28;
  const PAD_V   = 4;
  const ARR_H   = 14;

  const primary = [
    { label: "USERS / EXTERNAL DNS / GSLB",   border: "#374151", bg: "#f9fafb", tc: "#374151", items: ["External users · Global traffic manager · Health-check-based routing"] },
    { label: "WAF / LOAD BALANCER",            border: "#7c3aed", bg: "#ede9fe", tc: "#5b21b6", items: ["Web Application Firewall · Layer 7 load balancer"] },
    { label: "APPLICATION SERVERS",            border: "#2563eb", bg: "#dbeafe", tc: "#1e40af", items: ["App servers (clustered, HA) · Dependencies: DB, identity, cache"] },
    { label: "DATABASE TIER",                  border: "#ca8a04", bg: "#fef9c3", tc: "#92400e", items: ["SQL Always On AG / Oracle Data Guard / replication source"] },
    { label: "STORAGE (REPLICATION SOURCE)",   border: "#ea580c", bg: "#fff7ed", tc: "#c2410c", items: ["SAN/NAS · Array-level replication · Block/file to DR site"] },
    { label: "AD / DNS / IDENTITY",            border: "#15803d", bg: "#dcfce7", tc: "#15803d", items: ["Domain Controllers · Internal DNS · Certificate Services"] },
    { label: "BACKUP INFRASTRUCTURE",          border: "#374151", bg: "#f1f5f9", tc: "#374151", items: ["Backup server · Proxy · Primary repo · Offsite/immutable copies"] },
  ];

  const drSite = [
    { label: "DR LOAD BALANCER",               border: "#7c3aed", bg: "#ede9fe", tc: "#5b21b6", items: ["Activated on failover · Same rule set as primary"] },
    { label: "DR APPLICATION SERVERS",         border: "#2563eb", bg: "#dbeafe", tc: "#1e40af", items: ["Standby (hot) or scaled-down (warm) · Config mirrors primary"] },
    { label: "DR DATABASE",                    border: "#ca8a04", bg: "#fef9c3", tc: "#92400e", items: ["Replication target → promoted read-write on failover"] },
    { label: "DR STORAGE (REPLICATION TARGET)",border: "#ea580c", bg: "#fff7ed", tc: "#c2410c", items: ["Receives array replication · LUNs in standby → read-write on failover"] },
    { label: "DR AD / DNS",                    border: "#15803d", bg: "#dcfce7", tc: "#15803d", items: ["Writeable DCs at DR site · AD replication currency monitored daily"] },
    { label: "DR BACKUP / IMMUTABLE COPIES",   border: "#374151", bg: "#f1f5f9", tc: "#374151", items: ["Offsite backup copies · Immutable repository · Not in replication path"] },
  ];

  const layerH = (items: string[]) => HEAD_H + items.length * ITEM_H + PAD_V * 2;

  const primaryH  = primary.reduce((s, l) => s + layerH(l.items) + ARR_H, 0);
  const drH       = drSite.reduce((s, l) => s + layerH(l.items) + ARR_H, 0);
  const linkH     = 52;
  const totalH    = 20 + primaryH + linkH + drH + 8;

  let yP = 20;
  let yD = 20 + primaryH + linkH;

  return (
    <svg viewBox={`0 0 480 ${totalH}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="End-to-end primary to DR site architecture"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif", display: "block" }}>
      <rect width="480" height={totalH} fill="#f8fafc" rx="10"/>

      {/* Primary site layers */}
      {primary.map((layer, li) => {
        const h = layerH(layer.items);
        const ey = yP;
        const el = (
          <g key={li}>
            <rect x="10" y={ey} width="460" height={h} rx="6" fill={layer.bg} stroke={layer.border} strokeWidth="1.5"/>
            <rect x="10" y={ey} width="460" height={HEAD_H} rx="6" fill={layer.border}/>
            <rect x="10" y={ey + HEAD_H - 4} width="460" height="4" fill={layer.border}/>
            <text x="240" y={ey + HEAD_H - 8} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{layer.label}</text>
            {layer.items.map((item, ii) => (
              <text key={ii} x="18" y={ey + HEAD_H + PAD_V + ii * ITEM_H + 12}
                fontSize="9" fill={layer.tc}>{item}</text>
            ))}
            {li < primary.length - 1 && (
              <g>
                <line x1="240" y1={ey+h} x2="240" y2={ey+h+ARR_H-4} stroke={layer.border} strokeWidth="2"/>
                <polygon points={`235,${ey+h+ARR_H-4} 245,${ey+h+ARR_H-4} 240,${ey+h+ARR_H}`} fill={layer.border}/>
              </g>
            )}
          </g>
        );
        yP += h + ARR_H;
        return el;
      })}

      {/* DR Link */}
      {(() => {
        const linkY = 20 + primaryH;
        return (
          <g>
            <rect x="10" y={linkY} width="460" height={linkH} rx="6" fill="#1e293b"/>
            <text x="240" y={linkY + 16} textAnchor="middle" fontSize="10" fontWeight="700" fill="#f8fafc">━━━ DR LINK ━━━</text>
            <text x="240" y={linkY + 30} textAnchor="middle" fontSize="9" fill="#94a3b8">Dedicated MPLS / SD-WAN / Dark Fiber or Internet VPN</text>
            <text x="240" y={linkY + 43} textAnchor="middle" fontSize="9" fill="#94a3b8">Synchronous or Asynchronous replication + production failover traffic</text>
          </g>
        );
      })()}

      {/* DR site layers */}
      {drSite.map((layer, li) => {
        const h = layerH(layer.items);
        const ey = yD;
        const el = (
          <g key={li}>
            <rect x="10" y={ey} width="460" height={h} rx="6" fill={layer.bg} stroke={layer.border} strokeWidth="1.5" strokeDasharray="4 2"/>
            <rect x="10" y={ey} width="460" height={HEAD_H} rx="6" fill={layer.border}/>
            <rect x="10" y={ey + HEAD_H - 4} width="460" height="4" fill={layer.border}/>
            <text x="240" y={ey + HEAD_H - 8} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff">{layer.label}</text>
            {layer.items.map((item, ii) => (
              <text key={ii} x="18" y={ey + HEAD_H + PAD_V + ii * ITEM_H + 12}
                fontSize="9" fill={layer.tc}>{item}</text>
            ))}
            {li < drSite.length - 1 && (
              <g>
                <line x1="240" y1={ey+h} x2="240" y2={ey+h+ARR_H-4} stroke={layer.border} strokeWidth="2"/>
                <polygon points={`235,${ey+h+ARR_H-4} 245,${ey+h+ARR_H-4} 240,${ey+h+ARR_H}`} fill={layer.border}/>
              </g>
            )}
          </g>
        );
        yD += h + ARR_H;
        return el;
      })}
    </svg>
  );
}
