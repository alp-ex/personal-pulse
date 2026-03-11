"use client";

import { useState, useEffect, useCallback } from "react";
import type { FeedItem } from "@/lib/types";

const STORAGE_KEY = "personal-pulse-bookmarks";

function loadBookmarks(): FeedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(items: FeedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<FeedItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    setBookmarks(loadBookmarks());
  }, []);

  const toggle = useCallback((item: FeedItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      const next = exists ? prev.filter((b) => b.id !== item.id) : [item, ...prev];
      saveBookmarks(next);
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  return { bookmarks, toggle, isBookmarked };
}
