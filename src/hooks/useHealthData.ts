"use client";

import { useState, useEffect, useCallback } from "react";

export interface HealthEntry {
  id: string;
  date: string;
  type: "sleep" | "exercise" | "mood" | "water" | "weight";
  value: number;
  note?: string;
}

export const HEALTH_TYPES = {
  sleep: { label: "Sleep", unit: "hrs", min: 0, max: 24, step: 0.5 },
  exercise: { label: "Exercise", unit: "min", min: 0, max: 300, step: 5 },
  mood: { label: "Mood", unit: "/5", min: 1, max: 5, step: 1 },
  water: { label: "Water", unit: "glasses", min: 0, max: 20, step: 1 },
  weight: { label: "Weight", unit: "kg", min: 30, max: 200, step: 0.1 },
} as const;

export type HealthType = keyof typeof HEALTH_TYPES;

const STORAGE_KEY = "personal-pulse-health";

function loadEntries(): HealthEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: HealthEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
}

export function useHealthData() {
  const [entries, setEntries] = useState<HealthEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const add = useCallback(
    (type: HealthType, value: number, note?: string) => {
      const entry: HealthEntry = {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
        type,
        value,
        note,
      };
      setEntries((prev) => {
        const next = [entry, ...prev];
        saveEntries(next);
        return next;
      });
    },
    []
  );

  const remove = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  const getRecent = useCallback(
    (type?: HealthType, days = 7) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const cutoffStr = cutoff.toISOString().split("T")[0];
      return entries.filter(
        (e) => e.date >= cutoffStr && (!type || e.type === type)
      );
    },
    [entries]
  );

  return { entries, add, remove, getRecent };
}
