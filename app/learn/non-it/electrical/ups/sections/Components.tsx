"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Components.tsx
//
// Section 8: Core Components (Rectifier, Inverter, Static Switch, Battery Charger), Section 9: UPS Types (Offline, Line Interactive, Online, Delta, Modular)
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import RectifierDiagram from "../svg/RectifierDiagram";
import InverterDiagram from "../svg/InverterDiagram";
import StaticSwitchDiagram from "../svg/StaticSwitchDiagram";
import OfflineUpsDiagram from "../svg/OfflineUpsDiagram";
import OnlineUpsDiagram from "../svg/OnlineUpsDiagram";

export default function Components() {
  return (
    <>
        <h2 id="components" style={S.h2}>Core Components Overview</h2>

        <p style={S.p}>
          Ek UPS system mein 8 major components hote hain. Aage ke sub-sections mein hum sabse important
          chaaron — Rectifier, Inverter, Static Switch, aur Battery Charger — ko deeply explain karenge.
        </p>

        <ComparisonTable
          headers={["Component", "Function", "Failure Impact"]}
          rows={[
            ["Rectifier", "AC → DC conversion + battery charging", "No DC bus power — UPS runs only on existing battery charge"],
            ["Inverter", "DC → AC conversion for clean output", "Triggers static switch bypass — load on raw mains"],
            ["Static Switch", "Sub-4ms transfer between inverter and bypass", "Loss of automatic fault protection"],
            ["Battery Charger", "Maintains battery at float voltage", "Battery undercharges, reduced backup time"],
            ["Battery", "Stores DC energy for backup", "Zero backup time on grid failure"],
            ["Controller", "Microprocessor logic, monitoring, protection", "Loss of intelligent control, manual operation only"],
            ["Cooling Fans", "Thermal management of power electronics", "Overheating, automatic shutdown to protect components"],
            ["Capacitors (DC Link)", "Smooth DC bus ripple, filter noise", "Increased harmonics, voltage instability"],
          ]}
        />

        <h3 id="rectifier" style={S.h3}>Rectifier</h3>

        <p style={S.p}>
          Rectifier UPS ka "entry gate" hai. Yeh incoming AC supply ko DC mein convert karta hai using
          power electronics (typically IGBT-based PWM rectifiers in modern UPS, pehle thyristor-based
          hote the).
        </p>

        <Figure caption="Fig 3 — Rectifier converting 3-phase AC input to regulated DC output">
          <RectifierDiagram />
        </Figure>

        <p style={S.p}>
          Purane UPS mein <strong>SCR (Thyristor) based rectifiers</strong> hote the jo bulky transformers
          use karte the aur input power factor poor hota tha (0.7-0.8). Modern UPS{" "}
          <strong>IGBT-based PWM rectifiers</strong> use karte hain jo near-unity power factor (0.99)
          dete hain aur transformerless design allow karte hain — chhota footprint, better efficiency.
        </p>

        <h3 id="inverter" style={S.h3}>Inverter</h3>

        <p style={S.p}>
          Inverter rectifier ka opposite kaam karta hai — DC bus se power leke usse clean, regulated,
          pure sine wave AC mein convert karta hai jo seedha load ko jaata hai.
        </p>

        <Figure caption="Fig 4 — Inverter converting DC bus voltage to clean sine wave AC output">
          <InverterDiagram />
        </Figure>

        <h3 id="static-switch" style={S.h3}>Static Switch</h3>

        <p style={S.p}>
          Static Switch UPS ka "safety valve" hai. Yeh continuously monitor karta hai inverter output
          aur bypass (raw mains) source dono ko. Agar inverter mein koi fault aaye, overload ho, ya
          maintenance ki zaroorat ho — static switch <strong>sub-4 millisecond</strong> mein load ko
          bypass pe shift kar deta hai using thyristors (SCRs) — koi mechanical moving part nahi, isliye
          itna fast.
        </p>

        <Figure caption="Fig 5 — Static Switch logic between inverter output and bypass source">
          <StaticSwitchDiagram />
        </Figure>

        <Callout type="danger" title="Danger — Static Switch ≠ Isolation">
          Static switch fault transfer ke liye hai, electrical isolation ke liye nahi. Maintenance se
          pehle hamesha <strong>Maintenance Bypass</strong> use karo (Section 28) jo proper mechanical
          isolation deta hai. Static switch pe kaam karte waqt LOTO (Lock Out Tag Out) procedure follow
          karna mandatory hai.
        </Callout>

        <h3 id="battery-charger" style={S.h3}>Battery Charger</h3>

        <p style={S.p}>
          Battery Charger ek dedicated circuit hai (kabhi rectifier ka hi part, kabhi separate) jo
          battery ko <strong>float voltage</strong> pe maintain karta hai jab grid available ho. Yeh
          ensure karta hai ki battery hamesha full charge state mein rahe, ready for next outage.
        </p>

        <ComparisonTable
          headers={["Charging Stage", "Voltage Behavior", "Purpose"]}
          rows={[
            ["Boost/Bulk Charge", "Higher voltage, high current", "Fast recharge after a discharge event"],
            ["Absorption", "Constant voltage, tapering current", "Top off battery without overcharging"],
            ["Float Charge", "Steady ~2.27V/cell (VRLA)", "Maintain full charge indefinitely, compensate self-discharge"],
            ["Equalize Charge (flooded only)", "Slightly higher voltage, periodic", "Balance individual cell voltages in a string"],
          ]}
        />

        <Callout type="maintenance" title="Maintenance Tip">
          Float voltage drift battery life ko seriously affect karta hai. Bahut high float voltage se
          battery dry-out hoti hai (VRLA mein), bahut low se sulfation. Quarterly float voltage
          verification ek non-negotiable maintenance task honi chahiye.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 — UPS TYPES OVERVIEW
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-types" style={S.h2}>UPS Types Overview</h2>

        <p style={S.p}>
          UPS ki 5 major categories hain, har ek apne specific use-case ke liye optimized: Offline,
          Line Interactive, Online Double Conversion, Delta Conversion, aur Modular. Data Center mein{" "}
          <strong>Online Double Conversion almost universal standard</strong> hai — baaki types
          aage detail mein samjhenge.
        </p>

        <ComparisonTable
          headers={["Type", "Transfer Time", "Output Quality", "Efficiency", "Typical Use"]}
          rows={[
            ["Offline (Standby)", "2–10 ms", "Raw mains (with surge protection)", "~98%", "Home PC, small office"],
            ["Line Interactive", "2–4 ms", "Stabilized via AVR", "~97%", "Small server room, branch office"],
            ["Online Double Conversion", "0 ms (continuous)", "Always clean, regulated", "94–96% (99% Eco mode)", "Data Center, hospital, critical infra"],
            ["Delta Conversion", "0 ms (continuous)", "Always clean, regulated", "Up to 97%", "Large Data Center, high-power installs"],
            ["Modular UPS", "0 ms (continuous)", "Always clean, regulated", "94–97%", "Scalable Data Center, N+1 built-in"],
          ]}
        />

        <h3 id="offline-ups" style={S.h3}>Offline (Standby) UPS</h3>

        <p style={S.p}>
          Offline UPS normally load ko <strong>directly mains se</strong> connect rakhta hai — battery
          aur inverter standby mein rehte hain. Jab grid fail hoti hai, ek transfer switch milliseconds
          mein load ko inverter pe switch kar deta hai.
        </p>

        <Figure caption="Fig 6 — Offline UPS: load normally on mains, switches to inverter on failure">
          <OfflineUpsDiagram />
        </Figure>

        <p style={S.p}>
          <strong>Advantages:</strong> Sabse cheap, sabse high efficiency (battery/inverter mostly idle).{" "}
          <strong>Disadvantages:</strong> Transfer gap (2-10ms) sensitive equipment ko affect kar sakta
          hai; no voltage regulation during normal operation. Data Center mein yeh{" "}
          <strong>kabhi use nahi hota</strong> — sirf small office/home setups ke liye suitable hai.
        </p>

        <h3 id="line-interactive-ups" style={S.h3}>Line Interactive UPS</h3>

        <p style={S.p}>
          Line Interactive UPS offline ka upgraded version hai — isme ek <strong>AVR (Automatic Voltage
          Regulator)</strong> hota hai jo minor voltage fluctuations ko inverter activate kiye bina hi
          correct kar deta hai, battery life better preserve hoti hai.
        </p>

        <ComparisonTable
          headers={["Feature", "Offline UPS", "Line Interactive UPS"]}
          rows={[
            ["Voltage regulation", "None — direct passthrough", "AVR corrects minor sags/surges"],
            ["Battery usage", "Only on full failure", "Only on failure (AVR handles minor issues)"],
            ["Cost", "Lowest", "Slightly higher"],
            ["Typical rating", "< 2 kVA", "1–5 kVA"],
            ["Data Center suitable?", "No", "No (small branch office only)"],
          ]}
        />

        <h3 id="online-double-conversion" style={S.h3}>Online Double Conversion UPS</h3>

        <p style={S.p}>
          Yeh hai <strong>Data Center ka standard</strong>. Naam khud explain karta hai working — power
          do baar convert hota hai: AC → DC (rectifier) → AC (inverter). Load <em>hamesha</em> inverter
          se power leta hai, kabhi direct mains se nahi (normal operation mein) — isliye{" "}
          <strong>zero transfer time</strong>, grid fail ho ya na ho, load ko farak nahi padta.
        </p>

        <Figure caption="Fig 7 — Online Double Conversion: load always powered by inverter, grid only charges battery">
          <OnlineUpsDiagram />
        </Figure>

        <Callout type="best-practice" title="Best Practice — Data Center Standard">
          Online Double Conversion (IEC 62040 classification: <strong>VFI — Voltage and Frequency
          Independent</strong>) industry standard hai kyunki yeh output ko input se completely isolate
          karta hai — koi voltage sag, surge, frequency variation, ya harmonics load tak nahi pohonchte.
        </Callout>

        <h3 id="delta-conversion" style={S.h3}>Delta Conversion UPS</h3>

        <p style={S.p}>
          Delta Conversion ek advanced variant hai jo bahut bade UPS (typically &gt;300kVA) mein use
          hota hai. Isme ek additional "delta converter" hota hai jo rectifier ke parallel kaam karta
          hai — yeh higher efficiency (up to 97%) deta hai bina output quality compromise kiye.
        </p>

        <ComparisonTable
          headers={["Aspect", "Double Conversion", "Delta Conversion"]}
          rows={[
            ["Efficiency", "94–96%", "Up to 97%"],
            ["Input current harmonics", "Low", "Very Low"],
            ["Typical rating range", "10 kVA – 800 kVA", "300 kVA – 1.6 MVA"],
            ["Complexity", "Standard", "Higher (additional converter stage)"],
            ["Output quality", "VFI grade", "VFI grade"],
          ]}
        />

        <h3 id="modular-ups" style={S.h3}>Modular UPS</h3>

        <p style={S.p}>
          Modular UPS ek "building block" design hai — multiple power modules (typically 25-50 kVA each)
          ek frame mein parallel kaam karte hain. Capacity badhani ho toh sirf naya module add karo,
          poora system replace nahi karna padta.
        </p>

        <ComparisonTable
          headers={["Benefit", "Why It Matters"]}
          rows={[
            ["Hot-swappable modules", "Faulty module replace karo bina poora UPS shutdown kiye"],
            ["Built-in N+1", "Ek extra module automatically redundancy deta hai"],
            ["Scalability", "Load badhne pe modules add karo, capex phase-wise spread hota hai"],
            ["Smaller footprint per kVA", "Same room mein zyada capacity fit ho jaati hai"],
          ]}
        />

        <Callout type="interview" title="Interview Tip">
          Agar poocha jaaye "Modular UPS traditional UPS se better kyun hai for Data Centers?" — key
          points: <em>hot-swappable maintenance without downtime, built-in N+1 redundancy by design,
          aur incremental capex scaling jo CFOs ko bhi pasand aata hai.</em>
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 — CAPACITY SELECTION (VA/kVA/kW/PF)
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
