import type { FeedItem, FeedItemType } from "./types";

// Pattern defines the order content types appear in the feed.
// Higher representation = appears more often.
// Listing appears early so apartment platforms show up first in Rent tab.
const PATTERN: FeedItemType[] = [
  "listing",
  "news",
  "reddit",
  "news",
  "social",
  "data",
  "news",
  "forum",
  "reddit",
  "social",
  "book",
  "listing",
];

export function mixFeed(items: FeedItem[]): FeedItem[] {
  // Group items by type
  const buckets: Record<string, FeedItem[]> = {};
  for (const item of items) {
    if (!buckets[item.type]) buckets[item.type] = [];
    buckets[item.type].push(item);
  }

  const mixed: FeedItem[] = [];
  const cursors: Record<string, number> = {};

  // Keep cycling through the pattern until all items are placed
  let safety = 0;
  const maxIterations = items.length + PATTERN.length;

  while (mixed.length < items.length && safety < maxIterations) {
    for (const type of PATTERN) {
      if (mixed.length >= items.length) break;

      const bucket = buckets[type];
      if (!bucket || !bucket.length) continue;

      const cursor = cursors[type] || 0;
      if (cursor < bucket.length) {
        mixed.push(bucket[cursor]);
        cursors[type] = cursor + 1;
      }
    }
    safety++;
  }

  // Add any remaining items that didn't fit the pattern
  for (const type of Object.keys(buckets)) {
    const cursor = cursors[type] || 0;
    const bucket = buckets[type];
    for (let i = cursor; i < bucket.length; i++) {
      mixed.push(bucket[i]);
    }
  }

  return mixed;
}
