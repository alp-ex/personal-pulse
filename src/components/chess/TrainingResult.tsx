"use client";

import type { AttemptRecord } from "@/lib/chess-types";

interface TrainingResultProps {
  pathName: string;
  attempt: AttemptRecord;
  isMastered: boolean;
  onTrainAgain: () => void;
  onBackToPaths: () => void;
}

export function TrainingResult({
  pathName,
  attempt,
  isMastered,
  onTrainAgain,
  onBackToPaths,
}: TrainingResultProps) {
  const accuracy =
    attempt.totalMoves > 0
      ? Math.round((attempt.correctMoves / attempt.totalMoves) * 100)
      : 0;
  const perfect = attempt.mistakes.length === 0;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-1">{pathName}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        Training complete
      </p>

      {/* Accuracy big number */}
      <div
        className={`text-5xl font-bold mb-2 ${
          perfect
            ? "text-green-600 dark:text-green-400"
            : accuracy >= 70
              ? "text-amber-600 dark:text-amber-400"
              : "text-red-600 dark:text-red-400"
        }`}
      >
        {accuracy}%
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {attempt.correctMoves}/{attempt.totalMoves} moves correct
      </p>

      {/* Mastered badge */}
      {isMastered && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Mastered!
        </div>
      )}

      {/* Mistakes list */}
      {attempt.mistakes.length > 0 && (
        <div className="text-left mt-4 mb-6">
          <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
            Mistakes
          </h4>
          <div className="flex flex-col gap-2">
            {attempt.mistakes.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-3 py-2 text-sm"
              >
                <span className="text-slate-500 dark:text-slate-400">
                  Move {m.moveIndex + 1}
                </span>
                <span className="text-red-600 dark:text-red-400 line-through">
                  {m.played}
                </span>
                <span className="text-slate-400 dark:text-slate-500">→</span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {m.expected}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={onTrainAgain}
          className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Train again
        </button>
        <button
          onClick={onBackToPaths}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Back to paths
        </button>
      </div>
    </div>
  );
}
