import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function ForumCard({ item, bookmarked, onBookmark }: { item: FeedItem; bookmarked?: boolean; onBookmark?: () => void }) {
  return (
    <CardShell
      type="forum"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
      bookmarked={bookmarked}
      onBookmark={onBookmark}
    >
      <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2">
        {item.title}
      </h3>
      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
        <span className="text-slate-500 dark:text-slate-400">
          {item.snippet}
        </span>
        {item.metadata?.score !== undefined && (
          <span>{formatNumber(item.metadata.score)} pts</span>
        )}
        {item.metadata?.commentCount !== undefined && (
          <span>{formatNumber(item.metadata.commentCount)} comments</span>
        )}
      </div>
    </CardShell>
  );
}
