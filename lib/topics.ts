/**
 * topics.ts — BTT Master Topic Registry
 *
 * This is the single source of truth for every topic on the platform.
 * Every planned URL is registered here. A URL can only resolve to a
 * real page (article or coming-soon) if it exists in this registry.
 * True 404s are structurally impossible for any registered topic.
 *
 * STATUS SYSTEM:
 *   published    → full article exists, renders <ArticlePage />
 *   in-progress  → article being written, renders <ComingSoonPage /> with "In Progress" badge
 *   coming-soon  → planned but not started, renders <ComingSoonPage />
 *
 * ADDING A NEW TOPIC:
 *   1. Add entry to TOPICS map below
 *   2. Add slug to parent category sequence (prev/next will auto-resolve)
 *   3. Add to NAV_CONFIG in nav-config.ts if it needs a mega-menu entry
 *   Done. No other files need to change.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopicStatus = "published" | "in-progress" | "coming-soon";

export type Track = "learn" | "non-it" | "it" | "ai";

export type NonItCategory =
  | "electrical"
  | "cooling"
  | "fire"
  | "security"
  | "bms-dcim";

export type ItCategory =
  | "servers"
  | "storage"
  | "networking"
  | "cloud";

export type AiCategory =
  | "fundamentals"
  | "hardware"
  | "data-centers"
  | "platforms"
  | "operations";

export type LearnCategory = "basics";

export type TopicCategory =
  | NonItCategory
  | ItCategory
  | AiCategory
  | LearnCategory;

export interface Topic {
  /** URL slug — must match the [topic] segment exactly */
  slug: string;

  /** Display title */
  title: string;

  /** Short description shown on Coming Soon pages and category indexes */
  description: string;

  /** Which learning track this belongs to */
  track: Track;

  /** Category within the track */
  category: TopicCategory;

  /** Publication status — drives article vs coming-soon rendering */
  status: TopicStatus;

  /** Emoji icon used in mega menu, DC Map, and article headers */
  icon: string;

  /** Breadcrumb path segments — human readable */
  breadcrumb: string[];

  /**
   * Ordered sequence position within its category.
   * Used to auto-derive prev/next navigation between articles.
   * Lower number = earlier in learning path.
   */
  order: number;

  /** Slugs of related published topics (shown on coming-soon and article pages) */
  related: string[];

  /** ISO date string — set when status becomes "published" */
  publishedAt?: string;

  /**
   * Estimated publish date — shown on Coming Soon pages.
   * Format: "Q1 2025" | "Early 2025" | "Phase 2"
   */
  eta?: string;
}

// ─── Helper: derive prev / next within a category ─────────────────────────────

/**
 * Returns the topic immediately before `slug` in its category sequence.
 * Returns undefined if this is the first topic in the category.
 */
export function getPrevTopic(slug: string): Topic | undefined {
  const topic = TOPICS[slug];
  if (!topic) return undefined;

  const siblings = getTopicsByCategory(topic.track, topic.category).sort(
    (a, b) => a.order - b.order
  );

  const idx = siblings.findIndex((t) => t.slug === slug);
  return idx > 0 ? siblings[idx - 1] : undefined;
}

/**
 * Returns the topic immediately after `slug` in its category sequence.
 * Returns undefined if this is the last topic in the category.
 */
export function getNextTopic(slug: string): Topic | undefined {
  const topic = TOPICS[slug];
  if (!topic) return undefined;

  const siblings = getTopicsByCategory(topic.track, topic.category).sort(
    (a, b) => a.order - b.order
  );

  const idx = siblings.findIndex((t) => t.slug === slug);
  return idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;
}

/**
 * Returns all topics for a given track + category, sorted by order.
 */
export function getTopicsByCategory(
  track: Track,
  category: TopicCategory
): Topic[] {
  return Object.values(TOPICS)
    .filter((t) => t.track === track && t.category === category)
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns all published topics for a given track + category.
 * Used to populate "Available Now" lists on Coming Soon pages.
 */
export function getPublishedTopics(
  track: Track,
  category: TopicCategory
): Topic[] {
  return getTopicsByCategory(track, category).filter(
    (t) => t.status === "published"
  );
}

/**
 * Looks up a topic by track + category + slug.
 * Returns undefined only for URLs that were never planned (true 404).
 */
export function getTopic(
  track: Track,
  category: TopicCategory,
  slug: string
): Topic | undefined {
  const topic = TOPICS[slug];
  if (!topic) return undefined;
  if (topic.track !== track || topic.category !== category) return undefined;
  return topic;
}

/**
 * Returns all topics in a track, grouped by category.
 */
export function getTrackSummary(
  track: Track
): Record<string, Topic[]> {
  const topics = Object.values(TOPICS).filter((t) => t.track === track);
  return topics.reduce<Record<string, Topic[]>>((acc, topic) => {
    const key = topic.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(topic);
    acc[key].sort((a, b) => a.order - b.order);
    return acc;
  }, {});
}

// ─── Master Topic Registry ────────────────────────────────────────────────────
//
// KEY = slug (must match URL segment exactly, kebab-case, no spaces)
// Every planned topic across all tracks is registered here.
//
// ─────────────────────────────────────────────────────────────────────────────

export const TOPICS: Record<string, Topic> = {

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: LEARN — Data Center Basics
  // URL pattern: /learn/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "what-is-a-data-center": {
    slug: "what-is-a-data-center",
    title: "What is a Data Center",
    description:
      "A data center is a physical facility that houses computing infrastructure — servers, storage, networking equipment, and supporting systems — that organizations use to run their digital operations.",
    track: "learn",
    category: "basics",
    status: "published",
    icon: "🏢",
    breadcrumb: ["Learn", "What is a Data Center"],
    order: 1,
    related: ["data-center-types", "how-the-internet-works"],
    publishedAt: "2024-11-01",
  },

  "data-center-types": {
    slug: "data-center-types",
    title: "Data Center Types",
    description:
      "Data centers come in several types — enterprise, colocation, hyperscale, and edge. Each serves a different purpose and scale of operations.",
    track: "learn",
    category: "basics",
    status: "published",
    icon: "🗂️",
    breadcrumb: ["Learn", "Data Center Types"],
    order: 2,
    related: ["what-is-a-data-center", "cloud-vs-data-center"],
    publishedAt: "2024-11-05",
  },

  "how-the-internet-works": {
    slug: "how-the-internet-works",
    title: "How the Internet Works",
    description:
      "The internet is a global network of interconnected data centers and network infrastructure. Understanding it requires knowing how packets travel, how DNS resolves, and how content delivery works.",
    track: "learn",
    category: "basics",
    status: "published",
    icon: "🌐",
    breadcrumb: ["Learn", "How the Internet Works"],
    order: 3,
    related: ["what-is-a-data-center", "data-center-types"],
    eta: "Phase 1",
  },

  "cloud-vs-data-center": {
    slug: "cloud-vs-data-center",
    title: "Cloud vs Data Center",
    description:
      "Cloud computing and traditional data centers are often confused. This article explains the differences, trade-offs, and when to use each approach.",
    track: "learn",
    category: "basics",
    status: "published",
    icon: "☁️",
    breadcrumb: ["Learn", "Cloud vs Data Center"],
    order: 4,
    related: ["what-is-a-data-center", "data-center-types"],
    eta: "Phase 1",
  },

  "ai-infrastructure-basics": {
    slug: "ai-infrastructure-basics",
    title: "AI Infrastructure Basics",
    description:
      "AI workloads require fundamentally different infrastructure than traditional computing — more power, specialized cooling, high-bandwidth networking, and GPU-dense compute.",
    track: "learn",
    category: "basics",
    status: "published",
    icon: "🤖",
    breadcrumb: ["Learn", "AI Infrastructure Basics"],
    order: 5,
    related: ["what-is-a-data-center", "cloud-vs-data-center"],
    eta: "Phase 3",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: NON-IT — Electrical Infrastructure
  // URL pattern: /learn/non-it/electrical/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "grid-supply": {
    slug: "grid-supply",
    title: "Grid Supply",
    description:
      "Grid supply is the primary source of electrical power for a data center, typically received from the utility company at high voltage and stepped down through transformers.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "⚡",
    breadcrumb: ["Non-IT", "Electrical", "Grid Supply"],
    order: 1,
    related: ["transformer", "ht-yard", "ups"],
    eta: "Phase 1",
  },

  "ht-yard": {
    slug: "ht-yard",
    title: "HT Yard",
    description:
      "The High Tension (HT) Yard is the outdoor electrical switchyard where high-voltage power from the grid is received, metered, and fed into the data center's transformer.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔌",
    breadcrumb: ["Non-IT", "Electrical", "HT Yard"],
    order: 2,
    related: ["grid-supply", "transformer", "rmu"],
    eta: "Phase 1",
  },

  "rmu": {
    slug: "rmu",
    title: "RMU",
    description:
      "A Ring Main Unit (RMU) is a compact switchgear unit used to connect a data center to the utility supply in a ring configuration, providing redundancy and isolation capability.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔁",
    breadcrumb: ["Non-IT", "Electrical", "RMU"],
    order: 3,
    related: ["ht-yard", "transformer"],
    eta: "Phase 1",
  },

  "transformer": {
    slug: "transformer",
    title: "Transformer",
    description:
      "Transformers step down high-voltage utility power to the medium or low voltage levels used inside data centers. They are one of the most critical components in the electrical infrastructure.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔋",
    breadcrumb: ["Non-IT", "Electrical", "Transformer"],
    order: 4,
    related: ["dg-set", "ups", "grid-supply"],
    publishedAt: "2024-10-15",
  },

  "dg-set": {
    slug: "dg-set",
    title: "DG Set",
    description:
      "A Diesel Generator Set (DG Set) provides backup power to a data center during utility grid failures. It automatically starts within seconds and can sustain full data center load for extended periods.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🛢️",
    breadcrumb: ["Non-IT", "Electrical", "DG Set"],
    order: 5,
    related: ["ups", "transformer", "battery-bank"],
    publishedAt: "2024-10-20",
  },

  "ups": {
    slug: "ups",
    title: "UPS",
    description:
      "An Uninterruptible Power Supply (UPS) provides immediate battery backup power during grid failures, protecting critical IT equipment from power interruptions while the DG Set starts up.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔋",
    breadcrumb: ["Non-IT", "Electrical", "UPS"],
    order: 6,
    related: ["battery-bank", "dg-set", "sts"],
    publishedAt: "2024-10-25",
  },

  "battery-bank": {
    slug: "battery-bank",
    title: "Battery Bank",
    description:
      "The battery bank is the energy storage component of a UPS system, providing the backup power that bridges the gap between a grid failure and DG Set startup.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔋",
    breadcrumb: ["Non-IT", "Electrical", "Battery Bank"],
    order: 7,
    related: ["ups", "dg-set", "sts"],
    publishedAt: "2024-11-01",
  },

  "sts": {
    slug: "sts",
    title: "STS",
    description:
      "A Static Transfer Switch (STS) provides automatic, seamless switching between two independent power sources — typically two UPS outputs — with transfer times of less than 4 milliseconds.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔀",
    breadcrumb: ["Non-IT", "Electrical", "STS"],
    order: 8,
    related: ["ups", "pdu", "battery-bank"],
    eta: "Phase 1",
  },

  "pdu": {
    slug: "pdu",
    title: "PDU",
    description:
      "A Power Distribution Unit (PDU) distributes electrical power from UPS or STS to individual server racks and equipment within the data center floor.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🔌",
    breadcrumb: ["Non-IT", "Electrical", "PDU"],
    order: 9,
    related: ["ups", "sts", "transformer"],
    eta: "Phase 1",
  },

  "earthing": {
    slug: "earthing",
    title: "Earthing",
    description:
      "Earthing (grounding) in a data center protects equipment and personnel by providing a low-resistance path for fault currents to safely dissipate into the ground.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "🌍",
    breadcrumb: ["Non-IT", "Electrical", "Earthing"],
    order: 10,
    related: ["lightning-protection", "transformer"],
    eta: "Phase 1",
  },

  "lightning-protection": {
    slug: "lightning-protection",
    title: "Lightning Protection",
    description:
      "Lightning protection systems protect data center buildings and equipment from direct lightning strikes and the resulting surge currents that can destroy sensitive electronics.",
    track: "non-it",
    category: "electrical",
    status: "published",
    icon: "⛈️",
    breadcrumb: ["Non-IT", "Electrical", "Lightning Protection"],
    order: 11,
    related: ["earthing", "transformer"],
    eta: "Phase 1",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: NON-IT — Cooling Systems
  // URL pattern: /learn/non-it/cooling/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "pac": {
    slug: "pac",
    title: "PAC",
    description:
      "A Precision Air Conditioner (PAC) is a specialized cooling unit designed specifically for data centers, maintaining precise temperature and humidity control at the equipment level.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "❄️",
    breadcrumb: ["Non-IT", "Cooling", "PAC"],
    order: 1,
    related: ["crac", "containment", "rci"],
    publishedAt: "2024-11-10",
  },

  "crac": {
    slug: "crac",
    title: "CRAC",
    description:
      "A Computer Room Air Conditioner (CRAC) is a cooling unit that draws in warm air from the data center, cools it, and redistributes it — similar to a PAC but using a refrigeration cycle with a compressor.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "🌬️",
    breadcrumb: ["Non-IT", "Cooling", "CRAC"],
    order: 2,
    related: ["pac", "chiller", "containment"],
    eta: "Phase 1",
  },

  "chiller": {
    slug: "chiller",
    title: "Chiller",
    description:
      "Chillers produce chilled water that is circulated to Computer Room Air Handlers (CRAHs) to cool the data center. They are used in large facilities where precision cooling units are not sufficient.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "🧊",
    breadcrumb: ["Non-IT", "Cooling", "Chiller"],
    order: 3,
    related: ["cooling-tower", "crac", "pac"],
    eta: "Phase 1",
  },

  "cooling-tower": {
    slug: "cooling-tower",
    title: "Cooling Tower",
    description:
      "Cooling towers reject heat from chilled water systems to the atmosphere through evaporative cooling. They are a critical component of large-scale chiller-based data center cooling.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "🏭",
    breadcrumb: ["Non-IT", "Cooling", "Cooling Tower"],
    order: 4,
    related: ["chiller", "pac", "rci"],
    eta: "Phase 1",
  },

  "containment": {
    slug: "containment",
    title: "Containment",
    description:
      "Aisle containment systems separate hot and cold air streams in the data center to improve cooling efficiency. Hot Aisle Containment (HAC) and Cold Aisle Containment (CAC) are the two main approaches.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "🚧",
    breadcrumb: ["Non-IT", "Cooling", "Containment"],
    order: 5,
    related: ["airflow-management", "pac", "rci"],
    eta: "Phase 1",
  },

  "airflow-management": {
    slug: "airflow-management",
    title: "Airflow Management",
    description:
      "Airflow management ensures that cool air reaches IT equipment efficiently and hot air is returned to cooling units without mixing — using blanking panels, raised floor tiles, and containment strategies.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "💨",
    breadcrumb: ["Non-IT", "Cooling", "Airflow Management"],
    order: 6,
    related: ["containment", "rci", "pac"],
    eta: "Phase 1",
  },

  "rci": {
    slug: "rci",
    title: "RCI",
    description:
      "The Rack Cooling Index (RCI) is a metric that measures the effectiveness of cooling delivery to IT equipment. An RCI of 100% means all equipment is receiving air within the recommended temperature range.",
    track: "non-it",
    category: "cooling",
    status: "published",
    icon: "📊",
    breadcrumb: ["Non-IT", "Cooling", "RCI"],
    order: 7,
    related: ["pac", "containment", "airflow-management"],
    eta: "Phase 1",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: NON-IT — Fire Protection
  // URL pattern: /learn/non-it/fire/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "vesda": {
    slug: "vesda",
    title: "VESDA",
    description:
      "Very Early Smoke Detection Apparatus (VESDA) is an aspirating smoke detection system that actively samples air and can detect smoke particles at concentrations far below what standard detectors can sense.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "🔍",
    breadcrumb: ["Non-IT", "Fire Protection", "VESDA"],
    order: 1,
    related: ["fm200", "novec-1250"],
    eta: "Phase 1",
  },

  "fm200": {
    slug: "fm200",
    title: "FM200",
    description:
      "FM200 (HFC-227ea) is a clean agent fire suppression gas that extinguishes fires by absorbing heat, without damaging electronic equipment or leaving residue — critical for data center environments.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "🧯",
    breadcrumb: ["Non-IT", "Fire Protection", "FM200"],
    order: 2,
    related: ["vesda", "novec-1250", "novec"],
    eta: "Phase 1",
  },

  "novec-1250": {
    slug: "novec-1250",
    title: "Novec 1250",
    description:
      "3M Novec 1250 is a clean agent fire suppression fluid that extinguishes fires rapidly with minimal environmental impact. It has a very low global warming potential compared to FM200.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "🧪",
    breadcrumb: ["Non-IT", "Fire Protection", "Novec 1250"],
    order: 3,
    related: ["fm200", "vesda"],
    eta: "Phase 2",
  },

  "novec": {
    slug: "novec",
    title: "Novec",
    description:
      "Novec fluids from 3M are a family of engineered fluids used for fire suppression and thermal management. In data centers, they are used as clean agent suppressants with excellent environmental profiles.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "💧",
    breadcrumb: ["Non-IT", "Fire Protection", "Novec"],
    order: 4,
    related: ["novec-1250", "fm200"],
    eta: "Phase 2",
  },

  "hydrant": {
    slug: "hydrant",
    title: "Hydrant",
    description:
      "Fire hydrant systems provide a high-volume water supply for firefighting in and around data center facilities. They serve as the primary source for fire brigade operations.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "🚒",
    breadcrumb: ["Non-IT", "Fire Protection", "Hydrant"],
    order: 5,
    related: ["sprinkler", "vesda"],
    eta: "Phase 2",
  },

  "sprinkler": {
    slug: "sprinkler",
    title: "Sprinkler",
    description:
      "Sprinkler systems in data centers use pre-action configurations that require both smoke detection and heat detection before releasing water, minimizing the risk of accidental discharge.",
    track: "non-it",
    category: "fire",
    status: "published",
    icon: "💦",
    breadcrumb: ["Non-IT", "Fire Protection", "Sprinkler"],
    order: 6,
    related: ["hydrant", "vesda", "fm200"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: NON-IT — Physical Security
  // URL pattern: /learn/non-it/security/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "cctv": {
    slug: "cctv",
    title: "CCTV",
    description:
      "Closed Circuit Television (CCTV) systems provide 24/7 visual surveillance of data center facilities, recording all activity in server rooms, entrances, exits, and perimeters.",
    track: "non-it",
    category: "security",
    status: "published",
    icon: "📷",
    breadcrumb: ["Non-IT", "Physical Security", "CCTV"],
    order: 1,
    related: ["access-control", "biometrics", "mantrap"],
    eta: "Phase 2",
  },

  "access-control": {
    slug: "access-control",
    title: "Access Control",
    description:
      "Access control systems restrict entry to data center facilities to authorized personnel only, using electronic locks, card readers, PIN pads, and integration with identity management systems.",
    track: "non-it",
    category: "security",
    status: "published",
    icon: "🗝️",
    breadcrumb: ["Non-IT", "Physical Security", "Access Control"],
    order: 2,
    related: ["biometrics", "mantrap", "cctv"],
    eta: "Phase 2",
  },

  "biometrics": {
    slug: "biometrics",
    title: "Biometrics",
    description:
      "Biometric systems authenticate data center personnel using unique physical characteristics — fingerprint, iris scan, hand geometry, or facial recognition — providing a higher security level than cards or PINs.",
    track: "non-it",
    category: "security",
    status: "published",
    icon: "👁️",
    breadcrumb: ["Non-IT", "Physical Security", "Biometrics"],
    order: 3,
    related: ["access-control", "mantrap"],
    eta: "Phase 2",
  },

  "mantrap": {
    slug: "mantrap",
    title: "Mantrap",
    description:
      "A mantrap (airlock) is a small room with two interlocked doors at a data center entrance. Only one door can open at a time, preventing tailgating and ensuring each person is individually authenticated.",
    track: "non-it",
    category: "security",
    status: "published",
    icon: "🚪",
    breadcrumb: ["Non-IT", "Physical Security", "Mantrap"],
    order: 4,
    related: ["access-control", "biometrics", "cctv"],
    eta: "Phase 2",
  },

  "visitor-management": {
    slug: "visitor-management",
    title: "Visitor Management",
    description:
      "Visitor management systems control, log, and track all non-permanent personnel entering a data center, ensuring escorts are assigned, credentials are verified, and all visits are recorded.",
    track: "non-it",
    category: "security",
    status: "published",
    icon: "📋",
    breadcrumb: ["Non-IT", "Physical Security", "Visitor Management"],
    order: 5,
    related: ["access-control", "cctv"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: NON-IT — BMS / DCIM
  // URL pattern: /learn/non-it/bms-dcim/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "bms": {
    slug: "bms",
    title: "BMS",
    description:
      "A Building Management System (BMS) monitors and controls all mechanical and electrical systems in a data center building — HVAC, lighting, power, fire systems — from a central platform.",
    track: "non-it",
    category: "bms-dcim",
    status: "published",
    icon: "🖥️",
    breadcrumb: ["Non-IT", "BMS / DCIM", "BMS"],
    order: 1,
    related: ["ems", "dcim", "scada"],
    eta: "Phase 2",
  },

  "ems": {
    slug: "ems",
    title: "EMS",
    description:
      "An Energy Management System (EMS) monitors and optimizes energy consumption across all data center systems, providing real-time visibility into power usage and enabling PUE optimization.",
    track: "non-it",
    category: "bms-dcim",
    status: "published",
    icon: "⚡",
    breadcrumb: ["Non-IT", "BMS / DCIM", "EMS"],
    order: 2,
    related: ["bms", "dcim"],
    eta: "Phase 2",
  },

  "dcim": {
    slug: "dcim",
    title: "DCIM",
    description:
      "Data Center Infrastructure Management (DCIM) software bridges IT and facility management, providing unified visibility into power, cooling, space, and IT asset management.",
    track: "non-it",
    category: "bms-dcim",
    status: "published",
    icon: "📊",
    breadcrumb: ["Non-IT", "BMS / DCIM", "DCIM"],
    order: 3,
    related: ["bms", "ems", "scada"],
    eta: "Phase 2",
  },

  "scada": {
    slug: "scada",
    title: "SCADA",
    description:
      "Supervisory Control and Data Acquisition (SCADA) systems provide real-time monitoring and control of critical data center infrastructure, enabling remote operation of electrical and mechanical systems.",
    track: "non-it",
    category: "bms-dcim",
    status: "published",
    icon: "🎛️",
    breadcrumb: ["Non-IT", "BMS / DCIM", "SCADA"],
    order: 4,
    related: ["bms", "dcim", "ems"],
    eta: "Phase 2",
  },

  "sensors": {
    slug: "sensors",
    title: "Sensors",
    description:
      "Environmental sensors throughout a data center monitor temperature, humidity, airflow, water leaks, smoke, and power parameters — feeding data into BMS and DCIM platforms for automated response.",
    track: "non-it",
    category: "bms-dcim",
    status: "published",
    icon: "📡",
    breadcrumb: ["Non-IT", "BMS / DCIM", "Sensors"],
    order: 5,
    related: ["bms", "dcim", "rci"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: IT — Servers
  // URL pattern: /learn/it/servers/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "server-basics": {
    slug: "server-basics",
    title: "Server Basics",
    description:
      "Servers are the core compute infrastructure of a data center, running applications, databases, and workloads that power modern digital services.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "🖧",
    breadcrumb: ["IT Infrastructure", "Servers", "Server Basics"],
    order: 1,
    related: ["cpu", "ram", "virtualization"],
    eta: "Phase 2",
  },

  "cpu": {
    slug: "cpu",
    title: "CPU",
    description:
      "The Central Processing Unit (CPU) is the primary compute component of a server, executing instructions and managing workloads. Data center CPUs differ significantly from desktop processors in core count, cache, and reliability.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "⚙️",
    breadcrumb: ["IT Infrastructure", "Servers", "CPU"],
    order: 2,
    related: ["server-basics", "gpu", "ram"],
    eta: "Phase 2",
  },

  "ram": {
    slug: "ram",
    title: "RAM",
    description:
      "Server RAM (ECC memory) provides the working memory for all active processes. Data center servers use Error Correcting Code (ECC) memory to detect and correct memory errors automatically.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "💾",
    breadcrumb: ["IT Infrastructure", "Servers", "RAM"],
    order: 3,
    related: ["cpu", "server-basics"],
    eta: "Phase 2",
  },

  "gpu": {
    slug: "gpu",
    title: "GPU",
    description:
      "Graphics Processing Units (GPUs) have become essential in data centers for AI training, machine learning inference, and high-performance computing workloads that benefit from massive parallelism.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "🎮",
    breadcrumb: ["IT Infrastructure", "Servers", "GPU"],
    order: 4,
    related: ["cpu", "server-basics", "gpu-cluster"],
    eta: "Phase 2",
  },

  "blade-server": {
    slug: "blade-server",
    title: "Blade Server",
    description:
      "Blade servers are high-density modular servers that plug into a shared chassis, sharing power, cooling, and networking infrastructure — ideal for high-density compute environments.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "📦",
    breadcrumb: ["IT Infrastructure", "Servers", "Blade Server"],
    order: 5,
    related: ["server-basics", "virtualization"],
    eta: "Phase 2",
  },

  "virtualization": {
    slug: "virtualization",
    title: "Virtualization",
    description:
      "Server virtualization uses a hypervisor to run multiple virtual machines on a single physical server, dramatically improving resource utilization and enabling flexible workload management.",
    track: "it",
    category: "servers",
    status: "published",
    icon: "🔲",
    breadcrumb: ["IT Infrastructure", "Servers", "Virtualization"],
    order: 6,
    related: ["server-basics", "cpu", "cloud-vs-data-center"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: IT — Storage
  // URL pattern: /learn/it/storage/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "das": {
    slug: "das",
    title: "DAS",
    description:
      "Direct Attached Storage (DAS) connects storage directly to a server without a network, providing low latency and high performance for local workloads.",
    track: "it",
    category: "storage",
    status: "published",
    icon: "💿",
    breadcrumb: ["IT Infrastructure", "Storage", "DAS"],
    order: 1,
    related: ["nas", "san"],
    eta: "Phase 2",
  },

  "nas": {
    slug: "nas",
    title: "NAS",
    description:
      "Network Attached Storage (NAS) provides file-level storage accessible over a standard network, making it ideal for shared storage workloads like file servers and media libraries.",
    track: "it",
    category: "storage",
    status: "published",
    icon: "🗄️",
    breadcrumb: ["IT Infrastructure", "Storage", "NAS"],
    order: 2,
    related: ["das", "san"],
    eta: "Phase 2",
  },

  "san": {
    slug: "san",
    title: "SAN",
    description:
      "A Storage Area Network (SAN) provides block-level storage over a dedicated high-speed network, typically Fibre Channel or iSCSI — used for databases and high-performance applications.",
    track: "it",
    category: "storage",
    status: "published",
    icon: "🖥️",
    breadcrumb: ["IT Infrastructure", "Storage", "SAN"],
    order: 3,
    related: ["nas", "das", "backup"],
    eta: "Phase 2",
  },

  "backup": {
    slug: "backup",
    title: "Backup",
    description:
      "Data backup strategies in data centers ensure that business data is protected against loss, corruption, and ransomware — using full, incremental, and differential backup methodologies.",
    track: "it",
    category: "storage",
    status: "published",
    icon: "💾",
    breadcrumb: ["IT Infrastructure", "Storage", "Backup"],
    order: 4,
    related: ["disaster-recovery", "san", "nas"],
    eta: "Phase 2",
  },

  "disaster-recovery": {
    slug: "disaster-recovery",
    title: "Disaster Recovery",
    description:
      "Disaster Recovery (DR) planning ensures business continuity when a data center experiences a major failure, using replication, failover sites, and RTO/RPO targets.",
    track: "it",
    category: "storage",
    status: "published",
    icon: "🆘",
    breadcrumb: ["IT Infrastructure", "Storage", "Disaster Recovery"],
    order: 5,
    related: ["backup", "san"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: IT — Networking
  // URL pattern: /learn/it/networking/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "switch": {
    slug: "switch",
    title: "Switch",
    description:
      "Network switches connect servers, storage, and network devices within a data center, operating at Layer 2 (and sometimes Layer 3) to forward frames efficiently.",
    track: "it",
    category: "networking",
    status: "published",
    icon: "🔀",
    breadcrumb: ["IT Infrastructure", "Networking", "Switch"],
    order: 1,
    related: ["router", "firewall"],
    eta: "Phase 2",
  },

  "router": {
    slug: "router",
    title: "Router",
    description:
      "Routers in data centers forward packets between different networks — connecting the internal data center network to the internet, WAN links, and between network segments.",
    track: "it",
    category: "networking",
    status: "published",
    icon: "📡",
    breadcrumb: ["IT Infrastructure", "Networking", "Router"],
    order: 2,
    related: ["switch", "firewall", "load-balancer"],
    eta: "Phase 2",
  },

  "firewall": {
    slug: "firewall",
    title: "Firewall",
    description:
      "Firewalls protect data center networks by inspecting and filtering traffic based on security policies, preventing unauthorized access and containing security incidents.",
    track: "it",
    category: "networking",
    status: "published",
    icon: "🔥",
    breadcrumb: ["IT Infrastructure", "Networking", "Firewall"],
    order: 3,
    related: ["router", "switch", "load-balancer"],
    eta: "Phase 2",
  },

  "load-balancer": {
    slug: "load-balancer",
    title: "Load Balancer",
    description:
      "Load balancers distribute incoming network traffic across multiple servers, ensuring no single server is overwhelmed and providing high availability and fault tolerance.",
    track: "it",
    category: "networking",
    status: "published",
    icon: "⚖️",
    breadcrumb: ["IT Infrastructure", "Networking", "Load Balancer"],
    order: 4,
    related: ["switch", "firewall", "router"],
    eta: "Phase 2",
  },

  "sd-wan": {
    slug: "sd-wan",
    title: "SD-WAN",
    description:
      "Software-Defined Wide Area Networking (SD-WAN) simplifies the management of WAN connections, enabling centralized control over multiple links including MPLS, broadband, and LTE.",
    track: "it",
    category: "networking",
    status: "published",
    icon: "🌐",
    breadcrumb: ["IT Infrastructure", "Networking", "SD-WAN"],
    order: 5,
    related: ["router", "firewall"],
    eta: "Phase 2",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: IT — Cloud Computing
  // URL pattern: /learn/it/cloud/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "aws": {
    slug: "aws",
    title: "AWS",
    description:
      "Amazon Web Services (AWS) is the world's largest cloud platform, offering over 200 services including compute, storage, databases, machine learning, and networking from data centers globally.",
    track: "it",
    category: "cloud",
    status: "published",
    icon: "☁️",
    breadcrumb: ["IT Infrastructure", "Cloud", "AWS"],
    order: 1,
    related: ["azure", "gcp", "hybrid-cloud"],
    eta: "Phase 2",
  },

  "azure": {
    slug: "azure",
    title: "Azure",
    description:
      "Microsoft Azure is a comprehensive cloud computing platform offering IaaS, PaaS, and SaaS solutions — deeply integrated with Microsoft enterprise products and services.",
    track: "it",
    category: "cloud",
    status: "published",
    icon: "🔷",
    breadcrumb: ["IT Infrastructure", "Cloud", "Azure"],
    order: 2,
    related: ["aws", "gcp", "hybrid-cloud"],
    eta: "Phase 2",
  },

  "gcp": {
    slug: "gcp",
    title: "GCP",
    description:
      "Google Cloud Platform (GCP) is Google's cloud computing service, known for its strengths in data analytics, machine learning, and Kubernetes-native infrastructure.",
    track: "it",
    category: "cloud",
    status: "published",
    icon: "🌈",
    breadcrumb: ["IT Infrastructure", "Cloud", "GCP"],
    order: 3,
    related: ["aws", "azure", "hybrid-cloud"],
    eta: "Phase 2",
  },

  "hybrid-cloud": {
    slug: "hybrid-cloud",
    title: "Hybrid Cloud",
    description:
      "A hybrid cloud architecture combines on-premises data center infrastructure with public cloud services, allowing organizations to run workloads in the most appropriate environment.",
    track: "it",
    category: "cloud",
    status: "published",
    icon: "🔗",
    breadcrumb: ["IT Infrastructure", "Cloud", "Hybrid Cloud"],
    order: 4,
    related: ["aws", "azure", "gcp", "cloud-vs-data-center"],
    eta: "Phase 2",
  },

  "multi-cloud": {
    slug: "multi-cloud",
    title: "Multi Cloud",
    description:
      "Multi-cloud strategies use services from multiple cloud providers simultaneously, avoiding vendor lock-in and optimizing workload placement based on cost, performance, and compliance.",
    track: "it",
    category: "cloud",
    status: "published",
    icon: "☁️",
    breadcrumb: ["IT Infrastructure", "Cloud", "Multi Cloud"],
    order: 5,
    related: ["hybrid-cloud", "aws", "azure", "gcp"],
    eta: "Phase 3",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: AI — Fundamentals
  // URL pattern: /learn/ai/fundamentals/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "what-is-ai-infrastructure": {
    slug: "what-is-ai-infrastructure",
    title: "What is AI Infrastructure",
    description:
      "AI Infrastructure is a purpose-built technology stack — GPU clusters, high-speed networking, parallel storage, liquid cooling, and supporting software — fundamentally different from traditional IT infrastructure in density, power, networking, and design philosophy.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "🏗️",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "What is AI Infrastructure"],
    order: 0,
    related: ["what-is-ai", "ai-gpu", "gpu-cluster", "ai-cooling", "ai-data-center-basics"],
    eta: "Phase 3",
  },

  "what-is-ai": {
    slug: "what-is-ai",
    title: "What is AI",
    description:
      "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines, enabling them to learn, reason, and solve problems — transforming every industry including data centers.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "🧠",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "What is AI"],
    order: 1,
    related: ["machine-learning", "deep-learning", "llm"],
    eta: "Phase 3",
  },

  "machine-learning": {
    slug: "machine-learning",
    title: "Machine Learning",
    description:
      "Machine Learning (ML) is a subset of AI where systems learn patterns from data to make predictions and decisions without being explicitly programmed for each task.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "📈",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "Machine Learning"],
    order: 2,
    related: ["what-is-ai-infrastructure", "deep-learning", "ai-gpu", "gpu-cluster"],
    eta: "Phase 3",
  },

  "deep-learning": {
    slug: "deep-learning",
    title: "Deep Learning",
    description:
      "Deep Learning uses multi-layered neural networks to learn complex patterns from large datasets — powering modern AI capabilities like image recognition, language models, and speech synthesis.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "🔗",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "Deep Learning"],
    order: 3,
    related: ["machine-learning", "what-is-ai-infrastructure", "generative-ai", "ai-gpu", "gpu-cluster"],
    eta: "Phase 3",
  },

  "generative-ai": {
    slug: "generative-ai",
    title: "Generative AI",
    description:
      "Generative AI models create new content — text, images, audio, code — by learning patterns from training data. They represent the current frontier of AI capability and require significant infrastructure.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "✨",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "Generative AI"],
    order: 4,
    related: ["deep-learning", "machine-learning", "what-is-ai-infrastructure", "llm", "gpu-cluster"],
    eta: "Phase 3",
  },

  "llm": {
    slug: "llm",
    title: "Large Language Models (LLMs)",
    description:
      "Large Language Models (LLMs) are massive neural networks trained on trillions of tokens to understand and generate human language. They require specialized GPU infrastructure, HBM memory, and significant power and cooling for both training and inference.",
    track: "ai",
    category: "fundamentals",
    status: "published",
    icon: "💬",
    breadcrumb: ["AI Infrastructure", "Fundamentals", "Large Language Models"],
    order: 5,
    related: ["generative-ai", "deep-learning", "what-is-ai-infrastructure", "ai-gpu", "gpu-cluster"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: AI — Hardware
  // URL pattern: /learn/ai/hardware/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "ai-gpu": {
    slug: "ai-gpu",
    title: "AI GPU — The Complete Engineering Guide",
    description:
      "AI GPUs are purpose-built for neural network workloads — Tensor Cores for matrix math, HBM for extreme memory bandwidth, NVLink for fast GPU-to-GPU communication, and MIG for multi-tenant isolation. The hardware foundation of every AI system.",
    track: "ai",
    category: "hardware",
    status: "published",
    icon: "🎮",
    breadcrumb: ["AI Infrastructure", "Hardware", "AI GPU"],
    order: 1,
    related: ["gpu-cluster", "llm", "what-is-ai-infrastructure", "deep-learning", "ai-cooling"],
  },

  "tpu": {
    slug: "tpu",
    title: "TPU (Tensor Processing Unit) — The Complete Engineering Guide",
    description:
      "Google's TPU (Tensor Processing Unit) is a custom AI chip built around a Systolic Array for matrix multiplication — the core operation in every neural network. Faster and more power-efficient than GPUs for specific TensorFlow/JAX workloads at Google Cloud scale.",
    track: "ai",
    category: "hardware",
    status: "published",
    icon: "🔮",
    breadcrumb: ["AI Infrastructure", "Hardware", "TPU"],
    order: 2,
    related: ["ai-gpu", "ai-accelerators", "what-is-ai-infrastructure", "deep-learning", "llm"],
  },

  "ai-accelerators": {
    slug: "ai-accelerators",
    title: "AI Accelerators — NPU, DPU, FPGA, ASIC & Custom AI Chips Complete Guide",
    description:
      "NPU, DPU, FPGA, ASIC, AWS Trainium, AWS Inferentia, Intel Gaudi, Cerebras WSE, Graphcore IPU, SambaNova — every major AI accelerator type explained with data center deployment, power, cooling, and custom silicon strategy.",
    track: "ai",
    category: "hardware",
    status: "published",
    icon: "⚡",
    breadcrumb: ["AI Infrastructure", "Hardware", "AI Accelerators"],
    order: 3,
    related: ["ai-gpu", "tpu", "what-is-ai-infrastructure", "deep-learning", "llm"],
  },

  "nvidia-architecture": {
    slug: "nvidia-architecture",
    title: "NVIDIA Architecture — Tesla to Blackwell Complete Engineering Guide",
    description:
      "NVIDIA GPU architecture complete guide — Tesla to Blackwell evolution, GPC TPC SM internals, CUDA Cores, Tensor Cores, Warp scheduling, memory hierarchy, NVLink NVSwitch, MIG, GPU virtualization, DGX HGX platforms, CUDA ecosystem, TensorRT, NCCL, power cooling and enterprise data center deployment.",
    track: "ai",
    category: "hardware",
    status: "published",
    icon: "🟢",
    breadcrumb: ["AI Infrastructure", "Hardware", "NVIDIA Architecture"],
    order: 4,
    related: ["ai-gpu", "tpu", "ai-accelerators", "deep-learning", "llm"],
  },

  "amd-ai-platforms": {
    slug: "amd-ai-platforms",
    title: "AMD AI Architecture — CDNA, MI300X, ROCm Complete Engineering Guide",
    description:
      "AMD Instinct MI series aur ROCm software platform — GCN se CDNA 4 evolution, Compute Units, Matrix Cores, HBM3 192GB, Infinity Fabric, chiplet architecture, MI300X specs, ROCm vs CUDA, HIP programming, enterprise deployment, power cooling.",
    track: "ai",
    category: "hardware",
    status: "published",
    icon: "🔴",
    breadcrumb: ["AI Infrastructure", "Hardware", "AMD AI Platforms"],
    order: 5,
    related: ["ai-gpu", "nvidia-architecture", "ai-accelerators", "deep-learning", "llm"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: AI — AI Data Centers
  // URL pattern: /learn/ai/data-centers/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "ai-data-center-basics": {
    slug: "ai-data-center-basics",
    title: "AI Data Center Basics — Complete Engineering Foundation Guide",
    description:
      "AI Data Center ka complete beginner-to-engineer guide — traditional DC vs AI DC comparison, training vs inference infrastructure, AI Compute Nodes, GPU clusters, networking, storage, cooling, power chain, AI Pod aur AI Factory concepts, data flow, software stack, enterprise vs hyperscale, capacity planning, reliability, monitoring aur best practices.",
    track: "ai",
    category: "data-centers",
    status: "published",
    icon: "🏢",
    breadcrumb: ["AI Infrastructure", "AI Data Centers", "Basics"],
    order: 1,
    related: ["gpu-cluster", "ai-networking", "ai-gpu", "nvidia-architecture", "amd-ai-platforms"],
  },

  "gpu-cluster": {
    slug: "gpu-cluster",
    title: "GPU Cluster",
    description:
      "GPU Cluster ek complete computing infrastructure hai — GPU Compute Nodes, high-speed networking (InfiniBand/RoCE), parallel file system storage, job scheduling (Slurm/Kubernetes), monitoring, power aur cooling — sab milake distributed AI training aur inference enable karte hain.",
    track: "ai",
    category: "data-centers",
    status: "published",
    icon: "🔲",
    breadcrumb: ["AI Infrastructure", "AI Data Centers", "GPU Cluster"],
    order: 2,
    related: ["ai-data-center-basics", "ai-gpu", "ai-networking", "ai-cooling", "nvidia-architecture"],
  },

  "ai-networking": {
    slug: "ai-networking",
    title: "AI Networking",
    description:
      "AI networking — GPU clusters mein distributed training ke liye RDMA, InfiniBand, RoCE, NCCL, leaf-spine topology, PFC, ECN aur GPU-to-GPU collective communication ka complete engineering guide.",
    track: "ai",
    category: "data-centers",
    status: "published",
    icon: "🌐",
    breadcrumb: ["AI Infrastructure", "AI Data Centers", "AI Networking"],
    order: 3,
    related: ["gpu-cluster", "ai-storage", "ai-data-center-basics"],
  },

  "ai-storage": {
    slug: "ai-storage",
    title: "AI Storage",
    description:
      "AI storage systems must deliver extremely high throughput to feed training data to GPU clusters at the speed GPUs can consume it — requiring parallel file systems, local NVMe caching, and tiered object storage architectures.",
    track: "ai",
    category: "data-centers",
    status: "published",
    icon: "💾",
    breadcrumb: ["AI Infrastructure", "AI Data Centers", "AI Storage"],
    order: 4,
    related: ["gpu-cluster", "ai-networking", "ai-data-center-basics"],
  },

  "ai-cooling": {
    slug: "ai-cooling",
    title: "AI Cooling",
    description:
      "AI GPU racks 40–100+ kW per rack generate karte hain — liquid cooling (DLC, CDU, cold plates), immersion cooling, aur rear-door heat exchangers ka complete engineering guide. Air cooling limits, thermal throttling, PUE/WUE, leak detection aur capacity planning.",
    track: "ai",
    category: "data-centers",
    status: "published",
    icon: "❄️",
    breadcrumb: ["AI Infrastructure", "AI Data Centers", "AI Cooling"],
    order: 5,
    related: ["pac", "chiller", "gpu-cluster", "ai-storage"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: AI — AI Platforms
  // URL pattern: /learn/ai/platforms/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "openai": {
    slug: "openai",
    title: "OpenAI",
    description:
      "OpenAI — ChatGPT, API platform, GPT-4o, o3 reasoning models, Microsoft Azure partnership, training vs inference infrastructure, model serving, enterprise deployment, data privacy aur AI data center requirements ka complete guide.",
    track: "ai",
    category: "platforms",
    status: "published",
    icon: "⬛",
    breadcrumb: ["AI Infrastructure", "AI Platforms", "OpenAI"],
    order: 1,
    related: ["anthropic", "google-gemini", "llm", "gpu-cluster"],
  },

  "anthropic": {
    slug: "anthropic",
    title: "Anthropic",
    description:
      "Anthropic — Claude model family (Haiku, Sonnet, Opus), Constitutional AI, AWS partnership, Amazon Bedrock deployment, 200K context window, interpretability research aur enterprise AI infrastructure ka complete guide.",
    track: "ai",
    category: "platforms",
    status: "published",
    icon: "🔶",
    breadcrumb: ["AI Infrastructure", "AI Platforms", "Anthropic"],
    order: 2,
    related: ["openai", "llm", "gpu-cluster"],
  },

  "google-gemini": {
    slug: "google-gemini",
    title: "Google Gemini",
    description:
      "Google Gemini — TPU architecture, Gemini model family, Google AI Studio, Vertex AI, training vs inference, HBM, ICI interconnect, AI data center power/cooling, O&M perspective aur enterprise deployment ka complete infrastructure guide.",
    track: "ai",
    category: "platforms",
    status: "published",
    icon: "🔵",
    breadcrumb: ["AI Infrastructure", "AI Platforms", "Google Gemini"],
    order: 3,
    related: ["openai", "anthropic", "tpu", "gpu-cluster"],
  },

  "meta-ai": {
    slug: "meta-ai",
    title: "Meta AI",
    description:
      "Meta AI develops the Llama family of open-source AI models, running on Meta's own data center infrastructure and released publicly for research and commercial use.",
    track: "ai",
    category: "platforms",
    status: "published",
    icon: "🔵",
    breadcrumb: ["AI Infrastructure", "AI Platforms", "Meta AI"],
    order: 4,
    related: ["openai", "llm"],
    eta: "Phase 3",
  },

  "mistral": {
    slug: "mistral",
    title: "Mistral",
    description:
      "Mistral AI is a European AI company producing efficient open-weight language models that deliver competitive performance with significantly smaller model sizes and infrastructure requirements.",
    track: "ai",
    category: "platforms",
    status: "published",
    icon: "🌀",
    breadcrumb: ["AI Infrastructure", "AI Platforms", "Mistral"],
    order: 5,
    related: ["meta-ai", "llm"],
    eta: "Phase 3",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRACK: AI — AI Operations
  // URL pattern: /learn/ai/operations/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  "mlops": {
    slug: "mlops",
    title: "MLOps",
    description:
      "MLOps (Machine Learning Operations) applies DevOps principles to machine learning, covering the entire lifecycle from model training and versioning to deployment, monitoring, and retraining.",
    track: "ai",
    category: "operations",
    status: "published",
    icon: "🔄",
    breadcrumb: ["AI Infrastructure", "AI Operations", "MLOps"],
    order: 1,
    related: ["ai-monitoring", "gpu-cluster"],
    eta: "Phase 3",
  },

  "ai-monitoring": {
    slug: "ai-monitoring",
    title: "AI Monitoring",
    description:
      "AI monitoring tracks model performance, data drift, prediction quality, and infrastructure health in production AI systems — ensuring models continue to perform as expected over time.",
    track: "ai",
    category: "operations",
    status: "published",
    icon: "📊",
    breadcrumb: ["AI Infrastructure", "AI Operations", "AI Monitoring"],
    order: 2,
    related: ["mlops", "ai-governance"],
    eta: "Phase 3",
  },

  "ai-security": {
    slug: "ai-security",
    title: "AI Security",
    description:
      "AI security addresses threats specific to AI systems — model theft, adversarial attacks, data poisoning, and prompt injection — requiring new security frameworks beyond traditional cybersecurity.",
    track: "ai",
    category: "operations",
    status: "published",
    icon: "🔒",
    breadcrumb: ["AI Infrastructure", "AI Operations", "AI Security"],
    order: 3,
    related: ["ai-monitoring", "ai-governance"],
    eta: "Phase 3",
  },

  "ai-governance": {
    slug: "ai-governance",
    title: "AI Governance",
    description:
      "AI governance establishes the policies, frameworks, and controls that ensure AI systems are developed and deployed responsibly, ethically, and in compliance with emerging regulations.",
    track: "ai",
    category: "operations",
    status: "published",
    icon: "⚖️",
    breadcrumb: ["AI Infrastructure", "AI Operations", "AI Governance"],
    order: 4,
    related: ["ai-security", "ai-monitoring"],
    eta: "Phase 3",
  },
};

// ─── Convenience Exports ──────────────────────────────────────────────────────

/** All topics as a flat array */
export const ALL_TOPICS = Object.values(TOPICS);

/** All published topics */
export const PUBLISHED_TOPICS = ALL_TOPICS.filter(
  (t) => t.status === "published"
);

/** Topics grouped by track */
export const TOPICS_BY_TRACK = {
  learn: ALL_TOPICS.filter((t) => t.track === "learn"),
  "non-it": ALL_TOPICS.filter((t) => t.track === "non-it"),
  it: ALL_TOPICS.filter((t) => t.track === "it"),
  ai: ALL_TOPICS.filter((t) => t.track === "ai"),
};

/** Category display labels — used in breadcrumbs and headings */
export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  basics: "Data Center Basics",
  electrical: "Electrical Infrastructure",
  cooling: "Cooling Systems",
  fire: "Fire Protection",
  security: "Physical Security",
  "bms-dcim": "BMS / DCIM",
  servers: "Servers",
  storage: "Storage",
  networking: "Networking",
  cloud: "Cloud Computing",
  fundamentals: "AI Fundamentals",
  hardware: "AI Hardware",
  "data-centers": "AI Data Centers",
  platforms: "AI Platforms",
  operations: "AI Operations",
};

/** Track display labels */
export const TRACK_LABELS: Record<Track, string> = {
  learn: "Learn",
  "non-it": "Non-IT Infrastructure",
  it: "IT Infrastructure",
  ai: "AI Infrastructure",
};

/** Track base URLs */
export const TRACK_BASE_URLS: Record<Track, string> = {
  learn: "/learn",
  "non-it": "/learn/non-it",
  it: "/learn/it",
  ai: "/learn/ai",
};

/** Build the full URL for any topic */
export function getTopicUrl(topic: Topic): string {
  if (topic.track === "learn") {
    return `/learn/${topic.slug}`;
  }
  return `${TRACK_BASE_URLS[topic.track]}/${topic.category}/${topic.slug}`;
}
