"use client";

import { useEffect, useState } from "react";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function ReRunPage({
    params,
}: Props) {
    const [data, setData] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function fetchAudit() {
            const { id } =
                await params;

            const res =
                await fetch(
                    `/api/re-audit/${id}`
                );

            const json =
                await res.json();

            setData(json);
            setLoading(false);
        }

        fetchAudit();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg">
                Loading re-audit...
            </div>
        );
    }

    if (!data?.success) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Failed to load audit
            </div>
        );
    }

    const {
        currentSetup,
        previousAudit,
        updatedAudit,
        pricingImpact,
        diff,
        meta,
    } = data;

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Hero */}
                <div className="bg-white rounded-4xl shadow-sm border p-10 mb-8">

                    <div className="flex flex-col md:flex-row md:justify-between gap-6">

                        <div>
                            <div className="inline-flex items-center bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                                Re-audit completed
                            </div>

                            <h1 className="text-4xl font-bold mb-4">
                                {pricingImpact?.monthlySavings > 0
                                    ? `You can now save $${pricingImpact.monthlySavings}/month`
                                    : "Your audit has been updated"}
                            </h1>

                            <p className="text-slate-600 text-lg max-w-2xl">
                                We detected pricing
                                changes in the AI
                                tooling market and
                                re-ran your audit
                                using the latest
                                pricing information.
                            </p>
                        </div>


                    </div>
                </div>

                {/* Current setup */}
                <div className="bg-white rounded-4xl shadow-sm border p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Current Setup
                    </h2>

                    <div className="grid md:grid-cols-5 gap-5">

                        <div className="bg-slate-50 rounded-2xl p-5">
                            <p className="text-sm text-slate-500 mb-1">
                                Tool
                            </p>

                            <p className="font-semibold text-lg">
                                {previousAudit.recommendedTool}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5">
                            <p className="text-sm text-slate-500 mb-1">
                                Plan
                            </p>

                            <p className="font-semibold text-lg capitalize">
                                {previousAudit.recommendedPlan}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5">
                            <p className="text-sm text-slate-500 mb-1">
                                Monthly Spend
                            </p>

                            <p className="font-semibold text-lg">
                                $
                                {
                                    currentSetup.monthlySpend
                                }
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5">
                            <p className="text-sm text-slate-500 mb-1">
                                Team Size
                            </p>

                            <p className="font-semibold text-lg">
                                {
                                    currentSetup.teamSize
                                }
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5">
                            <p className="text-sm text-slate-500 mb-1">
                                Use Case
                            </p>

                            <p className="font-semibold text-lg capitalize">
                                {
                                    currentSetup.useCase
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comparison */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">

                    {/* Previous */}
                    <div className="bg-white rounded-4xl shadow-sm border p-8">

                        <div className="mb-8">
                            <span className="text-sm text-slate-500">
                                Previous Recommendation
                            </span>

                            <h2 className="text-3xl font-bold mt-2">
                                Before Pricing
                                Changes
                            </h2>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Recommended AI
                                </p>

                                <h3 className="text-2xl font-semibold">
                                    {
                                        previousAudit.recommendedTool
                                    }
                                </h3>

                                <p className="text-slate-600 capitalize">
                                    {
                                        previousAudit.recommendedPlan
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Monthly Cost
                                </p>

                                <h3 className="text-xl font-semibold">
                                    $
                                    {
                                        previousAudit.monthlyCost
                                    }
                                </h3>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 mb-2">
                                    Why this was recommended
                                </p>

                                <p className="text-slate-700 leading-7">
                                    {
                                        previousAudit.reason
                                    }
                                </p>
                            </div>


                        </div>
                    </div>

                    {/* Updated */}
                    <div className="bg-white rounded-4xl border-2 border-green-500 shadow-sm p-8">

                        <div className="mb-8">
                            <span className="text-green-600 font-medium text-sm">
                                Updated Recommendation
                            </span>

                            <h2 className="text-3xl font-bold mt-2">
                                Latest Pricing
                            </h2>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Recommended AI
                                </p>

                                <h3
                                    className={`text-2xl font-semibold ${diff.recommendationChanged
                                        ? "text-green-600"
                                        : ""
                                        }`}
                                >
                                    {
                                        updatedAudit.recommendedTool
                                    }
                                </h3>

                                <p className="capitalize text-slate-600">
                                    {
                                        updatedAudit.recommendedPlan
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Monthly Cost
                                </p>

                                <h3 className="text-xl font-semibold text-green-600">
                                    $
                                    {
                                        updatedAudit.monthlyCost
                                    }
                                </h3>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 mb-2">
                                    Why this changed
                                </p>

                                <p className="text-slate-700 leading-7">
                                    {
                                        updatedAudit.reason
                                    }
                                </p>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Pricing impact */}
                <div className="bg-white rounded-4xl shadow-sm border p-8">

                    <h2 className="text-2xl font-bold mb-8">
                        Pricing Impact
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-slate-50 rounded-3xl p-6">
                            <p className="text-sm text-slate-500 mb-2">
                                Previous Price
                            </p>

                            <h3 className="text-3xl font-bold">
                                $
                                {
                                    pricingImpact.oldPrice
                                }
                            </h3>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-6">
                            <p className="text-sm text-slate-500 mb-2">
                                Updated Price
                            </p>

                            <h3 className="text-3xl font-bold">
                                $
                                {
                                    pricingImpact.newPrice
                                }
                            </h3>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
                            <p className="text-sm text-green-700 mb-2">
                                Monthly Savings
                            </p>

                            <h3 className="text-3xl font-bold text-green-600">
                                +
                                $
                                {
                                    pricingImpact.monthlySavings
                                }
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}