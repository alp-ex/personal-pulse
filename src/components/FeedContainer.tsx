"use client";

import { useState, useEffect, useCallback } from "react";
import type { FeedItem, FeedResponse } from "@/lib/types";
import { NewsCard } from "./cards/NewsCard";
import { RedditCard } from "./cards/RedditCard";
import { DataCard } from "./cards/DataCard";
import { BookCard } from "./cards/BookCard";
import { SocialCard } from "./cards/SocialCard";
import { ForumCard } from "./cards/ForumCard";

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-14 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded mb-1" />
      <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
    </div>
  );
}

export function FeedContainer() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (pageNum: number) => {
    const res = await fetch(`/api/feed?page=${pageNum}`);
    if (!res.ok) throw new Error("Failed to load feed");
    return (await res.json()) as FeedResponse;
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPage(1)
      .then((data) => {
        setItems(data.items);
        setHasMore(data.hasMore);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fetchPage]);

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const data = await fetchPage(nextPage);
      setItems((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch {
      // silently fail — user can try again
    }
    setLoadingMore(false);
  }

  function renderCard(item: FeedItem) {
    switch (item.type) {
      case "news":
        return <NewsCard key={item.id} item={item} />;
      case "reddit":
        return <RedditCard key={item.id} item={item} />;
      case "data":
        return <DataCard key={item.id} item={item} />;
      case "book":
        return <BookCard key={item.id} item={item} />;
      case "social":
        return <SocialCard key={item.id} item={item} />;
      case "forum":
        return <ForumCard key={item.id} item={item} />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Something went wrong loading the feed.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">
            No content available right now. Check back soon.
          </p>
        </div>
      ) : (
        <>
          {items.map(renderCard)}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="mx-auto px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 my-4"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
