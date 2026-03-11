import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function RedditCard({ item, bookmarked, onBookmark }: { item: FeedItem; bookmarked?: boolean; onBookmark?: () => void }) {
  return (
    <CardShell
      type="reddit"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
      bookmarked={bookmarked}
      onBookmark={onBookmark}
    >
      <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2">
        {item.title}
      </h3>
      {item.snippet && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
          {item.snippet}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
        {item.metadata?.score !== undefined && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            {formatNumber(item.metadata.score)}
          </span>
        )}
        {item.metadata?.commentCount !== undefined && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {formatNumber(item.metadata.commentCount)}
          </span>
        )}
      </div>
    </CardShell>
  );
}
