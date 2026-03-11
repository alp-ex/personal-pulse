import Parser from "rss-parser";
import type { FeedItem } from "../types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "PersonalPulse/1.0",
  },
});

export async function fetchNews(
  feeds: Array<{ name: string; url: string }>
): Promise<FeedItem[]> {
  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      const parsed = await parser.parseURL(feed.url);
      return (parsed.items || []).slice(0, 8).map(
        (item, i): FeedItem => ({
          id: `news-${feed.name}-${i}-${item.guid || item.link || i}`,
          type: "news",
          source: feed.name,
          title: item.title || "Untitled",
          snippet:
            stripHtml(item.contentSnippet || item.content || "").slice(0, 200) ||
            "",
          url: item.link || "",
          imageUrl: extractImage(item),
          timestamp: item.isoDate || item.pubDate || new Date().toISOString(),
        })
      );
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<FeedItem[]> => r.status === "fulfilled"
    )
    .flatMap((r) => r.value)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function extractImage(item: Record<string, unknown>): string | undefined {
  const media = item["media:thumbnail"] as
    | { $?: { url?: string } }
    | undefined;
  if (media?.$?.url) return media.$.url;

  const mediaContent = item["media:content"] as
    | { $?: { url?: string } }
    | undefined;
  if (mediaContent?.$?.url) return mediaContent.$.url;

  const enclosure = item.enclosure as { url?: string } | undefined;
  if (enclosure?.url) return enclosure.url;

  return undefined;
}
