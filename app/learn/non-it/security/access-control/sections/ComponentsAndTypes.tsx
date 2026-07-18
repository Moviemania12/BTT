"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function ComponentsAndTypes() {
  return (
    <>
      <h2 id="main-components" style={S.h2}>Main Components</h2>

      <h3 style={S.h3}>Access Controller</h3>
      <p style={S.p}>
        Controller access control system ka brain hai. Ye readers se credential data receive karta hai,
        local database mein authenticate karta hai, access policy check karta hai, aur lock relay control
        karta hai. Modern controllers onboard memory mein thousands of credentials aur months of event
        logs store karte hain — server offline hone pe bhi local decisions le sakte hain. Controllers
        typically 1-door, 2-door, 4-door, ya multi-door variants mein available hote hain.
      </p>
      <p style={S.p}>
        Power supply controller ke liye critical hai — dedicated PSU with battery backup honi chahiye.
        Mains failure mein battery backup controller aur connected locks ko specified duration ke liye
        power kare. Battery health monitoring important hai — untested battery emergency mein fail ho
        sakti hai.
      </p>

      <h3 style={S.h3}>Card/Credential Reader</h3>
      <p style={S.p}>
        Reader door ke secured side ke bahar mount hota hai. User credential present karta hai — card
        tap karo, PIN enter karo, ya biometric — reader signal controller ko bhejta hai. Readers
        Wiegand ya OSDP protocol pe controller se communicate karte hain. Outdoor/exposed areas ke
        liye IP65+ rated readers specify karo. Vandal-resistant housing critical entry points pe.
      </p>

      <h3 style={S.h3}>Door Contact Sensor</h3>
      <p style={S.p}>
        Magnetic contact sensor door frame aur door pe mounted hote hain. Jab door open hota hai,
        magnetic field break hoti hai — controller detect karta hai. Door forced open ya open-too-long
        alarms is sensor se generate hote hain. Sensor alignment regular check karo — slight misalignment
        false alarms cause karta hai ya actual open door detect nahi hoti.
      </p>

      <h3 style={S.h3}>Request-to-Exit (REX)</h3>
      <p style={S.p}>
        REX exit side pe hota hai — typically a motion sensor (PIR) ya push button. Andar se bahar
        jaate waqt credential present karne ki zaroorat nahi hoti — REX signal pe lock release hota
        hai aur event log hoti hai. Motion-based REX (passive infrared) hands-free exit deta hai.
        Push-button REX intentional exit require karta hai. Data centers mein typically motion REX
        use hota hai aur exit bhi logged hoti hai.
      </p>

      <h3 style={S.h3}>Electromagnetic Lock (EM Lock)</h3>
      <p style={S.p}>
        EM lock door frame aur door pe armature plate lagake magnetic force se door hold karta hai.
        EM locks typically fail-safe design hote hain — power de-energize hone pe magnetic hold release hoti hai. Fire/life-safety release behavior approved system design, applicable code aur AHJ requirements ke hisaab se configured hota hai — exact interface aur sequence project-specific hota hai.
      </p>

      <h3 style={S.h3}>Electric Strike</h3>
      <p style={S.p}>
        Electric strike door frame mein latch keeper replace karta hai. Fail-secure versions power ke
        bina locked rehte hain, fail-safe versions open rehte hain. Fail-secure appropriate hai high-security
        areas ke liye — power failure mein door locked rehta hai. Fire code requirements aur occupancy
        type carefully check karo before specifying fail-secure locks.
      </p>

      <h2 id="credential-types" style={S.h2}>Credential Types</h2>

      <ComparisonTable
        title="Access Credential Types — Comparison"
        headers={["Type", "Technology", "Security Level", "Data Center Use"]}
        rows={[
          ["Proximity Card (125 kHz)", "EM induction, read-only ID", "Low — easily cloned", "Legacy systems only; avoid new deployments"],
          ["Smart Card (MIFARE DESFire, HID iCLASS SE)", "Cryptographic authentication on card", "Depends on crypto implementation, key management, reader protocol", "Recommended for data centers — verify cryptographic implementation"],
          ["Mobile Credential (BLE/NFC)", "Smartphone-based, encrypted", "High", "Modern deployments; BYOD considerations"],
          ["PIN (Keypad)", "4–8 digit code", "Low alone", "Used as second factor (card+PIN)"],
          ["Biometric", "Fingerprint, face, iris", "Depends on modality, enrollment quality, liveness, system design", "High-security zones; see Biometrics article"],
          ["Multi-factor (Card + PIN / Card + Biometric)", "Combination of independent factors", "Higher assurance than single factor — actual strength depends on individual factor implementation", "High-security zones where risk assessment supports multi-factor requirement"],
        ]}
      />

      <Callout type="warning" title="125 kHz Proximity Cards — Legacy Risk">
        125 kHz EM proximity cards (HID Prox, EM4100 etc.) easily cloned hoti hain with off-the-shelf
        tools — a few hundred rupees ka device enough hai. Agar tumhara data center abhi bhi 125 kHz
        cards use kar raha hai, migration plan banana chahiye. Existing readers typically 13.56 MHz
        smart card readers se replace ho sakte hain bina wiring change ke.
      </Callout>

      <h2 id="lock-types" style={S.h2}>Lock Types: Electromagnetic and Electric Strike</h2>

      <ComparisonTable
        title="EM Lock vs Electric Strike"
        headers={["Feature", "Electromagnetic Lock", "Electric Strike"]}
        rows={[
          ["Mount location", "Door frame + door (armature)", "Door frame (latch keeper)"],
          ["Fail-safe behavior", "Typically fail-safe by design (power off = release) — verify per product spec", "Fail-safe or fail-secure depending on model — specify at procurement per project/code requirements"],
          ["Fire evacuation", "Automatically opens on power cut", "Depends on type — check fire code"],
          ["Force resistance", "High holding force (up to 1200 lb+)", "Good; depends on model"],
          ["Door type", "Works with most doors", "Requires compatible latch hardware"],
          ["Common use in DC", "Server halls, restricted areas", "Office areas, lower-security zones"],
        ]}
      />

      <h2 id="access-schedules" style={S.h2}>Access Schedules and Zones</h2>

      <p style={S.p}>
        Access schedule define karta hai ki kaunn sa credential, kab, kaunse door pe valid hai. A
        technician might have access to the server hall Monday to Friday, 8 AM to 8 PM only — controller
        schedule check karta hai aur weekend ya off-hours attempt deny karta hai. Zones group related
        doors — "Server Hall Zone" mein multiple doors ho sakte hain jo ek access group pe manage hote hain.
      </p>

      <p style={S.p}>
        Access levels centrally assign hote hain — typically role-based. New employee join karta hai
        to IT operations role mein assign karo, automatically sab relevant doors access milti hai.
        Employee leaves to account disable karo — immediately sab access revoke. Ye centralized control
        physical security ka key advantage hai over traditional keys.
      </p>

      <h2 id="alarms" style={S.h2}>Door Alarms: Forced Entry and Open-Too-Long</h2>

      <p style={S.p}>
        <strong>Door Forced Open (DFO)</strong> — door contact sensor detect karta hai ki door open
        hua bina valid access event ke. Possible causes: actual unauthorized entry, door mechanically
        failed, sensor misaligned. Immediate investigation required — CCTV footage cross-reference karo.
      </p>

      <p style={S.p}>
        <strong>Door Open Too Long (DOTL)</strong> — valid access event ke baad door specified time
        pe zyada open raha. Door-open-too-long timeout configurable hai aur door function, operational workflow, risk assessment aur site security policy ke hisaab se define hona chahiye — koi universal default nahi hai. Possible causes: door properly
        latched nahi hua (auto-closer failed?), person door hold kar raha tha, tailgating attempt.
        DOTL threshold site conditions ke hisaab se configure karo — false alarms frustrating hote hain
        par sensitivity bhi maintain karo.
      </p>

      <Callout type="best-practice" title="Alarm Fatigue — Configuration aur Response Process Dono Zaroori Hain">
        False alarms repeatedly aane se operators real alarms ignore karne lagte hain. DFO aur DOTL
        thresholds carefully tune karo — site conditions consider karo. Alarm response process define
        karo — kaunn respond karta hai, kab CCTV check hoti hai, kab physical inspection hoti hai.
        Documented response process ensure karta hai ki real incidents miss na hon.
      </Callout>

      <h2 id="anti-passback" style={S.h2}>Anti-Passback</h2>

      <p style={S.p}>
        Anti-passback (APB) prevent karta hai ki ek credential consecutively same direction mein use
        ho — without corresponding opposite-direction use. Agar tumne entry card swipe kiya (IN recorded)
        to doosri entry attempt deny hogi jab tak exit record na ho. Ye tailgating aur credential
        sharing discourage karta hai — ek badge do logon ko simultaneously andar allow nahi kar sakta.
      </p>

      <p style={S.p}>
        <strong>Soft APB</strong> — violation pe alarm generate hoti hai lekin access allow hoti hai.
        <strong>Hard APB</strong> — violation pe access deny hoti hai. Data centers mein server hall
        aur high-security zones pe hard APB appropriate hai. Entry aur exit readers dono zaroori hain
        APB ke liye — sirf entry reader se APB work nahi karta. APB violations regularly review karo —
        frequent violations indicate ho sakte hain ki exit properly recorded nahi ho rahi.
      </p>
    </>
  );
}
