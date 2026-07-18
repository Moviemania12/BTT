"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BmsMonitoringVsControl from "../svg/BmsMonitoringVsControl";

export default function WhatBmsMonitors() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10 — WHAT BMS CAN MONITOR
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="what-bms-monitors" style={S.h2}>What BMS Can Monitor in a Data Center</h2>

      <p style={S.p}>
        BMS mein available points samajhne ke liye teen layers distinguish karo: (1) <strong>Equipment
        internally kya measure karta hai</strong> — onboard measurements. (2) <strong>OEM communication
        interface kya expose karta hai</strong> — Modbus register map, BACnet object list, SNMP MIB mein
        listed points. (3) <strong>BMS project mein actually kya integrated kiya gaya hai</strong> —
        configured, mapped aur commissioned points. Ye teeno automatically same nahi hote. Neeche
        commonly monitored parameters hain — actual availability OEM interface, communication card,
        firmware version aur project specification se confirm karo.
      </p>

      <h3 style={S.h3}>Electrical Systems</h3>
      <p style={S.p}>
        <strong>Utility / Grid:</strong> Incoming supply voltage (L-N, L-L), current, frequency, power
        factor — via energy meters or where metering is instrumented at incomer. <strong>HT/LT
        Panels:</strong> Breaker status (where integrated), incomer voltage/current (where metered),
        bus coupler position. <strong>Transformer:</strong> Temperature (winding/oil where probe
        present), load current, oil level alarm — where sensors exist. <strong>DG Set:</strong>
        Running/stopped status, fault alarm, engine parameters (oil pressure, coolant temp, RPM) if
        controller supports communication, fuel level (where tank level sensor present), kWh — via
        dry contacts or Modbus/CAN to BMS. <strong>ATS/AMF Panel:</strong> Source selection
        (utility/DG), position status — typically dry contacts. <strong>UPS:</strong> Input/output
        voltage per phase, input/output current, frequency, load kVA/%, battery voltage, battery SOC,
        battery runtime remaining, operating mode (normal/bypass/battery), fault alarms — via Modbus,
        BACnet, or SNMP. <strong>Battery system:</strong> String voltage, cell voltages (where BMS
        connected), temperature, capacity — if BMS (Battery Monitoring System) has communication
        interface. <strong>PDU:</strong> Total kWh, per-branch current (where instrumented), breaker
        trip alarms — via Modbus or SNMP. <strong>Energy meters:</strong> kWh, kW, kVAR, power
        factor, voltage, current — via Modbus RTU/TCP.
      </p>

      <h3 style={S.h3}>Cooling Systems</h3>
      <p style={S.p}>
        <strong>PAC/CRAC units:</strong> Supply air temperature, return air temperature, fan status,
        compressor status (if exposed), filter differential pressure alarm, cooling mode, setpoint,
        capacity % — via BACnet or Modbus from unit controller. <strong>Chiller plant:</strong>
        Chiller on/off, chilled water supply/return temperature, chiller kW, COP where calculated,
        compressor status, fault alarm — via Modbus/BACnet from chiller controller. <strong>Cooling
        towers:</strong> Fan status, sump level, temperature, VFD speed. <strong>Pumps:</strong>
        Running status, fault, differential pressure, flow (where sensors present), VFD status.
        <strong>Valves:</strong> Position feedback (open/closed ya 0–100%), command (where commandable).
      </p>

      <h3 style={S.h3}>Environmental Monitoring</h3>
      <p style={S.p}>
        Temperature aur humidity sensors cold aisle, hot aisle, return air, server inlet height pe.
        Differential pressure — raised floor plenum pe, or across air containment. Water leak detection
        sensors — under raised floor, near precision cooling units, mechanical rooms. Fuel/tank level —
        float sensor ya level transmitter where installed. Air quality sensors — some facilities CO2,
        particulate monitoring ke liye.
      </p>

      <h3 style={S.h3}>Integration with Fire Alarm, VESDA, Access Control and CCTV</h3>
      <p style={S.p}>
        BMS in dedicated systems se <em>selected status and alarm points</em> receive kar sakta hai —
        monitoring ke liye. <TopicLink slug="vesda" variant="inline" /> fire detection system Alert ya
        Fire alarm state BMS ko dry contact ya Modbus se bhej sakta hai. <TopicLink slug="access-control" variant="inline" />
        aur <TopicLink slug="cctv" variant="inline" /> se door status ya camera fault BMS pe receive
        ho sakta hai.
      </p>

      <Callout type="danger" title="BMS Does Not Replace Life-Safety Systems">
        Fire alarm, VESDA, fire suppression aur access control apne dedicated controllers aur logic pe
        operate karte hain. BMS in systems ka replacement nahi hai aur primary life-safety control
        path nahi hona chahiye. BMS sirf visibility deta hai — actual fire detection, alarm activation,
        suppression release aur evacuation sequence dedicated systems handle karte hain. Ye boundary
        safety-critical hai aur project design mein clearly defined honi chahiye.
      </Callout>

      <h3 style={S.h3}>Monitoring-Only vs Read/Write Points</h3>
      <p style={S.p}>
        Upar listed points mostly monitoring-only (read-only) hain. Kuch points read/write hote hain
        jahan design specifically control allow karta hai — CRAC setpoint, chiller plant sequencing
        commands, AHU fan speed setpoint. Point access type OEM interface pe depend karta hai (FC 03
        write ya BACnet WriteProperty support) aur project authorization pe.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11 — MONITORING VS CONTROL
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="monitoring-vs-control" style={S.h2}>Monitoring vs Control — A Critical Distinction</h2>

      <h3 style={S.h3}>Read-Only Monitoring Points</h3>
      <p style={S.p}>
        Majority of BMS points in a typical data center are read-only — UPS parameters, DG status,
        environmental sensors, energy meter readings. BMS inhe observe karta hai aur alarm/trend
        generate karta hai. Equipment normal operation pe unaffected rehta hai. Ye safest integration
        mode hai — accidental command issue karne ka risk zero hai.
      </p>

      <h3 style={S.h3}>Commandable Points and Setpoints</h3>
      <p style={S.p}>
        Read/write points jahan BMS command send kar sakta hai: CRAC/CRAH supply air temperature
        setpoint change, AHU fan speed, chiller plant enable/disable, lighting relay. Ye capabilities
        specifically designed aur authorized honi chahiye — not enabled by default. OEM interface bhi
        write access support karna chahiye.
      </p>

      <h3 style={S.h3}>Interlocks, Sequences and Automatic Control</h3>
      <p style={S.p}>
        BMS automatic sequences bhi run kar sakta hai — jaise chiller plant staging logic (agar load
        increases past threshold, start second chiller), aur economizer control. Interlocks ensure
        karte hain ki ek command issue hone ke pehle conditions safe hain — e.g., do not start second
        chiller agar coolant flow low hai. Sequences DDC controllers pe locally run ho sakte hain ya
        BMS server pe centrally. Critical sequences typically local controller pe prefer hote hain —
        network failure pe bhi operate karte hain.
      </p>

      <h3 style={S.h3}>Manual Override</h3>
      <p style={S.p}>
        Authorized operator BMS mein manual override set kar sakta hai — automatic sequence ko
        supersede karna. Override state clearly visible hona chahiye — HMI pe highlight, alarm
        generate karo agar override active hai for too long. Override event log mein recorded hona
        chahiye with operator identity aur timestamp.
      </p>

      <h3 style={S.h3}>When Remote Control Through BMS Is and Is Not Appropriate</h3>
      <p style={S.p}>
        Remote control appropriate hai jahan specifically designed, risk-assessed aur authorized hai —
        HVAC setpoints, lighting schedules, non-critical sequences. Remote control NOT appropriate
        without proper design for: UPS bypass command, DG start/stop without interlocks, fire
        suppression anything, security system commands, ATS manual operation. Ye principle hai ki
        BMS visibility aur convenience provide karta hai — final authority ek trained operator ki
        hoti hai jo physical equipment ke paas hai for high-consequence operations.
      </p>

      <Figure caption="Fig 7 — BMS monitoring zone (read-only) versus control zone (requires authorization and interlocks) with life-safety boundary.">
        <BmsMonitoringVsControl />
      </Figure>
    </>
  );
}
