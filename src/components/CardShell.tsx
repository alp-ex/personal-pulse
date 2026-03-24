import type { FeedItemType } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";

interface CardShellProps {
  type: FeedItemType;
  source: string;
  url: string;
  timestamp?: string;
  children: React.ReactNode;
}

function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function CardShell({
  type,
  source,
  url,
  timestamp,
  children,
}: CardShellProps) {
  return (
    <div className="relative group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <SourceBadge type={type} />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {source}
          </span>
          {timestamp && (
            <>
              <span className="text-xs text-slate-300 dark:text-slate-600">
                ·
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {timeAgo(timestamp)}
              </span>
            </>
          )}
        </div>
        {children}
      </a>
    </div>
  );
}
