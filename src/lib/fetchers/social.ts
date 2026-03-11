import type { FeedItem } from "../types";

interface BskyPost {
  uri: string;
  cid: string;
  author: {
    handle: string;
    displayName?: string;
  };
  record: {
    text: string;
    createdAt: string;
  };
  likeCount?: number;
  repostCount?: number;
}

interface BskySearchResponse {
  posts: BskyPost[];
}

export async function fetchSocial(queries: string[]): Promise<FeedItem[]> {
  // Pick a random query each refresh
  const query = queries[Math.floor(Math.random() * queries.length)];

  const res = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(query)}&limit=10&sort=top`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) throw new Error(`Bluesky: ${res.status}`);
  const data: BskySearchResponse = await res.json();

  return (data.posts || []).slice(0, 8).map(
    (post): FeedItem => ({
      id: `social-${post.cid}`,
      type: "social",
      source: `@${post.author.handle}`,
      title: post.author.displayName || post.author.handle,
      snippet: post.record.text.slice(0, 280),
      url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`,
      timestamp: post.record.createdAt,
      metadata: {
        score: post.likeCount,
        author: post.author.handle,
      },
    })
  );
}
