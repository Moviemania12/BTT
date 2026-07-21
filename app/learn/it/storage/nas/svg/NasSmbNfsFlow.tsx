"use client";
// Diagram 5 — SMB vs NFS Protocol Comparison Access Flow
// Future image: /public/images/articles/nas/nas-smb-vs-nfs.png
export default function NasSmbNfsFlow() {
  return (
    <svg viewBox="0 0 860 310" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="SMB vs NFS protocol comparison access flow"
      style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <rect width="860" height="310" fill="#f8fafc" rx="12"/>
      <text x="430" y="24" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">SMB vs NFS — Protocol Access Flow</text>

      {/* SMB side */}
      <rect x="30" y="38" width="360" height="240" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5"/>
      <text x="210" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">SMB — Windows Protocol</text>
      <rect x="50" y="68" width="320" height="26" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="210" y="85" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Windows Client</text>
      <text x="210" y="104" textAnchor="middle" fontSize="9" fill="#374151">TCP Port 445</text>
      <text x="210" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">Share: \\nas01\engineering</text>
      <rect x="50" y="126" width="320" height="26" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="210" y="143" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Authentication: Kerberos / NTLM</text>
      <text x="210" y="158" textAnchor="middle" fontSize="8.5" fill="#374151">(AD domain or local users)</text>
      <rect x="50" y="166" width="320" height="26" rx="4" fill="#93c5fd" stroke="#2563eb" strokeWidth="0.8"/>
      <text x="210" y="183" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">SMB Service on NAS</text>
      <text x="210" y="200" textAnchor="middle" fontSize="8.5" fill="#374151">Share permissions + folder/NTFS permissions</text>
      <text x="210" y="218" textAnchor="middle" fontSize="8" fill="#6b7280">Dialect negotiated between client and server</text>
      <text x="210" y="232" textAnchor="middle" fontSize="8" fill="#6b7280">(SMB 2.x / 3.x based on mutual support)</text>
      <text x="210" y="248" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">Multiprotocol: requires identity mapping design</text>
      <text x="210" y="264" textAnchor="middle" fontSize="8" fill="#6b7280">SMB 3.x Multichannel: multiple paths where supported</text>

      {/* NFS side */}
      <rect x="470" y="38" width="360" height="240" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="650" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">NFS — Linux/Unix Protocol</text>
      <rect x="490" y="68" width="320" height="26" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="650" y="85" textAnchor="middle" fontSize="9.5" fill="#166534" fontWeight="600">Linux / Unix Client</text>
      <text x="650" y="104" textAnchor="middle" fontSize="9" fill="#374151">TCP Port 2049 (primary — v4)</text>
      <text x="650" y="118" textAnchor="middle" fontSize="8.5" fill="#374151">NFSv3: also rpcbind 111 + dynamic RPC ports</text>
      <rect x="490" y="126" width="320" height="26" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="650" y="143" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="600">Export Authorization + File Authorization</text>
      <text x="650" y="158" textAnchor="middle" fontSize="8.5" fill="#374151">IP/subnet access control + UID/GID or Kerberos</text>
      <rect x="490" y="166" width="320" height="26" rx="4" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"/>
      <text x="650" y="183" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="600">NFS Service on NAS</text>
      <text x="650" y="200" textAnchor="middle" fontSize="8.5" fill="#374151">Export rules + POSIX permissions / ACLs</text>
      <text x="650" y="218" textAnchor="middle" fontSize="8" fill="#6b7280">AUTH_SYS (UID/GID) or Kerberos — config dependent</text>
      <text x="650" y="232" textAnchor="middle" fontSize="8" fill="#6b7280">krb5 / krb5i / krb5p — auth/integrity/privacy</text>
      <text x="650" y="248" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">Multiprotocol: identity mapping + security style</text>
      <text x="650" y="264" textAnchor="middle" fontSize="8" fill="#6b7280">NFSv4: primarily TCP 2049 + identity/Kerberos deps</text>

      {/* Shared storage label */}
      <text x="430" y="295" textAnchor="middle" fontSize="8.5" fill="#9ca3af">Both access the same NAS storage — requires proper multiprotocol configuration planning</text>
    </svg>
  );
}
