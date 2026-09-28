"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function AlarmsTrends() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13 — ALARM MANAGEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="alarm-management" style={S.h2}>Alarm Management</h2>

      <h3 style={S.h3}>How Alarms Are Generated</h3>
      <p style={S.p}>
        In the BMS an alarm is generated when a point's value crosses the configured alarm limit, or when a digital point changes into the alarmed state, or when a communication fault happens. For analog alarms: High-High, High, Low, Low-Low — multiple levels possible. For digital alarms: an alarm on a specific state — such as "Bypass_Status = Active" triggers an alarm. Communication alarms are automatically generated when a device does not respond within the configured timeout.
      </p>

      <h3 style={S.h3}>Alarm Priority and Classification</h3>
      <p style={S.p}>
        Alarm priority defines how urgently to respond. Typical categories: Critical (immediate response required, potential equipment loss or data center downtime), Major (response within minutes, service impact possible), Minor (response within hours, no immediate impact), Advisory (informational, no action urgently needed). Priority assignment is project-specific — no universal standard mandates specific priorities for specific events. Design based on operational impact and response capability.
      </p>

      <h3 style={S.h3}>Acknowledgement and Escalation</h3>
      <p style={S.p}>
        Acknowledging an alarm is the operator's confirmation that the alarm was received and action is being taken. An acknowledged alarm typically appears in a different state — visual distinction is important. Unacknowledged alarms can trigger escalation — if not acknowledged in N minutes, notify a senior person. Configure escalation paths based on alarm category and time-of-day.
      </p>

      <h3 style={S.h3}>Delay, Debounce and Suppression</h3>
      <p style={S.p}>
        Alarm delay — a confirmation period after the value crosses the limit before the alarm is generated. If the value crosses the limit for 2 seconds and then goes back to normal, with the delay configured at 5 seconds the alarm will not be generated — transient spikes are filtered out. Debounce is a similar concept for digital inputs — contact bounce can create multiple rapid transitions and an alarm storm. Alarm suppression or inhibition — intentionally suppress some alarms under specific conditions, e.g., a planned maintenance window.
      </p>

      <Callout type="warning" title="Alarm Fatigue — A Real Operations Risk">
        In a data center control room, if alarms are too many and too frequent, operators start ignoring them — or start acknowledging them habitually without reading. This is dangerous. Do alarm rationalization: review stale, nuisance and low-value alarms. Assign priority correctly. Tune delay and deadband. Goal: every alarm must be actionable and meaningful.
      </Callout>

      <h3 style={S.h3}>Event Logs vs Alarm Logs</h3>
      <p style={S.p}>
        The event log records all BMS activity — point value changes, user logins, operator commands, configuration changes. The alarm log specifically tracks alarms — generated time, acknowledged time, cleared time, operator notes. Both logs must be tamper-evident, timestamped and searchable. At audit time, providing evidence of a specific event may be required — well-maintained logs make this possible.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14 — TRENDS AND REPORTS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="trends-reports" style={S.h2}>Trends, Reports and Root Cause Analysis</h2>

      <h3 style={S.h3}>Trend Logging Configuration</h3>
      <p style={S.p}>
        The trend log is configured per point — log interval, buffer size, compression settings. A fast interval (every 1 minute) for fast-changing parameters — cooling efficiency, load spikes. A slow interval (every 15–60 minutes) for stable parameters — ambient temperature, daily energy consumption. COV-based logging gives better efficiency bandwidth-wise but requires BACnet or a protocol that supports it.
      </p>

      <h3 style={S.h3}>Historical Data and the Historian</h3>
      <p style={S.p}>
        The historian database holds long-term data. Query "what was the average load of UPS Room A in the last 30 days" — capacity planning. Or "since when had the cooling unit return temperature been rising before the alarm" — root cause analysis. Historian performance matters in large deployments — thousands of points, minute-level logging — storage and query optimization is the job of professional historian software.
      </p>

      <h3 style={S.h3}>Using Trends for Root Cause Analysis</h3>
      <p style={S.p}>
        A real example: a server room temperature high alarm came at 3 AM. While investigating the alarm, the BMS trends were checked — a CRAC unit's return air temperature had been showing a gradual increase since 2 hours earlier. The compressor current trend was flat — the compressor was not running during this same period. The filter differential pressure trend was high — the filter was blocked. Root cause: a choked filter reduced the CRAC capacity, the temperature rose slowly. Without trend data this would have been just a "temperature high alarm" — the root cause invisible.
      </p>

      <h3 style={S.h3}>Standard BMS Reports for Data Centers</h3>
      <p style={S.p}>
        Commonly configured reports: Daily temperature summary (min/max/avg per zone), daily energy consumption (kWh per circuit or floor), monthly PUE trend, UPS load profile (peak and average), alarm summary (count, type, response time), maintenance due alerts. Reports as scheduled export (PDF, Excel) or on-demand. Confirm client delivery requirements — format, frequency, distribution list.
      </p>

      <h3 style={S.h3}>Data Retention — Concepts and Policy</h3>
      <p style={S.p}>
        The retention period — how long to keep historical data — depends on project requirements, client contracts, regulatory requirements, insurance and operational needs. There is no universal mandatory retention period. Define: which points retain long-term (energy data, alarm history — typically years), which short-term (high-frequency sensor data — possibly weeks). Balance storage cost vs retention value.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15 — USER ROLES
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="user-roles" style={S.h2}>BMS User Roles and Access Control</h2>

      <h3 style={S.h3}>Operator, Supervisor, Engineer and Admin Roles</h3>
      <p style={S.p}>
        Typical BMS role hierarchy: <strong>Operator</strong> — view live data, acknowledge alarms, read trends. Cannot change configuration or issue commands. <strong>Supervisor</strong> — all operator permissions plus acknowledge + clear alarms, run manual commands where authorized. <strong>Engineer</strong> — configure points, alarms, graphics, trends. Cannot change user management. <strong>Admin</strong> — full access including user management, system configuration, database administration. Actual roles are platform-specific — this is a representative structure.
      </p>

      <h3 style={S.h3}>Role-Based Access and Security Considerations</h3>
      <p style={S.p}>
        Apply the principle of least privilege — an operator does not need engineer access. Enforce a password policy. Multi-factor authentication for high-privilege accounts. Avoid shared credentials — individual accounts so the audit trail is meaningful. Change the default credentials of the BMS system administrator account immediately after installation — default credentials are well-known.
      </p>

      <h3 style={S.h3}>Audit Trail and Change Logging</h3>
      <p style={S.p}>
        Every user action must be logged — who logged in when, what command was issued, what configuration changed, which alarm was acknowledged by whom. The audit trail must be tamper-evident. For SOC 2, ISO 27001 audits — BMS user access logs are an evidence artifact. Do regular access reviews — revoke the access of terminated employees immediately.
      </p>
    </>
  );
}
