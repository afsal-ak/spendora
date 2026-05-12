"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  currentSpend: number;
  recommendedSpend: number;
  savings: number;
}

export default function SpendComparisonChart({
  currentSpend,
  recommendedSpend,
  savings,
}: Props) {
  const data = [
    {
      name: "Current Spend",
      amount: currentSpend,
    },

    {
      name: "Recommended",
      amount: recommendedSpend,
    },

    {
      name: "Savings",
      amount: savings,
    },
  ];

  const colors = [
    "#18181b",
    "#2563eb",
    "#059669",
  ];

  return (
    <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Spend Analysis
          </p>

          <h3 className="mt-2 text-2xl font-bold text-black">
            AI Spend Optimization
          </h3>

          <p className="mt-2 max-w-2xl text-zinc-600">
            Visual comparison of your
            current AI tooling costs
            against the recommended
            optimized setup.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-3">
          <p className="text-sm text-emerald-700">
            Estimated Savings
          </p>

          <p className="text-2xl font-bold text-emerald-600">
            ${savings}/mo
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-5">
          <p className="text-sm text-zinc-500">
            Current Spend
          </p>

          <p className="mt-2 text-3xl font-bold text-black">
            ${currentSpend}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm text-blue-700">
            Recommended
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            ${recommendedSpend}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">
            Savings
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            ${savings}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-10 h-[360px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[12, 12, 0, 0]}
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={colors[index]}
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}