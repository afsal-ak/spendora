import { getSupabase } from "@/lib/getSupabase";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await context.params;

    const supabase =
      getSupabase();

    const {
      data: audit,
      error,
    } = await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (
      error ||
      !audit
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Audit not found",
        },
        { status: 404 }
      );
    }

    // ======================
    // RAW DATA
    // ======================

    const old =
      audit.output_result
        ?.result ?? {};

    const reAudit =
      audit.re_audit_result ??
      {};

    const updated =
      reAudit.result ?? {};

    const comparison =
      reAudit.comparison ??
      {};

    // ======================
    // CURRENT SETUP
    // ======================

    const inputStack =
      audit.input_stack ??
      {};

    const currentSetup =
      reAudit.currentSetup ?? {
        tool:
          inputStack
            .selectedTool ??
          "N/A",

        plan:
          inputStack
            .selectedPlan ??
          "N/A",

        monthlySpend:
          inputStack
            .monthlySpend ??
          0,

        teamSize:
          inputStack
            .teamSize ??
          0,

        useCase:
          inputStack
            .useCase ??
          "N/A",
      };

    // ======================
    // PREVIOUS AUDIT
    // ======================

    const previousAudit =
      {
        recommendedTool:
          old.recommendedTool ??
          "N/A",

        recommendedPlan:
          old.recommendedPlan ??
          "N/A",

        monthlyCost:
          comparison.previous
            ?.monthlyCost ??
          inputStack
            ?.monthlySpend ??
          0,

        reason:
          old.reason ??
          "No reason available",
      };

    // ======================
    // UPDATED AUDIT
    // ======================

    const updatedAudit =
      {
        recommendedTool:
          updated.recommendedTool ??
          "N/A",

        recommendedPlan:
          updated.recommendedPlan ??
          "N/A",

        monthlyCost:
          comparison.updated
            ?.monthlyCost ??
          0,

        reason:
          updated.reason ??
          "No reason available",
      };

    // ======================
    // PRICING IMPACT
    // ======================

    const oldPrice =
      comparison
        ?.priceChange
        ?.oldPrice ??
      previousAudit.monthlyCost;

    const newPrice =
      comparison
        ?.priceChange
        ?.newPrice ??
      updatedAudit.monthlyCost;

    const pricingImpact =
      {
        oldPrice,
        newPrice,

        monthlySavings:
          comparison?.delta
            ?.monthlySavings ??
          oldPrice -
            newPrice,
      };

    // ======================
    // DIFF
    // ======================

    const diff = {
      recommendationChanged:
        previousAudit.recommendedTool !==
          updatedAudit.recommendedTool ||
        previousAudit.recommendedPlan !==
          updatedAudit.recommendedPlan,
    };

    // ======================
    // META
    // ======================

    const meta = {
      auditId: audit.id,

      reAuditedAt:
        audit.re_audited_at ??
        audit.updated_at ??
        audit.created_at,
    };

    return NextResponse.json({
      success: true,
      currentSetup,
      previousAudit,
      updatedAudit,
      pricingImpact,
      diff,
      meta,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}