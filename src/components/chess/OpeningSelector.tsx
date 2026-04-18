"use client";

import type { Opening } from "@/lib/chess-types";

interface OpeningSelectorProps {
  openings: Opening[];
  getStats: (openingId: string) => {
    practicedPaths: number;
    masteredPaths: number;
    totalAttempts: number;
  };
  onSelect: (openingId: string) => void;
}

export function OpeningSelector({
  openings,
  getStats,
  onSelect,
}: OpeningSelectorProps) {
  return (
    <div className="grid gap-3">
      {openings.map((opening) => {
        const stats = getStats(opening.id);
        return (
          <button
            key={opening.id}
            onClick={() => onSelect(opening.id)}
            className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{opening.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1">
                  {opening.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  {opening.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  <span>{opening.paths.length} paths</span>
                  <span>·</span>
                  <span>{stats.masteredPaths} mastered</span>
                  {stats.totalAttempts > 0 && (
                    <>
                      <span>·</span>
                      <span>{stats.totalAttempts} sessions</span>
                    </>
                  )}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}
