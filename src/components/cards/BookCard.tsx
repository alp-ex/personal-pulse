import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

export function BookCard({ item }: { item: FeedItem }) {
  return (
    <CardShell
      type="book"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
    >
      <div className="flex gap-3">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-12 h-16 rounded object-cover flex-shrink-0 shadow-sm"
            loading="lazy"
          />
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {item.snippet}
          </p>
        </div>
      </div>
    </CardShell>
  );
}
