"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatGPTPlans } from "@/enums/chatgpt";
import { generateAudit } from "@/lib/audit-engine";
import { ClaudePlans } from "@/enums/claude";
import { GeminiPlans } from "@/enums/gemini";
import { CursorPlans } from "@/enums/cursor";
import AuditResultCard from "@/components/audit/AuditResultCard";

const tools = {
  ChatGPT: Object.values(ChatGPTPlans),
  Claude: Object.values(ClaudePlans),
  Gemini: Object.values(GeminiPlans),
  Cursor: Object.values(CursorPlans),
};

export default function AuditFormSection() {

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedTool, setSelectedTool] = useState("ChatGPT");
  const [selectedPlan, setSelectedPlan] = useState<string>(ChatGPTPlans.PLUS);
  const [monthlySpend, setMonthlySpend] = useState(20);
  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("Coding");

  const [result, setResult] = useState<any>(null);
  const [submittedData, setSubmittedData] =
    useState<any>(null);
  const plans = useMemo(() => {
    return tools[selectedTool as keyof typeof tools] || [];
  }, [selectedTool]);

  const handleGenerateAudit = async () => {

    setIsLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );
    const auditResult = generateAudit({
      tool: selectedTool,
      plan: selectedPlan,
      monthlySpend,
      teamSize,
      useCase,
    });

    setResult(auditResult);
    setSubmittedData({
      selectedTool,
      selectedPlan,
      monthlySpend,
      teamSize,
      useCase,
    });
    localStorage.setItem(
      "spendora-audit-result",
      JSON.stringify(auditResult)
    );
    setHasChanges(false);
    setIsLoading(false);

  };


  useEffect(() => {
    const savedData = localStorage.getItem(
      "spendora-audit-form"
    );

    const savedResult = localStorage.getItem(
      "spendora-audit-result"
    );

    if (savedData) {
      const parsed = JSON.parse(savedData);

      setSelectedTool(parsed.selectedTool);
      setSelectedPlan(parsed.selectedPlan);
      setMonthlySpend(parsed.monthlySpend);
      setTeamSize(parsed.teamSize);
      setUseCase(parsed.useCase);
    }

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);



  useEffect(() => {
    localStorage.setItem(
      "spendora-audit-form",
      JSON.stringify({
        selectedTool,
        selectedPlan,
        monthlySpend,
        teamSize,
        useCase,
      })
    );
  }, [
    selectedTool,
    selectedPlan,
    monthlySpend,
    teamSize,
    useCase,
  ]);

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
                onChange={(e) => {
                  const tool = e.target.value;
                  setSelectedTool(tool);
                  const toolPlans =
                    tools[tool as keyof typeof tools];
                  setSelectedPlan(toolPlans[0]);
                  setHasChanges(true)
                }}
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
                onChange={(e) => {
                  setSelectedPlan(e.target.value as ChatGPTPlans);
                  setHasChanges(true);

                }}
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
                onChange={(e) => {
                  setMonthlySpend(Number(e.target.value));
                  setHasChanges(true)

                }}
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
                onChange={(e) => {
                  setTeamSize(Number(e.target.value));
                  setHasChanges(true)

                }}
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
                onChange={(e) => {
                  setUseCase(e.target.value);
                  setHasChanges(true)

                }}
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
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading
                  ? "Generating Audit..."
                  : hasChanges && result
                    ? "Regenerate Audit"
                    : "Generate Audit"}
              </button>

            </div>
          </form>
          {/* Result */}
          {result && (
            <AuditResultCard
              result={result}
              selectedTool={submittedData?.selectedTool}
              selectedPlan={submittedData?.selectedPlan}
              monthlySpend={submittedData?.monthlySpend}
              teamSize={submittedData?.teamSize}
            />
          )}
        </div>
      </div>
    </section>
  );
}

