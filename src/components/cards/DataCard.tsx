import type { FeedItem } from "@/lib/types";
import { CardShell } from "../CardShell";
import { MiniChart } from "../MiniChart";

export function DataCard({ item }: { item: FeedItem }) {
  const hasChart = item.metadata?.dataPoints && item.metadata.dataPoints.length > 1;
  const isOWID = item.metadata?.chartUrl;

  return (
    <CardShell
      type="data"
      source={item.source}
      url={item.url}
      timestamp={item.timestamp}
    >
      <h3 className="font-semibold text-sm leading-snug mb-1">
        {item.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {item.snippet}
      </p>
      {hasChart && item.metadata?.dataPoints && (
        <MiniChart data={item.metadata.dataPoints} />
      )}
      {isOWID && (
        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
          Click to view interactive chart →
        </div>
      )}
    </CardShell>
  );
}
