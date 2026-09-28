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
        To understand the points available in the BMS, distinguish three layers: (1) <strong>What the equipment measures internally</strong> — onboard measurements. (2) <strong>What the OEM communication interface exposes</strong> — points listed in the Modbus register map, BACnet object list, SNMP MIB. (3) <strong>What has actually been integrated in the BMS project</strong> — configured, mapped and commissioned points. These three are not automatically the same. Below are commonly monitored parameters — confirm actual availability from the OEM interface, communication card, firmware version and project specification.
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
        <strong>PAC/CRAC units:</strong> Supply air temperature, return air temperature, fan status, compressor status (if exposed), filter differential pressure alarm, cooling mode, setpoint, capacity % — via BACnet or Modbus from unit controller. <strong>Chiller plant:</strong> Chiller on/off, chilled water supply/return temperature, chiller kW, COP where calculated, compressor status, fault alarm — via Modbus/BACnet from chiller controller. <strong>Cooling towers:</strong> Fan status, sump level, temperature, VFD speed. <strong>Pumps:</strong> Running status, fault, differential pressure, flow (where sensors present), VFD status. <strong>Valves:</strong> Position feedback (open/closed or 0–100%), command (where commandable).
      </p>

      <h3 style={S.h3}>Environmental Monitoring</h3>
      <p style={S.p}>
        Temperature and humidity sensors at the cold aisle, hot aisle, return air, server inlet height. Differential pressure — at the raised floor plenum, or across air containment. Water leak detection sensors — under the raised floor, near precision cooling units, mechanical rooms. Fuel/tank level — float sensor or level transmitter where installed. Air quality sensors — some facilities for CO2, particulate monitoring.
      </p>

      <h3 style={S.h3}>Integration with Fire Alarm, VESDA, Access Control and CCTV</h3>
      <p style={S.p}>
        The BMS can receive <em>selected status and alarm points</em> from these dedicated systems — for monitoring. The <TopicLink slug="vesda" variant="inline" /> fire detection system can send its Alert or Fire alarm state to the BMS through a dry contact or Modbus. Door status or camera fault from <TopicLink slug="access-control" variant="inline" /> and <TopicLink slug="cctv" variant="inline" /> can be received on the BMS.
      </p>

      <Callout type="danger" title="BMS Does Not Replace Life-Safety Systems">
        Fire alarm, VESDA, fire suppression and access control operate on their own dedicated controllers and logic. The BMS is not a replacement for these systems and must not be the primary life-safety control path. The BMS only gives visibility — the actual fire detection, alarm activation, suppression release and evacuation sequence are handled by the dedicated systems. This boundary is safety-critical and must be clearly defined in the project design.
      </Callout>

      <h3 style={S.h3}>Monitoring-Only vs Read/Write Points</h3>
      <p style={S.p}>
        The points listed above are mostly monitoring-only (read-only). Some points are read/write where the design specifically allows control — CRAC setpoint, chiller plant sequencing commands, AHU fan speed setpoint. The point access type depends on the OEM interface (FC 03 write or BACnet WriteProperty support) and project authorization.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11 — MONITORING VS CONTROL
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="monitoring-vs-control" style={S.h2}>Monitoring vs Control — A Critical Distinction</h2>

      <h3 style={S.h3}>Read-Only Monitoring Points</h3>
      <p style={S.p}>
        Majority of BMS points in a typical data center are read-only — UPS parameters, DG status, environmental sensors, energy meter readings. The BMS observes them and generates alarms/trends. The equipment stays unaffected in normal operation. This is the safest integration mode — the risk of issuing an accidental command is zero.
      </p>

      <h3 style={S.h3}>Commandable Points and Setpoints</h3>
      <p style={S.p}>
        Read/write points where the BMS can send a command: CRAC/CRAH supply air temperature setpoint change, AHU fan speed, chiller plant enable/disable, lighting relay. These capabilities must be specifically designed and authorized — not enabled by default. The OEM interface must also support write access.
      </p>

      <h3 style={S.h3}>Interlocks, Sequences and Automatic Control</h3>
      <p style={S.p}>
        The BMS can also run automatic sequences — such as chiller plant staging logic (if load increases past threshold, start second chiller), and economizer control. Interlocks ensure that conditions are safe before a command is issued — e.g., do not start the second chiller if coolant flow is low. Sequences can run locally on DDC controllers or centrally on the BMS server. Critical sequences are typically preferred on the local controller — they operate even on a network failure.
      </p>

      <h3 style={S.h3}>Manual Override</h3>
      <p style={S.p}>
        An authorized operator can set a manual override in the BMS — to supersede the automatic sequence. The override state must be clearly visible — highlight it on the HMI, generate an alarm if the override is active for too long. The override event must be recorded in the log with operator identity and timestamp.
      </p>

      <h3 style={S.h3}>When Remote Control Through BMS Is and Is Not Appropriate</h3>
      <p style={S.p}>
        Remote control is appropriate where it is specifically designed, risk-assessed and authorized — HVAC setpoints, lighting schedules, non-critical sequences. Remote control is NOT appropriate without proper design for: UPS bypass command, DG start/stop without interlocks, anything fire suppression, security system commands, ATS manual operation. The principle is that the BMS provides visibility and convenience — for high-consequence operations the final authority belongs to a trained operator who is near the physical equipment.
      </p>

      <Figure caption="Fig 7 — BMS monitoring zone (read-only) versus control zone (requires authorization and interlocks) with life-safety boundary.">
        <BmsMonitoringVsControl />
      </Figure>
    </>
  );
}
