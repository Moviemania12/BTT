"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function AccessAndIntegration() {
  return (
    <>
      <h2 id="temporary-credentials" style={S.h2}>Temporary Credentials and Access Provisioning</h2>

      <p style={S.p}>
        On-site registration ke baad visitor ko temporary credential milta hai — typically a printed
        badge with embedded card (RFID or barcode). Ye credential visitor management system → access control system mein
        provisioned hoti hai: visitor ka name, photo, valid zones (specific floors/rooms only), valid
        time window (visit duration only). Access provisioning real-time hona chahiye — badge print
        hone ke saath hi access control system mein active ho.
      </p>

      <p style={S.p}>
        Visitor badge visually distinct honi chahiye — different color (typically different from employee
        badges), "VISITOR" text prominently displayed, escort required indication. Physical distinctiveness
        enable karta hai ki facility staff immediately identify kar sake ki ye visitor hai aur escort ke
        saath hai ya nahi.
      </p>

      <Callout type="best-practice" title="Principle of Least Privilege — Visitor Credentials">
        Visitor ko sirf minimum necessary access dena. Agar vendor UPS room pe kaam karne aaya hai
        to sirf UPS room access de — server hall access nahi. Time window tightly set karo — 4-hour
        visit ke liye 4-hour credential, not full-day. Over-provisioned visitor access significant
        security risk hai.
      </Callout>

      <h2 id="visitor-escort" style={S.h2}>Visitor Escort and Movement</h2>

      <p style={S.p}>
        Data center mein visitors typically escorted hote hain — unaccompanied movement high-risk hai.
        Escort policy define karo: kaun escort kar sakta hai (host employee only? security staff bhi?),
        escort escort se kab separate ho sakta hai, aur kaunse areas unescorted access allow hai (agar
        koi). Some facilities low-risk areas (lobby, conference rooms) mein unescorted allow karte hain
        lekin data halls aur critical areas mein visitor access strictly controlled hona chahiye aur sirf approved authorization, escort, access provisioning aur site security policy ke hisaab se permitted hona chahiye.
      </p>

      <p style={S.p}>
        Access control mein escort-visitor pairing possible hai kuch advanced systems mein — visitor
        access sirf tabhi valid hoti hai jab escort's credential bhi same area mein recently used hua
        ho. Ye technically complex hai lekin high-security facilities mein valuable hai.
      </p>

      <h2 id="checkout-expiry" style={S.h2}>Check-Out and Credential Expiry</h2>

      <p style={S.p}>
        Visit complete hone pe visitor check-out karta hai — reception pe badge return karo, system
        mein check-out record karo, credential immediately revoke ho. Agar visitor bina proper check-out
        ke leave kare — system should handle: time-based automatic expiry, end-of-day auto-expiry, ya
        host notification. Physical badge wapas lena important hai — credential revoked hai lekin
        physical badge misuse ho sakta hai if found.
      </p>

      <p style={S.p}>
        Extended visits ke liye — multi-day vendor work — daily re-approval aur per-day credential
        issuance better security practice hai than single long-duration credential. Day end pe credential
        expire hoti hai aur next day re-issue hoti hai — ensures daily accountability.
      </p>

      <h2 id="audit-trail" style={S.h2}>Audit Trail and Reporting</h2>

      <p style={S.p}>
        Visitor management system ka audit trail complete visitor record maintain karta hai: pre-registration details, approval
        decision (who approved), on-site registration data, identity verification, access credential
        details, actual entry/exit times (from access control), check-out, escort details. Ye record
        compliance audits, security investigations aur incident response ke liye critical hai.
      </p>

      <p style={S.p}>
        System reporting capabilities include: active visitors at any time, daily visitor summary, extended
        stay alerts (visitor should have checked out), frequent visitors, access by area. Integration
        with CCTV allows video evidence linked to specific visitor events — forensic investigation mein
        very powerful.
      </p>

      <Callout type="maintenance" title="Regular Audit Log Review — Anomalies Catch Karo">
        Visitor management system logs sirf store karne se kaam nahi hota — regular review zaroori hai. Weekly: extended
        stays, missed check-outs, visitors who accessed areas outside their approved zone. Monthly:
        visitor frequency patterns, hosts with unusually high visitor counts. Automated alerts
        configure karo for anomalous patterns.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Access Control and CCTV</h2>

      <p style={S.p}>
        Visitor management system to access control integration core functionality hai. Integration typically REST API,
        database connector ya vendor-specific SDK se hoti hai. Provisioning: visitor management system credential data →
        access control system, real-time ya near-real-time. Revocation: check-out ya expiry pe system
        signal → access control credential disable. Audit sync: access control events (door opens,
        denied attempts) → visitor record pe linked hote hain.
      </p>

      <p style={S.p}>
        <TopicLink slug="cctv" variant="inline" /> integration visitor entry pe automatic camera snapshot
        ya recording trigger karta hai. Visitor's photo from the system aur CCTV footage comparison possible
        hota hai. Unauthorized movement alerts (visitor access control violation) pe instant CCTV
        review enable hota hai.
      </p>

      <p style={S.p}>
        <TopicLink slug="mantrap" variant="inline" /> integration: visitor badge mantrap outer door
        pe valid hoti hai, successfully authenticate karne pe vestibule mein jaata hai, inner door pe
        additional verification ya escort confirmation. Mantrap CCTV se visitor face capture hoti hai.
      </p>

      <h2 id="cybersecurity-privacy" style={S.h2}>Cybersecurity and Privacy Considerations</h2>

      <p style={S.p}>
        Visitor data — names, ID numbers, photos, visit purpose, company — sensitive personal data hai.
        Database security essential hai: encrypted storage, access-controlled system server, network
        segmentation. Server-side: strong authentication for system admin access, regular software updates,
        vulnerability management. Visitor-facing kiosks kiosk mode mein run karo — no access to
        underlying OS or previous visitor data.
      </p>

      <p style={S.p}>
        Privacy regulations — India's DPDP Act, GDPR for EU-related clients — visitor data collection,
        storage aur retention pe restrictions apply karte hain. Visitors ko typically inform karna
        padta hai ki unka data collect ho raha hai aur kyun. Retention period define karo aur expired
        data systematically delete karo. Legal counsel se jurisdiction-specific requirements verify karo.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance and System Health</h2>

      <p style={S.p}>
        Neeche example maintenance activities hain — actual schedule OEM recommendations aur site
        policy ke hisaab se adjust karo.
      </p>

      <ul style={S.ul}>
        <li><strong>Daily:</strong> Active visitor dashboard check — overnight visitors, missed check-outs</li>
        <li><strong>Weekly:</strong> Badge printer supplies — ribbon, card stock, label stock</li>
        <li><strong>Weekly:</strong> Access control integration sync verify — recent visitor credentials correctly provisioned aur revoked</li>
        <li><strong>Monthly:</strong> Visitor management system software updates check</li>
        <li><strong>Monthly:</strong> Database backup verify — visitor records backup restore test</li>
        <li><strong>Monthly:</strong> End-to-end process test — test visitor register karo, badge print karo, access verify karo, check-out karo, revocation verify karo</li>
        <li><strong>Quarterly:</strong> User access audit — system admin accounts review</li>
        <li><strong>Quarterly:</strong> Data retention compliance — old records per policy purged?</li>
        <li><strong>Annually:</strong> Privacy compliance review — data collected, retention period, applicable regulations</li>
      </ul>
    </>
  );
}
