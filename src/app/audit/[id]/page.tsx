import type { Metadata } from "next";

import ShareAuditButton from "@/components/audit/ShareAuditButton";
import { getSupabase } from "@/lib/getSupabase";

export async function generateMetadata():
  Promise<Metadata> {
  return {
    title:
      "Spendora AI Audit Report",

    description:
      "See AI tooling savings opportunities and optimization insights with Spendora.",

    openGraph: {
      title:
        "Spendora AI Audit Report",

      description:
        "Optimize your AI stack and reduce monthly spend.",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        "Spendora AI Audit Report",

      description:
        "Discover potential AI tooling savings with Spendora.",
    },
  };
}

interface AuditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AuditPage({
  params,
}: AuditPageProps) {
  const { id } = await params;

  const supabase =
    getSupabase();

  const { data, error } =
    await supabase
      .from("audits")
      .select(`
      id,
      name,
      role,
      tool,
      plan,
      monthly_spend,
      team_size,
      recommendation_type,
      recommended_tool,
      recommended_plan,
      estimated_savings,
      summary,
      reason
    `)
     .eq("id", id)
      .single();

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Audit not found
        </h1>
      </div>
    );
  }

  const isDowngrade =
    data.recommendation_type ===
    "downgrade";

  const isUpgrade =
    data.recommendation_type ===
    "upgrade";

  const isSwitch =
    data.recommendation_type ===
    "switch";

  const isKeep =
    data.recommendation_type ===
    "keep";

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-zinc-200 bg-white px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                Public AI Spend Audit
              </p>

              <h1 className="mt-2 text-4xl font-bold text-black">
                {isDowngrade &&
                  "Potential Savings Found"}

                {isUpgrade &&
                  "Better Workflow Match"}

                {isSwitch &&
                  "Workflow Optimization"}

                {isKeep &&
                  "Current Setup Looks Good"}
              </h1>
            </div>

            <div
              className={`rounded-2xl px-5 py-4 text-center ${isDowngrade
                  ? "bg-green-100"
                  : isUpgrade
                    ? "bg-blue-100"
                    : isSwitch
                      ? "bg-purple-100"
                      : "bg-zinc-200"
                }`}
            >
              <p
                className={`text-sm font-medium ${isDowngrade
                    ? "text-green-700"
                    : isUpgrade
                      ? "text-blue-700"
                      : isSwitch
                        ? "text-purple-700"
                        : "text-zinc-700"
                  }`}
              >
                {isDowngrade
                  ? "Estimated Monthly Savings"
                  : "Recommended Tool"}
              </p>

              <p
                className={`mt-1 text-3xl font-bold ${isDowngrade
                    ? "text-green-700"
                    : isUpgrade
                      ? "text-blue-700"
                      : isSwitch
                        ? "text-purple-700"
                        : "text-zinc-700"
                  }`}
              >
                {isDowngrade
                  ? `$${data.estimated_savings}`
                  : data.recommended_tool}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Current Setup */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <p className="text-sm font-medium text-zinc-500">
                Current Setup
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-zinc-500">
                    AI Tool
                  </p>

                  <p className="text-lg font-semibold text-black">
                    {data.tool}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Current Plan
                  </p>

                  <p className="text-lg font-semibold capitalize text-black">
                    {data.plan}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Monthly Spend
                  </p>

                  <p className="text-lg font-semibold text-black">
                    $
                    {
                      data.monthly_spend
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <p className="text-sm font-medium text-zinc-500">
                Recommended Action
              </p>

              <div className="mt-5">
                <div className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                  {
                    data.recommendation_type
                  }
                </div>

                <p className="mt-4 text-2xl font-bold text-black">
                  {isKeep
                    ? `Keep ${data.recommended_plan}`
                    : `Switch to ${data.recommended_plan}`}
                </p>

                <p className="mt-2 text-sm font-medium text-zinc-500">
                  Recommended Tool
                </p>

                <p className="text-lg font-semibold text-black">
                  {
                    data.recommended_tool
                  }
                </p>

                <p className="mt-5 leading-7 text-zinc-600">
                  {data.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">
                Monthly Savings
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                $
                {
                  data.estimated_savings
                }
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">
                Annual Savings
              </p>

              <p className="mt-2 text-2xl font-bold text-black">
                $
                {data.estimated_savings *
                  12}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-500">
                Team Size
              </p>

              <p className="mt-2 text-2xl font-bold text-black">
                {
                  data.team_size
                }
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              AI Personalized Summary
            </p>

            <p className="mt-4 leading-7 text-zinc-700">
              {data.summary}
            </p>
          </div>

          {/* Share */}
          <div className="mt-8">
            <ShareAuditButton />
          </div>
        </div>
      </div>
    </main>
  );
}
