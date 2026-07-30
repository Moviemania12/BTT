"use client";
export default function Ec2StorageDiagram() {
  return (
    <svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ec2s-title">
      <title id="ec2s-title">EC2 Instance and AWS Storage Types: EBS, S3, EFS, Instance Store</title>
      <rect width="820" height="380" fill="#ffffff" />
      <text x="410" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">EC2 + STORAGE: EBS, S3, EFS AND INSTANCE STORE</text>

      {/* EC2 instance box */}
      <rect x="280" y="42" width="260" height="130" rx="8" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" />
      <text x="410" y="65" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 INSTANCE</text>
      <text x="410" y="82" fontFamily="Arial,sans-serif" fontSize="9" fill="#bfdbfe" textAnchor="middle">AMI: OS + pre-installed software</text>
      <rect x="295" y="92" width="100" height="24" rx="4" fill="#1e3a8a" />
      <text x="345" y="108" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#93c5fd" textAnchor="middle">vCPU + Memory</text>
      <rect x="405" y="92" width="120" height="24" rx="4" fill="#1e3a8a" />
      <text x="465" y="108" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#93c5fd" textAnchor="middle">Network Performance</text>
      <rect x="295" y="124" width="230" height="38" rx="4" fill="#dc2626" />
      <text x="410" y="140" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Instance Store (ephemeral)</text>
      <text x="410" y="155" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#fecaca" textAnchor="middle">Data LOST on stop/terminate — NOT persistent</text>

      {/* EBS */}
      <rect x="30" y="210" width="190" height="140" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="125" y="232" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">EBS</text>
      <text x="125" y="248" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#3730a3" textAnchor="middle">Elastic Block Store</text>
      <text x="125" y="264" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Block storage — like SAN/iSCSI disk</text>
      <text x="125" y="280" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Persistent — survives stop/start</text>
      <text x="125" y="296" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">Snapshotable to S3</text>
      <text x="125" y="312" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1d4ed8" textAnchor="middle">1 volume : 1 EC2 (standard)</text>
      <rect x="42" y="322" width="166" height="20" rx="4" fill="#dbeafe" />
      <text x="125" y="336" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af" textAnchor="middle">Stays in same AZ as instance</text>

      {/* S3 */}
      <rect x="315" y="210" width="190" height="140" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="410" y="232" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">S3</text>
      <text x="410" y="248" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Simple Storage Service</text>
      <text x="410" y="264" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Object storage — key-value at scale</text>
      <text x="410" y="280" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Not mountable as filesystem</text>
      <text x="410" y="296" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Accessed via APIs/URLs</text>
      <text x="410" y="312" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#15803d" textAnchor="middle">Redundant across devices/facilities</text>
      <rect x="327" y="322" width="166" height="20" rx="4" fill="#bbf7d0" />
      <text x="410" y="336" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#14532d" textAnchor="middle">Backups, static files, data lake</text>

      {/* EFS */}
      <rect x="600" y="210" width="190" height="140" rx="8" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="695" y="232" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#9a3412" textAnchor="middle">EFS</text>
      <text x="695" y="248" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Elastic File System</text>
      <text x="695" y="264" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Managed NFS — mountable</text>
      <text x="695" y="280" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Multiple EC2 simultaneously</text>
      <text x="695" y="296" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Multi-AZ capable</text>
      <text x="695" y="312" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#c2410c" textAnchor="middle">Grows/shrinks automatically</text>
      <rect x="612" y="322" width="166" height="20" rx="4" fill="#fed7aa" />
      <text x="695" y="336" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#9a3412" textAnchor="middle">Shared workloads, content repos</text>

      {/* Connections from EC2 */}
      <line x1="280" y1="172" x2="125" y2="210" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="410" y1="172" x2="410" y2="210" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
      <line x1="540" y1="172" x2="695" y2="210" stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,3" />

      {/* Labels on connections */}
      <text x="180" y="196" fontFamily="Arial,sans-serif" fontSize="8" fill="#2563EB" textAnchor="middle">Network attach</text>
      <text x="430" y="196" fontFamily="Arial,sans-serif" fontSize="8" fill="#16a34a" textAnchor="middle">API</text>
      <text x="640" y="196" fontFamily="Arial,sans-serif" fontSize="8" fill="#f97316" textAnchor="middle">Mount</text>

      <text x="410" y="368" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#64748b" textAnchor="middle">Instance Store ≠ EBS. Instance store data is lost on stop/terminate. EBS persists independently of instance lifecycle.</text>
    </svg>
  );
}
