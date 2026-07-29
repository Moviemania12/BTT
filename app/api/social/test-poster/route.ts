import { NextResponse } from "next/server";
import { getDailyPostForDate } from "@/content/social/daily-post-engine";
import fs from "fs";
import path from "path";

const fontConfigPath = path.join(process.cwd(), "fontconfig");

process.env.FONTCONFIG_PATH = fontConfigPath;
process.env.FONTCONFIG_FILE = "fonts.conf";

export const runtime = "nodejs";

const CLOUDFLARE_MODEL = "@cf/black-forest-labs/flux-1-schnell";

interface CloudflareImageResponse {
  result?: {
    image?: string;
  };
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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

function wrapText(text: string, maxChars = 32): string[] {
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

export async function GET() {
  try {
    const { default: sharp } = await import("sharp");
    // --------------------------------------------------
    // ENVIRONMENT
    // --------------------------------------------------

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_AI_API_TOKEN;

    if (!accountId || !apiToken) {
      throw new Error(
        "Cloudflare Workers AI environment variables are not configured."
      );
    }

    // --------------------------------------------------
    // TODAY'S SOCIAL POST
    // --------------------------------------------------

    const post = getDailyPostForDate();

    if (!post) {
      throw new Error("No BTT social post is configured for today.");
    }

    const hindiHeadline =
      post.hindiHeadline?.trim() || post.posterHeadline;

    const hindiHook =
      post.hindiHook?.trim() || post.hook;

    // --------------------------------------------------
    // CLOUDFLARE IMAGE PROMPT
    // --------------------------------------------------

    const imagePrompt = `
${post.visualDirection}

Create a premium cinematic technology documentary image for:

Topic:
${post.topic}

Visual requirements:
Photorealistic.
Professional engineering environment.
Technically believable.
Modern enterprise infrastructure.
Premium cinematic lighting.
Deep perspective.
High visual quality.
Realistic materials and equipment.

Composition:
Vertical 4:5 poster composition.
Keep the upper portion relatively dark and visually clean.
Keep important subjects mainly in the middle and lower area.
Leave sufficient negative space in the upper and middle-left area
for poster typography.

IMPORTANT:
The generated image itself must contain absolutely no text,
no letters, no words, no logos, no labels, no captions,
no watermarks and no typography.
`.trim();

    // --------------------------------------------------
    // GENERATE CLOUDFLARE BACKGROUND
    // --------------------------------------------------

    const cloudflareResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CLOUDFLARE_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
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

    // --------------------------------------------------
    // LOAD LOCAL FONTS
    // --------------------------------------------------

    const englishFontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "NotoSans.ttf"
    );

    const devanagariFontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "NotoSansDevanagari.ttf"
    );

    if (!fs.existsSync(englishFontPath)) {
      throw new Error(
        "NotoSans.ttf was not found in public/fonts."
      );
    }

    if (!fs.existsSync(devanagariFontPath)) {
      throw new Error(
        "NotoSansDevanagari.ttf was not found in public/fonts."
      );
    }
// --------------------------------------------------
    // PREPARE TEXT
    // --------------------------------------------------

    const series = post.series.toUpperCase();

    const englishHeadline = wrapEnglishHeadline(
      post.posterHeadline.toUpperCase()
    );

    const hindiHeadlineLines = wrapText(
      hindiHeadline,
      34
    );

    const englishHook = wrapText(
      post.hook,
      55
    );

    const hindiHookLines = wrapText(
      hindiHook,
      42
    );

    // --------------------------------------------------
    // BUILD SVG TEXT
    // --------------------------------------------------

    const englishHeadlineSvg = englishHeadline
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 76}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    const hindiHeadlineSvg = hindiHeadlineLines
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

    const hindiHookSvg = hindiHookLines
      .map(
        (line, index) => `
<tspan x="70" dy="${index === 0 ? 0 : 38}">
  ${escapeXml(line)}
</tspan>`
      )
      .join("");

    // --------------------------------------------------
    // POSTER SVG
    // --------------------------------------------------

    const overlay = `
<svg
  width="1080"
  height="1350"
  viewBox="0 0 1080 1350"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
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

  <rect
    x="0"
    y="0"
    width="1080"
    height="820"
    fill="url(#topShade)"
  />

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
    font-family="Noto Sans"
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
    font-family="Noto Sans"
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
    font-family="Noto Sans Devanagari"
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
    font-family="Noto Sans"
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
    font-family="Noto Sans Devanagari"
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
    font-family="Noto Sans"
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
    font-family="Noto Sans"
    font-size="23"
    font-weight="400"
  >
    behindthetech.in
  </text>
</svg>
`;

    // --------------------------------------------------
    // FINAL POSTER
    // --------------------------------------------------

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