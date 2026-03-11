import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

export function ListingCard({ item, bookmarked, onBookmark }: { item: FeedItem; bookmarked?: boolean; onBookmark?: () => void }) {
  return (
    <CardShell type="listing" source={item.source} url={item.url} bookmarked={bookmarked} onBookmark={onBookmark}>
      <h3 className="font-semibold text-sm leading-snug mb-1">{item.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
        {item.snippet}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.metadata?.area && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {item.metadata.area}
          </span>
        )}
        {item.metadata?.rooms && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {item.metadata.rooms}
          </span>
        )}
        {item.metadata?.price && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
            {item.metadata.price}
          </span>
        )}
      </div>
    </CardShell>
  );
}
