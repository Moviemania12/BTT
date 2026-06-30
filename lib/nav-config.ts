/**
 * nav-config.ts — BTT Navigation Configuration
 *
 * This file defines the complete structure of the navbar, mega menus,
 * mobile drawer, and all navigation items across the platform.
 *
 * It imports from topics.ts and adds navigation-specific metadata:
 * column groupings, icons, descriptions, and display order.
 *
 * ADDING A NEW NAV ITEM:
 *   1. Ensure the topic exists in topics.ts
 *   2. Add it to the appropriate MegaMenuColumn below
 *   3. The [SOON] badge, href, and status are derived automatically
 *      from the topic registry — no duplication needed.
 *
 * STRUCTURE:
 *   NAV_ITEMS          → top-level navbar items (8 items)
 *   MEGA_MENUS         → full mega menu config per nav item
 *   MOBILE_NAV         → mobile drawer structure (mirrors MEGA_MENUS)
 *   TOOLS_NAV          → tools submenu
 *   RESOURCES_NAV      → resources submenu
 *   ABOUT_NAV          → about submenu
 */

import {
  TOPICS,
  getTopicUrl,
  type Topic,
  type Track,
  type TopicCategory,
} from "./topics";
import { getAllCalculators } from "@/lib/engineering/registry";

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single link in a mega menu or drawer */
export interface NavLink {
  label: string;
  href: string;

  /**
   * Derived from topic registry.
   * true  = render with [SOON] badge, disable click
   * false = normal clickable link
   */
  comingSoon: boolean;

  /** Emoji icon — shown in mobile drawer and DC Map */
  icon?: string;

  /** Optional description — used in LEARN mega menu featured items */
  description?: string;
}

/** A column inside a mega menu panel */
export interface MegaMenuColumn {
  /** Column heading shown in neon-blue mono uppercase */
  heading: string;

  /** Emoji — shown before heading on mobile */
  icon: string;

  /** Accent color for this column's hover states (rgba values only) */
  accentRgb: string;

  /** Optional link to the category index page */
  categoryHref?: string;

  links: NavLink[];
}

/** Full mega menu panel for one top-level nav item */
export interface MegaMenu {
  /** Panel width behavior */
  width: "full" | "medium" | "narrow";

  columns: MegaMenuColumn[];

  /**
   * Optional bottom banner row — spans full panel width.
   * Used for BMS/DCIM in Non-IT, AI Ops in AI Infra, etc.
   */
  bottomBanner?: {
    icon: string;
    heading: string;
    links: NavLink[];
  };

  /**
   * Optional featured callout — shown right of columns.
   * Used in LEARN menu for the Roadmap card.
   */
  featuredCard?: {
    icon: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}

/** A top-level item in the navbar */
export interface NavItem {
  id: string;
  label: string;

  /**
   * If href is set, this is a direct link (no dropdown).
   * If megaMenu is set, this triggers a mega menu panel.
   */
  href?: string;

  megaMenu?: MegaMenu;

  /**
   * Special visual treatment.
   * "badge" = pill with neon-blue border (used for DC Map)
   * "default" = standard nav link
   */
  variant?: "default" | "badge";
}

// ─── Helper: build NavLink from topic slug ────────────────────────────────────

function topicLink(slug: string): NavLink {
  const topic = TOPICS[slug];
  if (!topic) {
    // This should never happen in production — it means a slug in nav-config
    // doesn't exist in topics.ts. Fail loudly in development.
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.error(`[nav-config] Topic not found: "${slug}". Add it to topics.ts.`);
    }
    return {
      label: slug,
      href: "#",
      comingSoon: true,
    };
  }

  return {
    label: topic.title,
    href: getTopicUrl(topic),
    comingSoon: topic.status !== "published",
    icon: topic.icon,
    description: topic.description,
  };
}

/** Build multiple NavLinks from an array of slugs */
function topicLinks(slugs: string[]): NavLink[] {
  return slugs.map(topicLink);
}

/** Build a NavLink for a static page (not a topic) */
function staticLink(
  label: string,
  href: string,
  icon?: string,
  description?: string
): NavLink {
  return { label, href, comingSoon: false, icon, description };
}

// ─── Helper: append calculator-registry entries to an existing link list ─────
//
// Used to MERGE registry-driven calculators (lib/engineering/registry) onto
// existing hand-written tool links (e.g. PUE, RCI, Cooling, Unit Converter)
// without removing or duplicating anything. Existing entries are matched by
// href — if a registry calculator's route already has a manual entry, the
// manual one wins and the registry entry is skipped, so this never produces
// duplicate menu rows.

function appendCalculatorLinks(existing: NavLink[]): NavLink[] {
  const existingHrefs = new Set(existing.map((link) => link.href));
  const fromRegistry: NavLink[] = getAllCalculators()
    .filter((calc) => !existingHrefs.has(calc.route))
    .map((calc) => ({
      label: calc.title,
      href: calc.route,
      comingSoon: false,
      icon: "🧮",
      description: calc.description,
    }));
  return [...existing, ...fromRegistry];
}

// ─── LEARN Mega Menu ──────────────────────────────────────────────────────────

const LEARN_MENU: MegaMenu = {
  width: "medium",
  columns: [
    {
      heading: "Start Here",
      icon: "🚀",
      accentRgb: "0,212,255",
      categoryHref: "/learn",
      links: [
        ...topicLinks([
          "what-is-a-data-center",
          "data-center-types",
          "how-the-internet-works",
          "cloud-vs-data-center",
          "ai-infrastructure-basics",
        ]),
      ],
    },
    {
      heading: "Guided Learning",
      icon: "🗺️",
      accentRgb: "0,255,204",
      links: [
        staticLink("Learning Roadmap", "/learn/roadmap", "📍", "Follow the complete Non-IT → IT → AI learning path"),
        staticLink("Non-IT Track", "/learn/non-it", "⚡", "Start with electrical, cooling, fire, and security"),
        staticLink("IT Infrastructure Track", "/learn/it", "🖧", "Servers, storage, networking, and cloud"),
        staticLink("AI Infrastructure Track", "/learn/ai", "🤖", "AI hardware, GPU clusters, and operations"),
      ],
    },
  ],
  featuredCard: {
    icon: "📍",
    title: "Start Your Learning Path",
    description:
      "Follow our structured roadmap from Data Center Basics through Non-IT, IT, and AI Infrastructure.",
    href: "/learn/roadmap",
    cta: "View Roadmap →",
  },
};

// ─── NON-IT INFRASTRUCTURE Mega Menu ─────────────────────────────────────────

const NON_IT_MENU: MegaMenu = {
  width: "full",
  columns: [
    {
      heading: "Electrical",
      icon: "⚡",
      accentRgb: "0,212,255",
      categoryHref: "/learn/non-it/electrical",
      links: topicLinks([
        "grid-supply",
        "ht-yard",
        "rmu",
        "transformer",
        "dg-set",
        "ups",
        "battery-bank",
        "sts",
        "pdu",
        "earthing",
        "lightning-protection",
      ]),
    },
    {
      heading: "Cooling",
      icon: "❄️",
      accentRgb: "0,255,204",
      categoryHref: "/learn/non-it/cooling",
      links: topicLinks([
        "pac",
        "crac",
        "chiller",
        "cooling-tower",
        "containment",
        "airflow-management",
        "rci",
      ]),
    },
    {
      heading: "Fire Protection",
      icon: "🔥",
      accentRgb: "255,100,0",
      categoryHref: "/learn/non-it/fire",
      links: topicLinks([
        "vesda",
        "fm200",
        "novec-1250",
        "novec",
        "hydrant",
        "sprinkler",
      ]),
    },
    {
      heading: "Physical Security",
      icon: "🔒",
      accentRgb: "160,100,255",
      categoryHref: "/learn/non-it/security",
      links: topicLinks([
        "cctv",
        "access-control",
        "biometrics",
        "mantrap",
        "visitor-management",
      ]),
    },
  ],
  bottomBanner: {
    icon: "🖥️",
    heading: "BMS / DCIM",
    links: topicLinks(["bms", "ems", "dcim", "scada", "sensors"]),
  },
};

// ─── IT INFRASTRUCTURE Mega Menu ─────────────────────────────────────────────

const IT_MENU: MegaMenu = {
  width: "full",
  columns: [
    {
      heading: "Servers",
      icon: "🖧",
      accentRgb: "0,212,255",
      categoryHref: "/learn/it/servers",
      links: topicLinks([
        "server-basics",
        "cpu",
        "ram",
        "gpu",
        "blade-server",
        "virtualization",
      ]),
    },
    {
      heading: "Storage",
      icon: "💾",
      accentRgb: "0,200,180",
      categoryHref: "/learn/it/storage",
      links: topicLinks([
        "das",
        "nas",
        "san",
        "backup",
        "disaster-recovery",
      ]),
    },
    {
      heading: "Networking",
      icon: "🌐",
      accentRgb: "100,180,255",
      categoryHref: "/learn/it/networking",
      links: topicLinks([
        "switch",
        "router",
        "firewall",
        "load-balancer",
        "sd-wan",
      ]),
    },
    {
      heading: "Cloud",
      icon: "☁️",
      accentRgb: "255,200,0",
      categoryHref: "/learn/it/cloud",
      links: topicLinks([
        "aws",
        "azure",
        "gcp",
        "hybrid-cloud",
        "multi-cloud",
      ]),
    },
  ],
};

// ─── AI INFRASTRUCTURE Mega Menu ─────────────────────────────────────────────

const AI_MENU: MegaMenu = {
  width: "full",
  columns: [
    {
      heading: "AI Fundamentals",
      icon: "🧠",
      accentRgb: "160,100,255",
      categoryHref: "/learn/ai/fundamentals",
      links: topicLinks([
        "what-is-ai",
        "machine-learning",
        "deep-learning",
        "generative-ai",
        "llm",
      ]),
    },
    {
      heading: "AI Hardware",
      icon: "⚙️",
      accentRgb: "0,212,255",
      categoryHref: "/learn/ai/hardware",
      links: topicLinks([
        "ai-gpu",
        "tpu",
        "ai-accelerators",
        "nvidia-architecture",
        "amd-ai-platforms",
      ]),
    },
    {
      heading: "AI Data Centers",
      icon: "🏢",
      accentRgb: "0,255,204",
      categoryHref: "/learn/ai/data-centers",
      links: topicLinks([
        "ai-data-center-basics",
        "gpu-cluster",
        "ai-networking",
        "ai-storage",
        "ai-cooling",
      ]),
    },
    {
      heading: "AI Platforms",
      icon: "🤖",
      accentRgb: "255,100,150",
      categoryHref: "/learn/ai/platforms",
      links: topicLinks([
        "openai",
        "anthropic",
        "google-gemini",
        "meta-ai",
        "mistral",
      ]),
    },
  ],
  bottomBanner: {
    icon: "🔧",
    heading: "AI Operations",
    links: topicLinks(["mlops", "ai-monitoring", "ai-security", "ai-governance"]),
  },
};

// ─── TOOLS Mega Menu ──────────────────────────────────────────────────────────

const TOOLS_MENU: MegaMenu = {
  width: "narrow",
  columns: [
    {
      heading: "Calculators",
      icon: "🔢",
      accentRgb: "0,212,255",
      categoryHref: "/tools",
      links: appendCalculatorLinks([
        staticLink("PUE Calculator", "/tools/pue-calculator", "⚡", "Calculate Power Usage Effectiveness"),
        staticLink("RCI Calculator", "/tools/rci-calculator", "❄️", "Calculate Rack Cooling Index"),
        staticLink("UPS Runtime Calculator", "/tools/ups-runtime-calculator", "🔋", "Calculate battery runtime under load"),
        staticLink("Cooling Calculator", "/tools/cooling-calculator", "🌡️", "Size your cooling requirements"),
        staticLink("Unit Converter", "/tools/unit-converter", "🔄", "Convert kW, BTU, tons of cooling, and more"),
      ]),
    },
  ],
};

// ─── RESOURCES Mega Menu ─────────────────────────────────────────────────────

const RESOURCES_MENU: MegaMenu = {
  width: "medium",
  columns: [
    {
      heading: "Study",
      icon: "📚",
      accentRgb: "0,212,255",
      links: [
        staticLink("Interview Questions", "/resources/interview-questions", "💼"),
        staticLink("Troubleshooting Guides", "/resources/troubleshooting-guides", "🔧"),
        staticLink("Case Studies", "/resources/case-studies", "📊"),
        staticLink("Checklists", "/resources/checklists", "✅"),
      ],
    },
    {
      heading: "Reference",
      icon: "📖",
      accentRgb: "0,255,204",
      links: [
        staticLink("Glossary", "/resources/glossary", "📖"),
        staticLink("Standards", "/resources/standards", "📐"),
        staticLink("Downloads", "/resources/downloads", "⬇️"),
        staticLink("Newsletter", "/resources/newsletter", "📬"),
      ],
    },
  ],
};

// ─── ABOUT Mega Menu ──────────────────────────────────────────────────────────

const ABOUT_MENU: MegaMenu = {
  width: "narrow",
  columns: [
    {
      heading: "Behind The Tech",
      icon: "⬡",
      accentRgb: "0,212,255",
      links: [
        staticLink("About BTT", "/about", "⬡", "India's Data Center Knowledge Platform"),
        staticLink("Kumar Anil", "/about/kumar-anil", "👤", "Project Manager – Data Center"),
        staticLink("Mission", "/about/mission", "🎯"),
        staticLink("Contact", "/about/contact", "✉️"),
      ],
    },
  ],
};

// ─── Master Navigation Structure ─────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  {
    id: "learn",
    label: "Learn",
    megaMenu: LEARN_MENU,
    variant: "default",
  },
  {
    id: "non-it",
    label: "Non-IT",
    megaMenu: NON_IT_MENU,
    variant: "default",
  },
  {
    id: "it-infra",
    label: "IT Infra",
    megaMenu: IT_MENU,
    variant: "default",
  },
  {
    id: "ai-infra",
    label: "AI Infra",
    megaMenu: AI_MENU,
    variant: "default",
  },
  {
    id: "dc-map",
    label: "DC Map",
    href: "/dc-map",
    variant: "badge",      // renders as neon-blue pill, no dropdown
  },
  {
    id: "tools",
    label: "Tools",
    megaMenu: TOOLS_MENU,
    variant: "default",
  },
  {
    id: "resources",
    label: "Resources",
    megaMenu: RESOURCES_MENU,
    variant: "default",
  },
  {
    id: "about",
    label: "About",
    megaMenu: ABOUT_MENU,
    variant: "default",
  },
];

// ─── Mobile Drawer Structure ──────────────────────────────────────────────────
//
// The mobile drawer mirrors NAV_ITEMS but with accordion-friendly structure.
// Each MobileSection can have nested MobileSection children (2 levels max).

export interface MobileSection {
  id: string;
  label: string;
  icon: string;
  href?: string;             // if set: leaf link, no accordion
  variant?: "default" | "badge" | "cta";
  children?: MobileSection[];
}

export const MOBILE_NAV: MobileSection[] = [
  {
    id: "learn",
    label: "Learn",
    icon: "🚀",
    children: [
      { id: "what-is-a-data-center", label: "What is a Data Center", icon: "🏢", href: getTopicUrl(TOPICS["what-is-a-data-center"]) },
      { id: "data-center-types",     label: "Data Center Types",     icon: "🗂️", href: getTopicUrl(TOPICS["data-center-types"]) },
      { id: "how-the-internet-works", label: "How the Internet Works", icon: "🌐", href: getTopicUrl(TOPICS["how-the-internet-works"]) },
      { id: "cloud-vs-dc",           label: "Cloud vs Data Center",  icon: "☁️", href: getTopicUrl(TOPICS["cloud-vs-data-center"]) },
      { id: "ai-basics",             label: "AI Infrastructure Basics", icon: "🤖", href: getTopicUrl(TOPICS["ai-infrastructure-basics"]) },
      { id: "roadmap",               label: "Learning Roadmap",      icon: "📍", href: "/learn/roadmap" },
    ],
  },
  {
    id: "non-it",
    label: "Non-IT Infrastructure",
    icon: "🏭",
    children: [
      {
        id: "electrical",
        label: "Electrical",
        icon: "⚡",
        children: [
          { id: "grid-supply",          label: "Grid Supply",           icon: "⚡", href: getTopicUrl(TOPICS["grid-supply"]) },
          { id: "ht-yard",              label: "HT Yard",               icon: "🔌", href: getTopicUrl(TOPICS["ht-yard"]) },
          { id: "rmu",                  label: "RMU",                   icon: "🔁", href: getTopicUrl(TOPICS["rmu"]) },
          { id: "transformer",          label: "Transformer",           icon: "🔋", href: getTopicUrl(TOPICS["transformer"]) },
          { id: "dg-set",              label: "DG Set",                icon: "🛢️", href: getTopicUrl(TOPICS["dg-set"]) },
          { id: "ups",                  label: "UPS",                   icon: "🔋", href: getTopicUrl(TOPICS["ups"]) },
          { id: "battery-bank",         label: "Battery Bank",          icon: "🔋", href: getTopicUrl(TOPICS["battery-bank"]) },
          { id: "sts",                  label: "STS",                   icon: "🔀", href: getTopicUrl(TOPICS["sts"]) },
          { id: "pdu",                  label: "PDU",                   icon: "🔌", href: getTopicUrl(TOPICS["pdu"]) },
          { id: "earthing",             label: "Earthing",              icon: "🌍", href: getTopicUrl(TOPICS["earthing"]) },
          { id: "lightning-protection", label: "Lightning Protection",  icon: "⛈️", href: getTopicUrl(TOPICS["lightning-protection"]) },
        ],
      },
      {
        id: "cooling",
        label: "Cooling",
        icon: "❄️",
        children: [
          { id: "pac",               label: "PAC",                icon: "❄️", href: getTopicUrl(TOPICS["pac"]) },
          { id: "crac",              label: "CRAC",               icon: "🌬️", href: getTopicUrl(TOPICS["crac"]) },
          { id: "chiller",           label: "Chiller",            icon: "🧊", href: getTopicUrl(TOPICS["chiller"]) },
          { id: "cooling-tower",     label: "Cooling Tower",      icon: "🏭", href: getTopicUrl(TOPICS["cooling-tower"]) },
          { id: "containment",       label: "Containment",        icon: "🚧", href: getTopicUrl(TOPICS["containment"]) },
          { id: "airflow-mgmt",      label: "Airflow Management", icon: "💨", href: getTopicUrl(TOPICS["airflow-management"]) },
          { id: "rci",               label: "RCI",                icon: "📊", href: getTopicUrl(TOPICS["rci"]) },
        ],
      },
      {
        id: "fire",
        label: "Fire Protection",
        icon: "🔥",
        children: [
          { id: "vesda",       label: "VESDA",       icon: "🔍", href: getTopicUrl(TOPICS["vesda"]) },
          { id: "fm200",       label: "FM200",       icon: "🧯", href: getTopicUrl(TOPICS["fm200"]) },
          { id: "novec-1250",  label: "Novec 1250",  icon: "🧪", href: getTopicUrl(TOPICS["novec-1250"]) },
          { id: "novec",       label: "Novec",       icon: "💧", href: getTopicUrl(TOPICS["novec"]) },
          { id: "hydrant",     label: "Hydrant",     icon: "🚒", href: getTopicUrl(TOPICS["hydrant"]) },
          { id: "sprinkler",   label: "Sprinkler",   icon: "💦", href: getTopicUrl(TOPICS["sprinkler"]) },
        ],
      },
      {
        id: "security",
        label: "Physical Security",
        icon: "🔒",
        children: [
          { id: "cctv",               label: "CCTV",               icon: "📷", href: getTopicUrl(TOPICS["cctv"]) },
          { id: "access-control",     label: "Access Control",     icon: "🗝️", href: getTopicUrl(TOPICS["access-control"]) },
          { id: "biometrics",         label: "Biometrics",         icon: "👁️", href: getTopicUrl(TOPICS["biometrics"]) },
          { id: "mantrap",            label: "Mantrap",            icon: "🚪", href: getTopicUrl(TOPICS["mantrap"]) },
          { id: "visitor-management", label: "Visitor Management", icon: "📋", href: getTopicUrl(TOPICS["visitor-management"]) },
        ],
      },
      {
        id: "bms-dcim",
        label: "BMS / DCIM",
        icon: "🖥️",
        children: [
          { id: "bms",     label: "BMS",     icon: "🖥️", href: getTopicUrl(TOPICS["bms"]) },
          { id: "ems",     label: "EMS",     icon: "⚡", href: getTopicUrl(TOPICS["ems"]) },
          { id: "dcim",    label: "DCIM",    icon: "📊", href: getTopicUrl(TOPICS["dcim"]) },
          { id: "scada",   label: "SCADA",   icon: "🎛️", href: getTopicUrl(TOPICS["scada"]) },
          { id: "sensors", label: "Sensors", icon: "📡", href: getTopicUrl(TOPICS["sensors"]) },
        ],
      },
    ],
  },
  {
    id: "it-infra",
    label: "IT Infrastructure",
    icon: "🖧",
    children: [
      {
        id: "servers",
        label: "Servers",
        icon: "🖧",
        children: [
          { id: "server-basics",  label: "Server Basics",  icon: "🖧", href: getTopicUrl(TOPICS["server-basics"]) },
          { id: "cpu",            label: "CPU",            icon: "⚙️", href: getTopicUrl(TOPICS["cpu"]) },
          { id: "ram",            label: "RAM",            icon: "💾", href: getTopicUrl(TOPICS["ram"]) },
          { id: "gpu",            label: "GPU",            icon: "🎮", href: getTopicUrl(TOPICS["gpu"]) },
          { id: "blade-server",   label: "Blade Server",   icon: "📦", href: getTopicUrl(TOPICS["blade-server"]) },
          { id: "virtualization", label: "Virtualization", icon: "🔲", href: getTopicUrl(TOPICS["virtualization"]) },
        ],
      },
      {
        id: "storage",
        label: "Storage",
        icon: "💾",
        children: [
          { id: "das",              label: "DAS",              icon: "💿", href: getTopicUrl(TOPICS["das"]) },
          { id: "nas",              label: "NAS",              icon: "🗄️", href: getTopicUrl(TOPICS["nas"]) },
          { id: "san",              label: "SAN",              icon: "🖥️", href: getTopicUrl(TOPICS["san"]) },
          { id: "backup",           label: "Backup",           icon: "💾", href: getTopicUrl(TOPICS["backup"]) },
          { id: "disaster-recovery", label: "Disaster Recovery", icon: "🆘", href: getTopicUrl(TOPICS["disaster-recovery"]) },
        ],
      },
      {
        id: "networking",
        label: "Networking",
        icon: "🌐",
        children: [
          { id: "switch",        label: "Switch",        icon: "🔀", href: getTopicUrl(TOPICS["switch"]) },
          { id: "router",        label: "Router",        icon: "📡", href: getTopicUrl(TOPICS["router"]) },
          { id: "firewall",      label: "Firewall",      icon: "🔥", href: getTopicUrl(TOPICS["firewall"]) },
          { id: "load-balancer", label: "Load Balancer", icon: "⚖️", href: getTopicUrl(TOPICS["load-balancer"]) },
          { id: "sd-wan",        label: "SD-WAN",        icon: "🌐", href: getTopicUrl(TOPICS["sd-wan"]) },
        ],
      },
      {
        id: "cloud",
        label: "Cloud",
        icon: "☁️",
        children: [
          { id: "aws",          label: "AWS",          icon: "☁️", href: getTopicUrl(TOPICS["aws"]) },
          { id: "azure",        label: "Azure",        icon: "🔷", href: getTopicUrl(TOPICS["azure"]) },
          { id: "gcp",          label: "GCP",          icon: "🌈", href: getTopicUrl(TOPICS["gcp"]) },
          { id: "hybrid-cloud", label: "Hybrid Cloud", icon: "🔗", href: getTopicUrl(TOPICS["hybrid-cloud"]) },
          { id: "multi-cloud",  label: "Multi Cloud",  icon: "☁️", href: getTopicUrl(TOPICS["multi-cloud"]) },
        ],
      },
    ],
  },
  {
    id: "ai-infra",
    label: "AI Infrastructure",
    icon: "🤖",
    children: [
      {
        id: "ai-fundamentals",
        label: "AI Fundamentals",
        icon: "🧠",
        children: [
          { id: "what-is-ai",     label: "What is AI",     icon: "🧠", href: getTopicUrl(TOPICS["what-is-ai"]) },
          { id: "machine-learning", label: "Machine Learning", icon: "📈", href: getTopicUrl(TOPICS["machine-learning"]) },
          { id: "deep-learning",  label: "Deep Learning",  icon: "🔗", href: getTopicUrl(TOPICS["deep-learning"]) },
          { id: "generative-ai",  label: "Generative AI",  icon: "✨", href: getTopicUrl(TOPICS["generative-ai"]) },
          { id: "llm",            label: "LLMs",           icon: "💬", href: getTopicUrl(TOPICS["llm"]) },
        ],
      },
      {
        id: "ai-hardware",
        label: "AI Hardware",
        icon: "⚙️",
        children: [
          { id: "ai-gpu",              label: "GPU",               icon: "🎮", href: getTopicUrl(TOPICS["ai-gpu"]) },
          { id: "tpu",                 label: "TPU",               icon: "🔮", href: getTopicUrl(TOPICS["tpu"]) },
          { id: "ai-accelerators",     label: "AI Accelerators",   icon: "⚡", href: getTopicUrl(TOPICS["ai-accelerators"]) },
          { id: "nvidia-architecture", label: "NVIDIA Architecture", icon: "🟢", href: getTopicUrl(TOPICS["nvidia-architecture"]) },
          { id: "amd-ai-platforms",    label: "AMD AI Platforms",  icon: "🔴", href: getTopicUrl(TOPICS["amd-ai-platforms"]) },
        ],
      },
      {
        id: "ai-data-centers",
        label: "AI Data Centers",
        icon: "🏢",
        children: [
          { id: "ai-dc-basics",   label: "AI DC Basics",   icon: "🏢", href: getTopicUrl(TOPICS["ai-data-center-basics"]) },
          { id: "gpu-cluster",    label: "GPU Cluster",    icon: "🔲", href: getTopicUrl(TOPICS["gpu-cluster"]) },
          { id: "ai-networking",  label: "AI Networking",  icon: "🌐", href: getTopicUrl(TOPICS["ai-networking"]) },
          { id: "ai-storage",     label: "AI Storage",     icon: "💾", href: getTopicUrl(TOPICS["ai-storage"]) },
          { id: "ai-cooling",     label: "AI Cooling",     icon: "❄️", href: getTopicUrl(TOPICS["ai-cooling"]) },
        ],
      },
      {
        id: "ai-platforms",
        label: "AI Platforms",
        icon: "🤖",
        children: [
          { id: "openai",        label: "OpenAI",        icon: "⬛", href: getTopicUrl(TOPICS["openai"]) },
          { id: "anthropic",     label: "Anthropic",     icon: "🔶", href: getTopicUrl(TOPICS["anthropic"]) },
          { id: "google-gemini", label: "Google Gemini", icon: "🔵", href: getTopicUrl(TOPICS["google-gemini"]) },
          { id: "meta-ai",       label: "Meta AI",       icon: "🔵", href: getTopicUrl(TOPICS["meta-ai"]) },
          { id: "mistral",       label: "Mistral",       icon: "🌀", href: getTopicUrl(TOPICS["mistral"]) },
        ],
      },
      {
        id: "ai-operations",
        label: "AI Operations",
        icon: "🔧",
        children: [
          { id: "mlops",          label: "MLOps",          icon: "🔄", href: getTopicUrl(TOPICS["mlops"]) },
          { id: "ai-monitoring",  label: "AI Monitoring",  icon: "📊", href: getTopicUrl(TOPICS["ai-monitoring"]) },
          { id: "ai-security",    label: "AI Security",    icon: "🔒", href: getTopicUrl(TOPICS["ai-security"]) },
          { id: "ai-governance",  label: "AI Governance",  icon: "⚖️", href: getTopicUrl(TOPICS["ai-governance"]) },
        ],
      },
    ],
  },
  {
    id: "dc-map",
    label: "DC Map",
    icon: "🗺️",
    href: "/dc-map",
    variant: "badge",
  },
  {
    id: "tools",
    label: "Tools",
    icon: "🔢",
    children: appendCalculatorLinks([
      { label: "PUE Calculator", href: "/tools/pue-calculator", comingSoon: false, icon: "⚡" },
      { label: "RCI Calculator", href: "/tools/rci-calculator", comingSoon: false, icon: "❄️" },
      { label: "UPS Runtime Calculator", href: "/tools/ups-runtime-calculator", comingSoon: false, icon: "🔋" },
      { label: "Cooling Calculator", href: "/tools/cooling-calculator", comingSoon: false, icon: "🌡️" },
      { label: "Unit Converter", href: "/tools/unit-converter", comingSoon: false, icon: "🔄" },
    ]).map((link, i) => ({
      id: `tool-${i}`,
      label: link.label,
      icon: link.icon ?? "🧮",
      href: link.href,
    })),
  },
  {
    id: "resources",
    label: "Resources",
    icon: "📚",
    children: [
      { id: "interview",        label: "Interview Questions",   icon: "💼", href: "/resources/interview-questions" },
      { id: "troubleshooting",  label: "Troubleshooting Guides", icon: "🔧", href: "/resources/troubleshooting-guides" },
      { id: "case-studies",     label: "Case Studies",          icon: "📊", href: "/resources/case-studies" },
      { id: "checklists",       label: "Checklists",            icon: "✅", href: "/resources/checklists" },
      { id: "glossary",         label: "Glossary",              icon: "📖", href: "/resources/glossary" },
      { id: "standards",        label: "Standards",             icon: "📐", href: "/resources/standards" },
      { id: "downloads",        label: "Downloads",             icon: "⬇️", href: "/resources/downloads" },
      { id: "newsletter",       label: "Newsletter",            icon: "📬", href: "/resources/newsletter" },
    ],
  },
  {
    id: "about",
    label: "About",
    icon: "⬡",
    children: [
      { id: "about-btt",    label: "About BTT",    icon: "⬡",  href: "/about" },
      { id: "kumar-anil",   label: "Kumar Anil",   icon: "👤", href: "/about/kumar-anil" },
      { id: "mission",      label: "Mission",      icon: "🎯", href: "/about/mission" },
      { id: "contact",      label: "Contact",      icon: "✉️", href: "/about/contact" },
    ],
  },
  {
    id: "subscribe",
    label: "Subscribe",
    icon: "📬",
    href: "/resources/newsletter",
    variant: "cta",
  },
];

// ─── Utility: active path detection ──────────────────────────────────────────

/**
 * Given the current pathname, returns the id of the top-level nav item
 * that should be marked as active.
 *
 * Usage in Navbar:
 *   const activeId = getActiveNavId(usePathname())
 */
export function getActiveNavId(pathname: string): string | null {
  const rules: Array<[string, string]> = [
    ["/learn/non-it", "non-it"],
    ["/learn/it",     "it-infra"],
    ["/learn/ai",     "ai-infra"],
    ["/learn",        "learn"],
    ["/dc-map",       "dc-map"],
    ["/tools",        "tools"],
    ["/resources",    "resources"],
    ["/about",        "about"],
  ];

  for (const [prefix, id] of rules) {
    if (pathname.startsWith(prefix)) return id;
  }

  return null;
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export { LEARN_MENU, NON_IT_MENU, IT_MENU, AI_MENU, TOOLS_MENU, RESOURCES_MENU, ABOUT_MENU };
