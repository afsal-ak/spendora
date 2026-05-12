import { supabase } from "@/lib/supabase";
import ShareAuditButton from "@/components/audit/ShareAuditButton";
import SpendComparisonChart from "@/components/audit/SpendComparisonChart";
import type { Metadata } from "next";
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

  const supabase=getSupabase()

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();
  console.log(params, 'params');
  console.log(data, 'data');

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Audit not found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Public AI Spend Audit
        </p>

        <h1 className="mt-2 text-4xl font-bold text-black">
          Potential Savings:
          ${data.estimated_savings}
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Current Setup */}
          <div className="rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-xl font-bold">
              Current Setup
            </h2>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-zinc-500">
                  AI Tool
                </p>

                <p className="font-semibold">
                  {data.tool}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Current Plan
                </p>

                <p className="font-semibold">
                  {data.plan}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Team Size
                </p>

                <p className="font-semibold">
                  {data.team_size}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-2xl bg-black p-6 text-white">
            <h2 className="text-xl font-bold">
              Recommendation
            </h2>

            <div className="mt-4">
              <p className="text-2xl font-bold">
                Switch to{" "}
                {data.recommended_plan}
              </p>

              <p className="mt-4 leading-7 text-zinc-300">
                Estimated savings of $
                {data.estimated_savings}
                /month based on your current
                AI tooling setup.
              </p>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            AI Personalized Summary
          </p>

          <p className="mt-4 leading-7 text-zinc-700">
            {data.summary}
          </p>
        </div>
        <ShareAuditButton />
        <SpendComparisonChart
          currentSpend={data.monthly_spend}
          recommendedSpend={
            data.monthly_spend -
            data.estimated_savings
          }
          savings={data.estimated_savings}
        />
      </div>
    </main>
  );
}