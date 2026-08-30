// ─── Translation Store — Vercel Blob ─────────────────────────────────────────
// Path: translations/{slug}/{langCode}/{sourceHash}.json
// • Deterministic path → same slug+lang+hash = same blob = same content for all users
// • Source content change → new SHA-256 hash → new path → fresh translation on demand
// • In-process Map lock prevents duplicate Gemini calls on same server instance
// ─────────────────────────────────────────────────────────────────────────────

import { put, head } from "@vercel/blob";
import crypto from "crypto";

export interface TranslationRecord {
  slug: string;
  sourceLang: string;
  targetLang: string;
  sourceHash: string;
  translatedHtml: string;
  model: string;
  createdAt: string;
}

// ── Hashing ────────────────────────────────────────────────────────────────────
export function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex").slice(0, 16);
}

// ── Blob path ──────────────────────────────────────────────────────────────────
function blobPath(slug: string, langCode: string, sourceHash: string): string {
  const safeSlug = slug.replace(/[^a-zA-Z0-9\-_/]/g, "_");
  const safeLang = langCode.replace(/[^a-zA-Z0-9\-]/g, "_");
  return `translations/${safeSlug}/${safeLang}/${sourceHash}.json`;
}

// ── In-process lock ────────────────────────────────────────────────────────────
const _locks = new Map<string, Promise<TranslationRecord | null>>();

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getTranslation(
  slug: string,
  langCode: string,
  sourceHash: string
): Promise<TranslationRecord | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const path = blobPath(slug, langCode, sourceHash);
    const meta = await head(path).catch(() => null);
    if (!meta) return null;
    const res = await fetch(meta.url);
    if (!res.ok) return null;
    return (await res.json()) as TranslationRecord;
  } catch {
    return null;
  }
}

export async function saveTranslation(record: TranslationRecord): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const path = blobPath(record.slug, record.targetLang, record.sourceHash);
    await put(path, JSON.stringify(record, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } catch (err) {
    console.error("[translation-store] save failed:", err);
  }
}

export async function getOrGenerateTranslation(
  slug: string,
  langCode: string,
  sourceHash: string,
  generator: () => Promise<TranslationRecord | null>
): Promise<TranslationRecord | null> {
  // 1. Check persistent blob cache first
  const existing = await getTranslation(slug, langCode, sourceHash);
  if (existing) return existing;

  const key = `${slug}::${langCode}::${sourceHash}`;

  // 2. Reuse in-flight promise (same server instance)
  const inflight = _locks.get(key);
  if (inflight) return inflight;

  // 3. Generate with lock
  const promise = (async (): Promise<TranslationRecord | null> => {
    try {
      // Double-check after acquiring lock — another instance may have saved
      const recheck = await getTranslation(slug, langCode, sourceHash);
      if (recheck) return recheck;

      const record = await generator();
      if (record) await saveTranslation(record);
      return record;
    } finally {
      _locks.delete(key);
    }
  })();

  _locks.set(key, promise);
  return promise;
}
