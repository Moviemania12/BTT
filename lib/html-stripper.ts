export const MAX_CHUNK_CHARS = 12_000;

export interface Chunk {
  stripped: string;
  original: string;
}

export interface PrepareResult {
  chunks: Chunk[];
  svgMap: Map<string, string>;
  codeMap: Map<string, string>;
  originalWithPlaceholders: string;
}

let _phIdx = 0;
const STRIP_ATTR_RE = /\s+(?:style|class|data-[a-z][a-z0-9-]*|aria-[a-z][a-z0-9-]*|role|tabindex)="[^"]*"/gi;

export function prepareChunks(html: string): PrepareResult {
  const svgMap = new Map<string, string>();
  const codeMap = new Map<string, string>();

  let work = html
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, m => {
      const ph = `%%SVG${_phIdx++}%%`; svgMap.set(ph, m); return ph;
    })
    .replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, m => {
      const ph = `%%CODE${_phIdx++}%%`; codeMap.set(ph, m); return ph;
    });

  const originalWithPlaceholders = work;
  const rawChunks = splitSafe(work);
  const chunks: Chunk[] = rawChunks.map(orig => ({
    original: orig,
    stripped: orig.replace(STRIP_ATTR_RE, ""),
  }));

  return { chunks, svgMap, codeMap, originalWithPlaceholders };
}

export function restorePlaceholders(
  html: string,
  svgMap: Map<string, string>,
  codeMap: Map<string, string>
): string {
  let r = html;
  Array.from(codeMap.entries()).forEach(([ph, orig]) => { r = r.split(ph).join(orig); });
  Array.from(svgMap.entries()).forEach(([ph, orig]) => { r = r.split(ph).join(orig); });
  return r;
}

function splitSafe(html: string): string[] {
  if (html.length <= MAX_CHUNK_CHARS) return [html];
  for (const b of [/(?<=<\/section>)/gi, /(?<=<\/h2>)/gi, /(?<=<\/h3>)/gi, /(?<=<\/p>)/gi]) {
    b.lastIndex = 0;
    const parts = html.split(b);
    if (parts.length <= 1) continue;
    const merged = mergeToMax(parts, MAX_CHUNK_CHARS);
    if (merged.every(c => c.length <= MAX_CHUNK_CHARS * 3)) return merged;
  }
  return [html];
}

function mergeToMax(parts: string[], max: number): string[] {
  const result: string[] = []; let cur = "";
  for (const p of parts) {
    if (cur && cur.length + p.length > max) { result.push(cur); cur = p; }
    else cur += p;
  }
  if (cur) result.push(cur);
  return result;
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
