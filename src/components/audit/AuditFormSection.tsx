"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChatGPTPlans } from "@/enums/chatgpt";
import { ClaudePlans } from "@/enums/claude";
import { GeminiPlans } from "@/enums/gemini";
import { CursorPlans } from "@/enums/cursor";

import { generateSummary } from "@/services/summary.service";
import { generateAudit } from "@/lib/audit-engine";
import AuditResultCard from "@/components/audit/AuditResultCard";

import {
  auditSchema,
  AuditFormData,
} from "@/schemas/audit.schema";
import { AuditResult, SubmittedAuditData } from "@/types/audit";
import { OpenAIApiPlans } from "@/enums/OpenAIApi";
import { AnthropicApiPlans } from "@/enums/Anthropic";
import { WindsurfPlans } from "@/enums/Windsurf";
import { GithubCopilotPlans } from "@/enums/copilot";

import { toast } from "sonner";
import { getMinimumSpend } from "@/lib/pricing-validation";

const tools = {
  ChatGPT: Object.values(ChatGPTPlans),
  Claude: Object.values(ClaudePlans),
  Gemini: Object.values(GeminiPlans),
  Cursor: Object.values(CursorPlans),
  "GitHub Copilot": Object.values(GithubCopilotPlans),
  Windsurf: Object.values(WindsurfPlans),
  "OpenAI API": Object.values(OpenAIApiPlans),
  "Anthropic API": Object.values(AnthropicApiPlans),
};


export default function AuditFormSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [result, setResult] = useState<AuditResult>();
  const [summary, setSummary] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedAuditData | null>(null);

  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),

    defaultValues: {
      selectedTool: "ChatGPT",
      selectedPlan: ChatGPTPlans.PLUS,
      monthlySpend: undefined,
      teamSize: undefined,
      useCase: "coding",
      companyFax: ""
    },
  });

  const selectedTool = watch(
    "selectedTool"
  );
  const selectedPlan = watch(
    "selectedPlan"
  );
  const monthlySpend = watch(
    "monthlySpend"
  );
  const teamSize = watch("teamSize");
  const useCase = watch("useCase");
  const plans = useMemo(() => {
    return (
      tools[
      selectedTool as keyof typeof tools
      ] || []
    );
  }, [selectedTool]);

  useEffect(() => {
    const savedData = localStorage.getItem(
      "spendora-audit-form"
    );

    const savedResult =
      localStorage.getItem(
        "spendora-audit-result"
      );

    if (savedData) {
      const parsed =
        JSON.parse(savedData);

      setValue(
        "selectedTool",
        parsed.selectedTool
      );

      setValue(
        "selectedPlan",
        parsed.selectedPlan
      );
      setValue(
        "monthlySpend",
        parsed.monthlySpend
      );
      setValue(
        "teamSize",
        parsed.teamSize
      );
      setValue(
        "useCase",
        parsed.useCase
      );
    }

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, [setValue]);

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
  const onSubmit = async (
    values: AuditFormData
  ) => {
    try {
      setIsLoading(true);
      setSummary("");
      const minimumSpend =
        getMinimumSpend(
          values.selectedTool,
          values.selectedPlan,
          values.teamSize
        );


      const isDowngradeCase =
        (
          values.selectedTool ===
          "Claude" &&
          values.selectedPlan ===
          ClaudePlans.MAX &&
          values.monthlySpend <
          50
        ) ||
        (
          values.selectedTool ===
          "Gemini" &&
          values.selectedPlan ===
          GeminiPlans.ULTRA &&
          values.monthlySpend <
          100
        ) ||
        (
          values.selectedTool ===
          "ChatGPT" &&
          values.selectedPlan ===
          ChatGPTPlans.ENTERPRISE &&
          values.teamSize <
          10
        ) ||
        (
          values.selectedTool ===
          "Cursor" &&
          values.selectedPlan ===
          CursorPlans.BUSINESS &&
          values.teamSize <=
          1
        );

      if (
        !isDowngradeCase &&
        values.monthlySpend <
        minimumSpend
      ) {
        toast.error(
          `Minimum expected spend for ${values.selectedPlan} is approximately $${minimumSpend}/month.`
        );

        return;
      }
   
      const auditResult =
        generateAudit({
          tool: values.selectedTool,
          plan: values.selectedPlan,
          monthlySpend:
            values.monthlySpend,
          teamSize:
            values.teamSize,
          useCase:
            values.useCase,
        });

      setResult(auditResult);
      setSubmittedData(values);

      localStorage.setItem(
        "spendora-audit-result",
        JSON.stringify(auditResult)
      );

      setHasChanges(false);
      setIsLoading(false);

      setIsGeneratingSummary(true);

      const data =
        await generateSummary({
          tool:
            values.selectedTool,
          plan:
            values.selectedPlan,
          teamSize:
            values.teamSize,
          monthlySpend:
            values.monthlySpend,
          recommendedPlan:
            auditResult.recommendedPlan,
          recommendedTool:
            auditResult.recommendedTool!,
          recommendationType:
            auditResult.recommendationType,
          savings:
            auditResult.estimatedSavingsUSD,
          reason:
            auditResult.reason,
        });

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsGeneratingSummary(false);
    }
  };

  return (
    <section className="bg-zinc-50 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-black">
              Start Your Free AI Spend
              Audit
            </h2>

            <p className="mt-4 text-zinc-600">
              Enter your current AI
              tooling and monthly
              spend.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="grid gap-6 md:grid-cols-2"
          >
            <input
              type="text"
              {...register("companyFax")}
              className="absolute left-[-9999px]"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* AI Tool */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                AI Tool
              </label>

              <select
                {...register(
                  "selectedTool",
                  {
                    onChange: (e) => {
                      const toolPlans =
                        tools[
                        e.target
                          .value as keyof typeof tools
                        ];

                      setValue(
                        "selectedPlan",
                        toolPlans[0]
                      );

                      setHasChanges(true);
                    },
                  }
                )}
                className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none transition focus:border-black"
              >
                {Object.keys(tools).map(
                  (tool) => (
                    <option
                      key={tool}
                      value={tool}
                    >
                      {tool}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Plan
              </label>

              <select
                {...register(
                  "selectedPlan",
                  {
                    onChange: () =>
                      setHasChanges(true),
                  }
                )}
                className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none transition focus:border-black"
              >
                {plans.map((plan) => (
                  <option
                    key={plan}
                    value={plan}
                  >
                    {plan}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Spend */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Monthly Spend(USD)
              </label>

              <input
                type="number"
                {...register(
                  "monthlySpend",
                  {
                    valueAsNumber: true,

                    onChange: () =>
                      setHasChanges(true),
                  }
                )}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-black outline-none transition ${errors.monthlySpend
                  ? "border-red-500"
                  : "border-zinc-300 focus:border-black"
                  }`}
              />

              {errors.monthlySpend && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    errors.monthlySpend
                      .message
                  }
                </p>
              )}
            </div>

            {/* Team Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Team Size
              </label>

              <input
                type="number"
                {...register(
                  "teamSize",
                  {
                    valueAsNumber: true,

                    onChange: () =>
                      setHasChanges(true),
                  }
                )}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-black outline-none transition ${errors.teamSize
                  ? "border-red-500"
                  : "border-zinc-300 focus:border-black"
                  }`}
              />

              {errors.teamSize && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    errors.teamSize
                      .message
                  }
                </p>
              )}
            </div>

            {/* Use Case */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Primary Use Case
              </label>

              <select
                {...register(
                  "useCase",
                  {
                    onChange: () =>
                      setHasChanges(true),
                  }
                )}
                className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none transition focus:border-black"
              >
                <option value="coding">
                  Coding
                </option>

                <option value="writing">
                  Writing
                </option>

                <option value="research">
                  Research
                </option>

                <option value="video">
                  Video Generation
                </option>

                <option value="image">
                  Image Generation
                </option>

                <option value="mixed">
                  Mixed
                </option>
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {isLoading
                  ? "Generating Audit..."
                  : hasChanges &&
                    result
                    ? "Regenerate Audit"
                    : "Generate Audit"}
              </button>
            </div>
          </form>

          {/* Result */}
          {result && (
            <AuditResultCard
              result={result}
              summary={summary}
              selectedTool={
                submittedData?.selectedTool || ""
              }
              selectedPlan={
                submittedData?.selectedPlan || ""
              }
              monthlySpend={
                submittedData?.monthlySpend || 0
              }
              teamSize={
                submittedData?.teamSize || 0
              }
              useCase={
                submittedData?.useCase || ''
              }
              isGeneratingSummary={
                isGeneratingSummary
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
