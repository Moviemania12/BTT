import { NextResponse } from "next/server";
import { ALL_TOPICS, getTopicUrl } from "@/lib/topics";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { slug } = await context.params;

  const topic = ALL_TOPICS.find(
    (item) => item.slug === slug && item.status === "published"
  );

  if (!topic) {
    return NextResponse.json(
      { error: "Article not found" },
      { status: 404 }
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    new URL(request.url).origin;

  const articleUrl = new URL(getTopicUrl(topic), baseUrl);

  try {
    const response = await fetch(articleUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "BTT-Article-Source/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Article source unavailable" },
        { status: response.status }
      );
    }

    const pageHtml = await response.text();

    const match = pageHtml.match(
      /<article\b[^>]*class=["'][^"']*\bbtt-article-content\b[^"']*["'][^>]*>([\s\S]*?)<\/article>/i
    );

    if (!match) {
      return NextResponse.json(
        { error: "Article content not found" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        slug,
        html: match[1].trim(),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load article source" },
      { status: 500 }
    );
  }
}
