import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

export function ListingCard({ item, bookmarked, onBookmark }: { item: FeedItem; bookmarked?: boolean; onBookmark?: () => void }) {
  return (
    <CardShell type="listing" source={item.source} url={item.url} timestamp={item.timestamp} bookmarked={bookmarked} onBookmark={onBookmark}>
      <div className="flex gap-3">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt=""
            className="w-24 h-20 rounded-lg object-cover flex-shrink-0"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">
            {item.title}
          </h3>
          {item.metadata?.price && (
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              {item.metadata.price}
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {item.snippet}
          </p>
        </div>
      </div>
    </CardShell>
  );
}
