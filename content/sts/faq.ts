export interface FaqEntry { question: string; answer: string; }

export const stsFaq: FaqEntry[] = [
  {
    question: "What is an STS and why is it used in a Data Center?",
    answer:
      "A Static Transfer Switch (STS) is a solid-state switching device that transfers a single-corded load between two independent power sources in 2–4 milliseconds. In the Data Center it is used for devices that do not support dual power input — the STS gives them the protection of a dual-bus architecture without a dual-corded PSU.",
  },
  {
    question: "What is the main difference between an STS and an ATS?",
    answer:
      "An STS (Static Transfer Switch) has SCR/Thyristor solid-state switching — transfer time 2–4 ms, no moving parts. An ATS (Automatic Transfer Switch) has mechanical contactors — transfer time 100–500 ms. The STS is preferred for IT loads because a 100ms+ interruption can make servers reboot. The ATS is suitable for generator changeover, where a brief interruption is acceptable.",
  },
  {
    question: "Why is the STS transfer time 4ms?",
    answer:
      "SCR (Silicon Controlled Rectifier) thyristors can switch in microseconds. But the STS first has to verify source synchronization, detect the failure of the preferred source, and confirm that the alternate source is ready. All these steps together take 2–4ms. This time is completely invisible to IT equipment because server PSU capacitors absorb an interruption of milliseconds.",
  },
  {
    question: "What is the difference between break-before-make and make-before-break?",
    answer:
      "In break-before-make, the active source disconnects first, then the new source connects — there is a brief power gap. In make-before-break, the new source connects first, then the old source disconnects — zero interruption. The STS uses the make-before-break strategy, but only when both sources are synchronized. If there is no synchronization, a momentary break-before-make is used — in this case a brief interruption is possible.",
  },
  {
    question: "Why is phase synchronization mandatory for an STS?",
    answer:
      "If the output voltages of Source A and Source B are out-of-phase and the STS does make-before-break, both sources will momentarily be connected to one load. The voltage difference will cause an extremely high circulating current to flow — this can damage both the STS SCRs and connected equipment. That is why the STS always verifies the phase angle first — it does a seamless make-before-break transfer only after synchronization is confirmed.",
  },
  {
    question: "Why does an STS have a maintenance bypass?",
    answer:
      "The STS SCR modules, control electronics and internal components can develop a fault at any time or need replacement for service. Without a maintenance bypass, servicing the STS is impossible without interrupting power to the load. The maintenance bypass is a mechanical switch or contactor that connects the load directly to the source, completely bypassing the STS. It provides safe isolation during planned maintenance.",
  },
  {
    question: "Why use an STS for a single-corded load instead of a dual-corded PSU?",
    answer:
      "Some legacy servers, network switches and specialized equipment support only a single power input — there is no dual-corded PSU option for them at all. The STS gives such single-corded equipment the protection of a dual-bus architecture. Additionally, in some cases a dual-corded upgrade is cost-prohibitive — the STS is an economical alternative.",
  },
  {
    question: "What happens if an STS fails?",
    answer:
      "Modern STS failure modes include: (1) SCR failure — typically 'stuck closed' or 'stuck open'. In stuck closed, the load keeps running but transfer becomes impossible. In stuck open, the load loses power. (2) Control electronics failure — the STS can go into manual bypass mode. (3) Communication fault — an alarm is generated but operation continues. That is why an STS should always have a manual bypass switch.",
  },
  {
    question: "How does an STS decide the preferred source?",
    answer:
      "An STS has programmable source priority — typically Source A preferred, Source B alternate. After priority is configured, the STS always stays on the preferred source if it is within specification. If the preferred source fails or goes out-of-spec, it automatically transfers to the alternate source. When the preferred source is restored, the STS can optionally 'auto-retransfer' or wait for operator action — this is configurable.",
  },
  {
    question: "How do dual UPS and STS architecture work in Tier IV?",
    answer:
      "In Tier IV: UPS-A → PDU-A (Port A for dual-corded equipment). UPS-B → PDU-B (Port B for dual-corded equipment). But for single-corded equipment: UPS-A and UPS-B are both inputs of the STS. The STS output goes to the single-corded load. If UPS-A fails, the STS transfers to UPS-B in 2–4ms. Complete path redundancy is achieved even for single-corded loads.",
  },
  {
    question: "How is an STS sized?",
    answer:
      "An STS is sized on the basis of rated current. Basic formula: STS current rating = (Load kVA × 1000) ÷ (Voltage × PF × √3 for 3-phase). Typically a 10–20% margin is added for future growth. The STS voltage rating should match the UPS output voltage. Standard sizes: 16A, 32A, 63A, 100A, 250A, 400A, 630A per phase. Data Center standard: 3-phase STS, typically in the 32A–250A range.",
  },
  {
    question: "What is checked during STS commissioning?",
    answer:
      "Commissioning checklist: (1) Both sources energized and within spec. (2) Phase synchronization verified between Source A and B. (3) Preferred source set correctly. (4) Transfer test — manually interrupt the preferred source, verify automatic transfer in < 4ms. (5) Retransfer test — restore the preferred source, verify retransfer behavior. (6) Manual bypass test. (7) Alarm tests — overvoltage, undervoltage, overtemperature. (8) Communication/SNMP connectivity test.",
  },
  {
    question: "What happens on an STS overload?",
    answer:
      "An STS has a defined overload curve — typically 150% for 30 seconds, 200% for a few cycles. When the overload limit is exceeded, the STS raises an alarm and/or can engage manual bypass mode. On a severe overload or short circuit, the upstream breaker trips. The STS itself is not a circuit breaker — upstream protection must be coordinated with the STS rating.",
  },
  {
    question: "What is the preventive maintenance schedule of an STS?",
    answer:
      "Quarterly: Visual inspection, alarms check, verify source voltages, communication test. Half-yearly: Full transfer test (source simulation), SCR temperature check, torque verification on connections. Annually: Complete functional test including manual bypass operation, firmware update if available, cleaning of internal components, detailed inspection of SCR modules. OEM service typically annual recommended.",
  },
  {
    question: "What is the fundamental difference between an STS and a UPS?",
    answer:
      "A UPS converts power — AC to DC to AC — and provides complete power conditioning. A UPS has a battery — it provides offline backup. An STS only switches — no energy storage, no power conversion. An STS works only when an alternate source is available; if both sources fail, the STS can do nothing. UPS and STS are complementary technologies — typically both are used together.",
  },
];
