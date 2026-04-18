"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  ChessTrainingState,
  PathProgress,
  AttemptRecord,
} from "@/lib/chess-types";

const STORAGE_KEY = "personal-pulse-chess";

function load(): ChessTrainingState {
  if (typeof window === "undefined") return { progress: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { progress: {} };
  } catch {
    return { progress: {} };
  }
}

function save(state: ChessTrainingState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function useChessTraining() {
  const [state, setState] = useState<ChessTrainingState>({ progress: {} });

  useEffect(() => {
    setState(load());
  }, []);

  const getPathProgress = useCallback(
    (pathId: string): PathProgress | null => {
      return state.progress[pathId] ?? null;
    },
    [state]
  );

  const isFirstTime = useCallback(
    (pathId: string): boolean => {
      const p = state.progress[pathId];
      return !p || !p.attempts.some((a) => a.completed);
    },
    [state]
  );

  const recordAttempt = useCallback(
    (pathId: string, openingId: string, attempt: AttemptRecord) => {
      setState((prev) => {
        const existing = prev.progress[pathId] ?? {
          pathId,
          openingId,
          firstCompleted: null,
          attempts: [],
          mastered: false,
        };

        const attempts = [...existing.attempts, attempt];

        // Trim to last 50 attempts to prevent localStorage bloat
        if (attempts.length > 50) {
          attempts.splice(0, attempts.length - 50);
        }

        const firstCompleted =
          existing.firstCompleted ??
          (attempt.completed ? attempt.date : null);

        // Mastered = last 3 attempts completed with 100% accuracy
        const last3 = attempts.slice(-3);
        const mastered =
          last3.length >= 3 &&
          last3.every(
            (a) => a.completed && a.correctMoves === a.totalMoves
          );

        const next: ChessTrainingState = {
          ...prev,
          progress: {
            ...prev.progress,
            [pathId]: {
              ...existing,
              attempts,
              firstCompleted,
              mastered,
            },
          },
        };
        save(next);
        return next;
      });
    },
    []
  );

  const getOpeningStats = useCallback(
    (openingId: string) => {
      const entries = Object.values(state.progress).filter(
        (p) => p.openingId === openingId
      );
      const masteredPaths = entries.filter((p) => p.mastered).length;
      const allAttempts = entries.flatMap((p) => p.attempts);
      const totalAttempts = allAttempts.length;
      const avgAccuracy =
        totalAttempts > 0
          ? allAttempts.reduce(
              (sum, a) =>
                sum +
                (a.totalMoves > 0 ? a.correctMoves / a.totalMoves : 0),
              0
            ) / totalAttempts
          : 0;

      // Accuracy over time for chart
      const accuracyTrend = allAttempts
        .filter((a) => a.completed)
        .map((a) => ({
          date: a.date.split("T")[0],
          accuracy: Math.round(
            (a.correctMoves / a.totalMoves) * 100
          ),
        }));

      return {
        practicedPaths: entries.length,
        masteredPaths,
        totalAttempts,
        avgAccuracy,
        accuracyTrend,
      };
    },
    [state]
  );

  const getPathStatus = useCallback(
    (pathId: string): "new" | "practiced" | "mastered" => {
      const p = state.progress[pathId];
      if (!p || p.attempts.length === 0) return "new";
      if (p.mastered) return "mastered";
      return "practiced";
    },
    [state]
  );

  const getLastAttempt = useCallback(
    (pathId: string): AttemptRecord | null => {
      const p = state.progress[pathId];
      if (!p || p.attempts.length === 0) return null;
      return p.attempts[p.attempts.length - 1];
    },
    [state]
  );

  return {
    state,
    getPathProgress,
    isFirstTime,
    recordAttempt,
    getOpeningStats,
    getPathStatus,
    getLastAttempt,
  };
}
