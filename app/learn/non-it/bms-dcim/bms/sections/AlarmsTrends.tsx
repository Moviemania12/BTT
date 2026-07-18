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
        BMS mein alarm tab generate hota hai jab ek point ki value configured alarm limit cross kare,
        ya jab ek digital point change kare alarmed state mein, ya jab communication fault hो.
        Analog alarms ke liye: High-High, High, Low, Low-Low — multiple levels possible. Digital
        alarms ke liye: specific state pe alarm — jaise "Bypass_Status = Active" ek alarm trigger
        karta hai. Communication alarms automatically generated hote hain jab device respond nahi karta
        configured timeout mein.
      </p>

      <h3 style={S.h3}>Alarm Priority and Classification</h3>
      <p style={S.p}>
        Alarm priority define karta hai kitni urgency se respond karna hai. Typical categories: Critical
        (immediate response required, potential equipment loss ya data center downtime), Major (response
        within minutes, service impact possible), Minor (response within hours, no immediate impact),
        Advisory (informational, no action urgently needed). Priority assignment project-specific hai —
        no universal standard mandates specific priorities for specific events. Design karo based on
        operational impact aur response capability.
      </p>

      <h3 style={S.h3}>Acknowledgement and Escalation</h3>
      <p style={S.p}>
        Alarm acknowledge karna operator ke liye confirmation hai ki alarm received hua aur action
        liya ja raha hai. Acknowledged alarm typically different state mein dikhta hai — visual
        distinction important hai. Unacknowledged alarms escalation trigger kar sakte hain — agar N
        minutes mein acknowledge nahi hua to senior person ko notify karo. Escalation paths configure
        karo based on alarm category aur time-of-day.
      </p>

      <h3 style={S.h3}>Delay, Debounce and Suppression</h3>
      <p style={S.p}>
        Alarm delay — value limit cross karne ke baad alarm generate hone se pehle confirmation
        period. Agar value 2 seconds ke liye limit cross karti hai aur phir normal hoti hai, delay
        5 seconds pe configured ho to alarm generate nahi hoga — transient spikes filter out hote
        hain. Debounce similar concept hai digital inputs ke liye — contact bounce se multiple rapid
        transitions alarm storm create kar sakte hain. Alarm suppression ya inhibition — kuch alarms
        specific conditions mein intentionally suppress karo, e.g., planned maintenance window.
      </p>

      <Callout type="warning" title="Alarm Fatigue — A Real Operations Risk">
        Data center control room mein agar alarms bahut zyada aur frequent hain, operators unhe ignore
        karne lagte hain — ya habitually acknowledge karne lagte hain bina reading ke. Ye dangerous
        hai. Alarm rationalization karo: stale, nuisance aur low-value alarms review karo. Priority
        correctly assign karo. Delay aur deadband tune karo. Goal: har alarm actionable aur meaningful
        hona chahiye.
      </Callout>

      <h3 style={S.h3}>Event Logs vs Alarm Logs</h3>
      <p style={S.p}>
        Event log sab BMS activity record karta hai — point value changes, user logins, operator
        commands, configuration changes. Alarm log specifically alarms track karta hai — generated
        time, acknowledged time, cleared time, operator notes. Dono logs tamper-evident, timestamped
        aur searchable hone chahiye. Audit ke time ek specific event ka evidence provide karna require
        ho sakta hai — well-maintained logs ye possible banate hain.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14 — TRENDS AND REPORTS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="trends-reports" style={S.h2}>Trends, Reports and Root Cause Analysis</h2>

      <h3 style={S.h3}>Trend Logging Configuration</h3>
      <p style={S.p}>
        Trend log per point configure hota hai — log interval, buffer size, compression settings. Fast
        interval (every 1 minute) fast-changing parameters ke liye — cooling efficiency, load spikes.
        Slow interval (every 15–60 minutes) stable parameters ke liye — ambient temperature, daily
        energy consumption. COV-based logging efficiency better hoti hai bandwidth wise lekin requires
        BACnet ya protocol that supports it.
      </p>

      <h3 style={S.h3}>Historical Data and the Historian</h3>
      <p style={S.p}>
        Historian database long-term data hold karta hai. Query karo ki "last 30 days mein UPS Room A
        ka average load kya tha" — capacity planning. Ya "kab se cooling unit return temperature badh
        rahi thi before the alarm" — root cause analysis. Historian performance matter karta hai large
        deployments mein — thousands of points, minute-level logging — storage aur query optimization
        professional historian software ka job hai.
      </p>

      <h3 style={S.h3}>Using Trends for Root Cause Analysis</h3>
      <p style={S.p}>
        Ek real example: server room temperature high alarm aa gayi at 3 AM. Alarm investigate karte
        hue BMS trends dekhe — ek CRAC unit ka return air temperature 2 hours pehle se gradual increase
        show kar raha tha. Compressor current trend flat tha — compressor running nahi tha isi period
        mein. Filter differential pressure trend high tha — filter blocked. Root cause: choked filter
        ne CRAC capacity reduce kar di, temperature dhire dhire badh gaya. Trend data ke bina ye sirf
        ek "temperature high alarm" hota — root cause invisible.
      </p>

      <h3 style={S.h3}>Standard BMS Reports for Data Centers</h3>
      <p style={S.p}>
        Commonly configured reports: Daily temperature summary (min/max/avg per zone), daily energy
        consumption (kWh per circuit or floor), monthly PUE trend, UPS load profile (peak and average),
        alarm summary (count, type, response time), maintenance due alerts. Reports scheduled export
        (PDF, Excel) ya on-demand. Client delivery requirements confirm karo — format, frequency,
        distribution list.
      </p>

      <h3 style={S.h3}>Data Retention — Concepts and Policy</h3>
      <p style={S.p}>
        Retention period — kitne time tak historical data rakhna hai — project requirements, client
        contracts, regulatory requirements, insurance aur operational needs pe depend karta hai. Koi
        universal mandatory retention period nahi hai. Define karo: which points retain long-term
        (energy data, alarm history — typically years), which short-term (high-frequency sensor data
        — possibly weeks). Storage cost vs retention value balance karo.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15 — USER ROLES
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="user-roles" style={S.h2}>BMS User Roles and Access Control</h2>

      <h3 style={S.h3}>Operator, Supervisor, Engineer and Admin Roles</h3>
      <p style={S.p}>
        Typical BMS role hierarchy: <strong>Operator</strong> — view live data, acknowledge alarms,
        read trends. Cannot change configuration or issue commands. <strong>Supervisor</strong> — all
        operator permissions plus acknowledge + clear alarms, run manual commands where authorized.
        <strong>Engineer</strong> — configure points, alarms, graphics, trends. Cannot change user
        management. <strong>Admin</strong> — full access including user management, system
        configuration, database administration. Actual roles platform-specific hain — this is a
        representative structure.
      </p>

      <h3 style={S.h3}>Role-Based Access and Security Considerations</h3>
      <p style={S.p}>
        Principle of least privilege apply karo — operator ko engineer access nahi chahiye. Password
        policy enforce karo. Multi-factor authentication high-privilege accounts ke liye. Shared
        credentials avoid karo — individual accounts so audit trail is meaningful. BMS system
        administrator account ke default credentials immediately change karo after installation —
        default credentials well-known hote hain.
      </p>

      <h3 style={S.h3}>Audit Trail and Change Logging</h3>
      <p style={S.p}>
        Har user action logged hona chahiye — who logged in when, what command issued, what
        configuration changed, which alarm acknowledged by whom. Audit trail tamper-evident hona
        chahiye. For SOC 2, ISO 27001 audits — BMS user access logs ek evidence artifact hai. Regular
        access review karo — terminated employees ka access immediately revoke karo.
      </p>
    </>
  );
}
