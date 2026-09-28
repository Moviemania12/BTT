import { put, head } from "@vercel/blob";
import crypto from "crypto";

export const TRANSLATION_VERSION = "v6-gemini25flash";

export interface TranslationRecord {
  slug: string;
  sourceLang: string;
  targetLang: string;
  sourceHash: string;
  cacheKey: string;
  translatedHtml: string;
  model: string;
  promptVersion: string;
  createdAt: string;
}

export function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex").slice(0, 16);
}

export function makeCacheKey(canonicalSourceHtml: string, targetLang: string): string {
  return crypto
    .createHash("sha256")
    .update(canonicalSourceHtml + "|" + targetLang + "|" + TRANSLATION_VERSION)
    .digest("hex")
    .slice(0, 20);
}

export function blobPath(slug: string, langCode: string, cacheKey: string): string {
  const safeSlug = slug.replace(/[^a-zA-Z0-9\-_/]/g, "_");
  const safeLang = langCode.replace(/[^a-zA-Z0-9\-]/g, "_");
  return `translations/${safeSlug}/${safeLang}/${cacheKey}.json`;
}

export async function getTranslation(
  slug: string,
  langCode: string,
  cacheKey: string
): Promise<TranslationRecord | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const path = blobPath(slug, langCode, cacheKey);
    const meta = await head(path).catch(() => null);
    if (!meta) return null;
    const res = await fetch(meta.url, { next: { revalidate: 0 } } as RequestInit);
    if (!res.ok) return null;
    return (await res.json()) as TranslationRecord;
  } catch {
    return null;
  }
}

export async function saveTranslation(record: TranslationRecord): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN)
    throw new Error("BLOB_READ_WRITE_TOKEN not set");
  const path = blobPath(record.slug, record.targetLang, record.cacheKey);
  await put(path, JSON.stringify(record, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}
