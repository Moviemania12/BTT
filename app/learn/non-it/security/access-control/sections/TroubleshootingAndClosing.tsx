"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <h3 style={S.h3}>Fault 1: Card Presented — No Response / Door Does Not Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> Reader LED/beep response dekho — card read hua? LED change hoti
        hai ya silent? Agar no response at all, reader power check karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Reader power — Wiegand readers typically controller se powered
        hote hain (12V DC). Controller PE LED status check karo. Agar reader powered hai lekin no read —
        card type compatible hai reader ke saath? 125 kHz card 13.56 MHz reader pe work nahi karega.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Test card (known good) use karo. Agar test card kaam karta hai —
        original card issue hai (damaged, demagnetized, wrong format). Agar test card bhi fail —
        reader ya wiring issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Reader replace karo. Cable continuity check karo (Wiegand
        D0/D1 lines). Controller port damaged hai to controller replace ya alternate port use karo.
        Card issue hai to re-encode ya replace karo.
      </p>

      <h3 style={S.h3}>Fault 2: Card Read (Green LED) But Door Does Not Unlock</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access software mein event log dekho — access granted hai ya
        denied? Agar "Access Denied" — reason note karo: invalid credential, schedule restriction,
        APB violation, door not configured for this card.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Agar "Access Granted" log mein hai lekin door nahi khuli —
        lock wiring check karo. Controller relay output properly connected hai lock ko?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Controller relay manually trigger karo (software ya test mode se) —
        lock release hoti hai? Agar yes, controller relay-to-lock wiring ok hai. Agar no — lock power
        supply check karo, lock itself check karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Denied case mein — credential schedule fix karo, APB reset
        karo, door assignment fix karo. Granted-but-locked case mein — lock terminal wiring tighten
        karo, lock replace karo agar faulty, PSU voltage verify karo.
      </p>

      <h3 style={S.h3}>Fault 3: Door Forced Open Alarm — Frequent/Recurring</h3>
      <p style={S.p}>
        <strong>First check:</strong> Door contact sensor alignment check karo — door fully closed
        hone pe magnet aur sensor properly aligned hain?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Door hinge aur closer check karo — door properly closing aur
        latching hai? Auto-closer adjusted hai? Door frame warp ya settled hai?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Sensor realign karo. Door closer adjust/replace karo.
        Agar recurring at specific times — CCTV check karo, potential actual unauthorized access investigate karo.
      </p>

      <h3 style={S.h3}>Fault 4: Controller Offline / Not Communicating with Server</h3>
      <p style={S.p}>
        <strong>First check:</strong> Network connectivity — controller IP ping karo server se.
        Reachable hai? Switch port status?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Controller power check karo — LEDs normal hain? Controller web
        interface ya display accessible hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Controller ping karo locally — responds? Agar yes, software/server
        side issue. Agar no — network cable, switch port, ya controller network interface.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Network cable replace karo. Switch port cycle karo.
        Controller IP settings verify karo — DHCP lease expired? Static IP conflict? Server firewall
        block kar raha hai? Controller reboot karo. Note: modern controllers standalone mode mein
        local decisions lete rahte hain — doors functional rahti hain typically.
      </p>

      <h3 style={S.h3}>Fault 5: Access Granted But Door Physically Cannot Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> EM lock — armature plate properly aligned hai? Armature plate
        dirty ya rusty hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Lock power — multimeter se voltage measure karo lock pe lock
        release hone pe.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Armature plate clean karo aur alignment adjust karo. EM
        lock insufficient release current mil raha hai — PSU voltage drop check karo (long cable runs
        mein voltage drop issue ho sakta hai). Lock replace karo agar mechanically stuck.
      </p>

      <h3 style={S.h3}>Fault 6: Controller PSU / Battery Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> Controller PSU LED status — fault indicator? Battery LED status?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Mains disconnect karo aur battery on-load voltage measure karo —
        adequate hai? Battery nominal voltage hold kar rahi hai under load?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Battery replace karo — per OEM specification aur observed
        health data, calendar-based replacement nahi. PSU output voltage check karo — regulated output
        within spec hai? PSU faulty hai to replace karo. New battery commission karo aur full charge
        verify karo.
      </p>

      <h3 style={S.h3}>Fault 7: Anti-Passback Violation — Person Locked Out</h3>
      <p style={S.p}>
        <strong>First check:</strong> Software mein person ka access log dekho — APB state kya hai?
        Last entry/exit records kya hain?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Software mein APB reset karo for this person — allow next
        access. Root cause investigate karo: exit reader bypassed kiya? Tailgated exit? REX use karke
        exit kiya bina card swipe ke? APB configuration correct hai? Exit reader working hai?
      </p>

      <h3 style={S.h3}>Fault 8: All Doors on a Controller Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> Controller power — completely dead? LEDs off?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> PSU mains input aur output check karo. Fuse blown?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> PSU fuse replace karo (correct rating se). PSU itself
        replace karo. Controller hardware failure hai to replace karo. Note: controller replacement
        ke baad credential database restore karo backup se — ya server se re-sync karo.
      </p>

      <ComparisonTable
        title="Access Control Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Card read, door won't open", "Access log — granted or denied?", "Relay output / lock wiring", "Denied: schedule/config; Granted: lock/wiring fault", "Fix config or wiring/lock"],
          ["No reader response", "Reader power (12V DC)", "Card type compatibility", "Power loss or card mismatch", "Check wiring, replace reader/card"],
          ["Door forced alarm", "Door contact sensor alignment", "Door closer/latch mechanism", "Misaligned sensor or door not latching", "Realign sensor, adjust closer"],
          ["Controller offline", "Network ping to controller", "Controller power/display", "Network issue or controller fault", "Fix network/cable, reboot, replace if faulty"],
          ["APB lockout", "APB state in software", "Last entry/exit records", "Exit not recorded", "Reset APB, fix exit reader"],
          ["Door won't release (EM lock)", "Armature plate alignment", "PSU voltage at lock", "Misalignment or voltage drop", "Realign plate, check PSU/cable"],
          ["PSU/battery fault", "PSU LED indicators", "Battery voltage under load", "Battery degraded or PSU fault", "Replace battery/PSU per health data"],
          ["All controller doors dead", "Controller LEDs/power", "PSU mains input, fuse", "PSU failure or blown fuse", "Replace fuse/PSU, restore database"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Centralized credential management — instant revoke, modify, schedule</li>
        <li>Complete audit trail — who accessed where, when, denied attempts</li>
        <li>Granular control — zone, schedule, multi-factor, anti-passback</li>
        <li>Integration capability — CCTV, biometrics, BMS, visitor management</li>
        <li>Scalability — small facility se enterprise multi-site tak</li>
        <li>Compliance evidence — ISO 27001, SOC 2, PCI-DSS audit support</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>Single-factor card alone — tailgating aur card sharing prevent nahi karta</li>
        <li>Power dependency — PSU/battery backup without which fail-safe locks open ho sakte hain</li>
        <li>Software/server single point of failure — proper redundancy plan karo</li>
        <li>Credential hygiene — stale accounts, unchanged schedules over time security degrade karte hain</li>
        <li>Cybersecurity risk — IP-based systems network attack surface hain</li>
        <li>Cost — multi-door, multi-site deployments significant upfront investment</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: Ye ek illustrative scenario hai — kisi documented real facility ka reference nahi">
        Neeche diya hua scenario access control ke practical value ko demonstrate karne ke liye hai.
      </Callout>

      <p style={S.p}>
        Ek data center mein NOC operator ko access management software mein alert milta hai — server
        hall mein ek technician ke badge ne raat 2 baje access liya, jo unke approved schedule se
        bahar hai (approved: 8 AM – 8 PM weekdays only). Operator immediately CCTV footage check
        karta hai — confirmed, same person hai. Security supervisor contact karta hai. Technician se
        clarification li jaati hai — unka kaam urgent tha aur unhone supervisor ko inform kiya tha
        lekin schedule update nahi hua tha.
      </p>
      <p style={S.p}>
        Is scenario mein access control ne kya kiya: after-hours access alert generate kiya, CCTV
        se cross-reference possible hua, aur documented response possible hua. Root cause — schedule
        not updated for approved overtime — process gap identify hua aur fix kiya gaya.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: Access controller aur access server mein kya fark hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Controller edge device hai — readers, locks aur sensors directly
        connect karte hain. Controller local decisions leta hai, credentials aur rules onboard memory
        mein store karta hai. Server central management platform hai — credential enrollment, policy
        configuration, reporting aur integrations. Controller server se sync karta hai lekin server
        offline hone pe bhi local decisions le sakta hai (modern controllers mein).
      </p>

      <h3 style={S.h3}>Q2: Fail-safe aur fail-secure mein kya fark hai aur kab kya use karein?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Fail-safe lock power failure mein open ho jaata hai — evacuation path
        clear rehti hai. Fail-secure power failure mein locked rehta hai — higher security lekin fire
        code compliance check karna zaroori hai. EM locks always fail-safe hote hain. Electric strikes
        dono options mein available hain. Required egress doors aur electrically locked arrangements ko approved fire alarm/access control sequence of operations, applicable fire/life-safety code aur AHJ requirements ke hisaab se respond karna chahiye. High-security areas pe lock selection aur behavior project-specific approved design se determine hota hai — fire code requirements aur AHJ se verify karo.
      </p>

      <h3 style={S.h3}>Q3: Anti-passback kya hai aur ye kaise configure karte hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> APB prevent karta hai ki same credential consecutively same direction
        mein use ho. Entry ke baad exit record hone se pehle doosri entry denied ya alarmed hoti hai.
        Soft APB — violation pe alarm, access allow. Hard APB — access denied. Configure ke liye: entry
        aur exit dono doors pe readers chahiye, zones define karo, APB rules per zone per access level
        apply karo. Data center server halls pe hard APB appropriate hai.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>Access control = credential authenticate + policy check + lock control + audit log. Har step matter karta hai.</li>
        <li>125 kHz proximity cards legacy aur low-security hain — smart cards ya mobile credentials prefer karo.</li>
        <li>OSDP protocol Wiegand se significantly more secure hai — new deployments mein specify karo.</li>
        <li>Controller standalone mode mein local decisions leta hai — server offline pe doors functional rehti hain typically.</li>
        <li>Anti-passback tailgating aur credential sharing discourage karta hai — hard APB high-security zones ke liye.</li>
        <li>DFO aur DOTL alarms response process ke saath meaningful hain — alarm fatigue se bacho.</li>
        <li>Cybersecurity controls essential hain — network segmentation, encrypted comms, firmware updates.</li>
        <li>Regular access audit karo — stale accounts remove karo, schedules verify karo.</li>
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
        <li><TopicLink slug="cctv" variant="inline" /> — Visual surveillance jo access control ke saath integrate hoti hai.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — Higher-assurance authentication for critical zones.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — Two-door airlock jo tailgating prevent karta hai.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — Temporary access provisioning workflow.</li>
      </ul>
    </>
  );
}
