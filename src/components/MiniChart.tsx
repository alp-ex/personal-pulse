"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MiniChartProps {
  data: Array<{ year: number; value: number }>;
}

export function MiniChart({ data }: MiniChartProps) {
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10 }}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            formatter={(val) => [Number(val).toLocaleString(), "Value"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
