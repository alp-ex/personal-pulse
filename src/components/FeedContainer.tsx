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

// --- Rent filters ---

const RENT_STORAGE_KEY = "personal-pulse-rent-filters";

interface RentFilters {
  priceMin: number;
  priceMax: number;
  squareMin: number;
  roomsMin: number;
  roomsMax: number;
}

const DEFAULTS: RentFilters = {
  priceMin: 800,
  priceMax: 1600,
  squareMin: 35,
  roomsMin: 2,
  roomsMax: 3,
};

function loadRentFilters(): RentFilters {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(RENT_STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function saveRentFilters(f: RentFilters) {
  try {
    localStorage.setItem(RENT_STORAGE_KEY, JSON.stringify(f));
  } catch { /* ignore */ }
}

function RentFilterBar({
  filters,
  onChange,
  onSearch,
}: {
  filters: RentFilters;
  onChange: (f: RentFilters) => void;
  onSearch: () => void;
}) {
  const update = (partial: Partial<RentFilters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 mb-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Budget min</span>
          <input
            type="number"
            step={50}
            min={0}
            value={filters.priceMin}
            onChange={(e) => update({ priceMin: Number(e.target.value) })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Budget max</span>
          <input
            type="number"
            step={50}
            min={0}
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: Number(e.target.value) })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Surface min (m²)</span>
          <input
            type="number"
            step={5}
            min={0}
            value={filters.squareMin}
            onChange={(e) => update({ squareMin: Number(e.target.value) })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Pièces min</span>
          <input
            type="number"
            min={1}
            max={6}
            value={filters.roomsMin}
            onChange={(e) => update({ roomsMin: Number(e.target.value) })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Pièces max</span>
          <input
            type="number"
            min={1}
            max={6}
            value={filters.roomsMax}
            onChange={(e) => update({ roomsMax: Number(e.target.value) })}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-sm"
          />
        </label>
        <div className="flex items-end">
          <button
            onClick={onSearch}
            className="w-full px-4 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main component ---

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

  // Rent filters (only used when tab === "rent")
  const [rentFilters, setRentFilters] = useState<RentFilters>(DEFAULTS);
  const [appliedFilters, setAppliedFilters] = useState<RentFilters>(DEFAULTS);

  // Load saved filters on mount
  useEffect(() => {
    const saved = loadRentFilters();
    setRentFilters(saved);
    setAppliedFilters(saved);
  }, []);

  const fetchPage = useCallback(
    async (pageNum: number, filters?: RentFilters) => {
      let url = `/api/feed?tab=${tab}&page=${pageNum}`;
      if (tab === "rent" && filters) {
        url += `&priceMin=${filters.priceMin}&priceMax=${filters.priceMax}&squareMin=${filters.squareMin}&roomsMin=${filters.roomsMin}&roomsMax=${filters.roomsMax}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load feed");
      return (await res.json()) as FeedResponse;
    },
    [tab]
  );

  // Load feed
  const loadFeed = useCallback(
    (filters?: RentFilters) => {
      if (tab === "saved") {
        setLoading(false);
        return;
      }

      setItems([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);
      setError(null);

      const f = tab === "rent" ? (filters || appliedFilters) : undefined;

      fetchPage(1, f)
        .then((data) => {
          setItems(data.items);
          setHasMore(data.hasMore);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    },
    [fetchPage, tab, appliedFilters]
  );

  // Reload when tab changes
  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  function handleRentSearch() {
    saveRentFilters(rentFilters);
    setAppliedFilters(rentFilters);
    loadFeed(rentFilters);
  }

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const f = tab === "rent" ? appliedFilters : undefined;
      const data = await fetchPage(nextPage, f);
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

  return (
    <div className="flex flex-col gap-4">
      {tab === "rent" && (
        <RentFilterBar
          filters={rentFilters}
          onChange={setRentFilters}
          onSearch={handleRentSearch}
        />
      )}

      {loading ? (
        Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Something went wrong loading the feed.
          </p>
          <button
            onClick={() => loadFeed()}
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
