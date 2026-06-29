// ─── BTT Assistant API — Gemini 2.5 Flash backend ────────────────────────────
// Streaming SSE · Rate limiting · Auto-retry · Context optimization
// Google GenAI SDK: @google/genai
// ─────────────────────────────────────────────────────────────────────────────

import { GoogleGenAI } from "@google/genai";
import type { Content } from "@google/genai";
import { NextRequest } from "next/server";
import {
  retrieve,
  buildContext,
  getRelated,
  getContinueLearning,
  generateFollowUps,
  buildSources,
  getLearningPath,
  type ArticleRef,
  type RetrievedTopic,
} from "@/lib/btt-retrieval";

// ─── Client ────────────────────────────────────────────────────────────────────

if (!process.env.GEMINI_API_KEY) {
  throw new Error("[BTT] GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = "gemini-2.5-flash";
const MAX_OUTPUT_TOKENS = 1024;
const MAX_HISTORY_MESSAGES = 24; // 12 conversation turns max
const encoder = new TextEncoder();

// ─── Types ─────────────────────────────────────────────────────────────────────

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages?: IncomingMessage[];
  currentSlug?: string;
  currentHeading?: string;
  currentTrack?: string;
  currentCategory?: string;
}

type SSEEvent =
  | { type: "meta"; relatedArticles: ArticleRef[]; continueLearning: ArticleRef | null; sources: string[] }
  | { type: "token"; text: string }
  | { type: "followups"; questions: string[] }
  | { type: "done" }
  | { type: "error"; message: string };

// ─── Rate limiter ─────────────────────────────────────────────────────────────
// In-memory per-IP limiter. Works well for single-instance deployments.
// For multi-instance / edge, swap with Redis or Upstash.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RL_MAX_REQUESTS = 30;
const RL_WINDOW_MS = 60_000; // 1 minute

// Stale-entry cleanup (runs every 2 minutes, no timer leak on serverless)
let lastCleanup = Date.now();
function cleanRateLimiter(): void {
  const now = Date.now();
  if (now - lastCleanup < RL_WINDOW_MS * 2) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitStore) {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  }
}

function checkRateLimit(ip: string): { limited: boolean; retryAfterMs: number } {
  cleanRateLimiter();
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return { limited: false, retryAfterMs: 0 };
  }

  if (entry.count >= RL_MAX_REQUESTS) {
    return { limited: true, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { limited: false, retryAfterMs: 0 };
}

// ─── Retry with exponential backoff ───────────────────────────────────────────

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 500
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      // Do not retry on client errors (400–499)
      const status = (err as Record<string, unknown>)?.status as number | undefined;
      if (status !== undefined && status >= 400 && status < 500) throw err;

      if (attempt < maxAttempts - 1) {
        const delay = baseDelayMs * 2 ** attempt + Math.random() * 100;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  throw lastError;
}

// ─── Message format utilities ─────────────────────────────────────────────────

/** Convert our internal message format to Gemini's Content array. */
function toGeminiContents(messages: IncomingMessage[]): Content[] {
  return messages.map((m): Content => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

/**
 * Trim conversation history to MAX_HISTORY_MESSAGES.
 * Always preserves the final user message.
 * Ensures the trimmed slice begins with a "user" turn (Gemini requirement).
 */
function trimHistory(messages: IncomingMessage[]): IncomingMessage[] {
  if (messages.length <= MAX_HISTORY_MESSAGES) return messages;

  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES);

  // Gemini requires the first turn to be "user"
  const firstUserIdx = trimmed.findIndex((m) => m.role === "user");
  return firstUserIdx > 0 ? trimmed.slice(firstUserIdx) : trimmed;
}

// ─── SSE helpers ──────────────────────────────────────────────────────────────

function sseChunk(event: SSEEvent): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(event)}\n\n`);
}

function sseResponse(body: ReadableStream<Uint8Array>): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "Connection": "keep-alive",
    },
  });
}

function errorStream(message: string): Response {
  return sseResponse(
    new ReadableStream<Uint8Array>({
      start(ctrl) {
        ctrl.enqueue(sseChunk({ type: "error", message }));
        ctrl.close();
      },
    })
  );
}

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(
  articleContext: string,
  learningPathText: string,
  readingContext: string
): string {
  return `You are BTT Assistant — the official AI mentor for Behind The Tech (behindthetech.in), India's Data Center knowledge platform.

Built by Kumar Anil (Project Manager – Data Center). Your goal: take learners from complete beginner to Data Center engineer.
${readingContext}
${articleContext}
═══════════════════════════════════════════════════════════════
KNOWLEDGE PRIORITY (strict order)
═══════════════════════════════════════════════════════════════
1. BTT article content injected above — use it first, always
2. Your own Data Center & engineering expertise
3. General knowledge for everything else

Never say "I only answer Data Center questions." Answer everything naturally.

═══════════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════════
Language   : Natural Hinglish (mix Hindi + English). Match what the user writes.
Paragraphs : Max 2–3 lines each. Never walls of text.
Formatting : Use Markdown freely — **bold**, bullet lists, numbered steps, \`inline code\`, fenced code blocks, tables.
Tone       : Senior Data Center engineer + great teacher + friendly colleague. NOT customer support.

═══════════════════════════════════════════════════════════════
AUTOMATIC MODES
═══════════════════════════════════════════════════════════════

EXPLAIN (default)
Start with a simple real-world analogy. Then explain the Data Center angle. Keep it human.

TROUBLESHOOT — triggers: fault / error / alarm / trip / kaam nahi kar raha / issue / problem
Structure every troubleshooting answer as:
**Problem** — restate the issue clearly
**Possible Causes** — list most likely first
**Checks** — what to inspect, in order
**Diagnosis** — how to narrow it down
**Solution** — step-by-step fix
🛡️ **Safety** — LOTO / PTW / PPE / isolation warnings (mandatory for electrical work)

CALCULATE — triggers: calculate / formula / kitna / fuel / backup time / cable size / voltage drop / power factor
Formula first → plug in given values → solve step by step → state final answer with units.

INTERVIEW — triggers: interview / mock interview / interview prep / interview practice
Ask ONE question. Wait for the answer. Evaluate it. Give specific feedback. Then ask next question (progressively harder).

QUIZ — triggers: quiz / test me / test karo / MCQ
Generate 5 questions, one at a time. Easy → Medium → Hard. Grade each answer. Explain correct answer. Show final score.

LEARN NEXT — triggers: new / beginner / fresher / kahan se shuru karoon / where to start
Guide through the BTT learning path:
${learningPathText}
Explain what each step covers. Tell them to start from the first one.

═══════════════════════════════════════════════════════════════
FULL CAPABILITIES
═══════════════════════════════════════════════════════════════
Data Centers, electrical engineering, HVAC, fire protection, BMS, DCIM, networking,
servers, storage, cloud, AI infrastructure, construction, project management,
electrical calculations, career guidance, interview preparation, certifications (CDCP/BICSI),
programming, mathematics, science, writing, emails, travel, general knowledge — everything.

═══════════════════════════════════════════════════════════════
ACCURACY & SAFETY RULES
═══════════════════════════════════════════════════════════════
• Never invent technical values, IS codes, or OEM specifications.
• If unsure: "Yeh confirm nahi kar sakta — OEM manual ya official docs zaroor check karo."
• For live electrical work: always include LOTO / PTW / PPE / isolation warnings.
• Accurate over comprehensive. Less and correct beats more and wrong.`;
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<Response> {
  // ── Rate limit check ──
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { limited, retryAfterMs } = checkRateLimit(clientIp);
  if (limited) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Thodi der baad try karo." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil(retryAfterMs / 1000)),
        },
      }
    );
  }

  // ── Parse body ──
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return errorStream("Invalid request format.");
  }

  const rawMessages: IncomingMessage[] = body.messages ?? [];
  const currentSlug = body.currentSlug;
  const currentHeading = body.currentHeading;

  // ── Filter UI-only greeting ──
  const cleanedMessages = rawMessages.filter(
    (m) =>
      !(
        m.role === "assistant" &&
        m.content.startsWith("Namaste! Main BTT Assistant")
      )
  );

  // ── Validate ──
  if (
    cleanedMessages.length === 0 ||
    cleanedMessages[cleanedMessages.length - 1].role !== "user"
  ) {
    return errorStream("Koi question nahi mila. Kuch poochho! 😊");
  }

  // ── Context window optimization ──
  const history = trimHistory(cleanedMessages);
  const userQuery = history[history.length - 1].content;

  // ── RAG retrieval ──
  const retrieved: RetrievedTopic[] = retrieve(userQuery, {
    currentSlug,
    currentHeading,
    limit: 3,
  });
  const articleContext = buildContext(retrieved);

  // ── Reading context hint (article + section awareness) ──
  let readingContext = "";
  if (currentSlug && currentHeading) {
    readingContext = `\n📍 User is reading section: "${currentHeading}" of article: "${currentSlug}". Prioritize this context.\n`;
  } else if (currentSlug) {
    readingContext = `\n📍 User is reading article: "${currentSlug}". Prioritize this content.\n`;
  }

  // ── Pre-compute metadata (sent before streaming begins) ──
  const relatedSlugs = retrieved.flatMap((r: RetrievedTopic) => r.related);
  const relatedArticles: ArticleRef[] = getRelated(relatedSlugs, 4);
  const anchorSlug = currentSlug ?? retrieved[0]?.slug;
  const continueLearning: ArticleRef | null = anchorSlug
    ? getContinueLearning(anchorSlug)
    : null;
  const sources: string[] = buildSources(retrieved);

  // ── System prompt ──
  const learningPath = getLearningPath("non-it", "electrical")
    .map((t) => t.title)
    .join(" → ");
  const systemPrompt = buildSystemPrompt(articleContext, learningPath, readingContext);

  // ── Gemini content array (all turns except the last user message) ──
  // The last user message is passed separately via sendMessageStream for clarity,
  // but we include the full history in generateContentStream contents.
  const geminiContents: Content[] = toGeminiContents(history);

  // ── SSE streaming ──
  const readableStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: SSEEvent): void => {
        try {
          controller.enqueue(sseChunk(event));
        } catch {
          // Controller may be closed if client disconnected
        }
      };

      try {
        // 1. Send metadata immediately — no waiting for Gemini
        send({ type: "meta", relatedArticles, continueLearning, sources });

        // 2. Call Gemini with streaming + auto-retry
        const geminiStream = await withRetry(
          () =>
            ai.models.generateContentStream({
              model: MODEL,
              contents: geminiContents,
              config: {
                systemInstruction: systemPrompt,
                maxOutputTokens: MAX_OUTPUT_TOKENS,
                temperature: 0.7,
                topP: 0.95,
              },
            }),
          3,   // max attempts
          500  // base delay ms
        );

        // 3. Stream tokens to client
        for await (const chunk of geminiStream) {
          const text = chunk.text;
          if (text) {
            send({ type: "token", text });
          }
        }

        // 4. Generate follow-up questions (from topics.ts — instant, no extra API call)
        const followUps = generateFollowUps(retrieved, userQuery);
        send({ type: "followups", questions: followUps });

        // 5. Signal completion
        send({ type: "done" });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown server error";
        console.error("[BTT Assistant] Gemini stream error:", message);

        send({
          type: "error",
          message:
            "Server thoda busy hai 😅 Thodi der baad try karo ya BTT pe articles padho!",
        });
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed
        }
      }
    },

    // Handle client disconnect gracefully
    cancel() {
      // ReadableStream cancelled — client closed connection
      // Gemini stream will be garbage collected
    },
  });

  return sseResponse(readableStream);
}
