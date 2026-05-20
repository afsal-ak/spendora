import { AuditResult } from "@/types/audit";
import LeadCaptureForm from "./LeadCaptureForm";

interface AuditResultCardProps {
    result: AuditResult;
    summary: string;
    selectedTool: string;
    selectedPlan: string;
    monthlySpend: number;
    teamSize: number;
    useCase:string;
    isGeneratingSummary: boolean;

}

export default function AuditResultCard({
    result,
    summary,
    selectedTool,
    selectedPlan,
    monthlySpend,
    teamSize,
    useCase,
    isGeneratingSummary,

}: AuditResultCardProps) {

    const isDowngrade =
        result.recommendationType ===
        "downgrade";

    const isUpgrade =
        result.recommendationType ===
        "upgrade";

    const isSwitch =
        result.recommendationType ===
        "switch";

    const isKeep =
        result.recommendationType ===
        "keep";

    return (
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                            AI Spend Audit
                        </p>

                        <h3 className="mt-1 text-3xl font-bold text-black">
                            {isDowngrade &&
                                "Potential Savings Found"}

                            {isUpgrade &&
                                "Better Workflow Match"}

                            {isSwitch &&
                                "Workflow Optimization"}

                            {isKeep &&
                                "Current Setup Looks Good"}
                        </h3>
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
                                ? `$${result.estimatedSavingsUSD}`
                                : result.recommendedTool}
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
                                    {selectedTool}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500">
                                    Current Plan
                                </p>

                                <p className="text-lg font-semibold text-black capitalize">
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
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                        <p className="text-sm font-medium text-zinc-500">
                            Recommended Action
                        </p>

                        <div className="mt-5">
                            <div className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                                {result.recommendationType}
                            </div>

                            <p className="mt-4 text-2xl font-bold text-black">
                                {isKeep
                                    ? `Keep ${result.recommendedPlan}`
                                    : `Switch to ${result.recommendedPlan}`}
                            </p>

                            <p className="mt-2 text-sm font-medium text-zinc-500">
                                Recommended Tool
                            </p>

                            <p className="text-lg font-semibold text-black">
                                {result.recommendedTool}
                            </p>

                            <p className="mt-5 leading-7 text-zinc-600">
                                {result.reason}
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
                            ${result.estimatedSavingsUSD}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <p className="text-sm text-zinc-500">
                            Annual Savings
                        </p>

                        <p className="mt-2 text-2xl font-bold text-black">
                            $
                            {result.estimatedSavingsUSD *
                                12}
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


                {/* Summary */}
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                    <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                        AI Personalized Summary
                    </p>

                    {isGeneratingSummary ? (
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-black" />

                            <div>
                                <p className="font-medium text-black">
                                    Generating AI Summary
                                </p>

                                <p className="text-sm text-zinc-500">
                                    Analyzing workflow fit,
                                    pricing efficiency, and
                                    optimization opportunities...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 leading-7 text-zinc-700">
                            {summary}
                        </p>
                    )}
                </div>


                <LeadCaptureForm
                    result={result}
                    summary={summary}
                    selectedTool={selectedTool}
                    selectedPlan={selectedPlan}
                    monthlySpend={monthlySpend}
                    teamSize={teamSize}
                    useCase={useCase}
                    isGeneratingSummary={
                        isGeneratingSummary
                    }
                />
            </div>
        </div>
    );
}