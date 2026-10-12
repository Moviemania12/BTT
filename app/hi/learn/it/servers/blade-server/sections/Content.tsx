"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "@/app/learn/it/servers/blade-server/shared";
import TopicLink from "@/components/TopicLink";
import BladeChassisArch from "@/app/learn/it/servers/blade-server/svg/BladeChassisArch";
import BladeAnatomy from "@/app/learn/it/servers/blade-server/svg/BladeAnatomy";
import BladeFabricPath from "@/app/learn/it/servers/blade-server/svg/BladeFabricPath";
import OversubscriptionMath from "@/app/learn/it/servers/blade-server/svg/OversubscriptionMath";
import ChassisRedundancy from "@/app/learn/it/servers/blade-server/svg/ChassisRedundancy";
import CrossChassisPlacement from "@/app/learn/it/servers/blade-server/svg/CrossChassisPlacement";
import BladeTroubleshootFlow from "@/app/learn/it/servers/blade-server/svg/BladeTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#c2410c", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — 2 Minute mein Blade Servers</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Blade kya hai:</strong> Patla compute card (CPU, RAM, thoda local storage) jo shared chassis mein slide hota hai. Power, cooling, networking aur management chassis se aate hain.</li>
          <li><strong>Kyun hai:</strong> Per rack unit zyada compute, bahut kam cables, ek jagah se bahut saare servers ka management.</li>
          <li><strong>Network path:</strong> Blade mezzanine port → midplane → chassis ka I/O module → uplinks → top-of-rack switch. Do I/O bays = do fabrics.</li>
          <li><strong>Oversubscription:</strong> Internal blade bandwidth ÷ uplink bandwidth. 8 × 10 Gbps ke upar 2 × 10 Gbps uplinks = 4:1.</li>
          <li><strong>Shared failure domain:</strong> Redundant PSUs, fans aur management modules ek part ke fail hone se bachate hain, poore chassis ke jaane se nahi.</li>
          <li><strong>Power aur cooling:</strong> Full chassis kuch kW se 10 kW se bhi zyada ho sakta hai. Kharidne se pehle feeds, PDU phases, aisle containment aur blanking panels plan karo.</li>
          <li><strong>High availability:</strong> VMs aur cluster nodes ko kam se kam do chassis mein baanto, ek chassis outage ke liye spare capacity ke saath.</li>
          <li><strong>Operations:</strong> Health, firmware baseline aur profiles ke liye chassis manager use karo. Updates waves mein, ek ek chassis.</li>
          <li><strong>Hamesha jawab nahi:</strong> Modern high-density rack servers, HCI aur GPU servers blades se compete karte hain. Workload dekh kar chuno, aadat se nahi.</li>
          <li><strong>Golden rule:</strong> Chassis ko ek chhota shared data center samjho — iska apna power, cooling, network aur failure modes hain.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS BLADE ══════════ */}
      <h2 id="what-is-blade" style={S.h2}>What Is a Blade Server?</h2>
      <p style={S.p}>Traditional rack server ek complete, self-contained unit hota hai. Uske apne power supplies, apne fans aur apne network ports hote hain. Blade server alag approach leta hai.</p>
      <p style={S.p}>Ek <strong>chassis</strong> (enclosure) hota hai jo rack mein lagta hai. Kai <strong>blades</strong> (compute cards) front se is chassis mein slide hote hain. Blade mein sirf CPU, RAM aur thoda local storage hota hai — sirf compute wala hissa.</p>
      <p style={S.p}>Baaki sab — power supplies, fans, network switching aur management — chassis level par shared hota hai. Blade ko apna PSU, apne fans ya apna network switch nahi chahiye.</p>
      <p style={S.p}>Blade chassis ko ek chhoti apartment building samjho aur har blade ko ek flat. Flats lift, paani ki tanki aur electrical room share karte hain, lekin har flat mein apna parivaar rehta hai. Shared services mein bachat hoti hai, lekin tanki fail ho jaye to har flat prabhavit hota hai.</p>
      <p style={S.p}>General server background ke liye <TopicLink slug="server-basics" variant="inline" /> dekho, aur har blade ke andar ke parts ke liye <TopicLink slug="cpu" variant="inline" /> aur <TopicLink slug="ram" variant="inline" />.</p>

      {/* ══════════ 2. WHY BLADE ══════════ */}
      <h2 id="why-blade" style={S.h2}>Why Blade Servers Exist — Density and Cabling</h2>
      <p style={S.p}>Socho 16 alag 1U rack servers. Har ek ko do power cords, do se chhe network cables, ek management cable, rails aur rack mein jagah chahiye. Matlab 60 ya zyada cables lagana, label karna, trace karna aur badalna.</p>
      <p style={S.p}>Wahi 16 servers blades ki tarah ek chassis mein rakho, to shayad sirf kuch power cords aur kuch uplink cables honge. Cable count tezi se girta hai, aur rack-aur-wire karne ka time bhi.</p>
      <ComparisonTable
        title="Operators ne Blades kyun chune (aur uski keemat)"
        headers={["Fayda", "Kyun hota hai", "Trade-off"]}
        rows={[
          ["Zyada density", "Shared PSUs, fans aur switches per server kam jagah lete hain", "Rack par zyada heat aur weight"],
          ["Kam cabling", "Network aur power chassis ke andar aggregate hote hain", "Kam, lekin zyada critical cables aur modules"],
          ["Tez deployment", "Blade slide karo, profile lagao, boot karo", "Pehle chassis install aur wire karna padta hai"],
          ["Central management", "Ek manager saare blades dekhta hai", "Management module protect karna important ho jaata hai"],
          ["Shared power efficiency", "Kam, bade, efficient PSUs aur fans", "Chassis ki power ceiling tay karti hai kitna jod sakte ho"],
          ["Scale par kam operations effort", "Standard blades, templates, central firmware", "Vendor lock-in aur chassis dependency"],
        ]}
        caption="General pattern. Asli bachat vendor, chassis generation aur chassis kitna bhara hai us par depend karti hai."
      />
      <p style={S.p}>Blades tab sabse popular the jab data center mein sau-sau similar servers hote the aur cabling bada dard thi. Aaj high-density rack servers, hyper-converged systems aur GPU servers wahi kaam ke liye compete karte hain — iske baare mein is article ke aage ke section mein dekho.</p>

      {/* ══════════ 3. ARCHITECTURE ══════════ */}
      <h2 id="blade-architecture" style={S.h2}>Blade Architecture — Component by Component</h2>
      <Figure caption="Fig 1 — Blade chassis architecture: compute blades chassis backplane ke through PSUs, fans, I/O modules aur management module share karte hue."><BladeChassisArch /></Figure>
      <DiagramGuide
        title="Fig 1 ko kaise padhein"
        steps={[
          "Bada bahar ka box chassis hai. Upar ke hisse ki boxes ki row blade slots hain. Bhare slots mein blade dikhta hai; dashed slots khaali hain aur unmein blanking panel lagana zaroori hai.",
          "Har blade sirf CPU + RAM aur local storage dikhata hai, aur 'No PSU' aur 'No network card' notes yaad dilate hain ki wo functions chassis mein hain.",
          "Neeche ki band shared services dikhati hai: power supplies, fan modules, I/O modules aur management module. Saare blades ek hi pool se lete hain.",
          "Blades aur shared modules ke beech ka backplane/midplane wo 'sadak' hai jo power, data aur management signals le jaati hai.",
          "Takeaway: ek chassis = bahut saare servers ke liye ek shared power, cooling, network aur management system.",
        ]}
      />
      <p style={S.p}><strong>Chassis (enclosure):</strong> Rack mein lagta hai aur aam taur par kai U height leta hai (jaise vendor aur model ke hisaab se 6U se 10U — specification verify karo). Isme kai blade bays hote hain.</p>
      <p style={S.p}><strong>Shared power supplies:</strong> Chassis ke peeche kai hot-swap PSUs hote hain. Saare blades shared power bus se lete hain. Redundancy mode (N+1, grid redundancy, 2N-style) chassis design aur configuration par depend karta hai.</p>
      <p style={S.p}><strong>Shared cooling:</strong> Hot-swap fan modules blades ke andar se front se back hawa kheenchte hain. Per-blade fans nahi hote. Central cooling zyada coordinated hoti hai, lekin ek fan failure poore chassis ko asar karta hai.</p>
      <p style={S.p}><strong>I/O modules:</strong> Chassis ke rear mein. Ye blades ko Ethernet, Fibre Channel ya converged connectivity dete hain. Per-blade external network cables nahi hote — uplinks I/O module se nikalte hain.</p>
      <p style={S.p}><strong>Management module:</strong> Chassis aur har blade ke liye central out-of-band management — power control, health, virtual console, firmware tools.</p>
      <p style={S.p}><strong>Midplane/backplane:</strong> Chassis ke andar ek passive board jiske dono taraf connectors hote hain: blades front se lagte hain, rear modules peeche se. Ye power, data lanes aur management signals le jaata hai.</p>

      {/* ══════════ 4. ANATOMY ══════════ */}
      <h2 id="blade-anatomy" style={S.h2}>Inside One Blade — CPU, RAM, Mezzanine and Midplane</h2>
      <Figure caption="Fig 2 — Half-height blade ke andar (top view): front mein local drives, do CPUs apne DIMMs ke saath, network/storage adapters ke liye mezzanine slots, BMC, aur peeche midplane connector. Layout illustrative hai."><BladeAnatomy /></Figure>
      <DiagramGuide
        title="Fig 2 ko kaise padhein"
        steps={[
          "Front left mein hai (cold aisle ki taraf). Rear right mein hai, jahan blade chassis midplane mein lagta hai.",
          "Front par: chhote hot-swap local drives (SSD/NVMe), boot ya scratch space ke liye. Kai blades SAN ya network se boot karte hain.",
          "Beech mein: do CPUs, har ek ke apne DIMM slots (hari strips). Ye normal dual-socket server board hai, bas chhota — NUMA ke liye CPU article dekho.",
          "Purple box: mezzanine slots. Ye PCIe slots hain jahan network ya Fibre Channel adapters lagte hain. Inke ports midplane se I/O modules tak jaate hain, kisi external cable se nahi.",
          "Laal box: BMC — blade ka chhota management computer. Ye midplane ke through chassis manager se baat karta hai.",
          "Right ki lambi bar: midplane connector. Uske paas ka panel batata hai ki kya guzarta hai — power, data lanes, management signals — aur reminder ki connector pins nazuk hain.",
          "Neeche ka note: half-height blades se chassis mein zyada blades aate hain, jabki full-height ya double-wide blades mein zyada CPU, RAM, mezzanine slots ya GPUs bhi aa sakte hain.",
        ]}
      />
      <p style={S.p}><strong>Mezzanine/LOM:</strong> Blade mein "LAN on motherboard" ports aur ek ya zyada mezzanine slots hote hain. Jo adapter lagate ho wahi tay karta hai ki kaun se I/O module ke saath pair hoga — Ethernet adapter ko Ethernet-capable bay chahiye, FC adapter ko FC-capable bay.</p>
      <p style={S.p}><strong>Blade bay → I/O bay mapping:</strong> Midplane ki wiring fixed hoti hai. Adapter port A hamesha ek I/O bay mein aur port B doosre mein jaata hai. Galat bay mein module ya adapters ka mix-up ho to links down rehte hain. Hamesha OEM mapping chart dekho.</p>
      <p style={S.p}><strong>Local storage:</strong> Chhota aur aksar sirf OS ya caches ke liye. Badi capacity aam taur par SAN, NAS ya storage blades se aati hai — neeche storage section aur <TopicLink slug="san" variant="inline" /> dekho.</p>

      {/* ══════════ 5. BLADE VS RACK ══════════ */}
      <h2 id="blade-vs-rack" style={S.h2}>Blade vs Rack vs Modular/Composable</h2>
      <ComparisonTable
        title="Server Infrastructure Models — Comparison"
        headers={["Aspect", "Rack Server", "Blade Server", "Modular/Composable"]}
        rows={[
          ["Self-contained", "Haan — har server independent", "Nahi — chassis resources share karta hai", "Disaggregated pools"],
          ["Cabling", "Per-server cables (power + network)", "Sirf chassis-level uplinks", "Fabric-based"],
          ["Density", "Standard — 1U/2U/4U", "Per chassis zyada density", "Varies, purpose-built"],
          ["Failure domain", "Individual server", "Shared chassis", "Aam taur par disaggregated"],
          ["Management", "Per-server + DCIM", "Chassis module se centralised", "Software-defined (management plane)"],
          ["Vendor flexibility", "Wide — standard rack", "Blade vendor-specific", "Aam taur par proprietary"],
          ["Entry cost", "Kam shuruaati", "Zyada (chassis investment)", "Zyada — specialised"],
          ["Flexibility", "High — mix/match", "Limited — blade form factor", "Sabse zyada — resource pools"],
          ["GPU / special cards", "Aasan (PCIe slots)", "Blade size se limited", "Design par depend"],
        ]}
        caption="Selection scale, density requirement, operational model, budget aur existing infrastructure par depend karta hai."
      />
      <p style={S.p}><strong>Modular / composable infrastructure:</strong> Agla step — CPU, memory, storage aur networking ko pools ki tarah treat kiya jaata hai, aur software jaise chahiye waise servers compose karta hai. HPE Synergy iska ek commercial example hai, lekin koi universal standard nahi. Zyada flexibility, zyada complexity aur cost.</p>

      {/* ══════════ 6. CHASSIS FABRIC ══════════ */}
      <h2 id="chassis-fabric" style={S.h2}>Chassis Fabric and the Network Path</h2>
      <Figure caption="Fig 3 — Blade network path: har blade ke do ports (A aur B) midplane se do alag I/O modules tak jaate hain; har I/O module ke uplinks alag top-of-rack switch tak. Mapping aur port counts OEM ke hisaab se alag hote hain."><BladeFabricPath /></Figure>
      <DiagramGuide
        title="Fig 3 ko kaise padhein"
        steps={[
          "Left: teen blades. Har ek mein Port A (purple) aur Port B (cyan) dikhte hain. Ye blade ke mezzanine/LOM adapter ports hain.",
          "Beech-left ki lambi bar: midplane. Purple lines Port A traffic ko I/O Module A tak le jaati hain; cyan lines Port B traffic ko I/O Module B tak. Wiring fixed hai — patch nahi kar sakte.",
          "Beech: alag bays mein do I/O modules. Har ek ke blades ki taraf 'down-ports' aur bahar ki taraf 'up-ports' hain. Andar ye chhota switch ya sirf pass-through ho sakta hai.",
          "Right: do alag ToR (top-of-rack) switches. Har I/O module ke do uplinks (moti lines) apne ToR switch tak jaate hain. Isse do independent network paths, A aur B, milte hain.",
          "Neeche ka box: ek I/O module fail ho to aadhe paths down hote hain, lekin blades chalte rehte hain. Asal mein dono paths OS ya hypervisor ki teaming/bonding use karti hai.",
        ]}
      />
      <p style={S.p}>Chassis ke andar fabric design vendor par depend karta hai. Kuch chassis mein blades aur I/O modules ke beech non-blocking crossbar hota hai. Kuch simple shared backplane use karte hain jahan oversubscription zyada ho sakta hai. Vendor architecture guide zaroor padho.</p>
      <p style={S.p}><strong>North-south vs east-west:</strong> Blade se bahar ke network ka traffic (north-south) I/O module uplinks se jaata hai. Ek hi chassis ke blades ke beech ka traffic (east-west) I/O module ke andar hi switch ho sakta hai, chassis se bahar gaye bina — wo tez hota hai aur uplinks use nahi karta.</p>
      <p style={S.p}>Bahar ke network ke liye <TopicLink slug="switch" variant="inline" /> dekho, aur jude hue infrastructure ke liye <TopicLink slug="how-the-internet-works" variant="inline" />.</p>

      {/* ══════════ 7. IO MODULES ══════════ */}
      <h2 id="io-modules" style={S.h2}>I/O Modules — Switch, Pass-Through, FC</h2>
      <ComparisonTable
        title="Blade I/O Modules ke Types"
        headers={["Type", "Kaise kaam karta hai", "Kis ke liye acha", "Dhyaan rakho"]}
        rows={[
          ["Ethernet switch module", "Built-in switch; blades down-ports se jude, kuch hi uplinks bahar", "Kam cables, aasan scaling", "Ye ek aur switch hai configure, patch aur upgrade karne ke liye; oversubscription"],
          ["Pass-through module", "Har blade port ek alag external port par aata hai", "Apne existing ToR switches use karo; simple, visible", "Phir se bahut cables; bahut ToR ports chahiye"],
          ["Fibre Channel module / FC pass-through", "Blade HBAs ko SAN fabric se jodta hai", "Boot-from-SAN, block storage", "Zoning, NPIV aur firmware compatibility"],
          ["Converged / fabric interconnect", "Ek fabric par LAN aur SAN (FCoE/RoCE etc.)", "Kam adapters aur cables", "Zyada complex design aur QoS"],
          ["Interconnect/stacking links", "Kai chassis ke modules ko ek logical fabric mein jodta hai", "Kai chassis ka single management", "Galat stacking failures ko jod sakti hai"],
        ]}
        caption="Naam aur capabilities OEM ke hisaab se badalte hain; apne chassis generation ka compatibility matrix verify karo."
      />
      <p style={S.p}><strong>Kaise chunein:</strong> Agar network team ToR switches par poora control rakhna chahti hai to pass-through chuno. Kam cables chahiye aur embedded switches manage karne mein dikkat nahi to switch modules chuno. Heavy SAN usage ho to FC ya converged modules plan karo.</p>
      <p style={S.p}><strong>Hamesha pairs mein:</strong> I/O modules ko redundant pairs mein lagao aur alag ToR switches se map karo. Akela I/O module chassis ke har blade ke liye ek hi path hai.</p>

      {/* ══════════ 8. OVERSUBSCRIPTION ══════════ */}
      <h2 id="oversubscription" style={S.h2}>Oversubscription in Blade Networks</h2>
      <Figure caption="Fig 4 — Oversubscription example: 8 blades × 10 Gbps = 80 Gbps possible demand, jise 40, 20 aur 10 Gbps uplink capacity se compare kiya gaya, jisse 2:1, 4:1 aur 8:1 ratios bante hain. Numbers illustrative hain."><OversubscriptionMath /></Figure>
      <DiagramGuide
        title="Fig 4 ko kaise padhein"
        steps={[
          "Upar ka neela banner maximum demand dikhata hai — 8 blades × 10 Gbps = 80 Gbps. Har row mein grey bar ki lambai yahi hai.",
          "Har rangeen row asli uplink capacity dikhati hai: 40 Gbps (hara), 20 Gbps (amber), 10 Gbps (laal).",
          "Right ka box ratio deta hai: 80 ÷ 40 = 2:1, 80 ÷ 20 = 4:1, 80 ÷ 10 = 8:1.",
          "Row labels typical suitability batate hain — halke mixed VMs high ratio chala lete hain; storage aur backup-heavy chassis ko kam ratio chahiye.",
          "Neeche ka note: har blade par peak 100% kam hi hota hai, lekin live migration, backups aur storage traffic ho sakta hai — uplinks ko sabse busy realistic window ke hisaab se size karo.",
        ]}
      />
      <CodeBlock lang="text" label="Oversubscription formula">
{`ratio = (blades × bandwidth per blade) ÷ (uplinks × uplink speed)

8 × 10 Gbps = 80 Gbps internal
2 × 10 Gbps = 20 Gbps uplink      → 80 ÷ 20 = 4 : 1

Per fabric (A ya B) ke liye yahi maths alag se lagta hai.
Ek I/O module fail ho to SARA traffic doosre se guzarna padta hai:
effective ratio double ho sakta hai.`}
      </CodeBlock>
      <Callout type="important" title="Failure case ke liye plan karo">
        Agar normally dono fabrics load share karte hain, to ek I/O module fail hone par sab kuch ek fabric par aa jaata hai. Check karo ki us degraded state mein bhi aapke uplinks, ToR ports aur oversubscription kaam karte hain.
      </Callout>
      <p style={S.p}><strong>Jab high acceptable hai:</strong> Web servers, general VMs, test/dev — blades kam hi ek saath burst karte hain. <strong>Jab dikkat hoti hai:</strong> Ethernet par storage (iSCSI/NFS), vMotion bursts, backup windows, big data. Asli traffic naapo, phir uplinks size karo.</p>

      {/* ══════════ 9. STORAGE ══════════ */}
      <h2 id="storage-connectivity" style={S.h2}>Storage Connectivity and Boot Options</h2>
      <p style={S.p}>Blades patle hote hain, to disks ke liye jagah kam hoti hai. Storage aam taur par chaar tareeke se milta hai.</p>
      <ComparisonTable
        title="Blades ke liye Storage Options"
        headers={["Option", "Kaise kaam karta hai", "Typical use"]}
        rows={[
          ["Local mirrored drives", "Blade par RAID 1 mein 2 chhote SSDs", "OS boot, hypervisor, scratch"],
          ["Boot from SAN (FC/FCoE/iSCSI)", "Blade HBA/CNA ke through SAN LUN se boot karta hai", "Stateless blades; fast replacement"],
          ["SAN/NAS data volumes", "Applications FC, iSCSI ya NFS par shared storage use karte hain", "VM datastores, databases — SAN aur NAS dekho"],
          ["Storage blade / shared direct-attached", "Compute blades se jude disk drawer ya storage blade", "Chhote deployments, local pools"],
        ]}
        caption="Choice workload, storage platform aur OEM chassis capabilities par depend karta hai."
      />
      <p style={S.p}><strong>Stateless blades:</strong> Agar OS SAN se boot hota hai aur identity (MAC, WWN, UUID) profile mein stored hai, to fail hue blade ko spare blade se badal kar profile move kar sakte ho. Kai bade blade deployments isi tarah jaldi recover karte hain.</p>
      <p style={S.p}>Storage concepts ke liye <TopicLink slug="san" variant="inline" />, <TopicLink slug="nas" variant="inline" /> aur <TopicLink slug="das" variant="inline" /> dekho. Blades par chalne wali cheezon ke backup ke liye <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══════════ 10. SHARED FAILURE ══════════ */}
      <h2 id="shared-failure" style={S.h2}>Shared Failure Domain</h2>
      <Callout type="warning" title="Blade Chassis = Shared Failure Domain, Universal Single Point of Failure nahi">
        Blade chassis ek shared failure domain hai. Chassis-level failures (poora power loss, midplane fault, kharab firmware update) saare blades ko asar kar sakte hain. Lekin redundant components (kai PSUs, N+1 fans, dual management modules, dual I/O modules) individual component failures ko survive karne ke liye design kiye gaye hain. "Single point of failure" ka blanket statement technically galat hai. Asli risk poora chassis hai — isiliye mission-critical services ke liye cross-chassis distribution zaroori hai.
      </Callout>
      <p style={S.p}>Chassis mein kya fate share karta hai: midplane (passive lekin phir bhi ek part), power bus, airflow path aur management network. Kya nahi: har blade ka CPU, RAM aur OS.</p>
      <p style={S.p}><strong>Blast radius thinking:</strong> Poochho "agar ye chassis 4 ghante ke liye gayab ho jaye to kaun si services down hongi?" Jawab "sab important cheezein" ho to design bahut concentrated hai. Critical services ko chassis, racks aur power feeds mein baanto.</p>
      <p style={S.p}><strong>Change risk:</strong> Chassis firmware updates aur I/O module changes ek saath bahut servers ko chhoote hain. Galti saare blades ko asar karti hai, isliye changes ke liye tested plan aur rollback chahiye — aur kabhi sabhi chassis par ek hi raat nahi.</p>

      {/* ══════════ 11. REDUNDANCY ══════════ */}
      <h2 id="redundancy" style={S.h2}>Redundancy at Chassis Level</h2>
      <Figure caption="Fig 5 — Chassis ke andar aur aas-paas redundancy: shared bus par PSU groups mein A/B power feeds, N+1 fan modules, active/standby management modules aur dual I/O modules. Counts aur modes illustrative hain."><ChassisRedundancy /></Figure>
      <DiagramGuide
        title="Fig 5 ko kaise padhein"
        steps={[
          "Left: do alag power feeds, A (laal, UPS A se) aur B (neela, UPS B se). Inhe independent PDUs aur ideally independent upstream paths se aana chahiye.",
          "Chassis ke andar upar ki row: chhe PSUs; teen feed A par (laal) aur teen feed B par (neela). Sab ek shared power bus (peeli bar) mein judte hain.",
          "Bus ke neeche: blades (hare) chassis se power, cooling, network aur management lete hain. Unke paas fan modules (cyan, N+1) aur management modules (purple, active + standby) hain.",
          "Neeche ki row: do I/O modules, Bay 1 (Fabric A) aur Bay 2 (Fabric B), har ek ke uplinks alag ToR switch tak.",
          "Left ka peela note asli warning hai: redundancy tabhi kaam karti hai jab total load bache hue PSUs par fit ho aur configured mode aapke feed design se match kare.",
          "Aakhri text: ye ek component fail hone se bachata hai — poora chassis jaane se nahi.",
        ]}
      />
      <p style={S.p}><strong>Power:</strong> PSUs ko A aur B feeds se wahi logic ke saath jodo jo rack servers ke liye use karte ho (<TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />). Chassis configuration mein sahi redundancy mode chuno — N+1 PSU failure se bachata hai, grid redundancy (A/B) feed failure se bhi.</p>
      <p style={S.p}><strong>Cooling:</strong> Fan modules aam taur par N+1 hote hain. Ek fail ho to baaki tez ghoomte hain, lekin thermal margin kam ho jaata hai — jaldi replace karo. Hot-swap aam taur par supported hai.</p>
      <p style={S.p}><strong>Management modules:</strong> Enterprise chassis do modules active/standby support karte hain. Primary fail ho to secondary sambhal leta hai; manager down hone par bhi blades chalte rehte hain, lekin kuch der control aur monitoring chali jaati hai.</p>
      <p style={S.p}><strong>I/O modules:</strong> Alag bays mein lagao aur alag ToR switches se jodo (Fig 3 dekho).</p>
      <Callout type="common-mistake" title="'6 PSUs hain to hum safe hain'">
        Nahi, agar saare 6 ek hi PDU mein lage hain, ya chassis load ko 5 PSUs chahiye. Redundancy feeds mein bhi honi chahiye, sirf PSU count mein nahi — aur load bache hue par fit hona chahiye.
      </Callout>

      {/* ══════════ 12. POWER PLANNING ══════════ */}
      <h2 id="power-planning" style={S.h2}>Power Planning and Budget</h2>
      <p style={S.p}>Full blade chassis kuch U mein 8, 16 ya zyada servers ki power pack karta hai. Total kuch kW tak aur dense ya GPU-equipped designs mein 10 kW se kaafi upar ja sakta hai. Rack power plan chassis kharidne se <em>pehle</em> karna chahiye.</p>
      <CodeBlock lang="text" label="Example power budget (illustrative numbers)">
{`16 blades × 450 W peak                    = 7,200 W
Chassis fans + management + I/O modules   =   900 W
Total peak                                 = 8,100 W

PSU efficiency / growth ke liye ~10-15% headroom jodo → plan ≈ 9 kW

Redundancy check (N+1, 6 PSUs of 2,400 W each):
  Ek fail ke baad 5 PSUs = 12,000 W  ≥ 8,100 W  ✔
Feed check (A/B): ek feed gayi to sirf aadhe PSUs bachte hain:
  3 PSUs = 7,200 W  <  8,100 W  ✘  → blades ko power-cap karna hoga ya
  poori A/B tolerance chahiye to blades kam karne honge`}
      </CodeBlock>
      <p style={S.p}><strong>Power capping:</strong> Zyadatar chassis managers per blade ya poore chassis ke liye power cap set karne dete hain. Failure se available power kam ho to blades shutdown ki jagah throttle hote hain. Capping plan, test aur document honi chahiye.</p>
      <p style={S.p}><strong>Per-phase balancing:</strong> Chassis power cords three-phase PDU ke teen phases mein baante jaate hain. Unbalanced phases pehle ek phase ka breaker overload karte hain. OEM guide aur <TopicLink slug="dcim" variant="inline" /> mein phase mapping check karo.</p>
      <p style={S.p}><strong>Power-on par inrush:</strong> Kai PSUs ek saath start hone se breakers trip ho sakte hain. Kai chassis blade start-up ko stagger karte hain. OEM sequence aur PDU rating use karo.</p>
      <Callout type="danger" title="PDU ya breaker rating kabhi cross mat karo">
        Under-rated feed par full loaded chassis breaker trip karke har blade ko ek saath gira sakta hai. Install karne se pehle rated, derated (aam taur par 80% continuous) aur per-phase values verify karo.
      </Callout>

      {/* ══════════ 13. COOLING ══════════ */}
      <h2 id="cooling-airflow" style={S.h2}>Cooling and Airflow</h2>
      <p style={S.p}>Blade chassis front se thandi hawa kheenchte hain, blades ke andar se guzaarte hain aur peeche se exhaust karte hain. Unke fans strong aur shared hote hain. Acha airflow chassis se zyada rack aur room par depend karta hai.</p>
      <p style={S.p}><strong>Har khaali bay mein blanking panel:</strong> Khaali blade slot ek chhed hai. Thandi hawa sabse aasan raaste se chhed mein se nikal jaati hai aur baaki blades ko bypass karti hai. Khaali slots aur khaali rack units mein hamesha blanking panels lagao.</p>
      <p style={S.p}><strong>Aisle containment:</strong> Hot aur cold aisle mix ho to garam chassis apni hi garam hawa apne inlet par wapas leta hai. Dekho <TopicLink slug="containment" variant="inline" /> aur <TopicLink slug="airflow-management" variant="inline" />.</p>
      <p style={S.p}><strong>Heat density:</strong> Blade chassis ka rack 15–30 kW ya zyada tak ja sakta hai. CRAC/PAC/CRAH capacity aur rack-level cooling check karo — <TopicLink slug="crac" variant="inline" />, <TopicLink slug="pac" variant="inline" />, <TopicLink slug="chiller" variant="inline" />.</p>
      <p style={S.p}><strong>Fan behaviour:</strong> Ambient temperature badhne par, ya fan fail hone par, baaki fans tez ho jaate hain aur noise aur power badh jaate hain. Thermal limit hit ho to blades throttle hote hain aur phir hardware bachane ke liye band ho jaate hain.</p>
      <Callout type="best-practice" title="Bhaari chassis ko rack mein neeche lagao">
        Fully populated chassis bhaari hota hai. Stability aur safe lifting ke liye use neeche mount karo, cable bundles ko exhaust se door rakho, aur PSUs aur I/O modules ke liye rear service access chhodo.
      </Callout>

      {/* ══════════ 14. MANAGEMENT ══════════ */}
      <h2 id="management" style={S.h2}>Centralised Management</h2>
      <p style={S.p}>Blades ka bada fayda central control hai. Ek management interface se blades power on/off kar sakte ho, hardware health dekh sakte ho, virtual consoles khol sakte ho aur poore chassis ka firmware manage kar sakte ho. Product names vendor-specific hain — OEM se check karo.</p>
      <ComparisonTable
        title="Chassis Manager aam taur par kya karta hai"
        headers={["Function", "Kya milta hai"]}
        rows={[
          ["Inventory", "Har blade, adapter, PSU, fan aur I/O module ek list mein"],
          ["Health aur alerts", "Sensor, power aur fan status; SNMP/syslog/e-mail alerts"],
          ["Power control aur capping", "Power on/off, staged start-up, caps, power history"],
          ["Remote console", "Blade BMC ke through KVM/virtual media"],
          ["Profiles / templates", "BIOS, boot order, NIC/HBA identity (MAC, WWN) kisi bhi blade par apply"],
          ["Firmware baseline", "Blade, chassis aur I/O module firmware ek jagah se compare aur update"],
          ["Role-based access aur audit", "Kisne kya kiya, kis privilege se"],
        ]}
        caption="Chassis manager, enclosure manager ya fabric manager jaise naam vendor ke hisaab se alag hain."
      />
      <p style={S.p}><strong>Template-based deployment:</strong> Wahi profile kai blades par apply karo, taaki settings aur identity consistent rahein aur replacement blade minutes mein configure ho jaye.</p>
      <p style={S.p}><strong>Management plane protect karo:</strong> Chassis manager aur blade BMCs ko dedicated management network par rakho, access restrict karo, default credentials badlo, aur management firmware current rakho. Agar koi manager par kabza kar le to wo har blade ko control karta hai. Facility monitoring ke liye <TopicLink slug="dcim" variant="inline" /> aur <TopicLink slug="bms" variant="inline" /> dekho.</p>
      <Callout type="warning" title="Management module achanak dependency ban sakta hai">
        Manager fail hone par blades aam taur par chalte rehte hain, lekin console, alerts aur kuch fan-control features chale jaate hain. Standby manager ka failover test karo, aur out-of-band path (jaise blade ka apna BMC network) available rakho.
      </Callout>

      {/* ══════════ 15. VIRTUALISATION HA ══════════ */}
      <h2 id="virtualisation-ha" style={S.h2}>Virtualisation, HA and Cross-Chassis Placement</h2>
      <p style={S.p}>Zyadatar blades hypervisors chalate hain — dekho <TopicLink slug="virtualization" variant="inline" />. Cluster ko samajhna chahiye ki blades independent nahi hain: kai blades ek chassis share karte hain.</p>
      <Figure caption="Fig 6 — Cross-chassis placement: har service ki copies dono chassis par hain, to ek chassis fail ya maintenance mein jaane par kam se kam ek copy chalti rehti hai. HA baaki ko bache hue chassis par restart karta hai."><CrossChassisPlacement /></Figure>
      <DiagramGuide
        title="Fig 6 ko kaise padhein"
        steps={[
          "Do bade boxes Chassis 1 aur Chassis 2 hain, har ek mein blades. Rangeen tags VMs ya service instances hain: Web, App, DB aur Cache.",
          "Rang dekho: har rang dono chassis mein aata hai (Web-1 aur Web-2, DB-1 aur DB-2, aur aise hi). Ye anti-affinity placement hai — ek service ki copies ek chassis par nahi ho sakti.",
          "Chassis boxes ke neeche ka text capacity rule batata hai: har chassis itna loaded ho ki doosra uska workload absorb kar sake (do-chassis design mein lagbhag 50% each, ya zyada chassis ke liye N+1).",
          "Orange box outage sequence batata hai: HA lost hosts detect karta hai, bache chassis par VMs restart karta hai, jin services ki doosri copy hai wo chalti rehti hain, aur cluster quorum failed chassis par depend nahi karna chahiye.",
          "Takeaway: chassis hi failure domain hai, to cluster rules mein 'chassis' ko 'rack' ya 'site' ki tarah treat karo — ek boundary jise copies cross karein.",
        ]}
      />
      <p style={S.p}><strong>Chassis awareness:</strong> VMware, Hyper-V, KVM, OpenStack aur Kubernetes mein ise anti-affinity rules, fault domains ya topology labels se express kar sakte ho. Jis cluster mein dono DB nodes ek chassis ke blades par hain wo highly available nahi hai, chahe kitne bhi blades ho.</p>
      <p style={S.p}><strong>Chassis level par N+1 capacity:</strong> "Ek blade fail ho" ke liye size karna kaafi nahi. Poochho "agar poora chassis maintenance ke liye offline ho to baaki load utha sakte hain?" Do chassis ke liye iska matlab hai har ek ko combined capacity ke lagbhag aadhe ya kam par rakhna.</p>
      <p style={S.p}><strong>Quorum aur witnesses:</strong> Witness/tiebreaker components ko chassis ke bahar ya teesri location par rakho. Agar cluster ke saare members ek chassis mein hain to chassis outage se quorum chala jaata hai.</p>
      <p style={S.p}>Chassis level se upar disaster recovery ke liye <TopicLink slug="disaster-recovery" variant="inline" /> aur <TopicLink slug="backup" variant="inline" /> dekho.</p>

      {/* ══════════ 16. DEPLOYMENT ══════════ */}
      <h2 id="deployment" style={S.h2}>Deployment Considerations</h2>
      <p style={S.p}><strong>Physical:</strong> Loaded chassis ka wazan 100 kg se kaafi zyada ho sakta hai. Lift, sahi rails aur trained team use karo. Rack depth, rack load rating aur floor loading check karo. PSUs aur I/O modules ke liye rear access chahiye.</p>
      <p style={S.p}><strong>Power:</strong> Fully loaded chassis ka total peak draw, A/B feed redundancy, per-phase load aur PDU rating calculate karo — power planning section dekho.</p>
      <p style={S.p}><strong>Cooling:</strong> Per rack heat load, aisle containment, blanking panels aur cooling plant capacity check karo.</p>
      <p style={S.p}><strong>Network:</strong> I/O module types, uplink count aur speed, normal <em>aur</em> failure state ka oversubscription, VLANs, aur chassis manager aur BMCs ke liye alag management VLAN plan karo.</p>
      <p style={S.p}><strong>Growth:</strong> Tay karo chassis kitna bhara kharidna hai. Aadha khaali chassis fixed cost waste karta hai; bahut bhara power ya network growth ke liye jagah nahi chhodta. Kai sites cross-chassis HA ke liye chassis 2 ke "blocks" mein kharidte hain.</p>
      <p style={S.p}><strong>Lifecycle:</strong> Check karo vendor chassis generation ko kitne time tak support karega, future blades aur I/O modules ke saath midplane compatibility, aur spare-part availability.</p>

      {/* ══════════ 17. INSTALLATION ══════════ */}
      <h2 id="installation-replacement" style={S.h2}>Installation and Replacement</h2>
      <CodeBlock lang="text" label="Naya blade chassis install karna — typical order (OEM guide follow karo)">
{`1. Survey: rack depth, floor load, feeds A/B, PDU outlets, cooling, network ports.
2. Rails lagao; server lift se chassis uthao (pehle khaali chassis - agar OEM
   allow kare to wazan kam karne ke liye PSUs/blades nikaal lo).
3. Midplane-side modules lagao: PSUs, fan modules, I/O modules, management modules.
4. Power cords jodo: A-side PSUs feed A se, B-side PSUs feed B se (phases check karo).
5. Management network cables jodo, phir I/O modules ke uplinks.
6. Chassis power on karo; manager boot hone do; IPs, time, credentials set karo.
7. Chassis manager / I/O module firmware approved baseline par update karo.
8. Blades ek-ek karke lagao; har ek recognise hua ya nahi check karo; profiles apply karo.
9. Har khaali bay mein blanking panel lagao.
10. Document karo: slot map, cable map, power map, firmware versions, IPs.`}
      </CodeBlock>
      <CodeBlock lang="text" label="Blade replace karna — typical sequence">
{`1. VMs ya workloads drain / evacuate karo; HA state healthy confirm karo.
2. Graceful shutdown; chassis manager mein blade powered off confirm karo.
3. Latch release karo; blade ko seedha bahar slide karo; ESD protection on.
4. Agar identity (MAC, WWN, UUID) slot se bandhi hai to profile move karo ya note karo.
5. Replacement ko poora andar daalo - latch click suno/mehsoos karo; kabhi force mat karo.
6. Profile apply karo; firmware baseline par update karo; BIOS settings verify karo.
7. Network aur storage paths verify karo; cluster join karo; production mein wapas.`}
      </CodeBlock>
      <Callout type="danger" title="Blade ko slot mein kabhi force mat karo">
        Midplane connector pins nazuk hote hain. Bent pin poora slot kharab kar sakta hai — ya chassis ke doosre aadhe hisse ke saath shared connector ko bhi. Resistance mehsoos ho to wapas nikalo aur inspect karo.
      </Callout>
      <Callout type="maintenance" title="Bhaari aur awkward">
        Chassis partly populated hone par bhi bhaari hota hai. Lift, do ya zyada log aur rated rails use karo. OEM permit kare to bhaari chassis uthane se pehle PSUs aur blades nikaal lo.
      </Callout>
      <p style={S.p}><strong>PSU / fan / I/O module replacement:</strong> Zyadatar designs mein ye hot-swap hote hain, lekin ek time par ek hi replace karo, har change ke baad redundancy state check karo, aur pehla jab tak rebuild ya recover ho raha ho doosra mat nikalo.</p>
      <p style={S.p}><strong>Cabling:</strong> Har uplink ke dono ends par chassis, bay aur port label karo. Cables ko fan exhaust aur rear-access areas se door rakho. Plug karne se pehle fibre ends saaf karo.</p>

      {/* ══════════ 18. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <ComparisonTable
        title="Chassis Commissioning Test Plan"
        headers={["Stage", "Kya check karna hai", "Tool / method"]}
        rows={[
          ["Inventory", "Har blade, adapter, PSU, fan aur module recognise; firmware versions", "Chassis manager inventory"],
          ["Power redundancy", "Controlled test mein feed A kheencho; saare blades up rehne chahiye; B ke liye repeat", "Approval ke saath planned test; manager aur PDU dekho"],
          ["PSU failure", "Ek PSU nikaalo; alert aur redundancy status check; wapas lagao", "Chassis manager"],
          ["Fan failure", "Ek fan module nikaalo; alerts, temperature, fan speeds check", "Chassis manager"],
          ["Network paths", "Pehle ek uplink, phir ek I/O module disconnect; traffic bina outage ke failover ho", "Ping/iperf, hypervisor teaming status"],
          ["Management failover", "Primary manager fail karo; standby sambhal le", "Chassis manager"],
          ["Boot aur storage", "Boot-from-SAN ya local boot, multipath kaam kar raha ho", "OS/hypervisor, SAN tools"],
          ["Burn-in", "Saare blades par kai ghante load; temperature aur power dekho", "Stress tools + manager logs"],
          ["Acceptance", "Results record, baseline, commissioning ticket close", "Commissioning report"],
        ]}
        caption="Pass criteria OEM acceptance guide aur project specification se aate hain. Power-feed tests sirf approval aur rollback plan ke saath karo."
      />
      <p style={S.p}><strong>Baseline:</strong> Chassis healthy ho tab temperatures, fan speeds, power draw aur link states ka record rakho. Baad mein guess karne ki jagah usse compare karo.</p>

      {/* ══════════ 19. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring Blade Chassis</h2>
      <ComparisonTable
        title="Kya monitor karna hai aur kyun"
        headers={["Item", "Metric", "Kya dekhna hai"]}
        rows={[
          ["Power", "Chassis watts, per-PSU status, A/B feed state, cap events", "Redundancy loss, load limit ke paas"],
          ["Cooling", "Inlet/outlet temperature, fan speeds, fan failures", "Badhta inlet temperature, fan 100% par"],
          ["I/O modules", "Port status, error counters, uplink utilisation, firmware", "CRC errors, link flaps, saturation"],
          ["Blades", "BMC health, memory/CPU errors, thermal, power state", "Badhte correctable errors, throttling"],
          ["Manager", "Active/standby state, config backups", "Standby ready nahi"],
          ["Firmware", "Chassis aur blades ke versions", "Baseline se drift"],
        ]}
        caption="Alarm thresholds OEM guidance aur apni baseline se aane chahiye."
      />
      <p style={S.p}>Chassis alerts (SNMP, Redfish events, syslog) ko central monitoring aur <TopicLink slug="dcim" variant="inline" /> platform par bhejo, sirf aise mailbox mein nahi jise koi nahi padhta. Cross-check ke liye <TopicLink slug="bms" variant="inline" /> aur <TopicLink slug="sensors" variant="inline" /> ka rack-level power aur temperature data use karo.</p>
      <CodeBlock lang="bash" label="Redfish example - chassis thermal data padho (generic pattern)">
{`# Zyadatar modern chassis managers Redfish expose karte hain. Exact paths vendor ke hisaab se alag.
curl -sk -u "$USER:$PASS" https://<chassis-manager>/redfish/v1/Chassis | jq .
curl -sk -u "$USER:$PASS" https://<chassis-manager>/redfish/v1/Chassis/<id>/Thermal | jq '.Temperatures[] | {Name, ReadingCelsius}'
# Credentials secrets vault mein rakho, scripts ya shell history mein kabhi nahi.`}
      </CodeBlock>

      {/* ══════════ 20. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance and Firmware Updates</h2>
      <ComparisonTable
        title="Blade Infrastructure Maintenance Schedule (example)"
        headers={["Frequency", "Task"]}
        rows={[
          ["Continuous", "Power, fans, modules aur blades ke liye monitoring aur alerts"],
          ["Weekly", "Alarms, redundancy status, firmware drift review"],
          ["Monthly", "Logs check, chassis/I/O configuration backup, capacity review (power, uplinks)"],
          ["Quarterly", "Filters/rack airflow path saaf, blanking panels check, cables aur optics inspect"],
          ["OEM plan ke hisaab se", "Firmware updates waves mein: test chassis → ek production chassis → baaki"],
          ["Annually", "Failover tests (PSU, fan, I/O, manager), spares aur lifecycle status review"],
        ]}
        caption="Sirf example. Actual intervals OEM manuals aur operating policy se aate hain."
      />
      <p style={S.p}><strong>Firmware order matter karta hai:</strong> Chassis manager, I/O modules, blade BIOS/BMC aur adapter firmware compatible hone chahiye. Vendors validated bundle ya recipe publish karte hain. Kabhi sirf ek part update karke umeed mat rakho.</p>
      <p style={S.p}><strong>Waves mein update:</strong> Pehle test chassis. Phir ek ek production chassis, update se pehle workloads door karke. Cross-chassis HA pair ke dono chassis ek hi raat update mat karo.</p>
      <p style={S.p}><strong>Backups:</strong> Har change se pehle chassis manager configuration, I/O module configuration aur blade profiles export karo. Chassis ke bahar store karo.</p>
      <p style={S.p}><strong>Spares:</strong> Kam se kam ek spare PSU, fan module, I/O module aur blade (ya defined replacement SLA) rakho. Midplane failures rare hain lekin poora chassis nikaal dete hain — OEM response time jaano.</p>

      {/* ══════════ 21. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Blade Environments</h2>
      <Figure caption="Fig 7 — Blade troubleshooting flow: pehle tay karo ek blade ya kai affected hain, phir blade-level causes, ya chassis-level power, network aur thermal check karo; end mein fix, validate aur document."><BladeTroubleshootFlow /></Figure>
      <DiagramGuide
        title="Fig 7 ko kaise padhein"
        steps={[
          "Laal box se shuru karo: alert ya outage report. Pehla sawal scale ka hai — ek blade ya kai?",
          "Left path (ONE): blade-level problem. BMC log padho, reseat karo, phir known-good slot ya blade se compare karke dekho ki blade kharab hai ya slot.",
          "Right path (MANY): chassis-level problem. Hamesha pehle chassis manager ke alarms padho.",
          "Phir teen layers order mein dekho: power (PSUs, feeds, power budget), network (I/O module path, uplinks, VLAN, firmware) aur thermal (failed fans, khule slots, hot aisle).",
          "Dono paths hare box par khatam hote hain: fix karo, validate karo ki redundancy restore hui, aur document karo.",
          "Neeche ki warning: active power ya thermal alarm wale chassis mein manager log padhe bina blades ko reseat ya reset mat karo.",
        ]}
      />
      <ComparisonTable
        title="Symptom → Likely Cause → First Check"
        headers={["Symptom", "Likely cause", "First check"]}
        rows={[
          ["Blade power on nahi hota", "Power budget exceed, blade seated nahi, slot ya blade fault", "Chassis manager: blade recognise? Power cap / budget; reseat; doosra slot try karo"],
          ["Blade ko network nahi", "I/O module down, galat bay/adapter mapping, VLAN mismatch, uplink down", "I/O module health, port status, module aur OS par VLAN, ToR port"],
          ["Kai blades ka network ek saath gaya", "I/O module ya uplink failure, ToR issue", "Kaun sa fabric (A ya B)? Module logs, uplink LEDs"],
          ["Blades throttle / thermal warnings", "Failed fan, blanking panel missing, hot-aisle recirculation, high inlet temperature", "Fan status, inlet temperature, khaali bays"],
          ["Manager unreachable", "Management network issue, active manager fail, IP conflict", "Manager VIP ping, standby check, manager par console"],
          ["Blades ek saath reboot", "Power event, firmware bug, kam capacity ke saath PSU failure", "Manager event log, PDU/UPS logs, power budget"],
          ["Blades par storage slow", "Oversubscribed uplinks, FC zoning ya multipath problem", "Uplink utilisation, errors, multipath status"],
          ["Redundancy lost alarm", "PSU, fan ya module fail", "Fail hua part jaldi replace; redundancy restore confirm"],
        ]}
        caption="Sabse simple aur sasti check se shuru karo."
      />
      <h3 style={S.h3}>Blade Power On Nahi Ho Raha</h3>
      <p style={S.p}>Kya manager mein blade recognise hua? Kya chassis power budget khatam hai? Kya blade poora seated hai? Blade ko doosre slot mein try karo, aur is slot mein known-good blade lagao.</p>
      <h3 style={S.h3}>Network Connectivity Issue</h3>
      <p style={S.p}>Path trace karo: blade adapter → midplane → I/O module → uplink → ToR. Har hop check karo: link state, errors, VLAN, teaming. Yaad rakho Port A ek bay mein aur Port B doosre mein jaata hai.</p>
      <h3 style={S.h3}>Chassis Management Accessible Nahi</h3>
      <p style={S.p}>Management VLAN aur cables check karo. Kya primary manager fail hua aur standby ne le liya? Kya VIP sahi hai? Blades aam taur par chalte rehte hain — ghabra kar reboot mat karo.</p>
      <h3 style={S.h3}>Thermal Warnings</h3>
      <p style={S.p}>Kaun se fans fail hue? Kya saare khaali bays blank hain? Kya hot air recirculate ho rahi hai? Kya high-power blades ek jagah cluster hain? Rack inlet temperature baseline se kaisa hai?</p>
      <Callout type="best-practice" title="Hardware chhoone se pehle manager log padho">
        Chassis manager power events, fan events aur module resets ko timestamps ke saath record karta hai. Pehle padhne se common galti bachti hai — jab asli problem PSU ya feed ki ho aur healthy blades reseat ho jaate hain.
      </Callout>

      {/* ══════════ 22. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 — Ek PSU fail</h3>
      <p style={S.p}>Alert kehta hai "redundancy lost" lekin kuch down nahi. Baaki PSUs load utha lete hain. Engineers confirm karte hain ki load abhi bhi fit hai, spare mangate ya nikaalte hain, PSU hot-swap karte hain aur redundancy wapas aane ko check karte hain. Risk deri mein hai: replacement se pehle doosra failure blades ko power-cap ya gira sakta hai.</p>
      <h3 style={S.h3}>Scenario 2 — Power feed A chala gaya</h3>
      <p style={S.p}>UPS ya PDU fault feed A hata deta hai. Aadhe PSUs band ho jaate hain. Load feed B par fit ho to kuch nahi badalta. Nahi to manager power cap karta hai ya blades shutdown ho jaate hain. Isliye power budget ko sirf normal state ke liye nahi, one-feed state ke liye bhi test karna chahiye.</p>
      <h3 style={S.h3}>Scenario 3 — Firmware update ke baad I/O module crash</h3>
      <p style={S.p}>Fabric A gir jaata hai. Har blade apne aadhe paths kho deta hai. Sahi teaming aur cross-fabric ToR design ho to OS failover karta hai aur applications chalti rehti hain. Nahi to poora chassis network kho deta hai. Seekh: failover test karo, aur modules ek ek karke update karo.</p>
      <h3 style={S.h3}>Scenario 4 — Midplane fault ya poore chassis ka outage</h3>
      <p style={S.p}>Rare, lekin serious. Chassis ke saare blades down. Capacity ho to HA VMs ko doosre chassis par restart karta hai. Anti-affinity copies wali services up rehti hain. Cross-chassis design isi scenario ke liye bana hai — Fig 6 dekho.</p>
      <h3 style={S.h3}>Scenario 5 — Khaali slot padosi blades ko overheat karta hai</h3>
      <p style={S.p}>Ek blade nikala gaya aur blanking panel nahi lagaya. Garam hawa chhed se recirculate hoti hai; padosi blades throttle karte hain. Fix mein sirf ek blanking panel lagta hai, lekin dhoondhne mein ghante lage. Khaali bays hamesha blank karo.</p>
      <Callout type="interview" title="Failure mindset">
        Chassis chhota lekin concentrated hai. Layers mein socho: component failure (redundancy sambhalti hai), module failure (dual paths sambhalte hain), chassis failure (cross-chassis design sambhalta hai), site failure (DR sambhalta hai).
      </Callout>

      {/* ══════════ 23. TIER ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification facility infrastructure ko cover karta hai — power paths, cooling aur maintainability. Blade chassis ko aap kaise jodte aur place karte ho wahi tay karta hai ki aap facility redundancy ka asal mein fayda utha sakte ho ya nahi.</p>
      <ComparisonTable
        title="Blade Infrastructure — Tier III vs Tier IV Thinking"
        headers={["Area", "Tier III thinking", "Tier IV thinking"]}
        rows={[
          ["Chassis tak power", "Concurrently maintainable: dual feeds (A/B), feeds mein PSUs baante hue, ek path maintenance ke liye band ho sakta hai", "Fault tolerant: poori tarah independent A aur B systems; ek fault kabhi chassis nahi girata"],
          ["Cooling", "N+1 cooling; chassis fans plus containment", "Independent cooling paths; koi single fault inlet conditions nahi bigaadta"],
          ["Network", "Alag ToR switches se redundant I/O modules", "Poori tarah diverse paths, switches aur uplink routes"],
          ["Chassis count", "Critical clusters ke liye kam se kam do chassis, N+1 capacity", "Chassis independent racks/rooms/power paths mein"],
          ["Management", "Redundant managers; dedicated management network", "Monitored failover ke saath independent management paths"],
          ["Maintenance", "Ek time par ek path, ek chassis ya ek module band", "Koi bhi single component service ya fail ho bina service impact ke"],
        ]}
        caption="Sirf conceptual view. Actual implementation project requirements, utility requirements, OEM design aur data center architecture par depend karta hai."
      />
      <p style={S.p}><strong>Practical reality:</strong> Tier III ya IV hall ek chassis ko fault tolerant nahi bana deta. Agar cluster ke dono chassis ek hi rack mein, ek hi A/B feed pair aur ek hi ToR pair par hain, to design phir bhi ek saath fail ho sakta hai. Facility redundancy aur IT placement ko ek system ki tarah design karna chahiye.</p>
      <p style={S.p}>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — hamesha vendor documentation se verify karo. Facility types: <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 24. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <ul style={S.ul}>
        <li><strong>Lifting:</strong> Loaded chassis 100 kg se kaafi zyada ho sakta hai. Lift use karo, jahan allowed ho PSUs aur blades pehle nikaalo, aur akele kabhi mat uthao.</li>
        <li><strong>Electrical:</strong> Chassis high-current feeds use karte hain. Lock-out/tag-out follow karo, de-energised confirm karo, aur rated tools use karo. Unplug karne ke baad bhi thodi der tak PSU ke andar live parts ho sakte hain.</li>
        <li><strong>Hot-swap care:</strong> Ek time par ek PSU ya module replace karo aur agle se pehle redundancy state check karo.</li>
        <li><strong>ESD:</strong> Blades aur mezzanine cards ke liye wrist strap aur antistatic mat.</li>
        <li><strong>Hot surfaces:</strong> Heatsinks aur exhaust areas bahut garam ho sakte hain — thanda hone do.</li>
        <li><strong>Pinch points:</strong> Blades, rails aur chassis edges ungliyan phasa sakte hain.</li>
        <li><strong>Noise:</strong> Chassis fans bahut loud hote hain; dense rows mein hearing protection use karo.</li>
        <li><strong>Fibre optics:</strong> Live fibre ya transceiver port mein kabhi mat dekho.</li>
        <li><strong>Change control:</strong> Firmware, I/O module aur power changes ke liye approved plan, window aur rollback chahiye.</li>
        <li><strong>Security:</strong> Manager aur BMCs par default credentials mat rakho; rack ka physical access limit karo.</li>
      </ul>

      {/* ══════════ 25. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Product Families</h2>
      <ComparisonTable
        title="Blade / Modular Ecosystem — Kaun kya banata hai"
        headers={["Vendor", "Product families ke examples (current status verify karo)", "Notes"]}
        rows={[
          ["HPE", "BladeSystem (c-Class), Synergy (composable)", "Management generation ke hisaab se OneView / Onboard Administrator se"],
          ["Dell Technologies", "PowerEdge M-series chassis (M1000e), PowerEdge MX (modular)", "MX fabric architecture use karta hai; management OpenManage se"],
          ["Cisco", "Fabric Interconnects ke saath UCS B-series, UCS X-Series", "Stateless profiles UCS Manager / Intersight se manage"],
          ["Lenovo", "Flex System, ThinkSystem SN-series", "Current support status check karo"],
          ["Fujitsu, Huawei, Inspur, doosre", "Regional blade aur modular platforms", "Compatibility matrices alag hain"],
          ["Open / hyperscale", "OCP-style sleds aur multi-node chassis", "Classic blades nahi; simple design ke saath shared power aur cooling"],
        ]}
        caption="Product lines badalti rehti hain; kuch generations end of sale ya support tak pahunch chuki hain. Current lifecycle status aur compatibility OEM se hamesha verify karo. Endorsement nahi hai."
      />
      <p style={S.p}>Blades, adapters, I/O modules aur firmware ke liye OEM compatibility matrix use karo. Unlisted combinations support void karte hain aur aksar ajeeb tareeke se fail hote hain.</p>

      {/* ══════════ 26. WHEN NOT BLADE ══════════ */}
      <h2 id="when-not-blade" style={S.h2}>When Blade Is (and Is Not) the Right Choice</h2>
      <ComparisonTable
        title="Blade aur Alternatives ke beech chunna"
        headers={["Situation", "Behtar fit", "Kyun"]}
        rows={[
          ["Bahut saare similar general-purpose servers, cabling ka dard, central profile management", "Blade", "Shared infrastructure aur templates time bachate hain"],
          ["Chhota deployment (kuch servers)", "Rack servers", "Chassis ka fixed cost justify nahi hota"],
          ["GPUs, bahut PCIe cards ya bada local storage chahiye", "Rack servers / purpose-built GPU nodes", "Blades space-constrained hain — GPU article dekho"],
          ["Maximum flexibility, mixed vendors", "Rack servers", "Chassis lock-in nahi"],
          ["Software-defined storage aur compute scale-out", "HCI ya multi-node rack systems", "Disks server nodes mein rehte hain"],
          ["Bahut bade, standardised, tezi se badalte fleets", "Composable / hyperscale designs", "Disaggregation aur automation"],
        ]}
        caption="Sirf decision guide. Hamesha total cost compare karo: hardware, power, cooling, licences, operations aur lifecycle."
      />
      <p style={S.p}>GPU workloads ke liye <TopicLink slug="gpu" variant="inline" /> dekho. Cloud alternatives jahan chassis khud rakhna hi nahi padta, unke liye <TopicLink slug="cloud-vs-data-center" variant="inline" /> dekho.</p>

      {/* ══════════ 27. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"Blade chassis single point of failure hai."</strong> Bilkul nahi. Isme internal redundancy hai, lekin poora chassis ek failure domain hai, isliye critical services ko chassis ke paar phailana chahiye.</li>
        <li><strong>"Zyada PSUs matlab hamesha zyada safety."</strong> Sirf tab jab feeds alag hon aur load bache hue PSUs par fit ho.</li>
        <li><strong>"Blades hamesha sasti hoti hain."</strong> Chassis ek fixed cost hai. Blades scale par aur chassis acche se bhara ho tab jeette hain.</li>
        <li><strong>"I/O modules sirf cables hain."</strong> Kai poore switches hain jinke apne firmware, VLANs aur failure modes hain.</li>
        <li><strong>"Manager down to blades down."</strong> Aam taur par blades chalte rehte hain, lekin visibility aur control chale jaate hain.</li>
        <li><strong>"Khaali slots khule chhod sakte hain."</strong> Khule slots airflow tod dete hain aur padosiyon ko overheat karte hain. Hamesha blanking panels lagao.</li>
        <li><strong>"Oversubscription sirf normal operation mein matter karta hai."</strong> Jab ek I/O module fail ho aur saara traffic doosre se jaaye tab ye aur zyada matter karta hai.</li>
        <li><strong>"Firmware ek ek component alag update ho sakta hai."</strong> OEM validated bundle use karo; mixed versions anjaane faults laate hain.</li>
      </ul>

      {/* ══════════ 28. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Composable aur disaggregated infrastructure:</strong> Compute, memory, storage aur accelerators pools mein, software se compose. CXL aur PCIe fabrics ise zyada practical bana sakte hain.</li>
        <li><strong>Zyada density aur power:</strong> Zyada CPU cores, tez NICs aur accelerators chassis power aur heat badhate hain; modular platforms mein liquid cooling aa rahi hai.</li>
        <li><strong>Faster fabrics:</strong> Blades tak 25/50/100G aur usse aage, storage ke liye RoCE aur NVMe-oF ke saath.</li>
        <li><strong>Redfish aur automation:</strong> API-driven management, infrastructure as code aur automated firmware compliance manual consoles ki jagah le rahe hain.</li>
        <li><strong>Edge aur telco:</strong> Edge sites ke liye kam cables aur remote management wale compact modular chassis.</li>
        <li><strong>HCI aur cloud se competition:</strong> Kai organisations steady workloads ko HCI ya cloud par le jaate hain, blades sirf wahan rakhte hain jahan density aur central management ka fayda ho.</li>
        <li><strong>Lifecycle aur sustainability:</strong> Kai blade generations ke liye bane chassis waste kam karne ke liye, aur power-aware scheduling.</li>
      </ul>

      {/* ══════════ 29. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <p style={S.p}>Is article ke baad recommended order:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> → <TopicLink slug="cpu" variant="inline" /> → <TopicLink slug="ram" variant="inline" /> → <TopicLink slug="gpu" variant="inline" /> → ye Blade Server article.</li>
        <li>Servers group mein agla: <TopicLink slug="virtualization" variant="inline" />, jo samjhata hai ki VMs aur HA blades ke upar kaise chalte hain.</li>
        <li>Networking track: <TopicLink slug="switch" variant="inline" /> → <TopicLink slug="router" variant="inline" /> → <TopicLink slug="load-balancer" variant="inline" />.</li>
        <li>Storage track: <TopicLink slug="das" variant="inline" /> → <TopicLink slug="nas" variant="inline" /> → <TopicLink slug="san" variant="inline" /> → <TopicLink slug="backup" variant="inline" />.</li>
        <li>Facility track: <TopicLink slug="pdu" variant="inline" />, <TopicLink slug="ups" variant="inline" />, <TopicLink slug="containment" variant="inline" />, <TopicLink slug="dcim" variant="inline" />.</li>
      </ul>

      {/* ══════════ 30. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Blade server aur rack server mein key architectural difference kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Blade chassis mein compute blades power, cooling aur networking shared chassis resources se lete hain — per-blade PSU, fans ya external network cards nahi. Rack server self-contained hota hai. Blade: zyada density, kam cabling, centralised management, chassis-level shared failure domain. Rack: independent, flexible, zyada vendor choice, kam initial investment.</p>
      <h3 style={S.h3}>Q2: Shared failure domain kya hai aur ise kaise mitigate karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Chassis ka shared power, cooling, I/O aur management matlab chassis-level issue saare blades ko asar kar sakta hai. Redundant PSUs, fans, management aur I/O modules individual component failures se bachate hain. Mission-critical workloads ke liye VMs ya cluster nodes ko anti-affinity rules se kai chassis mein baanto aur ek chassis outage ke liye capacity rakho.</p>
      <h3 style={S.h3}>Q3: Oversubscription kaise calculate karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Internal blade bandwidth ÷ uplink bandwidth. 10 Gbps ke aath blades aur do 10 Gbps uplinks = 80 ÷ 20 = 4:1. Failure state mein bhi ratio check karo, jab ek I/O module nahi hota.</p>
      <h3 style={S.h3}>Q4: Blades ke do network ports alag I/O modules par kyun hote hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Do independent paths dene ke liye. Port A ek bay mein aur Port B doosre mein jaata hai, har module alag ToR switch ko uplink karta hai, aur OS teaming dono use karti hai. Ek module jaane par blade online rehta hai.</p>
      <h3 style={S.h3}>Q5: Ek chassis ke kai blades ka network ek saath jaaye to pehle kya check karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Kaun sa fabric affected hai (A ya B), phir I/O module health, uplink state, ToR port aur koi recent firmware ya configuration change. Hardware chhoone se pehle chassis manager log padho.</p>
      <h3 style={S.h3}>Q6: Blanking panels kyun important hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Khaali bays thandi hawa ko blades bypass karne dete hain aur garam hawa recirculate karne dete hain, to padosi blades throttle karte hain. Panels active blades se airflow banaye rakhte hain.</p>
      <h3 style={S.h3}>Q7: Stateless blade kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Aisa blade jiski identity (MAC, WWN, UUID, BIOS aur boot settings) profile se aati hai aur jiska OS SAN se boot hota hai. Fail ho to profile spare blade par move karke wahi OS boot karo.</p>
      <h3 style={S.h3}>Q8: Blades kab nahi chunoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Chhote deployments, GPU ya storage-heavy servers, ya jab vendor flexibility density se zyada important ho. Chassis, power, cooling aur lifecycle sahit total cost compare karo.</p>

      {/* ══════════ 31. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Blade server = shared chassis mein compute card; power, cooling, networking aur management chassis se aate hain.</li>
        <li>Blades independence dekar density, kam cables aur central management lete hain.</li>
        <li>Network path hai blade port → midplane → I/O module → uplink → ToR; do bays aur do ToR switches use karo.</li>
        <li>Normal aur failure dono states ke liye oversubscription calculate karo; backups aur live migration jaise peaks ke hisaab se uplinks size karo.</li>
        <li>Chassis shared failure domain hai — internal redundancy components ko bachati hai, cross-chassis design services ko.</li>
        <li>Power per feed aur per phase plan karo, one-feed case test karo, aur PDU ya breaker ratings kabhi cross mat karo.</li>
        <li>Blanking panels, containment aur fan health thermal stability tay karte hain.</li>
        <li>Profiles aur firmware baselines ke liye chassis manager use karo; management plane protect aur backup karo.</li>
        <li>Firmware validated bundles mein aur waves mein update karo — HA pair ke dono chassis ek saath kabhi nahi.</li>
        <li>Jahan density aur central management ka fayda ho wahan blade chuno; flexibility ya accelerators chahiye to rack, HCI ya GPU nodes.</li>
        <li>Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — hamesha vendor documentation se verify karo.</li>
      </ul>

      {/* FAQ — excluded from TOC */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — Rack server fundamentals aur deployment.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Blade chassis ke paar VMs, HA configuration.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — Har blade ke andar processors aur NUMA.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Blades mein memory.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Dense accelerator servers.</li>
        <li><TopicLink slug="switch" variant="inline" /> — I/O modules ke peeche ke network switches.</li>
        <li><TopicLink slug="san" variant="inline" /> — Blades ke liye shared storage.</li>
        <li><TopicLink slug="pdu" variant="inline" /> — Chassis tak power distribution.</li>
      </ul>
    </>
  );
}
