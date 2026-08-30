// ─── Client-side content hashing ─────────────────────────────────────────────
// Browser-compatible version of hashContent using Web Crypto API.
// Used by ArticleTranslator to compute source hash before sending to API.
// The server independently recomputes the hash and uses its value as authoritative.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compute a short deterministic hash of article source HTML.
 * Uses a simple FNV-1a 32-bit hash — fast, no async, good enough for
 * cache key discrimination (server uses SHA-256 as the authoritative hash).
 */
export function hashContent(content: string): string {
  let hash = 2166136261; // FNV offset basis (32-bit)
  for (let i = 0; i < content.length; i++) {
    hash ^= content.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime, keep 32-bit unsigned
  }
  return hash.toString(16).padStart(8, "0");
}
