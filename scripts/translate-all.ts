import { config } from "dotenv";
config({ path: ".env.local" });
import { createHash } from "crypto";
import { put, head } from "@vercel/blob";
import { GoogleGenAI } from "@google/genai";
import DOMPurify from "isomorphic-dompurify";
import * as path from "path";
import * as fs from "fs";

import { SUPPORTED_LANGUAGES } from "../lib/languages";
import {
  TRANSLATION_VERSION,
  blobPath,
  makeCacheKey,
  hashContent,
} from "../lib/translation-store";
import { ALL_TOPICS, getTopicUrl } from "../lib/topics";

interface Article {
  slug: string;
  url: string;
}

const MODEL = "gemini-2.5-flash";
const MAX_CHUNK_CHARS = 12_000;
const GEMINI_TIMEOUT_MS = 55_000;
const INTER_CALL_DELAY_MS = 1_200;
const MAX_RETRIES = 2;

const argv = process.argv.slice(2);

const getArg = (key: string) =>
  argv
    .find((arg) => arg.startsWith(`--${key}=`))
    ?.split("=")
    .slice(1)
    .join("=") ?? null;

const BASE_URL = getArg("base-url") ?? "http://localhost:3000";
const ONLY_SLUG = getArg("slug");
const ONLY_LANGS =
  getArg("lang")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? null;

function discoverArticles(): Article[] {
  return ALL_TOPICS
    .filter((topic) => topic.status === "published")
    .map((topic) => ({
      slug: topic.slug,
      url: getTopicUrl(topic),
    }));
}

async function fetchCanonicalHtml(slug: string): Promise<string> {
  const url = `${BASE_URL}/api/article-source/${encodeURIComponent(slug)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "BTT-Translator/1.0",
    },
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      `${response.status}: ${
        (body as { error?: string }).error ?? url
      }`
    );
  }

  const data = (await response.json()) as {
    slug: string;
    html: string;
  };

  if (!data.html) {
    throw new Error(`Empty canonical HTML for ${slug}`);
  }

  return data.html;
}

const STRIP_ATTR_RE =
  /\s+(?:style|class|data-[a-z][a-z0-9-]*|aria-[a-z][a-z0-9-]*|role|tabindex)="[^"]*"/gi;

let placeholderIndex = 0;

interface PrepResult {
  chunks: Array<{
    stripped: string;
    original: string;
  }>;
  svgMap: Map<string, string>;
  codeMap: Map<string, string>;
}

function prepareHtml(html: string): PrepResult {
  const svgMap = new Map<string, string>();
  const codeMap = new Map<string, string>();

  let work = html
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, (match) => {
      const placeholder = `%%SVG${placeholderIndex++}%%`;
      svgMap.set(placeholder, match);
      return placeholder;
    })
    .replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
      const placeholder = `%%CODE${placeholderIndex++}%%`;
      codeMap.set(placeholder, match);
      return placeholder;
    });

  const chunks = splitSafe(work).map((original) => ({
    original,
    stripped: original.replace(STRIP_ATTR_RE, ""),
  }));

  return {
    chunks,
    svgMap,
    codeMap,
  };
}

function splitSafe(html: string): string[] {
  if (html.length <= MAX_CHUNK_CHARS) {
    return [html];
  }

  for (const boundary of [
    /(?<=<\/section>)/gi,
    /(?<=<\/h2>)/gi,
    /(?<=<\/h3>)/gi,
    /(?<=<\/p>)/gi,
  ]) {
    const parts = html.split(boundary);

    if (parts.length <= 1) {
      continue;
    }

    const merged = mergeToMax(parts, MAX_CHUNK_CHARS);

    if (merged.every((chunk) => chunk.length <= MAX_CHUNK_CHARS * 3)) {
      return merged;
    }
  }

  console.warn(
    `No safe split for ${html.length} characters; sending as one chunk`
  );

  return [html];
}

function mergeToMax(parts: string[], max: number): string[] {
  const result: string[] = [];
  let current = "";

  for (const part of parts) {
    if (current && current.length + part.length > max) {
      result.push(current);
      current = part;
    } else {
      current += part;
    }
  }

  if (current) {
    result.push(current);
  }

  return result;
}

function restoreAttrs(translated: string, original: string): string {
  const originalTags: Array<{
    tag: string;
    full: string;
  }> = [];

  const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>/g;

  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(original)) !== null) {
    if (!match[0].endsWith("/>")) {
      originalTags.push({
        tag: match[1].toLowerCase(),
        full: match[0],
      });
    }
  }

  if (originalTags.length === 0) {
    return translated;
  }

  let index = 0;

  return translated.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>/g,
    (full, tagName) => {
      if (full.endsWith("/>")) {
        return full;
      }

      const name = String(tagName).toLowerCase();

      while (
        index < originalTags.length &&
        originalTags[index].tag !== name
      ) {
        index++;
      }

      if (index >= originalTags.length) {
        return full;
      }

      return originalTags[index++].full;
    }
  );
}

function restorePlaceholders(
  html: string,
  svgMap: Map<string, string>,
  codeMap: Map<string, string>
): string {
  let result = html;

  for (const [placeholder, original] of codeMap.entries()) {
    result = result.split(placeholder).join(original);
  }

  for (const [placeholder, original] of svgMap.entries()) {
    result = result.split(placeholder).join(original);
  }

  return result;
}

const SANITIZE_CFG = {
  ALLOWED_TAGS: [
    "h1","h2","h3","h4","h5","h6",
    "p","br","hr","div","span","section",
    "article","header","footer","main","aside",
    "ul","ol","li","dl","dt","dd",
    "table","thead","tbody","tfoot","tr","th","td",
    "caption","colgroup","col",
    "a","strong","b","em","i","u","s","del","ins",
    "mark","small","sub","sup","abbr",
    "blockquote","q","cite",
    "pre","code","kbd","samp","var",
    "figure","figcaption","img","picture","source",
    "svg","path","circle","rect","line","polyline",
    "polygon","text","g","defs","marker","use","symbol",
    "clipPath","mask","pattern","filter",
    "linearGradient","radialGradient","stop",
    "textPath","tspan",
    "details","summary","time","address",
  ],
  ALLOWED_ATTR: [
    "id","class","style","href","src","alt","title",
    "lang","dir","type","name","width","height",
    "viewBox","xmlns","fill","stroke","stroke-width",
    "stroke-linecap","stroke-linejoin","stroke-dasharray",
    "opacity","d","cx","cy","r","rx","ry",
    "x","y","x1","y1","x2","y2","points","transform",
    "text-anchor","dominant-baseline","font-size",
    "font-family","font-weight",
    "data-ph","data-homepage-theme",
    "aria-label","aria-labelledby","aria-hidden",
    "aria-describedby","role","target","rel",
    "colspan","rowspan","scope","loading","decoding",
    "srcset","sizes","tabindex",
  ],
  FORBID_TAGS: [
    "script","object","embed","form","input","button",
    "iframe","frame","frameset","base",
  ],
  FORBID_ATTR: [
    "onerror","onload","onclick","onmouseover",
    "onmouseout","onfocus","onblur","onchange",
    "onsubmit","onkeyup","onkeydown","onkeypress",
  ],
};

function sanitizeHtml(html: string): string {
  return String(DOMPurify.sanitize(html, SANITIZE_CFG));
}

function validate(
  original: string,
  translated: string,
  svgMap: Map<string, string>,
  codeMap: Map<string, string>
): { ok: boolean; reason?: string } {
  if (!translated || translated.trim().length < 50) {
    return {
      ok: false,
      reason: "Output too short (< 50 chars)",
    };
  }

  if (translated.length / original.length < 0.25) {
    return {
      ok: false,
      reason: `Size ratio too low: ${(
        translated.length / original.length
      ).toFixed(2)}`,
    };
  }

  for (const placeholder of codeMap.keys()) {
    if (translated.includes(placeholder)) {
      return {
        ok: false,
        reason: `Unreplaced: ${placeholder}`,
      };
    }
  }

  for (const placeholder of svgMap.keys()) {
    if (translated.includes(placeholder)) {
      return {
        ok: false,
        reason: `Unreplaced: ${placeholder}`,
      };
    }
  }

  if (/%%(?:SVG|CODE)\d+%%/.test(translated)) {
    return {
      ok: false,
      reason: "Leaked placeholder in output",
    };
  }

  return { ok: true };
}

let ai: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set");
    }

    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return ai;
}

async function callGemini(prompt: string): Promise<string> {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    GEMINI_TIMEOUT_MS
  );

  try {
    const response = await getAI().models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        maxOutputTokens: 32768,
        temperature: 0.1,
        abortSignal: controller.signal,
      },
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!text) {
      throw new Error("Empty Gemini response");
    }

    return text
      .replace(/^```html\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();
  } finally {
    clearTimeout(timeout);
  }
}

function buildPrompt(
  stripped: string,
  langCode: string,
  langName: string,
  index: number,
  total: number
): string {
  const context =
    total > 1 ? `\n(Section ${index + 1}/${total})` : "";

  if (langCode === "en") {
    return `You are a senior technical writer converting Hinglish (Hindi+English) to fluent professional English.

Data center engineering article for Indian engineers.

Understand the meaning and express it naturally. Never translate word-for-word.

HTML RULES:
1. Return ONLY HTML.
2. Preserve the exact tags and nesting.
3. %%SVGn%% and %%CODEn%% must remain VERBATIM unchanged.
4. Keep product names, company names, technical identifiers, URLs, numbers and units unchanged.
5. Do not add information.
6. No preamble.
7. No markdown fences.
${context}

HTML:
${stripped}`;
  }

  return `You are a professional technical translator converting Hinglish to ${langName}.

Data center engineering article for Indian engineers.

Understand the Hinglish meaning and express it naturally. Never translate word-for-word.

HTML RULES:
1. Return ONLY HTML.
2. Preserve the exact tags and nesting.
3. %%SVGn%% and %%CODEn%% must remain VERBATIM unchanged.
4. Keep product names, company names, technical identifiers, URLs, numbers and units unchanged.
5. Do not add information.
6. No preamble.
7. No markdown fences.
${context}

HTML:
${stripped}`;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isCached(
  slug: string,
  lang: string,
  key: string
): Promise<boolean> {
  try {
    return !!(await head(blobPath(slug, lang, key)));
  } catch {
    return false;
  }
}

async function translateArticle(
  slug: string,
  langCode: string,
  langName: string,
  canonicalHtml: string
): Promise<string> {
  const prepared = prepareHtml(canonicalHtml);
  const translatedChunks: string[] = [];

  for (let i = 0; i < prepared.chunks.length; i++) {
    const chunk = prepared.chunks[i];

    let output = "";

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        output = await callGemini(
          buildPrompt(
            chunk.stripped,
            langCode,
            langName,
            i,
            prepared.chunks.length
          )
        );
        break;
      } catch (error) {
        if (attempt === MAX_RETRIES) {
          throw error;
        }

        await delay(2000 * (attempt + 1));
      }
    }

    translatedChunks.push(
      restoreAttrs(output, chunk.original)
    );

    if (i < prepared.chunks.length - 1) {
      await delay(INTER_CALL_DELAY_MS);
    }
  }

  const joined = translatedChunks.join("\n");

  const restored = restorePlaceholders(
    joined,
    prepared.svgMap,
    prepared.codeMap
  );

  const validation = validate(
    canonicalHtml,
    restored,
    prepared.svgMap,
    prepared.codeMap
  );

  if (!validation.ok) {
    throw new Error(`Validation: ${validation.reason}`);
  }

  return sanitizeHtml(restored);
}

interface JobResult {
  slug: string;
  lang: string;
  status: "generated" | "skipped" | "failed";
  ms?: number;
  reason?: string;
}

async function main(): Promise<void> {
  console.log("\n🌐 BTT Translation Pre-Generator\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY not set");
    process.exit(1);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN not set");
    process.exit(1);
  }

  const articles = discoverArticles().filter(
    (article) => !ONLY_SLUG || article.slug === ONLY_SLUG
  );

  const languages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      !ONLY_LANGS ||
      ONLY_LANGS.includes(lang.code)
  );

  if (articles.length === 0) {
    throw new Error("No matching published articles found");
  }

  if (languages.length === 0) {
    throw new Error("No matching supported languages found");
  }

  console.log(
    `Articles: ${articles.length} | Languages: ${languages.length}`
  );
  console.log(`Base URL: ${BASE_URL}\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  const results: JobResult[] = [];

  for (const article of articles) {
    console.log(`\n📄 ${article.slug}`);

    let canonicalHtml: string;

    try {
      canonicalHtml = await fetchCanonicalHtml(article.slug);
      console.log(
        `   Source: ${canonicalHtml.length.toLocaleString()} chars`
      );
    } catch (error) {
      const reason =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(`   ❌ Source failed: ${reason}`);

      for (const lang of languages) {
        failed++;
        results.push({
          slug: article.slug,
          lang: lang.code,
          status: "failed",
          reason,
        });
      }

      continue;
    }

    const cacheKeyBase = hashContent(canonicalHtml);

    for (const lang of languages) {
      const cacheKey = makeCacheKey(
        canonicalHtml,
        lang.code,
      );

      try {
        if (
          await isCached(
            article.slug,
            lang.code,
            cacheKey
          )
        ) {
          console.log(
            `   ${lang.code.padEnd(7)} cached`
          );

          skipped++;

          results.push({
            slug: article.slug,
            lang: lang.code,
            status: "skipped",
          });

          continue;
        }

        const start = Date.now();

        process.stdout.write(
          `   🔄 ${lang.code.padEnd(7)} translating...\n`
        );

        const translatedHtml = await translateArticle(
          article.slug,
          lang.code,
          lang.name,
          canonicalHtml
        );

        await put(
          blobPath(
            article.slug,
            lang.code,
            cacheKey
          ),
          JSON.stringify(
            {
              slug: article.slug,
              sourceLang: "hi-en",
              targetLang: lang.code,
              sourceHash: cacheKeyBase,
              cacheKey,
              translatedHtml,
              model: MODEL,
              promptVersion: TRANSLATION_VERSION,
              createdAt: new Date().toISOString(),
            },
            null,
            2
          ),
          {
            access: "public",
            contentType: "application/json",
            addRandomSuffix: false,
          }
        );

        const ms = Date.now() - start;

        console.log(
          `   ✅ ${lang.code.padEnd(7)} ${ms}ms`
        );

        generated++;

        results.push({
          slug: article.slug,
          lang: lang.code,
          status: "generated",
          ms,
        });
      } catch (error) {
        const reason =
          error instanceof Error
            ? error.message
            : String(error);

        console.error(
          `   ❌ ${lang.code}: ${reason}`
        );

        failed++;

        results.push({
          slug: article.slug,
          lang: lang.code,
          status: "failed",
          reason,
        });
      }
    }
  }

  const total = generated + skipped + failed;

  fs.writeFileSync(
    "translation-report.json",
    JSON.stringify(
      {
        generated,
        skipped,
        failed,
        total,
        results,
      },
      null,
      2
    )
  );

  console.log("\n────────────────────────────");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
  console.log(`Total:     ${total}`);
  console.log("Report:    translation-report.json");

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("Fatal:", error);
  process.exit(1);
});