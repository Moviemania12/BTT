"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function ComponentsAndTypes() {
  return (
    <>
      <h2 id="main-components" style={S.h2}>Main Components</h2>

      <h3 style={S.h3}>Access Controller</h3>
      <p style={S.p}>
        The controller is the brain of the access control system. It receives credential data from readers, authenticates it in the local database, checks the access policy, and controls the lock relay. Modern controllers store thousands of credentials and months of event logs in onboard memory — they can take local decisions even when the server is offline. Controllers are typically available in 1-door, 2-door, 4-door, or multi-door variants.
      </p>
      <p style={S.p}>
        The power supply is critical for the controller — there must be a dedicated PSU with battery backup. On mains failure the battery backup should power the controller and connected locks for the specified duration. Battery health monitoring is important — an untested battery can fail in an emergency.
      </p>

      <h3 style={S.h3}>Card/Credential Reader</h3>
      <p style={S.p}>
        The reader is mounted outside the secured side of the door. The user presents a credential — tap a card, enter a PIN, or biometric — and the reader sends the signal to the controller. Readers communicate with the controller over the Wiegand or OSDP protocol. Specify IP65+ rated readers for outdoor/exposed areas. Vandal-resistant housing at critical entry points.
      </p>

      <h3 style={S.h3}>Door Contact Sensor</h3>
      <p style={S.p}>
        Magnetic contact sensors are mounted on the door frame and the door. When the door opens, the magnetic field breaks — the controller detects it. Door forced open or open-too-long alarms are generated from this sensor. Check sensor alignment regularly — a slight misalignment causes false alarms or an actually open door is not detected.
      </p>

      <h3 style={S.h3}>Request-to-Exit (REX)</h3>
      <p style={S.p}>
        REX is on the exit side — typically a motion sensor (PIR) or push button. When going out from inside there is no need to present a credential — the lock releases on the REX signal and the event is logged. Motion-based REX (passive infrared) gives hands-free exit. Push-button REX requires an intentional exit. In data centers motion REX is typically used and the exit is also logged.
      </p>

      <h3 style={S.h3}>Electromagnetic Lock (EM Lock)</h3>
      <p style={S.p}>
        An EM lock holds the door with magnetic force using an armature plate fitted on the door frame and door. EM locks are typically of fail-safe design — when power is de-energized the magnetic hold releases. Fire/life-safety release behavior is configured according to the approved system design, applicable code and AHJ requirements — the exact interface and sequence are project-specific.
      </p>

      <h3 style={S.h3}>Electric Strike</h3>
      <p style={S.p}>
        An electric strike replaces the latch keeper in the door frame. Fail-secure versions stay locked without power, fail-safe versions stay open. Fail-secure is appropriate for high-security areas — the door stays locked on power failure. Carefully check fire code requirements and occupancy type before specifying fail-secure locks.
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
        125 kHz EM proximity cards (HID Prox, EM4100 etc.) are easily cloned with off-the-shelf tools — a device worth a few hundred rupees is enough. If your data center is still using 125 kHz cards, you should make a migration plan. Existing readers can typically be replaced with 13.56 MHz smart card readers without a wiring change.
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
        The access schedule defines which credential is valid, when, and on which door. A technician might have access to the server hall Monday to Friday, 8 AM to 8 PM only — the controller checks the schedule and denies weekend or off-hours attempts. Zones group related doors — a "Server Hall Zone" can have multiple doors that are managed under one access group.
      </p>

      <p style={S.p}>
        Access levels are assigned centrally — typically role-based. When a new employee joins, assign them to the IT operations role and they automatically get access to all relevant doors. When the employee leaves, disable the account — all access is revoked immediately. This centralized control is the key advantage of physical security over traditional keys.
      </p>

      <h2 id="alarms" style={S.h2}>Door Alarms: Forced Entry and Open-Too-Long</h2>

      <p style={S.p}>
        <strong>Door Forced Open (DFO)</strong> — the door contact sensor detects that the door opened without a valid access event. Possible causes: actual unauthorized entry, the door failed mechanically, the sensor is misaligned. Immediate investigation required — cross-reference the CCTV footage.
      </p>

      <p style={S.p}>
        <strong>Door Open Too Long (DOTL)</strong> — after a valid access event the door stayed open longer than the specified time. The door-open-too-long timeout is configurable and should be defined according to the door function, operational workflow, risk assessment and site security policy — there is no universal default. Possible causes: the door did not latch properly (auto-closer failed?), a person was holding the door, a tailgating attempt. Configure the DOTL threshold according to site conditions — false alarms are frustrating, but also maintain sensitivity.
      </p>

      <Callout type="best-practice" title="Alarm Fatigue — Both Configuration and Response Process Are Essential">
        When false alarms come repeatedly, operators start ignoring real alarms. Tune the DFO and DOTL thresholds carefully — consider site conditions. Define the alarm response process — who responds, when CCTV is checked, when physical inspection is done. A documented response process ensures real incidents are not missed.
      </Callout>

      <h2 id="anti-passback" style={S.h2}>Anti-Passback</h2>

      <p style={S.p}>
        Anti-passback (APB) prevents a credential from being used consecutively in the same direction — without a corresponding opposite-direction use. If you swiped your card for entry (IN recorded), a second entry attempt will be denied until an exit is recorded. This discourages tailgating and credential sharing — one badge cannot let two people in simultaneously.
      </p>

      <p style={S.p}>
        <strong>Soft APB</strong> — on violation an alarm is generated but access is allowed. <strong>Hard APB</strong> — on violation access is denied. In data centers hard APB is appropriate for the server hall and high-security zones. Both entry and exit readers are required for APB — APB does not work with only an entry reader. Review APB violations regularly — frequent violations can indicate that exits are not being recorded properly.
      </p>
    </>
  );
}
