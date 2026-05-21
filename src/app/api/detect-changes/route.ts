import { getSupabase } from "@/lib/getSupabase";
import { getPricingSnapshot } from "@/lib/getPricingSnapshot";
import { generateAudit } from "@/lib/audit-engine";
import { sendReauditEmail } from "@/lib/sendReauditEmail"; // add this

import isEqual from "lodash/isEqual";

export async function POST() {
  try {
    const supabase =
      getSupabase();

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
      if (
        !audit.pricing_snapshot ||
        !audit.input_stack ||
        !audit.output_result
      ) {
        continue;
      }

      const pricingChanged =
        !isEqual(
          audit.pricing_snapshot,
          latestPricing
        );

      if (!pricingChanged) {
        continue;
      }

      const input =
        audit.input_stack;

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


      const recommendationChanged =
        !isEqual(
          oldResult,
          newResult
        );

      const oldTool =
        oldResult
          ?.recommendedTool ?? "";

      const oldPlan =
        oldResult
          ?.recommendedPlan ?? "";

      const newTool =
        newResult
          ?.recommendedTool ?? "";

      const newPlan =
        newResult
          ?.recommendedPlan ?? "";

      // OLD pricing snapshot
      const oldToolPrice =
        (
          audit.pricing_snapshot as Record<
            string,
            any
          >
        )?.[
          oldTool
        ]?.[
          oldPlan
        ]?.priceUSD ?? 0;

      // NEW pricing
      const newToolPrice =
        (
          latestPricing as Record<
            string,
            any
          >
        )?.[
          newTool
        ]?.[
          newPlan
        ]?.priceUSD ?? 0;

      const auditAffected =
        pricingChanged;

      if (!auditAffected) {
        continue;
      }

      const oldToolExists =
        !!(
          (
            latestPricing as Record<
              string,
              any
            >
          )?.[oldTool]
          ?.[oldPlan]
        );

      const oldPricingSnapshot =
        audit.pricing_snapshot as Record<
          string,
          any
        >;

      const modelExistedBefore =
        !!oldPricingSnapshot?.[
        newTool
        ]?.[
        newPlan
        ];

      const newModelAdded =
        !modelExistedBefore &&
        !!newTool &&
        !!newPlan;

      // SAVE FULL DATA FOR RERUN
      const {
        error: updateError,
      } = await supabase
        .from("audits")
        .update({
          re_audit_result: {
            result: newResult,

            currentSetup: {
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
            },

            comparison: {
              previous: {
                tool:
                  oldTool,

                plan:
                  oldPlan,

                reason:
                  oldResult.reason,

                savings:
                  oldResult
                    .estimatedSavingsUSD,

                monthlyCost:
                  oldToolPrice,
              },

              updated: {
                tool:
                  newTool,

                plan:
                  newPlan,

                reason:
                  newResult.reason,

                savings:
                  newResult
                    .estimatedSavingsUSD,

                monthlyCost:
                  newToolPrice,
              },

              priceChange: {
                oldPrice:
                  oldToolPrice,

                newPrice:
                  newToolPrice,
              },

              delta: {
                monthlySavings:
                  oldToolPrice -
                  newToolPrice,
              },
            },
          },

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

        tool:
          audit.tool,

        plan:
          audit.plan,

        useCase:
          audit.usecase,

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

        oldSavings:
          oldResult
            .estimatedSavingsUSD,

        newSavings:
          newResult
            .estimatedSavingsUSD,

        oldReason:
          oldResult.reason,

        newReason:
          newResult.reason,

        oldSummary:
          audit.summary,

        pricingSnapshot:
          audit
            .pricing_snapshot,

        oldMonthlyCost:
          oldToolPrice,

        newMonthlyCost:
          newToolPrice,

        monthlySavings:
          oldToolPrice -
          newToolPrice,

        oldToolPrice:
          oldToolPrice,

        newToolPrice:
          newToolPrice,

        modelRemoved:
          !oldToolExists,

        newModelAdded:
          newModelAdded,
      });


    }


    // ==========================
    // SEND CONSOLIDATED EMAILS
    // ==========================

    const groupedUsers =
      affectedAudits.reduce(
        (acc, audit) => {
          if (
            !acc[audit.email]
          ) {
            acc[
              audit.email
            ] = [];
          }

          acc[
            audit.email
          ].push(audit);

          return acc;
        },
        {} as Record<
          string,
          typeof affectedAudits
        >
      );

    for (const [
      email,
      audits,
    ] of Object.entries(
      groupedUsers
    )) {
      // send only if recommendation changed
      const shouldSendEmail =
        audits.some(
          (audit) =>
            audit
              .oldRecommendation
              .tool !==
            audit
              .newRecommendation
              .tool ||
            audit
              .oldRecommendation
              .plan !==
            audit
              .newRecommendation
              .plan
        );

      if (
        !shouldSendEmail
      ) {
        console.log(
          `Skipping email for ${email} - recommendation unchanged`
        );

        continue;
      }

      try {
        // await sendReauditEmail({
        //   email,
        //   affectedAudits:
        //     audits,
        // });
        const changedAudits =
          audits.filter(
            (audit) =>
              audit
                .oldRecommendation
                .tool !==
              audit
                .newRecommendation
                .tool ||
              audit
                .oldRecommendation
                .plan !==
              audit
                .newRecommendation
                .plan
          );

        if (
          changedAudits.length ===
          0
        ) {
          continue;
        }

        await sendReauditEmail({
          email,
          affectedAudits:
            changedAudits,
        });
        console.log(
          `Reaudit email sent to ${email}`
        );
      } catch (
      emailError
      ) {
        console.error(
          `Failed sending email to ${email}`,
          emailError
        );
      }
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



// import { getSupabase } from "@/lib/getSupabase";
// import { getPricingSnapshot } from "@/lib/getPricingSnapshot";
// import { generateAudit } from "@/lib/audit-engine";
// import { sendReauditEmail } from "@/lib/sendReauditEmail"; // add this

// import isEqual from "lodash/isEqual";

// export async function POST() {
//   try {
//     const supabase =
//       getSupabase();

//     const {
//       data: audits,
//       error,
//     } = await supabase
//       .from("audits")
//       .select("*");

//     if (error) {
//       console.error(error);

//       return Response.json(
//         {
//           success: false,
//           message:
//             "Failed to fetch audits",
//         },
//         { status: 500 }
//       );
//     }

//     const latestPricing =
//       getPricingSnapshot();

//     const affectedAudits =
//       [];

//     for (const audit of audits) {
//       if (
//         !audit.pricing_snapshot ||
//         !audit.input_stack ||
//         !audit.output_result
//       ) {
//         continue;
//       }

//       const pricingChanged =
//         !isEqual(
//           audit.pricing_snapshot,
//           latestPricing
//         );

//       if (!pricingChanged) {
//         continue;
//       }

//       const input =
//         audit.input_stack;

//       const newResult =
//         generateAudit({
//           tool:
//             input.selectedTool,
//           plan:
//             input.selectedPlan,
//           monthlySpend:
//             input.monthlySpend,
//           teamSize:
//             input.teamSize,
//           useCase:
//             input.useCase,
//         });

//       const oldResult =
//         audit.output_result
//           .result;

//       const recommendationChanged =
//         !isEqual(
//           oldResult,
//           newResult
//         );

//       const auditAffected =
//         pricingChanged;

//       if (!auditAffected) {
//         continue;
//       }

//       const {
//         error:
//         updateError,
//       } = await supabase
//         .from("audits")
//         .update({
//           re_audit_result:
//             newResult,

//           re_audited_at:
//             new Date().toISOString(),
//         })
//         .eq(
//           "id",
//           audit.id
//         );

//       if (updateError) {
//         console.error(
//           `Failed updating ${audit.id}`,
//           updateError
//         );

//         continue;
//       }

//       const oldTool =
//         oldResult
//           .recommendedTool ??
//         "";

//       const oldPlan =
//         oldResult
//           .recommendedPlan ??
//         "";

//       const newTool =
//         newResult
//           .recommendedTool ??
//         "";

//       const newPlan =
//         newResult
//           .recommendedPlan ??
//         "";

//       // get OLD price from saved snapshot
//       const oldToolPrice =
//         (
//           audit.pricing_snapshot as Record<
//             string,
//             any
//           >
//         )?.[
//           oldTool
//         ]?.[
//           oldPlan
//         ]?.priceUSD ?? 0;

//       // get NEW price from latest pricing
//       const newToolPrice =
//         (
//           latestPricing as Record<
//             string,
//             any
//           >
//         )?.[
//           newTool
//         ]?.[
//           newPlan
//         ]?.priceUSD ?? 0;
//       const oldToolExists =
//         !!(
//           (
//             latestPricing as Record<
//               string,
//               any
//             >
//           )?.[oldTool]
//           ?.[oldPlan]
//         );

//       // const newModelAdded =
//       //   oldTool !==
//       //     newTool ||
//       //   oldPlan !==
//       //     newPlan;
//       const oldPricingSnapshot =
//         audit.pricing_snapshot as Record<
//           string,
//           any
//         >;

//       const modelExistedBefore =
//         !!oldPricingSnapshot?.[
//         newTool
//         ]?.[
//         newPlan
//         ];

//       // true only if
//       // new recommendation
//       // did NOT exist before
//       const newModelAdded =
//         !modelExistedBefore &&
//         !!newTool &&
//         !!newPlan;
//       affectedAudits.push({
//         auditId:
//           audit.id,

//         email:
//           audit.email,

//         pricingChanged,

//         recommendationChanged,

//         tool:
//           audit.tool,

//         plan:
//           audit.plan,

//         useCase:
//           audit.usecase,

//         oldRecommendation:
//         {
//           tool:
//             oldResult
//               .recommendedTool,

//           plan:
//             oldResult
//               .recommendedPlan,
//         },

//         newRecommendation:
//         {
//           tool:
//             newResult
//               .recommendedTool,

//           plan:
//             newResult
//               .recommendedPlan,
//         },

//         oldSavings:
//           oldResult
//             .estimatedSavingsUSD,

//         newSavings:
//           newResult
//             .estimatedSavingsUSD,

//         oldReason:
//           oldResult.reason,

//         newReason:
//           newResult.reason,

//         oldSummary:
//           audit.summary,

//         pricingSnapshot:
//           audit
//             .pricing_snapshot,

//         oldMonthlyCost:
//           oldToolPrice,

//         newMonthlyCost:
//           newToolPrice,

//         monthlySavings:
//           oldToolPrice -
//           newToolPrice,

//         oldToolPrice:
//           oldToolPrice,

//         newToolPrice:
//           newToolPrice,

//         modelRemoved:
//           !oldToolExists,

//         newModelAdded:
//           newModelAdded,
//       });


//     }


//     // ==========================
//     // SEND CONSOLIDATED EMAILS
//     // ==========================

//     const groupedUsers =
//       affectedAudits.reduce(
//         (acc, audit) => {
//           if (
//             !acc[audit.email]
//           ) {
//             acc[
//               audit.email
//             ] = [];
//           }

//           acc[
//             audit.email
//           ].push(audit);

//           return acc;
//         },
//         {} as Record<
//           string,
//           typeof affectedAudits
//         >
//       );

//     for (const [
//       email,
//       audits,
//     ] of Object.entries(
//       groupedUsers
//     )) {
//       // send only if recommendation changed
//       const shouldSendEmail =
//         audits.some(
//           (audit) =>
//             audit
//               .oldRecommendation
//               .tool !==
//             audit
//               .newRecommendation
//               .tool ||
//             audit
//               .oldRecommendation
//               .plan !==
//             audit
//               .newRecommendation
//               .plan
//         );

//       if (
//         !shouldSendEmail
//       ) {
//         console.log(
//           `Skipping email for ${email} - recommendation unchanged`
//         );

//         continue;
//       }

//       try {
//         // await sendReauditEmail({
//         //   email,
//         //   affectedAudits:
//         //     audits,
//         // });
//         const changedAudits =
//           audits.filter(
//             (audit) =>
//               audit
//                 .oldRecommendation
//                 .tool !==
//               audit
//                 .newRecommendation
//                 .tool ||
//               audit
//                 .oldRecommendation
//                 .plan !==
//               audit
//                 .newRecommendation
//                 .plan
//           );

//         if (
//           changedAudits.length ===
//           0
//         ) {
//           continue;
//         }

//         await sendReauditEmail({
//           email,
//           affectedAudits:
//             changedAudits,
//         });
//         console.log(
//           `Reaudit email sent to ${email}`
//         );
//       } catch (
//       emailError
//       ) {
//         console.error(
//           `Failed sending email to ${email}`,
//           emailError
//         );
//       }
//     }
//     return Response.json({
//       success: true,
//       totalAudits:
//         audits.length,
//       affectedCount:
//         affectedAudits.length,
//       affectedAudits,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       {
//         success: false,
//         message:
//           "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }
