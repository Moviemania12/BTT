"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import BackupVsSnapshotVsReplication from "../svg/BackupVsSnapshotVsReplication";
import BackupEnterpriseArch         from "../svg/BackupEnterpriseArch";
import BackupTypesTimeline          from "../svg/BackupTypesTimeline";
import Backup321Strategy            from "../svg/Backup321Strategy";
import BackupAppConsistentFlow      from "../svg/BackupAppConsistentFlow";
import BackupVmwareArch             from "../svg/BackupVmwareArch";
import BackupRansomwareResilient    from "../svg/BackupRansomwareResilient";
import BackupJobFailedFlow          from "../svg/BackupJobFailedFlow";
import { faqs }                     from "../metadata";

export default function Content() {
  return (
    <>
      {/* ── Quick Summary ─────────────────────────────────────────────── */}
      <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"1.2rem 1.4rem", marginBottom:"2rem" }}>
        <p style={{ fontWeight:700, color:"#15803d", marginBottom:"0.6rem", fontSize:"1rem" }}>📋 Quick Summary — Backup in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>Backup kya hai:</strong> Production data ka ek independent recoverable copy — different failure domain, separate access controls, historical restore points. Snapshot ya replication replace nahi karta.</li>
          <li><strong>Snapshot ≠ Backup:</strong> Snapshot same storage pe. Storage fail → snapshot gone. Immutability strength implementation aur enforcement mode pe depend karti hai.</li>
          <li><strong>Replication ≠ Backup:</strong> Replication corruption, deletion aur ransomware replicate karta hai. Historical restore points nahi hote.</li>
          <li><strong>RPO:</strong> Acceptable data loss. RTO: Acceptable downtime — detection + decision + restore + startup + validation sab include hain.</li>
          <li><strong>3-2-1:</strong> 3 copies, 2 media types, 1 offsite. 3-2-1-1-0 adds isolated/immutable copy + verified zero errors.</li>
          <li><strong>Immutable backup:</strong> Retention period mein delete ya modify nahi — immutability strength implementation aur mode pe dependent.</li>
          <li><strong>Application-consistent:</strong> VSS/quiesce — databases ke liye mandatory. Application state at backup time preserved — pre-existing corruption protect nahi karta.</li>
          <li><strong>Restore testing mandatory:</strong> "Success" ≠ recoverable. Periodic isolated restore tests essential hain.</li>
          <li><strong>Key management critical:</strong> Encryption key lose karo → backup permanently unrecoverable.</li>
        </ul>
      </div>

      {/* ══ SECTION 1 — DEFINITION ══════════════════════════════════════ */}
      <h2 id="backup-kya-hai" style={S.h2}>Backup Kya Hai — Definition</h2>
      <p style={S.p}><strong>Backup = Production data ka ek recoverable copy — maintained with a different failure domain from production, separate access controls, and the ability to recover data to a known previous state.</strong></p>
      <p style={S.p}>Ye sirf "file kisi doosri jagah copy karna" nahi hai. Enterprise backup mein:</p>
      <ul style={S.ul}>
        <li>Point-in-time copies maintained hoti hain — multiple historical restore points</li>
        <li>Copies different failure domain mein hoti hain — source failure se independent</li>
        <li>Retention policies control karti hain kitne time tak copies rakhi jaayein</li>
        <li>Backup catalog restore ke liye metadata maintain karta hai</li>
        <li>Verification confirm karta hai ki backup actually recoverable hai</li>
        <li>Security ensure karta hai ki backup sirf authorized parties ko accessible ho</li>
      </ul>
      <Callout type="important" title="Core Backup Properties">
        Traditional definition mein "independent copy" hai — lekin kya matters hai: different failure domain from production, separate access controls, aur ability to recover to a past state. Specific implementations vary — some integrated storage backup features blur the traditional lines. Jo cheez matter karti hai woh hai: backup source failure, deletion, aur attacks ke baad survive kar sake.
      </Callout>

      <h3 style={S.h3}>Backup Kyun Zaroori Hai — Real Threats</h3>
      <ul style={S.ul}>
        <li><strong>Accidental deletion:</strong> Sabse common scenario. User ya admin ne galti se delete kiya.</li>
        <li><strong>Hardware failure:</strong> Drive fail, RAID controller, storage array — data inaccessible.</li>
        <li><strong>Data corruption:</strong> Filesystem corruption, application bug, database corruption.</li>
        <li><strong>Ransomware:</strong> Malware production data encrypt karta hai. Clean backup = clean restore.</li>
        <li><strong>Application failure:</strong> Upgrade gone wrong, migration failure, misconfiguration.</li>
        <li><strong>Human error:</strong> Wrong config deployed, wrong data overwritten, wrong table dropped.</li>
        <li><strong>Site failure:</strong> Fire, flood — on-site backup bhi lost. Offsite copy required.</li>
        <li><strong>Compliance:</strong> Regulations data retention mandate karte hain. Complex interaction with backup data — see note on GDPR/compliance below.</li>
      </ul>
      <Callout type="warning" title="Compliance aur Backup Retention — Not a Simple IT Decision">
        Regulatory requirements (GDPR, HIPAA, financial regulations) ke saath backup retention complex hai. GDPR ke "right to erasure" clause ke saath backup mein personal data retain karna conflicts create kar sakta hai — backup se individual data delete karna restore aur modify karne ki zaroorat create karta hai. Regulated environments mein backup retention policy sirf IT decide nahi karta — legal aur compliance team ka input mandatory hai.
      </Callout>

      {/* ══ SECTION 2 — BACKUP VS SNAPSHOT ══════════════════════════════ */}
      <h2 id="backup-vs-snapshot" style={S.h2}>Backup vs Snapshot</h2>
      <Figure caption="Fig 1 — Backup vs Snapshot vs Replication: different protection models. Snapshot same storage pe. Replication mirrors everything including corruption. Backup provides historical recovery from independent storage.">
        <BackupVsSnapshotVsReplication />
      </Figure>

      <h3 style={S.h3}>Snapshot Kya Hai</h3>
      <p style={S.p}>Snapshot ek point-in-time copy hai jo <strong>same storage system pe</strong> reside karta hai. Implementation filesystem/vendor specific hai.</p>

      <h3 style={S.h3}>Kyun Snapshot Alone Backup Replace Nahi Karta</h3>
      <CodeBlock lang="text">
{`Scenario: Production storage array fail ho gayi.
  → All data on array: LOST
  → Snapshots on same array: ALSO LOST

Scenario: Ransomware ne production data encrypt kiya.
  → Production files: encrypted
  → Snapshots on same array: at risk depending on attacker's access level
     (read-only snapshot contents harder to modify for client-side ransomware,
      but if attacker gains administrative or API-level access to storage
      platform, snapshot protection depends on immutability implementation)

Scenario: Admin ne accidentally storage pool delete kiya.
  → Data: GONE
  → Snapshots on same pool: ALSO GONE`}
      </CodeBlock>
      <Callout type="important" title="Immutable/Locked Snapshots — Strength Varies">
        Immutable ya locked snapshots improve protection significantly. Client-side ransomware normally read-only snapshot contents directly modify nahi kar sakta. Agar immutability properly configured ho (compliance mode object lock, WORM) toh deletion bhi blocked hoti hai. Lekin immutability effectiveness depends on: specific implementation mode (governance vs compliance), storage platform's access controls, aur attacker ke access level par. "Immutable" snapshots ki strength implementation-specific hai — blanket claim nahi kiya ja sakta. Independent backup still mandatory.
      </Callout>

      {/* ══ SECTION 3 — BACKUP VS REPLICATION ═══════════════════════════ */}
      <h2 id="backup-vs-replication" style={S.h2}>Backup vs Replication</h2>
      <p style={S.p}>Replication production data ko ek aur location pe continuously ya periodically synchronize karta hai — primarily availability ke liye.</p>
      <CodeBlock lang="text">
{`Ransomware encrypts production files:
  → Replication replicates encrypted files to secondary → SECONDARY ALSO ENCRYPTED

Admin accidentally deletes database table:
  → Replication propagates deletion → SECONDARY TABLE ALSO DELETED

Data corruption on primary:
  → Replication propagates corruption → SECONDARY ALSO CORRUPTED

Conclusion: Replication provides availability/failover.
  Backup provides recoverability — clean historical copy se restore.
  Dono complementary hain, alag-alag roles ke saath.
  Replication ≠ Backup.`}
      </CodeBlock>
      <p style={S.p}>Replication can be near-real-time ya periodic — both share this fundamental limitation of mirroring logical errors.</p>

      {/* ══ SECTION 4 — BACKUP VS ARCHIVE ════════════════════════════════ */}
      <h2 id="backup-vs-archive" style={S.h2}>Backup vs Archive</h2>
      <ComparisonTable
        title=""
        headers={["","Backup","Archive"]}
        rows={[
          ["Primary purpose",  "Operational recovery",              "Long-term retention"],
          ["Retention",        "Short to medium (days to months)",   "Long (years to decades)"],
          ["Access pattern",   "Frequent (restore tests, restores)", "Rare (compliance, legal)"],
          ["Change rate",      "Updated frequently",                 "Typically static once archived"],
          ["Storage tier",     "Disk, dedup appliance, cloud",       "Cold storage, tape, deep archive"],
          ["Driver",           "Business continuity",                "Regulatory/legal compliance"],
        ]}
        caption="Backup = 'I might need this soon to recover.' Archive = 'I need to keep this for years for compliance.' Different purposes, different infrastructure, different access patterns."
      />

      {/* ══ SECTION 5 — BACKUP VS DR ══════════════════════════════════════ */}
      <h2 id="backup-vs-dr" style={S.h2}>Backup vs Disaster Recovery</h2>
      <p style={S.p}><strong>Backup</strong> specific data/systems recover karta hai — specific files, volumes, databases. Focus: data integrity and recoverability.</p>
      <p style={S.p}><strong>Disaster Recovery (DR)</strong> business/service capability restore karta hai after major disruption — infrastructure, networking, applications, processes, people. Focus: service continuity at defined RTO.</p>
      <CodeBlock lang="text">
{`Backup example:
  "Database table galti se drop ho gayi — kal ki backup se restore karo."
  Recovery: Hours to restore specific objects.

DR example:
  "Primary data center flood se destroyed — secondary DC pe
   entire production environment resume karo within 4-hour RTO."
  Recovery: Entire infrastructure stack, all services, all data.

Backup alone is NOT DR. DR strategy may USE backups,
but also includes: alternate infrastructure, failover procedures,
network changes, application startup sequences, business process continuity.`}
      </CodeBlock>
      <p style={S.p}>Traditional backup restore can take hours to days for large environments depending on data volume, network bandwidth, and storage performance. Modern platforms with instant recovery can make workloads available faster — but permanent production operation typically still requires migration to production storage. Next article — <TopicLink slug="disaster-recovery" variant="inline" /> — covers DR in depth.</p>

      {/* ══ SECTION 6 — RPO / RTO ════════════════════════════════════════ */}
      <h2 id="rpo-rto" style={S.h2}>RPO aur RTO — Deep Explanation</h2>

      <h3 style={S.h3}>RPO — Recovery Point Objective</h3>
      <p style={S.p}><strong>RPO = Kitna data loss acceptable hai?</strong></p>
      <CodeBlock lang="text">
{`Last backup: Monday 11 PM
Failure occurred: Tuesday 3 PM
Data loss window: 16 hours

If organizational RPO = 24 hours: Acceptable (16 < 24)
If organizational RPO = 4 hours: NOT acceptable (16 > 4)`}
      </CodeBlock>
      <p style={S.p}><strong>RPO is a business decision</strong>, not just a technical parameter. Different applications have different RPOs:</p>
      <ul style={S.ul}>
        <li>Banking transactions: RPO near-zero — continuous log backup + synchronous replication</li>
        <li>Email archive: RPO 24 hours may be acceptable</li>
        <li>Development environments: RPO 1 week may be acceptable</li>
      </ul>
      <Callout type="important" title="RPO ≠ Simply Backup Frequency">
        With continuous log-based backup (SQL Server transaction logs, Oracle archived redo logs), recovery to a specific point in time is possible even between scheduled full/differential backups — RPO can be much lower than backup schedule interval. RPO depends on backup architecture, not just job schedule.
      </Callout>

      <h3 style={S.h3}>RTO — Recovery Time Objective</h3>
      <p style={S.p}><strong>RTO = Kitna downtime acceptable hai?</strong></p>
      <p style={S.p}><strong>Important: RTO is not just "restore speed."</strong> RTO includes: failure detection time + decision/approval time + restore time + application startup time + validation time + network/DNS cutover time.</p>
      <CodeBlock lang="text">
{`E-commerce website fails at 2 PM.
Order processing stops. Revenue impact per hour.

RTO = 2 hours: All above steps must complete within 2 hours.

RTO determines infrastructure investment:
  RTO 1 hour  → Expensive: hot standby, instant recovery
  RTO 24 hours → Moderate: disk backup, direct restore
  RTO 72 hours → Economical: tape restore from offsite vault`}
      </CodeBlock>

      {/* ══ SECTION 7 — ARCHITECTURE ══════════════════════════════════════ */}
      <h2 id="backup-architecture" style={S.h2}>Backup Architecture — Complete Enterprise View</h2>
      <Figure caption="Fig 2 — Enterprise backup architecture: production workloads → backup infrastructure → primary repository → isolated secondary copies. Separate credentials from production mandatory.">
        <BackupEnterpriseArch />
      </Figure>

      <h3 style={S.h3}>Backup Server</h3>
      <p style={S.p}>Management/control plane — schedules jobs, defines policies, maintains catalog/database, coordinates restores, manages agents/proxies. Architecture varies significantly by vendor.</p>

      <h3 style={S.h3}>Backup Proxy / Media Server</h3>
      <p style={S.p}>Data movement handles karta hai — source read, process (compress/dedupe), repository write. Multiple proxies = parallel jobs = better throughput.</p>

      <h3 style={S.h3}>Backup Repository</h3>
      <ul style={S.ul}>
        <li><strong>Disk Repository:</strong> Local disk, NAS, SAN storage. Fast. Primary repository for recent restore points.</li>
        <li><strong>Deduplication Appliance:</strong> Hardware/software with built-in deduplication (e.g., Dell PowerProtect DD, HPE StoreOnce). Significant storage savings for backup data.</li>
        <li><strong>Object Storage / S3-compatible:</strong> Scalable, cost-effective. Object lock/immutability available on many platforms — S3-compatible implementations differ in behavior, verify vendor specifics.</li>
        <li><strong>Tape Library:</strong> Long-term retention, offline capability. See Tape Backup section.</li>
        <li><strong>Immutable/Hardened Repository:</strong> Cannot delete or modify during retention period. Key for ransomware protection.</li>
        <li><strong>Cloud Repository:</strong> Azure Blob, AWS S3, GCS. Scalable, offsite. Egress costs and bandwidth must be planned.</li>
      </ul>

      <h3 style={S.h3}>Backup Catalog / Metadata Database</h3>
      <p style={S.p}>Backup software apna catalog maintain karta hai — har restore point ki information, job history, retention, media/location mapping, file index. <strong>Catalog ka backup karo alag se</strong> — catalog loss restore complexity significantly increase karta hai. Some platforms catalog-independent recovery support karte hain, kuch nahi — vendor-specific behavior hai.</p>

      {/* ══ SECTION 8 — BACKUP TYPES ══════════════════════════════════════ */}
      <h2 id="backup-types" style={S.h2}>Backup Types — Full, Incremental, Differential</h2>
      <Figure caption="Fig 3 — Backup types weekly timeline. Full: every day, max storage, fastest restore. Full + Incremental: chain dependency, broken chain = restore failure. Full + Differential: grows as week progresses, only 2 sets for restore. Incremental forever: product-dependent behavior, chain depth varies.">
        <BackupTypesTimeline />
      </Figure>

      <h3 style={S.h3}>Full Backup</h3>
      <p style={S.p}>Source data ka complete copy — har baar. Maximum storage consumption. Longest backup time. <strong>Fastest restore</strong> — sirf ek set se complete restore, no chain dependency.</p>

      <h3 style={S.h3}>Incremental Backup</h3>
      <p style={S.p}>Sirf wo data jo last backup (full ya incremental) se change hua hai. Minimum storage. Minimum backup time. <strong>Slowest restore</strong> — full + har intermediate incremental chain mein in sequence.</p>
      <Callout type="danger" title="Backup Chain Dependency — Critical Risk">
        Incremental chain mein beech ka ek backup corrupt ya missing ho → chain break → sab subsequent restores FAIL. Chain integrity regularly verify karo. Periodic full backups fresh baseline provide karte hain.
      </Callout>

      <h3 style={S.h3}>Differential Backup</h3>
      <p style={S.p}>Sirf wo data jo last <strong>full</strong> se change hua hai. Medium storage (grows as week progresses). <strong>Restore: only 2 sets</strong> — last Full + latest Differential.</p>

      <ComparisonTable
        title="Backup Types — Quick Comparison"
        headers={["","Full","Incremental","Differential"]}
        rows={[
          ["Data backed up",     "Everything",           "Since last backup",      "Since last full"],
          ["Storage",            "Highest",              "Lowest",                 "Medium (grows)"],
          ["Backup time",        "Longest",              "Shortest",               "Medium"],
          ["Restore time",       "Fastest",              "Slowest (full chain)",   "Medium (2 sets)"],
          ["Chain risk",         "None",                 "High",                   "Low"],
          ["Restore dependency", "None",                 "Full + all incrementals", "Full + latest diff"],
        ]}
        caption="Product implementations of backup chains, chain management, and retention vary — verify with specific vendor documentation."
      />

      <h3 style={S.h3}>Incremental Forever</h3>
      <p style={S.p}>Initial full backup ek baar. Phir sirf incrementals — backup software internally chain assemble karta hai ya synthetic fulls create karta hai for restore. Implementations vary significantly:</p>
      <ul style={S.ul}>
        <li>Some platforms periodically create synthetic fulls to limit chain depth — even without explicit schedule</li>
        <li>Chain depth limits, if any, are product-specific</li>
        <li>Restore time impact of very long chains varies by product implementation</li>
        <li>Product documentation check karo for chain management behavior</li>
      </ul>

      <h3 style={S.h3}>Synthetic Full vs Active Full</h3>
      <p style={S.p}><strong>Synthetic Full:</strong> Backup software existing full + incrementals ko repository pe combine karke new full banata hai — bina source se data read kiye. Zero production I/O impact. Quality depends on integrity of existing chain.</p>
      <p style={S.p}><strong>Active Full:</strong> Source system se fresh full data read karta hai. Production I/O impact. Provides a fresh verified baseline independent of existing chain. Active full does not automatically guarantee better recoverability in all scenarios — what matters is whether the backup data is complete, consistent, and accessible with valid encryption keys.</p>

      {/* ══ SECTION 9 — BACKUP WINDOW ════════════════════════════════════ */}
      <h2 id="backup-window" style={S.h2}>Backup Window</h2>
      <p style={S.p}>Backup window = scheduled time period when backup jobs run. Production impact includes: source I/O load, network bandwidth, application performance (during quiesce/snapshot), storage space for snapshot delta files.</p>
      <p style={S.p}>Modern backup platforms support always-on/continuous backup mechanisms where traditional window concept is less rigid — but source impact still exists and must be managed.</p>
      <ul style={S.ul}>
        <li>Off-peak hours schedule karo where possible</li>
        <li>Concurrent jobs limit karo per infrastructure capacity</li>
        <li>Long-running jobs monitor karo — window overrun = alert</li>
        <li>Incrementals typically fit tighter windows than fulls</li>
      </ul>

      {/* ══ SECTION 10 — RETENTION ════════════════════════════════════════ */}
      <h2 id="retention" style={S.h2}>Retention</h2>
      <p style={S.p}>Retention policy = kitne time tak backup copies rakhi jaayein. Depends on: business requirements, compliance/regulatory obligations, storage capacity, application criticality. <strong>No universal retention schedule.</strong></p>
      <Callout type="warning" title="Do NOT Manually Delete Backup Files">
        Backup software ke cleanup/retention mechanism use karo. Manually files storage se delete karne se: catalog inconsistency, chain dependency breakage, orphaned restore points. Always let backup software manage retention.
      </Callout>

      <h3 style={S.h3}>GFS — Grandfather-Father-Son Retention</h3>
      <p style={S.p}>Common retention model with three tiers:</p>
      <ul style={S.ul}>
        <li><strong>Son (Daily):</strong> Recent short-term — typically 1–4 weeks</li>
        <li><strong>Father (Weekly):</strong> Weekly backups — typically 1–3 months</li>
        <li><strong>Grandfather (Monthly/Yearly):</strong> Monthly or annual — 1–7+ years for compliance</li>
      </ul>
      <CodeBlock lang="text">
{`Example GFS (illustrative only — adjust per requirements):
  Daily backups → keep 14 days (Son)
  Weekly backup (e.g., Friday) → keep 8 weeks (Father)
  Month-end backup → keep 12 months (Grandfather)
  Year-end backup → keep 7 years (compliance)

How GFS is implemented in your backup software:
  - Whether through automatic promotion of an existing backup
  - Separate scheduled weekly/monthly jobs
  - Copy jobs to separate retention tiers
  — is product-specific. Verify with your backup platform documentation.`}
      </CodeBlock>

      {/* ══ SECTION 11 — 3-2-1 ════════════════════════════════════════════ */}
      <h2 id="strategy-3-2-1" style={S.h2}>3-2-1 aur 3-2-1-1-0 Backup Strategy</h2>
      <Figure caption="Fig 4 — 3-2-1 and 3-2-1-1-0 strategy. Strategies/guidelines — not formally codified universal standards. +0 means verified via testing, not assumed from job status.">
        <Backup321Strategy />
      </Figure>
      <h3 style={S.h3}>Classic 3-2-1</h3>
      <ul style={S.ul}>
        <li><strong>3 copies:</strong> Production + 2 backup copies</li>
        <li><strong>2 different media/storage types:</strong> E.g., disk + tape, or disk + cloud — different failure modes</li>
        <li><strong>1 offsite:</strong> Different physical location — site failure protection</li>
      </ul>
      <h3 style={S.h3}>3-2-1-1-0 Extension</h3>
      <ul style={S.ul}>
        <li><strong>+1 offline/air-gapped/immutable copy:</strong> Ransomware cannot easily reach or delete it</li>
        <li><strong>+0 verified errors:</strong> Zero errors after verification/testing — backup integrity verified, not just "job success" status</li>
      </ul>
      <Callout type="important" title="Strategy — Not Formal Standard">
        3-2-1 aur 3-2-1-1-0 widely referenced strategies/guidelines hain — not formally codified ISO/NIST standards. Core principle: multiple independent copies, media diversity, offsite/isolated copy. Implementations vary. "+0" means verify via restore test — job "Success" status alone is not sufficient.
      </Callout>

      {/* ══ SECTION 12 — AIR GAP ══════════════════════════════════════════ */}
      <h2 id="air-gap" style={S.h2}>Air Gap</h2>
      <h3 style={S.h3}>Physical Air Gap</h3>
      <p style={S.p}>Storage media <strong>physically disconnected</strong> from any network when not in use. Tape stored in offsite vault = physical air gap. No network = no remote attack surface when disconnected.</p>

      <h3 style={S.h3}>Logical Air Gap</h3>
      <p style={S.p}>Network-accessible but with access controls, operational separation, and credential isolation that significantly limit attack surface. Examples: immutable object storage, hardened Linux repository with separate credentials.</p>
      <Callout type="warning" title="Air Gap Terminology — Be Precise">
        Logical air gap ≠ physical air gap. Cloud backup accessible 24/7 with same admin credentials as production is NOT air-gapped — even if geographically different location. Offsite ≠ air-gapped. Immutable ≠ offline. Use terminology precisely.
      </Callout>

      {/* ══ SECTION 13 — IMMUTABILITY ═════════════════════════════════════ */}
      <h2 id="immutable-backup" style={S.h2}>Immutable Backup</h2>
      <p style={S.p}>Immutability ek enforcement mechanism hai designed to prevent modification/deletion during the configured retention period according to the platform and configured mode.</p>

      <h3 style={S.h3}>Implementation Types</h3>
      <ComparisonTable
        title="Immutability Implementation Comparison"
        headers={["Type","Strength","Notes"]}
        rows={[
          ["S3 Object Lock — Compliance Mode", "Strongest — no one can delete before retention", "Not even root/admin. Verify specific cloud/object provider behavior."],
          ["S3 Object Lock — Governance Mode", "Privileged users can override/delete", "Less strong — specific permissions can bypass"],
          ["Linux Hardened Repository", "Software-enforced with single-use credentials", "Platform and configuration dependent"],
          ["WORM Tape", "Hardware write-once", "Physical level — cannot overwrite"],
          ["Software retention lock", "Backup software enforces via catalog layer", "Depends on backup software + repository integration"],
        ]}
        caption="Immutability effectiveness depends on platform and configured enforcement mode — not all immutability implementations provide identical protection. Always verify with vendor documentation."
      />
      <Callout type="warning" title="Immutability Is NOT Invincible">
        Immutability provides meaningful and important protection. Agar storage platform itself firmware/API level pe compromised ho — immutability potentially bypassed. Governance mode stronger access than regular admin required hai but override possible. Compliance mode strongest — designed so even root cannot delete before retention. Understand your specific implementation and its limits.
      </Callout>

      {/* ══ SECTION 14 — RANSOMWARE ═══════════════════════════════════════ */}
      <h2 id="ransomware-resilient" style={S.h2}>Ransomware-Resilient Backup Architecture</h2>
      <Figure caption="Fig 7 — Ransomware-resilient backup: production, backup infrastructure, and isolated copies in separate zones. Separate credentials mandatory. Shutdown/isolation decisions follow organizational IR procedure.">
        <BackupRansomwareResilient />
      </Figure>
      <ul style={S.ul}>
        <li><strong>Immutable repository:</strong> Primary defense — ransomware cannot easily delete/encrypt</li>
        <li><strong>Separate backup credentials:</strong> Production AD compromise should NOT give backup access. Completely separate service accounts.</li>
        <li><strong>MFA on backup console:</strong> Additional barrier even if password compromised</li>
        <li><strong>Least privilege:</strong> Backup agents need only minimum permissions to read source</li>
        <li><strong>Network segmentation:</strong> Backup network not directly reachable from production/user VLANs</li>
        <li><strong>Offline/air-gapped copy:</strong> At least one copy physically or logically isolated</li>
        <li><strong>Monitoring:</strong> Unusual patterns — unexpected large incrementals (possible encryption underway), auth failures</li>
        <li><strong>Restore testing:</strong> Verify backup integrity before incident — corrupt backup discovered during ransomware recovery = catastrophe</li>
        <li><strong>Clean restore environment:</strong> Restore to isolated environment first — verify cleanliness before connecting to production</li>
      </ul>

      {/* ══ SECTION 15 — ENCRYPTION ═══════════════════════════════════════ */}
      <h2 id="backup-encryption" style={S.h2}>Backup Encryption aur Key Management</h2>
      <h3 style={S.h3}>Encryption Types</h3>
      <ul style={S.ul}>
        <li><strong>In transit:</strong> Proxy se repository tak — TLS/SSL. Especially important for cloud/offsite backup.</li>
        <li><strong>At rest:</strong> Repository pe stored data — software level (backup platform) ya hardware level (encrypted drives).</li>
      </ul>
      <Callout type="danger" title="Key Management — CRITICAL — No Backdoor Exists">
        Backup encryption keys ya passwords lose karne se backup permanently unrecoverable ho sakta hai. Enterprise mein mandatory: secure key storage (password manager, HSM), documentation (accessible to authorized recovery personnel), key backup separate from backup data, DR scenario mein key accessibility ensure karo. This has caused real data loss in production environments.
      </Callout>
      <p style={S.p}>Backup encryption is strongly recommended for offsite and cloud copies, and mandatory where compliance or contractual requirements specify it. For on-premises backups in physically secured environments, the encryption vs. key-management-risk tradeoff should be evaluated per organizational policy. The critical accompanying requirement is robust key management — if encryption is enabled, loss of the encryption key renders the backup permanently unrecoverable.</p>

      {/* ══ SECTION 16 — COMPRESSION + DEDUP ════════════════════════════ */}
      <h2 id="compression-dedup" style={S.h2}>Backup Compression aur Deduplication</h2>
      <h3 style={S.h3}>Compression</h3>
      <p style={S.p}>Data compress karke storage space aur network bandwidth reduce karo. CPU overhead badhta hai. Better for text/logs/databases. Already-compressed data (JPEG, encrypted data, zip archives) minimal additional savings.</p>

      <h3 style={S.h3}>Deduplication</h3>
      <p style={S.p}>Duplicate data blocks identify karo — sirf ek copy rakho, references maintain karo. Source-side (before network) ya target-side (at repository).</p>
      <Callout type="warning" title="Deduplication Ratios — Workload Dependent">
        Deduplication ratios are highly workload-dependent. Similar VM templates: very high ratios. Unique database data: lower ratios. Already-encrypted data: typically does NOT deduplicate well (each encrypted block appears unique). Compression aur deduplication ratios are NOT simply multiplicative — actual savings depend on data type, backup software implementation order (deduplicate-then-compress vs compress-then-deduplicate), and whether compressed or already-deduplicated data enters each stage. Real-world storage consumption must be measured in your environment. Never rely on theoretical combined ratios for production sizing.
      </Callout>

      {/* ══ SECTION 17 — APP-CONSISTENT ══════════════════════════════════ */}
      <h2 id="app-consistent" style={S.h2}>Application-Consistent vs Crash-Consistent Backup</h2>
      <Figure caption="Fig 5 — Application-consistent backup flow: quiesce → snapshot → backup → snapshot release. Application resumes normal operation after snapshot. VSS = coordination framework, not backup product.">
        <BackupAppConsistentFlow />
      </Figure>

      <h3 style={S.h3}>Crash-Consistent Backup</h3>
      <p style={S.p}>Application quiesce nahi hua — like pulling power cord on running system. In-flight transactions, unflushed write cache, incomplete writes. May require crash recovery on restore. Some modern applications handle this well — but not guaranteed for all workloads especially databases.</p>

      <h3 style={S.h3}>Application-Consistent Backup</h3>
      <p style={S.p}>Application properly quiesced before snapshot — write buffers flushed, in-flight transactions completed, application in known consistent state. Achieved via: VSS (Windows), VMware Tools quiesce, database-specific mechanisms.</p>
      <Callout type="important" title="Application-Consistent ≠ Guaranteed Recoverability">
        Application-consistent backup preserves known-consistent application state at backup time. Ye guarantee nahi karta: pre-existing data corruption absent (corrupt data backed up consistently = corrupt restore), backup media integrity, encryption key availability, or application startup success. Restore testing still essential.
      </Callout>

      {/* ══ SECTION 18 — VSS ══════════════════════════════════════════════ */}
      <h2 id="vss" style={S.h2}>Windows VSS — Volume Shadow Copy Service</h2>
      <p style={S.p}><strong>VSS = Volume Shadow Copy Service. VSS is a coordination framework/service — NOT a backup product.</strong></p>
      <p style={S.p}>Three VSS components: <strong>Requestor</strong> (backup application — initiates request), <strong>Provider</strong> (creates/maintains snapshot — Microsoft, hardware, or third-party), <strong>Writer</strong> (application-specific — ensures consistent state before snapshot).</p>
      <CodeBlock label="Windows — Safe diagnostic: check VSS writer state" lang="powershell">
{`# Safe read-only diagnostic — check all writer states
vssadmin list writers

# Expected output per writer:
# Writer name: 'SQL Server (MSSQLSERVER)'
# State: [1] Stable        ← OK
# Last error: No error

# Writer in "Failed" state = application-consistent backup NOT possible
# Investigate application health before retrying backup`}
      </CodeBlock>
      <Callout type="warning" title="VSS Writer Failures — Common and Important">
        VSS writer failures are one of the most common Windows backup issues. Writer in failed/error state → application-consistent backup not possible → fallback to crash-consistent or backup failure. Root cause is typically the application health, not VSS itself. Investigate the specific application's event logs before any VSS service restarts.
      </Callout>

      {/* ══ SECTION 19 — DATABASE BACKUP ══════════════════════════════════ */}
      <h2 id="database-backup" style={S.h2}>Database Backup</h2>
      <h3 style={S.h3}>SQL Server</h3>
      <ul style={S.ul}>
        <li><strong>Full database backup:</strong> Complete database state</li>
        <li><strong>Differential backup:</strong> Changes since last full</li>
        <li><strong>Transaction log backup:</strong> Sequential log records — enables point-in-time recovery</li>
        <li><strong>Recovery models:</strong> Simple (no log backups/PITR), Full (log backup + PITR), Bulk-logged</li>
      </ul>
      <p style={S.p}><strong>Point-in-time recovery:</strong> Requires the base full backup + optionally the most recent differential backup before the target point + transaction log backups covering the gap to the target point. Possible only if the transaction log chain is continuous and unbroken from the applicable backup set. Both the full backup and any differential used must themselves be restorable.</p>

      <h3 style={S.h3}>Oracle</h3>
      <ul style={S.ul}>
        <li><strong>RMAN (Recovery Manager):</strong> Oracle's native backup utility — full, incremental (level 0/1), archived redo logs</li>
        <li><strong>Archive Log Mode:</strong> Required for online backups and point-in-time recovery</li>
        <li><strong>Hot backup:</strong> Database online during backup — requires archive log mode</li>
        <li><strong>Enterprise backup software:</strong> Integrates with Oracle RMAN via plugins</li>
      </ul>

      <h3 style={S.h3}>MySQL / MariaDB</h3>
      <ul style={S.ul}>
        <li><strong>mysqldump:</strong> Logical backup — portable but slower for large databases</li>
        <li><strong>Physical backup:</strong> Backing up InnoDB datafiles while running requires coordination for consistency. Tools designed for hot InnoDB backup (e.g., Percona XtraBackup) can perform hot backups without a global lock for InnoDB. Manual datafile copy without appropriate tooling does NOT produce a consistent backup. Consult your MySQL/MariaDB version documentation and use vendor-supported backup tools.</li>
        <li><strong>Point-in-time recovery:</strong> Requires binary logging enabled (<code>log_bin</code> — verify your version default, not always on by default). Binary log format (ROW recommended for reliability) and retention must be managed. Consult MySQL/MariaDB documentation for your specific version.</li>
      </ul>

      <h3 style={S.h3}>PostgreSQL</h3>
      <ul style={S.ul}>
        <li><strong>pg_dump:</strong> Logical backup — produces consistent dump but cannot be used with WAL for point-in-time recovery</li>
        <li><strong>pg_basebackup:</strong> Physical base backup — foundation for WAL-based PITR</li>
        <li><strong>WAL archiving:</strong> Requires <code>archive_mode = on</code> and <code>archive_command</code> configured in <code>postgresql.conf</code> — not enabled by default. Consult PostgreSQL documentation for your version.</li>
      </ul>
      <Callout type="danger" title="Database Backup — No Casual Commands">
        Database backup operations (BACKUP DATABASE, RMAN scripts, WAL configuration changes) should only be executed by qualified DBAs with proper testing. No casual copy-paste of production database commands.
      </Callout>

      {/* ══ SECTION 20 — VM BACKUP ═══════════════════════════════════════ */}
      <h2 id="vm-backup" style={S.h2}>VM Backup</h2>
      <h3 style={S.h3}>Image-Level Backup</h3>
      <p style={S.p}>Entire VM (all virtual disks) ek single image ke roop mein back up hoti hai. Complete VM restore, disk restore, file-level restore from same backup possible.</p>

      <h3 style={S.h3}>Hypervisor APIs</h3>
      <p style={S.p}>Modern backup platforms hypervisor APIs use karte hain — storage snapshot ke through data read karte hain bina VM performance significantly impact kiye. VMware: VADP. Hyper-V: VSS-based integration.</p>

      <h3 style={S.h3}>Changed Block Tracking (CBT) — VMware</h3>
      <p style={S.p}><strong>CBT = vSphere feature that tracks which disk blocks have changed since last backup. CBT is a tracking mechanism, not backup itself.</strong></p>
      <p style={S.p}>Backup software CBT information use karta hai for efficient incremental backup — sirf changed blocks reads. CBT corruption/staleness cause kar sakta hai ki incremental backup miss changes. <strong>CBT reset is a remediation action</strong> — performed when CBT is detected as corrupted or producing incorrect results (e.g., unexpectedly large incrementals covering all blocks). It is not routine scheduled maintenance. CBT reset forces a subsequent full backup. If CBT issues suspected: consult backup software and VMware documentation for appropriate diagnostic and remediation procedure for your specific versions.</p>

      {/* ══ SECTION 21 — VMWARE BACKUP ════════════════════════════════════ */}
      <h2 id="vmware-backup" style={S.h2}>VMware Backup</h2>
      <Figure caption="Fig 6 — VMware backup architecture: vCenter VADP integration → backup proxy → repository → secondary copy. CBT = tracking mechanism, not backup. VMware snapshot during backup is temporary — must be consolidated after job.">
        <BackupVmwareArch />
      </Figure>
      <h3 style={S.h3}>VADP — vSphere APIs for Data Protection</h3>
      <p style={S.p}>VMware's framework for third-party backup vendors. Provides VM discovery, snapshot-based backup, CBT support, VM restore. Backup software vCenter/ESXi se communicate karta hai via VADP.</p>

      <h3 style={S.h3}>VMware Snapshot During Backup</h3>
      <CodeBlock lang="text">
{`Backup initiated
  ↓
ESXi creates VM snapshot (freezes current disk state)
  ↓
VM continues running (writes to snapshot delta files)
  ↓
Backup software reads VM disk data from snapshot
  ↓
Backup completes → snapshot deleted/consolidated
  ↓
Delta files merged back into base disks`}
      </CodeBlock>
      <Callout type="danger" title="VMware Snapshot ≠ Long-Term Backup">
        VMware VM snapshot during backup is a TEMPORARY operational mechanism — not a backup. Snapshot duration must be minimized. Long-running snapshots cause: datastore space consumption (delta files grow), VM I/O performance degradation, snapshot consolidation failures. VMware snapshot resides on same datastore — datastore fail → snapshot gone. Independent backup copy in separate storage is the actual backup.
      </Callout>
      <p style={S.p}>Sufficient datastore headroom required for snapshot delta file growth during backup. Required free space depends on VM&apos;s change rate during backup window, snapshot duration, and datastore design — no universal percentage applies. Check VMware documentation and backup vendor recommendations for your specific setup.</p>

      <h3 style={S.h3}>Application-Aware Processing in VMware</h3>
      <p style={S.p}>Backup software VMware Tools ke through guest OS mein communicate karta hai — VSS writers trigger (Windows VMs), pre/post scripts (Linux VMs). Without application-aware processing: VMware backup crash-consistent hoga.</p>

      <h3 style={S.h3}>Automated Recovery Verification</h3>
      <p style={S.p}>Some backup platforms support automated testing — backup se VM temporarily start karo in isolated environment, application availability test karo, then shutdown. Veeam Backup &amp; Replication&apos;s &quot;SureBackup&quot; is one well-known vendor-specific implementation — other vendors have equivalent features under different names. Availability depends on backup platform and edition — not universally available.</p>

      {/* ══ SECTION 22 — HYPER-V ══════════════════════════════════════════ */}
      <h2 id="hyperv-backup" style={S.h2}>Hyper-V Backup</h2>
      <p style={S.p}>VSS integration: Hyper-V host-level backup VSS use karta hai — coordination between Hyper-V VSS Writer aur guest integration services. Guest integration services must be installed in VMs for application consistency within VMs.</p>
      <p style={S.p}><strong>Hyper-V checkpoints (formerly called snapshots)</strong> are operational tools for temporary state capture — not backups. They share the same fundamental limitation as VMware snapshots: they reside on the same storage as the VM and are not independent backups. However, Hyper-V checkpoints differ significantly from VMware in implementation — Hyper-V uses AVHD/AVHDX differencing disks, with its own checkpoint chain behavior and merge process. Do not assume VMware-specific snapshot guidance applies directly to Hyper-V checkpoints.</p>

      {/* ══ SECTION 23 — PHYSICAL SERVER ════════════════════════════════ */}
      <h2 id="physical-server-backup" style={S.h2}>Physical Server Backup</h2>
      <p style={S.p}><strong>Agent-Based:</strong> Backup agent installed on server — reads data per schedule, sends to proxy/repository, integrates VSS (Windows) or application-aware scripts (Linux).</p>
      <p style={S.p}><strong>File-level:</strong> Individual files/folders. Simple, granular. Restore specific files.</p>
      <p style={S.p}><strong>Volume/Image-level:</strong> Entire disk volume — boot sector, partition table, all data. Faster full restore. Granular file restore also possible from image.</p>
      <h3 style={S.h3}>Bare-Metal Recovery (BMR)</h3>
      <p style={S.p}>Complete system restore — OS, boot configuration, applications, system state, data — on same or different hardware. Requires complete volume/image backup (OS volume included) + boot media (WinPE/Linux boot environment from backup software) + network/media access to repository.</p>
      <p style={S.p}><strong>Why BMR differs from normal file restore:</strong> Normal restore: OS running hai, specific files restore karo. BMR: OS nahi hai — boot from backup software boot media, restore entire disk image, system becomes bootable.</p>

      {/* ══ SECTION 24 — NAS BACKUP ══════════════════════════════════════ */}
      <h2 id="nas-backup" style={S.h2}>NAS Backup</h2>
      <p style={S.p}><strong>Challenges:</strong> Scale (hundreds of TBs), millions of small files (metadata overhead dominates), long backup windows. Read more about <TopicLink slug="nas" variant="inline" />.</p>
      <h3 style={S.h3}>Approaches</h3>
      <ul style={S.ul}>
        <li><strong>SMB/NFS-based backup:</strong> Proxy mounts NAS share, backs up files. Operationally straightforward for smaller shares. Performance at very large scale varies significantly by backup platform — some modern software has optimized parallel crawlers. Evaluate your specific platform&apos;s NAS capabilities before assuming limitations.</li>
        <li><strong>NDMP:</strong> NAS appliance direct to backup media — efficient for large NAS. See NDMP section.</li>
        <li><strong>Vendor APIs:</strong> Enterprise NAS vendors provide efficient backup integrations — snapshot-based, faster traversal.</li>
        <li><strong>NAS snapshots:</strong> Fast operational recovery for recent deletion. Independent backup mandatory for longer-term protection.</li>
      </ul>

      {/* ══ SECTION 25 — NDMP ════════════════════════════════════════════ */}
      <h2 id="ndmp" style={S.h2}>NDMP — Network Data Management Protocol</h2>
      <p style={S.p}>NDMP ek long-established protocol hai jo NAS devices ko backup devices se directly communicate karne allow karta hai — without routing all backup data through a general-purpose server.</p>
      <p style={S.p}><strong>Control path vs data path:</strong> Backup server typically handles the control path (initiating, monitoring, cataloging) while actual data may flow directly between NAS and backup media. The specific topology — how many hops the data takes — is NAS platform, backup software, and environment dependent.</p>
      <Callout type="important" title="NDMP Topology — Not Universal">
        NDMP topology modes vary by NAS platform, backup software, and configuration. Do not present one topology as universally applicable. Modern architectures increasingly use vendor-specific APIs and object storage targets alongside or instead of NDMP. Verify NDMP support for your specific NAS platform and backup software version.
      </Callout>

      {/* ══ SECTION 26 — SAN BACKUP ══════════════════════════════════════ */}
      <h2 id="san-backup" style={S.h2}>SAN Backup</h2>
      <p style={S.p}><strong>SAN backup = backup of workloads/data residing on SAN storage</strong> — not &quot;backing up the SAN itself.&quot;</p>
      <p style={S.p}><strong>Standard approach:</strong> Backup agent/hypervisor API workload level pe backup karta hai — SAN infrastructure transparent hai to backup software.</p>
      <p style={S.p}><strong>Storage array snapshot integration:</strong> Backup software storage array APIs se integrate karke: application quiesce → array snapshot → off-host backup from snapshot → snapshot delete. Production server/VM pe minimal backup load. <strong>Storage snapshot ≠ independent backup</strong> — array snapshot same array pe hai. Independent backup copy alag storage mein zaroori hai.</p>
      <p style={S.p}>Read more about <TopicLink slug="san" variant="inline" /> — dedicated SAN article.</p>

      {/* ══ SECTION 27 — TAPE BACKUP ══════════════════════════════════════ */}
      <h2 id="tape-backup" style={S.h2}>Tape Backup</h2>
      <h3 style={S.h3}>Tape Library Components</h3>
      <ul style={S.ul}>
        <li><strong>Tape Drive:</strong> Read/write head — must be compatible with cartridge generation</li>
        <li><strong>Tape Cartridges:</strong> Magnetic tape media — barcode labeled for inventory tracking</li>
        <li><strong>Robotic Arm:</strong> Moves cartridges between slots and drives automatically</li>
        <li><strong>Barcode Reader:</strong> Inventory — library knows which cartridge is in which slot</li>
        <li><strong>I/E (Import/Export) Slot:</strong> Load or unload cartridges without opening library. Used for routine media rotation — receiving new/blank media, removing for offsite vaulting, returning vaulted media for restore. Primary mechanism for tape offsite vaulting workflows.</li>
        <li><strong>Media Pool:</strong> Logical grouping of tapes — scratch, backup, retention pools</li>
      </ul>

      <h3 style={S.h3}>LTO — Linear Tape-Open</h3>
      <p style={S.p}>Industry standard tape format. Multiple generations deployed (LTO-6 through current). Each generation higher capacity and speed.</p>
      <Callout type="important" title="LTO Specifications — Verify Current Generation">
        LTO native capacity, compressed capacity, and speed specifications vary by generation and manufacturer. Verify current generation specifications from LTO Consortium official specifications (ltotechnology.com) or specific media manufacturer documentation. Compressed capacity is workload-dependent — actual compression ratio is not guaranteed.
      </Callout>
      <p style={S.p}><strong>LTO generation compatibility:</strong> LTO drives typically read current gen + 1-2 older generations. Write compatibility typically current + 1 older gen. Verify LTO Consortium specifications for your specific combination.</p>

      <h3 style={S.h3}>Tape Advantages</h3>
      <ul style={S.ul}>
        <li><strong>Offline capability:</strong> Media removed = complete offline, zero network attack surface</li>
        <li><strong>Media longevity:</strong> Manufacturers specify archival life under defined storage conditions (temperature, humidity, magnetic isolation). Specified life varies by media generation and manufacturer — consult specific tape media manufacturer&apos;s archival storage specifications. Actual longevity depends on storage conditions, handling quality, and usage history.</li>
        <li><strong>Cost per GB:</strong> Low for large volumes at scale</li>
        <li><strong>Offsite vaulting:</strong> Physical transport to secure vault — geographic diversity, true physical air gap when vaulted</li>
      </ul>

      <h3 style={S.h3}>Tape Limitations</h3>
      <ul style={S.ul}>
        <li><strong>Sequential access:</strong> No random access — must fast-forward to reach specific data</li>
        <li><strong>Restore time:</strong> Tape load, position, read — longer than disk</li>
        <li><strong>Drive maintenance:</strong> Cleaning per manufacturer schedule — maintain cleaning cartridge inventory</li>
        <li><strong>Media handling:</strong> Physical handling and storage conditions matter</li>
        <li><strong>Drive compatibility:</strong> Old tape requires compatible drive — maintain as equipment ages</li>
      </ul>

      {/* ══ SECTION 28 — D2D/D2D2T/CLOUD ════════════════════════════════ */}
      <h2 id="d2d-d2d2t" style={S.h2}>Disk-to-Disk, D2D2T aur Cloud</h2>
      <h3 style={S.h3}>Disk-to-Disk (D2D)</h3>
      <p style={S.p}>Primary backup to disk repository — dedup appliance, NAS, object storage. Fast backup, fast restore, concurrent access, deduplication.</p>

      <h3 style={S.h3}>Disk-to-Disk-to-Tape (D2D2T)</h3>
      <CodeBlock lang="text">
{`Production → Disk Repository (fast D2D) → Copy to Tape (D2T, long-term)

D2D for: fast backup window, fast operational restore
Tape copy for: long-term retention, offsite vaulting, cost-effective at scale`}
      </CodeBlock>

      <h3 style={S.h3}>Disk-to-Disk-to-Cloud</h3>
      <CodeBlock lang="text">
{`Production → Disk Repository (primary, fast) → Cloud/Object Store (offsite, scalable)

Considerations:
  - Egress costs: downloading from cloud for restore can be expensive
  - Bandwidth: initial seeding large data can take days/weeks
  - Encryption in transit and at rest mandatory
  - Object lock for immutability — verify specific cloud/platform behavior
  - Cloud shared responsibility: infrastructure = provider, data/access = customer`}
      </CodeBlock>

      {/* ══ SECTION 29 — CLOUD BACKUP ════════════════════════════════════ */}
      <h2 id="cloud-backup" style={S.h2}>Cloud Backup</h2>
      <p style={S.p}><strong>Backup to cloud:</strong> Bandwidth, egress costs, encryption, retention costs, shared responsibility model — all must be planned.</p>
      <p style={S.p}><strong>Backup of cloud workloads:</strong> Cloud provider redundancy (multi-AZ, regional replication) protects against infrastructure failure — does NOT protect against accidental deletion, ransomware, or application corruption. Cloud native redundancy ≠ backup.</p>

      {/* ══ SECTION 30 — BACKUP COPY ══════════════════════════════════════ */}
      <h2 id="backup-copy" style={S.h2}>Backup Copy aur Secondary Copies</h2>
      <CodeBlock lang="text">
{`Production VM → Backup Job → Primary Repository (disk, fast)
                                     ↓
                              Backup Copy Job (separate credentials)
                                     ↓
                        Secondary Repository (immutable/offsite)

Offsite copy ≠ automatically air-gapped or immutable.
Must be specifically configured with appropriate controls.`}
      </CodeBlock>

      {/* ══ SECTION 31 — OBJECT STORAGE BACKUP ══════════════════════════ */}
      <h2 id="object-storage-backup" style={S.h2}>Object Storage Backup</h2>
      <p style={S.p}>S3-compatible, Azure Blob, etc. as backup repository. Scalable, cost-effective. Object Lock/immutability available — S3 Object Lock: Governance mode (privileged users can override) vs Compliance mode (no one can delete before retention). Verify specific cloud/platform behavior — not all S3-compatible implementations identical.</p>

      {/* ══ SECTION 32 — BACKUP NETWORKING ══════════════════════════════ */}
      <h2 id="backup-networking" style={S.h2}>Backup Networking</h2>
      <p style={S.p}>Recommended: Dedicated backup VLAN/network — separate from production. Not universally mandatory — many environments use shared infrastructure with appropriate VLAN separation, firewall rules limiting which hosts can initiate connections to backup components, and QoS policies. Evaluate based on scale, backup volume, security requirements.</p>
      <Callout type="important" title="Backup Ports — Product-Specific">
        Required network ports are product-specific. Do NOT assume generic universal backup ports. Check vendor-specific firewall/port matrix before configuring backup infrastructure. Wrong firewall rules = silent backup failures.
      </Callout>

      {/* ══ SECTION 33 — JOB LIFECYCLE ════════════════════════════════════ */}
      <h2 id="backup-job-lifecycle" style={S.h2}>Backup Job Lifecycle</h2>
      <CodeBlock lang="text">
{`1. Schedule triggers (or manual/on-demand)
2. Backup server selects proxy
3. Workload discovery (VMs, files, databases)
4. Application quiesce/VSS/snapshot (if app-consistent)
5. Data reading from source (or from snapshot)
6. Transfer to proxy over backup network
7. Compression and/or deduplication
8. Repository write
9. Snapshot release (if used during backup)
10. Catalog update (restore point recorded)
11. Verification (checksum, optional integrity check)
12. Retention processing (expire old points per policy)
13. Copy jobs (if secondary/offsite copy configured)
14. Job completion → logging → alerting`}
      </CodeBlock>

      {/* ══ SECTION 34 — VERIFICATION ═════════════════════════════════════ */}
      <h2 id="backup-verification" style={S.h2}>Backup Verification</h2>
      <Callout type="danger" title="SUCCESS ≠ RECOVERABLE">
        Backup job &quot;Success&quot; means data written to repository. Ye prove nahi karta: data consistent hai, complete hai, application-recoverable hai, ya encryption key accessible hai. Periodic restore testing mandatory hai.
      </Callout>
      <ul style={S.ul}>
        <li><strong>Checksum/hash verification:</strong> Data hash at write time. Verification: recalculate, compare. Mismatch = corruption.</li>
        <li><strong>Automated integrity check:</strong> Backup software periodically verifies backup files.</li>
        <li><strong>Automated recovery verification (vendor feature):</strong> VM temporarily started from backup in isolated environment — one implementation example is Veeam&apos;s SureBackup. Not universal.</li>
        <li><strong>Manual restore test:</strong> Best verification — restore to isolated environment, start application, verify data.</li>
      </ul>

      {/* ══ SECTION 35 — RESTORE ══════════════════════════════════════════ */}
      <h2 id="restore-types" style={S.h2}>Restore Types aur Workflows</h2>
      <ul style={S.ul}>
        <li><strong>File-level restore:</strong> Individual files/folders — most common</li>
        <li><strong>Volume restore:</strong> Entire disk volume</li>
        <li><strong>VM restore:</strong> Complete VM image</li>
        <li><strong>Database restore:</strong> Application-specific — files + log replay</li>
        <li><strong>Application-item restore:</strong> Exchange mailbox items, SharePoint documents</li>
        <li><strong>Bare-metal restore:</strong> Complete OS+data on any hardware</li>
      </ul>

      {/* ══ SECTION 36 — RESTORE TESTING ══════════════════════════════════ */}
      <h2 id="restore-testing" style={S.h2}>Restore Testing</h2>
      <p style={S.p}><strong>Untested backup = potentially false confidence.</strong> Periodic isolated restore tests mandatory. Isolated environment — not connected to production. Document results: what tested, when, restore time (RTO measurement), application startup, issues. Validate application functionality — not just that files were restored.</p>

      {/* ══ SECTION 37 — INSTANT RECOVERY ════════════════════════════════ */}
      <h2 id="instant-recovery" style={S.h2}>Instant Recovery</h2>
      <p style={S.p}>Concept: Workload temporarily run <strong>from backup data</strong> (mounted image) — without fully restoring to production storage. Improves RTO.</p>
      <Callout type="important" title="Instant Recovery — Important Caveats">
        During instant recovery, writes by the running workload go to temporary location — NOT back to backup. If cancelled without migrating to production storage, those changes are LOST. Must be followed by: (a) migration to production storage, or (b) decision to discard. Time-limited recovery mode with defined completion requirements. Not every platform supports this — vendor-specific feature.
      </Callout>

      {/* ══ SECTION 38 — MONITORING ═══════════════════════════════════════ */}
      <h2 id="backup-monitoring" style={S.h2}>Backup Monitoring</h2>
      <ComparisonTable
        title="Daily Monitoring — Backup O&M"
        headers={["Item","What to Check"]}
        rows={[
          ["Job status",          "Any failed or warning jobs?"],
          ["Repository capacity", "Used %, growth trend, near threshold?"],
          ["Offsite copy jobs",   "Completed successfully?"],
          ["RPO compliance",      "Any workload beyond its RPO?"],
          ["Critical alerts",     "High-priority notifications?"],
          ["Tape library",        "Drive health, media alerts?"],
          ["Agent versions",      "Any agents outside supported/compatible version range?"],
        ]}
        caption="Extended monitoring: job duration vs baseline, throughput trends, proxy health, catalog database, immutability status, SLA compliance."
      />

      {/* ══ SECTION 39 — CAPACITY PLANNING ═══════════════════════════════ */}
      <h2 id="capacity-planning" style={S.h2}>Backup Capacity Planning</h2>
      <p style={S.p}>Capacity drivers: source data size, daily change rate, retention policy, full/incr schedule, growth rate, immutability retention (cannot delete — accumulates), secondary copies.</p>
      <Callout type="warning" title="Capacity Example — Educational Only">
        Compression and deduplication ratios are NOT simply multiplicative — actual savings depend on data type, backup software implementation order, and processing pipeline. Real-world storage consumption must be measured in your environment. Use vendor sizing tools. Never rely on theoretical combined ratios for production sizing.
      </Callout>

      {/* ══ SECTION 40 — PERFORMANCE ══════════════════════════════════════ */}
      <h2 id="performance-bottlenecks" style={S.h2}>Backup Performance Bottlenecks</h2>
      <CodeBlock lang="text">
{`Slow backup? Identify bottleneck layer — do NOT blame backup server first:

Source:     Production storage read speed, snapshot delta accumulation
Network:    Bandwidth between source and proxy saturated?
Proxy:      CPU (compression/dedup), memory, disk I/O, NIC capacity
Repository: Write throughput, dedup processing overhead
Tape:       Sequential write speed, drive availability, library throughput
Cloud:      Upload bandwidth, API rate limits, ingress limits

Check each layer systematically before assuming root cause.`}
      </CodeBlock>

      {/* ══ SECTION 41 — SECURITY ════════════════════════════════════════ */}
      <h2 id="backup-security" style={S.h2}>Backup Security</h2>
      <ul style={S.ul}>
        <li><strong>RBAC + MFA:</strong> Separate backup admin accounts. MFA on console.</li>
        <li><strong>Credential isolation:</strong> Backup service accounts ≠ production AD admin.</li>
        <li><strong>Least privilege:</strong> Backup agents — minimum permissions to read source only.</li>
        <li><strong>Hardened repository:</strong> Immutability, single-use credentials, network isolation.</li>
        <li><strong>Network segmentation:</strong> Backup infrastructure not reachable from user/production VLANs without explicit firewall rules.</li>
        <li><strong>Audit logs:</strong> All console access, policy changes, restore operations, auth failures.</li>
        <li><strong>Encryption:</strong> In transit + at rest. Key management mandatory.</li>
        <li><strong>Patching:</strong> Backup server OS, backup software, agents, proxies.</li>
      </ul>

      {/* ══ SECTION 42 — FAILURE SCENARIOS ═══════════════════════════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Backup Failure Scenarios — Field Guide</h2>

      <h3 style={S.h3}>Failure 1 — Backup Job Failed</h3>
      <p style={S.p}><strong>Action:</strong> Read error carefully first. Do not retry blindly. Layer-by-layer: source accessible? Agent running (supported/compatible version)? Snapshot/VSS succeeded? Proxy reachable? Repository accessible + capacity? Network OK?</p>

      <h3 style={S.h3}>Failure 2 — Repository Full</h3>
      <p style={S.p}><strong>Symptoms:</strong> Jobs fail &quot;No space.&quot;</p>
      <p style={S.p}><strong>Action:</strong> Through backup software: old non-immutable data per policy. Emergency capacity. Review retention and scope. <strong>Do NOT manually delete backup files from storage — catalog integrity broken.</strong> Do NOT bypass immutability controls.</p>

      <h3 style={S.h3}>Failure 3 — VSS Writer Failure</h3>
      <CodeBlock label="Windows — safe diagnostic" lang="powershell">
{`vssadmin list writers
# Check: any writer in "Failed" state?
# Investigate the specific application's health
# Check application event logs for errors`}
      </CodeBlock>
      <p style={S.p}><strong>Action:</strong> Address root cause — typically application issue. Do not casually restart VSS service without understanding impact on other applications using VSS.</p>

      <h3 style={S.h3}>Failure 4 — VMware Snapshot Failure</h3>
      <p style={S.p}><strong>Checks:</strong> Datastore free space (sufficient headroom depends on VM change rate and snapshot duration — no universal percentage). Stale snapshots? VMware Tools installed/running?</p>
      <p style={S.p}><strong>Action:</strong> Free space. Address stale snapshots through vCenter (Manage Snapshots → Consolidate). <strong>Do NOT manually delete .vmdk snapshot files from datastore</strong> — can corrupt VM. Use VMware-provided tools only.</p>

      <h3 style={S.h3}>Failure 5 — CBT Issue</h3>
      <p style={S.p}><strong>Symptom:</strong> Incremental unexpectedly large — all blocks appear changed.</p>
      <p style={S.p}><strong>Action:</strong> CBT reset = remediation, not routine maintenance. Consult backup vendor and VMware documentation for correct procedure for your specific versions. CBT reset forces full backup.</p>

      <h3 style={S.h3}>Failure 6 — Ransomware Reached Online Repository</h3>
      <p style={S.p}><strong>Immediate:</strong> Isolate backup infrastructure from network. <strong>Shutdown vs keep-running decision:</strong> consult organizational IR plan and security/IR team — depends on IR capabilities, forensic requirements, ransomware behavior, organizational policy. Do not make unilaterally.</p>
      <p style={S.p}>Check if immutable copies intact. Check if offline/tape copies available and clean. Engage IR team and backup vendor support.</p>

      <h3 style={S.h3}>Failure 7 — Tape Library/Drive Failure</h3>
      <p style={S.p}><strong>Checks:</strong> Library status alerts. Drive cleaning needed? Media barcode readable? Cable. Driver compatibility with OS version.</p>
      <p style={S.p}><strong>Action:</strong> Consult library vendor documentation. For drive failure — vendor support. Maintain cleaning cartridge inventory in library.</p>

      {/* ══ SECTION 43 — TROUBLESHOOT LAYERS ═════════════════════════════ */}
      <h2 id="troubleshoot-layers" style={S.h2}>Backup Troubleshooting — Layer-by-Layer</h2>
      <CodeBlock lang="text">
{`Layer 1 — Source Workload
  Running? Accessible? Healthy? Application online?

Layer 2 — Agent / API / Hypervisor
  Agent running? Version supported/compatible per matrix?
  vCenter/ESXi API accessible?

Layer 3 — Snapshot / Application Consistency
  VSS writers healthy? (vssadmin list writers)
  VMware snapshot succeeded? Datastore sufficient?

Layer 4 — Backup Server / Proxy
  Services running? Resources OK?
  Proxy-to-repository communication OK?

Layer 5 — Network
  All component connectivity OK?
  Required ports open (product-specific)?
  Bandwidth saturation? Firewall blocking?

Layer 6 — Repository / Media
  Accessible? Capacity? Dedup appliance healthy?
  Tape drive available? Cloud reachable?

Layer 7 — Catalog / Metadata
  Catalog database healthy?
  Restore point visible in catalog?

Layer 8 — Retention / Immutability
  Retention policy running correctly?
  Immutable data blocking capacity cleanup?

Layer 9 — Restore Validation
  Restore test succeeds? Application starts? Data intact?`}
      </CodeBlock>

      {/* ══ SECTION 44 — JOB FAILED FLOW ══════════════════════════════════ */}
      <h2 id="job-failed-flow" style={S.h2}>Backup Job Failed — Systematic Flow</h2>
      <Figure caption="Fig 8 — Backup job failed: systematic troubleshooting. Read error first. Layer-by-layer investigation. After fix: SUCCESS ≠ RECOVERABLE — verify restore point in catalog, consider restore test.">
        <BackupJobFailedFlow />
      </Figure>

      {/* ══ SECTION 45 — PRODUCTION INCIDENTS ═══════════════════════════ */}
      <h2 id="production-incidents" style={S.h2}>Real Production Incidents</h2>

      <h3 style={S.h3}>Scenario 1 — Repository Full — Backups Stopped</h3>
      <p style={S.p}><strong>Root Cause:</strong> New large database added to scope without capacity review. Orphaned backups from decommissioned server consuming 8TB. 30% of repository was immutable — could not be deleted.</p>
      <p style={S.p}><strong>Fix:</strong> Orphaned backups deleted through backup software (not directly from storage). Emergency storage expansion. Decommission procedure updated to include backup scope cleanup.</p>
      <p style={S.p}><strong>Prevention:</strong> Capacity thresholds calibrated to environment growth rate. Monthly capacity review.</p>

      <h3 style={S.h3}>Scenario 2 — VSS Writer Failure</h3>
      <p style={S.p}><strong>Root Cause:</strong> SQL Agent instability → SQL Server VSS Writer in failed state. 6 nights crash-consistent — PITR capability reduced.</p>
      <p style={S.p}><strong>Fix:</strong> SQL Agent issue resolved. VSS Writer recovered. Confirmed next backup application-consistent.</p>
      <p style={S.p}><strong>Prevention:</strong> SQL Agent monitoring. VSS writer state monitoring in daily health check.</p>

      <h3 style={S.h3}>Scenario 3 — VMware Snapshot Consolidation Issue</h3>
      <p style={S.p}><strong>Root Cause:</strong> Backup snapshot cleanup failed silently for 10 days. 150GB stale delta files accumulated. Datastore 92% full.</p>
      <p style={S.p}><strong>Fix:</strong> Proper snapshot consolidation through vCenter. Freed space. Backup cleanup monitoring added.</p>
      <p style={S.p}><strong>Prevention:</strong> VM snapshot count monitoring. Backup software health check for cleanup failures after each job.</p>

      <h3 style={S.h3}>Scenario 4 — Backup Succeeded but Restore Test Failed</h3>
      <p style={S.p}><strong>Root Cause:</strong> Production SQL Server had silent database corruption (DBCC CHECKDB errors not monitored). Backup successfully backed up corrupt data — job showed &quot;Success.&quot;</p>
      <p style={S.p}><strong>Recovery path:</strong> The corrupt database header prevented standard database attach/recovery. A DBCC CHECKDB repair was evaluated but deemed too risky — rebuilding from a known clean backup was chosen. Data reconciliation required for the gap period.</p>
      <p style={S.p}><strong>Prevention:</strong> DBCC CHECKDB regular maintenance. &quot;Success&quot; ≠ &quot;recoverable&quot; — backup verification and restore testing added.</p>

      <h3 style={S.h3}>Scenario 5 — Ransomware Reached Online Repository</h3>
      <p style={S.p}><strong>Root Cause:</strong> Ransomware compromised production admin credentials — same used for backup repository. Primary repository encrypted. Immutable copy (separate credentials, hardened repo): intact. Tape (weekly vaulted): intact.</p>
      <p style={S.p}><strong>Recovery:</strong> Isolated affected systems per IR team guidance. Shutdown vs. keep-running decided by IR team based on forensic requirements and organizational policy — not unilaterally. Restored from immutable copy.</p>
      <p style={S.p}><strong>Prevention:</strong> Backup credentials separated from production AD. MFA on backup console. All repositories configured with immutability. Tape vaulting frequency increased.</p>

      <h3 style={S.h3}>Scenario 6 — Tape Restore Delayed</h3>
      <p style={S.p}><strong>Root Cause:</strong> Tape drive at DR site needed cleaning — cleaning cartridge not in library. Catalog at DR site outdated (last sync 2 weeks prior). Total: 10 hours over 4-hour RTO target.</p>
      <p style={S.p}><strong>Prevention:</strong> Daily catalog sync to DR site. Monthly drive cleaning schedule. Quarterly DR readiness checks including tape infrastructure.</p>

      {/* ══ SECTION 46 — DANGEROUS MISTAKES ══════════════════════════════ */}
      <h2 id="dangerous-mistakes" style={S.h2}>Dangerous Backup Mistakes</h2>
      <Callout type="danger" title="These Mistakes Have Caused Real Data Loss">
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>Assuming snapshot = backup.</strong> Same storage dependency. Independent backup mandatory.</li>
          <li><strong>Assuming replication = backup.</strong> Mirrors corruption and ransomware.</li>
          <li><strong>Never testing restores.</strong> Silent corruption discovered only during crisis.</li>
          <li><strong>All copies under same credentials.</strong> One compromise = all accessible to attacker.</li>
          <li><strong>Only online writable copies.</strong> No immutable/offline = ransomware can encrypt all.</li>
          <li><strong>Ignoring repository capacity alerts.</strong> Repository full = jobs stop = unprotected data.</li>
          <li><strong>Manually deleting backup files from storage.</strong> Catalog integrity destroyed, chain broken.</li>
          <li><strong>Losing encryption keys.</strong> Encrypted backup + lost key = permanent loss.</li>
          <li><strong>Treating &quot;Success&quot; as guaranteed recovery.</strong> Job status ≠ application recoverability.</li>
          <li><strong>No offsite/isolated copy.</strong> Site disaster = all backups gone.</li>
          <li><strong>No documentation.</strong> Crisis scenario: who has credentials, where are keys, restore procedure?</li>
          <li><strong>No monitoring.</strong> Silent failures go unnoticed.</li>
          <li><strong>Same admin for production and backup.</strong> One compromised = both compromised.</li>
          <li><strong>Skipping application-consistency for databases.</strong> Crash-consistent backup → potential startup failure on restore.</li>
          <li><strong>Changing retention without impact review.</strong> Reduce retention = restore points expire early. Increase = capacity impact.</li>
        </ul>
      </Callout>

      {/* ══ SECTION 47 — CHANGE MANAGEMENT ══════════════════════════════ */}
      <h2 id="change-management" style={S.h2}>Backup Change Management</h2>
      <ul style={S.ul}>
        <li><strong>Policy changes:</strong> Retention reduction — compliance/legal hold implications. Scope changes — capacity impact.</li>
        <li><strong>Software upgrades:</strong> Test environment first. Agent compatibility matrix check. Rollback plan. Staged agent rollout.</li>
        <li><strong>Agent versions:</strong> Use supported/compatible versions per compatibility matrix — not simply latest. Validate backup success post-upgrade.</li>
        <li><strong>Encryption/key changes:</strong> Document old and new keys. Verify recovery with new keys before retiring old.</li>
        <li><strong>Tape/library changes:</strong> Drive/media compatibility. Catalog impact. Test all slots.</li>
        <li><strong>Post-change validation:</strong> Test backup on affected workloads. Verify restore point. Spot restore test. Document outcome.</li>
      </ul>

      {/* ══ SECTION 48 — COMPATIBILITY ════════════════════════════════════ */}
      <h2 id="compatibility" style={S.h2}>Backup Software / Platform Compatibility</h2>
      <CodeBlock lang="text">
{`Backup compatibility chain — ALL components must be compatible:

Backup Software Version/Build
    ↔ Operating System (exact version)
    ↔ Hypervisor (VMware vCenter/ESXi exact version)
    ↔ Application/Database (SQL Server/Oracle version)
    ↔ Backup Agent Version
    ↔ Storage Platform (if array integration)
    ↔ Repository Platform (OS, filesystem)
    ↔ Tape Library/Drive Model + Firmware
    ↔ Object Storage Platform (if used)

Always verify compatibility matrix before any component upgrade.`}
      </CodeBlock>

      {/* ══ SECTION 49 — ENTERPRISE PLATFORMS ════════════════════════════ */}
      <h2 id="enterprise-platforms" style={S.h2}>Enterprise Backup Platforms</h2>
      <Callout type="important" title="Verify Current Vendor Documentation">
        Capabilities vary significantly by edition, version, and licensing. Verify with current vendor documentation for your specific environment.
      </Callout>
      <ul style={S.ul}>
        <li><strong>Veeam Backup &amp; Replication:</strong> Widely deployed for VMware/Hyper-V/physical. Instant recovery, immutable repos, automated recovery verification. Version and edition specific.</li>
        <li><strong>Commvault:</strong> Enterprise-grade, broad platform support. Physical, virtual, cloud, databases, NAS.</li>
        <li><strong>Veritas NetBackup:</strong> Long-established enterprise. Strong database and heterogeneous OS support.</li>
        <li><strong>Dell PowerProtect (DD / Data Manager):</strong> Dell backup portfolio. PowerProtect DD as deduplication appliance.</li>
        <li><strong>Rubrik:</strong> Cloud-native, policy-driven, immutable architecture.</li>
        <li><strong>Cohesity DataProtect:</strong> Hyperconverged backup. DataLock for immutability.</li>
        <li><strong>IBM Storage Protect:</strong> Long-established, enterprise heterogeneous, strong tape integration.</li>
      </ul>

      {/* ══ SECTION 50 — OEM ESCALATION ═══════════════════════════════════ */}
      <h2 id="oem-escalation" style={S.h2}>OEM / Vendor Escalation Data</h2>
      <ul style={S.ul}>
        <li><strong>Backup infrastructure:</strong> Software name, version, exact build. Backup server OS. Proxy details.</li>
        <li><strong>Affected job:</strong> Job name, type, scheduled time. Affected workload. Exact error code and message. Timestamps (with timezone).</li>
        <li><strong>Logs:</strong> Full job log, backup server log, proxy log, source workload logs, VSS event logs (Windows), vCenter/ESXi events (VMware). Support bundle from backup software diagnostic collection feature.</li>
        <li><strong>Environment:</strong> Hypervisor version, application version, network topology, recent changes before issue.</li>
        <li><strong>Impact:</strong> Workloads affected, last successful backup, business impact, troubleshooting already done.</li>
      </ul>

      {/* ══ SECTION 51 — O&M CHECKLIST ════════════════════════════════════ */}
      <h2 id="om-checklist" style={S.h2}>Backup O&amp;M Checklist</h2>
      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>Any failed/warning jobs? Address before next window.</li>
        <li>Repository capacity under threshold?</li>
        <li>Offsite/copy jobs all completed?</li>
        <li>Critical workloads within RPO?</li>
        <li>Tape library alerts?</li>
      </ul>
      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Capacity growth trend</li>
        <li>Long-running jobs vs baseline</li>
        <li>Copy/immutable jobs current?</li>
        <li>Tape media inventory: sufficient scratch?</li>
        <li>Agent versions: any outside supported/compatible version range per compatibility matrix?</li>
      </ul>
      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>Restore testing per organizational schedule</li>
        <li>3–6 month capacity forecast</li>
        <li>Security/access review</li>
        <li>Patch advisories</li>
        <li>Orphaned scope cleanup</li>
      </ul>
      <h3 style={S.h3}>Quarterly / Periodic</h3>
      <ul style={S.ul}>
        <li>Recovery exercise per organizational policy — isolated environment</li>
        <li>Immutability validation: check retention lock settings in console and object lock bucket policy in cloud console. For functional testing: use vendor-documented test procedures or non-production test objects — do not attempt to delete actual production restore points as immutability test.</li>
        <li>Offsite strategy review</li>
        <li>Retention policy review — compliance and business alignment</li>
        <li>Compatibility review — upcoming OS/hypervisor/application upgrades</li>
        <li>Tape drive/library PM: professional maintenance per manufacturer schedule</li>
        <li>Ransomware recovery readiness tabletop exercise</li>
      </ul>

      {/* ══ SECTION 52 — PREVENTIVE MAINTENANCE ══════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <ul style={S.ul}>
        <li><strong>Tape drive cleaning:</strong> Per manufacturer recommendation — maintain cleaning cartridge inventory</li>
        <li><strong>Library robotics:</strong> Professional PM per vendor schedule</li>
        <li><strong>Backup server infrastructure:</strong> Thermal monitoring, redundant PSU health, UPS battery health</li>
        <li><strong>Catalog integrity check:</strong> Periodic, through backup software</li>
        <li><strong>Orphaned data cleanup:</strong> Through backup software, not manually from storage</li>
        <li><strong>Scope review:</strong> Any workloads missing from backup scope?</li>
      </ul>
      <Callout type="warning" title="No Unplanned Changes During PM">
        Do not make configuration changes during PM without change management. Do not manually delete backup files during cleanup activities.
      </Callout>

      {/* ══ SECTION 53 — DOCUMENTATION ════════════════════════════════════ */}
      <h2 id="backup-documentation" style={S.h2}>Backup Documentation</h2>
      <ul style={S.ul}>
        <li><strong>Architecture:</strong> Topology diagram, network paths, component inventory</li>
        <li><strong>Protected workload inventory:</strong> All in scope, policy per workload, RPO/RTO targets</li>
        <li><strong>Backup policies:</strong> Schedule, type, retention, GFS, copy/offsite, immutability</li>
        <li><strong>Repository inventory:</strong> Name, type, location, capacity, encryption, immutability settings</li>
        <li><strong>Key management:</strong> Document existence and secure location of encryption keys. Custodian contact. <strong>Do NOT store actual keys/passwords in plain text.</strong></li>
        <li><strong>Restore procedures:</strong> Step-by-step for each workload type. Emergency contacts.</li>
        <li><strong>Change history:</strong> Date, description, engineer, outcome</li>
      </ul>

      {/* ══ SECTION 54 — BACKUP MIGRATION ════════════════════════════════ */}
      <h2 id="backup-migration" style={S.h2}>Backup Migration</h2>
      <p style={S.p}><strong>Cross-vendor migration:</strong> Old backup data is typically only accessible through the original vendor&apos;s software — backup data formats and catalog structures are proprietary. The physical data may exist on disk/tape/cloud but without the original vendor software and catalog, it cannot be browsed or restored. Some vendors offer import tools or data recovery without catalog — but plan for parallel operation. Communicate to stakeholders that historical restore points will become inaccessible in the new platform unless old platform is maintained.</p>
      <ul style={S.ul}>
        <li><strong>Restore point preservation:</strong> Plan parallel operation period</li>
        <li><strong>Agent migration:</strong> Staged rollout — minimize protection gap</li>
        <li><strong>Validation:</strong> Spot restore test, update documentation, maintain rollback capability</li>
      </ul>

      {/* ══ SECTION 55 — INTERVIEW ═════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q: Backup kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Production data ka recoverable copy — different failure domain, separate access controls, historical restore points. Core properties: survives source failure, recoverable to past state. Snapshot ya replication replace nahi karta.</p>

      <h3 style={S.h3}>Q: Backup vs snapshot?</h3>
      <p style={S.p}><strong>Answer:</strong> Snapshot same storage system pe — source fail → snapshot gone. Immutable snapshots improve protection but strength depends on implementation mode and access level. Independent backup = different failure domain. Snapshot = fast operational recovery; backup = independent protection.</p>

      <h3 style={S.h3}>Q: Backup vs replication?</h3>
      <p style={S.p}><strong>Answer:</strong> Replication continuously/periodically sync karta hai — availability. Corruption, deletion, ransomware replicate hote hain. Backup historical point-in-time copies rakhta hai. Complementary, different roles.</p>

      <h3 style={S.h3}>Q: Backup vs DR?</h3>
      <p style={S.p}><strong>Answer:</strong> Backup specific data/systems recover karta hai. DR poori business/service capability restore karta hai — infrastructure, networking, apps, processes. Backup DR ka ek component ho sakta hai but DR much broader hai.</p>

      <h3 style={S.h3}>Q: RPO kya hai? RTO?</h3>
      <p style={S.p}><strong>Answer:</strong> RPO = acceptable data loss — business decision, not IT alone. RPO ≠ simply backup frequency — log-based backup can improve RPO between scheduled backups. RTO = acceptable downtime — includes detection + decision + restore + startup + validation, not just restore speed.</p>

      <h3 style={S.h3}>Q: Full vs incremental vs differential?</h3>
      <p style={S.p}><strong>Answer:</strong> Full: everything, max storage, fastest restore. Incremental: changes since last backup, min storage, slowest restore (full chain required). Differential: changes since last full, medium storage (grows), moderate restore (only 2 sets needed).</p>

      <h3 style={S.h3}>Q: Synthetic full kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Repository pe existing full + incrementals combine karke new full — bina source data read kiye. Zero production I/O. Quality depends on chain integrity. Product-specific implementation.</p>

      <h3 style={S.h3}>Q: 3-2-1 kya hai? 3-2-1-1-0?</h3>
      <p style={S.p}><strong>Answer:</strong> 3 copies, 2 media types, 1 offsite. 3-2-1-1-0 adds: 1 offline/immutable/air-gapped, 0 errors after verification/testing. Strategies/guidelines — not formally codified standards.</p>

      <h3 style={S.h3}>Q: Immutable backup kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Enforcement mechanism designed to prevent modification/deletion during configured retention period per platform and mode. Compliance mode = strongest. Governance mode = privileged override possible. Strength implementation-dependent.</p>

      <h3 style={S.h3}>Q: Crash-consistent vs application-consistent?</h3>
      <p style={S.p}><strong>Answer:</strong> Crash-consistent: no quiesce — may require crash recovery. Application-consistent: properly quiesced (VSS/VMware Tools/DB mechanism) — known-consistent state at backup time. Does not protect against pre-existing corruption. Restore testing still essential.</p>

      <h3 style={S.h3}>Q: VSS kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Windows Volume Shadow Copy Service — coordination framework. Requestor (backup app), Provider (creates snapshot), Writer (app ensures consistent state). NOT a backup product.</p>

      <h3 style={S.h3}>Q: CBT kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Changed Block Tracking — VMware vSphere tracking mechanism for which blocks changed. Used by backup software for efficient incremental. CBT = tracking mechanism, not backup itself. CBT reset = remediation when inconsistency detected, not routine maintenance.</p>

      <h3 style={S.h3}>Q: Restore tests kyun important hain?</h3>
      <p style={S.p}><strong>Answer:</strong> &quot;Success&quot; ≠ recoverable. Data may be corrupt, key inaccessible, catalog inconsistent, application may not start. Find out during routine test — not during crisis.</p>

      <h3 style={S.h3}>Q: Backup jobs suddenly fail — kya check?</h3>
      <p style={S.p}><strong>Answer:</strong> Layer-by-layer: source accessible? Agent running (supported/compatible version per matrix)? VSS/snapshot OK? Proxy OK? Repository accessible + capacity? Network OK? Read exact error — targeted fix. Do not blindly retry.</p>

      <h3 style={S.h3}>Q: Repository full — kya hoga?</h3>
      <p style={S.p}><strong>Answer:</strong> Jobs fail. Through backup software: old non-immutable data per policy. Extend repository. Review retention. Never manually delete files. Never bypass immutability controls.</p>

      <h3 style={S.h3}>Q: Separate backup credentials kyun?</h3>
      <p style={S.p}><strong>Answer:</strong> Compromised production admin → same credentials = backup accessible to attacker. Separate accounts = compromised production ≠ compromised backup. Critical ransomware protection.</p>

      <h3 style={S.h3}>Q: OEM escalation se pehle kya?</h3>
      <p style={S.p}><strong>Answer:</strong> Backup software version/build, job name/workload, exact error + code, timestamps, full job log, backup server log, proxy log, source logs, hypervisor/app version, recent changes, support bundle.</p>

      {/* ══ SECTION 56 — KEY TAKEAWAYS ════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>Backup = different failure domain, separate access, recoverable to past state.</strong></li>
        <li><strong>Snapshot ≠ Backup. Replication ≠ Backup.</strong></li>
        <li><strong>Offsite ≠ Immutable ≠ Air-Gapped.</strong> Three different properties.</li>
        <li><strong>Backup job Success ≠ Recoverable.</strong> Verify via restore testing.</li>
        <li><strong>RPO ≠ simply backup frequency.</strong> Log-based backup improves RPO between schedules.</li>
        <li><strong>RTO = detection + decision + restore + startup + validation.</strong></li>
        <li><strong>Backup chain integrity critical.</strong> Broken chain = broken restore for all dependent points.</li>
        <li><strong>Application-consistent</strong> = coordinated state at backup time. Not a guarantee against pre-existing corruption.</li>
        <li><strong>VSS = coordination framework.</strong> CBT = tracking mechanism. Neither is a backup product.</li>
        <li><strong>CBT reset = remediation, not routine maintenance.</strong></li>
        <li><strong>VMware snapshots = temporary operational mechanism.</strong> Not long-term backup.</li>
        <li><strong>No universal VMware datastore free-space percentage.</strong></li>
        <li><strong>Tape media life = manufacturer-specified, condition-dependent.</strong></li>
        <li><strong>No FLUSH TABLES WITH READ LOCK</strong> as general MySQL backup guidance.</li>
        <li><strong>Ransomware shutdown decision = IR team decision</strong> per organizational policy.</li>
        <li><strong>Immutability effectiveness = platform + configured enforcement mode.</strong> Compliance mode strongest.</li>
        <li><strong>Compression + dedup ratios NOT simply multiplicative</strong> for production sizing.</li>
        <li><strong>Backup agents = supported/compatible per matrix,</strong> not simply latest.</li>
        <li><strong>Do NOT test immutability by deleting production restore points.</strong></li>
        <li><strong>Retention = organization/jurisdiction/compliance dependent.</strong> Legal team input required in regulated environments.</li>
        <li><strong>Separate backup credentials from production.</strong> Critical ransomware protection.</li>
        <li><strong>Encryption key management non-optional.</strong> Lost key = permanently unrecoverable backup.</li>
        <li><strong>Restore testing mandatory</strong> — periodic, documented, isolated, application validated.</li>
        <li><strong>Documentation mandatory.</strong> Architecture, procedures, key management, runbooks.</li>
      </ul>

      {/* ══ FAQ ════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop:"3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom:"1.5rem", paddingBottom:"1.5rem", borderBottom: i < faqs.length-1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight:700, marginBottom:"0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom:0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ RELATED TOPICS ═════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop:"3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="disaster-recovery" variant="inline" /> — Backup se aage: full business continuity planning.</li>
        <li><TopicLink slug="san" variant="inline" /> — SAN storage: enterprise backup ka primary block storage target.</li>
        <li><TopicLink slug="nas" variant="inline" /> — NAS storage: large file systems, NAS backup challenges.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware: physical servers jo backup agents host karte hain.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware fundamentals: VM backup ka primary context.</li>
      </ul>
    </>
  );
}
