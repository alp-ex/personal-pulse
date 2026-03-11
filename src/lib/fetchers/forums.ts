import type { FeedItem } from "../types";
import { HN_API_BASE } from "../constants";

interface HNItem {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
  type: string;
}

export async function fetchForums(): Promise<FeedItem[]> {
  const idsRes = await fetch(`${HN_API_BASE}/topstories.json`, {
    next: { revalidate: 600 },
  });
  if (!idsRes.ok) throw new Error(`HN: ${idsRes.status}`);
  const ids: number[] = await idsRes.json();

  const storyResults = await Promise.allSettled(
    ids.slice(0, 12).map(async (id) => {
      const res = await fetch(`${HN_API_BASE}/item/${id}.json`, {
        next: { revalidate: 600 },
      });
      if (!res.ok) throw new Error(`HN item ${id}: ${res.status}`);
      return (await res.json()) as HNItem;
    })
  );

  return storyResults
    .filter(
      (r): r is PromiseFulfilledResult<HNItem> =>
        r.status === "fulfilled" && r.value.type === "story"
    )
    .map(
      (r): FeedItem => ({
        id: `forum-hn-${r.value.id}`,
        type: "forum",
        source: "Hacker News",
        title: r.value.title,
        snippet: r.value.url
          ? new URL(r.value.url).hostname.replace("www.", "")
          : "news.ycombinator.com",
        url:
          r.value.url ||
          `https://news.ycombinator.com/item?id=${r.value.id}`,
        timestamp: new Date(r.value.time * 1000).toISOString(),
        metadata: {
          score: r.value.score,
          commentCount: r.value.descendants || 0,
          author: r.value.by,
        },
      })
    );
}
