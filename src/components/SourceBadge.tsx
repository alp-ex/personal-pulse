import type { FeedItemType } from "@/lib/types";

const BADGE_STYLES: Record<FeedItemType, string> = {
  news: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  data: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  book: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  reddit: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  social: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  forum: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
};

const BADGE_LABELS: Record<FeedItemType, string> = {
  news: "NEWS",
  data: "DATA",
  book: "BOOK",
  reddit: "REDDIT",
  social: "SOCIAL",
  forum: "FORUM",
};

export function SourceBadge({ type }: { type: FeedItemType }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide ${BADGE_STYLES[type]}`}
    >
      {BADGE_LABELS[type]}
    </span>
  );
}
