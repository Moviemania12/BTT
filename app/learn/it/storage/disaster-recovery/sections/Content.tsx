"use client";
import TopicLink from "@/components/TopicLink";
import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import { faqs } from "../metadata";
import DrVsHaVsBackup       from "../svg/DrVsHaVsBackup";
import DrRpoRtoTimeline      from "../svg/DrRpoRtoTimeline";
import DrSiteTypes           from "../svg/DrSiteTypes";
import DrReplicationTypes    from "../svg/DrReplicationTypes";
import DrArchitecture        from "../svg/DrArchitecture";
import DrRecoverySequence    from "../svg/DrRecoverySequence";
import DrRansomwareRecovery  from "../svg/DrRansomwareRecovery";
import DrTroubleshootFlow    from "../svg/DrTroubleshootFlow";

export default function Content() {
  return (
    <>
      {/* ══ QUICK SUMMARY ══════════════════════════════════════════════════ */}
      <h2 id="quick-summary" style={S.h2}>Quick Summary — DR in 2 Minutes</h2>
      <ul style={S.ul}>
        <li><strong>DR kya hai:</strong> Documented policies, processes, tools, and infrastructure jo ensure karte hain ki organization critical IT systems aur data ko major disruption ke baad defined RTO aur RPO ke andar restore kar sake.</li>
        <li><strong>DR ≠ Backup:</strong> Backup data protect karta hai. DR poori service/business capability restore karta hai — infrastructure, network, applications, dependencies sab.</li>
        <li><strong>DR ≠ HA:</strong> HA component failures ke against continuous operation. DR major site-level ya systemic failures ke baad recovery.</li>
        <li><strong>RPO:</strong> Acceptable data loss in time — last consistent recovery point to failure moment. Not simply backup frequency.</li>
        <li><strong>RTO:</strong> Time to restore business-available service — includes detection, declaration, infrastructure, data, dependencies, validation. Not just restore speed.</li>
        <li><strong>DR Sites:</strong> Hot (always-on, near-zero RTO/RPO), Warm (partially provisioned, moderate), Cold (minimal, highest RTO/RPO, lowest cost).</li>
        <li><strong>Replication:</strong> Synchronous (near-zero RPO, distance/latency limited) vs Asynchronous (supports greater geographic separation, non-zero RPO).</li>
        <li><strong>Failover:</strong> Switching operations to DR site. <strong>Failback:</strong> returning to primary — requires resync, validation, controlled cutover. Not simply reverse failover.</li>
        <li><strong>Testing:</strong> Untested DR = undiscovered DR. Tabletop → walkthrough → simulation → partial → full failover — increasing disruption and confidence.</li>
        <li><strong>Ransomware:</strong> Traditional DR may restore infected data. Cyber recovery requires isolated clean environment, forensic verification, clean restore point.</li>
      </ul>

      {/* ══ DR KYA HAI ═════════════════════════════════════════════════════ */}
      <h2 id="dr-kya-hai" style={S.h2}>Disaster Recovery Kya Hai</h2>
      <p style={S.p}><strong>Disaster Recovery (DR) = Technology-focused capability to restore IT systems, data, and services after a major disruption — within predefined RTO and RPO targets.</strong></p>
      <p style={S.p}>DR answers: Agar primary data center fail ho jaaye — services kahan aur kaise chalenge? Kitne time mein? (RTO) Kitna data loss acceptable hai? (RPO) Konsi systems pehle recover hogi? Kaun declare karega failover?</p>
      <Callout type="important" title="DR is Not a Product">
        DR ek combination hai: documented strategy, infrastructure preparation, tested processes, runbooks, trained people, aur validated technology. Koi ek product ya tool akela DR nahi hai.
      </Callout>

      {/* ══ DISASTER VS FAILURE ════════════════════════════════════════════ */}
      <h2 id="disaster-vs-failure" style={S.h2}>Disaster vs Failure vs Outage vs Incident</h2>
      <p style={S.p}><strong>Failure:</strong> Component stops functioning. Single disk fails, NIC fails, service crashes. Handled by HA/redundancy — typically no DR invocation needed.</p>
      <p style={S.p}><strong>Outage:</strong> Service or application becomes unavailable. Caused by failure, maintenance, or misconfiguration. May or may not require DR.</p>
      <p style={S.p}><strong>Incident:</strong> Event disrupting or threatening normal IT service. Ranges from minor to major.</p>
      <p style={S.p}><strong>Disaster:</strong> Event severe enough that normal operations cannot be restored within acceptable time using normal procedures — requiring DR invocation. Data center fire/flood, major power failure, ransomware encrypting all production, ISP failure with no redundancy.</p>
      <Callout type="warning" title="Disaster Declaration = Formal Business Decision">
        Disaster declaration automatic technical trigger nahi hai. Authority, threshold, aur process advance mein define hone chahiye.
      </Callout>

      {/* ══ BCP VS DR ══════════════════════════════════════════════════════ */}
      <h2 id="bcp-vs-dr" style={S.h2}>Business Continuity vs DR</h2>
      <p style={S.p}><strong>Business Continuity Planning (BCP):</strong> Broader — ensures entire organization (people, processes, facilities, technology) can continue critical functions during and after disruption.</p>
      <p style={S.p}><strong>Disaster Recovery (DR):</strong> Technology-focused subset of BCP — specifically IT systems, data, aur infrastructure recovery.</p>
      <CodeBlock lang="text">
{`Business Continuity (BCP)
├── Disaster Recovery (DR)      ← IT/Technology focus
├── Crisis Management           ← Leadership/communication
├── Business Continuity         ← Non-IT processes, workarounds
├── Emergency Response          ← Physical safety, facilities
└── Supply Chain Continuity     ← Vendor/procurement

DR alone ≠ business continuity.
If IT recovered but key staff unavailable or supplier systems down
→ business is not continuous.`}
      </CodeBlock>

      {/* ══ BACKUP VS DR ═══════════════════════════════════════════════════ */}
      <h2 id="backup-vs-dr" style={S.h2}>Backup vs DR</h2>
      <p style={S.p}><strong><TopicLink slug="backup" variant="inline" /> data protect karta hai.</strong> Historical recoverable copies. Deleted file ya corrupted database restore karne ke liye.</p>
      <p style={S.p}><strong>DR service capability restore karta hai.</strong> Primary data center unavailable hone pe IT services kaise resume hogi. DR may use backup as one recovery mechanism — but DR encompasses far more.</p>
      <CodeBlock lang="text">
{`Backup success example:
  500GB SQL Server backup from last night exists.

DR success example:
  Within 2 hours of primary site failure:
  SQL Server running at DR site,
  connected to application servers,
  tested and available to users.

The gap between those two = DR infrastructure,
runbooks, failover, network, and validation.`}
      </CodeBlock>
      <Callout type="danger" title="Backup ≠ DR">
        Backup alone does not address: infrastructure availability at alternate location, network connectivity, application dependencies, DNS/routing changes, staff access, defined RTO/RPO SLAs. Backup is ONE component of DR — not DR itself.
      </Callout>

      {/* ══ HA VS DR ═══════════════════════════════════════════════════════ */}
      <h2 id="ha-vs-dr" style={S.h2}>HA vs DR</h2>
      <Figure caption="Fig 1 — Backup vs High Availability vs Disaster Recovery: different protection mechanisms, different scopes, different threats.">
        <DrVsHaVsBackup />
      </Figure>
      <ComparisonTable
        title="HA vs DR Comparison"
        headers={["","HA","DR"]}
        rows={[
          ["Scope",       "Component / subsystem",              "Site / major system / organization"],
          ["Trigger",     "Automatic on component failure",     "Declared after major disruption"],
          ["Location",    "Typically within the same cluster, site, or zone",  "Alternate site or infrastructure"],
          ["RTO",         "Seconds to minutes (automated)",     "Minutes to hours or days"],
          ["Cost",        "Higher (redundant components)",      "Additional (alternate site/infra)"],
          ["Example",     "RAID protects disk failure",         "DR site activates if entire DC floods"],
        ]}
        caption="HA does NOT protect against: site-level disasters, widespread ransomware across prod + HA, administrative errors affecting all nodes, or regional outages."
      />

      {/* ══ FAULT TOLERANCE ════════════════════════════════════════════════ */}
      <h2 id="fault-tolerance" style={S.h2}>Fault Tolerance vs HA vs DR</h2>
      <ComparisonTable
        title="Fault Tolerance vs HA vs DR"
        headers={["","Fault Tolerance","High Availability","Disaster Recovery"]}
        rows={[
          ["Goal",        "Zero disruption on failure",         "Near-zero disruption",             "Recovery after major disruption"],
          ["Mechanism",   "Redundant active processing",        "Failover between redundant comps", "Recovery to alternate site"],
          ["Downtime",    "None (no switchover)",               "Brief (failover time)",            "Minutes to days"],
          ["Example",     "RAID-1 (storage-level media redundancy), active-active DB cluster","VMware HA, Windows FCI",           "Hot/warm/cold DR site"],
          ["Cost",        "Highest",                            "High",                             "Depends on DR tier"],
        ]}
        caption="All three layers serve different purposes — critical workloads typically need all three."
      />

      {/* ══ TERMINOLOGY ════════════════════════════════════════════════════ */}
      <h2 id="dr-terminology" style={S.h2}>DR Terminology</h2>
      <ul style={S.ul}>
        <li><strong>Primary Site:</strong> Normal operating environment — where workloads run day-to-day.</li>
        <li><strong>DR Site / Recovery Site:</strong> Alternate location for recovery/activation during disaster.</li>
        <li><strong>Failover:</strong> Switching workloads from primary to DR site.</li>
        <li><strong>Failback:</strong> Returning from DR to primary after primary restored. Not reverse failover — requires planning, resync, validation.</li>
        <li><strong>RPO (Recovery Point Objective):</strong> Acceptable data loss measured in time.</li>
        <li><strong>RTO (Recovery Time Objective):</strong> Acceptable unavailability measured in time.</li>
        <li><strong>MTD / MAO:</strong> Maximum Tolerable Downtime / Maximum Acceptable Outage — limit before impact becomes catastrophic. MTD ≥ RTO always.</li>
        <li><strong>WRT (Work Recovery Time):</strong> Time after systems restored to validate, process backlogs, reach business-ready state. RTO + WRT ≤ MTD.</li>
        <li><strong>BIA (Business Impact Analysis):</strong> Formal analysis identifying critical processes, impact of disruption, RPO/RTO requirements.</li>
        <li><strong>Disaster Declaration:</strong> Formal decision to invoke DR. Authority, thresholds, escalation predefined.</li>
        <li><strong>DR Runbook:</strong> Detailed step-by-step technical procedures for DR execution.</li>
        <li><strong>Replication:</strong> Continuous or periodic data copying from primary to DR site.</li>
        <li><strong>Orchestration:</strong> Automated/semi-automated DR workflow coordinating recovery steps in sequence.</li>
        <li><strong>Split-Brain:</strong> Both primary and DR simultaneously believe they are authoritative → data conflicts. Must be prevented.</li>
        <li><strong>RTA / RPA:</strong> Recovery Time Actual / Recovery Point Actual — measured during test or real event, compared against RTO/RPO.</li>
      </ul>

      {/* ══ RPO ════════════════════════════════════════════════════════════ */}
      <h2 id="rpo-deep" style={S.h2}>RPO — Deep Explanation</h2>
      <Figure caption="Fig 2 — RPO & RTO disaster timeline. RTO measurement start and end points must be explicitly defined — account for detection, decision, technical recovery, and validation. WRT continues after technical recovery: RTO + WRT ≤ MTD.">
        <DrRpoRtoTimeline />
      </Figure>
      <p style={S.p}><strong>RPO = maximum age of data that must be recovered.</strong> How far back in time is acceptable to restore. If RPO = 4 hours: any data written in the last 4 hours before failure may be lost — and that is organizationally acceptable.</p>
      <p style={S.p}><strong>RPO is a business decision.</strong> Business decides acceptable data loss per application. IT designs replication/backup to meet it.</p>
      <ul style={S.ul}>
        <li><strong>Synchronous replication:</strong> Near-zero RPO — in a typical synchronous replication design, a write is acknowledged after the replication system satisfies its configured local and remote write-commit requirements. Exact acknowledgement and persistence semantics vary by product and configuration.</li>
        <li><strong>Asynchronous replication:</strong> Non-zero RPO — replication lag = potential data loss</li>
        <li><strong>Snapshot-based replication:</strong> Achievable RPO influenced by snapshot schedule plus replication/copy completion and availability of a usable recovery point</li>
        <li><strong>Backup-based DR:</strong> RPO = time since last verified backup</li>
      </ul>
      <Callout type="warning" title="Synchronous Replication = Near-Zero RPO, Not Zero RPO">
        In-flight transactions, application write buffers, aur application state at exact failure moment — sab consider karne hote hain. &quot;Near-zero&quot; technically accurate hai. Also distance/latency limited — each write I/O round-trip includes DR site latency.
      </Callout>

      {/* ══ RTO ════════════════════════════════════════════════════════════ */}
      <h2 id="rto-deep" style={S.h2}>RTO — Deep Explanation</h2>
      <p style={S.p}><strong>RTO ≠ simply restore speed.</strong> RTO = maximum acceptable duration from disaster event to business-available service.</p>
      <CodeBlock lang="text">
{`RTO components (all must be accounted for):
  1. Detection time         — monitoring alert + human verification
  2. Confirmation           — is this actually a disaster?
  3. Disaster declaration   — authorized personnel, formal decision
  4. Infrastructure recovery — network, storage, compute, identity
  5. Data recovery          — DB failover, replication verify, mount
  6. Dependency startup     — AD → DNS → DB → App → Web (in order)
  7. Validation             — health checks, data spot check
  8. Business availability  — users can actually access and use

The organization must explicitly define RTO measurement start
and end points. Detection, decision/declaration, technical
recovery, dependency startup, and validation delays must all
be accounted for when determining whether the business
recovery objective can be met.`}
      </CodeBlock>

      {/* ══ RPO VS RTO ═════════════════════════════════════════════════════ */}
      <h2 id="rpo-vs-rto" style={S.h2}>RPO vs RTO Comparison</h2>
      <ComparisonTable
        title="RPO vs RTO"
        headers={["","RPO","RTO"]}
        rows={[
          ["Measures",        "Data loss in time",                      "Downtime in time"],
          ["Business Q",      "How much data can we lose?",             "How long can we be down?"],
          ["Determines",      "Replication/backup type & frequency",    "DR site tier, infra readiness"],
          ["Near-zero means", "Appropriate sync/continuous replication + recovery design",  "Active-Active or hot standby (highest cost)"],
          ["Cost driver",     "Lower RPO = more frequent replication",  "Lower RTO = more infra standing by"],
          ["Practical note",  "Sub-minute possible with sync replication","Minutes possible with hot site"],
        ]}
        caption="Right-size RPO/RTO per application criticality from BIA. Zero RPO/RTO for every app is neither practical nor economically justified."
      />

      {/* ══ MTD / WRT ══════════════════════════════════════════════════════ */}
      <h2 id="mtd-wrt" style={S.h2}>MTD / MAO aur WRT</h2>
      <p style={S.p}><strong>MTD (Maximum Tolerable Downtime):</strong> Maximum duration a critical function can be disrupted before organizational impact becomes catastrophic — threatening business survival, regulatory violation, or irreversible customer loss. MTD ≥ RTO always.</p>
      <CodeBlock lang="text">
{`Timeline relationship:
Disaster → [RTO] → Systems available → [WRT] → Business ready
│◄─────────────────── MTD ──────────────────────────────────►│

RTO + WRT ≤ MTD

Example: Payroll system
  MTD: 4 days (before salary payments fail)
  RTO: 8 hours (systems technically up)
  WRT: 4 hours (validate data, process corrections)
  Total: 12 hours — within MTD ✓`}
      </CodeBlock>
      <p style={S.p}><strong>WRT (Work Recovery Time):</strong> After IT systems are technically available — time to validate data integrity, process accumulated manual transactions, clear backlogs, confirm application is business-ready (not just technically available).</p>

      {/* ══ BIA ════════════════════════════════════════════════════════════ */}
      <h2 id="bia" style={S.h2}>Business Impact Analysis (BIA)</h2>
      <p style={S.p}><strong>BIA = Formal analysis identifying critical business processes, quantifying disruption impact, and informing RPO/RTO requirements.</strong></p>
      <p style={S.p}>BIA process: Identify all business processes → map supporting IT systems → identify dependencies → quantify impact at defined intervals → determine MTD per process → derive RPO/RTO → prioritize recovery sequence.</p>
      <Callout type="important" title="BIA Drives DR Design — Not the Other Way Around">
        BIA is not an IT exercise alone. Business unit input mandatory. Without BIA, DR design is guesswork — systems prioritized by IT preference instead of business criticality.
      </Callout>

      {/* ══ RISK VS BIA ════════════════════════════════════════════════════ */}
      <h2 id="risk-vs-bia" style={S.h2}>Risk Assessment vs BIA</h2>
      <ComparisonTable
        title="Risk Assessment vs BIA"
        headers={["","Risk Assessment","Business Impact Analysis"]}
        rows={[
          ["Focus",    "Threats and vulnerabilities",       "Impact of disruption"],
          ["Question", "What could go wrong?",              "What happens if it does?"],
          ["Output",   "Risk prioritization, mitigations",  "RPO/RTO requirements, recovery priorities"],
          ["Who",      "IT Security, Risk Management",      "Business units + IT together"],
        ]}
        caption="Both required. Risk assessment identifies what to protect against; BIA determines how fast recovery must be."
      />

      {/* ══ APPLICATION TIERS ══════════════════════════════════════════════ */}
      <h2 id="app-tiers" style={S.h2}>Application Criticality / Recovery Tiers</h2>
      <Callout type="important" title="Recovery Tier Models Are Organization-Specific">
        No single universal tier model. The following is an illustrative educational example — adapt to organizational context and BIA output.
      </Callout>
      <ComparisonTable
        title="Illustrative Recovery Tier Model"
        headers={["Tier","Description","RPO (example)","RTO (example)","DR Model"]}
        rows={[
          ["Tier 1","Mission Critical — revenue, regulatory, customer-facing core","Seconds–minutes","Minutes–2 hrs","Hot/Active-Active"],
          ["Tier 2","Business Critical — brief outage tolerable","Minutes–1 hr","2–8 hours","Warm"],
          ["Tier 3","Business Operational — significant but not immediate impact","1–8 hours","8–24 hours","Warm/Cold"],
          ["Tier 4","Administrative — internal, non-customer-facing","24 hours","24–72 hours","Cold/Backup-restore"],
          ["Tier 5","Archival/Development — non-production","Days/weeks","Days","Backup-restore"],
        ]}
        caption="Over-classifying creates unnecessarily expensive DR. Dependencies matter: Tier 2 app depending on Tier 4 AD/DNS requires dependency recovered first regardless of tier."
      />

      {/* ══ SITE TYPES ═════════════════════════════════════════════════════ */}
      <h2 id="site-types" style={S.h2}>Hot vs Warm vs Cold DR Sites</h2>
      <Figure caption="Fig 3 — Hot vs Warm vs Cold DR site comparison. No universal distance requirement — determine from disaster risk scenarios and regulatory requirements.">
        <DrSiteTypes />
      </Figure>
      <Callout type="important" title="No Universal DR Site Distance Requirement">
        Distance should be determined by: disaster risk scenarios (regional disasters, power grid zones), synchronous replication latency constraints, regulatory requirements, and organizational context. No single minimum distance applies universally.
      </Callout>

      {/* ══ ACTIVE-ACTIVE ══════════════════════════════════════════════════ */}
      <h2 id="active-active" style={S.h2}>Active-Active DR</h2>
      <p style={S.p}>Both primary and DR sites handle live traffic simultaneously. Active-active architectures can achieve very low or potentially near-zero service interruption, but actual service-continuity performance depends on failure detection, traffic steering, application architecture, data consistency, and dependency availability. No idle standby capacity — both sites productive. Continuous validation (DR is constantly in use).</p>
      <p style={S.p}><strong>Challenges:</strong> Data consistency across sites, conflict resolution, write ordering, application must support geographic distribution, significantly higher complexity, not all applications support active-active distributed operation.</p>
      <Callout type="warning" title="Active-Active ≠ Zero RPO Automatically">
        Asynchronously replicated active-active still has non-zero RPO. Even synchronously replicated active-active requires application-consistent state at failure time. Consistency model determines actual RPO achievable.
      </Callout>

      {/* ══ ACTIVE-PASSIVE ═════════════════════════════════════════════════ */}
      <h2 id="active-passive" style={S.h2}>Active-Passive DR</h2>
      <p style={S.p}>Primary handles all production. DR site in standby — data synchronized, infrastructure ready, not serving live traffic. Explicit failover action required on disaster (manual or orchestrated).</p>
      <p style={S.p}><strong>Variants:</strong> Hot standby (DR running, failover in minutes), Warm standby (partial activation needed, hours), Cold standby (not running, backup restore).</p>

      {/* ══ PILOT LIGHT ════════════════════════════════════════════════════ */}
      <h2 id="pilot-light" style={S.h2}>Pilot Light</h2>
      <p style={S.p}>Minimal always-on DR configuration where only absolute core infrastructure runs at DR (typically database replication receiver, essential network) — rest provisioned on-demand during failover.</p>
      <p style={S.p}><strong>Analogy:</strong> Pilot light on gas boiler — tiny flame always burning, ready to ignite full burner. Common in cloud DR (database read replica + minimal VPC always running; compute instances provisioned from AMIs on failover). RTO: hours (provisioning time). Cost: lower than warm/hot.</p>

      {/* ══ WARM STANDBY ═══════════════════════════════════════════════════ */}
      <h2 id="warm-standby" style={S.h2}>Warm Standby</h2>
      <p style={S.p}>DR infrastructure scaled-down but running. Database receiving replication, minimal application stack running at reduced capacity. <strong>Scaling up required during failover</strong> — more instances, bigger compute to handle production load. RTO: minutes to low hours. RPO: depends on replication type.</p>

      {/* ══ BACKUP-RESTORE DR ══════════════════════════════════════════════ */}
      <h2 id="backup-restore-dr" style={S.h2}>Backup-and-Restore DR Model</h2>
      <p style={S.p}>Lowest cost, highest RTO/RPO. No pre-provisioned DR infrastructure. On disaster: provision infrastructure → restore from backup → configure → validate → redirect traffic. RTO: hours to days. RPO: dependent on backup frequency. Use case: non-critical applications, high MTD tolerance, dev/test environments.</p>

      {/* ══ SYNCHRONOUS ════════════════════════════════════════════════════ */}
      <h2 id="sync-replication" style={S.h2}>Synchronous Replication</h2>
      <Figure caption="Fig 4 — Synchronous vs Asynchronous replication write flow and RPO implications.">
        <DrReplicationTypes />
      </Figure>
      <p style={S.p}>Write acknowledged to application only after confirmed on both primary and DR site. Near-zero data loss for application-acknowledged writes.</p>
      <p style={S.p}><strong>Distance/latency constraint:</strong> Every write I/O round-trip includes DR site network latency. High latency = degraded application performance. Practical synchronous replication distances depend on application I/O profile, acceptable latency overhead, and vendor implementation — no single universal distance limit.</p>
      <Callout type="important" title="Near-Zero RPO — Not Guaranteed Zero">
        In-flight transactions, write buffers, aur application state at exact failure moment sab matter karte hain. &quot;Near-zero&quot; is the technically accurate characterization.
      </Callout>

      {/* ══ ASYNCHRONOUS ═══════════════════════════════════════════════════ */}
      <h2 id="async-replication" style={S.h2}>Asynchronous Replication</h2>
      <p style={S.p}>Write acknowledged to application after primary write. Replication to DR site happens independently in background with configurable lag. Remote-site round-trip latency is normally not in the application acknowledgement path, although replication processing, journaling, resource contention, or implementation details may still introduce overhead. Supports much greater geographic separation than synchronous replication — practical distance is still constrained by connectivity, bandwidth, replication backlog, product limits, and required RPO.</p>
      <Callout type="warning" title="Non-Zero RPO — Replication Lag = Potential Data Loss">
        RPO = replication lag at time of failure. Data written to primary but not yet replicated may be lost. Replication queue backlog during peak writes or network degradation can increase RPO.
      </Callout>

      {/* ══ SYNC VS ASYNC ══════════════════════════════════════════════════ */}
      <h2 id="sync-vs-async" style={S.h2}>Sync vs Async Comparison</h2>
      <ComparisonTable
        title="Synchronous vs Asynchronous Replication"
        headers={["","Synchronous","Asynchronous"]}
        rows={[
          ["RPO",              "Near-zero (acknowledged writes)",     "Non-zero (replication lag)"],
          ["App impact",       "Write latency = DR round-trip",       "Round-trip not normally in ack path; overhead may still occur"],
          ["Distance",         "Limited by acceptable latency",       "Greater geographic separation; constrained by connectivity, BW, product limits"],
          ["Network required", "Very high reliability",               "Moderate"],
          ["Typical use",      "Tier 1, short distances",             "Longer distances, moderate RPO"],
          ["Cost",             "Higher — low-latency links required", "Lower network requirements"],
        ]}
        caption="Mixed-mode common: synchronous to nearby secondary (near-zero RPO) + asynchronous to distant tertiary (geographic DR). Balances RPO with geographic protection."
      />

      {/* ══ STORAGE REPLICATION ════════════════════════════════════════════ */}
      <h2 id="storage-replication" style={S.h2}>Storage Replication for DR</h2>
      <h3 style={S.h3}>Block-Level (SAN/Storage Array)</h3>
      <p style={S.p}>Storage array replicates at LUN/volume block level. Host/application typically unaware. Very efficient — only changed blocks transferred. Examples: Dell PowerProtect/RecoverPoint, NetApp SnapMirror (block), HPE Peer Persistence, IBM Metro Mirror. Array-specific — features and behavior vary by vendor and product generation. Verify current vendor documentation.</p>
      <h3 style={S.h3}>Hypervisor-Level VM Replication</h3>
      <p style={S.p}>VMware vSphere Replication, Hyper-V Replica. Replicates at VM level over standard IP network. Not dependent on shared storage. Changed-block tracking mechanisms vary by platform — VMware technologies may use CBT-related mechanisms, while current Hyper-V Replica uses Resilient Change Tracking (RCT). RPO/RTO capabilities vary by product version and configuration — verify current documentation.</p>
      <h3 style={S.h3}>Host-Based / Application-Level</h3>
      <p style={S.p}>Software on source server replicates data to DR target. OS-level, application-level, or volume manager level. Examples: DRBD (Linux), Windows DFS-R, database-native replication. Platform-independent but requires agent/software management.</p>

      {/* ══ VMWARE DR ══════════════════════════════════════════════════════ */}
      <h2 id="vmware-dr" style={S.h2}>VMware DR</h2>
      <p style={S.p}><strong>VMware vSphere Replication:</strong> Built-in hypervisor-level VM replication. Integrates with VMware Site Recovery Manager (SRM). Not dependent on shared storage. RPO minimum and capabilities — verify current VMware/Broadcom documentation for your version.</p>
      <p style={S.p}><strong>VMware Site Recovery Manager (SRM):</strong> DR orchestration for vSphere. Automates failover sequence, network mapping, IP re-addressing. Integrates with storage array replication or vSphere Replication. Recovery Plans define sequence, dependencies, test/failover procedures. Planned Failover vs Emergency Failover distinction important — different runbooks required.</p>
      <Callout type="important" title="VMware HA ≠ VMware SRM">
        VMware HA = automatic VM restart within same cluster on host failure (HA). VMware SRM = DR orchestration to separate site. Different products, different scope. VMware HA does NOT provide DR.
      </Callout>
      <p style={S.p}><strong>VMware Cloud DR options</strong> (VMware Live Recovery, etc.): Product lines evolve with Broadcom acquisition — verify current VMware/Broadcom documentation for current products, pricing, and capabilities.</p>

      {/* ══ HYPER-V DR ═════════════════════════════════════════════════════ */}
      <h2 id="hyperv-dr" style={S.h2}>Hyper-V DR</h2>
      <p style={S.p}><strong>Hyper-V Replica:</strong> Built-in VM replication to secondary Hyper-V host or site. Asynchronous, IP-network-based. Extended replication supported (primary → replica → extended replica). Certificate or Kerberos authentication between replication partners. RPO options and capabilities: verify current Microsoft documentation for your Windows Server version.</p>
      <p style={S.p}><strong>Azure Site Recovery (ASR):</strong> Replicates Hyper-V VMs to Azure as DR target. Orchestrated failover, test failover in isolated Azure network. Capabilities and SLAs: verify current Azure documentation.</p>

      {/* ══ PHYSICAL DR ════════════════════════════════════════════════════ */}
      <h2 id="physical-dr" style={S.h2}>Physical Server / Bare-Metal DR</h2>
      <p style={S.p}><strong>Challenges:</strong> No hypervisor abstraction — hardware differences between primary and DR can cause driver/compatibility issues. OS state, application configuration, data all must be recovered. Typically longer RTO than VM-based.</p>
      <p style={S.p}><strong>Approaches:</strong> Bare-metal restore from backup (boot from backup media, restore complete disk image), pre-provisioned physical hardware at DR site with image restore, physical-to-virtual (P2V) for DR (convert physical to VMs — more flexible), agent-based replication to DR target.</p>

      {/* ══ CLOUD DR ═══════════════════════════════════════════════════════ */}
      <h2 id="cloud-dr" style={S.h2}>Cloud DR</h2>
      <p style={S.p}><strong>Cloud as DR Target:</strong> On-premises primary → Cloud DR. Benefits: no pre-invested DR hardware, elastic scaling. Considerations: egress costs, bandwidth for initial seeding, latency, security, cloud credentials management.</p>
      <Callout type="danger" title="Multi-AZ ≠ Geographic DR">
        Multiple AZs in same region provide regional HA — not geographic DR. Regional disasters, region-wide outages, or regional regulatory events can affect all AZs in a region simultaneously. Cross-region DR required for geographic protection.
      </Callout>
      <p style={S.p}><strong>IaC for Cloud DR:</strong> Terraform, CloudFormation, ARM Templates define DR infrastructure as code. On failover: apply IaC to provision DR infrastructure quickly. Requires IaC templates maintained and tested — not set-and-forget.</p>
      <p style={S.p}><strong>Cloud-native DR services:</strong> AWS Elastic Disaster Recovery, Azure Site Recovery, GCP Backup and DR. Capabilities, pricing, SLAs: verify current provider documentation — these evolve frequently.</p>

      {/* ══ HYBRID DR ══════════════════════════════════════════════════════ */}
      <h2 id="hybrid-dr" style={S.h2}>Hybrid DR</h2>
      <p style={S.p}>On-premises primary + cloud DR, or on-prem primary + co-location DR + cloud tertiary. Common patterns: on-prem → cloud warm/hot DR; on-prem → co-lo DR → cloud tertiary backup; cloud primary → cloud secondary region → on-prem cold backup.</p>
      <p style={S.p}><strong>Hybrid DR considerations:</strong> Consistent network connectivity (Direct Connect, ExpressRoute, VPN), identity federation, security policy consistency, management plane consistency, replication tool compatibility across on-prem and cloud.</p>

      {/* ══ NETWORK DR ═════════════════════════════════════════════════════ */}
      <h2 id="network-dr" style={S.h2}>Network DR Architecture</h2>
      <p style={S.p}><strong>IP Address Management:</strong> Same IP at DR (requires L2 extension — VLAN stretching, OTV, EVPN) or different IP (requires DNS updates, application reconfiguration). Both options have tradeoffs — design with network architect.</p>
      <p style={S.p}><strong>WAN Connectivity:</strong> Dedicated DR circuit (MPLS, SD-WAN) for replication and production failover traffic. Replication bandwidth ≠ production failover traffic bandwidth — plan for both. Internet VPN as backup path.</p>
      <Callout type="important" title="DR Site Network = Mirror of Production Network">
        DR site must have equivalent VLANs, subnets, firewall rules, ACLs, routing policies, and NAT rules as production. Maintained — not a one-time configuration. Changes to production network must be reflected at DR.
      </Callout>

      {/* ══ DNS / TTL ══════════════════════════════════════════════════════ */}
      <h2 id="dns-ttl" style={S.h2}>DNS Failover aur TTL</h2>
      <p style={S.p}><strong>TTL (Time to Live):</strong> DNS responses are cached by resolvers for TTL seconds. If TTL = 3600, DNS changes take up to 1 hour to propagate.</p>
      <CodeBlock lang="text">
{`For planned DR failover:
  Lower DNS TTL sufficiently in advance so previously cached
  records using the old TTL have expired before failover.
  (Example: reduce to 60–300 seconds well before planned test.)

For emergency failover:
  High TTL = delayed client-visible transition
  Plan DR RTO to account for DNS propagation delay
  DNS change is NOT instantly visible to all clients:
  actual transition depends on recursive resolver caching,
  OS/application DNS caching, authoritative update timing,
  and traffic-management behavior.

Internal DNS ≠ External DNS — both must be managed`}
      </CodeBlock>
      <Callout type="warning" title="DNS Propagation Delay Must Be in RTO Calculation">
        DNS failover update karne ke baad bhi users switch nahi hote — TTL ke basis pe cached IP ko use karte rehte hain. DNS propagation delay explicitly RTO planning mein include karna chahiye.
      </Callout>

      {/* ══ LOAD BALANCER DR ═══════════════════════════════════════════════ */}
      <h2 id="load-balancer-dr" style={S.h2}>Load Balancer / Global Traffic Manager</h2>
      <p style={S.p}><strong>GSLB / GTM:</strong> Routes users to appropriate site based on health checks, latency, geographic proximity, or manual policy. Examples: F5 GTM, AWS Route 53, Azure Traffic Manager, Cloudflare Load Balancer. On failover: primary site health check fails → GSLB routes to DR.</p>
      <p style={S.p}><strong>Key configuration for DR:</strong> Health check thresholds (how many failed checks before failover?), failover policy (automatic vs manual approval?), failback policy, TTL management, session persistence during failover.</p>
      <Callout type="important" title="GSLB Failover Speed ≠ Instant">
        GSLB failover speed depends on health check frequency, failure threshold, TTL. Plan RTO accordingly — not instant.
      </Callout>

      {/* ══ FIREWALL DR ════════════════════════════════════════════════════ */}
      <h2 id="firewall-dr" style={S.h2}>Firewall DR</h2>
      <p style={S.p}>DR site firewall must have equivalent rules: outbound, inbound, inter-zone, NAT, VPN tunnels. Maintain via: manual synchronization (error-prone), firewall management platform (Panorama, Cisco FMC, Fortinet FMG), or IaC-based deployment. For critical DR services, redundant firewall/network-security architecture should be considered according to availability requirements and risk tolerance — a single firewall may become a recovery-site single point of failure.</p>

      {/* ══ IDENTITY DR ════════════════════════════════════════════════════ */}
      <h2 id="identity-dr" style={S.h2}>Identity / Authentication DR</h2>
      <p style={S.p}><strong>One of the most critical and frequently overlooked DR dependencies.</strong> If users cannot authenticate, no application works — regardless of infrastructure recovery.</p>
      <p style={S.p}><strong>Active Directory:</strong> For AD-dependent workloads, resilient and reachable Active Directory/DNS services must be available during DR. This commonly includes appropriately designed domain controllers at or reachable from the recovery environment, depending on the organization&apos;s AD architecture. RODC (Read-Only DC) has limitations — evaluate per use case. AD Sites and Services configured for DR site. FSMO role accessibility during DR planned.</p>
      <Callout type="danger" title="AD Restore Operations — Complex, Risk of Replication Issues">
        Active Directory restore operations are complex and can cause serious replication problems if performed incorrectly. Procedures must be documented per your specific AD design, version, and organizational policy. No generic copy-paste AD restore commands.
      </Callout>
      <p style={S.p}><strong>Other identity:</strong> LDAP/RADIUS at DR site, SAML/OAuth IdP (cloud-based IdP may simplify DR), Certificate Authority/CRL accessibility at DR, MFA servers/services at DR or cloud-based.</p>

      {/* ══ DATABASE DR ════════════════════════════════════════════════════ */}
      <h2 id="database-dr" style={S.h2}>Database DR</h2>
      <h3 style={S.h3}>SQL Server</h3>
      <p style={S.p}>Always On Availability Groups (AG): synchronous or asynchronous replica at DR site, application-transparent failover. Log Shipping: asynchronous, simpler, higher RPO. SQL Server Mirroring: deprecated in newer versions — do not design new DR on mirroring.</p>
      <h3 style={S.h3}>Oracle</h3>
      <p style={S.p}>Oracle Data Guard: physical standby (block-level) or logical standby (SQL-level). Maximum Protection/Availability (synchronous) or Maximum Performance (asynchronous). Fast-Start Failover (FSFO) for automated failover. Active Data Guard for read access on standby (license dependent).</p>
      <h3 style={S.h3}>MySQL / PostgreSQL</h3>
      <p style={S.p}>MySQL: native async/semi-sync replication, Group Replication, InnoDB Cluster. PostgreSQL: streaming replication (sync or async), logical replication, Patroni/Repmgr for orchestration. Consult version-specific documentation.</p>
      <Callout type="danger" title="Database Failover Commands — DBA Required">
        Database failover, replication break, and promotion commands are destructive and highly context-specific. Must be documented per your environment with DBA involvement. No generic copy-paste production database failover commands.
      </Callout>

      {/* ══ STORAGE DR ═════════════════════════════════════════════════════ */}
      <h2 id="storage-dr" style={S.h2}>Storage DR</h2>
      <p style={S.p}><strong>LUN/volume promotion at DR:</strong> On failover, replication relationship broken/paused, DR volumes promoted to read-write. DR site SAN zoning/iSCSI connectivity must be correct. LUN masking — DR hosts must see correct volumes. ALUA/path states configured correctly at DR.</p>
      <p style={S.p}><strong>NAS at DR:</strong> NAS replication to DR NAS (NetApp SnapMirror, Dell PowerScale SyncIQ, etc.). SMB/NFS share names may need to match or applications reconfigured. DFS-N (Windows) can abstract NAS path for transparent DR.</p>
      <p style={S.p}><strong>Storage snapshot for DR:</strong> Regular snapshots replicated to DR. Achievable RPO is influenced by snapshot schedule plus replication/copy completion and availability of a usable recovery point. Storage-platform dependency — not independent backup.</p>
      <p style={S.p}>Read more about <TopicLink slug="san" variant="inline" /> and <TopicLink slug="nas" variant="inline" /> in dedicated articles.</p>

      {/* ══ BACKUP ROLE IN DR ══════════════════════════════════════════════ */}
      <h2 id="backup-role-in-dr" style={S.h2}>Backup Ka Role in DR</h2>
      <p style={S.p}><strong>Backup is ONE component of DR — not DR itself.</strong> When backup is the DR mechanism (backup-and-restore model, cold site DR): RPO = backup frequency, RTO = hours to days. When backup supplements DR replication: replication provides low RPO/RTO, backup provides longer-term recovery points and alternate recovery path if replication fails.</p>
      <p style={S.p}><strong>Backup at DR site:</strong> Production backup copies sent offsite to DR site or third location. Backup catalog accessible at DR for restore operations. Backup server/proxy/media/repository components as applicable — architecture is vendor/design dependent. Read more: <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══ RANSOMWARE DR ══════════════════════════════════════════════════ */}
      <h2 id="ransomware-dr" style={S.h2}>Ransomware aur DR</h2>
      <Figure caption="Fig 7 — Ransomware/cyber recovery: traditional DR fails when replication propagates encrypted data. Isolated cyber recovery vault with immutable copies required.">
        <DrRansomwareRecovery />
      </Figure>
      <p style={S.p}><strong>Why traditional DR fails against ransomware:</strong> Traditional DR replicates data — including encrypted/corrupted data. Failover to DR site = failing over to also-encrypted data. Ransomware may have infected DR site via network access.</p>
      <ComparisonTable
        title="Traditional DR vs Cyber Recovery"
        headers={["","Traditional DR","Cyber Recovery"]}
        rows={[
          ["Threat",          "Infrastructure/site failure",          "Data corruption/encryption by attacker"],
          ["RPO reference",   "Last replication sync point",          "Last known-clean data point before infection"],
          ["Replication",     "Core mechanism",                       "Not sufficient — may replicate malware"],
          ["Site isolation",  "Not required",                         "Mandatory — isolated recovery environment"],
          ["Data validation", "Application health check",             "Forensic verification of cleanliness"],
        ]}
        caption="Cyber recovery requires a clean recovery environment the attacker cannot reach — distinct from traditional DR failover."
      />

      {/* ══ CLEAN ROOM ═════════════════════════════════════════════════════ */}
      <h2 id="clean-room" style={S.h2}>Clean Room / Isolated Recovery</h2>
      <p style={S.p}><strong>Clean Room = Environment strongly isolated from compromised production systems.</strong> Cyber-recovery/clean-room environments should be strongly isolated from compromised production environments. Isolation may be physical, logical, policy-controlled, or time-based depending on the platform and recovery architecture. Used to restore from clean backup copies, validate cleanliness, and rebuild production environment.</p>
      <CodeBlock lang="text">
{`Cyber Recovery Process:
  1. Identify infection timeline
     (when did ransomware first execute?)
  2. Find last clean recovery point before infection
  3. Restore to isolated clean room environment
  4. Forensic validation — confirm data clean
  5. Rebuild production (clean OS, patched, reconfigured)
  6. Migrate clean data to rebuilt production
  7. Connect users ONLY after full validation

Shutdown/isolation decisions: per organizational IR plan
and IR team guidance — depends on forensic requirements,
ransomware behavior, and organizational policy.`}
      </CodeBlock>

      {/* ══ ARCHITECTURE ═══════════════════════════════════════════════════ */}
      <h2 id="dr-architecture" style={S.h2}>Complete Primary → DR Site Architecture</h2>
      <Figure caption="Fig 5 — End-to-end primary to DR site architecture. Dashed borders = standby state. DR site does not universally require 100% production capacity.">
        <DrArchitecture />
      </Figure>
      <Callout type="important" title="DR Site Capacity ≠ Universally 100% Production">
        DR site capacity depends on: which workloads must be recovered (not necessarily all), recovery priority tiers, cloud elasticity (scale-up on failover), and acceptable degraded performance during DR period.
      </Callout>

      {/* ══ DEPENDENCY MAPPING ═════════════════════════════════════════════ */}
      <h2 id="dependency-mapping" style={S.h2}>Dependency Mapping</h2>
      <p style={S.p}>Every application in DR requires a complete dependency map. Why: application recovered without database = useless. Database recovered without AD authentication = inaccessible. Correct recovery sequence must follow dependency graph. Third-party dependencies outside your control must be identified.</p>
      <CodeBlock lang="text">
{`Example: E-commerce Application DR Dependency Map

External DNS (Route 53 / Traffic Manager)
       ↓
WAF / DDoS Protection (cloud-based)
       ↓
Load Balancer (DR site — activated on failover)
       ↓
Web Servers (DR site)
       ↓ requires:
  ├── Database (SQL Server AG at DR) → requires Storage (DR)
  ├── Authentication (AD at DR + LDAP)
  ├── Session Cache (Redis cluster at DR)
  ├── Payment Gateway (third-party — verify availability)
  └── Email Service (cloud-based — may be unaffected)

Build dependency map for every application in DR scope.`}
      </CodeBlock>

      {/* ══ RECOVERY SEQUENCE ══════════════════════════════════════════════ */}
      <h2 id="recovery-sequence" style={S.h2}>Correct Recovery Sequence</h2>
      <Figure caption="Fig 6 — DR recovery sequence by dependency order. Build sequence from dependency map — not just business priority.">
        <DrRecoverySequence />
      </Figure>
      <Callout type="warning" title="Recovery Sequence Is Application-Specific">
        The sequence above is illustrative. Your actual sequence must be built from your environment&apos;s dependency map. Recovering in wrong order = application failures for unavailable dependencies.
      </Callout>

      {/* ══ DISASTER DECLARATION ═══════════════════════════════════════════ */}
      <h2 id="disaster-declaration" style={S.h2}>Disaster Declaration</h2>
      <p style={S.p}><strong>Formal, explicit process — not an automatic technical event.</strong></p>
      <ul style={S.ul}>
        <li><strong>Authority:</strong> Who can declare? (IT Director, CTO, BCP Manager — predefined in DR plan)</li>
        <li><strong>Threshold:</strong> What constitutes a disaster? Define in advance — complete DC unavailability for more than X minutes, multiple systems down, site physically inaccessible?</li>
        <li><strong>Escalation path:</strong> Primary authority unavailable → secondary authority</li>
        <li><strong>Communication:</strong> Who is notified immediately after declaration? (Executive team, operations, key users, vendors, regulators if required)</li>
        <li><strong>Documentation:</strong> Formal record with timestamp, nature of event, declared by whom</li>
      </ul>
      <p style={S.p}><strong>Premature declaration risk:</strong> Unnecessary DR invocation → disruption, cost, failback required. <strong>Delayed declaration risk:</strong> Extended RTO, may exceed MTD. Thresholds must be calibrated.</p>

      {/* ══ DR RUNBOOK ═════════════════════════════════════════════════════ */}
      <h2 id="dr-runbook" style={S.h2}>DR Runbook</h2>
      <p style={S.p}><strong>DR Runbook = Detailed, tested, step-by-step technical procedures for DR execution.</strong> Characteristics: step-by-step (no ambiguity), role-assigned (each step has responsible person/team), time-stamped (target time for each step), validated (tested in drills), current (updated after every infrastructure change).</p>
      <CodeBlock lang="text">
{`Example runbook step format:
  Step 1: Verify DR site replication status
  Action: Log into storage management portal...
  Expected output: Replication lag < X minutes
  Success criteria: Confirmed
  Responsible: Storage Team
  Target time: T+15 minutes
  Escalation: If not achieved in 30 min, escalate to [contact]`}
      </CodeBlock>
      <Callout type="danger" title="Runbooks Must Be Accessible When Systems Are Down">
        Paper copies, offline documentation, cloud-based knowledge base accessible from DR site — not just on the primary site&apos;s intranet. If primary site is down and runbook is only on primary site&apos;s wiki, you have a problem.
      </Callout>

      {/* ══ DR PLAN VS RUNBOOK ═════════════════════════════════════════════ */}
      <h2 id="dr-plan-vs-runbook" style={S.h2}>DR Plan vs Runbook</h2>
      <ComparisonTable
        title="DR Plan vs DR Runbook"
        headers={["","DR Plan","DR Runbook"]}
        rows={[
          ["What",             "Strategic document — what, why, who",      "Technical document — exactly how"],
          ["Audience",         "Management, IT leadership, BCP team",       "Operations engineers, DBAs, admins"],
          ["Content",          "Scope, objectives, declaration, roles",     "Step-by-step technical procedures"],
          ["Update frequency", "Annually minimum, on major changes",        "Every infrastructure change"],
          ["Validation",       "Reviewed and approved",                     "Tested in drills"],
        ]}
        caption=""
      />

      {/* ══ DR TESTING ═════════════════════════════════════════════════════ */}
      <h2 id="dr-testing" style={S.h2}>DR Testing</h2>
      <Callout type="danger" title="Untested DR Is an Assumption, Not a Capability">
        First real DR test should NOT be during an actual disaster. Untested DR gives false confidence — gaps discovered during crisis instead of during drill.
      </Callout>
      <ComparisonTable
        title="DR Testing Levels"
        headers={["Level","Method","Impact","Confidence"]}
        rows={[
          ["1. Tabletop",        "Verbal scenario walkthrough",              "None",              "Low"],
          ["2. Walkthrough",     "Runbook review, step-by-step check",       "None",              "Low-Medium"],
          ["3. Simulation",      "DR systems activated, isolated",           "None on production","Medium"],
          ["4. Partial failover","Some apps failed over to DR",              "Minimal",           "Medium-High"],
          ["5. Full failover",   "Complete production moved to DR",          "Planned outage",    "Highest"],
          ["6. Live exercise",   "Full test, no maintenance window",         "Production risk",   "Highest"],
        ]}
        caption="Example risk-based schedule: quarterly tabletop, semi-annual simulation, annual major recovery exercise for critical services. Actual frequency depends on organizational risk, contractual obligations, regulation, and application criticality."
      />

      {/* ══ DR DRILL ═══════════════════════════════════════════════════════ */}
      <h2 id="dr-drill" style={S.h2}>DR Drill</h2>
      <p style={S.p}><strong>A DR drill = planned, time-boxed test with specific objectives, documented results, and lessons-learned output.</strong> Components: defined scope, defined success criteria (RTO/RPO targets to verify), observation and documentation (timestamp every step), gap identification, lessons-learned and action items, updated runbook.</p>
      <p style={S.p}><strong>RTA vs RTO:</strong> Recovery Time Actual measured during drill vs Recovery Time Objective target. Gap analysis informs improvement. Undocumented test results are insufficient for audit evidence.</p>

      {/* ══ PLANNED VS EMERGENCY ═══════════════════════════════════════════ */}
      <h2 id="planned-vs-emergency" style={S.h2}>Planned Switchover vs Emergency Failover</h2>
      <ComparisonTable
        title="Planned Switchover vs Emergency Failover"
        headers={["","Planned Switchover","Emergency Failover"]}
        rows={[
          ["When",        "Scheduled maintenance, DR test, migration",  "Primary site failed/inaccessible"],
          ["Process",     "Graceful app shutdown, final sync, verify",  "Under incident pressure, no clean shutdown"],
          ["RPO",         "Near zero (final sync completed)",           "Depends on replication lag at failure"],
          ["Runbook",     "Slower, accepting lower risk",               "Faster, accepting more risk"],
          ["Stress",      "Controlled",                                 "High pressure, incident conditions"],
        ]}
        caption="Different runbooks required for each. Emergency failover runbook must prioritize speed while maintaining safety checks."
      />

      {/* ══ FAILBACK ═══════════════════════════════════════════════════════ */}
      <h2 id="failback" style={S.h2}>Failback</h2>
      <p style={S.p}><strong>Failback ≠ simply reverse failover.</strong> Requires deliberate planning, data resynchronization, and validation.</p>
      <CodeBlock lang="text">
{`Failback process:
  1. Primary site restoration validation
     Root cause addressed? Infrastructure healthy? Safe to receive production?

  2. Data resynchronization (DR → Primary)
     Changes made at DR during disaster period synced to primary
     Delta sync or full resync — verify approach per environment
     DBA sign-off on data currency required

  3. Planned maintenance window
     Applications gracefully shut down at DR
     Final delta sync from DR to primary
     Application activated at primary
     DNS/LB updated back to primary

  4. DR returned to standby mode
     Replication restarted in normal direction (primary → DR)
     DR site back in ready state

  5. Post-failback validation
     Application health at primary
     Data spot checks
     Monitoring active at primary
     DR readiness confirmed`}
      </CodeBlock>
      <Callout type="danger" title="Rushed Failback Risk">
        Incomplete data resync before primary activation = data loss. Primary re-activated while DR-side data not yet synced back = writes at DR during gap period permanently lost.
      </Callout>

      {/* ══ SPLIT-BRAIN ════════════════════════════════════════════════════ */}
      <h2 id="split-brain" style={S.h2}>Split-Brain</h2>
      <p style={S.p}><strong>Split-Brain = Both primary and DR sites simultaneously believe they are authoritative and accept writes.</strong> Causes: network partition (both sites continue operating), incorrect orchestration triggering DR before primary confirmed down, manual error activating DR without confirming primary is offline.</p>
      <p style={S.p}><strong>Consequences:</strong> Both sites accept independent writes. Data diverges. Merging is complex, sometimes impossible without data loss. Application/database corruption possible.</p>
      <p style={S.p}><strong>Prevention:</strong> Quorum/fencing mechanisms, STONITH (forcibly fence primary before DR activation), orchestration tools verifying primary status before DR activation, witness/tiebreaker services. DR activation must require explicit confirmation of primary status.</p>

      {/* ══ RECOVERY VALIDATION ════════════════════════════════════════════ */}
      <h2 id="recovery-validation" style={S.h2}>Recovery Validation</h2>
      <p style={S.p}><strong>Technical recovery ≠ business-ready recovery.</strong> After systems running at DR, validation confirms: applications accepting requests, data at expected state (spot check critical records), authentication works, integration points functional, performance adequate, no error storms in logs, monitoring/alerting active at DR site.</p>
      <p style={S.p}><strong>Validation team:</strong> Operations + application owners + business team representatives. <strong>Validation must be documented</strong> — timestamp, checks performed, results, sign-off. Business sign-off before declaring DR successful.</p>

      {/* ══ DR ORCHESTRATION ═══════════════════════════════════════════════ */}
      <h2 id="dr-orchestration" style={S.h2}>DR Orchestration</h2>
      <p style={S.p}><strong>DR orchestration = Software automating and sequencing the DR failover process.</strong> Benefits: reduces RTO by automating steps, reduces manual errors, provides audit trail, enables consistent test failover.</p>
      <p style={S.p}><strong>Capabilities:</strong> Recovery order (dependency graph), automated/semi-automated execution, test failover in isolated environment, network re-addressing/DNS updates, health check at each step before proceeding, rollback on failure.</p>
      <p style={S.p}><strong>Examples:</strong> VMware Site Recovery Manager, Zerto, Azure Site Recovery, Veeam Orchestrator, custom orchestration scripts + CMDB. Capabilities, licensing, platform support vary by product version — verify current vendor documentation.</p>

      {/* ══ DR MONITORING ══════════════════════════════════════════════════ */}
      <h2 id="dr-monitoring" style={S.h2}>DR Monitoring</h2>
      <ComparisonTable
        title="DR Monitoring — Key Items"
        headers={["Category","What to Monitor","Alert Threshold"]}
        rows={[
          ["Replication lag",      "Current lag vs RPO target per workload",    "Example policy: warning when lag consumes defined portion of RPO budget (e.g. 50%); critical when RPO at risk. Thresholds are organization/workload specific."],
          ["Replication errors",   "Replication job failures / pauses",         "Any error → immediate alert"],
          ["DR WAN link",          "Bandwidth utilization, errors, drops",      "Saturation → alert; Errors → alert"],
          ["DR site infrastructure","Server, storage, network device health",   "Hardware alert → immediate"],
          ["Backup currency at DR","Age of most recent restorable copy at DR",  "> RPO threshold → alert"],
          ["AD replication (DR)",  "DC replication currency at DR site",        "Replication failure → alert"],
          ["Certificate expiry",   "All DR site certs expiry dates",            "< 90 days → warning; < 30 days → critical"],
        ]}
        caption=""
      />

      {/* ══ DR CAPACITY ════════════════════════════════════════════════════ */}
      <h2 id="dr-capacity" style={S.h2}>DR Capacity Planning</h2>
      <p style={S.p}><strong>Compute:</strong> Can DR environment handle production workload? Peak load or average? Is scale-up planned during failover? <strong>Storage:</strong> DR storage = replicated data + growth during DR period + local backup copies. <strong>Network:</strong> Replication bandwidth + production failover traffic — plan for both separately.</p>
      <Callout type="warning" title="WAN Bandwidth Formula — Educational Only">
        Any bandwidth calculation is illustrative. Daily change rate, compression ratios, replication window, burst capacity for catch-up — all must be measured from actual workloads. Vendor sizing tools should be used for production planning. Actual sizing must account for: data change rate variability, catch-up after network interruptions, management/orchestration overhead, and safety margin.
      </Callout>

      {/* ══ DR SECURITY ════════════════════════════════════════════════════ */}
      <h2 id="dr-security" style={S.h2}>DR Security</h2>
      <ul style={S.ul}>
        <li>DR site perimeter security equivalent to primary — attackers know DR is a vulnerability</li>
        <li>DR replication traffic encrypted in transit</li>
        <li>DR backup copies encrypted at rest</li>
        <li>DR site access controlled — not &quot;open&quot; for convenience during crisis prep</li>
        <li>Separate DR admin accounts from production admin</li>
        <li>MFA required for DR site access</li>
        <li>DR network segmentation — replication traffic isolated</li>
        <li>Audit logging at DR site — access, config changes, failover events</li>
        <li>Patch/firmware currency at DR site — not a forgotten environment</li>
        <li><strong>Ransomware-specific:</strong> Where supported, minimize trust and connectivity between production and recovery environments; restrict replication paths to required flows; apply least privilege; prevent unnecessary reverse connectivity. Immutable and isolated backup copies are strongly recommended and are a core requirement in many cyber-resilience designs. Clean room isolated from compromised environments.</li>
      </ul>

      {/* ══ DOCUMENTATION ══════════════════════════════════════════════════ */}
      <h2 id="dr-documentation" style={S.h2}>Documentation aur Change Management</h2>
      <p style={S.p}><strong>DR documentation must be current — outdated DR docs fail at the worst moment.</strong> Maintain: DR architecture diagram, application dependency maps, DR runbooks, DR contact list (24/7), vendor support contacts, network diagrams, configuration baselines, replication config, license/certificate inventory with expiry dates, known issues/workarounds.</p>
      <Callout type="danger" title="Change Management + DR = Mandatory Linkage">
        Every production change must be evaluated for DR impact. Infrastructure change → runbook update? Application deployment → DR config update? New application → DR scope and tier assignment? Change management that ignores DR impact creates silent DR failures.
      </Callout>

      {/* ══ FIRMWARE COMPAT ════════════════════════════════════════════════ */}
      <h2 id="firmware-compat" style={S.h2}>Firmware / Software Compatibility</h2>
      <p style={S.p}>DR site components must be compatible with primary site workloads: hypervisor version, storage firmware, backup software versions, OS versions and patch levels, application server software. Incompatibility scenarios: primary upgraded, DR not updated → VM format incompatibility; storage firmware difference → replication protocol incompatibility. <strong>Maintain DR site in version-compatible state with primary at all times.</strong></p>

      {/* ══ LICENSE / CERT ═════════════════════════════════════════════════ */}
      <h2 id="license-cert" style={S.h2}>License / Certificate Dependencies</h2>
      <p style={S.p}><strong>DR failures from licensing/certificate issues are embarrassingly common.</strong></p>
      <p style={S.p}><strong>Licenses:</strong> Software licenses valid at DR site? Cloud licenses transferable to DR region? Some licenses are node-locked or site-specific — verify. Emergency licensing contacts with vendors documented and tested.</p>
      <p style={S.p}><strong>Certificates:</strong> TLS certs bound to FQDN — if DR uses different URL, different cert needed. Certificates expiring during DR period must be planned for. Internal CA accessible from DR site. Certificate inventory includes DR site — not just production.</p>

      {/* ══ THIRD PARTY DEPS ═══════════════════════════════════════════════ */}
      <h2 id="third-party-deps" style={S.h2}>Third-Party Dependencies</h2>
      <p style={S.p}><strong>Many DR failures are caused by dependencies outside your control.</strong> Identify: payment gateways, SaaS applications, external DNS providers, CDN providers, cloud API dependencies, third-party authentication (OAuth IdP), shipping/financial APIs. For each: does it have its own SLA? Can application function degraded without it? Is there an alternate provider? Does vendor need to be notified of your DR event?</p>

      {/* ══ FAILURE SCENARIOS ══════════════════════════════════════════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Common DR Failure Scenarios</h2>

      <h3 style={S.h3}>Scenario 1 — Replication Lag Discovered at Failover</h3>
      <p style={S.p}><strong>Root Cause:</strong> Replication monitoring not alerting on lag. Network capacity event 6 hours prior paused replication. Not detected — assumed healthy.</p>
      <p style={S.p}><strong>Troubleshooting:</strong> Check replication manager for lag history. Check WAN link utilization last 24 hours. Check replication error logs. Determine last consistent recovery point.</p>
      <p style={S.p}><strong>Prevention:</strong> Replication lag monitored with alerts at RPO/2 threshold. WAN link utilization monitored. Daily replication health review.</p>

      <h3 style={S.h3}>Scenario 2 — DR Runbook Outdated — Wrong Application Sequence</h3>
      <p style={S.p}><strong>Root Cause:</strong> Application server config changed 3 months ago. DR runbook not updated. Connection string in runbook pointed to old hostname — failed at step 4. 45 minutes lost.</p>
      <p style={S.p}><strong>Prevention:</strong> Change management requires DR runbook review for any infrastructure/configuration change. Runbook last-updated date reviewed monthly.</p>

      <h3 style={S.h3}>Scenario 3 — Split-Brain After Network Partition</h3>
      <p style={S.p}><strong>Root Cause:</strong> Network partition resolved. Both sites running. No fencing mechanism. DR team activated DR without confirming primary status. Database conflicts detected — two versions of same records.</p>
      <p style={S.p}><strong>Prevention:</strong> Disaster declaration requires explicit primary inaccessibility confirmation. Fencing mechanism (STONITH/quorum) prevents primary running without quorum. Orchestration checks primary before DR activation.</p>

      <h3 style={S.h3}>Scenario 4 — DNS TTL Not Lowered</h3>
      <p style={S.p}><strong>Root Cause:</strong> DNS TTL was 7200 seconds (2 hours). Not lowered before test. DR site fully operational but users couldn&apos;t reach it for 2 hours due to cached old IP.</p>
      <p style={S.p}><strong>Prevention:</strong> TTL management procedure: lower to 60–300 seconds at least 2× original TTL before planned failover. Emergency failover: accept TTL delay in RTO calculation.</p>

      <h3 style={S.h3}>Scenario 5 — Certificate Expired at DR Site</h3>
      <p style={S.p}><strong>Root Cause:</strong> Wildcard certificate at DR expired 6 weeks prior. Certificate monitoring only covered production. Users received SSL error on DR site.</p>
      <p style={S.p}><strong>Prevention:</strong> Certificate inventory includes DR site. Expiry monitoring covers DR. Auto-renewal where possible. Certificate expiry in quarterly DR readiness check.</p>

      <h3 style={S.h3}>Scenario 6 — AD Replication Not Current at DR Site</h3>
      <p style={S.p}><strong>Root Cause:</strong> AD replication between primary and DR DCs failing silently for 3 weeks. Recently added user accounts absent at DR DC. Authentication failed for new users after DR activation.</p>
      <p style={S.p}><strong>Prevention:</strong> AD replication health monitored (repadmin output automated, alerts on failures). AD replication health in daily O&M check.</p>

      <h3 style={S.h3}>Scenario 7 — Storage Volume Not Read-Write After Promotion</h3>
      <p style={S.p}><strong>Root Cause:</strong> DR storage LUN masking/zoning not updated after storage migration 4 months earlier. DR hosts mapped to old initiator groups. Volume promotion succeeded but hosts couldn&apos;t see volumes.</p>
      <p style={S.p}><strong>Prevention:</strong> Storage changes reviewed for DR side impact. DR storage zoning/masking tested in quarterly readiness check. LUN masking verification step in DR runbook.</p>

      {/* ══ TROUBLESHOOT LAYERS ════════════════════════════════════════════ */}
      <h2 id="troubleshoot-layers" style={S.h2}>Layer-by-Layer DR Troubleshooting</h2>
      <Figure caption="Fig 8 — DR failover troubleshooting: systematic layer-by-layer flow. DR declared ≠ DR complete. Business validation required before closing incident.">
        <DrTroubleshootFlow />
      </Figure>
      <CodeBlock lang="text">
{`Layer 1 — Physical / Facility
  DR site powered? Cooling? Physical access? Cables connected?

Layer 2 — Network / Connectivity
  WAN link operational? DR internal switching? Routing correct?
  Firewall active and rules loaded? Default gateway reachable?

Layer 3 — Storage
  Replication received? Last sync point? Volumes read-write?
  Zoning/iSCSI correct? LUN masking — DR hosts see volumes?

Layer 4 — Compute / Virtualization
  DR hypervisor hosts healthy? VMs registered?
  VM snapshots released? Compute resources sufficient?

Layer 5 — Identity / Authentication
  AD DCs online? Replication currency? DNS resolving?
  Certificate services accessible?

Layer 6 — Database
  DB failover/promotion complete? Integrity check passed?
  Last log applied? DB accepting connections?

Layer 7 — Application
  Started in correct dependency order?
  Connects to DR DB? Config correct for DR endpoints?
  Health endpoints OK?

Layer 8 — Network Access / User Layer
  DNS/GSLB updated to DR IPs? LB configured?
  External DNS propagated? Users can reach app?

Layer 9 — Validation
  Business smoke test passed? Data spot checks? Monitoring active?
  Stakeholders notified? Incident documented?`}
      </CodeBlock>

      {/* ══ PRODUCTION INCIDENTS ═══════════════════════════════════════════ */}
      <h2 id="production-incidents" style={S.h2}>Real Production Incidents</h2>

      <h3 style={S.h3}>Incident 1 — DR Test Passed But Real Failover Failed</h3>
      <p style={S.p}><strong>DR test done in isolated network.</strong> AD DCs not connected to production AD during test. In real failover: DR DCs tried to replicate from production (which was down) → marked objects stale → authentication degraded.</p>
      <p style={S.p}><strong>Root Cause:</strong> Test didn&apos;t simulate real failover network conditions. DR test environment ≠ actual DR scenario.</p>
      <p style={S.p}><strong>Fix:</strong> DR test runbook updated to simulate production AD replication failure. DR-site writable DC/DNS capability was designed so the recovery environment can continue providing required directory and name-resolution services when the primary site is unavailable. AD replication health and required directory-service dependencies added to DR testing scope.</p>
      <p style={S.p}><strong>Lesson:</strong> DR tests must be realistic. Isolated test that doesn&apos;t match production DR scenario = false confidence.</p>

      <h3 style={S.h3}>Incident 2 — Failback Caused Data Loss</h3>
      <p style={S.p}><strong>After 4 days at DR, failback performed.</strong> Next morning: 6 hours of customer order data missing. Failback procedure reversed replication without completing delta sync. 6 hours of DR-side order data not synced to primary before primary re-activated.</p>
      <p style={S.p}><strong>Root Cause:</strong> No documented failback procedure. Team assumed &quot;reverse failover&quot; was sufficient. No data verification step before primary activation.</p>
      <p style={S.p}><strong>Fix:</strong> Failback runbook created with explicit data sync verification. &quot;No failback without DBA sign-off on data currency&quot; rule. Post-failback data spot check mandatory.</p>

      <h3 style={S.h3}>Incident 3 — Ransomware Replicated to DR Site</h3>
      <p style={S.p}><strong>Ransomware encrypted production.</strong> DR volumes also found encrypted — ransomware replicated 4 hours before failover attempt. DR strategy relied entirely on replication. No immutable isolated copies existed.</p>
      <p style={S.p}><strong>Fix:</strong> Immutable backup copies implemented — not accessible from production/DR replication network. Clean room recovery environment provisioned.</p>
      <p style={S.p}><strong>Lesson:</strong> Replication protects against infrastructure failure. Does NOT protect against logical data corruption/destruction. Immutable and isolated backup copies are strongly recommended and are a core requirement in many cyber-resilience designs.</p>

      <h3 style={S.h3}>Incident 4 — License Expired Mid-Recovery</h3>
      <p style={S.p}><strong>DR activated.</strong> Database came up. Application refused to start — license validation failure. License was node-locked to primary server hardware ID. DR server had different hardware ID. Vendor unreachable on weekend. 18 hours lost.</p>
      <p style={S.p}><strong>Fix:</strong> License inventory with DR compatibility assessment. Emergency license contact documented and tested. Floating/site licenses obtained where possible. License verification step in DR readiness checks.</p>

      {/* ══ DANGEROUS MISTAKES ═════════════════════════════════════════════ */}
      <h2 id="dangerous-mistakes" style={S.h2}>Dangerous DR Mistakes</h2>
      <Callout type="danger" title="These Mistakes Have Caused Real DR Failures">
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Assuming replication = DR.</strong> Replication protects against infrastructure failure. Ransomware, corruption, logical deletion — all replicate.</li>
          <li><strong>Untested DR.</strong> First test during real disaster = extended RTO, discovered gaps under maximum stress.</li>
          <li><strong>No tested runbook.</strong> &quot;We&apos;ll figure it out&quot; adds hours under incident pressure.</li>
          <li><strong>Outdated DR documentation.</strong> Infrastructure changes not reflected — steps fail at execution.</li>
          <li><strong>Stale DR environment.</strong> Not patched, certificates expired, licenses not renewed, hypervisor version incompatible.</li>
          <li><strong>Forgetting dependencies.</strong> Application recovered without database, database without AD — correct sequence mandatory.</li>
          <li><strong>DNS TTL not managed.</strong> Users can&apos;t reach DR IP for hours despite failover being complete.</li>
          <li><strong>Manual failover without fencing.</strong> Split-brain data conflict if primary is not confirmed down.</li>
          <li><strong>Failing back without data resync verification.</strong> Production data overwritten with older DR-site data.</li>
          <li><strong>Assuming cloud = DR.</strong> Cloud provides availability, not automatically DR. Cross-region required for geographic protection.</li>
          <li><strong>No DR for DR management systems.</strong> Orchestration tool at primary site — unavailable during primary site failure.</li>
          <li><strong>Skipping business validation.</strong> IT declares DR complete. Business cannot use application. Incident not closed.</li>
          <li><strong>Single person knows DR runbook.</strong> Key person unavailable during disaster. Cross-trained team required.</li>
          <li><strong>Not accounting for third-party dependencies.</strong> Your failover succeeded; payment gateway is also down — customer transactions fail.</li>
        </ul>
      </Callout>

      {/* ══ O&M CHECKLIST ══════════════════════════════════════════════════ */}
      <h2 id="om-checklist" style={S.h2}>DR O&amp;M Checklist</h2>
      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>Replication health: all jobs healthy? Lag within RPO threshold?</li>
        <li>Replication lag: current lag vs RPO target for all critical workloads?</li>
        <li>DR WAN link: bandwidth utilization normal? No errors/drops?</li>
        <li>DR site infrastructure: any hardware alerts at DR site?</li>
        <li>DR backup copies: offsite backup jobs completed? Recent copy accessible?</li>
        <li>Critical alerts: any DR monitoring alerts outstanding?</li>
      </ul>
      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Replication lag trend: increasing trend over the week?</li>
        <li>DR site hardware health review</li>
        <li>AD replication health: DR site DC replication current?</li>
        <li>DNS/network configuration currency: any production changes needing DR update?</li>
        <li>DR runbook version: any production changes last week requiring runbook update?</li>
      </ul>
      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>DR readiness review: all in-scope systems — replication/backup verified restorable?</li>
        <li>Certificate expiry check: any certs expiring within 90 days at DR site?</li>
        <li>License review: any expiring? Any new apps added to DR scope?</li>
        <li>Runbook review: walkthrough — any outdated steps?</li>
        <li>Contact list currency: all DR personnel reachable?</li>
        <li>Capacity review: DR site still sized for current production scale?</li>
      </ul>
      <h3 style={S.h3}>Quarterly / Periodic</h3>
      <ul style={S.ul}>
        <li>DR drill: tabletop at minimum, simulation/partial failover per risk appetite</li>
        <li>Full DR test (per organizational risk/regulatory schedule for critical apps): documented results, RTA vs RTO, RPA vs RPO, lessons learned, action items</li>
        <li>Certificate inventory audit: full review of all DR site certificates</li>
        <li>License inventory audit: full review, compatibility verification</li>
        <li>Dependency map review: any new third-party dependencies added?</li>
        <li>BIA review: has business criticality of any application changed?</li>
        <li>Ransomware recovery readiness: clean room tested, immutable copies verified</li>
        <li>DR metrics review: RTA vs RTO, RPA vs RPO trend analysis</li>
        <li>Regulatory compliance review: DR capability meets current regulatory requirements?</li>
        <li>DR documentation audit: architecture, runbooks, contacts all current?</li>
      </ul>

      {/* ══ PREVENTIVE MAINTENANCE ═════════════════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <ul style={S.ul}>
        <li><strong>Physical:</strong> Server hardware PM per manufacturer schedule, UPS battery health at DR, cooling system at DR, network hardware PM, physical security access log review</li>
        <li><strong>Software:</strong> OS and firmware patches at DR (maintain version compatibility), backup/replication software updates, orchestration tool updates</li>
        <li><strong>Replication:</strong> Scheduled replication consistency verification, bandwidth headroom verification, DR storage capacity headroom</li>
      </ul>
      <Callout type="warning" title="DR Site Is Not a Forgotten System">
        DR site requires same maintenance discipline as primary. Unmaintained DR site = false sense of security. &quot;We haven&apos;t touched DR in 18 months&quot; = high risk of DR failure when needed.
      </Callout>

      {/* ══ OEM ESCALATION ═════════════════════════════════════════════════ */}
      <h2 id="oem-escalation" style={S.h2}>OEM / Vendor Escalation Data</h2>
      <ul style={S.ul}>
        <li><strong>General:</strong> DR platform/product name and version, error message with timestamp, recent changes, timeline of events, steps already attempted</li>
        <li><strong>Replication:</strong> Product and version (source + target), storage models and firmware, replication type (sync/async), replication lag at issue time, replication error logs, network topology</li>
        <li><strong>Hypervisor:</strong> vCenter/ESXi version, SRM version and license, VM list affected, replication type (vSphere vs array)</li>
        <li><strong>Network:</strong> WAN link details and utilization, routing table at DR, firewall rules (relevant sections), DNS zone records</li>
        <li><strong>Impact:</strong> Workloads affected, RTO currently at risk, business impact, troubleshooting already performed</li>
      </ul>

      {/* ══ DR AUDIT ═══════════════════════════════════════════════════════ */}
      <h2 id="dr-audit" style={S.h2}>DR Audit Evidence</h2>
      <p style={S.p}>Regulators and auditors require: current DR Plan (dated, version controlled, approved), current DR Runbooks (tested), BIA document (business owner sign-off), Risk Assessment, most recent DR test report (date, scope, RTA vs RTO, RPA vs RPO, issues, actions), DR monitoring dashboards/reports, replication health evidence, evidence of runbook updates after changes, certificate/license inventory, evidence of DR training/awareness.</p>

      {/* ══ DR METRICS ═════════════════════════════════════════════════════ */}
      <h2 id="dr-metrics" style={S.h2}>DR Metrics / KPIs</h2>
      <ComparisonTable
        title="DR KPIs (Target examples — set per organization)"
        headers={["Metric","Description","Example target"]}
        rows={[
          ["RTO Achievement",       "% of DR tests meeting RTO target",              ">95%"],
          ["RPO Achievement",       "% of DR tests where RPA ≤ RPO",                 ">98%"],
          ["Replication Lag",       "Current lag vs RPO target — always",            "≤ RPO continuously"],
          ["Replication Availability","% of time replication is healthy",             ">99.9%"],
          ["DR Test Frequency",     "Tests performed vs scheduled",                  "100%"],
          ["Runbook Currency",      "Days since last runbook review",                "<90 days"],
          ["Cert Coverage",         "% of DR certs monitored for expiry",            "100%"],
          ["DR Coverage",           "% of Tier 1 apps with tested DR",              "100%"],
        ]}
        caption=""
      />

      {/* ══ MATURITY MODEL ═════════════════════════════════════════════════ */}
      <h2 id="maturity-model" style={S.h2}>DR Maturity Model</h2>
      <Callout type="important" title="Educational Framework — Not an Official Standard">
        The following is a generic educational maturity model — NOT CMMI, ISO, or any formal certification body&apos;s standard.
      </Callout>
      <ComparisonTable
        title="DR Maturity Model (Educational)"
        headers={["Level","Name","Characteristics"]}
        rows={[
          ["1","Ad Hoc",     "No formal DR capability — backup exists, no DR plan, no DR site, no DR test"],
          ["2","Reactive",   "Basic DR exists — plan documented, backup offsite, rarely tested, heavily manual"],
          ["3","Defined",    "DR standardized — plan current, partial DR site, annual tests, runbooks, basic monitoring"],
          ["4","Managed",    "DR measured — regular testing, RTA/RPA tracked, most apps in DR scope, replication in place"],
          ["5","Optimized",  "DR continuously improved — orchestration, frequent tests, change-mgmt integrated, cyber recovery"],
        ]}
        caption=""
      />

      {/* ══ ENTERPRISE EXAMPLE ═════════════════════════════════════════════ */}
      <h2 id="enterprise-example" style={S.h2}>Complete Enterprise DR Design Example</h2>
      <p style={S.p}><strong>Scenario:</strong> Mid-size financial services. Core banking, e-commerce portal, internal ERP.</p>
      <ComparisonTable
        title="DR Design Decisions by Application"
        headers={["Application","DR Tier","DR Model","RPO Mechanism","RTO Mechanism"]}
        rows={[
          ["Core Banking",     "Tier 1","Active-Active",      "Synchronous DB replication","Traffic manager failover (<5 min)"],
          ["E-commerce Portal","Tier 2","Active-Passive Hot", "Async array replication + DB log ship","VMware SRM orchestrated (<3 hrs)"],
          ["Internal ERP",     "Tier 3","Warm Standby",       "Async VM replication (hourly snapshots)","Manual failover with runbook (6–8 hrs)"],
        ]}
        caption="DR site: co-location 40km away (within synchronous replication latency budget). Dedicated MPLS circuit. DR site at 70% primary capacity — scale-up planned for ERP during actual DR."
      />

      {/* ══ DESIGN CHECKLIST ═══════════════════════════════════════════════ */}
      <h2 id="design-checklist" style={S.h2}>DR Design Checklist</h2>
      <ul style={S.ul}>
        <li>BIA completed and documented (business owner sign-off)</li>
        <li>Application criticality tiers defined from BIA</li>
        <li>RPO/RTO targets defined per application</li>
        <li>DR site selected, contracted, and accessible</li>
        <li>DR site capacity sized (compute, storage, network)</li>
        <li>Replication type (sync/async) selected per application tier</li>
        <li>Storage, hypervisor, and database replication configured and tested</li>
        <li>Network at DR site configured (VLANs, routing, firewall rules)</li>
        <li>AD/DNS/Identity at DR site configured and verified</li>
        <li>DNS TTL management procedure documented</li>
        <li>GSLB/load balancer DR configuration in place</li>
        <li>DR runbooks written, reviewed, and tested</li>
        <li>Disaster declaration procedure documented and communicated</li>
        <li>DR contact list complete and current (24/7)</li>
        <li>Failback procedure documented and tested</li>
        <li>License and certificate DR plan complete</li>
        <li>Third-party dependency map complete</li>
        <li>DR monitoring and alerting operational</li>
        <li>DR test schedule established and executed</li>
        <li>Ransomware/cyber recovery procedure documented</li>
        <li>Clean room recovery environment available and tested</li>
        <li>DR documentation stored accessibly from DR site (not only on primary intranet)</li>
      </ul>

      {/* ══ INTERVIEW ══════════════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q: DR aur Backup mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Backup data protect karta hai — recoverable historical copies. DR poori service restoration capability hai — infrastructure, network, apps, dependencies, DNS, authentication, validation sab include. Backup DR ka ek component ho sakta hai lekin backup alone DR nahi hai.</p>

      <h3 style={S.h3}>Q: HA aur DR mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> HA uses redundant resources — commonly within a cluster, site, or availability-zone architecture — to maintain operation against component failures. Trigger is automatic, seconds-to-minutes. DR handles failures severe enough to defeat HA — typically site-level or systemic failures at alternate location, declared, minutes-to-days. HA DR ko defeat karne wali events se protect nahi karta (site disaster, widespread ransomware, regional outage).</p>

      <h3 style={S.h3}>Q: RPO exactly define karo.</h3>
      <p style={S.p}><strong>Answer:</strong> Recovery Point Objective — acceptable data loss measured in time. Maximum age of data at recovery point that organization accepts. Specific backup frequency se automatically defined nahi. Near-zero RPO may be achieved through appropriately designed synchronous or continuous replication. Application-consistent recovery is a separate requirement — may require application-aware replication, transaction/log mechanisms, quiescing, or coordinated recovery depending on the workload.</p>

      <h3 style={S.h3}>Q: RTO mein sirf restore time hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. RTO defines the target elapsed time for restoring the required service after a disruption. The organization must explicitly define the measurement start and end points. Detection, decision/declaration, technical recovery, dependency startup, and validation delays must all be accounted for when determining whether the business recovery objective can be met.</p>

      <h3 style={S.h3}>Q: MTD aur WRT kya hain?</h3>
      <p style={S.p}><strong>Answer:</strong> MTD = Maximum Tolerable Downtime — organization survive kar sakta hai X duration tak before catastrophic impact. MTD ≥ RTO always. WRT = Work Recovery Time — after IT restoration, time to validate, process backlogs, reach business-ready state. RTO + WRT ≤ MTD.</p>

      <h3 style={S.h3}>Q: Synchronous vs Asynchronous replication?</h3>
      <p style={S.p}><strong>Answer:</strong> Synchronous: in a typical design, write is acknowledged after local and remote write-commit requirements are satisfied — near-zero RPO, distance/latency limited, write performance impact. Asynchronous: write acknowledged on primary, replicated in background — non-zero RPO (lag = potential data loss). Remote-site round-trip normally not in ack path but overhead may still occur. Supports much greater geographic separation than synchronous; practical distance constrained by connectivity, bandwidth, product limits, and required RPO.</p>

      <h3 style={S.h3}>Q: Hot vs Warm vs Cold site?</h3>
      <p style={S.p}><strong>Answer:</strong> Hot: fully provisioned always-on, near-zero RTO/RPO, highest cost. Warm: partially provisioned standby, hours RTO, moderate cost. Cold: minimal infrastructure, backup-restore based, days RTO, lowest cost. Right-size per application criticality from BIA.</p>

      <h3 style={S.h3}>Q: Active-Active DR mein zero RPO/RTO automatic hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Active-Active mein near-zero ya zero RTO possible hai but RPO depends on consistency model. Asynchronously replicated active-active = non-zero RPO. Even synchronous active-active: application-consistent state at failure time matter karta hai. Complexity bhi significantly higher.</p>

      <h3 style={S.h3}>Q: Failback simple reverse of failover hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Failback requires: primary restoration validation (root cause resolved), data resynchronization (DR → Primary for DR-period changes), planned maintenance window, final delta sync, application activation at primary, DNS updates back, DR to standby, replication restart normal direction. Data validation mandatory before primary activation.</p>

      <h3 style={S.h3}>Q: Split-brain kya hai? Prevent kaise karein?</h3>
      <p style={S.p}><strong>Answer:</strong> Split-brain = both primary and DR simultaneously accepting writes — leads to data conflicts/corruption. Prevention: quorum/fencing mechanisms, STONITH, orchestration verifies primary status before DR activation, disaster declaration requires primary inaccessibility confirmation.</p>

      <h3 style={S.h3}>Q: DNS TTL DR mein kyun important hai?</h3>
      <p style={S.p}><strong>Answer:</strong> DNS responses cached by resolvers. High TTL = slow client-visible transition. For planned failover: lower TTL sufficiently in advance so previously cached records expire before cutover. For emergency: DNS transition delay must be in RTO planning. Actual client-visible transition depends on recursive resolver caching, OS/application caching, authoritative update timing, and traffic-management behavior — not simply one TTL value.</p>

      <h3 style={S.h3}>Q: Ransomware attack mein traditional DR kyun fail kar sakta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Traditional DR replication faithfully replicates encrypted/corrupted data to DR site. Failover to DR = failing over to also-encrypted data. Cyber recovery requires: isolated immutable copies (not on replication path), clean recovery point before infection, isolated clean room environment, forensic validation before reconnecting to production.</p>

      <h3 style={S.h3}>Q: DR test types kya hain? Frequency?</h3>
      <p style={S.p}><strong>Answer:</strong> Tabletop, walkthrough, simulation, partial failover, full failover test. Increasing confidence and disruption. Example risk-based schedule: quarterly tabletop, semi-annual simulation, annual major exercise for critical apps — actual frequency depends on organizational risk, regulation, and application criticality. Undocumented results insufficient for audit. First test should not be during real disaster.</p>

      <h3 style={S.h3}>Q: Recovery sequence kyun dependency order follow karta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Applications have dependencies — app needs DB, DB needs storage, everything needs AD/DNS. Recover in wrong order = application fails for unavailable dependency. Dependency map determines correct sequence regardless of application business priority tier.</p>

      <h3 style={S.h3}>Q: DR test mein RTA &gt; RTO — kya karo?</h3>
      <p style={S.p}><strong>Answer:</strong> Document the gap. Root cause analysis — which steps took longer? Technology, process, or people? Action items. Update runbook with corrected steps. Re-test specific components. Report RTA/RTO gap in DR metrics. Do NOT ignore.</p>

      <h3 style={S.h3}>Q: Cloud mein DR automatic hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nahi. Cloud provides availability — not automatically DR. Multi-AZ = regional HA, not geographic DR. Cross-region required for geographic protection. Cloud DR requires: cross-region architecture, tested runbooks, DNS management, application-aware recovery. Cloud ≠ DR by itself.</p>

      <h3 style={S.h3}>Q: OEM escalation se pehle kya collect karein?</h3>
      <p style={S.p}><strong>Answer:</strong> DR platform product/version, error messages with timestamps, recent changes, replication product/version (source + target), storage models/firmware, replication lag at failure time, replication error logs, network topology, hypervisor/app version, steps already attempted, business impact (RTO currently at risk).</p>

      {/* ══ KEY TAKEAWAYS ══════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>DR = Service restoration capability.</strong> Infrastructure, network, apps, dependencies, DNS, authentication, validation — not just data.</li>
        <li><strong>Backup ≠ DR. HA ≠ DR.</strong> Three different protection mechanisms, different scopes, different threats.</li>
        <li><strong>RPO = acceptable data loss in time.</strong> Not simply backup frequency. Near-zero RPO may be achieved through appropriately designed synchronous or continuous replication. Application-consistent recovery is a separate requirement.</li>
        <li><strong>RTO = time allowed to restore required service.</strong> Detection, decision/declaration, technical recovery, dependency startup, and validation must all be accounted for. Organization must define measurement start and end points explicitly.</li>
        <li><strong>MTD ≥ RTO always. RTO + WRT ≤ MTD.</strong></li>
        <li><strong>Synchronous replication = near-zero RPO.</strong> Not guaranteed zero. Distance/latency limited.</li>
        <li><strong>Asynchronous = non-zero RPO.</strong> Replication lag = potential data loss. Supports much greater geographic separation than synchronous; constrained by connectivity, bandwidth, product limits, and RPO.</li>
        <li><strong>Multi-AZ ≠ geographic DR.</strong> Cross-region required for geographic protection.</li>
        <li><strong>Active-Active ≠ automatically zero RPO/RTO.</strong> Depends on consistency model.</li>
        <li><strong>DNS TTL management critical.</strong> Propagation NOT instant. Must be in RTO calculation.</li>
        <li><strong>Failback ≠ reverse failover.</strong> Requires explicit resync, validation, controlled cutover.</li>
        <li><strong>Split-brain prevention mandatory.</strong> Fencing, quorum, orchestration.</li>
        <li><strong>Untested DR = assumption.</strong> First real test must not be during actual disaster.</li>
        <li><strong>Recovery sequence = dependency order.</strong> Not business priority alone.</li>
        <li><strong>Traditional DR replication ≠ ransomware protection.</strong> Immutable isolated copies + clean room required.</li>
        <li><strong>DR documentation must be current and accessible from DR site.</strong> Not only on primary intranet.</li>
        <li><strong>DR site requires same maintenance as primary.</strong> Patches, certs, licenses, compatibility.</li>
        <li><strong>BIA drives DR design.</strong> Without BIA, DR design lacks business context.</li>
        <li><strong>Disaster declaration = formal decision.</strong> Authority, thresholds, escalation predefined.</li>
        <li><strong>DR declared ≠ DR complete.</strong> Business validation required before closing incident.</li>
        <li><strong>Third-party dependencies must be mapped.</strong> Your failover succeeds; payment gateway is down = customer transactions fail.</li>
        <li><strong>Single person knowing DR = critical risk.</strong> Cross-trained team + documented runbooks required.</li>
      </ul>

      {/* ══ FAQ ════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ RELATED TOPICS ═════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="backup" variant="inline" /> — Backup fundamentals. DR ka foundational component — data protection, retention, restore testing.</li>
        <li><TopicLink slug="san" variant="inline" /> — SAN storage architecture. Array-based replication jo DR ka core mechanism hai enterprise mein.</li>
        <li><TopicLink slug="nas" variant="inline" /> — NAS storage. File-level replication and NAS DR considerations.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware fundamentals. Physical servers jo DR infra host karte hain.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware fundamentals. VM-level replication aur VMware SRM DR orchestration ka foundation.</li>
      </ul>
    </>
  );
}
