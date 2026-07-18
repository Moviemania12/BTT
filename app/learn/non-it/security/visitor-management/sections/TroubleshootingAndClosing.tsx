"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <h3 style={S.h3}>Fault 1: Visitor Management System Software/Server Not Accessible</h3>
      <p style={S.p}>
        <strong>First check:</strong> System server ping karo — reachable hai? Server powered on, services running?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Web server service status (IIS, Apache, nginx depending on platform),
        database connectivity, disk space.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Database service running hai? Application log mein errors?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Services restart karo. Disk space free karo agar full. Database
        health check karo. agar server hardware fault — failover ya temporary manual process pe shift karo.
        Manual register maintain karo jab tak system restore na ho.
      </p>

      <h3 style={S.h3}>Fault 2: Pre-Registration Email / Host Notification Not Received</h3>
      <p style={S.p}>
        <strong>First check:</strong> System email configuration — SMTP settings correct hain? Test email
        karo from system settings.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Host email address correct hai system mein? Spam/junk folder check karo.
        Email server connectivity — system server SMTP server reach kar raha hai?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> SMTP credentials aur server address verify karo. Firewall —
        SMTP port (25/465/587) outbound allowed hai? DNS resolution system server se work kar raha hai? Email template correctly configured? Email logs check karo — delivery errors.
      </p>

      <h3 style={S.h3}>Fault 3: Badge Printer Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> Physical: printer powered on, ribbon installed, card stock loaded, no
        paper jam?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> PC/server pe printer driver — printer online? Test print from driver
        settings.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Driver reinstall karo. USB/network connection check karo.
        Ribbon/card stock replace karo. Agar hardware fault — temporary: print on paper aur laminate, ya
        backup printer use karo. Critical entry kiosks pe spare printer ready rakhna good practice hai.
      </p>

      <h3 style={S.h3}>Fault 4: Visitor Credential Not Working at Door</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access control system mein visitor credential active hai? Visitor management system-to-access control integration sync hua?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Credential valid time window mein hai? Correct door assigned hai? Reader
        pe card type compatible hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Access control log mein visitor card attempt dekho — "card not found" ya
        "access denied — schedule" ya "access denied — door not assigned"?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> System se re-provision karo — manually force sync. Access control
        mein credential directly verify karo — doors aur schedule correct hain? Agar integration consistently
        failing — integration service restart karo, integration configuration verify karo. As immediate
        workaround — security staff manually verify aur allow karo.
      </p>

      <h3 style={S.h3}>Fault 5: Visitor Credential Not Expiring / Still Active After Check-Out</h3>
      <p style={S.p}>
        <strong>First check:</strong> System mein visitor checked out hua? Check-out event logged hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Access control system mein credential status — still active?
        Revocation message system se access control pe gaya?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Access control system mein manually credential disable karo
        immediately — security priority. Integration log check karo — revocation API call failed? Network
        issue at time of check-out? Integration service health check karo. Time-based expiry configured
        hai as fallback? Configure karo agar nahi hai.
      </p>

      <h3 style={S.h3}>Fault 6: Visitor Attempting Access Outside Approved Area/Time</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access control log — denied attempt kahan tha aur kab?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> CCTV footage — visitor kahan gaya? Escort ke saath tha?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Security protocol follow karo — visitor ka location verify
        karo (CCTV), escort contact karo, visitor ko authorized area mein escort karo. Incident log karo.
        Root cause — visitor wandered inadvertently or intentional? Host/escort inform karo. Visitor
        policy briefing inadequate tha? Process improve karo.
      </p>

      <h3 style={S.h3}>Fault 7: Visitor Management System — Access Control Integration Sync Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> Integration service status — running hai? Visitor management system aur access control
        server dono reachable hain ek doosre se?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Integration logs — error messages? API timeout? Authentication failure?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Integration service restart karo. API credentials verify karo
        — access control API key/password changed hua? Network connectivity between servers. Queue mein
        pending provisioning/revocation commands manually process karo. Escalate to visitor management system/access control
        vendor if persistent.
      </p>

      <ComparisonTable
        title="Visitor Management Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Visitor mgmt system server not accessible", "Server ping, services status", "DB connectivity, disk space", "Service crash or resource exhaustion", "Restart services, fix resources, manual fallback"],
          ["Host notification not received", "SMTP config, test email", "Spam folder, SMTP port", "Email misconfiguration or firewall", "Fix SMTP settings, check firewall"],
          ["Badge printer not working", "Power, ribbon, card stock", "Driver status, test print", "Hardware or driver issue", "Fix driver/connection, spare printer"],
          ["Visitor badge not working at door", "Credential active in AC?", "Door assignment, time window", "Integration sync failure", "Re-provision, manual allow as workaround"],
          ["Credential not expiring after checkout", "Check-out recorded in system?", "Revocation message to AC?", "Integration revocation failure", "Manually disable in AC immediately, fix integration"],
          ["Visitor outside approved area", "Access control denied log", "CCTV footage", "Unauthorized movement", "Security protocol, escort, incident log"],
          ["VMS-AC integration sync failure", "Integration service status", "API logs, network connectivity", "Service crash or API auth failure", "Restart service, fix credentials, process queue"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Real-time visibility — who is in the facility at any moment</li>
        <li>Automated temporary credential provisioning and expiry — reduces manual error</li>
        <li>Complete audit trail — compliance and forensic evidence</li>
        <li>Integration with access control and CCTV — unified security picture</li>
        <li>Host notification and approval workflow — accountability on both sides</li>
        <li>Scalable — from small facilities to large enterprise data centers</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>Integration complexity — VMS-to-access control sync must be reliable; failure creates security gaps</li>
        <li>Process discipline required — system only works if staff consistently follow the process</li>
        <li>Data privacy obligations — visitor data is personal data requiring careful management</li>
        <li>Credential revocation latency — time between check-out and actual revocation in AC system must be minimal</li>
        <li>Paper-based fallback for system outages requires planning</li>
        <li>Cost and maintenance overhead</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: Ye ek illustrative scenario hai — kisi documented real facility ka reference nahi">
        Neeche scenario VMS integration ke practical importance demonstrate karta hai.
      </Callout>

      <p style={S.p}>
        Ek data center mein quarterly compliance audit ke time auditor ne request kiya: "Show me all
        visitors who accessed Server Hall B in the last 90 days, with their identity verification
        records and corresponding CCTV footage." VMS ne 47 visitor records instantly export kiye —
        name, company, ID type, host, access time, access control entry/exit events, aur linked CCTV
        snapshots. Audit 30 minutes mein complete hua.
      </p>
      <p style={S.p}>
        Us process mein ek anomaly bhi mil gayi — ek vendor ka credential show kar raha tha ki unhone
        Server Hall B access kiya lekin unka approved area sirf electrical room tha. Investigation se
        pata chala ki credential provisioning mein galat zone assign hua tha — process gap fix kiya
        gaya. Lesson: VMS audit trail sirf compliance ke liye nahi — operational anomalies bhi detect
        karta hai.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: Paper sign-in register se VMS kyun better hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Paper register sirf name/time record karta hai — koi identity verification,
        koi access control integration, koi real-time visibility, koi searchable audit trail nahi. VMS
        identity verify karta hai, temporary credential provision karta hai, access control se integrate
        karta hai, automatic expiry ensure karta hai, aur complete searchable audit trail maintain karta hai.
        Digital visitor management systems manual/paper-based processes se measurably better accountability, auditability aur integration capability provide karte hain.
      </p>

      <h3 style={S.h3}>Q2: Visitor credential expiry kaise ensure karte hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Time-based expiry: credential visit duration ke liye valid, automatically
        expire hoti hai. Check-out pe immediate revocation: visitor check-out kare to VMS → access control
        system mein credential disable. End-of-day expiry as fallback: agar check-out miss ho gaya.
        Integration reliability zaroori hai — revocation message access control tak pahunche. Manual
        override bhi available ho security team ke liye.
      </p>

      <h3 style={S.h3}>Q3: VMS-access control integration failure pe kya immediate action lena chahiye?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Pending revocations identify karo — visitors jo check out ho chuke hain
        lekin credential abhi bhi active hai. Manually access control mein disable karo — security priority.
        Active visitors ko security staff monitor karo physically. Manual paper log start karo. Integration
        service fix karo — restart, API credentials verify karo, network check karo. System restore hone
        ke baad pending sync manually process karo.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>VMS visitor lifecycle manage karta hai — pre-registration se check-out aur audit record tak.</li>
        <li>Temporary credentials limited zones aur time windows ke liye provision honi chahiye — principle of least privilege.</li>
        <li>VMS-to-access control integration reliability critical hai — revocation failure = active credential after departure.</li>
        <li>Audit trail compliance aur forensic investigation dono ke liye essential hai — searchable, time-stamped records.</li>
        <li>Visitor data sensitive personal data hai — privacy regulations aur data retention policies apply hoti hain.</li>
        <li>Process discipline zaroori hai — technology sirf structured process ko automate karta hai.</li>
        <li>Integration failure pe manual fallback process ready rakho aur quickly identify karo pending revocations.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Learning Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="access-control" variant="inline" /> — VMS temporary credentials access control system mein provision hote hain.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — Visitor entry documentation aur unauthorized movement detection.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — Visitor mantrap se guzarta hai — controlled individual entry.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — High-security facilities mein visitor identity verification.</li>
      </ul>
    </>
  );
}
