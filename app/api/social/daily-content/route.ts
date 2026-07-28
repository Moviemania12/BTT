import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

import { getDailyPostForDate } from "@/content/social/daily-post-engine";

export const runtime = "nodejs";

interface GeneratedSocialContent {
  caption: string;
  captionHindi: string;
  hindiHeadline: string;
  hindiHook: string;
  hashtags: string[];
  imagePrompt: string;
}

function extractJson(text: string) {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function GET() {
  try {
    // -----------------------------------------
    // GET TODAY'S POST FROM 30-DAY PLAN
    // -----------------------------------------

    const post = getDailyPostForDate();
    const day = post.day;

    if (!post) {
      return NextResponse.json(
        {
          error: `No social post found for Day ${day}.`,
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------------------
    // GEMINI API
    // -----------------------------------------

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    // -----------------------------------------
    // GENERATE BILINGUAL SOCIAL CONTENT
    // -----------------------------------------

    const prompt = `
You are the social-media content engine for Behind The Tech.

Behind The Tech is an educational technology platform that explains
the invisible infrastructure behind everyday digital technology,
including networks, internet infrastructure, data centers, servers,
storage, cloud, cybersecurity and AI infrastructure.

TODAY'S POST

Day: ${post.day}

Series:
${post.series}

Topic:
${post.topic}

English poster headline:
${post.posterHeadline}

English hook:
${post.hook}

Visual direction:
${post.visualDirection}

Next topic:
${post.nextTopic}

TASK

Generate the supporting content for this social-media post.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add explanations outside JSON.

Use exactly this JSON structure:

{
  "caption": "English Instagram caption",
  "captionHindi": "Natural Hindi/Hinglish Instagram caption",
  "hindiHeadline": "Hindi version of poster headline",
  "hindiHook": "Hindi version of the short poster hook",
  "hashtags": [
    "#BehindTheTech"
  ],
  "imagePrompt": "Detailed English image-generation prompt"
}

CONTENT RULES

1. ENGLISH CAPTION

Write a professional educational Instagram caption.

Explain the concept clearly but keep it suitable for social media.

The tone should feel:
- intelligent
- curious
- educational
- modern
- professional

Do not make exaggerated claims.

End naturally by creating curiosity for:

${post.nextTopic}

2. HINDI CAPTION

Write a natural Hindi/Hinglish version for Indian readers.

Do not translate word-for-word.

Technical words such as:
Data Center,
Server,
Network,
Cloud,
Internet,
AI,
Storage,
Cybersecurity,
Infrastructure

may remain in English when that sounds more natural.

3. HINDI HEADLINE

Translate this poster headline naturally:

"${post.posterHeadline}"

Keep it concise.

It must be suitable for a premium technology poster.

Do not make it unnecessarily long.

4. HINDI HOOK

Create a concise Hindi/Hinglish version of:

"${post.hook}"

Maximum approximately 20 words.

It must be easy to read on a mobile Instagram poster.

5. HASHTAGS

Generate 8 to 12 relevant hashtags.

Always include:

#BehindTheTech

Avoid spam-style hashtags.

6. IMAGE PROMPT

Create a detailed prompt for an AI image generator.

Base it strongly on this visual direction:

"${post.visualDirection}"

The image must visually represent today's exact topic:

"${post.topic}"

STYLE

Photorealistic.
Premium cinematic technology documentary.
Professional engineering environment.
Modern enterprise technology.
Realistic infrastructure.
Deep perspective.
Dramatic but believable lighting.
Clean composition.
High visual quality.

COMPOSITION

Vertical 4:5 Instagram poster.

Keep the upper portion darker and visually clean
so typography can be placed there later.

Keep the main visual subject primarily in the
middle and lower portions.

IMPORTANT

The generated image itself must contain:

NO text.
NO letters.
NO words.
NO logos.
NO captions.
NO labels.
NO watermarks.
NO typography.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const generated = extractJson(
      text
    ) as GeneratedSocialContent;

    // -----------------------------------------
    // VALIDATE BASIC RESPONSE
    // -----------------------------------------

    if (
      !generated.caption ||
      !generated.captionHindi ||
      !generated.hindiHeadline ||
      !generated.hindiHook ||
      !generated.imagePrompt ||
      !Array.isArray(generated.hashtags)
    ) {
      throw new Error(
        "Gemini returned incomplete social content."
      );
    }

    // -----------------------------------------
    // RETURN COMPLETE DAILY CONTENT
    // -----------------------------------------

    return NextResponse.json({
      success: true,

      day,

      post: {
        day: post.day,
        series: post.series,
        topic: post.topic,
        posterHeadline: post.posterHeadline,
        hook: post.hook,
        visualDirection: post.visualDirection,
        nextTopic: post.nextTopic,
      },

      generated: {
        caption: generated.caption,
        captionHindi: generated.captionHindi,
        hindiHeadline: generated.hindiHeadline,
        hindiHook: generated.hindiHook,
        hashtags: generated.hashtags,
        imagePrompt: generated.imagePrompt,
      },
    });
  } catch (error) {
    console.error(
      "[BTT Daily Social Content]",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to generate daily social content.",

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

