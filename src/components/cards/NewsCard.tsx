import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

export function NewsCard({ item, bookmarked, onBookmark }: { item: FeedItem; bookmarked?: boolean; onBookmark?: () => void }) {
  return (
    <CardShell
      type="news"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
      bookmarked={bookmarked}
      onBookmark={onBookmark}
    >
      <div className="flex gap-3">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt=""
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            loading="lazy"
          />
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">
            {item.title}
          </h3>
          {item.snippet && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {item.snippet}
            </p>
          )}
        </div>
      </div>
    </CardShell>
  );
}
