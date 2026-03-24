import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";

export function SocialCard({ item }: { item: FeedItem }) {
  return (
    <CardShell
      type="social"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
    >
      <div className="mb-1">
        <span className="font-semibold text-sm">{item.title}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line line-clamp-4">
        {item.snippet}
      </p>
      {item.metadata?.score !== undefined && item.metadata.score > 0 && (
        <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          ♥ {item.metadata.score}
        </div>
      )}
    </CardShell>
  );
}
