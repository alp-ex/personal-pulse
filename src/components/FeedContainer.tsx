"use client";

import { useState, useEffect, useCallback } from "react";
import type { FeedItem, FeedResponse } from "@/lib/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { NewsCard } from "./cards/NewsCard";
import { RedditCard } from "./cards/RedditCard";
import { DataCard } from "./cards/DataCard";
import { BookCard } from "./cards/BookCard";
import { SocialCard } from "./cards/SocialCard";
import { ForumCard } from "./cards/ForumCard";
import { ListingCard } from "./cards/ListingCard";

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

interface FeedContainerProps {
  tab: string;
}

export function FeedContainer({ tab }: FeedContainerProps) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks, toggle, isBookmarked } = useBookmarks();

  const fetchPage = useCallback(
    async (pageNum: number) => {
      const res = await fetch(`/api/feed?tab=${tab}&page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to load feed");
      return (await res.json()) as FeedResponse;
    },
    [tab]
  );

  // Reset and reload when tab changes (skip for "saved" tab)
  useEffect(() => {
    if (tab === "saved") {
      setLoading(false);
      return;
    }

    setItems([]);
    setPage(1);
    setHasMore(true);
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
  }, [fetchPage, tab]);

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
    const bm = isBookmarked(item.id);
    const onBm = () => toggle(item);

    switch (item.type) {
      case "news":
        return <NewsCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "reddit":
        return <RedditCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "data":
        return <DataCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "book":
        return <BookCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "social":
        return <SocialCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "forum":
        return <ForumCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      case "listing":
        return <ListingCard key={item.id} item={item} bookmarked={bm} onBookmark={onBm} />;
      default:
        return null;
    }
  }

  // Saved tab — show bookmarks from localStorage
  if (tab === "saved") {
    if (bookmarks.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            No saved items yet.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Click the bookmark icon on any card to save it here.
          </p>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        {bookmarks.map(renderCard)}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">
          No content available right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
