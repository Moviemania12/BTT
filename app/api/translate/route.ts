import { NextRequest, NextResponse } from "next/server";
import { isValidLanguage } from "@/lib/languages";
import { makeCacheKey, getTranslation } from "@/lib/translation-store";

export async function POST(req: NextRequest) {
  const t0 = Date.now();
  if (!process.env.BLOB_READ_WRITE_TOKEN)
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN not configured" }, { status: 503 });
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const { slug, sourceHtml, targetLang } = body as { slug?: string; sourceHtml?: string; targetLang?: string };
  if (!slug || typeof slug !== "string" || !/^[a-zA-Z0-9\-_/]+$/.test(slug))
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  if (!targetLang || !isValidLanguage(targetLang))
    return NextResponse.json({ error: `Unsupported language: ${targetLang ?? ""}` }, { status: 400 });
  if (!sourceHtml || typeof sourceHtml !== "string" || sourceHtml.trim().length < 20)
    return NextResponse.json({ error: "sourceHtml too short" }, { status: 400 });
  const cacheKey = makeCacheKey(sourceHtml, targetLang);
  console.log(`[translate] POST slug=${slug} lang=${targetLang} key=${cacheKey} ${Date.now()-t0}ms`);
  const record = await getTranslation(slug, targetLang, cacheKey);
  if (record) {
    return NextResponse.json({ status: "done", translatedHtml: record.translatedHtml, cached: true, cacheKey, model: record.model, createdAt: record.createdAt, meta: { totalMs: Date.now()-t0 } });
  }
  return NextResponse.json({ status: "missing", cacheKey });
}

export async function GET(req: NextRequest) {
  const p = new URL(req.url).searchParams;
  const slug = p.get("slug") ?? "", lang = p.get("lang") ?? "", cacheKey = p.get("cacheKey") ?? "";
  if (!slug || !lang || !cacheKey) return NextResponse.json({ exists: false });
  if (!isValidLanguage(lang)) return NextResponse.json({ exists: false, error: "Invalid language" }, { status: 400 });
  const record = await getTranslation(slug, lang, cacheKey);
  if (!record) return NextResponse.json({ exists: false, status: "missing" });
  return NextResponse.json({ exists: true, status: "done", translatedHtml: record.translatedHtml, cacheKey: record.cacheKey, model: record.model, createdAt: record.createdAt });
}
