"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressOverviewProps {
  totalPaths: number;
  practicedPaths: number;
  masteredPaths: number;
  totalAttempts: number;
  avgAccuracy: number;
  accuracyTrend: { date: string; accuracy: number }[];
}

export function ProgressOverview({
  totalPaths,
  practicedPaths,
  masteredPaths,
  totalAttempts,
  avgAccuracy,
  accuracyTrend,
}: ProgressOverviewProps) {
  const progressPct = totalPaths > 0 ? (masteredPaths / totalPaths) * 100 : 0;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Paths mastered
          </div>
          <div className="text-lg font-bold">
            {masteredPaths}/{totalPaths}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Practiced
          </div>
          <div className="text-lg font-bold">{practicedPaths}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Sessions
          </div>
          <div className="text-lg font-bold">{totalAttempts}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Avg accuracy
          </div>
          <div className="text-lg font-bold">
            {totalAttempts > 0 ? `${Math.round(avgAccuracy * 100)}%` : "--"}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Mastery progress</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-2 rounded-full bg-green-500 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Accuracy trend chart */}
      {accuracyTrend.length >= 2 && (
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accuracyTrend}>
              <defs>
                <linearGradient id="grad-accuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                }}
                labelStyle={{ fontSize: 11 }}
                formatter={(value) => [`${value}%`, "Accuracy"]}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="#22c55e"
                fill="url(#grad-accuracy)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
