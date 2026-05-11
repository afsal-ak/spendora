interface AuditResultCardProps {
  result: any;
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
}

export default function AuditResultCard({
  result,
  selectedTool,
  selectedPlan,
  monthlySpend,
  teamSize,
}: AuditResultCardProps) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              AI Spend Audit
            </p>

            <h3 className="mt-1 text-3xl font-bold text-black">
              Potential Savings Found
            </h3>
          </div>

          <div className="rounded-2xl bg-green-100 px-5 py-3 text-center">
            <p className="text-sm font-medium text-green-700">
              Estimated Monthly Savings
            </p>

            <p className="mt-1 text-3xl font-bold text-green-700">
              ${result.estimatedSavingsUSD}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Stack */}
          <div className="rounded-2xl border border-zinc-200 p-5">
            <p className="text-sm font-medium text-zinc-500">
              Current Setup
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-zinc-500">AI Tool</p>

                <p className="text-lg font-semibold text-black">
                  {selectedTool}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Current Plan</p>

                <p className="text-lg font-semibold text-black">
                  {selectedPlan}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Monthly Spend
                </p>

                <p className="text-lg font-semibold text-black">
                  ${monthlySpend}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-2xl border border-black bg-black p-5 text-white">
            <p className="text-sm font-medium text-zinc-300">
              Recommended Action
            </p>

            <div className="mt-4">
              <p className="text-2xl font-bold">
                Switch to {result.recommendedPlan}
              </p>

              <p className="mt-4 leading-7 text-zinc-300">
                {result.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">
              Monthly Savings
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              ${result.estimatedSavingsUSD}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">
              Annual Savings
            </p>

            <p className="mt-2 text-2xl font-bold text-black">
              ${result.estimatedSavingsUSD * 12}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">
              Team Size
            </p>

            <p className="mt-2 text-2xl font-bold text-black">
              {teamSize}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-xl font-bold text-black">
                Want the full audit report?
              </h4>

              <p className="mt-2 text-zinc-600">
                Get a personalized AI spend optimization report
                delivered to your inbox.
              </p>
            </div>

            <button className="h-12 rounded-xl bg-black px-6 font-semibold text-white transition hover:opacity-90">
              Unlock Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}