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

const tools = {
  ChatGPT: Object.values(ChatGPTPlans),
  Claude: Object.values(ClaudePlans),
  Gemini: Object.values(GeminiPlans),
  Cursor: Object.values(CursorPlans),
};

export default function AuditFormSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [summary, setSummary] = useState("");
  const [submittedData, setSubmittedData] = useState<any>(null);

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
      monthlySpend: 20,
      teamSize: 1,
      useCase: "Coding",
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

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      const auditResult =
        generateAudit({
          tool: values.selectedTool,
          plan: values.selectedPlan,
          monthlySpend:values.monthlySpend,
          teamSize: values.teamSize,
          useCase: values.useCase,
        });

      setResult(auditResult);

      const data = await generateSummary({
        tool: values.selectedTool,
        plan: values.selectedPlan,
        teamSize: values.teamSize,
        monthlySpend: values.monthlySpend,
        recommendedPlan: auditResult.recommendedPlan,
        savings: auditResult.estimatedSavingsUSD,
        reason: auditResult.reason,
      });

      setSummary(data.summary);
      setSubmittedData(values);
      localStorage.setItem(
        "spendora-audit-result",
        JSON.stringify(auditResult)
      );
      setHasChanges(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
                  "selectedTool"
                )}
                onChange={(e) => {
                  setValue(
                    "selectedTool",
                    e.target.value
                  );

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
                }}
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
                  "selectedPlan"
                )}
                onChange={() =>
                  setHasChanges(true)
                }
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
                Monthly Spend
              </label>

              <input
                type="number"
                {...register(
                  "monthlySpend",
                  {
                    valueAsNumber: true,
                  }
                )}
                onChange={() =>
                  setHasChanges(true)
                }
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
                  }
                )}
                onChange={() =>
                  setHasChanges(true)
                }
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
                {...register("useCase")}
                onChange={() =>
                  setHasChanges(true)
                }
                className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none transition focus:border-black"
              >
                <option>
                  Coding
                </option>

                <option>
                  Writing
                </option>

                <option>
                  Research
                </option>

                <option>
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
                submittedData?.selectedTool
              }
              selectedPlan={
                submittedData?.selectedPlan
              }
              monthlySpend={
                submittedData?.monthlySpend
              }
              teamSize={
                submittedData?.teamSize
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { ChatGPTPlans } from "@/enums/chatgpt";
// import { generateAudit } from "@/lib/audit-engine";
// import { ClaudePlans } from "@/enums/claude";
// import { GeminiPlans } from "@/enums/gemini";
// import { CursorPlans } from "@/enums/cursor";
// import AuditResultCard from "@/components/audit/AuditResultCard";

// const tools = {
//   ChatGPT: Object.values(ChatGPTPlans),
//   Claude: Object.values(ClaudePlans),
//   Gemini: Object.values(GeminiPlans),
//   Cursor: Object.values(CursorPlans),
// };

// export default function AuditFormSection() {

//   const [isLoading, setIsLoading] = useState(false);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [selectedTool, setSelectedTool] = useState("ChatGPT");
//   const [selectedPlan, setSelectedPlan] = useState<string>(ChatGPTPlans.PLUS);
//   const [monthlySpend, setMonthlySpend] = useState(20);
//   const [teamSize, setTeamSize] = useState(1);
//   const [useCase, setUseCase] = useState("Coding");

//   const [result, setResult] = useState<any>(null);
//   const [summary, setSummary] = useState("");

//   const [submittedData, setSubmittedData] =
//     useState<any>(null);
//   const plans = useMemo(() => {
//     return tools[selectedTool as keyof typeof tools] || [];
//   }, [selectedTool]);

//   const handleGenerateAudit = async () => {

//     setIsLoading(true);

//     await new Promise((resolve) =>
//       setTimeout(resolve, 1200)
//     );
//     const auditResult = generateAudit({
//       tool: selectedTool,
//       plan: selectedPlan,
//       monthlySpend,
//       teamSize,
//       useCase,
//     });

//     setResult(auditResult);
//     const response = await fetch(
//       "/api/generate-summary",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           tool: selectedTool,
//           plan: selectedPlan,
//           teamSize,
//           monthlySpend,
//           recommendedPlan:
//             auditResult.recommendedPlan,
//           savings:
//             auditResult.estimatedSavingsUSD,
//           reason: auditResult.reason,
//         }),
//       }
//     );
// console.log(response,'response in  audit form');

//     const data = await response.json();

//     setSummary(data.summary);

//     setSubmittedData({
//       selectedTool,
//       selectedPlan,
//       monthlySpend,
//       teamSize,
//       useCase,
//     });
//     localStorage.setItem(
//       "spendora-audit-result",
//       JSON.stringify(auditResult)
//     );
//     setHasChanges(false);
//     setIsLoading(false);

//   };


//   useEffect(() => {
//     const savedData = localStorage.getItem(
//       "spendora-audit-form"
//     );

//     const savedResult = localStorage.getItem(
//       "spendora-audit-result"
//     );

//     if (savedData) {
//       const parsed = JSON.parse(savedData);

//       setSelectedTool(parsed.selectedTool);
//       setSelectedPlan(parsed.selectedPlan);
//       setMonthlySpend(parsed.monthlySpend);
//       setTeamSize(parsed.teamSize);
//       setUseCase(parsed.useCase);
//     }

//     if (savedResult) {
//       setResult(JSON.parse(savedResult));
//     }
//   }, []);



//   useEffect(() => {
//     localStorage.setItem(
//       "spendora-audit-form",
//       JSON.stringify({
//         selectedTool,
//         selectedPlan,
//         monthlySpend,
//         teamSize,
//         useCase,
//       })
//     );
//   }, [
//     selectedTool,
//     selectedPlan,
//     monthlySpend,
//     teamSize,
//     useCase,
//   ]);

//   return (
//     <section className="py-24 bg-zinc-50">
//       <div className="max-w-5xl mx-auto px-6">
//         <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-sm">
//           <div className="mb-10 text-center">
//             <h2 className="text-4xl font-bold text-black">
//               Start Your Free AI Spend Audit
//             </h2>

//             <p className="mt-4 text-zinc-600">
//               Enter your current AI tooling and monthly spend.
//             </p>
//           </div>

//           <form className="grid md:grid-cols-2 gap-6">
//             {/* AI Tool */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-zinc-700">
//                 AI Tool
//               </label>

//               <select
//                 value={selectedTool}
//                 onChange={(e) => {
//                   const tool = e.target.value;
//                   setSelectedTool(tool);
//                   const toolPlans =
//                     tools[tool as keyof typeof tools];
//                   setSelectedPlan(toolPlans[0]);
//                   setHasChanges(true)
//                 }}
//                 className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
//               >
//                 {Object.keys(tools).map((tool) => (
//                   <option key={tool} value={tool}>
//                     {tool}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Plan */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-zinc-700">
//                 Plan
//               </label>

//               <select
//                 value={selectedPlan}
//                 onChange={(e) => {
//                   setSelectedPlan(e.target.value as ChatGPTPlans);
//                   setHasChanges(true);

//                 }}
//                 className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
//               >
//                 {plans.map((plan) => (
//                   <option key={plan} value={plan}>
//                     {plan}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Monthly Spend */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-zinc-700">
//                 Monthly Spend
//               </label>

//               <input
//                 type="number"
//                 value={monthlySpend}
//                 onChange={(e) => {
//                   setMonthlySpend(Number(e.target.value));
//                   setHasChanges(true)

//                 }}
//                 className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
//               />
//             </div>

//             {/* Team Size */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-zinc-700">
//                 Team Size
//               </label>

//               <input
//                 type="number"
//                 value={teamSize}
//                 onChange={(e) => {
//                   setTeamSize(Number(e.target.value));
//                   setHasChanges(true)

//                 }}
//                 className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
//               />
//             </div>

//             {/* Use Case */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-zinc-700">
//                 Primary Use Case
//               </label>

//               <select
//                 value={useCase}
//                 onChange={(e) => {
//                   setUseCase(e.target.value);
//                   setHasChanges(true)

//                 }}
//                 className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
//               >
//                 <option>Coding</option>
//                 <option>Writing</option>
//                 <option>Research</option>
//                 <option>Mixed</option>
//               </select>
//             </div>

//             {/* Button */}
//             <div className="md:col-span-2">
//               <button
//                 type="button"
//                 onClick={handleGenerateAudit}
//                 disabled={isLoading}
//                 className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
//               >
//                 {isLoading
//                   ? "Generating Audit..."
//                   : hasChanges && result
//                     ? "Regenerate Audit"
//                     : "Generate Audit"}
//               </button>

//             </div>
//           </form>
//           {/* Result */}
//           {result && (
//             <AuditResultCard
//               result={result}
//               summary={summary}

//               selectedTool={submittedData?.selectedTool}
//               selectedPlan={submittedData?.selectedPlan}
//               monthlySpend={submittedData?.monthlySpend}
//               teamSize={submittedData?.teamSize}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

