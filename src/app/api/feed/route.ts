import { NextRequest, NextResponse } from "next/server";
import { fetchNews } from "@/lib/fetchers/news";
import { fetchReddit } from "@/lib/fetchers/reddit";
import { fetchData } from "@/lib/fetchers/data";
import { fetchBooks } from "@/lib/fetchers/books";
import { fetchSocial } from "@/lib/fetchers/social";
import { fetchForums } from "@/lib/fetchers/forums";
import { mixFeed } from "@/lib/mixer";
import type { FeedItem, FeedResponse } from "@/lib/types";
import {
  NEWS_FEEDS,
  SUBREDDITS,
  WORLD_BANK_INDICATORS,
  OWID_CHARTS,
  BOOK_TOPICS,
  BLUESKY_QUERIES,
  TECH_FEEDS,
  TECH_SUBREDDITS,
  TECH_BLUESKY,
  TECH_BOOKS,
  TECH_OWID,
  HUSTLE_FEEDS,
  HUSTLE_SUBREDDITS,
  HUSTLE_BLUESKY,
  HUSTLE_BOOKS,
  FINANCE_FEEDS,
  FINANCE_SUBREDDITS,
  FINANCE_BLUESKY,
  FINANCE_BOOKS,
  FINANCE_INDICATORS,
} from "@/lib/constants";

export const revalidate = 600;

const PAGE_SIZE = 15;

export async function GET(request: NextRequest) {
  const page = parseInt(
    request.nextUrl.searchParams.get("page") || "1",
    10
  );

  try {
    const fetchers = [
      // World
      () => fetchNews(NEWS_FEEDS),
      () => fetchReddit(SUBREDDITS),
      () => fetchData(WORLD_BANK_INDICATORS, OWID_CHARTS),
      () => fetchBooks(BOOK_TOPICS),
      () => fetchSocial(BLUESKY_QUERIES),
      () => fetchForums(),
      // Tech
      () => fetchNews(TECH_FEEDS),
      () => fetchReddit(TECH_SUBREDDITS),
      () => fetchSocial(TECH_BLUESKY),
      () => fetchBooks(TECH_BOOKS),
      () => fetchForums(),
      () => fetchData([], TECH_OWID),
      // Hustle
      () => fetchNews(HUSTLE_FEEDS),
      () => fetchReddit(HUSTLE_SUBREDDITS),
      () => fetchSocial(HUSTLE_BLUESKY),
      () => fetchBooks(HUSTLE_BOOKS),
      () => fetchForums(),
      // Finance
      () => fetchNews(FINANCE_FEEDS),
      () => fetchReddit(FINANCE_SUBREDDITS),
      () => fetchSocial(FINANCE_BLUESKY),
      () => fetchBooks(FINANCE_BOOKS),
      () => fetchData(FINANCE_INDICATORS),
    ];

    const names = [
      "world-news", "world-reddit", "world-data", "world-books", "world-social", "world-forums",
      "tech-news", "tech-reddit", "tech-social", "tech-books", "tech-forums", "tech-data",
      "hustle-news", "hustle-reddit", "hustle-social", "hustle-books", "hustle-forums",
      "finance-news", "finance-reddit", "finance-social", "finance-books", "finance-data",
    ];

    const results = await Promise.allSettled(fetchers.map((fn) => fn()));

    const allItems: FeedItem[] = results
      .filter(
        (r): r is PromiseFulfilledResult<FeedItem[]> =>
          r.status === "fulfilled"
      )
      .flatMap((r) => r.value);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.warn(`[feed] ${names[i]} failed:`, r.reason);
      }
    });

    const mixed = mixFeed(allItems);

    const start = (page - 1) * PAGE_SIZE;
    const pageItems = mixed.slice(start, start + PAGE_SIZE);

    const response: FeedResponse = {
      items: pageItems,
      hasMore: start + PAGE_SIZE < mixed.length,
      total: mixed.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[feed] Unexpected error:", error);
    return NextResponse.json(
      { items: [], hasMore: false, total: 0, error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
