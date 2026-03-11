import type { FeedItemType } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";

interface CardShellProps {
  type: FeedItemType;
  source: string;
  url: string;
  timestamp?: string;
  bookmarked?: boolean;
  onBookmark?: () => void;
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
  bookmarked,
  onBookmark,
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
        <div className="flex items-center gap-2 mb-3 pr-8">
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
      {onBookmark && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onBookmark();
          }}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this"}
        >
          {bookmarked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500 dark:text-amber-400">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
