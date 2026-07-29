import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { getDailyPostForDate } from "@/content/social/daily-post-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function buildCaption(post: ReturnType<typeof getDailyPostForDate>) {
  const parts = [
    post.posterHeadline,
    "",
    post.hook,
  ];

  if (post.hindiHeadline?.trim()) {
    parts.push("", post.hindiHeadline.trim());
  }

  if (post.hindiHook?.trim()) {
    parts.push("", post.hindiHook.trim());
  }

  parts.push(
    "",
    `Next: ${post.nextTopic}`,
    "",
    "#BehindTheTech #Technology #DataCenter #Infrastructure #TechEducation"
  );

  return parts.join("\n");
}

export async function GET(req: NextRequest) {
  try {
    // --------------------------------------------------
    // SECURITY
    // --------------------------------------------------

    const cronSecret = process.env.CRON_SECRET;
    const authorization = req.headers.get("authorization");

    if (
      cronSecret &&
      authorization !== `Bearer ${cronSecret}`
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------------
    // TODAY'S POST
    // --------------------------------------------------

    const post = getDailyPostForDate();

    if (!post) {
      throw new Error(
        "No BTT social post is configured for today."
      );
    }

    // --------------------------------------------------
    // GENERATE TODAY'S POSTER
    // --------------------------------------------------

    const posterUrl = new URL(
      "/api/social/test-poster",
      req.nextUrl.origin
    );

    const posterResponse = await fetch(posterUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!posterResponse.ok) {
      const details = await posterResponse.text();

      throw new Error(
        `Poster generation failed (${posterResponse.status}): ${details}`
      );
    }

    const posterArrayBuffer =
      await posterResponse.arrayBuffer();

    const posterBuffer = Buffer.from(
      posterArrayBuffer
    );

    if (posterBuffer.length === 0) {
      throw new Error(
        "Poster generator returned an empty image."
      );
    }

    // --------------------------------------------------
    // UPLOAD POSTER TO VERCEL BLOB
    // --------------------------------------------------

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    const filename =
      `social/day-${post.day}-${date}.jpg`;

    const blob = await put(
      filename,
      posterBuffer,
      {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: true,
      }
    );

    if (!blob.url) {
      throw new Error(
        "Vercel Blob did not return a public image URL."
      );
    }

    // --------------------------------------------------
    // BUILD INSTAGRAM CAPTION
    // --------------------------------------------------

    const caption = buildCaption(post);

    // --------------------------------------------------
    // PUBLISH TO INSTAGRAM
    // --------------------------------------------------

    const publishSecret =
      process.env.INSTAGRAM_PUBLISH_SECRET;

    if (!publishSecret) {
      throw new Error(
        "INSTAGRAM_PUBLISH_SECRET is not configured."
      );
    }

    const publishUrl = new URL(
      "/api/instagram/publish",
      req.nextUrl.origin
    );

    const publishResponse = await fetch(
      publishUrl,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-btt-publish-secret":
            publishSecret,
        },

        body: JSON.stringify({
          imageUrl: blob.url,
          caption,
        }),

        cache: "no-store",
      }
    );

    const publishData =
      await publishResponse.json();

    if (!publishResponse.ok) {
      throw new Error(
        `Instagram publishing failed: ${JSON.stringify(
          publishData
        )}`
      );
    }

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      day: post.day,

      topic: post.topic,

      poster: {
        url: blob.url,
        pathname: blob.pathname,
      },

      instagram: publishData,
    });
  } catch (error) {
    console.error(
      "[BTT Auto Post]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "BTT automatic social post failed.",

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