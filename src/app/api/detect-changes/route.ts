import { getSupabase } from "@/lib/getSupabase";
import { getPricingSnapshot } from "@/lib/getPricingSnapshot";
import { generateAudit } from "@/lib/audit-engine";
import isEqual from "lodash/isEqual";

export async function POST() {
  try {
    const supabase =
      getSupabase();

    // fetch all audits
    const {
      data: audits,
      error,
    } = await supabase
      .from("audits")
      .select("*");

    if (error) {
      console.error(error);

      return Response.json(
        {
          success: false,
          message:
            "Failed to fetch audits",
        },
        { status: 500 }
      );
    }

    const latestPricing =
      getPricingSnapshot();

    const affectedAudits =
      [];

    for (const audit of audits) {
      // skip incomplete audits
      if (
        !audit.pricing_snapshot ||
        !audit.input_stack ||
        !audit.output_result
      ) {
        continue;
      }

      // check pricing change
      const pricingChanged =
        !isEqual(
          audit.pricing_snapshot,
          latestPricing
        );

      // no pricing change
      if (!pricingChanged) {
        continue;
      }

      const input =
        audit.input_stack;

      // re-run audit
      const newResult =
        generateAudit({
          tool:
            input.selectedTool,

          plan:
            input.selectedPlan,

          monthlySpend:
            input.monthlySpend,

          teamSize:
            input.teamSize,

          useCase:
            input.useCase,
        });

      const oldResult =
        audit.output_result
          .result;

      // compare recommendation
      const recommendationChanged =
        !isEqual(
          oldResult,
          newResult
        );

      // affected if:
      // pricing changed
      // OR recommendation changed
      const auditAffected =
        pricingChanged 
        // ||
        // recommendationChanged;

      if (!auditAffected) {
        continue;
      }

      // save re-audit
      const {
        error:
          updateError,
      } = await supabase
        .from("audits")
        .update({
          re_audit_result:
            newResult,

          re_audited_at:
            new Date().toISOString(),
        })
        .eq(
          "id",
          audit.id
        );

      if (updateError) {
        console.error(
          `Failed updating ${audit.id}`,
          updateError
        );

        continue;
      }

      affectedAudits.push({
        auditId:
          audit.id,

        email:
          audit.email,

        pricingChanged,

        recommendationChanged,

        oldRecommendation:
          {
            tool:
              oldResult
                .recommendedTool,
            plan:
              oldResult
                .recommendedPlan,
          },

        newRecommendation:
          {
            tool:
              newResult
                .recommendedTool,
            plan:
              newResult
                .recommendedPlan,
          },
      });
    }

    return Response.json({
      success: true,
      totalAudits:
        audits.length,
      affectedCount:
        affectedAudits.length,
      affectedAudits,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}
