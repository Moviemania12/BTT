// ═══════════════════════════════════════════════════════════════════════════
// components/dc-map/map-data.ts
//
// Single source of truth for the Interactive Data Center Map: every
// component, where it sits on the logical grid, which engineering
// discipline it belongs to, which animated system flows pass through it,
// and how components connect to each other.
//
// The rendering layer (DcMapCanvas + iso.ts) only ever consumes this
// data — when the SVG scene is one day replaced by a Three.js model,
// this file stays identical. Educational copy lives separately in
// map-content.ts (one responsibility per file).
//
// Every `topicSlug` was verified against lib/topics.ts — no route is
// invented. Components without a matching registry topic carry
// topicSlug: null and simply render the info panel without a
// "Learn More" button.
//
// NOTE on power sequence: the animated power chain follows
// Utility → HT Yard → RMU → Transformer → LT Panel, matching the real
// MV single-line order (RMU is medium-voltage switchgear feeding the
// transformer) and the learning order already used in nav-config.ts.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Discipline categories (filter chips) ────────────────────────────────────

export type DcCategory =
  | "electrical"
  | "mechanical"
  | "fire"
  | "security"
  | "network"
  | "monitoring"
  | "civil";

export const DC_CATEGORY_LABELS: Record<DcCategory, string> = {
  electrical: "Electrical",
  mechanical: "Mechanical",
  fire: "Fire",
  security: "Security",
  network: "Network",
  monitoring: "Monitoring",
  civil: "Civil",
};

// ─── Animated systems (flows + legend) ───────────────────────────────────────

export type DcSystem =
  | "power"
  | "cooling"
  | "network"
  | "fire"
  | "security"
  | "monitoring";

export const DC_SYSTEM_LABELS: Record<DcSystem, string> = {
  power: "Power",
  cooling: "Cooling",
  network: "Network",
  fire: "Fire",
  security: "Security",
  monitoring: "Monitoring",
};

/**
 * System accent colors. Defined here (not only in CSS) because the SVG
 * renderer, the legend, and the minimap all need the same values, and
 * SVG stroke/fill attributes cannot reliably read CSS custom properties
 * inside <defs> across browsers.
 */
export const DC_SYSTEM_COLORS: Record<DcSystem, string> = {
  power: "#f59e0b",
  cooling: "#0ea5e9",
  network: "#7c3aed",
  fire: "#e11d48",
  security: "#10b981",
  monitoring: "#64748b",
};

export const DC_CATEGORY_COLORS: Record<DcCategory, string> = {
  electrical: "#f59e0b",
  mechanical: "#0ea5e9",
  fire: "#e11d48",
  security: "#10b981",
  network: "#7c3aed",
  monitoring: "#64748b",
  civil: "#94a3b8",
};

// ─── Learning modes ──────────────────────────────────────────────────────────

export type DcLearningMode =
  | "power-infrastructure"
  | "cooling-infrastructure"
  | "fire-protection"
  | "physical-security"
  | "networking"
  | "monitoring"
  | "mechanical-systems"
  | "electrical-systems";

export interface DcLearningModeDef {
  id: DcLearningMode;
  label: string;
  /** Components qualify by system membership… */
  system?: DcSystem;
  /** …or by discipline category (mechanical / electrical modes). */
  category?: DcCategory;
}

export const DC_LEARNING_MODES: DcLearningModeDef[] = [
  { id: "power-infrastructure", label: "Power", system: "power" },
  { id: "cooling-infrastructure", label: "Cooling", system: "cooling" },
  { id: "fire-protection", label: "Fire Protection", system: "fire" },
  { id: "physical-security", label: "Security", system: "security" },
  { id: "networking", label: "Networking", system: "network" },
  { id: "monitoring", label: "Monitoring", system: "monitoring" },
  { id: "mechanical-systems", label: "Mechanical", category: "mechanical" },
  { id: "electrical-systems", label: "Electrical", category: "electrical" },
];

// ─── Component shapes (visual variants for the isometric renderer) ───────────

export type DcShapeKind =
  | "box" // generic equipment cabinet
  | "pylon" // transmission tower
  | "gantry" // HT yard structure
  | "transformer" // transformer pair with fins
  | "genset" // DG sets with radiators
  | "tank" // horizontal fuel tank
  | "watertank" // vertical water tank
  | "tower" // cooling tower cells with fans
  | "chiller" // chiller skid
  | "pumps" // pump skid pair
  | "panel-row" // electrical panel lineup
  | "battery" // battery racks
  | "rack-rows" // three rows of server racks
  | "netrack" // network / telecom racks
  | "crah" // air handler pair
  | "cylinders" // suppression cylinder bank
  | "console" // operator console / video wall
  | "building" // small support building
  | "dock" // loading dock bay
  | "mesh" // earthing grid mesh (flat)
  | "mast" // lightning mast (elevated)
  | "busway" // overhead busway rail
  | "floor" // raised floor / hall zone anchor
  | "duct" // ISP fiber entry duct
  | "gate"; // access control mantrap

// ─── Component definition ────────────────────────────────────────────────────

export interface DcComponentDef {
  id: string;
  name: string;
  /** Short label rendered on the map itself. */
  label: string;
  category: DcCategory;
  systems: DcSystem[];
  kind: DcShapeKind;
  /** Logical grid footprint. */
  grid: { x: number; y: number; w: number; d: number };
  /** Extrusion height in px (see iso.ts). */
  h: number;
  /** Optional elevation of the base above ground, in px. */
  zBase?: number;
  /** Verified slug in lib/topics.ts, or null when no topic exists yet. */
  topicSlug: string | null;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  /** Directly related components (rendered as chips in the info panel). */
  related: string[];
  /** Lowercase search tokens — chain searches like "ups" rely on these. */
  tags: string[];
}

// ─── The facility ────────────────────────────────────────────────────────────
// Logical grid ≈ 66 × 48 tiles. x grows toward the SE screen edge,
// y grows toward the SW screen edge.

export const DC_COMPONENTS: DcComponentDef[] = [
  // ── Electrical yard (north-west) ──
  {
    id: "utility-grid",
    name: "Utility Grid Supply",
    label: "Utility Grid",
    category: "electrical",
    systems: ["power"],
    kind: "pylon",
    grid: { x: 1.6, y: 2.2, w: 3, d: 3 },
    h: 62,
    topicSlug: "grid-supply",
    difficulty: "Beginner",
    related: ["ht-yard", "transformer", "dg-sets"],
    tags: ["utility", "grid", "power", "incomer", "supply", "electricity", "33kv", "11kv"],
  },
  {
    id: "ht-yard",
    name: "HT Yard",
    label: "HT Yard",
    category: "electrical",
    systems: ["power"],
    kind: "gantry",
    grid: { x: 6.4, y: 1.8, w: 6, d: 4 },
    h: 30,
    topicSlug: "ht-yard",
    difficulty: "Intermediate",
    related: ["utility-grid", "rmu", "transformer", "lightning-protection"],
    tags: ["ht", "yard", "high tension", "switchyard", "power", "isolator", "breaker", "ct", "pt"],
  },
  {
    id: "rmu",
    name: "Ring Main Unit (RMU)",
    label: "RMU",
    category: "electrical",
    systems: ["power"],
    kind: "box",
    grid: { x: 14.4, y: 2.4, w: 3.4, d: 3 },
    h: 16,
    topicSlug: "rmu",
    difficulty: "Intermediate",
    related: ["ht-yard", "transformer"],
    tags: ["rmu", "ring main unit", "mv switchgear", "power", "sf6", "medium voltage"],
  },
  {
    id: "transformer",
    name: "Transformers",
    label: "Transformers",
    category: "electrical",
    systems: ["power"],
    kind: "transformer",
    grid: { x: 19.6, y: 1.8, w: 5.6, d: 4.2 },
    h: 20,
    topicSlug: "transformer",
    difficulty: "Intermediate",
    related: ["rmu", "lt-panel", "earthing-grid"],
    tags: ["transformer", "step down", "power", "11kv", "433v", "oil", "dry type"],
  },

  // ── DG yard (north) ──
  {
    id: "dg-sets",
    name: "Diesel Generator Sets",
    label: "DG Sets",
    category: "electrical",
    systems: ["power"],
    kind: "genset",
    grid: { x: 28.2, y: 2, w: 8, d: 4 },
    h: 18,
    topicSlug: "dg-set",
    difficulty: "Intermediate",
    related: ["fuel-tank", "fuel-system", "lt-panel"],
    tags: ["dg", "diesel", "generator", "genset", "backup power", "power", "amf"],
  },
  {
    id: "fuel-system",
    name: "Fuel System",
    label: "Fuel System",
    category: "mechanical",
    systems: ["power"],
    kind: "pumps",
    grid: { x: 37.2, y: 2.6, w: 2.6, d: 2.8 },
    h: 9,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["fuel-tank", "dg-sets"],
    tags: ["fuel", "diesel", "pump", "transfer", "day tank", "polishing", "dg"],
  },
  {
    id: "fuel-tank",
    name: "Bulk Fuel Tank",
    label: "Fuel Tank",
    category: "mechanical",
    systems: ["power"],
    kind: "tank",
    grid: { x: 40.6, y: 2, w: 3, d: 4 },
    h: 15,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["fuel-system", "dg-sets"],
    tags: ["fuel", "tank", "diesel", "storage", "hsd", "bulk", "dg"],
  },

  // ── Chiller plant (north-east) ──
  {
    id: "cooling-tower",
    name: "Cooling Towers",
    label: "Cooling Towers",
    category: "mechanical",
    systems: ["cooling"],
    kind: "tower",
    grid: { x: 45.4, y: 1.6, w: 8, d: 4.2 },
    h: 24,
    topicSlug: "cooling-tower",
    difficulty: "Intermediate",
    related: ["chiller", "pumps"],
    tags: ["cooling", "tower", "heat rejection", "condenser water", "fan", "fill"],
  },
  {
    id: "chiller",
    name: "Chillers",
    label: "Chillers",
    category: "mechanical",
    systems: ["cooling"],
    kind: "chiller",
    grid: { x: 55.2, y: 1.9, w: 7, d: 3.6 },
    h: 14,
    topicSlug: "chiller",
    difficulty: "Advanced",
    related: ["cooling-tower", "pumps", "crah"],
    tags: ["chiller", "cooling", "chilled water", "compressor", "evaporator", "condenser", "hvac"],
  },
  {
    id: "pumps",
    name: "CHW / CDW Pumps",
    label: "Pumps",
    category: "mechanical",
    systems: ["cooling"],
    kind: "pumps",
    grid: { x: 55.4, y: 6.6, w: 4.4, d: 2.4 },
    h: 8,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["chiller", "cooling-tower", "crah"],
    tags: ["pump", "cooling", "chilled water", "condenser water", "primary", "secondary", "hvac"],
  },

  // ── Building — west electrical wing ──
  {
    id: "lt-panel",
    name: "LT Panel (Main LV Switchboard)",
    label: "LT Panel",
    category: "electrical",
    systems: ["power"],
    kind: "panel-row",
    grid: { x: 5.6, y: 12.6, w: 9.8, d: 3 },
    h: 14,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["transformer", "dg-sets", "ups", "earthing-grid"],
    tags: ["lt", "panel", "lv", "switchboard", "acb", "power", "distribution", "415v", "busbar"],
  },
  {
    id: "ups",
    name: "UPS Systems",
    label: "UPS",
    category: "electrical",
    systems: ["power"],
    kind: "panel-row",
    grid: { x: 5.6, y: 17.6, w: 9.8, d: 3 },
    h: 13,
    topicSlug: "ups",
    difficulty: "Intermediate",
    related: ["battery-bank", "sts", "lt-panel", "pdu"],
    tags: ["ups", "uninterruptible", "power", "double conversion", "inverter", "rectifier", "battery"],
  },
  {
    id: "battery-bank",
    name: "Battery Banks",
    label: "Battery Room",
    category: "electrical",
    systems: ["power"],
    kind: "battery",
    grid: { x: 5.6, y: 22.6, w: 9.8, d: 3 },
    h: 10,
    topicSlug: "battery-bank",
    difficulty: "Intermediate",
    related: ["ups", "sts"],
    tags: ["battery", "bank", "vrla", "lithium", "dc", "backup", "ups", "autonomy", "runtime"],
  },
  {
    id: "sts",
    name: "Static Transfer Switch (STS)",
    label: "STS",
    category: "electrical",
    systems: ["power"],
    kind: "box",
    grid: { x: 5.6, y: 27.6, w: 4.6, d: 3 },
    h: 12,
    topicSlug: "sts",
    difficulty: "Advanced",
    related: ["ups", "pdu", "battery-bank"],
    tags: ["sts", "static transfer switch", "ups", "power", "source a", "source b", "scr"],
  },

  // ── Building — server hall ──
  {
    id: "server-hall",
    name: "Server Hall (White Space)",
    label: "Server Hall",
    category: "civil",
    systems: ["cooling", "fire"],
    kind: "floor",
    grid: { x: 19, y: 12, w: 25, d: 21.4 },
    h: 0,
    topicSlug: "what-is-a-data-center",
    difficulty: "Beginner",
    related: ["server-racks", "raised-floor", "crah", "pdu", "vesda"],
    tags: ["server hall", "white space", "data hall", "it room", "hall"],
  },
  {
    id: "pdu",
    name: "Power Distribution Unit (PDU)",
    label: "PDU",
    category: "electrical",
    systems: ["power"],
    kind: "box",
    grid: { x: 19.7, y: 20.8, w: 2.4, d: 3.2 },
    h: 13,
    topicSlug: "pdu",
    difficulty: "Intermediate",
    related: ["sts", "busway", "remote-pdu", "server-racks"],
    tags: ["pdu", "power distribution unit", "ups", "power", "panel", "transformer pdu"],
  },
  {
    id: "busway",
    name: "Overhead Busway",
    label: "Busway",
    category: "electrical",
    systems: ["power"],
    kind: "busway",
    grid: { x: 23, y: 21.4, w: 13.8, d: 1 },
    h: 3.5,
    zBase: 34,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["pdu", "server-racks", "remote-pdu"],
    tags: ["busway", "bus duct", "track busway", "tap off", "ups", "power", "overhead"],
  },
  {
    id: "server-racks",
    name: "Server Racks",
    label: "Server Racks",
    category: "network",
    systems: ["power", "cooling", "network"],
    kind: "rack-rows",
    grid: { x: 22.6, y: 15, w: 14.2, d: 13.4 },
    h: 30,
    topicSlug: "server-basics",
    difficulty: "Beginner",
    related: ["busway", "remote-pdu", "crah", "distribution", "raised-floor"],
    tags: ["rack", "server", "racks", "it", "42u", "compute", "ups", "network"],
  },
  {
    id: "remote-pdu",
    name: "Remote Power Panel (rPDU)",
    label: "Remote PDU",
    category: "electrical",
    systems: ["power"],
    kind: "box",
    grid: { x: 38.4, y: 21.2, w: 2.2, d: 2.8 },
    h: 12,
    topicSlug: "pdu",
    difficulty: "Intermediate",
    related: ["pdu", "server-racks", "busway"],
    tags: ["rpdu", "remote pdu", "rpp", "power", "ups", "distribution", "rack power"],
  },
  {
    id: "raised-floor",
    name: "Raised Floor",
    label: "Raised Floor",
    category: "civil",
    systems: ["cooling"],
    kind: "floor",
    grid: { x: 20, y: 29.6, w: 3.4, d: 2.6 },
    h: 4,
    topicSlug: "airflow-management",
    difficulty: "Beginner",
    related: ["crah", "server-hall", "server-racks"],
    tags: ["raised floor", "plenum", "tiles", "cooling", "airflow", "underfloor"],
  },
  {
    id: "crah",
    name: "CRAH Units",
    label: "CRAH",
    category: "mechanical",
    systems: ["cooling"],
    kind: "crah",
    grid: { x: 37.6, y: 12.5, w: 5.8, d: 2.3 },
    h: 15,
    topicSlug: "crac",
    difficulty: "Intermediate",
    related: ["chiller", "pumps", "raised-floor", "server-racks"],
    tags: ["crah", "cooling", "air handler", "chilled water", "coil", "hvac", "precision"],
  },
  {
    id: "crac",
    name: "CRAC Units",
    label: "CRAC",
    category: "mechanical",
    systems: ["cooling"],
    kind: "crah",
    grid: { x: 24.4, y: 30.4, w: 5.8, d: 2.3 },
    h: 15,
    topicSlug: "pac",
    difficulty: "Intermediate",
    related: ["crah", "server-racks", "server-hall"],
    tags: ["crac", "cooling", "dx", "refrigerant", "compressor", "precision", "hvac"],
  },
  {
    id: "vesda",
    name: "VESDA (Air Sampling Detection)",
    label: "VESDA",
    category: "fire",
    systems: ["fire"],
    kind: "cylinders",
    grid: { x: 40.9, y: 29.8, w: 1.7, d: 1.7 },
    h: 11,
    topicSlug: "vesda",
    difficulty: "Advanced",
    related: ["fire-alarm", "fm200", "server-hall"],
    tags: ["vesda", "fire", "smoke", "aspirating", "detection", "sampling", "aspiration"],
  },
  {
    id: "fm200",
    name: "FM200 / Novec Suppression",
    label: "FM200 / Novec",
    category: "fire",
    systems: ["fire"],
    kind: "cylinders",
    grid: { x: 41, y: 25.4, w: 2.4, d: 3 },
    h: 12,
    topicSlug: "fm200",
    difficulty: "Advanced",
    related: ["vesda", "fire-alarm", "server-hall"],
    tags: ["fm200", "novec", "fire", "suppression", "clean agent", "gas", "cylinders", "1230"],
  },

  // ── Building — east IT wing ──
  {
    id: "isp-entry",
    name: "ISP Fiber Entry",
    label: "ISP Entry",
    category: "network",
    systems: ["network"],
    kind: "duct",
    grid: { x: 53.8, y: 11.3, w: 2.8, d: 1.8 },
    h: 7,
    topicSlug: "how-the-internet-works",
    difficulty: "Beginner",
    related: ["meet-me-room", "core-network"],
    tags: ["isp", "fiber", "entry", "network", "carrier", "diverse path", "internet"],
  },
  {
    id: "meet-me-room",
    name: "Meet-Me Room (MMR)",
    label: "Meet-Me Room",
    category: "network",
    systems: ["network"],
    kind: "netrack",
    grid: { x: 46.6, y: 13, w: 6, d: 3.2 },
    h: 13,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["isp-entry", "core-network"],
    tags: ["mmr", "meet me room", "network", "carrier", "cross connect", "fiber", "interconnection"],
  },
  {
    id: "core-network",
    name: "Core Network",
    label: "Core Network",
    category: "network",
    systems: ["network"],
    kind: "netrack",
    grid: { x: 46.6, y: 17.6, w: 6, d: 3.2 },
    h: 14,
    topicSlug: "switch",
    difficulty: "Advanced",
    related: ["meet-me-room", "distribution", "storage-san", "backup"],
    tags: ["core", "network", "router", "switch", "spine", "backbone", "l3"],
  },
  {
    id: "distribution",
    name: "Distribution Switches",
    label: "Distribution",
    category: "network",
    systems: ["network"],
    kind: "netrack",
    grid: { x: 46.6, y: 22.2, w: 6, d: 3.2 },
    h: 13,
    topicSlug: "switch",
    difficulty: "Intermediate",
    related: ["core-network", "server-racks"],
    tags: ["distribution", "network", "switch", "leaf", "tor", "aggregation", "access"],
  },
  {
    id: "storage-san",
    name: "Storage / SAN",
    label: "Storage · SAN",
    category: "network",
    systems: ["network"],
    kind: "netrack",
    grid: { x: 46.6, y: 26.8, w: 6, d: 3.2 },
    h: 15,
    topicSlug: "san",
    difficulty: "Advanced",
    related: ["core-network", "backup", "server-racks"],
    tags: ["storage", "san", "nas", "network", "array", "fiber channel", "data"],
  },
  {
    id: "backup",
    name: "Backup Systems",
    label: "Backup",
    category: "network",
    systems: ["network"],
    kind: "netrack",
    grid: { x: 46.6, y: 31.4, w: 6, d: 3.2 },
    h: 13,
    topicSlug: "backup",
    difficulty: "Intermediate",
    related: ["storage-san", "core-network"],
    tags: ["backup", "network", "tape", "restore", "dr", "recovery", "data protection"],
  },

  // ── Building — south operations wing ──
  {
    id: "security-room",
    name: "Security Room",
    label: "Security Room",
    category: "security",
    systems: ["security"],
    kind: "console",
    grid: { x: 5.6, y: 34.7, w: 5, d: 3.6 },
    h: 12,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["cctv", "access-control", "biometric", "noc"],
    tags: ["security", "room", "guard", "control", "surveillance"],
  },
  {
    id: "access-control",
    name: "Access Control",
    label: "Access Control",
    category: "security",
    systems: ["security"],
    kind: "gate",
    grid: { x: 11.8, y: 35.1, w: 2.8, d: 2.8 },
    h: 11,
    topicSlug: "access-control",
    difficulty: "Beginner",
    related: ["biometric", "security-room", "cctv"],
    tags: ["access", "control", "security", "mantrap", "card", "turnstile", "door"],
  },
  {
    id: "biometric",
    name: "Biometric Readers",
    label: "Biometric",
    category: "security",
    systems: ["security"],
    kind: "box",
    grid: { x: 15.4, y: 35.3, w: 2, d: 2.4 },
    h: 9,
    topicSlug: "biometrics",
    difficulty: "Beginner",
    related: ["access-control", "security-room"],
    tags: ["biometric", "security", "fingerprint", "iris", "face", "reader", "authentication"],
  },
  {
    id: "cctv",
    name: "CCTV Surveillance",
    label: "CCTV",
    category: "security",
    systems: ["security"],
    kind: "console",
    grid: { x: 18.4, y: 35.1, w: 2.6, d: 2.8 },
    h: 10,
    topicSlug: "cctv",
    difficulty: "Beginner",
    related: ["security-room", "access-control", "noc"],
    tags: ["cctv", "security", "camera", "surveillance", "nvr", "vms", "recording"],
  },
  {
    id: "noc",
    name: "NOC (Network Operations Center)",
    label: "NOC",
    category: "monitoring",
    systems: ["monitoring"],
    kind: "console",
    grid: { x: 22.4, y: 34.6, w: 7, d: 3.8 },
    h: 12,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["bms", "dcim", "security-room"],
    tags: ["noc", "monitoring", "operations", "video wall", "24x7", "network operations"],
  },
  {
    id: "bms",
    name: "BMS (Building Management System)",
    label: "BMS",
    category: "monitoring",
    systems: ["monitoring"],
    kind: "box",
    grid: { x: 30.6, y: 34.9, w: 3.6, d: 3.2 },
    h: 11,
    topicSlug: "bms",
    difficulty: "Intermediate",
    related: ["noc", "dcim", "chiller", "ups"],
    tags: ["bms", "monitoring", "building management", "hvac", "sensors", "automation", "scada"],
  },
  {
    id: "dcim",
    name: "DCIM Platform",
    label: "DCIM",
    category: "monitoring",
    systems: ["monitoring"],
    kind: "box",
    grid: { x: 35.4, y: 34.9, w: 3.6, d: 3.2 },
    h: 11,
    topicSlug: "dcim",
    difficulty: "Intermediate",
    related: ["noc", "bms", "pdu", "server-racks"],
    tags: ["dcim", "monitoring", "capacity", "asset", "power monitoring", "infrastructure management"],
  },
  {
    id: "fire-alarm",
    name: "Fire Alarm Panel (FACP)",
    label: "Fire Alarm",
    category: "fire",
    systems: ["fire"],
    kind: "box",
    grid: { x: 40.4, y: 35, w: 2.6, d: 3 },
    h: 12,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["vesda", "fm200", "fire-pump"],
    tags: ["fire", "alarm", "facp", "panel", "detection", "notification", "zone"],
  },
  {
    id: "ahu",
    name: "AHU (Air Handling Unit)",
    label: "AHU",
    category: "mechanical",
    systems: ["cooling"],
    kind: "crah",
    grid: { x: 44.4, y: 34.8, w: 4.2, d: 3.2 },
    h: 13,
    topicSlug: null,
    difficulty: "Intermediate",
    related: ["chiller", "crah", "office-area"],
    tags: ["ahu", "cooling", "air handling", "fresh air", "comfort", "hvac", "ventilation"],
  },

  // ── Electrical safety ──
  {
    id: "earthing-grid",
    name: "Earthing Grid",
    label: "Earthing Grid",
    category: "electrical",
    systems: ["power"],
    kind: "mesh",
    grid: { x: 2.6, y: 41.8, w: 6.4, d: 3.4 },
    h: 1,
    topicSlug: "earthing",
    difficulty: "Intermediate",
    related: ["lightning-protection", "transformer", "lt-panel"],
    tags: ["earthing", "grounding", "grid", "electrode", "safety", "fault", "earth pit"],
  },
  {
    id: "lightning-protection",
    name: "Lightning Protection",
    label: "Lightning Mast",
    category: "electrical",
    systems: ["power"],
    kind: "mast",
    grid: { x: 4.7, y: 11.7, w: 1.2, d: 1.2 },
    h: 40,
    zBase: 30,
    topicSlug: "lightning-protection",
    difficulty: "Intermediate",
    related: ["earthing-grid", "ht-yard"],
    tags: ["lightning", "protection", "mast", "air terminal", "lps", "down conductor", "surge"],
  },

  // ── Fire water (south-east yard) ──
  {
    id: "fire-pump",
    name: "Fire Pump Room",
    label: "Fire Pump Room",
    category: "fire",
    systems: ["fire"],
    kind: "building",
    grid: { x: 48.6, y: 42, w: 4.6, d: 3.4 },
    h: 14,
    topicSlug: "hydrant",
    difficulty: "Intermediate",
    related: ["fire-water-tank", "fire-alarm"],
    tags: ["fire", "pump", "jockey", "hydrant", "sprinkler", "diesel pump", "electric pump"],
  },
  {
    id: "fire-water-tank",
    name: "Fire Water Tank",
    label: "Fire Water Tank",
    category: "fire",
    systems: ["fire"],
    kind: "watertank",
    grid: { x: 55.2, y: 41.4, w: 4.4, d: 4.4 },
    h: 22,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["fire-pump"],
    tags: ["fire", "water", "tank", "storage", "reserve", "capacity", "nfpa"],
  },

  // ── Support buildings (south-west yard) ──
  {
    id: "admin-area",
    name: "Administration Area",
    label: "Admin Block",
    category: "civil",
    systems: [],
    kind: "building",
    grid: { x: 7.6, y: 41.6, w: 8.6, d: 4.4 },
    h: 26,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["office-area", "access-control", "loading-dock"],
    tags: ["admin", "administration", "reception", "visitor", "civil", "block"],
  },
  {
    id: "office-area",
    name: "Office Area",
    label: "Offices",
    category: "civil",
    systems: [],
    kind: "building",
    grid: { x: 18.4, y: 41.9, w: 7, d: 4 },
    h: 20,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["admin-area", "noc", "ahu"],
    tags: ["office", "staff", "workspace", "civil", "meeting"],
  },
  {
    id: "loading-dock",
    name: "Loading Dock",
    label: "Loading Dock",
    category: "civil",
    systems: [],
    kind: "dock",
    grid: { x: 28.4, y: 40.6, w: 5.2, d: 3.4 },
    h: 10,
    topicSlug: null,
    difficulty: "Beginner",
    related: ["admin-area", "server-hall"],
    tags: ["loading", "dock", "staging", "delivery", "logistics", "civil", "truck"],
  },
];

// ─── Connections ─────────────────────────────────────────────────────────────
// Each edge is an authored orthogonal route on the logical grid.
// `z` is the conduit height in px. Edges with `modeOnly: true` are drawn
// only while their system is focused (learning mode, search, selection)
// so the default view stays clean.

export interface DcEdgeDef {
  id: string;
  from: string;
  to: string;
  system: DcSystem;
  waypoints: Array<[number, number]>;
  z?: number;
  modeOnly?: boolean;
  /** Participates in the animated flow marching for its system. */
  flow?: boolean;
}

export const DC_EDGES: DcEdgeDef[] = [
  // ── POWER: Utility → HT Yard → RMU → Transformer → LT Panel ──
  { id: "p-grid-ht", from: "utility-grid", to: "ht-yard", system: "power", flow: true, z: 26, waypoints: [[4.4, 3.7], [6.6, 3.7]] },
  { id: "p-ht-rmu", from: "ht-yard", to: "rmu", system: "power", flow: true, z: 10, waypoints: [[12.2, 3.9], [14.6, 3.9]] },
  { id: "p-rmu-tx", from: "rmu", to: "transformer", system: "power", flow: true, z: 6, waypoints: [[17.6, 3.9], [19.8, 3.9]] },
  { id: "p-tx-lt", from: "transformer", to: "lt-panel", system: "power", flow: true, z: 4, waypoints: [[22.4, 5.9], [22.4, 9.4], [10.4, 9.4], [10.4, 12.8]] },
  // DG standby feed into the same LV board
  { id: "p-dg-lt", from: "dg-sets", to: "lt-panel", system: "power", flow: true, z: 4, waypoints: [[32.2, 5.9], [32.2, 8.4], [9.4, 8.4], [9.4, 12.8]] },
  // Fuel chain (supports the power system, so it animates with power)
  { id: "p-tank-fs", from: "fuel-tank", to: "fuel-system", system: "power", flow: true, z: 3, waypoints: [[40.7, 4], [39.7, 4]] },
  { id: "p-fs-dg", from: "fuel-system", to: "dg-sets", system: "power", flow: true, z: 3, waypoints: [[37.3, 4], [36.1, 4]] },
  // LV → UPS → Battery / STS → PDU
  { id: "p-lt-ups", from: "lt-panel", to: "ups", system: "power", flow: true, z: 4, waypoints: [[10.4, 15.5], [10.4, 17.8]] },
  { id: "p-ups-batt", from: "ups", to: "battery-bank", system: "power", flow: true, z: 4, waypoints: [[8.2, 20.5], [8.2, 22.8]] },
  { id: "p-ups-sts", from: "ups", to: "sts", system: "power", flow: true, z: 4, waypoints: [[12.8, 20.5], [12.8, 26.6], [7.9, 26.6], [7.9, 27.8]] },
  { id: "p-sts-pdu", from: "sts", to: "pdu", system: "power", flow: true, z: 4, waypoints: [[10.1, 29.1], [17.6, 29.1], [17.6, 22.4], [19.9, 22.4]] },
  // PDU → Busway (riser) → rPDU / rack drop
  { id: "p-pdu-busway", from: "pdu", to: "busway", system: "power", flow: true, z: 36, waypoints: [[21.1, 21.9], [23.2, 21.9]] },
  { id: "p-busway-run", from: "busway", to: "remote-pdu", system: "power", flow: true, z: 36, waypoints: [[23.2, 21.9], [39.4, 21.9]] },
  { id: "p-busway-racks", from: "busway", to: "server-racks", system: "power", flow: true, z: 18, waypoints: [[29.8, 21.9], [28.8, 20.9]] },

  // ── COOLING: Tower ⇄ Chiller → Pumps → CRAH → Hall ──
  { id: "c-tower-chiller", from: "cooling-tower", to: "chiller", system: "cooling", flow: true, z: 8, waypoints: [[53.5, 3.7], [55.4, 3.7]] },
  { id: "c-chiller-pumps", from: "chiller", to: "pumps", system: "cooling", flow: true, z: 5, waypoints: [[57.6, 5.6], [57.6, 6.8]] },
  { id: "c-pumps-crah", from: "pumps", to: "crah", system: "cooling", flow: true, z: 5, waypoints: [[57.6, 9.1], [57.6, 10.3], [40.5, 10.3], [40.5, 12.7]] },
  { id: "c-crah-hall", from: "crah", to: "raised-floor", system: "cooling", flow: true, z: 2, waypoints: [[40.5, 14.9], [40.5, 16.4], [21.7, 16.4], [21.7, 29.8]] },
  { id: "c-crac-hall", from: "crac", to: "server-racks", system: "cooling", flow: true, z: 2, waypoints: [[27.3, 30.3], [27.3, 28.6]] },
  { id: "c-ahu-office", from: "ahu", to: "office-area", system: "cooling", flow: true, z: 3, waypoints: [[46.4, 38.1], [46.4, 39.4], [23.5, 39.4], [23.5, 41.8]] },

  // ── NETWORK: ISP → MMR → Core → Distribution → Racks; Core ⇄ SAN → Backup ──
  { id: "n-isp-mmr", from: "isp-entry", to: "meet-me-room", system: "network", flow: true, z: 4, waypoints: [[55.2, 13.2], [55.2, 14.6], [52.8, 14.6]] },
  { id: "n-mmr-core", from: "meet-me-room", to: "core-network", system: "network", flow: true, z: 4, waypoints: [[49.6, 16.3], [49.6, 17.8]] },
  { id: "n-core-dist", from: "core-network", to: "distribution", system: "network", flow: true, z: 4, waypoints: [[49.6, 20.9], [49.6, 22.4]] },
  { id: "n-dist-racks", from: "distribution", to: "server-racks", system: "network", flow: true, z: 31, waypoints: [[46.5, 23.8], [35.2, 23.8], [35.2, 22.2]] },
  { id: "n-core-san", from: "core-network", to: "storage-san", system: "network", flow: true, z: 4, waypoints: [[52.8, 19.2], [54.1, 19.2], [54.1, 28.4], [52.8, 28.4]] },
  { id: "n-san-backup", from: "storage-san", to: "backup", system: "network", flow: true, z: 4, waypoints: [[49.6, 30.1], [49.6, 31.6]] },

  // ── FIRE: VESDA → FACP → FM200 release; Tank → Pump → hydrant ring ──
  { id: "f-vesda-facp", from: "vesda", to: "fire-alarm", system: "fire", flow: true, z: 3, waypoints: [[41.7, 31.6], [41.7, 35.2]] },
  { id: "f-facp-fm200", from: "fire-alarm", to: "fm200", system: "fire", flow: true, z: 3, waypoints: [[42.8, 35.2], [42.8, 33.9], [43.7, 33.9], [43.7, 26.9], [43.4, 26.9]] },
  { id: "f-fm200-hall", from: "fm200", to: "server-racks", system: "fire", flow: true, z: 14, waypoints: [[41, 26.4], [38.4, 25.4]] },
  { id: "f-tank-pump", from: "fire-water-tank", to: "fire-pump", system: "fire", flow: true, z: 4, waypoints: [[55.3, 43.6], [53.3, 43.6]] },
  { id: "f-pump-ring", from: "fire-pump", to: "server-hall", system: "fire", flow: true, z: 4, waypoints: [[50.9, 41.9], [50.9, 39.6], [21.2, 39.6], [21.2, 33.5]] },

  // ── SECURITY web (drawn in security focus) ──
  { id: "s-bio-ac", from: "biometric", to: "access-control", system: "security", modeOnly: true, z: 3, waypoints: [[15.5, 36.5], [14.7, 36.5]] },
  { id: "s-ac-secroom", from: "access-control", to: "security-room", system: "security", modeOnly: true, z: 3, waypoints: [[11.7, 36.5], [10.8, 36.5]] },
  { id: "s-cctv-secroom", from: "cctv", to: "security-room", system: "security", modeOnly: true, z: 9, waypoints: [[19.7, 35.2], [19.7, 33.9], [8.1, 33.9], [8.1, 34.9]] },

  // ── MONITORING web (drawn in monitoring focus) ──
  { id: "m-bms-noc", from: "bms", to: "noc", system: "monitoring", modeOnly: true, z: 3, waypoints: [[30.5, 36.5], [29.6, 36.5]] },
  { id: "m-dcim-noc", from: "dcim", to: "noc", system: "monitoring", modeOnly: true, z: 3, waypoints: [[36.2, 38.3], [36.2, 39], [29.9, 39], [29.9, 38.5]] },
  { id: "m-bms-ups", from: "bms", to: "ups", system: "monitoring", modeOnly: true, z: 2, waypoints: [[32.4, 34.8], [32.4, 33.8], [17, 33.8], [17, 19.1], [15.6, 19.1]] },
  { id: "m-bms-chiller", from: "bms", to: "chiller", system: "monitoring", modeOnly: true, z: 2, waypoints: [[33.5, 34.8], [33.5, 34], [45.2, 34], [45.2, 11], [58.7, 11], [58.7, 5.7]] },
  { id: "m-dcim-racks", from: "dcim", to: "server-racks", system: "monitoring", modeOnly: true, z: 2, waypoints: [[37.2, 34.8], [37.2, 28.6]] },
  { id: "m-dcim-pdu", from: "dcim", to: "pdu", system: "monitoring", modeOnly: true, z: 2, waypoints: [[36.3, 34.8], [36.3, 33.6], [18.2, 33.6], [18.2, 23], [19.6, 23]] },
];

// ─── Zones (floor slabs / rooms — scenery, not interactive) ──────────────────

export interface DcZoneDef {
  id: string;
  label?: string;
  grid: { x: number; y: number; w: number; d: number };
  tone: "site" | "pad" | "slab" | "hall" | "room" | "lawn" | "road";
}

export const DC_ZONES: DcZoneDef[] = [
  { id: "z-site", grid: { x: 0, y: 0, w: 66, d: 48 }, tone: "site" },
  { id: "z-road", grid: { x: 0, y: 46.6, w: 66, d: 1.4 }, tone: "road" },
  { id: "z-lawn-nw", grid: { x: 0.8, y: 0.8, w: 25.4, d: 6.6 }, tone: "lawn" },
  { id: "z-pad-dg", label: "DG Yard", grid: { x: 27.2, y: 1, w: 17.4, d: 6 }, tone: "pad" },
  { id: "z-pad-chw", label: "Chiller Plant", grid: { x: 44.8, y: 1, w: 18.4, d: 8.6 }, tone: "pad" },
  { id: "z-slab", grid: { x: 4, y: 11, w: 54, d: 29 }, tone: "slab" },
  { id: "z-hall", label: "Server Hall", grid: { x: 19, y: 12, w: 25, d: 21.4 }, tone: "hall" },
  { id: "z-room-lt", grid: { x: 5, y: 12, w: 11, d: 4.2 }, tone: "room" },
  { id: "z-room-ups", grid: { x: 5, y: 17, w: 11, d: 4.2 }, tone: "room" },
  { id: "z-room-batt", grid: { x: 5, y: 22, w: 11, d: 4.2 }, tone: "room" },
  { id: "z-room-sts", grid: { x: 5, y: 27, w: 11, d: 4.2 }, tone: "room" },
  { id: "z-wing-east", grid: { x: 45.8, y: 12, w: 11.4, d: 23.6 }, tone: "room" },
  { id: "z-wing-south", grid: { x: 5, y: 34, w: 44.2, d: 5.2 }, tone: "room" },
  { id: "z-pad-fire", label: "Fire Yard", grid: { x: 47.6, y: 40.8, w: 13, d: 5.6 }, tone: "pad" },
  { id: "z-lawn-sw", grid: { x: 1, y: 40.8, w: 34, d: 5.4 }, tone: "lawn" },
];

// ─── Lookup helpers ──────────────────────────────────────────────────────────

export const DC_COMPONENT_INDEX: Record<string, DcComponentDef> = Object.fromEntries(
  DC_COMPONENTS.map((c) => [c.id, c])
);

/** Adjacency: componentId → directly connected component ids. */
export const DC_NEIGHBORS: Record<string, string[]> = (() => {
  const map: Record<string, Set<string>> = {};
  for (const c of DC_COMPONENTS) map[c.id] = new Set();
  for (const e of DC_EDGES) {
    if (map[e.from] && map[e.to]) {
      map[e.from].add(e.to);
      map[e.to].add(e.from);
    }
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, Array.from(v)]));
})();

/** Case-insensitive component search across name, label, id and tags. */
export function searchComponents(query: string): Set<string> {
  const q = query.trim().toLowerCase();
  const hits = new Set<string>();
  if (!q) return hits;
  for (const c of DC_COMPONENTS) {
    if (
      c.name.toLowerCase().includes(q) ||
      c.label.toLowerCase().includes(q) ||
      c.id.includes(q) ||
      c.tags.some((t) => t.includes(q) || q.includes(t))
    ) {
      hits.add(c.id);
    }
  }
  return hits;
}
