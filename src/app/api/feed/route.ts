import { NextRequest, NextResponse } from "next/server";
import { fetchNews } from "@/lib/fetchers/news";
import { fetchReddit } from "@/lib/fetchers/reddit";
import { fetchData } from "@/lib/fetchers/data";
import { fetchBooks } from "@/lib/fetchers/books";
import { fetchSocial } from "@/lib/fetchers/social";
import { fetchForums } from "@/lib/fetchers/forums";
import { fetchListings } from "@/lib/fetchers/listings";
import { fetchRentData } from "@/lib/fetchers/rent-data";
import { mixFeed } from "@/lib/mixer";
import type { FeedItem, FeedResponse } from "@/lib/types";
import {
  // World
  NEWS_FEEDS,
  SUBREDDITS,
  WORLD_BANK_INDICATORS,
  OWID_CHARTS,
  BOOK_TOPICS,
  BLUESKY_QUERIES,
  // Tech
  TECH_FEEDS,
  TECH_SUBREDDITS,
  TECH_BLUESKY,
  TECH_BOOKS,
  TECH_OWID,
  // Jobs
  JOBS_FEEDS,
  JOBS_SUBREDDITS,
  JOBS_BLUESKY,
  JOBS_BOOKS,
  JOBS_INDICATORS,
  // Hustle
  HUSTLE_FEEDS,
  HUSTLE_SUBREDDITS,
  HUSTLE_BLUESKY,
  HUSTLE_BOOKS,
  // Finance
  FINANCE_FEEDS,
  FINANCE_SUBREDDITS,
  FINANCE_BLUESKY,
  FINANCE_BOOKS,
  FINANCE_INDICATORS,
  // Rent
  RENT_FEEDS,
  RENT_SUBREDDITS,
  RENT_BLUESKY,
  RENT_BOOKS,
  RENT_PLATFORMS,
} from "@/lib/constants";

export const revalidate = 600;

const PAGE_SIZE = 15;

type FetcherFn = () => Promise<FeedItem[]> | FeedItem[];

function getFetchers(tab: string): { fetchers: FetcherFn[]; names: string[] } {
  switch (tab) {
    case "tech":
      return {
        fetchers: [
          () => fetchNews(TECH_FEEDS),
          () => fetchReddit(TECH_SUBREDDITS),
          () => fetchSocial(TECH_BLUESKY),
          () => fetchBooks(TECH_BOOKS),
          () => fetchForums(),
          () => fetchData([], TECH_OWID),
        ],
        names: ["tech-news", "tech-reddit", "tech-social", "tech-books", "tech-forums", "tech-data"],
      };

    case "jobs":
      return {
        fetchers: [
          () => fetchNews(JOBS_FEEDS),
          () => fetchReddit(JOBS_SUBREDDITS),
          () => fetchSocial(JOBS_BLUESKY),
          () => fetchBooks(JOBS_BOOKS),
          () => fetchData(JOBS_INDICATORS),
        ],
        names: ["jobs-news", "jobs-reddit", "jobs-social", "jobs-books", "jobs-data"],
      };

    case "hustle":
      return {
        fetchers: [
          () => fetchNews(HUSTLE_FEEDS),
          () => fetchReddit(HUSTLE_SUBREDDITS),
          () => fetchSocial(HUSTLE_BLUESKY),
          () => fetchBooks(HUSTLE_BOOKS),
          () => fetchForums(),
        ],
        names: ["hustle-news", "hustle-reddit", "hustle-social", "hustle-books", "hustle-forums"],
      };

    case "finance":
      return {
        fetchers: [
          () => fetchNews(FINANCE_FEEDS),
          () => fetchReddit(FINANCE_SUBREDDITS),
          () => fetchSocial(FINANCE_BLUESKY),
          () => fetchBooks(FINANCE_BOOKS),
          () => fetchData(FINANCE_INDICATORS),
        ],
        names: ["finance-news", "finance-reddit", "finance-social", "finance-books", "finance-data"],
      };

    case "rent":
      return {
        fetchers: [
          () => fetchListings(RENT_PLATFORMS),
          () => fetchRentData(),
          () => fetchNews(RENT_FEEDS),
          () => fetchReddit(RENT_SUBREDDITS),
          () => fetchSocial(RENT_BLUESKY),
          () => fetchBooks(RENT_BOOKS),
        ],
        names: ["rent-listings", "rent-data", "rent-news", "rent-reddit", "rent-social", "rent-books"],
      };

    case "world":
    default:
      return {
        fetchers: [
          () => fetchNews(NEWS_FEEDS),
          () => fetchReddit(SUBREDDITS),
          () => fetchData(WORLD_BANK_INDICATORS, OWID_CHARTS),
          () => fetchBooks(BOOK_TOPICS),
          () => fetchSocial(BLUESKY_QUERIES),
          () => fetchForums(),
        ],
        names: ["news", "reddit", "data", "books", "social", "forums"],
      };
  }
}

// Briefing: fetch top 2 items from each tab for a quick daily summary
async function fetchBriefing(): Promise<FeedItem[]> {
  const tabs = ["world", "tech", "jobs", "hustle", "finance", "rent"];
  const all: FeedItem[] = [];

  const tabResults = await Promise.allSettled(
    tabs.map(async (tab) => {
      const { fetchers, names } = getFetchers(tab);
      const results = await Promise.allSettled(fetchers.map((fn) => fn()));
      const items = results
        .filter(
          (r): r is PromiseFulfilledResult<FeedItem[]> =>
            r.status === "fulfilled"
        )
        .flatMap((r) => r.value);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.warn(`[briefing:${tab}] ${names[i]} failed:`, r.reason);
        }
      });

      // Take top 2 items per tab (by score then recency)
      return items
        .sort((a, b) => {
          const scoreA = a.metadata?.score || 0;
          const scoreB = b.metadata?.score || 0;
          if (scoreA !== scoreB) return scoreB - scoreA;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        })
        .slice(0, 2);
    })
  );

  for (const result of tabResults) {
    if (result.status === "fulfilled") {
      all.push(...result.value);
    }
  }

  return all;
}

export async function GET(request: NextRequest) {
  const tab = request.nextUrl.searchParams.get("tab") || "world";
  const page = parseInt(
    request.nextUrl.searchParams.get("page") || "1",
    10
  );

  try {
    let allItems: FeedItem[];

    if (tab === "briefing") {
      allItems = await fetchBriefing();
    } else {
      const { fetchers, names } = getFetchers(tab);
      const results = await Promise.allSettled(fetchers.map((fn) => fn()));

      allItems = results
        .filter(
          (r): r is PromiseFulfilledResult<FeedItem[]> =>
            r.status === "fulfilled"
        )
        .flatMap((r) => r.value);

      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.warn(`[feed:${tab}] ${names[i]} failed:`, r.reason);
        }
      });
    }

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
    console.error(`[feed:${tab}] Unexpected error:`, error);
    return NextResponse.json(
      { items: [], hasMore: false, total: 0, error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
