"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import BmsPointMappingBinding from "../svg/BmsPointMappingBinding";

export default function DataFlow() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — DATA FLOW
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="data-flow" style={S.h2}>Data Flow — From Equipment to HMI</h2>

      <p style={S.p}>
        Ye section BMS ka sabse important technical concept cover karta hai — ek single data value
        kaise physical equipment se operator screen tak pahunchta hai. Har step mein configuration
        zaroori hai, aur har step mein failure possible hai. Is chain ko samajhne se troubleshooting
        dramatically faster hoti hai.
      </p>

      <h3 style={S.h3}>The Complete Data Chain</h3>
      <p style={S.p}>
        Chain is order mein hai: <strong>Physical equipment</strong> (UPS inverter output) →{" "}
        <strong>Sensor / Equipment controller</strong> (UPS onboard measurement, exposed via
        Modbus port) → <strong>Communication interface</strong> (RS-485 cable ya Ethernet) →{" "}
        <strong>Gateway</strong> (agar protocol conversion zaroori ho) → <strong>BMS
        controller / integration server</strong> (polls the device) → <strong>BMS server
        database</strong> (stores timestamped value) → <strong>Point / Tag</strong> (named
        reference in BMS, with scaling applied) → <strong>HMI graphic</strong> (binds to tag,
        displays value) → <strong>Alarm / Trend / Report</strong> (generated from tag value
        vs configured limits).
      </p>

      <h3 style={S.h3}>Data Point, Tag and Object — What These Mean</h3>
      <p style={S.p}>
        <strong>Data point</strong> (ya simply "point") ek BMS mein ek single monitored ya controlled
        value hai — jaise "UPS-1 Output Load %". Point ek named entity hai with attributes: current
        value, engineering unit, alarm limits, trend configuration, data quality.{" "}
        <strong>Tag</strong> essentially same concept hai — ek string identifier jo point ko reference
        karta hai. Different BMS platforms different terminology use karte hain: Schneider EcoStruxure
        mein "Variable", Siemens Desigo mein "Data Point", Metasys mein "Point".{" "}
        <strong>Object</strong> BACnet-specific term hai — ek BACnet device mein Analog Input, Binary
        Output, Schedule, Trend Log, etc. objects exist karte hain, each with properties.
      </p>

      <h3 style={S.h3}>Register, Object Instance and Device Address</h3>
      <p style={S.p}>
        <strong>Modbus register:</strong> Ek 16-bit memory location hai equipment ke controller mein
        jo ek specific value hold karta hai. Function code specify karta hai kis type ka register read
        karna hai. Holding Registers (FC 03) read/write hote hain; Input Registers (FC 04) read-only.
        Address ek numeric offset hai (0-based internally, often 1-based in OEM docs — ye confusion
        source hai).
      </p>
      <p style={S.p}>
        <strong>BACnet Object Instance:</strong> Har BACnet object ko ek type aur instance number hota
        hai — "Analog Input, Instance 5" (often written AI 5). Ek device mein multiple AI objects ho
        sakte hain, each with unique instance. <strong>Device ID</strong> BACnet device ka unique
        identifier hai network pe — ek large installation mein ye unique hona chahiye. <strong>SNMP
        OID</strong> ek dotted-number path hai jo specific MIB leaf node identify karta hai —
        e.g., .1.3.6.1.4.1.9999.1.3.0 ek UPS vendor-specific OID ho sakta hai.
      </p>

      <h3 style={S.h3}>Point Mapping and Point Binding</h3>
      <p style={S.p}>
        <strong>Point mapping</strong> wo process hai jisme BMS mein ek tag ko physical address
        (Modbus register, BACnet object, SNMP OID) se link kiya jaata hai. Ye configuration step
        hai — BMS database mein specify karo ki "UPS-1.Output_Load_Pct" ka data source kahan se
        aayega. <strong>Point binding</strong> ya <strong>data binding</strong> HMI graphic mein wo
        step hai jisme graphic element (ek text field, progress bar, color indicator) specific BMS
        tag se linked kiya jaata hai. Jab tag value update hoti hai, graphic automatically update
        hoti hai.
      </p>

      <Callout type="important" title="Mapping vs Binding — Two Different Steps">
        Mapping = backend mein point ke liye data source configure karo (address, register, protocol).
        Binding = frontend mein HMI graphic element ko wo point se link karo. Dono steps correct
        hone chahiye. Common mistake: mapping correct hai, live value backend mein aa rahi hai —
        lekin graphic mein wrong point bound hai ya binding hi missing hai. Troubleshoot karte time
        in dono ko separately verify karo.
      </Callout>

      <h3 style={S.h3}>Scaling, Engineering Units and Data Types</h3>
      <p style={S.p}>
        Raw value jo equipment transmit karta hai wo typically engineering unit mein nahi hoti.
        Modbus register ek 16-bit integer transmit karta hai — e.g., 7245. BMS ko pata hona chahiye
        ki ye integer kaise interpret karna hai. OEM documentation mein scaling formula hoti hai —
        jaise: <em>Output_Load_Pct = register_value × 0.1</em>, ya <em>Output_Voltage_V =
        register_value / 10.0</em>.
      </p>
      <p style={S.p}>
        Data type bhi important hai. UINT16 (unsigned 16-bit, 0–65535), INT16 (signed, −32768 to
        +32767), UINT32 (32-bit unsigned, 2 registers), FLOAT32 (IEEE 754 float, 2 registers) — sab
        different decoding require karte hain. 32-bit values mein byte/word order (endianness) matter
        karta hai — Big Endian ya Little Endian. Wrong byte order pe value completely wrong aayegi
        (reversed bits). Engineering unit BMS mein configure hoti hai — %, V, A, Hz, kW, °C, etc. —
        so display, alarm limits aur reports correct unit mein hote hain.
      </p>

      <h3 style={S.h3}>Polling, COV and Communication Timeouts</h3>
      <p style={S.p}>
        <strong>Polling</strong> mein BMS har configured interval pe device se value read karta hai.
        Fast-changing values (load %) ke liye shorter interval preferred hota hai; slowly-changing
        values (room temperature) ke liye longer interval sufficient hoti hai. Actual interval controller
        scan capability, network load, point count aur project requirements pe depend karta hai — koi
        universal standard interval nahi hai. Ye network load aur controller capacity affect karta hai.
      </p>
      <p style={S.p}>
        <strong>COV (Change of Value)</strong> BACnet feature hai. BMS ek COV subscription register
        karta hai — device BMS ko notify karta hai jab Present_Value configured increment (COV
        Increment) se change ho. Efficient hai bandwidth ke liye — interval-based polling se better
        response time bhi de sakta hai. <strong>Communication timeout</strong> configure karta hai
        kitni der tak response na aane pe BMS point ko "Communication Failure" ya "Bad" quality mark
        kare. Timeout value BMS driver, controller type aur project requirement ke hisaab se configure hoti hai — koi universal mandatory value nahi hai.
      </p>

      <h3 style={S.h3}>Data Quality and Status Flags</h3>
      <p style={S.p}>
        Har BMS point ko ek quality status hoti hai. <strong>Good</strong> — value reliable aur current.
        <strong>Bad</strong> — communication failure ya device offline. <strong>Uncertain</strong> —
        value available hai lekin reliability questionable (e.g., sensor fault flag set). <strong>Stale</strong> —
        value update nahi hui expected interval mein. <strong>Override</strong> — value manually forced
        in BMS (actual equipment se nahi aa rahi). HMI mein data quality color code se indicate hoti
        hai — green (good), red (bad), amber (uncertain). Alarm pe bhi data quality relevant hai —
        "Bad" quality pe alarm suppress ya separately alarmed?
      </p>

      <h3 style={S.h3}>Alarm Limits, Deadbands and Hysteresis</h3>
      <p style={S.p}>
        Alarm limits BMS mein per-point configure hote hain. High-High, High, Low, Low-Low — multiple
        levels possible hain. Deadband (ya hysteresis) ek band hai jo alarm toggling prevent karta hai
        — agar High alarm limit 90% pe set hai aur value 90.1% pe aai, alarm triggers. Agar deadband
        2% hai to alarm tab clear hoga jab value 88% se neeche aaye — 90% pe clear nahi hoga. Ye
        "flicker" ya "chattering" prevent karta hai jab value limit ke aas paas oscillate kare.
      </p>

      <h3 style={S.h3}>Trend Logging — What Gets Stored and How</h3>
      <p style={S.p}>
        Trend logging ek point ka time-series history store karta hai. Configuration mein: log interval
        (e.g., every 5 minutes), trigger type (interval ya COV), max records, circular buffer behavior
        (oldest overwrite). Data historian mein store hota hai — compressed format mein, tagged with
        timestamp aur quality. Long-term historian allows years of data query — root cause analysis ke
        liye, capacity planning ke liye, compliance reporting ke liye. BACnet Trend Log object
        controller-side logging karta hai — network interruption pe bhi data preserve hoti hai.
      </p>

      <h3 style={S.h3}>Historian and Data Retention</h3>
      <p style={S.p}>
        Historian dedicated database hai jo BMS point values time-series format mein store karta hai.
        OSIsoft PI (now AVEVA PI), InfluxDB, SQL Server, ya proprietary BMS databases use ho sakte
        hain. Retention period — kitne time tak data rakhna hai — project requirements, client contracts
        aur regulatory requirements pe depend karta hai. There is no universal mandatory retention
        period. Storage capacity plan karo point count, logging interval aur retention period ke
        hisaab se.
      </p>

      <Figure caption="Fig 5 — BMS point mapping and data binding flow — from physical Modbus register and BACnet object to tag, scaling, alarm limits and trend log.">
        <BmsPointMappingBinding />
      </Figure>
    </>
  );
}
