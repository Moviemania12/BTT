"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import UpsToBmsIntegration from "../svg/UpsToBmsIntegration";

export default function UpsIntegration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12 — UPS TO BMS INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="ups-integration" style={S.h2}>How to Integrate a UPS with BMS — Step by Step</h2>

      <p style={S.p}>
        UPS integration BMS engineers ke liye ek bread-and-butter task hai. Agar ek baar ye process
        properly samajh lo — Modbus register map kaise read karna hai, BMS mein device kaise add
        karna hai, point mapping aur scaling kaise configure karna hai — to ye skill almost every
        equipment integration pe apply hoti hai.
      </p>

      <Figure caption="Fig 3 — Complete UPS-to-BMS integration workflow from OEM documentation through commissioning.">
        <UpsToBmsIntegration />
      </Figure>

      <h3 style={S.h3}>Step 1 — Identify UPS Make, Model and Communication Interface</h3>
      <p style={S.p}>
        Pehle UPS ka make, model number aur firmware version note karo. Different models same vendor
        ke bhi different register maps aur communication capabilities have karte hain — aur kuch UPS
        mein communication protocol separate optional card (Modbus card, SNMP card, BACnet card) ke
        through available hota hai jo installed hona chahiye. UPS front panel ya nameplate se model confirm
        karo. Communication interface identify karo — RS-485 serial port (Modbus RTU), Ethernet port
        (Modbus TCP ya BACnet/IP), SNMP network card, ya other interface ho sakta hai. Kuch UPS mein
        multiple interfaces hoti hain — BMS ke liye appropriate one select karo.
      </p>

      <Callout type="important" title="Three Separate Questions — Data Available, Exposed, and Integrated">
        BMS integration mein teen alag questions hain. Pehla: equipment kaunsa data measure ya calculate
        karta hai internally? Doosra: OEM communication interface (register map, BACnet object list, SNMP
        MIB) mein kaunsa subset expose kiya gaya hai? Teesra: BMS project mein actually kaunsa points
        configured aur integrated hain? Ye teeno automatically same nahi hote. Ek UPS internally 50+
        parameters track kar sakta hai — lekin register map mein sirf 20 expose ho — aur BMS project
        mein actually 10 configure kiye gaye ho. Always verify from OEM documentation what is actually
        available via the specific communication interface.
      </Callout>

      <h3 style={S.h3}>Step 2 — Obtain OEM Documentation</h3>
      <p style={S.p}>
        Ye sabse important step hai. Bina OEM documentation ke blind guessing hai — wrong register
        read karne se wrong values ya even equipment command issues ho sakte hain. Required documents:
      </p>
      <ul style={S.ul}>
        <li><strong>Modbus register map</strong> — agar Modbus use ho raha hai. Register address (1-based ya 0-based clearly noted), register type (HR/IR/Coil/DI), data type (UINT16, INT16, FLOAT32), scaling formula, units.</li>
        <li><strong>BACnet object list</strong> — agar BACnet use ho raha hai. Device ID, all object types and instance numbers, Present_Value units, writable properties.</li>
        <li><strong>SNMP MIB file</strong> — agar SNMP use ho raha hai. OID tree, data types, accessible OIDs.</li>
        <li><strong>Communication manual</strong> — physical connection, baud rate, parity, default settings.</li>
        <li><strong>OEM monitoring software</strong> (if available) — for cross-checking values.</li>
      </ul>

      <Callout type="important" title="Register Map Version Matters">
        UPS firmware update pe register map change ho sakta hai. Hamesha documentation ki version
        confirm karo jo installed firmware ke saath match kare. Purani register map se integration
        karne pe kuch points correctly map nahi honge. Agar mismatch lagta hai, vendor se latest
        firmware-specific documentation maango.
      </Callout>

      <h3 style={S.h3}>Step 3 — Configure Physical Communication</h3>
      <p style={S.p}>
        <strong>RS-485 (Modbus RTU):</strong> UPS RS-485 port pe connect karo — A aur B wires polarity
        verify karo (A = positive, B = negative in most conventions, lekin OEM manual confirm karo).
        Shield/ground wire ke liye OEM guidance follow karo. Termination resistor (typically 120 ohm)
        bus ke dono ends pe — agar UPS bus end pe hai to resistor enable karo (internal DIP switch ya
        jumper). Baud rate, parity, stop bits aur slave ID UPS front panel ya web interface se set
        karo. BMS controller same settings configure karo.
      </p>
      <p style={S.p}>
        <strong>Ethernet (Modbus TCP ya BACnet/IP):</strong> UPS network interface ko IP address assign
        karo — static IP preferred BMS integration ke liye (DHCP se IP change ho sakta hai). IP address,
        subnet mask, default gateway set karo. Connectivity ping se verify karo. Firewall/VLAN rules
        confirm karo — BMS server se UPS IP aur required port reachable hai.
      </p>

      <h3 style={S.h3}>Step 4 — Configure BMS Driver and Device</h3>
      <p style={S.p}>
        BMS software mein ek new device add karo. Protocol select karo (Modbus RTU, Modbus TCP,
        BACnet/IP, SNMP). Connection parameters enter karo — IP address aur port (Modbus TCP ke liye),
        ya COM port aur baud/parity/slave ID (RTU ke liye), ya community string aur OIDs (SNMP ke
        liye). Device name give karo jo identify karo — e.g., "UPS-ROOM-A-APC-250kVA". Save karo aur
        device online aa raha hai verify karo — BMS typically green/gray/red indicator show karta hai
        device communication status ke liye.
      </p>

      <h3 style={S.h3}>Step 5 — Discover or Manually Create Points</h3>
      <p style={S.p}>
        BACnet devices often auto-discover ho sakte hain — BMS Who-Is broadcast bhejta hai aur BACnet
        devices respond karte hain with I-Am. Object list automatically imported ho sakta hai. Modbus
        aur SNMP mein auto-discovery typically nahi hoti — points manually create karne padte hain.
        OEM register map se each point ke liye: register address, register type, function code, data
        type, scaling, engineering unit — ye sab enter karo. Ek shortcut: kuch BMS platforms Modbus
        device configuration file (CSV/XML) import support karte hain — time save hota hai.
      </p>

      <h3 style={S.h3}>Step 6 — Map and Bind Points</h3>
      <p style={S.p}>
        Har BMS point ko physical address se link karo. Modbus mein: device → function code → register
        address → data type. BACnet mein: device → object type → instance → property (typically
        Present_Value). SNMP mein: device → OID. Tag name point ko identify karta hai — naming
        convention follow karo: e.g., "UPS-A1.Output_Load_Pct", "UPS-A1.Battery_Voltage",
        "UPS-A1.Bypass_Status". Consistent naming future maintenance simplify karta hai.
      </p>

      <h3 style={S.h3}>Step 7 — Configure Scaling, Data Types and Engineering Units</h3>
      <p style={S.p}>
        OEM documentation se scaling formula read karo. Enter it in BMS point configuration. Data type
        must match OEM specification — UINT16 for most 0-based values, INT16 for signed (e.g.,
        temperature can be negative), FLOAT32 for floating point (2 registers, verify byte order).
        Engineering unit configure karo — %, V, A, Hz, kW, min, °C. Agar unit wrong configure hua
        to operator confusion aur alarm thresholds wrong honge.
      </p>

      <Callout type="best-practice" title="Verify Scaling Before Alarming">
        Alarm limits configure karne se pehle verify karo ki scaled values correct hain — UPS local
        display se cross-check karo. Agar BMS 72.4% load dikhata hai aur UPS display 72% dikhata hai
        to scaling approximately correct hai. Agar BMS 7240 show kar raha hai — scaling factor missing
        hai. Fix first, then configure alarms and trends.
      </Callout>

      <h3 style={S.h3}>Step 8 — Create HMI Graphics</h3>
      <p style={S.p}>
        UPS ke liye ek dedicated HMI page banana — single line diagram style mein ideal hai. Input →
        UPS block → Output, battery level indicator, key parameters (load%, output V, battery SOC,
        mode). Color coding: normal (green), warning (amber), critical (red). Har displayed value ko
        correct BMS tag se bind karo — binding correct hona verify karo by checking that value changes
        on screen when UPS condition changes.
      </p>

      <h3 style={S.h3}>Step 9 — Configure Alarms</h3>
      <p style={S.p}>
        Per project policy, relevant alarm points configure karo. Common UPS alarms in BMS:
      </p>
      <ul style={S.ul}>
        <li><strong>UPS Common Alarm</strong> — single digital input, priority per project. Acknowledge required.</li>
        <li><strong>UPS Critical Alarm</strong> — if exposed separately, highest priority.</li>
        <li><strong>Output Load % High</strong> — analog alarm, threshold per project (e.g., 80% warning, 95% critical). Add 2-3% deadband.</li>
        <li><strong>Battery SOC Low</strong> — warn when battery below x% SOC. Threshold project-specific.</li>
        <li><strong>Battery Runtime Low</strong> — warn when estimated runtime below threshold.</li>
        <li><strong>Operating Mode — Bypass</strong> — digital alarm agar UPS bypass mode mein jaaye.</li>
        <li><strong>Communication Failure</strong> — auto-generated when BMS loses comms with UPS.</li>
      </ul>
      <p style={S.p}>
        Delay/debounce configure karo where appropriate — transient spikes pe alarm na ho. Alarm
        message meaningful raho — "UPS-A1 Output Load High — 92.3 %" vs generic "Analog High Alarm".
      </p>

      <h3 style={S.h3}>Step 10 — Configure Trends</h3>
      <p style={S.p}>
        Key UPS points trend log karo: output load %, output voltage per phase, battery SOC, battery
        temperature (agar available). Log interval select karo — every 1–5 minutes for load monitoring,
        longer intervals for stable parameters like battery voltage at rest. Historian retention period
        per project policy.
      </p>

      <h3 style={S.h3}>Step 11 — Point-to-Point Testing and Commissioning</h3>
      <p style={S.p}>
        Har point ko individually test karo. UPS local display se BMS value compare karo. Load % —
        do values match? Bypass status — agar bypass point test karna ho to ye planned, authorized test
        hona chahiye per site SOP/MOP/EOP, OEM procedure, risk assessment aur supervision ke saath —
        casually bypass operate karna safe nahi hai; coordinate karo with site operations team. Alarm —
        UPS pe test alarm function use karo (agar OEM test mode available hai) ya dry contact simulate
        karo; actual fault conditions induce karna avoid karo without proper planning. Trend — data logger
        mein kuch readings verify karo. Document all tests — commissioning sign-off sheet mein each point
        ka result likho (UPS source value, BMS displayed value, pass/fail).
      </p>

      <ComparisonTable
        title="Typical UPS Points for BMS Integration (Verify with OEM Register Map)"
        headers={["Point Name", "Type", "Source", "Typical Engineering Unit", "Common Use"]}
        rows={[
          ["Input Voltage L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "V AC", "Grid supply monitoring"],
          ["Input Current L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "A", "Load current monitoring"],
          ["Input Frequency", "Analog", "Modbus IR/HR", "Hz", "Grid frequency alarm"],
          ["Output Voltage L1/L2/L3", "Analog", "Modbus IR/HR or BACnet AI", "V AC", "Output quality"],
          ["Output Current L1/L2/L3", "Analog", "Modbus IR/HR", "A", "Load monitoring"],
          ["Output Load %", "Analog", "Modbus IR/HR", "%", "Capacity alarm threshold"],
          ["Output Frequency", "Analog", "Modbus IR/HR", "Hz", "Output frequency check"],
          ["Battery Voltage", "Analog", "Modbus IR/HR", "V DC", "Battery health"],
          ["Battery SOC / Capacity %", "Analog", "Modbus IR/HR or SNMP OID", "%", "Low battery alarm"],
          ["Battery Runtime Remaining", "Analog", "Modbus IR/HR or SNMP OID", "min", "Run time alarm"],
          ["Battery Temperature", "Analog", "Modbus IR/HR", "°C", "Thermal management"],
          ["UPS Operating Mode", "Analog/Digital", "Modbus HR or BACnet AV", "Enum", "Normal/Bypass/Battery"],
          ["Bypass Status", "Digital", "Modbus Coil/DI or BACnet BI", "On/Off", "Alarm when on bypass"],
          ["Common Alarm", "Digital", "Dry contact or Modbus DI", "Active/Normal", "General alarm catch-all"],
          ["Critical Alarm", "Digital", "Dry contact or Modbus DI", "Active/Normal", "Highest priority alarm"],
        ]}
        caption="Actual point names, register addresses and object instances are UPS-specific. Always verify with OEM documentation. Never assume register addresses from another model."
      />

      <Callout type="maintenance" title="UPS Integration — Ongoing Maintenance">
        UPS firmware update ke baad integration test karo — register map ya BACnet object list change
        ho sakta hai. Annual preventive maintenance mein BMS-UPS integration verify karo: sab points
        correct values show kar rahe hain, alarms functional hain, trends logging ho rahi hai.
      </Callout>
    </>
  );
}
