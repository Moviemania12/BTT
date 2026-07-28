import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getDailyPostForDate } from "@/content/social/daily-post-engine";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";

interface CloudflareImageResponse {
  result?: {
    image?: string;
  };
}

interface PosterContent {
  hindiHeadline: string;
  hindiHook: string;
  imagePrompt: string;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cleanJson(text: string) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function wrapEnglishHeadline(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > 24 && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 4);
}

function wrapHindi(text: string, maxChars = 32): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

// -----------------------------------------
// GEMINI RETRY
// -----------------------------------------

async function generateGeminiContentWithRetry(
  ai: GoogleGenAI,
  contents: string,
  maxAttempts = 4
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
    } catch (error) {
      lastError = error;

      console.warn(
        `[BTT Gemini] Attempt ${attempt}/${maxAttempts} failed`,
        error
      );

      if (attempt >= maxAttempts) {
        break;
      }

      // Retry delays:
      // attempt 1 -> wait 2 seconds
      // attempt 2 -> wait 4 seconds
      // attempt 3 -> wait 6 seconds
      const delayMs = attempt * 2000;

      await new Promise((resolve) => {
        setTimeout(resolve, delayMs);
      });
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }

  throw new Error("Gemini generation failed after retries.");
}

export async function GET() {
  try {
    // -----------------------------------------
    // ENVIRONMENT
    // -----------------------------------------

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_AI_API_TOKEN;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!accountId || !apiToken) {
      throw new Error(
        "Cloudflare Workers AI environment variables are not configured."
      );
    }

    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    // -----------------------------------------
    // TODAY'S POST
    // -----------------------------------------

    const post = getDailyPostForDate();

    // -----------------------------------------
    // GENERATE HINDI + IMAGE PROMPT
    // -----------------------------------------

    const ai = new GoogleGenAI({
      apiKey: geminiApiKey,
    });

    const contentResponse = await generateGeminiContentWithRetry(
      ai,
      `
Create supporting content for a premium bilingual technology poster
for Behind The Tech.

Today's topic:
${post.topic}

English headline:
${post.posterHeadline}

English hook:
${post.hook}

Visual direction:
${post.visualDirection}

Return ONLY valid JSON using exactly:

{
  "hindiHeadline": "...",
  "hindiHook": "...",
  "imagePrompt": "..."
}

RULES

hindiHeadline:
Create a concise natural Hindi/Hinglish version of the English headline.
Keep it suitable for an Instagram technology poster.
Avoid overly formal Hindi.

hindiHook:
Create a short natural Hindi/Hinglish version of the English hook.
Maximum approximately 20 words.

imagePrompt:
Write a detailed English image-generation prompt representing the
exact topic and visual direction.

Image style:
Photorealistic.
Premium cinematic technology documentary.
Professional engineering environment.
Technically believable.
Modern enterprise infrastructure.
Dramatic realistic lighting.
Deep perspective.

Composition:
Vertical 4:5.
Keep the upper portion relatively dark and clean for typography.
Keep important subjects mainly in the middle/lower area.

The generated image must contain:
NO text.
NO letters.
NO logos.
NO labels.
NO captions.
NO watermarks.
NO typography.
`
    );

    const rawContent = contentResponse.text?.trim();

    if (!rawContent) {
      throw new Error("Gemini returned empty poster content.");
    }

    const generated = JSON.parse(
      cleanJson(rawContent)
    ) as PosterContent;

    if (
      !generated.hindiHeadline ||
      !generated.hindiHook ||
      !generated.imagePrompt
    ) {
      throw new Error("Gemini returned incomplete poster content.");
    }

    // -----------------------------------------
    // GENERATE CLOUDFLARE BACKGROUND
    // -----------------------------------------

    const cloudflareResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CLOUDFLARE_MODEL}`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: generated.imagePrompt,

          // Known working Cloudflare dimensions
          width: 768,
          height: 960,

          num_steps: 4,
        }),
      }
    );

    if (!cloudflareResponse.ok) {
      const details = await cloudflareResponse.text();

      throw new Error(
        `Cloudflare Workers AI failed (${cloudflareResponse.status}): ${details}`
      );
    }

    const cloudflareData =
      (await cloudflareResponse.json()) as CloudflareImageResponse;

    const base64Image = cloudflareData.result?.image;

    if (!base64Image) {
      throw new Error("Cloudflare did not return image data.");
    }

    const backgroundImage = Buffer.from(base64Image, "base64");

    // -----------------------------------------
    // LOAD DEVANAGARI FONT
    // -----------------------------------------

    const fontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "NotoSansDevanagari.ttf"
    );

    if (!fs.existsSync(fontPath)) {
      throw new Error(
        "NotoSansDevanagari.ttf was not found in public/fonts."
      );
    }

    const fontBase64 = fs.readFileSync(fontPath).toString("base64");

    // -----------------------------------------
    // PREPARE DYNAMIC TEXT
    // -----------------------------------------

    const series = post.series.toUpperCase();

    const englishHeadline = wrapEnglishHeadline(
      post.posterHeadline.toUpperCase()
    );

    const hindiHeadline = wrapHindi(
      generated.hindiHeadline,
      34
    );

    const englishHook = wrapHindi(
      post.hook,
      55
    );

    const hindiHook = wrapHindi(
      generated.hindiHook,
      42
    );

    const englishHeadlineSvg = englishHeadline
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 76}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    const hindiHeadlineSvg = hindiHeadline
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 43}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    const englishHookSvg = englishHook
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 37}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    const hindiHookSvg = hindiHook
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 38}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    // -----------------------------------------
    // DYNAMIC POSTER SVG
    // -----------------------------------------

    const overlay = `
<svg
  width="1080"
  height="1350"
  viewBox="0 0 1080 1350"
  xmlns="http://www.w3.org/2000/svg"
>

  <defs>

    <style>
      @font-face {
        font-family: "BTTDevanagari";
        src: url("data:font/ttf;base64,${fontBase64}");
      }
    </style>

    <linearGradient
      id="topShade"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop
        offset="0%"
        stop-color="#000000"
        stop-opacity="0.94"
      />

      <stop
        offset="72%"
        stop-color="#000000"
        stop-opacity="0.42"
      />

      <stop
        offset="100%"
        stop-color="#000000"
        stop-opacity="0"
      />
    </linearGradient>

    <linearGradient
      id="bottomShade"
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop
        offset="0%"
        stop-color="#000000"
        stop-opacity="0"
      />

      <stop
        offset="100%"
        stop-color="#000000"
        stop-opacity="0.88"
      />
    </linearGradient>

  </defs>

  <!-- TOP SHADE -->

  <rect
    width="1080"
    height="820"
    fill="url(#topShade)"
  />

  <!-- BOTTOM SHADE -->

  <rect
    x="0"
    y="1040"
    width="1080"
    height="310"
    fill="url(#bottomShade)"
  />

  <!-- SERIES -->

  <text
    x="70"
    y="75"
    fill="#66E3FF"
    font-family="Arial, Helvetica, sans-serif"
    font-size="22"
    font-weight="700"
    letter-spacing="4"
  >
    ${escapeXml(series)}
  </text>

  <!-- ENGLISH HEADLINE -->

  <text
    x="70"
    y="145"
    fill="#FFFFFF"
    font-family="Arial, Helvetica, sans-serif"
    font-size="62"
    font-weight="800"
    letter-spacing="-1"
  >
    ${englishHeadlineSvg}
  </text>

  <!-- HINDI HEADLINE -->

  <text
    x="70"
    y="455"
    fill="#FFFFFF"
    font-family="BTTDevanagari"
    font-size="35"
    font-weight="700"
  >
    ${hindiHeadlineSvg}
  </text>

  <!-- ACCENT -->

  <rect
    x="70"
    y="565"
    width="92"
    height="6"
    rx="3"
    fill="#66E3FF"
  />

  <!-- ENGLISH HOOK -->

  <text
    x="70"
    y="625"
    fill="#E8EDF2"
    font-family="Arial, Helvetica, sans-serif"
    font-size="27"
    font-weight="400"
  >
    ${englishHookSvg}
  </text>

  <!-- HINDI HOOK -->

  <text
    x="70"
    y="715"
    fill="#D9E0E6"
    font-family="BTTDevanagari"
    font-size="25"
    font-weight="400"
  >
    ${hindiHookSvg}
  </text>

  <!-- BRAND -->

  <text
    x="70"
    y="1275"
    fill="#FFFFFF"
    font-family="Arial, Helvetica, sans-serif"
    font-size="29"
    font-weight="700"
    letter-spacing="2"
  >
    BEHIND THE TECH
  </text>

  <!-- WEBSITE -->

  <text
    x="1010"
    y="1275"
    text-anchor="end"
    fill="#C9D1D9"
    font-family="Arial, Helvetica, sans-serif"
    font-size="23"
  >
    behindthetech.in
  </text>

</svg>
`;

    // -----------------------------------------
    // BUILD FINAL INSTAGRAM POSTER
    // -----------------------------------------

    const poster = await sharp(backgroundImage)
      .resize(1080, 1350, {
        fit: "cover",
        position: "center",
      })
      .composite([
        {
          input: Buffer.from(overlay),
          top: 0,
          left: 0,
        },
      ])
      .jpeg({
        quality: 92,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    // -----------------------------------------
    // RETURN FINAL POSTER
    // -----------------------------------------

    return new NextResponse(poster, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
        "X-BTT-Day": String(post.day),
      },
    });
  } catch (error) {
    console.error("[BTT Dynamic Poster]", error);

    return NextResponse.json(
      {
        error: "Failed to generate dynamic BTT poster.",

        details:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}