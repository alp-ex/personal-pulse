"use client";

import { useState } from "react";
import {
  useHealthData,
  HEALTH_TYPES,
  type HealthType,
} from "@/hooks/useHealthData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function QuickAddForm({ onAdd }: { onAdd: (type: HealthType, value: number, note?: string) => void }) {
  const [type, setType] = useState<HealthType>("sleep");
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");

  const config = HEALTH_TYPES[type];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = parseFloat(value);
    if (isNaN(num)) return;
    onAdd(type, num, note || undefined);
    setValue("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 mb-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as HealthType)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm"
          >
            {(Object.keys(HEALTH_TYPES) as HealthType[]).map((t) => (
              <option key={t} value={t}>{HEALTH_TYPES[t].label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Value ({config.unit})
          </span>
          <input
            type="number"
            step={config.step}
            min={config.min}
            max={config.max}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`${config.min}-${config.max}`}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Note (optional)</span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. felt great"
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm"
          />
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={!value}
            className="w-full px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

function MiniSparkline({ type, data }: { type: HealthType; data: { date: string; value: number }[] }) {
  if (data.length < 2) return null;

  return (
    <div className="h-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="currentColor" stopOpacity={0.2} />
              <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" hide />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            labelStyle={{ fontSize: 11 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            fill={`url(#grad-${type})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HealthTracker() {
  const { add, remove, getRecent } = useHealthData();
  const recent = getRecent(undefined, 7);

  const typeGroups = (Object.keys(HEALTH_TYPES) as HealthType[]).map((type) => {
    const entries = getRecent(type, 14);
    const chartData = [...entries]
      .reverse()
      .map((e) => ({ date: e.date, value: e.value }));
    const latest = entries[0];
    return { type, entries, chartData, latest };
  });

  return (
    <div>
      <QuickAddForm onAdd={add} />

      {/* Metric overview cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {typeGroups.map(({ type, chartData, latest }) => {
          const config = HEALTH_TYPES[type];
          return (
            <div
              key={type}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-slate-700 dark:text-slate-300"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                {config.label}
              </div>
              <div className="text-lg font-bold mb-1">
                {latest ? `${latest.value} ${config.unit}` : "--"}
              </div>
              <MiniSparkline type={type} data={chartData} />
            </div>
          );
        })}
      </div>

      {/* Recent entries */}
      <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
        Recent entries
      </h3>
      {recent.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          No entries yet. Use the form above to start tracking.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {recent.map((entry) => {
            const config = HEALTH_TYPES[entry.type];
            return (
              <div
                key={entry.id}
                className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{config.label}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                    {entry.value} {config.unit}
                  </span>
                  {entry.note && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">
                      — {entry.note}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                  {entry.date}
                </span>
                <button
                  onClick={() => remove(entry.id)}
                  className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete entry"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
