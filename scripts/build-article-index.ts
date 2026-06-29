/**
 * scripts/build-article-index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Build-time article indexer for BTT Assistant RAG.
 *
 * Scans every published article (app/learn/**\/page.tsx), extracts human-
 * readable text (headings, prose, FAQ answers) and writes lib/article-index.json.
 *
 * btt-retrieval.ts auto-loads this index if it exists — transparently upgrading
 * retrieval from metadata-only to full-text with ZERO code changes elsewhere.
 *
 * SETUP:
 *   Add to package.json scripts:
 *     "build:index": "tsx scripts/build-article-index.ts"
 *     "prebuild": "npm run build:index"
 *
 *   Run manually:
 *     npx tsx scripts/build-article-index.ts
 *
 * Scales to 1000+ articles. Fully automatic — no manual maintenance.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ─── Paths ────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, "..");
const LEARN_DIR  = path.join(ROOT, "app", "learn");
const OUTPUT     = path.join(ROOT, "lib", "article-index.json");

// ─── Types ────────────────────────────────────────────────────────────────────

interface ArticleContent {
  slug: string;
  headings: string[];
  bodyText: string;
  faqs: Array<{ q: string; a: string }>;
}

// ─── File discovery ───────────────────────────────────────────────────────────

function findPageFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPageFiles(full));
    } else if (entry.name === "page.tsx" && !full.includes("[")) {
      // Skip dynamic route segments (e.g. [topic]) — those are layout/redirect files
      results.push(full);
    }
  }
  return results;
}

function slugFromPath(filePath: string): string {
  const parts = filePath.split(path.sep);
  return parts[parts.length - 2]; // folder name = slug
}

// ─── Text extraction ──────────────────────────────────────────────────────────

function extractContent(source: string): Pick<ArticleContent, "headings" | "bodyText" | "faqs"> {
  const headings: string[] = [];
  const faqs: Array<{ q: string; a: string }> = [];
  const bodyChunks: string[] = [];

  // ── TOC headings array: { id: "...", text: "What Is a DG Set?", level: 2 }
  const headingRe = /text:\s*["'`]([^"'`\n]{3,120})["'`]/g;
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(source)) !== null) {
    const t = m[1].trim();
    // Filter out very short strings, template expressions, and code noise
    if (t.length >= 4 && !/^\$\{/.test(t) && !/^[{}();,./\\]/.test(t)) {
      headings.push(t);
    }
  }

  // ── FAQ array: { q: "...", a: "..." }
  const faqRe = /\{\s*q:\s*["'`]([^"'`]+)["'`]\s*,\s*a:\s*["'`]([^"'`]+)["'`]/g;
  while ((m = faqRe.exec(source)) !== null) {
    faqs.push({ q: m[1].trim(), a: m[2].trim() });
  }

  // ── Body prose: text between JSX tags >...< (excluding noise)
  const tagTextRe = />([^<>{}]{10,})</g;
  while ((m = tagTextRe.exec(source)) !== null) {
    const raw = m[1].replace(/\s+/g, " ").trim();
    if (
      raw.length >= 12 &&
      /[a-zA-Z]/.test(raw) &&
      !raw.startsWith("//") &&
      !/^[{}();,.]/.test(raw) &&
      !/^\$\{/.test(raw) &&
      !/^import\s/.test(raw)
    ) {
      bodyChunks.push(raw);
    }
  }

  // ── String prop content: children/label/text/content: "..."
  const propRe = /(?:children|label|text|content|p|description):\s*["'`]([^"'`]{15,})["'`]/g;
  while ((m = propRe.exec(source)) !== null) {
    bodyChunks.push(m[1].replace(/\s+/g, " ").trim());
  }

  // Deduplicate + join body text
  const seen = new Set<string>();
  const unique = bodyChunks.filter((c) => {
    if (seen.has(c)) return false;
    seen.add(c);
    return true;
  });

  return {
    headings: Array.from(new Set(headings)),
    bodyText: unique.join(" ").replace(/\s+/g, " ").trim(),
    faqs,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  console.log(`[build-index] Scanning: ${path.relative(ROOT, LEARN_DIR)}`);

  const pageFiles = findPageFiles(LEARN_DIR);
  console.log(`[build-index] Found ${pageFiles.length} article page(s)`);

  const index: Record<string, ArticleContent> = {};

  for (const file of pageFiles) {
    const slug = slugFromPath(file);
    let source: string;

    try {
      source = fs.readFileSync(file, "utf-8");
    } catch {
      console.warn(`[build-index] ⚠ Could not read: ${file}`);
      continue;
    }

    const { headings, bodyText, faqs } = extractContent(source);

    // Skip category index pages and other non-article files
    if (bodyText.length < 80 && headings.length < 2) {
      console.log(`[build-index]   ⟳ ${slug} — skipped (non-article or empty)`);
      continue;
    }

    index[slug] = { slug, headings, bodyText, faqs };

    console.log(
      `[build-index]   ✓ ${slug} — ${headings.length} headings · ${bodyText.length} chars · ${faqs.length} FAQs`
    );
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(index), "utf-8");

  console.log(
    `[build-index] Wrote ${Object.keys(index).length} articles → ${path.relative(ROOT, OUTPUT)}`
  );
}

main();
