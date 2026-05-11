"use client";

import { useMemo, useState } from "react";
import { ChatGPTPlans } from "@/enums/chatgpt";
import { generateAudit } from "@/lib/audit-engine";
import { ClaudePlans } from "@/enums/claude";
import { GeminiPlans } from "@/enums/gemini";
import { CursorPlans } from "@/enums/cursor";


const tools = {
  ChatGPT: Object.values(ChatGPTPlans),
  Claude: Object.values(ClaudePlans),
  Gemini: Object.values(GeminiPlans),
  Cursor: Object.values(CursorPlans),
};

export default function AuditFormSection() {
  const [selectedTool, setSelectedTool] = useState("ChatGPT");
  const [selectedPlan, setSelectedPlan] = useState(ChatGPTPlans.PLUS);
  const [monthlySpend, setMonthlySpend] = useState(20);
  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("Coding");

  const [result, setResult] = useState<any>(null);

  const plans = useMemo(() => {
    return tools[selectedTool as keyof typeof tools] || [];
  }, [selectedTool]);

  const handleGenerateAudit = () => {
    const auditResult = generateAudit({
      tool: selectedTool,
      plan: selectedPlan,
      monthlySpend,
      teamSize,
      useCase,
    });

    setResult(auditResult);
  };

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-black">
              Start Your Free AI Spend Audit
            </h2>

            <p className="mt-4 text-zinc-600">
              Enter your current AI tooling and monthly spend.
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            {/* AI Tool */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                AI Tool
              </label>

              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
              >
                {Object.keys(tools).map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Plan
              </label>

              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value as ChatGPTPlans)}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Spend */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Monthly Spend
              </label>

              <input
                type="number"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Team Size
              </label>

              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
              />
            </div>

            {/* Use Case */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Primary Use Case
              </label>

              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
              >
                <option>Coding</option>
                <option>Writing</option>
                <option>Research</option>
                <option>Mixed</option>
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleGenerateAudit}
                className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition"
              >
                Generate Audit
              </button>
            </div>
          </form>

          {/* Result */}
          {/* {result && (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-2xl font-bold text-black">
                Audit Result
              </h3>

              <div className="mt-6 space-y-3">
                <p className="text-zinc-700">
                  <span className="font-semibold">
                    Recommended Plan:
                  </span>{" "}
                  {result.recommendedPlan}
                </p>

                <p className="text-green-600 font-semibold">
                  Estimated Savings: $
                  {result.estimatedSavingsUSD}
                </p>

                <p className="text-zinc-600 leading-7">
                  {result.reason}
                </p>
              </div>
            </div>
          )} */}
          {/* Result */}
          {result && (
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
                      $
                      {result.estimatedSavingsUSD * 12}
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
          )}
        </div>
      </div>
    </section>
  );
}

