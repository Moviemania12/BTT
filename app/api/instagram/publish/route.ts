import { NextRequest, NextResponse } from "next/server";

const GRAPH_API_URL = "https://graph.instagram.com";

interface PublishRequest {
  imageUrl?: string;
  caption?: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntilReady(
  creationId: string,
  accessToken: string
): Promise<void> {
  const maxAttempts = 10;
  const delayMs = 3000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const params = new URLSearchParams({
      fields: "status_code",
      access_token: accessToken,
    });

    const statusResponse = await fetch(
      `${GRAPH_API_URL}/${creationId}?${params.toString()}`,
      { cache: "no-store" }
    );

    const statusData = await statusResponse.json();

    if (!statusResponse.ok) {
      throw new Error(
        `Unable to check Instagram media status: ${JSON.stringify(statusData)}`
      );
    }

    console.log(
      `[Instagram] Container ${creationId} status:`,
      statusData.status_code
    );

    if (statusData.status_code === "FINISHED") {
      return;
    }

    if (
      statusData.status_code === "ERROR" ||
      statusData.status_code === "EXPIRED"
    ) {
      throw new Error(
        `Instagram media processing failed: ${JSON.stringify(statusData)}`
      );
    }

    if (attempt < maxAttempts) {
      await sleep(delayMs);
    }
  }

  throw new Error("Instagram media was not ready before timeout.");
}

export async function POST(req: NextRequest) {
  try { 
    const publishSecret = process.env.INSTAGRAM_PUBLISH_SECRET;
    const providedSecret = req.headers.get("x-btt-publish-secret");

    if (!publishSecret) {
      return NextResponse.json(
        { error: "Instagram publish secret is not configured." },
        { status: 500 }
      );
    }

    if (!providedSecret || providedSecret !== publishSecret) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const instagramUserId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !instagramUserId) {
      return NextResponse.json(
        { error: "Instagram environment variables are not configured." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as PublishRequest;

    const imageUrl = body.imageUrl?.trim();
    const caption = body.caption?.trim() ?? "";

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl is required." },
        { status: 400 }
      );
    }

    // Step 1: Create media container
    const createResponse = await fetch(
      `${GRAPH_API_URL}/${instagramUserId}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          image_url: imageUrl,
          caption,
          access_token: accessToken,
        }),
      }
    );

    const createData = await createResponse.json();

    if (!createResponse.ok || !createData.id) {
      console.error("[Instagram] Container creation failed:", createData);

      return NextResponse.json(
        {
          error: "Failed to create Instagram media container.",
          details: createData,
        },
        { status: createResponse.status || 500 }
      );
    }

    const creationId = createData.id as string;

    console.log("[Instagram] Container created:", creationId);

    // Step 2: Wait for Instagram to finish processing
    await waitUntilReady(creationId, accessToken);

    // Step 3: Publish media container
    const publishResponse = await fetch(
      `${GRAPH_API_URL}/${instagramUserId}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          creation_id: creationId,
          access_token: accessToken,
        }),
      }
    );

    const publishData = await publishResponse.json();

    if (!publishResponse.ok || !publishData.id) {
      console.error("[Instagram] Publishing failed:", publishData);

      return NextResponse.json(
        {
          error: "Failed to publish Instagram media.",
          creationId,
          details: publishData,
        },
        { status: publishResponse.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      creationId,
      mediaId: publishData.id,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected Instagram publishing error.";

    console.error("[Instagram] Unexpected error:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}