import type { FeedItem } from "../types";

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

export async function fetchBooks(topics: string[]): Promise<FeedItem[]> {
  // Pick a random topic each refresh so books feel fresh
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(topic)}&limit=6&sort=rating`,
    {
      headers: { "User-Agent": "PersonalPulse/1.0" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error(`Open Library: ${res.status}`);
  const data: OpenLibraryResponse = await res.json();

  return data.docs
    .filter((doc) => doc.title && doc.author_name?.length)
    .slice(0, 5)
    .map(
      (doc): FeedItem => ({
        id: `book-${doc.key}`,
        type: "book",
        source: "Open Library",
        title: doc.title,
        snippet: `by ${doc.author_name?.[0] || "Unknown"}${doc.first_publish_year ? ` (${doc.first_publish_year})` : ""}`,
        url: `https://openlibrary.org${doc.key}`,
        imageUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : undefined,
        timestamp: new Date().toISOString(),
        metadata: {
          author: doc.author_name?.[0],
        },
      })
    );
}
