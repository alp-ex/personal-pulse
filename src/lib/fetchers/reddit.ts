import type { FeedItem } from "../types";

interface RedditPost {
  data: {
    id: string;
    title: string;
    selftext: string;
    url: string;
    permalink: string;
    subreddit_name_prefixed: string;
    score: number;
    num_comments: number;
    created_utc: number;
    thumbnail: string;
    author: string;
  };
}

interface RedditResponse {
  data: {
    children: RedditPost[];
  };
}

export async function fetchReddit(subreddits: string[]): Promise<FeedItem[]> {
  const results = await Promise.allSettled(
    subreddits.map(async (sub) => {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=8`,
        {
          headers: { "User-Agent": "PersonalPulse/1.0" },
          next: { revalidate: 600 },
        }
      );
      if (!res.ok) throw new Error(`Reddit ${sub}: ${res.status}`);
      const data: RedditResponse = await res.json();

      return data.data.children
        .slice(0, 5)
        .map(
          (post): FeedItem => ({
            id: `reddit-${post.data.id}`,
            type: "reddit",
            source: post.data.subreddit_name_prefixed,
            title: post.data.title,
            snippet: post.data.selftext.slice(0, 200) || "",
            url: `https://reddit.com${post.data.permalink}`,
            imageUrl:
              post.data.thumbnail &&
              post.data.thumbnail.startsWith("http")
                ? post.data.thumbnail
                : undefined,
            timestamp: new Date(
              post.data.created_utc * 1000
            ).toISOString(),
            metadata: {
              score: post.data.score,
              commentCount: post.data.num_comments,
              author: post.data.author,
            },
          })
        );
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<FeedItem[]> => r.status === "fulfilled"
    )
    .flatMap((r) => r.value)
    .sort((a, b) => (b.metadata?.score || 0) - (a.metadata?.score || 0));
}
