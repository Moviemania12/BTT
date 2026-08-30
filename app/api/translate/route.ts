// ─── /api/translate ───────────────────────────────────────────────────────────
// POST: generate or return cached translation
// GET:  cache-only check (no Gemini call)
//
// Hash mismatch fix: server always computes the authoritative SHA-256 hash
// from the received sourceHtml. No client hash is accepted or validated —
// the client-sent hash was removed because client (FNV-1a) and server
// (SHA-256) used different algorithms, causing an always-failing mismatch.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { isValidLanguage, getLanguage } from "@/lib/languages";
import {
  hashContent,
  getTranslation,
  getOrGenerateTranslation,
  type TranslationRecord,
} from "@/lib/translation-store";

const MODEL = "gemini-2.5-flash";

// ── Gemini client (lazy, server-only) ─────────────────────────────────────────
let _ai: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!_ai) {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set");
    _ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return _ai;
}

// ── Per-IP rate limit (in-memory, 5 new translations/min/IP) ──────────────────
const _rate = new Map<string, { count: number; resetAt: number }>();
function checkRate(ip: string): boolean {
  const now = Date.now();
  const e = _rate.get(ip);
  if (!e || now > e.resetAt) {
    _rate.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count++;
  return true;
}

// ── Gemini translation ─────────────────────────────────────────────────────────
async function translateWithGemini(
  sourceHtml: string,
  targetLang: string,
  targetLangName: string
): Promise<string> {
  const ai = getAI();

  const prompt = `You are a professional technical translator for "Behind The Tech" (BTT), an educational platform about data center engineering.

The source article is written in a mixed Hindi-English ("Hinglish") conversational style — it uses Hindi grammar and sentence structure with English technical terms woven in naturally. The content is educational, technically accurate, and aimed at engineers and students learning about data centers and AI infrastructure.

Your task: Translate the COMPLETE article HTML into ${targetLangName} (language code: ${targetLang}).

TRANSLATION APPROACH:
- Understand the full meaning and intent of each sentence before translating
- Write naturally in ${targetLangName} as a native technical writer would — not word-for-word from Hindi or English
- Preserve the conversational, educational tone: clear, direct, friendly but technically precise
- Where the source uses Hindi idioms or explanations, convey the same intent naturally in ${targetLangName}

STRICT RULES — DO NOT violate these:
1. Translate ALL visible text content completely — do NOT summarize, skip, add or remove anything
2. Preserve ALL HTML structure exactly as-is: every tag, attribute, class name, id, data-*, aria-*, href, src — copy them verbatim
3. Never translate or alter: HTML tags, HTML attributes, CSS class names, URLs, href/src values
4. Never translate content inside <code> or <pre> tags — copy those blocks verbatim
5. Never translate: product names (NVIDIA, AMD, Google, Meta, AWS, Anthropic, OpenAI, Llama, MTIA, etc.), company names, technical acronyms (GPU, TPU, UPS, CDU, CRAC, CRAH, PDU, DG, HBM, ICI, RoCE, etc.), numbers with units, slug identifiers
6. For technical terms with no standard ${targetLangName} equivalent: keep the English term and add a brief ${targetLangName} explanation in parentheses on first use
7. Return ONLY the translated HTML — no preamble, no explanation, no markdown code fences, no extra content

Target: ${targetLangName} (${targetLang})
Source: Mixed Hindi-English technical article HTML

HTML to translate:
${sourceHtml}`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { maxOutputTokens: 65536, temperature: 0.1 },
  });

  const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("Gemini returned empty response");
  // Strip accidental markdown fences if model adds them despite instructions
  return text.replace(/^```html\n?/i, "").replace(/\n?```$/i, "").trim();
}

// ── POST ───────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    slug,
    sourceHtml,
    sourceLang = "en",
    targetLang,
    // NOTE: client-sent sourceHash intentionally NOT used.
    // Server always computes the authoritative hash from sourceHtml.
    // This eliminates the FNV-1a (client) vs SHA-256 (server) mismatch.
  } = body as {
    slug?: string;
    sourceHtml?: string;
    sourceLang?: string;
    targetLang?: string;
  };

  // ── Input validation ────────────────────────────────────────────────────────
  if (!slug || typeof slug !== "string" || !/^[a-zA-Z0-9\-_/]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 });
  }
  if (!targetLang || typeof targetLang !== "string" || !isValidLanguage(targetLang)) {
    return NextResponse.json(
      { error: `Unsupported or missing language: ${targetLang ?? ""}` },
      { status: 400 }
    );
  }
  if (!sourceHtml || typeof sourceHtml !== "string" || sourceHtml.trim().length < 20) {
    return NextResponse.json({ error: "sourceHtml is missing or too short" }, { status: 400 });
  }

  // ── Server-authoritative hash ───────────────────────────────────────────────
  const sourceHash = hashContent(sourceHtml);
  const langMeta = getLanguage(targetLang)!;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // ── Try cache, then generate ────────────────────────────────────────────────
  let cacheHit = false;

  try {
    const result = await getOrGenerateTranslation(
      slug,
      targetLang,
      sourceHash,
      async (): Promise<TranslationRecord | null> => {
        // Rate limit applies only to new Gemini calls, not cache hits
        if (!checkRate(ip)) throw new Error("RATE_LIMITED");

        const translatedHtml = await translateWithGemini(
          sourceHtml,
          targetLang,
          langMeta.name
        );

        return {
          slug: slug as string,
          sourceLang: (sourceLang as string) || "hi-en",
          targetLang,
          sourceHash,
          translatedHtml,
          model: MODEL,
          createdAt: new Date().toISOString(),
        };
      }
    );

    if (!result) {
      return NextResponse.json(
        { error: "Translation generation failed. The original article is still available." },
        { status: 500 }
      );
    }

    // Determine if this was a cache hit: if createdAt is older than ~2s it was pre-existing
    cacheHit =
      Date.now() - new Date(result.createdAt).getTime() > 2000;

    return NextResponse.json({
      translatedHtml: result.translatedHtml,
      cached: cacheHit,
      sourceHash: result.sourceHash,
      model: result.model,
      createdAt: result.createdAt,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "RATE_LIMITED") {
      return NextResponse.json(
        { error: "Too many translation requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    console.error("[/api/translate] Error:", err);
    return NextResponse.json(
      { error: "Translation failed. The original article is still available." },
      { status: 500 }
    );
  }
}

// ── GET — cache lookup only (no Gemini call) ───────────────────────────────────
export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams;
  const slug = p.get("slug") ?? "";
  const lang = p.get("lang") ?? "";
  const hash = p.get("hash") ?? "";

  if (!slug || !lang || !hash) {
    return NextResponse.json({ exists: false });
  }
  if (!isValidLanguage(lang)) {
    return NextResponse.json({ exists: false, error: "Invalid language" }, { status: 400 });
  }

  const record = await getTranslation(slug, lang, hash);
  if (!record) return NextResponse.json({ exists: false });

  return NextResponse.json({
    exists: true,
    translatedHtml: record.translatedHtml,
    sourceHash: record.sourceHash,
    model: record.model,
    createdAt: record.createdAt,
  });
}
