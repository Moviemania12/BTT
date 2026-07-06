"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import StsInternalDiagram from "../svg/StsInternalDiagram";
import DualUpsStsArchitecture from "../svg/DualUpsStsArchitecture";
import StsTransferLogicDiagram from "../svg/StsTransferLogicDiagram";

export default function Foundation() {
  return (
    <>
      <h2 id="what-is-sts" style={S.h2}>What is a Static Transfer Switch?</h2>

      <p style={S.p}>
        Socho ek office mein ek printer hai — sirf ek power plug hai. Dual-corded nahi hai.
        Agar UPS-A fail ho jaaye, toh printer band ho jaayega. Koi bhi mechanical switch
        itni fast nahi switch karega ki printer ko pata na chale.
      </p>

      <p style={S.p}>
        Yahi problem <strong>Static Transfer Switch (STS)</strong> solve karta hai. STS ek
        solid-state switching device hai jo ek single-corded load ko do independent power
        sources ke beech <strong>2–4 milliseconds</strong> mein transfer kar deta hai —
        load ko pata hi nahi chalta ki source change hua.
      </p>

      <p style={S.p}>
        &quot;Static&quot; ka matlab hai koi moving parts nahi. Andar <strong>SCR (Silicon Controlled
        Rectifier) / Thyristors</strong> hote hain — pure semiconductor switching. Mechanical
        contactors ki tarah wears nahi hota, sparks nahi hote, bounce nahi hota.
      </p>

      <Callout type="important" title="STS ≠ ATS">
        Automatic Transfer Switch (ATS) mein mechanical contactors hote hain — transfer time
        100–500 milliseconds. IT equipment ke liye yeh bahut slow hai. STS mein SCR thyristors
        hote hain — transfer time 2–4 ms, IT load ke liye completely invisible.
      </Callout>

      <h2 id="why-sts-required" style={S.h2}>Why STS is Required</h2>

      <p style={S.p}>
        Modern Data Center mein dual-bus architecture use hoti hai —{" "}
        <TopicLink slug="ups" variant="inline" /> A aur UPS B dono independent paths dete hain.
        Dual-corded servers directly dono se connect hote hain — redundancy automatic hai.
      </p>

      <p style={S.p}>
        Problem tab aati hai jab equipment single-corded ho — sirf ek power input.
        Kuch legacy servers, specialized network gear, aur industrial equipment dual-corded
        PSU support nahi karte. Inke liye STS ek external dual-path protection provide karta hai.
      </p>

      <ComparisonTable
        headers={["Equipment Type", "Protection Method", "Failure Tolerance"]}
        rows={[
          ["Dual-corded server", "Direct dual-bus connection (PSU1 ← Path A, PSU2 ← Path B)", "One complete path loss — zero impact"],
          ["Single-corded server (with STS)", "STS handles path switching externally", "One path loss — STS transfers in 2–4 ms"],
          ["Single-corded server (no STS)", "Single path only", "Any path failure = server power loss"],
        ]}
      />

      <p style={S.p}>
        STS ka doosra use: kuch organizations mein ek high-power single-fed load hota hai
        (industrial chillers, large UPS bypass panels) jahan STS ek cost-effective redundancy
        solution hai compared to completely duplicating the equipment.
      </p>

      <h2 id="where-sts-installed" style={S.h2}>Where STS is Installed</h2>

      <p style={S.p}>
        STS power chain mein <TopicLink slug="ups" variant="inline" /> output ke baad aur
        load ke beech install hota hai. Typically:
      </p>

      <ul style={S.ul}>
        <li><strong>In the rack:</strong> 1U/2U rack-mount STS, directly above/below the single-corded device</li>
        <li><strong>In the row cabinet:</strong> Dedicated STS cabinet at the end of a server row, serving multiple single-corded devices</li>
        <li><strong>At PDU level:</strong> Large STS replacing dual PDU for a zone of single-corded equipment</li>
        <li><strong>At floor distribution:</strong> Very large STS (400A+) for complete floor zone protection</li>
      </ul>

      <p style={S.p}>
        Inputs: Source A (from <TopicLink slug="ups" variant="inline" />-A or PDU-A) aur
        Source B (from UPS-B ya PDU-B). Output: Single feed to load.
      </p>

      <h2 id="power-flow-architecture" style={S.h2}>Power Flow Architecture</h2>

      <Figure caption="Fig 1 — Dual UPS + STS Architecture: dual-corded equipment uses direct A/B paths; single-corded equipment uses STS for automatic switching between both UPS outputs">
        <DualUpsStsArchitecture />
      </Figure>

      <p style={S.p}>
        Power chain normal operation mein: UPS-A → PDU-A → STS Input A. UPS-B → PDU-B →
        STS Input B. STS preferred source (typically A) pe load serve karta hai.
      </p>

      <p style={S.p}>
        UPS-A fail hone par: STS detects Input A out-of-spec → verifies Input B ready →
        transfers load to Input B in 2–4 ms → load continues uninterrupted.
      </p>

      <Callout type="best-practice" title="Best Practice — STS Inputs Must Be Independent">
        STS ke dono inputs truly independent hone chahiye — alag UPS ya alag PDU se.
        Agar dono inputs same UPS se aayein toh STS redundancy meaningless ho jaati hai.
        Common-mode failure (single UPS failure) se dono inputs simultaneously fail ho
        jaayenge — STS help nahi kar payega.
      </Callout>

      <h2 id="internal-construction" style={S.h2}>Internal Construction</h2>

      <Figure caption="Fig 2 — STS Internal Block Diagram: SCR sets, voltage/frequency sensors, and control logic work together to achieve sub-4ms switching">
        <StsInternalDiagram />
      </Figure>

      <p style={S.p}>
        STS ke andar main components hain:
      </p>

      <ComparisonTable
        headers={["Component", "Function"]}
        rows={[
          ["SCR Set A (anti-parallel thyristors)", "Source A ka current carry karta hai jab A preferred hai"],
          ["SCR Set B (anti-parallel thyristors)", "Source B ka current carry karta hai jab B active hai"],
          ["Voltage/Frequency Sensors", "Both sources continuously monitor karte hain — threshold violations detect karte hain"],
          ["Control Logic Board", "Transfer decision leti hai, gate firing signals generate karti hai"],
          ["Gate Drive Circuits", "SCR gates ko appropriate firing pulses dete hain"],
          ["Heat Sinks / Cooling", "SCR power dissipation manage karta hai"],
          ["Communication Module", "SNMP/Modbus for monitoring and alarm reporting"],
          ["Maintenance Bypass Switch", "Manual isolation for STS servicing"],
        ]}
      />

      <h2 id="scr-thyristor-technology" style={S.h2}>SCR / Thyristor Technology</h2>

      <p style={S.p}>
        SCR (Silicon Controlled Rectifier) ek 4-layer semiconductor device hai — PNPN
        structure. Ek baar gate pulse mile aur anode-cathode voltage positive ho, SCR
        conduct karna shuru kar deta hai. Conduct karna band karna natural commutation
        se hota hai — AC cycle mein current zero cross karte waqt.
      </p>

      <p style={S.p}>
        STS mein anti-parallel SCR pairs use hote hain — do SCRs opposite directions mein
        connected, taki both positive aur negative AC half-cycles handle ho sakein.
        3-phase STS mein teen such pairs hote hain (one per phase).
      </p>

      <ComparisonTable
        headers={["Parameter", "SCR (STS)", "Mechanical Contactor (ATS)"]}
        rows={[
          ["Switching time", "Microseconds to milliseconds", "50–500 milliseconds"],
          ["Moving parts", "None — solid state", "Yes — mechanical contacts"],
          ["Arc during switching", "None", "Contact arc on break"],
          ["Wear mechanism", "None under normal operation", "Contact erosion over cycles"],
          ["Life expectancy", ">20 years typical", "Depends on operation count"],
          ["Heat generation", "Moderate (on-state resistance losses)", "Low (contact resistance)"],
          ["Parallel conduction possible?", "Yes — make-before-break", "No — brief open mandatory"],
        ]}
      />

      <Callout type="important" title="Anti-Parallel Configuration">
        Ek single SCR sirf ek direction mein conduct karta hai. AC load ke liye dono
        half-cycles carry karne hote hain. Isliye anti-parallel pair (back-to-back SCRs)
        use hoti hai — ek positive half ke liye, ek negative half ke liye. Yeh combined
        unit bidirectional AC switch banata hai.
      </Callout>

      <h2 id="static-switching-principle" style={S.h2}>Static Switching Principle</h2>

      <p style={S.p}>
        Normal operation mein SCR Set A gate pulses receive karta hai — continuously conduct
        karta hai, Source A ka current load tak deliver hota hai. SCR Set B ko gate pulses
        nahi milte — it blocks, Source B isolated rehta hai.
      </p>

      <p style={S.p}>
        Transfer ke time: Control logic SCR Set A ke gate pulses hatati hai. SCR A next
        current zero crossing pe naturally turn off ho jaata hai. Simultaneously (ya thodi
        der baad), SCR Set B ko gate pulses milne lagti hain. SCR B conduct karna shuru
        karta hai. Load current Source B se flow karne lagta hai.
      </p>

      <p style={S.p}>
        Total time: Source failure detection (1–2 ms) + zero crossing wait (0–8.3 ms at
        60Hz, 0–10 ms at 50Hz) + SCR B turn-on (microseconds). Net: typically 2–4 ms total.
      </p>

      <Callout type="interview" title="Interview Tip">
        Interview mein poochhte hain: &quot;STS 4ms mein transfer kyun karta hai, SCR toh
        microseconds mein switch hota hai?&quot; — Answer: Fault detection time + zero crossing
        wait (AC natural commutation) + control processing milake 2–4ms ban jaata hai.
        Pure SCR switching time negligible hai; detection aur commutation wait dominate karta hai.
      </Callout>

      <h2 id="transfer-logic" style={S.h2}>Transfer Logic</h2>

      <Figure caption="Fig 3 — STS Transfer Decision Flow: preferred source monitoring, synchronization check, and transfer mode selection">
        <StsTransferLogicDiagram />
      </Figure>

      <p style={S.p}>
        STS ki transfer logic ek decision tree follow karti hai:
      </p>

      <ol style={S.ol}>
        <li>Continuously monitor both sources: voltage (RMS), frequency, phase angle</li>
        <li>If preferred source is within spec → no action, continue serving load from preferred</li>
        <li>If preferred source goes out-of-spec → initiate transfer sequence</li>
        <li>Check if alternate source is within spec → if not, alarm but cannot transfer</li>
        <li>Check phase synchronization between sources → determines transfer mode</li>
        <li>Execute transfer (make-before-break if sync OK, else break-before-make)</li>
        <li>Monitor for preferred source restoration → optionally auto-retransfer (configurable)</li>
      </ol>

      <ComparisonTable
        headers={["Transfer Trigger", "Condition", "Action"]}
        rows={[
          ["Undervoltage", "Source voltage drops below threshold (typically 85–90% of nominal)", "Transfer to alternate"],
          ["Overvoltage", "Source voltage rises above threshold (typically 110–115% of nominal)", "Transfer to alternate"],
          ["Frequency deviation", "Source frequency outside ±2–3 Hz of nominal", "Transfer to alternate"],
          ["Phase loss", "One or more phases missing (3-phase STS)", "Transfer to alternate"],
          ["Manual command", "Operator initiates transfer via panel or SNMP", "Transfer to alternate"],
        ]}
      />

      <h2 id="source-priority" style={S.h2}>Source Priority</h2>

      <p style={S.p}>
        STS mein ek preferred source aur ek alternate source hoti hai — yeh factory setting
        ya commissioning pe configure hoti hai. Typically Source A preferred hoti hai.
      </p>

      <p style={S.p}>
        STS hamesha preferred source pe rehta hai jab woh available aur in-spec hoti hai.
        Alternate source pe transfer sirf fault condition mein hoti hai.
      </p>

      <p style={S.p}>
        <strong>Auto-retransfer</strong> configurable hai: preferred source restore hone pe
        STS automatically wapas aata hai ya nahi — yeh operator prefer karta hai. Auto-retransfer
        ON rakhne se operations simplified hoti hain; OFF rakhne se unexpected retransfer
        avoid hoti hai (retransfer bhi ek switching event hai).
      </p>

      <Callout type="best-practice" title="Best Practice — Source Priority Load Balancing">
        Agar ek data center mein kai STS hain, toh alternate sources mix karo — kuch STS pe
        A preferred, kuch pe B preferred. Yeh load balancing UPS-A aur UPS-B dono pe
        even distribution deta hai. Sab STS pe A preferred = UPS-A overloaded, UPS-B
        underutilized.
      </Callout>

      <h2 id="synchronization-requirements" style={S.h2}>Synchronization Requirements</h2>

      <p style={S.p}>
        Make-before-break seamless transfer ke liye dono sources synchronized honi chahiye.
        &quot;Synchronized&quot; ka matlab: same frequency aur phase angle difference minimal (typically
        ±20° se kam).
      </p>

      <p style={S.p}>
        Normal dual-UPS setup mein: dono UPS ek hi grid se supply lete hain → output
        frequency aur phase automatically aligned hoti hai. Yeh synchronization guarantee
        karti hai seamless transfer.
      </p>

      <p style={S.p}>
        Problem tab hoti hai jab UPS-A aur UPS-B alag independent grids ya generators se
        feed hote hain — phase alignment possible nahi. Is case mein STS break-before-make
        use karta hai — brief power interruption hoti hai (typically &lt; 1 AC cycle, ~16ms at 60Hz).
      </p>

      <ComparisonTable
        headers={["Scenario", "Synchronization", "Transfer Mode", "Interruption"]}
        rows={[
          ["Both UPS from same grid", "Yes — naturally synchronized", "Make-before-break", "Zero"],
          ["UPS A from grid, UPS B from generator", "No — frequency may differ", "Break-before-make", "< 1 AC cycle (~16ms)"],
          ["Both from independent grids", "No — phase angle differs", "Break-before-make", "< 1 AC cycle"],
          ["Both from synchronized generators", "Yes — if generators are synchronized", "Make-before-break", "Zero"],
        ]}
      />

      <h2 id="transfer-time" style={S.h2}>Transfer Time — 2 to 4 ms</h2>

      <p style={S.p}>
        Transfer time ka breakdown:
      </p>

      <ComparisonTable
        headers={["Phase", "Time", "What Happens"]}
        rows={[
          ["Source fault detection", "0.5–1 ms", "Voltage/frequency sensors detect out-of-spec condition"],
          ["Decision processing", "0.5–1 ms", "Control logic decides to transfer, checks alternate source"],
          ["Synchronization check", "~0.5 ms", "Phase angle verification"],
          ["SCR commutation wait", "0–8 ms", "Wait for current zero crossing (natural commutation)"],
          ["SCR B turn-on", "< 0.1 ms", "Gate pulse applied, thyristor conducts"],
          ["Total", "2–4 ms typical", "Load now on alternate source"],
        ]}
      />

      <p style={S.p}>
        2–4 ms kyun acceptable hai IT equipment ke liye? Modern server PSUs mein
        capacitors hote hain jo 10–20 ms ki interruption easily absorb kar lete hain
        bina output ripple ke. Server kabhi &quot;knows&quot; nahi karta ki source change hua.
      </p>

      <Callout type="common-mistake" title="Common Mistake — Transfer Time Misunderstanding">
        Kuch log socha karte hain STS 4ms mein switch karta hai isliye koi bhi
        4ms se zyada load nahi khoega. Yeh sahi hai for seamless transfer (synchronized
        sources). Lekin break-before-make mein brief interruption hoti hai — this is still
        invisible to servers but technically not &quot;zero&quot; transfer time. Always clarify
        which mode applies to your installation.
      </Callout>

      <h2 id="break-free-transfer" style={S.h2}>Break-Free Transfer</h2>

      <p style={S.p}>
        Break-free (make-before-break) transfer STS ka signature capability hai. Is mode
        mein Source B ke SCRs conduct karna shuru karte hain ek instant pehle jab Source A
        ke SCRs turn-off hote hain.
      </p>

      <p style={S.p}>
        Is brief overlap mein dono sources simultaneously load pe connected hoti hain.
        Yeh tabhi safe hai jab dono sources synchronized hain — phase difference near-zero
        hone se circulating currents minimal hote hain.
      </p>

      <p style={S.p}>
        Result: load ko continuous, uninterrupted power milta hai. Voltage waveform mein
        practically koi dip nahi, koi glitch nahi. IT equipment completely unaware.
      </p>

      <h2 id="single-bus-vs-dual-bus" style={S.h2}>Single Bus vs Dual Bus</h2>

      <ComparisonTable
        headers={["Architecture", "Description", "STS Use", "Tier Level"]}
        rows={[
          ["Single Bus", "One UPS, one PDU, all equipment on one path", "Not applicable — no second source", "Tier I/II"],
          ["Single Bus with Bypass", "One UPS + bypass source, ATS switching", "STS can replace ATS for faster switching", "Tier II"],
          ["Dual Bus (partial)", "Two UPS, dual-corded servers protected, single-corded unprotected", "STS added for single-corded equipment", "Tier III"],
          ["Full Dual Bus (2N)", "Two completely independent paths A and B", "STS for all single-corded equipment", "Tier IV"],
        ]}
      />

      <p style={S.p}>
        Full dual-bus architecture mein: <strong>dual-corded equipment</strong> ko STS ki
        zaroorat nahi — PSU directly both paths se connected hai. <strong>Single-corded
        equipment</strong> ke liye STS mandatory hai to achieve same redundancy level.
      </p>

      <h2 id="dual-ups-architecture" style={S.h2}>Dual UPS Architecture</h2>

      <p style={S.p}>
        Dual UPS architecture mein do completely independent{" "}
        <TopicLink slug="ups" variant="inline" /> systems operate karte hain — apne alag
        rectifiers, inverters, batteries, aur input feeds ke saath. Yeh Tier IV ka foundation hai.
      </p>

      <p style={S.p}>
        STS is architecture mein &quot;bridge&quot; ka kaam karta hai single-corded loads ke liye —
        unhe dono UPS outputs se protection deta hai even though woh sirf ek input support karte hain.
      </p>

      <ComparisonTable
        headers={["Component", "Path A", "Path B"]}
        rows={[
          ["Utility input", "Feeder A — independent transformer", "Feeder B — independent transformer"],
          ["UPS", "UPS-A (complete independent system)", "UPS-B (complete independent system)"],
          ["Battery", "Battery Bank A", "Battery Bank B"],
          ["Distribution", "PDU-A", "PDU-B"],
          ["Dual-corded loads", "PSU1 ← PDU-A", "PSU2 ← PDU-B"],
          ["Single-corded loads", "STS Input A ← PDU-A", "STS Input B ← PDU-B → STS Output → Load"],
        ]}
      />

      <h2 id="ab-power-distribution" style={S.h2}>A & B Power Distribution</h2>

      <p style={S.p}>
        A & B power distribution mein floor ke har rack pe dono PDU-A aur PDU-B outlets
        available hote hain. Dual-corded servers directly dono se connect hote hain.
        Single-corded servers ke liye STS rack mein install hoti hai.
      </p>

      <p style={S.p}>
        Load balancing ensure karo: agar sab STS pe Source A preferred hai aur UPS-B
        sirf standby pe hai, toh UPS-B underutilized aur UPS-A overloaded ho sakta hai.
        Alternate source priority assign karo different racks mein for balanced loading.
      </p>

      <Callout type="important" title="A/B Path Capacity Planning">
        Each UPS (A and B) ko full site load handle karne capable hona chahiye — sirf
        apne half ka nahi. Kyunki ek UPS failure pe doosra UPS poora load lega. STS
        wala load bhi include karo is calculation mein — STS failure ya transfer event
        pe ek UPS momentarily extra load carry karega.
      </Callout>
    </>
  );
}
