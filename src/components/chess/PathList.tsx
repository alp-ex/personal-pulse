"use client";

import type { Opening, AttemptRecord } from "@/lib/chess-types";
import { ProgressOverview } from "./ProgressOverview";

const STATUS_CONFIG = {
  new: {
    label: "New",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
  },
  practiced: {
    label: "Practiced",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  mastered: {
    label: "Mastered",
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
  },
};

interface PathListProps {
  opening: Opening;
  getPathStatus: (pathId: string) => "new" | "practiced" | "mastered";
  getLastAttempt: (pathId: string) => AttemptRecord | null;
  stats: {
    practicedPaths: number;
    masteredPaths: number;
    totalAttempts: number;
    avgAccuracy: number;
    accuracyTrend: { date: string; accuracy: number }[];
  };
  onSelectPath: (pathId: string) => void;
  onBack: () => void;
}

export function PathList({
  opening,
  getPathStatus,
  getLastAttempt,
  stats,
  onSelectPath,
  onBack,
}: PathListProps) {
  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mb-4"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All openings
      </button>

      {/* Opening header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{opening.icon}</span>
        <div>
          <h2 className="text-lg font-semibold">{opening.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {opening.description}
          </p>
        </div>
      </div>

      {/* Progress overview */}
      <ProgressOverview
        totalPaths={opening.paths.length}
        practicedPaths={stats.practicedPaths}
        masteredPaths={stats.masteredPaths}
        totalAttempts={stats.totalAttempts}
        avgAccuracy={stats.avgAccuracy}
        accuracyTrend={stats.accuracyTrend}
      />

      {/* Path list */}
      <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
        Variations
      </h3>
      <div className="flex flex-col gap-2">
        {opening.paths.map((path) => {
          const status = getPathStatus(path.id);
          const config = STATUS_CONFIG[status];
          const lastAttempt = getLastAttempt(path.id);
          const lastAccuracy =
            lastAttempt && lastAttempt.totalMoves > 0
              ? Math.round(
                  (lastAttempt.correctMoves / lastAttempt.totalMoves) * 100
                )
              : null;

          return (
            <div
              key={path.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{path.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {path.description}
                </p>
                {lastAccuracy !== null && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Last: {lastAccuracy}% ·{" "}
                    {new Date(lastAttempt!.date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => onSelectPath(path.id)}
                className="shrink-0 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Train
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
