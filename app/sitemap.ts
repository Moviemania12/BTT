import type { MetadataRoute } from "next";

// ═══════════════════════════════════════════════════════════════════════════
// app/sitemap.ts — served at /sitemap.xml
//
// Every URL below maps to a real app/**/page.tsx route. Redirecting URLs
// (/articles, /dc-map, /resources/*, /en/...) and noindex pages (product demo /
// download, newsletter) are intentionally NOT listed.
//
// Bilingual pages: the English page lives at the path, the Hindi page at
// /hi + path. Both entries carry the same en / hi / x-default alternates,
// matching the hreflang pattern used by the article pages.
// ═══════════════════════════════════════════════════════════════════════════

const SITE_URL = "https://behindthetech.in";

// Foundation articles + roadmap — EN at the path, HI at /hi + path
const FOUNDATION_PAIRS: string[] = [
  "/learn/what-is-a-data-center",
  "/learn/data-center-types",
  "/learn/how-the-internet-works",
  "/learn/cloud-vs-data-center",
  "/learn/ai-infrastructure-basics",
];

// Non-IT Infrastructure articles — EN at the path, HI at /hi + path
const NON_IT_PAIRS: string[] = [
  "/learn/non-it/bms-dcim/bms",
  "/learn/non-it/bms-dcim/dcim",
  "/learn/non-it/bms-dcim/ems",
  "/learn/non-it/bms-dcim/scada",
  "/learn/non-it/bms-dcim/sensors",
  "/learn/non-it/cooling/airflow-management",
  "/learn/non-it/cooling/chiller",
  "/learn/non-it/cooling/containment",
  "/learn/non-it/cooling/cooling-tower",
  "/learn/non-it/cooling/crac",
  "/learn/non-it/cooling/pac",
  "/learn/non-it/cooling/rci",
  "/learn/non-it/electrical/battery-bank",
  "/learn/non-it/electrical/dg-set",
  "/learn/non-it/electrical/earthing",
  "/learn/non-it/electrical/grid-supply",
  "/learn/non-it/electrical/ht-yard",
  "/learn/non-it/electrical/lightning-protection",
  "/learn/non-it/electrical/pdu",
  "/learn/non-it/electrical/sts",
  "/learn/non-it/electrical/transformer",
  "/learn/non-it/electrical/ups",
  "/learn/non-it/fire/fm200",
  "/learn/non-it/fire/hydrant",
  "/learn/non-it/fire/novec",
  "/learn/non-it/fire/novec-1250",
  "/learn/non-it/fire/sprinkler",
  "/learn/non-it/fire/vesda",
  "/learn/non-it/security/access-control",
  "/learn/non-it/security/biometrics",
  "/learn/non-it/security/cctv",
  "/learn/non-it/security/mantrap",
  "/learn/non-it/security/visitor-management",
];

// IT Infrastructure articles — EN at the path, HI at /hi + path
const IT_PAIRS: string[] = [
  "/learn/it/cloud/aws",
  "/learn/it/cloud/azure",
  "/learn/it/cloud/gcp",
  "/learn/it/cloud/hybrid-cloud",
  "/learn/it/cloud/multi-cloud",
  "/learn/it/networking/firewall",
  "/learn/it/networking/load-balancer",
  "/learn/it/networking/router",
  "/learn/it/networking/sd-wan",
  "/learn/it/networking/switch",
  "/learn/it/servers/blade-server",
  "/learn/it/servers/cpu",
  "/learn/it/servers/gpu",
  "/learn/it/servers/ram",
  "/learn/it/servers/server-basics",
  "/learn/it/servers/virtualization",
  "/learn/it/storage/backup",
  "/learn/it/storage/das",
  "/learn/it/storage/disaster-recovery",
  "/learn/it/storage/nas",
  "/learn/it/storage/san",
];

// AI Infrastructure articles — EN at the path, HI at /hi + path
const AI_PAIRS: string[] = [
  "/learn/ai/data-centers/ai-cooling",
  "/learn/ai/data-centers/ai-data-center-basics",
  "/learn/ai/data-centers/ai-networking",
  "/learn/ai/data-centers/ai-storage",
  "/learn/ai/data-centers/gpu-cluster",
  "/learn/ai/fundamentals/deep-learning",
  "/learn/ai/fundamentals/generative-ai",
  "/learn/ai/fundamentals/llm",
  "/learn/ai/fundamentals/machine-learning",
  "/learn/ai/fundamentals/what-is-ai-infrastructure",
  "/learn/ai/hardware/ai-accelerators",
  "/learn/ai/hardware/ai-gpu",
  "/learn/ai/hardware/amd-ai-platforms",
  "/learn/ai/hardware/nvidia-architecture",
  "/learn/ai/hardware/tpu",
  "/learn/ai/platforms/anthropic",
  "/learn/ai/platforms/google-gemini",
  "/learn/ai/platforms/meta-ai",
  "/learn/ai/platforms/openai",
];

// Study — EN at the path, HI at /hi + path
const STUDY_PAIRS: string[] = [
  "/study/interview",
  "/study/troubleshooting",
];

// English-only pages that have a Hindi twin route removed (301 → English) or
// not yet translated. Study/Reference data is English-only; roadmap has no real
// Hindi content. No hreflang alternates for these.
const EN_ONLY_PAGES: string[] = [
  "/learn/roadmap",
  "/study/case-studies",
  "/study/checklists",
  "/reference/downloads",
  "/reference/glossary",
  "/reference/standards",
];

// RMU: the article body is still Hinglish on both URLs; the Hindi URL is the
// canonical one until the English translation ships (see rmu/page.tsx).
const RMU_HI_ONLY = "/hi/learn/non-it/electrical/rmu";

// Hub and category index pages (English only)
const HUB_PAGES: string[] = [
  "/learn",
  "/learn/non-it",
  "/learn/non-it/electrical",
  "/learn/non-it/cooling",
  "/learn/non-it/fire",
  "/learn/non-it/security",
  "/learn/non-it/bms-dcim",
  "/learn/it",
  "/learn/it/servers",
  "/learn/it/storage",
  "/learn/it/networking",
  "/learn/it/cloud",
  "/learn/ai",
  "/learn/ai/fundamentals",
  "/learn/ai/hardware",
  "/learn/ai/data-centers",
  "/learn/ai/platforms",
];

// Engineering calculators + interactive tools (English only)
const TOOL_PAGES: string[] = [
  "/tools",
  "/tools/pue-calculator",
  "/tools/rci-calculator",
  "/tools/cooling-calculator",
  "/tools/unit-converter",
  "/tools/ups-runtime-calculator",
  "/tools/ups-load-calculator",
  "/tools/battery-ah-calculator",
  "/tools/battery-quantity-calculator",
  "/tools/battery-string-calculator",
  "/tools/ups-redundancy-calculator",
  "/tools/data-center-ups-designer",
  "/data-center-map",
];

// About, trust and legal pages (English only)
const SITE_PAGES: string[] = [
  "/about",
  "/about/mission",
  "/about/kumar-anil",
  "/about/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/disclaimer",
  "/editorial-policy",
  "/content-policy",
  "/fact-checking-policy",
  "/correction-policy",
  "/affiliate-disclosure",
  "/advertising-disclosure",
  "/accessibility",
];

function single(path: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  return { url: `${SITE_URL}${path}`, lastModified };
}

function bilingual(enPath: string, lastModified: Date): MetadataRoute.Sitemap {
  const en = `${SITE_URL}${enPath}`;
  const hi = `${SITE_URL}/hi${enPath}`;
  const alternates = { languages: { en, hi, "x-default": en } };
  return [
    { url: en, lastModified, alternates },
    { url: hi, lastModified, alternates },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },

    ...FOUNDATION_PAIRS.flatMap((p) => bilingual(p, now)),
    ...HUB_PAGES.map((p) => single(p, now)),
    ...EN_ONLY_PAGES.map((p) => single(p, now)),
    single(RMU_HI_ONLY, now),
    ...NON_IT_PAIRS.flatMap((p) => bilingual(p, now)),
    ...IT_PAIRS.flatMap((p) => bilingual(p, now)),
    ...AI_PAIRS.flatMap((p) => bilingual(p, now)),
    ...STUDY_PAIRS.flatMap((p) => bilingual(p, now)),
    ...TOOL_PAGES.map((p) => single(p, now)),
    ...SITE_PAGES.map((p) => single(p, now)),

    { url: `${SITE_URL}/products/btt-employee-manager`, lastModified: now, priority: 0.9 },
  ];
}
