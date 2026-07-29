import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { generateDailyPoster } from "@/lib/social/generate-poster";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function buildCaption(
  post: Awaited<ReturnType<typeof generateDailyPoster>>["post"]
) {
  const parts = [post.posterHeadline, "", post.hook];

  if (post.hindiHeadline?.trim()) {
    parts.push("", post.hindiHeadline.trim());
  }

  if (post.hindiHook?.trim()) {
    parts.push("", post.hindiHook.trim());
  }

  if (post.nextTopic?.trim()) {
    parts.push("", `Next: ${post.nextTopic}`);
  }

  parts.push(
    "",
    "#BehindTheTech #Technology #DataCenter #Infrastructure #TechEducation"
  );

  return parts.join("\n");
}

export async function GET(req: NextRequest) {
  try {
    // SECURITY
    const cronSecret = process.env.CRON_SECRET;
    const authorization = req.headers.get("authorization");

    if (!cronSecret) {
      return NextResponse.json(
        { error: "CRON_SECRET is not configured." },
        { status: 500 }
      );
    }

    if (authorization !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    // GENERATE POSTER DIRECTLY
    // No internal /api/social/test-poster fetch.
    const { poster: posterBuffer, post } =
      await generateDailyPoster();

    if (posterBuffer.length === 0) {
      throw new Error(
        "Poster generator returned an empty image."
      );
    }

    // IST DATE
    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const year = dateParts.find(
      (part) => part.type === "year"
    )?.value;

    const month = dateParts.find(
      (part) => part.type === "month"
    )?.value;

    const day = dateParts.find(
      (part) => part.type === "day"
    )?.value;

    if (!year || !month || !day) {
      throw new Error(
        "Unable to calculate IST date."
      );
    }

    const date = `${year}-${month}-${day}`;

    // UPLOAD EXACT POSTER TO VERCEL BLOB
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

    // INSTAGRAM PUBLISH
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
          caption: buildCaption(post),
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